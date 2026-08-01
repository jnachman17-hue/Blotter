# WS5 Lovable Plan and Build Handoff

Date created and frozen: August 1, 2026  
Status: Ratified operating handoff  
Decision owner: Jon  
Governing specification: `../WS5-SPEC.md`

## 1. Purpose

This file explains, from start to finish, how the ratified Blotter spreadsheet landing page and canonical funnel move from GitHub into Lovable, how the build is staged, when lead storage and analytics are introduced, how visual assets are handled, and what must be verified before any public traffic.

This is the exact next-chat operating guide. It does not replace the surface build specifications, WS3, WS4, or WS5. It tells the implementation chat how to use them.

## 2. Current state

### Page and funnel decisions

- All seven landing-page sections are ratified.
- The hero and Sections 2 through 7 have binding WS5 build specifications.
- Section 4 and canonical funnel Frame 3 share one exact Outstanding Actions asset.
- The remaining funnel structure, exact copy, price, payment-choice simulation, terminal state, events, and measurement rules are already ratified in WS3 and WS4.
- No additional pre-Lovable storyboard or funnel visual-reference round is required.
- Funnel Frames 1 and 2 may be planned and implemented from WS3, WS4, the approved spreadsheet primitive, and the existing exact/directional references. If the Lovable plan identifies a real contradiction, implementation stops and the contradiction returns to Jon before code changes.

### Lovable project

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Workspace ID: `c31c8d1d4fa00d0fc8fc`  
Visibility: Private  
Published: No  
Current Lovable status: Ready foundation shell  
Current Lovable commit: `fa7af41199847b36ab8a14b55a767b93a8955968`

The current project contains a preliminary global shell, header, CTA component, reserved product-visual placeholder, accordion primitives, and standard UI components. It is not approved page implementation. Lovable must audit each existing file against the frozen packet and may retain, rewrite, or remove scaffolding only through the approved plan.

Project knowledge is currently empty. The first implementation-chat action is to install the frozen project knowledge from `LOVABLE-PROJECT-KNOWLEDGE.md`.

## 3. Source-of-truth rule

GitHub is the durable source of truth.

Use this authority order:

1. Jon's explicit later instruction.
2. `WS5-SPEC.md`.
3. The ratified build specification for the exact surface.
4. `WS4-SPEC.md` for page and funnel copy and experience rules not superseded by WS5.
5. `WS3-SPEC.md` for funnel, price, events, properties, measurement, and reporting.
6. `WS2-SPEC.md` for product boundaries.
7. Asset README and exact/directional asset.
8. Lovable plan, code, and chat output.

Lovable may propose implementation mechanics. It may not invent or alter product claims, copy, funnel steps, event definitions, asset authority, or page structure.

Any substantive proposed deviation must be:

1. identified explicitly;
2. brought back to Jon;
3. ratified;
4. written to GitHub before implementation continues.

## 4. Frozen implementation packet

### Core governing documents

Attach or otherwise provide Lovable with:

- `docs/workstreams/WS3-SPEC.md`
- `docs/workstreams/WS4-SPEC.md`
- `docs/workstreams/WS5-SPEC.md`
- `docs/workstreams/ws5-build-specs/README.md`
- `docs/workstreams/ws5-assets/README.md`
- this file
- `LOVABLE-PROJECT-KNOWLEDGE.md`

### Ratified surface specifications

- `01-HERO.md`
- `02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- `03-SECTION-3-HOW-BLOTTER-WORKS.md`
- `04-SECTION-4-OUTSTANDING-ACTIONS.md`
- `05-SECTION-5-PRESERVATION.md`
- `06-SECTION-6-DATA-AND-PRIVACY.md`
- `07-SECTION-7-FAQ-AND-FINAL-CTA.md`

### Visual assets

Directional hero input:

- `ws5-assets/hero/hero-reference-v1.png`
- `ws5-assets/source/blotter-sheets-reference-v1.html`

Formal exact Section 2 input:

- `ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.webp`
- supplemental HTML: `ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.html`

Formal exact Section 3 input:

- `ws5-assets/section-3/how-blotter-works-exact-v1.avif`

Formal exact Section 4 and funnel Frame 3 input:

- `ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`
- supplemental editable source: `ws5-assets/source/blotter-sheets-reference-v1.html`

Formal exact Section 5 input:

- `ws5-assets/section-5/preservation-exact-v1.html`

Sections 6 and 7 require no external visual asset.

## 5. How the files are passed to Lovable

The repository is private, so do not assume the Lovable agent can open GitHub paths directly.

The implementation chat must:

1. fetch the required markdown and asset files from GitHub;
2. upload each file through Lovable's file-upload workflow;
3. attach the uploaded files to the plan-mode message;
4. identify each asset's authority level in the message;
5. preserve original file names where practical so references remain obvious.

Lovable upload workflow:

1. request an upload URL and file ID for each file;
2. upload the file bytes to the returned URL;
3. attach the returned file IDs to the Lovable message;
4. verify the message lists the attachments before sending.

Do not substitute screenshots copied from chat when the exact repository asset exists.

## 6. Step-by-step process in plain terms

### Step 1: Reopen the existing private Lovable project

Confirm:

- project ID is correct;
- project remains private;
- it is not published;
- current commit is recorded;
- no unreviewed changes occurred since the handoff.

Do not deploy.

### Step 2: Install permanent project knowledge

Set the project knowledge to the exact contents of:

`docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

This gives every later Lovable run the same non-negotiable rules, including source hierarchy, no-public-deployment rule, asset authority, event boundaries, privacy gates, and checkpoint discipline.

Read existing project knowledge before replacing it. It was empty at packet freeze, but this must be rechecked in the next chat.

### Step 3: Upload the frozen packet and assets

Upload the governing documents, seven build specifications, asset index, this handoff, and all visual assets listed above.

For the first plan message, prioritize:

- this handoff;
- project knowledge;
- WS3, WS4, and WS5;
- all seven build specifications;
- asset index;
- all exact and directional visual files.

### Step 4: Send one plan-only message

Use Lovable plan mode.

The agent must make no code changes.

Ask Lovable to produce:

1. an audit of the existing shell and what should be retained, rewritten, or removed;
2. the reusable component architecture;
3. the seven-section page map;
4. the spreadsheet-component strategy;
5. exact asset-use strategy for every visual;
6. canonical funnel screen and state map;
7. event-transition map for all nine WS3 events;
8. lead-storage architecture and schema proposal;
9. analytics adapter design with vendor selection explicitly deferred;
10. responsive and accessibility approach;
11. privacy and claim-verification gates;
12. implementation phases and stop points;
13. every actual conflict or missing implementation fact;
14. confirmation that no product, copy, or measurement decision was invented.

Do not accept a plan that merely says it will build the page. It must map each requirement to a component, asset, state, event, and review gate.

### Step 5: Review and approve the plan

Compare the plan against:

- the seven build specifications;
- the asset authority index;
- WS3 event and funnel rules;
- WS4 exact copy;
- WS5 implementation sequence.

Classify every plan issue as one of:

- correct implementation detail;
- harmless bounded discretion;
- conflict with canonical record;
- genuinely missing decision.

Approve the plan only after conflicts are removed. If the plan exposes a real missing decision, resolve and document it in GitHub before coding.

### Step 6: Build the foundation only

After plan approval, send a separate implementation message for the foundation phase.

Foundation scope:

- global page shell;
- navigation;
- typography hierarchy;
- spacing system;
- section wrapper;
- CTA component with `cta_location` support;
- high-fidelity Google Sheets-style window primitive;
- spreadsheet grid, status chips, maintained-zone treatment, activity cues, connectors, and reusable asset wrappers;
- funnel shell and state model skeleton;
- analytics adapter interface with no vendor connected;
- no database provisioning unless separately approved.

Stop and review the desktop spreadsheet primitive before broad page implementation.

### Step 7: Build the landing page in checkpoints

Do not ask Lovable to build all sections in one uncontrolled run.

Recommended checkpoint sequence:

1. Hero.
2. Section 2.
3. Section 3.
4. Section 4 and shared funnel Frame 3 component.
5. Section 5.
6. Section 6.
7. Section 7.
8. Complete-page desktop rhythm and navigation.

At each checkpoint:

- send only the relevant build specification and asset context;
- require a preview;
- inspect the code diff;
- compare the rendered output against exact assets and acceptance criteria;
- approve or correct before continuing.

A later section may reuse an approved component. It may not silently change an earlier approved section.

### Step 8: Build the canonical funnel

After the landing-page desktop sequence is stable, build the funnel in its own phase.

Required flow:

1. CTA entry and origin capture.
2. Recruiting Question 1.
3. Recruiting Question 2.
4. Three-frame product experience.
5. Recruiting-email capture.
6. `$9.99 / month` price screen.
7. Purchase-summary screen.
8. Payment-choice buttons without card entry.
9. Fall 2026 terminal confirmation.

Rules:

- hero, actions, and final CTAs enter one shared funnel;
- `cta_location` persists through the funnel;
- one stable spreadsheet is used across the three product-experience frames;
- Frame 3 reuses the exact Outstanding Actions visual;
- no real OAuth;
- no real payment collection;
- no card fields;
- no pre-terminal beta, demand-test, future-availability, or no-charge disclosure;
- no extra funnel screens.

The funnel build stops for functional review before lead storage or analytics vendors are connected.

### Step 9: Add lead storage

Lead storage is not necessary during the visual foundation phase.

Add it after the funnel structure and email-capture behavior are approved.

Required lead fields:

- recruiting email;
- recruiting track;
- recruiting window;
- surface variant;
- CTA location;
- session or visitor identifier;
- timestamp;
- furthest funnel stage reached.

The simplest reliable option may be Lovable's project database backed by Supabase, but this is an implementation selection, not yet a ratified provider choice.

Before enabling a database:

1. inspect current database status;
2. present the proposed schema and privacy implications;
3. obtain approval;
4. provision only once;
5. verify export and idempotent updates.

Email belongs in lead storage only. Never send email addresses as general analytics properties.

### Step 10: Design analytics now, connect the vendor later

Analytics is handled in two layers.

#### During the foundation and funnel build

Build a provider-independent analytics adapter and call it at the exact state transitions.

The code should know the exact events and properties, but it should not hard-code an unapproved analytics vendor.

Exact events:

1. `page_viewed`
2. `funnel_started`
3. `recruiting_profile_completed`
4. `product_experience_completed`
5. `email_submitted`
6. `price_viewed`
7. `checkout_started`
8. `payment_option_clicked`
9. `beta_spot_confirmed`

No separate `cta_clicked` event exists.

#### After the visual and funnel behavior are stable

Select and connect the analytics provider.

The vendor must support:

- custom events;
- required properties;
- stable visitor and session identifiers;
- duplicate suppression or implementation that guarantees one milestone per visitor;
- source, campaign, device, and CTA-origin analysis;
- export or reliable reporting.

Lovable's aggregate site analytics may be useful for general published-site traffic, but it does not replace the nine-event contract unless it is explicitly verified to support the required custom events and properties.

Vendor choice remains an implementation decision. It must be approved before connection.

### Step 11: Connect analytics and verify event behavior

Once a provider is selected:

- connect the adapter;
- preserve exact event names and meanings;
- keep email out of analytics;
- ensure back navigation and refresh do not duplicate milestones;
- verify CTA origin persists;
- verify every event fires at the correct state transition;
- retain screenshots or logs of test payloads.

Do this before public traffic.

### Step 12: Responsive, accessibility, privacy, and claim QA

After desktop approval, adapt and test tablet and mobile.

Check:

- no page-level horizontal scrolling;
- readable spreadsheet and email treatments;
- all required responsive content remains present;
- keyboard-operable accordions and funnel controls;
- visible focus;
- `44px` minimum touch targets;
- reduced-motion support;
- semantic headings;
- clear form labels and errors;
- no hover-only meaning;
- sufficient contrast;
- logical reading order.

Verify before publication:

- case-study numbers and JPMorgan qualification;
- approximately 60-hour estimate and methodology;
- illustrative Goldman email framing;
- Gmail and Calendar processing claims;
- full-email-body retention claim;
- deletion and revocation claims;
- provider identity and role;
- exact Google scopes and consent-screen identity;
- subprocessors and privacy-policy disclosures.

Unverified claims may appear in a private build for layout review but cannot clear the public-release gate.

### Step 13: Use private preview, not public deployment

The Lovable project remains private and unpublished during WS5.

Use the editor preview for review and manual testing.

Do not call the production deployment action and do not route the public domain during this phase.

The spreadsheet page is not publicly launched until:

- the platform-page counterpart is ready under the matched test design;
- analytics and lead storage are verified;
- privacy and claim gates pass;
- the final launch workstream authorizes simultaneous traffic.

### Step 14: Manual verification

Run controlled test sessions from:

- hero CTA;
- Section 4 CTA;
- final CTA;
- desktop;
- mobile;
- each recruiting-track branch;
- each recruiting-window branch;
- each payment-choice button.

Compare browser behavior against:

- stored lead records;
- analytics events and properties;
- funnel state;
- visible terminal confirmation.

Repair every mismatch before traffic.

### Step 15: Close WS5 implementation

WS5 implementation is ready to close only when:

- the complete private spreadsheet page is visually approved;
- the canonical funnel works end to end;
- exact assets are faithfully reproduced;
- lead records are stored and exportable;
- all nine events are manually verified;
- responsive and accessibility QA pass;
- privacy and claims match implementation truth;
- the project remains private;
- GitHub records are reconciled for the next workstream.

## 7. Exact plan-mode message

Use the following substance in the first Lovable message. Attach the frozen packet and assets.

> You are beginning plan-only intake for the existing private Lovable project `Blotter Foundation`. Do not edit code. Read every attached governing document, build specification, asset note, and visual asset. GitHub's frozen packet is authoritative; existing Lovable code is provisional scaffolding.
>
> Produce a detailed implementation plan that: audits the existing code; maps all seven landing-page sections and the canonical funnel; defines reusable components; explains how every directional and formal exact asset will be handled; proposes the stable three-frame spreadsheet experience; maps all nine analytics events to exact state transitions; proposes provider-independent analytics and lead-storage architecture without selecting vendors; defines responsive and accessibility behavior; identifies privacy and claim gates; gives a phased build sequence with explicit stop-and-review checkpoints; and lists only genuine conflicts or missing implementation facts.
>
> Do not invent copy, claims, product behavior, funnel steps, events, properties, assets, or integrations. Do not publish, enable a database, connect analytics, implement real OAuth, or collect payment. Make no code changes in this run.

## 8. Review discipline

For every later Lovable implementation message:

1. name the exact phase;
2. identify the controlling specification;
3. attach the relevant assets;
4. state the stop condition;
5. wait for the agent to finish;
6. inspect the preview;
7. inspect the diff;
8. compare against acceptance criteria;
9. approve or correct;
10. record any substantive change in GitHub.

Do not use one giant build prompt. The checkpoint sequence is intentional.

## 9. What remains undecided

The following are implementation decisions to resolve during the governed build, not reasons to reopen page design:

- exact analytics vendor;
- exact lead-storage implementation;
- exact database schema mechanics beyond the required fields;
- session and visitor identifier implementation;
- provider identity for Google connections;
- exact Google scopes and consent-screen presentation;
- final retention, deletion, and subprocessor implementation truth;
- final responsive translations of complex exact assets;
- final domain route and public deployment timing.

These decisions must be documented and approved before their implementation or public use.

## 10. Exact next action for the next chat

1. Read `00-START-HERE.md` and `CURRENT-HANDOFF.md`.
2. Read this file and `LOVABLE-PROJECT-KNOWLEDGE.md`.
3. Reconfirm Lovable project status and current commit.
4. Reconfirm existing project knowledge before replacing it.
5. Set the approved project knowledge.
6. fetch and upload the frozen packet and assets;
7. send the plan-only Lovable message;
8. review the returned plan with Jon;
9. make no code changes until Jon approves that plan.
