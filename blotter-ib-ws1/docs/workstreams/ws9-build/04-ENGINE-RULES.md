# The engine rules

Date: September 1, 2026
Version: **4.** Amended twice on September 1, 2026. v3 added how a day is
counted (§4) and calendar RSVPs as machine mail (§6). **v4 adds the forwarding
rule (§3) and what counts as an attempt (§5)** — both ruled by Jon after the
first live run, both already implemented in the engine and the answer key, and
both missing from this document until now.
Status: **Ratified by Jon, September 1, 2026**, except §11.

This document is the engine. Build chats turn it into code and **add nothing** —
every judgment is settled here, in English, where it can be argued with in a
sentence instead of found in a bug six weeks later.

Grounded in the real 2024 season: **67 contacts, 325 messages, 35 calendar
events**, January to April. Where a rule is untested against that data it says
so.

---

## 1. What version one does, and does not, track

**Tracks: people.** Individual bankers you are networking with.

**Does not track: firms, interviews, or info sessions.** Jon's ruling. This
removes 7 of the 35 real calendar events and all 9 firm records from the corpus.

**Stated plainly so nobody is surprised later:** the excluded events include all
four `Interview with Financial Technology Partners` rounds — the firm Jon
actually joined. **Blotter version one goes quiet exactly when recruiting turns
into interviews.** That is a deliberate scope decision, not an oversight, and it
is the most likely thing to want back in version two.

---

## 2. What Blotter reads

**Two different reads, and only one of them is wide.**

### At setup — once, and never again

Blotter scans **the last 3 months** of your mail and proposes the people it
thinks you are recruiting with. **You approve the list.** Three months rather
than everything, because you may connect halfway through a season and need the
context behind conversations already running.

**This method is already proven on real data.** The Learn phase did exactly it
on Jon's inbox: sweep sent mail, sweep inbound from a list of bank and finance
domains, sweep bounce senders, sweep calendar notifications. It found 59 real
people while never opening roughly 7,500 threads of newsletters.

**Its honest limit:** bankers writing from personal addresses — real examples
`barman.barbara@gmail.com`, `Olivialeigh31@gmail.com` — match no bank domain and
will be missed. Handing Blotter an existing tracker closes most of that gap.
Not having one still works; the list is just shorter.

**It proposes, it does not assert.** Same pattern as §8.

### Every 15 minutes after that — narrow

**Every message in any conversation that already contains one of your contacts.
Nothing else.**

Not "mail from people in your tracker." That was the original rule and it was
wrong: it missed **29% of real incoming mail** — assistants replying for their
banker, colleagues cc'd in, shared recruiting mailboxes, and plain
capitalisation differences. Reading whole conversations fixes all of it, and
fixes bounces too, since a bounce arrives inside the thread that bounced.

Your personal mail is untouched — not because a filter rejects it, but because
it is never part of a conversation Blotter is following.

> **Supersedes** the four sender-matching steps in `web/lib/privacy-copy.ts`.
> Jon's ruling: the website describes a system built from intuition and follows
> the engine, not the other way round. See §12.

---

## 3. How mail attaches to a person

A conversation belongs to a contact if **any** message in it carries that
contact's address in From, To, or Cc.

- **Ignore capitalisation.** `Brady.flynn@` and `Brady.Flynn@` are one person,
  and both appear inside one real thread. So do `US_Campus@` and `us_campus@`.
- **A contact can have several addresses.** All of them match.

### When one conversation holds several people

One real thread — subject "Potential favor" — contains **five separate
relationships**. So:

- **If a conversation involves exactly one of your contacts**, everything in it
  counts as that person's activity. This is what lets an assistant's reply
  advance the banker's row: Liz Ream really did answer for Steve McLaughlin.
- **If it involves several**, each person's state comes only from messages they
  are actually on. One person replying does not mark the other four as replied.

**Outbound** is any message from one of your own addresses. **Inbound** is
everything else.

### Inbound counts thread-wide. Outbound only counts when addressed to them.

**In a conversation involving exactly one of your contacts:**

- **Everything arriving counts as their side of it**, whoever sent it. This is
  what lets an assistant's reply advance the banker's row.
- **Your own messages count only when that contact is actually addressed** — on
  the To or Cc line.

**Ruled by Jon, September 1, 2026.** Found in his own live data: he forwarded
Samuel Ward's reply to a family member inside the same thread, and the engine
counted that forward as him writing to Samuel. **Forwarding a reply to your
family is not writing to the banker.**

**The consequence to know:** an email to a guessed address counts, and its
bounce lands, only when that guess is stored on the contact's row. Every real
case already does this — the three dead Stifel addresses were all in the sheet —
but a student who guesses without recording the guess gets nothing back.

---

## 4. The states

**Blotter does not tell you when to act.** It shows what is true and how long it
has been true. You decide.

The reason is in the data. Real replies came back at 6.8, 11, 13.2 and **21.6**
days, and the 21.6-day one turned into four interview rounds. **Any threshold we
picked would be wrong for someone**, so we do not pick one.

| State | When | The clock shows |
|---|---|---|
| **Not emailed** | Contact added, nothing sent | — |
| **Bounced** | Last email came back undelivered | Days since it bounced |
| **Sent** | You wrote last, no answer yet | Days since **you** wrote |
| **Replied** | They wrote last, you have not answered | Days since **they** wrote |
| **Call scheduled** | A calendar event with them is upcoming | Days until it |
| **Call done** | A call has happened and nobody has written since | Days since the call |
| **Closed** | You marked it closed | — |

### How a day is counted

**A day turns at midnight in the student's timezone.** `days` is a subtraction of
calendar dates, not of elapsed hours. A call tomorrow morning is `1` day away
however few hours remain tonight.

**Ruled by Jon, September 1, 2026**, when the engine and the independently
written answer key disagreed by exactly one on 98 values. The engine's reading
was upheld.

**This binds the courier:** every timestamp it sends must carry the student's own
offset. Sent as UTC, a late-evening email lands on tomorrow's date and the engine
cannot know better.

### When two are true at once

```
Bounced  >  Call scheduled  >  Call done  >  Replied / Sent
```

### `Call done` is how a thank-you gets tracked

**There is no `Thank-you owed` state and no such column.** There does not need to
be one.

`Call done` holds **until somebody writes.** The moment you send the thank-you
you are the last one who spoke, so it becomes `Sent` on its own. So `Call done`
*means* "you owe a thank-you", and it clears itself when you do it.

`Last call` keeps the date permanently in its own column regardless.

This matters: Jon sent **19 thank-you notes**, near-identical, same day or next
day. It is the most reliably detectable behaviour in the entire corpus.

### Sorting

**Longest-waiting first, always.** A three-month-old dead cold email sinks to
the bottom by itself instead of shouting at you.

### What is cut, and why

**`No reply for 5 days`, and the `Bump thread` next move.** Both are live on the
site today. At five days Blotter would have chased Jon about Marijoy Bertolini
**sixteen days before she replied** and opened four interview rounds.

---

## 5. Attempts

**How many times you have written since they last wrote back.**

A first email and a third email are not the same situation and no state can tell
them apart.

**A send only counts when the contact is on the message**, per §3. Ruled by
Jon, September 1, 2026, at the same time and for the same reason.

**The real number, counted from the corpus rather than recalled:** 22 to 30
depending on how you count, across 17 to 22 contacts. Within a single thread it
is 30; counting all of a contact's mail together it is 22. Only 9 of them
actually contain the words "following up" or similar, which is why an earlier
count that looked for that language reported 12 and was wrong.

---

## 6. What Blotter cannot see, and must never guess

- **An auto-reply is not a reply.** One real out-of-office arrived **20 seconds**
  after Jon's email, from the contact's own address. A naive rule calls that
  `Replied`. She never answered. Blotter marks an auto-reply where it can tell,
  and otherwise says nothing.
- **A calendar acceptance is not a reply.** `Accepted:`, `Declined:`,
  `Tentatively accepted:`, `Invitation:`, `Updated invitation:`, `Canceled
  event:` and `New time proposed:` are machine mail in either direction: never a
  reply, never an attempt, never `last_contact`. Clicking Accept is not writing
  back, and the meeting facts are already in the calendar events Blotter reads.

  **Ruled by Jon, September 1, 2026.** Found by the answer key disagreeing with
  the engine over Mat Young, who accepted an invite minutes after Jon's last
  email — which the engine had counted as him writing back.
- **Anything by phone, text or in person.** At least three consequential
  relationships in the real season ran this way. One produced the job.
- **Whether a call went well.**
- **Whether a referral was warm or a brush-off.**

---

## 7. The calendar

**Matched to a person in this order:**

1. **The attendee's email address** matches a contact. Covers all 27 real events
   that carry attendees.
2. **First name plus firm in the event title.** Real titles follow one pattern —
   `Carson - Jonathan JPM IB Call` — so this is reliable, and it is the only
   thing that catches **Owen Sherry**, whose call demonstrably happened and who
   has **no email address anywhere in the mailbox.**

**Events matching neither are ignored in version one.** In the real data those
are all firm events — three info sessions and four interview rounds — and there
is no person to attribute them to. See §1.

---

## 8. Referrals

**When a new address appears in a conversation belonging to one of your
contacts, Blotter puts it in a "found these" area for you to approve.** Approved
people become contacts. Ignored ones never come back.

This is the real mechanic of recruiting and nothing in the original design
modelled it. **108 of 325 messages carry introduction or referral language.**
Chris Miller alone produced nine contacts. John Sellingsloh created five in a
single Cc line, two of which became completed calls.

**Approval rather than automatic, on Jon's ruling**, and the data says why: in
the real season automatic adding would have dropped Liz Ream, Kleopatra
Kirkland and Caroline Hodge straight into the sheet. All three are real and
consequential — assistants and recruiting coordinators — and none is a banker
being networked with.

**Never suggested at all:** bounce senders, `no-reply` and `do-not-reply`
addresses, your own addresses, calendar notification senders, and anything
already in the sheet under any capitalisation.

---

## 9. The columns

**You keep** — Blotter never writes here: Name, Title, Firm, Email, and anything
else you want. Your sheet, your business.

**Blotter keeps** — recomputed every run:

| Column | Example |
|---|---|
| Status | `Sent` |
| Days | `12` |
| Last contact | `1/16/26` |
| Attempts | `2` |
| Next call | `1/17 @ 2:00 PM` |
| Last call | `Completed 1/16` |

**You set** — Blotter reads it and obeys: `Closed`.

Against the live site this **drops `Next move`** and **adds `Attempts` and
`Closed`.**

---

## 10. Closing a relationship

**You mark it.** Blotter never closes anything itself and never reopens what you
closed. A closed contact keeps its history and drops out of the sorted view.

*Deferred, not rejected:* whether an AI reading the thread could recognise a
natural ending — *"Thanks Jonathan, enjoyed the convo!"* — well enough to
suggest closing. **This can be tested against the 325 real messages before a
line of it is built.**

---

## 11. Still open

1. **How far back does the setup scan go for a student who has been recruiting
   longer than 3 months?** The 3-month rule is set; the exception is not.
2. **What happens when a contact changes firms mid-season.**
3. **What the student sees when Blotter is wrong** — no correction mechanism
   exists beyond `Closed`.

---

## 12. What this changes on the website

Recorded, not acted on. The site follows the engine.

- The four processing steps in `privacy-copy.ts` describe **sender-matching**.
  The engine reads **whole conversations**, and performs one wide scan at setup
  that no page mentions at all.
- **`Next move` is cut.** It appears on the page, in all three films, and in the
  share card.
- **`Bump thread` and any day-threshold are cut.** The Outstanding view's
  `Follow-ups due` group assumes a threshold that no longer exists.
- The **Fall 2026** availability date on the price screen is now unmeetable on
  any path.
