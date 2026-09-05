# Copy the audit says is wrong, and what to put instead

**Nothing here is changed yet.** Every item is a sentence on the live site, in
the script header, or in the sheet, that an independent review found does not
match the code. Each one has the exact words now and the exact words proposed.

The findings behind them are in `38-AUDIT-FINDINGS.md`. The code fixes that
needed no copy change are already done and shipped as courier 4.6.

Read the three under **Decide these first**. The rest follow from them.

---

## Decide these first

### 1. The calendar. This is a decision about the code, not the words.

The courier sends a calendar event if a contact is a guest on it, **or** if any
word in the title matches a contact's first name. The server needs the first
name **and** the firm. So an event called `Dinner with Sam` leaves the account,
with its guest list, and the server then throws it away.

`37-BRIEF-PUBLIC-AUDIT.md` §3 ruled the courier's test deliberately looser than
the server's, so it can only ever send more than the server uses and never less.
That ruling holds either way. The question is only whether it should also drop
the firm requirement, which nothing decided and which is where the leak is.

**Option A — match the server exactly.** Require the first name and the firm,
the same test `matchEvent` runs. Sends strictly less. Loses nothing, because
anything sent under the looser rule and not under this one is discarded on
arrival anyway. A test pins the two rules together so they cannot drift apart
later. **This is the recommendation.**

**Option B — leave it, and change the words.** The site stops saying *"calendar
events with your contacts"* and says what actually happens. Honest, and it means
a real leak stays: with a contact called Will or Grant or May, ordinary personal
events keep going out.

There is a defect to fix under either option. `eventWords_(n)[0]` takes the first
word of the Name cell with nothing filtered, so a contact typed in as
*"The Blackstone team"* puts the word `the` on the match list and sends very
nearly the whole calendar.

**Until this is decided, `/audit` says plainly that it happens.**

---

### 2. The sheet tells students something that is not true

`Blotter → Check this sheet` prints this today:

> The Blotter ID is what identifies this sheet. It is a random number that says
> nothing about you. Not your name, not your email address, neither of which
> Blotter is ever given.

The last clause is wrong. The addresses typed into Settings are sent on every
run, and a student's own name rides on their own sent mail.

**Proposed:**

> The Blotter ID is what identifies this sheet. It is a random number, and there
> is nothing of you in it. Blotter is given your email addresses, because it has
> to know which mail is yours, and your name where an email carries one. It is
> never given your password.

---

### 3. Where the sheet sends data is an ordinary cell

`Settings → Server URL` is checked only for starting with `https://`. Step 1
does not repair it, handing a sheet on does not clear it, and
`Blotter → Check this sheet` does not show it. Blotter is passed round by copying
a sheet.

The realistic case is not dramatic: somebody who can hand you a doctored Settings
cell can usually hand you a doctored script too. It bites on the honest path,
where a student pastes the genuine script from `/update` into a sheet whose
Settings came from somewhere else. It also weakens `/audit`, because *"this
posts to blotterib.com"* is only true of a stock sheet.

**Option A — pin it, the way the counting endpoint is now pinned.** Refuse
anything that is not `https://blotterib.com/...`, and say so plainly if it is
wrong. Costs you the ability to point a sheet at a preview deployment by editing
a cell; you would edit the script instead. **Recommended.**

**Option B — show it.** Add one line to `Blotter → Check this sheet`:
`Sends to: <the URL>`. Cheap, keeps testing easy, and turns a silent redirect
into a visible one. Weaker, because it only helps somebody who looks.

Both are possible. Neither changes anything a normal student sees.

---

## The site copy

All in `web/lib/privacy-copy.ts`, which writes both the landing page's privacy
section and `/privacy`.

### 4. Step 02 — the timing, and whole conversations

**Now:**

> It only looks at conversations with your contacts
> Every 15 minutes it checks for conversations with the people in your Contacts
> tab. A thread that does not involve one of them is never touched.

Two problems. `shouldWorkNow_` drops to once every two hours between 10pm and
7am, so *"every 15 minutes"* is wrong for about nine hours a day. And a
conversation is read whole: one message involving a contact pulls every message
in that thread, so somebody else copied in has their address and subject line
read too.

**Proposed:**

> It only looks at conversations with your contacts
> Every 15 minutes through the day, and every two hours overnight, it checks for
> conversations with the people in your Contacts tab. A conversation that does
> not involve one of them is never opened. One that does is read whole, so
> anyone else copied into it has their address and the subject line read as well.

### 5. Step 03 — the list has to actually be complete

**Now:**

> To work out where each conversation stands, Blotter's server is sent who
> wrote, who it went to, when, the subject line, and the title, time and guests
> of calendar events with your contacts. It is also sent the name, firm and
> email of each person in your Contacts tab, and the email addresses of anyone
> you rejected on the Found tab, so it does not suggest them again. The body of
> an email is never sent.

This file's own instruction on step 03 is *"keep it exhaustive — a list that is
nearly complete is worse than no list, because a reader who finds the missing
item stops believing the rest."* It is not exhaustive. Missing: your own email
addresses, the sheet's random id, your Blotter key, which row a contact is on,
whether you ticked Closed, Gmail's own ids, who organised an event and who
declined it.

**Proposed:**

> To work out where each conversation stands, Blotter's server is sent, for each
> email in a conversation with one of your contacts: who wrote it, everyone it
> went to, when, and the subject line. Names as well as addresses, where the
> email carried a name. For a calendar event: the title, the times, everyone
> invited, who declined and who set it up. From your Contacts tab: each person's
> name, firm and email, whether you have ticked Closed, and which row they are
> on. It is also sent your own email addresses, the addresses of anyone you
> rejected on the Found tab, this sheet's random id, and Google's own reference
> numbers for the conversations it read. The body of an email is never sent.

### 6. The main claim — the bounce exception

**Now, the middle of `CANDID_CLAIM`:**

> There is one exception, and it is a machine rather than a person: when Google's
> mail system returns an automated delivery-failure notice, Blotter opens that
> notice inside your own account to find which address bounced. Only the address
> travels.

Two small inaccuracies. The check is on the sender's name before the @ being
`mailer-daemon` or `postmaster`, at any company, not Google specifically — which
is correct behaviour, because a bounce comes back from the recipient's mail
server rather than from Google. And more than one address can come out of a
notice.

**Proposed:**

> There is one exception, and it is a machine rather than a person: when a mail
> system sends back an automated delivery-failure notice, Blotter opens that
> notice inside your own account to find which address bounced. Only the
> addresses it finds travel, never the text.

### 7. "Never touches a conversation that does not involve one of your contacts"

`COMMITMENTS[6]`. False for calendar today, and misleading for mail because of
whole-thread reading.

**Proposed:** `Blotter never opens a conversation that does not involve one of
your contacts`

Weaker on purpose. *Opens* is what the code does and can defend. *Touches* is
what four separate reviews all pushed back on.

### 8. "Nothing of yours is left anywhere"

`COMMITMENTS[8]` and the end of `DELETION_STATEMENT`. The counting rows outlive
the sheet, and the page says so two paragraphs earlier. Nothing identifying is
left. Something is.

**`COMMITMENTS[8]` now:** `Delete the spreadsheet and nothing of yours is left anywhere`
**Proposed:** `Delete the spreadsheet and nothing that identifies you is left anywhere`

**`DELETION_STATEMENT` now, last sentence:** *"Nothing about it was ever copied
anywhere else, so deleting it is the end of it."*
**Proposed:** *"No copy of it was ever kept anywhere else, so deleting it is the
end of it. What stays behind is the counting described above: a random number
for the sheet and how many contacts it had."*

### 9. The permissions FAQ — "read-only apart from the spreadsheet"

The end of the unverified-app answer says *"every one of them is read-only apart
from the spreadsheet you just copied."* Two of the five are not permissions on
your data at all, and one of them is exactly what lets data leave.

**Proposed ending:** *"Three of them are read-only, one is the spreadsheet you
just copied, and the last two are not about your data at all: one lets Blotter
reach its own server, and one lets it run while you are away."*

### 10. The Gmail permission question

The answer says Google *"does not offer a permission that means only the people
in this spreadsheet."* True, and two reviews read it as claiming no narrower
Gmail permission exists. One does, and there is a good reason it cannot be used.
Saying so is stronger than leaving it to be discovered.

**Proposed addition, after the first sentence:** *"There is a narrower Gmail
permission that would hand over headers only, and Blotter cannot use it: it
forbids searching, and searching for your contacts is the whole mechanism."*

### 11. "Your recruiting information lives in one place"

`KEEPS_BODY[1]`. It is about where the information lives, and it reads as though
nothing leaves.

**Now:** *"Your recruiting information lives in one place: your own spreadsheet,
in your own Google Drive."*
**Proposed:** *"Your recruiting information is kept in one place: your own
spreadsheet, in your own Google Drive. The facts above go to the server to be
worked out and are not kept there."*

### 12. "There is no third party in the middle"

`HOSTING_BODY[0]`. It means no connection provider, and the next paragraph makes
that clear. Read on its own it is wrong, and two reviews tripped on it.

**Proposed opening:** *"There is nobody else in this but Blotter. No connection
provider, no data broker, no other company handling your mail on the way
through."*

---

## The script header

`courier/publish.js`, the comment every student sees at the top of the code, and
the first thing an AI reads.

### 13. The timing

**Now:** *"Every fifteen minutes it looks at your Gmail and Google Calendar"*
**Proposed:** *"Every fifteen minutes through the day, and every two hours
overnight, it looks at your Gmail and Google Calendar"*

### 14. Whole conversations

**Now:** *"It only looks at conversations that already involve someone in your
Contacts tab."*
**Proposed:** *"It only opens conversations that already involve someone in your
Contacts tab, and it reads those whole, so anyone else copied in is read too."*

### 15. Blotter's own columns

**Now:** *"It writes only to this spreadsheet, and only to Blotter's own columns
and tabs, never to a cell you typed in."*

Two reviews found this. When you tick Add? on the Found tab, Blotter writes a
name and an email into the Name and Email columns, which are yours. It only ever
writes into an empty row, and only because you asked, but *"only Blotter's own
columns"* is not true. Setting up the sheet also standardises font and row
height across the whole sheet, your columns included.

**Proposed:** *"It writes only to this spreadsheet. It never changes something
you typed: it fills Blotter's own columns, and it adds a new row when you tick
Add? on the Found tab. Setting up the sheet also sets the font and the row
heights throughout, including your own columns."*

### 16. A failed run

**Now:** *"If a run fails before it starts writing, your sheet is left
untouched; if it fails partway through, the next run rewrites what it missed."*

Nearly right, and one review found the remaining gap. If the server refuses the
run and sends a message with the refusal, that message is written to the banner
even though nothing else is.

**Proposed:** *"If a run fails, the most it writes is a line in the banner
telling you why; everything else in your sheet is left as it was. If it fails
partway through writing, the next run finishes the job."*
