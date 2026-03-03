Use this skill for deep journal search and recall. Trigger if the user says "what did I say about...", "when did we discuss...", "find that conversation about...", "history of...", or asks about past conversations that need multi-file search. For simple date/keyword lookups, a quick Grep suffices — this skill is for when you need to piece together a narrative from multiple journal entries.

## Domain

Conversation history — recursive journal search, cross-referencing with memory files.

## Memory Files

Read on activation:
- `memory/hot-memory.md` (for context on what's currently relevant)

Journal source:
- `~/.pai/journal/` — daily files named `YYYY-MM-DD.md`

## Process

### Pass 1: Locate

- Extract keywords from the user's query (names, topics, dates, phrases)
- `Grep path="~/.pai/journal/" pattern="<keyword>"` for each keyword
- Note which dates matched and how many hits per file
- If >5 files match, narrow by date range or add query terms
- If 0 files match, try synonyms or related terms

### Pass 2: Extract

- Read the top 3-5 most relevant journal files (by hit density and recency)
- Extract the specific conversation segments that match the query
- Note any cross-references to memory files mentioned in those conversations
- Track the timeline: when did the topic first come up? How did it evolve?

### Pass 3: Synthesize

- Combine extracted segments into a coherent answer
- Cross-reference with current memory files — did we save what was discussed?
- If something was discussed but NOT in memory, flag it as a gap:
  > "We discussed X on YYYY-MM-DD but it's not in any memory file — want me to save it?"
- Present findings chronologically with dates

## Artifact Formats

**Search result**: `YYYY-MM-DD: <summary of what was said>`
**Memory gap**: `Gap: discussed on YYYY-MM-DD but not in memory — <topic>`
**Timeline**: Chronological list of when a topic was discussed and how it evolved

## Activation

Extract search terms from the user's query and begin Pass 1. Be thorough but concise in the synthesis — don't dump raw transcripts.
