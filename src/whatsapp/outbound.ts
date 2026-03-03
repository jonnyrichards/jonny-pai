import type { makeWASocket } from "@whiskeysockets/baileys";
import type { Config } from "../config.js";
import { textToSpeech } from "../audio/tts.js";
import { generateImage, editImage } from "../image/generate.js";

/** Tracks IDs of messages we sent, to prevent echo loops. */
export const sentMessageIds = new Set<string>();

/** In-memory store mapping sent message IDs to their content (for reaction correlation). */
const MAX_STORE_SIZE = 200;
export const sentMessageStore = new Map<string, { text: string; timestamp: number }>();

function trackSentMessage(id: string, text: string): void {
  sentMessageStore.set(id, { text: text.slice(0, 500), timestamp: Date.now() });
  // Evict oldest entries if over limit
  if (sentMessageStore.size > MAX_STORE_SIZE) {
    const oldest = sentMessageStore.keys().next().value!;
    sentMessageStore.delete(oldest);
  }
}

// Global outbound state — initialized once at connection time
let _sock: ReturnType<typeof makeWASocket> | null = null;
let _ownerJid: string | null = null;
let _config: Config | null = null;

/** Call once when WhatsApp connects. Enables sendToOwner() globally. */
export function initOutbound(
  sock: ReturnType<typeof makeWASocket>,
  ownerJid: string,
  config: Config,
): void {
  _sock = sock;
  _ownerJid = ownerJid;
  _config = config;
}

/** Send a message to the owner from any module. Drops silently if not initialized. */
export async function sendToOwner(text: string): Promise<void> {
  if (!_sock || !_ownerJid) {
    console.warn("[pai] sendToOwner called before initOutbound — dropping:", text.slice(0, 100));
    return;
  }
  await sendResponse(_sock, _ownerJid, text);
}

/** Send a lightweight progress update — no emoji prefix, no typing delay. */
export async function sendProgressUpdate(
  sock: ReturnType<typeof makeWASocket>,
  jid: string,
  text: string,
): Promise<void> {
  const result = await sock.sendMessage(jid, { text });
  const sentId = result?.key?.id ?? undefined;
  if (sentId) {
    sentMessageIds.add(sentId);
    setTimeout(() => sentMessageIds.delete(sentId), ECHO_CLEANUP_MS);
  }
}

const ECHO_CLEANUP_MS = 60_000;
const MAX_CHUNK_LENGTH = 4000;

export async function sendResponse(
  sock: ReturnType<typeof makeWASocket>,
  jid: string,
  text: string,
): Promise<void> {
  const formatted = markdownToWhatsApp(text);
  const chunks = chunkText(formatted, MAX_CHUNK_LENGTH);

  for (let i = 0; i < chunks.length; i++) {
    const isFirst = i === 0;
    const chunk = isFirst ? `🧠 ${chunks[i].trimStart()}` : chunks[i];
    // Typing indicator with proportional delay
    try {
      await sock.sendPresenceUpdate("composing", jid);
      const delay = Math.min(Math.max(chunk.length * 2, 500), 3000);
      await sleep(delay);
    } catch {
      // best-effort
    }

    const result = await sock.sendMessage(jid, { text: chunk });
    const sentId = result?.key?.id ?? undefined;
    if (sentId) {
      sentMessageIds.add(sentId);
      trackSentMessage(sentId, chunk);
      setTimeout(() => sentMessageIds.delete(sentId), ECHO_CLEANUP_MS);
    }

    // Pause presence
    try {
      await sock.sendPresenceUpdate("paused", jid);
    } catch {
      // best-effort
    }
  }
}

/**
 * Convert standard Markdown to WhatsApp formatting.
 * Protects code blocks, then converts bold/strikethrough/headers.
 */
function markdownToWhatsApp(text: string): string {
  if (!text) return text;

  // 1. Protect fenced code blocks
  const fences: string[] = [];
  let result = text.replace(/```[\s\S]*?```/g, (match) => {
    fences.push(match);
    return `\x00FENCE${fences.length - 1}`;
  });

  // 2. Protect inline code
  const inlineCodes: string[] = [];
  result = result.replace(/`[^`\n]+`/g, (match) => {
    inlineCodes.push(match);
    return `\x00CODE${inlineCodes.length - 1}`;
  });

  // 3. Convert headers to bold lines
  result = result.replace(/^#{1,6}\s+(.+)$/gm, "*$1*");

  // 4. Convert **bold** → *bold* and __bold__ → *bold*
  result = result.replace(/\*\*(.+?)\*\*/g, "*$1*");
  result = result.replace(/__(.+?)__/g, "*$1*");

  // 5. Convert ~~strikethrough~~ → ~strikethrough~
  result = result.replace(/~~(.+?)~~/g, "~$1~");

  // 6. Restore inline code
  result = result.replace(/\x00CODE(\d+)/g, (_, idx) => inlineCodes[Number(idx)] ?? "");

  // 7. Restore fenced code blocks
  result = result.replace(/\x00FENCE(\d+)/g, (_, idx) => fences[Number(idx)] ?? "");

  return result;
}

/**
 * Split text into chunks at paragraph or sentence boundaries.
 */
function chunkText(text: string, maxLen: number): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    let splitAt = remaining.lastIndexOf("\n\n", maxLen);
    if (splitAt <= 0) splitAt = remaining.lastIndexOf("\n", maxLen);
    if (splitAt <= 0) splitAt = remaining.lastIndexOf(". ", maxLen);
    if (splitAt <= 0) splitAt = remaining.lastIndexOf(" ", maxLen);
    if (splitAt <= 0) splitAt = maxLen;

    chunks.push(remaining.slice(0, splitAt).trimEnd());
    remaining = remaining.slice(splitAt).trimStart();
  }

  if (remaining.trim()) {
    chunks.push(remaining.trim());
  }

  return chunks;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AUDIO_PREFIX = "[AUDIO]";
export const IMAGE_PREFIX = "[IMAGE:";

/** Strip markdown/formatting for TTS — plain text sounds better spoken. */
function stripFormatting(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "") // remove code blocks
    .replace(/`[^`\n]+`/g, (m) => m.slice(1, -1)) // unwrap inline code
    .replace(/^#{1,6}\s+/gm, "") // remove heading markers
    .replace(/\*\*(.+?)\*\*/g, "$1") // remove bold
    .replace(/__(.+?)__/g, "$1")
    .replace(/~~(.+?)~~/g, "$1") // remove strikethrough
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text only
    .replace(/\n{3,}/g, "\n\n") // collapse extra newlines
    .trim();
}

export async function sendAudioResponse(
  sock: ReturnType<typeof makeWASocket>,
  jid: string,
  text: string,
  config: Config,
): Promise<void> {
  if (!config.openaiApiKey) {
    console.warn("[pai] Audio response requested but OPENAI_API_KEY not set — falling back to text");
    await sendResponse(sock, jid, text);
    return;
  }

  const plainText = stripFormatting(text);
  if (!plainText) {
    await sendResponse(sock, jid, text);
    return;
  }

  try {
    console.log(`[pai] Generating TTS audio (${plainText.length} chars)...`);

    // Show recording indicator
    try {
      await sock.sendPresenceUpdate("recording", jid);
    } catch {
      // best-effort
    }

    const audioBuffer = await textToSpeech(
      plainText,
      config.openaiApiKey,
      config.ttsVoice,
      config.ttsModel,
    );

    console.log(`[pai] TTS audio ready (${audioBuffer.length} bytes), sending voice note...`);

    const result = await sock.sendMessage(jid, {
      audio: audioBuffer,
      mimetype: "audio/ogg; codecs=opus",
      ptt: true,
    });

    const sentId = result?.key?.id ?? undefined;
    if (sentId) {
      sentMessageIds.add(sentId);
      trackSentMessage(sentId, `[audio] ${plainText.slice(0, 200)}`);
      setTimeout(() => sentMessageIds.delete(sentId), ECHO_CLEANUP_MS);
    }

    // Pause presence
    try {
      await sock.sendPresenceUpdate("paused", jid);
    } catch {
      // best-effort
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[pai] TTS failed, falling back to text:", errMsg);
    await sendResponse(sock, jid, `_Audio failed: ${errMsg}_\n\n${text}`);
  }
}

export async function sendAudioToOwner(text: string): Promise<void> {
  if (!_sock || !_ownerJid || !_config) {
    console.warn("[pai] sendAudioToOwner called before initOutbound — dropping:", text.slice(0, 100));
    return;
  }
  await sendAudioResponse(_sock, _ownerJid, text, _config);
}

export function parseImageMarker(text: string): { prompt: string; refPath?: string } {
  // Extract first line containing [IMAGE: ...]
  const firstLineEnd = text.indexOf("\n");
  const firstLine = firstLineEnd >= 0 ? text.slice(0, firstLineEnd) : text;

  // Strip prefix and trailing bracket
  let inner = firstLine.slice(IMAGE_PREFIX.length).trim();
  if (inner.endsWith("]")) {
    inner = inner.slice(0, -1).trim();
  }

  const refSep = inner.lastIndexOf(" | ref:");
  if (refSep >= 0) {
    return {
      prompt: inner.slice(0, refSep).trim(),
      refPath: inner.slice(refSep + 7).trim(),
    };
  }

  return { prompt: inner.trim() };
}

export async function sendImageResponse(
  sock: ReturnType<typeof makeWASocket>,
  jid: string,
  text: string,
  config: Config,
): Promise<void> {
  if (!config.openaiApiKey) {
    console.warn("[pai:image] OPENAI_API_KEY not set — falling back to text");
    const firstLineEnd = text.indexOf("\n");
    const fallbackText = firstLineEnd >= 0 ? text.slice(firstLineEnd + 1).trim() : "";
    await sendResponse(sock, jid, fallbackText || "_Image generation unavailable (no API key)_");
    return;
  }

  const { prompt, refPath } = parseImageMarker(text);
  if (!prompt) {
    console.warn("[pai:image] Could not parse image prompt — falling back to text");
    const firstLineEnd = text.indexOf("\n");
    const fallbackText = firstLineEnd >= 0 ? text.slice(firstLineEnd + 1).trim() : "";
    await sendResponse(sock, jid, fallbackText || "_Could not generate image_");
    return;
  }

  // Caption = any text after the [IMAGE:...] line
  const firstLineEnd = text.indexOf("\n");
  const remainingText = firstLineEnd >= 0 ? text.slice(firstLineEnd + 1).trim() : "";

  try {
    console.log(`[pai:image] Generating image...`);
    console.log(`[pai:image]   Prompt: "${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}"`);
    console.log(`[pai:image]   Model: ${config.imageModel}, Size: ${config.imageSize}, Quality: ${config.imageQuality}`);
    if (refPath) console.log(`[pai:image]   Reference: ${refPath}`);

    try {
      await sock.sendPresenceUpdate("composing", jid);
    } catch {
      // best-effort
    }

    const imageBuffer = refPath
      ? await editImage(prompt, refPath, config.openaiApiKey, {
          model: config.imageModel,
          size: config.imageSize,
          quality: config.imageQuality,
        })
      : await generateImage(prompt, config.openaiApiKey, {
          model: config.imageModel,
          size: config.imageSize,
          quality: config.imageQuality,
        });

    console.log(`[pai:image] Image ready (${(imageBuffer.length / 1024).toFixed(0)} KB), sending to WhatsApp...`);
    if (remainingText) console.log(`[pai:image]   Caption: "${remainingText.slice(0, 80)}${remainingText.length > 80 ? "..." : ""}"`);


    const caption = remainingText
      ? `🧠 ${markdownToWhatsApp(remainingText)}`
      : undefined;

    const result = await sock.sendMessage(jid, {
      image: imageBuffer,
      mimetype: "image/png",
      caption,
    });

    const sentId = result?.key?.id ?? undefined;
    if (sentId) {
      sentMessageIds.add(sentId);
      trackSentMessage(sentId, `[image] ${caption ?? prompt}`);
      setTimeout(() => sentMessageIds.delete(sentId), ECHO_CLEANUP_MS);
    }

    try {
      await sock.sendPresenceUpdate("paused", jid);
    } catch {
      // best-effort
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[pai] Image generation failed, falling back to text:", errMsg);
    await sendResponse(sock, jid, `_Image generation failed: ${errMsg}_`);
  }
}

export async function sendImageToOwner(text: string): Promise<void> {
  if (!_sock || !_ownerJid || !_config) {
    console.warn("[pai] sendImageToOwner called before initOutbound — dropping:", text.slice(0, 100));
    return;
  }
  await sendImageResponse(_sock, _ownerJid, text, _config);
}
