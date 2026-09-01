# Engine fixtures — the answer key

Written September 1, 2026 by the Test-cases chat, from the real 2024 corpus
(`blotter-ib-ws1/research/corpus/`) against **`04-ENGINE-RULES.md` (version 2,
ratified)** and the shapes in **`05-CONTRACT.md`**. The engine's code was never
read while producing these files — that is the point of them. When the engine
disagrees with a fixture, the derivation to argue with is in
`blotter-ib-ws1/docs/workstreams/ws9-build/10-TEST-CASE-NOTES.md`, case by
case, with rule citations.

Regenerate with, from the repo root:

    python3 blotter-ib-ws1/research/scripts/build_fixtures.py

The script converts and validates; every judgment in these files was made by
hand and lives in that script as data, not logic.

## Layout

- `season/<date>.request.json` + `season/<date>.expected.json` — all 67
  corpus records as one sheet, asked "what was true on this day?" at four real
  dates: **2024-01-25** (peak), **2024-02-15** (just after the tracker was
  abandoned), **2024-03-15** (the quiet stretch), **2024-04-30** (season end).
  Same 67 rows in the same order at every date, so a state can be watched
  moving.
- `cases/<nn-name>/<date>.request.json` + `.expected.json` — fifteen focused
  cases, one per hard situation the Learn phase found. Each directory's cases
  are self-contained requests.

## How to compare an engine response against `expected.json`

- **`rows`**: compare exactly — `row`, `status`, `days`, `last_contact`,
  `attempts`, `next_call`, `last_call`, in the same order as the request
  (the contract requires order preservation).
- **`found`**: compare on `email` (case-insensitively) and `first_seen`,
  order-insensitively. `context` is advisory prose — do not string-match it.
  `name` is `null` in every expected file **deliberately**: the contract's
  request carries bare addresses, so no engine can honestly produce a display
  name (contract gap, flagged in the notes §3).
- **`warnings`**: **not asserted.** Every expected file says `[]`, meaning "no
  claim". The contract gives warning categories but no shape; pinning strings
  would invent engine obligations the rules never made.

## Conventions the expected values assume (provisional, flagged to Jon)

The rules do not decide these; the notes document (§3) puts each to Jon. Until
he rules, the expected values use:

1. **`days`** = whole elapsed days, `floor((now − anchor) / 24h)`, computed in
   UTC. Not calendar-date difference in the student's timezone — the contract
   carries no student timezone, so this is the only computable reading.
2. **Date cells** (`last_contact`, `last_call`, `found.first_seen`) = the UTC
   calendar date of the instant. Consequence worth knowing: Kate Borden's and
   Carson Harris's evening calls (Central time) carry next-day dates.
3. **`next_call`** = the matched upcoming event's `start` exactly as it
   appears in the request (ISO 8601 with offset). The contract never shows a
   non-null example; §9's sheet renders a time of day, so a bare date would
   lose information.
4. **Calendar acceptances, invites and "New Time Proposed" emails are machine
   mail**: they do not count as the contact writing, in the spirit of rules §6
   (an auto-reply is not a reply). This affects only `attempts` and
   `last_contact` on a few rows, never `status` at these dates; the notes list
   the rows that flip if Jon rules the other way.
5. **A `Closed` row** keeps its factual columns (`last_contact`, `attempts`,
   calls); only `days` is null, per the §4 table.
6. **Bounced rows'** `last_contact` = the date of the final send attempt.

## Provenance rules these files obey

- Every message, address, timestamp and event is the real 2024 season,
  converted from the corpus. Bodies the corpus captured as
  `own_text_only` are carried as captured; the 24 `metadata_only`
  messages carry `""` bodies (none of them matters for bounce or auto-reply
  detection); two Sean Kang outbound bodies are the corpus's bracketed
  transcription placeholders.
- **Two constructed elements exist, both demanded or permitted by the brief
  and both labelled**: the `closed: true` flag in `cases/04-closed-wins`
  (the corpus has no closed contact; the state must win over everything
  else), and the single `ignored` entry in
  `cases/13-sellingsloh-cc-five/2024-01-25-ignored.*`. Every message in both
  is still real.
- Season requests include only the 35 recruiting calendar events (each request
  carries those with `created ≤ now`). A live courier would send the whole
  calendar — the other 149 events of that window were captured
  title-and-start only, and could not be converted faithfully. Engines must
  ignore unmatched events regardless (rules §7).
- The nine firm-process records ride as rows with **no email addresses**,
  per rules §1 (version one does not track firms): expected `Not emailed` at
  every date. Their threads are therefore absent from season requests —
  as-ruled blindness, not an oversight. The shared-mailbox situations the
  brief names are exercised in `cases/09` and `cases/10`, where a student
  tracks the mailbox address on a row.
- Lonnie Kauppila's one real message was captured with an empty `To` line
  (corpus gap, notes §5): as recorded it attaches to nobody, so her row is
  expected `Not emailed`. If the engine is "wrong" about Lonnie, re-fetch that
  thread before blaming the engine.
