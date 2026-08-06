# Blotter IB - Current Handoff

Date: August 6, 2026
Status: WS5 active. Sessions 1 through 4 complete. Stages 1 through 7 done.
**All seven landing-page sections exist.** Ready for stage 8 or 9.

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
`git add`/`commit`/`push`, and it never starts a dev server.

| Session | Stages | Deliverable |
|---|---|---|
| 1 (complete) | 1-4 | Spec fixes, scaffold, foundation, SheetWindow |
| 2 (complete) | 5 | Hero, page theme, Section 2, desktop |
| 3 (complete) | 6 | Brand identity, Section 3, Sections 4+5 merged, desktop |
| 4 (complete) | 7 | Sections 6 and 7, the footer, the privacy policy page |
| 5 | 8 | Funnel — **if Jon still wants one.** See section 8. |
| 6 | 9-10 | Supabase, PostHog, responsive, accessibility, private deploy |

## 3. Technical stack, ratified by Jon August 4, 2026

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind v4 with CSS custom properties |
| UI primitives | Base UI 1.6.0 — **installed and in use**, both accordions |
| Funnel state | zustand |
| Variants | clsx and cva |
| Hosting | Vercel, private with deployment protection |
| Lead storage | Supabase (not yet provisioned) |
| Analytics | PostHog behind the provider-independent adapter (not yet connected) |

Application root: `web/`. Run with `pnpm --dir web dev`.

## 4. Completed in sessions 1 through 3

Session 1: specification reconciliation, the Next.js scaffold, the foundation
(design tokens, the nine-event analytics adapter with per-visitor suppression,
the typed funnel store, the CTA component carrying all four origins, the sticky
header), and the `SheetWindow` primitive with its comparison surface at
`/review/sheet`.

Session 2: the hero at its ratified geometry, the page theme, and Section 2 as a
volume trajectory built from 745 real marks. Both align to one bounding box,
`PAGE_BOX_W` = 1124px. **Every section inherits it. Do not introduce a second
page width.**

Session 3: the brand identity (`Ledger B`, Schibsted Grotesk 700 at -0.035em,
navy alone — yellow and cream are semantic on this page and unavailable to the
identity), Section 3 as one Friday in three moments, and Sections 4 and 5 merged
into one section with two beats sharing a tab strip.

Full detail for all three is in `04-decision-log.md`.

## 5. Completed in session 4

### Section 6, `How Blotter uses your data`

**Three builds.** The first was rejected as "a blob of unformatted information
that no reader would ever read", the second as chaotic. The second diagnosis was
the useful one and it was Jon's: the section stacked six different layout
languages, each defensible against its own spec clause, and arranging spec
blocks is not designing a section.

The reference settled it. Shortwave — a Gmail app on restricted scopes facing
the same Google review — carries **none** of this on its marketing site. It is a
docs page: eleven headed sections, prose only, no tables, no cards. The serious
version of this surface is a small section plus a real page behind it.

Section 6 is now three parts, one layout language, **1,284px** — down from
3,083:

- **the claim**, one paragraph a step above reading size. No block, no rule, no
  display weight: both earlier builds set it as a large bold line under the
  section head, which is the definition of a subheader;
- **the flow**, four steps drawn horizontally with four marks and a hairline
  connector, sitting on the gradient with no panel. The second beat is the
  exclusion, so it carries the struck mark and a muted ring — colour does the
  branching a fork diagram would have to draw;
- **three service columns**, the permissions matrix turned ninety degrees and
  stripped of all chrome. Same exact content, three short lists instead of one
  wide grid.

Then two footnotes — the broad-permission disclosure, which may not leave the
page, and the provider sentence — and the link.

`SheetsMark` was added to `components/google-marks.tsx` and is the same glyph the
`SheetWindow` chrome draws. The four flow marks are in
`components/section-6/step-icons.tsx`.

**Everything else moved to `/privacy` and nothing was withdrawn:** retention,
deletion, all nine commitments, the provider's supporting paragraph and its
heading, the seven privacy questions, plus the four processing steps in prose
and the broad-permission explanation. The copy verification diffs both surfaces
together for exactly that reason.

Section 6's ground is **warm paper**, chosen from three live variants. Continuing
the page gradient made the boundary with Sections 4-5 vanish, which is what
`06-SECTION-6` §3 exists to prevent. The band starts on `--field-e` and rests on
the new `--field-f`.

### Section 7, and the page's first footer

The five-question FAQ passed review unchanged.

The large centred navy closing panel was cut. In its place is a compact footer:
the exact closing headline set left, the final CTA opposite it, then the brand,
a privacy-policy link and social links. The supporting and reassurance lines are
gone. The navy ground survives — `--color-closing`, reserved since session 2 and
finally used.

LinkedIn is `https://www.linkedin.com/company/blotter`. **The X account does not
exist yet.** Its mark renders as a non-interactive placeholder; set `X_URL` in
`components/sections/faq-and-close.tsx` when Jon supplies it.

### The privacy policy page, `/privacy`

No specification ratifies any policy text. Jon ruled a hybrid: conventional
structure, written broadly, language to be drafted and ratified by him later.

It is deliberately plain: paragraph text, no visual design, per his instruction
that the back page does not need to be pretty. It is now the section's real
body, and Section 6 is its front door.

**Structure may be conventional; facts may not be invented.** It shipped with
every unknown as a visible `[ to be confirmed: … ]` marker rather than a
plausible guess. Jon answered all of them on August 6, 2026, so the markers and
the component that drew them are gone, and the page now states only settled
facts: effective August 6 2026, entity Blotter with no published address,
`blotterib@gmail.com`, US-only processing, 18+, PostHog for analytics, Supabase
for hosting and database, Stripe for payments, data kept while the account
exists and deleted with it, and no Blotter-held certification or audit.

**The Google scopes are stated with Google's own consent wording beside each**,
so a reader can check the page against the screen they are looking at:
`gmail.readonly`, `calendar.events.readonly`, and `drive.file`.

`drive.file` is a decision, not a detail. The `spreadsheets` scope grants every
sheet in the account and would contradict the ratified claim that Blotter cannot
reach unrelated files. **If the build ever reaches for `spreadsheets`, the page
becomes false.**

### Section 2

The methodology footnote reads `Summer Analyst 2027`, was `2028`. Nothing else
changed. The year inside the parked Goldman email asset and the `Summer 2028`
funnel option are deliberately untouched.

### Verification

Production build passes. Typecheck clean. Lint clean apart from the pre-existing
`analytics.ts` warning. Page is 7,953px, no horizontal scroll at 1440.

Every backtick-quoted string in both build specs was extracted and diffed
against the rendered DOM of both pages together, proving the consolidation is a
relocation and not a deletion. Two dashes in visible copy, both permitted.
Accordion semantics asserted in the DOM.

## 6. The one unverified claim on the page. Read this before touching it.

Section 6 says: `Blotter connects to Google through an established connection
provider whose Google application has passed Google's CASA security assessment.`

Jon ruled this in and it supersedes `06-SECTION-6` §13 and §18, which forbid
implying CASA completion without evidence. **No provider is selected, so the
sentence is true of no actual arrangement.** Two research findings from this
session that the final wording has to survive:

- Nylas's public claim for its shared Google application is **Tier 3** CASA, not
  Tier 2. Do not state a tier: it would be wrong for Nylas and unknown for
  anyone else.
- On the Nylas shared application the Google consent screen reads **`Nylas`**,
  not `Blotter`. Blotter's own name there requires Blotter's own Google
  application — and then the CASA assessment is Blotter's to pass, not the
  provider's, and this sentence is false as written. **That is a product
  decision, not a copy decision, and it is open.**

Three gates in `06-assumptions-and-open-questions.md` carry this.

## 7. Decisions that are settled. Do not reopen without Jon.

Full reasoning is in `04-decision-log.md`.

**a. The brand identity** — mark, wordmark, navy-only colour.

**b. Maintained-zone row tint.** Header band alone in the hero and Section 3.
The merged Section 4+5 is the deliberate exception.

**c. Status chip colours**, from the ratified hero asset.

**d. Alex Morgan's em dash**, and now **the Section 6 §10 sentence**. Those two
are the only dashes permitted in visible copy anywhere on the page.

**e. Date formats** `1/16/26`, `1/17 @ 2:00 PM`, `Completed 1/16`.

**f. The page theme and the bounded-box layout**, now including `--field-f` and
Section 6's warm-paper ground.

**g. Every amendment stamped at the top of `01-HERO`, `02-SECTION-2`,
`03-SECTION-3`, `04-SECTION-4`, `05-SECTION-5`, `06-SECTION-6` and
`07-SECTION-7`.** All seven build specs now carry amendment tables.

## 8. Open, flagged to Jon, not answered

- **The funnel may be cut entirely.** Jon said on August 5 that he may prefer
  everything on the page behind a single direct CTA. Ratified funnel frames must
  not constrain landing-page design. Stage 8 is conditional. Do not build funnel
  screens until he decides.
- **The privacy-policy language.** Jon is drafting and ratifying it himself.
  Twelve `[ to be confirmed: … ]` slots wait on him.
- **The X account URL.**
- **Consent-screen identity**, above. Product decision, open.
- **Section 3's boundary box gradient.** Blue-to-cream inside it, echoing the
  sheet header band. Approved in principle, queued, not built.
- **The messy-spreadsheet concept**, parked. The rear sheet rendered as the
  stale, unformatted spreadsheet the reader actually has. Jon's idea.
- **`web/app/layout.tsx` page title** carries an em dash in the browser tab,
  contradicting the standing rule. Session-1 code, flagged five times now,
  unchanged without instruction.
- **A launch animation** for social, roughly ten seconds, in a separate chat
  under `social/`.

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

**Jon rejects at least one ratified asset or presentation rule per section, and
has in every session.** The pattern that works: build the ratified content,
then build live side-by-side variants behind a temporary route under `/review/`,
let him flip between them, delete the losers and the route. Prose descriptions
do not work. Show, do not describe. `/review/section-6` was built and deleted
this session; `.claude/skills/prototype/PICKER.md` has the picker, verbatim.

**The Browser pane's screenshots return blank in this environment.** Its DOM
tools work fine — `read_page`, `javascript_tool`, console and network all
behave. For images, drive headless Chrome over the DevTools protocol:
`Page.captureScreenshot` with a `clip` rectangle is the only reliable way to
frame a section 5,000px down the page, since the Chrome CLI only captures from
the top of the document. A working script was used this session and is not
committed; rebuild it in the scratchpad if you need it.

**Another chat's `next dev` may already hold `web/`.** Next refuses a second
instance in the same directory, so `preview_start` dies immediately. The running
server serves the same source — point the browser at it rather than killing
someone else's process.

`web/components/section-2/gmail-message.tsx` is a complete, verified translation
of the exact Goldman Sachs asset at its native 1180 by 560 and is currently
unused. Jon parked it in case a later section wants it. Do not delete it as dead
code.

`SheetWindow`: an empty `tabs` array omits the tab strip, and `columnWidths`
accepts numbers as well as Tailwind utilities. Use numbers for any width
computed at runtime — a template-built `w-[123px]` never reaches the Tailwind
compiler and the column-letter strip silently stops aligning.

The `impeccable` design hook flags the prototype picker's `width` transition on
every review route. It is a false positive documented in `PICKER.md`. No
suppression has been added, in this session or the last.
