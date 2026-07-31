# Workstream 5 Specification

Date created: July 30, 2026  
Date last updated: July 31, 2026  
Status: Active  
Workstream: Spreadsheet-page visual references, Lovable implementation, instrumentation, and private verification

## Purpose

This is the cumulative canonical record for Workstream 5. It must remain sufficient for a new chat to understand:

- the current implementation state;
- which visual references exist and which still may be needed;
- what is authoritative versus directional;
- the exact Lovable build sequence;
- how lead storage and analytics connect to the build;
- the private-verification and completion gates.

`CURRENT-HANDOFF.md` contains temporary resumption context. This file is the durable WS5 record.

## Objective

Create only the visual references that materially reduce implementation ambiguity, use them to build the complete seven-section spreadsheet landing page and canonical funnel in Lovable, store leads, wire the exact WS3 analytics contract, deploy privately, and verify responsive behavior, accessibility, claims, privacy language, event behavior, lead handling, and spreadsheet-interface fidelity before acquisition work or platform-page implementation.

## Source hierarchy

1. Jon's explicit instructions in the active chat.
2. This `WS5-SPEC.md` for current implementation state, visual-reference scope, Lovable sequence, and WS5 gates.
3. `docs/workstreams/WS4-SPEC.md` for exact landing-page copy, section order, visual communication jobs, funnel presentation, responsive priorities, and claim boundaries.
4. `docs/workstreams/WS3-SPEC.md` for funnel architecture, price, events, properties, measurement, read rules, and reporting.
5. `docs/workstreams/WS2-SPEC.md` for the spreadsheet proposition and product boundaries.
6. `docs/05-working-agreement.md` for operating and documentation rules.
7. `docs/workstreams/ws5-assets/README.md` for the visual-reference inventory and reference-specific defects.

Do not use `03-page-spec.md`, archived files, old handoffs, prior failed workbooks, abandoned design outputs, or plausible defaults to override the workstream specifications.

## Current state as of July 31, 2026

- Workstreams 1 through 4 are complete.
- WS5 is active.
- A hero spreadsheet reference has been produced in Claude Design and archived in GitHub.
- The hero reference is directionally sufficient to guide Lovable. It is not a literal final pixel target and contains documented defects that must not be copied.
- The current working hero direction shows one clean current-state spreadsheet, three Gmail or Calendar cues, a Blotter processing element, and responsibility language.
- The original stale-sheet-behind-current-sheet direction is parked, not rejected. It can be restored later by adding only a cropped, muted upper portion of the stale sheet behind the current composition.
- Jon has explicitly retained the phrase `keeps them current`. Do not silently replace it with `keeps it current`.
- The Lovable project exists and remains private and paused.
- Existing Lovable shell choices are unapproved scratch scaffolding unless independently supported by the canonical record.
- No funnel, lead database, analytics vendor, production integration, payment collection, or public deployment is complete.

## Lovable project state

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Visibility: Private  
Published: No

The project contains a preliminary global shell and reserved product region. Existing code may be reused only where it survives comparison with the canonical requirements.

## Governing build scope

### Build during WS5

- Seven-section spreadsheet landing page in the exact WS4 order.
- Three CTA placements entering one shared funnel.
- Two recruiting-configuration questions.
- Three-frame spreadsheet product experience.
- Recruiting-email capture.
- `$9.99 / month` price screen.
- Purchase-summary screen with payment-choice buttons.
- Fall 2026 terminal confirmation.
- Responsive desktop, tablet, and mobile layouts.
- Exact nine-event WS3 analytics implementation.
- Lead storage and export.
- Private review deployment or preview.
- Manual event and lead verification.

### Do not build during WS5

- Real Gmail, Calendar, or Google Sheets integrations.
- Real OAuth.
- Card-entry or payment collection.
- Production backend logic beyond the minimum lead and analytics infrastructure required for the validation page.
- Standalone platform landing page.
- Public acquisition campaign.

## Confirmed visual-reference production rule

External visual-reference production is limited to complex, implementation-sensitive assets that Lovable is unlikely to execute reliably from text alone.

Do not create separate visual references merely because a section contains visual hierarchy. In particular:

- text is not a visual asset;
- the four Section 2 recruiting figures are text;
- privacy copy and permission tables are conventional page implementation;
- FAQ and CTA treatments are conventional page implementation;
- simple section layouts should be built directly in Lovable from the canonical specification.

A reference exists to reduce ambiguity, not to create a second complete design process outside Lovable.

## Visual reference inventory

Detailed inventory:

`docs/workstreams/ws5-assets/README.md`

### Hero spreadsheet reference v1: complete enough to proceed

Source:

`docs/workstreams/ws5-assets/hero-spreadsheet-reference-v1.dc.html`

Status:

Directional implementation reference. Stop iterating on it outside Lovable unless a later implementation failure exposes a specific blocking issue.

Established direction:

- approximately `1360 × 520` outer canvas;
- approximately `1000 × 400` spreadsheet window;
- recognizable Google Sheets chrome and compact density;
- current-state `IB Recruiting Tracker` on the active `Blotter` tab;
- left-side student-maintained contact fields;
- right-side Blotter-maintained changing state;
- three external activity cues;
- `YOU add the contacts` and `BLOTTER keeps them current` responsibility language.

Known defects Lovable must correct rather than reproduce:

1. Gmail and Calendar cue flow into Blotter and from Blotter into the sheet is unclear.
2. Cue-to-row or cue-to-field mapping is unclear.
3. Bottom U-shaped ownership brackets are messy and not final.
4. Unnecessary white space remains below row 6.
5. The vertical Blotter engine is directional, not a settled product diagram.
6. Stable local icons or inline SVGs must replace Claude Design-local image dependencies.

Authoritative aspects:

- Google Sheets-native visual language;
- overall scale and hierarchy;
- exact contact and state data;
- three cue-card concept and copy;
- division between student-maintained and Blotter-maintained information;
- phrase `keeps them current`;
- spreadsheet remains the dominant object.

Directional only:

- connector geometry;
- engine shape;
- U-bracket treatment;
- exact mobile composition;
- extra grid whitespace.

## Hero data package

Document title: `IB Recruiting Tracker`

Visible tabs:

- `Contacts`
- `Blotter`

Active tab: `Blotter`

Exact column order:

1. Name
2. Title
3. Firm
4. Status
5. Next move
6. Last contact
7. Days
8. Call

Do not add Email, Group, Notes, Priority, Location, LinkedIn, Owner, Stage, or other fields to the hero tracker.

Student maintained:

- Name
- Title
- Firm

Blotter maintained:

- Status
- Next move
- Last contact
- Days
- Call

Use a clear boundary between Firm and Status. The production treatment does not need to use the current U brackets.

Exact contacts:

| Name | Title | Firm |
|---|---|---|
| Sarah Chen | Associate | JPMorgan |
| Marcus Lee | Analyst | Evercore |
| Priya Shah | Vice President | Lazard |
| Daniel Kim | Associate | Morgan Stanley |
| Alex Morgan | Analyst | Centerview |

Current state:

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Replied | Reply to Sarah | Jan 16 | 0 | blank |
| Marcus Lee | Call scheduled | Attend coffee chat | Jan 15 | 1 | Jan 17, 2:00 PM |
| Priya Shah | Call completed | Send thank-you | Jan 16 | 0 | Completed Jan 16 |
| Daniel Kim | No reply | Bump thread | Jan 11 | 5 | blank |
| Alex Morgan | Sent | blank | Jan 16 | 0 | blank |

Blank cells must be genuinely blank. Do not use a dash, em dash, `N/A`, `None`, or placeholder text.

Parked stale state, used only if the layered hero is restored:

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Sent | blank | Jan 12 | 4 | blank |
| Marcus Lee | Replied | Schedule call | Jan 15 | 1 | blank |
| Priya Shah | Call scheduled | Attend coffee chat | Jan 14 | 2 | Jan 16, 9:00 AM |
| Daniel Kim | Sent | blank | Jan 11 | 5 | blank |
| Alex Morgan | blank | blank | blank | blank | blank |

The stale layer is the same tracker at an earlier moment, not a different product.

Current hero cues:

1. Gmail: `Sarah Chen replied` | `Jan 16 · 10:42 AM`
2. Calendar: `Coffee chat with Marcus Lee` | `Jan 17 · 2:00 PM`
3. Gmail: `Email sent to Alex Morgan` | `Jan 16 · 8:18 AM`

The Priya Shah completed-call cue is omitted from the hero to reduce crowding. Do not add previews, subject lines, message bodies, avatars, bank logos, or extra metadata.

Spreadsheet fidelity:

- Use restrained Google Sheets-style dropdown chips, not full-cell fills.
- Selected cell may remain Sarah Chen's `D2` Status cell with the formula bar reading `Replied`.
- Preserve recognizable toolbar, formula bar, column letters, row numbers, grid density, tabs, and frozen divider.
- Avoid generic SaaS-table, CRM, Airtable, Excel-dashboard, finance-terminal, glassmorphism, and decorative-browser-card treatments.
- Crop the production grid cleanly after the visible rows.

## Proposed minimal remaining visual-reference set

This set is recommended but must be reviewed and ratified before more external design work begins.

### Required candidate: one unified three-frame spreadsheet storyboard

Build one additional HTML reference containing the full spreadsheet product experience:

1. Recruiting activity arrives while the tracker is stale.
2. Signposted cells update to current state.
3. The same sheet transitions to `Outstanding actions`.

Why one file is sufficient:

- it preserves one stable spreadsheet across all three states;
- it solves the difficult Frame 1 to Frame 2 signposting and update choreography;
- Frame 3 is the exact grouped Outstanding Actions scene required for Section 4;
- a standalone crop or state capture of Frame 3 can serve as the Section 4 visual reference;
- building a separate Outstanding Actions reference would duplicate the same composition and create unnecessary iteration.

Frame 3 must show:

- `Outstanding actions`;
- `21 outstanding actions`;
- Replies owed, Follow-ups due, and Thank-you notes groups;
- two visible rows per group;
- exact overflow rows and wording from WS4;
- columns Contact, Next action, Why it is here;
- approved spreadsheet grammar.

The storyboard demonstrates only spreadsheet states and transition logic. It does not redesign the surrounding recruiting questions, email capture, price, purchase summary, payment choices, or terminal screens.

### Optional candidate: Section 2 manual-tracker divergence reference

Working idea:

- cropped, visibly messy or decayed manual spreadsheet fragment;
- paired with `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER`;
- problem section carries more stale-manual-tracker proof instead of forcing it into the hero.

The four figures remain text. This is not a gate. Build it only if Jon ratifies the concept or Lovable cannot execute the written divergence directly.

## Elements that do not require separate external references

Unless Lovable's first implementation fails materially, build these directly in Lovable:

- Section 2 figures and methodology copy.
- Section 3 mechanism, reusing hero spreadsheet and activity-cue primitives.
- Section 4 Outstanding Actions as a separate file; reuse Frame 3 of the unified storyboard.
- Section 5 preservation comparison.
- Section 6 privacy process, permissions table, commitments, and privacy FAQ.
- Section 7 general FAQ and closing CTA.
- Recruiting questions, email capture, price, purchase summary, payment choices, and terminal screens outside the three-frame spreadsheet experience.

## Immediate reference sequence

1. Review and ratify the reduced remaining reference set.
2. If ratified, build the unified three-frame spreadsheet storyboard.
3. Review it once and freeze it as a directional reference.
4. Decide whether the optional Section 2 divergence reference is actually needed.
5. Freeze the reference packet and begin Lovable implementation.

Do not reopen endless hero polishing. The existing reference is sufficient to move forward.

## Lovable reference handoff method

GitHub remains the archive and source of truth. Lovable receives relevant files directly in bounded messages.

For each checkpoint:

1. Upload editable HTML and a review screenshot to Lovable as message attachments.
2. Include the controlling WS4 or WS3 excerpt or a precise brief derived from it.
3. State what is authoritative and what is directional.
4. List known defects that must not be copied.
5. Identify explicit exclusions and a mandatory stop point.
6. Use Lovable plan mode first for multi-section or interactive work.
7. Approve the plan before authorizing code changes.
8. Review desktop and mobile previews before advancing.

The Lovable file-upload path is available through the project API: obtain upload URLs for local files, upload the bytes, and attach the returned file IDs to the project message. Do not rely on Lovable chat history alone as the archive.

## Lovable implementation sequence

### Phase 0: Freeze the implementation packet

Assemble:

- `WS4-SPEC.md` for exact page and funnel presentation;
- `WS3-SPEC.md` for event and measurement contracts;
- this WS5 specification;
- visual-reference README;
- hero HTML and screenshot;
- unified storyboard, if ratified;
- concise known-defects and deviations list.

No page copy, product capability, funnel step, or claim may be invented during implementation.

### Phase 1: Lovable plan-only intake

Send one plan-mode message to the existing private project requiring Lovable to:

- inspect the packet;
- identify reusable components;
- map all seven sections and funnel screens;
- propose responsive behavior;
- propose the shared funnel-state model;
- identify event boundaries and lead writes;
- identify conflicts or missing implementation facts;
- make no code changes.

Approve or revise the plan before implementation.

### Phase 2: Foundation and reusable components

Build only:

- global page shell;
- navigation;
- typography and spacing hierarchy;
- buttons and links;
- one reusable CTA component with `cta_location`;
- spreadsheet-window component;
- status-chip component;
- activity-cue component;
- section wrapper and responsive container;
- funnel shell and shared state model;
- analytics adapter interface with no vendor dependency yet.

Stop and review before broad section production.

### Phase 3: Hero implementation

Requirements:

- spreadsheet remains dominant;
- improve cue-to-Blotter-to-sheet causality;
- clarify cue-to-row or cue-to-field relationships without a line spiderweb;
- replace messy ownership brackets;
- crop grid cleanly;
- retain `keeps them current`;
- create a deliberate mobile treatment;
- keep stale rear fragment optional until page-context review.

Stop for desktop and mobile approval.

### Phase 4: Landing-page sections

Implement sequentially:

1. Section 2 Scale and divergence.
2. Section 3 How Blotter works, reusing hero primitives.
3. Section 4 Outstanding Actions, reusing Frame 3 of the storyboard.
4. Section 5 Preservation, reusing spreadsheet grammar.
5. Section 6 Privacy and permissions directly from WS4.
6. Section 7 General FAQ and final CTA directly from WS4.

Maintain exact section order and page-rhythm rules. Conventional text sections do not require external mockups.

### Phase 5: Canonical funnel UI and state model

Implement:

1. `funnel_started`
2. Two recruiting questions.
3. Three-frame spreadsheet experience.
4. Recruiting-email capture.
5. Price screen.
6. Purchase-summary screen.
7. Payment-choice click.
8. Terminal confirmation.

Use one stable funnel shell and shared state model. Retain CTA origin, recruiting answers, session identity, and visitor identity through the flow.

Do not add OAuth, social login, extra demos, plan selection, annual billing, coupons, card fields, payment collection, or pre-terminal beta, test, future-availability, or no-charge language.

### Phase 6: Lead storage decision and implementation

Before enabling a database or form service, make one explicit decision.

Minimum lead record:

- Recruiting email.
- Recruiting track.
- Recruiting window.
- Surface variant.
- CTA location.
- Session or visitor identifier.
- Timestamp.
- Furthest funnel stage reached.

Requirements:

- email stored only in lead system;
- email never included in general analytics properties;
- records support export;
- writes are idempotent or update the same visitor safely;
- implementation remains appropriate for a private validation page.

Lovable can provision a project database if selected, but database activation is a decision gate, not an automatic step.

### Phase 7: Analytics vendor decision and wiring

Use one reusable analytics adapter. Select the vendor only after UI and milestone boundaries are stable.

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

- no separate `cta_clicked` event;
- each milestone counts at most once per visitor;
- back navigation and refresh do not duplicate completion events;
- CTA origin persists throughout the funnel;
- email remains outside event properties;
- calls occur at explicit state transitions, not arbitrary renders or mounts;
- adapter and funnel burden remain reusable for the later platform variant.

### Phase 8: Claims, privacy, responsive, and accessibility QA

Verify or revise:

- former Goldman authority line;
- case-study counts and JPMorgan offer wording;
- 60-hour estimate and methodology;
- provider identity and role;
- Google scopes and consent-screen language;
- retention, deletion, privacy-policy, and subprocessor claims.

Check:

- desktop, tablet, and mobile layouts;
- no page-level horizontal scrolling;
- readable spreadsheet crops;
- 16px minimum body text;
- 44px minimum touch targets;
- visible keyboard focus;
- keyboard-operable funnel and accordions;
- reduced-motion support;
- semantic heading order;
- clear labels and validation;
- no hover-only meaning;
- sufficient contrast;
- logical reading order.

### Phase 9: Private preview and manual verification

Keep the project private. Do not launch traffic.

Verify:

- one full session from each CTA location;
- at least one desktop and one mobile session;
- all recruiting-track and recruiting-window branches across the set;
- each payment-choice path shown;
- browser actions against lead records and analytics events;
- retained event payload screenshots or logs;
- no double firing on back or refresh;
- all incidents repaired before traffic.

### Phase 10: WS5 completion and WS6 handoff

WS5 is complete only when:

- private spreadsheet page is visually and functionally approved;
- hero and spreadsheet scenes use one coherent grammar;
- funnel works end to end;
- lead capture and export are verified;
- all nine events are manually verified;
- claim and privacy language is supportable;
- responsive and accessibility checks pass;
- page remains private;
- repository and handoff are current for WS6.

## Deliverables

- Visual-reference index.
- Hero spreadsheet HTML reference and review notes.
- Unified three-frame storyboard if ratified, with Frame 3 serving Section 4.
- Optional Section 2 divergence reference only if needed.
- Lovable implementation plan.
- Reusable page and spreadsheet component system.
- Responsive seven-section page.
- Functional canonical funnel.
- Lead storage and export path.
- Analytics adapter and exact event implementation.
- Private preview URL.
- Manual verification record.
- Implementation decision log.
- Deviations and unresolved-conflicts list.
- Updated canonical documentation.

## Exact next action

Do not spend more time polishing the current hero reference outside Lovable.

Next:

1. Review and ratify the reduced remaining visual-reference set.
2. If ratified, build one unified three-frame spreadsheet storyboard.
3. Decide whether the optional Section 2 messy-manual-tracker reference is needed.
4. Freeze the reference packet.
5. Resume the existing private Lovable project in plan mode.
