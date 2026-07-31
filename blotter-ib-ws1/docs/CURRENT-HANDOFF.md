# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Begin Workstream 5: spreadsheet-page Lovable implementation, instrumentation, private deployment, and manual verification.

Workstreams 1 through 4 are complete. The spreadsheet landing-page narrative, all seven sections, product-experience choreography, funnel copy, responsive priorities, and claim-support rules are settled.

## 2. Required reading

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS5-SPEC.md`
4. `docs/workstreams/WS4-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/workstreams/WS2-SPEC.md`
7. `docs/05-working-agreement.md`

## 3. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- WS4 controls page copy, visuals, demo sequence, responsive priorities, and claim boundaries.
- WS3 controls funnel architecture, price, events, measurement, and read rules.
- Do not reopen the proposition, funnel, hero, or Sections 2 through 7 unless implementation reveals a genuine conflict.
- Do not silently revise ratified copy or sequencing in Lovable.

## 4. Workstream 4 closure

WS4 completed:

- Full WS3 versus WS4 audit
- Three-frame, three-click spreadsheet product experience
- Exact email, price, checkout, and terminal copy
- Responsive content priorities for every section and the funnel
- Full-page narrative, repetition, funnel, and claim-support audit
- Consolidated Lovable-ready implementation constraints

Items moved to WS5 rather than left as WS4 blockers:

- Provider and Google-scope verification
- Privacy-policy implementation truth
- Form and lead-storage selection
- Analytics vendor and wiring
- Domain and route configuration
- Accessibility and responsive QA

## 5. Canonical funnel reminder

1. CTA entry
2. Two recruiting questions
3. Three-frame spreadsheet experience
4. Recruiting-email capture
5. $9.99 monthly price
6. Continue to payment
7. Separate checkout with payment choices
8. Fall 2026 approximately 300-person beta confirmation

No OAuth, card entry, credentials, or payment collection.

## 6. Build state

- No approved Lovable implementation exists yet.
- No public traffic should be sent.
- Old design tokens and prior platform pixels are not authoritative.
- The spreadsheet page is built first, but the later platform page must reuse the same funnel burden and events.

## 7. Exact next action

Create the Lovable project and implement the global page shell, section sequence, typography hierarchy, and reusable spreadsheet-window component. Then build each section in order and add the canonical funnel using `docs/workstreams/WS5-SPEC.md` as the active checklist.
