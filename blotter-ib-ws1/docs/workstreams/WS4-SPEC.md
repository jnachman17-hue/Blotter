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

Workstream 4 should define:

- page narrative and section sequence;
- headline, subhead, and supporting copy;
- recruiting-volume statistics and proof devices;
- hero composition and before-versus-after treatment;
- spreadsheet product demonstration and supporting product visuals;
- exact funnel product-experience frames and clicks;
- relationship between the main hero and funnel experience;
- action-focused-view representation;
- Gmail, Sheets, and Calendar mechanism visualization;
- privacy, permissions, trust, and FAQ content;
- exact CTA wording and placement;
- price, checkout, and terminal-state copy;
- responsive content priorities and implementation constraints needed by Workstream 5.

Workstream 4 should not:

- begin Lovable implementation;
- design the standalone platform page;
- specify backend product logic;
- design real OAuth or integration architecture;
- create paid acquisition plans;
- treat prototype features as commitments to build.

## Inherited Workstream 2 proposition constraints

The spreadsheet-native page must preserve:

- the July audience is pre-decay and the page sells prevention;
- live recruiting activity outpaces manual spreadsheet upkeep;
- the consequence is stale state and loss of operational trust;
- the student owns contacts and static information;
- Blotter maintains changing activity from relevant Gmail and Calendar signals;
- the core outcome is one accurate, current source of truth;
- primary benefits are accuracy, time saved, everything in one place, and prevention of slippage;
- the visible offer includes automatic activity capture, legible relationship state, next-action visibility, an action-focused view, and one spreadsheet workflow;
- adoption preserves the student's existing tracker and requires minimal switching;
- Blotter is not contact discovery, LinkedIn scraping, mass outreach, AI writing, technical preparation, learning content, or a jobs board;
- exact interface details should be chosen only to communicate the proposition credibly at test resolution.

Read `docs/workstreams/WS2-SPEC.md` for the complete proposition record.

## Inherited Workstream 3 funnel and measurement constraints

The page and funnel must preserve:

- all primary CTAs enter one canonical funnel;
- CTA origin is stored through `cta_location`;
- two recruiting-configuration questions precede the product experience;
- one concise surface-specific product experience occurs before email capture;
- the experience lasts approximately 15 to 20 seconds maximum;
- click-to-progress is the working model and animation is not required;
- email capture is transparent and does not imitate OAuth;
- Gmail, Sheets, and Calendar remain visible as the engine maintaining live recruiting state;
- price appears only inside the funnel after email capture;
- the round-one price is $9.99 per month, monthly, cancel anytime;
- there is no annual plan, discount, plan selection, or price test;
- checkout progresses to payment-choice buttons without card entry or payment collection;
- `payment_option_clicked` is the strongest commercial-demand action;
- the terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort;
- both spreadsheet and platform surfaces ultimately use the same funnel, price, event set, and measurement rules;
- material changes during a measurement period create a new labeled test iteration.

Read `docs/workstreams/WS3-SPEC.md` for the complete conversion and measurement record.

## Confirmed audience and positioning hierarchy

The landing page will intentionally cast a wider acquisition net than investment banking alone while retaining investment banking as the product's clearest wedge and source workflow.

### Brand and category level

- Displayed product name: `Blotter`.
- Confirmed category line: `The smart recruiting tracker for investment banking and high-finance networking.`
- Investment banking remains explicit rather than being removed entirely.
- The page may market broadly across competitive finance recruiting because the core networking, outreach, follow-up, coffee-chat, interview, and tracker-maintenance workflow is materially similar across the targeted paths.

### Workflow clarification

Supporting language should establish that Blotter is built around the high-volume outreach, coffee chats, follow-ups, and interviews behind competitive finance recruiting.

### Funnel segmentation

The broad audience is segmented inside the existing Workstream 3 onboarding sequence through the ratified recruiting-track question. The page does not need separate audience-specific funnels.

Test readouts should preserve the ability to inspect performance by recruiting track, including the investment-banking cohort, while the round-one macro test remains spreadsheet versus platform rather than an audience-positioning test.

## Confirmed brand and domain direction

- Both variants display the same `Blotter` brand.
- The owned domain `blotterib.com` will be used.
- The URL may retain `IB` even though the displayed brand is broader.
- Spreadsheet and platform variants must not use different displayed names.
- The preferred routing direction is one parent domain with distinct paths or subdomains, subject to Workstream 5 implementation feasibility.
- Candidate structures include `blotterib.com/sheet` and `blotterib.com/platform`, or equivalent subdomains under the same parent domain.
- Exact routing, deployment, and Lovable custom-domain configuration are Workstream 5 implementation decisions.

## Confirmed narrative architecture

The page shows the product first, then explains why it matters and how it works. It should not require the visitor to study a long problem exposition before seeing the solution.

The confirmed seven-section sequence is:

1. **Hero: the smart tracker that updates itself.** Show the spreadsheet-native product immediately, establish that it stays current from real recruiting activity, distinguish it from cosmetic spreadsheet cleanup, and provide the primary CTA.
2. **Scale: why manual recruiting trackers fall behind.** Establish recruiting volume and concurrency, explain that Gmail and Calendar activity changes continuously while a manual sheet changes only when the student updates it, and use figures and visual proof to make the burden concrete.
3. **How it works: you maintain contacts; Blotter maintains changing activity.** Explain the division of labor and show Gmail, Calendar, Blotter, and Google Sheets as one causal system.
4. **Action view: know what needs to happen today.** Show that maintained state becomes a usable daily action system through grouping, sorting, filtering, or another action-focused treatment.
5. **Preservation: keep the spreadsheet and structure already in use.** Communicate low switching cost and show that Blotter adds and maintains the live activity layer rather than forcing a rebuild.
6. **Privacy and permissions.** Explain restricted Gmail and Calendar use in simple terms and resolve trust objections through concise explanation and FAQ content.
7. **Closing summary and CTA.** Restate one current source of truth, less manual upkeep, and clear next actions without adding another major visual.

## Confirmed CTA architecture

Three primary CTA placements are approved:

1. Hero CTA.
2. CTA after the product and action proof.
3. Final CTA after trust and objections are resolved.

All three enter the same Workstream 3 funnel and store origin through `cta_location`.

## Confirmed hero communication hierarchy

The hero has one dominant communication job:

`This is a recruiting spreadsheet that updates itself from actual recruiting activity.`

The comprehension hierarchy is:

1. First impression: a smart recruiting spreadsheet that stays current.
2. Next layer: Gmail and Calendar activity update the spreadsheet automatically.
3. Deeper layer: the student keeps contacts and static information while Blotter handles changing logistics.

The hero should not attempt to communicate every page benefit with equal weight.

## Confirmed hero copy

### Eyebrow

`The smart recruiting tracker for investment banking and high-finance networking`

### Headline

`Your networking keeps moving. Your tracker does not.`

### Subhead

`Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`

### Primary CTA

`See how Blotter works`

### Authority line

`Built by a former Goldman Sachs banker for recruitment.`

The authority line should appear in small supporting text near or below the CTA and should not dominate the hero.

### Closing-language preservation

`Your recruiting tracker, always current.` is preserved for the closing section rather than used as the hero headline.

## Confirmed product-boundary language

Primary statement:

`Blotter is a recruiting-logistics layer that keeps your process organized. It does not teach technicals or write your outreach.`

Compact boundary strip direction:

- `No technical-prep content`
- `No generic mass AI outreach`
- `No AI slop`

Supporting line:

`You choose the people and write the messages. Blotter keeps the logistics current.`

The exact visual placement of the strip remains open, but it should not burden the hero. It is expected near the How It Works section or another supporting area after the product has been explained positively.

## Confirmed static-first hero composition

The hero will be designed statically first. Motion may be added later only if it materially improves comprehension.

### Background layer

- partially visible ordinary Google Sheets-style recruiting tracker;
- muted, lower opacity, visually subordinate, and bleeding off an edge;
- uses the same contact names as the foreground tracker where possible;
- contains plausible stale fields, blanks, long notes, and inconsistent formatting;
- may visibly conflict with one current activity notification to demonstrate staleness;
- imperfect without becoming implausibly chaotic;
- used for recognition and contrast, not as a full equal before-and-after panel.

### Foreground layer

- dominant Google Sheets-style Blotter tracker;
- convincingly recreates Google Sheets chrome and spreadsheet behavior because the product lives in Sheets;
- split by a clear vertical divider into student-maintained and Blotter-maintained zones;
- representative rows show current relationship state and next actions;
- no bottom status legend.

### Zone labels

- Left: `YOU ADD THE CONTACTS`
- Right: `BLOTTER KEEPS IT CURRENT`

These are marketing annotations outside the Google Sheets chrome, not cells inside the spreadsheet.

### Student-maintained columns

Confirmed left-side order:

1. Name
2. Title
3. Firm

Other real-product fields such as email, group, location, LinkedIn, notes, and source are intentionally hidden from the hero for visual clarity.

### Blotter-maintained columns

Confirmed right-side order:

1. Status
2. Next move
3. Last contact
4. Days
5. Call

Status and Next move lead because they communicate the product value. Last contact and Days provide supporting evidence. Call carries the calendar fact.

### Status styling

- Use authentic Google Sheets-style dropdown chips for Status only.
- Next move remains plain text.
- Last contact remains a normal date.
- Days turns red only when elapsed time creates a required action, not merely because the number is large.
- Call remains a normal date/time cell.
- No bottom legend is used.

### Confirmed hero color logic

- Gray: calm, neutral, or inactive states such as Not contacted, Sent, and Concluded.
- Green: the banker advanced the relationship, represented by Replied.
- Red: action is due now, represented by No reply when the bump threshold has been reached.
- Blue: calendar event, represented by Call scheduled.
- Amber: an event happened but follow-through remains, represented by Call completed with a thank-you owed.

Sent remains gray because it is a calm waiting condition. Amber is reserved for a completed call that creates a follow-through obligation.

### Confirmed visible hero states and row pattern

Use eight representative rows so the table looks like a real spreadsheet rather than a catalogue where every row has a unique state.

The visible pattern is:

1. Not contacted → `Email Sarah`
2. Sent → `—`
3. Sent → `—`
4. No reply → `Bump thread`
5. No reply → `Bump thread`
6. Replied → `Reply to Marcus`
7. Call scheduled → `—`
8. Call completed → `Thank Priya` or equivalent concise thank-you instruction

Rules:

- Next moves do not include artificial timing words such as `today`.
- Person-specific actions should name the banker where useful, such as `Email Sarah` or `Reply to Marcus`.
- Nothing is shown in Next move when nothing is owed.
- `Gone dead` is excluded from the hero.
- `Concluded` remains a legitimate background state but is excluded from the hero to preserve space for active product value.
- `Prepare for call`, `Conduct call`, and similar instructions are excluded.

### Activity layer

Use three small static notification chips with Gmail, Calendar, or Blotter timing cues and plain-language recruiting events. Directional connectors link each event to relevant updated cells.

The exact three events and row names remain a minor build-detail decision, but the intended genres are:

- Gmail reply received → Replied plus person-specific reply action;
- Calendar event scheduled → Call scheduled plus date/time;
- completed meeting or elapsed follow-up threshold → Call completed with thank-you owed, or No reply with bump action.

A recreated Gmail inbox or Calendar interface is not required.

### Motion rule

- Static clarity is the acceptance standard.
- Lightweight motion may later animate event-to-cell causality.
- Animation is not required for initial implementation and must not delay the build.

### Desktop and mobile direction

Desktop should use a practical split composition with copy and CTA on the left and the dominant spreadsheet composition on the right. Exact proportions may be refined during implementation.

Mobile should not shrink the full desktop sheet into illegibility. It should preserve the headline, subhead, CTA, and credential, then use a cropped or simplified spreadsheet view with fewer visible rows and columns while retaining the split-zone and live-update idea.

## Confirmed authority and quantitative proof inputs

- Jon confirmed that he is a former Goldman Sachs banker.
- The landing page will include the confirmed authority line above.
- Jon has a calculated model supporting a time-savings claim.
- The landing page will include a quantified time-savings claim based on that model.
- Exact figure, placement, and any methodological qualifier remain Workstream 4 decisions.
- These two claim categories are not to be reopened as yes-or-no questions.

## Remaining unresolved decisions

1. Exact recruiting-volume statistics, time-savings figure, framing, and visual treatment.
2. Exact section copy and proof for the Scale section.
3. Exact action-focused grouping, sorting, filtering, or summary view.
4. Exact copy and proof for the remaining page sections.
5. Exact funnel product-experience frames and click sequence.
6. Whether the funnel experience reuses or extends the hero visual.
7. Exact privacy, permissions, provider, verification, and FAQ wording.
8. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
9. Final mobile and responsive priorities across the whole page.
10. Exact domain routing and Lovable custom-domain implementation.
11. Minor hero implementation details, including exact contact names, dates, event-chip wording, connector placement, and final visual polish.

## Exact next action

Specify Section 2, Scale: why manual recruiting trackers fall behind.

The next discussion should efficiently settle:

- which owner-supported recruiting-cycle figures appear;
- the quantified time-savings claim and any qualifier;
- the section's headline and concise explanatory argument;
- the visual hierarchy of big numbers, supporting copy, and proof;
- whether one compact divergence visual is needed to show Gmail and Calendar activity outpacing manual sheet upkeep.

Do not reopen the confirmed hero unless a later implementation constraint genuinely breaks it. Avoid unnecessary product-logic granularity. The page is a market-validation prototype, and demo details need only be coherent, attractive, and credible at test resolution.