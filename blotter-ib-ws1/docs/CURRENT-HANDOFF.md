# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Complete Workstream 3 by deciding whether a hard project-level kill condition is required, resolving exact monthly price treatment, and preparing the durable handoff to Workstream 4.

Workstreams 1 and 2 are complete. Workstream 3 is in progress.

## 2. Source-of-truth and maintenance rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- `docs/workstreams/WS3-SPEC.md` is the permanent cumulative Workstream 3 record.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision, update `WS3-SPEC.md` and this handoff before moving to the next substantive decision.
- Reconcile open-question and decision-log files when a ruling changes them.
- Follow `docs/05-working-agreement.md`.

## 3. Confirmed Workstream 3 architecture

The complete durable record is in `docs/workstreams/WS3-SPEC.md`.

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
- one 15-to-20-second maximum product experience occurs before email capture;
- click-to-progress is the working model and animation is not required;
- actual or simulated OAuth is excluded from the mandatory round-one funnel;
- Gmail, Sheets, and Calendar must still be shown as the product engine;
- price appears only inside the funnel and is not the tested variable;
- payment-method choice is the strongest commercial-demand signal;
- no card-entry form, credentials, or money are collected;
- the approximately 300-person beta-cohort commitment is real;
- both surfaces use the identical event set and properties;
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

## 4. Ratified metric hierarchy

### Primary comparative metric

`checkout_started` divided by `page_viewed`, using unique eligible visitors and calculated separately by surface.

### Secondary comparative metrics

- `funnel_started` divided by `page_viewed`;
- `email_submitted` divided by `page_viewed`;
- `checkout_started` divided by `price_viewed`.

### Commercial-demand metrics

- Primary: `payment_option_clicked` divided by `page_viewed`.
- Supporting: `payment_option_clicked` divided by `checkout_started`.

### Diagnostic metrics

- `recruiting_profile_completed` divided by `funnel_started`;
- `product_experience_completed` divided by `recruiting_profile_completed`;
- `email_submitted` divided by `product_experience_completed`;
- `price_viewed` divided by `email_submitted`;
- `checkout_started` divided by `price_viewed`;
- `beta_spot_confirmed` divided by `payment_option_clicked`.

Diagnostics explain abandonment and instrumentation issues. They do not independently determine the winning surface or continued investment.

## 5. Ratified read rules

### Comparative preference versus absolute demand

- Absolute commercial demand determines whether either proposition deserves continued investment.
- Relative surface preference determines which surface to pursue only after at least one proposition demonstrates credible absolute demand.
- A relative winner among two weak surfaces is not a validated surface.
- If both surfaces show weak commercial demand, report `no validated surface` even if one wins the comparative metric.
- If both show credible commercial demand, use `checkout_started / page_viewed` to select the preferred surface.
- If adequately sampled payment-choice behavior conflicts with the comparative metric, the commercial-demand result takes priority.
- If payment-choice volume is too low, it cannot overturn the comparative result; classify the result as provisional or ambiguous under low-sample rules.

Governing principle: commercial demand decides whether to continue. Comparative performance decides what to continue with.

### Early-funnel versus late-funnel disagreement

- Late-funnel behavior outranks early-funnel behavior.
- Strong early interest with weak late intent means attention was generated but demand was not validated.
- Weak early interest with adequately sampled strong late intent may indicate a valuable but poorly communicated or narrowly targeted offer.
- Early-funnel performance cannot rescue weak commercial demand.
- Strong late-funnel evidence can justify another positioning or acquisition test despite weak early conversion.
- Diagnostics explain disagreement but do not override the hierarchy.

Governing principle: early metrics show whether people explore. Late metrics show whether interest survives exposure to the product and price.

## 6. Ratified interpretation thresholds

### Primary comparative threshold

A surface is declared the winner on `checkout_started / page_viewed` only when all three requirements are met:

1. At least 25 percent higher on a relative basis than the other surface.
2. At least 2 percentage points higher on an absolute basis.
3. At least 90 percent statistical confidence in the estimated difference.

Directionally better results that miss one or more requirements are ambiguous. Weak commercial demand for both means no validated surface regardless of relative difference.

### Absolute commercial-demand thresholds

For `payment_option_clicked / page_viewed`:

- 2.0 percent or higher: strong commercial signal.
- 1.0 percent to below 2.0 percent: credible commercial signal.
- 0.5 percent to below 1.0 percent: ambiguous commercial signal.
- Below 0.5 percent: weak commercial signal.

These are Blotter-specific decision rules rather than claimed universal SaaS standards. Their full benchmark derivation and conservative-adjustment rationale are recorded in `docs/workstreams/WS3-SPEC.md`.

## 7. Ratified low-sample treatment

### Comparative result

A comparative winner cannot be declared until:

- each surface has at least 300 eligible visitors;
- the 25 percent relative difference requirement is met;
- the 2-percentage-point absolute difference requirement is met;
- the result reaches at least 90 percent statistical confidence.

Below 300 visitors per surface, the comparative result is directional only.

### Positive commercial-demand result

A surface cannot receive a final credible or strong classification until:

- it has at least 500 eligible visitors; and
- at least 10 unique visitors trigger `payment_option_clicked`.

Until both are met, an observed credible or strong rate is labeled `promising but insufficiently sampled`.

### Weak-demand result

A final weak classification requires:

- at least 600 eligible visitors on the surface; and
- statistical support that the true rate is unlikely to reach the 1 percent credible-demand threshold.

A zero-click result from an early sample is insufficient evidence, not failure.

### Underpowered outcomes

When the relevant evidence requirement is not met, classify the result as `insufficient sample, no decision`.

Do not force an underpowered test into success, failure, or a surface-selection decision.

## 8. Remaining Workstream 3 scope

1. Decide whether a hard project-level kill condition is required before launch.
2. Select the exact monthly price or deliberately defer it to Workstream 4 or 5.
3. Complete and mark `WS3-SPEC.md` final before handing off to Workstream 4.

Do not expand into detailed page design, product-interface design, backend architecture, integration implementation, technical feature specifications, or Lovable implementation.

## 9. Exact next action

Decide whether a hard project-level kill condition is required before launch or should remain deferred.

Do not yet select the exact monthly price or begin Workstream 4. Present one decision area only.

After Jon ratifies the ruling, update `docs/workstreams/WS3-SPEC.md` and this handoff before continuing.

## 10. Required reading for resumption

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS3-SPEC.md`
4. `docs/05-working-agreement.md`
5. `docs/02-strategy-and-test.md`
6. `docs/04-decision-log.md`
7. `docs/06-assumptions-and-open-questions.md`

Read `docs/workstreams/WS2-SPEC.md` when Workstream 2 proposition constraints are relevant. Read `docs/03-page-spec.md` only when a Workstream 3 decision materially intersects later page structure.

## 11. Files changed in the latest decision pass

- `docs/workstreams/WS3-SPEC.md`
- `docs/CURRENT-HANDOFF.md`

## 12. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.