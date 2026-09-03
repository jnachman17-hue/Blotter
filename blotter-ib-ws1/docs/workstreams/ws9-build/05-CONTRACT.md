# The contract

Date: September 1, 2026
Version: **3.** Amended September 2, 2026 after the first live install:
**`attempts` may now be `null`**, because D24 rules that a column shows a
number only where that number means something.

Previously: version 2, September 2, 2026 — addresses may carry a display
name, and calendar events say whether an invite was declined. Both additions
were forced by rulings the engine could not otherwise obey: D4 (`found` never
invents a name from an address) and D10 (`Call cancelled`, the eighth status).
Status: **Binding.** This is the seam between the two halves of Blotter.

**Older versions are still understood.** The server speaks 1, 2 and 3, and the
response echoes back the version it was asked in, so a request in flight during
a deploy is never rejected outright.

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
  "version": 2,
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
          "body": "Happy to chat. Send a calendar invite.",
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
| `body` | Plain text, no quoted history. Needed for bounce and auto-reply detection and nothing else. **Never read for anything else** — referral discovery is headers only (rules §8) |
| `ignored` | Addresses the student has already rejected in "found these". Never suggested again |
| `version` | `1`, `2` or `3`. The server understands all three and **answers in the version it was asked in** |
| any address | May be bare (`a@b.com`) or named (`A B <a@b.com>`). Matching uses the address and ignores capitalisation; the name is only ever used to name a found person |
| `declined` | **Version 2.** Addresses that answered No to this invite. Optional; absent means nobody declined |

**Timestamps are ISO 8601 with a timezone. Always. No exceptions.**

---

## Response — server to courier

```json
{
  "version": 2,
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
  "warnings": []
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

## Changing this file

Any change is a change to two codebases at once. **It requires Jon's ruling and
a version bump**, and both sides ship together. `version` is in the request and
the response so a mismatch is loud rather than mysterious.

**Deploy order matters, and only in one direction.** The server understands
every version, so a new server with an old courier is safe. The reverse is
not: a courier sending a version its server does not know gets a 400 and writes
nothing until the server catches up. **Ship the server first.**

**Why version 3 was bumped for what is only a widened type.** `attempts` went
from "always a number" to "sometimes absent". An un-bumped older courier would
not crash on that — it would quietly write a blank cell where a dash belongs —
and **a silent wrong-looking answer is exactly what the version number exists
to prevent.** The rule in this section says any change needs a bump; eroding it
for a change that happens to fail gently is how it stops being trusted.
