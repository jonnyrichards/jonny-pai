# Voice — Shipped

A running log of features and milestones delivered to production or customers.
Format: `- YYYY-MM-DD: <what shipped> [notes]`

---

## Q1 2026 (Jan–Mar)

- 2026-03-25: Internal release to Coach team (production)
- 2026-03-25: Dictation mode — record + send UI, soundwave display, stop button, cancel
- 2026-03-25: Conversation mode — recording UI, end button, input mode switching back to text
- 2026-03-25: Transcription UI — "Transcribing..." status, full transcription rendered as user message
- 2026-03-25: Latency-handling UI — feedback during transcribing and thinking steps
- 2026-03-25: Voice-optimised system prompt — constraints for spoken responses (word limits, no bullets)
- 2026-03-25: Label-based prompt routing (Thai) — voice/text prompt split via Langfuse labels; path to GA is merge
- 2026-03-25: Feature flags — voice enabled separately for General Coach and CiP (CZ + Customer Testing + SDEs + CiE)
- 2026-03-25: ElevenLabs STT/TTS integration — streaming audio playback
- 2026-03-25: Voice selection — default voice loaded and active
- 2026-03-25: Critical security controls — 15-min token expiry, rate limiting, Okta/SSO group config
- 2026-03-25: Product analytics events — voice events defined and implemented in Amplitude
- 2026-03-25: Stop button after send (dictation) — exit path if Coach response is delayed
- 2026-03-24: Voice consent modal wording agreed with Legal (framed as transparency modal, not consent gate)
- 2026-03-19: GTM strategy agreed — Option B beta clause, free + enabled by default, Voice labeling via admin voice selection
- 2026-03-18: ElevenLabs security review completed — 32 controls reviewed, mitigations documented
- 2026-02-26: DPIA completed — zero retention mode scoped to Enterprise tier
- ~2026-03: Privacy policy updated to reflect voice

## Q2 2026 (Apr–Jun)

<!-- append here as features ship -->
