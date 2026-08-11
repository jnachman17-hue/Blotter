# The page argument rework

Date opened: August 10, 2026, session 6
Last updated: August 11, 2026, session 7
Status: **Mobile 02 is built and ratified and is live on the phone page.**
Mobile 03, the funnel and the accessibility sweep remain. **Nothing here has
reached web** — §8 is the ledger of what it owes.

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

### The headline — RATIFIED August 11, 2026: option C, both

The original position: the merged section takes
**`Keep the tracker you already built.`**, already ratified, already the right
opener because it kills the switching-cost objection first, with the ownership
claim carried by the supporting paragraph, the divider and the refusals.
**A headline is deleted rather than invented**, which is a safer override than
new copy.

**Jon reopened this on August 11, 2026** and the observation is right:

> *`You manage the relationships. Blotter maintains the moving parts.` and
> `Keep the tracker you already built.` are two components of the same thing.
> Need to think about which one we use, or a hybrid, for the new section.*

That is exactly what §3's inventory says — C is ownership, D is preservation,
and they collapse because one sheet proves both. If the merged section proves
both, a headline stating only preservation **under-claims its own picture**,
and the divider is mostly proving the half the headline does not say. The §1
fault again, in miniature.

**There is also a duplicate hiding inside the section.** The supporting
paragraph opens *"Keep the Google Sheet and contacts you already built"*, which
is `Keep the tracker you already built.` said twice in two consecutive lines.
That sentence is row 4 of §1's table — one of the four statements of the claim —
and merging the sections puts it directly under a headline that already says it.

#### The candidates

| | Headline | What it costs |
|---|---|---|
| A | `Keep the tracker you already built.` alone | preservation only; ownership goes unclaimed above its own visual |
| B | `You manage the relationships. Blotter maintains the moving parts.` alone | ownership only; preservation leans entirely on the tab strip and the reassurance claims |
| C | **Both. A as the headline, B as the deck beneath it, and the first sentence of the supporting paragraph cut** | two ratified strings, nothing invented, nothing repeated |
| D | A new compressed hybrid | invented copy, a copywriting pass and a fresh ratification |

**C is the recommendation.** It answers the observation literally — they are two
components of one thing, so use both, in the order the picture proves them:
preservation from the tab strip, then ownership from the divider. Every string
stays verbatim and the only edit is a deletion. The section then states
preservation once, ownership once, and what Blotter actually does once:

> **Keep the tracker you already built.**
> *You manage the relationships. Blotter maintains the moving parts.*
> Blotter creates a standardized recruiting view in a new tab and keeps the
> changing activity current from Gmail and Calendar.

**Ratified by Jon, August 11, 2026**, having seen it in place at device width.
It overrides `03-SECTION-3` §5 and `05-SECTION-5` §4's exact-copy clauses, and
both amendment tables carry it. Note what the override actually is: one ratified
headline is **relocated** to a lower weight and one ratified sentence is
**deleted**. No string is rewritten and none is invented.

### The mechanism is not restated at all — AMENDED August 11, 2026

**Superseded. Jon ruled the three stage labels are cut from mobile outright.**

The original position, kept for the record: the hero film demonstrates the
mechanism, so the Friday timeline's three ratified stage labels —
`RECRUITING HAPPENS HERE` → `BLOTTER KEEPS IT CURRENT` →
`YOUR TRACKER STAYS CURRENT` — would survive as a compressed line of roughly
80px directly above the sheet, on the argument that *a stated claim under a
proved one is a caption*.

**Built and rejected on sight, August 11, 2026.** Jon's words: it *"makes no
sense"* there, and it does not.

The reasoning was wrong in a way worth naming, because it is the same error this
whole document exists to remove. The labels are not above the thing that proves
them: the film is about 1,100px earlier and what sits directly beneath them is a
picture of the **ownership split**. So they caption a claim the visual below
them does not make — *words over a visual that proves something else*, which is
precisely the §1 fault, reintroduced in a new place by the fix for it.

They came out of the section being deleted and were parked in the nearest
available one. That is not a reason to keep them.

**Nothing is lost.** The supporting paragraph already carries the claim in
words: *"keeps the changing activity current from Gmail and Calendar."*

Considered and not chosen: moving them under the hero film, where the caption
argument would be literally true. Available later if the mechanism ever reads as
under-stated on the phone.

Shrinking the timeline instead was rejected earlier and stays rejected: legible
or small, pick one — the same trap `components/layout/fit.tsx` documents.

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

## 5. The sheet on a phone — RATIFIED, August 11, 2026: the swipe

**Ratified: the controlled internal scroll, with the gesture driving the
explanation.** Jon approved it at device width on August 11, 2026 after
comparing it against the crop inside the assembled section.

**The crop was chosen first and then lost.** That sequence matters and is kept
in full below, because the constraint the crop ran into is not obvious and a
later session will otherwise rediscover it the hard way.

**What the ratified treatment is.** All ten columns at full ratified width in a
horizontal scroll region. `Name` frozen, and tinted as manual while frozen, so
the column that travels with the reader stays visibly theirs rather than
appearing to be maintained. The two zone labels ride the scroll at their full
19px with their subtitles and bracket rules, exactly as desktop draws them. Each
zone washes and names itself as the reader reaches it. A prompt says the object
swipes, and fades once it has been swiped.

**Whose idea, and why it beat the crop.** Jon's. The swipe had been rejected
earlier the same day on the grounds that nothing told the reader to swipe and a
still frame showed five manual columns and no Blotter. His answer fixed the
actual defect rather than working around it: prompt the gesture, and let the
gesture drive the explanation. That buys back the one thing the crop could not
keep — the zone labels at full size over the columns they name — because at
natural width the two zones are 640px and 538px and both labels fit as ratified.

It is also the page's own device. From `social/README.md` on Film A's typing
beat: *"The left is filled by the user. The right fills itself. The two gestures
mirror, which makes the ownership split happen rather than get asserted by a
word underneath the sheet."* This is that, driven by a thumb instead of a
timeline.

**What it costs, accepted knowingly:** the argument no longer survives a
screenshot in full. Both washes are always painted and the manual label is on
screen at rest, so a still frame states the half the reader can see rather than
nothing — but a reader who scrolls past without swiping does not meet the
maintained zone. That is a real override of the page's static-proof posture and
Jon took it with the cost stated.

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

---

## 8. The web ledger — every argument change, why, and what web owes

**Jon's instruction, August 11, 2026:**

> *We are making these changes to mobile because I realized they are repetitive
> and don't actually match the visuals they have associated with them on web, so
> the essence of these changes will need to move over to web as well. We need to
> document all changes made and why, and then park those and come back to them
> when we go back and update web after completing mobile.*

So this is the running list. **Every argument-level change made on the phone
gets a row here at the moment it is made**, whether or not it transfers. A row
that says "does not transfer" is as useful as one that does — it stops a later
session applying a mobile decision to desktop on mobile reasoning.

This is not `08-desktop-changes-pending.md`. That file is presentation and
defects. This is **what the page claims and in what order**, which is the thing
Jon says was actually wrong.

| # | Change on mobile | Why | Web owes |
|---|---|---|---|
| 1 | Section 3 stops existing; its claim, visual and copy are redistributed | Three consecutive headlines stated one claim, and Section 3's visual proved the mechanism while its words claimed ownership | **The fault, yes. The deletion, no.** Desktop has room and no hero film, so the mechanism may still need its own section there. §6 |
| 2 | The boundary line and the closing line are cut | *"Blotter keeps the logistics current"* and *"Blotter keeps the logistics synchronized"* are near-synonyms in one section, and `03-SECTION-3` line 341 shows the duplication was seen at ratification and mitigated with whitespace | **Yes, unchanged.** This is copy, not layout, and the whitespace mitigation is weak on desktop too |
| 3 | The three refusals move to the ownership section | They are the ownership claim stated negatively. *"You write the messages"* and *"no generic mass AI outreach"* are one sentence facing two directions. Privacy is about what Blotter **reads**; these are about what it refuses to **write** | **Yes.** The argument for the move is not a space argument |
| 4 | The three stage labels are cut outright | They caption a mechanism claim, and the visual beneath them proves ownership. Rejected on sight August 11, 2026. §4 | **Not applicable.** On desktop they sit inside the timeline they label, which is correct. Do not touch them |
| 5 | The merged section takes **both** headlines — `Keep the tracker you already built.` as the headline, `You manage the relationships. Blotter maintains the moving parts.` as the deck — and the supporting paragraph's first sentence is cut | The two are two components of one claim, and the paragraph's opening repeated the headline two lines later. Ratified August 11, 2026. §4 | **Yes, and this is the biggest one.** The headline arrangement has to hold on both surfaces or the two pages make different claims. Desktop currently states the claim four times and this is the shape that fixes it |
| 6 | The ten-column sheet becomes a swipe with the zones washing and naming themselves | Legibility, and the gesture enacts the ownership split rather than asserting it. §5 | **No, as a treatment.** Pure responsive; desktop keeps the full sheet at rest. **But look again at desktop's zone labels** — the phone build is what showed how much work they do, and desktop states the same split three more times in words it does not need |
| 7 | The three reassurance claims stack | Three across at sheet width is 116px each at 350. Ratified August 11, 2026 | **No.** Pure responsive |
| 8 | The Outstanding list becomes the films' vertical list | Desktop's three columns are what fit 21 actions into thirteen rows, and a phone has no third column. The films already set the same data as `04-SECTION-4` §7's own vertical structure | **No, as a treatment.** But note what it exposed: **the films, the discarded PNG and §7 all cut to one row plus `+N more`, and desktop overruled that.** If the phone lists all 21 and desktop lists all 21 by a different arrangement, the two agree; if the phone adopts `Cut`, they do not, and that is a content fork rather than a responsive one |
| 8b | **OPEN — the Outstanding view is drawn three different ways.** Film A cuts each group to one row plus `+N more`; desktop shows all 21 as three columns; mobile shows all 21 with the tail behind a disclosure | Nobody chose this. Each surface solved its own space problem and the three answers drifted apart. Jon raised it on August 11, 2026 | **Yes, and it is the one row here that is still a question rather than a decision.** The film is the surface out of step: it is the only one that says there are actions you cannot see, which is the claim `04-SECTION-4` §7 exists to deny. Settle it during reconciliation, and the answer has to name a single rule that all three obey |
| 9 | The funnel becomes a full-screen sheet | The 960px card collapsed to `100vw - 32px` while its steps were still composed for 960 | **No.** Pure responsive. The card is right on a desktop and the August 6 reasoning is unchanged |

**The principle, restated because it governs every row:** layout may diverge
between devices. **The argument may not.** A row above that transfers and is not
applied is a content fork, and that is worse debt than the section-numbering
mismatch already accepted in `08-desktop-changes-pending.md` §5.

**Where the work lands:** amendments to `03-SECTION-3`, `04-SECTION-4` and
`05-SECTION-5`, since that is where ratified copy lives. Not before mobile is
finished.
