Sync this repo with origin main. Commit first if there are uncommitted changes, then sync.

## Process

1. **Check for uncommitted changes** — Run `git status` (never `-uall`).

2. **Commit if needed** — If there are staged or unstaged changes, run the `/commit all` skill first. If there's nothing to commit, skip to step 3.

3. **Pull with rebase** — Run `git pull --rebase origin main`. If there are merge conflicts, stop and show what's conflicting — don't auto-resolve.

4. **Push** — Run `git push origin main`.

5. **Report** — Summarize: commits created, commits pulled, commits pushed.
