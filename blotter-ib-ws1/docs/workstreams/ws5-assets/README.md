# WS5 visual reference index

Date created: July 31, 2026  
Date last updated: July 31, 2026  
Status: Active supporting record  
Governing specification: `../WS5-SPEC.md`

## Purpose

This directory stores the small set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

These references are directional implementation guidance. They are not final website designs, not standalone product deliverables, and not pixel-perfect targets. Lovable must use them together with the canonical copy, behavior, responsive rules, and acceptance criteria in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

Do not create a bespoke visual reference for every page section merely because a section has visual hierarchy. Text, statistics, accordions, disclosure tables, CTA blocks, and other conventional layouts should normally be implemented directly in Lovable from the canonical specifications.

## Current handoff packet

### Editable source

`source/blotter-sheets-reference-v1.html`

This source contains both completed directional spreadsheet scenes:

- the hero recruiting tracker;
- the Outstanding Actions view.

It preserves the governing structure, copy, data, hierarchy, spreadsheet grammar, status treatments, cues, and grouped-action presentation needed for implementation guidance.

### Review previews

- `hero/hero-reference-v1.png`
- `outstanding-actions/outstanding-actions-reference-v1.png`

The PNGs provide immediate visual review. The HTML source, reference-specific notes, and governing specifications form the implementation handoff.

## 1. Hero spreadsheet reference v1

Directory: `hero/`

Status: Directionally complete and sufficient for the current asset review. It is not a literal final pixel target.

Established direction:

- approximately `1360 × 520` outer canvas;
- approximately `1000 × 400` spreadsheet window;
- recognizable Google Sheets chrome and compact density;
- current-state `IB Recruiting Tracker` on the active `Blotter` tab;
- student-maintained fields on the left: Name, Title, Firm;
- Blotter-maintained fields on the right: Status, Next move, Last contact, Days, Call;
- three activity cues:
  - Gmail: `Sarah Chen replied`;
  - Calendar: `Coffee chat with Marcus Lee`;
  - Gmail: `Email sent to Alex Morgan`;
- responsibility copy: `YOU add the contacts` and `BLOTTER keeps them current`;
- preserve `keeps them current` unless Jon explicitly revises it;
- spreadsheet remains the dominant object.

Known defects or unresolved treatments that must not be copied literally:

1. Cue-to-Blotter-to-sheet causality is not sufficiently clear.
2. Cue-to-row or cue-to-field mapping is not sufficiently clear.
3. The vertical Blotter engine is directional, not settled.
4. The final ownership treatment is not settled.
5. Responsive composition must be designed in page context.

The stale rear sheet remains parked, not rejected. Whether it returns is unresolved.

## 2. Outstanding Actions reference v1

Directory: `outstanding-actions/`

Status: Directionally complete and sufficient for the current asset review.

Established direction:

- Google Sheets-native visual language shared with the hero;
- one global column header: Contact, Next action, Why it is here;
- `Outstanding actions` title and `21 outstanding actions` count;
- three grouped action categories with restrained distinctions;
- exact visible rows, reasons, group counts, and overflow rows;
- full-width spreadsheet rows rather than dashboard cards;
- intended reuse for landing-page Section 4 and funnel Frame 3, subject to the post-reconciliation asset review.

Lovable should reuse the shared spreadsheet component rather than independently rebuilding this view if the direction is retained.

## Ratified storyboard status

The former proposal to build one full unified three-frame storyboard was never ratified and is not an active requirement.

Whether any additional storyboard, compact Frame 1-to-Frame 2 cell-treatment reference, Section 2 divergence reference, or other visual reference is needed remains unresolved.

Do not treat either the former full-storyboard proposal or the later compact-reference suggestion as the default. The scope must be reconsidered after reviewing the current asset packet and before Lovable planning.

## Page elements that do not automatically require separate references

Unless Jon decides otherwise after the asset review or a bounded Lovable attempt exposes material ambiguity, do not assume separate external designs are required for:

- Section 2's four large figures;
- Section 3's mechanism;
- Section 5's preservation comparison;
- Section 6 privacy process, permissions table, commitments, and privacy FAQ;
- Section 7 general FAQ and closing CTA;
- recruiting questions, email capture, price, purchase summary, payment choices, and terminal copy outside the spreadsheet frames.

## Lovable handoff protocol after reference scope is settled

For each approved visual reference:

1. Attach the relevant PNG preview and shared HTML source directly to the Lovable message.
2. Identify what is authoritative, what is directional, and which defects must not be copied.
3. Reference the controlling WS4 or WS3 section for exact copy and behavior.
4. Require Lovable to respond in plan mode first for multi-section or interactive implementation.
5. Approve the plan before allowing code changes.
6. Build and review one bounded checkpoint at a time.

GitHub remains the durable source of truth. Lovable chat history and generated code do not replace the canonical specifications or this reference index.

## Exact next action

Review the current hero and Outstanding Actions packet with Jon and decide whether any additional visual reference is needed. Do not enter Lovable plan mode until that decision is recorded and the implementation packet is frozen.
