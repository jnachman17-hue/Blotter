/**
 * Section 4 copy, and the source for `/privacy`.
 *
 * Authority: `06-SECTION-6-DATA-AND-PRIVACY.md` §5 through §15 for the
 * *structure* of this section, **substantially superseded on the facts by
 * `04-ENGINE-RULES.md` version 7 and `05-CONTRACT.md` version 4.**
 *
 * ## The September 3, 2026 rewrite, and why it was a rewrite rather than an edit
 *
 * `28-WEBSITE-AUDIT.md` found that almost every factual claim in this file
 * described a product that was never built. The page described a hosted service
 * that connected to Google through a third-party provider and processed matched
 * messages on a server. **What exists is a Google Sheet with a script inside it,
 * running in the student's own account.** Jon ruled on the audit and gave
 * permission to update all of it.
 *
 * Three things were false and are gone:
 *
 *   - **Sender matching.** The four steps described comparing a sender against
 *     the tracker. The engine reads whole conversations (`04-ENGINE-RULES.md`
 *     §2), because sender matching missed **29% of real incoming mail**
 *     — assistants replying for their banker, colleagues cc'd in, shared
 *     recruiting mailboxes, plain capitalisation differences.
 *   - **The connection provider and its CASA assessment.** There is no
 *     provider. Nothing is verified by Google — Google says so out loud on the
 *     consent screen, and the page said the opposite.
 *   - **Retention.** The page promised not to keep full message bodies. The
 *     server never receives one.
 *
 * ## The rule that replaces the old claim gates
 *
 * The old header warned that these statements were gated on facts that did not
 * exist yet. **That is no longer the failure mode.** Every claim in this file is
 * now true of something built, and each one names where it can be checked:
 *
 *   the contract      `web/app/api/engine/types.ts` — there is no `body` field
 *   the engine        `web/app/api/engine/route.ts` — writes nothing, ever
 *   the scopes        `courier/appsscript.json` — five, and only five
 *   the consent screen `17-INSTALL-OBSERVED.md` §1 — transcribed from a real install
 *
 * **So the standing instruction is the opposite of the old one.** Do not soften
 * these claims and do not hedge them. Do check them against those four files
 * before changing a word, because a claim that stops being true here is one a
 * stranger is entitled to rely on.
 *
 * The typographic apostrophes are the spec's own and are reproduced as written.
 *
 * This module is the single source for the section, the privacy-policy page and
 * the copy verification, so the three cannot drift apart.
 */

/* --------------------------------------------------------- 1. title and open */

export const PRIVACY_TITLE = "How Blotter uses your data";

/**
 * Amended by Jon on August 6, 2026 to name all three services, on the reasoning
 * that an opening statement naming two of three under-discloses the one section
 * whose whole job is disclosure. **That reasoning is why it changed again on
 * September 3, 2026**: the real consent screen asks for five things, not three,
 * and the two the page never named are the two a reader would most want warned
 * about — reaching an outside server, and running while they are away.
 *
 * `17-INSTALL-OBSERVED.md` §1 has all five, transcribed from a real install.
 */
export const PRIVACY_OPENING =
  "Letting anything read your Gmail is a real decision. Here is exactly what Blotter asks for, where it runs, what leaves your account, and what it can never do.";

/* ------------------------------------------------------- 2. main candid claim */

/**
 * §6. The section's primary visual anchor. No icon, no quote marks.
 *
 * Rewritten September 3, 2026. The old version described sender matching, which
 * the engine does not do, and stopped at "excluded before message content is
 * processed" — a promise about a server's behaviour. **The true claim is
 * stronger and simpler: the server never gets the text at all**, because the
 * reading happens inside the student's own Google account.
 */
export const CANDID_CLAIM =
  "Blotter runs inside your own Google account, and it only ever opens conversations that already involve someone in your tracker. Everything else in your inbox is never read. And the text of an email never leaves your account — Blotter’s server does not receive it, and refuses the request if one is ever sent.";

/* ------------------------------------------------ 3. four-step processing rows */

export interface ProcessingStep {
  n: string;
  title: string;
  body: string;
}

/**
 * §7. Four stacked numbered rows, thin divider between them. Not cards.
 *
 * **Rewritten September 3, 2026 to describe the mechanism that exists.** The
 * four old steps described sender matching and server-side retention; the
 * engine reads whole conversations and the server retains nothing.
 *
 * The order is deliberate and it is the order of the actual run: where it runs,
 * what it opens, what leaves, what comes back. **Step 3 is the one that carries
 * the section**, and it is the only place on the site that says exactly what
 * crosses the wire. Keep it exhaustive — a list that is nearly complete is
 * worse than no list, because a reader who finds the missing item stops
 * believing the rest.
 */
export const PROCESSING_STEPS: ProcessingStep[] = [
  {
    n: "01",
    title: "It runs inside your Google account",
    body: "Blotter is a script that lives in your own copy of the spreadsheet and runs on your Google account’s own permission. There is no Blotter account, and Blotter never holds a login or a password for your Google account.",
  },
  {
    n: "02",
    title: "It only opens conversations involving your contacts",
    body: "Every 15 minutes it looks for threads that already contain someone from your Contacts tab. A conversation with none of them in it is never opened — not because a filter rejects it, but because it was never something Blotter was following.",
  },
  {
    n: "03",
    title: "Facts leave your account. Text does not",
    body: "To work out what each conversation means, Blotter sends a short list of facts to its own server: who wrote, who it was addressed to, when, the subject line, and the titles and times of calendar events with your contacts. The body of an email is never sent, and the server refuses any request that tries to include one.",
  },
  {
    n: "04",
    title: "The answer goes into your sheet, and nowhere else",
    body: "The server works out each contact’s status and returns it. It writes nothing down — not the facts it was given, not the answer it sent back — so it has forgotten the question by the time you read the answer. The result lives in your spreadsheet, in your Drive.",
  },
];

/* ------------------------------------------------------ 4. the permissions table */

export interface ServicePermission {
  service: string;
  can: string[];
  cannot: string[];
}

/**
 * §8. One sober three-column matrix: Service, Can do, Cannot do.
 *
 * The bans that go with it: no per-service cards, no fake permission toggles,
 * no checkmark-versus-X marketing treatment, no simulated OAuth screen, and no
 * service mark large enough to dominate the table.
 *
 * ## Rewritten September 3, 2026, against the manifest rather than an intention
 *
 * Every `can` and `cannot` here is now a consequence of a line in
 * `courier/appsscript.json`, which is the only thing that actually decides what
 * is possible. **These are not promises about behaviour; they are descriptions
 * of what was granted**, and that is a much better kind of claim.
 *
 *   Gmail            `gmail.readonly`
 *   Google Calendar  `calendar.readonly`
 *   Google Sheets    `spreadsheets.currentonly`
 *
 * **Three rows, five permissions.** The consent screen also asks to connect to
 * an external service and to run while the student is away, and neither is a
 * Google *service* with a row here. They are disclosed in `BROAD_BODY`
 * immediately below this table, and in full on `/privacy`. If this table ever
 * gains rows for them it needs marks in `components/section-6/parts.tsx`, which
 * is why they are not rows today.
 *
 * `spreadsheets.currentonly` is worth understanding before editing the Sheets
 * row: it grants the one spreadsheet the script is installed in and nothing
 * else, so "cannot create a file" is literally true — `20-UI-BUILD-NOTES.md` §3
 * records the `Handover` menu item being built around exactly that limit.
 */
export const PERMISSIONS: ServicePermission[] = [
  {
    service: "Gmail",
    can: [
      "Read your mail, and only read it.",
      "Open conversations that already involve someone in your Contacts tab.",
    ],
    cannot: [
      "Send an email.",
      "Reply to anything.",
      "Change or delete anything in your mailbox.",
      "Open a conversation that none of your contacts is part of.",
    ],
  },
  {
    service: "Google Calendar",
    can: [
      "Read your events, and only read them, to find calls and coffee chats with your contacts.",
    ],
    cannot: [
      "Create an event.",
      "Change an event.",
      "Cancel an event.",
      "Accept or decline an invitation for you.",
    ],
  },
  {
    service: "Google Sheets",
    can: [
      "Read and update the one spreadsheet it lives in — the copy you made.",
    ],
    cannot: [
      "See that any other file in your Drive exists.",
      "Open, change or delete any other file.",
      "Create a new file anywhere.",
    ],
  },
];

export const PERMISSION_COLUMNS = ["Service", "Can do", "Cannot do"] as const;

/**
 * The scope note beside the Sheets row.
 *
 * **It used to say the opposite of the truth**, and the reasoning behind it is
 * worth keeping because the instinct was right and the fact was wrong. Jon
 * added it on August 10, 2026 so that a reader who trusted the page and then
 * met a *Drive* consent screen would not feel misled at the exact moment they
 * were being asked to trust. That is the correct instinct.
 *
 * The fact underneath it was `drive.file`, a per-file Drive scope, which is not
 * what was built. `courier/appsscript.json` asks for **`spreadsheets.currentonly`**,
 * and Google shows *"View and manage spreadsheets that this application has
 * been installed in"* — no Drive card at all.
 *
 * **The corrected version is narrower than the one it replaces**, which is the
 * pattern across this whole rewrite: there was never a file to pick, because
 * the script can only ever reach the sheet it is inside.
 */
export const SHEETS_SCOPE_NOTE =
  "Limited to this one spreadsheet — the copy you made. Blotter cannot see that any other file in your Drive exists.";

/* --------------------------------------------- 5. broad Google-permission notice */

/**
 * §9. Sits immediately below the table and must stay visibly legible. It may
 * not be demoted into the FAQ or set as fine print — that is an explicit
 * exclusion in §18 and a responsive constraint in §16.
 *
 * ## Rewritten September 3, 2026, and it now does two jobs
 *
 * The old version reconciled Google's broad Gmail wording with a narrower
 * processing claim. **That reconciliation was a promise about a server.** The
 * real one is better: the reading happens inside the student's own account, so
 * the boundary is not enforced by Blotter's good behaviour at all.
 *
 * **And it now discloses the other two permissions.** The consent screen asks
 * for five things and the table above has three rows. `17-INSTALL-OBSERVED.md`
 * §1 records that all five are required, that every box is unchecked by
 * default, and that nothing on that screen says so — *"a student ticking two
 * boxes out of caution gets a product that fails in ways they cannot
 * diagnose."* A student meeting two permissions this page never mentioned is
 * exactly the reader this footnote exists for.
 *
 * The heading changed with it. "Why Google's permission may sound broader"
 * answered a question about wording; the actual surprise on that screen is the
 * count.
 */
export const BROAD_HEADING = "What Google’s permission screen will say";

export const BROAD_BODY =
  "Google words the Gmail permission broadly, because it does not offer one limited to the people in your tracker. What makes the limit real is not a promise about processing: the reading happens inside your own Google account, and the only thing that ever leaves it is a short list of facts about conversations your contacts are already part of. Google will also ask for two things that are not services — permission to contact Blotter’s server, and permission to run while you are away, which is what keeps the sheet current every 15 minutes. All five are required, none is ticked by default, and nothing on that screen tells you so.";

/* ------------------------------------------------------- 6. what Blotter keeps */

export const KEEPS_HEADING = "What Blotter keeps";

/**
 * §10. One compact text block. Do not turn the examples into metric cards or a
 * data diagram.
 *
 * The em dash in the first paragraph is the spec's own. It contradicts the
 * standing page rule that Jerome Bowel's hero cell carries the only dash on the
 * page; Jon permitted it here on August 6, 2026, scoped to this sentence alone.
 * Recorded at the top of `06-SECTION-6-DATA-AND-PRIVACY.md`.
 *
 * **Rewritten September 3, 2026, and the answer got much shorter.** The old
 * version described a server keeping structured facts and not keeping bodies.
 * The server keeps neither, because it keeps nothing:
 * `web/app/api/engine/route.ts` has no database, no logging and no file writes,
 * and `22-DISTRIBUTION-NOTES.md` §2 records the grep that proves it.
 *
 * **The one thing that is kept is disclosed here rather than buried**, because
 * a "we keep nothing" claim with an unmentioned exception is worse than no
 * claim. See `KEEPS_COUNTS`.
 */
export const KEEPS_BODY = [
  "Nothing about your mail. The part of Blotter that works out each contact’s status writes nothing down at all—not the facts it was given, and not the answer it returned. It cannot show you your own history, because it does not have one.",
  "The recruiting information lives in one place, which is your own spreadsheet, in your own Google Drive.",
];

/**
 * The exception to "nothing", stated in the same block rather than a footnote.
 *
 * `POST /api/telemetry` is live. What crosses it is fixed by an allow-list in
 * the route and pinned by a self-test that asserts the payload contains no `@`,
 * `name`, `subject`, `body`, `firm` or `email` anywhere in its serialised form
 * (`22-DISTRIBUTION-NOTES.md` §2). The id is `Utilities.getUuid()` — random,
 * derived from nothing about the student, and minted per *sheet*.
 *
 * A second table for billing keys is being built in a parallel chat as this is
 * written. **The sentence is deliberately worded to cover both**, because it
 * describes the boundary rather than the tables.
 */
export const KEEPS_COUNTS =
  "One thing is counted, and it is worth naming. Each copy of the sheet generates a random id — a string of characters that identifies the sheet and nothing about you — and sends it with the time of each run and how many contacts were in it, so that a broken version can be noticed before people have to write in about it. No name, address, subject line or message ever goes with it.";

export const KEEPS_CALENDAR =
  "Calendar events are read to find calls and coffee chats with your contacts. Blotter never writes to your calendar, and cannot: the permission it asks for is read-only.";

/* ----------------------------------------------------------- 7. commitments */

/**
 * §11, absorbed by Jon's ruling of August 6, 2026.
 *
 * The nine-item list no longer appears as its own block. Seven of the nine
 * restate something the reader has already been given, and the restatement was
 * a large part of why the section read as a blob:
 *
 *   1 does not send emails            → Gmail `Cannot do`
 *   2 does not write to your calendar → Calendar `Cannot do`, and the retention block
 *   4 no unrelated Drive files        → Sheets `Cannot do`
 *   6 does not store full bodies      → step 04, and the retention block
 *   7 no unmatched personal email     → step 02, and the broad-permission note
 *   8 disconnect at any time          → the deletion statement
 *   9 deleting deletes your data      → the deletion statement
 *
 * Two carry information nothing else on the page carries. They survive verbatim
 * as `COMMITMENTS_UNCOVERED`, set beneath the table. The full nine still appear
 * on the privacy-policy page, so no commitment is withdrawn.
 *
 * This list stays exported and complete: it is the canonical set, and the
 * policy page renders all nine from it.
 */
/*
  Rewritten September 3, 2026. Same nine slots, same order, and index 2 and
  index 4 are still the two that `COMMITMENTS_UNCOVERED` reaches for — Google
  Contacts and selling data. **Do not reorder this list without checking that
  export**, which selects by position.

  Six of the nine are now stronger, and the two at the end were simply false:
  there is no Blotter account to delete and no connection to disconnect. What
  replaces them is the real mechanism, and it is better — the student revokes
  the script in their own Google settings, and their spreadsheet was never
  copied anywhere.
*/
export const COMMITMENTS = [
  "Blotter cannot send an email, and never asks for permission to",
  "Blotter cannot create, change or cancel a calendar event",
  "Blotter does not access Google Contacts",
  "Blotter cannot see that any other file in your Drive exists",
  "Blotter does not sell your data",
  "Blotter’s server never receives the text of an email",
  "Blotter never opens a conversation that none of your contacts is part of",
  "You can remove Blotter’s access from your Google account at any time",
  "Delete the spreadsheet and nothing of yours is left anywhere",
];

/**
 * The two commitments the permissions table does not already state. Google
 * Contacts is the only fact in the whole section that appears exactly once, and
 * selling data is a promise no `Cannot do` row covers.
 */
export const COMMITMENTS_UNCOVERED = [COMMITMENTS[2], COMMITMENTS[4]];

/* ---------------------------------------------------- 8. account-deletion line */

/**
 * §12. Directly beneath the commitments under a thin top divider.
 *
 * §12's own rule was that subscription cancellation and account deletion must
 * not be conflated. **Neither exists**, so the rule is discharged rather than
 * obeyed: there is no Blotter account, and the two mechanisms a student
 * actually has are both theirs and both immediate.
 */
export const DELETION_STATEMENT =
  "You can remove Blotter’s access whenever you like, from your own Google account’s security settings, and it stops that moment. Your spreadsheet is yours: nothing about it was ever copied anywhere else, so deleting it is the end of it.";

/* ------------------------------------------------- 9. where Blotter runs */

/**
 * **This replaces the connection-provider block, which was deleted on
 * September 3, 2026 on Jon's ruling.** The history is worth keeping, because it
 * is the clearest example on this project of a claim that got safer by getting
 * truer.
 *
 * What stood here said Blotter connected to Google *"through an established
 * connection provider whose Google application has passed Google's CASA
 * security assessment"*, and `/privacy` went further and said the provider was
 * *"verified by Google for the permissions Blotter requests."*
 *
 * **Every clause of that was false, and the last one was contradicted out loud
 * by Google.** `17-INSTALL-OBSERVED.md` §1 records the screen a real student
 * meets: *"Google hasn't verified this app."* A reader who trusted the policy
 * and then met that screen had been told two opposite things at the one moment
 * they could not ask anybody.
 *
 * The block had carried an `⚠ UNVERIFIED CLAIM GATE` warning since August 6,
 * 2026 saying no provider was selected and nothing in it was true of any real
 * arrangement. **The gate was right, it was never closed, and the copy shipped
 * anyway.** That is the failure this comment exists to make expensive to
 * repeat.
 *
 * What replaces it is the thing that is actually true, and it is a better
 * answer to the same question — *who else is in this?* — because the answer is
 * nobody.
 */
export const HOSTING_HEADING = "Where Blotter runs";

export const HOSTING_BODY = [
  "There is no third party in the middle. Blotter is a script inside your own copy of a Google Sheet, running on your own Google account’s permission, and Google will tell you as much on the way in — it shows an “unverified app” warning and names the developer, and the developer it names is you.",
  "Blotter’s own server does one job: it is sent facts about conversations involving your contacts, it works out what each one means, and it sends the answer back. It holds no login for your Google account and no copy of your mail.",
];

/* --------------------------------------------------- 10. dedicated privacy FAQ */

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * §14, relocated by Jon on August 6, 2026.
 *
 * These seven questions no longer appear on the landing page. Every one of
 * their answers restated something already stated above them — the claim, the
 * four steps, the permissions table, the retention block, the deletion
 * statement or the provider block — so on a section Jon judged unreadably long
 * they were 204 words carrying no fact the reader had not already been given.
 *
 * They are **moved, not deleted**: the privacy-policy page renders them in full.
 * §4's ban on merging them into Section 7's product FAQ still holds and is still
 * observed — the two lists have never met.
 *
 * Question 7 stays provider-agnostic and is the one answer that must be revised
 * with `PROVIDER_BODY` when a provider is selected.
 */
export const PRIVACY_FAQ: FaqEntry[] = [
  {
    q: "Why does Google ask for such broad Gmail access?",
    a: "Because Google does not offer a narrower one. There is no Gmail permission that means “only the people in this spreadsheet”, so the read-only permission is the smallest thing that exists. What actually limits it is where the reading happens: inside your own Google account, on conversations that already involve one of your contacts.",
  },
  {
    q: "Does Blotter read my personal email?",
    a: "No. It only ever opens conversations that already contain someone from your Contacts tab. Everything else is not filtered out after being read — it is never opened, because it was never something Blotter was following.",
  },
  {
    q: "Does Blotter store my emails?",
    a: "It never receives them. To work out what a conversation means, Blotter sends its server who wrote, who it was addressed to, when, and the subject line. The body of an email is never sent, and the server refuses any request that tries to include one.",
  },
  {
    q: "Can Blotter send emails or change my calendar?",
    a: "No, and not as a matter of policy. The permissions it asks Google for are read-only, so sending an email or touching a calendar event is not something it is able to do.",
  },
  {
    q: "Does Blotter sell my data?",
    a: "No. Blotter does not sell personal data.",
  },
  {
    q: "Why does Google warn me that this app is not verified?",
    a: "Because it is your own copy of a script, in your own account. Read the developer name on that screen — it is your email address. Google shows this warning for anything a person installs into their own Google account themselves, and it does not change what the script is allowed to do. That is fixed by the permissions on the next screen, and every one of them is read-only apart from the spreadsheet you just copied.",
  },
  {
    q: "What if I want to stop using it?",
    a: "Remove its access in your Google account’s security settings and it stops immediately. The spreadsheet is yours to keep or delete. There is no account to close and no copy of anything held anywhere else.",
  },
];

/* --------------------------------------------------- 11. privacy-policy link */

/** §15. Restrained text link below the accordion. */
export const POLICY_LINK_LABEL = "Read the full privacy policy";

export const POLICY_HREF = "/privacy";
