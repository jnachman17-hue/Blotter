# Web reconciliation — the brief

Date opened: August 11, 2026, end of session 7
Status: **Nothing started. This is the plan, not a record of work.**

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

## 5. Wave 1 — the sweep

Every row is already decided and reasoned. Detail lives in
`08-desktop-changes-pending.md`, which has seventeen numbered entries; these are
the ones that are desktop's to do.

| From | What desktop owes | Note |
|---|---|---|
| `06` | **A browser window between 481 and 1179px shows a 480px phone column floating in it.** Measured live at 1100: five numerals, page box 480, Section 3 hidden | **Do this first.** It is the only row here a real visitor can hit today, and Jon hit it himself on a laptop. The breakpoint being width-based is right; the 480 cap below it is what is wrong at laptop widths |
| `08` §13 | **The header CTA does not persist.** It is `position: sticky` inside the hero's 910px wrapper, so it leaves with the hero — on both surfaces. Ratified as persistent in `PLAN-AMENDMENTS`; never was | **Start here.** It is a defect, not a preference, and the one-line fix is moving `<SiteHeader />` out of the `field-open` wrapper |
| `08` §5 | Section numerals `01`–`05` | Four build specs forbid an eyebrow and a numeral above a headline reads as one. Four overrides, or leave the two surfaces disagreeing |
| `08` §16 | Section 2's supporting paragraph is 22px, the largest body text on the page | Jon raised this about both surfaces. Mobile is 17px |
| new | Hairlines at section boundaries | Mobile got them in the spacing pass; they are what let the padding come down |
| `08` §6 | The 32px rule before the authority line | Never discussed for desktop. Ask before assuming the mobile judgement transfers |
| `08` §9 | Two unratified strings live on mobile | Must reach Jon before public traffic either way |

**Already applied to desktop, do not redo:** `08` §1 (the Sheets scope note),
§7 (the methodology footnote), §11 (three latent bugs), §15 (both social links),
and the phantom `Here` links, which the Phase 6 sweep fixed on both surfaces
with zero visual delta.

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
