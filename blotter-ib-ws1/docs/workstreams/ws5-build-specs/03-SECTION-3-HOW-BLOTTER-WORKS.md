# WS5 Build Specification 03 — Section 3 How Blotter works


> **Amended by Jon, August 5, 2026, during the stage 6 build.** He is authority
> level 1 under `WS5-SPEC.md` "Source hierarchy". Reasoning is recorded in
> `04-decision-log.md`; the implementation carries the same notes inline.
>
> | Item here | Amended to |
> |---|---|
> | Section 2 and 7, `how-blotter-works-exact-v1.avif` as the formal exact target | Discarded. The mechanism is rebuilt. Jon rejected the asset outright. |
> | Section 7's three preserve-lists, and the section 16 requirement to preserve the complete `2048 × 633` composition | Superseded by the rebuilt visual. |
> | Section 19 acceptance criteria 3 through 8, and the matching section 21 ratification lines | Read against the rebuild. |
> | Section 11, "one compact horizontal row on desktop" and "restrained outlined-pill or compact-label treatment" | Overruled. The three statements stack, and the pills are gone. |
> | Section 11, "no icons" | Overruled. Each statement carries a symbol. |
> | Section 12, closing line placed after the badges as its own beat | Overruled. It is incorporated into the same block. |
> | Section 17, "provider references" | Overruled for the ChatGPT mark on `No AI slop`. Raised twice, including the trademark and comparative-claim exposure, and waived both times. |
>
> What replaced the asset: one Friday, three moments, one tracker. Not a flow.
> `Current` is a time word and nothing else on the page has time in it — every
> other section shows a tracker that happens to be right, never one becoming
> right. Columns run in causal order, when, what happened, Blotter, what the
> tracker says, so the ratified section 5 stage labels land in the order sections
> 4 and 8 require without drawing a pipeline.
>
> Daniel Kim opens it rather than Alex Morgan, on the same reasoning as the
> `01-HERO` amendment. `No reply for 5 days` is the exact line already ratified in
> `04-SECTION-4-OUTSTANDING-ACTIONS` section 7.
>
> Unchanged and still binding: the section 1 communication job, all section 5
> copy verbatim, the section 10 removal of the ownership lists, the section 13 ban
> on repeating the hero's cue-to-row demonstration, section 14's ban on brain,
> robot, sparkle, circuit and wand iconography, section 15's static-screenshot
> rule, and the absence of a CTA.

> ---
>
> **Amended again by Jon, August 11, 2026, during the stage 10 mobile build.**
> Reasoning in `04-decision-log.md` session 7 and
> `09-page-argument-rework.md` §4. **Every row below is scoped to the phone.
> Desktop is untouched and must stay so until the stage-10 build is finished** —
> `09` §8 is the ledger of what desktop then owes and why.
>
> | Item here | Amended to, below `--breakpoint-desk` only |
> |---|---|
> | Section 4, the section itself | **It stops existing on a phone.** The hero film demonstrates the mechanism 1,100px earlier using these same three ratified moments, so a second demonstration is redundancy. `components/sections/how-blotter-works.tsx` renders `hidden desk:block`. |
> | Section 5, the headline, verbatim | Relocated. `You manage the relationships. Blotter maintains the moving parts.` becomes the **deck** of the merged section, at reduced weight. Not rewritten; moved. |
> | Section 5, the boundary line and the closing line, verbatim | **Cut.** `Blotter keeps the logistics current` and `Blotter keeps the logistics synchronized` are near-synonyms in one section. Section 341 of this spec shows the duplication was seen at ratification and mitigated with whitespace, which is the one resource a phone has none of. |
> | Section 5 and 8, the three stage labels | **Cut.** Built above the phone sheet and rejected on sight: they caption a mechanism claim while the visual beneath them proves ownership. On desktop they stay inside the timeline they label, which is correct. |
> | Section 11 and 12, badge placement | The three refusals relocate to the merged ownership section. They are the ownership claim stated negatively; privacy is about what Blotter reads, these are about what it refuses to write. |

Date ratified: July 31, 2026  
Status: Ratified  
Decision owner: Jon  
Surface: Landing-page Section 3, `How Blotter works`  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 3 must explain the complete operating sequence at a systems level:

> Relevant recruiting activity occurs in Gmail and Google Calendar, Blotter maintains the changing logistical state, and the resulting relationship state stays current inside the user's Google Sheet.

The section must make the mechanism simple and immediately legible without becoming a technical architecture diagram or replaying the hero's contact-specific cue-to-row demonstration.

A viewer should understand that:

1. recruiting activity originates in Gmail and Google Calendar;
2. Blotter is the maintenance layer between that activity and the tracker;
3. the output remains inside a recognizable Google Sheets recruiting tracker;
4. the user still chooses the people, writes the messages, and exercises judgment;
5. Blotter maintains logistics rather than generating outreach or recruiting content.

No CTA appears in Section 3.

## 2. Controlling sources and implementation inputs

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified page narrative and inherited Section 3 copy: `../WS4-SPEC.md`
- Build-specification system: `README.md`
- Visual-reference inventory: `../ws5-assets/README.md`
- Section 3 asset notes: `../ws5-assets/section-3/README.md`
- Formal exact visual target: `../ws5-assets/section-3/how-blotter-works-exact-v1.avif`

This specification explicitly supersedes one earlier WS4 presentation detail:

- Section 3 must not include the separate `YOU CONTROL` and `BLOTTER MAINTAINS` division-of-labor lists. The hero already communicates the ownership split through `YOU add the contacts` and `BLOTTER keeps them current`. Repeating a second ownership block in Section 3 is unnecessary.

The following WS4 Section 3 content remains binding:

- exact eyebrow;
- exact headline;
- exact supporting copy;
- exact three stage labels;
- exact boundary line;
- exact three product-boundary badges;
- exact closing line;
- no CTA.

## 3. Required viewer understanding

The desktop section should communicate this sequence in approximately three seconds:

1. A relevant reply and recruiting event exist in Gmail and Google Calendar.
2. Those signals flow through Blotter.
3. Blotter maintains the corresponding live logistical state in a Google Sheet.

After reading the surrounding copy, the viewer should additionally understand:

- the student chooses the relationships and writes the communication;
- Blotter keeps the logistics synchronized;
- Blotter does not provide technical-preparation content or generic AI outreach.

The section must feel simple, credible, and operational. It must not imply a functioning production integration during the validation build.

## 4. Exact section order

Use this order:

1. Eyebrow.
2. Headline.
3. Supporting copy.
4. Three external stage labels aligned with the visual.
5. Formal exact mechanism visual.
6. Boundary line.
7. Three product-boundary badges.
8. Closing line.
9. No CTA.

Do not add the removed division-of-labor lists between the visual and the badges.

## 5. Exact copy

### Eyebrow

`How Blotter works`

### Headline

`You manage the relationships. Blotter maintains the moving parts.`

### Supporting copy

`Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.`

### External stage labels

Left:

`RECRUITING HAPPENS HERE`

Center:

`BLOTTER KEEPS IT CURRENT`

Right:

`YOUR TRACKER STAYS CURRENT`

### Boundary line

`You choose the people and write the messages. Blotter keeps the logistics current.`

### Product-boundary badges

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

### Closing line

`You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

Do not rewrite, shorten, combine, or add to this copy.

## 6. Desktop composition and hierarchy

The initial approval target is a desktop browser viewport of approximately `1440px` wide with a centered page-content container.

The composition should read in three clear vertical beats:

1. section copy;
2. stage labels and exact mechanism visual;
3. boundary line, product-boundary badges, and closing line.

The formal visual should be the dominant object. The surrounding text should establish and resolve the meaning without competing with the visual.

Use generous but controlled whitespace. The section should feel complete without becoming excessively tall or splitting into several disconnected card modules.

The exact asset may scale uniformly to the approved content width. Preserve its full aspect ratio and do not crop any substantive content during the desktop checkpoint.

## 7. Formal exact mechanism asset

Controlling asset:

`../ws5-assets/section-3/how-blotter-works-exact-v1.avif`

Asset status:

Formal exact implementation asset.

Desktop reference dimensions:

- `2048px` wide;
- `633px` high.

The AVIF is a lossless, pixel-equivalent rendering of Jon's ratified uploaded PNG. It is the authoritative desktop pixel target.

The asset contains one left-to-right flow:

1. Gmail and Google Calendar source activity.
2. A central Blotter module.
3. A current Google Sheets recruiting-tracker crop.

### Exact left source state

Preserve:

- Gmail logo;
- Gmail cue: `Sarah Chen replied`;
- Gmail timestamp: `Jan 16 · 10:42 AM`;
- Google Calendar logo;
- Calendar cue: `Coffee chat with Priya Shah`;
- Calendar timestamp: `Jan 16 · 2:00 PM`;
- exact cue sizes, typography, spacing, border treatment, shadows, and logo placement;
- one restrained arrow from the source cluster toward Blotter.

### Exact central Blotter state

Preserve:

- warm off-white and yellow-family module;
- exact provisional stacked-record mark;
- exact lowercase `blotter` wordmark;
- exact border, radius, shadow, spacing, proportions, and arrow placement.

The mark and word treatment are authoritative only inside this Section 3 asset. Ratifying this asset does not establish the mark as the canonical global Blotter logo or require its use elsewhere on the website or in the product.

### Exact Google Sheets output state

Preserve:

- complete visible Google Sheets chrome;
- document title `IB Recruiting Tracker`;
- visible menu labels and share treatment;
- selected cell `B2`;
- formula-bar value `Replied`;
- column letters and row numbers;
- columns `Name`, `Status`, `Next move`, `Last contact`, `Days`, and `Call`;
- Sarah Chen row with `Replied`, `Reply to Sarah`, `1/16/26`, and `0`;
- Priya Shah row with `Call completed`, `Send thank-you`, `1/16/26`, `0`, and `Completed 1/16`;
- blank Sarah Chen Call cell;
- exact status-chip treatment;
- exact maintained-zone tint;
- exact dimensions, spacing, grid geometry, colors, shadows, and crop;
- one restrained arrow from Blotter into the spreadsheet.

### Exactness rule

Lovable may translate the asset into production React and CSS components, but the rendered result must remain visually equivalent in a close side-by-side comparison.

Lovable must not independently improve, restyle, simplify, reinterpret, or modernize any element inside the asset.

Do not:

- replace the source cues with full Gmail or Calendar screens;
- change names, dates, labels, row content, or selected state;
- change the Blotter mark;
- change the Blotter wordmark capitalization;
- replace the spreadsheet with a generic table;
- turn the flow into three generic feature cards;
- add technical labels, particles, branches, animation, or extra arrows;
- add stage labels inside or over the asset;
- add explanatory copy inside the asset.

## 8. External stage labels

The three exact stage labels remain outside the formal asset and are Lovable-rendered page copy.

Requirements:

- place the labels immediately above the visual;
- align the left label with the Gmail and Calendar source zone;
- align the center label with the Blotter module;
- align the right label with the Google Sheets output zone;
- use one restrained uppercase-label treatment;
- preserve clear association without drawing large containers around the labels;
- keep labels visually subordinate to the headline and the mechanism visual;
- do not place labels inside the exact asset;
- do not overlay the labels on logos, cues, arrows, or spreadsheet content.

Minor horizontal adjustments are allowed only to achieve accurate alignment with the exact visual stages.

## 9. Boundary line

Place the exact boundary line immediately after the mechanism visual:

`You choose the people and write the messages. Blotter keeps the logistics current.`

Use it as the direct interpretation of the mechanism and the transition into the product-boundary badges.

Presentation requirements:

- centered or aligned to the section's primary reading axis;
- more prominent than routine supporting text;
- less prominent than the headline;
- no card;
- no icon;
- no quotation styling;
- no added sentence or subheading.

## 10. Removed division-of-labor block

Do not implement the former Section 3 block containing:

- `YOU CONTROL`;
- `BLOTTER MAINTAINS`;
- the six associated list items;
- a two-column responsibility comparison;
- responsibility cards or panels.

The hero already establishes the division of labor through its ownership labels and maintained-zone treatment. Section 3 should explain the systems-level operating flow rather than repeating that ownership demonstration.

This removal is a later ratified WS5 supersession of the corresponding WS4 presentation detail.

## 11. Product-boundary badges

Show the three exact badges together after the boundary line:

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

Requirements:

- one compact horizontal row on desktop;
- consistent restrained outlined-pill or compact-label treatment;
- no icons;
- no illustrations;
- no individual cards;
- no oversized emphasis on `No AI slop`;
- keep all three together;
- keep the badges subordinate to the mechanism visual and boundary line.

Do not distribute the badges across the three visual stages or insert them inside the exact asset.

## 12. Closing line

End the section with:

`You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

Requirements:

- place it after the badges;
- maintain enough separation from the boundary line that the two statements do not read as duplicated consecutive copy;
- use a concise, resolved typographic treatment;
- no card;
- no button;
- no additional explanation.

The boundary line explains the operating division. The closing line resolves the section at the level of human judgment and communication versus logistical synchronization.

## 13. Relationship to the hero

The hero and Section 3 use related visual language but perform different communication jobs.

### Hero

- demonstrates direct cue-to-row causality for named contacts;
- shows the complete maintained Status-through-Call zone;
- explains `YOU add the contacts` and `BLOTTER keeps them current`;
- does not show an explicit Blotter intermediary module.

### Section 3

- explains the complete systems-level sequence;
- shows Gmail and Calendar as sources;
- shows Blotter as the central maintenance layer;
- shows a compact current Google Sheets output;
- does not repeat the hero's ownership labels or cue-to-row mapping.

The explicit Blotter module is required in Section 3 even though an intermediary engine is excluded from the hero. The two rulings are surface-specific and do not conflict.

Do not add to Section 3:

- direct cue-to-row connectors;
- the hero's full five-row tracker;
- the hero's ownership underlines;
- a second ownership comparison;
- a stale sheet;
- before-and-after framing;
- tracker-decay storytelling.

## 14. Visual tone

The section should feel:

- simple;
- professional;
- calm;
- precise;
- operational;
- credible;
- consistent with Google Workspace and the established Blotter page system.

Avoid:

- technical flowchart styling;
- generic SaaS feature-card grammar;
- glassmorphism;
- neon gradients;
- futuristic AI imagery;
- brain, robot, sparkle, circuit, or magic-wand iconography;
- excessive shadows or decorative motion;
- full Gmail or Calendar application mockups outside the exact asset;
- unrelated product screenshots.

## 15. Static-state and motion rule

The full Section 3 argument must work in a static screenshot.

Do not require animation to explain:

- where activity originates;
- what Blotter does;
- where the current tracker state appears;
- the direction of the flow;
- the boundary between user communication and Blotter logistics.

Optional global entrance motion may be considered later, but it must not alter the exact asset, become necessary for comprehension, or be introduced during the initial desktop checkpoint without approval.

## 16. Responsive posture

Desktop is the current approval target.

For desktop:

- preserve the complete `2048 × 633` composition and aspect ratio;
- scale uniformly only as required by the approved content container;
- do not crop the source cues, Blotter module, arrows, or spreadsheet;
- preserve readable activity cues and spreadsheet content;
- keep all three stage labels aligned outside the asset.

Tablet and mobile adaptation remain bounded later implementation questions and do not reopen:

- the exact desktop visual;
- the exact copy;
- the three-stage order;
- the removal of the division-of-labor lists;
- the badge set;
- the absence of a CTA.

A later responsive checkpoint may consider proportional scaling, a controlled crop, or a separately composed vertical translation. No responsive adaptation is approved by this desktop specification.

## 17. Explicit exclusions and rejected treatments

Do not implement:

- `YOU CONTROL` and `BLOTTER MAINTAINS` lists;
- a responsibility comparison block;
- a CTA;
- a price;
- beta or Fall 2026 language;
- OAuth or account-connection UI;
- privacy or permissions content;
- provider references;
- technical architecture;
- API, parsing, model, database, or automation-engine terminology;
- extra product capabilities;
- full Gmail or Calendar screens;
- more source cues;
- a generic spreadsheet icon instead of the exact sheet;
- another full hero spreadsheet;
- cue-to-row connectors;
- Outstanding Actions;
- stale-state or before-and-after storytelling;
- animation required for comprehension;
- an assumption that the asset's Blotter mark is the global brand logo.

## 18. Lovable implementation instructions

When the Section 3 checkpoint is authorized, provide Lovable with:

1. this build specification;
2. the formal exact AVIF asset;
3. `../ws5-assets/section-3/README.md`;
4. the relevant WS4 Section 3 source for inherited copy;
5. the approved global page shell and typography system.

Lovable must:

1. use every exact line of Section 3 copy in the required order;
2. align the three external stage labels with the exact asset's three stages;
3. reproduce the exact visual without independent redesign;
4. keep all stage labels and surrounding copy outside the asset;
5. use the exact boundary line after the visual;
6. omit the former division-of-labor lists entirely;
7. keep the three exact product-boundary badges together;
8. use the exact closing line;
9. include no CTA;
10. make the section understandable without animation;
11. stop after the desktop Section 3 checkpoint is ready for review unless a broader checkpoint is explicitly authorized.

Lovable may determine only bounded page-context details such as:

- exact section padding;
- exact distance between copy, labels, asset, badges, and closing line;
- minor horizontal stage-label alignment;
- restrained badge styling within the approved system;
- exact desktop scaling of the asset within the approved container.

Lovable may not alter the exact asset, reintroduce the removed responsibility lists, or reinterpret the section's communication job.

## 19. Desktop acceptance criteria

Section 3 is ready for approval only when all of the following are true:

- eyebrow, headline, and supporting copy use exact wording;
- the three stage labels use exact wording and align with the correct visual stages;
- the exact mechanism visual is shown in full and matches the formal asset in a close side-by-side comparison;
- Gmail and Calendar source cues retain exact logos, names, dates, and composition;
- the central Blotter module retains its exact mark, wordmark, proportions, and treatment;
- the spreadsheet retains exact chrome, selected state, columns, rows, chips, data, and maintained-zone tint;
- arrows and whitespace match the exact asset;
- no text or label is inserted inside or over the asset;
- the boundary line uses exact wording and appears after the visual;
- no `YOU CONTROL` or `BLOTTER MAINTAINS` block appears;
- all three product-boundary badges use exact wording and remain together;
- the closing line uses exact wording;
- no CTA appears;
- the section explains Gmail and Calendar to Blotter to Google Sheets in a static desktop screenshot;
- the asset's provisional Blotter mark is not reused elsewhere merely because it appears here;
- no unratified capability, privacy, technical, price, or availability claim is added.

## 20. Remaining questions

No substantive desktop Section 3 design or copy questions remain within this ratified scope.

The following are deferred and do not reopen Section 3:

- tablet and mobile adaptation;
- optional global entrance motion;
- final pixel spacing after Section 2 and before Section 4;
- whether the provisional mark inside the asset later becomes part of a separate canonical Blotter identity system;
- whether Lovable reproduces the asset through React and CSS or another method that produces the same approved desktop result.

No additional Section 3 external visual reference is required. The formal exact AVIF is the sole visual authority for this section.

## 21. Ratification record

Jon ratified the following on July 31, 2026:

- exact Section 3 order of eyebrow, headline, supporting copy, external stage labels, exact visual, boundary line, badges, closing line, and no CTA;
- exact external placement of the three stage labels;
- the uploaded mechanism visual as a formal exact desktop implementation target rather than a directional reference;
- exact preservation of logos, cues, arrows, Blotter module, spreadsheet crop, colors, whitespace, and proportions;
- the provisional Blotter mark as authoritative inside this asset only, not as the global canonical logo;
- removal of the `YOU CONTROL` and `BLOTTER MAINTAINS` lists because the hero already communicates the division of labor;
- exact boundary-line placement after the visual;
- one compact row of the three exact product-boundary badges;
- exact closing-line placement after the badges;
- desktop-first approval with responsive adaptation deferred;
- a dedicated self-contained Section 3 build specification;
- the formal exact asset as the sole Section 3 external visual reference;
- no additional visual-reference work for Section 3.
