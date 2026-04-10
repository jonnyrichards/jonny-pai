---
title: Voice Coach - Go-to-Market Document
confluence_page_id: 5951226056
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5951226056/Voice+Coach+-+Go-to-Market+Document"
last_synced: "2026-03-25T00:55:12.232Z"
---

## Executive Summary

We are adding voice interaction to AI Coach - enabling users to speak to Coach rather than type. This delivers competitive parity with Lattice (our #1 competitor who heavily markets voice) and provides tangible differentiation in sales pitches.

**Primary Goal:** Zero instances of deals falling over because AI Coach does not offer voice mode.

**Target Release:**
- **Mar 30:** Customer Zero (internal)
- **April 20:** Limited Beta (C1+ customers)
- **Early May:** SDEs enabled
- **Mid May:** Beta (all customers, 100% rollout)

---

## Product Benefit: Why Voice in Coach?

**Voice delivers competitive parity with Lattice and provides tangible differentiation in sales pitches.** It embodies a marked industry shift towards voice-enabled AI, and positions Culture Amp at the cutting edge of AI coaching.

**User value:** Voice makes coaching feel more intuitive and human - you're talking to a coach, not typing to a chatbot.


**Key use cases:**
- **Preparing for difficult conversations** - role-play scenarios before a tough 1:1
- **Giving feedback** - practice delivering feedback in a safe environment

**Core features:**
- **Two modes**: Conversation Mode (free, back-and-forward conversation with zero UI) and Dictation Mode (voice-to-text input) in General Coach
- **Streaming audio with synchronized text** - see and hear responses in real-time
- **Seamless mode switching** - shift from voice to text (or vice versa) mid-conversation
- **Interruption handling** - users can interrupt Coach mid-response

**What's NOT included:**
- Perform voice (on hold pending discovery)
- Voices selection (one voice for Coach initially)
- Mobile optimization (Coach is desktop-first across all modalities)

---

## Success Metrics

### Sales Impact (Primary)

These are the metrics that validate the business case:

- **Zero instances of deals falling over because AI Coach does not offer voice mode**
- **Sales confidence:** Sales teams feel they have stronger competitive positioning vs. Lattice and develop improved battle cards showcasing Coach's voice capabilities
- **Close rate impact:** Track close rate of deals where voice was demoed vs. not demoed (target: neutral or positive impact)
- **Deal mentions:** Voice is mentioned/demoed in at least X deals per quarter (baseline TBD with Sales)

### Adoption & Usage (Secondary)

These metrics help us understand if users find value beyond the "cool factor":
- **Trial rate:** 10-15% of enabled users try voice at least once (target TBD after Phase 1)
- **Retention:** 20% of triallers (~0.5% of enabled users) use it 3+ times (indicates genuine value, not just curiosity)
- **Usage volume:** 0.5-1% of all requests to the Coach backend use voice

---

## Positioning: Voice in the Broader Coach Narrative

Voice isn't a standalone feature — it's the natural delivery mechanism for Coach's highest-value use cases. As Coach expands beyond General Coach into performance workflows, voice is how those workflows become *practiced*, not just *planned*.

**The narrative link to Perform:**

The Perform GTM narrative positions Coach as moving from insight to action — "don't just review performance, improve it continuously." Voice is where that action becomes real. Users don't just read coaching advice; they rehearse the conversation they need to have.

**How voice fits the Perform story:**

| Perform narrative | Voice use case |
|---|---|
| "Prepare for your most important conversations" | Voice roleplay before a difficult 1:1, feedback session, or performance review |
| "Coach for everyone, not just managers" | Employees can practice receiving and responding to feedback — conversationally, not just in writing |
| "Practice what matters" | Voice as the premium, high-perceived-value differentiator — the thing that makes Coach feel like a real coach, not a chatbot |

**Sales framing:**

When selling into accounts already using or evaluating Perform, voice becomes a concrete answer to "what makes Coach different?" — *"You can talk to it. Rehearse the conversation before you have it."* That's a demo moment, not a feature bullet.

---

## Data Privacy and Consent
[This is under active discussion. Main question is whether as an Enterprise customer we will qualify for Eleven Labs' Zero Retention Mode. If not, we can't give customers any guarantees that their voice recordings will not be stored.]


## Release Strategy

We're proposing a three-phase approach to introducing Voice to General Coach, moving from internal testing (Customer Zero) through Limited Beta to full Beta release.

---

### Phase 1: Build V1 + Customer Zero Release

_Duration_: Feb 16 - Apr 17

_Goal_: Build core voice functionality for General Coach and release to Customer Zero

_Milestones_:

**Feb 16 - Mar 16:** Build core voice functionality (STT + TTS) with P0 features
**Feb 16 - Mar 16:** Work through legal requirements (3P provider decision, DPIA + AICA, security risk assessment, consent flow)
**Mar 23 - Mar 30:** Internal (Coach Camp) testing + refinement
**Mar 30:** Ready for Customer Zero (Still in progress: 3P provider implementation, analytics + monitoring, security assessment response, consent)
**Mar 30 - Apr 17:** Customer Zero release, CZ testing + bug fixing, complete: analytics implementation, security assessment response

_Rationale_:

* Low-risk validation with internal users first
* Technical stability confirmed before customer release


### Phase 2: V1 (General Coach) Limited Beta rollout

_Duration_: Mid April - early May

_Goal_: Release Voice to C1+ customers for initial validation and feedback

_Milestones_:

**April 20:** Release to Limited Beta - C1+, any customer who requests
**April 20 onwards:** Collect and analyze usage data
**April 20 onwards:** Continued bug fixes and improvements

_Rationale_:

* Phased rollout reduces risk before full launch
* More quantitative feedback from broader user base than small tester pool
* 'Universal feature' appropriate for new input modality; no admin opt-in friction
* Preserves pricing/packaging flexibility


### Phase 3: V1 (General Coach) Beta (roll out to all customers)

_Duration_: Mid May ->

_Goal_: Release Voice to all customers (100% rollout)

_Milestones_:

**Early May:** Enable SDEs
**Early May:** Update customer materials
**Mid May:** Release to Beta - All customers (100% rollout, labeled as "Beta")
**Late May:** Sales Enablement to coincide with upgrade to Coach in Perform
**Late May:** Light-touch marketing activities

_Rationale_:

* SDEs precede Beta release
* 'End May' enablement push coincides with CiP activities (Coach in SR / PAUF etc.)
* Beta positioning preserves flexibility

---

## Timeline at a Glance

| Date | Milestone |
|------|-----------|
| **Feb 16 - Mar 16** | Build + legal completion |
| **Mar 23 - Mar 30** | Internal (Coach Camp) testing + refinement |
| **Mar 30** | Customer Zero launch (internal) |
| **Mar 30 - Apr 17** | CZ testing + bug fixing |
| **April 20** | Limited Beta (C1+ customers) |
| **Early May** | SDEs enabled + customer materials updated |
| **Mid May** | Beta (all customers, 100% rollout) |
| **Late May** | Sales Enablement push + light-touch marketing |

---

## Open Questions for Sales Enablement Discussion

1. **Battle card timing:** When do we need battle cards ready? (Before SDEs in early May, or can they follow?)
2. **Demo scripts:** Do we need canned demo scripts, or is SDE access + messaging enough?
3. **Deal tracking:** What's the best way to instrument "voice mentioned in deal" tracking? Manual tagging? CRM field?
4. **Competitive intel:** What are you hearing about Lattice's voice feature in the field?
5. **Pricing questions:** How do we handle "is this extra cost?" questions? (Answer: No, included in Coach at launch; future pricing TBD)
6. **SDE access:** What's the best way to showcase Voice in pitches using Sales Demo Environment (available early May)
7. **Quarterly targets:** Is it possible to set targets for voice mentions in deals to validate business case?
8. **Objection handling:** How do we best prepare for common questions? (FAQ: privacy, cost, when to use voice vs. text)

---

## Target Customer List (for Beta Outreach)

These customers have expressed interest or are good candidates for early feedback:

**Note:** Review this list and top 10 accounts by usage a few weeks after GC moves to GA (11 March) - approximately early April.

| **Customer** | **Insight** |
|--------------|-------------|
| **Pursuit** | Stakeholders ask about voice every time Coach is demoed; managers with English as 2nd language would benefit |
| **IPSY** | Explicitly asked if voice mode available |
| **GrabTaxi** | Asked about it last year; keen Coach users |
| **Apollo.io** | Mentioned voice interest |
| **NCCI** | Interested in voice for scenario planning in Coach |
| **Appian** | Always keen on cutting edge; good for friendly beta |
| **WPP** | Excited about voice; actively trialing Valence (Nadia) - **competitive intel opportunity** |
| **Avalere Health** | Top 10 GC user |
| **Emumba** | Top 10 GC user |
| **GroupM** | Top 10 GC user |
| **Transcarent** | Top 10 GC user |
| **Ogilvy** | Top 10 GC user |
| **Design Bridge & Partners** | Top 10 GC user |
| **Landor** | Top 10 GC user |
| **AKQA** | Top 10 GC user |
| **Libra Solutions** | Top 10 GC user |
| **Morning star** | Top 10 GC user |

---

## Next Steps

- [ ] Review this GTM doc with Sales Enablement (week of Feb 24)
- [ ] Finalize battle cards and demo scripts (by early May)
- [ ] Set up deal tracking instrumentation with Sales Ops (by early May)
- [ ] Schedule Sales Enablement sessions for SDE launch (early May)
- [ ] Establish feedback loop from AEs → PM for prospect reactions (ongoing from Apr 20)