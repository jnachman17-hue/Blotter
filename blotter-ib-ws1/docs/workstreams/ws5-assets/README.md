# WS5 visual reference index

Date created: July 31, 2026  
Date last updated: July 31, 2026  
Status: Active supporting record  
Governing specification: `../WS5-SPEC.md`  
Build-specification index: `../ws5-build-specs/README.md`

## Purpose

This directory stores the small set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

These references are implementation inputs, not standalone final website designs. Lovable must use them together with the ratified build specification for the relevant surface and the canonical copy, behavior, measurement, responsive, and claim rules in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

Where a ratified build specification exists, it controls how the visual reference must be preserved, corrected, removed, or improved. A visible defect in the PNG or HTML is not authoritative merely because it appears in the asset.

Do not create a bespoke visual reference for every page section merely because the section has visual hierarchy. Text, statistics, accordions, disclosure tables, CTA blocks, and other conventional layouts should normally be implemented from the canonical specifications unless a specific ambiguity justifies additional work.

## Current handoff packet

### Editable source

`source/blotter-sheets-reference-v1.html`

This source contains:

- the hero recruiting tracker;
- the Outstanding Actions view.

### Review previews

- `hero/hero-reference-v1.png`
- `outstanding-actions/outstanding-actions-reference-v1.png`

### Ratified written implementation authority

- `../ws5-build-specs/01-HERO.md`

The PNGs provide immediate visual review. The editable source, ratified build specifications, reference-specific notes, and governing workstream specifications form the implementation handoff.

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

## 2. Outstanding Actions reference v1

Directory: `outstanding-actions/`

Asset status: Directionally complete.  
Build-specification status: Not yet ratified.

Established direction:

- Google Sheets-native visual language shared with the hero;
- one global column header: Contact, Next action, Why it is here;
- `Outstanding actions` title and `21 outstanding actions` count;
- three grouped action categories with restrained distinctions;
- exact visible rows, reasons, group counts, and overflow rows;
- full-width spreadsheet rows rather than dashboard cards;
- intended reuse for landing-page Section 4 and funnel Frame 3.

Lovable should ultimately reuse the shared spreadsheet component rather than independently rebuilding this view. Exact page-context, responsive, and any remaining presentation decisions must be ratified before implementation.

## Storyboard and additional-reference status

The former proposal to build one full unified three-frame storyboard was never ratified and is not an active requirement.

The hero needs no replacement storyboard or additional external reference. Its implementation is governed by the ratified hero build specification plus the existing PNG and HTML source.

Still unresolved:

- whether Section 2 requires a stale-tracker or divergence reference;
- whether the funnel's Frame 1-to-Frame 2 transition requires a compact reference;
- whether the Outstanding Actions asset needs a detailed build specification or material revision;
- whether another complex surface requires an external reference after written decisions are settled.

Do not default to the former full storyboard or a compact replacement. Decide the minimum reference need surface by surface.

## Handoff protocol

For each approved visual surface:

1. Attach the relevant ratified build specification.
2. Attach the relevant PNG preview.
3. Attach the editable source when useful.
4. Identify the controlling WS4 or WS3 requirements for surrounding copy and behavior.
5. State what must be preserved.
6. State what must be changed or removed.
7. State explicit exclusions and the checkpoint stop condition.
8. Require Lovable plan mode before multi-section or interactive implementation.
9. Approve the plan before code changes.
10. Review the specified desktop checkpoint before advancing.

GitHub remains the durable source of truth. Lovable chat history and generated code do not replace the canonical specifications.

## Exact next action

Use the WS5 build-specification process to settle Section 2's scale and manual-tracker-divergence presentation, including whether the stale-sheet concept belongs there and whether a separate visual reference is required.
