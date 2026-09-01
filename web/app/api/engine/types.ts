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

export interface EngineRequest {
  version: 1;
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
  /** Plain text, no quoted history. Used for bounce and auto-reply detection and nothing else. */
  body: string;
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
  organizer: string;
}

/**
 * Exactly one of these seven, per the contract. No other value is ever valid,
 * and no build may add one.
 */
export type Status =
  | "Not emailed"
  | "Bounced"
  | "Sent"
  | "Replied"
  | "Call scheduled"
  | "Call done"
  | "Closed";

export interface RowOut {
  row: number;
  status: Status;
  /** Whole days per the engine rules §4; null where the state has no clock. */
  days: number | null;
  /** ISO date (YYYY-MM-DD), or null. Never an empty string. */
  last_contact: string | null;
  /** Times written since they last wrote back. 0 where nothing has been sent. */
  attempts: number;
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
  name: string;
  /** ISO date (YYYY-MM-DD) of the message where the address first appeared. */
  first_seen: string;
  context: string;
}

export interface EngineResponse {
  version: 1;
  /** One row per requested contact, in the same order. Never fewer. */
  rows: RowOut[];
  /** New people for the student to approve. Never auto-added. */
  found: FoundPerson[];
  /** Things the student should know that are not errors. */
  warnings: string[];
}
