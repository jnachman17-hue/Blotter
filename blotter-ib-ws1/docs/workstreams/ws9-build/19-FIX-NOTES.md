# Fix notes — the four live-test defects

Date: September 2, 2026
Brief: `18-BRIEF-LIVE-TEST-FIXES.md`
Status: **All four fixed. Everything green.**

| Check | Result |
|---|---|
| `npx tsx web/app/api/engine/run-fixtures.ts` | **40 of 40 pass** |
| `npx tsx web/app/api/engine/selftest.ts` | **129 of 129 pass** (was 120) |
| `node courier/helpers.test.js` | **87 of 87 pass** (was 67) |
| `tsc --noEmit`, `eslint --max-warnings 0` | Clean |
| `node --check` on `Code.gs` | Clean |
| Expected values changed | **137, every one D24.** See §2 |

**One thing needs Jon: the contract went to version 3, so the server ships
before he pastes.** He has done that sequence once and it worked.

---

## 1. Fix 1 — a typed address could silently never match

**Two changes, and the brief was right that the second matters more.**

**(a) The characters.** `normaliseTyped_` in `Code.gs` undoes what an editor
substitutes for what a person typed, before the address pattern ever sees it:
the dash family (`U+2010`–`U+2015`, `U+2212`, and the full-width and
presentation forms), non-breaking and typographic spaces, zero-width
characters, curly quotes, and the full-width `＠` and `．`. Every address read
anywhere in the courier now goes through it — `addressList_`, `bareAddress_`,
`splitHeaderParts_` and `namedAddress_`.

**It is deliberately a list of substitutions, not a looser pattern.** Widening
the regex would start matching things that are not addresses; undoing known
substitutions cannot, because a real address never contains any of these.
`normaliseTyped_('a-b@c-d.com')` returns itself unchanged, and that is asserted.

**Capitalisation was never the problem** and nothing was changed for it —
matching lowercases everywhere already.

**(b) The general defence, which is the real fix.** `readContacts_` now
collects every row that has a **Name or an Email cell with something in it**
but no address the courier can parse. Those rows produce a warning that reaches
the student in **both** places they look:

- **the run dialog**, under a heading `CHECK THESE ROW(S)` — they are looking at
  it right now, and a bad address is worth interrupting them for;
- **`Settings → Last run warnings`**, first in the list, where it stays.

**The wording names the row and quotes the cell**, because "something is wrong"
sends somebody hunting and *"Row 7 (Jane Doe): `jane@acme,com` is not an email
address Blotter can read"* does not. It also names the likely cause in plain
words: *"autocorrect sometimes replaces a hyphen with a dash that looks
identical."*

**Why this matters more than the character list:** there will always be a
character nobody anticipated. The failure mode being *silent* is the defect;
the en dash was just the instance that found it.

---

## 2. Fix 2 — `Days` and `Attempts` show a number only where it means something

**D24, and the only fix that changed an expected value.**

**Where the work went.** The **engine** decides and returns `null`; the
**courier** renders `null` as a dash and makes no judgment. That division is
the point — the courier stays dumb.

| Status | `days` | `attempts` |
|---|---|---|
| `Sent` | since you wrote | **the count** |
| `Replied` | since they wrote | `null` |
| `Call done` | since the call | `null` |
| everything else | `null` | `null` |

**`Attempts` is still computed correctly** — D24 governs whether it is shown,
not whether it is right — and a self-test pins that a second send still counts
2 on a `Sent` row.

### The contract went to version 3, and here is why

`attempts` moved from "always a number" to "sometimes absent". **That is a
shape change, and the contract's own rule is that any change needs a bump.**

The tempting argument against was that an un-bumped older courier would not
crash — it would quietly write a blank cell where a dash belongs. **That is
exactly the argument for bumping.** A silent, wrong-looking answer is what the
version number exists to prevent, and eroding the rule for a change that
happens to fail gently is how the rule stops being trusted.

**One thing the contract now says out loud that it had always done quietly:**
the version describes the **shape of the wire**, never the **rules**. The
engine has one set of judgments and they are always the current ones — a
version-1 request has been receiving every ruling made since version 1 for two
bumps now. Version 2 already returned `found.name: null` to version-1 clients,
which version 1 never promised. Writing it down beats leaving it as folklore.

### Every expected value that changed

**137 values across 31 files, and they are all one thing.** Before touching the
answer key, the engine was run against the unchanged fixtures and every single
mismatch was categorised: **115 `attempts` and 22 `days`, each of them a number
becoming `null`.** No status moved, no date moved, no `found` entry moved.

That check is reproducible — `git diff` on `__fixtures__/` touches exactly two
JSON keys, `days` and `attempts`, and nothing else.

**Authorised by:** D24, in full. No other ruling was needed and none was used.

---

## 3. Fix 3 — an approved contact landed at row 996

**Both protections built, as the brief required.**

**(a) No blank checkboxes (D25).** `setupSheet` no longer paints validation
down the whole `Closed` column. `syncClosedCheckboxes_` puts a checkbox on
every row that holds a person and **clears the validation and the stored
`FALSE` from every row that does not.**

**It runs in setup and again in the write phase**, and the choice is worth
stating: an `onEdit` trigger would put the checkbox under the student's cursor
the moment they type a name, which is nicer — but it needs its own installable
trigger and another authorisation, and it would not fire at all for rows
Blotter itself appends. The write-phase version covers every path with no new
permissions. A hand-typed row gets its checkbox within one run; a row Blotter
appends gets it in the same breath, because the sync runs immediately after the
append.

**It also cleans up.** A sheet built before this fix carries about a thousand
unticked boxes. Re-running `Step 1` removes them. That is what removes the
*cause* rather than working around it.

**A ticked box on a row with a person is never touched.**

**(b) The append no longer trusts `getLastRow()`.** `lastRowWithContact_`
scans the Name and Email columns and returns the last row that actually holds
a person; the append writes to the row after it. A row with only a name counts
(Owen Sherry has no address anywhere and is still a person), and so does a row
with only an address.

**Either alone would have fixed today's bug. Both, because the class of fault
recurs the moment anything else paints a column** — and (b) is the one that
holds even if some future formatting pass reintroduces (a).

---

## 4. Fix 4 — the sheet claimed `Added` when nothing was added

The mark moved inside the `if`. A skip now writes **`Already in Contacts`**,
which is what actually happened, and the run dialog reports the skip count
alongside the added count.

`addApprovedContacts_` returns `{added, skipped}` rather than a bare number.

---

## 5. Findings and things worth knowing

### 5.1 D24 quietly retires the `Call cancelled` clock ruling

**Not a conflict — a later ruling narrowing an earlier one — but the conductor
should see it.**

Earlier today `Call cancelled`'s clock was ruled at length: *days since the
last thing that actually happened*, replacing *days since it was declined*,
which Google publishes nowhere. **D24 now says `Call cancelled` shows a dash.**
So that clock is no longer observable anywhere, and the code that computed it
(`lastRealActivity`) has been removed as dead.

**The reasoning still matters and is not lost**: the *status* test still needs
to know when a call was called off, and that is `cancelledAtEpoch`, which is
untouched and still reads the `Declined:` notification. Only the displayed
number went.

**If Jon ever wants a number back on that row, the anchor to restore is in
`16-PHASE-A-NOTES.md` §5.1.**

### 5.2 The warning path is courier-side, and that is a small asymmetry

Every other warning in the system is the engine's and travels in the response.
This one cannot be: **the engine never sees the malformed cell.** A row whose
address will not parse arrives as a contact with an empty `emails` list, which
is indistinguishable from Owen Sherry, who legitimately has none.

So the courier raises it, and `Last run warnings` now holds two kinds of
sentence from two sources. Nothing breaks, and the alternative — sending raw
cell text to the server so it can complain about it — would put judgment in the
wrong place and put unparsed user input on the wire.

### 5.3 An empty Email cell on a named row now warns too

A row with a name and a blank Email produces *"Row 3 (Owen Sherry) has no email
address…"*. **That is correct and deliberate** — such a row genuinely can only
ever be reached by the calendar title match — but a student who keeps
placeholder rows will see it every run. If that turns out to be noise in
practice, the narrowing is one condition (`cell !== ''`), not a redesign.

### 5.4 Not built, and confirmed not needed

**D2's 10-recipient cap is already built** — `MAX_THREAD_RECIPIENTS = 10` at
the top of `Code.gs`, with tests. The brief said to check first; it was
checked.

The setup scan, the setup diff, the UI work and `Next call`'s raw ISO format
were all left alone.

---

## 6. What the next chat must not trip over

- **Ship the server before the courier.** Contract version 3. A courier sending
  `version: 3` to a server that speaks 2 gets a 400 and writes nothing — safe,
  but the sheet goes stale until both sides land.
- **`attempts` is `number | null` now.** Anything reading it must handle null.
- **`addApprovedContacts_` returns an object**, not a number.
- **Never use `appendRow` on the Contacts sheet.** `getLastRow()` counts
  formatting and unticked checkboxes as content; that is what put a contact at
  row 996. Use `lastRowWithContact_`.
- **`normaliseTyped_` is a list of known substitutions, not a permissive
  pattern.** Adding to it is cheap and safe; loosening `ONE_ADDRESS` is not.
- **Run `node courier/helpers.test.js` after touching `Code.gs`.** Nothing runs
  it automatically. It now covers the address normalisation, the row-996 append
  and the checkbox sync's inputs, alongside the earlier coverage.
- **The engine still has exactly one `.body` read** (bounce detection). §8/D15
  is intact.
