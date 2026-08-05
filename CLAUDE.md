# Blotter — Working Agreement

## Design authority

**The markdown spec files in this repository are authoritative for all design decisions.**

The specs live under `blotter-ib-ws1/docs/` — notably the page spec, the build specs in
`docs/workstreams/ws5-build-specs/`, the decision log, and the working agreement.
When a design question has an answer in the specs, that answer governs. Do not substitute
judgment, convention, or outside guidance for a spec that already decides the matter.

## Skills serve the spec

The skills in `.claude/skills/` are **invoked autonomously, whenever they help execute the spec.**
Do not wait to be asked. If a skill would produce better work on the task at hand, reach for it.

- **Announce every invocation in one line** — name the skill and why it applies.
- **Skills serve the spec; they never override it.** A skill may inform anything the spec
  leaves open. It may not change anything the spec has already decided — not without asking
  me first and getting a yes.

## Handling conflicts

When a skill's guidance conflicts with the spec: **follow the spec, and surface the conflict.**

Cite the governing spec section by file and heading, state what the skill recommended, and say
plainly that the spec governs. Do not silently pick a side, and do not split the difference.
