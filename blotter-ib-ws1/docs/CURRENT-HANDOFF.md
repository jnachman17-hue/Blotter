# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Complete Workstream 3 by writing the precommitted read rules, interpretation thresholds, low-sample treatment, and treatment of conflicting comparative and absolute demand signals.

Workstreams 1 and 2 are complete. Workstream 3 is in progress. The metric hierarchy is now fully ratified.

## 2. Source-of-truth and maintenance rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- GPT project memory and old chat context are convenience layers only.
- `CURRENT-HANDOFF.md` is temporary immediate context and must not be the only record of a confirmed decision.
- The active detailed specification is `docs/workstreams/WS3-SPEC.md`.
- Whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision, update `WS3-SPEC.md` and this handoff before moving to the next substantive decision.
- Reconcile `06-assumptions-and-open-questions.md` when an open item is resolved or narrowed.
- Follow the full maintenance system in `docs/05-working-agreement.md`.

## 3. Durable documentation state

The active Workstream 3 specification now preserves:

- the complete matched funnel;
- recruiting segmentation;
- product-experience boundary;
- email-capture treatment;
- price and checkout mechanics;
- terminal cohort state;
- canonical analytics events and properties;
- the complete ratified metric hierarchy.

Do not rely on this handoff alone. Read `docs/workstreams/WS3-SPEC.md` for the cumulative durable record.

## 4. Confirmed Workstream 3 conversion architecture

Confirmed funnel:

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. One monthly price inside the funnel.
6. `Continue to payment` or equivalent.
7. Separate checkout screen with payment-choice buttons.
8. Fall 2026 limited first-cohort confirmation.

Confirmed principles:

- all primary CTAs enter one canonical funnel;
- CTA origin is stored through `cta_location`;
- one product experience occurs before email capture;
- experience is approximately 15 to 20 seconds maximum;
- click-to-progress is the working model and animation is not required;
- actual or simulated OAuth is excluded from the mandatory round-one funnel;
- Gmail, Sheets, and Calendar must still be shown as the product engine;
- price appears only inside the funnel and is not the tested variable;
- payment-method choice is the strongest commercial-demand signal;
- no card-entry form, payment credentials, or money are collected;
- the approximately 300-person cohort commitment is real and will be maintained;
- both surfaces use the identical canonical event set and properties;
- both surfaces are compared at every matched funnel stage.

## 5. Canonical analytics events

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

## 6. Ratified metric hierarchy

All rates use unique eligible visitors, not raw event counts. A visitor counts no more than once per surface for each metric.

### Primary comparative metric

- `checkout_started` divided by `page_viewed`.
- Plain-language meaning: of all eligible landing-page visitors, what percentage proceeded to checkout after experiencing the surface, submitting an email, and seeing the price?
- This is the primary metric for comparing spreadsheet versus platform.

### Secondary comparative metrics

- `funnel_started` divided by `page_viewed`.
- `email_submitted` divided by `page_viewed`.
- `checkout_started` divided by `price_viewed`.

These explain the primary comparative result but do not replace it.

### Commercial-demand metrics

- Primary: `payment_option_clicked` divided by `page_viewed`.
- Supporting: `payment_option_clicked` divided by `checkout_started`.

The first measures absolute commercial demand across all visitors. The second measures checkout conversion among visitors who already chose to proceed.

### Diagnostic metrics

- `recruiting_profile_completed` divided by `funnel_started`.
- `product_experience_completed` divided by `recruiting_profile_completed`.
- `email_submitted` divided by `product_experience_completed`.
- `price_viewed` divided by `email_submitted`.
- `checkout_started` divided by `price_viewed`.
- `beta_spot_confirmed` divided by `payment_option_clicked`.

Diagnostics explain abandonment or instrumentation problems. They must not independently determine the winning surface or whether the project deserves continued investment.

`beta_spot_confirmed` remains an instrumentation and completion check, not a commercial-demand metric.

## 7. Remaining Workstream 3 scope

1. Write precommitted read rules.
2. Define success, failure, ambiguity, and low-sample treatment.
3. Define treatment of disagreement between early-funnel and late-funnel results.
4. Define treatment of a relative surface winner when absolute demand is weak for both.
5. Decide whether a hard project-level kill condition is required before launch.
6. Select the exact monthly price or deliberately defer it to Workstream 4 or 5.
7. Complete and mark `WS3-SPEC.md` final before handing off to Workstream 4.

Do not expand into detailed page design, product-interface design, backend architecture, integration implementation, technical feature specifications, or Lovable implementation.

## 8. Exact next action

Write the precommitted read rules one decision area at a time.

The next discussion must define the decision hierarchy when relative surface preference and absolute commercial demand disagree. Do not set numerical thresholds yet.

## 9. Required reading for resumption

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS3-SPEC.md`
4. `docs/05-working-agreement.md`
5. `docs/02-strategy-and-test.md`
6. `docs/04-decision-log.md`
7. `docs/06-assumptions-and-open-questions.md`

Read `docs/workstreams/WS2-SPEC.md` when Workstream 2 proposition constraints are relevant. Read `docs/03-page-spec.md` only when a Workstream 3 decision materially intersects later page structure.

## 10. Files changed in the latest decision pass

- `docs/workstreams/WS3-SPEC.md`
- `docs/CURRENT-HANDOFF.md`

## 11. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.