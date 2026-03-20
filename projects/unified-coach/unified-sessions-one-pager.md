---
title: Coach | Unified Sessions | One-pager
created_date: 2026-03-18
status: draft
confluence_page_id: 6039667036
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6039667036/Coach+Unified+Sessions+One-pager"
last_synced: "2026-03-18T06:42:22.373Z"
---

# Description

A unified session layer that lets users access and resume Coach conversations anywhere, while intelligently updating context when a user navigates in the main panel.

## The Problem

**User Problem:**
- Session history is fragmented — opening General Coach doesn't show Engage Coach sessions
- Navigating in the main panel or the Coach panel (eg. loading a previous Coach session) leads to disconnects between main panel and Coach panel content

---

## Why

**Customer Impact:**
- **Continuity**: Users can pick up any Coach conversation from wherever they are in the platform
- **Coherence**: Users can navigate freely across the platform and the main and side panels feel like they stay in sync

**Business Impact:**
- **Engagement**: Accessible session history increases return usage of Coach

---

## Success Metrics

### Primary
- **Cross-Coach session visibility**: 100% of Coach sessions (General, Engage, Perform) visible in a single history view
- **Session history engagement**: X% increase in users returning to and resuming previous sessions

### Secondary
- **Session Coherence**: X% of users report that sessions persist in a coherent, understandable way
- **Session depth**: Average topics per session increases by X% (signals broader utility)

---

## Target Audience

All users of Coach across General, Engage, and Perform use cases.

---

## What

A unified session layer that:
1. Surfaces all Coach conversations — regardless of where they were started — in a single, accessible history view
2. Allows users to resume any session from anywhere across the platform
4. Preserves contextual integrity and prevents cross-topic contamination during navigation
5. Optimises session handling to maintain performance at scale

[Link to designs when available]

---

## How

### Phase 1: Unified Session History

**Goal:** Consolidate all Coach sessions into a single, discoverable history; establish session management foundations

**Milestones:**
- **Milestone: Single session history view** — all Coach sessions visible from one place, regardless of where they originated

**Exit Criteria:**
- Users can see and navigate all their Coach sessions (General, Engage, Perform) from a unified history view

---

### Phase 2: Session Continuity (Discovery-led)

**Goal:** Explore and implement the right solutions for session persistence, context coherence, and cross-context contamination prevention

**Milestones:**
- *(Optional)* **Milestone: Coach pane persists across site navigation** — the Coach side panel and active session survive navigating between pages

**Exit Criteria:**
- TBD based on Discovery outcomes

---

## Testing

**Approach:** Phased rollout focused on validating session management behaviours before broad release

**Customer Zero (Internal Testing):**
- Validate session history completeness across Coach entry points
- Identify UX friction points in session navigation and discovery
- Test session continuity behaviours across page navigation (Phase 2)

**Limited Beta (AI-curious customers / Beta group):**
- Gather qualitative feedback on unified session experience
- Monitor engagement with session history and return usage
- Track session depth

**Key Metrics:**
- Session history engagement (return visits)
- Cross-Coach session visibility
- Session depth (topics per session)
- User satisfaction (qualitative)

---

## Open Questions

1. **Session resume behaviour:** When a user resumes a session, does Coach re-navigate the main panel automatically, or prompt the user first?
2. **Cross-context contamination:** What are the guard rails — hard stops, warnings, or soft nudges?
3. **Performance at scale:** What is the upper bound on session history depth before performance degrades?
4. **Dependency on LangGraph migration:** Does Phase 1 require the LangGraph migration to be complete, or can it proceed independently?

---

## Dependencies & Risks

**Dependencies:**
- Session management design decisions must be resolved before Phase 2 implementation
- Main panel navigation instrumentation needed to support context restore
- Instrumentation strategy needed for success metrics tracking

**Risks:**
- Session context restoration UX requires significant discovery to get right
- Cross-context contamination edge cases may be harder to enumerate than anticipated
- Performance implications of unified session storage at scale are unknown

**Mitigation:**
- Allocate dedicated discovery time for session management UX in Phase 1
- Spike on context restoration mechanics early to surface complexity
- Define performance budgets and test at scale before broad rollout