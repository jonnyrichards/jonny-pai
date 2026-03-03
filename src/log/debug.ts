import { appendFile, mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Config } from "../config.js";

let logDir: string;
let timezone: string;

export function initDebugLog(config: Config): void {
  logDir = resolve(config.journalDir, "..", "logs");
  timezone = config.timezone;
}

function todayFile(): string {
  const date = new Date().toLocaleDateString("en-CA", { timeZone: timezone });
  return resolve(logDir, `${date}.log`);
}

function timestamp(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
  });
}

export async function debugLog(tag: string, message: string): Promise<void> {
  try {
    await mkdir(logDir, { recursive: true });
    const line = `${timestamp()} [${tag}] ${message}\n`;
    await appendFile(todayFile(), line, "utf-8");
  } catch {
    // Debug logging is best-effort — never crash the app
  }
}

/** Read the last N lines from today's debug log. */
export async function tailDebugLog(lines = 50): Promise<string> {
  try {
    const content = await readFile(todayFile(), "utf-8");
    const allLines = content.split("\n").filter((l) => l.trim());
    const tail = allLines.slice(-lines);
    return tail.join("\n") || "(empty log)";
  } catch {
    return "(no log file for today)";
  }
}
