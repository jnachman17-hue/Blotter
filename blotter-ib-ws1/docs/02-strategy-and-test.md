# Strategy and test design

Date last updated: July 29, 2026

This file governs the validation strategy. It should not be used to settle unresolved page-copy, page-design, CTA, pricing, or platform-positioning details. Those belong in `06-assumptions-and-open-questions.md` until Jon confirms them.

## The reversal

The project's first several months ran this sequence: idea, then discovery interviews, then feature specification, then design system, then build. Zero market contact at any point. Months of work produced a deployed product and no evidence that anyone wanted it.

That sequence is backwards. The project now runs market signal first, then builds only what the data calls for.

Confirmed consequences:

- The terminal artifact of this phase is an economics story, not a product.
- Read rules get written before data exists.
- Analytics must be in place and verified by hand before any money moves.
- Research precedes spend, except social account seeding.

Open consequence:

- The exact project-level kill condition is unresolved. Jon feels less strongly about setting this before launch than about setting read rules before launch.

## The question being tested

Round one asks one thing: which macro surface do students want, a spreadsheet-native product or a platform-version product.

This is not primarily a feature test, price test, or headline test. Features and possibly price may appear only if explicitly approved, but they are not the round-one A/B variable.

## Test mechanism

Two landing pages. Same skeleton where practical, same measurement, same event set. Different product-surface proposition.

One page presents Blotter as a second tab in the Google Sheet the student already owns. The other presents it as a standalone platform.

The exact CTA and lead-capture flow are not decided. Earlier language about Connect Gmail and a two-step flow is a candidate, not a settled decision.

## Constraints on the test

| Constraint | Status | Reason |
|---|---|---|
| Both pages fire the identical event set. | Confirmed | A page tracking different events than its comparator cannot be compared to it. |
| Status vocabulary does not need to be identical across pages. | Confirmed | Default to identical unless a real reason to diverge appears. This does not relax identical event tracking. |
| Spreadsheet page is built first, but both pages launch at roughly the same time. | Confirmed | Sequential build de-risks execution. Simultaneous launch avoids confounding surface preference with recruiting-cycle timing. |
| Banks and applications are off on both pages. | Provisional | Likely true for the spreadsheet page. Platform page content is not settled. |
| Connect Gmail is the primary CTA. | Not settled | The CTA and lead-capture process have not been decided. |
| Any auth-adjacent flow must not resemble a Google login. | Confirmed if used | No Google marks, no lookalike layout, and no phishing-adjacent design. |
| No card step and no price in round one. | Provisional | Earlier logic was that price confounds the surface question. Jon later noted that price may still appear. |
| Feature cards carry pictures, not bullets. | Open | Design is not yet settled. |
| Card count is not fixed. | Open | This must be reconciled with identical event tracking before card copy is written. |
| No em dashes or en dashes in visible page copy. | Confirmed | Owner style rule. |

## Card-count tension

Card count is still unresolved. If pages contain different card counts, the two pages may emit different card-level events, which could damage comparability. The likely solution may be equal corresponding card slots, but this has not been ruled.

Resolve before feature-card words are drafted.

## Build and launch sequence

Confirmed: build sequentially, spreadsheet page first. Do not launch the spreadsheet page publicly until the matched platform page is also complete.

Reason: if one page runs in one part of the recruiting cycle and the other page runs later, any difference in conversion may reflect timing rather than preference.

## Channels

Non-paid channels are provisionally important, but the exact channel strategy needs more research.

| Channel | Current working position |
|---|---|
| Reddit, primarily r/FinancialCareers | Likely central, needs hand verification. |
| Wall Street Oasis | Candidate organic channel. |
| Targeted student email list | Candidate direct channel. |
| TikTok | Low priority unless evidence changes. |
| Paid acquisition | Useful for detection, not optimization, at current budget. |

Account seeding is exempt from the research-before-spend rule. The reason is mechanical: social accounts need age and comment history before they can post promotional content without getting removed. Seeding gates the organic broadcast arm only, not the launch.

## What gates traffic

Before traffic launches:

- Read rules must be written.
- Analytics must be implemented and verified by hand.
- The CTA and lead-capture flow must be decided.
- The exact page pair must be ready enough to compare.

Open before traffic or result interpretation:

- Whether a hard project-level kill condition must be written before launch.
- The content of that kill condition if Jon chooses to set one.

## Later rounds, for context only

Fake purchase-door mechanics and willingness-to-pay testing are later-round concepts. They are not settled for round one.

The payer hypothesis is that the student pays, not the recruiter or firm. This should be revisited when price enters the test.

If validation gates an MVP, Gmail capture via Nylas or Unipile is targeted only after validation justifies backend build.

## Open item: platform page argument

The platform page argument is unresolved.

A prior position said the platform argument was capability: it can hold things a spreadsheet structurally cannot. Jon challenged this. If utility is roughly comparable, the market might prefer the platform simply because the interface is cleaner or more desirable to work in.

Before platform-page copy, do an honest capability inventory and decide what the platform page is actually arguing.
