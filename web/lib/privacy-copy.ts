/**
 * Section 6 copy, verbatim.
 *
 * Authority: `06-SECTION-6-DATA-AND-PRIVACY.md` §5 through §15, which reproduce
 * the WS4 Section 6 content and supersede its provider sentence.
 *
 * Every string below is exact and may not be rewritten, shortened, combined,
 * softened or added to. Section 6 is the highest-claim-risk block on the page:
 * several of these statements are gated in `06-assumptions-and-open-questions.md`
 * on facts that do not exist yet (routing architecture, retention, deletion,
 * scopes, provider identity). The private preview may show them. Public traffic
 * may not, until each gate is verified. Do not add a claim here that no gate
 * covers, and do not remove the vagueness from the provider block — it is
 * deliberate, ruled by Jon on August 1, 2026, because no provider is selected.
 *
 * The typographic apostrophes are the spec's own and are reproduced as written.
 *
 * This module is the single source for the section, the privacy-policy page and
 * the copy verification, so the three cannot drift apart.
 */

/* --------------------------------------------------------- 1. title and open */

export const PRIVACY_TITLE = "How Blotter uses your data";

/**
 * Amended by Jon on August 6, 2026: `Gmail and Calendar` becomes
 * `Gmail, Calendar, and Sheets`.
 *
 * The rest of the page leads on Gmail and Calendar because that is where the
 * activity comes from, but the permissions table three blocks below discloses a
 * Sheets scope, and an opening statement that names two of three services
 * under-discloses the one section whose whole job is disclosure. His ruling,
 * stamped on the build spec. No other word changes.
 */
export const PRIVACY_OPENING =
  "Connecting Gmail, Calendar, and Sheets is a meaningful permission. Here is exactly what Blotter checks, what it reads, what it keeps, and what it never does.";

/* ------------------------------------------------------- 2. main candid claim */

/** §6. The section's primary visual anchor. No icon, no quote marks. */
export const CANDID_CLAIM =
  "Blotter never reads your personal email. It checks who a message is from and only reads messages from contacts stored in your recruiting tracker. Everything else is excluded before message content is processed.";

/* ------------------------------------------------ 3. four-step processing rows */

export interface ProcessingStep {
  n: string;
  title: string;
  body: string;
}

/** §7. Four stacked numbered rows, thin divider between them. Not cards. */
export const PROCESSING_STEPS: ProcessingStep[] = [
  {
    n: "01",
    title: "Blotter checks the sender",
    body: "Blotter compares the sender’s email address with the contacts stored in your tracker.",
  },
  {
    n: "02",
    title: "Unmatched messages stop there",
    body: "If the sender is not in your tracker, the message body is never routed into Blotter’s content-processing system.",
  },
  {
    n: "03",
    title: "Matched recruiting messages are processed",
    body: "If the sender matches, Blotter reads the message to identify the recruiting facts needed to maintain status, timing, and next actions.",
  },
  {
    n: "04",
    title: "Blotter keeps facts, not full messages",
    body: "Blotter stores the structured recruiting information it needs and does not retain full email bodies.",
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
 */
export const PERMISSIONS: ServicePermission[] = [
  {
    service: "Gmail",
    can: [
      "Check sender and timing information across incoming mail.",
      "Read message content only when the sender matches a contact stored in the tracker.",
    ],
    cannot: ["Send emails.", "Edit emails.", "Process the content of unmatched messages."],
  },
  {
    service: "Google Calendar",
    can: [
      "Read calendar events to identify scheduled or completed recruiting conversations associated with tracked contacts.",
    ],
    cannot: ["Create events.", "Edit events.", "Cancel events.", "Respond to events."],
  },
  {
    service: "Google Sheets",
    can: [
      "Create and maintain the standardized Blotter recruiting view inside the user’s Google Sheets workflow.",
    ],
    cannot: [
      "Access unrelated Drive files.",
      "Modify unrelated files.",
      "Promise to preserve every arbitrary custom tracker layout exactly.",
    ],
  },
];

export const PERMISSION_COLUMNS = ["Service", "Can do", "Cannot do"] as const;

/* --------------------------------------------- 5. broad Google-permission notice */

/**
 * §9. Sits immediately below the table and must stay visibly legible. It may
 * not be demoted into the FAQ or set as fine print — that is an explicit
 * exclusion in §18 and a responsive constraint in §16.
 */
export const BROAD_HEADING = "Why Google’s permission may sound broader";

export const BROAD_BODY =
  "Google may describe the Gmail permission broadly because it does not offer a permission limited only to contacts in your recruiting tracker. Blotter enforces the narrower boundary in its processing system: unmatched messages are never routed for content analysis.";

/* ------------------------------------------------------- 6. what Blotter keeps */

export const KEEPS_HEADING = "What Blotter keeps";

/**
 * §10. One compact text block. Do not turn the examples into metric cards or a
 * data diagram.
 *
 * The em dash in the first paragraph is the spec's own. It contradicts the
 * standing page rule that Alex Morgan's hero cell carries the only dash on the
 * page; Jon permitted it here on August 6, 2026, scoped to this sentence alone.
 * Recorded at the top of `06-SECTION-6-DATA-AND-PRIVACY.md`.
 */
export const KEEPS_BODY = [
  "Blotter keeps only the structured recruiting facts needed to maintain your tracker—for example, sender, interaction time, reply state, scheduled-call information, and next-action status.",
  "Full email bodies are processed only for matched recruiting messages and are not retained.",
];

export const KEEPS_CALENDAR =
  "Calendar events are used to identify recruiting calls and coffee chats associated with tracked contacts. Blotter does not write to your calendar.";

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
export const COMMITMENTS = [
  "Blotter does not send emails",
  "Blotter does not write to your calendar",
  "Blotter does not access Google Contacts",
  "Blotter does not access unrelated Google Drive files",
  "Blotter does not sell your data",
  "Blotter does not store full email bodies",
  "Blotter does not process the content of unmatched personal email",
  "You can disconnect your accounts at any time",
  "Deleting your account permanently deletes your Blotter data",
];

/**
 * The two commitments the permissions table does not already state. Google
 * Contacts is the only fact in the whole section that appears exactly once, and
 * selling data is a promise no `Cannot do` row covers.
 */
export const COMMITMENTS_UNCOVERED = [COMMITMENTS[2], COMMITMENTS[4]];

/* ---------------------------------------------------- 8. account-deletion line */

/**
 * §12. Directly beneath the commitments under a thin top divider. Subscription
 * cancellation and account deletion must not be conflated.
 */
export const DELETION_STATEMENT =
  "You can disconnect your Google accounts at any time. When you delete your Blotter account, the connection is revoked and your Blotter data is permanently deleted.";

/* --------------------------------------------------- 9. connection provider */

/**
 * §13, amended by Jon on August 6, 2026.
 *
 * He rejected the fully vague version as unusable copy and ruled that the page
 * should say the provider has passed Google's CASA security assessment. This
 * reverses part of §13 and part of §18, both of which forbid implying CASA
 * completion or any certification without evidence.
 *
 * ⚠ UNVERIFIED CLAIM GATE. No provider is selected, so nothing here is true of
 * any real arrangement yet. Two research findings from August 6, 2026 that the
 * eventual wording has to survive:
 *
 *   - Nylas's public claim for its shared Google app is Tier 3 CASA, not
 *     Tier 2. Any tier stated on this page would be wrong for Nylas and
 *     unknown for anyone else, which is why the sentence names the assessment
 *     and not a tier.
 *   - On Nylas's shared app the Google consent screen reads `Nylas`, not
 *     `Blotter`. Putting Blotter's own name there means Blotter's own Google
 *     app, and then the CASA assessment is Blotter's to pass, not the
 *     provider's — at which point this sentence is false as written.
 *
 * Verify against the signed provider before public traffic. Still forbidden and
 * still absent: a provider name, `accredited`, SOC 2, and any suggestion that
 * involving a third party is itself a privacy guarantee.
 */
export const PROVIDER_HEADING = "Google connection provider";

export const PROVIDER_BODY = [
  "Blotter connects to Google through an established connection provider whose Google application has passed Google’s CASA security assessment. The provider and its exact role will be disclosed in the privacy policy and connection flow.",
  "That provider facilitates the connection between Blotter and Google. Blotter’s own processing rules determine which messages are analyzed and what information is retained.",
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
    q: "Why does Google ask for broad Gmail access?",
    a: "Google does not offer a Gmail permission limited only to the contacts in your tracker. Blotter applies that narrower boundary in its own processing system. Unmatched messages are never routed for content analysis.",
  },
  {
    q: "Does Blotter read personal emails?",
    a: "No. Blotter checks sender information to find messages from contacts stored in your tracker. If the sender does not match, the message body is not processed.",
  },
  {
    q: "Does Blotter store my emails?",
    a: "Blotter does not retain full email bodies. It stores only the structured recruiting facts needed to maintain your tracker.",
  },
  {
    q: "Can Blotter send emails or change my calendar?",
    a: "No. Blotter does not request email-send permission and does not write to your calendar.",
  },
  {
    q: "Does Blotter sell my data?",
    a: "No. Blotter does not sell personal data.",
  },
  {
    q: "What happens when I delete my account?",
    a: "Your Google connections are revoked and the data associated with your Blotter account is permanently deleted.",
  },
  {
    q: "Does a third party process my data?",
    a: "Blotter uses a third-party provider to connect with Google. The provider and its exact role will be disclosed in the privacy policy and connection flow.",
  },
];

/* --------------------------------------------------- 11. privacy-policy link */

/** §15. Restrained text link below the accordion. */
export const POLICY_LINK_LABEL = "Read the full privacy policy";

export const POLICY_HREF = "/privacy";
