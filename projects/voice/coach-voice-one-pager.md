---
title: Coach | Voice | One-pager
confluence_page_id: 5840339196
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5840339196/Coach+Voice+One-pager"
last_synced: "2026-03-16"
---

## Description

_This Thing in One Sentence_

We are proposing to add a voice modality to Coach - a way for users to get the benefits of Coach's insights via a free-flowing conversation rather than a lengthy text exchange.

## The Problem

_What is the problem this project addresses? (Ideally in 1 sentence)_

### Business Case

The business is losing deals to competitors who offer voice functionality. One instance of this is VML (WPP agency who Doug spoke to) who enquired about voice and said they were actively trialling Nadia and were getting good results when management coaching shifted to voice. There isn't a lot of additional evidence - one of our lead solutions engineers says only a small number of customers have enquired about voice capabilities in pitches. _But_ the lack of a voice modality in Coach has influenced or swayed enough large deals that we believe it will be a significant benefit to the business if sales teams can say we offer voice as part of their pitch.

### User Case

Users are tired of text-based interactions with AI and crave a coaching experience that is more accessible and human-like. The evidence for this proposition on the user side is less compelling: in a survey of CSMs representing more than 550 accounts, there were only 4 instances of a customer having requested or enquired about voice, coupled with 6 instances of Pendo feedback - over 2+ years. (See 'Customer Context' below.)

In other words the research suggests weak appetite for voice in customers. It is true that 'customers not sharing with us that they want voice' does not mean they don't want voice. But there is little available signal about the value customers place on voice-based interactions with Coach, or indeed in general.

**Pendo:** There are 6 mentions of 'voice' in Pendo - over several years (ie. several are not recent). 5 cite the speed of providing feedback in performance reviews as the basis of wanting/needing voice, but offer no more context.

**Interviews:** We interviewed 11 CSMs representing a mix of commercial and enterprise across more than 550 accounts, including CSMs who look after customers that are in the CiP EAP (so: AI-ready, leant in):

* Only 4 accounts have mentioned or requested voice (IPSY, National Council on Compensation Insurance, GrabTaxi, Apollo). The only insights that come out of these 4 instances: IPSY says they'd potentially like it for scenario planning capabilities (within Coach); GrabTaxi asked about general voice capabilities
* A few CSMs mentioned the 'cool' or 'wow' factor of voice and how it can add to the AI story, but in general it has not come up either from customers directly or in pitches
* We have several leads for follow up interviews: GrabTaxi (Chris Senior), ENT & Allergy, Faire (Katie Graves), NCCI (Kailey Marshall), Appian (Kate Baldoni), Aegon, Prosus, Allegro (Ada), Pipedrive, Teaching Lab (more recent Pendo requests)

**Notable quotes:**

* "Voice has not come up in any pitches. It's always nice to be at the cutting edge, but without knowing the customers real needs and evaluations, I'm not sure about this. I haven't heard of this ask yet so it wouldn't be top of my list to pursue."
* "It makes me wonder if it is the type of feature that is really powerful in a sales scenario, but then we dont see that energy translate to adoption"
* "Voice hasn't come up in any customer conversations about AI. My customers want Time-Based Reviews / Automation of Probation - these would be bigger wins as far as I'm concerned"

‌

---

## Why

**Competitive Landscape:**

* **Lattice** is the biggest proponent of voice as a modality for its AI. Late last year Lattice introduced voice to the Lattice AI Agent, and showcases these capabilities being 'available at no additional cost'; the main use cases they promote: "Rehearse tough conversations or ask questions on the go, just by speaking" - the idea of a "verbal sparring partner", and a "Meeting Assistant" which coaches towards better 1:1s (having listened in on the meeting)
* **Workday** has a partnership with BetterUp which has a voice-based Coach assistant. Use cases: preparing for difficult feedback, and role-play ahead of presentations. Integrates with Slack, Teams, and Calendars
* **15Five** acquired Kona, an AI-powered coaching tool which joins voice calls, transcribes, and then after the meeting analyzes the transcript and suggests improvements to meeting behaviour
* **Valence** offers a full, voice-focused management coach called Nadia which was cited by WPP in a call as a service they were actively trialling and which managers found useful

**User Benefits:**

Voice interactions offer tangible benefits for coaching:

* Feel more intuitive, immediate, and human
* Increase the speed of expression
* Reduce friction to engagement
* Make AI Coach 'more coaching-like'

---

## Success Metrics

_How do we know if we've solved this problem?_

### Sales Impact (Primary - Business Case)

* **Zero instances of deals falling over because AI Coach does not offer a voice mode**
* Sales confidence: Sales teams feel they have stronger competitive positioning selling against Lattice (#1 voice-enabled competitor) and develop improved battle cards showcasing Coach's voice capabilities
* Close rate impact: Track close rate of deals where voice was demoed vs. not demoed (target: neutral or positive impact)
* Deal mentions: Voice is mentioned/demoed in at least X deals per quarter (baseline TBD with Sales)

### Adoption & Usage (Secondary - User Case)

* Trial rate: X% of enabled users try voice at least once (target TBD after Phase 1)
* Retention: X% of voice users use it 3+ times (indicates genuine value, not just curiosity)
* Usage volume: 2% of all requests to the Coach back end use voice
* Error rate: Voice session abandon/error rate < X% (target TBD after Phase 1)

---

## Target Audience

_Who are we building for?_

In priority order:

1. **Sales teams |** We are primarily building for Sales teams - to meet the metrics listed above
2. **Customers |** We are also building for customers to offer a new, more intuitive and immediate, and human way of interacting with AI Coach that increases speed, reduces friction, and feels more like a regular coach

‌

---

## What

_Roughly, what does this look like in the product? Link to designs if available._

![](blob:https://media.staging.atl-paas.net/?type=file&localId=856046f14851&id=417d663b-c138-4648-9974-6a4710fff550&&collection=contentId-5840339196&height=755&occurrenceKey=null&width=1237&__contextId=null&__displayType=null&__external=false&__fileMimeType=null&__fileName=null&__fileSize=null&__mediaTraceId=null&url=null)
[Figma](https://www.figma.com/design/izPCTP7pHBYKw65VpddgXU/%F0%9F%A4%96-AI-Coach--NEW--?node-id=13760-11732&p=f&t=en3XwwiaOLQ2A5Zz-0)

‌

---

## How

We're proposing a three-phase approach to introducing Voice to General Coach, moving from internal testing (Customer Zero) through Limited Beta to full Beta release. The Perform use case (V2) is not scheduled for Q2 pending discovery.

### Phase 1: Build V1 + Customer Zero Launch

_Duration_: Feb 16 - Mar 30

_Goal_: Build core voice functionality for General Coach and release to Customer Zero

_Milestones_:

* **Feb 16 - Mar 16:** Build core voice functionality (STT + TTS) with P0 features
* **Feb 16 - Mar 16:** Instrumentation setup for usage tracking
* **Feb 16 - Mar 16:** Complete legal requirements (DPIA, consent flow, privacy policy updates, sub-processor list)
* **Mar 16:** Release to Customer Zero (Culture Amp employees)
* **Mar 16 - Mar 30:** Internal testing, bug identification, and fixes based on CZ feedback
* **Mar 16 - Mar 30:** UX refinements and instrumentation validation
* **Mar 30:** Enable for Sales Demo Environment (SDE) - once legal certainty around contracts achieved
* **Mar 30:** Sales Enablement sessions begin

_Exit Criteria_:

* Core functionality complete and validated through CZ testing
* Bug fixes implemented based on CZ feedback
* Instrumentation validated
* Legal requirements completed
* SDE enabled for sales teams
* Ready for Limited Beta release

_Rationale_:

* Low-risk validation with internal users first
* Technical stability confirmed before customer release
* Sales teams can demo and pitch Voice before wider customer release
* Focused build phase without external release pressure
‌


### Phase 2: V1 (General Coach) Limited Beta (roll out to [x]% customers)

_Duration_: Early-Mid April

_Goal_: Release Voice to C1+ customers for initial validation and feedback

_Milestones_:

* **Early-Mid April:** Release to Limited Beta - C1+ customers (percentage-based rollout) + any customer who requests
* **Early-Mid April onwards:** Product analytics monitoring begins
* **Early-Mid April onwards:** Weekly usage/adoption metrics review
* **Early-Mid April onwards:** Sales feedback collection

_Exit Criteria_:

* Limited Beta rollout complete to target C1+ customer segment
* Initial adoption and usage data collected
* No blocking issues preventing wider Beta release
* Sales teams enabled

_Rationale_:

* Phased rollout reduces risk before full launch
* More quantitative feedback from broader user base than small tester pool
* ‘Universal feature’ appropriate for new input modality; no admin opt-in friction
* Beta labeling signals it's not guaranteed as universal feature long-term (preserves pricing/packaging flexibility)


### Phase 3: V1 (General Coach) Beta (roll out to all customers)

_Duration_: Late April - Ongoing

_Goal_: Release Voice to all customers (100% rollout)

_Milestones_:

* **Late April - Early May:** Release to Beta - All customers (100% rollout, labeled as "Beta")
* **Late April - Early May:** Light-touch marketing activities
* **Late April - Early May:** Update customer materials
* **Late April - Early May onwards:** Continued bug fixes and improvements
* **Late April - Early May onwards:** Ongoing metrics review and sales tracking

_Exit Criteria_:

* Voice available to 100% of customers
* Marketing materials published
* Ongoing monitoring and improvement processes established

_Rationale_:

* Faster sales enablement and competitive positioning
* Universal feature available to all customers
* Can gather adoption data to inform future investment decisions

_Decision Criteria for V2 (Perform) Scope:_

* If adoption is strong (>2% of Coach interactions use voice, strong retention): Proceed with full V2 (Perform) rollout
* If adoption is weak but sales love it: Complete V2 build but monitor closely, may deprioritize future voice investment
* If both are weak: Pause V2, conduct deeper discovery

---

## Sales Enablement, GTM, Beta Customers

Given that the primary business case for Voice is competitive positioning and sales enablement, we need early coordination with Sales leadership.

See full GTM document for details on:
- Sales enablement strategy and materials
- Beta customer outreach list
- Battle cards and competitive positioning
- Deal tracking and success metrics

**GTM Document:** [Voice Coach - Go-to-Market Document](https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/5951226056/Voice+Coach+-+Go-to-Market+Document)

---

## Testing


**High-level approach:**

Rich qualitative feedback from Customer Zero testing combined with quantitative data from gradual GA rollout to validate both business case (sales impact) and user case (adoption).

**Customer Zero Testers:**
Simran Jasdhoal - booked
Anna Pelesikoti - booked
Jacqui Pooley - booked
Aditi Pimprikar - booked
Katie Graves - booked


Mirna Nasr
Caitlin Radcliffe
Hayley Williams
Chris Senior
India Egan

**Proposed metrics:**

_Qualitative (Customer Zero):_

* Bug identification and severity
* UX feedback and usability issues
* Feature discovery and comprehension
* Use case identification

_Quantitative (GA rollout):_

* **% voice queries:** Voice requests as % of total Coach interactions (target: >2%)
* **Session length:** Average duration of voice sessions vs. text sessions
* **Session quality:** Completion rate, error rate, user satisfaction
* **Retention:** % of users who complete 3+ voice sessions (indicates repeat value vs. curiosity)
* **Voice vs. text ratio:** Distribution of interaction types at the user level
* **Sales metrics:** # of deals with voice demo, close rate impact, qualitative feedback from AEs