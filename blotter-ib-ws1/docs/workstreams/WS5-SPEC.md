# Workstream 5 Specification

> **Executor change, ruled by Jon August 4, 2026.** The landing page is built in this
> repository with Next.js, not in Lovable. The Lovable project `Blotter Foundation` and its
> commits are abandoned and no code was ported.
>
> Everything in this file about scope, sequence, gates, the build-specification inventory, the
> asset inventory, the nine-event contract, lead storage, and the deployment rule remains
> binding and unchanged. Only the executor changed. Where this file says "Lovable", read "the
> in-repo build".
>
> Three passages are stale as written and are superseded by `CURRENT-HANDOFF.md`: the
> "Lovable project state" section, the "Frozen Lovable operating handoff" section including the
> private-repository file-upload protocol, and the "Exact Lovable intake sequence" and
> "Exact next action" sections, which describe a plan-only intake that has been replaced by
> stage checkpoints carrying the same discipline.

Date created: July 30, 2026  
Date last updated: August 10, 2026  
Status: Active - building in-repo. Stages 1 to 9 complete. **The site is live
and public at `blotterib.com`**, with lead storage and analytics connected. Only
responsive and accessibility remain before WS5's completion gate.  
Workstream: Spreadsheet-page build specifications, visual references, Lovable implementation, instrumentation, and private verification

## Purpose

This is the cumulative canonical governor for Workstream 5. It must remain sufficient for a new chat to understand:

- the current implementation state;
- which build specifications and assets are authoritative;
- what is resolved, deferred, or still open;
- the Lovable plan-and-build sequence;
- lead-storage and analytics requirements;
- responsive, accessibility, privacy, claim, and verification gates;
- the exact next action.

`CURRENT-HANDOFF.md` contains immediate resumption context. This file is the durable WS5 record.

## Objective

Use the frozen seven-section landing-page packet and ratified funnel system to build the complete spreadsheet landing page and canonical funnel in the existing private Lovable project, store leads, wire the exact WS3 analytics contract, and verify the private implementation before acquisition work or platform-page implementation.

WS5 does not publicly launch traffic, build the standalone platform page, implement production Gmail or Calendar integrations, run real OAuth, or collect payment.

## Documentation architecture

WS5 uses four complementary record types:

1. `WS5-SPEC.md` governs scope, sequence, gates, and current state.
2. `docs/workstreams/ws5-build-specs/` contains binding surface-level implementation specifications.
3. `docs/workstreams/ws5-assets/` contains formal exact assets, directional references, and explicit no-asset decisions.
4. `docs/workstreams/ws5-implementation/` contains the Lovable plan-and-build operating handoff and permanent project knowledge.

## Source hierarchy

1. Jon's explicit later instruction.
2. This `WS5-SPEC.md` for workstream scope, sequence, gates, and documentation rules.
3. The ratified build specification for the exact surface.
4. `WS4-SPEC.md` for page and funnel copy, section order, communication jobs, and experience rules not superseded by WS5.
5. `WS3-SPEC.md` for funnel architecture, price, event names, properties, measurement, read rules, and reporting.
6. `WS2-SPEC.md` for product boundaries.
7. `05-working-agreement.md` for operating rules.
8. Asset README and asset.
9. Existing Lovable code, plan, and generated output.

GitHub is the durable source of truth. Existing Lovable code is provisional until approved against the frozen packet.

Any substantive proposed deviation must be brought to Jon, ratified, and documented in GitHub before implementation continues.

## Current state as of August 1, 2026

- Workstreams 1 through 4 are complete.
- WS5 is active.
- All seven landing-page sections are ratified.
- The complete build-specification packet is frozen.
- The external visual-reference scope is frozen.
- The canonical funnel copy, architecture, price, payment-choice simulation, terminal state, event set, and read rules are already ratified in WS3 and WS4.
- No additional pre-Lovable unified storyboard or funnel Frame 1-to-Frame 2 asset is required.
- The exact next action is Lovable plan-only intake.
- The Lovable project remains private and unpublished.
- No analytics vendor, lead database, Google connection provider, real integration, or public deployment is complete.

## Lovable project state

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Workspace ID: `c31c8d1d4fa00d0fc8fc`  
Visibility: Private  
Published: No  
Status at packet freeze: Ready  
Current foundation commit at packet freeze: `fa7af41199847b36ab8a14b55a767b93a8955968`

The project contains a preliminary shell, navigation, CTA component, reserved visual placeholder, accordion primitives, and standard UI components. This is not approved page implementation.

Project knowledge was empty at packet freeze. The next chat must recheck and then install the frozen project knowledge from:

`docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

## Governing build scope

### Build during WS5

- complete seven-section spreadsheet landing page;
- three CTA placements entering one shared funnel;
- two recruiting questions;
- three-frame spreadsheet product experience;
- recruiting-email capture;
- `$9.99 / month` price screen;
- purchase-summary screen;
- payment-choice buttons without card entry;
- Fall 2026 terminal confirmation;
- responsive desktop, tablet, and mobile layouts after desktop approval;
- exact nine-event analytics implementation;
- lead storage and export;
- private preview and manual verification.

### Do not build during WS5

- production Gmail, Calendar, or Google Sheets integrations;
- real OAuth;
- real card entry or payment collection;
- meaningful backend product functionality beyond validation lead and analytics infrastructure;
- standalone platform landing page;
- public acquisition traffic;
- public production deployment.

## Build-specification inventory

All seven files are ratified:

1. `ws5-build-specs/01-HERO.md`
2. `ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
3. `ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
4. `ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`
5. `ws5-build-specs/05-SECTION-5-PRESERVATION.md`
6. `ws5-build-specs/06-SECTION-6-DATA-AND-PRIVACY.md`
7. `ws5-build-specs/07-SECTION-7-FAQ-AND-FINAL-CTA.md`

The build-specification index is frozen for Lovable intake.

## Visual-asset inventory

Detailed authority:

`ws5-assets/README.md`

### Directional hero input

- `ws5-assets/hero/hero-reference-v1.png`
- `ws5-assets/source/blotter-sheets-reference-v1.html`

### Formal exact Section 2 input

- `ws5-assets/section-2/goldman-sachs-rejection-email-exact-v2.html`
- supplemental HTML: `ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.html`

### Formal exact Section 3 input

- `ws5-assets/section-3/how-blotter-works-exact-v1.avif`

### Formal exact Section 4 and funnel Frame 3 input

- `ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`

### Formal exact Section 5 input

- `ws5-assets/section-5/preservation-exact-v1.html`

### No external asset required

- Section 6;
- Section 7;
- conventional funnel question, email, price, purchase-summary, payment-choice, and terminal screens;
- funnel Frames 1 and 2 unless the approved Lovable plan identifies a real contradiction.

The former unified storyboard is inactive and must not be restarted.

## Ratified landing-page status

### Hero

Uses one current Google Sheets-style tracker, three exact activity cues, direct cue-to-row mapping, shared maintained-zone tint, stronger emphasis for cue-linked rows, and below-sheet ownership labels. Excludes the stale rear sheet and explicit engine.

### Section 2

Uses 628 recruiting emails, 68 coffee chats, 19 applications, and 30 interview rounds; subordinate approximately 60-hour administration estimate and methodology; exact supporting copy; one exact illustrative Goldman Sachs email asset with two external annotations; exact closing copy; and no CTA.

### Section 3

Uses the exact Gmail and Calendar to Blotter to Google Sheets mechanism asset, external stage labels, boundary line, three product-boundary badges, closing line, and no CTA. The provisional asset mark is not the global logo.

### Section 4 and funnel Frame 3

Uses one formal exact Outstanding Actions visual. The page CTA enters the shared funnel with `cta_location = actions`. Frame 3 reuses the same visual and must not be independently redesigned.

### Section 5

Uses one exact preservation asset with Email and LinkedIn inserted between Firm and Status, a divider between LinkedIn and Status, exact five-contact data, blue `Here` links, no eyebrow, and no CTA.

### Section 6

Uses a calm document-style disclosure system with the exact title, candid claim, four processing steps, permissions matrix, broad Google-permission notice, retention copy, nine commitments, deletion statement, provider-agnostic disclosure, seven-question privacy FAQ, and privacy-policy link. It has no CTA or external visual asset.

Provider wording remains deliberately vague until selection. Public claims remain subject to implementation-truth verification.

### Section 7

Uses the exact five-question product FAQ and a separate final closing panel. All questions are closed initially; only one answer may be open at a time; accordion behavior is keyboard accessible. The final CTA enters the shared funnel with `cta_location = final`. No external visual asset is required.

## Funnel status

WS3 and WS4 already govern the funnel.

Required sequence:

1. CTA entry and origin capture.
2. Recruiting Question 1.
3. Recruiting Question 2.
4. Three-frame spreadsheet product experience.
5. Recruiting-email capture.
6. `$9.99 / month` price screen.
7. Purchase-summary screen.
8. Payment-choice buttons without card entry.
9. Fall 2026 terminal confirmation.

Rules:

- hero, actions, and final CTAs enter one shared funnel;
- CTA origin persists;
- one stable sheet is used across the three product frames;
- Frame 3 reuses the exact Outstanding Actions visual;
- no real OAuth;
- no real payment collection;
- no card fields;
- no extra screens;
- no price before email capture;
- no pre-terminal beta, demand-test, future-availability, or no-charge disclosure;
- Fall 2026 timing appears only after payment choice.

## Frozen Lovable operating handoff

Exact process:

`docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`

Permanent project knowledge:

`docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

Because GitHub is private, the next chat must fetch the required files, upload them through Lovable's upload workflow, and attach the returned file IDs. Do not assume Lovable can open private repository paths.

## Exact Lovable intake sequence

### Phase 0: Verify state

Confirm:

- project ID;
- visibility;
- unpublished state;
- latest commit;
- project knowledge;
- no unreviewed changes.

Do not deploy.

### Phase 1: Install project knowledge

Read current project knowledge, then set it to the frozen knowledge file.

### Phase 2: Upload packet and assets

Upload:

- WS3, WS4, and WS5;
- implementation handoff;
- project knowledge;
- build-spec index;
- all seven build specifications;
- asset index;
- all visual files.

### Phase 3: Plan-only message

Use Lovable plan mode. Make no code changes.

The plan must:

- audit existing code;
- map all seven sections;
- map the full funnel;
- define reusable components;
- explain exact asset handling;
- define the stable three-frame spreadsheet experience;
- map all nine events to exact transitions;
- propose provider-independent analytics architecture;
- propose lead-storage architecture without enabling a database;
- define responsive and accessibility behavior;
- identify privacy and claim gates;
- provide phased implementation and stop points;
- list genuine conflicts only.

Jon must approve the plan before coding.

## Approved implementation sequence after plan approval

### Phase 1: Foundation

Build:

- global shell;
- navigation;
- typography and spacing;
- section wrapper;
- CTA component with `cta_location` support;
- high-fidelity Google Sheets primitive;
- spreadsheet grid and status chips;
- activity cues and connectors;
- exact-asset wrappers;
- funnel shell and state skeleton;
- provider-independent analytics adapter interface.

Stop for review of the spreadsheet primitive.

### Phase 2: Landing-page checkpoints

1. Hero.
2. Section 2.
3. Section 3.
4. Section 4 and shared Frame 3 component.
5. Section 5.
6. Section 6.
7. Section 7.
8. Complete-page desktop rhythm and navigation.

Every checkpoint requires:

- controlling specification;
- relevant attachment;
- explicit stop condition;
- preview review;
- diff review;
- acceptance-criteria review.

Do not build all sections in one uncontrolled run.

### Phase 3: Canonical funnel

Build the complete funnel after the landing-page desktop sequence is stable. Stop for functional review before database or analytics-provider connection.

### Phase 4: Lead storage

Add after funnel and email-capture approval.

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

Lovable's Supabase-backed database is an available option, not an automatic choice. Check status, propose schema and privacy implications, obtain approval, then provision once.

### Phase 5: Analytics architecture and provider

During foundation and funnel work, use a provider-independent adapter.

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

No separate `cta_clicked` event.

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

Rules:

- each milestone fires at most once per visitor;
- back navigation and refresh do not duplicate events;
- CTA origin persists;
- email never appears in analytics;
- events fire at explicit state transitions.

Select and connect the analytics provider only after visual and funnel behavior are stable and before private verification.

Lovable aggregate site analytics do not automatically replace the required custom event contract.

### Phase 6: Responsive and accessibility

After desktop approval, implement and verify tablet and mobile.

Check:

- no page-level horizontal scrolling;
- readable spreadsheet and email treatments;
- preservation of all required content;
- `44px` minimum touch targets;
- keyboard-operable forms, accordions, and funnel controls;
- visible focus;
- semantic headings and labels;
- no hover-only meaning;
- reduced-motion support;
- sufficient contrast;
- logical reading order.

### Phase 7: Privacy and claim verification

Before public approval, verify:

- case-study numbers and JPMorgan qualification;
- approximately 60-hour estimate and methodology;
- illustrative Goldman email framing;
- unmatched-message filtering;
- full-email-body non-retention;
- account deletion and connection revocation;
- provider identity and role;
- Google scopes and consent-screen identity;
- unrelated Drive access;
- retention, subprocessors, and privacy-policy disclosures.

Private layout review may use ratified copy. Public release may not use unsupported claims.

### Phase 8: Private verification

Use the private preview only.

Test:

- hero CTA;
- Section 4 CTA;
- final CTA;
- desktop and mobile;
- recruiting-track branches;
- recruiting-window branches;
- payment-choice buttons;
- lead records;
- all nine event payloads;
- duplicate suppression;
- CTA-origin persistence.

Retain screenshots or logs and repair every mismatch.

## Deployment rule

The project remains private and unpublished throughout WS5.

Do not call production deployment and do not route the public domain.

Public traffic waits for:

- matched platform-page readiness;
- verified lead storage and analytics;
- passed privacy and claim gates;
- final simultaneous-launch authorization.

## WS5 completion gate

WS5 implementation is complete only when:

- the complete private spreadsheet page is visually approved;
- exact assets are faithfully reproduced;
- the canonical funnel works end to end;
- lead records are stored and exportable;
- all nine events are manually verified;
- responsive and accessibility QA pass;
- privacy and claims match implementation truth;
- the project remains private;
- GitHub is reconciled for the next workstream.

## Rejected or inactive directions

- treating every external asset as exact by default;
- ignoring an asset explicitly classified as formal exact;
- requiring a separate visual asset for every section;
- restarting the unified storyboard;
- requiring a separate pre-Lovable Frame 1-to-Frame 2 visual;
- using one giant whole-site Lovable build message;
- treating existing Lovable scaffolding as approved;
- selecting analytics, database, or Google connection providers automatically;
- enabling a database during plan-only intake;
- publishing during WS5;
- real integrations, OAuth, card entry, payment collection, platform-page build, or public traffic during WS5.

## Exact next action

Open a new chat and begin the governed Lovable plan-only intake.

The next chat must:

1. read `00-START-HERE.md` and `CURRENT-HANDOFF.md`;
2. read the Lovable implementation handoff and project knowledge;
3. verify the existing Lovable project state;
4. read current project knowledge before replacing it;
5. install the frozen project knowledge;
6. fetch and upload the frozen packet and assets;
7. send the exact plan-only message;
8. bring the returned plan to Jon;
9. make no code changes until Jon approves the plan.
