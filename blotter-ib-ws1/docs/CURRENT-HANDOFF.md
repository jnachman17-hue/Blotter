# Blotter IB — Current Handoff

Date: July 31, 2026

## 1. Current objective

Continue Workstream 5 from the completed directional hero-reference checkpoint.

The current task is no longer to keep polishing the hero in Claude Design. The immediate decision is to ratify the minimal remaining set of complex visual references needed before Lovable implementation resumes.

Workstreams 1 through 4 are complete. WS5 is active.

## 2. Required reading

Read in this order before acting:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS5-SPEC.md`
4. `docs/workstreams/ws5-assets/README.md`
5. `docs/workstreams/WS4-SPEC.md`
6. `docs/workstreams/WS3-SPEC.md`
7. `docs/workstreams/WS2-SPEC.md`
8. `docs/05-working-agreement.md`

## 3. Source-of-truth rules

- Jon's explicit instructions are highest authority.
- `WS5-SPEC.md` controls the active implementation state, visual-reference scope, Lovable sequence, analytics integration sequence, and WS5 gates.
- `WS4-SPEC.md` controls exact page copy, section order, funnel presentation, responsive priorities, and claim boundaries.
- `WS3-SPEC.md` controls event names, properties, price, measurement, and read rules.
- The visual-reference README records what is directional, what is authoritative, and which reference defects must not be copied.
- Do not use old handoffs, failed workbooks, abandoned renders, or Lovable defaults to override these files.

## 4. Work completed in the latest session

- Jon built a full directional hero spreadsheet reference in Claude Design.
- The reference is archived in GitHub at:
  - `docs/workstreams/ws5-assets/hero-spreadsheet-reference-v1.dc.html`
- The reference inventory and known-defect record is archived at:
  - `docs/workstreams/ws5-assets/README.md`
- `WS5-SPEC.md` now distinguishes external visual-reference work from ordinary Lovable implementation.
- The existing private Lovable project was checked and remains available:
  - Project: `Blotter Foundation`
  - Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`
  - Private and not published.

## 5. Hero reference status

The hero reference is directionally sufficient to guide Lovable. It is not a literal final pixel target.

Preserve:

- Google Sheets-native visual language.
- Current-state recruiting tracker.
- Student-maintained left side and Blotter-maintained right side.
- Three cue cards:
  - Sarah Chen replied.
  - Coffee chat with Marcus Lee.
  - Email sent to Alex Morgan.
- `YOU add the contacts` and `BLOTTER keeps them current`.
- The exact phrase `keeps them current`.

Known defects that Lovable must improve rather than copy:

1. Cue-to-Blotter-to-sheet flow is unclear.
2. Cue-to-row or cue-to-field mapping is unclear.
3. Bottom U-shaped responsibility brackets are messy and not final.
4. Extra white space below row 6 must be removed.
5. The vertical Blotter engine is directional only.

The stale rear sheet is parked, not rejected. If restored later, add only a cropped, muted upper portion behind the current sheet.

## 6. Visual-reference scope correction

Do not build visual references for every page element.

External references are only for complex assets that are hard for Lovable to infer from text. Text, statistics, privacy disclosures, tables, FAQ, CTA blocks, and conventional layouts should be built directly in Lovable from the canonical specifications.

## 7. Proposed remaining reference set

This set is recommended and still needs Jon ratification before production:

### Candidate 1: Outstanding Actions spreadsheet reference

Recommended as required because it is a nonstandard grouped Google Sheets queue and is reused in Section 4 and Funnel Frame 3.

### Candidate 2: Three-frame funnel spreadsheet storyboard

Recommended as required because it must preserve one stable sheet while clearly showing stale activity, updated cells, and the Outstanding Actions transition.

### Candidate 3: Section 2 messy-manual-tracker divergence reference

Optional. The four recruiting figures are text and do not require a reference. Build this only if Jon ratifies the concept or Lovable cannot execute it directly from the written brief.

No separate prebuilt references are currently recommended for Sections 3, 5, 6, or 7 outside the shared spreadsheet and activity-cue components.

## 8. Exact next action

Present the proposed minimal reference set to Jon for ratification.

If ratified:

1. Build the Outstanding Actions spreadsheet reference.
2. Stop for one review and freeze it.
3. Build the three-frame funnel spreadsheet storyboard.
4. Decide whether the optional Section 2 divergence reference is necessary.
5. Freeze the implementation packet.
6. Resume the existing Lovable project in plan mode.

Do not resume broad Lovable coding before the reference-scope decision.

## 9. Lovable sequence after reference freeze

1. Upload the approved HTML references and screenshots directly to the existing Lovable project.
2. Send the governing WS4, WS3, and WS5 instructions in a plan-mode message.
3. Approve the proposed component, responsive, funnel-state, lead-write, and event-boundary plan before code changes.
4. Build the reusable page, CTA, spreadsheet, activity-cue, funnel-shell, and analytics-adapter components.
5. Implement and approve the hero first.
6. Implement Sections 2 through 7 in bounded checkpoints.
7. Implement the canonical funnel and shared state model.
8. Make an explicit lead-storage decision and implement exportable lead records.
9. Make an explicit analytics-vendor decision and wire the fixed nine-event contract.
10. Complete claim, privacy, responsive, accessibility, and private-preview QA.
11. Manually verify every CTA origin, event, lead record, funnel branch, device class, and payment-choice path before traffic.

## 10. Current exclusions

Do not build or imply:

- real Gmail, Calendar, or Sheets integrations;
- OAuth;
- card entry or payment collection;
- public deployment or acquisition traffic;
- standalone platform page;
- production backend behavior beyond minimum validation infrastructure.
