# What a student can do to their sheet without breaking it

Date: September 3, 2026
Brief: `25-BRIEF-SHEET-RESILIENCE.md`
Status: **Reasoned from the code, five fixes made, four cases still need a live
sheet.** Marked ⚠ where that is so.

| Check | Result |
|---|---|
| `node courier/helpers.test.js` | **297 of 297** (was 264) |
| `run-fixtures.ts` · `selftest.ts` · telemetry | 40 · 133 · 30, all pass |
| `node --check` on `Code.gs` | Clean |

**The headline: almost everything a student would actually do is safe, and the
two things that were not have been made loud.** Both were silent — a wrong
answer on the wrong person's line, and work destroyed without a word — which is
exactly the failure mode this brief exists to hunt.

---

## 1. The table

**Cope** = works, nothing said. **Loud** = the run stops and names what to fix.
**Warn** = the run completes and says what it did.

### Yours to change — all confirmed safe

| What | Result | Why |
|---|---|---|
| Add a column anywhere | **Cope** | `findColumn_` locates every column by its heading, never by position |
| Reorder columns | **Cope** | Same |
| Colour their own cells | **Cope** | Blotter's conditional rules target its own columns only, and `applyStatusColours_` filters by target before replacing |
| Bold a name, restyle their own cells | **Cope**, with one caveat below | Nothing in a run touches their formatting |
| Add rows | **Cope** | Read runs to `getLastRow()` |
| Delete rows | **Cope** | Same |
| A formula in **their own** column | **Cope** | Blotter writes only the six columns it owns |
| Rename the file | **Cope** | The script is bound to the spreadsheet, not its name |
| Add a tab of their own | **Cope** | Tabs are looked up by name; unknown tabs are never touched |
| Resize columns, freeze more rows | **Cope during runs**, reset by Step 1 | See §3.1 |
| Sort by hand, between runs | **Cope** | Row numbers are re-read every run |
| **Blank row in the middle** | **Cope** | §2.1 — this one was worth checking properly |

### Expected to break

| What | Result | Message |
|---|---|---|
| Rename a Blotter column | **Loud** | Names the column, says run Step 1 |
| Delete a Blotter column | **Loud** | Same |
| Delete `Closed` | **Loud** | Same |
| Delete the header row | **Loud** | Headers gone, missing-column check fires |
| Delete the **banner** row | **Cope** | `headerRow_` re-detects; headers land on row 1, which is the pre-banner layout |
| Rename or delete `Contacts` / `Found` / `Settings` | **Loud** | Names the tab, says run Step 1 |
| **A formula in a Blotter column** | **Warn** — was silent | §2.2, **fixed** |
| **A duplicate Blotter heading** | **Loud** — was silent | §2.3, **fixed** |
| **A manual sort mid-run** | **Loud** — was silent | §2.4, **fixed** |
| A stray heading word in the banner | **Cope** — was a silent one-row shift | §2.5, **fixed** |
| Merged cells in the data | ⚠ **Unknown** | §4.1 |

---

## 2. The five that mattered

### 2.1 A blank row in the middle is safe, and it touches the join key

**The brief was right to single this out and the answer is good.** Traced
through all three places:

- `readContacts_` computes `rowNumber = i + first` from the **absolute** index,
  so a gap does not shift anything below it, and blank rows are skipped rather
  than sent
- `writeBlotterColumns_` writes a contiguous block from `minRow` to `maxRow`
  and, for any row in that block that is not a contact, **writes back what was
  already there** — it does not blank the gap
- The row number the server echoes is the real sheet row throughout

**Nothing needed fixing.** Worth recording because it is the kind of thing that
is assumed rather than checked.

### 2.2 A formula in a Blotter column — was silent, now warned

`setValues` replaces a formula with a value and reports nothing. A student who
builds a calculation in `Days` loses it on the next run with no way to tell what
happened.

**Blotter still writes** — the column is its own and the alternative is a
tracker that stops updating because somebody typed in it. **But it now says
so**, naming the row and the column, in the run dialog and in
`Last run warnings`, and pointing at where a formula *can* live.

Costs one `getFormulas()` over the block — a single round trip on a budget with
no room, rather than one per column.

### 2.3 A duplicate Blotter heading — was silent, now loud

**The worst shape the sheet can take.** `findColumn_` returns the leftmost
match, so a student whose own column is called `Status` or `Days` has Blotter
overwrite it every fifteen minutes, silently, forever.

The run now stops and names the heading. **Two columns of their own called
`Notes` is still fine** — only Blotter's own names are checked, because only
those get written to.

### 2.4 A manual sort mid-run — was silent, now loud

**The sharpest of the five.** The menu sort takes the script lock; a hand
dragging rows does not. The row number is the contract's join key, so a sort
landing between the read and the write puts **Jamie's status on Alice's line** —
with nothing wrong-looking about the result.

**Fixed by checking identity again immediately before writing.** The Name and
Email of every row that was sent are re-read and compared; if any row is not the
person it was, **nothing is written at all** and the message names who moved.

Capitalisation and spacing in an address are deliberately not a move —
matching has always ignored both, and a false alarm that stops a run is its own
kind of failure.

**A stopped run costs fifteen minutes. A scrambled sheet costs trust in every
cell**, and there is no way to tell afterwards which cells were wrong.

### 2.5 A stray heading word in the banner — was a silent one-row shift

`headerRow_` took the first row within four containing **any** anchor. A student
typing `Status` on its own into a spare banner cell moved the header row to 1,
and every answer after that landed one row off.

**Now the row with the most anchors wins, and one hit is not enough.** A real
header row carries all three; a stray word carries one. Below two, it falls back
to row 1, which is both the pre-banner layout and the safe answer.

---

## 3. Two behaviours worth knowing, neither a bug

### 3.1 Step 1 restyles, as well as repairs

`Blotter → Step 1` is the repair button and the guide now says so. It is also
where all the formatting lives, so running it **resets column widths, frozen
rows, and the styling of the `Title` and `Email` columns** — italic and muted
grey, which is Blotter's design for them.

**It never touches contact data**, and that is the promise being made. But a
student who has restyled those two columns will see their styling replaced.
Documented in `Start here` as "rebuilds the sheet without touching your
contacts", which is true and is the part that matters.

### 3.2 A closed row's fade covers the student's own colours

`applyClosedRowFade_` fades the whole row when `Closed` is ticked, which is
Jon's ruling. On a row the student has coloured themselves, the fade wins while
it applies. Cosmetic, correct, and only for closed rows.

---

## 4. What still needs a live sheet — four things ⚠

Reasoning stops here honestly.

### 4.1 Merged cells inside the data ⚠

`setValues` over a range containing a merged cell behaves differently from a
plain one, and Apps Script's exact behaviour — write to the top-left, throw, or
partially apply — is not something to guess at. **A student merging two contact
rows is unlikely; merging a heading is not.**

**Test:** merge two cells in the `Days` column, run, and see whether it throws,
writes, or corrupts.

### 4.2 Whether Step 1 is safe on a heavily customised sheet ⚠

Everything above says it is idempotent and additive. **Nobody has run it on a
sheet with twenty student columns, its own tabs, and hand formatting.** It is
the repair route the guide now points at, so it has to survive being used.

### 4.3 The mid-run sort guard, in reality ⚠

The logic is tested against a fake sheet. **What has never happened is a real
person dragging real rows while a real run is out** — the timing window is a
few seconds, and hitting it deliberately is the only way to know the message
reads well when it fires.

**Test:** start a run on a large sheet and sort by hand immediately.

### 4.4 Data validation a student adds themselves ⚠

`syncClosedCheckboxes_` calls `clearDataValidations()` on rows below the last
contact. **A student who puts their own dropdown in a column, on a row Blotter
considers empty, would lose it.** Reasoned but not observed, and the fix if it
is real is to clear only the `Closed` column — which is what it already
targets, so this is probably fine and is listed for completeness.

---

## 5. Written down where a student will see it

**`Start here` gains a `Yours to change / Leave alone` block** — §4 of the
brief — in their words:

> **Yours:** add any columns you like, anywhere. Colour them. Put formulas in
> them. Add rows, delete rows, sort however you want. Rename the file. Add your
> own tabs.
>
> **Leave alone:** the headings Blotter writes, and Name, Email and Closed.
> Do not give one of your own columns a Blotter heading either.
>
> **A formula in one of Blotter's columns will not survive.**
>
> **If anything goes wrong: Blotter → Step 1. It rebuilds the sheet without
> touching your contacts.**

**And two things from `24-PRE-LAUNCH-READINESS.md` §4:**

- **`Settings → Your Blotter ID (quote this if you need help)`.** `installId_()`
  has existed since telemetry and the student has never been able to see it — the
  one thing identifying their sheet was the one thing they could not quote. It
  is written on every run, so sheets built by an older script get it on the next
  pass.
- **`Settings → Help`**, plus a closing block in `Start here`, both carrying the
  help page and `jnachman17@gmail.com`. **In the sheet, not only on the
  website** — somebody whose tracker has stopped is looking at the tracker.

---

## 6. One thing found that was not in the brief

**`missingSetup_` was written for exactly this job and had never been called by
anything.** It exists because Jon once pasted a newer script into an older sheet
and the new setting silently never appeared — which is every student on an
update path.

It now runs on every pass and warns, naming what is missing and saying to run
Step 1. Dead code doing nothing, three lines from being the thing it was
written to be.

---

## 7. What the next chat must not trip over

- **The row-identity check runs before every write.** If a legitimate reason
  ever emerges for a row's name to change under a run, that guard will stop it
  — and stopping is the correct default, so change it deliberately or not at
  all.
- **`headerRow_` needs two anchors, not one.** Lowering that threshold
  reintroduces the silent one-row shift.
- **The duplicate-heading check covers Blotter's names only.** Widening it to
  all headings would break students who legitimately have two columns of their
  own with the same name.
- **`formulasInBlotterColumns_` is one read for the whole block.** Making it
  per-column costs six round trips a run on a budget already at 85%.
- **`Start here` copy is still courier-side**, so every word above costs a
  re-paste until the renderer work lands. That is the argument for it.
