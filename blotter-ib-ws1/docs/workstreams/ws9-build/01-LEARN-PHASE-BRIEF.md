# WS9 Learn Phase — brief for the chat that reads the mailbox

Date written: September 1, 2026
Written by: the conductor chat, session 11
Status: **Ready to execute.** Nothing has been read yet.
Revised: September 1, 2026, same day, after Jon corrected two things — the
mailbox split and what his tracker is actually worth. **Sections 3, 5, 7, 9 and
10 changed.**
Model: **Opus.** Extraction errors here are silent and everything downstream
inherits them.

Read this file top to bottom before touching a tool.

---

## 0. ABSOLUTE PROHIBITIONS — read these first, they are not negotiable

Jon stated these in capitals. They bind this entire chat.

### Never open a file. Any file. For any reason.

**Do not read, open, download, extract, summarise, or inspect a single email
attachment in this period.** Not one. This holds whether the email is banking
related or not, whether the attachment looks relevant or not, and whether it
would help or not.

Almost every recruiting email in this window carries a **resume attachment**.
Ignore it. Record only *that* an attachment existed and its filename if the
metadata hands it to you for free. Never its contents.

There are also Marlin Equity Partners and K-1 tax emails in this window with
files attached. Same rule, absolutely.

**If you find yourself reasoning about why one particular file would be safe or
useful to open, you have already violated this rule.** Stop.

### This chat is read-only. It never writes to Gmail or Calendar.

The Gmail connector exposes write tools. **Every one of the following is
forbidden in this chat:**

`create_draft`, `update_draft`, `send_message`, `reply`, `forward`,
`trash_message`, `trash_thread`, `untrash_message`, `untrash_thread`,
`label_message`, `label_thread`, `unlabel_message`, `unlabel_thread`,
`update_message_labels`, `create_label`, `update_label`, `delete_label`,
`mark_message_spam`, `mark_thread_spam`, `unmark_message_spam`,
`unmark_thread_spam`, `apply_sensitive_message_label`,
`apply_sensitive_thread_label`.

Calendar is equally read-only. **Forbidden:** `create_event`, `update_event`,
`delete_event`, `respond_to_event`.

**Permitted, and these are the only ones:** `search_threads`, `get_thread`,
`get_message`, `list_labels`, `list_events`, `search_events`, `get_event`,
`list_calendars`.

Jon's words: *"This is read only. Absolutely NO DRAFTING OR SENDING."*

### Do not read irrelevant mail

You can tell banking recruiting mail from everything else. **If a thread is not
banking recruiting, do not read it through and do not record it.** Identify it
as out of scope from the sender and subject, and move on. Marlin Equity Partners
and K-1 tax mail are named exclusions and there will be other personal mail in
this window that is simply none of this project's business.

---

## 1. What you are doing, in one paragraph

Blotter is a product that has never been built. Its landing page describes a
mechanism — email and calendar activity automatically maintaining the state of
every recruiting relationship — that was designed from memory and intuition,
not from data. **You are the first contact this project has ever had with
reality.** You will read Jon's own investment banking recruiting season out of
his Gmail and Calendar, record what actually happened, and report what the data
says the product would have to handle.

You are not designing the product. See section 8.

---

## 2. Read these first, in this order

1. `CLAUDE.md` at the repo root — the working agreement. **Specs govern, skills
   serve them, surface conflicts rather than splitting them.**
2. `blotter-ib-ws1/docs/01-project-and-product.md` — what Blotter is, the
   problem it claims to solve, and the two-layer model of student-maintained
   contact information against Blotter-maintained activity state.
3. `blotter-ib-ws1/docs/workstreams/WS2-SPEC.md` — the proposition. Sections
   *Proposition mechanism* and *Minimum visible offer* are the ones that matter.
4. `blotter-ib-ws1/docs/04-decision-log.md`, **session 11 only** (the last
   entry). The build architecture Jon ratified on September 1, 2026, and why.

**Do NOT read `web/lib/sheet-data.ts` or `web/lib/privacy-copy.ts` yet.** They
carry the advertised statuses and the advertised privacy mechanism. Reading them
before you have derived your own categories from the data will bias every
category you produce. They are required reading for **Pass Two only**, and
section 5 says when.

---

## 3. Scope

| | |
|---|---|
| Mailbox, Stage A | `jnachman17@gmail.com` |
| Mailbox, Stage B | `jnachman@utexas.edu` — **a second, separate run.** See section 5 |
| Window | **December 2023 through April 2024**, inclusive, both mailboxes |
| Also in scope | Calendar, same window |
| Excluded by name | Marlin Equity Partners; K-1 and tax mail |
| Excluded by category | Everything that is not banking recruiting |
| Attachments | **Never opened.** See section 0 |

**Jon recruited from two addresses and did not realise it until this brief was
written.** His tracker has a column `Email Sent From` carrying both. He has
since confirmed: *"a ton of emails were sent from jnachman@utexas.edu."*

Only one mailbox can be connected at a time, so the two are read in sequence and
**Stage A stops and waits.** Section 5 governs.

**Jon has warned you the volume will be smaller than the landing page's
marketing implies.** Some public material references figures like 742 emails and
112 coffee chats. Those numbers are not your target and you are not trying to
reach them. **Count what is there and report that.** If reality is a third of
the advertised figure, say so plainly — that is a finding, not a failure.

Jon has also warned that **the tracker is incomplete**: *"It might miss things,
there might be additional emails not contained in my tracker."* Mail that never
made it into the tracker is one of the most interesting things you can find.

---

## 4. Bodies are in scope. Attachments are not.

Jon ruled on September 1, 2026 that you may read and record full message
**bodies** for banking recruiting mail: *"I'm fine if this reads all headers and
bodies and records that. Help maximises information and reflect reality
conditions for the real product."*

This supersedes an earlier proposal in the same conversation to record only
snippets. Record the full body text of in-scope messages.

**This does not loosen section 0 by one inch.** Bodies yes, attachments never.

The repository is private and Jon has cleared committing this material.

---

## 5. The method: two passes, and Pass One runs in two stages

### Why the order matters at all

**Pass One derives categories from the data with no vocabulary supplied.** Pass
Two compares them against what the product already claims. If you are handed the
product's categories first you will sort the world into them and report that
they fit, and that result is worth nothing. The categories must come up out of
the mail.

### Stage A — `jnachman17@gmail.com`

Extract everything in scope from this mailbox and the calendar, per sections 3,
4 and 6. Write the corpus. Write the **interim report** described in section 10.

**Then stop.** Do not derive state categories yet. Do not start Pass Two. Do not
read the two forbidden files in section 2.

**Tell Jon in plain English that Stage A is complete**, what you found, and what
you could and could not answer from this mailbox alone. Then wait.

### Stage B — `jnachman@utexas.edu`

Jon will connect the second mailbox and tell you to continue. **Only one Gmail
account can be connected at a time**, so Stage B cannot begin until he has
switched it over. Confirm you are reading the utexas mailbox before you start —
if the connector still answers as `jnachman17@gmail.com`, say so and stop rather
than re-reading Stage A's mail a second time.

Same window. Same rules. Same prohibitions in section 0, which have not relaxed
by one word. Extend the corpus rather than starting a new one.

**Stage B may happen in a fresh chat.** Everything needed to resume must
therefore be on disk before Stage A ends — the corpus, the interim report, and
enough notes in `corpus/README.md` that a cold chat can pick up without
re-reading anything. **Do not hold state only in conversation.**

#### Merging the two mailboxes

The same message can exist in both accounts — Jon cc'd himself, a banker replied
to both, a thread crossed over. **Deduplicate, and record how.**

- Record a `source_mailbox` field on **every** message and event.
- Deduplicate on the RFC822 `Message-ID` header where available; fall back to
  sender plus timestamp plus subject, and mark those matches as inferred.
- **Never silently drop a near-duplicate.** Record it and flag it. Two nearly
  identical messages may be a genuine duplicate or may be a real resend, and
  those mean opposite things about the relationship.

### Pass Two — only now, and over the combined corpus

With both mailboxes in, derive the state categories from the whole season. Then,
and only then, read:

- `web/lib/sheet-data.ts` — the advertised statuses and columns
- `web/lib/privacy-copy.ts` — the advertised processing mechanism
- `blotter-ib-ws1/docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
- `blotter-ib-ws1/docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`

Then write the comparison: what the page claims, what the data shows, where they
agree, where they diverge, and **what the page describes that does not exist in
reality at all**.

**The landing page is context, not a constraint.** Jon: *"There is no binding
constraint to try and morph our findings to fit an imperfect system not created
on data."* Nobody has paid and nobody has signed up. **Do not bend a finding to
fit the page.**

## 6. What to record, and how to shape it

### Shape it like the thing it will one day test

The eventual product receives *everything about one contact* and returns *that
contact's state*. **Shape the corpus the same way** and it doubles as the test
harness for every future build chat, for free.

One JSON file per contact, in `blotter-ib-ws1/research/corpus/contacts/`, plus a
single `index.json` listing them all with summary counts. **One file per contact
matters** — a build chat can then load the three cases it needs instead of a
multi-megabyte blob it cannot fit in context.

### Per contact

Identity as it appears in the mail, every address seen for them, firm, title
where knowable, and how the relationship opened. Then every thread, and inside
each thread every message in time order.

### Per message, at minimum

Direction (inbound or outbound), timestamp with timezone, from, to, cc, subject,
thread identifier, Gmail message identifier, whether an attachment was present
(**filename only if free, never contents**), and the body text.

**Direction is the single most important field and it is not always obvious.**
See the two-address problem in section 7.

### Per calendar event

Start, end, title, attendee list with response status, organiser, whether it was
created by Jon or by the banker, and whether it correlates to a contact.

### Rules for the record itself

- **Record, do not interpret.** Pass One's categories go in the findings
  document, not into the data files. A corpus with judgments baked in cannot be
  re-read later under a different theory.
- **Where you are unsure, record the uncertainty rather than resolving it.** A
  field marked uncertain is useful. A field guessed confidently is poison.
- **Never invent a value to fill a field.** Missing is a legitimate value and it
  is itself a finding about what the real world does not provide.

---

## 7. The specific questions to answer

These come from the design conversation. Answer each explicitly in the findings
document, with numbers, and say plainly when the data cannot answer one.

1. **How much is actually there?** Contacts, threads, messages, calendar events.
   Distribution across the five months.

2. **Did coffee chats live on the calendar?** Jon believes nearly all did, and
   an enormous amount rests on it — three of the product's states depend on a
   chat existing as a calendar event. **Verify it, do not assume it.** For every
   chat you can identify from the mail, was there a corresponding event? Who
   created it? What fraction were scheduled purely in email prose with no invite
   ever appearing?

3. **The two-address problem — confirmed, not hypothetical.** Jon networked
   from `jnachman17@gmail.com` **and** `jnachman@utexas.edu`, and did not
   remember doing so until this brief surfaced it. Quantify the split once both
   stages are done.

   **This is the finding with the largest product consequence so far.** A
   product watching one address computes every downstream state wrong for the
   other's threads — it sees a banker's reply with no outbound before it, or
   silence where an email was actually sent. **In Stage A, note every thread
   that appears to be missing its outbound half**, because those are the threads
   Stage B should close. If a real fraction never closes, real students have
   this problem too and onboarding must ask for every address they send from.

4. **Reply-address drift.** Did bankers reply from the address they were emailed
   at? The tracker shows many personal gmail addresses alongside corporate ones.
   How often does the sender of a reply fail to match the stored contact address,
   and what would a naive sender-match miss?

5. **Bounces.** The tracker's legend has `Bad Email Address`. What does a bounce
   actually look like in this mailbox, and how reliably could one be detected
   from headers alone?

6. **Silence.** How long is a normal gap before a reply? What separates a thread
   that was dead from a thread that revived? **Is there any defensible number of
   days after which silence means something** — the product wants to claim one.

7. **Thank-you notes.** After a completed call, did a thank-you follow? How soon,
   how consistently, and is it detectable?

8. **The tracker, used carefully.** Read
   `blotter-ib-ws1/research/jon-real-ib-tracker.xlsx` — sheets `Banking
   Contacts` and `Email Structures`. **It is not an answer key and section 9
   explains exactly what it is and is not good for.** Use it for the contact
   list and the column structure. Do not treat its state markings as truth.

9. **What the mail contains that no column captured.** The most valuable
   category. Things that clearly mattered and that a spreadsheet never held.

10. **What would have been impossible to compute.** States in the tracker that
    no amount of email and calendar access could produce. `Leaving Position` and
    `Left Position` look like early candidates — that is human knowledge, not a
    derivable fact. **Name every one of them.** They are the honest boundary of
    what this product can ever do.

---

## 8. What you must NOT do

- **Do not design the state machine.** The logic is being designed by Jon and
  the conductor chat, together, from your findings. Producing a proposed design
  will bias that conversation toward whatever you happened to write down.
  Reporting *what the data supports* is your job; *deciding* is not.
- **Do not write product code.** None. Extraction scripts for your own use are
  fine and belong in `blotter-ib-ws1/research/`.
- **Do not touch `web/`.** The live site is not in scope in any way.
- **Do not edit any existing document.** You create new files only. If you find
  something that contradicts an existing spec, write it in your findings and say
  so loudly — do not go amend the spec.
- **Do not stage or commit anything outside your two output locations.**
  Explicit paths only, never `git add -A`. This repository has been bitten by
  exactly that, in session 9.

---

## 9. The tracker, and what it is actually worth

`blotter-ib-ws1/research/jon-real-ib-tracker.xlsx` is Jon's real tracker from
this season.

### It is NOT an answer key. Jon corrected this himself.

An earlier draft of this brief called it ground truth for state. **Jon
corrected that on September 1, 2026** and the correction is important enough to
quote:

> *"The states on the tracker were from a template. I never really followed
> them whatsoever and color coding states became stale and I didn't use it.
> Really just noise."*

And separately: *"It might miss things, there might be additional emails not
contained in my tracker."*

**So: the eleven states in its legend are a template's vocabulary, not a record
of what happened.** Do not reconcile the mail against them expecting agreement,
do not treat a disagreement as a finding about the mail, and do not carry those
eleven words forward into Pass One as candidate categories. **They are noise and
they would contaminate the derivation.**

**The mail is the only source of truth about what actually happened.** That is
now the whole reason this phase exists.

### What it IS good for

**The contact list.** Who Jon actually networked with, their firms, and the
addresses he had for them — useful for finding threads and for spotting
reply-address drift. Incomplete, so treat it as a starting set and not a
boundary. **Contacts in the mail but not in the tracker are a finding.**

**The column structure.** A real student's real tracker columns:

`Name`, `Position`, `Company`, `Location`, `Relation`, `Group/Division`,
`Contact`, `Email`, `Degree`, `Notes`, `LinkedIn`, `Initial Contact`,
`Secondary Contact`, `Email Sent`, `Response`, `Call Date`, `Email Sent From`,
`Thank you email`, `Total`

Nineteen columns where the product shows ten. **Which of these carry real data
and which are empty?** An empty column that survived the whole season is a
column a student thought they wanted and never used, and that is directly
relevant to what the product should build.

**The `Email Sent From` column**, which is how the two-address problem was found
at all.

### The finding that is already sitting here, and it is a big one

The product's founding story, in `01-project-and-product.md`, says the tracker's
value is *"the decay curve: state columns maintained early, then abandoned as
the season got busy."*

**Jon now says they were never really maintained at all.** That is not decay —
it is a state layer that was dead on arrival, inherited from a template and
never once trusted.

**This is a discrepancy with a ratified project document and it is your job to
resolve it against the evidence, not to pick a side.** The file itself can
settle it: look at when each state cell was actually filled, and whether the
pattern is early-then-stopped or never-really-started. Report what you find,
including if it supports neither description.

Either version supports the product. **They are not equally interesting.**
Gradual decay says manual upkeep fails under load. Dead on arrival says manual
state tracking is so unnatural that a motivated student who built a 19-column
tracker never even began. **The second is a stronger case and a different
product story**, so establish which is true rather than assuming.

## 10. What to write, and where

### The data — written during both stages

`blotter-ib-ws1/research/corpus/`
- `index.json` — every contact, with counts and a pointer to their file
- `contacts/<slug>.json` — one per contact, per section 6
- `calendar.json` — every in-scope event
- `README.md` — how the corpus is structured, what each field means, what is
  missing and why, the exact tool calls used to build it, **and which stage
  produced what.** Written so a cold chat can resume Stage B from this file
  alone

Every message and event carries `source_mailbox`. Stage B extends these files;
it does not start new ones.

### The interim report — written at the end of Stage A, then Jon is told to switch

`blotter-ib-ws1/docs/workstreams/ws9-build/02-LEARN-STAGE-A.md`

**Facts only. No derived state categories, no comparison to the landing page.**
Both of those wait for the full corpus.

1. What was read — scope covered, what was skipped and why, what could not be
   reached
2. The shape of what is in this mailbox — volume, timing, distribution
3. Which of section 7's ten questions this mailbox can answer, with numbers
4. **Threads that appear to be missing their outbound half** — the Stage B
   worklist, per question 3
5. What is clearly incomplete and why, stated plainly

**This file is the handoff.** If Stage B runs in a fresh chat, this plus the
corpus README is everything it gets. Write it accordingly.

### The findings — written at the end of Pass Two

`blotter-ib-ws1/docs/workstreams/ws9-build/03-LEARN-FINDINGS.md`

1. **What was read**, both mailboxes, and how they were merged and deduplicated
2. **The shape of the season** — volume, timing, distribution, combined
3. **Pass One: states derived from the data**, bottom up, both mailboxes
4. **The ten questions** in section 7, each answered with numbers
5. **The tracker**, per section 9 — including the decay-versus-dead-on-arrival
   question, resolved against the file
6. **Pass Two: reality against the advertised model**
7. **What surprised you** — plainly, including anything that makes the product
   look harder than it did on paper
8. **What the data cannot answer**, and what would be needed to answer it

**Write section 7 honestly even where it is unwelcome.** Jon has explicitly
released you from making the findings agree with the landing page. A finding
that the mechanism is weaker than advertised is worth more than a comfortable
one, and it is far cheaper to learn now than after a build.

## 11. How to report back

**Twice — once at the end of Stage A, once at the end of Pass Two.**

Plain English, no jargon. **Jon is not technical**, and a wall of counts and
field names will not reach him. He has stopped a chat mid-answer for exactly
this. Lead with what you learned about his recruiting season and what it means
for whether this product can work; keep the field names in the files.

**At the end of Stage A**, say explicitly that you are pausing and that he needs
to connect `jnachman@utexas.edu` before you continue. Tell him what is still
unknown until that happens.

**At the end of Pass Two**, say plainly which of the ten questions you could not
answer, and what would be needed to answer them.
