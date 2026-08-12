# Desktop changes decided in the mobile build

Date opened: August 10, 2026, session 6
Date closed: **August 11, 2026, session 8**
Status: **CLOSED. Every row is applied and live on `blotterib.com`.**

**This file is now a record, not a work list.** It was the wave-1 inventory and
it has been worked through in full. Nothing here is outstanding. Individual
entries carry their own APPLIED / RATIFIED markers and the reasoning for each,
including three cases where the entry's own recorded argument turned out to be
wrong and was overturned on measurement:

| Entry | What the entry got wrong |
|---|---|
| §13 header | Called the fix "a one-line move". It is one line plus two consequences that touch the ratified hero |
| §16 Section 2 type | Argued desktop's 600px measure justified 22px. That explains why it was less obvious, not why it was right |
| §6 authority rule | Argued a 490px column gives a long rule an origin. A reason it *can* work, not a reason it should |

**Do not add new rows here.** The file it hands off to is
`06-assumptions-and-open-questions.md` for anything unsettled, and
`04-decision-log.md` for anything ruled.

## What this file is for

Stage 10 is the mobile build, and Jon's instruction on August 10, 2026 was that
`blotterib.com` is not to change during it. But the mobile work keeps surfacing
things that are wrong on **both** surfaces, and a decision made in this session
and then forgotten is worse than one never made.

So: anything decided here that belongs on desktop lands in this file instead of
in the desktop page. A later session works down the list in one pass.

**This is not a wish list.** Every row is a decision Jon has already taken or a
defect already confirmed. Speculative ideas belong in
`06-assumptions-and-open-questions.md` with a revisit trigger, not here.

## How to read the status column

| Status | Meaning |
|---|---|
| **Decided** | Jon has ruled. Apply it. |
| **Confirmed defect** | Measured and reproducible. Fix it. |
| **Already applied** | Landed on desktop as a side effect. Listed so nobody applies it twice. |

---

## 1. The Sheets scope note — ALREADY APPLIED

**Status: already applied. Do not apply again.**

`SHEETS_SCOPE_NOTE` in `web/lib/privacy-copy.ts`:

> Granted through Google Drive, limited to the one file you connect.

It renders in the desktop Google Sheets column of Section 6 as well as on
mobile, because `ServiceLists` is shared. Desktop Section 6 grew 50px for it and
nothing else.

It is listed here only because Jon asked on August 10 for that line to reach the
desktop page and it is easy to read that as outstanding. It is not.

**Why the heading and the mark stay `Google Sheets`**, on Jon's argument and it
is the better one: a Drive *icon* implies the whole Drive, which is the opposite
of what `drive.file` grants. The icon should name what Blotter touches — one
sheet — and the words carry the plumbing. Three surfaces now agree: `/privacy`
prints Google's own Drive wording beside the scope, Film B shows Google's Drive
card and then Blotter's card naming the one tracker file, and Section 6 carries
this sentence.

**If a connection provider is ever selected and its consent screen differs, this
sentence is wrong and must change with it.**

---

## 2. Two CTAs on one screen — DECIDED, MOBILE ONLY

**Status: decided for mobile. Desktop unaffected and must stay so.**

On a phone the sticky header's CTA and the hero's own CTA are both on the first
screenful — two controls, same four words. Three arrangements were built and
Jon compared them on his phone on August 10, 2026: bottom bar with a brand-only
header, both buttons and no bar, and header button only.

**He chose both buttons and no bar.** The sticky bottom bar he had approved
earlier the same day is not mounted on the live page: it cost 85px of every
screenful permanently, and once he saw the doubling in place it read as
persistence rather than as a mistake. `StickyCta` and the
`cta_location = "sticky"` enum value are kept so the decision is reversible
without touching the analytics contract; nothing fires it today.

**Desktop does not have this problem** and nothing here changes it: a desktop
reader sees the whole hero at once, the four ratified placements are
`PLAN-AMENDMENTS-2026-08-01.md`'s, and the header CTA is the only persistent
one. Recorded so a later session does not "fix" desktop to match a mobile
decision that was never about desktop.

---

## 3. Section 6's opening line is a throat-clear — DECIDED, MOBILE ONLY

**Status: decided for mobile. Desktop deliberately unchanged.**

`PRIVACY_OPENING` — *"Connecting Gmail, Calendar, and Sheets is a meaningful
permission. Here is exactly what Blotter checks, what it reads, what it keeps,
and what it never does."* — is now `hidden desk:block`.

It announces what is coming rather than saying it, and on a phone it is 180px of
prose between the reader and the claim that answers them. On desktop it earns
its place filling the right-hand column of the established two-column head, so
it stays.

**If a later session ever restyles the desktop Section 6 head, reconsider it
there too** — the argument that it says nothing is not a mobile argument.

---

## 4. The closing block is broken below the breakpoint — CONFIRMED DEFECT

**Status: confirmed defect. Mobile fix is stage-10 work and is next in the
order. Desktop is fine and must not change.**

Measured at 390px on August 10, 2026:

| Element | What it does |
|---|---|
| Closing headline | 26px type wrapping inside a **187px** column, 95px tall |
| `Try Blotter Now` | squeezed to **115px wide by 72px tall** — the label wraps *inside the pill* |
| Brand, privacy link, social marks | still jammed onto one row |

It is the desktop two-column footer crammed into a phone. At 1440 it is correct
and is not to be touched.

---

## 5. Section numbering is on for mobile and off for desktop — DECIDED, HALF APPLIED

**Status: APPLIED to both surfaces, August 11, 2026, wave 2. Closed.**

The condition this entry set has been met. Numbering could not go to desktop
until the two surfaces had the same sections; cutting Section 3 and splitting
4+5 made them match, and the media query came off the same day. Both surfaces
now render `01`–`05` against the same five blocks, and the boundary hairline is
drawn from the numeral at every width — the separate desktop rule wave 1 added
is deleted rather than left to draw a second line per section.

The four eyebrow overrides are spent: `04-SECTION-4` §101 and §351,
`05-SECTION-5` §74 and §253, `06-SECTION-6` §157, `07-SECTION-7` §85 and §269.

### Why it cannot be done in the sweep — RULED August 11, 2026

`10-web-reconciliation.md` §5 originally listed this as a wave-1 row. It is not
one, and Jon agreed on sight: *"section numbering can't be wave 1 because we
need to decide on new web sections."*

`web/app/page.tsx`'s own comment carries both reading orders:

```
desktop   1 hero · 2 scale · 3 how it works · 4+5 tracker · 6 · 7
phone     hero   · 01 scale · 02 your sheet  · 03 outstanding · 04 · 05
```

Number desktop today and the numerals land as `01` scale, `02` how-it-works,
`03` tracker, `04` privacy, `05` FAQ — against mobile's `01` scale, `02` your
sheet, `03` outstanding, `04` privacy, `05` FAQ. **`02` and `03` would name
different content on the two surfaces**, which is exactly the contradiction the
clause below exists to prevent. It cannot be made to match until wave 2 rules on
whether desktop keeps Section 3 and how its 4+5 is composed.

Cost of doing it early and then redoing it: four spec overrides, spent twice.

**Consequence for the hairlines, and it is not obvious.** On mobile the boundary
hairline is drawn from `.section-number::before` — deliberately, so it lands
once per section even in the merged section. Desktop has no numeral and will not
have one until wave 2, so **desktop's hairline needs its own anchor.** Wave 1
adds `.field-*` section-boundary rules rather than reusing the numeral
mechanism. When wave 2 turns numbering on, the two must be reconciled or a
section gets two rules.

Jon chose `01` on August 10, 2026, over `01 / 05` and over nothing, after
comparing all three on his phone. It renders below `--breakpoint-desk` and not
above it, so **the two surfaces currently disagree about whether this page has
numbered sections.**

That is a known cost rather than an oversight. Turning it on for desktop means
overriding four build specs that forbid an eyebrow, because a numeral above a
headline reads as one:

| Spec | Clause |
|---|---|
| `04-SECTION-4` | §101 "There is no eyebrow in Section 4", §351 exclusion list |
| `05-SECTION-5` | §74 "There is no eyebrow", §253 exclusion list, §292 |
| `06-SECTION-6` | §157 "There is no eyebrow" |
| `07-SECTION-7` | §85 "no eyebrow", §269 exclusion list |

Five blocks are numbered and the hero is not, because the hero is the opening
rather than a place a reader navigates to. If desktop adopts this, the numbering
must match mobile exactly or the page contradicts itself between devices.

**Why Jon rejected the total.** `01 / 05` read as a progress meter, and this
page is an argument rather than a form.

## 6. The rule before the authority line — RESOLVED, both surfaces

**Status: APPLIED August 11, 2026, wave 1. Mobile unchanged; desktop's rule
comes down from 32px to 12px.**

### Jon's ruling, August 11, 2026

> *"Keep it as is on mobile, for web make the dash before it shorter. Simply
> like a normal - kinda similar to how it is on mobile."*

**The argument this entry made for keeping 32px was wrong in an instructive
way.** It reasoned that desktop has a defence the phone lacks — the line sits
inside a 490px column where a longer rule has an origin to start from. That is
a reason a long rule *can* work there, not a reason it should. Jon's objection
was never that the dash had nowhere to start; it was that it was a big dash. A
490px column does not make a 32px dash less big, it only makes it less awkward.

The two surfaces now share one 12px rule and differ only in alignment: centred
beneath the full-width CTA on a phone, left aligned in the column on desktop.
The change is `desk:w-8` removed from the rule span in
`components/sections/hero.tsx`; `desk:mr-3` stays, so the gap after the rule is
12px on desktop and 10px on the phone.

### The original entry, kept for the record

`Built by a former Goldman Sachs banker for recruitment.` is preceded by a 32px
hairline on desktop. Jon called it "the big dash", it was hidden below the
breakpoint, and it then came back at **12px, centred under the full-width CTA**
— the arrangement he asked for and the one that stopped the line reading as an
orphan.

So the mobile answer is not "no rule", it is "a shorter rule, centred". The
desktop 32px rule is untouched and was never the thing he objected to; he was
looking at a phone throughout. **Ask before the next desktop pass** rather than
assuming the mobile judgement transfers — on desktop the line sits inside a
490px column where a longer rule has an origin to start from.

## 7. The methodology footnote gained four words — ALREADY APPLIED

**Status: already applied to both surfaces. Do not apply again; do not revert
without Jon.**

`02-SECTION-2` line 140 fixes this string verbatim and §5 requires exact copy,
so this is an override, taken by Jon on August 10, 2026:

| Before | After |
|---|---|
| `Estimated from manual Gmail and Calendar logging, ...` | `Hours saved estimated from manual Gmail and Calendar logging, ...` |

Only the opening changes. Every other word is untouched.

**Why the mobile build caused it.** §253 asks the methodology to sit
"immediately beneath or adjacent" to the proof it explains, and §563 repeats it.
On desktop it does — it is in the column under the `~60 hours` line. On a phone
both footnotes now fold into one disclosure further down the section, so the
adjacency that told a reader *what* was estimated is gone. Naming it in the
sentence restores that, and it is clearer on desktop too, which is why the
shared string was changed rather than a mobile-only variant introduced.

Desktop Section 2 is unchanged in height by it.

## 8. Five real links inside an illustrative spreadsheet — CONFIRMED DEFECT

**Status: confirmed defect on both surfaces. Queued for the Phase 6
accessibility sweep, not fixed yet.**

`components/section-45/parts.tsx:234` renders each sheet row's LinkedIn cell as
a genuine anchor to `https://www.linkedin.com`:

```
<a href="https://www.linkedin.com" className="text-chip-replied-fg underline">Here</a>
```

They are spreadsheet *content* in an illustrative asset, not navigation. Five of
them sit in the tab order, a screen reader announces "link, Here" five times in
a row with no context, and they measure **14 x 26px on desktop and 4 x 8px at
390** because the whole composition is scaled to fit.

**The fix is markup-only and changes nothing visually on either surface**:
render them as text rather than as anchors, keeping the blue and the underline
so the cell still reads as a spreadsheet hyperlink. That removes five phantom
destinations from the tab order and five meaningless announcements from the
screen-reader pass.

It is listed here because the file is shared, so the change lands on desktop
too — with zero visual delta, which is why it is safe to do in the sweep rather
than in a desktop pass.

## 9. Copy written for mobile — RATIFIED August 11, 2026

**Status: both strings ratified by Jon, having seen them quoted in place.
Closed. Two follow-ons opened, recorded below and in `06`.**

Jon on `SUPPORTING_SHORT`: *"I'm okay with this. I think it's better to error on
the side of less text on mobile version. Maybe there is a slightly better way to
say it than '... , from Gmail and Calendar' that portion. But in general im okay.
We might even make desktop version have less text too."*

Jon on the Section 6 line: *"This is ratified and correct… Shows on mobile
because those three are collapsed things you click plus to see so the header
what each connection can and cannot do is there so you know."*

**The principle he stated is worth more than the two rulings:** *error on the
side of less text.* It is the first time a general copy posture has been given
for this page, and it points the same direction as `09`'s whole diagnosis.

### Two follow-ons

**a. The `, from Gmail and Calendar` tail.** Jon wants a better phrasing. The
comma-tail reads as an afterthought bolted to a complete sentence. Not urgent
and not blocking; a copy pass, not a structural one.

**b. Desktop's hero paragraph may want shortening too.** *"We might even make
desktop version have less text too."* **This is not a wave-1 item** — it is
ratified hero copy, and cutting it is an argument-level change of exactly the
kind `09` governs. It goes to wave 2. See `06`.

| String | Where | Note |
|---|---|---|
| `SUPPORTING_SHORT` in `components/sections/hero.tsx` | **live on the mobile hero** — Jon chose it over the full paragraph and over nothing | A condensation of the ratified hero paragraph, not a new claim. Never renders above `desk`, which still gets the ratified sentence in full |
| `What each connection can and cannot do.` | mobile Section 6, above the three service rows | Replaced the per-row `2 can · 3 cannot` counts, which Jon read as a spec sheet on a section about trust |

Both follow the page's standing rules: no dash, no availability signal, no claim
the product cannot support.

---

## 10. Things this session deliberately did **not** change on desktop

Recorded so the absence reads as a decision rather than an oversight.

- **Every ratified scale.** Hero 0.8502, Section 3 0.9607, Sections 4 and 5
  0.9206. Verified identical before and after the responsive skeleton.
- **The desktop hero composition.** The sheet, the three activity cues and their
  connectors. Film C is the mobile hero only; whether desktop should also become
  a film is an open row in `06-assumptions-and-open-questions.md`.
- **Section 6's three-column permissions layout**, its two side-by-side
  footnotes, and the order of everything in it.
- **The funnel**, including which film it plays. Film A stays.
- **`page.tsx` section order.**

## 11. Bugs the mobile build found that were latent on desktop — ALREADY FIXED

Listed for the record; all three are already in `main`'s history on the `mobile`
branch and need no further action.

- **Section 3's rail** was measured in post-transform screen pixels and applied
  in pre-transform natural pixels. At the fixed 0.96 scale it sat 4% short and
  was invisible; any change of scale would have broken it visibly.
- **Section 2's diagram** was being scaled *up* by 0.36% — a ratified
  composition resampled to gain four pixels.
- **Five flex items** carried the default `min-width: auto` and could not shrink
  below their longest unbreakable line.

## 12. Two of five rows in the Blotter tab are 50% too tall — APPLIED

**Status: APPLIED August 11, 2026, wave 1, on both surfaces.**

**This entry was missing from `10-web-reconciliation.md` §5's wave-1 table** and
from its already-applied list, so it would have been skipped. It is a confirmed
defect that was deferred only because stage 10 forbade desktop-visible changes,
and stage 10 is over. Added to the sweep on that basis.

Found on August 11, 2026 while building the phone crop, by measuring the live
page rather than by looking at it.

Natural row heights in the Section 4+5 `Blotter` tab, taken from the live DOM
and divided back out of the ratified 0.9206 scale:

| Row | Natural height |
|---|---|
| Sarah Chen | 40.5px |
| **Marcus Lee** | **60px** |
| **Priya Shah** | **60px** |
| Daniel Kim | 40.5px |
| Alex Morgan | 39.5px |

**The cause, measured rather than guessed.** The `Call` column is 112px with
24px of padding, so 88px of text width. `1/17 @ 2:00 PM` needs **94.1px** and
`Completed 1/16` needs **91.8px** at 13px Arial. Both wrap to two lines, and
those two contacts are the only two with a `Call` value. Every other cell in the
grid is a single line. `Email` also overflows on two rows but is `truncate`d, so
it clips rather than growing the row — which is exactly the behaviour `Call`
should have.

**Why it counts as a defect rather than a composition choice.** A Google Sheets
row does not grow to fit its content; it clips at the cell boundary. This is the
page's "reusable high-fidelity Google Sheets window" (`WS4-SPEC.md:644`), and two
double-height rows in an otherwise uniform grid read as a rendering artefact
rather than as a spreadsheet.

**The fix, and it costs no ratified geometry.** Move 8px from `Email` to `Call`
in `components/section-45/parts.tsx` — `Email` 196 to 188, `Call` 112 to 120.
`Email` has 16.5px of slack it is already truncating away, `Call` is short by
6.1px, and `SHEET_W` stays 1,221px, so **every ratified scale is unchanged to
the pixel** and the desktop delta is three row heights returning to 40.5px.

### What it took, and the second copy nobody had noticed

The desktop fix was exactly as specified: `Email` 196 to 188, `Call` 112 to 120
in `components/section-45/parts.tsx`. `SHEET_W` held at 1,221px.

**Then the phone still had the defect.** `components/section-45/sheet-phone.tsx`
carries its own `FULL_COLS` list with the same ten columns at the same widths —
**a hand-kept copy, exactly like `web/public/film/` against `social/`.** Nothing
propagates. The fix had to be made twice, and a doc comment now says so on both
lists.

That is worth recording as a hazard in its own right: this is the second
duplicated-source trap in this codebase, and the first one had a wrong copy live
for five days.

### Verification

| | Before | After |
|---|---|---|
| Marcus Lee, natural | 60px | **40.5px** |
| Priya Shah, natural | 60px | **40.5px** |
| Sarah Chen / Daniel Kim | 40.5px | 40.5px |
| Alex Morgan | 39.5px | 39.5px |
| `SHEET_W` / `FULL_W` | 1,221px | **1,221px** |

Desktop Section 4+5 is **35.9px** shorter, which is 2 rows x 19.5px x the
ratified 0.9206 scale — the arithmetic closes exactly. Mobile 02 is **39px**
shorter, the same two rows unscaled. Every ratified scale is untouched.

Two `Email` cells now clip by 10px and 20px where they previously clipped by 2px
and 12px. That is the trade the entry specified: `Email` gives up slack it was
already truncating away, and clipping is what a spreadsheet cell does.

---

## 13. The sticky header CTA is not sticky — APPLIED, both surfaces

**Status: APPLIED August 11, 2026, wave 1. Mobile was fixed in stage 10;
desktop's half was taken in web reconciliation and is verified below.**

Measured on August 11, 2026 at 1440 and at 390: at `scrollY` 2200 the header
sat at document y=850 and was long off screen.

It **is** `position: sticky`. Its parent is the hero's `field-open` wrapper,
which is 910px tall, and a sticky element can only travel inside its parent's
box. So it pins for 910px and then leaves with the hero — on both surfaces.

**This makes §2 of this file wrong.** That entry argued the mobile bottom bar
was unnecessary partly on the grounds that *"the header CTA is the only
persistent one."* It was not persistent anywhere. The conclusion may still be
right, but the reason given for it was false and should not be reused.

`PLAN-AMENDMENTS-2026-08-01.md` ratified *"Retain the sticky-header CTA"*, so
the intent is not in question — only the implementation.

**The mobile fix, applied:** `position: fixed` below `--breakpoint-desk`, with
`body { padding-top: 60px }` replacing the space `sticky` used to reserve, and a
translucent fill under the existing blur so the bar has an edge against content
moving beneath it.

**The desktop fix as this entry originally specified it:** move `<SiteHeader />`
out of the `field-open` wrapper in `app/page.tsx` so its parent is the page
rather than the hero.

### What it actually took — APPLIED August 11, 2026

**The move is necessary and it is not sufficient.** This entry called it "a
one-line move"; it is one line plus two consequences the entry did not
anticipate, both of which touch the ratified hero.

**1. Taking a 60px child out of the wrapper drops the wrapper's painted box by
60px.** `.field-open`'s two radial glows are anchored at `0% -10%` and
`100% -12%` **of that box**, so the naive move slides both of them down 60px and
recomposes a hero `10` §10 lists as deliberately unchanged. It also contradicts
`app/page.tsx`'s own comment, which put the header inside the wrapper on purpose
so the page would open as "one continuous surface rather than a white bar
sitting on a tinted section". Two records in this repository, and nobody had
reconciled them.

*Fix:* `.field-open` takes `margin-top: calc(-1 * var(--header-h))` and
`padding-top: var(--header-h)`, above the breakpoint only. Flow consumed is
unchanged, the gradient box still starts at document y=0, and the header paints
over the top of the field rather than beside it. **Desktop only** — below the
breakpoint the header is already `fixed` and out of flow, and the same margin
would slide the film up under the bar.

**2. A header that genuinely persists travels over every band below it**, and it
carries `backdrop-blur-md`. `globals.css` already says, about the phone, that
blur over a page this light with nothing behind it reads as a smear; that is
just as true at 1440, and this entry did not mention it.

*Fix:* desktop gets the phone's translucent fill and 1px edge — **but gated on
`data-elevated`, which arrives at 8px of scroll.** At rest both radial glows are
at full strength in the top 60px and a 78% white veil across them would wash the
corners of the ratified composition. The phone has no such constraint: its hero
is a film that starts below the bar, which is why its fill is unconditional and
desktop's is not. A new 8px threshold rather than reusing the existing
`data-scrolled`, which fires at 240px and drives the phone's `shrink`
comparison — sharing one attribute would have silently moved a shipped mobile
behaviour to 8px.

### Verification

Production build, 1440.

| | Before | After |
|---|---|---|
| Document height | 7,200 | **7,200** |
| Six section heights | baseline | **all zeros** |
| `.field-open` document top | 0 | **0** |
| Header at `scrollY` 2200 | document y=850, off screen | **viewport y=0** |

Pinned at viewport top 0 at `scrollY` 0, 900, 2200, 4000 and 6300.

**Not yet seen on a real scroll.** The Browser pane is a hidden document, so
scroll events do not fire and `data-elevated` never toggles there. `sticky` is
pure CSS and is verified; **the fill's fade-in is for Jon to confirm on the
branch URL.**

---

## 14. Two mobile fixes whose reasoning is not mobile-only

**Status: decided for mobile. Worth reconsidering on desktop, not defects.**

- **`~60 hours` is bounded on a phone.** Jon: it "just sort of seems floating
  there". On desktop the figure sits in a two-column row and the column edge is
  its boundary, so the problem genuinely does not exist there. Listed only so a
  later session does not add the panel to desktop by symmetry. `02-SECTION-2`
  §8 forbids a badge or a loud highlight either way.
- **The section CTA is left-aligned and full width on a phone.** Right alignment
  is a desktop two-column device and correct there. No desktop change.

---

## 15. Both social links are live — ALREADY APPLIED TO DESKTOP

**Status: already applied to both surfaces on August 11, 2026. Do not apply
again.**

Jon supplied both URLs and asked for them on web and mobile, which makes this
the one deliberate desktop change during stage 10.

| | |
|---|---|
| LinkedIn | `https://www.linkedin.com/company/blotter` — already this, unchanged |
| X | `https://x.com/blotterib` — was `null`, now live |

Setting `X_URL` turns the dim placeholder mark into a real link on both
surfaces. Desktop height is unaffected: 7,200px before and after.

He wrote the LinkedIn address with a trailing full stop; that is sentence
punctuation, not part of the slug, and a company URL ending in `.` 404s.

---

## 16. Section 2's supporting paragraph is the largest body text on the page

**Status: APPLIED to desktop August 11, 2026, wave 1, and RATIFIED by Jon the
same day — *"I'm okay with the section 2 paragraph shortening."* Closed.**

`A manual tracker changes only when you remember to update it…` is set at 22px
in the display face. Jon, August 11, 2026: *"That paragraph is larger text than
any other text paragraph throughout the entire page… There's not a single other
part of this mobile website or web that has such big text that isn't in
header."*

He is right on both surfaces. It is the only run of body copy on the page set
above the 17px lede token, and it is not a heading.

**Mobile is now 17px** and desktop still 22px. Desktop has a defence mobile does
not: the paragraph shares a row with the `~60 hours` figure, has a 600px measure
to fill, and is not the largest thing in view. Whether that is enough is his
call.

`02-SECTION-2` fixes the copy, not its type scale, so changing it is
presentation rather than an override.

### Applied, and why, August 11, 2026

Jon's wave-1 instruction was *"everywhere stylistically that mobile differs from
web, make those changes to web where possible and where it makes sense"*, and
this is the clearest case of it in the file: he raised the observation about
**both** surfaces, and the observation is about the page's type scale rather
than about phone width.

The desktop defence explains why it is *less obvious* at 1440, not why it is
right. The page has one body scale and this was its only exception — one run of
body copy, set above the `--text-lede` token, that is not a heading.

Desktop now takes `--text-lede` at 17px with leading loosened to 1.55 for the
wider measure. 600px at 17px is roughly 70 characters, comfortably inside a good
measure, so the column does not need the extra size to hold together.

**Section 2 is 48.6px shorter for it.** That is the whole of the section's
negative delta in wave 1.

**Ratified by Jon, August 11, 2026**, having seen it in place on the branch
URL. This entry is closed. To revert it would take
`desk:text-[22px] desk:leading-[1.45]` back on the paragraph in
`components/section-2/scale-trajectory.tsx`, but there is no reason to.

---

## 17. The `~60 hours` figure has no container on mobile, and none on desktop

**Status: mobile settled after three attempts. Desktop unchanged and correct.**

Recorded so nobody adds a panel to desktop by symmetry. On desktop the figure
sits in a two-column row and the column edge is its boundary, so the problem
Jon reported — that it floats — genuinely does not exist there. On a phone the
stack removed the column, and the fix is a hairline joining it to the paragraph
it concludes rather than a box around it.
