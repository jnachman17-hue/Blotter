# Decision log

Date last updated: July 30, 2026

This file is a concise index of settled, rejected, superseded, and administratively corrected project-level rulings. Detailed workstream decisions live in `docs/workstreams/WS#-SPEC.md`.

Only items marked **Confirmed** are binding. Unsettled items belong in `06-assumptions-and-open-questions.md`.

## Documentation governance

**Every substantive workstream has a cumulative specification in `docs/workstreams/WS#-SPEC.md`. `CURRENT-HANDOFF.md` is temporary resumption context and must not be the only durable record.**

Status: Confirmed

**New substantive product, copy, or presentation decisions require Jon ratification before they become canonical or close a workstream.**

Status: Confirmed

## Strategy

- Market signal comes before meaningful product build.
- The current validation phase must produce an economics story, not a backend product.
- Read rules precede data and analytics is manually verified before traffic or spend.
- Landing-page content and experience design precede Lovable implementation.

Status: Confirmed

## Test design

- Round one compares spreadsheet-native versus standalone platform surfaces.
- Both pages use the same canonical funnel, $9.99 monthly price, event set, measurement rules, and displayed brand.
- Every primary CTA enters the same funnel and stores `cta_location`.
- The spreadsheet page is designed and built first, but both pages ultimately launch at roughly the same time.
- Material changes during measurement create a new labeled iteration.
- No permanent project-level kill condition exists.

Status: Confirmed

## Workstream 2 proposition

`docs/workstreams/WS2-SPEC.md` is complete and remains closed.

Status: Confirmed

## Workstream 3 conversion and measurement

`docs/workstreams/WS3-SPEC.md` is complete and remains closed. It controls the funnel architecture, questions, sequence, one 15 to 20 second pre-email product experience, transparent email capture, $9.99 price, checkout mechanics, payment-choice signal, Fall 2026 cohort commitment, analytics events, and measurement rules.

Status: Confirmed

## Workstream 4 content and experience design

`docs/workstreams/WS4-SPEC.md` is active. `docs/workstreams/WS4-RATIFICATION-PACKAGE.md` defines the pending completion decisions.

Confirmed and not reopened:

- Displayed brand and seven-section page sequence.
- Hero and Sections 2 through 7.
- Three CTA placements and previously ratified wording.
- WS2 and WS3 inherited constraints.

Proposed and pending Jon ratification:

- Exact three-frame spreadsheet product experience.
- Progress-click count and behavior.
- Hero-to-funnel demonstration relationship.
- Added recruiting-question framing.
- Exact email, price, checkout, payment-choice, and terminal copy.
- Substantive responsive presentation decisions.
- Any audit finding that changes ratified language.

Status: Active, pending ratification

## Administrative correction

WS4 was prematurely marked complete and WS5 was prematurely activated. That closure and activation are reversed. The drafted work is retained as a proposed completion package rather than discarded.

Status: Confirmed

## Workstream 5 implementation

`docs/workstreams/WS5-SPEC.md` is a consultant-prepared draft and is not active until Jon explicitly ratifies and closes WS4.

The draft must preserve the requirement to create, review, correct, approve, and reuse one high-fidelity Google Sheets-style spreadsheet-window component before broad page-scene implementation.

Status: Draft, not active

## Product and technical context

- Blotter is a logistics layer only.
- Auto-capture is the founding principle.
- Blotter must not be described as reading unrestricted personal email.
- Lovable is the implementation tool.
- Old design tokens and prior platform pixels are not authoritative.

Status: Confirmed

## Rejected and superseded items

- `You keep your record. Blotter keeps the state alive.` Rejected.
- Mandatory early Gmail OAuth or simulated Google authentication. Rejected.
- Price on the main landing page. Rejected for round one.
- Multiple plans or price A/B testing. Rejected.
- Card-entry form or payment collection. Rejected.
- Separate `cta_clicked` event. Rejected.
- Permanent or bounded project kill condition. Rejected.
- Tally as the settled form solution. Not a decision.
- Separate event-to-row section duplicating the hero mechanism. Rejected.