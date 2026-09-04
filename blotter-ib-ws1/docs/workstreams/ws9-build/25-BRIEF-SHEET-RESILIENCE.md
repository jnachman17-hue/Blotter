# Brief — what a student can do to their sheet without breaking it

Date: September 3, 2026
Model: **Opus.**
Owns: `courier/` and this workstream's docs. **Nothing under `web/`.**

**Jon's question, and it is a gap:** *"if students can't customise their sheets,
like if they wanna add their own colour coding or add formulas, we need to
predictably think about what will break the sheet."*

**Nobody knows the answer.** It has never been tested. And *"can I add a
LinkedIn column?"* is roughly the first thing a real student will do.

---

## 0. Boundaries

- **You own `courier/` and `blotter-ib-ws1/docs/workstreams/ws9-build/`.**
  A parallel chat is rebuilding `web/` — **do not touch it.**
- Read-only on Gmail and Calendar. No attachments.
- **Do not edit** `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`.
- Explicit paths when staging. Never `git add -A`. **A second chat is live.**

## 1. Read first

`00-STATE-OF-PLAY.md` · `20-UI-BUILD-NOTES.md` · `24-PRE-LAUNCH-READINESS.md` ·
`courier/Code.gs`, especially `headerRow_`, `findColumn_`, `readContacts_`,
`writeBlotterColumns_`, `syncClosedCheckboxes_`, `sortContacts_`.

---

## 2. Find out what actually breaks, by breaking it

**Reason from the code first, then say what you cannot know without a live
sheet.** For each case: does the run fail loudly, fail silently, or cope?

**Expected safe — confirm, do not assume:**
add a column anywhere · reorder columns · colour their own cells · bold a name ·
add rows · sort by hand · rename the file · add a tab of their own · put a
formula in **their own** column · resize columns · freeze more

**Expected to break — confirm and characterise:**
rename a Blotter column · delete one · delete the banner or header row ·
rename or delete `Found` / `Settings` / `Contacts` · put a formula in a
**Blotter** column · merge cells in the data · delete `Closed` · leave a blank
row mid-list · duplicate a header name

**The ones I most want answered**, because they are likely and the failure is
quiet rather than loud:

1. **A formula in a Blotter column.** It gets overwritten every run. Does the
   student lose work silently?
2. **A blank row in the middle.** Does everything below it still get the right
   answers? **This touches the join key**
3. **A duplicate header** — two columns called `Notes`, or a student's own
   column called `Status`. What does `findColumn_` pick?
4. **Manual sort while a run is in flight.** `sortContacts_` takes the lock; a
   student dragging rows does not
5. **A renamed tab.** Recoverable, or do they start again?

## 3. Fail loudly, and say what to do

**A silent wrong answer is far worse than a stopped run.** Where a break is
survivable, cope. Where it is not, the run must stop and **the message must name
the column or tab and say `run Step 1`** — `missingSetup_()` already exists for
exactly this.

Fix what is cheap to fix. **Report what is not, rather than papering over it.**

## 4. Then write it down where a student will see it

A **`Can / Can't`** block in the `Start here` tab. Short, concrete, in their
words not ours:

> **Yours to change:** add any columns you like, anywhere. Colour them. Put
> formulas in them. Add rows. Sort however you want.
>
> **Leave alone:** the column headings Blotter writes, and the top two rows.

Plus a repair line: **if something goes wrong, run `Blotter → Step 1` — it
rebuilds the sheet without touching your contacts.**

## 5. While you are in there — two small things from §4 of the readiness doc

- **Surface the install id in Settings**, read-only, labelled
  `Your Blotter ID (quote this if you need help)`. `installId_()` already
  exists; it is the support handle Jon thought he had to invent
- **A help route**: a Settings row and a line in `Start here` giving the help
  page and `jnachman17@gmail.com`. **In the sheet, not only on the website** — a
  student whose sheet has stopped will not go hunting on a marketing site

## 6. What NOT to do

- **No renderer work.** Tier 1 is coming and is not yours
- No billing
- Nothing under `web/`
- Do not change the contract

## 7. Write

- Fixes in `courier/`
- `blotter-ib-ws1/docs/workstreams/ws9-build/26-SHEET-RESILIENCE.md` — every case,
  what happened, what was fixed, and **what still needs a live sheet to settle**

## 8. Report

Plain English. **Jon is not technical.** Lead with what genuinely breaks, what
is safe, and anything he must test by hand.
