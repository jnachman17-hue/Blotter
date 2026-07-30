# Blotter IB — Current Handoff

Date: 2026-07-30

## 1. Current objective

Complete Workstream 3 by defining the conversion and measurement system for the matched spreadsheet-versus-platform landing-page test before either page is built.

Workstreams 1 and 2 are complete. Workstream 3 is in progress.

## 2. Source-of-truth and operating rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical documents are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Only confirmed items in `04-decision-log.md` are binding project truth.
- `03-page-spec.md` is a working baseline, not a final specification.
- Do not begin Lovable implementation during Workstream 3.
- Both product-surface pages must use identical measurement and launch at roughly the same time.

## 3. Prior completed proposition

Workstream 2 established the spreadsheet-native proposition at landing-page-test resolution:

- The July audience is entering active networking before tracker decay is fully felt.
- The page sells prevention of predictable tracker decay now and may sell rescue later in peak season.
- The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- The student enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain changing recruiting state.
- The core outcome is operational control through one accurate, current source of truth.
- The minimum offer includes automatic activity capture, visually legible contact state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- Blotter is a recruiting-logistics orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or a jobs board.

## 4. Workstream 3 confirmed ruling: conversion architecture

Jon ratified the following conversion and demand-measurement architecture.

### Matched multi-stage demand funnel

Round one will use an identical multi-stage demand funnel across the spreadsheet and platform pages.

Both pages may contain multiple CTA placements, but every primary CTA enters the same canonical funnel. CTA placement is recorded so the test can identify where interest originated without creating separate low-friction and high-friction conversion paths.

The funnel may include:

- product onboarding or interaction;
- only the highest-value segmentation questions;
- email or account capture;
- simulated product or integration progression;
- exposure to one product at one monthly price;
- a final payment-choice action;
- a terminal Fall 2026 availability and early-access message.

### Signal hierarchy

- CTA clicks and onboarding behavior measure attention, curiosity, and product exploration.
- Email submission and simulated integration progression measure identified adoption intent.
- Price exposure qualifies the visitor economically but is not itself the strongest signal.
- The strongest commercial-demand signal is clicking a real payment-choice button after seeing the proposed monthly price, such as `Pay with card` or `Apple Pay`.
- Reaching the pricing screen alone is not willingness-to-pay evidence.

### Payment and terminal state

- Round one shows one product at one monthly price.
- There is no plan-selection step and no price A/B test.
- No payment is collected.
- After the visitor clicks a payment-choice button, the next screen explains that Blotter is planned for Fall 2026, confirms that no charge occurred, and tells the visitor that they have secured or requested a place in the early beta or priority-access window and will be emailed when it opens.
- Exact terminal copy remains later copy work.

### Segmentation constraint

Segmentation should be minimal and limited to the highest-value questions. Current approved direction:

1. Which high-finance recruiting track the visitor is pursuing, such as investment banking, consulting, private equity, or sales and trading.
2. Which internship or summer-analyst class the visitor is targeting.

School is removed. Current year is removed because it can be inferred sufficiently from the target internship class for this test.

### Interpretation constraint

The spreadsheet and platform pages must be compared at every matched funnel stage, not only at the final payment-choice event. This allows diagnosis of where each surface gains or loses visitors while preserving the final payment-choice click as the strongest commercial signal.

Additional page and demo interactions may be measured diagnostically, but they do not create alternative conversion paths.

## 5. Important unresolved points

- Exact canonical funnel stages and order.
- Exact placement of the two segmentation questions.
- Whether email capture occurs before or after the primary product interaction.
- What the simulated Gmail or account-setup interaction should require.
- Where the monthly price first appears.
- Exact payment-choice presentation and terminal disclosure.
- Exact monthly price.
- Analytics event names and definitions.
- Read rules and interpretation thresholds.
- Final CTA wording and visual placement, which partly belong to Workstream 4.

## 6. Exact next action

Resolve the exact canonical funnel stages and order.

The next discussion should determine the shortest credible path that:

1. lets the visitor experience enough of the spreadsheet or platform proposition to make an informed decision;
2. captures recruiting track and target internship class without feeling like a survey;
3. identifies the visitor through email or account capture;
4. creates a credible simulated setup or Gmail-integration progression;
5. exposes one monthly price;
6. culminates in `Pay with card` and `Apple Pay` or equivalent payment-choice buttons;
7. terminates with a clear Fall 2026 early-access disclosure without collecting payment.

The core design tension is information value versus funnel fatigue. Do not add a stage merely because it produces another data point. Every stage must either improve the validity of the purchase-intent signal, enable essential segmentation, or make the simulated product experience credible.

Do not move yet to analytics event naming, final CTA copy, read rules, page narrative, or Lovable implementation.

## 7. Required reading for resumption

Read first:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read the Workstream 3 canonical files:

- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Read `docs/01-project-and-product.md` for product context if needed. Read `docs/03-page-spec.md` only when a conversion decision materially intersects later page structure.

## 8. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- A GoDaddy domain exists, but testing-domain identity remains unresolved.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.