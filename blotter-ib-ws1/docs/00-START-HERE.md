# Blotter IB — Start Here

Date last updated: 2026-07-30

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce market evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Validation design and landing-page proposition development.

The broader sequence is:

1. Define the spreadsheet-native product proposition and landing-page content.
2. Define the CTA, conversion goal, analytics architecture, and read rules.
3. Build and privately deploy the spreadsheet-native landing page.
4. Research and prepare acquisition.
5. Define and build the matched platform-version landing page.
6. Verify analytics and launch both versions at roughly the same time.
7. Use market evidence to continue, revise, retest, or kill the project.
8. Do not build meaningful backend functionality until market evidence guides it.

## Current workstream

Workstream 2: Define the spreadsheet-native product proposition.

Status: Ready to begin in the next substantive chat.

Workstream 1 is complete.

## Workstream 2 objective

Settle the high-level offer before writing final landing-page copy, defining analytics, or beginning the Lovable build.

Workstream 2 should resolve:

1. Target user and recruiting moment
2. Current behavior and failure mode
3. Spreadsheet-native product mechanism
4. Core user outcome
5. Offer and feature boundaries

## Current confirmed constraints

- Jon's explicit instructions in the active chat are highest authority.
- GitHub canonical docs are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- AI-generated project documents are working context unless confirmed by Jon or recorded as confirmed in the decision log.
- Build market evidence before meaningful product or backend buildout.
- Round one compares spreadsheet-native versus platform-version product surfaces.
- The spreadsheet-native landing page is built first.
- Spreadsheet and platform pages launch at roughly the same time.
- Both pages must fire an identical analytics event set.
- Analytics and read rules must be defined before traffic launches.
- Analytics must be verified by hand before paid traffic.
- `03-page-spec.md` is a working baseline, not final build-ready truth.
- The project stays focused on recruiting logistics, not interview preparation, learning content, AI outreach, or job boards.
- Do not begin Lovable implementation during Workstream 2.

## Immediate next milestone

Complete Workstream 2 by agreeing on a coherent spreadsheet-native product proposition.

The first decision is the target user and recruiting moment: whether the proposition is primarily aimed at a student entering active networking before tracker decay is felt, a student already losing control during networking, or a deliberately broader segment that includes both.

## Current blockers and deferred items

Blocks the spreadsheet-page build:

- Spreadsheet-native product proposition is not yet defined.
- CTA and lead-capture flow are not yet defined.
- Analytics event set and read rules are not yet written.

Deferred until later workflows:

- Platform-page argument and capability inventory
- Paid and organic acquisition plan
- Testing-domain identity
- Final visual design, logo, and Lovable implementation
- Project-level kill condition

## Repository and archive rules

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Historical archive path:

`blotter-ib-ws1/archive/`

The archive contains stale or superseded strategy, design, technical, and session-history material. Do not treat it as current truth or read it wholesale. Consult relevant archived files only when they can materially inform a current question, recover prior reasoning, or prevent duplicated work. Any recovered idea must be identified as historical context and re-evaluated against current confirmed decisions.

## Canonical file list

- `00-START-HERE.md` — current-state index
- `01-project-and-product.md` — project and product context
- `02-strategy-and-test.md` — validation strategy and test design
- `03-page-spec.md` — spreadsheet-page working baseline
- `04-decision-log.md` — confirmed decisions and statused rulings
- `05-working-agreement.md` — operating rules and continuity process
- `06-assumptions-and-open-questions.md` — unsettled assumptions and open questions
- `CURRENT-HANDOFF.md` — immediate resumption context for the next chat
