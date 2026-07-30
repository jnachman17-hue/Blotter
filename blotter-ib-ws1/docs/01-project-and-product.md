# Project and product

Date last updated: July 30, 2026

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

The prior line, “You keep your record. Blotter keeps the state alive,” is rejected and should not be reused. It does not explain the distinction between record and state clearly enough for a new recruiting student.

## What Blotter is explicitly not

- Not learning content.
- Not interview preparation.
- Not AI-assisted outreach.
- Not a jobs board or application aggregator.

It tracks, computes, and prompts. Nothing else.

## Product architecture, platform version

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

Provisional product assumption:

- The sheet may need grouped action areas or strong sorting, because a large tracker cannot be scanned efficiently. Exact layout is not settled.

## Privacy story

Load-bearing, and must be stated accurately in any public copy.

Blotter does not read personal email. It checks who mail is from and only reads recruiting mail from banks and from the specific people the user tracks. Any copy implying broader inbox access is wrong and damaging.

## Gmail capture, technically

The original plan was a three-stage direct Google OAuth rollout. That plan is dead.

If validation later justifies a backend build, Gmail access should go through an intermediary such as Nylas or Unipile. Direct restricted-scope Gmail access requires a CASA security assessment that a solo founder cannot clear on this timeline. CASA is deferred.

This is not part of the current landing-page build. The pages must not imply that the product is live today.

## Key person: Corey Brundage

Corey Brundage is a methodology adviser connected through Jon's father.

His relevant method, as Jon received it: buy high-intent clicks for a product that does not exist, read behavioural data in tight cycles, and build only what the data calls for.

Corey reviewing the test design before spend is provisional, not yet a confirmed hard gate. Timing is unscheduled.

## Evidence base

**Discovery calls.** Three interviews with students who won Pool 1 IB offers. The problem appears real and common, but stated interest is no longer treated as meaningful demand signal. Only observed behaviour under a real offer counts.

**Jon's own recruiting tracker.** Evidence of the failure mode, not a source of public statistics. Its value is the decay curve: state columns maintained early, then abandoned as the season got busy. Do not extract percentages from it and present them as market data unless Jon separately decides to use owner-supplied figures.

**Market sizing.** A spreadsheet of Jon's own construction. Owner-supplied figures are authoritative for internal planning. They are not verified external data and must not appear in public copy as though externally validated.

## Seasonality

The recruiting calendar matters for interpreting results. Trackers circulate socially before the problem is fully felt, and get seriously compiled later in the recruiting cycle.

The current test subject is a student in the SA '28 recruiting class.

For the July test, the proposition sells prevention of future tracker decay because the audience has not yet reached peak recruiting overload. This is a consequence of the recruiting calendar, not a permanent choice to exclude students who are already overwhelmed. A rescue proposition can be used later when the market reaches that moment.

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

## Assets and current state

- Domain: GoDaddy domain purchased. Whether initial disposable experiments use the permanent Blotter identity or a neutral testing domain is unresolved.
- No Lovable project currently exists.
- No reusable production code currently exists.
- No final logo currently exists.
- No completed landing-page assets currently exist.
- Form handling is not decided. Tally is only a candidate if forms are needed.