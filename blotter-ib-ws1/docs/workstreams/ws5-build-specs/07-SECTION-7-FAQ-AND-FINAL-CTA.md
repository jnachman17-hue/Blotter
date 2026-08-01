# WS5 Build Specification 07 - Section 7 FAQ and Final CTA

Date ratified: August 1, 2026  
Status: Ratified  
Decision owner: Jon  
Surface: Landing-page Section 7, `Frequently asked questions` and final closing CTA  
Implementation priority: Desktop first

## 1. Purpose and communication job

Section 7 resolves the last practical product-adoption objections and then gives the page a decisive ending.

The viewer should understand that:

1. they do not need to rebuild their tracker;
2. Blotter can be adopted after recruiting has already started;
3. Blotter does not write outreach or provide technical-preparation content;
4. adding a new contact is simple;
5. the product is designed first for investment banking and adjacent high-finance recruiting;
6. the final action is to enter the same canonical product-experience funnel used by the other CTAs.

The page must not end on an accordion. The FAQ and final closing block are separate visual phases within one section.

## 2. Controlling sources

Use these sources together:

- Governing workstream: `../WS5-SPEC.md`
- Ratified copy and communication job: `../WS4-SPEC.md`
- Funnel and CTA measurement contract: `../WS3-SPEC.md`
- Build-specification system: `README.md`

No external visual asset is required or approved for Section 7.

## 3. Exact page order

Use this exact order:

1. FAQ title.
2. Five general-product accordion rows.
3. Clear vertical separation.
4. Visually distinct final closing block.
5. Final CTA button.
6. Small reassurance line.

Do not merge the Section 6 privacy FAQ into this section.

## 4. FAQ title

Exact title:

`Frequently asked questions`

There is:

- no eyebrow;
- no supporting paragraph;
- no introductory marketing copy.

## 5. Exact FAQ questions and answers

### Question 1

Question:

`Do I need to start with a new tracker?`

Answer:

`No. Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab, so you do not have to rebuild your contact record or re-enter every relationship.`

### Question 2

Question:

`Can I use Blotter after recruiting has already started?`

Answer:

`Yes. Blotter is designed to work with an existing tracker and contact record, whether you are beginning recruiting or already managing an active process.`

### Question 3

Question:

`Does Blotter write emails or help with technical preparation?`

Answer:

`No. You choose who to contact and write every message yourself. Blotter does not generate outreach, teach technicals, or provide recruiting content. It maintains the logistics surrounding your process.`

### Question 4

Question:

`What happens when I add a new contact?`

Answer:

`Add the contact and their email address to your tracker. Blotter can then use relevant Gmail and Calendar activity associated with that contact to maintain their status, timing, scheduled calls, and next actions.`

### Question 5

Question:

`Does Blotter work only for investment banking?`

Answer:

`Blotter is designed first for investment banking and other high-finance recruiting processes built around intensive networking, follow-ups, coffee chats, applications, and interviews.`

## 6. FAQ composition

Use a centered content container approximately `900px` to `1000px` wide.

Each question is one full-width accordion row with:

- question aligned left;
- restrained plus or minus control aligned right;
- thin separators;
- answer appearing directly beneath the question;
- comfortable body-text measure;
- no individual card background;
- no category label;
- no decorative icon beside the question.

The FAQ should feel calm, compact, and practical rather than promotional.

## 7. Accordion behavior

Exact behavior:

- all questions are closed initially;
- only one answer may be open at a time;
- opening a question closes the previously open question;
- the entire question row is clickable;
- the control changes clearly between closed and open states;
- keyboard navigation and activation are supported;
- focus state is visible;
- semantic button and region relationships are used;
- any expansion transition is restrained and not required for comprehension;
- reduced-motion preferences are respected.

Do not use hover-only disclosure.

## 8. Price and availability exclusion

Do not add questions about price or availability.

Specifically omit:

- `How much does Blotter cost?`
- `When will access be available?`

Do not provide evasive replacements.

Price and availability remain disclosed only inside the canonical funnel:

- price appears after email capture;
- price is `$9.99 / month`;
- billing is monthly;
- the user may cancel anytime;
- Fall 2026 timing appears only in the terminal state after a payment-choice click.

## 9. Final closing block

The closing block appears after the FAQ with clear vertical separation.

Exact headline:

`Your recruiting tracker, always current.`

Exact supporting line:

`Keep your relationships moving without spending every day rebuilding the state of your process.`

Exact CTA label:

`See how Blotter works`

Exact reassurance line:

`Keep your existing Google Sheet. No mass outreach. No technical-prep content.`

## 10. Closing-block composition

Use a full-width or near-full-width centered closing panel.

Desktop treatment:

- deep neutral or navy background;
- light headline and supporting text;
- centered content;
- primary CTA centered beneath the supporting line;
- reassurance line beneath the CTA in smaller, quieter text;
- generous but controlled vertical padding;
- strong separation from the FAQ while remaining part of the same design system.

Do not add:

- an illustration;
- a spreadsheet visual;
- dashboard imagery;
- a secondary CTA;
- decorative trust badges;
- pricing or availability text.

## 11. CTA behavior and analytics

The final CTA enters the same canonical funnel as the hero and Section 4 CTAs.

Required property:

`cta_location = final`

The click begins or resumes the canonical funnel under the WS3 event rules. There is no separate `cta_clicked` event.

Do not create a unique final-CTA funnel.

## 12. Responsive posture

Desktop is the first approval target.

Tablet and mobile requirements:

- FAQ remains full width within the page margin;
- question and plus or minus control remain legible and aligned;
- answers use comfortable body-text sizing and line length;
- accordion touch targets are at least `44px` high;
- closing panel remains centered;
- CTA becomes full width or nearly full width where appropriate;
- reassurance line may wrap naturally;
- no horizontal scrolling;
- no content, question, answer, or CTA behavior is removed.

## 13. Explicit exclusions

Do not use:

- an eyebrow;
- FAQ supporting copy;
- price or availability questions;
- privacy questions already covered in Section 6;
- multiple simultaneously open answers;
- FAQ cards;
- question icons;
- hover-only interactions;
- a secondary CTA;
- price, beta, Fall 2026, cohort-size, payment, or email-capture copy in the closing block;
- an external visual asset.

## 14. Lovable handoff instructions

Provide Lovable with:

1. this build specification;
2. the Section 7 portion of `WS4-SPEC.md`;
3. the CTA and funnel rules in `WS3-SPEC.md`;
4. the shared page-shell and accessibility rules in `WS5-SPEC.md`.

Lovable must:

- reproduce the exact FAQ and closing copy;
- implement the one-open-at-a-time accordion behavior;
- preserve the exact final CTA label and `cta_location = final` property;
- avoid price and availability leakage;
- stop after the desktop Section 7 checkpoint unless broader implementation has been separately authorized.

## 15. Desktop acceptance criteria

Section 7 is ready for approval only when:

- the exact FAQ title is present;
- all five exact questions and answers are present in the correct order;
- no privacy, price, or availability question has been added;
- all accordion rows are closed initially;
- only one answer can be open at a time;
- the entire question row is operable by pointer and keyboard;
- visible focus and accessible state relationships are present;
- the page does not end on the accordion;
- the exact closing headline, supporting line, CTA, and reassurance line are present;
- the closing block is visually distinct and centered;
- there is no secondary CTA or illustration;
- the CTA enters the canonical funnel with `cta_location = final`;
- no prohibited pre-terminal price, beta, timing, or payment disclosure appears.

## 16. Remaining questions

No substantive desktop Section 7 questions remain.

Deferred bounded questions:

- final inter-section spacing in the complete page;
- final global responsive tuning during implementation QA;
- optional restrained motion consistent with reduced-motion support.

These do not reopen the ratified desktop system.

## 17. Ratification record

Jon ratified the complete Section 7 FAQ, accordion behavior, final closing composition, CTA treatment, responsive posture, no-asset decision, and exclusions on August 1, 2026.
