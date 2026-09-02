/**
 * The courier's pure helpers, exercised outside Apps Script.
 *
 * `Code.gs` cannot run here — it needs GmailApp, CalendarApp and a
 * spreadsheet. But a few of its pieces are pure string and date work, and they
 * are the pieces most able to be quietly wrong:
 *
 *   - display-name parsing, where a comma inside a quoted name can split one
 *     person into two;
 *   - the recipient cap, which decides whether a whole conversation is
 *     dropped;
 *   - the `Pretend today is` parser, where **accepting something unreadable
 *     would be far worse than failing** — a silent fallback to today makes a
 *     broken test look like a passing one;
 *   - the timezone conversion behind it, which is the same class of bug that
 *     once put 98 fixture values out by a day.
 *
 * The Apps Script calls around them — GuestStatus, getMyStatus, the sheet
 * writes — are still only testable by running it for real.
 *
 * Run from the repo root:
 *
 *     node courier/helpers.test.js
 */

const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Code.gs'), 'utf8');
const TZ = 'America/Chicago';

/** Apps Script's Utilities.formatDate, backed by Node's real timezone data. */
function formatDate(date, tz, pattern) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).formatToParts(date).map((x) => [x.type, x.value]),
  );
  const hh = p.hour === '24' ? '00' : p.hour;
  if (pattern === 'yyyy-MM-dd HH:mm:ss') {
    return `${p.year}-${p.month}-${p.day} ${hh}:${p.minute}:${p.second}`;
  }
  const off = Math.round(
    (Date.UTC(+p.year, +p.month - 1, +p.day, +hh, +p.minute, +p.second) - date.getTime()) / 60000,
  );
  const sign = off < 0 ? '-' : '+';
  const abs = Math.abs(off);
  const oh = String(Math.floor(abs / 60)).padStart(2, '0');
  const om = String(abs % 60).padStart(2, '0');
  return `${p.year}-${p.month}-${p.day}T${hh}:${p.minute}:${p.second}${sign}${oh}:${om}`;
}

// Code.gs reads these as free identifiers, so they have to be real globals.
global.Utilities = { formatDate };
global.SpreadsheetApp = { getActiveSpreadsheet: () => ({ getSpreadsheetTimeZone: () => TZ }) };
global.Session = { getScriptTimeZone: () => TZ };

const EXPORTS = [
  'namedAddressList_', 'firstNamedAddress_', 'bareAddress_', 'addressList_',
  'exceedsRecipientCap_', 'parsePretendText_', 'pretendNowIso_',
  'MAX_THREAD_RECIPIENTS', 'NO_CLOCK', 'VALID_STATUSES', 'CONTRACT_VERSION',
];
const box = {};
new Function('box', `${src}\nObject.assign(box, {${EXPORTS.join(', ')}});`)(box);

let fails = 0;
let checks = 0;

function eq(label, actual, expected) {
  checks += 1;
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    fails += 1;
    console.error(`FAIL ${label}\n  expected ${e}\n  got      ${a}`);
  }
}

function refuses(label, value, midnightMeansAllDay = false) {
  checks += 1;
  try {
    box.parsePretendText_(value, midnightMeansAllDay);
    fails += 1;
    console.error(`FAIL ${label}: accepted ${JSON.stringify(value)}`);
  } catch (e) {
    if (!/not a date Blotter can read/.test(e.message)) {
      fails += 1;
      console.error(`FAIL ${label}: wrong message: ${e.message}`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Contract v2 — display names survive, bare addresses stay bare
 * ------------------------------------------------------------------ */

eq('plain address', box.namedAddressList_('jamie@x.com'), ['jamie@x.com']);
eq('named address',
  box.namedAddressList_('Barbara Barman <boone2002@att.net>'),
  ['Barbara Barman <boone2002@att.net>']);
eq('a comma inside a quoted name is not a second person',
  box.namedAddressList_('"Barman, Barbara" <boone2002@att.net>, other@y.com'),
  ['Barman, Barbara <boone2002@att.net>', 'other@y.com']);
eq('two named recipients',
  box.namedAddressList_('A B <a@x.com>, C D <c@y.com>'),
  ['A B <a@x.com>', 'C D <c@y.com>']);
eq('a mail client repeating the address as the name',
  box.namedAddressList_('jamie@x.com <jamie@x.com>'), ['jamie@x.com']);
eq('semicolon separated', box.namedAddressList_('a@x.com; B <b@y.com>'), ['a@x.com', 'B <b@y.com>']);
eq('empty header', box.namedAddressList_(''), []);
eq('a header with no address at all', box.namedAddressList_('undisclosed-recipients:;'), []);
eq('a From line keeps its name',
  box.firstNamedAddress_('Jamie Diamond <jamie@x.com>'), 'Jamie Diamond <jamie@x.com>');
eq('the bare address out of a named one', box.bareAddress_('Jamie Diamond <jamie@x.com>'), 'jamie@x.com');
eq('the bare address out of a bare one', box.bareAddress_('jamie@x.com'), 'jamie@x.com');
eq('no address at all', box.bareAddress_(''), '');
eq('addressList_ stays bare — Settings still uses it',
  box.addressList_('A B <a@x.com>, c@y.com'), ['a@x.com', 'c@y.com']);

/* ------------------------------------------------------------------ *
 * D2 — the recipient cap
 * ------------------------------------------------------------------ */

const many = (k) => Array.from({ length: k }, (_, i) => `p${i}@x.com`);
const m = (to, cc = []) => ({ to, cc });

eq('the cap is ten', box.MAX_THREAD_RECIPIENTS, 10);
eq('exactly ten is kept', box.exceedsRecipientCap_([m(many(10))]), false);
eq('eleven is skipped', box.exceedsRecipientCap_([m(many(11))]), true);
eq('To and Cc are counted together',
  box.exceedsRecipientCap_([m(many(6), many(6).map((a) => a.replace('p', 'q')))]), true);
eq('a duplicate is one person', box.exceedsRecipientCap_([m(many(10).concat(many(10)))]), false);
eq('capitalisation does not make a second person',
  box.exceedsRecipientCap_([m(many(10).concat(many(10).map((a) => a.toUpperCase())))]), false);
eq('one listserv message condemns the whole conversation',
  box.exceedsRecipientCap_([m(['a@x.com']), m(many(40)), m(['b@x.com'])]), true);
eq('an ordinary conversation survives', box.exceedsRecipientCap_([m(['a@x.com'], ['b@x.com'])]), false);
eq('display names do not break the count',
  box.exceedsRecipientCap_([m(many(11).map((a, i) => `Person ${i} <${a}>`))]), true);
eq('an empty conversation is fine', box.exceedsRecipientCap_([]), false);

/* ------------------------------------------------------------------ *
 * Contract v2 bookkeeping
 * ------------------------------------------------------------------ */

eq('the courier speaks version 2', box.CONTRACT_VERSION, 2);
eq('eight statuses', box.VALID_STATUSES.length, 8);
eq('Call cancelled is accepted', box.VALID_STATUSES.indexOf('Call cancelled') !== -1, true);
eq('a clockless cell is an em dash', box.NO_CLOCK, '—');

/* ------------------------------------------------------------------ *
 * D17 — the time machine. What it accepts, and what it must refuse.
 * ------------------------------------------------------------------ */

const P = (t, midnight = false) => box.parsePretendText_(t, midnight);

eq('a date with no time means the end of that day',
  P('2026-09-05'), { y: 2026, mo: 9, d: 5, h: 23, mi: 59, s: 59 });
eq('a date with a time means that time',
  P('2026-09-05 14:30'), { y: 2026, mo: 9, d: 5, h: 14, mi: 30, s: 0 });
eq('the T separator works too',
  P('2026-09-05T14:30'), { y: 2026, mo: 9, d: 5, h: 14, mi: 30, s: 0 });
eq('seconds are allowed', P('2026-09-05T14:30:09'), { y: 2026, mo: 9, d: 5, h: 14, mi: 30, s: 9 });
eq('the US format Sheets displays', P('9/5/2026'), { y: 2026, mo: 9, d: 5, h: 23, mi: 59, s: 59 });
eq('the US format with a time',
  P('09/05/2026 08:15'), { y: 2026, mo: 9, d: 5, h: 8, mi: 15, s: 0 });
eq('a date-formatted cell reads back as midnight, and means all day',
  P('2026-09-05 00:00:00', true), { y: 2026, mo: 9, d: 5, h: 23, mi: 59, s: 59 });
eq('a midnight somebody actually typed is respected',
  P('2026-09-05 00:00', false), { y: 2026, mo: 9, d: 5, h: 0, mi: 0, s: 0 });
eq('a leap day is a real date', P('2024-02-29'), { y: 2024, mo: 2, d: 29, h: 23, mi: 59, s: 59 });

refuses('prose', 'tomorrow');
refuses('a day that does not exist', '2026-02-30');
refuses('February 29 in a non-leap year', '2025-02-29');
refuses('a twenty-fifth hour', '2026-09-05 25:00');
refuses('a sixtieth minute', '2026-09-05 12:60');
refuses('a thirteenth month', '2026-13-01');
refuses('half a date', '2026-09');
refuses('a raw spreadsheet serial number', '45900');
refuses('a date with words after it', '2026-09-05 lunchtime');
refuses('a format we do not accept', '05.09.2026');

/* The offset must follow the pretend DATE, not today's. */
eq('blank means the real clock', box.pretendNowIso_(''), '');
eq('an absent cell means the real clock', box.pretendNowIso_(undefined), '');
eq('a winter date carries the winter offset',
  box.pretendNowIso_('2026-01-15'), '2026-01-15T23:59:59-06:00');
eq('a summer date carries the summer offset',
  box.pretendNowIso_('2026-07-15'), '2026-07-15T23:59:59-05:00');
eq('a summer date with a time', box.pretendNowIso_('2026-07-15 14:30'), '2026-07-15T14:30:00-05:00');
eq('the morning the clocks go forward', box.pretendNowIso_('2026-03-08 01:30'), '2026-03-08T01:30:00-06:00');
eq('after the clocks go forward', box.pretendNowIso_('2026-03-08 03:30'), '2026-03-08T03:30:00-05:00');
eq('the end of the day the clocks go forward',
  box.pretendNowIso_('2026-03-08'), '2026-03-08T23:59:59-05:00');
eq('the end of the day the clocks go back',
  box.pretendNowIso_('2026-11-01'), '2026-11-01T23:59:59-06:00');
eq('a date from the 2024 season', box.pretendNowIso_('2024-02-15'), '2024-02-15T23:59:59-06:00');
eq('a Sheets date cell becomes the end of that day',
  box.pretendNowIso_(new Date('2026-07-15T05:00:00Z')), '2026-07-15T23:59:59-05:00');

console.log(fails === 0
  ? `All ${checks} courier helper checks passed.`
  : `\n${fails} of ${checks} checks failed.`);
process.exit(fails === 0 ? 0 : 1);
