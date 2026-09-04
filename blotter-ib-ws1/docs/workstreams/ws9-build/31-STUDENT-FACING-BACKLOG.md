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

---

## 4. Screenshots Jon owes

1. The `Blotter` menu open
2. The `Found` tab with the Yes/No dropdown open
3. Settings, showing `Last successful run` and `Last run warnings`
4. **Google's unverified-app warning** — for the setup page, not the sheet
5. **The permissions screen with all five boxes**, for the same reason

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
