import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { makeWASocket } from "@whiskeysockets/baileys";
import { jidNormalizedUser } from "@whiskeysockets/baileys";
import type { Config } from "../config.js";
import { sentMessageStore } from "./outbound.js";

interface ReactionEntry {
  timestamp: string;
  emoji: string;
  messageId: string;
  messageSnippet: string | null;
  category: string;
}

// Emoji → category mapping for structured feedback
const EMOJI_CATEGORIES: Record<string, string> = {
  "❤️": "positive",
  "👍": "positive",
  "🔥": "positive",
  "😂": "positive",
  "😍": "positive",
  "🎉": "positive",
  "💯": "positive",
  "👎": "negative",
  "😕": "negative",
  "❌": "negative",
  "🤔": "review",
  "📌": "bookmark",
  "⭐": "bookmark",
};

function categorize(emoji: string): string {
  return EMOJI_CATEGORIES[emoji] ?? "other";
}

export function setupReactionListener(
  sock: ReturnType<typeof makeWASocket>,
  config: Config,
): void {
  const selfJids = new Set<string>();
  if (sock.user?.id) selfJids.add(jidNormalizedUser(sock.user.id));
  if (sock.user?.lid) selfJids.add(jidNormalizedUser(sock.user.lid));

  sock.ev.on("messages.reaction", async (reactions) => {
    for (const { key, reaction } of reactions) {
      try {
        // Only process reactions in self-chat
        if (!key.remoteJid || !selfJids.has(key.remoteJid)) continue;

        const emoji = reaction.text;
        const messageId = key.id ?? "unknown";

        // Empty emoji = reaction removed, skip
        if (!emoji) {
          console.log(`[pai:reaction] Reaction removed on ${messageId}`);
          continue;
        }

        // Look up the message content from our store
        const stored = sentMessageStore.get(messageId);
        const snippet = stored?.text ?? null;
        const category = categorize(emoji);

        console.log(`[pai:reaction] ${emoji} (${category}) on message ${messageId}${snippet ? `: "${snippet.slice(0, 60)}..."` : ""}`);

        // Log to reactions.jsonl
        const entry: ReactionEntry = {
          timestamp: new Date().toISOString(),
          emoji,
          messageId,
          messageSnippet: snippet,
          category,
        };

        const logPath = join(config.journalDir, "reactions.jsonl");
        await mkdir(config.journalDir, { recursive: true });
        await appendFile(logPath, JSON.stringify(entry) + "\n");
      } catch (err) {
        console.error("[pai:reaction] Error processing reaction:", err);
      }
    }
  });

  console.log("[pai] Reaction listener registered");
}
