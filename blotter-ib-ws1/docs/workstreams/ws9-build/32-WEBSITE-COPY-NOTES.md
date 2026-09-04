# The website copy, privacy and legal pass — what changed, and what needs Jon

Date: September 3, 2026
Brief: `27-BRIEF-WEBSITE-AUDIT.md`, and Jon's rulings on `28-WEBSITE-AUDIT.md`
Owns: `web/`, except `web/app/api/`
Status: **Built. On the branch. Nothing shipped to `main`.**

`tsc --noEmit` clean · `next build` clean, 23 routes ·
`eslint` one pre-existing warning in `lib/analytics.ts`, unrelated and untouched

**Not in this pass, on Jon's instruction:** films, screenshots, the sheet mocks,
the Outstanding view, the share card. *"We're gonna fix all the UIs later."*
§4 lists where a picture now contradicts the words.

---

## 1. What changed, in one page

| | Was | Now |
|---|---|---|
| **The provider and CASA** | Blotter connects through a provider "verified by Google" | **Deleted everywhere.** There is no third party. Google says out loud it has *not* verified this, and the page now says so first |
| **The four processing steps** | Sender matching, then server-side processing | Where it runs · what it opens · **what leaves your account, exhaustively** · what comes back |
| **The Google scopes** | Three, and four of five rows wrong | **All five, from `courier/appsscript.json` and the real consent screen**, each with what breaks without it |
| **"Keep the sheet you already built"** | Eleven places | **Rewritten in all eleven.** You paste your list into a sheet you copy, you keep your columns, you stay in Google Sheets |
| **Retention** | "We do not retain full email bodies" | The server never receives one, and writes nothing down |
| **Telemetry** | Undisclosed | **Disclosed**, worded to cover the billing table too |
| **Terms of service** | Did not exist | `/terms`, with three unknowns visibly marked |
| **A setup page** | Did not exist | `/setup`, six steps, built around the two screens where people give up |

**Files touched:** `lib/privacy-copy.ts`, `lib/sheet-data.ts`, `lib/hero-copy.ts`,
`lib/closing-copy.ts`, `lib/funnel-copy.ts`, `lib/supabase-admin.ts`,
`app/privacy/page.tsx`, `components/sections/{hero,ownership,tracker-and-actions,data-and-privacy,faq-and-close}.tsx`,
`components/section-6/parts.tsx`, `components/site-header.tsx`.
**New:** `app/setup/page.tsx`, `app/terms/page.tsx`.

---

## 2. ⚠ Every judgment call, for Jon to review

**Read this section and skip the rest if you want.** These are the places I
decided something rather than transcribed it.

### 2.1 The CTA still says `Fix my tracker` and still opens the funnel

**Your brief said the CTA becomes `Set up now`. I did not do that, and this is
the call most worth overturning if you disagree.**

Three reasons, and the third is the one that decided it:

1. **The template is not ready.** `17-INSTALL-OBSERVED.md` §2 — the master
   ships carrying 58 real bankers' names and email addresses. A public
   `Set up now` button has nowhere to send anyone until an empty master exists
2. **It would end the price test.** Every CTA feeds `funnel_started` →
   `email_submitted` → `price_viewed` → `checkout_started`/`waitlist_joined`.
   Repointing them stops that data, and it is the only thing this site has ever
   measured
3. **A button reading `Set up now` that opens an email-capture-then-price screen
   is the exact fault that forced `See how Blotter works` out** — a label
   writing a cheque the thing behind it cannot cash

**What I did instead:** a quiet `Set up` link in the header, desktop only, plus
links from the footer and `/privacy`. **The flip is a one-line change** in
`components/cta-button.tsx` whenever you want it, and the right moment is
probably the day the empty template exists.

### 2.2 `/setup` and `/terms` are both `noindex`

Neither can finish its job yet — `/setup` has no template link, `/terms` has
three unanswered questions. **A findable legal page with holes in it is worse
than one nobody has found.** Remove `robots` from each file's `metadata` when
they are complete.

### 2.3 The template link is a visible notice rather than a dead button

`TEMPLATE_URL` in `app/setup/page.tsx` is `null`, and the page renders a plain
statement in its place: Blotter works, it runs on one account, and the link goes
here when the sheet is ready for other people. **Set that one constant and the
page becomes a button.** Add a tracking parameter to it when you do —
`24-PRE-LAUNCH-READINESS.md` §6, the top-of-funnel blindness.

### 2.4 `Terms` uses `[ to be confirmed ]` markers, deliberately

Three of them: the legal entity's name and form, the liability cap, and
governing law. **This is the device `/privacy` shipped with in August**, and
removing it there is arguably what let the CASA sentence survive — a settled
answer that quietly became false looked exactly like a settled answer.

**A lawyer should read `/terms` before a stranger relies on it.** I have said so
at the top of the file. The structure is conventional; the three facts are not
mine to invent.

### 2.5 Section 02's headline changed shape

`You already have a tracker. Keep it.` → **`Paste your contacts in. Stay in
Google Sheets.`**

The old headline's job was killing the switching-cost objection. **The objection
was never really about the file** — it is "I don't want to rebuild this and I
don't want to learn a new tool", and both halves still have a true answer. The
new one answers both and is concrete about the single thing a student does.

### 2.6 FAQ 1's *question* changed, not just its answer

`Do I need to start with a new tracker?` → **`Do I have to rebuild my tracker?`**

The old question now has an awkward answer — "yes, sort of" — and a FAQ opening
by wriggling is worse than one answering a slightly different question honestly.
The new answer opens *"No, but it does move"*, which concedes the real thing in
four words.

### 2.7 The `Fall 2026` availability date is untouched

`04-ENGINE-RULES.md` §12 calls it unmeetable; the state of play is far more
optimistic. **It is a business decision about a date, not a copy fix**, and
guessing at it would be inventing a fact. It is in three places in
`lib/funnel-copy.ts`, all flagged in `28-WEBSITE-AUDIT.md` §1.13.

### 2.8 Two claims I made narrower than the brief did, because the code moved

**Both are the rewrite's own rule working**, and both would have shipped as
false if I had transcribed the brief instead of checking the file.

- **"The engine has no database" is no longer accurate.** Since the billing
  work, `app/api/engine/route.ts` can *read* one row from `blotter_keys` to
  check whether a sheet is active. It still **writes nothing, ever** — the route
  says so itself and calls it amendment A2. So the copy says *"writes nothing
  down"* rather than *"has no database"*. Small distinction, and exactly the
  kind that turns a good claim into a false one while nobody is looking
- **The telemetry disclosure is worded to cover the billing table.** It
  describes the boundary — an anonymous per-sheet id and counts, never a name,
  address, subject or message — rather than listing tables that go stale the
  next time one is added

### 2.9 The subject line is disclosed, and so are calendar event titles

`/privacy` article 06 now carries **the complete list of what crosses the wire**,
because "never receives the text of an email" is exactly true and could be read
as "receives nothing". Subject lines, event titles, and the names and firms a
student typed in all do cross it.

**A list that is nearly complete is worse than no list**: a reader who finds the
missing item stops believing the rest. This is the one place I made the page say
*more* about what leaves, not less.

### 2.10 The `/privacy` status notice was false and is rewritten

It said Blotter *"is not yet connected to anyone's Google account."* A sheet has
been running since September 2. It now says Blotter is built and working, is
running on the account of the person who made it, and is not yet open to other
people.

### 2.11 Small things I decided without asking

- **`Privacy policy` in the footer shortens to `Privacy`**, so it pairs with the
  new `Terms`. Checked at 375px: the row still wraps to two lines and the page
  does not scroll sideways
- **The `Set up` header link is desktop only**, on the same measurement that
  keeps the tagline off a phone bar
- **`lib/supabase-admin.ts`'s stale comment is fixed.** It named one consumer
  where there are four. `22-DISTRIBUTION-NOTES.md` §5.1 recorded it as outside
  that chat's boundary; it is inside mine

---

## 3. One correction to the record

The conductor's ruling relayed that `04-ENGINE-RULES.md` says nothing about any
bank and that FT Partners appears only in `03-LEARN-FINDINGS.md`.

**`04-ENGINE-RULES.md` §1, line 40, does name it** — *"all four `Interview with
Financial Technology Partners` rounds — the firm Jon actually joined"* — in the
course of explaining which calendar events version one excludes.

Recorded only so a later session reading these notes is not misled about what is
in the rules document. **Jon's ruling stands and is not in question: JPMorgan is
correct in Section 01, it is untouched, and it is not raised again.**

---

## 4. Where a picture now contradicts the words

**Left alone deliberately**, per Jon: *"we're gonna fix all the UIs later."*
Recorded so the UI pass has the list.

| Surface | What it still shows |
|---|---|
| Desktop hero film | `Next move`, `Call completed`, and a closing beat built on `No reply for 5 days` → `Bump thread` |
| Mobile hero film | The same, same closing beat |
| Funnel film | The same, plus the Outstanding count |
| Share card (`opengraph-image.tsx`) | `Next move`, `No reply`, `Call completed` — this is every link preview |
| Section 02's sheet | Tabs named `Contacts` / `Blotter` / `Outstanding`; the real ones are `Start here` / `Contacts` / `Found` / `Settings` |
| Section 03 | The entire Outstanding view, which does not exist |

**The sharpest mismatch is Section 02**: the headline now says *paste your
contacts in* and the picture beneath it still argues that you keep your own
file. It is not wrong so much as no longer the proof of the sentence above it.

**And a sequencing note for that pass.** All three films end on the same cut
beat, so they need rebuilding rather than patching — but the sheet has never been
photographed. **Screenshots first.** If a picture of the real `Contacts` tab
carries the argument on its own, and the banner row and zone colours suggest it
might, the films get rebuilt once against something real instead of twice.

---

## 5. What is still blocked, and on whom

| | Blocked on | Blocks |
|---|---|---|
| An **empty distribution master** | Jon | `/setup` going live, the `Set up now` CTA, and anyone at all having a copy |
| **Four screenshots** for `/setup` | Jon | `/setup` reading as finished rather than as a draft |
| **The legal entity, the liability cap, governing law** | Jon, then a lawyer | `/terms` losing its markers and its `noindex` |
| **The `Fall 2026` date** | Jon | Three strings in `lib/funnel-copy.ts` |
| **The `Set up now` CTA ruling** | Jon | One line in `cta-button.tsx` |

---

## 6. The rule this pass leaves behind

Every claim on the site now names where it can be checked, and
`lib/privacy-copy.ts` carries the four files that hold the answers: the contract,
the engine route, the manifest, and the transcribed consent screen.

**The old rule was a set of claim gates** — statements marked as true of no
implementation, which public traffic was not supposed to see. Public traffic saw
them for a month and one of them was false.

**So the standing instruction is now the opposite: do not soften these claims,
and do check them.** A claim that stops being true here is one a stranger is
entitled to rely on, and the failure mode is not overreach — it is a sentence
that was true in August and quietly stopped being true in September while
reading exactly as confidently as before.
