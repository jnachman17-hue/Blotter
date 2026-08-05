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

- Type is Geist, with Geist Mono reserved for figures. The exact assets keep their own type
  independent of the page: the spreadsheet is pinned to Arial and the Gmail visual to Roboto,
  matching the surfaces they reproduce, so a future theme change cannot alter a ratified asset.
- One accent, a deep navy, on the CTA, eyebrows, wordmark and headline emphasis. The Blotter
  yellow is semantic, not a second accent, and appears only where the ratified assets use it to
  mean "Blotter maintains this".
- The hero sits on a light blue to cream field that resolves to white before Section 2, drawn
  from the manual-zone and maintained-zone header colours already sampled from the assets.
  Section 2 opens on neutral ground, as `02-SECTION-2` section 12 requires.
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

**`628` carries more scale than the other three volume figures, and `inevitably falls behind reality` carries modest emphasis in the supporting paragraph.** Both are permitted by `02-SECTION-2` sections 7 and 9 and were ratified by Jon.

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
