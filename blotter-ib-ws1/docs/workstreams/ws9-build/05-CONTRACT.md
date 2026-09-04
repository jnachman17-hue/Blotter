# The contract

Date: September 1, 2026
Version: **4.** Amended September 3, 2026, before anyone else gets a copy.
**The server no longer receives the text of an email**, and the response gains
a channel for telling a student something.

Previously: version 3, September 2, 2026 —
**`attempts` may now be `null`**, because D24 rules that a column shows a
number only where that number means something.

Previously: version 2, September 2, 2026 — addresses may carry a display
name, and calendar events say whether an invite was declined. Both additions
were forced by rulings the engine could not otherwise obey: D4 (`found` never
invents a name from an address) and D10 (`Call cancelled`, the eighth status).
Status: **Binding.** This is the seam between the two halves of Blotter.

## Version 4 refuses older versions, and that is a change of kind

Every earlier bump was additive, so an older payload still meant what it always
meant and the server kept accepting it. **Version 4 cannot afford that.**

**It removes `body`, and a version-3 courier still sends one.** Accepting it
would mean carrying on receiving the text of people's email — the exact thing
this version exists to stop.

**And the other direction fails silently, which is worse.** A version-4 courier
talking to a version-3 server sends no bodies to a server that expects them:
bounces simply stop being detected, with no error and nothing visibly
different, leaving a row quietly reading `Sent` for an address that does not
exist. **The version check is the only thing that turns that silence into a
loud failure**, so it refuses rather than tolerates.

**Ship the server first, then the courier.**

**What the version number does and does not describe.** It describes the
**shape of the wire** — which fields exist and what types they may hold. It has
never described the **rules**: the engine has one set of judgments and they are
always the current ones, so a version-1 request already receives every ruling
made since version 1. That is deliberate. There is one server and one courier
and they ship together; the version exists so a *shape* mismatch is loud rather
than mysterious, not to keep old behaviour alive.

Three chats build against this file. **None of them may change it.** If a chat
believes the contract is wrong, it stops and says so rather than working around
it — a private workaround is how three chats that each work separately fail
together.

---

## The shape of the system

```
   the student's Google account          Blotter's server
  ┌──────────────────────────┐         ┌──────────────────┐
  │  their Sheet             │         │                  │
  │  their Gmail             │ ──────► │   THE RULEBOOK   │
  │  their Calendar          │  facts  │  (engine rules)  │
  │                          │ ◄────── │                  │
  │  THE COURIER (a script)  │  rows   │                  │
  └──────────────────────────┘         └──────────────────┘
```

**The courier is dumb.** It fetches, posts, and writes down the answer. It makes
no judgments. Every rule in `04-ENGINE-RULES.md` lives on the server.

**The server is stateless.** Everything it needs arrives in the request; it
stores nothing and remembers nothing between calls. **Version one needs no
database** — the student's own sheet holds all the state there is.

Two consequences worth understanding: the server is trivially testable, because
the same input always produces the same output; and there is no user data at
rest on Blotter's infrastructure, ever.

---

## Request — courier to server

`POST /api/engine`

```json
{
  "version": 4,
  "now": "2026-09-01T17:00:00-05:00",
  "student": { "addresses": ["someone@gmail.com"] },
  "contacts": [
    {
      "row": 2,
      "name": "Jamie Diamond",
      "firm": "JPMorgan",
      "emails": ["jamie.diamond@jpmorgan.com"],
      "closed": false
    }
  ],
  "threads": [
    {
      "thread_id": "18c2f...",
      "messages": [
        {
          "id": "18c2f0a...",
          "date": "2026-08-20T14:05:00-05:00",
          "from": "Jamie Diamond <jamie.diamond@jpmorgan.com>",
          "to": ["someone@gmail.com"],
          "cc": ["Liz Ream <liz.ream@jpmorgan.com>"],
          "subject": "Re: Intro",
          "failed_recipients": [],
          "is_outbound": false
        }
      ]
    }
  ],
  "events": [
    {
      "id": "abc123",
      "title": "Jamie - Alex JPM IB Call",
      "start": "2026-08-22T14:00:00-05:00",
      "end": "2026-08-22T14:30:00-05:00",
      "attendees": ["jamie.diamond@jpmorgan.com", "someone@gmail.com"],
      "declined": [],
      "organizer": "someone@gmail.com"
    }
  ],
  "ignored": ["recruiting@somefirm.com"]
}
```

### Version 2 added two things, and nothing else

**(a) Any address may carry a display name.** The standard header form —
`Barbara Barman <boone2002@att.net>` — is accepted anywhere an address is
accepted: `from`, `to`, `cc`, `attendees`, `organizer`, `emails`,
`student.addresses`, `ignored`. A bare address is still perfectly legal and
means the same thing it always did.

**The courier must pass the name through when the header has one**, because
the server cannot invent one. `Boone2002@att.net` → "Boone2002" is what the
server used to do, and it is garbage (rules §8, decision D4). The display
name is the only honest source of a real name.

**(b) An event says who declined it.** A new `declined` list on each event
names the addresses that answered **No** to that invite. Absent or empty
means nobody declined — which is exactly what a version-1 event means, so
version-1 payloads keep their old meaning unchanged.

The engine needs this and cannot infer it: without it a declined invite left
a row reading `Call scheduled` forever for a meeting nobody would attend
(rules §4, decision D10). It is deliberately the minimum — **declines only.**
Accepted, tentative and no-answer-yet are not carried, because no rule reads
them.

**Only the two sides of the call matter.** A decline cancels the call when the
declining address is the **contact's** or the **student's**. A third party on
the invite declining does not cancel anybody's call.

**The student's own decline counts and must be sent.** Where the student is
the organiser, the courier reports their own address in `declined` when their
answer is No.

### Field rules

| Field | Rule |
|---|---|
| `now` | **Comes from the courier, never from the server's clock.** This is what makes the engine testable against a past season — a test can ask "what was true on 1 February 2024?" |
| `row` | The sheet row number. **The join key.** The server echoes it back and otherwise ignores it; the server knows nothing about spreadsheets |
| `emails` | Every address known for that person. Matching **ignores capitalisation** |
| `closed` | Read from the student's `Closed` column |
| `is_outbound` | Courier sets this: true when `from` is one of `student.addresses` |
| `failed_recipients` | **Version 4.** The addresses a delivery-failure notice names. Empty on every other message. Replaces `body`, which no longer exists |
| `key` | What the student pasted into `Settings → Blotter key`, or empty. Read by nothing until billing is switched on |
| `install_id` | Which sheet is asking. A random id minted once per spreadsheet. **A key belongs to a sheet, not to a person** — see below |
| `courier_version` | Which build of the script is asking, so an old one can be told there is a newer one |
| `ignored` | Addresses the student has already rejected in "found these". Never suggested again |
| `version` | `4`, and only `4`. Anything else is refused with a 400 naming the fix |
| any address | May be bare (`a@b.com`) or named (`A B <a@b.com>`). Matching uses the address and ignores capitalisation; the name is only ever used to name a found person |
| `declined` | **Version 2.** Addresses that answered No to this invite. Optional; absent means nobody declined |

**Timestamps are ISO 8601 with a timezone. Always. No exceptions.**

### Blotter's server never receives the text of an email

**There is no `body` field. A request carrying one is rejected**, not quietly
ignored — the difference matters, because a field silently dropped is a promise
and a field refused is a guarantee.

This is checkable rather than trusted: read the request shape above, and read
`validate.ts`, which fails on `body` before anything else runs.

**It is a small change because the engine barely used one.** It read a body in
exactly one place, for exactly one purpose — finding which address a
delivery-failure notice was complaining about. Auto-replies are detected from
the **subject**, which is a header. Nothing else ever opened one.

**The courier does that extraction now**, and only the addresses travel.
**This does not break the dumb-courier rule**: pulling email addresses out of a
machine-generated delivery notice is mechanical extraction, not a judgment
about recruiting. *What a bounce means* — which outbound it answers, whether
the row reads `Bounced`, and never the `Status:` code, which the real data
shows lying — all of that stays on the server.

---

## Response — server to courier

```json
{
  "version": 4,
  "rows": [
    {
      "row": 2,
      "status": "Sent",
      "days": 12,
      "last_contact": "2026-08-20",
      "attempts": 2,
      "next_call": null,
      "last_call": "2026-08-15"
    }
  ],
  "found": [
    {
      "email": "liz.ream@jpmorgan.com",
      "name": "Liz Ream",
      "first_seen": "2026-08-21",
      "context": "Appeared in a thread with Jamie Diamond"
    }
  ],
  "warnings": [],
  "notice": {
    "level": "blocked",
    "text": "Blotter is now a paid product. Your sheet has stopped updating.",
    "url": "https://blotterib.com/billing"
  }
}
```

### Field rules

| Field | Rule |
|---|---|
| `version` | **Echoes the request's version.** Asked in 1, answered in 1; asked in 2, answered in 2 |
| `status` | Exactly one of: `Not emailed`, `Bounced`, `Sent`, `Replied`, `Call scheduled`, `Call done`, `Call cancelled`, `Closed`. **No other value is ever valid** |
| `days` | Whole days, per `04-ENGINE-RULES.md` §4. **`null` where the state has no clock.** See the table below |
| `attempts` | Times written since they last wrote back — **and `null` wherever that number would not mean anything.** See the table below |
| `next_call` / `last_call` | `null` when there is none. Never an empty string. **A declined call is neither** — it is not upcoming and it did not happen |
| `found` | New people, for the student to approve. Never auto-added |
| `found[].name` | The display name the header carried, or **`null`**. **Never derived from the address** (rules §8, decision D4) — a real name or nothing |
| `warnings` | Things the student should know but that are not errors — an event that matched nobody, an address seen in two capitalisations |
| `notice` | **Version 4.** A message from the server to the student, or absent. `level` is `info`, `warning` or `blocked`; `url` may be `null` |
| `design_version` | A short label for the current design. **The courier keeps the last one it applied and does nothing while they match** — a full re-format is ten to fifteen seconds and must never run on an ordinary pass. Different, and it fetches `GET /api/design` |

### Where `days` and `attempts` carry a number (version 3, D24)

| Status | `days` | `attempts` |
|---|---|---|
| `Sent` | days since **you** wrote | **the count** |
| `Replied` | days since **they** wrote | `null` |
| `Call done` | days since the call — the thank-you clock | `null` |
| `Call scheduled` | `null` | `null` |
| `Call cancelled` | `null` | `null` |
| `Bounced` | `null` | `null` |
| `Closed` | `null` | `null` |
| `Not emailed` | `null` | `null` |

**The principle: a column carries a number only when that number means
something, and `null` when it does not.** `Replied` always has zero attempts by
definition, and sending that zero is noise dressed as data. `Call scheduled`
used to count *down* to a call while every other state counted *up* from an
email — one column, two directions — and `next_call` already carries the date.

**The engine decides this, never the courier.** The courier renders `null` as a
dash and makes no judgment about which states deserve a number.

**`Call cancelled` is the eighth status, and version 2 introduced it.** It can
only arise from a `declined` list, which only a version-2 request carries — so
a version-1 client is never sent a status it does not know. A courier speaking
version 2 must accept all eight.

**Every contact in the request gets exactly one row back, in the same order.**
A contact the server cannot compute still gets a row, with `status` set to its
best honest answer. **Silently dropping a contact is forbidden** — a missing row
means a blank line in someone's tracker and no explanation.

---

## Errors

Server unreachable, or any non-200: **the courier writes nothing and leaves the
sheet exactly as it is.** A stale sheet is recoverable. A half-written one is
not, and the student cannot tell the difference between "Blotter is down" and
"this relationship is over."

The courier may write a quiet timestamp of its last successful run. Nothing else.

---

## Adding a field is not a version change

**This is the rule that decides what every future idea costs**, and it is worth
more than any single field below.

**Both sides ignore what they do not recognise.** The server reads the fields it
knows from a request and leaves the rest alone; the courier reads the fields it
knows from a response and leaves the rest alone. Neither rejects a stranger.

**So most additions need no version bump and nobody re-pastes anything:**

| Change | Version bump? | Why |
|---|---|---|
| **Add a request field** | **No** | An older server ignores it |
| **Add a response field** | **No** | An older courier ignores it |
| **Stop sending an optional field** | **No** | Absent already had to mean something |
| **Remove a field something reads** | **Yes** | A reader would silently get nothing |
| **Change what a field means** | **Yes** | The worst kind, because nothing looks wrong |
| **Change a type** — a number that may now be null | **Yes** | Version 3 did exactly this |
| **Refuse something previously accepted** | **Yes** | Version 4 did exactly this, for `body` |

**The test to apply is not "is this new" but "can an old reader be wrong
without noticing".** If it can, bump. If it can only be *unaware*, do not.

### The refinement, learned by applying the rule to a removal

**`account` was removed on September 3 and the version did not move**, which
looks like a contradiction of the table above. It is not, and the distinction
is worth keeping.

Removing a field forces a bump **because a reader gets nothing where it
expected something**. But `account` was optional from the day it existed and
**absence already had a defined, safe meaning**: no pseudonym sent meant "do not
flag", and flagging never refused a run anyway. So a server still reading it
receives `null`, behaves exactly as designed, and cannot be wrong.

**The sharpened rule: removing a field is safe precisely when absence was
already a state the reader handled correctly.** If a field's absence was never
specified, removing it is a bump. If absence was always meaningful, it is not.

**Version 4 gained three request fields and one response field under this rule
and stayed at 4:** `key`, `account` and `courier_version` going out, and
`design_version` coming back. A student who never updates their script keeps
working exactly as before — they simply do not get the new things. **That is
what this rule buys, and it is why it was written down before it was needed.**

---

## Changing this file

Any change is a change to two codebases at once. **It requires Jon's ruling and
a version bump**, and both sides ship together. `version` is in the request and
the response so a mismatch is loud rather than mysterious.

### The notice channel, and why it is a sheet cell rather than a dialog

**A timed run has no UI context, so it cannot open a dialog** — and a refused
run writes nothing at all. Without this channel, a student whose access was
withdrawn would watch their sheet quietly stop updating and conclude it had
broken. They would be right to.

**The courier writes it into row 1 of Contacts, in the columns past everything
the sheet uses.** Row 1 is frozen, so it stays on screen however far down they
scroll, and **it shifts nothing**: data still starts at row 2, and the row
number is still this contract's join key. A banner row above the headers would
move every data row down one and break that key in eleven places.

**A `blocked` notice survives a refused run.** That is the entire point of the
level existing: when the server says no, the courier writes nothing *except*
the notice. It is a deliberate, narrow exception to the write-nothing-on-
failure rule — the notice cell only — and it is commented as one in `Code.gs`.

**The engine emits no notice today.** It is stateless and has nothing to base
one on. The pipe is built now because the moment a hundred students hold a
copy, adding it means asking a hundred people to re-paste a script.

---

## The other endpoints, and why each is separate

| Route | For | Why not part of `/api/engine` |
|---|---|---|
| `POST /api/telemetry` | Counting installs; binding a key to an account | **Writes.** The engine must not, or "the engine stores nothing" stops being true |
| `GET /api/design` | Colours, widths, copy | Changes monthly, not per run. Carrying it every run would put a payload on the tightest budget in the system |
| `GET /api/entitlement` | What the enforcement switch is set to | So it can be checked with `curl` rather than believed |
| `GET /api/script` | The current script | So the update notice has somewhere to point that never goes stale |

**Binding a key to an account lives on telemetry, not the engine, and that is
deliberate.** Binding is a write. The engine reads whether a key is valid and
writes nothing at all, which is what keeps its claim checkable.

---

## Counting installs happens somewhere else entirely

**`POST /api/telemetry`, never a field on `/api/engine`, and the separation is
the point rather than a preference.**

The engine has no database, no logging and no file writes. **"The engine stores
nothing" is therefore a fact anyone can verify by reading it, not a promise** —
and putting a counter inside it would end that permanently, in exchange for
saving one HTTP request.

**What that endpoint may carry, exhaustively:** a random per-sheet install id,
the two version strings, a timestamp, a count of contacts, a run duration, and
whether the run worked.

**What it may never carry:** a name, an address, a subject, a body, a firm —
anything a person could be recognised from. The route takes an allow-list, so
an unexpected field is dropped rather than stored.

**The install id identifies a sheet, never a person.** It is a random UUID
minted on first run and kept in the script's own properties; a copied sheet
mints its own, which is correct, because a copy is a new install.

**Telemetry failing must never fail a run.** The courier fires and forgets.

---

**Deploy order matters, and only in one direction.** The server understands
every version, so a new server with an old courier is safe. The reverse is
not: a courier sending a version its server does not know gets a 400 and writes
nothing until the server catches up. **Ship the server first.**

**Why version 4 does not keep older versions alive, when every bump before it
did.** Because tolerance here means continuing to accept message bodies, and
because the opposite mismatch — a new courier against an old server — loses
bounce detection *silently*. Refusing is the only way either failure is
visible.

**Why version 3 was bumped for what is only a widened type.** `attempts` went
from "always a number" to "sometimes absent". An un-bumped older courier would
not crash on that — it would quietly write a blank cell where a dash belongs —
and **a silent wrong-looking answer is exactly what the version number exists
to prevent.** The rule in this section says any change needs a bump; eroding it
for a change that happens to fail gently is how it stops being trusted.
