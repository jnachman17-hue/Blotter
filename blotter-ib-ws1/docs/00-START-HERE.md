# Blotter IB - Start Here

Date last updated: August 1, 2026

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Confirmed workstream sequence

1. Workstream 1: continuity and source-of-truth setup. Complete.
2. Workstream 2: spreadsheet-native proposition. Complete.
3. Workstream 3: conversion and measurement design. Complete.
4. Workstream 4: spreadsheet landing-page content and experience design. Complete.
5. Workstream 5: build specifications, visual references, Lovable implementation, instrumentation, and private verification. Active.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.
9. Use market evidence to continue, revise, retest, or stop investment.
10. Do not build meaningful backend functionality until market evidence guides it.

## Current phase

The seven-section spreadsheet landing page is fully ratified and the pre-Lovable implementation packet is frozen.

The project is ready for governed Lovable plan-only intake.

Do not begin with a build prompt. The next chat must first load the project knowledge, upload the frozen packet and assets, send a plan-only message, review the returned plan with Jon, and obtain approval before code changes.

## Current Lovable project

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Workspace ID: `c31c8d1d4fa00d0fc8fc`  
Visibility: Private  
Published: No  
Current foundation commit at packet freeze: `fa7af41199847b36ab8a14b55a767b93a8955968`

The current Lovable code is preliminary scaffolding. It is not approved page implementation and may be retained, rewritten, or removed only through the approved implementation plan.

## Ratified landing-page surfaces

1. Hero — `docs/workstreams/ws5-build-specs/01-HERO.md`
2. Section 2 Scale and Consequence — `02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
3. Section 3 How Blotter Works — `03-SECTION-3-HOW-BLOTTER-WORKS.md`
4. Section 4 Outstanding Actions and funnel Frame 3 — `04-SECTION-4-OUTSTANDING-ACTIONS.md`
5. Section 5 Preservation — `05-SECTION-5-PRESERVATION.md`
6. Section 6 Data and Privacy — `06-SECTION-6-DATA-AND-PRIVACY.md`
7. Section 7 FAQ and Final CTA — `07-SECTION-7-FAQ-AND-FINAL-CTA.md`

All seven are ratified and binding.

## Frozen visual packet

### Directional hero input

- `docs/workstreams/ws5-assets/hero/hero-reference-v1.png`
- `docs/workstreams/ws5-assets/source/blotter-sheets-reference-v1.html`

### Formal exact assets

- Section 2: `docs/workstreams/ws5-assets/section-2/goldman-sachs-rejection-email-exact-v2.html`
- Section 2 supplemental HTML: `section-2/goldman-sachs-rejection-email-exact-v1.html`
- Section 3: `docs/workstreams/ws5-assets/section-3/how-blotter-works-exact-v1.avif`
- Section 4 and funnel Frame 3: `docs/workstreams/ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`
- Section 5: `docs/workstreams/ws5-assets/section-5/preservation-exact-v1.html`

### No external asset required

- Section 6
- Section 7
- conventional funnel screens
- funnel Frames 1 and 2 unless the approved Lovable plan identifies a genuine contradiction

The visual-reference scope is frozen. Do not restart the unified storyboard process.

## Funnel and measurement status

The funnel is already ratified in WS3 and WS4.

Required flow:

1. CTA entry.
2. Two recruiting questions.
3. Three-frame spreadsheet product experience.
4. Recruiting-email capture.
5. `$9.99 / month` price screen.
6. Purchase-summary screen.
7. Payment-choice buttons without card entry.
8. Fall 2026 terminal confirmation.

The three page CTAs use the same funnel and store:

- `hero`
- `actions`
- `final`

as `cta_location`.

The exact event set has nine events:

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

## Analytics and lead-storage posture

Analytics is designed during the build but the vendor is not selected yet.

The Lovable foundation should include a provider-independent analytics adapter with the exact event names and properties. The analytics vendor is selected and connected only after the page and funnel behavior are stable and before private verification.

Lead storage is added after the funnel structure and email-capture behavior are approved. The simplest reliable implementation may use Lovable's Supabase-backed database, but database provisioning and schema details require approval before activation.

Email belongs in lead storage only and must never be sent as a general analytics property.

## Privacy and provider posture

No Google connection provider has been selected.

Section 6 uses provider-agnostic language. Do not claim a provider name, accreditation, Google verification, SOC 2, CASA, retention practice, deletion behavior, or subprocessor fact until verified.

Claims about message routing, non-retention of full email bodies, deletion, connection revocation, scopes, unrelated Drive files, and subprocessors must match implementation truth before public release.

## Exact Lovable process

The end-to-end operating guide is:

`docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`

Permanent Lovable project knowledge is:

`docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

In human terms:

1. confirm the private project has not changed;
2. load the permanent project rules;
3. upload the packet and visual assets because Lovable cannot be assumed to access the private GitHub repository;
4. ask Lovable for a plan only;
5. review and approve the plan;
6. build the shared foundation and spreadsheet primitive;
7. review it;
8. build each page section in checkpoints;
9. build and review the funnel;
10. add lead storage;
11. select and connect analytics;
12. complete responsive, accessibility, privacy, claim, lead, and event QA;
13. keep the project private and unpublished;
14. do not launch traffic until the platform page and final matched test are ready.

## Exact next action

Open a new chat and begin the Lovable plan-only intake.

Required first reading:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`
4. `docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`
5. `docs/workstreams/WS5-SPEC.md`
6. `docs/workstreams/ws5-build-specs/README.md`
7. `docs/workstreams/ws5-assets/README.md`

Then:

1. reconfirm the Lovable project state;
2. read existing project knowledge before replacing it;
3. set the approved project knowledge;
4. fetch and upload the frozen packet and assets;
5. send the exact plan-only intake message;
6. bring the returned plan to Jon for review;
7. make no code changes before approval.

## Durable specifications

- `docs/workstreams/WS2-SPEC.md`: spreadsheet-native proposition.
- `docs/workstreams/WS3-SPEC.md`: funnel, conversion, analytics, and measurement.
- `docs/workstreams/WS4-SPEC.md`: complete page and funnel content and experience.
- `docs/workstreams/WS5-SPEC.md`: active implementation governor.
- `docs/workstreams/ws5-build-specs/README.md`: frozen surface-specification index.
- `docs/workstreams/ws5-assets/README.md`: frozen asset and no-asset authority index.
- `docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`: exact implementation process.
- `docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`: permanent Lovable agent rules.

`CURRENT-HANDOFF.md` contains immediate resumption context only.

## Non-negotiable constraints

- Jon's explicit instructions are highest authority.
- GitHub is the durable source of truth.
- New substantive decisions require Jon ratification and GitHub documentation.
- Existing Lovable code is provisional until approved against the frozen packet.
- Use plan mode before code.
- Use checkpointed implementation rather than one whole-site build prompt.
- Do not implement real Gmail, Calendar, or Sheets integrations during WS5.
- Do not implement real OAuth.
- Do not collect payment or card details.
- Do not publish or route public traffic during WS5.
- Do not expose price or Fall 2026 timing before their ratified funnel stages.
- Verify analytics by hand before traffic.
