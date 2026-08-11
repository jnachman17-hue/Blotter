# The page argument rework

Date opened: August 10, 2026, session 6
Last updated: August 11, 2026, session 7
Status: **Diagnosed and agreed for mobile. The sheet treatment that blocked it
is settled (§5). Building. Not applied to web.**

This is not a responsive-layout document. Everything else in stage 10 changes
*how* a claim is presented; this changes *which claims the page makes and in
what order*. It exists because the mobile build surfaced a real fault in the
page's argument, and Jon ruled on August 10, 2026 that it be fixed on both
surfaces rather than worked around on one.

---

## 1. What Jon noticed

Reading the live desktop page, he said three consecutive headlines were saying
the same thing, and that on the first two the visual was not doing what the
words claimed.

He was right, and it is one worse than he counted.

### The same claim, four times

| Where | The line |
|---|---|
| Section 3 headline | *You manage the relationships. **Blotter maintains the moving parts.*** |
| Section 3 boundary line | *You choose the people and write the messages. **Blotter keeps the logistics current.*** |
| Section 3 closing line | *You stay responsible for the judgment and communication. **Blotter keeps the logistics synchronized.*** |
| Section 4+5 beat 1 | *Keep the Google Sheet and contacts you already built. **Blotter creates a standardized recruiting view … and keeps the changing activity current.*** |

One sentence shape — *You [do the human thing]. Blotter [keeps the mechanical
thing current]* — stated four times, three of them inside a single section. The
middle two are near-synonyms: "keeps the logistics current" against "keeps the
logistics synchronized".

### The specification already knew

`03-SECTION-3-HOW-BLOTTER-WORKS.md` line 341, on the closing line:

> maintain enough separation from the boundary line that the two statements do
> not read as duplicated consecutive copy

**The duplication was seen at ratification and the mitigation was whitespace.**
On a phone whitespace is the scarcest resource, so the fix stops working exactly
where the problem is worst. That is why this reads as a mobile problem and is
actually a copy problem.

### The words and the pictures are crossed over

| | What the words claim | What the visual proves |
|---|---|---|
| Section 3 | the **ownership split** | the **mechanism** — one Friday, three moments, rows updating |
| Section 4+5 beat 1 | **preservation** — it is your sheet | the **ownership split** — the zone divider, manual columns against maintained |

Each section's strongest visual evidence sits under the wrong headline. That is
why three headlines feel like one idea: the distinct thing each section actually
demonstrates is never the thing its headline claims.

---

## 2. What Film C changed

Film C, built this session and now the mobile hero, shows three beats: a Gmail
reply lands and a row rewrites, a Calendar event completes and a row rewrites,
nothing arrives for five days and a row moves anyway.

**Those are Section 3's three ratified moments.** The film's script was taken
directly from `SECTION_3_MOMENTS` in `web/lib/sheet-data.ts` — same three
contacts, same triggers, same order, same end states.

So on mobile the Friday timeline is now the hero film again, statically, about
1,100px later. Not a family resemblance: the same three events with the same
names in the same sequence.

This is what makes a real re-cut available rather than a tidy-up, and it is why
the mechanism no longer needs a second section to itself.

---

## 3. The claim inventory

| | Claim | The visual that proves it | Status |
|---|---|---|---|
| A | Volume overwhelms a manual tracker | four mark blocks, the buried email | **clean**, mobile 01, ratified this session |
| B | **Mechanism** — activity happens, the row updates itself | the hero film, and the Friday timeline | proved twice, claimed in no headline |
| C | **Ownership** — you own the contacts and the writing, Blotter owns the changing fields | the sheet's zone divider | claimed 3x in one section, proved in another |
| D | **Preservation** — it is the sheet you already have | the tab strip, `Contacts` untouched | claimed where C is proved |
| E | **The payoff** — one list of everything you owe | the Outstanding tab, 21 rows | **clean** |
| F | What Blotter refuses to be | the three badges | homeless once Section 3 is re-cut |
| G | Data boundary | four steps, three services | **clean**, mobile 04 |

A, E and G are fine. B, C and D are the tangle.

---

## 4. The agreed mobile architecture

Jon's calls, August 10, 2026.

### C and D collapse into one section

One sheet proves both: the divider says *what is yours and what is Blotter's*,
and `Contacts` sitting untouched beside `Blotter` says *this is the sheet you
already had*. Ownership and preservation are two readings of one picture, so
they are one section.

### It costs no new headline copy

Section 3's headline is a compression of its own supporting paragraph — it
previews a claim rather than adding one. So the merged section takes
**`Keep the tracker you already built.`**, which is already ratified, already
the right opener because it kills the switching-cost objection first, and the
ownership claim is carried by the supporting paragraph, the divider and the
refusals.

**A headline is deleted rather than invented.** That is a safer override than
new copy and it is the reason this rework does not need a copywriting pass.

### The mechanism stays a claim, not a second demonstration

The hero film demonstrates it. The Friday timeline's three stage labels are
already ratified and are the mechanism in its most compressed form:

> `RECRUITING HAPPENS HERE` → `BLOTTER KEEPS IT CURRENT` → `YOUR TRACKER STAYS CURRENT`

Three labels, roughly 80px, placed directly above the sheet. A *stated claim*
under a *proved one* is a caption; a second demonstration of an already
demonstrated thing is the redundancy being removed.

Shrinking the timeline instead was rejected: legible or small, pick one — the
same trap `components/layout/fit.tsx` documents.

### The refusals move to the ownership section

> *No technical-prep content. No generic mass AI outreach. No AI slop.*

**These are the ownership claim stated negatively.** "You write the messages"
and "no generic mass AI outreach" are one sentence facing opposite directions.
They belong with ownership, not with privacy — privacy is about what Blotter
*reads*, these are about what Blotter *refuses to write*. Section 04 stays about
data.

### The resulting shape

| | Claim | Visual | Headline |
|---|---|---|---|
| 01 | Volume | four mark blocks, buried email | ratified, unchanged |
| **02** | **Your sheet, and the line between you and Blotter** | the sheet with the divider and the `Contacts` tab | `Keep the tracker you already built.` |
| 03 | Everything you owe, in one list | the Outstanding tab | `Know exactly what needs your attention.` |
| 04 | What Blotter reads and will not do | four steps, three services | ratified, unchanged |
| 05 | Questions | FAQ | ratified, unchanged |

Four headlines, four visuals, each proving its own claim. Roughly 1,100px
shorter than the current mobile page.

---

## 5. The sheet on a phone — SETTLED, August 11, 2026

**Jon ruled for the deliberate crop.** This section was the one thing blocking
mobile 02 and it is no longer open. Full reasoning is in `04-decision-log.md`
under session 7; the short form is below, because the constraint it turns on is
not obvious and a later session will otherwise rediscover it the hard way.

The sheet is ten columns at 1,221px natural in 13px Arial. Phone content width
is 350px at a 390 viewport, 320px at 360, 280px at 320. Scale-to-fit is **0.287**
and puts the type at 3.7px — the scaffolding state it was in. Holding 11px type
affords about 412px of natural width, which is the gutter plus **three** of the
current columns.

Constraints that survive from the specs:

- `05-SECTION-5` §12: all ten field names, the LinkedIn-to-Status divider, and
  the distinction between existing fields and the Blotter-maintained layer. A
  deliberate horizontal crop or a controlled internal scroll region is
  explicitly permitted, and scaling the full spreadsheet until the text becomes
  unreadable is explicitly forbidden.
- `04-SECTION-4` §12: recognisable Google Sheets context; no page-level
  horizontal scrolling where a crop or translation preserves meaning better.

### The constraint that decided it

`05-SECTION-5`'s amendment table lists as still binding *"the section 6 column
order and the divider between LinkedIn and Status."* **Column order is fixed**,
so `Status` cannot be moved beside `Name`. The divider sits at 683px, 56% across
the sheet, and the only columns between `Name` and the divider are `Title`,
`Firm`, `Email` and `LinkedIn`.

**The columns that prove preservation are exactly the columns that have to go
for the ownership divider to be visible at rest.** Every approach below is a
different way of paying that bill.

### Why the crop costs the section nothing

§4 of this document already assigns the preservation proof to the **tab strip** —
`Contacts` sitting untouched beside `Blotter` — reinforced by the supporting
paragraph and the three reassurance claims. If preservation is the tab strip's
job, the grid only has to prove **ownership**, and cropping to the divider takes
away nothing the section was relying on.

The crop also repeats two precedents that already worked here: Film A dropped
the hero's eight columns to five *because at phone size eight put the sheet type
under 6px* (`social/README.md`), and mobile 01 translated the Gmail strip into a
phone inbox rather than shrinking it.

### Rejected, and why they are worth keeping on the record

1. **Frozen name column, maintained fields swipe.** All ten columns at 1:1 and
   genuinely what you do in Sheets on a phone. **The trap Jon named:** the
   divider must be visible at rest, and here it is off screen unless the region
   starts scrolled — which then hides `Name`. It is also an interaction on a
   page whose rule is that the argument survives a still frame. Built as variant
   3 of the review route so the crop's cost is visible rather than asserted.
2. **A separately composed vertical translation** — one contact as a card
   showing yours-versus-maintained. Fully legible, all ten names natural, but it
   stops looking like Google Sheets, which breaks `04-SECTION-4` §12 and
   undercuts *No switching out of Google Sheets*, a ratified reassurance claim
   sitting about 100px above it.

### What is still to ratify

The approach is settled; the exact crop is not. Three variants go in front of
Jon at real device width under `/review/sheet-mobile`, and the one he picks
becomes the amendment to `05-SECTION-5` §12.

### Two consequences of the crop

- **The ten field names move beneath the sheet.** §12 requires all ten survive.
  On desktop the zone labels sit above the sheet sized to the two zones' widths;
  on a phone those widths are 84px and 250px, and §4 gives the space directly
  above the sheet to the three stage labels. So the two zone labels become
  compact lines *under* the sheet, each naming its five fields in ratified
  column order, in desktop's exact wording.
- **The maintained fill and the 3px divider border carry the whole ownership
  claim at rest**, which is what makes the crop legible as an argument rather
  than as a truncation.

---

## 6. What web has to do, and why it cannot just copy mobile

Jon ruled that the same fault be fixed on desktop, in a desktop-appropriate way,
using the mobile decisions as the foundation.

**What transfers unchanged — these are copy and argument, not layout:**

- the duplicate claim is real on desktop too and must be cut there;
- Section 3's headline, boundary line and closing line are three statements of
  one idea and desktop has the same problem;
- the refusals belong with ownership on both surfaces;
- every headline should claim what its own visual proves.

**What does not transfer:**

- **Cutting the Friday timeline.** On mobile it is cut because the hero film
  already demonstrated the mechanism and there is no room. Desktop has room, and
  desktop has no hero film — the hero there is the ratified sheet-and-cues
  composition. So on desktop the mechanism may still need its own section, and
  the timeline may well survive. **Do not delete it from desktop on the mobile
  reasoning.**
- **The compressed stage-label line.** It exists because a 900px diagram does
  not fit a phone. Desktop does not need the compression.
- **Merging 02 and 03 into one section.** Possibly right on desktop, possibly
  not; the constraint that forced it does not exist there.

**The principle to hold:** layout may diverge between devices. **The argument
must not.** If mobile and desktop make different claims, that is a content fork
rather than a responsive treatment, and it is a worse kind of debt than the
section-numbering mismatch already accepted in
`08-desktop-changes-pending.md` §5.

**Where the desktop work lands:** amendments on the build specs in
`docs/workstreams/ws5-build-specs/`, since that is where ratified copy lives.
Each of the seven specs already carries an amendment table; this rework adds
rows to `03-SECTION-3`, `04-SECTION-4` and `05-SECTION-5`.

---

## 7. Overrides this rework implies

Every one is Jon's and each needs recording in the relevant build spec's
amendment table when the work is done.

| Spec | Clause | What changes |
|---|---|---|
| `03-SECTION-3` §5 | exact copy, verbatim | the headline, the boundary line and the closing line are cut on mobile |
| `03-SECTION-3` §4 | exact section order | the section stops existing on mobile; its stage labels and badges relocate |
| `03-SECTION-3` §11, §12 | badges and closing line placement | the badges move into the merged section |
| `04-SECTION-4` / `05-SECTION-5` | the merged section's composition | it now carries the ownership claim in words as well as in the divider |

None of these has been applied. This document is the record of the decision, not
of the work.
