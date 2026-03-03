Run all sync skills in sequence: git, notes, and calendar. Trigger if the user says "sync", "sync all", "sync everything", or similar.

## Process

1. **Sync git** — Run the `/sync-git` skill (commit if needed, pull --rebase, push).
2. **Sync notes** — Run the `/sync-notes` skill (scan notes vault, update memory). Skips if vault not accessible.
3. **Sync calendar** — Run the `/sync-calendar` skill (pull gcalcli, update calendar.md). Skip if `gcalcli` is not installed.
4. **Report** — Combine the summaries from all three syncs.
