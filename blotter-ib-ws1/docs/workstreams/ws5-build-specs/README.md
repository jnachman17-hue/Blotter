# WS5 build-specification system

Date created: July 31, 2026  
Date last updated: August 1, 2026  
Status: Active governance record  
Governing workstream: `../WS5-SPEC.md`

## Purpose

This directory contains the ratified, build-grade specifications for individual landing-page sections, spreadsheet scenes, funnel screens, and other implementation-sensitive surfaces in Workstream 5.

The workstream specification remains the overall governor. These files provide the granular instructions a future reader or Lovable must use to implement a specific surface without reconstructing decisions from chat history.

A build specification is not a discussion transcript, a loose mood board, or a shorthand ratification note. It must be self-contained and must explain the intended communication, layout, preserved elements, required changes, exact content, behavior, exclusions, and acceptance criteria in language that makes sense to someone who did not participate in the original conversation.

## Authority and conflict rules

For a surface with a ratified build specification, use this order:

1. Jon's explicit later instruction.
2. `WS5-SPEC.md` for workstream scope, sequence, gates, and documentation rules.
3. The ratified build specification for that exact surface.
4. `WS4-SPEC.md` for exact page copy, section order, communication job, funnel presentation, responsive priorities, and claim boundaries not superseded by a later ratified WS5 decision.
5. `WS3-SPEC.md` for funnel architecture, event names, properties, price, measurement, and read rules.
6. The relevant formal or directional visual reference, editable source, and asset README.

Where a later ratified build specification changes a figure, copy line, visual, or presentation rule from WS4, the later build specification controls that surface and must identify the supersession explicitly.

A directional visual reference shows approved direction. A formal exact asset is a direct implementation target. The relevant asset README and build specification state which status applies.

## Status vocabulary

Each build specification must use one of these statuses:

- `Draft`: consultant-prepared proposal that is not binding.
- `Under review`: currently being discussed with Jon and not yet binding.
- `Ratified`: approved by Jon and binding for planning and implementation.
- `Superseded`: retained for history but replaced by a later named specification.

Only a file marked `Ratified` may enter the frozen Lovable implementation packet.

## Required structure for every build specification

Every file must contain, where applicable:

1. Status, date, scope, and controlling sources.
2. The surface's communication job in plain language.
3. What the user must understand after viewing or using it.
4. Authoritative inputs and exact copy or data.
5. Elements to preserve from any visual reference.
6. Elements to change, remove, or improve.
7. Composition and hierarchy.
8. Component-level visual and behavioral rules.
9. State, mapping, interaction, or transition logic.
10. Desktop and responsive posture.
11. Explicit exclusions and rejected treatments.
12. Acceptance criteria that can be reviewed in a preview.
13. Lovable handoff instructions and checkpoint boundaries.
14. Remaining open questions, or an explicit statement that none remain for the ratified scope.
15. Ratification record.

Do not use internal shorthand such as `Option A`, `Mechanism B`, `the version we discussed`, or other language that depends on the originating chat. Restate the actual decision.

## Ratification workflow

For each unresolved landing-page or funnel surface:

1. Read the controlling WS4 or WS3 requirements and all current WS5 records.
2. Review any relevant reference asset.
3. Resolve the substantive presentation and behavior questions with Jon.
4. Write or update one self-contained build specification.
5. Obtain explicit Jon ratification.
6. Before moving to the next surface, update the build specification, this index, `WS5-SPEC.md`, `CURRENT-HANDOFF.md`, `06-assumptions-and-open-questions.md`, the relevant asset records, `00-START-HERE.md`, and `04-decision-log.md` where appropriate.
7. Mark resolved questions as settled and remove them from the open-question register.
8. Do not enter Lovable plan mode until the required build specifications and external-reference scope are frozen.

## Lovable handoff rule

A ratified build specification must be usable as the written implementation authority for its surface. The future Lovable handoff should include the build specification, relevant asset, editable source when useful, governing WS4 or WS3 source, authority level, exact preserve/change rules, exclusions, and checkpoint boundary.

Lovable should not be asked to infer unresolved product or presentation decisions from a visual reference.

## Current specification inventory

| Sequence | Surface | File | Status |
|---:|---|---|---|
| 01 | Landing-page hero spreadsheet visual | `01-HERO.md` | Ratified |
| 02 | Landing-page Section 2 scale and consequence | `02-SECTION-2-SCALE-AND-CONSEQUENCE.md` | Ratified |
| 03 | Landing-page Section 3 How Blotter works | `03-SECTION-3-HOW-BLOTTER-WORKS.md` | Ratified |
| 04 | Landing-page Section 4 Outstanding Actions and funnel Frame 3 | `04-SECTION-4-OUTSTANDING-ACTIONS.md` | Ratified |
| 05 | Landing-page Section 5 Preservation | `05-SECTION-5-PRESERVATION.md` | Ratified |
| 06 | Landing-page Section 6 Data and Privacy | `06-SECTION-6-DATA-AND-PRIVACY.md` | Ratified |

## Section 3 supersession note

The ratified Section 3 specification removes the former `YOU CONTROL` and `BLOTTER MAINTAINS` lists because the hero already communicates the ownership split. It uses one formal exact mechanism asset with external stage labels.

## Section 4 exact-asset and reuse note

The existing Outstanding Actions PNG is a formal exact desktop asset for both landing-page Section 4 and canonical funnel Frame 3. The surrounding copy and controls differ, but the spreadsheet visual must not be independently redesigned.

## Section 5 exact-asset note

The ratified Section 5 specification establishes `../ws5-assets/section-5/preservation-exact-v1.html` as a formal exact desktop asset.

The asset adds Email and LinkedIn to the established five-contact tracker and places the exact divider between LinkedIn and Status. The conceptual existing-tracker versus Blotter-live-layer distinction remains, but the former conceptual zone labels are not inserted into the exact spreadsheet visual.

## Section 6 disclosure and provider note

The ratified Section 6 specification establishes a calm, left-aligned disclosure system with one candid-claim block, four numbered processing rows, one permissions matrix, a visible broad-Google-permission notice, retention and commitment blocks, a provider disclosure, and a seven-question privacy accordion.

No external visual asset is required or approved.

The provider disclosure remains deliberately provider-agnostic because no connection provider has been selected. The earlier WS4 sentence implying that a selected provider's Google application had completed verification is superseded and prohibited unless later verified.

## Next specification checkpoint

Section 7: `Frequently asked questions` and the final closing CTA.

Review the already-ratified FAQ and closing copy, settle the desktop accordion and final-CTA composition, preserve the price-and-availability disclosure boundary, determine whether a concise dedicated build specification is required, and avoid creating an unnecessary external visual asset. Lovable remains paused until the required packet is frozen.
