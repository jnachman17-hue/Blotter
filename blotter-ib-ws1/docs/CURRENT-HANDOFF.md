# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

All seven landing-page sections are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: define the canonical CTA funnel product experience and click sequence.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen confirmed WS2, WS3, hero, or Sections 2 through 7 unless an implementation constraint genuinely breaks them.
- Work at landing-page-test resolution and avoid backend-level edge-case analysis.

## 3. Confirmed page sequence

1. Hero
2. Scale
3. How it works
4. Outstanding actions
5. Preservation
6. Privacy and permissions, including a dedicated privacy-and-data FAQ
7. General product FAQ, followed by the final closing summary and CTA

Primary CTA placements: hero, after Section 4, and final closing block.

## 4. Confirmed Section 7

General FAQ title:
`Frequently asked questions`

Questions:
1. Do I need to start with a new tracker?
2. Can I use Blotter after recruiting has already started?
3. Does Blotter write emails or help with technical preparation?
4. What happens when I add a new contact?
5. Does Blotter work only for investment banking?

Price and availability are intentionally omitted from the FAQ and remain disclosed inside the canonical funnel.

Final closing block:

- Headline: `Your recruiting tracker, always current.`
- Supporting line: `Keep your relationships moving without spending every day rebuilding the state of your process.`
- CTA: `See how Blotter works`
- Reassurance: `Keep your existing Google Sheet. No mass outreach. No technical-prep content.`
- Final CTA stores `cta_location = final`.

Section 7 is fully ratified and closed.

## 5. Exact next action

Define the canonical funnel experience:

1. Two recruiting-configuration questions.
2. The 15–20 second product-experience sequence.
3. Transparent email capture.
4. Delayed `$9.99/month` price presentation.
5. Checkout choices without payment entry or collection.
6. Fall 2026 beta terminal state.
7. Exact click path and event instrumentation across all CTA locations.

Then settle responsive priorities and produce the Lovable-ready implementation brief.

## 6. Fixed WS3 constraints

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout shows payment choices without card entry or payment collection.
- Terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces use the same funnel, price, event set, and measurement rules.

## 7. Build state

- No Lovable project exists yet.
- No reusable production code or completed landing-page assets exist.
- No public traffic launches before both pages are ready, analytics are manually verified, and the measurement period is frozen.