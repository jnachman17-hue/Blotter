# Working agreement

Date last updated: July 30, 2026

Read this before substantive work. Most friction on this project has come from process errors rather than from bad execution.

## Communication rules

- Get to the substance quickly.
- Be direct.
- Push back when the method or assumption is wrong.
- Do not agree by default.
- Do not assert without checking.
- If a claim rests on an assumption, identify the assumption.
- Flag methodology problems before executing around them.
- Flag when two decisions do not compose.
- Establish the high-level shape before granular execution.
- Discuss and agree before producing a finished artifact when the brief is not settled.
- Do not reopen settled decisions unless they genuinely break something.
- Attribute Jon's ideas to Jon when they return.
- Park adjacent observations until the end of the current item.
- Warn before the context window saturates.

## Formatting rules

- No em dashes or en dashes in visible page copy.
- Prefer no em dashes or en dashes in project documents either.
- Documents should be glanceable.
- Use short sections and tables where useful.
- Avoid internal coaching notes inside deliverables.
- Avoid jargon unless the task requires it.

## Division of labor

Jon authors:

- Invented-credibility lines.
- Testimonials.
- Social proof.
- Claims about traction or user counts.
- Figures drawn from his own recruiting cycle.

AI assistant drafts:

- Page copy.
- Ad angles.
- Test designs.
- Analysis.
- Specifications.
- Build instructions.
- Documentation updates after decisions are settled.

## Technical context

Jon is non-technical. He communicates in product language, not code terms. Translate observations into technical diagnosis without asking him to use technical vocabulary.

When a tool's estimate seems wrong, challenge the tool before accepting the timeline.

In agentic coding contexts, prefer zero-interruption execution. Stop only when credentials or genuinely manual input are required.

## Canonical documentation system

The repository uses four distinct documentation layers.

### 1. Project index

`00-START-HERE.md` records:

- current phase and workstream;
- high-level project state;
- workstream sequence;
- major completed outcomes;
- canonical file map;
- immediate reading instructions.

Update it when the project changes workstreams, a major milestone is completed, or the high-level project state materially changes. It does not need to be rewritten after every minor ruling.

### 2. Workstream specifications

Every substantive workstream must have one durable specification file in:

`docs/workstreams/WS#-SPEC.md`

The active workstream specification is the permanent detailed record of that workstream. It must contain, as applicable:

- objective and scope;
- confirmed decisions;
- ratified processes and sequences;
- specifications produced;
- rationale and constraints needed for later execution;
- rejected or superseded directions that must not be revived;
- unresolved items;
- deferred items;
- downstream preservation requirements;
- exact next action while the workstream remains active.

A workstream specification is cumulative. Do not overwrite it with only the latest session summary. Preserve prior confirmed decisions unless Jon explicitly supersedes them.

### 3. Cross-project canonical files

Use the existing canonical files for durable information that crosses workstream boundaries:

- `01-project-and-product.md`: durable project and product context.
- `02-strategy-and-test.md`: validation strategy and test structure.
- `03-page-spec.md`: working page baseline, not automatically final truth.
- `04-decision-log.md`: concise confirmed or rejected cross-project rulings.
- `06-assumptions-and-open-questions.md`: unsettled items only.

The active workstream specification may contain more detail than `04-decision-log.md`. The decision log should remain a concise index of important rulings, not duplicate the entire workstream specification.

### 4. Immediate handoff

`CURRENT-HANDOFF.md` contains immediate resumption context only:

- current objective;
- work completed recently;
- decisions made recently;
- files changed;
- unresolved issues;
- exact next action;
- relevant repository or deployment state.

The handoff is expected to be overwritten. It must never be the only durable record of a confirmed decision.

## Live ratification rule

Whenever Jon explicitly ratifies, confirms, rejects, supersedes, or materially revises a proposal:

1. Treat the ruling as settled project information.
2. Before moving to the next substantive decision, update the active `docs/workstreams/WS#-SPEC.md` file.
3. Update `CURRENT-HANDOFF.md` so a new chat can resume from the new state.
4. Update `06-assumptions-and-open-questions.md` when the ruling resolves, narrows, rejects, or creates an open item.
5. Update `04-decision-log.md` when the ruling is important across future workstreams or needs concise project-level indexing.
6. Update `01-project-and-product.md` or `02-strategy-and-test.md` only when the ruling materially changes durable product context or validation strategy.
7. Update `00-START-HERE.md` when the ruling changes the high-level workstream state or project index.
8. Briefly confirm that the GitHub update completed before continuing.

Do not defer a batch of ratified decisions until the end of the chat unless GitHub access is unavailable.

If a GitHub write fails or times out, verify whether it landed before retrying or claiming completion.

## Workstream creation and closure

At the start of every new substantive workstream:

1. Create `docs/workstreams/WS#-SPEC.md` if it does not exist.
2. Record the workstream objective, boundaries, inherited constraints, unresolved items, and first exact action.
3. Add the file to the canonical file map in `00-START-HERE.md`.
4. Add it to the required reading in `CURRENT-HANDOFF.md`.

Before declaring a workstream complete:

1. Consolidate all ratified work into its workstream specification.
2. Remove or revise stale contradictory entries in `06-assumptions-and-open-questions.md`.
3. Add concise project-level rulings to `04-decision-log.md` where appropriate.
4. Record all downstream constraints and deferred items.
5. Mark the workstream specification complete.
6. Update `00-START-HERE.md` and `CURRENT-HANDOFF.md` for the next workstream.
7. Verify the relevant GitHub files after writing.

A workstream is not complete merely because the conversation ended. It is complete only when the durable specification and handoff state are current.

## Continuity process

At the end of each substantial chat or completed workflow, create or overwrite `CURRENT-HANDOFF.md`.

Rules:

- Canonical project documents and workstream specifications contain durable project truth.
- `CURRENT-HANDOFF.md` contains only immediate resumption context.
- The handoff must not duplicate the entire project history.
- A new chat should begin by reading `00-START-HERE.md`, `CURRENT-HANDOFF.md`, the active workstream specification, and only the other files relevant to the current workflow.
- Do not rely on GPT project memory or old chat context as the durable record.

## Session hygiene

- Track roadmap position when asked or when the session drifts.
- Log decisions as they are made.
- Keep the active workstream specification current after ratifications.
- End a session with documents updated where possible.
- Do not end with a vague promise to update documents later.

## Known failure modes to avoid

- Storing detailed decisions only in `CURRENT-HANDOFF.md`.
- Allowing workstream conclusions to disappear when a handoff is overwritten.
- Updating `00-START-HERE.md` without updating the active workstream specification.
- Leaving resolved items listed as open.
- Skipping an item after acknowledging it was open.
- Building a diagnosis on an unchecked assumption.
- Jumping to execution during a strategy discussion.
- Producing long option lists when a recommendation is needed.
- Assuming Jon understands every landing-page or technical term.
