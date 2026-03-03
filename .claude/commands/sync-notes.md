Scan the notes vault for new or recent entries and sync relevant findings into PAI memory. Trigger if the user says "sync notes", "check notes", "scan notes", or similar.

## Process

1. **Resolve vault path** — Read `PAI_NOTES_VAULT` from `.env` (fallback: check env var). Check the directory exists with `ls`. If not accessible, report and stop.

### Image Handling

Notes often contain embedded images (`![[filename.ext]]`) — screenshots of chats, UI, errors, etc. These are essential context, especially for image-only or image-heavy notes.

**Resolution**: For each `![[filename.ext]]` found in a note:
1. Try `{vault}/_images/{filename.ext}`
2. Try `{vault}/images/{filename.ext}`
3. If neither exists, skip silently

**Supported formats**: `.png`, `.jpg`, `.jpeg`, `.webp`
**Skip**: `.mov`, `.mp4`, `.gif`, `.svg`, `.pdf`, `.docx`, and filenames containing `DALL` (AI-generated decorative images)

**Limits**: Max **3 images per note**, max **10 images per sync run**. Prioritize images referenced near meaningful text or that appear to be the note's primary content.

**Reading**: Use the `Read` tool on the resolved path — Claude sees the image natively. After viewing, write a bracketed description to memory: `[Screenshot: Slack thread about X]` or `[Screenshot: error output from build]`.

2. **Scan for recent vault entries** — Use Glob and file modification times to find `.md` files modified in the last 24 hours. Scan running-logs directories and other areas of the vault. Read any entries found. After reading each note, scan for `![[...]]` embeds and resolve/read images per the rules above. Cross-reference with PAI memory — add relevant findings to the right domain files.

3. **Scan for other recent vault changes** — Use Glob to find .md files across the vault that may have been modified recently. Skip files in: Templates/, .obsidian/, .trash/. Read anything interesting — new project docs, reflections, or companion files are worth capturing. Apply the same image handling rules, but be more selective.

4. **Report** — Summarize what was found and what was synced into memory.
