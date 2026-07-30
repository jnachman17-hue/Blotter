# Decision log

Date last updated: July 30, 2026

This file is a concise index of settled, rejected, and superseded project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.**

Status: Confirmed

**Workstream specifications preserve detailed decisions. This decision log remains a concise cross-project index.**

Status: Confirmed

## Strategy

**Market signal comes before meaningful product build. Build only what evidence calls for.**

Status: Confirmed

**The terminal artifact of the current validation phase is an economics story, not a backend product.**

Status: Confirmed

**Move with speed through build, measure, and learn. Prototype features are hypotheses, not commitments to build.**

Status: Confirmed

**Read rules are written before data exists, and analytics is verified by hand before public traffic or spend.**

Status: Confirmed

**Landing-page content and experience design precede Lovable implementation.**

Status: Confirmed

## Test design

**Round one compares spreadsheet-native versus standalone platform surfaces. It is not primarily a feature, headline, plan, audience-positioning, or price test.**

Status: Confirmed

**Both pages use the same canonical funnel, $9.99 monthly price, analytics event set, measurement rules, and displayed brand.**

Status: Confirmed

**Multiple CTA placements may exist, but every primary CTA enters the same funnel and origin is stored through `cta_location`.**

Status: Confirmed

**The spreadsheet page is designed and built first, but both pages ultimately launch at roughly the same time.**

Status: Confirmed

**During a measurement period, price, funnel sequence, core proposition, payment mechanics, event definitions, and traffic-allocation methodology are frozen. Material changes create a new labeled iteration.**

Status: Confirmed

**Every test readout reports overall surface results, counts and rates, uncertainty, test dates, tested price, traffic-source diagnostics, instrumentation incidents, and material traffic-quality concerns.**

Status: Confirmed

**No permanent or bounded project-level kill condition is set. Weak results invalidate the tested proposition for meaningful backend investment but do not prohibit disciplined iteration and retesting.**

Status: Confirmed

## Workstream 2 proposition

The full durable specification is `docs/workstreams/WS2-SPEC.md`.

Key confirmed rulings:

- July audience is pre-decay and the current page sells prevention.
- Live recruiting activity outpaces manual spreadsheet upkeep.
- Tracker decay creates stale status and loss of operational trust.
- The student maintains contacts and static information; Blotter maintains changing recruiting state from relevant Gmail and Calendar activity.
- The core outcome is one accurate, current source of truth.
- Benefits are accuracy, time saved, everything in one place, and prevention of slippage.
- The minimum visible offer includes auto-capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- The spreadsheet-native proposition must communicate low switching cost and preservation of the existing tracker.
- Blotter is a recruiting-logistics orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, learning content, or a jobs board.

Status: Confirmed

## Workstream 3 conversion and measurement

The full durable specification is `docs/workstreams/WS3-SPEC.md`.

Workstream 3 is complete.

Key confirmed rulings:

- The canonical funnel is CTA entry, two-question recruiting configuration, one concise product experience, recruiting-email capture, $9.99 monthly price, checkout progression, payment-choice click, and Fall 2026 cohort confirmation.
- One 15 to 20 second maximum click-to-progress product experience occurs before email capture.
- Actual or simulated OAuth is excluded from the mandatory round-one funnel.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- No annual plan, discount, plan selection, or price A/B test is used in round one.
- No card-entry form, credentials, or money are collected.
- `payment_option_clicked` is the strongest commercial-demand signal.
- The approximately 300-person Fall 2026 beta-cohort commitment is real and will be maintained.
- The canonical event set is `page_viewed`, `funnel_started`, `recruiting_profile_completed`, `product_experience_completed`, `email_submitted`, `price_viewed`, `checkout_started`, `payment_option_clicked`, and `beta_spot_confirmed`.
- There is no separate `cta_clicked` event.
- Both surfaces are compared at every matched funnel stage.
- The primary comparative metric is `checkout_started / page_viewed`.
- The primary commercial-demand metric is `payment_option_clicked / page_viewed`.
- Commercial-demand bands are 2.0 percent or higher strong, 1.0 to below 2.0 percent credible, 0.5 to below 1.0 percent ambiguous, and below 0.5 percent weak, subject to sample requirements.
- Comparative winner requirements are 25 percent relative lift, 2 percentage points absolute lift, 90 percent statistical confidence, and at least 300 eligible visitors per surface.
- Positive commercial classification requires at least 500 eligible visitors and 10 payment-choice clicks.
- Weak classification requires at least 600 eligible visitors and statistical support that the true rate is unlikely to reach 1 percent.

Status: Confirmed

## Workstream 4 content and experience design

The full durable specification is `docs/workstreams/WS4-SPEC.md`.

**Displayed brand is `Blotter`, while the owned domain remains `blotterib.com`. Both matched variants use the same displayed brand.**

Status: Confirmed

**The positioning hierarchy is a smart recruiting tracker for investment banking and high-finance networking, supported by the high-volume outreach, coffee-chat, follow-up, and interview workflow behind competitive finance recruiting. Recruiting track is captured inside the existing onboarding funnel.**

Status: Confirmed

**The spreadsheet landing page uses a seven-section narrative: hero, recruiting scale, how it works, action view, existing-sheet preservation, privacy and permissions, and concise closing CTA.**

Status: Confirmed

**The hero is static first and communicates that real recruiting activity automatically keeps a Google Sheets-style tracker current. It uses a muted ordinary tracker behind a dominant Blotter tracker, plus Gmail and Calendar event chips connected to updated cells. Motion is optional later.**

Status: Confirmed

**Three CTA placements are used: hero, after product and action proof, and final section. All enter the same canonical funnel.**

Status: Confirmed

**A truthful former-Goldman credential and a quantified time-savings claim based on Jon's model will appear. Exact wording and placement remain Workstream 4 decisions.**

Status: Confirmed

## Product and technical context

- Blotter is a logistics layer only.
- Auto-capture is the founding principle.
- Blotter must not be described as reading unrestricted personal email.
- If validation justifies backend build, Gmail access should use an intermediary such as Nylas or Unipile. Direct restricted-scope access and CASA remain deferred.
- Lovable is the implementation tool.
- The old design-token system and prior platform pixels are not authoritative.

Status: Confirmed

## Rejected and superseded items

- `You keep your record. Blotter keeps the state alive.` Rejected.
- Mandatory early Gmail OAuth or simulated Google authentication. Rejected.
- No price or card-adjacent step in round one. Superseded.
- Price on the main landing page. Rejected for round one.
- Multiple plans or price A/B testing. Rejected for round one.
- Card-entry form or payment collection. Rejected.
- Separate `cta_clicked` analytics event. Rejected.
- Permanent or bounded project kill condition. Rejected.
- Tally as the settled form solution. Not a decision.
- Separate event-to-row narrative section duplicating the hero mechanism. Rejected in favor of integrating the explanation into the broader How It Works section.

## Working baselines, not settled specifications

Unless separately confirmed, these remain Workstream 4 or later decisions:

- exact page copy;
- exact spreadsheet mock data and visual treatment;
- exact motion, if any;
- exact automated columns and statuses;
- action-focused-view implementation;
- final CTA wording;
- exact funnel demo frames;
- privacy and FAQ wording;
- final checkout and terminal copy;
- domain routing and Lovable deployment configuration.