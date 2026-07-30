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

## 3. Workstream 2 proposition carried forward

- The current page sells prevention of predictable tracker decay.
- The failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- The student enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain changing recruiting state.
- The core outcome is operational control through one accurate, current source of truth.
- Blotter is a recruiting-logistics orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or a jobs board.
- The spreadsheet-native proposition must emphasize low switching cost: it works with the student's current spreadsheet, preserves existing contacts and notes, can be adopted at any stage, and requires no rebuild.

## 4. Confirmed Workstream 3 conversion architecture

### Matched funnel

Round one uses an identical multi-stage funnel across the spreadsheet and platform pages. Multiple CTA placements may exist, but every primary CTA enters the same canonical funnel. CTA origin is recorded as a property.

Confirmed sequence:

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. Exposure to one product at one monthly price inside the funnel.
6. `Continue to payment` or equivalent checkout progression.
7. Separate short checkout screen with `Pay with card`, Apple Pay where supported, or equivalent payment-choice actions.
8. Fall 2026 limited first-cohort confirmation.

### Segmentation

Question 1: `What are you recruiting for?`

Approved options:

1. Investment Banking
2. Management Consulting
3. Private Equity / Growth Equity
4. Sales & Trading
5. Asset Management / Equity Research
6. Venture Capital
7. Other

Question 2 options:

1. Summer 2028
2. Full-time
3. Other

School and current year are excluded.

### Product experience boundary

- One concise product experience occurs before email capture.
- It should take approximately 15 to 20 seconds at most.
- Click-to-progress is the working model. Animation is not required.
- It must make the Gmail, Google Sheets, and Calendar engine understandable.
- Exact frames, demo states, and relationship to the landing-page hero are deferred to Workstream 4.
- Spreadsheet and platform variants must remain comparable in duration and interaction burden.

### Email capture

The mandatory funnel does not require actual or simulated OAuth.

Approved direction:

`Continue to your recruiting workspace`

`Enter the email address where you conduct recruiting.`

Willingness to grant Gmail, Calendar, or Sheets permissions is deferred to a later validation iteration.

### Price and checkout

- Exact price appears only inside the funnel after product experience and email capture.
- Price is not shown on the main landing page.
- Round one uses one product at one monthly price. There is no plan selection or price A/B test.
- The exact dollar amount remains unresolved and is not itself the round-one test variable.
- `Continue to payment` measures price-qualified checkout intent.
- The strongest commercial-demand signal is clicking `Pay with card`, Apple Pay, or equivalent after seeing the proposed monthly price and checkout total.
- No card-entry form, payment credentials, or money are collected.
- After the payment-choice click, the visitor is told Blotter is planned for Fall 2026 and that they secured a place in the approximately 300-person first beta cohort.
- Jon will maintain and honor the cohort list.
- The terminal screen does not need unnecessary language stating that no payment was processed or no card details were collected.

## 5. Confirmed analytics architecture

Both product variants use the identical canonical event set.

### Canonical funnel events

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

`funnel_started` replaces a separate `cta_clicked` event. CTA origin is stored through the `cta_location` property.

### Signal interpretation

- `page_viewed` establishes exposure.
- `funnel_started` measures proposition-level interest.
- `recruiting_profile_completed` and `product_experience_completed` measure sustained exploration.
- `email_submitted` measures identified adoption intent and creates a contactable lead.
- `price_viewed` establishes economic exposure.
- `checkout_started` measures price-qualified checkout intent.
- `payment_option_clicked` is the strongest commercial-demand event.
- `beta_spot_confirmed` is an instrumentation and successful-terminal-state check, not a stronger demand signal.

### Required event properties

Core properties where applicable:

- `surface_variant`
- `session_id`
- `visitor_id`
- `traffic_source`
- `campaign`
- `device_type`
- `cta_location`
- `recruiting_track`
- `recruiting_window`

Later-stage properties where applicable:

- `price`
- `billing_period`
- `payment_method`

The visitor's email belongs in the lead record and should not be duplicated as a general analytics event property.

### Diagnostic events

Diagnostic interactions may be tracked sparingly, such as product-experience steps, privacy-detail opens, or integration-explanation opens. They are not conversion outcomes and must not complicate the primary funnel analysis.

The spreadsheet and platform pages must be compared at every matched funnel stage, not only at `payment_option_clicked`.

## 6. Workstream 3 progress and remaining scope

Workstream 3 is approximately 65 to 70 percent complete.

Completed:

- primary conversion objective and graded signal hierarchy;
- canonical funnel stages and order;
- segmentation fields and options;
- email-capture treatment;
- product-experience boundary;
- price placement;
- checkout and terminal-state mechanics;
- identical analytics event set and minimum event properties.

Remaining:

1. Define primary, secondary, and diagnostic metrics from the event set.
2. Write read rules before data exists.
3. Define success, failure, and ambiguous-result thresholds, including low-sample treatment and disagreement between early- and late-funnel results.
4. Decide whether an exact project-level kill condition is required now or remains deferred.
5. Select an exact monthly price before implementation, unless explicitly deferred into Workstream 4 or 5.
6. Consolidate confirmed rulings into canonical documents and prepare the Workstream 4 handoff.

Do not expand into product architecture, backend logic, OAuth implementation, detailed feature design, platform information architecture, final page copy, exact demo visuals, or Lovable implementation.

## 7. Exact next action

Define metric hierarchy and then write the read rules.

The next discussion should distinguish:

- the primary metric for comparing spreadsheet versus platform;
- secondary funnel metrics used to explain the primary result;
- commercial-demand metrics used to judge whether either proposition deserves continued investment;
- diagnostic metrics that should not determine the decision;
- how to interpret disagreement between surface preference and absolute demand.

Do not yet design the full page, write final copy, specify technical product behavior, or begin Lovable implementation.

## 8. Required reading for resumption

Read first:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read:

- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Read `docs/01-project-and-product.md` for product context if needed. Read `docs/03-page-spec.md` only when a conversion decision materially intersects later page structure.

## 9. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.
