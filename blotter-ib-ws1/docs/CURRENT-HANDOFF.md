# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero specification, and complete Section 2 Scale package are confirmed and recorded in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 3, How It Works, efficiently as one ratification package.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `docs/workstreams/WS2-SPEC.md` and `docs/workstreams/WS3-SPEC.md` are completed durable inputs.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen the confirmed hero or Section 2 unless an implementation constraint genuinely breaks them.
- Avoid backend-level edge-case analysis. Demo details need only be coherent, attractive, and credible at market-test resolution.

## 3. Confirmed Workstream 4 positioning and sequence

- Displayed product name: `Blotter`.
- Category line: `The smart recruiting tracker for investment banking and high-finance networking.`
- Marketing may cast a broad competitive-finance net.
- Both surface variants use the same Blotter brand.
- The owned domain `blotterib.com` will be used.

Confirmed seven-section sequence:

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Three primary CTA placements remain confirmed: hero, after product and action proof, and final section.

## 4. Confirmed hero

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`
- Preserve `Your recruiting tracker, always current.` for the closing section.

Visual direction remains static-first: muted stale tracker behind, dominant Blotter-maintained Google Sheet in front, and small Gmail or Calendar event chips connected to updated cells.

Student-maintained columns: Name, Title, Firm.

Blotter-maintained columns: Status, Next move, Last contact, Days, Call.

## 5. Confirmed Section 2: Scale

### Copy

Eyebrow:

`The scale of a recruiting cycle`

Headline:

`Your manual tracker was never built to keep up with this.`

Supporting argument:

`A serious recruiting cycle can generate hundreds of emails, dozens of coffee chats, applications, and overlapping interview rounds. Every reply, scheduled call, follow-up window, and completed conversation changes what needs to happen next.`

`But Gmail and Calendar record those changes continuously while your spreadsheet changes only when you stop and update it. As the process accelerates, updates get delayed, details are forgotten, and the tracker gradually falls out of sync with reality.`

Closing line:

`Once you stop trusting the tracker, you are back to reconstructing your process from Gmail, Calendar, memory, and scattered notes. That is when follow-ups, thank-you notes, and next steps begin falling through the cracks.`

The implementation may shorten this copy while preserving the argument.

### Case-study proof

Ratified qualification:

`Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`

Current exact figures:

- 628 recruiting emails
- 55 coffee chats
- 19 applications
- 30 interview rounds

The figures are presented as one real case study, not an industry average.

### Time-savings claim

Ratified primary claim:

`Save approximately 60 hours of manual tracker administration over one recruiting cycle.`

Ratified small methodology line:

`Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.`

The claim applies specifically to the same JPMorgan-offer case. The methodology remains visually minor and no arithmetic is shown on the website.

### Visual treatment

Use four large case-study figures followed by one compact divergence visual.

Divergence titles:

- `WHAT ACTUALLY HAPPENED`
- `WHAT MADE IT INTO THE MANUAL TRACKER`

The left side shows continuous Gmail and Calendar events. The right side shows sparse, delayed, incomplete tracker updates. The 60-hour claim appears as a subordinate proof block with its small methodology line.

No CTA appears in Section 2.

## 6. Confirmed product-boundary language

Primary statement:

`Blotter is a recruiting-logistics layer that keeps your process organized. It does not teach technicals or write your outreach.`

Compact strip:

- No technical-prep content
- No generic mass AI outreach
- No AI slop

Supporting line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

Likely placement is near Section 3 after the product has been explained positively.

## 7. Exact next action

Specify Section 3, How It Works, as one compact ratification package. Settle:

1. Section headline and concise explanatory copy.
2. Division of labor between the student and Blotter.
3. Gmail → Blotter → Google Sheets and Calendar → Blotter → Google Sheets visual system.
4. Exact visible activity examples.
5. Placement and visual treatment of the confirmed product-boundary language.

Then continue through Action View, Preservation, Privacy and FAQ, closing section, funnel screens, responsive constraints, and the final Lovable-ready implementation brief.

## 8. Workstream 3 constraints that remain fixed

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede the product experience.
- One concise spreadsheet experience occurs before email capture.
- Product experience lasts approximately 15 to 20 seconds maximum.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout includes payment-choice buttons without card entry or payment collection.
- The terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces ultimately use the same funnel, price, event set, and measurement rules.

## 9. Build state

- No Lovable project exists yet.
- No reusable production code exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and the measurement period is frozen.

## 10. Required reading for a new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS4-SPEC.md`
4. `docs/workstreams/WS2-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/05-working-agreement.md`

Then execute the exact next action. Do not reopen completed WS2, WS3, the hero, or the ratified Section 2 package.