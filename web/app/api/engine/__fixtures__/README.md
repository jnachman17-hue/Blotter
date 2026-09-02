# Engine fixtures — the answer key

Written September 1, 2026 by the Test-cases chat, from the real 2024 corpus
(`blotter-ib-ws1/research/corpus/`) against **`04-ENGINE-RULES.md`** and the
shapes in **`05-CONTRACT.md`**. **Current expected run: 36 of 36.**

**Cases 01 to 15 and the four season snapshots were written by a chat
forbidden from reading the engine's code**, and that independence caught two
real bugs — a calendar acceptance counted as a reply, and a forward to family
counted as an email to a banker. That is the point of them. When the engine
disagrees with one, the derivation to argue with is in
`blotter-ib-ws1/docs/workstreams/ws9-build/10-TEST-CASE-NOTES.md`, case by
case, with rule citations. **Do not edit an expected file to go green** — work
out whether the code, the fixture or the rules document is wrong, and say
which.

**Cases 16 and 17 are different, and it is stated rather than hidden.** They
were added in Phase A (September 2, 2026) by a chat that had read the engine,
because they cover behaviour ruled that day which the 2024 season never
produced: a declined invite (`Call cancelled`) and a call flipping to
`Call done` at its start. Their expected values were derived from §4's text
before the engine was run. They carry less authority than the fifteen above,
and the reason those fifteen exist is exactly the discipline these two cannot
supply.

Regenerate with, from the repo root:

    python3 blotter-ib-ws1/research/scripts/build_fixtures.py

The script converts and validates; every judgment in these files was made by
hand and lives in that script as data, not logic.

## Layout

- `season/<date>.request.json` + `season/<date>.expected.json` — the **58
  tracked people** as one sheet, asked "what was true on this day?" at four
  real dates: **2024-01-25** (peak), **2024-02-15** (just after the tracker
  was abandoned), **2024-03-15** (the quiet stretch), **2024-04-30** (season
  end). Same 58 rows in the same order at every date, so a state can be
  watched moving. (The corpus's nine firm-process records are not rows —
  Jon's ruling: nothing is tracked at firm level, and `firm` is a plain text
  column on a person's row.)
- `cases/<nn-name>/<date>.request.json` + `.expected.json` — seventeen focused
  cases, one per hard situation the Learn phase found, plus the two Phase A
  additions. Each directory's cases are self-contained requests.

## Contract versions in these files

Every fixture except `16-nick-gerstein-declined` is **`version: 1`**, and that
is deliberate: contract v2 is additive, and those files are the suite's
standing proof that the server still understands a version-1 payload exactly
as it always did. Case 16 is `version: 2` because it carries `declined`, the
one field the new state needs.

## How to compare an engine response against `expected.json`

- **`rows`**: compare exactly — `row`, `status`, `days`, `last_contact`,
  `attempts`, `next_call`, `last_call`, in the same order as the request
  (the contract requires order preservation).
- **`found`**: compare on `email` (case-insensitively) and `first_seen`,
  order-insensitively. `context` is advisory prose — do not string-match it.
  `name` is `null` in every expected file **deliberately**: the corpus captured
  bare addresses only, so these requests carry no display names to pass
  through. Since September 2, 2026 the engine agrees rather than differing —
  contract v2 carries display names, and §8/D4 forbids deriving one from the
  address, so an address with no name in its header yields `null`. Asserting
  a real name here needs the corpus re-fetched with names captured.
- **`warnings`**: **not asserted.** Every expected file says `[]`, meaning "no
  claim". The contract gives warning categories but no shape; pinning strings
  would invent engine obligations the rules never made.

## Conventions the expected values follow

**Ruled (rules v3, September 1, 2026) — no longer provisional:**

1. **`days`** = a subtraction of calendar dates in the student's timezone
   (§4 v3: "a day turns at midnight in the student's timezone"). A call
   tomorrow morning is `1` however few hours remain tonight.
2. **Every request timestamp carries the student's own offset** — here
   America/Chicago: `-06:00` before the March 10, 2024 DST change, `-05:00`
   after (§4 v3 binds the courier to this). Date cells (`last_contact`,
   `last_call`, `found.first_seen`) are therefore the student's calendar
   dates: Kate Borden's and Carson Harris's evening calls are January 22
   and 23. The corpus stored messages in UTC and calendar strings in the
   capture session's Pacific rendering; instants were preserved exactly and
   re-rendered (see notes §0 for the corpus verification).
3. **Calendar RSVPs are machine mail** (§6 v3): `Accepted:`, `Declined:`,
   `Invitation:`, `Updated invitation:`, `New time proposed:` and kin are
   never a reply, never an attempt, never `last_contact`.

**Ruled September 2, 2026 (rules v5, decisions D10, D12, D13) — new:**

4. **A call is `Call done` from the moment it STARTS**, not from its end
   (`cases/17`). "Nobody has written since" is measured from the start too.
5. **A declined invite is `Call cancelled`** (`cases/16`), which holds only
   until somebody writes. Either side declining counts — the student or the
   contact — and a third party on the invite declining counts for nobody. A
   cancelled call is neither `Next call` nor `Last call`: it did not happen.
   Its clock is days since the call was due, **floored at zero**, because a
   call declined a week ahead is cancelled today rather than in negative days.
6. **A `Closed` row** keeps its factual columns (`last_contact`, `attempts`,
   calls); only `days` is null, per the §4 table. The sheet renders that null
   as a dash.

**Still provisional (flagged in the notes §3):**

7. **`next_call`** = the matched upcoming event's `start` exactly as it
   appears in the request (ISO 8601 with offset). The contract never shows a
   non-null example; §9's sheet renders a time of day, so a bare date would
   lose information.
8. **Bounced rows'** `last_contact` = the date of the final send attempt.

## Provenance rules these files obey

- Every message, address, timestamp and event is the real 2024 season,
  converted from the corpus. Bodies the corpus captured as
  `own_text_only` are carried as captured; the 24 `metadata_only`
  messages carry `""` bodies (none of them matters for bounce or auto-reply
  detection); two Sean Kang outbound bodies are the corpus's bracketed
  transcription placeholders.
- **Three constructed elements exist, every one labelled**: the `closed: true`
  flag in `cases/04-closed-wins` (the corpus has no closed contact; the state
  must win over everything else), the single `ignored` entry in
  `cases/13-sellingsloh-cc-five/2024-01-25-ignored.*`, and the `declined` list
  on Nick Gerstein's real invite in `cases/16-nick-gerstein-declined` (the
  corpus contains no declined invite, so the state cannot be tested from real
  data alone). Every message, address and timestamp in all three is still the
  real season. `cases/17` constructs nothing — only its two clocks are chosen,
  as every fixture's `now` is.
- Season requests include only the 35 recruiting calendar events (each request
  carries those with `created ≤ now`). A live courier would send the whole
  calendar — the other 149 events of that window were captured
  title-and-start only, and could not be converted faithfully. Engines must
  ignore unmatched events regardless (rules §7).
- The nine firm-process records in the corpus (applications, ATS
  acknowledgements, the FT Partners interview process) appear in **no**
  fixture as rows — Jon ruled nothing is tracked at firm level. Their mail
  contains no tracked address, so it is absent from season requests too:
  as-ruled blindness, not an oversight. The shared-mailbox situations the
  round-1 brief names are exercised in `cases/09` and `cases/10` with real
  mail on rows a student keeps — the mechanics they test (case-insensitive
  matching, empty `To` lines) are rules §3's own cited examples and apply to
  any row whatever it names.
- Lonnie Kauppila's one real message was captured with an empty `To` line
  (corpus gap, notes §5): as recorded it attaches to nobody, so her row is
  expected `Not emailed`. If the engine is "wrong" about Lonnie, re-fetch that
  thread before blaming the engine.
