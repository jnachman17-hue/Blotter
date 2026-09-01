# The Blotter template sheet

Date: September 1, 2026
Ruling: **Version one uses a Blotter template**, not the student's existing
tracker. Jon, September 1, 2026, per the recommendation in
`blotter-ib-ws1/docs/workstreams/ws9-build/08-BRIEF-COURIER.md` §3. Column
mapping for arbitrary trackers is deferred, not dropped.

This file describes the sheet the script's **Step 1: Set up this sheet** menu
item builds. The script finds every column **by its header text, not its
position**, so a student may insert, reorder, or add columns freely — only the
header names below must survive.

## Tab: `Contacts`

Column order per `04-ENGINE-RULES.md` §9: the student's columns, then
Blotter's, then `Closed`.

| Header | Who writes it | Notes |
|---|---|---|
| `Name` | Student | Also written by the script for a **brand-new row** when the student approves someone in `Found` (Jon's ruling, Sept 1 2026) |
| `Title` | Student | Optional; never sent to the server |
| `Firm` | Student | Sent to the server — the title-match rule (§7) needs it |
| `Email` | Student | Several addresses allowed, separated by commas. Same approval exception as `Name` |
| `Status` | Blotter | Exactly one of the seven contract statuses |
| `Days` | Blotter | Blank where the state has no clock |
| `Last contact` | Blotter | Formatted `m/d/yy` |
| `Attempts` | Blotter | |
| `Next call` | Blotter | Blank when there is none |
| `Last call` | Blotter | |
| `Closed` | Student | A checkbox. The script reads it and obeys; it never checks or unchecks it |

The script never modifies any student cell, and never modifies an existing
row's `Name` or `Email`. The six Blotter columns are recomputed every run,
written one whole column at a time so student columns inserted between them
are never touched.

## Tab: `Found`

New people the server noticed in the student's conversations, awaiting
approval (`04-ENGINE-RULES.md` §8). Never auto-added.

| Header | Who writes it | Notes |
|---|---|---|
| `Add?` | Both | Student picks **Yes** or **No** from the dropdown. The script rewrites the cell to **Added** or **Ignored** once it has acted, so the student can see it happened |
| `Name` | Blotter | |
| `Email` | Blotter | |
| `First seen` | Blotter | |
| `Context` | Blotter | e.g. "Appeared in a thread with Jamie Diamond" |

- **Yes** → on the next successful run the script appends a new row to
  `Contacts` with just that name and email, then marks the Found row `Added`.
- **No** → the address goes into the contract's `ignored` list on every future
  request and is never suggested again. The row is marked `Ignored` and **must
  stay in the tab** — it *is* the memory of the rejection. Deleting an
  `Ignored` row brings the person back.
- Blank → pending. The script never duplicates a suggestion that is already
  anywhere in `Found` or `Contacts`, under any capitalisation.

## Tab: `Settings`

Label in column A, value in column B. Found by label text, not row number.

| Label | Who writes it | Notes |
|---|---|---|
| `Your email addresses` | Student | **Every** address they send from, comma-separated. Missing one silently corrupts every downstream state (decision log, session 11: Jon himself recruited from two and did not know) |
| `Server URL` | Student (pre-filled) | Defaults to `https://blotterib.com/api/engine` |
| `Last successful run` | Blotter | The contract's one permitted extra write. If it goes stale, Blotter is failing quietly and touching nothing |
| `Last run warnings` | Blotter | The contract's `warnings` array, joined; `None` when empty. The contract gives warnings no home in the sheet, so this is the courier's choice — flagged in `11-COURIER-NOTES.md` |

## What is deliberately absent

- **No sorting.** §4 says longest-waiting first, but sorting the tab would
  reorder the student's rows and change row numbers — and the brief's
  exhaustive list of courier duties does not include it. Where sorting lives
  is an open question for Jon, recorded in the notes.
- **No setup scan.** The wide 3-month scan (§2) has no endpoint in the
  contract and is not in the courier brief's list. The pilot student pastes
  their starting contacts in by hand; `Found` grows the list from there.
  Recorded in the notes as a contract gap.
- **No attachment record.** The contract has no field for one, and Apps Script
  cannot note an attachment's existence without fetching it.
