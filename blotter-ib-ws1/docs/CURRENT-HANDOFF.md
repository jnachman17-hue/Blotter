# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Complete Workstream 3 by finishing the precommitted read rules, numerical interpretation thresholds, low-sample treatment, project-level kill-condition decision, and exact-price decision or deliberate deferral.

Workstreams 1 and 2 are complete. Workstream 3 is in progress.

## 2. Source-of-truth and maintenance rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- GPT project memory and old chat context are convenience layers only.
- `CURRENT-HANDOFF.md` is temporary immediate context and must not be the only record of a confirmed decision.
- The active detailed specification is `docs/workstreams/WS3-SPEC.md`.
- Whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision, update `WS3-SPEC.md` and this handoff before moving to the next substantive decision.
- Reconcile `06-assumptions-and-open-questions.md` when an open item is resolved or narrowed.
- Follow the full maintenance system in `docs/05-working-agreement.md`.

## 3. Recent documentation repair

A prior replacement write accidentally left only edited tails in `WS3-SPEC.md` and this handoff. Both files were repaired to full cumulative form before continuing. The durable WS3 specification again contains the complete funnel, event architecture, metric hierarchy, and ratified read-rule hierarchy.

## 4. Workstream 3 durable confirmed architecture

Read `docs/workstreams/WS3-SPEC.md` for the complete detailed record.

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
- actual or simulated OAuth is excluded from the mandatory round-one funnel;
- Gmail, Sheets, and Calendar remain visible as the product engine;
- price appears only inside the funnel and is not the tested variable;
- payment-method choice is the strongest commercial-demand signal;
- no card-entry form, payment credentials, or money are collected;
- both surfaces use the identical canonical event set and properties;
- both surfaces are compared at every matched funnel stage.

Canonical events:

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

## 5. Ratified metric hierarchy

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

## 6. Ratified read-rule hierarchy

- Absolute commercial demand determines whether either proposition deserves further investment.
- Relative surface preference determines which surface to pursue only after at least one proposition demonstrates credible absolute demand.
- A relative winner among two weak surfaces is not a validated surface.
- If both surfaces show weak commercial demand, report `no validated surface` even if one wins the primary comparative metric.
- If both surfaces show credible commercial demand, use `checkout_started / page_viewed` to select the preferred surface.
- If that primary comparative metric favors one surface but adequately sampled payment-choice behavior favors the other, commercial-demand behavior takes priority.
- If payment-choice volume is too low to interpret reliably, it cannot overturn the primary comparative metric and the result remains provisional or ambiguous.

Governing principle: commercial demand decides whether to continue. Comparative performance decides what to continue with.

## 7. Remaining Workstream 3 scope

1. Define the read rule for disagreement between early-funnel interest and late-funnel commercial intent.
2. Define success, failure, ambiguity, and low-sample treatment.
3. Decide whether a hard project-level kill condition is required before launch.
4. Select the exact monthly price or deliberately defer it to Workstream 4 or 5.
5. Complete and mark `WS3-SPEC.md` final before handing off to Workstream 4.

Do not expand into detailed page design, product-interface design, backend architecture, integration implementation, technical feature specifications, or Lovable implementation.

## 8. Exact next action

Define the read rule for disagreement between early-funnel interest and late-funnel commercial intent. Do not set numerical thresholds yet. Present one decision area only.

After Jon ratifies the ruling, update `docs/workstreams/WS3-SPEC.md` and this handoff before continuing.

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