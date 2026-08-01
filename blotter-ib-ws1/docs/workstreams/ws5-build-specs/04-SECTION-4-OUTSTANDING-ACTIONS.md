# WS5 Build Specification 04 - Section 4 Outstanding Actions

Date ratified: August 1, 2026  
Status: Ratified  
Decision owner: Jon  
Surface: Landing-page Section 4, `Outstanding Actions`, and canonical funnel product-experience Frame 3  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 4 must show the operational payoff of Blotter in one immediately usable view:

> The user can open the tracker and see every reply, follow-up, and thank-you note that currently requires attention without reconstructing next moves from Gmail, Calendar, memory, or scattered notes.

The section should communicate that Blotter does more than maintain individual relationship rows. It also gathers outstanding obligations into one current action view.

A viewer should understand that:

1. the tracker contains one current list of actions owed;
2. replies, follow-ups, and thank-you notes are separated into clear groups;
3. each visible row explains both the required action and why it appears;
4. the action view remains inside the Google Sheets workflow;
5. the same exact view is the canonical product-experience Frame 3 visual.

Section 4 contains the page's second primary CTA.

## 2. Controlling sources and implementation inputs

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified page and funnel content: `../WS4-SPEC.md`
- Funnel architecture and CTA-origin tracking: `../WS3-SPEC.md`
- Build-specification system: `README.md`
- Visual-reference inventory: `../ws5-assets/README.md`
- Outstanding Actions asset notes: `../ws5-assets/outstanding-actions/README.md`
- Formal exact visual target: `../ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`
- Supplemental editable source: `../ws5-assets/source/blotter-sheets-reference-v1.html`

The PNG is the sole formal visual authority. The editable HTML is an implementation aid and does not override the PNG where any visual discrepancy exists.

This specification does not alter the ratified Section 4 copy, CTA wording, queue content, or funnel Frame 3 copy. It freezes the exact desktop asset, page composition, reuse rules, responsive posture, and implementation exclusions.

## 3. Required viewer understanding

The complete desktop section should communicate in approximately three seconds:

1. there are `21 outstanding actions`;
2. they are grouped into replies owed, follow-ups due, and thank-you notes;
3. each action row states the contact, next action, and triggering reason;
4. the user can act without manually rebuilding the current state of the recruiting process.

The section should feel practical, calm, current, and action-oriented. It must not feel like a generic task-management dashboard or a separate application outside Google Sheets.

## 4. Exact landing-page section order

Use this order:

1. Headline.
2. Supporting line.
3. Formal exact Outstanding Actions visual.
4. CTA line.
5. CTA button.
6. No additional closing paragraph.

There is no eyebrow in Section 4.

## 5. Exact landing-page copy

Headline:

`Know exactly what needs your attention.`

Supporting line:

`Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.`

CTA line:

`Open your tracker and know what to do next.`

CTA button:

`See how Blotter works`

CTA behavior:

- enters the canonical WS3 funnel;
- stores `cta_location = actions`;
- uses the same reusable CTA component as the hero and final page CTA;
- does not add price, beta, account-connection, or permission language.

## 6. Formal exact asset authority

Asset:

`../ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`

Reference dimensions:

- `1848 × 1160`

Asset status:

Formal exact implementation asset.

This is not a directional reference. Jon ratified the visual exactly as it currently appears.

Lovable must preserve without independent redesign:

- complete Google Sheets chrome and window framing;
- exact crop and proportions;
- title and total-count placement;
- exact toolbar, formula-bar, row-number, column-letter, grid, tab, and sheet-chrome treatment;
- exact `Outstanding actions` heading;
- exact `21 outstanding actions` count;
- one global column-header row;
- exact group-header hierarchy;
- exact group fills, border treatments, row heights, spacing, typography, alignment, shadows, and tint strength;
- exact visible action rows;
- exact overflow rows;
- all visible wording, punctuation, capitalization, and counts;
- full-width spreadsheet rows rather than cards.

Lovable may translate the asset into React and CSS or reuse the approved spreadsheet component only when the rendered desktop result remains visually equivalent in a close side-by-side comparison.

Do not clean up, modernize, simplify, reinterpret, or restyle the asset.

## 7. Exact visible content

The asset must retain the complete visible state exactly as rendered.

Top-level content:

- `Outstanding actions`
- `21 outstanding actions`

Global columns:

- `Contact`
- `Next action`
- `Why it is here`

Group 1:

`Replies owed - 6`

- Marcus Lee | Reply to Marcus | Marcus replied 2 hours ago
- Daniel Kim | Reply to Daniel | Daniel replied yesterday
- `+4 more replies owed`

Group 2:

`Follow-ups due - 11`

- Sarah Chen | Bump thread | No reply for 6 days
- Alex Morgan | Bump thread | No reply for 8 days
- `+9 more follow-ups due`

Group 3:

`Thank-you notes - 4`

- Priya Shah | Send thank-you | Coffee chat completed yesterday
- James Wu | Send thank-you | Call completed 3 hours ago
- `+2 more thank-you notes`

Where punctuation or dash styling in the PNG differs from the plain-text transcription above, the PNG controls the rendered visual.

Do not add a fourth group, additional visible rows, status columns, filters, charts, sidebars, or summary tiles.

## 8. Landing-page composition and hierarchy

Use a centered, single-column desktop composition.

Recommended page-context structure:

- the headline and supporting line sit above the visual;
- the exact spreadsheet visual is centered beneath the copy;
- the visual occupies most of the usable page width;
- the CTA line and button form one compact centered block beneath the visual.

Desktop target:

- approximately `1440px` viewport;
- approximately `1180px` to `1280px` usable visual width;
- scale the exact asset uniformly as required by the approved page container;
- preserve the complete asset without cropping on desktop;
- keep the spreadsheet as the dominant object.

Do not place the visual inside another card, panel, browser shell, or decorative frame. The Google Sheets window already provides the contained interface object.

Do not use a split layout with explanatory text beside the spreadsheet.

## 9. Group hierarchy and spreadsheet behavior

The exact asset already defines the group hierarchy. Preserve it exactly.

The view uses:

- one top-level title and total count;
- one shared column-header row;
- three full-width category headers;
- two readable rows per category;
- one muted overflow row per category.

The group counts remain part of the group headers. Do not repeat them as badges, KPI cards, or summary tiles.

The view is static product proof. Do not add:

- tabs;
- filters;
- dropdown controls;
- collapsible groups;
- hover explanations;
- row-selection interactions;
- auto-scrolling;
- required animation;
- live-count effects.

A later global entrance-motion system may affect how the section enters the page, but motion must not alter the exact asset or be necessary for comprehension.

## 10. Canonical funnel Frame 3 reuse

The same exact Outstanding Actions visual is the canonical product-experience Frame 3 visual.

Frame 3 surrounding copy remains governed by WS4:

Header:

`Know exactly what needs your attention.`

Supporting line:

`Blotter gathers every reply, follow-up, and thank-you note you owe into one current view.`

Progress indicator:

`3 of 3`

Button:

`Continue`

Reuse rules:

- use the same exact asset, data, groups, rows, counts, spacing, and visual treatment;
- do not build a second independently styled Outstanding Actions component;
- do not change the queue content for the funnel;
- do not omit a category or substitute different example rows;
- preserve the asset's desktop proportions and scale it uniformly within the stable funnel shell;
- do not crop or redesign the asset for the initial desktop funnel checkpoint;
- leaving Frame 3 through `Continue` triggers `product_experience_completed` under the existing WS3 and WS4 event rules.

The page section and Frame 3 differ only in surrounding context:

- landing-page Section 4 uses the Section 4 headline, supporting line, CTA line, and funnel-entry CTA;
- funnel Frame 3 uses the frame header, supporting line, progress indicator, and `Continue` button.

The product visual itself remains the same formal exact asset.

## 11. Relationship to other spreadsheet surfaces

Section 4 must feel consistent with the hero and later funnel scenes because all use Google Sheets visual language.

However:

- the hero demonstrates relationship-state maintenance and cue-to-row causality;
- Section 4 demonstrates the consolidated action view;
- funnel Frames 1 and 2 demonstrate activity arriving and relationship fields updating;
- funnel Frame 3 uses this exact action view as the operational payoff.

Do not add hero activity cues, cue-to-row connectors, ownership labels, maintained-zone underlines, or a normal contact-tracker view to Section 4.

Do not turn the Outstanding Actions view into three dashboard cards.

## 12. Responsive posture

Desktop is the current approval target.

For desktop:

- reproduce the exact `1848 × 1160` composition;
- scale uniformly only as required by the page or funnel container;
- do not crop meaningful content;
- preserve readable rows, category labels, counts, and reasons.

Tablet and mobile adaptation remain deferred bounded implementation questions.

Any later smaller-screen treatment must preserve:

- all three category counts;
- at least one readable explanatory row from each category;
- the category order;
- the relationship among Contact, Next action, and Why it is here;
- recognizable Google Sheets context;
- no page-level horizontal scrolling where a deliberate crop or responsive translation can preserve meaning more effectively.

A smaller-screen translation may use proportional scaling, a controlled crop, or a separately composed responsive version only after desktop approval. It must not reopen or weaken the desktop asset decision.

## 13. Explicit exclusions and rejected treatments

Do not implement:

- an eyebrow;
- a split text-and-visual layout;
- another card around the spreadsheet;
- three queue cards;
- dashboard KPI tiles;
- large category icons;
- a fourth action category;
- extra visible rows;
- status pills or a status column;
- filters, search, charts, sidebars, or task controls;
- animation required for comprehension;
- a separately redesigned funnel Frame 3 visual;
- different queue content between the page and funnel;
- price or beta language;
- OAuth or permissions content;
- a secondary CTA;
- another closing paragraph;
- real integration behavior.

## 14. Lovable implementation instructions

When the Section 4 and funnel Frame 3 checkpoints are authorized, provide Lovable with:

1. this build specification;
2. the exact PNG asset;
3. the supplemental editable spreadsheet source when useful;
4. the relevant WS4 Section 4 and funnel Frame 3 content;
5. the global design-system and page-shell plan approved at the foundation checkpoint.

Lovable must:

1. reproduce the exact asset rather than redesigning it;
2. use the exact landing-page copy and order;
3. place the exact asset as the dominant centered section visual;
4. implement the exact CTA line and button;
5. store `cta_location = actions` when the page CTA enters the funnel;
6. reuse the exact asset for funnel Frame 3;
7. preserve the funnel's stable shell, progress indicator, and `Continue` behavior without altering the asset;
8. include no unratified controls, rows, categories, claims, or product behavior;
9. make both uses understandable without motion;
10. stop after the desktop Section 4 and desktop Frame 3 reuse are ready for review unless a broader checkpoint is explicitly authorized.

Lovable has bounded discretion only for:

- exact whitespace between surrounding page copy, asset, and CTA;
- uniform scaling within the approved desktop container;
- section-level spacing within the established page rhythm;
- later responsive proposals after desktop approval.

Lovable has no discretion to redesign the formal exact asset.

## 15. Desktop acceptance criteria

Section 4 and Frame 3 are ready for approval only when all of the following are true:

- no eyebrow appears;
- landing-page headline and supporting line use exact copy;
- the exact `1848 × 1160` Outstanding Actions asset is reproduced without redesign;
- the complete Google Sheets composition remains visible on desktop;
- `Outstanding actions` and `21 outstanding actions` are exact;
- the three global columns are exact;
- all three groups, counts, visible rows, reasons, and overflow rows are exact;
- group hierarchy, fills, borders, row heights, spacing, typography, tint strength, chrome, and proportions match the asset;
- no cards, dashboard tiles, icons, filters, charts, or additional controls appear;
- the CTA line and `See how Blotter works` button use exact copy;
- the CTA stores `cta_location = actions`;
- funnel Frame 3 uses the same exact visual rather than a second design;
- funnel Frame 3 preserves its exact header, supporting line, `3 of 3` indicator, and `Continue` button;
- leaving Frame 3 triggers `product_experience_completed` according to the canonical event rules;
- both uses work in a static desktop screenshot;
- no unratified claim, product capability, or integration behavior is added.

## 16. Remaining questions

No substantive desktop Section 4 or funnel Frame 3 visual questions remain within this ratified scope.

The following are deferred and do not reopen the desktop decision:

- tablet and mobile adaptation;
- optional global entrance motion;
- final pixel spacing after Section 3 and before Section 5;
- exact smaller-screen treatment inside the funnel shell;
- implementation method used to reproduce the PNG while preserving visual equivalence.

No additional external visual reference is required.

## 17. Ratification record

Jon ratified the following on August 1, 2026:

- the existing Outstanding Actions PNG exactly as rendered;
- formal exact asset status rather than directional-reference status;
- use of the same exact visual for landing-page Section 4 and funnel product-experience Frame 3;
- exact section order of headline, supporting line, visual, CTA line, and CTA button;
- centered single-column desktop composition;
- spreadsheet dominance and no surrounding card;
- exact Google Sheets structure, group hierarchy, content, and styling;
- static behavior with no required interaction or motion;
- exact CTA treatment and `cta_location = actions`;
- desktop-first responsive posture with smaller-screen treatment deferred;
- one dedicated build specification;
- no additional external visual reference;
- Section 4 and Frame 3 are complete and ready to enter the frozen implementation packet after repository reconciliation.
