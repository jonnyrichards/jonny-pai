---
title: ElevenLabs Zero Retention — Options for Proceeding
confluence_page_id: 6064930967
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6064930967/ElevenLabs+Zero+Retention+Options+for+Proceeding"
last_synced: null
---

# ElevenLabs Zero Retention — Options for Proceeding

## Context

Culture Amp is in the late stages of evaluating ElevenLabs (EL) as the vendor for text-to-speech (TTS) and speech-to-text (STT) capabilities in AI Coach Voice. Several risks have been identified in EL's standard contract. Most are being worked through as part of the normal product development process and are not considered here.

This document focuses on one specific risk: **our inability to guarantee, via a binding contractual commitment, that ElevenLabs will not retain customer data.** EL markets "Zero Retention Mode" (ZRM) as a feature of its Enterprise tier, and their APAC GTM Director has confirmed via email that it is included in our plan. However, ZRM is not written into the Order Form — meaning we have no enforceable protection if EL's policy changes. This matters because Culture Amp routinely represents to customers that third-party vendors do not retain their data.

A note on negotiation: EL's standard agreements are non-negotiable at our current spend level. Redlines and contract modifications are only available at the next enterprise tier, which starts at **$50,000 USD/year**.

---

## Relevant background documents
 
**Eleven Labs Legal Review (Simone)** (full legal risk analysis across financial, liability, biometric, and data retention concerns; three mitigation options): https://docs.google.com/document/d/1y1cZ6Cx4HX-ePww_e6wgve6rJdMh_UJ2XoKs7b7uDic/edit?tab=t.n7jhdi7bayy7#heading=h.or32fye4h4oe

**Risk Assessment and Approval doc (Jodie)**: https://docs.google.com/document/d/1ri63Q6AdNuE4M4SfH4nIsbRqiCgiwPcKR3ILq8nYi-o/edit?tab=t.0

**Security Review (Glen)**: https://cultureamp.atlassian.net/wiki/spaces/SEC/pages/5888344272/ElevenLabs+-+Security+Review)

**SaaS Risk Assessment (Security)**: https://docs.google.com/spreadsheets/d/1IKUfWZjgGP8Zm15Y9GQPFgwjf5TFiiV97r_MeopkTWw/edit?gid=202632154#gid=202632154

**'Which Voice provider should we use?' (Dan)**: https://cultureamp.atlassian.net/wiki/spaces/TV/pages/5849677897/DACI+Which+Voice+TTS+STT+provider+should+we+use+for+Coach+for+early+customers+in+production

**ZRM considerations (Dan):**: https://docs.google.com/document/d/1yEMNar1XjVm7k3s_qjIQ3WyD1wK4Q_xGE8DOo2ASLyM/edit?tab=t.0

---

## Projected usage and cost

Current plan: **Business tier — $1,320/month, 11,000 minutes/month.**

To illustrate expected usage at launch: last week, approximately 3,500 users sent messages in General Coach. If 5% (~200 users) used Voice in a given month, and Coach spoke for an average of 20 minutes per user across that month, total usage would be around **4,000 minutes** — well within the 11,000-minute cap.

The Business tier is likely sufficient for the foreseeable future, particularly given that Voice is a new feature with uncertain adoption. This is relevant context for evaluating the cost of upgrading.

---

## Options

### Option 1 — Accept the risk and mitigate operationally

Proceed with the current EL contract and manage the ZRM gap through a combination of operational controls and product framing.

**The case for it:**
- EL's APAC GTM Director has confirmed ZRM is included for our tier. While not contractually binding, this is an active vendor relationship — removing ZRM would be a significant trust breach.
- ZRM is technically within our control: we call the service with `enable_logging=false`, and ZRM mode is activated (EL tech lead confirmed this: "For TTS APIs, enable_logging=False will not throw errors. It just tells our platform to not log anything at our end even when account level ZRM isn't enabled.")
- Voice is planned as a Beta feature. We could frame our Beta terms so that users are informed of the data handling characteristics specific to this feature — providing a degree of transparency even without a contractual backstop.

**The risks:**
- No contractual protection if EL changes its policy.
- Culture Amp cannot make an unqualified representation to customers that EL does not retain their data.
- Legal has flagged this as a material gap; residual risk remains even with mitigations deployed.

---

### Option 2 — Upgrade to get ZRM in the contract

Move to the next EL enterprise tier (minimum $50,000 USD/year vs. ~$15,800/year currently), which includes the ability to negotiate and redline contract terms — allowing ZRM to be written in as a binding commitment.

**The case for it:**
- Eliminates the contractual gap entirely and restores our ability to make unqualified customer representations.
- Provides legal peace of mind and aligns with our existing stance on third-party data retention (AWS, GCP).
- As Coach usage grows, the higher minute allowance will become less wasteful over time.

**The risks:**
- Cost increases by ~$34,000/year with no data-validated pathway to recovering that spend.
- At projected launch volumes (4,000 mins/month), the higher tier is significantly over-provisioned — we would be paying for certainty, not capacity.
- Sets a precedent for absorbing vendor cost increases to resolve contractual gaps.

---

### Option 3 — Use an alternative supplier

Rather than proceeding with EL, evaluate other vendors where data retention guarantees are either stronger or already contractually established.

**AWS (already evaluated):**
- Pros: existing supplier with established trust, zero retention guaranteed contractually, supplier discount likely available.
- Cons: delivery risk (not proven to work for our use case), poor documentation, benchmarks suggest lower performance than EL.

**Other suppliers (not yet evaluated):**
- OpenAI and Google both offer STT/TTS capabilities and may offer more favourable data terms given existing relationships.
- Smaller, voice-specific providers (e.g. Vapi, Deepgram) may offer more flexibility but introduce new procurement and security processes.
- Self-hosted TTS/STT would remove the sub-processor problem entirely but is not consistent with Culture Amp's infrastructure approach and would require a return to proof-of-concept stage.

**The case for it:** Removes the EL-specific risk entirely; may unlock better contractual terms through existing supplier relationships.

**The risks:** Every alternative introduces significant unknowns around viability, integration effort, and timeline. This path would set back Voice development materially — with no guarantee that a viable alternative is available on the other side of the investigation.

---

### Option 4 — Postpone the feature

Delay Voice until there is stronger evidence of customer demand and/or until Coach usage is high enough that starting with a higher EL tier is cost-justified from day one.

**The case for it:**
- Customer signal on Voice is currently low; no evidence that deals are being won or lost on this capability.
- Waiting avoids the current overspend problem with Option 2: if we revisit when Coach usage is materially higher, the Enterprise tier's minute allowance would be far less wasteful.
- Removes time pressure, allowing legal and procurement questions to be resolved properly rather than managed around.

**The risks:**
- Delays a feature that is already in development, with sunk cost implications.
- Competitor parity is a driver; delay extends the period in which Voice is a gap in our offering.
- There is no defined trigger for revisiting — "wait for more signal" can become indefinite deferral.

---

## Recommendation

**Option 1, with a defined review trigger.**

The contractual gap is real, but the operational reality is lower-risk than the legal framing suggests: ZRM is technically enforced at the API call level, EL has confirmed it is included, and Voice is launching as a Beta feature — which provides a degree of appropriate framing for users regarding data handling.

Option 2's cost is hard to justify without usage data. Option 3 introduces delivery risk with no guaranteed outcome. Option 4 is reasonable but risks deferral becoming permanent.

The right approach is to proceed, deploy the operational mitigations recommended by Legal, and set a specific trigger for revisiting the upgrade question — for example, when monthly Voice usage consistently exceeds 50% of the Business tier cap, or when a customer raises a formal contractual objection. At that point, the cost of upgrading is either commercially justified by usage, or commercially justified by a deal requirement.