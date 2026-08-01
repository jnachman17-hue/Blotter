# WS5 build-specification system

Date created: July 31, 2026  
Date last updated: July 31, 2026  
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
6. Before moving to the next surface, update:
   - the build specification;
   - this index;
   - `WS5-SPEC.md`;
   - `CURRENT-HANDOFF.md`;
   - `06-assumptions-and-open-questions.md`;
   - the relevant asset README or inventory;
   - `00-START-HERE.md`;
   - `04-decision-log.md` when the ruling is cross-project or load-bearing.
7. Mark resolved questions as settled and remove them from the open-question register.
8. Do not enter Lovable plan mode until the required build specifications and external-reference scope are frozen.

This is the required documentation system for the remainder of WS5 design ratification.

## Lovable handoff rule

A ratified build specification must be usable as the written implementation authority for its surface. The future Lovable handoff should include:

- the build specification;
- the relevant visual reference or formal asset;
- the editable source when useful;
- the governing WS4 or WS3 source for surrounding copy and behavior;
- a clear instruction to preserve, improve, and exclude exactly what the build specification states.

Lovable should not be asked to infer unresolved product or presentation decisions from a visual reference. If a required decision is still unresolved, the specification must say so and the surface must not be treated as frozen.

## Current specification inventory

| Sequence | Surface | File | Status |
|---:|---|---|---|
| 01 | Landing-page hero spreadsheet visual | `01-HERO.md` | Ratified |
| 02 | Landing-page Section 2 scale and consequence | `02-SECTION-2-SCALE-AND-CONSEQUENCE.md` | Ratified |

Additional files will be added in page or funnel sequence as decisions are ratified. File numbering is organizational and does not create authority by itself.

## Next specification checkpoint

Section 3: `How Blotter works`.

The next discussion must determine whether the existing WS4 mechanism sequence can be implemented directly from text and shared hero primitives or requires a dedicated build specification and/or visual reference. Lovable remains paused until the required packet is frozen.
