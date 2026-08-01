# Blotter IB - Current Handoff

Date: August 1, 2026

## 1. Current objective

Begin the governed Lovable plan-only intake for the complete spreadsheet landing page and canonical funnel.

Workstreams 1 through 4 are complete. WS5 is active.

All seven landing-page sections are ratified:

1. Hero.
2. Scale and consequence.
3. How Blotter works.
4. Outstanding Actions.
5. Preservation.
6. Data and Privacy.
7. FAQ and final CTA.

The funnel architecture, exact copy, price, payment-choice simulation, terminal state, analytics events, and measurement rules are already ratified in WS3 and WS4.

The pre-Lovable build-specification and visual-reference packet is frozen.

Do not reopen page design or start another visual-reference round. Do not send a build prompt yet.

The exact next action is to load the permanent Lovable project knowledge, upload the frozen packet and assets, send one plan-only Lovable message, and review the returned plan with Jon before any code changes.

## 2. Required reading for the next chat

Read in this order:

1. `docs/00-START-HERE.md`
2. `docs/CURRENT-HANDOFF.md`
3. `docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`
4. `docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`
5. `docs/workstreams/WS5-SPEC.md`
6. `docs/workstreams/ws5-build-specs/README.md`
7. `docs/workstreams/ws5-assets/README.md`
8. `docs/workstreams/WS4-SPEC.md`
9. `docs/workstreams/WS3-SPEC.md`
10. `docs/workstreams/WS2-SPEC.md`
11. `docs/05-working-agreement.md`

Then read the seven ratified build specifications and relevant asset READMEs as needed.

## 3. Current Lovable project

Project: `Blotter Foundation`  
Project ID: `ec94e794-190a-4c92-b337-67ecfb8f1b10`  
Workspace ID: `c31c8d1d4fa00d0fc8fc`  
Visibility: Private  
Published: No  
Status at packet freeze: Ready  
Current foundation commit at packet freeze: `fa7af41199847b36ab8a14b55a767b93a8955968`

The project currently contains a preliminary shell, navigation, CTA component, reserved visual placeholder, accordion primitives, and standard UI components.

This code is provisional scaffolding. It is not approved page implementation.

Project knowledge was empty at packet freeze. Recheck it before replacing it.

## 4. Frozen landing-page specifications

- `docs/workstreams/ws5-build-specs/01-HERO.md`
- `docs/workstreams/ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- `docs/workstreams/ws5-build-specs/03-SECTION-3-HOW-BLOTTER-WORKS.md`
- `docs/workstreams/ws5-build-specs/04-SECTION-4-OUTSTANDING-ACTIONS.md`
- `docs/workstreams/ws5-build-specs/05-SECTION-5-PRESERVATION.md`
- `docs/workstreams/ws5-build-specs/06-SECTION-6-DATA-AND-PRIVACY.md`
- `docs/workstreams/ws5-build-specs/07-SECTION-7-FAQ-AND-FINAL-CTA.md`

All seven are marked `Ratified` and binding.

## 5. Frozen visual packet

### Directional hero input

- `docs/workstreams/ws5-assets/hero/hero-reference-v1.png`
- `docs/workstreams/ws5-assets/source/blotter-sheets-reference-v1.html`

The hero specification controls all required changes to the directional reference.

### Formal exact assets

- Section 2: `docs/workstreams/ws5-assets/section-2/goldman-sachs-rejection-email-exact-v1.webp`
- Section 2 supplemental HTML: `goldman-sachs-rejection-email-exact-v1.html`
- Section 3: `docs/workstreams/ws5-assets/section-3/how-blotter-works-exact-v1.avif`
- Section 4 and funnel Frame 3: `docs/workstreams/ws5-assets/outstanding-actions/outstanding-actions-reference-v1.png`
- Section 5: `docs/workstreams/ws5-assets/section-5/preservation-exact-v1.html`

### No external asset required

- Section 6.
- Section 7.
- conventional funnel question, email, price, purchase-summary, payment-choice, and terminal screens.
- funnel Frames 1 and 2 unless Lovable's approved plan identifies a real contradiction.

The former unified storyboard is inactive and must not be restarted.

## 6. Exact next-chat actions

### Action 1: Verify the project

Use Lovable to confirm:

- project ID;
- privacy status;
- unpublished status;
- latest commit;
- no unreviewed changes since packet freeze.

Do not deploy.

### Action 2: Verify and set project knowledge

Read current Lovable project knowledge first.

Set it to the exact contents of:

`docs/workstreams/ws5-implementation/LOVABLE-PROJECT-KNOWLEDGE.md`

Do not merge in unapproved existing instructions.

### Action 3: Upload the frozen packet

Lovable must not be assumed to access the private GitHub repository directly.

Fetch the required markdown and asset files from GitHub, upload them through Lovable's file-upload workflow, and attach the resulting file IDs to the plan-mode message.

Preserve original names where practical and identify each visual as directional, formal exact, or no-asset.

### Action 4: Send the plan-only message

Use `plan_mode = true`.

Require Lovable to:

- audit existing code;
- map all seven sections;
- map the complete funnel;
- propose reusable components;
- explain exact asset handling;
- define the stable three-frame spreadsheet experience;
- map all nine events to exact transitions;
- propose provider-independent analytics architecture;
- propose lead-storage architecture without enabling a database;
- define responsive and accessibility behavior;
- identify privacy and claim gates;
- give phased implementation and stop points;
- list genuine conflicts only;
- make no code changes.

Use the exact message substance in:

`docs/workstreams/ws5-implementation/LOVABLE-PLAN-AND-BUILD.md`

### Action 5: Review the returned plan

Bring the plan to Jon.

Compare it against:

- WS3;
- WS4;
- WS5;
- all seven build specifications;
- asset authority rules;
- the implementation handoff.

Do not authorize code until Jon approves the plan.

## 7. Implementation sequence after plan approval

The approved process is checkpointed:

1. Foundation and reusable Google Sheets primitive.
2. Hero.
3. Section 2.
4. Section 3.
5. Section 4 and shared funnel Frame 3 component.
6. Section 5.
7. Section 6.
8. Section 7.
9. Complete-page desktop rhythm.
10. Canonical funnel.
11. Lead storage.
12. Analytics provider selection and connection.
13. Responsive and accessibility adaptation.
14. Privacy and claim verification.
15. Manual lead and event verification.
16. Private WS5 completion review.

Each phase must have:

- a named controlling specification;
- relevant attachments;
- an explicit stop condition;
- preview review;
- code-diff review;
- acceptance-criteria review.

Do not use one giant whole-site build prompt.

## 8. Analytics in plain terms

Analytics is partly handled now and partly later.

During foundation and funnel implementation:

- create one provider-independent tracking adapter;
- wire calls at the exact nine state transitions;
- preserve exact names and properties;
- prevent duplicates;
- retain CTA origin;
- keep email out of analytics.

Do not choose or connect an analytics vendor during plan-only intake.

After visual and funnel behavior are stable:

- evaluate the analytics options against WS3 requirements;
- obtain approval for one provider;
- connect the adapter;
- manually verify every event before public traffic.

Lovable aggregate site analytics do not automatically replace the custom nine-event contract.

## 9. Lead storage in plain terms

Do not enable a database during plan-only intake or the first visual phase.

After the funnel and email-capture behavior are approved:

- propose the minimum database schema;
- review privacy implications;
- approve the storage implementation;
- provision once;
- store the required lead fields;
- verify export and safe updates.

Lovable's Supabase-backed database may be the simplest option, but it is not selected merely because it is available.

## 10. Privacy and provider rule

No Google connection provider has been selected.

Use only provider-agnostic language.

Before public release, implementation truth must support claims about:

- unmatched-message filtering;
- full-email-body non-retention;
- account deletion;
- connection revocation;
- Google scopes;
- consent-screen identity;
- unrelated Drive access;
- subprocessors and privacy policy.

Private layout review may use ratified copy. Public release may not use unsupported claims.

## 11. Deployment rule

Keep the project private and unpublished throughout WS5.

Use the private preview for review and testing.

Do not call production deployment and do not route the public domain.

Public launch waits for:

- the matched platform page;
- verified analytics and lead storage;
- passed privacy and claim gates;
- final simultaneous-launch authorization.

## 12. Definition of next-chat success

The next chat is successful when:

- the Lovable project state is verified;
- permanent project knowledge is installed;
- the frozen packet and assets are uploaded;
- a detailed plan-only response is returned;
- the plan is reviewed with Jon;
- no code has yet been changed.
