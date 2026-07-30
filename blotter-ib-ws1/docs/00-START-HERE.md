# Blotter IB — Start Here

Date last updated: 2026-07-29

## Project objective

Blotter is being developed through a Build-Measure-Learn validation process for investment banking recruiting logistics.

The immediate objective is to test whether meaningful demand exists before building meaningful backend functionality. The project should produce market evidence about demand, preferred product surface, valued features, and willingness to pay before further product buildout.

## Current phase

Validation setup.

The broader sequence is:

1. Build the spreadsheet-native landing page.
2. Define and implement analytics.
3. Test and privately deploy it.
4. Research and prepare paid acquisition.
5. Build the matched platform-version landing page.
6. Launch both versions simultaneously.
7. Use analytics and market evidence to determine whether to continue, revise, or kill the project.
8. Do not build meaningful backend functionality until market evidence guides it.

## Current workstream

Workstream 1: Minimum viable project maintenance and continuity setup.

Status: Complete once `CURRENT-HANDOFF.md` is updated and committed.

## Current confirmed constraints

- User instructions in the active chat are highest authority.
- GitHub canonical docs are the durable source of truth.
- GPT project memory is a convenience layer, not final authority.
- Claude-generated or AI-generated project documents are working context unless confirmed by Jon or recorded as confirmed in the decision log.
- Build market evidence before meaningful product/backend buildout.
- Spreadsheet-native landing page is built first.
- Spreadsheet and platform pages should launch at roughly the same time for a valid surface comparison.
- Analytics/read rules must be defined before traffic is launched.
- Analytics must be verified by hand before paid traffic.
- `03-page-spec.md` is a working baseline, not final build-ready truth.
- The project should stay focused on recruiting logistics, not interview prep, learning content, AI outreach, or job boards.

## Immediate next milestone

Begin Workstream 2:

Define the spreadsheet-native product proposition and landing-page content before beginning the Lovable build.

Analytics architecture is necessary but temporarily parked. It must be addressed before implementation begins.

## Current blockers

- Spreadsheet-native product proposition and landing-page content are not yet defined.
- Analytics/read rules are not yet written.
- Hard kill criteria are not yet decided.
- Platform-page argument and feature inventory remain unresolved.
- Assistant direct GitHub access has not been verified in the current chat, although GitHub indexing has been confirmed.

## Canonical file list

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Files:

- `00-START-HERE.md` — current-state index
- `01-project-and-product.md` — project/product context
- `02-strategy-and-test.md` — validation strategy and test design
- `03-page-spec.md` — working page specification baseline
- `04-decision-log.md` — confirmed decisions and statused rulings
- `05-working-agreement.md` — operating rules and continuity process
- `06-assumptions-and-open-questions.md` — unsettled assumptions and open questions
- `CURRENT-HANDOFF.md` — immediate resumption context for the next chat
