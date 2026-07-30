# Workstream 2 Specification

Date last updated: July 30, 2026
Status: Complete
Workstream: Spreadsheet-native proposition

## Purpose

This file is the durable specification for Workstream 2. It records the proposition decisions that later page-design, build, and testing work must preserve. It is not a product requirements document and does not settle detailed interface behavior, backend logic, or final page copy.

## Workstream objective

Define the spreadsheet-native proposition at landing-page-test resolution:

- target user and recruiting moment;
- problem and failure mode;
- product mechanism;
- user outcome;
- minimum visible offer;
- product boundaries;
- items intentionally deferred to later workstreams.

## Target user and timing

The primary user is a serious undergraduate candidate entering active networking and beginning to adopt or use a recruiting tracker.

The July audience is generally pre-decay because of the recruiting calendar. The page should sell prevention of predictable tracker failure now. A rescue proposition may become appropriate later in peak recruiting season when students are already overwhelmed.

Do not over-segment the core audience in this workstream. Students pursuing the process broadly operate on the same recruiting timeline and face the same logistics failure.

## Core problem

Investment banking recruiting is a logistics problem disguised as a networking problem.

The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet:

- recruiting happens through Gmail and Calendar;
- every reply, bounce, scheduled call, completed call, unanswered thread, follow-up window, and thank-you obligation changes the live state of a relationship;
- the spreadsheet changes only when the student remembers to update it;
- as volume rises, the tracker becomes stale and operationally unreliable.

Tracker decay is caused by cumulative volume and inconsistent upkeep, not merely by too many columns or one missed update. Students delay updates, assume they will remember, miss activity in a crowded inbox, stop maintaining formatting consistently, and add ad hoc rows or fields as the process evolves.

The consequence is not simply a messy-looking spreadsheet. It is lost operational trust. The student can no longer confidently tell:

- who needs a response;
- who needs a follow-up;
- which call is scheduled or completed;
- what action is owed next;
- whether the tracker reflects current reality.

The student must reconstruct the process from Gmail, Calendar, memory, and scattered notes, and important actions begin slipping through the cracks.

## Proposition mechanism

The spreadsheet-native mechanism divides the tracker into two layers.

### Student-maintained contact layer

The student chooses and enters the contacts they want to track and any static information they care about, such as:

- name;
- email;
- firm;
- group;
- LinkedIn profile;
- notes;
- other custom fields.

### Blotter-maintained activity layer

Blotter uses relevant recruiting activity from Gmail and Calendar to maintain changing relationship state, including:

- replies;
- bounces;
- call scheduled or completed state;
- last activity;
- follow-up state;
- timing;
- next action;
- priority or attention state where useful.

The student enters the contact once. Blotter handles the repetitive logistics upkeep created by later activity.

## Low-switching-cost requirement

The spreadsheet-native proposition must make adoption feel operationally easy:

- Blotter works with the student's current spreadsheet;
- the student does not rebuild the tracker or start over;
- existing contacts, notes, and preferred structure are preserved;
- Blotter can be adopted at any stage of recruiting;
- the student continues adding contacts as outreach expands;
- Blotter maintains the changing recruiting activity around those contacts.

Exact setup steps and implementation details are deferred. The landing page must communicate low switching cost without falsely claiming that no setup, authorization, or mapping is ever required.

## Core user outcome

The core outcome is operational control through one accurate, current source of truth.

The student should be able to open one spreadsheet and immediately understand:

- the current state of recruiting activity;
- what requires attention;
- what action should happen next;
- what changed recently;
- which obligations are at risk of slipping.

The proposition should communicate four linked benefits:

1. Accuracy
2. Time saved
3. Everything in one place
4. Prevention of slippage

## Minimum visible offer

The spreadsheet-native landing-page proposition must visibly support five capabilities:

1. Automatic capture of relevant recruiting activity from connected Gmail and Calendar accounts.
2. Current and visually legible relationship state for each tracked contact.
3. Clear next-action visibility.
4. An action-focused view that gathers, sorts, filters, groups, or otherwise prioritizes contacts by what is owed.
5. One spreadsheet workflow that keeps static contact information and live recruiting activity together.

The interface implementation of the action-focused view is not settled. It may use sorting, grouping, filters, or a separate action area.

## Familiar spreadsheet behavior

Color-coded relationship state is a resonant spreadsheet behavior and should remain available as a marketing and design consideration.

The landing page may use automatic color coding to make the mechanism familiar and visually legible. Exact colors, statuses, columns, and conditional-formatting rules remain Workstream 4 design decisions.

## Auto-capture explanation

The landing page must explain the mechanism in plain language:

- the student connects Gmail and Calendar;
- Blotter reads only relevant recruiting activity in the background;
- the tracker stays current as recruiting activity changes.

The page does not need to explain OAuth, Nylas, Unipile, CASA, or backend implementation.

Privacy, permissions, access boundaries, and data safety require explicit treatment later in the landing-page design.

## Product boundaries

Blotter is a recruiting-logistics orchestration layer.

It is explicitly not:

- contact discovery;
- LinkedIn scraping;
- profile enrichment;
- mass outreach;
- AI-written outreach;
- automated message sending;
- technical interview preparation;
- learning content;
- a jobs board;
- an application aggregator.

The student remains responsible for finding the right people, making judgments, and communicating personally.

"No AI Slop" is approved as banked marketing language to revisit during page design. It is not final headline copy.

## Privacy constraint

Blotter must not be described as broadly reading personal email.

The current product principle is that Blotter checks who mail is from and reads only recruiting mail from banks and from the specific people the user tracks. Any public copy implying unrestricted inbox access is wrong and damaging.

Exact privacy copy and technical implementation remain later work.

## Rejected and non-final language

Rejected proposition line:

`You keep your record. Blotter keeps the state alive.`

Reason: a new recruiting student cannot clearly distinguish record from state, and the line does not explain the mechanism plainly.

Promising but non-final directions:

- `Your networking keeps moving. Your tracker does not.`
- `You add the people. Blotter keeps every relationship current.`

These may be revisited in Workstream 4 but are not approved final copy.

## Workstream boundary

Workstream 2 ends once the proposition is coherent enough to support a credible landing-page test.

It does not define:

- detailed product workflows;
- technical feasibility;
- backend behavior;
- exact automated columns;
- exact statuses;
- sorting or grouping logic;
- final page narrative;
- final copy;
- exact hero composition;
- final visuals;
- Lovable implementation.

Features shown in the landing-page test are hypotheses to validate, not commitments to build.

## Required downstream preservation

Workstream 4 and later work must preserve:

- pre-decay prevention framing for the July audience;
- the structural failure as live activity outpacing manual upkeep;
- the split between student-maintained static information and Blotter-maintained changing state;
- operational control as the core outcome;
- the four linked benefits;
- the five minimum visible capabilities;
- low switching cost;
- the explicit product boundaries;
- accurate privacy framing;
- the distinction between proposition specification and detailed product design.

## Deferred items

Deferred to Workstream 4:

- final headline, subhead, and supporting copy;
- page narrative and section order;
- hero and spreadsheet-demo visuals;
- exact automated fields and statuses;
- action-focused view presentation;
- Gmail, Sheets, and Calendar visual explanation;
- privacy and permissions treatment;
- FAQ;
- final CTA copy and placement.

Deferred beyond Workstream 4:

- real integration implementation;
- OAuth and permissions testing;
- backend logic;
- Nylas or Unipile implementation;
- detailed product requirements.
