# WS5 Build Specification 05 - Section 5 Preservation

Date ratified: August 1, 2026  
Status: Ratified  
Decision owner: Jon  
Surface: Landing-page Section 5, `Preservation`  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 5 must remove the switching-cost objection.

The viewer should understand that:

1. they keep the Google Sheet and contact record they already built;
2. they do not re-enter every contact;
3. they remain inside Google Sheets;
4. the existing relationship fields remain visible;
5. Blotter adds and maintains the changing recruiting fields in the same standardized recruiting view.

This section does not explain migration architecture, field mapping, or technical setup. It is a simple preservation proof.

## 2. Controlling sources and implementation inputs

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified page content and communication job: `../WS4-SPEC.md`
- Build-specification system: `README.md`
- Visual-reference inventory: `../ws5-assets/README.md`
- Section 5 asset notes: `../ws5-assets/section-5/README.md`
- Formal exact visual target: `../ws5-assets/section-5/preservation-exact-v1.html`

The exact HTML asset is the visual authority for the desktop spreadsheet module. Lovable may translate it into React and CSS only if the rendered result remains visually equivalent in a close side-by-side comparison.

## 3. Exact section order

Use this order:

1. Headline.
2. Supporting copy.
3. Three-item reassurance strip.
4. Formal exact preservation visual.
5. No CTA.
6. No additional closing paragraph.

There is no eyebrow.

## 4. Exact copy

Headline:

`Keep the tracker you already built.`

Supporting copy:

`Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

Reassurance strip:

- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

Use one compact horizontal strip with restrained separators or small check marks. Do not use three large feature cards.

## 5. Formal exact asset authority

Asset:

`../ws5-assets/section-5/preservation-exact-v1.html`

Reference dimensions:

- `1298 × 334`

Asset status:

Formal exact implementation asset.

The asset was derived from Jon's uploaded `Hero Sheet Only.html` bundle and stored as a portable, self-contained static HTML rendering. It preserves the approved visible desktop state without the original bundler runtime.

Lovable must preserve without independent redesign:

- complete Google Sheets-style window and chrome;
- exact crop, proportions, border radius, and shadow;
- document title `IB Recruiting Tracker`;
- menu row, formula bar, column letters, row numbers, grid geometry, and frozen-divider treatment;
- exact column widths, row heights, typography, fills, status chips, dates, spacing, and alignment;
- left-zone blue-gray header treatment;
- right-zone pale yellow header treatment and light maintained-area tint;
- divider between LinkedIn and Status;
- exact five contacts and all visible cell content;
- blue underlined `Here` links in the LinkedIn column.

## 6. Exact spreadsheet structure

Visible tabs remain conceptually `Contacts` and `Blotter`, with the standardized Blotter recruiting view controlling the displayed table. The exact asset governs the rendered desktop crop.

Exact column order:

1. Name
2. Title
3. Firm
4. Email
5. LinkedIn
6. Status
7. Next move
8. Last contact
9. Days
10. Call

Existing-tracker fields:

- Name
- Title
- Firm
- Email
- LinkedIn

Blotter live-layer fields:

- Status
- Next move
- Last contact
- Days
- Call

The vertical divider sits between LinkedIn and Status.

## 7. Exact visible rows

| Name | Title | Firm | Email | LinkedIn | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---|---|---|---|---:|---|
| Sarah Chen | Associate | JPMorgan | sarah.chen@jpmorgan.com | Here | Replied | Reply to Sarah | 1/16/26 | 0 | blank |
| Marcus Lee | Analyst | Evercore | marcus.lee@evercore.com | Here | Call scheduled | Attend coffee chat | 1/15/26 | 1 | 1/17 @ 2:00 PM |
| Priya Shah | Vice President | Lazard | priya.shah@lazard.com | Here | Call completed | Send thank-you | 1/16/26 | 0 | Completed 1/16 |
| Daniel Kim | Associate | Morgan Stanley | daniel.kim@morganstanley.com | Here | No reply | Bump thread | 1/11/26 | 5 | blank |
| Alex Morgan | Analyst | Centerview | alex.morgan@centerview.com | Here | Sent | em dash | 1/16/26 | 0 | blank |

The exact asset controls rendered punctuation, capitalization, dates, chip treatments, and blank-cell appearance.

Every LinkedIn cell displays `Here` as a blue underlined hyperlink to the generic LinkedIn domain. Do not invent fictional profile URLs.

## 8. Relationship to earlier sections

Reuse the same authentic Google Sheets grammar established by the hero and Outstanding Actions scenes.

Do not repeat the hero mechanism. Section 5 contains no:

- Gmail or Calendar activity cues;
- arrows or connectors;
- cue-linked row highlighting;
- ownership underlines;
- stale sheet;
- before-and-after transformation;
- Outstanding Actions groups.

The hero proves live maintenance. Section 5 proves preservation and low switching cost.

## 9. WS4 visual supersession

WS4 described two conceptual zones titled `YOUR EXISTING TRACKER` and `BLOTTER ADDS THE LIVE LAYER`.

The conceptual distinction remains binding, but the exact Section 5 asset does not render those phrases inside the spreadsheet. The visual communicates the split through:

- the column sequence;
- the Email and LinkedIn additions;
- the divider between LinkedIn and Status;
- the contrasting header and zone fills;
- the surrounding Section 5 copy and reassurance strip.

Do not add the two zone labels over or inside the exact asset. This is an explicit later WS5 presentation supersession, not a change to the Section 5 communication job.

## 10. Page composition

Use a centered single-column desktop composition:

- headline and supporting copy above;
- compact reassurance strip beneath the supporting copy;
- exact spreadsheet visual centered below the reassurance strip;
- spreadsheet is the dominant object;
- no additional card around the Google Sheets window;
- no split text-and-visual layout;
- no CTA beneath the asset.

Uniform scaling is allowed to fit the page container. Do not crop the desktop asset during the initial checkpoint.

## 11. Static behavior

Section 5 is static product proof.

Do not add:

- tab-click demonstrations;
- import animation;
- field-mapping animation;
- hover explanations;
- expanding rows;
- interactive migration controls;
- motion required for comprehension.

Global entrance motion may be considered later only if it does not change the approved composition and is not required to understand the section.

## 12. Responsive posture

Desktop is the exact approval target.

Tablet and mobile treatment is deferred. Any later smaller-screen treatment must preserve:

- all ten field names;
- the divider between LinkedIn and Status;
- the distinction between the existing fields and Blotter-maintained fields;
- enough row content to make the preservation claim credible.

A deliberate horizontal crop or controlled internal scrolling region is acceptable later. Do not scale the full spreadsheet until the text becomes unreadable. Responsive decisions do not reopen the desktop asset.

## 13. Explicit exclusions

Do not use:

- an eyebrow;
- a CTA;
- Group or Notes columns;
- two separate competing spreadsheets;
- a technical field-mapping diagram;
- import arrows;
- upload, file-picker, or migration UI;
- drag-and-drop transfer animation;
- a promise that every arbitrary custom layout is preserved exactly;
- Gmail or Calendar cues;
- Outstanding Actions queues;
- dashboard cards;
- additional contacts or fields;
- fictional LinkedIn profile URLs;
- zone labels inserted into the exact spreadsheet asset.

## 14. Lovable handoff instructions

Provide Lovable with:

1. this build specification;
2. `preservation-exact-v1.html`;
3. the relevant Section 5 portion of `WS4-SPEC.md`;
4. the shared spreadsheet-component rules from the approved hero and Outstanding Actions implementations.

Lovable must:

- reproduce the exact desktop visual without redesign;
- place the exact Section 5 copy and reassurance strip outside the asset;
- use the approved spreadsheet primitive where possible;
- preserve all exact fields and visible data;
- stop after the desktop Section 5 checkpoint unless broader implementation has been separately authorized.

## 15. Desktop acceptance criteria

Section 5 is ready for approval only when:

- the exact headline and supporting copy are present;
- the three reassurance lines appear in one restrained strip;
- there is no eyebrow or CTA;
- the exact `1298 × 334` visual is reproduced proportionally without crop;
- the spreadsheet is unmistakably Google Sheets-native;
- Email and LinkedIn appear between Firm and Status;
- every LinkedIn cell displays a blue underlined `Here` link;
- the divider sits between LinkedIn and Status;
- the left existing-data zone and right live-layer zone remain visually distinct;
- all five contacts and exact row values match the asset;
- no migration, mapping, cue, or dashboard treatment has been added;
- the section communicates preservation without suggesting that every arbitrary custom layout remains untouched.

## 16. Remaining questions

No substantive desktop Section 5 questions remain.

Deferred bounded questions:

- tablet and mobile adaptation;
- optional global motion;
- final inter-section spacing in the complete page.

These do not reopen the desktop decision.

## 17. Ratification record

Jon supplied and approved the exact Section 5 asset on August 1, 2026 and instructed that it be added to GitHub, documented consistently with the prior sections, and followed by progression to Section 6.
