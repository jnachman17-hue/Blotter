# Brief — Phase A: execute the decided changes

Date: September 2, 2026
Model: **Opus.**
Status: **Every change here is already ruled by Jon. There are no decisions left
in this brief** — if you find one, stop and ask rather than choosing.

**One chat does all of it.** The `Call cancelled` change crosses the engine, the
courier and the contract at once, and splitting that across chats is how you get
two halves that do not fit.

---

## 0. Boundaries

- **Never modify an existing file under `web/` outside `web/app/api/engine/`.**
  That directory is a live, public, indexed site with real traffic.
- **Read-only on Gmail and Calendar.** One targeted re-fetch is authorised in
  §2.9 and nothing else. **Never send, draft, reply, label, trash, or touch a
  calendar event. Never open an attachment.**
- **Explicit paths when staging.** Never `git add -A`.
- **Never print or commit a value from `web/.env.local`.**
- **Do not invent a rule.** Everything here is ruled; if something is genuinely
  undecided, write it down and ask Jon.

---

## 1. Read these, in order

1. `CLAUDE.md`
2. `blotter-ib-ws1/docs/workstreams/ws9-build/00-STATE-OF-PLAY.md` — where the
   project is
3. **`04-ENGINE-RULES.md` — version 5. The authority.** Every behaviour change
   below is already written into it
4. **`14-DESIGN-DECISIONS.md` — D1 through D16.** The rulings and the reasoning
5. `05-CONTRACT.md` — you are about to bump it to version 2
6. `09-RULEBOOK-NOTES.md`, `10-TEST-CASE-NOTES.md`, `11-COURIER-NOTES.md` — what
   the three build chats already know. **Read these or you will rediscover
   things that are written down**

---

## 2. The nine changes

### 2.1 Contract to version 2 — do this first, both halves at once

Two additions. **Design them so a version-1 payload would still be understood**,
and bump `version` to `2` on both request and response.

**(a) Addresses may carry a display name.** Today the contract passes bare
addresses, so the engine cannot honestly produce a name for a found person.
Standard form — `Barbara Barman <boone2002@att.net>` — is enough, and the
engine's `parseAddress` already handles it.

**(b) Calendar events must say whether an invite was declined.** This is the
whole reason `Call cancelled` cannot be built today. **Either side declining
cancels the call** — the student or the counterparty. Propose the exact shape,
state it in the contract, and implement both halves to match.

### 2.2 `Call cancelled` — the eighth status

`04-ENGINE-RULES.md` §4. Precedence:

```
Bounced  >  Call scheduled  >  Call done | Call cancelled  >  Replied / Sent
```

**It holds only until somebody writes**, then becomes `Sent` or `Replied` like
anything else — exactly as `Call done` behaves. That self-clearing is the point:
without it the row is a dead end.

The courier must accept the new status; today it aborts a run on any status
outside the legal seven.

### 2.3 A call flips to `Call done` at its **start**

At 2:01pm on a 2:00–2:30 call. Replaces the current end-time convention.
`04-ENGINE-RULES.md` §4.

### 2.4 A closed row keeps its history; `Days` shows a dash

Status `Closed`, `Days` a dash, and last contact, attempts and the call dates
still recomputed and shown.

### 2.5 Found: a real name or nothing. Never an invented one.

`Boone2002@att.net` → "Boone2002" is what happens today and it is garbage.
**Use the display name the header carries; leave the cell blank when there is
none.** Depends on 2.1(a).

### 2.6 Found reads headers only

`04-ENGINE-RULES.md` §8 now says so explicitly. Verify the engine does not read
bodies for referral discovery. Bodies remain in scope for bounce and auto-reply
detection **and nothing else.**

### 2.7 Ignore any thread with more than 10 recipients

**Courier side.** This is the real fix for the 170-classmate incident — a 2022
club listserv one contact happened to be on. The date window made it rarer; this
makes the whole class impossible.

Count distinct addresses across To and Cc on any message in the thread. **Skip
the thread entirely** — do not send it and do not harvest names from it. Named
constant at the top of `Code.gs`.

### 2.8 The install guide

Three things:

- **Strip the nine `firm_process` rows from the "Paste the season" block.** They
  carry no email address, read `Not emailed` forever, and contradict Jon's own
  ruling that version one tracks people and not firms. The fixtures already
  dropped them
- **Document send-as aliases.** The addresses field takes a comma-separated
  list, which covers a `.edu` forwarding into Gmail where the student replies as
  the `.edu`. Already built, never explained
- **Document custom columns.** A student may insert their own LinkedIn, Notes or
  anything else **anywhere**, because `findColumn_` locates columns by header
  text and each Blotter column is written as a single range. Already built,
  never explained. **Say plainly which headers must survive.**

### 2.9 Re-fetch Lonnie Kauppila and rebuild her record

Her corpus record is broken and her expected answer is partly invented.

**Two threads, and this is the one Gmail read authorised in this brief:**

- An interview confirmation from `Sara.Laracca@hl.com` naming Lonnie as
  interviewer **in the body**
- Jon's thank-you sent directly to Lonnie, which she never answered

**Fetch them, record them faithfully, regenerate her fixture.** Her row should
read `Sent`, attempts 1, clock from the thank-you — the confirmation thread
matches no contact and is invisible, which is the people-not-firms ruling
working correctly.

Dates need the real fetch, not inference: the confirmation says 2/9/2024 and the
thank-you says "yesterday" and "have a good weekend", which do not obviously
agree.

---

## 3. The fixtures, and the rule that protects them

The 31 fixtures were written by a chat **forbidden from reading the engine's
code**, and that independence caught two real bugs — a calendar acceptance
counted as a reply, and a forward to family counted as an email to a banker.
**You are about to hold both sides at once, so the discipline has to be
explicit.**

**You may change an expected file only when the change follows directly from a
ruling named in §2.** For every one, record the file, the value, and the ruling
that authorises it.

**Any other red fixture is a finding, not a chore.** Work out whether your code,
the fixture, or the rules document is wrong, and **say which. Do not edit an
expected file to go green.**

**Bar: every fixture passes and every self-test passes**, with a list of exactly
which expected values changed and why. **Add new fixtures for `Call cancelled`
and for the start-time flip** — both are new behaviour with no coverage.

---

## 4. Deployment — and a finding to put to Jon first

**The engine is not deployed.** It exists only on branch
`ws9-learn-and-engine-rules`; `main` has `api/contact` and `api/lead` and no
`api/engine`. **So `https://blotterib.com/api/engine` — which `Code.gs` uses as
its default — is a 404 today.** Jon's live run must have used a Vercel preview
URL.

**Establish where the engine lives before anything else**, and put the options
to Jon in plain English:

- **Merge the branch to `main`**, and it is live at the default URL. Everything
  on the branch is finished work
- **Keep using the branch preview URL**, and change the courier's default

**Raise, do not decide:** merging puts an **unauthenticated public endpoint** on
his production domain. It is stateless, stores nothing and has no database, so
there is no data to leak — but anyone who finds it can make it compute. For a
pilot that is probably fine. **It is Jon's call, and he should make it knowingly.**

---

## 5. Walking Jon through his side

**Jon is not technical.** He will do every step himself, and if instructions
assume anything he is stuck. He has stopped a chat mid-answer for too much
detail.

He will need to re-paste `Code.gs` into his Apps Script editor. **Give him
numbered steps naming exactly what he clicks and what he should see** — and tell
him plainly whether re-pasting loses anything in his sheet, whether he must
re-authorise, and whether the Settings values survive.

Anything he must do in Vercel or GitHub gets the same treatment.

**Say clearly what he should check afterwards to know it worked.**

---

## 6. What you must NOT do

- **Do not touch the live site** outside `web/app/api/engine/`
- **Do not build the setup scan or the setup diff.** Both are open (O1) and
  neither is in this brief
- **Do not add a day threshold anywhere**, for any purpose. The most explicitly
  ruled decision in the project
- **Do not add a status beyond the eight**, or a column beyond §9's
- **Do not edit `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`.** The conductor
  owns those. Record rulings in your notes and they get reconciled upward
- **Do not read Gmail** beyond §2.9's two threads

---

## 7. What to write

- The changes: `web/app/api/engine/`, `courier/`, `05-CONTRACT.md`,
  `courier/INSTALL.md`, Lonnie's corpus record and fixture
- `blotter-ib-ws1/docs/workstreams/ws9-build/16-PHASE-A-NOTES.md` — what changed,
  every expected value you altered with its authorising ruling, anything
  ambiguous, and anything the next chat must not trip over

## 8. How to report back

Plain English. Lead with: **is every fixture green**, what Jon has to do, and
what needs his decision. The deployment question in §4 comes first, because
nothing else is testable until it is settled.
