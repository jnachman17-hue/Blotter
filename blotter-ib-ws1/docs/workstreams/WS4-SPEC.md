# Workstream 4 Specification

Date last updated: July 30, 2026
Status: In progress
Workstream: Spreadsheet landing-page content and experience design

## Purpose

This file is the permanent cumulative record for Workstream 4. Update it in consolidated batches whenever Jon ratifies, rejects, supersedes, or materially revises a Workstream 4 decision.

`CURRENT-HANDOFF.md` is temporary resumption context and must not become the only record of confirmed design decisions.

## Objective

Produce a coherent, build-ready content and experience specification for the spreadsheet-native landing page before Lovable implementation.

The output should define what the page says, what it shows, how the story progresses, and how the confirmed Workstream 3 funnel is represented visually and verbally.

## Workstream boundary

Workstream 4 defines page narrative, copy, proof devices, hero and product demonstrations, funnel experience frames, action-focused view, Gmail and Calendar mechanism visualization, privacy and FAQ content, CTA placement, price and terminal-state copy, and responsive implementation constraints.

Workstream 4 does not begin Lovable implementation, design the standalone platform page, specify backend logic, design real OAuth architecture, create acquisition plans, or treat prototype features as commitments to build.

## Inherited constraints

The spreadsheet-native page must preserve the completed WS2 and WS3 decisions:

- the July audience is pre-decay and the page sells prevention;
- live recruiting activity outpaces manual spreadsheet upkeep;
- stale state produces loss of operational trust and missed actions;
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

Read `docs/workstreams/WS2-SPEC.md` and `docs/workstreams/WS3-SPEC.md` for the complete durable records.

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
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Three primary CTA placements are confirmed: hero, after product and action proof, and final section. All enter the same WS3 funnel.

## Confirmed hero

### Copy

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`
- Preserve `Your recruiting tracker, always current.` for the closing section.

### Communication hierarchy

The hero's dominant job is to communicate: `This is a recruiting spreadsheet that updates itself from actual recruiting activity.`

The visitor should understand, in order:

1. A smart recruiting spreadsheet stays current.
2. Gmail and Calendar activity update it automatically.
3. The student keeps contacts and static information while Blotter handles changing logistics.

### Composition

- Static-first design.
- Muted, partially visible stale Google Sheets-style tracker in the background, bleeding off an edge.
- Dominant Google Sheets-style Blotter tracker in the foreground.
- Small Gmail, Calendar, or Blotter timing chips connect activity to updated cells.
- Motion is optional and must not delay implementation.
- No bottom status legend.

Zone labels outside the sheet chrome:

- `YOU ADD THE CONTACTS`
- `BLOTTER KEEPS IT CURRENT`

Student-maintained columns:

1. Name
2. Title
3. Firm

Blotter-maintained columns:

1. Status
2. Next move
3. Last contact
4. Days
5. Call

Use Google Sheets-style dropdown chips for Status only. Gray denotes calm or inactive states, green denotes Replied, red denotes an action due, blue denotes a calendar event, and amber denotes a completed event with follow-through owed. Days turns red only when elapsed time creates an action.

Eight-row pattern:

1. Not contacted → Email Sarah
2. Sent → blank
3. Sent → blank
4. No reply → Bump thread
5. No reply → Bump thread
6. Replied → Reply to Marcus
7. Call scheduled → blank
8. Call completed → Thank Priya or equivalent

`Gone dead` and `Concluded` are excluded from the hero. Exact names, dates, firms, chip wording, and connector positions are implementation details.

Desktop uses copy and CTA beside the dominant spreadsheet composition. Mobile uses a cropped or simplified sheet rather than shrinking the full desktop table into illegibility.

## Confirmed product-boundary language

Primary statement:

`Blotter is a recruiting-logistics layer that keeps your process organized. It does not teach technicals or write your outreach.`

Compact strip:

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

Supporting line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

This should appear after the product has been explained positively, likely near How It Works rather than in the hero.

## Confirmed Section 2: Scale

### Purpose and argument

Section 2 establishes the structural mismatch between continuous recruiting activity and intermittent manual tracker upkeep.

The causal chain is:

`high recruiting volume → delayed or inconsistent manual upkeep → stale tracker → lost operational trust → missed actions`

The section should make clear that students eventually delay updates, forget details, become inconsistent, or stop maintaining the sheet as recruiting accelerates. The tracker then ceases to reflect reality. Once it is no longer a trustworthy system of record, the student must reconstruct the process from Gmail, Calendar, memory, and scattered notes, and follow-ups, thank-you notes, and next steps fall through the cracks.

### Ratified copy

Eyebrow:

`The scale of a recruiting cycle`

Headline:

`Your manual tracker was never built to keep up with this.`

Supporting argument:

`A serious recruiting cycle can generate hundreds of emails, dozens of coffee chats, applications, and overlapping interview rounds. Every reply, scheduled call, follow-up window, and completed conversation changes what needs to happen next.`

`But Gmail and Calendar record those changes continuously while your spreadsheet changes only when you stop and update it. As the process accelerates, updates get delayed, details are forgotten, and the tracker gradually falls out of sync with reality.`

Closing line:

`Once you stop trusting the tracker, you are back to reconstructing your process from Gmail, Calendar, memory, and scattered notes. That is when follow-ups, thank-you notes, and next steps begin falling through the cracks.`

The page implementation may shorten this copy for visual economy while preserving the full argument and causal chain.

### Case-study proof framing

The figures are drawn from a real, high-intensity recruiting case involving a successful Summer Analyst 2028 candidate who received a JPMorgan offer. They are not presented as an industry average.

Qualification direction:

`Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`

Use precise case-study counts rather than rounded averages. Current working figures are:

- `628` recruiting emails
- `55` coffee chats
- `19` applications
- `30` interview rounds

All four may be shown because applications broaden the section beyond networking alone. Final number verification and minor label wording may occur before implementation without reopening the section argument.

### Time-savings claim

A quantified time-savings claim remains confirmed, but the earlier 85-hour figure is rejected as too high for the page.

The claim must be applied specifically to the same JPMorgan-offer case study, not generalized as an industry average or guarantee. The methodology should remain visually minor and need not show the arithmetic on the website.

Methodology direction:

`Estimated from the manual work required in this recruiting cycle to transfer relevant Gmail activity into the tracker, maintain relationship status and next actions, reconcile scheduled and completed calls from Calendar, and periodically audit the sheet against both systems.`

The estimate excludes time spent writing emails, preparing for conversations, conducting calls, and interviewing.

Exact reduced hour figure remains to be settled. A conservative working range is approximately 50 to 65 hours, with approximately 60 hours the current recommended center point.

### Ratified visual treatment

Use a clean two-level composition:

1. Four large case-study figures in one row or compact grid.
2. One compact divergence visual beneath them.

The divergence visual uses:

- Left title: `WHAT ACTUALLY HAPPENED`
- Right title: `WHAT MADE IT INTO THE MANUAL TRACKER`

The left side shows a continuous sequence of Gmail and Calendar events. The right side shows sparse, delayed, and incomplete manual update markers. The widening space represents the manual-update gap.

The final state may show Gmail and Calendar as current while the manual tracker is incomplete and several days behind.

The time-savings statement appears as a subordinate proof block beneath or beside the divergence visual, with a small methodology qualifier. It is not treated as an equal fifth volume statistic.

No CTA appears in Section 2. The section flows directly into How It Works.

## Remaining unresolved decisions

1. Exact reduced time-savings figure within the conservative range.
2. Final verification of the precise case-study counts and minor labels.
3. Exact action-focused grouping, sorting, filtering, or summary view.
4. Exact copy and proof for Sections 3 through 7.
5. Exact funnel product-experience frames and click sequence.
6. Whether the funnel experience reuses or extends the hero visual.
7. Exact privacy, permissions, provider, verification, and FAQ wording.
8. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
9. Final responsive priorities across the whole page.
10. Exact domain routing and Lovable custom-domain implementation.
11. Minor hero implementation details.

## Exact next action

Settle the reduced time-savings figure and any final case-study number corrections, then proceed immediately to Section 3, How It Works.

Do not reopen the confirmed hero, completed WS2 or WS3 decisions, or the ratified Section 2 argument and visual treatment unless an implementation constraint genuinely breaks them. Avoid backend-level product granularity. The page is a market-validation prototype and needs coherent, attractive, credible test-resolution details.