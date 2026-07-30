# Workstream 3 Specification

Date last updated: July 30, 2026
Status: In progress
Workstream: Conversion and measurement design

## Purpose

This file is the durable, cumulative specification for Workstream 3. It records ratified conversion, funnel, analytics, metric, and interpretation decisions for the matched spreadsheet-versus-platform landing-page test.

Update this file whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 3 decision. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only record.

## Workstream objective

Define:

- the complete matched visitor funnel;
- lead capture and segmentation;
- product-experience constraints;
- price and checkout treatment;
- the identical analytics event set and event properties;
- the metric hierarchy;
- precommitted read rules and interpretation thresholds before traffic launches.

Workstream 3 does not design the full page, specify detailed product behavior, or begin Lovable implementation.

## Round-one test boundary

Round one compares one macro variable:

- spreadsheet-native surface;
- standalone platform surface.

It is not primarily a test of price, individual features, headlines, or plans.

Both pages must:

- use the same canonical funnel;
- use the same analytics event set;
- expose the same monthly price at the same stage;
- remain comparable in interaction burden;
- launch at roughly the same time.

## Signal hierarchy

The funnel uses graded intent signals rather than one binary conversion.

- Landing-page and CTA behavior measure attention and proposition-level interest.
- Recruiting-profile and product-experience completion measure sustained exploration.
- Email submission measures identified adoption intent and creates a contactable lead.
- Price exposure establishes economic qualification.
- `checkout_started` measures price-qualified checkout intent.
- `payment_option_clicked` is the strongest commercial-demand signal.
- Reaching pricing or checkout without choosing a payment method is not equivalent to willingness to pay.
- `beta_spot_confirmed` is an instrumentation and terminal-completion check, not a stronger demand signal.

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

Multiple CTA placements are permitted. CTA origin is measured through `cta_location` rather than separate conversion paths.

## Recruiting segmentation

The funnel asks only two high-value questions.

### Recruiting track

Question: `What are you recruiting for?`

Approved options, in order:

1. Investment Banking
2. Management Consulting
3. Private Equity / Growth Equity
4. Sales & Trading
5. Asset Management / Equity Research
6. Venture Capital
7. Other

School and current year are excluded.

### Recruiting window

Approved options:

1. Summer 2028
2. Full-time
3. Other

## Product experience

The funnel contains one product experience before email capture.

The earlier concept of a teaser before email followed by a second experience after email is rejected.

Confirmed constraints:

- approximately 15 to 20 seconds maximum;
- click-to-progress is the working interaction model;
- animation is not required;
- no unnecessary tutorial burden;
- shows the surface clearly enough to support an informed continuation decision;
- makes Gmail, Google Sheets, and Calendar understandable as the engine driving live state;
- spreadsheet and platform versions remain comparable in duration and interaction burden.

Deferred to Workstream 4:

- exact frames and clicks;
- demo states and visual sequence;
- relationship between the funnel experience and the main landing-page hero.

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

The product experience must still explain Gmail, Sheets, and Calendar as the mechanism that keeps recruiting state current.

The visitor's email belongs in the lead record and should not be copied into general analytics properties.

## Price treatment

- Exact price appears only inside the funnel.
- Price does not appear on the main landing page in round one.
- Price first appears after the product experience and email capture.
- Both variants reveal the same price at the same matched stage.
- Round one shows one product at one monthly price.
- There is no plan-selection step.
- There is no price A/B test.
- The exact dollar amount remains unresolved.
- Price is not the round-one test variable.

## Checkout mechanics

After price exposure, the visitor clicks `Continue to payment` or equivalent and reaches a separate short checkout screen.

The checkout should show:

- Blotter;
- exact monthly price;
- monthly billing cadence;
- amount due;
- concise product descriptor;
- `Pay with card`;
- Apple Pay where supported.

`Pay with card` is always available. Device-dependent payment options may appear only where supported.

Either payment-choice click counts as `payment_option_clicked`. Payment method is stored separately where available.

No card-entry form is shown. No payment credentials or money are collected.

## Terminal state

After the payment-choice click, the visitor is told:

- Blotter is planned for Fall 2026;
- they secured a place in the limited first beta cohort;
- the cohort is approximately 300 people;
- confirmation and future access will use the recruiting email already provided.

Jon will maintain and honor the cohort list. Exact terminal copy is deferred to Workstream 4.

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

There is no separate `cta_clicked` event. `funnel_started` carries CTA origin through `cta_location`.

## Event meanings

- `page_viewed`: visitor viewed one landing-page variant.
- `funnel_started`: visitor entered the canonical funnel through a primary CTA.
- `recruiting_profile_completed`: visitor completed both segmentation questions.
- `product_experience_completed`: visitor completed the concise surface-specific product experience.
- `email_submitted`: visitor supplied the recruiting email address.
- `price_viewed`: exact monthly price rendered to the visitor.
- `checkout_started`: visitor clicked `Continue to payment` or equivalent.
- `payment_option_clicked`: visitor clicked a payment method after seeing the price and checkout total.
- `beta_spot_confirmed`: terminal cohort confirmation rendered successfully.

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
- Analysis follows the assigned surface from `page_viewed` regardless of later funnel completion.

### Secondary comparative metrics

1. `funnel_started` divided by `page_viewed`.
2. `email_submitted` divided by `page_viewed`.
3. `checkout_started` divided by `price_viewed`.

These explain the primary comparative result but do not replace it.

### Commercial-demand metrics

1. **Primary commercial-demand metric**
   - `payment_option_clicked` divided by `page_viewed`.
   - Plain meaning: of everyone who visited, what percentage clicked a payment option after seeing the product and price?

2. **Supporting commercial-demand metric**
   - `payment_option_clicked` divided by `checkout_started`.
   - Plain meaning: of everyone who reached checkout, what percentage clicked a payment option?

`beta_spot_confirmed` remains an instrumentation and completion check, not a commercial-demand metric.

### Diagnostic metrics

The following are diagnostics only:

- `recruiting_profile_completed` divided by `funnel_started`;
- `product_experience_completed` divided by `recruiting_profile_completed`;
- `email_submitted` divided by `product_experience_completed`;
- `price_viewed` divided by `email_submitted`;
- `checkout_started` divided by `price_viewed`;
- `beta_spot_confirmed` divided by `payment_option_clicked`.

Diagnostics identify abandonment or implementation problems. They must not independently determine the winning surface or whether the project deserves continued investment.

Diagnostic interactions may be tracked sparingly, including product-experience step views, privacy-detail opens, or integration-explanation opens. Do not track every hover, scroll, tab, card, or decorative interaction.

## Ratified read rules

### 1. Comparative preference versus absolute demand

1. Absolute commercial demand determines whether either proposition deserves further investment.
2. Relative surface preference determines which surface to pursue only after at least one proposition demonstrates credible absolute demand.
3. A surface does not become viable merely because it performs better than another weak surface.
4. If both surfaces show weak commercial demand, report `no validated surface`, even if one wins the primary comparative metric.
5. If both surfaces show credible commercial demand, use `checkout_started` divided by `page_viewed` to select the preferred surface.
6. If the primary comparative metric favors one surface but adequately sampled payment-choice behavior favors the other, commercial-demand behavior takes priority because it is closer to actual willingness to pay.
7. If payment-choice volume is too low to interpret reliably, it cannot overturn the primary comparative metric. The result remains provisional or ambiguous until low-sample rules are applied.

Governing principle: commercial demand decides whether to continue. Comparative performance decides what to continue with.

### 2. Early-funnel interest versus late-funnel commercial intent

1. Late-funnel behavior outranks early-funnel behavior. `checkout_started` and `payment_option_clicked` carry more decision weight than `funnel_started` or `email_submitted`.
2. Strong early interest with weak late intent means the proposition attracts attention but has not validated demand.
3. Possible explanations include weak sustained product value, price resistance, low trust, or checkout friction. Diagnostics may identify the likely cause but do not convert the result into commercial validation.
4. Weak early interest with strong late intent among an adequately sampled smaller group means the offer may be valuable but poorly communicated or narrowly targeted.
5. Early-funnel metrics cannot rescue weak commercial-demand metrics. High CTA clicks, email submissions, or demo completion do not justify meaningful backend investment when payment-choice behavior remains weak.
6. Adequately sampled late-funnel strength can justify another test despite weak early conversion, focused on acquisition, positioning, or top-of-funnel communication.
7. Diagnostic metrics explain disagreement but do not override this hierarchy.

Governing principle: early metrics show whether people explore. Late metrics show whether interest survives exposure to the product and price.

## Matched-comparison requirement

The spreadsheet and platform pages must be compared at every matched funnel stage, not only at `payment_option_clicked`.

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

1. Define numerical success, failure, and ambiguous-result thresholds.
2. Define low-sample treatment and minimum evidence requirements.
3. Decide whether a project-level kill condition is required before launch or remains deferred.
4. Select the exact monthly price before implementation or explicitly defer selection to Workstream 4 or 5.
5. Complete this specification and hand off durable constraints to Workstream 4.

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

## Exact next action

Define numerical interpretation thresholds one decision area at a time.

The next discussion should define the threshold framework for the primary comparative metric: what constitutes a meaningful surface difference versus an ambiguous result. Do not yet set absolute commercial-demand or low-sample thresholds.