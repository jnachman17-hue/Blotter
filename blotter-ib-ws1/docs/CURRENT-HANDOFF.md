# Blotter IB - Current Handoff

Date: August 5, 2026
Status: WS5 active. Sessions 1, 2 and 3 complete. Stages 1 through 6 done.
Ready for stage 7.

## 1. How this project is built

Jon ruled on August 4, 2026 that the landing page is built in this repository
rather than in Lovable. The Lovable project `Blotter Foundation` and its commits
are abandoned. No Lovable code was ported. The GitHub specifications were always
the source of truth; only the executor changed.

`WS5-SPEC.md` carries a notice naming the three passages that are stale as a
result: the Lovable project state, the file-upload protocol, and the plan-only
intake sequence. Everything else in it is binding.

## 2. How sessions work

One session equals one chat. A session ends when the work is committed and
pushed, this file is rewritten, and the assistant states explicitly that the
session is complete.

A new chat begins by reading `CLAUDE.md` and this file. Within a session, work
proceeds by stage checkpoint: name the stage, name the controlling
specification, state the stop condition, build, review, approve.

**One repository, one builder — with two recorded exceptions.** Session 3 ran
two side chats in parallel, both safe because their files were isolated and
neither was allowed to commit: the social-media asset kit in
`web/public/brand/`, and a `social/` directory for a launch animation. If you
run a parallel chat, the rules are: it edits only its own directory, it treats
`web/lib/brand.ts` and `web/components/brand/` as read-only, it never runs
`git add`/`commit`/`push`, and it never starts a dev server. Port 3000 is taken
and `next dev` refuses a second instance in the same directory.

| Session | Stages | Deliverable |
|---|---|---|
| 1 (complete) | 1-4 | Spec fixes, scaffold, foundation, SheetWindow |
| 2 (complete) | 5 | Hero, page theme, Section 2, desktop |
| 3 (complete) | 6 | Brand identity, Section 3, Sections 4+5 merged, desktop |
| 4 | 7 | Sections 6, 7, privacy policy page |
| 5 | 8 | Funnel — **if Jon still wants one.** See section 8. |
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

## 4. Completed in sessions 1 and 2

Session 1: specification reconciliation, the Next.js scaffold, the foundation
(design tokens, the nine-event analytics adapter with per-visitor suppression,
the typed funnel store, the CTA component carrying all four origins, the sticky
header), and the `SheetWindow` primitive with its grid, status chips, canonical
data and the comparison surface at `/review/sheet`.

Session 2: the hero at its ratified geometry, the page theme, and Section 2 as a
volume trajectory built from 745 real marks. Both sections align to one bounding
box, `PAGE_BOX_W` = 1124px. **Sections 3 through 7 inherit it. Do not introduce
a second page width.**

Full detail for both is in `04-decision-log.md`.

## 5. Completed in session 3

### The brand identity, newly created

No canonical identity existed before this session. It now does, and it is
ratified.

The mark is **`Ledger B`**: the letter built from the spreadsheet rather than
decorated with it, its two bowls rows and its stem the row-number gutter. The
wordmark is **Schibsted Grotesk 700 at -0.035em**. The colour is **navy alone** —
yellow and cream are unavailable to the identity because they are semantic on
this page and mean "Blotter maintains this".

- `web/lib/brand.ts` — colour, the ratios that generate the lockup, tracking and
  weight, clear space, and the size floors. Below a 16px mark the gutter hairline
  closes and it resolves to a plain solid B.
- `web/components/brand/blotter-mark.tsx` — `BlotterMark`, `BlotterWordmark`,
  `BlotterLockup`, `BlotterTile`. The glyph is drawn once and every component
  consumes it, so the favicon and the header cannot drift apart.
- `web/app/icon.svg` — favicon, reversed mark on a navy tile.
- `web/public/brand/` — SVG exports plus `blotter-brand-kit.html`, a
  self-contained page that draws thirteen social assets at exact platform pixel
  sizes and downloads them as real PNGs. Open it directly; it needs no server.

### Section 3, `How Blotter works`

The formal exact asset is discarded and the mechanism rebuilt as **one Friday,
three moments, one tracker**. Not a flow. Columns run in causal order — when,
what happened, Blotter, what the tracker says — so the ratified stage labels
land in their required order without a pipeline diagram.

Daniel Kim opens it on silence: no email, no calendar event, just day five
arriving. Then Sarah's reply, then Priya's coffee chat. One of each trigger
type, and the one a person cannot notice unaided goes first.

The section resolves with the boundary line facing three product-boundary
statements in a warm panel, each carrying a struck symbol. The third is the
ChatGPT mark, which overrides the "provider references" exclusion.

### The hero, amended

The third activity cue moves from Alex Morgan to Daniel Kim,
`No reply for 5 days` / `Last contact Jan 11`. The cue stack was retuned from
`[180, 243, 358]` to `[180, 243, 322]`; connector endpoints were asserted in the
DOM at 192.25, 235.75 and 322.75. Alex Morgan's row and its ratified em dash are
untouched.

### Sections 4 and 5, merged

**One section, two beats, sharing a tab strip.** `components/sections/tracker-and-actions.tsx`.

Beat 1 is the ten-column Blotter tab with loud zone labels above it and the
cream carried down every maintained cell. Beat 2 is the Outstanding view with
its three groups running as **columns**, so all 21 actions fit in thirteen rows
and the follow-ups column visibly runs twice as long as the others. The CTA
follows, `cta_location = actions`.

Eighteen of the twenty-one action contacts are invented. Flagged and accepted.

### Verification

Production build passes. Typecheck clean. Lint clean apart from one pre-existing
warning in `analytics.ts`. No horizontal scroll at 1440. The page is 5,003px,
about 5.6 screens. Section 3's copy was diffed against the spec in the DOM: every
line exact, no CTA, zero em or en dashes.

## 6. Decisions that are settled. Do not reopen without Jon.

Full reasoning for all of these is in `04-decision-log.md`.

**a. The brand identity** — mark, wordmark, navy-only colour.

**b. Maintained-zone row tint.** Header band alone in the hero and Section 3.
The merged Section 4+5 is the deliberate exception: the cream runs down every
maintained cell there because that section's job is the ownership split itself.

**c. Status chip colours**, from the ratified hero asset.

**d. Alex Morgan's em dash** — the only one on the page. A ruling about the cell,
not the cue.

**e. Date formats** `1/16/26`, `1/17 @ 2:00 PM`, `Completed 1/16`.

**f. The page theme and the bounded-box layout.** The semantic colour rule was
relaxed on August 5 for Section 3's resolution block only.

**g. Every Section 2 amendment**, stamped in `02-SECTION-2`.

**h. Every session 3 amendment**, stamped at the top of `01-HERO`,
`03-SECTION-3`, `04-SECTION-4` and `05-SECTION-5`.

## 7. Exact next action

Begin stage 7: **Sections 6 and 7, plus the privacy policy page.**

Section 6, `How Blotter uses your data`, under `06-SECTION-6-DATA-AND-PRIVACY.md`.
It is a document, not a marketing section — left-aligned, calm, thin rules, no
eyebrow, no CTA, no gradients, no shields or seals, and a background materially
different from the product-demonstration sections above it. Eleven parts in fixed
order: title and opening statement, the candid claim, the four-step processing
explanation, the exact permissions table, the broad Google-permission disclosure,
`What Blotter keeps`, plain commitments, the account-deletion statement, the
third-party connection-provider disclosure, its own privacy FAQ, and the
privacy-policy link. Do not merge its FAQ into Section 7's.

Section 7, under `07-SECTION-7-FAQ-AND-FINAL-CTA.md`: five exact FAQ questions in
accordions, then the final closing block and the page's last CTA,
`cta_location = final`. Base UI 1.6.0 is the ratified accordion primitive and is
not yet installed.

The gradient extends with the next band starting on `--field-e` (#eef3fa), where
Sections 4+5 end. `--color-closing` is still unused and was reserved for Section
7's final CTA — Section 3's resolution block deliberately stayed light so that
one dark moment on the page keeps its weight.

**Expect Jon to reject at least one ratified asset or presentation rule per
section.** That happened for Section 2, Section 3, Section 4 and Section 5. The
pattern that works: build the ratified content, then build live side-by-side
variants behind a temporary review route under `/review/`, let him flip between
them, delete the losers and the route. Prose descriptions do not work — he said
so three times in this session. Show, do not describe.

## 8. Open, flagged to Jon, not answered

- **The funnel may be cut entirely.** Jon said on August 5 that he may not want
  a funnel behind `See how Blotter works`, preferring everything on the page
  behind a single direct CTA such as `Try Blotter now`. He ruled that ratified
  funnel frames must not constrain landing-page design. Stage 8 is therefore
  conditional. Do not build funnel screens until he decides.
- **Section 3's boundary box gradient.** Jon suggested a blue-to-cream gradient
  inside it, echoing the sheet header band above. Approved in principle, queued,
  not built.
- **The messy-spreadsheet concept**, parked. The rear sheet in a stacked-tabs
  treatment rendered as the stale, unformatted spreadsheet the reader actually
  has, which Blotter converts. Jon's idea, worth its own round.
- **`web/app/layout.tsx` page title** carries an em dash in the browser tab,
  contradicting the standing no-em-dash rule for visible copy. Session-1 code,
  flagged four times, unchanged without instruction.
- **A launch animation** for social, roughly ten seconds, to be built in a
  separate chat under `social/`.

## 9. Waiting on Jon, not blocking until session 6

- Supabase project and credentials
- PostHog project API key

## 10. Deployment rule, unchanged

Keep the deployment private with protection enabled. Do not route
`blotterib.com`. Do not implement real OAuth, real Gmail, Calendar or Sheets
integrations, or payment collection. Do not route public traffic. Public launch
waits for the matched platform page, verified analytics and lead storage, passed
privacy and claim gates, and final launch authorisation.

## 11. Things worth knowing before you start

`web/components/section-2/gmail-message.tsx` is a complete, verified translation
of the exact Goldman Sachs asset at its native 1180 by 560 and is currently
unused. Jon parked it in case a later section wants it. Do not delete it as dead
code.

`SheetWindow` gained two capabilities this session: an empty `tabs` array omits
the tab strip entirely, and `columnWidths` now accepts numbers as well as
Tailwind utilities. Use numbers for any width computed at runtime — a
template-built `w-[123px]` never reaches the Tailwind compiler and the
column-letter strip silently stops aligning over its columns.

The `impeccable` design hook flags the prototype picker's `width` transition on
every review route. It is a false positive: the picker is copied verbatim from
`.claude/skills/prototype/PICKER.md`, which documents that transition as a
deliberate exception. No suppression has been added.
