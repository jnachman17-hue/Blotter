# Assumptions and open questions

Date last updated: July 30, 2026

This file contains unsettled items only. Confirmed decisions belong in the relevant workstream specifications.

| Item | Type | Current working position | Why unresolved | Revisit trigger |
|---|---|---|---|---|
| Provider, Google scopes, and consent-screen identity | WS5 implementation dependency | Use only provisional third-party-provider wording until the selected provider and exact Google presentation are verified | Provider and implementation are not selected | Before privacy copy is approved in the private build |
| Data retention, deletion, subprocessors, and privacy policy | WS5 implementation dependency | Public claims must match actual prototype and provider behavior | Implementation truth is not yet established | Before private-build approval |
| Form and lead-storage implementation | WS5 implementation decision | Use the simplest reliable system that stores the required lead record and supports export | No tool has been selected | During funnel implementation |
| Analytics vendor and session behavior | WS5 implementation decision | Preserve the exact WS3 event names, meanings, and properties regardless of vendor | Vendor, duplicate suppression, refresh, and persistence behavior are not selected | During instrumentation setup |
| Domain routing | WS5 implementation decision | Displayed brand is Blotter on `blotterib.com`; use a private deployment before public routing | Exact Lovable routing and final path or subdomain require implementation validation | Private deployment setup |
| Authority and case-study evidence verification | WS5 claim gate | Preserve ratified lines only if source records support the exact wording | Final factual documentation has not been checked in implementation | Before private-build approval |
| Permission willingness | Later validation question | Actual or simulated OAuth is excluded from the mandatory round-one funnel | Permission willingness should be tested after value and privacy are understood | Later validation iteration |
| Non-paid channels are central, not supplementary | Provisional strategy item | Organic reach may materially affect test economics | More channel research is needed | Before traffic plan is finalized |
| Corey reviews the test design before spend | Provisional process item | Potentially high leverage and low cost | Timing and hard-gate status are not reconfirmed | Before paid spend |
| Platform page argument | WS7 question | Platform preference may reflect cleaner interface preference rather than added capability | Platform proposition has not been redefined | Workstream 7 |
| Platform capability inventory | WS7 question | Existing inventory may be too narrow | Inventory is unwritten | Workstream 7 |
| Banks and applications on platform page | WS7 question | Spreadsheet page does not need them | Platform scope remains unsettled | Workstream 7 |
| Booked call suppresses follow-up prompts | Deferred product-logic item | Demo may avoid contradictory rows without defining production logic | Too granular for current validation | If backend logic is designed after validation |
