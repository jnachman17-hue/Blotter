# Page specification, spreadsheet version

Date last updated: July 29, 2026

Status: working baseline, not final build specification.

This file is a starting point for the spreadsheet-native landing page. It should not be treated as fully ruled or build-ready. Any item here can change during the next workflow unless it is separately confirmed in `04-decision-log.md`.

Build tool: Lovable.

## Current use of this file

Use this file to preserve prior thinking and avoid starting from zero. Do not use it to force final copy, final layout, final hero logic, final CTA flow, or final analytics implementation.

Before Lovable build, resolve at minimum:

- Spreadsheet-native product proposition.
- Page headline, subhead, paragraph, and feature-card content.
- CTA and lead-capture flow.
- Analytics event set.
- Whether price appears anywhere in round one.
- Whether banks or applications appear on the spreadsheet page.
- Whether feature cards use pictures, bullets, or another format.
- Card count and event-tracking parity.
- Empty-cell treatment: blank versus dashed.

## Preserved working baseline

The prior page-spec direction remains useful as a baseline:

- The page presents a spreadsheet-native version first.
- The product argument is preservation plus automatic state maintenance.
- The hero likely shows a cleaner automated Blotter tab layered over the old networking tracker.
- The visual should feel like a refined spreadsheet, not a generic SaaS dashboard.
- The old tracker should look like the sheet the student was given, not a sheet they personally ruined.
- The table should distinguish manual fields from automated fields.
- Next move is likely the key automated column because it expresses the product's value most directly.

## Status vocabulary, working baseline

Potential statuses from prior work:

| Status | Working meaning | Example next move | Working colour |
|---|---|---|---|
| Not contacted | Contact exists, no outreach yet | Send intro email | Gray |
| Sent | Outreach sent recently, nothing required yet | Blank or none | Gray |
| Bump due | Waiting threshold has passed | Bump the thread | Red |
| Replied | Banker responded and student owes something | Reply to Sarah | Green |
| Call scheduled | Call is on calendar and no email action takes priority | Prepare for call | Blue |
| Call done | Call happened and follow-through remains | Send thank-you | Amber |
| Concluded | Conversation ended cleanly | Blank or none | Gray |
| Gone quiet | Multiple attempts, no response | Blank or none | Gray |

Open: threshold between Sent and Bump due.

Open: whether these exact statuses should appear in the landing-page hero.

## Table layout, working baseline

Potential column split:

| Manual zone | Automated zone |
|---|---|
| Name | Next move |
| Title | Status |
| Firm | Last contact |
| Optional other manual fields | Days |
|  | Call |

Working visual idea: the visitor should see that the student fills in the record once, and Blotter maintains the live state.

Open conflict: empty cells. Prior page spec said blank cells. The updated decision log says dashed cells. Resolve before build.

## Hero composition, working baseline

Potential structure:

- Large foreground clean sheet.
- Messier old networking sheet partially visible behind it.
- Google Sheets tab strip showing the old tab preserved and the Blotter tab active.
- No Gmail element inside the hero image unless the CTA flow is later confirmed and a visual reason appears.
- Static first. Motion optional later.

This is a working baseline only.

## CTA and screen-behind-click

Unresolved.

Earlier work assumed a Connect Gmail button and a two-step flow with email captured behind the click. Jon has now classified that as not actually decided.

Do not implement a Connect Gmail flow, email capture screen, or form provider until the CTA flow and analytics event set are explicitly decided.

Any auth-adjacent screen must avoid Google marks, Google-like layout, or anything that could look like a fake login.

## Aesthetic constraints

Working baseline:

- Calm, finance-literate, quiet.
- Avoid gamification, streaks, generic AI marketing tropes, badge mechanics, and loud productivity-dashboard styling.
- Demo copy must not depict the user manually doing something Blotter claims to automate.
- No visible page copy should use em dashes or en dashes.
