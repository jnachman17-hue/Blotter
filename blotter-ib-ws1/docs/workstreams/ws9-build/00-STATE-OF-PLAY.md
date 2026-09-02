# WS9 — state of play

**Last updated: September 2, 2026, by the conductor chat.**

**This file is the single orientation point.** If you read nothing else, read
this. Everything below was verified by running it, not taken from a chat's
report.

---

## The one-paragraph version

**The engine is built and it is right.** It passes all 31 independently written
fixtures and 71 self-tests against Jon's real 2024 recruiting season. **The
courier is built and has run for real** — Jon installed it into a live Google
account on September 1, 2026 and it produced a real spreadsheet from real Gmail.
Two bugs the archive could never have found were found in that hour and fixed.
**What has never been tested is mail arriving**, because Jon has no live
recruiting mail, and only a student who is recruiting now can test it.

---

## What is true right now, verified

| Check | Result |
|---|---|
| `npx tsx web/app/api/engine/run-fixtures.ts` | **31 of 31 pass** |
| `npx tsx web/app/api/engine/selftest.ts` | **71 of 71 pass** |
| Engine rules | **version 4**, current with every ruling |
| Live install | **Done.** Real account, real Gmail, real sheet |
| Working tree | Clean. Everything committed |

## What exists

| Piece | Where | State |
|---|---|---|
| **The rules** | `04-ENGINE-RULES.md` | v4. The authority. Plain English |
| **The contract** | `05-CONTRACT.md` | v1. The seam between the two halves |
| **The engine** | `web/app/api/engine/` | Built, passing, stateless, no database |
| **The answer key** | `web/app/api/engine/__fixtures__/` | 31 pairs from the real season |
| **The courier** | `courier/` | Built, installed once, hardened after |
| **The corpus** | `blotter-ib-ws1/research/corpus/` | 67 contacts, 325 messages, the labelled truth |

---

## What the live run taught us, and it was worth doing

Jon installed the courier and ran it on September 1. Three of the four findings
could not have come from any amount of testing against the archive.

1. **The Gmail search had no date limit.** Contacts stored under personal gmail
   addresses dragged in a 2022 club listserv, and Blotter dutifully suggested
   **~170 classmates** as recruiting contacts. Fixed: a `Mail looks back (days)`
   setting.
2. **The warnings cell killed the run.** The engine emitted one warning per
   non-recruiting calendar event — thousands, across three years of a personal
   calendar — and the write died at Google's 50,000-character cell limit. Fixed
   in the engine: ten examples per kind plus an honest count.
3. **"It changed nothing on failure" was false.** The crash happened *during*
   the write phase, so most of the sheet had already been written while the
   dialog claimed otherwise. Fixed: the message now tells the truth, and says
   the next good run rewrites every Blotter column.
4. **Verified genuinely working in production:** the timezone chain end to end
   (an 8:24pm Austin send lands on the right date), Owen Sherry matched by
   calendar title on live data, and the utexas-only relationships correctly
   showing `Not emailed` in a gmail-only install.

**The pattern is worth naming.** Every one of these is about the real world
being messier than a frozen archive — old mail, a personal calendar, a cell
limit. The engine's *judgment* was right on day one; everything that broke was
the plumbing around it.

---

## The roadmap, honestly

| | | |
|---|---|---|
| 1 | Idea, landing page, market signal | ✅ |
| 2 | **Learn** — read the real season | ✅ |
| 3 | **Rules** — decide what the engine does | ✅ |
| 4 | **Build** — engine, answer key, courier | ✅ |
| 5 | **Jon runs it on his own account** | ✅ **done, and it found real bugs** |
| 6 | **A student who is recruiting now** | ← **next, and nothing substitutes for it** |
| 7 | Decide: widen, charge, or move to the hosted version | — |

**You are at step 6.** The build is finished. What is missing is not code.

---

## What is left, in the order it matters

### 1. Nobody has ever tested mail arriving

Every state in this product is about **change over time** — someone replied,
someone went quiet, a call happened. **All of it has only ever been computed
against a frozen archive.** Jon's install proved the plumbing works; it could
not prove that a relationship moving from `Sent` to `Replied` actually happens
when the mail lands.

**Only a student recruiting right now can test this.** It is the whole of step 6.

### 2. The setup scan still does not exist

`04-ENGINE-RULES.md` §2 promises it. Nothing implements it, and the contract has
no shape for it. **A student types their starting contacts by hand**, and `Found`
grows the list from there.

Survivable for three to five students. Not survivable past that.

### 3. Seven rules questions remain open

In `10-TEST-CASE-NOTES.md` §7. **None blocks a pilot** — every one is an edge
the real season either never hit or hit once. They are listed so they are not
forgotten, not because they are urgent.

### 4. Two documentation debts

- `courier/INSTALL.md` does not mention the `Mail looks back (days)` setting
  added after the live run
- `05-CONTRACT.md` owes a version bump to carry display names through `found`

### 5. The website describes a product that no longer exists

`04-ENGINE-RULES.md` §12 lists it. `Next move`, `Bump thread` and the
`Follow-ups due` threshold are all on the live page, in three films and in the
share card, and none of them survived contact with the data. **Not urgent —
nobody has signed up — and Jon has ruled the site follows the engine.**

---

## How this project works from here

**One chat at a time.** Three parallel build chats worked for building and
stopped working the moment they needed Jon's attention — three chats asking him
questions, none of them able to see the others' answers.

The loop from here:

1. **The conductor chat** — this one — says what the next single task is
2. **Jon runs one chat** to do it
3. **Jon comes back here** with the result
4. **The conductor updates the documents** so this file stays true
5. Repeat

**The rules document is the authority and only the conductor amends it.** Build
chats surface rulings in their notes; drift gets reconciled here. That already
happened once — v4's two rulings were live in the code and the tests for a day
before this document caught up.
