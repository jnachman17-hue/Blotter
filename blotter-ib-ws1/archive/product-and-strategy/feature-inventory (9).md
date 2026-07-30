# Blotter IB – Feature Inventory (RATIFIED – THE PRODUCT DOCUMENT)

**Status:** BINDING as of July 17, 2026 – **D2 CLOSED (session 5\)**. This document is the sole product authority for Blotter IB. Every mechanic in it is ratified. phase-1-decisions-spec.md, queue-spec.md, and schema-spec.md are **SUPERSEDED IN FULL and deleted** (D9 final pass \+ formal spec-status resolution, s5); their surviving technical conventions (RLS on every table, computed-at-read, local-timezone day math, the derivability-audit practice of proving the schema sufficient before code) are input material for the rebuilt spec pack, which is derived fresh from this document. Anything not in this document does not exist; new features fight their way in against the Group 1 beachhead. Downstream documents (design tokens, design spec, rebuilt spec pack, CLAUDE.md) derive from this document and never contradict it. If this document and reality disagree, reality wins – then fix the document.

**Ratified, not frozen (owner instruction, restated s6 – critically important):** every decision here is ratified and approved for build, but the inventory is settled, not unconditionally binding. New information, unforeseen realities, or genuinely new ideas that surface during the build can amend any feature or mechanic in this document. The bar is a convincing, logical reason – decisions are firm because we agreed on them, not arbitrarily – and every amendment is logged like any other ruling (dated, with reasoning). Sessions must not treat "the inventory is binding" as a wall against legitimate amendment; s6 recorded live examples (4.7's lookback model, 4.9 Layer 1).

**Created:** July 16, 2026\. **Last edited:** July 21, 2026 (session 7 – marketing-sprint/design planning: 4.9 Layer 1 kill CONFIRMED and tombstoned to ideas.md; 4.x demo asset expanded to all three surfaces, fidelity ruled as motion mock; Stage 2 design planning completed – all rendering decisions recorded in design-brief.md, the new design authority downstream of this document). Prior: July 17, 2026 (session 6 – onboarding-experience UX sitting, split early: backfill reshaped to continuous targeted lookback (4.7); backfill disclosure folded into the pre-OAuth explainer (4.1); privacy-posture rule recorded; 4.9 Layer 1 KILLED pending one formal confirm; onboarding aha-ceremony declined, adaptive closing beat adopted; pre-gate content assigned (capture-visualization asset); remaining onboarding UX parked to build phase).

**How to read:** Features are described as user experiences, in plain English. Bracketed tags are Claude's ledger, maintained for two downstream decisions: the September scope list, and the Gmail-permissions count (metadata vs. full body vs. calendar) that determines the OAuth ask. Tag key: \[ships | data needed | source\]. Data: none / meta (email headers) / body (full email content) / cal (Google Calendar read). Source: spec / call (interview-corroborated) / tracker (evidenced in Jon's real cycle) / new.

**Rulings context (July 16):** Beachhead \= Group 1 fresh-start users (D5 closed). Capture-first \= stated intent for September (D4 amended); manual buttons are contingency. Segment tags applied only where groups genuinely diverge.

---

## SURFACE 1 – DAILY VIEW (the homepage)

### 1.0 Display format – CLOSED July 16 session 2 (was OPEN-1); ordering COMPLETED s5

**Ruling (Jon, after R6 research): sectioned categories, no toggle, no per-item urgency score.** Priority is expressed categorically through fixed section order (the ratified P1/P2 principles worn openly – hard-timed first, live human waiting second), with deterministic, explainable ordering inside each section – never a blended score. Empty sections don't render. One opinionated display; no user toggle (convenience product wins on opinionated simplicity; every user does the identical job).

**R6 basis:** Huntr/Teal/Simplify have no computed "today" view at all – kanban databases with manual reminders, confirming the engine as the differentiation. Streak and Attio both converge on sectioned-by-time-bucket homepages (Overdue/Today/Tomorrow). Salesloft Rhythm is the ranked-queue case, but it runs on rich engagement signals at high volume and still sections first (Focus Zones containing ranked lists); Blotter has time-fact signals at single-digit daily volumes – ranked would ship Salesloft's model without Salesloft's signals. The interviewees' color-coded spreadsheet is itself a sectional mental model.

**Homepage structure (ruled July 16 session 2): two layers.**

*Context strip (passive, no checkboxes, no WHY sentences):* "Coming up" – interviews/coffee chats beyond today, visually distinct from owed items. Advance visibility without polluting the owed-list; the full view remains the Calendar surface. **Closed s3 as a 7-day, events-only slice of Surface 3 – see 3.6.** \[Sept | cal improves it; works manually | new – Jon ask s2, closed s3\]

*Owed sections, in fixed priority order:*

1. **Today's schedule** – calls/coffee chats/interviews today, with times (P1)  
2. **Replies waiting on you** (P2)  
3. **Thank-yous owed** (1–3hr norm; separate section – hours-character urgency, Jon confirmed)  
4. **Follow-ups due** (silence threshold crossed)  
5. **Referral intros to send** (never-dies category)  
6. **Deadlines & dated obligations** (merged: application deadlines \+ HireVue/test expiries – same approaching-date character)

**Within-section ordering – RULED s5 (completes 1.0; replaces phase-1's tier-ordering machinery, which is dead):** no cross-type urgency arithmetic exists anywhere – priority is categorical by section; ordering inside each section is plain and explainable. **Section 1 orders by time of day** (the 9am call above the 2pm call). **Sections 2–5 order longest-waiting first** – oldest unanswered inbound, most-overdue follow-up, oldest thank-you, oldest referral: the person who has waited longest sits at the top. **Section 6 orders by date, soonest first; items sharing a date order alphabetically by bank name (stable fallback: item label) – no type precedence, no urgency claim within the section.** (Same-date grouped rendering, e.g. "Due Friday:", → design spec.) The old tie-break evidence carries: Jon was tested on the exact app-vs-interview same-day pair and could not pick; the system does not fake a precision the domain doesn't have. \[Sept | none | s5, phase-1 evidence carried\]

**Unsubmitted planned applications (Jon ask, session 2 – ruled):** an application that is open, intended, and unsubmitted has no clock and therefore never appears as a daily item (would nag forever – violates P4). It lives as: (a) a filterable status on the Applications page ("Planning to apply"), and (b) a weekly Sunday-pile prompt ("these apps are open and unsubmitted – still planning? add a deadline?") which nudges deadline entry, promoting it into section 6\. Synthetic daily timers rejected as fake urgency. \[Sept | none | new\]

### 1.1 The engine – RATIFIED

The app builds your to-do view fresh every time you open it, computed from facts (who you emailed, who replied, what's scheduled, what's due) – never a hand-written to-do list, never stored state that can drift. Every item shows one plain sentence of WHY it exists ("Last emailed Sarah Jan 12 – silent 6 days. 1st follow-up due."). Nothing nags forever: items age out to a Sunday cleanup pile rather than rotting on the daily view. Only explicit human decisions (snooze, write-off) are ever stored. \[Sept | none | spec+call – the computed version of the color-coded tracker all three interviewees keep by hand\]

Ratified engine principles absorbed from phase-1 (D9): hard-timed beats soft-timed (P1); a live human waiting is near-top urgency (P2); triage, never nag forever (P4). **P3 KILLED July 16 session 2:** no Live/Dying/Dead or any state classification of outreach threads exists anywhere (Jon ruling). The system has only: user-set timing thresholds that generate re-bump items, the bump cap, human one-click clears, and the Sunday pile for exhausted threads. No decay curves, no 'salvage' reframing, no non-monotonic urgency machinery. (Sectioned display had already absorbed P3's ranking role.) *(s3 note: the five thread states in 2.1 are fact-derivations, not a classification revival – each is pure arithmetic on dates, counts, and human clicks.)* **Copy style rules carried to design spec (s5, from the retired reasoning-string registry): always name the human, always state the evidence (dates/counts), never guilt language, never exclamation marks; prefer state language ("1st follow-up due") over raw overdue counts.**

### 1.2 Follow-up reminders (silent threads) – RATIFIED; silence suppression ADDED s5

You emailed someone; they've been silent past your threshold (default 5 days – s4 ruling, see 4.6) → a "write the follow-up" prompt appears. Before the threshold, the thread is invisible – you never see 100 waiting items. Send the bump, clock resets. Ceiling of 2 follow-ups (3 total touches – the etiquette ceiling, stated unprompted by an interviewee). After the final bump goes silent, the thread STOPS appearing daily and lands in the Sunday pile asking "write off or try once more?" – batched, not an interrupting popup (Jon ruling, July 16). If a written-off thread ever gets a reply, it automatically comes back to life. **s3 clarification: write-off is THREAD-scoped, never contact-scoped – the contact lives in the CRM forever (1.16); reply-reopens applies to both terminal states (2.1).**

**Silence suppression – RULED s5 (absorbs the one surviving queue-spec generation mechanic):** a scheduled future event with a contact, or a completed recent interaction with them (call, coffee chat, interview), suppresses that contact's follow-up items – you never get "follow up with Sarah" when a coffee chat with Sarah is on the books or just happened; the thank-you/post-call machinery (1.5, 1.6) takes over instead. The mechanical signal (a calendar event, a logged interaction) IS the "conversation naturally paused" detector – facts, not inference. Jon's own case ruled on: email to confirm a chat \+ accepted calendar invite \+ no reply email \= correctly silent, because the accepted event suppresses. **Intelligent pause detection DECLINED deliberately (Jon \+ Claude, s5):** for threads that conclude without a reply and without an event, the system never semantically judges the ending – Concluded remains a human one-click (2.1). Worst case by design: one item appears once and is cleared with one tap. \[Sept | meta improves it; works manually | spec+call+tracker; suppression: s5\]

### 1.3 Per-contact threshold exceptions – RATIFIED, must-have at launch; AMENDED s3

Set an individual silence timer for any contact (the MD you don't want to pester \= 10 days) without touching your default. Jon ruling: must be easy to do and easy to find. **Amended s3: the override covers BOTH dials – silence days AND bump cap** (the MD gets 10 days and maybe only 1 bump). Default values for both dials RULED s4: silence 5 days, bump cap 2 (4.6). \[Sept | none | call – Jon's own §2.6 note, extended s3\]

### 1.4 OPEN-2 – CLOSED s4 → see 4.6

Onboarding asks zero preference questions; opinionated defaults ship silently (silence 5 days, bump cap 2), taught at point of need on first fire, independently findable in settings from day one, universal change for both dials in settings. Weekend question dissolved: weekends count; no suppression mechanic; copy guardrail \+ thank-you exemption per 4.6.

### 1.5 Thank-you reminders – RATIFIED, timing amended s2, thread-effect amended s3

A call/coffee chat/interview happened and no thank-you sent → reminder appears IMMEDIATELY after the call ends. **s4 arming clarification: the reminder is created the moment the call is scheduled, set to fire the instant the scheduled end time passes** – nothing waits for a human to notice the call ended. (Jon, July 16: the 24-hour rule is stale; the norm is now 1–3 hours post-call, while content is fresh – write immediately or schedule-send). One click "Sent ✓" clears it. **Amended s3 (Jon ruling): sending a thank-you logs the email as a fact and moves the thread to Concluded (2.1) – a thank-you NEVER starts a silence clock, because you don't bump a thank-you.** If they reply to it, the reply reopens the thread automatically. A deliberate later re-touch is a user-set snooze-to-date (1.12) – human, no new machinery. **Exit model (s2, final):** the reminder leaves via (1) capture detecting the sent thank-you, (2) manual clear/snooze/kill, (3) kill in the Sunday sweep, or (4) timed expiry (day-count RULED s4: 3 days in view, then Sunday pile – see 4.6). Timed expiry removes the REMINDER only, never touches contact or thread state. \[Sept | cal makes detection automatic; meta detects the sent reply | spec, amended s2+s3\]

### 1.6 The post-call flow – REDESIGNED July 16 (replaces separate debrief \+ prep mechanics)

The app knows your calls from Google Calendar (capture-first intent). When a call's end time passes: one clean flow – jot notes if you want, answer "did they refer you to anyone?" (feeds referral chaining), and the thank-you reminder fires (1.5). No mandatory "log how it went" interrogation. *(s5 note: phase-1's separate "debrief" item type is formally dead – the s4 arming rule in 1.5 dissolved the dangling-state problem it existed to solve.)* \[Sept under capture-first | cal | new – built from Jon's Q11+Q17 rulings\]

### 1.7 Prep-status tracking – KILLED July 16

The spec's prep\_status field, "prep not started" flags, and T-minus-5/T-minus-2 escalation mechanics die. Jon's reasoning: prep behavior has no standardization (Google Docs, pen and paper, five minutes, none) – the app must not demand a prep status. **Survives:** today's calls shown with times; ability to attach notes or a prep doc to any event for those who want it. \[kill recorded against queue-spec §2.7b and phase-1 §2.2 prep rules\]

### 1.8 Referral reminders – AMENDED July 16 session 2 (aging machinery killed)

Someone referred you to a new contact; intro not yet sent → an item in daily section 5\. **Binary model (Jon ruling, s2): a referral intro is either outstanding or deliberately dismissed – nothing else.** No aging, no day-count staleness, no fade tiers, no "salvage" framing, no low-priority list: "either you reached out or you didn't, and sometimes by design you didn't" (goodwill-gesture referrals are real and legitimately ignorable). Outstanding \= appears in section 5 until the human sends the intro or one-click dismisses (reversible; the contact remains in the CRM either way; referral volume is small enough that persistence isn't clutter, and this matches 1.12 – only humans clear relationship items). Corroboration unchanged: "best thing was a referral"; one interviewee asks on every call. \[Sept | none | spec+call, amended s2\]

### 1.9 "They replied – reply back" – RATIFIED under capture-first

An inbound reply you haven't answered ranks near the top. Under capture this is the product's best moment – it knows an analyst replied 3h ago before you've opened Gmail. (Under the manual contingency its value is thin – the app only knows because you told it; accepted as contingency cost.) **Amended s2:** same exit model as 1.5 – capture-detected reply, manual clear, Sunday kill, or timed expiry of the reminder (day-count RULED s4: 5 days, matched to the silence threshold – see 4.6). No stale inbound rots on the daily view. \[Sept | meta | spec, amended s2\]

### 1.10 Deadline countdown – RATIFIED, plus capture upgrade

Applications with a close date you've entered surface during the final week, escalating daily; a passed deadline never marked submitted asks "missed it, or fix the date?" No pre-loaded deadline database (dead per strategy-reset §4.3; Trackr owns that slot). **Capture upgrade (Jon, July 16):** submission confirmation emails are universal – the app should detect them and mark the application submitted automatically. *(s3: detection rides Ring 2 of the two-ring policy – see 3.2.)* \[countdown: Sept | none | spec\] \[auto-submit detection: Sept-if-capture | body – confirmation parsing needs content | new\]

### 1.11 Dated obligations (HireVue / tests) – RATIFIED, plus capture upgrade; AMENDED s3

One-off dated tasks attached to an application (label \+ date), reminding as the date nears, escalating if expiring. **Capture upgrade:** detect the HireVue invitation email and create the task with its expiry automatically (expiry date is in the body of these automated emails – Jon's inbox evidence, s3). Jon (July 16): full read access is "pretty imperative" for this class of feature. **Sender reality (s3, Jon's inbox):** HireVue-class invites arrive heterogeneously – vendor root domains with the bank only in the display name (`JPMorganChase <interviews@hirevue.com>`) AND bank-branded ATS tenancies (`noreply@morganstanley.tal.net`) – handled by Ring 1's three match classes (3.2). **Amended s3: auto-created dated obligations render on the Surface 3 calendar** (external-date class per 3.0). *(s4: if the expiry date can't be parsed, the obligation is created undated with a one-tap completion prompt – per the capture-never-bluffs principle. s5 schema note for the rebuilt spec pack: dated obligations must therefore allow date-less records – the old schema's required-date rule is dead.)* \[manual entry: Sept | none | spec\] \[auto-creation: Sept-if-capture | body | spec, evidence upgraded s3\]

### 1.12 One-click actions everywhere – RATIFIED

Every item clears with one button that also records the underlying fact. Snooze (tomorrow / 3 days / next week / pick date). **Distinction ratified s2:** the system may EXPIRE a reminder on a timer (housekeeping – contact and thread state untouched, per 1.5/1.9), but a relationship WRITE-OFF (marking a thread dead – thread-scoped per s3, never removing a contact) is ALWAYS a human click and reversible. "Try once more" grants one extra follow-up beyond the ceiling, once. \[Sept | none | spec, amended s2\]

### 1.13 Manual confirmation & universal override – AMENDED s2 (buttons never fully die)

Two lives. (1) Contingency period: if capture slips, prominent "I sent it ✓" / "They replied ✓" buttons carry the product at launch, as before. (2) **Permanent (Jon ruling, s2): every state the platform intends to auto-capture from Gmail or Calendar carries a low-visibility manual override** – a three-dots affordance: mark as sent, mark replied, mark submitted, log a missed call, correct a wrong capture. Capture is never trusted absolutely; the override is quiet but always present. Prominent buttons die when capture lands; the override layer is a standing feature. Also de-risks D4. \[Sept | – | spec, amended s2\]

### 1.14 Sunday cleanup pile – RATIFIED

Intake (per s2 exit model): exhausted follow-up threads (via bump cap), timed-retired thank-you and inbound reminders (via 1.5/1.9 expiry), and open-unsubmitted application prompts (via 1.0). Items collect in a weekly pile; the app prompts you into it on Sunday, but it's accessible any time (Jon amendment, July 16). Each item is decided individually: write off or try once more. Keeps the daily view clean without the app playing god. \[Sept | none | spec\]

### 1.15 Empty state – RATIFIED

Empty day \= "Clear – nothing owed today." No confetti. **Related (Jon, July 16, → design spec):** small human moments elsewhere – e.g., something motivational when items get checked off or an offer is logged. Impactful detail; humanizes the tool; word-of-mouth fuel. \[Sept | none | spec \+ design-spec note\]

### 1.16 Never-emailed contacts – RESHAPED to CRM feature

Contacts always live on the CRM page regardless of contact history (nothing is ever invisible). The idea of surfacing "added but never emailed" moves to the CRM session as color-coding / filter / sort options (by bank, status, alphabetical). Parked with Jon's notes intact. *(s3: "Not yet contacted" is now a first-class thread state in 2.1 – filterable natively.)* \[→ Surface 2\]

### 1.17 Contact rotation within a bank – PARKED July 16

Shashank's unprompted ask (when a Goldman thread dies, suggest other Goldman contacts you haven't tried). Jon: don't like it upfront; park it. Not in September, not in October; revisit on user signal. \[parked | none | call\]

### 1.18 Gamification / stats – → IDEAS (expanded s2)

Two distinct ideas, both logged, neither core (Jon, s2: "absolutely not a core function"): (a) **personal stats dashboard** – emails logged, coffee chats held, banks applied to, for motivation; cheap, no cold-start; (b) **community comparison** – averages per category, leaderboard; needs other users' data, cold-start and privacy questions. Discuss later. \[ideas | – | new, Jon July 16 s1+s2\]

### Dead on this surface

All Stage 0/1/2 staging language throughout the specs (replaced by manual/captured framing). Deadline-dataset residue in queue-spec §2.5 prose. Prep-status machinery (1.7). Interrupting exhaustion popups (batched to Sunday instead, 1.2). *(s5 additions: the debrief item type; cross-type urgency ordering and all tier machinery – see 1.0.)*

---

## SURFACE 2 – CRM / CONTACTS & BANKS – WORKED (session 2\)

*(Surface labels corrected per Jon: Surface 2 covers Contacts CRM and Banks/Applications; Surface 3 is the in-platform Calendar.)*

**Grounding note (July 16 session 2):** clusters below are grounded in IB\_Network\_\_Application\_Tracker.xlsx (88 contact rows, \~30 application rows). Standing epistemic ruling: the tracker is reference evidence for which jobs are real and which failure modes to design against (stale tags, free-text bank fragmentation, columns interchanged) – NOT a template bounded as source of truth.

### 2.1 Contact status: computed, never stored – RATIFIED; vocabulary CLOSED s3 (was OPEN-R7)

No status dropdown exists. The CRM derives thread state from facts. Evidence: Jon's own hand-maintained tags rotted in one cycle (NOT-YET-EMAILED tags on emailed contacts; dozens of unmarked bounces) – stored status fails under real load. Status is visible, filterable, and sortable on the contacts list; its visual rendering (chips/colors/placement) → design spec, Jon's notes carried. \[Sept | meta improves; works manually | tracker – failure-mode evidence\]

**R7 CLOSED (session 3\) – the three-layer model \+ five-state vocabulary.**

*Research finding:* no canonical public contact-status vocabulary exists (most circulating templates are dates \+ freeform notes; named "Status" columns are never defined) – consistent with R6 and the rot evidence; the set was decided on internal logic \+ tracker evidence, which is where it was always going to rest. Two external corroborations kept: "two clocks" (contacted vs. heard-back as separate facts, WSO-native) supports the awaiting/owe-reply split; the temperature/tier axis (Cold/Warm/Champion, 2 independent sources) was **DECLINED, not parked** – stored human judgment, exactly the class 2.1 refuses to store, already satisfiable today via 2.4 tags.

*The three layers (ratified):*

1. **Thread state** – where the correspondence stands, exactly one per contact.  
2. **Events** – calendar facts. "Call scheduled" / "call done" EVICTED from the state set – already served by Today's schedule, the context strip, and the post-call flow. A call ending triggers things (1.5, 1.6) but is never a persistent state. (This dissolves the coexistence problem: a booked call and an unanswered email live in different layers.)  
3. **Derived flags & badges** – needs-valid-email (per 2.2, describes the address book, not the conversation), met-in-person, referred. States and badges never collide: a bounced guess \= Not yet contacted \+ needs-valid-email badge; new address works → correspondence begins, badge clears.

*The five thread states (names are placeholder copy → design spec):*

1. **Not yet contacted** – no outbound ever sent.  
2. **Awaiting their reply** – your email is out. Threshold crossing generates the follow-up item but does NOT change the state; bump count is a fact within this state.  
3. **You owe a reply** – inbound sitting with you.  
4. **Concluded** – the natural ending every thread has. Human one-click, reversible ("thanks, I'm too senior – email this person" ends here and fires the referral stub via 2.6). The system never semantically judges that a reply needs no answer – concluding is human, per 1.12.  
5. **No response** – bump cap exhausted \+ final silence elapsed. Pure arithmetic on dates and counts – no judgment, no decay curve. The Sunday-pile write-off destination.

*Terminal rulings:* Concluded and No response stay DISTINCT (same inertness, different arrival paths, different real filters: "who never answered me" vs. "who I finished with cleanly"). **Reply-reopens applies to both terminals.** Write-off is THREAD-scoped only – no contact is ever written off from the CRM (1.16).

**Import hard requirement (feeds import/ingest spec):** imported status columns are NEVER ingested as state – facts only; capture backfills thread history; states recompute from truth. Stale judgments are discarded, not reconciled.

### 2.2 Email addresses: per-address records with tombstones – RATIFIED

A contact holds one or more email addresses, each with its own validity state (unverified / valid / bounced). A bounce never marks the person. Bounced addresses tombstone: hidden from the visible record entirely, but remembered so the system never re-suggests or silently re-accepts a dead variant (protects future manual retries). Contact-level derived state is "no working email" (only-bounced or none) – filterable as the email-hunt list Jon asked for; **confirmed s3 as a Layer-3 badge, never a thread state.** Under capture, bounce-backs are detectable → bad-address marking becomes automatic. *(s5: this per-address tombstone model formally replaces the old schema's one-email-per-contact rule and the bounce→retry pattern-permutation loop, both dead.)* \[Sept | meta automates bounce detection; manual otherwise | new – Jon ruling, session 2\]

### 2.3 Banks as normalized entities – RATIFIED; tiers CUT

Bank is chosen from a known list with a free-text escape hatch (unknown banks can be typed and become entities; never blocked). Required because free-text firm names fragment every by-bank view (tracker evidence: RothChilds, Huliihan, Raymond Jones/James, 3 spellings of JP Morgan). **Bank tiers (BB/EB/MM/Boutique) CUT for September** (Jon ruling): curated-content burden of the deadline-dataset class, subjective at the boundaries, functionally display-only, unrequested in discovery. Cheap future shape if user signal appears: user-set optional tag on the bank entity → IDEAS. *(s3: bank entities now also carry email domains for the Ring 1 watch – seeded for majors, learned per user; see 3.2 and R9.)* \[Sept | none | tracker\]

### 2.4 Relationship tags – RATIFIED

Zero or more free tags per contact (e.g., KA & PGN & UT Austin simultaneously). Purely cold \= no tags, a legitimate state never demanded at entry. Tags are a filter only – never a grouping axis. Primary organization of the contacts list: bank / computed state / alphabetical. Separate field from referred\_by (the tracker's single Relation column conflated affiliation text with referral links – schema splits them; a contact can be both referred by Bob and tagged KA). *(s3: also the designated home for any user who wants a warm/cold temperature marker – see 2.1 R7 close. s5: the old schema's six system-seeded tags and single-tag-per-contact structure are formally dead – tags are free, plural, and emerge from use.)* \[Sept | none | tracker\]

### 2.5 The contact record – RATIFIED

A record view exists (clicking a contact opens their full picture); its entire visual layout → design spec, built fresh (nothing from the deployed UI survives by default). Fields, all optional except name:

*Identity facts (tracker-grounded):* name, position/title, firm (normalized bank link), location, group/division (**context only** – see standing principle below), email addresses per 2.2, LinkedIn link, degree/school note (quick pre-coffee-chat reference; the "unusual degree" conversation hook).

*Relationship structure:* tags (2.4); referred\_by link; and the mirror the spreadsheet couldn't do – who this contact referred you to, both directions of the chain visible. *(s5: this both-directions view IS the complete referral-chain feature – the phase-1 "referral tree" rendering is KILLED, never to resurface; chains are shallow, referred\_by is the whole structure.)*

*Interaction timeline:* the engine's existing facts rendered per-contact (emails, calls, thank-yous). Self-assembling under capture; logged-only under manual contingency. Display of facts, not a new mechanism.

*Controls:* per-contact overrides for BOTH dials – silence threshold and bump cap (entry point for 1.3, extended s3), snooze/write-off visibility, free multiline notes (no imposed structure – consistent with the prep-tracking kill; Jon's Notes column was the tracker's richest field).

**No enrichment, ever (Jon ruling):** no LinkedIn scraping, no photo/title autofill, no vendor enrichment. Autofill happens from spreadsheet import only. **One connected mailbox only** (closes the multi-mailbox question early; "email sent from" is a non-field). *(s5: the phase-1 LinkedIn Chrome-extension capture path is KILLED outright, not parked – no competing in the lead-gen/scraping market; manual entry or import is the deliberate boundary.)* \[Sept | none | tracker\]

### 2.6 Referral stubs – RATIFIED

The post-call flow's "did they refer you to anyone?" creates a minimal contact – name \+ referred\_by, nothing else required (in the moment you often have only a name). The stub immediately (a) surfaces in daily section 5 as an outstanding intro and (b) appears in the needs-valid-email filter (2.2) if no address. Chains build themselves from calls; contacts can be skeletal at birth; no separate referral object exists. \[Sept | cal improves via post-call flow; works manually | new – Jon's real Bob→Joe flow\]

### 2.7 Referrals live as a filter – CLOSED (was OPEN-5)

No dedicated referrals page. The contacts list filters by referral status (outstanding / dismissed / completed intros). A referral IS a contact (tracker evidence: Chris's eight referrals are all just contact rows); a dedicated page would duplicate the list with one filter pre-applied. \[Sept | none | tracker\]

### 2.8 Email-pattern guesser – CLOSED, table KILLED (was OPEN-4)

The curated firm\_email\_patterns table dies: free tools (Apollo/RocketReach) own the cold-start slot per interviews, curation is content burden, and the feature contradicts the positioning principle ("not finding contacts for you"). Tracker note for the record: Jon's own Email Structures sheet proves the *job* is real – the kill is about who does it, not whether it exists. **Learned-from-own-data variant → ideas.md** (suggest a pattern only when the user's own confirmed-valid addresses support it, tombstone-aware; zero curation): revisit much later on interest, delivers \~nothing to the fresh-start beachhead anyway. *(s5: the seed table's corporate root domains are at most a minor input to R9, the Ring 1 sender-domain hunt – they do NOT satisfy it; the automated-inbound sender universe is a different database built for a different job.)*

### 2.9 Dedup soft-warning – RATIFIED (uncontested)

Adding a contact that closely matches an existing one (name/email) triggers a soft warning – nudge, never a blocker. Tracker evidence: exactly one true duplicate in 88 rows (rare but real). \[Sept | none | spec+tracker\]

### 2.10 Application stage machine – RE-RATIFIED (absorbed from phase-1, D9)

Not Open → Open → Submitted → Interviewing → terminal (Offer / Rejected / Withdrawn), with the **Tracking fallback** when no dates exist. Jon's concern (s2) that open dates are often unknowable in advance is exactly what Tracking solves: add a bank because you intend to apply; it sits in Tracking with no dates and nothing breaks; Not Open/Open activates only if a date is ever entered. States are auto-captured wherever an artifact exists (Submitted via confirmation-email detection per 1.10; Interviewing suggestible from interview/HireVue emails and calendar events – *s3: including matched/claimed interview events per 3.1*); user-marked otherwise. Open-date detection is NOT possible via capture (no email exists when a window opens) – dates are manual or absent, by design. \[Sept | body improves Submitted/Interviewing detection; works manually | spec+tracker\]

### 2.11 Terminal states – RE-RATIFIED verbatim from phase-1; AMENDED s5

Offer / Rejected / Withdrawn distinct (never conflated). Rejection is never a pipeline node – a one-click, emotionally neutral action from any stage (statistically the dominant outcome; zero guilt framing). Terminal applications collapse to an archived view, exit all active surfaces, full record retained forever.

**Amended s5 – mutual exclusion and reversibility (Jon rulings):** marking an application terminal retires ALL its items, obligations, and event display instantly and silently – no cleanup prompt (the old queue-spec's "ask to cancel the event" is impossible by construction: Blotter is view-only on Google Calendar and never deletes real events; it stops showing them, and the event still lives in the user's actual Google Calendar). Per-city duplicates are unaffected by construction (2.13 – each record fully independent; Lazard Chicago's superday doesn't care what happened to Lazard New York). **Terminals are always one-click reversible – v1's permanence was a defect:** un-marking recomputes everything and the application walks back onto every surface with all items intact, as if the marking never happened. \[Sept | none | spec, amended s5\]

### 2.12 Networking indicator – KILLED July 16 session 2

The computed pseudo-stage (lights up when any contact at the bank has correspondence) dies. Jon: tells you nothing – and the trigger logic is flawed (correspondence ≠ networking; the email might be "please don't contact me"). A possible "banks I'm actively networking with" view → ideas.md. \[kill recorded against phase-1 §1.2\]

### 2.13 Multi-city applications – CLOSED s3 (was OPEN-R8)

**R8 findings (directional – 4 of 22 banks verified):** Moelis \= strict separate application per city (distinct requisition IDs, explicit apply-to-one-only instruction); Morgan Stanley \= ONE application with a bounded RANKED selection (up to 3 of 4 offices \+ ranked groups); Evercore \= group × city matrix (each combination its own posting); Baird \= one bundled requisition, mechanism unverified. Part 2 of the question – whether separate submissions carry independent confirmations/statuses – went unanswered for every bank. ATS-tenancy corroboration: MS/Evercore/Moelis all run on \*.tal.net (feeds 3.2).

**Ruling (Jon, s3): simple model ratified – an application carries a cities multi-select plus a one-click "duplicate for another city" action. Preference-rank and group-axis machinery DECLINED.** Reasoning: Blotter tracks what you did, not the portal's form – a rank changes nothing actionable (deadlines, follow-ups, interviews); a note holds it if the user cares; Evercore's group axis is covered by the existing group/division context field (two applications distinguished by group); a per-bank application-shape taxonomy is curated-dataset-class maintenance (re-verify every cycle, per the research's own caveat) for information the product never acts on.

**The divergent-processes concern (Jon's Citi case) resolved by construction: a duplicated application is a FULLY INDEPENDENT record** – own deadline, own stage machine, own dated obligations, own interview process. The cities list on one record exists only for genuinely unified processes (the tracker's BofA row); duplicate/split is available anytime, not just at creation, if processes diverge later. R8's unanswered part 2 therefore doesn't block: independence-by-construction covers both realities. \[Sept | none | tracker \+ R8\]

### 2.14 Documents on applications – RATIFIED as native file storage, links as contingency

Jon ruling (s2): native in-app file attachment is the intent – cover letters, resume versions, coffee-chat notes, firm-specific prep docs pulled up in-app. Supabase Storage makes this moderately cheap but it is real build surface (upload UI, size/type limits, RLS on storage); complexity assessed at build planning against the D3-sized calendar; paste-a-link (Drive/Docs URL) is the explicit fallback if it threatens September. \[Sept-intent | none | spec, upgraded s2\]

### 2.15 Portal username, never password – RE-RATIFIED

The tracker is the permanent exhibit: a reused plain-text password across \~20 portal rows is exactly the spreadsheet behavior the product refuses to inherit. Username field only. \[Sept | none | spec+tracker\]

### 2.16 Record views exist; layout UNRATIFIED

A contact record view and an application/bank record view exist (inventory fact). Phase-1's hybrid layout (contacts as side panel, banks as full page) is **NOT absorbed** – Jon ruling s2: that is a design choice, unratified, decided fresh in the design spec. D9 absorbs only the existence of the two record views.

### Standing product principles (recorded s2, extended s4 \+ s5)

- **Capture never bluffs (uncertainty-surfacing principle – s4, platform-wide).** When capture knows it doesn't know, it surfaces the uncertainty once as a resolvable human-input item – never a silent guess, never a silent drop. Three trigger classes: (1) source conflict at a reconciliation checkpoint (import says applied; backfill finds no confirmation); (2) an arriving email lacking or contradicting expected context (the 3.2 triage family); (3) partial parse (invite found, expiry unreadable → obligation created undated \+ one-tap completion prompt). **Hard boundary, preserving the 3.4 absence-detection kill:** uncertainty items fire at defined checkpoints and events only – never from standing surveillance of artifacts the user is responsible for creating. Mirror of the universal override: the human can always correct capture (1.13); capture can always ask the human.  
- **Universal manual override on captured state.** Anything auto-captured (Gmail or Calendar) has an unobtrusive manual override for capture failure. Capture is never the only writer of a state.  
- **No outreach-pacing enforcement, ever.** The platform never encodes or nudges bank-level rate limiting; who/when/how often is entirely user discretion. Group/division is informational context only. (Amends the discovery finding's product implication; the norm may exist in the wild – the product stays out of it. Nudge concept → ideas.md.)  
- **No learning content, ever (scope wall – carried from phase-1 §5.6, ratified s5).** No technicals, no prep guides, no flashcards, no interview-prep material of any kind. Logistics layer only. Same standing character as the LLM positioning wall (4.9 Layer 2).  
- **Positioning note (parked to D6/D7):** "logistics layer, not a CRM, not AI slop" – owner's marketing thesis, session 2\. Assessment attached: correct angle, consistent with strategy-reset's convenience-product honesty; cautions – aggregate stats must be real/earned, and the honest claim is "no AI doing your outreach" (import remains LLM-assisted). *(s3: the two-ring sentence in the ledger below is the ratified privacy claim-shape.)*

*(All session-1 carried-in items resolved: sort/filter → 2.1/2.4; referrals filter → 2.7; dedup → 2.9; chaining → 2.4/2.6; record view → 2.5/2.16; threshold override entry → 2.5; pattern guesser → 2.8.)*

---

## SURFACE 3 – CALENDAR (view-only) – WORKED (session 3\)

### 3.0 Justification & membership test – RATIFIED

The surface earns its existence by showing a view Google structurally cannot: recruiting events merged with recruiting deadlines, nothing else – the moment it tries to be a general calendar it loses to Google; recruiting-only, it shows something that exists nowhere else. **Membership test (Jon ruling, s3): external dates show; self-imposed timers never do.** IN: matched calls/coffee chats/interviews; application deadlines (the JPM-due case – never on anyone's Google calendar, belongs here); HireVue/test expiries (bank-imposed date after which a door closes – same class as deadlines, per the section-6 merge logic; membership ruled, differentiated *rendering* → design spec). OUT: follow-ups due and thank-yous owed (self-manufactured timers, fully served by the daily view); undated obligations (no date, no calendar). View-only means Blotter never writes to Google; it does hold its own event records. \[Sept | cal | new – s3\]

### 3.1 Event sources & matching – RATIFIED

The calendar is the union of three sources: (1) **synced Google events that MATCH** – attendee email in CRM (catches most coffee chats automatically) or human-claimed; (2) **Blotter's own dated facts** – deadlines and expiries per 3.0; (3) **manual events** (3.5). **Unmatched Google events are invisible on this surface by default** – the dentist stays private, the view stays recruiting-pure. An unobtrusive "recent unmatched events" claim path lets one tap declare an event recruiting and bind it to a contact/bank; claiming quietly teaches sender/address mappings (feeds 3.2's learned list). A matched or claimed interview event feeds the 2.10 Interviewing suggestion – deliberate, already-ratified language. \[Sept | cal | new – s3\]

### 3.2 Unknown-inbound detection – bank-domain watch \+ the two-ring policy – RATIFIED (new feature, s3)

**The problem (Jon, s3 – previously unexamined in any spec):** the highest-stakes email of the cycle – the first-round interview invite – arrives from a sender the CRM has never seen (HR coordinator, scheduler, ATS no-reply). The reply-detection engine as specced watched known-contact threads only and was structurally blind to it. For a product positioned as "drops no balls," disqualifying. Survives the justify-against-the-beachhead fight instantly.

**Mechanism – deterministic, headers-only, no LLM. The two-ring processing policy (ratified s3; binding on the capture build; D4 \+ D6 input):**

- **Ring 1 – headers only, whole inbox.** Every inbound's sender is string-checked (dictionary lookup, no inference) against three match classes: **(a)** CRM contact addresses; **(b)** tracked-bank domains, suffix/contains-matched against normalized bank entities – catches ATS tenancies like morganstanley.tal.net – plus per-user learned mappings; **(c)** recruiting-vendor/ATS domains (seeded, enumerable set: hirevue.com, tal.net, myworkday.com, taleo, icims, etc.) – categorically recruiting mail by nature, always passes Ring 1; bank attribution via display-name/subdomain match (catches `JPMorganChase <interviews@hirevue.com>`) or human triage. *(s5: the day-one seed for classes (b) and (c) is produced by R9 – the Ring 1 sender-domain hunt, a dedicated research task sequenced with the capture build; no existing list satisfies it.)*  
- **Ring 2 – content, matched mail only.** Full body is read exclusively for Ring-1-passed mail: contacts' threads and recruiting-domain mail (submission confirmations, HireVue expiries, interview invites). Content of everything else is never touched – structurally, because the pipeline never routes it to a parser, not as a promise of restraint. Ring 2 volume is single-digit emails/day; parsing is template-match or cheap LLM-assist on machine-generated, structurally rigid mail.

**The watch list is self-generating per user – NOT a curated comprehensive dataset:** it needs only the banks YOU applied to (the stage machine already knows); domains teach themselves from your own CRM contacts' addresses; the confirmation email you tag at triage teaches a boutique's domain in one tap; majors \+ vendor domains are seeded so day-one isn't empty. No comprehensive-coverage requirement exists because each user's list converges on their own pipeline.

**Triage flow:** unknown sender from a watched domain → high-priority item ("New email from goldman.com – unknown sender – likely recruiting") → one tap: interview invite (track it; urgent-reply item fires) / rejection (one-click 2.11, emotionally neutral) / noise (dismiss; address ignorable thereafter). Judgment stays human; nothing here is classification machinery.

**Honest residue:** an unlisted ATS with no bank marker in any header, third-party staffing agencies, a recruiter's personal Gmail – first email invisible; lands in the manual layer \+ the 3.4 nudges; first triage teaches the domain forever after. **LLM inbound classification DECLINED → ideas.md** (real build surface, per-email inference cost, privacy conversation, uninspectable false-negative rate; buys \~nothing over domain-watch for the actual scenario). \[Sept-if-capture | meta (Ring 1\) \+ body (Ring 2, matched only) | new – Jon s3; the session's most important find\]

### 3.3 Recruiting coordinators – distinct contact class – RATIFIED

Interview/scheduling senders auto-create a contact at triage (Jon ruling, s3): sparse fields, attached to the bank, **class \= recruiting coordinator, not networking contact.** Full participant in thread states and follow-up clocks – HR going silent on your scheduling reply is the most urgent follow-up of the cycle, and thread machinery needs a party to key to – but excluded by default from networking-facing views, filters, and anything that would ever feed stats, so the contacts list keeps meaning what it means. **No-reply automated senders (submission confirmations) get NO contact** – nothing to correspond with; they feed the stage machine (Submitted) and teach the domain, nothing else; one-tap promotion exists for oddballs. \[Sept-if-capture | meta | new – s3\]

### 3.4 Interview scheduling – the capture gap \+ point-of-need disclosure – RATIFIED

Interview booking is chaotic (scheduling links, over-email time negotiation, "when are you free") and largely uncapturable at the booking step – no rigid structure exists to parse. **Resolution: the user's own universal habit – manually creating a Google Calendar event once booked – IS the capture.** Create it once, in Google, where you would anyway; sync \+ match/claim binds it; it flows to Today's schedule, the strip, and the 2.10 suggestion. The allergy line is double entry, and there is none – but Jon's sharper point stands: **the platform's zero-entry promise trains users out of backup systems, so this single-entry seam must be disclosed at the moment it matters, never buried:** when triage marks an interview invite → "Booked a time? Put it in your Google Calendar – I'll take it from there"; same nudge on a stage change to Interviewing. FAQ entry as backup; **onboarding stays clean** (Jon: worst place to see limitations); **absence-detection** (nagging when an Interviewing application has no calendar event) **DECLINED** as nag machinery growing back. \[Sept | cal | new – s3\]

### 3.5 Manual event add – quiet, permanent – RATIFIED

The universal-override principle applied to the calendar: a low-visibility manual event add, permanent, never core UI. Covers capture failure AND the no-artifact case – the coffee chat scheduled face-to-face or by text has no Google event to capture; without manual add, Today's schedule, the post-call flow, and the thank-you reminder all starve. Not a v1-vs-v2 fork; the same standing principle from 1.13. \[Sept | none | spec principle, applied s3\]

### 3.6 Context strip \= the 7-day slice of this surface – CLOSED

The s2 "Coming up" strip is the nearest slice of Surface 3 rendered on Surface 1 – same event set, same engine, zero new machinery; **placement is the entire feature.** The daily view is the only page reliably opened every day; a no-dropped-balls tool must not require navigation to know a superday is 48 hours out. Division of labor: owed sections \= what you must do (actionable, checkboxes, debt); strip \= what's coming (passive, nothing clears, nothing nags); Surface 3 \= the week's shape when planning. **Events-only** (Jon ruling, s3 – deadlines already have section 6's final-week escalation \+ the calendar; triple-coverage declined, strip keeps its events character). **7-day window**, capped at a handful of items, tap-through opens Surface 3\. Rendering → design spec. \[Sept | cal improves; works manually | s2 ask, closed s3\]

---

## SURFACE 4 – CROSS-CUTTING – WORKED (session 4\)

All carried-in items resolved s4: auth → 4.0; connection flow → 4.1; onboarding fork → 4.2–4.5; import/ingest shape → 4.7; settings/OPEN-2/OPEN-3 → 4.6; templates/merge M6 → 4.9; export/deletion/retention → 4.10; notifications → 4.11; BCC → killed 4.12; calendar mechanics \+ one-account rule → 4.13. Deep links absorbed by 4.9 Layer 0\.

### 4.0 Sign-in – RULED s4

**Google sign-in only at launch** (Jon ruling, s4). The audience is Gmail-presupposing by definition; no password machinery in a product whose own evidence base (tracker, 2.15) shows the cohort mishandles passwords; least auth surface to build for a calendar-constrained September. Email+password acknowledged as cheap to add later (Supabase-native) if demand ever appears – not a September item. **Binding schema principle: sign-in identity and connected mailbox are SEPARATE things.** The account you sign in with does not have to be the mailbox you connect for capture; nothing links them structurally, so the school-vs-personal-account mismatch is harmless by construction. \[Sept | none | new – s4\]

### 4.1 Mailbox connection flow – RULED s4

Three pieces, in order, all Jon rulings s4:

1. **Pre-OAuth explainer page.** Before Google's consent screen, a plain-human-terms page states what Blotter actually does with mail – the two-ring policy in lived language (it checks who mail is FROM across the inbox; it reads content only for recruiting mail from the banks and people you track) – AND pre-empts the consent-screen shock: Google's screen will ask for full mailbox access because no narrower scope exists; the real boundary is the stated processing policy, and this page is where it's stated. This is the ratified D6 claim-shape rendered at the point of consent, not a new claim. **Amended s6 (Jon ruling): the historical-lookback disclosure lives HERE as one clause, framed as value, never as a separate moment** ("so you start caught up, not from zero, I'll look back over your recruiting mail from the past year" – copy → design spec). No dedicated disclosure screen exists anywhere. **Standing privacy-posture rule (s6): privacy/security reassurance is concentrated in as few pages as possible – this page is the one place – maximally calm, framing Blotter as privacy-conscious without bogging onboarding down or inviting extra scrutiny; enough to make users comfortable, never enough to scare.**  
2. **Active wrong-mailbox gate.** An explicit, non-defaultable confirmation that the account being connected is the one the user conducts ALL recruiting through (personal or school) – a deliberate act (explicit toggle or typed acknowledgment), never ToS-style click-through-without-reading. Exact mechanism and copy → design spec; the *requirement of active confirmation* is the ruling. Justification: connecting the wrong mailbox is the product's worst silent failure – capture watches an inbox where recruiting never happens, every ball drops, and the product looks broken rather than misconfigured.  
3. **Identity/mailbox mismatch confirm.** Connecting a Gmail different from the sign-in account triggers a one-line confirm ("You signed in with X but are connecting Y – Y is the mailbox I'll watch"), never a block. Point-of-need disclosure pattern (3.4) applied to setup.

Disconnect/reconnect mechanics fold into the settings cluster alongside the one-mailbox rule. \[connection flow: Sept-if-capture, else Oct/Nov | – | new – s4\]

### 4.2 Onboarding flow skeleton \+ the gate – RULED s4 (gate shape → D10)

**The two-layer split (Jon ruling, s4): pre-gate onboarding entices – post-gate onboarding teaches.** Before the gate (paywall or free trial – shape is D10, newly opened, NOT ruled here): general-capabilities presentation \+ the seeded sample-data door. After the gate: the real setup – mailbox connection (4.1), the fork (4.3), guided first entry (4.4) – walking the user through actually operating the app with their own data, in detail. Rationale (Jon): once your data is in and the queue is computing your real to-dos, switching back to the spreadsheet is the thing you don't want to do – data-in IS the stickiness. Supporting fact: intermediary pricing is per connected account, so mailbox connection sitting post-gate means zero capture COGS on window-shoppers.

**Flow skeleton (recorded s4; screen-level experience design → dedicated sitting; visual rendering → design spec):** landing page (demo door, D6 chain) → Google sign-in (4.0) → pre-gate enticement layer → gate (D10) → pre-OAuth explainer → Gmail OAuth \+ wrong-mailbox gate \+ mismatch confirm (4.1) → fork (4.3) → guided first entry (4.4) → land on Surface 1, alive. \[Sept | – | new – s4\]

### 4.3 The fork: start fresh vs. upload – RULED s4 (conditional)

**Ruling (Jon, s4): if import proves September-feasible at marginal build cost, the upload path ships in onboarding day one; otherwise the fork is SHOWN with the upload door marked "coming soon" \+ email capture ("importing your tracker lands in October – leave your email").** Assessed at build planning, after D3 sizes the calendar. **Recorded default: the coming-soon fork (option 2\)** – Claude's assessment, accepted for planning: import is a not-started deliverable with real surface area (LLM-assisted column mapping, facts-never-state ingestion rule, bank normalization, review UI) while capture-first and a possible rebuild already compete for the same seven weeks; the conditional most likely resolves to option 2\. Either way the fork EXISTS in September – Group 2 visitors are captured, not silently churned. Segment tag applies here (one of the few places): fresh \= Group 1 Sept path; upload \= Group 2/3, live Oct/Nov. \[fork UI: Sept | none | new – s4\] \[import path: Oct/Nov unless D3 says otherwise | – | –\]

### 4.4 Guided first entry – RULED s4; s6 amendments recorded, screen design PARKED to build phase

**Both paths get guided first entry (Jon ruling, s4)** – this is an app with many surfaces whose only winning condition is being simpler to operate than the spreadsheet; nobody gets dropped into it cold. **Placement ruling: guided entry happens BEFORE the user first sees Surface 1**, and AFTER mailbox connection, so the first homepage render is computed from real facts – first bank \+ first 2–3 contacts entered under guidance, capture already live. The guided walkthrough continues INTO the surfaces (teaching actual use, not a capability tour – that job belongs to the pre-gate layer per 4.2).

**s6 rulings on the ending:** the designed "aha ceremony" (a staged reveal moment) is DECLINED – its yield is a history gradient (blank for the true day-zero beachhead user), and a climax that can fire blank is a bad climax. Replacement: **quiet correctness \+ an adaptive closing beat.** The first render simply computes whatever reality exists (real thread states via the 4.7 targeted lookbacks, the strip if a matched event is upcoming, honest teaching empty states elsewhere). The walkthrough's closing line reads the state it sees: history → "you're caught up – I'll keep this current"; nothing yet → "these surfaces fill as recruiting picks up – next reply, first call, I'll have it before you do" (optionally over a ghosted preview of a filled Surface 1; copy → design spec). The product's real aha is its **first autonomous capture** days later, marked by the 4.6 point-of-need teaching pattern – deferred but guaranteed, and it demonstrates the only thing the product uniquely does. **Screen-by-screen walkthrough design: PARKED to the build phase (s6 sitting split) along with Flag 2 (the first-render/1.16 composition question) and the mid-cycle manual-entry onboarding question.** \[Sept | cal/meta if capture live; works manually | new – s4, amended s6\]

### 4.5 Teaching empty states – RATIFIED s4 (pending Jon confirm on the link mechanic)

Every empty section/surface states what would appear there AND carries the shortest path to the action that fills it (empty Deadlines → "applications with close dates appear here" \+ an add-application button in place). Description \+ door, everywhere, as standing hygiene – so the app teaches its own value before and after data exists. \[Sept | none | new – s4\]

### 4.x Sample-data door \+ pre-gate content – notes s4/s6

Ratified as a landing-page capture mechanism (feeds D6) AND the natural content of the pre-gate enticement layer (4.2). **s6 assignment (Jon concept, ratified): the centerpiece of the pre-gate layer AND the core marketing demo is the same asset – a fake-data capture visualization showing Gmail/Calendar activity flowing into the product's surfaces in the background** – a visual way to understand that the platform is intelligently run. Made once, used pre-gate and on the landing page/social. **Amended s7 (Jon rulings): the demo covers ALL THREE surfaces – Surface 2 ruled IN** (the product is at core a CRM; the surface that replaces the incumbent spreadsheet is the most direct behavior-change test; computed status flipping untouched is the clearest visible proof of capture). **Fidelity RULED s7: motion mock** – hand-crafted animation over designed screens (Framer); screen-recorded prototype ruled out (a working-enough prototype is far downstream; this is emotional validation, not product footage); static marketing materials are derived from the same designed screens, dynamic-first emphasis. Seeded-demo display decision remains a design-spec input, unchanged.

### 4.7 Import/ingest – SHAPE RULED s4 (full spec remains its own deliverable)

**Intake (Jon ruling, s4): file upload only – xlsx/csv.** No Google Sheets link, no Drive OAuth scope, ever – one-time friction of File → Download beats a second Google consent in a product whose privacy story is already the hard conversation.

**Flow skeleton:** upload → LLM proposes column mapping (Anthropic API, per standing ruling) → human confirms the mapping, never silent → preview → facts ingest → bank normalization (2.3) \+ dedup soft-warnings (2.9) run through existing machinery → states recompute. **Ordering ruling (s4): import runs BEFORE the historical backfill scan** – import creates the banks and contacts that seed the Ring 1 watch list; backfill then knows what to match.

**Historical lookback – RESHAPED s6 (Jon ruling, replaces the one-shot connect-time scan): backfill is CONTINUOUS and TARGETED, not a single event.** Window stays 12 months of headers-only Ring 1 scanning. Mechanism: a scan at mailbox connect covers whatever the watch list holds at that moment, and **every subsequent contact or bank added – in onboarding, or in November – triggers a cheap targeted lookback for that entity's addresses/domains on arrival.** This dissolves the ordering problem structurally: the old one-shot model ran against an empty watch list on the fresh path (matching nothing, discarding everything, then going blind to history entered minutes later); accretive lookback means there is no moment when the CRM must be "complete" before history exists – each entity pulls its own past when it enters. The s4 import-before-backfill ordering survives as a special case of the same rule (import creates entities; their lookbacks fire). **Disclosure amended s6: the lookback is disclosed as one value-framed clause inside the pre-OAuth explainer (4.1) – no dedicated disclosure moment exists.** Carried to the rebuilt spec pack as a build requirement: per-entity targeted scan, idempotent, deduplicated against prior matches.

**Stale-status handling – RULED s4: capture reconstructs; humans resolve the residue.** Thread states rebuild essentially completely from the headers backfill (pure arithmetic on message facts). Application stages rebuild mostly, via Ring 2 parsing of historical confirmations/invites – honest residue: confirmations in a different mailbox, boutique domains unlearned at scan time, stages with no email artifact by design (Open dates, Withdrawn), unparseable formats. The review step surfaces ONLY the residue, with the old spreadsheet column shown read-only as reference ("your sheet said: Submitted") beside a one-click human confirm. The s2 hard rule stands verbatim: imported judgment never writes state – capture writes where artifacts exist, humans write where they don't, the old column only ever informs a human click. Wrong reconstructions are covered by 1.13 as always. *(Note: historical confirmation parsing is the heaviest Ring 2 surface in the product – template-rigid but real build; flagged for build planning.)*

**Placement (Jon ruling, s4):** import is permanently reachable from the CRM/settings – the onboarding fork (4.3) is an entry point, not the feature's home. \[import: Oct/Nov (4.3 conditional) | backfill: rides capture | new \+ s2 rules\]

### 4.6 Settings & defaults – RULED s4 (CLOSES OPEN-2 and OPEN-3)

**The philosophy (Jon ruling, s4): onboarding asks ZERO preference questions.** All defaults ship opinionated and silent. Grounds: (a) the MD-vs-friend divergence is a per-contact problem already solved at the per-contact layer (1.3's two-dial overrides) – no global answer is right for both; (b) minute-zero users have no informed opinion on thresholds – asking converts corroborated evidence into an uninformed guess; (c) the 1.0 principle applied to settings: convenience product wins on opinionated simplicity. Guided entry (4.4) asks only for FACTS (banks, contacts), never preferences. *(s5: the old schema's profile fields framed as "onboarding intake" – school, grad year, target class, cities – are dead as intake; any such fields exist only as optional profile facts, e.g. feeding merge fields, and nothing collects them at onboarding.)*

**Teaching & findability (Jon amendments, s4):** every default is taught at point of need the first time it fires ("Sarah's been silent 5 days – your default. Change it for everyone, or just for Sarah" – the 3.4 disclosure pattern). AND the settings are independently findable from day one – easy to locate, never buried, never reachable only via the teaching moment. Settings exposes the universal default change for BOTH dials (global silence days \+ global bump cap), distinct from 1.3's per-contact overrides.

**The two user-facing dials, and only two:** silence threshold and bump cap. Everything else below is an internal housekeeping constant, not a setting.

**The arithmetic (CLOSES OPEN-3 – all Jon rulings, s4):**

1. **Silence threshold default: 5 days.** (Discovery corroborated 6; 5 is owner judgment overriding it – recorded honestly; it's a default with a dial.) **Fencepost convention: send day \= day 0; the follow-up item appears on the morning of day 5\.** Sent Thursday → due Tuesday (Fri 1, Sat 2, Sun 3, Mon 4, Tue 5).  
2. **Bump cap default: 2** (3 total touches). Confirmed – corroborated unprompted in discovery.  
3. **Thank-you reminder expiry: 3 days** on the daily view, then Sunday pile (send late / write off – human decision, nothing silently drops). *Arming clarification (Jon, s4, feeds 1.5/1.6): the reminder is created the moment a call is scheduled, set to fire the instant the scheduled end time passes.*  
4. **Inbound-reply reminder expiry: 5 days** – matched to the silence threshold (Claude recommendation, Jon delegated): one rhythm, nothing in the product waits more than 5 days; after 5 days of daily display an item is wallpaper and the pile is the real escalation. Internal constant, not a setting.  
5. **Final-silence window (→ "No response"): reuses the silence dial itself** – after the last bump, the same 5 days (or that contact's override), then No response \+ Sunday pile. No new number.  
6. **Unhandled Sunday-pile items NEVER auto-expire.** Write-off is always human (s2 standing ruling); the pile can grow – that's its job.

**Settings-page residue (collected s4):** the ignored-senders list from 3.2 triage dismissals must be viewable and reversible in settings (a dismissed address is a standing decision, and standing decisions get an undo path).

**Weekend handling – dissolved, no mechanic (Jon \+ Claude, s4):** weekends COUNT in all day math. No weekend suppression exists – the platform never commands "send now" anywhere (items are surfaced debts, not send commands), so there is nothing to suppress. Two guardrails: (a) copy rule → design spec: weekend rendering of follow-up items stays neutral ("due," never "send it now"); the follow-up flow may reference Gmail schedule-send (draft Saturday, lands Monday 9am – the actual etiquette answer); (b) deliberate exemption: **thank-yous fire on weekends, always** – a Saturday coffee chat needs a thank-you within hours; a weekend mute would break the product's most time-critical item. \[Sept | none | new – s4; thresholds call-corroborated\]

### 4.9 Templates & merge (M6) – RULED s4, three layers

**The founding constraint governs: hold-until-manual-send. Gmail is always the editor; Blotter never sends.**

**Layer 0 – deep-link on every send-class item – RULED, September; AMENDED s6: no body prefill of any kind.** "Follow-up due for Sarah" → tap → Gmail opens on Sarah's thread; "thank-you owed" → tap → compose opens addressed to her. **The compose body is always empty – the words are entirely the user's.** A queue item without its action is a to-do app that makes you assemble the action elsewhere – friction is deferral, deferral is the dropped ball. Under capture the send is detected and the item clears itself. \[Sept | meta (thread ids) improves; works without | new – s4, amended s6\]

**Layer 1 – mechanical merge \+ the template system – KILLED s6, CONFIRMED s7 (owner formal confirm; FINAL).** Tombstone \+ resurrection condition logged to ideas.md (s7). Templates, merge-field substitution, the day-one starter, and the entire emergence model die together. Grounds (the 2.8 precedent, transferred): the job is real, but a dozen dedicated outreach products own the slot and do it better; it is real build surface; and it blurs the positioning sentence the product needs unambiguous. Discovery corroboration discounted by owner (n≈10, meaningless sample). Layer 1's trigger surface was always marginal – initial outreach generates no queue item (1.16), so merge would have fired from the CRM, off the product's main stage. **The positioning wall strengthens: "Blotter never writes your outreach – not with AI, not with templates. It gets you to the send window; the words are yours."** Resurrection path, if ever: strong user signal only (ideas.md entry, s7). **Layer 0 clarified s7 (Jon): deep links ship as a simple convenience – tap-to-Gmail – nothing more; for initial marketing the claim is unambiguous: not an outreach tool.** \[Layer 1: dead, confirmed s7 | – | owner ruling s6, confirmed s7\]

**Layer 2 – LLM drafting – DEAD, and a POSITIONING WALL** (recorded alongside the standing principles): no AI writes, rewrites, or completes outreach copy, ever. \[dead | – | owner ruling s4\]

**The emergence model – died with Layer 1 (s6, confirmed s7).** Retained here as a tombstone only; nothing template-shaped exists in the product.

### 4.8 Search & the audit question – RULED s4

**No unified audit/history dashboard** – the audit job ("find anything ever closed") is composed of pieces already on the books: archived applications with full records forever (2.11), the CRM filtered by the terminal thread states Concluded / No response (2.1 – exactly why the terminals stayed distinct), per-contact interaction timelines (2.5), and the referral filter's dismissed state (2.7). A dedicated page would duplicate these with filters pre-applied – the argument that killed the referrals page, reapplied. **New ruling filling the real gap: list search ships September** – the contacts and applications lists are searchable (name/bank at minimum). Search \+ the composed views IS the audit trail. \[Sept | none | new – s4\]

### 4.10 Data export & deletion – RULED s4

**Export (Jon ruling, s4): full export of everything the user owns** – contacts, applications, facts, notes – as xlsx/csv, one button in settings, **paid accounts only; NO export during free trial** (D10 dependency: presupposes the trial exists). Rationale: the trial-abuse case is real for THIS audience – a mid-cycle importer farms the one-shot cleanup (normalized banks, dedup, backfill-reconstructed states), exports, cancels; the hack propagates through cohort group chats. Defensibility refinements: **deletion is always available to everyone, trial or paid** – deletion and export are different rights; and the honest framing for copy: nothing of yours is ever captive (original sheet still in Drive, Gmail untouched, delete works instantly) – what trial excludes is exporting Blotter's computed WORK PRODUCT. Noted for D10: the export snapshot decays in Excel exactly like the old sheet did – the durable value is the engine, which is the retention argument.

**Deletion (Jon ruling, s4):** self-serve in settings; typed confirmation – the genuinely destructive, irreversible act earns the heavy gate (contrast 4.1's toggle); hard delete of all rows; **immediate mailbox disconnect \+ OAuth token revocation at the intermediary.** "Deleting is real and instant" is part of the privacy claim-shape.

**Captured-data retention (Jon ruling, s4): facts only, never bodies.** Ring 2 reads produce parsed facts (dates, stage changes, thread events); email bodies are never stored. Shrinks the breach surface; nothing ruled anywhere needs body re-display (2.5's timeline shows facts; the email itself is one deep-link away in Gmail). Feeds the permissions ledger \+ D6: "we read recruiting mail; we keep only the facts; we never store your email." \[all three: Sept (export gating rides D10) | – | new – s4\]

### 4.11 Daily digest email – RULED s4 (closes the notification question)

**Platform fact recorded (Jon, s4): desktop web only – no native app, therefore no push notifications; the channel question is email or nothing.** Ruling: **option B – a single quiet morning digest email**, sent ONLY on days where owed items exist (one line per item, deep-linking into the queue), one-click off. Not engagement machinery – logistics: "drops no balls" has a hole if the drop is the user not opening the app that day; same argument as the context strip, applied to the inbox. **Absolute empty-day rule: no items \= no email exists, ever** – the digest never says "all clear." Default-on with one-click-off recorded per the 4.6 opinionated-defaults philosophy (Jon floated elect-in as acceptable too – flip to opt-in with one word if preferred). \[Sept | none | new – s4\]

### 4.12 BCC send-logging – KILLED s4

Dominated in every branch: capture live → Ring 1 sees sent mail, redundant; capture slipped → the manual buttons (1.13) are already the ruled parachute, and BCC would add per-user address plumbing \+ an inbound-processing surface for a contingency inside a contingency. It also ADDS a user behavior (remember to BCC) to a product whose thesis is removing behaviors. One line to ideas.md for the record. \[dead | – | s4\]

### 4.13 One-account rule, calendar scope & sync – RULED s4

**The one-mailbox rule graduates to a one-account rule (Jon ruling, s4):** the connected Google account is THE account – mailbox and calendar together, one connection moment (the 4.1 flow), one consent. Switching \= disconnect \+ reconnect, re-running the 4.1 gates; captured facts remain (they're facts); backfill runs fresh on the new account. **Signup guidance amendment (Jon, s4):** the signup screen itself carries explicit, unmissable guidance to sign in with the Google account you conduct recruiting through – making identity \= mailbox the happy path from minute zero. The 4.0 structural separation STANDS as the safety net (a mismatched signup is still harmless – 4.1's gates catch it at connection); the guidance shapes behavior, the architecture forgives deviation.

**Calendar scope (Jon ruling, s4): ALL calendars in the account sync – no calendar picker, no setting.** Safe by construction: only matched/claimed events ever display (3.1), so reading everything costs nothing visible, and the user who keeps interviews on a side calendar is never silently missed.

**Sync (Jon ruling, s4): webhooks – invisible, automatic, near-real-time.** Vendor pushes changes the instant they happen (Unipile confirmed, R2; Nylas comparison pending); polling fallback is a build detail. **Zero user-facing sync machinery** – no sync button, no last-synced banner, no cadence setting; capture misses are covered by manual add (3.5) and the universal override (1.13). \[Sept-if-capture | meta+cal | s4\]

---

## THE GMAIL-PERMISSIONS LEDGER – FINAL (D2 close, s5)

| Feature | Needs |
| :---- | :---- |
| Follow-up engine, reply detection, thank-you send-detection | headers (meta) |
| Ring 1 bank-domain watch (unknown-inbound, 3.2) \+ 12-month backfill (4.7) | headers – whole inbox |
| Auto-logged calls / post-call flow / calendar surface \+ strip / event matching | calendar read |
| Ring 2 parsing: auto-submit detection, HireVue auto-creation, invite triage, historical confirmations | full body – matched mail only |

**Two-ring processing policy (RATIFIED s3 – the governing statement):** Ring 1 \= headers only, whole inbox, deterministic string matching against contacts \+ tracked-bank domains \+ recruiting-vendor domains. Ring 2 \= full content, exclusively for Ring-1-matched mail. Personal content is structurally never routed to a parser. **D6 claim-shape (ratified): "Blotter never reads your personal email. It checks who mail is from – and only reads recruiting mail from the banks and people you track."** The old narrow claim ("we only read emails from people you've added") is formally RETIRED. The OAuth screen remains mailbox-wide either way (Google has no narrower scope); differentiation lives in the stated processing policy. Privacy toggle ("watch my inbox: on/off") DECLINED for now – default-off blinds exactly the users who need it; cheap to add on real demand.

**Retention posture (s4, feeds D6):** facts-only storage – bodies read (Ring 2\) but never retained (4.10). The claim-shape's third leg: never reads personal mail; reads only matched recruiting mail; keeps only the facts.

### FINAL DATA-DEPENDENCY DETERMINATION (RULED s5 – the D4 vendor ask in final form)

Everything ruled in this product runs on exactly **three grants**, and nothing else:

1. **Grant 1 – envelope check, whole inbox (read-only headers).** Who every email is from and when it arrived, across the entire mailbox. This is the act of USING the watch list – the guest-list/doorman relationship: Google offers no scope narrower than the mailbox, so the "only recruiting mail" filter must run on Blotter's side, which requires glancing at every envelope, string-comparing, and discarding non-matches on the spot. Powers: reply/send detection, the follow-up engine, the bank-domain watch (the interview invite from a never-seen sender), and the 12-month backfill. Whole-inbox is non-negotiable because the highest-stakes email of the cycle comes from an unknown sender.  
2. **Grant 2 – content on matched mail only.** Full body, exclusively for Ring-1-passed mail. Powers: HireVue expiry parsing, auto-Submitted, invite triage, historical confirmation parsing. Single-digit emails/day; everything else is structurally never opened.  
3. **Grant 3 – calendar read, all calendars, write nothing.** Powers: post-call flow, thank-you arming, Surface 3, the strip, event matching.

**Deliberately absent, each by standing ruling:** no send permission (hold-until-manual-send); no Drive permission (import is file-upload only, 4.7); no calendar write (view-only, 3.0); no Google-contacts access. **Retention: facts kept, bodies never stored (4.10).**

**Vendor ask, final form:** read-only Gmail \+ read-only Calendar via the intermediary, webhook delivery. The one live vendor question: whether scopes trim to read-only under vendor credentials (Unipile: yes, confirmed; Nylas: pending). **Manual contingency, honestly priced:** if capture slips, every feature works manually EXCEPT the Ring-1-dependent class (domain watch, coordinator triage, backfill) – those don't exist until capture does, which is priced into the free-manual-launch ruling (D4/D10).

---

## D2 CLOSE RECORD (session 5, July 17, 2026\)

- **D9 final pass complete; phase-1-decisions-spec.md deleted.** Residue ruled: Tier-4 tie-break translated into 1.0's section-6 line; no-learning-content wall → standing principles; LinkedIn Chrome extension KILLED outright; referral tree KILLED; old palette confirmed dead (tokens authored fresh).  
- **queue-spec.md \+ schema-spec.md SUPERSEDED IN FULL and deleted.** Surviving mechanics ruled in: within-section ordering for all six sections (1.0); silence suppression \+ intelligent-pause-detection declined (1.2); terminal mutual-exclusion \+ always-reversible terminals (2.11). Housekeeping kills recorded: six system-seeded tags \+ tag-driven template selection; bounce→retry permutation loop; voice-memo stray; onboarding-intake profile framing. Salvage redirected: corporate-domain seed → minor R9 input only. Carried to rebuilt spec pack: RLS-everywhere, computed-at-read, local day math, nullable obligation dates, the derivability-audit practice. Carried to design spec: reasoning-string style rules.  
- **R9 registered:** the Ring 1 sender-domain hunt – dedicated deep research into the automated recruiting-sender universe; sequenced with the capture build; no existing list satisfies it (owner ruling).  
- **Data-dependency determination ruled** (three grants, above).  
- **Binding declaration RATIFIED.** This document is THE product document. Design tokens unlock; the D2 → tokens → design spec → landing page chain starts compressing.

## MARKER LEDGER (historical – all closed)

- OPEN-1 – CLOSED s2 (1.0). OPEN-2 – CLOSED s4 (4.6). OPEN-3 – CLOSED s4 (4.6). OPEN-4 – CLOSED s2 (2.8). OPEN-5 – CLOSED s2 (2.7). OPEN-R7 – CLOSED s3 (2.1). 2.13/R8 – CLOSED s3.  
- Surfaces: 1 worked s1–s2; 2 worked s2; 3 worked s3; 4 worked s4. D2 close checklist executed s5. **D2 CLOSED July 17, 2026\.**  
- D4 formal close: after vendor answers \+ D3. Manual launch \= FREE launch (s4 amendment); vendor ask now final-form (ledger above).  
- **Session 6 (July 17) – onboarding-experience UX sitting, SPLIT EARLY (owner sequencing ruling):** post-gate onboarding design does not gate marketing materials and was out of place ahead of the build. Recorded s6: inventory header amendment (ratified-not-frozen); Flag 1 resolved (lookback disclosure → one clause in 4.1's explainer; privacy-posture rule); 4.7 reshaped to continuous targeted lookback; 4.9 Layer 1 \+ templates KILLED pending one formal confirm (Layer 0 stays, no prefill); aha ceremony declined → adaptive closing beat \+ first-autonomous-capture as the real aha (4.4); pre-gate content assigned (capture-visualization asset, 4.x). **PARKED to build phase (reactivation trigger: build phase opens, after D3):** onboarding screen sequence, cluster 4 (guided-entry mechanics \+ 4.5 interplay), Flag 2 (first-render vs. 1.16 composition), mid-cycle manual-entry onboarding.  
- **Session 7 (July 21) – marketing-sprint/design planning session.** Layer 1 kill CONFIRMED (tombstone to ideas.md – debt paid). Demo asset expanded to all three surfaces; fidelity ruled motion mock (4.x amendments above). Design pipeline ratified (stages 0–5, plan-backward-execute-forward); toolchain ruled: Claude Design for tokens \+ design-reference.html, Framer for motion mock \+ demo landing page; the v0/Bolt bake-off reclassified as a BUILD-phase decision (R4 territory). **Stage 2 planning COMPLETE – every rendering decision for all three surfaces recorded in design-brief.md**, the new living design authority: downstream of this inventory, never contradicting it (mechanism ≠ rendering; this document rules mechanics, design-brief.md rules rendering). CTA correction ruled: the current landing page is a VALIDATION/demo page (waitlist capture – no product exists to sell); D10 de-elevated off the sprint's critical path (see roadmap D10). One s7 design-session correction recorded for the permanent record: the design spec describes the CAPTURE-state UI as the design; prominent manual-confirm buttons are documented as the temporary contingency rendering only (1.13's own ruling, applied to design).
- Pending sittings: D10 monetization – de-elevated s7 (blocks the future SALES landing page, not the validation sprint); D6/D7 – conversion copy \+ platform choice needed before the validation page ships.
- ideas.md debts: all paid (Layer 1 tombstone logged s7).

