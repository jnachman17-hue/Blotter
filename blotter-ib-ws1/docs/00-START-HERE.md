# Blotter IB — Start Here

Date last updated: 2026-07-30

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

The critical sequencing correction is that landing-page content and experience design must occur before Lovable implementation. Lovable is the implementation and visual-iteration environment, not the place where the project first decides what the page is trying to communicate.

## Current workstream

Workstream 3: Conversion and measurement design.

Status: Ready to begin in the next substantive chat.

Workstreams 1 and 2 are complete.

## Workstream 2 outcome

Workstream 2 established a coherent spreadsheet-native proposition at landing-page-test resolution:

- The July audience is pre-decay because of the recruiting calendar. The page sells prevention now and may sell rescue later in peak season.
- The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- Tracker decay is caused by cumulative volume and inconsistent upkeep. The sheet becomes stale, inconsistent, and no longer reflects reality.
- The student chooses and enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain the changing side of the tracker.
- The core outcome is operational control through one accurate, current source of truth, emphasizing accuracy, time saved, everything in one place, and preventing important actions from slipping through the cracks.
- The minimum offer includes automatic activity capture, visually legible contact state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- Blotter is an orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or an AI slop platform.
- Exact columns, statuses, sorting or grouping mechanics, page copy, and visual design remain unresolved design decisions rather than product specifications.

## Workstream 3 objective

Define what visitor behavior the market test is trying to produce, how that behavior will be captured, and how the resulting data will be interpreted before any page is built.

Workstream 3 should resolve:

1. Primary conversion goal and graded intent signals.
2. CTA wording, placement assumptions, and click behavior at a conceptual level.
3. Lead-capture flow and what information is collected at each step.
4. Whether price or purchase-intent mechanics appear in round one.
5. Identical analytics event set for the spreadsheet and platform pages.
6. Event definitions, naming, and measurement architecture.
7. Read rules written before data exists.
8. Success, failure, and ambiguous-result thresholds.
9. Any required relationship between conversion design and later page structure.

Workstream 3 should not write the full landing page, settle final visual design, or begin Lovable implementation. Those follow in Workstreams 4 and 5.

## Current confirmed constraints

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical docs are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- AI-generated project documents are working context unless confirmed by Jon or recorded as confirmed in the decision log.
- Build market evidence before meaningful product or backend buildout.
- Round one compares spreadsheet-native versus platform-version product surfaces.
- The spreadsheet-native landing page is designed and built first.
- Spreadsheet and platform pages launch at roughly the same time.
- Both pages must fire an identical analytics event set.
- Analytics and read rules must be defined before traffic launches.
- Analytics must be verified by hand before any paid traffic.
- `03-page-spec.md` is a working baseline, not final build-ready truth.
- The project stays focused on recruiting logistics, not interview preparation, learning content, AI outreach, contact discovery, or job boards.
- Do not begin Lovable implementation during Workstream 3 or before Workstream 4 produces a coherent content and experience brief.

## Immediate next milestone

Complete Workstream 3 by agreeing on a coherent conversion and measurement system for the matched landing-page test.

The first decision is the conversion objective: what visitor action should count as the strongest meaningful demand signal in round one, and whether the test should use one binary conversion or a graded sequence of intent signals.

## Current blockers and deferred items

Blocks the spreadsheet-page design and build:

- CTA and lead-capture flow are not yet defined.
- Analytics event set and event parity are not yet written.
- Read rules and interpretation thresholds are not yet written.
- Price treatment and any purchase-intent mechanic remain unresolved.

Deferred to Workstream 4:

- Final page narrative and section order.
- Headline, subhead, and supporting copy.
- Recruiting-volume statistics and proof devices.
- Spreadsheet hero and product-demo visuals.
- Action-focused view implementation in the demo.
- Gmail and Calendar explanation.
- Privacy, permissions, trust, and FAQ content.
- Exact CTA placement within the page.

Deferred to later workflows:

- Lovable implementation and private deployment.
- Platform-page argument and capability inventory.
- Paid and organic acquisition plan.
- Testing-domain identity.
- Final logo.
- Project-level kill condition, unless Workstream 3 determines it is required for the read rules.

## Repository and archive rules

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Historical archive path:

`blotter-ib-ws1/archive/`

The archive contains stale or superseded strategy, design, technical, and session-history material. Do not treat it as current truth or read it wholesale. Consult relevant archived files only when they can materially inform a current question, recover prior reasoning, or prevent duplicated work. Any recovered idea must be identified as historical context and re-evaluated against current confirmed decisions.

## Canonical file list

- `00-START-HERE.md` — current-state index
- `01-project-and-product.md` — project and product context
- `02-strategy-and-test.md` — validation strategy, corrected workstream sequence, and test design
- `03-page-spec.md` — spreadsheet-page working baseline
- `04-decision-log.md` — confirmed decisions and statused rulings
- `05-working-agreement.md` — operating rules and continuity process
- `06-assumptions-and-open-questions.md` — unsettled assumptions and open questions
- `CURRENT-HANDOFF.md` — immediate resumption context for the next chat