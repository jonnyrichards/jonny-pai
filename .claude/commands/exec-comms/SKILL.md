---
name: exec-comms
description: Drafts executive memos and stakeholder communications. At Culture Amp, exec comms are Slack-native, casual, and emoji-friendly. Also supports traditional formats (Amazon 6-pager, SCQA) for formal documents.
---

# Executive Communication

## When This Skill Activates

Claude uses this skill when:
- Writing executive memos or updates
- Creating board updates
- Drafting stakeholder emails
- Structuring strategic docs
- Communicating decisions or rollout plans to leadership

**For real examples from actual Culture Amp exec comms,** see `memory/work/craft/exec-comms-examples.md`

## Culture Amp Style: Slack-Native Exec Comms

**Default format for Culture Amp executive communications:**

### Style Guidelines

**Tone:**
- Casual and conversational ("Hi all," "Hope this makes sense")
- Direct and action-oriented
- Use emojis liberally but purposefully
- Friendly closing ("Shout with any questions! :yay:")

**Structure:**
- BLUF (Bottom Line Up Front) - key decision/update in opening line
- Emoji headers for scanability (`:rocket:`, `:thinking_face:`, `:woman-running:`)
- Concise phases/sections with inline emoji formatting
- Clear "Next Steps" section with dates
- Keep total length short (roughly 30-40 lines max)

**Formatting:**
- Title: `:emoji: Topic` (not markdown header)
- Section headers: `**:emoji: Section Name**` or `**:emoji: Phase X: Description**`
- Bullets with bold for emphasis
- Specific dates and milestones

### Template: Slack-Native Update

```markdown
:emoji: [Topic]

Hi all, sharing that [action/decision context], we've aligned on [key approach/decision]:

**:rocket: Phase/Section 1: [Name] ([Timeline])**
- Key point with specific details
- Key point with dates
- Key point with context

**:vertical_traffic_light: Phase/Section 2: [Name] ([Timeline])**
- Key point
- Key point

**:key: Key principles/considerations**
- **Principle 1** - explanation in plain language
- **Principle 2** - why this matters
- **Principle 3** - specific benefit

**:thinking_face: [Addressing common question/concern]**
- Answer to anticipated question
- Context or rationale

**:woman-running::skin-tone-2: Next Steps**
- **Now:** Current action
- **[Date]:** Milestone
- **[Date]:** Milestone
- **[Date]:** Milestone

Hope this makes sense. Shout with any questions! :yay:
```

### Example: Voice Rollout Update

```markdown
:purple_megaphone: Update on Voice Rollout

Hi all, sharing that after recent discussions, we've aligned on a **three-phase approach to roll out Voice in General Coach** (Q1 -> Q2), with Perform Voice in a Discovery phase:

**:rocket: Phase 1: Build + Customer Zero (Feb 16 - Mar 30)**
- Build core STT/TTS functionality + complete legal requirements (DPIA, consent, privacy policy, Eleven Labs contract)
- Mar 16: Release to Customer Zero (Culture Amp employees)
- Mar 30: Enable Sales Demo Environment once legal certainty achieved

**:vertical_traffic_light: Phase 2: Limited Beta (Early-Mid April)**
- Roll out to C1+ customers (percentage-based)
- Begin weekly metrics review: adoption rate, retention, session quality

**:dart: Phase 3: Beta (Late April - Ongoing)**
- Roll out to 100% of customers, labeled as "Beta"
- Beta labeling preserves pricing/packaging flexibility for future decisions

**:key: Key principles**
- **Universal feature** (not admin opt-in) - voice is an input modality, not an admin-enabled feature
- **Sales enablement-first** - primary business case is competitive positioning; SDE enabled before customer rollout
- **Phased rollout** - phased rollout enables quantitative feedback vs. small tester pool of traditional EAP
- **Beta positioning** - Beta enables a phased approach at the same time as preserving pricing/packaging flexibility

**:thinking_face: What About Perform?**
- V2 (Voice in Perform) is out of scope for Q2. We're doing Discovery in parallel to work through the UX implications of Coach in Perform's longer responses
- Goal of Discovery: Determine if we can enable Perform Voice with prompt modifications rather than significant engineering work. If we can solve with prompts, this unlocks faster delivery

**:woman-running::skin-tone-2: Next Steps**
- **Now:** Phase 1 build in progress (Feb 16 - Mar 16)
- **Mar 16:** Customer Zero launch
- **Mar 30:** Sales Enablement sessions + SDE enabled
- **Early-Mid April:** Limited Beta to C1+ customers
- **Late April:** Beta to all customers

Hope this makes sense. Shout with any questions! :yay:
```

---

## Amazon 6-Pager Style (For Deep Analysis)

**Use when:**
- Major strategic decisions requiring detailed tradeoffs analysis
- Board-level communications
- Cross-functional alignment on complex initiatives
- Building a case with data, alternatives, and risk mitigation
- Formal proposals that need comprehensive rationale

**Format:**
```markdown
# [Title]: [One-line summary]

## Executive Summary (BLUF - Bottom Line Up Front)
[Key decision/recommendation in 2-3 sentences]

## Situation
[Current state, context]

## Complication
[Problem or opportunity]

## Question
[What needs to be decided or understood]

## Recommendation
[Your proposal]

## Rationale
[Why this is the right approach]
- Reason 1
- Reason 2
- Reason 3

## Alternatives Considered
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A      | ...  | ...  | Not chosen |
| B      | ...  | ...  | **Recommended** |

## Next Steps
1. [Action] - [Owner] - [Date]
2. [Action] - [Owner] - [Date]

## Success Metrics
- [How we'll measure success]

## Risks & Mitigation
- **Risk:** [describe] → **Mitigation:** [how we'll handle]

## Appendix
[Supporting data, details]
```

**Style notes:**
- More formal and structured than Slack-native comms
- Data-driven with clear alternatives analysis
- Comprehensive risk/mitigation section
- Typically 1-3 pages
- Can stand alone without additional context

---

## SCQA Framework (Quick Reference)

**Use when:** Structuring problem-oriented communications quickly.

**Structure:**
- **Situation:** Current state
- **Complication:** Problem/challenge
- **Question:** What should we do?
- **Answer:** Your recommendation

---

## Quick Reference

### 📝 Culture Amp Exec Comms Checklist

**Structure:**
- [ ] BLUF in opening line (key decision/update stated upfront)
- [ ] Emoji title (`:emoji: Topic`)
- [ ] Phases/sections with emoji headers
- [ ] Specific dates and milestones
- [ ] "Next Steps" section with timeline
- [ ] Friendly closing

**Style:**
- [ ] Casual tone ("Hi all," "Hope this makes sense")
- [ ] Emojis for scanability
- [ ] Short (30-40 lines max)
- [ ] Conversational explanations
- [ ] Action-oriented

**Content:**
- [ ] Context provided where timeline/approach shifted
- [ ] Key principles explained in plain language
- [ ] Anticipated questions addressed
- [ ] Specific details (not just high-level)

### 📝 Traditional Exec Comms Checklist

**For formal documents (6-pagers, board updates):**

**Structure:**
- [ ] BLUF (bottom line first)
- [ ] Context clear
- [ ] Decision/recommendation obvious
- [ ] Next steps specific

**Style:**
- [ ] Concise (no fluff)
- [ ] Scannable (bullets, headers)
- [ ] Data-backed
- [ ] Action-oriented

---

## Key Principles

**Culture Amp:**
> "Exec comms live in Slack. Keep them casual, emoji-friendly, and scannable."

**Amazon:**
> "Start with the press release. Work backwards."

**On Executive Writing:**
> "If you can't summarize it in 2 sentences, you don't understand it well enough."

