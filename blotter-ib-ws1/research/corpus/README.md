# WS9 Learn-phase corpus

Written: September 1, 2026. **Stage A and Stage B are both complete, and Pass Two is
written.** Findings are in `../../docs/workstreams/ws9-build/03-LEARN-FINDINGS.md`.

| | Combined | gmail | utexas |
|---|---|---|---|
| Records | 68 (59 people, 9 firm-process) | 43 | 25 |
| Unique messages | 333 | 265 | 68 |
| Outbound / inbound | 168 / 165 | 123 / 142 | 45 / 23 |
| Threads | 126 | | |
| Recruiting calendar events | 35 | 35 | **0** |
| Bounces | 6 | 3 | 3 |

---

## What is here

| Path | What it is |
|---|---|
| `index.json` | Every record, with counts and a pointer to its file. Read this first. |
| `contacts/<slug>.json` | One file per contact. **59 people + 9 firm-level process records.** |
| `calendar.json` | The 35 in-scope recruiting events. All are on the `jnachman17@gmail.com` calendar; the utexas calendar has none. |
| `_calendar_raw.json` | All 184 events in the window, before scoping. Kept so the scoping call can be re-checked. |
| `_calendar_recruiting.json`, `_calendar_excluded.json` | Intermediate products of that scoping step. |
| `../scripts/build_corpus.py` | Rebuilds everything below from the two sources named in it. Re-runnable. |
| `../scripts/supplement_stage_a.json`, `..._a2.json`, `supplement_stage_b.json` | Message bodies for threads that were not written to disk automatically. See "How bodies were captured". |
| `_pass_one_derived_states.md` | The Pass One derivation, fixed before any product file was read. |
| `../scripts/read_tracker.py`, `tracker_raw.json` | Reads `jon-real-ib-tracker.xlsx` with the stdlib. `openpyxl` is not installed on this machine. |

Rebuild with, from the repo root:

```bash
python3 blotter-ib-ws1/research/scripts/build_corpus.py
```

---

## Scope actually covered

- **Mailboxes:** `jnachman17@gmail.com` (Stage A) and `jnachman@utexas.edu` (Stage B). Each was
  confirmed live before any reading, by checking the address on returned messages. A third
  alias, `jnachman@utmail.utexas.edu`, appears in the To line of inbound university mail.
- **Calendar:** `jnachman17@gmail.com`. **This was not available at the start.** The
  Calendar connector was initially authenticated to `jnachman@utexas.edu`, a different
  Google account, whose calendar holds **four** events in the whole five-month window and
  **none** of them recruiting. Jon reconnected Calendar to the gmail account mid-session
  and the 35 recruiting events appeared. Any later chat should re-check which calendar it
  is actually reading before drawing a conclusion from an empty result.
- **Window:** 2023-12-01 to 2024-04-30 inclusive. Gmail query `after:2023/11/30 before:2024/05/01`.
- **Excluded by name, never read:** Marlin Equity Partners (`marlinequity.com`,
  `marlinoperations.com`), tax mail.
- **Excluded by category:** everything not banking recruiting.

## Prohibitions observed

- **No attachment was opened, downloaded, extracted or inspected. Not one.** Only the
  read-only Gmail and Calendar tool schemas were ever loaded into this session; the
  attachment-download tool was never loaded, so it could not be called even by accident.
  `attachments` on each message carries `filename` and `mimeType` only — that metadata comes
  back free with the message and no content is fetched to obtain it.
- **Nothing was written to Gmail or Calendar.** No draft, send, reply, forward, label,
  trash or event change. The write tools were never loaded.
- Non-recruiting mail was identified as out of scope from sender and subject and not read
  through. One day's sample showed roughly 50 threads/day of newsletters and promotions;
  a blanket enumeration of the window would have been ~7,500 threads of mostly irrelevant
  mail, so retrieval was targeted instead. Method is in `02-LEARN-STAGE-A.md`.

---

## Record shape

One file per contact, so a build chat can load the three cases it needs. Per contact:

```
slug, name, firm, title
addresses_seen[]              every address seen for this person
relationship_opened           how the relationship started, in words
source_mailbox[]              which account(s) this record's messages came from
stage                         "A", "B", or "A+B" for a relationship split across both
scope_flag                    null, or a note demanding a human ruling
counts{threads,messages,outbound,inbound,calendar_events}
first_activity, last_activity ISO timestamps
calendar_event_ids[]          matched by attendee address against calendar.json
missing_outbound              true when no outbound to this contact exists in EITHER mailbox
missing_outbound_note         set when the above is true
threads[]
  thread_id, capture, shared_thread, subject
  messages[]
    message_id, date, internal_date
    direction                 "outbound" | "inbound"
    sender, to[], cc[], subject, labels[]
    attachments[{filename, mimeType}], has_attachment
    body, body_source
    source_mailbox            the account this message was read from
    bounce{}                  on bounce messages only
    note                      an uncertainty or an observation worth not losing
```

**Direction** is taken from Gmail's own `SENT` label, not inferred from the sender string.

### Rules the data follows

- **Record, do not interpret.** No state category is assigned to any contact anywhere in
  these files. Pass One's categories belong in the findings document. A corpus with
  judgments baked in cannot be re-read later under a different theory.
- **Uncertainty is recorded, not resolved.** `note` fields carry the doubt.
- **Missing is written as `null` and never invented.**

---

## How bodies were captured

`body_source` says which of three things a body is:

| `body_source` | Meaning | Count |
|---|---|---|
| `verbatim_full` | Complete body exactly as Gmail returned it, quoted history included. | 20 threads |
| `own_text_only_quoted_history_omitted` | Each message's own new text. The quoted reply history beneath it was dropped. | 67 threads |
| `metadata_only` | No body. Headers, subject, direction and date only. | 24 threads |

**Why the split, honestly.** Oversized tool results are written to disk automatically and
could be harvested exactly; smaller ones are not, and had to be transcribed. For those,
dropping the quoted history is safe by construction — the quoted text is a copy of a
message already held in the corpus in its own right — and it removes a large volume of
duplicated legal disclaimers. The 25 `metadata_only` threads are calendar-notification and
acknowledgement messages whose body is a meeting-invite block or a disclaimer with no
informational content; the authoritative meeting facts for those are in `calendar.json`.
Any of the three can be upgraded by re-fetching with `get_thread`.

---

## Things a later chat must not trip over

### One thread, five relationships

Gmail thread `18d17ed90fec72f6`, subject **"Potential favor"**, contains 24 messages and
**five separate relationships**: Doug Melsheimer (Barclays MD), Kleopatra Kirkland (his
assistant), Jon's father, **Grace Steelman** and **Jay Klein**. Grace's and Jay's entire
relationships — Jon's outbound to them included — live inside a thread started by Jon's
father, about a different banker, under a subject line that names none of them.

Those contacts carry `shared_thread: true` and are built with a party filter: a message
belongs to a contact when that contact's address is in sender, to or cc. Grace Steelman
appears in an earlier build as `missing_outbound` for exactly this reason, and that
reading was wrong. **Do not treat thread as a proxy for contact.**

### Near-duplicates, recorded and flagged, never dropped

- `18e15a9d8b494747` and `18e1f319d9688866` carry a byte-identical Aeris Partners body
  two days apart under different thread and message ids. Both are kept.
- Two Nick Gerstein calendar acceptances (`18d2ee690c885bae`, `18d310cc6682d747`) for the
  same call on two different dates — a reschedule, not a duplicate.
- Brady Flynn's address appears as both `Brady.flynn@` and `Brady.Flynn@` inside one
  thread. Case-sensitive address matching would split him into two people.

### `K1 Investment Management` is flagged, not resolved

The brief excludes "K-1 and tax mail" by name, and section 0 phrases it as "K-1 tax
emails". **K1 Investment Management** (`k1ops.com`) is a private-equity firm that
cold-recruited Jon, sat on his tracker as a contact row, and interviewed him. It is not a
K-1 tax document. Four threads were **included and flagged** rather than silently dropped,
because including-and-flagging is reversible and dropping is not. `scope_flag` on
`contacts/katrina-yuzefpolsky.json` carries the note. **Jon's ruling is outstanding.**
To remove: delete that file and drop the slug from `CONTACTS` in `build_corpus.py`.

### RFC822 `Message-ID` is not available

The brief's preferred deduplication key is the RFC822 `Message-ID` header. **The Gmail
connector does not expose it** in any of the permitted read tools. Only Gmail's own
message id and thread id come back, and those are per-account — the same message in the
utexas mailbox will carry a different Gmail id.

**Stage B must therefore fall back to sender + timestamp + subject**, and every match made
that way must be marked inferred, per the brief. Timestamps should match closely; Gmail's
`internalDate` is the delivery time in that account, so allow a small tolerance rather
than requiring equality.

---

## What Stage B changed

Stage B read `jnachman@utexas.edu`: 32 sent threads, 68 messages, **zero recruiting
calendar events**. Three Stage A "missing outbound" contacts were closed — **Nick Gerstein,
Gary Horton and Will Robinson** each had their whole conversation here while their meeting
lived in the gmail calendar. Sixteen contacts exist only in this account, three in both,
forty only in gmail.

**Mat Young remains the one unexplained missing outbound across both accounts.** His tracker
row says gmail; it is in neither. Recorded, not resolved.

### The merge, and why it was easy

**There is not one cross-account duplicate.** Jon never cc'd himself and no banker wrote to
both addresses. The dedup rule below was therefore never exercised in anger — but it is the
rule, and it is weak, so it is written down.

RFC822 `Message-ID` is **not exposed** by the Gmail connector in any permitted read tool.
Only Gmail's own per-account ids come back, and they differ between accounts for the same
message. The fallback is sender + timestamp + subject, and any match made that way must be
marked inferred.

Near-duplicates *within* an account are recorded and flagged, never dropped — the two
byte-identical Aeris messages, the two Nick Gerstein acceptances (a reschedule, not a
duplicate), and `Brady.flynn@` versus `Brady.Flynn@` in one thread.

### Pass One and Pass Two

`_pass_one_derived_states.md` holds the bottom-up derivation and **was written to disk
before** `web/lib/sheet-data.ts`, `web/lib/privacy-copy.ts` or either WS5 build spec was
opened, so it cannot have been retrofitted to the product's vocabulary. Pass Two compares
against it in `03-LEARN-FINDINGS.md` §6; it does not edit it.
