---
title: Coach | LangGraph Migration + Orchestration | One-pager
created_date: 2026-03-18
status: draft
confluence_page_id: 6040027505
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6040027505/Coach+LangGraph+Migration+Orchestration+One-pager"
last_synced: "2026-03-18T06:42:55.799Z"
---

# Description

All Coaches are now on LangGraph, Agno removed, and an Orchestrator routes queries between MSS, Manager Review, Insights, and General Coach agents.

## The Problem

**User Problem:**
Coaches are siloed by product area — users can't ask MSS, Insights, Perform, or General Coaches about other topics.

**Business Problem:**
- Maintaining two agent frameworks (LangGraph + Agno) is inefficient
- Technical debt blocks faster Coach innovation
- Siloed implementations create inconsistent user experiences

---

## Why

**Business Impact:**
- **Reduced maintenance burden**: Single framework means faster feature development and easier bug fixes
- **Foundation for orchestration**: Unified architecture enables intelligent routing between Coach agents
- **Unblocks future Coach capabilities**: Removes the technical debt ceiling that's slowing innovation

**Customer Impact:**
- **More natural conversations**: Users can ask questions across product boundaries without switching contexts
- **Consistent experience**: All Coaches behave uniformly — same capabilities, same quality

---

## Success Metrics

### Primary
- **Framework consolidation**: Agno removed; 100% of Coach implementations on LangGraph
- **Cross-product query rate**: X% of Coach sessions include queries spanning multiple product areas (baseline: 0%)

### Secondary (Technical)
- **Development velocity**: Time to ship new Coach features decreases by X% post-migration
- **Routing accuracy**: Orchestrator routes to the correct agent at X% accuracy

---

## Target Audience

All users of Coach across General, Engage, and Perform use cases.

---

## What

A unified Coach implementation that:
1. Runs entirely on LangGraph — no Agno dependency
2. Routes user queries intelligently between MSS, Manager Review, Insights, and General Coach agents via a central Orchestrator
3. Surfaces Coach on the home page as the primary entry point

[Link to designs when available]

---

## How

### Phase 1: LangGraph Migration

**Goal:** Migrate all Coach implementations to LangGraph and remove Agno dependency

**Milestones:**
- Migrate Coach in Perform (CiP) to LangGraph
- Migrate General Coach to LangGraph
- Remove Agno dependency
- **Milestone: LangGraph migration complete** — all Coaches on a single framework, Agno removed

**Exit Criteria:** All Coach implementations on LangGraph, Agno removed, no regression in existing behaviour

---

### Phase 2: LangGraph Orchestration

**Goal:** Implement an Orchestrator that routes queries between Coach agents; ship Coach on home page

**Parts:**
- POC / Spike: connect multiple LangGraph graphs, validate routing logic
- Productionise: evals, tuning, release

**Milestones:**
- **Milestone: Coach on home page** — unified Coach entry point live for all users
- Evals framework for Orchestrator routing validated

**Exit Criteria:**
- Orchestrator routes queries between MSS, Manager Review, Insights, and General Coach agents
- Coach available from home page as primary entry point

---

## Open Questions

1. **Session history:** Is session history temporarily removed at Phase 2 launch, pending the Unified Sessions initiative?
2. **Routing logic:** What signals does the Orchestrator use — intent classification, context, explicit user selection?
3. **Evals strategy:** What test scenarios are critical for validating graph routing accuracy?
4. **Home page scope:** What is the minimum viable Coach home page experience for Phase 2 launch?

---

## Dependencies & Risks

**Dependencies:**
- LangGraph migration (Phase 1) must complete before Orchestrator POC can begin
- Home page design decisions needed to unblock Phase 2 delivery
- Instrumentation strategy needed to track cross-product query metrics

**Risks:**
- LangGraph migration may reveal unexpected complexity in existing Agno implementations
- Orchestrator routing logic may require more tuning than anticipated

**Mitigation:**
- Build multi-graph POC early in Phase 2 to surface routing complexity
- Allocate dedicated discovery time for routing logic design