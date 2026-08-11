# Desktop changes decided in the mobile build, not yet applied

Date opened: August 10, 2026, session 6
Status: **Open. Nothing here has been applied to the desktop page.**

## What this file is for

Stage 10 is the mobile build, and Jon's instruction on August 10, 2026 was that
`blotterib.com` is not to change during it. But the mobile work keeps surfacing
things that are wrong on **both** surfaces, and a decision made in this session
and then forgotten is worse than one never made.

So: anything decided here that belongs on desktop lands in this file instead of
in the desktop page. A later session works down the list in one pass.

**This is not a wish list.** Every row is a decision Jon has already taken or a
defect already confirmed. Speculative ideas belong in
`06-assumptions-and-open-questions.md` with a revisit trigger, not here.

## How to read the status column

| Status | Meaning |
|---|---|
| **Decided** | Jon has ruled. Apply it. |
| **Confirmed defect** | Measured and reproducible. Fix it. |
| **Already applied** | Landed on desktop as a side effect. Listed so nobody applies it twice. |

---

## 1. The Sheets scope note — ALREADY APPLIED

**Status: already applied. Do not apply again.**

`SHEETS_SCOPE_NOTE` in `web/lib/privacy-copy.ts`:

> Granted through Google Drive, limited to the one file you connect.

It renders in the desktop Google Sheets column of Section 6 as well as on
mobile, because `ServiceLists` is shared. Desktop Section 6 grew 50px for it and
nothing else.

It is listed here only because Jon asked on August 10 for that line to reach the
desktop page and it is easy to read that as outstanding. It is not.

**Why the heading and the mark stay `Google Sheets`**, on Jon's argument and it
is the better one: a Drive *icon* implies the whole Drive, which is the opposite
of what `drive.file` grants. The icon should name what Blotter touches — one
sheet — and the words carry the plumbing. Three surfaces now agree: `/privacy`
prints Google's own Drive wording beside the scope, Film B shows Google's Drive
card and then Blotter's card naming the one tracker file, and Section 6 carries
this sentence.

**If a connection provider is ever selected and its consent screen differs, this
sentence is wrong and must change with it.**

---

## 2. Two CTAs on one screen — DECIDED, MOBILE ONLY

**Status: decided for mobile. Desktop unaffected and must stay so.**

On a phone the sticky header's CTA and the hero's own CTA are both on the first
screenful — two controls, same four words. Three arrangements were built and
Jon compared them on his phone on August 10, 2026: bottom bar with a brand-only
header, both buttons and no bar, and header button only.

**He chose both buttons and no bar.** The sticky bottom bar he had approved
earlier the same day is not mounted on the live page: it cost 85px of every
screenful permanently, and once he saw the doubling in place it read as
persistence rather than as a mistake. `StickyCta` and the
`cta_location = "sticky"` enum value are kept so the decision is reversible
without touching the analytics contract; nothing fires it today.

**Desktop does not have this problem** and nothing here changes it: a desktop
reader sees the whole hero at once, the four ratified placements are
`PLAN-AMENDMENTS-2026-08-01.md`'s, and the header CTA is the only persistent
one. Recorded so a later session does not "fix" desktop to match a mobile
decision that was never about desktop.

---

## 3. Section 6's opening line is a throat-clear — DECIDED, MOBILE ONLY

**Status: decided for mobile. Desktop deliberately unchanged.**

`PRIVACY_OPENING` — *"Connecting Gmail, Calendar, and Sheets is a meaningful
permission. Here is exactly what Blotter checks, what it reads, what it keeps,
and what it never does."* — is now `hidden desk:block`.

It announces what is coming rather than saying it, and on a phone it is 180px of
prose between the reader and the claim that answers them. On desktop it earns
its place filling the right-hand column of the established two-column head, so
it stays.

**If a later session ever restyles the desktop Section 6 head, reconsider it
there too** — the argument that it says nothing is not a mobile argument.

---

## 4. The closing block is broken below the breakpoint — CONFIRMED DEFECT

**Status: confirmed defect. Mobile fix is stage-10 work and is next in the
order. Desktop is fine and must not change.**

Measured at 390px on August 10, 2026:

| Element | What it does |
|---|---|
| Closing headline | 26px type wrapping inside a **187px** column, 95px tall |
| `Try Blotter Now` | squeezed to **115px wide by 72px tall** — the label wraps *inside the pill* |
| Brand, privacy link, social marks | still jammed onto one row |

It is the desktop two-column footer crammed into a phone. At 1440 it is correct
and is not to be touched.

---

## 5. Section numbering is on for mobile and off for desktop — DECIDED, HALF APPLIED

**Status: decided and live on mobile. Desktop is the open half.**

Jon chose `01` on August 10, 2026, over `01 / 05` and over nothing, after
comparing all three on his phone. It renders below `--breakpoint-desk` and not
above it, so **the two surfaces currently disagree about whether this page has
numbered sections.**

That is a known cost rather than an oversight. Turning it on for desktop means
overriding four build specs that forbid an eyebrow, because a numeral above a
headline reads as one:

| Spec | Clause |
|---|---|
| `04-SECTION-4` | §101 "There is no eyebrow in Section 4", §351 exclusion list |
| `05-SECTION-5` | §74 "There is no eyebrow", §253 exclusion list, §292 |
| `06-SECTION-6` | §157 "There is no eyebrow" |
| `07-SECTION-7` | §85 "no eyebrow", §269 exclusion list |

Five blocks are numbered and the hero is not, because the hero is the opening
rather than a place a reader navigates to. If desktop adopts this, the numbering
must match mobile exactly or the page contradicts itself between devices.

**Why Jon rejected the total.** `01 / 05` read as a progress meter, and this
page is an argument rather than a form.

## 6. The rule before the authority line — RESOLVED ON MOBILE, DESKTOP UNDECIDED

**Status: settled for mobile. Desktop unchanged and never discussed.**

`Built by a former Goldman Sachs banker for recruitment.` is preceded by a 32px
hairline on desktop. Jon called it "the big dash", it was hidden below the
breakpoint, and it then came back at **12px, centred under the full-width CTA**
— the arrangement he asked for and the one that stopped the line reading as an
orphan.

So the mobile answer is not "no rule", it is "a shorter rule, centred". The
desktop 32px rule is untouched and was never the thing he objected to; he was
looking at a phone throughout. **Ask before the next desktop pass** rather than
assuming the mobile judgement transfers — on desktop the line sits inside a
490px column where a longer rule has an origin to start from.

## 7. The methodology footnote gained four words — ALREADY APPLIED

**Status: already applied to both surfaces. Do not apply again; do not revert
without Jon.**

`02-SECTION-2` line 140 fixes this string verbatim and §5 requires exact copy,
so this is an override, taken by Jon on August 10, 2026:

| Before | After |
|---|---|
| `Estimated from manual Gmail and Calendar logging, ...` | `Hours saved estimated from manual Gmail and Calendar logging, ...` |

Only the opening changes. Every other word is untouched.

**Why the mobile build caused it.** §253 asks the methodology to sit
"immediately beneath or adjacent" to the proof it explains, and §563 repeats it.
On desktop it does — it is in the column under the `~60 hours` line. On a phone
both footnotes now fold into one disclosure further down the section, so the
adjacency that told a reader *what* was estimated is gone. Naming it in the
sentence restores that, and it is clearer on desktop too, which is why the
shared string was changed rather than a mobile-only variant introduced.

Desktop Section 2 is unchanged in height by it.

## 8. Five real links inside an illustrative spreadsheet — CONFIRMED DEFECT

**Status: confirmed defect on both surfaces. Queued for the Phase 6
accessibility sweep, not fixed yet.**

`components/section-45/parts.tsx:234` renders each sheet row's LinkedIn cell as
a genuine anchor to `https://www.linkedin.com`:

```
<a href="https://www.linkedin.com" className="text-chip-replied-fg underline">Here</a>
```

They are spreadsheet *content* in an illustrative asset, not navigation. Five of
them sit in the tab order, a screen reader announces "link, Here" five times in
a row with no context, and they measure **14 x 26px on desktop and 4 x 8px at
390** because the whole composition is scaled to fit.

**The fix is markup-only and changes nothing visually on either surface**:
render them as text rather than as anchors, keeping the blue and the underline
so the cell still reads as a spreadsheet hyperlink. That removes five phantom
destinations from the tab order and five meaningless announcements from the
screen-reader pass.

It is listed here because the file is shared, so the change lands on desktop
too — with zero visual delta, which is why it is safe to do in the sweep rather
than in a desktop pass.

## 9. Copy written for mobile that has not been ratified

**Status: unratified. Must go to Jon before public traffic if kept.**

| String | Where | Note |
|---|---|---|
| `SUPPORTING_SHORT` in `components/sections/hero.tsx` | **live on the mobile hero** — Jon chose it over the full paragraph and over nothing | A condensation of the ratified hero paragraph, not a new claim. Never renders above `desk`, which still gets the ratified sentence in full |
| `What each connection can and cannot do.` | mobile Section 6, above the three service rows | Replaced the per-row `2 can · 3 cannot` counts, which Jon read as a spec sheet on a section about trust |

Both follow the page's standing rules: no dash, no availability signal, no claim
the product cannot support.

---

## 10. Things this session deliberately did **not** change on desktop

Recorded so the absence reads as a decision rather than an oversight.

- **Every ratified scale.** Hero 0.8502, Section 3 0.9607, Sections 4 and 5
  0.9206. Verified identical before and after the responsive skeleton.
- **The desktop hero composition.** The sheet, the three activity cues and their
  connectors. Film C is the mobile hero only; whether desktop should also become
  a film is an open row in `06-assumptions-and-open-questions.md`.
- **Section 6's three-column permissions layout**, its two side-by-side
  footnotes, and the order of everything in it.
- **The funnel**, including which film it plays. Film A stays.
- **`page.tsx` section order.**

## 11. Bugs the mobile build found that were latent on desktop — ALREADY FIXED

Listed for the record; all three are already in `main`'s history on the `mobile`
branch and need no further action.

- **Section 3's rail** was measured in post-transform screen pixels and applied
  in pre-transform natural pixels. At the fixed 0.96 scale it sat 4% short and
  was invisible; any change of scale would have broken it visibly.
- **Section 2's diagram** was being scaled *up* by 0.36% — a ratified
  composition resampled to gain four pixels.
- **Five flex items** carried the default `min-width: auto` and could not shrink
  below their longest unbreakable line.

## 12. Two of five rows in the Blotter tab are 50% too tall — CONFIRMED DEFECT

**Status: confirmed defect, live on `blotterib.com` today, on both surfaces.
Not fixed. Desktop does not change during stage 10.**

Found on August 11, 2026 while building the phone crop, by measuring the live
page rather than by looking at it.

Natural row heights in the Section 4+5 `Blotter` tab, taken from the live DOM
and divided back out of the ratified 0.9206 scale:

| Row | Natural height |
|---|---|
| Sarah Chen | 40.5px |
| **Marcus Lee** | **60px** |
| **Priya Shah** | **60px** |
| Daniel Kim | 40.5px |
| Alex Morgan | 39.5px |

**The cause, measured rather than guessed.** The `Call` column is 112px with
24px of padding, so 88px of text width. `1/17 @ 2:00 PM` needs **94.1px** and
`Completed 1/16` needs **91.8px** at 13px Arial. Both wrap to two lines, and
those two contacts are the only two with a `Call` value. Every other cell in the
grid is a single line. `Email` also overflows on two rows but is `truncate`d, so
it clips rather than growing the row — which is exactly the behaviour `Call`
should have.

**Why it counts as a defect rather than a composition choice.** A Google Sheets
row does not grow to fit its content; it clips at the cell boundary. This is the
page's "reusable high-fidelity Google Sheets window" (`WS4-SPEC.md:644`), and two
double-height rows in an otherwise uniform grid read as a rendering artefact
rather than as a spreadsheet.

**The fix, and it costs no ratified geometry.** Move 8px from `Email` to `Call`
in `components/section-45/parts.tsx` — `Email` 196 to 188, `Call` 112 to 120.
`Email` has 16.5px of slack it is already truncating away, `Call` is short by
6.1px, and `SHEET_W` stays 1,221px, so **every ratified scale is unchanged to
the pixel** and the desktop delta is three row heights returning to 40.5px.

Not applied. It is a desktop-visible change and stage 10 forbids those; it wants
a before-and-after height measurement of the whole section when it is done.
