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
