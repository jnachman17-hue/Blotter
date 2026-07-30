# Assumptions and open questions

Date last updated: July 30, 2026

This file contains unsettled items only. Items here are not settled decisions. Move an item out only after Jon explicitly confirms it or supersedes it.

| Item | Type | Current working position | Why unresolved | Revisit trigger |
|---|---|---|---|---|
| Non-paid channels are central, not supplementary | Provisional decision | Likely important because organic reach may change the economics of the test | More research and channel understanding needed | Before traffic plan is finalized |
| Corey reviews the test design before spend | Provisional decision | High leverage and low cost | Timing is unscheduled, and the requirement is not yet reconfirmed as a hard gate | Before any paid spend |
| Read rules | Open question | Read rules should be written before data exists | The rules themselves are still unwritten | Before traffic launches |
| Project kill condition | Open question | A kill condition may be useful before launch, but Jon feels less strongly about it than read rules | The exact threshold and whether it must be pre-written are unresolved | Before traffic launches or before results are interpreted |
| Analytics event list | Open question | Both pages must fire the identical event set | The event set has not been written or implemented | Before Lovable implementation or private deployment |
| Exact canonical funnel stages and order | Open question | Both pages will use the same multi-stage demand funnel, with multiple CTA placements entering one canonical flow | The exact stage sequence, field placement, integration simulation, price screen, and terminal disclosure are not yet settled | Next Workstream 3 decision |
| Exact CTA wording | Open question | Multiple CTAs may appear, and all primary CTAs must enter the same canonical funnel | Final wording belongs partly to Workstream 4, but the conceptual action must remain consistent with the funnel | Before page copy and wireframe |
| Exact monthly price | Open question | Round one will show one product at one monthly price and measure willingness to proceed to payment | The price itself has not been selected and is not being A/B tested | Before pricing screen and page copy are finalized |
| Banks and applications shown or excluded | Provisional decision | For the spreadsheet page, banks and applications appear off for now | Platform page content has not been thought through enough to confirm parity | Before platform page proposition and page spec |
| Feature cards use pictures rather than bullets | Open design question | Pictures may argue better than bullet lists | Design has not been thought through enough | Before feature-card copy and visual brief |
| Card count | Open test-design question | Card count should be set by what each page needs to argue | Potential conflict with identical event tracking if pages have different card structures | Before feature-card words are drafted |
| Spreadsheet grouped action areas | Product assumption | The sheet version likely needs grouped action areas or strong sorting | Spreadsheet layout is not yet settled | Before spreadsheet-native product proposition is finalized |
| Booked call suppresses follow-up prompts | Deferred product-logic item | Could matter in a real product | Too granular for the current validation stage | If backend product logic is designed after validation |
| Page specification overall | Working baseline | Existing page-spec file is a useful starting point | It was written as final, but Jon has reclassified it as subject to change | Before Lovable build |
| Hero composition overall | Working baseline | Existing hero direction is a useful starting point | It was written as final, but Jon has reclassified it as subject to change | Before landing-page build |
| Empty cells: blank versus dashed | Open page-spec conflict | `03-page-spec.md` says blank cells, while the updated decision log says dashed | Direct contradiction in low-level visual spec | Before hero/table build |
| Platform page argument | Open question | Capability was previously proposed, but platform preference might simply be UI preference if utility is similar | The platform page has not been honestly re-listed or argued yet | Before platform-page copy |
| Platform capability inventory | Open question | Calendar view and attachments may be too narrow | Inventory is unwritten | Before platform-page proposition |
| Tally for forms | Not actually a decision | Tally is a candidate if forms are needed | Form approach is not decided | If the CTA flow uses a form |
| Testing domain identity | Open question | GoDaddy domain exists, but disposable experiments may use either permanent Blotter identity or a neutral testing domain | Identity strategy is unresolved | Before deployment setup or public traffic |
| Method items in decision log | Needs Jon verdict | Likely meant as confirmed guardrails: do not extract percentages from Jon's tracker; use qualitative volume language only | The updated decision log did not attach explicit statuses to the Method section | Next decision-log cleanup pass |