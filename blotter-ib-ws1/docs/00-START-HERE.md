# Blotter IB — Start Here

Date last updated: 2026-07-30

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce market evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Validation design and landing-page proposition development.

The confirmed workstream sequence is:

1. Workstream 1: continuity and source-of-truth setup.
2. Workstream 2: spreadsheet-native proposition.
3. Workstream 3: CTA, conversion goal, lead-capture flow, analytics architecture, event parity, and read rules.
4. Workstream 4: spreadsheet landing-page content and experience design.
5. Workstream 5: spreadsheet-page Lovable implementation, instrumentation, and private deployment.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.
9. Use market evidence to continue, revise, retest, or kill the project.
10. Do not build meaningful backend functionality until market evidence guides it.

Landing-page content and experience design must occur before Lovable implementation. Lovable is the implementation and visual-iteration environment, not the place where the project first decides what the page is trying to communicate.

## Current workstream

Workstream 3: Conversion and measurement design.

Status: In progress, approximately 65 to 70 percent complete.

Workstreams 1 and 2 are complete.

## Workstream 2 outcome

Workstream 2 established a coherent spreadsheet-native proposition at landing-page-test resolution:

- The July audience is pre-decay because of the recruiting calendar. The page sells prevention now and may sell rescue later in peak season.
- The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- Tracker decay is caused by cumulative volume and inconsistent upkeep. The sheet becomes stale, inconsistent, and no longer reflects reality.
- The student chooses and enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain the changing side of the tracker.
- The core outcome is operational control through one accurate, current source of truth, emphasizing accuracy, time saved, everything in one place, and preventing important actions from slipping through the cracks.
- The minimum offer includes automatic activity capture, visually legible contact state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- Blotter is an orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or an AI slop platform.
- Exact columns, statuses, sorting or grouping mechanics, page copy, and visual design remain unresolved design decisions rather than product specifications.

## Workstream 3 objective

Define what visitor behavior the matched landing-page test is trying to produce, how that behavior will be captured, and how the resulting data will be interpreted before either page is built.

Workstream 3 should resolve:

1. Primary conversion goal and graded intent signals.
2. CTA behavior at a conceptual level.
3. Lead-capture flow and information collected at each step.
4. Price and purchase-intent treatment in round one.
5. Identical analytics event set for spreadsheet and platform pages.
6. Event definitions, naming, and measurement architecture.
7. Read rules written before data exists.
8. Success, failure, and ambiguous-result thresholds.
9. Any conversion-design constraints Workstream 4 must preserve.

Workstream 3 should not write the full landing page, settle final visual design, specify detailed product logic, or begin Lovable implementation.

## Workstream 3 confirmed progress

The following are confirmed:

- Round one uses an identical multi-stage demand funnel across spreadsheet and platform pages.
- Multiple CTA placements may exist, but all enter the same canonical funnel. CTA origin is stored as a property.
- The canonical funnel is: CTA entry, two-question recruiting configuration, concise product experience, recruiting-email capture, one monthly price inside the funnel, checkout progression, payment-choice click, and Fall 2026 first-cohort confirmation.
- The product experience occurs once before email capture, should take approximately 15 to 20 seconds at most, and uses simple click-to-progress rather than requiring animation.
- Exact demo visuals and the relationship between the funnel demo and landing-page hero are deferred to Workstream 4.
- Segmentation asks only what the visitor is recruiting for and which recruiting window they target.
- Approved recruiting tracks are Investment Banking, Management Consulting, Private Equity / Growth Equity, Sales & Trading, Asset Management / Equity Research, Venture Capital, and Other.
- Approved recruiting windows are Summer 2028, Full-time, and Other.
- Email capture is transparent and does not use actual or simulated OAuth.
- Gmail, Google Sheets, and Calendar must still be shown as the engine driving the product, but willingness to grant permissions is deferred to a later validation iteration.
- The exact price appears only inside the funnel after product experience and email capture. Price is not a round-one test variable.
- A separate short checkout screen shows the product, monthly price, billing cadence, amount due, and payment choices.
- `Pay with card` is always available. Apple Pay may appear where supported.
- The strongest commercial-demand signal is clicking a payment-choice button after seeing the price and checkout total.
- No card-entry form, payment credentials, or money are collected.
- The terminal state confirms a place in the approximately 300-person Fall 2026 first beta cohort, which Jon will maintain and honor.
- Both pages are compared at every matched funnel stage, not only at the final payment-choice event.
- The identical analytics event set is confirmed as: `page_viewed`, `funnel_started`, `recruiting_profile_completed`, `product_experience_completed`, `email_submitted`, `price_viewed`, `checkout_started`, `payment_option_clicked`, and `beta_spot_confirmed`.
- `funnel_started` carries `cta_location`; there is no separate redundant `cta_clicked` event.
- `payment_option_clicked` is the strongest commercial event. `beta_spot_confirmed` is an instrumentation and completion check.

## Current confirmed constraints

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical docs are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Only confirmed items in `04-decision-log.md` are binding project truth.
- Build market evidence before meaningful product or backend buildout.
- Round one compares spreadsheet-native versus platform-version product surfaces.
- The spreadsheet-native landing page is designed and built first.
- Spreadsheet and platform pages launch at roughly the same time.
- Both pages must fire an identical analytics event set.
- Analytics and read rules must be defined before traffic launches.
- Analytics must be verified by hand before any paid traffic.
- `03-page-spec.md` is a working baseline, not final build-ready truth.
- The project stays focused on recruiting logistics, not interview preparation, learning content, AI outreach, contact discovery, or job boards.
- Do not begin Lovable implementation during Workstream 3 or before Workstream 4 produces a coherent content and experience brief.

## Immediate next milestone

Complete Workstream 3 by defining the metric hierarchy, read rules, interpretation thresholds, low-sample treatment, and the rules for conflicting comparative and absolute demand signals.

The exact next action is recorded in `CURRENT-HANDOFF.md` and should be followed without reopening confirmed conversion or analytics decisions.

## Remaining Workstream 3 items

- Define primary, secondary, commercial-demand, and diagnostic metrics.
- Write precommitted read rules.
- Set success, failure, ambiguous-result, and low-sample treatment.
- Define how to interpret disagreement between early-funnel and payment-intent results.
- Define how to interpret a surface winner when absolute demand is weak for both pages.
- Decide whether a project-level kill condition is required now.
- Resolve or deliberately defer the exact monthly price.
- Consolidate the final Workstream 3 decisions and hand off to Workstream 4.

## Deferred to Workstream 4

- Final page narrative and section order.
- Headline, subhead, and supporting copy.
- Recruiting-volume statistics and proof devices.
- Spreadsheet hero and product-demo visuals.
- Exact funnel product-experience frames and clicks.
- Relationship between the funnel demo and main landing-page hero.
- Action-focused view implementation in the demo.
- Gmail, Sheets, and Calendar mechanism visualization.
- Privacy, permissions, trust, and FAQ content.
- Exact CTA wording and placement.
- Final checkout and terminal-state copy.

## Deferred to later workflows

- Lovable implementation and private deployment.
- Platform-page argument and capability inventory.
- Paid and organic acquisition plan.
- Testing-domain identity.
- Final logo.
- Real OAuth and permissions-willingness testing.
- Meaningful backend functionality.

## Repository and archive rules

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Historical archive path:

`blotter-ib-ws1/archive/`

The archive contains stale or superseded strategy, design, technical, and session-history material. Do not treat it as current truth or read it wholesale. Consult relevant archived files only when they can materially inform a current question, recover prior reasoning, or prevent duplicated work. Any recovered idea must be identified as historical context and re-evaluated against current confirmed decisions.

## Canonical file list

- `00-START-HERE.md` — current-state index
- `01-project-and-product.md` — project and product context
- `02-strategy-and-test.md` — validation strategy, corrected workstream sequence, and test design
- `03-page-spec.md` — spreadsheet-page working baseline
- `04-decision-log.md` — confirmed decisions and statused rulings
- `05-working-agreement.md` — operating rules and continuity process
- `06-assumptions-and-open-questions.md` — unsettled assumptions and open questions
- `CURRENT-HANDOFF.md` — immediate resumption context and exact next action