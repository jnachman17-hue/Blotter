# Workstream 5 Specification

Date created: July 30, 2026  
Date last updated: July 31, 2026  
Status: Active  
Workstream: Spreadsheet-page visual production, Lovable implementation, instrumentation, and private verification

## Purpose

This is the cumulative canonical record for Workstream 5. It must remain sufficient for a new chat to understand the current implementation state, the visual assets still required, the active production tool and checkpoint, the exact hero data, the later Lovable sequence, and the completion gates without relying on prior chat history.

`CURRENT-HANDOFF.md` is temporary resumption context. This file is the durable WS5 specification.

## Objective

Produce and approve the spreadsheet-native visual system, implement the complete seven-section spreadsheet landing page and matched canonical funnel in Lovable, instrument the WS3 analytics system, deploy privately, and verify responsive behavior, claims, events, lead handling, and spreadsheet-interface fidelity before acquisition work or platform-page implementation.

## Source hierarchy

1. Jon's explicit instructions in the active chat
2. This `WS5-SPEC.md` for current implementation state, asset-production sequence, and WS5 implementation rulings
3. `docs/workstreams/WS4-SPEC.md` for page narrative, exact copy, visual communication jobs, product experience, responsive rules, and claim boundaries
4. `docs/workstreams/WS3-SPEC.md` for funnel architecture, analytics, price, measurement, and read rules
5. `docs/workstreams/WS2-SPEC.md` for proposition boundaries
6. `docs/05-working-agreement.md` for operating and documentation rules

Do not use `03-page-spec.md`, archived files, old handoffs, prior failed workbooks, or abandoned design outputs to override the current workstream specifications.

## Current state as of July 31, 2026

- Workstreams 1 through 4 are complete.
- WS5 is active.
- The current active task is **not** correcting the Lovable shell.
- The current active task is producing the high-fidelity hero spreadsheet visual reference in **Claude Design** as editable HTML/CSS.
- Claude Design is currently the best-performing tool for the spreadsheet-reference design work and is authorized as the active visual-production environment.
- The previously created Lovable project remains private and paused.
- The existing Lovable shell is unapproved scratch scaffolding. Its typography, palette, placeholder copy, navigation, spacing, and other visual choices are not canonical unless separately ratified.
- Lovable must not continue broad implementation until the spreadsheet visual system and hero composition reach the required approval gate.
- A prior one-shot hero PNG captured the high-level concept but failed the granular fidelity and polish standard. It is a critique reference only and must not be treated as an approved asset or implementation target.
- A prior Google Sheets/workbook attempt also failed. It drifted into a functional workbook, invented content, and did not produce a premium landing-page reference. Treat it as discarded.
- No spreadsheet visual asset is approved yet.
- No funnel, forms, analytics vendor, database, real integrations, or public deployment is approved or complete.

## Governing product and page scope

Build during WS5:

- Seven-section spreadsheet landing page in the exact WS4 order
- Three CTA placements entering the same funnel
- Two-question recruiting configuration
- Ratified three-frame spreadsheet product experience
- Recruiting-email capture
- $9.99 monthly price screen
- Separate purchase-summary screen with payment-choice buttons
- Fall 2026 first-cohort terminal state
- Responsive desktop, tablet, and mobile layouts
- Exact WS3 event instrumentation
- Lead storage and export path
- Private deployment for review

Do not build during WS5:

- Real Gmail, Calendar, or Sheets integrations
- Real OAuth
- Card-entry or payment collection
- Platform landing page
- Production backend logic
- Public acquisition campaign

## Ratified page foundation

### Brand and shell direction

- Public-facing brand name: `blotter`
- White and light-cream foundation
- Navy blue as the restrained anchor color
- Modern sans-serif marketing typography
- Warm, inviting, professional, credible, highly readable, and visually interesting
- Restrained gradients are allowed only where purposeful
- Do not inherit the abandoned editorial-serif direction or old page token systems
- Use archived design material only to recover the established wordmark treatment where needed; it has no broader design authority
- Header labels: `blotter`, `How it works`, `Privacy`, `FAQ`, and `See how Blotter works`
- Use exact WS4 copy; do not use generic placeholder or invented marketing text
- 16px minimum body text, 44px minimum touch targets, visible keyboard focus, and no page-level horizontal scrolling

### Status of existing Lovable shell

- Project: `Blotter Foundation`
- Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`
- Private and not published
- Existing code may be reused only where it supports ratified decisions
- Existing design choices are not approved merely because they were generated
- Do not ask Jon to ratify a bundle of arbitrary Lovable defaults as though they were required project decisions

## Visual asset map

The landing page and funnel require four coherent visual systems. They are not unrelated illustrations.

### System 1: Spreadsheet visual system

Used in:

- Hero composition
- Section 3 mechanism output
- Section 4 Outstanding Actions
- Section 5 preservation
- Three-frame funnel product experience

The same underlying spreadsheet grammar must govern all scenes:

- application chrome
- toolbar and formula-bar proportions
- column letters and row numbers
- gridline weight
- row heights and cell padding
- headers
- frozen-pane treatment
- selected-cell state
- dropdown/status chips
- tabs
- typography and alignment
- desktop and mobile crops

### System 2: Activity-cue system

Used in:

- Hero
- Section 3 mechanism
- Funnel frames

Includes compact Gmail and Calendar signals. These are utility cues, not generic SaaS cards or message previews.

### System 3: Editorial proof system

Used in:

- Section 2 four recruiting-volume figures
- Section 2 divergence visual comparing what happened with what reached the tracker
- Supporting section compositions where spreadsheet chrome is unnecessary

### System 4: Trust and conversion system

Used in:

- Section 6 privacy process and permissions treatment
- Privacy FAQ
- General FAQ
- CTA blocks
- Funnel screens outside the spreadsheet experience

## Required visual assets by page location

### Asset A: Hero spreadsheet composition

Page location: Section 1, above the fold.

Communication job: explain in approximately two seconds that the student maintains the contacts while Blotter maintains changing recruiting state inside the Google Sheets workflow.

Required composition:

- muted stale tracker behind
- dominant current tracker in front
- same five contacts and row order in both
- static contact fields unchanged
- logistical fields updated
- compact Gmail and Calendar activity cues
- labels `YOU ADD THE CONTACTS` and `BLOTTER KEEPS IT CURRENT`
- desktop composition and deliberate mobile crop

This is the primary product-proof asset.

### Asset B: Scale and divergence visual

Page location: Section 2.

Required content:

- 628 recruiting emails
- 55 coffee chats
- 19 applications
- 30 interview rounds
- compact comparison between `WHAT ACTUALLY HAPPENED` and `WHAT MADE IT INTO THE MANUAL TRACKER`

Communication job: demonstrate that recruiting activity moves faster than manual tracker administration.

This does not need to be a full spreadsheet window.

### Asset C: How Blotter works mechanism

Page location: Section 3.

Required flow:

`Gmail + Calendar → Blotter → Your Google Sheet`

Stage labels:

- `RECRUITING HAPPENS HERE`
- `BLOTTER KEEPS IT CURRENT`
- `YOUR TRACKER STAYS CURRENT`

The Google Sheet output must use the approved spreadsheet system. Do not create a separately styled table.

### Asset D: Outstanding Actions spreadsheet scene

Page location: Section 4.

Required title and summary:

- `Outstanding actions`
- `21 outstanding actions`

Columns:

- Contact
- Next action
- Why it is here

Exact groups and rows:

`Replies owed — 6`

- Marcus Lee | Reply to Marcus | Marcus replied 2 hours ago
- Daniel Kim | Reply to Daniel | Daniel replied yesterday
- `+4 more replies owed`

`Follow-ups due — 11`

- Sarah Chen | Bump thread | No reply for 6 days
- Alex Morgan | Bump thread | No reply for 8 days
- `+9 more follow-ups due`

`Thank-you notes — 4`

- Priya Shah | Send thank-you | Coffee chat completed yesterday
- James Wu | Send thank-you | Call completed 3 hours ago
- `+2 more thank-you notes`

Communication job: show that current state becomes a usable action queue.

This must remain Google Sheets-native, not a dashboard of cards.

### Asset E: Preservation scene

Page location: Section 5.

Required conceptual zones:

`YOUR EXISTING TRACKER`

- Name
- Title
- Firm
- Email
- LinkedIn

`BLOTTER ADDS THE LIVE LAYER`

- Status
- Next move
- Last contact
- Days
- Call

Communication job: show that the student keeps the tracker and contact record already built while Blotter adds a standardized current-state view.

Do not show Group or Notes. Do not create a migration wizard, technical mapping diagram, or dashboard.

### Asset F: Privacy process and permissions treatment

Page location: Section 6.

Required four-step process:

1. Blotter checks the sender.
2. Unmatched messages stop there.
3. Matched recruiting messages are processed.
4. Blotter keeps structured facts, not full messages.

Also requires the exact Gmail, Calendar, and Sheets permissions treatment from WS4.

Communication job: provide candid, supportable disclosure. Avoid security theater, shields, fake OAuth, or vague compliance visuals.

### Asset G: FAQ and closing CTA treatment

Page location: Section 7.

No large custom illustration is required. Implement the ratified five-question general FAQ and visually distinct closing CTA block using the page design system.

### Asset H: Three-frame funnel spreadsheet experience

Location: after the two recruiting questions and before recruiting-email capture.

One stable spreadsheet window across three frames:

1. Recruiting activity arrives while tracker state is stale.
2. Signposted cells update to current state.
3. Sheet transitions to Outstanding Actions.

Required interaction:

- `1 of 3`, `2 of 3`, `3 of 3`
- two internal progression clicks
- one final `Continue` click
- back navigation allowed without refiring completion events
- normal completion within 15–20 seconds

This experience reuses the approved hero spreadsheet, stale-state logic, activity cues, and Outstanding Actions view.

## Current visual-production method

### Active tool

Claude Design is the current design environment for the hero reference and may produce editable HTML/CSS.

### Why HTML/CSS is authorized

The final hero is a layered marketing composition, not merely a functional spreadsheet. It requires controlled overlap, stale/current hierarchy, activity cues, annotations, responsive crops, and deterministic geometry. Editable HTML/CSS is therefore an appropriate reference medium.

### Google Sheets fidelity inputs

Use real current Google Sheets interface screenshots and measurements as design references for:

- toolbar hierarchy
- formula bar
- row numbers and column letters
- gridlines
- data-validation chips
- frozen-pane divider
- selected-cell state
- tab bar
- typography and compact density

A real Google Sheet may be created as a supporting fidelity reference, but it is not required to be the final layered asset. Do not allow a spreadsheet plugin to substitute generic workbook formatting for deliberate visual design.

### Required outputs for spreadsheet references

- editable source
- desktop render
- mobile render or deliberate crop
- fidelity audit
- list of real Google Sheets references used
- exact implemented dimensions and major measurements
- documented departures from native Sheets behavior

Do not use AI image generation for final spreadsheet-interface references because exact text and geometry must remain controlled.

## Active hero production sequence

Do not one-shot the complete hero again. Produce the system sequentially.

### Checkpoint 1: Current front spreadsheet window — ACTIVE

Build only the canonical current-state front sheet in editable HTML/CSS.

Review and correct:

- Google Sheets chrome fidelity
- typography
- toolbar/formula-bar proportions
- row and header density
- column widths
- gridlines
- status chips
- selected cell
- frozen divider
- sheet tabs
- alignment and truncation
- desktop readability
- mobile crop viability

Stop for Jon's review. Do not add the stale rear sheet, activity cues, or final hero composition before the front spreadsheet primitive is approved.

### Checkpoint 2: Stale rear-sheet variant

After Checkpoint 1 approval:

- reuse the exact same component and contacts
- replace current logistical values with the ratified stale values
- maintain identical static fields and row order
- make the stale layer subordinate through scale, contrast, and placement rather than inventing a different product
- keep stale content sufficiently legible to communicate change

Stop for review.

### Checkpoint 3: Gmail and Calendar activity cues

After stale-state approval, create a compact reusable activity-cue system using the exact ratified cue copy below.

Cues should feel like restrained utility annotations, not dashboard cards.

Stop for review.

### Checkpoint 4: Full desktop hero composition

Assemble:

- stale rear sheet
- current front sheet
- four activity cues
- responsibility labels
- controlled overlap and negative space

Review hierarchy, focal point, cue placement, and product comprehension.

Stop for approval.

### Checkpoint 5: Mobile hero treatment

Create a deliberate crop from the same system. Do not scale the entire desktop composition until unreadable and do not redesign it as cards.

Mobile priorities:

1. Name
2. Status
3. Next move
4. Days
5. Call where space allows

At least one Gmail cue and one Calendar cue should remain visible.

Stop for final hero approval.

### Checkpoint 6: Freeze reusable spreadsheet primitive

Once approved, freeze the underlying visual rules and use them for Section 3, Section 4, Section 5, and the funnel. Later scenes may change content and crop but must not independently redesign the spreadsheet grammar.

## Ratified hero implementation package

The following details are settled and must not be reinvented.

### Hero state relationship

- Rear and front sheets show the same tracker at two moments in time.
- Same five contacts, same row order.
- Name, Title, and Firm remain unchanged.
- Only Status, Next move, Last contact, Days, and Call update.
- Rear sheet depicts the `Blotter` tab in stale state; it is not a different tab or structurally different tracker.

### Document chrome copy

Document title:

`IB Recruiting Tracker`

Visible tabs:

- `Contacts`
- `Blotter`

Active tab:

`Blotter`

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

### Responsibility zones

`YOU ADD THE CONTACTS`

- Name
- Title
- Firm

`BLOTTER KEEPS IT CURRENT`

- Status
- Next move
- Last contact
- Days
- Call

Use a subtle divider between Firm and Status. Do not use heavy borders or full-zone background fills.

### Exact five contacts and static values

| Name | Title | Firm |
|---|---|---|
| Sarah Chen | Associate | JPMorgan |
| Marcus Lee | Analyst | Evercore |
| Priya Shah | Vice President | Lazard |
| Daniel Kim | Associate | Morgan Stanley |
| Alex Morgan | Analyst | Centerview |

### Exact stale rear-sheet values

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Sent | empty | Jan 12 | 4 | empty |
| Marcus Lee | Replied | Schedule call | Jan 15 | 1 | empty |
| Priya Shah | Call scheduled | Attend coffee chat | Jan 14 | 2 | Jan 16, 9:00 AM |
| Daniel Kim | Sent | empty | Jan 11 | 5 | empty |
| Alex Morgan | empty | empty | empty | empty | empty |

### Exact current front-sheet values

| Name | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---:|---|
| Sarah Chen | Replied | Reply to Sarah | Jan 16 | 0 | empty |
| Marcus Lee | Call scheduled | Attend coffee chat | Jan 15 | 1 | Jan 17, 2:00 PM |
| Priya Shah | Call completed | Send thank-you | Jan 16 | 0 | Completed Jan 16 |
| Daniel Kim | No reply | Bump thread | Jan 11 | 5 | empty |
| Alex Morgan | Sent | empty | Jan 16 | 0 | empty |

Do not paraphrase or replace the exact actions.

### Exact state-change causes

Sarah Chen:

- Sent → Replied
- blank next move → Reply to Sarah
- Jan 12 → Jan 16
- 4 days → 0 days
- Cause: Sarah replied by email

Marcus Lee:

- Replied → Call scheduled
- Schedule call → Attend coffee chat
- Call blank → Jan 17, 2:00 PM
- Cause: coffee chat appeared on Calendar

Priya Shah:

- Call scheduled → Call completed
- Attend coffee chat → Send thank-you
- Jan 14 → Jan 16
- 2 days → 0 days
- Jan 16, 9:00 AM → Completed Jan 16
- Cause: scheduled coffee chat occurred

Daniel Kim:

- Sent → No reply
- blank next move → Bump thread
- Cause: no reply within the follow-up window
- This is time-based; do not attach a Gmail or Calendar cue

Alex Morgan:

- blank → Sent
- Last contact blank → Jan 16
- Days blank → 0
- Cause: initial outreach email sent

### Exact activity cues

Gmail cue 1:

- Source: `Gmail`
- Primary: `Sarah Chen replied`
- Metadata: `Jan 16 · 10:42 AM`

Calendar cue 1:

- Source: `Calendar`
- Primary: `Coffee chat with Marcus Lee`
- Metadata: `Jan 17 · 2:00 PM`

Calendar cue 2:

- Source: `Calendar`
- Primary: `Coffee chat with Priya Shah completed`
- Metadata: `Jan 16 · 9:00 AM`

Gmail cue 2:

- Source: `Gmail`
- Primary: `Email sent to Alex Morgan`
- Metadata: `Jan 16 · 8:18 AM`

Do not add previews, subject lines, email bodies, avatars, bank logos, or extra metadata.

### Blank-cell treatment

- Use genuinely empty visible cells.
- Do not show hyphens, em dashes, `N/A`, `None`, placeholder text, or the word `empty`.
- Blank Status cells contain no chip.

### Status-chip system

Required statuses:

- Sent
- Replied
- Call scheduled
- Call completed
- No reply

Use restrained Google Sheets-style dropdown chips, not full-cell fills.

Suggested subtle visual direction:

- Sent: neutral gray-blue
- Replied: soft blue
- Call scheduled: soft violet/indigo
- Call completed: soft green
- No reply: muted amber, never red

### Selected-cell state

Preferred selected cell:

- Sarah Chen's Status cell
- coordinate `D2`
- visible value `Replied`
- formula/value bar also reads `Replied`

Use one native-looking selection border and handle. Do not select a large range.

### Alignment

- Name, Title, Firm: left
- Status: left-aligned chip
- Next move: left
- Last contact: one consistent measured choice, left or centered
- Days: centered
- Call: left
- All body content vertically centered

### Fidelity and design prohibitions

Reject outputs that look like:

- generic SaaS table
- CRM dashboard
- Airtable clone
- Excel dashboard
- formatted workbook rather than a designed reference
- finance terminal
- decorative browser card

Also reject:

- arbitrary red cells
- full-cell status fills
- oversized headers or rows
- detached banner strips across the sheet
- inconsistent alignment
- bottom-aligned numbers
- excessive rounded cards
- heavy gradients, glow, glassmorphism, or decorative effects
- invented product text or data

## Later WS5 implementation sequence

After the hero and spreadsheet primitive are approved:

1. Implement the approved page shell and exact WS4 copy in Lovable.
2. Build Section 2 scale and divergence visual.
3. Build Section 3 mechanism using the approved spreadsheet system.
4. Build Section 4 Outstanding Actions using the approved spreadsheet system.
5. Build Section 5 preservation using the approved spreadsheet system.
6. Build Section 6 privacy and permissions treatment.
7. Build Section 7 FAQ and closing CTA.
8. Implement the canonical funnel and three-frame product experience.
9. Add lead storage and export.
10. Wire the exact analytics system.
11. Verify claims and privacy language.
12. Complete responsive and accessibility QA.
13. Deploy privately.
14. Manually verify all events and lead records.
15. Obtain final WS5 approval and prepare WS6 handoff.

## Lovable instruction standard

Every substantive Lovable instruction must be derived from the canonical record and scoped to the active checkpoint. Each brief should include:

1. Authority and active checkpoint
2. Exact governing copy and decisions
3. Required components and data
4. Responsive behavior
5. Accessibility behavior
6. Instrumentation contracts where applicable
7. Explicit exclusions
8. Acceptance criteria
9. Mandatory stop point

Lovable is the implementation agent, not the product or design decision-maker. Do not authorize it to invent copy, sections, states, data, navigation, product capabilities, or later-stage workflow.

## Funnel implementation

Canonical path:

1. `funnel_started`
2. Two recruiting questions
3. Three-frame spreadsheet experience
4. Email capture
5. Price screen
6. Purchase-summary screen
7. Payment-choice click
8. Terminal confirmation

Use exact WS4 copy and interaction rules. Do not add social login, OAuth, extra demos, plan selection, annual billing, coupons, card fields, early beta disclosure, early availability disclosure, or pre-terminal demand-test language.

The terminal state is the first place that discloses Fall 2026 timing and confirms that no charge occurred.

## Lead handling

Minimum lead record:

- Recruiting email
- Recruiting track
- Recruiting window
- Surface variant
- CTA location
- Session or visitor identifier
- Timestamp
- Funnel stage reached

Do not put recruiting email into general analytics event properties. Store it only in the lead system.

## Analytics implementation

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

- No separate `cta_clicked` event
- Each intended milestone counts at most once per visitor
- Back navigation and refresh must not duplicate completion events
- CTA origin persists through all funnel screens
- Recruiting email remains outside general analytics properties
- Vendor selection is an implementation decision; event names and meanings are fixed

## Instrumentation-ready build rule

Before vendor wiring:

- use one reusable CTA component with `cta_location`
- preserve hero, post-Section-4, and final-closing origins
- use one shared funnel state model
- define explicit milestone boundaries
- retain CTA origin through the flow
- support event deduplication
- keep funnel shell reusable for the later platform variant

Do not silently select or install an analytics vendor during visual production.

## Claim and privacy verification gate

Before private approval, verify or revise:

- former Goldman authority line
- case-study counts and JPMorgan offer wording
- 60-hour estimate and methodology
- provider identity and role
- Google scopes and consent-screen language
- retention, deletion, and privacy-policy claims
- third-party subprocessors and disclosures

Where implementation truth is unavailable, use only provisional WS4 wording and do not publish stronger claims.

## Responsive and accessibility requirements

- Desktop, tablet, and mobile navigation
- Readable spreadsheet crops
- No page-level horizontal scrolling
- 16px minimum body text
- 44px minimum touch targets
- Visible keyboard focus
- Keyboard-operable funnel and accordions
- Reduced-motion support
- Full-screen mobile funnel
- No hover-only meaning
- Semantic heading order
- Clear form labels and validation
- Buttons for actions, links for navigation
- Accordion state exposed to assistive technology
- Sufficient contrast
- Logical reading order independent of desktop visual placement

## Private deployment and QA

The page remains private until WS5 completion.

Required QA includes:

1. Seven sections in exact order.
2. Three CTA locations enter the same funnel.
3. Question options and ordering match WS3.
4. Product experience uses the approved three frames and remains under 20 seconds.
5. Email screen uses exact copy and does not imply OAuth, beta timing, or school-email restriction.
6. Price first appears after email submission.
7. Purchase summary has no card fields or premature demand-test disclosure.
8. Payment choices trigger the canonical event and reach terminal.
9. Terminal is first availability disclosure and includes `You have not been charged.`
10. All nine events fire with correct properties.
11. No double firing on back navigation or refresh.
12. Lead records store correctly and export.
13. Mobile and desktop preserve content priority.
14. Claims and privacy pass verification.
15. Interactive behavior does not imply production integrations.
16. All spreadsheet scenes use the approved visual system.
17. Spreadsheet chrome and interaction grammar remain consistent.
18. Jon approved the hero and reusable spreadsheet primitive before broad spreadsheet-scene production.

## Manual analytics verification

Before final approval:

- one complete session from each CTA location
- at least one desktop and one mobile session
- each recruiting-track branch and recruiting-window option tested across the verification set
- card and Apple Pay paths tested where supported
- browser actions, lead records, and analytics events compared manually
- event payload screenshots or logs recorded
- all instrumentation incidents repaired before traffic

## Test parity constraint

Build the funnel shell so WS7 can reuse the same question screens, email capture, price screen, purchase-summary screen, terminal state, event names, and interaction burden. Only the surface-specific product experience should require material replacement.

## Deliverables

- Approved hero spreadsheet composition
- Approved reusable spreadsheet visual system
- Editable spreadsheet-reference source and renders
- Scale/divergence visual
- Mechanism visual
- Outstanding Actions visual
- Preservation visual
- Privacy and permissions treatment
- Lovable project
- Responsive seven-section page
- Functional canonical funnel
- Lead storage and export path
- Analytics event map and implementation
- Private deployment URL
- Manual verification record
- Implementation decision log
- Deviations or unresolved conflicts list
- Updated canonical documentation

## Completion gate

WS5 is complete only when:

- the private spreadsheet page is visually and functionally approved
- the hero and all spreadsheet scenes pass the fidelity gate
- all claim and privacy language is supportable
- all nine events are manually verified
- lead capture is verified
- responsive and accessibility checks pass
- the page remains private
- repository and handoff are updated for WS6

## Exact next action

Continue in Claude Design with **Checkpoint 1 only**: build and refine the current front-facing `IB Recruiting Tracker` spreadsheet window in editable HTML/CSS using the exact current-state data and visual rules in this specification.

Present the desktop render, mobile crop, editable source, and fidelity audit to Jon.

Stop before creating the stale rear sheet, Gmail/Calendar cues, full hero composition, other page visuals, or additional Lovable implementation.
