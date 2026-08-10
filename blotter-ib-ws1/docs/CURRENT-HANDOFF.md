# Blotter IB - Current Handoff

Date: August 10, 2026
Status: WS5 active. Sessions 1 through 5 complete. Stages 1 through 9 done
apart from responsive and accessibility.

**The site is live at `blotterib.com`, public, carrying real traffic, and has
one real lead.** Lead storage and analytics are provisioned, connected and
verified in production. All seven landing-page sections and the canonical funnel
are built and ratified.

**Stage 10 is next and it is the mobile build.** The page is desktop-only at a
fixed 1,124px. See section 1.

## 0. Act on these before anything else

**A checklist, not background.** Work out whether any item is due and say so in
the first reply of the session.

### Done, do not repeat

Jon flagged his desktop and phone as internal on both live hostnames on
August 10, and applied the host and person filters to his `Canonical Funnel`
insight. The numbers now match. **Do not ask him to do this again**, and do not
re-explain the internal flag unless a new hostname appears.

### Due if PostHog scopes are ever fixed

`insight:write` and `person:write` were granted on August 10 but did not
register; both still return 403. If they start working, flag the fourteen
internal persons listed in `07-infrastructure-runbook.md` so the timestamp
cutoff stops being needed. Low priority.

### Standing, and it governs every number you report

**Never read `leads`; read `real_leads`.** Never report a PostHog figure without
the three filters in the runbook. Unfiltered, the funnel claims three people
confirmed a beta spot. The true number is zero.

### Due before the domain is promoted anywhere

The provider sentence — that the connection provider's Google application has
passed CASA — is the one unverified claim on the page, and no provider has been
selected. Section 6's present tense is deliberate and ratified; this sentence is
not the same thing, because it is a specific security credential attributed to a
third party. Section 6 of this file has the full record.

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
| 5 (complete) | 8-9 | Funnel, Supabase, PostHog, repo move, live deploy on `blotterib.com` |
| 6 | 10 | **Responsive and accessibility. Start here.** |

## 3. Technical stack, ratified by Jon August 4, 2026

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind v4 with CSS custom properties |
| UI primitives | Base UI 1.6.0 — **installed and in use**, both accordions |
| Funnel state | zustand |
| Variants | clsx and cva |
| Hosting | Vercel Hobby, **public** — production cannot be protected on this plan |
| Lead storage | Supabase, US region — **live**, see `07-infrastructure-runbook.md` |
| Analytics | PostHog US Cloud behind the adapter — **live**, project `546166` |

Application root: `web/`. Run with `pnpm --dir web dev`.

Secrets live in `web/.env.local` (gitignored). Never print a value.

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

## 5. Completed in session 4 (Sections 6 and 7, the privacy policy)

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

## 5b. Completed in session 5 (the funnel, the infrastructure, launch)

### The CTA label changed

**`Try Blotter Now`**, not `See how Blotter works`. The old label promised a
demonstration and the funnel kept that promise with the three-frame product
experience; Jon cut the frames, so the label had to go too. Supersedes WS4 and
`07-SECTION-7` §9. One string, `CTA_LABEL` in `cta-button.tsx`, all four
placements.

### The funnel, built

Everything WS3 and WS4 specify **except** the three-frame product experience,
which is replaced by Film A from the parallel `social/` chat.

`question_track → question_window → film → email → price → checkout → confirmed`

**A modal card, not a route**, fixed at 960x730 for every screen. The film sets
the size because it needs the most room; every other step centres a 460px column
inside it. Do not let the card resize between steps — Jon rejected that
explicitly.

`product_experience_completed` keeps its place in the frozen nine and now fires
when the film step is left. Not renumbered, not repurposed.

`Other` on both questions is a text field with typing required, captured as
`recruiting_track_other` / `recruiting_window_other` in both the event
properties and the lead record.

Unratified copy lives in two places and is flagged in code: the film step's two
lines, and `PRICE_DELIVERY` plus the checkout description.

### Infrastructure, live

Supabase for leads, PostHog for analytics, both US region, both verified in
production. **`07-infrastructure-runbook.md` is the operational reference** —
credentials, query patterns, migrations, the internal flag, and the filters that
make a reported number true. Read it before touching data.

### The repo moved and the site launched

`github.com/jnachman17-hue/Blotter-Claude`, private, not a fork. `origin` points
there. `blotterib.com` is live and public.

### What the first real traffic said

Eleven external visitors, eight page views, **one real lead**: a Columbia
address, Management Consulting, desktop. Zero external visitors have reached
`checkout_started`.

That one session: landed, clicked the CTA **nine seconds later**, spent 4.5
minutes on the questions, **skipped the film after 8 seconds**, submitted a real
`.edu` address, saw `$9.99 / month`, and left **seven minutes later** without
clicking through to payment.

n=1, so hold it lightly. But it is the only evidence that exists, and it says
the hero converts, the film is not earning its 21.5 seconds, and the price is
where the decision happens.

## 5c. Stage 10, and what the next session is for

**The mobile build.** The page is desktop-only at a fixed `PAGE_BOX_W` of
1,124px. On a phone it overflows sideways.

This is not cosmetic. Mobile and desktop split evenly among identified visitors,
and anything Jon pushes on Reddit, X or LinkedIn lands majority-mobile. Sending
social traffic to this page today wastes the test.

What has to survive the translation, in rough order of difficulty:

- **the hero**, whose composition depends on the cue column sitting beside the
  sheet at a fixed width;
- **Sections 4 and 5**, a ten-column Google Sheets window and a 21-row action
  view. `05-SECTION-5` §16 and `04-SECTION-4` require all fields and all three
  groups survive;
- **Section 2's** volume trajectory, built from 745 marks across a wide field;
- **Section 6's** four-across flow and three service columns —
  `06-SECTION-6` §16 says the permissions matrix becomes three sequential
  service blocks rather than a compressed table, and that no claim may be
  weakened or hidden;
- **the funnel card**, currently a fixed 960x730. The film is 4:5, which is
  native phone shape and should be an advantage here rather than a problem;
- **44px touch targets**, visible focus, and reduced-motion, per WS5 Phase 6.

`06-assumptions-and-open-questions.md` carries a per-section responsive row for
every one of these, each written when that section was ratified. They are the
brief.

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

- **The X account URL.** The footer renders the mark as a non-link placeholder
  until it exists. Set `X_URL` in `components/sections/faq-and-close.tsx`.
- **Whether the film earns its place in the funnel.** The one real visitor gave
  it 8 seconds of 21.5. Jon asked about gating it and that was ruled out. The
  open question is whether it should be shorter, or replaced, or moved.
- **The price screen is where the one real visitor stopped**, for seven minutes.
  Nothing has been decided about it. It is the most interesting open question
  the data has produced.
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

## 9. Waiting on Jon

- **PostHog `insight:write` and `person:write`** — granted August 10 but not
  registered. Low priority; see section 0.
- **A connection provider**, which is what closes the last unverified claim.

## 10. Deployment rule, superseded August 10, 2026

The old rule said keep it private, do not route `blotterib.com`, do not route
public traffic. **Jon overrode all three explicitly** and the site is live and
public. Record, not debate: he was told the claim gates had not passed and
decided to launch anyway, which is his call to make.

What survives unchanged, and is not his to waive casually:

- no real OAuth, no real Gmail, Calendar or Sheets integration;
- no real payment collection and no card fields anywhere;
- `noindex` and `app/robots.ts` stay until he says launch. Production cannot be
  password-protected on Vercel Hobby, so they are the only thing keeping the
  page out of search.

**The demand-test framing is ratified and is not a claims problem.** Section 6
states the product works in the present tense because that is the instrument.
Do not propose hedging it; that argument was made, rejected, and the rejection
was correct. The privacy policy is where the truth about present-day collection
lives, in article 03.

## 11. Things worth knowing before you start

**Jon rejects at least one ratified asset or presentation rule per section, and
has in every session.** The pattern that works: build the ratified content,
then build live side-by-side variants behind a temporary route under `/review/`,
let him flip between them, delete the losers and the route. Prose descriptions
do not work. Show, do not describe. `/review/section-6` was built and deleted
in session 4; `.claude/skills/prototype/PICKER.md` has the picker, verbatim.

**He thinks in screenshots and live pages, not descriptions.** For the mobile
build this matters more than usual: build it, put it in front of him at real
device widths, and let him react. Do not write paragraphs about breakpoints.

**Verification that has caught real bugs**, worth repeating each session: the
copy diff against both build specs read out of the live DOM, the dash scan
(exactly two permitted), the production build, and the service-key-not-in-HTML
check.

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
