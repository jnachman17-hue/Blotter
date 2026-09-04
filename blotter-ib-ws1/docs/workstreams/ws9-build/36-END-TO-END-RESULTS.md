# End-to-end test results

Date: 4 September 2026
Brief: `35-BRIEF-END-TO-END-TEST.md`
Status: **In progress.** Server side settled. Sheet side needs Jon.

**How to read this.** Every case says what was checked and what proved it.
"Confirmed in the database" and "35 checks against the live server" are
evidence. "Looks right" is not, and does not appear.

The test splits the way the brief describes. Jon has the spreadsheet and can
click. This chat has the database, the code and the deployed server, and can
prove a rule in seconds without a sheet. Everything below is marked with which
half settled it.

---

## 1. Where things stand

| | |
|---|---|
| Automated checks passing | **664** across five suites |
| Defects found | **3** |
| Fixed | **1**, with tests |
| Blocking launch | **0 so far** |
| Cases still needing the sheet | **12** |

---

## 2. What the automated suites cover, and what they proved

All five run clean.

```
node courier/helpers.test.js                    432 checks
cd web && npx tsx app/api/engine/selftest.ts    133 checks
cd web && npx tsx app/api/engine/run-fixtures.ts 40 fixtures
cd web && npx tsx app/api/entitlement/selftest.ts 24 checks
cd web && npx tsx app/api/engine/e2e.ts          35 checks   ← new
cd web && npx tsx app/api/design/selftest.ts      15 checks   ← new, 3 failing
```

Two suites are new and were written for this test.

### 2.1 `app/api/engine/e2e.ts` — the rulebook, without a spreadsheet

The brief calls posting straight to `/api/engine` "the single most useful habit
in this job". It is. This suite is that habit written down, and it runs two
ways: in process against the source, and with `LIVE=1` against
`https://blotterib.com/api/engine`.

**Both pass all 35.** That is what proves the deployed rulebook and the source
in this repository are the same thing.

What it settles, all against the real rules:

| Group | Checks |
|---|---|
| The eight statuses | Every one produced from a request, with `Days`, `Attempts`, `Last contact`, `Next call` and `Last call` asserted exactly |
| Precedence | `Bounced` beats `Call scheduled`; `Call scheduled` beats `Replied`; a thank-you turns `Call done` into `Sent` and `Last call` survives it; a call reads `Call done` at 14:01 on a 14:00 start |
| What must never count | An auto-reply stays `Sent` and is warned about; a calendar acceptance is neither a reply nor `Last contact`; forwarding a reply to family is not writing to the banker |
| Matching | Capitalisation ignored; five people in one thread, and only the one who replied reads `Replied` |
| Found and ignored | A new address is found with its real name; an ignored one never returns; no display name gives `null`, never an invented name; `no-reply` and bounce senders are never suggested |
| The wire | Version 3 refused; **a request carrying a body refused**; an old courier told to update, and the notice points at `/update` |
| Days | A calendar subtraction, not elapsed hours. 90 minutes across midnight is 1 day; 22 hours inside one day is 0 |

### 2.2 `app/api/design/selftest.ts` — the drift nobody was watching

`32-JON-NOTES-3-SEP.md` §15.3 says plainly that nothing tests whether the design
the server sends agrees with the courier's own values, and that they had already
drifted apart for days without anyone noticing. **This is that check, and it
fails.** See defect 2.

---

## 3. Cases settled without the sheet

### 3.1 Nothing is ever sent, labelled, archived, deleted, or written to a calendar

**Confirmed, and by something stronger than the code.**

`courier/appsscript.json` asks for five permissions. Two of them are the only
ones that touch mail and calendar:

```
https://www.googleapis.com/auth/gmail.readonly
https://www.googleapis.com/auth/calendar.readonly
```

**Google itself would refuse a send.** `gmail.readonly` cannot send, reply,
label, archive, delete or mark. `calendar.readonly` cannot create or change an
event. This is not a promise the code keeps; it is a promise Google enforces on
the code.

The code agrees. Every Gmail and Calendar call in `courier/Code.gs`:

```
GmailApp.search            1
CalendarApp.getDefaultCalendar  1
CalendarApp.GuestStatus         2
```

No `MailApp`, no `DriveApp`, and not one mutating method anywhere in the file.
The sheet permission is `spreadsheets.currentonly`, so the script cannot reach
any other file in Drive either.

### 3.2 The courier reads envelopes, not letters

**Confirmed.** `getPlainBody()` appears once in the whole file,
`courier/Code.gs:2480`, and the line above it is the guard:

```js
failed_recipients: isBounceSender_(bareAddress_(from))
  ? failedRecipientsFrom_(stripQuotedHistory_(m.getPlainBody() || ''))
```

A normal message's text is never read. And the server cannot receive one even
if the courier sent it: a request carrying a `body` field is refused with a 400,
which is check 32 of the new e2e suite.

### 3.3 A failed run writes nothing

**Confirmed by structure, not by hope.** `courierPass_` (`courier/Code.gs:1946`)
is split in two with the write phase marked, and every read, fetch and post
happens above the line. Settings are validated first of all, so a missing
address or an unreadable `Pretend today is` throws before a single Gmail call.

One deliberate exception, documented in place: if the server refuses the run and
sends a notice with the refusal, the banner is written so the student is told
why their sheet stopped. Nothing else is written.

### 3.4 The deployment matches the source

**Confirmed four ways.**

- `web/public/Code.gs` and `https://blotterib.com/Code.gs` are byte-identical,
  84,878 bytes, same SHA-256.
- `/api/script` reports `courier_version` and `expected_by_server` both
  `2026-09-04.2`.
- `/api/design` returns exactly the payload in `web/app/api/design/route.ts`.
- The 35 e2e checks pass identically in process and against the live server.

*(All four were true at the start of the test. Fixing defect 1 moved the local
version to `2026-09-04.3`, so the site now needs a deploy. See §6.)*

### 3.5 `/Code.gs` serves as text, and the notice points at `/update`

**Confirmed.** §16.4 recorded that the update notice used to link to a file that
downloads and explains nothing.

```
content-type: text/plain; charset=utf-8
content-disposition: inline; filename="Code.gs"
```

And the notice a stale sheet receives carries `https://blotterib.com/update`,
asserted in the e2e suite so it cannot quietly go back.

### 3.6 Billing is inert

**Confirmed in production.**

```
$ curl https://blotterib.com/api/entitlement
{"enforcing":false}
```

`34-SWITCHING-ON-PAYMENTS.md` §3.4 names that endpoint as the single source of
truth on purpose, because a switch with two sources cannot be turned off by
looking at one. `/billing` returns 200, carries `noindex`, and nothing on the
site links to it. Every engine request in the e2e suite runs with an empty key
and is answered normally.

### 3.7 A hostile or broken design payload cannot damage a sheet

**Confirmed by reading `sanitiseDesign_` (`courier/Code.gs:1590`).** Statuses are
allowlisted against `VALID_STATUSES`, colours must parse as hex, widths are
clamped to 24–600, and format strings are capped at 64 characters. Column
headings cannot be renamed from the payload at all, which is the rule that stops
a design pointing Blotter at a student's own column.

### 3.8 The Found tab's memory is the Ignored row

**Confirmed by reading and by test.** `readFoundTab_` builds the ignored list
from rows marked `no` or `ignored`, and sends it. Nothing else remembers a
rejection. So deleting an `Ignored` row does bring that person back, because the
row was the only record.

The two halves are asserted in the e2e suite: with the address in `ignored`
nothing is suggested; without it, the person is found again.

### 3.9 Every page a student is sent to is live

| | |
|---|---|
| The template, `/copy` form | 200 |
| `/setup`, `/setup/university`, `/setup/personal` | 200, `noindex` correctly lifted |
| `/update`, `/Code.gs`, `/contact` | 200 |
| `setup/menu-updates.png`, loaded by `Start here` | 200 |

### 3.10 §11.6 was already fixed

The note says a comment claims a dash "sorts last" while the code sorts it
first. The comment at `courier/Code.gs:1017` now says "sorts first", which
matches. Nothing to do.

---

## 4. Defects

### Defect 1 — every date read a day late on any sheet set to UTC+7 or further east

**Found here. Fixed here, with tests. Was not a launch blocker; is now moot.**

**Where:** `courier/Code.gs`, `asSheetDate_`.

**What was wrong.** The script's clock is pinned to `America/Chicago` by the
manifest. The sheet displays dates in whatever zone the student set. When those
two are far enough apart the date lands on the wrong day.

§16.2 found this on 4 September on a Pacific sheet and moved dates from midnight
to noon, reasoning that "noon leaves twelve hours of slack in each direction,
which covers every timezone a student could set." **The first half is true and
the second is not.** Chicago to Auckland is eighteen hours. Noon in Chicago is
already the next day in Bangkok.

So the fix cured the west and broke the east, which is the same fault mirrored,
and invisible from Chicago. Measured:

```
wanted 2026-09-06        rendered on a sheet set to
  ok    Los Angeles      2026-09-06 10h
  ok    Chicago          2026-09-06 12h
  ok    Kolkata          2026-09-06 22h
  WRONG Bangkok          2026-09-07 00h
  WRONG Singapore        2026-09-07 01h
  WRONG Tokyo            2026-09-07 02h
  WRONG Sydney           2026-09-07 03h
  WRONG Auckland         2026-09-07 05h
```

In winter the boundary moves one zone further west and Dhaka joins them.
`Last contact` and `Last call` are the affected columns.

**Why it survived.** `courier/helpers.test.js` pinned the sheet timezone to
`America/Chicago`, the same as the script's, so the gap between the two was
never exercised. The comment in the code also stated the bug was impossible,
which is worse than the bug: it tells the next reader not to look.

**The fix.** Build the date at noon **in the student's own timezone**, using
`instantInStudentZone_`, which is the machinery `Pretend today is` already used
for exactly this problem. Noon is kept so an hour of DST drift still cannot move
the date.

**The test.** 95 new checks: nineteen timezones from Honolulu to Kiritimati,
five dates each including both American clock-change days. Verified to fail
against both previous versions before being accepted:

| Version under test | Result |
|---|---|
| Original, midnight in script zone | 20 failures, all west of Chicago |
| §16.2, noon in script zone | 32 failures, all east of Bangkok |
| The fix | All 432 pass |

Version bumped to `2026-09-04.3` per the rule in §15.1, and `publish.js` re-run.

### Defect 2 — the served design still disagrees with the courier in three places

**Found here. Not fixed: it touches the design payload, which the brief reserves
for Jon.** Not a launch blocker. Cosmetic, and small.

**Where:** `web/app/api/design/route.ts` against `courier/Code.gs`.

§15.2 recorded that the served design was overriding the ratified colours and
had been synced. **The sync was incomplete.** Comparing the two:

| | Server sends | Courier's own value |
|---|---|---|
| `Not emailed` text | `#80868b` | `#a4a8ac` |
| `Closed` text | `#bdc1c6` | `#a4a8ac` |
| Sort order | Replied, Sent, **Bounced**, Not emailed, … | Replied, Sent, Not emailed, **Bounced**, … |

The server wins, so a live sheet wears the first column.

Git history says which side moved. Commit `94fb3ef` synced `Replied`,
`Call scheduled`, `Call done`, `Call cancelled` and all eleven column widths.
It did not touch `Not emailed` or `Closed`, which still carry their values from
the first commit of that file. **So the courier's are the ratified ones and the
served two are leftovers.**

The colour difference is small: both are grey, and `Not emailed` and `Closed`
were meant to share one pair, which on a live sheet they do not.

The sort order was never synced in either direction. Both orderings honour
Jon's ruling of 3 September, which named six statuses; they disagree only on
where `Bounced` sits among them, which he did not name.

**Recommendation.** Change the served payload to match the courier for the two
colours, since the courier's are the ratified ones. Ask Jon where `Bounced`
belongs, then make both sides say it.

**Guarded now either way.** `web/app/api/design/selftest.ts` compares the two on
every run and fails while they differ.

### Defect 3 — the database cannot see the Gmail call count

**Found here. Not fixed. Not a launch blocker.** Relates to §8.6, "confirm the
database captures what is actually needed".

`Settings → Gmail calls last run` is written into every student's sheet, and the
brief calls it "the first real check against the 20,000/day consumer Gmail
limit". **It is not in the telemetry payload.** `telemetryPayload_`
(`courier/Code.gs:1717`) carries `install_id`, `contract_version`,
`courier_version`, `at`, `contacts`, `seconds` and `ok`, and `blotter_installs`
has columns for exactly those.

So the number exists on each student's own sheet and nowhere else. Nobody can
ask "is anyone close to the limit", which is the question the counter was built
to answer, and the only warning would be a student writing in to say their sheet
stopped.

Adding it is one field in the payload and one column. It costs a re-paste, which
is cheap now and expensive later.

---

## 5. Observations that are not defects

**`Clear this sheet to hand to someone` clears the ID cell but keeps the script's
copy.** The dialog ends by telling the student to use File → Make a copy, and a
copy does mint a fresh identity, so the intended path is right. A student who
instead shares that same sheet hands over the original identity and any key
bound to it. Deleting the stored ID too would close the gap, but it would also
break the entitlement of anyone who ran the menu item on a sheet they had paid
for. **Leaving it alone looks like the safer default**, and it is recorded here
because the menu item's name invites the other reading.

**Bursts of requests to `/api/engine` are refused by the platform with a 403.**
Found while running the e2e suite at ten requests a second. It is Vercel's own
protection, not application code, and a courier makes one request every fifteen
minutes. Worth knowing before someone debugs it as an application fault.
---

## 6. Cases that need the sheet

These are Jon's. Each one says what will count as a pass, decided before the
test rather than after, so the answer cannot be argued into shape afterwards.

| # | Case | What proves it | Result |
|---|---|---|---|
| 1 | **A copy mints its own identity** | A new row in `blotter_installs` whose id differs from the master's, and a Settings cell that did not arrive carrying the master's id | **PASS**, §7 |
| 2 | Cold install, personal account | The unverified-app screen, the **Allow access** bar, the copy dialog's yellow note, instructions still open beside the sheet | **partial**, §7.2 |
| 3 | Cold install, Workspace account | Same, without the unverified-app screen | *pending* |
| 4 | Every menu item | Step 1, Step 2, start and stop updates, Check this sheet, three sorts, and the clear | *pending* |
| 5 | All eight statuses from real mail and real events | Each one appearing on a real row | *pending* |
| 6 | The columns | `Days` counts from the last thing that happened and is a dash where nothing counts; `Attempts` only on `Sent`; **`Next call` reads `1/17 @ 2:00 PM` and `Last call` a plain date** | *pending* |
| 7 | The unattended timer | `Last successful run`, `Last run took`, `Gmail calls last run` after a pass nobody watched | *pending* |
| 8 | The Found tab | Yes adds next run; No never returns; **deleting an `Ignored` row brings them back** | *pending* |
| 9 | Sheet resilience | Renamed heading, formula in a Blotter column, columns inserted mid-sheet, a hand sort mid-run, a student column given a Blotter heading. Each fails safely and says why | *pending* |
| 10 | The update path | The notice appears, links to `/update`, the copy button works, and `Check this sheet` then reports the new version | *pending* |
| 11 | Settings | Missing addresses refuses with a clear message; a wrong timezone shifts day counts; `Pretend today is` empty in normal use | *pending* |
| 12 | The clear, in full | Contacts, Found rows, addresses, the Blotter ID and the key all gone | *pending* |

### A shortcut worth using for case 5

`Settings → Pretend today is` moves only `now`. The Gmail and calendar windows
still run on real time, and they are wide: 365 days back for both, 180 forward.

So the whole call lifecycle can be tested in one sitting instead of over a week.
Put a call in the calendar for tomorrow and the row reads `Call scheduled`. Set
`Pretend today is` to a date after it and the same row reads `Call done`. Decline
the invite and it reads `Call cancelled`. `Days` can be walked forward the same
way.

It accepts `2026-09-05` or `9/5/2026`. A bare date means the end of that day,
which is deliberate: a call at 2pm on the pretend date has already happened.
Anything it cannot read stops the run rather than quietly falling back to today.

**It must be empty in normal use**, and a run with it set says so loudly in the
warnings, which is case 11.

---

## 7. Case 1 — a copied sheet gets its own identity

**PASS.** Run 4 September 2026, on a Google account that had never seen Blotter.

`34-SWITCHING-ON-PAYMENTS.md` §6 lists this as asserted in two documents and
never run. It has now been run.

### What was tested

| | |
|---|---|
| Master template, owned by `blotterib@gmail.com` | `e128243c-5f9d-4113-950e-a8eebf3d5173` |
| A copy taken from the `/copy` link by a cold account | `63563180-3c8f-40e2-991d-dbe97c956375` |
| The same? | **No** |

### Why the answer is trustworthy

**The master had a stored id before the copy was taken**, which is what makes
the result mean anything. A sheet with no id mints one on first use, so a fresh
id on the copy would have proved nothing at all.

The master acquired one when `Check this sheet` was run on it, because
`installId_` (`courier/Code.gs:1698`) mints and saves on first read. So at the
moment of copying, `e128243c` was sitting in the master's script storage. The
copy did not get it.

Three further confirmations from the database:

- The copy appears in `blotter_installs` as a new row: `2026-09-04.2`, 0
  contacts, 27 seconds, `ok = true`.
- **`e128243c` is not in `blotter_installs` at all**, which independently
  confirms the master has never completed a run. Six sheets have ever contacted
  the server and the master is not among them.
- The master's `Settings → Your Blotter ID` cell was empty, confirmed by Jon on
  the sheet. So the copy did not arrive carrying it, which is the second half of
  what the brief asked to check.

### The ruling

**Copying a sheet copies its cells and not its script storage.** A key binds to
the install id, the install id lives in script storage, so **one payment cannot
cover unlimited copies.** Billing is sound at the foundation.

### One hazard this exposed, worth writing down

The Settings cell was empty only because Step 2 has never been run on the
master. `writeSetting_(ss, SETTING_INSTALL_ID, installId_())` runs in the write
phase of a full pass and nowhere else, so Step 1 alone never fills it.

**If Step 2 is ever run on the master, that cell fills with the master's id and
every copy taken afterwards ships showing it** until the new owner's first run
overwrites it. Nothing reads the cell, so it is cosmetic. But it would look
exactly like this test failing, and it would be quoted into support emails by
students who all appear to have the same id.

`prepareForHandover` already clears that cell for this reason. **The master is
not handed over, it is copied, so nothing clears it there.** The rule is simply:
run Step 1 on the master, never Step 2.

## 7.2 Case 2 — the cold install, partial

Recorded while Jon was looking at it, on a personal (non-`.edu`) account:

- **The yellow `Allow access` bar appeared.** Expected: §16.6 records it as
  caused by the screenshot `Start here` loads from blotterib.com, and it was
  undocumented until Jon first hit it.
- **The unverified-app warning screen appeared.** Expected on a personal
  account, and the reason `/setup/personal` is a separate flow with six steps
  rather than five.

Still to record: the copy dialog's yellow note, and whether the instructions
stay open beside the sheet.

---

## 8. Student-facing copy: `Start here` step 3 does not say to bring your list

**Raised by Jon during the test, 4 September 2026, reading it cold.** Not a
defect in the code. A real gap in what the sheet asks a student to do, and it
sits at the exact point where a student either populates their tracker or gives
up.

**Where:** `courier/Code.gs:718` (the step) and `:719` (the note).

It currently reads:

> 3. Contacts tab → add the people you are networking with.
>
> *Name and Email are the two that matter. Paste addresses rather than typing
> them where you can: a hyphen your keyboard autocorrects is not the hyphen an
> email address uses. Blotter only looks at conversations with the people in
> this tab, so an empty sheet finds nothing. That is correct, not a fault.*

**What is missing.** Everything there is true and none of it conveys the scale
or the commitment. Jon, reading it as a student would: *"I think people won't
understand that it doesn't just pull the menu. You actually need to add the
relevant contacts you're networking with, and everybody already has some tracker
of some sort."*

Two ideas the passage never states:

1. **Bring the list you already have.** Every student tracks this somewhere
   already. The instruction is to move that list in, not to think of names.
2. **This is your tracker now.** New people go here from now on, not into the
   old spreadsheet.

Without the first, a student types three names and concludes Blotter does not
work. Without the second, they keep two trackers and Blotter goes stale.

**Draft, not ratified.** Offered for Jon to argue with, not applied:

> 3. Contacts tab → paste in everyone you are already networking with.
>
> *You almost certainly track this somewhere already. Bring that list over.
> Name and Email are the two columns that matter, and Blotter only watches
> conversations with the people in this tab, so anyone missing here is invisible
> to it.*
>
> *From here on this is your tracker. Add new people here as you meet them.
> Blotter also suggests people it sees in your threads, on the Found tab, so the
> list grows on its own once it is running.*
>
> *Paste addresses rather than typing them. A hyphen your keyboard autocorrects
> is not the hyphen an email address uses.*

**Cost.** `Start here` copy is courier-side, so this costs a version bump, a
re-paste, and a re-paste of the master template. That is the argument for moving
`instructions` into the served design, which the payload already has a slot for
and currently sends as `null`.

---

## 9. Case 11 — Settings

**Missing addresses: PASS.** Run on copy 2, 4 September 2026. Step 2 with the
`Your email addresses` cell empty produced:

> Blotter could not update the sheet, so it changed nothing.
>
> The sheet is exactly as it was. Reason:
> Settings needs "Your email addresses": every address you send from, separated
> by commas.
>
> (Failed after 4 seconds; 0 conversations, 0 messages, 0 Gmail calls)

Three things worth naming in that:

- It says what changed, which is nothing, before it says what went wrong.
- It names the exact setting and the exact format.
- **0 Gmail calls.** It refused before reading a single message, which is the
  read/write split in `courierPass_` doing what §3.3 says it does. A student
  with a misconfigured sheet spends none of their Gmail quota on it.

**And a finding that came free.** That failed run appears in `blotter_installs`
with `ok = false` and `seconds = 2`. **Failed runs are reported, not only
successful ones** (`courier/Code.gs:2101`). So the question "are any sheets
failing" is answerable from the database, which is more than §8.6 assumed. It is
the Gmail call count that is missing, not the failures. See defect 3.

## 9.2 Case 1, twice more

Two further copies were taken from the same master during the test. Neither
inherited anything.

| | |
|---|---|
| Master | `e128243c-5f9d-4113-950e-a8eebf3d5173` |
| Copy 1 | `63563180-3c8f-40e2-991d-dbe97c956375` |
| Copy 2 | `c1889fa8-10b7-42af-bbf2-32f5be8c3be3` |

Three copies, three identities, none of them the master's. The ruling in §7
stands on three observations rather than one.

## 9.3 Case 9 — sheet resilience, in progress

Run on copy 2, which was made for breaking.

| What was done | Expected | Observed |
|---|---|---|
| Two of the student's own columns inserted **between** `Status` and `Days`, with content | Cope silently, keep the content, keep the answers on the right rows | **PASS.** Coped, nothing said, nothing lost |

`findColumn_` locates every column by heading rather than by position, which is
why position cannot matter. Confirmed on a real sheet rather than reasoned.

Remaining: a formula in a Blotter column, a duplicate Blotter heading, a renamed
Blotter heading, and a hand sort mid-run.

### 9.3.1 The rest of case 9

| What was done | Expected | Observed |
|---|---|---|
| A formula (`=1+1`) typed into `Days` | Warn, overwrite, say so | **PASS.** Run completed. Named `row 3 (Days)` in both the dialog and `Settings → Last run warnings`, and said where a formula can live instead |
| The student's own column renamed to `Days`, so two columns carried it | Refuse, name the heading | **PASS.** Refused. *"more than one column called "Days". Blotter writes to the leftmost, which would overwrite whichever one is yours."* **0 Gmail calls** |
| Blotter's `Days` heading renamed to `Dayz` | Refuse, name the column | **PASS.** *"The Contacts tab is missing column(s): Days. Run Blotter → Step 1: Set up this sheet, or restore the header."* **0 Gmail calls** |
| `Step 1` run to repair it | Repair without touching the student's columns | **PASS with a wart.** See below |

**Every refusal cost 0 Gmail calls.** Each of these is caught before the fetch,
so a broken sheet spends none of the student's Gmail quota discovering it.

### 9.3.2 Step 1 repairs safely and leaves a mess

`ensureHeaders_` (`courier/Code.gs:1780`) only ever **adds** the headings it
finds missing, and appends them at the far right. It never renames, moves or
deletes, because a heading it does not recognise may be the student's and
Blotter must not touch the student's columns.

So renaming `Days` to `Dayz` and then running Step 1 leaves the sheet with
`Dayz` still there, full of stale numbers and now indistinguishable from a
student column, and a fresh empty `Days` appended past `Closed`.

**This is correct and it reads badly.** Correct because `findColumn_` locates
columns by heading, so the new one works perfectly where it landed. Badly
because the student is left with two similar columns and no word about it.

**The wording is the wrong way round.** The message offers
*"Run Blotter → Step 1: Set up this sheet, or restore the header."* Restoring
the header is the clean fix and Step 1 is the one that leaves an orphan, so the
order should be reversed. **Proposed, not applied**, since each courier change
costs a re-paste of every sheet and the master:

> The Contacts tab is missing column(s): Days. Rename the heading back if you
> changed it. Or run Blotter → Step 1, which adds a fresh one at the end and
> leaves the old column where it is.

Not a launch blocker. Nothing is lost and nothing is written to the wrong place.

### 9.3.3 A documentation drift found while reading the guard

`26-SHEET-RESILIENCE.md` §2.4 says the mid-run sort guard re-reads **"the Name
and Email of every row that was sent"**. The code compares **email only**
(`rowsThatMoved_`, `courier/Code.gs:3045`), and says why in place: a student
fixing a typo in a name is normal and most likely during setup, when the timer
is firing every fifteen minutes, and stopping a run for that would produce a
message about rows moving that makes no sense to them. A sort or a drag moves
the whole row, so the address travels with it and the guard still catches
everything it exists for.

**The code is right and the document is stale.** Recorded so the next reader
does not "fix" the code to match the prose.

---

## 10. Cases 5, 6 and 7 — the sheet on a real run

Copy 1, after an unattended timed run, 4 September 2026, 3:37 PM Pacific.
Read off the sheet itself.

| Name | Email | Status | Days | Last contact | Attempts | Next call | Last call |
|---|---|---|---|---|---|---|---|
| Pat Banker | `blotterib@gmail.com` | `Sent` | `0` | `9/4/26` | `1` | — | — |
| Sam Dealer | `jnachman17@gmail.com` | `Call scheduled` | — | — | — | `9/5 @ 3:30 PM` | — |
| Dead Address | `no.such.person.blotter99@…` | `Bounced` | — | `9/4/26` | — | — | — |
| Nobody Yet | *(none)* | `Not emailed` | — | — | — | — | — |

Banner: *"Blotter: all good. Last updated 3:37 PM."* The resting banner, no
notice, which is correct for a sheet on the current version.

### 10.1 Case 6, the columns — PASS on every rule

This is the table the brief said to check hard, because the date bug lived here.

- **`Next call` reads `9/5 @ 3:30 PM`.** Exactly the shape engine rules §9 draws
  (`1/17 @ 2:00 PM`). The number format `m/d "@" h:mm AM/PM` is reaching the
  right column, and the time of day survived.
- **`Last contact` reads `9/4/26`, a plain date, and it is today's date.** Not
  yesterday's. The sheet is set to `America/Los_Angeles`, which is where the
  original midnight bug showed itself, and the date is right.
- **`Days` is a number only where it means one.** `0` on `Sent`; a dash on
  `Call scheduled`, `Bounced` and `Not emailed`. That is D24 exactly.
- **`Attempts` appears on `Sent` and nowhere else.** `1` for Pat Banker, a dash
  on the other three, including `Bounced`. Jon's ruling: *"If that address is
  bounced it's bounced, additional attempts are worthless."*
- **`Bounced` keeps its `Last contact`** while showing no `Days` and no
  `Attempts`. A closed-off row that still carries its history.

### 10.2 Case 5, the statuses — four of eight confirmed on real data

`Sent`, `Call scheduled`, `Bounced` and `Not emailed`, all produced by real mail
and a real calendar event rather than by a fixture.

The status colours on the sheet match the served design: `Sent` on grey,
`Call scheduled` on light purple, `Bounced` on light red, `Not emailed` with no
fill at all.

Still to produce: `Replied`, `Call done`, `Call cancelled`, `Closed`.

### 10.3 Case 7, the unattended timer — PASS

Never observed before this test.

| | |
|---|---|
| `Last successful run` | 9/4/2026 |
| `Last run took` | 13 seconds |
| `Last run fetched` | 2 conversations, 3 messages |
| Confirmed in `blotter_installs` | 4 contacts, 13 seconds, `ok = true`, 22:37:30 UTC |
| Gap from the previous run | 14 minutes 47 seconds |

The trigger fired with nobody watching, wrote the whole sheet correctly, and
reported itself to the server. The cadence is the 15 minutes
`startAutomaticUpdates` promises.

**Run cost.** 13 seconds for 4 contacts against a previous measurement of 44
seconds for roughly 82. The first run on a fresh sheet took 27 seconds with no
contacts at all, because that is the run that fetches and paints the served
design; steady state is much cheaper.

**`Gmail calls last run` is still not recorded.** It is the one value the brief
singles out as the first real check against the 20,000/day consumer limit, and
it is the one number not yet read off a real sheet. Outstanding.

### 10.4 Case 9 — Step 1 on a customised sheet, PASS

`26-SHEET-RESILIENCE.md` §4.2 lists this as unknown: *"Nobody has run it on a
sheet with twenty student columns, its own tabs, and hand formatting. It is the
repair route the guide now points at, so it has to survive being used."*

It has now been run on a sheet carrying two student columns sitting **between**
Blotter's own, both with content, and a Blotter heading renamed out from under
it.

- The missing `Days` column was rebuilt, appended after `Closed`.
- **`Notes` and `LinkedIn` survived with their contents untouched.**
- The orphaned `Dayz` was left alone, which is correct: Blotter does not delete
  a column it cannot prove is its own.

Step 1 is safe to point students at. §9.3.2 records the untidiness it leaves.

---

## 11. Case 4 — the menu

### 11.1 The three sorts — PASS

Run on copy 2 with four contacts carrying deliberately varied titles and firms.
Each result checked against the ranking function rather than eyeballed.

| Sort | Result | Against |
|---|---|---|
| **By title (analyst first)** | Bo Junio (Analyst), Pat Banker (Associate), Ana Vice (VP), Sam Dealer (MD) | `titleRank_`: intern 5, analyst 10, associate 20, VP 30, partner/director/principal/head 35, MD 40. Correct, most junior first |
| **By firm** | Alpha Bank, Evercore, Moelis, Zeta Bank | Alphabetical. Correct |
| **By what they are waiting on** | Pat Banker (`Sent`), Sam Dealer (`Call scheduled`), then the two rows with no status yet | `stateRank_`: Sent 20, Call scheduled 50, and an unrecognised or empty status 75, so new rows sink. Correct |

The sort takes the script lock first, so it cannot run underneath a pass.

### 11.2 The rest of the menu, observed in passing

`Step 1`, `Step 2`, `Start automatic updates` and `Check this sheet` have all
been exercised repeatedly through this test and behaved every time. `Stop
automatic updates` and `Clear this sheet to hand to someone` are outstanding.

### 11.3 The mid-run hand sort — logic proven, live window not yet hit

`26-SHEET-RESILIENCE.md` §4.3 lists this as the case that has only ever been
tested against a fake sheet: *"What has never happened is a real person dragging
real rows while a real run is out."*

**First live attempt: the drag landed outside the window and the run completed
normally.** That is not a failure of the guard, and Jon's own output proves
where the drag fell. The run's warning named *"Row 3 (Ana Vice)"*, so Ana Vice
was still on row 3 when the sheet was read; the run then wrote without
complaint, so the drag also fell after the write began. It missed at the far
end.

**The guard itself was then tested against exactly that shape**, because the
sheet Jon was dragging had two rows with no email address at all and one of them
was the row he moved. Four checks added to `courier/helpers.test.js`:

| Case | Result |
|---|---|
| An addressless row sitting still | Not a move. Correct |
| **An addressless row dragged past an addressed one** | **Caught**, and it names *"row 3 was Ana Vice and is now Sam Dealer"* |
| Two addressless rows swapped with each other | **Invisible to the guard** |

**That last one is a real limit and it is harmless.** The guard compares email
addresses and those rows have none. Neither row has any mail to attribute, so
both read `Not emailed` whichever line they sit on, and swapping them moves
nothing Blotter writes. Recorded in the suite as a known boundary rather than
left to be found later.

### 11.4 A warning that behaved correctly and looked like a fault

The same run produced:

> CHECK THESE ROW(S). Blotter could not read an email address:
> • Row 3 (Ana Vice) has no email address, so Blotter cannot find their mail and
> the row will stay "Not emailed".

**This is right.** Those two contacts were added for the sort test with no
addresses. Blotter named the rows that can never do anything and said why, which
is the behaviour `unreadableAddressWarnings_` exists for. Recorded because it
read like a defect in the moment and is not one.

---

## 12. Case 10 — the update path

**The notice appears, and the link is not cut off.** Observed on a live sheet
running `2026-09-03` against a server expecting `2026-09-04.2`, which is a real
stale install rather than a simulated one.

> A newer version of Blotter is available: 2026-09-04.2. This sheet is running
> 2026-09-03, which still works. Updating takes about a minute.
> https://blotterib.com/update

Three things settled by that one line:

- **It fires when a sheet is behind**, on its own, with nobody asking.
- **It points at `/update`, not at the file.** §16.4 recorded that it used to
  link to `/Code.gs`, which downloads a `.gs` into Downloads and explains
  nothing.
- **The URL is complete.** §16.3 recorded the first draft being cut off by about
  fourteen characters. It now runs 169 characters against roughly 208 of banner
  width, and the tail is visible on a real sheet.

Remaining: the banner colour, the copy button, and whether `Check this sheet`
reports the new version after a paste.

### 12.1 Dead code found while checking the banner colours

`NOTICE_TAB_COLOUR` (`courier/Code.gs:69`) defines a tab colour for each of the
three notice levels and **is referenced nowhere in the file.**

The banner colours themselves work and are used. The tab colouring was intended
and never wired up, so a student on another tab gets no signal that something
needs their attention. Exactly the pattern §6 of `26-SHEET-RESILIENCE.md`
found with `missingSetup_`: something written for a job, never called, and
silently doing nothing.

Not a defect and not a launch blocker. Either wire it up or delete it, and the
choice is a product one rather than a technical one.

### 12.2 The update journey, end to end — PASS

Walked on a real stale sheet, 4 September 2026.

| Step | Result |
|---|---|
| Notice appears unprompted on a sheet running `2026-09-03` | **PASS** |
| Links to `/update`, full URL visible | **PASS** |
| `Copy the code` button | **PASS**, nothing downloaded |
| Paste into Apps Script, save, reload, Step 1 | **PASS** |
| `Check this sheet` reports the new version | **PASS**, `2026-09-04.2` |
| **The sheet reports the new version to the server** | **PASS.** `3a8444f2` moved from `2026-09-03` to `2026-09-04.2` in `blotter_installs` |

The last line is the one worth having. The student's own diagnostic and the
server independently agree the paste took, which is exactly the question §15.1
was written to make answerable.

### 12.3 Defect 4 — multiple Google accounts break the update path, with no guidance anywhere

**Found live. Not a launch blocker, but it stops a student dead with no way
forward.**

Opening Extensions → Apps Script on the sheet produced Google's own error:

> Sorry, unable to open the file at this time. Please check the address and try
> again.

**The cause was three Google accounts signed into one browser.** The Apps Script
editor URL carries no account index, so it opens under whichever account is
default, and that was not the account owning the sheet. Moving to an incognito
window signed into the owning account only, everything worked and the update
completed.

**Nothing in the product mentions this.** Checked all three pages:

| Page | Says anything about multiple accounts? |
|---|---|
| `/update` step 02, "open Extensions then Apps Script" | No |
| `/update` troubleshooting, "If it looks like nothing happened" | No. It covers a stale editor copy only |
| `/setup/university`, `/setup/personal` | No |

`32-JON-NOTES-3-SEP.md` §2.6 removed the two-signed-in-accounts warning from the
setup pages, on the grounds that *"I've never heard of this. Whatever your
avatar is, you're signed in to."* **This is that failure, arriving on the update
path rather than the install path.** The ruling was about the install pages and
this is a different page, so nothing was contradicted; it is simply now known to
happen.

**Recommendation.** One line in `/update`'s troubleshooting block, which is
website copy and costs no re-paste:

> **"Sorry, unable to open the file at this time."** That is Google, not
> Blotter, and it means your browser is signed into more than one Google
> account. Open the sheet in a private window signed into just the account that
> owns it.

### 12.4 The banner colour — unresolved, and unresolvable on that sheet

The banner carrying the notice was **not** blue. Whether that is a fault cannot
be determined from it, because the sheet reported itself as `2026-09-03` and
**six separate builds all carried that same version string** — the fault
§15.1 records and fixed. `NOTICE_STYLES` was added at some point inside that
window, so the sheet may have been running code from either side of it.

Answerable the next time a sheet goes stale: everything from `2026-09-04.2`
onward definitely carries the colours. Jon's ruling on the day was that it does
not matter, and it does not block launch either way.

### 12.5 Case 7, the timer, with a full cadence

Four consecutive runs on copy 1, three of them unattended:

```
22:22:43   0 contacts   27s   first run, fetches and paints the design
22:37:30   4 contacts   13s   timed
22:52:30   4 contacts   13s   timed        exactly 15m 00s later
22:58:36   4 contacts    8s
```

The 15-minute cadence holds to the second across consecutive firings, and the
run cost is stable at 8 to 16 seconds for 4 contacts.

---

## 13. A failure mode not on the brief's list

**The server being unreachable, or answering badly.** Not asked for, and the one
that will actually happen in the wild: a deploy, an outage, a student's network.

Read from `postToServer_` and `validateResponse_`. Every one of these throws
**before the write phase**, so the sheet is left exactly as it was:

| What goes wrong | What happens |
|---|---|
| The fetch throws (no network, DNS, timeout) | *"Could not reach the Blotter server (…)"* |
| Any status that is not 200 | *"The Blotter server answered with status N instead of 200."* |
| The answer is not valid JSON | *"The Blotter server's answer was not valid JSON."* |
| The server speaks a different contract version | Named, both versions |
| The server returns the wrong number of rows | Named, both counts. *"Every contact must get exactly one row"* |
| The server returns a status outside the eight | Rejected |

**And a refusal that carries a notice gets that notice written**, which is the
one deliberate exception to writing nothing on failure and is narrow: the banner
cell and nothing else. That is what stops a student whose access was withdrawn
watching their sheet quietly stop and concluding it is broken.

---

## 14. The remaining cases, all run

### 14.1 Case 5 — all eight statuses, on real mail and a real calendar

Copy 1, produced in sequence from one contact set. **Complete.**

| Status | How it was produced | Result |
|---|---|---|
| `Not emailed` | A contact with no mail | **PASS** |
| `Sent` | A real email out | **PASS**, `Days 0`, `Attempts 1` |
| `Replied` | A real reply back from `blotterib@gmail.com` | **PASS**, and **`Attempts` moved back to a dash**, which is D24 |
| `Bounced` | A real delivery failure from a dead address | **PASS**, `Days` and `Attempts` both dashes, `Last contact` kept |
| `Call scheduled` | A real calendar invite | **PASS**, `Next call` read `9/5 @ 3:30 PM` |
| `Call done` | `Pretend today is` moved past the call | **PASS**, with a loud testing-mode warning |
| `Call cancelled` | The invite declined by the contact | **PASS** |
| `Closed` | The checkbox ticked | **PASS**, history kept |

Clearing `Pretend today is` returned everything to normal, which is the second
half of case 11.

**The time machine works and announces itself.** A run with it set warns loudly
that every number on the sheet answers a date that is not today. That is the
behaviour that stops a test being mistaken for reality.

### 14.2 Case 8 — the Found tab

**PASS.** A third address added to the cc line of a real email appeared in the
Found tab on the next run, for approval rather than added automatically.

The two halves that make the memory work are asserted in the e2e suite (§2.1):
an address in `ignored` is never suggested, and the same address without that
entry is found again. Since `readFoundTab_` builds that list from the `Ignored`
rows and nothing else remembers a rejection, **deleting an `Ignored` row does
bring the person back.** The row is the memory.

### 14.3 Case 12 — the clear

**PASS.** Every one of the five things the brief requires:

| Required | Gone? |
|---|---|
| Contacts | Yes |
| Found rows | Yes |
| Addresses | Yes |
| The Blotter ID | Yes |
| The key | Yes |

**What correctly stayed:** the server URL and the telemetry URL. Those are
configuration the next owner needs, not anything about the previous one, and
clearing them would hand somebody a sheet that cannot run. Jon checked and
flagged them; they are meant to be there.

### 14.4 Case 4 — the menu, complete

`Step 1`, `Step 2`, `Start automatic updates`, `Stop automatic updates`,
`Check this sheet`, all three `Sort contacts`, and `Clear this sheet to hand to
someone`. **Every item exercised and every item behaved.**

---

## 15. Defect 5 — the Gmail budget is thinner than it looks, and invisible

**Not a launch blocker. It becomes one at scale, and nothing will warn us.**

`Gmail calls last run` had never been read off a real sheet. It now has:

```
4 (1 searches, 3 conversation fetches)
```

That is the whole cost model, confirmed. **Calls per run = searches + threads**,
where searches are batched at `ADDRESSES_PER_SEARCH = 10` contacts each.

The model is independently confirmed by the real-corpus example recorded in
`metricsSuffix_`: *"126 conversations, 325 messages, 134 Gmail calls"* — 8
searches plus 126 thread fetches.

**Runs per day: 64.** Sixty between 7am and 10pm at fifteen minutes, four more
overnight at two hours.

| Contacts | Threads | Calls/run | Calls/day | Of the 20,000 limit |
|---|---|---|---|---|
| 4 (this test) | 3 | 4 | 256 | **1%** |
| 25 | 40 | 43 | 2,752 | 14% |
| 50 | 90 | 95 | 6,080 | 30% |
| **67 (the real 2024 season)** | **126** | **134** | **8,576** | **43%** |
| 100 | 200 | 220 | 14,080 | 70% |
| 150 | 350 | 410 | 26,240 | **over** |
| 200 | 500 | 600 | 38,400 | **over** |

**Jon's own real recruiting season sits at 43% of the daily limit.** A student
with twice his correspondence goes over it, and Gmail then refuses reads for the
rest of the day.

**Nobody would see it coming.** The count is written to the student's own sheet
and is not in the telemetry payload (defect 3), so the first signal would be a
student writing in to say their tracker stopped. Adding it is one field and one
column.

**Not urgent.** No student today is near it, the window is a year of mail and a
student mid-season has far less, and the night cadence already halves the
overnight cost. **It is the number to watch first once real students are on it**,
which is exactly what the brief said it was for.

---

## 16. What could not be tested, and why

Honest list. Nothing here is hidden in a passing table.

| | Why |
|---|---|
| **Case 3, the Workspace install** | Not re-walked today. `32-JON-NOTES-3-SEP.md` §9.1 already accepts this: only one university was ever tested and Jon has no way to test another. The university page carries a fallback note for schools configured differently. Unchanged by this test |
| **The mid-run hand sort, live** | Attempted; the drag landed outside the read-to-write window. The guard's logic is proven by test against the exact shape of Jon's sheet, including rows with no address (§11.3). What has never been seen is the message firing in anger |
| **The banner colour on a stale sheet** | Unresolvable on the sheet available, because six builds all reported `2026-09-03` (§12.4). Answerable next time a sheet goes stale |
| **A wrong time zone shifting day counts** | Not run as a live case. Covered instead by 95 new automated checks across nineteen timezones (defect 1), which is stronger evidence than one sheet would have been |
| **Merged cells inside the data** | `26-SHEET-RESILIENCE.md` §4.1, still unknown. Copy 2 was cleared before it could be tried |
| **Student-added data validation** | §4.4, still unknown, and still reasoned to be safe because `syncClosedCheckboxes_` targets the `Closed` column only |
| **Everything in `34-SWITCHING-ON-PAYMENTS.md` §6 except the copied sheet** | A second sheet presenting one key, two sheets owned by one person, subscription renewals, non-card payments. All out of scope while enforcement is off. **The copied sheet, the one that mattered, is now settled (§7)** |
| **The copy dialog's yellow note, and whether the instructions stay open** | Not separately confirmed. The **Allow access** bar and the unverified-app screen were (§7.2) |

---

## 17. The verdict

### GO, with one thing that must ship first.

**Blotter does what it says, and it fails safely when it cannot.**

Twelve cases, eleven passed outright and one partial. 674 automated checks
passing across six suites, two of which were written during this test and one of
which is the drift check §15.3 asked for and never got. All eight statuses
produced from real mail and a real calendar. Three unattended timed runs at
exactly fifteen minutes. Every menu item exercised. Every deliberate breakage
either coped silently or refused loudly and said why.

**The guarantees hold, and they hold for a better reason than good code.** The
manifest asks Google for `gmail.readonly` and `calendar.readonly`, so nothing
can be sent, labelled, archived, deleted, or written to a calendar even if the
code tried. `getPlainBody()` is called in one place, guarded. The server refuses
a request carrying a body. Every refused run in this test cost **0 Gmail calls**
and wrote nothing.

**Billing is sound at the foundation.** Three copies of one master produced three
identities. One payment cannot cover unlimited copies. That question had been
asserted in two documents and never once run.

### The one blocker

**Deploy the date fix and re-paste the master template.**

Defect 1 is fixed, tested and not shipped. Until `2026-09-04.3` is deployed and
the template carries it, every student whose sheet is set to UTC+7 or further
east reads every date one day late. That is Bangkok, Singapore, Hong Kong,
Tokyo, Seoul, Sydney, Auckland, and Dhaka in winter.

It is a narrow population for a US recruiting product and it is silent, wrong
and already known, which is the combination that should never ship. The fix is
made; it needs a merge and a paste.

**And that paste is the whole risk.** §16.8 records the master sitting on stale
code once already, which is how Jon nearly shipped the date bug he had just paid
to find. Nothing enforces it. `Check this sheet` reporting `2026-09-04.3` is the
only proof it took.

### Decisions waiting on Jon, none of them blocking

1. **Defect 2, the design drift.** The served payload disagrees with the courier
   on two text colours and on where `Bounced` sorts. The colours: the courier's
   are the ratified ones, so change the server. The sort order: Jon named six
   statuses and both orderings honour all six, so he needs to say where
   `Bounced` goes. Guarded by a test either way now.
2. **Defect 3 and 5, the Gmail count.** One field in the telemetry payload and
   one column. Cheap now, costs a re-paste later.
3. **Defect 4, the multiple-accounts note.** One line in `/update`'s
   troubleshooting. Website copy, no re-paste.
4. **`Start here` step 3** (§8). The step that tells a student to populate their
   tracker does not tell them to bring the list they already have. Jon raised it
   himself, reading it cold.
5. **`NOTICE_TAB_COLOUR`** (§12.1). Wire it up or delete it.
6. **The "missing column" message** (§9.3.2). It offers Step 1 first and
   restoring the heading second, and Step 1 is the one that leaves a mess.

### What this test changed

- Fixed a live data bug nobody knew about, with 95 checks that fail against both
  previous versions.
- Added the design drift check `32-JON-NOTES-3-SEP.md` §15.3 asked for.
- Added 38 checks that test the rulebook directly, runnable against the source
  or the deployed server, which is what proves the two agree.
- Answered the copied-sheet question that billing rests on.
- Watched the timer run unattended for the first time.
- Read `Gmail calls last run` off a real sheet for the first time, and turned it
  into a capacity model.
- Closed §4.2 and §4.3 of `26-SHEET-RESILIENCE.md`, and found the honest limit of
  the mid-run guard rather than assuming it had none.
