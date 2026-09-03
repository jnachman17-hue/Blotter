# Brief — three things to build before anyone else gets a copy

Date: September 3, 2026
Model: **Opus.**
Status: **Ruled by Jon.** No decisions in this brief.

**Why now, and it is the whole argument:** the moment a hundred students hold a
copy, every one of these becomes "ask a hundred people to re-paste a script."
**Build the pipes while there is one user.**

---

## 0. Boundaries

- **Never modify an existing file under `web/` outside `web/app/api/`.** Live
  public site, real traffic.
- You own `web/app/api/engine/`, a new `web/app/api/telemetry/`, `courier/`,
  `05-CONTRACT.md`, and your notes.
- **Read-only on Gmail and Calendar.** No attachments, ever.
- **Do not edit** `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md` — the
  conductor owns those.
- Explicit paths when staging. Never `git add -A`.

## 1. Read first

1. `00-STATE-OF-PLAY.md`
2. `05-CONTRACT.md` — **version 3.** Two of the three below change it
3. `20-UI-BUILD-NOTES.md` — what the sheet looks like now
4. `courier/Code.gs` — `runOnce_`, `writeSetting_`, `postToServer_`

---

## 2. Fix 1 — a message channel from the server to the sheet

**The problem, in Jon's words:** *"let's say I cut off users because I decide to
add billing. Would I be able to add a pop up in their spreadsheet that says this
is now a paid product? Or does it just stop working and they don't see
anything? Because if I can't communicate to them directly in their spreadsheet,
then this is useless."*

**He is right and today it is useless.** A refused run writes nothing, and a
**timed** run has no UI context, so no dialog is possible. The student watches
their sheet quietly stop updating and concludes it broke.

### Build

**Contract:** the response gains an optional `notice`:

```json
"notice": { "level": "info" | "warning" | "blocked", "text": "…", "url": "…" }
```

**The courier displays it somewhere always visible, and the constraint that
decides where is that a timed run cannot open a dialog.**

**Put it in row 1 of Contacts, in the columns past `Closed`** — merged, filled
by level, cleared when there is no notice. Row 1 is frozen, so it stays on
screen however far down the student scrolls, and **it shifts nothing**: the data
still starts at row 2 and the row number is still the contract's join key.

> ⚠ **Do not add a banner row above the headers.** It moves every data row down
> one and the row number is the join key, hardcoded in eleven places. That
> refactor needs a live sheet in front of it. See `20-UI-BUILD-NOTES.md` §6.2.

Also, and only as secondary signals: set the **tab colour** when a notice is
live so it is visible from any tab, and show a dialog on a **manual** run.

**A `blocked` notice must survive a refused run.** This is the whole point: when
the server says no, the courier writes nothing *except* the notice. Today it
writes nothing at all, so this is a deliberate, narrow exception to the
write-nothing rule and should be commented as one.

---

## 3. Fix 2 — an anonymous install ID, and telemetry that lives away from the engine

**What Jon wants:** *"I would just want the user number data."* Not contact
counts — **how many separate sheets are running.**

### The courier

Generate `Utilities.getUuid()` **once**, store it in script properties, send it
every run. It identifies a sheet, never a person. A copied sheet generates its
own on first run, which is correct — a copy is a new install.

### A separate endpoint, and this is not a style preference

**`POST /api/telemetry`, not a field on `/api/engine`.**

**Because Jon needs to be able to say the engine stores nothing, and have it be
true.** The engine has no database, no logging, no file writes — I verified
every file. **Putting a counter inside it would end that**, and the claim is
worth more than the convenience.

Telemetry may carry **only**: install id, contract version, courier version,
timestamp, contacts count as a bare number, run duration, and success or
failure.

**It must never carry a name, an address, a subject, a body, or a firm.** State
that in the code, not only here.

Supabase already exists (`07-infrastructure-runbook.md`). One table, keyed by
install id, last-seen updated per run. **Distinct ids is the user count; last
seen gives weekly actives and churn.**

**Telemetry failing must never fail a run.** Fire and forget, wrapped so a dead
endpoint cannot stop a student's sheet updating.

---

## 4. Fix 3 — stop sending message bodies at all

**Jon:** *"I don't want to have their email body data… I really shouldn't have
that or at least have a way to access that."*

**He can have exactly that, and it is a small change**, because the engine turns
out to read a body in **exactly one place, for exactly one purpose**:

```js
failed = failedRecipients(msg.body);   // rules.ts:231 — which address bounced
```

Auto-replies are detected from the **subject**, which is a header. **Nothing
else opens a body, ever.**

### Build

- **The courier extracts the failed recipients itself** and sends
  `failed_recipients: string[]` on bounce messages
- **`body` leaves the contract entirely**
- The engine uses the supplied list

**This does not break the dumb-courier rule.** Pulling email addresses out of a
delivery-failure notice is mechanical extraction, not a judgment about
recruiting. The rule that stays on the server is *what a bounce means*.

### The payoff, and word it exactly

> **Blotter's server never receives the text of an email.**

Checkable by reading the contract. That is a different and much stronger claim
than "we do not store it".

### ⚠ The failure mode here is silent, so mind the order

A **v4 courier against a v3 server** would send no bodies to a server that
expects them — and bounces would simply stop being detected, with no error and
no visible difference. **The version check is what turns that into a loud
failure, so it must reject a mismatch rather than tolerate one.**

**Ship the server first, then the courier.** Jon has done this twice; tell him
in those words.

---

## 5. Contract

Both changes are shape changes: bump to **version 4** and say why in the file.

## 6. Tests

`node courier/helpers.test.js` — currently **205 checks**, all must pass.

Add pure-helper coverage for: failed-recipient extraction from a real bounce
body (`17-INSTALL-OBSERVED.md` has the real Stifel one, whose `Status:` code
lies), install-id generation being stable across calls and different across
installs, and notice rendering for each level including empty.

**Fixtures:** the engine change is input-shape only, so most should pass
untouched. **Any expected value that moves is a finding, not a chore.**

## 7. Write

- The code
- `blotter-ib-ws1/docs/workstreams/ws9-build/22-DISTRIBUTION-NOTES.md`

## 8. Report

Plain English. **Jon is not technical.** Lead with whether everything is green,
then his ordered list — deploy first, then re-paste — then anything needing a
decision.
