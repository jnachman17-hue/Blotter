import type { ContactIn, EngineRequest, EventIn, MessageIn, ThreadIn } from "./types";

/**
 * Request validation.
 *
 * The contract makes failure safe by making it loud: on any non-200 the
 * courier writes nothing and the sheet stays exactly as it was. A stale sheet
 * is recoverable and a half-written one is not — so a malformed request is
 * rejected with a reason that names the offending field, never patched over
 * with a guess about what the courier meant.
 *
 * Two kinds of looseness are deliberately allowed, and only these:
 *
 * - **Absent lists become empty lists** (`cc`, `attendees`, `declined`,
 *   `ignored`, and the top-level collections). "The courier saw none" and
 *   "the courier sent none" mean the same thing to a stateless engine.
 * - **Absent text becomes empty text** (`subject`, `body`, `firm`, `title`,
 *   `organizer`). A missing subject is an odd message, not an uncomputable one.
 *
 * Everything that carries meaning — the version, `now`, timestamps, `row`,
 * `is_outbound`, `closed`, addresses — must be present and well-formed.
 */

/** ISO 8601 with an explicit timezone. Always. No exceptions (the contract's words). */
const ISO_WITH_TZ =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:?\d{2})$/;

export class RequestError extends Error {}

function fail(path: string, why: string): never {
  throw new RequestError(`${path} ${why}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown, path: string): string {
  if (typeof value !== "string") fail(path, "must be a string");
  return value;
}

function optionalStr(value: unknown, path: string): string {
  if (value === undefined || value === null) return "";
  return str(value, path);
}

function bool(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") fail(path, "must be true or false");
  return value;
}

function timestamp(value: unknown, path: string): string {
  const s = str(value, path);
  if (!ISO_WITH_TZ.test(s) || !Number.isFinite(Date.parse(s))) {
    fail(path, `must be an ISO 8601 timestamp with a timezone, got "${s}"`);
  }
  return s;
}

function stringList(value: unknown, path: string): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) fail(path, "must be a list");
  return value.map((item, i) => str(item, `${path}[${i}]`));
}

function message(value: unknown, path: string): MessageIn {
  if (!isRecord(value)) fail(path, "must be an object");
  return {
    id: optionalStr(value.id, `${path}.id`),
    date: timestamp(value.date, `${path}.date`),
    from: str(value.from, `${path}.from`),
    to: stringList(value.to, `${path}.to`),
    cc: stringList(value.cc, `${path}.cc`),
    subject: optionalStr(value.subject, `${path}.subject`),
    body: optionalStr(value.body, `${path}.body`),
    is_outbound: bool(value.is_outbound, `${path}.is_outbound`),
  };
}

function thread(value: unknown, path: string): ThreadIn {
  if (!isRecord(value)) fail(path, "must be an object");
  if (!Array.isArray(value.messages)) fail(`${path}.messages`, "must be a list");
  return {
    thread_id: optionalStr(value.thread_id, `${path}.thread_id`),
    messages: value.messages.map((m, i) => message(m, `${path}.messages[${i}]`)),
  };
}

function contact(value: unknown, path: string): ContactIn {
  if (!isRecord(value)) fail(path, "must be an object");
  if (typeof value.row !== "number" || !Number.isInteger(value.row)) {
    fail(`${path}.row`, "must be a whole number — it is the join key back to the sheet");
  }
  return {
    row: value.row,
    name: str(value.name, `${path}.name`),
    firm: optionalStr(value.firm, `${path}.firm`),
    emails: stringList(value.emails, `${path}.emails`),
    closed: bool(value.closed, `${path}.closed`),
  };
}

function event(value: unknown, path: string): EventIn {
  if (!isRecord(value)) fail(path, "must be an object");
  const start = timestamp(value.start, `${path}.start`);
  /* A missing end is tolerated as a zero-length event rather than rejected:
     the start alone still says which day the call is, and that is what every
     rule needs. */
  const end =
    value.end === undefined || value.end === null ? start : timestamp(value.end, `${path}.end`);
  return {
    id: optionalStr(value.id, `${path}.id`),
    title: optionalStr(value.title, `${path}.title`),
    start,
    end,
    attendees: stringList(value.attendees, `${path}.attendees`),
    /* Contract version 2. Absent on a version-1 request, and an absent list
       means exactly what version 1 meant: nobody is known to have declined. */
    declined: stringList(value.declined, `${path}.declined`),
    organizer: optionalStr(value.organizer, `${path}.organizer`),
  };
}

function list<T>(value: unknown, path: string, parse: (v: unknown, p: string) => T): T[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) fail(path, "must be a list");
  return value.map((item, i) => parse(item, `${path}[${i}]`));
}

/**
 * Parse an unknown body into an `EngineRequest`, or throw a `RequestError`
 * naming the first field that breaks the contract.
 */
export function parseEngineRequest(body: unknown): EngineRequest {
  if (!isRecord(body)) fail("request", "must be a JSON object");

  /* The version is in the request so a mismatch is loud rather than
     mysterious. This server speaks 1, 2 and 3. Version 2 added display names on
     addresses and `declined` on events; version 3 widened `attempts` on the way
     back out. Every addition is optional and additive, so an older payload
     still means exactly what it always meant, and the response answers in the
     version it was asked in — which is what stops a request in flight during a
     deploy from being rejected outright. */
  if (body.version !== 1 && body.version !== 2 && body.version !== 3) {
    fail("version", `must be 1, 2 or 3 — this server speaks contract versions 1 to 3, got ${JSON.stringify(body.version)}`);
  }

  const now = timestamp(body.now, "now");

  if (!isRecord(body.student)) fail("student", "must be an object");
  const addresses = stringList(body.student.addresses, "student.addresses");
  if (addresses.length === 0) {
    fail("student.addresses", "must name at least one address — outbound cannot be told from inbound without it");
  }

  return {
    version: body.version,
    now,
    student: { addresses },
    contacts: list(body.contacts, "contacts", contact),
    threads: list(body.threads, "threads", thread),
    events: list(body.events, "events", event),
    ignored: stringList(body.ignored, "ignored"),
  };
}
