# Strategy and test design

Date last updated: **August 12, 2026**

> ## AMENDMENT, August 12, 2026: the platform page is scrapped
>
> **Jon's ruling.** *"We're scrapping the platform page… We are not testing two
> different products in synchronization with one another as part of validation.
> So we are no longer comparing platform versus spreadsheet version. We're just
> doing spreadsheet version, which is what we built."*
>
> **Round one is now a single-surface demand test.** The macro variable it was
> designed to test — spreadsheet-native against standalone platform — is
> withdrawn, not deferred. Workstream 7 is cancelled and Workstream 8 becomes
> the launch of one page.
>
> **What this releases.** Every constraint below that exists to protect
> comparability between two pages is moot: matched simultaneous launch, the
> traffic gate requiring both pages ready, comparable interaction burden across
> surfaces, and the prohibition on promoting the spreadsheet page alone. **The
> page may be promoted now.**
>
> **What this does not release, and it matters more than what it does.** The
> canonical funnel, the event set and its definitions, the single price at a
> single stage, and the read rules **all still stand.** They were written to
> make two pages comparable, but they are also what makes *this* page's numbers
> mean anything at all — comparable against itself over time, and against the
> thresholds precommitted in `WS3-SPEC.md`. Losing the second arm is not licence
> to start changing the instrument.
>
> **What is lost, stated honestly so nobody later thinks it was answered.** The
> surface question is now untested and unanswered. Round one produces a demand
> number for a spreadsheet-native product and says nothing about whether a
> standalone platform would have done better. If that question ever matters, it
> is a new test, not a reinterpretation of this one.
>
> Sections below are amended in place. Superseded text is struck through in
> prose rather than deleted, so the original design stays legible.

This file governs validation strategy and test structure. Detailed workstream outputs live in `docs/workstreams/`. Page-copy and page-design questions remain outside this file unless they materially affect test validity.

## Strategic reversal

The project now runs market signal first, then builds only what the data calls for.

Confirmed consequences:

- The terminal artifact of this phase is an economics story, not a product.
- Read rules are written before data exists.
- Analytics is implemented and verified by hand before traffic or spend.
- Research precedes spend, except social account seeding.
- Landing-page content and experience design precede Lovable implementation.
- Features shown in the test are hypotheses, not commitments to build.

## Round-one question — AMENDED August 12, 2026

**Round one asks whether anyone wants a spreadsheet-native recruiting tracker
enough to commit money for it.** One surface, one price, one funnel.

*Superseded:* round one tested one macro variable, spreadsheet-native product
surface against standalone platform product surface. **That comparison is
withdrawn.** It is not primarily a feature, price, plan, or headline test —
that part still holds.

## Test mechanism — AMENDED August 12, 2026

**One landing page**, `blotterib.com`, using:

- the canonical funnel;
- the canonical event set, now ten events after `waitlist_joined` was added on
  August 12, 2026;
- the ratified event definitions and properties;
- one price at one stage.

*Superseded:* two landing pages held to matched funnel, event set, definitions,
price, interaction burden and **roughly simultaneous launch timing**, with the
spreadsheet page forbidden from launching before the platform page was ready.
**All six matching requirements are moot** — there is no second page to match.

**The funnel and event definitions are not moot.** They are the instrument, and
the thresholds in `WS3-SPEC.md` are written against them. Changing an event's
meaning now silently invalidates every number collected since August 7, 2026.

Detailed confirmed funnel and analytics architecture are in:

`docs/workstreams/WS3-SPEC.md`

## Confirmed workstream sequence

1. **Workstream 1: Continuity and source-of-truth setup.** Establish GitHub canonical documents, archive rules, handoff discipline, and workstream specifications.
2. **Workstream 2: Spreadsheet-native proposition.** Define the target moment, failure mode, mechanism, user outcome, minimum offer, and boundaries at landing-page-test resolution.
3. **Workstream 3: Conversion and measurement design.** Define the matched funnel, lead capture, price treatment, checkout mechanics, analytics architecture, metric hierarchy, read rules, and interpretation thresholds.
4. **Workstream 4: Spreadsheet landing-page content and experience design.** Resolve page narrative, section architecture, near-final copy, proof devices, product visuals, integration explanation, privacy treatment, FAQ, CTA placement, demo data, and visual requirements.
5. **Workstream 5: Spreadsheet-page Lovable implementation and private deployment.** Build the defined page, implement interactions and analytics, test responsiveness, privately deploy, and verify events by hand.
6. **Workstream 6: Acquisition preparation and research.** Prepare paid and organic channels, audience targeting, account seeding, traffic plan, and testing identity.
7. **Workstream 7: CANCELLED August 12, 2026.** Was: platform-page proposition, design and matched build. The platform page is scrapped and the surface comparison is withdrawn. **Nothing in WS7 transfers.**
8. **Workstream 8: Acquisition and interpretation.** Was: final verification and simultaneous launch of both versions. Now: promote the single page, verify analytics against live traffic, and interpret results under the prewritten read rules in `WS3-SPEC.md`. **The read rules and thresholds are unchanged** — losing the second arm does not license rewriting them after the fact.

## Workstream documentation requirement

Every substantive workstream has a cumulative specification at:

`docs/workstreams/WS#-SPEC.md`

The active workstream specification must be updated after ratifications. `CURRENT-HANDOFF.md` is temporary context and cannot substitute for the specification.

## What must be decided before Lovable

Before implementation begins, resolve at minimum:

- page narrative and hierarchy;
- headline direction and supporting copy;
- required sections and order;
- problem dramatization and proof devices;
- product visual and demo-state requirements;
- visible capabilities and boundaries;
- Gmail, Sheets, and Calendar explanation;
- privacy and permissions treatment;
- CTA placement and behavior;
- analytics implementation requirements.

Lovable may refine spacing, proportions, typography, responsiveness, polish, and rendered layout treatments. It must not redefine the product mechanism, page argument, funnel, or analytics architecture.

## Confirmed test constraints

| Constraint | Status | Reason |
|---|---|---|
| ~~Both pages fire the identical canonical event set.~~ **MOOT August 12, 2026** | Withdrawn with the platform page | There is no second page. **The event set itself still stands** — it is what makes this page's numbers comparable against themselves over time. |
| ~~Both pages use the same canonical funnel.~~ **MOOT August 12, 2026** | Withdrawn with the platform page | The funnel stands on its own merits; only the cross-page requirement is gone. |
| Multiple CTAs may exist, but all enter the same funnel. | Confirmed | Placement can be diagnosed through `cta_location` without creating different offers. |
| Price appears only inside the funnel after product experience and email capture. | Confirmed | Round one does not test price and should not let price dominate first impressions. |
| One product and one monthly price are shown. | Confirmed | No plan selection or price A/B test in round one. |
| Payment-choice click is the strongest commercial-demand signal. | Confirmed | It follows informed price and checkout exposure. |
| No card-entry form, payment credentials, or money are collected. | Confirmed | The test stops at payment-method choice. |
| ~~Spreadsheet page is built first, but both pages launch at roughly the same time.~~ **MOOT August 12, 2026** | Withdrawn with the platform page | **This was the clause blocking promotion.** Its reasoning was real — recruiting-cycle timing genuinely confounds a two-arm comparison run in different weeks — but there is no longer a second arm to confound. **Timing still affects what the numbers mean for this page**, which is a read-rules problem rather than a launch-gate one: August traffic is largely pre-season. |
| ~~Status vocabulary may differ only if genuinely necessary.~~ **MOOT August 12, 2026** | Withdrawn with the platform page | Concerned parity between two surfaces. |
| No em dashes or en dashes in visible page copy. | Confirmed | Owner style rule. |

## Traffic gates

**AMENDED August 12, 2026.** Two gates are withdrawn with the platform page and
the rest are **already discharged** — the site has been live since August 7,
2026 and indexed since August 11.

| Gate | State |
|---|---|
| ~~both matched pages are ready~~ | **Withdrawn.** No second page |
| read rules are written | Discharged. `WS3-SPEC.md` |
| analytics implemented and verified by hand | Discharged, and re-verified against live traffic on August 12 |
| the exact monthly price is selected | Discharged. `$9.99 / month` |
| ~~page and funnel comparability are checked~~ | **Withdrawn.** Nothing to compare against |
| any required project-level kill condition is settled | **Still open.** No kill condition has been written. It is not a blocker Jon has chosen to honour, but it is the one gate on this list nobody has discharged |

**So there is no gate left standing between here and promotion**, other than a
kill condition that was never written.

## Channels

Non-paid channels are provisionally important, but the exact acquisition plan requires later research.

Social account seeding remains exempt from the research-before-spend rule because account age and history may be mechanically necessary before promotional posting.

## Later product work — AMENDED September 1, 2026

> **Amended by the session 11 architecture ruling.** The first build does not
> use an intermediary at all: it runs inside the student's own Google account,
> with Blotter's server holding the rules and never the mail. The intermediary
> remains the destination for a hosted build, and the architecture is
> deliberately shaped so that migration swaps where the facts arrive from rather
> than rebuilding the product. See `04-decision-log.md`, session 11.
>
> **This changes nothing in this file above.** The funnel, the event set, the
> read rules and the thresholds are untouched. **It is not a decision to
> build** — the demand evidence has not moved.

If validation justifies backend development, Gmail capture is expected to use an intermediary such as Nylas or Unipile. Real OAuth implementation and permission-willingness testing are not part of the mandatory round-one funnel.

## Open strategic item — CLOSED August 12, 2026

*Was:* the standalone platform page argument remains unresolved; resolve it
honestly in Workstream 7 rather than assuming the platform must win through
capability breadth.

**Closed by the platform page being scrapped.** The question was never answered
and is now not being asked. If a platform proposition is ever revisited it
starts from nothing — there is no partial answer banked here.

## The open strategic item that replaces it

**Round one now has one arm, so its result has nothing to be read against
except its own precommitted thresholds.** That raises the stakes on two things
that were previously cushioned by the comparison:

1. **Traffic composition decides the answer.** With two arms, sending the wrong
   audience hurt both equally and the comparison survived. With one arm, the
   audience *is* the result. August traffic is largely pre-season, which is why
   the Fall 2026 disclosure and the waitlist branch were added on August 12.
2. **The kill condition was never written**, and it is now the only unfired
   gate in this file. A single-arm test with no precommitted failure threshold
   is a test that can always be argued to have nearly worked.
