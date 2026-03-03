import { appendFile, mkdir, copyFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import type { Config } from "../config.js";

let vaultDir: string | null = null;
let attachmentsDir: string;
let timezone: string;

export function initVaultJournal(config: Config): void {
  if (!config.notesVault) {
    vaultDir = null;
    return;
  }
  vaultDir = resolve(config.notesVault, "PAI", "whatsapp");
  attachmentsDir = resolve(vaultDir, "attachments");
  timezone = config.timezone;
}

function todayFile(): string {
  const now = new Date();
  const date = now.toLocaleDateString("en-CA", { timeZone: timezone }); // YYYY-MM-DD
  return resolve(vaultDir!, `${date}.md`);
}

function timestamp(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
}

async function ensureHeader(): Promise<void> {
  const file = todayFile();
  await mkdir(vaultDir!, { recursive: true });
  try {
    await stat(file);
  } catch {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: timezone,
    });
    await appendFile(file, `# WhatsApp — ${dateStr}\n\n`, "utf-8");
  }
}

async function append(line: string): Promise<void> {
  await ensureHeader();
  await appendFile(todayFile(), line + "\n", "utf-8");
}

/**
 * Persist a media file (image, audio, document) to the vault attachments folder.
 * Returns the Obsidian wikilink embed string.
 */
async function persistMedia(sourcePath: string): Promise<string> {
  await mkdir(attachmentsDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const ext = sourcePath.split(".").pop() ?? "bin";
  const filename = `${ts}.${ext}`;
  const destPath = resolve(attachmentsDir, filename);
  await copyFile(sourcePath, destPath);
  return `![[attachments/${filename}]]`;
}

export async function logVaultMessage(
  direction: "user" | "ai",
  text: string,
  mediaPath?: string,
): Promise<void> {
  // Skip if no vault configured
  if (!vaultDir) return;

  const tag = direction === "user" ? "**Me**" : "🧠";
  const time = timestamp();

  let entry = `> ${tag} _${time}_\n`;

  if (mediaPath) {
    try {
      const embed = await persistMedia(mediaPath);
      entry += `> ${embed}\n`;
    } catch (err) {
      console.error("[vault-journal] Failed to persist media:", err);
    }
  }

  // Clean internal markers from the text for the vault note
  const cleanText = text
    .replace(/\[Image message\]:.*?Read the image at \/tmp\/pai\/\S+.*?/g, "")
    .replace(/\[Voice message\]:\s*/g, "")
    .replace(/\[Document message\]:.*?Read the file at \/tmp\/pai\/\S+.*?/g, "")
    .replace(/\[Replying to an image\]:.*?Read the image at \/tmp\/pai\/\S+.*?Their message:\s*"?/g, "")
    .replace(/\[Replying to: ".*?"\]\n?/g, "")
    .replace(/\[URL detected\]:\s*/g, "")
    .replace(/"$/g, "")
    .trim();

  if (cleanText) {
    entry += `> ${cleanText}\n`;
  }

  entry += "\n";
  await append(entry);
}
