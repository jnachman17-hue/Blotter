# Workstream 4 Specification

Date last updated: July 30, 2026
Status: Complete
Workstream: Spreadsheet landing-page content and experience design

## Purpose

This is the permanent cumulative record for Workstream 4. It defines the complete spreadsheet-native landing-page narrative, copy system, product demonstration, funnel presentation, responsive priorities, claim boundaries, and implementation constraints that Workstream 5 must build.

`CURRENT-HANDOFF.md` is temporary resumption context. Workstream 3 remains authoritative for funnel architecture, analytics, price, measurement, and read rules.

## Objective and boundary

Produce a coherent, Lovable-ready content and experience specification for the spreadsheet-native landing page.

Workstream 4 does not design the standalone platform page, specify production backend logic, implement OAuth, select a connection provider, or treat prototype features as commitments to build.

## Inherited constraints

- The July audience is pre-decay; the page sells prevention.
- Live recruiting activity outpaces manual spreadsheet upkeep.
- The student maintains contacts and static context. Blotter maintains changing activity from relevant Gmail and Calendar signals.
- The core outcome is one accurate, current source of truth.
- The existing Google Sheets workflow is preserved with minimal switching.
- Blotter is not contact discovery, scraping, mass outreach, AI writing, technical preparation, learning content, or a jobs board.
- Three primary CTAs enter the same WS3 funnel and store `cta_location`.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Price appears only after email capture and is $9.99/month, monthly, cancel anytime.
- The terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Prototype visuals communicate the offer being tested. They do not promise final production behavior.

## Canonical page sequence

1. Hero
2. Scale
3. How it works
4. Outstanding actions
5. Preservation
6. Privacy, permissions, and dedicated privacy FAQ
7. General product FAQ followed by the final closing summary and CTA

Primary CTA placements:

- Hero: `cta_location = hero`
- After Section 4: `cta_location = actions`
- Final closing block: `cta_location = final`

Every CTA uses `See how Blotter works` and enters the identical WS3 funnel.

## Page-rhythm rule

Do not repeat one identical eyebrow, headline, paragraph, and closer structure across all sections. Vary copy hierarchy and visual density while maintaining one coherent system.

## Section 1: Hero

- Eyebrow: `The smart recruiting tracker for investment banking and high-finance networking`
- Headline: `Your networking keeps moving. Your tracker does not.`
- Subhead: `Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.`
- CTA: `See how Blotter works`
- Authority line: `Built by a former Goldman Sachs banker for recruitment.`

Visual:

- Static-first Google Sheets composition.
- A muted stale tracker sits behind a dominant Blotter-maintained tracker.
- Gmail and Calendar activity chips connect visually to updated cells.
- Zone labels sit outside the sheet chrome: `YOU ADD THE CONTACTS` and `BLOTTER KEEPS IT CURRENT`.
- Student columns: Name, Title, Firm.
- Blotter columns: Status, Next move, Last contact, Days, Call.
- Do not place an OAuth or connected-account screen in the hero.
- Optional motion may update two or three cells in about three seconds, but the final state must be visible from the first frame.

## Section 2: Scale

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

Visual:

- Four large figures.
- One compact divergence visual titled `WHAT ACTUALLY HAPPENED` versus `WHAT MADE IT INTO THE MANUAL TRACKER`.
- No CTA.

Claim rule: use these figures only as Jon-authored case-study evidence. Do not call them averages, benchmarks, typical outcomes, or market-wide statistics.

## Section 3: How It Works

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

## Section 4: Outstanding Actions

- No eyebrow.
- Headline: `Know exactly what needs your attention.`
- Supporting line: `Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.`
- CTA line: `Open your tracker and know what to do next.`
- CTA: `See how Blotter works`

Google Sheets-native visual:

- Title: `Outstanding actions`
- Summary: `21 outstanding actions`
- Replies owed: 6
- Follow-ups due: 11
- Thank-you notes: 4
- Two visible rows per group
- Muted overflow rows: `+4 more replies owed`, `+9 more follow-ups due`, `+2 more thank-you notes`
- Columns: Contact, Next action, Why it is here

The visible rows explain the product. Counts and overflow communicate scale.

## Section 5: Preservation

- No eyebrow.
- Headline: `Keep the tracker you already built.`
- Supporting copy: `Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.`

Reassurance strip:

- `Keep your existing tracker`
- `No re-entering every contact`
- `No switching out of Google Sheets`

Visual zones:

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

Do not show Group or Notes. Do not turn this into a technical mapping or migration explanation. No CTA.

## Section 6: How Blotter Uses Your Data

This section reads as a calm, candid disclosure, not a standard marketing block.

Title:

`How Blotter uses your data`

Opening:

`Connecting Gmail and Calendar is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.`

Main claim:

`Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.`

Four-step explanation:

1. **Blotter checks the sender**  
   `Blotter compares the sender’s email address with the contacts stored in your tracker.`
2. **Unmatched messages stop there**  
   `If the sender is not in your tracker, the message body is never routed into Blotter’s content-processing system.`
3. **Matched recruiting messages are processed**  
   `If the sender matches, Blotter reads the message to identify the recruiting facts needed to maintain status, timing, and next actions.`
4. **Blotter keeps facts, not full messages**  
   `Blotter stores the structured recruiting information it needs and does not retain full email bodies.`

Permissions table:

### Gmail

Can do:

- Check sender and timing information across incoming mail.
- Read message content only when the sender matches a contact stored in the tracker.

Cannot do:

- Send emails.
- Edit emails.
- Process the content of unmatched messages.

### Google Calendar

Can do:

- Read calendar events to identify scheduled or completed recruiting conversations associated with tracked contacts.

Cannot do:

- Create events.
- Edit events.
- Cancel events.
- Respond to events.

### Google Sheets

Can do:

- Create and maintain the standardized Blotter recruiting view inside the user’s Google Sheets workflow.

Cannot do:

- Access unrelated Drive files.
- Modify unrelated files.
- Promise to preserve every arbitrary custom tracker layout exactly.

Broad permission disclosure:

`Google may describe the Gmail permission broadly because it does not offer a permission limited only to contacts in your recruiting tracker. Blotter enforces the narrower boundary in its processing system: unmatched messages are never routed for content analysis.`

What Blotter keeps:

`Blotter keeps only the structured recruiting facts needed to maintain your tracker, for example sender, interaction time, reply state, scheduled-call information, and next-action status.`

`Full email bodies are processed only for matched recruiting messages and are not retained.`

Calendar line:

`Calendar events are used to identify recruiting calls and coffee chats associated with tracked contacts. Blotter does not write to your calendar.`

Plain commitments:

- `Blotter does not send emails`
- `Blotter does not write to your calendar`
- `Blotter does not access Google Contacts`
- `Blotter does not access unrelated Google Drive files`
- `Blotter does not sell your data`
- `Blotter does not store full email bodies`
- `Blotter does not process the content of unmatched personal email`
- `You can disconnect your accounts at any time`
- `Deleting your account permanently deletes your Blotter data`

Account deletion:

`You can disconnect your Google accounts at any time. When you delete your Blotter account, the connection is revoked and your Blotter data is permanently deleted.`

Third-party provider treatment:

- Do not call a provider accredited.
- Do not imply that third-party involvement itself guarantees privacy.
- Do not publish provider-specific verification claims until WS5 verifies the provider, scopes, retention, subprocessors, consent-screen identity, and disclosure requirements.
- Until verified, use only: `Blotter uses a third-party provider to connect with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`

Dedicated privacy FAQ:

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
   `Blotter uses a third-party provider to connect with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`

Order:

1. Title and opening
2. Main claim
3. Four-step explanation
4. Permissions table
5. Broad permission disclosure
6. Plain commitments
7. Privacy FAQ
8. Full privacy-policy link

Do not use security seals, bank-grade security, industry-leading encryption, accredited provider, simulated OAuth screens, secure-by-design claims, or unverified SOC 2, CASA, Google verification, retention, or deletion claims.

No CTA.

## Section 7: General FAQ and Final CTA

General FAQ title:

`Frequently asked questions`

Questions:

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

Do not include price or availability questions. Those disclosures remain inside the funnel.

Final closing block:

- Headline: `Your recruiting tracker, always current.`
- Supporting line: `Keep your relationships moving without spending every day rebuilding the state of your process.`
- CTA: `See how Blotter works`
- Reassurance: `Keep your existing Google Sheet. No mass outreach. No technical-prep content.`

Do not mention price, beta timing, or cohort size in the closing block.

## WS3 to WS4 audit

### Already settled by WS3

- Funnel sequence
- Recruiting questions and option order
- One pre-email product experience
- Maximum experience burden
- Transparent recruiting-email capture
- Delayed $9.99 monthly price
- Checkout structure and payment choices
- No card entry or payment collection
- Fall 2026 approximately 300-person cohort commitment
- Nine-event analytics architecture
- Event properties, metric hierarchy, read rules, thresholds, and reporting rules

### Genuinely unresolved before this completion

- Spreadsheet-specific product-experience frames and clicks
- Exact presentation copy for email, price, checkout, and terminal screens
- Relationship between the hero and funnel demo
- Whole-page responsive content priorities
- Full-page coherence and claim-support rules

### Not WS4 blockers

- Provider selection and verification: WS5 implementation dependency
- Domain routing and Lovable custom-domain configuration: WS5 implementation dependency
- Production OAuth and backend behavior: post-validation implementation work
- Platform-page capability argument: WS7

## Canonical spreadsheet product experience

### Experience model

Use three click-to-progress frames after the two recruiting questions. Target total passive viewing and interaction time is 15 to 20 seconds. Do not use a timer, autoplay gate, typing simulation, or mandatory animation.

The demo reuses the hero's visual grammar, sample contacts, column names, and color logic, but it is not a replay of the hero. The hero shows the outcome. The funnel demo isolates the mechanism and then the operational payoff.

Use one stable Google Sheets window across all three frames. Preserve spatial continuity. Do not replace the screen with three unrelated mockups.

### Frame 1: Recruiting activity arrives

Header:

`Recruiting keeps moving outside your tracker.`

Supporting line:

`A reply lands in Gmail and a coffee chat appears on Calendar.`

Visual state:

- Google Sheet row for Sarah Chen is visible but stale.
- Gmail chip: `Sarah Chen replied · Today, 10:42 AM`
- Calendar chip: `Coffee chat with Daniel Park · Friday, 2:00 PM`
- The relevant sheet cells are subtly outlined but not yet updated.
- Gmail, Calendar, and Sheets are visibly distinct and connected.

Button:

`See what Blotter updates`

### Frame 2: Blotter updates the live state

Header:

`Blotter turns activity into current recruiting state.`

Supporting line:

`Status, timing, scheduled calls, and next moves update inside the sheet.`

Visual state:

- Sarah Chen row changes to Status `Replied`, Next move `Reply today`, Last contact `Today`, Days `0`, Call `—`.
- Daniel Park row changes to Status `Call scheduled`, Next move `Prepare for call`, Last contact `2 days ago`, Days `2`, Call `Fri 2:00 PM`.
- Updated cells receive a restrained pulse or highlight. Motion is optional. The final values must appear immediately if reduced motion is enabled.

Button:

`Show me what needs attention`

### Frame 3: Blotter gathers outstanding actions

Header:

`Open one current view and know what to do next.`

Supporting line:

`Replies, follow-ups, and thank-you notes are grouped by the action you owe.`

Visual state:

- The same sheet switches to the `Outstanding actions` tab.
- Summary: `21 outstanding actions`.
- Show one or two rows under Replies owed, Follow-ups due, and Thank-you notes.
- Sarah Chen appears under Replies owed with Next action `Reply today` and Why it is here `Reply received today`.
- Daniel Park does not appear as overdue because a call is scheduled. This is demo logic only, not a production rule specification.

Button:

`Continue`

Completing Frame 3 triggers `product_experience_completed` and advances directly to email capture.

### Demo interaction rules

- Exactly two internal progress clicks plus the final Continue click.
- Back control is allowed and does not refire completion events.
- Progress indicator may read `1 of 3`, `2 of 3`, `3 of 3`.
- Keyboard activation and visible focus states are required.
- No scrolling inside the demo on desktop.
- On mobile, use horizontally cropped sheet regions, not a fully shrunk unreadable spreadsheet.
- The experience must remain materially comparable to the later platform experience in duration and click burden.

## Exact funnel-screen copy

### Funnel shell

- Close control: `Close`
- Back control: `Back`
- Progress labels may use concise stage names: `Recruiting`, `Experience`, `Email`, `Access`, `Checkout`.
- Closing and reopening restarts the current session funnel unless WS5 intentionally persists partial state.

### Question 1

Title:

`What are you recruiting for?`

Options, in order:

1. Investment Banking
2. Management Consulting
3. Private Equity / Growth Equity
4. Sales & Trading
5. Asset Management / Equity Research
6. Venture Capital
7. Other

Primary action:

`Continue`

### Question 2

Title:

`Which recruiting window best fits you?`

Options, in order:

1. Summer 2028
2. Full-time
3. Other

Primary action:

`See the spreadsheet experience`

Completing this screen triggers `recruiting_profile_completed`.

### Email capture

Eyebrow:

`Your recruiting workspace`

Title:

`Continue with your recruiting email.`

Supporting copy:

`Enter the email address where you conduct recruiting. This saves your place and lets us send your beta confirmation if you continue.`

Field label:

`Recruiting email`

Placeholder:

`you@school.edu`

Primary action:

`Continue`

Privacy note:

`This does not connect your inbox or grant Google access.`

Validation:

`Enter a valid email address.`

Submission triggers `email_submitted`.

### Price screen

Eyebrow:

`Early access`

Title:

`Blotter will cost $9.99 per month.`

Supporting copy:

`One recruiting tracker that stays current from Gmail, Calendar, and Google Sheets.`

Price line:

`$9.99 / month`

Billing note:

`Monthly. Cancel anytime.`

Included summary:

- Keep your existing Google Sheet
- Automatic recruiting-activity updates
- Current relationship state and next actions

Primary action:

`Continue to payment`

Secondary action:

`Not now`

Rendering triggers `price_viewed`. Primary action triggers `checkout_started`.

### Checkout screen

Title:

`Complete your Blotter beta reservation`

Order summary:

- Product: `Blotter`
- Descriptor: `Recruiting tracker with Gmail, Calendar, and Google Sheets synchronization`
- Billing: `Monthly`
- Due today: `$9.99`

Payment choices:

- `Pay with card`
- `Apple Pay` where supported

Disclosure:

`This is a demand test. You will not be asked for card details and you will not be charged today.`

Each payment-choice click triggers `payment_option_clicked` with `payment_method` and advances immediately to the terminal state. Do not render a fake card-entry form.

### Terminal state

Eyebrow:

`Beta spot confirmed`

Title:

`You are on the list for Blotter's Fall 2026 beta.`

Supporting copy:

`We are opening the first cohort to approximately 300 people. Your place is tied to the recruiting email you provided.`

Confirmation line:

`We will email you with access details and next steps.`

Primary action:

`Return to Blotter`

Rendering triggers `beta_spot_confirmed`.

## Responsive content priorities

### Global

- Preserve proposition, proof, mechanism, action view, preservation, privacy, and CTA sequence at every breakpoint.
- Reduce decoration before reducing meaning.
- No critical copy may exist only in hover states.
- Maintain readable 16px minimum body text and 44px minimum touch targets.
- Use reduced-motion behavior when requested by the operating system.
- Avoid horizontal page scrolling. Horizontal cropping is allowed only inside clearly framed spreadsheet mockups.

### Hero

Desktop: two-column copy and visual composition.

Tablet: copy first, visual immediately below.

Mobile priorities:

1. Eyebrow
2. Headline
3. Subhead
4. CTA
5. Authority line
6. Cropped Blotter tracker focused on Status, Next move, and Call
7. One Gmail chip and one Calendar chip

The stale background sheet may be reduced to a partial edge on mobile. Do not shrink the full desktop composition until text becomes illegible.

### Scale

- Keep all four figures.
- Use a 2 by 2 grid on mobile.
- Place the case-study qualification before the figures.
- Keep the methodology directly adjacent to the 60-hour claim.
- Simplify the divergence visual before removing it.

### How it works

- Stack Gmail + Calendar, Blotter, and Google Sheets vertically on mobile.
- Preserve stage labels and division of labor.
- Badges may wrap into multiple lines.

### Outstanding actions

- Preserve group counts and at least one explanatory row per group.
- Hide secondary rows before hiding columns.
- Mobile row priority: Contact, Next action, Why it is here.
- Keep the CTA immediately after the visual and supporting line.

### Preservation

- Stack `YOUR EXISTING TRACKER` above `BLOTTER ADDS THE LIVE LAYER`.
- Preserve all three reassurance points.
- Avoid dense mapping arrows.

### Privacy

- Keep the main candid claim visible without accordion interaction.
- Stack the four steps.
- Convert the permissions table into three labeled blocks on mobile.
- Keep broad Google-permission disclosure outside the FAQ.
- FAQ may use accordions, but question labels must remain fully visible.

### Final FAQ and closing block

- Use full-width accordion rows.
- Keep the final CTA visible without excessive empty space.
- Centered treatment may remain centered on mobile.

### Funnel

- Desktop may use a centered modal or route-level overlay.
- Mobile should use a full-screen sheet or route.
- Keep one primary action visible near the bottom without covering content.
- Spreadsheet frames use deliberate crops and callouts, not pinch-to-zoom dependence.

## Full-page coherence audit

### Narrative coherence

The page follows one causal argument:

1. Recruiting activity keeps moving while the manual tracker stalls.
2. The volume is large enough that intermittent upkeep fails.
3. Blotter converts Gmail and Calendar activity into current sheet state.
4. The user receives a clear action view.
5. Adoption preserves the existing tracker and workflow.
6. Permission boundaries are disclosed candidly.
7. Practical objections are resolved and the core promise is restated.

No section introduces a second product category or contradicts the logistics-layer boundary.

### Repetition control

Intentional repeated ideas:

- Existing Google Sheet preservation
- Gmail and Calendar as the activity source
- Current state and next actions

Each repetition has a different job: proposition, mechanism, action payoff, adoption reassurance, or closing reinforcement. Avoid repeating full sentences or identical visual compositions.

### Claim-support audit

Supported as Jon-authored case-study claims:

- 628 recruiting emails
- 55 coffee chats
- 19 applications
- 30 interview rounds
- JPMorgan offer outcome
- Approximately 60 hours saved, with methodology displayed
- Former Goldman Sachs banker authority line, subject to final factual verification before deployment

Prototype proposition claims that must be framed as intended product behavior, not proven production performance:

- Automatic Gmail and Calendar updates
- Current status and next-action maintenance
- Outstanding-action grouping
- Standardized Blotter tab inside Google Sheets
- Approximately 300-person Fall 2026 beta cohort

Claims requiring WS5 verification before publication:

- Provider identity and verification status
- Exact Google scopes and consent-screen wording
- Data retention and deletion implementation
- Privacy-policy language matching the selected provider and actual prototype architecture
- `Built by a former Goldman Sachs banker for recruitment` factual wording
- Exact derivation and supporting records for the 60-hour estimate and case-study figures

Prohibited unsupported claims:

- Market averages derived from Jon's tracker
- Guaranteed time savings
- Guaranteed prevention of missed actions
- Bank-grade security
- Industry-leading encryption
- SOC 2 or CASA status
- Accredited provider
- Zero setup
- Exact preservation of every custom tracker layout
- Existing production integrations or a functioning backend

### Funnel coherence

- The page CTA promises a demonstration, and the funnel delivers a demonstration before asking for email.
- Email capture explicitly states that Google access is not being granted.
- Price appears only after identified interest.
- Checkout clearly discloses the fake-door nature before a payment-choice click.
- Terminal copy promises only a beta place and future communication.

### Comparative-test coherence

- Spreadsheet-specific imagery and copy may differ from the later platform page.
- Funnel architecture, question count, price, checkout burden, events, and measurement remain identical.
- WS5 must not optimize the spreadsheet funnel in ways that cannot be matched in WS7.

## Lovable-ready WS5 implementation constraints

The consolidated implementation brief lives in `docs/workstreams/WS5-SPEC.md`.

WS5 must:

- Build the spreadsheet page only.
- Implement all seven sections and the canonical funnel.
- Use data-driven reusable components for sections, FAQs, demo frames, and funnel screens.
- Instrument the exact WS3 event set and properties.
- Preserve CTA origin through the full funnel.
- Support desktop, tablet, and mobile priorities above.
- Treat all product surfaces as polished prototypes, not functioning integrations.
- Create a private deployment for review.
- Verify analytics manually before any public traffic.
- Document any implementation conflict rather than silently changing ratified copy or sequence.

## Deferred beyond WS4

### Workstream 5

- Lovable visual design and implementation
- Component architecture
- Form and lead-storage implementation
- Analytics vendor and event wiring
- Provider, privacy-policy, and scope verification
- Domain and route configuration
- Accessibility and responsive QA
- Private deployment and manual analytics verification

### Workstream 7

- Platform-page proposition and capability inventory
- Platform-specific product experience
- Matched platform build

### Post-validation

- Production integrations
- OAuth architecture
- Backend state logic
- Real billing
- Real account deletion and retention implementation

## Workstream completion

Workstream 4 is complete.

The next active workstream is Workstream 5: spreadsheet-page Lovable implementation, instrumentation, private deployment, and manual verification.
