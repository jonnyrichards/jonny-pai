# Voice — Patterns

Distilled insights from observations. Edit in place as understanding evolves.

## Customer Demand

**Reality:** Very low organic demand (4/550+ accounts requested voice). When mentioned proactively, shows "wow factor" but no active pull.

**Primary driver:** Competitive positioning/neutralization, not customer demand.

**Sales insight:** "Powerful in sales scenario, but energy doesn't translate to adoption" (Tom Lewis).

## Use Cases

**Two distinct modalities:**
1. **Conversation mode** — real-time back-and-forth
2. **Dictation mode** — voice-to-text input (5/6 Pendo mentions cite this for speed in performance reviews)

**Best-fit scenarios:**
- ESL managers (translation/comprehension barrier)
- Accessibility (screen readers, assistive devices)
- Mobile/on-the-go (field workers, store managers)

**Constraint:** Desktop-first optimization limits applicability. Response length (200-300 words in Perform) makes voice impractical without significant UX rework.

## Product Strategy

**Positioning:** Voice as interface modality, not separate feature/product. Universal (not admin opt-in).

**V1 decisions:**
- Single default voice (opinionated, simpler build)
- Conversation + dictation modes
- Stop/exit buttons critical for user control
- TTFB calculated frontend, attached to voice_response_started event

**Future:** V2 = Voice in Perform (currently out of scope, discovery running in parallel).

## Legal/Compliance

**Requirements:** DPIA, user consent (biometric data/GDPR), privacy policy update, data deletion review, sub-processor list.

**Scope boundary:** Input modality only. Extension to authentication/identification/analysis = new DPIA (special category data).

**Beta labeling:** "Beta" label alone has no legal standing. Option B: Accept near-term risk for existing customers, introduce beta clause in new contracts/renewals.

**ElevenLabs contract:** Non-negotiable terms: (1) unpredictable financial terms, (2) mandatory co-branding if building competitive tool, (3) consent requirements. Enterprise tier = zero retention mode.

## Sales/Commercial

**P&P strategy:** Launch free with explicit signaling (current subscription term). PGLT: "Anchor on adoption, don't worry about P&P complexities."

**Demo:** Voice needs live demo, won't play well on customer speakers (barrier to sales enablement).

**Perform integration friction:** "Can we use it in Perform?" → "no" response creates sales objection.

## Technical

**Frontend:** TTFB calculation, versioned consent model (scales to future features).
- Versioned consent: store consent version per user; increment when new features require new consent; existing users re-prompted only on accessing new features; new users see latest version upfront. All-or-nothing tradeoff acknowledged.

**Infrastructure:** Okta integration (MFA, permissions), rate limiting, security testing coordination.

**Unified Nav blocker:** Team wants only Cerbos/Launch Darkly; pushback on service rework.
