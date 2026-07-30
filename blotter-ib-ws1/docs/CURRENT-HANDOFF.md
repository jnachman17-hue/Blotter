# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, and hero specification are now confirmed and recorded in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 2, Scale: why manual recruiting trackers fall behind.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `docs/workstreams/WS2-SPEC.md` and `docs/workstreams/WS3-SPEC.md` are completed durable inputs.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Follow `docs/05-working-agreement.md` while preserving speed and avoiding unnecessary documentation churn.
- Do not reopen the confirmed hero unless a later implementation constraint genuinely breaks it.
- Avoid backend-level edge-case analysis. Demo details need only be coherent, attractive, and credible at market-test resolution.

## 3. Confirmed Workstream 4 positioning and brand

- Displayed product name: `Blotter`.
- Category line: `The smart recruiting tracker for investment banking and high-finance networking.`
- Marketing may cast a broad competitive-finance net.
- Recruiting track is captured through the existing Workstream 3 onboarding question.
- Both surface variants display the same Blotter brand.
- The owned domain `blotterib.com` will be used.
- Exact path or subdomain routing belongs to Workstream 5.

## 4. Confirmed seven-section page sequence

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Three primary CTA placements are confirmed: hero, after product and action proof, and final section. All enter the same canonical Workstream 3 funnel and store origin through `cta_location`.

## 5. Confirmed hero copy

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`
- Preserve `Your recruiting tracker, always current.` for the closing section.

## 6. Confirmed hero visual and table

### Composition

- Static-first design.
- Muted, partially visible stale Google Sheets-style tracker in the background.
- Dominant Google Sheets-style Blotter tracker in the foreground.
- Small Gmail, Calendar, or Blotter timing chips connect activity to updated cells.
- Motion is optional later and must not delay implementation.
- No bottom status legend.

### Zone labels

- `YOU ADD THE CONTACTS`
- `BLOTTER KEEPS IT CURRENT`

### Columns

Student-maintained:

1. Name
2. Title
3. Firm

Blotter-maintained:

1. Status
2. Next move
3. Last contact
4. Days
5. Call

### Styling and colors

- Google Sheets-style dropdown chips for Status only.
- Gray: Not contacted, Sent, and other calm or inactive states.
- Green: Replied.
- Red: No reply when a bump is due.
- Blue: Call scheduled.
- Amber: Call completed when a thank-you is owed.
- Days turns red only when elapsed time creates an action.

### Eight-row pattern

1. Not contacted → Email Sarah
2. Sent → blank
3. Sent → blank
4. No reply → Bump thread
5. No reply → Bump thread
6. Replied → Reply to Marcus
7. Call scheduled → blank
8. Call completed → Thank Priya or equivalent

`Gone dead` and `Concluded` are excluded from the hero. Exact names, dates, firms, event-chip wording, and connector positions are minor implementation details.

## 7. Confirmed product-boundary language

Primary statement:

`Blotter is a recruiting-logistics layer that keeps your process organized. It does not teach technicals or write your outreach.`

Compact strip direction:

- No technical-prep content
- No generic mass AI outreach
- No AI slop

Supporting line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

This content should appear after the product has been explained positively, likely near the How It Works section rather than in the hero.

## 8. Exact next action

Specify Section 2, Scale: why manual recruiting trackers fall behind.

Resolve efficiently:

1. Which owner-supported recruiting-cycle figures appear.
2. The quantified time-savings figure and any necessary qualifier.
3. The section headline and concise explanatory argument.
4. The visual hierarchy of big numbers, supporting copy, and proof.
5. Whether one compact visual is needed to show Gmail and Calendar activity outpacing manual sheet upkeep.

Then proceed through the remaining sections, funnel screens, trust and FAQ copy, responsive constraints, and final Lovable implementation packet.

## 9. Workstream 3 constraints that remain fixed

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

## 10. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and the measurement period is frozen.

## 11. Required reading for a new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS4-SPEC.md`
4. `docs/workstreams/WS2-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/05-working-agreement.md`
7. `docs/03-page-spec.md` only as a working baseline after the durable specifications
8. `docs/06-assumptions-and-open-questions.md`

Then execute the exact next action. Do not reopen confirmed WS2, WS3, the WS4 narrative architecture, or the confirmed hero.