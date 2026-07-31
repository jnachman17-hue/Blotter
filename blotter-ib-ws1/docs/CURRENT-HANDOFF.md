# Blotter IB — Current Handoff

Date: July 30, 2026

## 1. Current objective

Continue Workstream 4: spreadsheet landing-page content and experience design.

Workstreams 1, 2, and 3 are complete. Workstream 4 is active.

The audience positioning, brand direction, CTA architecture, hero, and Sections 2 through 6 are confirmed in `docs/workstreams/WS4-SPEC.md`.

Exact next action: specify Section 7 as a general product FAQ followed by the concise closing summary and final CTA.

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
6. Privacy and permissions, including a dedicated privacy-and-data FAQ
7. General product FAQ, followed by the concise closing summary and final CTA

Primary CTA placements: hero, after Section 4, and final closing block.

## 4. Confirmed FAQ distinction

Section 6 retains the full privacy-and-data FAQ because those questions are central to the trust argument and should remain adjacent to the candid permissions disclosure.

Section 7 contains a separate general product FAQ addressing broader product, fit, setup, workflow, and commercial questions. Do not merge privacy questions into the general FAQ or remove them from Section 6.

The two FAQ groups should be visually related but clearly labeled and separated by purpose:

- Section 6: how data access and processing work
- Section 7: how the product works for the user more generally

## 5. Confirmed Section 6: How Blotter Uses Your Data

Section 6 is a serious, candid, plain-English disclosure rather than a standard marketing block.

Section title:
`How Blotter uses your data`

Opening statement:
`Connecting Gmail and Calendar is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.`

Main claim:
`Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.`

The section includes:

- the four-step sender-match and processing explanation;
- the Gmail, Calendar, and Sheets permissions table;
- the broad Google-scope disclosure;
- the plain commitments and deletion language;
- provisional third-party provider disclosure pending provider verification;
- the dedicated privacy FAQ.

Privacy FAQ questions:

1. Why does Google ask for broad Gmail access?
2. Does Blotter read personal emails?
3. Does Blotter store my emails?
4. Can Blotter send emails or change my calendar?
5. Does Blotter sell my data?
6. What happens when I delete my account?
7. Does a third party process my data? — provisional until provider selection.

No CTA appears in Section 6.

## 6. Exact next action

Specify Section 7 as one compact ratification package. Settle:

1. The general product FAQ questions and concise answers.
2. The transition from general FAQ into the final closing block.
3. Final closing headline.
4. Supporting line.
5. Final CTA wording.
6. Whether to include a short beta-cohort or reassurance line.
7. Final visual treatment.
8. How to use `Your recruiting tracker, always current.`

Then continue to funnel screens, responsive constraints, and the final Lovable-ready implementation brief.

## 7. Fixed WS3 constraints

- Every primary CTA enters the same funnel.
- Two recruiting-configuration questions precede one 15 to 20 second product experience.
- Email capture is transparent and does not imitate OAuth.
- Gmail, Sheets, and Calendar remain visible as the product engine.
- Price appears only inside the funnel after email capture.
- Price is $9.99 per month, monthly, cancel anytime.
- Checkout shows payment choices without card entry or payment collection.
- Terminal state confirms a real place in the approximately 300-person Fall 2026 beta cohort.
- Both surfaces use the same funnel, price, event set, and measurement rules.

## 8. Build state

- No Lovable project exists yet.
- No reusable production code or completed landing-page assets exist.
- No public traffic launches before both pages are ready, analytics are manually verified, and the measurement period is frozen.