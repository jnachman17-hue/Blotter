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
  'exceedsRecipientCap_', 'parsePretendText_', 'pretendNowIso_', 'declinedGuests_',
  'normaliseTyped_', 'unreadableAddressWarnings_', 'lastRowWithContact_',
  'failedRecipientsFrom_', 'isBounceSender_', 'installId_', 'telemetryPayload_', 'noticeFrom_',
  'MAX_THREAD_RECIPIENTS', 'NO_CLOCK', 'VALID_STATUSES', 'CONTRACT_VERSION',
  // The look. Colour tables and widths are data, so they are testable — and a
  // typo in a hex paints a cell black on somebody's real sheet.
  'asSheetDate_', 'STATUS_STYLE', 'THEMES', 'CONTACTS_WIDTHS', 'FOUND_WIDTHS',
  'COL_NAME', 'COL_TITLE', 'COL_FIRM', 'COL_EMAIL', 'COL_CLOSED',
  'BLOTTER_COLUMNS', 'FOUND_HEADERS',
  // Sorting: the two ranking functions are pure, and getting either subtly
  // wrong reorders somebody's whole tracker without erroring.
  'titleRank_', 'stateRank_', 'pad_', 'columnLetter_',
  // The banner change. headerRow_ decides where every other row is, and the
  // row number is the contract's join key, so it is tested against a fake sheet.
  'headerRow_', 'firstDataRow_', 'resetHeaderRowCache_',
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

eq('the courier speaks version 4', box.CONTRACT_VERSION, 4);
eq('eight statuses', box.VALID_STATUSES.length, 8);
eq('Call cancelled is accepted', box.VALID_STATUSES.indexOf('Call cancelled') !== -1, true);
eq('a clockless cell is an em dash', box.NO_CLOCK, '—');

/* ------------------------------------------------------------------ *
 * Live-test defect 1 — a hand-typed address that silently never matched.
 *
 * Jon typed `jon@un-claude.com` and the row read Not emailed forever; he
 * pasted the identical address and it worked. Autocorrect had replaced the
 * hyphen with an en dash. Capitalisation was never the problem — matching
 * lowercases everywhere.
 * ------------------------------------------------------------------ */

eq('an ordinary typed address still works', box.addressList_('jon@un-claude.com'), ['jon@un-claude.com']);
eq('en dash (U+2013), which is what autocorrect actually produced',
  box.addressList_('jon@un–claude.com'), ['jon@un-claude.com']);
eq('non-breaking hyphen (U+2011)',
  box.addressList_('jon@un‑claude.com'), ['jon@un-claude.com']);
eq('em dash (U+2014)', box.addressList_('jon@un—claude.com'), ['jon@un-claude.com']);
eq('minus sign (U+2212)', box.addressList_('jon@un−claude.com'), ['jon@un-claude.com']);
eq('a non-breaking space around it', box.addressList_(' jon@acme.com '), ['jon@acme.com']);
eq('a zero-width space pasted into the middle',
  box.addressList_('jon@ac​me.com'), ['jon@acme.com']);
eq('a full-width at sign', box.addressList_('jon＠acme.com'), ['jon@acme.com']);
eq('capitals are left exactly as typed — matching lowercases later',
  box.addressList_('Jon@Un-Claude.com'), ['Jon@Un-Claude.com']);
eq('a real address is never altered', box.normaliseTyped_('a-b@c-d.com'), 'a-b@c-d.com');
eq('and the display-name path normalises too',
  box.namedAddressList_('Jon <jon@un–claude.com>'), ['Jon <jon@un-claude.com>']);

/* The general defence: say so when a row has a person and no usable address.
   There will always be a character nobody anticipated. */
eq('a garbled address names the row and quotes the cell',
  box.unreadableAddressWarnings_([{ row: 7, name: 'Jane Doe', cell: 'jane@acme,com' }]),
  ['Row 7 (Jane Doe): "jane@acme,com" is not an email address Blotter can read, ' +
   'so the row will stay "Not emailed". Retyping it usually fixes it — autocorrect ' +
   'sometimes replaces a hyphen with a dash that looks identical.']);
eq('an empty address cell says something different and true',
  box.unreadableAddressWarnings_([{ row: 3, name: 'Owen Sherry', cell: '' }]),
  ['Row 3 (Owen Sherry) has no email address, so Blotter cannot find their mail ' +
   'and the row will stay "Not emailed".']);
eq('nothing wrong, nothing said', box.unreadableAddressWarnings_([]), []);

/* ------------------------------------------------------------------ *
 * Live-test defect 3 — an approved contact landed at row 996.
 *
 * `getLastRow()` counts a column of unticked checkboxes as content, because an
 * unticked checkbox stores FALSE. The append must follow the last row that
 * holds a person instead.
 * ------------------------------------------------------------------ */

/* The stub gained getSheetId, getName, getMaxRows and getLastColumn when the
   banner arrived: `lastRowWithContact_` now derives its window from
   `headerRow_`, so it needs a sheet the search can look at. Row 1 holds the
   headers here, which is the pre-banner layout — so these cases also prove the
   old behaviour is unchanged. */
let sheetOfId = 0;
const sheetOf = (names, emails, lastRow) => {
  const id = ++sheetOfId;
  const grid = [['Name', 'Email']].concat(names.map((n, i) => [n, emails[i] ?? '']));
  return {
    sheet: {
      getSheetId: () => id,
      getName: () => 'Contacts',
      getMaxRows: () => lastRow,
      getLastColumn: () => 2,
      getLastRow: () => lastRow,
      getRange: (row, col, height, numCols) => ({
        getValues: () => {
          // The header search asks for a block of rows and every column.
          if (numCols && numCols > 1) {
            return grid.slice(row - 1, row - 1 + height)
              .map((r) => Array.from({ length: numCols }, (_, i) => r[i] ?? ''));
          }
          // Everything else asks for one column, starting at the first data row.
          const src = col === 1 ? names : emails;
          return src.slice(row - 2, row - 2 + height).map((v) => [v ?? '']);
        },
      }),
    },
    cols: { name: 1, email: 2 },
  };
};

eq('three contacts and 900 rows of checkboxes below them',
  box.lastRowWithContact_(sheetOf(['A', 'B', 'C', ...Array(900).fill('')],
                                  ['a@x.com', 'b@x.com', 'c@x.com', ...Array(900).fill('')], 995)),
  4);
eq('a row with only an email still counts as a person',
  box.lastRowWithContact_(sheetOf(['A', ''], ['a@x.com', 'b@x.com'], 995)), 3);
eq('a row with only a name counts too (Owen Sherry has no address)',
  box.lastRowWithContact_(sheetOf(['A', 'Owen Sherry'], ['a@x.com', ''], 995)), 3);
eq('a gap in the middle does not truncate the list',
  box.lastRowWithContact_(sheetOf(['A', '', 'C'], ['a@x.com', '', 'c@x.com'], 995)), 4);
eq('an empty sheet appends at row 2',
  box.lastRowWithContact_(sheetOf([], [], 1)), 1);
eq('a sheet of nothing but checkboxes appends at row 2',
  box.lastRowWithContact_(sheetOf(Array(900).fill(''), Array(900).fill(''), 901)), 1);

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

/* ------------------------------------------------------------------ *
 * Who declined — and what it COSTS to find out.
 *
 * This runs against every event in the window, and a student's calendar can
 * hold thousands. The first version asked Google for the student's own answer
 * on every one of them, including the solo events that cannot have been
 * declined at all, and a real run went from about 30 seconds to 83. So the
 * call count is asserted here, not just the answer.
 * ------------------------------------------------------------------ */

global.CalendarApp = { GuestStatus: { YES: 'YES', NO: 'NO', MAYBE: 'MAYBE', INVITED: 'INVITED', OWNER: 'OWNER' } };
global.Session = { getEffectiveUser: () => ({ getEmail: () => 'student@gmail.com' }) };

let statusCalls = 0;
const guest = (email, status) => ({
  getEmail: () => email,
  getGuestStatus: () => { statusCalls += 1; return status; },
});
const event = (myStatus) => ({
  getMyStatus: () => { statusCalls += 1; if (myStatus === undefined) throw new Error('no status'); return myStatus; },
});
const declinedBy = (guests, myStatus) => {
  statusCalls = 0;
  const out = guests.length === 0 ? [] : box.declinedGuests_(event(myStatus), guests);
  return out;
};

eq('the banker declined',
  declinedBy([guest('banker@firm.com', 'NO'), guest('student@gmail.com', 'OWNER')], 'OWNER'),
  ['banker@firm.com']);
eq('nobody declined',
  declinedBy([guest('banker@firm.com', 'YES'), guest('student@gmail.com', 'OWNER')], 'OWNER'), []);
eq('a maybe is not a decline',
  declinedBy([guest('banker@firm.com', 'MAYBE')], 'OWNER'), []);
eq('the student declined, reported as OWNER in the guest list',
  declinedBy([guest('banker@firm.com', 'YES'), guest('student@gmail.com', 'OWNER')], 'NO'),
  ['student@gmail.com']);
eq('the student declined and the guest list says so',
  declinedBy([guest('student@gmail.com', 'NO')], 'NO'), ['student@gmail.com']);
eq('and it is not listed twice',
  declinedBy([guest('student@gmail.com', 'NO'), guest('student@gmail.com', 'NO')], 'NO'),
  ['student@gmail.com']);
eq('an event with no my-status to report does not throw',
  declinedBy([guest('banker@firm.com', 'NO')], undefined), ['banker@firm.com']);

/* The cost, pinned. */
declinedBy([], 'OWNER');
eq('a solo event asks Google nothing at all', statusCalls, 0);
declinedBy([guest('student@gmail.com', 'NO')], 'NO');
eq('the guest list answering means my-status is not asked again', statusCalls, 1);
declinedBy([guest('banker@firm.com', 'YES'), guest('student@gmail.com', 'OWNER')], 'OWNER');
eq('otherwise: one call per guest, plus one for the student', statusCalls, 3);


// ---------------------------------------------------------------------------
/** The harness asserts with eq(label, actual, expected); this is the boolean form. */
function ok(label, actual) { eq(label, !!actual, true); }

const { titleRank_, stateRank_, pad_, columnLetter_ } = box;
const { asSheetDate_, STATUS_STYLE, THEMES, CONTACTS_WIDTHS, FOUND_WIDTHS,
        COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL, COL_CLOSED,
        BLOTTER_COLUMNS, FOUND_HEADERS, VALID_STATUSES } = box;

// asSheetDate_ — the fix for `Next call` rendering a raw ISO timestamp.
//
// The trap being guarded is the one this project has already paid for once:
// `new Date('2026-09-02')` is UTC midnight, which is the evening of September
// 1st anywhere in the Americas. A bare date must be built from its parts.
// ---------------------------------------------------------------------------
{
  const bare = asSheetDate_('2026-09-02');
  ok('bare date is a Date', bare instanceof Date);
  ok('bare date keeps its own day, not UTC midnight', bare.getFullYear() === 2026 && bare.getMonth() === 8 && bare.getDate() === 2);
  ok('bare date sits at local midnight', bare.getHours() === 0 && bare.getMinutes() === 0);

  const stamped = asSheetDate_('2026-09-03T14:00:00-07:00');
  ok('full timestamp is a Date', stamped instanceof Date);
  ok('full timestamp keeps its instant', stamped.getTime() === Date.parse('2026-09-03T14:00:00-07:00'));

  ok('null becomes an empty cell', asSheetDate_(null) === '');
  ok('undefined becomes an empty cell', asSheetDate_(undefined) === '');
  ok('empty string stays empty', asSheetDate_('') === '');

  // Passing an unparseable value through untouched is the point: a visibly odd
  // string is recoverable, a confidently wrong date is not.
  ok('a dash is left alone', asSheetDate_('—') === '—');
  ok('nonsense is left alone', asSheetDate_('next tuesday') === 'next tuesday');
  ok('a nearly-ISO string is left alone', asSheetDate_('2026-13-45T99:00:00Z') === '2026-13-45T99:00:00Z');

  // Every date the engine can send, across a DST boundary in both directions.
  ['2026-01-15', '2026-03-08', '2026-03-09', '2026-11-01', '2026-12-31'].forEach((iso) => {
    const d = asSheetDate_(iso);
    const parts = iso.split('-').map(Number);
    ok('round trip ' + iso, d.getFullYear() === parts[0] && d.getMonth() === parts[1] - 1 && d.getDate() === parts[2]);
  });
}

// ---------------------------------------------------------------------------
// Sorting. Titles are free text a student typed, so the ranking has to survive
// real-world spellings — and must not read "Senior Vice President" as an
// analyst because it happens to contain a word from a lower rank.
// ---------------------------------------------------------------------------
{
  const rankOf = (t) => titleRank_(t);
  ok('analyst is most junior', rankOf('Analyst') < rankOf('Associate'));
  ok('associate below VP', rankOf('Associate') < rankOf('Vice President'));
  ok('VP below MD', rankOf('Vice President') < rankOf('Managing Director'));

  // The real spellings out of Jon's own 2024 tracker.
  ['Analyst', 'analyst', 'Summer Analyst', 'Senior Analyst'].forEach((t) =>
    ok('reads as analyst: ' + t, rankOf(t) === rankOf('Analyst')));
  ['Associate', 'associate ', 'Senior Associate'].forEach((t) =>
    ok('reads as associate: ' + t, rankOf(t) === rankOf('Associate')));
  ['Vice President', 'VP', 'vp', 'SVP', 'Senior Vice President'].forEach((t) =>
    ok('reads as VP: ' + t, rankOf(t) === rankOf('Vice President')));
  ['MD', 'Managing Director', 'managing director'].forEach((t) =>
    ok('reads as MD: ' + t, rankOf(t) === rankOf('Managing Director')));

  // The trap: a longer title containing a more junior word.
  ok('Senior Vice President is not an analyst', rankOf('Senior Vice President') > rankOf('Analyst'));
  ok('Managing Director is not an associate', rankOf('Managing Director') > rankOf('Associate'));

  ok('an empty title sinks', rankOf('') > rankOf('Managing Director'));
  ok('an unknown title sinks', rankOf('Chief Vibes Officer') > rankOf('Managing Director'));

  // State order: what you owe, first.
  VALID_STATUSES.forEach((st) => ok('every status ranks: ' + st, typeof stateRank_(st) === 'number'));
  // Jon's exact sequence, pinned in order so a future reshuffle has to be
  // deliberate rather than accidental.
  ['Replied', 'Sent', 'Not emailed', 'Bounced', 'Call done', 'Call scheduled',
   'Call cancelled', 'Closed'].forEach((st, i, all) => {
    if (i === 0) return;
    ok(all[i - 1] + ' comes before ' + st, stateRank_(all[i - 1]) < stateRank_(st));
  });
  ok('the email states group ahead of the call states',
    stateRank_('Bounced') < stateRank_('Call done'));
  ok('Closed sinks below everything', VALID_STATUSES.filter((s) => s !== 'Closed')
    .every((s) => stateRank_(s) < stateRank_('Closed')));
  ok('an unknown status does not outrank a real one', stateRank_('Banana') > stateRank_('Sent'));

  // The sort key is text, so numbers must be padded or 10 sorts before 9.
  ok('pad_ orders numerically as text', pad_(9) < pad_(10));
  ok('pad_ orders 2 before 100', pad_(2) < pad_(100));
  ok('pad_ is fixed width', pad_(1).length === pad_(99999).length);

  // The closed-row rule builds an A1 reference by hand.
  [[1, 'A'], [26, 'Z'], [27, 'AA'], [28, 'AB'], [52, 'AZ'], [53, 'BA']].forEach(([n, l]) =>
    ok('column ' + n + ' is ' + l, columnLetter_(n) === l));
}

// ---------------------------------------------------------------------------
// The theme tables. Every status the contract allows must have a colour, and
// every colour must be a real hex — a typo here paints a cell black.
// ---------------------------------------------------------------------------
{
  VALID_STATUSES.forEach((status) => {
    const style = STATUS_STYLE[status];
    ok('status has a style: ' + status, !!style);
    ok('status fill is a hex: ' + status, /^#[0-9a-f]{6}$/i.test(style.bg));
    ok('status text is a hex: ' + status, /^#[0-9a-f]{6}$/i.test(style.fg));
  });
  ok('no style exists for a status the contract forbids',
    Object.keys(STATUS_STYLE).every((k) => VALID_STATUSES.indexOf(k) !== -1));

  ['hero', 'zoned'].forEach((name) => {
    const t = THEMES[name];
    ok('theme exists: ' + name, !!t);
    ok('theme has both header tints: ' + name, /^#[0-9a-f]{6}$/i.test(t.manualHeader) && /^#[0-9a-f]{6}$/i.test(t.keptHeader));
    ok('theme divider is a hex: ' + name, /^#[0-9a-f]{6}$/i.test(t.dividerColour));
  });
  ok('hero leaves data rows unfilled', THEMES.hero.manualRow === null && THEMES.hero.keptRow === null);
  ok('zoned fills both zones', /^#[0-9a-f]{6}$/i.test(THEMES.zoned.manualRow) && /^#[0-9a-f]{6}$/i.test(THEMES.zoned.keptRow));

  // Each zone's data fill must be a LIGHTER version of its own header tint —
  // strictly between white and that header, on every channel.
  //
  // This is deliberately weaker than the rule the design research claimed. It
  // said both fills sit 45% of the way from white to their header; that holds
  // for the manual pair (0.44 / 0.46 / 0.43) and is simply untrue of the kept
  // pair (0.25 / 0.39 / 0.57), which was picked by eye. The ratified colours
  // are the colours, so the assertion had to become the invariant that
  // actually matters: get a fill darker than its header and the two zones
  // invert, which nothing else would catch.
  const mix = (hex) => hex.slice(1).match(/../g).map((h) => parseInt(h, 16));
  const lighterThanHeader = (row, header) => {
    const r = mix(row), h = mix(header);
    return [0, 1, 2].every((i) => r[i] > h[i] && r[i] < 255);
  };
  ok('manual fill is lighter than its header, and not white',
    lighterThanHeader(THEMES.zoned.manualRow, THEMES.zoned.manualHeader));
  ok('kept fill is lighter than its header, and not white',
    lighterThanHeader(THEMES.zoned.keptRow, THEMES.zoned.keptHeader));

  // The two zones must stay visibly different from each other, or the whole
  // point of the split is lost to a rounding error.
  ok('the two zone fills are not the same colour', THEMES.zoned.manualRow !== THEMES.zoned.keptRow);
  ok('the two header tints are not the same colour', THEMES.zoned.manualHeader !== THEMES.zoned.keptHeader);

  // A width for every column the sheet writes, or a column silently keeps
  // Sheets' 100px default and the layout quietly drifts.
  [COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL].concat(BLOTTER_COLUMNS).concat([COL_CLOSED]).forEach((h) => {
    ok('a width is set for ' + h, typeof CONTACTS_WIDTHS[h] === 'number' && CONTACTS_WIDTHS[h] > 40);
  });
  FOUND_HEADERS.forEach((h) => {
    ok('a Found width is set for ' + h, typeof FOUND_WIDTHS[h] === 'number' && FOUND_WIDTHS[h] > 40);
  });
}

/* ------------------------------------------------------------------ *
 * Contract v4 — the body never leaves the account.
 *
 * The engine read a body in exactly one place: to find which address a
 * delivery-failure notice was complaining about. That extraction lives here
 * now, so the text stops crossing the wire. The bounce below is the real one
 * from the 2024 season, and its `Status:` code LIES — it reports 4.4.2, a
 * temporary class, while its own text says the address does not exist. An
 * engine keyed on `5.x` misses exactly the address a student burns three
 * attempts on, which is why this is keyed on the named recipient instead.
 * ------------------------------------------------------------------ */

const STIFEL_BOUNCE =
  "** Address not found **\n\nYour message wasn't delivered to sean.kang@stifel.com " +
  "because the address couldn't be found, or is unable to receive mail.\n\n" +
  "The response from the remote server was:\n550 #5.1.0 Address rejected.\n" +
  "Final-Recipient: rfc822; sean.kang@stifel.com\nAction: failed\nStatus: 4.4.2\n" +
  "Remote-MTA: dns; smtp.gslb.stifel.com.\n" +
  "Diagnostic-Code: smtp; 550 #5.1.0 Address rejected.\n" +
  "Last-Attempt-Date: Tue, 30 Jan 2024 21:15:32 -0800 (PST)";

eq('the real Stifel bounce yields the dead address',
  box.failedRecipientsFrom_(STIFEL_BOUNCE), ['sean.kang@stifel.com']);
eq('named once, not once per mention',
  box.failedRecipientsFrom_(STIFEL_BOUNCE).length, 1);
eq('the daemon itself is never a failed recipient',
  box.failedRecipientsFrom_('mailer-daemon@googlemail.com could not reach a@b.com'), ['a@b.com']);
eq('postmaster likewise',
  box.failedRecipientsFrom_('postmaster@x.com says c@d.com failed'), ['c@d.com']);
eq('two dead addresses in one notice',
  box.failedRecipientsFrom_('failed: a@x.com and also b@y.com'), ['a@x.com', 'b@y.com']);
eq('a notice naming nobody yields nothing',
  box.failedRecipientsFrom_('Delivery failed permanently.'), []);
eq('an empty body yields nothing', box.failedRecipientsFrom_(''), []);
eq('addresses come back lowercased, as matching expects',
  box.failedRecipientsFrom_('Sean.Kang@Stifel.com failed'), ['sean.kang@stifel.com']);

eq('mailer-daemon is a bounce sender', box.isBounceSender_('mailer-daemon@googlemail.com'), true);
eq('postmaster is a bounce sender', box.isBounceSender_('POSTMASTER@x.com'), true);
eq('a banker is not', box.isBounceSender_('jamie@jpmorgan.com'), false);
eq('nothing is not', box.isBounceSender_(''), false);

/* ------------------------------------------------------------------ *
 * The install id, and what telemetry is allowed to carry.
 * ------------------------------------------------------------------ */

const props = {};
global.PropertiesService = {
  getScriptProperties: () => ({
    getProperty: (k) => (k in props ? props[k] : null),
    setProperty: (k, v) => { props[k] = v; },
  }),
};
let uuidSeed = 0;
global.Utilities.getUuid = () =>
  `0000000${++uuidSeed}-0000-4000-8000-000000000000`;

const first = box.installId_();
eq('an install id is minted on first use', /^[0-9a-f-]{36}$/.test(first), true);
eq('and never changes afterwards', box.installId_(), first);
eq('nor on a third call', box.installId_(), first);

// A copied sheet is a new install: its own properties, its own id.
for (const k of Object.keys(props)) delete props[k];
const second = box.installId_();
eq('a copied sheet mints its own id', second !== first, true);

const payload = box.telemetryPayload_(37, 44, true);
eq('telemetry carries exactly these fields and no others',
  Object.keys(payload).sort(),
  ['at', 'contacts', 'contract_version', 'courier_version', 'install_id', 'ok', 'seconds']);
eq('the contact count is a bare number', payload.contacts, 37);
eq('and the duration', payload.seconds, 44);
eq('and whether it worked', payload.ok, true);
const serialised = JSON.stringify(payload).toLowerCase();
for (const forbidden of ['@', 'name', 'subject', 'body', 'firm', 'email']) {
  eq(`telemetry carries no "${forbidden}"`, serialised.includes(forbidden), false);
}

/* ------------------------------------------------------------------ *
 * The notice channel — a timed run cannot open a dialog, so the sheet
 * itself has to carry the message.
 * ------------------------------------------------------------------ */

eq('no notice at all', box.noticeFrom_({}), null);
eq('a null notice', box.noticeFrom_({ notice: null }), null);
eq('an empty text is not a notice', box.noticeFrom_({ notice: { level: 'info', text: '  ' } }), null);
eq('an info notice',
  box.noticeFrom_({ notice: { level: 'info', text: 'Blotter is now a paid product.' } }),
  { level: 'info', text: 'Blotter is now a paid product.', url: '' });
eq('a warning notice keeps its url',
  box.noticeFrom_({ notice: { level: 'warning', text: 'Card expiring.', url: 'https://blotterib.com/billing' } }),
  { level: 'warning', text: 'Card expiring.', url: 'https://blotterib.com/billing' });
eq('a blocked notice — the one that must survive a refused run',
  box.noticeFrom_({ notice: { level: 'blocked', text: 'Your trial has ended.' } }),
  { level: 'blocked', text: 'Your trial has ended.', url: '' });
eq('an unknown level falls back to info rather than vanishing',
  box.noticeFrom_({ notice: { level: 'catastrophe', text: 'Something.' } }).level, 'info');
/* Where the notice sits, and why it is remembered rather than recomputed.
   "Just past the last used column" reads well and is wrong: once a notice is
   written there, getLastColumn() counts it, so the next run lands six columns
   further right and abandons the old message. It would have crept across the
   sheet one notice at a time, beginning with the first one that ever mattered. */
// ---------------------------------------------------------------------------
// headerRow_ — the lynchpin of the banner change.
//
// Every position on Contacts and Found is derived from this one answer, and
// the row number is the contract's join key. Get it wrong and one person's
// answers land on another person's line, silently. So it is tested against a
// fake sheet rather than trusted.
// ---------------------------------------------------------------------------
function fakeSheet(name, grid) {
  let nextId = fakeSheet.n = (fakeSheet.n || 0) + 1;
  return {
    getSheetId: () => nextId,
    getName: () => name,
    getMaxRows: () => grid.length,
    getLastColumn: () => Math.max(0, ...grid.map((r) => r.length)),
    getRange: (row, col, numRows, numCols) => ({
      getValues: () => grid.slice(row - 1, row - 1 + numRows)
        .map((r) => Array.from({ length: numCols }, (_, i) => r[col - 1 + i] ?? '')),
    }),
  };
}
{
  const H = ['Name', 'Title', 'Firm', 'Email', 'Status', 'Days', 'Last contact',
             'Attempts', 'Next call', 'Last call', 'Closed'];

  box.resetHeaderRowCache_();
  const old = fakeSheet('Contacts', [H, ['Jamie', '', 'JPM', 'j@x.com']]);
  eq('a pre-banner sheet keeps its headers on row 1', box.headerRow_(old), 1);
  eq('and its data starts on row 2', box.firstDataRow_(old), 2);

  box.resetHeaderRowCache_();
  const banner = fakeSheet('Contacts', [['Blotter — all good.'], H, ['Jamie', '', 'JPM', 'j@x.com']]);
  eq('a banner sheet finds its headers on row 2', box.headerRow_(banner), 2);
  eq('and its data starts on row 3', box.firstDataRow_(banner), 3);

  // The banner text must never itself look like a header row.
  box.resetHeaderRowCache_();
  const decoy = fakeSheet('Contacts', [['Your name and email go below'], H, ['Jamie']]);
  eq('banner prose containing header-ish words does not fool the search',
    box.headerRow_(decoy), 2);

  box.resetHeaderRowCache_();
  const found = fakeSheet('Found', [['Add?', 'Name', 'Email', 'First seen', 'Context']]);
  eq('Found is recognised by its own anchor', box.headerRow_(found), 1);

  box.resetHeaderRowCache_();
  const foundBanner = fakeSheet('Found', [['Blotter'], ['Add?', 'Name', 'Email', 'First seen', 'Context']]);
  eq('Found with a banner finds row 2', box.headerRow_(foundBanner), 2);

  // The safe default matters more than the clever answer: a sheet we do not
  // recognise must behave exactly as it did before the banner existed.
  box.resetHeaderRowCache_();
  const strange = fakeSheet('Contacts', [['nothing'], ['familiar'], ['here']]);
  eq('an unrecognised sheet falls back to row 1', box.headerRow_(strange), 1);

  box.resetHeaderRowCache_();
  const empty = fakeSheet('Contacts', [[]]);
  eq('an empty sheet falls back to row 1', box.headerRow_(empty), 1);

  // A banner pushed further down still resolves, within the search depth.
  box.resetHeaderRowCache_();
  const deep = fakeSheet('Contacts', [['a'], ['b'], H, ['Jamie']]);
  eq('headers on row 3 are still found', box.headerRow_(deep), 3);
}


eq('text is trimmed',
  box.noticeFrom_({ notice: { level: 'info', text: '  padded  ' } }).text, 'padded');

console.log(fails === 0
  ? `All ${checks} courier helper checks passed.`
  : `\n${fails} of ${checks} checks failed.`);
process.exit(fails === 0 ? 0 : 1);
