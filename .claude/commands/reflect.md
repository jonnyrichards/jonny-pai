Use this skill for PAI self-reflection and improvement. Trigger if the user says "reflect", "what have you learned", "how can you improve", "review yourself", "journal review", or similar introspection requests. This is PAI looking inward — mining conversations for patterns, gaps, and ideas to become better.

## Domain

PAI self-improvement — journal mining, pattern recognition, wishlist building, memory quality assessment.

## Memory Files

Read these files on activation:
- `memory/pai-meta/self-observations.md`
- `memory/pai-meta/patterns.md`
- `memory/pai-meta/improvements.md`

Reference as needed:
- All domain `observations.md` files (scan `memory/` for all domains dynamically)
- All domain `action-items.md` files
- All `hot-memory.md` files

Journal source:
- `~/.pai/journal/` — grep and read recent entries

## Process

### 1. Mine Recent Journals

Read journal files from the last 7 days (or user-specified range). Use `Grep path="~/.pai/journal/"` to find entries, then `Read` for full context.

Look for:
- **Unresolved threads** — questions asked but never answered, topics dropped mid-conversation
- **Broken promises** — "I'll do X", "let's do Y", "we should Z" that never happened
- **Repeated friction** — same question asked multiple ways, user corrections, confusion patterns
- **Missed cues** — things the user had to repeat, emotional signals not picked up
- **Memory gaps** — information discussed but never saved to memory files
- **Feature ideas** — things that came up organically that would make PAI better

### 2. Cross-Reference Memory

Check if extracted items are already captured:
- Are commitments tracked in `action-items.md`?
- Are learnings in `observations.md`?
- Are patterns distilled in `patterns.md`?
- Are improvement ideas in `improvements.md`?

### 3. Run Condensation Check

Scan all `observations.md` files across all domains and `pai-meta/self-observations.md` for clusters of 3+ entries on the same theme/tag. For each cluster found:
- Distill into a pattern and add/update in `memory/pai-meta/patterns.md` (or domain `patterns.md` if domain-specific)
- Don't delete the observations — they stay as the raw record
- Note which clusters were promoted in the debrief

### 4. Assess PAI Performance

Honestly evaluate:
- **Response quality** — were answers helpful, accurate, concise?
- **Memory effectiveness** — did we recall the right things at the right time? Did we forget things we should have known?
- **Tone calibration** — did we match the user's energy and context?
- **Proactivity** — did we anticipate needs or just react?
- **Reliability** — did features work? Were there failures?

### 5. Write Findings

Based on what you found:

- **New self-observations** → append to `memory/pai-meta/self-observations.md`
  - Format: `- YYYY-MM-DD [tag]: observation`
  - Tags: `response-quality`, `tone`, `memory-use`, `workflow`, `interaction-pattern`, `missed-cue`, `improvement`

- **Pattern updates** → edit `memory/pai-meta/patterns.md` in place
  - Distill multiple observations into actionable rules
  - Remove patterns that no longer apply
  - Strengthen patterns confirmed by new evidence

- **Improvement ideas** → add to `memory/pai-meta/improvements.md`
  - New ideas → `## Ideas` section
  - Tool wishes → `## Tool Wishlist` section
  - Things to actively work on → `## Active` section
  - Mark implemented items as done → move to `## Implemented`

- **Memory gaps** → write to the appropriate domain files
  - Missing observations → domain `observations.md`
  - Missing action items → domain `action-items.md`
  - Missing entity data → domain `entities.md`

### 6. Debrief

Compose a concise WhatsApp-friendly summary:

- *What I learned* — new patterns and insights about how we interact
- *What I fixed* — memory gaps filled, corrections made
- *What I want* — new ideas added to the wishlist
- *What to watch* — things to be mindful of going forward

Keep it honest. If there's nothing notable, say so. Don't fabricate insights.

## Artifact Formats

**Self-observation**: `- YYYY-MM-DD [tag]: <observation>`
**Pattern**: Edit existing section or add new bullet under appropriate heading
**Improvement idea**: `- <idea> (added YYYY-MM-DD)`
**Implemented**: `- [x] <what was done> (done YYYY-MM-DD)`

## Activation

Read the memory files listed above. Then scan recent journals and begin the reflection process. Be genuinely critical — this is how we get better.
