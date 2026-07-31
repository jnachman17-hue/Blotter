# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero, Section 2 Scale package, Section 3 How It Works package, Section 4 Outstanding Actions package, and Section 5 Preservation copy package are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: finish Section 5 by ratifying one simple preservation visual, then proceed to Section 6, Privacy and Permissions plus FAQ.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are durable truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen confirmed WS2, WS3, hero, or Sections 2 through 4 unless an implementation constraint genuinely breaks them.
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

### Accurate product promise

- The user keeps the existing Google Sheets workbook and underlying contact record.
- The user does not have to re-enter every contact.
- Blotter creates a standardized recruiting view within the same Google Sheets workflow.
- Blotter does not promise to preserve or append directly onto every user's exact custom column layout.
- Detailed field mapping, hidden columns, and setup mechanics should not dominate the landing page.

### Copy

- No eyebrow.
- Headline: `Keep the tracker you already built.`
- Supporting copy: `Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

### Reassurance strip

- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

### Labels and CTA

- `YOUR EXISTING TRACKER`
- `BLOTTER ADDS THE LIVE LAYER`
- No CTA in Section 5.

### Visual direction

The previously proposed detailed two-tab mapping diagram was rejected as too complex and too focused on migration mechanics.

The final visual should remain simple, Google Sheets-native, and conceptually show that the user's contact information remains theirs while Blotter supplies the standardized live recruiting layer. Prefer a simple left-right responsibility treatment over a literal technical diagram, but do not imply that Blotter can append cleanly to every arbitrary custom tracker layout.

## 5. Exact next action

1. Ratify one simple Section 5 visual treatment.
2. Proceed immediately to Section 6, Privacy and Permissions plus FAQ.
3. Continue through the closing section, funnel screens, responsive constraints, and final Lovable-ready implementation brief.

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