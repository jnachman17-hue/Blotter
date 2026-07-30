# Workstream 4 Specification

Date created: July 30, 2026
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

Confirmed hierarchy:

### Brand and category level

- Displayed product name: `Blotter`.
- Positioning direction: `The smart recruiting tracker for investment banking and high-finance networking.`
- Investment banking remains explicit in the category line rather than being removed entirely.
- The page may market broadly across competitive finance recruiting because the core networking, outreach, follow-up, coffee-chat, interview, and tracker-maintenance workflow is materially similar across the targeted paths.

### Workflow clarification

Supporting language should establish that Blotter is built around the high-volume outreach, coffee chats, follow-ups, and interviews behind competitive finance recruiting.

The exact final sentence remains open copy work, but this workflow clarification is required.

### Funnel segmentation

The broad audience is segmented inside the existing Workstream 3 onboarding sequence through the ratified recruiting-track question. The page does not need separate audience-specific funnels.

Test readouts should preserve the ability to inspect performance by recruiting track, including the investment-banking cohort, while the round-one macro test remains spreadsheet versus platform rather than an audience-positioning test.

## Confirmed brand and domain direction

- The landing page and both variants will display the same brand name: `Blotter`.
- The owned domain `blotterib.com` will be used rather than introducing a disposable test identity.
- The URL may retain `IB` even though the displayed brand is broader.
- Spreadsheet and platform variants must not use different displayed names.
- The preferred routing direction is one parent domain with distinct paths or subdomains for the matched variants, subject to Workstream 5 implementation feasibility.
- Candidate structures include `blotterib.com/sheet` and `blotterib.com/platform`, or equivalent subdomains under the same parent domain.
- Exact routing, deployment, and Lovable custom-domain configuration are Workstream 5 implementation decisions.

## Confirmed narrative architecture

The page should show the product first, then explain why it matters and how it works. It should not require the visitor to study a long problem exposition before seeing the solution.

The confirmed seven-section sequence is:

### 1. Hero: the smart tracker that updates itself

Job:

- establish that this is a recruiting spreadsheet that stays current from real recruiting activity;
- show the spreadsheet-native product immediately;
- distinguish the product from cosmetic spreadsheet cleanup;
- provide the primary CTA into the canonical funnel.

### 2. Scale: why manual recruiting trackers fall behind

Job:

- establish the volume and concurrency of competitive finance recruiting;
- explain that live Gmail and Calendar activity changes continuously while a manual sheet changes only when the student updates it;
- use recruiting-cycle figures and visual proof to make the logistics burden concrete.

Exact numbers and final phrasing remain open.

### 3. How it works: you maintain contacts; Blotter maintains changing activity

Job:

- explain the division of labor between student-maintained static information and Blotter-maintained live recruiting state;
- show Gmail, Calendar, Blotter, and Google Sheets as one causal system;
- absorb the previously separate event-to-row demonstration so the mechanism is not repeated in two major sections.

### 4. Action view: know what needs to happen today

Job:

- show that the maintained state becomes a usable daily action system;
- demonstrate grouping, sorting, filtering, or another action-focused treatment for replies, follow-ups, thank-you notes, calls, and other time-sensitive obligations.

Exact action-view implementation remains open.

### 5. Preservation: keep the spreadsheet and structure already in use

Job:

- communicate low switching cost;
- show that contacts, notes, and preferred fields are preserved;
- make clear that Blotter adds and maintains the live activity layer rather than forcing a rebuild.

### 6. Privacy and permissions

Job:

- explain restricted Gmail and Calendar use in simple human terms;
- clarify that Blotter does not read unrestricted personal email;
- explain that Calendar access exists to identify relevant recruiting meetings;
- resolve trust objections through concise explanation and FAQ content.

Exact public wording and any third-party verification language remain open and must match actual implementation truth.

### 7. Closing summary and CTA

Job:

- restate the outcome as one current source of truth, less manual upkeep, and clear next actions;
- remain concise rather than adding another major visual;
- provide the final CTA into the same canonical funnel.

## Confirmed CTA placement architecture

Three primary CTA placements are approved:

1. Hero CTA.
2. CTA after the product and action proof.
3. Final CTA after trust and objections are resolved.

All three enter the same Workstream 3 funnel. Their origin is recorded through `cta_location`. Exact visible CTA wording remains open.

## Confirmed hero communication hierarchy

The hero has one dominant communication job:

`This is a recruiting spreadsheet that updates itself from actual recruiting activity.`

The comprehension hierarchy is:

1. First impression: a smart recruiting spreadsheet that stays current.
2. Next layer: Gmail and Calendar activity update the spreadsheet automatically.
3. Deeper layer: the student keeps contacts and static information while Blotter handles changing logistics.

The hero should not attempt to communicate every page benefit with equal weight.

## Confirmed static-first hero composition

The hero will be designed statically first. Motion may be added later only if it materially improves comprehension.

### Background layer

- partially visible ordinary Google Sheets-style recruiting tracker;
- muted, lower opacity, visually subordinate, and bleeding off an edge;
- recognizable as a real student tracker before or during decay;
- imperfect or stale without becoming implausibly chaotic;
- used for recognition and contrast, not as a full equal before-and-after panel.

### Foreground layer

- dominant Google Sheets-style Blotter tracker;
- convincingly recreates Google Sheets chrome and spreadsheet behavior because the product lives in Sheets;
- student-maintained columns appear on the left;
- Blotter-maintained activity and action columns appear on the right;
- representative rows show current relationship state and next actions.

### Activity layer

- small static notification chips use Gmail or Calendar symbols and plain-language recruiting events;
- examples may include a reply received, a coffee chat scheduled, or a follow-up window reached;
- directional connectors link each event to the relevant updated cells;
- a concise annotation explains that recruiting activity updates the tracker automatically;
- a recreated Gmail inbox or Calendar interface is not required.

### Motion rule

- static clarity is the acceptance standard;
- lightweight motion may later animate event-to-cell causality;
- animation is not required for initial implementation and must not delay the build.

## Confirmed authority and quantitative proof inputs

- Jon has confirmed that he is a former Goldman Sachs banker.
- The landing page will include a truthful former-Goldman credential.
- Jon has a calculated model supporting a time-savings claim.
- The landing page will include a quantified time-savings claim based on that model.
- Exact wording, figure, placement, and any methodological qualifier remain Workstream 4 copy decisions.
- These two claim categories are not to be reopened as yes-or-no questions.

## Working page direction inherited from prior work

The following remain useful constraints unless superseded by a confirmed decision above:

- hero comprehension should be layered rather than requiring total understanding in two seconds;
- visual proof should do more work than abstract feature claims;
- color-coded relationship state is promising, but exact statuses and colors remain open;
- owner-supplied recruiting-cycle figures may be used as illustrative prototype copy if not falsely attributed to external research.

`docs/03-page-spec.md` is a working baseline only. Re-evaluate it against WS2, WS3, and the confirmed WS4 decisions rather than treating it as final truth.

## Remaining unresolved decisions

1. Exact hero headline, subhead, CTA, and authority treatment.
2. Exact recruiting-volume statistics and their framing.
3. Exact foreground and background spreadsheet rows, columns, states, colors, and mock data.
4. Exact Gmail and Calendar event chips and connector treatment.
5. Exact action-focused grouping, sorting, filtering, or summary view.
6. Exact section copy and supporting proof for all seven sections.
7. Exact funnel product-experience frames and click sequence.
8. Whether the funnel experience reuses or extends the hero visual.
9. Exact privacy, permissions, provider, verification, and FAQ wording.
10. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
11. Mobile and responsive priorities.
12. Exact domain routing and Lovable custom-domain implementation.

## Exact next action

Define the hero specification at build-brief resolution before drafting the rest of the page.

The next discussion should settle:

- headline argument and copy direction;
- subhead job and level of mechanism detail;
- CTA wording direction;
- authority placement;
- exact foreground spreadsheet content architecture;
- exact background tracker role;
- exact activity-chip examples and static connector logic;
- desktop composition and mobile simplification.

Do not begin Lovable implementation until the hero and remaining section specifications form a coherent build-ready packet.