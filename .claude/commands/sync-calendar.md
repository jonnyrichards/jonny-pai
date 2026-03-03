Pull the live calendar and update PAI memory. Trigger if the user says "sync calendar", "update calendar", or similar.

## Prerequisites

Requires `gcalcli` to be installed. This only runs on the machine where the WhatsApp bridge is active (not the work laptop). Check with `which gcalcli` — if not found, report and stop.

## Process

1. **Pull live calendar** — Run `gcalcli agenda "$(date +%Y-%m-%d)" "$(date -v+7d +%Y-%m-%d)"` to get the next 7 days.

2. **Update memory** — Cross-reference with `memory/personal/calendar.md` and update the memory file with any new or changed events.

3. **Flag prep needs** — Note anything that needs preparation or upcoming birthdays/important dates from entities files.

4. **Report** — Summarize what changed in the calendar.
