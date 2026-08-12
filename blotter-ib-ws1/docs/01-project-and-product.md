# Project and product

Date last updated: July 31, 2026

## The owner

Jon. University of Texas at Austin graduate, based in the Los Angeles area, pursuing entrepreneurship as a solo founder. He went through investment banking recruiting himself, which is where the product idea comes from and where much of the primary evidence comes from. He is non-technical and relies on AI assistance for tooling, code, and build guidance.

## The problem

Investment banking recruiting for undergraduates is a logistics problem disguised as a networking problem.

A serious candidate runs dozens of concurrent relationships with bankers across a season. Each one is a live email thread with its own state: who wrote last, how long ago, whether a reply is owed, whether a call is booked, whether a thank-you note is outstanding. Each thread has social timing rules that are unwritten but real. Miss a follow-up window and the relationship quietly dies.

The universal folk solution is a spreadsheet. Trackers get passed down through clubs, older students, and group chats. The spreadsheet holds contact information well. What it cannot reliably hold is live state, because state changes every time an email arrives and nobody updates a spreadsheet every time an email arrives.

## What Blotter is

Blotter is a logistics and orchestration layer for IB recruiting. Its founding principle is auto-capture: Gmail and Calendar activity drive the state of every record, rather than the user maintaining state by hand.

The user enters a contact once. Everything downstream computes itself.

Working proposition meaning, not final copy:

The student continues networking and outreach normally. Blotter coordinates the logistics created by that activity, including who replied, who went quiet, what bounced, what requires a response, what follow-up is due, what call is scheduled, and what thank-you note remains outstanding.

The prior line, `You keep your record. Blotter keeps the state alive.`, is rejected and should not be reused. It does not explain the distinction between record and state clearly enough for a new recruiting student.

## What Blotter is explicitly not

- Not learning content.
- Not interview preparation.
- Not AI-assisted outreach.
- Not a jobs board or application aggregator.

It tracks, computes, and prompts. Nothing else.

## Product architecture, platform version — SCRAPPED August 12, 2026

**The platform version is not being built or tested.** Jon's ruling: round one
tests the spreadsheet-native surface alone. Everything in this section is a
record of a proposition that was never resolved and is no longer being pursued.
It is kept for provenance, not as a plan. See the amendment atop
`02-strategy-and-test.md`.

Working concept only. Not current build scope.

Potential surfaces:

- Daily Queue: what the user owes today, computed from every record.
- Networking CRM: contacts and relationship state.
- Calendar: captured calendar activity, likely view-only.

The platform's actual argument is unresolved. A prior claim that the platform argument is capability may be too narrow. The page may instead test whether students simply prefer a cleaner platform surface over a spreadsheet-native surface.

## Product architecture, spreadsheet version

The spreadsheet-native version presents Blotter inside or adjacent to the user's existing Google Sheet. The old tracker is preserved. Blotter adds an automated state layer.

Confirmed product principle:

- The sheet has a manual zone for information the student fills once.
- The sheet has an automated zone for status, next move, and timing logic.

Current directional implementation assets show:

- a Google Sheets-native hero tracker with student-maintained fields and Blotter-maintained fields;
- a grouped Outstanding Actions view for replies owed, follow-ups due, and thank-you notes.

The desktop hero implementation is now ratified in `docs/workstreams/ws5-build-specs/01-HERO.md`. It uses the directional hero asset as a visual input but removes the stale rear sheet and explicit engine, connects the three activity cues directly to their corresponding maintained row blocks, tints the complete Status-through-Call zone, emphasizes the three cue-linked examples, and maps the below-sheet ownership labels with restrained region underlines.

These assets and specifications are validation-page implementation requirements, not settled backend product requirements.

## Privacy story

Load-bearing, and must be stated accurately in any public copy.

Blotter does not read personal email. It checks who mail is from and only reads recruiting mail from the specific people the user tracks. Any copy implying broader inbox access is wrong and damaging.

## Gmail capture, technically

The original plan was a three-stage direct Google OAuth rollout. That plan is dead.

If validation later justifies a backend build, Gmail access should go through an intermediary such as Nylas or Unipile. Direct restricted-scope Gmail access requires a CASA security assessment that a solo founder cannot clear on this timeline. CASA is deferred.

This is not part of the current landing-page build. The pages must not imply that the product is live today.

## Key person: Corey Brundage

Corey Brundage is a methodology adviser connected through Jon's father.

His relevant method, as Jon received it: buy high-intent clicks for a product that does not exist, read behavioral data in tight cycles, and build only what the data calls for.

Corey reviewing the test design before spend is provisional, not yet a confirmed hard gate. Timing is unscheduled.

## Evidence base

**Discovery calls.** Three interviews with students who won Pool 1 IB offers. The problem appears real and common, but stated interest is no longer treated as meaningful demand signal. Only observed behavior under a real offer counts.

**Jon's own recruiting tracker.** Evidence of the failure mode, not a source of public statistics. Its value is the decay curve: state columns maintained early, then abandoned as the season got busy. Do not extract percentages from it and present them as market data unless Jon separately decides to use owner-supplied figures.

**Market sizing.** A spreadsheet of Jon's own construction. Owner-supplied figures are authoritative for internal planning. They are not verified external data and must not appear in public copy as though externally validated.

## Seasonality

The recruiting calendar matters for interpreting results. Trackers circulate socially before the problem is fully felt and get seriously compiled later in the recruiting cycle.

The current test subject is a student in the SA '28 recruiting class.

For the July test, the proposition sells prevention of future tracker decay because the audience has not yet reached peak recruiting overload. This is a consequence of the recruiting calendar, not a permanent choice to exclude students who are already overwhelmed. A rescue proposition can be used later when the market reaches that moment.

## Current validation implementation state

- Workstreams 1 through 4 are complete.
- Workstream 5 is active.
- The private Lovable project exists:
  - Project: `Blotter Foundation`
  - Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`
  - Published: No
  - Current state: Paused
- Directional hero and Outstanding Actions references exist in `docs/workstreams/ws5-assets/`.
- The WS5 build-specification system exists in `docs/workstreams/ws5-build-specs/`.
- The desktop hero visual is ratified and no longer an open design question.
- Section 2 and the remaining landing-page and funnel surfaces still require surface-by-surface decision review before the implementation packet can be frozen.
- No funnel, lead database, analytics vendor, real integration, payment collection, or public deployment is complete.

## Discarded work

Do not resurrect this work unless Jon explicitly says to.

| Thing | Status |
|---|---|
| Framer as build tool | Superseded by Lovable. |
| Plain HTML, CSS, JS with GSAP on Vercel | Superseded by Lovable. |
| Original landing page build | Abandoned in the pivot. |
| Prior design token set and design system | Scrapped. Do not treat as authoritative. |
| Prior platform product pixels | Scrapped. |
| Feature inventory, roadmap, design brief, strategy reset documents | Superseded where not represented in current docs. |
| Three-stage direct Google OAuth rollout | Dead. Replaced by intermediary-first assumption if validation justifies build. |
| Full unified three-frame WS5 storyboard proposal | Never ratified and not an active requirement. Reconsider any additional reference need surface by surface. |
| Stale rear sheet and explicit engine in the directional hero asset | Superseded for hero implementation by `ws5-build-specs/01-HERO.md`. |

## Assets and current state

- Domain: `blotterib.com` is owned. Exact private deployment routing remains an implementation decision.
- Lovable project: private and paused.
- Reusable production code: not approved or complete.
- Final logo: not settled.
- Completed directional visual references:
  - `docs/workstreams/ws5-assets/source/blotter-sheets-reference-v1.html`
  - `docs/workstreams/ws5-assets/hero/hero-reference-v1.png`
  - `docs/workstreams/ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`
- Ratified build specifications:
  - `docs/workstreams/ws5-build-specs/01-HERO.md`
- Lead-storage solution: not selected.
- Analytics vendor: not selected.
