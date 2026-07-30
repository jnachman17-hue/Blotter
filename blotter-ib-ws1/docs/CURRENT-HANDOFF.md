# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Begin Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The exact next action is to define the high-level page narrative and section sequence before writing isolated copy, selecting detailed visuals, or beginning Lovable implementation.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `docs/workstreams/WS2-SPEC.md` and `docs/workstreams/WS3-SPEC.md` are completed durable inputs.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Confirmed decisions should be consolidated into the active workstream specification in related batches rather than interrupting every micro-decision with a separate GitHub pass.
- Update this handoff after a meaningful decision batch, before ending a substantial session, or when immediate resumption context materially changes.
- Follow `docs/05-working-agreement.md`, while preserving speed and avoiding unnecessary documentation churn.

## 3. Workstream 3 completion

Workstream 3 is complete and permanently recorded in:

`docs/workstreams/WS3-SPEC.md`

The completed specification includes:

- canonical CTA and lead-capture funnel;
- recruiting segmentation questions;
- product-experience constraints;
- transparent email capture without simulated OAuth;
- $9.99 monthly price treatment;
- checkout and cohort-confirmation mechanics;
- identical analytics events and properties;
- primary, secondary, commercial-demand, and diagnostic metrics;
- comparative and absolute-demand read rules;
- practical and statistical thresholds;
- external SaaS benchmark derivation and conservative adjustment rationale;
- low-sample treatment;
- no permanent or bounded project kill condition;
- frozen measurement-period rules;
- test-reporting requirements;
- downstream constraints for Workstream 4.

Do not reopen these decisions unless they genuinely break the Workstream 4 design or Jon explicitly supersedes them.

## 4. Core Workstream 3 constraints inherited by Workstream 4

### Funnel

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. One $9.99 monthly price inside the funnel.
6. `Continue to payment` or equivalent.
7. Separate checkout screen with payment-choice buttons.
8. Fall 2026 limited first-cohort confirmation.

### Product experience

- one experience before email capture;
- approximately 15 to 20 seconds maximum;
- click-to-progress working model;
- animation not required;
- Gmail, Sheets, and Calendar shown as the product engine;
- spreadsheet and platform versions ultimately remain comparable in duration and interaction burden.

### Email and trust

- no actual or simulated OAuth in the mandatory round-one funnel;
- no password request or imitation of Google authentication;
- email capture must be transparent;
- the page must explain relevant Gmail and Calendar activity without implying unrestricted inbox access.

### Price and checkout

- $9.99 per month;
- monthly billing;
- cancel anytime;
- no annual plan or introductory discount;
- price appears only inside the funnel after email capture;
- no plan-selection step or price test;
- checkout includes `Pay with card` and device-supported options where available;
- no card-entry form, payment credentials, or money collection;
- payment-choice click is the strongest commercial-demand action.

### Terminal state

- confirms a real place in an approximately 300-person Fall 2026 beta cohort;
- Jon will maintain and honor the list;
- exact public copy belongs to Workstream 4.

### Analytics preservation

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

All primary CTAs enter one funnel. CTA origin is stored through `cta_location`. There is no separate `cta_clicked` event.

## 5. Core Workstream 2 proposition inherited by Workstream 4

- July audience is pre-decay and the page sells prevention.
- The failure is live recruiting activity outpacing manual spreadsheet upkeep.
- The tracker becomes stale and loses operational trust.
- The student maintains contacts and static information.
- Blotter maintains changing activity from relevant Gmail and Calendar signals.
- The core outcome is one accurate, current source of truth.
- Benefits are accuracy, time saved, everything in one place, and prevention of slippage.
- The visible offer includes automatic activity capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- The spreadsheet proposition must emphasize preservation of the existing tracker and minimal switching cost.
- Blotter is not contact discovery, LinkedIn scraping, mass outreach, AI writing, technical preparation, learning content, or a jobs board.

Read `docs/workstreams/WS2-SPEC.md` for the full durable proposition.

## 6. Workstream 4 objective and scope

Produce a coherent, build-ready content and experience specification for the spreadsheet-native landing page before Lovable implementation.

Workstream 4 owns:

- page narrative and section sequence;
- headline, subhead, CTA, and supporting copy;
- recruiting-volume statistics and proof devices;
- before-versus-after hero composition;
- spreadsheet product demonstration;
- exact funnel product-experience frames and clicks;
- relationship between the hero and funnel experience;
- action-focused-view representation;
- Gmail, Sheets, and Calendar mechanism visualization;
- privacy, trust, permissions, and FAQ content;
- CTA wording and placement;
- $9.99 price, checkout, and terminal-state copy;
- responsive content priorities and Workstream 5 implementation constraints.

Workstream 4 does not begin Lovable implementation, design the platform page, define backend logic, or design real OAuth architecture.

## 7. Working baselines, not final decisions

- `docs/03-page-spec.md` is a working baseline only.
- Existing before-versus-after hero direction may be useful but is not final.
- Hero comprehension should target approximately two seconds.
- Visual proof should carry more weight than abstract feature claims.
- Owner-supplied recruiting-cycle figures may be used as illustrative prototype copy if not falsely attributed to external research.
- Color-coded relationship state is promising, but exact statuses and colors are open.
- Banks, applications, feature-card structure, table details, and action-focused treatment remain open Workstream 4 decisions.

## 8. Exact next action

Define the high-level page narrative and section sequence.

The first discussion should answer:

- What is the page's argument from first impression through final CTA?
- What job does each section perform?
- Which proof or product visual supports each section?
- Where does the canonical funnel enter the page experience?

Present the full recommended section sequence at a useful but not overly granular level. Resolve the narrative architecture before drafting final copy or detailed interface states.

## 9. Required reading for the new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS4-SPEC.md`
4. `docs/workstreams/WS2-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/05-working-agreement.md`
7. `docs/03-page-spec.md` only as a working baseline after the durable specifications
8. `docs/06-assumptions-and-open-questions.md`

Then execute the exact next action. Do not reopen confirmed WS2 or WS3 decisions and do not begin Lovable implementation.

## 10. Files updated for this handoff

- `docs/workstreams/WS3-SPEC.md`
- `docs/workstreams/WS4-SPEC.md`
- `docs/00-START-HERE.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`
- `docs/CURRENT-HANDOFF.md`

## 11. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and the frozen measurement period is defined.
