import { config as loadDotenv } from "dotenv";
loadDotenv();

import { loadConfig } from "./config.js";
import { jidNormalizedUser } from "@whiskeysockets/baileys";
import { createWhatsAppConnection } from "./whatsapp/connection.js";
import { setupMessageListener } from "./whatsapp/inbound.js";
import { sendResponse, sendProgressUpdate, sendAudioResponse, sendImageResponse, initOutbound, AUDIO_PREFIX, IMAGE_PREFIX } from "./whatsapp/outbound.js";
import { setupReactionListener } from "./whatsapp/reactions.js";
import { handleMessage, clearSession, type ProgressCallback } from "./ai/claude.js";
import { runBackgroundSkill } from "./ai/background.js";
import { initJournal, logEvent, logMessage } from "./log/journal.js";
import { initVaultJournal, logVaultMessage } from "./log/vault-journal.js";
import { initDebugLog, tailDebugLog } from "./log/debug.js";
import { readDailyUsage, formatUsageReport } from "./log/usage.js";
import { Scheduler } from "./scheduler/scheduler.js";

interface QueuedMessage {
  text: string;
  replyJid: string;
  mediaPath?: string;
}

const PROGRESS_INTERVAL_MS = 90_000; // Heartbeat if no tool call for 90s

// Catch unhandled promise rejections from Baileys internals (e.g. sendRawMessage
// throwing "Connection Closed" during an active transaction). These are transient
// and the reconnect handler in connection.ts will recover.
process.on("unhandledRejection", (err) => {
  const isBoom = err && typeof err === "object" && "isBoom" in err;
  if (isBoom) {
    console.error("[pai] Caught Baileys error (swallowed):", (err as unknown as Error).message ?? err);
    return;
  }
  console.error("[pai] Unhandled rejection:", err);
});

async function main() {
  const config = loadConfig();
  initJournal(config);
  initVaultJournal(config);
  initDebugLog(config);

  console.log("[pai] Starting PAI - Personal AI Assistant");
  console.log(`[pai] Model: ${config.model}`);
  console.log(`[pai] Credentials: ${config.credentialsDir}`);
  console.log(`[pai] Journal: ${config.journalDir}`);
  console.log(`[pai] Session idle timeout: ${config.sessionIdleMinutes} minutes`);
  console.log(`[pai] Scheduler: ${config.schedulerEnabled ? "enabled" : "disabled"} (timezone: ${config.timezone})`);

  const scheduler = new Scheduler(config);

  await logEvent("PAI starting up");

  await createWhatsAppConnection(config, (sock) => {
    const selfJid = jidNormalizedUser(sock.user!.id);
    console.log(`[pai] Owner: ${selfJid}`);
    logEvent("WhatsApp connected");
    initOutbound(sock, selfJid, config);
    setupReactionListener(sock, config);
    scheduler.start();

    const queue: QueuedMessage[] = [];
    let processing = false;
    let audioMode = false;

    async function processQueue(): Promise<void> {
      if (processing || queue.length === 0) return;
      processing = true;

      while (queue.length > 0) {
        const { text, replyJid, mediaPath } = queue.shift()!;

        // Show typing indicator
        try {
          await sock.sendPresenceUpdate("composing", replyJid);
        } catch {
          // best-effort
        }

        // Progress tracking: send every tool call to WhatsApp immediately
        const startedAt = Date.now();
        const sentProgress = new Set<string>();
        let lastProgressAt = Date.now();

        const onProgress: ProgressCallback = (message: string) => {
          // Deduplicate identical progress messages
          if (sentProgress.has(message)) return;
          sentProgress.add(message);
          lastProgressAt = Date.now();

          // Fire-and-forget — don't block SDK processing
          sendProgressUpdate(sock, replyJid, `🔧 \`\`\`${message}\`\`\``).catch(() => {});
        };

        // Safety net: if no progress for 90s, send a "still working" heartbeat
        const progressInterval = setInterval(async () => {
          try {
            const sinceLast = Date.now() - lastProgressAt;
            if (sinceLast >= PROGRESS_INTERVAL_MS) {
              const elapsed = Math.round((Date.now() - startedAt) / 60_000);
              await sock.sendPresenceUpdate("composing", replyJid);
              await sendProgressUpdate(sock, replyJid, `🔧 \`\`\`still working... (${elapsed}min)\`\`\``);
              lastProgressAt = Date.now();
            }
          } catch {
            // best-effort
          }
        }, PROGRESS_INTERVAL_MS);

        try {
          console.log(`[pai] Processing: "${text.slice(0, 80)}${text.length > 80 ? "..." : ""}"`);
          let response = await handleMessage(text, config, undefined, onProgress);
          // Determine response mode: image > audio > text
          const hasImagePrefix = response.startsWith(IMAGE_PREFIX);
          const hasAudioPrefix = response.startsWith(AUDIO_PREFIX);

          const responseType = hasImagePrefix ? "image" : hasAudioPrefix ? "audio" : "text";
          console.log(`[pai] Response ready (${response.length} chars, type: ${responseType})`);

          // Log clean version to journal + vault (strip internal prefixes)
          if (hasImagePrefix) {
            const firstLineEnd = response.indexOf("\n");
            const caption = firstLineEnd >= 0 ? response.slice(firstLineEnd + 1).trim() : "";
            await logMessage("ai", caption ? `[Generated image] ${caption}` : "[Generated image]");
            await logVaultMessage("ai", caption ? `[Generated image] ${caption}` : "[Generated image]");
          } else if (hasAudioPrefix) {
            const cleanResponse = response.slice(AUDIO_PREFIX.length).trim();
            await logMessage("ai", cleanResponse);
            await logVaultMessage("ai", cleanResponse);
          } else {
            await logMessage("ai", response);
            await logVaultMessage("ai", response);
          }

          if (hasImagePrefix) {
            await sendImageResponse(sock, replyJid, response, config);
          } else if (audioMode || hasAudioPrefix) {
            if (hasAudioPrefix) {
              response = response.slice(AUDIO_PREFIX.length).trim();
            }
            await sendAudioResponse(sock, replyJid, response, config);
          } else {
            await sendResponse(sock, replyJid, response);
          }
        } catch (err) {
          const errMsg = `Sorry, I encountered an error: ${err instanceof Error ? err.message : String(err)}`;
          console.error("[pai] Error:", err);
          await sendResponse(sock, replyJid, errMsg);
          await logEvent(`Error: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          clearInterval(progressInterval);
        }
      }

      processing = false;
    }

    setupMessageListener(sock, config, async (text, replyJid, mediaPath) => {
      // Handle special commands (bypass queue)
      if (text === "/ping") {
        await sendResponse(sock, replyJid, "pong");
        return;
      }

      if (text === "/cost") {
        const data = await readDailyUsage();
        await sendResponse(sock, replyJid, formatUsageReport(data));
        return;
      }

      if (text === "/log") {
        const log = await tailDebugLog(40);
        await sendResponse(sock, replyJid, "```\n" + log + "\n```");
        return;
      }

      if (text === "/clear") {
        await sendResponse(sock, replyJid, "Summarizing session before clearing...");
        await clearSession(config);
        await sendResponse(sock, replyJid, "Session cleared. Fresh conversation started.");
        await logEvent("Session cleared by user");
        return;
      }

      if (text === "/audio") {
        audioMode = !audioMode;
        const msg = audioMode
          ? "Audio mode *on* — I'll respond with voice notes."
          : "Audio mode *off* — back to text.";
        await sendResponse(sock, replyJid, msg);
        await logEvent(`Audio mode ${audioMode ? "enabled" : "disabled"}`);
        return;
      }

      // Background-eligible skills: run outside the queue so conversations aren't blocked
      const BACKGROUND_SKILLS = new Set([
        "housekeeping", "reflect", "sync",
        "sync-notes", "sync-calendar", "sync-git",
      ]);
      const skillMatch = text.match(/^\/([a-z][-a-z0-9]*)\s*(.*)?$/is);
      if (skillMatch && BACKGROUND_SKILLS.has(skillMatch[1].toLowerCase())) {
        const skillName = skillMatch[1].toLowerCase();
        const skillArgs = (skillMatch[2] ?? "").trim();
        const started = await runBackgroundSkill(skillName, skillArgs, config);
        if (started) {
          await logMessage("user", text);
          await logVaultMessage("user", text, mediaPath);
          return;
        }
        // If skill file didn't resolve, fall through to normal queue
      }

      // Log user message
      await logMessage("user", text);
      await logVaultMessage("user", text, mediaPath);

      // Acknowledge if queue isn't empty
      if (processing) {
        const ahead = queue.length;
        const msg = ahead > 0
          ? `_Queued — ${ahead} message${ahead > 1 ? "s" : ""} ahead_`
          : `_Queued — finishing current message_`;
        await sendResponse(sock, replyJid, msg);
      }

      queue.push({ text, replyJid, mediaPath });
      processQueue();
    });
  });
}

main().catch((err) => {
  console.error("[pai] Fatal error:", err);
  process.exit(1);
});
