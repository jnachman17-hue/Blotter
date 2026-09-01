# WS9 Learn Phase — findings

Mailboxes: `jnachman17@gmail.com` and `jnachman@utexas.edu`
Window: December 1, 2023 – April 30, 2024
Date written: September 1, 2026
Status: **Pass One and Pass Two complete. Both mailboxes read.**

This is the first contact this project has had with reality. Where the data contradicts a
ratified document I say so and cite it; I have not amended any spec, and per the brief §8
I have not designed the state machine.

---

## 1. What was read, and how the two mailboxes were merged

**Stage A** read `jnachman17@gmail.com`; **Stage B** read `jnachman@utexas.edu`. Before
Stage B began the connector was verified to be answering as the utexas account. Six
targeted sweeps per mailbox: all sent mail, inbound from 44 bank and firm domains, inbound
from every tracker address, `mailer-daemon`, calendar-notification subjects, and a
cross-address probe. A blanket enumeration was rejected after measuring it — one sample day
held ~50 threads, almost all newsletters, implying ~7,500 threads for the window and
violating the instruction not to read irrelevant mail.

**Prohibitions held throughout.** No attachment was opened, downloaded, extracted or
inspected — only the read-only tool schemas were ever loaded into the session, so the
attachment-download tool could not be called even by mistake. 110 messages carry
attachments; the corpus records filename and MIME type only, which the API returns as
metadata without fetching content. Nothing was written to Gmail or Calendar. Marlin Equity
Partners and tax mail were identified from sender and subject and skipped.

| | Combined | gmail | utexas |
|---|---|---|---|
| Records | **68** (59 people, 9 firm-process) | 43 | 25 |
| Unique messages | **333** | 265 | 68 |
| Outbound | 168 | 123 | 45 |
| Inbound | 165 | 142 | 23 |
| Threads | 126 | | |
| Recruiting calendar events | **35** | 35 | 0 |
| Bounces | 6 | 3 | 3 |

### How the merge was done, and the one weakness in it

**The brief's preferred deduplication key does not exist.** RFC822 `Message-ID` is not
exposed by the Gmail connector in any permitted read tool. Only Gmail's own per-account
message and thread ids come back, and those differ between accounts for the same message.
The fallback — sender + timestamp + subject — was used, and every match it would have made
is marked inferred.

**In the event, it had almost nothing to do.** Across 333 messages there is **not one
cross-account duplicate**. Not one. Jon never cc'd himself, and no banker ever wrote to
both addresses. The two mailboxes are disjoint. That is itself the finding: they are not
two views of one record, they are two halves of one record.

Near-duplicates *within* an account were recorded and flagged, never dropped: two
byte-identical Aeris messages two days apart under different thread ids; two Nick Gerstein
calendar acceptances for the same call on two dates (a reschedule); and `Brady.flynn@`
versus `Brady.Flynn@` inside a single thread.

### A correction worth recording

The Calendar connector was initially pointed at `jnachman@utexas.edu` — a different Google
account from the Stage A mailbox. That calendar holds **four** events in the entire window
and none are recruiting. Read at face value it produced the conclusion "the coffee chats
were not on the calendar," which is false and would have been damaging. Jon reconnected
Calendar to the gmail account and 35 recruiting events appeared. **The utexas calendar
being empty is itself a result**, and it is used below.

---

## 2. The shape of the season

| Month | Total | gmail | utexas |
|---|---|---|---|
| Dec 2023 | **0** | 0 | 0 |
| Jan 2024 | **206** | 139 | 67 |
| Feb 2024 | 59 | 58 | 1 |
| Mar 2024 | 18 | 18 | 0 |
| Apr 2024 | 50 | 50 | 0 |

**December contains no banking recruiting mail at all.** The season starts 15 January and
ends 23 April: fourteen weeks. **62% of all messages fall in January.**

**The utexas account was used for two weeks and then abandoned**: 67 of its 68 messages are
in January, one is in February, and there are none after. This matters more than it looks —
see §6.

**Against the marketing figure.** Public material references 742 emails and 112 coffee
chats. The real season, both mailboxes, is **333 messages and 25 identifiable calls**. That
is 45% of the advertised email figure and 22% of the advertised chat figure. Jon predicted
the real numbers would be smaller and they are. Nothing was calibrated to reach 742.

---

## 3. Pass One: the states the data actually contains

Derived bottom-up before any product file was opened; the derivation is fixed on disk at
`research/corpus/_pass_one_derived_states.md` so it cannot have been retrofitted. Summarised:

**Seventeen situations occur.** Never delivered · sent-and-nothing-ever-came-back (19
contacts, the largest single group) · only-a-machine-answered · bumped-still-nothing · live
scheduling · scheduled · rescheduled · happened · thank-you owed/sent · answered-and-ended ·
handed off · spawned by someone else's referral · inside a firm process · rejected ·
withdrawn by Jon · revived by something outside the thread · live but invisible.

**Four structural facts constrain any engine built on this:**

**B1. Neither call signal alone is sufficient.**

| Evidence a call happened | Contacts |
|---|---|
| Calendar event only | 6 |
| Thank-you note only | 5 |
| Both | 14 |
| **Total calls visible at all** | **25** |

Calendar alone finds 80%. Thank-you alone finds 76%. You need both — and a call arranged by
phone leaves neither.

**B2. A third of calendar events cannot be attributed to anyone.** 8 of 35 have no attendee
at all. Owen Sherry's call demonstrably happened and he has **no email address anywhere in
either mailbox**.

**B3. The student creates the invite.** Jon organised 23 of 35 events; nine inbound messages
explicitly ask him to; he promises an invite 43 times.

**B4. One account never sees a whole relationship.** 40 contacts live only in gmail, 16 only
in utexas, 3 in both — and every calendar event is in gmail regardless.

**What is not derivable at all:** whether a call went well; who someone is; anything that
happened by phone, text or in person; whether a person still holds their job; whether Jon
still wants the relationship.

---

## 4. The ten questions

### Q1 — How much is there?
59 people, 333 messages, 126 threads, 35 calendar events, across fourteen weeks. §2 has the
distribution. **56 contacts were emailed; 34 replied; 22 never replied — a 39% silence rate.**

### Q2 — Did coffee chats live on the calendar? **Verified. Mostly yes, and the reason given is wrong.**

Yes: 20 of the 25 identifiable calls have a calendar event, and every event is in the gmail
calendar. The trigger is real.

But `04-decision-log.md` session 11 records Jon's recollection — *"All coffee chats lived on
calendar. Literally all of them"* — and generalises it: *"The student does not create the
event — the banker does… the one signal in this process that arrives without the student
doing anything."*

**The mail contradicts the generalisation flatly.** Jon organised **23 of 35** events, and
bankers repeatedly asked him to:

- Carson Harris, J.P. Morgan: *"If that works for you please send a calendar invite."*
- Grant Gillespie, Morgan Stanley: *"mind sending across a calendar hold when you get a chance?"*
- Will Robinson, Intrepid: *"Just shoot me a calendar invite for a time that works on your end."*
- Danny Shin, Houlihan Lokey: *"Feel free to send a calendar invite and call me on my cell."*
- Matt Manriquez, Morgan Stanley: *"If you could send a calendar hold with a zoom link…"*

The events exist. But they exist **because the student made them**, which is the same
dependency on student diligence that the tracker fails on. Per the brief §8 I am not
proposing what follows; I am reporting that the sentence in the decision log is not
supported by the evidence and should not be built on as written.

Three further facts: **8 events have no attendee**; **five calls have no event at all**
(Chris Miller, Jessica Luft, John Sellingsloh, Jay Klein, Sean Hussey); and the seven FT
Partners interview events name **no interviewer** — Jon's thank-you notes are the only
record of who he spoke to.

### Q3 — The two-address problem. **Answered, and it is worse than the brief anticipated.**

The tracker's `Email Sent From` column: 26 utexas, 25 gmail, 7 blank. Confirmed in the mail:
45 outbound from utexas, 123 from gmail.

**The brief anticipated mail-versus-mail. The reality is mail-versus-calendar.**

Every recruiting calendar event is in the **gmail** account — including for the sixteen
relationships whose email is **only** in utexas. Jon wrote from utexas, said *"I'll send you
a calendar invite,"* and then created the event in his gmail calendar, so the acceptance
came back to gmail.

Three relationships are split exactly down the middle. **Nick Gerstein, Gary Horton and
Will Robinson** each appeared in Stage A as "inbound with no outbound" — nothing but a
calendar acceptance. Stage B found the entire conversation. A product watching gmail alone
sees a meeting with no relationship; watching utexas alone it sees a relationship with no
meeting. **Neither half is interpretable on its own.**

There is also a **third address**: `jnachman@utmail.utexas.edu`, an alias that appears in
the To line of inbound university mail.

**One discrepancy survives both stages.** Mat Young's tracker row says the outreach was sent
from gmail; it is in neither account. Either the row is wrong or the message was deleted.
Unresolved, and recorded as such.

### Q4 — Reply-address drift. **Answered, and it is the largest single mechanical finding.**

**52 of 176 inbound messages — 29% — come from an address that is not a stored address for
that contact.** The causes, all real:

- **Bounces** (6) arrive from `mailer-daemon@googlemail.com`, in no tracker.
- **Assistants and recruiters** answer for the banker: Liz Ream for Steve McLaughlin,
  Kleopatra Kirkland for Doug Melsheimer, Caroline Hodge and Lindsay McEachern for FT.
- **Shared mailboxes** answer and are signed by a person who is not the address:
  `us_campus@bofa.com` signed "Chrissonna Cohen"; `FRCampusRecruiting@hl.com` signed by
  nobody at all.
- **Case differences**: Jon wrote to `US_Campus@bofa.com`, the reply came from
  `us_campus@`; `Brady.flynn@` and `Brady.Flynn@` in one thread; `NGerstein99@` versus
  `ngerstein99@`.
- **Third parties introduce**: Chris Miller forwards four MDs' replies; John Sellingsloh
  cc's five colleagues in one message, two of whom became real relationships.
- **Three inbound messages have an empty `To` line** — Wells Fargo bcc'd its entire
  candidate list. There is no addressee to match on at all.

### Q5 — Bounces. **Answered. Detectable, but not the way you would guess.**

Six bounces, three people:

| Date | Failed recipient | `Status:` | SMTP | Detected in |
|---|---|---|---|---|
| 2024-01-31 | `sean.kang@stifel.com` | **4.4.2** | 550 #5.1.0 | 13s |
| 2024-01-31 | `kang.s@stifel.com` | — | 550 #5.1.0 | 13s |
| 2024-01-31 | `s.kang@stifel.com` | — | 550 #5.1.0 | 13s |
| 2024-02-08 | `Marijoy.Bertolini@aerispartners.com` | 5.1.1 | 550 5.1.1 | 13s |
| 2024-02-08 | `bm@aerispartners.com` | 5.1.1 | 550 5.1.1 | 12s |
| 2024-04-10 | `sarah.marks@citi.com` | 5.1.1 | 550 5.1.1 | 14s |

All from `mailer-daemon@googlemail.com`, all inside the same thread as the outbound, all
within 14 seconds. Easy.

**But the machine-readable status code is not reliable.** The Stifel bounce reports
`Status: 4.4.2` — a *temporary* failure class — while its SMTP response is `550` and its
human text reads "Address not found". **A rule keyed on `Status: 5.x` would silently miss
all three Stifel bounces**, which is exactly the case where Jon burned three attempts.

The behaviour around bounces is more interesting than the mechanics. Jon guessed **three**
Stifel addresses in 3 minutes 38 seconds and never reached Sean Kang. He guessed a second
Aeris address 16 minutes after the first bounced; that failed too — and Marijoy Bertolini
later wrote to *him*, from an address he never guessed.

### Q6 — Silence. **Answered, and the answer is that no safe threshold exists.**

Of 56 contacts emailed, 34 replied:

| First outbound → first reply | Contacts |
|---|---|
| Under 1 day | 20 |
| 1–3 days | 9 |
| 3–7 days | 2 |
| **7 days or more** | **3** |
| Never | 22 |

Median 0.78 days. The tail is what matters: **Ethan Marnhout replied at 6.8 days, Elliot
Calkins at 11.0, Doug Melsheimer at 13.2, and Marijoy Bertolini at 21.6** — and Marijoy's
thread went on to produce four interview rounds, the second-largest relationship of the
season. A rule declaring a thread dead at 7, 10 or 14 days kills it.

The reverse also happens: **Billy Barber replied 15 days after a thank-you note** and Brady
Flynn at 9 days, both triggered by Jon's offer — an event that appears nowhere in those
threads.

**Is there a defensible number? On this evidence, no.** What silence means is set by things
outside the thread.

Jon's own behaviour is a better signal than any threshold: he sent **12 "bump" follow-ups**,
five of them within four minutes on 31 January, at gaps of 3 to 13 days. He was batching,
not reacting to individual timers.

### Q7 — Thank-you notes. **Answered. The most detectable thing in the corpus.**

19 contacts received one. The template is near-fixed — subject *"Enjoyed Our Conversation"*
or a variant, body containing *"the time you spent with me over the phone today"* — and it
lands same-day or next-day. Steve McLaughlin's call was 12:30pm PT and the note went at
6:37pm PT the same evening.

Not universal: **Lonnie Kauppila** conducted the Houlihan LA first round, got a thank-you
note the next day, and never replied. And six people Jon demonstrably spoke to got no note
at all.

### Q8 — The tracker. §5 below.

### Q9 — What the mail contains that no column captured. §7 below.

### Q10 — What would have been impossible to compute. **Named in full.**

Of the tracker's eleven states, these could never be produced from mail and calendar:

- **`Leaving Position` / `Left Position`** — human knowledge. No signal exists. Neither was
  ever used on a single row, which is its own comment.
- **`Met in Person`** — two campus events in January created several relationships and left
  no trace in either system. Jon's emails say *"It was great to meet you yesterday"*; the
  meeting itself is invisible.
- **`Pending`, `Call Pending`** — ambiguous even to Jon; used twice.

And beyond the tracker: call quality, seniority and influence, whether a referral was
warm or a brush-off, and everything that happened by phone. **Chris Miller's entire first
conversation was a phone call arranged in two lines of email. The Goldman impersonation
attempt arrived by iMessage. Mike Giaquinto's whole relationship ran through Jon's mother.**

---

## 5. The tracker: decay, or dead on arrival?

Read with a stdlib XLSX reader (`research/scripts/read_tracker.py`; `openpyxl` is not
installed). Two sheets. `Email Structures` is **entirely inherited template content** — a
firm-by-firm email-format reference with nothing of Jon's in it.

### The question, resolved against the file: **neither description is right.**

`01-project-and-product.md` says the tracker's value is *"the decay curve: state columns
maintained early, then abandoned as the season got busy."* Jon later said the states
*"were from a template. I never really followed them whatsoever."*

**Every `Initial Contact` date falls between 16 and 30 January 2024** — a fifteen-day band,
with one 2023 typo and one cell reading "Ongoing". **Every `Call Date` falls between 18
January and 1 February.** There is no entry of any kind after 1 February.

The mail runs to 23 April. So it is not column-by-column decay, and it is not
never-started either: **Jon kept the tracker properly for about two weeks and then
abandoned the entire artefact at once** — contact rows included — while eleven weeks and
127 more messages were still to come. It stops before FT Partners, the firm he joined, ever
appears in it.

**And the abandonment is corroborated by something outside the file.** The utexas mailbox
shows exactly the same shape: 67 of 68 messages in January, one in February, none after.
Two independent records of the same fortnight of intense effort followed by a switch to a
single channel and no upkeep at all. That is a stronger and more specific story than either
version on file, and `01` should be amended to it once Jon rules.

### Which columns carried real data

18 columns, not 19 — `Total` is a legend label, not a contact column.

| Column | Filled | | Column | Filled |
|---|---|---|---|---|
| Name | 100% | | Response | 75% |
| Position / Company / Location / Relation | 98% | | **Call Date** | **39%** |
| Contact | 96% | | **Thank you email** | **29%** |
| Email | 94% | | **Secondary Contact** | **12%** |
| Group / LinkedIn | 93% | | **Degree** | **2%** |
| Emaily Sent *(sic)* | 91% | | | |
| Initial Contact | 89% | | | |

**The enter-once columns are near-complete; every column that would have had to be
revisited as things happened is the empty one.** `Degree` was filled exactly once and that
cell contains the template's own instruction text, *"Typically only mark if unique"*.

Three other template artefacts survive untouched in row 17: `Notes` reads *"Deals they were
on, advice they had, people they said were helpful, interests they have, etc."* and
`Secondary Contact` reads *"Date"*. Jon typed his first real contact around the template's
placeholder text and never cleared it.

### The eleven-state legend

Barred from Pass One as instructed, recorded here as a fact about the file. **Four of
eleven ever appear on a contact row**: No Response (22), Phone Call Done (9), Call Pending
(2), NOT YET EMAILED (4). Seven never appear — including `Bad Email Address`, despite six
real bounces, and both `Leaving Position` and `Left Position`.

Meanwhile **five colours appear that are in no legend at all**, the largest being a green on
nine consecutive rows whose `Emaily Sent` reads "Awaiting Send" — a state Jon invented, used
more than any legend colour except No Response, and never wrote down.

### Contacts in the mail but not in the tracker

**19 people Jon corresponded with never reached the tracker**, including every single
person at the firm he joined: Caroline Hodge, Lindsay McEachern, Brady Flynn, Billy Barber,
Bradley Cagle, Sean Hussey. Also absent: Micah Poag (who supplied three referral addresses),
both Aeris recruiters who ran four interview rounds, Maura Vestal, Sam Ward, and Owen
Sherry — whose call happened and who has no email address anywhere.

Conversely **29 of 58 tracker rows have no mail in either account.** Nine of those are the
senior MDs Chris Miller offered to refer, all marked "Awaiting Send". Jon logged the
intention and never sent the emails.

---

## 6. Pass Two: reality against the advertised model

The page advertises **five statuses** — `Replied`, `Call scheduled`, `Call completed`,
`No reply`, `Sent` — **four next moves** — `Reply to X`, `Attend coffee chat`,
`Send thank-you`, `Bump thread` — and **three outstanding groups**: Replies owed,
Follow-ups due, Thank-you notes, totalling 21.

### Where the page is right

**The mechanism is real.** Every one of the five statuses occurs in the data. Replies,
scheduled calls, completed calls, silence and unanswered sends are all genuinely there and
all genuinely computable. `Bump thread` is not a hypothesis — Jon sent 12 of them.
`Send thank-you` is not a hypothesis — he sent 19, on a template, same-day. Days-since-last-
contact is exact. The four-step privacy mechanism describes something that could be built.

**Section 3's three moments are well chosen.** Nothing-arriving, a Gmail reply, a Calendar
event are exactly the three trigger types the data contains, and Jon's August 5 instinct
that silence is the stronger proof is supported: silence is the largest category in the
corpus (22 of 56 contacts never replied).

### Where it diverges

**1. There is no state for a dead address, and the privacy mechanism forbids finding one.**
`Bad Email Address` exists in Jon's own tracker legend but not in the product's five
statuses. Worse, `privacy-copy.ts` step 02 says *"If the sender is not in your tracker, the
message body is never routed into Blotter's content-processing system."* Bounces come from
`mailer-daemon@googlemail.com`, which is in nobody's tracker. **Under the advertised rule
Blotter structurally cannot see a bounce.** It is not a tuning problem; the privacy
mechanism as written forbids it.

The consequence is concrete and bad: a bounced contact stays `Sent`, ages into `No reply`,
and surfaces under `Follow-ups due` with next move `Bump thread`. **Blotter would have told
Jon to bump Sean Kang — three times, at three addresses that do not exist.**

**2. Sender-matching misses 29% of real inbound.** 52 of 176 inbound messages come from an
address that is not the stored contact: assistants, recruiters, shared mailboxes, case
variants, third-party introductions, and three bcc'd messages with an empty `To` line.
The Wells Fargo bcc thread carried a hard deadline — *"complete it by noon EST on Monday"* —
and would have been invisible.

**3. Calendar attribution is assumed and often impossible.** `privacy-copy.ts` promises to
*"identify scheduled or completed recruiting conversations associated with tracked
contacts."* **8 of 35 events have no attendee at all**, and four more name no counterparty.
Only 23 carry an external address. `Call scheduled` and `Call completed` cannot fire for the
rest — including the Houlihan LA first round and four FT Partners interviews.

**4. The model has no terminal state, and the backlog grows without bound.** Applying the
page's own rule to the real season — last message outbound, five or more days elapsed →
`Follow-ups due` — the outstanding count on 19 April 2024 would be **56**, of which **40**
are follow-ups. Most are January cold emails to people who were never going to reply. The
advertised sample shows 21. **The page's number is a healthy early-season day; by April the
product would have been generating a to-do list nearly three times longer, most of it
noise.** There is no `Rejected`, no `Closed`, no `Withdrawn` and no `Bounced` to stop the
accrual — yet the data contains explicit rejections, soft rejections with a future door,
and three relationships Jon himself cancelled.

**5. One connected account computes the other's relationships wrong.** With gmail alone,
Nick Gerstein, Gary Horton and Will Robinson each present as a calendar event with no
relationship behind it; sixteen more contacts do not exist at all. Onboarding must ask for
every address the student sends from — and, because the calendar and the mail split across
accounts, **connecting two mailboxes is not enough on its own; the events and the threads
have to be joined across accounts.**

**6. `No reply for 5 days → Bump thread` is faster than reality supports.** Real replies
arrived at 6.8, 11.0, 13.2 and 21.6 days. At five days the page would have nagged Jon about
Marijoy Bertolini, sixteen days before she replied and started four interview rounds.

**7. A thread is not a contact and a contact is not a person.** One Gmail thread,
subject "Potential favor", contains **five relationships**: Doug Melsheimer, his assistant,
Jon's father, Grace Steelman and Jay Klein. Grace's and Jay's entire relationships live
inside a thread started by someone else about someone else. Separately, Gmail split Jessica
Luft's outbound and her auto-reply into two different threads.

**8. An auto-reply is indistinguishable from a reply.** Jessica Luft's out-of-office arrived
20 seconds after Jon's email, from her own address. Under the advertised model that is
`Replied`, next move `Reply to Jess`. She never answered.

### One claim now contradicted by the build plan, restated

`privacy-copy.ts` carries *"Blotter connects to Google through an established connection
provider whose Google application has passed Google's CASA security assessment."* Under the
architecture ratified in session 11 there is no provider and no CASA. The file already
flags this as an unverified gate; the decision log already records it. Nothing in this
phase changes it — noting only that the sentence remains false under the current plan.

---

## 7. What surprised me

**The tracker and the second mailbox died in the same fortnight.** I expected the tracker
to decay. Instead it stops dead on 1 February, and so does the utexas account. Jon did not
gradually lose control of his system; he abandoned it in one motion and ran the remaining
eleven weeks — including every interview and the offer — out of one inbox and his head.
**That is a stronger argument for the product than the decay story, and a different one.**

**The best thing that happened to Jon is invisible to the product.** The chain that produced
his job runs: brother Jared → Joshua Gumm (utexas) → a phone call → Ethan Marnhout referral
(gmail) → application → seven interviews → offer. **It crosses both accounts, and its two
most important events — the referral conversation and the decision — happened on the
phone.** Joshua Gumm is on the tracker with no mail in gmail; Ethan Marnhout is in gmail
with no tracker row.

**Referrals are the actual mechanic of this process, and nothing models them.** 108 messages
carry introduction or referral language. Chris Miller alone generated nine contacts; John
Sellingsloh created five in a single cc line, two of which became completed calls. The
product tracks relationships as independent rows. **They are a graph, and the edges are
where the value is.**

**The volume is small and the difficulty is not.** 333 messages over fourteen weeks is
roughly three a day — trivially manageable in principle. What makes it hard is not volume
but that the state of any one relationship is scattered across two mailboxes, a calendar in
only one of them, a phone that leaves no trace, and a parent's conversations.

**Jon was faster than any product would be.** He replied to Carson Harris in 79 minutes, to
Grey Bianca in 115. He batched five bumps in four minutes. A daily-queue product would
mostly have been telling him things he had already done.

**And the honest one: the mechanism is weaker than the page implies, but the problem is
worse than the page implies.** The page shows a clean 21-item list computed from one inbox.
Reality is a two-account, phone-punctuated, referral-shaped graph that by April would
generate 56 items, 40 of them stale. The product's job is harder than advertised — and more
necessary.

---

## 8. What the data cannot answer, and what would be needed

| Unanswerable from this archive | What would be needed |
|---|---|
| Whether calendar coverage generalises past one person | The pilot. n=1, and this student had a specific habit of creating his own invites. |
| Whether a banker-created invite is the norm elsewhere | Same. Here it was 12 of 35. |
| What silence means | Nothing in mail or calendar predicts revival; the triggers were external. Would need outcome labels a student supplies. |
| Whether a call went well, or a referral was warm | Not in the data at any resolution. |
| Everything that happened by phone, text or in person | Structurally invisible. At least three consequential relationships ran this way. |
| Whether the 2024 volume resembles a current season | Jon recruited two and a half years ago and has no live mail. Only the pilot answers this. |
| Mat Young's missing outbound | Unresolved across both accounts. Only Jon can say. |
| Whether K1 Investment Management is in scope | Flagged, included, awaiting Jon's ruling — see below. |

**One scope question is still open.** The brief excludes "K-1 and tax mail" by name. **K1
Investment Management** (`k1ops.com`) is a private-equity firm that cold-recruited Jon,
interviewed him, and sits on his tracker as a contact row. Four threads were **included and
flagged** rather than silently dropped, because including is reversible and dropping is not.
`contacts/katrina-yuzefpolsky.json` carries the flag and `corpus/README.md` says how to
remove it in one step.

**Nothing here has been amended into any spec.** Two documents are contradicted by the
evidence — `04-decision-log.md` session 11 on who creates calendar invites, and
`01-project-and-product.md` on the decay curve — and both are reported above for Jon and the
conductor chat to rule on. The state machine is not designed here, per the brief §8.

---

## 9. Where everything is

- `blotter-ib-ws1/research/corpus/index.json` — all 68 records with counts
- `blotter-ib-ws1/research/corpus/contacts/*.json` — one file per contact, both stages
- `blotter-ib-ws1/research/corpus/calendar.json` — the 35 recruiting events
- `blotter-ib-ws1/research/corpus/_pass_one_derived_states.md` — Pass One, fixed before Pass Two
- `blotter-ib-ws1/research/corpus/README.md` — structure, capture quality, merge rules
- `blotter-ib-ws1/docs/workstreams/ws9-build/02-LEARN-STAGE-A.md` — the Stage A interim report
- `blotter-ib-ws1/research/scripts/` — the extraction and build scripts, re-runnable
