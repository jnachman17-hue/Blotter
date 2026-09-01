# The contract

Date: September 1, 2026
Status: **Binding.** This is the seam between the two halves of Blotter.

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
  "version": 1,
  "now": "2026-09-01T17:00:00Z",
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
          "date": "2026-08-20T14:05:00Z",
          "from": "jamie.diamond@jpmorgan.com",
          "to": ["someone@gmail.com"],
          "cc": [],
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
      "start": "2026-08-22T19:00:00Z",
      "end": "2026-08-22T19:30:00Z",
      "attendees": ["jamie.diamond@jpmorgan.com", "someone@gmail.com"],
      "organizer": "someone@gmail.com"
    }
  ],
  "ignored": ["recruiting@somefirm.com"]
}
```

### Field rules

| Field | Rule |
|---|---|
| `now` | **Comes from the courier, never from the server's clock.** This is what makes the engine testable against a past season — a test can ask "what was true on 1 February 2024?" |
| `row` | The sheet row number. **The join key.** The server echoes it back and otherwise ignores it; the server knows nothing about spreadsheets |
| `emails` | Every address known for that person. Matching **ignores capitalisation** |
| `closed` | Read from the student's `Closed` column |
| `is_outbound` | Courier sets this: true when `from` is one of `student.addresses` |
| `body` | Plain text, no quoted history. Needed for bounce and auto-reply detection and nothing else |
| `ignored` | Addresses the student has already rejected in "found these". Never suggested again |

**Timestamps are ISO 8601 with a timezone. Always. No exceptions.**

---

## Response — server to courier

```json
{
  "version": 1,
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
| `status` | Exactly one of: `Not emailed`, `Bounced`, `Sent`, `Replied`, `Call scheduled`, `Call done`, `Closed`. **No other value is ever valid** |
| `days` | Whole days, per `04-ENGINE-RULES.md` §4. `null` where the state has no clock |
| `attempts` | Times written since they last wrote back. `0` where nothing has been sent |
| `next_call` / `last_call` | `null` when there is none. Never an empty string |
| `found` | New people, for the student to approve. Never auto-added |
| `warnings` | Things the student should know but that are not errors — an event that matched nobody, an address seen in two capitalisations |

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
a version bump**, and both sides ship together. `version: 1` is in the request
and the response so a mismatch is loud rather than mysterious.
