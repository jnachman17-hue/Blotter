# Film A re-cut brief

Date: August 12, 2026
Status: **Brief written. Re-cut not yet run.**

This is the prompt for a separate chat, running in parallel with the main web
chat. It is kept here rather than only pasted into that chat so the scope and
its boundaries survive.

Two changes: **the five contact names**, and **the status-change treatment**.

**Everything below the line is the prompt. Copy it whole.**

---

You are re-cutting one shipped film asset. Another chat is working in this
repository at the same time, so your file boundaries are strict and are stated
in §1. Read all of §1 before you touch anything.

## 1. Your boundaries — not negotiable

**You own exactly one file:**

```
social/blotter-film-a-4x5.html
```

You may **read** anything in the repository. You may **write** only that file.

**You may not, under any circumstance:**

- create, edit, move or delete any other file, including
  `web/public/film/blotter-film-a-4x5.html`. That is a hand-kept copy of your
  file and **the other chat will copy yours across when you are done.** If you
  write it, you will collide with work in progress
- run `git add`, `git commit`, `git push`, `git stash`, `git checkout`,
  `git restore`, or any other command that writes to git state
- run `pnpm install`, `pnpm build`, `pnpm dev`, or start any server. The other
  chat is using the ports
- touch `social/blotter-film-c-4x5.html`, `social/blotter-film-web-hero.html`,
  or `social/blotter-film-b-4x5.html`. You will **read** the first two closely;
  you will not change them

Scratch files go to your own temp directory, never inside the repository.

Report in chat. Do not write a report file.

## 2. What Blotter is, and what this film is for

Blotter is a **demand test**, not a shipped product. `blotterib.com` is a
landing page that argues a proposition and a funnel that measures whether people
want it. Nothing connects to Google; there is no product behind it.

The proposition: a student keeps a recruiting tracker in Google Sheets, and it
goes stale because maintaining it is manual. Blotter watches Gmail and Calendar
and maintains the moving columns — `Status`, `Next move`, `Last contact`,
`Days`, `Call` — while the student keeps the columns that are theirs: `Name`,
`Title`, `Firm`.

**That ownership split is the entire product claim.** Every visual asset draws
it as two zones, and **no Blotter-coloured mark may ever cross into the manual
zone.** This is the single most important rule in this brief.

**Film A** is a 21.5-second 4:5 film. It plays inside the funnel, on the step
after the two profile questions and before email capture, on both desktop and
phone. Roughly: a torrent of inbox volume, then the tracker being built by hand,
then Blotter taking over the maintained columns.

It is served from `web/public/film/blotter-film-a-4x5.html` inside an iframe
with `?bare=1`, which strips the preview chrome.

## 3. Read these first, in this order

1. **`social/blotter-film-a-4x5.html`** — the file you are changing. Read it
   whole before editing. It is long and heavily commented; the comments record
   decisions and are usually right.
2. **`social/blotter-film-web-hero.html`** — **the reference implementation for
   the treatment you are porting.** Its sweep is the thing you are copying.
3. **`social/blotter-film-c-4x5.html`** — where that sweep originated. Film A
   must end up agreeing with these two, not with its own current behaviour.
4. `blotter-ib-ws1/docs/04-decision-log.md`, session 9 entries — the reasoning
   for both changes.

Do not begin editing before you have read the sweep in the web hero and can
describe how it works.

## 4. Change one: the five names

The contacts were renamed on August 12, 2026 by the project owner. They are
**near-miss parodies of finance figures** — deliberately not the real names,
because using a real identifiable person's name in commercial material raises a
right-of-publicity question that a near-miss does not. Do not "correct" them to
the real spellings. `Bowel` and `Sync` are intentional.

`ROWS` is at about line 779. Replace exactly:

| Was | Now | Firm was | Firm now |
|---|---|---|---|
| Sarah Chen | **Jamie Diamond** | JPMorgan | JPMorgan |
| Marcus Lee | **David Salmon** | Evercore | **Goldman Sachs** |
| Priya Shah | **Ken Molise** | Lazard | **Moelis & Co** |
| Daniel Kim | **Larry Sync** | Morgan Stanley | **BlackRock** |
| Alex Morgan | **Jerome Bowel** | Centerview | **Carlyle** |

Also in this file:

- `next:"Reply to Sarah"` on row 1 becomes `next:"Reply to Jamie"`.
- The comment above row 5 names Alex Morgan and describes **the em dash in that
  row's `Next move`**. That dash is one of only two permitted anywhere in this
  project's visible copy, ruled by the owner on August 5, 2026. **Keep the
  dash.** Update the comment to say Jerome Bowel.
- `const DANIEL = 3` is a row index whose name is now wrong. Rename the constant
  to match row 4's new occupant. Check every use.
- Anywhere the old names appear in **torrent text, sender lists or cue chips**,
  swap them on the same mapping. If a name appears there that is *not* one of
  the five, leave it alone — those are extras and stay as they are.
- **Comments that record a dated decision keep the name in force at the time.**
  If a comment says "swapped from Alex Morgan on August 5, 2026", that is a
  historical record and rewriting it falsifies the log. Add a note rather than
  editing the fact.

### The one thing that can silently break

**The new names are longer than the old ones.** The widest was 11 characters;
the widest now is 13. In the web application this exact change caused the Name
cell to wrap and a row to grow from 37px to 55px, and nothing failed loudly —
it was found by measuring.

`COLS` in this film gives `name` a width of **180** and `firm` **216**. Verify
at the film's own scale that no name and no firm wraps or clips.

**If Name needs more room, take it from Firm and keep the pair summing to
zero.** `SPLIT` is derived from `COLS`, so changing one width alone moves the
ownership boundary — the one line this film exists to draw. Say in your report
whether you had to do this.

## 5. Change two: the status-change treatment

### What Film A does now

`P.reveal` is `[10.20, 10.80]` (around line 1027). In `render()` at about line
1209, **every maintained cell in all five rows fades from white to
`--blotter-100` simultaneously**, driven by one shared progress value:

```js
const rv = seg(t, P.reveal);
keptCells.forEach(n => {
  n.style.backgroundColor = rv > 0.02
    ? `color-mix(in srgb, var(--blotter-100) ${rv*100}%, var(--manual-row))`
    : "";
```

One 0.6-second zone-wide fade. No row is individually identified.

### What it must do instead

**The sweep from `blotter-film-web-hero.html`, run once per row, top to bottom.**

The other two films mark a change by running a **sweep bar** along the row that
changed: a band at `--blotter-500` as a 17% tint, with a brighter
`--blotter-700` leading edge, inside a `.sweepwrap` with `overflow:hidden`,
travelling across the maintained block only. Read `.sweepwrap` and `.sweep` in
the web hero (around line 498) and the `SWEEP_L` derivation in Film C (around
line 552).

Requirements, and the first two are absolute:

1. **The sweep never crosses the ownership split.** It spans the maintained
   block only — from the split to the sheet's right edge. Derive `left` and
   `width` from the measured column geometry in the script, exactly as the web
   hero does, so a later width change cannot push it into `Name` or `Firm`.
   Film A's split is `COLS.findIndex(c => c.kept)`, which is index 2.
2. **The sweep leaves nothing behind.** Once it has passed, the row carries no
   badge, outline or residue — only the settled fill.
3. **Direction matches the web hero's default**, `sweep=in`.
4. **Five sweeps, sequential, top to bottom, about 120ms apart.** This is the
   part to get right and it is where an easy mistake lives: running all five
   simultaneously is the existing zone fade with a gradient on it, which is not
   the treatment. Sequential is what makes it the same idiom as the other two
   films — a moment landing on a row you can identify. Extend the window to
   roughly `[10.20, 11.10]` to fit the stagger. **Do not let it run past the
   next beat**; check what follows `P.reveal` and keep the sequence clear of it.

### What does not change

**The settled state is already identical across all four films** and must stay
that way:

```
.hrow .kept{background:var(--blotter-100)}
```

`--blotter-100` is `#f7f2e8` in Film A, Film B, Film C and the web hero. So the
final appearance of the sheet — and every still frame after the animation
completes — is **unchanged by this work.** You are replacing the 0.6 seconds of
transition into that state, and nothing else. If your re-cut changes what the
sheet looks like once it has settled, you have gone too far.

## 6. What you may not change

- **Total runtime stays 21.5 seconds.** It is `DUR`, it is quoted in project
  documents, and the funnel step is built around it
- Every other beat: the torrent, the counts, the manual typing sequence, the
  Gmail and Calendar surfaces, the cream header band, the selection box
- The `+N more` treatment in the outstanding-actions section. It was questioned
  and **explicitly ratified by the owner on August 12, 2026** — *"+N more is
  fine. We literally have this on mobile."* Leave it exactly as it is
- The four `@font-face` blocks. Film A genuinely draws all four — it has a
  wordmark and a Gmail surface. A sibling film was cut from 290KB to 113KB by
  removing two faces; **that fix does not apply here** and removing them will
  break this film
- `?bare=1` handling and `?t=` deterministic frame rendering. Both are used by
  the application
- Any copy, any timing other than the reveal window, any colour token

## 7. Verify before you report

The project's standard, and it has caught real defects:

- **Render `?t=` at frames across the new sequence** and confirm the sweep is on
  the row you intend, one row at a time, and never left of the split
- Confirm the settled frame is **pixel-identical to the current film's settled
  frame**. This is the strongest check available and it is cheap: the end state
  is not supposed to move
- Confirm no name or firm wraps or clips, at the film's own scale
- Confirm the film still runs to exactly 21.5s and that nothing after the reveal
  has been pushed or clipped
- Confirm `?bare=1` still strips the chrome and `?t=` still renders one frame

A known trap in this codebase: **`fit()` returns a negative scale in a zero-size
viewport**, which renders a film mirrored and upside-down. Film A carries the
same latent expression as its siblings. Do not fix it unless you are asked —
just do not trip it while testing.

## 8. How to report

In chat, not a file.

1. **What you changed**, by section, with line references.
2. **Whether you had to widen `Name`**, and what you took it from.
3. **Your verification output** — the frames you rendered and what you saw.
   Distinguish "I reasoned this" from "I rendered it and looked."
4. **Anything in this brief that turned out to be wrong.** Two previous briefs
   in this project contained a factual error each, and both were caught only
   because the chat said so plainly.
5. `git status --porcelain`, to show that only
   `social/blotter-film-a-4x5.html` is modified.
