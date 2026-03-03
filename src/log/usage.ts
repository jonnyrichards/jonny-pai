import { appendFile, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve } from "node:path";

const USAGE_DIR = resolve(homedir(), ".pai/usage");

export interface UsageEntry {
  source: "conversation" | "scheduler" | `skill:${string}` | `background:${string}` | `scheduler:${string}`;
  taskName?: string;
  costUsd: number;
  numTurns: number;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  contextWindow?: number;
  timestamp: string;
}

function todayFile(date?: string): string {
  const d = date ?? new Date().toISOString().slice(0, 10);
  return resolve(USAGE_DIR, `${d}.json`);
}

export async function recordUsage(entry: UsageEntry): Promise<void> {
  await mkdir(USAGE_DIR, { recursive: true });
  await appendFile(todayFile(), JSON.stringify(entry) + "\n", "utf-8");
}

export async function readDailyUsage(date?: string): Promise<UsageEntry[]> {
  try {
    const raw = await readFile(todayFile(date), "utf-8");
    return raw
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line) as UsageEntry);
  } catch {
    return [];
  }
}

export function formatUsageReport(entries: UsageEntry[]): string {
  if (entries.length === 0) {
    return "_No usage recorded today._";
  }

  const totalCost = entries.reduce((sum, e) => sum + e.costUsd, 0);
  const totalIn = entries.reduce((sum, e) => sum + e.inputTokens, 0);
  const totalOut = entries.reduce((sum, e) => sum + e.outputTokens, 0);
  const totalDuration = entries.reduce((sum, e) => sum + e.durationMs, 0);

  const convos = entries.filter((e) => e.source === "conversation");
  const tasks = entries.filter((e) => e.source === "scheduler");

  const convoCost = convos.reduce((sum, e) => sum + e.costUsd, 0);
  const taskCost = tasks.reduce((sum, e) => sum + e.costUsd, 0);

  const lines: string[] = [
    `*Daily Usage Report*`,
    ``,
    `*Total:* $${totalCost.toFixed(2)} | ${entries.length} sessions | ${formatDuration(totalDuration)}`,
    `*Tokens:* ${fmtNum(totalIn)} in / ${fmtNum(totalOut)} out`,
    ``,
    `*Breakdown:*`,
    `- Conversation: $${convoCost.toFixed(2)} (${convos.length} sessions)`,
    `- Scheduler: $${taskCost.toFixed(2)} (${tasks.length} tasks)`,
  ];

  if (tasks.length > 0) {
    lines.push(``, `*Scheduler tasks:*`);
    for (const t of tasks) {
      lines.push(
        `- ${t.taskName ?? "unknown"}: $${t.costUsd.toFixed(2)} | ${fmtNum(t.inputTokens + t.outputTokens)} tokens | ${formatDuration(t.durationMs)}`,
      );
    }
  }

  return lines.join("\n");
}

function formatDuration(ms: number): string {
  const secs = Math.round(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  return remSecs > 0 ? `${mins}m${remSecs}s` : `${mins}m`;
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
