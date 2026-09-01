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

22. Still in **Settings**: change **Calendar looks back (days)** from `365`
    to **`1100`**. Your recruiting calls happened in early 2024, which is
    about 975 days ago — at 365 the calendar would return nothing and every
    call column would come back empty, looking exactly like a bug. (A real
    student never touches this setting.)

### Paste the season

23. Open the **Contacts** tab and click cell **A2** (the first cell under
    the `Name` header). Copy the entire block below and paste it — Sheets
    will fan it out into the Name, Title, Firm and Email columns by itself.
    These are the real 67 people and processes from your 2024 season,
    matching the engine's answer key row for row:

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
    Piper Sandler - applicant tracking acknowledgement			
    David Talbot		Raymond James	David.Talbot@raymondjames.com
    Grant Gillespie		Morgan Stanley	Grant.Gillespie@morganstanley.com
    Mathew (Mat) Young		Citi	mathew.young@citi.com
    Kevin Stephens		Houlihan Lokey	kstephens@hl.com
    Ethan Marnhout		FT Partners	ethan.marnhout@ftpartners.com
    Danny Shin		Houlihan Lokey	danny.shin@hl.com
    Matt Manriquez		Morgan Stanley	Matt.Manriquez@morganstanley.com
    Maura Vestal		Houlihan Lokey	Maura.Vestal@hl.com
    Houlihan Lokey NY Restructuring - shared-mailbox recruiting process			
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
    FT Partners - application, interviews, super day, offer			
    Wells Fargo - application, video interview, first round, withdrawal			
    AGC Partners - cold application email			
    Bank of America - application			
    Barclays - application status			
    Emily Saunders		Harris Williams	esaunders@harriswilliams.com
    Ben Dziedzic		RBC Capital Markets	ben.dziedzic@rbccm.com
    Citi - application status inquiry (bounced)			
    Union Square Advisors - cold application email			
    Bradley Cagle		FT Partners	Bradley.Cagle@ftpartners.com
    Sean Hussey		FT Partners	sean.hussey@ftpartners.com
    Owen Sherry		Houlihan Lokey	
    ```

    Two of these are deliberate oddities, not mistakes: **Owen Sherry has
    no email address** (his call exists only on your calendar — finding him
    anyway is one of the things this test proves), and a handful of rows
    are firm processes rather than people.

### Run it

24. Click **Blotter → Step 2: Run once now.** This first run reads two and
    a half years back through 67 people's conversations — expect it to take
    **a few minutes**, and let it finish. When it's done you'll see a
    summary with how long it took, and the Status, Days and call columns
    fill in. (You do **not** need "Start automatic updates" for this test —
    that is for students with live mail.)

    If instead you see **"Blotter could not update the sheet"**, the sheet
    is untouched by design. Read the reason, screenshot it, and send it
    back.

### Check it against the answer key

The engine's test fixtures already encode the right answer for all 67 rows
as of the end of your season. Three things to know before comparing:

- **The `Days` column will not match the key and that is correct.** The key
  froze the clock on April 30, 2024; your live run counts to *today*, so
  every Days value will be around 900. Ignore that column.
- **17 rows cannot match, and that is the two-mailbox gap, not a bug.**
  Their mail lived only in `jnachman@utexas.edu`, which this install cannot
  see: Danny Shin, Jess Luft, John Sellingsloh, Joshua Gumm, Kammeh
  Valliani, Keaton Cruzcosa, Kevin Stephens, Kyle Gunnison, Luke Skelly,
  Maura Vestal, Michael Liou, Mike Giaquinto, Nicholas Perez, Samuel Ward,
  Sean Kang, Turner Gauntt, and the Houlihan Lokey shared-mailbox row. Most
  will read `Not emailed`. (Gary Horton, Nick Gerstein and Will Robinson
  had mail in both accounts, so their numbers may run low.)
- The firm-process rows ("… - application" etc.) should read `Not emailed`.

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

## Part B — what a real student does (four steps)

Each student gets their own copy; the script travels with it, and they
authorize it against their own account. Blotter never sees their login.

1. Open the master Blotter sheet, click **File → Make a copy**, and send
   them the copy (or share a view-only master and have them copy it
   themselves).
2. In *their* copy, signed in as *them*: reload the page, wait for the
   **Blotter** menu, and click **Blotter → Step 2: Run once now.** They'll
   hit the same permission flow as Part A steps 14–18, including the
   unverified-app warning — send them that section, especially "Why this
   is fine."
3. They fill **Settings → Your email addresses** with every address they
   send from, and set **File → Settings → Time zone** to where they live —
   a copied sheet keeps the *master's* time zone, and "days waiting" turns
   over at midnight in whatever time zone this says.
4. They add their contacts to the **Contacts** tab (a Name and an Email
   each), click **Blotter → Step 2: Run once now**, then
   **Blotter → Start automatic updates.**

---

## Turning it off

**Blotter → Stop automatic updates** stops all runs. To remove its access
entirely: go to **myaccount.google.com → Security → Third-party apps &
services**, find **Blotter**, and remove it. The spreadsheet and everything
in it stays yours either way.
