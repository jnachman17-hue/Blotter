#!/usr/bin/env python3
"""Build the WS9 engine test fixtures from the Learn-phase corpus.

Written by the Test-cases chat (brief: docs/workstreams/ws9-build/07-BRIEF-TEST-CASES.md).

DIVISION OF LABOUR — read this before trusting anything below.

  This script makes NO judgment about what the right answer is. Every status,
  every clock anchor, every attempts count and every "found" entry was worked
  out BY HAND from the corpus against 04-ENGINE-RULES.md, and lives here as
  data (SEASON_ANSWERS, CASES, SEASON_FOUND). The script only:

    1. converts corpus threads/events into the request shape in 05-CONTRACT.md,
    2. truncates them to what existed at each fixture's `now`,
    3. turns hand-chosen anchors into whole-day counts (floor arithmetic only),
    4. validates that every hand-written anchor actually exists in the corpus,
       so a transcription slip fails loudly instead of becoming a wrong answer.

  If this script computed states itself it would be a second engine, and the
  answer key would just be an echo of my assumptions. It does not.

  The reasoning behind every expected value is in
  docs/workstreams/ws9-build/10-TEST-CASE-NOTES.md, with rule citations.

CONVENTIONS — updated for rules v3 (round 2, brief 12-BRIEF-TEST-CASES-2.md):
  - days       = subtraction of calendar dates in the student's timezone
                 (America/Chicago). RULED, §4 v3: "a day turns at midnight in
                 the student's timezone", and a call tomorrow morning is 1.
  - timestamps = every request timestamp carries the student's own offset
                 (-06:00 CST / -05:00 CDT across the 2024-03-10 DST change),
                 per §4 v3's courier obligation. The corpus stores messages in
                 UTC and calendar strings in the capture session's Pacific
                 rendering; instants are preserved exactly, rendering changes.
  - date cells = the America/Chicago calendar date of the instant.
  - RSVP mail  = `Accepted:` / `Declined:` / `Invitation:` / `Updated
                 invitation:` / `New time proposed:` etc. are machine mail —
                 never a reply, never an attempt, never last_contact.
                 RULED, §6 v3 (the fixtures' round-1 reading, ratified).
  Still provisional (flagged in 10-TEST-CASE-NOTES.md §3):
  - next_call  = the matched upcoming event's `start` string as sent in the
                 request.
  - a Closed row keeps its factual columns; only `days` is null (rules §4).

Run from the repo root:
    python3 blotter-ib-ws1/research/scripts/build_fixtures.py
Writes into web/app/api/engine/__fixtures__/ (the one directory this chat owns).
"""

import json
import os
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

STUDENT_TZ = ZoneInfo("America/Chicago")

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
CORPUS = os.path.join(ROOT, "blotter-ib-ws1", "research", "corpus")
OUT = os.path.join(ROOT, "web", "app", "api", "engine", "__fixtures__")

STUDENT_ADDRESSES = ["jnachman17@gmail.com", "jnachman@utexas.edu"]
STUDENT_SET = {a.lower() for a in STUDENT_ADDRESSES}


# ---------------------------------------------------------------- corpus load

def load_corpus():
    with open(os.path.join(CORPUS, "index.json")) as f:
        index = json.load(f)
    records = {}
    for rec in index["records"]:
        with open(os.path.join(CORPUS, rec["file"].replace("contacts/", "contacts" + os.sep))) as f:
            records[rec["slug"]] = json.load(f)
    with open(os.path.join(CORPUS, "calendar.json")) as f:
        calendar = json.load(f)
    return index, records, calendar["events"]


def canonical_threads(records):
    """One canonical thread per thread_id across all contact files.

    The same thread appears in several files (the corpus is organised by
    contact; the contract is organised by conversation). Dedupe messages by
    message_id; where the same message was captured twice, keep the richer
    body. Assert the two captures agree on date/sender so a corpus
    inconsistency cannot slip through silently.
    """
    threads = {}
    for rec in records.values():
        for t in rec.get("threads", []):
            ct = threads.setdefault(t["thread_id"], {})
            for m in t.get("messages", []):
                mid = m["message_id"]
                if mid in ct:
                    old = ct[mid]
                    assert old["date"] == m["date"], f"date clash on {mid}"
                    assert old["sender"] == m["sender"], f"sender clash on {mid}"
                    if len(m.get("body") or "") > len(old.get("body") or ""):
                        ct[mid] = m
                else:
                    ct[mid] = m
    return {
        tid: sorted(msgs.values(), key=lambda m: (m["date"], m["message_id"]))
        for tid, msgs in threads.items()
    }


# ------------------------------------------------------------------- helpers

def parse_iso(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def student_date(s):
    """The calendar date of an instant where the student is (rules §4 v3)."""
    return parse_iso(s).astimezone(STUDENT_TZ).date().isoformat()


def student_render(s):
    """Re-render an instant with the student's own offset (rules §4 v3: this
    binds the courier). The instant is unchanged; only the rendering moves."""
    return parse_iso(s).astimezone(STUDENT_TZ).isoformat()


def date_diff(a, b):
    """Whole days from a to b as a subtraction of the student's calendar
    dates — not elapsed hours (rules §4 v3, ruled by Jon)."""
    da, db = parse_iso(a).astimezone(STUDENT_TZ).date(), parse_iso(b).astimezone(STUDENT_TZ).date()
    days = (db - da).days
    assert days >= 0, f"negative interval {a} .. {b}"
    return days


def msg_addresses(m):
    addrs = [m["sender"]] + list(m.get("to") or []) + list(m.get("cc") or [])
    return {a.lower() for a in addrs if a}


def convert_message(m):
    sender = m["sender"]
    is_out = m["direction"] == "outbound"
    # The corpus takes direction from Gmail's own SENT label; the contract has
    # the courier set is_outbound from the sender. Assert they agree.
    assert is_out == (sender.lower() in STUDENT_SET), f"direction mismatch on {m['message_id']} ({sender})"
    return {
        "id": m["message_id"],
        "date": student_render(m["date"]),
        "from": sender,
        "to": list(m.get("to") or []),
        "cc": list(m.get("cc") or []),
        "subject": m.get("subject") or "",
        "body": m.get("body") or "",
        "is_outbound": is_out,
    }


def convert_event(e):
    # The corpus stores start/end as the capture session rendered them
    # (Pacific offsets); the events' own `timezone` fields say
    # America/Chicago for Jon's calendar. Instants are exact either way —
    # re-render with the student's offset per §4 v3, and assert the
    # calendar DATE never moves in the process.
    assert student_date(e["start"]) == e["start"][:10], \
        f"event {e['event_id'][:12]} date shifts under America/Chicago"
    return {
        "id": e["event_id"],
        "title": e["summary"],
        "start": student_render(e["start"]),
        "end": student_render(e["end"]),
        "attendees": [a["email"] for a in e.get("attendees", [])],
        "organizer": e.get("organizer"),
    }


def courier_threads(threads, roster_emails, now):
    """What the courier sends: every conversation that (as of `now`) contains a
    tracked address in From/To/Cc of any message, with all its messages up to
    `now`. Rules §2 and §3."""
    roster = {a.lower() for a in roster_emails}
    now_i = parse_iso(now)
    out = []
    for tid in sorted(threads):
        msgs = [m for m in threads[tid] if parse_iso(m["date"]) <= now_i]
        if not msgs:
            continue
        if not any(msg_addresses(m) & roster for m in msgs):
            continue
        out.append({"thread_id": tid, "messages": [convert_message(m) for m in msgs]})
    return out


def dedupe_addresses_keep_first_casing(addresses):
    seen, out = set(), []
    for a in addresses:
        if a.lower() not in seen:
            seen.add(a.lower())
            out.append(a)
    return out


# ------------------------------------------------------- hand-authored tables
#
# Everything below this line is the answer key proper: hand-derived from the
# corpus against 04-ENGINE-RULES.md. See 10-TEST-CASE-NOTES.md for the
# reasoning behind every line, case by case, with rule citations.
#
# Row tuple: (status, days_anchor, last_contact, attempts, next_call, last_call)
#   status       one of the seven contract statuses
#   days_anchor  ISO message timestamp, or ("event", n) for event #n's start,
#                or None (no clock: Not emailed / Closed)
#   last_contact "YYYY-MM-DD" or None
#   attempts     int
#   next_call    ("event", n) or None  -> rendered as that event's start string
#   last_call    ("event", n) or None  -> rendered as that event's UTC date

NOW = {
    "jan": "2024-01-25T18:00:00Z",
    "feb": "2024-02-15T18:00:00Z",
    "mar": "2024-03-15T18:00:00Z",
    "apr": "2024-04-30T18:00:00Z",
}
DATES = ["jan", "feb", "mar", "apr"]

E = lambda n: ("event", n)  # noqa: E731  (event #n, 1-based position in calendar.json)

NE = ("Not emailed", None, None, 0, None, None)


def S(anchor, lc, att, last_call=None):
    return ("Sent", anchor, lc, att, None, last_call)


def R(anchor, lc, att, last_call=None):
    return ("Replied", anchor, lc, att, None, last_call)


def B(anchor, lc, att):
    return ("Bounced", anchor, lc, att, None, None)


def CS(event, lc, att, last_call=None):
    return ("Call scheduled", event, lc, att, event, last_call)


def CD(event, lc, att):
    return ("Call done", event, lc, att, None, event)


def same(entry):
    return {d: entry for d in DATES}


def arc(jan, feb, mar=None, apr=None):
    mar = mar if mar is not None else feb
    apr = apr if apr is not None else mar
    return {"jan": jan, "feb": feb, "mar": mar, "apr": apr}


SEASON_ANSWERS = {
    # -- January cold emails, never answered: Sent, clock since the last send.
    "micah-poag":            same(S("2024-01-17T22:18:18Z", "2024-01-17", 1)),
    "barbara-barman":        same(S("2024-01-17T06:07:17Z", "2024-01-17", 1)),
    "olivia-henderson":      same(S("2024-01-17T06:13:17Z", "2024-01-17", 1)),
    "anna-giesler":          same(S("2024-01-17T06:18:11Z", "2024-01-17", 1)),
    "quincy-steele":         same(S("2024-01-17T06:24:04Z", "2024-01-17", 1)),
    "alice-watts":           same(S("2024-01-17T06:30:15Z", "2024-01-17", 1)),
    "noble-nash":            same(S("2024-01-17T06:35:02Z", "2024-01-17", 1)),
    "victoria-daly":         same(S("2024-01-17T06:44:07Z", "2024-01-17", 1)),
    "sam-susser":            same(S("2024-01-17T18:37:30Z", "2024-01-17", 1)),
    "luke-skelly":           same(S("2024-01-17T23:22:47Z", "2024-01-17", 1)),
    "nicholas-perez":        same(S("2024-01-17T23:28:26Z", "2024-01-17", 1)),
    "keaton-cruzcosa":       same(S("2024-01-20T00:25:17Z", "2024-01-19", 1)),
    # -- cold emails bumped once, never answered: attempts climbs to 2.
    "kathryn-dzierzanowski": arc(S("2024-01-17T06:56:32Z", "2024-01-17", 1),
                                 S("2024-01-31T05:35:30Z", "2024-01-30", 2)),
    "ryan-wheeler":          same(S("2024-01-20T00:15:08Z", "2024-01-19", 2)),
    "michael-liou":          arc(S("2024-01-17T23:33:05Z", "2024-01-17", 1),
                                 S("2024-01-31T05:37:36Z", "2024-01-30", 2)),
    "turner-gauntt":         arc(S("2024-01-19T02:58:58Z", "2024-01-18", 1),
                                 S("2024-01-31T05:33:04Z", "2024-01-30", 2)),
    "mike-giaquinto":        arc(S("2024-01-18T04:01:01Z", "2024-01-17", 1),
                                 S("2024-01-18T04:01:01Z", "2024-01-17", 1),
                                 S("2024-02-26T03:03:53Z", "2024-02-25", 2)),
    # -- sent after 25 Jan: Not emailed at the peak date, Sent afterwards.
    "kyle-gunnison":         arc(NE, S("2024-01-31T05:27:15Z", "2024-01-30", 1)),
    "kammeh-valliani":       arc(NE, S("2024-01-31T05:43:23Z", "2024-01-30", 1)),
    # -- the auto-reply trap: her out-of-office is not a reply (rules §6).
    "jessica-luft":          same(S("2024-01-19T23:44:46Z", "2024-01-19", 1)),
    # -- live relationships, one per shape.
    "joseph-candelario":     same(R("2024-01-22T00:56:11Z", "2024-01-21", 0, E(1))),
    "kate-borden":           arc(R("2024-01-23T17:51:06Z", "2024-01-23", 0, E(4)),
                                 R("2024-02-08T23:08:23Z", "2024-02-08", 0, E(4))),
    "sam-ward":              same(S("2024-01-23T05:01:39Z", "2024-01-22", 2)),
    "joshua-gumm":           same(S("2024-01-22T21:27:22Z", "2024-01-22", 1, E(2))),
    "chris-miller":          same(R("2024-01-22T23:49:06Z", "2024-01-22", 0)),
    "grey-bianca":           same(R("2024-01-23T02:47:46Z", "2024-01-22", 0)),
    "carrie-cruces":         same(S("2024-01-22T21:02:37Z", "2024-01-22", 1, E(3))),
    "carson-harris":         same(S("2024-01-24T06:04:37Z", "2024-01-24", 1, E(7))),
    "john-sellingsloh":      same(S("2024-01-20T18:37:54Z", "2024-01-20", 1)),
    "gary-horton":           same(S("2024-01-23T19:52:01Z", "2024-01-23", 2, E(6))),
    "nick-gerstein":         arc(CS(E(11), "2024-01-21", 1),
                                 S("2024-01-26T23:03:24Z", "2024-01-26", 3, E(11))),
    "will-robinson":         arc(CS(E(9), "2024-01-22", 0),
                                 S("2024-01-25T20:15:58Z", "2024-01-25", 1, E(9))),
    "david-talbot":          arc(CD(E(8), "2024-01-22", 0),
                                 R("2024-01-26T01:20:56Z", "2024-01-25", 0, E(8))),
    "grant-gillespie":       arc(CS(E(10), "2024-01-22", 1),
                                 S("2024-01-26T01:15:14Z", "2024-01-25", 2, E(10))),
    "mathew-young":          arc(CS(E(13), "2024-01-22", 1),
                                 S("2024-01-26T22:54:45Z", "2024-01-26", 2, E(13))),
    "kevin-stephens":        arc(CS(E(16), "2024-01-22", 1),
                                 S("2024-01-30T20:06:22Z", "2024-01-30", 1, E(16))),
    "ethan-marnhout":        arc(S("2024-01-24T01:13:07Z", "2024-01-23", 1),
                                 S("2024-02-06T14:29:53Z", "2024-02-06", 1, E(18))),
    "danny-shin":            arc(S("2024-01-24T01:26:38Z", "2024-01-23", 1),
                                 S("2024-01-30T00:10:21Z", "2024-01-29", 2, E(14))),
    "matt-manriquez":        arc(NE, S("2024-01-30T23:38:58Z", "2024-01-30", 1, E(15))),
    # -- the "Potential favor" thread: four tracked people, one conversation.
    "douglas-melsheimer":    arc(CS(E(12), "2024-01-17", 0),
                                 S("2024-01-30T20:55:56Z", "2024-01-30", 1, E(12))),
    "kleopatra-kirkland":    same(R("2024-01-17T17:19:15Z", "2024-01-17", 0)),
    "grace-steelman":        arc(NE, S("2024-02-09T18:41:45Z", "2024-02-09", 1, E(22))),
    "jay-klein":             arc(NE, S("2024-02-01T02:24:13Z", "2024-01-31", 1)),
    # -- inbound-only contacts: they wrote, Jon never answered in mail.
    "maura-vestal":          arc(NE, R("2024-01-29T20:16:09Z", "2024-01-29", 0)),
    "lynell-velten":         arc(NE, R("2024-01-30T20:21:08Z", "2024-01-30", 0)),
    "sara-laracca":          arc(NE, R("2024-02-01T23:33:45Z", "2024-02-01", 0)),
    "gayathri-ravi":         arc(NE, R("2024-02-12T10:30:47Z", "2024-02-12", 0)),
    # -- the bounce cases.
    "sean-kang":             arc(NE, B("2024-01-31T05:19:10Z", "2024-01-30", 3)),
    "marijoy-bertolini":     arc(NE,
                                 B("2024-02-08T04:40:27Z", "2024-02-07", 2),
                                 R("2024-02-29T22:06:02Z", "2024-02-29", 0),
                                 R("2024-03-26T13:03:10Z", "2024-03-26", 0)),
    # -- Aeris: the long arc, interviews attached by attendee (rules §7).
    "paige-butters":         arc(NE,
                                 S("2024-02-09T18:46:52Z", "2024-02-09", 1),
                                 CS(E(28), "2024-03-11", 0, E(27)),
                                 R("2024-03-26T15:04:32Z", "2024-03-26", 0, E(28))),
    # -- Lonnie: her one real message was captured with an empty To line, so as
    #    recorded it belongs to no conversation of hers. Corpus gap, flagged.
    "lonnie-kauppila":       same(NE),
    # -- Steve McLaughlin: the assistant-advances-the-row case, then the
    #    thank-you clearing Call done by itself (rules §3, §4).
    "steve-mclaughlin":      arc(NE,
                                 R("2024-02-15T04:11:13Z", "2024-02-14", 0),
                                 R("2024-02-20T02:58:20Z", "2024-02-19", 0, E(25))),
    "elliot-calkins":        arc(NE, NE, S("2024-03-13T22:27:18Z", "2024-03-13", 1)),
    # -- April relationships.
    "emily-saunders":        arc(NE, NE, NE, R("2024-04-09T14:40:31Z", "2024-04-09", 0)),
    "ben-dziedzic":          arc(NE, NE, NE, S("2024-04-11T17:06:37Z", "2024-04-11", 1)),
    "bradley-cagle":         arc(NE, NE, NE, S("2024-04-18T18:09:07Z", "2024-04-18", 1)),
    "sean-hussey":           arc(NE, NE, NE, R("2024-04-19T01:35:36Z", "2024-04-18", 0)),
    # -- Owen Sherry: no email address anywhere; reachable only through the
    #    event title (rules §7 rule 2). Call done with no mail is not an error.
    "owen-sherry":           arc(NE, CD(E(19), None, 0)),
    # -- the nine firm-process records: version one does not track firms
    #    (rules §1), their rows carry no address, so nothing ever attaches.
    "piper-sandler-ats":     same(NE),
    "houlihan-rx-process":   same(NE),
    "ft-partners-process":   same(NE),
    "wells-fargo-process":   same(NE),
    "agc-partners":          same(NE),
    "bofa-process":          same(NE),
    "barclays-process":      same(NE),
    "citi-process":          same(NE),
    "union-square":          same(NE),
}

# Season "found" (rules §8): every new address that appears in a conversation
# belonging to a tracked contact, minus the exclusions (bounce senders,
# no-reply, the student's own addresses, calendar-notification senders,
# anything already in the sheet under any capitalisation).
# (email, first_seen, context) — context is advisory prose; name is null
# because the contract's request carries bare addresses (flagged, notes §3).
SEASON_FOUND = [
    ("dnachman@fastspring.com",              "2024-01-17", "Appeared in a thread with Douglas Melsheimer"),
    ("andrew.nachman@wisc.edu",              "2024-01-17", "Appeared in a thread with Kleopatra Kirkland"),
    ("dmnachman@gmail.com",                  "2024-01-18", "Appeared in a thread with Chris Miller"),
    ("Bemis@intrepidfp.com",                 "2024-01-19", "Appeared in a thread with John Sellingsloh"),
    ("cook@intrepidfp.com",                  "2024-01-19", "Appeared in a thread with John Sellingsloh"),
    ("Andersen@intrepidfp.com",              "2024-01-19", "Appeared in a thread with John Sellingsloh"),
    ("FRCampusRecruiting@hl.com",            "2024-01-22", "Appeared in a thread with Samuel Ward"),
    ("careers@aerispartners.com",            "2024-02-07", "Appeared in a thread with Paige Butters"),
    ("gs-hcm-recruiting-coo@ny.email.gs.com","2024-02-10", "Appeared in a thread with Gayathri Ravi"),
    ("liz.ream@ftpartners.com",              "2024-02-13", "Appeared in a thread with Steve McLaughlin"),
]


def season_found(now):
    cutoff = now[:10]
    return [f for f in SEASON_FOUND if f[1] <= cutoff]


# ------------------------------------------------------------- case fixtures
#
# Each case: a focused roster (real corpus people; the two shared-mailbox rows
# and Brady Flynn are rows a student would keep, built from real addresses),
# the threads the courier would fetch for that roster, the named events, and
# hand-derived expected rows. "constructed" marks the two departures from
# pure corpus data allowed/flagged under brief §5: the Closed flag, and one
# ignored-list entry. Everything else is the 2024 season verbatim.

CASES = [
    {
        "id": "01-jessica-luft-autoreply",
        "why": "An out-of-office 20 seconds after the outreach, from her own address, in a separate Gmail thread. Not a reply (rules §6): the row stays Sent.",
        "roster": [("jessica-luft", None)],
        "events": [],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"jessica-luft": SEASON_ANSWERS["jessica-luft"]["feb"]},
                           "found": []},
        },
    },
    {
        "id": "02-sean-kang-bounces",
        "why": "Three guessed addresses, three bounces, one of them reporting Status: 4.4.2 while meaning a dead address. Bounced, attempts 3 (rules §4, §5).",
        "roster": [("sean-kang", None)],
        "events": [],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"sean-kang": SEASON_ANSWERS["sean-kang"]["feb"]},
                           "found": []},
        },
    },
    {
        "id": "03-marijoy-bertolini",
        "why": "Two bounces on 8 Feb, then she replies on 29 Feb from an address Jon never guessed — 21.6 days after first outreach — and it becomes the season's second-largest relationship. No threshold may ever punish the wait (rules §4).",
        "roster": [("marijoy-bertolini", None)],
        "events": [],
        "nows": {
            d10: {"now": NOW[k],
                  "rows": {"marijoy-bertolini": SEASON_ANSWERS["marijoy-bertolini"][k]},
                  "found": []}
            for k, d10 in [("jan", "2024-01-25"), ("feb", "2024-02-15"),
                           ("mar", "2024-03-15"), ("apr", "2024-04-30")]
        },
    },
    {
        "id": "04-closed-wins",
        "why": "CONSTRUCTED (the corpus has no Closed row, brief §3): Marijoy's real 15 Feb data with closed=true. Closed must beat even Bounced, the top of the precedence chain (rules §4, §10).",
        "constructed": "closed=true is the one constructed element; every message is real.",
        "roster": [("marijoy-bertolini", None)],
        "closed": ["marijoy-bertolini"],
        "events": [],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"marijoy-bertolini": ("Closed", None, "2024-02-07", 2, None, None)},
                           "found": []},
        },
    },
    {
        "id": "05-owen-sherry-title-match",
        "why": "A call that happened with no email address anywhere in the mailbox. Only the event title reaches him (rules §7 rule 2). Before the event exists he is Not emailed — a contact with no mail is not an error.",
        "roster": [("owen-sherry", None)],
        "events": [19],
        "nows": {
            "2024-01-25": {"now": NOW["jan"],
                           "rows": {"owen-sherry": SEASON_ANSWERS["owen-sherry"]["jan"]},
                           "found": []},
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"owen-sherry": SEASON_ANSWERS["owen-sherry"]["feb"]},
                           "found": []},
        },
    },
    {
        "id": "06-potential-favor-five",
        "why": "One Gmail thread, five relationships. Each tracked person's state comes only from messages they are actually on (rules §3): four different rows, four different clocks, out of one conversation. Jon's father is the fifth relationship and must surface in `found`, not on a row.",
        "roster": [("douglas-melsheimer", None), ("kleopatra-kirkland", None),
                   ("grace-steelman", None), ("jay-klein", None)],
        "events": [12, 22],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {s: SEASON_ANSWERS[s]["feb"] for s in
                                    ["douglas-melsheimer", "kleopatra-kirkland",
                                     "grace-steelman", "jay-klein"]},
                           "found": [("dnachman@fastspring.com", "2024-01-17",
                                      "Appeared in a thread with Douglas Melsheimer"),
                                     ("andrew.nachman@wisc.edu", "2024-01-17",
                                      "Appeared in a thread with Kleopatra Kirkland")]},
        },
    },
    {
        "id": "07-liz-ream-for-steve",
        "why": "Liz Ream answers for Steve McLaughlin in a thread where Steve is the only tracked contact: her replies advance HIS row (rules §3, single-contact conversations) — the opposite of case 06 — and she herself lands in `found` (rules §8). By 15 March the thank-you note has cleared Call done into Sent, and Steve's reply made it Replied (rules §4).",
        "roster": [("steve-mclaughlin", None)],
        "events": [25],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"steve-mclaughlin": SEASON_ANSWERS["steve-mclaughlin"]["feb"]},
                           "found": [("liz.ream@ftpartners.com", "2024-02-13",
                                      "Appeared in a thread with Steve McLaughlin"),
                                     ("dnachman@fastspring.com", "2024-02-13",
                                      "Appeared in a thread with Steve McLaughlin")]},
            "2024-03-15": {"now": NOW["mar"],
                           "rows": {"steve-mclaughlin": SEASON_ANSWERS["steve-mclaughlin"]["mar"]},
                           "found": [("liz.ream@ftpartners.com", "2024-02-13",
                                      "Appeared in a thread with Steve McLaughlin"),
                                     ("dnachman@fastspring.com", "2024-02-13",
                                      "Appeared in a thread with Steve McLaughlin")]},
        },
    },
    {
        "id": "08-brady-flynn-casing",
        "why": "Brady.flynn@ and Brady.Flynn@ inside one thread are one person (rules §3). His replies must attach across the casing change, and the variant must NOT appear in `found` (rules §8: nothing already in the sheet under any capitalisation).",
        "roster": [("custom", {"name": "Brady Flynn", "firm": "FT Partners",
                               "emails": ["Brady.flynn@ftpartners.com"]})],
        "events": [],
        "nows": {
            "2024-04-30": {"now": NOW["apr"],
                           "rows": {"custom-0": R("2024-04-18T13:59:00Z", "2024-04-18", 0)},
                           "found": []},
        },
    },
    {
        "id": "09-us-campus-shared-mailbox",
        "why": "Jon wrote to US_Campus@bofa.com; the answer came from us_campus@bofa.com. Same mailbox, one row (rules §3). Two snapshots: mid-afternoon on 8 April it is Sent with attempts 2; by season end the lowercase reply has made it Replied.",
        "roster": [("custom", {"name": "Bank of America - application", "firm": None,
                               "emails": ["US_Campus@bofa.com"]})],
        "events": [],
        "nows": {
            "2024-04-08": {"now": "2024-04-08T18:00:00Z",
                           "rows": {"custom-0": S("2024-04-08T17:22:04Z", "2024-04-08", 2)},
                           "found": []},
            "2024-04-30": {"now": NOW["apr"],
                           "rows": {"custom-0": R("2024-04-08T18:31:18Z", "2024-04-08", 0)},
                           "found": []},
        },
    },
    {
        "id": "10-wells-fargo-bcc",
        "why": "Wells Fargo bcc'd its whole candidate list: three inbound messages with an empty To line. They still attach — the sender (and Cc) carry the tracked address (rules §3) — and one carried a hard deadline that sender-matching designs would have missed.",
        "roster": [("custom", {"name": "Wells Fargo - application, video interview, first round, withdrawal",
                               "firm": None,
                               "emails": ["CIBUniversityRecruiting@wellsfargo.com",
                                          "Abey.T.Dessie@wellsfargo.com"]})],
        "events": [],
        "nows": {
            "2024-04-30": {"now": NOW["apr"],
                           "rows": {"custom-0": R("2024-04-08T16:36:06Z", "2024-04-08", 0)},
                           "found": []},
        },
    },
    {
        "id": "11-citi-intro-trio",
        "why": "Chris Miller's referral thread grows to hold three tracked people (Chris, Carrie, Mat Young). Party filtering gives each their own state; Carrie's post-call thank-you has already cleared her Call done into Sent (rules §3, §4); Mat's call is tomorrow.",
        "roster": [("chris-miller", None), ("carrie-cruces", None), ("mathew-young", None)],
        "events": [3, 13],
        "nows": {
            "2024-01-25": {"now": NOW["jan"],
                           "rows": {"chris-miller": SEASON_ANSWERS["chris-miller"]["jan"],
                                    "carrie-cruces": SEASON_ANSWERS["carrie-cruces"]["jan"],
                                    "mathew-young": SEASON_ANSWERS["mathew-young"]["jan"]},
                           "found": [("dmnachman@gmail.com", "2024-01-18",
                                      "Appeared in a thread with Chris Miller")]},
        },
    },
    {
        "id": "12-paige-butters-arc",
        "why": "The longest arc in the corpus: application, three bumps in a row (the real highest attempts run), a coffee chat, two interviews attached by attendee (rules §7), and a final Replied. Four snapshots plus the 27 Feb attempts peak.",
        "roster": [("paige-butters", None)],
        "events": [26, 27, 28],
        "nows": {
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"paige-butters": SEASON_ANSWERS["paige-butters"]["feb"]},
                           "found": [("careers@aerispartners.com", "2024-02-07",
                                      "Appeared in a thread with Paige Butters")]},
            "2024-02-27": {"now": "2024-02-27T21:00:00Z",
                           "rows": {"paige-butters": S("2024-02-27T20:27:34Z", "2024-02-27", 3)},
                           "found": [("careers@aerispartners.com", "2024-02-07",
                                      "Appeared in a thread with Paige Butters")]},
            "2024-03-15": {"now": NOW["mar"],
                           "rows": {"paige-butters": SEASON_ANSWERS["paige-butters"]["mar"]},
                           "found": [("careers@aerispartners.com", "2024-02-07",
                                      "Appeared in a thread with Paige Butters")]},
            "2024-04-30": {"now": NOW["apr"],
                           "rows": {"paige-butters": SEASON_ANSWERS["paige-butters"]["apr"]},
                           "found": [("careers@aerispartners.com", "2024-02-07",
                                      "Appeared in a thread with Paige Butters")]},
        },
    },
    {
        "id": "13-sellingsloh-cc-five",
        "why": "John Sellingsloh's one reply cc's five colleagues: five referral suggestions from a single message (rules §8). The -ignored variant (CONSTRUCTED ignored entry, flagged) shows an ignored address never coming back.",
        "roster": [("john-sellingsloh", None)],
        "events": [],
        "nows": {
            "2024-01-25": {"now": NOW["jan"],
                           "rows": {"john-sellingsloh": SEASON_ANSWERS["john-sellingsloh"]["jan"]},
                           "found": [("Bemis@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("horton@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("cook@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("Andersen@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("Robinson@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh")]},
            "2024-01-25-ignored": {"now": NOW["jan"],
                           "constructed": "the ignored list entry is constructed; everything else is real",
                           "ignored": ["cook@intrepidfp.com"],
                           "rows": {"john-sellingsloh": SEASON_ANSWERS["john-sellingsloh"]["jan"]},
                           "found": [("Bemis@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("horton@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("Andersen@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh"),
                                     ("Robinson@intrepidfp.com", "2024-01-19", "Appeared in a thread with John Sellingsloh")]},
        },
    },
    {
        "id": "14-nick-gerstein-reschedule",
        "why": "A rescheduled call (the calendar holds only the final 26 Jan event), case-variant addresses on one row, and after the call three unanswered sends: attempts 3, the joint-highest in the season under §5 as written.",
        "roster": [("nick-gerstein", None)],
        "events": [11],
        "nows": {
            "2024-01-25": {"now": NOW["jan"],
                           "rows": {"nick-gerstein": SEASON_ANSWERS["nick-gerstein"]["jan"]},
                           "found": []},
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"nick-gerstein": SEASON_ANSWERS["nick-gerstein"]["feb"]},
                           "found": []},
        },
    },
    {
        "id": "15-david-talbot-call-done",
        "why": "On 25 Jan the call has happened and nobody has written since: Call done — the state that MEANS a thank-you is owed (rules §4). By 15 Feb the note went out and David answered: Replied, and Call done cleared itself.",
        "roster": [("david-talbot", None)],
        "events": [8],
        "nows": {
            "2024-01-25": {"now": NOW["jan"],
                           "rows": {"david-talbot": SEASON_ANSWERS["david-talbot"]["jan"]},
                           "found": []},
            "2024-02-15": {"now": NOW["feb"],
                           "rows": {"david-talbot": SEASON_ANSWERS["david-talbot"]["feb"]},
                           "found": []},
        },
    },
]


# ---------------------------------------------------------------- assembling

def roster_row(index_rec, record, row_num):
    if index_rec.get("record_type") == "firm_process":
        emails = []  # rules §1: version one does not track firms
    else:
        emails = dedupe_addresses_keep_first_casing(record.get("addresses_seen") or [])
    return {
        "row": row_num,
        "name": index_rec["name"],
        "firm": index_rec.get("firm"),
        "emails": emails,
        "closed": False,
    }


def render_row(row_num, entry, now, events_by_pos):
    status, anchor, lc, att, nc, lcall = entry

    def ev_start(ref):
        return events_by_pos[ref[1]]["start"]

    days = None
    if status in ("Sent", "Replied", "Bounced"):
        days = date_diff(anchor, now)
    elif status == "Call scheduled":
        days = date_diff(now, ev_start(anchor))
    elif status == "Call done":
        days = date_diff(ev_start(anchor), now)
    return {
        "row": row_num,
        "status": status,
        "days": days,
        "last_contact": lc,
        "attempts": att,
        "next_call": student_render(ev_start(nc)) if nc else None,
        "last_call": student_date(ev_start(lcall)) if lcall else None,
    }


def render_found(entries):
    out = sorted(entries, key=lambda f: (f[1], f[0].lower()))
    return [{"email": e, "name": None, "first_seen": seen, "context": ctx}
            for e, seen, ctx in out]


def validate_entry(slug, entry, now, all_msg_dates, events_by_pos, contact_dates):
    status, anchor, lc, att, nc, lcall = entry
    valid = {"Not emailed", "Bounced", "Sent", "Replied", "Call scheduled", "Call done", "Closed"}
    assert status in valid, f"{slug}: bad status {status}"
    if isinstance(anchor, str):
        assert anchor in all_msg_dates, f"{slug}: anchor {anchor} matches no corpus message"
        assert parse_iso(anchor) <= parse_iso(now), f"{slug}: anchor {anchor} after now {now}"
        m = all_msg_dates[anchor]
        if status == "Sent":
            assert m["direction"] == "outbound", f"{slug}: Sent anchor {anchor} is not outbound"
        if status == "Replied":
            assert m["direction"] == "inbound", f"{slug}: Replied anchor {anchor} is not inbound"
        if status == "Bounced":
            assert m.get("bounce"), f"{slug}: Bounced anchor {anchor} is not a bounce message"
    if lc is not None:
        assert lc in contact_dates.get(slug, set()) or slug.startswith("custom"), \
            f"{slug}: last_contact {lc} matches no message date of theirs"


def main():
    index, records, events = load_corpus()
    threads = canonical_threads(records)
    events_by_pos = {i + 1: e for i, e in enumerate(events)}

    # Sanity: pin the hand-numbered events to their titles so a reordering of
    # calendar.json cannot silently re-aim every event reference.
    expect_title = {
        1: "Joseph", 2: "Josh", 3: "Carrie", 4: "Kate", 6: "Gary", 7: "Carson",
        8: "David", 9: "Will", 10: "Grant", 11: "Nick", 12: "Doug Melsheimer",
        13: "Mat -", 14: "Danny", 15: "Matt", 16: "Kevin", 18: "Ethan",
        19: "Owen Sherry", 22: "Grace", 25: "Steve McLaughlin",
        26: "Coffee Chat", 27: "Technical Interview", 28: "Industry-Specific",
    }
    for pos, frag in expect_title.items():
        assert frag in events_by_pos[pos]["summary"], \
            f"event #{pos} is not the expected one ({events_by_pos[pos]['summary']!r})"

    # Lookup tables for validation.
    all_msg_dates = {}
    contact_dates = {}
    for slug, rec in records.items():
        dates = set()
        for t in rec.get("threads", []):
            for m in t.get("messages", []):
                all_msg_dates[m["date"]] = m
                dates.add(student_date(m["date"]))
        for ref in rec.get("calendar_event_ids") or []:
            for e in events:
                if e["event_id"] == ref:
                    dates.add(student_date(e["start"]))
        contact_dates[slug] = dates
    # Custom-row anchors validate against the global message set only.

    season_order = [r["slug"] for r in index["records"]]
    assert len(season_order) == 67, f"expected 67 records, index lists {len(season_order)}"
    assert set(season_order) == set(SEASON_ANSWERS), "season answers do not cover the index exactly"

    written = []

    def write(path, obj):
        full = os.path.join(OUT, path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w") as f:
            json.dump(obj, f, indent=1, ensure_ascii=False)
            f.write("\n")
        written.append(path)

    # ------------------------------------------------------------- the season
    season_rows = []
    for i, slug in enumerate(season_order):
        rec = next(r for r in index["records"] if r["slug"] == slug)
        season_rows.append((slug, roster_row(rec, records[slug], i + 2)))

    for key in DATES:
        now = NOW[key]
        d10 = now[:10]
        roster_emails = [a for _, row in season_rows for a in row["emails"]]
        request = {
            "version": 1,
            "now": student_render(now),
            "student": {"addresses": STUDENT_ADDRESSES},
            "contacts": [row for _, row in season_rows],
            "threads": courier_threads(threads, roster_emails, now),
            "events": [convert_event(e) for e in events
                       if parse_iso(e["created"]) <= parse_iso(now)],
            "ignored": [],
        }
        expected_rows = []
        for slug, row in season_rows:
            entry = SEASON_ANSWERS[slug][key]
            validate_entry(slug, entry, now, all_msg_dates, events_by_pos, contact_dates)
            # A "Not emailed" claim must be provably mail-free at this date.
            if entry[0] == "Not emailed":
                addrs = {a.lower() for a in row["emails"]}
                for t in request["threads"]:
                    for m in t["messages"]:
                        raw = {m["from"].lower()} | {a.lower() for a in m["to"] + m["cc"]}
                        assert not (raw & addrs), \
                            f"{slug} marked Not emailed but {m['id']} carries their address"
            expected_rows.append(render_row(row["row"], entry, now, events_by_pos))
        expected = {
            "version": 1,
            "rows": expected_rows,
            "found": render_found(season_found(now)),
            "warnings": [],
        }
        write(f"season/{d10}.request.json", request)
        write(f"season/{d10}.expected.json", expected)

    # -------------------------------------------------------------- the cases
    for case in CASES:
        # Build the case roster.
        rows = []
        n_custom = 0
        for j, (slug, custom) in enumerate(case["roster"]):
            if slug == "custom":
                rows.append((f"custom-{n_custom}", {
                    "row": j + 2, "name": custom["name"], "firm": custom["firm"],
                    "emails": custom["emails"], "closed": False,
                }))
                n_custom += 1
            else:
                rec = next(r for r in index["records"] if r["slug"] == slug)
                row = roster_row(rec, records[slug], j + 2)
                if slug in ("wells-fargo-process", "bofa-process"):
                    pass  # cases use custom rows for these instead
                rows.append((slug, row))
        for slug in case.get("closed", []):
            for s, row in rows:
                if s == slug:
                    row["closed"] = True

        for label, spec in case["nows"].items():
            now = spec["now"]
            roster_emails = [a for _, row in rows for a in row["emails"]]
            request = {
                "version": 1,
                "now": student_render(now),
                "student": {"addresses": STUDENT_ADDRESSES},
                "contacts": [row for _, row in rows],
                "threads": courier_threads(threads, roster_emails, now),
                "events": [convert_event(events_by_pos[n]) for n in case["events"]
                           if parse_iso(events_by_pos[n]["created"]) <= parse_iso(now)],
                "ignored": spec.get("ignored", []),
            }
            expected_rows = []
            for s, row in rows:
                entry = spec["rows"][s]
                validate_entry(s, entry, now, all_msg_dates, events_by_pos, contact_dates)
                expected_rows.append(render_row(row["row"], entry, now, events_by_pos))
            expected = {
                "version": 1,
                "rows": expected_rows,
                "found": render_found(spec["found"]),
                "warnings": [],
            }
            write(f"cases/{case['id']}/{label}.request.json", request)
            write(f"cases/{case['id']}/{label}.expected.json", expected)

    # ---------------------------------------------------------------- summary
    print(f"wrote {len(written)} files under {os.path.relpath(OUT, ROOT)}")
    for key in DATES:
        d10 = NOW[key][:10]
        with open(os.path.join(OUT, f"season/{d10}.expected.json")) as f:
            exp = json.load(f)
        counts = {}
        for r in exp["rows"]:
            counts[r["status"]] = counts.get(r["status"], 0) + 1
        with open(os.path.join(OUT, f"season/{d10}.request.json")) as f:
            req = json.load(f)
        n_msgs = sum(len(t["messages"]) for t in req["threads"])
        print(f"  {d10}: {len(req['threads'])} threads / {n_msgs} msgs / "
              f"{len(req['events'])} events -> {counts} / found {len(exp['found'])}")


if __name__ == "__main__":
    sys.exit(main())
