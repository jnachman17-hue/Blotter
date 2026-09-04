# What is now dormant, and exactly how each piece gets switched on

Date: September 3, 2026
Brief: `29-BRIEF-FUTURE-PROOFING.md`
Status: **Built and inert. Nothing a student experiences has changed.**

| Check | Result |
|---|---|
| `node courier/helpers.test.js` | **326** |
| `run-fixtures.ts` · engine `selftest.ts` | 40 · 133 |
| `telemetry/selftest.ts` · `entitlement/selftest.ts` | 40 · 10 |
| `tsc`, `eslint --max-warnings 0`, `next build` | Clean |
| Contract version | **Still 4** — and §3 is why that matters |

---

## 1. What Jon can change from now on without anyone re-pasting

**This is the answer to what the work bought.**

| | Before | Now |
|---|---|---|
| A status colour | Every student re-pastes | Edit `/api/design`, bump `DESIGN_VERSION`, deploy |
| Column widths | Re-paste | Same |
| How dates read | Re-paste | Same |
| The `Sort by state` order | Re-paste | Same |
| Every word in `Start here` | Re-paste | Same |
| Telling students something | Impossible | The notice channel |
| **Adding a new field to the wire** | Version bump + re-paste | **Neither** (§3) |

**Still needs a re-paste**, and this is the honest residue: new Gmail queries,
new permissions, a new *kind* of row in `Start here` (a new instance of an
existing kind is free), a new menu item, and any bug in the mechanism itself.

---

## 2. Every dormant thing, and exactly how it is switched on

### 2.1 Billing — the whole path exists and refuses nobody

**What is already there:** a `Blotter key` row in Settings, sent on every run.
The sheet's install id, sent with it. The `blotter_keys` lookup, the grace
calculation, the 402 refusal and its `blocked` notice.

**What makes it inert:** one environment variable.

**To switch it on:**

1. Create the tables (§2.2).
2. Issue keys into `blotter_keys` with `status = 'active'`.
3. **Set `BLOTTER_ENFORCE=on` in Vercel and redeploy.**
4. Confirm with `curl https://blotterib.com/api/entitlement` → `{"enforcing":true}`.

**To switch it off again:** unset it. There is nothing else to undo.

**The switch has exactly one source** (amendment A7). `enforcement.ts` is the
only file that reads `BLOTTER_ENFORCE`, and `GET /api/entitlement` reports the
same function call the engine makes — **not a second reading of the variable,
the same reading.** D27 lost an hour to a switch with two sources where turning
off the one you were looking at left the other on. Default is off: a missing
variable, a typo or a failed deploy all mean nobody is refused, which is the
only safe direction for a switch whose wrong setting locks paying students out
of their own spreadsheet.

**A database that cannot be reached lets the run through.** An outage must not
lock out everybody who has paid.

### 2.2 The tables Jon has to create

Nothing is counted or refused until these exist. In the Supabase SQL editor:

```sql
create table if not exists blotter_keys (
  key                    text primary key,
  status                 text not null default 'active',   -- active · grace · inactive
  install_id             uuid,                             -- the sheet, bound on first use
  bound_at               timestamptz,
  grace_until            timestamptz,
  stripe_customer_id     text,
  stripe_subscription_id text,
  created_at             timestamptz not null default now()
);

-- A second sheet turning up on one key. Flagged for a person, never refused:
-- one student with a fresh copy of their own tracker looks exactly like two
-- people sharing, and only a human can tell them apart.
create table if not exists blotter_key_mismatches (
  id               bigserial primary key,
  key              text not null,
  seen_install_id  uuid not null,
  seen_at          timestamptz not null default now()
);

-- Optional, and only for §2.4: publishing the script without a deploy.
create table if not exists blotter_script (
  name  text primary key,
  body  text not null
);
```

### 2.3 The design — how a colour change reaches everybody

1. Edit `DESIGN` in `web/app/api/design/route.ts`.
2. **Bump `DESIGN_VERSION` in `web/app/api/engine/rules.ts`.** Nothing happens
   if this is forgotten, which is the failure to watch for.
3. Deploy.

Every sheet picks it up on its next run, applies it once, and remembers. **No
student does anything.**

**Why the version gate is not optional.** A full re-format is 125+ round trips
to Google and ten to fifteen seconds, on a run budget already at 85%. Applied
every pass it would break the daily trigger allowance outright. Applied only
when the version changes it costs one string comparison, and a re-format lands
perhaps monthly.

**Scope is the things that were already tables** — status colours, widths,
number formats, sort ranks, and the `Start here` rows. Conditional-format
construction, merges and frozen panes stay in the script: they change rarely and
are fiddlier to drive from data.

### 2.4 The stable script URL — no publishing step, by design

**`https://blotterib.com/Code.gs`** is a static file committed under
`web/public/` and deployed with everything else.

**An earlier version of this served the script from the database**, which meant
a publish step somebody had to remember — and a forgotten publish points the
update notice at nothing. **A file that ships with the deploy cannot go stale.**
Nothing in the script is secret (no keys, no tokens, and a copy already sits in
every student's Apps Script editor), so serving it plainly costs nothing.

**Drift is impossible to ship silently.** `node courier/publish.js` copies
`courier/Code.gs` into `web/public/` and writes `manifest.ts` — version, sha256
and byte count — in one command, and **`courier/helpers.test.js` fails if the
served copy and the real one ever differ.** Verified by deliberately breaking
it: appending one line to the served copy fails the suite, deleting it fails the
suite, and `publish.js` repairs both.

`GET /api/script` reports what is current — version, hash, size, the link and
how to update — so a student can tell whether they already have it before
pasting anything.

**After any change to `courier/Code.gs`, run `node courier/publish.js`.** The
test will tell you if you forget.

### 2.5 The update notice

`/api/engine` compares the `courier_version` a run reports against
`CURRENT_COURIER_VERSION` and returns an **`info`** notice when it is behind,
pointing at `/api/script`.

**Deliberately `info`, never `blocked`.** An old script still works, and turning
a version difference into a stopped sheet would be reaching for the loudest tool
in the box for the mildest problem.

---

## 3. The change that makes the next change cheap

**Both sides ignore fields they do not recognise**, and `05-CONTRACT.md` now
says so with a table of what does and does not force a version bump.

**The rule proved itself immediately.** This work added three request fields and
one response field — `key`, `account`, `courier_version`, `design_version` — and
**the contract is still version 4.** A student who never updates their script
keeps working exactly as before; they simply do not get the new things.

**The test to apply is not "is this new" but "can an old reader be wrong without
noticing".** Removing a field, changing a meaning, narrowing a type — all still
force a bump. Adding does not.

---

## 4. The thing that had to be verified by hand — done, and it changed the design

**It was run on a live sheet, and the answer was `Google account readable: NO`
— on an ordinary gmail.com account.**

**The cause is in the manifest, and it is not account-dependent.**
`appsscript.json` declares five scopes — `gmail.readonly`, `calendar.readonly`,
`spreadsheets.currentonly`, `script.external_request`, `script.scriptapp` — and
**none of them is a userinfo scope.** There was never an address to read. A
`.edu` would say exactly the same thing.

> **Jon does not owe a `.edu` test.** That item is closed. There is nothing
> left to verify by hand here.

**Jon's ruling: bind keys to the sheet, not the person.** Adding the sixth
scope would work and would cost an extra line on Google's unverified-app
consent screen plus a forced re-authorisation for everybody already installed.
That screen is already where students abandon the install
(`17-INSTALL-OBSERVED.md` §2, defect one), and spending friction there to make
billing tidier is the wrong trade.

**So the install id does the job.** Minted once per sheet, already sent every
run, and it survives a re-paste because script properties belong to the script
project rather than the code. Only a brand-new copy changes it — and binding is
soft, so that is one flag to clear rather than a lockout.

**What that costs, stated rather than glossed:** one person with two sheets and
two people sharing a key look identical. Both produce a flag; a human decides.
At this scale that is the right place for the decision.

### Two things worth keeping from how this went

**A3 is why nothing broke.** The rule was that an unreadable address means the
field is *omitted*, never sent as a hash of an empty string. Had it been sent
blank, every install in that state would have shared one identity and one key
would have unlocked all of them — **and it would have looked fine**, because a
hash of `""` is a perfectly well-formed hash.

**The diagnostic paid for itself on first use.** It was built because A3 could
not be settled by reading code. It was run once and it moved the design. That
is the argument for building the thing that answers a question you cannot
reason your way to.

## 5. Security, since a courier that renders what it is told is a new surface

`sanitiseDesign_` is an **allow-list**, and every value is checked rather than
trusted:

- **Colours** must match `#rrggbb`. A colour name or a URL is dropped.
- **Numbers** are bounded — a column width of 90,000 is not a width.
- **Strings** go through `safeCell_`, so a payload beginning `=` is defused into
  text rather than becoming a live formula. `=IMPORTXML(…&A2)` in the `Start
  here` tab would otherwise pull a student's contacts out of their own sheet.
- **Row kinds** are a fixed vocabulary. One the courier cannot draw is ignored
  rather than guessed at.
- **The payload is capped** at 200 KB.
- **It cannot say which columns are Blotter's.** Only headings the script
  already knows are looked up, so a payload can never point Blotter at a
  student's own column and overwrite it. The engine says the same thing in its
  own comments; it is said twice on purpose.

**A design that fails to fetch, parse or paint is swallowed.** The tracker
matters more than the paint, and a student's run must never fail over a colour.

---

## 6. What the next chat must not trip over

- **`DESIGN_VERSION` must be bumped when `DESIGN` changes**, or nothing
  happens. That is the whole gate.
- **`enforcement.ts` is the only file allowed to read `BLOTTER_ENFORCE`.** A
  second reader recreates D27 exactly.
- **The engine must never write.** Binding lives on telemetry for that reason,
  and moving it back would kill a claim that currently survives being checked.
- **A key belongs to a sheet, not a person**, and the reason is a missing
  OAuth scope rather than a preference. If a userinfo scope is ever added for
  some other purpose, the superseded reasoning in `23-BILLING-ARCHITECTURE.md`
  §2 becomes live again — including A4's graduation argument, which was correct
  and is kept for that reason.
- **Absence must stay absence.** It is the principle A3 was written about and
  it outlived the field: a missing identifier is omitted, never sent as an
  empty or hashed-empty value, because a well-formed hash of nothing looks
  exactly like a real one and would have every such install sharing it.
- **Adding a field is free; removing or reinterpreting one is not.** The table
  in `05-CONTRACT.md` is the reference.
- **`verdict.ts` deliberately has no `server-only` import**, so it can be
  tested. The env read is in `enforcement.ts`, which does.
- **A new row *kind* in `Start here` still needs a re-paste.** New instances of
  an existing kind are free. That boundary is the honest one and it should be
  stated rather than blurred.
