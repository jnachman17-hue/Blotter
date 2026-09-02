# Design decisions — the understanding sessions

**Opened September 2, 2026.** A running record of what Jon has ruled while
working through how the system actually behaves, kept separate from
`04-ENGINE-RULES.md` because most of these are **not yet built**.

**Nothing here is executed.** Execution comes after the understanding is done.
When one of these ships, it moves into the rules or the courier notes and gets
struck through here.

---

## Ruled

### D1. The mail window stays long. 365 days, not 90.

Jon proposed 90 after the 170-classmate incident. **Withdrawn once the reason
was clear:** the server has no memory and recomputes from scratch every run, so
a window shorter than the season deletes history. At 90 days a January contact
would silently flip to `Not emailed` in April — exactly when "quiet for 70 days"
is the most useful thing on the sheet.

### D2. Ignore threads with more than 10 recipients. **Not built.**

Jon's fix and the right one. The 170-classmate incident was a 2022 club listserv
that one contact happened to be on; the date window made it rarer, this makes
that whole class of problem impossible. **This is the real fix; D1's window is
not doing this job.**

### D3. Always-on sent-mail scanning to grow Found is rejected.

Jon: *"It adds noise for very little work saved and I don't like the tradeoff."*

The reasoning is his and it holds: the best case yields an email address, and the
student still types Name, Firm and Title by hand — nearly the whole job — while
every non-recruiting person they emailed lands in the queue.

### D4. Found never invents a name from an address. **Approved September 2. Not built.**

`Boone2002@att.net` → "Boone2002" is what the engine does today and it is
garbage. **Use the display name the email header carries; leave the cell blank
when there is none.** Reconciles with Jon's earlier "names pass through" ruling,
which is still owed a `05-CONTRACT.md` version bump.

### D5. The install guide's paste block is stale. **Not fixed.**

It still hands over nine `firm_process` rows from the corpus — "Barclays
application status", "BofA application", "Wells Fargo … withdrawal". They carry
no email address, read `Not emailed` forever, and **contradict Jon's own ruling
that version one tracks people and not firms.** The fixtures already dropped
them; `courier/INSTALL.md` never got the message.

### D6. Attempts, confirmed as built.

Outbound messages since they last wrote back. Initial outreach 1, a bump 2, they
reply resets to 0. An out-of-office and a calendar acceptance do **not** reset
it, because a machine answering is not the person writing back.

### D7. One connected inbox, but several send-as aliases are supported and worth advertising.

The `Your email addresses` setting exists so the engine knows which messages are
**from the student** — how it tells `Sent` from `Replied`. It cannot reach into a
second Google account and does not need to.

**But it fully handles the common real case**: a `.edu` that forwards into Gmail,
where the student replies *as* the `.edu` from one inbox. Jon, September 2:
*"maybe we do allow for multiple addresses for aliases when you send as
different address but it all funnels to one primary inbox… Useful tool
actually."* **Already built — the field takes a comma-separated list. It is the
instructions that are missing.**

Jon's own two-*account* season remains an anomaly and is not a design
constraint.

### D8. The student may add their own columns anywhere. **Already built, undocumented.**

Jon: *"people like their own format for recruiting… you should be able to add a
LinkedIn column, a notes column, or whatever else without it messing with the
Blotter controlled side."*

**This already works and nobody knew.** `findColumn_` locates every column by its
header text rather than its position, and each Blotter column is written as a
single column range. A student can insert, reorder or add columns freely; only
the header names have to survive. **The work is documentation, not code.**

---

## Open, and being discussed

### O1. The setup scan — **reframed September 2, and it got much smaller**

**Jon's answer to what is actually painful settles the shape of this:**

> *"Every student in some form or another will have a personal tracker. No one
> goes through this process without one. With that being said, the tracker likely
> isn't perfect, will miss some contacts and might be stale."*

**So setup is not a recall problem after all. It is a copying problem**, and
nothing automates copying Name, Title and Firm out of a spreadsheet whose layout
Blotter has never seen.

**Which shrinks the scan from the main path to a gap-filler** — and suggests the
right shape is a **diff, not a dump**:

> After the student has pasted their tracker in, show them everyone they have
> emailed **who is not already in Contacts.**

That is a short, high-signal list — the handful their tracker missed or went
stale on — rather than several hundred rows of everyone they have ever written
to. It also runs on exactly the machinery `Found` already has.

**Still open:** whether that is worth building at all, and whether it runs once
at setup or stays available as a "what am I missing?" button.

### O1b. The original tension, kept because the reasoning still applies

**The tension Jon identified:** if Blotter is smart enough to find contacts at
setup, why not run that forever? **Answer: a wrong guess costs once at setup and
every day if it runs forever.** The 170 classmates are what a wrong guess looks
like landing in a sheet.

**The version worth examining** is mechanical rather than intelligent: list
everyone the student has written to in the window, and let them tick the
recruiting ones. No domain list, no content reading, and it works for bankers on
personal gmail addresses — which a bank-domain list never would.

**Why this is not D3 in disguise, and it is the crux:**

> At setup the hard problem is **recall** — who did I email across four months?
> Going forward the hard problem is **nothing** — the student knows exactly who
> they just emailed.

Typing Name, Firm and Title is identical work either way. **The value is
entirely in the remembering, and remembering is only hard once.**

Jon, on the manual alternative: *"you simply own the left hand side columns and
you type all contacts retrospectively when you sign up."* Undecided.

### O2. Growing the list going forward stays manual

Confirmed as the current behaviour and Jon understands it: a brand-new outreach
to someone not in Contacts is never fetched, because the search only looks for
addresses already in the sheet. `Found` grows **sideways only** — new people
inside conversations that already involve a contact.

Open as to whether that is acceptable, not as to whether it is true.

---

## Parked, explicitly. Do not raise until Jon does.

- **A full UI overhaul of the sheet** — an instructions tab, what every column
  means, what to do on day one, setup walkthrough. Jon: *"we are nowhere near
  that."*
- **Reconciling the website with the engine, in both directions.** The site
  still shows `Next move`, `Bump thread` and a day threshold, none of which
  survived contact with the data.
- **Terms of service and the rest of the legal surface.**
- **Simulated live email tests** from accounts Jon creates — the only way to test
  mail arriving without a real student.
- **Uploading an existing tracker** instead of the Blotter template.

---

## Ruled September 2, 2026 — the seven open questions, closed

All seven decided. Those that change engine behaviour are in
`04-ENGINE-RULES.md` **version 5**; the rest live here.

### D9. Found and the setup diff are two features, not one. Both kept.

Jon first described Found as "addresses on the To line of sent mail," then
withdrew it once they were separated — *"I was mixing it up. Yes, keep both
doing different jobs."*

- **Ongoing Found stays as built**: anyone appearing in a conversation that
  already involves a contact. This is the feature that catches a referral — John
  Sellingsloh cc'd five colleagues in one line and two became completed calls.
  **Narrowing it to people the student has already emailed kills exactly that**,
  and would only ever surface people they already know about.
- **The setup diff (O1) stays separate and unbuilt.**

**Noise is D2's recipient cap's job, not the source's.**

### D10. A declined invite gives `Call cancelled` — an eighth status. **Not built.**

The one genuine defect of the seven: a declined invite left a row reading
`Call scheduled` forever for a meeting nobody would attend.

**It holds only until somebody writes.** That self-clearing is what stops it
being a dead end. **Needs a `05-CONTRACT.md` version bump** — events do not
carry accepted-or-declined today.

### D11. A bounced address reads `Bounced`, even if they later reply elsewhere.

Marijoy's two guessed addresses both bounced; she wrote three weeks later from a
third. In between, `Bounced` is both true and the useful thing to say.

### D12. A closed row keeps its history; `Days` shows a dash. **Not built.**

### D13. A call flips to `Call done` the moment it starts. **Not built.**

At 2:01 on a 2:00–2:30 call. Replaces an unratified convention that waited for
the end time.

### D14. Warnings stay free-form and untested.

Sentences for a person to read. Locking the wording turns every improvement into
a broken test; the things that must be exact already are.

### D15. Referral discovery reads headers only, never bodies.

Micah Poag's three referral addresses live in body text and are genuinely lost.
Accepted: every signature and disclaimer in a mailbox is full of addresses.

### D16. Lonnie Kauppila's record is a fiction and needs re-fetching. **Not fixed.**

Two real threads, which between them show the version-one scope decision better
than any argument:

- **An interview confirmation from `Sara.Laracca@hl.com`** naming Lonnie as
  interviewer **in the body**.

  ⚠ **The reason first given here was wrong** and the Phase A build caught it.
  Sara Laracca **is** a tracked contact, so that thread is not invisible at all —
  it sits on *her* row. **Lonnie is unreachable from it for a different reason:
  she is named only in body text, and referral discovery is headers-only
  (D15).** Same outcome, different mechanism. Corrected September 2, 2026.
- **Jon's thank-you, sent straight to Lonnie**, which is the only message that
  counts. She never replied.

**Her row reads `Sent`, attempts 1**, clock running from the thank-you, and the
interview appears nowhere at all. Working exactly as ruled.

The date needs the real fetch rather than inference: the confirmation says
2/9/2024, the thank-you says "yesterday" and "have a good weekend," and those do
not obviously agree.

---

## Phase B decisions, September 2, 2026

### D17. A `Pretend today is` setting gives the live test a time machine. **Not built.**

Jon asked whether altering his computer's clock would simulate elapsed time.
**It would not, and the reason is worth recording:** every clock in this system
is Google's. The trigger fires on Google's infrastructure with the laptop shut,
`now` is Apps Script's server time, mail timestamps are Gmail's and events are
Calendar's. **The student's machine is not in the loop anywhere.**

**But `now` is already a field the courier sends** — a deliberate contract choice
that is exactly what lets the fixtures ask what was true on a past date. So the
workaround is a Settings row: blank in normal use; when filled, the courier sends
that date as `now`.

- **Gives:** day counters at any date, a future event becoming a past one so
  `Call done` fires, a fresh thread aged to a month, instantly and repeatably
- **Cannot give:** new mail. That is still sent by hand, which takes minutes
- **Must not ship to a student unmarked.** A date typed in by accident produces a
  sheet full of confident nonsense

**This collapses the live test from a two-week wait to an afternoon of sending
plus time-jumps**, with two or three real days at the end only to prove the timer
fires unattended and a real midnight rolls over.

**Sequencing:** a courier change, and Phase A is editing `Code.gs` now. Hand it
to that chat when it reports rather than making Jon paste the script twice.

### D18. The live test runs before the UI work.

Jon agreed. The test changes what the instructions need to say; writing them
first documents assumptions rather than what actually confuses a person.

### D19. The sheet matches the website's cosmetics. **Not built.**

Jon: *"Match site's cosmetics as much as possible. Need to look extremely neat
and pretty and be hyper formatted… also easy to use and understand and navigate
and be digestible."*

Colour-coded status is the landing page's most recognisable visual and the sheet
should use the same colours. **It is also the first point at which the product
and the marketing agree about anything**, which makes it the opening move of
Phase C rather than a formatting pass.

Scoped as its own design job, after the test.

### D20. What the live test is actually for — and what it must not re-prove.

**The fixtures already prove the engine's judgment** across a real season at four
dates against an independently written answer key. **The live test must not
re-litigate any of it.** It exists for what fixtures structurally cannot reach:

the courier finding new mail · the timer firing unattended · writing to a real
sheet · `Found` approval across two runs and a human edit · an ignore that
persists · `Closed` obeyed · **real Gmail search behaviour, which is what
produced the 170 classmates** · real quota and run duration · a run that fails
halfway · **and the install itself on a fresh account, which is the only way
anyone ever sees Google's unverified-app screen.**

**Three or four throwaway consumer Gmail accounts**, confirmed available. One is
the student, the rest are bankers. Consumer deliberately — the tighter quota
tier, so what works there works everywhere.

**Written as a script, not a session**: what to send, from whom, at which
pretend-date, and what the sheet must say after each step. It is the fixture idea
made live, and re-runnable whenever anything changes.


### D21. A decline that lands before the call's date. **OPEN — needs Jon.**

Raised by the Phase A build as §5.1b, and the last loose thread in the
`Call cancelled` work.

A banker declines Monday for a call due Friday, then writes Tuesday saying "can
we do next week?" **Today the row still reads `Call cancelled` until Friday
passes**, where `Replied` would be more useful.

The clock ruling fixed the *number* and left the *status* on the old anchor.

**Options:** clear the status as soon as anyone writes, regardless of the call's
date — which is what the state's self-clearing rule was meant to do everywhere
else; or leave it, on the grounds that the call is still nominally on the
calendar until its date passes. **Jon rules.**

### D22. The time machine's small print, as built.

A pretend date with **no time** means the end of that day, and a date-formatted
cell's midnight counts as no time given. Documented for students in
`INSTALL.md`.

### D23. The run cost, measured rather than estimated.

**44 seconds** on the heaviest configuration that exists — 1,100-day look-back
on mail *and* calendar, 58 contacts, three years of personal calendar — against a
budget of roughly 82. Down from 83 seconds before the calendar fix.

**A real student is a fraction of this.** The quota arithmetic in
`11-COURIER-NOTES.md` §3 was always flagged as an estimate awaiting an
observation; there are now two.
