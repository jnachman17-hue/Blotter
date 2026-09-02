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

### D4. Found never invents a name from an address. **Not built.**

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

### D7. One inbox, one address, is the normal case.

The `Your email addresses` setting exists only so the engine knows which messages
are **from the student** — how it tells `Sent` from `Replied`. It cannot reach
into a second account, and does not need to: a second entry is for a send-as
alias on the same inbox, such as a `.edu` that forwards into Gmail. **Jon's
two-account season is an anomaly and is not a design constraint.**

---

## Open, and being discussed

### O1. The setup scan — what it is and whether it needs intelligence

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
