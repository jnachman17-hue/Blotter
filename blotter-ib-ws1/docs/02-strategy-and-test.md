# Strategy and test design

Date last updated: July 30, 2026

This file governs validation strategy and test structure. Detailed workstream outputs live in `docs/workstreams/`. Page-copy and page-design questions remain outside this file unless they materially affect test validity.

## Strategic reversal

The project now runs market signal first, then builds only what the data calls for.

Confirmed consequences:

- The terminal artifact of this phase is an economics story, not a product.
- Read rules are written before data exists.
- Analytics is implemented and verified by hand before traffic or spend.
- Research precedes spend, except social account seeding.
- Landing-page content and experience design precede Lovable implementation.
- Features shown in the test are hypotheses, not commitments to build.

## Round-one question

Round one tests one macro variable:

- spreadsheet-native product surface;
- standalone platform product surface.

It is not primarily a feature, price, plan, or headline test.

## Matched test mechanism

Two landing pages use:

- the same canonical funnel;
- the same event set;
- the same event definitions and properties;
- the same price at the same stage;
- comparable interaction burden;
- roughly simultaneous launch timing.

The spreadsheet page is designed and built first, but it does not launch publicly before the matched platform page is ready.

Detailed confirmed funnel and analytics architecture are in:

`docs/workstreams/WS3-SPEC.md`

## Confirmed workstream sequence

1. **Workstream 1: Continuity and source-of-truth setup.** Establish GitHub canonical documents, archive rules, handoff discipline, and workstream specifications.
2. **Workstream 2: Spreadsheet-native proposition.** Define the target moment, failure mode, mechanism, user outcome, minimum offer, and boundaries at landing-page-test resolution.
3. **Workstream 3: Conversion and measurement design.** Define the matched funnel, lead capture, price treatment, checkout mechanics, analytics architecture, metric hierarchy, read rules, and interpretation thresholds.
4. **Workstream 4: Spreadsheet landing-page content and experience design.** Resolve page narrative, section architecture, near-final copy, proof devices, product visuals, integration explanation, privacy treatment, FAQ, CTA placement, demo data, and visual requirements.
5. **Workstream 5: Spreadsheet-page Lovable implementation and private deployment.** Build the defined page, implement interactions and analytics, test responsiveness, privately deploy, and verify events by hand.
6. **Workstream 6: Acquisition preparation and research.** Prepare paid and organic channels, audience targeting, account seeding, traffic plan, and testing identity.
7. **Workstream 7: Platform-page proposition, design, and matched build.** Define the platform argument, preserve the matched structure and event set, build the platform page, and privately verify it.
8. **Workstream 8: Final verification and simultaneous launch.** Confirm comparability, verify analytics again, launch both versions at roughly the same time, and interpret results under the prewritten read rules.

## Workstream documentation requirement

Every substantive workstream has a cumulative specification at:

`docs/workstreams/WS#-SPEC.md`

The active workstream specification must be updated after ratifications. `CURRENT-HANDOFF.md` is temporary context and cannot substitute for the specification.

## What must be decided before Lovable

Before implementation begins, resolve at minimum:

- page narrative and hierarchy;
- headline direction and supporting copy;
- required sections and order;
- problem dramatization and proof devices;
- product visual and demo-state requirements;
- visible capabilities and boundaries;
- Gmail, Sheets, and Calendar explanation;
- privacy and permissions treatment;
- CTA placement and behavior;
- analytics implementation requirements.

Lovable may refine spacing, proportions, typography, responsiveness, polish, and rendered layout treatments. It must not redefine the product mechanism, page argument, funnel, or analytics architecture.

## Confirmed test constraints

| Constraint | Status | Reason |
|---|---|---|
| Both pages fire the identical canonical event set. | Confirmed | Different measurement would invalidate comparison. |
| Both pages use the same canonical funnel. | Confirmed | Alternative conversion paths would confound the surface test. |
| Multiple CTAs may exist, but all enter the same funnel. | Confirmed | Placement can be diagnosed through `cta_location` without creating different offers. |
| Price appears only inside the funnel after product experience and email capture. | Confirmed | Round one does not test price and should not let price dominate first impressions. |
| One product and one monthly price are shown. | Confirmed | No plan selection or price A/B test in round one. |
| Payment-choice click is the strongest commercial-demand signal. | Confirmed | It follows informed price and checkout exposure. |
| No card-entry form, payment credentials, or money are collected. | Confirmed | The test stops at payment-method choice. |
| Spreadsheet page is built first, but both pages launch at roughly the same time. | Confirmed | Different launch weeks would confound results with recruiting-cycle timing. |
| Status vocabulary may differ only if genuinely necessary. | Confirmed | This does not relax event parity. |
| No em dashes or en dashes in visible page copy. | Confirmed | Owner style rule. |

## Traffic gates

Before public traffic:

- both matched pages are ready;
- read rules are written;
- analytics is implemented and verified by hand;
- the exact monthly price is selected or deliberately resolved through the approved implementation sequence;
- page and funnel comparability are checked;
- any required project-level kill condition is settled.

## Channels

Non-paid channels are provisionally important, but the exact acquisition plan requires later research.

Social account seeding remains exempt from the research-before-spend rule because account age and history may be mechanically necessary before promotional posting.

## Later product work

If validation justifies backend development, Gmail capture is expected to use an intermediary such as Nylas or Unipile. Real OAuth implementation and permission-willingness testing are not part of the mandatory round-one funnel.

## Open strategic item

The standalone platform page argument remains unresolved. It may be based on additional capability, cleaner interface preference, or another proposition. Resolve this honestly in Workstream 7 rather than assuming the platform must win through capability breadth.
