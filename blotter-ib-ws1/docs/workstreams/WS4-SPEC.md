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

## Working page direction inherited from prior work

These are useful starting points, not automatically final design decisions:

- hero comprehension target is approximately two seconds;
- before-versus-after should make the spreadsheet-native improvement immediately legible;
- the before state should resemble a recognizable student recruiting tracker before or during decay;
- the after state should show a cleaner, current, action-oriented spreadsheet workflow;
- recruiting-volume statistics may help establish the scale of the logistics burden;
- visual proof should do more work than abstract feature claims;
- color-coded relationship state is promising, but exact statuses and colors remain open;
- owner-supplied recruiting-cycle figures may be used as illustrative prototype copy if not falsely attributed to external research.

`docs/03-page-spec.md` is a working baseline only. Re-evaluate it against WS2 and WS3 rather than treating it as final truth.

## Initial unresolved decisions

1. Final page argument and section order.
2. Hero headline, subhead, CTA, and supporting proof.
3. Which recruiting-volume statistics appear and how they are framed.
4. Exact before-versus-after hero composition.
5. Exact spreadsheet columns, states, and action-focused treatment needed for the demo.
6. Exact funnel product-experience frames and click sequence.
7. Whether the funnel experience reuses, extends, or differs from the main hero visual.
8. Exact explanation of Gmail, Sheets, and Calendar without creating privacy confusion.
9. Trust, privacy, permissions, and FAQ content.
10. Exact CTA wording and placement across the page.
11. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
12. Mobile and responsive content priorities for implementation.

## Exact first action

Define the high-level page narrative before writing isolated copy or selecting detailed visuals.

The first discussion should establish the page's section sequence and the job each section performs, using the WS2 proposition and WS3 funnel as fixed inputs. Do not begin Lovable implementation or jump immediately into granular interface decisions.
