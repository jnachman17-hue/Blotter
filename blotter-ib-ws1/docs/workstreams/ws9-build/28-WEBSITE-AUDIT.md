# The website, audited against the product that now exists

Date: September 3, 2026
Brief: `27-BRIEF-WEBSITE-AUDIT.md`
Status: **Stage one. An audit. Nothing on the site has been changed.**
Measured against: `04-ENGINE-RULES.md` **version 7**, `05-CONTRACT.md` **version
4**, `courier/appsscript.json`, `courier/INSTALL.md`, and the real consent
screens transcribed in `17-INSTALL-OBSERVED.md` §1.

---

## 0. The worst thing on the site, first

**The site tells a stranger that Blotter connects to Google through a
professional provider that Google has verified. The screen Google actually shows
them, thirty seconds later, says the opposite in bold.**

The claim is on the landing page as a footnote and twice in the privacy policy:

> "Blotter connects to Google through an established connection provider whose
> Google application has passed Google's CASA security assessment."
> — `web/lib/privacy-copy.ts:264`

> "...the connection to your Google account is handled by a specialist provider
> whose entire business is building and securing these integrations, whose
> Google application has passed Google's CASA security assessment, **and who is
> verified by Google for the permissions Blotter requests.**"
> — `web/app/privacy/page.tsx:546`

What the student sees, transcribed from a real install:

> ⚠ **Google hasn't verified this app**
> Until the developer (**jnachman170@gmail.com**) verifies this app with Google,
> you shouldn't use it.

**There is no provider. There is no CASA assessment. Nothing is verified by
Google.** There is an Apps Script that the student pastes into their own Google
account and authorises against themselves.

This matters more than every other error in this document put together, for
three reasons. It is on a **legal page**, where a reader is entitled to rely on
it. It is a **security claim**, which is the category a person actually checks.
And it is the sentence that **breaks at the exact moment trust is being asked
for** — a student who reads the policy, clicks through, and meets
`Google hasn't verified this app` has just been told the page lied to them, on
the one screen where they cannot ask anybody.

**And the true version is better.** Nobody's Gmail leaves their own Google
account. The server never receives the text of an email. There is no third party
to trust because there is no third party. That is a stronger story than the one
the sentence is telling, and unlike that one it survives being checked.

---

## 1. Every false claim, by file and line

Grouped by the thing that is wrong, because most of them are one error repeated
across many files. **Every path is relative to the repository root.**

### 1.1 `Next move` — the column, and the four instructions in it

**Blotter has no `Next move` column and never tells anyone what to do.**
`04-ENGINE-RULES.md` §4 opens: *"Blotter does not tell you when to act. It shows
what is true and how long it has been true. You decide."* §9 lists the six
columns it keeps: `Status`, `Days`, `Last contact`, `Attempts`, `Next call`,
`Last call`.

| File | Lines | What is there |
|---|---|---|
| `web/lib/sheet-data.ts` | 64 | `Next move` in `HERO_COLUMNS` |
| `web/lib/sheet-data.ts` | 79, 95, 108, 127, 147 | `Reply to Jamie`, `Attend coffee chat`, `Send thank-you`, `Bump thread`, the em dash |
| `web/lib/sheet-data.ts` | 209, 222, 235 | the same four in `SECTION_3_MOMENTS` |
| `web/lib/sheet-data.ts` | 322–326 | the same four in `TRACKER_CONTACTS` |
| `web/components/section-45/parts.tsx` | 91 | `Next move` in the ten-column tab |
| `web/components/section-45/sheet-phone.tsx` | 95, 311 | both phone column sets |
| `web/components/section-3/day-timeline.tsx` | 57 | retired from the page, still in the tree |
| `web/app/opengraph-image.tsx` | 88–91, 211 | **the share card** |
| `web/public/film/blotter-film-web-hero.html` | 647 | desktop hero film |
| `web/public/film/blotter-film-c-4x5.html` | 544 | mobile hero film |
| `web/public/film/blotter-film-a-4x5.html` | 842 | the funnel film |
| `web/components/sections/how-blotter-works.tsx` | 54–56 | *"...and next move current"* — **not rendered**, but exported neighbours are |

**What is true instead:** `Attempts` — how many times you have written since they
last wrote back — is the column that replaced it, and it is the more honest one.
It is a fact rather than an instruction.

### 1.2 `No reply`, and the five-day threshold under it

**`No reply` is not a status.** There are eight and this is not one
(`web/app/api/engine/types.ts:108–116`). **No day threshold exists anywhere in
the product**, and `04-ENGINE-RULES.md` §4 rules it out on evidence: real replies
came back at 6.8, 11, 13.2 and **21.6** days, and the 21.6-day one turned into
four interview rounds. §4's closing paragraph names both of these by name as
cut: *"At five days Blotter would have chased Jon about Marijoy Bertolini
sixteen days before she replied."*

| File | Lines | What is there |
|---|---|---|
| `web/components/sheet/status-chip.tsx` | 21, 40 | `No reply` is a first-class status with its own colour |
| `web/lib/sheet-data.ts` | 126, 206, 208, 288, 325 | the status, the cue, the trigger line |
| `web/lib/sheet-data.ts` | 365–378 | **`Follow-ups due`, count 11**, eleven rows reading `No reply, N days` |
| `web/app/opengraph-image.tsx` | 91 | the share card |
| `web/public/film/blotter-film-web-hero.html` | 52–54 | **the film's closing beat** |
| `web/public/film/blotter-film-c-4x5.html` | 49 | **the film's closing beat** |
| `web/public/film/blotter-film-a-4x5.html` | 738–743 | the Outstanding beat |
| `web/app/review/reddit-still/stills.ts` | 62 | the promotion still |

**This is not a cell to swap.** All three films are *built around* this beat —
each one ends on it, each one gives it the most screen time, and each one's own
notes call it "the differentiator". See §3.

### 1.3 `Call completed` is the wrong name for a real state

The status is **`Call done`** (`04-ENGINE-RULES.md` §4;
`web/app/api/engine/types.ts:114`). `Call completed` appears at
`web/components/sheet/status-chip.tsx:20,39`, `web/lib/sheet-data.ts:107,234,324`,
`web/app/opengraph-image.tsx:90` and in all three films.

Small, but worth doing at the same time as the rest — a student who reads
`Call completed` on the site and sees `Call done` in the sheet has found their
first inconsistency before they have found anything else.

### 1.4 The five statuses on the site against the eight in the product

| The site shows | Reality |
|---|---|
| `Replied` | real |
| `Call scheduled` | real |
| `Sent` | real |
| `Call completed` | wrong name for `Call done` |
| `No reply` | **does not exist** |
| — | `Not emailed` — **absent from the site** |
| — | `Bounced` — **absent from the site** |
| — | `Call cancelled` — **absent from the site** |
| — | `Closed` — **absent from the site** |

`Bounced` is the one worth noting. It is the most concretely useful thing
Blotter computes — three dead Stifel addresses in the real season — and the site
never mentions that Blotter tells you an address is dead.

### 1.5 The privacy mechanism — four steps of sender-matching

**Blotter does not match senders.** `04-ENGINE-RULES.md` §2: *"Every message in
any conversation that already contains one of your contacts. Nothing else."* The
sender-matching rule was the original design and **it was wrong: it missed 29% of
real incoming mail** — assistants replying for their banker, colleagues cc'd in,
shared recruiting mailboxes, capitalisation differences. §2 names
`web/lib/privacy-copy.ts` explicitly and says the engine supersedes it.

| File | Lines | What is there |
|---|---|---|
| `web/lib/privacy-copy.ts` | 42–43 | `CANDID_CLAIM` — *"It checks who a message is from and only reads messages from contacts stored in your recruiting tracker"* |
| `web/lib/privacy-copy.ts` | 54–75 | the four steps: `Blotter checks the sender`, `Unmatched messages stop there`, `Matched recruiting messages are processed`, `Blotter keeps facts, not full messages` |
| `web/lib/privacy-copy.ts` | 95–98 | Gmail `Can do` rows, both sender-based |
| `web/lib/privacy-copy.ts` | 158–159 | `BROAD_BODY` |
| `web/lib/privacy-copy.ts` | 294, 298 | privacy FAQ answers 1 and 2 |
| `web/app/privacy/page.tsx` | 422–436 | article 06, the four steps in prose |
| rendered at | `web/components/sections/data-and-privacy.tsx:106`, `web/components/section-6/parts.tsx:90` | |

**Two of the four steps are wrong in the student's favour and nobody has said
so:**

- Step 03 says Blotter *"reads the message to identify the recruiting facts."*
  **The server never receives the message.** Contract version 4 removed `body`
  from the wire and `validate.ts` **rejects** a request that carries one
  (`web/app/api/engine/types.ts:64–75`).
- Step 04 says Blotter *"stores the structured recruiting information it needs."*
  **The server stores nothing at all.** No database, no logging, no file writes
  (`web/app/api/engine/route.ts:16–19`). The structured facts live in the
  student's own spreadsheet, in their own Drive.

### 1.6 The connection provider and CASA

Covered in §0. Every location, for completeness:

| File | Lines |
|---|---|
| `web/lib/privacy-copy.ts` | 261–266 (`PROVIDER_HEADING`, `PROVIDER_BODY`) |
| `web/lib/privacy-copy.ts` | 317–319 (privacy FAQ 7) |
| `web/components/sections/data-and-privacy.tsx` | 55, 135, 145 (desktop footnote and mobile fine print) |
| `web/app/privacy/page.tsx` | 483–501 (article 10, the whole article) |
| `web/app/privacy/page.tsx` | 546–554 (article 12, and this is the worst sentence) |

**Every clause of it is false.** No provider exists; no CASA assessment applies to
anything; nothing is verified by Google; and there is no third party facilitating
the connection, because there is no connection — the script runs inside the
student's account and calls one HTTPS endpoint that receives no email text.

### 1.7 The Google scopes — the page's most checkable claim does not survive being checked

`web/app/privacy/page.tsx:115–132` prints three scopes with *"the wording Google
shows for each on its consent screen"*, and the page's own comment calls this
*"the page's most checkable claim: a reader can hold it up against the screen
Google actually shows them."*

**Held up against the real screen, it fails on four of five rows.**

| The page says | `courier/appsscript.json` actually requests | Google actually shows (`17-INSTALL-OBSERVED.md` §1) |
|---|---|---|
| Gmail `gmail.readonly` — *"View your email messages and settings."* | `gmail.readonly` ✅ | *"View your email messages and settings"* ✅ |
| Calendar `calendar.events.readonly` — *"View events on all your calendars."* | **`calendar.readonly`** ❌ | *"See and download any calendar that you can access"* ❌ |
| Sheets `drive.file` — *"See, edit, create, and delete only the specific Google Drive files you use with this app."* | **`spreadsheets.currentonly`** ❌ | *"View and manage spreadsheets that this application has been installed in"* ❌ |
| — | **`script.external_request`** — not on the page at all | *"Connect to an external service"* ❌ |
| — | **`script.scriptapp`** — not on the page at all | *"Allow this application to run when you are not present"* ❌ |

**The student sees five checkboxes and the page lists three.** That is the exact
screen where `17-INSTALL-OBSERVED.md` §1 says a cautious student ticking two out
of five *"gets a product that fails in ways they cannot diagnose."*

Also false, and in the same direction:

- `web/lib/privacy-copy.ts:146–147` — `SHEETS_SCOPE_NOTE`:
  *"Granted through Google Drive, limited to the one file you connect."* **It is
  not a Drive scope and there is no file to connect.** `spreadsheets.currentonly`
  reaches the one sheet the script lives in and nothing else — which is
  *narrower* than what the sentence claims, and enforced by Google rather than
  promised by Blotter.
- `web/app/privacy/page.tsx:404–411` — the paragraph explaining `drive.file`.

### 1.8 The preservation promise — "keep the sheet you already built"

**This is the second-worst thing on the site, and it is not in the brief's
known-false table.**

The site's second section is built on it, the FAQ opens with it, the price screen
sells it, and the closing line repeats it:

| File | Lines | What is there |
|---|---|---|
| `web/lib/sheet-data.ts` | 394–398 | `Keep the tracker you already built` · `Don't re-enter every contact` · `Don't leave Google Sheets` |
| `web/components/sections/tracker-and-actions.tsx` | 43–45 | `You already have a tracker. Keep it.` |
| `web/components/sections/ownership.tsx` | 105–106 | *"Blotter creates a clean view in a new tab..."* |
| `web/lib/hero-copy.ts` | 43 | *"Blotter keeps the Google Sheet you already use current."* |
| `web/components/sections/hero.tsx` | 213–215 | *"Blotter updates the Google Sheet you already use..."* |
| `web/lib/closing-copy.ts` | 30 | FAQ 1: *"No. Keep the Google Sheet and contacts you already built."* |
| `web/lib/closing-copy.ts` | 112 | *"Keep your existing Google Sheet."* |
| `web/lib/funnel-copy.ts` | 91 | price screen: *"Keep your existing Google Sheet"* |
| `web/lib/funnel-copy.ts` | 109 | *"Nothing to install. You connect the Google account you recruit from, and Blotter works inside the Sheet you already use."* |
| `web/lib/funnel-copy.ts` | 133 | checkout: *"Connects your Google account and keeps your existing recruiting Sheet current"* |

**What actually happens** (`courier/INSTALL.md` Part B):

1. The student opens **Blotter's** master sheet and clicks `File → Make a copy`.
2. In their copy, they run `Step 1: Set up this sheet`.
3. They fill in Settings and set their time zone.
4. **"They add their contacts to the Contacts tab — a Name and an Email each,
   one per row."**
5. `Step 2: Run once now`, then `Start automatic updates`.

**They get Blotter's sheet and they type their contacts into it.** The scope
makes this structural rather than a choice: `spreadsheets.currentonly` means the
script can only ever reach the sheet it lives in, so it **cannot** attach itself
to a spreadsheet the student already has. The `Handover` menu item confirms the
model — it empties `Contacts` and `Found` in place and tells you to
`File → Make a copy`, because the script cannot create a file either.

**Which of the three reassurance claims survive:**

| Claim | Verdict |
|---|---|
| `Don't leave Google Sheets` | **True.** Still the best thing about the product |
| `Don't re-enter every contact` | **False as written.** They can paste a block rather than type it — Part A pastes 58 rows in one go — but they are moving their data into a new file |
| `Keep the tracker you already built` | **False.** They keep their *columns*, anywhere they like, and `Start here` says so: *"Add any columns you like on the left — LinkedIn, Notes, where you met, anything. Blotter finds its own columns by their headings, not by position."* They do not keep their file |

**There is a technically possible path where it is true** — Part A steps 4 to 11
paste the script and the manifest into a spreadsheet the student already owns.
It is eight steps in the Apps Script editor including editing a JSON manifest,
it is not what Part B describes, it is not what the setup page in §5 describes,
and it is not something to put in front of a nineteen-year-old.

**So this needs Jon's ruling and it is the ruling with the largest blast
radius.** The honest version of the claim is narrower and still good: *your
columns come with you, and you stay in Google Sheets.*

### 1.9 The tabs, and the tab that is missing

`web/components/section-45/parts.tsx:138–139` draws a three-tab strip:
`Contacts` · **`Blotter`** · **`Outstanding`**.

**The real sheet has four tabs and none of them is `Blotter` or `Outstanding`:**
`Start here` · `Contacts` · `Found` · `Settings`.

- There is **no `Blotter` tab**. `Contacts` *is* the maintained view — the
  ownership split runs left-to-right across one tab, which is what the banner row
  labels.
- There is **no `Outstanding` tab**. See §1.10.
- **`Found` appears nowhere on the website.** This is the biggest thing the site
  omits rather than gets wrong. `04-ENGINE-RULES.md` §8: *"108 of 325 messages
  carry introduction or referral language. Chris Miller alone produced nine
  contacts."* Referrals are the actual mechanic of recruiting, `Found` is how
  Blotter handles them, and the site has never mentioned it.
- **`Start here` appears nowhere either**, which matters for the setup page —
  it is where the setup page hands off to.

### 1.10 The Outstanding view — the whole of Section 03

`web/lib/sheet-data.ts:352–391` and
`web/components/sections/tracker-and-actions.tsx:47–49, 132–137` render a
21-action view in three groups: `Replies owed` 6, `Follow-ups due` 11,
`Thank-you notes` 4.

**None of it exists.** There is no Outstanding tab, no grouping, no counts, and
`Follow-ups due` depends on the day threshold that §1.2 rules out. Nineteen of
the twenty-one names are invented people.

The nearest real thing is `Blotter → Sort contacts`, which reorders the Contacts
tab three ways — by what each contact is waiting on, by title, or by firm. That
is a genuine feature the site does not mention.

`Thank-you notes` has a real mechanism behind it and a better story:
`04-ENGINE-RULES.md` §4 — **`Call done` means "you owe a thank-you", and it
clears itself the moment you send one**, because you become the last person who
spoke. No column, no list, no nagging. Jon sent 19 thank-you notes in the real
season and it is *"the most reliably detectable behaviour in the entire corpus."*

### 1.11 The `LinkedIn` column

`web/components/section-45/parts.tsx:87` and `sheet-phone.tsx` draw a `LinkedIn`
column in the "you add these" zone. Harmless — a student may add exactly this —
but it is drawn as though it ships. `05-SECTION-5` fixes it, so it is a spec
question rather than a defect. Flagged for completeness.

### 1.12 Section 01's figures, and the JPMorgan offer

`web/components/section-2/scale-trajectory.tsx:42–43`:

> "* Representative workload from a high-intensity Summer Analyst 2027
> recruiting cycle that resulted in a **JPMorgan offer**."

**`04-ENGINE-RULES.md` §1 says the firm Jon actually joined was Financial
Technology Partners**, and `03-LEARN-FINDINGS.md:320` says the tracker
*"stops before FT Partners, the firm he joined, ever appears in it."*

The figures beside it — **628** recruiting emails, **68** coffee chats, **30**
interview rounds, **19** applications
(`web/components/section-2/scale-trajectory.tsx:65–107`) — sit against a corpus
of **325 messages, 35 calendar events and 67 contacts**, of which seven events
are firm events and four are the FT Partners interview rounds.

**I am not calling this false.** The word is "representative", the cycle named is
Summer Analyst 2027 rather than the 2024 season, and Jon knows what he recruited
for and I do not. **But the JPMorgan sentence is a specific factual claim about a
real outcome that this repository's own record contradicts, on the page's most
prominent proof block, under a hero line that says the site was built by someone
who went through it.** It needs Jon to say which is true, and it is the kind of
detail this audience checks.

### 1.13 Availability — `Fall 2026` has arrived

| File | Line | What is there |
|---|---|---|
| `web/lib/funnel-copy.ts` | 87 | *"Blotter opens Fall 2026. Billing starts when your access does."* |
| `web/lib/funnel-copy.ts` | 147 | *"$9.99 / month, from Fall 2026"* |
| `web/lib/funnel-copy.ts` | 186, 200 | *"a limited first cohort of approximately 300 people in Fall 2026"* |

**Today is September 3, 2026.** `04-ENGINE-RULES.md` §12 records this as
*"unmeetable on any path"*; the state of play is more optimistic than that, since
the engine is live and the courier installs. Either way **the page speaks of a
date that is now the present**, and a visitor who joins the waitlist this week is
being told to expect access during a season that has started.

Needs a ruling, not a rewrite: either the date moves, or it stops being a date.

### 1.14 The account that does not exist

The policy and the commitments describe a SaaS account with a connection to
revoke. There is neither.

| File | Line | What is there | What is true |
|---|---|---|---|
| `web/lib/privacy-copy.ts` | 214 | *"You can disconnect your accounts at any time"* | You revoke your **own script's** access in your own Google security settings |
| `web/lib/privacy-copy.ts` | 215 | *"Deleting your account permanently deletes your Blotter data"* | There is no account and no Blotter-held data to delete |
| `web/lib/privacy-copy.ts` | 232 | `DELETION_STATEMENT`, same shape | as above |
| `web/app/privacy/page.tsx` | 349–351 | *"the email address you sign up with, and the information needed to maintain your account and subscription"* | The only address held is the one from the funnel form |
| `web/app/privacy/page.tsx` | 467–471 | *"We keep this information for as long as your account exists"* | The server keeps **none of it, ever** |

Every one of these is false in the student's favour and the true version is
shorter.

### 1.15 The one live collection the policy does not disclose

`POST /api/telemetry` exists and is deployed. It stores install id, contract
version, courier version, timestamp, contacts count, run seconds and ok/failed,
in Supabase (`22-DISTRIBUTION-NOTES.md` §2). **Nothing is stored today only
because the table does not exist yet** — the live endpoint answers
`{"counted":false,"reason":"insert_failed"}`, so the credentials are already
there and the table is the only missing piece.

`web/app/privacy/page.tsx` article 03 — *"What happens today"* — lists three
things and this is not one of them. **The file's own standing rule, at line 34,
is: *"If what is collected changes, article 03 changes first."*** It must gain
a paragraph **before** Jon creates that table, not after.

The good news is that the paragraph is easy and reassuring: the id identifies a
sheet rather than a person, it is a random UUID derived from nothing about the
student, an allow-list drops any unexpected field, and a self-test asserts the
payload contains no `@`, `name`, `subject`, `body`, `firm` or `email` anywhere.

### 1.16 Smaller ones, recorded so they are not rediscovered

- `web/components/sections/how-blotter-works.tsx` is **rendered nowhere** but
  still exports `SECTION_3_HEADLINE`, which *is* live as section 02's deck. Its
  own `SUPPORTING` string at line 54 carries `next move`. **A landmine**: the
  file looks live, and reviving it would put a cut claim straight back on the
  page.
- `web/components/section-3/day-timeline.tsx:57` and
  `web/components/section-2/gmail-inbox-strip.tsx` are retained-but-unrendered
  in the same way.
- `web/lib/privacy-copy.ts:116` — Google Sheets `Cannot do`: *"Promise to
  preserve every arbitrary custom tracker layout exactly."* Not false, but it is
  a hedge written for a product that was going to touch the student's own file.
  With `spreadsheets.currentonly` the honest line is the opposite: Blotter finds
  its own columns by their headings, so yours can sit anywhere.
- `web/lib/privacy-copy.ts:104` — the Calendar `Can do` row describes
  `calendar.events.readonly`; the real scope is `calendar.readonly`, which is
  slightly broader. On a disclosure page, state the one that is granted.
- `web/lib/supabase-admin.ts` carries a stale comment naming one consumer where
  there are now three. Recorded in `22-DISTRIBUTION-NOTES.md` §5.1 as outside
  that chat's boundary; it is inside mine, and it is a one-line fix whenever the
  site is next touched.

### 1.17 What the site gets right and should not lose

Worth listing, because the temptation in a rewrite is to touch everything.

- **`You handle the people. Blotter handles the updating.`**
  (`how-blotter-works.tsx:49`) — this is exactly what the product does, and it
  is the best sentence on the site.
- **The ownership split** — manual zone left, maintained zone right — is the
  right idea, the right picture, and it is now built in the real sheet in the
  site's own colours (`20-UI-BUILD-NOTES.md` §2).
- **`Recruiting truly sucks. You will lose track.`** and the closing answer
  **`Recruiting will still suck. You just won't lose anyone.`**
- **The refusals** — no mass outreach, no technicals, no AI slop. All still true,
  and the engine has made them *more* true.
- **`Does Blotter write emails or help with technical preparation?` → `No.`**
  (`closing-copy.ts:37–39`) — accurate, and the FAQ's three jokes are fine.
- **Section 01's trajectory diagram** contains no product claim at all, only
  figures. It survives whatever happens to the figures.

---

## 2. Every claim that is now stronger, and could be said plainly

**The privacy story got much better and nobody has been told.** Each of these is
checkable — that is the whole point of them.

| The claim | Where it is provable |
|---|---|
| **Blotter's server never receives the text of an email.** Not "does not retain" — never receives | `web/app/api/engine/types.ts:64–75`. `validate.ts` **rejects** a request carrying `body` before anything else runs. A field silently dropped is a promise; a field refused is a guarantee |
| **The server stores nothing.** No database, no logging, no file writes | `web/app/api/engine/route.ts:16–19`; the grep is recorded in `22-DISTRIBUTION-NOTES.md` §2 |
| **The script runs inside the student's own Google account. Blotter never holds a Google token and never sees their login** | `courier/INSTALL.md` Part B: *"Each student gets their own copy; the script travels with it, and they authorize it against their own account."* |
| **It can reach the one sheet it lives in, and no other file in your Drive** | `spreadsheets.currentonly` in `courier/appsscript.json`. Enforced by Google, not promised by Blotter |
| **It cannot send, reply, delete or create an event.** Not policy — permission | `gmail.readonly`, `calendar.readonly`. `INSTALL.md` step 18: *"Nothing in the list should mention sending email or changing your calendar. If it does, stop."* |
| **Blotter never reads an email's text looking for people. Headers only** | `04-ENGINE-RULES.md` §8, ruled September 2 |
| **Nothing is ever added to your sheet without you approving it** | §8. Automatic adding would have dropped three assistants and coordinators into the real season's sheet |
| **It reads whole conversations, so an assistant answering for a banker still moves that banker's row** | §2, §3. Liz Ream really did answer for Steve McLaughlin. Sender-matching missed **29%** of real incoming mail |
| **An auto-reply is not a reply. A calendar acceptance is not a reply** | §6. One real out-of-office arrived **20 seconds** after Jon's email; a naive rule calls that `Replied` |
| **Blotter never tells you when to follow up** | §4, and it is the anti-slop position the header already takes. *"It shows what is true and how long it has been true. You decide"* |
| **And the reason is evidence, not modesty** | §4: real replies at 6.8, 11, 13.2 and **21.6** days — and the 21.6-day one became four interview rounds |
| **`Call done` means you owe a thank-you, and it clears itself when you send one** | §4. No list, no reminder, no nagging |
| **Blotter tells you when an email address is dead** | `Bounced`. Three real Stifel addresses in the 2024 season |
| **Grounded in a real recruiting season** | 67 contacts, 325 messages, 35 calendar events, January to April |
| **The developer Google names on the warning screen is you** | `17-INSTALL-OBSERVED.md` §1. The most reassuring fact available about the scariest screen |
| **Your own columns can sit anywhere, and Blotter will not touch them** | `Start here`: *"Blotter finds its own columns by their headings, not by position"* |

**Two of these replace claims the site currently makes in the opposite
direction** — the retention promise (§1.14) and the third-party provider (§1.6) —
so fixing the false ones and saying the strong ones is one edit, not two.

**One honest limit belongs beside them**, because it is the first thing a
careful reader will ask: `gmail.readonly` is a broad permission and Google
describes it broadly, because Google offers nothing narrower. What makes the
boundary real here is not a promise about processing — it is that **the reading
happens inside the student's own account and the results never leave it**. That
is a better answer than the one `BROAD_BODY` currently gives, and it is the same
question.

---

## 3. The visual inventory

**Nothing has been re-shot and nothing should be until Jon supplies
screenshots.** This is what would need to be, and what does not.

### 3.1 Survives untouched

| Asset | Why |
|---|---|
| **The brand** — lockup, mark, navy, the Blotter yellow | Nothing about the product touches it |
| **Section 01's trajectory diagram** (`section-2/scale-trajectory.tsx`) | Contains no product surface. Its **figures** need a ruling (§1.12); the drawing does not |
| **The Google Sheets chrome** — grid, tab strip, frozen header, column letters, row numbers, Arial | The real thing is a Google Sheet, and `20-UI-BUILD-NOTES.md` §1 records that the courier was built to match *this asset* rather than the other way round |
| **The two zone colours** | `20-UI-BUILD-NOTES.md` §2: the courier's `THEME='zoned'` uses the site's own ratified values — manual header `#edf2f8`, maintained header `#f7f2e8`, manual fill `#f7f9fc`, maintained fill `#fdfaf2`. **A screenshot of the real sheet will match the site's mock on colour exactly** |
| **The banner row** — `You add these` / `Blotter keeps these current` | Built and working (`20-UI-BUILD-NOTES.md` §6.2 flagged it; two commits since record it landing). The most faithful device in the design is now real |
| **The zone divider** | Built, 3px `#d9b64a` |
| **`hero-reference-v1.png`** | Rendered only on `/review/sheet`, which is internal |

### 3.2 Needs re-shooting, and cannot be patched

**All three films.** Each one's *closing beat* — the one its own notes call the
differentiator, the one that gets the most screen time — is
`No reply for 5 days` → `Bump thread`. That beat is the thing the engine most
deliberately refuses to do.

| Asset | Where it plays | What breaks |
|---|---|---|
| `blotter-film-web-hero.html` | **the desktop hero** | Silence beat 7.14–11.50s is the whole film's payoff. Also `Next move` column, `Call completed` |
| `blotter-film-c-4x5.html` | **the mobile hero** | Silence beat 5.72–9.56s, same. Also `Next move`, `Call completed` |
| `blotter-film-a-4x5.html` | **inside the funnel** | Silence beat 10.6–13.4s, plus the Outstanding beat at 13.4–15.5s (21 / 6 / 11 / 4), which does not exist |
| `app/opengraph-image.tsx` | **the share card** | `Next move` header, `No reply`, `Call completed`. This is the image every link preview shows |
| `section-45/parts.tsx` `BlotterTab` | Section 02, desktop | Wrong tab names, `Next move`, `Call completed`, `No reply`, `LinkedIn` |
| `section-45/parts.tsx` `OutstandingTab` | Section 03, desktop | The entire view does not exist |
| `section-45/outstanding-phone.tsx` | Section 03, phone | Same |
| `section-45/sheet-phone.tsx` | Section 02, phone | Same as `BlotterTab` |
| `section-3/day-timeline.tsx` | retired, in tree | Same |
| `app/review/reddit-still/stills.ts` | promotion stills | Built on the `No reply` cue |

**A note on sequencing.** A film is expensive and the sheet has never been seen
by anyone outside this project. **Screenshots first, films second.** If a
screenshot of the real `Contacts` tab turns out to carry the argument on its own
— and it may, now that the banner row and the zone colours are built — the films
can be rebuilt once against a picture of something real, rather than twice.

### 3.3 What a screenshot can now show that no drawing ever could

This is the part of §4 of the brief worth acting on. Each of these is a real
surface with no equivalent anywhere on the site:

- **`Found`** with a real suggestion and the `Yes` / `No` dropdown open. The
  referral mechanic, which the site has never depicted.
- **`Start here`** with its live status legend drawn in the sheet's real colours.
  It is the product explaining itself, which is a strong thing to show a
  stranger.
- **The notice row**, frozen at the top of `Contacts`.
- **`Settings`**, showing `Last successful run` and the install id.
- **A real `Bounced` row**, which is the single most concretely useful thing
  Blotter computes.
- **A real dash**, where `Days` and `Attempts` decline to print a number. That is
  D24, it is the product's whole personality in one cell, and it cannot be drawn
  convincingly — it has to be photographed.

### 3.4 One thing that cannot be shot, and Jon has to decide about

**The status chips on the site are dropdown pills. The real sheet has tinted
cells.** `20-UI-BUILD-NOTES.md` §6.1: dropdown chip colour is UI-only, it is
absent from the Sheets API and from Apps Script, and **`setupSheet` can never
produce it.** So the site's most recognisable visual is the one thing a
screenshot will not match. That ruling is already open in §6.1 and this audit
does not reopen it — it only records that the website is the reason it matters.

---

## 4. The setup page — structure and copy, not built

**Route:** `/setup`. Header link: `Set up`. Not a modal — a student mid-install
needs a URL they can come back to on their phone.

### 4.1 The decision that has to come first

The brief says *"CTA becomes `Set up now`, and a header link leads to a page."*
`Set up now` and the header link may be two different things, and it matters:

**Today all four CTAs open the funnel** — track, window, email capture, price,
waitlist. That funnel is the demand test, `cta_location` is the only placement
evidence the project has, and `cta-button.tsx:49–54` records that one label at
every placement is *"a measurement rule rather than a taste one."*

| Option | What it costs |
|---|---|
| **A — CTA label changes and still opens the funnel; the header link goes to `/setup`** | Cheapest. But `Set up now` on a button that asks for your email and then prices you is a promise the funnel does not keep — the same fault that forced `See how Blotter works` out |
| **B — CTA becomes `Set up now` and goes to `/setup`; the funnel is retired** | Honest, and it is what the brief literally says. **It ends the price test**, which is the only thing the site has ever measured |
| **C — CTA stays `Fix my tracker` into the funnel; a second, quieter header link reads `Set up`** | Keeps the measurement, gives real students a door. Two doors on one page, which the page has avoided so far |

**My recommendation is B, and it is Jon's call.** The product is built and
installable; a page that still routes every visitor into a pre-order for
something they could be using in five minutes is measuring the wrong thing now.
If the price signal still matters, it belongs *after* the install, not instead of
it.

### 4.2 The structure

**Open — two sentences, then the door**

> Blotter is a Google Sheet with a script inside it. You make your own copy,
> let it read your Gmail, and add the people you're networking with.
>
> About five minutes. You'll need a Google account you actually recruit from.

Then the template link, and nothing else above it. **The link carries a tracking
parameter** — `24-PRE-LAUNCH-READINESS.md` §6 records that telemetry fires on
the first *run*, so a student who copies and never finishes is invisible today,
and that is precisely the drop-off worth measuring.

**Step 1 — Make your own copy**

`File → Make a copy`. One screenshot. One line about why: the copy is yours, it
lives in your Drive, and the script comes with it.

**Step 2 — Open the Blotter menu**

Reload the page, wait for the `Blotter` menu to appear beside `Help`, click
`Blotter → Step 1: Set up this sheet`. One screenshot of the menu open.
One line: *"If it isn't there after ten seconds, reload once more."*

**Step 3 — The warning screen. This is the one that matters.**

`24-PRE-LAUNCH-READINESS.md` §2 calls it *"the single biggest place a student
gives up"*, and `17-INSTALL-OBSERVED.md` §1 has it transcribed from a real
install. Show the screenshot **before** the words, quote it verbatim, then say
the reassuring thing that no guide has ever said:

> **You're about to see a screen that says Google hasn't verified this app.**
>
> ⚠ Google hasn't verified this app
> The app is requesting access to sensitive info in your Google Account. Until
> the developer (**your own email address**) verifies this app with Google, you
> shouldn't use it.
>
> **Read the developer's name. It's yours.**
>
> You just made your own copy of this sheet, so the script is now in your
> account, and Google is warning you about yourself. It shows this for every
> script anybody installs into their own account. It does not change what the
> script is allowed to do — that is fixed by the permissions on the next screen,
> and every one of them is read-only.

Then, plainly, because the buttons are designed against you:

> `BACK TO SAFETY` is the big blue button and it **cancels the install**.
> `Advanced` is the small underlined link on the far left. Click that, then
> `Go to Blotter (unsafe)`.

**Step 4 — The permissions screen. Click `Select all`.**

`17-INSTALL-OBSERVED.md` §1: five checkboxes, **every one unchecked by default**,
`Select all` sits above them, and **nothing on that screen says all five are
required.** The table is already written and should be reproduced almost as-is,
because "what breaks without it" is the only framing that stops a cautious
student ticking two:

| What Google asks for | What breaks without it |
|---|---|
| View your email messages and settings | Everything. No mail, no statuses |
| View and manage spreadsheets that this application has been installed in | Everything. It cannot write your sheet |
| See and download any calendar that you can access | Calls, thank-yous, cancelled calls |
| Connect to an external service | Everything. It cannot reach Blotter |
| Allow this application to run when you are not present | The 15-minute updates. Manual runs only |

And the honest sentence beside it, which is also the reassuring one:

> Every one of these is **read-only** except the sheet you just copied. Blotter
> cannot send an email, reply to one, delete anything, or touch any other file
> in your Drive — not as a promise, but because those permissions were never
> requested.

**One more thing on that screen**, and it should be pre-empted rather than
discovered: Google shows *"Learn why you're not seeing links to Blotter's Privacy
Policy or Terms of Service."* An unverified app shows no policy link, at exactly
the moment a student is deciding. **So this page links to `/privacy` right
there**, since Google cannot.

**Step 5 — Then `Start here`, and here is what's waiting**

The brief's five steps end at `Start here`. **They should not end there
silently**, because `courier/INSTALL.md` Part B is explicit that the order
matters and two of the remaining steps fail in ways a student cannot diagnose:

- **Your email addresses, before the first run.** Blotter refuses to run until it
  knows which addresses are yours — it is how it tells "you wrote" from "they
  wrote". Run it first and the very first click produces an error dialog that
  looks exactly like a broken install.
- **Your time zone.** `File → Settings → Time zone`. **A copied sheet keeps the
  time zone of whoever built it**, and a student in New York on a Chicago
  template gets every `Days` value wrong at the boundary — silently, in a way
  that looks completely normal.

So step 5 is one short list, ending: *"the `Start here` tab walks you through all
four, and it is the first thing you'll see."*

**Foot of the page**

- **Your Blotter ID** — where to find it in Settings and to quote it when asking
  for help. `24-PRE-LAUNCH-READINESS.md` §4: it already exists and nobody can
  see it.
- **`jnachman17@gmail.com`**, plainly, plus the contact form.
- **What to do if something looks wrong** — three lines, lifted from the
  `Start here` tab so the two cannot drift: stuck on `Not emailed` means the
  address cannot be read; nothing updating means check `Last successful run`;
  everything wrong means check that `Pretend today is` is empty.

### 4.3 What blocks it

- **The template URL.** Not in this repository. `INSTALL.md` Part B says *"open
  the master Blotter sheet"* — and `17-INSTALL-OBSERVED.md` §2 says the master
  currently ships **full of 58 real bankers' names and addresses**. A public
  template must be empty before this page can link to anything.
- **Jon's screenshots** — four: the menu, the warning screen, the permissions
  screen with `Select all` visible, and `Start here`.
- **The `Set up now` ruling** in §4.1.

---

## 5. `/privacy` — the slots, each marked

### 5.1 First, correct the premise

**The twelve `[ to be confirmed ]` slots are gone.** Jon answered all of them on
August 6, 2026 and the markers were removed the same day — the file records it at
`web/app/privacy/page.tsx:11–15`, and `git log` puts it in commit `53796d9`,
*"Put the privacy policy in force and name the real providers."*
`24-PRE-LAUNCH-READINESS.md` §6 is stale on this point.

**This is worse rather than better.** A visible `[ to be confirmed ]` is honest
about not knowing. What the page carries now is a set of settled answers, several
of which have since become false — and nothing on the page marks them. The
file's own instruction, at line 21, is: ***"If a fact here stops being true, mark
it — do not leave it standing."*** That has not happened.

### 5.2 Article by article

**Answerable now** means the true answer exists in this repository today and I
can point at it. **Still unknown** means nobody can answer it honestly yet.

| # | Article | State | The answer, or why not |
|---|---|---|---|
| 01 | Who this policy is from | **Answerable — unchanged** | A legal entity exists with no address to publish. **Its name is still not on the page**, and terms of service will need it |
| 02 | What this policy covers | **Answerable — unchanged** | Fine as written |
| 03 | What happens today | **Answerable, and incomplete** | The three disclosed collections are accurate. **`/api/telemetry` is missing** and must be added before the table exists (§1.15) |
| 04 | Information we collect | **Answerable — rewrite** | There is no account and no subscription. Two of the three categories describe a product that does not exist |
| 05 | What we access in your Google account | **Answerable, exactly, today** | `courier/appsscript.json` gives the five scopes; `17-INSTALL-OBSERVED.md` §1 gives Google's own wording for each. Four of five rows are currently wrong (§1.7) |
| 06 | How Blotter decides what to read | **Answerable, and much stronger** | Whole conversations, not senders. And the server never receives the text at all |
| 07 | How we use the information | **Answerable — small edit** | Drop `next actions`. The Google API Limited Use sentence stands and is worth keeping |
| 08 | What we keep | **Answerable, and far stronger** | Delete the retention paragraph. The server keeps nothing. The recruiting facts are in the student's own spreadsheet, in their own Drive, under their own control |
| 09 | What we do not do | **Answerable — two are false** | `disconnect your accounts` and `deleting your account` (§1.14). The other seven are true and three are now stronger |
| 10 | Google connection provider | **Answerable — delete the article** | There is no provider. Keep the Supabase / PostHog paragraph, drop Stripe until billing exists, and add telemetry |
| 11 | Your choices | **Answerable — and it becomes the whole answer** | Revoking in Google security settings is no longer one option among several; it is *the* mechanism, and it is a good one |
| 12 | Keeping information safe | **Answerable — and it is the worst paragraph on the site** | The plain admission (no audits, no certifications) is right and should stay. The CASA sentence after it must go. **What replaces it is stronger**: nothing to secure, because nothing is held |
| 13 | Where information is processed | **Answerable — and it gains a sentence** | US for the lead table and analytics. And: your mail never leaves Google at all |
| 14 | Age | **Answerable — unchanged** | 18+ |
| 15 | Changes to this policy | **Answerable — unchanged** | Fine |
| 16 | Contact | **Answerable — unchanged** | Fine |
| 17 | Common questions | **Answerable — four of seven need rewriting** | Q1, Q2 and Q3 restate sender-matching; Q7 restates the provider |

### 5.3 Genuinely still unknown — say so, do not fill them

1. **The legal entity's name and form.** Jon confirmed one exists. It is not
   named anywhere, and terms of service cannot be written without it.
2. **Whether the operator is a data controller for anything beyond the install
   id, the funnel email and contact messages.** My reading is that the Gmail and
   Calendar data never leaves the student's own Google account and so never
   becomes Blotter's to control. **That is a lawyer's ruling and not mine**, and
   it is the single question that decides how much of a policy is even required.
3. **What happens to a student when Blotter shuts down.** The answer is probably
   very good — the sheet is theirs, their data was always theirs, and the script
   stops calling a server that is not there. It has never been written down.
4. **Payments.** Stripe is named in article 10 and no billing exists
   (`23-BILLING-ARCHITECTURE.md` is unbuilt and behind a flag).
5. **Terms of service.** **They do not exist at all.**
   `24-PRE-LAUNCH-READINESS.md` §6 is right that both must be real before a
   stranger grants Gmail access, and the policy is much closer than the terms.

---

## 6. If only three things could be changed

### 1. Delete the provider and CASA sentences, and say what is actually true

`web/lib/privacy-copy.ts:261–266` and `317–319`;
`web/app/privacy/page.tsx:483–501` and `546–554`;
`web/components/sections/data-and-privacy.tsx:135, 145`.

**Because it is the only false claim on this site that a stranger is entitled to
rely on**, it sits on a legal page, and Google contradicts it out loud thirty
seconds later on a screen where nobody can help them. Everything else on this
list is a product description. This one is a security claim.

**It is also the cheapest of the three**, because the replacement is shorter than
what it replaces, and better: *nobody's mail leaves their own Google account, and
the server never sees an email.*

### 2. Cut `Next move` and `No reply` from every surface

Fourteen files, three films and the share card (§1.1, §1.2).

**Because they are the two things the product most deliberately refuses to
do**, and the site advertises both. `04-ENGINE-RULES.md` §4 shows the cost with a
number: at five days Blotter would have chased Jon about a contact **sixteen days
before she replied**, and that reply opened four interview rounds.

**And the replacement is a better sell to this audience.** The header already
says *"The non-AI slop tracker"*. A tracker that refuses to tell you what to do,
and can say why in one sentence about real data, is that claim kept. `Bump
thread` is that claim broken.

### 3. Fix the scopes on `/privacy` against the real consent screen

`web/app/privacy/page.tsx:115–132`, `404–411`, and
`web/lib/privacy-copy.ts:146–147`.

**Because it is the page's most checkable claim and today it does not survive
being checked** — four of five rows are wrong, and the student sees five
checkboxes where the page lists three. `courier/appsscript.json` and
`17-INSTALL-OBSERVED.md` §1 between them contain the entire correct answer, so
this is transcription rather than research.

It is also the prerequisite for the setup page, which has to reproduce that same
screen and must not disagree with the policy it links to.

---

### The fourth, which is not a change but a ruling

**Does Blotter keep the sheet a student already built?**

Today the site says yes in eleven places and the product says no
(§1.8). This is the promise that breaks at the moment of purchase — not on a
legal page, not in a film, but on the first screen after they pay. It cannot be
fixed by editing copy, because the answer decides what the copy should say, and
the honest version — *your columns come with you, and you never leave Google
Sheets* — is narrower than what is on the page and still good.

**It is Jon's, and it should be ruled before any page copy is rewritten**, since
Section 02, the FAQ, the price screen and the closing line all depend on it.
