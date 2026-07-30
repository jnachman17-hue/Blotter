# Blotter IB — Current Handoff

Date: 2026-07-30

## 1. Session objective

Complete Workstream 2 by defining a coherent spreadsheet-native proposition, correct the project roadmap so landing-page design precedes Lovable implementation, and prepare a clean handoff into Workstream 3.

## 2. Work completed

- Completed all five Workstream 2 proposition decisions.
- Defined the current July audience and recruiting moment.
- Defined the structural failure and tracker-decay mechanism.
- Defined the spreadsheet-native product mechanism.
- Defined the core user outcome and benefit hierarchy.
- Defined the minimum offer and explicit feature boundaries.
- Rejected unclear proposition language and preserved promising headline directions for later copy work.
- Confirmed that Workstream 2 stops at landing-page-test coherence rather than product requirements or technical feasibility.
- Corrected the future sequence so spreadsheet landing-page content and experience design occur before Lovable implementation.
- Updated `00-START-HERE.md` and `02-strategy-and-test.md` with the corrected sequence.

## 3. Workstream 2 decisions made

### Audience and timing

- The July landing page reaches students before tracker decay is fully felt because of the recruiting calendar.
- The current page sells prevention of predictable tracker decay.
- A rescue proposition may be used later in peak recruiting season when students are actually overwhelmed.
- The page should demonstrate the future failure concretely without claiming the current visitor has already failed.
- Do not over-segment the audience. Serious candidates broadly operate on a similar recruiting timeline.

### Failure mode

- Recruiting activity changes continuously through email and calendar, while a spreadsheet changes only when the student manually maintains it.
- Tracker decay is caused by cumulative volume and inconsistent upkeep, not excessive column count.
- Students delay updates, assume they will remember, miss activity in a crowded inbox, stop maintaining formatting consistently, and add ad hoc rows or fields.
- The sheet gradually becomes stale, inconsistent, and no longer reflects reality.
- The meaningful consequence is lost operational trust. The student must reconstruct reality from Gmail, Calendar, memory, and scattered notes, and important actions begin slipping through the cracks.

### Spreadsheet-native mechanism

- The student chooses and enters contacts and whatever static information they care about, such as name, email, firm, group, LinkedIn profile, and notes.
- Blotter uses relevant Gmail and Calendar activity to maintain the changing side of the tracker.
- The landing page must explain in plain language that the student connects Gmail and Calendar and Blotter reads relevant recruiting activity in the background to keep the tracker current.
- The product does not discover contacts, scrape LinkedIn, enrich profiles, or automate outreach.
- Exact automated columns, statuses, and interface logic remain later design decisions.

### Core outcome

- The core outcome is operational control through one accurate, current source of truth.
- The student can open one spreadsheet and immediately understand what is happening, what requires attention, and what should happen next.
- The benefit hierarchy is accuracy, time saved, everything in one place, and preventing important replies, follow-ups, and other actions from slipping through the cracks.

### Minimum offer and boundaries

The minimum spreadsheet-native offer visibly promises:

1. Automatic capture of relevant recruiting activity from connected Gmail and Calendar accounts.
2. A current and visually legible state for each tracked contact.
3. Visibility into the next actions requiring attention.
4. An action-focused view that gathers or prioritizes contacts by what is owed.
5. One spreadsheet workflow containing the student's contacts and live recruiting activity.

The implementation of the action-focused view is not settled. It may use sorting, grouping, filters, dedicated action areas, or another visually effective treatment.

Blotter is explicitly not an AI slop platform. It does not mass-generate generic outreach, write or send messages on the student's behalf, replace student judgment, find contacts, or provide technical interview preparation. “No AI Slop” is banked marketing language for Workstream 4.

Color-coded relationship state is a resonant behavior to preserve as a marketing and design consideration, but exact colors and statuses are not settled.

Privacy, permissions, access boundaries, and data safety require explicit treatment during landing-page design, likely through an FAQ and potentially a dedicated trust section.

## 4. Roadmap correction ratified

Do not move directly from conversion and analytics work into Lovable.

The corrected sequence is:

1. Workstream 1: continuity and source-of-truth setup. Complete.
2. Workstream 2: spreadsheet-native proposition. Complete.
3. Workstream 3: CTA, conversion goal, lead-capture flow, analytics architecture, event parity, and read rules.
4. Workstream 4: spreadsheet landing-page content and experience design.
5. Workstream 5: spreadsheet-page Lovable implementation, instrumentation, and private deployment.
6. Workstream 6: acquisition preparation and research.
7. Workstream 7: platform-page proposition, design, and matched build.
8. Workstream 8: final analytics verification and simultaneous launch.

Workstream 4 must define the page narrative, content hierarchy, near-final copy, proof devices, spreadsheet visual, demo data, Gmail and Calendar explanation, trust treatment, FAQ content, CTA placement, and visual requirements before implementation begins.

Workstream 5 uses Lovable to execute and visually refine that brief. Spacing, typography, proportions, responsiveness, motion, and rendered layout alternatives may be refined inside Lovable. Product logic, page narrative, CTA mechanics, and analytics architecture should not be invented during the build.

## 5. Files changed

- `blotter-ib-ws1/docs/00-START-HERE.md`
- `blotter-ib-ws1/docs/01-project-and-product.md`
- `blotter-ib-ws1/docs/02-strategy-and-test.md`
- `blotter-ib-ws1/docs/04-decision-log.md`
- `blotter-ib-ws1/docs/CURRENT-HANDOFF.md`

## 6. Current workstream

Workstream 3: Conversion and measurement design.

Workstream 3 objective:

Define what visitor behavior the matched landing-page test is trying to produce, how that behavior will be captured, and how the resulting data will be interpreted before either page is built.

Workstream 3 should resolve:

- Primary conversion goal and graded intent signals.
- CTA wording and click behavior at a conceptual level.
- Lead-capture flow and information collected at each step.
- Whether price or purchase-intent mechanics appear in round one.
- Identical analytics event set across both pages.
- Event definitions, naming, and measurement architecture.
- Read rules written before data exists.
- Success, failure, and ambiguous-result thresholds.
- Any conversion-design constraints Workstream 4 must preserve.

Do not write the full page, settle final visual design, or begin Lovable implementation during Workstream 3.

## 7. Exact next action

Begin Workstream 3 by resolving the conversion objective:

**What visitor action should count as the strongest meaningful demand signal in round one, and should the test use one binary conversion or a graded sequence of intent signals?**

Start by distinguishing possible levels of intent, for example:

- CTA click.
- Email or lead submission.
- Completion of a second step that signals stronger intent.
- Price acceptance or another purchase-intent action, if included.

Do not assume that Connect Gmail, a two-step flow, a card step, or price has already been approved. Those are unresolved candidates.

The first discussion should establish what behavior the experiment needs to elicit before deciding the screen sequence or analytics event names.

## 8. Relevant links, files, and project state

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Archive path:

`blotter-ib-ws1/archive/`

Read first in the next chat:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read the Workstream 3 canonical files:

- `docs/02-strategy-and-test.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Read `docs/01-project-and-product.md` for product context if needed. Read `docs/03-page-spec.md` only as a working baseline when a conversion decision materially intersects later page structure. Do not treat it as final.

Deployment and build state:

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- A GoDaddy domain exists, but testing-domain identity remains unresolved.
- No public traffic should launch before both matched pages are ready and analytics are verified by hand.