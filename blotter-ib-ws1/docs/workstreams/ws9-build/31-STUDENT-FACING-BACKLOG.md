# What a student has to be told — the running collection

Date opened: September 3, 2026
Status: **A collection point, not a plan.** Jon and the conductor rewrite
`Start here` from this in one pass, together.

**Why this file exists.** Things a student needs to know are being discovered in
four different places — the live test, the resilience audit, the readiness list,
the billing design — and each chat writes its own note. **Nobody was holding the
student's side of it.** This is that.

**Nothing here is written until Jon and the conductor do it together.** Some of
it is already in the sheet; the rest is waiting.

---

## 1. Already in `Start here`

- What Blotter is, and the left/right split
- Four setup steps, including every send-from address and the time zone
- What all eight statuses mean, in Jon's own words
- Days and Attempts, and why a dash appears
- Sorting
- The Found tab, and the warning not to delete an `Ignored` row
- What Blotter never does
- **`Yours to change / Leave alone`** — added by the resilience audit
- Three marked slots awaiting Jon's screenshots

## 2. Added to Settings, not yet explained in `Start here`

- **`Your Blotter ID (quote this if you need help)`** — the support handle
- **`Help`** — the help page and `jnachman17@gmail.com`

---

## 3. Waiting to be said, grouped by why it matters

### 3.1 Things that will otherwise be discovered the hard way

- **A formula in one of Blotter's columns will not survive.** Blotter now names
  the row and says where a formula can safely live, but the student should know
  before they lose work
- **Never give one of your own columns a Blotter heading.** A student column
  called `Status` was silently overwritten every fifteen minutes, forever
- **A copied sheet keeps the time zone of whoever built it.** Day counts turn
  over at midnight in that zone, so a student in New York working from a Chicago
  template is wrong at the boundary — invisibly
- **`Pretend today is` must stay empty.** A date typed there makes every Status
  and every Days answer a day that is not today: wrong, and wrong in a way that
  looks completely normal
- **Approved contacts appear blank for one run.** The server has not met them
  yet. Not a fault, and it looks like one

### 3.2 The permission screens, which is where people give up

- **Google's warning names the student as the developer**, because it is their
  own copy of a script in their own account. **The most reassuring fact
  available and nothing currently uses it**
- **`Select all` on the permissions screen. All five are required and nothing on
  that screen says so.** A cautious student ticking two gets a product that
  fails in ways they cannot diagnose
- The exact wording of every screen is transcribed in `17-INSTALL-OBSERVED.md` §1

### 3.3 Repair, which is nearly always the same answer

- **`Blotter → Step 1` rebuilds the sheet without touching contacts.** It is the
  answer to almost everything, and it should be said once, plainly, where a
  worried student will find it
- **Step 1 also restyles**, so a student's own colouring of Blotter's columns is
  reverted. Deliberate, and worth saying
- **A closed row's fade covers the student's own colours** on that row

### 3.4 Updating, once there is anything to update

- **What survives a re-paste** — contacts, settings, Found decisions, the timer.
  **Only the code changes**, and nobody will believe that unless it is written
- **Run Step 1 after every update.** It is what adds anything new
- Where the current script always lives

### 3.5 When billing arrives

- What the `Blotter key` row is for while it sits there empty
- What the banner will say, and that **the sheet freezes rather than losing
  anything** — every status and date already written stays exactly where it is

### 3.6 From the website pass, September 3, 2026

**Added by the copy-and-legal chat**, per §6. These come out of reading the site
against the engine rules, and they are things a student will hit that no surface
currently addresses.

**The permission screens in §3.2 now have a home.** `/setup` was built today and
carries all of it — the warning quoted, the developer-is-you fact, which button
cancels, `Select all`, and what breaks without each of the five. That part of
§3.2 is discharged for the website; it still cannot live in the sheet, because
the student has no sheet yet.

#### Things that look like Blotter failing, and are not

- **Day one, on an empty sheet, finds nothing — correctly.** Jon hit this
  himself, unprompted, in `17-INSTALL-OBSERVED.md` §4: *"I have sent 1 email in
  last 365 days that shoulda probably populated in found."* It should not have,
  and `0 searches` confirms Blotter never asked Gmail anything. **The first
  thing a real student does is open an empty sheet and expect it to know
  something.** One line at the top: add people first, because Blotter only reads
  conversations that already involve someone in Contacts
- **An auto-reply is not a reply, and a calendar acceptance is not a reply**
  (`04-ENGINE-RULES.md` §6). A real out-of-office arrived **20 seconds** after
  Jon's email from the contact's own address, and the row correctly did not
  move. The first time a student sees something arrive and nothing change, they
  will conclude it is broken
- **Approved contacts are blank for one run** — already in §3.1, and it belongs
  in the same group as these two

#### The thing the website promised for a year and the product refuses to do

- **Blotter will not tell you when to follow up, and a student may read that as
  missing.** `Start here` states the fact ✅. **It does not say why**, and the
  why is the most persuasive thing about it: replies in the real season came
  back at 6.8, 11, 13.2 and **21.6** days, and the 21.6-day one turned into four
  interview rounds. A five-day rule would have chased Jon about that contact
  **sixteen days before she replied**
- **There is no `Outstanding` view**, and anyone arriving from the old website
  is looking for one — `Replies owed`, `Follow-ups due`, `Thank-you notes` are
  all still on the live site today. **The real answer is
  `Blotter → Sort contacts`**, sorted by what each contact is waiting on, and
  nothing outside the sheet mentions it exists

#### The limits, which are what make the rest believable

- **Anything by phone, text, LinkedIn or in person is invisible**
  (`04-ENGINE-RULES.md` §6). At least three consequential relationships in the
  real 2024 season ran that way and one of them produced the job. A student who
  thinks Blotter sees everything will trust a row that is wrong. Now stated in
  `/terms` §6
- **Blotter can only read the mailbox it is installed in.** Several *addresses*
  arriving in one inbox are fine; a genuinely separate Google account is not,
  and no version of this works across two. `Start here` step 1's note has it,
  buried — and it is not hypothetical, since Jon's own season ran across two
  accounts and the chain that produced his job crossed both

#### The reassuring answers nobody has written down

- **If Blotter stops, nothing is lost.** The spreadsheet is an ordinary file in
  the student's own Drive with everything in it; the Blotter columns simply stop
  updating. Nothing to export, nothing held. Now in `/terms` §7, and it is the
  answer to a question asked *before* installing rather than after
- **Privacy, in the sheet, in one line**, at the moment access is granted rather
  than on a website: *Blotter reads only conversations that already involve
  someone in your Contacts tab. The text of an email never leaves your Google
  account.*

---

## 4. Screenshots Jon owes

1. The `Blotter` menu open
2. The `Found` tab with the Yes/No dropdown open
3. Settings, showing `Last successful run` and `Last run warnings`
4. **Google's unverified-app warning** — for the setup page, not the sheet
5. **The permissions screen with all five boxes**, for the same reason

**4 and 5 now have slots waiting for them.** `/setup` was built on September 3,
2026 with four marked slots: the `Blotter` menu open, the warning screen with
`Advanced` visible, the permissions screen with `Select all` visible, and the
`Start here` tab. They render as dashed placeholders rather than gaps, so the
page can be reviewed before the pictures exist.

## 5. The four live-sheet questions — CLOSED by Jon, September 3, 2026

**Jon: *"Not going to do those four things. So granular and no one would ever do
them, we don't need to add that into Start here."*** Right on three of them —
merged cells inside the data, student-added data validation, and Step 1 on a
customised sheet are all things nobody does, and the last is covered by Jon's own
use anyway.

**The fourth turned out to matter, for a reason neither of us had seen.** The
mid-run guard compared **name and email exactly**, so a student fixing a typo in
a name while a run happened to be in flight would have their run stopped. **The
most likely moment for that is setup** — typing contacts in continuously while
the timer fires every fifteen minutes. Not an edge case: day one.

**Fixed rather than tested.** The guard now compares **email only**, which still
catches everything it exists for — a sort or a drag moves the whole row, so the
address goes with it — while ignoring the name edits people actually make. And
the message stopped sounding like a disaster: it now says the run was skipped,
nothing was written, the next one will pick it up, and nothing is lost.

**Nothing from this section goes into `Start here`.**

## 6. The rule for this document

**Any chat that discovers something a student must know writes it here**, rather
than only into its own notes. `Start here` is rewritten from this file, once,
deliberately — **not patched every time somebody finds something.**

---

## Parked: the public `Code.gs` must stop being the internal one (Jon, 3 Sep 2026)

Jon read the courier source for the first time and ruled that what ships to students
is not what we work in. His words: *"This is not what's gonna go live to the public."*

**Ruling**

1. One header block at the top, in the plain-English register of the green banner:
   what Blotter Courier is, how it works, the hard rules, what it can and cannot see,
   and its limitations. This block stays.
2. **Every other comment goes.** No exceptions. A student opening the file sees code.
3. No internal references. `blotter-ib-ws1`, the contract docs, the engine rules and
   the decision log are in a private repository — pointing a student at them is
   pointing at a locked door. Cite nothing a reader cannot open.
4. **Jon's name never appears.** No "Jon ruled", no "Jon noted this".
5. Support address is `blotterib@gmail.com`, never Jon's personal address.

**How to build it (not yet ratified)**

Do *not* strip the source. The internal comments are the reason the file is
maintainable, and they cost a student nothing if they never see them. Instead:

- `courier/Code.gs` stays as it is — the file we work in.
- `courier/publish.js` becomes a real build step: strip comments, prepend the public
  header, write `web/public/Code.gs`.
- The byte-for-byte test changes accordingly: it stops asserting the two files are
  identical and starts asserting the served file is exactly what `publish.js` produces
  from the current source. Same protection against drift, correct definition of drift.

This must land before any student is given the file.

---

## Tested: the unverified-app warning does not appear on a university account (3 Sep 2026)

Run by Jon on `jnachman@utexas.edu`, a Google Workspace for Education account,
copying the sheet and running `Step 1: Set up this sheet`.

**Result: no warning.** No "Google hasn't verified this app", no `Advanced`, no
`Go to Blotter (unsafe)`. Straight to the ordinary consent screen — *"Blotter
wants access to your Google Account"*, the account named, five checkboxes.

This confirms the documented rule in Google's Apps Script client-verification
guide: *"Verification isn't required for Google Apps Script projects whose owner
and users belong to the same Google Workspace domain or customer."* A student who
copies the sheet owns the copy and is also the one running it, so the exemption
applies to them trivially. A personal `@gmail.com` account belongs to no domain,
which is why the same install on Jon's personal account showed the full warning.

**What this changes**

- The warning is an artefact of testing on a personal account. It is not the
  experience of the market Blotter sells to.
- Paying for Google's verification was already established as no help here — the
  copy running is the student's, not ours. This finding removes the remaining
  reason to consider it, and with it the argument for the Marketplace add-on
  route, for Nylas, and for anything else bought to remove a screen most users
  never reach.
- `/setup` was built around the warning. Step 3 becomes conditional.

**What it does not establish**

- One university. Each Workspace domain sets its own policy, and some block
  third-party Gmail access outright. UT does not, and UT does not block Apps
  Script either — both ran. Other schools are unknown until tested.
- Students on personal Gmail still meet the full warning. The page must keep
  explaining it, just not lead with it.

**Incidental**

The first copy into the UT account arrived **without the bound code** — the
Apps Script editor opened an empty `myFunction()`, and no Blotter menu appeared,
despite the copy dialog showing the yellow "Apps Script file and functionality
will also be copied" note. Making the copy a second time worked. Cause unknown,
not reproduced. It is silent and it looks exactly like a broken install, so
`/setup` step 2 now says to copy again if the menu is missing.
