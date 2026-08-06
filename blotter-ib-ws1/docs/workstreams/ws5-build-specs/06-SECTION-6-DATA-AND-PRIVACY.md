# WS5 Build Specification 06 - Section 6 Data and Privacy

> **Amended by Jon, August 6, 2026, during the stage 7 build.** He is authority
> level 1 under `WS5-SPEC.md` "Source hierarchy". Reasoning is recorded in
> `04-decision-log.md`; the implementation carries the same notes inline.
>
> He rejected the first build of this section outright: no stylistic technique,
> too much text, unreadable, "a blob of unformatted information that no reader
> would ever read." The cause was structural. This specification asks for four
> passes over the same facts — the candid claim, the four steps, the permissions
> matrix, the nine commitments — and then a seven-question FAQ that restates all
> four. Measured against the built section: eight of the nine commitments and
> **all seven** FAQ answers repeated something already on the page. Exactly one
> statement in the section appeared once.
>
> | Item here | Amended to |
> |---|---|
> | Section 5, opening statement `Connecting Gmail and Calendar…` | `Connecting Gmail, Calendar, and Sheets…`. The permissions table three blocks below discloses a Sheets scope, and the one section whose job is disclosure may not name two of three services. No other word changes. |
> | Section 6, the claim in a tinted block with a border | The tinted block is cut. The claim carries itself typographically: first sentence at display size, the two that qualify it at reading size, on the section ground behind the same thin navy rule. Copy is byte-identical. |
> | Section 7, four stacked numbered rows, and the ban on icons and illustrations | Rebuilt as a mechanism: one gate, two tracks, one outcome. The Gmail, Calendar and Sheets marks appear on it. All four exact sentences survive in place. Nothing is hidden behind an interaction. |
> | Section 8, restrained service names without marks | The three service marks are used, at the small size section 8 always permitted. |
> | Section 9, the disclosure as its own tinted notice block | Demoted to a caption beneath the table. Jon asked whether it could move into the privacy policy; it may not, and he accepted that. It stays immediately below the table, legible, per section 9 and the section 18 ban on hiding it. |
> | Section 11, the nine commitments as a three-column block | Cut as a block. Seven of the nine are already `Cannot do` rows or already stated above. The two nothing else covers — Google Contacts, and not selling data — sit beneath the table. All nine still appear on the privacy-policy page. |
> | Section 13 and 18, provider-agnostic copy and the ban on implying CASA completion | Superseded. The page now says the provider's Google application has passed Google's CASA security assessment. **This is an unverified claim.** See below. |
> | Section 14, the seven-question privacy FAQ on the page | Relocated in full to the privacy-policy page. Moved, not withdrawn. |
> | Section 4 order, and the section 20 acceptance criteria | Read against every amendment above. |
>
> **The provider sentence is a claim gate, not a settled fact.** No provider is
> selected. Two findings from August 6, 2026 that the final wording has to
> survive:
>
> - Nylas's public claim for its shared Google application is **Tier 3** CASA,
>   not Tier 2. Any tier stated on the page would be wrong for Nylas and unknown
>   for anyone else, which is why the sentence names the assessment and not a
>   tier.
> - On the Nylas shared application the Google consent screen reads **`Nylas`**,
>   not `Blotter`. Putting Blotter's own name on that screen means Blotter's own
>   Google application, and then the CASA assessment is Blotter's to pass rather
>   than the provider's, at which point the sentence is false as written.
>
> Verify against the signed provider before public traffic.
> `06-assumptions-and-open-questions.md` carries it as a gate.
>
> Unchanged and still binding: every string is verbatim, the section 4 order of
> what remains, no eyebrow, no CTA, no cards, no seals or security iconography,
> no simulated OAuth or permission toggles, no checkmark-versus-X treatment, no
> centred sales copy, no provider name, no `accredited`, no SOC 2, and the
> section 17 rule that ratified presentation is not ratified truth.

Date ratified: August 1, 2026  
Date amended: August 6, 2026  
Status: Ratified, amended in part  
Decision owner: Jon  
Surface: Landing-page Section 6, `How Blotter uses your data`  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 6 must explain the permission and processing model in calm, candid, plain English.

This is not a marketing block. It must help the viewer understand:

1. why Gmail and Calendar access is meaningful;
2. how Blotter narrows processing to contacts stored in the recruiting tracker;
3. what matched messages are used for;
4. what Blotter retains and does not retain;
5. what each Google service permission can and cannot do;
6. why Google may describe the Gmail permission more broadly than Blotter's processing boundary;
7. how account disconnection and deletion are intended to work;
8. that a third-party connection provider will be involved without claiming a provider that has not been selected.

The section must build trust through specificity and restraint. It must not use unsupported security language, simulated OAuth, or decorative trust theater.

## 2. Controlling sources

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified content source: `../WS4-SPEC.md`
- Build-specification system: `README.md`
- Open implementation and claim gates: `../../06-assumptions-and-open-questions.md`

This build specification controls the exact desktop presentation and explicitly supersedes the provider-specific WS4 sentence that implied a selected or verified provider.

No external visual asset is required or approved for Section 6.

## 3. Overall visual character

Use a full-width section with a subtly tinted neutral background that is materially different from the preceding product-demonstration sections.

The section must be:

- left-aligned;
- calm and document-like;
- typographically restrained;
- organized with thin rules and clear spacing;
- approximately `1080px` to `1160px` maximum content width;
- understandable without decorative imagery.

Do not use:

- a standard marketing eyebrow;
- centered sales copy;
- security shields or seals;
- gradients;
- oversized service logos;
- promotional cards;
- a CTA.

## 4. Exact content order

Use this exact order:

1. Section title and opening statement.
2. Main candid claim.
3. Four-step processing explanation.
4. Exact permissions table.
5. Broad Google-permission disclosure.
6. `What Blotter keeps` block.
7. Plain commitments.
8. Account-deletion statement.
9. Third-party connection-provider disclosure.
10. Dedicated privacy FAQ.
11. Privacy-policy link.

Do not merge the privacy FAQ into Section 7's general product FAQ.

## 5. Title and opening statement

Section title:

`How Blotter uses your data`

Opening statement:

`Connecting Gmail and Calendar is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.`

There is no eyebrow.

The opening statement should use moderately prominent body typography rather than promotional subheadline styling.

## 6. Main candid claim

Exact copy:

`Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.`

Presentation:

- one prominent full-width statement block;
- pale neutral or very faint Blotter-yellow background;
- thin left rule or simple restrained border;
- larger than body text but smaller than the section title;
- no icon;
- no quotation marks;
- no testimonial styling.

This is the section's primary visual anchor.

This claim applies to the spreadsheet version. Do not refer to tracked banks, bank domains, ATS domains, or platform entities.

## 7. Four-step processing explanation

Use four stacked numbered rows rather than cards.

Each row contains:

- a restrained number: `01`, `02`, `03`, `04`;
- bold step title;
- exact explanatory sentence;
- a thin divider between rows.

Exact content:

### 01 - Blotter checks the sender

`Blotter compares the sender’s email address with the contacts stored in your tracker.`

### 02 - Unmatched messages stop there

`If the sender is not in your tracker, the message body is never routed into Blotter’s content-processing system.`

### 03 - Matched recruiting messages are processed

`If the sender matches, Blotter reads the message to identify the recruiting facts needed to maintain status, timing, and next actions.`

### 04 - Blotter keeps facts, not full messages

`Blotter stores the structured recruiting information it needs and does not retain full email bodies.`

Do not add icons, illustrations, arrows, or animation required for comprehension.

## 8. Exact permissions table

Use one sober table-like matrix with three columns:

1. Service
2. Can do
3. Cannot do

Use restrained service names. Small service marks may be used only if they do not dominate the table. Do not simulate an OAuth consent screen.

### Gmail

Can do:

- `Check sender and timing information across incoming mail.`
- `Read message content only when the sender matches a contact stored in the tracker.`

Cannot do:

- `Send emails.`
- `Edit emails.`
- `Process the content of unmatched messages.`

### Google Calendar

Can do:

- `Read calendar events to identify scheduled or completed recruiting conversations associated with tracked contacts.`

Cannot do:

- `Create events.`
- `Edit events.`
- `Cancel events.`
- `Respond to events.`

### Google Sheets

Can do:

- `Create and maintain the standardized Blotter recruiting view inside the user’s Google Sheets workflow.`

Cannot do:

- `Access unrelated Drive files.`
- `Modify unrelated files.`
- `Promise to preserve every arbitrary custom tracker layout exactly.`

Presentation rules:

- muted header row;
- thin borders or row separators;
- bullets inside the Can do and Cannot do columns;
- no individual service cards;
- no fake permission toggles;
- no checkmark-versus-X marketing treatment.

## 9. Broad Google-permission disclosure

Place this immediately below the permissions table.

Visible subheading:

`Why Google’s permission may sound broader`

Exact copy:

`Google may describe the Gmail permission broadly because it does not offer a permission limited only to contacts in your recruiting tracker. Blotter enforces the narrower boundary in its processing system: unmatched messages are never routed for content analysis.`

Use a visible but restrained notice treatment with a slightly tinted background. Do not hide this distinction inside the FAQ or fine print.

## 10. What Blotter keeps

Visible heading:

`What Blotter keeps`

Exact copy:

`Blotter keeps only the structured recruiting facts needed to maintain your tracker—for example, sender, interaction time, reply state, scheduled-call information, and next-action status.`

`Full email bodies are processed only for matched recruiting messages and are not retained.`

Calendar line:

`Calendar events are used to identify recruiting calls and coffee chats associated with tracked contacts. Blotter does not write to your calendar.`

Use one compact text block. Do not turn examples into metric cards or data diagrams.

## 11. Plain commitments

Use the following exact commitments:

- `Blotter does not send emails`
- `Blotter does not write to your calendar`
- `Blotter does not access Google Contacts`
- `Blotter does not access unrelated Google Drive files`
- `Blotter does not sell your data`
- `Blotter does not store full email bodies`
- `Blotter does not process the content of unmatched personal email`
- `You can disconnect your accounts at any time`
- `Deleting your account permanently deletes your Blotter data`

Desktop presentation:

- one simple three-column list;
- three commitments per column;
- small neutral check marks or plain bullets;
- equal treatment for every commitment;
- no individual cards.

## 12. Account-deletion statement

Place this directly beneath the commitments with a thin top divider.

Exact copy:

`You can disconnect your Google accounts at any time. When you delete your Blotter account, the connection is revoked and your Blotter data is permanently deleted.`

Do not conflate subscription cancellation and account deletion unless the final product makes them identical.

## 13. Third-party connection-provider disclosure

Visible heading:

`Google connection provider`

Use deliberately provider-agnostic copy because no provider has been selected.

Exact copy:

`Blotter uses a third-party provider to facilitate the connection with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`

Supporting explanation:

`That provider facilitates the connection between Blotter and Google. Blotter’s own processing rules determine which messages are analyzed and what information is retained.`

This wording supersedes the earlier WS4 sentence:

`Blotter uses a third-party connection provider whose Google application has completed Google’s verification process.`

Do not use the superseded sentence unless a selected provider and exact verification facts are later confirmed.

Do not:

- name Nylas, Unipile, or another provider before selection;
- call the provider accredited;
- imply that third-party involvement guarantees privacy;
- imply Google verification, CASA completion, SOC 2 status, or other certification without evidence.

## 14. Dedicated privacy FAQ

Use seven full-width accordion rows with thin separators.

Behavior:

- all rows closed initially;
- one answer open at a time;
- clear plus/minus control;
- the complete question row is clickable;
- keyboard accessible;
- no surrounding card for each question;
- answers remain in the document reading order.

Exact questions and answers:

### 1. Why does Google ask for broad Gmail access?

`Google does not offer a Gmail permission limited only to the contacts in your tracker. Blotter applies that narrower boundary in its own processing system. Unmatched messages are never routed for content analysis.`

### 2. Does Blotter read personal emails?

`No. Blotter checks sender information to find messages from contacts stored in your tracker. If the sender does not match, the message body is not processed.`

### 3. Does Blotter store my emails?

`Blotter does not retain full email bodies. It stores only the structured recruiting facts needed to maintain your tracker.`

### 4. Can Blotter send emails or change my calendar?

`No. Blotter does not request email-send permission and does not write to your calendar.`

### 5. Does Blotter sell my data?

`No. Blotter does not sell personal data.`

### 6. What happens when I delete my account?

`Your Google connections are revoked and the data associated with your Blotter account is permanently deleted.`

### 7. Does a third party process my data?

`Blotter uses a third-party provider to connect with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.`

Question 7 remains provider-agnostic until provider selection. Do not insert a provider name during implementation without a later canonical decision.

## 15. Privacy-policy link

Place the following restrained text link below the accordion:

`Read the full privacy policy`

The link may be inactive in the private visual preview, but a real privacy-policy destination is required before public traffic.

## 16. Responsive posture

Desktop is the primary approval target.

On tablet and mobile:

- all content becomes one column;
- the four processing steps remain stacked;
- the permissions matrix becomes three sequential service sections rather than a compressed table;
- commitments become one or two columns;
- the FAQ remains full width;
- no horizontal page scrolling;
- no claim may disappear behind hover-only behavior;
- body copy remains readable and the content order remains unchanged.

Responsive adaptation must not weaken or remove the broad-permission disclosure, provider disclosure, account-deletion statement, or claim-verification boundaries.

## 17. Claim and implementation gates

The desktop content and presentation are ratified. Public use remains subject to implementation truth.

Before public deployment, verify or revise the claims concerning:

- unmatched-message exclusion and routing;
- processing of matched messages;
- non-retention of full email bodies;
- structured-fact retention;
- account disconnection;
- connection revocation;
- permanent deletion;
- Google scopes and consent-screen wording;
- unrelated Drive-file restrictions;
- provider identity and role;
- provider retention practices and subprocessors;
- privacy-policy accuracy.

The private preview may show the ratified copy for design review. It must not be treated as public-ready merely because the design is approved.

## 18. Explicit exclusions

Do not use:

- an eyebrow;
- a CTA;
- marketing cards;
- security-seal iconography;
- `Bank-grade security`;
- `Industry-leading encryption`;
- `Secure by design`;
- `Accredited provider`;
- simulated OAuth screens;
- fake permission toggles;
- hidden broad-permission disclosure;
- unverified SOC 2, CASA, Google verification, retention, deletion, or subprocessor claims;
- provider names before selection;
- a merged privacy and general product FAQ;
- an external visual asset.

## 19. Lovable handoff instructions

Provide Lovable with:

1. this build specification;
2. the Section 6 portion of `WS4-SPEC.md` for content provenance;
3. the current claim and implementation gates in `06-assumptions-and-open-questions.md`;
4. the global typography, accordion, table, and accessibility primitives approved for the page.

Lovable must:

- implement the exact content order;
- preserve all exact copy;
- use the provider-agnostic replacement copy in this specification;
- build the section without an external asset;
- implement the accessible accordion behavior;
- preserve the claim gates in implementation notes;
- stop after the desktop Section 6 checkpoint unless broader implementation has been separately authorized.

## 20. Desktop acceptance criteria

Section 6 is ready for desktop approval only when:

- the section reads like a calm disclosure, not a sales block;
- there is no eyebrow or CTA;
- the title and opening statement are exact;
- the main candid claim is the primary visual anchor;
- all four processing steps appear in order with exact copy;
- the permissions table includes all three services and exact Can do and Cannot do content;
- the broad Google-permission disclosure sits immediately below the table and is visibly legible;
- the `What Blotter keeps` block is complete;
- all nine commitments are present;
- the exact account-deletion statement is present;
- the provider block remains provider-agnostic;
- all seven privacy FAQ questions and answers are present;
- the privacy-policy link appears below the FAQ;
- no unverified provider, security, or certification claim has been added;
- no external visual asset, security iconography, fake OAuth, or marketing-card system has been introduced.

## 21. Remaining questions

No substantive desktop Section 6 presentation questions remain.

Still unresolved implementation dependencies:

- third-party provider selection and exact role;
- Google scopes and consent-screen identity;
- provider retention and subprocessors;
- actual message-routing architecture;
- account disconnection and deletion implementation;
- final privacy-policy content and destination;
- final public claim verification.

These dependencies do not reopen the ratified desktop composition. They remain publication gates.

## 22. Ratification record

Jon ratified the complete Section 6 desktop presentation system on August 1, 2026 and instructed that third-party-provider language remain vague because no provider has been selected. All other Section 6 content and presentation decisions were approved as proposed.
