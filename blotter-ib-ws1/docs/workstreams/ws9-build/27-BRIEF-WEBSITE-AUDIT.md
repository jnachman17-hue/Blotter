# Brief — the website against the product that now exists

Date: September 3, 2026
Model: **Opus.**
Owns: `web/` **except** `web/app/api/`. **Nothing in `courier/`.**

**Stage one is an audit, not a rebuild.** Read the site, read what Blotter
actually does, and produce a line-by-line list of what is now false. **Do not
change a page until Jon has seen that list** — the copy is ratified in build
specs and several rulings are his.

---

## 0. Boundaries

- **You own `web/`, except `web/app/api/`**, which is the engine and telemetry
- **Never touch `courier/`.** A parallel chat is working there right now
- **Do not edit** `04-ENGINE-RULES.md` or `14-DESIGN-DECISIONS.md`
- Explicit paths when staging. Never `git add -A`. **A second chat is live**
- The site is **live and public with real traffic.** Nothing ships to `main`
  without Jon

## 1. Read first, and in this order

1. **`04-ENGINE-RULES.md` — version 7. What Blotter actually does.** Everything
   else is measured against this
2. `00-STATE-OF-PLAY.md`
3. `20-UI-BUILD-NOTES.md` — what the sheet now looks like, and the palette
4. `24-PRE-LAUNCH-READINESS.md` §1 and §2 — the known divergences and the setup
   page Jon wants
5. `17-INSTALL-OBSERVED.md` §1 — **the real consent screens, transcribed**
6. Then the site: `web/app/page.tsx`, `web/components/sections/*`,
   `web/lib/*-copy.ts`, `web/lib/sheet-data.ts`, `web/app/privacy/page.tsx`
7. The build specs in `docs/workstreams/ws5-build-specs/` — **the ratified copy
   you are auditing against, not free to rewrite**

## 2. What is already known to be false

Confirm and extend; do not stop here.

| The site says | The truth |
|---|---|
| `Next move` — `Reply to Jamie`, `Bump thread` | **Cut.** Blotter never says what to do |
| `Follow-ups due` from a day threshold | **No threshold exists.** Ruled out on the evidence |
| Sender-matching, in four steps | **Wrong.** It reads whole conversations |
| `No reply` as a status | There are eight and that is not one |
| A provider *"whose Google application has passed CASA"* | **There is no provider.** Nothing in that sentence is true |

## 3. What the site does not say and now could

**The privacy story got stronger and nobody has told anyone.**

- **Blotter's server never receives the text of an email.** True since contract
  v4, and checkable by reading the contract
- The server **stores nothing** — no database, no logging, no file writes in the
  engine
- The script runs **inside the student's own Google account**. Blotter never
  holds a Google token
- `spreadsheets.currentonly` — it can reach **the one sheet it lives in**, and
  no other file in their Drive

**These are better claims than anything currently on the page, and they survive
being checked.** That is the difference worth writing about.

## 4. The visuals are a prediction, and the thing is real now

Every film and mock on the site was drawn **before Blotter existed**. The real
sheet is close but not the same, and **a screenshot of a working product is both
more honest and more persuasive than a drawing of one.**

Inventory what would need re-shooting, and say which assets survive. **Do not
re-shoot anything yet** — Jon supplies screenshots.

## 5. The setup page — Jon's, and it does not exist

CTA becomes **`Set up now`**, and a header link leads to a page that walks
through: open the template · **File → Make a copy** · Google's unverified-app
warning · the permissions screen · then `Start here` in the sheet.

**Two things it must get right, because they are where students give up:**

- **The warning screen.** `17-INSTALL-OBSERVED.md` §1 has it transcribed from a
  real install. **The developer Google names is the student themselves** — the
  most reassuring fact available and the guide has never used it
- **`Select all` on the permissions screen. All five are required and nothing
  on that screen says so.** A cautious student ticking two gets a product that
  fails in ways they cannot diagnose

## 6. `/privacy` and the legal surface

`/privacy` carries **twelve `[to be confirmed]` slots**. There are no terms.
Both must be real before a stranger grants Gmail access.

**Inventory what each slot now has a true answer for** — most of them do. **Do
not invent a fact.** Where the honest answer is still unknown, say so.

## 7. What you produce in stage one

`blotter-ib-ws1/docs/workstreams/ws9-build/28-WEBSITE-AUDIT.md`

1. **Every false claim**, by file and line, with what is true instead
2. **Every claim that is now stronger** and could be said plainly
3. **The visual inventory** — what survives, what needs re-shooting
4. **A plan for the setup page** — structure and copy, not built
5. **The `/privacy` slots**, each marked answerable-now or still-unknown
6. **What you would change first**, if only three things could be changed

**Do not write page code in stage one.** The copy is ratified; changing it is
Jon's ruling, and this list is what he rules on.

## 8. Report

Plain English. **Jon is not technical.** Lead with the worst thing the site
currently claims that is not true.
