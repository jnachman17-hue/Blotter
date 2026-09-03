# The install, observed — September 2, 2026

**The first time anyone has watched a fresh Blotter install on an account that
never had it.** Jon, on `jnachman170@gmail.com`, following `courier/INSTALL.md`.

Screenshots are in the conductor chat. **The wording below is transcribed from
them, not from Google's documentation** — every previous description in this
repository was written from docs and had never been checked against a screen.

---

## 1. The consent flow, screen by screen

### Screen 1 — a small in-sheet dialog

> **Authorisation required**
> A script attached to this document needs your permission to run.
> `Cancel` · **`OK`**

### Screen 2 — the warning, and it names the student as the developer

> ⚠ **Google hasn't verified this app**
> The app is requesting access to sensitive info in your Google Account. Until
> the developer (**jnachman170@gmail.com**) verifies this app with Google, you
> shouldn't use it.
> `Advanced` · **`BACK TO SAFETY`**

**The developer named is the student's own email address.** This is the single
most reassuring fact available about this screen and `INSTALL.md` does not use
it: the "unverified developer" Google is warning about **is you**. It is a
warning about your own copy of a script in your own account.

`BACK TO SAFETY` is the visually dominant button. `Advanced` is a plain
underlined link on the far left.

### Screen 3 — after clicking Advanced

> Continue only if you understand the risks and trust the developer
> (jnachman170@gmail.com).
> `Go to Blotter (unsafe)`

### Screen 4 — the permissions grant, and **this is the dangerous one**

> **Blotter wants access to your Google Account**
> **Select what Blotter can access**

**Five checkboxes, and every one is UNCHECKED by default.** There is a
`Select all` above them.

| Checkbox | What breaks without it |
|---|---|
| View your email messages and settings | **Everything.** No mail, no statuses |
| View and manage spreadsheets that this application has been installed in | **Everything.** Cannot write the sheet |
| See and download any calendar that you can access | Calls, thank-yous, `Call cancelled` |
| Connect to an external service | **Everything.** Cannot reach the engine |
| Allow this application to run when you are not present | The 15-minute timer. Manual runs only |

**All five are required. There is no partial install that works**, and Google
offers no hint of that — a student ticking two boxes out of caution gets a
product that fails in ways they cannot diagnose.

**`INSTALL.md` must say: click `Select all`.** It currently does not.

Also on this screen:

> Learn why you're not seeing links to Blotter's Privacy Policy or Terms of
> Service

**An unverified app shows no privacy-policy link**, at the exact moment a
student is deciding whether to trust it with their inbox. A `/privacy` page
exists on the live site and cannot be surfaced here.

---

## 2. Three defects this install found before it finished

1. **The distribution master ships full of somebody else's contacts.** Copying
   Jon's master carried 58 real contacts, real bankers' names and real email
   addresses into a new account. **A privacy problem as well as a confusing
   one.** The master handed to a student must be empty.
2. **Pasting a new script does not add new settings rows.** Jon pasted the
   Phase A script into his master and the `Pretend today is` row never
   appeared — the code was new, the sheet was old. Any student on an update
   path silently lacks whatever the update added. **The fix is one sentence in
   the update instructions: re-run `Step 1: Set up this sheet` after pasting.**
   `ensureSettingRow_` is idempotent, so this is safe and additive.
3. **`Select all` is not in the guide.** §1 above.

---

## 3. What worked

- **The copy-distribution path works.** A copied sheet carries its bound script
  and authorises as its own project under the copier's account. **This is the
  first real evidence for the working position that the 100-user cap does not
  bind a copied template** — it did not behave as one shared app.
- **The empty run is clean.** Zero contacts, run completed in 4 seconds, no
  error, `0 searches, 0 conversation fetches`. A brand-new student runs exactly
  this and it had never been tested.
- **`Step 1: Set up this sheet` is safe to re-run** and added the one missing
  settings row without touching anything else.

---

## 4. The question the install raised on its own

Jon, unprompted, on seeing an empty `Found` tab: *"I have sent 1 email in last
365 days that shoulda probably populated in found."*

**It should not, and it did not — `0 searches` confirms Blotter never asked
Gmail anything.** Found harvests only from conversations that already contain a
contact, and there were none.

**But this is O1's argument, arrived at by using the product rather than by
reasoning about it.** The first thing a real student will do is open an empty
sheet and expect it to know something. Recorded here because a user's own
expectation, discovered by accident, is better evidence than the debate that
produced D3.

---

## 5. LIVE TEST DEFECT 1 — a typed address can silently never match

**Found September 2, 2026, minutes into the first real test.** Jon typed
`jon@un-claude.com` into the Email cell by hand and the row read
`Not emailed` with a dash. He pasted the same address from the chat and the row
populated perfectly.

**The cause, verified against `ONE_ADDRESS` in `Code.gs`:**

| Typed | `addressList_` |
|---|---|
| `jon@un-claude.com` | matches |
| leading or trailing space | matches |
| `Jon@un-claude.com` | matches — **caps are safe**, the engine lowercases everywhere |
| **en dash** `un–claude` (U+2013) | **no match** |
| **non-breaking hyphen** `un‑claude` (U+2011) | **no match** |

Jon's hypothesis was right about the dash and wrong about capitalisation.

### The silent failure is the real defect

When no address parses, **the row is still a contact — with an empty address
list.** The engine correctly answers `Not emailed`, the courier writes it, and
**nothing anywhere reports a problem.**

A student types one contact containing a character Google autocorrected, and
that person reads `Not emailed` forever while they wonder why Blotter never
noticed the six emails they exchanged. **There is no error, no warning, and no
way to tell it apart from a contact they genuinely have not written to.**

### Two fixes, and the second is the one that matters

1. **Normalise Unicode dashes** to ASCII before matching.
2. **Warn when a row has a name but no parseable address.** There will always be
   a character nobody anticipated; the fix is to stop failing silently. This is
   the general defence and it is worth more than the specific one.

### Why fixtures could never have caught this

**Every fixture starts from a well-formed request.** The failure lives entirely
in the gap between a human's fingers and the sheet — the one place the whole
test apparatus has no reach. **This is the first defect the live test found, and
it justifies the live test on its own.**

---

## 6. LIVE TEST DEFECT 2 — `Days` means two different things

**Found by Jon on seeing `Call scheduled` show `1`.** In his words: *"That makes
Days have two distinct meanings… one would be days until an upcoming call, and
every other case it's days since an email interaction. I think days should only
have one meaning."*

**He is right, and the fault is directional.** Every other state answers *how
long has this been sitting* — backwards. `Call scheduled` answers *how long
until the call* — forwards. Same column, opposite direction, nothing on the
sheet to say which.

**And the countdown is redundant**: `Next call` already carries the date. Days
was duplicating an existing column in a different unit and a different
direction.

### The rule, and the one change it needs

**`Days` is time since the last thing that happened. Backwards, always.**

| Status | Days | |
|---|---|---|
| Not emailed | — | nothing has happened |
| **Call scheduled** | **—** | **the change.** `Next call` already says when |
| Sent | since you wrote | |
| Replied | since they wrote | |
| Bounced | since the bounce | how long a contact has been unreachable |
| Call done | since the call | **the thank-you clock** |
| Call cancelled | since the last email | already correct, per the D-clock ruling |
| Closed | — | |

**Only `Call scheduled` changes.** Everything else already obeys the rule.

**Open, awaiting Jon:** he suggested Days might belong only to `Sent` and
`Replied`. The argument for keeping `Call done` and `Bounced` is that both are
backwards-looking and both answer "how long has this needed me" — `Call done` is
the thank-you nudge, and a 30-day-old bounce means a contact has been
unreachable for a month unnoticed. Not yet ruled.

---

## 7. Formatting, as observed — the Phase B UI backlog

Recorded from the live sheet on September 2, 2026, for the UI work. **Nothing
here is a bug**; it is the raw state before any design pass.

- **`Next call` renders a raw ISO timestamp**: `2026-09-03T14:00:00-07:00`.
  Unreadable, and `04-ENGINE-RULES.md` §9 shows `1/17 @ 2:00 PM`. **The single
  most visible formatting defect on the sheet.**
- **`Last contact` renders `9/2/26`**, which is correct and matches the spec.
- **No colour anywhere.** Status is plain text. The landing page's coloured
  status chips are the product's most recognisable visual and the sheet shares
  none of it — D19 is where this gets fixed.
- **Column widths cut off email addresses** (`blotterib@gmail.` and similar).
- **No frozen header row**, so the headers scroll away on a real-sized list.
- **`Days` is right-aligned as a number**, which is correct.
- **`Closed` checkboxes render on every empty row** below the data, which reads
  as clutter on an otherwise blank sheet.

---

## 8. Days and Attempts show a number only when it means something

**Ruled by Jon, September 2, 2026**, completing §6.

| Status | Days | Attempts |
|---|---|---|
| Sent | since you wrote | **the count** |
| Replied | since they wrote | — |
| Call done | **since the call — the thank-you clock** | — |
| Call scheduled | — | — |
| Call cancelled | — | — |
| Bounced | — | — |
| Closed | — | — |
| Not emailed | — | — |

**The principle, and it is worth keeping:** a column shows a number only when
that number means something, and a dash when it does not. `Replied` always has
zero attempts by definition — printing a zero there is noise dressed as data.

Jon accepted the argument for keeping Days on `Call done`: it is the nudge that
state exists to give. He removed it everywhere else, including `Bounced`.

**Flagged, not argued:** `Bounced` losing its attempts count hides that a
student burned three guesses on a dead address — the real Sean Kang case. The
state communicates hopelessness either way, so the loss is small.

---

## 9. A test-design error worth recording, because the engine was right

**The thank-you did not clear `Call done`, and the engine was correct.**

```
Sept 2  ~18:00   Marcus replies
Sept 2  ~later   the thank-you is sent      <- real timestamp
Sept 3  14:00    the call                    <- calendar
Sept 4           pretend today
```

The thank-you was sent **the day before the call**, so "nobody has written since
the call" remained true and `Call done` correctly held. **`Attempts` still went
0 to 1**, because the thank-you *is* after Marcus's reply — two different
anchors, both right at once.

**The conductor designed the step wrongly.** The time machine moves *now*; it
cannot move when an email was actually sent, so a thank-you will always predate
a call scheduled for tomorrow.

**The lesson for the rest of this test, and for any future one:** a scenario
that needs event A to follow event B must put B in the *past* — move the
calendar event backwards — rather than moving `now` forwards. **The time machine
ages the world; it cannot reorder it.**
