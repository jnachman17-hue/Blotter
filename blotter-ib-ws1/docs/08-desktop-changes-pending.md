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

## 2. Two CTAs on one screen — DECIDED IN PRINCIPLE, MOBILE ONLY SO FAR

**Status: decided for mobile, open for desktop.**

On a phone the sticky header's CTA and the hero's own CTA are both on the first
screenful — two controls, same four words. `/review/hero` runs the two ways out
of it and Jon picks.

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

## 5. Copy written for mobile that has not been ratified

**Status: unratified. Must go to Jon before public traffic if kept.**

| String | Where | Note |
|---|---|---|
| `SUPPORTING_SHORT` in `components/sections/hero.tsx` | mobile hero, `supporting="short"` variant only | A condensation of the ratified hero paragraph, not a new claim. Never renders above `desk` |
| `What each connection can and cannot do.` | mobile Section 6, above the three service rows | Replaced the per-row `2 can · 3 cannot` counts, which Jon read as a spec sheet on a section about trust |

Both follow the page's standing rules: no dash, no availability signal, no claim
the product cannot support.

---

## 6. Things this session deliberately did **not** change on desktop

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

## 7. Bugs the mobile build found that were latent on desktop — ALREADY FIXED

Listed for the record; all three are already in `main`'s history on the `mobile`
branch and need no further action.

- **Section 3's rail** was measured in post-transform screen pixels and applied
  in pre-transform natural pixels. At the fixed 0.96 scale it sat 4% short and
  was invisible; any change of scale would have broken it visibly.
- **Section 2's diagram** was being scaled *up* by 0.36% — a ratified
  composition resampled to gain four pixels.
- **Five flex items** carried the default `min-width: auto` and could not shrink
  below their longest unbreakable line.
