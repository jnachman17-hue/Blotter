# Brief — the live-test fixes

Date: September 2, 2026
Model: **Opus.**
Status: **Every change here is ruled. There are no decisions in this brief** — if
you find one, stop and ask rather than choosing.

**Context in one line:** Blotter was installed on a fresh Google account and
driven through its whole behaviour by hand this afternoon. **The engine's
judgment was never wrong once** — every prediction the conductor committed to in
advance matched exactly. **Four defects were found, and not one was findable
from a fixture.** They all live in the gap between a person and the sheet.

---

## 0. Boundaries

- **Never modify an existing file under `web/` outside `web/app/api/engine/`.**
  Live public site, real traffic.
- **You own** `web/app/api/engine/`, `courier/`, `05-CONTRACT.md`, and your notes
  file. Nothing else.
- **Read-only on Gmail and Calendar.** No sending, no drafting, no labelling, no
  calendar writes, and **never open an attachment.**
- **Do not edit** `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`. The conductor
  owns those; record rulings in your notes and they get reconciled upward.
- **Explicit paths when staging.** Never `git add -A`.
- Never print or commit a value from `web/.env.local`.

---

## 1. Read these first

1. **`17-INSTALL-OBSERVED.md`** — the whole live test, defect by defect, with
   causes. **§5, §6, §8, §10, §11 are the four fixes.** Read it before the code
2. **`14-DESIGN-DECISIONS.md`, D24 · D25 · D26** — the rulings, in Jon's words
3. `04-ENGINE-RULES.md` — **version 6**, the authority
4. `05-CONTRACT.md` — version 2. Fix 2 changes it
5. Your own `16-PHASE-A-NOTES.md`

---

## 2. Fix 1 — a typed address can silently never match

**`17-INSTALL-OBSERVED.md` §5.** Jon typed `jon@un-claude.com` by hand and the
row read `Not emailed`. He pasted the identical address and it worked.

`ONE_ADDRESS` in `Code.gs` accepts an ASCII hyphen and rejects an **en dash**
(U+2013) or a **non-breaking hyphen** (U+2011) — both of which Google autocorrect
produces. **Capitalisation is fine**; the engine lowercases everywhere.

**Two changes, and the second matters more:**

**(a)** Normalise Unicode dashes to ASCII before matching. Consider the other
characters autocorrect substitutes while you are there — but do not turn the
regex into a swamp.

**(b) Warn when a row has a Name but no parseable email address.** This is the
general defence and it is worth more than the specific one: **there will always
be a character nobody anticipated.** The failure today is silent and
indistinguishable from a contact the student genuinely has not written to.

The warning must reach the student — the run dialog, `Last run warnings`, or
both. **Name the row and the offending cell content** so they can see what is
wrong rather than being told something is.

---

## 3. Fix 2 — `Days` and `Attempts` show a number only where it means something

**D24, and it is the one fix that crosses all three components.**

Jon found it on seeing `Call scheduled` count **down** to a call while every
other state counted **up** from an email. One column, two directions, nothing on
the sheet to say which — and redundant, since `Next call` already carries the
date.

**The table is exact:**

| Status | Days | Attempts |
|---|---|---|
| `Sent` | since you wrote | **the count** |
| `Replied` | since they wrote | **—** |
| `Call done` | since the call — **the thank-you clock** | **—** |
| `Call scheduled` | **—** | **—** |
| `Call cancelled` | **—** | **—** |
| `Bounced` | **—** | **—** |
| `Closed` | **—** | **—** |
| `Not emailed` | **—** | **—** |

**`Attempts` shows a number in `Sent` and nowhere else.** `Replied` always has
zero by definition, and printing that zero is noise dressed as data. Jon on
`Bounced`: *"If that address is bounced it's bounced, additional attempts are
worthless."*

**Where the work goes.** The **engine** decides meaning and returns `null`; the
**courier** renders `null` as a dash, which it already does for `days`. Do not
put the decision in the courier — that is a judgment, and the courier stays
dumb.

⚠ **This changes `05-CONTRACT.md`.** `attempts` is currently documented as "`0`
where nothing has been sent" and must become nullable. **Decide whether that
warrants a version bump and say why.** If it does, the deploy-server-before-
paste order applies again and Jon must be told **in those words** — he has done
it once and it worked.

---

## 4. Fix 3 — an approved contact landed at row 996

**§10.** Jon approved someone in `Found`. The row said `Added`. Nothing appeared
in Contacts. **It had been appended at row 996.**

**Cause:** `setupSheet` paints checkbox validation down the whole `Closed`
column, an unchecked checkbox stores `FALSE`, `FALSE` counts as content,
`getLastRow()` returns ~995, and `appendRow` lands after it.

**Jon's ruling, D25:** *"we need to get rid of the blank checkboxes and have them
autopopulate when you add content to a new row."* **That removes the cause, not
the symptom** — and fixes the clutter of a thousand empty checkboxes on an
otherwise blank sheet.

**Build both protections:**

**(a)** Checkboxes appear only on rows that have a Name or an Email. Implementation
is yours — during the write phase, or on edit — but **say which and why.**

**(b)** `addApprovedContacts_` appends after **the last row carrying a Name or an
Email**, never trusting `getLastRow()`.

Either alone would fix today's bug. **Both, because the class of fault will
recur** the moment anything else paints a column.

---

## 5. Fix 4 — the sheet claims `Added` when nothing was added

**§11.** The mark is set outside the `if` that guards the append:

```js
if (!sheetState.emailsInSheet[a.email.toLowerCase()]) { ... appendRow ...; added++; }
foundState.sheet.getRange(a.rowNumber, foundState.cols.add).setValue('Added');
```

**A sheet that reports an action it did not take is worse than one that fails
loudly.** The mark must reflect what actually happened, and a skip must say so
— including in the run dialog's count.

---

## 6. The fixtures

**Fix 2 changes expected values**, and it is the only one that does.

**You may change an expected value only where D24 authorises it.** Record every
one with the ruling. **Anything else red is a finding** — say whether your code,
the fixture, or the rules document is wrong. **Do not edit a fixture to go
green.** That discipline caught two real bugs and does not lapse because it has
become inconvenient.

**Bar: every fixture and every self-test green**, plus `node courier/helpers.test.js`.

---

## 7. Jon's side

**Jon is not technical and does every step by hand.** End with **one ordered
list**: deploy if there is a version bump, re-paste `Code.gs`, re-run
`Step 1: Set up this sheet` if any setting or validation changed — and say
**exactly what he should see afterwards to know each fix worked.**

His live sheet still has the row-996 contact in it. **Tell him what to do about
it** rather than leaving him to guess.

**Do not wait for the overnight timer results.** Automatic updates are running
on his sheet and the numbers arrive tomorrow; they are unrelated to these fixes.

---

## 8. What you must NOT do

- **Do not build the setup scan or the setup diff** (O1). Still open, not here
- **Do not do the UI work.** Formatting, colour, the instructions tab and the raw
  ISO `Next call` are all Phase B part 2 and are logged in §7 of
  `17-INSTALL-OBSERVED.md`. **`Next call`'s format is tempting and is not
  yours** — it belongs with the design pass
- **Do not build D2's 10-recipient cap** unless it is already built; check first
- **Do not add a day threshold anywhere**, for any purpose
- Do not touch the live site

## 9. Write

- The code
- `blotter-ib-ws1/docs/workstreams/ws9-build/19-FIX-NOTES.md` — what changed,
  every expected value altered with its authorising ruling, anything ambiguous,
  and anything the next chat must not trip over

## 10. Report

Plain English. Lead with **whether everything is green**, then Jon's ordered
list, then anything needing his decision.
