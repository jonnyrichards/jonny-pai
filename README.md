# PAI — Personal AI Assistant

A personal AI assistant that lives in your WhatsApp self-chat, powered by the Claude Code SDK.

PAI maintains persistent memory across conversations, transcribes voice messages, generates images, and proactively sends morning briefings and nightly housekeeping summaries.

## Features

- **WhatsApp self-chat interface** — talk to yourself, PAI responds
- **Claude Code SDK integration** — streaming responses with session persistence and skill resolution
- **Persistent memory** — three-tier memory with wiki-links, progressive condensation, and dynamic Memory Router Index
- **Skill system** — `/command` patterns resolved from `.claude/commands/` with full context injection
- **Voice messages** — transcribes audio via Whisper, responds with voice notes via TTS
- **Image handling** — receives images/documents, generates images via OpenAI, edits referenced images
- **Scheduled tasks** — morning briefing (8am), self-reflection (6pm), nightly housekeeping (11pm)
- **Session management** — rotates on `/clear` with summarization to memory
- **Real-time progress** — tool call visibility ("reading memory/personal/calendar.md") sent as WhatsApp updates
- **Debug logging** — daily debug logs with `/log` command for troubleshooting
- **Vault journaling** — optional Obsidian/notes vault integration for conversation archival
- **Usage tracking** — tracks cost and token usage per interaction, with skill-level breakdown
- **Journal logging** — daily conversation logs in `~/.pai/journal/`

## Quick Start

### Prerequisites

- Node.js >= 22.12.0
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- A WhatsApp account

### Setup

```bash
# Clone and install
git clone <your-repo-url> pai
cd pai
npm install

# Configure
cp .env.example .env
# Edit .env — optionally set OPENAI_API_KEY for voice/image features
# Set PAI_TIMEZONE to your timezone

# Run in development
npm run dev

# Or build and run in production
npm run build
npm start
```

On first run, scan the QR code with WhatsApp (Settings > Linked Devices > Link a Device).

### Commands

Send these in your WhatsApp self-chat:

| Command | What it does |
|---------|-------------|
| `/ping` | Health check — responds "pong" |
| `/cost` | Today's usage report (cost, tokens, sessions) |
| `/log` | Tail today's debug log |
| `/clear` | Summarize and clear the current session |
| `/audio` | Toggle audio response mode (voice notes) |

Skills are also invoked as commands — just type `/personal`, `/sync`, `/reflect`, etc. These are resolved by the SDK and defined in `.claude/commands/`. See the [Skills](#skills) section below for the full list.

## Architecture

```
WhatsApp Self-Chat
    ↓
Baileys Socket (src/whatsapp/)
    ↓
Message Queue (src/index.ts)
    ↓
Claude Code SDK (src/ai/claude.ts)
    ↓
Response → WhatsApp (text / audio / image)
    ↓
Journal + Vault + Debug Logging (src/log/)
```

### Memory System

Three-tier persistent memory in `memory/`:

- **Hot** (`*/hot-memory.md`) — loaded every conversation, <50 lines
- **Warm** (domain files) — loaded when skill activates, guided by the Memory Router Index
- **Glacier** (`memory/glacier/`) — YAML-frontmattered archives, indexed via `glacier/index.md`

Features:
- **Memory Router Index** — auto-generated in system prompt, maps domains to files with line counts and modification dates
- **Wiki-links** — `[[domain/filename]]` cross-referencing between memory files, with auto-generated `link-index.md`
- **Progressive condensation** — observations → patterns → hot-memory flow, with automatic glacier archival by tag

Memory changes are auto-committed to git via a Claude Code hook (`.claude/hooks/sync-memory.sh`).

### Skills

Domain-specific skills live in `.claude/commands/`. Each skill defines:
- When to trigger
- Which memory files to read
- How to behave

Skills are automatically resolved when messages start with `/command` — the SDK loads the corresponding `.claude/commands/<command>.md` file and injects it as skill instructions.

Built-in skills:

| Skill | Purpose |
|-------|---------|
| `/personal` | Family, health, calendar, day-to-day |
| `/explainer` | Writing, explanation, drafting |
| `/notes` | Search notes vault (read-only) |
| `/reflect` | PAI self-improvement, journal mining |
| `/history` | Deep journal search and recall |
| `/housekeeping` | Memory maintenance and archival |
| `/humanizer` | De-AI text, clean up AI writing |
| `/sync` | Sync all (git, notes, calendar) |
| `/commit` | Git operations |

Add your own by creating `.claude/commands/<name>.md` and adding it to the routing table in `CLAUDE.md`.

## Customization

### Make it yours

1. **Edit `CLAUDE.md`** — this is PAI's brain. Customize the persona, add domains, adjust memory rules
2. **Add skills** — create `.claude/commands/<skill>.md` for work, hobbies, projects
3. **Add memory domains** — create `memory/<domain>/` directories with the standard files (hot-memory, observations, action-items, entities)
4. **Tune scheduler** — edit `src/scheduler/tasks.ts` to change cron times or add new scheduled tasks
5. **Connect a notes vault** — set `PAI_NOTES_VAULT` to enable vault journaling and nightly note scanning

### Environment Variables

See `.env.example` for all options. Key ones:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PAI_MODEL` | No | `sonnet` | Claude model to use |
| `PAI_TIMEZONE` | No | `America/New_York` | Timezone for scheduler |
| `OPENAI_API_KEY` | No | — | Enables voice + image features |
| `PAI_SCHEDULER_ENABLED` | No | `true` | Enable/disable scheduled tasks |
| `PAI_NOTES_VAULT` | No | — | Path to notes vault (e.g. Obsidian) |

## Development

```bash
# 4-pane tmux session (vim, dev server, claude cli, shell)
bash tmux.sh

# Or just run the dev server
npm run dev
```

## Credits

Created by [Marcio Puga](https://github.com/marciopuga).

The memory system — three-tier architecture with progressive condensation,
wiki-links, glacier archival, and Memory Router Index — is his original design.

## License

MIT
