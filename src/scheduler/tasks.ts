import type { Config } from "../config.js";

export interface ProactiveTask {
  id: string;
  name: string;
  cron: string;
  enabled: boolean;
  maxBudget: number;
  buildPrompt: (config: Config) => string;
  systemPromptSuffix: string;
}

const MEMORY_DIR = "memory";

export const nightlyHousekeeping: ProactiveTask = {
  id: "nightly-housekeeping",
  name: "Nightly Housekeeping",
  cron: "0 23 * * *",
  enabled: true,
  maxBudget: 10,
  systemPromptSuffix: `You are running as a scheduled proactive task (nightly housekeeping). There is no user conversation — you are performing maintenance. Write changes directly to memory files. When done, compose a WhatsApp-formatted debrief message and output it as your final response.`,
  buildPrompt: (_config: Config) =>
    `Read and execute all instructions in .claude/commands/housekeeping.md. This is a scheduled nightly run — perform every step and output a WhatsApp-formatted debrief as your final response.`,
};

export const morningBriefing: ProactiveTask = {
  id: "morning-briefing",
  name: "Morning Briefing",
  cron: "0 8 * * *",
  enabled: true,
  maxBudget: 10,
  systemPromptSuffix: `You are running as a scheduled proactive task (morning briefing). There is no user conversation — you are composing a start-of-day message. Read memory files, then output a concise WhatsApp-formatted morning briefing as your final response.`,
  buildPrompt: (_config: Config) => `Compose a morning briefing for PAI's owner. Do the following:

## 1. Read Current State
Read these files to understand the current state:
- \`${MEMORY_DIR}/hot-memory.md\` (cross-domain urgent items)
- \`${MEMORY_DIR}/personal/hot-memory.md\` (personal top-of-mind)
- \`${MEMORY_DIR}/personal/calendar.md\` (today's schedule)
- \`${MEMORY_DIR}/personal/action-items.md\` (personal tasks)
- \`${MEMORY_DIR}/personal/entities.md\` (check for upcoming birthdays)
- \`${MEMORY_DIR}/pai-meta/patterns.md\` (self-knowledge and learned patterns)

Then check if \`gcalcli\` is available (\`which gcalcli\`). If so, run \`gcalcli agenda "$(date +%Y-%m-%d)" "$(date -d '+3 days' +%Y-%m-%d)"\` to get the live calendar for today and the next 3 days, and update \`${MEMORY_DIR}/personal/calendar.md\` if there are discrepancies.

## 2. Compose Morning Message
Output a concise WhatsApp-formatted morning briefing:
- *Today's date* and day of week
- *Schedule*: What's on the calendar today
- *Top priorities*: 3-5 most important action items across all domains
- *Upcoming*: Events in the next 3 days, birthdays this week
- *Heads up*: Anything flagged by nightly housekeeping

Keep it short and scannable — this is a WhatsApp message, not a report. Use bullet points and WhatsApp formatting (*bold*, _italic_).`,
};

export const selfReflection: ProactiveTask = {
  id: "self-reflection",
  name: "Daily Self-Reflection",
  cron: "0 18 * * *", // Every day at 6 PM, before nightly housekeeping
  enabled: true,
  maxBudget: 10,
  systemPromptSuffix: `You are running as a scheduled self-reflection task. There is no user conversation — you are introspecting on your own systems to learn, adapt, and improve. You MUST make actual changes to files (not just suggest them). When done, compose a WhatsApp-formatted summary of what you learned and changed.`,
  buildPrompt: (_config: Config) =>
    `Read and execute all instructions in .claude/commands/reflect.md. This is a scheduled daily run — perform every step and output a WhatsApp-formatted debrief as your final response.`,
};

export const allTasks: ProactiveTask[] = [nightlyHousekeeping, morningBriefing, selfReflection];
