# Installing Blotter — step by step

Written for someone who has never opened the Apps Script editor. That is the
point: if any step assumes something, the step is wrong — say so and it gets
fixed.

**Part A is Jon's install**: a real install on a real account, pointed at the
2024 recruiting archive, checked against an answer key we already trust.
**Part B is what a real student does** with a copy — four steps, and it stays
four steps.

Time: about 30 minutes. You need: a computer with a web browser, signed in to
**jnachman17@gmail.com**.

**One thing to know before you start:** partway through, Google will show you
a scary-looking warning that says it hasn't verified this app. **That warning
is normal and expected** — it appears for any script a person installs into
their own account — and there is one thing this project needs from you on
that screen (step 16) before you click through it.

---

## Part A — Jon's install, against the 2024 archive

### Create the spreadsheet

1. In your browser, go to **sheets.google.com** and make sure the account
   shown in the top-right corner is **jnachman17@gmail.com**.
2. Click the big **+ Blank spreadsheet** tile. A new empty spreadsheet opens.
3. Click **Untitled spreadsheet** in the top-left corner, type **Blotter**,
   and press Enter. Then click **File → Settings** and check that
   **Time zone** is set to where you actually live — Blotter counts "days
   waiting" by *your* midnight, and this setting is what tells it where
   midnight is. Click **Save settings**.

### Put the script inside it

4. In the menu bar of the spreadsheet, click **Extensions**, then
   **Apps Script**. A new browser tab opens with a code editor. Its title
   says **Untitled project**, and the middle of the screen shows a file
   called `Code.gs` containing a few lines starting with
   `function myFunction()`.
5. Click anywhere in that code, select all of it (**Cmd+A**), and delete it,
   so the file is empty.
6. Open the file `courier/Code.gs` from this project, select everything in
   it, copy it, and paste it into the empty editor. You should now see a
   long script whose first lines are a comment starting with
   `Blotter — the courier`.

### The read-only lock

This next part is what guarantees the script can only ever *read* your mail
and calendar — it asks Google for read-only permission and nothing more, so
even a bug could not send or delete anything.

7. On the left edge of the Apps Script screen, click the **gear icon**
   (⚙, "Project Settings").
8. Tick the checkbox that says **Show "appsscript.json" manifest file in
   editor**.
9. Click the **< > Editor** icon (top of that same left edge) to go back to
   the code. In the file list you now see two files: `appsscript.json` and
   `Code.gs`. Click **appsscript.json**.
10. Delete everything in it and paste in the entire contents of the file
    `courier/appsscript.json` from this project.
11. Press **Cmd+S** to save. While you are here, click **Untitled project**
    at the top, name the project **Blotter**, and click **Rename** — this
    name is what Google's permission screens will show you later.

### Authorize it — and the warning screen

12. Go back to the browser tab with your spreadsheet and **reload the page**
    (Cmd+R). Wait a few seconds. A new menu named **Blotter** appears in the
    menu bar, to the right of **Help**. (If it doesn't appear within ~10
    seconds, reload once more.)
13. Click **Blotter → Step 1: Set up this sheet.**
14. A small window appears saying **Authorization required**. Click
    **Review permissions** (it may say **OK** or **Continue**). A Google
    window opens saying **Choose an account** — click
    **jnachman17@gmail.com**.
15. **Now comes the warning.** You should see a screen headed something
    like:

    > **Google hasn't verified this app**
    >
    > The app is requesting access to sensitive info in your Google
    > Account. Until the developer (**your own email address**) verifies
    > this app with Google, you shouldn't use it.

    with a prominent **Back to safety** button and a small **Advanced**
    link.

    **Why this is fine:** read who the "developer" is — it is *you*. You
    pasted this script into your own account ten minutes ago, so Google is
    warning you about yourself. It shows this for every self-installed
    script. The warning changes nothing about what the script is allowed to
    do — that was fixed by the read-only permissions in step 10.

16. ### ⛔ STOP. Do this before you click anything on that screen.

    **Take a screenshot of the warning screen** (press
    **Cmd+Shift+3**; the picture lands on your Desktop). If anything more
    appears when you later click **Advanced**, screenshot that too.

    **Why this is the single most important step in this file:** every
    future student hits this exact screen, it is the likeliest moment for
    them to give up, and **nobody on this project has ever seen it** —
    every word we have written about it, including the quote above, comes
    from Google's documentation rather than a live screen. Your screenshot
    is the first real record, and the reassurance text every student reads
    will be corrected against it. Thirty seconds now; do not click past it.

17. Now click the small **Advanced** link (bottom-left of the warning).
    More text unfolds — "Continue only if you understand the risks and
    trust the developer" — followed by a link named
    **Go to Blotter (unsafe)**. Click that link. Do **not** click "Back to
    safety" — that cancels the install.
18. The final screen says **Blotter wants access to your Google Account**
    and lists what it may do, worded roughly as:
    - *View your email messages and settings* — read-only Gmail
    - *See and download any calendar you can access* — read-only Calendar
    - *See, edit, create, and delete only the specific Google Sheets files
      you use with this app* — this one spreadsheet, nothing else in Drive
    - *Connect to an external service* — talking to Blotter's server
    - *Allow this application to run when you are not present* — the timer

    Nothing in the list should mention *sending* email or *changing* your
    calendar. If it does, stop and don't click Allow — something went wrong
    at step 10. (On newer versions you may instead see **Select what
    Blotter can access** with checkboxes — tick them all.) Click **Allow**.
19. The windows close. **Click Blotter → Step 1: Set up this sheet once
    more** — Google sometimes swallows the click that triggered the
    permission flow. After a moment you'll see **Blotter is set up**, and
    three tabs at the bottom of the sheet: **Contacts**, **Found**,
    **Settings**.

### Tell it who you are

20. Open the **Settings** tab. Next to **Your email addresses**, type
    exactly:

    ```
    jnachman17@gmail.com, jnachman@utexas.edu
    ```

    Both addresses, because you recruited from both — even though this
    install can only read the gmail mailbox (more on that in step 24).
21. Check **Server URL** says `https://blotterib.com/api/engine`.

### Point it at 2024

22. Still in **Settings**, change **two** numbers from `365` to **`1100`**:

    - **Calendar looks back (days)**
    - **Mail looks back (days)**

    Your recruiting happened in early 2024, about 975 days ago. At 365 both
    windows stop short of it: the calendar would return nothing and every
    call column would come back empty, and the mail search would find no
    conversations at all — both looking exactly like a bug.

    **A real student never touches either setting.** They exist so this
    archive test can reach back to 2024. `Mail looks back` also has a second
    job in normal use, which is why it is set to a year and not to forever:
    it keeps ancient mail out of the search.

### Paste the season

23. Open the **Contacts** tab and click cell **A2** (the first cell under
    the `Name` header). Copy the entire block below and paste it — Sheets
    will fan it out into the Name, Title, Firm and Email columns by itself.
    These are the **58 real people** from your 2024 season, in the same order
    as the engine's answer key, row for row:

    ```
    Micah Poag		Houlihan Lokey	mpoag@hl.com
    Joseph Candelario		Piper Sandler (Simmons Energy)	joseph.candelario@psc.com
    Ryan Wheeler		Guggenheim	ryan.wheeler@guggenheimpartners.com
    Barbara Barman		Goldman Sachs	barman.barbara@gmail.com
    Olivia Henderson		Morgan Stanley	Olivialeigh31@gmail.com
    Anna Giesler		Rothschild & Co	Anna.e.giesler@gmail.com
    Quincy Steele		Morgan Stanley	steelequincy@gmail.com
    Alice Watts		Perella Weinberg Partners	alicewatts419@gmail.com
    Noble Nash		Intrepid	Noble.nash@me.com
    Victoria Daly		Goldman Sachs (London)	victoriad@utexas.edu
    Kathryn Dzierzanowski		Cain Brothers	kathryndzierzanowski@gmail.com
    Douglas Melsheimer		Barclays	douglas.melsheimer@barclays.com
    Kleopatra Kirkland		Barclays	kleopatra.kirkland@barclays.com
    Sam Susser		Goldman Sachs	same@susser.us
    Kate Borden		Houlihan Lokey	kate.borden@hl.com
    Samuel Ward		Houlihan Lokey	SPWard@hl.com
    Luke Skelly		Guggenheim	lukes5061@gmail.com
    Nicholas Perez		Guggenheim	nicholas.perez@guggenheimpartners.com
    Michael Liou		Guggenheim	Michael.liou@guggenheimpartners.com
    Joshua Gumm		FT Partners	joshua.gumm@ftpartners.com
    Mike Giaquinto		Leerink	mike.giaquinto@leerink.com
    Chris Miller		Citi	chris.miller@citi.com
    Turner Gauntt		Jefferies	tgauntt@jefferies.com
    Nick Gerstein		Citi	ngerstein99@gmail.com
    Grey Bianca		Mizuho	Grey.Bianca@mizuhogroup.com
    Carrie Cruces		Citi	carrie.cruces@citi.com
    Carson Harris		J.P. Morgan	carson.harris@jpmorgan.com
    Jessica (Jess) Luft		Bank of America	jessica.luft@bofa.com
    John Sellingsloh		Intrepid	sellingsloh@intrepidfp.com
    Keaton Cruzcosa		Piper Sandler	Keaton.cruzcosa@psc.com
    Gary Horton		Intrepid	horton@intrepidfp.com
    Will Robinson		Intrepid	Robinson@intrepidfp.com
    David Talbot		Raymond James	David.Talbot@raymondjames.com
    Grant Gillespie		Morgan Stanley	Grant.Gillespie@morganstanley.com
    Mathew (Mat) Young		Citi	mathew.young@citi.com
    Kevin Stephens		Houlihan Lokey	kstephens@hl.com
    Ethan Marnhout		FT Partners	ethan.marnhout@ftpartners.com
    Danny Shin		Houlihan Lokey	danny.shin@hl.com
    Matt Manriquez		Morgan Stanley	Matt.Manriquez@morganstanley.com
    Maura Vestal		Houlihan Lokey	Maura.Vestal@hl.com
    Lynell Velten		Houlihan Lokey	Lynell.Velten@hl.com
    Grace Steelman		Barclays	grace.steelman@barclays.com
    Jay Klein		Barclays	jay.klein@barclays.com
    Sean Kang		Stifel	sean.kang@stifel.com, kang.s@stifel.com, s.kang@stifel.com
    Kyle Gunnison		Raymond James	Kyle.Gunnison@raymondjames.com
    Kammeh Valliani		Jefferies	kvalliani@jefferies.com
    Sara Laracca		Houlihan Lokey	Sara.Laracca@hl.com
    Marijoy Bertolini		Aeris Partners	mjb@aerispartners.com, Marijoy.Bertolini@aerispartners.com, bm@aerispartners.com
    Paige Butters		Aeris Partners	pgb@aerispartners.com
    Lonnie Kauppila		Houlihan Lokey	Lonnie.Kauppila@hl.com
    Gayathri Ravi		Goldman Sachs	Gayathri.Ravi@gs.com
    Steve McLaughlin		FT Partners	steve.mclaughlin@ftpartners.com
    Elliot Calkins		Guggenheim Securities	Elliot.Calkins@guggenheimpartners.com
    Emily Saunders		Harris Williams	esaunders@harriswilliams.com
    Ben Dziedzic		RBC Capital Markets	ben.dziedzic@rbccm.com
    Bradley Cagle		FT Partners	Bradley.Cagle@ftpartners.com
    Sean Hussey		FT Partners	sean.hussey@ftpartners.com
    Owen Sherry		Houlihan Lokey	
    ```

    **One deliberate oddity, not a mistake: Owen Sherry has no email
    address.** His call exists only on your calendar, and finding him anyway
    is one of the things this test proves.

    **What is no longer here, and why.** Earlier versions of this guide also
    pasted nine rows that were firms rather than people — "Barclays -
    application status", "Bank of America - application", "Wells Fargo -
    application, video interview, first round, withdrawal" and six more.
    They are gone. You ruled that version one tracks **people, not firms or
    interviews**, and those rows carried no email address, so they would read
    `Not emailed` forever and never change. The answer key dropped them
    already; this guide had not caught up.

### Run it

24. Click **Blotter → Step 2: Run once now.** This first run reads two and
    a half years back through 58 people's conversations — expect it to take
    **a few minutes**, and let it finish. When it's done you'll see a
    summary with how long it took, and the Status, Days and call columns
    fill in. (You do **not** need "Start automatic updates" for this test —
    that is for students with live mail.)

    If instead you see **"Blotter could not update the sheet"**, the sheet
    is untouched by design. Read the reason, screenshot it, and send it
    back.

### Check it against the answer key

The engine's test fixtures already encode the right answer for all 58 rows
as of the end of your season. Three things to know before comparing:

- **The `Days` column will not match the key and that is correct.** The key
  froze the clock on April 30, 2024; your live run counts to *today*, so
  every Days value will be around 900. Ignore that column.
- **17 rows cannot match, and that is the two-mailbox gap, not a bug.**
  Their mail lived only in `jnachman@utexas.edu`, which this install cannot
  see: Danny Shin, Jess Luft, John Sellingsloh, Joshua Gumm, Kammeh
  Valliani, Keaton Cruzcosa, Kevin Stephens, Kyle Gunnison, Luke Skelly,
  Maura Vestal, Michael Liou, Mike Giaquinto, Nicholas Perez, Samuel Ward,
  Sean Kang and Turner Gauntt. Most will read `Not emailed`. (Gary Horton,
  Nick Gerstein and Will Robinson had mail in both accounts, so their numbers
  may run low.)
- **`Days` shows a dash** on any row reading `Not emailed`, and on any row
  you have ticked `Closed`. That is a clockless row saying so, not a blank
  cell waiting to be filled.

Now eyeball these specific rows — all from the gmail mailbox, so they
should match:

| Row | Should say |
|---|---|
| **Micah Poag** | Status `Sent`, Attempts `1`, Last contact `1/17/24` |
| **Joseph Candelario** | Status `Replied`, Attempts `0`, Last contact `1/22/24`, Last call `1/19/24` |
| **Ryan Wheeler** | Status `Sent`, Attempts `2`, Last contact `1/20/24` |
| **Owen Sherry** | Status `Call done`, Last call `2/2/24` — with no email address at all |
| **Sean Kang** | The key says `Bounced` — but his mail is utexas-only, so expect `Not emailed`. This row *is* the two-mailbox gap, visible |

### What to send back

- The **warning-screen screenshots** from step 16
- The three measurement rows from **Settings**: `Last run took`,
  `Last run fetched`, `Gmail calls last run` — these numbers decide whether
  the every-15-minutes pace fits inside Google's daily limits, and this run
  is the first real observation anyone has
- For the eyeball rows above: **match or no match**
- Any *other* gmail-mailbox row that looks wrong: the name, plus what the
  sheet says in Status / Attempts / Last contact / Last call. A mismatch
  there means a real bug in the engine or the courier — exactly what this
  test exists to catch
- Any error dialog, word for word (a screenshot is perfect)

---

## Part B — what a real student does (five steps)

Each student gets their own copy; the script travels with it, and they
authorize it against their own account. Blotter never sees their login.

**The order below matters.** Blotter refuses to run until it knows which
addresses are yours — it is how it tells "you wrote" from "they wrote" — so
filling Settings comes before the first run. Run it first and you get an error
dialog on your very first click, which looks like a broken install and is not.

1. Open the master Blotter sheet, click **File → Make a copy**, and send
   them the copy (or share a view-only master and have them copy it
   themselves).

   **Starting from nothing instead?** If there is no master sheet to copy —
   the very first install on a new account — do Part A steps **1 to 11** to
   create the sheet and put the script in it, then come back here. Skip Part
   A's steps 20 to 23 entirely: those set up Jon's 2024 archive test and will
   fill the sheet with somebody else's contacts and a two-and-a-half-year
   look-back.
2. In *their* copy, signed in as *them*: reload the page and wait for the
   **Blotter** menu to appear. Click **Blotter → Step 1: Set up this sheet.**
   (On a copied sheet the tabs already exist and this changes nothing — it is
   safe either way, and it is what builds them on a brand-new one.)

   This is where they hit the permission flow — the same one as Part A steps
   14–18, including the unverified-app warning. **Send them that section,
   especially "Why this is fine."**
3. They fill **Settings → Your email addresses** with every address they
   send from, and set **File → Settings → Time zone** to where they live —
   a copied sheet keeps the *master's* time zone, and "days waiting" turns
   over at midnight in whatever time zone this says.

   **They leave `Pretend today is` blank.** It says so on the row. It is a
   testing setting, and a date typed into it by accident makes every Status
   and every Days number on the sheet answer a day that is not today —
   wrong, but wrong in a way that looks completely normal.

   They leave the three look-back numbers alone. The defaults are right for
   somebody recruiting now; the large values in Part A exist only for the
   2024 archive test.
4. They add their contacts to the **Contacts** tab — a **Name** and an
   **Email** each, one per row.
5. **Blotter → Step 2: Run once now**, then
   **Blotter → Start automatic updates.**

### What the first run looks like, so nothing normal gets reported as a bug

- **Every row will say `Not emailed`, with a dash in `Days`.** That is correct
  for a contact you have not written to yet. The dash means "there is no clock
  here", not "Blotter has not run" — a blank cell would be the ambiguous one.
- **`Found` will probably be empty.** It only suggests people who appear in
  conversations that already involve one of your contacts, so it has nothing
  to work from until there is mail.
- **The run may take a few seconds and report 0 conversations.** A new account
  has no recruiting mail to read yet. Nothing is wrong.
- **Settings → Last successful run** filling in with a timestamp is the real
  proof it worked.

---

## Updating a sheet you already installed

**Use this when Blotter's script has changed and your sheet already works.**
You are replacing the script only. Nothing else moves.

**Before you start, one thing has to be true:** the new server has to be live
before you paste the new script, because the new script speaks a newer version
of the language the two halves share. Paste it first and every run fails
safely — it writes nothing and says so — until the server catches up. If you
are not sure the server is updated, do the paste last.

1. Open your **Blotter** spreadsheet.
2. Click **Extensions**, then **Apps Script**. The code editor opens in a new
   tab, showing your existing `Code.gs`.
3. Click anywhere in the code and press **Cmd+A** to select all of it, then
   **Delete**. The file is now empty. (Nothing is lost — this file is only
   ever a copy of the script, and the fresh copy replaces it.)
4. Open `courier/Code.gs` from this project, select everything, copy it, and
   paste it into the empty editor.
5. Press **Cmd+S**. The tab title stops showing a dot when it has saved.
6. Go back to your spreadsheet tab and **reload the page**. Wait for the
   **Blotter** menu to appear in the menu bar — it can take a few seconds.
7. Click **Blotter → Step 2: Run once now**, and wait for the summary box.

### What re-pasting does and does not do

| | |
|---|---|
| **Your sheet's data** | **Untouched.** Contacts, Found, Settings, your own columns — all of it stays exactly as it is |
| **Your Settings values** | **Kept.** Your email addresses, Server URL, both look-back windows — the script reads them from the sheet, it does not store them |
| **Re-authorising** | **Not needed**, as long as `appsscript.json` is unchanged. The permissions you granted are attached to the project, not to the code. If Google *does* ask again, it is because the permission list changed — read the screen and follow Part A steps 14–18 |
| **Automatic updates** | **Still on.** The 15-minute timer belongs to the project and survives the paste. You do not need to start it again |
| **What actually changes** | The next run recomputes and rewrites all six Blotter columns from scratch, which is what every run does anyway |

### How to know it worked

After step 7 you should see a summary box saying how many contact rows were
updated and how long it took. Then check the sheet:

- **Settings → Last successful run** shows a timestamp from the last minute
- **Contacts → Status** is filled in for every row that has an email address
- **Contacts → Days** shows a **dash** (—) rather than an empty cell on any
  row you have ticked `Closed`, and on any row reading `Not emailed`

If instead you get a box saying Blotter could not update the sheet, **read
the reason and send it back**. A failure before the write phase leaves the
sheet exactly as it was, and the message says which case you are in.

---

## The time machine — for testing only

**Settings → `Pretend today is (TESTING - leave blank)`.**

Normally this is blank and Blotter uses the real date. Put a date in it and
**Blotter works out every row as if that were today.**

That is the whole trick. It exists because most of what Blotter does is about
time passing — someone went quiet for two weeks, a call happened, an invite
was declined — and the only other way to test any of it is to wait two weeks.

**What it changes:** only what Blotter thinks today is. A thread you sent this
morning can be aged to a month old. A call you put on next Friday's calendar
becomes a call that already happened, so `Call done` and `Call cancelled`
appear straight away instead of after a week of waiting.

**What it does not change:** which mail and which calendar events Blotter goes
and fetches. Those still use the real date. So it ages what is there; it does
not conjure up mail that does not exist. **Sending the test emails is still
done by hand** — that part takes minutes, not days.

### Using it

1. Open the **Settings** tab.
2. In the cell next to **`Pretend today is (TESTING - leave blank)`**, type a
   date like `2026-09-05`. (`9/5/2026` works too.)
3. Click **Blotter → Step 2: Run once now**.
4. The summary box opens with a line in stars saying testing mode was on and
   which date it pretended. **Settings → Last run warnings** says the same
   thing, and stays there.
5. **When you are finished, delete what you typed** and run once more. The
   sheet goes back to the truth.

Two details worth knowing:

- **A date with no time means the end of that day.** So a call booked for 2pm
  on the date you typed has already happened. That is deliberate — it is what
  makes calls resolve instead of sitting on `Call scheduled` again. If you want
  a specific moment, type one: `2026-09-05 13:00`.
- **If Blotter cannot read what you typed, the run stops and says so**, and
  nothing is written. It will not quietly fall back to today, because a run
  that silently ignored your date would look exactly like one that worked.

---

## Two things Blotter already does that nobody has been told about

Both of these have worked since the first build. Neither was ever written
down, so nobody used them.

### If you send from more than one address, list them all

**Settings → Your email addresses takes a list, separated by commas.**

```
you@gmail.com, you@university.edu
```

This is what tells Blotter which messages are **from you**, which is how it
knows the difference between *you wrote last* and *they wrote last*. Get it
wrong and rows read backwards.

**The case this is really for** is the common one: your university address
forwards into Gmail, and when you reply you reply **as** the `.edu`. That is
one mailbox with two addresses on it, and listing both makes Blotter read
every one of those replies correctly.

**Where it stops, plainly.** Blotter reads **one mailbox** — the account this
sheet's script is signed in to. Several *send-as* addresses on that one
mailbox: fully handled, list them all. A genuinely **separate second Google
account**, with its own inbox: Blotter cannot see into it, and mail that
exists only there is invisible to it. Listing the address does not change
that; it only fixes how messages that *do* arrive are read.

### Add any columns of your own, anywhere you like

**It is your sheet.** Add a LinkedIn column, a Notes column, a "how we met"
column — put them at the front, at the back, or in between two of Blotter's.
Reorder what is there. Nothing breaks.

Blotter finds its columns by **reading the header row**, not by counting
positions, and it writes each of its own columns one at a time. It never
touches a cell in a column it does not own.

**The only rule: these nine headers must survive, spelled as they are.**

| Header | Who writes it |
|---|---|
| `Name` | You |
| `Email` | You |
| `Status` | Blotter, every run |
| `Days` | Blotter, every run |
| `Last contact` | Blotter, every run |
| `Attempts` | Blotter, every run |
| `Next call` | Blotter, every run |
| `Last call` | Blotter, every run |
| `Closed` | **You** — Blotter only reads it |

Rename one of those headers, or delete its column, and the run stops with a
message naming exactly which one is missing — it does not guess, and it does
not half-write the sheet.

**`Firm` is the one in-between case.** It is not required, and Blotter runs
fine without it. But it is what lets Blotter match a calendar event to a
person when the invite has no email address on it — the way it found Owen
Sherry, whose call is real and whose address appears nowhere in the mailbox.
Keep it.

Everything else on the sheet is yours.

Two small things worth knowing while you are in there:

- **`Closed` is the one control you have.** Tick it and the row keeps all its
  history but drops its clock, which shows as a dash in `Days`. Blotter never
  closes anything itself and never reopens what you closed.
- **Do not sort or delete rows while a run is in progress.** Blotter matches
  its answers to your rows by row number.

---

## Turning it off

**Blotter → Stop automatic updates** stops all runs. To remove its access
entirely: go to **myaccount.google.com → Security → Third-party apps &
services**, find **Blotter**, and remove it. The spreadsheet and everything
in it stays yours either way.
