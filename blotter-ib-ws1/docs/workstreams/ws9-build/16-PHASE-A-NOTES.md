# Phase A notes — what changed, and what the next chat must not trip over

Date: September 2, 2026
Brief: `15-BRIEF-PHASE-A.md`
Status: **Eight of the nine changes are built and green. §2.9 is blocked and
needs one thing from Jon** (§6 below).

| Check | Result |
|---|---|
| `npx tsx web/app/api/engine/run-fixtures.ts` | **36 of 36 pass** (31 existing + 5 new) |
| `npx tsx web/app/api/engine/selftest.ts` | **105 of 105 pass** (was 71) |
| Expected values changed in the existing 31 | **None. Zero.** See §3 |
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
| A live POST of a one-contact request | `attempts: 1`, warnings capped at ten | The deployed build carries `752cddd` (the forward ruling) and `5078da2` (the warnings cap) — the branch head's code |

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

**One judgment call inside this, and Jon should see it — see §5.1.** The rules
say the clock is "days since it was declined." **Google exposes no timestamp
for when someone answered an invite**, in Apps Script or in the Calendar API.
So the clock is days since **the call was due**, floored at zero.

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

### 2.9 Lonnie Kauppila — BLOCKED. See §6.

---

## 3. The fixtures — and what changed in them

**Every expected value in the original 31 fixtures is unchanged. Not one was
edited.** This is verifiable rather than asserted: `build_fixtures.py` is
reproducible (regenerating before any change produced byte-identical files),
so `git status` on `__fixtures__/` is the whole audit, and it shows only the
README and two new directories.

**Nothing needed to change, which is the interesting result.** All four
behaviour changes are either new states the 2024 season never produced
(`Call cancelled`), boundaries no fixture sat on (the start-time flip — the
key deliberately avoided mid-event `now`s), already-correct behaviour
(`Closed` keeping its history), or a move *towards* what the key already said
(`found.name: null`).

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
- **The courier's pure helpers were exercised in Node** — 27 checks over the
  display-name parsing and the recipient cap. The courier has no test file in
  the repo, so this ran from a scratch harness; the helpers are pure, so any
  chat can redo it by evaluating `Code.gs` in a `new Function` and calling
  `namedAddressList_`, `bareAddress_` and `exceedsRecipientCap_` directly.
  Cases covered include `"Barman, Barbara" <b@x.com>` (a comma inside a quoted
  name must not split one person into two), `jamie@x.com <jamie@x.com>` (a
  mail client repeating the address as the name), exactly-ten vs eleven
  recipients, and duplicate and mixed-capitalisation recipients.

---

## 5. Findings — things Jon should rule on

### 5.1 `Call cancelled`'s clock cannot be what the rules ask for

`04-ENGINE-RULES.md` §4 gives `Call cancelled` the clock **"Days since it was
declined."** That number is not obtainable. **Google exposes no timestamp for
when an attendee answered an invite** — not through Apps Script's `EventGuest`,
and not through the Calendar API. The contract cannot carry a field the
courier can never fill.

**What is implemented instead: days since the call was due, floored at zero** —
the same anchor `Call done` uses, which keeps the pair that sits at one
precedence level symmetric. A call declined a week in advance reads
`Call cancelled` with **0 days** until its date passes, then counts up.

**The consequence worth Jon's eye.** Because the anchor is the call's date and
not the decline, a decline that happens *before* the call date cannot be
cleared by writing until that date arrives. Concretely: invite for Friday,
banker declines Monday, banker writes Tuesday "can we do next week?" — on
Wednesday the row reads `Call cancelled`, where `Replied` would be more useful.
**After the call's date the state clears normally**, so this is a bounded
window, not a dead end. The brief said to make it behave "exactly as
`Call done` behaves", and that is what this is.

**A fix exists if Jon wants it, and it is not free.** The decline usually
arrives as an email — `Declined: Invitation: …` — which the engine already
classifies as machine mail and which carries a real timestamp. Using it would
close the window, but it couples two mechanisms and only works when that mail
exists (it does not when the student declines their own invite). Not built, on
the brief's instruction not to invent.

### 5.2 The `days` clamp is a judgment, and it is small but real

`Math.max(0, …)` on `Call cancelled`. The alternative — negative days for a
call still ahead — reads badly and sorts strangely under "longest-waiting
first". Recorded so it is a decision rather than an accident.

### 5.3 The recipient cap changes what a contact's row can know

Stated again because it is the one change that can *remove* information:
skipping a thread whole means a contact who only ever appeared on a mass
mailing loses that activity. Ruled, deliberate, and visible in the run
measurement — but a student could in principle notice a row going quiet.

---

## 6. §2.9 — Lonnie Kauppila is blocked, and the unblock is one thing

**Not done. Nothing about Lonnie was changed** — not her corpus record, not her
fixture, not her expected value. She still reads `Not emailed`.

**Why: the connected Gmail account is the wrong one of Jon's two.** The Gmail
connector in this session is authenticated as **`jnachman@utexas.edu`**. Both
of the threads the brief authorises live in **`jnachman17@gmail.com`** — the
corpus records both under `source_mailbox: jnachman17@gmail.com`.

What was searched, and found empty:

| Query | Result |
|---|---|
| `to:Lonnie.Kauppila@hl.com OR from:Lonnie.Kauppila@hl.com` | nothing |
| `Kauppila in:anywhere` | nothing |
| `subject:"Enjoyed Yesterday's Conversation"` | nothing |
| `Laracca OR "First Round Interview Confirmation"` | nothing |
| `from:hl.com in:anywhere` | 6 threads, **all `jnachman@utexas.edu`**, none from Sara Laracca |

The account is not empty and it is not the wrong search — it holds plenty of
real January 2024 Houlihan Lokey mail, including the Samuel Ward thread with
the forward to `dmnachman@gmail.com` that produced the §3 forwarding ruling.
**It simply is not the mailbox those two threads are in.**

**What was deliberately not done, and why.** The recipient is not actually in
doubt — the brief, the corpus's `addresses_seen` and the thread's filing all
say the thank-you went to Lonnie — so adding the missing `To` line would flip
her row to `Sent`/attempts 1 as the brief says it should. **That was not done
on purpose.** It would put a `days` value into the answer key computed from
`2024-02-10`, the exact date the brief flags as unverified ("the confirmation
says 2/9/2024 and the thank-you says 'yesterday' and 'have a good weekend',
which do not obviously agree"). Writing an unverified number into the answer
key is the thing `15-BRIEF-PHASE-A.md` §3 exists to prevent.

**To unblock: connect `jnachman17@gmail.com` to the Gmail connector,** and the
fix is then small — two threads, one corpus record, one regeneration.

---

## 7. What the next chat must not trip over

- **Fetch before trusting a local branch.** Local `main` here is months stale
  and it is what made the brief's §4 wrong.
- **Deploy the server before the courier.** The new `Code.gs` sends
  `version: 2`; the deployed server today speaks only 1 and will 400. It fails
  safely, but the sheet goes stale until both sides ship.
- **Two things in the courier are untestable from this machine and were
  therefore written defensively rather than verified:** `getGuestStatus()`
  against `CalendarApp.GuestStatus.NO`, and the `getMyStatus()` fallback for
  the student's own decline (wrapped in `try/catch` — an event with no guests
  has no "my status"). **The first live run with a genuinely declined invite
  is the test.** Everything else in `Code.gs` that changed is pure string
  handling and was exercised in Node.
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

1. **§4's `Call cancelled` clock** — "days since it was declined" is not
   obtainable; the implementation uses the call's own date, floored at zero
   (§5.1). §4 needs one sentence.
2. **The start-time flip also moved the "nobody has written since" anchor**
   from the event's end to its start (§2.3). §4 says only that the *status*
   flips.
3. **The dash for `days: null` is rendered by the courier**, uniformly for
   `Closed` and `Not emailed`. §4's table implies it for both; §9's column
   list does not mention it.
