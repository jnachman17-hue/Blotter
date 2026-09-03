# WS9 — state of play

**Last updated: September 3, 2026, by the conductor chat.**

**This file is the single orientation point.** Everything below was verified by
running it, not taken from a chat's report.

---

## The one-paragraph version

**The engine is built, right, and live.** It passes 40 independently-derived
fixtures, 129 self-tests and 87 courier checks, and it is deployed at contract
version 3. **The courier has been installed on a fresh account and driven
through its entire behaviour by hand** — every state, both time-machine jumps,
the referral round trip. **The engine's judgment was never wrong once.** Four
defects were found, all in the gap between a person and the sheet, and all four
are fixed. **What has never been tested is a real student**, and what the sheet
looks like is the next piece of work.

---

## Verified right now

| Check | Result |
|---|---|
| `run-fixtures.ts` | **40 of 40** |
| `selftest.ts` | **129 of 129** |
| `courier/helpers.test.js` | **87 of 87** |
| Live endpoint | **Contract version 3**, deployed |
| Engine rules | **version 7**, current with every ruling |
| Working tree | Clean, nothing unpushed |

## The roadmap

| | | |
|---|---|---|
| 1 | Idea, landing page, market signal | ✅ |
| 2 | **Learn** — read the real 2024 season | ✅ |
| 3 | **Rules** — decide what the engine does | ✅ |
| 4 | **Build** — engine, answer key, courier | ✅ |
| 5 | **Install and drive it by hand** | ✅ **four defects found, all fixed** |
| 6 | **UI — make the sheet usable by a stranger** | ← **next** |
| 7 | **Reconcile the website with the product** | — |
| 8 | **A student who is recruiting now** | — |

---

## What the live test proved, and what it could not

**Covered, all in one afternoon:** `Sent` · `Replied` · attempts and the bump ·
a real bounce from `mailer-daemon` · `Call scheduled` · `Call done` ·
`Call cancelled` · a thank-you clearing `Call done` · a decline followed by an
email flipping to `Replied` · an out-of-office correctly refused · a referral
appearing in `Found` · approve · ignore · `Closed` · the time machine.

**The four defects, none findable from a fixture:**

1. A hand-typed address with a curly dash silently never matched
2. `Days` pointed two directions
3. An approved contact landed at row 996
4. The sheet said `Added` when nothing was added

**All fixed.** Full account in `17-INSTALL-OBSERVED.md`, fixes in
`19-FIX-NOTES.md`.

**Not yet observed: the 15-minute timer firing unattended.** Automatic updates
were switched on overnight on September 2. **Read `Last successful run`,
`Last run took` and `Gmail calls last run` — that last one against the
20,000/day consumer limit, which has been theoretical since the courier was
written.**

---

## What is left, in order

### 1. The UI — the next piece of work

The sheet makes sense only to someone who built it. `17-INSTALL-OBSERVED.md` §7
carries the observed backlog:

- **`Next call` renders a raw ISO timestamp** — `2026-09-03T14:00:00-07:00`
  where the spec shows `1/17 @ 2:00 PM`. The worst visible defect
- **No colour anywhere.** The landing page's coloured status chips are the
  product's most recognisable visual and the sheet shares none of it (D19)
- Column widths cut off addresses; no frozen header row
- **No instructions.** What the columns mean, what to do on day one, how `Found`
  works, what `Closed` is for

### 2. Two things the install exposed that are not bugs

- **The distribution master ships full of someone else's contacts.** A student
  copying it inherits 58 real bankers' names and addresses. **A privacy problem
  as much as a confusing one**
- **Pasting a new script does not add new settings rows.** Any student on an
  update path silently lacks whatever the update added. One sentence fixes it:
  re-run `Step 1` after pasting

### 3. Still open

- **O1 — the setup scan / setup diff.** Jon re-derived the case for it by
  accident during the install, opening an empty sheet and expecting it to know
  something
- **D21b** — nothing outstanding; the decline-then-write case is built and
  tested live
- **The website** describes `Next move`, `Bump thread` and a day threshold, none
  of which survived contact with the data

### 4. Then a student

Every state Blotter computes is about **change over time**, and no real
recruiting season has ever run through it. **Only a student recruiting now can
test that**, and nothing substitutes for it.

---

## How this project works

**One chat at a time.** The conductor names the next task, Jon runs one chat,
Jon returns here, the conductor reconciles the documents.

**The rules document is the authority and only the conductor amends it.** Build
chats surface rulings in their notes; drift is reconciled here. **It has caught
something every single session** — most recently that D24 silently retired a
`Call cancelled` clock ruling made hours earlier the same day.
