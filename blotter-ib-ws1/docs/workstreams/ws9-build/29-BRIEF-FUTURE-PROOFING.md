# Brief — everything that is cheap now and expensive once students have copies

Date: September 3, 2026
Model: **Opus.**
Owns: `courier/`, `web/app/api/`, `05-CONTRACT.md`. **Nothing in `web/app` outside the API.**

**Jon's instruction, and it governs this whole brief:**

> *"The only most important thing we do right now is set up infrastructure so we
> can add billing in later so our infrastructure can stop access to any given
> account individually if they haven't paid, add in a place to put a billing key
> in etc, regardless of monthly or one time. We need to be fully predictive in
> future needs via current infrastructure like building while thinking about the
> future how all tech companies do. This doesn't just apply to billing but
> absolutely everything."*

**The organising principle:** anything that changes the *script* is nearly free
today and costs an email to every student once they have a copy. **So everything
of that kind goes in now, dormant if necessary.**

**Nothing here changes what a student experiences.** Every piece is inert until
switched on.

---

## 0. Boundaries

- **You own `courier/`, `web/app/api/`, and `05-CONTRACT.md`**
- **Do not touch the rest of `web/`.** The site is live, and it is last
- **Do not edit** `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`
- Read-only on Gmail and Calendar. No attachments
- Explicit paths when staging. Never `git add -A`
- **Wait for the sheet-resilience chat to finish in `courier/` before starting**,
  or coordinate with Jon. Two chats in that file will collide

## 1. Read first

`23-BILLING-ARCHITECTURE.md` **including the amendments** ·
`24-PRE-LAUNCH-READINESS.md` · `05-CONTRACT.md` · `00-STATE-OF-PLAY.md` ·
the renderer analysis in your own notes

---

## 2. Billing plumbing, dormant

**Everything except the part that refuses.** Jon is launching free; the point is
that turning it on later must not require anyone to re-paste.

### 2.1 A key field
A Settings row, `Blotter key`, empty and harmless. Sent on every request.

### 2.2 An account identity
Per `23-BILLING-ARCHITECTURE.md` §2 and amendment **A3**, which is not optional:

- `Session.getEffectiveUser().getEmail()`, **hashed**
- **If it is empty, do not send the field at all.** Absence must never be a
  value — hashing an empty string gives every such install the same identity,
  and one key would unlock all of them
- **Verify the value is non-empty on a consumer Gmail and on a `.edu` before
  relying on it.** Two lines of Apps Script. The whole design rests on it

### 2.3 The keys table and the check, switched off
The table, the lookup, and the refusal path — **behind a flag that is off**, and
per **A7** the flag has **exactly one source**, confirmable with `curl`. D27's
lesson: a switch with two sources cannot be turned off by looking at one.

**Do not build Stripe.** That is a website job and the website is last.

### 2.4 Soft binding, per amendment A4
A hash mismatch is **recorded and flagged, never refused**. Graduation
deprovisions every student's `.edu` on a schedule; locking out a paying customer
who simply graduated is far worse than a shared key going unnoticed.

---

## 3. The design moves to the server

**What Jon wants from this, in his words: change everything virtually and just
drop it in.**

Today every colour, every word, every column name and the whole `Start here` tab
lives in the script. Changing any of them means every student re-pastes. **After
this, they are data the server sends.**

**Your own analysis says the shape is already there** — `instructionRows_`
returns records, `applyStatusColours_` loops a table, `THEMES` is a lookup. This
is largely moving literals across a wire that exists.

**And your own analysis says how it must work, or it dies on the run budget:**

- The engine response carries a short **`design_version`** string
- The courier compares it to what it has. **Same, do nothing.** Different, fetch
  `/api/design`, apply, remember
- **Steady state costs nothing.** A full re-format is 125+ round trips and
  10–15 seconds; it must never run on an ordinary pass

**Scope: the things that are already tables.** Status styles, theme colours,
instruction rows, sort ranks, number formats, column widths, copy. **Leave
conditional-format construction, merges and frozen panes in the script** — they
change rarely and are fiddlier.

**Security, and this is not optional.** A courier that renders what it is told
can be told to write anything. `safeCell_` already exists — **use it on every
string from a design payload**, validate colours against a hex pattern, bound
every number, cap the payload, and **never let a payload change which columns
are Blotter's.** The student's own columns must be unreachable by design data.

---

## 4. Making the next change cheaper than this one

**The genuinely predictive part, and the reason to think past billing.**

### 4.1 Ignore what you do not recognise
**Both sides must ignore unknown fields rather than rejecting them.** Then most
future additions need no version change at all, and no re-paste. **This is the
single highest-leverage line in the brief** — it is what stops the next idea
costing what this one costs.

Say plainly in `05-CONTRACT.md` which changes still force a version bump
(removing a field, changing a meaning) and which no longer do (adding one).

### 4.2 The server can tell the courier to update itself
The courier already reports its version. **The server should recognise an old
one and say so through the notice**, with a link. It cannot push a new script;
it can make sure nobody is running an old one unknowingly.

### 4.3 One place that always serves the current script
A stable URL under `web/app/api/` serving `Code.gs`, so §4.2's notice has
somewhere to point and update instructions never go stale.

---

## 5. What NOT to do

- **No Stripe, no checkout, no pricing.** Website, and last
- **No enforcement switched on.** Every student keeps working exactly as now
- **Nothing in `web/app` outside the API**
- **Do not decide monthly versus season pass.** It changes nothing here — both
  reduce to *is this key valid right now* — and it is Jon's, later, with data

## 6. Write

- The code
- `blotter-ib-ws1/docs/workstreams/ws9-build/30-FUTURE-PROOFING-NOTES.md` — what
  is dormant, **exactly how each dormant thing gets switched on**, and anything
  that still needs a live sheet

## 7. Report

Plain English. **Jon is not technical and has asked twice for less jargon.**
Lead with: what he can now change without anyone re-pasting, what is sitting
there waiting to be switched on, and what he has to do by hand.
