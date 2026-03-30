# PAI Improvements

<!-- Ideas, wishlists, repair notes. Edit in place by section. -->

## Feature Ideas

## Bug Fixes

## Optimization Ideas

## Workflow Improvements

- **Auto-route observations**: When owner pastes an observation without specifying a file, infer the domain from content and write to the correct `observations.md`. Confirm with a single "→ domain/observations" line. Handles cross-domain by picking most relevant file. Triggers: message starts with "observation" or "O: {text}" shorthand. (added 2026-03-27, updated 2026-03-31)
- **Quarter close ritual**: At end of each quarter, sweep `shipped.md` + `[shipped]`-tagged observations across all projects and draft a look-back doc. Also check for slipped items and carry-forward risks. Trigger: "Q[N] retro", "look back", "what did we ship". (added 2026-03-31)
- **shipped.md per project**: Each work project has a `shipped.md` — one line per delivered feature/milestone with date. Append when something goes to prod. Use `[shipped]` tag in observations too for redundant discoverability. (added 2026-03-31)
