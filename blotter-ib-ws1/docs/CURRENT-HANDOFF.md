# Blotter IB - Current Handoff

Date: August 5, 2026
Status: WS5 active. Sessions 1 and 2 complete. Stages 1 through 5 done. Ready for stage 6.

## 1. How this project is built

Jon ruled on August 4, 2026 that the landing page is built in this repository rather
than in Lovable. The Lovable project `Blotter Foundation` and its commits are
abandoned. No Lovable code was ported. The GitHub specifications were always the
source of truth; only the executor changed.

`WS5-SPEC.md` carries a notice naming the three passages that are stale as a result:
the Lovable project state, the file-upload protocol, and the plan-only intake
sequence. Everything else in it is binding.

## 2. How sessions work

One session equals one chat. A session ends when the work is committed and pushed,
this file is rewritten, and the assistant states explicitly that the session is
complete.

A new chat begins by reading `CLAUDE.md` and this file. Do not run sessions in
parallel: one repository, one builder.

Within a session, work proceeds by stage checkpoint: name the stage, name the
controlling specification, state the stop condition, build, review, approve.

| Session | Stages | Deliverable |
|---|---|---|
| 1 (complete) | 1-4 | Spec fixes, scaffold, foundation, SheetWindow |
| 2 (complete) | 5 | Hero, page theme, Section 2, desktop |
| 3 | 6 | Sections 3, 4, 5, desktop |
| 4 | 7 | Sections 6, 7, privacy policy page |
| 5 | 8 | Canonical funnel, all eight screens |
| 6 | 9-10 | Supabase, PostHog, responsive, accessibility, private deploy |

## 3. Technical stack, ratified by Jon August 4, 2026

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind v4 with CSS custom properties |
| UI primitives | Base UI 1.6.0 (accordions in Sections 6 and 7) |
| Funnel state | zustand |
| Variants | clsx and cva |
| Hosting | Vercel, private with deployment protection |
| Lead storage | Supabase (not yet provisioned) |
| Analytics | PostHog behind the provider-independent adapter (not yet connected) |

Application root: `web/`. Run with `pnpm --dir web dev`.

## 4. Completed in session 1

Specification reconciliation, the Next.js scaffold, the foundation (design tokens,
the nine-event analytics adapter with per-visitor suppression, the typed funnel
store, the CTA component carrying all four origins, the sticky header), and the
`SheetWindow` primitive with its grid, status chips, canonical data and the
comparison surface at `/review/sheet`.

Geometry reproduces the ratified hero at a 1006px window: 43px gutter, manual zone
43 to 415 (Name 108, Title 126, Firm 138), maintained zone 415 to 1005 (Status 132,
Next move 156, Last contact 112, Days 56, Call 134).

## 5. Completed in session 2

### Hero, under `01-HERO.md`

Three cue cards with exact copy, three direct connectors landing on Sarah Chen's,
Marcus Lee's and Alex Morgan's maintained blocks, the two ownership underlines, and
the surrounding copy from `WS4-SPEC` "Confirmed hero". The engine rail that
`hero-reference-v1.png` still draws is removed, per section 12.

The cue stack is deliberately uneven. The cues map to rows 1, 2 and 5, so an evenly
pitched stack would put a card level with Priya Shah or Daniel Kim and imply a
mapping that does not exist. Every card sits within 13px of its own target row and
no closer than 35px to any other. Cue centres are `[180, 243, 358]` from the window
top.

### Page theme, ratified mid-session

No specification had ever decided a page-level design system. It is now decided and
recorded in full in `04-decision-log.md`. In short: Schibsted Grotesk for display,
Geist for body and interface, Geist Mono for figures; the exact assets pinned to
their own type (Arial for Sheets, Roboto for Gmail) so a theme change can never
alter a ratified asset; one deep navy accent with the Blotter yellow kept semantic;
one continuous gradient down the whole page with sections alternating in tone;
pills for interactive elements and 12px for surfaces; light mode only; no motion.

### Section 2, under `02-SECTION-2` as amended

The first build was rejected by Jon as unreadable and unstructured beside the hero.
Three replacement treatments were built side by side behind a temporary review
route and compared live. The trajectory won; the other two and the route are
deleted.

What shipped: four volume bands across August to May, each built out of its own
real units, 628 dots, 68 squares, 30 rings and 19 bars, distributed by largest
remainder so each band sums exactly. The curve is the top of the piles. January and
February are marked as the hinge. The numerals carry the blue-to-cream ramp and act
as the legend.

Below it, the supporting statement beside the 60-hour proof, then the qualification
and methodology under a hairline, then the consequence visual as a single Gmail
inbox row with muted neighbours.

**Every amendment Jon made to `02-SECTION-2` is stamped at the top of that spec
file and reasoned in `04-decision-log.md`.** In short: closing paragraph cut,
supporting paragraph's first sentence cut, figures reordered descending, cards and
chart furniture permitted, and the full Gmail message view collapsed to an inbox
row.

### Layout system

Both sections align to one bounding box, `PAGE_BOX_W`, which is exactly the width
of the scaled hero visual, 1124px. The hero headline's left edge and the sheet's
left edge both land on 158; the supporting column's right edge, the cue column's
right edge and the box edge all land on 1282. Nothing is centred on the page.
**Sections 3 through 7 inherit this box. Do not introduce a second page width.**

The complete hero fits a 13-inch MacBook Pro: at 1440 by 780 the last content pixel
is at 766.

### Verification

Production build passes. Typecheck clean. Lint clean apart from one pre-existing
warning in `analytics.ts`. No horizontal scroll at 1440. Every mark count in the
Section 2 diagram was asserted in the DOM as exactly 628, 68, 30 and 19.

## 6. Decisions that are settled. Do not reopen without Jon.

Full reasoning for all of these is in `04-decision-log.md`.

**a. Maintained-zone row tint.** Header band alone; data rows carry no tint. The
section 8 revisit condition was resolved on August 5 once the full hero was
assembled: the cream header band, the zone divider and the yellow ownership
underline are three independent markers, so the connectors are not carrying the
signal alone. The `emphasised` flag and the unused row tokens are retained so
reversal is one line.

**b. Status chip colours**, from the ratified hero asset. Chip metrics were retuned
to the PNG when the sheet was pinned to Arial and the old values began clipping.

**c. Alex Morgan's em dash**, reinstated August 5, overriding the `01-HERO` section
6 genuinely-blank rule for that one cell only. Implemented as `{ dash: true }`,
which exists for this cell alone. Every other blank cell on every surface stays
genuinely blank.

**d. Date formats** `1/16/26`, `1/17 @ 2:00 PM`, `Completed 1/16`, from the ratified
PNG rather than the `01-HERO` section 6 prose table.

**e. The page theme and the bounded-box layout.**

**f. Every Section 2 amendment**, stamped in `02-SECTION-2` and reasoned in the
decision log.

## 7. Skill conflicts, recorded so they are not relitigated

`CLAUDE.md` requires skills be invoked autonomously and conflicts surfaced rather
than silently resolved. `design-taste-frontend` and `impeccable` were both invoked.
Five conflicts with ratified specification were surfaced and the specification
governs in all five: the em-dash ban versus Jon's ratified em dash; the cap of one
eyebrow per three sections versus the mandated eyebrows in the hero and Section 2;
the hero stack discipline versus the ratified five-element hero; the ban on
hand-built UI replicas and hand-rolled SVG icons versus `01-HERO` sections 2 and 14
and `02-SECTION-2` section 10, which require exactly that; and mandatory dark mode
versus the light-only Google Sheets and Gmail assets.

The `impeccable` design hook also flags `border-accent-on-rounded` on
`gmail-message.tsx`. It is a false positive: the element is the Google Calendar
icon in Gmail's application rail, and its darker top edge is the calendar's header
band, taken verbatim from the exact asset. No suppression has been added.

## 8. Open, flagged to Jon, not answered

`web/app/layout.tsx` sets the page title to `Blotter — the recruiting tracker that
stays current`. That em dash appears in the browser tab and contradicts the standing
no-em-dash rule for visible copy. Session-1 code, flagged three times, not changed
without instruction.

## 9. Waiting on Jon, not blocking until session 6

- Supabase project and credentials
- PostHog project API key

## 10. Deployment rule, unchanged

Keep the deployment private with protection enabled. Do not route `blotterib.com`.
Do not implement real OAuth, real Gmail, Calendar or Sheets integrations, or payment
collection. Do not route public traffic. Public launch waits for the matched
platform page, verified analytics and lead storage, passed privacy and claim gates,
and final launch authorisation.

## 11. Exact next action

Begin stage 6: Sections 3, 4 and 5, desktop only, under
`ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`,
`04-SECTION-4-OUTSTANDING-ACTIONS.md` and `05-SECTION-5-PRESERVATION.md`.

Section 3 uses the exact `how-blotter-works-exact-v1.avif` mechanism asset.
Section 4 needs a grouped grid body for the Outstanding Actions view, which
`SheetGrid` does not yet provide, and its CTA carries `cta_location = actions`.
Section 5 reuses `SheetWindow` with the ten-column preservation view and the exact
`preservation-exact-v1.html` asset.

Inherit the page theme, `PageBox` and the gradient bands. Do not rebuild any of
them. Extend `globals.css` with the next band, starting on the colour Section 2
ends on.

Two things worth knowing before you start. First, `components/section-2/gmail-message.tsx`
is a complete, verified translation of the exact Goldman Sachs asset at its native
1180 by 560 and is currently unused; Jon parked it in case a later section wants it,
so do not delete it as dead code. Second, Jon reviews visually and iterates hard on
composition. Build the ratified content first, then expect at least one round of
structural rework per section, and offer live side-by-side variants rather than
prose descriptions when a layout question is genuinely open. That is what resolved
Section 2.
