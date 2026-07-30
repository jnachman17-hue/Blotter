# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The high-level positioning, brand direction, page narrative, section sequence, CTA placement architecture, and static-first hero direction are now confirmed.

Exact next action: define the hero specification at build-brief resolution.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are the durable source of truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `docs/workstreams/WS2-SPEC.md` and `docs/workstreams/WS3-SPEC.md` are completed durable inputs.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Confirmed decisions should be consolidated into the active workstream specification in related batches.
- Follow `docs/05-working-agreement.md`, while preserving speed and avoiding unnecessary documentation churn.

## 3. Confirmed Workstream 4 decisions

### Audience and positioning

- Displayed product name: `Blotter`.
- Positioning direction: `The smart recruiting tracker for investment banking and high-finance networking.`
- Supporting workflow language must establish high-volume outreach, coffee chats, follow-ups, and interviews behind competitive finance recruiting.
- Marketing may cast a broad high-finance net.
- Recruiting track is captured through the existing Workstream 3 onboarding question.
- Round one remains a spreadsheet-versus-platform test, not an audience-positioning test.

### Brand and domain

- Both variants display the same `Blotter` brand.
- The owned domain `blotterib.com` will be used.
- Variant routing should use paths or subdomains under the same parent domain where feasible.
- Exact Lovable custom-domain and routing implementation belongs to Workstream 5.

### Confirmed seven-section page sequence

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

### CTA architecture

Three primary CTA placements are confirmed:

1. Hero.
2. After product and action proof.
3. Final section.

All enter the same canonical Workstream 3 funnel and use `cta_location` for origin tracking. Exact visible wording remains open.

### Hero direction

- Hero job: communicate that this is a recruiting spreadsheet that updates itself from actual recruiting activity.
- Static design comes first. Motion is optional later and must not delay implementation.
- Background: muted, partially visible ordinary Google Sheets-style tracker bleeding off an edge.
- Foreground: dominant, convincingly Google Sheets-style Blotter tracker.
- Student-maintained columns appear on the left; Blotter-maintained live state and action columns appear on the right.
- Gmail and Calendar notification chips connect recruiting events to updated spreadsheet cells.
- A recreated Gmail inbox or Calendar interface is not required.
- The previously separate event-to-row section is merged into the broader How It Works section to avoid repetition.

### Authority and claims

- Jon confirmed he is a former Goldman Sachs banker.
- A truthful former-Goldman credential will appear.
- A quantified time-savings claim based on Jon's calculated model will appear.
- Exact wording, figure, placement, and qualifier remain open.

## 4. Exact next action

Define the hero specification at build-brief resolution.

Settle:

1. Headline argument and copy direction.
2. Subhead job and mechanism detail.
3. CTA wording direction.
4. Goldman credential placement.
5. Time-savings proof placement, if used in the hero.
6. Foreground spreadsheet content architecture.
7. Background tracker treatment.
8. Gmail and Calendar event-chip examples and connector logic.
9. Desktop composition.
10. Mobile simplification.

Then proceed through the remaining six section specifications, the funnel screens, trust and FAQ copy, responsive constraints, and the final Lovable implementation packet.

## 5. Workstream 3 constraints that remain fixed

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

## 6. Build and deployment state

- No Lovable project exists yet.
- No reusable production code exists.
- No completed landing-page assets exist.
- No public traffic should launch before both matched pages are ready, analytics are verified by hand, and the measurement period is frozen.

## 7. Files updated in the latest decision batch

- `docs/workstreams/WS4-SPEC.md`
- `docs/06-assumptions-and-open-questions.md`
- `docs/04-decision-log.md`
- `docs/CURRENT-HANDOFF.md`

## 8. Required reading for a new chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/WS4-SPEC.md`
4. `docs/workstreams/WS2-SPEC.md`
5. `docs/workstreams/WS3-SPEC.md`
6. `docs/05-working-agreement.md`
7. `docs/03-page-spec.md` only as a working baseline after the durable specifications
8. `docs/06-assumptions-and-open-questions.md`

Then execute the exact next action. Do not reopen confirmed WS2, WS3, or the confirmed WS4 narrative decisions and do not begin Lovable implementation before the build-ready specification is complete.