# Workstream 4 Ratification Package

Date: July 30, 2026
Status: Proposed, pending Jon ratification

## Purpose

This file isolates the few substantive WS4 decisions that still require Jon review. It does not reopen completed work.

## Authority boundary

Already ratified and not reopened:

- WS2 proposition and product boundaries
- WS3 funnel architecture, question order and options, email-before-price sequence, $9.99 monthly price, checkout mechanics, payment-choice signal, Fall 2026 approximately 300-person terminal commitment, analytics, and measurement rules
- WS4 hero and Sections 2 through 7
- Three CTA locations and `See how Blotter works` wording
- Landing-page rule that price and availability are not disclosed in the FAQ or closing block
- Funnel intent to preserve a credible purchase-like sequence until the terminal reveal

The following remain for final WS4 ratification only.

## 1. Spreadsheet-specific product experience

Review and settle:

- Number of frames and progress clicks within the 15 to 20 second ceiling
- Exact sheet states shown before and after Blotter updates
- Whether the experience ends on the main maintained tracker, Outstanding Actions, or both
- Relationship to the hero visual: reuse the same component and visual grammar without replaying the hero
- Exact frame headers, supporting lines, and button labels

Working direction retained for discussion:

1. Show recruiting activity arriving while the tracker is stale.
2. Show Blotter updating status, timing, scheduled calls, and next moves in the same sheet.
3. Show the resulting action view or operational payoff.

This is a proposal, not a ratified three-frame or three-click requirement.

## 2. Funnel presentation copy

WS3 already fixes the structure and sequencing. Review only the exact wording that remains unspecified:

- Optional framing around the two recruiting questions
- Email-capture title, supporting line, field label, validation, and non-OAuth clarification
- Price-screen title, supporting line, included summary, and button wording
- Checkout order-summary wording and payment-choice labels
- Terminal-state title, supporting copy, and return action

Non-negotiable strategy constraints:

- Do not disclose Fall 2026 availability before the terminal state.
- Do not label the flow a demand test before the payment-choice action.
- Do not call checkout a beta reservation before the terminal reveal.
- Do not use future-tense price language that signals the product is not available.
- Do not show card-entry fields, collect money, or imply that email submission grants Google access.
- Preserve the credible purchase-like sequence required to produce a meaningful commercial-intent signal.

## 3. Material responsive priorities

Review only content-affecting choices:

- Which spreadsheet columns remain visible in each mobile crop
- Minimum visible examples in the Outstanding Actions view
- How the Section 3 mechanism stacks on mobile
- How the preservation visual stacks without implying literal field mapping
- Which privacy statements remain visible outside accordions
- Whether desktop funnel presentation is modal or route-based; mobile should be full-screen or equivalently readable

Implementation principles that do not require further product ratification:

- Use readable crops rather than shrinking full desktop spreadsheets.
- Preserve meaning before decoration.
- Avoid page-level horizontal scrolling and hover-only information.

## 4. Audit conclusions

The coherence and claim-support audit may be completed autonomously unless it proposes changing ratified language.

Required safeguards:

- Jon's figures and 60-hour estimate remain qualified case-study evidence, not averages or guarantees.
- Prototype visuals must not be represented as functioning production integrations.
- Provider, scope, retention, deletion, authority, and case-study claims must be verified before private deployment approval.

## 5. Preserved WS5 fidelity requirement

Before broad page implementation, WS5 must create one reusable high-fidelity Google Sheets-style spreadsheet-window component, compare it against real Google Sheets references, present it to Jon for visual review, correct it, freeze the approved primitive, and reuse it across every spreadsheet scene.

## Completion rule

After Jon ratifies or edits the three substantive groups above:

1. Incorporate the approved decisions into `WS4-SPEC.md`.
2. Mark WS4 complete.
3. Activate the already prepared `WS5-SPEC.md`.
4. Update `00-START-HERE.md`, `CURRENT-HANDOFF.md`, `04-decision-log.md`, and `06-assumptions-and-open-questions.md` without broad rewrites.
