# Pass One — states derived from the mail, bottom up

Written before `web/lib/sheet-data.ts`, `web/lib/privacy-copy.ts` or either WS5 build spec
was opened, so the derivation cannot have been shaped by the product's vocabulary. This
file is the fixed record of that derivation. Pass Two compares it; it does not edit it.

Method: enumerate the situations that actually occur across 59 person contacts and 333
messages in both mailboxes, then keep only the distinctions the data forces.

---

## A. What a relationship can be, as the mail actually shows it

### 1. Never delivered
The address was wrong. 6 bounces, 3 people. Detected in 12–14 seconds, in the same thread.
**Distinct because nothing about the relationship is true — there is no relationship.**
Jon guessed 3 Stifel addresses in 3m38s and all failed; he never reached Sean Kang.

### 2. Sent, and nothing ever came back
19 contacts. The single largest group. No reply, no bounce, no auto-reply, forever.

### 3. Sent, and only a machine answered
1 contact (Jessica Luft, BofA — an out-of-office 20 seconds later). Inbound exists, from
the contact's own address, and means nothing. **Distinct because it is indistinguishable
from a reply by sender and timing, and opposite in meaning.**

### 4. Bumped, still nothing
12 follow-up "bump" messages. Jon sent 5 of them inside 4 minutes on 31 January. A second
outbound with no inbound between is a materially different state from a first outbound.

### 5. Live scheduling
A reply arrived and times are being traded. Sub-states the data actually contains:
counterparty asks for availability; Jon proposes a slate; counterparty picks one;
counterparty asks *Jon* to send the invite (9 times); Jon promises an invite (43 times).

### 6. Scheduled
An event exists. 35 recruiting events. **But see section B — the event is not reliably
attributable to the contact.**

### 7. Rescheduled
Nick Gerstein moved once (two acceptances, two dates); Carson Harris pushed 6pm→8pm;
Kate Borden proposed a new time. A live relationship that superficially looks like churn.

### 8. Happened
25 contacts had a call visible somewhere. Evidence is of two independent kinds and
**neither is sufficient** — see section B.

### 9. Thank-you owed / sent
19 contacts got a thank-you note, on a fixed template ("the time you spent with me…"),
same day or next. Highly detectable. Not universal.

### 10. Answered-and-ended
A courteous final reply ("Thanks Jonathan, enjoyed the convo!"). Nothing is owed. Looks
identical to silence one message later.

### 11. Handed off
The person answers and routes the relationship elsewhere: Sam Ward → FR campus recruiting
mailbox; Maura Vestal → a different shared mailbox; Micah Poag → three names; Chris Miller
→ nine MDs; John Sellingsloh → five colleagues in one cc line. **The contact stays polite
and the relationship moves to someone else.**

### 12. Spawned
The counterpart of 11, from the new person's side: a contact that exists only because
another contact named them. At least 14 of 59 contacts originate this way.

### 13. In a firm process
The relationship stops being with a person and becomes a pipeline: application →
assessment → round 1 → round 2 → super day → offer. Runs on shared mailboxes
(`FRCampusRecruiting@`, `US_Campus@`, `CIBUniversityRecruiting@`), scheduling links
(Greenhouse), and portals. Aeris ran 4 rounds; FT Partners ran ~7 events.

### 14. Rejected
Explicit ("we will not be moving forward"), or soft-with-a-door-open (Harris Williams:
"reach out over the summer and we can discuss boot camp then").

### 15. Withdrawn by Jon
Jon cancelled Grey Bianca, cancelled Ben Dziedzic, and declined Wells Fargo's first round
after accepting elsewhere. **The relationship ends and it is Jon who ends it.**

### 16. Revived by something outside the thread
Billy Barber replied 15 days after a thank-you note; Brady Flynn 9 days. The trigger was
Jon's offer, which appears nowhere in those threads. **No inactivity rule predicts this.**

### 17. Live but invisible
Mike Giaquinto: two outbounds, zero inbounds, 39 days apart — and the relationship was
progressing the whole time by phone, through Jon's mother. The mail says dead. The mail
is wrong.

---

## B. The four findings that constrain any state engine

### B1. Neither call signal alone is sufficient

| Evidence of a completed call | Contacts |
|---|---|
| Calendar event only | 6 |
| Thank-you note only | 5 |
| **Both** | **14** |
| **Union — all calls visible at all** | **25** |

Calendar alone finds 20/25 (80%). Thank-you alone finds 19/25 (76%). **You need both, and
even both may not be everything** — a call arranged by phone leaves neither.

### B2. Calendar events are frequently unattributable
Of 35 recruiting events: 8 have **no attendee at all** (solo blocks Jon typed), and 4 more
name no counterparty. Only 23 carry an external address to match on. Owen Sherry's call
happened, is named in an email, has a calendar block — and he has **no email address
anywhere in either mailbox**.

### B3. The student creates the invite
Jon organised 23 of 35 events. Nine inbound messages explicitly ask him to; he promises an
invite 43 times. Scheduling is an action the student performs, not a signal that arrives.

### B4. One account never sees the whole relationship
- 40 contacts live only in gmail, 16 only in utexas, **3 in both**.
- Every recruiting **calendar** event is in gmail — including for the 16 relationships
  whose **email** is only in utexas. Nick Gerstein, Gary Horton and Will Robinson are
  three relationships split down the middle: conversation in one account, meeting in the
  other.
- Referrals cross accounts: Micah Poag gives Jon an address in gmail; Jon uses it from
  utexas two hours later. Joseph Candelario's call is in gmail; the referral it produced
  is worked from utexas the next day.
- The utexas account carries 67 of its 68 messages in January and **zero after 1 February**.

---

## C. What is not derivable from mail and calendar at all

- **Whether a call was good.** Nothing distinguishes Kevin Stephens (produced an internal
  referral and an interview) from a courtesy chat.
- **Who someone is.** Seniority, group, whether they influence hiring — all absent.
- **Anything that happened by phone, text or in person.** Chris Miller's first
  conversation, Mike Giaquinto's whole relationship, the Goldman impersonation attempt
  (arrived by iMessage), and two campus events that each created contacts.
- **Whether a person still holds their job.** No signal whatsoever.
- **Whether Jon still wants the relationship.** He cancelled three live ones.

---

## D. The distinctions the data forces that a simple model would miss

1. **No-reply ≠ no-delivery ≠ auto-reply.** Three different nothings.
2. **A thread is not a relationship.** One thread held five; one relationship (Jessica
   Luft) is split across two threads by Gmail itself.
3. **A person is not a counterparty.** Shared mailboxes answer, signed by names that are
   not the address.
4. **Silence has no safe threshold.** Replies arrived at 11.0, 13.2 and 21.6 days, and one
   of those became the second-largest relationship of the season.
5. **Ending is a state, and Jon owns it as often as the banker does.**
