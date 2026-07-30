# Assumptions and open questions

Date last updated: July 30, 2026

This file contains unsettled items only. Items here are not settled decisions. Move or revise an item immediately after Jon confirms, rejects, supersedes, or materially narrows it. Detailed confirmed Workstream 2 and Workstream 3 decisions live in their workstream specifications.

| Item | Type | Current working position | Why unresolved | Revisit trigger |
|---|---|---|---|---|
| Read rules | Open question | Read rules must be written before data exists | Metric hierarchy, thresholds, low-sample treatment, and conflicting-signal treatment remain unwritten | Exact next Workstream 3 task |
| Project kill condition | Open question | A hard project-level kill condition may be useful, but is less clearly required than precommitted read rules | Whether it must be written before launch and its threshold are unresolved | Before Workstream 3 closes or results are interpreted |
| Exact monthly price | Open question | Round one shows one product at one monthly price inside the funnel; price is not the tested variable | The dollar amount has not been selected and is currently largely arbitrary | Before checkout implementation, unless deliberately deferred to Workstream 4 or 5 |
| Exact CTA wording and placement | Deferred design question | All primary CTAs enter one canonical funnel and origin is tracked through `cta_location` | Final wording and placement belong to page design | Workstream 4 |
| Exact product-experience frames | Deferred design question | One concise, click-to-progress experience occurs before email capture and lasts about 15 to 20 seconds maximum | Exact frames, clicks, demo states, and hero relationship are design decisions | Workstream 4 |
| Final checkout and terminal copy | Deferred copy question | Checkout mechanics and cohort commitment are settled conceptually | Final public wording is not written | Workstream 4 |
| Permission willingness | Later validation question | Actual or simulated OAuth is excluded from the mandatory round-one funnel | Permission willingness should be tested after users understand value and privacy boundaries | Later validation iteration |
| Non-paid channels are central, not supplementary | Provisional decision | Likely important because organic reach may change test economics | More research and channel understanding are needed | Before traffic plan is finalized |
| Corey reviews the test design before spend | Provisional decision | High leverage and low cost | Timing is unscheduled and the requirement is not reconfirmed as a hard gate | Before paid spend |
| Banks and applications shown or excluded | Provisional page decision | For the spreadsheet page, banks and applications appear off for now | Platform page content is not settled | Before platform-page proposition and page specification |
| Feature cards use pictures rather than bullets | Open design question | Pictures may argue better than bullet lists | Design has not been settled | Workstream 4 |
| Card count | Open test-design question | Card count should support each page's argument while preserving comparable measurement | Potential conflict if pages use materially different structures | Workstream 4 before feature-card copy |
| Spreadsheet grouped action areas | Product and design assumption | The spreadsheet version likely needs grouping, sorting, filtering, or another action-focused treatment | Exact interface remains unsettled | Workstream 4 |
| Page specification overall | Working baseline | `03-page-spec.md` is a useful starting point | It was reclassified from final to working baseline | Workstream 4 |
| Hero composition overall | Working baseline | Existing hero direction may be useful | It is not final or automatically binding | Workstream 4 |
| Empty cells: blank versus dashed | Open page-spec conflict | Existing files conflict | Low-level visual decision is unresolved | Workstream 4 before table build |
| Platform page argument | Open question | Platform preference may reflect cleaner interface preference rather than additional capability | The platform proposition has not been honestly redefined | Workstream 7 |
| Platform capability inventory | Open question | Existing inventory may be too narrow | Inventory is unwritten | Workstream 7 |
| Tally for forms | Not a decision | Tally remains only a candidate | Form implementation is not selected | Workstream 5 if needed |
| Testing domain identity | Open question | A GoDaddy domain exists, but a neutral testing identity may still be useful | Identity strategy is unresolved | Before deployment or public traffic |
| Booked call suppresses follow-up prompts | Deferred product-logic item | Could matter in a real product | Too granular for current validation | If backend logic is designed after validation |
