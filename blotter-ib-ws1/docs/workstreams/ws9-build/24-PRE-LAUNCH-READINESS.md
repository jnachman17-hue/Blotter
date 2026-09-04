# Everything that has to be true before other people use this

Date: September 3, 2026
Status: **Parked. Nothing here is scheduled.** Jon's list, plus what it is
missing, written down while it is fresh.

---

## 0. The strategic thing, first, because it changes what everything else costs

**Every line of the courier is expensive forever. Every line of the server is free to change.**

That is the whole shape of this product's future maintenance, and it is worth
saying plainly before any of the work below is planned:

| | Change it | Cost |
|---|---|---|
| **Server** — statuses, day counts, what a bounce means, what gets suggested | instantly, everyone | nothing |
| **Courier** — every colour, column, tab, menu, instruction, the sort | ask every user to re-paste a script | **enormous, and it grows with every user** |

**And almost everything built recently is courier.** The whole visual design, the
`Start here` tab, sorting, the notice placement. That work is right — but it
means the next design change costs an email to every student.

### The idea worth considering before more courier work happens

**Make the courier a renderer, and ship the design from the server.**

The courier already receives rows and writes them. It could equally receive
*colours, widths, tab content and copy* and apply them — generically, with no
opinion of its own. **Then the design becomes data**, and changing a status
colour or rewriting the `Start here` tab is a server change nobody has to
install.

- **What stays in the courier:** how to fetch mail, how to write a cell, how to
  apply a colour. Mechanism
- **What moves to the server:** which colour, which words, which columns. Every
  choice

**This is not a small refactor and it should not be done reflexively.** But
every week it is deferred, another design decision gets baked into a thousand
copies. **It is the single highest-leverage thing on this page** and it belongs
in the decision before the website work, not after.

---

## 1. The website, and it is a bigger job than it sounds

**The live site describes a product that no longer exists.** Not cosmetically —
structurally.

| On the site | Reality |
|---|---|
| `Next move` column with `Reply to Jamie`, `Bump thread` | **Cut.** Blotter never tells you what to do |
| `Follow-ups due` computed from a day threshold | **No threshold exists.** Ruled out on the evidence |
| Sender-matching privacy mechanism, four steps | **Wrong.** It reads whole conversations |
| `No reply` status | Not a status. There are eight, and these are not them |
| A provider "whose Google application has passed CASA" | **There is no provider.** Nothing is true of this sentence |
| Five contacts, hero film, Section 02 tab | Drawn before anything was built. Close, but not the real sheet |

**The visuals need re-shooting from the real sheet.** Every film and mock on
that site is a prediction. Blotter exists now, and screenshots of the actual
thing will be both more honest and more persuasive than a drawing of it.

**The privacy section is the one to get right and the one that improved.** The
server now genuinely never receives the text of an email — a stronger claim than
anything currently on the page, and checkable rather than promised.

---

## 2. The setup page — Jon's, and correct

CTA becomes **`Set up now`** rather than `Fix my tracker`, and a header link
leads to a real page that walks through:

1. Open the template
2. **File → Make a copy**
3. What Google's unverified-app warning looks like, **shown as a screenshot**,
   and why it is fine — *the developer it names is you, because it is your own
   copy of a script in your own account*
4. Click `Select all` on the permissions screen. **All five are required and
   nothing says so**
5. Then go to `Start here` in the sheet

**Point 3 is the single biggest place a student gives up.** Every word about it
so far was written from documentation until the first real install, and it is
still the least-defended step in the whole product.

---

## 3. `Start here` — images and sign-off

Three marked slots already exist. Jon supplies the screenshots; wording gets a
line-by-line pass with him.

---

## 4. Support, and one thing that already exists and is not surfaced

### Every install already has an id, and nobody can see it

`installId_()` generates a UUID per sheet and sends it with telemetry. **It is
exactly the support handle Jon was wondering whether to invent, and it is
already there.**

**Surface it in Settings**, read-only, labelled something like
`Your Blotter ID (quote this if you need help)`. Then a student's email or help
form carries the one string that lets Jon look up that install's history.

### A help route in the sheet itself

A Settings row and a line in `Start here`: a link to a help page, and
`jnachman17@gmail.com`. **In the sheet, not only on the website** — a student
whose sheet has stopped is not going to go hunting on a marketing site.

### Failure visibility

Telemetry records success and failure per run. **Nothing surfaces it.** Jon
should be able to see, in one place, which installs are failing and since when
— because the first he hears of a widespread break should not be a student
emailing him.

---

## 5. Update infrastructure — Jon's biggest question

**What exists:** the courier reports its version; the notice channel can tell
every student something.

**What does not:**

- **A canonical place to get the current script.** A stable URL that always
  serves the latest `Code.gs`, so a notice can link to it
- **A version comparison.** The server should recognise an outdated courier and
  say so through the notice: *"There is a newer version of Blotter. Here is how
  to update."*
- **Update instructions that are not the install instructions.** Shorter, and
  they must say what survives — **contacts, settings, Found decisions and the
  timer all survive a re-paste**; only the code changes. Nobody will believe
  that unless it is written down
- **`Step 1` after every update.** `missingSetup_()` exists to detect a stale
  sheet; the notice should tell them to run it

### And the rollback problem, which is the serious one

**A bad server change is reverted in one deploy. A bad courier change is in a
thousand copies and cannot be recalled.**

So courier releases should be rare, deliberate, and tested on a real sheet
before anyone is told. **This is the same argument as §0** from a different
direction, and both point at keeping the courier thin.

---

## 6. What Jon did not mention

**The legal surface.** `/privacy` still carries twelve `[to be confirmed]`
slots. Terms of service do not exist. Both need to be real before a stranger
grants Gmail access, and both are now *easier* than they were, because the
architecture is genuinely more private than the page claims.

**A repair path.** A student deletes a column or renames a header and the run
throws. `Step 1` already rebuilds most of it — **make that the documented
answer** rather than something they have to guess.

**Blindness to the top of the funnel.** Telemetry fires on the first *run*, so a
student who copies the sheet and never finishes setup is **invisible**. That is
precisely the drop-off worth measuring, and Apps Script cannot phone home before
authorisation. **A link with a tracking parameter on the setup page is the only
honest way to see it**, and it belongs in the website work.

**Google changing something under us.** A scope policy, an Apps Script
deprecation, a quota. **The first warning should not be students emailing.**
Telemetry showing a sudden failure spike is the closest thing to an alarm this
architecture allows.

**Support load in January.** Recruiting is seasonal and so is everything that
goes wrong. One non-technical founder plus a hundred students at peak needs
canned answers and the ability to diagnose from an install id, not a long
conversation.

**Deletion requests.** Somebody will ask. The answer is short and good — the
server holds an install id, a key, and nothing else — but it should be written
down before it is asked rather than after.

---

## 7. The order I would suggest

1. **Rule on §0.** It changes what everything below costs
2. **The banner row** — already agreed, and the notice is unreadable until it
   lands
3. **Surface the install id and the help route.** Small, and support is
   impossible without them
4. **Update infrastructure** — the canonical URL, the version check, the update
   instructions. **Before distribution, not after**
5. **The setup page**, with real screenshots
6. **`Start here` sign-off** with images
7. **The website overhaul**, which is the largest and least urgent — it is a
   promise about a product that now exists and can be photographed
8. **Legal**, before any stranger uses it
9. **Billing**, per `23-BILLING-ARCHITECTURE.md`, last and behind a flag

**Steps 3, 4 and 8 are the ones that get much more expensive the day a second
person has a copy.** Everything else can follow at leisure.
