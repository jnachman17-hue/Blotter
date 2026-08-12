# The web hero film — build brief

Date: August 11, 2026
Status: **Brief written and approved. Not yet built.**

This is the prompt for a separate chat, agreed with Jon on August 11, 2026. It
is kept here rather than only pasted into that chat so the reasoning survives,
and so the integration session can check the delivered asset against what was
actually asked for.

**Everything below the line is the prompt. Copy it whole.**

---

You are building one asset: a film that becomes the hero of the Blotter desktop
landing page. It replaces a static composition that is currently live.

**Read this entire brief before you open a single file, and read every file in
section 2 before you write a single line.** This asset has been specified in
detail precisely so that it can be built once rather than iterated toward. Do
not produce variations for review. Produce the specified thing.

## 1. Your boundaries — read this first, it is not negotiable

**Another chat is working in this repository right now**, in `web/` and in
`blotter-ib-ws1/docs/`. A collision would destroy its uncommitted work.

**You may create exactly two files:**

```
social/blotter-film-web-hero.html
social/FILM-WEB-HERO.md
```

**You may not:**

- modify **any** existing file, anywhere, including in `social/`
- create any other file
- run `git add`, `git commit`, `git push`, `git stash`, `git checkout`, or any
  other command that writes to git state
- start a dev server. Port 3100 is in use by the other chat. If you need to
  serve something, open your file directly as a `file://` URL

**You may read anything in the repository**, and you should read a lot.

Integration into `web/` is the other chat's job and it will happen after you
finish. `web/public/film/` is a hand-kept copy of `social/` — nothing
propagates automatically, and copying is not yours to do.

## 2. Read these before you build, in this order

**The reference film, which is the single most important input:**

- `social/FILM-C.md` — the full spec for the mobile hero film. Every convention
  you are inheriting is explained here with its reasoning.
- `social/blotter-film-c-4x5.html` — the film itself. **Watch it.** See §3.
- `social/README.md` — the film system: colour usage, the export path, and
  `inline-fonts.sh`.

**The composition you are replacing, which fixes your geometry exactly:**

- `web/components/hero/hero-visual.tsx` — every measurement. Treat the constants
  in this file as authoritative over any number quoted in this brief; if they
  disagree, the file is right and say so in your write-up.
- `web/lib/sheet-data.ts` — `HERO_COLUMNS`, `HERO_ROWS`, `HERO_CUES`. The exact
  column widths, the five contacts and all their cell values, and the three
  activity cues with their copy.
- `web/components/sheet/sheet-window.tsx` — the Google Sheets chrome.
- `web/components/sheet/sheet-grid.tsx` — the grid, the gutter, the zone band.
- `web/components/sheet/status-chip.tsx` — the status pill colours.
- `web/app/globals.css` — the `--color-blotter-*` family and the page field
  tokens.

**How the finished asset gets used:**

- `web/components/hero/hero-film.tsx` — how the mobile film is embedded, the
  `?bare=1` convention, and the `?t=` still mechanism you must reproduce.

**The governing specification:**

- `blotter-ib-ws1/docs/workstreams/ws5-build-specs/01-HERO.md` — §6, §7, §9,
  §11 and §12 all bear on this asset. §12's list of removed treatments is a
  list of things you must not reintroduce.

**The live pages, for visual context:**

```
https://blotter-claude-git-web-jnachman17-hues-projects.vercel.app
```

Look at it wide (1440) to see the static hero you are replacing, and narrow
(390) to see Film C in place as the mobile hero. Both matter.

## 3. Watch Film C properly — there is a technique for this

Film C exposes a deterministic frame renderer. Append `?bare=1&t=<seconds>` to
its URL and it renders itself frozen at that timestamp. `bare=1` strips the
scrub bar.

**Step through these timestamps and look at each one:**

`0.5` · `1.2` · `2.0` · `3.3` · `4.0` · `5.0` · `5.6` · `6.5` · `7.5` · `9.0` ·
`9.8` · `10.5`

That walks you through: rest, the Gmail cue arriving, Sarah's row mid-change,
the end of beat one, the Calendar cue, Priya's row changing, the end of beat
two, the silence cue arriving, Daniel's row changing, the dead hold, the wipe
back, and rest again.

**`t=9.0` is the most important single frame in this project.** It is what the
mobile hero already serves to anyone who has asked for reduced motion, and the
equivalent frame in your film is what the desktop page will show as a static
image. Study it.

Three things to notice, because you are keeping two of them and changing one:

1. **The cue plugs into the sheet with one straight line and a round node.** No
   curve, no routing, no arrowhead. **Keep this.**
2. **The row sweep starts at the ownership split and leaves nothing behind.**
   Once it has passed, the row carries no badge or mark. **Keep this.**
3. **The line lands at the sheet's top-left corner, not on a row.** The sweep
   alone identifies which row moved. **You are changing this** — see §6.

## 4. What this film is, in one paragraph

A recruiting tracker in a Google Sheet maintaining itself. Three pieces of
activity arrive one at a time — an email reply, a completed meeting, and then
nothing at all for five days — and each one rewrites the right-hand half of one
row while the left-hand half is never touched. The film plays once and holds on
its final frame, which becomes the page's static hero. It is the first thing a
cold visitor sees, directly beneath the headline *"Your networking keeps
moving. Your tracker does not."* It answers that headline and nothing else. No
intro card, no end card, no wordmark, no closing line. Every frame is product.

## 5. Canvas and geometry

**Canvas: 1322 x 432.5.** It is rendered on the page at 1124px wide, a scale of
0.8502. Design for the natural size; check legibility at the rendered size.

These are `hero-visual.tsx`'s constants. **Read them from the file rather than
trusting this table**, and flag any disagreement.

| | |
|---|---|
| Sheet window width | 1006 |
| Sheet window height | 432.5 |
| Window top to first grid pixel | 127 |
| Grid row height, header included | 43.5 |
| Row-number gutter | 43 |
| Manual zone: Name 108 + Title 126 + Firm 138 | 372 |
| Maintained zone: Status 132 + Next move 156 + Last contact 112 + Days 56 + Call 134 | 590 |
| Connector corridor, sheet edge to cue column | 80 |
| Cue card column width | 236 |
| **Total width** | **1322** |

**The ownership split sits at x = 43 + 372 = 415** from the sheet's left edge.
Everything left of it is the reader's. Everything right of it is Blotter's.

**Row centres**, from `rowCenterY(i) = 127 + 43.5 * (i + 1) + 21.75`:

| Row | Contact | Centre y |
|---|---|---|
| 0 | Sarah Chen | 192.25 |
| 1 | Marcus Lee | 235.75 |
| 2 | Priya Shah | 279.25 |
| 3 | Daniel Kim | 322.75 |
| 4 | Alex Morgan | 366.25 |

Note that `43 + 372 + 590 = 1005` against a stated sheet width of 1006. The
one-pixel difference is a border. Reproduce the file's rendering, not the
arithmetic.

**Keep the full Google Sheets chrome:** title bar reading `IB Recruiting
Tracker`, the menu row, the formula bar showing the selected cell, the A–H
column letters, the numbered row gutter, and the tab strip with `Contacts`
inactive and `Blotter` active. Film C keeps all of it and the first frame does
the work an intro card would otherwise do.

**There are no ownership labels in this asset.** The desktop page currently
draws `YOU add the contacts` and `BLOTTER keeps them current` beneath the sheet.
**Jon ruled on August 11, 2026 that they are removed when this film lands.** Do
not draw them, do not leave room for them, and do not invent a replacement. The
maintained-zone header band, the sweep halting at the split, and the left three
columns never moving are what carry ownership — exactly as in Film C, which has
no such labels either.

## 6. The one deliberate departure from Film C

**Your connector points at the specific row. Film C's does not.**

Film C drops its line into the sheet's top-left corner. That works on a phone
because there are four columns and five rows, so the sweep alone is
unambiguous. This sheet is eight columns and nearly three times wider, and a
line into the corner would leave the reader hunting for what changed.

So you use the **desktop hero's** ratified device instead, from `01-HERO` §7 and
§9: *one direct connector per cue, landing on that row's maintained block,
closed by a small endpoint node.*

**Approved by Jon, August 11, 2026.** His reasoning, recorded so you do not
second-guess it: *"Didn't have mobile version point to row because no space and
reduced columns make it easy to track."*

### How the cue and its line behave — this is Jon's design, follow it exactly

**The cue card occupies one fixed slot and never moves.** It sits to the right
of the sheet, in the 236px cue column, with **its top level with the top of the
sheet window**. Every cue appears in that identical position.

**The line is an L with exactly one right angle.** It leaves the underside of
the cue card, drops straight down, turns once to the left, and runs horizontally
into the target row, closing on a round node at the sheet's right edge. Only the
length of the vertical drop changes between cues. There is no curve, no second
elbow, and no routing.

Drop from beneath the cue card's source mark so the vertical is naturally
aligned, the same reasoning Film C gives for its own line needing no routing.

**Cues do not accumulate.** Cue one arrives, its line draws, its row updates,
and then **the whole cue and its line leave** before cue two arrives in the same
slot. This is what makes the fixed slot work: the cards never coexist, so they
cannot collide.

*Why this matters, so you do not "improve" it:* an earlier design had the cards
stacking down the right at their rows' heights. Priya and Daniel are adjacent
rows 43.5px apart, and the cards are 56 to 63px tall, so they overlap by about
13px. The current static hero curves its connectors specifically to solve that
collision. A fixed slot removes the problem instead of solving it.

**The third cue is the exception: it stays.** After Daniel's row updates, his
cue card, its line and its node remain on screen and the film holds there. This
is not an addition — it is what Film C already does. Render Film C at `t=9.0`
and you will see the silence cue still present with every row settled.

## 7. The three beats, specified cell by cell

The five contacts and their **final** values are `HERO_ROWS` in
`web/lib/sheet-data.ts`. Read them there. The film's held final frame must equal
that data exactly, because it becomes the page's static hero.

The manual zone — **Name, Title, Firm — never changes in any beat, for any
contact, at any time.** This is the ownership claim and it is proved by
stillness.

### Opening state, before anything arrives

| Row | Status | Next move | Last contact | Days | Call |
|---|---|---|---|---|---|
| Sarah Chen | `Sent` (grey) | *empty* | `1/13/26` | `3` | *empty* |
| Marcus Lee | `Call scheduled` | `Attend coffee chat` | `1/15/26` | `1` | `1/17 @ 2:00 PM` |
| Priya Shah | `Call scheduled` | `Attend coffee chat` | `1/15/26` | `1` | `1/16 @ 11:00 AM` |
| Daniel Kim | `Sent` (grey) | *empty* | `1/11/26` | `4` | *empty* |
| Alex Morgan | `Sent` (grey) | em dash, muted, centred | `1/16/26` | `0` | *empty* |

**Marcus Lee and Alex Morgan never change.** They are the controls. Marcus holds
a *future* scheduled call throughout, which is deliberate — it shows the tracker
carrying forward-looking information. Alex's em dash in `Next move` is a
ratified detail, not a placeholder; `sheet-data.ts` explains why.

Two rows both reading `Call scheduled` at the open is correct and intended. One
of them resolves during the film and the other does not.

### Beat 1 — Gmail. Sarah Chen. Four cells.

Cue card: Gmail mark, **`Sarah Chen replied`**, timestamp **`Jan 16 · 10:42 AM`**.
Target row 0, centre y 192.25.

| Cell | From | To |
|---|---|---|
| Status | `Sent` | `Replied` |
| Next move | *empty* | `Reply to Sarah` |
| Last contact | `1/13/26` | `1/16/26` |
| Days | `3` | `0` |

`Call` stays empty.

### Beat 2 — Calendar. Priya Shah. Five cells.

Cue card: Calendar mark, **`Coffee chat with Priya Shah`**, timestamp
**`Jan 16 · 11:00 AM`**. Target row 2, centre y 279.25.

| Cell | From | To |
|---|---|---|
| Status | `Call scheduled` | `Call completed` |
| Next move | `Attend coffee chat` | `Send thank-you` |
| Last contact | `1/15/26` | `1/16/26` |
| Days | `1` | `0` |
| Call | `1/16 @ 11:00 AM` | `Completed 1/16` |

**This beat is Priya, not Marcus, and that is an override you must not
"correct".** `HERO_CUES` in `sheet-data.ts` currently reads
`Coffee chat with Marcus Lee` targeting row 1. Jon ruled on August 11, 2026 that
this film agrees with Film C, whose calendar beat is Priya. The page data will
be updated to match your film afterwards, by the other chat. **Build Priya.**

### Beat 3 — silence. Daniel Kim. Three cells, and one that must not move.

Cue card: **muted** Gmail mark, **`No reply for 5 days`**, second line
**`Day 5 · No new activity`**. Target row 3, centre y 322.75.

| Cell | From | To |
|---|---|---|
| Status | `Sent` | `No reply` |
| Next move | *empty* | `Bump thread` |
| Days | `4` | `5` |
| **Last contact** | **`1/11/26`** | **`1/11/26` — frozen** |

**This is the most important beat in the film and the frozen cell is why.**

The other two beats are activity arriving. This one is activity *not* arriving,
and the tracker moving anyway. On a phone that had to be argued with a counter
alone, because `Last contact` was not on screen. Here it is on screen, and you
can watch `Days` climb to 5 while `Last contact` sits perfectly still right next
to it. **A cell visibly not changing is the evidence that nothing arrived.**

Compose the beat so a viewer's eye can catch both cells at once. Do not
de-emphasise `Last contact` — its stillness is the point, and it must be
legible enough to be seen not moving.

Daniel opening on the grey `Sent` pill is a **Jon override from an earlier Film
C cut**, recorded in `FILM-C.md`. Earlier builds had him already at `No reply`
with only `Days` moving. He must open on `Sent` and become `No reply` when the
cue arrives, or the beat shows nothing.

*One note on the arithmetic, so you do not spend a turn on it.* Daniel opens at
`Days 4` against a last contact of `1/11/26`, while the other rows' opening
values are consistent with a current date of `1/16/26`. That is a deliberate
one-day looseness, inherited from Film C, kept because it is what lets `Days`
visibly climb while `Last contact` stays frozen. **Use the values as
specified. Do not reconcile them.**

## 8. The sweep, and an A/B you must build

When a cue lands, the changed cells fill with the Blotter yellow. Film C calls
this the row sweep, and two rules survive from it verbatim:

1. **The sweep never crosses the ownership split at x 415.** Running a Blotter
   fill across `Name` would say Blotter writes the name, which is the one thing
   the ownership split exists to deny.
2. **The sweep leaves nothing behind.** Once it has passed, the row carries no
   badge, tint or marker. Blotter is claimed once and never by a mark on a row.

**The direction is undecided and you build both.** Film C's line arrives from
above and its sweep runs left-to-right from the split. Yours arrives from the
right, so there is a genuine choice, and Jon wants to see them side by side.

Expose it as a URL parameter:

- **`?sweep=in`** — the fill enters at the row's right edge, where the line
  landed, runs right-to-left, and **halts dead on the ownership split.** The
  argument: the fill enters where the data arrived, and a sweep that stops on a
  line reads as a boundary more strongly than one that starts there.
- **`?sweep=out`** — Film C's direction. The fill starts at the ownership split
  and runs left-to-right to the row's right edge. The argument: it says
  *Blotter's territory begins here and fills outward*, which is the more logical
  reading of the mechanism.

Pick one as the default, say which and why in your write-up, and make sure both
are complete and equally finished. Jon decides by looking.

## 9. Timing

Film C's rhythm, which you inherit:

| Beat | Duration |
|---|---|
| Opening rest | 1.00s |
| Gmail | 2.40s |
| Calendar | 2.28s |
| Silence | 3.84s, of which the final **1.60s is dead still** |

**Three changes for this film:**

1. **No wipe-back.** Film C ends with a pale bar running up the grid, returning
   every row to its opening state so the loop seams frame-exactly. **You must
   not do this.** Its resting frame would be the tracker before anything
   arrived — the worst possible still under a headline about stale trackers.
2. **The film holds.** After the silence beat, everything stops and stays. No
   loop, no fade, no reset.
3. **Cues one and two now need to exit** before the next arrives, which Film C's
   20-millisecond beat boundaries do not allow for. Give each exit the time it
   needs and let the total run longer — roughly 11 to 12 seconds to the hold is
   expected. **Keep the silence beat the longest of the three**, and keep its
   1.60 seconds of complete stillness before the hold.

## 10. Line weight, and why you must not copy Film C's numbers

Film C strokes an **8px** line with an **18px** node. The static desktop hero
strokes **1.25px** with an **r2.75** node. Both are correct, and the difference
is entirely scale: Film C renders at about 0.30, where a hairline vanishes;
the hero renders at 0.85, where it does not.

**Your film renders at 0.8502**, so Film C's numbers would be enormous and the
hero's may be too faint for something that animates.

Start around a **3px** line and an **r6** node, in `--color-blotter-500` with
the sweep's leading edge in `--color-blotter-700`, then **check it at the
rendered 1124px width and tune.** State the values you chose and why in your
write-up. Do not copy either reference blindly.

The colour family, from `globals.css`:

```
--color-blotter-100: #f7f2e8   maintained header band
--color-blotter-200: #f3e6c6
--color-blotter-400: #d9b64a   the static hero's connector
--color-blotter-500: #c9a227   Film C's line
--color-blotter-700: #8a6d12   Film C's sweep leading edge
```

The whole chain — connector, node, sweep, and the settle on each changed cell —
is one colour family. `globals.css` reserves the yellow family for "Blotter
maintains this", and nothing else on the page may use it.

## 11. Required technical behaviour

**`?bare=1`** strips any scrub bar or controls so the film reads as an asset
rather than a player. The page always loads it this way.

**`?t=<seconds>`** renders the film frozen at that timestamp, deterministically,
as a still. This is not optional — it is how the page serves a static image to
anyone who has asked for reduced motion, and `hero-film.tsx` already depends on
the convention for Film C. Verify it by rendering several timestamps and
confirming each is stable and correct.

**Both parameters must compose**, as `?bare=1&t=9.0` does for Film C.

**Fonts must be inlined.** `social/inline-fonts.sh` exists for this and was run
on Film C. Follow whatever `README.md` says about it. Do not run it against any
file but your own.

**The film must be self-contained** — one HTML file, no external requests, no
CDN, no network fonts. It is served from the site's own origin.

**Autoplay must not depend on a user gesture**, and the film must reach its held
frame on its own.

## 12. What `01-HERO` §12 already removed — do not reintroduce any of it

The specification has an explicit list of treatments removed from the hero. It
includes a **vertical Blotter engine**, a **central processor box**, and a
**cue-to-engine-to-sheet flow**. Film C's first cut had a
`BLOTTER KEEPS IT CURRENT` band between the cue and the sheet, and Jon removed
it — it was all three of those at once.

Also forbidden, from §9: oversized arrowheads, animated particles, glowing
tubes, and a spiderweb of lines.

**The cue plugs straight into the sheet. Nothing sits between them.**

## 13. Deliver these two files

**`social/blotter-film-web-hero.html`** — the film.

**`social/FILM-WEB-HERO.md`** — its specification, written the way `FILM-C.md`
is written: what each beat does and why, the measured timings, the values you
chose for line weight and node size with the reasoning, which sweep direction
you made the default and why, any place where `hero-visual.tsx` disagreed with
this brief, and anything you would flag before it goes public.

**Write the reasoning, not just the outcome.** Several decisions in this project
survive only because somebody wrote down *why*, and three times in one session
that written reasoning turned out to be wrong and was caught precisely because
it had been written down.

## 14. Verify before you report finished

- [ ] The held final frame equals `HERO_ROWS` in `sheet-data.ts` **exactly** —
      all five contacts, all eight cells each. This frame becomes the page's
      static hero, so a single wrong cell ships as a wrong page.
- [ ] `Name`, `Title` and `Firm` are pixel-identical in every frame of the film.
- [ ] The sweep never crosses x 415, in either direction, on any beat.
- [ ] No row carries any residual mark after its sweep has passed.
- [ ] Marcus Lee and Alex Morgan are pixel-identical in every frame.
- [ ] Daniel's `Last contact` reads `1/11/26` in every frame, including while
      `Days` changes beside it.
- [ ] Exactly one cue card is on screen at any moment, always in the same slot.
- [ ] Every connector is one vertical drop and one horizontal run. No curves.
- [ ] The film holds. It does not loop and it does not wipe back.
- [ ] `?t=` renders correctly and stably at 12 different timestamps.
- [ ] `?sweep=in` and `?sweep=out` are both complete.
- [ ] At the rendered width of 1124px, every cell value is legible and the
      connector reads clearly without dominating.
- [ ] Fonts are inlined and the file makes no external request.
- [ ] **You created exactly two files and modified none.** Confirm with
      `git status --porcelain` and paste the output. It must show only your two
      files as untracked, alongside whatever the other chat is holding — and
      nothing of theirs may show as modified by you.
