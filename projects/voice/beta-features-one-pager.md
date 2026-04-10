---
title: Coach | Beta Features | One-pager
status: draft
---

## Description

A proposal to introduce a **Beta Features prerequisite flag and admin toggle** in Coach — a product mechanism that enables us to ship new features quickly under the imminent "Beta features" clause in Culture Amp's General Terms, while giving customers a clean, contractually-respected way to opt out.

---

## The Problem

The "Beta" label is a powerful tool for shipping early-stage features and preserving business flexibility — it moderates user expectations, protects CA's ability to change or price features in future, and signals transparency rather than finality.

But the label alone isn't enough. For a 'beta feature' to hold legal weight, and for Sales to confidently redline it when a customer objects, our contracts need to reference it, and the product needs to reflect it: **customers must have the option to opt out of beta features contractually, and if they do, their users must not be exposed to beta features.** Without a product mechanism to enforce this, we expose ourselves to the same contractual risk the clause was designed to avoid — and we create friction in deals that should close cleanly.
Voice is the immediate test case. Voice has been agreed as a Beta feature by Product, Legal, and Pricing. The beta clause is drafted and in internal review. What's missing is the product infrastructure to make it real.

---

## Why

### Business Benefits

* **Voice needs to ship fast.** Voice is our primary driver here — it's a competitive necessity, and the team is ready to release to Limited Beta in mid-April. We need the legal and product infrastructure to support that timeline.
* **Beta framing preserves pricing flexibility.** Legal, Product, and Pricing are aligned: labelling Voice (and future early-stage features) as "Beta" is the right way to signal that pricing may change at renewal, without creating a hard commercial commitment today.
* **A clean opt-out path unblocks deals.** Customers who redline the beta clause need a real opt-out — not a manual process or a support ticket. A self-serve admin toggle means Sales can say "yes, you can switch it off" with confidence, and Legal doesn't need to police it post-close.
* **Builds a repeatable capability.** Voice is the first beta feature; it won't be the last. This is the foundation for how Coach (and potentially the broader platform) ships early-stage innovation.

### User Benefits

* Beta features give early adopters — particularly of AI capabilities — access to the latest product innovations before general availability.
* The Beta label sets honest expectations: these features are real and useful, but subject to change. That transparency builds trust rather than eroding it.

---

## Success Metrics

### Sales Impact (Primary)

* **Zero instances of deals stalling or falling over because of beta features** — either because a customer objects to the clause, or because there's no credible product mechanism to honour an opt-out.
* Sales and Legal can confidently redline the beta clause when needed, with the product toggle as the implementation mechanism.

### Product Velocity (Secondary)

* Coach can ship new beta features faster, with confidence that the label and toggle are already in place — no one-off legal or ops process required per feature.
* First beta feature (Voice) ships to Limited Beta by mid-April as planned, with the toggle live.

---

## Target Audience

All customers. Beta features are enabled by default for all accounts. Admins can disable them at any time via Coach settings.

---

## What

**Beta Features** is a new setting in Coach's admin layer — a prerequisite flag that controls access to all features designated as "Beta."

* **Enabled by default** for all customers
* **Admin-controlled** — any account admin can switch it off at any time via Coach settings
* **Self-serve opt-out** — no support ticket, no manual process, no Sales or Legal involvement required

The toggle is a meta-control: it's not a flag for a single feature, but a **prerequisite flag** that governs access to a class of features. Any feature deemed suitable for the Beta label sits behind it. Voice is the first. Others will follow.

### What makes a feature a "Beta" feature?

A Beta feature is one that:

* Is early-stage — released prior to General Availability
* Carries no guarantee it stays in the product in its current form
* May be subject to pricing changes at renewal
* Is shaped by feedback from users during the beta period

Many of these features will be AI-powered, though the Beta designation is not exclusive to AI.

### Scope

In principle, any product team at Culture Amp could release a feature under the Beta label. For now, the toggle lives in Coach. If there's appetite to expand to a platform-level solution, that's a future conversation — not a dependency here.

### Designs

Designs for the Beta label in the Voice product already exist ([Figma](https://www.figma.com/design/7UcRC34Yh0cgLj7aBei4Ma/Coach-Voice?node-id=21-125485&t=CLntqFT8aVqIyQT1-1)). Designs for the admin toggle in Coach settings are not yet available and will need to be scoped.

---

## How

_Approach TBC in Q3 planning. Key constraints and decisions to date:_

**Start at the Coach level, not the platform level.** In theory, a Beta features flag is a platform strategy — a cross-cutting concern that could live in a shared service. In practice, building a platform dependency now creates delay and scope risk. The advice from Data Intelligence (Simon Dell'Oro) is to own the toggle at the Coach level initially, with the option to expand if appetite exists. The goal is to optimise for shipping, not for elegance.

**Legal is aligned.** The beta clause has been drafted by Legal and is in internal review. Legal's primary concern was how contracts where the clause has been redlined are reflected in the product. The proposal — an admin toggle, enabled by default, that any customer can turn off at any time — satisfies that requirement without requiring a deal-by-deal product configuration.

**Data Intelligence is aligned.** The working assumption (per Simon Dell'Oro) is that Beta features will operate under the **5.4 Licence for Service Improvement** terms. No additional data handling requirements are expected beyond what applies to the broader platform. This needs to be confirmed as the first features are nominated.

---

## GTM

The following approach has been agreed across Product, Legal, and GTM for how the Beta label is positioned and protected commercially. This applies to Voice as the first Beta feature and establishes the precedent for subsequent features.

### Recommended Approach: Beta Clause in New Contracts and Renewals

Draft a beta clause for all new deals and renewals. Accept near-term contractual exposure for existing customers until their renewal cycle closes the gap. In product, features are labeled "Beta."

This avoids a proactive amendment process (significant Sales and Legal lift), builds toward full contractual coverage over time, and doesn't block the Voice launch.

### Customer Segmentation

| Segment | GT Type | Beta Clause Coverage |
| --- | --- | --- |
| **Subset A** | Online-terms | Automatic — rolls onto new GT version |
| **Subset B** | Static enterprise terms | New/renewal deals only; redlines accepted |
| **Subset C** | Own paper | Out of scope for now; future negotiation |

### Near-term risk

Existing customers on static or own-paper agreements remain exposed until renewal. Legal and Product agree this risk is low and manageable — the actual likelihood of a customer exiting a contract over a single beta feature change is minimal.

### Beta talk track (Sales and CS)

A consistent message for all Beta features — not just Voice:

* Early access to new features before General Availability
* No guarantee the feature stays in the product in its current form
* Pricing may change at renewal
* Feedback from beta users shapes the final product
* Customers can switch off beta features at any time via Coach admin settings

### Key principle

The beta clause must not become a deal blocker. Legal will not hold firm if a customer redlines it — and the product toggle means that a redlined clause is honoured automatically, with no manual follow-up required.
