# WS5 visual reference index

Date created: July 31, 2026  
Date last updated: August 1, 2026  
Status: Active supporting record  
Governing specification: `../WS5-SPEC.md`  
Build-specification index: `../ws5-build-specs/README.md`

## Purpose

This directory stores the limited set of visual references created outside Lovable for interface-heavy scenes that are difficult to communicate reliably through text alone.

Asset authority levels:

- `directional visual reference`: establishes direction but is not a literal pixel target;
- `formal exact implementation asset`: must be reproduced as specified and is not open to visual reinterpretation.

Every asset must be used with its ratified build specification and the canonical copy, behavior, measurement, responsive, and claim rules in `WS4-SPEC.md`, `WS3-SPEC.md`, and `WS5-SPEC.md`.

## Current handoff packet

### Shared editable spreadsheet source

- `source/blotter-sheets-reference-v1.html`

### Directional hero preview

- `hero/hero-reference-v1.png`

### Formal exact assets

- `section-2/goldman-sachs-rejection-email-exact-v1.webp`
- `section-2/goldman-sachs-rejection-email-exact-v1.html` — supplemental structural reference
- `section-3/how-blotter-works-exact-v1.avif`
- `outstanding-actions/outstanding-actions-reference-v1.png` — Section 4 and funnel Frame 3
- `section-5/preservation-exact-v1.html`

### Ratified written authority

- `../ws5-build-specs/01-HERO.md`
- `../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- `../ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
- `../ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`
- `../ws5-build-specs/05-SECTION-5-PRESERVATION.md`

## 1. Hero spreadsheet reference

Directory: `hero/`

Status: Approved directional reference.  
Build authority: `../ws5-build-specs/01-HERO.md`.

Preserve the Google Sheets-native tracker, exact five contacts, three approved activity cues, compact density, maintained-zone grammar, and ownership copy. Follow the build specification for removal of the stale rear sheet and explicit engine, direct cue-to-row mapping, maintained-zone tint, row emphasis, and below-sheet ownership underlines.

## 2. Section 2 rejection-email asset

Directory: `section-2/`

Status: Formal exact implementation asset.  
Build authority: `../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`.

The `1180 × 560` WebP is the exact visual target. The HTML is supplemental and cannot override the WebP. Preserve the complete Gmail composition and exact visible email state. The scenario is illustrative and must not be described as documentary evidence of a genuine received email.

## 3. Section 3 mechanism asset

Directory: `section-3/`

Status: Formal exact implementation asset.  
Build authority: `../ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`.

The `2048 × 633` AVIF is the exact visual target. Preserve the complete Gmail and Calendar source cluster, arrows, central Blotter module, provisional mark and wordmark, Google Sheets crop, selected state, colors, spacing, shadows, and proportions. The stage labels remain outside the asset. The provisional mark is not the global canonical logo.

## 4. Outstanding Actions asset

Directory: `outstanding-actions/`

Status: Formal exact implementation asset.  
Build authority: `../ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`.

The `1848 × 1160` PNG is exact for both landing-page Section 4 and funnel Frame 3. Preserve the complete Google Sheets chrome, queue structure, counts, exact rows, reasons, overflow rows, fills, borders, row heights, spacing, typography, tint strength, crop, and proportions. Do not create a second independently styled Frame 3 view.

## 5. Section 5 Preservation asset

Directory: `section-5/`

Status: Formal exact implementation asset.  
Build authority: `../ws5-build-specs/05-SECTION-5-PRESERVATION.md`.

Asset:

- `section-5/preservation-exact-v1.html`
- `section-5/README.md`

Reference dimensions:

- `1298 × 334`

The asset is a portable self-contained rendering derived from Jon's uploaded `Hero Sheet Only.html` bundle. It preserves the exact approved visual while removing the original packaging runtime.

Preserve:

- Google Sheets-style chrome and compact density;
- exact five contacts;
- exact column order: Name, Title, Firm, Email, LinkedIn, Status, Next move, Last contact, Days, Call;
- exact emails and blue underlined `Here` LinkedIn links;
- exact status chips, dates, row values, fills, typography, spacing, crop, and proportions;
- divider between LinkedIn and Status;
- existing-data versus live-layer visual distinction.

Do not insert `YOUR EXISTING TRACKER` or `BLOTTER ADDS THE LIVE LAYER` labels inside the asset. The conceptual distinction remains in the section copy and visual zoning.

No additional Section 5 reference is required.

## Storyboard and additional-reference status

The former unified three-frame storyboard was never ratified and is not active.

Completed surfaces requiring no additional references:

- hero;
- Section 2;
- Section 3;
- Section 4 and funnel Frame 3;
- Section 5.

Still unresolved:

- whether funnel Frames 1 and 2 require a compact transition reference;
- whether a later complex surface requires an external reference after written decisions are settled.

Do not default to the former storyboard or create visual assets for conventional text, disclosure, or FAQ sections without a specific implementation reason.

## Handoff protocol

For each approved visual surface:

1. attach the ratified build specification;
2. attach the relevant asset;
3. identify the controlling WS4 or WS3 requirements;
4. state the asset authority level;
5. state exact preserve, change, and exclusion rules;
6. identify the checkpoint stop condition;
7. use Lovable plan mode before multi-section or interactive implementation;
8. approve the plan before code changes;
9. review the specified desktop checkpoint before advancing.

GitHub remains the durable source of truth.

## Exact next action

Review Section 6, `How Blotter uses your data`, under the WS5 build-specification process. Resolve only the desktop information hierarchy, disclosure-component treatment, responsive posture, claim-gate handling, and acceptance criteria. Do not create an external visual asset unless a concrete ambiguity later proves that one is necessary.
