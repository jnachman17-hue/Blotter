# Decision log

Date last updated: August 1, 2026

This file is a concise index of settled, rejected, and superseded project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md`; ratified surface instructions live in `docs/workstreams/ws5-build-specs/`; the governed Lovable process lives in `docs/workstreams/ws5-implementation/`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.**

Status: Confirmed

**Workstream specifications preserve detailed decisions. This decision log remains a concise cross-project index.**

Status: Confirmed

**New substantive product, copy, presentation, funnel, analytics, privacy, or implementation decisions require Jon ratification before becoming canonical.**

Status: Confirmed

**During WS5, implementation-sensitive landing-page and funnel decisions must be recorded in self-contained files under `docs/workstreams/ws5-build-specs/`. All relevant canonical indexes and open-question records must be updated before advancing.**

Status: Confirmed

**GitHub is the durable source of truth. Existing Lovable code and chat output are implementation artifacts and cannot override the canonical specifications.**

Status: Confirmed

## Strategy

**Market signal comes before meaningful product build. Build only what evidence calls for.**

Status: Confirmed

**The terminal artifact of the current validation phase is an economics story, not a backend product.**

Status: Confirmed

**Read rules are written before data exists, and analytics is verified by hand before public traffic or spend.**

Status: Confirmed

**Landing-page content and experience design precede Lovable implementation.**

Status: Confirmed

## Test design

**Round one compares spreadsheet-native versus standalone platform surfaces. It is not primarily a feature, headline, plan, audience-positioning, or price test.**

Status: Confirmed

**Both pages use the same canonical funnel, `$9.99 / month` price, analytics event set, measurement rules, and displayed brand.**

Status: Confirmed

**Multiple CTA placements may exist, but every primary CTA enters the same funnel and origin is stored through `cta_location`.**

Status: Confirmed

**The spreadsheet page is designed and built first, but both pages ultimately launch at roughly the same time.**

Status: Confirmed

**During a measurement period, price, funnel sequence, core proposition, payment mechanics, event definitions, and traffic-allocation methodology are frozen. Material changes create a new labeled iteration.**

Status: Confirmed

**No permanent or bounded project-level kill condition is set. Weak results invalidate the tested proposition for meaningful backend investment but do not prohibit disciplined iteration and retesting.**

Status: Confirmed

## Workstream 2 proposition

The full durable specification is `docs/workstreams/WS2-SPEC.md`.

Key rulings:

- July audience is pre-decay and the page sells prevention.
- Live recruiting activity outpaces manual spreadsheet upkeep.
- The student maintains contacts and static information; Blotter maintains changing recruiting state from relevant Gmail and Calendar activity.
- The core outcome is one accurate, current source of truth.
- The minimum visible offer includes auto-capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- The spreadsheet proposition preserves the existing tracker and minimizes switching cost.
- Blotter is a recruiting-logistics layer, not contact discovery, scraping, AI outreach, technical preparation, learning content, or a jobs board.

Status: Confirmed

## Workstream 3 conversion and measurement

The full durable specification is `docs/workstreams/WS3-SPEC.md`. Workstream 3 is complete.

Key rulings:

- Canonical funnel: CTA entry, two recruiting questions, one concise product experience, recruiting-email capture, `$9.99 / month` price, purchase progression, payment-choice click, and Fall 2026 cohort confirmation.
- One 15 to 20 second maximum click-to-progress product experience occurs before email capture.
- Actual or simulated OAuth is excluded.
- Price appears only after email capture.
- No card-entry form, credentials, or money are collected.
- `payment_option_clicked` is the strongest commercial-demand signal.
- The approximately 300-person Fall 2026 cohort commitment is real.
- The canonical event set has nine events and no separate `cta_clicked` event.
- The primary comparative metric is `checkout_started / page_viewed`.
- The primary commercial-demand metric is `payment_option_clicked / page_viewed`.
- Comparative and commercial-demand thresholds and sample requirements are precommitted in WS3.

Status: Confirmed

## Workstream 4 content and experience design

The full durable specification is `docs/workstreams/WS4-SPEC.md`. Workstream 4 is complete.

Key rulings:

- Displayed brand is `Blotter`; the owned domain remains `blotterib.com`.
- The spreadsheet page uses seven sections: hero, scale, how it works, outstanding actions, preservation, privacy and permissions, and general FAQ plus final CTA.
- Three CTAs use `See how Blotter works` and store `hero`, `actions`, or `final` as `cta_location`.
- The hero and Sections 2 through 7 are ratified at the content and experience level.
- Price and availability are omitted from the landing-page FAQ and revealed only at their funnel stages.
- The spreadsheet product experience uses one stable sheet across three frames and three total clicks, with a required frame indicator and clear signposting of changing cells.
- Frame 3 reuses the exact ratified Outstanding Actions queues and wording.
- Question 2 is `Which recruiting window best fits you?`; both question screens use `Continue`.
- Email capture uses `Continue with your recruiting email.` and `Enter the email address where you conduct recruiting.` without school-email restriction, static privacy copy, or beta language.
- The price screen presents Blotter as a current product at `$9.99 / month`, billed monthly, cancel anytime.
- The purchase summary uses `Complete your purchase`, shows `$9.99` due today, and preserves recognizable card and Apple Pay choices without card entry.
- Fall 2026 timing, cohort status, and no-charge clarification appear only after the payment-choice click.
- Responsive priorities preserve content meaning and readable spreadsheet crops.

Status: Confirmed

## Workstream 5 implementation

The active specification is `docs/workstreams/WS5-SPEC.md`.

**WS5 builds the spreadsheet page in Lovable, implements the canonical funnel, stores leads, wires the exact WS3 events, deploys privately, and verifies claims, responsive behavior, accessibility, analytics, and spreadsheet-interface fidelity before public traffic.**

Status: Confirmed

**Before broad page-scene implementation, WS5 must create one reusable high-fidelity Google Sheets-style spreadsheet-window component, compare it against the approved references, obtain Jon's visual approval, and reuse the approved primitive across every spreadsheet scene.**

Status: Confirmed

**The purchase-like funnel must not disclose demand testing, beta status, Fall 2026 timing, future availability, or no-charge status before the payment-choice click. The terminal state is the first availability disclosure.**

Status: Confirmed

### Hero

**The desktop hero communicates that relevant Gmail and Calendar activity directly maintains the live relationship-state fields in the spreadsheet. It removes the stale rear sheet and explicit engine, maps each cue directly to the corresponding maintained row block, applies a faint shared Blotter-yellow tint across Status through Call, emphasizes the three cue-linked example rows, and uses below-sheet region underlines for `YOU add the contacts` and `BLOTTER keeps them current`.**

Detailed authority: `docs/workstreams/ws5-build-specs/01-HERO.md`

Status: Confirmed

### Section 2

**Landing-page Section 2 uses exact figures of 628 recruiting emails, 68 coffee chats, 19 applications, and 30 interview rounds; a subordinate approximately 60-hour administration estimate and methodology; one exact supporting paragraph; one formal exact Goldman Sachs rejection-email asset with two external annotations; exact closing copy; and no CTA.**

Detailed authority: `docs/workstreams/ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

Status: Confirmed

### Section 3

**Landing-page Section 3 uses the systems-level sequence of Gmail and Google Calendar activity to Blotter to a current Google Sheet. It uses one formal exact `2048 × 633` mechanism asset, three external stage labels, the exact boundary line, one compact row of three product-boundary badges, the exact closing line, and no CTA. The former `YOU CONTROL` and `BLOTTER MAINTAINS` lists are removed.**

Detailed authority: `docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`

Status: Confirmed

**The provisional stacked-record mark and lowercase `blotter` treatment inside the Section 3 exact asset are authoritative for that asset only and do not establish the global canonical Blotter logo.**

Status: Confirmed

### Section 4 and funnel Frame 3

**Landing-page Section 4 uses the exact `1848 × 1160` Outstanding Actions PNG as its dominant visual, with exact headline, supporting line, CTA line, and `See how Blotter works` button. The page CTA enters the canonical funnel with `cta_location = actions`.**

Detailed authority: `docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`

Status: Confirmed

**The same formal exact Outstanding Actions asset governs canonical funnel product-experience Frame 3. Section 4 and Frame 3 use different surrounding copy and controls, but the spreadsheet visual, queue content, grouping, styling, and proportions must not be independently redesigned.**

Status: Confirmed

### Section 5

**Landing-page Section 5 uses one formal exact `1298 × 334` Google Sheets preservation asset with the exact column order `Name | Title | Firm | Email | LinkedIn | Status | Next move | Last contact | Days | Call`, the established five contacts, exact emails, blue underlined `Here` LinkedIn links, and a divider between LinkedIn and Status. The section has no eyebrow or CTA and uses the exact headline, supporting copy, and compact three-item reassurance strip.**

Detailed authority: `docs/workstreams/ws5-build-specs/05-SECTION-5-PRESERVATION.md`

Status: Confirmed

**The Section 5 conceptual distinction between the existing tracker and the Blotter live layer remains binding, but the phrases `YOUR EXISTING TRACKER` and `BLOTTER ADDS THE LIVE LAYER` are not inserted into the exact spreadsheet asset.**

Status: Confirmed

### Section 6

**Landing-page Section 6 uses a calm, left-aligned disclosure system rather than a marketing section. Its exact order is title and opening statement, candid claim, four numbered processing rows, permissions matrix, visible broad-Google-permission notice, `What Blotter keeps`, nine commitments, account-deletion statement, provider disclosure, seven-question privacy FAQ, and privacy-policy link. The section has no eyebrow, CTA, security-seal imagery, fake OAuth, marketing cards, or external visual asset.**

Detailed authority: `docs/workstreams/ws5-build-specs/06-SECTION-6-DATA-AND-PRIVACY.md`

Status: Confirmed

**Section 6 must remain provider-agnostic until a third-party connection provider is selected. Use: `Blotter uses a third-party provider to facilitate the connection with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`**

Status: Confirmed

**Section 6 desktop presentation is ratified, but claims about message routing, unmatched-content exclusion, retention, deletion, revocation, Google scopes, unrelated Drive access, provider role, subprocessors, and the privacy policy remain publication gates that must match actual implementation truth.**

Status: Confirmed

### Section 7

**Landing-page Section 7 uses the exact five-question general-product FAQ followed by a visually distinct final closing panel. The FAQ has no eyebrow or supporting paragraph, all questions are closed initially, only one answer may be open at a time, and every row must be keyboard accessible.**

Detailed authority: `docs/workstreams/ws5-build-specs/07-SECTION-7-FAQ-AND-FINAL-CTA.md`

Status: Confirmed

**The final closing block uses `Your recruiting tracker, always current.`, the exact supporting line, the `See how Blotter works` CTA, and the reassurance line `Keep your existing Google Sheet. No mass outreach. No technical-prep content.` The CTA enters the canonical funnel with `cta_location = final`.**

Status: Confirmed

**Section 7 excludes price, availability, beta, Fall 2026, cohort size, payment, privacy FAQ duplication, a secondary CTA, and any external visual asset.**

Status: Confirmed

### Lovable packet and operating process

**All seven landing-page build specifications are ratified and the pre-Lovable packet is frozen. The next step is plan-only intake in the existing private Lovable project.**

Detailed authority: `docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`

Status: Confirmed

**The existing Lovable shell is provisional scaffolding. Lovable must audit it under plan mode and may not make code changes until Jon approves the returned implementation plan.**

Status: Confirmed

**The Lovable implementation sequence is checkpointed: project knowledge and packet upload; plan-only intake; foundation and reusable spreadsheet primitive; Sections 1 through 7; complete-page desktop rhythm; canonical funnel; lead storage; analytics connection; responsive and accessibility work; privacy and claim verification; manual lead and event verification.**

Status: Confirmed

**Do not use one giant whole-site build prompt. Every implementation phase must identify its controlling specification, attached assets, stop condition, preview review, diff review, and acceptance criteria.**

Status: Confirmed

**No additional pre-Lovable unified storyboard or compact funnel Frame 1-to-Frame 2 asset is required. Frames 1 and 2 may be planned from WS3, WS4, the approved spreadsheet primitive, and the frozen asset grammar. A real contradiction must return to Jon before code.**

Status: Confirmed

**Because the GitHub repository is private, required documents and assets must be fetched, uploaded through Lovable's file-upload workflow, and attached to the plan or implementation message. Do not assume Lovable can open private GitHub paths directly.**

Status: Confirmed

**Analytics architecture is introduced during the foundation and funnel build through a provider-independent adapter. The vendor is selected and connected only after visual and funnel behavior are stable and before private verification.**

Status: Confirmed

**Lead storage is added after the funnel and email-capture behavior are approved. Database provisioning requires approval; Lovable's Supabase-backed database is an available option but is not automatically selected.**

Status: Confirmed

**The Lovable project remains private and unpublished throughout WS5. Public deployment and domain routing are prohibited until the matched platform page, verified analytics and lead storage, privacy and claim gates, and final simultaneous-launch authorization are complete.**

Status: Confirmed

### Session 2, August 5, 2026: hero, page theme, Section 2

**Alex Morgan's hero `Next move` carries the em dash, muted and centred, exactly as `hero-reference-v1.png` draws it.**

This reverses the August 4 removal and overrides the `01-HERO` section 6 rule that blank cells
must be genuinely blank, for that one cell only. Every other blank cell on every other surface,
including Section 5, stays genuinely blank. Ruled by Jon.

Status: Confirmed

**The page has a ratified visual theme. It was open until now: the specifications govern copy, section order and the exact assets, and never decided a page-level design system.**

- Type is Geist for body and interface, with Schibsted Grotesk for display (added later the
  same day, see the Section 2 rework below) and Geist Mono reserved for figures. The exact
  assets keep their own type independent of the page: the spreadsheet is pinned to Arial and
  the Gmail surfaces to Roboto, matching the products they reproduce, so a future theme change
  cannot alter a ratified asset.
- One accent, a deep navy, on the CTA, eyebrows, wordmark and headline emphasis. The Blotter
  yellow is semantic, not a second accent, and appears only where the ratified assets use it to
  mean "Blotter maintains this".
- One continuous gradient runs the whole page and sections alternate in tone within it, drawn
  from the manual-zone and maintained-zone header colours already sampled from the assets.
  Continuity is built by handoff, each band starting on the colour the band above it ended on,
  so adding a section later cannot shift the stops. The hero holds the lightest and warmest
  band; Section 2 sits cooler and deeper. The maintained-zone yellow stops at the hero's lower
  edge, as `02-SECTION-2` section 12 requires.
- Interactive elements are pills, page surfaces are 12px. The spreadsheet keeps its own
  Google Sheets radii.
- Light mode only. Every ratified asset is a light Google Sheets or Gmail surface.
- No motion. `01-HERO` section 13 requires static comprehension and micro-motion needs its own
  approval.

Status: Confirmed

**The hero composition is bounded, not centred. Copy and visual share one box exactly the width of the scaled hero visual, the headline sits on the sheet's left edge, and the supporting column ends on the cue column's right edge.**

Centring the copy on the page created two competing axes and made the sheet read as misaligned,
because the visual's optical centre is left of its geometric centre. Sections 2 through 7 inherit
the same box through `PageBox`. Do not introduce a second page width.

Status: Confirmed

**The hero visual scales uniformly to 0.85 so the complete section, copy included, lands inside a 13-inch MacBook Pro viewport of roughly 1440 by 780.**

`01-HERO` section 3 fixes the composition's proportions, not its pixel count. The scale is one
transform on the whole module, so every ratified measurement is preserved exactly.

Status: Confirmed

**Status-chip metrics were retuned to the ratified PNG, where the widest chip measures roughly 102px inside the 132px Status column. The earlier values ran 11px wider.**

Status: Confirmed

**The Section 2 email is rebuilt as React and CSS components rather than embedded, iframed or rasterised.** `02-SECTION-2` section 19 left the method open.

Status: Confirmed

### Section 2 rework, August 5, 2026

Jon reviewed the first Section 2 build and rejected it as unreadable and
unstructured next to the hero. Three replacement treatments were built side by
side behind a review route and compared live. He chose the trajectory. The
other two were deleted. Everything below is his ruling.

**Section 2's scale block is a volume trajectory across one recruiting cycle, built out of the units themselves.**

Each metric's real total is distributed across the cycle by largest remainder
and drawn as that many marks, piled into the month they belong to: 628 dots, 68
squares, 30 rings, 19 bars. The curve is the top of the piles rather than a line
drawn over them. Mark size rises as the count falls so every band's heaviest
month fills a comparable height while staying one to one with the count.
Cross-band magnitude stays with the numerals, because a shared vertical scale
across a thirty-three-fold spread renders applications invisible.

The trajectory is directional, from Jon's own knowledge of the cycle, not
measured data. January and February are marked identically as the hinge.

This sets aside the `02-SECTION-2` section 7 ban on chart furniture.

Status: Confirmed

**Figure order is descending by volume: `628 / 68 / 30 / 19`.** Supersedes the section 5 order.

Status: Confirmed

**The four metrics carry a blue-to-cream ramp matching the page gradient.**

Each metric has two values: a fill running the true ramp, and a darkened ink for
the numeral and the curve. Literal cream lands near 1.6:1 on this ground and
cannot carry text or a stroke. The ramp incidentally encodes volume, since the
largest figure is the darkest.

Status: Confirmed

**The consequence visual is a single Gmail inbox row, not the full message view.**

Sender, subject and date are unchanged; the muted neighbouring rows carry no
text at all, so no email subject is invented and `One thread buried in 628
emails` describes something visible. About 200px against the previous 512.

This sets aside `02-SECTION-2` section 10, which forbids reducing the full Gmail
view to a card. The verified full-message component is retained unused in
`components/section-2/gmail-message.tsx` in case a later section wants it.

Status: Confirmed

**The supporting paragraph loses its first sentence, and the closing paragraph is cut entirely.**

The cut first sentence named the same four metrics the diagram directly above
had just charted month by month. The closing paragraph ended "begin falling
through the cracks" ninety words after the supporting one ended "begin slipping
through the cracks". The section now ends on the consequence visual.

This overrides the section 5, 9 and 18 requirements for exact copy in both
places.

Status: Confirmed

**The page gains a display typeface: Schibsted Grotesk, with Geist retained for body and interface.**

Applied to the hero headline, section headlines, the Section 2 statement and the
60-hour proof. Added after Jon twice judged the type flat; a display face was
preferred over a one-off treatment so the page gains a voice rather than an odd
paragraph.

Status: Confirmed

**The 60-hour proof sits beside the supporting statement rather than in the footnotes, in the page's own numeral language.**

Below it, the qualification and the methodology sit on one row under a hairline.
The qualification keeps the asterisk that is in its ratified copy and the mark
now has an anchor at the foot of the diagram; the methodology carries no marker.

Status: Confirmed

## Product and technical context

- Blotter is a logistics layer only.
- Auto-capture is the founding principle.
- Blotter must not be described as reading unrestricted personal email.
- A third-party Google connection provider remains unselected.
- Lovable is the implementation tool.
- The old design-token system and prior platform pixels are not authoritative.

Status: Confirmed

## Rejected and superseded items

- `You keep your record. Blotter keeps the state alive.` Rejected.
- Mandatory early Gmail OAuth or simulated Google authentication. Rejected.
- Price on the main landing page. Rejected for round one.
- Multiple plans or price A/B testing. Rejected.
- Card-entry form or payment collection. Rejected.
- Separate `cta_clicked` analytics event. Rejected.
- Permanent or bounded project kill condition. Rejected.
- Separate event-to-row narrative section duplicating the hero mechanism. Rejected.
- `See the spreadsheet experience` as the Question 2 button. Rejected.
- School-email-only placeholder or implication. Rejected.
- Pre-terminal `demand test`, `beta reservation`, future-price, future-availability, or no-charge disclosure. Rejected.
- Full unified three-frame WS5 storyboard as an active or preferred requirement. Never ratified and inactive.
- Stale rear sheet, before-and-after transformation, or tracker-decay storytelling in the hero. Rejected for the hero.
- Explicit vertical Blotter engine or cue-to-engine-to-sheet diagram in the hero. Rejected.
- Ownership labels above the hero spreadsheet. Rejected.
- Curly-brace ownership treatment in the hero. Rejected in favor of restrained region underlines.
- Section 2 manual-tracker divergence table and another spreadsheet visual. Superseded.
- Section 2 `55 coffee chats`. Superseded by `68 coffee chats`.
- Section 2 multi-email or three-message consequence sequence. Rejected.
- Section 3 `YOU CONTROL` and `BLOTTER MAINTAINS` lists. Superseded and removed.
- Treating the provisional Section 3 Blotter mark as the global canonical logo. Not ratified and prohibited without a later identity decision.
- Treating the Outstanding Actions asset as merely directional. Superseded by formal exact status for Section 4 and funnel Frame 3.
- Creating a second independently styled Outstanding Actions visual for funnel Frame 3. Rejected.
- Converting Outstanding Actions into dashboard cards, KPI tiles, or a generic task-management interface. Rejected.
- Adding `YOUR EXISTING TRACKER` or `BLOTTER ADDS THE LIVE LAYER` inside the exact Section 5 asset. Superseded by the approved unlabeled zoning.
- Turning Section 5 into a migration flow, field-mapping diagram, two-sheet comparison, import animation, or arbitrary-layout-preservation promise. Rejected.
- Section 6 wording that claims a selected provider's Google application has completed verification. Superseded until provider and verification facts are established.
- Naming Nylas, Unipile, or another provider in Section 6 before selection. Rejected.
- Section 6 security shields, seals, fake OAuth, marketing cards, `Bank-grade security`, `Industry-leading encryption`, `Secure by design`, `Accredited provider`, or unverified SOC 2, CASA, Google-verification, retention, deletion, and subprocessor claims. Rejected.
- Creating an external visual asset for Section 6. Rejected as unnecessary.
- Adding price or availability questions to Section 7. Rejected.
- Merging Section 6 privacy FAQ with Section 7 product FAQ. Rejected.
- Ending the landing page on an accordion. Rejected.
- Adding an illustration, dashboard, spreadsheet, secondary CTA, or external asset to Section 7. Rejected.
- Sending one giant Lovable whole-site build message before plan approval. Rejected.
- Treating existing Lovable scaffolding as approved implementation. Rejected.
- Selecting analytics, database, or Google connection providers by default without approval. Rejected.
- Publishing the spreadsheet page during WS5. Rejected.

---

## Session 3, stage 6. Jon's rulings, August 5, 2026

Every item here is authority level 1 under `WS5-SPEC.md` "Source hierarchy".
Each is stamped in an amendment table at the top of the spec file it changes,
and the implementation carries the same reasoning inline.

### The identity, newly created

`03-SECTION-3` section 7 held that the provisional mark inside its asset was
authoritative for that asset alone, and section 20 left "whether it later
becomes part of a separate canonical Blotter identity system" open. It is now
decided.

- **Mark: `Ledger B`.** The letter is built from the spreadsheet rather than
  decorated with it — the two bowls are rows, the stem is the row-number
  gutter, split into one cell per row by the hairline the sheet uses between
  the gutter and column A. Chosen over four alternatives and a control.
- **Wordmark: Schibsted Grotesk 700, tracking -0.035em.** The page's display
  face, so wordmark and headlines are one voice rather than two.
- **Colour: navy alone.** Yellow and cream are unavailable to the identity
  because they are semantic on this page and mean "Blotter maintains this"; a
  yellow mark would read as a maintained field everywhere it appeared,
  including the header, where nothing is maintained. Reversed contexts use
  pure white, never cream, for the same reason.
- **Rejected:** a pixel-grid letterform, which only survived small sizes by
  pixelating and stopped looking good before it stopped being legible; a
  Sheets selection frame, whose fill handle read as a speech bubble; a
  metaphor-only record mark; a plain monogram; and a folded-corner document,
  which is the most generic mark in software.
- Geometry, ratios and size floors live in `web/lib/brand.ts`. The mark, the
  wordmark, the lockup and the reversed tile live in
  `web/components/brand/blotter-mark.tsx`, drawn once so the favicon and the
  header cannot drift apart.

### The page-theme colour rule, relaxed

The August 5 page theme fixed one navy accent with the Blotter yellow kept
strictly semantic. Jon relaxed it the same day for Section 3's resolution
block, where the symbol tiles carry three distinct tints. The semantic meaning
still governs the product surfaces and the identity.

### Section 3

The formal exact asset is discarded and the mechanism rebuilt as a day. The
full amendment table is at the top of `03-SECTION-3-HOW-BLOTTER-WORKS.md`.

The reasoning worth preserving: the asset was three boxes in a row, two of them
real and one — the Blotter module, the only stage the section exists to
explain — an empty square with a logo in it. It asserted Blotter rather than
showing it. `Current` is a time word and nothing else on the page carries time;
every other section shows a tracker that happens to be right, never one
becoming right.

Blotter is claimed once, by the rail every moment passes through, never by a
badge on an individual row. Marking only Daniel would have read as the one
thing Blotter caught, when it is equally what recognised Sarah's reply and
Priya's chat.

The ChatGPT mark on `No AI slop` overrides section 17's "provider references"
exclusion. The trademark use and the negative comparative position were both
put to Jon and both waived.

### The hero

The third activity cue moves from Alex Morgan to Daniel Kim. Silence is the
stronger proof: a reply is bolded in the reader's inbox and they can notice it
unaided, whereas nothing at all arrives to mark a thread going quiet. Alex
Morgan's row and its ratified em dash are untouched — that ruling is about the
cell, not the cue.

### Sections 4 and 5, merged

One section, two beats, preservation first. The full amendment tables are at
the top of both spec files.

The page was carrying three separate Google Sheets windows and a reader files
three tables as one repeated idea. The two beats are literally two tabs of one
file. `Contacts` sitting untouched in the tab strip is itself the preservation
proof. Both ratified headlines survive intact and in order, so the merge costs
no copy, only a section boundary.

The Outstanding Actions asset is discarded and section 13's exclusions fall
wholesale with it. The asset filled four of its six rows with `+N more`, so two
thirds of the visible content announced that the content was not visible, in
the one section whose job is to prove completeness.

Eighteen of the twenty-one contacts in the rebuilt action view are invented.
Flagged and accepted.

### Funnel implications, set aside

Jon ruled that already-ratified funnel frames must not constrain landing-page
design, and that he may cut the funnel entirely in favour of showing everything
on the page behind a single direct CTA. `04-SECTION-4` section 10's Frame 3
reuse is therefore inactive as a design constraint. The funnel decision itself
is deferred.

### Rejected during this session

- Reproducing `how-blotter-works-exact-v1.avif`. Rejected by Jon.
- Reproducing `outstanding-actions-reference-v1.png`. Rejected by Jon.
- A three-stage pipeline diagram for Section 3, in any styling. Rejected.
- Twenty-one stacked action rows. Rejected: each extra row bought nothing.
- Group bands showing two of six rows. Rejected: the truncation makes no sense.
- A dark navy panel behind Section 3's product-boundary statements. Rejected as
  too bold and too dull at once.
- Outlined pills for those statements. Rejected.
- Leader lines ticking each reassurance claim to the part of the sheet that
  proves it. Rejected, and the arithmetic was wrong as built.
- Reworking the hero to reduce page content. Rejected in favour of merging
  Sections 4 and 5.

### Parked, not rejected

The rear sheet in a stacked-tabs treatment rendered as the messy, stale,
unformatted spreadsheet the reader actually has, which Blotter converts into
the clean Blotter tab. Jon's idea. Recorded in
`web/components/sections/tracker-and-actions.tsx` and worth its own round.

## Session 4 — August 6, 2026 — Sections 6 and 7, and the privacy policy

Stage 7. Sections 6 and 7 built, rejected, and rebuilt in one session, plus the
page's first footer and its first standalone page. Every ruling below is Jon's
and is stamped at the top of the affected build spec.

### Section 6's ground

`06-SECTION-6` section 3 requires a background "materially different from the
preceding product-demonstration sections" and bans gradients inside the section.
Jon asked why a different ground was needed and said continuing the field would
look fine. Three candidates were built live behind `/review/section-6` rather
than argued in prose: continued blue, warm paper, flat neutral.

Continuing the blue made the boundary between Sections 4-5 and Section 6
disappear entirely, which is the failure section 3 was written to prevent. He
chose **warm paper**: the band starts on `--field-e`, exactly where Sections 4
and 5 end, so the handoff discipline holds, but it travels warm rather than
deeper blue and the product sections never go there. `--field-f` is its floor.

### Section 6, rejected on first build

"Absolutely no stylistic technique, so much text, so hard to read, not pretty or
digestible at all. A blob of unformatted information that no reader would ever
read."

The cause was structural rather than typographic. The specification asks for
four passes over the same facts and then a seven-question FAQ that restates all
four. Measured against the built section:

- eight of the nine commitments restated a `Cannot do` row or a sentence above;
- **all seven** privacy FAQ answers restated something already on the page,
  204 words carrying no new fact;
- exactly one statement in the section — Google Contacts — appeared once.

Roughly 700 words became roughly 320, and Section 6 went from 3,083px to
2,087px. What changed:

- The opening statement names **Sheets**. The permissions table three blocks
  below discloses a Sheets scope, and the one section whose job is disclosure
  cannot name two of three services.
- The claim's tinted block is cut. It carries itself typographically instead:
  first sentence at display size, the two that qualify it at reading size.
  The copy is byte-identical and the verification checks that.
- The four steps stop being four rows of prose and become a mechanism — one
  gate, two tracks, one outcome — carrying the Gmail, Calendar and Sheets marks.
  Colour is semantic: the excluded track is recessed, the processed one is not,
  and what survives is cream, which means "Blotter maintains this" everywhere
  else on the page.
- The permissions table gains the three service marks, which section 8 always
  permitted and the first build declined.
- The broad-permission disclosure loses its banner and becomes a caption under
  the table. Jon asked whether it could move into the privacy policy. It cannot:
  it is the only place the page reconciles Google's broad consent screen with
  the narrower processing claim, section 9 fixes its position and section 18
  bans hiding it. He accepted the argument. Losing the banner was the right half
  of the instruction.
- The nine-commitment block is cut. The two commitments nothing else covers sit
  under the table; all nine still appear on the privacy-policy page.
- The seven privacy questions move to the privacy-policy page in full. Moved,
  not withdrawn, and they have still never met Section 7's product FAQ.

A first pass set the excluded track and the whole `Cannot do` column in
`ink-faint`. Reverted: it made the page's most important exclusions its least
legible sentences, and a `Cannot do` list is a fact rather than a warning.

### The provider sentence, and what the research found

Jon rejected the provider-agnostic copy as unusable and ruled the page should
say the provider is CASA certified. This supersedes `06-SECTION-6` sections 13
and 18 and reverses the WS4 supersession-table row that replaced exactly this
kind of sentence.

He asked for research first, and it changed the wording:

- Nylas's public claim for its shared Google application is **Tier 3** CASA, not
  Tier 2. Stating any tier would be wrong for Nylas and unknown for anyone else,
  so the sentence names the assessment and no tier.
- On the Nylas shared application the Google consent screen reads **`Nylas`**,
  not `Blotter`. Blotter's own name there requires Blotter's own Google
  application, which makes the CASA assessment Blotter's obligation rather than
  the provider's — at which point the sentence is false as written.

Built as: `Blotter connects to Google through an established connection provider
whose Google application has passed Google's CASA security assessment.`

**This is the page's one unverified claim.** No provider is selected. Carried as
three new gates in `06-assumptions-and-open-questions.md`, including the
consent-screen identity question, which is a product decision and not a copy
decision.

### Section 7

The five-question FAQ was reviewed and passed with no changes.

The closing block was cut: "we don't need this super bold massive deep blue box
— we do enough to pull you in already." The large centred panel is replaced by a
compact footer carrying the exact closing headline, the final CTA opposite it,
and then the brand, a privacy-policy link and social links. The supporting line
and the reassurance line are cut.

The navy ground survives the cut. `--color-closing` was reserved for this moment
in session 2 and left unused through six sections, and section 1 still requires
the page not end on an accordion. A compact dark footer satisfies both.

There is no footer in WS3, WS4 or WS5. This is the page's first, built to
instruction. LinkedIn is `linkedin.com/company/blotter`; the X account does not
exist, so its mark renders as a non-interactive placeholder rather than a dead
link.

### The privacy policy page

No specification ratifies any policy text. `06-SECTION-6` section 15 requires a
real destination before public traffic and stops there. Jon ruled a hybrid:
conventional structure, written broadly, because no product is being offered
yet, with the language to be drafted and ratified by him later.

The rule the page is built on: **structure may be conventional, facts may not be
invented.** Fourteen articles plus the relocated privacy questions. Every
substantive claim either imports from `lib/privacy-copy.ts`, so the page and
Section 6 cannot contradict each other, or renders as a visible
`[ to be confirmed: … ]` slot. Twelve such slots. None may be filled with a
plausible value: each is a commitment about real user data.

### Other

- Section 2's methodology footnote reads `Summer Analyst 2027`, was `2028`. The
  year inside the parked Goldman Sachs email asset is untouched, as is the
  `Summer 2028` funnel recruiting-window option.
- The privacy FAQ heading invented during the first build,
  `Common questions about your data`, is gone with the FAQ. No invented visible
  copy remains in Section 6.

### Verification

Production build passes. Typecheck clean. Lint clean apart from the pre-existing
`analytics.ts` warning. Page is 7,953px, no horizontal scroll at 1440.

Every backtick-quoted string in both build specs was extracted and diffed
against the rendered DOM of the landing page and the policy page together, so
the consolidation is provably a relocation rather than a deletion: all present,
none of the forbidden ones, and the four Jon amended are recorded as
intentionally absent. Two dashes in visible copy, both permitted — Alex Morgan's
hero cell, and the section 10 sentence Jon cleared this session.

Accordion behaviour asserted in the DOM: all rows closed on load, opening one
closes the other, panels carry `role="region"` and `aria-labelledby`, and
`hidden="until-found"` means find-in-page opens a closed answer instead of
skipping it.

### Section 6, third build

Jon rejected the second build too, and his diagnosis was right and structural:
the section stacked **six different layout languages** — a quote block, a
bordered diagram card, a table card, a two-column note, a two-column text pair,
a paragraph. Each was defensible against its own spec clause; together they read
as chaos. The `01 / 02 03 / 04` arrangement implied a flow that was never drawn.
The orphan bullets and the floating deletion statement were leftover content
parked in whitespace, which is not a layout decision.

His instruction: reduce the section massively, push the rest to the back page,
keep one visual flow of the four steps with icons, take the box off it so it
sits on the gradient, incorporate the permissions material minimally, and let
the back page be plain paragraph text.

**The reference settled the macro question.** Shortwave — a Gmail application on
restricted scopes facing the same Google review — carries none of this on its
marketing site. It is a docs page: eleven headed sections, prose only, no tables
and no cards, roughly 600 words. The serious version of this surface is a small
section plus a real page behind it.

Section 6 is now three parts and a footnote:

- **the claim**, one paragraph a step above reading size, no block, no rule, no
  display weight. Both earlier builds set it as a large bold line directly under
  the section head, which is the definition of a subheader;
- **the flow**, four steps drawn horizontally with four hand-drawn marks and a
  hairline connector, on the section ground with no panel. The second beat is
  the exclusion, so it carries the struck mark and a muted ring and colour does
  the branching a fork diagram would otherwise have to draw;
- **three service columns**, the permissions matrix turned ninety degrees and
  stripped of every piece of chrome. Same exact content; the eye scans three
  short lists instead of tracking across a 1,124px row, and the columns end at
  roughly the same depth, which the table never did.

Then two footnotes — the broad-permission disclosure and the provider sentence —
and the link.

3,083px, then 2,087px, then **1,284px**. One layout language.

Everything else moved to `/privacy`: retention, deletion, all nine commitments,
the provider's supporting paragraph and its `Google connection provider`
heading, the seven privacy questions, and now also the four processing steps in
prose and the broad-permission explanation. Nothing was withdrawn, which is why
the copy verification diffs both surfaces together.

`06-SECTION-6` §7's ban on icons is reversed; §18's ban on seals, shields and
security iconography is not, and nothing drawn here is one.

### Rejected during this session

- Section 6's first build, entire. Rejected by Jon.
- Section 6's second build, entire. Rejected by Jon.
- The permissions matrix as a bordered table with a header row. Rejected: still
  a wall of text at full page width.
- The claim in a tinted block behind a rule, at display weight. Rejected twice.
  It reads as a section subheader.
- Continuing the page gradient into Section 6. Rejected after seeing it: the
  section boundary vanished.
- The nine commitments set beside the retention copy. Rejected on evidence:
  three 130px columns, every promise over four lines, columns ending at
  different depths, and the longest promise reading as the most important.
- Moving the broad-permission disclosure into the privacy policy. Argued
  against and not pursued.
- Dropdowns for the four processing steps. Argued against: hiding a permission
  claim behind a click is what section 18 exists to prevent.
- Stating a CASA tier. Rejected on research: Nylas claims Tier 3, not the
  Tier 2 Jon had in mind.

## Session 5 — August 6 to 10, 2026 — the funnel, the infrastructure, and launch

The longest session so far. It began with Sections 6 and 7 ratified and ended
with a live site on `blotterib.com` carrying real traffic and one real lead.

### The CTA label

`See how Blotter works` becomes **`Try Blotter Now`** (capital N, his).

Forced rather than cosmetic. The old label promised a demonstration and the
funnel kept that promise with the three-frame product experience. He cut the
three frames, so the old label would have been writing a cheque the funnel could
no longer cash. Supersedes `WS4-SPEC.md` and `07-SECTION-7` §9.

If the platform variant is ever built it must carry this exact label. WS3
requires the two surfaces stay comparable and the CTA is the first thing that
would diverge.

### The funnel, built

Ruled on August 6: build everything WS3 and WS4 specify **except** the
three-frame click-through, and put Film A in its place. Film A is the launch
asset from the parallel `social/` chat.

**A modal card over the page, not a route.** He asked which was right. Full-page
flows suit long, high-commitment, deep-linked journeys — Typeform, Stripe
Checkout, onboarding. A card suits short flows where context matters and
dismissing should be cheap. This is six short screens, the page underneath *is*
the argument, and `funnel_started / page_viewed` is a ratified comparative
metric, so anything that makes starting feel heavier is a measurement cost
rather than only a design one.

Sequence: `question_track → question_window → film → email → price → checkout →
confirmed`.

What replacing the frames cost, measured against WS3 rather than guessed: the
primary comparative metric is untouched; three diagnostic ratios built on
`product_experience_completed` are lost, and WS3 states diagnostics do not
determine surface selection. The event keeps its place in the frozen nine and
now fires when the film stage is left. **Not renumbered, not repurposed.**

### Funnel rulings, in the order he made them

- **One card size for every screen.** A dialog that resizes on each `Continue`
  reads as unfinished. Fixed at 960x730; the film sets the size because it needs
  the most room, and every other step centres a 460px column inside it.
- **`Other` is a text field on both questions**, typing required before
  `Continue` enables, and the text is kept. A research field: the point is
  learning which categories are missing from the lists. Added
  `recruiting_track_other` and `recruiting_window_other` to the event properties
  and the lead record — additive to WS3's frozen set, so every existing property
  keeps its meaning and the variants stay comparable.
- **The film was too small.** 380px was rejected as small and blurry; at that
  width the film's own type lands around 8px effective. Now 520px, 87% more
  area. 4:5 is an advantage in a portrait card, not a compromise.
- **The price screen did not look official enough.** Rebuilt to what real plan
  screens do: product identified by its mark, price the largest thing on screen,
  included items in a bordered panel with filled checks, billing terms with the
  price. Apple Pay uses the Apple mark.
- **Two copy amendments, both his diagnosis.** At the price screen he could not
  tell what he was buying — a download, a signup, a link. `PRICE_DELIVERY`
  answers that in one line. The checkout description named the parts rather than
  the thing being bought. Both are flagged unratified in code.

### Gating the film: asked and answered

He asked whether the film should be watchable-to-completion before `Continue`
enables. Ruled against, on three grounds: it sits immediately before the email
field, which is where funnels bleed; it would turn `checkout_started /
page_viewed` into a patience filter rather than an intent measure, and WS3
requires the platform variant to match on interaction burden, so the gate would
have to be replicated there too; and WS3 and WS4 already say "no timer, autoplay
gate" and "no unnecessary tutorial burden".

**The traffic then settled it.** The one real visitor spent eight seconds on a
21.5-second film and went on to submit an email. A gate would likely have lost
them.

### The demand-test framing. Do not re-litigate this.

Claude proposed hedging Section 6 into future tense on the grounds that it
states as fact things true of no implementation. **Jon rejected it and was
right.** The landing page is a demand test: presenting the product as real is
the instrument, and a visitor who has to work to discover it is unbuilt is
precisely what makes the intent signal meaningful.

Section 6 stays in the present tense. The privacy policy is where that stops.

### The privacy policy, completed and then corrected

Every `[ to be confirmed ]` marker was answered on August 6: entity `Blotter`,
no registered address, `blotterib@gmail.com`, minimum age 18, United States
only, PostHog and Supabase and Stripe named, no audits or certifications held.
The Google scopes were researched and stated with Google's own consent-screen
wording: `gmail.readonly`, `calendar.events.readonly`, and `drive.file` rather
than `spreadsheets`, because `spreadsheets` grants every spreadsheet in the
account and would contradict the ratified claim that Blotter cannot reach
unrelated files.

Then corrected on August 10, at his instruction. The notice said "Blotter is not
yet available and is not processing anyone's data", which stopped being true the
moment Supabase and PostHog were connected. New **article 03, `What happens
today`**, states exactly what is collected now, by whom, where, and how to have
it deleted. Everything after article 03 describes the launch.

**If what is collected changes, article 03 changes first.**

### Infrastructure

- **Supabase** for leads, US region. Browser posts to `/api/lead`, which writes
  with the `service_role` key server-side. The browser never touches the
  database: the alternative puts a write-capable key in the page source. RLS on
  with no policies, so the anon key can do nothing. Verified: the served HTML
  does not contain the service key.
- **PostHog** for analytics, US Cloud. Autocapture off, session recording off
  (the funnel has an email field), web vitals off. `$pageview` **on** —
  reversing an earlier call, because our denominator is `page_viewed`, a
  distinct event, and disabling `$pageview` left every prebuilt dashboard
  reading zero.
- **A real bug found while wiring it**: `page_viewed` fires on mount and the
  vendor loads asynchronously, so the first and most important event was landing
  in the discard sink. Events now queue and flush when a sink connects. Losing
  `page_viewed` would not lose one event, it would silently deflate every rate
  on the surface.
- **The internal-visitor flag.** `?blotter_internal=1` marks a browser forever;
  it becomes a PostHog person property and an `is_internal` column on leads.
  **Marked, not dropped** — dropping would mean never being able to verify
  production without polluting the data being protected.

### The repository moved

`Jon-sOrg/Blotter-Claude` was a private **fork** of `jnachman17-hue/Blotter-GPT`,
and GitHub will neither transfer nor detach a private fork. Vercel's Hobby plan
refuses private *organisation* repos but accepts private *personal* ones, so all
242 commits were pushed to a new unforked personal repo.

### Live, and what production protection actually allows

`blotterib.com` and `www.blotterib.com` both serve. **Vercel Hobby cannot
password- or SSO-protect a production deployment** — that is a Pro feature — so
the plan of deploying privately and fixing claims later was never available.
`noindex` plus `app/robots.ts` are what keep it out of indexes.

Jon overrode the standing "do not route blotterib.com" rule explicitly.

### What the first real traffic said

Eleven external visitors, eight of whom viewed the page, and **one real lead**:
a Columbia address, Management Consulting, on desktop.

That session, minute by minute: landed, **clicked the CTA nine seconds later**,
spent 4.5 minutes on the questions, skipped the film after 8 seconds, submitted
a real `.edu` address, saw `$9.99 / month`, and **left seven minutes later
without clicking through to payment**.

Three readings, all provisional on n=1:

- the hero converts;
- the film is not earning its 21.5 seconds;
- the price is where it stopped, and seven minutes on that screen is
  deliberation rather than disinterest.

Zero external visitors have reached `checkout_started`.

### Rejected during this session

- Hedging Section 6 into future tense. Rejected by Jon; the demand test needs
  the present tense.
- Gating the film behind full playback.
- Deployment protection as a sequencing plan. Not available on Hobby.
- Dropping internal traffic rather than marking it.

---

## Session 6 — August 10, 2026. Stage 10, the mobile build.

Seventeen commits on the `mobile` branch. Nothing deployed; `blotterib.com` is
still session 5's build.

### The page was desktop-only and it is not any more

A fixed 1,124px page box at every viewport meant every section stuck out 749px
past the right edge of a 375px phone. One breakpoint, `desk` at 1180px, now
separates the ratified desktop page from a real mobile build. The box became a
ceiling rather than a fixed number, two type tokens move below it, and a shared
`Fit` primitive replaced four hard-coded scale calculations.

**Desktop is byte-identical.** Verified by measuring every section's height
before and after: all zeros except Section 6's +50px, which is one new sentence.

### Film C is the mobile hero

The desktop hero's mechanism *is* its sideways relationship — activity right,
connector, the row it changed left. A phone has no "beside", and shrinking the
1322px composition lands it at 0.265 with sheet type under 4px.

Film C was briefed and built in a parallel chat: 11 seconds, three beats, no end
card, looping, shown as a 1:1 centre crop. Its three beats are Section 3's three
ratified moments, so it cannot contradict the page — a property held on purpose.

**Two heroes, each right for its device.** Whether desktop should also become a
film is parked in `06-assumptions-and-open-questions.md`.

### Jon's translation of the volume chart beat all three I proposed

The desktop diagram spends 236 of 1120px on a label column and the rest on ten
month columns; at 350px that is 24.5px per month and the four figures land at
12.5px. He proposed dropping the time axis entirely and packing the marks.

All 745 marks survive, one per unit, in about 90px. `02-SECTION-2` §15 permits a
separately composed translation and its do-not-reopen list does not include the
trajectory. The cost, which he accepted, is the January–February pivot band.

### The sticky bottom CTA was approved and then rejected

He approved a fifth CTA placement in the morning and chose against it the same
day having compared all three arrangements on his phone. It cost 85px of every
screenful, and the doubling it existed to solve read as persistence rather than
as a mistake once he saw it in place. The component and the enum value are kept
so the decision is reversible.

**The pattern worth remembering:** three live arrangements behind a picker
settled in one look what two rounds of argument had not.

### Section numbering, mobile only

`01` through `05` above each section headline. He chose the bare numeral over
`01 / 05`, which read as a progress meter on a page that is an argument rather
than a form. Desktop stays unnumbered — four build specs forbid an eyebrow and a
numeral above a headline reads as one.

### The page's argument has a real fault, and he found it

Reading the live desktop page he noticed three consecutive headlines saying the
same thing, with visuals that did not match their headlines.

The ownership claim is stated **four times**, three of them inside Section 3, and
`03-SECTION-3` line 341 shows the duplication was seen at ratification and
mitigated with whitespace — which is the one thing a phone has none of.

Worse, the words and pictures are crossed between two sections: Section 3 argues
ownership and demonstrates mechanism; Section 4+5 argues preservation and
demonstrates ownership.

**He ruled it be fixed on both surfaces**, mobile first, with the decisions
carried to web in web-appropriate ways. The full diagnosis, the agreed mobile
architecture and the porting rules are in `09-page-argument-rework.md`.

### Rejected during this session

- Scaling every composition down to fit the phone. It lands near 0.29 — a page
  that fits and cannot be read, and it passes a naive overflow check.
- Putting the hero eyebrow in the sticky header. 79 characters of tracked
  uppercase needs about 630px against roughly 265px of usable bar.
- Moving the authority line above the film as a byline. It only dangled because
  the arrangement being tested had removed the button beneath it.
- Merging the Drive note into the broad-permission disclosure. That note is
  about one row, not about Google's wording in general.
- Cutting the broad-permission disclosure from mobile. It may not leave the
  page; folding it is a defensible reading of §18, removing it is not.

## Session 7 — August 11, 2026. Stage 10 continued, mobile 02.

### The sheet on a phone: a deliberate crop

**Ruled by Jon, August 11, 2026, unblocking mobile 02.** `09-page-argument-rework.md`
§5 listed three approaches and nothing was agreed. He chose the crop.

The arithmetic that framed the choice. The Blotter tab is 1,221px natural — a
43px gutter, five `yours` columns at 640px and five maintained at 538px — set in
13px Arial. Phone content width is 350px at a 390 viewport, 320px at 360, 280px
at 320. Scale-to-fit is **0.287**, which puts the sheet type at 3.7px. Holding
11px type affords roughly 412px of natural width, which is the gutter plus
**three of the current columns**.

**The constraint that actually decided it, and it was not in `09`.**
`05-SECTION-5`'s amendment table lists as still binding *"the section 6 column
order and the divider between LinkedIn and Status."* Column order is fixed, so
`Status` cannot be moved next to `Name`. The divider sits at 683px, **56% across
the sheet**, and the only columns between `Name` and the divider are `Title`,
`Firm`, `Email` and `LinkedIn`.

That is the whole difficulty in one sentence: **the columns that prove
preservation are exactly the columns that have to go for the ownership divider
to be visible at rest.** Each of `09` §5's three approaches is a different way of
paying that bill.

**Why the crop stops being a compromise.** `09` §4 already assigns the
preservation proof to the tab strip — *"`Contacts` sitting untouched beside
`Blotter` says this is the sheet you already had"* — reinforced by the supporting
paragraph and the three reassurance claims. If preservation is the tab strip's
job, the grid only has to prove **ownership**, and cropping to the divider costs
the section nothing it was relying on.

Four reasons the crop won over the alternatives:

1. it repeats the two precedents that already worked here — Film A dropping
   eight hero columns to five, and mobile 01 translating the Gmail strip into a
   phone inbox;
2. it survives a screenshot, which is how this page argues and how Jon reviews;
3. the divider is on screen at rest, which
   `06-assumptions-and-open-questions.md` requires in as many words;
4. `05-SECTION-5` §12 says *"do not scale the full spreadsheet until the text
   becomes unreadable"* — re-composing at phone column widths is the sanctioned
   move, and shrinking to 0.287 is the forbidden one.

**Rejected, with reasons, both put to him:**

- **Frozen name column and swipe.** All ten columns at 1:1 and genuinely what
  you do in Sheets on a phone, but the divider is off screen at rest unless the
  region starts scrolled, which then hides `Name`. It is also an interaction on
  a page whose rule is that the argument survives a still frame: a screenshot of
  it shows five manual columns and no Blotter. Kept as variant 3 of the review
  build so the crop's cost is visible rather than asserted.
- **A vertical card translation.** Fully legible and all ten field names land
  naturally, but it stops looking like Google Sheets, which breaks
  `04-SECTION-4` §12's recognisable-Sheets requirement and quietly undercuts
  *No switching out of Google Sheets* — a ratified reassurance claim sitting
  about 100px above it.

### The reassurance row stacks on a phone

Three claims across at sheet width is 116px per claim at 350. Jon asked to see
it stacked. Provisional until he looks at it.

### The ten field names move under the sheet

`05-SECTION-5` §12 requires all ten field names survive any smaller-screen
treatment. On desktop the two zone labels sit above the sheet, sized to the two
zones' widths; on a phone those widths are 84px and 250px and the labels cannot
hold that geometry, and `09` §4 gives the space directly above the sheet to the
three stage labels.

So the zone labels become two compact lines **beneath** the sheet, each naming
its five fields in the ratified column order and keeping desktop's exact
wording. That discharges §12 literally and explains the crop in the same breath.

### The three stage labels are cut from mobile

**Ruled by Jon, August 11, 2026, on sight.** They were built above the phone
sheet per `09` §4 and he rejected them immediately: they *"make no sense"*
there.

He is right, and the failure is instructive rather than cosmetic. `09` §4 had
argued the labels survive because *a stated claim under a proved one is a
caption*. But they are not above the thing that proves them — the hero film is
1,100px earlier — and what sits directly beneath them is a picture of the
ownership split. So they caption a claim the visual below them does not make.
**That is the §1 fault of the whole rework, reintroduced by the fix for it.**

They came out of the section being deleted and were parked in the nearest
available one, which is not a reason. The claim survives in words in the
supporting paragraph. Recorded in the web ledger as not transferring: on desktop
they sit inside the timeline they label, which is correct.

### The merged section's headline is reopened

**Jon, August 11, 2026:** `You manage the relationships. Blotter maintains the
moving parts.` and `Keep the tracker you already built.` are *"two components of
the same thing"*, and which one the merged section takes, or whether it takes a
hybrid, is undecided.

The observation matches `09` §3's own inventory — C is ownership, D is
preservation, and they collapse because one sheet proves both. So a headline
stating only preservation under-claims its own picture.

Building on option C as a working position, unratified: both ratified strings,
`Keep the tracker you already built.` as the headline and `You manage the
relationships. Blotter maintains the moving parts.` as the deck, with the
supporting paragraph's first sentence cut because it repeats the headline almost
word for word. Nothing invented; the only edit is a deletion. Candidates and
reasoning in `09` §4.

### Every argument change is now logged for web, as it is made

**Jon's instruction, August 11, 2026.** The mobile consolidation is happening
because the sections are repetitive and their visuals do not match their
headlines *on web too*, so the essence of every change has to reach desktop.
Each one is to be written down with its reasoning at the moment it is made,
parked, and worked through after mobile is finished.

`09` §8 is that ledger. It is deliberately separate from
`08-desktop-changes-pending.md`: 08 is presentation and defects, 09 §8 is what
the page claims and in what order, which is the thing he says was actually
wrong. Rows that do **not** transfer are recorded too, so a later session does
not apply a mobile decision to desktop on mobile reasoning.

### The zone labels degraded into a legend, and that was a real loss

Noticed by Jon, August 11, 2026, unprompted. Desktop states the ownership split
**spatially** — two headings sized to their zones, each with a bracket rule
spanning the columns it names, sitting on top of them. The label points at its
own columns.

The first phone crop replaced that with two text lines beneath the sheet. That
is a key, not a claim, and it should have been flagged as a downgrade rather
than presented as discharging `05-SECTION-5` §12.

**The underlying cause is the crop itself.** After cropping, the manual zone is
94px wide and cannot hold a label. So the crop bought the divider at rest by
giving up the device that explains what the divider means. That cost was
understated when the crop was chosen.

### The swipe is ratified, and mobile 02 is live on the phone page

**Jon, August 11, 2026, having seen the whole section at device width:**
*"Swipe version looks really good. Approve and ratify it all."*

**It is his design.** The swipe had been rejected earlier the same day — nothing
told a reader to swipe, and a still frame showed five manual columns and no
Blotter. His answer fixed the defect rather than working around it: prompt the
gesture, and let the gesture drive the explanation. Each zone washes and names
itself as the reader reaches it.

That buys back the exact thing the crop could not keep. At natural width the two
zones are 640px and 538px, so the two zone labels fit **as ratified**, at full
size, over the columns they name. The crop had to shrink them and then, in its
first build, degrade them into two text lines under the sheet — which Jon named
immediately: a key is not a claim.

It is also the page's own device. `social/README.md` on Film A's typing beat:
*"The left is filled by the user. The right fills itself. The two gestures
mirror, which makes the ownership split happen rather than get asserted by a
word underneath the sheet."* This is that, driven by a thumb.

**`Name` is frozen and keeps a manual tint while frozen.** Freezing it is what
stops the maintained half being five anonymous rows. The tint is the part that
matters to the argument: a frozen manual column sitting inside the cream
maintained wash would say a manual field is maintained, which is the one thing
this section exists to deny.

**The cost, taken knowingly.** The argument no longer survives a screenshot in
full. Both washes are always painted and the manual label is on screen at rest,
so a still frame states the half the reader can see rather than nothing — but a
reader who never swipes does not meet the maintained zone. That is a real
override of the page's static-proof posture. The crop is kept behind
`/review/sheet-mobile` so the decision is reversible, the same way `StickyCta`
was kept.

**Also ratified in the same breath**, because he saw all of it in place: option C
for the headline, the stacked reassurance claims, the refusals resolving the
section, and the section order.

### What shipping it changed on the page

- `how-blotter-works.tsx` is `hidden desk:block`. Section 3 does not exist below
  the breakpoint.
- `Mobile02` renders `desk:hidden`, between Section 3 and the merged section.
- `tracker-and-actions.tsx` beat 1 is `hidden desk:block`, so on a phone that
  element is only the Outstanding list, and its numeral moved down with beat 2.
- `NUMBERED_SECTIONS` changed and the total did not. One section leaves the
  phone, one splits in two, still five.

**Desktop verified unchanged**: all six section heights identical before and
after, document height 7,200px both times. The all-zeros result the handoff asks
for, with no exceptions this time.

### Mobile 03 takes the films' Outstanding list, not the desktop one

**Jon, August 11, 2026:** use *"that version of know what needs your
attention"* from the films, *"instead of this, like, long, mini row version
that's used for the desktop web screen"*.

He is right, and the desktop composition is the reason. Desktop runs the three
groups as **columns**, which is exactly what lets all 21 actions fit in thirteen
rows. A phone has no room for three columns, so `Fit` was scaling that
composition to about 0.29 and every name in it was under 4px.

`social/blotter-film-a-4x5.html` already sets the same data as a **vertical
list**: a title bar with the total, one header row naming the columns, then each
group announced by a tinted header carrying its coloured rule, its dot and its
count, with its rows beneath. **That is `04-SECTION-4` §7's own structure** and
the shape the discarded PNG drew, so this is a return to the spec rather than a
departure from it, and §12's preserve-list is satisfied literally.

**One thing from the film is deliberately not reproduced.** The film ends each
group with a `+N more` row. Jon overruled exactly those rows on August 5, 2026:
the section promises *"one current view of every action you owe"*, and four of
the discarded asset's six rows were labels announcing that the content was not
visible. The phone has the vertical room the three-column desktop layout did
not, so all 21 are listed.

That is a conflict between two of his own rulings rather than between a ruling
and a spec, so both are built and both are behind the picker: **All 21** and
**Cut**. The conflict is named on the review page itself rather than resolved
quietly.

### The funnel is a full-screen sheet below the breakpoint

The card is right on a desktop and wrong on a phone. At 390 the fixed 960px
collapsed to `100vw - 32px` while every step inside was still composed for 960,
and the film alone is a 520px slot, so content overflowed a container that
clips. A modal that is almost the whole screen but not quite also reads as a
mistake rather than as a choice.

The August 6 reasoning survives the translation intact: the card is one fixed
size that never changes between steps, and on a phone the *screen* is that size.

Three details that are decisions rather than mechanics:

- **`100dvh`, not `100vh`.** iOS Safari's `vh` is the tallest the viewport ever
  gets, so a `100vh` sheet puts its own footer under the address bar. That is
  where `Continue` lives.
- **The sheet scrolls.** The film step plus its copy and both controls is taller
  than a phone, and a sheet that clips its own CTA converts nobody.
- **The film step stacks, film first.** It is what the reader came to see. The
  slot is capped at `62dvh * 0.8` so the copy and controls still fit, landing
  about 350x437 at a 390x844 phone.

**Verified against a production build**: the desktop dialog is still exactly
960x730 and its film slot exactly 520x650.

### A measurement error worth recording, because it nearly became a fix

The desktop film slot was measured at 0x0 and diagnosed as a stale-Tailwind
failure of the kind `CURRENT-HANDOFF.md` warns about. **It was neither.** The
query had selected the *first* iframe whose `src` contained `film`, and that is
the hero's Film C, which sits inside a `desk:hidden` container and is therefore
correctly 0x0 at 1440. Scoping the query to the dialog showed 520x650 all along.

The lesson is narrow and practical: **this page now has two film iframes**, one
in the hero and one in the funnel, and any measurement of either has to say
which. Comments written on the false diagnosis have been corrected rather than
left standing.

### The swipe cue became a veil

**Jon's design, August 11, 2026**, replacing the pill that said `Swipe`. His
note: the cue has to coach the gesture, not label it. Grey out what is ahead,
ramp it darker toward the right edge, blur mildly behind it, and let it clear as
the reader travels; the same on the maintained side in cream.

Built as one mechanic. The veil is anchored to the viewport rather than the
content, so it recedes rather than slides. Its tint takes the colour of the zone
at the reader's right edge, so it announces what is coming rather than
describing what is already there. `SWIPE ••• →` rides it, with the dots
travelling left to right because the gesture being taught is travel. Progress is
a high-water mark: a cue that repeats after it has been followed is nagging.

**The one decision inside his idea**, put to him and confirmed: the veil covers
only what is *ahead*, not the visible area. Blurring what someone is reading
fights the reason the swipe beat the crop — nothing shrunk, nothing dropped,
every field legible.

**It recovers a cost.** `09` §5 recorded that the swipe gives up the still frame.
Veiling forward means a screenshot now shows a sharp, readable manual zone with
an obviously unfinished right edge, which reads as *there is more* rather than
as *this is all there is*. Better than the flat wash it replaces.

The two wash strengths built earlier the same day are superseded and deleted.

### Mobile 03 collapses to disclosures, and it does not reopen August 5

Jon: the 21-row list is *"three thumbs of scroll"*, and could the Section 6
disclosure work here. It can, and it beats the film's `+N more`.

**It satisfies the August 5 ruling rather than overriding it.** He rejected
`+5 more` because the section promises *"one current view of every action you
owe"* and four of the discarded asset's six rows were **labels announcing that
the content was not visible**. `Show 5 more` is not that label. It is a control
that delivers them — a dead sign against a working door, which is exactly the
distinction his objection turned on.

About 950px to roughly 400px. Each group keeps its count and its first row in
the open, because §12 requires a readable explanatory row per category and that
must not depend on a tap. One accordion per group, so opening `Follow-ups due`
does not shut `Replies owed`. `hiddenUntilFound`, so find-in-page opens a closed
group rather than missing the name inside it.

`Cut` is deleted. The comparison it existed for is settled.

### Section 01's figures gave weight back to their labels

Jon: the numerals are *"doing too much of the work"* and the labels need to be
bigger or bolder. Numeral 2rem to 1.75rem, label 13.5px muted to 15px semibold
in full ink, so the pair reads as one phrase — *628 recruiting emails* — rather
than a figure with a caption under it.

Not underlined, which he offered as an alternative. An underline on a phrase
that is not a link is a promise the page does not keep.

`02-SECTION-2` fixes the figures and the copy, not their type scale, so this is
presentation rather than an override. Recorded because mobile 01 was ratified on
August 10.

### The film's letterbox bug was in the source, not the copy

Jon reported black bars beside the funnel film and asked for a fix in both
places. **The bars did not reproduce**: measured live at 390, the slot is
350x437.5, the film fills it at k=0.3237, `bare` is applied, no bars. The copy
in `web/public/film/` had already been guarded when it was made.

**`social/` had not.** Both current films there still subtracted 40 horizontal
pixels in bare mode — the preview chrome's inset, which `pad` already zeroes for
the vertical. At the funnel's slot that is 11% of the width spent on letterbox.
Fixed in `blotter-film-a` and `blotter-film-b`; `blotter-film-c` was already
correct, and `blotter-launch` is the superseded cut and was left alone.

**The real point is the trap, not the pixels.** The two directories are kept by
hand and nothing propagates, so the copy was right and its source was wrong, and
the next re-copy would have walked the fix back in silence. They now match.

Separately, and this is what actually addresses "the video is very hard to see":
the film is full-bleed on a phone. It had 20px gutters, which is 11% of a 390px
screen spent on margin around the one thing the step exists to show. 350 to 390
wide, and edge to edge reads as deliberate for video.

### Analytics: all nine events verified from a phone-width session

Asked for by Jon. Driven end to end at 390 on an internal-flagged browser,
`page_viewed` through `beta_spot_confirmed`, and read back out of PostHog.

- **All nine fire, in order, one per visitor.** The suppression in
  `lib/analytics.ts` is working: exactly one of each per `distinct_id`.
- **All nine carry `$host`.** That matters more than it sounds — the runbook's
  canonical filter keys on `$host`, so an event without it would be silently
  absent from every number. None is.
- No mobile change touched event logic. `film-step.tsx` and `funnel.tsx` were
  edited for layout only, and `cta_location = actions` still fires on a phone
  because the CTA sits outside the desktop-only wrapper.

**One trap worth recording.** A first query five seconds after the run reported
`price_viewed` and `payment_option_clicked` missing. They were not missing;
PostHog had not finished ingesting, and events do not become queryable in
timestamp order. **Wait a minute before believing a negative result**, and
confirm against an all-time query for the event name before calling anything
broken.

The run wrote one lead. It is `is_internal = true` and `real_leads` still reads
**1**, which is the one real lead and unchanged.

### Seven mobile changes, August 11, 2026

**The film's black bars, diagnosed properly.** They would not reproduce at
390x844 and reproduce every time at **390x680**, which is the same phone with
Safari's address bar showing. Measured there: the slot came out 337x300, an
aspect of 1.125 against the 0.8 it asks for, the film rendering 240x300 inside
it, 48px of black either side.

**The cause is flex, not the film.** The slot is an item in a `flex-col`
container with `h-full`, and when the step's content is taller than the sheet
the item shrinks — **`flex-shrink` beats `aspect-ratio`**. The box keeps its
width, loses its height, and the film, which fits to whichever ratio is tighter,
letterboxes horizontally.

Three fixes, all of them earning their place. `flex: none` makes the squash
impossible. The `62dvh * 0.8` cap is gone: it bought "no scrolling" the sheet
gives up anyway, and at 680px tall it was capping the **width** at 337, which is
why full-bleed never reached his device. And `body.bare` no longer paints black,
so any future mismatch reads as a soft inset rather than as bars.

Result at 390x680: slot 390x487.5 at exactly 0.8, film filling it. The film is
**62% wider than what he was looking at**.

**The sticky header was never sticky, on either surface.** At `scrollY` 2200 it
sat at document y=850, long gone. It is `position: sticky`, but its parent is
the hero's 910px `field-open` wrapper and a sticky element cannot leave its
parent's box. Jon asked for a header that follows the page; it was supposed to
already. Fixed below the breakpoint with `position: fixed`; **desktop's half is
a confirmed defect for `08`**, and it makes `08` §2's own reasoning wrong, since
that argued against the bottom bar partly because "the header CTA is the only
persistent one".

Both modes built for comparison at `?header=shrink`. Height only: the CTA must
not move, because it is a target the reader may already be reaching for.

**The zone labels travel, and lost the bracket.** Jon: the 19px heading over a
12.5px subtitle over an upside-down-U bracket "could use some serious UI
improvement". The insight that made it easy: **the bracket existed to bind a
label to a span of columns, and the label now rides that span** — it centres on
whatever slice of its zone is on screen. Position does the binding
continuously, so a drawn bracket is a second answer to a settled question. Three
stacked elements become one, 64px becomes 30px, and the marker is the page's own
2px eyebrow bar rather than an invented shape.

Motion per `emil-design-eng`: transform and opacity only, transitions rather
than keyframes so a reversed swipe retargets instead of restarting, and a 2px
blur across the swap because a plain cross-fade shows two labels overlapping
where blur lets the eye read one label changing. 200ms on
`cubic-bezier(0.23, 1, 0.32, 1)`. Reduced motion keeps the fade and drops the
travel.

The veil starts below the label band rather than at the top of the scroller. It
obscures the columns the reader has not reached; the label answers the question
that raises, and veiling it would mute the answer.

**The disclosure control moved onto the group header.** Jon: a full-width
`Show fewer` row "makes no sense at all". Correct, and the reason is that a row
in a spreadsheet is a record, and that one was a control wearing a record's
clothes. The plus now sits beside the count and the header is the trigger, which
is what Section 6 already does. The list contains only actions, in either state.

**The section CTA was floating and is kept.** Right alignment is a device for a
two-column composition; with one column it reads as an element that missed its
anchor. Now on the section's left axis, full-width button, closer to the sheet.

Jon left cutting it open and it is kept, for a reason worth recording: dropping
it would mean `cta_location = "actions"` never fires from a phone, which
silently costs the comparative metric that says where mobile readers convert
against where desktop readers do. The header CTA doubling it is the arrangement
he already accepted in the hero.

**`~60 hours` is bounded on a phone.** His note: it "just sort of seems floating
there". Structural rather than decorative — this page's theme is a bounded-box
layout and on a phone this was the only pulled-out figure with nothing holding
it. Desktop does not have the problem because the figure sits in a two-column
row and the column edge is the boundary. A ring and quiet surface, no shadow and
no fill: `02-SECTION-2` §8 keeps this proof subordinate and forbids a badge, so
the box may enclose the figure but must not promote it.

**Section boundaries get a hairline.** The numerals are unchanged, as he asked.
What they lacked was an edge: whitespace and a field tint too subtle to read at
phone brightness were the only things separating two sections. Drawn from the
numeral rather than the section so it lands once per section, including the
merged section where the numeral sits below a desktop-only beat.

**A trap that cost twenty minutes.** After a CSS syntax error the dev server
kept serving the broken stylesheet and the page stopped hydrating — clicking a
CTA did nothing, with no error that named the cause. The production build was
already passing. `CURRENT-HANDOFF.md` warns that the dev server's Tailwind goes
stale; this is the harsher version. **If the page stops responding and the build
is clean, restart the dev server before debugging anything else.**

### Both social accounts are live, on both surfaces

Jon supplied them on August 11, 2026 for web and mobile. LinkedIn was already
that exact URL and is unchanged; `X_URL` was `null` since August 6 and is now
`https://x.com/blotterib`, which turns the dim placeholder into a real link.

**This is a deliberate desktop change during stage 10**, the only one so far,
because he asked for both surfaces. It costs no height: desktop measured 7,200px
before and after.

He wrote the LinkedIn address with a trailing full stop. That is sentence
punctuation rather than part of the slug — a company URL ending in `.` 404s — so
it is dropped. The `null` branch stays in the code: it is the only thing between
a missing account and a dead `href`, and it costs nothing.

This closes the `X_URL` item that has been open in `CURRENT-HANDOFF.md` §9.

### The label buzz was a transition fighting a scroll handler

Jon recorded it. The cause was mine and it is worth naming precisely, because it
is a mistake that looks like a performance problem and is not.

The label's `translateX` was in React state **and** had a 200ms CSS transition.
So every scroll event moved the target, the transition started easing toward it,
and the next event moved it again before the ease finished. The label never
arrived. That is the buzz — not dropped frames, an easing curve chasing a thumb.

**A transition is for a state change.** Position here is a continuous readout of
the reader's finger, and the only correct response to it is to follow exactly.
Position is now written straight to the element in the scroll handler, no easing
and no React in the path, so the sheet and its labels move as one object.

React still owns the two things that genuinely are discrete — which zone is
ahead, and whether the region scrolls — and those keep their transitions,
because a fade between two labels *is* a state change. The veil's opacity moved
to the same treatment for the same reason.

### The funnel fits one sheet, and the square was free

Jon: the film is finally legible but the copy and `Continue` are below the fold,
and *"we need all this present on one sheet. That's real important."*

The film was the only element with real slack, and the 1:1 crop costs nothing:
every visible element in Film A sits inside the square safe band, verified in
`social/README.md`, which is why the mobile hero already crops it this way. At
390 the slot goes from 487.5 tall to 390.

**The trap, and it is not obvious.** Cropping the *iframe* to a square would
have been worse than useless: the film fits itself to whichever of width or
height is tighter, so a 390x390 frame renders it at 312x390 and letterboxes it
again, **smaller than before**. The frame keeps its 4:5 and the box around it
clips. That is the hero's technique and it is now shared.

A `calc(100dvh - 330px)` cap makes the film give way rather than push `Continue`
off screen. Measured: **390x390 at a 390x844 phone, 350x350 at 390x680**, with
the rest of the step at about 331px, so it lands on one sheet at both.

### The dead space was variance, not quantity

Measured before: 152, 176, 96, 208, 208. Jon named the 208 and was right, but
the reason it read as "weird" is that a page cannot have a rhythm made of five
different numbers. Each section carried whatever its desktop padding happened to
be, and the ones rebuilt for mobile had picked up their own values.

**One rhythm, 56 above and 64 below, so every boundary is 120px.** After: 112,
120, 120, 120, 120. Every section shrank — 84, 8, 24, 88 and 72 — for **276px
reclaimed**, and every desktop value is preserved behind `desk:`.

### The `~60 hours` ring is gone

Jon's second look: the box "doesn't look great". Correct — an outlined rectangle
around a figure reads as a form field, and it was a shape this page uses nowhere
else. It is now the warm surface the three refusals already sit on, no border
and no shadow, so the figure is held by a plane the page owns rather than by a
box invented for it. `02-SECTION-2` §8 still forbids promoting this proof, and a
fill this quiet does not.

### The label band stops moving, which is the only way to stop it buzzing

Jon, August 11, 2026, after the second attempt: *"Can you just hold that
entirely still as you scroll? And then once you reach a certain threshold, we
cross the line of status, then it just switches to Blotter."*

**He is right, and the reason the second fix was not enough is worth recording.**
v1 eased a transform toward a target the scroll handler kept moving. v2 removed
the easing and wrote the transform directly, which was better and still
vibrated, because **the band was inside the scrolling content**: the browser
paints the content at its new offset, then the handler runs and writes a
counter-transform *one frame later*. The label is permanently one frame behind
the sheet it sits on, and a one-frame positional lag at 60fps is what a
vibration is. That race cannot be won from JavaScript.

So the band moved **out of the scroll container**, into the sheet's chrome below
the formula bar and above row 1 — where it already appeared to be. Nothing
counteracts anything, position is static CSS, and no JavaScript touches it.
Verified: the band's left edge reads 21.0px at every scroll position from 0 to
the end.

All that survives is a crossfade on **one threshold**, the divider passing the
middle of the window, which is the point at which the reader is looking more at
Blotter's columns than at their own. Discrete, so a transition is finally the
right tool. It was a right-edge test before, which switched as soon as the
divider was glimpsed.

**The cost:** the label no longer points at its columns by sitting over them.
The veil covers that, taking the same zone's colour, so the two agree.

### Section 01's supporting paragraph was the biggest body text on the page

Jon found what had been bothering him: at 22px, *"a manual tracker changes only
when you remember to update it…"* was **the largest run of body text anywhere**,
headings excepted, on either surface. It read as important without being a
heading.

It is `--text-lede`, 17px, on a phone — the token the page already uses for
subheads, so it still leads the copy beneath without competing with the headline
above. Desktop keeps 22px, where it shares a row with the 60-hour figure, has a
600px measure to fill, and is not the largest thing in view.

He noted the same is arguably true on desktop. That is a desktop change and
stage 10 does not take them, so it is `08` §16 rather than a change here.

### The `~60 hours` box is gone entirely, third attempt

*"I hate that sixty hours box."* A ring read as a form field; a filled panel
read as a card the page uses nowhere else.

**The mistake was mine twice, and it was the same mistake:** I kept giving the
figure a *shape*, when what it lacked was a *relationship*. It floated because
nothing tied it to the paragraph it concludes.

A hairline says that, and it is the page's own language now — the same rule
marks every section boundary on this surface. The figure is the paragraph's
conclusion, joined by a rule, and the caption takes the 15px semibold the four
volume labels took the same day, so the section has one voice for naming a
quantity. `02-SECTION-2` §8 forbids a badge or a loud highlight; a rule is
neither.

**If he still dislikes it, the next move is removal, and that is not mine.**
`~60 hours` is a ratified figure with a methodology footnote attached, so
dropping it from the phone would remove a claim from one surface — a `09`-level
decision, not a styling one.

### The blue seam was a broken colour handoff, caused by hiding Section 3

Jon, August 11, 2026: a hard line between 01 and 02 and again between 02 and 03,
*"like a blue square that cuts off, and then it goes to lighter blue"*, and new.

The page's background is a **handoff chain**: each band starts on the exact
colour the band above it ended on, which is what makes the seams invisible.
`globals.css` says so in as many words.

On a phone Section 3 is hidden — and Section 3's `field-rise` was the band that
bridged `--field-b` to `--field-d`. Without it:

- Section 2 ended on `b` and mobile 02 started on `d`;
- mobile 02 ended on `e` and mobile 03 started on `d` again, stepping the colour
  back **up**, which is the harder of the two edges and the one he described.

It was not new — hiding Section 3 did that in the morning. What was new is that
the spacing pass shortened every section, compressing the same mismatch into a
shorter run, which turns a slow drift into an edge.

**Mobile 02 takes `field-rise`.** It replaces Section 3 on the phone, so it
takes Section 3's band: `b` to light to `d`. Verified by walking the chain in
the DOM — b, d, e, f, no broken handoffs.

### The Phase 6 accessibility sweep

Last stage-10 item. Four things, all measured before and after.

**The five phantom `Here` links are gone**, from both sources — `parts.tsx` and
the shared `sheet-grid.tsx`, which had its own copy. They were real anchors to
`linkedin.com` inside an illustrative spreadsheet: five phantom destinations in
the tab order and five "link, Here" announcements with no context, at 14x26 on
desktop and 4x8 at 390. Now text keeping the blue and the underline, so the cell
still reads as a spreadsheet hyperlink. **Zero visual delta on either surface**,
which is what made it safe to change a shared file during a mobile-only stage.
Closes `08` §8.

**The swipe is reachable without a touchscreen.** Jon: *"everybody has a touch
screen."* Almost, but a keyboard has no thumb, and without this the maintained
half of the sheet — the half the section exists to show — could not be reached
at all without one. `tabIndex={0}`, `role="region"` and a label; a focusable
scroll container gets arrow-key scrolling from the browser, so no key handler of
our own is needed.

**Two tap targets were still under 44px** after the footer rebuild: the header
brand link at 85x29 and the privacy link at 170x18. Both now clear 44 on a
phone with the box growing around the text rather than the text growing, so
neither looks different on either surface.

**Reduced motion.** Jon asked why it is wanted, and the honest answer is that it
changes nothing for him or for almost anyone: it reads one operating-system
setting a reader has to turn on deliberately, usually because motion makes them
ill. It drops the blur and the veil's tint easing, which are decoration, and
keeps every fade, which carries meaning. Reduced motion means less movement, not
less information.

### Stage 10 shipped to production

Jon, August 11, 2026: *"I want you to push this mobile version to live."*

`mobile` merged to `main`, thirty commits, deployed. Verified live on
`blotterib.com`: mobile 02's deck, mobile 03's header row and the X link all
present, zero phantom anchors, and `noindex` plus `robots.txt` still in place —
the launch gates were deliberately untouched.

Desktop measured 7,200px with zero per-section deltas immediately before the
merge, which is what made a thirty-commit ship to a live site with real traffic
a safe act rather than a hopeful one.

### The next phase has a framework, and it is ordered by risk

Jon asked how best to approach web. `10-web-reconciliation.md` is the answer:
three waves, and the ordering is the whole point.

**Wave 2 changes what sections exist; wave 3 changes what is inside them.** So
assets last, argument second, and the settled presentation sweep first because
nothing later can invalidate it and it removes the cosmetic noise that would
otherwise confound reading the argument work.

**And before any of it, record a new desktop baseline.** Every change in stage
10 was checked against a fixed one and "all zeros" caught three real
regressions. Web work deliberately abandons that baseline, so without a fresh
one there is no way to tell an intended change from a regression, and the safety
net disappears silently rather than loudly.

### The 481 to 1179px band, found by Jon on his own laptop

He opened `blotterib.com` on a computer and got the mobile page, and asked why
it was not adapting.

**It is adapting. The rule is width, not device**, because there is no honest
device signal — a browser only knows how wide it is. His window was under the
1180px breakpoint, which happens with a non-maximised window or with browser
zoom, where 125% on a 1440 screen leaves a 1152px CSS viewport.

**But he found a real gap.** Reproduced on production at 1100: five numerals,
page box 480, Section 3 hidden — a **480px phone column floating in an 1100px
window**. `PAGE_BOX_MOBILE_W` was set to 480 in session 6 so a tablet would get
"a centred phone-shaped column rather than a stretched one". That is defensible
at 768. It is not at 1100.

Verified correct above the breakpoint: production at 1440 measures page box
1124, zero numerals, 7,200px. The desktop page is intact.

Logged in `06` and made the **first row of wave 1** in
`10-web-reconciliation.md`, because it is the only item in the reconciliation
inventory a real visitor can hit today.

### Correction: the 481 to 1179px band is polish, not an emergency

Jon checked and it was his own window: *"I was trying to open blotterib.com on a
reduced window so it automatically adapted to mobile format. But when you expand
the window it goes to web… I was wrong. You had it correct."*

The diagnosis was right — width-based switching, his viewport under 1180 — but
**the escalation was wrong.** The entry written an hour earlier called the band
"the only item in the reconciliation inventory a real visitor can hit today" and
made it the first row of wave 1. That framing came from believing he had hit it
on a maximised window. He had not.

What survives is a smaller, real observation: the 480px cap is defensible at
iPad portrait's 768 and questionable from about 1024 to 1179, which is iPad
landscape and a browser snapped to half a wide display. Low severity, nobody
harmed, worth doing while desktop layout is open anyway.

Demoted in `06` and moved out of the lead position in `10`'s wave 1, which goes
back to the header defect — a measured fault on both surfaces rather than a
question of taste at unusual widths.

---

## Session 8 — August 11, 2026. Web reconciliation, wave 1.

### Three rulings that close or park standing questions

**The connection provider stays ambiguous, and stops being a checklist item.**
Jon: *"Connection provider is to be left in ambiguous terms as it currently is
on privacy page. We don't have one yet and won't for a while. Don't relitigate
this."*

The reasoning matters more than the outcome here, because the outcome looks like
inaction. The provider sentence has been carried as "the one unverified claim on
the page" and surfaced in the §0 checklist of every handoff for five sessions.
That was correct while a provider was thought to be imminent. It is not, and a
blocker that cannot be cleared is not a blocker — it is a tax on every session's
first reply. `06`'s row is marked closed with the revisit trigger moved to
provider selection and nothing earlier.

**The desktop hero as a film is parked until after wave 1, and Jon is leaning
yes.** *"We are going to park film as hero and discuss that after wave one.
Leaning towards yes."*

**The lean is load-bearing for wave 2 and that is worth writing down now.**
`09` §6 argues desktop should not delete Section 3 on mobile's reasoning,
because *"desktop has room and no hero film, so the mechanism may still need its
own section there."* That argument has two clauses and a film hero removes the
second one. If the hero becomes Film C, the film demonstrates the mechanism on
desktop exactly as it does on the phone, and Section 3's survival goes from
settled to genuinely open. **Wave 2 must not be planned as though the hero
question were independent of it.**

**Section numbering moves from wave 1 to wave 2.** Jon, on being shown the
collision: *"section numbering can't be wave 1 because we need to decide on new
web sections. That makes sense."*

`web/app/page.tsx` carries both reading orders in its own comment. Numbering
desktop today lands `02` on "How Blotter works" and `03` on the merged tracker,
against the phone's `02` "your sheet" and `03` "outstanding". `08` §5 requires
the two match exactly or the page contradicts itself between devices, and they
cannot match until wave 2 rules on which sections exist. Cost of getting it
wrong: four spec overrides, spent twice.

### Wave 1's instruction, and how it was read

Jon: *"Go ahead and crank out as much of wave one as possible. Everywhere
stylistically that mobile differs from web, make those changes to web where
possible and where it makes sense. Complete wave 1 and leave unratified things
that need discussing to me."*

Read as: apply the settled rows, apply the mobile-to-web presentation sweep on
judgement, and stop at anything that needs a ruling. Five rows applied, two left
open, one moved to wave 2. The one judgement call taken without a ruling —
Section 2's 22px paragraph — is flagged as unratified in `08` §16 with a
one-class revert, because he raised that observation about both surfaces and it
is about the page's type scale rather than about phone width.

### Two documented claims that turned out to be wrong

Both were caught because somebody had written down the reasoning, which is the
third and fourth time that has paid for itself.

**`08` §13's "one-line move" is one line plus two consequences.** Taking the
header out of `field-open` drops the wrapper's painted box 60px and moves both
of the hero's radial glows, which are anchored to that box — and it directly
contradicts `page.tsx`'s own comment, which put the header inside the wrapper on
purpose. Separately, a header that actually persists travels over every band
below it carrying `backdrop-blur-md`, which is the smear `globals.css` already
warns about for the phone. Both are recorded in `08` §13 with what was done.

**`10` §5 called every wave-1 row "already decided and reasoned."** Two of them
say in their own entries that the desktop half is Jon's call, and one row —
`08` §12, a confirmed defect live on both surfaces — was missing from the table
altogether and would have been skipped.

### A hazard found while fixing §12

`components/section-45/sheet-phone.tsx` keeps its own copy of the ten column
widths, so the row-height fix had to be made twice. **This is the second
hand-kept duplicate in the codebase**, after `web/public/film/` against
`social/` — where the copy was right while its source was wrong for five days.
Both lists now carry a doc comment naming the other.

### Two wave-1 ratifications, August 11, 2026

**Section 2's supporting paragraph stays at 17px on desktop.** Jon, seeing it in
place: *"I'm okay with the section 2 paragraph shortening."* `08` §16 closed.

**The authority line's rule comes down to 12px on desktop.** Jon: *"Keep it as
is on mobile, for web make the dash before it shorter. Simply like a normal -
kinda similar to how it is on mobile."*

The reasoning is worth keeping because **the recorded argument for the opposite
was wrong, and it was wrong in a way that recurs.** `08` §6 had reasoned that
desktop could keep 32px because the line sits in a 490px column where a long
rule has an origin to start from, while a stacked phone layout gives it nothing
to lead into. That is a reason a long rule *can* work there. It is not a reason
it should. Jon's objection was never that the dash had nowhere to start — it was
that it was a big dash, and a wider column does not make a 32px dash smaller,
only less awkward.

The pattern to watch: an entry finds a structural difference between the two
surfaces and treats it as a justification for the divergence, when the
difference only explains why the fault is *less visible* on one of them. `08`
§16 was the same shape — desktop's 600px measure and the adjacent 60-hour figure
explained why 22px was less obviously wrong, not why it was right. Both entries
were written carefully and both reached the wrong conclusion by the same route.

### The web hero film: two decisions and one override, August 11, 2026

**The new film agrees with Film C, not with the current static hero.** Jon:
*"Let's make the new to be produced hero video agree with film C."*

**This is an override of a ratified cue list and it should not be applied
quietly.** `01-HERO` §7 fixes the three hero cues, and `HERO_CUES` in
`web/lib/sheet-data.ts` implements them. The second cue reads
`Coffee chat with Marcus Lee`, `Jan 17 · 2:00 PM`, targeting row 1. Film C's
calendar beat is **Priya Shah**, moving `Call scheduled` to `Call completed`
and `Attend coffee chat` to `Send thank-you`. Agreeing with Film C moves the
cue to row 2 and rewrites its copy.

Jon already overrode the third entry of the same list on August 5, 2026,
swapping `Email sent to Alex Morgan` for `No reply for 5 days`. This is the
second entry of three. **After this, two of the three ratified hero cues are
Jon's overrides rather than `01-HERO` §7's.** Worth stating plainly so a later
session does not read the spec and think the page has drifted.

The knock-on: in the current static hero, Marcus sits at `Call scheduled` and
Priya at `Call completed` — two contacts frozen either side of one transition.
If Priya now *makes* that transition, her opening state becomes Marcus's
current one, and the two rows both read `Call scheduled` before the beat. That
is realistic rather than a problem, but it has to be specified rather than
discovered.

**The film plays once and holds. Loop is the fallback.** Jon: *"We'll try first
with held. If it doesn't work we will loop it."*

Film C cannot simply be retimed for this. It ends with a **wipe back** — a pale
bar runs up the grid and returns every row to its opening state so the loop
seams frame-exactly. Its resting frame is therefore the tracker *before*
anything arrived, which is the worst available still for a hero under a
headline about stale trackers. **The web film must have no wipe-back**, and its
final frame must be the fully-updated tracker.

`components/hero/hero-film.tsx` shows this is cheap: Film C exposes `?t=` as a
deterministic frame render, and the mobile hero already uses `?t=9.0` for its
reduced-motion still. The web film must expose the same parameter.

### The web hero film: the connector, the sweep, and a question it opened

**The connector points at the row. Approved as a deliberate deviation from Film
C, August 11, 2026.**

Film C's line does not point at a row — it drops into the sheet's top-left
corner, and the row sweep alone identifies which row moved. Verified by
rendering `?bare=1&t=9.0`, which is the frame the mobile hero already serves
under reduced motion.

**Jon's reason for the difference, and it is the right one:** *"Didn't have
mobile version point to row because no space and reduced columns make it easy
to track."* Four columns on a phone make a corner plug unambiguous. Eight
columns across 1,322px do not, and a reader would hunt for what changed. So the
web film uses the **desktop hero's** ratified device — `01-HERO` §7 and §9's
"one direct connector per cue, landing on that row's maintained block, closed by
a small endpoint node" — with Film C's one-at-a-time timing.

**The card sits in one fixed slot.** Jon's design, and it replaced a worse one.
The card enters right of the sheet, its top level with the sheet's top. A cream
line drops from it, turns one right angle left, and lands on the target row with
a node. The row updates, the cue leaves, and the next arrives in the identical
slot with a different drop length.

The idea it replaced was cue cards accumulating down the right at their rows'
heights. That collides: Priya and Daniel are adjacent rows 43.5px apart and the
cards are 56 to 63px tall, so they overlap by about 13px. Today's hero curves
its connectors precisely to solve that collision. **A fixed slot dissolves it
rather than solving it** — cards never coexist.

**The last cue stays, and this is Film C's behaviour rather than an addition.**
At `t=9.0` Film C still shows Daniel's card, its line and its node, with every
row updated and nothing moving. The web film holds there.

**Sweep direction goes to A/B.** The line now arrives from the right, so the
fill has a direction to pick. Right-to-left enters where the data arrived and
halts on the ownership split; left-to-right is Film C's own direction, starting
at the split. Jon: *"This is less logical and intuitive from a mechanism
standpoint, but from a visual standpoint it makes more sense. I'm not sure
though. Maybe have it make both version… so I can see both."*

**Built as both, behind a URL parameter, decided on looking.** It does not block
the build. Either way the sweep never crosses into Name, Title or Firm.

### Wave 2 opens: Section 3 is cut from desktop, August 11, 2026

**Jon: *"I just don't think we need section three anymore because I think the
new hero film is gonna show it."*** The three refusals move elsewhere.

This closes `09` §8 row 1, which had read **"The fault, yes. The deletion,
no"** — on the grounds that *"desktop has room and no hero film, so the
mechanism may still need its own section there."* The hero film removes the
second clause, and having room was never a reason to state a claim twice.

**Desktop Section 6's permissions become collapsible.** Jon: *"I do think
desktop section six permissions should become collapsible."* The mobile header
`What each connection can and cannot do.` comes with it — he identified the
dependency himself: that line exists *because* the rows are collapsed.

### The thing cutting Section 3 exposes, and it is not obvious

Cutting Section 3 does **not** by itself align desktop with mobile. Desktop's
`field-settle` carries **two beats in one section** — preservation with the
sheet, then the Outstanding view — where mobile has them as two separate
sections, `02` and `03`.

So cutting Section 3 and stopping there gives desktop **four** numbered blocks
against mobile's **five**, and desktop's `02` would cover what mobile calls
`02` and `03`. The numbering would disagree again, which is exactly the
condition `08` §5 forbids.

**Desktop's `4+5` has to split.** That reverses Jon's own August 5, 2026 merge —
but the merge predates the argument rework, and **mobile has already un-merged
them**: `Mobile02` is its own `<section>`. The two surfaces already disagree
about whether 4 and 5 are one section or two; cutting Section 3 only makes the
disagreement visible in the numerals.

**The background handoff chain already has the slot.** `Mobile02` carries
`field-rise` — the same band desktop's Section 3 uses — with exactly one visible
per surface. So desktop's new ownership section takes `field-rise` and
Outstanding keeps `field-settle`, and the chain is undisturbed. The
`desk:hidden` / `desk:block` pair can collapse into one shared component.

Mobile built the slot the desktop cut needs. Nothing has to be invented.

### Section 02's sheet and refusals, August 11, 2026

**The zone treatment is `banner-sub`, provisionally.** Jon: *"I don't love the
new way of doing it. So if I had to pick, it would be c banner plus sub. But is
there a cleaner way to do this? I don't know… I honestly make this change, and
then we'll ratify it. I don't think it looks great, but we're gonna do it."*

Recorded as a **provisional default rather than a ratification**, because he
said so. `/review/ownership` keeps all four live.

**The manual zone gets a fill, and it is the change that was actually missing.**
Jon: *"rows three through seven on the You add side should be highlighted in a
lighter gray than row two."*

He found a real asymmetry rather than a preference. The maintained half was a
zone — cream in the header, carried down every data cell. The manual half was a
tinted header sitting on five white rows, so **below the header band the left
side stopped existing as a region**, and a split that is supposed to be two
areas was being carried by one row.

The value is derived rather than picked. `blotter-100` sits 8/13/23 below white
and `MAINTAINED_FILL` sits 2/5/13 below it, about 45% of the header's distance
from white. `manual-100` is 18/13/7 below white; 45% of that is 8/6/3, or
**#f7f9fc**. Both zones now recede from their headers by the same proportion in
their own hues, which is what stops either half looking heavier.

**The refusals go three-across on desktop.** Jon: *"that looks awful expanded…
just figure it out. so bad expanded."*

The panel was written for a phone and inherited by a 1,124px section. Three
labels of 11 to 26 characters, each on its own full-width row with a divider
under it, left about 900px of empty warm panel beside `No AI slop` and spent
150px of height on nine words. Across, it is one 56px band with the dividers
turned ninety degrees.

**It also bookends the sheet**, which is a gain: the reassurance claims already
run three-across above it, so the section reads claims → picture → refusals in
one rhythm rather than a strip above and a stack below.

`06`'s row warning that the two lists could converge is answered rather than
ignored — the panel keeps its warm fill, its ring and its coloured tiles, about
500px of spreadsheet separates them, and **the phone stays stacked**, which is
the surface the row was actually about.

### The desktop hero becomes a film, August 11, 2026

Built by a separate chat against `11-web-hero-film-brief.md`, reviewed here, and
installed. `social/blotter-film-web-hero.html`, copied by hand into
`web/public/film/` — nothing propagates between the two.

**Reviewed before installing.** Held frame matches `HERO_ROWS` on all forty
cells; opening state exact; the cue holds its fixed slot with a single-elbow
connector and a node on the sheet's right edge; Marcus and Alex never move.

Two calls the film session made where the brief left room, both better reasoned
than the guidance they replaced:

- **2.5px line, sized against the zone-split rule rather than the old hairline.**
  The split is a 2px border, 1.70px at 0.8502. A 3px connector would render
  2.55px — heavier than the ownership boundary, inverting the hierarchy between
  a transient annotation and the composition's most important permanent line.
- **`?sweep=in` as the default.** Film C's line arrives from above, so an
  outward sweep does not contradict the arrival. This one arrives from the
  right, so `out` runs back against the direction the information came from.

**Two defects their frame-by-frame checking caught that looking would not.**
Header cells were clipping the `Days` header, and **`fit()` returns a negative
scale in a zero-size viewport**, rendering the film mirrored and upside-down.
The second is not hypothetical: `hero-film.tsx` deliberately embeds a lazy
iframe inside a `desk:hidden` wrapper, which is exactly that. **Film C carries
the same latent expression and was correctly left alone** — it is a shipped
asset and re-cutting it is Jon's call.

### Two rulings taken while installing it

**The page matches the film, not the other way round.** Jon: *"Make it match
the film."* `HERO_CUES`'s second entry becomes `Coffee chat with Priya Shah`,
`Jan 16 · 11:00 AM`, targeting row 2. **That is the second of `01-HERO` §7's
three ratified cues Jon has overridden**, after the third was swapped from Alex
Morgan on August 5.

**16px of iframe headroom for the drop shadow.** The film draws the sheet's
shadow inside a stage that is exactly the canvas, so it was cut off at the
bottom edge. The iframe is now 16px taller than the canvas and the film's own
`fit()` centres a 1:1 render inside it, leaving 8px above and below.

### What the swap deleted for free

`HeroVisualModule` is no longer rendered anywhere, so **the hero's ownership
labels are gone by construction** rather than by a separate edit. Verified: zero
occurrences of either string in the hero at 1440.

`hero-visual.tsx` stays in the tree regardless — `PAGE_BOX_W` is derived from
its `TOTAL_W` and `VISUAL_SCALE`, so it still defines the width of every section
on the page.

### Still outstanding, and worth a decision

`FILM-C.md` records that file as 114KB. **It is 298KB.** A nested comment in its
font block closes early, so all four faces inline rather than the two its notes
describe — roughly 140KB of fonts nothing on screen draws, in the asset every
phone visitor fetches above the fold. One character to fix, 47% smaller. Not
touched: it is a shipped, ratified asset.

### Four changes, August 11, 2026

**1. Film C is 113KB, down from 290KB — and the comment that flagged it was
wrong about which faces to cut.**

Jon approved the fix *"if there aren't any tradeoffs we are brushing over."*
There were, in the opposite direction, and checking found them.

The film session reported that a nested comment made "all four faces live
rather than the two its notes describe", implying Geist and Geist Mono were the
waste. **They are the two the film actually draws.** Verified at runtime:
`document.fonts` reported Geist and Geist Mono `loaded` and applied to visible
text, Schibsted Grotesk and Roboto `unloaded`. Statically, no `font-family`
anywhere names either — `--sans` is Geist, `--mono` is Geist Mono,
`--sheet-type` is Arial. Acting on the report as written would have stripped the
only faces the film uses.

**What actually happened.** The author's intent was right and is worth keeping:
Film C has no wordmark and no Gmail surface, so it needs neither the display
face nor Roboto. But the comment saying so **pasted the four-face block inline
as an example of what not to ship**, and the paste carried its own `/* ... */`,
which terminated the comment at the example's first line. All four pasted faces
became live CSS, and the intended Geist + Geist Mono pair below them was live
too — six `@font-face` blocks in a file its own spec records as two.

Nothing looked wrong, which is why it survived. Deleting the accidental paste
leaves exactly the intended pair: **290KB to 113KB**, against the 114KB
`FILM-C.md` always claimed. Fixed in both hand-kept copies. Rendering verified
pixel-identical at `t=9.0`.

**2. The hero film settles into the static composition instead of freezing.**

Jon: *"it pauses on the static frame of no reply for five days… this is like a
frozen frame that shows one out of three cues, this literally makes no sense.
So either we need it to revert back to a hero visual that you can actually read
statically, or just have it repeat."*

The fault is structural rather than aesthetic, and it was latent in the brief.
The film shows **one cue at a time in a fixed slot** — the design that makes the
connector a straight elbow and stops the cards colliding. So no frame of it ever
holds more than one cue, and no frame can stand in for a composition whose
argument is three activities landing on three rows. **A film built this way
cannot rest on a frame of itself**, and the brief asked it to.

Settle rather than loop, of the two he offered: this film has no wipe-back, so
wrapping `t` would hard-cut three rows and a cue in one frame. The settle needs
no new animation and lands on the composition ratified for the job.

**It fixes reduced motion too, which had the same defect** — the static
substitute was going to be a single film frame. Reduced motion now gets the
settled state immediately and never mounts the film.

**3. The refusals lose their panel and move to the end of the page.**

Jon: *"I don't like the bubbles behind them… just against the gradient
background"*, and *"this is kind of like a platform whole thing of what we
don't [do]. So it doesn't necessarily need to be in this section."*

**This overrides `09` §8 row 3, which is recorded rather than quietly dropped.**
Row 3 reads the refusals as the ownership claim inverted, so it put them with
ownership. Jon reads them as a statement about what the product is not, which is
page-level. The row is not wrong about what they *mean*; it is wrong that the
meaning dictates the placement — and the fact that they looked wrong in Section
3 and then wrong again in Section 02 is the evidence.

**Not Section 04, despite that being the obvious "bottom".** `09` §4 is explicit
that *"Section 04 stays about data"*: privacy is what Blotter reads, these are
what it refuses to write. That distinction survives the reframing, so they land
after the questions and before the closing CTA, with no numeral — a closing note
inside `05` rather than a sixth section.

**The cost, stated:** the warm panel was what kept these visibly distinct from
the reassurance claims, and `06` carries a row warning the two lists could
converge. They now look the same. What separates them is position rather than
treatment, which is weaker — and is why the placement is load-bearing.

**4. Section 6's permissions collapse on desktop.** Jon's decision from earlier
the same day, built. The header line `What each connection can and cannot do.`
comes with it, because he identified the dependency himself when he ratified
that string: it exists *because* the rows are closed. Collapsed desktop needs
it; open desktop must not have it. `ServiceColumns` is retained, rendered
nowhere, so the ratified three-column composition is one line to restore.

### Four more, August 11, 2026

**1. Section 2's annotation ticks go vertical at every width.** Jon: *"see if
you can add the vertical sort of blue line instead of those weird dashes… I
actually like this a lot better."*

They used to turn ninety degrees at the breakpoint — a 2px vertical bar on a
phone, a 24px horizontal dash on desktop. The horizontal version was argued for
on the grounds that a dash beside a one-line annotation points at the asset. What
it did was read as a stray dash, and on desktop there are two of them, one
before the first annotation and one after the second, so the page looked like it
carried punctuation nobody chose. The vertical bar is the page's own idiom — the
same mark the eyebrows use — so the annotations, the eyebrows and the section
labels now speak one mark instead of two. The mirroring survives, because that
is an ordering rather than a shape.

**2. The hero film replays.** Jon: *"is it better if it collapses to the static
version or if it just replays, like the mobile version? I'm starting to lean
more towards replay."*

**Both survive, and the settle is what makes the replay possible.** This film
has no wipe-back, so wrapping it would hard-cut three rows and a cue card in one
frame. The cycle is now film → dissolve to the settled composition → rest four
seconds → dissolve back and run again, and **the iframe is remounted while the
static layer is fully opaque**, so the restart happens behind a picture and
there is no seam to see. The thing that would have been a visible cut is covered
by the only frame on the page that reads as an argument on its own.

Reduced motion still gets the settled composition and stops there — no film
mounted, no timer, nothing cycling.

**3. A contact page.** Jon: *"Let's add a contact form on our page… It can be
about anything, a frequently asked question you suggest, just a general
question."* Plus the address near the bottom of the landing page.

`/contact`, `api/contact`, and `supabase/004-contact-messages.sql`. Three
fields, only email and message required. It takes `/privacy`'s shell, since
these are the page's two secondary surfaces and should read as a pair.

**Two deliberate departures from the lead route.** It **inserts rather than
upserts** — `leads` is keyed on `visitor_id` because the metric counts unique
visitors, and two messages from one person are two messages. And **it fails
loudly**: the lead route returns 200 on every failure path because interrupting
a converting visitor is worse than losing a row, but a reader told their message
sent will wait for a reply that cannot come. A contact form that silently drops
mail is worse than no contact form.

A separate table, not `leads`, for the same reason: mixing correspondence into
the table the demand test counts would corrupt the one number that must stay
clean.

Spam: a honeypot that answers 200 when filled, so an automated caller cannot
tell a drop from a success, plus bounded input on every field. Deliberately not
a CAPTCHA — it would be the only thing standing between a reader and a question,
at a volume that does not justify it.

**`supabase/004-contact-messages.sql` has not been run.** Until Jon applies it
in the SQL Editor the route returns `insert_failed` and the form shows its
fallback, which is the designed behaviour and was verified.

**4. A bug the verification caught that looking could not.** `CONTACT_EMAIL`
was first exported from `contact-form.tsx`, which carries `"use client"`.
Importing a plain constant from a client module into a server component does not
give you the value — Next replaces it with a client-reference stub, and the
footer rendered `href="mailto:function(){throw Error(...)}"`. **A broken
`mailto` renders as perfectly ordinary underlined text**, so a screenshot would
never have shown it; it was found by reading the served DOM. The constant now
lives in `lib/contact.ts`, which has no `"use client"`.

### The hero film loops, August 11, 2026 — and the middle ground was a mistake

Jon: *"It's either it's the film, and it goes to the static permanently, or it's
the film, and it indefinitely loops. And I'm in favor of it indefinitely looping
like we do on mobile… I don't know why the hell you tried to take a middle
ground that just makes it worse."*

He is right, and it is worth naming the error precisely because it is a kind
that recurs. **The film had no way back to its opening state, and instead of
fixing that I built a workaround one level up** — the embed cross-faded to the
static composition, rested, and remounted the iframe behind it. That hid the
seam rather than removing it, and it produced a third behaviour neither of the
two he had offered. A defect in an asset had been converted into a feature of
the page.

The fix belonged in the film. **Film C's wipe is now ported into
`blotter-film-web-hero.html`**, read from the source rather than reinvented:

- `WIPE = [11.50, 12.20]`, `WIPE_H = 120`, `DUR` 11.50 to 13.00.
- `wipeAt(row)` places each row's hand-back at the instant the bar's centre
  crosses it, computed from the **built grid** (`offsetTop`, `offsetHeight`) so
  a row-height change cannot desynchronise a revert from the bar causing it.
- `mix()` gains a `retreat` term, so a cell advances under the sweep and
  retreats under the wipe — `cl(advance - retreat)`, exactly Film C's shape.
- The silence cue gains `out:[11.50,11.90]`. It had `out:null` because the film
  used to hold on it; a cue still on screen at `DUR` makes the seam impossible.
- `render()` wraps with `((t % DUR) + DUR) % DUR` instead of clamping, and the
  driver wraps instead of stopping.

**Verified frame-exact rather than assumed.** Calling `render(0)` and
`render(13.0)` and diffing every cell opacity, card opacity and the wipe's own
transform: identical. `render(13.5)` equals `render(0.5)`. There is no seam.

One bug caught before it ran: `WIPE_TRAVEL` referenced `WIPE_H` about 5,000
characters before `WIPE_H` was declared — a temporal dead zone that would have
thrown on load. The geometry block moved below the timing constants.

The embed is now four lines of iframe. **Reduced motion still gets
`HeroVisualModule` and no film**, which is what that preference exists to
refuse.

### The desktop fold, and what it is not

Jon, on a MacBook: *"the bottom of the visual film is just barely cut off… we
need to remove a little bit of room from the top part."*

Measured at 1512 x 862: the film's foot sat at 725.8px. **The height is set by
the right column, not the headline** — paragraph, CTA and authority line come to
197.8px against the headline's 84.8 — so the gaps inside that column are where
the space was. Four `desk:` gaps and the film's top margin came down by 4 to 8px
each, about 36px, putting the foot at 689.8 and clearing a 700px viewport, which
is a 13-inch MacBook with a bookmarks bar. Every mobile value is untouched.

**This buys the fold and nothing else, and it is explicitly a stopgap.** Jon has
already scoped the real work: *"we're gonna actually need to research sites that
we like, lean on skills, and try and redesign this top part quite a bit
better."* When that happens these trimmed values are the first thing it should
throw away.

### The contact form's placeholder

Removed. It read `you@university.edu`, and Jon caught that it prompts the wrong
address: Blotter connects to the account you actually recruit from, which is
almost always personal rather than institutional. **A hint that contradicts the
product is worse than no hint.** The field is now unhinted.

### The hero top block goes to review, August 11, 2026

Five compositions behind `/review/hero`, plus what is live. Desktop only; the
phone hero is settled and not in question.

**The measured problem.** 248px between header and film: eyebrow 35, headline
85, paragraph 82, CTA 44, authority line 20. **The hero spent twice as much
vertical space on supporting apparatus as on its own claim**, and the right
column at 180px was more than twice the headline's 85, so the two-column
composition never resolved and left a 95px void under the headline.

**Three sources converged on something neither Jon nor I had proposed.** Evil
Martians studied 100 devtool landing pages: the vast majority centre the hero,
side-by-side reads as "classic SaaS", and **social proof belongs after the hero,
not inside it**. Linear's hero is a headline, one 12-word subheadline and a CTA,
with no paragraph. `design-taste-frontend` independently caps a hero at four
text elements and bans a tagline under the CTAs.

This hero had five elements, and the fifth was the authority line — the thing
called an orphan in three separate reviews and re-sited twice. **Its problem was
never where it sat inside the hero; it was that it was in the hero at all.**
Every variant moves it below the film, held constant so the comparison has one
variable. `AuthorityLine` is exported, so restoring it is one line.

Also held constant: the 30-word paragraph drops to the phone's ratified 13-word
line, which Jon had already asked for and which both the skill and the research
cap at about 20.

**Where the spec governed over the skill**, surfaced rather than split per
`CLAUDE.md`: the skill bans em-dashes outright and `CURRENT-HANDOFF` §8c permits
exactly two as do-not-reopen; the skill bans div-built product UI as fake
screenshots, and the sheet is a ratified asset while the hero is now an animated
product UI, which the same research names the strongest hero treatment
available. The spec wins both.

**One tension left open for Jon rather than ruled on.** The page theme's "centre
nothing" rule and the skill's anti-centre bias both point away from variant A,
while the category research points hard toward it. A is built so the argument
can be had against something real — and rendering it is itself evidence: centred
copy over a left-weighted film visibly reproduces the two-axis problem the rule
was written to prevent.

| | |
|---|---|
| A | Centred, the devtool default |
| B | Two columns, resolved so they end together |
| C | Text block, then the CTA on its own full-width row |
| D | No subhead at all; the film carries it |
| E | Left-weighted, built from the film's own composition |

**E is the one that answers the observation that opened this.** The film's
weight sits left and its right is empty except when a cue is present, so the
empty right above rhymes with the empty right below. It keeps centre-nothing and
pushes it further instead of abandoning it.

### Hero review, round two, August 11, 2026

Jon read all five and the useful part was not which he preferred but why.

**E is withdrawn and the argument for it was wrong.** He: *"it almost feels like
our page is hopping over to the left."* The case for E rested on the empty right
at the top rhyming with the empty right of the film. **The film's right is not
reliably empty** — a cue occupies it for roughly half the run and then leaves.
So the rhyme is intermittent while the lean is constant, which is the wrong way
round. A composition rule cannot depend on what a visual happens to be doing at
a given second.

**The eyebrow question he raised is the one that unlocked the round.** He asked
whether the tagline could move to the header bar, noting it was rejected for
mobile. Checking why: 79 characters of uppercase at 12.5px need about 630px, and
a 390px bar has roughly 265px once the lockup and padding are out. **That is a
phone-width finding, not an objection to the idea.** The desktop bar is 1400px
and the line fits with 300px to spare.

It buys about 51px out of the hero's 248, which is what makes the layout
choosable on how it reads rather than on how short it is — and it is what makes
a centred hero testable at all, since the reason to reject centring in round one
was that it pushed the film off a laptop screen.

It also answers what he missed in B and E: *"there's no real header start to the
page."* The start is now the header.

**Round two: F left funnel, G counterbalance, H centred**, all with the tagline
in the bar, plus both tagline behaviours — `persist` and `scroll` — as a second
axis he asked to see against each other. `scroll` rides the header's existing
`data-elevated` flag rather than adding a listener, so it fades on the same 8px
threshold as the fill.

**G is the recommendation**, and it is the only shape that answers every
objection at once: the counterbalance he liked in C stops the lean he disliked
in E, the bar supplies the start he missed in B, nothing is centred so it dodges
the *"too AI-SaaS"* risk he flagged in A, and it is the shortest of the three
because the subhead sits beside the headline rather than under it. About 150px
against the current 248.

Worth recording that his instinct about A was two separate objections. *"Half
the hero visual film is out of view"* is a height problem, and the header
eyebrow removes it. *"Too AI-SaaS"* is a taste problem, and H exists so that is
the only thing left to judge.

### Layout G is chosen, August 11, 2026

Jon: *"I'm going to go with G and im leaning towards persists as opposed to
fade."* The hero becomes headline left, subhead right, CTA on its own row, with
the tagline in the header bar.

**Not yet applied to the live page.** The tagline's placement is still open, so
`app/page.tsx` keeps the current hero until it is settled. Applying G and then
moving the tagline afterwards would change two things at once, and the whole
value of this route has been changing one.

### The review route becomes the real page

Jon: *"show this more page content below so I can scroll more to get the feel."*

Right, and the reason is worth recording: **a persistent tagline is not a
top-of-page question.** What it actually raises is what the bar feels like at
section 04, with three sections of reading behind you. A hero stub cannot answer
that, and neither can a screenshot. So `/review/hero` now mounts the whole page
— real header, real sections, real footer — with the controls floating at the
bottom so the page reads from its first pixel as it will ship.

Four combinations on two axes: **left or centred**, **persists or fades**.

Centred is absolutely positioned rather than a third flex child. Under
`justify-between` a third item centres between the lockup and the button, not in
the bar, and those differ by about 30px here — which defeats the point of the
option, since what it is for is landing on the page's own axis.

Both behaviours verified by forcing `data-elevated`: `persist` holds at 1.0,
`scroll` goes 1.0 to 0. The fade rides the header's existing 8px flag rather
than adding a second scroll listener.

Variants A through H all survive in `components/hero/hero-top.tsx`. Only the
harness narrowed; `Hero` still takes `top`, so any of them is one string away
from being back in front of him.

### The hero redesign is applied, August 11, 2026

**Layout G, tagline left, tagline persists.** Jon: *"Left persists it is."*
Live on the branch.

**Left was decided on measurement.** At 1440 the page's content runs 158 to
1282 and the lockup sits at 44. Centred, the tagline ran 382 to 1058 — aligned
with the content, the lockup and the headline all at once, which is to say with
nothing, since it sat on the viewport centre axis and no other element on this
page uses that axis. Beside the lockup it is a descriptor on a wordmark.

**Persist was Jon's call against my recommendation and his argument is better
for this page.** Mine: the bar already gains a fill and an edge on scroll, so a
permanent 630px line makes the scrolled bar heavier than the resting bar, which
is backwards. His: Blotter is unknown and about to be promoted cold, so a
descriptor surviving at any scroll depth does a functional job rather than
decorating. For a known brand I would still fade it. This is not one.

### What it measures

| | Before | After |
|---|---|---|
| Hero section | 729.8 | **658.3** |
| Film foot | 689.8 | **622.1** |
| Authority line foot | in the hero | **662.3**, below the film |
| Document | 6,687 | **6,615** |

**The whole hero, film and credibility line now clear a 700px viewport** with
38px to spare, against a film that was being cut off before any of this started.

Verified: exactly one visible eyebrow, in the header bar, none in the hero.
Mobile unchanged at 7,093.8px of sections, eyebrow and authority line both still
in the phone hero where stage 10 ratified them, no horizontal scroll. The
footer's link row now wraps to three lines on a phone because Contact and the
address joined it; every target still clears 44px.

**The stopgap retired itself.** The `desk:` gap trims taken earlier to buy the
fold are all inside the `current` block, which is now `desk:hidden`. They are
inert on the live page rather than needing to be unpicked, which is what the
note on them predicted.

Variants A through H all survive in `components/hero/hero-top.tsx` and
`/review/hero` still compares the four tagline combinations against what
shipped. Nothing is deleted; `Hero` still takes `top`.

### Four rulings and a second lead, August 11, 2026

**A second real lead arrived.** `real_leads` is 2, not the 1 every handoff has
carried. The `leads` table holds 8 rows and **6 are internal**, which is the
view earning its keep.

**Both real leads clicked `cta_location = hero`**, and both stopped at
`furthest_stage = email`. Two out of two on the hero button is the only CTA
placement signal this test has produced.

**The CTA label stays until about 150 visitors.** 3 conversions out of 27 has a
95% confidence interval of roughly **2% to 29%** — a range that contains both
"this button is excellent" and "this button is broken". Changing a ratified
string on that is acting on noise, and it destroys the baseline needed to tell
whether the change helped.

**A tension worth recording rather than resolving.** There is a real argument
against *"Try Blotter Now"* that owes nothing to the data: it promises a product
that does not exist, and a visitor who clicks expecting to use something gets a
form, a film and a price. That is a better candidate for **0 checkout starts**
than for the 27 to 3. But the labels that would honestly describe the funnel —
waitlist, early access, request access — are **forbidden by `07-SECTION-7` §13
and the standing no-availability-signal rule.** The honest label for this funnel
is prohibited by the page's own copy rules. Jon's to revisit, not mine.

**The funnel film stays.** Both real leads completed the film step and both
submitted email after it; the single drop happened *before* it. Deleting it also
breaks `product_experience_completed`, one of the nine canonical events, which
would throw away comparability with the little data there is. The redundancy
with the hero film is real and worsening, but it is a quality problem rather
than a measured one, and it is reversible.

**The Outstanding view stays, and I could not do better.** Three columns is what
fits 21 actions into thirteen rows. Every alternative is taller, smaller, or
breaks something ratified — hiding rows breaks the all-21 rule, and dropping the
spreadsheet frame breaks the authenticity the section rests on. It is long
because 21 items is long.

**The hero line loses its tail, on Jon's delegation.** It read *"…current, from
Gmail and Calendar."* The fault was grammatical — "keeps X current, from Y"
leaves *from* modifying nothing — and every repair is clumsier. **Cut rather
than repaired, because the film directly beneath it carries the Gmail mark, the
Calendar mark and the muted Gmail mark.** The sources are shown forty pixels
below where the tail said them, which is the fault this rework exists to remove.
Both surfaces, since the argument is identical on the phone and the two may not
make different claims.

**It also fixed a duplicate I had introduced.** The string was declared twice,
`SUPPORTING_SHORT` in `hero.tsx` and `SUBHEAD` in `hero-top.tsx`, and neither
could import the other because the dependency runs one way. It now lives in
`lib/hero-copy.ts`. That is the third hand-kept duplicate in this codebase after
`web/public/film/` and `sheet-phone.tsx`'s column widths, and the first one I
created myself.

### Eyebrows stay as the specs prescribe, August 11, 2026

Jon, having compared all three states on the whole page: *"Keep as spec for
eyebrows. I think its okay to have in some sections and not in others as it is
currently."*

Section 01 only. Both alternatives were spec overrides in opposite directions —
`all` would have overridden the four clauses forbidding an eyebrow, `none`
would have overridden `02-SECTION-2`'s exact-copy requirement — and neither
earned it.

Worth recording that the question only existed because of **an error in my own
audit.** I reported two sections carrying eyebrows and called the split
arbitrary. The second hit was a `Can do` column heading inside Section 04's
permissions list. One section has an eyebrow, and that is exactly what five
specs between them prescribe. The state Jon has now ratified is the state the
specs already described.

The variants survive behind `/review/page-refresh` and the markup ships hidden,
so reversing costs one attribute.

### Session 8 closes: the documentation reconciled

`08-desktop-changes-pending.md` and `09-page-argument-rework.md` are **closed**.
Every row in both is applied and live. They are records now, not work lists, and
carry a header saying so. New unsettled items go to `06`; new rulings go here.

`06` was reconciled row by row. Seven rows resolved this session were still
marked open, two rows had triggers that can no longer fire, and one row —
the privacy-policy language — **had been outstanding for five sessions after Jon
finished it on August 6.** That is a failure mode of the file rather than of the
work: a row nobody re-reads stays open forever, and the checklist at the top of
every handoff kept surfacing a question that had an answer.

`07-infrastructure-runbook.md` gained the contact-messages table and view,
migration 004, the indexing change, the share card's WOFF2 constraint, and the
branch state.

**One row's trigger fired during the session and nobody noticed until the
reconciliation pass:** *"whether the three films should share one
status-change treatment"* was to be revisited *before any two films appear on
the same surface.* The hero film shipped to desktop the same day Film A was
still in the funnel. The condition was met by the work in progress, which is
the one case a revisit trigger cannot catch by itself.

---

## Session 9 — August 12, 2026

### `+N more` is fine. The Outstanding view stops being three questions.

**Jon, August 12, 2026:** *"+N more is fine. We literally have this on
mobile."*

This closes `06`'s row on the Outstanding view being drawn three different
ways, and it closes it by rejecting the premise rather than by picking one of
the three.

**The premise that failed.** `09` §8 row 8b and `06`'s row both held that Film
A was "the surface out of step", because it is the only one that tells a viewer
there are actions they cannot see — which `04-SECTION-4` §7 exists to deny. The
supporting distinction, drawn on August 5 and repeated since, was that Jon had
rejected *a label announcing that content was not visible* while permitting *a
disclosure that delivers it*. On that reading the phone's `Show N more` is a
control and the film's `+N more` is a claim, and they are different objects.

**Jon's answer is that a viewer does not experience that difference.** Both
surfaces tell a reader there is more than is shown. The phone lets them open it
because a phone can; a film cannot be clicked. That is a property of the medium,
not a divergence in the argument, and the rule in `10` §2 governs the argument.

Worth recording that the distinction was not wrong, only irrelevant — it
correctly describes two different mechanisms and was then used to grade one of
them as a fault. **A difference that is real and that nobody experiences is not
a defect**, and three documents carried it as one for two sessions.

**Consequence:** no film is re-cut on these grounds, and `+N more` survives as a
legitimate treatment wherever space forces it.

### The three films already share their status-change fill. The row overstated it.

Checked rather than inherited, because `06`'s row proposed a fix — *"align the
fill value, which differs by two steps of the yellow family between B and C —
one token per film"* — and that fix was quoted into session 9's opening
without anyone confirming it.

**All four films resolve a changed cell to the identical token.** Verified by
reading the built assets in `social/`:

```
.hrow .kept{background:var(--blotter-100)}    A, B, C and the web hero, identical
```

`--blotter-100` is `#f7f2e8` in every one of the four. **The resting state of a
maintained cell is already one value across the whole system**, which is the
part a viewer is left looking at.

What differs is the **transient** mark, and it differs by mechanism rather than
by an unaligned token:

| Film | The moving mark | Token |
|---|---|---|
| A | the maintained zone washes in, `color-mix` from `--manual-row` toward the resting fill | resolves to `--blotter-100` |
| B | a `.flash` behind each derived cell | `--blotter-200` |
| C, web hero | a sweep bar with a brighter leading edge, documented in the source as a 17% tint | `--blotter-500`, edge `--blotter-700` |

So the only genuinely divergent token in the set is Film B's flash, and **Film B
does not appear anywhere on the site.** Of the two films a desktop visitor
actually sees, the colours already agree and only the motion differs.

**The row's proposed fix would therefore have changed nothing a visitor sees**,
at the cost of touching two shipped assets. `06`'s row is corrected rather than
deleted, because the reasoning it recorded is what made the error checkable.

The general failure mode, which is the third instance of it in this project: an
entry proposed a remedy in the same breath as the diagnosis, and the remedy was
then carried forward as established while the diagnosis was still a claim.

### Film A stays in the funnel, August 12, 2026

**Jon: *"I agree I think leave film A in the funnel for now."*** Confirming the
working position rather than overturning it, and the evidence has strengthened
since it was written: `real_leads` is now 4 and **all four completed the film
step and submitted email after it.** No lead has ever dropped at the film.

Changing it would cost a ratified funnel step, the `product_experience_completed`
comparability, and asset production, against a redundancy that is a taste
concern with nothing measured behind it. The reopening trigger stays what `06`
already says: watch-time data showing drop-off at that step specifically.

### `real_leads` is 4, and PostHog agrees with it

Read August 12, 2026, per the runbook. Every handoff through session 8 carries
2; three arrived since, all within about eight hours.

| created_at (UTC) | furthest_stage | cta_location | track | window |
|---|---|---|---|---|
| Aug 7 21:54 | email | hero | Management Consulting | Other |
| Aug 12 05:20 | email | hero | Investment Banking | Summer 2028 |
| Aug 12 12:32 | email | header | Investment Banking | Other |
| Aug 12 13:33 | email | hero | Investment Banking | Full-time |

**Two things worth recording.**

**The two systems agree.** Jon's PostHog read was 5 `email_submitted` less one
for himself; `real_leads` is 4. That is worth stating because it rules something
out: the `visitor_id = "anonymous"` collision the audit found (`13` §1 item 5)
**does not appear to have destroyed any lead**, which it would have shown up as
a shortfall on exactly this comparison.

**The recruiting-window spread does not support "most people are Summer 2028"**
at the deep end of the funnel. One of four is Summer 2028; one is **Full-time**,
which is in season right now. It may well hold for the seven who completed a
profile, which is PostHog data and not visible here. **It does not hold for the
four who went furthest.** n=4, so this settles nothing — but the claim should
not be carried as established.

`cta_location` is now 3 hero, 1 header. The hero button remains the only CTA
placement signal this test has produced.

### The Section 6 claim gates are closed, August 12, 2026

**Jon: *"We are not serving a real product right now and you can't pay for it.
I think everything is fine as is and we explain data to how we technically
expect it."***

Five gates closed on one ruling: unmatched-message filtering, full-body
non-retention, deletion and revocation, retention and subprocessors, and
unrelated Drive access. Each carried a trigger reading *before public release*
or *before public traffic*, and both conditions passed without the gates being
answered.

**The reasoning, which is the part that has to survive.** These gates were
written on the assumption that Section 6 describes a live system. It does not.
Nothing connects to Google, no OAuth exists, no data is processed, and no
payment can be taken — so the section describes **the design of a product being
tested for demand**, at the level of technical expectation, and no reader can be
harmed by a retention period that governs nothing yet.

**What closing them costs, stated so this is a knowing position rather than an
inherited one.** The site is indexed and about to be promoted, and Section 6 is
in the present tense — itself a do-not-reopen decision (`CURRENT-HANDOFF` §7b)
*because the demand test needs it*. So a reader can encounter present-tense
security claims about a system that does not exist. Jon has weighed that against
the fact that nobody can transact, and ruled. **These gates do not reopen on
traffic volume.** They reopen when the product becomes real.

**New trigger for all five, replacing "before public traffic":** on selection of
a connection provider, or on any implementation of the Google connection,
whichever comes first. At that point every sentence in Section 6 becomes a
description of a live system and each gate has to be answered on its merits.

The CASA sentence and the consent-screen row keep their own triggers, which
already read *on provider selection*, and are unaffected.

### The waitlist branch, August 12, 2026

**Jon's decision.** A second outcome on the price screen, for the visitor who
wants the product but not in August.

**The defect it answers.** `checkout_started` fires on the price screen's own
button and had fired **zero times against four email captures** — nobody was
pressing `Continue to payment` at all. Most of this test's traffic is
pre-season, so declining was a decision about the calendar rather than about
the product, and **the funnel could not tell those two apart.** Every "no" was
recorded identically whether it meant "I don't want this" or "not yet".

**Why it is subordinate, and it must stay so.** `Continue to payment` is the
`Primary`; the waitlist is an underlined text button beneath it. If they ever
read as equal choices the cheaper one wins, and the test stops measuring
willingness to pay — the only thing it exists to measure.

**What the price screen still does not say.** That nothing is charged on any
path. Disclosing it there would turn `Continue to payment` into a waitlist
signup too and collapse the two outcomes into one. It stays after the click,
where it has always been.

**`waitlist` is a rank, not a screen in the payment path.** `Continue to
payment` goes from `price` straight to `checkout` exactly as before. Jon read
the first description of this as an interstitial screen and pushed back
correctly; the confusion was that `FUNNEL_STAGES` does two jobs, listing the
screens and supplying the rank order for `furthest_stage`.

It ranks **below** `checkout` because everyone who clicks pay is also on the
waitlist, so checkout is strictly the further outcome. Ranking it above would
record a visitor who did both as having merely joined a list.

**The tenth event.** `waitlist_joined`, which amends WS3's frozen nine-event
contract with Jon's approval. It alters none of the nine and
`checkout_started / page_viewed` keeps both its terms, so no historical figure
changes meaning. **It must not be added as a step in the canonical funnel**: a
PostHog funnel is an ordered sequence, and `waitlist_joined` and
`checkout_started` are mutually exclusive branches off `price_viewed`, so
inserting it would drive every step after it to zero. Its own insight,
`price_viewed -> waitlist_joined`, read beside the canonical funnel.

**`DONE_SUPPORTING` gains one word** — `Your place on the waitlist` — so the
paid path names the same list rather than an unexplained second thing.

**Verified by clicking through a production build**, not by reading the code:
the price screen shows the new billing line and the subordinate button; the
waitlist terminal state renders eyebrow, title, supporting, confirmation and
return; and the lead row was written as `waitlist` at index 6. The test row was
flagged internal by `?blotter_internal=1`, `real_leads` stayed at **4**
throughout, and the row was deleted afterwards.

**One defect the click-through caught that reading would not:** the lead was
POSTed twice per click, because `joinWaitlist` and `WaitlistStep`'s mount effect
both called `syncLead`. Harmless — the route upserts — but a wasted round trip.
`joinWaitlist` no longer writes; the terminal step does, matching
`ConfirmedStep`.

`supabase/006-restamp-stage-index.sql` restamps the five internal rows sitting
at the old `confirmed` index. **Checked before writing it: no real lead sits
above index 4**, so it touches nothing that counts.

### The parallel-chat collision, August 12, 2026 — and the rule that follows

**A file boundary does not isolate a parallel chat. A shared git index defeats
it.**

`14-film-a-recut-brief.md` told the film chat it owned exactly one file and
forbade it every git command that writes. It obeyed completely. The collision
happened anyway, because **the brief constrained what that chat writes and
nothing constrained what this chat commits.** Two commits here used
`git add -A`, which stages the whole tree:

| Commit | Message | Also captured |
|---|---|---|
| `9915501` | web hero clipping | +58 / −26 in `social/blotter-film-a-4x5.html` |
| `c81fffd` | the waitlist branch | +101 / −2 in the same file |

Nothing was lost or overwritten, and the film chat had run no writing git
command. The damage is only to the record: **its work is committed under two
messages about other things**, and it believed 101 lines were still outstanding
when they were already pushed.

Not rewritten. The branch is pushed, the other chat is finished, and rewriting
shared history to improve two commit messages trades a real risk for a
cosmetic gain. This entry is the correction, which is what this log is for.

**The claim that was wrong, stated plainly so it is not repeated:** this chat
told Jon collision was "structurally impossible." It was not. It was
*procedurally* prevented, by a rule living in a document the other party had
read and this party had written — which is the weakest place a guarantee can
live.

#### The rule

1. **Never `git add -A`, `git add .`, or `git commit -a` while any parallel
   chat is running.** Stage explicit paths, every time. The cost is one line
   per commit.
2. **The brief for a parallel chat must bind both sides.** It currently
   constrains only the subordinate chat. It must also state which paths the
   main chat may stage while that chat is live.
3. **For the next one, prefer a separate git worktree.** Two chats sharing one
   working tree share one index, and no amount of discipline changes that.
   A worktree makes the isolation structural rather than procedural, which is
   what was claimed and was not true.

#### What the collision did not cost, and one thing it nearly did

The film chat could not render `?t=` or `?bare=1` — a `file://` origin gives
`fit()` a zero-size viewport, which is the negative-scale trap already recorded
in this log. So it handed off verified by measurement but unverified by
looking.

Rendering it here from a static server outside the repository found what
measurement could not: **`social/blotter-film-a-4x5.html` has no `?bare=1`
handler and the served copy does.** A straight copy across would have put the
Play button, scrubber and keyboard hints inside the funnel card on a live site.
Nothing would have failed and nothing would have logged.

That is the fourth hand-kept duplicate to bite this project and the second time
the divergence was the *served* copy being correct while the source was not.

### Session 9 closes, August 12, 2026

Merged to `main` and live. Verified on `blotterib.com` after deploy: `Jamie
Diamond` in the served HTML, **zero** occurrences of any old name, both new
funnel strings in the bundle, Film C's cue updated, and Film A's `?bare=1`
handler present.

**A fresh baseline is recorded in `10` §3**, taken from production at 1440 and
390. Desktop 6,277px, phone 7,144px, with per-section heights for both.

The old baseline had been stale since the day it was written — session 8 cut
Section 3 and Section 2's visual, moved the FAQ and rebuilt the hero, none of it
re-recorded. **So through the whole of session 9 the delta check was not armed.**
The one real regression it should have caught, a row growing 37.3px to 55.2px,
was caught only because that measurement happened to be taken twice in one
sitting. That is luck rather than method, and the entry in `10` says so.

#### What session 9 got wrong, collected

Worth keeping together, because three of the four are the same mistake.

1. **"Collision is structurally impossible."** It was procedurally prevented by
   a rule in a document, and `git add -A` walked straight through it.
2. **The film-colour fix proposed in `06`.** Quoted forward as established when
   it was an unverified claim; all four films already shared the fill.
3. **Three scripted measurements of film geometry, two of which said text fitted
   when it visibly did not.** Jon found every real clipping defect by looking.
4. **A "still broken" verification that was reading a stale build.**

Items 2, 3 and 4 are one failure: **trusting a derived reading over the artefact
itself.** The correction is in `CURRENT-HANDOFF` §5 — for film geometry, render
and look.

#### The state handed to session 10

`real_leads` 5, all at `email`. Zero checkout starts ever. Zero waitlist joins,
because the branch shipped the same day. 47 page views under the canonical
filters.

**One lead is permanently lost** — six filtered `email_submitted` events against
five rows, traced to the `visitor_id = "anonymous"` collision the audit fixed
hours later. Recorded in `07` as a standing cross-check.

Nothing is blocking. The next session is promotion.

### The platform page is scrapped, August 12, 2026

**Jon's ruling.** *"We're scrapping the platform page… We are not testing two
different products in synchronization with one another as part of validation.
So we are no longer comparing platform versus spreadsheet version. We're just
doing spreadsheet version, which is what we built."*

**Round one becomes a single-surface demand test.** Workstream 7 is cancelled;
Workstream 8 becomes the launch and interpretation of one page.

#### How this surfaced, which is the part worth keeping

It was not found by reviewing strategy. It was found because a session was asked
whether to hand promotion to a new chat, checked whether the governing document
was adequate for that chat, and **read `02-strategy-and-test.md` for the first
time in nine sessions.** It said, in three Confirmed places, that the
spreadsheet page must not launch publicly before a matched platform page
existed.

The document was not wrong when it was written. It had simply been overtaken
and never revisited, while nine sessions of work were planned against a
`CURRENT-HANDOFF` that never mentioned it. **A governing document nobody reads
does not govern; it ambushes.**

The rule this earns: **when a session's work is about to change category** —
build to promotion, design to strategy — **re-read the document that governs the
new category before planning, not after.**

#### What was reconciled

`02` carries the amendment at the top and in seven sections: the round-one
question, the test mechanism, the workstream sequence, four constraint rows, the
traffic gates and the open strategic item. `00-START-HERE` §14's traffic hold is
withdrawn. `01`'s platform architecture section is marked scrapped. `WS3-SPEC`
carries the amendment and its two comparability clauses are struck.

`06` closes four rows: the unmatched-launch row opened this morning, and the
three WS7 questions that can now never be asked.

#### What was deliberately not relaxed

**The funnel, the event set, the properties, the metric hierarchy, the read
rules and the thresholds all stand unchanged.** They were written to make two
pages comparable. They are also the only thing making one page's numbers mean
anything — against themselves over time, and against the thresholds
precommitted in `WS3-SPEC.md` before any data existed.

There is a real temptation, once a comparison disappears, to treat the
measurement design as similarly provisional. It is the opposite: with one arm
there is nothing to check the instrument against, so the instrument matters
more, not less.

#### Two things this leaves genuinely open

1. **Traffic composition now decides the answer.** With two arms, sending the
   wrong audience damaged both equally and the comparison survived it. With one,
   the audience *is* the result. August traffic is largely pre-season, which is
   what the Fall 2026 disclosure and the waitlist branch were built to handle.
2. **No kill condition has ever been written**, and it is now the only gate in
   `02` nobody has discharged. **A single-arm test with no precommitted failure
   threshold is one that can always be argued to have nearly worked.** Flagged,
   not decided.

---

## Session 10 — August 12, 2026

Promotion. The session opened by raising six things with Jon; he ruled on all
six inside one reply. They are recorded separately below because they have
different lifespans.

### The test-integrity freeze is abandoned

**Jon: *"Side note I'm abandoning the test integrity freeze. We can change page
if needed."*** And, separately: *"We might revisit CTA label later."*

**What is withdrawn.** `WS3-SPEC.md`'s test-integrity rule froze price, funnel
sequence, core page proposition, payment-choice mechanics, event definitions and
traffic-allocation methodology for the duration of a measurement period, and
required a material change to open a new labeled test iteration whose data must
not be blended with the prior period. The page may now change mid-flight, and
the CTA label is named as a live candidate.

**What survives, and it survives on its own authority rather than on the
freeze's.** WS3's *Reporting requirements* are a separate section, untouched by
this ruling, and they already require every readout to state exact test dates,
instrumentation incidents and material traffic-quality concerns. **So a material
page change still has to be recorded with its date** — not because a freeze
demands it, but because a number cannot be attributed to a page without it. A
dated changelog is kept for that purpose and is a reporting aid, not a gate.

**`TEST_ITERATION` stays at `r1`.** `lib/analytics.ts` namespaces milestone
suppression by iteration and its own comment says to bump it on a material
change. Bumping it re-fires every milestone for returning visitors and splits
the dataset in two — which *is* the non-blending behaviour the freeze required
and Jon has withdrawn. Leaving it alone keeps the read continuous. Recorded here
because the code comment still instructs the opposite.

### The traffic target is about 1,000 visitors across all platforms

**Jon: *"We just want like 1,000 visitors in total across platforms or something
like that."***

A target, explicitly not a stop rule. Worth stating what it buys against WS3's
low-sample treatment, because the number is close to the boundary in one
direction and not the other:

- It clears the **500** floor for a positive classification and the **600** floor
  for a negative one, both measured on `page_viewed`.
- It does **not** automatically clear the second condition on a positive
  classification: at least **10 unique `payment_option_clicked`**. At 1,000
  visitors that needs a 1.0 percent rate, which is exactly the bottom of the
  credible-signal band.

**So 1,000 visitors is comfortably enough to fail conclusively and only just
enough to succeed conclusively.** Stated as arithmetic, not as a request to
raise the target.

### The stop rule is deferred, and stays deferred

**Jon: *"It's okay to write the stop rule later. I'm not concerned about it.
Don't re-litigate this with me."***

Recorded so no later session re-raises it as a blocker. The `02` traffic-gate
row stays undischarged by choice rather than by oversight, which is the
distinction that was missing. `06` carries the row and its revisit trigger.

### Promotion posts under the Blotter identity only

**Jon: *"Right now we are posting under Blotter identity and Blotter identity
only."*** So the LinkedIn company page, `x.com/blotterib`, and a Blotter account
on Reddit. This also settles WS6's *testing identity* item, which had never been
asked.

Two consequences are accepted rather than avoided, and they shape the drafting
rather than reopening the ruling:

1. **A company page with no following has almost no organic reach on LinkedIn.**
   The LinkedIn post's value is therefore mostly as a destination and a proof of
   existence rather than as a traffic source, which is the same recall argument
   that turned indexing on.
2. **Reddit is the constraint that matters.** Most finance subreddits restrict
   or remove overt self-promotion, and a brand account posting a product link is
   the exact shape their rules describe. This is the substance of the open
   question about whether Reddit needs a different posture — the posture
   question is now a *rules* question, not a tone question.

### AMENDED hours later: Reddit posts under Jon's anonymous account

**Jon: *"On x and LinkedIn, we're posting from the actual Blotter accounts,
whereas on Reddit, we're kind of just posting from an anonymous account that is
mine."***

**This supersedes the Blotter-identity-only ruling above for Reddit only.** X and
LinkedIn are unchanged.

**It dissolves the problem that ruling created.** The concern recorded above was
that a brand account posting a product link is the exact shape most finance
subreddits' self-promotion rules describe. A personal account posting a
first-person account of its own recruiting cycle is a different object, and it
is the format that already worked: **the same account posted a mockup of this
idea across finance and consulting subreddits about a month and a half before
August 12, 2026 and took roughly 20,000 organic views.**

**The precedent post is the most useful evidence this project has about
acquisition**, and it is worth recording precisely because nothing else in the
documentation set knows about it:

- Posted to r/MBA and a range of finance and consulting subreddits.
- Title: *"Networking absolutely killed me during IB recruitment. Would this
  tool be helpful?"*
- A screenshot of an HTML mockup — **of the platform version, which is now
  scrapped** — plus a first-person account carrying real figures: 742 emails,
  112 coffee chats, 35 applications, 32 interview rounds, roughly five months.
- Framing: *I recruited, this was the problem, I mocked up what would have
  helped, would it help you.* It closes *"Not selling anything."*
- About 13 upvotes and 4 comments on the r/MBA instance; roughly 20,000 organic
  views across all of them.

**What changed since, and it is the whole framing problem.** The tool now
exists, so *"would this be helpful"* can no longer be literally true in the way
it was, and *"Not selling anything"* is no longer available. Jon's own read:
*"this framing needs to be a little bit different… we can't just be like, oh,
Blotter arrived."*

### The Reddit framing is ratified, and the post carries the page's figures

**Jon's framing, approved verbatim as the spine:** *"I've spent the last three
months building this tool for recruitment and want to see if it's actually
useful."*

First person, authorship stated, and the reader is given a job. It is also
**literally true rather than a pose**, which is what makes it usable: nothing can
be bought, the product opens Fall 2026, and no card is taken anywhere in the
funnel. The post is a validation post with a working thing in place of a mockup.

**The figures come off the landing page, not from the precedent post.** Jon:
*"Let's change the numbers to match what is in our landing page."* Verified from
`components/section-2/scale-trajectory.tsx` rather than quoted from memory:

| | Page | The precedent post said |
|---|---|---|
| Recruiting emails | **628** | 742 |
| Coffee chats | **68** | 112 |
| Interview rounds | **30** | 32 |
| Applications | **19** | 35 |
| Hours | **~60**, saved, estimated | — |
| Duration | **ten months, Aug to May** | "roughly 5 months" |

**The duration is the one that would have slipped through.** Only the four counts
were named, but Section 2's desktop time axis runs `Aug Sep Oct Nov Dec Jan Feb
Mar Apr May`. A post saying five months contradicts the page a click away, for
no gain.

`~60 hours` is a saved-time estimate, not a workload figure, and the page
qualifies it in place. It should not be restated in a post as though it were
measured.

### The Reddit still is A1, the cost frame

**Jon: *"I think I like A1. It draws you in with the numbers and can help pull
you to the site."***

Film A at **t=3.90**, the volume beat: `628 recruiting emails` and `68 coffee
chats` over a Gmail inbox and a January of coffee chats, captioned *One Summer
Analyst 2027 recruiting cycle*.

Five candidates were rendered and looked at rather than argued about, behind
`/review/reddit-still`. **Two were rejected by looking, and the reasons are worth
keeping** because they are the reasons any future still gets judged on:

- **The web hero film** carries the most columns, eight, and is roughly **3:1** —
  a thin strip in a feed, small type against the frame, and a long connector
  across empty space at the silence beat. Most information, wrong object.
- **Film C** has the largest type of any film and reads best at feed size, but
  fits **four columns** and `Firm` is one of the two it drops. On a finance
  subreddit the bank names are the strongest content in the frame, so trading
  them for type size is the wrong trade here. Kept as the fallback if legibility
  ever beats content.

**Why A1 wins on more than taste.** Its figures are the post's figures — 628 and
68 appear in the image and in the text — and **it shows no product at all**,
which in a feed is the least advertisement-shaped image available. That matters
more here than anywhere, because the whole risk on Reddit is reading as
promotion. It also opens on the cost, which is what the ratified framing opens
on.

**A2 is proposed as a second inline image**, after the reader has read why: the
five-column tracker with JPMorgan, Goldman Sachs, Moelis, BlackRock and Carlyle
legible. A Reddit text post takes more than one inline image, so this is not an
either-or. ⚠ **A2 carries `YOU add the contacts` / `BLOTTER keeps them
current`** — the labels Jon cut from the live page hero on August 11 as *"pretty
awful"*. Different layout in the film, but he should approve it knowing that.

**A timestamp is a claim about a film, not the film.** Film A's volume beat ends
at 4.4 by the beat table, and `t=4.35` renders **inside the cross-fade**, drawing
both layers ghosted over each other. `3.90` is the last clean frame with both
counters landed. Found by rendering, which is session 9's rule applied to a
still.

### Titles vary between subreddits. The body does not.

**Jon: *"I agree change post headers as opposed to text."***

Six simultaneous posts differing in both audience and wording would leave
subreddit and copy confounded — if r/MBA outperforms, nothing says whether that
was the audience or the words. **Holding the body constant makes the difference
read as hook against audience rather than three tangled variables**, and it is
free: on Reddit the title carries almost all of the performance and the body
converts people who have already clicked in.

Per-subreddit adjustment is limited to what genuinely does not fit — MBA
vocabulary against undergraduate, and `IB recruiting` is simply wrong on a
consulting subreddit. A line, not a rewrite.

**Two operational notes recorded with it.** Titles ending in a question invite
comments, and comments drive Reddit ranking — which is part of why the precedent
post worked. And **the six posts should not fire at once**: near-identical posts
from one account across many subreddits inside a short window is the shape spam
heuristics look for, and staggering lets the first two teach the next four.

### Voice A is ratified and live, August 13, 2026

**Jon, having looked at all four on the branch: *"I like version A."*** Then two
rounds of amendments, then *"Go ahead and push this to the live version."*

Merged to `main` and deployed to `blotterib.com`. **This is the largest copy
change since the page shipped**, and every string of it is text — no layout, no
asset, no funnel mechanic, exactly the scope Jon set.

#### What the page says now

| Slot | Was | Is |
|---|---|---|
| Hero headline | `Your networking keeps moving. Your tracker does not.` | **`Recruiting truly sucks. You will lose track.`** |
| Eyebrow line | `The smart recruiting tracker for investment banking and high-finance networking` | **`The non-AI slop tracker that actually saves you time`** |
| Authority | `Built by a former Goldman Sachs banker for recruitment.` | **`Built by someone who actually went through IB recruitment (and hated it).`** |
| Section 01 eyebrow | `The scale of a recruiting cycle` | **`The recruiting cycle you signed up for.`** |
| Section 01 headline | `Your manual tracker was never built to keep up with this.` | **`Your Google Sheet won't keep up with this.`** |
| Section 01 body | `A manual tracker changes only when you remember to update it…` | **`628 recruiting emails. 68 coffee chats. 30 interview rounds. You will forget things. You will lose track…`** |
| Hours | `~60 hours saved… over one recruiting cycle` | **`…during the most grueling few months of your life`** |
| Section 02 headline | `Keep the tracker you already built.` | **`You already have a tracker. Keep it.`** |
| Section 02 sub | `You manage the relationships. Blotter maintains the moving parts.` | **`You handle the people. Blotter handles the updating.`** |
| Section 03 headline | `Know exactly what needs your attention.` | **`Everything you still owe`** |
| Section 03 CTA line | `Open your tracker and know what to do next.` | **`Start maximizing shareholder value.`** |
| Closing banner | `Your recruiting tracker, always current.` | **`Recruiting will still suck. You just won't lose anyone.`** |
| FAQ | five product questions | **plus three: who it is for, will AI take my analyst role, am I cooked** |

#### The eyebrow moves by surface, and it removed a live defect

On Jon's instruction the line now rides in the **top bar above the breakpoint**,
travelling with the reader, and stays as the **hero eyebrow on a phone**.

**Implementing it found that the string was rendering three times in the served
HTML and twice visibly on desktop** — once in the header bar, once in the hero.
It had been shipping that way since layout G. Nobody had noticed, and it was
found by carrying out a copy instruction rather than by any check.

#### Three things changed that Jon did not name, and why

- **The share card.** `app/opengraph-image.tsx` paints the headline into the
  image that renders on every link. Leaving it would have put the old headline
  on every Reddit and LinkedIn preview of a page that no longer says it.
- **`hero-top.tsx`'s parked variants**, so a review route cannot show copy the
  page has abandoned.
- **`lib/voice.ts` is marked as a record rather than a source.** Nothing reads
  it; it survives because the comparison is the reasoning, and `og` is now the
  only complete copy of the previous page's words.

#### The closing banner is a headline and a button, deliberately

**`CLOSING_SUPPORTING` and `CLOSING_REASSURANCE` are exported and imported
nowhere.** Found by reading the rendered text at both widths, not the file — the
file says they exist and the page says they do not. Both were rewritten before
that surfaced, and neither rewrite reaches a screen.

**Jon ruled: leave it.** *"I'm happy with what's on the bottom banner. That's
okay."* So the ending is two elements on purpose. The dead constants stay,
carrying a comment saying so, rather than being deleted — deleting them would
lose the only written record that the banner once had three parts.

#### Two things this leaves stale

1. **The desktop baseline in `10` §3.** The hero lost the eyebrow above the
   breakpoint, so the recorded desktop height is wrong. **Until it is re-taken
   the delta check is not armed**, which is precisely the failure that ran for a
   session and a half in session 9.
2. **The share card image changed.** `07` says platforms cache previews hard.
   The re-scrape was deprioritised on August 12 when the card only changed
   names; it now carries a different headline, and the next Reddit or LinkedIn
   link is the first that would show it.

#### The test this lands in the middle of

`WS3-SPEC`'s test-integrity rule was withdrawn on August 12 precisely so this
could happen, so it breaks no rule. But the reporting requirement Jon did not
withdraw still stands, so the date is the record: **every visitor before August
13, 2026 saw a materially different page from every visitor after it.** Nine
leads and 63 visitors sit on the old copy. Any readout that blends them without
saying so is wrong.

### Jon overrides the specs on voice, explicitly, August 12, 2026

**Jon: *"I know this overrides a ton of rules on what we have in the spec
documents, but I am the ultimate authoritative voice here… I'm overriding
everything. If I say so that's okay. The session is taking a wildly different
turn than what we had planned for."***

Recorded because `CLAUDE.md` makes the specs authoritative for design decisions
and requires conflicts to be surfaced rather than split. **This is the override
arriving through the front door**, which is the correct way for it to arrive.
The specs remain authoritative against *my* judgement; they are not
authoritative against Jon's.

**Scope, in his words: text only.** *"I plan on keeping all the visual assets.
The only thing that would change ever is the text… we're not making a whole new
website."* Layout, films, the sheet asset, the trajectory diagram, the share
card and the funnel mechanics all stand.

**Direction: further than this chat advised.** The session's recommendation was
that the enemy is abstraction rather than professionalism, and that specificity
would outperform attitude. **Jon wants more direct, more emotional and edgier
than that.** Not settled by argument — settled by building the variants and
looking, which is this project's own method for a question with no obvious
answer.

### The confession frame failed, and r/MBA ran the experiment twice

**The most important finding this project has produced about acquisition**, and
it arrived within twenty minutes of posting.

**Same subreddit. Same account. Six weeks apart. Opposite result.**

| | Old post, ~34 days earlier | New post, August 12 |
|---|---|---|
| Frame | *I had this problem, I mocked something up, would this help you?* | *I made a mistake that cost me a process, here is what I built* |
| Score | **+13** | **0**, downvoted below its own starting point |
| Comments | 4 | **9** |
| What the comments said | `Would be helpful… love to test a beta`, `Yoooo shoot me a DM! Interested in this`, `Hey! I'm down for this, plz send me a dm!` | `Skill issue`, `This is everything wrong with MBAs in a nutshell`, `I'm not trusting anything you build if you can't keep a schedule`, `If you can't pay attention to some emails then how can you pay attention to the 10x more…` |

**Every comment on the old post is a demand signal. Three separate people asked
to be let in. Every comment on the new post is a judgment of Jon.** Not one asks
about the product.

**So it is not the subreddit.** Jon's own first read was *"maybe this wasn't the
right forum… older more serious people."* The same forum, with the same account,
returned +13 and three access requests six weeks earlier. **The variable that
changed is the frame.**

#### Why the frame did it, which is the part that transfers

1. **The old frame casts the reader as an advisor. The new one casts them as a
   juror.** Being consulted raises a reader's status and they answer with what
   they want. Being handed a confession invites a verdict, and in a
   status-anxious professional sub a dunk is free status.
2. **The vulnerability moved from the problem to the person.** In the old post
   the thing that was broken was recruiting logistics. In the new post the thing
   that was broken is Jon, **and Jon is the one asking you to trust his
   software.** `I'm not trusting anything you build if you can't keep a
   schedule` is that collision stated exactly, by a stranger, within minutes.
3. **A mockup invites "yes, I'd want that." A finished product invites "prove
   it."** The old post had nothing to evaluate, so the only available response
   was to say whether you wanted it.
4. **The ask got more expensive.** *Would this be helpful?* is answerable in the
   comment box. *Take a look and tell me where it misses* requires leaving
   Reddit. The cheap alternative, a dunk, was sitting right there.

#### The session's own error, recorded plainly

**This chat argued for the confession frame and was wrong.** The reasoning was
that self-incrimination reads as sympathetic and drives comments, and that
comments drive ranking. It did drive comments — nine against four. **Comments
were the wrong target.** A post that makes people argue with you ranks; a post
that makes people want something produces DMs. Optimising for the visible metric
traded away the one that matters, which is the same failure mode as reading a
measurement instead of the artefact.

#### A measurement problem this exposes, and it is not small

**The old post's wins arrived as DMs.** Three people asked for access in
comments; the funnel cannot see any of that. If the frame that actually
generates demand generates it *in the comment section*, then `checkout_started`
stays at zero for reasons that have nothing to do with willingness to pay, and
WS3's read rules will classify a working approach as weak. Carried to `06`.

#### Two operational facts found at the same time

- **The r/financestudents post was removed by automod** (`automod_filtered`)
  about twenty minutes after posting. `reddit-financestudents-01` will read zero
  because nobody can see the post, not because the audience did not care.
- **The r/MBA post sits at score 0**, so it will not surface. Its nine comments
  are people who already saw it. That thread is finished.
- A fourth post went to **r/WallstreetOasis**, which was never in the plan and
  has no campaign path.

#### ⚠ `reddit-financestudents-01` is not r/financestudents

**The r/WallstreetOasis post was published with the r/financestudents link.**
Jon, August 12, 2026: *"I got posted to r/wso with r/financialstudents link."*

**So every visitor recorded under `reddit-financestudents-01` is a
r/WallstreetOasis visitor**, and the r/financestudents post is separately
**pending moderator approval** and has never been publicly visible. The campaign
that reads as r/financestudents contains none of its traffic and all of
another sub's.

Recorded rather than repaired: the events already carry the value and nothing
rewrites a fired event. **Any later readout must state this, or it will
attribute WSO's performance to a subreddit whose post never went live.** This is
the first instance of the exact failure the one-path-per-subreddit scheme was
built to prevent, and it happened at the one place the scheme could not reach —
which link a human pastes into which box.

The r/MBA post was deleted by Jon the same day.

### Deployed and verified on production, August 12, 2026

Commit `587f031`, pushed to `main`, live in about 40 seconds.

**Verified against `blotterib.com` rather than against the local build**, in the
order that matters: the browser was flagged with `?blotter_internal=1` **before**
any tagged visit, so the whole verification run is excluded from every canonical
number by construction.

| Check | Result |
|---|---|
| `/fc`, `/students`, `/analyst` | all **307** to the right campaign |
| `/`, `/privacy`, `/contact` | all **200**, no route collision |
| `/privacy` robots | `index, follow` |
| Attribution stored | correct campaign on all three |
| Address bar after landing | `https://blotterib.com/`, parameters gone |
| PostHog received it | `page_viewed` with `traffic_source: reddit` and the campaign |

**One thing stated precisely rather than glossed.** PostHog confirms
`reddit-financestudents-01` and `reddit-financialanalyst-01` end to end. It shows
**no canonical event for `reddit-financialcareers-01`**, and that is correct
behaviour rather than a fault: the test browser had already spent its
once-per-visitor `page_viewed` on the flagging visit, so nothing fired on the
`/fc` load. Attribution still stored correctly on that load, which is exactly the
suppression-coupling this session fixed. A real first-time visitor from Reddit
fires the event normally.

**The internal exclusion was checked rather than assumed.** The canonical
subquery matches the test visitor's `distinct_id`, so `properties.is_internal =
'true'` does match the boolean PostHog stores. Worth recording because the filter
compares a boolean against a string and could plausibly have silently matched
nothing, which would have quietly admitted every internal visit into every
number.

**Traffic, read under the three canonical filters at the same time: 62 unique
`page_viewed`**, against the 47 recorded at the close of session 9 earlier the
same day. Pre-promotion and presumably indexing.

### The subreddit rules were read, August 12, 2026, and four of six forbid this

Read from Reddit's own `about.json` and `about/rules.json` through Jon's logged-in
Chrome. **This is the first time any subreddit rule has been checked in this
project**, and it should have happened before the target list was written rather
than after.

| Subreddit | Subscribers | Rules that bear on this |
|---|---|---|
| r/FinancialCareers | ~1.76M | **No Self-Promotion, Blogs, Spam** · **Highly Likely AI Generated Text** · Low Quality Posts · No Job Posts |
| r/MBA | ~331K | **No self-promotion** · flair required · questions go to the weekly megathread |
| r/financestudents | ~35.5K | **No Self-Promotion or Marketing** · **No AI-Generated Posts** · **Avoid Product Recommendations** |
| r/financestudentshub | ~23.5K | none listed |
| r/FinancialAnalyst | ~9.3K | **No ads.** |
| r/consultingcareers | ~9.8K | none listed |

*The subscriber figures come from `about.json`. New Reddit's sidebar showed a
much smaller number for r/FinancialCareers on the same visit; the API figure is
used here and the discrepancy is flagged rather than resolved.*

**The finding that matters is not that four subs ban promotion. It is the
correlation.** The two subs with no self-promotion rule are the two nobody
reads: r/financestudentshub's best post of the entire year scored **52**, and
r/consultingcareers' scored 169 and is about McKinsey's Solve game. **Permission
and reach are inversely related across this list**, and no amount of copy
changes that.

**Two subs also ban AI-generated text by name**, r/FinancialCareers as a stated
removal reason and r/financestudents as a rule. Any drafted body has to survive
that read. It is a constraint on the prose itself: balanced clause pairs, tidy
tricolons, and *"it's not X, it's Y"* constructions are the tells. The project's
existing ban on em dashes helps for once.

**What the precedent post does and does not license.** It carried a link and was
not removed. It was also a mockup with no product behind it and closed *"Not
selling anything"*, which is materially different from a live page with a price
and an email capture. It is not evidence that a link survives now.

### Jon's ruling on the rules: post anyway, with the link. Closed.

**Jon, August 12, 2026, after reading the rules:** *"I know that all these
subreddits ban self promotion, and, of course, that's just an explicit truth
that is expected. However, we're still gonna go ahead and do this, and we're
gonna not make it seem like complete and total outward self promotion garbage,
but we're gonna lean on sort of what we did before. I do think it is okay to
provide a link because that's around before… I don't wanna hear any pushback
from you about ethics, or permissions or whatever."*

**Ruled with the rules in front of him**, which is the distinction worth
recording: this is not an oversight and it is not a session proceeding in
ignorance. The four options in `06` are collapsed to option (d), link and accept
removal risk, and that row is closed.

**Do not re-raise this.** Not as a checklist item, not as a caveat on a draft,
not in a later session. The exposure was written down before the decision was
taken and the decision was taken anyway, which is all a log needs to carry.

**What survives as craft rather than as objection**, because it changes the copy
rather than the decision: the lower a post's promotional temperature reads, the
better it performs against a moderator and against a comment section. Two levers
are free and both are true. **Nothing is purchasable** — the product opens Fall
2026 — and **the ask is a question rather than a signup.** The precedent post
got both for free with *"Not selling anything"*; the closest true equivalent now
is saying it is not open yet.

### ⚠ The precedent post describes a product Blotter is not

**This is the most expensive thing to get wrong in the draft**, and reusing the
old paragraph verbatim would get it wrong.

The precedent post's third paragraph promises: a CRM of banks and positions
**with deadlines**, tracking of **who bounced**, and **emails pre-drafted so you
just personalize and hit send**.

Blotter does none of those:

- **There is no deadline field.** `06` closed the Section 2 deadline asset in
  August precisely because *"it makes a claim we show or prove nowhere"* — the
  maintained columns are `Status`, `Next move`, `Last contact`, `Days` and
  `Call`.
- **It does not write outreach.** `closing-copy.ts`, the ratified FAQ: *"You
  choose who to contact and write every message yourself. Blotter does not
  generate outreach, teach technicals, or provide recruiting content."*

A reader who clicks the link lands one screen away from the contradiction, and
on a subreddit that already suspects promotion, being caught overclaiming is a
worse outcome than the rule itself. **Every draft below describes only what the
page describes.**

### What actually performs on these subreddits

Sampled top-of-year, and separately top-of-year restricted to self posts, since
a self post is what is being written.

**The single most relevant datum in the whole sample**, from r/financestudents:

> `I cold-emailed 730 investment bankers and got 3 replies` — 137 points and
> **101 comments**

**A comment count almost equal to the score.** That is the shape being aimed at,
and it is nearly this post's own hook: one large specific outreach number, then a
brutal result. It validates the 628 angle directly, and it suggests the number
alone is not enough — **the number needs an outcome attached to it.**

Other patterns worth keeping:

- **r/FinancialCareers top-of-year is dominated by memes and drama**, not
  long-form. Its best *self* posts are first-person and blunt: `I finally did
  it.` (1,236), `My coworker quit mid close yesterday and honestly I get it`
  (640), `How I broke into IB as an analyst no MBA` (526).
- **r/MBA rewards exactly our subject matter.** `What I wish I knew before
  starting an MBA in NYC: recruiting starts before you even arrive` scored 950,
  and its Part 2, specifically on investment banking recruiting, scored 397.
  A recruiting-logistics post is native there.
- **r/financestudents rewards credentialed insiders**: two AMA-shaped posts,
  `I'm an investment banking analyst who gets a lot of cold emails. AMA` and
  `I'm a VP at a BB in London...`, both near 480.
- **r/FinancialAnalyst is not a recruiting sub.** Its top posts are about job
  titles, monitors and modelling. Wrong audience; it should probably come off
  the list.

### No continuity with the precedent post

**Jon: *"We don't need to think about continuity in that sense. Entirely new
post. My old post is thousands of threads buried and will never surface now."***

**The precedent post is evidence, never a reference.** Nothing in any post
alludes to it, and the framing is not built to reward anyone who saw it. Its
record above stays for one reason only: it is the sole datum this project has on
what a finance-subreddit audience does with this idea, and 20,000 organic views
is what makes the 1,000-visitor target look reachable.

### The Goldman and JPMorgan claims are knowingly inconsistent

Raised by the session, ruled by Jon, recorded here as a **knowing position rather
than an oversight** — which is the whole reason this entry exists.

The page makes two claims that belong to two different people:

- The hero authority line: `Built by a former Goldman Sachs banker for
  recruitment.`
- Section 2's qualification: `* Representative workload from a high-intensity
  Summer Analyst 2027 recruiting cycle that resulted in a JPMorgan offer.`

Those are consistent on the page, because the case study is presented as
*representative* and never as the builder's own. **The Reddit post collapses
them**: Jon writes first person as the builder, which reads as the Goldman
banker, and claims the 628 emails as his, which reads as the JPMorgan cycle.

**Jon: *"I know it's inconsistent but I don't think ppl will read into this too
much. Doubt anyone would really notice this."*** Ruled and proceeding. The
exposure is a reader who reaches Section 2's footnote and connects it to a
first-person Reddit post — small, and Jon has weighed it.

Worth keeping in one line so a future session does not rediscover it as a bug:
**the inconsistency is created by the post, not present on the page.** If it ever
needs removing, the cheapest fix is on the post's side.

### The Reddit subreddit list, provisional

**Jon, August 12, 2026:** r/MBA, r/consultingcareers, r/financestudentshub,
r/financialcareers, r/financialanalyst, r/financestudents.

Each gets its own short path and its own campaign value, built and verified the
same day, so six simultaneous posts stay separable. **Without that they would all
read as `reddit`**, and the only question worth asking of six posts — which one
worked — could not be answered afterwards.

```
blotterib.com/mba         reddit-mba-01
blotterib.com/consulting  reddit-consultingcareers-01
blotterib.com/hub         reddit-financestudentshub-01
blotterib.com/fc          reddit-financialcareers-01
blotterib.com/analyst     reddit-financialanalyst-01
blotterib.com/students    reddit-financestudents-01
```

Subreddit names are unverified and a path costs nothing if one turns out not to
exist or not to accept the post.

### The audience is anyone recruiting in finance

**Jon: *"We aren't necessarily targeting any specific recruiting candidates. If
you are recruiting for finance we are targeting."***

So the pre-season composition risk identified in `02`'s replacement strategic
item is **accepted rather than engineered around**. No audience is selected for
or against on the basis of where it sits in the recruiting calendar.

**The mitigation becomes diagnostic instead of selective.** Composition is read
after the fact rather than controlled up front, which requires two things to
work: a distinct UTM per post, and `recruiting_window` / `recruiting_track` on
profile completion. That is what makes the UTM scheme below load-bearing rather
than tidy.

### The share-card re-scrape is deprioritized

**Jon: *"Don't think this is very important."*** Not done. `06` carries the row
with a trigger, since the cost of being wrong is a stale card on the first
LinkedIn post and the fix is the same afterwards as before.

### The UTM scheme, and four faults in the attribution code

**Jon: *"We should do the UTM scheme to track where visitors came from."***

The scheme is in `07-infrastructure-runbook.md` under *Promotional links and
attribution* and is not repeated here. Two parameters only, `utm_source` for the
platform and `utm_campaign` for the individual post, one campaign value per post
and never reused.

**Why two and not five.** The adapter reads exactly two parameters and WS3 names
exactly two properties. A `utm_medium` the instrument ignores adds visible
length to a link on the one platform — Reddit — where a link that looks like
marketing is a real cost. The related rule that follows from the same reasoning:
prefer a Reddit text post with a markdown link over a link post, because a link
post displays the URL in full.

**Then the code turned out not to be able to answer the question.**
`attribution()` had four faults, and they were found by reading it rather than
by it failing, because it fails silently by construction:

1. **`document.referrer` is `""` for direct traffic and `??` does not catch an
   empty string**, so direct visitors carried `traffic_source: ""`.
2. **Raw referrer strings do not group.** One source was many rows.
3. **Same-host navigation counted as a referral** — `/privacy` and back
   re-attributed a visitor to `blotterib.com` and destroyed their real source.
4. **Nothing was persisted.** Attribution was recomputed per event from the URL
   at that moment.

Fixed as first-identified-touch, stored under `blotter:r1:attribution`, with
`direct` as an explicit never-stored value, referrers reduced to a bare
hostname, own host ignored.

**A fifth fault appeared during verification and is the interesting one.**
`attribution()` was reachable only from inside `track()`, which returns early on
a suppressed milestone — so in a browser that had already been through the
funnel, a tagged arrival was recorded nowhere. That is a small data case and a
large design fault: **attribution silently depended on suppression state.**
Capture now happens on mount in `AnalyticsProvider`, independent of any event.

It was found because the first verification run returned `null` where the value
should have been, in a browser profile that had run the funnel before. Reading
the code would not have surfaced it; the run did. Same lesson as session 9's
film geometry, in a different medium.

**Verified against a production build**, five cases: tagged arrival stores
source and campaign; a later differently-tagged arrival does not overwrite it;
direct stores nothing; an own-host referrer is ignored; a cross-host referrer
stores the bare hostname.

⚠ **CORRECTION, same day.** This entry originally said *"Nothing was sent to
PostHog — the local server has no vendor key."* **That was wrong.** Four
`page_viewed` events from `localhost:3100` are in PostHog, carrying
`reddit-financialcareers-01`, `reddit-01` and `reddit-mba-01`. The claim rested
on `read_network_requests` returning nothing for a `posthog` pattern, which was
a limitation of the recorder rather than evidence of no traffic — **a derived
reading trusted over the artefact, which is session 9's lesson repeating in a
fourth medium.**

**No number is affected**, and it was checked rather than assumed: those events
carry `is_internal: true` **and** a `$host` of `localhost:3100`, so the canonical
read drops them twice over. But it makes the `localhost:3100` gap noted in `07`
real rather than hypothetical — the internal-person subquery names
`localhost:3000`, and only the `is_internal` clause is actually catching these.

**This is an instrumentation repair, not a change of meaning.** `traffic_source`
and `campaign` are WS3 properties and still answer the same question. The
encoding of `traffic_source` does change — `direct` and bare hostnames, where
the 47 pre-promotion views carry `""` and full referrer URLs — which is worth
knowing when reading across the boundary.

### `/privacy` becomes indexable, `/contact` does not

Jon: *"Not sure what the privacy condition is."* — so this was explained rather
than ruled, and decided on the standing reasoning rather than as a new question.

Both pages carry `robots: { index: false }` in their own metadata, left from
before site indexing was turned on August 11. The recall argument that carried
indexing applies to the privacy policy directly: a reader who wants to check the
data story days after seeing a post should be able to find it. `13` recommends
the same. **`/contact` stays `noindex`** — an indexed contact form attracts
scrapers and has no recall value.

## Session 11 — September 1, 2026 — the build architecture is ratified

The first session since August 13, and the first about the product rather than
the page. Jon opened by asking what it would actually take to build Blotter for
real: effort, timeline, steps, and gates.

**Nothing about the page, the funnel, the event set or the read rules changes
in this entry.** Round one's instrument is untouched.

### What was ruled

**A three-part build architecture, ratified by Jon on September 1, 2026.**

1. **The student's own Google account does the reading.** Blotter ships as a
   Google Sheets script that runs inside the student's account, under their own
   authorization, against their own Gmail and Calendar. Blotter's servers never
   hold a Google token and never see a message body.
2. **The rules live on Blotter's server, not in the sheet.** The script is a
   courier: wake on a timer, read headers and calendar events, send them to
   Blotter, write back whatever comes home. Every judgment — what counts as
   `Replied`, when a follow-up is overdue, what the next move is, how the
   Outstanding tab groups — is server-side.
3. **Distribution is a template each student copies**, not one published add-on
   that many students authorize.

**The vocabulary is Jon's and later sessions should keep it.** The thing in the
student's sheet is the **courier**; the thing on Blotter's server is the
**rulebook**. The distinction survived four rounds of explanation and it is
the one he ratified, so do not rename it.

### The reasoning

**Custody is the whole argument.** The earlier framing in `01` and `02` — that
a backend build means Nylas or Unipile — treats the Google connection as the
hard part. It is not. The hard part is that a hosted backend means Blotter
*holds students' recruiting email data on its own infrastructure*, and
everything expensive follows from that one fact: token storage and refresh,
multi-tenant isolation, a deletion pipeline, background job infrastructure,
monitoring, and a quality floor that forbids shipping anything scrappy. That
delta is roughly eight to eleven of the ten-to-fourteen weeks a hosted build
costs. **The state engine is identical on both paths.**

Running inside the student's account removes all of it. It also makes the
page's existing privacy claims true by construction rather than by promise:
`never reads your personal email` and `does not retain full email bodies` are
architectural facts when the mail never leaves Google.

**Splitting courier from rulebook is what makes the ruling reversible.** Jon's
objection was the right one — *if it runs in their account, can I still fix
bugs, see failures, and cut off access?* The answer is yes, because what the
student owns is about a page of instructions that almost never changes, and
what Blotter owns is every rule that will ever need fixing. Change a
follow-up window on the server and every student has it on their next run.
Stop answering and their sheet stops updating.

The same split is what turns the eventual move to a hosted build from a rewrite
into a swap. **The hosted architecture is already "the server does the
thinking."** Building that half now means the later migration replaces only
where the facts arrive from — an ingestion adapter, roughly two to four weeks —
rather than rebuilding the product. Written the other way, with the rules
tangled into the Sheets-only commands for reading mail, the migration is
mostly a rewrite. **That cost is decided in week one and cannot be recovered
later.**

### What this ruling does *not* settle

Recorded because the risk here is a later session reading a ratified
architecture as a decision to build.

- **It is not a decision to build.** The demand evidence has not moved: 63
  visitors, 9 leads, 1 waitlist join, **zero checkout starts ever**, and eight
  of nine leads stopped before the price screen. This entry settles *how*, not
  *whether* or *when*.
- **Free versus paid is not ruled.** Jon raised free distribution to as many IB
  students as possible and did not decide it. It is a strategy change, not a
  distribution one: WS3's entire instrument measures willingness to pay, and
  going free withdraws the question round one exists to answer. `06` carries it.
- **The 100-user question is untested.** See `06`.

### Amendments this forces

- **`01-project-and-product.md`, "Gmail capture, technically"** and
  **`02-strategy-and-test.md`, "Later product work"** both state that Gmail
  access goes through an intermediary such as Nylas or Unipile if validation
  justifies a build. **A third option now precedes it** and neither file
  contemplated it. The intermediary assumption is not withdrawn — it remains
  the destination — but it is no longer the first step.
- **The provider sentence is now in active conflict with the plan.** The live
  page reads `Blotter connects to Google through an established connection
  provider whose Google application has passed Google's CASA security
  assessment.` Under the ratified architecture there is no provider and no
  CASA. It was already carried as the page's one unverified claim, gated on
  provider selection; **it is now not merely unverified but contradicted by the
  build plan.** Surfaced per `CLAUDE.md`: the spec governs and the sentence
  stands until Jon rules, but it cannot survive a Path C launch. `06` carries
  the gate.

### Rejected, and why

- **Going straight to a hosted backend on Nylas or Unipile.** Not rejected as
  wrong — it is the destination — but rejected as the *first* build. Three to
  four months, per-account provider fees against a `$9.99` price that have
  never been quoted, and data custody, all before a single student has used
  anything.
- **Putting the rules inside the sheet.** Simpler to build and it forfeits bug
  fixes, observability, billing enforcement, and the cheap migration. Rejected
  on all four.
- **A published Google Workspace add-on.** One application many students
  authorize is exactly the shape Google caps and reviews.
- **A separate Phase 0 spike against Jon's own inbox.** Proposed and withdrawn
  in the same conversation. Jon: he recruited over two years ago and has no
  live mail flowing, so a spike would not mimic real recruiting. **He is right
  about the live half and it changed the plan** — the pilot *is* the spike, run
  against students recruiting now. His archive keeps two narrower uses that do
  not decay: it answers the calendar-coverage question retrospectively, and 742
  emails with known outcomes make a labelled regression corpus.

### The estimate this was decided against

Focused weeks, solo with AI assistance, at roughly 25 to 30 hours.

| | Build work | Calendar to students using it |
|---|---|---|
| Hosted backend, own Google application | 12 to 18 weeks | 5 to 7 months |
| Hosted backend, provider's application | 10 to 14 weeks | 3 to 4 months |
| **Ratified architecture** | **5 to 7 weeks** | **6 to 9 weeks** |

**Fall 2026 began ten days ago** and the price screen tells nine people that is
when Blotter opens. Only the ratified path lands inside it.

⚠ **The Google verification rules, scope classifications and CASA tiers behind
these numbers were not verified against Google's current policy this session.**
They are the highest-consequence facts in the plan and the ones least safe to
take from an assistant's recall. Check the current Google API Services User Data
Policy before planning a single week around them.

### Two rulings the same day, and one correction to the estimate

**1. Claim-versus-reality discrepancies are not a gate.** Jon: *"Don't worry
about discrepancies between claims on the live landing page and actual
infrastructure. We can change claims to fit reality. There is no binding
commitment and no one has signed up."*

This closes the provider sentence opened hours earlier and **generalises past
it.** Every claim gate carried in `06` rests on the same footing: the page
markets a product that does not exist, nobody has paid, and copy is the cheapest
thing in the project to change. The gates were written when a provider was
thought imminent and the page was about to meet traffic; neither turned out to
be true. **They revert to live gates the moment a real student connects a real
inbox**, which is a different and much later moment than public traffic.

Do not read this as licence to write anything. It says the copy follows the
build rather than constraining it — not that accuracy stops mattering once
someone is actually using the thing.

**2. Calendar coverage is total.** Jon, from his own recruiting season: *"All
coffee chats lived on calendar. Literally all of them."*

This answers the largest product-truth question in the build on the day it was
opened, and it answers it in the product's favour. `Call scheduled`,
`Call completed` and the `Send thank-you` that follows a completed call all have
a real trigger. Section 3's calendar beat and Section 4's thank-you group are
describing something that will actually fire.

**Why this generalises past one person, which matters because it is n=1.** The
student does not create the event — the banker does, and the invite arrives in
the student's calendar whether or not the student is organised. **It is the
exact inverse of the tracker's own failure mode**, which decays precisely
because upkeep depends on the student. The signal Blotter needs is the one
signal in this process that arrives without the student doing anything.

Residual to watch in the pilot, and it is small: ad-hoc calls agreed in email
prose and never invited.

**3. Correction: the 100-user cap test was over-ranked.** It was flagged three
times in one conversation as the thing to do before anything else. That was
wrong on priority, and the reasoning was not checked before it was repeated.

**The cap binds at 100 students. Blotter has 9 leads.** It gates nothing for
months, and gates nothing at all unless free-to-everyone is ruled. What is
genuinely worth seeing from that test is not the cap but **the unverified-app
warning screen** — day-one friction on the *first* pilot student, not a problem
at student 101 — and that is met by installing the pilot for a real student
rather than by a standalone exercise. **Folded into the first pilot install.**

### Jon corrects the tracker's evidentiary value, and it contradicts `01`

Recorded September 1, 2026, while writing the Learn-phase brief.

**`01-project-and-product.md` says** the tracker's value is *"the decay curve:
state columns maintained early, then abandoned as the season got busy."*

**Jon now says otherwise:** *"The states on the tracker were from a template. I
never really followed them whatsoever and color coding states became stale and I
didn't use it. Really just noise."*

**That is not decay. It is a state layer that was dead on arrival** — inherited
with a template, never once trusted. And it is a *better* fact for the product
than the one on file: gradual decay says manual upkeep fails under load, while
never-started says manual state tracking is so unnatural that a motivated
student who built a nineteen-column tracker never even began.

**Not amended into `01` yet, deliberately.** Both versions are Jon's own recall
of a season two and a half years past, and the file itself can settle it — when
each state cell was actually filled is a fact, and the Learn phase has been told
to resolve it against the evidence rather than pick a side. `01` gets amended
once there is data, not once there is a second recollection.

**Two consequences already applied to the brief:**

- **The tracker is no longer the answer key**, and its eleven-state legend is
  now explicitly barred from Pass One's category derivation. Feeding a template's
  vocabulary into a bottom-up derivation would contaminate exactly the thing the
  two-pass method exists to protect. It keeps two real uses: the contact list,
  and the column structure a real student actually built.
- **The mail is now the only source of truth about what happened**, which raises
  what the Learn phase is carrying.

### Jon recruited from two addresses, and did not know it

`jnachman17@gmail.com` **and** `jnachman@utexas.edu`. Found in the tracker's
`Email Sent From` column while reading the file's structure to write the brief.
Jon: *"Oh shoot, a ton of emails were sent from jnachman@utexas.edu. Didn't
realize that."*

**This is the largest product finding so far and it came from a spreadsheet
header.** A product watching one address gets every downstream state wrong on
the other's threads: it sees a banker's reply with no outbound before it, or
scores a thread as silent when an email was in fact sent. **Onboarding must ask
every student for every address they send from**, and no amount of engine
accuracy compensates for missing one.

Only one Gmail account connects to the assistant at a time, so **Pass One is now
two stages** — gmail, pause for Jon to switch the connector, then utexas — with
merge and deduplication rules, a `source_mailbox` field on every record, and a
Stage A interim report written to disk so Stage B can resume in a cold chat.

## Session 12 — September 1, 2026 — the Learn phase, and the engine rules

The Learn phase ran and the engine rules were written from its findings and
ratified the same day. `workstreams/ws9-build/` holds the brief, the Stage A
interim report, the findings, and `04-ENGINE-RULES.md`, which is the engine.

### The Learn phase delivered, and was checked rather than trusted

**67 contacts, 325 messages, 126 threads, 35 calendar events**, both mailboxes,
January to April 2024. Verified by the conductor chat against the corpus:
message count exact, Pass One free of both the tracker's vocabulary and the
website's, no existing document edited, nothing in `web/` touched.

**K1 Investment Management was removed on Jon's ruling** — it is the K-1 the
brief excluded. 8 messages, one contact record, dropped from the index and the
build script.

### What the data changed

**Sender-matching is dead.** The rule that Blotter reads only mail *from* people
in the tracker missed **29% of real inbound** — assistants answering for their
banker, colleagues cc'd in, shared recruiting mailboxes, capitalisation
differences — and made bounces **structurally invisible**, because
`mailer-daemon` is in nobody's tracker. Blotter would have told Jon to chase a
dead address three times. **The engine reads whole conversations instead**,
which fixes both at once without touching unrelated mail.

**No day thresholds anywhere.** Jon's ruling, and the data is unambiguous: real
replies arrived at 6.8, 11, 13.2 and **21.6** days, and the 21.6-day one opened
four interview rounds. The live site's `No reply for 5 days` would have chased
her sixteen days early. **Blotter shows what is true and how long it has been
true, sorted longest first, and the student decides.** `Next move` and
`Bump thread` are cut.

**`Call done` absorbs the thank-you.** Jon went back and forth on a
`Thank-you owed` state and landed on not having one. The resolution: `Call done`
holds until somebody writes, so sending the thank-you clears it automatically.
The state *means* the obligation without naming it.

**Version one tracks people, not firms.** Jon's ruling. It drops 7 of 35 real
calendar events and all 9 firm records — **including all four interview rounds
at the firm Jon joined.** Recorded loudly in `04-ENGINE-RULES.md` §1: Blotter
version one goes quiet exactly when recruiting becomes interviews. Deliberate,
and the most likely thing to want back.

**Referrals are modelled for the first time.** 108 of 325 messages carry
introduction language; Chris Miller alone produced nine contacts. New people
found in a contact's thread go to a **"found these" area for approval** rather
than straight into the sheet — Jon's ruling, and the data supports it, since
automatic adding would have inserted three assistants and coordinators who
mattered but were not people being networked with.

### The setup scan, which Jon found and the rules did not have

Jon: *"when you first connect this is a logistics issue. It must read back every
email and gather which ones it thinks recruiting is."*

**He is right and it broke the reading rule as written** — Blotter cannot scope
to threads containing your contacts before it has any contacts. Resolved as
**two different reads**: one wide scan of the last 3 months at setup, proposing
a list the student approves, and narrow thread-scoped reading every 15 minutes
forever after.

**The wide scan is not hypothetical.** The Learn phase performed exactly it on a
real inbox and pulled 59 people out while never opening roughly 7,500 threads of
newsletters. Its limit is equally known: bankers on personal addresses match no
bank domain and are missed.

### Two corrections to earlier work

**The bump count was wrong and Jon caught it.** The findings said 12; Jon said it
was far more. Counted directly from the corpus: **30 within threads, 22 counting
each contact's mail together, 9 of which use follow-up language** — which is
where 12 came from. The rules carry all three numbers rather than one.

**The conductor's calendar reasoning was wrong**, recorded in session 11 as
*"the banker creates the invite… the one signal that arrives without the student
doing anything."* **Jon organised 23 of 35 events** and bankers repeatedly asked
him to. The events are real; the reason given for trusting them was not. Session
11's paragraph should be read as superseded.

### Deferred with reasons, not dropped

- **AI reading a thread to recognise a natural ending.** Testable against the
  325 real messages before anything is built.
- **Remembering who introduced whom.** Version one notices new people; it does
  not model the referral graph.
- **`01-project-and-product.md`'s decay curve.** The file settles it: every
  `Initial Contact` date falls in a fifteen-day band and the tracker stops dead
  on 1 February while the mail runs to 23 April. Not gradual decay, not never
  started — **abandoned in one motion**, which Jon attributes to falling volume.
  Left unamended pending his ruling on the wording.

## Session 13 — September 1, 2026 — the build ran, and the engine is right

Three chats ran in parallel worktrees. All three delivered. **Everything landed
on `ws9-learn-and-engine-rules`**, not the worktree branches — the isolation
worked for files, and the branches were merged rather than kept.

### The result, and it is the thing worth knowing

The engine and the answer key were built **independently** — the test chat never
read the engine's code, per its brief — and then run against each other over
Jon's whole real 2024 season.

**106 mismatches. Every single one is `days` (98) or `last_call` (8). Zero of
anything else.**

Verified by the conductor, not taken on report: **every status, every attempts
count, every `last_contact`, every `next_call`, and every found-list membership
agrees**, across 67 real contacts at four points in the season. Two things built
from the same English document, by chats that could not see each other, produce
the same answer about a real recruiting season.

The 106 are one arithmetic convention, ruled below, and the fixtures have not
been regenerated since the ruling. **`run-fixtures.ts` reports 15 of 31 passing
and will keep doing so until they are.** That number is not a quality signal.

### Rulings made during the build

Recorded from the build chats' notes; each is second-hand to this chat and
auditable in `09-RULEBOOK-NOTES.md` and `11-COURIER-NOTES.md`.

1. **A day turns at midnight in the student's timezone.** `days` subtracts
   calendar dates, not elapsed hours. The engine's reading upheld over the
   fixtures'. **Amended into `04-ENGINE-RULES.md` §4** as version 3.
2. **A calendar acceptance is machine mail** — never a reply, never an attempt,
   never `last_contact`. Found because Mat Young accepted an invite minutes
   after Jon's last email and the engine counted it as him writing back.
   **Amended into §6.** The rules were silent; the answer key was right and the
   engine was wrong. **This is the independent check paying for itself.**
3. **A bounce is about the last word, not a permanent mark.** When someone later
   writes from an address that works — Marijoy Bertolini did — the row moves to
   `Replied`.
4. **Version one uses a Blotter template**, not the student's existing tracker.
   Column mapping deferred.
5. **The approve flow may append a new Contacts row** with Name and Email. This
   resolves a real conflict inside the ratified rules: §8 says approved people
   become contacts, §9 says Blotter never writes student columns. Jon ruled §9
   means "never touch an existing student cell." No existing row is ever
   modified.

### What was built

| | |
|---|---|
| **Rulebook** | `POST /api/engine`, six files, stateless, no new env var, no database, no new service. 65 self-test checks pass. `tsc`, `eslint` and `next build` clean, every existing page untouched |
| **Answer key** | 31 request/expected pairs — 15 targeted cases, 4 whole-season snapshots — derived from the rules and the corpus without seeing the engine |
| **Courier** | `courier/`, one `Code.gs` for a single paste, a read-only manifest, a sheet template, and a 189-line install guide |

**The courier's manifest is the read-only guarantee**: `gmail.readonly`,
`calendar.readonly`, `spreadsheets.currentonly`. No write scope on mail or
calendar exists for the script to abuse. That is stronger than a promise in
prose.

### Gaps, in order of how much they matter

1. **The setup scan was never built.** `04-ENGINE-RULES.md` §2 defines it; the
   contract has no request shape for it and the courier brief's duty list is the
   15-minute loop only. **Both chats surfaced it rather than inventing one**,
   which is correct. Until it exists a student types their starting contacts by
   hand and `Found` grows the list from there. Needs a contract change.
2. **Nothing has run live.** No real inbox, no real Google account, no real
   round trip. Everything is verified against a frozen archive.
3. **Sorting is unowned.** §4 says longest-waiting first; nobody sorts. Sorting
   the tab would reorder student rows, and row number is the join key.
4. **The 15-minute cadence is quota-risky on consumer Gmail** — roughly 43,000
   read operations a day against a 20,000 limit, and 96 runs against 90 minutes
   of trigger time. **When it trips the run throws before the write phase, so
   the sheet goes stale rather than wrong.** A 60-minute cadence sits inside
   both budgets.
5. **`next_call` / `last_call` format** is unsettled between the contract's bare
   dates and §9's `1/17 @ 2:00 PM`. Whatever the server sends is what students
   see.
6. **13 rules questions** the answer-key chat could not settle, listed in
   `10-TEST-CASE-NOTES.md` §7.

### On the install being 22 steps

Jon's objection — *"no student in their right mind is gonna follow a twenty two
step process"* — reads Part A of `INSTALL.md`, which is **Jon building the master
sheet once**. **Part B, what a pilot student does, is already four steps**: make
a copy, reload, authorise, fill in your addresses. The courier chat solved this
before it was raised.

The irreducible friction is Google's unverified-app warning, three or four
screens, and **nobody has seen it yet.** `INSTALL.md` step 16 asks Jon to
screenshot the real thing on first install.
