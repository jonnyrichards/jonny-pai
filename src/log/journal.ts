import { appendFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import type { Config } from "../config.js";

let journalDir: string;

export function initJournal(config: Config): void {
  journalDir = config.journalDir;
}

function todayFile(): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return resolve(journalDir, `${date}.md`);
}

function timestamp(): string {
  return new Date().toISOString().slice(11, 19); // HH:MM:SS
}

async function append(line: string): Promise<void> {
  await mkdir(journalDir, { recursive: true });
  await appendFile(todayFile(), line + "\n", "utf-8");
}

export async function logMessage(
  direction: "user" | "ai",
  text: string,
): Promise<void> {
  const tag = direction === "user" ? "👤 User" : "🤖 PAI";
  await append(`\n### ${tag} [${timestamp()}]\n${text}\n`);
}

export async function logEvent(event: string): Promise<void> {
  await append(`\n---\n_${timestamp()} — ${event}_\n`);
}
