# WS5 Lovable plan amendments

Date ratified: August 1, 2026  
Status: Ratified  
Decision owner: Jon  
Applies to: `LOVABLE-PLAN-AND-BUILD.md`, `LOVABLE-PROJECT-KNOWLEDGE.md`, WS3, WS4, WS5, and the Lovable implementation plan

## Purpose

This addendum records Jon's amendments to the returned Lovable implementation plan. It is binding wherever it is more specific than an earlier record. It does not reopen the frozen seven-section page or canonical funnel.

## Four CTA origins

Retain the sticky-header CTA. The spreadsheet landing page has four CTA placements, all entering the same canonical funnel:

- sticky header: `cta_location = header`
- hero: `cta_location = hero`
- Section 4: `cta_location = actions`
- final closing block: `cta_location = final`

There is still no separate `cta_clicked` event. `funnel_started` carries the originating `cta_location`, which persists through the funnel.

## Section 2

The exact qualification and all other Section 2 copy already contained in `02-SECTION-2-SCALE-AND-CONSEQUENCE.md` are settled. They are not missing decisions.

## Section 6 behavior

The four numbered processing explanations are static document rows. Their explanatory text remains visible beneath each numbered heading. They are not accordions or dropdowns.

Section 6 separately includes its ratified seven-question privacy FAQ accordion:

- all questions closed initially;
- only one answer open at a time;
- full question row clickable;
- keyboard accessible;
- visible focus and correct expanded-state semantics.

## Section 7 behavior

The five general-product questions are functioning accordions with their ratified answers:

- all questions closed initially;
- only one answer open at a time;
- full question row clickable;
- keyboard accessible.

They are not static numbered headings.

## Recruiting questions

Recruiting Questions 1 and 2 each use an explicit `Continue` button. Selecting an option does not auto-advance.

`Summer 2028` is ratified exact copy and is not a typo.

## Funnel implementation rulings

- `Return to Blotter` may navigate to `/`.
- Frames 1 and 2 derive from WS4 and the approved stable shared spreadsheet primitive.
- Do not request another external storyboard.
- The checkout is one screen containing the purchase summary and payment-choice buttons. It is not two separate rendered screens.
- `checkout_started` fires when the visitor advances from price to checkout.
- `payment_option_clicked` fires when a payment choice is selected and the visitor advances directly to the terminal confirmation.

## Analytics duplicate suppression

At-most-once milestone suppression must be namespaced by test iteration, surface variant, and event name so a visitor is not permanently suppressed across future tests.

Reference key shape:

`blotter:<test_iteration>:<surface_variant>:<event_name>`

Back navigation and refresh must not duplicate milestones within the same test iteration. Email remains excluded from analytics.

## Asset gate

The formal exact asset files remain hard implementation gates. Lovable may not infer, redraw, approximate, or substitute them before the actual files are transferred.

Required transferred inputs:

- `hero-reference-v1.png`
- `blotter-sheets-reference-v1.html`
- `goldman-sachs-rejection-email-exact-v1.webp`
- `goldman-sachs-rejection-email-exact-v1.html`
- `how-blotter-works-exact-v1.avif`
- `outstanding-actions-reference-v1.png`
- `preservation-exact-v1.html`

## Approval status

Jon ratified the returned Lovable implementation plan subject to this addendum. The checkpointed implementation may proceed under the canonical source hierarchy. The project must remain private and unpublished.
