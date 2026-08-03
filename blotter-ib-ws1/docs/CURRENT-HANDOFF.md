# Blotter IB - Current Handoff

Date: August 1, 2026  
Status: WS5 active; P1 and P2 implemented; P3 waiting on direct Lovable asset attachments

## 1. Current objective

Resume the governed checkpointed Lovable implementation at P3, the desktop hero.

The Lovable implementation plan was returned, reviewed, amended, and ratified by Jon. Code implementation is authorized only through the existing checkpoint sequence.

Completed:

- plan-only intake;
- project-knowledge installation;
- P1 foundation;
- P2 reusable desktop Google Sheets primitive and exact-asset wrapper.

Do not restart planning, reopen the seven landing-page sections, or redesign the spreadsheet primitive.

## 2. Required reading

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`
4. `docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`
5. `docs/workstreams/ws5-implementation/PLAN-AMENDMENTS-2026-08-01.md`
6. `docs/workstreams/ws5-implementation/IMPLEMENTATION-PROGRESS-2026-08-01.md`
7. `docs/workstreams/WS5-SPEC.md`
8. `docs/workstreams/ws5-build-specs/README.md`
9. `docs/workstreams/ws5-assets/README.md`
10. the exact controlling build specification for the next checkpoint.

## 3. Current Lovable project

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Workspace ID: `c31c8d1d4fa00d0fc8fc`  
Visibility: Private  
Published: No

Installed project knowledge is the frozen `LOVABLE-PROJECT-KNOWLEDGE.md`.

The current approved implementation baseline is the corrected P2 commit:

`a77bc7f4fc69a5af59894f754cc3d88be42f7313`

## 4. Ratified plan amendments

Binding amendments are recorded in:

`docs/workstreams/ws5-implementation/PLAN-AMENDMENTS-2026-08-01.md`

Key rulings:

- retain the sticky-header CTA;
- four CTA origins: `header`, `hero`, `actions`, `final`;
- all four enter the same canonical funnel;
- no separate `cta_clicked` event;
- Section 6 processing rows are static, while its separate privacy FAQ is an accordion;
- Section 7's five product questions are functioning accordions;
- both recruiting questions require explicit Continue buttons;
- `Summer 2028` is exact;
- one checkout screen contains the purchase summary and payment choices;
- duplicate suppression is namespaced by test iteration, surface, and event;
- formal exact assets remain hard attachment gates.

## 5. Completed P1 foundation

P1 implemented:

- four-origin CTA contract;
- typed funnel state and reducer skeleton;
- provider-independent analytics types and no-op adapter;
- exact nine event names;
- email excluded from analytics;
- namespaced duplicate-suppression design;
- lead-storage interfaces only;
- no database or persistence;
- frozen copy scaffolding;
- focus, reduced-motion, typography, spacing, and spreadsheet foundations.

The canonical funnel model was corrected so price advances to one checkout screen and a payment-choice click advances directly to confirmation.

## 6. Completed P2 spreadsheet primitive

P2 implemented and reviewed:

- reusable `SheetWindow` system;
- stable typed column, row, geometry, selection, and tab models;
- recognizable Google Sheets-style chrome;
- exact eight columns and five canonical rows;
- `Contacts` and active `Blotter` tabs;
- maintained-zone tint from Status through Call;
- divider after Firm;
- `D2` Sarah Chen selection and `Replied` formula value;
- corrected status-chip semantics;
- fixed-aspect `ExactAsset` wrapper;
- clean TypeScript check;
- zero page-level horizontal overflow at the 1440px desktop audit.

Do not rebuild or re-style this primitive before P3. Later corrections must be bounded to the controlling section specification.

## 7. Asset packet

Jon supplied the complete repository ZIP. It contains:

- `hero-reference-v1.png`
- `blotter-sheets-reference-v1.html`
- `goldman-sachs-rejection-email-exact-v1.webp`
- `goldman-sachs-rejection-email-exact-v1.html`
- `how-blotter-works-exact-v1.avif`
- `outstanding-actions-reference-v1.png`
- `preservation-exact-v1.html`

The ChatGPT runtime can read and extract these files.

Lovable's MCP requires Lovable-issued upload IDs and rejects local paths and ChatGPT file IDs. Its presigned Google Cloud Storage endpoint is unreachable from the execution container. The Lovable environment also has no authenticated access to the private GitHub repository.

The base64 fallback is abandoned. Lovable's `/tmp` state did not persist between agent runs, and the attempted chunk was absent after the queue resumed. The main agent queue is now operating; there is no remaining queue blocker.

The reliable transfer route is direct native attachment through the Lovable editor's paperclip. Attach the seven original files individually. Do not attach a base64 file and do not ask Lovable to reconstruct an asset from text.

No formal exact asset may be approximated or substituted.

## 8. Exact next action

In the Lovable editor for `Blotter Foundation`:

1. use the paperclip in the chat composer;
2. attach all seven original asset files individually;
3. send one storage-only message instructing Lovable to verify every filename, format, and dimension and to make no code changes;
4. after verification, execute P3 only under `01-HERO.md`, using `hero-reference-v1.png` as directional input and `blotter-sheets-reference-v1.html` as supplemental source;
5. stop for desktop preview, code-diff, and acceptance review before Section 2.

## 9. P3 hero requirements

Use exact hero copy from WS4 and the hero build specification.

Required visual behavior:

- one current spreadsheet only;
- the approved P2 `SheetWindow` primitive;
- exact three activity cues;
- direct cue-to-row mapping for Sarah Chen, Marcus Lee, and Alex Morgan;
- stronger full maintained-block emphasis for those three rows;
- baseline Status-through-Call tint for all rows;
- exact below-sheet ownership underlines and labels;
- no stale sheet;
- no intermediary engine;
- no extra cues or invented capability;
- static first-load comprehension;
- desktop-first, private preview only.

CTA origins:

- sticky header: `header`;
- hero: `hero`.

## 10. Remaining checkpoint sequence

After P3 approval:

1. Section 2.
2. Section 3.
3. Section 4 and shared funnel Frame 3.
4. Section 5.
5. Section 6.
6. Section 7.
7. Complete-page desktop rhythm.
8. Canonical funnel.
9. Lead-storage proposal and approval.
10. Analytics-provider proposal and approval.
11. Responsive and accessibility adaptation.
12. Privacy, claim, lead, and event verification.
13. Private WS5 completion review.

Every checkpoint requires its controlling specification, relevant attachments, explicit stop condition, preview review, diff review, and acceptance review.

## 11. Deployment rule

Keep the project private and unpublished throughout WS5.

Do not:

- deploy publicly;
- route a public domain;
- enable a database without approval;
- connect an analytics vendor without approval;
- implement real OAuth;
- implement Gmail, Calendar, or Sheets integrations;
- collect payment or card information;
- route public traffic.
