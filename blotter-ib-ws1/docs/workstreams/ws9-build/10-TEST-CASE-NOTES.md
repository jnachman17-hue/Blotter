# Test-case notes — what the answer key covers, and what the rules failed to answer

Date: September 1, 2026. **Round 2 complete — 31 of 31 fixtures pass.**
Author: the Test-cases chat (briefs `07-BRIEF-TEST-CASES.md`, `12-BRIEF-TEST-CASES-2.md`)
Sources: `04-ENGINE-RULES.md` **v3** (the only authority for right answers),
`05-CONTRACT.md` (the shapes), the corpus in `blotter-ib-ws1/research/corpus/`.
**The engine's code was not read.** Not to build these, not to check them —
in round 2 the runner was executed, never opened.

---

## 0. Round 2 — what happened, what changed, and the final count

**Round 1 ended 106 mismatches; every one was `days` (98) or `last_call` (8);
nothing else disagreed anywhere.** Jon ruled for the engine's reading and it is
now rules v3 §4: **a day turns at midnight in the student's timezone** —
`days` is a subtraction of calendar dates, not of elapsed hours — and the
courier must send every timestamp with the student's own offset.

The fixtures were regenerated to that ruling, and **all 31 of 31 now pass**
(`npx tsx web/app/api/engine/run-fixtures.ts`, September 1, 2026). What
changed in the key:

- **Every request timestamp now carries America/Chicago offsets** (`-06:00`
  before the March 10, 2024 DST change, `-05:00` after) instead of UTC `Z`.
  Instants are unchanged; only the rendering moved.
- **Every `days` value** is now a calendar-date subtraction where Jon sat.
  Jessica Luft at 26 days and 18 hours is **27**. Nick Gerstein's
  tomorrow-morning call is **1** day away — now literally §4's example.
- **Every date cell** (`last_contact`, `last_call`, `first_seen`) is the
  Austin calendar date. Evening mail stops sliding onto the next day:
  Sean Kang's 11:15 pm sends are January 30 again, Kate Borden's and Carson
  Harris's evening calls are January 22 and 23 — the eight `last_call`
  values the engine had right in round 1 and the key had wrong.
- **Timezone claim verified against the corpus, as the round-2 brief asked:**
  22 of Jon's 23 self-organised calendar events carry
  `timezone: America/Chicago` (one oddly says `UTC`; other organisers' events
  carry their own zones), which corroborates Austin. The `-08:00`/`-07:00`
  offsets on the corpus's start strings are **not** Jon's zone — they flip at
  the *Pacific* DST date and contradict the events' own timezone fields, so
  they are the capture session's rendering. Instants are exact either way, and
  the build asserts that no event's calendar date moves when re-rendered to
  America/Chicago (none does).
- **The calendar-RSVP ruling is confirmed in v3 §6** and matches what the
  fixtures encoded in round 1: every cell here that depends on it is driven by
  an `Accepted:` / `Invitation:` / `New time proposed:` subject, all in v3's
  list. One residue, noted not flagged: a bare-title invite email with no such
  prefix (a few exist in the corpus) would slip past v3's list as written —
  **no expected value depends on one**, so it is an observation, not a
  finding.
- **One thing the passing run still shows, deliberately unasserted:** the
  engine's `found.context` prose lists every tracked person on the thread
  ("…with Douglas Melsheimer, Kleopatra Kirkland, Grace Steelman and Jay
  Klein"); the key's names the contact at first appearance. The runner calls
  these wording differences and passes them — correct under this README's
  comparison semantics, since the contract fixes no wording. If Jon ever wants
  `context` testable, it needs a sentence in the contract; the engine's fuller
  wording seems the better product answer.

Ambiguities **3.1, 3.2 and 3.3 below are now RESOLVED** by the two v3
rulings. They are kept in place, marked, so the numbering in earlier
discussion stays valid. **Eleven questions remain open**, and §7 names the
three that would most change a real student's sheet.

### 0.1 — Jon's follow-up rulings, same day, after the 31-of-31 report

Jon answered the three questions in plain terms. Two of them settled things:

- **The nine firm-process records are not rows — RESOLVES 3.13.** Jon:
  *"We are not tracking anything at a firm-level or interviews. We will still
  have a column for firm name purely for UI to match contacts with firm."*
  The season fixtures were regenerated to the **58 tracked people**; the nine
  firm records (applications, ATS acknowledgements, the FT interview process)
  no longer appear as rows. Their mail was already invisible to the engine —
  no tracked address occurs in it — so requests are unchanged except the
  contact list; every expected value for the 58 is untouched, and the run is
  **still 31 of 31**. `firm` remains a plain text column on a person's row.
  Unchanged and worth restating: a calendar event *with a tracked person on
  it* still lands on that person's row even when it is an interview (Matt
  Manriquez's Morgan Stanley first round, Paige Butters's two Aeris
  interviews) — that is §7's attendee rule, ratified and engine-agreed; only
  firm-level events with no person attach to nothing.
- **`attempts` — definition confirmed, RESOLVES 3.5 and most of 3.4.** Jon:
  every email sent since they last wrote back is an attempt; the
  final-thank-you-on-a-dead-thread situation is handled by marking the row
  `Closed` ("correspondence over"), not by special-casing the count. That is
  exactly what the fixtures encode (bounced sends count — Sean Kang is 3;
  thank-yous count; `Closed` retires the row). **One sliver stays open**, now
  the tail of 3.4: whether a send to a *third party* inside the contact's
  single-contact conversation counts (Sam Ward's thread forwarded to family
  currently adds an attempt). Put back to Jon as a one-line yes/no.
- **`found.name` (3.7) was re-explained in plain English** — the "found
  these" approval card can currently show only a bare email address, because
  the agreed courier→engine format carries no display names. Still awaiting
  Jon's ruling; a fix is a contract change (name fields on messages), and one
  more honest caveat now recorded: the corpus captured bare addresses only,
  so even after a contract change these fixtures could not carry real display
  names without re-fetching mail.

What exists now:

- **62 fixture files** in `web/app/api/engine/__fixtures__/` — 31 request/expected
  pairs plus a README that defines comparison semantics.
- **4 season fixtures**: the **58 tracked people** as one sheet (the corpus's 9
  firm-process records are not rows — Jon's ruling, §0.1), asked what was true
  on 2024-01-25 (peak), 2024-02-15 (just after the tracker died), 2024-03-15
  (the quiet stretch), 2024-04-30 (season end). Same rows, same order, four
  clocks.
- **15 targeted cases** (27 pairs), one per hard situation named in the brief.
- The conversion script `blotter-ib-ws1/research/scripts/build_fixtures.py`.
  It converts and validates; it decides nothing. Every status, anchor,
  attempts count and found entry is hand-authored data inside it, derived in
  this document. It cross-checks every hand-written anchor against the corpus
  (the anchor must exist, with the right direction) and every `Not emailed`
  claim against the request (no message may carry that contact's address), so
  a transcription slip fails the build instead of poisoning the key.

Season expected-state counts, as a shape check:

| `now` | Sent | Replied | Call sched. | Call done | Bounced | Not emailed | found |
|---|---|---|---|---|---|---|---|
| 2024-01-25 | 26 | 5 | 6 | 1 | 0 | 20 | 7 |
| 2024-02-15 | 38 | 11 | 0 | 1 | 2 | 6 | 10 |
| 2024-03-15 | 38 | 12 | 1 | 1 | 1 | 5 | 10 |
| 2024-04-30 | 40 | 15 | 0 | 1 | 1 | 1 | 10 |

(The sole season-end `Not emailed` is Lonnie Kauppila — the corpus capture
gap, §4 below.) Two of those numbers are the season's story told back by the
rules: on the peak day six calls are scheduled at once and nothing has ever
bounced; by season end **40 of 58 rows sit in `Sent`, most of them
90-plus-day-old January cold emails** — the backlog is real, nothing nags
about it (no threshold exists, §4), and `Closed` is the only way a student
clears it (§10).

---

## 1. Coverage — every hard case in the brief, and where it lives

| Brief case | Fixture | Expected answer (short form) |
|---|---|---|
| Jessica Luft's 20-second out-of-office | `cases/01` | `Sent`, never `Replied` (§6) |
| Sean Kang's three bounces saying `Status: 4.4.2` | `cases/02` | `Bounced`, attempts 3 (§4, §5) |
| Marijoy Bertolini's 21.6-day reply | `cases/03` (4 dates) | Not emailed → Bounced → Replied → Replied; no state ever punishes the wait — **but see §4.1 below** |
| Owen Sherry, no address anywhere | `cases/05` | `Call done` via the event title (§7 rule 2); `Not emailed` before the event exists — not an error |
| "Potential favor", five relationships | `cases/06` | Four rows, four different states from one thread (§3); the father surfaces in `found`, not on a row |
| Liz Ream answering for Steve McLaughlin | `cases/07` | Steve's row advances (§3, single-contact conversation); Liz lands in `found` (§8) |
| `Brady.flynn@` / `Brady.Flynn@` | `cases/08` | One person (§3); the variant never appears in `found` (§8) |
| `US_Campus@` / `us_campus@` | `cases/09` | One shared mailbox, one row (§3) |
| Three bcc'd Wells Fargo messages, empty `To` | `cases/10` | They attach via From/Cc (§3); `Replied` |
| Carrie Cruces / Chris Miller / Paige Butters attempts | `cases/11`, `cases/12` | Rule-derived values — **see §4.2, the brief's premise doesn't survive §5 as written** |
| A contact marked `Closed` | `cases/04` (constructed, labelled) | `Closed` beats even `Bounced`, the top of §4's chain |
| Every contact with no mail at all | season fixtures + `cases/05` | `Not emailed`, never an error (20 such rows on 2024-01-25) |

Extra cases the corpus demanded: `cases/13` (Sellingsloh's one cc line
creating five referral suggestions, plus the ignored-list suppression),
`cases/14` (Nick Gerstein: a rescheduled call and attempts 3 — the real
joint-highest), `cases/15` (David Talbot: `Call done` on the peak day, i.e.
the thank-you-owed state, clearing itself per §4).

---

## 2. What is deliberately NOT covered, and why

- **The setup scan (§2, "at setup — once")**: it proposes a contact list; the
  contract has no request/response for proposal. Different seam, not testable
  through `POST /api/engine`.
- **The referral approval round-trip** (`found` → student approves → contact):
  spans multiple runs and a sheet edit. Single stateless calls can't hold it.
  The `found` half is covered; the `ignored` half is covered in `cases/13`.
- **Sorting ("longest-waiting first", §4)**: the response echoes request
  order by contract; sorting is a view concern. Days values are asserted, so
  a sorter has what it needs.
- **`warnings` content**: the contract names example categories but no shape.
  Expected files carry `[]` = "no claim". See §3.9.
- **Thank-you-based call detection**: Pass One showed thank-you notes find 76%
  of calls, but **no rule uses them** — §4/§7 make calls calendar-only. So
  Chris Miller's two phone-arranged calls and Sean Hussey's super-day
  conversation show `last_call: null` forever in the key. If that reads wrong,
  it is a missing rule, not an engine bug.
- **The 149 non-recruiting calendar events**: captured title-and-start only;
  couldn't be converted faithfully. A live courier will send them; §7 says
  unmatched events are ignored, and the K1 event (below) tests that with a
  real orphan.
- **Declined invites / cancelled events**: the contract's event has no
  response-status and no status field, so an engine cannot tell. No corpus
  instance either. Recorded as a contract observation, §3.12.
- **§11's three open items** (scan depth beyond 3 months, firm changes,
  correction mechanism): open in the rules, open here.

---

## 3. The ambiguities the rules do not decide — the reason this chat exists

Each of these was found by trying to write an expected value and discovering
the rules do not fix one. **None is decided here.** The fixtures use a stated
provisional convention where one was unavoidable; each needs Jon's ruling, and
the affected cells are listed so the flip cost is visible. *(Round 2: items
3.1–3.3 are now ruled and marked RESOLVED in place; eleven remain.)*

**3.1 — What is a "day"? — RESOLVED, rules v3 §4 (September 1, 2026).** A day
turns at midnight in the student's timezone; `days` subtracts calendar dates.
The engine's reading was upheld against the key's floor-of-elapsed-hours; the
key was regenerated to it. Kept here because 98 of round 1's 106 mismatches
were exactly this question.

**3.2 — Date cells cross midnight in the wrong timezone — RESOLVED with 3.1.**
Same ruling: every date cell is the student's calendar date, and §4 v3 binds
the courier to send timestamps in the student's own offset so the engine can
tell. Kate Borden's `last_call` is `2024-01-22` and Carson Harris's
`2024-01-23` — the engine's round-1 values, now the key's too.

**3.3 — Is a calendar acceptance a reply? — RESOLVED, rules v3 §6.** The
key's round-1 reading was ratified: `Accepted:`, `Declined:`, `Tentatively
accepted:`, `Invitation:`, `Updated invitation:`, `Canceled event:` and `New
time proposed:` are machine mail in either direction — never a reply, never an
attempt, never `last_contact`. Found via Mat Young. One wording residue is
recorded in §0: a bare-title invite email with none of those prefixes would
slip the list as written; no expected value here depends on one.

**3.4 — What exactly does `attempts` count? — MOSTLY RESOLVED, §0.1.** Jon
confirmed §5 in plain terms: every email sent since they last wrote back is an
attempt (so bounced sends count — Sean Kang is 3), and the
final-thank-you-then-silence endgame is handled by marking `Closed`, not by
special-casing the count. **The one sliver still open:** in a single-contact
conversation, does an outbound to a *third party* count? §3 says everything in
the conversation is that person's activity, so the key says yes — Sam Ward's
attempts is 2, one of which is Jon forwarding the thread to family. One-line
yes/no from Jon settles it; "no" changes exactly one value (Sam Ward 2→1)
plus a sentence in §5.

**3.5 — The round-1 brief's "highest attempts" trio — RESOLVED, §0.1.** The
brief named Carrie Cruces, Chris Miller, Paige Butters — the highest **total
message counts** in the corpus index, which is a different number. Jon
confirmed the §5 definition (since they last wrote back), under which the
highest at the four reference dates are **Sean Kang (3, all bounced)** and
**Nick Gerstein (3)**, with Paige peaking at 3 only on 2024-02-27
(`cases/12`). No "total outreach" column exists or is asked for.

**3.6 — Marijoy: the brief says "never anything worse than `Sent`"; the rules
say `Bounced`.** Both of her guessed addresses really bounced on Feb 8, and §4
is explicit: last email came back undelivered → `Bounced`. So from Feb 8 until
her Feb 29 reply, the truthful state is `Bounced`, and the key says so
(`cases/03`, 2024-02-15). The brief's sentence is honoured in its real sense —
no threshold ever escalates or kills her row, and her post-reply stretch is a
plain state with a growing clock — but if Jon intended literally-never-Bounced
for her, the rules and the brief conflict and the rules won. **Flagged rather
than softened; brief §5 forbids softening.**

**3.7 — `found.name` cannot exist.** The contract's response example shows
`"name": "Liz Ream"`, but the contract's request carries **bare addresses** —
no display names anywhere. No engine can honestly produce that name. Expected
files say `name: null`. Either the request grows display-name fields, or the
response drops `name`. Contract ruling needed.

**3.8 — Does §8 read headers or bodies?** "When a new address appears in a
conversation…" — appears where? Micah Poag's three referral addresses exist
only in body text; signatures and quoted disclaimers are full of addresses.
*Convention: headers only (From/To/Cc).* Body-mining would surface Micah's
referrals and also a torrent of noise. Needs a ruling; the fixtures will flag
any engine that body-mines, which is the conservative default to test for.

**3.9 — `warnings` has no shape.** Categories are named ("an event that
matched nobody", "an address seen in two capitalisations") but no format, no
obligation. The key asserts nothing about warnings. If Jon wants warnings
testable, the contract needs a sentence.

**3.10 — What does a `Closed` row show in the other columns?** §4's table
gives `Closed` no clock; §9 says Blotter recomputes its columns every run and
obeys `Closed`. Blank everything, or keep the facts? *Convention: facts kept,
`days: null`* (`cases/04`). Cosmetic, but somebody will notice.

**3.11 — A `now` that lands mid-call.** "Upcoming" (days until) vs "happened"
(days since) — §4 doesn't say which side of the boundary a call in progress
sits on. All fixture `now`s deliberately avoid mid-event instants. Needs one
sentence in the rules ("a call that has started counts as happened", or its
opposite).

**3.12 — Assorted contract observations, recorded while converting.**
(a) `next_call`'s non-null format is never shown; the key uses the event's
`start` verbatim since §9's sheet shows a time of day. (b) Events carry no
attendee response-status, so a declined invite still reads `Call scheduled`.
(c) `firm: null` on a row — legal or not? The nine firm-process rows carry it.
(d) Bounced rows' `last_contact` is undefined; the key uses the final send
date. (e) The student's third alias (`jnachman@utmail.utexas.edu`) appears in
no corpus thread, so fixtures carry two `student.addresses`; onboarding still
has to ask for every alias or §8 will one day suggest the student to
themselves.

**3.13 — §1 versus the 67 rows — RESOLVED, §0.1.** Jon ruled the nine
firm-process records are not rows at all: nothing is tracked at firm level,
and `firm` is purely a text column on a person's row for the UI. The season
fixtures now carry the 58 people. The firm records' mail stays invisible
either way (the season-end request contains 274 of the corpus's 325 messages;
the missing 51 are exactly the firm threads, Lonnie's broken capture, and two
invite-only threads). Still true and recorded: because the engine reads whole
conversations only when a tracked address appears in them (§2), Liz Ream's
two calendar-invite emails and the `FRCampusRecruiting@hl.com` scheduling
thread are structurally invisible — the meeting facts arrive via the calendar
instead. As ruled, not a bug. And the corollary stands, now sharper: **the
sheet has no row on which the FT Partners interview season can appear at
all** — version one goes quiet exactly there, by design (§1).

---

## 4. Corpus facts a mismatch-investigator must know before blaming the engine

- **Lonnie Kauppila** (`§5` of the corpus README notwithstanding): her one
  real message — the thank-you after the Houlihan LA interview — was captured
  `metadata_only` with an **empty To line**. As recorded it attaches to
  nobody, so the key says `Not emailed`, which is almost certainly false to
  reality. Re-fetch that thread (`get_thread`) before adjudicating any Lonnie
  mismatch. Her interview also has no attendee on the calendar event, so
  nothing else reaches her either.
- **Two Sean Kang outbound bodies are bracketed corpus placeholders** ("[same
  outreach text as…]"), harmless because outbound bodies decide nothing.
- **Metadata-only messages carry midnight timestamps** in a few places (Liz
  Ream's invites 2024-02-14/15T00:00:00Z, two Paige invites, Lonnie). None
  anchors an expected value.
- **The calendar is final-state.** Nick Gerstein's call was rescheduled from
  Jan 25 to Jan 26; the calendar holds only the final event. A courier running
  live on Jan 24 would have seen the earlier date. Untestable from this
  archive; recorded.
- **The K1 event survives its contact.** Jon ruled K1 Investment Management
  out of scope and the record was removed (67 records, 325 messages — matching
  the rules' own numbers), but "Katrina/Jonathan: K1 Intro" is still on the
  real calendar, so season requests from 2024-02-15 onward carry an event that
  matches nobody. Deliberate: it is the realest possible unmatched-event test.
- **`index.json`'s totals block is stale** (says 68 records / 352 messages;
  the records list is 67, unique messages 325). The fixtures were built from
  the records list, not the totals.
- **Mat Young is not actually silent.** His corpus record shows only a
  calendar acceptance (`missing_outbound: true`), but the "Intro" thread
  carries real messages he is on, including one he wrote — the corpus filed
  those under Carrie and Chris. The conversion merges threads across records,
  so his fixture rows reflect his real activity. The tracker's claim that his
  outreach was sent from gmail remains unresolved, as the Learn findings left
  it.

---

## 5. The season key, derived (grouped; every group cites its rules)

Anchors, attempts and dates per row are data in `build_fixtures.py`
(`SEASON_ANSWERS`); this section is the reasoning. All clocks per §4's table;
precedence `Bounced > Call scheduled > Call done > Replied/Sent`; matching per
§3 (case-insensitive, conversation-scoped, party-filtered when a thread holds
several tracked people); calendar per §7; found per §8.

- **Cold email, never answered — 13 rows** (Alice Watts, Anna Giesler, Barbara
  Barman, Olivia Henderson, Quincy Steele, Noble Nash, Victoria Daly, Sam
  Susser, Luke Skelly, Nicholas Perez, Keaton Cruzcosa, Micah Poag*, Kammeh
  Valliani, Kyle Gunnison — the last two start Jan 31, so `Not emailed` on
  Jan 25): **`Sent`** from the send onward, `attempts 1`, clock since the last
  send, growing to ~90–104 days by Apr 30 with no escalation anywhere —
  §4's "no threshold" made visible. (*Micah replied twice in January then went
  silent after Jon's last send, same end state.)
- **Cold email, bumped, never answered — 5 rows** (Kathryn Dzierzanowski,
  Ryan Wheeler, Michael Liou, Turner Gauntt, Mike Giaquinto): `Sent`,
  `attempts 2` once the bump exists (§5), clock resets to the bump — Mike's
  Feb 26 bump lands between the Feb and Mar dates, so his row shows 1→1→2→2.
- **Replied and left with Jon — the quiet debt** (Chris Miller, Grey Bianca,
  Kate Borden, Joseph Candelario, Kleopatra Kirkland, Maura Vestal, Lynell
  Velten, Sara Laracca, Gayathri Ravi, David Talbot from Feb, Marijoy and
  Paige at season end, Emily Saunders, Sean Hussey): **`Replied`**, clock
  since *their* last message, `attempts 0`. Kleopatra reaches **104 days** by
  season end — she answered on Jan 17 and Jon replied to Doug instead; the
  rules put her at the top of the longest-waiting sort forever. True, and
  worth Jon seeing.
- **The call pipeline on the peak day** (Will Robinson and Grant Gillespie
  today, Nick tomorrow at 10, Doug and Mat Friday, Kevin next Tuesday):
  **`Call scheduled`**, days-until on the clock, `next_call` carrying the
  event start (§4, §7). David Talbot is the sole **`Call done`** — his call
  ended 20 hours ago and nobody has written since: the row that *means* a
  thank-you is owed (§4). Every other completed call on the board (Joseph,
  Joshua, Carrie, Kate, Gary, Carson) has already been written after —
  mostly Jon's same-day thank-yous — so those rows are `Sent`/`Replied` with
  `last_call` keeping the date permanently (§4).
- **The bounce rows** (Sean Kang from Jan 31, Marijoy Feb 8–29): **`Bounced`**
  wins over everything else present (§4), clock since the bounce, and the
  Stifel `Status: 4.4.2` texts are in the request bodies precisely so a
  status-code-keyed engine fails loudly (§4's cut of `5.x`-keying, Learn Q5).
- **The nine firm-process records: not rows at all** (Jon's ruling, §0.1) —
  the sheet is the 58 people. Their mail matches no tracked address, so it
  appears in no request; in mid-April, when the real season was all FT
  Partners interviews, the sheet simply has nothing to show. Blotter v1 goes
  quiet there by design (§1); the key states it rather than hiding it.
- **found** (§8): seven suggestions by Jan 25 (Jon's father from "Potential
  favor", his mother's address from Chris Miller's thread, brother Andrew from
  Kleopatra's, the three un-tracked Intrepid bankers from Sellingsloh's cc
  line, `FRCampusRecruiting@hl.com` from Sam Ward's thread), ten by Feb 15
  (plus `careers@aerispartners.com`, the Goldman recruiting-ops list, and
  **Liz Ream** — the §8 canonical example). Bounce senders and own addresses
  never appear (§8's never-list). That the suggestions include Jon's parents
  is §8 working as ratified — approval exists exactly because Blotter cannot
  know who these people are; recorded for Jon's judgment, not adjusted.

## 6. The fifteen cases, derived

**01 Jessica Luft.** Outbound Jan 19 23:44:46Z; out-of-office back in 20
seconds **from her own address, in a different Gmail thread**. §6: an
auto-reply is not a reply. Row: `Sent`, days since *Jon's* send (27 on
Feb 15), `attempts 1`, `found` empty. A naive engine says `Replied, 0 days`
— the exact failure §6 was written against.

**02 Sean Kang.** Three sends, 3m38s, three bounces from
`mailer-daemon@googlemail.com` inside the three threads, one carrying
`Status: 4.4.2` with SMTP 550 and "Address not found" in the text. §4:
`Bounced`, days since the last bounce (16 on Feb 15 — the sends were 11:15 pm
in Austin on January 30). §5: `attempts 3`. §8:
mailer-daemon never suggested. The engine that keys on `Status: 5.x` marks him
`Sent` and eventually tells a student to bump a dead address three times —
the corpus's worst false-positive, now a red bar.

**03 Marijoy Bertolini.** Jan 25 `Not emailed` (nothing yet). Feb 15
`Bounced` 8, `attempts 2` — both guessed addresses died in under 15 seconds.
Mar 15 `Replied` 15 — she wrote back Feb 29 **from an address Jon never
guessed**, 21.6 days after first outreach, and the clock now runs on Jon, not
her. Apr 30 `Replied` 35 (her Mar 26 update was the process ending; the rules
have no way to know that, and correctly none to guess it — §6). At no date
does any threshold state exist to kill the row. See ambiguity 3.6 for the
Bounced-vs-Sent wording clash with the brief.

**04 Closed wins (constructed, labelled).** Marijoy's real Feb 15 request
with `closed: true`. §10: the student marks it, Blotter obeys; §9: `Closed` is
read from the sheet. Expected `Closed`, `days null` — beating `Bounced`, the
top of §4's precedence chain, which is the strongest possible reading of "the
state must win over everything else".

**05 Owen Sherry.** A row with **no email address**, zero threads ever, and
one attendee-less calendar event titled "Jonathan - Owen Sherry Houlihan RX
Intro Call". Jan 25 (event not yet created): `Not emailed`, all columns null
— a contact with no mail is a row, not an error (contract: every contact gets
exactly one row). Feb 15: §7 rule 2 (first name + firm in the title) is the
only wire that reaches him — `Call done` 13, `last_call 2024-02-02`,
`last_contact null`. Note for the engine builder, flagged not decided: the
title says "Houlihan", the row's firm is "Houlihan Lokey" — §7's "firm in the
title" must tolerate partial firm names, as the rules' own example
("Carson - Jonathan **JPM** IB Call") already implies.

**06 Potential favor.** One thread, 24 messages, five relationships; four are
tracked rows here. §3's multi-contact rule (a person's state comes only from
messages they are on) produces four different rows out of the same
conversation on Feb 15: Doug `Sent 16` (he answered, Jon closed the loop
post-call), Kleopatra `Replied 29` (she answered Jan 17 and was never
answered), Grace `Sent 6` (her thread ran two weeks behind Doug's), Jay
`Sent 15`. One person replying marked nobody else `Replied`. The fifth
relationship — Jon's father, who started the thread — appears in `found`
with the brother's address, per §8.

**07 Liz Ream for Steve.** The deliberate opposite of 06 (§3 separates
them): in Steve's threads **Steve is the only tracked contact**, so
everything in the conversation is his activity — Liz's scheduling replies
advance his row. Feb 15: `Replied 1` (Steve wrote at 10:11 the previous
evening, Austin time). Mar 15: the Feb 19 call happened (`last_call
2024-02-19`), Jon's thank-you went out the same evening — clearing `Call
done` exactly as §4 describes — and Steve answered 21 minutes later:
`Replied 25`. Liz is in
`found` at both dates. One detail the mechanical conversion surfaced: Liz's
two calendar-invite emails live in threads that contain no tracked address,
so the courier never sends them (§2/§3) — the event arrives via the calendar
instead, and nothing in the expected values depends on those two messages.

**08 Brady Flynn.** His thread starts at `Brady.flynn@` and continues from
`Brady.Flynn@`. One row, one casing stored. §3: capitalisation is ignored, so
the Apr 17–18 messages attach; expected `Replied 12` on Apr 30 with
`attempts 0`. §8: `found` is **empty** — the other casing is "already in the
sheet under any capitalisation". An engine that case-splits shows `Sent`
(having missed his reply) and suggests the man to himself.

**09 US_Campus.** Jon wrote twice to `US_Campus@bofa.com`; the answer came
from `us_campus@bofa.com`, signed by a person. Mid-afternoon Apr 8: `Sent 0`,
`attempts 2`. Apr 30: `Replied 22`, `attempts 0`. Same §3 clause as Brady, on
a shared mailbox a student plausibly tracks as a row.

**10 Wells Fargo bcc.** Three inbound messages with an **empty To line** (the
firm bcc'd its whole candidate list; its own addresses sit in From and Cc).
§3 matches on From/To/Cc, so they attach; expected `Replied 22` on Apr 30.
One of these carried a hard deadline; under the old sender-matching design it
was invisible. The empty To must never crash matching or produce a dropped
row (contract: silently dropping a contact is forbidden).

**11 Citi intro trio.** Chris Miller's "Intro" thread accretes Carrie, then
Mat Young — three tracked people in one thread, so §3's party filter decides
every message's ownership. Jan 25: Chris `Replied 3` `attempts 0` (he wrote
last to Jon and was never answered); Carrie `Sent 3` `attempts 1` with
`last_call 2024-01-22` — her call ended 20:30Z and Jon's note went 21:02Z, so
`Call done` had already cleared itself (§4); Mat `Call scheduled 1` for
Friday's call, `attempts 1`. Also the row where the corpus's own
per-contact filing undersold a person and conversation-reading (§2) restores
him — see §4 note on Mat.

**12 Paige Butters.** The longest arc: application → her reply → **three
sends in a row** (Feb 9, 19, 27 — the real highest attempts run in the
season) → she answers 85 minutes after the third → coffee chat → two
interviews, all three events attendee-matched to her row (§7). Snapshots:
Feb 15 `Sent 6` `attempts 1`; **Feb 27 3 pm Austin `Sent 0` `attempts 3`** (the
peak, minutes before her reply); Mar 15 `Call scheduled 3` — the behavioral
interview is Monday, `next_call` carries it, `last_call 2024-03-06` (§4:
`Last call` keeps its date regardless); Apr 30 `Replied 35`. Note §1 does not
exclude these events: they are interviews *with a tracked person as
attendee*, which §7 attaches like any call; only the firm-level events (FT
rounds, info sessions) fall out.

**13 Sellingsloh cc-five.** His single reply cc's five Intrepid colleagues.
With John the only row, §8 suggests **all five** (`first_seen 2024-01-19` —
his reply landed at 7:31 pm in Austin) — the "John Sellingsloh created five
in a single Cc line" mechanic verbatim. The `-ignored` variant (constructed
`ignored` entry, labelled) removes `cook@` and expects four: "ignored ones
never come back". Row itself: `Sent 5`, `attempts 1`.

**14 Nick Gerstein.** Jan 25: `Call scheduled 1` — tomorrow 10:00 Central,
and "a call tomorrow morning is 1 day away" is now §4 v3's own example; the
calendar holds only the **final** date of a rescheduled call (the two
acceptance emails for two different dates are in the request as data). Feb 15:
after the call Jon wrote three times with no answer — `Sent 20`,
**`attempts 3`**, `last_call 2024-01-26`. The acceptances are machine mail per
§6 v3, so they reset nothing.

**15 David Talbot.** Noon Austin, Jan 25: his call ended 4 pm yesterday and
nobody has written since → **`Call done 1`** — §4's thank-you-owed state, held
until somebody writes. Feb 15: Jon's note went the evening of the 25th (the
state cleared itself to `Sent` at that instant), David answered ten minutes
later → `Replied 21`, `last_call` still `2024-01-24` (§4: the date is
permanent).

---

## 7. Unsettled, awaiting Jon — eight and a half remain

Round 2 resolved the day rule (3.1, 3.2) and the calendar-RSVP rule (3.3).
Jon's same-day follow-up (§0.1) resolved the firm-rows question (3.13), the
"highest attempts" discrepancy (3.5), and most of the attempts definition
(3.4). What is left, one line each; full statements in §3:

1. The 3.4 sliver: does a send to a third party inside the contact's
   conversation count as an attempt? (One value in the key rides on it —
   Sam Ward.)
2. Marijoy: `Bounced` in the gap vs the round-1 brief's "never worse than
   `Sent`" (3.6) — the key follows the rules (`Bounced`).
3. **`found.name` is unproducible from the contract's request (3.7)** — the
   "found these" card can only show a bare address today. The one still-open
   question that most changes what a student sees; re-explained to Jon in
   plain English, awaiting his call. A yes means a contract change (display
   names on messages) and, honestly, a corpus re-fetch if the fixtures are
   ever to carry real names.
4. §8: headers only, or bodies too? (3.8)
5. `warnings` shape — and `found.context` wording — testable or explicitly
   not (3.9, §0).
6. `Closed` rows: blank the columns or keep the facts (3.10).
7. Mid-call `now` (3.11).
8. `next_call` format; declined invites; nullable `firm`; Bounced
   `last_contact`; the utmail alias (3.12).
9. Not a rule question but needing an action: Lonnie's broken capture (§4)
   should be re-fetched, or her row's answer stays a fiction.
