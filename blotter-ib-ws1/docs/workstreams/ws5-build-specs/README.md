# WS5 build-specification system

Date created: July 31, 2026  
Date last updated: August 1, 2026  
Status: Frozen for Lovable plan intake  
Governing workstream: `../WS5-SPEC.md`

## Purpose

This directory contains the ratified, build-grade specifications for individual landing-page sections, spreadsheet scenes, funnel screens, and other implementation-sensitive surfaces in Workstream 5.

The workstream specification remains the overall governor. These files provide the granular instructions a future reader or Lovable must use to implement a specific surface without reconstructing decisions from chat history.

A build specification is not a discussion transcript, mood board, or shorthand note. It must be self-contained and explain the communication job, layout, exact content, preserved elements, required changes, behavior, exclusions, responsive posture, and acceptance criteria.

## Authority and conflict rules

For a surface with a ratified build specification, use this order:

1. Jon's explicit later instruction.
2. `WS5-SPEC.md` for workstream scope, sequence, gates, and documentation rules.
3. The ratified build specification for that exact surface.
4. `WS4-SPEC.md` for exact page copy, section order, communication job, funnel presentation, responsive priorities, and claim boundaries not superseded by WS5.
5. `WS3-SPEC.md` for funnel architecture, event names, properties, price, measurement, and read rules.
6. The relevant formal or directional visual reference, editable source, and asset README.
7. Existing Lovable code and generated output.

Where a later build specification changes a figure, copy line, visual, or presentation rule from WS4, the later build specification controls that surface and identifies the supersession explicitly.

A directional visual reference establishes approved direction. A formal exact asset is a direct implementation target. The asset index and build specification state which status applies.

## Status vocabulary

- `Draft`: consultant-prepared proposal that is not binding.
- `Under review`: currently being discussed and not binding.
- `Ratified`: approved by Jon and binding.
- `Superseded`: replaced by a later named specification.

Only a file marked `Ratified` may enter the frozen Lovable packet.

## Required structure

Every build specification must contain, where applicable:

1. status, date, scope, and controlling sources;
2. communication job;
3. required user understanding;
4. authoritative copy or data;
5. asset authority and preserve rules;
6. required changes or removals;
7. composition and hierarchy;
8. component-level visual and behavioral rules;
9. state, mapping, interaction, or transition logic;
10. desktop and responsive posture;
11. explicit exclusions;
12. preview acceptance criteria;
13. Lovable handoff and stop condition;
14. remaining questions or explicit closure;
15. ratification record.

Do not use chat-dependent shorthand.

## Ratification workflow

For each unresolved surface:

1. read the controlling WS4 or WS3 requirements;
2. review relevant assets;
3. resolve substantive questions with Jon;
4. write one self-contained specification;
5. obtain explicit ratification;
6. update the specification index, WS5, handoff, open questions, asset records, Start Here, and decision log;
7. remove resolved questions from the open register;
8. do not enter Lovable plan mode until the required packet and reference scope are frozen.

This workflow is now complete for all seven landing-page sections.

## Current specification inventory

| Sequence | Surface | File | Status |
|---:|---|---|---|
| 01 | Landing-page hero spreadsheet visual | `01-HERO.md` | Ratified |
| 02 | Landing-page Section 2 scale and consequence | `02-SECTION-2-SCALE-AND-CONSEQUENCE.md` | Ratified |
| 03 | Landing-page Section 3 How Blotter works | `03-SECTION-3-HOW-BLOTTER-WORKS.md` | Ratified |
| 04 | Landing-page Section 4 Outstanding Actions and funnel Frame 3 | `04-SECTION-4-OUTSTANDING-ACTIONS.md` | Ratified |
| 05 | Landing-page Section 5 Preservation | `05-SECTION-5-PRESERVATION.md` | Ratified |
| 06 | Landing-page Section 6 Data and Privacy | `06-SECTION-6-DATA-AND-PRIVACY.md` | Ratified |
| 07 | Landing-page Section 7 FAQ and final CTA | `07-SECTION-7-FAQ-AND-FINAL-CTA.md` | Ratified |

## Important supersession and reuse notes

### Section 3

The former `YOU CONTROL` and `BLOTTER MAINTAINS` lists are removed because the hero already communicates the ownership split. Section 3 uses one formal exact mechanism asset with external stage labels.

### Section 4 and funnel Frame 3

The Outstanding Actions PNG is a formal exact desktop asset for both landing-page Section 4 and canonical funnel Frame 3. Surrounding copy and controls differ, but the spreadsheet visual must not be independently redesigned.

### Section 5

The exact preservation asset adds Email and LinkedIn to the established five-contact tracker and places the divider between LinkedIn and Status. The conceptual existing-tracker versus Blotter-live-layer distinction remains, but the conceptual zone labels are not inserted into the asset.

### Section 6

Provider wording is deliberately provider-agnostic because no connection provider has been selected. Section 6 has no external visual asset and remains subject to implementation-truth verification before public release.

### Section 7

The general FAQ remains separate from the Section 6 privacy FAQ. The final CTA enters the shared funnel with `cta_location = final`. Section 7 has no external visual asset.

## Lovable handoff

The seven-section packet is frozen for plan-only intake.

Use:

- `../ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`
- `../ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

The existing Lovable project must receive a plan-only message before code changes. The plan must map each section, asset, funnel state, event, lead-storage requirement, responsive rule, and review checkpoint.

## Exact next action

Begin the governed Lovable plan-only intake in the existing private project.

Do not modify code until Jon reviews and approves the returned Lovable plan.
