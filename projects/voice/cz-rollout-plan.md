---
title: Voice CZ Rollout Plan
confluence_page_id: 6090883335
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6090883335/Voice+CZ+Rollout+Plan"
last_synced: "2026-03-31T05:12:00.390Z"
---

# Voice CZ Rollout Plan

**Framing:** Two-phase rollout over ~2 weeks. Phase 1 = code changes + frontend improvements. Phase 2 = model switches. Kicks off Tues 7 April, targeting Limited Beta from ~Tues 21 April.

---

## Phase 1 — Code changes + perceived latency (Tues 7–11 April)

**Who:** Coach Camp, key execs (Paul, Mindy, Mander), ~10 CZ testers

**Engineering:**
1. Pre-fetch EL tokens on page load (cold start fix)
2. Remove timeout mitigations (added for mic feedback issue)
3. Move TTS to client-side (remove BFF)
4. Pipeline status indicators — "Transcribing…" → "Thinking…" → "Speaking…"
5. Consent modal — must land before pilot group is live

**Measurement:** Use existing DataDog metrics on the voice/TTS endpoint. Establish a before/after baseline — no additional instrumentation needed.

**Learning goal:** How much does latency improve (and feel) from code + UX changes alone, before touching models?

---

## Phase 2 — Model switches (Tues 14–18 April)

**Who:** Rest of Customer Zero

**Engineering:**
6. Swap EL voice model → Flash (faster, less emotionally overwrought)
7. Swap LLM → Haiku (speed/quality trade-off)

Deploy sequentially if feasible — Flash first, then Haiku — to isolate quality signal.

**Learning goals:**
- Additional latency improvement on top of Phase 1 (measured via same DD endpoint)
- Does Haiku produce noticeably lower quality responses? Collect qualitative feedback from pilot group alongside DD metrics
- Does Flash feel better or worse to users?

---

## Gate to Limited Beta (~Tues 21 April)

- [ ] DD metrics show meaningful improvement on TTS endpoint
- [ ] Qualitative feedback from pilot group reviewed (esp. post-Haiku)
- [ ] Consent modal live
- [ ] Voice labeling / self-serve disable decision made
- [ ] No material issues from CZ run

---

## Comms

Pilot group comms must cover:
- Opt-in framing
- Voice data may be processed by ElevenLabs
- Don't use voice for commercially sensitive discussions
- Loop in Megan

---

## Pre-7 April: Actions to complete

| Action | Owner |
|---|---|
| Draft + send pilot group comms (cc Megan) | Jonny |
| Re-engage ~10 CZ testers, confirm pilot group membership | Jonny |
| Collaborate with Ally on user testing plan | Jonny + Ally |
| Confirm EL deal / Zero Data Retention signed (prerequisite for Flash) | Jonny |
| Engineering sprint planning for Phase 1 items (incl. consent modal) | Jay |
| Ensure `enable_logging=False` sent with every EL request before pilot goes live | Eng |