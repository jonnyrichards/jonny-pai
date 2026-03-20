---
title: Coach | Unified Coach | One-pager
created_date: 2026-03-02
status: draft
confluence_page_id: 5981536364
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5981536364/Coach+Unified+Coach+One-pager"
last_synced: "2026-03-05T00:00:00.000Z"
---

# Description

We are proposing to unify Coach's currently siloed implementations into a single, context-aware Coach that can answer questions across all product areas while maintaining conversation history and enabling intelligent navigation.

## The Problem

**User Problem:**
- Users can't ask Coach in Perform about Engage topics (and vice versa) - Coaches are siloed by product area
- Session history is fragmented - opening General Coach doesn't show Engage Coach sessions
- Main panel content doesn't update based on Coach queries
- Opening old sessions doesn't restore related main panel content (e.g., survey reports)

**Business Problem:**
- Maintaining two agent frameworks (LangGraph + Agno) is inefficient
- Technical debt blocks faster Coach innovation
- Siloed implementations create inconsistent user experiences

---

## Why

**Business Impact:**
- **Reduced maintenance burden**: Single framework means faster feature development and easier bug fixes
- **Improved user experience**: Seamless Coach interactions across product areas increases engagement
- **Foundation for future Coach capabilities**: Unified architecture enables advanced features like intelligent navigation and contextual suggestions

**Customer Impact:**
- **More natural conversations**: Users can ask questions across product boundaries without switching contexts
- **Better session management**: Complete conversation history improves continuity and reduces repeated questions
- **Intelligent navigation**: Coach can surface relevant content in main panel based on conversation context

---

## Success Metrics

### Primary (User Engagement)
- **Cross-product queries**: X% of Coach sessions include queries spanning multiple product areas (baseline: 0%)
- **Navigation usage**: X% of users engage with Coach-driven main panel navigation
- **Session history engagement**: X% increase in users returning to previous sessions
- **Session depth**: Average topics per session increases by X% (signals broader utility)

### Secondary (Technical)
- **Code consolidation**: Agno removed, single LangGraph framework for all Coach implementations
- **Development velocity**: Time to ship new Coach features decreases by X%

---

## Target Audience

All users of Coach across General, Engage, and Perform use cases.

---

## What

A unified Coach implementation that:
1. Can answer questions across all product areas in a single conversation
2. Maintains complete session history regardless of where Coach was accessed
3. Intelligently updates main panel content based on conversation context
4. Provides seamless session management (naming, discovery, context restoration)

[Link to designs when available]

---

## How

### Phase 1: LangGraph Migration + Agno Removal
**Duration:** TBD

**Goal:** Migrate all Coach implementations to LangGraph and remove Agno dependency

**Milestones:**
- Migrate Coach in Perform (CiP) to LangGraph
- Migrate General Coach to LangGraph
- Remove Agno dependency
- Phase 2 Discovery: Session management + navigation vision, default session load behaviors, 'context tap'-based navigation, Coach-based navigation - eg. on session load, Relevance of permissions play into all this - are there constraints (?)

**Exit Criteria:** All Coach on LangGraph, Agno removed, Session management + navigation vision documented

---

### Phase 2: LangGraph Orchestration

**Duration:** TBD

**Goal:** Prove Unified Coach concept; implement Unified Coach

**Parts:**
- POC / Spike
- Productionize

**Milestones:**
- Spike on: 1. Connecting multiple LangGraph graphs 2. Unifying session history 3. Buiding session management + navigation vision
- Test POC, evaluate performance
- Decide what we like
- Implement session management + navigation (?) (TBD)
- Develop evals framework for Unified Coach

**Exit Criteria:**
- Coach now passes user between LangGraph graphs
- Users can navigate to any previous Coach session from a unified session history
- Coach can now navigate user around CA via session history (TBD)

---

## Testing

**Approach:** Phased rollout similar to Voice, but focused on optimization rather than feature validation

**Customer Zero (Internal Testing):**
- Validate cross-product query handling
- Test session management behaviors
- Identify UX friction points
- Validate navigation intelligence

**Limited Beta (AI-curious customers / Beta group):**
- Target similar customer list to Voice beta (Pursuit, Appian, WPP, etc.)
- Gather qualitative feedback on unified experience (full EAP? Intercom?)
- Monitor engagement with navigation features
- Track session depth and cross-product usage

**Key Metrics:**
- Session depth (topics per session)
- Cross-product query rate
- Navigation engagement
- Session history usage
- User satisfaction (qualitative)

---

## Open Questions

1. **Navigation behavior:** Does tapping Coach in nav continue to open General Coach in standalone page, or does it route intelligently based on context?
2. **Rollout scope:** Should we do CZ → Limited Beta → Full release, or is this core enough to go straight to full release after CZ?
3. **Evals strategy:** What testing scenarios are critical for validating graph routing and session management?
4. **Home page priority:** Is UC Home Page (Phase 3) must-have for Q2, or can it slip if Phase 1-2 take longer?

---

## Dependencies & Risks

**Dependencies:**
- LangGraph migration must complete before UC POC can begin
- Session management design decisions block Phase 2 implementation
- Instrumentation strategy needed for success metrics tracking

**Risks:**
- LangGraph migration may reveal unexpected complexity
- Graph routing logic may require more tuning than anticipated
- Session management UX needs significant discovery to get right

**Mitigation:**
- Build multi-node POC early (Phase 1) to surface LangGraph complexity
- Allocate dedicated discovery time in each phase
- Keep Phase 3 (Home Page) as flexible scope if earlier phases need more time