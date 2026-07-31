# Workstream 4 Specification

Date last updated: July 30, 2026
Status: In progress
Workstream: Spreadsheet landing-page content and experience design

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
6. Privacy, permissions, and FAQ.
7. Closing summary and CTA.

Primary CTA placements: hero, after Section 4, and final section.

## Confirmed page-rhythm rule

Do not repeat one identical eyebrow, headline, supporting paragraph, and closer structure across all seven sections. Vary copy hierarchy and visual density while maintaining one coherent design system.

## Confirmed hero

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`
- Preserve `Your recruiting tracker, always current.` for Section 7.

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
- Two visible rows per group
- Muted overflow rows: `+4 more replies owed`, `+9 more follow-ups due`, `+2 more thank-you notes`
- Columns: Contact, Next action, Why it is here

The visible rows explain the product; counts and overflow communicate scale.

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

### FAQ

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
7. FAQ accordion.
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

## Remaining unresolved decisions

1. Final verification of precise Section 2 case-study counts and minor labels.
2. Exact Section 7 closing copy and visual treatment.
3. Exact funnel product-experience frames and click sequence.
4. Whether the funnel experience reuses or extends the hero visual.
5. Final provider selection and verification of privacy scopes and disclosures.
6. Exact $9.99 price presentation, checkout copy, and terminal-state copy.
7. Final responsive priorities across the whole page.
8. Exact domain routing and Lovable custom-domain implementation.
9. Minor implementation details for confirmed sections.

## Exact next action

Specify Section 7, the concise closing summary and final CTA. Settle the final headline, supporting line, CTA wording, any short reassurance or beta-cohort line, and the visual treatment. Preserve `Your recruiting tracker, always current.` as a candidate or required closing line.

Do not reopen completed WS2, WS3, the hero, or confirmed Sections 2 through 6 unless an implementation constraint genuinely breaks them.