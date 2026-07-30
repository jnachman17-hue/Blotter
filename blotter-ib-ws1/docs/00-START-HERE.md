# Blotter IB — Start Here

Date last updated: July 30, 2026

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce market evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Validation design and landing-page proposition development.

The confirmed workstream sequence is:

1. Workstream 1: continuity and source-of-truth setup.
2. Workstream 2: spreadsheet-native proposition.
3. Workstream 3: CTA, conversion goal, lead-capture flow, analytics architecture, event parity, and read rules.
4. Workstream 4: spreadsheet landing-page content and experience design.
5. Workstream 5: spreadsheet-page Lovable implementation, instrumentation, and private deployment.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.
9. Use market evidence to continue, revise, retest, or kill the project.
10. Do not build meaningful backend functionality until market evidence guides it.

Landing-page content and experience design must occur before Lovable implementation. Lovable is the implementation and visual-iteration environment, not the place where the project first decides what the page is trying to communicate.

## Current workstream

Workstream 3: Conversion and measurement design.

Status: In progress, approximately 65 to 70 percent complete.

Workstreams 1 and 2 are complete.

## Durable workstream specifications

Every substantive workstream now has a permanent specification file under:

`docs/workstreams/`

These files are the detailed, cumulative record of what each workstream produced. They must survive future handoff rewrites and must be used during later design and build work.

Current workstream specifications:

- `docs/workstreams/WS2-SPEC.md`: complete spreadsheet-native proposition specification.
- `docs/workstreams/WS3-SPEC.md`: active conversion and measurement specification.

Future chats must update the active workstream specification whenever Jon ratifies, rejects, supersedes, or materially revises a decision. `CURRENT-HANDOFF.md` is temporary resumption context and must never be the only record of a confirmed decision.

The full maintenance rules are in `05-working-agreement.md`.

## Workstream 2 outcome

Workstream 2 established the spreadsheet-native proposition at landing-page-test resolution:

- The July audience is pre-decay because of the recruiting calendar. The page sells prevention now and may sell rescue later in peak season.
- The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- Tracker decay is caused by cumulative volume and inconsistent upkeep. The sheet becomes stale, inconsistent, and no longer reflects reality.
- The student chooses and enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain the changing side of the tracker.
- The core outcome is operational control through one accurate, current source of truth, emphasizing accuracy, time saved, everything in one place, and prevention of slippage.
- The minimum offer includes automatic activity capture, visually legible contact state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- The spreadsheet-native proposition must emphasize low switching cost and preservation of the student's existing tracker.
- Blotter is an orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or an AI slop platform.
- Exact columns, statuses, sorting or grouping mechanics, page copy, and visual design remain later design decisions rather than product specifications.

Read `docs/workstreams/WS2-SPEC.md` for the full durable record.

## Workstream 3 objective

Define what visitor behavior the matched landing-page test is trying to produce, how that behavior will be captured, and how the resulting data will be interpreted before either page is built.

Workstream 3 should resolve:

1. Primary conversion goal and graded intent signals.
2. CTA behavior at a conceptual level.
3. Lead-capture flow and information collected at each step.
4. Price and purchase-intent treatment in round one.
5. Identical analytics event set for spreadsheet and platform pages.
6. Event definitions, naming, and measurement architecture.
7. Read rules written before data exists.
8. Success, failure, and ambiguous-result thresholds.
9. Any conversion-design constraints Workstream 4 must preserve.

Workstream 3 should not write the full landing page, settle final visual design, specify detailed product logic, or begin Lovable implementation.

## Workstream 3 confirmed progress

The following are confirmed:

- Round one uses an identical multi-stage funnel across spreadsheet and platform pages.
- All primary CTAs enter the same canonical funnel and CTA origin is stored through `cta_location`.
- The funnel is: CTA entry, two-question recruiting configuration, concise product experience, recruiting-email capture, one monthly price inside the funnel, checkout progression, payment-choice click, and Fall 2026 first-cohort confirmation.
- The product experience occurs once before email capture, lasts approximately 15 to 20 seconds maximum, and uses simple click-to-progress rather than requiring animation.
- Exact demo visuals and the relationship between the funnel experience and landing-page hero are deferred to Workstream 4.
- Recruiting-track and recruiting-window segmentation options are settled.
- Email capture is transparent and does not use actual or simulated OAuth.
- Gmail, Sheets, and Calendar must still be shown as the engine driving the product.
- Price appears only inside the funnel and is not the round-one test variable.
- Checkout culminates in a payment-choice click, which is the strongest commercial-demand signal.
- No card-entry form, payment credentials, or money are collected.
- The terminal state confirms a real place in the approximately 300-person Fall 2026 first beta cohort.
- The identical analytics event set and minimum event properties are confirmed.
- Both surfaces are compared at every matched funnel stage.

Read `docs/workstreams/WS3-SPEC.md` for the full funnel, event definitions, properties, rationale, and remaining items.

## Immediate next milestone

Complete Workstream 3 by defining:

- primary, secondary, commercial-demand, and diagnostic metrics;
- precommitted read rules;
- success, failure, ambiguity, and low-sample treatment;
- treatment of conflicting comparative and absolute demand signals;
- whether a project-level kill condition is required now;
- the exact monthly price or its deliberate deferral.

The exact next action is recorded in `CURRENT-HANDOFF.md` and `docs/workstreams/WS3-SPEC.md`.

## Current confirmed constraints

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical documents and workstream specifications are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Workstream specifications preserve detailed workstream outputs.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Build market evidence before meaningful product or backend buildout.
- Round one compares spreadsheet-native versus platform-version surfaces.
- The spreadsheet-native page is designed and built first.
- Spreadsheet and platform pages launch at roughly the same time.
- Both pages must fire an identical analytics event set.
- Analytics and read rules must be defined before traffic launches.
- Analytics must be verified by hand before paid traffic.
- `03-page-spec.md` is a working baseline, not final build-ready truth.
- Do not begin Lovable implementation during Workstream 3 or before Workstream 4 produces a coherent content and experience brief.

## Deferred to Workstream 4

- Final page narrative and section order.
- Headline, subhead, and supporting copy.
- Recruiting-volume statistics and proof devices.
- Spreadsheet hero and product-demo visuals.
- Exact funnel product-experience frames and clicks.
- Relationship between the funnel demo and main landing-page hero.
- Action-focused view implementation in the demo.
- Gmail, Sheets, and Calendar mechanism visualization.
- Privacy, permissions, trust, and FAQ content.
- Exact CTA wording and placement.
- Final checkout and terminal-state copy.

## Deferred to later workflows

- Lovable implementation and private deployment.
- Platform-page argument and capability inventory.
- Paid and organic acquisition plan.
- Testing-domain identity.
- Final logo.
- Real OAuth and permissions-willingness testing.
- Meaningful backend functionality.

## Required reading for a new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. The active workstream specification, currently `docs/workstreams/WS3-SPEC.md`
4. `docs/05-working-agreement.md`
5. Only the additional canonical files named in the handoff or needed for the exact task

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

The archive contains stale or superseded strategy, design, technical, and session-history material. Do not treat it as current truth or read it wholesale. Consult relevant archived files only when they can materially inform a current question, recover prior reasoning, or prevent duplicated work. Any recovered idea must be identified as historical context and re-evaluated against current confirmed decisions.

## Canonical file map

- `00-START-HERE.md`: current-state index and reading order.
- `01-project-and-product.md`: durable project and product context.
- `02-strategy-and-test.md`: validation strategy and test structure.
- `03-page-spec.md`: spreadsheet-page working baseline.
- `04-decision-log.md`: concise confirmed, rejected, and cross-project rulings.
- `05-working-agreement.md`: operating rules and documentation maintenance system.
- `06-assumptions-and-open-questions.md`: unsettled items only.
- `workstreams/WS2-SPEC.md`: complete Workstream 2 proposition specification.
- `workstreams/WS3-SPEC.md`: active Workstream 3 conversion and measurement specification.
- `CURRENT-HANDOFF.md`: temporary immediate resumption context and exact next action.
