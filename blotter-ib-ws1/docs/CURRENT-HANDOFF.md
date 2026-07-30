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
- No payment credentials or money are collected.
- The visitor sees a separate, short checkout screen after `Continue to payment`.
- The checkout shows Blotter, the exact monthly price, monthly billing cadence, amount due, a concise product descriptor, and payment-choice buttons.
- `Pay with card` is always available. Apple Pay may appear where supported. Either payment-choice click is the strongest commercial-demand signal, with payment method stored separately if available.
- No card-entry form is shown.
- After the visitor clicks a payment-choice button, the next screen states that Blotter is planned for Fall 2026 and that the visitor has secured a place in the limited first beta cohort. The cohort is currently framed as approximately 300 people, and Jon will maintain and honor the list.
- Because no card details are entered and no charge is attempted, the terminal screen does not need unnecessary language stating that no payment was processed or no card details were collected.
- Exact terminal copy remains later copy work.

### Minimal segmentation

The funnel asks only two high-value segmentation questions.

Question 1: `What are you recruiting for?`

Approved options:

1. Investment Banking
2. Management Consulting
3. Private Equity / Growth Equity
4. Sales & Trading
5. Asset Management / Equity Research
6. Venture Capital
7. Other

Question 2: which recruiting window the visitor is targeting.

Approved options:

1. Summer 2028
2. Full-time
3. Other

School is removed. Current year is removed because it is either unnecessary or sufficiently inferred from recruiting timing.

### Simple email capture, not OAuth

The mandatory round-one funnel will not require actual or simulated Gmail, Google Calendar, or Google Sheets OAuth.

Email capture is transparent and uses the approved direction:

`Continue to your recruiting workspace`

`Enter the email address where you conduct recruiting.`

The step must not request a password, imitate Google authentication, or imply that inbox access has been granted.

Reason: early OAuth would create a severe and analytically ambiguous trust gate. Abandonment could reflect discomfort granting sensitive permissions to an unfamiliar product rather than weak product demand or unwillingness to pay.

The landing page still must clearly demonstrate that Gmail, Google Sheets, and Calendar are the engine that keeps recruiting state current. The mechanism should be explained and shown through page content, product visuals, or the funnel product experience, not through mandatory OAuth in this round.

Willingness to grant permissions and connect real integrations is deferred to a later validation iteration, after the product value, privacy boundaries, and permission requirements are understood.

### Product experience occurs once, before email capture

The earlier concept of a brief preview before email capture followed by a more substantive experience afterward is rejected.

The visitor has no knowledge that a second, more robust demonstration would follow the email step. Splitting one product argument into a teaser and a later continuation would therefore create an artificial interruption and add friction without a clear analytical benefit.

The funnel instead uses one concise, surface-specific product experience before email capture. It must show enough value to make continuation and later payment intent meaningful, but it must remain fast and engaging. The word `full` must not be interpreted as a long tutorial, multi-screen product tour, or exhaustive feature demonstration.

The experience should complete in approximately 15 to 20 seconds at most.

Animation is not required and should not be treated as the default. The current working interaction model is simple click-to-progress because it is faster and materially easier to build.

Workstream 3 does not define the exact visual sequence, number of frames, demo states, or whether the funnel experience reuses, extends, or differs from the main landing-page hero visual. Those are Workstream 4 content-and-experience-design decisions.

The only Workstream 3 requirements are that the experience:

- remains concise;
- shows the product surface clearly enough to support continuation;
- makes the Gmail, Google Sheets, and Calendar engine understandable;
- uses no unnecessary interaction burden; and
- remains comparable in duration and interaction burden across the spreadsheet and platform variants.

### Price appears only inside the funnel

The exact monthly price will not appear on the main landing page in round one. It will first appear inside the canonical funnel after the concise product experience and recruiting-email capture.

Both product-surface variants will reveal the same price at the same matched stage and use the same pricing and checkout presentation.

Reason: round one tests macro surface preference, not price. The price is currently unresolved and largely arbitrary. Showing it on the main landing page would allow price to dominate the first impression and confound the surface comparison before visitors understand the product.

Price exposure, checkout progression, and payment-choice clicks will be measured separately. The exact monthly price remains a later decision and is not itself a round-one test variable.

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

## 5. Canonical funnel sequence

The current confirmed sequence is:

1. CTA entry.
2. Two-question recruiting configuration.
3. One concise surface-specific product experience.
4. Recruiting-email capture.
5. Exposure to one product at one monthly price inside the funnel.
6. `Continue to payment` or equivalent checkout progression.
7. Separate short checkout screen with `Pay with card`, Apple Pay where supported, or equivalent payment-choice actions.
8. Fall 2026 limited first-cohort confirmation with no payment credentials or money collected.

The email step follows the product experience because the visitor should understand enough of Blotter to make continuation meaningful. This is not being framed as a tradeoff against a hidden post-email demo; from the visitor's perspective, no later demo has been promised or revealed.

## 6. Still unresolved

- Exact monthly price.
- Analytics event names and definitions.
- Read rules and interpretation thresholds.
- Final CTA wording and visual placement, which partly belong to Workstream 4.
- Exact product-experience content and relationship to the landing-page hero, deferred to Workstream 4.
- Final checkout and terminal-state copy, deferred to Workstream 4.

## 7. Exact next action

Define the identical analytics event set and event properties for the matched spreadsheet and platform funnels.

The next discussion should determine:

1. which funnel stages require canonical events;
2. which diagnostic page and demo interactions are worth tracking;
3. which event properties must identify page variant, CTA origin, recruiting segment, recruiting window, device context, and payment method;
4. how events should be named and defined so spreadsheet and platform measurement remain identical;
5. which metrics are primary, secondary, and diagnostic before read rules are written.

Do not yet write read-rule thresholds, select the exact monthly price, design the full page, write final copy, or begin Lovable implementation.

## 8. Required reading for resumption

Read first:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read the Workstream 3 canonical files:

- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Read `docs/01-project-and-product.md` for product context if needed. Read `docs/03-page-spec.md` only when a conversion decision materially intersects later page structure.

## 9. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- A GoDaddy domain exists, but testing-domain identity remains unresolved.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and read rules are written.