# Workstream 4 Ratification Package

Date: July 30, 2026
Status: Proposed, pending Jon ratification

## Administrative status

Workstream 4 is active. The attempted closure is reversed. Workstream 5 is not active.

The full attempted-closure work remains retained in `WS4-SPEC.md` and the draft `WS5-SPEC.md`. Nothing is discarded. This file defines the authority boundary until Jon ratifies, revises, or rejects the proposals below.

## Not reopened

- WS2 proposition.
- WS3 funnel architecture, recruiting questions and option order, sequence, 15 to 20 second maximum product experience, email-before-price order, $9.99 monthly price, checkout mechanics, payment-choice signal, Fall 2026 approximately 300-person cohort commitment, analytics, and measurement rules.
- WS4 hero and Sections 2 through 7.

## Proposed product experience

### Frame 1: Recruiting activity arrives

Header: `Recruiting keeps moving outside your tracker.`

Supporting line: `A reply lands in Gmail and a coffee chat appears on Calendar.`

Visual:

- Sarah Chen row is visible but stale.
- Gmail chip: `Sarah Chen replied · Today, 10:42 AM`.
- Calendar chip: `Coffee chat with Daniel Park · Friday, 2:00 PM`.
- Relevant cells are outlined but not updated.

Button: `See what Blotter updates`

### Frame 2: Blotter updates the live state

Header: `Blotter turns activity into current recruiting state.`

Supporting line: `Status, timing, scheduled calls, and next moves update inside the sheet.`

Visual:

- Sarah Chen: Status `Replied`; Next move `Reply today`; Last contact `Today`; Days `0`; Call `—`.
- Daniel Park: Status `Call scheduled`; Next move `Prepare for call`; Last contact `2 days ago`; Days `2`; Call `Fri 2:00 PM`.
- Updated cells may receive a restrained pulse or highlight.

Button: `Show me what needs attention`

### Frame 3: Blotter gathers outstanding actions

Header: `Open one current view and know what to do next.`

Supporting line: `Replies, follow-ups, and thank-you notes are grouped by the action you owe.`

Visual:

- Same spreadsheet switches to `Outstanding actions`.
- Summary: `21 outstanding actions`.
- One or two rows under Replies owed, Follow-ups due, and Thank-you notes.
- Sarah Chen appears under Replies owed with `Reply today` and `Reply received today`.
- Daniel Park is omitted from overdue actions because a call is scheduled. This is demo presentation, not settled production logic.

Button: `Continue`

### Proposed progression behavior

- One stable Google Sheets window across all three frames.
- Exactly two internal progress clicks plus the final Continue click.
- Optional `1 of 3`, `2 of 3`, `3 of 3` indicator.
- Back is allowed and does not refire completion events.
- No timer, autoplay gate, typing simulation, or mandatory animation.
- Frame 3 completion triggers `product_experience_completed`.

### Proposed hero relationship

The funnel reuses the hero's visual grammar, sample contacts, columns, and color logic but does not replay the hero. The hero shows the outcome. The funnel isolates the mechanism and operational payoff.

## Proposed funnel-screen framing and copy

### Question 1

WS3-fixed title and options: `What are you recruiting for?`

Proposed button: `Continue`

### Question 2

WS3 fixes the three options: Summer 2028, Full-time, Other.

Proposed title: `Which recruiting window best fits you?`

Proposed button: `See the spreadsheet experience`

### Email capture

Eyebrow: `Your recruiting workspace`

Title: `Continue with your recruiting email.`

Supporting copy: `Enter the email address where you conduct recruiting. This saves your place and lets us send your beta confirmation if you continue.`

Field label: `Recruiting email`

Placeholder: `you@school.edu`

Button: `Continue`

Privacy note: `This does not connect your inbox or grant Google access.`

Validation: `Enter a valid email address.`

### Price screen

Eyebrow: `Early access`

Title: `Blotter will cost $9.99 per month.`

Supporting copy: `One recruiting tracker that stays current from Gmail, Calendar, and Google Sheets.`

Price: `$9.99 / month`

Billing note: `Monthly. Cancel anytime.`

Included summary:

- Keep your existing Google Sheet.
- Automatic recruiting-activity updates.
- Current relationship state and next actions.

Primary action: `Continue to payment`

Secondary action: `Not now`

### Checkout

Title: `Complete your Blotter beta reservation`

Order summary:

- Product: `Blotter`
- Descriptor: `Recruiting tracker with Gmail, Calendar, and Google Sheets synchronization`
- Billing: `Monthly`
- Due today: `$9.99`

Disclosure: `This is a demand test. You will not be asked for card details and you will not be charged today.`

### Payment choices

- `Pay with card`
- `Apple Pay` where supported

A payment-choice click advances immediately to the terminal state. No card-entry form appears.

### Terminal state

Eyebrow: `Beta spot confirmed`

Title: `You are on the list for Blotter's Fall 2026 beta.`

Supporting copy: `We are opening the first cohort to approximately 300 people. Your place is tied to the recruiting email you provided.`

Confirmation line: `We will email you with access details and next steps.`

Button: `Return to Blotter`

## Proposed responsive decisions requiring substantive approval

- Mobile hero keeps the copy, CTA, authority line, a cropped tracker focused on Status, Next move, and Call, and one Gmail plus one Calendar chip. The stale background sheet may be reduced to a partial edge.
- All four scale figures remain on mobile in a 2 by 2 grid. Methodology stays adjacent to the 60-hour claim.
- How It Works stacks Gmail and Calendar, Blotter, and Google Sheets vertically.
- Outstanding Actions preserves all three group counts and at least one explanatory row per group.
- Preservation stacks the existing tracker above the Blotter live layer.
- The privacy section keeps the main candid claim and broad Google-permission disclosure visible outside accordions.
- Desktop funnel may use a centered modal or route overlay. Mobile uses a full-screen route or sheet.
- Spreadsheet scenes use deliberate readable crops rather than shrinking full desktop tables or relying on pinch-to-zoom.

## Audit findings

No audit finding requires changing previously ratified hero or Section 2 through 7 language.

The audit does propose three implementation safeguards:

1. Jon's figures and 60-hour estimate must remain qualified case-study evidence, not market averages or guarantees.
2. Prototype behavior must not be represented as a functioning production integration.
3. Provider, permission, retention, deletion, authority, and case-study wording require factual verification before deployment.

These safeguards do not reopen the ratified page copy unless verification later reveals a factual conflict.

## Preserved draft WS5 requirement

Before broad page implementation, create one reusable high-fidelity Google Sheets-style spreadsheet-window component. Compare it against real Google Sheets references, present it to Jon for review, correct it, freeze the approved primitive, and only then build the hero, mechanism, action view, preservation view, and funnel scenes.

## Ratification choices

Jon may ratify the package as written, ratify with specified edits, or reject individual proposed items. WS4 remains active until explicit ratification.