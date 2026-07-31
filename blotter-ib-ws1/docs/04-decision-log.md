# Decision log

Date last updated: July 30, 2026

This file is a concise index of settled, rejected, and superseded project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.**

Status: Confirmed

**Workstream specifications preserve detailed decisions. This decision log remains a concise cross-project index.**

Status: Confirmed

**New substantive product, copy, or presentation decisions require Jon ratification before becoming canonical or closing a workstream. Consultant-prepared audits, consolidation, and implementation guidance may proceed without ratification only where they do not create or alter substantive decisions.**

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

- Canonical funnel: CTA entry, two recruiting questions, one concise product experience, recruiting-email capture, $9.99 monthly price, checkout progression, payment-choice click, and Fall 2026 cohort confirmation.
- One 15 to 20 second maximum click-to-progress product experience occurs before email capture.
- Actual or simulated OAuth is excluded.
- Price appears only after email capture.
- No card-entry form, credentials, or money are collected.
- `payment_option_clicked` is the strongest commercial-demand signal.
- The approximately 300-person Fall 2026 beta commitment is real.
- The canonical event set has nine events and no separate `cta_clicked` event.
- The primary comparative metric is `checkout_started / page_viewed`.
- The primary commercial-demand metric is `payment_option_clicked / page_viewed`.
- Comparative and commercial-demand thresholds and sample requirements are precommitted in WS3.

Status: Confirmed

## Workstream 4 content and experience design

The full durable specification is `docs/workstreams/WS4-SPEC.md`. Workstream 4 is active and near completion.

Confirmed and not reopened:

- Displayed brand is `Blotter`; the owned domain remains `blotterib.com`.
- The spreadsheet page uses seven sections: hero, scale, how it works, outstanding actions, preservation, privacy and permissions, and general FAQ plus final CTA.
- Three CTAs use `See how Blotter works` and store `hero`, `actions`, or `final` as `cta_location`.
- The hero and Sections 2 through 7 are ratified.
- Price and availability are omitted from the landing-page FAQ and revealed only at their WS3-defined funnel stages.

Pending final ratification:

- Exact spreadsheet product-experience frames and click behavior.
- Exact funnel presentation copy only where WS3 did not already settle it.
- Material responsive content priorities.
- Final coherence and claim-support conclusions.

Status: Active, pending final ratification

## Administrative correction

WS4 was prematurely marked complete and WS5 was prematurely activated by an autonomous documentation pass. That closure and activation are not binding. The useful draft work is retained for review, while WS2, WS3, the hero, and Sections 2 through 7 remain closed.

Status: Confirmed

## Workstream 5 implementation

`docs/workstreams/WS5-SPEC.md` is a draft implementation specification and is not active until Jon explicitly ratifies and closes WS4.

The draft requires WS5 to create one reusable high-fidelity Google Sheets-style spreadsheet-window component, compare it against real Google Sheets references, obtain Jon's visual approval, and reuse the approved primitive across all spreadsheet scenes before broad implementation.

Status: Draft, not active

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
