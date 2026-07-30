# Blotter IB — Start Here

Date last updated: July 30, 2026

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Landing-page proposition and experience design.

Confirmed sequence:

1. Workstream 1: continuity and source-of-truth setup. Complete.
2. Workstream 2: spreadsheet-native proposition. Complete.
3. Workstream 3: conversion and measurement design. Complete.
4. Workstream 4: spreadsheet landing-page content and experience design. Active.
5. Workstream 5: spreadsheet-page Lovable implementation, instrumentation, and private deployment.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.
9. Use market evidence to continue, revise, retest, or stop investment.
10. Do not build meaningful backend functionality until market evidence guides it.

Landing-page content and experience design must occur before Lovable implementation. Lovable is the implementation and visual-iteration environment, not the place where the project first decides what the page is trying to communicate.

## Current workstream

Workstream 4: Spreadsheet landing-page content and experience design.

Status: In progress.

Exact next action: define the high-level page narrative and section sequence before writing isolated copy or selecting detailed visuals.

Read `docs/workstreams/WS4-SPEC.md` for the active durable specification.

## Durable workstream specifications

Permanent cumulative workstream records live under:

`docs/workstreams/`

Current files:

- `docs/workstreams/WS2-SPEC.md`: complete spreadsheet-native proposition specification.
- `docs/workstreams/WS3-SPEC.md`: complete conversion and measurement specification.
- `docs/workstreams/WS4-SPEC.md`: active spreadsheet landing-page content and experience specification.

These files survive handoff rewrites and must be used during later design and build work. `CURRENT-HANDOFF.md` contains temporary resumption context only.

## Workstream 2 outcome

Workstream 2 established:

- the July audience is pre-decay and the page sells prevention;
- live recruiting activity outpaces manual spreadsheet upkeep;
- cumulative volume and inconsistent upkeep make the tracker stale and unreliable;
- the student maintains contacts and static information;
- Blotter maintains changing recruiting activity from relevant Gmail and Calendar signals;
- the core outcome is one accurate, current source of truth;
- benefits are accuracy, time saved, everything in one place, and prevention of slippage;
- the minimum visible offer includes auto-capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow;
- the spreadsheet proposition must emphasize preservation of the existing tracker and low switching cost;
- Blotter is an orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, learning content, or a jobs board.

Read `docs/workstreams/WS2-SPEC.md` for the complete record.

## Workstream 3 outcome

Workstream 3 established the complete matched conversion and measurement system:

- identical multi-stage funnel across spreadsheet and platform surfaces;
- CTA origin tracked through `cta_location`;
- two-question recruiting configuration;
- one 15 to 20 second maximum product experience before email capture;
- transparent recruiting-email capture without actual or simulated OAuth;
- Gmail, Sheets, and Calendar shown as the product engine;
- one $9.99 monthly price inside the funnel after email capture;
- separate checkout screen and payment-choice click without card entry or payment collection;
- real Fall 2026 approximately 300-person beta-cohort confirmation;
- identical nine-event analytics architecture;
- ratified metric hierarchy, read rules, commercial-demand bands, low-sample requirements, and reporting rules;
- no permanent or bounded project kill condition;
- a frozen measurement period, with material changes creating a new labeled iteration.

Read `docs/workstreams/WS3-SPEC.md` for the complete funnel, event definitions, benchmark derivation, thresholds, and downstream constraints.

## Workstream 4 objective

Produce a coherent, build-ready content and experience specification for the spreadsheet-native landing page before Lovable implementation.

Workstream 4 should resolve:

1. Page narrative and section order.
2. Headline, subhead, CTA, and supporting copy.
3. Recruiting-volume statistics and proof devices.
4. Hero and before-versus-after composition.
5. Spreadsheet product demonstration and action-focused view.
6. Exact funnel product-experience frames and clicks.
7. Gmail, Sheets, and Calendar mechanism visualization.
8. Privacy, permissions, trust, and FAQ content.
9. Exact CTA wording and placement.
10. $9.99 price, checkout, and terminal-state copy.
11. Responsive content priorities and Workstream 5 implementation constraints.

Workstream 4 does not begin Lovable implementation, design the platform page, specify backend logic, or design real OAuth architecture.

## Current confirmed constraints

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical documents and workstream specifications are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Build market evidence before meaningful backend buildout.
- Round one compares spreadsheet-native versus platform surfaces.
- The spreadsheet page is designed and built first.
- Both pages ultimately launch at roughly the same time.
- Both pages must use the identical funnel, price, event set, and read rules.
- Analytics must be verified by hand before public traffic.
- `03-page-spec.md` is a working baseline, not final truth.
- Do not begin Lovable implementation before Workstream 4 produces a coherent build-ready brief.

## Required reading for a new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS4-SPEC.md`
4. `docs/workstreams/WS2-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/05-working-agreement.md`
7. Only the additional canonical files named in the handoff or needed for the exact task

Do not rely on the handoff alone for durable workstream decisions.

## Repository and archive rules

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Workstream specifications path:

`blotter-ib-ws1/docs/workstreams/`

Historical archive path:

`blotter-ib-ws1/archive/`

Archived material is historical context only. Re-evaluate it against current confirmed decisions before reuse.

## Canonical file map

- `00-START-HERE.md`: current-state index and reading order.
- `01-project-and-product.md`: durable project and product context.
- `02-strategy-and-test.md`: validation strategy and test structure.
- `03-page-spec.md`: spreadsheet-page working baseline.
- `04-decision-log.md`: concise confirmed, rejected, and cross-project rulings.
- `05-working-agreement.md`: operating and documentation-maintenance rules.
- `06-assumptions-and-open-questions.md`: unsettled items only.
- `workstreams/WS2-SPEC.md`: complete spreadsheet proposition specification.
- `workstreams/WS3-SPEC.md`: complete conversion and measurement specification.
- `workstreams/WS4-SPEC.md`: active spreadsheet landing-page design specification.
- `CURRENT-HANDOFF.md`: temporary immediate resumption context and exact next action.
