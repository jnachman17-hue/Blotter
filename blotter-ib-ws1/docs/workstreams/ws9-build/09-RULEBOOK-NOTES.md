# Rulebook notes — what was built, and every judgment call

Date: September 1, 2026
Status: Built, self-tested, endpoint verified live. **Fixtures had not landed when this
was written**; the runner is ready for them.

---

## 1. What exists now

`POST /api/engine` in the Next.js app, per `05-CONTRACT.md`. Six files, all inside
`web/app/api/engine/` — no existing file under `web/` was touched:

| File | What it is |
|---|---|
| `route.ts` | HTTP only: parse, validate, answer. No rules live here |
| `rules.ts` | **The engine.** Pure functions of the request; section comments carry the §-numbers of `04-ENGINE-RULES.md` they transcribe |
| `validate.ts` | Rejects a malformed request with a 400 naming the field. Loud, because the contract makes non-200 the safe failure: the courier writes nothing |
| `types.ts` | The contract's shapes, transcribed |
| `selftest.ts` | 62 checks written by this chat, for the plumbing. Not the acceptance bar |
| `run-fixtures.ts` | Runs the engine against `__fixtures__/` when the test chat's files land |

Run them from the repo root (nothing was added to `package.json` — modifying it is
modifying an existing file, which the brief forbids):

```bash
npx tsx web/app/api/engine/selftest.ts
npx tsx web/app/api/engine/run-fixtures.ts
```

Verified: `tsc --noEmit` clean, `eslint` clean, `next build` succeeds with every
existing page unchanged, and the endpoint answered the contract's example request
correctly on a live dev server. Error paths return 400 with the field named, 405 on
GET, 500 on an engine fault — never a partial answer.

**No new environment variable, no new service, no database.** The endpoint deploys
with the existing Vercel project as-is, exactly as the brief requires.

---

## 2. Where the rules were ambiguous, and what was done

Everything below is a place `04-ENGINE-RULES.md` or `05-CONTRACT.md` left open. None
is invented silently: each is implemented one way, documented here, and **the ones
marked ⚠ need Jon's ruling or fixture reconciliation.**

### 2.1 ⚠ What "days" counts — calendar dates, in the timestamp's own timezone

"Whole days" is not defined. Two readings disagree: 36 hours is 1 day by elapsed
time but can be 1 *or 2* calendar days. The contract's own example pairs
`last_contact: 2026-08-20` with `days: 12` on September 1 — a **date subtraction** —
so the engine subtracts calendar dates. A call tomorrow morning is `1` day away
however few hours remain tonight.

Which timezone defines "the date": the engine has none of its own and must not
invent one, so it reads each timestamp's date **in the offset the courier wrote**
(the first ten characters of an ISO timestamp with offset are its local date). The
courier therefore controls the student's calendar by choosing offsets. **Open
question for the courier chat and Jon: should the courier write timestamps in the
student's timezone?** If it sends everything in UTC, a late-evening Austin email
lands on tomorrow's date.

### 2.2 ⚠ `next_call` carries the full start timestamp

The contract's only `next_call` example is `null`, while `last_call`'s example is a
bare date, and §9's sheet shows `1/17 @ 2:00 PM`. The engine returns the upcoming
event's `start` **exactly as the courier sent it** (full ISO timestamp), because a
bare date cannot be un-truncated and the sheet displays a time of day. `last_call`
is a bare date, matching the contract example. If the fixtures encode a different
`next_call` format, that is a contract gap to close, not a bug in either side.

### 2.3 "Bounced" is about the last word, not a permanent mark

§4 says "last email came back undelivered." Implemented as: the state is `Bounced`
when the **most recent** message in the relationship is an outbound with a matching
bounce. When the person later writes back from an address that works — Marijoy
Bertolini did, and it produced four interview rounds — the last word is theirs and
the row moves to `Replied`. A bounce is matched to the outbound it answers by the
failed recipient named in its body against that outbound's To/Cc.

Two documented edges: a mailer-daemon message naming no address still counts
against an outbound it directly follows in the same thread; and ⚠ if one outbound
goes to a contact *and* an untracked address and only the untracked copy bounces,
the row shows `Bounced` even though the contact's copy was delivered. That reading
was chosen because it is the one that protects the Sean Kang case (guessed
addresses that are not in the sheet must still bounce the row); the partial-failure
edge is rarer and self-heals when the delivered person replies. Jon may rule the
other way.

### 2.4 ⚠ Bounce senders are `mailer-daemon@…` and `postmaster@…`

The rules say "the bounce sender" without enumerating. All six real bounces came
from `mailer-daemon@googlemail.com`; `postmaster` is the other standard
delivery-failure sender and was included. Nothing else is treated as a bounce
source. Per the brief, the `Status:` code in the body is **never** read — the real
Stifel bounce says `Status: 4.4.2` while the address does not exist, and the
self-test pins that exact body.

### 2.5 Auto-replies: narrow detection, marked in `warnings`

§6 says "marks an auto-reply where it can tell, and otherwise says nothing."
Detection is subject-line markers only ("Automatic reply", "Out of office",
"Vacation reply" and close variants — the forms Outlook and Gmail actually stamp;
the one real case is Outlook's `Automatic reply:` prefix). A message it cannot
tell is treated as a real reply, because the silent failure of guessing the other
way is erasing a real person. "Marks" is implemented as a `warnings` line naming
the message, since the response has no other channel for it.

### 2.6 ⚠ The calendar title match tolerates abbreviations

§7's title rule is "first name plus firm," and it promises to catch Owen Sherry.
The real titles abbreviate: `JPM` for J.P. Morgan, `RJ` for Raymond James,
`Houlihan` for Houlihan Lokey. A literal substring test catches none of those, so
the firm test accepts, in order: the whole firm name; a distinctive word of it
(generic words like "Partners", "Capital", "Group" don't count); its initials as a
title word; a three-plus-letter prefix in either direction (`JPM` ↔ `JPMorgan`).
First names match whole words only — `Mat` does not hide inside `Mastermind`. All
35 real titles were checked against this. Known risk, ⚠ for the record: two
contacts sharing a first name at firms sharing a distinctive word could both match
one title. Attendee matching runs first and settles every real event that has an
attendee.

### 2.7 A call is "upcoming" until it ends

The rules never say when scheduled becomes done. Implemented: an event is upcoming
while `end > now` (a call in progress is `Call scheduled`, 0 days), and has
happened once `end ≤ now`. "Nobody has written since" measures from the event's
end, so a mid-call "running late" note does not clear `Call done`. The call's
*date* — for `days` and `last_call` — is its start date.

### 2.8 A cold inbound with nothing sent shows `Replied`

"Not emailed" is reserved for a contact with no correspondence at all. If someone
the student never wrote to writes first (K1 cold-recruited the real student), the
row shows `Replied` — "they wrote last, you have not answered" is literally true
and more useful. `attempts` is 0.

### 2.9 `Closed` freezes the status, not the facts

A closed contact's `status` is `Closed` with no clock, and §10 says history is
kept: `last_contact`, `attempts`, `next_call`, `last_call` are still recomputed and
returned as facts. Nothing about a closed row is dropped.

### 2.10 ⚠ Shared threads: "on the message" includes Cc

§3 says each person's state comes only from messages they are actually on.
Implemented literally: a contact named in From, To **or Cc** of a message is on it.
Consequence worth flagging: if banker A replies and Cc's tracked contact B, B's row
also shows `Replied` — B's side of the relationship did see activity, but B did not
personally write. The rules' example ("one person replying does not mark the other
four") holds because those four were not on the reply at all.

### 2.11 `is_outbound` is trusted

The contract says the courier sets it. The engine does not second-guess it against
`student.addresses` (which are still used for §8's never-suggest list).

### 2.12 `found` details the contract leaves open

`name` when the header has no display name is derived from the address
(`liz.ream@…` → "Liz Ream" — the contract's own example implies exactly this,
since the request carries bare addresses). `email` keeps the spelling first seen;
dedup ignores case. `first_seen` is the date of the earliest appearance, and
`context` follows the contract's phrasing ("Appeared in a thread with …"), naming
every contact the thread belongs to. Harvesting reads **headers only** — the
contract routes bodies to bounce and auto-reply detection and nothing else — and
only from threads that belong to a contact, per §8's wording. Calendar-notification
senders are filtered as `calendar-notification@google.com` plus the
`calendar.google.com` domains; no-reply as local parts beginning `no-reply` /
`noreply` / `do-not-reply` and separators thereof.

### 2.13 Warnings are plain sentences

The contract shows an empty list and two examples in prose. The engine emits
strings, four kinds: an event that matched nobody (in the real data those are the
firm info sessions and interviews §1 excludes — expected, not a fault), a thread
that matched nobody, an address seen in more than one capitalisation, and a marked
auto-reply.

---

## 3. Fixture disagreements

None yet: **`__fixtures__/` was empty when this was built.** The engine was built
against the rules alone, as the brief instructs. `run-fixtures.ts` is ready and
compares `rows` exactly (the acceptance bar), `found` on membership and
`first_seen`, and treats `name`/`context`/`warnings` wording as notes rather than
failures — the fixture chat cannot be expected to word engine prose identically.
When a real disagreement appears, the finding goes here, with which of the three —
implementation, fixture, or rules document — was wrong.

---

## 4. What the next chats must not trip over

- **The response row order is the request contact order**, one row per contact,
  always. Sorting ("longest-waiting first") is the product view's job, not the
  wire's — the contract fixes wire order.
- **Any non-200 means write nothing.** That includes 405 for anything but POST.
  There is no partial-success shape.
- The engine expects `version: 1` and says so loudly for anything else.
- **Payload ceiling:** the platform's own limit (4.5 MB on Vercel) is the only
  one. The web app's `guardWrite` (64 KB) is deliberately not used — a season of
  threads is bigger than a contact form. The real 2024 season is well under 1 MB;
  a pathological mailbox could approach the platform cap, and that is a known,
  accepted limit for version one.
- `web/.env.local`, Supabase, analytics: untouched and not read. The engine has no
  configuration at all.
- `.claude/launch.json` was briefly overwritten during endpoint verification and
  **restored byte-for-byte from git** before committing; its `blotter-web` entry
  already starts the dev server. One honest confession for the record: the brief
  says never modify an existing file outside the owned directory, and this one was
  touched and reverted. Nothing of it appears in the commit.
- The corpus was read, never written. The `Status: 4.4.2` Stifel body in
  `selftest.ts` is transcribed from it.
