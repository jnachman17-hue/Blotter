// Direct tests against the rulebook. No spreadsheet involved.
// Default: in-process against web/app/api/engine. LIVE=1 hits the deployed server.
import { computeEngine, CURRENT_COURIER_VERSION } from "./rules";
import { parseEngineRequest, RequestError } from "./validate";
import type { FoundPerson, RowOut } from "./types";

const LIVE = process.env.LIVE === "1";
const URL = process.env.ENGINE_URL || "https://blotterib.com/api/engine";
const ME = "student@example.com";
const NOW = "2026-09-04T12:00:00-07:00";
const TZ = "-07:00";

let pass = 0, fail = 0;
const failures: string[] = [];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function req(over: any = {}) {
  return {
    version: 4, key: "", install_id: "00000000-0000-4000-8000-000000000001",
    courier_version: CURRENT_COURIER_VERSION, now: NOW,
    student: { addresses: [ME] },
    contacts: [], threads: [], events: [], ignored: [], ...over,
  } as any;
}
const contact = (over: any = {}) => ({ row: 2, name: "Jamie Diamond", firm: "JPMorgan",
  emails: ["jamie.diamond@jpmorgan.com"], closed: false, ...over });
const msg = (over: any = {}) => ({ id: "m" + Math.random().toString(36).slice(2),
  date: NOW, from: ME, to: ["jamie.diamond@jpmorgan.com"], cc: [], subject: "Intro",
  failed_recipients: [], is_outbound: true, ...over });
const thread = (messages: any[], id = "t1") => ({ thread_id: id, messages });
const ev = (over: any = {}) => ({ id: "e1", title: "Jamie - Alex JPM IB Call",
  start: "2026-09-06T14:00:00" + TZ, end: "2026-09-06T14:30:00" + TZ,
  attendees: ["jamie.diamond@jpmorgan.com", ME], declined: [], organizer: ME, ...over });

async function post(body: any): Promise<{ status: number; json: any }> {
  if (!LIVE) {
    try {
      return { status: 200, json: computeEngine(parseEngineRequest(body)) };
    } catch (e) {
      if (e instanceof RequestError) return { status: 400, json: { error: e.message } };
      throw e;
    }
  }
  for (let attempt = 0; attempt < 6; attempt++) {
    const r = await fetch(URL, { method: "POST",
      headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const json = await r.json().catch(() => null);
    if (r.status !== 403 && r.status !== 429) return { status: r.status, json };
    await sleep(15000 * (attempt + 1));
  }
  return { status: 403, json: null };
}

function check(label: string, actual: any, expected: any) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; console.log(`  ok   ${label}`); }
  else { fail++; failures.push(`${label}\n       expected ${e}\n       actual   ${a}`);
    console.log(`  FAIL ${label}\n       expected ${e}\n       actual   ${a}`); }
}

const view = (row: any) => ({ status: row.status, days: row.days, attempts: row.attempts,
  last_contact: row.last_contact, next_call: row.next_call, last_call: row.last_call });

async function run(label: string, body: any): Promise<any> {
  const r = await post(body);
  if (r.status !== 200) { fail++; failures.push(`${label} HTTP ${r.status}`);
    console.log(`  FAIL ${label} HTTP ${r.status} ${JSON.stringify(r.json)}`); return null; }
  if (LIVE) await sleep(1200);
  return r.json;
}


async function main() {
  console.log("\n=== THE EIGHT STATUSES ===");

  // 1. Not emailed
  let r: any = await run("not emailed", req({ contacts: [contact()] }));
  check("Not emailed", view(r.rows[0]),
    { status: "Not emailed", days: null, attempts: null, last_contact: null, next_call: null, last_call: null });

  // 2. Sent — one outbound 12 days ago
  r = await run("sent", req({ contacts: [contact()],
    threads: [thread([msg({ date: "2026-08-23T09:00:00" + TZ })])] }));
  check("Sent, one attempt, 12 days", view(r.rows[0]),
    { status: "Sent", days: 12, attempts: 1, last_contact: "2026-08-23", next_call: null, last_call: null });

  // 2b. Sent — three outbounds, attempts counts bumps
  r = await run("sent x3", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ }),
    msg({ date: "2026-08-27T09:00:00" + TZ }),
    msg({ date: "2026-09-01T09:00:00" + TZ })])] }));
  check("Sent, three attempts, days from last send", view(r.rows[0]),
    { status: "Sent", days: 3, attempts: 3, last_contact: "2026-09-01", next_call: null, last_call: null });

  // 3. Replied — attempts must be null
  r = await run("replied", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ }),
    msg({ date: "2026-08-30T09:00:00" + TZ, from: "Jamie Diamond <jamie.diamond@jpmorgan.com>",
          to: [ME], subject: "Re: Intro", is_outbound: false })])] }));
  check("Replied, attempts null", view(r.rows[0]),
    { status: "Replied", days: 5, attempts: null, last_contact: "2026-08-30", next_call: null, last_call: null });

  // 3b. Attempts resets after they write
  r = await run("replied then bumped", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-10T09:00:00" + TZ }),
    msg({ date: "2026-08-12T09:00:00" + TZ }),
    msg({ date: "2026-08-20T09:00:00" + TZ, from: "jamie.diamond@jpmorgan.com", to: [ME], is_outbound: false }),
    msg({ date: "2026-09-02T09:00:00" + TZ })])] }));
  check("Attempts counts only since they last wrote", view(r.rows[0]),
    { status: "Sent", days: 2, attempts: 1, last_contact: "2026-09-02", next_call: null, last_call: null });

  // 4. Bounced
  r = await run("bounced", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-25T09:00:00" + TZ }),
    msg({ date: "2026-08-25T09:00:30" + TZ, from: "Mail Delivery Subsystem <mailer-daemon@googlemail.com>",
          to: [ME], subject: "Delivery Status Notification (Failure)",
          failed_recipients: ["jamie.diamond@jpmorgan.com"], is_outbound: false })])] }));
  check("Bounced, days and attempts null", view(r.rows[0]),
    { status: "Bounced", days: null, attempts: null, last_contact: "2026-08-25", next_call: null, last_call: null });

  // 5. Call scheduled — future event
  r = await run("call scheduled", req({ contacts: [contact()], events: [ev()] }));
  check("Call scheduled, days and attempts null, next_call set", view(r.rows[0]),
    { status: "Call scheduled", days: null, attempts: null, last_contact: null,
      next_call: "2026-09-06T14:00:00" + TZ, last_call: null });

  // 6. Call done — past event
  r = await run("call done", req({ contacts: [contact()], events: [ev({
    start: "2026-09-01T14:00:00" + TZ, end: "2026-09-01T14:30:00" + TZ })] }));
  check("Call done, days since call, last_call set", view(r.rows[0]),
    { status: "Call done", days: 3, attempts: null, last_contact: null, next_call: null, last_call: "2026-09-01" });

  // 7. Call cancelled — declined by contact
  r = await run("call cancelled", req({ contacts: [contact()], events: [ev({
    declined: ["jamie.diamond@jpmorgan.com"] })] }));
  check("Call cancelled, days null", view(r.rows[0]),
    { status: "Call cancelled", days: null, attempts: null, last_contact: null, next_call: null, last_call: null });

  // 7b. Student declining also cancels
  r = await run("student declined", req({ contacts: [contact()], events: [ev({ declined: [ME] })] }));
  check("Student's own decline cancels", r.rows[0].status, "Call cancelled");

  // 7c. A third party declining does NOT cancel
  r = await run("third party declined", req({ contacts: [contact()], events: [ev({
    attendees: ["jamie.diamond@jpmorgan.com", ME, "someone.else@jpmorgan.com"],
    declined: ["someone.else@jpmorgan.com"] })] }));
  check("Third party decline does not cancel", r.rows[0].status, "Call scheduled");

  // 8. Closed
  r = await run("closed", req({ contacts: [contact({ closed: true })], threads: [thread([
    msg({ date: "2026-08-23T09:00:00" + TZ })])] }));
  check("Closed, days null, history kept", view(r.rows[0]),
    { status: "Closed", days: null, attempts: null, last_contact: "2026-08-23", next_call: null, last_call: null });

  console.log("\n=== PRECEDENCE ===");
  // Bounced > Call scheduled
  r = await run("bounce beats scheduled", req({ contacts: [contact()], events: [ev()],
    threads: [thread([ msg({ date: "2026-08-25T09:00:00" + TZ }),
      msg({ date: "2026-08-25T09:00:30" + TZ, from: "mailer-daemon@googlemail.com", to: [ME],
        subject: "Delivery Status Notification (Failure)",
        failed_recipients: ["jamie.diamond@jpmorgan.com"], is_outbound: false })])] }));
  check("Bounced beats Call scheduled", r.rows[0].status, "Bounced");

  // Call scheduled > Replied
  r = await run("scheduled beats replied", req({ contacts: [contact()], events: [ev()],
    threads: [thread([ msg({ date: "2026-09-03T09:00:00" + TZ, from: "jamie.diamond@jpmorgan.com",
      to: [ME], is_outbound: false })])] }));
  check("Call scheduled beats Replied", r.rows[0].status, "Call scheduled");

  // Writing after a call clears Call done
  r = await run("write after call", req({ contacts: [contact()],
    events: [ev({ start: "2026-09-01T14:00:00" + TZ, end: "2026-09-01T14:30:00" + TZ })],
    threads: [thread([msg({ date: "2026-09-02T09:00:00" + TZ, subject: "Thank you" })])] }));
  check("Thank-you clears Call done to Sent", r.rows[0].status, "Sent");
  check("Last call survives the thank-you", r.rows[0].last_call, "2026-09-01");

  // A call counts as done the moment it starts
  r = await run("mid call", req({ contacts: [contact()], now: "2026-09-04T14:01:00" + TZ,
    events: [ev({ start: "2026-09-04T14:00:00" + TZ, end: "2026-09-04T14:30:00" + TZ })] }));
  check("Call done at 14:01 on a 14:00 call", r.rows[0].status, "Call done");

  console.log("\n=== WHAT MUST NEVER COUNT ===");
  // Auto-reply is not a reply
  r = await run("auto reply", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ }),
    msg({ date: "2026-08-20T09:00:20" + TZ, from: "jamie.diamond@jpmorgan.com", to: [ME],
      subject: "Automatic reply: Intro", is_outbound: false })])] }));
  check("Auto-reply stays Sent", r.rows[0].status, "Sent");
  check("Auto-reply warned about", r.warnings.some((w: string) => /automatic reply/i.test(w)), true);

  // Calendar acceptance is not a reply
  r = await run("calendar accept", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ }),
    msg({ date: "2026-08-21T09:00:00" + TZ, from: "jamie.diamond@jpmorgan.com", to: [ME],
      subject: "Accepted: Jamie - Alex JPM IB Call", is_outbound: false })])] }));
  check("Calendar acceptance stays Sent", r.rows[0].status, "Sent");
  check("Calendar acceptance is not last_contact", r.rows[0].last_contact, "2026-08-20");

  // Forwarding to family is not writing to the banker
  r = await run("forward", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ }),
    msg({ date: "2026-08-25T09:00:00" + TZ, from: "jamie.diamond@jpmorgan.com", to: [ME], is_outbound: false }),
    msg({ date: "2026-09-01T09:00:00" + TZ, from: ME, to: ["mum@family.com"],
      subject: "Fwd: Intro", is_outbound: true })])] }));
  check("Forward to family does not count as writing to the banker", r.rows[0].status, "Replied");

  console.log("\n=== MATCHING ===");
  // Capitalisation
  r = await run("case", req({ contacts: [contact({ emails: ["Jamie.Diamond@JPMorgan.com"] })],
    threads: [thread([msg({ date: "2026-08-23T09:00:00" + TZ, to: ["jamie.diamond@jpmorgan.com"] })])] }));
  check("Capitalisation ignored when matching", r.rows[0].status, "Sent");

  // Several contacts in one thread: one replying does not mark the others
  const five = ["a@f.com","b@f.com","c@f.com"].map((e,i) => contact({ row: i+2, name: "P"+i, emails: [e] }));
  r = await run("multi", req({ contacts: five, threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ, to: ["a@f.com","b@f.com","c@f.com"] }),
    msg({ date: "2026-08-28T09:00:00" + TZ, from: "a@f.com", to: [ME], cc: [], is_outbound: false })])] }));
  check("Only the person who replied reads Replied",
    r.rows.map((x: RowOut) => x.status), ["Replied", "Sent", "Sent"]);

  console.log("\n=== A CONTACT WITH NO EMAIL ADDRESS ===");
  // Owen Sherry: his call demonstrably happened and he has no address anywhere
  // in the mailbox. The row must still work, and must never absorb somebody
  // else's mail just because it has nothing to match on.
  r = await run("no address", req({
    contacts: [contact({ row: 2, name: "Owen Sherry", firm: "Test Bank", emails: [] }),
               contact({ row: 3 })],
    threads: [thread([msg({ date: "2026-08-23T09:00:00" + TZ })])] }));
  check("A contact with no email reads Not emailed", r.rows[0].status, "Not emailed");
  check("...and does not absorb another contact's thread", r.rows[1].status, "Sent");

  // The calendar title match is the only way such a person is reachable (§7).
  r = await run("title match", req({
    contacts: [contact({ row: 2, name: "Owen Sherry", firm: "Intrepid", emails: [] })],
    events: [ev({ title: "Owen - Jonathan Intrepid IB Call", attendees: [ME] })] }));
  check("...but the calendar title still finds them", r.rows[0].status, "Call scheduled");

  console.log("\n=== FOUND AND IGNORED ===");
  r = await run("found", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ, cc: ["Liz Ream <liz.ream@jpmorgan.com>"] })])] }));
  check("A new address in a contact's thread is found",
    r.found.map((f: FoundPerson) => [f.email, f.name]), [["liz.ream@jpmorgan.com", "Liz Ream"]]);

  r = await run("ignored", req({ contacts: [contact()], ignored: ["liz.ream@jpmorgan.com"],
    threads: [thread([msg({ date: "2026-08-20T09:00:00" + TZ, cc: ["Liz Ream <liz.ream@jpmorgan.com>"] })])] }));
  check("An ignored address is never suggested again", r.found, []);

  r = await run("no name", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ, cc: ["boone2002@att.net"] })])] }));
  check("No display name means null, never an invented one", r.found[0].name, null);

  r = await run("noreply", req({ contacts: [contact()], threads: [thread([
    msg({ date: "2026-08-20T09:00:00" + TZ,
      cc: ["no-reply@jpmorgan.com", "do-not-reply@x.com", "mailer-daemon@googlemail.com"] })])] }));
  check("no-reply and bounce senders are never suggested", r.found, []);

  console.log("\n=== THE WIRE ===");
  const bad = await post({ ...req({ contacts: [contact()] }), version: 3 });
  check("Version 3 is refused", bad.status, 400);

  const withBody = req({ contacts: [contact()] });
  withBody.threads = [thread([{ ...msg(), body: "the text of an email" }])];
  const bodyRes = await post(withBody);
  check("A request carrying a body is refused", bodyRes.status, 400);

  // The notice channel
  r = await run("old courier", req({ contacts: [contact()], courier_version: "2026-09-01" }));
  check("An old courier is told there is a newer one", r.notice?.level, "info");
  check("The notice links to /update, not to a file", r.notice?.url, "https://blotterib.com/update");
  r = await run("current courier", req({ contacts: [contact()] }));
  check("A current courier gets no notice", r.notice, null);

  console.log("\n=== DAYS IS A CALENDAR SUBTRACTION ===");
  // 11pm yesterday to noon today is one day, not zero
  r = await run("day boundary", req({ contacts: [contact()], now: "2026-09-04T00:30:00" + TZ,
    threads: [thread([msg({ date: "2026-09-03T23:00:00" + TZ })])] }));
  check("90 minutes across midnight is 1 day", r.rows[0].days, 1);
  r = await run("same day", req({ contacts: [contact()], now: "2026-09-04T23:00:00" + TZ,
    threads: [thread([msg({ date: "2026-09-04T00:30:00" + TZ })])] }));
  check("22 hours inside one day is 0 days", r.rows[0].days, 0);



  console.log(`\n${pass} passed, ${fail} failed` + (LIVE ? "  (against the live server)" : "  (in process)"));
  if (fail) { console.log("\nFailures:\n" + failures.map((f) => "  " + f).join("\n")); process.exit(1); }
}

main();
