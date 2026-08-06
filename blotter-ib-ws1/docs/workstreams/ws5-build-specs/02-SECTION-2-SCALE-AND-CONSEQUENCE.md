# WS5 Build Specification 02 — Section 2 scale and consequence

> **Amended by Jon, August 5, 2026, during the stage 5 build.** He is authority
> level 1 under `WS5-SPEC.md` "Source hierarchy". Reasoning for each is recorded
> in `04-decision-log.md`; the implementation carries the same notes inline.
>
> | Item here | Amended to |
> |---|---|
> | Section 5, closing copy `Once you stop trusting the tracker...` | Cut. The section ends on the consequence visual. |
> | Section 5 and 9, exact three-sentence supporting paragraph | First sentence cut. The trajectory diagram already makes that point. |
> | Section 5, figure order `628 / 68 / 19 / 30` | Descending by volume, `628 / 68 / 30 / 19`. |
> | Section 7, card rule and ban on chart furniture | Set aside for the trajectory treatment. |
> | Section 10 and 15, full Gmail message view at `1180 × 560` | Collapsed to a single inbox row with muted neighbours. |
> | Section 18 acceptance criteria | Read against the amendments above. |
>
> Unchanged and still binding: the four figures and their labels, the
> qualification, the 60-hour proof and methodology, both annotation lines, the
> sender, subject, and date of the email, the absence of a CTA, the section 12
> ban on repeating any hero device, and the section 10 claim-safety note.

> **Amended again by Jon, August 6, 2026, during the stage 7 build.**
>
> | Item here | Amended to |
> |---|---|
> | Section 6 methodology footnote, `Summer Analyst 2028 recruiting cycle` | `Summer Analyst 2027 recruiting cycle`. |
>
> The cycle year alone. Every other word of the footnote, the 60-hour estimate
> it qualifies, and the JPMorgan qualification are untouched.
>
> The `Summer Analyst 2028` inside the Goldman Sachs email asset at section 15
> is **not** amended: it is body copy inside a reproduced exact asset, and that
> component is parked and unrendered. `Summer 2028` also remains a funnel
> recruiting-window option in `WS3-SPEC.md`, which this ruling did not touch.

Date ratified: July 31, 2026  
Date amended: August 5, 2026  
Status: Ratified, amended in part  
Decision owner: Jon  
Surface: Landing-page Section 2 — scale of recruiting volume and consequence of tracker failure  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 2 must establish that a high-intensity investment-banking recruiting cycle generates more continuously changing activity than a student can reliably maintain by hand in a spreadsheet.

The section is not primarily a convenience or productivity argument. Its central claim is:

> At this volume, intermittent manual tracker upkeep inevitably falls behind the live recruiting process. Once the tracker no longer reflects reality, deadlines, follow-ups, and next steps begin slipping through the cracks.

The four recruiting-volume figures establish scale. The supporting paragraph explains why the manual system diverges from reality. The exact Goldman Sachs rejection-email visual shows one concrete, severe consequence of that divergence.

Section 2 does not explain how Blotter works and does not show the product solution. The hero already establishes the product mechanism and current spreadsheet state. Section 2 proves why the problem is consequential.

## 2. Controlling sources and implementation inputs

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified page narrative and inherited Section 2 copy: `../WS4-SPEC.md`
- Build-specification system: `README.md`
- Visual-reference inventory: `../ws5-assets/README.md`
- Section 2 asset notes: `../ws5-assets/section-2/README.md`
- Exact formal email asset: `../ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.html`

This specification supersedes the following earlier WS4 Section 2 details:

- `55 coffee chats` is superseded by `68 coffee chats`.
- The earlier compact comparison titled `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER` is superseded.
- Section 2 must not use another spreadsheet comparison visual.
- The exact Goldman Sachs rejection-email asset is now the consequence visual.

The rest of the ratified WS4 Section 2 messaging remains in force except where this specification gives later exact wording or presentation rules.

## 3. Required viewer understanding

A viewer should understand the following sequence without careful reading:

1. A serious recruiting cycle creates hundreds of live interactions and obligations.
2. The recruiting process changes continuously.
3. A manual spreadsheet changes only when the student remembers to update it.
4. At this scale, the tracker inevitably becomes incomplete or stale.
5. A missed tracker action can cost an actual interview opportunity.

The section should feel serious and consequential, not melodramatic. It should not imply that every student will receive the exact email shown. It uses one illustrative scenario to make the operational risk concrete.

## 4. Exact section order

Use this order:

1. Eyebrow.
2. Headline.
3. Four large recruiting-volume figures.
4. Small case-study qualification.
5. Smaller secondary time-savings proof and methodology.
6. Brief supporting paragraph.
7. Exact Goldman Sachs rejection-email visual with two external annotations.
8. Closing copy.
9. No CTA.

Do not reorder the email visual above the figures. Do not place the supporting paragraph before the figures. The section should lead with easily digested scale, then explain the failure mechanism, then show the consequence.

## 5. Exact copy

### Eyebrow

`The scale of a recruiting cycle`

### Headline

`Your manual tracker was never built to keep up with this.`

### Four figure labels and values

- `628` — `Recruiting emails`
- `68` — `Coffee chats`
- `19` — `Applications`
- `30` — `Interview rounds`

Do not add explanatory microcopy beneath the four labels. Specifically, do not add statements such as:

- `Threads to open, read, and answer`
- `Each one owing a follow-up`
- `Nineteen banks, nineteen deadlines`
- `Scheduled, prepped, followed up`

The volume figures must carry the scale argument directly.

### Case-study qualification

`* Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`

Interpretation: these are figures from one real representative case-study recruiting cycle, not a market average and not a hypothetical projection.

### Secondary time-savings proof

`~60 hours saved on manual tracker administration over one recruiting cycle`

### Methodology

`Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.`

### Supporting paragraph

`Recruiting activity changes continuously across hundreds of emails, coffee chats, applications, and interview rounds. A manual tracker changes only when you remember to update it, so at this volume it inevitably falls behind reality. Deadlines, follow-ups, and next steps begin slipping through the cracks.`

### Email annotations

`One thread buried in 628 emails`

`A stale tracker does not direct you back before the deadline passes`

### Closing copy

`Once you stop trusting the tracker, you are back to reconstructing your process from Gmail, Calendar, memory, and scattered notes. That is when follow-ups, thank-you notes, and next steps begin falling through the cracks.`

Do not add a CTA.

## 6. Desktop composition

The section should read as one coherent editorial narrative rather than a stack of dashboard modules.

Recommended desktop hierarchy:

- section eyebrow and headline establish the argument;
- the four-number composition occupies the next primary visual beat;
- qualification and time-savings proof sit directly beneath or immediately adjacent to that composition;
- the supporting paragraph bridges the scale proof into the consequence;
- the email visual becomes the dominant lower-half object;
- the closing copy resolves the section and transitions into Section 3.

Use generous negative space. Preserve a clear distinction between the typographic scale composition and the exact Gmail visual.

Avoid a long vertical sequence of repetitive cards. The section should feel compact enough that the scale argument and email consequence are understood within a normal desktop section rather than across multiple screens of scrolling.

## 7. Four-number composition

The four figures are typography-led volume proof. They are not dashboard metrics and are not separate feature cards.

### Required qualities

- numbers are large and immediately legible;
- labels are concise and subordinate;
- all four figures can be understood in approximately two seconds;
- composition feels professional, editorial, modern, and data-led;
- generous negative space is permitted and encouraged;
- reading order remains obvious;
- no icons;
- no animation;
- no bright multicolor treatment;
- no chart axes, gauges, progress rings, sparklines, or dashboard controls;
- no feature-benefit explanations attached to individual numbers.

### Bounded Lovable discretion

Lovable may propose a more interesting composition than four identical boxes. Acceptable techniques include:

- lightly staggered vertical placement;
- asymmetric spacing;
- modest variation in number scale;
- thin rules or restrained dividers;
- controlled overlap with section whitespace;
- an editorial two-by-two arrangement;
- a nonuniform but balanced horizontal sequence.

Lovable must not use creative freedom to reduce scanability, reorder the figures ambiguously, or turn the section into an experimental art composition.

### Card rule

The default expectation is no cards.

A very restrained grouping device may be proposed only if it does not read as four dashboard tiles. Do not use:

- four equal rounded rectangles;
- filled metric cards;
- heavy shadows;
- icon-and-number tiles;
- multicolored panels;
- glassmorphism;
- bordered SaaS KPI boxes.

## 8. Qualification and secondary time-savings treatment

The case-study qualification and time-savings claim are supporting proof, not equal members of the four-volume figure set.

### Case-study qualification

- display in small text;
- retain the leading asterisk;
- place directly beneath the four-number composition;
- keep clearly associated with the figures;
- do not enlarge `JPMorgan offer` into an authority badge;
- do not add a JPMorgan logo.

### Time-savings proof

Display:

`~60 hours saved on manual tracker administration over one recruiting cycle`

Requirements:

- smaller and less prominent than the four primary figures;
- more visually intentional than an ordinary footnote;
- emphasize `~60 hours saved` typographically while keeping the remainder compact;
- use the same general proof-note family as the case-study qualification;
- a thin rule, subtle text grouping, or restrained alignment treatment is allowed;
- no icon;
- no card;
- no badge;
- no loud highlight color;
- no placement that makes it look like a fifth primary metric.

Place the methodology immediately beneath or adjacent in smaller text.

## 9. Supporting paragraph treatment

Use the exact three-sentence paragraph.

Presentation requirements:

- keep it brief and readable;
- use a comfortable text measure;
- do not break each sentence into a separate card or callout;
- do not bold every operational term;
- modest emphasis on `inevitably falls behind reality` may be proposed, but is not required;
- preserve the argument that tracker failure is a consequence of continuous activity versus intermittent upkeep.

Do not rewrite the paragraph into a generic time-saving or productivity claim.

## 10. Exact formal Goldman Sachs email asset

The email visual is a formal, exact implementation reference. It is not directional.

Controlling asset:

`../ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.html`

Desktop reference dimensions:

- `1180px` wide;
- `560px` high.

Lovable must reproduce the visual exactly in substantive composition, content, hierarchy, Gmail chrome, spacing, and visible state. Do not redesign it into a generic email card.

### Exact visible state

The visual shows a Gmail message view with:

- full top Gmail navigation bar;
- left Gmail folder rail;
- central opened-message surface;
- right Google application rail;
- white and very light blue-gray Gmail palette;
- compact desktop density;
- Gmail-style toolbar icons and controls;
- visible inbox count and draft count;
- open email centered as the main content.

### Exact email details

Subject:

`RE: First Round Interview Invitation · Deadline Passed`

Sender display:

`Goldman Sachs Campus Recruiting`

Sender address:

`campusrecruiting@goldmansachs.com`

Recipient display:

`to david.solomon@gmail.com`

Timestamp:

`Wed, Jan 20, 8:07 AM (5 hours ago)`

Body:

`Hi David,`

`We are writing to let you know that we are moving forward with other candidates for our Investment Banking Summer Analyst 2028 program. We previously invited you to schedule a first-round interview and asked that you select a time by Wednesday at 5:00 PM ET and did not receive your selection within the scheduling window.`

`Best of luck with rest of your recruiting process.`

Signature:

`Emily Carter`

`Campus Recruiting`

`Goldman Sachs`

Visible footer actions:

- `Reply`
- `Reply all`
- `Forward`

Copy the text exactly as written in the asset, including its existing grammar and punctuation. Do not silently edit, polish, shorten, or correct the message.

### Exactness rule

Lovable must use the formal asset as the pixel and content target for the desktop email component.

Lovable may translate the HTML into the project’s React and CSS component system, but the rendered result must match the source closely enough that side-by-side review does not reveal a redesign.

Do not:

- replace the full Gmail view with one floating email card;
- remove the left folder rail;
- remove the top navigation;
- remove the right application rail;
- change the sender to Evercore or another firm;
- change the recipient;
- change the recruiter name;
- rewrite the subject or body;
- add a red rejection stamp;
- add warning icons;
- add dramatic error effects;
- add extra messages;
- show a three-email sequence;
- animate the inbox;
- introduce Blotter UI inside the email visual.

### Claim-safety note

This is an illustrative designed scenario, not documentary evidence of a genuine Goldman Sachs email. Internal records and implementation discussions must not describe it as an authentic email received by the case-study subject. The public section should use it to illustrate the consequence of a missed scheduling action without making an explicit authenticity claim.

## 11. Email annotations

Use both exact annotations outside the formal email asset:

- `One thread buried in 628 emails`
- `A stale tracker does not direct you back before the deadline passes`

Requirements:

- annotations remain outside the Gmail interface;
- do not cover or alter the exact email asset;
- remain short and immediately legible;
- use restrained typographic callouts rather than large cards;
- no icons;
- no arrows that imply Blotter is already acting;
- no excessive explanatory body copy.

### Bounded placement discretion

Lovable may determine the exact placement in page context. Preferred logic:

- first annotation near the upper or leading side of the email visual;
- second annotation near the lower or trailing side;
- both remain clearly associated with the email;
- placement should frame the visual without significantly increasing section height.

Thin leader lines or restrained anchoring rules are allowed only if they improve association and do not clutter the visual.

## 12. Relationship to the hero and later sections

The hero and Section 2 perform different jobs.

### Hero

- shows the Blotter-maintained current spreadsheet;
- explains activity-to-row causality;
- shows the product mechanism and outcome.

### Section 2

- establishes overwhelming recruiting volume;
- explains why manual upkeep falls behind;
- shows one severe consequence;
- does not show Blotter solving the problem.

Do not repeat:

- the hero spreadsheet;
- the hero’s yellow maintained-zone tint;
- cue-to-row connectors;
- ownership underlines;
- activity cards feeding a sheet;
- a stale-versus-current spreadsheet comparison.

Section 3 is the next place where the page may return to an explicit mechanism explanation.

## 13. Visual tone

The section should feel:

- professional;
- high-stakes;
- credible;
- data-led;
- restrained;
- editorial rather than dashboard-like;
- visually engaging without being playful.

Use the page’s overall design system. Do not introduce a separate theme around the rejection email.

Avoid:

- crazy colors;
- moving parts;
- cartoonish urgency;
- sensational red treatment;
- warning triangles;
- alarm imagery;
- visual clutter;
- exaggerated “messy spreadsheet” imagery;
- shame-based copy;
- generic productivity-app iconography.

## 14. Static-state and motion rule

The complete Section 2 argument must work in a static screenshot.

Do not require animation to:

- reveal the four figures;
- explain the annotations;
- open the email;
- show the deadline consequence;
- reveal the time-savings claim.

Simple entrance motion may be considered later as part of the global page motion system, but it must not change the approved composition or be necessary for comprehension.

## 15. Responsive posture

Desktop is the initial approval target.

For desktop:

- preserve the exact `1180 × 560` email composition, scaling uniformly only as required by the page container;
- do not crop meaningful email content;
- maintain readable body copy;
- keep the two annotations outside the email asset.

Tablet and mobile adaptation remain bounded implementation questions for a later responsive checkpoint. They do not reopen:

- the figures;
- the exact copy;
- the exact email content;
- the use of one email only;
- the absence of another spreadsheet visual;
- the consequence-first communication job.

On smaller screens, Lovable may later propose proportional scaling, a controlled crop, or a separately composed responsive translation, but no responsive decision may be made during the initial desktop checkpoint without approval.

## 16. Explicit exclusions and rejected treatments

Do not implement:

- `55 coffee chats`;
- a compact `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER` table;
- another spreadsheet visual;
- a stale spreadsheet crop;
- a messy or broken spreadsheet asset;
- a three-message email sequence;
- multiple recruiting emails;
- an Evercore sender;
- a generic unbranded recruiter email;
- four metric cards;
- icons for the volume figures;
- individual explanatory sentences beneath every number;
- `NOT TO NETWORKING. NOT TO PREP.`;
- a fifth equal metric for the 60-hour claim;
- a Blotter mechanism diagram;
- a CTA;
- product pricing;
- OAuth or permission content;
- animation required for comprehension.

## 17. Lovable implementation instructions

When the Section 2 checkpoint is authorized, provide Lovable with:

1. this build specification;
2. the exact formal email HTML asset;
3. the relevant WS4 Section 2 source for inherited section context;
4. the global design-system and page-shell plan approved at the foundation checkpoint.

Lovable must:

1. use the exact copy and figures in this specification;
2. replace `55` with `68` coffee chats wherever Section 2 is represented;
3. create a professional, visually interesting typography-led figure composition within the stated guardrails;
4. keep the case-study qualification small and directly associated with the figures;
5. display the 60-hour proof as a subordinate but intentional typographic proof line;
6. use the exact three-sentence supporting paragraph;
7. reproduce the formal Goldman Sachs Gmail asset exactly rather than redesigning it;
8. place the two exact annotations outside the email asset;
9. use the exact closing copy;
10. include no CTA;
11. avoid another spreadsheet visual;
12. make the section understandable without motion;
13. stop after the desktop Section 2 implementation is ready for review unless a broader checkpoint is explicitly authorized.

Lovable may propose bounded creative decisions only for:

- exact stagger, spacing, and scale relationships among the four figures;
- subtle dividers or editorial rules;
- exact typographic styling of the subordinate 60-hour proof;
- exact placement of the two annotations around the email;
- section-level spacing within the approved page rhythm.

Lovable may not reinterpret the section’s argument, rewrite copy, alter the exact email, or replace the consequence visual.

## 18. Desktop acceptance criteria

Section 2 is ready for approval only when all of the following are true:

- eyebrow and headline use exact copy;
- the figures are `628`, `68`, `19`, and `30`;
- all labels are exact;
- figures are immediately scannable and do not look like dashboard tiles;
- no icons appear;
- no individual explanatory microcopy appears beneath the four figures;
- the representative-case qualification is visible, small, and correctly associated;
- the 60-hour claim is subordinate to the four figures but more intentional than a plain footnote;
- the methodology is directly adjacent;
- the supporting paragraph uses exact wording;
- the email visual matches the exact formal asset in content and composition;
- Goldman Sachs remains the sender;
- one email only is shown;
- both annotation lines use exact wording and remain outside the email;
- no spreadsheet visual appears;
- the closing copy uses exact wording;
- no CTA appears;
- the section communicates volume, inevitable tracker divergence, and consequence in a static desktop screenshot;
- no unratified claims, benefits, or product behaviors are added.

## 19. Remaining questions

No substantive desktop Section 2 design or copy questions remain within this ratified scope.

The following are deferred and do not reopen Section 2:

- tablet and mobile adaptation;
- optional global entrance motion;
- final pixel spacing after Section 1 and before Section 3;
- any legal or claim-review changes required before public deployment;
- whether the exact email is implemented by translating the HTML into React/CSS or by another method that produces the same approved desktop result.

## 20. Ratification record

Jon ratified the following on July 31, 2026:

- Section 2 order: eyebrow, headline, four figures, qualification, time proof, supporting paragraph, consequence visual, closing, no CTA;
- exact figures of 628 recruiting emails, 68 coffee chats, 19 applications, and 30 interview rounds;
- typography-led, visually interesting, professional, data-led figure treatment;
- no icons and likely no cards;
- bounded Lovable creative freedom for figure composition;
- exact case-study qualification;
- exact subordinate `~60 hours saved` proof and methodology;
- exact three-sentence supporting paragraph;
- one consequence email rather than a sequence;
- Goldman Sachs sender and the email exactly as supplied;
- exact two annotation lines;
- formal, non-directional asset status for the email visual;
- no additional spreadsheet visual;
- Section 2 is complete and ready to enter the frozen implementation packet after repository reconciliation.
