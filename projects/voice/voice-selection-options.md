---
title: Coach Voice Selection — Options
status: draft
confluence_page_id: 6117687617
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6117687617/Coach+Voice+Selection+Options"
last_synced: "2026-04-09T04:53:39.000Z"
---

## Background

This paper maps paths forward for how we choose and manage Coach's voice — covering both the immediate decision needed for April (release of conversation mode), and longer-term options to consider once Voice is stable and we have usage data. Options are assessed on product/engineering effort, user benefit, and roadmap fit.

**Context on bandwidth:** Voice is targeting an April release. At time of writing, the initial Voice release has not yet shipped, a dictation-only interim approach is still under discussion, and primary engineering work (latency optimisations, security measures, consent handling) remains in progress. Voice selection is secondary to these. Any near-term option should impose minimal additional burden.

---

## Near-Term Options (by end April)

### Option A — Designate a single voice

#### ✅ Recommended

Select one voice from the PSX-recommended shortlist (TBD — Kristina's shortlist due EOP April 9). That voice becomes Coach's voice at launch. No user or admin control.

**Effort:** Zero engineering, minimal design. Decision only.

**User benefit:** Consistent, deliberate Coach identity from day one. A well-chosen voice with PSX backing performs better across scenarios than an internal popularity contest.

**Pros:**
- Fastest path to decision — unblocks the release
- No additional design or engineering capacity required (scarce right now)
- Consistent product identity: Coach has a voice, not a menu
- Reversible — we can add in voices later once we have usage data and demand signal
- Can react to known geographic usage patterns (59% of all Coach requests come from the US followed by Europe (30%) and APAC (20%))

**Cons:**
- No user agency — some users will prefer a different voice
- Commits us to a choice before we have customer signal

---

### Option B — Admin-selectable voice (small shortlist)

Org admins can select from a curated set of 2–3 voices (from the shortlist) on behalf of their organisation. Voice is consistent within a company but varies across customers.

**Effort:** 1–2 weeks engineering, plus design. New UI required (based on existing patterns), testing included. Design capacity is currently constrained — this is the primary risk.

**User benefit:** Gives enterprise admins agency over cultural/brand fit. Addresses some geographic variance.

**Pros:**
- Satisfies the "admin choice" use case Paul raised
- Allows some accommodation of geographic/cultural diversity without user-level complexity
- Still a small, curated set — avoids an unbounded voice catalogue

**Cons:**
- 1–2 week engineering estimate compresses an already tight timeline; no guarantee this would be completed in April, when engineers are due to move to other Q2 initiatives (Orchestration + Routing, Unified Sessions, CKB)
- Adds scope when the team is still resolving higher-priority Voice work (eg. security requirements, latency optimisations)
- Marginal benefit vs. effort

---

### Option C — Structured UX research first, then decide

Shortlist of 3 voices × 3 scenario types (opener, empathetic moment, pushback), rated on clarity, trust, and approachability. Decide based on data.

**Effort:** Design/research resource to design and run study. Make decision in 2–4 weeks

**User benefit:** Highest confidence in the choice. Decisions grounded in how real users experience the voice in context, not internal reactions.

**Pros:**
- Best signal quality before committing to a voice
- Builds a reusable UX research framework for future voice decisions

**Cons:**
- Incompatible with end-April timeline
- Delays the release for a secondary concern while primary Voice work is still outstanding
- Research effort competes with other Q2 priorities

---

## Longer-Term Options (post-April)

These options become viable once Voice is live, we have usage data, and capacity is available. Each would deprioritisation of other Q2 roadmap work to pursue.

---

### Option D — Curated catalogue, user-selectable voice

#### ✅ Recommended

Each user selects their own preferred voice from a curated catalogue. PSX and Greta/PSX-AI research strongly supports this as the right long-term model — multiple genders and accents are needed to serve a global user base.

**Effort:** Significant. New UI, voice catalogue management, per-user preference storage. Likely 4–6 weeks+ including design.

**User benefit:** Highest. Accommodates individual cultural and personal preferences. PSX research backs this as the most equitable and effective approach.

**When to revisit:** Once Voice is stable post-launch, when we have demand signal from users, and when design capacity is available. Likely a Q3 consideration.

---

### Option E — Custom / cloned Coach voice

Commission a bespoke Coach voice using ElevenLabs voice cloning. Select a human voice talent, obtain consent and samples, clone via EL, and ship a Coach-specific voice identity.

**Effort:** High (Product; Eng effort is low). Requires sourcing voice talent (legal constraints: no CA employee voices), consent process, EL cloning workflow, extensive QA across scenario types and edge cases, and ongoing maintenance. Product and design effort to define the brief and validate the output.

**User benefit:** Strongest brand differentiation. A Coach voice that is uniquely Coach — not a commodity off-the-shelf voice. Potential long-term value if Coach voice becomes a recognised product identity.

**Pros:**
- Unique and ownable
- EL voice cloning is a mature capability we already have access to

**Cons:**
- Significant effort before we have any customer signal that voice quality/identity is a demand driver
- Legal constraint: voices of CA employees cannot go to production (already confirmed)
- Quality is highly sensitive to source material and cloning process — QA burden is non-trivial
- Premature investment if users are broadly satisfied with an off-the-shelf choice

**When to revisit:** After Voice has been live 2–3 months, if user feedback surfaces dissatisfaction with the voice identity specifically, or if a competitive differentiation case emerges.

---

## Recommendation

**Near-term: Option A.** Designate a single voice based on the PSX shortlist. No additional engineering or design effort required. Consistent with where our bandwidth should be focused — shipping Voice, not building voice selection infrastructure. The choice is reversible.

**Longer-term: Option D (user-selectable) as the target state,** informed by usage data. The PSX research position is clear: multiple voices across genders and accents is the right long-term model. We should plan for this in H2, not before we've shipped V1.

Custom voice (Option E) should be parked until we have customer demand signal. It is a high-effort, high-reward option — but premature before Voice has any real-world usage.