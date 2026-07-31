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
5. Preservation: keep the spreadsheet and structure already in use.
6. Privacy and permissions, plus FAQ.
7. Concise closing summary and CTA.

Three primary CTA placements are confirmed: hero, after product and action proof, and final section. All enter the same WS3 funnel.

## Confirmed page-rhythm rule

The seven sections should not repeat one identical eyebrow, headline, supporting paragraph, and closing-line template. Copy hierarchy and visual density should vary by section while preserving a coherent design system. Some sections may use a headline plus diagram, some may use proof figures, comparison blocks, FAQ rows, or a concise closing statement. Repetition should be controlled during Lovable implementation.

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

Eyebrow:

`The scale of a recruiting cycle`

Headline:

`Your manual tracker was never built to keep up with this.`

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

### Purpose

Section 3 explains the operating model after Section 2 establishes the manual-update problem. It should answer: `What does Blotter actually do after I connect it?`

The section should explain the causal system at landing-page-test resolution without backend architecture, provider details, detailed status rules, follow-up thresholds, or setup edge cases.

### Ratified copy

Eyebrow:

`How Blotter works`

Headline:

`You manage the relationships. Blotter maintains the moving parts.`

Supporting copy:

`Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.`

Closing line:

`You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

Use `uses relevant activity from Gmail and Calendar` rather than broader language implying unrestricted inbox access.

### Ratified causal visual

Use one three-stage system:

1. Gmail and Calendar as the live sources of recruiting activity.
2. Blotter as the orchestration layer that maintains changing relationship state.
3. The user's existing Google Sheet as the current operating record.

Core visual sequence:

`Gmail + Calendar → Blotter → Your Google Sheet`

Stage labels:

- `RECRUITING HAPPENS HERE`
- `BLOTTER KEEPS IT CURRENT`
- `YOUR TRACKER STAYS CURRENT`

Representative activity examples may include:

- reply received;
- call scheduled;
- coffee chat completed;
- follow-up window reached.

The visual should use a smaller crop of maintained fields rather than repeat the complete hero spreadsheet. Desktop may use a horizontal system. Mobile stacks the three stages vertically with directional continuity.

### Ratified division of labor

Use one compact two-column comparison below or beside the causal visual.

`YOU CONTROL`

- `Who you network with and contact`
- `The outreach and replies you write`
- `Your notes and relationship context`

`BLOTTER MAINTAINS`

- `Contact status`
- `Last contact and timing`
- `Scheduled calls and next actions`

The wording should make clear that the student retains judgment, targeting, and communication while Blotter handles repetitive logistics upkeep.

### Product-boundary treatment

Place the already confirmed product-boundary strip at the bottom of Section 3, after the positive mechanism explanation.

Recommended hierarchy:

1. Main supporting line: `You choose the people and write the messages. Blotter keeps the logistics current.`
2. Small badges: `No technical-prep content`, `No generic mass AI outreach`, `No AI slop`.
3. Use the longer primary boundary statement only if the section has sufficient room or move it to FAQ.

No CTA appears in Section 3. The next CTA remains after the product and action proof, following Section 4.

## Remaining unresolved decisions

1. Final verification of precise Section 2 case-study counts and minor labels.
2. Exact Section 4 action-focused view, copy, and visual treatment.
3. Exact copy and proof for Sections 5 through 7.
4. Exact funnel product-experience frames and click sequence.
5. Whether the funnel experience reuses or extends the hero visual.
6. Exact privacy, permissions, provider, verification, and FAQ wording.
7. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
8. Final responsive priorities across the whole page.
9. Exact domain routing and Lovable custom-domain implementation.
10. Minor hero and Section 3 implementation details.

## Exact next action

Specify Section 4, Action View: know what needs to happen today. Settle efficiently:

- the section's communication job and copy;
- the exact action-focused view shown;
- whether the view uses grouped queues, filters, sorting, a separate sheet tab, or another simple treatment;
- the representative actions and visual hierarchy;
- the placement and wording of the second primary CTA after the product and action proof.

Do not reopen completed WS2, WS3, the hero, Section 2, or the confirmed Section 3 system unless an implementation constraint genuinely breaks them. Avoid backend-level product granularity.