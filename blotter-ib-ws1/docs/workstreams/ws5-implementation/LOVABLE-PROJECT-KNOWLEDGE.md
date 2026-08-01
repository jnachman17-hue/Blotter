# Blotter Foundation Project Knowledge

## Authority

GitHub's frozen WS5 packet is authoritative.

Use this order:

1. Jon's explicit later instruction.
2. `WS5-SPEC.md`.
3. The ratified WS5 build specification for the exact surface.
4. `WS4-SPEC.md` for page and funnel copy and experience rules not superseded by WS5.
5. `WS3-SPEC.md` for funnel architecture, price, events, properties, measurement, and reporting.
6. `WS2-SPEC.md` for product boundaries.
7. Asset README and asset.
8. Existing Lovable code and chat output.

Existing Lovable code is provisional scaffolding. Do not treat it as approved merely because it exists.

Do not invent or alter copy, product capability, claims, funnel steps, event definitions, asset authority, or page order. Raise real conflicts before editing.

## Project state

- Project: `Blotter Foundation`
- Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`
- Keep the project private and unpublished throughout WS5.
- All seven landing-page sections are ratified.
- Funnel copy and architecture are ratified in WS3 and WS4.
- Plan mode must precede code changes.
- Use phased implementation and explicit review checkpoints.

## Product boundary

Blotter is a recruiting-logistics layer for investment banking and adjacent high-finance recruiting.

It helps maintain a user's Google Sheets recruiting tracker from relevant Gmail and Calendar activity.

It is not:

- contact discovery or scraping;
- mass outreach;
- AI message writing;
- technical-preparation content;
- a learning platform;
- a jobs board.

The user chooses contacts and writes messages. Blotter maintains changing logistics.

## Landing-page structure

Exact order:

1. Hero.
2. Scale and consequence.
3. How Blotter works.
4. Outstanding Actions.
5. Preservation.
6. How Blotter uses your data.
7. General FAQ and final CTA.

Primary CTA label everywhere:

`See how Blotter works`

CTA origins:

- hero: `cta_location = hero`
- Section 4: `cta_location = actions`
- final: `cta_location = final`

All CTAs enter one shared funnel.

## Asset authority

Directional hero input:

- `hero-reference-v1.png`
- `blotter-sheets-reference-v1.html`

The hero build specification controls required changes. Do not copy superseded stale-sheet or engine treatments.

Formal exact assets:

- Section 2 Goldman Sachs email WebP;
- Section 3 mechanism AVIF;
- Section 4 and funnel Frame 3 Outstanding Actions PNG;
- Section 5 preservation HTML.

Formal exact assets must be reproduced without independent redesign. Component translation is allowed only when the rendered result remains visually equivalent.

Sections 6 and 7 require no external visual asset.

## Funnel

Required flow:

1. CTA entry.
2. Recruiting Question 1.
3. Recruiting Question 2.
4. Three-frame spreadsheet product experience.
5. Recruiting-email capture.
6. `$9.99 / month` price screen.
7. Purchase-summary screen.
8. Payment-choice buttons without card entry.
9. Fall 2026 terminal confirmation.

Rules:

- one stable spreadsheet across the three product frames;
- Frame 3 reuses the exact Outstanding Actions visual;
- no real OAuth;
- no real payment collection;
- no card fields;
- no extra screens;
- no price before email capture;
- no pre-terminal beta, demand-test, future-availability, or no-charge disclosure;
- Fall 2026 timing appears only after payment choice.

## Analytics

Build a provider-independent analytics adapter before selecting a vendor.

Exact events:

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

There is no separate `cta_clicked` event.

Required properties where applicable:

- `surface_variant = spreadsheet`
- `session_id`
- `visitor_id`
- `traffic_source`
- `campaign`
- `device_type`
- `cta_location`
- `recruiting_track`
- `recruiting_window`
- `price = 9.99`
- `billing_period = monthly`
- `payment_method`

Each milestone fires at most once per visitor. Back navigation and refresh must not duplicate events. CTA origin persists through the funnel. Email must never appear in analytics properties.

Do not select or connect an analytics vendor without approval.

## Lead storage

Do not provision a database during plan-only intake or the first visual-foundation phase.

After funnel structure is approved, propose the simplest reliable lead-storage implementation and schema.

Required lead fields:

- recruiting email;
- recruiting track;
- recruiting window;
- surface variant;
- CTA location;
- session or visitor identifier;
- timestamp;
- furthest funnel stage reached.

Email belongs in lead storage only. Records must support export and safe idempotent updates.

Do not enable a database without approval.

## Privacy and claims

Do not use:

- bank-grade security;
- industry-leading encryption;
- accredited provider;
- unverified SOC 2, CASA, Google verification, retention, deletion, or subprocessor claims;
- simulated OAuth screens.

No Google connection provider has been selected. Use provider-agnostic disclosure only.

Implementation truth must support claims about:

- unmatched-message processing boundaries;
- full-email-body non-retention;
- account deletion and connection revocation;
- Google scopes and consent-screen identity;
- unrelated Drive-file access;
- subprocessors and privacy policy.

Unverified claims may be laid out in a private preview but may not clear the public-release gate.

## Build discipline

1. Plan-only intake first. No code changes.
2. Audit existing code and produce a detailed phased plan.
3. Jon approves the plan.
4. Build the reusable Google Sheets primitive and foundation.
5. Stop for review.
6. Build each landing-page section in sequence with preview and diff review.
7. Build the canonical funnel and stop for functional review.
8. Add lead storage after approval.
9. Select and connect analytics after visual and funnel behavior are stable.
10. Complete responsive, accessibility, privacy, claim, lead, and event QA.
11. Keep the project private and unpublished.

Every implementation prompt must name the phase, controlling specification, attached assets, and stop condition.

Do not make one uncontrolled whole-site build run.

## Accessibility and responsive baseline

- desktop approval precedes responsive adaptation;
- no page-level horizontal scrolling;
- preserve readable spreadsheet and email treatments;
- `44px` minimum touch targets;
- visible keyboard focus;
- keyboard-operable accordions, forms, and funnel controls;
- semantic headings and labels;
- no hover-only meaning;
- reduced-motion support;
- sufficient contrast;
- logical reading order.

## Deployment rule

Do not publish or route the public domain during WS5.

Use the private Lovable preview for review and manual testing.

Public traffic waits for:

- matched platform-page readiness;
- verified lead storage and analytics;
- privacy and claim approval;
- final simultaneous-launch authorization.
