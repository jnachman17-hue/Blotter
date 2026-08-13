# Workstream 3 Specification

Date last updated: **August 12, 2026**
Status: Complete, with three August 12, 2026 amendments recorded in place — the
scope amendment below, `waitlist_joined` as a tenth event, and the withdrawal of
the test-integrity rule.
Workstream: Conversion and measurement design

## Purpose

This is the permanent cumulative record of Workstream 3. It defines the matched CTA funnel, lead capture, price treatment, analytics architecture, metric hierarchy, read rules, thresholds, sample requirements, reporting rules, and downstream constraints for the spreadsheet-versus-platform validation test.

`CURRENT-HANDOFF.md` is temporary resumption context. This specification remains authoritative after future handoffs are overwritten.

## Scope and boundary

**AMENDED August 12, 2026: the platform page is scrapped and round one has one
arm.** The comparison below is withdrawn. **Everything else in this
specification stands** — the funnel, the event set, the properties, the metric
hierarchy, the read rules and the thresholds. They were written to make two
pages comparable and they are also what makes one page's numbers mean anything.
Do not relax them because the second arm is gone.

*Superseded.* Round one compares one macro variable:

- spreadsheet-native surface;
- standalone platform surface.

It is not primarily a price, feature, headline, plan, or copy test. Both pages must use the same canonical funnel, event set, price, measurement rules, and materially comparable interaction burden.

Workstream 3 does not define final page narrative, final copy, detailed interface design, backend logic, OAuth architecture, or Lovable implementation.

## Signal hierarchy

The funnel uses graded intent rather than one binary conversion.

1. Landing-page and CTA behavior measure proposition-level interest.
2. Recruiting-profile and product-experience completion measure sustained exploration.
3. Email submission measures identified adoption intent.
4. Price exposure establishes economic qualification.
5. `checkout_started` measures price-qualified checkout intent.
6. `payment_option_clicked` is the strongest commercial-demand signal.
7. `beta_spot_confirmed` is an instrumentation and terminal-flow check, not a stronger intent event.

## Canonical funnel

Every primary CTA enters the same funnel. CTA origin is stored through `cta_location`.

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. One product at one monthly price inside the funnel.
6. `Continue to payment` or equivalent.
7. Separate short checkout screen with payment-choice buttons.
8. Fall 2026 limited first-cohort confirmation.

## Recruiting configuration

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

### Question 2

Recruiting window options:

1. Summer 2028
2. Full-time
3. Other

School and current year are excluded.

## Product experience

One product experience occurs before email capture.

Confirmed constraints:

- approximately 15 to 20 seconds maximum;
- click-to-progress is the working model;
- animation is not required;
- no unnecessary tutorial burden;
- the surface must be shown clearly enough to support an informed continuation decision;
- Gmail, Google Sheets, and Calendar must be understandable as the engine maintaining live recruiting state;
- ~~spreadsheet and platform experiences must remain comparable in duration and interaction burden.~~ **MOOT August 12, 2026** — no platform experience exists.

The earlier concept of a teaser before email and a second experience after email is rejected.

Exact frames, clicks, demo states, motion, and the relationship to the landing-page hero are deferred to Workstream 4.

## Email capture

The mandatory round-one funnel does not use actual or simulated OAuth.

Approved conceptual direction:

`Continue to your recruiting workspace`

`Enter the email address where you conduct recruiting.`

The step must not request a password, imitate Google authentication, use phishing-adjacent design, or imply that inbox access has already been granted.

The visitor email belongs in the lead record and should not be copied into general analytics properties.

## Price treatment

Round one uses one product at **$9.99 per month**.

Confirmed rules:

- price appears only inside the funnel;
- price first appears after the product experience and email capture;
- both variants show the same price at the same stage;
- monthly billing only;
- cancel anytime;
- no annual plan;
- no introductory discount;
- no plan-selection step;
- no price A/B test;
- price is not the round-one test variable.

## Checkout mechanics

After price exposure, the visitor selects `Continue to payment` or equivalent and reaches a separate short checkout screen.

The checkout should show:

- Blotter;
- $9.99 monthly price;
- monthly billing cadence;
- amount due;
- concise product descriptor;
- `Pay with card`;
- Apple Pay where supported.

`Pay with card` is always available. Device-dependent options appear only where supported. Either payment-choice click triggers the same canonical event, with payment method stored separately.

No card-entry form is shown. No credentials or money are collected.

## Terminal state

After a payment-choice click, the visitor is told:

- Blotter is planned for Fall 2026;
- they secured a place in the limited first beta cohort;
- the cohort is approximately 300 people;
- confirmation and future access will use the recruiting email already provided.

Jon will maintain and honor the cohort list. Exact terminal copy is deferred to Workstream 4.

## Canonical analytics events

**AMENDED August 12, 2026: there are ten, not nine.** `waitlist_joined` was
added with Jon's approval when the waitlist branch shipped. This amendment was
recorded in `04-decision-log.md`, `07-infrastructure-runbook.md`,
`02-strategy-and-test.md` and `lib/analytics.ts` on the day, and **not here**,
which left the governing specification stating nine for the whole of session 9.
Corrected rather than re-decided.

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`
10. `waitlist_joined` — **added August 12, 2026**

There is no separate `cta_clicked` event. `funnel_started` carries `cta_location`.

**What justified amending a frozen contract.** The freeze protects the
comparability of the nine, and the tenth alters none of them.
`checkout_started / page_viewed` keeps both its terms, so no historical figure
changes meaning. Without it the waitlist branch is invisible in PostHog and
recoverable only from Supabase.

**It is not a funnel step.** A PostHog funnel is an ordered sequence;
`waitlist_joined` and `checkout_started` are mutually exclusive branches off
`price_viewed` and a visitor does exactly one. Inserting it into the canonical
funnel drives every later step to zero and destroys the primary metric. It lives
in its own insight, `price_viewed -> waitlist_joined`, read beside the canonical
funnel. `07-infrastructure-runbook.md` is the operational authority on this.

**It has no read rule and no threshold, and that is a known gap**, carried in
`06-assumptions-and-open-questions.md` with a revisit trigger. The metric
hierarchy and interpretation bands below were written against the nine and have
not been extended. Nothing here should be read as implying a rate at which a
waitlist result means anything.

## Event meanings

- `page_viewed`: an eligible visitor viewed one landing-page variant.
- `funnel_started`: the visitor entered the canonical funnel.
- `recruiting_profile_completed`: both segmentation questions were completed.
- `product_experience_completed`: the concise surface-specific experience was completed.
- `email_submitted`: the recruiting email was supplied.
- `price_viewed`: the exact monthly price rendered.
- `checkout_started`: the visitor chose to continue toward payment.
- `payment_option_clicked`: the visitor clicked a payment method after seeing price and checkout total.
- `beta_spot_confirmed`: the terminal cohort confirmation rendered successfully.
- `waitlist_joined`: the visitor declined the price and took the subordinate
  waitlist outcome instead. **Added August 12, 2026.** It is a branch off
  `price_viewed`, never a step between it and `checkout_started`.

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

The event definitions and properties must remain identical across variants.

## Ratified metric hierarchy

All rates use unique eligible visitors rather than raw event counts. A visitor counts no more than once per surface for each metric.

### Primary comparative metric

**Checkout-start rate across all eligible visitors**

- Numerator: unique visitors reaching `checkout_started`.
- Denominator: unique eligible visitors reaching `page_viewed`.
- Calculated separately by surface.
- Determines relative surface preference.

### Secondary comparative metrics

1. `funnel_started / page_viewed`
2. `email_submitted / page_viewed`
3. `checkout_started / price_viewed`

These explain the primary result but do not replace it.

### Commercial-demand metrics

Primary:

`payment_option_clicked / page_viewed`

Plain meaning: of all eligible page visitors, what percentage clicked a payment option after seeing the product and price?

Supporting:

`payment_option_clicked / checkout_started`

Plain meaning: of visitors who reached checkout, what percentage clicked a payment option?

### Diagnostic metrics

- `recruiting_profile_completed / funnel_started`
- `product_experience_completed / recruiting_profile_completed`
- `email_submitted / product_experience_completed`
- `price_viewed / email_submitted`
- `checkout_started / price_viewed`
- `beta_spot_confirmed / payment_option_clicked`

Diagnostics explain abandonment and instrumentation issues. They do not independently determine surface selection or continued investment.

## Ratified read rules

### Comparative preference versus absolute demand

- Absolute commercial demand determines whether either proposition deserves further investment.
- Relative surface preference determines what to pursue only after at least one proposition demonstrates credible absolute demand.
- A relative winner among two weak surfaces is not a validated surface.
- If both surfaces show weak commercial demand, report `no validated surface` even if one wins the comparative metric.
- If both show credible commercial demand, use the primary comparative metric to select the preferred surface.
- If adequately sampled payment-choice behavior conflicts with the primary comparative metric, commercial-demand behavior takes priority.
- If payment-choice volume is insufficient, it cannot overturn the comparative result.

Governing principle: commercial demand decides whether to continue. Comparative performance decides what to continue with.

### Early-funnel versus late-funnel disagreement

- Late-funnel behavior outranks early-funnel behavior.
- Strong early interest with weak late intent means attention was generated but demand was not validated.
- Weak early interest with adequately sampled strong late intent may indicate a valuable but poorly communicated or narrowly targeted offer.
- Early-funnel performance cannot rescue weak commercial demand.
- Strong late-funnel evidence may justify another positioning or acquisition test despite weak early conversion.
- Diagnostics explain disagreement but do not override the hierarchy.

## Interpretation thresholds

### Meaningful comparative difference

A surface is declared the comparative winner only when all three conditions are met:

1. At least 25 percent higher on a relative basis.
2. At least 2 percentage points higher on an absolute basis.
3. At least 90 percent statistical confidence in the estimated difference.

Directionally better results that miss any requirement are ambiguous. Weak commercial demand for both means no validated surface regardless of comparative difference.

### Absolute commercial-demand bands

For `payment_option_clicked / page_viewed`:

- **2.0 percent or higher:** strong commercial signal.
- **1.0 percent to below 2.0 percent:** credible commercial signal.
- **0.5 percent to below 1.0 percent:** ambiguous commercial signal.
- **Below 0.5 percent:** weak commercial signal.

These are Blotter-specific decision rules, not a universal SaaS standard.

## Benchmark derivation

No credible published dataset was found for Blotter's exact fake-door funnel. The thresholds were triangulated from adjacent evidence:

1. Unbounce's 2024 Conversion Benchmark Report analyzed more than 464 million visitors, 57 million conversions, and more than 41,000 landing pages. It reports a 3.8 percent median SaaS landing-page conversion rate. This is broader and often lower-commitment than Blotter's payment-choice event.
2. ChartMogul and ProductLed's 2026 survey of 200 B2B software products implies approximate visitor-to-paid rates of 0.4 to 1.1 percent across representative freemium and trial models. This is the closest economic comparable because it ends in real payment.
3. Baymard's approximately 70 percent ecommerce cart-abandonment benchmark provides checkout-attrition context but was not used to set the exact bands.

The thresholds intentionally err conservatively because `payment_option_clicked` requires no card entry, charge, financial risk, trial commitment, or immediately usable product. Matching the lower end of real visitor-to-paid conversion is therefore not enough to validate demand.

Traffic source, audience warmth, device, campaign, and recruiting window may affect rates. Report overall results and inspect these segments diagnostically without allowing warm traffic to stand in for cold-market demand.

## Low-sample treatment

### Comparative result

A comparative winner cannot be declared until:

- each surface has at least 300 eligible visitors;
- the 25 percent relative difference requirement is met;
- the 2-percentage-point absolute difference requirement is met;
- the result reaches at least 90 percent statistical confidence.

Below 300 visitors per surface, results are directional only.

### Positive commercial-demand result

A surface cannot receive a final credible or strong classification until:

- it has at least 500 eligible visitors; and
- at least 10 unique visitors trigger `payment_option_clicked`.

Until both are met, a credible or strong observed rate is `promising but insufficiently sampled`.

### Weak-demand result

A final weak classification requires:

- at least 600 eligible visitors on the surface; and
- statistical support that the true rate is unlikely to reach the 1 percent credible-demand threshold.

An early zero-click result is insufficient evidence, not failure.

### Underpowered outcomes

When the evidence requirement is unmet, classify the result as `insufficient sample, no decision`. Do not force an underpowered test into success, failure, or surface selection.

## No project-level kill condition

Workstream 3 sets no permanent or bounded project kill condition.

Weak commercial demand means the current tested proposition is not validated for meaningful backend investment. Blotter may iterate and test again. Each retest should still have a specific hypothesis, precommitted measurement rules, and a defined traffic or spend boundary.

## Test-integrity rule — WITHDRAWN August 12, 2026

> **Jon's ruling.** *"Side note I'm abandoning the test integrity freeze. We can
> change page if needed."* And separately, on the CTA label: *"We might revisit
> CTA label later."*
>
> **The page may change during the measurement period.** The clause below
> requiring a material change to open a new labeled test iteration, and
> forbidding the blending of its data with the prior period, is withdrawn with
> the rest of the rule.
>
> **`TEST_ITERATION` in `lib/analytics.ts` therefore stays at `r1`.** Its own
> comment instructs a bump on a material change; a bump re-fires every milestone
> for returning visitors and splits the dataset, which is exactly the
> non-blending behaviour this ruling withdraws. The code comment is now the
> stale one, and says so in place.
>
> **What this ruling does not touch, because it lives in another section.** The
> *Reporting requirements* below are unaffected and still require exact test
> dates, instrumentation incidents and material traffic-quality concerns in
> every readout. **A material page change still has to be recorded with its
> date** — not as a gate on making it, but because a rate cannot be attributed
> to a page otherwise. A dated changelog serves that requirement.

*Superseded.* During a measurement period, freeze:

- price;
- funnel sequence;
- core page proposition;
- payment-choice mechanics;
- event definitions;
- traffic-allocation methodology.

Instrumentation failures may be repaired. A material page, funnel, price, or proposition change creates a new labeled test iteration and its data must not be blended indiscriminately with the prior period.

## Reporting requirements

Every test readout must include:

- overall results by surface;
- visitor counts and event counts, not percentages alone;
- results by traffic source as diagnostics;
- confidence intervals or an equivalent uncertainty measure;
- exact test dates;
- exact tested price;
- instrumentation incidents;
- material traffic-quality concerns.

Traffic-source segments explain the result but do not replace the overall precommitted analysis unless a channel is demonstrably invalid or materially mismatched.

## Downstream requirements for Workstream 4

Workstream 4 must preserve:

- the canonical funnel sequence;
- one product experience before email capture;
- the 15 to 20 second maximum experience burden;
- ~~comparable spreadsheet and platform interaction burden;~~ **MOOT August 12, 2026**
- transparent email capture without simulated OAuth;
- Gmail, Sheets, and Calendar as the visible product engine;
- price only inside the funnel;
- $9.99 per month on both surfaces;
- payment-choice click as the strongest commercial action;
- no card-entry or payment collection;
- the real Fall 2026 cohort commitment;
- identical canonical analytics events and properties;
- exact CTA origin tracking through `cta_location`.

Workstream 4 owns final page narrative, copy, section order, hero and demo composition, exact product-experience frames, CTA wording and placement, trust and privacy content, checkout copy, and terminal-state copy.

## Rejected or superseded directions

- Mandatory early Gmail OAuth: rejected.
- Simulated Google authentication: rejected.
- Teaser before email followed by a second demo after email: rejected.
- Price on the main landing page: rejected for round one.
- Multiple plans or price A/B testing: rejected for round one.
- Card-entry form or payment collection: rejected.
- Separate `cta_clicked` analytics event: rejected.
- Permanent or bounded project kill condition: rejected.

## Workstream completion

Workstream 3 is complete. The next active workstream is Workstream 4: spreadsheet landing-page content and experience design.
