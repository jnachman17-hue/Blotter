# Blotter IB Roadmap – Single Living Operating Document

**Document status:** LIVE. This document is edited, never superseded. Every close, open, or re-sequence gets a dated changelog entry (§5). Created: July 15, 2026. Last edited: **July 23, 2026 (session 16 – M4 verification verdict, hero re-anchor to Surface 2, build-spec v3).**

**Role:** Decision register, research register, workstream sequencer, and to-do source of truth in one document.

**Parent:** strategy-reset.md (July 14, 2026) – the strategy source of truth, EXCEPT where D4/D10 record the s4 override of the manual-$20 bet. Nothing here re-litigates it; this document sequences it.

**Companions:** feature-inventory.md – **RATIFIED July 17, 2026 (D2 CLOSED, session 5). THE product document; sole product authority.** phase-1-decisions-spec.md, queue-spec.md, and schema-spec.md – SUPERSEDED IN FULL and DELETED (s5); surviving technical conventions live as input notes inside the inventory for the rebuilt spec pack. **design-brief.md – NEW s7: the living design authority** – records the design pipeline (stages 0–5), toolchain rulings, and every ratified rendering decision for the three surfaces; downstream of the inventory (mechanism ≠ rendering: the inventory rules mechanics, the brief rules rendering); edited/replaced at session end exactly like this document. **motion-mock-plan.md – the demo script and, in Part B, the SOLE CONTENT AUTHORITY for every string rendered on any demo or marketing surface** (Part A = beat script, active scope A1; Part B = the fixture dataset; Part C = a dead Framer build order retained as a tombstone plus the surviving acceptance pass). **option-2-build-spec.md – the active build instruction set for the Claude Code landing-page session; an execution input, not a living document; retired once the build's delta is merged.** ideas.md – parked concepts, read-only, no debts.

**Standing process rules (inherited + amended July 16):** methodical, itemize and agree before executing; no artifacts without agreed scope; decisions captured in documents immediately; en dashes, not em dashes; flag accuracy/methodology problems proactively; planning-Claude and Claude Code are distinct roles; verify claimed work against actual filesystem state – the person and the filesystem outrank any document, including this one. Inventory/sitting sessions run as plain-English discussion per concept cluster (options, trade-offs, decide, record) – not ballot-style ratification. **Registry rule (RATIFIED s12, CLARIFIED s14): this planning project is the SOLE registry – living documents are edited here and only here. Execution happens in separate live sessions (Claude Design, and now Claude Code build sessions); each ends with a delta/handoff file, and no new execution session opens until the prior delta is merged into the living documents here. Execution tools fork files (hash-suffixed copies) and must never be treated as document authority; forked copies are deleted at merge.**

**Added s14 (standing, no exceptions):**

- **Plain language (PROCESS).** The coded shorthand became opaque to its own owner. Every code (D6, S3, R4, WS-B…) is defined in words on first use, in every document and every session prompt. This document carries the glossary below.
- **The tracker is not a statistics source.** `IB_Network__Application_Tracker.xlsx` is a **failure-mode reference only** – never cited for volume, rate, or any aggregate statistic, on any surface. Its numbers are the residue of the failure it documents (44 logged emails against a real 500+); citing them would understate the problem by an order of magnitude while wearing the costume of evidence. The one surviving claim needs no data: **you cannot measure what your tracker missed with your tracker.** *Assistant note: proposing tracker-derived statistics is a repeat-error class. Do not recur.*
- **Owner-supplied figures are authoritative.** Figures from the owner's model or domain research are accepted as given and used without hedging or re-sourcing. *(Scope caution logged s15 – see §1b/F2. This rule governs internal planning without qualification; its application to public-facing copy carries a separate risk the owner should rule on explicitly.)*
- **When an estimate balloons, challenge the TOOL before accepting the timeline.** An estimate that explodes is a tool-choice alarm, not a schedule. Logged s14 after the Framer reversal: a 30–50 hour figure was carried as a plan for two sessions instead of being read as evidence that the tool was wrong.
- **Two ratified rulings that don't compose get flagged explicitly, never papered over.**

---

## GLOSSARY – PLAIN LANGUAGE (added s14; read first)

Codes exist for brevity in a register, not to obscure. Every one is defined here and again on first use in any session.

| Code | In plain words |
|---|---|
| **D1–D11** | Numbered decisions in the register (§1). **D3** = is the existing build salvageable · **D4** = what ships in September · **D6** = landing page content + the signup ask · **D7** = social platform, cadence, kill date · **D10** = pricing and how the paywall works · **D11** = the two-version behavioral test (platform vs. a spreadsheet companion) |
| **R1–R9** | Numbered research items (§2). **R4** = which coding tools build the product · **R9** = the hunt for automated recruiting sender domains |
| **WS-A … WS-F** | Workstreams (§3): naming/landing · inventory & design · product build · Gmail capture · distribution · project hygiene |
| **Stages 0–5** | The design pipeline: 0 references · 1 design tokens · 2 product screens · **3 the demo animation** · **4 the landing page** (3 and 4 merged s14 into one build) · 5 static and social assets |
| **S1–S5** | The five scroll-driven segments of the demo film. **Deferred s14** – held in motion-mock-plan Part A, revived only on conversion evidence |
| **M1–M5 / M4R1–M4R4** | Two different things, always disambiguated: the **product's** five build milestones (built, deployed at p-ib.vercel.app, poor UI) and the **landing page build's** milestones in `option-2-build-spec.md` – landing M1–M3 complete and verified; the v2 M4 loop superseded s16; the rework runs **M4R1 → M4R2 → M4R3 → M4R4 → M5**, same one-milestone-per-verify protocol |
| **Capture** | The product watching Gmail and Calendar and updating itself, so the student never does data entry. The entire commercial argument |
| **The three surfaces** | Surface 1 = Daily Queue (the homepage) · Surface 2 = the CRM · Surface 3 = the Calendar |
| **Ring 1 / Ring 2** | Ring 1 = header-only matching across the whole inbox · Ring 2 = reading the body of Ring-1-matched mail only |
| **Pour** | Rewriting a file's content strings to match Part B, touching no pixels |
| **Delta** | The document an execution session produces, merged here before anything else opens |

---

## §0 – NOW

The currently unblocked actions. Nothing else belongs here. **Recomputed s16 after the M4 verification verdict.**

1. **BUILD REWORK SESSION – Claude Code, next (Jon).** Execute **`option-2-build-spec.md` v3** against the existing deploy. State: landing M1 (queue extraction) · M2 (page skeleton) · M3 (Gmail panel) complete and owner-verified; the v2 M4 hero loop is **SUPERSEDED** (spec defect, s16 – see §1c and the changelog) and its GSAP timeline is discarded, nothing else. The hero re-anchors to **Surface 2** (5a contacts list, row-cropped, + Sarah's 12c panel): reply lands → pill flips blue → amber → interaction writes itself → queue card arrives as the closing peek. Rework milestones **M4R1 (CRM hero static) → M4R2 (Gmail rework: left entry, panel scale) → M4R3 (the loop) → M4R4 (features tabs) → M5 (passes)**, one per in-browser verify, noindex stays throughout. **Deliverables: the reworked page live on Vercel + a delta document per §8.** Session-open prompt issued s16 (pointer-only, per the standing pattern).
2. **Merge the rework delta** – first order of business in the planning session that follows. Dataset deviations are flagged prominently and trigger a re-pour check on `stage-2-index.html`. **Two owner-verify items ride inside the build: the features-tab pour (post-capture recommended – Sarah found in the queue where the hero left her) and any trim of the H4 hold (never without an explicit ruling).**
3. **D6 sitting – the landing page's words and the signup ask.** Scope ruled (§1). Blocks nothing in the build (that was the point of the sequencing correction) but blocks the page going live to real traffic: final copy, the waitlist form's backend, the privacy claim and the privacy policy all land here.
4. **D7 sitting – social platform, cadence, kill date.** Sits with or immediately after D6. **Now also carries the Stage 5 toolchain question** (design-brief §5 – Framer's death left static/social assets with no ruled tool).
5. **D11 check – confirm or defer explicitly.** Do not leave it drifting. If it is live, the decision rule must be pre-registered *before any traffic flows*. **Cost note added s15: under Option 2 a second variant needs a second animated hero, which is exactly the expensive-before-evidence pattern the scope staging rejected. A cheap-variant design, or an explicit defer, is the honest choice.**
6. **Housekeeping – ELEVATED, do this before sharing anything.** `IB_Network__Application_Tracker.xlsx` contains what appears to be a live credential: the string `NewYork310!` in the Company column, **verified s15 at 20 cells**, adjacent to an email address. The file is in project memory now. Scrub or rotate before the file is shared, attached, or retained further.
7. **Salvage access (D3).** Unchanged – Jon provides screenshots or repo access. Still swings the calendar by up to 4 weeks and gates D4's formal close and the parked onboarding work. Runs in parallel; does not block the marketing track.
8. **Vendor answers.** Nylas reply still awaited (email sent July 16 – **now a week without reply**). Ask is final-form; one deciding question (read-only trimming under vendor credentials). R3 pricing open. A follow-up email is overdue.
9. **PARKED until build phase:** onboarding screen sequence, guided-entry walkthrough, Flag 2, mid-cycle onboarding (s6 split); D10 (de-elevated s7); the v0/Bolt/Claude Code bake-off (R4 – **now partially pre-empted, see §2**); quick-add popover + calendar manual-add popover renders (s12).

**Closed and off this list:** Stage 3 as a separate Framer asset (killed s14) · Stages 0/1/2 (closed s8/s9/s11–s12) · the Framer import test (mooted).

---

## §1 – DECISION REGISTER

Format per entry: what it is / what it blocks / what closes it / owner / status.

### D1 – Product name

CLOSED 2026-07-15. Name: **Blotter IB**. Domain blotterib.com secured; LinkedIn handle created. "Blotter" = trading desk's daily log of activity, matching the daily view; IB suffix accepted as vertical positioning; multi-brand path implied for later verticals. Not to be reopened.

### D2 – Feature inventory ratified (KEYSTONE) – CLOSED

**CLOSED 2026-07-17 (session 5). Binding declaration ratified by owner: feature-inventory.md is THE product document – sole authority on what Blotter IB is; every mechanic in it ratified; anything not in it does not exist; new features fight in against the Group 1 beachhead; downstream documents (design tokens, design spec, rebuilt spec pack, CLAUDE.md) derive from it and never contradict it; where reality and the inventory disagree, reality wins and the inventory gets fixed.**

Close checklist executed s5: **(1) D9 final pass** – five residue items ruled (section-6 tie-break translated and absorbed; no-learning-content wall; LinkedIn extension killed; referral tree killed; palette confirmed dead); phase-1-decisions-spec.md deleted. **(2) Spec-status resolution** – queue-spec.md + schema-spec.md superseded IN FULL and deleted; four surviving mechanics ruled in (within-section ordering for all six sections; silence suppression with intelligent-pause-detection deliberately declined; terminal mutual-exclusion + always-reversible terminals; R9 registered); housekeeping kills recorded (seeded tags, tag-driven template selection, bounce-retry loop, voice-memo stray, onboarding-intake framing); technical conventions carried as rebuilt-spec-pack input (RLS-everywhere, computed-at-read, day math, nullable obligation dates, derivability audit); copy style rules carried to design spec. **(3) Data-dependency determination** – ruled: three grants (envelope check whole-inbox / content on matched only / calendar read-write-nothing), deliberate absences (no send, no Drive, no calendar write, no contacts), facts-only retention. The D4 vendor ask is final-form. **(4) Binding declaration** – ratified.

Unblocked by this close: design token spec → design spec → landing page chain; rebuilt spec pack authoring (with design spec); CLAUDE.md rewrite (written LAST); honest timeline once D3 lands.

Honest scorecard recorded at close: D2 closing means the THINKING is done, not that September is safe – the calendar now depends on D3's verdict, the Nylas/Unipile decision, and the token/design-spec sessions moving at pace. The critical path runs through design now, not decisions.

### D3 – Salvage verdict on M1–M5

- Unchanged: is the existing build structurally sound with a bad surface, or structurally wrong? The 4-week swing on the calendar.
- Also gates: formal D4 close (capture integration and a possible rebuild compete for the same seven weeks); the build decomposition plan (§4).
- Status: OPEN – access is a §0 item.

### D4 – September launch scope: manual vs. Gmail-capture-at-launch

- **Amended 2026-07-16: capture-first adopted as STATED INTENT.** Build proceeds developing against the intermediary sandbox from the start.
- Contingency: manual "I sent it ✓" / "They replied ✓" buttons remain the parachute – if integration slips, the product launches manual and the buttons fill the gap until capture lands.
- **Amended s4 (owner ruling): the manual product cannot be paid.** If launch happens without capture, that version launches FREE; the gate (D10) arrives when capture does. Formally overturns strategy-reset's "manual September worth $20 by itself" bet – capture-first is the commercial spine.
- **s5: the vendor ask is FINAL-FORM (D2 close – data-dependency determination):** read-only Gmail (headers whole-inbox for Ring 1 + body on Ring-1-matched mail only) + read-only Google Calendar (all calendars), webhook delivery, facts-only retention. Deliberately absent: send, Drive, calendar write, contacts. Manual contingency honestly priced: Ring-1-dependent features (domain watch, coordinator triage, backfill) don't exist until capture does.
- **Consent-screen fact (July 16, Unipile):** white-label requires own Google OAuth credentials → CASA on us. Real September menu: vendor's name on consent screen (no CASA) or our name (with CASA). Year-2 CASA-at-cohort-boundary logic unchanged.
- Formal close still gated on: vendor answers (R1 scope trimming for Nylas, R3 pricing) and D3 (engineering capacity).
- Owner: Jon. Status: OPEN as a formality; intent set; ask final.

### D5 – Beachhead formally closed

**CLOSED 2026-07-16. Beachhead: Group 1 (bootstrapped, fresh-start users).** Clarifications recorded with the close: (a) Group 1 vs. Group 2 is nearly a distinction without a difference for features – the real fork is 1/2 vs. 3 (manual-entry Sept vs. import Jan); (b) the September 5-contact user and the November 50-contact user are the same person eight weeks apart; (c) import lands well before January (Oct/Nov target), without displacing September-critical work before D3 sizes the calendar.

### D6 – Landing page conversion chain

OPEN. **s7 clarification (owner ruling): TWO landing pages exist in sequence.** The CURRENT sprint produces a VALIDATION/demo landing page – the product does not exist yet; the CTA is waitlist/interest capture, nothing monetized, nothing gated. D6's full conversion chain ("upload your tracker and see your queue" + sample-data door + post-aha capture) belongs to the later PRODUCT landing page, post-validation. What the validation page needs from D6 now: conversion-event copy for the waitlist ask. Seeded-demo display decision is a design-spec input. **Positioning input (s2, owner thesis): "logistics layer – not a CRM, not AI slop, not mass outreach, not contact-finding; coordinates in the background, drops no balls."** Cautions attached: aggregate stats must be real/earned; the precise claim is "no AI doing your outreach" (import stays LLM-assisted). **Privacy claim-shape RATIFIED (s3, two-ring): "Blotter never reads your personal email. It checks who mail is from – and only reads recruiting mail from the banks and people you track."** **s4 retention third leg:** facts-only storage – "keeps only the facts." Feeds D6 copy and D7 content.

**s13 addendum – validation-page content scope (recorded for the D6/D7 sitting):** owner-ruled inclusion list: what the product does (auto-capture, stated very clearly), explicit not-a-learning-tool differentiation from every other IB tool, the stakes of not having it (real volume data – emails/calls per cycle, dropped-ball evidence; aggregate stats must be real/earned per the s2 caution), expected launch timeline, feature text, FAQ, waitlist CTA, the ratified privacy claim, and a privacy policy (email collection makes it non-optional; not-a-lawyer flag logged). Excluded: pricing (D10 open; s7 waitlist ruling), help center, ToS-as-costume. ~~Flag: the landing PAGE itself has zero design work anywhere~~ **PARTIALLY DISCHARGED s14** – geometry, the Gmail set and page architecture are ruled in design-brief §3b; hero headline treatment, section rhythm and marketing-scale type remain open there.

**s14 amendments to D6:**
- **RE-SEQUENCED (S14-7): D6 now sits AFTER the build, not before it.** The page is built first with clearly-marked placeholder copy; final copy lands as a text swap. This reverses the s13 "elevated blocker" framing – D6 no longer blocks the build, it blocks the page going live to real traffic.
- **Scope ADDED: waitlist form mechanics.** A static page needs either a form service or one serverless function. **This is a D6 decision, not a build-session improvisation** – the build ships a stub wired so the real endpoint is a one-line swap.
- **Copy inputs now ruled and waiting here:** the volume language (S14-5 – range and texture, never a computed average, no loss fraction ever asserted) · the positioning wedge (S14-6 – technicals vs. logistics, never an outcome promise) · the 80,000 figure (S14-4, **read §1b/F2 first**) · the tracker rule (S14-3 – no statistic from it, ever).
- **The hero's caption and CTA close here.** Until then they are placeholder text nodes in the built page.

### D7 – Social: platform, cadence, kill date

OPEN. Must close before the landing page ships to real traffic. Sits with or immediately after D6. **s14 addition: D7 now also carries the Stage 5 toolchain question** – the s7 pipeline assigned static and social assets to Framer exports, and Framer is dead. No replacement was ruled. Candidates: crops from the built page, Figma, Canva. Logged in design-brief §5.

### D8 – Org distribution mechanics

PARKED by owner instruction. Carried so it cannot be forgotten; not to be worked.

### D9 – Phase-1 decisions re-homing – CLOSED

**CLOSED 2026-07-17 (session 5).** Final unabsorbed-content pass complete. Absorbed across s2–s5: P1/P2/P4; stage machine + Tracking fallback (2.10); terminal states (2.11, extended s5); dated-tasks mechanism; contacts/positions separation; hold-until-manual-send; record-view existence (2.16); section-6 tie-break (translated into 1.0 s5); no-learning-content wall (standing principles s5). Killed: P3 + Live/Dying/Dead; networking indicator; OAuth staging; LinkedIn Chrome extension (s5); referral tree (s5); phase-1 palette (s5). Not absorbed by design: hybrid record layout (design spec decides fresh). **phase-1-decisions-spec.md DELETED by owner July 17.**

### D10 – Monetization mechanics – OPENED s4

- What it is: the gate's shape – hard paywall vs. free trial (vs. freemium), price point, trial length, card-upfront-or-not. $20/mo stands as the strategy-reset working hypothesis, not a closed decision. Opened because s4's onboarding ruling made the gate load-bearing (guided entry + mailbox connection sit behind it, per inventory 4.2) while its shape was ruled nowhere.
- Known interactions, recorded at open: (a) D6's conversion event happens with real data, which now lives post-gate – behind a hard paywall that funnel fights a free incumbent; behind a trial it becomes the data-in stickiness play Jon articulated. (b) Intermediary COGS are per connected account – post-gate connection means no COGS on non-converts. (c) Zero-retention/seasonal usage shapes what "subscription" even means for a ~6-month active cycle.
- **s4 input (owner ruling): the gate exists only when capture exists.** A manual launch is free until capture ships; grandfathering/gate-arrival mechanics for free-manual users → this sitting.
- Blocks: the future PRODUCT/sales landing page CTA, onboarding build.
- Does NOT block: anything on the design-token track, **and – AMENDED s7 (owner ruling) – NOT the current marketing sprint.** The s6 elevation assumed a sales landing page; the sprint's page is a VALIDATION page for a product that does not yet exist – its CTA is waitlist capture, which needs no price, no gate shape, no trial mechanics. D10 de-elevated back to an ordinary open decision; it closes before the post-validation product landing page. One recorded exception that would re-elevate it: if the owner wants the validation traffic to ALSO carry a willingness-to-pay test (price-anchored waitlist / fake-door price). Not ruled; pure emotional validation is the stated goal.
- Owner: Jon. Status: OPEN – de-elevated s7; sits until validation-stage results or owner call.

### D11 – Two-demo behavioral test (platform vs. Sheets-Native Companion) – REGISTERED s4-close

- What it is: a validation-track experiment, NOT a build. At the marketing-materials stage, produce demo assets for BOTH the platform and the Sheets-Native Companion concept (full concept in ideas.md) and measure relative demand. Tests the commercial thesis's biggest behavioral unknown: whether spreadsheet-identity users migrate off the spreadsheet at all. Zero build cost by design: demo video + landing variant only.
- Gate: activates AFTER the existing chain reaches marketing materials (D2 → design tokens → design spec → landing page). Firewalled from the September build entirely.
- Registered constraints: (1) traffic is thin – candidate design is one shared page, both demos, two distinct waitlist CTAs (shared traffic, measurable intent split) – decided at the marketing/D6 sitting; (2) the decision rule MUST be pre-registered before traffic flows (the Reddit lesson: no pre-agreed threshold = uninterpretable result).
- **s14 interaction – flagged, needs an explicit call (§0 item 5).** Option 2 changes D11's price. When the demo was a five-segment film, a second variant was one more scene. Now the page's entire argument is a bespoke animated hero built from a specific product surface – so a Sheets-Native variant needs **a second animated hero**, which is precisely the expensive-work-before-evidence pattern that S14-2 rejected. Three honest paths: (a) run D11 with a deliberately cheap second variant (static mock, no animation) and accept that the comparison is unequal by construction – which may itself contaminate the result; (b) run it later, on conversion evidence, as a second experiment; (c) defer explicitly and record it. **Do not leave it drifting.** If it runs, the decision rule is pre-registered before any traffic flows – the Reddit lesson.
- Owner: Jon. Status: REGISTERED, dormant until the marketing stage; **explicit confirm-or-defer is a §0 item.**

---

## §1a – SESSION 14 STANDING RULINGS (ratified s14, merged s15)

Not decisions in the D-register sense – binding rulings and the copy inputs that feed D6. Reasoning is recorded in full so none of it is re-litigated.

### S14-1 – Toolchain: Framer is dead; build in code

**Owner decision, cross-checked against multiple sources.** All Stage 3/4 work is **plain HTML/CSS/JS with GSAP, deployed to Vercel**, built via Claude Code. Framer and its Chrome extension are retired.

Reasoning:
1. `stage-2-index.html` already renders every screen at final fidelity. Framer meant importing finished work into a visual tool the owner has never used (est. 30–50 hours) in order to reproduce it. Attaching animation to existing markup in code is a fraction of that.
2. Returns the build to the owner's proven workflow: Claude Code writes, owner verifies against the real artifact in-browser and on the filesystem, deploys to Vercel – the pattern that shipped the product's M1–M5.
3. The demo was never a video; it is the live DOM animating. DOM state changes are trivial in JS and awkward in a visual builder.
4. Part B stays literally executable – the HTML's strings *are* the dataset, not retyped copies that drift.
5. No platform lock-in; text edits are file edits.

**Methodology lesson, logged:** the "live rendering loop" reasoning that once favored visual tools was valid for *generating design* and expired the moment the pixel target existed. The expired ruling was carried forward, and a ballooning estimate was treated as a schedule instead of a tool-choice alarm. → standing rule at the head of this document.

**Mooted, not wrong:** the import-test verdict (the extension worked; irrelevant now), all extension technique notes, the Framer paid-plan and Framer-domain pre-launch items.

### S14-2 – Scope staging: "Option 2" – landing page + hero loop now; scroll film deferred

**Owner decision.** The immediate build is a **static landing page with one autoplaying hero animation**, not the five-segment scroll-driven film.

**What Option 2 is:** the full landing page (hero, then static sections for stakes, differentiation, features, timeline, privacy, FAQ, waitlist) where the hero is a ~10-second looping animation of the product window with capture happening live – a Gmail panel slides in, a reply lands, the queue answers. Everything below the hero is static. Detail in `option-2-build-spec.md`; rendering in design-brief §3b.

Reasoning:
1. The film's justification was "show capture rather than describe it." **One animation does that job**, not five. The hero loop carries the product's entire argument.
2. Validation is a waitlist-conversion question decided in the visitor's first seconds – i.e. at the hero. The later segments are narrative richness that plays to the already-convinced.
3. **This is staging, not killing.** The page ships, collects signal, and the segments are added beneath the hero on a live page if conversion warrants. Expensive work happens after evidence.
4. Floor held deliberately: a fully static page with no animation was rejected. A page that cannot *show* capture argues the weakest version of a capture-first product.

**Consequences:** S1–S5 and Part A's full two-act structure are **DEFERRED, not deleted** (§4b; revival trigger = post-launch conversion signal) · the hero loop is built as **Act One of the existing Part A script**, same beats, same Part B strings, so nothing is wasted · estimate **3–5 owner-hours** across 1–2 Claude Code sessions (was 8–15 for the film in code, 30–50 via Framer) · the page grid must accept the segments later **without a rebuild**.

### S14-3 – Tracker is not a statistics source (STANDING)

Recorded in the standing process rules at the head of this document. Repeated here only as a pointer: failure-mode reference only, never an aggregate statistic, on any surface.

### S14-4 – Owner-supplied figures are authoritative

**80,000 students recruit for IB annually** – owner-supplied, ratified, used in copy without hedging or re-sourcing. General rule: figures from the owner's model or domain research are accepted as given. **Scope caution raised at merge: see §1b/F2 before this figure goes on a public page.**

### S14-5 – Volume language: qualitative shape, never a computed average

Owner ground truth per cycle: **hundreds of emails (500+ realistic) · 50+ coffee chats · 20+ interviews** (each round counts separately) · **therefore 70+ thank-yous owed.** Copy states range and texture. **No loss fraction is ever asserted** – "misses about a third" was considered and rejected as unsourceable; the claim is stronger without it.

### S14-6 – Positioning wedge: technicals vs. logistics (a frame for D6, not ratified copy)

Every technical resource already exists and everyone has them; no edge is available there. What separates people is whether the process runs clean. **Guardrail: never drifts into an outcome promise.** Blotter produces hours and non-dropped balls, not offers. Honest closing form: *Blotter will not make you better at technicals. It makes sure nothing you already earned falls through.*

### S14-7 – Sequencing: the build executes before page-copy planning

**Owner correction, ratified.** Rework flows from asset to page (structural, expensive) and not the reverse (text swaps, minutes). D6/D7 therefore sit in the first planning session *after* the build. Page composition constraints can be ruled in planning; final composition follows the built hero. The hero's caption and CTA are swappable placeholders until D6.

---

## §1b – FLAGS RAISED AT MERGE (s15) – owner rulings needed

Three things surfaced while reconciling the amendment record against the actual artifacts. None is a decision this document can make.

### F1 – The build spec's hero beat contradicts Part A, and Part A is right

`option-2-build-spec.md` §4 beat 4 scripts "**Sarah Chen's status chip flips** (text and color change per Part B) → a new queue item materializes" *inside the product window showing the Daily Queue*. The session-14 handoff carries the same wording.

**The Daily Queue master has no status chips.** Verified s15 against `stage-2-index.html`: within the 17e block there are **zero pill elements and zero state-name strings** ("Awaiting", "You owe", "Not yet contacted" all return 0). Queue rows are name · firm / WHY-line / Draft-verb action / snooze / overflow. Status pills are **Surface 2 grammar** – the contacts list – and the chip flip is the **S2 segment**, which is deferred.

Part A's H3 is the correct beat: the follow-up row **dissolves** and a new row **materialises** in the same slot under a briefly-visible "Replies waiting on you" label. Same story, same one-change-at-a-time law, built from the surface that actually exists.

**Status: SUPERSEDED s16.** The correction stood through the v2 build, but the built loop then failed owner verification for deeper reasons (the same-slot swap rendered incoherent state – see §1c). The s16 hero re-anchor moots the whole question: the chip flip now plays on Surface 2, where the pills actually live, and the queue appears as a card using 17e row anatomy. Retained as history – the flag was right that pills don't belong on queue rows, and that law carries forward into the H5 card.

### F2 – The 80,000 figure and the tracker rule do not compose cleanly

S14-3 exists because a number can "wear the costume of evidence." S14-4, one ruling later, grants blanket authority to owner-supplied figures **used in public copy without hedging**. Checked against the owner's own model (`P. IB Market Sizing.xlsx`):

- The model derives **implied unique applicants** by acceptance-rate scenario: **1% → 89,000 · 2% → 44,500 · 3% → 29,667**. The 80,000 figure sits nearest the **most generous** of the three.
- The unique-applicant line is `total applications ÷ 5`. **The divisor of 5 – applications per student – is undocumented in the sheet and is contradicted by this project's own ground truth** (S14-5: hundreds of emails, dozens of banks, plus independent per-city duplicates per R8). At 15 applications per student the 1% scenario falls to roughly 30,000.

Both assumptions push the number up, and both are assumptions rather than measurements. **This does not touch internal planning** – the model is fine for sizing a market. The exposure is a public marketing claim resting on a spreadsheet assumption, in a project whose own standing rule forbids exactly that.

**Owner ruling needed:** either (a) narrow S14-4 to internal use and treat public figures as needing a citable external source, (b) keep the figure but hedge its form on the page ("tens of thousands"), or (c) accept the risk knowingly. **Any of the three is defensible; drifting into it unexamined is not.** Recommendation: (b) – the copy argument does not get weaker at "tens of thousands," and the claim stops being falsifiable by a stranger with a spreadsheet.

### F3 – Two smaller items

- **En dashes vs. Part B verbatim.** The standing rule says en dashes everywhere; the hero's email subject line in Part B contains an **em dash** ("…Suggested I Reach Out — Fellow McCombs Student") and renders verbatim in the Gmail panel. Cleanest resolution, not yet ruled: **the en-dash rule governs Blotter's own voice** – UI strings, captions, page copy – **and not content depicted inside the Gmail panel**, which is a person's typed email and would realistically contain anything. *(Checked and clear: the 16 em dashes in `stage-2-index.html` are all in the index's own annotation chrome – titles and LOCKED labels – not inside the rendered screens, so extraction does not carry them.)*
- **A live page with placeholder copy is a public page.** The build deploys to Vercel before D6 writes the words. Recommend `noindex` until final copy lands, and no custom domain pointed at it until then – otherwise the first thing a search engine sees of Blotter IB is `[STAKES BODY – D6]`. Added to the pre-launch register.

---

## §1c – SESSION 16 RULINGS (M4 verdict + hero re-anchor; merged s16)

**What happened.** The v2 M4 hero loop completed, deployed, and failed owner verification: too much unfamiliar information upfront (a fully populated six-section queue with no schema for a stranger), a payoff too subtle to read (a section title changing), and incoherent product state on screen – the built beat re-titled "Follow-ups due" in place, stranding two contacts under a header that no longer described them, while the caption claimed a deletion nothing visibly performed. **Disposition: SPEC DEFECT, not builder failure** – v2 §4 scripted the same-slot swap deliberately because the no-reflow guardrail prohibited the honest choreography. The v1 lesson applies: judge the handoff, not the tool. **Structural finding, recorded so the re-anchor is never relitigated: the Daily Queue at real density cannot film its own signature event** – an item moving between sections of a dense list violates either the no-reflow rule or a stranger's comprehension budget on every honest path.

### S16-1 – Hero re-anchored to Surface 2

The loop plays on 5a (contacts list) + 12c (Sarah's side panel). The pill flip – native Surface 2 grammar, the product's one color-coded state change – is the color moment: **"Awaiting their reply" blue `#5581DC` → "You owe a reply" amber `#B8863B`**, the identical amber on the queue's "Replies waiting on you" header (color law 15b: amber = a person waiting on you), so one hue carries the claim across both surfaces. A Daily Queue card (17e row anatomy, no pills, "Daily Queue" eyebrow) arrives as the closing peek; the closing frame holds cause and effect side by side – queue card left, amber panel right. **Deliberate positioning trade, named:** opening on a CRM list is the loudest "we're a CRM"; the queue card and the queue-led features tabs pay it back. Familiar-schema density (a contact list) ruled acceptable where novel-schema density (the queue) failed.

### S16-2 – Composition rulings

Row crop, not column crop: first 7 alphabetical rows (Sarah selected row 2; Cho's amber pill in frame as state precedent), columns intact, uniform ~0.87x scale. Gmail re-sized to panel scale (the v2 inset ruled too small) and re-sided: enters left over the list, never the panel; dims at H3; exits at H5 vacating the slot the queue card takes. Sarah's list row flips off-camera behind Gmail (panel-and-list-agree law).

### S16-3 – Zone rule (supersedes "one change on screen at a time")

**Owner instruction.** The unit of change is the **zone**, not the string: strings within one zone (a status block, a card) crossfade together as a single change; two zones never change simultaneously. Preserves sequence legibility, kills the fussiness. Amended in motion-mock-plan A4 and the build spec.

### S16-4 – The H4 string ruled (the one Part B gap)

Interactions append: **Jan 16 · Email ("Reply received; proposed Tuesday 2:00 PM.")** – house interaction format.

### S16-5 – Features section upgraded to an explorable component

Daily Queue / CRM / Calendar tab switcher; each tab a full static locked master (17e / 5a / 22a); the M1 queue extraction reused as tab 1. **Open pour flag (owner verifies at M4R4):** recommend the queue tab renders **post-capture** – Sarah at the foot of "Replies waiting on you" – for hero-to-scroll continuity.

### S16-6 – Considered and declined (recorded so it is not re-derived)

The split-story alternative – hero ends at the CRM flip, the queue discovered as a static section on scroll – was owner-proposed, argued, and **owner-declined**; the queue peek stays inside the loop. Its chief benefit (Sarah found in the queue down-page) survives via S16-5's pour flag. Also declined earlier in the sitting: a panel-swap climax (it destroyed the evidence of capture at the payoff) and a windowed tab-underline device (died with the swap).

### S16-8 – Mid-build amendments (s16b, ruled against the M4R3 render)

The first M4R3 loop rendered correctly against the spec but the H5 beat read badly. **Cause: a spec ambiguity, not a build error** – §4 H5 asked for both "the slot Gmail vacates" and a "section-header + one-row footprint," which conflict; the builder produced a small card floating over the re-revealed CRM, whose grammar reads as a tooltip.

- **The exchange (ruled).** The queue card takes **Gmail's exact footprint** and Gmail **crossfades into it** – the CRM is never re-revealed between them. One overlay slot, two occupants.
- **The card is a surface, not a notification (ruled).** It renders the queue's date title plus **two Part B sections** – "Replies waiting on you" (Cho, Nkemdirim, Sarah) and "Thank-yous owed" (Park, Sutton) – cropping at its lower edge. Data is reused from Part B, never improvised.
- **Ordering deviation RULED (owner):** Sarah renders **first** in her section in the hero card, overriding the longest-waiting-first law. Owner reasoning: on a ten-second hero, visibility outweighs an ordering detail no outside viewer will catch. **Scoped strictly to the hero card** – the features tab and every static keep the true order, because that tab's job is fidelity and it is the one place both renders could be seen. Written into Part B as a ruled deviation so it is never "corrected" or logged as a dataset bug.
- **Prominence by motion, not color (ruled).** Cho and Nkemdirim arrive with the card; Sarah materialises into the top slot last. A blue border was proposed and declined – blue is Surface 2 state grammar and would contradict the amber section it sits in. Fallback if needed: 5a's existing selected-row treatment; never an invented color.
- **Build correction:** the caption must render in the page's caption node below the window, not as a floating bubble inside the frame.
- **Runtime:** closing hold to ~3s; loop ~13s.
- **Open verify item:** the hero window's right edge appeared clipped in the M4R1/M4R3 stills (Sarah's "Draft a follow-up" link cut off). If real rather than a screenshot crop, the composition overflows the 1200 column – belongs in the delta as a geometry miss.

### S16-7 – Consequences

The deferred **S2 segment is ABSORBED by the hero** (annotated in §4b; superseded on any revival). **F1 is superseded** (§1b). Salvage: M1 → features tab 1 · M2, M3, tokens, deploy pipeline, noindex all survive · discarded: the v2 GSAP timeline only. Runtime ~12s (was ~10s pencil; within tolerance). The deletion claim is carried by the **caption**, not visuals (owner ruling; final line is D6). Documents: option-2-build-spec **v3** issued · motion-mock-plan A1/A4/B3/C1/C2 amended · this brief's §3b amended · `s16-amendment-record.md` merged here and RETIRED – delete the file.

---

## §2 – RESEARCH REGISTER

### R1 – Scope subsetting + consent-screen branding

- **Unipile (chatbot, July 16, partial):** scopes reducible to read-only in dashboard settings; Unipile appears on the OAuth screen under their default key – own key requires CASA Tier II; high-frequency polling generates near-real-time webhooks.
- **Nylas:** email sent July 16, awaiting. If Nylas can subset scopes under their verified app, that is a differentiator.
- **s5 note: the ask is final-form** (three grants, D2 close) – the one deciding question is read-only trimming under vendor credentials.
- Status: OPEN, partially answered.

### R2 – Sync latency

- **Unipile (July 16): ANSWERED favorably** – real-time webhooks for both email (mail_received, mail_sent) and calendar events. Webhook architecture satisfies queue-freshness requirements. Calendar capture rides the same integration.
- Nylas: awaiting.
- Status: SUBSTANTIALLY CLOSED for Unipile; open for Nylas comparison.

### R3 – Unipile pricing

- OPEN. Chatbot did not quote; included in follow-up. Nylas comparator: $15/mo + $2/account, Full Platform.

### R4 – Vibe-coding tooling research

- BLOCKED by design spec (owner guardrail unchanged). Do not start early. **Scope note s5 (owner):** includes platform/tooling selection for the build itself (which coding platforms, what role each plays) and an honest read on what M1–M5's tooling approach got wrong. Runs alongside the build decomposition plan (§4) in the window between design spec and first build session. **s7 addition: the v0-vs-Bolt(-vs-Claude Code) bake-off – one surface, identical token inputs, judged by eye – is formally part of THIS research item**, reclassified out of the marketing sprint (the sprint's toolchain is ruled: Claude Design + Framer; the bake-off picks the BUILD toolchain and belongs here).

**s14 amendment – the firewall between the marketing track and the product stack is GONE.** S14-1 puts the landing page on Claude Code, so the marketing track now runs on the same tooling the build would. Two consequences: (1) the s7 premise that "the marketing track never touches the product stack" no longer holds and should not be quoted; (2) **the landing-page build is live evidence for this research item** – it is a real Claude Code session producing real UI against locked design tokens, judged by eye, which is most of what the bake-off was for. It is not a controlled comparison (no v0/Bolt arm runs on the same input), so it cannot close R4 by itself. **What it can do is shift the burden:** if Claude Code produces acceptable UI from an existing pixel target, the open question narrows from "which tool" to "does the greenfield case differ from the have-a-target case" – which is the honest version of the question anyway, given that the v1 UI failure was diagnosed as missing tokens and no rendering loop, not a tool ceiling. Revisit R4 when the build delta lands.

### R5 – CASA Tier 2 confirmation

- DEFERRED – Year 2 problem. The Unipile white-label finding makes this concretely relevant to any future own-credentials path; unchanged priority.

### R6 – Competitor "today view" research – CLOSED July 16 session 2

- Findings: Huntr/Teal/Simplify have NO computed today-view (kanban databases + manual reminders) – confirms the engine as differentiation; Streak and Attio converge on sectioned-by-time-bucket homepages; Salesloft Rhythm is the ranked-queue case but runs on rich engagement signals at high volume and still sections first (Focus Zones). Fed OPEN-1 close: sectioned, no toggle.

### R7 – Computed-state vocabulary – CLOSED July 16 session 3

- **Finding: no canonical public contact-status vocabulary exists** – the null result corroborates computed-not-stored. Kept: "two clocks" (WSO-native) supports the awaiting/owe-reply split; temperature axis DECLINED as stored judgment, covered by 2.4 tags.
- **Ruling in inventory 2.1: three-layer model (thread states / events / badges) + five states.** Names → design spec.

### R8 – Multi-city application mechanics – CLOSED July 16 session 3

- **Findings (directional – 4 of 22 banks verified):** Moelis = separate application per city; Morgan Stanley = one application, bounded ranked office selection; Evercore = group × city matrix; Baird = bundled requisition, mechanism unknown; part 2 (independent confirmations) unanswered for every bank. ATS-tenancy corroboration: MS/Evercore/Moelis on *.tal.net (fed 3.2's Ring 1 design).
- **Ruling in inventory 2.13: simple model ratified** – cities multi-select + duplicate action; duplicates fully independent records.

### R9 – Ring 1 sender-domain hunt – REGISTERED s5

- **What it is:** a dedicated, thorough deep investigation of the **automated recruiting-sender universe** – bank HR/coordinator address patterns, ATS tenancies (*.tal.net, myworkday.com, taleo, icims, and the long tail), recruiting-vendor domains (hirevue.com etc.), no-reply conventions – producing the day-one seed for Ring 1's match classes (b) and (c).
- **Owner ruling at registration (s5): NO existing list satisfies this.** The outreach email-format sheet yields corporate root domains at best – built for a different job (reaching bankers, not recognizing automated inbound). Corporate roots are at most a minor input. Intentional and thorough, or not at all.
- Scope boundary: the watch list self-generates per user (inventory 3.2) – the hunt produces the SEED, not comprehensive coverage.
- Sequencing: with the capture build (WS-D), much later; not urgent; not a September-design blocker.
- Owner: Jon (research directed by Claude when scheduled). Status: REGISTERED, dormant.

---

## §3 – WORKSTREAMS

### WS-A – Name, domain, landing page

Steps 1–2 complete (name, domain). **Amended s14:** the landing page is now **built in code (HTML/CSS/JS + GSAP, Claude Code) and hosted on Vercel** – there is no Framer publishing path and no design-to-code handoff, because the design *is* code. Remaining sequence: build (§0 item 1) → delta merge → D6/D7 → copy swap + real form endpoint → domain + `noindex` removal → live. Note the page deploys to a Vercel URL **before** D6; it is not the launch, and it should carry `noindex` until copy lands (§1b/F3). Two Vercel deployments now exist and must not be confused: **the product** at p-ib.vercel.app and **the landing page** (new).

### WS-B – Feature inventory & design (the critical path)

1. Daily Queue surface – DONE. 2. Home-screen display decision – CLOSED s2. 3. Remaining surfaces – ALL DONE (CRM s2, Calendar s3, Cross-cutting s4). 4. **D2 formally ratified – DONE s5 (July 17): D9 absorbed and closed; specs superseded and deleted; data-dependency determination ruled; binding declaration ratified.** 5. D4 formal close – after vendor answers + D3. 6. **Design pipeline RATIFIED s7 – six stages, plan-backward-execute-forward** (full detail in design-brief.md §1): **Stage 0** reference collection (framework in the brief; session 8) → **Stage 1** design tokens + design-reference.html (Claude Design, authored as code – tokens are the machine-readable decisions, design-reference.html renders them for eye judgment; one file, two forms) → **Stage 2** screen design (all rendering decisions RULED s7 in design-brief.md §3 – execution generates high-fidelity screens of the three surfaces against them; the minimal design spec = the brief's ledgers + the generated screens) → ~~**Stage 3** motion mock (Framer)~~ ~~**Stage 4** landing page (Framer)~~ **AMENDED s14 – Stages 3 and 4 MERGED into one artifact: the validation landing page with an animated hero, built in plain HTML/CSS/JS + GSAP by Claude Code from `stage-2-index.html` and deployed to Vercel.** Animated scope is Act One of the beat script only; the five scroll segments are deferred pending conversion signal (§4b). Waitlist CTA; D10 not required. → **Stage 5** static + social materials (derived from the same tokens/screens) – **tool now UNRULED (Framer's death left this open); decide at D7.** **Toolchain, amended s14: Claude Design for Stages 1–2 (closed); Claude Code + GSAP + Vercel for Stages 3–4; Stage 5 open.** The s7 claim that "the marketing track never touches the product stack" is dead – see R4. The build-phase toolchain question survives as R4, now informed by this build. 7. Full design spec (post-sprint consolidation; the brief + screens cover the demo's needs first). 8. High-fidelity clickable prototype (build-phase artifact, after validation – NOT a sprint deliverable; the motion mock replaced it for demo purposes, s7 fidelity ruling). 9. Outputs: design-reference.html ✓, stage-2-index.html ✓, motion-mock demo asset, validation landing page, social content assets, seeded-demo display decision. **Stages 0–2 CLOSED (s8/s9/s11-s12); Stage 3 is the live step.**

### WS-C – Product build

Updated s5: 1. D3 salvage assessment → 2. rebuild-vs-refactor ruling → 3. R4 tooling research + **rebuilt spec pack + build decomposition plan** (all only after WS-B design spec; see §4) → 4. rebuild/refactor to design spec, one milestone per Claude Code session with verified deployment → 5. SEPTEMBER LAUNCH, **capture-first intent** per D4, manual buttons as contingency.

- **Standing gate added s5 (owner instruction – the M1–M5 lesson): no build session ever starts without the build decomposition plan.** The v1 failure was the handoff shape – a monolithic spec dump with no dependency order, no verification gates, no way to fail small; it failed everywhere at once and surfaced at M5. The decomposition plan is the structural antidote: dependency-ordered milestones (gutted structural infrastructure first – schema, RLS, auth; then the engine; then surfaces; then capture), each small enough to verify independently before the next begins, one milestone per session with owner verification.
- Load-bearing assumption, carried: October users have ~5 contacts and near-zero logging burden, so the manual *fallback* doesn't have to carry January. Under capture-first intent this is insurance rather than the plan.

### WS-D – Gmail + Calendar capture via intermediary

1. R1/R3 remaining answers → 2. sandbox integration from the start of the build (vendor TBD: Nylas vs. Unipile) → 3. capture built against the ratified feature set per the FINAL data-dependency determination (three grants): Ring 1 bank-domain watch (headers, whole inbox, three match classes – **seeded via R9**), Ring 2 matched-mail parsing, Google Calendar read (all calendars), event matching + claim path, learned domain mappings, 12-month headers backfill on every connect (import-before-backfill ordering), historical confirmation parsing (heaviest Ring 2 surface – flagged for build planning), facts-only retention, webhook sync → 4. capture live AT LAUNCH if the calendar holds (intent), else Oct/Nov (contingency) → 5. JANUARY: load ramp, Group 3 import conversion → 6. YEAR 2: CASA at a cohort boundary if own-credentials white-labeling is ever wanted.

### WS-E – Distribution

Unchanged: D5 (closed) → D7 social experiment → D8 (parked) → January Group 3 funnel.

- BCC send-logging: KILLED s4 (inventory 4.12) – recorded in ideas.md as historical.

### WS-F – Project hygiene

1. strategy-reset.md + roadmap.md in project files – DONE.
2. Memory corrections – DONE July 15.
3. **D9 execution – COMPLETE s5. phase-1-decisions-spec.md, queue-spec.md, and schema-spec.md DELETED by owner July 17 after the D9 pass + supersession resolution confirmed absorption.**
4. Recruiting-domain PDFs – RETAINED (domain-grounding corpus).
5. Standing rule: any document describing build state is presumed stale until verified against the filesystem or the deployed app.
6. Cross-session tracking system: feature-inventory.md now RATIFIED (edited, never superseded, same as this document); each session ends with updated roadmap.md + feature-inventory.md (when touched) + a short next-session prompt. Session prompts carry pointers, not decisions.
7. ideas.md debts: all paid.
8. **Merged and retired s15: `session-14-amendments.md`** – every ruling in it is now carried by this document (§0, §1, §1a, §1b, §2 R4, §3 WS-A/WS-B, §4, §4a, §4b, §5), design-brief.md (§1, §3b, §5, §6) and motion-mock-plan.md (header, A1, A2, A4, Part C). **Delete the amendment file.** `session-14-handoff.md` is orientation only and can go with it; nothing in it is unique except the launch-checklist items, which now live in §4a.
9. **Two Vercel deployments exist and must never be conflated:** the product (p-ib.vercel.app, M1–M5, poor UI, untouched by the marketing track) and the landing page (new, this build). Any document that says "deployed at Vercel" without naming which is ambiguous and should be fixed on sight.
10. **Credential in `IB_Network__Application_Tracker.xlsx`** – `NewYork310!`, 20 verified cells, beside an email address, currently in project memory. Scrub or rotate before the file is shared, attached, or retained further (§0 item 6, §4a).

---

## §4 – DELIVERABLES LEDGER

| Deliverable | Unlocked by | Consumed by | Status |
| :---- | :---- | :---- | :---- |
| feature-inventory.md | nothing | everything downstream | **RATIFIED s5 – THE product document** |
| **design-brief.md** (NEW s7 – living design authority: pipeline, toolchain, Stage 0 framework, ALL Stage 2 rendering rulings, Stage 1 token notes) | Stage 2 planning (done s7) | Stages 0–5, design spec, rebuild | **CREATED s7 – live** |
| Stage 0 reference set | design-brief.md ✓ | Stage 1 + Stage 2 execution | **CLOSED-COMPRESSED s8** – folder framework retired; patterns + taste constraints in brief §2; residual references pulled just-in-time |
| Design token spec + design-reference.html | Stage 0 (compressed) | both repos, screens, motion mock, landing page | **v1.0 RATIFIED s9 (Claude Design)** – clean spec file + `.dc` variant-history archive |
| Stage 2 screens (three surfaces, high fidelity) | tokens ✓ | motion mock, landing page, static/social, design spec | **CLOSED s11 (Claude Design, s10–s11)** – six locked masters; executed rulings in brief §3a; variant history in Blotter Stage 2 screens.dc.html |
| **stage-2-index.html** (the six locked masters; **the build's pixel target and acceptance criterion** – "Framer acceptance criterion" is dead wording, s14) | Stage 2 close ✓ | the landing-page build, static/social, design spec, rebuild | **v1.1 s13 – poured to the motion-mock dataset (content authority = motion-mock-plan.md Part B)** |
| **motion-mock-plan.md** (s13, re-scoped s14, **A1 REWRITTEN s16** – Part A beat script *(active scope: A1, CRM-anchored)* + Part B fake-data spec *(+ s16 hero render rule and Sarah's post-⚡ pour)* + Part C tombstone & acceptance pass *(C1 rewritten s16)*; **Part B = sole content authority for every string on any demo or marketing surface**) | Stage 2 ✓ | the landing-page build, index v1.1, Stage 5 assets, seeded sample-data candidate (4.x) | **AUTHORED s13, AMENDED s14, AMENDED s16** |
| **option-2-build-spec.md** (the explicit build instruction set: stack, geometry, milestones, the hero sequence, the section skeleton, the delta requirement) | S14-1 + S14-2 | the Claude Code build session | **ISSUED s14; REISSUED s15; REISSUED s16 as v3** – hero re-anchored to Surface 2, milestones restated M4R1–M4R4 + M5. An execution input, not a living document – retired once its delta is merged |
| ~~Motion-mock demo asset (Framer)~~ **KILLED s14** – merged into the row below | – | – | superseded by S14-1/S14-2 |
| **Validation landing page with animated hero** (one artifact: hero loop + static sections incl. explorable features tabs + waitlist form; HTML/CSS/JS + GSAP; Vercel) | option-2-build-spec.md v3 ✓ + motion-mock-plan A1/B (s16) ✓ + stage-2-index.html v1.1 ✓ | validation traffic, D11, Stage 5 statics | **BUILD IN REWORK – Claude Code (Jon).** M1–M3 complete and verified; v2 M4 superseded (spec defect, §1c); M4R1 next. Ships with placeholder copy and a form stub; goes live to real traffic only after D6 (copy + form backend) and the pre-launch register (§4a) |
| Design spec (consolidated, full-product) | sprint outputs | prototype, rebuild, R4, rebuilt spec pack | not started – brief carries the demo-critical subset |
| Clickable prototype | design spec | build phase (post-validation) | not started – de-scoped from sprint s7 |
| **Rebuilt spec pack** (schema + engine specs, derived FRESH from the inventory – successor to the deleted v1 specs) | D2 ✓ + design spec (+ D3 ruling) | build decomposition plan, CLAUDE.md, build sessions | not started – **must include the derivability audit: prove the schema sufficient for every ruled feature before any code** |
| **Build decomposition plan** (dependency-ordered, small-verifiable milestones – the M1–M5 antidote; owner instruction s5) | design spec + D3 + rebuilt spec pack | CLAUDE.md, every Claude Code session (standing WS-C gate) | not started |
| Import/ingest spec | D2 ✓ (shape ruled s4 at inventory 4.7) | Group 3 funnel, Oct/Nov import | not started |
| ~~Landing page spec~~ | – | – | **RETIRED s14 as a separate artifact.** Its content now lives in three places: rendering in design-brief §3b, build instructions in option-2-build-spec.md, copy in D6. A separate spec would be a fourth copy of the same decisions |
| CLAUDE.md rewrite | rebuilt spec pack + build decomposition plan + D3 | Claude Code sessions – written LAST | not started |

---

## §4a – PRE-LAUNCH REGISTER (created s14, merged s15)

Standing items that must clear before the landing page carries real traffic. Not sequenced, not blockers on the build itself – blockers on *going live*.

| Item | Why | Owner ruling needed? | Status |
| :---- | :---- | :---- | :---- |
| **Waitlist form backend** | A static page cannot capture emails by itself; it needs a form service or one serverless function | **Yes – a D6 decision, explicitly not a build-session improvisation.** The build ships a stub wired so the endpoint is a one-line swap | OPEN |
| **Custom domain → Vercel** | blotterib.com is bought and pointing nowhere. *(The s14 record marked this "REMOVED – moot"; that was true of the FRAMER domain step only. The requirement survives, on different infrastructure.)* | No – execution | OPEN |
| **`noindex` until copy lands** | The page deploys publicly before D6 writes the words. Without this the first thing a crawler sees of Blotter IB is `[STAKES BODY – D6]` (§1b/F3) | No – execution, but do it at M1 | **ADDED s15** |
| **Privacy policy** | Collecting email addresses makes it non-optional. Not-a-lawyer flag logged | Content is D6 | OPEN |
| **Privacy-policy legal glance** | Ordinary caution before a public claim about reading mail | Yes | OPEN |
| **Gmail-chrome trademark glance** | The hero renders recreated Gmail chrome. **Survived the toolchain change** – it is about what renders, not what built it | Yes | OPEN |
| **Credential scrub** | `IB_Network__Application_Tracker.xlsx` carries `NewYork310!` across **20 verified cells** beside an email address, and sits in project memory | No – do it now (§0 item 6) | **ELEVATED** |
| ~~Framer paid plan / Framer custom domain~~ | – | – | **REMOVED s14 – moot** |

---

## §4b – DEFERRED REGISTER (created s14)

Work deliberately *not* being done, with the evidence that would revive it. Distinct from killed work (tombstoned in ideas.md) and from parked work (§0 item 9, revived by calendar rather than evidence).

| Deferred | What it is | Revival trigger | Where it lives |
| :---- | :---- | :---- | :---- |
| **The five-segment scroll film (S1–S5)** | The two-act narrative: morning read · the status nobody typed · you act once and the item clears itself · it lands on the calendar · close. **s16: S2 is ABSORBED by the re-anchored hero** – its pill-flip beat now plays in the loop; on revival S2 is superseded and its slot is re-planned, not rebuilt | **Post-launch waitlist-conversion signal.** Added beneath the existing hero on a live page – the page grid is built to accept them without a rebuild | motion-mock-plan.md Part A (A2), held intact |
| **D11 – the two-version behavioral test** | Platform vs. Sheets-Native Companion, measured demand | Owner call; **but its cost changed under Option 2 – see D11's s14 note before assuming it is cheap** | §1 D11 · concept in ideas.md |
| **Mobile re-cut of the motion** | The stacked/sequenced phone version of the loop | Stage 5, or evidence that mobile traffic dominates | design-brief §5 |

**Rule for this register: a deferred item with no stated revival trigger is a killed item wearing a friendlier word.** Every row above states one.

---

## §5 – CHANGELOG

- **2026-07-23 (s16):** **M4 verified and ruled a SPEC DEFECT** – the built loop executed v2 §4 faithfully; the same-slot queue-row swap (an artifact of the no-reflow guardrail) rendered incoherent state and an illegible payoff. Structural finding: the Daily Queue at real density cannot film its own signature event. **HERO RE-ANCHORED to Surface 2** (5a + 12c; pill flip blue → amber as the color moment, matching the queue's amber per color law 15b; queue card as the closing peek; cause-and-effect closing frame). Row-crop ruling (7 rows, columns intact). Gmail re-sided left at panel scale. **Zone rule** supersedes one-change-at-a-time. H4 interaction string ruled. **Features section upgraded to explorable three-surface tabs** (M1 extraction reused; post-capture pour flagged for owner verify at M4R4). Split-story alternative considered and declined (S16-6). S2 absorbed by the hero; F1 superseded. Rework milestones M4R1–M4R4 + M5; M1–M3 products survive; only the v2 GSAP timeline is discarded. Runtime ~12s. Documents: option-2-build-spec **v3** issued · motion-mock-plan A1/A4/B3/C1/C2 amended · design-brief §3b amended · **§1c created (the s16 rulings in full)** · `s16-amendment-record.md` merged and retired. Session-open prompt for the rework session issued (pointer-only). §0 recomputed: the rework session heads the queue.

- **2026-07-23 (s16b – mid-build amendments):** the first M4R3 loop rendered to spec but the H5 beat read as a tooltip; **cause ruled a spec ambiguity** (the card was asked to be both "Gmail's vacated slot" and a "one-row footprint"). Rulings: **the exchange** (queue card takes Gmail's exact footprint, crossfade, no CRM re-reveal) · **the card is a queue surface** (date title + two Part B sections, cropping at the lower edge, data reused never improvised) · **ordering deviation RULED (owner)** – Sarah first in her section in the hero card only, overriding longest-waiting-first, written into Part B as a ruled deviation and scoped away from the features tab · **prominence by motion, not color** (blue border proposed and declined – it would contradict the amber section) · caption moves out of the frame into the page's caption node · hold to ~3s, loop ~13s. Open verify item: possible right-edge clipping of the hero window (geometry miss → delta). Documents: build spec §3/§4 amended · motion-mock-plan A1/B6/C1 amended · design-brief §3b geometry rows added · roadmap §1c/S16-8 created.

- **2026-07-22/23 (s14 ruled; merged s15):** **Two reversals and a reconciliation.** (1) **FRAMER KILLED** – all Stage 3/4 work moves to plain HTML/CSS/JS + GSAP, built by Claude Code from `stage-2-index.html`, deployed to Vercel. The pixel target already existed as finished HTML; importing it into an unlearned visual tool (30–50 hrs) to reproduce it was the whole cost. Methodology lesson logged as a standing rule: **when an estimate balloons, challenge the tool before accepting the timeline.** (2) **SCOPE STAGED to "Option 2"** – one landing page with a single ~10-second autoplaying hero loop; the five scroll segments **DEFERRED** (§4b) pending conversion signal; the fully-static alternative rejected deliberately, since a page that cannot *show* capture argues the weakest version of a capture-first product. Estimate 3–5 owner-hours (was 8–15 in code, 30–50 via Framer). (3) **SEQUENCING CORRECTED (owner):** the build executes *before* page-copy planning – rework flows asset→page, never the reverse. **D6/D7/D11 all remain OPEN**; any document text implying otherwise is wrong. **New standing rules:** tracker is never a statistics source · owner-supplied figures authoritative · volume language qualitative, no loss fraction ever asserted · positioning wedge (technicals vs. logistics, never an outcome promise) · plain-language requirement, with the glossary now at the head of this document. **Documents:** §0 recomputed (build session heads the queue) · **§1a** created (the s14 rulings in full) · **§1b** created (three merge flags) · **§4a** pre-launch register and **§4b** deferred register created · design-brief §3b created (geometry, Gmail set, page architecture) · motion-mock-plan re-scoped (A1 active, A2 deferred, A4 technical guardrails added, Part C tombstoned with the acceptance pass preserved) · `option-2-build-spec.md` issued and reissued.

  **Verified at merge, not assumed:** the Daily Queue master contains **zero status pills** – the build spec's hero beat was wrong and Part A's H3 is right (**§1b/F1**, corrected in both documents) · the 80,000 figure sits nearest the most generous scenario in the owner's own model and rests on an undocumented ÷5 assumption contradicted by the project's own volume ground truth (**§1b/F2** – owner ruling needed before it goes on a public page) · the tracker credential is **20 cells**, not ~17 · the index's 16 em dashes are all in annotation chrome, so extraction into the page does not carry them. **Gaps the amendment record left, now logged:** Stage 5 has no ruled toolchain (→ D7) · the custom domain requirement survived Framer's death on new infrastructure (→ §4a) · a publicly-deployed page with placeholder copy needs `noindex` (→ §4a).


- **2026-07-22 (s13):** Stage 3 PLANNED. Lead-surface question resolved structurally: two-act film (inbound hook / outbound ruled climax), hero-loop-autoplay + scroll segments, one-change-at-a-time law, product-narrates-itself principle. **motion-mock-plan.md authored** (beats + complete fake-data spec + Framer build order); dataset = pre-action Thursday Jan 16 world, hero Sarah Chen (J.P. Morgan TMT, McCombs '21), user Ethan Vercel; real-person hero vetoed. Dataset ruled **sole content authority**; index poured → **stage-2-index.html v1.1** (diagnosed collisions incl. two 1.2 suppression violations; content-state edits only, pixels untouched; JPM = the world's multi-city bank, making the 2.13 sibling render and the section-6 alphabetical tie-break both true on screen). s12 "no HTML import path" note corrected (official HTML-to-Framer extension exists; 30-min timeboxed test = Part C Step 0). D6 validation-page content scope recorded; landing-page-design-is-unscoped flag raised. Framer execution (Jon) next; deltas return here. **[SUPERSEDED s14 – Framer was killed before this executed; see the s14 entry above. Retained as history, not as instruction.]**

- **2026-07-15** – Document created. Architecture agreed: single living roadmap; strategy-reset.md as strategy source of truth; specs demoted to input material pending D2. Inventory-as-venue framing adopted. D9 option (i) chosen. Recruiting PDFs retained. Landing page re-sequenced downstream of feature inventory + design spec. Two-repo split confirmed. Memory corrections executed. Trackr threat closed.
- **2026-07-15** – D1 closed. Name: Blotter IB; blotterib.com purchased; LinkedIn handle created.
- **2026-07-16 (session 2)** – OPEN-1 CLOSED (sectioned homepage; R6 closed). Surface 2 worked end to end. Live/Dying/Dead and P3 KILLED globally. Referral aging killed (binary model); OPEN-4 closed (pattern table killed); OPEN-5 closed (referrals as filter). Stage machine + terminals re-ratified; networking indicator killed; multi-city → R8; documents = native-storage intent. Standing principles recorded. Positioning thesis into D6/D7. ideas.md created. R7 + R8 opened. Late-session addendum: reminder EXIT MODEL ratified; universal manual override principle; 1.13 amended; OPEN-3 reduced to pure arithmetic.
- **2026-07-16** – D5 CLOSED (Group 1 beachhead, with clarifications). D4 amended: capture-first as stated intent. Inventory process reformed to plain-English clusters. Daily Queue surface substantially worked; Google Calendar read added to capture scope. Nylas email sent; Unipile partial answers. R6 opened then closed.
- **2026-07-16 (session 3)** – R7 CLOSED (three-layer model + five-state set; 1.5 thank-you → Concluded amendment; 1.3 both-dials extension). Surface 3 worked end to end (3.0–3.6): membership test; matched-only display + claim path; **bank-domain watch + two-ring processing policy ratified**; recruiting-coordinator contact class; interview-capture seam + point-of-need disclosure; quiet manual event add; context strip closed as events-only 7-day slice. R8 CLOSED → 2.13 ruled (simple model, independent-by-construction duplicates). D6 privacy claim-shape ratified (two-ring sentence). Session split invoked: Surface 4 + OPEN-2 + OPEN-3 → session 4.
- **2026-07-16 (session 4)** – Surface 4 worked end to end (4.0–4.13); every numbered OPEN marker closed; D2 close checklist bumped to session 5. Highlights: Google-only sign-in + identity/mailbox separation; mailbox connection flow (pre-OAuth explainer, wrong-mailbox gate, mismatch confirm); onboarding two-layer split + flow skeleton; **D10 OPENED** with owner ruling: **the manual product cannot be paid – capture-less launch is FREE; strategy-reset's manual-$20 bet formally overturned**; fork conditional; guided first entry; teaching empty states. OPEN-2 CLOSED (zero preference questions; opinionated silent defaults). OPEN-3 CLOSED (silence 5, bump 2, expiries 3/5 internal; final-silence reuses the dial; Sunday pile never expires; weekends dissolved). Import shape ruled (upload-only, 12-month backfill, capture-reconstructs + residue review). **Capture-never-bluffs ratified platform-wide.** M6 ruled in three layers – **LLM drafting DEAD, positioning wall**. Export paid-only / typed-confirm deletion / **facts-only retention**. Daily digest ruled. **BCC killed.** One-account rule, all-calendars, webhook sync. Landing-page sequencing: stays gated behind tokens + design spec; chain compresses. **D11 registered** post-close.
- **2026-07-17 (session 5)** – **D2 CLOSED. D9 CLOSED. The feature inventory is RATIFIED as THE product document; phase-1-decisions-spec.md, queue-spec.md, and schema-spec.md SUPERSEDED IN FULL and deleted by owner.** D9 final pass: section-6 tie-break translated and absorbed into 1.0 (by date, soonest first; same-date ties alphabetical by bank – no type precedence; phase-1's tie evidence carried); no-learning-content ratified as a standing scope wall; LinkedIn Chrome-extension capture KILLED outright (no lead-gen competition – own market); referral tree KILLED; v1 palette confirmed dead (tokens authored fresh). Supersession pass rulings: **within-section ordering completed for all six sections** (1 by time of day; 2–5 longest-waiting first; 6 per the tie-break line); **silence suppression ruled** (scheduled future event or completed recent interaction suppresses a contact's follow-up items; intelligent pause detection deliberately DECLINED – Concluded stays a human one-click); **terminal mutual-exclusion ruled** (terminal marking retires all items/obligations/event display instantly and silently – no cleanup prompt, view-only makes deletion impossible by construction) **+ terminals always one-click reversible** (v1's permanence named a defect). Housekeeping kills: system-seeded tags, tag-driven template auto-selection, bounce→retry permutation loop, voice-memo stray, onboarding-intake profile framing. **R9 REGISTERED** – Ring 1 sender-domain hunt (automated recruiting-sender universe; no existing list satisfies it; sequenced with capture build). **Data-dependency determination RULED** – three grants (envelope check whole-inbox / content on matched only / calendar read, write nothing), deliberate absences, facts-only retention; D4 vendor ask final-form. **Binding declaration RATIFIED.** §0 recomputed: design tokens unblocked as head of critical path. Owner build-approach instruction registered: **rebuilt spec pack + build decomposition plan added to §4** (dependency-ordered, small-verifiable milestones; standing WS-C gate – no build session without it); R4 scope extended to build-platform selection. Session 6 pointed at the onboarding-experience UX sitting.

---

- **2026-07-17 (session 6)** – Onboarding-experience UX sitting, **SPLIT EARLY by owner sequencing ruling**: post-gate onboarding design does not gate marketing materials and was out of place ahead of the build; marketing sprint takes the queue head. Recorded: **inventory header amended – ratified-not-frozen** (owner instruction: amendments legitimate with convincing reasons; "binding" must never wall off legitimate change). **Flag 1 resolved** – no dedicated lookback-disclosure moment; one value-framed clause inside the 4.1 pre-OAuth explainer; standing privacy-posture rule (reassurance concentrated in one calm place, minimal pages). **4.7 RESHAPED: continuous targeted lookback** – per-entity 12-month scan fires whenever a contact/bank is added; dissolves the empty-watch-list ordering problem; import-before-backfill becomes a special case. **4.9 Layer 1 \+ template system KILLED pending one formal confirm (s7)** – the 2.8 precedent transferred (real job, commodity territory, dedicated tools do it better, positioning blur); discovery corroboration discounted by owner; **Layer 0 retained, amended: no body prefill ever** – positioning wall strengthened ("Blotter never writes your outreach – not with AI, not with templates"). **Aha ceremony DECLINED** (history-gradient yield; blank-firing climax) → quiet-correct first render \+ adaptive closing beat \+ first autonomous capture as the real aha (4.4). **Pre-gate content assigned (4.x):** the capture-visualization asset (fake-data Gmail/Calendar → Surfaces 1 \+ 3), doubling as the core marketing demo. **Parked to build phase** (trigger: post-D3 build opening): onboarding screen sequence, guided-entry walkthrough, Flag 2 (first-render vs. 1.16 composition), mid-cycle manual-entry onboarding. D10 elevated. Session 7 pointed at marketing-sprint planning \+ design-token kickoff.

---

- **2026-07-21 (session 7)** – Marketing-sprint/design planning session; the sprint's PLANNING is complete, execution begins session 8. **4.9 Layer 1 kill CONFIRMED** (formal owner confirm; tombstone + resurrection condition logged to ideas.md; Layer 0 deep links clarified as pure convenience; positioning claim unambiguous: not an outreach tool). **Demo scope amended (inventory 4.x): ALL THREE surfaces** – Surface 2 ruled IN (the product is at core a CRM; the surface replacing the spreadsheet is the most direct behavior-change test). **Fidelity RULED: motion mock** (Framer animation over designed screens; screen-recorded prototype ruled out – no prototype exists this early; emotional validation, not over-promise-management, is the stage's goal); dynamic-first, statics derived. **CTA correction (owner): the sprint's landing page is a VALIDATION page – waitlist capture; nothing to monetize; D10 DE-ELEVATED off the sprint's path** (re-elevates only if a willingness-to-pay test is wanted on validation traffic; D10 now blocks the future product landing page instead). **Design pipeline RATIFIED: six stages (0 references → 1 tokens → 2 screens → 3 motion → 4 landing → 5 statics), plan-backward-execute-forward** – Stage 2 planned FIRST to derive what Stages 0–1 must collect/author. **Toolchain RULED: Claude Design (tokens + design-reference.html + exploration) → Framer (motion mock + landing page – one artifact, direct publishing); the v0/Bolt bake-off reclassified to the BUILD phase (folded into R4).** **Stage 2 planning executed to completion – all three surfaces, five-slot framework (job / must-hold / open questions / constraints / reference needs), every open rendering question ruled by owner** – full ledgers in design-brief.md (created this session as the living design authority, edited/replaced per session like this document): Surface 2 (tabs, panel/page split, list rows, dot+word states gray/blue/amber/green/SOFT-RED – emotional color permitted by owner ruling, no-guilt is a copy rule not a color rule; panel zones notes-before-timeline; unified bank page; quick-add) · Surface 1 (two-line rows, capture-clears-manual-in-three-dots – contingency buttons documented as temporary rendering per 1.13, an s7 in-session correction; chip strip; CONTAINED section groups chosen from rendered variants; footer Sunday-pile link; centered column) · Surface 3 (strip+agenda hybrid, two-week strip penciled owner-overridable; deadlines as differentiated rows, escalation = alarm-red family; quiet claim path). **design-brief.md added to the document architecture** (companion register + §4). §0 recomputed: Stage 0 heads the queue (session 8). Deferred deliberately: demo lead surface (Stage 3 call); D10 sitting.

---

- **2026-07-21 (session 8)** – Stage 0 execution session, **restructured mid-session by owner ruling, twice**. (1) **Division-of-labor amendment:** owner self-collection of screenshots retired early (sourcing friction \+ owner's stated non-fluency in visual analysis); replaced with Claude-pulls-inline / owner-judges-by-reaction – analysis is Claude's job, the taste verdict stays the owner's. (2) **Stage 0 CLOSED-COMPRESSED:** after live reference passes (Linear real-workspace screenshots; Attio/Things/Folk web pulls; owner-supplied Superday AI set; an owner-supplied cool/navy prototype screen), owner ruled the harvest sufficient and scrapped the remaining folder walk – residual reference needs move to just-in-time pulls during Stages 1–2. Harvested pattern statements \+ taste constraints recorded in design-brief.md §2 (quiet contained table, composed two-line rows, weight-anchored name, hairlines-not-grid, tabular numerals, quiet category pills; rejects: visible column grid, header counts, pacing badges, status-as-pill). **Temperature direction recorded (owner-leaned, confirm by eye s9): cool / navy signal, restraint-guarded against the Bloomberg-costume cliché** – supersedes the warm-neutral working read; final hues remain a Stage 1 by-eye decision per §4. **Competitive note banked:** Superday AI = learning-first platform with a manual-status CRM bolted on – the positioning mirror image; validates the no-learning wall and the computed-state differentiation (their status dropdown mixes interaction types with pipeline stages – vocabulary parked to ideas.md, state model untouched). **Stage 1 jumped early in-chat:** design-reference.html v0.1 authored as a seed (cool/navy palette, five states, dot+word vs. chip species, two-voice type candidate – sans for human-typed, ledger-mono for computed facts; three tensions flagged inline: state-blue vs. navy chrome, Inter-as-default, alarm-red deferred) – **the ruled authoring surface remains Claude Design; v0.1 is imported there as the starting point, nothing locked.** feature-inventory.md untouched this session. §0 recomputed: Stage 1 heads the queue (session 9, Claude Design). Standing corrections held: capture-first rendering baseline; no re-litigation of §3 ledgers.

---

- **2026-07-21 (session 9)** – **Stage 1 (tokens) COMPLETE** – executed in Claude Design; design-reference.html **v1.0 RATIFIED** (replaces the v0.1 seed; clean spec file + a `.dc` working file holding variant history, turns 1–11). Rulings, all by eye against rendered variants: temperature confirmed cool/navy, chrome lightened to `#1B3866`; character statement ratified (caption-voice edit); **two-voice type signature KILLED** – one workspace face, **Schibsted Grotesk**, computed facts separated by STRUCTURE (an 11px uppercase tracked tabular caption/audit voice) not a second font; five state colors re-tuned to a single cool-shifted set (gray/blue/amber/green/soft-red); **two-red question CLOSED** – one family, two intensities (alarm-red `#B4483B`); tag chips = 5% navy wash; section-container card grammar ratified (shared by queue sections + Applications bank groups); `--width-queue: 720px` cap; contact-row second line firm-outranks-title by weight; wordmark ratified (Space Grotesk "Blotter" + Archivo "IB", never appears in the workspace); neutrals + accent + navy-primary-action ratified. New open items → Stage 2: active-page chrome treatment; queue row affordances (snooze/overflow); final state-name copy. design-brief.md §2/§4/§6 updated; feature-inventory.md untouched (no mechanics changed). §0 recomputed: **Stage 2 – screen generation heads the queue (session 10, Claude Design).**

---

- **2026-07-21/22 (sessions 10–11, Claude Design)** – **Stage 2 EXECUTED on the canvas `Blotter Stage 2 screens.dc.html`** (22 turns, every iteration preserved). **s10 locks (Surface 2 + groundwork):** active-page chrome 1C; contacts list 5a (firm-in-ink amendment, brief §3 2.3); contact panel 7b+7a→12c (Linked-positions card removed – verified consistent with inventory 2.5); Banks tab 13a (contained-card grammar, wash header strip); bank page 13b (identity-left/process-right, fact stubs, contacts rail); queue affordances 14b (always-visible). Entity grammar recorded (brief §3a). **s11 locks (Surfaces 1 + 3 – Stage 2 complete):** Daily Queue master 17e – color framework 15b (temperature + glyph: gray = information · amber = a person waiting · red = a closing door; amber never time-pressure), escalation ramp gray 7–3d → alarm-red ≤2d (two steps, no gradient, section 6 only), snooze off deadline rows, boxed-chip Coming-up strip (cap 3, one line), 10px gaps, date-as-title, Draft verbs product-wide. Calendar master 22a (strip 21a) – rolling today-forward 14-day window (supersedes the two-week pencil), no weekend demotion, solid no-legend species dots (deadline ink · event gray · ≤2d alarm-red), strip-as-jump-control, deadlines-lead ordering law, date-range title, claim path once. **Fake-data-is-spec ground rule recorded on-canvas** – binds Stage 3's fake-data authoring. Process failure logged: session deltas stranded in handoff/fork files instead of the living documents → fixed s12.

---

- **2026-07-22 (session 12 – planning: reconciliation + Stage 2 close)** – **Stage 2 formally CLOSED.** s10–s11 rulings reconciled from the canvas annotations into design-brief.md §3a. Owner confirms recorded: **bank-page micro dot-track KEPT** (resolves the handoff/canvas discrepancy); **state names FINALIZED by acclamation** (Not yet contacted · You owe a reply · Awaiting their reply · Concluded · No response – inventory 2.1's placeholder marker discharged; no inventory edit needed, names were always a design-track deliverable); **quick-add popover + calendar manual-add popover renders DEFERRED to build phase** (mechanics ruled, rendering parked – neither feeds Stages 3–5). **stage-2-index.html CREATED** – the six locked masters (5a · 12c · 13a · 13b · 17e · 22a) extracted verbatim; ratified as the Stage 3 visual authority and Framer acceptance criterion. Scope drift DECLINED: pre-OAuth explainer (parked to build, s6) and morning-digest email rejected as Stage 2 extensions. **Registry rule RATIFIED** (standing process rules): this project is the sole registry; execution-tool sessions end with a delta and merge here before the next opens; forked copies deleted at merge. **feature-inventory.md untouched** – no s10–s12 ruling crossed the mechanism/rendering line (the firm-in-ink "§2.3 amendment" was the BRIEF's §3 2.3, not the inventory's – flagged and corrected in-session). File hygiene executed: s9-updates delta and s10/s11 handoff files absorbed and retired; stale session prompts deleted; design-reference.html v1.0 clean spec is the standing token file. §0 recomputed: **Stage 3 – motion mock heads the queue (session 13)**; D6/D7 sitting ELEVATED as the last pre-Stage-4 decision blocker; Nylas follow-up flagged.

---

*Edit this file, don't replace it. If this document and reality disagree, reality wins – then fix the document.*
