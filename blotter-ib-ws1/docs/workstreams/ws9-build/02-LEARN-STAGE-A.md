# WS9 Learn Phase — Stage A interim report

Mailbox: `jnachman17@gmail.com`
Window: December 1, 2023 – April 30, 2024
Date written: September 1, 2026
Status: **Stage A complete. Paused, waiting for `jnachman@utexas.edu` to be connected.**

**Facts only.** No state categories are derived here and there is no comparison to the
landing page. Both wait for the combined corpus, per the brief §5. The four files the
brief bars until Pass Two have not been read.

---

## 1. What was read

**Method.** A blanket enumeration of the window was rejected after measuring it: one
sample day held ~50 threads, almost all newsletters and promotions, implying ~7,500
threads for the window and violating the brief's instruction not to read irrelevant mail.
Retrieval was targeted instead, in six sweeps:

1. Every thread containing a sent message (`in:sent`) — 144 threads, the backbone.
2. Inbound from 41 bank and firm domains, to catch threads Jon never replied to.
3. Inbound from every personal address in the tracker.
4. `from:mailer-daemon` — bounces.
5. Calendar-notification subjects — `Accepted:`, `Invitation:`, `New Time Proposed`, etc.
6. Cross-address probe: any thread mentioning `jnachman@utexas.edu`.

Bodies were then pulled for every in-scope thread. Capture quality per thread is recorded
in the corpus and summarised in `research/corpus/README.md`.

**Prohibitions.** No attachment was opened, downloaded or inspected — only the read-only
tool schemas were ever loaded, so the attachment-download tool could not be called.
Nothing was written to Gmail or Calendar. Marlin Equity Partners and tax mail were
identified from sender and subject and skipped.

**What was recorded**

| | |
|---|---|
| Records | **50** — 42 people, 8 firm-level process records |
| Messages | **283** — 131 outbound, 152 inbound |
| Threads | 106 |
| Calendar events, recruiting | **35** |
| Bounces | 3 |

**What could not be reached, and one correction to how it was reached.**
The Calendar connector was initially authenticated to `jnachman@utexas.edu` — a different
Google account from the mailbox. That calendar holds **four** events in the entire
five-month window, none of them recruiting. On the first pass this looked like "the
coffee chats are not on the calendar," which would have been a false and very damaging
finding. Jon reconnected Calendar to the gmail account mid-session and 35 recruiting
events appeared. **Any later chat should verify which calendar it is reading before
concluding anything from an empty result.**

---

## 2. The shape of what is in this mailbox

| Month | Messages | Outbound | Inbound |
|---|---|---|---|
| Dec 2023 | **0** | 0 | 0 |
| Jan 2024 | 140 | 63 | 77 |
| Feb 2024 | 59 | 30 | 29 |
| Mar 2024 | 18 | 7 | 11 |
| Apr 2024 | 50 | 23 | 27 |

**December 2023 contains no banking recruiting mail at all.** The first recruiting message
in this mailbox is January 15, 2024. The season, as this mailbox sees it, is fourteen weeks
long and front-loaded: **49% of all messages fall in January**, and the single heaviest day
is January 17.

March is the trough — 18 messages — and it is not a slowdown in recruiting so much as a
change in its shape: by March, Jon is inside two firms' interview processes rather than
opening new relationships. April rises again on the FT Partners interviews and the offer.

**Volume against the marketing figure.** Public material references 742 emails and 112
coffee chats. This mailbox holds **283 messages and 35 recruiting calendar events**.
Stage B will add to both. Jon predicted the real number would be smaller and it is; on
this mailbox alone the message count is roughly 38% of the advertised figure. Reporting
the combined number is a Pass Two job — the point here is only that nothing was calibrated
to reach 742.

---

## 3. Which of the ten questions this mailbox can answer

### Q1 — How much is there? **Answered for this mailbox.** See §2.

42 people. 26 of the 38 contacts Jon emailed ever replied. 12 never replied at all.

### Q2 — Did coffee chats live on the calendar? **Answered, and the answer is layered.**

Of 35 in-scope recruiting events:

| | Count |
|---|---|
| **Jon is the organiser** | **23** |
| Counterparty is the organiser | 9 |
| Organiser hidden (`unknownorganizer@calendar.google.com`) | 3 |
| **Events with no attendee at all — a solo hold** | **8** |
| Events with an external attendee available to match on | 23 |
| Contacts with at least one calendar event | 17 of 42 |

Two facts here bear directly on a ratified claim and both should be read carefully.

**First: yes, the chats are on the calendar.** Every completed networking call this
mailbox evidences has a matching event, with two exceptions named below. The trigger the
product wants does exist.

**Second, and this contradicts the decision log:** session 11 records Jon's recollection
that *"All coffee chats lived on calendar. Literally all of them,"* and generalises it with
the reasoning that *"The student does not create the event — the banker does, and the
invite arrives in the student's calendar whether or not the student is organised… the one
signal in this process that arrives without the student doing anything."*

**In this mailbox, Jon created the invite for 23 of 35 events, and the bankers repeatedly
asked him to.** The mail is explicit and repeated:

- Carson Harris, J.P. Morgan: *"If that works for you please send a calendar invite."*
- Grant Gillespie, Morgan Stanley: *"mind sending across a calendar hold when you get a chance?"*
- Matt Manriquez, Morgan Stanley: *"If you could send a calendar hold with a zoom link…"*
- Jon, to at least six different bankers: *"I'll send you a calendar invite."*

The events exist. The *reason given for why the signal is reliable* does not hold: it was
not arriving without the student doing anything, it was arriving because the student did
something. Per the brief §8 I am not proposing what follows from that — but the sentence
in `04-decision-log.md` session 11 is contradicted by the evidence and the conductor chat
should know before it builds on it.

Three further facts on the same question:

- **8 of 35 events have no attendee at all** — solo blocks Jon typed himself, including
  "Jonathan - Owen Sherry Houlihan RX Intro Call", "Houlihan LA CFR OOH 1st Round
  Interview", "Intrepid Info Session" and four of the FT Partners interviews. There is no
  email address on the event to correlate to a contact.
- **Two contacts have a completed call evidenced in the mail and no calendar event
  anywhere: Jay Klein (Barclays) and Sean Hussey (FT Partners).** Sean's is the starkest —
  the only message in that relationship is Jon's thank-you note for a call that left no
  other trace in either system.
- **The three FT Partners interviews on April 5 and the one on April 17 name no
  interviewer.** Jon's thank-you notes to Brady Flynn, Billy Barber, Sebastian Plate and
  Sam Daddeh are the only record of who he actually spoke to.

### Q3 — The two-address problem. **Partly answered; this is the Stage B worklist.**

The tracker's `Email Sent From` column, across its 58 contact rows:

| Value | Rows |
|---|---|
| `jnachman@utexas.edu` | **26** |
| `jnachman17@gmail.com` | 25 |
| blank | 7 |

**The split is essentially even, and utexas is the larger half.** See §4 for the threads
that visibly lose their outbound half in this mailbox.

### Q4 — Reply-address drift. **Partly answered.**

Personal addresses are heavily used on the banker side: of the tracker's contacts, at
least nine list a personal `gmail.com`, `me.com` or `susser.us` address rather than a
corporate one. Within Stage A the sharper finding is different and it is about case and
about shared mailboxes, not about drift between accounts:

- **Brady Flynn replies from `Brady.flynn@` and `Brady.Flynn@` inside a single thread.**
  Case-sensitive matching splits one person into two.
- **Bank of America.** Jon wrote to `US_Campus@bofa.com`; the reply came from
  `us_campus@bofa.com` and was signed by a named person, Chrissonna Cohen, who is not the
  address on file at all.
- **Nick Gerstein's calendar acceptance arrives from `ngerstein99@gmail.com`** while the
  tracker's stored address for him is `NGerstein99@gmail.com` — same address, different case.

A naive exact, case-sensitive sender match would mis-handle all three.

### Q5 — Bounces. **Answered, and cleanly.**

Three bounces in the window, all recruiting:

| Date | Failed recipient | Detected in |
|---|---|---|
| 2024-02-08 | `Marijoy.Bertolini@aerispartners.com` | 13 seconds |
| 2024-02-08 | `bm@aerispartners.com` | 12 seconds |
| 2024-04-10 | `sarah.marks@citi.com` | 14 seconds |

All three are from `mailer-daemon@googlemail.com`, all carry `Status: 5.1.1`,
`Action: failed` and a `Final-Recipient:` header naming the dead address, and **all three
land inside the same Gmail thread as the outbound that failed.** Detection from headers
alone is reliable and near-instant.

The behaviour around them is more interesting than the mechanics. On February 8 Jon
guessed a second address for the same person 16 minutes after the first bounced, and that
bounced too. He reached Marijoy Bertolini three weeks later — she wrote to *him*, from
`mjb@aerispartners.com`, an address he had never guessed.

### Q6 — Silence. **Answered for this mailbox, with a caution.**

Of 38 contacts Jon emailed, 26 replied:

| First outbound → first reply | Contacts |
|---|---|
| Under 1 day | 17 |
| 1–3 days | 5 |
| 3–7 days | 1 |
| 7 days or more | 3 |
| Never replied | **12** |

Median 0.5 days. But the tail is what matters for any rule keyed on silence, and it is
long: **Elliot Calkins replied after 11 days. Marijoy Bertolini after 21.6 days** — and
that thread went on to produce three interview rounds. A rule that declared a thread dead
at 7, 10 or 14 days would have killed the Aeris relationship, which was the second-most
active of the season.

The reverse case exists too: **Billy Barber replied 15 days after Jon's thank-you note**,
reviving a thread that by any inactivity measure was finished. The trigger was external —
Jon's offer — and nothing inside the thread predicted it.

### Q7 — Thank-you notes. **Answered, and they are highly detectable.**

Jon sent thank-you notes on a consistent template. Nine carry the near-identical subject
**"Enjoyed Our Conversation"** or a close variant, and the body always contains a phrase
of the form *"the time you spent with me over the phone today."* Where the call date is
known, the note follows the same day or the next: Steve McLaughlin's call was 12:30pm PT
and the note went at 6:37pm PT the same evening; Brady Flynn's and Billy Barber's were
same-day.

Consistency is not total. **Lonnie Kauppila conducted the Houlihan LA first-round
interview on February 9 and received a thank-you note on February 10 — and never replied.**
He appears in the corpus as a contact with outbound and no inbound at all.

### Q8 — The tracker. **Read, and it produced the largest surprise of Stage A.** See §5.

### Q9 — What the mail contains that no column captured. **Partly answered.** See §6.

### Q10 — What would have been impossible to compute. **Deferred to Pass Two**, which is
where the brief puts it. Two candidates are already visible and recorded: the tracker's
`Leaving Position` and `Left Position` are human knowledge with no email or calendar
signal behind them, and neither was ever used on a single row.

---

## 4. Threads missing their outbound half — the Stage B worklist

**Four contacts have inbound mail in this mailbox and no outbound at all.** In each case
the inbound is a calendar acceptance for a call that plainly happened, which means the
outreach and the scheduling both occurred somewhere this mailbox cannot see.

| Contact | Firm | What is here | Tracker says `Email Sent From` |
|---|---|---|---|
| **Nick Gerstein** | Citi | Two calendar acceptances (Jan 25, then Jan 26 — a reschedule) | `jnachman@utexas.edu` |
| **Gary Horton** | Intrepid | Calendar acceptance, Jan 22 | `jnachman@utexas.edu` |
| **Will Robinson** | Intrepid | Calendar acceptance, Jan 22 | `jnachman@utexas.edu` |
| **Mat Young** | Citi | Calendar acceptance, Jan 22 | `jnachman17@gmail.com` ← **does not match** |

The first three are exactly what the two-address hypothesis predicts. **Mat Young is not**
— his tracker row says the outreach went from gmail, and it is not in gmail. Either the
tracker is wrong on that row or the message was deleted. Recorded as an open discrepancy,
not resolved.

**And the larger worklist: 29 of the tracker's 58 contact rows have no mail in this
mailbox at all.** Among them are people the calendar proves Jon actually spoke to —
**Kevin Stephens** (Houlihan Lokey, call Jan 30) and **Danny Shin** (Houlihan Lokey, call
Jan 29) both have calendar events here and zero email. Both tracker rows say
`jnachman@utexas.edu`. The full list is in `research/scripts/tracker_raw.json`; the
high-value names are Joshua Gumm (FT Partners — the referral that started the chain
leading to Jon's eventual employer), John Sellingsloh, Sonu Johl, Chris Getz, Keaton
Cruzcosa, and the nine senior MDs Chris Miller referred.

**One caution for whoever runs Stage B.** Grace Steelman appeared as "missing outbound" in
an intermediate build of this corpus and that was wrong — her outbound was present, buried
inside a 24-message thread belonging to someone else. Confirm each of the four above by
address, not by thread.

---

## 5. The tracker: what the file actually shows

Read with a stdlib XLSX reader (`research/scripts/read_tracker.py`; `openpyxl` is not
installed here). Two sheets: `Banking Contacts`, 58 contact rows; `Email Structures`, a
firm-by-firm email-format reference that is **entirely inherited template content with no
data of Jon's in it.**

### The decay-versus-dead-on-arrival question, resolved against the file

`01-project-and-product.md` says the tracker's value is *"the decay curve: state columns
maintained early, then abandoned as the season got busy."* Jon's later recollection was
that the states *"were from a template. I never really followed them whatsoever."*

**The file supports neither description exactly, and what it shows is sharper than both.**

Every `Initial Contact` date in the tracker falls between **January 16 and January 30,
2024** — a fifteen-day band. There is one 2023 date, which is a typo, and one cell reading
"Ongoing". Every `Call Date` falls between January 18 and February 1. **The tracker has no
entry of any kind after February 1, 2024.**

The mail runs to April 23. So the tracker did not decay column by column, and it was not
dead on arrival either — **the entire artefact, contact layer included, was abandoned
whole after about two weeks**, while the season still had eleven weeks and 143 more
messages to run. It stops before the FT Partners relationship that produced the offer even
begins.

That is a third answer and it should replace both. Jon is right that he never trusted the
states; the file adds that he stopped maintaining the contact rows at the same moment.

### Which columns carried real data

18 columns, not the 19 in the brief — `Total` is a label in the legend block, not a
contact column.

| Column | Filled | Column | Filled |
|---|---|---|---|
| Name | 100% | Notes | 46% |
| Position | 98% | **Call Date** | **39%** |
| Company | 98% | **Thank you email** | **29%** |
| Location | 98% | **Secondary Contact** | **12%** |
| Relation | 98% | **Degree** | **2%** |
| Contact | 96% | | |
| Email | 94% | | |
| Group/Division | 93% | | |
| LinkedIn | 93% | | |
| Initial Contact | 89% | | |
| Emaily Sent *(sic)* | 91% | | |
| Response | 75% | | |

The static, enter-once columns are near-complete. **The columns that would have had to be
revisited as things happened are the empty ones** — Call Date 39%, Thank you email 29%,
Secondary Contact 12%. `Degree` was filled exactly once, and that one cell contains the
template's own instruction text, *"Typically only mark if unique"*, not a degree.

Three other template artefacts survive untouched in row 17: the `Notes` cell reads
*"Deals they were on, advice they had, people they said were helpful, interests they have,
etc."* and `Secondary Contact` reads *"Date"*. Jon typed his real first contact's name and
firm around the template's placeholder text and never cleared it.

### The eleven-state legend

Per the brief §9 these are **not** carried forward as candidate categories. Recorded only
as a fact about the file: of the eleven legend rows, **four ever appear on a contact row**
— No Response (22), Phone Call Done (9), Call Pending (2), NOT YET EMAILED (4). Seven never
appear at all, including `Bad Email Address` — despite three real bounces in the mail —
and both `Leaving Position` and `Left Position`.

Meanwhile **five colours appear on contact rows that are in no legend at all**, the largest
being a green used on nine consecutive rows whose `Emaily Sent` value is "Awaiting Send" —
a state Jon invented, used more than any legend colour except No Response, and never wrote
down.

### Contacts in the mail but not in the tracker

**14 people Jon actually corresponded with never made it onto the tracker**, including
every person at the firm he ended up joining: Caroline Hodge, Lindsay McEachern, Brady
Flynn, Billy Barber, Bradley Cagle and Sean Hussey at FT Partners. Also absent: Micah Poag
(Houlihan, who supplied three referral addresses), both Aeris Partners recruiters who ran
Jon through four interview rounds, Matt Manriquez (who ran the Morgan Stanley first round),
and Elliot Calkins.

---

## 6. What is clearly incomplete, stated plainly

1. **Half the season is missing.** 26 of 58 tracker rows say the outreach went from
   `jnachman@utexas.edu`, and 29 rows have no mail here at all. Every number in this
   report is a floor.
2. **The gmail calendar was only connected mid-session.** The 35 events are complete for
   this account, but any utexas-side calendar has not been looked at.
3. **RFC822 `Message-ID` is not exposed** by the Gmail connector. Stage B's deduplication
   must fall back to sender + timestamp + subject and mark those matches inferred. This is
   a real weakening of the merge and it is documented in `corpus/README.md`.
4. **25 threads are recorded as metadata only** — calendar notifications and
   acknowledgements whose bodies are invite blocks and legal disclaimers. Upgradeable by
   re-fetching.
5. **K1 Investment Management is included and flagged, not resolved.** The brief excludes
   "K-1 and tax mail" by name; K1 is a PE firm that recruited Jon and sat on his tracker.
   Four threads are kept with a `scope_flag` demanding Jon's ruling, because including and
   flagging is reversible and dropping is not.
6. **One discrepancy is unresolved**: Mat Young's tracker row says gmail, and his outbound
   is not in gmail.
7. **Phone and text are invisible.** Chris Miller's entire first conversation happened on a
   phone call arranged in two lines of email. The Goldman impersonation attempt reached Jon
   by iMessage. Neither leaves a trace a mail-and-calendar product could see.

---

## 7. What has deliberately not been done

Per the brief: no state categories have been derived, Pass Two has not begun, and
`web/lib/sheet-data.ts`, `web/lib/privacy-copy.ts`,
`ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md` and
`ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md` have **not** been read, so that the
categories can still come up out of the data rather than down from the product.

**Next step: connect `jnachman@utexas.edu` and run Stage B.** Resume instructions are in
`blotter-ib-ws1/research/corpus/README.md`.
