# Blotter IB — Start Here

Date last updated: July 30, 2026

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Spreadsheet-page implementation and private verification.

Confirmed sequence:

1. Workstream 1: continuity and source-of-truth setup. Complete.
2. Workstream 2: spreadsheet-native proposition. Complete.
3. Workstream 3: conversion and measurement design. Complete.
4. Workstream 4: spreadsheet landing-page content and experience design. Complete.
5. Workstream 5: spreadsheet-page Lovable implementation, instrumentation, and private deployment. Active.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.
9. Use market evidence to continue, revise, retest, or stop investment.
10. Do not build meaningful backend functionality until market evidence guides it.

## Current workstream

Workstream 5: Spreadsheet-page Lovable implementation and private verification.

Status: Active.

Exact next action: create the Lovable project and implement the global shell, section sequence, typography hierarchy, and reusable spreadsheet-window component.

Read `docs/workstreams/WS5-SPEC.md` for the active implementation specification.

## Durable workstream specifications

Permanent cumulative records live under `docs/workstreams/`:

- `WS2-SPEC.md`: complete spreadsheet-native proposition
- `WS3-SPEC.md`: complete conversion and measurement system
- `WS4-SPEC.md`: complete spreadsheet landing-page content and experience system
- `WS5-SPEC.md`: active Lovable implementation and verification specification

`CURRENT-HANDOFF.md` contains temporary resumption context only.

## Workstream 2 outcome

WS2 established the pre-decay prevention proposition, manual-tracker failure mode, split between student-maintained contacts and Blotter-maintained activity, operational-control outcome, minimum visible offer, low-switching-cost requirement, and product boundaries.

## Workstream 3 outcome

WS3 established the matched funnel, two recruiting questions, one pre-email product experience, transparent email capture, delayed $9.99 monthly price, checkout mechanics, beta terminal state, nine-event analytics architecture, metric hierarchy, read rules, thresholds, sample requirements, and reporting rules.

## Workstream 4 outcome

WS4 established:

- The complete seven-section spreadsheet-page narrative and exact copy
- Hero, scale, mechanism, outstanding-actions, preservation, privacy, FAQ, and closing compositions
- Three CTA placements and wording
- A three-frame, three-click, 15 to 20 second spreadsheet product experience
- Exact email, price, checkout, and terminal-state copy
- Responsive priorities for all sections and the funnel
- Full-page coherence and claim-support rules
- Lovable-ready implementation constraints

Read `docs/workstreams/WS4-SPEC.md` for the complete record.

## Workstream 5 objective

Implement and privately verify the spreadsheet-native page without changing the validated content architecture.

WS5 includes:

1. Lovable project and reusable component system
2. Seven-section page implementation
3. Canonical funnel implementation
4. Lead capture and export
5. Exact analytics event wiring
6. Claim and privacy verification
7. Responsive and accessibility QA
8. Private deployment
9. Manual analytics verification

WS5 does not launch traffic, build the platform page, implement real integrations, or collect payment.

## Current confirmed constraints

- Jon's explicit instructions are highest authority.
- GitHub canonical documents are the durable source of truth.
- Build market evidence before meaningful backend buildout.
- The spreadsheet page is designed and built first.
- Both variants ultimately launch at roughly the same time.
- Both variants use the identical funnel, price, event set, and read rules.
- Analytics must be verified by hand before public traffic.
- `03-page-spec.md` is a working baseline, not final truth.
- Old design-token files and prior platform pixels are not authoritative.
- No public traffic during WS5.

## Required reading for a new chat

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS5-SPEC.md`
4. `docs/workstreams/WS4-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/workstreams/WS2-SPEC.md`
7. `docs/05-working-agreement.md`
8. Only additional canonical files needed for the exact task

## Repository and archive rules

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Workstream specifications path:

`blotter-ib-ws1/docs/workstreams/`

Historical archive path:

`blotter-ib-ws1/archive/`

Archived material is historical context only.

## Canonical file map

- `00-START-HERE.md`: current-state index and reading order
- `01-project-and-product.md`: durable project and product context
- `02-strategy-and-test.md`: validation strategy and test structure
- `03-page-spec.md`: working page baseline, not automatically final truth
- `04-decision-log.md`: concise cross-project rulings
- `05-working-agreement.md`: operating and documentation rules
- `06-assumptions-and-open-questions.md`: unsettled items only
- `workstreams/WS2-SPEC.md`: complete proposition specification
- `workstreams/WS3-SPEC.md`: complete conversion and measurement specification
- `workstreams/WS4-SPEC.md`: complete content and experience specification
- `workstreams/WS5-SPEC.md`: active implementation and verification specification
- `CURRENT-HANDOFF.md`: temporary immediate resumption context
