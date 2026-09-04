# Distribution notes — the three things built before anyone else gets a copy

Date: September 3, 2026
Brief: `21-BRIEF-DISTRIBUTION-READINESS.md`
Status: **All three built. Everything green.**

| Check | Result |
|---|---|
| `run-fixtures.ts` | **40 of 40** |
| `selftest.ts` | **133 of 133** (was 129) |
| `node courier/helpers.test.js` | **239 of 239** (was 205) |
| `tsc --noEmit`, `eslint --max-warnings 0`, `next build` | Clean |
| `node --check` on `Code.gs` | Clean |
| Expected values moved | **None.** See §3 |

**Two things need Jon.** The contract is at **version 4** and this bump
**refuses** older versions instead of tolerating them, so the server must ship
before the courier — and **the telemetry table does not exist yet**, so
counting silently records nothing until it does (§2).

---

## 1. The notice channel

**The constraint that decided the design:** a *timed* run has no UI context, so
it cannot open a dialog, and a refused run writes nothing at all. Anything that
depends on a dialog is therefore useless for exactly the case that matters.

**Where it goes:** row 1 of Contacts, in the columns past everything the sheet
uses, merged and filled by level. Row 1 is frozen, so it is on screen however
far the student scrolls, and **it shifts nothing** — data still starts at row 2
and the row number is still the contract's join key.

**Past the last *used* column rather than a fixed offset from `Closed`.** A
student may add their own columns after it — `findColumn_` locates everything
by header text precisely so they can — and a fixed offset would land on top of
one. `noticeRange_` takes `max(closedCol, lastColumn) + 1`.

**Secondary signals, both cheap:** the Contacts tab turns the notice's colour,
so it is visible from any tab; and a **manual** run puts the text at the top of
the summary dialog.

**A refused manual run leads with the notice** rather than burying it. "Status
402" answers nothing; "your trial has ended" answers everything. It also drops
the "the sheet is exactly as it was" line in that case, because a notice *was*
written and that sentence would be false — the same honesty bug the partial-
write dialog was fixed for once already.

**The narrow exception to write-nothing-on-failure.** A `blocked` notice has to
survive a refusal — that is what the level is for. `postToServer_` now attaches
any notice it can parse to the error it throws, and `courierPass_` writes
**that cell and nothing else** before re-throwing. Commented as the deliberate
exception it is.

**The engine emits no notice today**, because it is stateless and has nothing
to base one on. The field exists, is documented, and is rendered correctly when
it arrives. That is the point of building it now: the moment a hundred students
hold a copy, adding it means asking a hundred people to re-paste a script.

---

## 2. The install id, and telemetry that lives away from the engine

**The separation is load-bearing, so it is worth restating.** The engine has no
database, no logging and no file writes — verified again after this change:
`grep` for `supabase`, `fs.`, `writeFile` and `console.log` across `rules.ts`
and `route.ts` returns **zero**. So *"the engine stores nothing"* is a fact
someone can check by reading it, not a promise. **A counter inside it would end
that permanently**, to save one HTTP request.

**`POST /api/telemetry`** is a new route, in the house style of `api/lead`:
Node runtime, best-effort storage, every path returns 200.

**What may cross it, exhaustively:** install id, contract version, courier
version, timestamp, contacts count, run seconds, ok. **`pick()` is the entire
boundary and works by allow-list**, so an unexpected field is dropped rather
than stored — and a self-test asserts the payload contains no `@`, `name`,
`subject`, `body`, `firm` or `email` anywhere in its serialised form.

**`last_seen` is the server's clock, not the caller's.** A sheet with a wrong
timezone must not be able to write itself into next week and distort churn.

**The id identifies a sheet, never a person** — `Utilities.getUuid()`, random,
derived from nothing about the student, minted once into script properties. A
copied sheet mints its own, which is correct: a copy is a new install.

**A failed run is counted too**, with `ok: false`. That is what makes "installs
that stopped working" visible rather than inferred from silence. It is fired
inside its own `try` in the `catch`, and the original error is re-thrown
untouched.

### ⚠ Jon must create the table, or nothing is counted

**Verified against the live endpoint after deploy: it answers
`{"counted":false,"reason":"insert_failed"}`, not `not_configured`** — so the
Supabase credentials are already present and **the table is the only thing
missing**. Every run is otherwise unaffected. **In the Supabase SQL editor:**

```sql
create table if not exists blotter_installs (
  install_id       uuid primary key,
  first_seen       timestamptz not null default now(),
  last_seen        timestamptz not null default now(),
  contract_version text,
  courier_version  text,
  contacts         integer,
  seconds          integer,
  ok               boolean
);
```

**Distinct rows is the install count. `last_seen` gives weekly actives and
churn.** `first_seen` survives every later run because Supabase's upsert
updates only the columns present in the row, and the route never sends it.

**A student can switch counting off** by clearing `Settings → Usage counting
endpoint`. That is supported rather than a bug: no part of a run depends on it.

---

## 3. Bodies stop being sent at all

**The trace held exactly.** The engine read a body in one place —
`failedRecipients(msg.body)` — to find which address a delivery-failure notice
named. Auto-replies are detected from the **subject**, a header. Nothing else
ever opened one.

**So the courier extracts it instead**, and `body` is gone from the contract.

**`getPlainBody()` is now called for exactly one kind of message**: mail from
`mailer-daemon` or `postmaster`. Every other message's text is never read, let
alone sent — which also makes the fetch cheaper than it was.

**The claim, worded exactly:**

> **Blotter's server never receives the text of an email.**

**And it is a refusal, not a convention.** `validate.ts` **rejects** a request
carrying `body`, before anything else runs. A field silently dropped is a
promise; a field refused is a guarantee, and the difference is the whole reason
to bother.

### The proof that the move changed nothing

The fixtures are the answer key, and they contain **real bounce text from the
2024 season** — including the Stifel one whose `Status:` code lies (it reports
`4.4.2`, a temporary class, while its own text says the address does not
exist).

`build_fixtures.py` now performs the same extraction the courier does, and the
requests were regenerated without bodies. **All 40 fixtures pass, and the only
JSON key that changed in any expected file is `version`.** No status, no
`days`, no `attempts`, no date, no `found` entry moved anywhere.

That is the check that matters: the courier's extraction and the server's old
body-reading produce identical answers against real delivery-failure notices.

**This does not break the dumb-courier rule.** Pulling addresses out of a
machine-generated notice is mechanical. *What a bounce means* — which outbound
it answers, whether the row reads `Bounced`, and never the `Status:` code —
stays on the server.

---

## 4. Contract version 4 refuses older versions, and that is new

Every earlier bump was additive and kept older couriers working. **This one
cannot**, for two reasons, and the second is the dangerous one:

1. **Tolerating version 3 means continuing to accept message bodies**, which is
   the exact thing this version exists to stop.
2. **A version-4 courier against a version-3 server fails silently.** It sends
   no bodies to a server that expects them; bounces simply stop being detected;
   there is no error and nothing visibly different, just a row quietly reading
   `Sent` for an address that does not exist. **The version check is the only
   thing that converts that into a loud failure.**

So `validate.ts` accepts `4` and nothing else, and **the 400 names the fix**:
*"Re-paste courier/Code.gs into the Apps Script editor."* Six self-tests pin
that versions 1, 2 and 3 are each refused and that the message says so.

**Ship the server first, then the courier.** Jon has done this twice.

---

## 5. Findings

### 5.1 A stale comment I could not fix

`web/lib/supabase-admin.ts` says *"The only consumer is
`app/api/lead/route.ts`."* That was already untrue — `api/contact` imports it
too — and telemetry now makes three. **The file is outside my boundary**
(`web/` except `web/app/api/`), so it is recorded here rather than edited.

### 5.2 The bounce-sender test now exists on both sides of the seam

`isBounceSender_` in the courier and `isBounceSender` in the engine are the
same two-name check. That duplication is deliberate: the courier needs it to
decide *whose text to open*, and the engine needs it to decide *what a message
is*. **If they ever diverge, the failure is benign** — the engine would
classify a bounce with an empty failed list, which `bounceFor` already handles
through its same-thread adjacency fallback. Worth knowing, not worth coupling.

### 5.3 The notice would have crept across the sheet, one notice at a time

**Found after the fact, and it had never fired because no notice has ever been
sent.** `noticeRange_` placed the cell at "just past the last used column",
which reads well and is wrong: **once a notice is written there,
`getLastColumn()` counts it.** The next run would land six columns further
right, insert six more columns, and leave the previous message stranded behind
it.

It would have gone wrong on the **first real notice**, which is the one that
matters most — the billing message that must work. Now the column is
remembered in a script property and reused while it is still past `Closed`,
and six tests pin that a second, third and tenth run all stay put.

**The general shape is worth keeping:** a position derived from "the end of
what exists" is unstable the moment the thing being placed becomes part of what
exists.

### 5.4 Nothing about the notice is exercised end to end yet

The courier's rendering is unit-tested for every level including empty, and the
refused-run path is wired and commented. **But no server has ever sent one**,
because the engine has nothing to base one on. The first real test is the first
time something wants to say something.

---

### 5.5 The run got slower and it is not yet explained

Jon's live run reported **68 seconds**, against 44 measured after the calendar
fix on September 2. **The budget is roughly 82 seconds** (`11-COURIER-NOTES.md`
§3), so it is inside it — with less headroom than before.

**No cause is claimed.** Three things changed in between and only one is mine:
the whole UI build landed (a different chat), the sheet now has 67 contacts,
and this build removed `getPlainBody()` from every non-bounce message — which
should have made it **faster**, not slower. A single measurement is not a
trend.

**Worth watching rather than chasing.** The number to read is
`Settings → Last run took` over several runs; if it holds above 70, the next
thing to look at is the per-run cost the UI build added to the write phase,
since that is the part that grew.

## 6. What the next chat must not trip over

- **Ship the server before the courier.** Version 4 refuses version 3 — by
  design — so a courier pasted first fails every run until the server lands.
- **`body` is gone and must stay gone.** If something ever needs message text
  again, that is a contract change and a retraction of a published claim, not a
  field addition.
- **`telemetryPayload_` is the entire privacy boundary on the courier side**,
  and `pick()` is the entire boundary on the server side. Both are allow-lists.
  Adding a field to either is the moment to stop and ask whether it belongs.
- **The notice cell is the one thing a failed run may write.** Nothing else may
  join it there without re-opening the write-nothing-on-failure rule.
- **The notice's column is remembered, not recomputed.** Deriving it from
  `getLastColumn()` is what made it creep, because the notice becomes part of
  what that measures. A student's own columns still push the *first* placement
  along; hardcoding an offset would land on one.
- **Do not add a banner row above the headers.** It moves every data row down
  one and the row number is the contract's join key in eleven places.
- **`build_fixtures.py` now mirrors the courier's extraction.** If one changes,
  the other must, and 40 green fixtures is what proves they agree.
- Run all four checks after touching either half: `run-fixtures.ts`,
  `selftest.ts`, `node courier/helpers.test.js`, and `node --check` on a copy
  of `Code.gs` renamed to `.js`.
