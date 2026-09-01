# Courier notes — what was built, and what the next chat must know

Date: September 1, 2026
Chat: the Courier (brief `08-BRIEF-COURIER.md`)
Status: **built, syntax-checked, not yet run against a live Google account or
a live server.** The rulebook endpoint did not exist when this was written.

---

## 1. What was built

Everything lives in `courier/` at the repo root. Nothing outside it was
touched except this file.

| File | What it is |
|---|---|
| `courier/Code.gs` | The whole courier, one file, deliberately — one paste for a non-technical installer. Plain V8 JavaScript, passes `node --check` |
| `courier/appsscript.json` | The manifest. **This is the read-only guarantee**: `gmail.readonly`, `calendar.readonly`, `spreadsheets.currentonly` (this one sheet only, not Drive), `script.external_request`, `script.scriptapp` (the timer). No write scope on mail or calendar exists for the script to abuse |
| `courier/TEMPLATE.md` | The sheet layout the script's Step 1 builds — three tabs, columns per `04-ENGINE-RULES.md` §9 |
| `courier/INSTALL.md` | Numbered install steps for Jon, including the unverified-app screen walkthrough |

The run is exactly the brief's seven steps: wake every 15 minutes → read
Contacts/Found/Settings → Gmail search per contact address
(`from: OR to: OR cc:`, chunked, whole threads, deduplicated) → all
default-calendar events in a window → one `POST /api/engine` per the contract
→ validate → write. **All fetching and validation happens before any write;
any throw anywhere leaves the sheet byte-for-byte as it was.** A script lock
prevents a manual run and a timed run interleaving. Columns are found by
header text, never by position, so students can add their own columns.

Contract enforcement is literal: wrong `version`, row count ≠ contact count, a
row for an unsent contact, a duplicate row, or a status outside the seven
legal values each abort the run with nothing written.

## 2. Two rulings Jon made for this build (conductor: log them)

1. **Version one uses a Blotter template**, not the student's existing
   tracker. Per the brief's recommendation; column mapping deferred.
2. **The approve flow may write Name and Email into a brand-new Contacts row**
   when the student marks Yes in Found. This resolves a real conflict inside
   the ratified rules: §8 says approved people *become contacts*, §9 says
   Blotter *never writes* to student columns. Jon ruled the §9 sentence means
   "never touch an existing student cell," and appending an explicitly
   approved new row is allowed. The script still never modifies any existing
   row's student cells, ever.

I do not own `04-decision-log.md`, so these are recorded here for the
conductor to log properly.

## 3. Google's quotas, verified against the live quotas page today

Source: developers.google.com/apps-script/guides/services/quotas, fetched
September 1, 2026. Per user, resetting 24h after first use.

| Quota | Consumer (gmail.com) | Workspace (incl. most .edu) |
|---|---|---|
| Triggers total runtime | **90 min/day** | 6 hr/day |
| Email read/write (excl. send) | **20,000/day** | 50,000/day |
| URL Fetch calls | 20,000/day | 100,000/day |
| Script runtime | 6 min/execution | 6 min/execution |
| URL Fetch payload/response | 50 MB | 50 MB |

**The 15-minute cadence is quota-risky on consumer accounts at full-season
scale, on two independent budgets:**

- **Trigger runtime:** 96 runs/day against 90 min/day allows an average of
  **56 seconds per run**. The courier refetches the whole season every run
  (the server is stateless, so it must); at Jon's real scale — 67 contacts,
  126 threads, 325 messages — a run plausibly takes 30–120 s.
- **Gmail reads:** ~8 searches + 126 thread fetches + ~325 message reads per
  run is roughly 450+ operations; × 96 runs ≈ **43,000/day against 20,000**.
  How Google meters "read/write operations" per method call is not precisely
  documented, so treat this as an order-of-magnitude warning, not arithmetic.

**When a quota trips, the run throws before the write phase, so the
architecture holds** — the sheet goes stale (visible in Settings → Last
successful run) and recovers when the quota resets. Nothing is half-written.

Not mitigated in code, deliberately — every mitigation is either state
(caching, and the courier must stay dumb) or a cadence change (15 minutes is
ruled in the engine rules, not mine to change). **Decision for Jon if the
pilot hits this:** a 30- or 60-minute cadence (60-minute ≈ 24 runs/day, well
inside both budgets), or lean on the fact that students recruiting from
**.edu addresses are usually on Workspace**, where both budgets are 2.5–4×
larger — though a school admin can also have Apps Script or external requests
disabled, which would kill the install entirely. Untested.

Also real: a first run against a very large season could exceed the 6-minute
execution cap, and since every run refetches everything, it would fail the
same way every time — permanent staleness, not a crash. Nobody with a
normal-sized season should hit this; flagging it because the failure mode is
quiet.

## 4. The unverified-app screen

**Still not witnessed live — but the flow and labels are now verified against
Google's own documentation** (developers.google.com/apps-script/api/
troubleshoot-authentication-authorization, and support.google.com/cloud/
answer/7454865), which state that the consent screen shows the warning and
that the path past it is **Advanced → "Go to {Project Name} (unsafe)"**, with
a **Back to safety** button as the default exit.

The full expected sequence, as written into `INSTALL.md` steps 14–17:
**Authorization required** dialog → **Choose an account** → warning headed
**"Google hasn't verified this app"** with body text warning that the app
requests access to sensitive info and naming the *student's own email* as the
unverified developer → **Advanced** → **Go to Blotter (unsafe)** → the scopes
consent screen → **Allow**. The body text word-for-word is from documented
installs, not a live capture, and `06-assumptions-and-open-questions.md`
still carries the question honestly: **INSTALL.md step 16 asks Jon to
screenshot the real screen during the first install** — update the install
guide and close the open question when he does.

Related, from `06`: the template-copy distribution means **each student's
copy is its own script project owned by that student**, which is exactly the
working position under which the 100-user cap never binds. This build neither
proves nor disproves it; first real student install will.

## 5. Gaps found in the specs — surfaced, not worked around

1. **The setup scan has no home.** ENGINE-RULES §2 defines a one-time wide
   scan (last 3 months, propose people), but the contract has no endpoint or
   request shape for it, and the brief's exhaustive list of courier duties
   (§2, items 1–7) is the 15-minute loop only. **Not built.** The pilot
   student pastes their starting contacts in by hand and `Found` grows the
   list. Needs a contract change (Jon's ruling + version bump) before anyone
   builds it.
2. **`warnings` has no sheet home.** The contract returns them; neither the
   brief's tab table nor §9 places them. Courier's choice: a
   `Last run warnings` row in Settings, overwritten each run. Change freely.
3. **Sorting is unowned.** §4 says longest-waiting first, always — but
   sorting the tab would reorder student rows (and row numbers are the join
   key), and the brief's duty list omits it. Nobody sorts today. Jon should
   rule where sorting lives (a filter view the student applies? the server
   returning a sort hint? a fourth tab?).
4. **`next_call` / `last_call` format mismatch.** The contract's examples
   return bare dates (`"2026-08-15"`); §9's column examples show
   display-formatted strings (`1/17 @ 2:00 PM`, `Completed 1/16`). The
   courier writes **verbatim what the server sends** (nulls become blank
   cells). Rulebook chat: whatever you send is what students see — align
   with §9's examples or get a ruling.
5. **Attachments are not recorded at all.** The brief says record existence
   "if that is free"; it is not free in Apps Script (detecting one means
   fetching it), and the contract has no field to put it in anyway. Doubly
   out.

## 6. Traps for the next chat

- **The Found tab is the ignore-list storage.** A row marked `Ignored` *is*
  the memory that the student said No. Deleting it resurrects the
  suggestion. Any future migration must carry those rows.
- **Approved people lag one run.** Marking Yes appends the row during run
  N's write phase; the server first sees them in run N+1, so Blotter columns
  stay blank for up to 15 minutes. Not a bug.
- **The courier suppresses re-suggestions itself.** The server cannot know
  about pending (blank) Found rows — they are neither `contacts` nor
  `ignored` in the request — so it will legitimately re-suggest them every
  run. The courier deduplicates against everything already in Found or
  Contacts before writing. If that dedupe ever moves server-side, the
  contract needs a `pending` field.
- **Only the default calendar is read**, in a fixed window: 365 days back,
  180 forward (constants at the top of `Code.gs`). Both are mechanical caps
  I chose; neither is ruled anywhere.
- **Body text is quote-stripped by heuristic** (first `>`-quoted line,
  "On … wrote:", Outlook dividers), no length cap. Bounce and auto-reply
  signals live above the fold, which is all the contract wants bodies for.
- **One account per install.** The script reads the mailbox it lives in.
  Jon's two-address season (`jnachman17@gmail.com` + `jnachman@utexas.edu`)
  is only fully covered if the second address is a send-as alias inside the
  same mailbox; a genuinely separate account's mail is invisible. Settings
  asks for all addresses (fixing `is_outbound`), but mail that only exists
  in the other account never reaches the server. Known limitation, unsolved.
- **Failure is silent by design in timed runs** — logged to the Apps Script
  execution log, visible to the student only as a stale
  `Last successful run`. There is no alerting. If the pilot needs any, that
  is a product decision, not a bug fix.
- **The server must handle an empty sheet gracefully** (`contacts: []`,
  `threads: []`) — a brand-new student runs exactly that before adding
  anyone.
- **`student.addresses` and `ignored` are sent as typed** in the sheet;
  matching is the server's job and is case-insensitive per the contract. The
  courier's own `is_outbound` comparison is case-insensitive.

## 7. What was verified, and what was not

Verified: JavaScript syntax (`node --check`); every request field against
`05-CONTRACT.md`; column names against §9; quota numbers against Google's
live page; the warning-screen flow against Google's docs.

**Not verified, because it cannot be from this machine:** the script running
inside a real account — GmailApp/CalendarApp behavior under the explicit
read-only scopes, actual run duration, actual quota consumption, the live
warning-screen wording, and a real round-trip to `/api/engine` (which did not
exist yet). **The first install, per the decision log, is the test** — Jon's
own account, following `INSTALL.md` to the letter, with the rulebook deployed
first so step 22 has something to talk to.

---

## Addendum, September 1, 2026 — brought up to engine rules v3

Written after the conductor's reconciliation (`00c6232`) amended the rules to
v3 with the midnight ruling: *"every timestamp [the courier] sends must carry
the student's own offset"* (§4). The courier as first committed sent UTC —
correct under the contract's letter, wrong under v3, and worth being loud
about because it produces exactly the off-by-one the fixtures caught 98 times.

**Fixed:** `toIso_()` now formats every timestamp — `now`, message dates,
event start/end — in the **spreadsheet's own timezone** with an ISO offset
(`2026-09-01T20:05:00-05:00`), falling back to the script timezone, then UTC.
The spreadsheet timezone (File → Settings) is the authority on where the
student's midnight is.

**Trap this creates, handled in `INSTALL.md`:** a copied sheet inherits the
*master's* timezone, so every pilot student outside Jon's timezone would get
midnight in the wrong place. Part A step 3 has the master check it; Part B
step 5 has each student set their own.

The calendar-RSVP ruling (§6, `Accepted:` etc. as machine mail) needs nothing
from the courier — it sends those messages like any other and the server
classifies them, which is the division of labor working as designed.
