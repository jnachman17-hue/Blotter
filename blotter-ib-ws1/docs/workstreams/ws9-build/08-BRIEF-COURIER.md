# Brief — the Courier chat

Date: September 1, 2026
Model: **Opus.**

You are building **the courier**: the small script that lives inside a student's
own Google account, reads their mail and calendar, asks Blotter's server what it
all means, and writes the answer into their spreadsheet.

---

## 0. Hard boundaries

**Read-only on Gmail and Calendar. Always. No exception.**

The courier **never** sends, drafts, replies, forwards, labels, archives,
trashes, or marks anything. It **never** creates, edits, moves, deletes or
responds to a calendar event. It reads, and it writes to one spreadsheet.

**Never open an attachment.** Record that one exists if that is free; never
fetch its contents.

Other boundaries:

- **You own** `courier/` at the repo root, a new directory. Nothing else.
- **Never touch `web/`.** That is a live public site and the Rulebook chat's
  territory.
- **Never write to** `blotter-ib-ws1/research/corpus/`.
- **Never change** `04-ENGINE-RULES.md` or `05-CONTRACT.md`. If the contract is
  wrong, stop and say so.
- **Explicit paths when staging.** Never `git add -A`. Two other chats are live.

---

## 1. Read these, in order

1. `CLAUDE.md`
2. **`blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md`** — what you
   send and what comes back. **This is your specification**
3. `blotter-ib-ws1/docs/workstreams/ws9-build/04-ENGINE-RULES.md` — §2 for what
   to fetch, §9 for the columns. **Read it to understand what you are serving.
   You implement none of it**
4. `blotter-ib-ws1/docs/04-decision-log.md`, **session 11** — why the courier
   exists and why it must stay dumb

---

## 2. The courier is deliberately stupid, and that is the architecture

Every judgment lives on the server. The courier fetches, posts, and writes down
the answer.

**This is the single most important constraint in this brief.** A rule that
creeps into the courier is a rule that cannot be fixed afterwards: the student
owns their copy of the script, and Blotter cannot update it. Server rules change
instantly for everyone; courier changes require every student to reinstall.

**If you find yourself writing "if the last message was inbound then…", stop.**
That belongs on the server.

What the courier does, and this is the whole list:

1. Wake on a timer, every 15 minutes
2. Read the contact list and the `Closed` column from the sheet
3. Read the student's own addresses and the ignored list
4. Fetch conversations involving those contacts, and calendar events
5. `POST` it all to the server, in the contract's exact shape
6. Write the returned rows into the sheet, and the found list into its tab
7. On any failure: **write nothing at all**

---

## 3. The spreadsheet

> ### DECISION NEEDED FROM JON BEFORE BUILDING THIS
>
> **Does version one use a Blotter template, or read the student's own existing
> tracker?**
>
> The marketing says *"keep the tracker you already built."* Real trackers are
> ferocious: Jon's own has headers in odd rows, template placeholder text left
> in a live cell, trailing spaces in nearly every heading, and inherited
> reference tabs. Reading an arbitrary one means building a column-mapping step.
>
> **The recommendation is a Blotter template for the pilot**, with mapping
> deferred. It is the difference between a working pilot in weeks and one in
> months, and pilot students will accept a template.
>
> **Ask Jon and get an answer before writing sheet code.** Do not choose.

Assuming the template, three tabs:

| Tab | Holds |
|---|---|
| `Contacts` | The student's own columns, then Blotter's, then `Closed` |
| `Found` | New people awaiting approval, with an approve column |
| `Settings` | The student's addresses, the server URL, last successful run |

Column layout comes from `04-ENGINE-RULES.md` §9 exactly. **Blotter never writes
to a student-owned column.** Not to correct it, not to tidy it, not ever.

---

## 4. Failure

**On any failure the sheet is left exactly as it was.** Server down, timeout,
bad response, quota — write nothing.

A stale sheet is recoverable and obviously stale. **A half-written one is
neither**, and the student cannot tell the difference between "Blotter is
broken" and "this relationship is over." Never write rows as they arrive; build
the whole update and write it in one go, or not at all.

---

## 5. Installing it, and Jon is your first user

**Jon is not technical.** He will install this himself, on his own Google
account, and if your instructions assume anything he will be stuck.

Write `courier/INSTALL.md` as numbered steps naming **exactly** what he clicks
and what he should see. Assume he has never opened the Apps Script editor.

**Warn him about the scary screen.** When he first authorises this, Google will
show a warning saying the app is not verified, with the safe path hidden behind
an "Advanced" link. **This is expected and it is the single biggest point where
a real student gives up.** Tell him in advance what it looks like, that it is
normal for a script you install yourself, and exactly which link to click.

**Record what that screen actually says, word for word, in `INSTALL.md`.**
Nobody on this project has ever seen it, and it is a real open question in
`06-assumptions-and-open-questions.md`.

---

## 6. What you must NOT do

- **No judgments.** §2
- **No writing to Gmail or Calendar**, ever
- **No attachment contents**, ever
- **Do not add authentication or billing.** Out of scope. The pilot is free
- **Do not touch `web/`**
- **Do not invent contract fields.** If something is missing, say so

---

## 7. What to write

- The script and the sheet template, in `courier/`
- `courier/INSTALL.md` — the step-by-step, written for a non-technical person
- `blotter-ib-ws1/docs/workstreams/ws9-build/11-COURIER-NOTES.md` — what you
  built, what Google's quotas and limits actually are for this, exactly what the
  unverified-app screen says, and anything the next chat must not trip over

## 8. How to report back

Plain English to Jon. **He is not technical** and has stopped a chat mid-answer
for exactly this. Tell him what works, what you need from him, and what the
install felt like. If you needed a decision and did not get it, say so first.
