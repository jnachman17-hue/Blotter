# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero, Section 2 Scale package, Section 3 How It Works package, and Section 4 Outstanding Actions package are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 5, Preservation: keep the spreadsheet and structure already in use.

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
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Primary CTA placements: hero, after Section 4 product and action proof, and final section.

## 4. Confirmed Section 4: Outstanding Actions

### Copy

- No eyebrow.
- Headline: `Know exactly what needs your attention.`
- Supporting line: `Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.`
- CTA block line: `Open your tracker and know what to do next.`
- CTA button: `See how Blotter works`

### Google Sheets-native visual

- Use one persistent area titled `Outstanding actions`, not a `Today` tab.
- Show `21 outstanding actions` using a merged summary cell, compact header band, or another Google Sheets-native treatment rather than a floating dashboard card.
- Group the workload into:
  - Replies owed: 6
  - Follow-ups due: 11
  - Thank-you notes: 4
- Show two readable rows per group.
- Beneath each group show muted overflow:
  - `+4 more replies owed`
  - `+9 more follow-ups due`
  - `+2 more thank-you notes`
- Counts and overflow should use native-looking sheet conventions such as section-header rows, subtle fills, grouped ranges, or muted summary rows.

### Row structure

Columns:

1. Contact
2. Next action
3. Why it is here

Representative rows:

- Marcus Lee | Reply to Marcus | Marcus replied 2 hours ago
- Daniel Kim | Reply to Daniel | Daniel replied yesterday
- Sarah Chen | Bump thread | No reply for 6 days
- Alex Morgan | Bump thread | No reply for 8 days
- Priya Shah | Send thank-you | Coffee chat completed yesterday
- James Wu | Send thank-you | Call completed 3 hours ago

The six visible rows explain the product. Counts and muted overflow communicate high volume. Do not render dozens of rows merely to prove scale.

The CTA remains after Section 4 and enters the canonical WS3 funnel with its own `cta_location`.

## 5. Exact next action

Specify Section 5, Preservation, as one compact ratification package. Settle:

1. The communication job and copy.
2. How the page proves that Blotter works with the user's existing Google Sheet rather than requiring a rebuild.
3. The visual treatment for preserving contacts, notes, custom columns, and familiar workflow.
4. Whether setup reassurance is needed.
5. How Section 5 transitions into privacy and permissions.

Then continue through Privacy and FAQ, closing section, funnel screens, responsive constraints, and the final Lovable-ready implementation brief.

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