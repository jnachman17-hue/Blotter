# Brief: the end-to-end test before launch

**You are running the last check before Blotter goes in front of students.**
Everything below is built, deployed and unverified as a whole. Individual pieces
have been tested; the product has not been tested as one thing since it was
rewritten.

Jon runs the spreadsheet. You design the test, watch the database, read the
code, and rule on whether each result is right. **He cannot see what you can
see, and you cannot click what he can click.** That division is the whole shape
of this job.

---

## 1. What Blotter is, in six sentences

A student copies a Google Sheet. Code inside their copy ("the courier") reads
their Gmail and Calendar every fifteen minutes, sends the *outside* of each
message to Blotter's server ("the rulebook"), and writes the returned statuses
back into the sheet. The courier is deliberately dumb: it fetches, it writes, it
never decides. Every judgment lives on the server, which is why a rule can change
without anyone re-pasting anything.

**The courier reads envelopes, not letters.** Who wrote, who it went to, when,
and the subject line. `getPlainBody()` is called in exactly one place, guarded by
`isBounceSender_`, so a normal message's text is never read at all.

---

## 2. Read these first

| File | Why |
|---|---|
| `04-ENGINE-RULES.md` | The authority on what every status means. v7. |
| `05-CONTRACT.md` | What crosses the wire. Contract version 4. |
| `courier/Code.gs` | The whole courier. ~2,300 lines. |
| `web/app/api/engine/rules.ts` | The whole rulebook. |
| `32-JON-NOTES-3-SEP.md` | Everything Jon ruled on 3 and 4 September, with what is still open. |
| `34-SWITCHING-ON-PAYMENTS.md` | Billing, built and inert. Section 6 lists what has never been tested. |
| `26-SHEET-RESILIENCE.md` | What a student can do to their sheet without breaking it. |

---

## 3. What changed since the last full test, and therefore what is least trusted

Everything in this list is new or rewritten since anyone last watched real emails
move through a real sheet:

- The **served design** now carries status colours, column widths and number
  formats, and it **overrides the courier's own values**. These drifted apart
  silently for days and nothing tests that they agree.
- **Dates are built at noon**, not midnight, because midnight in the script's
  timezone rendered as the previous day on any sheet west of Chicago.
- **The notice banner** had no colours at all until 4 September.
- **`Start here`** was rewritten and now carries a screenshot loaded from
  blotterib.com, which is why Google shows an **Allow access** bar on first open.
- **Billing** exists end to end and is switched off.
- The courier is `2026-09-04.2`. The template should be too.

---

## 4. What Jon has, and what you have

**Jon has** the template (owned by `blotterib@gmail.com`), a Google account that
has never seen Blotter, and a real inbox he can send and receive from.

**You have** read access to Supabase through `web/.env.local`
(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). Note the URL already ends in
`/rest/v1/`, so strip that before building a request or every call returns
`PGRST125`. The tables are `blotter_installs`, `blotter_keys`,
`blotter_key_mismatches`, `leads`.

**You can also** POST directly to `https://blotterib.com/api/engine` to test the
rulebook without a sheet. A minimal valid body is in §9. This settles in seconds
what guessing about a spreadsheet costs an hour, and it is the single most useful
habit in this job.

---

## 5. Case 1, and run it first: does a copied sheet get its own identity?

**If this is wrong, billing is broken at the foundation and nothing else
matters.**

A key binds to a sheet's random install id. The claim, asserted in two documents
and never once tested, is that copying a sheet copies its Settings cells but
**not** its script properties, so the copy mints a fresh id on first run.

If a copy inherits its parent's id, one payment covers unlimited copies.

**The test:** Jon copies the template, runs Step 1 then Step 2 on the copy, and
reads its Blotter ID from Settings. You check `blotter_installs` for a new row
and confirm the id differs from the template's. Also confirm the copy's Settings
tab did not arrive carrying the template's id in the cell.

Rule on it explicitly. Do not move on until it is settled.

---

## 6. What to test

Do not just walk the happy path. The failures below are the ones that have
actually happened in this project.

### The install
Cold account, from `blotterib.com/setup`. Both flows exist; a personal Gmail
account sees the unverified-app screen and a Workspace one does not. Watch for
the **Allow access** bar, the copy dialog's yellow note, and whether the
instructions stay open beside the sheet.

### Every menu item
`Step 1`, `Step 2`, `Start automatic updates`, `Stop automatic updates`,
`Check this sheet`, all three `Sort contacts`, and `Clear this sheet to hand to
someone`. The last one must clear contacts, Found rows, addresses, the Blotter ID
and the key.

### Every status
All eight, produced by real mail and real calendar events: `Not emailed`, `Sent`,
`Replied`, `Bounced`, `Call scheduled`, `Call done`, `Call cancelled`, `Closed`.
`Bounced` needs a genuinely dead address. `Call cancelled` needs a declined
invite.

### The columns
`Days` counts from the last thing that happened, and is a dash where there is
nothing to count. `Attempts` counts bumps since they last wrote, and shows only
on `Sent`. `Last contact` is a date. **`Next call` must read `1/17 @ 2:00 PM`
and `Last call` a plain date** — check these hard, since the date bug lived here.

### The unattended timer
Never observed. Start automatic updates, leave it, and come back to `Settings →
Last successful run`, `Last run took` and `Gmail calls last run`. That last one
is the first real check against the 20,000/day consumer Gmail limit. The run
budget was last measured at 44 seconds against roughly 82.

### The Found tab
Someone new appears in a thread. Yes makes them a contact next run. No never
suggests them again. **Deleting an `Ignored` row must bring them back**, because
that row is the memory.

### Sheet resilience
Rename a Blotter heading. Put a formula in a Blotter column. Add your own
columns in the middle. Sort by hand mid-run. Give one of your columns a Blotter
heading. Each must fail safely and say why, never silently write to the wrong
row.

### The update path
The notice appears when the sheet is behind. It must link to `/update`, not to a
file. The copy button must work. After pasting, `Check this sheet` must report
the new version.

### Settings
Missing addresses must refuse to run with a clear message. A wrong time zone
must shift day counts. `Pretend today is` must be empty in normal use.

### What must never happen
No email sent, no reply, no label, no archive, no delete, no calendar event
created or changed, nothing written to a cell the student typed in. If a run
fails, **nothing at all** is written.

---

## 7. How to work with Jon

- **He is not technical.** Plain English, no jargon, no implementation detail
  unless he asks. Explain what a thing means for him, not how it works.
- **Very few em dashes.** He considers them a tell of AI writing.
- **Do not write like an AI.** Short, plain, declarative. Say it once and stop.
- **Verify before you claim.** He has been given confident wrong answers in this
  project and he checks. If you have not looked, say you have not looked.
- **Tell him what you got wrong**, plainly and once, then move on.
- Give him one instruction at a time when he is working in the sheet. He is
  clicking, not reading.

---

## 8. What to produce

A document at `blotter-ib-ws1/docs/workstreams/ws9-build/36-END-TO-END-RESULTS.md`:

1. **Every case, its result, and the evidence.** "Confirmed in `blotter_installs`"
   beats "looks right".
2. **Every defect found**, with the file and line, and whether it blocks launch.
3. **What you could not test and why.**
4. **A go or no-go**, with the reasoning. Jon will act on this.

Fix small, obvious, well-understood defects as you find them, with tests. Bring
anything that touches the engine's rules, the contract, or the design payload
back to Jon before changing it.

---

## 9. Practical notes

A minimal engine request, which is how you test the rulebook without a sheet:

```json
{ "version": 4, "key": "", "install_id": "<uuid>",
  "courier_version": "2026-09-04.2", "now": "2026-09-04T12:00:00-07:00",
  "student": { "addresses": ["you@example.com"] },
  "contacts": [], "threads": [], "events": [], "ignored": [] }
```

The field is `now`, not `today`. Suites to run before claiming anything passes:

```
node courier/helpers.test.js
cd web && npx tsx app/api/engine/selftest.ts
cd web && npx tsx app/api/engine/run-fixtures.ts
cd web && npx tsx app/api/entitlement/selftest.ts
```

**Any change to `courier/Code.gs` needs `node courier/publish.js`**, or the
served file drifts from the source and a test will tell you so.

**And any change to the courier means the master template must be re-pasted.**
It is a separate manual step that nothing enforces, and forgetting it means
students copy the old code.
