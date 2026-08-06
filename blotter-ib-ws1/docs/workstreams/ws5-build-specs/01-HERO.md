# WS5 Build Specification 01 — Landing-page hero spreadsheet visual


> **Amended by Jon, August 5, 2026, during the stage 6 build.** He is authority
> level 1 under `WS5-SPEC.md` "Source hierarchy". Reasoning is recorded in
> `04-decision-log.md`; the implementation carries the same notes inline.
>
> | Item here | Amended to |
> |---|---|
> | Section 7, third cue `Gmail: Email sent to Alex Morgan — Jan 16 · 8:18 AM` | `Gmail: No reply for 5 days — Last contact Jan 11`, mapped to Daniel Kim. |
> | Section 7 closing paragraph, holding that Daniel Kim's no-reply state stays Blotter-maintained with no card shown | Superseded. Silence is the stronger proof: a reply is bolded in the reader's inbox and they can notice it unaided, whereas nothing at all arrives to mark a thread going quiet. |
>
> Consequences, all implemented: the cue stack was retuned from `[180, 243, 358]`
> to `[180, 243, 322]`, because the old third position sat 35.25px from Daniel
> and would have read as pointing at Alex Morgan. Every card still sits within
> 13px of its own target row and no closer than 35px to any other. Connector
> endpoints were asserted in the DOM at 192.25, 235.75 and 322.75, dead-centre on
> Sarah, Marcus and Daniel.
>
> Unchanged and still binding: the other two cues verbatim, Alex Morgan's row and
> its ratified em dash, which is a ruling about the cell rather than the cue, the
> section 9 connector rules, and the section 12 exclusions.

Date ratified: July 31, 2026  
Status: Ratified  
Decision owner: Jon  
Surface: Landing-page hero visual module  
Implementation priority: Desktop first

## 1. Purpose and communication job

The hero visual must show that relevant recruiting activity from Gmail and Calendar directly maintains the changing relationship-state fields in the user's recruiting spreadsheet.

A viewer should understand the following within approximately two seconds:

> The student adds the contacts. Blotter uses relevant recruiting activity to keep the live relationship state in the spreadsheet current.

The hero is responsible for communicating the mechanism and the current outcome. It is not responsible for showing tracker decay, a before-and-after transformation, or the stale manual state. Tracker decay and stale-sheet storytelling belong later in the landing page, beginning with the separate Section 2 design discussion.

This specification governs the spreadsheet-and-cues visual module. The surrounding hero headline, supporting copy, CTA, navigation, and section-level spacing remain controlled by `WS4-SPEC.md` and the later page-composition plan.

## 2. Controlling sources and implementation inputs

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Page copy and communication job: `../WS4-SPEC.md`
- Visual-reference index: `../ws5-assets/README.md`
- Hero asset notes: `../ws5-assets/hero/README.md`
- Review preview: `../ws5-assets/hero/hero-reference-v1.png`
- Editable source: `../ws5-assets/source/blotter-sheets-reference-v1.html`

The PNG and HTML establish the approved visual direction for the spreadsheet, cue cards, density, data, and overall composition. This written specification controls the required changes to the mapping system, ownership treatment, maintained-zone treatment, and removal of the stale sheet and explicit engine.

Do not embed the PNG as the production hero. Do not iframe the reference HTML as the final implementation. Build the visual as reusable page components so it can be reviewed, refined, and adapted later.

## 3. Desktop-first posture

The initial hero design and approval target is desktop web.

Primary review viewport:

- approximately `1440px` wide browser viewport;
- centered page content;
- visual module allowed to occupy approximately `1240px` to `1360px` of usable width when the page container permits;
- reference aspect ratio remains approximately `1360 × 520`.

The current reference uses an approximately `1000 × 400` spreadsheet window with the activity cues occupying the supporting right-side area. Preserve that hierarchy and relative dominance rather than treating the dimensions as inflexible pixel measurements.

Do not allow tablet or mobile considerations to weaken the desktop composition during the first hero checkpoint. A separate responsive adaptation will be resolved later. The desktop hero must be understandable without relying on hover, animation, or a mobile-specific explanation.

## 4. Overall composition

Use one current spreadsheet and one stack of three activity cues.

Required composition:

- one dominant Google Sheets-style spreadsheet window;
- three compact activity cues positioned to the right of the spreadsheet;
- enough separation for the cues and connector paths to read clearly;
- spreadsheet remains visually dominant;
- cues remain supporting evidence, not equal-weight marketing cards;
- no stale spreadsheet behind, beneath, or partially peeking from the current sheet;
- no before-and-after labels;
- no standalone Blotter engine, processor box, vertical engine rail, or intermediary diagram between the cues and the sheet.

The causal story must be communicated through the direct cue-to-row mapping, the maintained-zone tint, and the ownership labels. Do not add another explanatory object that the viewer must decode.

## 5. Spreadsheet visual: preserve closely

The current spreadsheet visual is approved directionally and should be reproduced very closely.

Preserve:

- recognizable Google Sheets chrome;
- compact spreadsheet density;
- toolbar and formula-bar treatment;
- column letters and row numbers;
- visible gridlines;
- document title `IB Recruiting Tracker`;
- visible tabs `Contacts` and `Blotter`;
- active `Blotter` tab;
- current column order and widths unless a very small adjustment is required to fit the final desktop container;
- restrained Google Sheets-style dropdown chips rather than full-cell status fills;
- current hierarchy, typography scale, shadows, border radius, and overall proportions;
- clean crop immediately after the visible data rows;
- selected cell may remain Sarah Chen's `D2` Status cell with the formula bar reading `Replied`.

Avoid:

- generic SaaS table styling;
- CRM, Airtable, Notion, finance-terminal, or Excel-dashboard styling;
- glassmorphism;
- large decorative browser framing;
- oversized row heights;
- large cards inside the sheet;
- full-cell status colors that overpower the spreadsheet grammar.

## 6. Exact spreadsheet structure and data

Document title: `IB Recruiting Tracker`

Visible tabs:

- `Contacts`
- `Blotter`

Active tab: `Blotter`

Exact column order:

1. Name
2. Title
3. Firm
4. Status
5. Next move
6. Last contact
7. Days
8. Call

Do not add Email, Group, Notes, Priority, Location, LinkedIn, Owner, Stage, or any other fields.

Student-maintained columns:

- Name
- Title
- Firm

Blotter-maintained columns:

- Status
- Next move
- Last contact
- Days
- Call

Exact rows:

| Name | Title | Firm | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---|---|---:|---|
| Sarah Chen | Associate | JPMorgan | Replied | Reply to Sarah | Jan 16 | 0 | blank |
| Marcus Lee | Analyst | Evercore | Call scheduled | Attend coffee chat | Jan 15 | 1 | Jan 17, 2:00 PM |
| Priya Shah | Vice President | Lazard | Call completed | Send thank-you | Jan 16 | 0 | Completed Jan 16 |
| Daniel Kim | Associate | Morgan Stanley | No reply | Bump thread | Jan 11 | 5 | blank |
| Alex Morgan | Analyst | Centerview | Sent | blank | Jan 16 | 0 | blank |

Blank cells must be genuinely blank. Do not use a dash, em dash, `N/A`, `None`, or placeholder text.

> **One exception, ruled by Jon August 5, 2026.** Alex Morgan's `Next move` carries the em dash,
> muted and centred, exactly as `hero-reference-v1.png` draws it. This reverses the August 4
> removal and overrides the rule above for that single cell.
>
> The rule stands everywhere else, on every surface, including the Section 5 preservation view.
> Implemented as the `{ dash: true }` cell in `sheet-grid.tsx`, which exists for this cell alone.

Use a clear vertical boundary between Firm and Status. It should be more legible than an ordinary gridline but remain consistent with spreadsheet geometry.

## 7. Activity cues: preserve closely

The three cue cards in the current reference are approved and should remain close to their current visual treatment.

Exact cues, in this top-to-bottom order:

1. Gmail: `Sarah Chen replied` — `Jan 16 · 10:42 AM`
2. Calendar: `Coffee chat with Marcus Lee` — `Jan 17 · 2:00 PM`
3. Gmail: `Email sent to Alex Morgan` — `Jan 16 · 8:18 AM`

Preserve:

- compact size;
- restrained Gmail or Calendar source identification;
- concise primary line;
- small timestamp line;
- simple, realistic activity-snippet appearance;
- supporting visual weight relative to the spreadsheet.

Do not add:

- message previews;
- subject lines;
- message bodies;
- avatars;
- banker photographs;
- bank logos;
- extra timestamps or metadata;
- additional cues for Priya Shah or Daniel Kim;
- larger marketing-card treatments.

The three cues are illustrative examples. They are not intended to exhaustively represent every state Blotter derives. Priya Shah's completed-call state and Daniel Kim's no-reply state remain Blotter-maintained even though no corresponding current notification card is shown.

## 8. Baseline Blotter-maintained zone

> **Superseded in part, August 5, 2026, by Jon's explicit instruction.**
>
> The maintained zone is marked by the **header band alone**. Data rows carry no tint.
>
> This matches `hero-reference-v1.png`, which samples `#f7f2e8` across the maintained header
> and `#fafbfd` across every data row, with no per-row variation. The measured manual header
> is `#edf2f8` and manual data rows are `#ffffff`.
>
> The requirement below for a tint across all five data rows, and the section 10 requirement
> for stronger emphasis on the three cue-linked rows, are both inactive.
>
> **Revisit condition:** if, once the full hero is assembled, the cue-to-row connectors alone
> prove too thin a signal for which rows each cue maintains, reopen this with Jon. The
> implementation retains the per-row `emphasised` flag so reversal is a one-line change.

The complete right-hand side of the spreadsheet must read as one continuous Blotter-maintained zone.

Apply a faint shared tint to the grid area from `Status` through `Call`, covering:

- the five spreadsheet headers from `Status` through `Call`;
- ~~all five visible data rows beneath those headers~~ (inactive, see above).

Do not tint:

- the toolbar;
- the formula bar;
- the column-letter strip;
- the manual Name, Title, or Firm columns.

Tint requirements:

- derive the tint from the Blotter yellow already used in the directional asset;
- use a low-opacity treatment, approximately `5%` to `8%`, so the grid, text, dropdown chips, and white-sheet character remain intact;
- maintain one continuous visual region rather than coloring individual cells independently;
- preserve sufficient contrast and avoid making the area look like a selected spreadsheet range.

This baseline tint communicates that every visible field from Status through Call is maintained by Blotter, including rows without an activity cue.

## 9. Direct cue-to-row mapping

Remove the current cue-to-engine-to-sheet sequence entirely.

Each cue must connect directly to the corresponding relationship row's Blotter-maintained block:

- `Sarah Chen replied` maps to Sarah Chen's `Status` through `Call` block.
- `Coffee chat with Marcus Lee` maps to Marcus Lee's `Status` through `Call` block.
- `Email sent to Alex Morgan` maps to Alex Morgan's `Status` through `Call` block.

Connector requirements:

- one connector per cue;
- begin at the left edge of the corresponding cue card;
- route toward the spreadsheet from right to left;
- land at the right edge or visual boundary of the corresponding row's maintained block;
- align each cue vertically as closely as practical with its target row so the routes remain short and easy to scan;
- use thin, restrained lines with clean horizontal or shallow-elbow routing;
- keep the three routes separated;
- avoid crossings;
- avoid routing lines across sheet text, chips, or multiple unrelated rows;
- use a small endpoint node or short terminal stroke if needed for clarity;
- do not use oversized arrowheads, animated particles, glowing tubes, or a line spiderweb.

The mapping must be legible in a static screenshot. Motion cannot be required for the viewer to understand which cue corresponds to which row.

## 10. Example-row emphasis

> **Inactive, August 5, 2026, by Jon's explicit instruction.** See the note in section 8.
> No data row carries a tint, so no row carries emphasis either. The cue-to-row connectors
> are the sole indicator of which rows each cue maintains. Subject to the revisit condition
> recorded in section 8.

The three cue-linked rows must receive a secondary emphasis across their full Blotter-maintained block.

For Sarah Chen, Marcus Lee, and Alex Morgan:

- emphasize the contiguous `Status` through `Call` cells for that row;
- use a slightly stronger version of the baseline yellow tint, approximately `10%` to `14%`, and/or a restrained `1px` warm outline around the contiguous block;
- preserve all gridlines, text, and chip legibility;
- keep the treatment subtle enough that the sheet remains credible as Google Sheets.

For Priya Shah and Daniel Kim:

- retain only the baseline maintained-zone tint;
- do not visually de-emphasize them as unmaintained;
- do not add missing-cue placeholders.

Do not highlight only one isolated cell for each cue. Isolated-cell-only highlighting would imply that only the selected fields are maintained by Blotter. The intended message is that each cue illustrates a relationship's broader live state within a fully maintained right-hand zone.

## 11. Ownership labels below the spreadsheet

Keep both responsibility labels outside the sheet and below it.

Exact copy:

- `YOU add the contacts`
- `BLOTTER keeps them current`

Use restrained region underlines, not braces and not top-of-sheet banners.

Required treatment:

- place one thin horizontal region line below the manual columns from Name through Firm;
- place one thin horizontal region line below the maintained columns from Status through Call;
- align each line precisely with the horizontal span of its column group;
- use small vertical end ticks or restrained bracket terminals to make each region boundary clear;
- center the corresponding label beneath its line;
- use a neutral gray treatment for the manual-zone line and label;
- use the Blotter yellow family for the maintained-zone line and label;
- maintain clear spacing from the sheet tabs and lower chrome so the labels do not appear to be part of Google Sheets itself.

The labels must not appear above the spreadsheet. The Google Sheets toolbar and formula bar create too much separation from the referenced columns and make top-positioned ownership labels ambiguous.

Do not use curly braces, oversized banners, colored panels, or full-width captions.

## 12. Treatments explicitly removed from the hero

The following are not part of the hero and must not be reintroduced without a later Jon ruling:

- stale rear sheet;
- partial stale-sheet fragment;
- layered before-and-after sheets;
- `before` and `after` labels;
- explicit tracker-decay story;
- vertical Blotter engine;
- central processor box;
- cue-to-engine-to-sheet flow;
- ownership labels above the sheet;
- isolated-cell-only cue highlighting;
- additional cue cards;
- explanatory marketing copy inside the visual module.

A stale tracker or stale-sheet treatment may be considered for Section 2 through a separate ratification. That possibility does not permit it in the hero.

## 13. Static-state and motion rule

The hero must fully communicate its mechanism in a static first-load state and in a screenshot.

Do not rely on animation to reveal the mapping or maintained zone. Complex looping animation is outside the initial hero scope.

A later implementation checkpoint may consider restrained micro-motion only if:

- it is not required for comprehension;
- it does not alter the approved composition;
- it respects reduced-motion settings;
- it receives separate approval.

## 14. Lovable implementation instructions

When the hero checkpoint is authorized, provide Lovable with this specification, the PNG preview, and the editable HTML source.

Lovable must:

1. preserve the spreadsheet and cue-card visuals closely;
2. remove the stale rear sheet and the explicit Blotter engine;
3. implement the maintained-zone tint across Status through Call;
4. implement direct, non-crossing cue-to-row connectors;
5. implement the stronger maintained-block emphasis for Sarah, Marcus, and Alex;
6. implement the two below-sheet region underlines and exact ownership labels;
7. keep the visual understandable without motion;
8. build reusable components rather than embedding the reference image;
9. make no changes to exact data, cue copy, column order, ownership copy, or product capability;
10. stop after the desktop hero visual and its shared spreadsheet primitives are ready for review unless a broader checkpoint has been explicitly authorized.

Lovable may determine minor pixel values for line curvature, spacing, tint opacity, and endpoint styling only within the constraints and acceptance criteria in this specification.

Lovable must not make an independent product or narrative decision where this specification is explicit.

## 15. Desktop acceptance criteria

The desktop hero is ready for approval only when all of the following are true:

- one current spreadsheet is shown and no stale sheet is visible;
- the spreadsheet is unmistakably Google Sheets-native and closely resembles the approved reference;
- the sheet is the dominant object;
- the three approved cue cards closely resemble the reference and use exact copy;
- no explicit Blotter engine or intermediary processor appears;
- the header band from Status through Call carries the faint shared yellow-family tint;
- no data row carries a zone tint or per-row emphasis (revised August 5, 2026, see section 8);
- Priya and Daniel are not visually de-emphasised relative to the cue-linked rows;
- each cue maps unambiguously to the correct row through one short, clean connector;
- connectors do not cross or obscure spreadsheet content;
- `YOU add the contacts` appears below a restrained underline spanning Name through Firm;
- `BLOTTER keeps them current` appears below a restrained yellow-family underline spanning Status through Call;
- the visual is understandable in a static screenshot within approximately two seconds;
- no extra fields, cues, metadata, capability claims, or explanatory copy have been invented.

## 16. Remaining questions

No substantive desktop hero-design questions remain within this ratified scope.

The following are deliberately deferred and do not reopen the desktop decision:

- tablet and mobile adaptation;
- optional micro-motion;
- exact placement of the completed visual within the surrounding full hero section;
- any stale-sheet treatment for Section 2.

These items require later bounded decisions or implementation review.

## 17. Ratification record

Jon ratified the following on July 31, 2026:

- mechanism-and-current-outcome hero rather than before-and-after storytelling;
- no tracker decay in the hero;
- no stale rear sheet;
- preserve the current spreadsheet visual, cues, Google Sheets density, and overall content structure closely;
- remove the explicit Blotter engine;
- direct cue-to-row mapping;
- faint shared Blotter-yellow tint across the complete maintained right-hand zone;
- stronger full maintained-block emphasis for the three cue-linked example rows;
- out-of-sheet ownership labels below the spreadsheet;
- restrained region underlines as the ownership-label treatment;
- desktop-first design priority.
