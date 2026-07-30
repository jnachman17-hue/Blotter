# Blotter IB — Current Handoff

Date: 2026-07-30

## 1. Current objective

Complete Workstream 3 by defining the conversion and measurement system for the matched spreadsheet-versus-platform landing-page test before either page is built.

Workstreams 1 and 2 are complete. Workstream 3 is in progress.

## 2. Source-of-truth and operating rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical documents are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Only confirmed items in `04-decision-log.md` are binding project truth.
- `03-page-spec.md` is a working baseline, not a final specification.
- Do not begin Lovable implementation during Workstream 3.
- Both product-surface pages must use identical measurement and launch at roughly the same time.

## 3. Prior completed proposition

Workstream 2 established the spreadsheet-native proposition at landing-page-test resolution:

- The July audience is entering active networking before tracker decay is fully felt.
- The page sells prevention of predictable tracker decay now and may sell rescue later in peak season.
- The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.
- The student enters contacts and static information. Blotter uses relevant Gmail and Calendar activity to maintain changing recruiting state.
- The core outcome is operational control through one accurate, current source of truth.
- The minimum offer includes automatic activity capture, visually legible contact state, next-action visibility, an action-focused view, and one spreadsheet workflow.
- Blotter is a recruiting-logistics orchestration layer, not contact discovery, LinkedIn scraping, AI outreach, technical preparation, or a jobs board.

## 4. Workstream 3 confirmed rulings

### Matched multi-stage demand funnel

Round one will use an identical multi-stage demand funnel across the spreadsheet and platform pages.

Both pages may contain multiple CTA placements, but every primary CTA enters the same canonical funnel. CTA placement is recorded so the test can identify where interest originated without creating separate low-friction and high-friction conversion paths.

### Signal hierarchy

- CTA clicks and onboarding behavior measure attention, curiosity, and product exploration.
- Email submission measures identified adoption intent and creates a contactable lead.
- Price exposure qualifies the visitor economically but is not itself the strongest signal.
- Clicking `Continue to payment` or equivalent measures price-qualified checkout intent.
- The strongest commercial-demand signal is clicking a real payment-choice button after seeing the proposed monthly price and checkout total, such as `Pay with card` or `Apple Pay`.
- Reaching the pricing or checkout screen alone is not willingness-to-pay evidence.

### Payment and terminal state

- Round one shows one product at one monthly price.
- There is no plan-selection step and no price A/B test.
- No payment information or money is collected.
- After the visitor clicks a payment-choice button, the next screen explains that Blotter is planned for Fall 2026, confirms that no charge occurred, and tells the visitor that they have secured a place in the limited first beta cohort or priority-access window and will be emailed when it opens.
- The beta cohort is currently framed as approximately 300 people. Exact terminal copy remains later copy work.

### Minimal segmentation

The funnel should ask only two high-value segmentation questions:

1. Which recruiting track the visitor is pursuing. Investment banking, consulting, and private equity should appear first. The remaining list is not yet finalized.
2. Which recruiting window the visitor is targeting. Current approved options are `Summer 2028`, `Full-time`, and `Other`.

School is removed. Current year is removed because it is either unnecessary or sufficiently inferred from recruiting timing.

### Stage 3 is simple email capture, not OAuth

The mandatory round-one funnel will not require actual or simulated Gmail, Google Calendar, or Google Sheets OAuth.

Stage 3 is a transparent email-capture step framed around the address the visitor uses for recruiting or where their recruiting workspace and early-access confirmation should be sent. It must not request a password, imitate Google authentication, or imply that inbox access has been granted.

Reason: early OAuth would create a severe and analytically ambiguous trust gate. Abandonment could reflect discomfort granting sensitive permissions to an unfamiliar product rather than weak product demand or unwillingness to pay. The product has not yet earned enough trust or demonstrated enough value to interpret that abandonment cleanly.

The landing page still must clearly demonstrate that Gmail, Google Sheets, and Calendar are the engine that keeps recruiting state current. The mechanism should be explained and shown through page content, product visuals, or the simulated product experience, not through mandatory OAuth in this round.

Willingness to grant permissions and connect the real integrations is deferred to a later validation iteration, when it can be tested after the product value, privacy boundaries, and permission requirements are understood.

### Interpretation constraint

The spreadsheet and platform pages must be compared at every matched funnel stage, not only at the final payment-choice event. This allows diagnosis of where each surface gains or loses visitors while preserving the final payment-choice click as the strongest commercial signal.

Additional page and demo interactions may be measured diagnostically, but they do not create alternative conversion paths.

### Low-switching-cost proposition constraint

The spreadsheet-native proposition must make clear that Blotter can be adopted with very low switching cost:

- it works with the student's current spreadsheet;
- it does not require rebuilding the tracker or starting over;
- it can be adopted at any stage of recruiting;
- existing contacts, notes, and structure are preserved;
- the student only continues adding contacts as outreach expands, while Blotter maintains the changing recruiting activity around them.

The exact visual and copy treatment belongs to Workstream 4.

## 5. Canonical funnel status

Ratified components:

1. Multiple CTA placements may exist, but all enter the same canonical funnel.
2. Minimal recruiting-track and recruiting-window segmentation is included.
3. Stage 3 is simple recruiting-email capture, not OAuth.
4. The visitor receives a concise surface-specific product experience before the purchase decision.
5. One product and one monthly price are shown.
6. Checkout progression culminates in `Pay with card`, `Apple Pay`, or equivalent payment-choice actions, followed by the Fall 2026 limited-cohort disclosure.

Still unresolved:

- Exact remaining recruiting-track options after investment banking, consulting, and private equity.
- Exact placement and presentation of the segmentation questions.
- Whether email capture occurs immediately before or immediately after the primary product interaction.
- Exact content and duration of the surface-specific product experience.
- Where the monthly price first appears.
- Exact payment-choice presentation and terminal disclosure.
- Exact monthly price.
- Analytics event names and definitions.
- Read rules and interpretation thresholds.
- Final CTA wording and visual placement, which partly belong to Workstream 4.

## 6. Exact next action

Finalize the recruiting-track option list, then resolve whether the simple email-capture step should occur before or after the primary product interaction.

The decision should preserve the shortest credible path while ensuring that:

- email capture feels transparent and product-relevant rather than like a generic waitlist gate;
- the visitor sees enough value before being asked for materially sensitive or identifying information;
- useful leads are captured before avoidable downstream abandonment;
- both product-surface variants use the identical sequence.

Do not move yet to analytics event naming, final CTA copy, read rules, page narrative, or Lovable implementation.

## 7. Required reading for resumption

Read first:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read the Workstream 3 canonical files:

- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Read `docs/01-project-and-product.md` for product context if needed. Read `docs/03-page-spec.md` only when a conversion decision materially intersects later page structure.

## 8. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- A GoDaddy domain exists, but testing-domain identity remains unresolved.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.