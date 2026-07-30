# Blotter IB — Current Handoff

Date: 2026-07-30

## 1. Session objective

Close the Workstream 1 continuity setup, verify direct GitHub access, create the legacy archive shell, and prepare a clean handoff into Workstream 2.

## 2. Work completed

- Verified that ChatGPT can directly read and write the GitHub repository.
- Confirmed GitHub canonical documents are the durable project source of truth.
- Confirmed Workstream 1 is complete.
- Corrected continuity defects in `00-START-HERE.md` and this handoff.
- Confirmed the repository is private after Jon updated its visibility.
- Created the historical archive structure under `blotter-ib-ws1/archive/`.
- Added archive authority rules, category folders, and a starter index.
- Jon uploaded relevant stale and historical materials into the corresponding archive folders.
- Established that archive material should be consulted selectively when it can inform a current question, recover prior reasoning, or prevent duplicated work.

## 3. Decisions made

- Workstream 1 is complete and should not be reopened as a separate maintenance exercise.
- Workstream 2 is the next sequential workstream.
- Workstream 2 is limited to defining the spreadsheet-native product proposition.
- Do not begin Lovable implementation, analytics architecture, platform-page work, paid-ad research, or detailed visual execution during the opening proposition discussion.
- Canonical `docs/` govern current work.
- The `archive/` directory is historical context only and never overrides canonical docs or Jon's current instruction.
- The assistant should proactively consult a relevant archived file when the current question materially benefits from prior work, but should not read the archive wholesale.
- Any archived idea reused in current work must be identified as historical context and re-evaluated against the validation-first strategy.

## 4. Files changed

- `blotter-ib-ws1/docs/00-START-HERE.md`
- `blotter-ib-ws1/docs/CURRENT-HANDOFF.md`
- `blotter-ib-ws1/archive/README.md`
- `blotter-ib-ws1/archive/INDEX.md`
- Category README files under:
  - `archive/product-and-strategy/`
  - `archive/landing-page/`
  - `archive/technical-and-design/`
  - `archive/session-history/`

Jon separately added historical files to the archive folders.

## 5. Unresolved issues

Workstream 2 must resolve:

- Target user and recruiting moment
- Current behavior and failure mode
- Spreadsheet-native product mechanism
- Core user outcome
- Offer and feature boundaries

Later unresolved items, not for the opening Workstream 2 discussion:

- CTA and lead-capture flow
- Analytics event set and measurement architecture
- Read rules and statistical methodology
- Testing-domain identity
- Platform-page proposition and capability inventory
- Acquisition strategy
- Project-level kill condition

## 6. Exact next action

Begin Workstream 2 by resolving the first proposition decision:

**Who is the primary spreadsheet-native landing-page user, and at what point in the recruiting process do they encounter the offer?**

The starting alternatives are:

1. A student entering active networking who already has or is about to create a tracker but has not yet experienced serious tracker decay.
2. A student already several weeks into networking who is beginning to lose control of live relationships and spreadsheet state.
3. A broader proposition intentionally written to cover both moments without becoming vague.

Discuss and agree on this first. Do not present the entire workstream at once.

## 7. Relevant links, files, and project state

Repository:

`https://github.com/jnachman17-hue/Blotter-GPT/tree/main/blotter-ib-ws1`

Canonical docs path:

`blotter-ib-ws1/docs/`

Archive path:

`blotter-ib-ws1/archive/`

Read first in the next chat:

- `docs/00-START-HERE.md`
- `docs/CURRENT-HANDOFF.md`

Then read the Workstream 2 canonical files:

- `docs/01-project-and-product.md`
- `docs/02-strategy-and-test.md`
- `docs/03-page-spec.md`
- `docs/04-decision-log.md`
- `docs/06-assumptions-and-open-questions.md`

Deployment and build state:

- No Lovable project exists yet.
- No reusable production code exists.
- No final logo exists.
- No completed landing-page assets exist.
- A GoDaddy domain exists, but testing-domain identity remains unresolved.
- Spreadsheet page will be built first but will not launch publicly before the matched platform page is ready.
