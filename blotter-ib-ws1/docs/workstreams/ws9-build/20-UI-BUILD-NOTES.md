# The UI build — what was done overnight, and what needs Jon

Date: September 3, 2026
Built by: the conductor chat, working alone
Review surface: **https://claude.ai/code/artifact/4f32d356-193a-49e0-a203-7a321fd1e8bb**

**Everything is code in `courier/Code.gs`, applied by `Step 1: Set up this
sheet`.** Nothing was hand-made in a spreadsheet, because a hand-made sheet
reaches one person and `setupSheet` reaches everyone who copies the template.

`node courier/helpers.test.js` — **156 checks, up from 87.**

---

## 1. The finding that decided the whole job

**The website's hero is an iframe rendering a faithful Google Sheets mock**
(`web/public/film/blotter-film-web-hero.html`), and it is a far better spec than
the site's own CSS, because it was drawn to look like Sheets and the site was
not.

**It renders in Arial with Google's own greys — not Geist.** So "match the site"
resolves to *match what the site is imitating*, which is Sheets' own font and
needs nothing loaded. **Nothing in the sheet is monospaced**; right alignment
does the work a monospaced face would.

## 2. The two treatments are the site's own, not inventions

Jon asked for bold and restrained and offered to pick. **He already ratified
both**, and they are the site's two drawings of one idea.

| | `THEME = 'hero'` | `THEME = 'zoned'` |
|---|---|---|
| Manual header | `#edf2f8` | `#edf2f8` |
| Manual rows | **white** | `#f7f9fc` |
| Maintained header | `#f7f2e8` | `#f7f2e8` |
| Maintained rows | **white** | `#fdfaf2` |
| Divider | 2px `#dadce0` | **3px `#d9b64a`** |
| Where it lives | the homepage hero, `01-HERO` §8 as amended August 5 | Section 02's ten-column tab |

**Switching is one constant.** `zoned` is the current default because Jon leaned
bold; `hero` is one word away.

## 3. What was built

- **Contacts** — column widths, Arial throughout, tinted header bands per zone,
  italic muted `Title`, muted `Email`, right-aligned `Days` and `Attempts`, date
  formats, eight conditional-format status rules, the zone divider, a second
  divider before `Closed`, frozen header and Name column, 26px rows
- **Found** — cream header, wrapped `Context`, and four conditional formats so
  `Yes` reads as a decision, `Added` as settled, `Ignored` as spent
- **Settings** — Blotter's own readings muted so they do not look like something
  to fill in, and **the time machine row in red**, because it is the one setting
  that can quietly falsify the entire sheet
- **`Start here`** — a new first tab. Gridlines off, one column of prose, a live
  status legend drawn in the real colours so it cannot drift from the sheet it
  explains, and three marked slots for Jon's screenshots
- **`Next call` fixed.** It rendered `2026-09-03T14:00:00-07:00`. Dates are now
  written as real Dates and formatted `1/17 @ 2:00 PM` — so they sort and
  compare properly too

### Both extra fixes, done

**Handover** is a menu item that empties Contacts and Found in place. It does not
*copy*: the manifest's only Drive scope is `spreadsheets.currentonly`, so the
script cannot create a file, and **adding a Drive scope to save one menu click
would widen what every student has to grant.** Clear, then File → Make a copy.

**The update path** now has `missingSetup_()`, which lists any tab or setting an
older sheet lacks. `ensureSettingRow_` is idempotent, so the remedy is always
"run Step 1 again".

**And a third, unasked for:** Step 1 now reports the sheet's **time zone**. It
travels with a copy, it decides when a day turns over, and a student in New York
working from a Chicago template gets every `Days` value wrong at the boundary —
silently, in a way that looks completely normal.

## 4. Three bugs the research caught in the first draft

Worth recording because none would have failed loudly.

1. **A merged cell with wrapped text does not grow to fit — it clips, with no
   error.** Every prose row on `Start here` is merged, so every height is now
   set by hand with slack. **Lengthening a line without raising its height will
   cut the sentence off and nothing will say so.**
2. **Successive `setBorder` calls can drop earlier ones** without a
   `SpreadsheetApp.flush()` between them. Added.
3. **A top-level `SpreadsheetApp.` reference runs on every execution** and made
   the whole file unloadable by `helpers.test.js`. The border style moved into a
   function. Caught because the test suite went silent.

## 5. A test that was wrong, and the finding underneath it

The design research reported that both zoned data fills sit **45% of the way
from white to their header tint**. A test was written to pin that.

**It is true of the manual pair (0.44 / 0.46 / 0.43) and simply untrue of the
kept pair (0.25 / 0.39 / 0.57)**, which was picked by eye. The ratified colours
are the colours, so the assertion was replaced with the invariant that actually
matters: **each fill must be lighter than its own header on every channel.** Get
that backwards and the two zones invert, and nothing else would catch it.

Recorded so nobody later "corrects" `#fdfaf2` to satisfy a rule the design does
not follow.

---

## 6. What needs Jon

### ⚠ 6.1 A ratified spec asks for something code cannot build

**`01-HERO` §5 requires "restrained Google Sheets-style dropdown chips rather
than full-cell status fills", and lists full-cell fills under Avoid.**

**Dropdown chip colour is UI-only.** Confirmed against the live Sheets API v4
discovery document: `DataValidationRule` has four properties and none of them is
a display style or a colour. Apps Script has no method either. It is an open
feature request.

So the ratified treatment **cannot be produced by `setupSheet`, ever.** Built as
conditional formatting — a tinted cell with the exact ratified text colour —
which is what §5 says to avoid.

**The options, and this is Jon's:**

- **Accept tinted cells** and amend §5. What is built now
- **Hand-build the chips once** in a master and never let setup touch the
  `Status` validation. Real pills, but **Sheets picks the text colour**, so
  every ratified `-fg` value is lost, and the treatment then exists only in
  sheets copied from that master
- A **narrow colour rail** beside `Status` — colour without a full-cell fill,
  arguably §5-compatible

**Surfaced rather than decided, per `CLAUDE.md`: the spec governs, and this one
cannot be honoured as written.**

### ⚠ 6.2 The banner row was not built

The live site labels the split with a **merged banner above the headers** —
`You add these` / `Blotter keeps these current`. It is the most faithful device
in the whole design and it reproduces exactly in Sheets.

**Not built.** It shifts every data row down one, and the row number is **the
contract's join key**, hardcoded in eleven places across reading, writing,
checkboxes and the approve flow. Refactoring that overnight with no way to run
it risks silently corrupting which contact gets which answer.

**The right way is `HEADER_ROW` detected rather than assumed**, so it works with
or without a banner and stays backward compatible with Jon's existing sheet.
That is a session with a live sheet in front of it, not an unattended one.

### ⚠ 6.3 Three smaller ones

- **`Closed` sits past Blotter's columns**, so the sheet reads *yours ·
  Blotter's · yours*. Given the manual tint and a second divider. Fine, or move
  it?
- **`Not emailed` and `Closed` share a colour.** Deliberate — both mean Blotter
  is idle — but they may want telling apart
- **`setHorizontalAlignment('right')`** is used on `Days` and `Attempts`. Google
  documents only `left`, `center` and `normal`; `right` is universally used and
  works, but it is undocumented. **If those columns come back left-aligned, that
  is why**

## 7. Not done, deliberately

- **Warning-only protection** on Blotter's six columns. It cannot lock the sheet
  owner out — only turn silent corruption into a deliberate act. Worth having,
  not worth adding untested tonight
- **Jon's screenshots.** Three marked slots on `Start here` await them
- **Nothing was run.** Every claim here is from reading, from
  `helpers.test.js`, and from Google's own API documentation. **The sheet itself
  has never been seen.**
