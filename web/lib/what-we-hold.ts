/**
 * Every table in Blotter's database, every column, in plain English.
 *
 * ## Why this list exists
 *
 * The site says the server keeps nothing from anyone's mail, and no audit of
 * the sheet's code can prove that. Jon's answer, 5 September 2026: show what the
 * database holds, live, so the claim can be looked at rather than believed.
 * `/status` renders this list with a live row count beside each table, and a
 * box where a student pastes their Blotter ID and sees the exact rows about
 * their own sheet.
 *
 * ## The rule
 *
 * **Every table, or the list is worse than no list.** `privacy-copy.ts` says it
 * of the site's own list of what is sent, and it is truer here: two of these
 * five tables hold email addresses people typed into the website, and a page
 * calling itself "everything we hold" that left them out would be caught by
 * the first person to look. So the two website-form tables are here, described
 * as exactly what they are.
 *
 * Keep this in step with `supabase/*.sql`. A column added there and not here
 * is the same failure.
 */

export interface HeldColumn {
  name: string;
  /** What it is, for somebody who has never seen a database. */
  means: string;
  /** Never returned by the lookup. The key column, and nothing else so far. */
  secret?: boolean;
}

export interface HeldTable {
  name: string;
  label: string;
  purpose: string;
  /** Does this table hold anything a person typed, as opposed to counts and ids? */
  personal: "none" | "website-form";
  /** The column a student's Blotter ID matches, so the lookup can find their rows. */
  lookupBy: string | null;
  columns: HeldColumn[];
}

export const TABLES: HeldTable[] = [
  {
    name: "blotter_installs",
    label: "Sheets counted",
    purpose:
      "One row per sheet that has run Blotter. Counts only, so a broken version can be noticed before people have to write in.",
    personal: "none",
    lookupBy: "install_id",
    columns: [
      { name: "install_id", means: "A random number that identifies the sheet. Made from nothing about you. It is the Blotter ID shown in your Settings tab." },
      { name: "first_seen", means: "When this sheet first reported a run." },
      { name: "last_seen", means: "When it last reported one." },
      { name: "contacts", means: "How many contacts were in it on the last run. The number, not the contacts." },
      { name: "seconds", means: "How long the last run took." },
      { name: "ok", means: "Whether the last run worked." },
      { name: "contract_version", means: "Which version of the agreement between sheet and server it spoke." },
      { name: "courier_version", means: "Which version of the script it was running." },
    ],
  },
  {
    name: "blotter_keys",
    label: "Blotter keys",
    purpose:
      "One row per key ever issued. Paying is built and switched off, so nothing here decides anything today.",
    personal: "none",
    lookupBy: "install_id",
    columns: [
      { name: "key", means: "The key itself. Never shown here, not even to the sheet it belongs to.", secret: true },
      { name: "created_at", means: "When it was issued." },
      { name: "install_id", means: "The sheet it was first used in, if it has been used." },
      { name: "bound_at", means: "When that first use happened." },
      { name: "entitled_until", means: "When it stops being valid. Blank means it does not." },
      { name: "revoked_at", means: "Set if a refund or chargeback withdrew it." },
      { name: "stripe_session_id", means: "Stripe's reference for the checkout. Not a card number; Blotter never sees those." },
      { name: "stripe_payment_intent", means: "Stripe's reference for the payment." },
      { name: "stripe_subscription_id", means: "Stripe's reference for the subscription, if it is one." },
      { name: "note", means: "A note a person typed when issuing it." },
    ],
  },
  {
    name: "blotter_key_mismatches",
    label: "Key mismatches",
    purpose:
      "A key used by a sheet other than the one it was first used in. Recorded for a person to look at. Never used to refuse a run.",
    personal: "none",
    lookupBy: "seen_install_id",
    columns: [
      { name: "id", means: "A row number." },
      { name: "key", means: "The key that was presented. Never shown here.", secret: true },
      { name: "seen_install_id", means: "The sheet that presented it." },
      { name: "seen_at", means: "When." },
    ],
  },
  {
    name: "leads",
    label: "Front-page sign-ups",
    purpose:
      "The email form on the front page. Everything here was typed into the website by the person it is about. Nothing from anyone's Gmail.",
    personal: "website-form",
    lookupBy: null,
    columns: [
      { name: "id", means: "A row number." },
      { name: "email", means: "The address typed into the form." },
      { name: "recruiting_track", means: "The answer to the form's first question." },
      { name: "recruiting_window", means: "The answer to its second." },
      { name: "recruiting_track_other", means: "The first question's write-in box." },
      { name: "recruiting_window_other", means: "The second question's write-in box." },
      { name: "surface_variant", means: "Which version of the page was showing." },
      { name: "cta_location", means: "Which button on it was used." },
      { name: "visitor_id", means: "A random id for the browser, from the site's own analytics." },
      { name: "session_id", means: "A random id for the visit." },
      { name: "furthest_stage", means: "How far down the page they got." },
      { name: "furthest_stage_index", means: "The same stage as a number, so the database can keep the highest one it has seen." },
      { name: "test_iteration", means: "Which round of the page design was live." },
      { name: "is_internal", means: "Marked when the sign-up was one of us, testing the form." },
      { name: "created_at", means: "When the form was sent." },
      { name: "updated_at", means: "When the row last changed." },
    ],
  },
  {
    name: "contact_messages",
    label: "Contact form messages",
    purpose:
      "What people sent through the contact page. Typed into the website by the person it is about.",
    personal: "website-form",
    lookupBy: null,
    columns: [
      { name: "id", means: "A row number." },
      { name: "email", means: "The address they gave." },
      { name: "name", means: "The name they gave, if any." },
      { name: "message", means: "What they wrote." },
      { name: "source_path", means: "Which page the form was on." },
      { name: "session_id", means: "A random id for the visit." },
      { name: "visitor_id", means: "A random id for the browser." },
      { name: "is_internal", means: "Marked when the message was one of us, testing the form." },
      { name: "created_at", means: "When it was sent." },
    ],
  },
];

/** How many tables hold something a person typed into the website. Derived, never typed. */
export function formTableCount(): number {
  return TABLES.filter((t) => t.personal === "website-form").length;
}

/** Small counts as words, so a sentence reads as prose while the number still comes from the data. */
export function countWord(n: number): string {
  const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  return words[n] ?? String(n);
}

/**
 * The two saved views. They hold nothing of their own; each is a filter over a
 * table above, hiding the rows we marked as our own tests. Listed so that
 * somebody who reads the database's own catalogue finds nothing unexplained.
 */
export const VIEWS = [
  { name: "real_leads", over: "leads", means: "The sign-ups, without our own test entries." },
  { name: "real_contact_messages", over: "contact_messages", means: "The messages, without our own test entries." },
];
