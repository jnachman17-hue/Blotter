# Decision log

Date last updated: August 1, 2026

This file is a concise index of settled, rejected, and superseded project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md` and ratified surface instructions live in `docs/workstreams/ws5-build-specs/`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.**

Status: Confirmed

**Workstream specifications preserve detailed decisions. This decision log remains a concise cross-project index.**

Status: Confirmed

**New substantive product, copy, or presentation decisions require Jon ratification before becoming canonical or closing a workstream. Consultant-prepared audits, consolidation, and implementation guidance may proceed without ratification only where they do not create or alter substantive decisions.**

Status: Confirmed

**During WS5, implementation-sensitive landing-page and funnel decisions must be recorded in self-contained files under `docs/workstreams/ws5-build-specs/`. A build specification must explain the actual requirement without chat-dependent shorthand, and all relevant canonical indexes and open-question records must be updated before moving to the next surface.**

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

**Both pages use the same canonical funnel, $9.99 monthly price, analytics event set, measurement rules, and displayed brand.**

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

- Canonical funnel: CTA entry, two recruiting questions, one concise product experience, recruiting-email capture, $9.99 monthly price, purchase progression, payment-choice click, and Fall 2026 cohort confirmation.
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
- A full-page coherence and claim-support audit found no need to reopen ratified Sections 1 through 7.

Status: Confirmed

## Workstream 5 implementation

The active specification is `docs/workstreams/WS5-SPEC.md`.

**WS5 builds the spreadsheet page in Lovable, implements the canonical funnel, stores leads, wires the exact WS3 events, deploys privately, and verifies claims, responsive behavior, accessibility, analytics, and spreadsheet-interface fidelity before public traffic.**

Status: Confirmed

**Before broad page-scene implementation, WS5 must create one reusable high-fidelity Google Sheets-style spreadsheet-window component, compare it against the approved references, obtain Jon's visual approval, and reuse the approved primitive across every spreadsheet scene.**

Status: Confirmed

**The purchase-like funnel must not disclose demand testing, beta status, Fall 2026 timing, future availability, or no-charge status before the payment-choice click. The terminal state is the first availability disclosure.**

Status: Confirmed

**The desktop hero communicates that relevant Gmail and Calendar activity directly maintains the live relationship-state fields in the spreadsheet. It uses one current Google Sheets-style tracker, preserves the three approved cue cards, removes the stale rear sheet and explicit engine, maps each cue directly to the corresponding maintained row block, applies a faint shared Blotter-yellow tint across Status through Call, emphasizes the three cue-linked example rows, and uses below-sheet region underlines for `YOU add the contacts` and `BLOTTER keeps them current`.**

Detailed authority: `docs/workstreams/ws5-build-specs/01-HERO.md`

Status: Confirmed

**Tracker decay and stale-sheet storytelling are excluded from the hero.**

Status: Confirmed

**Landing-page Section 2 uses an editorial scale-and-consequence sequence with exact figures of 628 recruiting emails, 68 coffee chats, 19 applications, and 30 interview rounds; a subordinate approximately 60-hour administration estimate and methodology; one exact three-sentence supporting paragraph; one formal exact Goldman Sachs rejection-email asset with two external annotations; exact closing copy; and no CTA. The prior 55-coffee-chat figure, manual-tracker divergence table, another spreadsheet visual, and multi-email sequence are superseded or rejected.**

Detailed authority: `docs/workstreams/ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

Status: Confirmed

**Landing-page Section 3 uses the exact systems-level sequence of Gmail and Google Calendar activity to Blotter to a current Google Sheet. It uses one formal exact `2048 × 633` mechanism asset, three external stage labels, the exact boundary line, one compact row of the three product-boundary badges, the exact closing line, and no CTA. The former `YOU CONTROL` and `BLOTTER MAINTAINS` lists are removed because the hero already communicates the ownership split.**

Detailed authority: `docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`

Status: Confirmed

**The provisional stacked-record mark and lowercase `blotter` treatment inside the Section 3 exact asset are authoritative for that asset only and do not establish the global canonical Blotter logo.**

Status: Confirmed

**Landing-page Section 4 uses the exact `1848 × 1160` Outstanding Actions PNG as its dominant visual, with exact headline, supporting line, CTA line, and `See how Blotter works` button. The page CTA enters the canonical funnel with `cta_location = actions`. The visual is a formal exact asset and must not be redesigned into cards, dashboard tiles, or a separate task-management interface.**

Detailed authority: `docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`

Status: Confirmed

**The same formal exact Outstanding Actions asset governs canonical funnel product-experience Frame 3. Section 4 and Frame 3 use different surrounding copy and controls, but the spreadsheet visual, queue content, grouping, styling, and proportions must not be independently redesigned.**

Status: Confirmed

## Product and technical context

- Blotter is a logistics layer only.
- Auto-capture is the founding principle.
- Blotter must not be described as reading unrestricted personal email.
- If validation justifies backend build, Gmail access should use an intermediary such as Nylas or Unipile. Direct restricted-scope access and CASA remain deferred.
- Lovable is the implementation tool.
- The old design-token system and prior platform pixels are not authoritative.

Status: Confirmed

## Rejected and superseded items

- `You keep your record. Blotter keeps the state alive.` Rejected.
- Mandatory early Gmail OAuth or simulated Google authentication. Rejected.
- No price or card-adjacent step in round one. Superseded.
- Price on the main landing page. Rejected for round one.
- Multiple plans or price A/B testing. Rejected.
- Card-entry form or payment collection. Rejected.
- Separate `cta_clicked` analytics event. Rejected.
- Permanent or bounded project kill condition. Rejected.
- Tally as the settled form solution. Not a decision.
- Separate event-to-row narrative section duplicating the hero mechanism. Rejected.
- Treating provider selection, domain routing, or production OAuth as WS4 design blockers. Rejected; these are implementation or later-product dependencies.
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
- Section 3 `YOU CONTROL` and `BLOTTER MAINTAINS` lists. Superseded and removed because the hero already communicates the division of labor.
- Treating the provisional Section 3 Blotter mark as the global canonical logo. Not ratified and prohibited without a later identity decision.
- Treating the Outstanding Actions asset as merely directional. Superseded by formal exact status for Section 4 and funnel Frame 3.
- Creating a second independently styled Outstanding Actions visual for funnel Frame 3. Rejected.
- Converting Outstanding Actions into three dashboard cards, KPI tiles, or a generic task-management interface. Rejected.
