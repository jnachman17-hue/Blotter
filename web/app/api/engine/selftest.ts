import { computeEngine, firmInTitle } from "./rules";
import { parseEngineRequest, RequestError } from "./validate";
import type { ContactIn, EngineRequest, EventIn, MessageIn, RowOut, ThreadIn } from "./types";

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
    failed_recipients: overrides.failed_recipients ?? [],
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
    version: 4,
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

/** A calendar event. `declined` is empty unless a test is about a declined invite. */
function evt(overrides: Partial<EventIn> & { start: string; end: string }): EventIn {
  return {
    id: overrides.id ?? "e1",
    title: overrides.title ?? "Jamie - Alex JPM IB Call",
    start: overrides.start,
    end: overrides.end,
    attendees: overrides.attendees ?? ["jamie@jpmorgan.com"],
    declined: overrides.declined ?? [],
    organizer: overrides.organizer ?? "student@gmail.com",
  };
}

/* The real bounce text lives in `courier/helpers.test.js` now. Extracting an
   address from a delivery-failure notice is the courier's job since contract
   version 4 — the engine never sees the text, so it cannot be tested on it. */

/* ---------------------------------------------------------------- *
 * The seven states
 * ---------------------------------------------------------------- */

{
  const r = computeEngine(req([contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])], []));
  check("not emailed: status", r.rows[0].status, "Not emailed");
  check("not emailed: no clock", r.rows[0].days, null);
  check("not emailed: no attempts to show", r.rows[0].attempts, null);
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
  /* D24: Replied is always zero by definition, so it shows nothing at all. */
  check("replied: no attempts, because it is always zero", r.rows[0].attempts, null);
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
        failed_recipients: [address],
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
  /* D24: a bounced address is unreachable; a clock on it says nothing useful. */
  check("bounced: no clock", r.rows[0].days, null);
  /* D24, in Jon's words: "If that address is bounced it's bounced, additional
     attempts are worthless." The three guesses are still counted internally;
     they are simply not worth a cell. */
  check("bounced: no attempts shown", r.rows[0].attempts, null);
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
              failed_recipients: ["Marijoy.Bertolini@aerispartners.com"],
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
  const event = evt({
    start: "2024-02-17T19:00:00Z",
    end: "2024-02-17T19:30:00Z",
    attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
  });
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
  /* D24: the one state that counted FORWARDS, and `next_call` already carries
     the date. It shows a dash now. */
  check("call scheduled: no clock — next_call carries the date", r.rows[0].days, null);
  check("call scheduled: next_call echoes the start", r.rows[0].next_call, "2024-02-17T19:00:00Z");
  check("call scheduled: last_contact still the mail", r.rows[0].last_contact, "2024-02-12");
}

/* Call done holds until somebody writes — that is how a thank-you gets
   tracked without a state for it — and Last call keeps its date regardless. */
{
  const event = evt({ start: "2024-02-10T19:00:00Z", end: "2024-02-10T19:30:00Z" });
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

/* §4, ruled September 2, 2026: a call counts as done the moment it STARTS.
   At 2:01pm on a 2:00-2:30 call the row reads `Call done`, not `Call
   scheduled` — replacing the old convention that waited for the end time. */
{
  const event = evt({ start: "2024-02-15T20:00:00Z", end: "2024-02-15T20:30:00Z" });
  const rows = (now: string) =>
    computeEngine(
      req(
        [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
        [{ thread_id: "t1", messages: [out("2024-02-14T14:00:00Z", ["jamie@jpmorgan.com"])] }],
        [event],
        now,
      ),
    ).rows[0];

  check("a minute before the call: still scheduled", rows("2024-02-15T19:59:00Z").status, "Call scheduled");
  check("a minute after it starts: done", rows("2024-02-15T20:01:00Z").status, "Call done");
  check("a minute after it starts: zero days", rows("2024-02-15T20:01:00Z").days, 0);
  check("a minute after it starts: no next call", rows("2024-02-15T20:01:00Z").next_call, null);
  check("a minute after it starts: last_call is set", rows("2024-02-15T20:01:00Z").last_call, "2024-02-15");
  check("after the end: still done", rows("2024-02-15T21:00:00Z").status, "Call done");
}

/* The corollary of the start-time flip: "nobody has written since" is measured
   from the start too. A thank-you sent while the call is still nominally
   running is the student speaking last; under the old end-time anchor it could
   never clear the row at all. */
{
  const event = evt({ start: "2024-02-15T20:00:00Z", end: "2024-02-15T20:30:00Z" });
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-15T20:20:00Z", ["jamie@jpmorgan.com"], { subject: "Enjoyed Our Conversation" }),
          ],
        },
      ],
      [event],
      "2024-02-16T17:00:00Z",
    ),
  );
  check("a thank-you sent during the call clears it", r.rows[0].status, "Sent");
  check("and last_call still keeps the date", r.rows[0].last_call, "2024-02-15");
}

/* §4/D10, contract v2: `Call cancelled`, the eighth status. A declined invite
   used to leave a row reading `Call scheduled` forever for a meeting nobody
   would attend. Either side declining cancels the call. */
{
  const declinedByThem = evt({
    start: "2024-02-20T19:00:00Z",
    end: "2024-02-20T19:30:00Z",
    attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
    declined: ["jamie@jpmorgan.com"],
  });
  const thread: ThreadIn = {
    thread_id: "t1",
    messages: [out("2024-02-14T14:00:00Z", ["jamie@jpmorgan.com"])],
  };
  const jamie = [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])];

  /* §4, ruled by Jon on September 2, 2026: the clock counts from the last
     thing that ACTUALLY HAPPENED. A cancelled call is a non-event — it changes
     the status and touches nothing else. So this reads exactly the number
     `Sent` would read: six days since Jon's email of the 14th. */
  const ahead = computeEngine(req(jamie, [thread], [declinedByThem])).rows[0];
  check("declined in advance: cancelled, not scheduled", ahead.status, "Call cancelled");
  check("declined in advance: no clock", ahead.days, null);
  check("a cancelled call is not the next call", ahead.next_call, null);
  check("a cancelled call is not the last call either", ahead.last_call, null);
  check("a cancelled call shows no attempts", ahead.attempts, null);

  /* The hour the call was due passing changes nothing, because nothing
     happened at it. The clock is still counting from the email. */
  const after = computeEngine(req(jamie, [thread], [declinedByThem], "2024-02-25T17:00:00Z")).rows[0];
  check("the call's hour passing changes the status not at all", after.status, "Call cancelled");
  check("and still no clock once the hour passes", after.days, null);

  /* The whole point of the state: it clears itself, exactly as `Call done`
     does. Without that it would be a dead end nothing ever removes. */
  const wrote = computeEngine(
    req(
      jamie,
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-14T14:00:00Z", ["jamie@jpmorgan.com"]),
            msg({ date: "2024-02-21T10:00:00Z", from: "jamie@jpmorgan.com" }),
          ],
        },
      ],
      [declinedByThem],
      "2024-02-25T17:00:00Z",
    ),
  ).rows[0];
  check("somebody writes and it clears", wrote.status, "Replied");
}

/* §4, ruled September 2, 2026: `Call cancelled` clears the moment anybody
   writes, **even while the call's own date is still ahead**. Deciding that
   needs a moment to measure from, and the calendar has none — so the decline
   notification Google sends the organiser is what supplies it. */
{
  const jamie = [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])];
  const declined = evt({
    start: "2024-02-20T19:00:00Z",
    end: "2024-02-20T19:30:00Z",
    attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
    declined: ["jamie@jpmorgan.com"],
  });
  const notice = msg({
    date: "2024-02-12T10:00:00Z",
    from: "jamie@jpmorgan.com",
    subject: "Declined: Invitation: Jamie - Alex JPM IB Call @ Tue Feb 20, 2024",
  });
  const outreach = out("2024-02-08T14:00:00Z", ["jamie@jpmorgan.com"]);

  /* Declined on the 12th, nothing since: the row says so, even though the
     call itself is still eight days away. */
  const quiet = computeEngine(
    req(jamie, [{ thread_id: "t1", messages: [outreach, notice] }], [declined], "2024-02-15T17:00:00Z"),
  ).rows[0];
  check("declined, nothing written since: cancelled", quiet.status, "Call cancelled");
  check("a cancelled call carries no clock", quiet.days, null);
  check("the decline notice is not a reply", quiet.attempts, null);

  /* They write the next day proposing a new time. The row clears immediately —
     it does not wait for the call's date to pass, which is what the anchor this
     replaced did wrong. */
  const answered = computeEngine(
    req(
      jamie,
      [{
        thread_id: "t1",
        messages: [outreach, notice, msg({ date: "2024-02-13T10:00:00Z", from: "jamie@jpmorgan.com" })],
      }],
      [declined],
      "2024-02-15T17:00:00Z",
    ),
  ).rows[0];
  check("they write after declining: cleared, not cancelled", answered.status, "Replied");
  check("and the clock is theirs", answered.days, 2);

  /* An email BEFORE the decline does not clear it — the order is what matters,
     not merely that mail exists. */
  const earlier = computeEngine(
    req(
      jamie,
      [{
        thread_id: "t1",
        messages: [outreach, msg({ date: "2024-02-10T10:00:00Z", from: "jamie@jpmorgan.com" }), notice],
      }],
      [declined],
      "2024-02-15T17:00:00Z",
    ),
  ).rows[0];
  check("an email before the decline does not clear it", earlier.status, "Call cancelled");

  /* With no notification — the student declining their own invite, which
     Google tells nobody about — the call's date is the honest fallback. */
  const noNotice = computeEngine(
    req(
      jamie,
      [{
        thread_id: "t1",
        messages: [outreach, msg({ date: "2024-02-13T10:00:00Z", from: "jamie@jpmorgan.com" })],
      }],
      [evt({
        start: "2024-02-20T19:00:00Z",
        end: "2024-02-20T19:30:00Z",
        attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
        declined: ["student@gmail.com"],
      })],
      "2024-02-15T17:00:00Z",
    ),
  ).rows[0];
  check("no notification: falls back to the call's date", noNotice.status, "Call cancelled");
}

/* The other half of "the last thing that actually happened": a call that took
   place outranks an older email as the anchor. A call happened on the 10th,
   nobody wrote after it, a second call on the 20th was declined — the clock
   counts from the call that happened, not from the email that preceded it and
   not from the call that did not. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [{ thread_id: "t1", messages: [out("2024-02-01T14:00:00Z", ["jamie@jpmorgan.com"])] }],
      [
        evt({ id: "e1", start: "2024-02-10T19:00:00Z", end: "2024-02-10T19:30:00Z" }),
        evt({
          id: "e2",
          start: "2024-02-13T19:00:00Z",
          end: "2024-02-13T19:30:00Z",
          declined: ["jamie@jpmorgan.com"],
        }),
      ],
    ),
  );
  check("a completed call outranks the older email", r.rows[0].status, "Call cancelled");
  check("and a cancelled call still carries no clock", r.rows[0].days, null);
  check("the call that happened is still Last call", r.rows[0].last_call, "2024-02-10");
}

/* And when nothing has ever actually happened, there is no clock to show. A
   contact whose only calendar event was declined and who has never exchanged a
   message really has nothing to count from; `null` becomes a dash in the
   sheet, which says exactly that. */
{
  const r = computeEngine(
    req(
      [contact(7, "Owen Sherry", "Houlihan Lokey", [])],
      [],
      [
        evt({
          title: "Jonathan - Owen Sherry Houlihan RX Intro Call",
          start: "2024-02-20T20:00:00Z",
          end: "2024-02-20T20:30:00Z",
          attendees: [],
          declined: ["student@gmail.com"],
        }),
      ],
    ),
  );
  check("nothing ever happened: still cancelled", r.rows[0].status, "Call cancelled");
  check("nothing ever happened: no clock at all", r.rows[0].days, null);
  check("nothing ever happened: nothing invented", r.rows[0].last_contact, null);
  check("nothing ever happened: no attempts", r.rows[0].attempts, null);
  check("nothing ever happened: no last call", r.rows[0].last_call, null);
}

/* Either side. The student declining cancels the call just as the banker
   declining does. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [{ thread_id: "t1", messages: [out("2024-02-14T14:00:00Z", ["jamie@jpmorgan.com"])] }],
      [
        evt({
          start: "2024-02-20T19:00:00Z",
          end: "2024-02-20T19:30:00Z",
          attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
          declined: ["student@gmail.com"],
        }),
      ],
    ),
  );
  check("the student declining cancels it too", r.rows[0].status, "Call cancelled");
}

/* But only the two sides of the call. A third party on the invite declining
   cancels nobody's call. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])],
      [{ thread_id: "t1", messages: [out("2024-02-14T14:00:00Z", ["jamie@jpmorgan.com"])] }],
      [
        evt({
          start: "2024-02-20T19:00:00Z",
          end: "2024-02-20T19:30:00Z",
          attendees: ["jamie@jpmorgan.com", "student@gmail.com", "someone.else@jpmorgan.com"],
          declined: ["someone.else@jpmorgan.com"],
        }),
      ],
    ),
  );
  check("a third party declining changes nothing", r.rows[0].status, "Call scheduled");
  check("and the call is still the next call", r.rows[0].next_call, "2024-02-20T19:00:00Z");
}

/* Precedence: a live call still to come outranks a cancelled one, and a call
   that happened after a cancelled one wins the `Call done | Call cancelled`
   tier — the most recent call either happened or was called off. */
{
  const jamie = [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])];
  const cancelled = evt({
    id: "e1",
    start: "2024-02-10T19:00:00Z",
    end: "2024-02-10T19:30:00Z",
    declined: ["jamie@jpmorgan.com"],
  });
  const rescheduled = evt({ id: "e2", start: "2024-02-20T19:00:00Z", end: "2024-02-20T19:30:00Z" });

  const withUpcoming = computeEngine(req(jamie, [], [cancelled, rescheduled])).rows[0];
  check("a rescheduled call outranks the cancelled one", withUpcoming.status, "Call scheduled");
  check("and the cancelled one is not last_call", withUpcoming.last_call, null);

  const bothPast = computeEngine(
    req(jamie, [], [cancelled, rescheduled], "2024-02-25T17:00:00Z"),
  ).rows[0];
  check("the later call happened, so: done", bothPast.status, "Call done");
  check("and it is the last call", bothPast.last_call, "2024-02-20");
}

/* Contract v2: a display name on a header is passed through to `found`, and
   only ever a real one. */
{
  const r = computeEngine(
    req(
      [contact(2, "Steve McLaughlin", "FT Partners", ["steve@ftpartners.com"])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-01T14:00:00Z", ["steve@ftpartners.com"]),
            msg({
              date: "2024-02-02T10:00:00Z",
              from: "Barbara Barman <boone2002@att.net>",
              cc: ["boone.jr@att.net"],
            }),
          ],
        },
      ],
    ),
  );
  const byEmail = new Map(r.found.map((f) => [f.email.toLowerCase(), f]));
  check("a real display name is used", byEmail.get("boone2002@att.net")?.name, "Barbara Barman");
  check("the address itself is kept bare", byEmail.get("boone2002@att.net")?.email, "boone2002@att.net");
  check("a bare address gets no invented name", byEmail.get("boone.jr@att.net")?.name, null);
  check("a display name never breaks matching", r.rows[0].status, "Replied");
}

/* §4: a closed row keeps its history. Only the clock is dropped. */
{
  const r = computeEngine(
    req(
      [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"], true)],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-02-08T14:00:00Z", ["jamie@jpmorgan.com"]),
            out("2024-02-12T14:00:00Z", ["jamie@jpmorgan.com"]),
          ],
        },
      ],
      [evt({ start: "2024-02-10T19:00:00Z", end: "2024-02-10T19:30:00Z" })],
    ),
  );
  check("closed: the clock is a dash", r.rows[0].days, null);
  check("closed: last contact survives", r.rows[0].last_contact, "2024-02-12");
  check("closed: no attempts shown", r.rows[0].attempts, null);
  check("closed: the call date survives", r.rows[0].last_call, "2024-02-10");
}

/* Owen Sherry: a call that demonstrably happened, and no email address
   anywhere. Reachable only through first name plus firm in the title. */
{
  const r = computeEngine(
    req(
      [contact(7, "Owen Sherry", "Houlihan Lokey", [])],
      [],
      [
        evt({
          title: "Jonathan - Owen Sherry Houlihan RX Intro Call",
          start: "2024-02-01T20:00:00Z",
          end: "2024-02-01T20:30:00Z",
          attendees: [],
        }),
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
              failed_recipients: ["jamie@jpmorgan.com"],
            }),
          ],
        },
      ],
      [
        evt({ start: "2024-02-20T19:00:00Z", end: "2024-02-20T19:30:00Z" }),
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
  /* §8/D4, ruled September 2, 2026: a real name or nothing. The header here
     carries no display name, so the cell stays blank rather than becoming
     "Liz Ream" — an invention that reads exactly like a fact. */
  check("found name is never derived from the address", r.found[0].name, null);
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

/* Forwarding a contact's reply to family inside the same thread is not
   writing to the contact — Jon's ruling, September 1, 2026. The Samuel Ward
   shape: outreach, his reply, a forward to a third party, then a real reply
   to him. One attempt, not two. */
{
  const sam = "spward@hl.com";
  const r = computeEngine(
    req(
      [contact(17, "Samuel Ward", "Houlihan Lokey", [sam])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-01-17T16:44:00-06:00", [sam]),
            msg({ date: "2024-01-22T15:45:00-06:00", from: sam }),
            out("2024-01-22T20:46:00-06:00", ["dad@example.com"], { subject: "Fwd: Great news" }),
            out("2024-01-22T23:01:00-06:00", [sam]),
          ],
        },
      ],
      [],
      "2024-01-25T18:00:00Z",
    ),
  );
  check("forward: one attempt, not two", r.rows[0].attempts, 1);
  check("forward: state still Sent", r.rows[0].status, "Sent");

  const stopsAtForward = computeEngine(
    req(
      [contact(17, "Samuel Ward", "Houlihan Lokey", [sam])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-01-17T16:44:00-06:00", [sam]),
            msg({ date: "2024-01-22T15:45:00-06:00", from: sam }),
            out("2024-01-22T20:46:00-06:00", ["dad@example.com"], { subject: "Fwd: Great news" }),
          ],
        },
      ],
      [],
      "2024-01-25T18:00:00Z",
    ),
  );
  check("forward: he still holds the last word", stopsAtForward.rows[0].status, "Replied");
  check("forward: he replied, so no attempts are shown", stopsAtForward.rows[0].attempts, null);
}

/* A calendar RSVP is machine mail: accepting an invite is not writing back.
   The unanswered email stays unanswered, in state and in attempts. */
{
  const mat = "mathew.young@citi.com";
  const r = computeEngine(
    req(
      [contact(4, "Mathew (Mat) Young", "Citi", [mat])],
      [
        {
          thread_id: "t1",
          messages: [
            out("2024-01-22T14:00:00Z", [mat]),
            msg({ date: "2024-01-22T21:05:52Z", from: mat }),
            out("2024-01-22T21:20:01Z", [mat]),
            msg({
              date: "2024-01-22T21:58:58Z",
              from: mat,
              subject: "Accepted: Invitation: Mat - Jonathan Citi NY IB Call @ Fri Jan 26, 2024",
            }),
          ],
        },
      ],
      [],
      "2024-01-25T18:00:00Z",
    ),
  );
  check("rsvp: acceptance is not a reply", r.rows[0].status, "Sent");
  check("rsvp: attempts not reset", r.rows[0].attempts, 1);
  check("rsvp: last_contact is the real mail", r.rows[0].last_contact, "2024-01-22");
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
        evt({
          title: "Jonathan - Wall Street Mastermind Strategy Session",
          start: "2024-02-01T20:00:00Z",
          end: "2024-02-01T21:00:00Z",
          attendees: [],
        }),
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

/* Warnings cap per kind: a live courier sends the student's whole personal
   calendar, and one warning per non-recruiting event once overflowed the
   50,000-character sheet cell the courier writes into. */
{
  const events: EventIn[] = Array.from({ length: 15 }, (_, i) =>
    evt({
      id: `e${i}`,
      title: `Dentist visit ${i}`,
      start: "2024-02-01T20:00:00Z",
      end: "2024-02-01T21:00:00Z",
      attendees: [],
    }),
  );
  const r = computeEngine(req([contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"])], [], events));
  const eventWarnings = r.warnings.filter((w) => w.startsWith("Calendar event"));
  check("warnings capped: ten examples shown", eventWarnings.length, 10);
  check(
    "warnings capped: the rest counted honestly",
    r.warnings.some((w) => w === "…and 5 more calendar events that matched no contact and were ignored."),
    true,
  );
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

/* D24's table, walked end to end. It is stated as a table in the rules, so it
   is pinned as one here: a column carries a number only where that number
   means something, and null everywhere else. */
{
  const outreach = out("2024-02-08T14:00:00Z", ["jamie@jpmorgan.com"]);
  const theirs = msg({ date: "2024-02-09T14:00:00Z", from: "jamie@jpmorgan.com" });
  const past = evt({ start: "2024-02-10T19:00:00Z", end: "2024-02-10T19:30:00Z" });
  const ahead = evt({ start: "2024-02-20T19:00:00Z", end: "2024-02-20T19:30:00Z" });
  const off = evt({
    start: "2024-02-20T19:00:00Z",
    end: "2024-02-20T19:30:00Z",
    attendees: ["jamie@jpmorgan.com", "student@gmail.com"],
    declined: ["jamie@jpmorgan.com"],
  });
  const bounce = msg({
    date: "2024-02-08T14:01:00Z",
    from: "mailer-daemon@googlemail.com",
    subject: "Delivery Status Notification (Failure)",
    failed_recipients: ["jamie@jpmorgan.com"],
  });
  const row = (threads: ThreadIn[], events: EventIn[] = [], closed = false) =>
    computeEngine(
      req(
        [contact(2, "Jamie Diamond", "JPMorgan", ["jamie@jpmorgan.com"], closed)],
        threads,
        events,
      ),
    ).rows[0];
  const t = (...messages: MessageIn[]): ThreadIn[] => [{ thread_id: "t1", messages }];
  const shape = (r: RowOut) => [r.status, r.days, r.attempts];

  check("D24 · Not emailed", shape(row([])), ["Not emailed", null, null]);
  check("D24 · Sent — the only row carrying both", shape(row(t(outreach))), ["Sent", 7, 1]);
  check("D24 · Replied — a clock, no count", shape(row(t(outreach, theirs))), ["Replied", 6, null]);
  check("D24 · Call done — the thank-you clock", shape(row(t(outreach), [past])), ["Call done", 5, null]);
  check("D24 · Call scheduled", shape(row(t(outreach), [ahead])), ["Call scheduled", null, null]);
  check("D24 · Call cancelled", shape(row(t(outreach), [off])), ["Call cancelled", null, null]);
  check("D24 · Bounced", shape(row(t(outreach, bounce))), ["Bounced", null, null]);
  check("D24 · Closed", shape(row(t(outreach), [], true)), ["Closed", null, null]);

  /* The count itself is still computed correctly — D24 governs whether it is
     shown, not whether it is right. */
  check(
    "a second send still counts, and Sent still shows it",
    row(t(outreach, out("2024-02-12T14:00:00Z", ["jamie@jpmorgan.com"]))).attempts,
    2,
  );
}

/* ---------------------------------------------------------------- *
 * The envelope
 * ---------------------------------------------------------------- */

/* Version 4 refuses every earlier version, and that is a change of kind.
   Earlier bumps were additive so an old payload still meant what it meant.
   This one removes `body`, and a version-3 courier still sends one — accepting
   it would mean carrying on receiving the text of people's email.

   The second reason is the dangerous one: a version-4 courier against a
   version-3 server sends no bodies to a server that expects them, and bounces
   silently stop being detected. The version check is the only thing standing
   between that and a row quietly reading `Sent` for a dead address. */
{
  for (const stale of [1, 2, 3]) {
    let error = "";
    try {
      parseEngineRequest({ version: stale, now: "2024-02-15T17:00:00Z", student: { addresses: ["s@x.com"] } });
    } catch (e) {
      error = e instanceof RequestError ? e.message : "wrong error type";
    }
    check(`version ${stale} is refused, not tolerated`, error.includes("must be 4"), true);
    check(`version ${stale} refusal names the fix`, error.includes("Code.gs"), true);
  }
}

/* And the promise that the server never receives the text of an email is a
   refusal rather than a convention: a body is rejected, not quietly dropped. */
{
  let error = "";
  try {
    parseEngineRequest({
      version: 4,
      now: "2024-02-15T17:00:00Z",
      student: { addresses: ["s@x.com"] },
      threads: [{
        thread_id: "t1",
        messages: [{
          date: "2024-02-01T10:00:00Z", from: "s@x.com", to: ["j@x.com"],
          is_outbound: true, body: "please do not send me this",
        }],
      }],
    });
  } catch (e) {
    error = e instanceof RequestError ? e.message : "wrong error type";
  }
  check("a message body is refused outright", error.includes("must not be sent"), true);
  check("and the refusal says what to send instead", error.includes("failed_recipients"), true);
}

{
  let error = "";
  try {
    parseEngineRequest({
      version: 4,
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
    version: 4,
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
