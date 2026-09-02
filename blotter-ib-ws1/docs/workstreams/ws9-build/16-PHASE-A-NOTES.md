# Phase A notes — what changed, and what the next chat must not trip over

Date: September 2, 2026
Brief: `15-BRIEF-PHASE-A.md`
Status: **All nine changes are built and green**, plus D17, the time machine.
§2.9 was blocked on a Gmail account and was completed in a second pass once
Jon reconnected it.

| Check | Result |
|---|---|
| `npx tsx web/app/api/engine/run-fixtures.ts` | **38 of 38 pass** (31 existing + 7 new) |
| `npx tsx web/app/api/engine/selftest.ts` | **113 of 113 pass** (was 71) |
| `node courier/helpers.test.js` | **67 of 67 pass** (new file — the courier had no tests) |
| Expected values changed | **13.** Lonnie Kauppila at three dates, and one `days` value under the September 2 clock ruling. See §3 |
| `tsc --noEmit`, `eslint`, `next build` | Clean |
| `node --check` on `Code.gs` | Clean |

---

## 1. The deployment question — the brief's premise was wrong, and it matters

**`15-BRIEF-PHASE-A.md` §4 says the engine is not deployed and that
`https://blotterib.com/api/engine` is a 404. Both are false.** The engine is
live at that exact URL and has been since September 1.

What was actually checked, in order:

| Probe | Result | What it proves |
|---|---|---|
| `GET https://blotterib.com/api/engine` | **405** | The route exists (POST-only) |
| `GET https://blotterib.com/api/definitely-not-a-route` | 404 | A 405 is meaningful, not a catch-all |
| `git ls-tree origin/main web/app/api/` | contains **`engine`** | It was merged to `main` already |
| A live POST of a one-contact request | `attempts: 1`, warnings capped at ten | The deployed build carries `752cddd` (the forward ruling) and `5078da2` (the warnings cap) — `origin/main`'s code |
| A live POST of `{"version": 2}` | `must be 1 — this server speaks contract version 1, got 2` | **The deployed engine is the pre-Phase-A one.** Confirmed by the conductor chat, September 2 |

**Both halves of this matter and neither alone is the whole truth.** The brief
was wrong that the endpoint is a 404 — it is deployed and answering. This
chat's first report was right that it is deployed, but the build sitting there
is the **version-1** engine from `origin/main`, not the Phase A one. The
practical consequence is the same either way and is the instruction below:
**ship the server first.**

**The mistake is easy to see and worth recording.** The *local* `main` branch
in this working copy is stale — it sits at `ef7bbda`, months behind. `git
ls-tree main` therefore shows no `api/engine`, which is what the brief
reports. `origin/main` is at `85b422c` and has it. **Anyone auditing this
project must fetch before believing a local branch.**

**So there is nothing to decide about where the engine lives.** It lives at
the default URL, on `main`, and Jon's live run used the real thing.

### What is actually true, and what Jon should know

**The unauthenticated public endpoint the brief wanted raised is already
there.** It is not a prospective choice — it has been on `blotterib.com` since
September 1. The honest description is unchanged from the brief's: it is
stateless, stores nothing, has no database and no environment variables, so
**there is nothing to leak**. Anyone who finds it can make it compute. For a
pilot that is very probably fine; it is Jon's call whether it stays open, and
he should know it is open.

### The one real question, which is different from the brief's

**This branch is 6 commits ahead of `origin/main`, and every one of them is
documentation** — `git diff --stat origin/main HEAD` touches five `.md` files
and no code. So the branch's engine and courier were byte-identical to
production before this session's work.

**That is no longer true.** Phase A changed the engine. So the question is
just: **how does the new engine reach production?** `origin/main` is an
ancestor of this branch, so a merge is a clean fast-forward with no conflicts.

**Deploy order is not optional, and it only bites in one direction** (§2.1):
the new server understands old couriers, but the new courier speaks version 2
and the currently deployed server rejects it with a 400. **Ship the server
first, then Jon re-pastes `Code.gs`.** A courier that runs against the old
server in between fails safely — it writes nothing and says so — so the worst
case of getting the order wrong is a stale sheet, not a corrupted one.

---

## 2. The nine changes

### 2.1 Contract version 2 — done, both halves

`05-CONTRACT.md` is version 2. Two additions, both optional, both additive.

**(a) Any address may carry a display name.** `Barbara Barman
<boone2002@att.net>` is accepted anywhere an address is accepted. The engine's
`parseAddress` already handled the form; the change is that **the courier now
sends it** (`namedAddressList_` / `firstNamedAddress_` in `Code.gs`).

**(b) An event carries a `declined` list** — the addresses that answered No.
The exact shape proposed and implemented:

```json
{ "id": "abc", "title": "...", "start": "...", "end": "...",
  "attendees": ["banker@firm.com", "student@gmail.com"],
  "declined":  ["banker@firm.com"],
  "organizer": "student@gmail.com" }
```

**Why a separate list rather than restructuring `attendees`:** a version-1
payload then parses byte-identically and the existing attendee-matching code
is untouched. **Why declines only:** no rule reads accepted, tentative or
not-yet-answered, and the contract should not carry facts nothing consumes.

**Three design decisions inside this, all stated in the contract:**

1. **The response echoes the request's version.** Asked in 1, answered in 1.
   This is what makes "a version-1 payload is still understood" true *end to
   end* — a version-1 courier validates the response version it gets back, so
   answering everything in 2 would have broken it.
2. **`Call cancelled` cannot arise from a version-1 request**, because the
   only fact that produces it travels on a version-2 one. So a version-1
   client is never handed a status it does not know. This is not a
   coincidence to rely on loosely — it is why the version bump is safe.
3. **`found[].name` is now `string | null`.** A real name or nothing.

**Where the courier gets `declined` from:** `EventGuest.getGuestStatus()`
against `CalendarApp.GuestStatus.NO`, plus a separate `event.getMyStatus()`
check, because where the student is the organiser the guest list reports them
as `OWNER` whatever they clicked — and §4 counts a decline from either side.
**That second call is untested** (§7).

### 2.2 `Call cancelled` — done

Precedence implemented exactly as ruled:
`Bounced > Call scheduled > Call done | Call cancelled > Replied / Sent`.

- **Either side cancels it** — the student's decline or the contact's. **A
  third party on the invite declining cancels nobody's call.** Decided where
  the event is matched, because it needs both sides' addresses.
- **It clears the moment somebody writes**, exactly as `Call done` does.
- **A cancelled call is neither `Next call` nor `Last call`.** It is not
  upcoming and it did not happen.
- The courier accepts the eighth status (`VALID_STATUSES`).

**The clock was ruled separately on September 2 and is now built to that
ruling — see §5.1.** `Days` counts from the **last thing that actually
happened**: an email in either direction, or a call that took place. **A
cancelled call is a non-event** — it does not anchor the clock, does not reset
it and does not touch it. Only the status changes.

So a `Call cancelled` row shows exactly the number `Sent` or `Replied` would
show for that contact, and it can be large. That is the point: a decline
landing thirty days after the last email reads 30, which is the fact worth
knowing. `null` when nothing has ever happened at all.

### 2.3 A call flips to `Call done` at its start — done

`start > now` is upcoming; `start <= now` has happened. At 2:01pm on a
2:00–2:30 call the row reads `Call done`.

**"Nobody has written since" moved to the start as well**, and this is a
change beyond the literal ruling, so it is flagged: under the old end-time
anchor, **a thank-you sent in the last minutes of a call could never clear
`Call done` at all** — the message is before the end, so the row said "you owe
a thank-you" permanently. That was a latent bug, and it is fixed by the same
move. `cases/17` and two self-tests pin it.

### 2.4 A closed row keeps its history; `Days` shows a dash — done

**The engine already kept the history** — `last_contact`, `attempts`,
`next_call` and `last_call` were computed before the status branch and
returned unchanged. Verified, self-tested, no change needed.

**The dash was the missing half, and it is the courier's.** `days: null`
became a blank cell. It is now an em dash (`NO_CLOCK`), uniformly for every
clockless row — `Closed` and `Not emailed` both, because §4's table gives both
a dash. **An em dash, not a hyphen**: a leading hyphen starts a formula in
Sheets.

### 2.5 Found: a real name or nothing — done

`nameFromAddress` is deleted. `found[].name` is the header's display name or
`null`. **`Boone2002@att.net` now yields a blank cell rather than "Boone2002".**

Worth noting: **the answer key always said `null` here.** The engine has moved
to agree with the fixtures, not the other way round.

### 2.6 Found reads headers only — verified, and it already did

Checked directly rather than assumed: `grep '\.body'` across `rules.ts`
returns **exactly one hit**, `failedRecipients(msg.body)` inside the bounce
branch. Auto-reply detection reads the subject. The `found` loop iterates
`[from, ...to, ...cc]` and nothing else. The comment now cites D15.

### 2.7 Threads with more than 10 recipients are ignored — done, courier side

`MAX_THREAD_RECIPIENTS = 10`, named at the top of `Code.gs`. Distinct
addresses across **To and Cc** on **any single message**; more than ten and
the whole conversation is dropped in `fetchThreads_` — so it is never sent,
and therefore never harvested for names either.

**The consequence to know:** a contact whose only conversation is a mass
mailing loses that activity entirely. That is the ruling working, not a bug,
but it is a real behaviour change. Skipped conversations are counted into
`Settings → Last run fetched` so the cap is visible rather than silent.

### 2.8 The install guide — done, plus one thing the brief did not list

All three items: the nine `firm_process` rows are gone from the paste block
(which is now regenerated from the season **request fixture**, so it matches
the answer key row for row — 58 people); send-as aliases are documented,
including the plain statement of where they stop; custom columns are
documented with the **nine headers that must survive** in a table.

**A fourth fix, not in the brief, because leaving it would have broken Jon's
own re-run:** step 22 told him to widen `Calendar looks back (days)` to 1100
but never mentioned **`Mail looks back (days)`**, added after the live run. At
its 365 default the mail search stops ~600 days short of the 2024 season and
would have returned **no conversations at all**. Both windows are now in the
step. (This was the documentation debt named in `00-STATE-OF-PLAY.md` §4.)

Also added: a **"Updating a sheet you already installed"** section — numbered
steps, what re-pasting does and does not touch, and what to check afterwards
(brief §5).

Stale counts corrected throughout: "67 rows" → 58, and the Houlihan
shared-mailbox row removed from the utexas-only list (it was one of the nine
firm rows).

### 2.9 Lonnie Kauppila — done, and the dates do agree

Blocked on the first pass: the Gmail connector was on `jnachman@utexas.edu`
and both threads live in `jnachman17@gmail.com`. Jon reconnected it; the
mailbox was confirmed before searching, and both authorised threads were
fetched. **Nothing was inferred.**

**What the Stage A capture had wrong.** Her one message was recorded
`metadata_only`, with **an empty `To` line** and **the thread id in place of
the message id**. The empty `To` is what broke her: with no address on it the
message belonged to no conversation of hers, so every date read `Not emailed`.

**The real message** (`18d94d79abfedbed`, thread `18d94d171c639c3c`):
outbound `jnachman17@gmail.com` → **`Lonnie.Kauppila@hl.com`**,
2024-02-10T21:06:14Z, subject "Enjoyed Yesterday's Conversation", body now
captured verbatim, and **no reply** — she never answered.

**The date question the brief said needed the real fetch: the two dates agree.**
The brief flagged that the confirmation says 2/9/2024 while the thank-you says
both "yesterday" and "have a good weekend", which do not obviously fit.
Converted to Jon's own clock they fit exactly:

| | Austin time |
|---|---|
| The interview | **Friday 9 February 2024, 12:00pm** (10:00am PST, as Sara's email says) |
| The thank-you | **Saturday 10 February 2024, 3:06pm** |

"Yesterday" is Friday. "Have a good weekend" is what you write on a Saturday
afternoon. **The apparent disagreement was the UTC timestamp** — 21:06Z reads
as a different day than the clock Jon was actually looking at.

**A correction to D16, and it matters.** `14-DESIGN-DECISIONS.md` D16 says the
confirmation thread "matches nobody and is invisible" because "Sara is not a
contact." **Sara Laracca is a contact** — row 48 of the season fixtures, and
one of the 58 tracked people. So that thread is **not** invisible: it lands on
Sara's row like any other mail of hers.

**The conclusion D16 draws is still right, by a different mechanism.** The
thread never reaches *Lonnie*, because Lonnie is named only in the **body**
("Interviewer: Lonnie Kauppila") and referral discovery is **headers only**
(§8, D15). So the interview appears nowhere on her row, exactly as ruled — but
the reason is the headers-only rule, not an unmatched thread. For the
conductor to reconcile.

## 3. The fixtures — and what changed in them

**Exactly twelve expected values changed, all of them one contact, and the
authorising ruling is §2.9.** Nothing else moved.

| File | Row | Was | Now |
|---|---|---|---|
| `season/2024-02-15.expected.json` | 51, Lonnie Kauppila | `Not emailed`, days `null`, last contact `null`, attempts `0` | `Sent`, days `5`, last contact `2024-02-10`, attempts `1` |
| `season/2024-03-15.expected.json` | 51, Lonnie Kauppila | same | `Sent`, days `34`, last contact `2024-02-10`, attempts `1` |
| `season/2024-04-30.expected.json` | 51, Lonnie Kauppila | same | `Sent`, days `80`, last contact `2024-02-10`, attempts `1` |

| `cases/16-nick-gerstein-declined/2024-01-25.expected.json` | 2, Nick Gerstein | `Call cancelled`, days `0` | `Call cancelled`, days **`4`** |

**Authorised by:** §2.9 for Lonnie's twelve, which says in terms what her row
should read — `Sent`, attempts 1, clock from the thank-you. The three `days` values are date
subtractions from **2024-02-10**, her thank-you's date in Austin time, and
were derived from §4 before the engine was run. `2024-01-25` is unchanged: the
thank-you had not been sent yet, so `Not emailed` was always right there.

The matching request files gained her thread, which they never carried before —
with an empty `To` line it contained no tracked address, so `courier_threads`
correctly excluded it.

**And the September 2 clock ruling for the thirteenth** (§5.1). Nick's last
email was four days before the `now` in that fixture; under the anchor this
replaced, the row read 0. Nothing else moved: case 16's other two dates already
computed to the same numbers under both anchors, which is why only one file
changed.

**One number worth noticing.** Season-end `Not emailed` was 1 and is now **0**.
That single row was Lonnie, and the fixtures README called it out as the corpus
capture gap. The gap is closed.

**Nothing else needed to change, which is the interesting result.** All four
behaviour changes from §2 are either new states the 2024 season never produced
(`Call cancelled`), boundaries no fixture sat on (the start-time flip — the key
deliberately avoided mid-event `now`s), already-correct behaviour (`Closed`
keeping its history), or a move *towards* what the key already said
(`found.name: null`). This is verifiable rather than asserted:
`build_fixtures.py` is reproducible, so `git status` on `__fixtures__/` is the
whole audit.

### The two new fixtures, and an honest label on them

- **`cases/16-nick-gerstein-declined`** (3 pairs). Nick's real January thread
  and his real Jan 26 invite, with **one constructed element: the invite
  marked declined by him.** The corpus contains no declined invite, so this
  state cannot be tested from real data alone. Three moments: declined the day
  before (`Call cancelled`, 0 days — *not* `Call scheduled`, which is D10's
  whole defect); 10:15 on the day, where Jon's 09:56 note came before the call
  was due and so does not clear it; and that evening, where his 17:03 note does
  clear it to `Sent`/attempts 3. **This is the only version-2 fixture.**
- **`cases/17-david-talbot-call-starts`** (2 pairs). David's real 3:30–4:00pm
  call asked at **3:29** and **3:31**. Entirely real data — only the two
  clocks are chosen, as every fixture's `now` is. At 3:31 the old end-time
  convention said `Call scheduled` and the new rule says `Call done`, so this
  pair *is* the discriminator between the two readings.

**Both are labelled in the fixtures README as less authoritative than the
other fifteen, and the reason is stated there:** cases 01–15 and the season
snapshots were written by a chat forbidden from reading the engine, and that
independence caught two real bugs. **These two were written by a chat that had
read the engine.** Their expected values were derived from §4's text before the
engine was run, but that is a weaker guarantee and it should not be dressed up
as the same thing.

**The remaining 31 fixtures are still `version: 1` on purpose.** They are the
suite's standing proof that the server understands a version-1 payload
unchanged. `convert_event` emits `declined` only when non-empty precisely so
those files stay byte-identical.

---

## 4. Tests added

- **Self-tests: 71 → 105.** The new ones cover the start-time flip from both
  sides, the mid-call thank-you that the old anchor could not clear,
  `Call cancelled` in five situations (declined ahead, clock after the date,
  cleared by a reply, student-declined, third-party-declined-so-not-cancelled),
  precedence against a rescheduled call, display names in `found`, no invented
  names, both contract versions, and a closed row keeping its history.
- **Two existing self-tests were changed, and both pinned behaviour the
  rulings reversed:** "found name derived from the address" (D4 reversed it)
  and "version mismatch is loud" (which used version 2 as its example of an
  invalid version). Neither was a passing test made to pass differently — both
  asserted the old rule.
- **`courier/helpers.test.js` is new, and it is the courier's first test of any
  kind.** 57 checks, run with `node courier/helpers.test.js` from the repo
  root. It was added rather than left in a scratch directory because Phase B
  depends on exactly this code and two pieces of it are safety-critical: the
  `Pretend today is` parser, where accepting something unreadable is worse than
  failing, and the timezone conversion, which is the same class of bug that
  once put 98 fixture values out by a day.

  It covers the display-name parsing (`"Barman, Barbara" <b@x.com>` — a comma
  inside a quoted name must not become two people; `jamie@x.com <jamie@x.com>`
  — a mail client repeating itself), the recipient cap (ten versus eleven,
  duplicates, capitalisation, one listserv message condemning a whole thread),
  contract-v2 bookkeeping, and the time machine's accepted formats, ten refusal
  cases, and both 2026 DST changeovers from either side.

  **What it cannot reach**, and this is stated in the file itself: everything
  that needs Apps Script — `GuestStatus`, `getMyStatus`, the Gmail and Calendar
  calls, the sheet writes. Those are still only testable by running it for
  real.

---

## 5. Findings — things Jon should rule on

### 5.1 `Call cancelled`'s clock — raised, then ruled, and the ruling was better

**Resolved. This section is kept because the reasoning is the useful part.**

**What was found.** `04-ENGINE-RULES.md` §4 gave `Call cancelled` the clock
"days since it was declined", and that number is **not obtainable**: Google
publishes no timestamp for when an attendee answered an invite — not through
Apps Script's `EventGuest`, not through the Calendar API. A contract cannot
carry a field the courier can never fill. The first build therefore counted
from **the call's own date, floored at zero**, and that was reported as a
judgment needing Jon's eye rather than quietly shipped.

**What Jon ruled, September 2, 2026.** *"Days since is one of the most
important features but for emails. Not calls… When it's a live contact days
since email is super important to know when to bump the thread… If you decline
a call or the banker declined a call it says call cancelled. Resets to days
since if email comes either way."*

**The rule, and it unifies rather than special-cases.** `Days` counts from the
**last thing that actually happened** — an email in either direction, or a call
that took place. **A cancelled call is a non-event**: it does not anchor the
clock, does not reset it, does not touch it. Only the status changes.

**Why it is better than what was built, kept so the reasoning survives.** The
old anchor read 0 for a call declined on Monday and due on Friday — all week —
when the useful fact was that nobody had communicated since Monday. Jon's
version needs no Google timestamp at all, behaves identically whether the
banker or the student declined, and makes `Days` mean one thing in every state
instead of two. **The fix was not to find the missing timestamp; it was that
the clock never needed one.**

**Built as ruled.** `Call done` is untouched — a call that happened is one of
the things that actually happened. The `Math.max(0, …)` clamp on
`Call cancelled` is **gone rather than left as a silent no-op**: the anchor is
always in the past, so it was dead code. `cases/18-doug-melsheimer-declined-late`
is the demonstration on real data — eight days, then nine, where the old anchor
read 0 on both.

**One consequence the ruling introduces, and it is the honest answer.** When a
contact has never exchanged a message and their only call was declined, there
is nothing that ever happened, so `days` is `null` and the sheet shows a dash.
Pinned in the self-tests.

### 5.1b The residue: a decline in advance still holds until the call's date

**Not ruled, and unchanged by the clock ruling. Raised again because it is now
the only open piece.**

Whether the status `Call cancelled` *holds* is still tested against the
**event's start** — "has anyone written after the call was due?" — because that
is the only moment available. So: invite for Friday, banker declines Monday,
banker writes Tuesday "can we do next week?" — on Wednesday the row still reads
`Call cancelled` where `Replied` would be more useful. After the call's date it
clears normally, so this is a bounded window rather than a dead end.

**The clock ruling improved this without closing it.** That row now reads
`Call cancelled, 1` (one day since their email) rather than `Call cancelled, 0`,
so the number is at least meaningful while the status is stale.

Closing it properly needs the same thing the clock turned out not to need: a
moment for the decline. The `Declined: Invitation: …` email carries one and the
engine already classifies those as machine mail — but it exists only when the
counterparty declines, not when the student declines their own invite. **Not
built, and not urgent.**

### 5.2 A real performance regression, found by Jon's run and fixed

**Jon re-pasted the new `Code.gs` on September 2 and reported his run went from
about 30 seconds to 83.** He offered "probably okay". It was not okay, and the
cause was this build.

**Why it mattered.** `11-COURIER-NOTES.md` §3 computes the trigger budget: 65
worked runs a day against 90 minutes of trigger runtime allows **about 82
seconds per run**, and says in terms that "a run averaging two minutes still
breaks this budget". 83 seconds is not comfortable — **it is exactly the
ceiling.**

**What caused it.** `declinedGuests_` asked Google for the student's own answer
— `event.getMyStatus()` — on **every event in the window**. Jon's window is
1,100 days back and 180 forward of a personal calendar, which is thousands of
events, and almost all of them are solo entries with no guests at all. For
those, `getMyStatus()` **throws**, and the code caught it. Thousands of thrown
and caught exceptions, one per dentist appointment.

**The fix, and it is correctness-preserving rather than a trade.** An event
nobody was invited to cannot have been declined — there is no invitation to
decline — so `declinedGuests_` is not called at all when the guest list is
empty. Two smaller ones alongside: `getMyStatus()` is skipped when the guest
list has already reported the student as declined, and
`Session.getEffectiveUser().getEmail()` is asked once per run instead of once
per event.

**The cost is now asserted, not just fixed.** `courier/helpers.test.js` counts
the round trips: a solo event must make **zero** status calls, a guest list
that already answers must make **one**, and otherwise one per guest plus one.
A future change that reintroduces a per-event call fails the test rather than
showing up as a slow run three weeks later.

**The measurement rows are the check.** `Settings → Last run took` should come
back down. If it does not, the next thing to read is
`Gmail calls last run` — if that number is unchanged from before this build,
the remaining time is Calendar, not Gmail.

### 5.3 The recipient cap changes what a contact's row can know

Stated again because it is the one change that can *remove* information:
skipping a thread whole means a contact who only ever appeared on a mass
mailing loses that activity. Ruled, deliberate, and visible in the run
measurement — but a student could in principle notice a row going quiet.

---

## 6. D17 — the time machine, built

`Settings → Pretend today is (TESTING - leave blank)`. Blank in normal use.
When it holds a date, the courier sends that as `now` and **nothing else
changes** — the Gmail search window and the calendar fetch window still run on
real time, so it ages what is there rather than conjuring mail that is not.

The three requirements, and how each is met:

1. **Visibly marked as a testing setting.** Three places, because one is not
   enough. The **label itself** carries the warning — the row reads
   `Pretend today is (TESTING - leave blank)`, so it cannot be mistaken for an
   ordinary setting even by someone who never read the guide. A **third column
   beside it** explains what it does. And whenever it is on, **the run says
   so**: the summary box opens with a starred line naming the pretended date,
   and `Settings → Last run warnings` carries the same sentence as its first
   entry, where it stays until the next run.
2. **`INSTALL.md` tells a student to leave it blank** — in Part B step 3, which
   is one of the four steps a student actually reads, not only in the section
   about the feature.
3. **An unreadable value fails the run loudly.** `pretendNowIso_` throws from
   inside `readSettings_`, which runs **before the first Gmail read** and long
   before the write phase, so nothing is touched. The message names the cell,
   quotes what was typed, and says plainly why Blotter will not guess. Ten
   refusal cases are pinned in `courier/helpers.test.js`, including
   `2026-02-30`, `2025-02-29`, `25:00`, a raw spreadsheet serial, and prose.

**Two judgments inside this that the ruling left open, both documented for the
student:**

- **A date with no time means the end of that day** (23:59:59). This is what
  makes the setting do its stated job: a call booked for 2pm on the pretend
  date has already happened, so `Call done` and `Call cancelled` fire instead
  of the row landing back on `Call scheduled`. A specific moment can still be
  asked for — `2026-09-05 13:00` — and is respected.
- **A date-formatted cell reads back as midnight**, which Sheets uses to mean
  a bare date. Midnight *from a Date cell* is therefore treated as "no time
  given"; a midnight typed as text is respected. The consequence is that
  exactly 00:00:00 cannot be requested from a date cell.

**Accepted formats:** `2026-09-05`, `2026-09-05 14:30`, `2026-09-05T14:30:09`,
`9/5/2026`, `09/05/2026 08:15`, and a real Sheets date cell. Everything else
throws.

**The part most able to be quietly wrong is the timezone**, and it is tested.
`isoInStudentZone_` builds an ISO timestamp whose **offset follows the pretend
date, not today's** — so a January pretend-date gets `-06:00` and a July one
gets `-05:00`, which is the difference between the fixtures being right and
being out by a day. It works by guessing the instant and correcting twice
against what the student's zone actually shows, which settles the DST
boundaries. `courier/helpers.test.js` pins both 2026 changeover days from
either side, using Node's real timezone data as a stand-in for `Utilities`.

---

## 7. What the next chat must not trip over

- **Fetch before trusting a local branch.** Local `main` here is months stale
  and it is what made the brief's §4 wrong.
- **Deploy the server before the courier.** The new `Code.gs` sends
  `version: 2`; the deployed server today speaks only 1 and will 400. It fails
  safely, but the sheet goes stale until both sides ship.
- **The decline path talks to Google once per guest, and it runs against every
  event in the window.** That window is thousands of events on a real
  calendar, so anything added there is multiplied by thousands — which is
  exactly how this build cost Jon 50 seconds a run before it was caught (§5.2).
  The call counts are asserted in `courier/helpers.test.js`; keep them there.
- **`getGuestStatus()` and `getMyStatus()` are still only verifiable for real.**
  The stubs in the test file pin the shape and the cost, not Google's actual
  behaviour. **The first live run with a genuinely declined invite
  is the test**, and Phase B's time machine makes that a five-minute check
  rather than a wait. Everything else in `Code.gs` that changed is pure string
  or date handling and is covered by `courier/helpers.test.js`.
- **Run `node courier/helpers.test.js` after touching `Code.gs`.** It is not
  wired into anything — nothing in this repo runs tests automatically — so it
  only helps if it is remembered.
- **`Call cancelled`'s clock is ruled and built** (§5.1): days since the last
  thing that actually happened, never since the call that did not. If you find
  yourself reaching for the event as an anchor there, that is the reading Jon
  replaced. **What is still open is 5.1b** — whether the *status* should clear
  before the call's date when a decline lands early.
- **D16 in `14-DESIGN-DECISIONS.md` has a wrong reason** (§2.9). Sara Laracca
  *is* a tracked contact, so her confirmation thread is not invisible — it is
  on her row. Lonnie is unreachable from it for a different reason: she is
  named in body text and discovery is headers-only. Same outcome, different
  mechanism, and the conductor owns that file.
- **`build_fixtures.py` is reproducible and should stay that way.** Run it and
  check `git status` is empty before making any fixture change; that is what
  makes "which expected values changed" answerable rather than argued.
- **`convert_event` emits `declined` only when non-empty.** Making it
  unconditional would rewrite all 31 version-1 request files and destroy that
  property.
- **The engine's `found` reads headers only, and there is exactly one
  `.body` read in `rules.ts`.** If a second ever appears, §8/D15 is being
  broken.
- **Nothing outside `web/app/api/engine/` was touched.** The live site is
  untouched; `web/.env.local` was never read.
- **The setup scan and setup diff (O1) were not built**, per the brief.

## 8. Rulings this chat did not have, and did not invent

Recorded for the conductor to reconcile upward — this chat does not edit
`04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`.

1. **§4's `Call cancelled` clock — ruled September 2, and §4 still says the
   old thing.** The table gives it "Days since it was declined", which is not
   obtainable and is no longer what the engine does. It now counts from the
   last thing that actually happened — an email either way, or a call that took
   place (§5.1). **The conductor owns that sentence.**
2. **The start-time flip also moved the "nobody has written since" anchor**
   from the event's end to its start (§2.3). §4 says only that the *status*
   flips.
3. **The dash for `days: null` is rendered by the courier**, uniformly for
   `Closed` and `Not emailed`. §4's table implies it for both; §9's column
   list does not mention it.
4. **D17's unstated details** (§6): a pretend date with no time means the end
   of that day, and a date-formatted cell's midnight counts as "no time
   given". Both are documented for the student in `INSTALL.md`.
5. **A decline in advance does not clear the status until the call's date**
   (§5.1b) — unaddressed by the clock ruling and the last open piece of it.
6. **D16's reason is wrong** (§2.9). Sara Laracca is a tracked contact; the
   confirmation thread is visible on her row and reaches Lonnie only through
   body text, which §8/D15 forbids reading. The ruling's conclusion stands;
   its explanation does not.
