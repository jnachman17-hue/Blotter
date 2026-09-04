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
 *   `failed_recipients`, `ignored`, and the top-level collections). "The courier saw none" and
 *   "the courier sent none" mean the same thing to a stateless engine.
 * - **Absent text becomes empty text** (`subject`, `body`, `firm`, `title`,
 *   `organizer`). A missing subject is an odd message, not an uncomputable one.
 *
 * Everything that carries meaning — the version, `now`, timestamps, `row`,
 * `is_outbound`, `closed`, addresses — must be present and well-formed.
 *
 * **Fields this file does not recognise are ignored, never rejected.** That is
 * deliberate and it is what makes the next change cheap: a courier can start
 * sending something new before any server knows what it is, and an old courier
 * can leave out something new without failing. The only field ever rejected by
 * name is `body`, and that is a promise being kept rather than a shape being
 * policed.
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
  /* Contract version 4: the server does not accept the text of an email, and
     this is where that stops being a promise and becomes a refusal. A caller
     that sends one is told plainly rather than quietly having it ignored —
     "our server never receives it" has to be checkable, and a field silently
     dropped is not the same as a field rejected. */
  if (value.body !== undefined) {
    fail(`${path}.body`, "must not be sent — this server does not accept message bodies (contract version 4). Send `failed_recipients` on delivery-failure notices instead");
  }
  return {
    id: optionalStr(value.id, `${path}.id`),
    date: timestamp(value.date, `${path}.date`),
    from: str(value.from, `${path}.from`),
    to: stringList(value.to, `${path}.to`),
    cc: stringList(value.cc, `${path}.cc`),
    subject: optionalStr(value.subject, `${path}.subject`),
    failed_recipients: stringList(value.failed_recipients, `${path}.failed_recipients`),
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
     mysterious — and version 4 is the first that cannot afford to be
     forgiving. Earlier bumps were additive, so an older payload still meant
     what it always meant and was accepted. **Version 4 removes `body`**, and a
     version-3 courier still sends one; accepting it would mean carrying on
     receiving the text of people's email, which is the whole thing this
     version exists to stop.

     There is a second reason, and it is the dangerous one. A version-4 courier
     talking to a version-3 server would send no bodies to a server that
     expects them, and bounces would simply stop being detected — no error,
     nothing visibly different, a row quietly reading `Sent` for a dead
     address. **The version check is the only thing that turns that silence
     into a loud failure**, so it refuses rather than tolerates. */
  if (body.version !== 4) {
    fail("version", `must be 4 — this server speaks contract version 4 only, got ${JSON.stringify(body.version)}. Re-paste courier/Code.gs into the Apps Script editor`);
  }

  const now = timestamp(body.now, "now");

  if (!isRecord(body.student)) fail("student", "must be an object");
  const addresses = stringList(body.student.addresses, "student.addresses");
  if (addresses.length === 0) {
    fail("student.addresses", "must name at least one address — outbound cannot be told from inbound without it");
  }

  return {
    version: body.version,
    /* Optional on the wire and required in the type: an older courier that
       predates these simply does not send them, and that is not an error.
       See "adding a field is not a version change" in `05-CONTRACT.md`. */
    key: optionalStr(body.key, "key").trim(),
    install_id: optionalStr(body.install_id, "install_id").trim(),
    courier_version: optionalStr(body.courier_version, "courier_version").trim(),
    now,
    student: { addresses },
    contacts: list(body.contacts, "contacts", contact),
    threads: list(body.threads, "threads", thread),
    events: list(body.events, "events", event),
    ignored: stringList(body.ignored, "ignored"),
  };
}
