# Blotter IB - Current Handoff

Date: August 5, 2026
Status: WS5 active. Sessions 1 and 2 complete. Stages 1 through 5 done. Ready for stage 6.

## 1. How this project is built

Jon ruled on August 4, 2026 that the landing page is built in this repository rather
than in Lovable. The Lovable project `Blotter Foundation` and its P1, P2 and P3 commits
are abandoned. No Lovable code was ported. The GitHub specifications were always the
source of truth; only the executor changed.

`WS5-SPEC.md` now carries a notice naming the three passages that are stale as a result:
the Lovable project state, the file-upload protocol, and the plan-only intake sequence.
Everything else in it is binding.

## 2. How sessions work

One session equals one chat. A session ends when the work is committed and pushed, this
file is rewritten, and the assistant states explicitly that the session is complete.

A new chat begins by reading `CLAUDE.md` and this file. Do not run sessions in parallel:
one repository, one builder.

Within a session, work proceeds by stage checkpoint: name the stage, name the controlling
specification, state the stop condition, build, review, approve.

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

**Stage 1, specification reconciliation.** Outstanding Actions transcription corrected
against the ratified PNG. `Daniel Park` corrected to `Daniel Kim`. `WS4-SPEC` stamped with
a supersession table. Superseded decision log archived. Stale pointers fixed.

**Stage 2, scaffold.** Next.js app created in `web/`.

**Stage 3, foundation.** Design tokens, the nine-event analytics adapter with per-visitor
suppression, the typed funnel store, the CTA component carrying all four origins, and the
sticky header.

**Stage 4, SheetWindow primitive.** Approved August 5, 2026. Chrome, formula bar,
column-letter strip, tab strip, zoned grid body, five status chips, canonical hero data,
and the internal comparison surface at `/review/sheet`.

Geometry reproduces the ratified hero at a 1006px window: 43px gutter, manual zone 43 to
415 (Name 108, Title 126, Firm 138), maintained zone 415 to 1005 (Status 132, Next move
156, Last contact 112, Days 56, Call 134).

## 5. Completed in session 2

### Hero, under `01-HERO.md`

- `components/hero/activity-cue.tsx`, the three cue cards with exact copy
- `components/hero/hero-visual.tsx`, the assembled module: sheet, cues, connectors,
  ownership underlines, and the uniform scale wrapper
- `components/sections/hero.tsx`, the surrounding copy from `WS4-SPEC` "Confirmed hero"
- `components/google-marks.tsx`, the Gmail and Google Calendar marks

The engine rail that `hero-reference-v1.png` still draws is removed, per section 12.

Three connectors leave each card's left edge, run a shallow S through an 80px corridor, and
land with a small node on the right boundary of Sarah Chen's, Marcus Lee's and Alex
Morgan's maintained blocks. No crossings, no arrowheads.

The cue stack is deliberately uneven. The cues map to rows 1, 2 and 5, so an evenly pitched
stack would put a card level with Priya Shah or Daniel Kim and imply a mapping that does not
exist. Every card sits within 13px of its own target row and no closer than 35px to any
other, and the wide gap between the second and third card falls level with exactly the two
rows that carry no cue. Cue centres are `[180, 243, 358]` from the window top.

Ownership underlines are measured, not eyeballed: the gray rule spans x43 to x415 against
manual columns at 44 to 415.5, the yellow rule spans 415 to 1005 against maintained columns
at 415.5 to 1005.

### Page theme, ratified by Jon August 5, 2026

No specification had ever decided a page-level design system. It is now decided and recorded
in `04-decision-log.md`. Summary:

- Geist for the page, Geist Mono for figures
- the spreadsheet pinned to Arial and the Gmail visual to Roboto through `.sheet-type` and
  `.gmail-type`, so a page theme change can never alter a ratified asset
- one deep navy accent; the Blotter yellow stays semantic and appears only where the assets
  use it
- a light blue to cream hero field resolving to white before Section 2
- pills for interactive elements, 12px for surfaces
- light mode only, no motion

### Section 2, under `02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

- `components/section-2/gmail-message.tsx`, the exact Goldman Sachs Gmail view rebuilt as
  components at its native 1180 by 560, translated directly from
  `goldman-sachs-rejection-email-exact-v2.html`
- `components/sections/scale-and-consequence.tsx`, the full section in ratified order
- `components/layout/page-box.tsx`, the shared bounding box

All seventeen exact strings verified present in the rendered DOM. No CTA in the section, no
spreadsheet, no Blotter yellow, no icons outside the Gmail view, one email only.

### Layout system

Both sections align to one bounding box, `PAGE_BOX_W`, which is exactly the width of the
scaled hero visual, 1124px. The hero headline's left edge and the sheet's left edge both
land on 158; the supporting column's right edge, the cue column's right edge and the box
edge all land on 1282. Nothing is centred on the page. **Sections 3 through 7 inherit this
box. Do not introduce a second page width.**

The complete hero fits a 13-inch MacBook Pro: at 1440 by 780 the last content pixel is at
766.

### Verification

Production build passes. Typecheck clean. Lint clean apart from one pre-existing warning in
`analytics.ts`. No horizontal scroll at 1440. The rebuilt Gmail view was compared against
the asset side by side and does not read as a redesign.

## 6. Decisions that are settled. Do not reopen without Jon.

**a. Maintained-zone row tint.** The maintained zone is marked by the header band alone.
Data rows carry no tint and no per-row emphasis. Ruled August 5, 2026, supersedes `01-HERO`
sections 8 and 10.

The section 8 revisit condition was resolved on August 5 once the full hero was assembled:
the connectors are not carrying the signal alone. The cream header band, the heavier vertical
divider between Firm and Status, and the yellow ownership underline are three independent
markers of the maintained zone. The row tint stays off. The `emphasised` flag and the tokens
`--color-blotter-row` and `--color-blotter-row-strong` are retained unused so reversal is one
line.

**b. Status chip colours.** Replied blue, Call scheduled purple, Call completed green,
No reply amber, Sent gray, from the ratified hero asset.

**c. Alex Morgan's em dash.** Reinstated August 5, 2026, reversing the August 4 removal and
overriding the `01-HERO` section 6 genuinely-blank rule for that one cell only. Every other
blank cell on every surface stays genuinely blank. Implemented as `{ dash: true }`, which
exists for this cell alone.

**d. Date formats.** `1/16/26`, `1/17 @ 2:00 PM`, `Completed 1/16`, from the ratified PNG.
The `01-HERO` section 6 prose table writes these as `Jan 16` and `Jan 17, 2:00 PM`; Jon
ruled on August 5 that the session-1 code stands.

**e. The page theme.** See section 5 above and `04-decision-log.md`.

## 7. Skill conflicts, recorded so they are not relitigated

`CLAUDE.md` requires skills be invoked autonomously and conflicts surfaced rather than
silently resolved. `design-taste-frontend` was invoked for the theme and collides with
ratified specification in five places. The specification governs in all five and this is
settled:

1. Its em-dash ban versus Jon's ratified em dash.
2. Its cap of one eyebrow per three sections versus the mandated eyebrows in the hero and
   Section 2.
3. Its hero stack discipline, which caps the hero at four text elements, bans a tagline
   under the CTA and caps subtext at 20 words, versus the ratified five-element hero with a
   28-word subhead and the authority line below the CTA.
4. Its ban on hand-built UI replicas and hand-rolled SVG icons versus `01-HERO` section 2
   and 14 and `02-SECTION-2` section 10, which require exactly that. Icon libraries carry
   only monochrome Gmail and Calendar glyphs, which would not match the full-colour
   references.
5. Its mandatory dark mode versus the light-only Google Sheets and Gmail assets.

## 8. Open, flagged to Jon, not answered

`web/app/layout.tsx:11` sets the page title to `Blotter — the recruiting tracker that stays
current`. That em dash appears in the browser tab and contradicts the standing no-em-dash
rule for visible copy. Session-1 code, flagged twice, not changed without instruction.

## 9. Waiting on Jon, not blocking until session 6

- Supabase project and credentials
- PostHog project API key

## 10. Deployment rule, unchanged

Keep the deployment private with protection enabled. Do not route `blotterib.com`. Do not
implement real OAuth, real Gmail, Calendar or Sheets integrations, or payment collection. Do
not route public traffic. Public launch waits for the matched platform page, verified
analytics and lead storage, passed privacy and claim gates, and final launch authorisation.

## 11. Exact next action

Begin stage 6: Sections 3, 4 and 5, desktop only, under
`ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`,
`04-SECTION-4-OUTSTANDING-ACTIONS.md` and `05-SECTION-5-PRESERVATION.md`.

All three consume existing primitives. Section 3 uses the exact
`how-blotter-works-exact-v1.avif` mechanism asset. Section 4 needs a grouped grid body for
the Outstanding Actions view, which `SheetGrid` does not yet provide, and its CTA carries
`cta_location = actions`. Section 5 reuses `SheetWindow` with the ten-column preservation
view and the exact `preservation-exact-v1.html` asset.

Inherit the page theme and `PageBox`. Do not rebuild either.
