# Workstream 4 Specification

Date last updated: August 4, 2026
Status: Complete, partially superseded
Workstream: Spreadsheet landing-page content and experience design

> **Supersession notice.** This file is authority level 4. Where a ratified WS5 build
> specification in `ws5-build-specs/` covers the same surface, that file controls. The
> following items in this document are known to be superseded and must not be built:
>
> | Item here | Superseded by |
> |---|---|
> | `55 coffee chats` | `68 coffee chats` (02-SECTION-2) |
> | `WHAT ACTUALLY HAPPENED` vs `WHAT MADE IT INTO THE MANUAL TRACKER` visual | Goldman email asset (02-SECTION-2) |
> | Hero with stale rear sheet and all-caps zone labels | 01-HERO: one current sheet, `YOU add the contacts` / `BLOTTER keeps them current` |
> | `YOU CONTROL` / `BLOTTER MAINTAINS` lists | Removed (03-SECTION-3) |
> | `YOUR EXISTING TRACKER` / `BLOTTER ADDS THE LIVE LAYER` labels inside the asset | Removed (05-SECTION-5) |
> | Provider sentence claiming completed Google verification | Provider-agnostic copy (06-SECTION-6) |
> | Three CTA locations | Four, including sticky header (PLAN-AMENDMENTS-2026-08-01) |

## Purpose

This is the permanent cumulative record for Workstream 4. `CURRENT-HANDOFF.md` is temporary resumption context and must not become the only record of confirmed decisions.

## Objective and boundary

Produce a coherent, build-ready content and experience specification for the spreadsheet-native landing page before Lovable implementation.

Workstream 4 defines the page narrative, copy, proof devices, product demonstrations, funnel experience, privacy and FAQ content, CTA placement, price and terminal-state copy, and responsive implementation constraints. It does not begin Lovable implementation, design the standalone platform page, specify backend logic, or treat prototype features as production commitments.

## Inherited constraints

- July audience is pre-decay; the page sells prevention.
- Live recruiting activity outpaces manual spreadsheet upkeep.
- Student maintains contacts and static context; Blotter maintains changing activity from relevant Gmail and Calendar signals.
- Core outcome is one accurate, current source of truth.
- Existing Google Sheets workflow is preserved with minimal switching.
- Blotter is not contact discovery, scraping, mass outreach, AI writing, technical preparation, learning content, or a jobs board.
- Three primary CTAs enter the same WS3 funnel and store `cta_location`.
- Two recruiting-configuration questions precede one 15–20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Price appears only after email capture and is $9.99/month, monthly, cancel anytime.
- Terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.

## Confirmed seven-section narrative

1. Hero.
2. Scale.
3. How it works.
4. Outstanding actions.
5. Preservation.
6. Privacy, permissions, and dedicated privacy FAQ.
7. General product FAQ followed by the final closing summary and CTA.

Primary CTA placements: hero, after Section 4, and final closing block.

## Confirmed page-rhythm rule

Do not repeat one identical eyebrow, headline, supporting paragraph, and closer structure across all seven sections. Vary copy hierarchy and visual density while maintaining one coherent design system.

## Confirmed hero

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`

Visual: static-first Google Sheets composition with stale tracker behind, Blotter-maintained tracker in front, Gmail/Calendar activity chips, and zone labels `YOU ADD THE CONTACTS` and `BLOTTER KEEPS IT CURRENT`.

Student columns: Name, Title, Firm. Blotter columns: Status, Next move, Last contact, Days, Call.

## Confirmed Section 2: Scale

- Eyebrow: `The scale of a recruiting cycle`
- Headline: `Your manual tracker was never built to keep up with this.`
- Supporting argument: continuous Gmail and Calendar activity outpaces intermittent tracker upkeep, causing delayed updates, stale state, lost trust, and missed actions.
- Closing: `Once you stop trusting the tracker, you are back to reconstructing your process from Gmail, Calendar, memory, and scattered notes. That is when follow-ups, thank-you notes, and next steps begin falling through the cracks.`

Case-study qualification:
`Representative workload from a high-intensity Summer Analyst 2028 recruiting cycle that resulted in a JPMorgan offer.`

Figures:
- 628 recruiting emails
- 55 coffee chats
- 19 applications
- 30 interview rounds

Time claim:
`Save approximately 60 hours of manual tracker administration over one recruiting cycle.`

Methodology:
`Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.`

Visual: four large figures plus a compact divergence visual titled `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER`. No CTA.

## Confirmed Section 3: How It Works

- Eyebrow: `How Blotter works`
- Headline: `You manage the relationships. Blotter maintains the moving parts.`
- Supporting copy: `Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.`
- Closing: `You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.`

Visual sequence:
`Gmail + Calendar → Blotter → Your Google Sheet`

Stage labels:
- `RECRUITING HAPPENS HERE`
- `BLOTTER KEEPS IT CURRENT`
- `YOUR TRACKER STAYS CURRENT`

Division of labor:

`YOU CONTROL`
- Who you network with and contact
- The outreach and replies you write
- Your notes and relationship context

`BLOTTER MAINTAINS`
- Contact status
- Last contact and timing
- Scheduled calls and next actions

Boundary line:
`You choose the people and write the messages. Blotter keeps the logistics current.`

Badges:
- No technical-prep content
- No generic mass AI outreach
- No AI slop

No CTA.

## Confirmed Section 4: Outstanding Actions

- No eyebrow.
- Headline: `Know exactly what needs your attention.`
- Supporting line: `Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.`
- CTA line: `Open your tracker and know what to do next.`
- CTA button: `See how Blotter works`

Google Sheets-native visual:
- Title: `Outstanding actions`
- Summary: `21 outstanding actions`
- Replies owed: 6
- Follow-ups due: 11
- Thank-you notes: 4
- One visible row per group
- Muted overflow rows: `+5 more replies owed`, `+10 more follow-ups due`, `+3 more thank-you notes`
- Columns: Contact, Next action, Why it is here

Exact visible rows (corrected August 4, 2026 against the ratified PNG):

`Replies owed` count `6`
- Sarah Chen | Reply to Sarah | Sarah replied Jan 16 at 10:42 AM
- `+5 more replies owed`

`Follow-ups due` count `11`
- Daniel Kim | Bump thread | No reply for 5 days
- `+10 more follow-ups due`

`Thank-you notes` count `4`
- Priya Shah | Send thank-you | Coffee chat completed Jan 16
- `+3 more thank-you notes`

One readable row per group, one muted overflow row per group. The visible rows explain the
product; counts and overflow communicate scale. See `ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`
for the governing transcription.

## Confirmed Section 5: Preservation

- No eyebrow.
- Headline: `Keep the tracker you already built.`
- Supporting copy: `Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

Reassurance strip:
- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

Simple Google Sheets-native visual with two conceptual zones:

`YOUR EXISTING TRACKER`
- Name
- Title
- Firm
- Email
- LinkedIn

`BLOTTER ADDS THE LIVE LAYER`
- Status
- Next move
- Last contact
- Days
- Call

Do not show Group or Notes. Do not turn the section into a technical mapping or migration explanation. No CTA.

## Confirmed Section 6: How Blotter Uses Your Data

### Tone and structure

This section is not a marketing block and does not use the standard eyebrow/headline/supporting-copy pattern. It should read like a calm, candid, plain-English disclosure.

Section title:
`How Blotter uses your data`

Opening statement:
`Connecting Gmail and Calendar is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.`

### Main candid claim

`Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.`

This claim applies to the spreadsheet version. Do not refer to tracked banks, bank domains, ATS domains, or platform entities on this page.

### Four-step explanation

1. **Blotter checks the sender**  
   `Blotter compares the sender’s email address with the contacts stored in your tracker.`

2. **Unmatched messages stop there**  
   `If the sender is not in your tracker, the message body is never routed into Blotter’s content-processing system.`

3. **Matched recruiting messages are processed**  
   `If the sender matches, Blotter reads the message to identify the recruiting facts needed to maintain status, timing, and next actions.`

4. **Blotter keeps facts, not full messages**  
   `Blotter stores the structured recruiting information it needs and does not retain full email bodies.`

### Exact permissions table

Use a sober table-like treatment, not marketing cards or fake OAuth screens.

#### Gmail

Can do:
- Check sender and timing information across incoming mail.
- Read message content only when the sender matches a contact stored in the tracker.

Cannot do:
- Send emails.
- Edit emails.
- Process the content of unmatched messages.

#### Google Calendar

Can do:
- Read calendar events to identify scheduled or completed recruiting conversations associated with tracked contacts.

Cannot do:
- Create events.
- Edit events.
- Cancel events.
- Respond to events.

#### Google Sheets

Can do:
- Create and maintain the standardized Blotter recruiting view inside the user’s Google Sheets workflow.

Cannot do:
- Access unrelated Drive files.
- Modify unrelated files.
- Promise to preserve every arbitrary custom tracker layout exactly.

### Broad Google permission disclosure

`Google may describe the Gmail permission broadly because it does not offer a permission limited only to contacts in your recruiting tracker. Blotter enforces the narrower boundary in its processing system: unmatched messages are never routed for content analysis.`

This distinction must not be hidden. The processing boundary is narrower than the scope language Google may show.

### What Blotter keeps

`Blotter keeps only the structured recruiting facts needed to maintain your tracker—for example, sender, interaction time, reply state, scheduled-call information, and next-action status.`

`Full email bodies are processed only for matched recruiting messages and are not retained.`

Calendar line:
`Calendar events are used to identify recruiting calls and coffee chats associated with tracked contacts. Blotter does not write to your calendar.`

### Plain commitments

- `Blotter does not send emails`
- `Blotter does not write to your calendar`
- `Blotter does not access Google Contacts`
- `Blotter does not access unrelated Google Drive files`
- `Blotter does not sell your data`
- `Blotter does not store full email bodies`
- `Blotter does not process the content of unmatched personal email`
- `You can disconnect your accounts at any time`
- `Deleting your account permanently deletes your Blotter data`

### Account deletion language

Use:
`You can disconnect your Google accounts at any time. When you delete your Blotter account, the connection is revoked and your Blotter data is permanently deleted.`

Do not conflate subscription cancellation and immediate account deletion unless the final product makes them identical.

### Third-party connection provider

Do not call the provider `accredited` or imply that third-party involvement itself guarantees privacy.

Provisional, supportable framing:
`Blotter uses a third-party connection provider whose Google application has completed Google’s verification process.`

Supporting explanation:
`That provider facilitates the connection between Blotter and Google. Blotter’s own processing rules determine which messages are analyzed and what information is retained.`

This copy remains provisional until the provider, exact scopes, retention practices, subprocessors, consent-screen identity, and disclosure requirements are verified. The landing page must not hide the provider’s role.

### Dedicated privacy FAQ

1. **Why does Google ask for broad Gmail access?**  
   `Google does not offer a Gmail permission limited only to the contacts in your tracker. Blotter applies that narrower boundary in its own processing system. Unmatched messages are never routed for content analysis.`

2. **Does Blotter read personal emails?**  
   `No. Blotter checks sender information to find messages from contacts stored in your tracker. If the sender does not match, the message body is not processed.`

3. **Does Blotter store my emails?**  
   `Blotter does not retain full email bodies. It stores only the structured recruiting facts needed to maintain your tracker.`

4. **Can Blotter send emails or change my calendar?**  
   `No. Blotter does not request email-send permission and does not write to your calendar.`

5. **Does Blotter sell my data?**  
   `No. Blotter does not sell personal data.`

6. **What happens when I delete my account?**  
   `Your Google connections are revoked and the data associated with your Blotter account is permanently deleted.`

7. **Does a third party process my data?**  
   Provisional answer pending provider selection: `Blotter uses a third-party provider to connect with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`

### Visual hierarchy and prohibitions

Recommended order:
1. Section title and opening statement.
2. Main candid claim.
3. Four-step explanation.
4. Exact permissions table.
5. Broad Google permission disclosure.
6. Plain commitments.
7. Dedicated privacy FAQ accordion.
8. Link to the full privacy policy.

Do not use:
- Security-seal iconography
- `Bank-grade security`
- `Industry-leading encryption`
- `Accredited provider`
- Simulated OAuth screens
- Vague `secure by design` claims
- Unverified SOC 2, CASA, Google verification, retention, or deletion claims

No CTA appears in Section 6. Section 6 is fully ratified and closed.

## Confirmed Section 7: General FAQ and Final CTA

### Order and communication job

Section 7 contains a short general product FAQ followed by the final closing block and CTA. The FAQ resolves the last practical adoption objections. The closing block then restores the core promise and gives the page a decisive ending.

Do not end the page on an accordion. Do not merge the Section 6 privacy FAQ with this general product FAQ.

### General product FAQ

Title:
`Frequently asked questions`

No eyebrow or supporting paragraph is required.

Use five accordion questions:

1. **Do I need to start with a new tracker?**  
   `No. Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab, so you do not have to rebuild your contact record or re-enter every relationship.`

2. **Can I use Blotter after recruiting has already started?**  
   `Yes. Blotter is designed to work with an existing tracker and contact record, whether you are beginning recruiting or already managing an active process.`

3. **Does Blotter write emails or help with technical preparation?**  
   `No. You choose who to contact and write every message yourself. Blotter does not generate outreach, teach technicals, or provide recruiting content. It maintains the logistics surrounding your process.`

4. **What happens when I add a new contact?**  
   `Add the contact and their email address to your tracker. Blotter can then use relevant Gmail and Calendar activity associated with that contact to maintain their status, timing, scheduled calls, and next actions.`

5. **Does Blotter work only for investment banking?**  
   `Blotter is designed first for investment banking and other high-finance recruiting processes built around intensive networking, follow-ups, coffee chats, applications, and interviews.`

### Price and availability disclosure rule

Do not include FAQ questions about price or availability on the landing page.

Specifically omit:
- `How much does Blotter cost?`
- `When will access be available?`

Do not provide evasive accordion answers. Price and availability remain disclosed at their ratified stages inside the canonical funnel:

- Price appears only after email capture.
- Price is `$9.99 per month`, monthly, cancel anytime.
- Fall 2026 beta timing appears in the terminal state after the visitor selects a payment option.

### Final closing block

Use a visually distinct, concise, centered closing block after the FAQ.

Headline:
`Your recruiting tracker, always current.`

Supporting line:
`Keep your relationships moving without spending every day rebuilding the state of your process.`

CTA button:
`See how Blotter works`

Small reassurance line:
`Keep your existing Google Sheet. No mass outreach. No technical-prep content.`

Do not mention price, beta access, Fall 2026, or cohort size in the closing block.

The final CTA enters the canonical WS3 funnel and stores `cta_location = final`.

## Confirmed canonical funnel presentation

WS3 remains authoritative for funnel architecture, event semantics, price, and measurement. WS4 defines the spreadsheet-specific presentation and exact visible copy below.

### Recruiting questions

Question 1 remains exactly:
`What are you recruiting for?`

Options remain in WS3 order. Button: `Continue`.

Question 2 title:
`Which recruiting window best fits you?`

Options remain:
- Summer 2028
- Full-time
- Other

Button: `Continue`.

### Spreadsheet product experience

Use one stable Google Sheets window across three click-to-progress frames. The hero shows the outcome; the funnel demonstrates the mechanism and operational payoff. Reuse the same visual grammar, columns, mock-data style, and restrained color logic without replaying the hero composition.

A required progress indicator displays `1 of 3`, `2 of 3`, and `3 of 3`.

No timer, autoplay gate, typing simulation, or mandatory animation. Back navigation is allowed and must not refire completion events. Two internal progression clicks lead to one final `Continue` click. Leaving Frame 3 triggers `product_experience_completed`.

#### Frame 1: Recruiting activity arrives

Header:
`Recruiting keeps moving outside your tracker.`

Supporting line:
`A reply lands in Gmail and a coffee chat appears on Calendar.`

Visual:
- Sarah Chen’s spreadsheet row is visible but stale.
- Gmail chip: `Sarah Chen replied · Today, 10:42 AM`.
- Calendar chip: `Coffee chat with Daniel Kim · Friday, 2:00 PM`.
- The cells that will change in Frame 2 must be clearly signposted with a restrained outline, border, background treatment, or connector so the visitor knows where to look.

Button:
`See what Blotter updates`

#### Frame 2: Blotter updates the live state

Header:
`Blotter turns activity into current recruiting state.`

Supporting line:
`Status, timing, scheduled calls, and next moves update inside the sheet.`

Sarah Chen:
- Status: Replied
- Next move: Reply today
- Last contact: Today
- Days: 0
- Call: —

Daniel Kim:
- Status: Call scheduled
- Next move: Prepare for call
- Last contact: 2 days ago
- Days: 2
- Call: Fri 2:00 PM

The same signposted cells receive a restrained but unmistakable update highlight or pulse. The demonstration must not become a spot-the-difference exercise.

Button:
`Show me what needs attention`

#### Frame 3: Outstanding actions

Header:
`Know exactly what needs your attention.`

Supporting line:
`Blotter gathers every reply, follow-up, and thank-you note you owe into one current view.`

The same spreadsheet transitions to the `Outstanding actions` view and uses the exact Section 4 queue structure and wording:

- Summary: `21 outstanding actions`
- Replies owed, count 6
  - Sarah Chen | Reply to Sarah | Sarah replied Jan 16 at 10:42 AM
  - `+5 more replies owed`
- Follow-ups due, count 11
  - Daniel Kim | Bump thread | No reply for 5 days
  - `+10 more follow-ups due`
- Thank-you notes, count 4
  - Priya Shah | Send thank-you | Coffee chat completed Jan 16
  - `+3 more thank-you notes`

Button:
`Continue`

### Email capture

Eyebrow:
`Your recruiting workspace`

Title:
`Continue with your recruiting email.`

Supporting copy:
`Enter the email address where you conduct recruiting.`

Field label:
`Recruiting email`

No fixed placeholder. Do not imply that the user must use a school email. Do not add a static privacy note or beta-confirmation reference. Standard invalid-email feedback may appear only after an invalid submission as implementation behavior.

Button:
`Continue`

### Price screen

This must look like a current product-selection step and must not signal early access, future availability, beta status, or market research.

Title:
`Blotter`

Price:
`$9.99 / month`

Billing line:
`Billed monthly. Cancel anytime.`

Product description:
`A recruiting tracker that stays current from Gmail, Calendar, and Google Sheets.`

Included:
- `Keep your existing Google Sheet`
- `Automatic recruiting-activity updates`
- `Current relationship status and next actions`

Primary button:
`Continue to payment`

Optional secondary action:
`Back`

Do not use `Early access`, `Blotter will cost`, `At launch`, `Beta`, or `Not now`.

### Checkout screen

Title:
`Complete your purchase`

Order summary:
- Product: `Blotter`
- Description: `Recruiting tracker with Gmail, Calendar, and Google Sheets synchronization`
- Billing: `Monthly`
- Due today: `$9.99`

Payment choices:
- `Pay with card`
- `Apple Pay` where supported

Do not display before the payment-choice click:
- `This is a demand test`
- `You will not be charged`
- `Beta reservation`
- `Fall 2026`
- `At launch`
- Any other wording indicating the product is unavailable or the flow is a test

No card-entry form appears. Selecting a payment option triggers `payment_option_clicked` and advances immediately to the terminal state.

### Terminal state

This is the first point where availability is disclosed.

Eyebrow:
`Your spot is confirmed`

Title:
`You are in the first Blotter cohort.`

Supporting copy:
`Blotter is opening to a limited first cohort of approximately 300 people in Fall 2026. Your place is tied to the recruiting email you provided.`

Charge clarification:
`You have not been charged.`

Confirmation line:
`We will email you with access details and next steps.`

Button:
`Return to Blotter`

## Confirmed responsive priorities

- Mobile hero retains headline, subhead, CTA, authority line, one Gmail chip, one Calendar chip, and a readable crop emphasizing Status, Next move, and Call. The stale background sheet may reduce to a partial edge.
- Scale retains all four figures in a 2-by-2 mobile grid. Keep the 60-hour methodology directly associated with the claim.
- How It Works stacks Gmail and Calendar, Blotter, and Google Sheets vertically.
- Outstanding Actions preserves all three queue counts and at least one readable explanatory row from each queue.
- Preservation stacks the existing-tracker zone above the Blotter-live-layer zone.
- Privacy keeps the core personal-email claim and broad Google-permission disclosure visible outside accordions.
- The funnel uses a centered contained experience on desktop and a full-screen experience on mobile.
- Spreadsheet visuals use deliberate readable crops and stable column widths rather than shrinking complete sheets into illegibility or depending on pinch-to-zoom.

## Full-page coherence and claim-support audit

The ratified page forms one causal narrative:

1. The tracker stalls while recruiting continues.
2. Recruiting scale makes manual upkeep unreliable.
3. Blotter converts relevant Gmail and Calendar activity into current spreadsheet state.
4. Outstanding actions become clear.
5. The existing Google Sheets workflow is preserved.
6. Permissions and data handling are disclosed candidly.
7. General objections are resolved and the visitor receives a final CTA.

No audit finding requires reopening the hero or Sections 2 through 7.

Implementation safeguards:
- Treat the figures and 60-hour estimate as Jon-authored case-study evidence, not market averages, benchmarks, or guarantees.
- Prototype visuals represent the product proposition being tested; they must not be described as a functioning production integration.
- Provider identity, scopes, retention, deletion, privacy policy, authority line, case-study figures, and methodology require factual verification before private-build approval.
- Do not add claims, badges, security language, product capabilities, or conversion disclosures not authorized by this specification.

## Workstream completion

Workstream 4 is complete.

Workstream 5 is now active: spreadsheet-page Lovable implementation, instrumentation, and private verification.

The first WS5 build gate is not the full page. Create the global shell, typography hierarchy, and one reusable high-fidelity Google Sheets-style spreadsheet-window component. Compare it with real Google Sheets references, present it to Jon for review, correct it, and freeze the approved primitive before building the hero, mechanism, action view, preservation view, or funnel scenes.
