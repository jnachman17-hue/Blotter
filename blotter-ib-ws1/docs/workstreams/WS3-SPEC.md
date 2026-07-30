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

## Ratified interpretation thresholds

### 1. Primary comparative metric: meaningful surface difference

A surface is declared the comparative winner on `checkout_started` divided by `page_viewed` only when all three requirements are met:

1. The winning surface's rate is at least **25 percent higher on a relative basis** than the other surface.
2. The absolute difference is at least **2 percentage points**.
3. The estimated difference reaches at least **90 percent statistical confidence**.

Interpretation:

- All three conditions met: meaningful comparative winner.
- Directionally better but one or more conditions missed: ambiguous surface preference.
- Rates effectively equal: no comparative winner.
- Commercial demand weak for both: no validated surface, regardless of comparative difference, under the ratified decision hierarchy.

Rationale: statistical confidence alone can elevate a commercially trivial difference when traffic is large, while effect size alone can overread noise from a small sample. Both practical magnitude and statistical support are required.

### 2. Absolute commercial-demand thresholds

The governing metric is `payment_option_clicked` divided by `page_viewed`, using unique eligible visitors.

Ratified bands:

- **Strong commercial signal: 2.0 percent or higher.** Continue validation and treat the qualifying surface as a serious build candidate, subject to low-sample rules.
- **Credible commercial signal: 1.0 percent to below 2.0 percent.** Continue validation. The result is sufficiently strong to justify further investment in testing and may support a build decision when considered with sample quality and the full funnel.
- **Ambiguous commercial signal: 0.5 percent to below 1.0 percent.** Diagnose the funnel and run a bounded retest. Do not begin meaningful backend build solely from this result.
- **Weak commercial signal: below 0.5 percent.** No commercial validation, subject to low-sample rules. Strong early-funnel behavior cannot rescue this classification.

Zero payment-option clicks classify as weak demand unless the low-sample rules establish that qualified exposure was insufficient for judgment.

#### Benchmark derivation and limitations

These thresholds are Blotter-specific decision rules, not a claimed universal SaaS or fake-door industry standard. No credible published dataset was found for Blotter's exact funnel: landing-page visitor, concise product experience, email submission, price exposure, checkout progression, and payment-option click without card entry or payment.

The thresholds were triangulated from the closest available external comparables:

1. **SaaS landing-page conversion:** Unbounce's 2024 Conversion Benchmark Report analyzed more than 464 million unique visitors, 57 million conversions, and more than 41,000 landing pages. It reports a median SaaS landing-page conversion rate of **3.8 percent**. This is an upper-context benchmark only because the underlying conversion can include lower-commitment actions such as lead submissions, registrations, downloads, or demo requests rather than purchase intent.
2. **Website visitor to paying SaaS customer:** ChartMogul and ProductLed's 2026 survey of 200 B2B software products reports representative funnels per 1,000 visitors: approximately 5 paying customers for freemium, 4 for a free trial, 6 for an ungated freemium experience, and 11 for a credit-card-required trial. These imply approximate visitor-to-paid rates of **0.5 percent, 0.4 percent, 0.6 percent, and 1.1 percent**, respectively. This range is the closest economic comparable because it ends in real payment, although the product categories, traffic mixes, and time-to-conversion differ from Blotter.
3. **Checkout attrition context:** Baymard reports an average ecommerce cart-abandonment rate near **70 percent** across aggregated studies. This confirms that meaningful attrition typically remains after purchase interest is expressed, but ecommerce checkout is not directly comparable to Blotter and was not used to set the exact bands.

#### Why the Blotter thresholds are conservative

Blotter's `payment_option_clicked` event is materially easier than becoming a real paying customer:

- no card number is entered;
- no money is charged or put at risk;
- no trial commitment begins;
- the visitor does not receive an immediately usable product;
- the event records a click on a simulated purchase door rather than a completed transaction.

Because the action has less friction and lower commitment than the real visitor-to-paid outcomes in the ChartMogul data, merely matching approximately 0.4 to 0.6 percent should not be treated as validation. The benchmark therefore applies an intentional credibility discount:

- below 0.5 percent remains weak even though it overlaps the lower end of real visitor-to-paid SaaS performance;
- 0.5 to below 1.0 percent remains ambiguous because the Blotter action is easier than payment;
- 1.0 to below 2.0 percent is treated as credible because it reaches or exceeds the upper end of most adjacent real-payment funnels;
- 2.0 percent or higher is treated as strong because it is roughly twice the upper end of the adjacent visitor-to-paid range while still remaining below the broader 3.8 percent median SaaS landing-page conversion benchmark.

Traffic source, audience warmth, device, campaign, and recruiting window may materially affect observed rates. Results must therefore be reported overall and segmented diagnostically by traffic source, without allowing a warm channel to stand in for general cold-market demand.

External reference basis, verified July 30, 2026:

- Unbounce, `Average SaaS conversion rate benchmark report` and its Conversion Benchmark Report methodology.
- ChartMogul and ProductLed, `The SaaS Conversion Report: A new look at free-to-paid conversion`, 2026 survey of 200 B2B software products.
- Baymard Institute, cart and checkout abandonment benchmark research.

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

1. Define low-sample treatment and minimum evidence requirements.
2. Decide whether a project-level kill condition is required before launch or remains deferred.
3. Select the exact monthly price before implementation or explicitly defer selection to Workstream 4 or 5.
4. Complete this specification and hand off durable constraints to Workstream 4.

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

Define low-sample treatment and minimum evidence requirements.

The next discussion should determine when the comparative and commercial-demand thresholds are sufficiently sampled to support a decision, and how results must be classified when they are not. Do not yet decide the project-level kill condition or exact monthly price.