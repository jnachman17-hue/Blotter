import type {
  ContactIn,
  EngineRequest,
  EngineResponse,
  EventIn,
  FoundPerson,
  MessageIn,
  RowOut,
  Status,
} from "./types";

/**
 * The engine.
 *
 * Every judgment in this file is a transcription of
 * `blotter-ib-ws1/docs/workstreams/ws9-build/04-ENGINE-RULES.md`, section by
 * section, and the section numbers below are that document's. The rules are
 * ratified; where this code and that document disagree, the document wins and
 * the code is the bug.
 *
 * **Everything here is a pure function of the request.** No clock, no store,
 * no environment, no HTTP — `now` arrives in the request precisely so a test
 * can ask what was true on any day of a past season. The rules move to a
 * different host one day, and that move must be an adapter swap; a rule that
 * reached into a request object would already have broken it.
 */

/* ------------------------------------------------------------------ *
 * Addresses and dates
 * ------------------------------------------------------------------ */

/**
 * Pull the bare address out of a header value and lowercase it.
 *
 * The contract sends bare addresses, but `Name <addr>` arriving instead should
 * not break matching — and the display name, when present, is the best
 * available name for a found person. Matching ignores capitalisation
 * everywhere (§3): `Brady.flynn@` and `Brady.Flynn@` are one person and both
 * appear inside one real thread.
 */
function parseAddress(raw: string): { address: string; bare: string; display: string | null } {
  const trimmed = raw.trim();
  const angled = /^(.*?)<([^<>]+)>\s*$/.exec(trimmed);
  const bare = (angled ? angled[2] : trimmed).trim();
  const display = angled ? angled[1].trim().replace(/^"|"$/g, "").trim() : "";
  return { address: bare.toLowerCase(), bare, display: display.length > 0 ? display : null };
}

function addressOf(raw: string): string {
  return parseAddress(raw).address;
}

/**
 * The calendar date a timestamp names, in the timestamp's own timezone.
 *
 * An ISO 8601 timestamp with an offset spells its local date in its first ten
 * characters, so the courier — not the server — controls which calendar day a
 * moment belongs to, by choosing the offset it writes. The server has no
 * timezone of its own to impose, and must not invent one.
 */
function localDate(iso: string): string {
  return iso.slice(0, 10);
}

function epochOf(iso: string): number {
  return Date.parse(iso);
}

/**
 * Whole days from one timestamp's calendar date to another's.
 *
 * Calendar dates rather than 86,400-second buckets, because the sheet thinks
 * in dates: the contract pairs `last_contact: 2026-08-20` with `days: 12` on
 * September 1, which is a date subtraction, and a call tomorrow morning is
 * "1 day away" however few hours remain tonight.
 */
function daysBetween(fromIso: string, toIso: string): number {
  const from = localDate(fromIso);
  const to = localDate(toIso);
  const utc = (d: string) =>
    Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)));
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

/* ------------------------------------------------------------------ *
 * §6 — What Blotter cannot see, and must never guess
 * ------------------------------------------------------------------ */

/**
 * Bounce senders. Every real bounce in the corpus came from
 * `mailer-daemon@googlemail.com`; `postmaster` is the other conventional
 * delivery-failure sender. Nothing else is treated as a bounce source.
 */
function isBounceSender(address: string): boolean {
  const local = address.split("@")[0];
  return local === "mailer-daemon" || local === "postmaster";
}

/**
 * Addresses named in a bounce body. The bounce rule is **sender plus the
 * failed recipient named in the body** — never the `Status:` code, which the
 * real data shows lying: a Stifel bounce reported `Status: 4.4.2`, a temporary
 * class, while its SMTP response was 550 and its text read "Address not
 * found". A rule trusting `Status: 5.x` misses exactly the address the
 * student burns three attempts on.
 */
const ADDRESS_IN_TEXT = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

function failedRecipients(body: string): Set<string> {
  const found = new Set<string>();
  for (const match of body.match(ADDRESS_IN_TEXT) ?? []) {
    const address = match.toLowerCase();
    if (!isBounceSender(address)) found.add(address);
  }
  return found;
}

/**
 * An auto-reply is not a reply (§6). One real out-of-office arrived twenty
 * seconds after the outbound, from the contact's own address, and she never
 * answered; a naive rule calls that `Replied`.
 *
 * Detection is deliberately narrow — subject markers only, the forms Outlook
 * and Gmail actually stamp. Blotter marks an auto-reply where it can tell,
 * **and otherwise says nothing**: a message this misses is treated as a real
 * reply, because guessing the other way silently erases real people.
 */
const AUTO_REPLY_STARTS = [
  "automatic reply",
  "auto-reply",
  "autoreply",
  "auto reply",
  "automated reply",
  "automated response",
  "auto response",
  "out of office",
  "out of the office",
  "vacation reply",
];

function isAutoReplySubject(subject: string): boolean {
  const s = subject.trim().toLowerCase();
  return (
    AUTO_REPLY_STARTS.some((marker) => s.startsWith(marker)) ||
    s.includes("(out of office)") ||
    s.includes("automatic reply:")
  );
}

/**
 * A calendar RSVP notification is machine mail, in either direction.
 *
 * Clicking Accept on an invite is not the person writing back: it must not
 * flip a row to `Replied` and must not reset the attempts count — Mat Young
 * accepted Jon's invite minutes after Jon's last email, and the email he had
 * not answered stayed unanswered. The meeting facts these messages carry live
 * in the calendar events, which the engine already reads; the Learn phase
 * filed these under calendar notifications for the same reason.
 *
 * Subject prefixes are the forms Google Calendar and Outlook actually stamp.
 */
const CALENDAR_RSVP_STARTS = [
  "accepted:",
  "declined:",
  "tentatively accepted:",
  "tentative:",
  "invitation:",
  "updated invitation:",
  "canceled event:",
  "cancelled event:",
  "new time proposed:",
];

function isCalendarRsvpSubject(subject: string): boolean {
  const s = subject.trim().toLowerCase();
  return CALENDAR_RSVP_STARTS.some((marker) => s.startsWith(marker));
}

/* ------------------------------------------------------------------ *
 * §3 — How mail attaches to a person
 * ------------------------------------------------------------------ */

type MessageKind = "outbound" | "inbound" | "auto_reply" | "bounce" | "calendar_rsvp";

interface ClassifiedMessage {
  msg: MessageIn;
  threadIndex: number;
  order: number;
  epoch: number;
  kind: MessageKind;
  /** Every address on the message's From, To and Cc lines, lowercased. */
  participants: Set<string>;
  /** For bounces only: the failed recipients named in the body. */
  failed: Set<string>;
}

function classify(msg: MessageIn, threadIndex: number, order: number): ClassifiedMessage {
  const participants = new Set<string>();
  for (const raw of [msg.from, ...msg.to, ...msg.cc]) {
    const address = addressOf(raw);
    if (address.length > 0) participants.add(address);
  }
  const from = addressOf(msg.from);
  let kind: MessageKind;
  let failed = new Set<string>();
  if (isCalendarRsvpSubject(msg.subject)) {
    /* Checked before direction: the student's own outbound "Accepted:" is
       just as much machine mail as the banker's. */
    kind = "calendar_rsvp";
  } else if (msg.is_outbound) {
    kind = "outbound";
  } else if (isBounceSender(from)) {
    /* Machine mail from a delivery daemon is never a person writing back,
       whether or not the body names a recipient this request knows about. */
    kind = "bounce";
    failed = failedRecipients(msg.body);
  } else if (isAutoReplySubject(msg.subject)) {
    kind = "auto_reply";
  } else {
    kind = "inbound";
  }
  return { msg, threadIndex, order, epoch: epochOf(msg.date), kind, participants, failed };
}

interface ContactIndexEntry {
  contact: ContactIn;
  index: number;
  addresses: Set<string>;
  firstName: string;
}

/**
 * A calendar event matched to one contact, and whether it is off.
 *
 * `cancelled` is decided where the event is matched, because it needs the
 * student's addresses as well as the contact's: **either side declining
 * cancels the call** (§4). A third party on the invite declining cancels
 * nobody's — the call is between two people and only those two can call it
 * off.
 */
interface MatchedEvent {
  event: EventIn;
  cancelled: boolean;
}

/**
 * Everything the engine accumulates for one contact before the state is
 * decided: their attributed correspondence, their bounces, and their calendar.
 */
interface ContactActivity {
  /** Outbound and real inbound only, in time order. Machine mail excluded. */
  correspondence: ClassifiedMessage[];
  bounces: ClassifiedMessage[];
  events: MatchedEvent[];
}

/**
 * §3: a conversation belongs to a contact if any message in it carries that
 * contact's address in From, To or Cc.
 *
 * - **Exactly one contact in the conversation:** everything arriving counts as
 *   that person's side. This is what lets an assistant's reply advance the
 *   banker's row — Liz Ream really did answer for Steve McLaughlin. The
 *   student's own messages count only when addressed to the contact
 *   (Jon's ruling, September 1, 2026): forwarding Samuel Ward's reply to
 *   family inside the same thread was not writing to Samuel Ward, and must
 *   not count as an attempt at him.
 * - **Several contacts:** each person's state comes only from messages they
 *   are actually on. One person replying does not mark the other four as
 *   replied — the real "Potential favor" thread holds five relationships.
 * - **A bounce names its person in the body**, not the headers (it arrives
 *   from the daemon, addressed to the student), so in a shared thread a bounce
 *   attaches to the contact whose address failed.
 */
function attributeThread(
  classified: ClassifiedMessage[],
  contactIndex: ContactIndexEntry[],
): Map<number, ClassifiedMessage[]> {
  const involved = contactIndex.filter((entry) =>
    classified.some(
      (m) =>
        [...entry.addresses].some((a) => m.participants.has(a)) ||
        (m.kind === "bounce" && [...entry.addresses].some((a) => m.failed.has(a))),
    ),
  );

  const perContact = new Map<number, ClassifiedMessage[]>();
  if (involved.length === 0) return perContact;

  if (involved.length === 1) {
    const entry = involved[0];
    perContact.set(
      entry.index,
      classified.filter(
        (m) =>
          m.kind !== "outbound" ||
          [...entry.addresses].some((a) => m.participants.has(a)),
      ),
    );
    return perContact;
  }

  for (const entry of involved) {
    const own = classified.filter(
      (m) =>
        [...entry.addresses].some((a) => m.participants.has(a)) ||
        (m.kind === "bounce" && [...entry.addresses].some((a) => m.failed.has(a))),
    );
    perContact.set(entry.index, own);
  }
  return perContact;
}

/* ------------------------------------------------------------------ *
 * §7 — The calendar
 * ------------------------------------------------------------------ */

/**
 * Words in a firm name that identify nothing on their own. "Houlihan Lokey"
 * is recognisable from "Houlihan"; it is not recognisable from "Lokey"'s
 * neighbours "Partners" or "Group", which half the industry shares.
 */
const GENERIC_FIRM_WORDS = new Set([
  "and",
  "of",
  "the",
  "co",
  "inc",
  "llc",
  "lp",
  "llp",
  "plc",
  "group",
  "partners",
  "capital",
  "bank",
  "bankers",
  "banking",
  "investment",
  "investments",
  "securities",
  "advisors",
  "advisory",
  "advisers",
  "company",
  "management",
  "markets",
  "corp",
  "corporation",
  "holdings",
]);

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 0);
}

/**
 * Does an event title name this firm?
 *
 * Real titles abbreviate: the sheet says "J.P. Morgan" or "Houlihan Lokey"
 * while the title says `JPM` or `Houlihan`. Four tolerant tests, each grounded
 * in a real title from the 2024 season:
 *
 * 1. the whole firm name appears in order ("Morgan Stanley");
 * 2. a distinctive word of the firm appears ("Houlihan", "Intrepid", "Citi");
 * 3. the firm's initials appear as a word ("RJ" for Raymond James, "JPM" for
 *    J.P. Morgan);
 * 4. a title word of three-plus letters is a prefix of a distinctive firm
 *    word, or the reverse ("JPM" against "JPMorgan").
 */
export function firmInTitle(firm: string, title: string): boolean {
  const firmWords = words(firm);
  const titleWords = words(title);
  if (firmWords.length === 0 || titleWords.length === 0) return false;

  const titleSet = new Set(titleWords);

  for (let i = 0; i + firmWords.length <= titleWords.length; i += 1) {
    if (firmWords.every((w, j) => titleWords[i + j] === w)) return true;
  }

  const distinctive = firmWords.filter((w) => !GENERIC_FIRM_WORDS.has(w) && w.length >= 2);
  if (distinctive.some((w) => titleSet.has(w))) return true;

  if (firmWords.length >= 2) {
    const initials = firmWords.map((w) => w[0]).join("");
    if (initials.length >= 2 && initials.length <= 4 && titleSet.has(initials)) return true;
  }

  return distinctive.some((firmWord) =>
    titleWords.some(
      (titleWord) =>
        (titleWord.length >= 3 && firmWord.length > titleWord.length && firmWord.startsWith(titleWord)) ||
        (firmWord.length >= 3 && titleWord.length > firmWord.length && titleWord.startsWith(firmWord)),
    ),
  );
}

/**
 * §7: an event is matched to a person by, in order:
 *
 * 1. **an attendee's address** — covers all 27 real events that carry one;
 * 2. **first name plus firm in the title** — `Carson - Jonathan JPM IB Call`
 *    is the real pattern, and this path is the only thing that catches Owen
 *    Sherry, whose call demonstrably happened and who has no email address
 *    anywhere in the mailbox.
 *
 * Events matching neither are ignored in version one; in the real data those
 * are all firm events with no person to attribute them to (§1).
 */
function matchEvent(event: EventIn, contactIndex: ContactIndexEntry[]): number[] {
  const attendees = new Set(event.attendees.map(addressOf).filter((a) => a.length > 0));
  const byAttendee = contactIndex
    .filter((entry) => [...entry.addresses].some((a) => attendees.has(a)))
    .map((entry) => entry.index);
  if (byAttendee.length > 0) return byAttendee;

  const titleWords = new Set(words(event.title));
  return contactIndex
    .filter(
      (entry) =>
        entry.firstName.length > 0 &&
        titleWords.has(entry.firstName) &&
        firmInTitle(entry.contact.firm, event.title),
    )
    .map((entry) => entry.index);
}

/* ------------------------------------------------------------------ *
 * §4 — The states, and §5 — attempts
 * ------------------------------------------------------------------ */

interface EventTimes {
  event: EventIn;
  cancelled: boolean;
  startEpoch: number;
  endEpoch: number;
}

/**
 * Did the contact's most recent email come back undelivered?
 *
 * `Bounced` is a fact about the **last** email: three failed guesses at
 * Stifel are Bounced, but the moment the person writes back from an address
 * that works — Marijoy Bertolini did, at 21.6 days, and it produced four
 * interview rounds — the last word belongs to them and the state moves on.
 *
 * A bounce is tied to the outbound it answers by the failed recipient named
 * in its body; a bounce whose body names nothing usable still counts against
 * an outbound it directly follows in the same thread.
 */
function bounceFor(
  lastMessage: ClassifiedMessage,
  bounces: ClassifiedMessage[],
): ClassifiedMessage | null {
  if (lastMessage.kind !== "outbound") return null;
  const sentTo = new Set(
    [...lastMessage.msg.to, ...lastMessage.msg.cc].map(addressOf).filter((a) => a.length > 0),
  );
  let match: ClassifiedMessage | null = null;
  for (const bounce of bounces) {
    if (bounce.epoch < lastMessage.epoch) continue;
    const named = [...bounce.failed].some((a) => sentTo.has(a));
    const adjacent = bounce.failed.size === 0 && bounce.threadIndex === lastMessage.threadIndex;
    if (named || adjacent) {
      if (match === null || bounce.epoch > match.epoch) match = bounce;
    }
  }
  return match;
}

/**
 * One contact's row, per §4.
 *
 * `Closed` is the student's ruling and beats everything (§9, §10). After
 * that, the ratified precedence for states simultaneously true:
 *
 *     Bounced  >  Call scheduled  >  Call done | Call cancelled  >  Replied / Sent
 *
 * `Call done` and `Call cancelled` cannot both apply: the most recent call
 * either happened or was called off.
 *
 * There is deliberately no day threshold anywhere in here, for any purpose.
 * Real replies came back at 6.8, 11, 13.2 and 21.6 days, and the 21.6-day one
 * turned into four interview rounds; any threshold would be wrong for
 * someone, so none is picked. The row shows what is true and how long it has
 * been true, and the student decides.
 *
 * `Call done` holds until somebody writes, which is how a thank-you gets
 * tracked without a state for it: the moment the student sends the note they
 * are the last one who spoke, and the row becomes `Sent` on its own.
 * **`Call cancelled` clears itself the same way, and that is the point** —
 * without it, a declined invite would be a dead end nothing ever removes.
 *
 * `Days` is the one number that means the same thing in every state: how long
 * since the last thing that actually happened. `Call done` counts from the
 * call, because a call that happened is one of those things. A cancelled call
 * is not, so it counts from the last email instead.
 *
 * A `Closed` row keeps everything else it knows (§4): `last_contact`,
 * `attempts` and both call dates are still computed and returned. Only the
 * clock is dropped. You closed the relationship, you did not delete it, and a
 * row of empty cells reads as broken.
 */
function computeRow(contact: ContactIn, activity: ContactActivity, now: string): RowOut {
  const nowEpoch = epochOf(now);
  const correspondence = activity.correspondence;
  const last = correspondence.length > 0 ? correspondence[correspondence.length - 1] : null;
  const lastInbound = [...correspondence].reverse().find((m) => m.kind === "inbound") ?? null;

  /* §5 — attempts: how many times the student has written since the contact
     last wrote back. A first email and a third are not the same situation and
     no state can tell them apart. Bounced sends count: the real student burned
     three attempts on addresses that did not exist. Auto-replies and calendar
     RSVPs do not reset the count, because a machine answering is not the
     contact writing back. */
  const attempts = correspondence.filter(
    (m) => m.kind === "outbound" && (lastInbound === null || m.epoch > lastInbound.epoch),
  ).length;

  const lastContact = last === null ? null : localDate(last.msg.date);

  const times: EventTimes[] = activity.events.map((matched) => ({
    event: matched.event,
    cancelled: matched.cancelled,
    startEpoch: epochOf(matched.event.start),
    endEpoch: epochOf(matched.event.end),
  }));

  /* A declined call is not on the calendar in any sense that matters: it is
     not upcoming, it did not happen, and it is neither `Next call` nor
     `Last call`. It has its own state (§4) and nothing else. */
  const live = times.filter((t) => !t.cancelled);

  /* §4: **a call counts as done the moment it starts.** At 2:01pm on a 2:00
     to 2:30 call the row reads `Call done`, not `Call scheduled` — ruled by
     Jon, September 2, 2026, replacing the earlier convention that waited for
     the end time. The boundary is the start on both sides of this pair, and
     "nobody has written since" is measured from the start too: a thank-you
     sent while the call is still nominally running is still the student
     speaking last, and under the old end-time anchor it could never clear
     the row at all. */
  const upcoming = live
    .filter((t) => t.startEpoch > nowEpoch)
    .sort((a, b) => a.startEpoch - b.startEpoch)[0];
  const lastPast = live
    .filter((t) => t.startEpoch <= nowEpoch)
    .sort((a, b) => b.startEpoch - a.startEpoch)[0];

  /* The most recent call that was called off, whenever it was due. A call
     declined in advance counts from the moment the engine can see the
     decline: the meeting is not happening, and saying so is the whole reason
     this state exists. */
  const lastCancelled = times
    .filter((t) => t.cancelled)
    .sort((a, b) => b.startEpoch - a.startEpoch)[0];

  /* §4, ruled by Jon on September 2, 2026: **the last thing that actually
     happened** — an email in either direction, or a call that took place.

     A cancelled call is a non-event. It does not anchor this clock, does not
     reset it and does not touch it; the only thing a decline changes is the
     status. That is what keeps `Days` meaning one thing everywhere: "how long
     since anybody actually did anything", which on a live relationship is the
     number that tells you whether to bump the thread.

     `null` when nothing has ever happened — a contact whose only calendar
     event was declined and who has never exchanged a message really has no
     clock, and a dash says so honestly. */
  const lastRealActivity =
    last !== null && (lastPast === undefined || last.epoch >= lastPast.startEpoch)
      ? last.msg.date
      : lastPast !== undefined
        ? lastPast.event.start
        : null;

  const nextCall = upcoming === undefined ? null : upcoming.event.start;
  /* `Last call` keeps its date permanently in its own column regardless of
     state (§4) — dated by the day the call was on. A declined call never
     happened, so it is never `Last call`. */
  const lastCall = lastPast === undefined ? null : localDate(lastPast.event.start);

  let status: Status;
  let days: number | null;

  const bounce = last === null ? null : bounceFor(last, activity.bounces);

  if (contact.closed) {
    status = "Closed";
    days = null;
  } else if (bounce !== null) {
    status = "Bounced";
    days = daysBetween(bounce.msg.date, now);
  } else if (upcoming !== undefined) {
    status = "Call scheduled";
    days = Math.max(0, daysBetween(now, upcoming.event.start));
  } else if (
    lastCancelled !== undefined &&
    lastCancelled.startEpoch >= (lastPast?.startEpoch ?? -Infinity) &&
    !correspondence.some((m) => m.epoch > lastCancelled.startEpoch)
  ) {
    /* §4: the most recent call was declined by either side, and nobody has
       written since. The clock is days since the last thing that actually
       happened — never since the call that did not, which is why no clamp is
       needed here: the anchor is always in the past.

       So this reads exactly the number `Sent` or `Replied` would read for the
       same contact, and it can be large. A decline landing thirty days after
       the last email shows 30, and that is the useful fact: thirty days since
       anybody communicated, and now the call is off too. */
    status = "Call cancelled";
    days = lastRealActivity === null ? null : daysBetween(lastRealActivity, now);
  } else if (
    lastPast !== undefined &&
    !correspondence.some((m) => m.epoch > lastPast.startEpoch)
  ) {
    status = "Call done";
    days = daysBetween(lastPast.event.start, now);
  } else if (last !== null) {
    status = last.kind === "outbound" ? "Sent" : "Replied";
    days = daysBetween(last.msg.date, now);
  } else {
    status = "Not emailed";
    days = null;
  }

  return {
    row: contact.row,
    status,
    days,
    last_contact: lastContact,
    attempts,
    next_call: nextCall,
    last_call: lastCall,
  };
}

/* ------------------------------------------------------------------ *
 * §8 — Referrals: the "found these" area
 * ------------------------------------------------------------------ */

/**
 * Never suggested at all (§8): bounce senders, no-reply addresses, the
 * student's own addresses, calendar notification senders, anything already in
 * the sheet under any capitalisation — plus everything the student has
 * already rejected, which the courier sends as `ignored`.
 */
const NO_REPLY_LOCAL = /^(?:no[-._]?reply|do[-._]?not[-._]?reply)/;

function isCalendarNotificationSender(address: string): boolean {
  const domain = address.split("@")[1] ?? "";
  return (
    address === "calendar-notification@google.com" ||
    domain === "calendar.google.com" ||
    domain.endsWith(".calendar.google.com") ||
    domain.endsWith("calendar-server.bounces.google.com")
  );
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/* ------------------------------------------------------------------ *
 * The engine
 * ------------------------------------------------------------------ */

/**
 * Warnings are for a person to read, so each kind is capped. A live courier
 * sends the student's whole calendar, and on the first real run the engine
 * answered with one warning per non-recruiting event — thousands of lines,
 * which no student reads and which overflowed the 50,000-character sheet
 * cell the courier writes them into. Ten examples and an honest count carry
 * everything the full list did.
 */
const WARNINGS_SHOWN_PER_KIND = 10;

class WarningBucket {
  private readonly lines: string[] = [];
  private overflow = 0;
  constructor(private readonly summary: string) {}

  add(line: string): void {
    if (this.lines.length < WARNINGS_SHOWN_PER_KIND) this.lines.push(line);
    else this.overflow += 1;
  }

  drainInto(warnings: string[]): void {
    warnings.push(...this.lines);
    if (this.overflow > 0) warnings.push(`…and ${this.overflow} more ${this.summary}.`);
  }
}

export function computeEngine(request: EngineRequest): EngineResponse {
  const unmatchedThreads = new WarningBucket("threads that matched no contact and were ignored");
  const autoReplies = new WarningBucket("messages treated as automatic replies, not replies");
  const unmatchedEvents = new WarningBucket("calendar events that matched no contact and were ignored");
  const caseVariants = new WarningBucket("addresses seen in more than one capitalisation");

  const studentAddresses = new Set(
    request.student.addresses.map(addressOf).filter((a) => a.length > 0),
  );
  const ignored = new Set(request.ignored.map(addressOf).filter((a) => a.length > 0));

  const contactIndex: ContactIndexEntry[] = request.contacts.map((contact, index) => ({
    contact,
    index,
    addresses: new Set(contact.emails.map(addressOf).filter((a) => a.length > 0)),
    firstName: words(contact.name)[0] ?? "",
  }));
  const contactAddresses = new Set(contactIndex.flatMap((e) => [...e.addresses]));

  const activities: ContactActivity[] = request.contacts.map(() => ({
    correspondence: [],
    bounces: [],
    events: [],
  }));

  /* Every raw spelling seen for each address, for the capitalisation warning
     the contract calls out — `Brady.flynn@` and `Brady.Flynn@` inside one
     real thread would split a person in two under case-sensitive matching. */
  const spellings = new Map<string, Set<string>>();
  const noteSpelling = (raw: string) => {
    const { address, bare } = parseAddress(raw);
    if (address.length === 0) return;
    const seen = spellings.get(address) ?? new Set<string>();
    seen.add(bare);
    spellings.set(address, seen);
  };

  const found = new Map<string, { epoch: number; person: FoundPerson }>();

  let order = 0;
  request.threads.forEach((thread, threadIndex) => {
    const classified = thread.messages.map((msg) => {
      for (const raw of [msg.from, ...msg.to, ...msg.cc]) noteSpelling(raw);
      order += 1;
      return classify(msg, threadIndex, order);
    });

    const attribution = attributeThread(classified, contactIndex);

    if (attribution.size === 0) {
      const subject = thread.messages[0]?.subject ?? thread.thread_id;
      unmatchedThreads.add(`A thread ("${subject}") matched no contact and was ignored.`);
      return;
    }

    const attributed = new Set<number>();
    for (const [index, messages] of attribution) {
      const activity = activities[index];
      for (const m of messages) {
        attributed.add(m.order);
        if (m.kind === "outbound" || m.kind === "inbound") activity.correspondence.push(m);
        if (m.kind === "bounce") activity.bounces.push(m);
      }
    }

    /* One warning per auto-reply, however many relationships the message is
       on — this is the engine "marking" it, per §6. */
    for (const m of classified) {
      if (m.kind === "auto_reply" && attributed.has(m.order)) {
        autoReplies.add(
          `"${m.msg.subject}" from ${addressOf(m.msg.from)} looks like an automatic reply and was not counted as a reply.`,
        );
      }
    }

    /* §8 — a new address appearing in a conversation that belongs to a
       contact. **Headers only. Blotter never reads an email's text looking
       for people** — ruled by Jon, September 2, 2026 (D15), and now explicit
       in §8. Micah Poag really did give three referral addresses inside a
       message body and those are genuinely lost; the trade is deliberate,
       because every signature, legal disclaimer and quoted footer in a
       mailbox is full of addresses and mining them would bury the real
       suggestions. Bodies are read for bounce and auto-reply detection and
       for nothing else, anywhere in this file. */
    const threadContactNames = [...attribution.keys()]
      .sort((a, b) => a - b)
      .map((i) => request.contacts[i].name);
    const context = `Appeared in a thread with ${joinNames(threadContactNames)}`;

    for (const m of classified) {
      if (m.kind === "bounce") continue;
      for (const raw of [m.msg.from, ...m.msg.to, ...m.msg.cc]) {
        const { address, bare, display } = parseAddress(raw);
        if (address.length === 0) continue;
        if (studentAddresses.has(address) || contactAddresses.has(address)) continue;
        if (ignored.has(address)) continue;
        if (isBounceSender(address)) continue;
        if (NO_REPLY_LOCAL.test(address.split("@")[0])) continue;
        if (isCalendarNotificationSender(address)) continue;
        const existing = found.get(address);
        if (existing !== undefined && existing.epoch <= m.epoch) continue;
        found.set(address, {
          epoch: m.epoch,
          person: {
            /* §8, ruled September 2, 2026 (D4): **a real name or nothing.**
               The name is the one the header carried, and `null` when the
               header carried none. Deriving one from the address turns
               `Boone2002@att.net` into "Boone2002", which is garbage in a
               student's tracker — a blank cell they fill in themselves is
               better than a confident invention. */
            email: bare,
            name: display,
            first_seen: localDate(m.msg.date),
            context,
          },
        });
      }
    }
  });

  /* Attribution collects per thread; a contact's timeline spans threads, so
     re-sort each contact's activity once, globally, by time. */
  for (const activity of activities) {
    activity.correspondence.sort((a, b) => a.epoch - b.epoch || a.order - b.order);
    activity.bounces.sort((a, b) => a.epoch - b.epoch || a.order - b.order);
  }

  for (const event of request.events) {
    const matched = matchEvent(event, contactIndex);
    if (matched.length === 0) {
      unmatchedEvents.add(
        `Calendar event "${event.title}" (${localDate(event.start)}) matched no contact and was ignored.`,
      );
      continue;
    }
    /* §4: **either side declining cancels the call** — the student or the
       counterparty. Decided here rather than in `computeRow` because it needs
       the student's addresses as well as the contact's. A third party on the
       invite declining cancels nobody's call: the meeting is between two
       people and only those two can call it off. */
    const declined = new Set(event.declined.map(addressOf).filter((a) => a.length > 0));
    const studentDeclined = [...studentAddresses].some((a) => declined.has(a));
    for (const index of matched) {
      const cancelled =
        declined.size > 0 &&
        (studentDeclined || [...contactIndex[index].addresses].some((a) => declined.has(a)));
      activities[index].events.push({ event, cancelled });
    }
  }

  for (const [address, seen] of [...spellings].sort(([a], [b]) => (a < b ? -1 : 1))) {
    if (seen.size > 1) {
      caseVariants.add(
        `${address} appears in more than one capitalisation (${[...seen].sort().join(", ")}); treated as one address.`,
      );
    }
  }

  const warnings: string[] = [];
  unmatchedThreads.drainInto(warnings);
  autoReplies.drainInto(warnings);
  unmatchedEvents.drainInto(warnings);
  caseVariants.drainInto(warnings);

  /* Every contact in the request gets exactly one row back, in the same
     order. Silently dropping a contact is forbidden — a missing row is a
     blank line in someone's tracker with no explanation. */
  const rows = request.contacts.map((contact, index) =>
    computeRow(contact, activities[index], request.now),
  );

  const foundList = [...found.values()]
    .map((entry) => entry.person)
    .sort((a, b) => a.first_seen.localeCompare(b.first_seen) || a.email.localeCompare(b.email));

  /* The response answers in the version it was asked in (contract v2). That
     is what lets a version-1 courier keep working against this server while
     its own half of the world catches up. */
  return { version: request.version, rows, found: foundList, warnings };
}
