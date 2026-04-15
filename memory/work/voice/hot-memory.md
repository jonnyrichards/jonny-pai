# Voice — Hot Memory

**Phase:** Post-internal release — Customer Zero prep (Phase 1 of 3-phase rollout)

**Timeline:**
- Mar 25: Internal release to Coach team — DONE
- Early Apr: Customer Zero (C0) — rebook testers, EL contract signed
- Mid Apr: Limited Beta (C1+)
- Late Apr-Early May: Beta to all customers

**Active blockers / focus areas:**
- Latency — primary bottleneck is LLM (not voice pipeline); bar is 2–3s not 5s; Mindy wants to experience prod with all optimisations in place before forming a view; options doc at `projects/voice/latency-options.md`
- ElevenLabs contract — holding on signing until pipeline confidence established; dictation-first with EL pre-contract still on table
- CZ rollout — pending Coach Leads go-ahead; RMC async sign-off still required
- Beta features toggle — Ben Kloester aligned on opt-out in regular Settings; needs eng owner (Jay/Jas)
- Session Management — PGLT collab session targeting Tue 2026-04-21; attendees: Ally, Jay, Coach leads + PGLT

**Key docs:**
- [[../../projects/voice/coach-voice-one-pager.md]] — project overview
- [[../../projects/voice/feature-list.md]] — feature spec
- [[../../projects/voice/voice-beta-labeling-options.md]] — P&P strategy

**Project structure:**
- `projects/voice/` — Voice-specific work
- `projects/core-coach/` — Foundational Coach work (cross-instance; e.g. disclaimer messaging, message context)
- `projects/customer-knowledge-base/` — Q2 project, separate to Voice
- `projects/unified-coach/` — Q2 project, separate to Voice

**Strategic anchor:**
Competitive positioning/neutralization (not customer demand). Maximize adoption while preserving future P&P flexibility.
