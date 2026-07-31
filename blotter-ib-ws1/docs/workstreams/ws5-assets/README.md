# WS5 visual reference index

Date created: July 31, 2026
Status: Active supporting record
Governing specification: `../WS5-SPEC.md`

## Purpose

This directory stores the small set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

These references are implementation guidance, not separate product deliverables and not automatically pixel-perfect final designs. Lovable must use them together with the canonical copy, behavior, responsive rules, and acceptance criteria in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

Do not create a bespoke visual reference for every page section. Text, statistics, accordions, disclosure tables, CTA blocks, and other conventional layouts should be implemented directly in Lovable from the canonical specifications.

## Current reference inventory

### 1. Hero spreadsheet reference v1

Source:

`hero-spreadsheet-reference-v1.dc.html`

Source note:

The repository file is a normalized, self-contained archival version of the uploaded Claude Design HTML. It preserves the visual structure, data, dimensions, cues, ownership treatment, and known defects needed for implementation guidance. The uploaded raw source had SHA-256 `2530069778e8bea29888b2d04bc89a01f0cf5aff542458d02076e9d26be13135` and depended on Claude Design-local support and image paths.

Status:

Directionally complete and sufficient to guide Lovable. It is not approved as a literal pixel target and must not be copied without correcting the known defects below.

Established direction:

- Outer desktop canvas: approximately 1360 × 520.
- Main spreadsheet window: approximately 1000 × 400.
- Recognizable Google Sheets chrome and density.
- Current-state `IB Recruiting Tracker` on the active `Blotter` tab.
- Student-maintained fields on the left: Name, Title, Firm.
- Blotter-maintained fields on the right: Status, Next move, Last contact, Days, Call.
- Three external activity cues only:
  - Gmail: `Sarah Chen replied`.
  - Calendar: `Coffee chat with Marcus Lee`.
  - Gmail: `Email sent to Alex Morgan`.
- The Priya Shah completed-call cue is intentionally omitted from the hero composition.
- Responsibility copy remains `YOU add the contacts` and `BLOTTER keeps them current`. Preserve `keeps them current`; do not silently change it to `keeps it current`.
- The current working hero direction uses one clean current-state sheet. The stale rear sheet is parked, not discarded. If the original layered direction is restored, add only a cropped, muted upper portion of the stale sheet behind the current sheet rather than rebuilding the entire hero.

Known defects to correct in Lovable rather than reproduce:

1. The visual flow from Gmail and Calendar cues into the Blotter processing element and from Blotter into the spreadsheet is not sufficiently clear.
2. The reference does not clearly map each external cue to the row or fields it affected.
3. The bottom U-shaped ownership brackets are visually messy, under-resolved, and not the final treatment for the responsibility split.
4. There is unnecessary white space below row 6 inside the spreadsheet window. The production implementation should crop the grid cleanly.
5. The intermediate vertical `blotter` engine treatment is directional only. Lovable should clarify the causal sequence without turning the hero into a technical architecture diagram.
6. The normalized repository file uses simple stable placeholder marks for Gmail and Calendar. Lovable should use appropriate stable local assets or inline SVGs in the production implementation.

Use rule:

Preserve the spreadsheet fidelity, hierarchy, exact data, activity-card tone, overall scale, and core communication job. Improve the connector logic, ownership treatment, grid crop, and responsive composition during implementation.

## Proposed minimal remaining reference set

This is the recommended scope to ratify before broad Lovable implementation.

### Required candidate A: Outstanding Actions spreadsheet reference

Why it merits a reference:

- It is a nonstandard Google Sheets-native grouped queue.
- It must preserve spreadsheet grammar while showing three action groups, visible rows, counts, and muted overflow rows.
- It is reused in Section 4 and Funnel Frame 3.

One desktop reference should be sufficient. Lovable can derive responsive crops from the WS4 responsive rules.

### Required candidate B: Three-frame funnel spreadsheet storyboard

Why it merits a reference:

- The same spreadsheet must remain stable across three states.
- Frame 1 must signpost cells before they change.
- Frame 2 must make the update unmistakable without becoming a spot-the-difference exercise.
- Frame 3 transitions to Outstanding Actions.
- The reference must show the state relationship and interaction sequence, not every surrounding funnel screen.

A single HTML file or storyboard containing all three frames is preferable to three unrelated assets.

### Optional candidate C: Section 2 manual-tracker divergence reference

Working idea:

Use a visibly messy or decayed manual spreadsheet fragment in the problem section, potentially paired with `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER`.

This is not yet a required reference. The four figures are text and must not be treated as a separate visual asset. Decide whether to build this only after reviewing whether Lovable can execute the divergence concept directly from the written specification.

## Page elements that do not require separate prebuilt references

Unless Lovable fails on a first implementation pass, do not separately design these outside Lovable:

- Section 2's four large figures.
- Section 3's basic Gmail + Calendar to Blotter to Google Sheet mechanism. Reuse the hero spreadsheet and activity-cue components.
- Section 5's preservation comparison. Reuse the spreadsheet grammar and implement the two conceptual zones from text.
- Section 6 privacy process, permissions table, commitments, and privacy FAQ.
- Section 7 general FAQ and closing CTA.
- Recruiting questions, email capture, price, purchase summary, payment choices, and terminal copy outside the three-frame spreadsheet experience.

## Lovable handoff protocol

For each approved visual reference:

1. Store the editable source and a review screenshot in this directory where possible.
2. Attach the source and screenshot directly to the relevant Lovable message.
3. In the same message, identify what is authoritative, what is directional, and which defects must not be copied.
4. Reference the controlling WS4 or WS3 section for exact copy and behavior.
5. Ask Lovable to respond in plan mode first for any multi-section or interactive implementation.
6. Approve the plan before allowing code changes.
7. Build and review one bounded checkpoint at a time.

GitHub remains the durable source of truth. Lovable chat history and generated code do not replace the canonical specifications or this reference index.
