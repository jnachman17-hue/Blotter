# Workstream 5 Specification

Date created: July 30, 2026
Status: Active
Workstream: Spreadsheet-page Lovable implementation and private verification

## Objective

Implement the complete spreadsheet-native landing page and matched canonical funnel in Lovable, instrument the WS3 analytics system, deploy privately, and verify responsive behavior, claims, events, lead handling, and spreadsheet-interface fidelity before acquisition work or platform-page implementation.

## Source hierarchy

1. Jon's explicit instructions in the active chat
2. `docs/workstreams/WS4-SPEC.md` for page narrative, exact copy, visuals, product experience, responsive rules, and claim boundaries
3. `docs/workstreams/WS3-SPEC.md` for funnel architecture, analytics, price, measurement, and read rules
4. `docs/workstreams/WS2-SPEC.md` for proposition boundaries
5. `docs/05-working-agreement.md` for operating and documentation rules

Do not use `03-page-spec.md` or archived design files to override the workstream specifications.

## Scope

Build:

- Seven-section spreadsheet landing page
- Three CTA placements
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

Do not build:

- Real Gmail, Calendar, or Sheets integrations
- Real OAuth
- Card-entry or payment collection
- Platform landing page
- Production backend logic
- Public acquisition campaign

## Required page build

Implement the seven sections in the exact WS4 order. Preserve all ratified wording unless a real implementation conflict exists. Use the confirmed CTA labels and `cta_location` values.

Visual direction:

- Calm, credible, high-finance-adjacent product design
- Google Sheets-native product surfaces
- Strong typography and spacing, restrained color, minimal decorative effects
- No inherited authority from prior token files or scrapped platform pixels
- No fake Google authentication screens
- No security-seal aesthetics

## Component model

Recommended component groups:

- Global navigation and footer
- Section shell and typography primitives
- Spreadsheet window
- Activity chip
- Stat block
- Outstanding-action group
- Reassurance strip
- Permissions block
- FAQ accordion
- CTA block
- Funnel shell
- Recruiting question screen
- Product-experience frame
- Email form
- Price screen
- Purchase-summary screen
- Terminal screen

Keep copy and mock data in structured configuration objects where practical so the later platform variant can reuse the funnel shell without reimplementing event semantics.

## Spreadsheet visual-fidelity gate

The spreadsheet visuals are core product proof, not generic decorative tables. Do not rely on text prompts alone and do not build all page scenes before the spreadsheet primitive is reviewed.

### Required reusable component

Create one reusable, high-fidelity spreadsheet-window component before implementing the hero, Section 3 mechanism, Section 4 outstanding actions, Section 5 preservation visual, or funnel product experience.

That component must define and consistently control:

- Browser or application-window crop
- Google Sheets-style toolbar depth and hierarchy
- Column letters and row numbers
- Gridline weight
- Cell padding and row height
- Header styling
- Frozen-column or frozen-pane treatment where used
- Sheet tabs
- Selected-cell state
- Dropdown and status-chip treatment
- Font size, alignment, and truncation behavior
- Placement of Gmail and Calendar activity chips outside or over the sheet
- Desktop, tablet, and mobile crops

Every spreadsheet scene must use the same underlying component, spacing rules, typography, chrome, grid treatment, and interaction grammar. Do not allow each section to invent a different spreadsheet approximation.

### Fidelity risks to prevent

Reject implementations where:

- The product surface looks like a generic SaaS data table rather than a familiar spreadsheet
- Toolbar, tabs, row numbers, column letters, gridlines, selection states, or status controls are inconsistent
- The hero, mechanism, actions view, preservation view, and funnel demo appear to come from different products
- Desktop mockups are simply scaled down until unreadable on mobile
- Decorative effects overpower spreadsheet legibility

### Required review workflow

1. Build the global shell and one spreadsheet-window fidelity prototype.
2. Compare it against real Google Sheets visual references.
3. Present the component to Jon for visual review before building all spreadsheet scenes.
4. Correct the component until it convincingly resembles a Google Sheets-native workflow while remaining clearly a Blotter marketing prototype.
5. Freeze the approved component as the reusable visual primitive.
6. Build the hero, Section 3, Section 4, Section 5, and funnel demo from that primitive.

Do not treat the first Lovable output as automatically approved.

### Reference assets

WS5 may use:

- Screenshots of actual Google Sheets interface elements as private design references
- Annotated layout references
- Simple static mockups of each core product scene
- Exact mock data, cell states, column widths, and status values

Reference assets guide fidelity and consistency. They must not imply Google sponsorship, endorsement, or affiliation, and the public page must not reproduce Google branding in a misleading way.

### Spreadsheet fidelity completion test

The spreadsheet primitive is approved only when:

- It is immediately recognizable as a Google Sheets-style workflow rather than a generic table
- All major spreadsheet scenes visibly belong to one system
- Product-relevant text remains readable at the intended viewport
- Responsive crops preserve meaning without page-level horizontal scrolling
- Jon has reviewed and approved the component before broad scene production

## Funnel implementation

The canonical path is:

1. `funnel_started`
2. Two recruiting questions
3. Three-frame spreadsheet experience
4. Email capture
5. Price screen
6. Purchase-summary screen
7. Payment-choice click
8. Terminal confirmation

Use the exact copy and interaction rules in WS4. Do not add onboarding questions, social login, OAuth, extra demos, plan selection, annual billing, coupons, card fields, early beta disclosure, early availability disclosure, or pre-terminal demand-test language.

The flow must remain transaction-like through the payment-choice click. The terminal state is the first place that discloses Fall 2026 timing and confirms no charge occurred.

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

Do not put the recruiting email into general analytics event properties. Store it in the lead system only.

The form tool is not preselected. Choose the simplest implementation that reliably stores leads and supports export. Document the choice and data location.

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

- No separate `cta_clicked` event.
- Each event counts at most once per visitor for the same intended milestone.
- Back navigation must not duplicate completion events.
- Refresh behavior and session persistence must be documented.
- CTA origin must persist through all funnel screens.
- Analytics vendor selection is an implementation decision, but event names and meanings are not.

## Claim and privacy verification gate

Before private approval, verify or revise:

- Former Goldman authority line
- Case-study counts and JPMorgan offer wording
- 60-hour estimate and methodology
- Provider identity and role
- Google scopes and consent-screen language
- Retention, deletion, and privacy-policy claims
- Third-party subprocessors and disclosures

Where implementation truth is not yet available, use only the provisional provider wording in WS4 and do not publish stronger claims.

## Responsive requirements

Implement the exact responsive priorities in WS4. Required checks:

- Desktop, tablet, and mobile navigation
- Readable spreadsheet crops
- No page-level horizontal scroll
- 16px minimum body text
- 44px minimum touch targets
- Visible keyboard focus
- Keyboard-operable funnel and accordions
- Reduced-motion support
- Full-screen mobile funnel
- No hover-only meaning

## Accessibility requirements

- Semantic heading order
- Form labels and clear validation errors
- Buttons for actions, links for navigation
- Accordion state exposed to assistive technology
- Sufficient text and control contrast
- Focus containment and escape behavior for modal implementation
- Logical reading order independent of desktop visual placement

## Private deployment and QA

Deploy privately before any public traffic.

QA checklist:

1. All seven sections appear in order.
2. Exact CTA locations enter the same funnel.
3. Funnel question options and order match WS3.
4. Product experience uses the ratified three frames, required progress indicator, clear cell-change signposting, and normal completion under 20 seconds.
5. Email screen uses the exact WS4 copy and does not imply OAuth, beta timing, or school-email restriction.
6. Price first appears after email submission and uses the exact current-product wording.
7. Purchase summary has no card fields and contains no pre-terminal demand-test, beta, future-availability, or no-charge disclosure.
8. Payment choices trigger the canonical event and reach the terminal screen.
9. Terminal state is the first availability disclosure and includes `You have not been charged.`
10. All nine events fire with correct properties.
11. Events do not double-fire on back navigation or refresh.
12. Lead records store correctly and can be exported.
13. Mobile and desktop layouts preserve content priority.
14. Claims and privacy language pass the verification gate.
15. No production integration is implied by interactive behavior.
16. All spreadsheet scenes use the approved reusable spreadsheet-window component.
17. Spreadsheet chrome, grids, cell states, tabs, typography, and responsive crops remain consistent across the page and funnel.
18. Jon approved the spreadsheet fidelity prototype before broad scene production.

## Manual analytics verification

Before approval:

- Run one complete session from each CTA location.
- Run at least one desktop and one mobile session.
- Test each recruiting-track branch and each recruiting-window option at least once across the verification set.
- Test card and Apple Pay paths where supported.
- Compare browser actions, lead records, and analytics events manually.
- Record screenshots or logs of expected event payloads.
- Document any instrumentation incident and repair before traffic.

## Test parity constraint

Build the funnel shell so WS7 can reuse the same question screens, email capture, price screen, purchase-summary screen, terminal state, event names, and interaction burden. Only the surface-specific product experience should require material replacement.

Do not introduce spreadsheet-only friction reductions that cannot be matched on the platform page.

## Deliverables

- Lovable project
- Private deployment URL
- Responsive page implementation
- Approved reusable spreadsheet-window component
- Spreadsheet visual-reference package or annotated reference set
- Functional prototype funnel
- Lead storage and export path
- Analytics event map
- Manual verification record
- Implementation decision log
- List of any deviations or unresolved conflicts
- Updated canonical GitHub documentation

## Completion gate

Workstream 5 is complete only when:

- The private spreadsheet page is visually and functionally approved.
- The spreadsheet-window component and all spreadsheet scenes pass the fidelity gate.
- All claim and privacy language is supportable for the prototype.
- All nine events are manually verified.
- Lead capture is verified.
- Responsive and accessibility checks pass.
- The page remains private.
- The repository and handoff are updated for Workstream 6.

## Exact next action

Create the Lovable project and implement only the global page shell, typography hierarchy, and one reusable spreadsheet-window fidelity prototype. Present that prototype to Jon for review before adding detailed section visuals or funnel logic.
