# WS5 visual reference index

Date created: July 31, 2026  
Date last updated: August 1, 2026  
Status: Active supporting record  
Governing specification: `../WS5-SPEC.md`  
Build-specification index: `../ws5-build-specs/README.md`

## Purpose

This directory stores the small set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

These references are implementation inputs. Their authority varies by asset:

- a `directional visual reference` establishes visual direction but is not a literal pixel target;
- a `formal exact implementation asset` must be reproduced as specified and is not open to visual reinterpretation.

Lovable must use every asset together with the ratified build specification for the relevant surface and the canonical copy, behavior, measurement, responsive, and claim rules in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

Where a ratified build specification exists, it controls how the asset must be preserved, corrected, removed, improved, placed, or adapted. The asset README states whether the asset is directional or exact.

Do not create a bespoke visual reference for every page section merely because the section has visual hierarchy. Text, statistics, accordions, disclosure tables, CTA blocks, and other conventional layouts should normally be implemented from the canonical specifications unless a specific ambiguity justifies additional work.

## Current handoff packet

### Shared editable spreadsheet source

`source/blotter-sheets-reference-v1.html`

This source contains:

- the hero recruiting tracker;
- the Outstanding Actions view.

### Directional hero preview

- `hero/hero-reference-v1.png`

### Formal Outstanding Actions asset

- `outstanding-actions/outstanding-actions-reference-v1.png` (authoritative exact-pixel target for Section 4 and funnel Frame 3)

### Formal Section 2 asset

- `section-2/goldman-sachs-rejection-email-exact-v1.webp` (authoritative exact-pixel target)
- `section-2/goldman-sachs-rejection-email-exact-v1.html` (supplemental portable HTML reference)

### Formal Section 3 asset

- `section-3/how-blotter-works-exact-v1.avif` (authoritative exact-pixel target)

### Ratified written implementation authority

- `../ws5-build-specs/01-HERO.md`
- `../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- `../ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
- `../ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`

## 1. Hero spreadsheet reference v1

Directory: `hero/`

Asset status: Approved directional visual reference.  
Build status: Desktop visual decisions ratified in `../ws5-build-specs/01-HERO.md`.

Preserve closely:

- approximately `1360 × 520` outer-canvas proportion;
- approximately `1000 × 400` spreadsheet-window proportion;
- recognizable Google Sheets chrome and compact density;
- current-state `IB Recruiting Tracker` on the active `Blotter` tab;
- student-maintained fields on the left: Name, Title, Firm;
- Blotter-maintained fields on the right: Status, Next move, Last contact, Days, Call;
- three activity cues:
  - Gmail: `Sarah Chen replied`;
  - Calendar: `Coffee chat with Marcus Lee`;
  - Gmail: `Email sent to Alex Morgan`;
- cue-card size and treatment;
- responsibility copy: `YOU add the contacts` and `BLOTTER keeps them current`;
- spreadsheet dominance and overall content structure.

Required implementation changes:

1. Remove the stale rear sheet from the hero.
2. Remove the explicit Blotter engine or intermediary processor.
3. Map each cue directly to the corresponding relationship row's full Status-through-Call block.
4. Use one faint shared Blotter-yellow-family tint across the complete maintained right-hand zone.
5. Use stronger full-block emphasis for the Sarah Chen, Marcus Lee, and Alex Morgan maintained rows.
6. Keep Priya Shah and Daniel Kim within the baseline maintained zone without adding cues.
7. Keep the ownership labels below the sheet.
8. Use restrained region underlines, with small terminals, to map the labels to their column groups.
9. Make the mechanism understandable in a static desktop screenshot.

The current engine and stale-sheet treatments are superseded by the ratified build specification and must not be copied.

## 2. Section 2 Goldman Sachs rejection-email asset

Directory: `section-2/`

Asset status: Formal exact implementation asset.  
Build status: Desktop Section 2 decisions ratified in `../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`.

Asset package:

- `section-2/goldman-sachs-rejection-email-exact-v1.webp` — authoritative exact-pixel target.
- `section-2/goldman-sachs-rejection-email-exact-v1.html` — supplemental portable HTML reference.

The WebP was rendered losslessly from Jon's uploaded self-contained bundle at `1180 × 560`. Lovable must use it as the visual truth and reproduce:

- the full Gmail desktop composition;
- the `1180 × 560` reference proportions;
- top navigation;
- left folder rail;
- central opened-message surface;
- right application rail;
- exact sender, recipient, timestamp, subject, body, signature, and visible reply controls.

The HTML is an implementation-friendly structural and text reference. It does not override the WebP where a visual discrepancy exists.

Do not redesign the asset into a generic email card.

The build specification controls the surrounding Section 2 structure, four figures, exact copy, two external annotations, placement, responsive checkpoint, and exclusions.

The asset is illustrative, not documentary evidence of a genuine Goldman Sachs email. Do not describe it internally or publicly as an authentic received email.

## 3. Section 3 How Blotter works asset

Directory: `section-3/`

Asset status: Formal exact implementation asset.  
Build status: Desktop Section 3 decisions ratified in `../ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`.

Asset package:

- `section-3/how-blotter-works-exact-v1.avif` — authoritative exact-pixel target.
- `section-3/README.md` — asset authority, exact visible state, checksums, and handoff rules.

The AVIF was encoded losslessly from Jon's ratified uploaded PNG at `2048 × 633` and is pixel-equivalent to it.

Lovable must reproduce:

- Gmail and Google Calendar logos and exact source cues;
- one restrained incoming arrow;
- the exact central Blotter module, provisional mark, and lowercase wordmark;
- one restrained outgoing arrow;
- the exact Google Sheets chrome, selected cell, formula-bar state, columns, rows, chips, maintained-zone tint, proportions, spacing, shadows, and crop.

The three stage labels remain external page copy and must not be inserted into or over the exact asset.

The provisional mark is exact for this asset only. It is not the canonical global Blotter logo and must not be reused elsewhere merely because it appears here.

Section 3 does not include the former `YOU CONTROL` and `BLOTTER MAINTAINS` lists. That WS4 presentation detail is superseded by the ratified Section 3 build specification because the hero already communicates the ownership split.

No additional Section 3 visual reference is required.

## 4. Outstanding Actions exact asset

Directory: `outstanding-actions/`

Asset status: Formal exact implementation asset.  
Build status: Landing-page Section 4 and funnel Frame 3 decisions ratified in `../ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`.

Asset package:

- `outstanding-actions/outstanding-actions-reference-v1.png` — authoritative exact-pixel target.
- `outstanding-actions/README.md` — asset authority, exact visible state, shared-use rules, and handoff requirements.
- `source/blotter-sheets-reference-v1.html` — supplemental editable source.

Reference dimensions:

- `1848 × 1160`.

Jon ratified the current PNG exactly as rendered. It is no longer directional.

Lovable must reproduce:

- complete Google Sheets chrome and exact crop;
- `Outstanding actions` and `21 outstanding actions`;
- one global column-header row;
- three exact action groups and counts;
- exact visible rows, reasons, and overflow rows;
- exact fills, borders, row heights, spacing, typography, alignment, shadows, tint strength, and proportions;
- full-width spreadsheet rows rather than dashboard cards.

The same exact visual governs:

1. landing-page Section 4;
2. canonical funnel product-experience Frame 3.

The two uses have different surrounding copy and controls, but Lovable must not build a second independently styled Outstanding Actions view. Uniform desktop scaling is allowed only as required by the page or funnel container.

No additional Section 4 or Frame 3 visual reference is required.

## Storyboard and additional-reference status

The former proposal to build one full unified three-frame storyboard was never ratified and is not an active requirement.

The hero needs no replacement storyboard or additional external reference. Its implementation is governed by the ratified hero build specification plus the existing PNG and HTML source.

Section 2 is complete. It uses one formal exact rejection-email asset package rather than a stale spreadsheet or a comparison table. No additional Section 2 visual reference is required.

Section 3 is complete. It uses one formal exact mechanism asset plus its ratified build specification. No additional Section 3 visual reference is required.

Section 4 and funnel Frame 3 are complete. They use the same formal exact Outstanding Actions asset plus one ratified build specification. No additional Outstanding Actions reference is required.

Still unresolved:

- whether the funnel's Frame 1-to-Frame 2 transition requires a compact reference;
- whether another complex surface requires an external reference after written decisions are settled.

Do not default to the former full storyboard or a compact replacement. Decide the minimum reference need surface by surface.

## Handoff protocol

For each approved visual surface:

1. Attach the relevant ratified build specification.
2. Attach the relevant formal or directional asset.
3. Identify the controlling WS4 or WS3 requirements for surrounding copy and behavior.
4. State the asset's authority level.
5. State what must be preserved.
6. State what must be changed or removed.
7. State explicit exclusions and the checkpoint stop condition.
8. Require Lovable plan mode before multi-section or interactive implementation.
9. Approve the plan before code changes.
10. Review the specified desktop checkpoint before advancing.

GitHub remains the durable source of truth. Lovable chat history and generated code do not replace the canonical specifications.

## Exact next action

Use the WS5 build-specification process to review Section 5, `Preservation`, settle the desktop composition and responsive posture, and determine whether written instructions alone are sufficient or an additional external visual reference is justified.
