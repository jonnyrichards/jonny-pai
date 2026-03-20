---
title: Voice Coach - Go-to-Market Document
confluence_page_id: 5951226056
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5951226056/Voice+Coach+-+Go-to-Market+Document"
last_synced: "2026-03-05T04:31:45.000Z"
---

## Executive Summary

We are adding voice interaction to AI Coach - enabling users to speak to Coach rather than type. This delivers competitive parity with Lattice (our #1 competitor who heavily markets voice) and provides tangible differentiation in sales pitches.

**Primary Goal:** Zero instances of deals falling over because AI Coach does not offer voice mode.

**Target Release:**
- **Mar 16:** Customer Zero (internal)
- **Mar 30:** Sales Demo Environment (SDE)
- **Early-Mid April:** Limited Beta (C1+ customers)
- **Late April:** Beta (all customers, 100% rollout)

---

## Product Benefit: Why Voice in Coach?

**Voice delivers competitive parity with Lattice and provides tangible differentiation in sales pitches.** It embodies a marked industry shift towards voice-enabled AI, and positions Culture Amp at the cutting edge of AI coaching.

**User value:** Voice makes coaching feel more intuitive and human - you're talking to a coach, not typing to a chatbot.


**Key use cases:**
- **Preparing for difficult conversations** - role-play scenarios before a tough 1:1
- **Giving feedback** - practice delivering feedback in a safe environment

**Core features:**
- **Two modes**: Conversation Mode (free, back-and-forward conversation with zero UI) and Dictation Mode (voice-to-text input)
- **Streaming audio with synchronized text** - see and hear responses in real-time
- **Seamless mode switching** - shift from voice to text (or vice versa) mid-conversation
- **Interruption handling** - users can interrupt Coach mid-response

**What's NOT included in V1:**
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

- **Trial rate:** X% of enabled users try voice at least once (target TBD after Phase 1)
- **Retention:** X% of voice users use it 3+ times (indicates genuine value, not just curiosity)
- **Usage volume:** 2% of all requests to the Coach backend use voice
- **Session quality:** Voice session length comparable to or exceeding text sessions (indicates engagement)
- **Error rate:** Voice session abandon/error rate < X% (target TBD after Phase 1)
- **Cost:** Voice session cost is < 50% higher than text (higher cost per token; lower token count)

---

## Data Privacy and Consent
[This is under active discussion. Main question is whether as an Enterprise customer we will qualify for Eleven Labs' Zero Retention Mode. If not, we can't give customers any guarantees that their voice recordings will not be stored.]


## Release Strategy

We're using a **three-phase approach** to roll out Voice in General Coach, moving from internal testing through Limited Beta to full Beta release.

**Key principles:**
- **Universal feature** (not admin opt-in) - voice is an input modality, not an admin-enabled feature
- **Sales enablement-first** - primary business case is competitive positioning; SDE enabled before customer rollout
- **Phased rollout** - enables quantitative feedback vs. small tester pool of traditional EAP
- **Beta positioning** - preserves pricing/packaging flexibility for future decisions

---

### Phase 1: Build + Customer Zero (Feb 16 - Mar 30)

**Goal:** Build core voice functionality for General Coach and release to Customer Zero

**Key Milestones:**
- **Feb 16 - Mar 16:** Build core voice functionality (STT + TTS) with P0 features
- **Feb 16 - Mar 16:** Complete legal requirements (DPIA, consent flow, privacy policy updates, Eleven Labs contract)
- **Mar 16:** Release to Customer Zero (Culture Amp employees)
- **Mar 16 - Mar 30:** Internal testing, bug identification, and fixes based on CZ feedback
- **Mar 30:** Enable for Sales Demo Environment (SDE) - once legal certainty around contracts achieved
- **Mar 30:** Sales Enablement sessions begin

**Exit Criteria:**
- Core functionality complete and validated through CZ testing
- Bug fixes implemented based on CZ feedback
- Instrumentation validated
- Legal requirements completed
- SDE enabled for sales teams
- Ready for Limited Beta release

---

### Phase 2: Limited Beta (Early-Mid April)

**Goal:** Release Voice to C1+ customers ([x]% customers) for initial validation and feedback

**Key Milestones:**
- **Early-Mid April:** Release to Limited Beta - C1+ customers (percentage-based rollout) + any customer who requests
- **Early-Mid April onwards:** Product analytics monitoring begins
- **Early-Mid April onwards:** Weekly usage/adoption metrics review
- **Early-Mid April onwards:** Sales feedback collection

**Exit Criteria:**
- Limited Beta rollout complete to target C1+ customer segment
- Initial adoption and usage data collected
- No blocking issues preventing wider Beta release
- Sales teams enabled and providing feedback

---

### Phase 3: Beta (Late April - Ongoing)

**Goal:** Release Voice to all customers (100% rollout)

**Key Milestones:**
- **Late April - Early May:** Release to Beta - All customers (100% rollout, labeled as "Beta")
- **Late April - Early May:** Light-touch marketing activities
- **Late April - Early May:** Update customer materials
- **Late April - Early May onwards:** Continued bug fixes and improvements
- **Late April - Early May onwards:** Ongoing metrics review and sales tracking

**Exit Criteria:**
- Voice available to 100% of customers
- Marketing materials published
- Ongoing monitoring and improvement processes established

---

## Timeline at a Glance

| Date | Milestone |
|------|-----------|
| **Feb 16 - Mar 16** | Build + legal completion |
| **Mar 16** | Customer Zero launch (internal) |
| **Mar 16 - Mar 30** | CZ testing + bug fixes |
| **Mar 30** | SDE enabled |
| **Early-Mid April** | Limited Beta (C1+ customers) |
| **Mid April** | Sales Enablement sessions |
| **Late April** | Beta (all customers, 100% rollout) |

---

## Open Questions for Sales Enablement Discussion

1. **Battle card timing:** When do we need battle cards ready? (Before SDE on Mar 30, or can they follow?)
2. **Demo scripts:** Do we need canned demo scripts, or is SDE access + messaging enough?
3. **Deal tracking:** What's the best way to instrument "voice mentioned in deal" tracking? Manual tagging? CRM field?
4. **Competitive intel:** What are you hearing about Lattice's voice feature in the field?
5. **Pricing questions:** How do we handle "is this extra cost?" questions? (Answer: No, included in Coach at launch; future pricing TBD)
6. **SDE access:** What's the best way to showcase Voice in pitches using Sales Demo Environment (available Mar 30)
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
- [ ] Finalize battle cards and demo scripts (by Mar 30)
- [ ] Set up deal tracking instrumentation with Sales Ops (by Mar 30)
- [ ] Schedule Sales Enablement sessions for SDE launch (Mar 30)
- [ ] Establish feedback loop from AEs → PM for prospect reactions (ongoing from Apr 1)