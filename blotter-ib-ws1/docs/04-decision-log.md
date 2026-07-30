# Decision log

Date last updated: July 30, 2026

This file is a concise index of settled, rejected, and superseded project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

Jon's explicit instructions override project files. If files conflict with Jon's current instruction, flag the conflict and obtain the final verdict.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`.** The active specification is updated after ratifications. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.

Status: Confirmed

**Workstream specifications preserve detailed decisions. This decision log remains a concise cross-project index.**

Status: Confirmed

## Strategy

**Market signal comes before meaningful product build. Build only what evidence calls for.**

Status: Confirmed

**The terminal artifact of the current phase is an economics story, not a backend product.**

Status: Confirmed

**Move with speed through build, measure, and learn. Features shown in landing-page prototypes are hypotheses, not commitments to build.**

Status: Confirmed

**Read rules are written before data exists.**

Status: Confirmed

**Analytics is verified by hand before public traffic or spend.**

Status: Confirmed

**Landing-page content and experience design precede Lovable implementation.**

Status: Confirmed

**Research precedes spend, except for social account seeding needed to establish account age and history.**

Status: Confirmed

## Test design

**Round one compares spreadsheet-native versus standalone platform surfaces. It is not primarily a feature, headline, plan, or price test.**

Status: Confirmed

**Both pages use the same canonical funnel and identical analytics event set.**

Status: Confirmed

**Multiple CTA placements may exist, but every primary CTA enters the same funnel. CTA origin is stored through `cta_location`.**

Status: Confirmed

**The spreadsheet page is designed and built first, but both pages launch at roughly the same time.**

Status: Confirmed

**Status vocabulary may differ only if a real surface-specific reason appears. Event parity remains mandatory.**

Status: Confirmed

## Workstream 2 proposition

The full durable specification is:

`docs/workstreams/WS2-SPEC.md`

Key confirmed rulings:

**The July audience is pre-decay because of the recruiting calendar. The current page sells prevention of predictable tracker failure.**

Status: Confirmed

**The structural failure is live recruiting activity outpacing manual spreadsheet upkeep.**

Status: Confirmed

**Tracker decay is caused by cumulative volume and inconsistent upkeep, not merely by too many columns or one missed update.**

Status: Confirmed

**The consequence is stale status and loss of operational trust, not merely visual messiness.**

Status: Confirmed

**The spreadsheet-native product divides the tracker into a student-maintained contact layer and a Blotter-maintained activity layer.**

Status: Confirmed

**The student finds and enters contacts. Blotter maintains changing recruiting state from relevant Gmail and Calendar activity.**

Status: Confirmed

**The core outcome is operational control through one accurate, current source of truth.**

Status: Confirmed

**The proposition communicates accuracy, time saved, everything in one place, and prevention of slippage.**

Status: Confirmed

**The minimum visible offer includes auto-capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow.**

Status: Confirmed

**The spreadsheet-native proposition must communicate very low switching cost and preservation of the student's existing tracker.**

Status: Confirmed

**Color-coded relationship state is a resonant design and marketing consideration, but exact colors and statuses are deferred.**

Status: Confirmed

**Blotter is a recruiting-logistics orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, learning content, or a jobs board.**

Status: Confirmed

**The landing page must explain auto-capture in plain language and must not imply unrestricted personal-inbox access.**

Status: Confirmed

**Workstream 2 stops at proposition coherence for a credible test and does not become a product-requirements exercise.**

Status: Confirmed

## Workstream 3 conversion and measurement

The active durable specification is:

`docs/workstreams/WS3-SPEC.md`

Key confirmed rulings:

**Round one uses a matched multi-stage funnel rather than one binary conversion.**

Status: Confirmed

**The canonical sequence is CTA entry, two-question recruiting configuration, concise product experience, recruiting-email capture, one monthly price inside the funnel, checkout progression, payment-choice click, and Fall 2026 cohort confirmation.**

Status: Confirmed

**The recruiting questions are `What are you recruiting for?` and recruiting window. Approved option sets are recorded in `WS3-SPEC.md`.**

Status: Confirmed

**One concise product experience occurs before email capture, lasts approximately 15 to 20 seconds maximum, and uses click-to-progress as the working model. Animation is not required.**

Status: Confirmed

**Actual or simulated OAuth is excluded from the mandatory round-one funnel. Email capture is transparent and permission willingness is tested later.**

Status: Confirmed

**Gmail, Sheets, and Calendar must still be shown as the product engine.**

Status: Confirmed

**Exact price appears only inside the funnel after product experience and email capture. Round one shows one product at one monthly price with no plan selection or price A/B test.**

Status: Confirmed

**A separate short checkout screen precedes the strongest commercial action.**

Status: Confirmed

**`payment_option_clicked` is the strongest commercial-demand signal. No card-entry form, payment credentials, or money are collected.**

Status: Confirmed

**The terminal state confirms a real place in an approximately 300-person Fall 2026 first beta cohort, which Jon will maintain and honor.**

Status: Confirmed

**The identical canonical event set is `page_viewed`, `funnel_started`, `recruiting_profile_completed`, `product_experience_completed`, `email_submitted`, `price_viewed`, `checkout_started`, `payment_option_clicked`, and `beta_spot_confirmed`.**

Status: Confirmed

**There is no separate `cta_clicked` event. `funnel_started` carries `cta_location`.**

Status: Confirmed

**Both surfaces are compared at every matched funnel stage, not only at the final commercial event.**

Status: Confirmed

## Product and technical context

**Blotter is a logistics layer only.**

Status: Confirmed

**Auto-capture is the founding principle. Gmail and Calendar activity drive changing state.**

Status: Confirmed

**Blotter must not be described as reading unrestricted personal email.**

Status: Confirmed

**If validation justifies backend build, Gmail access should use an intermediary such as Nylas or Unipile. Direct restricted-scope access and CASA are deferred.**

Status: Confirmed

## Tooling

**Lovable is the implementation tool.**

Status: Confirmed

**The old design-token system and prior platform pixels are scrapped and not authoritative.**

Status: Confirmed

## Method

**Owner-supplied recruiting-cycle figures may be used as illustrative prototype copy if they are not falsely attributed to an external study or represented as independently verified averages.**

Status: Confirmed

**Do not let external evidence research become a blocker to launching the validation test.**

Status: Confirmed

## Rejected and superseded items

**`You keep your record. Blotter keeps the state alive.`** Rejected because the distinction is unclear to a new student.

Status: Rejected

**Connect Gmail as the mandatory primary CTA or early OAuth step.** Superseded by transparent recruiting-email capture and later permission testing.

Status: Superseded

**No price or card-adjacent step in round one.** Superseded. Price appears inside the funnel and the test stops at payment-method choice without collecting credentials or money.

Status: Superseded

**A booked call suppresses follow-up prompts.** Too granular for the current validation phase and not a settled decision.

Status: Not a decision

**Tally is the form solution.** Candidate only, not settled.

Status: Not a decision

## Working baselines, not settled specifications

Unless separately confirmed, these remain Workstream 4 or later decisions:

- exact status vocabulary;
- hero composition;
- table visual treatment;
- motion;
- feature-card structure;
- final copy structure;
- exact automated columns;
- exact action-focused-view implementation;
- low-level layout rules;
- final CTA wording and placement;
- exact funnel demo frames;
- final checkout and terminal copy.
