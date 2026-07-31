# Workstream 5 Specification

Date created: July 30, 2026  
Date last updated: July 31, 2026  
Status: Active  
Workstream: Spreadsheet-page visual references, Lovable implementation, instrumentation, and private verification

## Purpose

This is the cumulative canonical record for Workstream 5. It must remain sufficient for a new chat to understand:

- the current implementation state;
- which visual references exist and which may still be needed;
- what is authoritative versus merely directional;
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
7. `docs/workstreams/ws5-assets/README.md` for the active visual-reference inventory and reference-specific defects.

Do not use `03-page-spec.md`, archived files, old handoffs, prior failed workbooks, abandoned design outputs, or plausible defaults to override the workstream specifications.

## Current state as of July 31, 2026

- Workstreams 1 through 4 are complete.
- WS5 is active.
- A hero spreadsheet reference has now been produced in Claude Design and archived in GitHub.
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
Current role: Existing shell that may be reused selectively after the visual-reference gate.

The project currently contains a preliminary global shell and a reserved product region. It must not be treated as an approved visual system merely because it exists.

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

The detailed inventory lives at:

`docs/workstreams/ws5-assets/README.md`

### Hero spreadsheet reference v1: complete enough to proceed

Source:

`docs/workstreams/ws5-assets/hero-spreadsheet-reference-v1.dc.html`

Status:

Directional implementation reference. Stop iterating on it outside Lovable unless a later integration failure exposes a specific blocking issue.

Established direction:

- approximately `1360 × 520` outer canvas;
- approximately `1000 × 400` spreadsheet window;
- recognizable Google Sheets chrome and compact density;
- current-state `IB Recruiting Tracker` on the active `Blotter` tab;
- left-side student-maintained contact fields;
- right-side Blotter-maintained changing state;
- three external activity cues;
- `YOU add the contacts` and `BLOTTER keeps them current` responsibility language.

### Known hero-reference defects

Lovable must correct, not reproduce, these issues:

1. The flow from Gmail and Calendar cues into Blotter and from Blotter into the spreadsheet is not sufficiently clear.
2. The reference does not clearly map each cue to the row or fields affected.
3. The bottom U-shaped ownership brackets are visually messy and are not a final treatment.
4. There is unnecessary white space below row 6 inside the spreadsheet window.
5. The vertical Blotter engine is a directional device, not a settled product diagram.
6. The reference source was created in Claude Design and the raw version depended on local image assets. Stable implementation assets must be used in Lovable.

### What is authoritative in the hero reference

- the Google Sheets-native visual language;
- the overall scale and hierarchy;
- the exact contact and state data below;
- three cue-card concept and copy;
- the division between student-maintained and Blotter-maintained information;
- the retained phrase `keeps them current`;
- the requirement that the spreadsheet remains the dominant object.

### What is not authoritative in the hero reference

- the exact connector geometry;
- the engine shape;
- the U-bracket treatment;
- the exact mobile composition;
- the extra grid whitespace;
- any implementation detail that contradicts accessibility, responsive behavior, or the canonical copy and behavior specifications.

## Hero data package

### Document chrome

Document title: `IB Recruiting Tracker`

Visible tabs:

- `Contacts`
- `Blotter`

Active tab: `Blotter`

### Exact column order

1. Name
2. Title
3. Firm
4. Status
5. Next move
6. Last contact
7. Days
8. Call

Do not add Email, Group, Notes, Priority, Location, LinkedIn, Owner, Stage, or other fields to the hero tracker.

### Responsibility split

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

### Exact contacts

| Name | Title | Firm |
|---|---|---|
| Sarah Chen | Associate | JPMorgan |
| Marcus Lee | Analyst | Evercore |
| Priya Shah | Vice President | Lazard |
| Daniel Kim | Associate | Morgan Stanley |
| Alex Morgan | Analyst | Centerview |

### Current front-sheet state

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Replied | Reply to Sarah | Jan 16 | 0 | blank |
| Marcus Lee | Call scheduled | Attend coffee chat | Jan 15 | 1 | Jan 17, 2:00 PM |
| Priya Shah | Call completed | Send thank-you | Jan 16 | 0 | Completed Jan 16 |
| Daniel Kim | No reply | Bump thread | Jan 11 | 5 | blank |
| Alex Morgan | Sent | blank | Jan 16 | 0 | blank |

Blank cells must be genuinely blank. Do not use a dash, em dash, `N/A`, `None`, or placeholder text.

### Parked stale state

Use only if the layered hero is restored later.

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Sent | blank | Jan 12 | 4 | blank |
| Marcus Lee | Replied | Schedule call | Jan 15 | 1 | blank |
| Priya Shah | Call scheduled | Attend coffee chat | Jan 14 | 2 | Jan 16, 9:00 AM |
| Daniel Kim | Sent | blank | Jan 11 | 5 | blank |
| Alex Morgan | blank | blank | blank | blank | blank |

The stale layer uses the same contacts, row order, columns, and `Blotter` tab. It is the same tracker at an earlier moment, not a different product.

### Hero activity cues

Use exactly three cues in the current working hero:

1. Gmail: `Sarah Chen replied` | `Jan 16 · 10:42 AM`
2. Calendar: `Coffee chat with Marcus Lee` | `Jan 17 · 2:00 PM`
3. Gmail: `Email sent to Alex Morgan` | `Jan 16 · 8:18 AM`

The Priya Shah completed-call cue is omitted from the hero to reduce crowding. It may still be used where useful in the funnel or mechanism if consistent with the governing frame specification.

Do not add email previews, subject lines, bodies, avatars, bank logos, or extra metadata.

### Spreadsheet fidelity rules

- Use restrained Google Sheets-style dropdown chips, not full-cell fills.
- Selected cell may remain Sarah Chen's `D2` Status cell with the formula bar reading `Replied`.
- Preserve recognizable toolbar, formula bar, column letters, row numbers, grid density, tabs, and frozen divider.
- Avoid generic SaaS-table, CRM, Airtable, Excel-dashboard, finance-terminal, glassmorphism, and decorative-browser-card treatments.
- Crop the production grid cleanly after the visible rows. Do not retain the reference's unnecessary bottom whitespace.

## Proposed minimal remaining visual-reference set

This set is recommended but must be reviewed and ratified before more external design work begins.

### Candidate 1: Outstanding Actions spreadsheet reference

Recommended as required before broad Lovable implementation because it is a nonstandard Google Sheets-native grouped queue and is reused in both Section 4 and Funnel Frame 3.

It should show:

- `Outstanding actions`;
- `21 outstanding actions`;
- Replies owed, Follow-ups due, and Thank-you notes groups;
- two visible rows per group;
- the exact overflow rows and wording in WS4;
- columns Contact, Next action, Why it is here;
- the approved spreadsheet grammar.

One desktop reference is sufficient. Lovable should derive responsive crops from WS4.

### Candidate 2: Three-frame funnel spreadsheet storyboard

Recommended as required because the state relationship and signposting are difficult to communicate through disconnected prose.

Create one stable spreadsheet across three frames:

1. Recruiting activity arrives while the sheet is stale.
2. Signposted cells update to current state.
3. The sheet transitions to Outstanding Actions.

A single HTML storyboard containing all three states is preferable to three unrelated files. It should demonstrate only the spreadsheet experience, not redesign the surrounding question, email, price, checkout, or terminal screens.

### Candidate 3: Section 2 manual-tracker divergence reference

Optional and not currently a gate.

Working idea:

- show a cropped, visibly messy or decayed manual spreadsheet fragment;
- pair it with `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER`;
- use the problem section, not the hero, to carry more of the stale-manual-tracker proof.

The four figures remain text and do not require a separate reference. Build this reference only if Jon ratifies it or the first Lovable attempt cannot communicate the divergence cleanly.

## Page elements that do not require separate external references

Unless Lovable's first implementation fails materially, build these directly in Lovable:

- Section 2's four large figures and methodology copy.
- Section 3's Gmail + Calendar to Blotter to Google Sheet mechanism, using the approved spreadsheet and cue primitives.
- Section 5's preservation comparison, using the approved spreadsheet grammar and written two-zone specification.
- Section 6 privacy process, permissions table, commitments, and privacy FAQ.
- Section 7 general FAQ and closing CTA.
- Recruiting questions, email capture, price, purchase summary, payment choices, and terminal screens outside the three-frame spreadsheet experience.

## Immediate external-reference sequence

1. Review and ratify the minimal remaining reference set.
2. If ratified, build the Outstanding Actions reference.
3. Review it once and freeze it as a directional reference.
4. Build the three-frame funnel storyboard using the hero spreadsheet grammar and Outstanding Actions state.
5. Decide whether the optional Section 2 divergence reference is actually needed.
6. Freeze the reference packet and begin Lovable implementation.

Do not reopen endless hero polishing before these decisions. The existing reference is sufficient to move forward.

## Lovable reference handoff method

GitHub remains the archive and source of truth. Lovable receives the relevant files directly in bounded messages.

For each reference checkpoint:

1. Upload the editable HTML and a review screenshot to Lovable as message attachments.
2. Include the relevant WS4 or WS3 excerpt or a precise brief derived from it.
3. State which aspects are authoritative and which are directional.
4. List known defects that must not be copied.
5. Identify explicit exclusions and the mandatory stop point.
6. Use Lovable plan mode first for multi-section or interactive work.
7. Approve the plan before authorizing code changes.
8. Review the resulting preview at desktop and mobile widths before advancing.

The Lovable file-upload path is operationally available through its project API: obtain upload URLs for local files, upload the bytes, and attach the returned file IDs to the project message. Do not rely on Lovable chat history alone as the archive.

## Lovable implementation sequence

### Phase 0: Freeze the implementation packet

Before code resumes, assemble:

- `WS4-SPEC.md` for exact page and funnel presentation;
- `WS3-SPEC.md` for event and measurement contracts;
- this WS5 specification;
- the visual-reference README;
- hero HTML and screenshot;
- Outstanding Actions reference, if ratified;
- three-frame storyboard, if ratified;
- a concise deviations and known-defects list.

No new page copy, product capability, funnel step, or visual claim may be invented during implementation.

### Phase 1: Lovable plan-only intake

Send one plan-mode message to the existing private project requiring Lovable to:

- inspect the reference packet;
- identify reusable components;
- map all seven sections and funnel screens;
- propose responsive behavior;
- propose the shared funnel-state model;
- identify where event boundaries and lead writes occur;
- identify any conflict or missing implementation fact;
- make no code changes.

Approve or revise this plan before implementation.

### Phase 2: Foundation and reusable components

Build only the reusable foundation first:

- global page shell;
- navigation;
- typography and spacing hierarchy;
- buttons and links;
- one reusable CTA component with required `cta_location`;
- spreadsheet-window component;
- status-chip component;
- activity-cue component;
- section wrapper and responsive container;
- funnel shell and shared state model;
- analytics adapter interface with no vendor dependency yet.

The existing Lovable shell may be reused only where it survives comparison with the canonical requirements.

Stop and review before broad section production.

### Phase 3: Hero implementation

Implement the hero using the reference and known-defects list.

Requirements:

- preserve the spreadsheet as the dominant object;
- improve cue-to-Blotter-to-sheet causality;
- clarify cue-to-row or cue-to-field relationships without a line spiderweb;
- replace the messy ownership brackets with a cleaner treatment;
- crop the spreadsheet grid cleanly;
- retain `keeps them current`;
- create a deliberate mobile treatment rather than shrinking the full desktop composition into illegibility;
- keep the stale rear fragment optional until the full hero is reviewed in page context.

Stop for desktop and mobile approval.

### Phase 4: Landing-page sections

Implement sequentially and review in bounded checkpoints:

1. Section 2 Scale and divergence.
2. Section 3 How Blotter works, reusing hero cue and spreadsheet primitives.
3. Section 4 Outstanding Actions, reusing the approved grouped-sheet reference.
4. Section 5 Preservation, reusing the spreadsheet grammar.
5. Section 6 Privacy and permissions directly from exact WS4 copy.
6. Section 7 General FAQ and final CTA directly from exact WS4 copy.

Maintain the exact seven-section order and page-rhythm rules. Conventional text sections do not require external mockups before implementation.

### Phase 5: Canonical funnel UI and state model

Implement the exact sequence:

1. `funnel_started`
2. Two recruiting questions.
3. Three-frame spreadsheet experience.
4. Recruiting-email capture.
5. Price screen.
6. Purchase-summary screen.
7. Payment-choice click.
8. Terminal confirmation.

Use one stable funnel shell and one shared state model. Retain CTA origin, recruiting answers, session identity, and visitor identity through the flow.

Do not add OAuth, social login, extra demos, plan selection, annual billing, coupons, card fields, payment collection, or pre-terminal beta, test, future-availability, or no-charge language.

### Phase 6: Lead storage decision and implementation

Before enabling a database or form service, make one explicit implementation decision.

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

- recruiting email is stored only in the lead system;
- recruiting email is never included in general analytics event properties;
- lead records support export;
- writes are idempotent or safely update the same visitor record;
- the implementation remains appropriate for a private validation page.

Lovable can provision a project database if selected, but database activation is a decision gate, not an automatic step.

### Phase 7: Analytics vendor decision and wiring

Do not select or install an analytics vendor during visual-reference work.

Build the code around one reusable analytics adapter so the vendor can be selected after the UI and funnel milestones are stable.

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

Implementation rules:

- no separate `cta_clicked` event;
- each milestone counts at most once per visitor;
- back navigation and refresh do not duplicate completion events;
- CTA origin persists through the entire funnel;
- email remains outside event properties;
- event calls occur at explicit state transitions, not arbitrary button render or component mount points;
- the same event adapter and funnel burden must be reusable for the later platform variant.

### Phase 8: Claims, privacy, responsive, and accessibility QA

Before private approval, verify or revise:

- former Goldman authority line;
- case-study counts and JPMorgan offer wording;
- 60-hour estimate and methodology;
- provider identity and role;
- Google scopes and consent-screen language;
- retention, deletion, privacy-policy, and subprocessor claims.

Required implementation checks:

- desktop, tablet, and mobile layouts;
- no page-level horizontal scrolling;
- deliberate readable spreadsheet crops;
- 16px minimum body text;
- 44px minimum touch targets;
- visible keyboard focus;
- keyboard-operable funnel and accordions;
- reduced-motion support;
- semantic heading order;
- clear form labels and validation;
- no hover-only meaning;
- sufficient contrast;
- logical reading order independent of desktop visual placement.

### Phase 9: Private preview and manual verification

Keep the project private. Do not launch traffic.

Manual verification set:

- one full session from each CTA location;
- at least one desktop and one mobile session;
- each recruiting-track branch and recruiting-window option represented across the test set;
- each payment-choice path tested where shown;
- browser actions compared against lead records and analytics events;
- event payload screenshots or logs retained;
- no double firing on back navigation or refresh;
- all incidents repaired before public traffic.

### Phase 10: WS5 completion and WS6 handoff

WS5 is complete only when:

- the private spreadsheet page is visually and functionally approved;
- the hero and spreadsheet scenes use one coherent grammar;
- the canonical funnel works end to end;
- lead capture and export are verified;
- all nine events are manually verified;
- claim and privacy language is supportable;
- responsive and accessibility checks pass;
- the page remains private;
- repository and handoff documents are current for WS6.

## Deliverables

- Visual-reference index.
- Hero spreadsheet HTML reference and review notes.
- Outstanding Actions reference if ratified.
- Three-frame funnel storyboard if ratified.
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

1. Review and ratify the proposed minimal remaining visual-reference set.
2. If ratified, build the Outstanding Actions spreadsheet reference next.
3. Then build the three-frame funnel storyboard.
4. Decide whether the optional Section 2 messy-manual-tracker reference is needed.
5. Freeze the reference packet and resume the existing private Lovable project in plan mode.
