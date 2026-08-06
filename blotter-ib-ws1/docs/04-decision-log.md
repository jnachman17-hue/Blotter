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
