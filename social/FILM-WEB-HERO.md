# The web hero film

`blotter-film-web-hero.html`. 1322 x 432.5, 11.50 seconds, plays once and holds.

It replaces the static composition `web/components/hero/hero-visual.tsx` draws as
the hero of the desktop landing page. Film C is the mobile hero and is unchanged;
this is its desktop counterpart, and the two share every convention except one.

**Nothing was copied into `web/public/film/` and no file in `web/` was touched.**
That copy belongs to the session that owns `web/`. Neither was this file folded
into `README.md`, which another session holds — same reason `FILM-C.md` exists as
its own file.

| | Job | Length | State |
|---|---|---|---|
| **A** | The launch post. | 21.5s | Built |
| **B** | The explainer. | 28.0s | Built |
| **C** | The hero of the **mobile** landing page. | 11.0s | Built |
| **Web hero** | **The hero of the desktop landing page.** | **11.5s** | **Built** |

## The job

The first thing a cold visitor to the desktop page sees, directly beneath the
ratified headline *"Your networking keeps moving. Your tracker does not."* It
answers that headline and nothing else.

No intro card, no end card, no wordmark, no closing line. The first frame does an
intro's job at no cost: a recognisable Google Sheets window, eight legible column
headers and the five canonical contacts. Every frame is product.

## The eleven and a half seconds

| | Beat | Length | What happens |
|---|---|---|---|
| 0.00 to 1.20 | **At rest** | 1.20s | The tracker before anything has arrived. |
| 1.20 to 3.98 | **Gmail** | 2.78s | `Sarah Chen replied`, `Jan 16 · 10:42 AM`. The cue plugs into row 2 and four cells move: Sent to **Replied**, `Next move` fills from empty to **Reply to Sarah**, `1/13/26` to **1/16/26**, Days 3 to **0**. Then the cue and its line leave. |
| 4.14 to 6.98 | **Calendar** | 2.84s | `Coffee chat with Priya Shah`, `Jan 16 · 11:00 AM`. Five cells: Call scheduled to **Call completed**, Attend coffee chat to **Send thank-you**, `1/15/26` to **1/16/26**, Days 1 to **0**, and the scheduled call becomes **Completed 1/16**. The cue leaves. |
| 7.14 to 11.50 | **Silence** | 4.36s | `No reply for 5 days`, `Day 5 · No new activity`, muted Gmail mark. **Nothing arrives and the row moves anyway:** Sent to **No reply**, `Next move` fills to **Bump thread**, Days 4 to **5** — while `Last contact` sits at `1/11/26` and does not move. Then **1.667 measured seconds** in which nothing on the canvas changes at all, and the film **holds** with this cue, its line and its node still on screen. |

Beat order builds. Two beats where activity arrives, then one where nothing does
and the tracker moves anyway. The third is the differentiator, so the film ends on
it and it gets the most time.

### It does not loop and it does not wipe back

Film C ends with a pale bar running up the grid, handing every row back to its
opening state so the loop seams frame-exactly. **This film must not do that**, and
the reason is what the two films are for. Film C loops, so a reader arrives at a
random point and the seam has to be invisible. This film is the hero of a page
that also serves its final frame as a **static image** — so its resting frame is
load-bearing, and Film C's resting frame is *the tracker before anything arrived*.
That is the worst possible still to leave under a headline about stale trackers.

So the film converges on `HERO_ROWS` and stops there. `t` is clamped at `DUR`
rather than wrapped: there is no seam to make frame-exact.

## The frozen cell is the silence beat

The other two beats are activity arriving. This one is activity *not* arriving,
and the tracker moving anyway.

On a phone that had to be argued with a counter alone, because `Last contact` was
not one of Film C's four columns. Here it is on screen, immediately left of
`Days`, and you can watch `Days` climb to 5 while `Last contact` sits perfectly
still beside it. **A cell visibly not changing is the evidence that nothing
arrived.**

Render `?bare=1&sweep=in&t=9.2` and that is the whole argument in one frame: the
sweep's leading edge has just crossed `Days`, which now reads **5**, and it is
standing directly against `Last contact`, which reads **1/11/26**. `Status` has
not yet turned. The counter climbs first and the status is *derived* from it.

**The cell is frozen structurally, not by timing.** Daniel's row carries no
`to.last` value at all, so that cell is built as plain static text and there is no
second value in it for any code path to reach. It is not that the film declines to
animate it — there is nothing there to animate. That is deliberate: a timing-based
freeze is one edit away from thawing.

Two inherited rulings, both recorded rather than re-derived:

- **Daniel opens on the grey `Sent` pill.** Jon's override on Film C's second cut,
  recorded in `FILM-C.md`. A row that already reads `No reply` with `Bump thread`
  against it *was already correct before the beat*, so the beat only increments a
  digit. Opening on `Sent` means the silence beat derives the status.
- **`Next move` opens blank.** `FILM-C.md` marks this as its author's inference
  rather than Jon's instruction, and it is carried forward unchanged for the same
  reason: a bump cannot be the next move on a thread that has not yet gone quiet.

### The arithmetic is deliberately loose and was not reconciled

Daniel opens at `Days 4` against a last contact of `1/11/26`, while every other
row's opening values are consistent with a current date of `1/16/26`. That is a
one-day looseness inherited from Film C, kept because it is exactly what lets
`Days` visibly climb while `Last contact` stays frozen. The brief instructed that
it not be reconciled and it has not been.

## The one departure from Film C: the connector points at the row

Film C drops its line into the sheet's top-left corner and lets the row sweep
identify which row moved. That works on a phone because there are four columns and
five rows. This sheet is eight columns and nearly three times wider, and a line
into the corner would leave the reader hunting.

So this film uses the **desktop hero's own** ratified device, from `01-HERO` §7 and
§9 and drawn by `hero-visual.tsx`: *one direct connector per cue, landing on that
row's maintained block, closed by a small endpoint node.*

Approved by Jon, August 11, 2026. His reasoning, recorded so it is not
second-guessed: *"Didn't have mobile version point to row because no space and
reduced columns make it easy to track."*

### One fixed slot

The cue card sits at x 1086, **top level with the top of the sheet window**, and
every cue appears in that identical position. Verified: x, width and height are
`1086.00 / 236.00 / 50.00` on all 691 frames, and the settled y is 0.00 for all
three cues.

**Cues do not accumulate.** Cue one arrives, its line draws, its row updates, and
the whole cue and its line leave before cue two arrives. Verified: never more than
one card on screen at any frame.

*Why the slot is fixed, so it is not "improved" back:* an earlier design stacked
the cards down the right at their rows' heights. Priya and Daniel are adjacent
rows 43.5px apart and the card is 50px tall, so they overlap — and the current
static hero curves its three connectors specifically to solve that collision. A
fixed slot removes the problem instead of solving it, and removing it is what buys
the straight line below.

### One right angle

The line leaves the underside of the card, drops straight down at **x 1109**,
turns once to the left, and runs into the target row, closing on a round node at
**x 1006**, the sheet's right edge. Mitred corner. No curve, no second elbow, no
routing, no arrowhead.

x 1109 is the centre of the cue card's source mark, measured off the live page, so
the vertical is naturally aligned and needs no routing — the same reasoning Film C
gives for its own line. The mark column is a fixed 20px so the x cannot move
between a 20px Gmail mark and a 19px Calendar one.

**Only the vertical drop's length changes between cues:** 142.25, 229.25 and
272.75 against a constant 103px horizontal run. Verified: the path is
`M # # L # # L # #` on every frame on which any connector is visible, and every
node sits at cx 1006 with cy in {192.25, 279.25, 322.75} — Sarah, Priya, Daniel,
dead centre.

The line draws itself as one continuous stroke through its corner
(`stroke-dashoffset`), rather than growing a vertical and then a horizontal. It is
one line, so it should arrive as one.

### The third cue stays

After Daniel's row updates, his card, its line and its node remain and the film
holds there. **This is not an addition.** Render Film C at `t=9.0` — the frame the
mobile page already serves to anyone who has asked for reduced motion — and the
silence cue is still present with every row settled.

## The sweep, and the A/B

Two rules survive from Film C verbatim, and both are verified rather than asserted:

1. **The sweep never crosses the ownership split.** Running a Blotter fill across
   `Name` would say Blotter writes the name, which is the one thing the ownership
   split exists to deny. Measured span across all 691 frames, in both directions:
   **415.547 to 1005.0**, against a split rule rendered at **415.547**. It begins
   exactly under the 2px rule the header band already draws, so the boundary is
   asserted twice for free, and it never enters the manual zone.
2. **The sweep leaves nothing behind.** Verified: **zero** cell-frames carry a
   background once the sweep has passed. Blotter is claimed once and never by a
   mark on a row.

### `sweep=in` is the default

- **`?sweep=in`** — the fill enters at the row's right edge, where the line landed,
  runs right to left, and halts dead on the ownership split.
- **`?sweep=out`** — Film C's direction. The fill starts at the split and runs left
  to right to the row's right edge.

Both are complete. Press `s` to swap live, or pass the parameter.

**I made `in` the default, and the argument is that this film's line arrives from
the right where Film C's arrives from above.** Film C's outward sweep does not
contradict its arrival direction; here an outward sweep runs back *against* the
direction the information came from, and the eye has to jump from the node across
the whole sheet and travel back. `in` is one uninterrupted gesture — down, left,
into the row, across — that arrests on the ownership rule.

And the arrest is the point. A fill that **stops** on a line reads as a boundary
more strongly than one that starts there. The ownership split is the single most
load-bearing claim in this composition, and `in` spends the film's strongest motion
moment on it.

**The honest argument for `out`, which is real:** it lands the cells in reading
order — Status, Next move, Last contact, Days, Call — where `in` lands them
backwards. It is strongest in beat 3, where `out` turns `Status` to `No reply`
first and then walks the edge toward the frozen cell, so the reader is watching for
`Last contact` before it is reached. `in` inverts that: `Days` climbs first and
`Status` derives afterwards, which I think is the better *story* but is the worse
*reading order*.

This is Jon's to decide by looking, which is why both are built and finished.

## Line weight and node size

Film C strokes **8px** with an **18px** node at 0.30 scale. The static hero strokes
**1.25px** with an **r2.75** node at 0.85. Both are right and the difference is
entirely scale.

This film renders at **0.8502** (1124 / 1322), so Film C's numbers would be
enormous and the hero's are too faint for something that draws itself.

| | Canvas | At 0.8502 | vs the static hero |
|---|---|---|---|
| **connector stroke** | **2.5px** | **2.13px** | 2.0x |
| **endpoint node** | **r5**, 10px across | **8.50px** | 1.8x |
| *the sheet's zone-split rule* | *2px* | *1.70px* | *unchanged* |

**The stroke is 2.5px because of the zone-split rule, not because of the hero's
hairline.** The split is a 2px border and resolves to 1.70px at this scale. At 3px
the connector would be 2.55px — visibly heavier than the ownership boundary, which
inverts the hierarchy between a transient annotation and the composition's most
important permanent rule. At 2.5px the connector is a shade heavier than the split,
which is right: it has to be seen arriving, and then it goes away. 1.25px was tried
and is genuinely too faint for a line that is supposed to be watched drawing
itself; 2x the hairline is the smallest step that reads as a moving object.

**The node is r5 because it is the only Blotter mark that survives into the static
frame.** The third cue's node never leaves, so it is in the held frame the page
will serve as its hero. That argues for restraint, and r6 (10.2px, about two thirds
the height of a status chip) starts to read as a badge on the row — which is exactly
what the sweep's "leaves nothing behind" rule exists to prevent. It also argues
against going too small: r4 is only 3.2x the stroke and begins to read as the line
merely stopping rather than landing. r5 is 4x the stroke, matching the static
hero's own 4.4x proportion, and lands at about half the height of a status chip, so
it sits below the smallest meaningful object in the sheet and cannot compete with
it.

**If Jon finds the node heavy in the held frame, r4 is the change** — one constant,
`NODE_R`. I would not go below that.

Colour, and the whole chain is one family: connector, node, sweep wash and the
settle on each changed cell.

```
--blotter-500  #c9a227   connector, node, sweep wash at 17%
--blotter-700  #8a6d12   the sweep's leading edge
--blotter-100  #f7f2e8   the maintained header band the sweep runs under
```

`--blotter-500` rather than the static hero's `--blotter-400`, and it is the same
step Film C took for the same reason: `-400` is tuned to be a hairline the eye
finds only when it looks for it, which is right for a still and wrong for a line
that has to be watched arriving. The leading edge is two steps darker again
because at a 17% wash the edge is the only part that has to read as a moving
object.

`globals.css` reserves the yellow family for "Blotter maintains this", and nothing
else in the film uses it.

## Where the geometry came from

**Every number was measured off the live rendering of `hero-visual.tsx`, not
computed from its constants**, and that distinction is not pedantry: the eight
columns are flex items that shrink by a pixel in total to fit a 1004px content box
inside a 1006px window, so every column boundary lands on a fraction and the
arithmetic in the brief is half a pixel out. The connectors and the sweep depend on
the rendering.

The film measures its own DOM at build time and drives the connector endpoints, the
sweep's origin and the per-column flip points from those measurements, so a width
change cannot silently desynchronise them. `window.GEOMETRY` exposes what it
actually laid out at.

| | Measured, live page | Measured, this film |
|---|---|---|
| sheet window | 1006 x 432.5 | 1006 x 432.5 |
| window top to first grid pixel | 127 | 127 |
| grid row height | 43.5 (last row 42.5) | 43.5 (last row 42.5) |
| row centres | 192.25 / 235.75 / 279.25 / 322.75 / 365.75 | identical |
| ownership split | x 415.539 | x 415.547 |
| maintained block right edge | x 1005 | x 1005 |
| cue card | 236 x 50 at x 1086 | 236 x 50 at x 1086 |
| source mark centre | x 1109 | x 1109 |
| node | x 1006 | x 1006 |

### One rule in the film's stylesheet is load-bearing and easy to delete by accident

`line-height: 1.5`. Tailwind's preflight sets it on `html`, and every unprefixed
size in `sheet-window.tsx` and `sheet-grid.tsx` inherits it. **It is what makes the
grid rows come out at 43.5px and the chrome stack come out at 127px without a
single height being declared anywhere in either component.** Change it and the whole
sheet silently resizes.

The same subtlety cost a quarter of a pixel during the build and is worth recording,
because it is the kind of thing that gets "tidied". `SheetWindow` declares no font
size of its own and inherits the page's 16px; only `SheetGrid` sets `text-[15px]`.
The star beside the document title carries no size class either, so its line box is
16 x 1.5 = **24**, while the title's is 19 x 1.25 = **23.75** — and the star is the
taller of the two. Scoping 19px to the container instead of to the title text makes
the sheet 432.25 tall and puts every row centre a quarter pixel above where
`hero-visual.tsx` asserts its connector endpoints.

## Where `hero-visual.tsx` and the brief disagree

The brief instructed that `hero-visual.tsx` is authoritative over any number it
quotes, and that disagreements be reported. Four, none of them consequential, all
resolved toward the file:

1. **The ownership split.** The brief gives `x = 43 + 372 = 415`. The rendered split
   is **415.539** on the live page and **415.547** here, because the columns shrink.
   The film drives the sweep from the measured value, so the sweep starts under the
   split rule rather than 0.5px inside the manual zone. The §14 check "the sweep
   never crosses x 415" passes either way — 415.547 is to the *right* of 415.
2. **Alex Morgan's row centre.** The brief's table gives **366.25**, from
   `rowCenterY(i) = 127 + 43.5(i+1) + 21.75`. The rendered centre is **365.75**,
   because `last:border-b-0` makes the final row 42.5px rather than 43.5px. Alex
   carries no cue, so nothing depends on it — but the same formula is what
   `hero-visual.tsx` uses to place connector endpoints, so it would matter if a cue
   were ever mapped to row 4. The film measures instead.
3. **Cue card height.** The brief says the cards are "56 to 63px tall". Measured on
   the live page: **50px**. The reasoning it supports is unaffected — at a 43.5px
   row pitch a 50px card still overlaps its neighbour, which is why the fixed slot
   exists — but the number is wrong and the collision is 6.5px rather than 13px.
4. **Scale.** `hero-visual.tsx` declares `VISUAL_SCALE = 0.85`; the brief says
   0.8502. Both are right: 1322 x 0.85 = 1123.7, and 0.8502 is 1124/1322 measured
   off the live page, which is what `sections/hero.tsx`'s `Fit` wrapper actually
   resolves to. No conflict.

## Where the values came from

| Source | What it gave |
|---|---|
| `web/lib/sheet-data.ts`, `HERO_ROWS` | the five contacts and every "after" value — the held frame is this, exactly |
| `web/lib/sheet-data.ts`, `SECTION_3_MOMENTS` | the three moments and their copy |
| the brief, `11-web-hero-film-brief.md` §7 | every opening value, and the Priya override |
| `01-HERO` §7 and §9, `hero-visual.tsx` | the cue card, the direct connector and its endpoint node |
| `web/components/section-3/day-timeline.tsx` | the muted Gmail mark: opacity 40%, grayscale |
| `web/components/google-marks.tsx` | the Gmail and Calendar marks, verbatim |
| `web/components/sheet/*.tsx` | chrome, grid, zone split and status-chip geometry |
| `web/components/hero/activity-cue.tsx` | the cue card, to the pixel |
| `web/app/globals.css` | every colour token |

**Every beat's end state is `HERO_ROWS` exactly.** The film converges on the hero
sheet rather than on something adjacent, which is what makes it structurally unable
to contradict the page it becomes the hero of.

### Three overrides carried into this film, all of them Jon's

- **Beat 2 is Priya Shah, not Marcus Lee.** `HERO_CUES` in `sheet-data.ts` reads
  `Coffee chat with Marcus Lee` targeting row 1. Jon ruled on August 11, 2026 that
  this film agrees with Film C, whose calendar beat is Priya, and that **the page
  data will be updated to match this film afterwards** — which is the other
  session's edit, not this one's.
- **Its stamp is `Jan 16 · 11:00 AM`**, given explicitly in the brief. Worth
  flagging for whoever updates `sheet-data.ts`: **this is a third value for that
  moment.** `SECTION_3_MOMENTS` says `2:00 PM`, `HERO_CUES` says `Jan 17 · 2:00 PM`
  (for Marcus), and the brief says `Jan 16 · 11:00 AM`. The brief's is the only one
  internally consistent with the film, because Priya's opening `Call` cell reads
  `1/16 @ 11:00 AM` and a 2:00 PM stamp would contradict it inside a single frame.
  The other two will need reconciling when the page data moves.
- **The ownership labels are gone.** `hero-visual.tsx` still draws `YOU add the
  contacts` and `BLOTTER keeps them current` beneath the sheet; Jon ruled on
  August 11, 2026 that they are removed when this film lands. The film does not draw
  them, leaves no room for them, and invents no replacement — which is why the canvas
  is 432.5 tall (the sheet alone) rather than `MODULE_H`'s 486.5. Ownership is
  carried by the maintained-zone header band, the sweep halting at the split, and the
  left three columns never moving, exactly as in Film C, which has no such labels
  either.

## Two decisions the brief left open

### The formula bar tracks the cell it points at

`hero-visual.tsx` selects **D2** with the bar reading **`Replied`** — Sarah Chen's
`Status` cell, which is the exact cell the first beat moves. Holding that static
would put `Replied` on screen for the opening 2.4 seconds while the cell itself
still reads `Sent`: a frame that contradicts itself, and one that `?t=0.5` would
serve as a still.

So the bar flips on the same instant the chip does. The held final frame carries
**D2 / `Replied`**, identical to the ratified static hero it replaces.

Film C froze its bar at **A2 / `Sarah Chen`** instead, and its two stated reasons
both lapse here: a manual field cannot contradict a frame it is not part of (true,
but so is a bar that moves truthfully), and it is one fewer thing animating at the
loop seam (this film has no seam). At 1124px the bar is legible rather than
shape-only, so a stale value would be read rather than merely shaped.

`01-HERO` §5 says the selected cell "**may** remain" D2, so this is permitted
either way. Reverting to Film C's approach is two strings in the `SHEET` constant.

### In `bare` mode the film is transparent

Film C paints its own ground, because it is the mobile hero inset in a rounded card
with its own ring. This film replaces `HeroVisualModule`, which is a transparent
object sitting directly on `.field-open`. A ground of its own would put a second
field inside the page's field and make the iframe's edges visible.

So `?bare=1` — which is how the page always loads it — is fully transparent and the
page's gradient reads through. Opened on its own without `bare`, the file paints a
neutral light gradient so it is legible; that is a viewing aid and is deliberately
**not** `.field-open`, because the page's two radial glows are anchored to the whole
hero wrapper rather than to this 432.5px slice.

## Technical behaviour

- **`?bare=1`** strips the controls and the ground.
- **`?t=<seconds>`** renders one frame deterministically. `render` is a pure
  function of `t`.
- **`?sweep=in|out`** picks the sweep direction.
- **All three compose**, as `?bare=1&sweep=out&t=9.2` does.
- **`window.renderAt(seconds)`** draws any frame; `window.GEOMETRY` reports what the
  composition was laid out at.
- **Autoplay needs no gesture** and the film reaches its held frame on its own.
- **Reduced motion**: if a reader has `prefers-reduced-motion: reduce` and no `?t=`
  was given, the film opens on the held frame rather than animating. `hero-film.tsx`
  already handles this from the other end by swapping the `src`; this costs nothing
  when the host has done its job and covers it when it has not.

### The still to serve

**`?bare=1&t=11.5`.** Any `t` from 9.84 to 11.50 is the identical held frame; 11.5
is the canonical one and is what `hero-film.tsx`'s desktop equivalent should point
at. It is the frame in which every row is `HERO_ROWS`, the silence cue is still
present with its muted mark, and its connector still lands on Daniel's row — the
mechanism and the outcome in one still, which is exactly what `01-HERO` §13 asks a
hero to do.

### Fonts

Geist only, inlined as a base64 data URI. **96KB**, of which 39KB is the face.

`inline-fonts.sh` inlines four faces because Films A and B need all four. This film
has no wordmark and no end card, so nothing uses Schibsted Grotesk; no Gmail inbox
surface, so nothing uses Roboto; and no figures set in the page's mono, so nothing
uses Geist Mono. Together they were about 140KB of a 232KB file. The sheet is pinned to
Arial, a system face, so **the only face this film draws is Geist, in the cue card**
— verified: exactly two font families resolve anywhere on the stage, Geist and
Arial.

To get any of them back, reset the block to the placeholder, re-run
`./inline-fonts.sh blotter-film-web-hero.html`, then delete again whatever the edit
did not need.

## Verification run

Driven through `window.renderAt` at 60fps over the whole film, **691 frames, in
both sweep directions.**

- **The held frame equals `HERO_ROWS` exactly.** All five contacts, all eight cells
  each, all 40 values, asserted against a literal transcription of `sheet-data.ts`.
- **`Name`, `Title` and `Firm` are identical on every frame**, for every contact, in
  both directions. Zero frames of drift.
- **Marcus Lee and Alex Morgan never move.** Each row resolves to exactly one
  distinct string across all 691 frames.
- **Daniel's `Last contact` reads `1/11/26` on every frame**, including while `Days`
  changes beside it. Exactly one distinct value.
- **The sweep never crosses the split.** Measured painted span 415.547 to 1005.0
  against a split rule at 415.547, in both directions. Never left of the rule, never
  past the sheet edge, never below x 415.
- **No residual marks.** Zero cell-frames carry a background once the sweep has
  passed.
- **Exactly one cue card at any moment, always in the same slot.** Never two; x,
  width and height invariant at 1086.00 / 236.00 / 50.00; settled y 0.00 for all
  three.
- **Every connector is one vertical drop and one horizontal run.** The path is
  `M # # L # # L # #` on every frame any connector is visible. No curves, no second
  elbow. Every node at cx 1006, cy in {192.25, 279.25, 322.75}.
- **The film holds.** Longest motionless run **1.667s**, from 9.84 to the hold at
  11.50, measured as the longest span over which not one inline style or transform
  on the canvas changes. No loop, no wipe-back.
- **`?t=` is deterministic and stable.** At all twelve of the brief's probe
  timestamps, arriving at `t` from 0 and arriving at `t` from 11.5 produce
  byte-identical style state. Eleven `?bare=1&t=` stills were also rendered as real
  iframes and checked by eye.
- **Both `?sweep=in` and `?sweep=out` are complete**, and every check above passes
  identically in both.
- **No text clips in any cell at any frame**, checked as `scrollWidth` against
  `clientWidth` on every data cell, every header cell, the cue card and its two
  copy lines, on all 691 frames.
- **No undefined CSS custom properties.** All 25 that the stylesheets reference
  resolve to a declared token. *This check exists because of Film C: its connector
  referenced `--blotter-500` before that file's token block carried it, an undefined
  `var()` makes the declaration invalid at computed-value time, and the element sat
  in the DOM at full opacity painting nothing — while the safe-band, clip and seam
  checks all passed.*
- **No external requests.** The only thing the document fetches is itself.
- **No console errors** on a clean load, and none after exercising resize, both
  sweep modes, true-size toggle, restart and a full 691-frame playthrough.
- **Legibility at the rendered 1124px width** checked by eye. Every cell value
  reads, and the connector reads clearly without dominating the sheet.

### Two things the checks caught that looking would not have

**A zero-size viewport rendered the film upside-down and mirrored.** `fit()` scales
the stage with `Math.min(1, availW/1322, availH/432.5)`. In an iframe inside a
`display:none` subtree, `innerWidth` and `innerHeight` are **0**, so that expression
is `Math.min(1, 0, -0.254)` = **-0.254** — and a negative scale is a 180-degree
rotation plus a mirror, not a small film. The frame would paint the composition
backwards until something happened to fire a resize.

That is not a hypothetical for this asset. `hero-film.tsx` deliberately embeds the
mobile film as `loading="lazy"` inside a `desk:hidden` wrapper, precisely so a
desktop visitor never fetches it — a zero-size iframe is the pattern this codebase
already uses on purpose, and the desktop integration will plausibly mirror it. The
film now holds the last good scale until the viewport has a size and lets the
resize that gives it one do the fitting.

Found because the verification pass, run in a backgrounded tab, reported the cue
card at x 0.00 and the sweep starting at x 317 — nonsense that turned out to be the
harness faithfully measuring a mirrored composition.

**Worth passing to whoever owns Film C:** it carries the same expression, `Math.min(1,
(innerWidth - …)/1080, (innerHeight - pad)/1350)`, with the same negative result at a
zero-size viewport. It has never shown because the mobile hero's slot always has
real dimensions by the time it lays out. Not touched by this session.

**The header cells were clipping.** `sheet-grid.tsx` puts `overflow-hidden` on data
cells **only**, and that is not an oversight — `Days` is a 56px column carrying a
15px semibold header against 24px of padding, so the word is wider than its box and
overflows leftward, into `Last contact`'s padding, where there is room. Clipping it
instead eats the `D`. Caught by the clip check, not by the eye, because at 0.85 a
clipped `D` reads as kerning.

## What I would flag before this goes public

1. **The sheet's drop shadow clips at the bottom of the canvas.** The canvas is
   1322 x 432.5 and the sheet is the full height of it, so its ratified
   `0 8px 28px -8px` shadow — about 14px of it — falls outside the box. In the real
   page that shadow paints onto `.field-open`; in an iframe sized exactly to the
   canvas it is cut, and the sheet sits on a slightly harder edge than the static
   composition does. **The film's stage does not clip** (`overflow: visible`), so the
   fix is entirely at the embed: give the iframe about 16px of extra height (aspect
   `1322 / 448.5`) and the shadow paints into it intact. Left as the integration
   session's call rather than changed here, because it is a decision about the slot
   and not about the film. Sides and top lose about 6px each on the same argument.

2. **`sweep=in` versus `sweep=out` is unresolved by design** and I have defaulted
   rather than decided. Both are finished. See the section above for the argument
   each way; `out`'s reading-order advantage is genuine and I would not be surprised
   to be overruled.

3. **The Priya timestamp is a third value** and `sheet-data.ts` now carries two
   others for the same moment. Reconciling them is a `web/` edit this session did not
   make. Flagged above under the overrides.

4. **The formula bar now moves**, which no other Blotter film does. It moves once,
   truthfully, in lockstep with the cell it names. If Jon would rather nothing in the
   chrome ever animated, freezing it at A2 is two strings.

5. **`01-HERO` §13 requires the hero to communicate its mechanism in a static
   first-load state**, and a film's *first* frame is the tracker at rest with no cue
   and no connector — which does not. The held frame does, completely, and it is what
   the page serves as its still and what a reader sees within twelve seconds. Jon has
   already ratified a film in the mobile hero slot on the same trade, and this asset
   was commissioned to replace the desktop composition, so I read §13 as satisfied by
   the held frame. **But §13 is written about a static hero, this is the first time a
   film has occupied the desktop slot, and it is close enough to the line that it
   should be Jon's call rather than mine.** `FILM-C.md` raised the neighbouring §12
   question for the same reason.

6. **`FILM-C.md`'s recorded file size is wrong, and Film C carries fonts it does not
   draw.** Its font block reads `/* ... Reset the block to /* Inlined by ... */`, and
   because CSS comments do not nest, that inner `*/` closes the comment — so all four
   faces are live in that file rather than the two its notes describe. It is **298KB
   on disk** against the 114KB `FILM-C.md` records, and `hero-film.tsx` calls it "a
   292KB asset". This file is the mobile hero, loaded above the fold on a phone, so
   about 140KB of it is fonts nothing on screen uses. **Not touched by this session**
   — Film C was read-only here — but it is a real and cheap win for whoever owns it.

## Claim safety

No price, no availability, no beta, no launch date, no cohort language. No outreach
is written or drafted: every `Next move` on screen is a prompt to the user — Reply
to Sarah, Send thank-you, Bump thread — and no drafted message appears. Nothing
depicts a sweep across an inbox. No credential field appears at any size in any
frame. No bank logo appears. Blank cells are genuinely blank; the one ratified em
dash is Alex Morgan's `Next move`, scoped to that cell, exactly as `sheet-grid.tsx`
draws it and as `HERO_ROWS` carries it.

`01-HERO` §12's removed treatments are all absent: one sheet and never two, no
stale rear sheet or fragment, no before-and-after labels, no decay story, no
vertical engine, no processor box, no cue-to-engine-to-sheet flow, no ownership
labels above the sheet, no isolated-cell-only highlighting, no additional cue cards,
no explanatory copy inside the module. §9's forbidden treatments are absent too: no
oversized arrowheads, no animated particles, no glowing tubes, no spiderweb — one
line at a time, and never more than one on screen.

## Controls

Not part of the film. `?bare=1` removes them.

| Key | |
|---|---|
| `space` | play / pause |
| `left` `right` | step one frame at 30fps |
| `r` | restart |
| `s` | swap the sweep direction |
| `c` | hide the controls, for recording |
| `f` | true 1322px size instead of fit-to-window |

The `Gmail`, `Calendar`, `Silence` and `Hold` buttons jump to the middle of each
beat and to the held frame, which is the fastest way to compare the A/B.

## Exporting an MP4

1. Open it, `c` to hide the controls, `f` for true 1322 x 432.5.
2. `r` to restart, then screen record for about 14 seconds.
3. Trim to 11.50 seconds. There is no loop and no seam; the film simply stops.

For a frame-accurate render, `window.renderAt(seconds)` is deterministic over
`t = 0` to `11.50`.

## Open for Jon

1. **`sweep=in` or `sweep=out`.** The one thing built twice. Both are finished, both
   are one URL parameter apart, and `s` swaps them live.
2. **The node at r5**, which is the only Blotter mark that survives into the held
   static frame. r4 if it reads heavy there.
3. **`01-HERO` §13 and a film in the desktop hero slot.** See flag 5.
4. **Whether the formula bar should move.** See flag 4.
5. **Nothing was copied into `web/public/film/`**, and no file in `web/` or
   `blotter-ib-ws1/docs/` was touched. Both belong to the session that owns them.
