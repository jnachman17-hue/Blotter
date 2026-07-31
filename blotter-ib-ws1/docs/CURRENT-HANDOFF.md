# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Begin Workstream 5: spreadsheet-page Lovable implementation, instrumentation, private deployment, and manual verification.

Workstreams 1 through 4 are complete. The WS4 hero, Sections 2 through 7, spreadsheet-specific product experience, exact funnel presentation copy, responsive priorities, and coherence safeguards are ratified and closed.

WS5 is active.

## 2. Required reading

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS5-SPEC.md`
4. `docs/workstreams/WS4-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/workstreams/WS2-SPEC.md`
7. `docs/05-working-agreement.md`
8. Only additional canonical files needed for the exact task

## 3. Source-of-truth rules

- Jon's explicit instructions are highest authority.
- WS4 controls page copy, visuals, demo sequence, responsive priorities, and claim boundaries.
- WS3 controls funnel architecture, price, events, measurement, and read rules.
- Do not reopen WS2, WS3, the hero, Sections 2 through 7, or the ratified funnel presentation unless implementation reveals a genuine conflict.
- Do not silently revise ratified copy or sequencing in Lovable.
- Do not reveal demand testing, beta status, Fall 2026 timing, future availability, or no-charge status before the payment-choice click.
- No real OAuth, Gmail integration, payment collection, or production backend is part of WS5.

## 4. Ratified spreadsheet product experience

Use one stable Google Sheets window across three frames with required `1 of 3`, `2 of 3`, and `3 of 3` indicators.

1. Recruiting activity arrives while the tracker is stale.
2. The signposted cells update to current state.
3. The sheet transitions to the ratified Outstanding Actions view.

Two internal progression clicks lead to one final `Continue` click. Back navigation is allowed and must not refire completion events. The experience must remain within the WS3 15 to 20 second ceiling.

Read `WS4-SPEC.md` for exact frame copy, mock data, cell states, queue rows, button wording, and responsive behavior.

## 5. Ratified funnel presentation

- Question 1 remains `What are you recruiting for?`; button `Continue`.
- Question 2 is `Which recruiting window best fits you?`; button `Continue`.
- Email capture uses `Continue with your recruiting email.` and `Enter the email address where you conduct recruiting.`
- No school-email restriction, fixed placeholder, static privacy note, or beta language appears on email capture.
- Price screen presents Blotter at `$9.99 / month`, billed monthly, cancel anytime.
- Purchase summary uses `Complete your purchase`, shows `$9.99` due today, and offers `Pay with card` and Apple Pay where supported.
- No card-entry form appears.
- Terminal state is the first availability disclosure and confirms the limited Fall 2026 cohort plus `You have not been charged.`

## 6. First WS5 build gate

Do not begin by building the full page.

1. Create the Lovable project.
2. Implement only the global shell and typography hierarchy.
3. Build one reusable high-fidelity Google Sheets-style spreadsheet-window component.
4. Compare it against real Google Sheets visual references.
5. Present it to Jon for review.
6. Correct and freeze the approved primitive.
7. Only then build the hero, Section 3, Section 4, Section 5, and funnel spreadsheet scenes.

The spreadsheet component must consistently control toolbar depth, column letters, row numbers, gridlines, cell padding and height, headers, frozen panes, tabs, selection states, status controls, typography, activity chips, and responsive crops.

## 7. Build state

- No approved Lovable implementation exists yet.
- No public traffic should be sent.
- Provider verification, domain routing, lead-storage tooling, and analytics vendor selection remain WS5 implementation decisions.
- Analytics must be manually verified before public traffic.
- The spreadsheet page remains private until WS5 completion gates pass.

## 8. Exact next action

Create the Lovable project and implement only the global page shell, typography hierarchy, and reusable spreadsheet-window fidelity prototype. Present that prototype to Jon for visual approval before adding detailed page scenes or funnel logic.
