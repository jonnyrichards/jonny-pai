# Work Memory

PAI's internal knowledge about work projects lives here.

## Structure

Each project gets its own subdirectory:

```
work/
  {project-name}/
    hot-memory.md       # <50 lines — current priorities, active blockers
    observations.md     # Append-only, timestamped — decisions, learnings, status
    shipped.md          # Append-only — features/milestones delivered to prod or customers
    patterns.md         # Distilled themes from observations
    action-items.md     # Tasks with dates (replaces BACKLOG)
    entities.md         # People, systems, dependencies
```

## File Conventions

| File | Pattern | Purpose |
|------|---------|---------|
| `hot-memory.md` | Rewrite freely | Active context — what's happening now |
| `observations.md` | Append only | Timestamped log of events/decisions/learnings |
| `shipped.md` | Append only | One line per shipped feature/milestone with date |
| `patterns.md` | Edit in place | Distilled insights from observations |
| `action-items.md` | Check off when done | Tasks with dates |
| `entities.md` | Edit in place | People, systems, tools |

## Observation Tags

Use tags at the end of observation entries for searchability: `[work]`, `[legal]`, `[security]`, `[tech-debt]`, `[competitive]`, `[milestone]`.

Add `[shipped]` when an observation records something that went to production — this allows a quick `Grep` for shipped items at end-of-quarter without relying solely on `shipped.md`.

## Relationship to Projects

Memory files **reference** external-facing documents in `../../projects/{project}/`:

```markdown
# work/voice/hot-memory.md

Current: Beta launch preparation
- Spec: [[../../projects/voice/spec.md]]
- Status: [[../../projects/voice/status.md]]
```

**Memory = internal context** (how you think about the project)
**Projects = external artifacts** (polished docs for your team)
