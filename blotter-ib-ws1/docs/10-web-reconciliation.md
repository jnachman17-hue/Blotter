# Web reconciliation — the brief

Date opened: August 11, 2026, end of session 7
Status: **Waves 1 and 2 complete and live. Wave 3 is partly done.**

| Wave | State |
|---|---|
| 1 · the sweep | **Complete.** Every row applied; `08` is closed |
| 2 · the argument | **Complete.** Section 3 cut, 4+5 split, numbering on both surfaces, refusals relocated; `09` is closed |
| 3 · the assets | **Partly done.** The desktop hero film is built, installed and looping. The funnel film is unresolved and is now the most urgent open question, because two films appear on desktop for the first time |

Everything shipped to `blotterib.com` on August 11, 2026. The three-wave
framework below held: nothing in wave 2 invalidated wave 1, and the hero film
in wave 3 turned out to *decide* a wave 2 question rather than depend on one,
which is the single thing the ordering did not predict.

Stage 10 is finished and shipped. `blotterib.com` now serves a real mobile page
below 1180px and the ratified desktop page above it. **Those two pages do not
yet make the same argument**, and closing that gap is what this file is for.

---

## 1. Why this exists, in Jon's words

> *"Throughout this entire mobile build we've changed a number of minor details
> just for prettiness that I'd like to move over to web as well… but then
> there's also some big-picture reconciliation. We noticed that on web, three
> sections basically say the same thing and didn't have visual assets that match
> that. So we need to address that on web. This is going to be real content
> changes."*

The mobile build was never only a mobile build. It was the first time anyone
read the page one screen at a time, and doing that surfaced faults that were
always there and invisible at 1440px.

---

## 2. The one rule that governs everything here

From `09-page-argument-rework.md`, and it has not moved:

> **Layout may diverge between devices. The argument may not.**

A difference in how a claim is presented is a responsive treatment. A difference
in **which claims are made, or in what order** is a content fork, and it is the
worst kind of debt this project can take on, because nothing in the build
surfaces it — the two pages simply drift.

Everything in the inventory below is graded against that one line.

---

## 3. Do this before writing any code

**Record a new desktop baseline.**

Every change in stage 10 was verified against a fixed measurement: desktop
document height 7,200px, and six per-section heights. "All zeros" was the pass
condition, and it caught real regressions three times.

Web reconciliation **deliberately abandons that baseline** — the whole point is
that desktop changes. So the first act of the web work is to record a fresh one:

```
document height, and each section's height, at 1440
```

Then keep the same discipline in the other direction: after each wave, the delta
should be **exactly the change that was intended and nothing else**. Without a
new baseline there is no way to tell an intended change from a regression, and
the safety net that has held all session disappears silently.

`CURRENT-HANDOFF.md` §6 has the other verifications that have earned their
place. They all still apply.

### The live baseline — RECORDED August 12, 2026. **Use this one.**

Taken from **`https://blotterib.com` itself**, reloaded at each width with
`document.fonts.ready` awaited, after session 9 merged. This supersedes the
wave-1 baseline below for every purpose.

**Desktop, 1440**

| Section | Band | Height | Top |
|---|---|---|---|
| 01 Hero | `section.pb-14` | 658.3 | 60 |
| 02 Scale and consequence | `field-deep` | 1016.2 | 718.3 |
| 03 Ownership | `field-rise` | 918.3 | 1734.5 |
| 04 Outstanding | `field-settle` | 1120.9 | 2652.8 |
| 05 Data and privacy | `field-document` | 1471.9 | 3773.7 |
| FAQ and close | `field-close` | 761.0 | 5245.6 |

**Document 6,277px.** Header `sticky`, 60px. `body` padding-top `0`. No
horizontal scroll.

**Phone, 390**

| Section | Band | Height |
|---|---|---|
| 01 Hero | `section.pb-14` | 849.8 |
| 02 | `field-deep` | 1064.9 |
| 03 | `field-rise` | 1041.4 |
| 04 | `field-settle` | 965.9 |
| 05 | `field-document` | 1881.0 |
| FAQ and close | `field-close` | 860.5 |

**Document 7,144px.** No horizontal scroll.

#### Why this had to be re-recorded, and what it cost

**The wave-1 baseline below went stale the same day it was written and nobody
noticed for a session and a half.** After it was taken, session 8 cut Section 3,
cut Section 2's consequence visual, brought the FAQ onto the page axis and
rebuilt the hero — roughly 900px of intended change, none of it re-recorded.

So through the whole of session 9 the safety net was **not armed**. The
practice is that every delta must decompose into an intended change with
nothing left over; against a reference 900px adrift, no delta decomposes and a
40px regression would have been invisible.

One real defect was caught anyway — `Jamie Diamond` wrapping a row from 37.3px
to 55.2px, worth −18px — but only because that measurement happened to be taken
immediately before and after within one sitting. **That is luck, not method.**

**Re-record this table after any structural change**, not at the end of a
session. A baseline is only worth what its currency is.

### The wave-1 baseline — RECORDED August 11, 2026. **Superseded, kept for provenance.**

Taken from a **production build** (`pnpm --dir web build` then `start`), not the
dev server, because `globals.css` is the file wave 1 edits most and the dev
server serves broken CSS silently after a syntax error.

| Section | Class | Height | Top |
|---|---|---|---|
| 1 Hero | `main#top` / `section.pb-14` | 762.5 | 60 |
| 2 Scale and consequence | `field-deep` | 1353.8 | 822.5 |
| 3 How Blotter works | `field-rise` | 976.8 | 2176.3 |
| 4+5 Tracker and actions | `field-settle` | 1850.6 | 3153.1 |
| 6 Data and privacy | `field-document` | 1333.6 | 5003.7 |
| 7 FAQ and close | `field-close` | 592 | 6337.3 |

**Document height 7,200px.** Header `position: sticky`, 60px, document top 0.
`body` padding-top `0px`. `Mobile02` measures 0 and is correctly absent.

**Measured at both 1440 and 1200 and the two are byte-identical.** The page box
is fixed above the breakpoint, so a single baseline covers the whole desktop
range and there is no need to hold a second one. That was worth checking rather
than assuming: wave 1 touches the header and the 481–1179 band, and a regression
that only appeared near the breakpoint would be invisible at 1440.

---

## 4. The framework: three waves, ordered by risk

The temptation is to group by topic — all the typography, then all the layout.
**Do not.** Group by how badly a later decision can invalidate the work.

| | Wave | What it is | Why it is in this position |
|---|---|---|---|
| 1 | **The sweep** | Settled presentation that desktop simply lacks | Nothing in waves 2 or 3 can invalidate it, and it makes the two surfaces visually comparable so later argument work is not confounded by cosmetic noise |
| 2 | **The argument** | Which claims the page makes, and in what order | It changes **what sections exist**. Doing it after wave 3 means building assets for sections that then get merged away |
| 3 | **The assets** | New and re-cut visual work | Slowest, needs asset production, and every piece of it depends on a wave 2 answer |

**The sequencing insight, stated plainly:** wave 2 changes *what sections
exist*; wave 3 changes *what is inside them*. Any other order wastes work.

Wave 1 can be one sitting. Wave 2 needs Jon in the loop continuously and will
take several. Wave 3 depends on decisions that are still parked.

---

## 5. Wave 1 — the sweep. **BUILT August 11, 2026.**

Detail lives in `08-desktop-changes-pending.md`. Status as of the end of the
wave-1 sitting:

| From | What desktop owed | Status |
|---|---|---|
| `08` §13 | **The header CTA does not persist.** `position: sticky` inside the hero's wrapper, so it leaves with the hero — on both surfaces. Ratified as persistent in `PLAN-AMENDMENTS`; never was | **APPLIED.** Not the one-line move the entry promised — see `08` §13 for the two consequences it did not anticipate |
| `08` §12 | Two of five `Blotter`-tab rows are 50% too tall, on both surfaces | **APPLIED.** **This row was missing from the original table** and would have been skipped. Had to be fixed twice: `sheet-phone.tsx` keeps a second copy of the column widths |
| new | Hairlines at section boundaries | **APPLIED.** Desktop needed its own anchor — the phone draws them from `.section-number::before` and desktop has no numeral until wave 2 |
| `08` §16 | Section 2's supporting paragraph is 22px, the largest body text on the page | **APPLIED and RATIFIED** by Jon, August 11, 2026 |
| `08` §6 | The 32px rule before the authority line | **APPLIED and RATIFIED.** Jon: keep the phone as is, shorten the web dash to match. Both surfaces now carry one 12px rule and differ only in alignment. The entry's argument for keeping 32px on desktop — that a 490px column gives a long rule an origin — was a reason it *could* work, not a reason it should |
| `06` | A window between 481 and 1179px shows a 480px column centred in it | **PARTLY APPLIED.** The header was not obeying the cap and that was the visible half of it. The column-width question itself is still Jon's — see below |
| `08` §5 | Section numerals `01`–`05` | **MOVED TO WAVE 2** by Jon, August 11, 2026. Desktop's `01`–`05` would name different content than the phone's until wave 2 rules on which sections exist |
| `08` §9 | Two unratified strings live on mobile | **OPEN — needs Jon.** Neither has a desktop action pending. `SUPPORTING_SHORT` never renders above the breakpoint, and `What each connection can and cannot do.` replaced per-row counts that desktop's three-column layout still shows correctly. These are ratify-or-replace decisions about the phone |

**Two rows in the original table were not "already decided and reasoned"** as
this section claimed: `08` §16 and `08` §6 both say in their own entries that
the desktop half is Jon's call. Both were put to him during the wave-1 sitting
and both are now ratified — §16 as built, §6 against the reasoning the entry
had recorded.

**Already applied to desktop, do not redo:** `08` §1 (the Sheets scope note),
§7 (the methodology footnote), §11 (three latent bugs), §15 (both social links),
and the phantom `Here` links, which the Phase 6 sweep fixed on both surfaces
with zero visual delta.

### The wave-1 delta, against the baseline in §3

Production build, 1440, clean reload with fonts settled.

| Section | Delta | Composed of |
|---|---|---|
| 1 Hero | **+0** | untouched, which is the proof that the `field-open` margin is exact |
| 2 Scale | **−23.6** | +25 hairline, −48.6 from 22px to 17px |
| 3 How it works | **+25** | hairline |
| 4+5 Tracker | **−10.9** | +25 hairline, −35.9 from the `Call` column fix |
| 6 Privacy | **+25** | hairline |
| 7 FAQ | **+25** | hairline |

**Document 7,200 to 7,240, +40.** Every delta decomposes into intended changes
and nothing is unaccounted for.

Also run: production build clean; lint at the one known pre-existing
`analytics.ts` warning; **no horizontal scroll at 320, 390 and 430 with every
script stripped**, served from the production build; the dash scan at one
visible dash against a budget of two.

### A measurement trap worth naming

The first attempt at the delta table read `hero +72.5, tracker +83.7,
doc +219` — a confidently wrong set of numbers produced by **resizing the
viewport rather than reloading at the target width.** `Fit` measures with
`useLayoutEffect` and a `ResizeObserver`, and the Browser pane is a hidden
document where the observer may not deliver. `CURRENT-HANDOFF.md` §5 says
"reload rather than resize" and this is what it costs to ignore it: the hero,
which cannot change, appeared to have grown 72px.

**Always reload at the target width, and await `document.fonts.ready`.**

---

## 6. Wave 2 — the argument

`09-page-argument-rework.md` is the whole diagnosis. **Read it before touching
Sections 3, 4 or 5.** §8 is the ledger, ten rows, each marked with whether it
transfers.

The three that actually change what the desktop page says:

**a. The same claim, four times.** Section 3's headline, its boundary line and
its closing line are three statements of one idea, plus a fourth inside the
merged section's supporting paragraph. `03-SECTION-3` line 341 shows the
duplication was seen at ratification and mitigated with whitespace. Desktop has
the whitespace, so it is less obvious there — and it is still four statements of
one claim. **Transfers.**

**b. The words and the pictures are crossed over.** Section 3 argues ownership
and demonstrates mechanism; Section 4+5 argues preservation and demonstrates
ownership. Each section's best evidence sits under the wrong headline. This is
the fault Jon actually noticed and it is entirely desktop's. **Transfers.**

**c. The headline arrangement.** Mobile ratified `09` §4 option C: both ratified
headlines, the second demoted to a deck, and the paragraph's duplicate first
sentence cut. **This must land on desktop or the two pages make different
claims.** It is the single highest-value row in the ledger.

**What does not transfer, and the ledger says so for each:** cutting the Friday
timeline, the compressed stage-label line, and merging 02 and 03. All three
exist because a phone has no room. Desktop has room and no hero film. **Do not
delete Section 3 from desktop on the mobile reasoning.**

---

## 7. Wave 3 — the assets, and what is parked

None of these is decided. Each has a row in
`06-assumptions-and-open-questions.md` with a revisit trigger, and all three
triggers now read *web reconciliation*.

**The desktop hero as a film.** Jon reopened this on August 11: *"we might bring
back into the conversation making web section one hero asset a video instead of
static."* The ratified desktop hero is the sheet-and-cues composition. Film C is
built, is the mobile hero, and is 1:1.

**Which film belongs in the funnel.** Film A has been there since session 5. Jon
found it hard to see on a phone even after it was fixed and full-bled. Film C is
built for a phone; Film B answers different questions and runs 28s.

**These two are one question, not two.** `06` says so. Three slots — desktop
hero, mobile hero, funnel — and three built films. Answer them together or the
same asset ends up in two places arguing with itself.

**The Outstanding view is drawn three different ways.** Film A cuts to one row
plus `+N more`; desktop shows all 21 as three columns; mobile shows all 21 with
the tail behind a disclosure. Nobody chose that — each surface solved its own
space problem. `09` §8 row 8b. **The film is the one out of step**: it is the
only surface that tells a viewer there are actions they cannot see, which is the
claim `04-SECTION-4` §7 exists to deny.

---

## 8. Things that will bite the web chat

**`web/public/film/` is a hand-kept copy of `social/`.** Nothing propagates. A
fix in one is not a fix in the other, and on August 11 the copy was right while
its source was wrong for five days.

**Two film iframes now exist on the page** — the hero's and the funnel's. Any
measurement has to say which; a query for "the first iframe with film in its
src" silently returns the hero, which is `display: none` above the breakpoint
and correctly measures 0x0.

**The dev server serves broken CSS after a syntax error and the page stops
hydrating.** Clicks do nothing, no error names the cause, and the production
build passes. Restart before debugging anything else. It cost twenty minutes
twice in one session.

**`Fit` is scaffolding and three desktop compositions still depend on it.** Read
its doc comment before touching any of them.

**The background is a handoff chain.** Each band starts on the colour the band
above ended on. Hiding or reordering a section breaks it two sections later and
shows up as a hard line. If wave 2 removes or merges a desktop section, walk the
chain afterwards.

**Never `git stash` while a parallel chat holds uncommitted work.**

---

## 9. Parallel chats, and the rule has inverted

During stage 10 a web chat could not run, because every file it would touch was
one the mobile build was editing.

**That is now reversed and mostly moot.** Mobile is shipped; nothing needs a
mobile chat. What can run alongside web:

- **A film chat**, owning `social/` only. This is the precedent that worked
  three times. It must never run `git add`, `commit` or `push`, and never start
  a dev server.
- **A documentation chat**, owning `blotter-ib-ws1/docs/` only.

What cannot: anything else touching `web/`. Wave 2 rewrites shared section
components and the collision would be total.
