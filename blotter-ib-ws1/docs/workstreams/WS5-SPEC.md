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

## Ratified shell foundation

Ratified July 30, 2026.

### Brand naming and logo reference

- The public-facing brand name is `blotter`, not `Blotter IB`.
- Use the archived technical-and-design material only to recover the established logo treatment. It has no authority over the page layout, palette, typography system, section design, or broader visual direction.
- The archived logo reference identifies Space Grotesk 700 plus Archivo 600 as the prior wordmark typography. This may guide faithful reconstruction of the wordmark only.
- Do not inherit the archived page formatting or style.

### Page character and palette

- Use a white and light-cream foundation.
- Navy blue is the Blotter anchor color.
- Blue should be used selectively rather than dominating the page.
- The overall page should feel warmer and more inviting while remaining professional, highly readable, credible, and visually interesting.
- Restrained gradients are permitted when they serve hierarchy or atmosphere. They are not required and must not reduce legibility or compete with the spreadsheet product proof.
- Avoid excessive navy fills or a cold, uniformly blue page.

### Typography and shell structure

- Use a modern sans-serif marketing typography system. Do not use the unapproved editorial-serif direction generated in the first Lovable scratch shell.
- Use exact ratified WS4 copy where needed to test real headline wrapping, line length, hierarchy, and spacing. Do not use generic placeholder copy for approval of the shell.
- Header structure: `blotter` wordmark, `How it works`, `Privacy`, `FAQ`, and the exact CTA `See how Blotter works`.
- Navigation labels must map to ratified sections. Do not invent additional navigation architecture.
- Preserve a clear width system, responsive gutters, disciplined vertical rhythm, 16px minimum body text, 44px minimum touch targets, visible keyboard focus, and no page-level horizontal scrolling.

### Status of the first Lovable output

- The initial Lovable project is valid implementation scaffolding only.
- Its Newsreader serif, IBM Plex pairing, warm-paper treatment, placeholder navigation, and placeholder copy are not approved visual decisions.
- Reusable structural code may remain only where it supports the ratified shell direction.
- The corrected shell must be presented to Jon and approved before it is treated as the visual foundation.

## Instrumentation-ready build rule

Analytics vendor wiring occurs later in WS5, but the page and funnel must be structured for the exact WS3 measurement system from the beginning.

During component and interaction design:

- Use one reusable CTA component with required `cta_location` support.
- Preserve stable CTA origins for hero, post-Section-4, and final-closing entry.
- Use one shared funnel state model.
- Define explicit milestone boundaries corresponding to the nine canonical WS3 events.
- Persist CTA origin through every funnel screen.
- Keep recruiting email out of general analytics properties.
- Design for event deduplication on back navigation and refresh.
- Keep the funnel shell reusable for the later platform variant.

Do not select or silently install an analytics vendor during the shell or spreadsheet-fidelity checkpoint. Vendor selection, event wiring, and manual payload verification occur after the page and funnel interactions exist. The canonical event names and meanings are already fixed and are not Lovable design choices.

## Lovable instruction standard

Every substantive Lovable instruction must be derived from the canonical record and scoped to the active checkpoint. Each implementation brief should include, as applicable:

1. Authority and current checkpoint
2. Exact governing decisions and copy
3. Required components and data
4. Responsive behavior
5. Accessibility behavior
6. Instrumentation contracts
7. Explicit exclusions
8. Acceptance criteria
9. Mandatory stop point

Do not give Lovable broad authority to redesign settled content or complete later WS5 stages. Do not treat a natural-language summary as a substitute for the detailed canonical specification relevant to the active task.

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

Correct the existing Lovable scratch shell to the ratified shell foundation. Use exact representative WS4 copy, the `blotter` wordmark, white and light-cream surfaces, selective navy anchoring, restrained optional gradients, modern sans-serif typography, and the approved navigation labels. Preserve instrumentation-ready component contracts but do not wire an analytics vendor. Present the corrected shell to Jon for approval and stop before beginning the Google Sheets reference and spreadsheet-window prototype.
