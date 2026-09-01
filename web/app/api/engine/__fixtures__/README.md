# Engine fixtures — the answer key

Written September 1, 2026 by the Test-cases chat, from the real 2024 corpus
(`blotter-ib-ws1/research/corpus/`) against **`04-ENGINE-RULES.md` (version 3,
ratified)** and the shapes in **`05-CONTRACT.md`**, regenerated the same day
for the v3 rulings (round 2, `12-BRIEF-TEST-CASES-2.md`) and again for Jon's
follow-up rulings. **Current expected run: 27 of 31.** The four season
fixtures fail on exactly one cell — Sam Ward's `attempts`, expected 1 — which
encodes Jon's newest ruling (*a send counts only when the contact's address
is on the message*) ahead of the engine and of §5's wording. **That red is
deliberate. Do not "fix" these fixtures to green; fix the engine and the
rules sentence** (notes §0.2). The engine's code was never read while
producing these files — that is the point of them. When the engine disagrees
with a fixture, the derivation to argue with is in
`blotter-ib-ws1/docs/workstreams/ws9-build/10-TEST-CASE-NOTES.md`, case by
case, with rule citations.

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

**Still provisional (flagged in the notes §3):**

4. **`next_call`** = the matched upcoming event's `start` exactly as it
   appears in the request (ISO 8601 with offset). The contract never shows a
   non-null example; §9's sheet renders a time of day, so a bare date would
   lose information.
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
