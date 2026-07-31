# Workstream 4 Specification

Date last updated: July 30, 2026
Status: In progress
Workstream: Spreadsheet landing-page content and experience design

## Purpose

This is the permanent cumulative record for Workstream 4. `CURRENT-HANDOFF.md` is temporary resumption context and must not become the only record of confirmed decisions.

## Objective and boundary

Produce a coherent, build-ready content and experience specification for the spreadsheet-native landing page before Lovable implementation.

Workstream 4 defines page narrative, copy, proof devices, hero and product demonstrations, funnel experience frames, action-focused view, Gmail and Calendar mechanism visualization, privacy and FAQ content, CTA placement, price and terminal-state copy, and responsive implementation constraints.

It does not begin Lovable implementation, design the standalone platform page, specify backend logic, design real OAuth architecture, create acquisition plans, or treat prototype features as commitments to build.

## Inherited constraints

The page must preserve completed WS2 and WS3 decisions:

- the July audience is pre-decay and the page sells prevention;
- live recruiting activity outpaces manual spreadsheet upkeep;
- stale state produces lost operational trust and missed actions;
- the student maintains contacts and static information;
- Blotter maintains changing activity from relevant Gmail and Calendar signals;
- the core outcome is one accurate, current source of truth;
- adoption preserves the student's existing tracker and requires minimal switching;
- Blotter is a recruiting-logistics layer, not contact discovery, scraping, mass outreach, AI writing, technical preparation, learning content, or a jobs board;
- all primary CTAs enter the same canonical WS3 funnel and store `cta_location`;
- two recruiting-configuration questions precede one 15 to 20 second product experience;
- email capture is transparent and does not imitate OAuth;
- Gmail, Sheets, and Calendar remain visible as the product engine;
- price appears only after email capture and is $9.99 per month, monthly, cancel anytime;
- checkout includes payment-choice buttons without card entry or payment collection;
- the terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort;
- both surfaces ultimately use the same funnel, price, event set, and measurement rules.

## Confirmed audience, brand, and domain

- Displayed product name: `Blotter`.
- Category line: `The smart recruiting tracker for investment banking and high-finance networking.`
- Marketing may cast a broader competitive-finance net while investment banking remains the clearest wedge.
- Recruiting track is captured through the existing WS3 onboarding question.
- Both surface variants display the same Blotter brand.
- The owned domain `blotterib.com` will be used.
- Exact path or subdomain routing belongs to Workstream 5.

## Confirmed seven-section narrative

1. Hero: the smart tracker that updates itself.
2. Scale: why manual recruiting trackers fall behind.
3. How it works: the student maintains contacts; Blotter maintains changing activity.
4. Action view: know what needs to happen today.
5. Preservation: keep the spreadsheet and underlying contact record already in use while Blotter creates a standardized live view.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Primary CTA placements are the hero, after Section 4 product and action proof, and the final section. All enter the same WS3 funnel.

## Confirmed page-rhythm rule

The seven sections should not repeat one identical eyebrow, headline, supporting paragraph, and closing-line template. Copy hierarchy and visual density should vary by section while preserving a coherent design system.

## Confirmed hero

### Copy

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`
- Preserve `Your recruiting tracker, always current.` for the closing section.

### Composition

- Static-first design.
- Muted stale Google Sheets-style tracker behind a dominant Blotter-maintained sheet.
- Gmail, Calendar, or Blotter activity chips connect to updated cells.
- Student-maintained columns: Name, Title, Firm.
- Blotter-maintained columns: Status, Next move, Last contact, Days, Call.
- Motion is optional and must not delay implementation.
- Mobile uses a cropped or simplified sheet rather than shrinking the full desktop table.

## Confirmed product-boundary language

Primary statement:

`Blotter is a recruiting-logistics layer that keeps your process organized. It does not teach technicals or write your outreach.`

Compact strip:

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

Supporting line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

The compact strip is placed in Section 3 after the product mechanism has been explained positively. The supporting line carries the main emphasis. The longer primary statement may be used as secondary copy or later FAQ language if the section becomes crowded.

## Confirmed Section 2: Scale

### Copy

Eyebrow: `The scale of a recruiting cycle`

Headline: `Your manual tracker was never built to keep up with this.`

Supporting argument:

`A serious recruiting cycle can generate hundreds of emails, dozens of coffee chats, applications, and overlapping interview rounds. Every reply, scheduled call, follow-up window, and completed conversation changes what needs to happen next.`

`But Gmail and Calendar record those changes continuously while your spreadsheet changes only when you stop and update it. As the process accelerates, updates get delayed, details are forgotten, and the tracker gradually falls out of sync with reality.`

Closing line:

`Once you stop trusting the tracker, you are back to reconstructing your process from Gmail, Calendar, memory, and scattered notes. That is when follow-ups, thank-you notes, and next steps begin falling through the cracks.`

The page implementation may shorten this copy while preserving the full argument.

### Case-study proof

Qualification:

`Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`

Figures:

- `628` recruiting emails
- `55` coffee chats
- `19` applications
- `30` interview rounds

Time-savings claim:

`Save approximately 60 hours of manual tracker administration over one recruiting cycle.`

Methodology line:

`Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.`

### Visual treatment

Use four large case-study figures followed by one compact divergence visual.

Titles:

- `WHAT ACTUALLY HAPPENED`
- `WHAT MADE IT INTO THE MANUAL TRACKER`

The left side shows continuous Gmail and Calendar events. The right side shows sparse, delayed, and incomplete manual updates. The 60-hour claim is subordinate. No CTA appears in Section 2.

## Confirmed Section 3: How It Works

### Copy

Eyebrow: `How Blotter works`

Headline: `You manage the relationships. Blotter maintains the moving parts.`

Supporting copy:

`Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.`

Closing line:

`You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

### Causal visual

Use one three-stage system:

`Gmail + Calendar → Blotter → Your Google Sheet`

Stage labels:

- `RECRUITING HAPPENS HERE`
- `BLOTTER KEEPS IT CURRENT`
- `YOUR TRACKER STAYS CURRENT`

Representative activity examples may include reply received, call scheduled, coffee chat completed, and follow-up window reached. Use a smaller maintained-fields crop rather than repeat the complete hero spreadsheet. Desktop may use a horizontal system. Mobile stacks the three stages vertically.

### Division of labor

`YOU CONTROL`

- `Who you network with and contact`
- `The outreach and replies you write`
- `Your notes and relationship context`

`BLOTTER MAINTAINS`

- `Contact status`
- `Last contact and timing`
- `Scheduled calls and next actions`

### Product-boundary treatment

Place the confirmed product-boundary treatment at the bottom of Section 3 after the positive mechanism explanation.

Main line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

Small badges:

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

No CTA appears in Section 3.

## Confirmed Section 4: Outstanding Actions

### Communication job

Section 4 proves the daily operational outcome of the maintained tracker. It should communicate that the user no longer has to reconstruct current obligations from Gmail, Calendar, memory, and a stale spreadsheet. Blotter provides one current action view.

The visual must communicate a high-volume workload without forcing the visitor to process a high volume of rows. Workload size is communicated through counts and muted overflow; product comprehension is communicated through a small number of readable examples.

### Ratified copy

No eyebrow.

Headline: `Know exactly what needs your attention.`

Supporting line:

`Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.`

CTA block line: `Open your tracker and know what to do next.`

CTA button: `See how Blotter works`

The CTA appears after Section 4, not in Section 3, and enters the canonical WS3 funnel with its own `cta_location`.

### Ratified Google Sheets-native visual

Use one persistent action area titled `Outstanding actions`, not a `Today` tab.

Show `21 outstanding actions` using a merged summary cell, compact header band, or another Google Sheets-native treatment rather than a floating dashboard card.

Use three grouped queues:

1. `Replies owed` with count `6`
2. `Follow-ups due` with count `11`
3. `Thank-you notes` with count `4`

Each queue shows two representative rows and a muted overflow line:

- `+4 more replies owed`
- `+9 more follow-ups due`
- `+2 more thank-you notes`

Use three columns: Contact, Next action, and Why it is here. The six visible rows explain the product. Counts and muted overflow communicate high volume. Do not render dozens of full records merely to prove scale.

## Confirmed Section 5: Preservation

### Communication job

Section 5 resolves the adoption objection without turning the page into a setup or migration explanation.

The accurate promise is:

- the user keeps the existing Google Sheets workbook and underlying contact record;
- the user does not have to re-enter every contact;
- Blotter creates a standardized recruiting view within the same Google Sheets workflow;
- Blotter does not promise to preserve or append directly onto every user's exact custom column layout.

The section should emphasize continuity and low switching cost. Detailed field mapping, tab creation, hidden support columns, and setup mechanics are implementation details and should not dominate the landing-page visual.

### Ratified copy

No eyebrow.

Headline:

`Keep the tracker you already built.`

Supporting copy:

`Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

### Ratified reassurance strip

- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

### Ratified labels and CTA rule

Visual labels:

- `YOUR EXISTING TRACKER`
- `BLOTTER ADDS THE LIVE LAYER`

No CTA appears in Section 5.

### Visual direction still being refined

The earlier detailed two-tab mapping diagram is rejected as too complex and too focused on setup mechanics for the landing page.

The final visual should remain simple, Google Sheets-native, and conceptually show that the user's contact information remains theirs while Blotter supplies the standardized live recruiting layer. It should not require the visitor to understand field mapping, scrolling behavior, hidden columns, or migration logic.

A simple left-right division of responsibility is preferred over a literal technical diagram, provided the copy remains accurate and does not imply that Blotter appends cleanly to every arbitrary tracker layout.

## Remaining unresolved decisions

1. Final verification of precise Section 2 case-study counts and minor labels.
2. Final simple visual treatment for Section 5.
3. Exact copy and visual treatment for Sections 6 and 7.
4. Exact funnel product-experience frames and click sequence.
5. Whether the funnel experience reuses or extends the hero visual.
6. Exact privacy, permissions, provider, verification, and FAQ wording.
7. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
8. Final responsive priorities across the whole page.
9. Exact domain routing and Lovable custom-domain implementation.
10. Minor implementation details for the confirmed sections.

## Exact next action

Finish Section 5 by ratifying one simple preservation visual that communicates low switching cost without explaining setup mechanics. Then proceed immediately to Section 6, Privacy and Permissions plus FAQ.

Do not reopen completed WS2, WS3, the hero, or confirmed Sections 2 through 4 unless an implementation constraint genuinely breaks them. Avoid backend-level product granularity.