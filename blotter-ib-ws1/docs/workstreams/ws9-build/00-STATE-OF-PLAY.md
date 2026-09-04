# WS9 — state of play

**Last updated: September 4, 2026, by the conductor chat.**

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

## Since September 3 — three things landed

**The banner row.** The notice moved from off the right edge of the screen to a
frozen bar across the top with a resting state. Nothing hardcodes where the
header row is any more: `headerRow_` finds it, and all thirty-seven positions
derive from that, so a pre-banner sheet still works untouched.

**Sheet resilience.** Almost everything a student would actually do is already
safe. **Four silent failures were found and fixed**, the sharpest being a manual
drag-sort landing mid-run — the menu sort takes the lock, a hand does not, and
the row number is the join key, so it could put one person's status on another
person's line with nothing wrong-looking about the result.

**Future-proofing, which is the big one.**

- **The design lives on the server now.** Status colours, widths, date formats,
  sort order and every word of `Start here` are data Blotter sends. Change them
  in one file, deploy, and every sheet picks it up. **Nobody re-pastes.**
- **Billing is fully built and refusing nobody.** Key box, account identity,
  tables, refusal path — all behind one environment variable that is off, with
  **exactly one source**, readable at `GET /api/entitlement`
- **Both sides now ignore fields they do not recognise.** Adding something new
  costs no version change and no re-paste. Proved on the spot: four new fields
  went in and the version did not move

⚠ **Neither `/api/design` nor `/api/entitlement` is deployed yet.** Both 404 in
production. The courier fails safe in every direction — no `design_version`, a
404, or an unreadable payload all fall back to the script's built-in look — so
this is a pending deploy, not a fault.

## September 4 — the sheet side is finished

**Billing binds to the sheet, not the person.** The diagnostic reported
`Google account readable: NO` on an ordinary personal Gmail before `.edu` was
even tried, and the cause was the manifest: five scopes, none of which would
give the script an email address. **There was never an address to read**, so the
`.edu` test is closed and was never owed.

Adding a sixth scope would have cost an extra line on Google's unverified-app
screen plus a forced re-authorisation for everyone already installed — **the
biggest point where a student abandons the install.** Keys bind to the install
id instead, which was already being sent and survives a re-paste.

**The website says what the product does.** The CASA and provider sentences are
gone — verified, zero mentions on `/privacy`. Permissions are real, taken from
the actual consent screen. *"Keep the sheet you already built"* is rewritten in
all eleven places. Telemetry is disclosed. `/setup` and `/terms` exist, both
`noindex`, and `/setup` exposes no template link until there is an empty master.

**Two corrections the chats made to the conductor, both right:**

- `04-ENGINE-RULES.md` §1 *does* name Financial Technology Partners. The
  conductor said flatly that it never mentions a bank, having grepped for the
  short name against a document that spells it in full
- *"The engine has no database"* stopped being true mid-write once the engine
  could read a billing key. The copy says **"writes nothing down"** instead —
  still true, still strong

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
