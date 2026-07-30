# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Complete Workstream 3 by defining the metric hierarchy, read rules, interpretation thresholds, low-sample treatment, and treatment of conflicting comparative and absolute demand signals.

Workstreams 1 and 2 are complete. Workstream 3 is approximately 65 to 70 percent complete.

## 2. Source-of-truth and maintenance rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- GPT project memory and old chat context are convenience layers only.
- `CURRENT-HANDOFF.md` is temporary immediate context and must not be the only record of a confirmed decision.
- The active detailed specification is `docs/workstreams/WS3-SPEC.md`.
- The completed Workstream 2 specification is `docs/workstreams/WS2-SPEC.md`.
- Whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision, update `WS3-SPEC.md` and this handoff before moving to the next substantive decision.
- Reconcile `06-assumptions-and-open-questions.md` when an open item is resolved or narrowed.
- Follow the full maintenance system in `docs/05-working-agreement.md`.

## 3. Documentation repair completed

A durable workstream-specification system now exists.

Created:

- `docs/workstreams/WS2-SPEC.md`
- `docs/workstreams/WS3-SPEC.md`

Updated:

- `docs/00-START-HERE.md`
- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/05-working-agreement.md`
- `docs/06-assumptions-and-open-questions.md`
- `docs/CURRENT-HANDOFF.md`

The WS2 proposition and all confirmed WS3 funnel and analytics decisions are no longer dependent on this handoff file.

## 4. Workstream 2 durable outcome

Read `docs/workstreams/WS2-SPEC.md` for the complete proposition specification.

Key preserved constraints:

- July audience is pre-decay and the page sells prevention.
- The failure is live recruiting activity outpacing manual spreadsheet upkeep.
- The tracker divides into a student-maintained contact layer and Blotter-maintained activity layer.
- The core outcome is operational control through one accurate, current source of truth.
- Benefits are accuracy, time saved, everything in one place, and prevention of slippage.
- The minimum visible offer is auto-capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- The spreadsheet-native proposition must emphasize low switching cost and preservation of the existing tracker.
- Blotter is not contact discovery, LinkedIn scraping, AI outreach, technical preparation, learning content, or a jobs board.

## 5. Workstream 3 durable confirmed architecture

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

Confirmed conversion and analytics principles:

- all primary CTAs enter one funnel;
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

## 6. Remaining Workstream 3 scope

1. Define the primary comparative metric.
2. Define secondary funnel metrics.
3. Define absolute commercial-demand metrics.
4. Define diagnostic metrics that do not determine the decision.
5. Write precommitted read rules.
6. Define success, failure, ambiguity, and low-sample treatment.
7. Define treatment of disagreement between early-funnel and late-funnel results.
8. Define treatment of a relative surface winner when absolute demand is weak for both.
9. Decide whether a hard project-level kill condition is required before launch.
10. Select the exact monthly price or deliberately defer it to Workstream 4 or 5.
11. Complete and mark `WS3-SPEC.md` final before handing off to Workstream 4.

Do not expand into detailed page design, product-interface design, backend architecture, integration implementation, technical feature specifications, or Lovable implementation.

## 7. Exact next action

Define the metric hierarchy.

The next discussion should distinguish:

- primary metric for comparing spreadsheet versus platform;
- secondary metrics that explain funnel movement;
- absolute commercial-demand metrics that determine whether either proposition deserves continued investment;
- diagnostic metrics that should not control decisions;
- how surface preference and absolute demand interact.

Present one decision area at a time. After Jon ratifies a ruling, update `docs/workstreams/WS3-SPEC.md`, this handoff, and any affected open-question or decision-log entry before continuing.

## 8. Required reading for resumption

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS3-SPEC.md`
4. `docs/05-working-agreement.md`
5. `docs/02-strategy-and-test.md`
6. `docs/04-decision-log.md`
7. `docs/06-assumptions-and-open-questions.md`

Read `docs/workstreams/WS2-SPEC.md` when Workstream 2 proposition constraints are relevant. Read `docs/03-page-spec.md` only when a Workstream 3 decision materially intersects later page structure.

## 9. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.
