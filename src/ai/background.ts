import { queryBackground, resolveSkill } from "./claude.js";
import { sendToOwner } from "../whatsapp/outbound.js";
import { logMessage } from "../log/journal.js";
import { recordUsage, type UsageEntry } from "../log/usage.js";
import { debugLog } from "../log/debug.js";
import type { Config } from "../config.js";

export interface BackgroundTask {
  id: string;
  name: string;
  prompt: string;
  systemPromptSuffix?: string;
  maxBudget?: number;
  /** Source label for usage tracking (e.g. "skill:housekeeping", "scheduler") */
  source?: UsageEntry["source"];
}

const running = new Map<string, { startedAt: number }>();

const PROGRESS_THROTTLE_MS = 15_000;

export function isBackgroundRunning(taskId: string): boolean {
  return running.has(taskId);
}

export function getRunningTasks(): string[] {
  return [...running.keys()];
}

/**
 * Run a task in the background using an isolated SDK session.
 * - Sends immediate ack to WhatsApp
 * - Throttled progress updates (max 1 per 15s)
 * - Final result delivered to WhatsApp
 * - Duplicate prevention via running map
 * - Fire-and-forget — does not block the caller
 */
export function runBackground(task: BackgroundTask, config: Config): void {
  if (running.has(task.id)) {
    console.log(`[bg] Skipping ${task.name} — already running`);
    sendToOwner(`_${task.name} is already running_`).catch(() => {});
    return;
  }

  running.set(task.id, { startedAt: Date.now() });
  console.log(`[bg] Starting: ${task.name} (id=${task.id})`);
  debugLog("bg-start", `${task.name} id=${task.id}`);

  // Fire-and-forget
  executeBackground(task, config).finally(() => {
    running.delete(task.id);
    console.log(`[bg] Finished: ${task.name}`);
  });
}

async function executeBackground(task: BackgroundTask, config: Config): Promise<void> {
  const startTime = Date.now();

  // Immediate ack
  await sendToOwner(`🔧 \`\`\`Starting ${task.name} in background...\`\`\``).catch(() => {});

  // Throttled progress
  let lastProgressAt = 0;
  const onProgress = (message: string) => {
    const now = Date.now();
    if (now - lastProgressAt < PROGRESS_THROTTLE_MS) return;
    lastProgressAt = now;
    sendToOwner(`🔧 \`\`\`[${task.name}] ${message}\`\`\``).catch(() => {});
  };

  try {
    const result = await queryBackground(task.prompt, config, {
      systemPromptSuffix: task.systemPromptSuffix,
      maxBudget: task.maxBudget,
      onProgress,
    });

    const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
    const source: UsageEntry["source"] = task.source ?? `background:${task.id}`;

    // Record usage
    recordUsage({
      source,
      costUsd: result.costUsd,
      numTurns: result.numTurns,
      durationMs: result.durationMs,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      contextWindow: result.contextWindow,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("[bg] Failed to record usage:", err));

    // Journal the output
    await logMessage("ai", `[${task.name}]\n${result.response}`).catch(() => {});

    // Deliver result to WhatsApp
    if (result.response.trim()) {
      await sendToOwner(result.response);
      console.log(`[bg] ${task.name}: done in ${durationSec}s, $${result.costUsd.toFixed(3)}, sent ${result.response.length} chars`);
    } else {
      console.log(`[bg] ${task.name}: done in ${durationSec}s, $${result.costUsd.toFixed(3)}, no response`);
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`[bg] ${task.name} failed after ${durationSec}s:`, errMsg);
    debugLog("bg-error", `${task.name} failed: ${errMsg}`);
    await sendToOwner(`_${task.name} failed: ${errMsg}_`).catch(() => {});
  }
}

/**
 * Convenience: resolve a skill command and run it in the background.
 * Returns true if the skill was resolved and started, false if not a valid skill.
 */
export async function runBackgroundSkill(
  skillName: string,
  args: string,
  config: Config,
): Promise<boolean> {
  const input = args ? `/${skillName} ${args}` : `/${skillName}`;
  const { prompt, skillName: resolved } = await resolveSkill(input);

  if (!resolved) return false;

  const displayName = skillName.charAt(0).toUpperCase() + skillName.slice(1).replace(/-/g, " ");
  runBackground(
    {
      id: skillName,
      name: displayName,
      prompt,
      source: `skill:${skillName}`,
      maxBudget: config.maxBudget,
    },
    config,
  );

  return true;
}
