/**
 * The contract types.
 *
 * These are the request and response shapes from
 * `blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md`, transcribed and
 * nothing more. The contract is binding on both halves of Blotter; if a field
 * here disagrees with that file, this file is the one that is wrong.
 *
 * Naming is snake_case where the contract's JSON is snake_case, so a value can
 * be traced from the wire to the code without a translation table.
 */

/**
 * The contract version this server speaks, and **only** this one.
 *
 * Every earlier bump kept older versions working. Version 4 cannot: it removes
 * `body` from the wire, and a version-3 courier still sends one. Tolerating it
 * would mean continuing to accept the text of people's email — which is the
 * exact thing this version exists to stop. See `05-CONTRACT.md`.
 */
export type ContractVersion = 4;

export interface EngineRequest {
  version: ContractVersion;
  /** From the courier, never from the server's clock. ISO 8601 with timezone. */
  now: string;
  student: { addresses: string[] };
  contacts: ContactIn[];
  threads: ThreadIn[];
  events: EventIn[];
  /** Addresses the student already rejected in "found these". */
  ignored: string[];
}

export interface ContactIn {
  /** The sheet row number. The join key: echoed back, otherwise ignored. */
  row: number;
  name: string;
  /** May be empty — the calendar title match simply cannot fire without it. */
  firm: string;
  /**
   * Every address known for this person. May be empty: Owen Sherry's call
   * demonstrably happened and he has no address anywhere in the mailbox. Such
   * a contact is reachable only through the calendar title match.
   */
  emails: string[];
  /** Read from the student's `Closed` column. The student's ruling; obeyed. */
  closed: boolean;
}

export interface ThreadIn {
  thread_id: string;
  messages: MessageIn[];
}

export interface MessageIn {
  id: string;
  /** ISO 8601 with timezone. Always. */
  date: string;
  from: string;
  to: string[];
  cc: string[];
  subject: string;
  /**
   * **Contract version 4: there is no `body` field, and there never will be
   * one again.** The server does not receive the text of an email.
   *
   * The engine read a body in exactly one place — to find which address a
   * delivery-failure notice was complaining about. The courier now does that
   * extraction itself and sends the addresses, which is mechanical work on a
   * machine-generated notice rather than a judgment about recruiting.
   *
   * Empty on every message that is not a delivery-failure notice.
   */
  failed_recipients: string[];
  /** Set by the courier: true when `from` is one of `student.addresses`. */
  is_outbound: boolean;
}

export interface EventIn {
  id: string;
  title: string;
  /** ISO 8601 with timezone. */
  start: string;
  /** ISO 8601 with timezone. */
  end: string;
  attendees: string[];
  /**
   * Contract version 2: the addresses that answered **No** to this invite.
   * Empty on a version-1 request, which is exactly what a version-1 request
   * meant — nobody is known to have declined.
   *
   * Declines only. Accepted, tentative and no-answer-yet are deliberately not
   * carried, because no rule reads them.
   */
  declined: string[];
  organizer: string;
}

/**
 * Exactly one of these eight, per the contract. No other value is ever valid,
 * and no build may add one.
 *
 * `Call cancelled` is the eighth, added with contract version 2. It can only
 * arise from an event's `declined` list, which only a version-2 request
 * carries — so a version-1 client is never handed a status it does not know.
 */
export type Status =
  | "Not emailed"
  | "Bounced"
  | "Sent"
  | "Replied"
  | "Call scheduled"
  | "Call done"
  | "Call cancelled"
  | "Closed";

export interface RowOut {
  row: number;
  status: Status;
  /**
   * Whole days per the engine rules §4, and **`null` wherever a number would
   * not mean anything** (D24). Only `Sent`, `Replied` and `Call done` carry
   * one: everything else gets a dash in the sheet.
   */
  days: number | null;
  /** ISO date (YYYY-MM-DD), or null. Never an empty string. */
  last_contact: string | null;
  /**
   * Times written since they last wrote back — **and `null` everywhere the
   * number would not mean anything** (D24, contract version 3).
   *
   * In practice that is everywhere but `Sent`. `Replied` always has zero by
   * definition and sending that zero is noise dressed as data; a bounced
   * address is bounced whether it was guessed at once or three times.
   */
  attempts: number | null;
  /**
   * The next upcoming call's start, echoed as the ISO timestamp the courier
   * sent, or null. The timestamp rather than a bare date because the sheet
   * displays the time of day (`1/17 @ 2:00 PM`, engine rules §9) and a date
   * cannot be un-truncated.
   */
  next_call: string | null;
  /** ISO date (YYYY-MM-DD) of the most recent completed call, or null. */
  last_call: string | null;
}

export interface FoundPerson {
  email: string;
  /**
   * The display name the header carried, or `null`. **Never derived from the
   * address**: `Boone2002@att.net` → "Boone2002" is garbage, and a blank cell
   * a student fills in themselves beats an invented name (rules §8, D4).
   */
  name: string | null;
  /** ISO date (YYYY-MM-DD) of the message where the address first appeared. */
  first_seen: string;
  context: string;
}

/**
 * A message from the server to the student, shown in their sheet.
 *
 * The channel exists because a **timed** run has no UI context, so no dialog is
 * possible — and a refused run writes nothing at all. Without this, a student
 * whose access was withdrawn would watch their sheet quietly stop updating and
 * conclude it had broken. Built before it is needed, because the moment a
 * hundred people hold a copy, adding it means asking a hundred people to
 * re-paste a script.
 *
 * `blocked` is the level that must survive a refused run: when the server says
 * no, the courier writes nothing except this.
 */
export type NoticeLevel = "info" | "warning" | "blocked";

export interface Notice {
  level: NoticeLevel;
  text: string;
  /** Where to go about it, or null. Never a bare domain — a full https URL. */
  url: string | null;
}

export interface EngineResponse {
  /** Echoes the request's version: asked in 1, answered in 1. */
  version: ContractVersion;
  /** One row per requested contact, in the same order. Never fewer. */
  rows: RowOut[];
  /** New people for the student to approve. Never auto-added. */
  found: FoundPerson[];
  /** Things the student should know that are not errors. */
  warnings: string[];
  /**
   * A message for the student, or absent. The engine emits none today — it is
   * stateless and has nothing to base one on — and the field exists so that
   * whatever gains the authority to say something later has a way to say it.
   */
  notice?: Notice | null;
}
