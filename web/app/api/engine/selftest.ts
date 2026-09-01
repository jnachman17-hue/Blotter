import { computeEngine, firmInTitle } from "./rules";
import { parseEngineRequest, RequestError } from "./validate";
import type { ContactIn, EngineRequest, EventIn, MessageIn, ThreadIn } from "./types";

/**
 * The engine's own plumbing tests.
 *
 * These are written by the same chat that wrote the rules, so they prove the
 * code does what its author thinks — nothing more. The acceptance bar is the
 * independently derived fixtures in `__fixtures__/`, run by
 * `run-fixtures.ts`; this file exists so a change that breaks the machinery
 * is caught in seconds without them.
 *
 * Run with: `npx tsx web/app/api/engine/selftest.ts`
 */

let failures = 0;
let checks = 0;

function check(label: string, actual: unknown, expected: unknown): void {
  checks += 1;
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    failures += 1;
    console.error(`FAIL ${label}\n  expected ${e}\n  got      ${a}`);
  }
}

function msg(overrides: Partial<MessageIn> & { date: string; from: string }): MessageIn {
  return {
    id: overrides.id ?? `${overrides.from}-${overrides.date}`,
    date: overrides.date,
    from: overrides.from,
    to: overrides.to ?? ["student@gmail.com"],
    cc: overrides.cc ?? [],
    subject: overrides.subject ?? "Re: Intro",
    body: overrides.body ?? "Sure.",
    is_outbound: overrides.is_outbound ?? false,
  };
}

function out(date: string, to: string[], overrides: Partial<MessageIn> = {}): MessageIn {
  return msg({ ...overrides, date, from: "student@gmail.com", to, is_outbound: true });
}

function req(
  contacts: ContactIn[],
  threads: ThreadIn[],
  events: EventIn[] = [],
  now = "2024-02-15T17:00:00Z",
  ignored: string[] = [],
): EngineRequest {
  return {
    version: 1,
    now,
    student: { addresses: ["student@gmail.com", "student@utexas.edu"] },
    contacts,
    threads,
    events,
    ignored,
  };
}

function contact(row: number, name: string, firm: string, emails: string[], closed = false): ContactIn {
  return { row, name, firm, emails, closed };
}

const GMAIL_BOUNCE = (failed: string) =>
  `** Address not found **\n\nYour message wasn't delivered to ${failed} because the address couldn't be found, or is unable to receive mail.\n\nThe response from the remote server was:\n550 #5.1.0 Address rejected.\nFinal-Recipient: rfc822; ${failed}\nAction: failed\nStatus: 4.4.2`;

/* ---------------------------------------------------------------- *
 * The seven states
 * ---------------------------------------------------------------- */

{
  const r = computeEngine(req([contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])], []));
  check("not emailed: status", r.rows[0].status, "Not emailed");
  check("not emailed: no clock", r.rows[0].days, null);
  check("not emailed: attempts", r.rows[0].attempts, 0);
  check("not emailed: last_contact", r.rows[0].last_contact, null);
}

{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [{ thread_id: "t1", messages: [out("2024-02-03T14:05:00Z", ["jamie@jpmorgan.com"])] }],
    ),
  );
  check("sent: status", r.rows[0].status, "Sent");
  check("sent: days since the student wrote", r.rows[0].days, 12);
  check("sent: attempts", r.rows[0].attempts, 1);
  check("sent: last_contact", r.rows[0].last_contact, "2024-02-03");
}

{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-01T14:05:00Z", ["jamie@jpmorgan.com"]),
            msg({ date: "2024-02-05T09:00:00Z", from: "jamie@jpmorgan.com" }),
          ],
        },
      ],
    ),
  );
  check("replied: status", r.rows[0].status, "Replied");
  check("replied: days since they wrote", r.rows[0].days, 10);
  check("replied: attempts reset", r.rows[0].attempts, 0);
}

/* An auto-reply is not a reply. The real one arrived 20 seconds after the
   outbound, from the contact's own address, and she never answered. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jessica Luft", "BofA", ["jessica.luft@bofa.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-03T14:05:00Z", ["jessica.luft@bofa.com"]),
            msg({
              date: "2024-02-03T14:05:20Z",
              from: "jessica.luft@bofa.com",
              subject: "Automatic reply: Nice Meeting You & Potential Call",
              body: "I am OOO traveling and attending events.",
            }),
          ],
        },
      ],
    ),
  );
  check("auto-reply: still Sent", r.rows[0].status, "Sent");
  check("auto-reply: attempts not reset", r.rows[0].attempts, 1);
  check(
    "auto-reply: marked in warnings",
    r.warnings.some((w) => w.includes("automatic reply")),
    true,
  );
}

/* Bounced, the Stifel way: the machine-readable Status says 4.4.2 — a
   temporary class — while the text says the address does not exist. Detection
   keys on the daemon sender plus the failed recipient in the body, never the
   Status code. Three guesses, three bounces, three attempts burned. */
{
  const guesses = ["sean.kang@stifel.com", "kang.s@stifel.com", "s.kang@stifel.com"];
  const messages: MessageIn[] = [];
  guesses.forEach((address, i) => {
    messages.push(out(`2024-01-31T05:1${i}:00Z`, [address]));
    messages.push(
      msg({
        date: `2024-01-31T05:1${i}:13Z`,
        from: "mailer-daemon@googlemail.com",
        subject: "Delivery Status Notification (Failure)",
        body: GMAIL_BOUNCE(address),
      }),
    );
  });
  const r = computeEngine(
    req(
      [contact(2, "Sean Kang", "Stifel", guesses)],
      [{ thread_id: "t1", messages }],
      [],
      "2024-02-10T17:00:00Z",
    ),
  );
  check("bounced: status despite Status: 4.4.2", r.rows[0].status, "Bounced");
  check("bounced: days since the bounce", r.rows[0].days, 10);
  check("bounced: three attempts burned", r.rows[0].attempts, 3);
}

/* The revival: a bounced last email, then the person writes back from an
   address that works. The last word is theirs; the state moves on. */
{
  const r = computeEngine(
    req(
      [contact(2, "Marijoy Bertolini", "Aeris Partners", ["marijoy.bertolini@aerispartners.com", "mbertolini@aerispartners.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-08T04:24:00Z", ["Marijoy.Bertolini@aerispartners.com"]),
            msg({
              date: "2024-02-08T04:24:13Z",
              from: "mailer-daemon@googlemail.com",
              subject: "Delivery Status Notification (Failure)",
              body: GMAIL_BOUNCE("Marijoy.Bertolini@aerispartners.com"),
            }),
          ],
        },
        {
          thread_id: "t2",
          messages: [msg({ date: "2024-02-29T18:00:00Z", from: "mbertolini@aerispartners.com" })],
        },
      ],
      [],
      "2024-03-05T17:00:00Z",
    ),
  );
  check("revival: Replied after a bounce", r.rows[0].status, "Replied");
  check("revival: clock is theirs", r.rows[0].days, 5);
}

/* Call scheduled outranks Replied and Sent, and the clock runs forward. */
{
  const event: EventIn = {
    id: "e1",
    title: "Jamie - Alex JPM IB Call",
    start: "2024-02-17T19:00:00Z",
    end: "2024-02-17T19:30:00Z",
    attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
    organizer: "student@gmail.com",
  };
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-10T14:00:00Z", ["jamie@jpmorgan.com"]),
            msg({ date: "2024-02-12T10:00:00Z", from: "jamie@jpmorgan.com" }),
          ],
        },
      ],
      [event],
    ),
  );
  check("call scheduled: status", r.rows[0].status, "Call scheduled");
  check("call scheduled: days until it", r.rows[0].days, 2);
  check("call scheduled: next_call echoes the start", r.rows[0].next_call, "2024-02-17T19:00:00Z");
  check("call scheduled: last_contact still the mail", r.rows[0].last_contact, "2024-02-12");
}

/* Call done holds until somebody writes — that is how a thank-you gets
   tracked without a state for it — and Last call keeps its date regardless. */
{
  const event: EventIn = {
    id: "e1",
    title: "Jamie - Alex JPM IB Call",
    start: "2024-02-10T19:00:00Z",
    end: "2024-02-10T19:30:00Z",
    attendees: ["jamie@jpmorgan.com"],
    organizer: "student@gmail.com",
  };
  const before = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [{ thread_id: "t1", messages: [out("2024-02-08T14:00:00Z", ["jamie@jpmorgan.com"])] }],
      [event],
    ),
  );
  check("call done: status", before.rows[0].status, "Call done");
  check("call done: days since the call", before.rows[0].days, 5);
  check("call done: last_call", before.rows[0].last_call, "2024-02-10");

  const after = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-08T14:00:00Z", ["jamie@jpmorgan.com"]),
            out("2024-02-10T23:30:00Z", ["jamie@jpmorgan.com"], {
              subject: "Enjoyed Our Conversation",
            }),
          ],
        },
      ],
      [event],
    ),
  );
  check("thank-you clears it: Sent", after.rows[0].status, "Sent");
  check("thank-you clears it: last_call survives", after.rows[0].last_call, "2024-02-10");
}

/* Owen Sherry: a call that demonstrably happened, and no email address
   anywhere. Reachable only through first name plus firm in the title. */
{
  const r = computeEngine(
    req(
      [contact(7, "Owen Sherry", "Houlihan Lokey", [])],
      [],
      [
        {
          id: "e1",
          title: "Jonathan - Owen Sherry Houlihan RX Intro Call",
          start: "2024-02-01T20:00:00Z",
          end: "2024-02-01T20:30:00Z",
          attendees: [],
          organizer: "student@gmail.com",
        },
      ],
    ),
  );
  check("owen sherry: matched by title", r.rows[0].status, "Call done");
  check("owen sherry: last_call", r.rows[0].last_call, "2024-02-01");
  check("owen sherry: nothing else invented", r.rows[0].last_contact, null);
}

/* Closed is the student's ruling and beats everything — here both a bounce
   and an upcoming call are true at once and neither shows. The other columns
   stay honest facts. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"], true)],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-10T14:00:00Z", ["jamie@jpmorgan.com"]),
            msg({
              date: "2024-02-10T14:00:10Z",
              from: "mailer-daemon@googlemail.com",
              subject: "Delivery Status Notification (Failure)",
              body: GMAIL_BOUNCE("jamie@jpmorgan.com"),
            }),
          ],
        },
      ],
      [
        {
          id: "e1",
          title: "Jamie - Alex JPM IB Call",
          start: "2024-02-20T19:00:00Z",
          end: "2024-02-20T19:30:00Z",
          attendees: ["jamie@jpmorgan.com"],
          organizer: "student@gmail.com",
        },
      ],
    ),
  );
  check("closed: status", r.rows[0].status, "Closed");
  check("closed: no clock", r.rows[0].days, null);
  check("closed: next_call still a fact", r.rows[0].next_call, "2024-02-20T19:00:00Z");
}

/* ---------------------------------------------------------------- *
 * §3 — one conversation, one or several people
 * ---------------------------------------------------------------- */

/* One contact in the thread: everything counts as their activity, which is
   what lets an assistant's reply advance the banker's row. */
{
  const r = computeEngine(
    req(
      [contact(2, "Steve McLaughlin", "FT Partners", ["steve@ftpartners.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-01T14:00:00Z", ["steve@ftpartners.com"]),
            msg({ date: "2024-02-02T10:00:00Z", from: "liz.ream@ftpartners.com" }),
          ],
        },
      ],
    ),
  );
  check("assistant answers for the banker: Replied", r.rows[0].status, "Replied");
  check(
    "assistant is offered in found",
    r.found.map((f) => f.email),
    ["liz.ream@ftpartners.com"],
  );
  check("found name derived from the address", r.found[0].name, "Liz Ream");
  check("found context names the contact", r.found[0].context, "Appeared in a thread with Steve McLaughlin");
}

/* Several contacts in the thread: each person's state comes only from
   messages they are actually on. One person replying does not mark the
   other as replied. */
{
  const doug = "doug@barclays.com";
  const grace = "grace@barclays.com";
  const r = computeEngine(
    req(
      [
        contact(2, "Doug Melsheimer", "Barclays", [doug]),
        contact(3, "Grace Steelman", "Barclays", [grace]),
      ],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-01T14:00:00Z", [doug]),
            out("2024-02-01T15:00:00Z", [grace]),
            msg({ date: "2024-02-03T10:00:00Z", from: doug }),
          ],
        },
      ],
    ),
  );
  check("shared thread: Doug replied", r.rows[0].status, "Replied");
  check("shared thread: Grace did not", r.rows[1].status, "Sent");
  check("shared thread: rows in request order", r.rows.map((x) => x.row), [2, 3]);
}

/* ---------------------------------------------------------------- *
 * §5 — attempts count from their last real word
 * ---------------------------------------------------------------- */

{
  const jamie = "jamie@jpmorgan.com";
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", [jamie])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-01-10T14:00:00Z", [jamie]),
            msg({ date: "2024-01-11T10:00:00Z", from: jamie }),
            out("2024-01-20T14:00:00Z", [jamie]),
            out("2024-01-28T14:00:00Z", [jamie], { subject: "Following up" }),
            out("2024-02-05T14:00:00Z", [jamie], { subject: "Following up again" }),
          ],
        },
      ],
    ),
  );
  check("attempts: three since they last wrote", r.rows[0].attempts, 3);
  check("attempts: state is Sent", r.rows[0].status, "Sent");
}

/* ---------------------------------------------------------------- *
 * §7 — the calendar title match
 * ---------------------------------------------------------------- */

check("firm: JPM abbreviates J.P. Morgan", firmInTitle("J.P. Morgan", "Carson - Jonathan JPM IB Call"), true);
check("firm: JPM abbreviates JPMorgan", firmInTitle("JPMorgan", "Carson - Jonathan JPM IB Call"), true);
check("firm: RJ initials Raymond James", firmInTitle("Raymond James", "David - Jonathan RJ IB Call"), true);
check("firm: Houlihan alone is enough", firmInTitle("Houlihan Lokey", "Danny - Jonathan Houlihan LA IB Call"), true);
check("firm: full name in order", firmInTitle("Morgan Stanley", "Grant - Jonathan Morgan Stanley IB Call"), true);
check("firm: K1 survives generic words", firmInTitle("K1 Investment Management", "Katrina/Jonathan: K1 Intro"), true);
check("firm: no cross-firm match", firmInTitle("Morgan Stanley", "Carson - Jonathan JPM IB Call"), false);
check("firm: Citi does not match Houlihan", firmInTitle("Citi", "Danny - Jonathan Houlihan LA IB Call"), false);

/* First names match whole words: "Mat" must not hide inside "Mastermind". */
{
  const r = computeEngine(
    req(
      [contact(2, "Mat Young", "Citi", [])],
      [],
      [
        {
          id: "e1",
          title: "Jonathan - Wall Street Mastermind Strategy Session",
          start: "2024-02-01T20:00:00Z",
          end: "2024-02-01T21:00:00Z",
          attendees: [],
          organizer: "student@gmail.com",
        },
      ],
    ),
  );
  check("first name is a whole word", r.rows[0].status, "Not emailed");
  check(
    "unmatched event warned",
    r.warnings.some((w) => w.includes("matched no contact")),
    true,
  );
}

/* ---------------------------------------------------------------- *
 * §8 — the never-suggest list, and capitalisation
 * ---------------------------------------------------------------- */

{
  const jamie = "jamie@jpmorgan.com";
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", [jamie])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-01T14:00:00Z", [jamie]),
            msg({
              date: "2024-02-02T10:00:00Z",
              from: "JAMIE@jpmorgan.com",
              cc: [
                "colleague@jpmorgan.com",
                "no-reply@jpmorgan.com",
                "donotreply@updates.jpmorgan.com",
                "calendar-notification@google.com",
                "student@utexas.edu",
                "already.rejected@jpmorgan.com",
              ],
            }),
          ],
        },
      ],
      [],
      "2024-02-15T17:00:00Z",
      ["Already.Rejected@jpmorgan.com"],
    ),
  );
  check(
    "found: only the real colleague survives the never-suggest list",
    r.found.map((f) => f.email),
    ["colleague@jpmorgan.com"],
  );
  check(
    "capitalisation variants warned",
    r.warnings.some((w) => w.startsWith("jamie@jpmorgan.com appears in more than one capitalisation")),
    true,
  );
  check("case difference is still the same person", r.rows[0].status, "Replied");
}

/* ---------------------------------------------------------------- *
 * Days are calendar dates, in the timestamp's own timezone
 * ---------------------------------------------------------------- */

{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [
        {
          thread_id: "t1",
          messages: [out("2024-01-31T23:50:00-06:00", ["jamie@jpmorgan.com"])],
        },
      ],
      [],
      "2024-02-01T01:00:00-06:00",
    ),
  );
  check("days: late evening to small hours is one day", r.rows[0].days, 1);
}

/* ---------------------------------------------------------------- *
 * The envelope
 * ---------------------------------------------------------------- */

{
  let error = "";
  try {
    parseEngineRequest({ version: 2, now: "2024-02-15T17:00:00Z", student: { addresses: ["s@x.com"] } });
  } catch (e) {
    error = e instanceof RequestError ? e.message : "wrong error type";
  }
  check("version mismatch is loud", error.includes("must be 1"), true);
}

{
  let error = "";
  try {
    parseEngineRequest({
      version: 1,
      now: "2024-02-15 17:00:00",
      student: { addresses: ["s@x.com"] },
    });
  } catch (e) {
    error = e instanceof RequestError ? e.message : "wrong error type";
  }
  check("timestamp without timezone is loud", error.includes("ISO 8601"), true);
}

{
  const parsed = parseEngineRequest({
    version: 1,
    now: "2024-02-15T17:00:00Z",
    student: { addresses: ["s@x.com"] },
    contacts: [{ row: 2, name: "Jamie Diamond", emails: ["j@x.com"], closed: false }],
    threads: [
      {
        thread_id: "t1",
        messages: [
          { date: "2024-02-01T10:00:00Z", from: "s@x.com", to: ["j@x.com"], is_outbound: true },
        ],
      },
    ],
  });
  check("absent lists become empty lists", parsed.threads[0].messages[0].cc, []);
  check("absent firm becomes empty text", parsed.contacts[0].firm, "");
  check("absent events tolerated", parsed.events, []);
}

/* ---------------------------------------------------------------- */

if (failures > 0) {
  console.error(`\n${failures} of ${checks} checks failed.`);
  process.exit(1);
}
console.log(`All ${checks} checks passed.`);
