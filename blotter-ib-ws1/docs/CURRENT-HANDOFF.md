# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, seven-section narrative, CTA architecture, hero, and Sections 2 through 6 are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 7, the concise closing summary and final CTA.

## 2. Source-of-truth rules

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical files and workstream specifications are durable truth.
- `docs/workstreams/WS4-SPEC.md` is the active cumulative specification.
- `CURRENT-HANDOFF.md` is temporary immediate context only.
- Do not reopen confirmed WS2, WS3, hero, or Sections 2 through 6 unless an implementation constraint genuinely breaks them.
- Work at landing-page-test resolution and avoid backend-level edge-case analysis.

## 3. Confirmed page sequence

1. Hero
2. Scale
3. How it works
4. Outstanding actions
5. Preservation
6. Privacy, permissions, and FAQ
7. Concise closing summary and CTA

Primary CTA placements: hero, after Section 4, and final section.

## 4. Confirmed Section 6: How Blotter Uses Your Data

### Tone

Section 6 is a serious, candid, plain-English disclosure rather than a standard marketing block.

Section title:
`How Blotter uses your data`

Opening statement:
`Connecting Gmail and Calendar is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.`

Main claim:
`Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.`

### Four-step explanation

1. Blotter compares the sender’s email address with contacts stored in the tracker.
2. If the sender does not match, the message body is never routed into content processing.
3. If the sender matches, Blotter identifies the recruiting facts needed to maintain status, timing, and next actions.
4. Blotter stores structured recruiting facts and does not retain full email bodies.

### Permissions

Gmail:
- Checks sender and timing information.
- Reads content only for matched contacts.
- Cannot send or edit email.
- Does not process unmatched message bodies.

Calendar:
- Reads events associated with tracked contacts.
- Cannot create, edit, cancel, or respond to events.

Sheets:
- Creates and maintains the standardized Blotter view.
- Does not access unrelated Drive files.

Broad Google scope disclosure:
`Google may describe the Gmail permission broadly because it does not offer a permission limited only to contacts in your recruiting tracker. Blotter enforces the narrower boundary in its processing system: unmatched messages are never routed for content analysis.`

### Commitments

- No email sending
- No calendar writing
- No Google Contacts access
- No unrelated Drive access
- No data selling
- No full email-body retention
- No content processing for unmatched personal email
- Disconnect accounts at any time
- Account deletion permanently deletes Blotter data

Deletion language:
`You can disconnect your Google accounts at any time. When you delete your Blotter account, the connection is revoked and your Blotter data is permanently deleted.`

### Third-party provider

Do not use `accredited provider`. Provisional framing only:
`Blotter uses a third-party connection provider whose Google application has completed Google’s verification process.`

The provider’s role, exact scopes, retention practices, subprocessors, and consent-screen identity remain to be verified and disclosed candidly.

### FAQ

1. Why does Google ask for broad Gmail access?
2. Does Blotter read personal emails?
3. Does Blotter store my emails?
4. Can Blotter send emails or change my calendar?
5. Does Blotter sell my data?
6. What happens when I delete my account?
7. Does a third party process my data? — provisional until provider selection.

No CTA appears in Section 6.

## 5. Exact next action

Specify Section 7 as one compact ratification package. Settle:

1. Final headline.
2. Supporting line.
3. Final CTA wording.
4. Whether to include a short beta-cohort or reassurance line.
5. Final visual treatment.
6. How to use `Your recruiting tracker, always current.`

Then continue to funnel screens, responsive constraints, and the final Lovable-ready implementation brief.

## 6. Fixed WS3 constraints

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout shows payment choices without card entry or payment collection.
- Terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces use the same funnel, price, event set, and measurement rules.

## 7. Build state

- No Lovable project exists yet.
- No reusable production code or completed landing-page assets exist.
- No public traffic launches before both pages are ready, analytics are manually verified, and the measurement period is frozen.