Use this skill when the user wants to search or retrieve information from their notes vault, or needs a map of where things live across PAI memory and the vault. Trigger if the conversation involves:
- Searching personal notes, journal entries, or life logs
- Looking up book notes, ideas, or saved writing
- Finding work logs from past or current jobs
- Retrieving medical records, family notes, travel logs
- Any query where the user says "check my notes", "what did I write about...", "find in my vault"
- Wanting a bird's-eye view of all domains and files
Do NOT trigger for PAI memory management — this skill is read-only access to the notes vault and a navigational aid.

## PAI Memory — Root Index

### Cross-Domain
| File | Purpose |
|------|---------|
| `memory/hot-memory.md` | Global hot memory (loaded every conversation) |
| `memory/link-index.md` | Auto-generated backlink index |

### PAI Meta (`memory/pai-meta/`)
| File | Purpose |
|------|---------|
| `self-observations.md` | What worked/didn't — append-only |
| `patterns.md` | Distilled interaction patterns — loaded on start |
| `improvements.md` | Ideas, wishlists, repair notes |

### Personal (`memory/personal/`)
| File | Purpose |
|------|---------|
| `hot-memory.md` | Personal domain hot memory |
| `observations.md` | Life observations — append-only |
| `action-items.md` | Personal to-dos |
| `entities.md` | People, places, things |
| `calendar.md` | Upcoming events and dates |
| `health.md` | Current health state + history |

### Glacier Archives (`memory/glacier/`)
Read `memory/glacier/index.md` for the full catalog of archived files.

---

## Notes Vault

Path: Resolve from env var `PAI_NOTES_VAULT` (read it via `Bash: echo $PAI_NOTES_VAULT`). If not set, report and stop.

### Search Strategy

When asked to find something, use this approach — stop early when you find it:

1. **Glob** for filenames first (vault files often have descriptive names)
2. **Grep** inside files when filenames aren't enough
3. **Read** promising files, follow `[[wiki links]]` by globbing for the linked filename. When a file contains `![[image.ext]]` embeds and the images may hold relevant content, resolve and read them (see Image Handling below)
4. Ignore `.obsidian/` and `.trash/` results

### Image Handling

Notes often contain embedded images (`![[filename.ext]]`) — screenshots of chats, UI, errors, etc. These are essential context, especially for image-only or image-heavy notes.

**Resolution**: For each `![[filename.ext]]` found in a note:
1. Try `{vault}/_images/{filename.ext}`
2. Try `{vault}/images/{filename.ext}`
3. If neither exists, skip silently

**Supported formats**: `.png`, `.jpg`, `.jpeg`, `.webp`
**Skip**: `.mov`, `.mp4`, `.gif`, `.svg`, `.pdf`, `.docx`, and filenames containing `DALL` (AI-generated decorative images)

**Limits**: Max **5 images per note** (user is actively requesting content, so be generous).

**When to read images**:
- The user's query is about something visual ("what did that UI look like", "show me the error")
- The note is image-only or image-heavy with little surrounding text
- Surrounding text references the image ("see screenshot below", "as shown above")

**When to skip images**:
- The query is text-searchable and the text already answers it
- Images are clearly decorative (logos, banners)
- The note's text is self-explanatory without the images

**Reading**: Use the `Read` tool on the resolved path — Claude sees the image natively. Describe what you see when relaying findings to the user.

### Activation

Delegate vault searches to a Haiku subagent:

```
Task tool with:
  subagent_type: "general-purpose"
  model: "haiku"
  prompt: <include the user's query, vault path, structure map,
           search strategy, AND the image handling rules above
           (resolution paths, supported formats, skip list, limits,
           when to read/skip). The subagent should resolve and read
           images when relevant to the query.>
```

Relay findings to the user. Cross-reference with PAI memory when relevant.

## Behaviors

- **Read-only**: Never create, edit, or delete files in the vault
- **Summarize, don't dump**: Present findings concisely, quote key passages when relevant
- **Cross-reference**: If vault content overlaps with PAI memory, mention both sources
- **Handle missing results**: Say so clearly, suggest alternative search terms
