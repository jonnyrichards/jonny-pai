import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { Cron } from "croner";
import type { Config } from "../config.js";
import { logEvent } from "../log/journal.js";
import { runBackground } from "../ai/background.js";
import { allTasks, type ProactiveTask } from "./tasks.js";

const SCHEDULER_LOG = join(homedir(), ".pai", "logs", "scheduler.jsonl");

async function logTaskOutcome(entry: {
  timestamp: string;
  taskId: string;
  status: "started";
}): Promise<void> {
  try {
    await mkdir(join(homedir(), ".pai", "logs"), { recursive: true });
    await appendFile(SCHEDULER_LOG, JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("[scheduler] Failed to write outcome log:", err);
  }
}

export class Scheduler {
  private jobs: Cron[] = [];
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  start(): void {
    this.stop();

    if (!this.config.schedulerEnabled) {
      console.log("[scheduler] Scheduler disabled via PAI_SCHEDULER_ENABLED=false");
      return;
    }

    const enabledTasks = allTasks.filter((t) => t.enabled);
    console.log(
      `[scheduler] Starting with ${enabledTasks.length} tasks (timezone: ${this.config.timezone})`,
    );

    for (const task of enabledTasks) {
      const job = new Cron(task.cron, { timezone: this.config.timezone }, () => {
        this.scheduleTask(task);
      });
      this.jobs.push(job);
      console.log(`[scheduler] Registered: ${task.name} (${task.cron})`);
    }
  }

  stop(): void {
    for (const job of this.jobs) {
      job.stop();
    }
    if (this.jobs.length > 0) {
      console.log(`[scheduler] Stopped ${this.jobs.length} cron jobs`);
    }
    this.jobs = [];
  }

  private scheduleTask(task: ProactiveTask): void {
    // Duplicate prevention is handled by runBackground()
    console.log(`[scheduler] Triggering task: ${task.name}`);
    logEvent(`Scheduler: triggering ${task.name}`).catch(() => {});

    logTaskOutcome({
      timestamp: new Date().toISOString(),
      taskId: task.id,
      status: "started",
    }).catch(() => {});

    const prompt = task.buildPrompt(this.config);
    const budget = Math.min(task.maxBudget, this.config.schedulerMaxBudget);

    runBackground(
      {
        id: task.id,
        name: task.name,
        prompt,
        systemPromptSuffix: task.systemPromptSuffix,
        maxBudget: budget,
        source: `scheduler:${task.id}`,
      },
      this.config,
    );
  }
}
