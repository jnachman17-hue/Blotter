# Installing Blotter — step by step

Written for someone who has never opened the Apps Script editor. That is the
point: if any step assumes something, the step is wrong — say so and it gets
fixed.

Time: about 20 minutes the first time. You need: a computer with a web
browser, signed in to the Google account whose email you recruit from.

**One thing to know before you start:** partway through, Google will show you
a scary-looking warning that says it hasn't verified this app. **That warning
is normal and expected** — it appears for any script a person installs into
their own account, and this guide walks you through it at Step 12. Nothing is
broken when you see it.

---

## Part A — build the sheet (you do this once)

### Create the spreadsheet

1. In your browser, go to **sheets.google.com** and make sure the account
   shown in the top-right corner is the one you recruit from.
2. Click the big **+ Blank spreadsheet** tile. A new empty spreadsheet opens.
3. Click **Untitled spreadsheet** in the top-left corner, type
   **Blotter**, and press Enter. Then click **File → Settings** and check
   that **Time zone** is set to where you actually live — Blotter counts
   "days waiting" by *your* midnight, and this setting is what tells it
   where midnight is. Click **Save settings**.

### Put the script inside it

4. In the menu bar of the spreadsheet, click **Extensions**, then
   **Apps Script**. A new browser tab opens with a code editor. Its title says
   **Untitled project**, and the middle of the screen shows a file called
   `Code.gs` containing a few lines that start with `function myFunction()`.
5. Click anywhere in that code, select all of it (**Cmd+A** on Mac, **Ctrl+A**
   on Windows), and delete it, so the file is empty.
6. Open the file `courier/Code.gs` from this project, select everything in it,
   copy it, and paste it into the empty editor. You should now see a long
   script whose first lines are a comment starting with `Blotter — the
   courier`.

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
11. Press **Cmd+S** (Mac) or **Ctrl+S** (Windows) to save. While you are
    here, click **Untitled project** at the top, name the project
    **Blotter**, and click **Rename** — this name is what Google's permission
    screens will show you later.

### Authorize it — and the scary screen

12. Go back to the browser tab with your spreadsheet and **reload the page**
    (Cmd+R / Ctrl+R). Wait a few seconds. A new menu named **Blotter**
    appears in the menu bar, to the right of **Help**. (If it doesn't appear
    within ~10 seconds, reload once more.)
13. Click **Blotter → Step 1: Set up this sheet.**
14. A small window appears saying **Authorization required** — "This project
    requires your permission to access your data." Click **Review
    permissions** (it may say **OK** or **Continue**).
15. A Google window opens saying **Choose an account**. Click the account you
    recruit from.
16. **Now comes the warning.** You should see a screen headed something like:

    > **Google hasn't verified this app**
    >
    > The app is requesting access to sensitive info in your Google Account.
    > Until the developer (**your own email address**) verifies this app with
    > Google, you shouldn't use it.

    with a prominent **Back to safety** button and a small **Advanced** link.

    **Why this is fine:** read the "developer" it is warning you about — it
    is *you*. You pasted this script into your own account two minutes ago,
    so Google is warning you about yourself. Google shows this for every
    self-installed script, because no company has put this script through
    Google's paid verification process. Nothing about the warning changes
    what the script is allowed to do — that is fixed by the read-only
    permissions from Step 10.

    **What to click:** click the small **Advanced** link (bottom-left of the
    warning). More text unfolds — "Continue only if you understand the risks
    and trust the developer" — followed by a link named
    **Go to Blotter (unsafe)**. Click that link. Do **not** click "Back to
    safety" — that cancels the install.

    *(While you are on this screen: please screenshot it or copy its exact
    wording. Nobody on this project has seen it live yet, and the notes file
    wants the real text word for word.)*

17. The final screen says **Blotter wants access to your Google Account** and
    lists what it may do. The list should be worded roughly as:
    - *View your email messages and settings* — read-only Gmail
    - *See and download any calendar you can access* — read-only Calendar
    - *See, edit, create, and delete only the specific Google Sheets files
      you use with this app* — this one spreadsheet, nothing else in Drive
    - *Connect to an external service* — talking to Blotter's server
    - *Allow this application to run when you are not present* — the
      every-15-minutes timer

    Nothing in the list should mention *sending* email or *changing* your
    calendar. If it does, stop and don't click Allow — something went wrong
    at Step 10.

    On newer versions of this screen you may instead see **Select what
    Blotter can access** with checkboxes — tick them all (or **Select all**).
    Click **Allow** (or **Continue**).

18. The windows close. **Click Blotter → Step 1: Set up this sheet once
    more** — Google sometimes swallows the click that triggered the
    permission flow. After a moment you'll see a message saying **Blotter is
    set up**, and three tabs at the bottom of the sheet: **Contacts**,
    **Found**, **Settings**.

### Tell it who you are

19. Open the **Settings** tab. Next to **Your email addresses**, type every
    address you send recruiting email from, separated by commas — for
    example: `jnachman17@gmail.com, jnachman@utexas.edu`. **Missing one is
    the single worst mistake possible** — Blotter would then see a banker
    "replying" to emails it never saw you send, and every status goes wrong.
20. Check **Server URL** says `https://blotterib.com/api/engine`. Leave it
    unless you're told otherwise.

### Add people and run it

21. Open the **Contacts** tab and add a few people you're actually emailing —
    at minimum a **Name** and their **Email**. Firm helps too. Leave the
    Status/Days/etc. columns alone; those are Blotter's to fill.
22. Click **Blotter → Step 2: Run once now.** The first run can take a minute
    or two — it is reading every conversation you've ever had with those
    people. When it finishes you'll see a summary, and the Status, Days, and
    Last contact columns fill in.

    **If instead you see "Blotter could not update the sheet":** read the
    reason. "Could not reach the Blotter server" or "answered with status
    404/500" means the server side isn't live yet — the sheet is untouched,
    and this install still worked; try again once the server ships.

23. When a run works, click **Blotter → Start automatic updates.** From then
    on it refreshes every 15 minutes, even with the sheet closed.

### How to know it's alive later

- **Settings → Last successful run** should never be much more than 15
  minutes old. If it goes stale, Blotter is failing quietly — and by design
  it touches nothing when it fails, so your data is exactly as it was.
- New names appear in the **Found** tab. Pick **Yes** in the Add? column to
  add someone to Contacts on the next run, **No** to never see them again.
  Don't delete rows marked **Ignored** — that row *is* the memory of your
  "no", and deleting it brings the suggestion back.
- Tick the **Closed** checkbox on a contact to end tracking for them.
  Blotter never closes anyone itself, and never reopens anyone you closed.

---

## Part B — what a pilot student does (after you've built the master)

Each student gets their own copy; the script travels with it, and they
authorize it against their own account. Blotter never sees their login.

1. Open the master Blotter sheet, click **File → Make a copy**, and send them
   the copy (or share a view-only master and have them copy it themselves).
2. In *their* copy, signed in as *them*: reload the page, wait for the
   **Blotter** menu, and click **Blotter → Step 2: Run once now.**
3. They'll hit the same permission flow as Steps 14–17 above, including the
   unverified-app warning — send them that section, especially "Why this is
   fine."
4. They fill **Settings → Your email addresses** with every address they send
   from, add their contacts, run once, then **Start automatic updates.**
5. **One trap:** a copied sheet keeps the *master's* time zone. They should
   click **File → Settings** and set **Time zone** to where they live —
   otherwise their "days waiting" counts turn over at someone else's
   midnight.

---

## Turning it off

**Blotter → Stop automatic updates** stops all runs. To remove its access
entirely: go to **myaccount.google.com → Security → Third-party apps &
services**, find **Blotter**, and remove it. The spreadsheet and everything
in it stays yours either way.
