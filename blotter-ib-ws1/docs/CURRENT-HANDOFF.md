# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero, Section 2 Scale package, and Section 3 How It Works package are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 4, Action View: know what needs to happen today.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are durable truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen confirmed WS2, WS3, hero, Section 2, or Section 3 decisions unless an implementation constraint genuinely breaks them.
- Work at landing-page-test resolution and avoid backend-level edge-case analysis.

## 3. Confirmed page sequence

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Primary CTA placements: hero, after Section 4 product and action proof, and final section.

## 4. Confirmed page-rhythm rule

Do not force every section into an identical eyebrow, headline, supporting paragraph, and closing-line template. Vary copy hierarchy and visual density by communication job while maintaining one coherent design system.

## 5. Confirmed Section 2: Scale

- Eyebrow: `The scale of a recruiting cycle`
- Headline: `Your manual tracker was never built to keep up with this.`
- Argument: continuous Gmail and Calendar activity outpaces intermittent manual tracker upkeep, causing stale state, lost trust, and missed actions.
- Case-study qualification: `Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`
- Figures: 628 recruiting emails, 55 coffee chats, 19 applications, 30 interview rounds.
- Time claim: `Save approximately 60 hours of manual tracker administration over one recruiting cycle.`
- Methodology: `Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.`
- Divergence titles: `WHAT ACTUALLY HAPPENED` and `WHAT MADE IT INTO THE MANUAL TRACKER`.
- No CTA.

## 6. Confirmed Section 3: How It Works

### Copy

- Eyebrow: `How Blotter works`
- Headline: `You manage the relationships. Blotter maintains the moving parts.`
- Supporting copy: `Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.`
- Closing line: `You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

### Causal visual

`Gmail + Calendar → Blotter → Your Google Sheet`

Stage labels:

- `RECRUITING HAPPENS HERE`
- `BLOTTER KEEPS IT CURRENT`
- `YOUR TRACKER STAYS CURRENT`

Representative events: reply received, call scheduled, coffee chat completed, and follow-up window reached.

Use a smaller maintained-fields crop rather than repeat the full hero. Desktop may be horizontal; mobile stacks vertically.

### Division of labor

`YOU CONTROL`

- Who you network with and contact
- The outreach and replies you write
- Your notes and relationship context

`BLOTTER MAINTAINS`

- Contact status
- Last contact and timing
- Scheduled calls and next actions

### Product boundary

Place the product-boundary treatment at the bottom of Section 3 after the positive explanation.

Main line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

Small badges:

- No technical-prep content
- No generic mass AI outreach
- No AI slop

The longer logistics-layer statement may move to FAQ if the section is crowded. No CTA appears in Section 3.

## 7. Exact next action

Specify Section 4 efficiently as one ratification package. Settle:

1. The communication job and copy.
2. The exact action-focused view shown.
3. Whether it uses grouped queues, filters, sorting, a separate tab, or another simple treatment.
4. Representative actions and visual hierarchy.
5. The placement and wording of the second primary CTA after the product and action proof.

Then continue through Preservation, Privacy and FAQ, closing section, funnel screens, responsive constraints, and the final Lovable-ready implementation brief.

## 8. Fixed WS3 constraints

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout shows payment choices without card entry or payment collection.
- The terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces use the same funnel, price, event set, and measurement rules.

## 9. Build state

- No Lovable project exists yet.
- No reusable production code or completed landing-page assets exist.
- No public traffic launches before both pages are ready, analytics are manually verified, and the measurement period is frozen.