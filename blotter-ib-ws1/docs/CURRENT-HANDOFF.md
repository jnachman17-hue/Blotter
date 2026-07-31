# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero, Section 2 Scale package, Section 3 How It Works package, Section 4 Outstanding Actions package, and Section 5 Preservation package are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 6, Privacy and Permissions plus FAQ.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are durable truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen confirmed WS2, WS3, hero, or Sections 2 through 5 unless an implementation constraint genuinely breaks them.
- Work at landing-page-test resolution and avoid backend-level edge-case analysis.

## 3. Confirmed page sequence

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the existing Google Sheets workbook and contact record while Blotter creates a standardized live recruiting view.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Primary CTA placements: hero, after Section 4 product and action proof, and final section.

## 4. Confirmed Section 5: Preservation

### Copy

- No eyebrow.
- Headline: `Keep the tracker you already built.`
- Supporting copy: `Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

### Reassurance strip

- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

### Visual

Use one simple Google Sheets-native crop with a left-right division of responsibility.

`YOUR EXISTING TRACKER`

Visible columns:

1. Name
2. Title
3. Firm
4. Email
5. LinkedIn

Do not show Group or Notes.

`BLOTTER ADDS THE LIVE LAYER`

Visible columns:

1. Status
2. Next move
3. Last contact
4. Days
5. Call

Use a clear divider. The visual is conceptual and should not imply that Blotter literally appends to every arbitrary custom layout. The supporting copy carries the accurate new-tab implementation model.

No CTA appears in Section 5. Section 5 is closed.

## 5. Exact next action

Specify Section 6 as one compact ratification package. Settle:

1. The main privacy and trust statement.
2. How Gmail and Calendar access is described.
3. What Blotter explicitly does not do with user data.
4. The FAQ questions and concise answers.
5. The section's visual hierarchy and whether any trust marks or permission diagrams are needed.

Then continue through the closing section, funnel screens, responsive constraints, and final Lovable-ready implementation brief.

## 6. Fixed WS3 constraints

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout shows payment choices without card entry or payment collection.
- The terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces use the same funnel, price, event set, and measurement rules.

## 7. Build state

- No Lovable project exists yet.
- No reusable production code or completed landing-page assets exist.
- No public traffic launches before both pages are ready, analytics are manually verified, and the measurement period is frozen.