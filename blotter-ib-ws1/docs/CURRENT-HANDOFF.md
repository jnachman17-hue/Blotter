# Blotter IB - Current Handoff

Date: August 5, 2026
Status: WS5 active. Session 1 complete. Stages 1 through 4 done. Ready for stage 5.

## 1. What changed about how this project is built

Jon ruled on August 4, 2026 that the landing page is built in this repository
rather than in Lovable. The Lovable project `Blotter Foundation` and its P1, P2
and P3 commits are abandoned. No Lovable code was ported. The GitHub
specifications were always the source of truth; only the executor changed.

Consequences:

- The private-repository file-transfer protocol in `LOVABLE-PLAN-AND-BUILD.md`
  section 5 is moot. The repository is the working directory.
- `LOVABLE-PROJECT-KNOWLEDGE.md` is superseded by `CLAUDE.md` at the repo root.
- Plan-only intake is replaced by stage checkpoints with the same discipline:
  name the stage, name the controlling specification, state the stop condition,
  review, approve.
- Binary assets can be written directly, which unblocked the Section 2 asset.

Every build specification, WS2, WS3, WS4, the asset authority system, the
nine-event contract and all acceptance criteria remain binding and unchanged.

## 2. How sessions work

One session equals one chat. A session ends when the work is committed and
pushed, this file is rewritten, and the assistant states explicitly that the
session is complete.

A new chat begins by reading `CLAUDE.md` and this file. Do not run sessions in
parallel: one repository, one builder.

Session map:

| Session | Stages | Deliverable |
|---|---|---|
| 1 (complete) | 1-4 | Spec fixes, scaffold, foundation, SheetWindow |
| 2 | 5 | Hero and Section 2, desktop |
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

**Stage 1, specification reconciliation.** All authorised by Jon.

- Outstanding Actions transcription corrected against the ratified PNG in
  `04-SECTION-4`, `WS4-SPEC` and the asset README. The prose described two rows
  per group naming Marcus Lee, Alex Morgan and James Wu. The asset shows one row
  per group: Sarah Chen, Daniel Kim, Priya Shah, with overflow +5, +10, +3, and
  tabs `Contacts` and `Outstanding`. The asset is internally consistent with the
  hero on January 16 and is authoritative.
- `Daniel Park` corrected to `Daniel Kim` in funnel Frames 1 and 2.
- Em dash removed from Alex Morgan's `Next move` in the Section 5 exact asset and
  its spec row. The cell is genuinely blank per the 01-HERO rule.
- `WS4-SPEC` stamped with a supersession table covering seven stale items.
- Superseded decision log moved to `archive/product-and-strategy/`.
- Stale Workstream 1 pointer in `README.md` fixed. AVIF wording fixed in
  `03-SECTION-3`.

**Stage 2, scaffold.** Next.js app created in `web/` with the ratified stack.

**Stage 3, foundation.**

- `web/app/globals.css` design tokens, sampled from the ratified assets
- `web/lib/analytics.ts` nine canonical events, per-visitor at-most-once
  suppression keyed `blotter:r1:spreadsheet:<event>`, no vendor connected.
  Email is structurally absent from `EventProperties` and cannot leak
- `web/lib/funnel-store.ts` typed funnel state across all stages with
  `furthestStage` tracking for lead storage
- `web/components/cta-button.tsx` the single CTA carrying all four origins
- `web/components/site-header.tsx` sticky header, `cta_location = header`

**Stage 4, SheetWindow primitive. Approved by Jon August 5, 2026.**

- `web/components/sheet/sheet-window.tsx` chrome, menu row, formula bar,
  column-letter strip, tab strip, `columnWidths` prop so the letter strip aligns
  with the grid
- `web/components/sheet/sheet-grid.tsx` zoned row and column body
- `web/components/sheet/status-chip.tsx` five statuses
- `web/lib/sheet-data.ts` canonical hero columns, rows and cues
- `web/app/review/sheet/page.tsx` internal comparison surface, not part of the page

Geometry reproduces the ratified hero at a 1006px window: 43px gutter, manual
zone 43 to 415 (Name 108, Title 126, Firm 138), maintained zone 415 to 1005
(Status 132, Next move 156, Last contact 112, Days 56, Call 134).

## 5. Section 2 asset resolved

Jon supplied an intact self-contained bundle on August 4, 2026:

`ws5-assets/section-2/goldman-sachs-rejection-email-exact-v2.html`

- SHA-256 `c8b08e76730e4d8ccbb4f4a5ba163839ed1fe6f5b71bc4f055cae14a8feb3a6f`
- verified against every content point in the build specification
- no external resource references, no em or en dashes in visible copy

The corrupt `goldman-sachs-rejection-email-exact-v1.webp` was removed: 13,676
stored bytes against a RIFF-declared 29,672, decoder failure. Git history
retains it. All specification references now point at the v2 source.

## 6. Decisions made in session 1

Both of these are settled. Do not reopen them without an explicit instruction
from Jon.

**a. Maintained-zone row tint. Ruled by Jon August 5, 2026.**

The maintained zone is marked by the **header band alone**. Data rows carry no
tint and no per-row emphasis.

This matches the ratified hero asset, which was measured rather than assumed:
the maintained header samples `#f7f2e8` and every data row samples `#fafbfd`
with no per-row variation. The manual header is `#edf2f8`, manual rows
`#ffffff`.

It supersedes `01-HERO` sections 8 and 10, which required a 5 to 8 percent tint
across all five data rows plus 10 to 14 percent emphasis on the three cue-linked
rows. Both are recorded as inactive in the build specification, and the section
15 acceptance criteria were revised to match.

*Revisit condition, recorded in `01-HERO` section 8 and in
`06-assumptions-and-open-questions.md`:* if the cue-to-row connectors alone
prove too thin a signal for which rows each cue maintains, once the full hero is
assembled with cues, connectors and ownership underlines, reopen this with Jon.
The per-row `emphasised` flag and the tokens `--color-blotter-row` and
`--color-blotter-row-strong` are retained unused so reversal is one line.

Section 5 and the funnel frames reuse this same treatment.

**b. Status chip colours. Ratified by Jon August 5, 2026.**

Replied blue, Call scheduled purple, Call completed green, No reply amber, Sent
gray, taken from the ratified hero asset per `01-HERO` section 5's
preserve-the-reference instruction.

This supersedes the green, blue and amber palette sketched in `03-page-spec.md`,
which self-labels as a non-binding working baseline, and the discarded Lovable
P2 record. Tokens live in `globals.css` and are swappable in one place.

## 7. Waiting on Jon, not blocking until session 6

- Supabase project and credentials
- PostHog project API key

## 8. Deployment rule, unchanged from WS5-SPEC

Keep the deployment private with protection enabled. Do not route
`blotterib.com`. Do not implement real OAuth, real Gmail, Calendar or Sheets
integrations, or payment collection. Do not route public traffic. Public launch
waits for the matched platform page, verified analytics and lead storage, passed
privacy and claim gates, and final launch authorisation.

## 9. Exact next action

Begin stage 5: hero and Section 2, desktop only, under
`ws5-build-specs/01-HERO.md` and `ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`.

Still to build in the hero, on top of the approved SheetWindow: the three
Gmail and Calendar activity cues, the direct cue-to-row connectors landing on
Sarah Chen, Marcus Lee and Alex Morgan's maintained blocks, the two ownership
underlines carrying `YOU add the contacts` and `BLOTTER keeps them current`, and
the surrounding hero copy of eyebrow, headline, subhead, CTA and authority line.

The assembled hero is what the section 6a revisit condition is waiting on.
Bring it to Jon before starting Section 2.
