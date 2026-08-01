# Blotter IB - Current Handoff

Date: August 1, 2026

## 1. Current objective

Continue Workstream 5 from the completed desktop hero and Sections 2 through 5 ratification checkpoints.

Workstreams 1 through 4 are complete. WS5 is active. The repository is reconciled, the build-specification system is established, and the following landing-page surfaces are fully ratified for desktop implementation:

1. Hero spreadsheet visual.
2. Section 2 scale and consequence.
3. Section 3 How Blotter works.
4. Section 4 Outstanding Actions.
5. Section 5 Preservation.

Canonical funnel product-experience Frame 3 is also ratified because it uses the same exact Outstanding Actions visual as Section 4.

The next task is to review and settle Section 6, `How Blotter uses your data`, through the same self-contained build-specification process.

Do not begin Lovable planning or implementation yet.

## 2. Required reading

Read in this order before acting:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS5-SPEC.md`
4. `docs/workstreams/ws5-build-specs/README.md`
5. `docs/workstreams/ws5-build-specs/01-HERO.md`
6. `docs/workstreams/ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
7. `docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
8. `docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`
9. `docs/workstreams/ws5-build-specs/05-SECTION-5-PRESERVATION.md`
10. `docs/workstreams/ws5-assets/README.md`
11. `docs/workstreams/WS4-SPEC.md`
12. `docs/workstreams/WS3-SPEC.md`
13. `docs/workstreams/WS2-SPEC.md`
14. `docs/05-working-agreement.md`

For exact asset context, also read:

- `docs/workstreams/ws5-assets/section-2/README.md`
- `docs/workstreams/ws5-assets/section-3/README.md`
- `docs/workstreams/ws5-assets/outstanding-actions/README.md`
- `docs/workstreams/ws5-assets/section-5/README.md`

## 3. Source-of-truth rules

- Jon's explicit later instructions are highest authority.
- `WS5-SPEC.md` controls the durable WS5 system, scope, sequence, and gates.
- A ratified file in `ws5-build-specs/` controls the detailed visual and behavioral implementation of its exact surface.
- `WS4-SPEC.md` controls exact page copy, section order, communication jobs, funnel presentation, responsive priorities, and claim boundaries except where a later ratified WS5 build specification explicitly supersedes a detail.
- `WS3-SPEC.md` controls event names, properties, price, measurement, and read rules.
- `ws5-assets/README.md` and each asset README state whether a visual is directional or a formal exact implementation target.
- Do not use old handoffs, abandoned renders, deleted asset paths, chat shorthand, or Lovable defaults to override these files.

## 4. Required build-specification process

For each unresolved landing-page or funnel surface:

1. read the controlling WS4 or WS3 requirements;
2. review any relevant visual reference;
3. resolve presentation and behavior questions with Jon;
4. write a self-contained specification that a future reader can understand without the originating chat;
5. obtain explicit ratification;
6. update the build-spec index, WS5, handoff, open questions, relevant asset records, Start Here, and decision log where appropriate;
7. only then move to the next surface.

Do not record decisions using internal labels such as `Option A` or `the version we discussed`. State the actual requirement.

## 5. Current asset packet

### Shared editable spreadsheet source

- `docs/workstreams/ws5-assets/source/blotter-sheets-reference-v1.html`

### Directional hero preview

- `docs/workstreams/ws5-assets/hero/hero-reference-v1.png`

### Formal exact Section 2 asset

- `docs/workstreams/ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.webp`
- supplemental HTML: `docs/workstreams/ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.html`

### Formal exact Section 3 asset

- `docs/workstreams/ws5-assets/section-3/how-blotter-works-exact-v1.avif`

### Formal exact Section 4 and funnel Frame 3 asset

- `docs/workstreams/ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`

### Formal exact Section 5 asset

- `docs/workstreams/ws5-assets/section-5/preservation-exact-v1.html`

The hero preview remains directional. The Section 2, Section 3, Outstanding Actions, and Section 5 assets are formal exact desktop targets.

## 6. Completed surface status

### Hero

Controlling specification:

`docs/workstreams/ws5-build-specs/01-HERO.md`

The hero uses one current Google Sheets-style tracker, three exact activity cues, direct cue-to-row mapping, a shared maintained-zone tint, stronger emphasis for the three cue-linked rows, and below-sheet ownership labels with restrained region underlines. It excludes the stale rear sheet and explicit Blotter engine.

### Section 2

Controlling specification:

`docs/workstreams/ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

Section 2 uses exact figures of 628 recruiting emails, 68 coffee chats, 19 applications, and 30 interview rounds; a subordinate approximately 60-hour administration estimate and methodology; one exact three-sentence supporting paragraph; the formal exact Goldman Sachs Gmail visual with two external annotations; closing copy; and no CTA.

### Section 3

Controlling specification:

`docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`

Section 3 uses three external stage labels, one formal exact Gmail and Calendar to Blotter to Google Sheets visual, the exact boundary line, three product-boundary badges, the exact closing line, and no CTA. The former `YOU CONTROL` and `BLOTTER MAINTAINS` block is removed.

### Section 4 and funnel Frame 3

Controlling specification:

`docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`

The existing `1848 × 1160` Outstanding Actions PNG is a formal exact implementation asset. Landing-page Section 4 uses the exact headline, supporting line, asset, CTA line, and `See how Blotter works` button with `cta_location = actions`. The same exact visual governs funnel Frame 3 and must not be independently redesigned.

### Section 5 Preservation

Controlling specification:

`docs/workstreams/ws5-build-specs/05-SECTION-5-PRESERVATION.md`

Formal exact asset:

`docs/workstreams/ws5-assets/section-5/preservation-exact-v1.html`

Reference dimensions:

- `1298 × 334`.

Exact landing-page order:

1. Headline.
2. Supporting copy.
3. Compact three-item reassurance strip.
4. Exact preservation spreadsheet visual.
5. No CTA or additional closing paragraph.

There is no eyebrow.

The visual uses the established five contacts and exact column order:

`Name | Title | Firm | Email | LinkedIn | Status | Next move | Last contact | Days | Call`

The divider sits between LinkedIn and Status. Every LinkedIn cell displays a blue underlined `Here` link. Email and LinkedIn belong to the existing-tracker side; Status through Call belong to the Blotter live layer.

The exact asset does not include the conceptual labels `YOUR EXISTING TRACKER` or `BLOTTER ADDS THE LIVE LAYER`. The conceptual distinction remains, but the labels are intentionally omitted from the spreadsheet and communicated through column order, divider, fills, page copy, and the reassurance strip.

Do not add Gmail or Calendar cues, ownership underlines, stale-sheet framing, migration arrows, field-mapping UI, Group or Notes columns, dashboard cards, or a CTA.

Desktop is the approval target. Tablet and mobile adaptation remain deferred bounded questions.

## 7. Storyboard and additional-reference status

The former unified three-frame storyboard recommendation was never ratified and is not active.

Completed surfaces require no additional external references:

- hero;
- Section 2;
- Section 3;
- Section 4 and funnel Frame 3;
- Section 5.

Still unresolved:

- whether funnel Frames 1 and 2 require a compact transition reference;
- whether another later complex surface requires an external reference after written decisions are settled.

Section 6 is a conventional disclosure surface and should not receive an external visual asset by default.

## 8. Lovable project state

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Visibility: Private  
Published: No  
Current state: Paused

Existing code is unapproved scaffolding unless independently supported by the canonical specifications.

## 9. Exact next action

Review Section 6, `How Blotter uses your data`, under the WS5 build-specification process.

The discussion should settle only:

1. the desktop information hierarchy around the already-ratified disclosure copy;
2. treatment of the main candid claim;
3. treatment of the four-step explanation;
4. the exact permissions-table composition;
5. placement and emphasis of the broad Google-permission disclosure;
6. treatment of the plain commitments and privacy FAQ;
7. how provisional provider and implementation-dependent claims are visibly governed;
8. responsive posture and desktop acceptance criteria;
9. whether a concise dedicated build specification is required.

Do not reopen the ratified privacy copy or invent an external visual asset unless a concrete implementation ambiguity later proves one is necessary.

## 10. Current exclusions

Do not build or imply:

- real Gmail, Calendar, or Sheets integrations;
- OAuth;
- card entry or payment collection;
- public deployment or acquisition traffic;
- standalone platform page;
- production backend behavior beyond minimum validation infrastructure.
