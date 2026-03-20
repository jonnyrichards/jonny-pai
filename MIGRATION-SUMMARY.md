# Voice Project Migration Summary

Migration completed: 2026-03-09

## What Was Done

### 1. Created Base Structure ✅

**Memory (internal knowledge):**
```
memory/work/
  README.md              # Conventions guide
  voice/
    hot-memory.md        # <50 lines — current priorities, blockers
    observations.md      # Timestamped append-only log
    patterns.md          # Distilled insights
    entities.md          # People, systems, customers
    action-items.md      # Tasks (replaces BACKLOG)
```

**Projects (external docs):**
```
projects/
  README.md              # Structure guide
  voice/
    coach-voice-one-pager.md
    feature-list.md
    rfc-voice-evaluation-framework.md
    voice-coach-go-to-market.md
    voice-beta-labeling-options.md
    product-analytics.md
    kickoff-meeting-agenda-mar3.md
    .confluence/         # Confluence sync metadata
```

### 2. Migrated Voice Project ✅

**From:** `pm-underlord/Projects/Voice/`
**To:** `jonny-pai/projects/voice/` + `jonny-pai/memory/work/voice/`

**What went where:**

| Original | New Location | Type |
|----------|--------------|------|
| `project_context.md` (45KB) | Split into `memory/work/voice/` files | Memory extraction |
| Polished docs (7 files) | `projects/voice/` | External artifacts |
| BACKLOG.md entries | `memory/work/voice/action-items.md` | Tasks |

**Memory extraction from project_context:**
- **hot-memory.md** — Current phase, timeline, blockers, strategic anchor
- **observations.md** — 20+ timestamped events (Feb-Mar 2026 + customer research)
- **patterns.md** — 6 themes: customer demand reality, use cases, product strategy, legal/compliance, sales/commercial, technical
- **entities.md** — 30+ people, 4 vendors, 10+ customers, 5 products/systems
- **action-items.md** — 6 active tasks from BACKLOG

### 3. Confluence Sync Skill ✅

**Copied:** `pm-underlord/skills/confluence-sync/` → `jonny-pai/.claude/commands/confluence-sync/`

**Updated paths:** `Projects/` → `projects/` in SKILL.md documentation

**Usage:**
```bash
# Create page
node .claude/commands/confluence-sync/cli.js create projects/voice/spec.md

# Push changes
node .claude/commands/confluence-sync/cli.js push projects/voice/spec.md

# Pull updates
node .claude/commands/confluence-sync/cli.js pull projects/voice/spec.md
```

## Key Differences: PAI vs pm-underlord

### Old Structure (pm-underlord)
- Single `project_context.md` "brain" file (45KB+)
- `BACKLOG.md` at root for all tasks
- `Projects/` folder with mixed content (research + working notes)
- Unclear boundaries between context and backlog

### New Structure (jonny-pai)
- **Memory tiered:** hot-memory (<50 lines) + observations (append) + patterns (distilled)
- **Domain-based:** `memory/work/{project}/` per project
- **Clear separation:** memory (internal) vs projects (external)
- **Progressive condensation:** raw events → patterns → hot-memory

## How to Use the New System

### Adding New Info

**Just dump it:** Tell PAI about new information, PAI will route it:
- Timestamped events → `observations.md`
- Active context → `hot-memory.md`
- Recurring themes → `patterns.md`
- People/systems → `entities.md`
- Tasks → `action-items.md`

### Working with Projects

**Memory = your brain:**
- What you're thinking
- What you've learned
- What's blocking you

**Projects = team artifacts:**
- Polished docs
- Synced to Confluence
- External consumption

### Cross-References

Memory can link to projects:
```markdown
# memory/work/voice/hot-memory.md

Current: Beta launch prep
- Spec: [[../../projects/voice/feature-list.md]]
```

## Next Steps

1. **Try it out** — Add a new observation to Voice project, see how PAI handles it
2. **Migrate more projects** — Apply same pattern to other pm-underlord projects
3. **Adapt as needed** — Structure is flexible, adjust based on what works

## File Locations

- **This repo:** `/Users/jonathan.richards/code/jonny-pai/`
- **Old repo:** `/Users/jonathan.richards/code/pm-underlord/`
- **Memory:** `memory/work/voice/`
- **Projects:** `projects/voice/`
- **Confluence skill:** `.claude/commands/confluence-sync/`
