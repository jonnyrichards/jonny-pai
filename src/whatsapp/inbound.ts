import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import type { makeWASocket, WAMessage } from "@whiskeysockets/baileys";
import { downloadContentFromMessage, extractMessageContent, jidNormalizedUser } from "@whiskeysockets/baileys";
import type { Config } from "../config.js";
import { transcribeAudio } from "../audio/transcribe.js";
import { sentMessageIds } from "./outbound.js";

export type MessageHandler = (text: string, replyJid: string, mediaPath?: string) => Promise<void>;

export function setupMessageListener(
  sock: ReturnType<typeof makeWASocket>,
  config: Config,
  handler: MessageHandler,
): void {
  const processedIds = new Set<string>();

  // Build a set of JIDs that represent "self-chat".
  // WhatsApp uses both phone-based JIDs (@s.whatsapp.net) and LID-based JIDs (@lid).
  // Self-chat remoteJid can arrive in either format, so we collect all known forms.
  const selfJids = new Set<string>();
  if (sock.user?.id) {
    selfJids.add(jidNormalizedUser(sock.user.id));
  }
  if (sock.user?.lid) {
    selfJids.add(jidNormalizedUser(sock.user.lid));
  }
  if (sock.user?.phoneNumber) {
    selfJids.add(sock.user.phoneNumber);
  }
  console.log(`[pai] sock.user: id=${sock.user?.id}, lid=${sock.user?.lid}, phoneNumber=${sock.user?.phoneNumber}`);
  console.log(`[pai] Self-chat filter: accepting JIDs ${[...selfJids].join(", ")}`);

  sock.ev.on("messages.upsert", async (upsert: { type?: string; messages?: WAMessage[] }) => {
    if (upsert.type !== "notify") return;

    for (const msg of upsert.messages ?? []) {
      try {
        const id = msg.key?.id;
        const remoteJid = msg.key?.remoteJid;
        if (!remoteJid || !id) continue;

        // Skip status and broadcast messages
        if (remoteJid.endsWith("@status") || remoteJid.endsWith("@broadcast")) continue;

        // Access control: only process messages we sent ourselves (self-chat).
        // This works with both traditional JIDs and LID-based JIDs.
        if (!msg.key?.fromMe) continue;

        // Only accept self-chat: the destination must be our own JID
        if (!selfJids.has(remoteJid)) {
          console.log(`[pai] Skipped fromMe message to ${remoteJid} (not self-chat)`);
          continue;
        }

        // Deduplication
        if (processedIds.has(id)) continue;
        processedIds.add(id);
        if (processedIds.size > 1000) {
          const first = processedIds.values().next().value!;
          processedIds.delete(first);
        }

        // Echo prevention: skip messages we sent as responses
        if (sentMessageIds.has(id)) continue;

        const msgType = detectMessageType(msg);
        console.log(`[pai] Incoming self-chat message: type=${msgType}, id=${id}`);

        // Extract text — or handle media
        let text = (msgType === "image" || msgType === "document") ? undefined : extractText(msg);
        let mediaPath: string | undefined;

        if (!text && msgType === "audio") {
          const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
          const audioMsg = content?.audioMessage;

          if (!config.openaiApiKey) {
            console.warn("[pai] Audio message received but OPENAI_API_KEY is not set — skipping");
            continue;
          }

          if (audioMsg) {
            try {
              const stream = await downloadContentFromMessage(audioMsg, "audio");
              const chunks: Buffer[] = [];
              for await (const chunk of stream) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
              // Save audio file for vault journaling
              const paiTmp = join("/tmp", "pai");
              await mkdir(paiTmp, { recursive: true });
              const audioPath = join(paiTmp, `audio-${randomUUID()}.ogg`);
              await writeFile(audioPath, buffer);
              mediaPath = audioPath;
              setTimeout(() => unlink(audioPath).catch(() => {}), 5 * 60 * 1000);
              const transcript = await transcribeAudio(buffer, config.openaiApiKey);
              text = `[Voice message]: ${transcript}`;
              console.log(`[pai] Transcribed audio (${buffer.length} bytes): ${transcript.slice(0, 80)}…`);
            } catch (err) {
              console.error("[pai] Audio transcription failed:", err);
              continue;
            }
          }
        }

        if (!text && msgType === "image") {
          const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
          const imageMsg = content?.imageMessage;

          if (imageMsg) {
            try {
              const stream = await downloadContentFromMessage(imageMsg, "image");
              const chunks: Buffer[] = [];
              for await (const chunk of stream) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
              const ext = (imageMsg.mimetype ?? "image/jpeg").includes("png") ? "png" : "jpg";
              const paiTmp = join("/tmp", "pai");
              await mkdir(paiTmp, { recursive: true });
              const tmpPath = join(paiTmp, `image-${randomUUID()}.${ext}`);
              await writeFile(tmpPath, buffer);
              mediaPath = tmpPath;
              const caption = imageMsg.caption?.trim();
              text = caption
                ? `[Image message]: The user sent an image with caption "${caption}". Read the image at ${tmpPath} to see it.`
                : `[Image message]: The user sent an image. Read the image at ${tmpPath} to see it.`;
              console.log(`[pai] Saved image (${buffer.length} bytes) to ${tmpPath}`);
              // Clean up temp file after 5 minutes
              setTimeout(() => unlink(tmpPath).catch(() => {}), 5 * 60 * 1000);
            } catch (err) {
              console.error("[pai] Image download failed:", err);
              continue;
            }
          }
        }

        if (!text && msgType === "document") {
          const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
          const docMsg = content?.documentMessage;

          if (docMsg) {
            try {
              const stream = await downloadContentFromMessage(docMsg, "document");
              const chunks: Buffer[] = [];
              for await (const chunk of stream) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
              const fileName = docMsg.fileName ?? "document";
              const ext = extFromFileName(fileName) ?? mimeToExt(docMsg.mimetype ?? "") ?? "bin";
              const paiTmp = join("/tmp", "pai");
              await mkdir(paiTmp, { recursive: true });
              const tmpPath = join(paiTmp, `doc-${randomUUID()}.${ext}`);
              await writeFile(tmpPath, buffer);
              const caption = docMsg.caption?.trim();
              text = caption
                ? `[Document message]: The user sent a document "${fileName}" with caption "${caption}". Read the file at ${tmpPath}.`
                : `[Document message]: The user sent a document "${fileName}". Read the file at ${tmpPath}.`;
              console.log(`[pai] Saved document "${fileName}" (${buffer.length} bytes) to ${tmpPath}`);
              setTimeout(() => unlink(tmpPath).catch(() => {}), 5 * 60 * 1000);
            } catch (err) {
              console.error("[pai] Document download failed:", err);
              continue;
            }
          }
        }

        // Quoted message context: when replying to a previous message
        if (text) {
          const quotedText = getQuotedText(msg);
          const quotedImage = getQuotedImage(msg);
          if (quotedImage) {
            try {
              const stream = await downloadContentFromMessage(quotedImage, "image");
              const chunks: Buffer[] = [];
              for await (const chunk of stream) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
              const ext = (quotedImage.mimetype ?? "image/jpeg").includes("png") ? "png" : "jpg";
              const paiTmp = join("/tmp", "pai");
              await mkdir(paiTmp, { recursive: true });
              const tmpPath = join(paiTmp, `quoted-image-${randomUUID()}.${ext}`);
              await writeFile(tmpPath, buffer);
              mediaPath = tmpPath;
              text = `[Replying to an image]: The user is replying to/referencing an image. Read the image at ${tmpPath} to see it. Their message: "${text}"`;
              console.log(`[pai] Saved quoted image (${buffer.length} bytes) to ${tmpPath}`);
              setTimeout(() => unlink(tmpPath).catch(() => {}), 5 * 60 * 1000);
            } catch (err) {
              console.error("[pai] Quoted image download failed:", err);
            }
          } else if (quotedText) {
            text = `[Replying to: "${quotedText}"]\n${text}`;
            console.log(`[pai] Quoted text context: "${quotedText.slice(0, 80)}…"`);
          }
        }

        // Forwarded message annotation
        if (text && isForwardedMessage(msg)) {
          text = `[Forwarded message]: ${text}`;
          console.log(`[pai] Detected forwarded message`);
        }

        // URL detection: annotate messages that are primarily a URL share
        if (text) {
          const urlMatch = text.match(/https?:\/\/\S+/);
          if (urlMatch) {
            const nonUrlText = text.replace(/https?:\/\/\S+/g, "").trim();
            if (nonUrlText.length < 50) {
              text = `[URL detected]: ${text}`;
            }
          }
        }

        if (!text) {
          if (msgType === "text") {
            // Debug: log structure for text messages that failed extraction
            const keys = msg.message ? Object.keys(msg.message) : [];
            console.warn(`[pai] Failed to extract text from text-type message. Keys: ${keys.join(", ")}`);
          } else if (msgType !== "text") {
            console.log(`[pai] Skipped unhandled message type: ${msgType}`);
          }
          continue;
        }

        // Send read receipt
        try {
          await sock.readMessages([{ remoteJid, id, fromMe: true }]);
        } catch {
          // best-effort
        }

        console.log(`[pai] Accepted message from ${remoteJid} (fromMe=true)`);
        await handler(text, remoteJid, mediaPath);
      } catch (err) {
        console.error("[pai] Error processing message:", err);
      }
    }
  });
}

function detectMessageType(msg: WAMessage): string {
  const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
  if (!content) return "empty";
  if (content.audioMessage) return "audio";
  if (content.imageMessage) return "image";
  if (content.videoMessage) return "video";
  if (content.documentMessage) return "document";
  if (content.stickerMessage) return "sticker";
  if (content.contactMessage) return "contact";
  if (content.locationMessage) return "location";
  if (content.conversation || content.extendedTextMessage) return "text";
  return "unknown";
}

function extractText(msg: WAMessage): string | undefined {
  const message = msg.message;
  if (!message) return undefined;

  // Try direct conversation text
  if (typeof message.conversation === "string" && message.conversation.trim()) {
    return message.conversation.trim();
  }

  // Try extended text message
  const extendedMsg = message.extendedTextMessage;
  if (extendedMsg?.text?.trim()) {
    return extendedMsg.text.trim();
  }
  // Fallback: link preview fields (forwarded URLs may only have matchedText + title)
  if (extendedMsg?.matchedText?.trim()) {
    const parts: string[] = [];
    if (extendedMsg.title?.trim()) parts.push(extendedMsg.title.trim());
    if (extendedMsg.description?.trim()) parts.push(extendedMsg.description.trim());
    parts.push(extendedMsg.matchedText.trim());
    return parts.join("\n");
  }

  // Try extractMessageContent for wrapped messages
  const extracted = extractMessageContent(message);
  if (extracted && extracted !== message) {
    if (typeof extracted.conversation === "string" && extracted.conversation.trim()) {
      return extracted.conversation.trim();
    }
    const extText = extracted.extendedTextMessage?.text;
    if (extText?.trim()) {
      return extText.trim();
    }
  }

  // Try media captions
  const caption =
    message.imageMessage?.caption ??
    message.videoMessage?.caption ??
    message.documentMessage?.caption;
  if (caption?.trim()) {
    return caption.trim();
  }

  return undefined;
}

function extFromFileName(name: string): string | undefined {
  const dot = name.lastIndexOf(".");
  if (dot > 0) return name.slice(dot + 1).toLowerCase();
  return undefined;
}

const MIME_EXT_MAP: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "text/plain": "txt",
  "text/csv": "csv",
  "application/json": "json",
  "application/xml": "xml",
  "text/xml": "xml",
};

function mimeToExt(mime: string): string | undefined {
  return MIME_EXT_MAP[mime.split(";")[0].trim()];
}

function isForwardedMessage(msg: WAMessage): boolean {
  const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
  if (!content) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const types = ["extendedTextMessage", "imageMessage", "videoMessage", "documentMessage", "audioMessage", "stickerMessage", "contactMessage", "locationMessage"] as const;
  for (const type of types) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contextInfo = (content as any)[type]?.contextInfo;
    if (contextInfo?.isForwarded || (contextInfo?.forwardingScore ?? 0) > 0) {
      return true;
    }
  }
  return false;
}

function getQuotedText(msg: WAMessage): string | undefined {
  const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
  const contextInfo = content?.extendedTextMessage?.contextInfo;
  if (!contextInfo?.quotedMessage) return undefined;
  const quoted = extractMessageContent(contextInfo.quotedMessage) ?? contextInfo.quotedMessage;
  const text = quoted?.conversation ?? quoted?.extendedTextMessage?.text;
  return text?.trim() || undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getQuotedImage(msg: WAMessage): any | undefined {
  const content = extractMessageContent(msg.message ?? undefined) ?? msg.message;
  const contextInfo = content?.extendedTextMessage?.contextInfo;
  if (!contextInfo?.quotedMessage) return undefined;
  const quoted = extractMessageContent(contextInfo.quotedMessage) ?? contextInfo.quotedMessage;
  return quoted?.imageMessage;
}
