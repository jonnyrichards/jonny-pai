---
title: Voice Beta Labeling
confluence_page_id: 6003884033
confluence_url: "https://cultureamp.atlassian.net/wiki/spaces/COACHCAMP/pages/6003884033/Voice+Beta+Labeling"
last_synced: "2026-03-16T00:00:00.000Z"
---

## Background

Product, Legal, and Pricing team have been discussing how to message and protect Voice as a feature that may move to a paid tier in the future. We need to decide how we will message the proposed voice feature to customers so that we retain flexibility about voice pricing in the future.

---

## Stakeholder Positions

| Stakeholder | Position | Would like |
| --- | --- | --- |
| **Legal** | "Beta" label ≠ legal protection | A contractual beta clause that reserves rights to change/price features (?) |
| **Pricing** | Voice may be a paid feature in future | A flexible message that signals "premium value, currently in trial" |
| **Product** | Beta testing is a valuable and necessary part of product development | A low-friction path to launch, the ability to beta test without reprisal |

### Option A: Beta Clause in All Contracts (New, Renewals, and Existing)

Draft a beta clause and proactively insert it into all contracts — including existing customers via a contract amendment process. In product, Voice is labeled "Beta."

**Pros:**

* Maximum legal protection across the entire customer base from day one
* Creates a reusable framework for all future beta features

**Cons:**

* Significant Sales and Legal lift — amending existing contracts at scale is slow and resource-intensive
* Customers routinely redline beta clauses, creating a two-tier customer base: those with beta flexibility and those without
* Managing this operationally requires a workflow connecting deal terms → beta entitlements → feature flags. That's buildable, but non-trivial ongoing overhead
* Likely to delay launch and create friction before Voice is even in customers' hands

---

### Option B: Beta Clause in New Contracts and Renewals Only

#### ✅ Recommended

Draft a beta clause for all new deals and renewals. Accept the near-term contractual exposure for existing customers until their renewal cycle closes the gap. In product, Voice is labeled "Beta."

**Pros:**

* Manageable Legal and Sales lift — no proactive amendment process required
* Builds toward full coverage over time without blocking the launch
* Develops a beta 'muscle' which we can use to launch new features
* The actual risk of an existing customer exiting a contract over a single beta feature change is low and manageable

**Cons:**

* Existing customers remain exposed in the short term — the window closes only as contracts renew
* Still requires the same deal terms → feature flag workflow, just at lower volume initially. Note: we could consider making 'Beta features' an admin setting (opt out) and put the burden of control on the admin.

---

### Option C: Time-Limited Free Trial Framing

In product, Voice is messaged as a "Time-Limited Free Trial" (free for the duration of the current subscription term). No changes are made to contracts — this is a product messaging-only approach with no contractual backing.

**Pros:**

* Honest and transparent — sets commercial expectations clearly

**Cons:**

* May suppress adoption — customers who know they'll be charged at renewal may not engage
* Creates a hard deadline pressure that isn't necessarily desirable product-side
* In-product messaging alone doesn't constitute a binding agreement. If we later paywall Voice, customers could still argue material decrease in functionality and use it as grounds to exit — the same contractual exposure as the Beta label approach, just with different wording
* The framing may confuse customers. "Free trial" carries a well-understood meaning in the industry: a time-boxed period (typically 30–90 days) to access paid features before committing. "Free until your renewal" doesn't map to any familiar customer mental model and risks creating more questions than it answers

---

## Recommendation: Option B

* Introduce a beta clause into all new contracts and renewals going forward
* Launch with Beta labeling (accepting near-term risk for existing customers — genuinely low)

This builds toward full contractual coverage over time without blocking the launch or creating an unwieldy amendment process.

---

## Workstreams

The following workstreams need to proceed in parallel to make Option B operational.

---

### 1. Legal

* **Data:** Nicky Botha (Deal Desk) confirmed that amendments to General Terms are not tracked in a structured way — no report available, only manual contract review. We've asked whether deals where GT was *accepted* (rather than amended) might be easier to pull — no answer yet.
* Beta clause has been drafted by Angela's team; currently in internal legal review
* Once finalised, the clause will be added to the General Terms (GT)
* Existing customer segments:

    * **Subset A (online-terms customers):** Will automatically roll onto the new GT version - no action required
    * **Subset B (static enterprise terms):** No immediate action. CA exposed if we add beta features that are later removed / charged for.
    * **Subset C (own paper):** Out of scope for now; future negotiation required

* New customer segments:

    * **Subset A (online-terms customers):** Will automatically be subject to the new GT version — no action required
    * **Subset B (static enterprise terms):** Beta clause will be proposed in new/renewal deals; Legal will accept redlines if customer objects to reduce deal friction
    * **Subset C (own paper):** Out of scope for now; future negotiation required

* **Near-term risk:** Existing customers on static or own-paper agreements remain exposed until their renewal cycle incorporates the new clause. Angela and Product agree this risk is low and manageable
* **Key principle:** The beta clause must not become a deal blocker. Legal will not hold firm if a customer redlines it

---

### 2. Product

Below are some options for how we could approach this rollout in Product:

* **Beta feature flag workflow (disable-based):** When a customer redlines the beta clause, Product needs a mechanism to exclude that customer from beta features. Currently no automated workflow for 'disable' exists

    * Simon Dell'Oro (Data Intelligence) owns the relevant infrastructure; Deal Desk → back-end pipeline needs scoping
    * Currently manual / spreadsheet-based — acceptable at low volume, but needs a longer-term solution

* **Beta feature flag workflow (enable-based)**: We flip the approach and enable - rather than disable - Beta features in two main scenarios. Mental model: start with zero and build a beta base rather than start with everyone and remove. There are two main scenarios where we enable the flag:

    * Customers who are subject to the new GT
    * Customer who request to try Beta features

* **Admin option:** Rather than a deal-terms-driven flag, beta features could be surfaced as an admin setting — putting the opt-out burden on the customer admin. This would reduce operational overhead but shifts control away from CA

Proposed copy and visual treatment has been considered. [Designs: Figma](https://www.figma.com/design/7UcRC34Yh0cgLj7aBei4Ma/Coach-Voice?node-id=21-125485&t=CLntqFT8aVqIyQT1-1)

---

### 3. GTM

* No significant changes expected to existing go-to-market motion
* CA already uses beta messaging for some features — this is an evolution of that practice, not a new strategy
* **Talk track to develop:** A general beta explainer for Sales/CS covering what "Beta" means at Culture Amp:

    * Early access to new features before general availability
    * No guarantee the feature stays in the product in its current form
    * Pricing may change at renewal
    * Feedback from beta users shapes the final product

* This talk track should be consistent across all beta features, not just Voice

---
