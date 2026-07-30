# Workstream 3 Specification

Date last updated: July 30, 2026
Status: In progress
Workstream: Conversion and measurement design

## Purpose

This file is the durable specification for Workstream 3. It records all ratified conversion, funnel, analytics, metric, and interpretation decisions for the matched spreadsheet-versus-platform landing-page test.

This file must be updated live whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only record of these decisions.

## Workstream objective

Define:

- the strongest meaningful demand signal;
- the complete matched visitor funnel;
- lead capture and segmentation;
- product-experience constraints;
- price and checkout treatment;
- the identical analytics event set and event properties;
- metric hierarchy;
- read rules and interpretation thresholds before traffic launches.

Workstream 3 does not design the page, specify detailed product behavior, or begin Lovable implementation.

## Round-one test boundary

Round one compares one macro variable:

- spreadsheet-native surface;
- standalone platform surface.

It is not primarily a test of price, individual features, headlines, or plans.

Both pages must:

- use the same canonical funnel;
- use the same event set;
- expose the same monthly price at the same stage;
- remain comparable in interaction burden;
- launch at roughly the same time.

## Signal hierarchy

The funnel uses graded intent signals rather than one binary conversion.

- Landing-page and CTA behavior measure attention and proposition-level interest.
- Recruiting-profile completion and product-experience completion measure sustained exploration.
- Email submission measures identified adoption intent and creates a contactable lead.
- Price exposure establishes economic qualification.
- `Continue to payment` measures price-qualified checkout intent.
- Clicking a payment-choice button after seeing the monthly price and checkout total is the strongest commercial-demand signal.
- Reaching pricing or checkout without choosing a payment method is not equivalent to willingness to pay.
- Terminal confirmation is an instrumentation check, not a stronger demand signal.

## Canonical funnel

Every primary CTA, regardless of placement, enters the same funnel.

Confirmed sequence:

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. Exposure to one product at one monthly price inside the funnel.
6. `Continue to payment` or equivalent checkout progression.
7. Separate short checkout screen with `Pay with card`, Apple Pay where supported, or equivalent payment-choice actions.
8. Fall 2026 limited first-cohort confirmation.

Multiple CTA placements are permitted. CTA origin is measured through `cta_location` rather than through separate conversion paths.

## Recruiting segmentation

The funnel asks only two high-value questions.

### Question 1

`What are you recruiting for?`

Approved options, in order:

1. Investment Banking
2. Management Consulting
3. Private Equity / Growth Equity
4. Sales & Trading
5. Asset Management / Equity Research
6. Venture Capital
7. Other

Management Consulting is included because it is an adjacent high-volume recruiting workflow even though it is not technically a high-finance role. The user-facing question therefore avoids the phrase high finance.

Deliberate exclusions and grouping:

- Wealth Management is excluded from the primary list because its workflow is less representative of the initial high-volume networking problem.
- Hedge Funds are grouped under Asset Management for the first pass.
- Private Credit may sit under Private Equity / Growth Equity or Other.
- Corporate Finance is excluded as too broad and less aligned with the initial proposition.

### Question 2

Recruiting window options:

1. Summer 2028
2. Full-time
3. Other

School and current year are excluded. Current year is unnecessary or sufficiently inferred from the recruiting window for this test.

## Product experience

The funnel contains one product experience before email capture.

The earlier concept of a brief teaser before email followed by a more substantial experience after email is rejected. The visitor would have no knowledge that a second experience was coming, so the split would create an artificial interruption without clear analytical value.

Confirmed constraints:

- approximately 15 to 20 seconds maximum;
- click-to-progress is the working interaction model;
- animation is not required and should not be treated as the default;
- no unnecessary tutorial burden;
- shows the product surface clearly enough to support an informed continuation decision;
- makes Gmail, Google Sheets, and Calendar understandable as the engine driving live state;
- spreadsheet and platform versions remain comparable in duration and interaction burden.

Deferred to Workstream 4:

- exact frames;
- exact clicks;
- demo states;
- visual sequence;
- whether the funnel product experience reuses, extends, or differs from the main landing-page hero visual.

## Email capture

The mandatory round-one funnel does not require actual or simulated Gmail, Calendar, or Sheets OAuth.

Approved direction:

`Continue to your recruiting workspace`

`Enter the email address where you conduct recruiting.`

The step must not:

- request a password;
- imitate Google authentication;
- use phishing-adjacent design;
- imply that inbox access has been granted.

Reason for excluding early OAuth:

An unfamiliar product asking for sensitive permissions before earning trust would create an analytically ambiguous abandonment point. Drop-off could reflect permission sensitivity, brand trust, device or account issues, or misunderstanding rather than weak product demand.

The landing page and product experience must still explain and show Gmail, Sheets, and Calendar as the mechanism that keeps recruiting state current.

Willingness to grant permissions and connect real integrations is deferred to a later validation iteration after users understand product value, privacy boundaries, and permission requirements.

The visitor's email belongs in the lead record and should not be copied into general analytics properties.

## Price treatment

Option A is confirmed: exact price appears only inside the funnel.

- Price does not appear on the main landing page in round one.
- Price first appears after the product experience and email capture.
- Both variants reveal the same price at the same matched stage.
- Round one shows one product at one monthly price.
- There is no plan-selection step.
- There is no price A/B test.
- The exact dollar amount remains unresolved and is currently largely arbitrary.
- Price is not the round-one test variable.

Reason:

Showing price on the main page could dominate first impressions and confound the macro surface comparison before visitors understand the product.

## Checkout mechanics

After price exposure, the visitor clicks `Continue to payment` or equivalent and reaches a separate, short checkout screen.

The checkout should show:

- Blotter;
- exact monthly price;
- monthly billing cadence;
- amount due;
- concise product descriptor;
- `Pay with card`;
- Apple Pay where supported.

`Pay with card` is always available. Device-dependent payment options may appear only where supported.

Either payment-choice click counts as the same core commercial-demand event. Payment method is stored separately where available.

No card-entry form is shown. No payment credentials or money are collected.

## Terminal state

After the payment-choice click, the visitor is told:

- Blotter is planned for Fall 2026;
- they have secured a place in the limited first beta cohort;
- the cohort is approximately 300 people;
- confirmation and future access will use the recruiting email already provided.

Jon will maintain and honor the cohort list. Therefore, `secured a place` is a real operational commitment rather than empty scarcity language.

Because the visitor never enters card details and no charge attempt occurs, the terminal screen does not need unnecessary language stating that no payment was processed or that no card details were collected.

Exact terminal copy is deferred to Workstream 4.

## Canonical analytics events

Both variants use this identical event set:

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

There is no separate `cta_clicked` event. `funnel_started` carries CTA origin through the `cta_location` property.

## Event meanings

- `page_viewed`: visitor viewed one of the two landing-page variants.
- `funnel_started`: visitor entered the canonical funnel through a primary CTA.
- `recruiting_profile_completed`: visitor completed both segmentation questions.
- `product_experience_completed`: visitor completed the concise surface-specific product experience.
- `email_submitted`: visitor supplied the recruiting email address.
- `price_viewed`: exact monthly price was rendered to the visitor.
- `checkout_started`: visitor clicked `Continue to payment` or equivalent.
- `payment_option_clicked`: visitor clicked a payment method after seeing the price and checkout total.
- `beta_spot_confirmed`: terminal cohort confirmation rendered successfully.

`payment_option_clicked` is the strongest commercial-demand event.

`beta_spot_confirmed` is an instrumentation and terminal-completion check. It must not be treated as stronger intent than the payment-choice action that caused it.

## Required event properties

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

The event set and property definitions must remain identical across spreadsheet and platform variants.

## Ratified metric hierarchy

All conversion rates use unique eligible visitors rather than raw event counts. A visitor counts no more than once per surface for each metric.

### Primary comparative metric

**Checkout-start rate across all eligible landing-page visitors**

- Numerator: unique visitors reaching `checkout_started`.
- Denominator: unique eligible visitors reaching `page_viewed`.
- Calculated separately for spreadsheet and platform surfaces.
- This is the primary metric for determining relative surface preference.
- The analysis follows the visitor's assigned surface from `page_viewed`, regardless of later funnel completion.

Rationale: the visitor has experienced the surface, submitted an email, seen the actual monthly price, and still chosen to proceed toward payment. It is therefore a stronger and more balanced comparative measure than early curiosity events, while remaining less sparse than the final payment-choice event.

### Secondary comparative metrics

1. **Funnel-start rate**
   - `funnel_started` divided by `page_viewed`.
   - Measures initial proposition-level interest.

2. **Email-submission rate**
   - `email_submitted` divided by `page_viewed`.
   - Measures identified adoption intent before price-qualified progression.

3. **Post-price progression rate**
   - `checkout_started` divided by `price_viewed`.
   - Measures whether visitors who saw the exact price still chose to advance.

These metrics explain the primary comparative result. They do not replace it.

### Commercial-demand metrics

1. **Primary commercial-demand metric**
   - Unique visitors reaching `payment_option_clicked` divided by all unique eligible visitors reaching `page_viewed`.
   - Plain-language meaning: of everyone who visited the landing page, what percentage clicked a payment option after seeing the product and price?
   - This judges absolute commercial demand across the full audience.

2. **Supporting commercial-demand metric**
   - Unique visitors reaching `payment_option_clicked` divided by unique visitors reaching `checkout_started`.
   - Plain-language meaning: of everyone who reached checkout, what percentage clicked a payment option?
   - This isolates checkout conversion among already qualified visitors.

`beta_spot_confirmed` remains an instrumentation and terminal-flow completion check. It is not a commercial-demand metric.

### Diagnostic metrics

The following are ratified as diagnostics only:

- `recruiting_profile_completed` divided by `funnel_started`;
- `product_experience_completed` divided by `recruiting_profile_completed`;
- `email_submitted` divided by `product_experience_completed`;
- `price_viewed` divided by `email_submitted`;
- `checkout_started` divided by `price_viewed`;
- `beta_spot_confirmed` divided by `payment_option_clicked`.

Diagnostic metrics identify where visitors abandon the funnel and whether an implementation step is malfunctioning. They may explain a result, but they must not independently determine which surface wins or whether the project deserves continued investment.

Diagnostic interactions may also be tracked sparingly, including product-experience step views, privacy-detail opens, or integration-explanation opens. Do not track every hover, scroll, tab, card, or decorative interaction merely because it is technically measurable.

## Ratified read rules

### Decision hierarchy when comparative preference and absolute demand disagree

1. Absolute commercial demand determines whether either proposition deserves further investment.
2. Relative surface preference determines which surface to pursue only after at least one proposition demonstrates credible absolute demand.
3. A surface does not become viable merely because it performs better than another weak surface.
4. If both surfaces show weak commercial demand, the result is `no validated surface`, even if one wins the primary comparative metric.
5. If both surfaces show credible commercial demand, use the primary comparative metric, `checkout_started` divided by `page_viewed`, to select the preferred surface.
6. If the primary comparative metric favors one surface but adequately sampled payment-choice behavior favors the other, the stronger commercial-demand result takes priority because it is closer to actual willingness to pay.
7. If payment-choice volume is too low to interpret reliably, it cannot overturn the primary comparative metric. The result remains provisional or ambiguous until the low-sample rules are applied.

Governing principle: commercial demand decides whether to continue. Comparative performance decides what to continue with.

## Matched-comparison requirement

The spreadsheet and platform pages must be compared at every matched funnel stage, not only at `payment_option_clicked`.

This permits diagnosis of where each surface gains or loses visitors while preserving the payment-choice click as the strongest commercial signal.

The test must distinguish:

- proposition-level interest;
- sustained product exploration;
- identified adoption intent;
- price-qualified checkout intent;
- strongest commercial demand.

## Low-switching-cost constraint carried from Workstream 2

The spreadsheet-native page must communicate that:

- Blotter works with the student's current spreadsheet;
- the student does not rebuild or migrate the tracker from scratch;
- existing contacts, notes, and structure are preserved;
- Blotter can be adopted at any stage of recruiting;
- the student continues adding contacts while Blotter maintains changing activity.

Exact copy and visual treatment belong to Workstream 4.

## Remaining Workstream 3 decisions

1. Continue writing precommitted read rules.
2. Define success, failure, ambiguity, and low-sample treatment.
3. Define treatment of disagreement between early-funnel and late-funnel results.
4. Decide whether a project-level kill condition is required before launch or remains deferred.
5. Select the exact monthly price before implementation or explicitly defer selection to Workstream 4 or 5.
6. Complete this specification and hand off durable constraints to Workstream 4.

## Workstream boundary

Do not use Workstream 3 to define:

- full page narrative;
- final copy;
- exact hero composition;
- exact demo visuals;
- detailed interface design;
- backend product logic;
- OAuth implementation;
- integration architecture;
- platform information architecture;
- technical feature specifications;
- Lovable implementation.

Those belong to later workstreams.

## Exact next action

Define the next precommitted read rule: how to interpret disagreement between early-funnel interest and late-funnel commercial intent before setting numerical success, failure, ambiguity, or low-sample thresholds.