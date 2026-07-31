# WS5 visual reference index

Date created: July 31, 2026  
Date last updated: July 31, 2026  
Status: Active supporting record  
Governing specification: `../WS5-SPEC.md`

## Purpose

This directory stores the small set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

These references are implementation guidance, not separate product deliverables and not automatically pixel-perfect final designs. Lovable must use them together with the canonical copy, behavior, responsive rules, and acceptance criteria in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

Do not create a bespoke visual reference for every page section. Text, statistics, accordions, disclosure tables, CTA blocks, and other conventional layouts should be implemented directly in Lovable from the canonical specifications.

## Current handoff packet

### Editable source

`source/blotter-sheets-reference-v1.html`

This is a self-contained, implementation-oriented HTML reference containing both final spreadsheet scenes:

- the hero recruiting tracker;
- the Outstanding Actions view.

It is a normalized compact source derived from the final Claude Design work. It preserves the governing structure, copy, data, dimensions, hierarchy, spreadsheet grammar, status treatments, cues, and grouped-action presentation. It does not preserve Claude Design's bundler/runtime wrapper byte-for-byte.

### Review previews

- `hero/hero-reference-v1.png`
- `outstanding-actions/outstanding-actions-reference-v1.png`

The repository PNGs are web-optimized review previews. The HTML source and the reference-specific notes are the implementation handoff; the PNGs provide immediate visual confirmation in GitHub and Lovable.

## 1. Hero spreadsheet reference v1

Directory: `hero/`

Status: Directionally complete and sufficient to guide Lovable. It is not a literal final pixel target.

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
- responsibility copy remains `YOU add the contacts` and `BLOTTER keeps them current`;
- preserve `keeps them current`; do not silently change it to `keeps it current`.

Known defects Lovable must improve rather than reproduce:

1. Cue-to-Blotter-to-sheet causality is not sufficiently clear.
2. Cue-to-row or cue-to-field mapping is not sufficiently clear.
3. The vertical Blotter engine is directional, not a settled product diagram.
4. The ownership treatment is not final.
5. Responsive composition must be designed in page context.

The stale rear sheet remains parked, not rejected. If restored during page-context review, add only a cropped, muted upper portion behind the current sheet.

The earlier root-level `hero-spreadsheet-reference-v1.dc.html` is retained as a superseded archival version and should not be used as the primary implementation handoff.

## 2. Outstanding Actions reference v1

Directory: `outstanding-actions/`

Status: Directionally complete and sufficient to guide Lovable.

Established direction:

- Google Sheets-native visual language shared with the hero;
- one global column header: Contact, Next action, Why it is here;
- `Outstanding actions` title and `21 outstanding actions` count;
- three grouped action categories with distinct restrained accents;
- exact visible rows, reasons, group counts, and overflow rows;
- full-width spreadsheet rows rather than dashboard cards;
- this state serves landing-page Section 4 and funnel Frame 3.

Lovable should reuse the shared spreadsheet component rather than independently rebuilding this view.

## Remaining external-reference decision

The prior recommendation to build one polished unified three-frame storyboard is no longer the preferred production method and was never ratified as a product requirement.

Current working recommendation, pending canonical WS5 consolidation:

- use the completed hero reference for the shared spreadsheet and activity-cue grammar;
- use the completed Outstanding Actions reference for Section 4 and funnel Frame 3;
- create only a compact stale-to-updated cell-treatment reference for funnel Frames 1–2 if Lovable cannot execute the exact WS4 transition brief directly;
- keep the Section 2 messy-manual-tracker reference optional and build it only if page implementation demonstrates a need.

Do not build another complete hero-sized storyboard outside Lovable by default.

## Page elements that do not require separate prebuilt references

Unless Lovable fails materially on a first implementation pass, do not separately design these outside Lovable:

- Section 2's four large figures;
- Section 3's mechanism, which should reuse the hero spreadsheet and cue primitives;
- Section 5's preservation comparison;
- Section 6 privacy process, permissions table, commitments, and privacy FAQ;
- Section 7 general FAQ and closing CTA;
- recruiting questions, email capture, price, purchase summary, payment choices, and terminal copy outside the three spreadsheet frames.

## Lovable handoff protocol

For each approved visual reference:

1. Attach the relevant PNG preview and the shared HTML source directly to the Lovable message.
2. Identify what is authoritative, what is directional, and which defects must not be copied.
3. Reference the controlling WS4 or WS3 section for exact copy and behavior.
4. Ask Lovable to respond in plan mode first for multi-section or interactive implementation.
5. Approve the plan before allowing code changes.
6. Build and review one bounded checkpoint at a time.

GitHub remains the durable source of truth. Lovable chat history and generated code do not replace the canonical specifications or this reference index.
