# Film C, the mobile hero

`blotter-film-c-4x5.html`. 1080 x 1350, 11.0 seconds, seamless loop.

**This is a new file rather than an edit to `README.md`.** Two other sessions
hold that file and `web/` right now. Fold this in when they land.

It **replaces** the planned Film C, the "silence cut" on line 39 of `README.md`.
That brief no longer applies: the slot has a different job, and the silence beat
is folded into this film rather than being its own asset.

| | Job | Length | State |
|---|---|---|---|
| **A** | The launch post. Hello world, day one. | 21.5s | Built |
| **B** | The explainer. Shows the connection and the mechanism properly. | 37.8s | Built |
| **C** | **The hero of the mobile landing page.** The automation engine running. | 11.0s | **Built** |

## The job

The first thing a cold visitor from Reddit, X or LinkedIn ever sees. Above the
fold, on loop, as a 1:1 centre crop, inset in the page with rounded corners,
roughly 328 to 400px wide depending on the phone.

It does not explain setup and it does not tell the story of adopting Blotter. It
shows the automation engine running.

**No intro card, no end card, no wordmark, no closing line.** The page carries
the ratified eyebrow and headline directly above the film and the CTA directly
below it. An intro would make the reader wait for something they have already
read, and on a loop they would hit it at a random point anyway. Every frame is
product.

The first frame does the intro's job at no cost: a recognisable Google Sheets
window, legible column headers, and the five canonical contacts.

## The eleven seconds

| | Beat | What happens |
|---|---|---|
| 0.00 to 1.00 | **At rest** | The tracker before anything has arrived. |
| 1.00 to 3.40 | **Gmail** | `10:42 AM · Gmail`, *Sarah Chen replied*. The cue plugs into the sheet, and Sarah's row moves: Sent to **Replied**, `Next move` fills in from empty to **Reply to Sarah**, Days 3 to **0**. |
| 3.42 to 5.70 | **Calendar** | `2:00 PM · Calendar`, *Coffee chat with Priya Shah*. Call scheduled to **Call completed**, Attend coffee chat to **Send thank-you**, Days 1 to **0**. |
| 5.72 to 9.56 | **Silence** | `Day 5 · No new activity`, *No reply for 5 days*, with the muted Gmail mark. **Nothing arrives, and the row moves anyway:** Sent to **No reply**, `Next move` fills in to **Bump thread**, Days 4 to **5**. Then 1.60 measured seconds in which nothing on the canvas changes at all. |
| 9.60 to 10.20 | **Wipe back** | A pale bar runs up the grid and hands each row back to its opening state. |
| 10.20 to 11.00 | **At rest** | Identical to 0.00 to 1.00. The seam is frame-exact. |

Beat order builds. Two beats where activity arrives, then one where nothing
does and the tracker moves anyway. The third is the differentiator, so the film
ends on it and it gets the most time: 3.84 seconds against 2.40 and 2.28.

### Daniel opens on `Sent`, and that is the whole silence beat

**Jon, on the second cut.** The first two builds had Daniel sitting at
`No reply` / `Bump thread` from the opening frame, with only Days moving on the
beat — which is what the brief for this film asked for, "Days 4 to 5, nothing
else moves". Jon overruled it: Daniel must open on the grey `Sent` pill and
become `No reply` when the cue arrives.

He is right, and it is the difference between the beat showing something and
the beat showing nothing. A row that already reads `No reply` with `Bump thread`
against it **was already correct before the beat**, so the beat only increments
a counter and the film's most important moment is a digit. Opening on `Sent`
means the silence beat *derives* the status: five days pass, nothing arrives,
and the absence becomes an action owed. That is the product.

Two consequences worth recording:

- **`Next move` opens blank too**, and that is my inference rather than Jon's
  instruction. A bump cannot be the next move on a thread that has not yet gone
  quiet, and `Sent` with a blank `Next move` is exactly how Sarah and Alex Morgan
  open. Easy to reverse if it should stay filled.
- **The five-day threshold is not invented.** `04-SECTION-4` section 7 gives
  Daniel's reason as `No reply for 5 days` and puts him in `Follow-ups due` at
  five days, so day five is where the ratified data already says this row turns.
  The film shows the threshold being crossed rather than asserting a new rule.

The end state is untouched and is still `TRACKER_CONTACTS` exactly.

## The cue plugs straight into the sheet

**Jon, on the first cut:** the `BLOTTER KEEPS IT CURRENT` band between the cue
and the sheet added nothing, and the cue should simply plug into the spreadsheet
with the line. The band is gone.

He was right, and the specs back him harder than his note claims. `01-HERO`
section 12 lists among the treatments removed from the hero: **"vertical Blotter
engine"**, **"central processor box"**, **"cue-to-engine-to-sheet flow"**. The
band was all three. Sections 7 and 9 give the treatment that belongs here
instead, and `hero-visual.tsx` draws it:

> one direct connector per cue, landing on that row's maintained block, closed
> by a small endpoint node.

So the cue now drops **one continuous line** into the sheet, landing on its
first gridline at x 89 — which is also the centre of the cue card's source mark,
so the line is vertical and needs no routing. A node closes it where it meets
the sheet. The row sweep carries it the rest of the way.

**This is the hero's device, in the hero's colour.** `hero-visual.tsx` strokes
its connector in `--color-blotter-400` with an `r2.75` node, and `globals.css`
reserves the yellow family for "Blotter maintains this" — which is exactly what
the far end of this line is. The whole chain is now one colour: connector, node,
row sweep and the breath on each changed cell.

Two load-bearing details survive from the first cut:

1. **The row sweep starts at the zone split, not at the row gutter.** `Name` is
   the column you fill in. Running a Blotter sweep across it would say Blotter
   writes the name, which is the one thing the ratified ownership split exists
   to deny. Starting at the split also puts the sweep's origin exactly on the
   rule the header band already draws, so the boundary is asserted twice for
   free.
2. **The sweep leaves nothing behind.** Once it has passed, the row carries no
   mark. Blotter is still claimed once and never by a badge on a row.

### So what still says "Blotter", with the band gone?

Three things, all of them ratified page furniture rather than anything this film
invents, and all of them on screen for the full eleven seconds:

- the **yellow**, now carrying the entire mechanism from cue to cell;
- the **maintained-zone header band** the sheet already draws in
  `--blotter-100`, with its 2px split rule;
- the **`Blotter` tab**, active in the tab strip, exactly as `hero-visual.tsx`
  sets it.

That is the hero's own answer to "how does a reader know something is doing
this", and it is the right answer for this film, because this film **is** the
hero.

### One deviation from the hero, recorded so it can be reversed

The hero draws a **1.25px** stroke in `--blotter-400` with an **r2.75** node,
tuned for a hairline at desktop scale. At 0.30 scale those resolve to 0.4px and
0.8px — nothing. So the film uses an 8px line, an 18px node, and `--blotter-500`
for the line and `--blotter-700` for the sweep's leading edge, both a step or two
darker so the mid tone does not go washy on white.

Same family, same device, same semantics; scaled to be visible on a phone. It is
the same class of deviation as the type sizes below.

## The type floor, measured

Film A's sheet content is 24px on this canvas, 8.3px effective at 375px. Its
status chips are 20px, 6.9px effective, the smallest meaningful thing on screen.
Here the chip is the payoff of every beat, so it cannot be the smallest thing.

Measured off the built film, then resolved onto a 1:1 centre crop:

| Element | Canvas | @328 | @343 | @398 |
|---|---|---|---|---|
| **sheet content** | 36px | **10.93** | **11.43** | **13.27** |
| **column headers** | 34px | **10.33** | **10.80** | **12.53** |
| **status chips** | 32px | **9.72** | **10.16** | **11.79** |
| trigger line | 40px | 12.15 | 12.70 | 14.74 |
| trigger stamp | 30px | 9.11 | 9.53 | 11.06 |
| row numbers | 27px | 8.20 | 8.57 | 9.95 |
| Sheets menu row | 20px | 6.07 | 6.35 | 7.37 |
| *crop scale* | | *0.3037* | *0.3176* | *0.3685* |

The three floors hold. At 360 to 430 wide, sheet content runs 12.00 to 14.33.

**Sheets chrome is deliberately below the floor and stays there.** The menu row,
the formula bar, the row numbers and the tab strip are recognised by shape, not
read — they are what makes the first frame say "Google Sheets" in a glance.
Every value a beat *changes* is above the floor. Film A makes the same trade.

### Four columns fit, and here is the arithmetic

These sizes are 50% larger than Film A's, which is why the column count drops
from five to four. **The columns are sized to their measured content rather than
to the page's column proportions, which is the only way they fit.** Widths
measured in Arial at the sizes above:

| | Width | Longest content | Needs |
|---|---|---|---|
| gutter | 48 | row numbers only | |
| `Name` | 234 | "Alex Morgan" 202.10 | + 28 padding = 230.1 |
| `Status` | 272 | "Call completed" **chip box** 249.70 | + 22 padding = 271.7 |
| `Next move` | 322 | "Attend coffee chat" 289.55 | + 28 padding = 317.6 |
| `Days` | 122 | header "Days" 81.29 sets this one | + 28 padding = 109.3 |
| | **998** | | against a 1000px sheet: 2px of border, 21px of slack |

The `Status` column is solved against the **chip box**, not the bare text: 32px
"Call completed" plus 11px padding either side, a 5px gap and an 11px caret.
Solving it against the text alone clips the chip, which is the payoff cell.

Nothing clips at any frame. Verified, not assumed — see below.

`Firm` and `Last contact` are the dropped columns. `Days` earns its place twice:
the Gmail beat resets it and the Silence beat climbs it.

## Where the values came from

| Source | What it gave |
|---|---|
| `web/lib/sheet-data.ts`, `TRACKER_CONTACTS` | the five contacts and every "after" value |
| `web/lib/sheet-data.ts`, `SECTION_3_MOMENTS` | the three moments, verbatim: stamps, substamps and triggers |
| `01-HERO` sections 7 and 9, `hero-visual.tsx` | the cue card, the direct connector and its endpoint node |
| `web/components/section-3/day-timeline.tsx` | the muted Gmail mark: opacity 40%, grayscale |
| `web/components/google-marks.tsx` | the Gmail and Calendar marks, verbatim |
| `web/components/sheet/*.tsx` | chrome, grid, zone split and status-chip geometry |
| `web/app/globals.css` | every colour token and the page field gradient |

**Every beat's end state is `TRACKER_CONTACTS` exactly.** The film converges on
the hero sheet rather than on something adjacent, which is what makes it
structurally unable to contradict the page. Verified on every frame of the
hold, not by inspection.

The **opening state is the only thing not lifted from a file**, and every value
in it came from Jon: Sarah at Sent / blank / 3 and Priya at Call scheduled /
Attend coffee chat / 1 from the brief, Daniel at Sent / blank / 4 from his note
on the second cut.

Marcus Lee and Alex Morgan never move. They are their ratified rows at every
frame and they are there so the sheet reads as a tracker rather than as a
three-row demonstration.

### The muted Gmail mark

Daniel's mark is muted rather than struck or absent, and the reasoning is
`day-timeline.tsx`'s own: the thread is a Gmail thread, so the slot names it,
and the muting carries the fact that nothing arrived in it. A full-strength mark
would imply Gmail signalled something, and **Gmail signalling nothing is the
entire point of that row.**

Note this is the opposite of the hero's treatment, deliberately and per
`sheet-data.ts`: `HERO_CUES` keeps Daniel at full strength because muting there
depends on Section 3's `NO NEW ACTIVITY` stamp to be legible. This film carries
that stamp — `Day 5 · No new activity` — so the Section 3 treatment is the
correct one here.

## One thing I would flag before this goes public

**`01-HERO` section 12 removes "layered before-and-after sheets", "`before`
   and `after` labels" and an "explicit tracker-decay story" from the hero.**
   This film shows one sheet, never two; it carries no labels; and it tells no
   decay story. The opening state is not a stale tracker that gets repaired — it
   is a correct tracker *before the reply arrived at 10:42*. What the film shows
   is the mechanism operating, not a fault being fixed. I believe that is
   outside section 12's intent, and section 12 governs the landing-page hero
   rather than a film either way, but it is close enough to the line that it
   should be your call rather than mine.

## Deviations from the page specs

Crop decisions for a phone-sized video. None touches a landing-page surface.

1. **Four columns: `Name`, `Status`, `Next move`, `Days`.** `Firm`, `Title`,
   `Last contact` and `Call` are dropped. `01-HERO` section 6 forbids *adding*
   fields and section 16 defers responsive adaptation; nothing was added and the
   order among the survivors is unchanged. The reason is the type floor above,
   and it is arithmetic rather than preference.
2. **The selected cell is A2 and the formula bar is static for the whole loop.**
   A2 is Sarah Chen's `Name` cell, which is a manual field and therefore never
   one of the values a beat moves — so the formula bar cannot contradict a frame
   it is not part of, and it is one fewer thing animating at the seam.
3. **Row height 86px, header 80px.** Airier than real Sheets, tighter than Film
   A's 74px-at-24px ratio. The 36px floor and the 1080px band do not both fit at
   Film A's proportions.

   Vertical solve, all inside the safe band: card `174 to 312`, connector
   `312 to 438`, sheet `438 to 1178`. 39px of margin above, 37px below.
4. **The moments are reordered** from Section 3's own order, which opens on
   Daniel. A page is scanned and a film is built: two things arrive and move the
   sheet, then nothing arrives and it moves anyway. Silence has to be third or
   it is just another beat.

## Claim safety

No price, no availability, no beta, no launch date, no cohort language. No
outreach is written or drafted: every `Next move` on screen is a prompt to the
user and no drafted message appears. Nothing depicts a sweep across an inbox. No
credential field appears at any size in any frame. No bank logo appears. Blank
cells are genuinely blank — the hero's one ratified em dash is scoped to that
cell and does not travel here, so Alex Morgan's `Next move` and Sarah's opening
`Next move` are empty.

## Verification run on Film C

Driven through `window.renderAt` over the whole loop at 30fps, headless.

- **All 331 frames rendered, no runtime errors and no console errors.**
- **Loop seam frame-identical.** Every computed property of every element in the
  stage at `t = 11.000` matches `t = 0.000` exactly — opacity, transform, width,
  height, background, display, visibility. Zero differences, including at
  opacity zero. Film A carries one float-rounding difference at the seam; this
  one carries none, because every latching value is explicitly returned to zero
  by the end of its beat rather than left at 1.
- **Every visible element stays inside the 1:1 safe band**, `y 160` to `1191.5`
  against a band of `135` to `1215`, across the whole loop. 25px of margin above
  and 23.5px below. Measured as *painted* rects: an element's box intersected
  with every clipping ancestor, so the wipe bar parked outside its
  `overflow:hidden` container is correctly counted as putting no ink on canvas.
- **No text clips in any cell at any frame**, checked as `scrollWidth` against
  `clientWidth` on every cell, the trigger line, the band label, the tabs and
  the title bar, on all 331 frames.
- **The sheet reads as `TRACKER_CONTACTS` exactly on every frame of the hold**,
  `t = 7.90` to `9.56`, taking only the value in each cell that is actually
  opaque. Both rest windows read as the opening state exactly, on every frame.
- **No undefined CSS custom properties.** Every `var()` the stylesheets
  reference resolves to a declared token.
- **Longest motionless run: 1.60 seconds**, `t = 7.97` to `9.57`, measured as
  the longest span over which not one computed property on the canvas changes.
  The brief asks for at least 1.5 seconds after Days climbs.

### Three things earlier builds got wrong, all caught by looking

- The wipe ran sideways, column by column, which reverted `Days` before `Status`
  and left Sarah reading `Replied` with three days since contact for about a
  third of a second — a row that contradicts itself, held long enough for a
  scrubbed frame to catch it. The wipe now runs **bottom to top, row by row**, so
  every row is either its opening state or its ratified one and never anything
  in between. It also undoes the beats in the order they happened.
- Two crossfading values overlapped for six frames, and at 0.30 scale "Attend
  coffee chat" sitting on top of "Send thank-you" is a smear rather than a
  transition. A cell now **replaces** its value: the old one is gone before the
  new one starts.
- **The connector was invisible for a whole build.** It referenced
  `--blotter-500`, which `globals.css` defines but this file's token block had
  never copied over. An undefined `var()` makes the declaration invalid at
  computed-value time, so the element sits in the DOM at full opacity with the
  right box and paints nothing — which means the safe-band check, the clip check
  and the seam check **all passed** while the thing was missing. Only looking at
  a frame caught it. The verification pass now asserts that every custom property
  the stylesheets reference actually resolves, so that class of fault cannot be
  silent again.

## Two of the four inlined faces are stripped

This is the one way the file diverges from `inline-fonts.sh`'s output, and it is
deliberate.

Film C has **no wordmark and no end card**, so nothing uses the display face,
and it has **no Gmail inbox surface**, so nothing uses Roboto. The script inlines
all four faces because A and B need all four. Here, Schibsted Grotesk (62KB) and
Roboto (50KB) were 113KB of a 226KB file — **half the asset, in fonts it never
draws**.

That matters here in a way it does not for A or B. This is the mobile hero: it
is the thing a cold visitor loads above the fold, on a phone, on whatever
connection they have. **The file is now 114KB.** The `--display` token is
removed with it, so a future edit cannot reach for a face the file no longer
carries.

Geist, Geist Mono and Arial remain. If a future edit needs either face back,
reset the block to `/*FONTS*/` and re-run `inline-fonts.sh`, then delete them
again if the edit did not in fact need them.

## Controls

Same as A and B, minus the copy cyclers, which this film has no need of.

| Key | |
|---|---|
| `space` | play / pause |
| `left` `right` | step one frame at 30fps |
| `r` | restart |
| `c` | hide the controls, for recording |
| `f` | true 1080px size instead of fit-to-window |
| `1` | show the 1:1 safe band |

`?bare=1` strips the controls so the film sits in the page as an asset rather
than a player — implemented natively here, unlike Film A, where it was patched
into the `web/public` copy only. `?t=7.2` opens paused on one frame.
`window.renderAt(seconds)` draws any frame deterministically.

## Exporting an MP4

1. Open it, `c` to hide the controls, `f` for true 1080 x 1350.
2. Screen record for about 25 seconds so you capture two clean loops.
3. Trim to exactly 11.00 seconds. The seam is frame-identical, so any cut point
   works as long as the duration is exact.

For a frame-accurate render, `window.renderAt(seconds)` is deterministic over
`t = 0` to `10.967` at 30fps.

## Open for Jon

1. **`01-HERO` section 12**, and whether the opening state reads as a
   before-and-after. See above. This is the only claim-shaped question left.
2. **The connector colour.** It is now the hero's yellow, end to end. The
   alternative is navy, which is what the first cut used and what Film A uses on
   its sources line — higher contrast at phone scale, but it would make the
   yellow-maintained-zone argument twice in two colours and leave nothing in the
   frame carrying Blotter. I went with yellow; say the word and it flips.
3. **The opening state** is the one set of values in this film not already fixed
   in a repository file. It came from your brief. If it should be written into
   `sheet-data.ts` so a future session cannot drift it, that is a `web/` edit and
   this session did not make it.
4. **Nothing was copied into `web/public/film/`.** That copy belongs to the
   session that owns `web/`.
