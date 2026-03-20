---
title: Voice Coach Kick Off Meeting
date: 2026-03-03
time: 11:30am
status: draft
---

# Voice Coach Kick Off - Mar 3, 2026

**Goal:** Align on T-2 weeks to CZ launch (Mar 16) - blockers, dependencies, and critical path items

---

## 1. Timeline & Milestones Check-in (5 min)

**Key Dates:**
- **Mar 16**: Customer Zero launch (T-2 weeks)
- **Mar 16-20**: CZ testing Group 1
- **Mar 23-27**: CZ testing Group 2
- **Mar 30**: Sales Demo Environment (SDE) enabled

**Questions:**
- Are we on track for Mar 16 CZ launch?
- What's blocking or at risk?

---

## 2. WIP Updates (10 min)

**Round robin:** What are you working on right now? What's top of mind?

- Thai
1. Dictation mode. It was the first mode. We have that mode. We need to get this back next to conversation mode. Shouldn't be too hard. 
2. Eleven Labs. Dan Fraser has a key. Personal key. That is the key being used. That isn't the right key to use - we need to get a company key. 
3. Interrupt mode. Back end is too fast. Standalone coach response is quite short so by time you interrupt, full response is already saved to the back end. Back end will send the whole conversation. We could cut this from the back end if we like
- Baps
- we are in a demo environment, prove we can release it (Aslan), there are things holding us back:
1. Langfuse prompt; we need it to not just reply 'you are in voice mode'
2. Need to make sure it works with web sockets (because of Netskope); currently Jas is working with web socks that should be merged soon. we'll need to adapt the work to make it work with Jas's changes
3. Eleven Labs is not finalised. But this might not be a blocker. 
4. We haven't started dictation mode.But there is a lot of code there that we can reuse; shouldn't be too much of a lift to make this work
- Kristina
1. Newborn!
2. 
- Dan
- [Others]

---

## 3. Current Blockers (10 min)

### Prompt (Thai → Kristina)
**Questions for Thai:**
- How does voice prompt work? Does param passed from front end trigger a different prompt? (i.e., do we now have to update two voice prompts with changes?)
- Where does the "You are now in voice mode" message come from?
- Can we flip the new #3 ("Addition of voice mode snippet") to deployed straight away so Kristina can edit?
- Audio chunking - how does it work?
- **Should we try to use this new voice prompt as a composed prompt?**

**Action:** Clarify handoff to Kristina and timeline

### Web Sockets
**Status:** [Need update from Engineering]
**Action:** Timeline for completion?

### EL Security
**Status:** Lighter requirements for CZ, but still needs completion
**Action:**
- Who owns the new security items? (Ro to clarify)
- What's needed before Mar 16?

---

## 4. Proposed Features / Voice UI Improvements (15 min)

### Voice UI Improvements Epic
**Discussion:**
- Walk through epic tickets
- Prioritize for CZ vs post-CZ
- Any concerns or risks?

### Baps-Specific Topics
- Anything worrying you about the current scope?
- How are you syncing Jira tickets with Rachael's designs?
- Design references - are they clear and accessible?

**Action:** Align on what's P0 for Mar 16 CZ vs what can ship later

---

## 5. CZ Launch Prep (10 min)

### Tester Recruitment
- **Need:** 10 CZ testers (2 groups of 5)
- **Group 1:** Mar 16-20
- **Group 2:** Mar 23-27
- **Action:** Who owns recruitment? Timeline to finalize list?

### Voice Instrumentation (Baps / Ro)
- **Status:** Need to discuss ttfb_ms approach and implementation
- **Action:** Schedule follow-up with Baps/Ro this week

### Data/Privacy Enablement Materials
- **Need:** First draft of one-pager covering:
  - What data we collect
  - How we use it
  - ElevenLabs retention policy (zero retention mode)
  - DPIA completion status
- **Action:** Jonny to draft this week

---

## 6. Sales Enablement Timeline (5 min)

**Key Milestone:** Mar 30 SDE enabled

**Action Items:**
- Confirm timeline with James (Sales Enablement) - status update needed this week
- What materials does Sales need by Mar 30?
- Who owns sales enablement content creation?

---

## 7. Open Issues / Parking Lot (5 min)

- Beta customer list for Limited Beta (Phase 2) - not blocking CZ but should start soon
- Legal: Admin-level vs individual user consent model - clarification needed
- Multilingual support (DB inquiry) - out of scope for V1?

---

## Action Items

| **Action** | **Owner** | **Due Date** |
|------------|-----------|--------------|
| Clarify voice prompt architecture and handoff to Kristina | Thai | Mar 4 |
| Confirm web sockets completion timeline | Engineering | Mar 4 |
| Clarify security items ownership and create Jira ticket | Ro | Mar 4 |
| Prioritize Voice UI Improvements epic tickets | Team | Mar 3 |
| Recruit 10 CZ testers (Groups 1 & 2) | TBD | Mar 6 |
| Schedule voice instrumentation discussion | Jonny | Mar 4 |
| Draft data/privacy enablement one-pager | Jonny | Mar 6 |
| Send James (Sales) timeline status update | Jonny | Mar 6 |

---

## Next Meeting

[Schedule follow-up if needed - likely weekly check-ins until Mar 16]
