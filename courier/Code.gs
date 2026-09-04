/**
 * Blotter — the courier.
 *
 * This script lives inside the student's own Google account, bound to one
 * spreadsheet. It is deliberately dumb: it fetches mail and calendar facts,
 * POSTs them to Blotter's server in the contract's exact shape, and writes
 * the server's answer into the sheet. Every judgment lives on the server
 * (blotter-ib-ws1/docs/workstreams/ws9-build/04-ENGINE-RULES.md).
 *
 * Hard boundaries, enforced by the manifest's OAuth scopes and by this code:
 *   - Read-only on Gmail and Calendar. It never sends, drafts, labels,
 *     archives, or trashes mail, and never creates or edits a calendar event.
 *   - It never opens an attachment.
 *   - It writes only to this one spreadsheet, and only to Blotter's own
 *     columns and tabs — never to a cell the student wrote.
 *   - On any failure it writes nothing at all. A stale sheet is recoverable;
 *     a half-written one is not.
 *
 * The contract this speaks is
 * blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md, version 4.
 */

var CONTRACT_VERSION = 4;

// Which build of this script is running. Sent to the telemetry endpoint only,
// so a count of installs can be split by version when something goes wrong.
var COURIER_VERSION = '2026-09-03';
var SERVER_URL_DEFAULT = 'https://blotterib.com/api/engine';

var TAB_CONTACTS = 'Contacts';
var TAB_FOUND = 'Found';
var TAB_SETTINGS = 'Settings';

// Student-owned columns the courier reads (and, for approved Found rows only,
// fills in on brand-new rows — Jon's ruling, September 1, 2026).
var COL_NAME = 'Name';
var COL_TITLE = 'Title';
var COL_FIRM = 'Firm';
var COL_EMAIL = 'Email';

// Blotter-owned columns, recomputed every run. Names are ENGINE-RULES §9,
// exactly. The student sets Closed; Blotter only reads it.
var BLOTTER_COLUMNS = ['Status', 'Days', 'Last contact', 'Attempts', 'Next call', 'Last call'];
var COL_CLOSED = 'Closed';

// The server's channel to the student, and the constraint that decides where
// it lives: a TIMED run has no UI context, so no dialog is possible, and a
// refused run writes nothing at all. Without this a student whose access was
// withdrawn would watch the sheet quietly stop updating and conclude it broke.
//
// Row 1 of Contacts, in the columns past everything the sheet uses. Row 1 is
// frozen, so it stays on screen however far down they scroll, and it shifts
// NOTHING: data still starts at row 2 and the row number is still the
// contract's join key. A banner row above the headers would move every data
// row down one and break that key in eleven places.
var NOTICE_WIDTH = 6;
var NOTICE_STYLES = {
  info:    { fill: '#e8f0fe', text: '#1a3d6d' },
  warning: { fill: '#fdf0d5', text: '#7a4c00' },
  blocked: { fill: '#fbe3e0', text: '#8c1d12' }
};
var NOTICE_TAB_COLOUR = { info: '#4a7fd4', warning: '#d9a441', blocked: '#c0392b' };

// The only statuses the contract allows. Anything else means the response is
// bad, and a bad response means we write nothing. "Call cancelled" is the
// eighth, added with contract version 2: a declined invite used to leave a row
// reading "Call scheduled" forever for a meeting nobody would attend.
var VALID_STATUSES = ['Not emailed', 'Bounced', 'Sent', 'Replied', 'Call scheduled',
                      'Call done', 'Call cancelled', 'Closed'];

// What "no number here" looks like in the sheet, for Days and Attempts alike.
// A blank cell reads as "Blotter has not run"; a dash reads as "there is
// nothing to show here", which is what D24 wants said. An em dash, not a
// hyphen: a leading hyphen is how you start a formula.
var NO_CLOCK = '\u2014';

var FOUND_HEADERS = ['Add?', 'Name', 'Email', 'First seen', 'Context'];

var SETTING_ADDRESSES = 'Your email addresses';
var SETTING_SERVER = 'Server URL';
var SETTING_LAST_RUN = 'Last successful run';
var SETTING_WARNINGS = 'Last run warnings';
var SETTING_CAL_BACK = 'Calendar looks back (days)';
var SETTING_CAL_FORWARD = 'Calendar looks ahead (days)';
var SETTING_MAIL_BACK = 'Mail looks back (days)';
var SETTING_RUN_TOOK = 'Last run took';
var SETTING_RUN_FETCHED = 'Last run fetched';
var SETTING_GMAIL_CALLS = 'Gmail calls last run';

// The time machine (decision D17). Blank in normal use. When it holds a date,
// the courier sends THAT as `now` in the request and nothing else changes —
// the Gmail search window and the calendar fetch window still run on real
// time. `now` is already a field the contract carries, which is exactly what
// makes this possible without touching a rule.
//
// The label carries its own warning because this setting cannot be allowed to
// look like an ordinary one: a date typed in by accident produces a sheet full
// of confident nonsense that looks exactly like a working sheet.
var SETTING_PRETEND_TODAY = 'Pretend today is (TESTING - leave blank)';
var PRETEND_TODAY_HELP =
  'FOR TESTING ONLY. Leave this blank. A date here makes Blotter compute every ' +
  'row as if that were today, so Status and Days will be wrong for the real ' +
  'world. Clear the cell and run again to go back to normal.';

// Per-run measurement (13-BRIEF-COURIER-2 §2): nobody knows what a run
// actually costs until one is watched. Written to Settings on success; on
// failure it goes to the execution log instead, because a failed run writes
// nothing to the sheet.
var runMetrics_ = null;

// Calendar fetch window defaults. The server is stateless, so every run must
// carry the season's history; these are mechanical caps, not judgments, and
// the Settings tab can override them (Jon widens the look-back for his 2024
// archive test; a live student never touches it).
var EVENT_DAYS_BACK_DEFAULT = 365;
var EVENT_DAYS_FORWARD_DEFAULT = 180;

// The mail search needs the same cap. Without one, the first live run asked
// Gmail for every conversation ever involving a contact's address, reached a
// 2022 club mailing list through three contacts stored under personal gmail
// addresses, and suggested ~170 classmates in the Found tab (Jon's ruling,
// September 1, 2026, after that run). A year covers a season's history; Jon
// sets 1100 in Settings for the 2024 archive test, like the calendar pair.
var MAIL_DAYS_BACK_DEFAULT = 365;

// The hybrid cadence — Jon's ruling, September 1, 2026 (13-BRIEF-COURIER-2
// §1), and adjustable here. Apps Script timers cannot vary by time of day,
// so the trigger still fires every 15 minutes and the run decides at the top
// whether to work: between DAY_STARTS_AT_HOUR and DAY_ENDS_AT_HOUR (in the
// student's own timezone) every firing works; outside them the run exits
// immediately — about a second of trigger time and zero Gmail reads — unless
// NIGHT_EVERY_MINUTES have passed since the last worked run.
var DAY_STARTS_AT_HOUR = 7;   // 7am — first 15-minute run of the day
var DAY_ENDS_AT_HOUR = 22;    // 10pm — after this, night cadence
var NIGHT_EVERY_MINUTES = 120;

// Script-property key remembering when a run last did work. Scheduling
// bookkeeping only — it is not the sheet, so the write-nothing-on-failure
// rule is untouched.
var PROP_LAST_WORKED_MS = 'blotterLastWorkedMs';

// An anonymous id for THIS SHEET. Not a person, not an account, not an email —
// a random UUID minted once and kept in this script's own properties. A copied
// sheet mints its own on first run, which is correct: a copy is a new install.
//
// It answers one question and no others: how many separate sheets are running.
var PROP_INSTALL_ID = 'blotterInstallId';

// Where the notice was put. Remembered, because the obvious way to find the
// spot — "just past the last used column" — moves the moment a notice is
// written into it: getLastColumn() then counts the notice itself, the next run
// lands six columns further right, and the old message is left behind. It
// would have crept across the sheet one notice at a time, starting with the
// first one that ever mattered.
var PROP_NOTICE_COL = 'blotterNoticeCol';

// Telemetry goes to its OWN endpoint, and that separation is the point rather
// than a preference. The engine has no database, no logging and no file
// writes, so "the engine stores nothing" is literally true — and it can be
// checked by reading it. Putting a counter inside it would end that, and the
// claim is worth more than the convenience of one fewer request.
var TELEMETRY_URL_DEFAULT = 'https://blotterib.com/api/telemetry';
var SETTING_TELEMETRY = 'Usage counting endpoint';

// True from the first sheet write of a pass until it finishes. The
// write-nothing-on-failure promise only holds for throws before this point;
// the first live run proved a write-phase throw leaves the sheet partly
// updated, and the failure message must not claim otherwise.
var writePhaseBegun_ = false;

// Gmail search queries are built in chunks of this many addresses so no
// single query grows past what Gmail search accepts.
var ADDRESSES_PER_SEARCH = 10;

// Conversations with more recipients than this are skipped whole — not sent to
// the server, and never harvested for names. Jon's ruling, September 2, 2026
// (decision D2), and it is the real fix for the incident that produced it: a
// 2022 club listserv that one contact happened to be on made Blotter suggest
// ~170 classmates as recruiting contacts. A mail window made that rarer; this
// makes the whole class of problem impossible. Counted as distinct addresses
// across To and Cc on any single message in the conversation.
var MAX_THREAD_RECIPIENTS = 10;

// ---------------------------------------------------------------------------
// The look — extracted from web/public/film/blotter-film-web-hero.html and
// Section 02's ten-column tab, which are the ratified drawings of this sheet.
//
// Two things worth knowing before changing anything here.
//
// **The sheet is Arial, and nothing in it is monospaced.** Every number, date
// and day count on every spreadsheet surface of the website is Arial; right
// alignment does the work a monospaced face would. Arial is also Sheets' own
// default, so none of this needs a font to load.
//
// **Both themes below are ratified, and they are the site's own two drawings
// of the same idea** — not one design and one departure from it. HERO is the
// homepage hero: the header band alone carries the zone, data rows stay white,
// and a 2px grey rule marks the split (01-HERO section 8, as Jon amended it on
// August 5, 2026). ZONED is Section 02's ten-column tab: both zones filled all
// the way down, split by a 3px Blotter-yellow rule.
// ---------------------------------------------------------------------------

/**
 * Which drawing this sheet uses.
 *
 * `bands` is Jon's, ruled September 3, 2026 after seeing the zoned version on a
 * real sheet: the header bands carry the zone and the data rows stay white, but
 * the divider keeps the Blotter yellow rather than reverting to grey. It is the
 * hero's restraint with the zoned version's one strong line — *"I don't want
 * the Blotter side to have the cell highlight colour in the background… however
 * I do like the vertical bars you have that separate sections with colour."*
 */
var THEME = 'bands';

var INK = '#14181f';
var INK_MUTED = '#5f6368';
var INK_FAINT = '#a4a8ac';
var SHEET_BORDER = '#dadce0';
var BLOTTER_YELLOW = '#d9b64a';
var BLOTTER_LABEL = '#8a6d12';

var THEMES = {
  // The hero. Restrained: the header band alone says which half is whose.
  hero: {
    manualHeader: '#edf2f8',
    keptHeader: '#f7f2e8',
    manualRow: null,          // null means leave it alone — plain white
    keptRow: null,
    dividerColour: SHEET_BORDER,
    dividerWeight: 'medium'
  },
  // Jon's, and the default. White rows, tinted headers, yellow rule.
  bands: {
    manualHeader: '#edf2f8',
    keptHeader: '#f7f2e8',
    manualRow: null,
    keptRow: null,
    dividerColour: BLOTTER_YELLOW,
    dividerWeight: 'thick'
  },
  // Section 02's tab. Both zones filled top to bottom, split in Blotter yellow.
  //
  // The two data fills are DERIVED, not picked: each sits 45% of the way from
  // white to its own header tint. Keep that ratio if either is ever retuned,
  // or the two halves stop being the same idea at two strengths.
  zoned: {
    manualHeader: '#edf2f8',
    keptHeader: '#f7f2e8',
    manualRow: '#f7f9fc',
    keptRow: '#fdfaf2',
    dividerColour: BLOTTER_YELLOW,
    dividerWeight: 'thick'
  }
};

function theme_() { return THEMES[THEME] || THEMES.zoned; }

/**
 * The divider weight as a real BorderStyle.
 *
 * Kept out of the THEMES literal deliberately: top-level code runs on every
 * single execution in Apps Script, and a top-level `SpreadsheetApp.` reference
 * also makes this file unloadable by `helpers.test.js`, which is the only way
 * any of it gets tested at all.
 */
function dividerStyle_() {
  return theme_().dividerWeight === 'thick'
    ? SpreadsheetApp.BorderStyle.SOLID_THICK
    : SpreadsheetApp.BorderStyle.SOLID_MEDIUM;
}

/**
 * A fill and a text colour for every status the contract allows.
 *
 * Five come straight off the film. Three had no chip drawn because the site
 * never shows them, and are derived here rather than invented at random:
 *
 *   - `Not emailed` and `Closed` share the faintest pair on purpose. Both mean
 *     "Blotter is not doing anything on this row", and neither should draw the
 *     eye away from a row that needs something.
 *   - `Bounced` takes Google's own red, which already appears in the film.
 *   - `Call cancelled` takes the film's amber. A thing to deal with, not a
 *     failure — the same weight as a thread going quiet.
 */
var STATUS_STYLE = {
  // Nothing has been sent, and nothing is owed. No fill at all, so it recedes
  // behind every row that wants something.
  'Not emailed':    { bg: '#ffffff', fg: INK_FAINT },
  'Bounced':        { bg: '#fce8e6', fg: '#c5221f' },
  // A real state with a real fill, and darker text than the film's.
  //
  // The film's pair was #e8eaed on #5f6368, and on a live sheet Jon could not
  // read it and could not tell it from Closed or Not emailed — three greys
  // doing three different jobs. The fill deepens a step and the text goes to
  // near-ink; the other two lose their fill entirely. **Sent is now the only
  // grey with a background**, which is what makes the three legible apart.
  'Sent':           { bg: '#dfe3e8', fg: '#3c4043' },
  'Replied':        { bg: '#d7e7fb', fg: '#1a56a8' },
  'Call scheduled': { bg: '#e5ddf7', fg: '#5b3fa8' },
  'Call done':      { bg: '#d7f0dd', fg: '#1e6b34' },
  'Call cancelled': { bg: '#fbeacb', fg: '#8a5a00' },
  // Deliberately the faintest thing on the sheet. The whole row is greyed and
  // struck through besides — see closedRowRule_.
  'Closed':         { bg: '#ffffff', fg: INK_FAINT }
};

/** Column widths, in the order the Contacts headers are written. */
var CONTACTS_WIDTHS = {
  'Name': 150, 'Title': 120, 'Firm': 150, 'Email': 190,
  'Status': 132, 'Days': 62, 'Last contact': 108, 'Attempts': 82,
  'Next call': 142, 'Last call': 108, 'Closed': 72
};

var FOUND_WIDTHS = { 'Add?': 84, 'Name': 150, 'Email': 200, 'First seen': 100, 'Context': 340 };

var HEADER_ROW_HEIGHT = 30;
var BODY_ROW_HEIGHT = 26;

// ---------------------------------------------------------------------------
// The look, applied
//
// All of this is idempotent and safe to re-run: it sets appearance and never
// touches a value. Formatting is applied to whole columns rather than to the
// rows that happen to exist today, so a contact typed in tomorrow is already
// dressed correctly the moment it is typed.
// ---------------------------------------------------------------------------

/** Every column the student owns on the left, in order. */
function manualColumns_() { return [COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL]; }

function formatContacts_(sheet) {
  var t = theme_();
  var maxRows = sheet.getMaxRows();
  var body = maxRows - 1;
  if (body < 1) return;

  var col = {};
  manualColumns_().concat(BLOTTER_COLUMNS).concat([COL_CLOSED]).forEach(function (h) {
    col[h] = findColumn_(sheet, h);
    if (col[h] > 0 && CONTACTS_WIDTHS[h]) sheet.setColumnWidth(col[h], CONTACTS_WIDTHS[h]);
  });

  var lastCol = sheet.getLastColumn();
  var all = sheet.getRange(1, 1, maxRows, lastCol);
  all.setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');

  // Header band. The two zones are tinted differently and that difference is
  // the whole idea: the left is yours, the right is Blotter's.
  var header = sheet.getRange(1, 1, 1, lastCol);
  header.setFontWeight('bold').setFontColor(INK);
  sheet.setRowHeight(1, HEADER_ROW_HEIGHT);
  paintColumns_(sheet, col, manualColumns_(), 1, 1, t.manualHeader);
  paintColumns_(sheet, col, BLOTTER_COLUMNS, 1, 1, t.keptHeader);
  // Closed is the student's again, so it takes the student's tint. The sheet
  // reads yours, Blotter's, yours — which is what it actually is.
  paintColumns_(sheet, col, [COL_CLOSED], 1, 1, t.manualHeader);

  // Data rows. Under the hero theme these stay white by ratified instruction
  // (01-HERO section 8, amended August 5, 2026) and the header band alone
  // carries the zone; under the zoned theme both halves are filled all the way
  // down, as Section 02's tab draws them.
  if (t.manualRow) {
    paintColumns_(sheet, col, manualColumns_(), 2, body, t.manualRow);
    paintColumns_(sheet, col, [COL_CLOSED], 2, body, t.manualRow);
  }
  if (t.keptRow) paintColumns_(sheet, col, BLOTTER_COLUMNS, 2, body, t.keptRow);

  sheet.setRowHeights(2, body, BODY_ROW_HEIGHT);

  // Title is italic and muted — the film's `.cell.ital`. It is context, not a
  // fact about the relationship, and it should not compete with the name.
  if (col[COL_TITLE] > 0) {
    sheet.getRange(2, col[COL_TITLE], body, 1).setFontStyle('italic').setFontColor(INK_MUTED);
  }
  if (col[COL_EMAIL] > 0) sheet.getRange(2, col[COL_EMAIL], body, 1).setFontColor(INK_MUTED);

  // Numbers right, dates formatted. Nothing here is monospaced: every figure
  // on every spreadsheet surface of the website is Arial, and it is the right
  // alignment — not the face — that makes a column of numbers line up.
  ['Days', 'Attempts'].forEach(function (h) {
    if (col[h] > 0) sheet.getRange(2, col[h], body, 1).setHorizontalAlignment('right');
  });
  ['Last contact', 'Last call'].forEach(function (h) {
    if (col[h] > 0) sheet.getRange(2, col[h], body, 1).setNumberFormat('m/d/yy');
  });
  // `1/17 @ 2:00 PM`, exactly as ENGINE-RULES section 9 draws it. Before this,
  // the cell showed `2026-09-03T14:00:00-07:00`.
  if (col['Next call'] > 0) {
    sheet.getRange(2, col['Next call'], body, 1).setNumberFormat('m/d "@" h:mm AM/PM');
  }
  if (col[COL_CLOSED] > 0) {
    sheet.getRange(1, col[COL_CLOSED], maxRows, 1).setHorizontalAlignment('center');
  }

  // The zone rules. One where Blotter's half begins, one where the student's
  // resumes at Closed.
  var style = dividerStyle_();
  if (col['Status'] > 0) {
    sheet.getRange(1, col['Status'], maxRows, 1)
      .setBorder(null, true, null, null, null, null, t.dividerColour, style);
  }
  if (col[COL_CLOSED] > 0) {
    sheet.getRange(1, col[COL_CLOSED], maxRows, 1)
      .setBorder(null, true, null, null, null, null, t.dividerColour, style);
  }

  // Successive setBorder calls can drop earlier ones; a flush between the
  // structural borders and everything after is the documented remedy.
  SpreadsheetApp.flush();

  applyStatusColours_(sheet, col['Status'], maxRows);
  applyClosedRowFade_(sheet, col[COL_CLOSED], maxRows, lastCol);
  sheet.setFrozenRows(1);
  if (col[COL_NAME] > 0) sheet.setFrozenColumns(col[COL_NAME]);
}

/** Fill a set of named columns over a row span, skipping any that are absent. */
function paintColumns_(sheet, col, names, startRow, numRows, colour) {
  names.forEach(function (h) {
    if (col[h] > 0) sheet.getRange(startRow, col[h], numRows, 1).setBackground(colour);
  });
}

/**
 * The status chips.
 *
 * Conditional formatting rather than a real dropdown, and the choice is not
 * obvious. Sheets' own dropdown chips would give a genuinely rounded pill and a
 * caret for free — which is what the website is imitating in the first place —
 * but they cost two things. Sheets picks the chip's text colour itself, so the
 * exact `-fg` of each status is lost; and a dropdown on a Blotter-owned column
 * invites a student to change a value Blotter will overwrite fifteen minutes
 * later. A square cell that is always right beats a pill that lies.
 */
function applyStatusColours_(sheet, statusCol, maxRows) {
  if (!statusCol || statusCol < 1) return;
  var range = sheet.getRange(2, statusCol, maxRows - 1, 1);

  // Drop only our own rules, by target, so a student's own formatting survives.
  var keep = sheet.getConditionalFormatRules().filter(function (rule) {
    return !rule.getRanges().some(function (r) {
      return r.getColumn() === statusCol;
    });
  });

  VALID_STATUSES.forEach(function (status) {
    var style = STATUS_STYLE[status];
    if (!style) return;
    keep.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(status)
      .setBackground(style.bg)
      .setFontColor(style.fg)
      .setRanges([range])
      .build());
  });
  sheet.setConditionalFormatRules(keep);
  range.setHorizontalAlignment('center');
}

/**
 * A closed contact fades into the background, whole row.
 *
 * Jon's, September 3, 2026: *"when you tick closed for a contact that whole row
 * kind of greys out or gets a strike through so it's more in the background."*
 *
 * Struck through **and** faded, not one or the other: the strike says the
 * relationship is finished, the fade stops it competing with the rows that
 * still want something. Conditional formatting can do both — it cannot change
 * a fill and a font in separate rules on the same range without one winning,
 * so both live on this one rule, and it is pushed last so it sits over the
 * status colour on that row.
 */
function applyClosedRowFade_(sheet, closedCol, maxRows, lastCol) {
  if (!closedCol || closedCol < 1) return;
  var letter = columnLetter_(closedCol);
  var range = sheet.getRange(2, 1, maxRows - 1, lastCol);
  var rules = sheet.getConditionalFormatRules();
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    // $ locks the column, the bare row stays relative to the range's first row.
    .whenFormulaSatisfied('=$' + letter + '2=TRUE')
    .setFontColor(INK_FAINT)
    .setStrikethrough(true)
    .setRanges([range])
    .build());
  sheet.setConditionalFormatRules(rules);
}

/** A1 column letter for a 1-based index. Sheets has no built-in for this. */
function columnLetter_(index) {
  var letter = '';
  var n = index;
  while (n > 0) {
    var rem = (n - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    n = Math.floor((n - 1) / 26);
  }
  return letter;
}

function formatFound_(sheet) {
  var maxRows = sheet.getMaxRows();
  var body = maxRows - 1;
  if (body < 1) return;
  var lastCol = Math.max(sheet.getLastColumn(), FOUND_HEADERS.length);

  FOUND_HEADERS.forEach(function (h) {
    var c = findColumn_(sheet, h);
    if (c > 0 && FOUND_WIDTHS[h]) sheet.setColumnWidth(c, FOUND_WIDTHS[h]);
  });

  sheet.getRange(1, 1, maxRows, lastCol).setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');
  sheet.getRange(1, 1, 1, lastCol).setFontWeight('bold').setFontColor(INK).setBackground(theme_().keptHeader);
  sheet.setRowHeight(1, HEADER_ROW_HEIGHT);
  sheet.setRowHeights(2, body, BODY_ROW_HEIGHT);
  sheet.setFrozenRows(1);

  // Found is Blotter's suggestion and the student's decision, so the one column
  // they act in is the one that gets emphasis.
  var addCol = findColumn_(sheet, 'Add?');
  if (addCol > 0) {
    sheet.getRange(2, addCol, body, 1).setHorizontalAlignment('center').setFontWeight('bold');
  }
  ['Context'].forEach(function (h) {
    var c = findColumn_(sheet, h);
    if (c > 0) sheet.getRange(2, c, body, 1).setWrap(true).setFontColor(INK_MUTED);
  });
  var seen = findColumn_(sheet, 'First seen');
  if (seen > 0) sheet.getRange(2, seen, body, 1).setNumberFormat('m/d/yy').setFontColor(INK_MUTED);

  // Added reads settled, Ignored reads spent, Yes and No read as decisions
  // waiting to be acted on.
  var keep = sheet.getConditionalFormatRules().filter(function (rule) {
    return !rule.getRanges().some(function (r) { return r.getColumn() === addCol; });
  });
  if (addCol > 0) {
    var r = sheet.getRange(2, addCol, body, 1);
    [['Yes', '#d7f0dd', '#1e6b34'], ['No', '#e8eaed', INK_MUTED],
     ['Added', '#f7f2e8', BLOTTER_LABEL], ['Ignored', '#f8f9fa', INK_FAINT]
    ].forEach(function (spec) {
      keep.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(spec[0]).setBackground(spec[1]).setFontColor(spec[2])
        .setRanges([r]).build());
    });
  }
  sheet.setConditionalFormatRules(keep);
}

function formatSettings_(sheet) {
  var maxRows = sheet.getMaxRows();
  sheet.setColumnWidth(1, 260);
  sheet.setColumnWidth(2, 330);
  if (sheet.getMaxColumns() >= 3) sheet.setColumnWidth(3, 520);
  sheet.getRange(1, 1, maxRows, Math.max(3, sheet.getLastColumn()))
    .setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');
  sheet.getRange(1, 1, maxRows, 1).setFontWeight('bold').setFontColor(INK);
  sheet.getRange(1, 2, maxRows, 1).setFontColor(INK);
  if (sheet.getMaxColumns() >= 3) {
    sheet.getRange(1, 3, maxRows, 1).setFontColor(INK_MUTED).setWrap(true);
  }
  sheet.setRowHeights(1, maxRows, BODY_ROW_HEIGHT);

  // The rows Blotter writes are readings, not settings, and should not look
  // like something to fill in.
  [SETTING_LAST_RUN, SETTING_WARNINGS, SETTING_RUN_TOOK, SETTING_RUN_FETCHED,
   SETTING_GMAIL_CALLS].forEach(function (label) {
    var row = settingRow_(sheet, label);
    if (row > 0) sheet.getRange(row, 1, 1, 2).setFontColor(INK_MUTED);
  });

  // The time machine is the one setting that can quietly falsify the whole
  // sheet, so it is marked as loud as a spreadsheet allows.
  var pretend = settingRow_(sheet, SETTING_PRETEND_TODAY);
  if (pretend > 0) {
    sheet.getRange(pretend, 1, 1, 3).setBackground('#fce8e6');
    sheet.getRange(pretend, 1).setFontColor('#c5221f');
    sheet.getRange(pretend, 3).setFontColor('#c5221f');
  }
}

/** The row a setting's label sits on, or 0. */
function settingRow_(sheet, label) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;
  var labels = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (var i = 0; i < labels.length; i++) {
    if (String(labels[i][0]).trim() === label) return i + 1;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// The Instructions tab
//
// Jon's constraint, and it governs every line of this: "I can't scroll down to
// row nine hundred to read this." So it is one narrow column of prose, roughly
// a screen and a half, and it earns every row.
//
// It is rebuilt from scratch each time rather than patched, because a document
// half-updated is worse than one rewritten — and nothing in it is the
// student's, so nothing can be lost.
// ---------------------------------------------------------------------------

var TAB_INSTRUCTIONS = 'Start here';

/** One row of the document. `k` is its kind; `formatInstructions_` styles it. */
function instructionRows_() {
  var R = function (k, a, b) { return { k: k, a: a, b: b || '' }; };
  return [
    R('title', 'Blotter'),
    R('deck', 'You manage the relationships. Blotter maintains the moving parts.'),
    R('gap'),

    R('h2', 'The one thing to understand'),
    R('strong', 'Blotter never edits your columns on the left — Name, Title, Firm, Email. You never have to touch the right — Status, Days, Last contact, Attempts, Next call, Last call.'),
    R('body', 'You type in who you are networking with. Blotter reads your Gmail and Calendar every 15 minutes and keeps the right-hand side current.'),
    R('note', 'Add any columns you like on the left — LinkedIn, Notes, where you met, anything. Put them anywhere. Blotter finds its own columns by their headings, not by position, so your own columns can sit wherever suits you and it will not touch them.'),
    R('gap'),

    R('h2', 'Set up steps'),
    R('step', '1.  Settings tab → “Your email addresses”. Put in every address you send recruiting email from, separated by commas.'),
    R('note', 'Most people have one and are done. Add more only if you send from several addresses that all arrive in this one inbox — a university address you reply as, or a second “send mail as” alias. Blotter can only read the inbox it is installed in, so a genuinely separate account will not work. Miss an address you actually send from and every row on those threads reads wrong.'),
    R('step', '2.  File → Settings → Time zone → set it to where you live. Day counts turn over at midnight in whatever this says, and a copied sheet keeps the time zone of whoever built it.'),
    R('step', '3.  Contacts tab → add the people you are networking with. Name and Email are the only two that matter.'),
    R('step', '4.  Blotter menu → Start automatic updates. That is the whole setup.'),
    R('note', 'Paste email addresses rather than typing them where you can. A hyphen your keyboard autocorrects is not the hyphen an email address uses, and Blotter will not be able to read it.'),
    R('slot', '[ screenshot: the Blotter menu open ]'),
    R('gap'),

    R('h2', 'What the statuses mean'),
    R('status', 'Not emailed', 'They are in your tracker. No outreach has been sent yet.'),
    R('status', 'Sent', 'You wrote last. No response yet.'),
    R('status', 'Replied', 'They wrote last. The ball is yours.'),
    R('status', 'Call scheduled', 'There is a calendar event with them coming up.'),
    R('status', 'Call done', 'The call happened and nobody has written an email since — usually means you owe a thank-you.'),
    R('status', 'Call cancelled', 'Someone declined the call invite. Clears as soon as either of you sends a new email.'),
    R('status', 'Bounced', 'That address does not work. Find another one.'),
    R('status', 'Closed', 'You ticked Closed to signify the correspondence has naturally resolved — usually a coffee chat happened, you sent the thank-you, and nothing further is expected. Blotter leaves the row alone and fades it out of the way.'),
    R('gap'),

    R('h2', 'The two numbers'),
    R('body', 'Days — how long it has been since the last thing that actually happened on that contact. Which thing depends on the state: on Sent it counts from the email you sent, on Replied from the one they sent, on Call done from the call itself.'),
    R('body', 'Attempts — how many times you have written since they last wrote back. In other words, how many times you have bumped the thread.'),
    R('note', 'Both show a dash where there is nothing to count. Blotter never tells you when to follow up: it shows you what is true and how long it has been true, and you decide.'),
    R('gap'),

    R('h2', 'Sorting'),
    R('body', 'Blotter menu → Sort contacts. Three ways: by what each contact is waiting on, by title from most junior, or grouped by firm.'),
    R('note', 'Sorting moves whole rows and keeps everything you typed, including your own columns and any formulas in them.'),
    R('gap'),

    R('h2', 'The Found tab'),
    R('body', 'When somebody new turns up in a conversation with one of your contacts — a colleague copied in, an assistant replying — Blotter puts them in Found rather than adding them to the Contacts tab.'),
    R('step', 'Yes  →  they become a contact on the next run.'),
    R('step', 'No   →  never suggested again.'),
    R('warn', 'Do not delete a row marked Ignored. That row is the memory that you said no. Delete it and they come back.'),
    R('slot', '[ screenshot: the Found tab with the Yes/No dropdown open ]'),
    R('gap'),

    R('h2', 'When something looks wrong'),
    R('status', 'Stuck on Not emailed', 'Blotter cannot read that email address. Settings → Last run warnings names the row.'),
    R('status', 'Nothing is updating', 'Check Settings → Last successful run. If it is old, run Blotter → Step 2 by hand and read the message.'),
    R('status', 'Every row looks wrong', 'Check that Settings → “Pretend today is” is empty. It is a testing setting.'),
    R('gap'),

    R('h2', 'What Blotter never does'),
    R('body', 'Never sends email. Never replies. Never edits or deletes anything in your inbox. Never creates or changes a calendar event.'),
    R('strong', 'It only reads, and it only reads conversations that already involve someone in your Contacts tab.')
  ];
}

function buildInstructions_(ss) {
  var sheet = ss.getSheetByName(TAB_INSTRUCTIONS);
  if (!sheet) sheet = ss.insertSheet(TAB_INSTRUCTIONS, 0);
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(1);
  sheet.clear();
  sheet.clearFormats();

  var rows = instructionRows_();
  var values = rows.map(function (r) { return ['', r.a, r.b]; });
  sheet.getRange(1, 1, values.length, 3).setValues(values);

  sheet.setColumnWidth(1, 46);   // a left margin, so the text is not jammed on the edge
  sheet.setColumnWidth(2, 300);
  sheet.setColumnWidth(3, 560);
  sheet.getRange(1, 1, sheet.getMaxRows(), 4)
    .setFontFamily('Arial').setBackground('#ffffff').setVerticalAlignment('middle');
  sheet.setHiddenGridlines(true);

  formatInstructions_(sheet, rows);
  sheet.getRange('A1').activate();
}

/**
 * Styles each row by kind. Kept separate so the words and the look can be read
 * apart.
 *
 * ⚠ **A merged cell with wrapped text does not grow to fit.** Sheets cannot
 * compute the height, so it clips — silently, with no error. Every prose row
 * here is merged, so the heights below are set by hand with slack.
 * **Lengthening a line in `instructionRows_` without raising its height will
 * cut the sentence off**, and nothing will tell you.
 */
function formatInstructions_(sheet, rows) {
  rows.forEach(function (r, i) {
    var row = i + 1;
    var label = sheet.getRange(row, 2);
    var text = sheet.getRange(row, 3);
    var span = sheet.getRange(row, 2, 1, 2);

    if (r.k === 'title') {
      span.merge().setValue(r.a).setFontSize(26).setFontWeight('bold').setFontColor(INK);
      sheet.setRowHeight(row, 46);
    } else if (r.k === 'deck') {
      span.merge().setValue(r.a).setFontSize(13).setFontColor(INK_MUTED);
      sheet.setRowHeight(row, 26);
    } else if (r.k === 'h2') {
      span.merge().setValue(r.a).setFontSize(13).setFontWeight('bold').setFontColor(BLOTTER_LABEL);
      sheet.setRowHeight(row, 38);
      sheet.getRange(row, 2, 1, 2).setBorder(null, null, true, null, null, null, BLOTTER_YELLOW, SpreadsheetApp.BorderStyle.SOLID);
    } else if (r.k === 'status') {
      // A live chip in its real colours, so the legend can never drift from
      // the sheet it explains.
      var style = STATUS_STYLE[r.a] || { bg: '#f8f9fa', fg: INK_MUTED };
      label.setValue(r.a).setBackground(style.bg).setFontColor(style.fg)
        .setFontSize(10).setHorizontalAlignment('center').setFontWeight('bold');
      text.setValue(r.b).setFontSize(11).setFontColor(INK).setWrap(true);
      sheet.setRowHeight(row, 30);
    } else if (r.k === 'strong') {
      span.merge().setValue(r.a).setFontSize(11).setFontWeight('bold').setFontColor(INK).setWrap(true);
      sheet.setRowHeight(row, 40);
    } else if (r.k === 'note') {
      span.merge().setValue(r.a).setFontSize(11).setFontColor(INK_MUTED).setWrap(true);
      sheet.setRowHeight(row, 62);
    } else if (r.k === 'warn') {
      span.merge().setValue(r.a).setFontSize(11).setFontColor('#8a5a00').setBackground('#fbeacb').setWrap(true);
      sheet.setRowHeight(row, 52);
    } else if (r.k === 'slot') {
      span.merge().setValue(r.a).setFontSize(10).setFontColor(INK_FAINT)
        .setHorizontalAlignment('center').setBackground('#f8f9fa')
        .setBorder(true, true, true, true, null, null, '#e8eaed', SpreadsheetApp.BorderStyle.DASHED);
      sheet.setRowHeight(row, 40);
    } else if (r.k === 'gap') {
      sheet.setRowHeight(row, 14);
    } else {
      span.merge().setValue(r.a).setFontSize(11).setFontColor(INK).setWrap(true);
      sheet.setRowHeight(row, r.k === 'step' ? 30 : 46);
      if (r.k === 'step') sheet.getRange(row, 2, 1, 2).setFontColor(INK);
    }
  });
}

// ---------------------------------------------------------------------------
// Sorting
//
// Jon's, September 3, 2026. Three ways to reorder Contacts: by seniority, by
// firm, and by what each relationship currently wants from you.
//
// **These sort the sheet natively rather than reading values and writing them
// back.** A read-write round trip would silently replace any formula a student
// had put in one of their own cells with the value it happened to evaluate to
// that morning. `Sheet.sort()` moves whole rows and keeps formulas, formatting
// and validation intact.
//
// The mechanism is a scratch column past the last used one: write a rank, sort
// on it, clear it. Row 1 is frozen, so it stays put.
// ---------------------------------------------------------------------------

/**
 * Seniority, junior first — Jon's order: analyst, associate, VP, MD.
 *
 * Titles are free text a student typed, so this matches on substrings and
 * checks the most specific first: `Senior Vice President` must not be read as
 * an analyst because it ends in a word this list also contains. Anything
 * unrecognised sorts to the bottom rather than being guessed at.
 */
function titleRank_(title) {
  var t = String(title || '').toLowerCase();
  if (t === '') return 90;
  if (/managing\s*director|\bmd\b/.test(t)) return 40;
  if (/vice\s*president|\bvp\b|\bsvp\b|\bevp\b/.test(t)) return 30;
  if (/associate/.test(t)) return 20;
  if (/analyst/.test(t)) return 10;
  if (/partner|director|principal|head\b/.test(t)) return 35;
  if (/intern/.test(t)) return 5;
  return 80;
}

/**
 * Jon's order, ruled September 3, 2026: replied, sent, not emailed, calls done,
 * calls scheduled, closed.
 *
 * It groups by **kind of thing** rather than by urgency — every email state
 * together, then every call state, then the finished ones — and reading a
 * tracker that way turns out to be how a person actually thinks about it.
 *
 * Two statuses he did not name are slotted into the group they belong to
 * rather than appended at the end: `Bounced` is an outcome of sending, so it
 * follows the email states; `Call cancelled` is a call state, so it joins those.
 *
 * *Superseded:* an earlier ordering by what you owe, which put `Call done`
 * second on the grounds that a thank-you is outstanding. Jon preferred his.
 */
function stateRank_(status) {
  var order = {
    'Replied': 10,          // they wrote last
    'Sent': 20,             // you wrote last
    'Not emailed': 30,      // nothing sent
    'Bounced': 40,          // sent, and it failed
    'Call done': 50,        // a call happened
    'Call scheduled': 60,   // a call is coming
    'Call cancelled': 70,   // a call was called off
    'Closed': 80            // finished
  };
  var r = order[String(status || '').trim()];
  return r === undefined ? 75 : r;
}

function sortContactsByTitle() { sortContacts_('title'); }
function sortContactsByFirm()  { sortContacts_('firm'); }
function sortContactsByState() { sortContacts_('state'); }

function sortContacts_(mode) {
  var lock = LockService.getScriptLock();
  // A run may be mid-write. Sorting underneath one would hand Blotter's answers
  // to the wrong people, so this waits for it rather than racing it.
  if (!lock.tryLock(30000)) {
    SpreadsheetApp.getUi().alert('Blotter is updating right now. Try again in a moment.');
    return;
  }
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(TAB_CONTACTS);
    if (!sheet) throw new Error('The "' + TAB_CONTACTS + '" tab is missing.');

    var cols = {
      name: findColumn_(sheet, COL_NAME),
      title: findColumn_(sheet, COL_TITLE),
      firm: findColumn_(sheet, COL_FIRM),
      email: findColumn_(sheet, COL_EMAIL),
      status: findColumn_(sheet, 'Status'),
      days: findColumn_(sheet, 'Days'),
      closed: findColumn_(sheet, COL_CLOSED)
    };
    var lastRow = sheet.getLastRow();
    if (lastRow < 3) return;   // nothing to reorder

    var lastCol = sheet.getLastColumn();
    var scratch = lastCol + 1;
    var height = lastRow - 1;
    var data = sheet.getRange(2, 1, height, lastCol).getValues();

    var keys = data.map(function (row) {
      var name = cols.name > 0 ? String(row[cols.name - 1]).trim() : '';
      var email = cols.email > 0 ? String(row[cols.email - 1]).trim() : '';
      // Blank rows keep to the bottom whatever the sort.
      if (name === '' && email === '') return ['￿'];

      var title = cols.title > 0 ? row[cols.title - 1] : '';
      var firm = cols.firm > 0 ? String(row[cols.firm - 1]).trim().toLowerCase() : '';
      var status = cols.status > 0 ? row[cols.status - 1] : '';
      // Longest-waiting first inside any group, which is the order
      // ENGINE-RULES §4 asks for. A dash is not a number and sorts last.
      var days = cols.days > 0 ? Number(row[cols.days - 1]) : NaN;
      var stale = isNaN(days) ? 0 : 9999 - days;

      if (mode === 'title') return [pad_(titleRank_(title)), firm, name.toLowerCase()];
      if (mode === 'firm') return [firm || '￾', pad_(titleRank_(title)), name.toLowerCase()];
      return [pad_(stateRank_(status)), pad_(stale), name.toLowerCase()];
    });

    sheet.getRange(2, scratch, height, 1)
      .setValues(keys.map(function (k) { return [k.join('|')]; }));
    sheet.sort(scratch, true);
    sheet.getRange(2, scratch, height, 1).clearContent();

    syncClosedCheckboxes_({ sheet: sheet, cols: cols });
    SpreadsheetApp.getUi().alert('Sorted by ' + {
      title: 'title, most junior first',
      firm: 'firm',
      state: 'what each contact is waiting on, most owed first'
    }[mode] + '.');
  } finally {
    lock.releaseLock();
  }
}

/** Zero-padded so a text sort orders numbers correctly. */
function pad_(n) {
  var s = String(Math.max(0, Math.round(n)));
  while (s.length < 5) s = '0' + s;
  return s;
}

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Blotter')
    .addItem('Step 1: Set up this sheet', 'setupSheet')
    .addItem('Step 2: Run once now', 'runNow')
    .addSeparator()
    .addItem('Start automatic updates (every 15 min)', 'startAutomaticUpdates')
    .addItem('Stop automatic updates', 'stopAutomaticUpdates')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('Sort contacts')
      .addItem('By what they are waiting on', 'sortContactsByState')
      .addItem('By title (analyst first)', 'sortContactsByTitle')
      .addItem('By firm', 'sortContactsByFirm'))
    .addSeparator()
    .addItem('Clear this sheet to hand to someone', 'prepareForHandover')
    .addToUi();
}

// ---------------------------------------------------------------------------
// Setup — builds the template tabs. Idempotent: it only adds what is missing
// and never overwrites anything already in the sheet.
// ---------------------------------------------------------------------------

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Contacts: the student's columns, then Blotter's, then Closed (§9).
  var contacts = ss.getSheetByName(TAB_CONTACTS);
  if (!contacts) {
    contacts = ss.insertSheet(TAB_CONTACTS, 0);
  }
  var wantedHeaders = [COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL]
    .concat(BLOTTER_COLUMNS)
    .concat([COL_CLOSED]);
  ensureHeaders_(contacts, wantedHeaders);
  contacts.setFrozenRows(1);

  // Closed is a checkbox column so nobody has to remember magic words — but
  // only on rows that hold a person. Painting the whole column was the cause
  // of the row-996 bug: an unticked checkbox stores FALSE, FALSE counts as
  // content, and `getLastRow()` then reports ~995 on an almost-empty sheet.
  // It also made a blank sheet look like clutter. Ruled by Jon (D25).
  syncClosedCheckboxes_({
    sheet: contacts,
    cols: {
      name: findColumn_(contacts, COL_NAME),
      email: findColumn_(contacts, COL_EMAIL),
      closed: findColumn_(contacts, COL_CLOSED)
    }
  });
  // Date-ish Blotter columns display like the examples in §9 (1/16/26).
  ['Last contact'].forEach(function (name) {
    var c = findColumn_(contacts, name);
    if (c > 0 && contacts.getMaxRows() > 1) {
      contacts.getRange(2, c, contacts.getMaxRows() - 1, 1).setNumberFormat('m/d/yy');
    }
  });

  // Found: new people awaiting approval.
  var found = ss.getSheetByName(TAB_FOUND);
  if (!found) {
    found = ss.insertSheet(TAB_FOUND);
  }
  ensureHeaders_(found, FOUND_HEADERS);
  found.setFrozenRows(1);
  var addCol = findColumn_(found, 'Add?');
  if (addCol > 0 && found.getMaxRows() > 1) {
    // The student only ever picks Yes or No. The script rewrites the cell to
    // Added or Ignored afterwards so it is visible that it acted.
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Yes', 'No', 'Added', 'Ignored'], true)
      .setAllowInvalid(true)
      .setHelpText('Pick Yes to add this person to Contacts, or No to never see them again.')
      .build();
    found.getRange(2, addCol, found.getMaxRows() - 1, 1).setDataValidation(rule);
  }

  // Settings: addresses, server URL, and the quiet last-run timestamp.
  var settings = ss.getSheetByName(TAB_SETTINGS);
  if (!settings) {
    settings = ss.insertSheet(TAB_SETTINGS);
  }
  ensureSettingRow_(settings, SETTING_ADDRESSES, '');
  ensureSettingRow_(settings, SETTING_SERVER, SERVER_URL_DEFAULT);
  ensureSettingRow_(settings, SETTING_LAST_RUN, '');
  ensureSettingRow_(settings, SETTING_WARNINGS, '');
  ensureSettingRow_(settings, SETTING_CAL_BACK, EVENT_DAYS_BACK_DEFAULT);
  ensureSettingRow_(settings, SETTING_CAL_FORWARD, EVENT_DAYS_FORWARD_DEFAULT);
  ensureSettingRow_(settings, SETTING_MAIL_BACK, MAIL_DAYS_BACK_DEFAULT);
  ensureSettingRow_(settings, SETTING_RUN_TOOK, '');
  ensureSettingRow_(settings, SETTING_RUN_FETCHED, '');
  ensureSettingRow_(settings, SETTING_GMAIL_CALLS, '');
  ensureSettingRow_(settings, SETTING_TELEMETRY, TELEMETRY_URL_DEFAULT,
    'Counts how many sheets are running. Sends a random id for this sheet and ' +
    'a number of contacts — never a name, address, subject or message. Clear ' +
    'this cell to switch it off.');
  ensureSettingRow_(settings, SETTING_PRETEND_TODAY, '', PRETEND_TODAY_HELP);
  settings.autoResizeColumn(1);

  // The look, and the document that explains it. Both are rebuilt every time
  // Step 1 runs, which is also how a sheet made before an update catches up.
  formatContacts_(contacts);
  formatFound_(found);
  formatSettings_(settings);
  buildInstructions_(ss);

  // The spreadsheet's timezone travels with a copy, and it is what decides
  // when a day turns over (ENGINE-RULES §4). A student in New York working
  // from a template built in Chicago inherits Chicago and every Days value is
  // wrong at the boundary — silently, and in a way that looks completely
  // normal. Nothing else in the product would ever mention it.
  var tz = ss.getSpreadsheetTimeZone();

  SpreadsheetApp.getUi().alert(
    'Blotter is set up.\n\n' +
    'This sheet\'s time zone is ' + tz + '. Day counts turn over at midnight ' +
    'there, so if that is not where you live, change it now: ' +
    'File → Settings → Time zone. A copied sheet keeps the time zone of ' +
    'whoever built it.\n\n' +
    'Read the "' + TAB_INSTRUCTIONS + '" tab first — it is four steps.\n\n' +
    'The short version: put every address you send email from into Settings → "' +
    SETTING_ADDRESSES + '", set File → Settings → Time zone to where you live, ' +
    'add a few people to Contacts, then Blotter → Step 2: Run once now.'
  );
}

/**
 * Everything Step 1 creates. A sheet missing any of it was built by an older
 * version of this script.
 */
function expectedSetup_() {
  return {
    tabs: [TAB_CONTACTS, TAB_FOUND, TAB_SETTINGS, TAB_INSTRUCTIONS],
    settings: [SETTING_ADDRESSES, SETTING_SERVER, SETTING_LAST_RUN, SETTING_WARNINGS,
               SETTING_CAL_BACK, SETTING_CAL_FORWARD, SETTING_MAIL_BACK,
               SETTING_RUN_TOOK, SETTING_RUN_FETCHED, SETTING_GMAIL_CALLS,
               SETTING_PRETEND_TODAY]
  };
}

/**
 * What this sheet is missing, if anything.
 *
 * **This exists because of a real failure.** Jon pasted a newer script into an
 * older sheet, and the `Pretend today is` row simply never appeared — the code
 * was new, the sheet was old, and nothing said so. Every student on an update
 * path hits exactly that, silently lacking whatever the update added.
 *
 * `ensureSettingRow_` is idempotent, so the remedy is always the same and
 * always safe: run Step 1 again.
 */
function missingSetup_(ss) {
  var want = expectedSetup_();
  var missing = [];
  want.tabs.forEach(function (name) {
    if (!ss.getSheetByName(name)) missing.push('the "' + name + '" tab');
  });
  var settings = ss.getSheetByName(TAB_SETTINGS);
  if (settings) {
    want.settings.forEach(function (label) {
      if (settingRow_(settings, label) === 0) missing.push('the "' + label + '" setting');
    });
  }
  return missing;
}

/**
 * Empty this sheet so it can be handed to somebody else.
 *
 * The install guide says to share a master and have each student take a copy.
 * Jon's master holds fifty-eight real contacts, so every copy carried real
 * bankers' names and addresses to a stranger — **a privacy problem before it is
 * a confusing one.**
 *
 * This clears rather than copies on purpose: the script's only Drive scope is
 * `spreadsheets.currentonly`, so it cannot create a file even if it wanted to,
 * and adding a Drive scope to save one menu click would widen what every
 * student has to grant. Clear here, then File → Make a copy.
 */
function prepareForHandover() {
  var ui = SpreadsheetApp.getUi();
  var answer = ui.alert(
    'Clear this sheet?',
    'This deletes every contact and every Found row in THIS sheet, so it can be ' +
    'handed to someone else.\n\n' +
    'Your own tracker is whichever sheet you use day to day. If this is that ' +
    'sheet, press No.\n\n' +
    'Nothing in Gmail or Calendar is touched, ever.',
    ui.ButtonSet.YES_NO);
  if (answer !== ui.Button.YES) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  [TAB_CONTACTS, TAB_FOUND].forEach(function (name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) return;
    var last = sheet.getLastRow();
    if (last > 1) sheet.getRange(2, 1, last - 1, sheet.getMaxColumns()).clear();
  });
  var settings = ss.getSheetByName(TAB_SETTINGS);
  if (settings) {
    [SETTING_ADDRESSES, SETTING_LAST_RUN, SETTING_WARNINGS, SETTING_RUN_TOOK,
     SETTING_RUN_FETCHED, SETTING_GMAIL_CALLS, SETTING_PRETEND_TODAY
    ].forEach(function (label) {
      var row = settingRow_(settings, label);
      if (row > 0) settings.getRange(row, 2).setValue('');
    });
  }
  PropertiesService.getScriptProperties().deleteProperty(PROP_LAST_WORKED_MS);

  ui.alert('Cleared.\n\nNow use File → Make a copy, and send that copy on. ' +
           'The new owner runs Blotter → Step 1 in their own copy.');
}

/**
 * Checkboxes on the `Closed` column of every row that holds a person, and on
 * no other row.
 *
 * **Why here and not on edit.** An `onEdit` trigger would put a checkbox under
 * the student's cursor the instant they type a name, which is nicer — but it
 * needs its own installable trigger, another authorisation, and it does not
 * run at all for rows Blotter itself appends. Doing it in the write phase (and
 * in setup) covers every path with no new permissions: a row typed by hand
 * gets its checkbox within one run, and a row Blotter appends gets it in the
 * same breath.
 *
 * **It also cleans up.** A sheet built before this fix carries about a thousand
 * unticked boxes; this clears the validation and the stored FALSE from every
 * row with no person on it, which is what removes the cause of the row-996
 * bug rather than working around it.
 *
 * A ticked box on a row with a person is never touched.
 */
/**
 * Where the notice goes: row 1, immediately after the last column the sheet
 * actually uses.
 *
 * Past `Closed` per the ruling, but past the last *used* header rather than a
 * fixed offset, because a student may have added their own columns after it —
 * `findColumn_` locates everything by header text precisely so they can.
 */
function noticeStartColumn_(closedCol, lastColumn, stored) {
  // A remembered spot is reused as long as it is still past `Closed`, so the
  // notice stays where the student last saw it. Only the first placement — or
  // one invalidated by the sheet's columns changing — is computed.
  if (stored && stored > closedCol) return stored;
  return Math.max(closedCol, lastColumn) + 1;
}

function noticeRange_(sheet) {
  var props = PropertiesService.getScriptProperties();
  var closedCol = findColumn_(sheet, COL_CLOSED);
  var stored = Number(props.getProperty(PROP_NOTICE_COL) || 0);
  var start = noticeStartColumn_(closedCol, sheet.getLastColumn(), stored);
  if (start !== stored) props.setProperty(PROP_NOTICE_COL, String(start));
  if (start + NOTICE_WIDTH - 1 > sheet.getMaxColumns()) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(),
      start + NOTICE_WIDTH - 1 - sheet.getMaxColumns());
  }
  return sheet.getRange(1, start, 1, NOTICE_WIDTH);
}

/**
 * Show the server's message, or clear the space when there is none.
 *
 * Called on every run including refused ones, so a notice that has been
 * withdrawn disappears rather than lingering as a message that is no longer
 * true.
 */
function writeNotice_(sheet, notice) {
  var range = noticeRange_(sheet);
  try { range.breakApart(); } catch (e) { /* not merged yet */ }
  range.clearContent().clearNote();
  range.setBackground(null).setFontColor(null).setFontWeight('normal');

  if (!notice || !notice.text) {
    try { sheet.setTabColor(null); } catch (e) { /* older sheets */ }
    return false;
  }

  var level = NOTICE_STYLES[notice.level] ? notice.level : 'info';
  var style = NOTICE_STYLES[level];
  var text = String(notice.text);
  if (notice.url) text += '   ' + notice.url;

  range.merge();
  range.setValue(text)
    .setBackground(style.fill)
    .setFontColor(style.text)
    .setFontWeight(level === 'blocked' ? 'bold' : 'normal')
    .setFontSize(11)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left')
    .setWrap(true);
  // Visible from any tab, not only this one.
  try { sheet.setTabColor(NOTICE_TAB_COLOUR[level]); } catch (e) { /* older sheets */ }
  return true;
}

/** The notice on a response, if it carries one worth showing. */
function noticeFrom_(response) {
  var n = response && response.notice;
  if (!n || typeof n !== 'object') return null;
  var text = n.text === null || n.text === undefined ? '' : String(n.text).trim();
  if (text === '') return null;
  return {
    level: NOTICE_STYLES[n.level] ? n.level : 'info',
    text: text,
    url: n.url ? String(n.url) : ''
  };
}

/**
 * This sheet's anonymous install id, minted once and kept forever.
 *
 * `Utilities.getUuid()` is random — it is derived from nothing about the
 * student, so it cannot be reversed into a person even in principle.
 */
function installId_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty(PROP_INSTALL_ID);
  if (!id) {
    id = Utilities.getUuid();
    props.setProperty(PROP_INSTALL_ID, id);
  }
  return id;
}

/**
 * Everything telemetry is allowed to know, built in one place so the whole
 * list can be read at a glance.
 *
 * **It carries counts and nothing else. No name, no address, no subject, no
 * body, no firm — nothing a person could be recognised from.** If a future
 * change wants to add a field here, that is the moment to stop and ask whether
 * it belongs, because this function is the entire boundary.
 */
function telemetryPayload_(contactCount, seconds, ok) {
  return {
    install_id: installId_(),
    contract_version: CONTRACT_VERSION,
    courier_version: COURIER_VERSION,
    at: toIso_(new Date()),
    contacts: contactCount,
    seconds: seconds,
    ok: !!ok
  };
}

/**
 * Fire and forget, and the forgetting is deliberate: a dead counter must never
 * stop a student's sheet from updating. Every failure path here is swallowed.
 */
function sendTelemetry_(url, payload) {
  if (!url) return;
  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      followRedirects: true
    });
  } catch (e) {
    // Counting is not the student's problem.
  }
}

function syncClosedCheckboxes_(sheetState) {
  var sheet = sheetState.sheet;
  var closedCol = sheetState.cols.closed;
  var nameCol = sheetState.cols.name;
  var emailCol = sheetState.cols.email;
  if (!closedCol || !nameCol || !emailCol) return;

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var height = lastRow - 1;

  var names = sheet.getRange(2, nameCol, height, 1).getValues();
  var emails = sheet.getRange(2, emailCol, height, 1).getValues();

  // One contiguous run of people, then everything below it. Two range writes
  // rather than a thousand: each setDataValidation call is a round trip.
  var lastPerson = 1;
  for (var i = 0; i < height; i++) {
    if (String(names[i][0]).trim() !== '' || String(emails[i][0]).trim() !== '') {
      lastPerson = i + 2;
    }
  }

  if (lastPerson >= 2) {
    sheet.getRange(2, closedCol, lastPerson - 1, 1).insertCheckboxes();
  }
  if (lastRow > lastPerson) {
    var blanks = sheet.getRange(lastPerson + 1, closedCol, lastRow - lastPerson, 1);
    blanks.clearDataValidations();
    blanks.clearContent();
  }
}

function ensureHeaders_(sheet, wanted) {
  var lastCol = sheet.getLastColumn();
  var existing = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  var have = {};
  existing.forEach(function (h) {
    if (h !== '') have[String(h).trim().toLowerCase()] = true;
  });
  var toAdd = wanted.filter(function (h) { return !have[h.toLowerCase()]; });
  if (toAdd.length > 0) {
    var start = existing.filter(String).length > 0 ? lastCol + 1 : 1;
    sheet.getRange(1, start, 1, toAdd.length).setValues([toAdd]);
  }
}

function ensureSettingRow_(sheet, label, defaultValue, help) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 0) {
    var labels = sheet.getRange(1, 1, lastRow, 1).getValues();
    for (var i = 0; i < labels.length; i++) {
      if (String(labels[i][0]).trim() === label) return;
    }
  }
  sheet.appendRow(help ? [label, defaultValue, help] : [label, defaultValue]);
}

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

/** Menu entry: run once, and show any problem in a dialog. */
function runNow() {
  try {
    var summary = courierPass_();
    SpreadsheetApp.getUi().alert('Blotter ran.\n\n' + summary);
  } catch (e) {
    // A refusal that came with something to tell the student leads, because
    // "status 402" answers nothing and "your trial has ended" answers
    // everything. This is the whole reason the notice channel exists.
    var notice = e && e.blotterNotice;
    if (notice) {
      SpreadsheetApp.getUi().alert(
        notice.text + (notice.url ? '\n\n' + notice.url : '') +
        '\n\nYour sheet was not updated. It is also shown at the top of the ' +
        'Contacts tab, so you will see it there on every run.'
      );
      return;
    }
    // Honest about how far it got. Before the write phase the sheet really is
    // untouched; after it, claiming so would be false — the safe advice in
    // both cases is that the next successful run rewrites every Blotter
    // column, so nothing is lost either way.
    var state = writePhaseBegun_
      ? 'Blotter hit a problem partway through writing, so the sheet may be partially updated.\n\n' +
        'Nothing is lost: the next successful run rewrites every Blotter column. Reason:\n'
      : 'Blotter could not update the sheet, so it changed nothing.\n\n' +
        'The sheet is exactly as it was. Reason:\n';
    SpreadsheetApp.getUi().alert(
      state + (e && e.message ? e.message : e) + '\n\n(Failed' + metricsSuffix_() + ')'
    );
  }
}

/** Trigger entry: run silently. On failure, log and leave the sheet alone. */
function runCourier() {
  try {
    if (!shouldWorkNow_()) return; // night cadence: exit before any read
    courierPass_();
  } catch (e) {
    // A stale "Last successful run" in Settings is the visible signal.
    console.error('Courier run failed, sheet ' +
      (writePhaseBegun_ ? 'may be partially written (a later run rewrites it): ' : 'untouched: ') +
      (e && e.message ? e.message : e) + metricsSuffix_());
  }
}

/**
 * The hybrid cadence's whole implementation. Inside day hours every firing
 * works; at night, only when NIGHT_EVERY_MINUTES have passed since the last
 * worked run. Scheduling, not a judgment — it decides when to ask, never
 * what anything means. Manual runs (the menu) skip this entirely.
 */
function shouldWorkNow_() {
  var hour = Number(Utilities.formatDate(new Date(), studentTimeZone_(), 'H'));
  if (hour >= DAY_STARTS_AT_HOUR && hour < DAY_ENDS_AT_HOUR) return true;
  var last = Number(PropertiesService.getScriptProperties().getProperty(PROP_LAST_WORKED_MS) || 0);
  return new Date().getTime() - last >= NIGHT_EVERY_MINUTES * 60 * 1000;
}

/** " after 41 seconds; 126 conversations, 325 messages, 134 Gmail calls" or ''. */
function metricsSuffix_() {
  if (!runMetrics_) return '';
  var seconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
  return ' after ' + seconds + ' seconds; ' + runMetrics_.threads + ' conversations, ' +
    runMetrics_.messages + ' messages, ' +
    (runMetrics_.searches + runMetrics_.threadFetches) + ' Gmail calls';
}

function startAutomaticUpdates() {
  deleteCourierTriggers_();
  ScriptApp.newTrigger('runCourier').timeBased().everyMinutes(15).create();
  SpreadsheetApp.getUi().alert(
    'Automatic updates are on. Blotter will refresh this sheet every 15 minutes ' +
    'from ' + DAY_STARTS_AT_HOUR + 'am to ' + (DAY_ENDS_AT_HOUR - 12) + 'pm your time, ' +
    'and every ' + Math.round(NIGHT_EVERY_MINUTES / 60) + ' hours overnight.\n\n' +
    'You can close the sheet — it keeps running.'
  );
}

function stopAutomaticUpdates() {
  deleteCourierTriggers_();
  SpreadsheetApp.getUi().alert('Automatic updates are off. Nothing will run until you start them again.');
}

function deleteCourierTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runCourier') ScriptApp.deleteTrigger(t);
  });
}

// ---------------------------------------------------------------------------
// The pass. Fetch everything, POST once, then — only on a good response —
// write everything. Any throw before the write phase leaves the sheet as it
// was.
// ---------------------------------------------------------------------------

function courierPass_() {
  // Never let a manual run and a timed run interleave their writes.
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(0)) {
    throw new Error('Another Blotter run is already in progress. Nothing was changed.');
  }
  try {
    runMetrics_ = { startedMs: new Date().getTime(), searches: 0, threadFetches: 0, threads: 0, messages: 0, skipped: 0 };
    writePhaseBegun_ = false;
    PropertiesService.getScriptProperties()
      .setProperty(PROP_LAST_WORKED_MS, String(runMetrics_.startedMs));

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var settings = readSettings_(ss);
    var sheetState = readContacts_(ss);
    var foundState = readFoundTab_(ss);

    // --- Fetch (read-only) ---
    var threads = fetchThreads_(sheetState.allContactEmails, settings.mailDaysBack);
    markOutbound_(threads, settings.addresses);
    var events = fetchEvents_(settings.calendarDaysBack, settings.calendarDaysForward);

    // --- Ask the server what it all means ---
    var request = {
      version: CONTRACT_VERSION,
      // The time machine (D17): only `now` moves. The Gmail search window and
      // the calendar fetch window above already ran on real time, deliberately
      // — the point is to age a real relationship, not to hide it.
      now: settings.pretendNow || toIso_(new Date()),
      student: { addresses: settings.addresses },
      contacts: sheetState.contacts,
      threads: threads,
      events: events,
      ignored: foundState.ignoredEmails
    };
    var response;
    try {
      response = postToServer_(settings.serverUrl, request);
    } catch (e) {
      // The narrow exception to write-nothing-on-failure: if the refusal came
      // with something to tell the student, tell them. Nothing else is
      // written, and the error still stops the run.
      if (e && e.blotterNotice) {
        try { writeNotice_(sheetState.sheet, e.blotterNotice); } catch (ignored) {}
      }
      throw e;
    }
    validateResponse_(response, sheetState.contacts);
    var notice = noticeFrom_(response);

    // --- Write phase. Everything below is prepared; nothing above wrote. ---
    writePhaseBegun_ = true;
    // First, because it is the thing the student most needs to see and it must
    // land even if something below fails. Also clears a withdrawn notice.
    writeNotice_(sheetState.sheet, notice);
    writeBlotterColumns_(sheetState, response.rows);
    var added = addApprovedContacts_(ss, sheetState, foundState);
    syncClosedCheckboxes_(sheetState);
    var suggested = writeFoundSuggestions_(ss, sheetState, foundState, response.found || []);
    writeSetting_(ss, SETTING_LAST_RUN, new Date());
    // When the time machine is on, say so first and say so loudly. Every
    // number on this sheet is now an answer to a question about a day that is
    // not today, and nothing else about the sheet reveals that.
    var pretendWarning = settings.pretendNow
      ? 'TESTING MODE: this run pretended today was ' + settings.pretendNow.slice(0, 10) +
        '. Every Status and Days value on this sheet answers that date, not today. ' +
        'Clear Settings → "' + SETTING_PRETEND_TODAY + '" and run again to go back to normal.'
      : '';
    var addressWarnings = unreadableAddressWarnings_(sheetState.unreadableAddresses);
    var warningLines = addressWarnings.concat(response.warnings || []);
    if (pretendWarning) warningLines.unshift(pretendWarning);
    writeSetting_(ss, SETTING_WARNINGS, warningLines.length ? warningLines.join(' | ') : 'None');

    // The measurement (13-BRIEF-COURIER-2 §2): what a run actually costs.
    var seconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
    writeSetting_(ss, SETTING_RUN_TOOK, seconds + ' seconds');
    writeSetting_(ss, SETTING_RUN_FETCHED,
      runMetrics_.threads + ' conversations, ' + runMetrics_.messages + ' messages' +
      (runMetrics_.skipped ? ' (' + runMetrics_.skipped + ' skipped: more than ' +
        MAX_THREAD_RECIPIENTS + ' recipients)' : ''));
    writeSetting_(ss, SETTING_GMAIL_CALLS,
      (runMetrics_.searches + runMetrics_.threadFetches) +
      ' (' + runMetrics_.searches + ' searches, ' + runMetrics_.threadFetches + ' conversation fetches)');

    // Last, and outside everything that matters. Counts only.
    sendTelemetry_(settings.telemetryUrl,
      telemetryPayload_(sheetState.contacts.length, seconds, true));

    return (notice ? notice.text + (notice.url ? '\n' + notice.url : '') + '\n\n' : '') +
      (pretendWarning ? '*** ' + pretendWarning + ' ***\n\n' : '') +
      'Updated ' + response.rows.length + ' contact row(s). ' +
      'Added ' + added.added + ' approved contact(s). ' +
      (added.skipped ? 'Skipped ' + added.skipped + ' already in Contacts. ' : '') +
      'Suggested ' + suggested + ' new name(s) in the Found tab. ' +
      'Took ' + seconds + ' seconds.' +
      // The student is looking at this dialog right now; a bad address in
      // their sheet is worth interrupting them for.
      (addressWarnings.length
        ? '\n\nCHECK THESE ROW(S) — Blotter could not read an email address:\n• ' +
          addressWarnings.join('\n• ')
        : '');
  } catch (runError) {
    // A run that failed is still a run that happened. Counting it is what makes
    // "installs that stopped working" visible instead of guessed at, and it
    // cannot affect the outcome — the error is rethrown untouched.
    try {
      var failedSeconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
      sendTelemetry_(TELEMETRY_URL_DEFAULT, telemetryPayload_(0, failedSeconds, false));
    } catch (ignored) {}
    throw runError;
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Reading the sheet
// ---------------------------------------------------------------------------

function readSettings_(ss) {
  var sheet = ss.getSheetByName(TAB_SETTINGS);
  if (!sheet) {
    throw new Error('The "' + TAB_SETTINGS + '" tab is missing. Run Blotter → Step 1: Set up this sheet.');
  }
  var values = sheet.getDataRange().getValues();
  var byLabel = {};
  values.forEach(function (row) {
    byLabel[String(row[0]).trim()] = row.length > 1 ? row[1] : '';
  });

  // Tolerates commas, semicolons, stray spaces, and "Name <addr>" pasting.
  var addresses = addressList_(byLabel[SETTING_ADDRESSES]);
  if (addresses.length === 0) {
    throw new Error('Settings needs "' + SETTING_ADDRESSES + '" — every address you send from, separated by commas.');
  }

  var serverUrl = String(byLabel[SETTING_SERVER] || '').trim();
  if (!/^https:\/\//.test(serverUrl)) {
    throw new Error('Settings needs a "' + SETTING_SERVER + '" starting with https://');
  }

  return {
    addresses: addresses,
    serverUrl: serverUrl,
    calendarDaysBack: positiveOrDefault_(byLabel[SETTING_CAL_BACK], EVENT_DAYS_BACK_DEFAULT),
    calendarDaysForward: positiveOrDefault_(byLabel[SETTING_CAL_FORWARD], EVENT_DAYS_FORWARD_DEFAULT),
    mailDaysBack: positiveOrDefault_(byLabel[SETTING_MAIL_BACK], MAIL_DAYS_BACK_DEFAULT),
    // '' in normal use. Anything unreadable throws from here — before a single
    // Gmail read, and long before the write phase.
    pretendNow: pretendNowIso_(byLabel[SETTING_PRETEND_TODAY]),
    // Blank switches counting off entirely, and that is a supported choice
    // rather than a bug: the run does not depend on it.
    telemetryUrl: String(byLabel[SETTING_TELEMETRY] === undefined ? TELEMETRY_URL_DEFAULT
      : byLabel[SETTING_TELEMETRY]).trim()
  };
}

/**
 * The time machine (D17). Turns the `Pretend today is` cell into the `now` the
 * request carries, or '' when the cell is blank.
 *
 * **An unreadable value throws.** It must never quietly fall back to today: a
 * silent fallback would make a broken test look like a passing one, which is
 * the worst outcome available here — worse than the run failing, because a
 * failing run says so.
 *
 * A date with no time means **the end of that day**. That is what makes the
 * setting do its job: a call booked for 2pm on the pretend date has already
 * happened, so `Call done` and `Call cancelled` fire instead of the row
 * sitting on `Call scheduled` all over again.
 */
function pretendNowIso_(raw) {
  var parts = pretendTodayParts_(raw);
  return parts ? isoInStudentZone_(parts) : '';
}

function pretendTodayParts_(raw) {
  if (raw === null || raw === undefined) return null;
  // Sheets hands back a real Date when the cell is date-formatted, and a
  // string when it was typed as text. Both have to work.
  if (Object.prototype.toString.call(raw) === '[object Date]') {
    if (isNaN(raw.getTime())) {
      throw new Error(badPretendValue_(raw));
    }
    // Read it back in the student's own zone: a date cell is midnight there,
    // and midnight from a date cell means "no time was given".
    return parsePretendText_(Utilities.formatDate(raw, studentTimeZone_(), 'yyyy-MM-dd HH:mm:ss'), true);
  }
  var text = String(raw).trim();
  if (text === '') return null;
  return parsePretendText_(text, false);
}

/**
 * `2026-09-05`, `2026-09-05 14:30`, `9/5/2026` and `9/5/2026 14:30`. Anything
 * else throws. Pure string work — no Apps Script globals — so it is testable
 * outside the editor.
 *
 * `midnightMeansAllDay` is true only for a date-formatted cell, where 00:00:00
 * is Sheets storing a bare date rather than the student asking for midnight.
 */
function parsePretendText_(text, midnightMeansAllDay) {
  var iso = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(text);
  var us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(text);
  var y, mo, d, h, mi, sec, hadTime;
  if (iso) {
    y = +iso[1]; mo = +iso[2]; d = +iso[3];
    hadTime = iso[4] !== undefined;
    h = hadTime ? +iso[4] : 0; mi = hadTime ? +iso[5] : 0; sec = hadTime && iso[6] ? +iso[6] : 0;
  } else if (us) {
    mo = +us[1]; d = +us[2]; y = +us[3];
    hadTime = us[4] !== undefined;
    h = hadTime ? +us[4] : 0; mi = hadTime ? +us[5] : 0; sec = hadTime && us[6] ? +us[6] : 0;
  } else {
    throw new Error(badPretendValue_(text));
  }

  // A shape that parses is not yet a date: 2026-02-30 and 25:00 both do.
  var roundTrip = new Date(Date.UTC(y, mo - 1, d, h, mi, sec));
  if (roundTrip.getUTCFullYear() !== y || roundTrip.getUTCMonth() !== mo - 1 ||
      roundTrip.getUTCDate() !== d || h > 23 || mi > 59 || sec > 59) {
    throw new Error(badPretendValue_(text));
  }

  if (!hadTime || (midnightMeansAllDay && h === 0 && mi === 0 && sec === 0)) {
    h = 23; mi = 59; sec = 59;
  }
  return { y: y, mo: mo, d: d, h: h, mi: mi, s: sec };
}

function badPretendValue_(value) {
  return 'Settings → "' + SETTING_PRETEND_TODAY + '" says "' + value + '", which is not a date ' +
    'Blotter can read. Nothing was changed.\n\n' +
    'Use a date like 2026-09-05, or clear the cell to go back to normal.\n\n' +
    'Blotter will not guess here: guessing would silently compute the whole sheet ' +
    'against today and look exactly like a working run.';
}

/**
 * A wall-clock time in the student's timezone, as an ISO string with the right
 * offset for that date — so a pretend date in November gets November's offset,
 * not today's.
 *
 * Two passes: guess the instant as if the zone were UTC, see what clock the
 * student's zone actually shows for that instant, and shift by the difference.
 * The second pass settles the DST boundary cases the first can land on.
 */
function isoInStudentZone_(p) {
  var wanted = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s);
  var guess = new Date(wanted);
  for (var i = 0; i < 2; i++) {
    var shown = Utilities.formatDate(guess, studentTimeZone_(), 'yyyy-MM-dd HH:mm:ss')
      .match(/\d+/g).map(Number);
    var delta = wanted - Date.UTC(shown[0], shown[1] - 1, shown[2], shown[3], shown[4], shown[5]);
    if (delta === 0) break;
    guess = new Date(guess.getTime() + delta);
  }
  return toIso_(guess);
}

/** A positive whole number from a settings cell, or the default. */
function positiveOrDefault_(value, defaultValue) {
  var n = Number(value);
  return (isFinite(n) && n > 0) ? Math.floor(n) : defaultValue;
}

function readContacts_(ss) {
  var sheet = ss.getSheetByName(TAB_CONTACTS);
  if (!sheet) {
    throw new Error('The "' + TAB_CONTACTS + '" tab is missing. Run Blotter → Step 1: Set up this sheet.');
  }
  var cols = {
    name: findColumn_(sheet, COL_NAME),
    firm: findColumn_(sheet, COL_FIRM),
    email: findColumn_(sheet, COL_EMAIL),
    closed: findColumn_(sheet, COL_CLOSED)
  };
  var missing = [];
  if (cols.name < 1) missing.push(COL_NAME);
  if (cols.email < 1) missing.push(COL_EMAIL);
  if (cols.closed < 1) missing.push(COL_CLOSED);
  BLOTTER_COLUMNS.forEach(function (h) {
    if (findColumn_(sheet, h) < 1) missing.push(h);
  });
  if (missing.length > 0) {
    throw new Error('The Contacts tab is missing column(s): ' + missing.join(', ') +
      '. Run Blotter → Step 1: Set up this sheet, or restore the header.');
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var rows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];

  var contacts = [];
  var allEmails = {};
  var emailsInSheet = {};
  var unreadableAddresses = [];

  rows.forEach(function (row, i) {
    var rowNumber = i + 2; // sheet row — the contract's join key
    var name = String(row[cols.name - 1]).trim();
    var firm = cols.firm > 0 ? String(row[cols.firm - 1]).trim() : '';
    var rawEmail = String(row[cols.email - 1] === null || row[cols.email - 1] === undefined
      ? '' : row[cols.email - 1]).trim();
    var emails = addressList_(rawEmail);
    if (name === '' && emails.length === 0 && rawEmail === '') return; // blank padding row

    // A row with a person on it and nothing Blotter can read as an address is
    // the failure that has to be loud. Left silent it reads `Not emailed`
    // forever, and looks exactly like somebody the student never wrote to —
    // which is how a hand-typed en dash cost an afternoon in the first live
    // install. Normalising known substitutions (above) fixes the characters we
    // know about; this reports the ones we do not.
    if (emails.length === 0) {
      unreadableAddresses.push({
        row: rowNumber,
        name: name || '(no name)',
        cell: rawEmail
      });
    }

    emails.forEach(function (a) {
      allEmails[a.toLowerCase()] = a;
      emailsInSheet[a.toLowerCase()] = true;
    });
    contacts.push({
      row: rowNumber,
      name: name,
      firm: firm,
      emails: emails,
      closed: isTruthyCell_(row[cols.closed - 1])
    });
  });

  return {
    sheet: sheet,
    cols: cols,
    lastCol: lastCol,
    contacts: contacts,
    allContactEmails: Object.keys(allEmails).map(function (k) { return allEmails[k]; }),
    emailsInSheet: emailsInSheet,
    unreadableAddresses: unreadableAddresses
  };
}

/**
 * The sentences the student sees about rows Blotter could not read an address
 * from. Names the row and quotes the cell, because "something is wrong" sends
 * somebody hunting and "row 7, Jane Doe, jane@acme,com" does not.
 */
function unreadableAddressWarnings_(unreadable) {
  return unreadable.map(function (u) {
    return u.cell === ''
      ? 'Row ' + u.row + ' (' + u.name + ') has no email address, so Blotter cannot ' +
        'find their mail and the row will stay "Not emailed".'
      : 'Row ' + u.row + ' (' + u.name + '): "' + u.cell + '" is not an email address ' +
        'Blotter can read, so the row will stay "Not emailed". Retyping it usually ' +
        'fixes it — autocorrect sometimes replaces a hyphen with a dash that looks ' +
        'identical.';
  });
}

function readFoundTab_(ss) {
  var sheet = ss.getSheetByName(TAB_FOUND);
  if (!sheet) {
    throw new Error('The "' + TAB_FOUND + '" tab is missing. Run Blotter → Step 1: Set up this sheet.');
  }
  var cols = {
    add: findColumn_(sheet, 'Add?'),
    name: findColumn_(sheet, 'Name'),
    email: findColumn_(sheet, 'Email')
  };
  if (cols.add < 1 || cols.name < 1 || cols.email < 1) {
    throw new Error('The Found tab is missing its header row. Run Blotter → Step 1: Set up this sheet.');
  }

  var lastRow = sheet.getLastRow();
  var values = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues() : [];

  var ignoredEmails = [];
  var approvals = []; // {rowNumber, name, email}
  var rejections = []; // rowNumbers marked No, to be rewritten as Ignored
  var emailsInFound = {};
  values.forEach(function (row, i) {
    var rowNumber = i + 2;
    var mark = String(row[cols.add - 1]).trim().toLowerCase();
    var email = String(row[cols.email - 1]).trim();
    var name = String(row[cols.name - 1]).trim();
    if (email === '') return;
    emailsInFound[email.toLowerCase()] = true;
    if (mark === 'no' || mark === 'ignored') {
      ignoredEmails.push(email);
      if (mark === 'no') rejections.push(rowNumber);
    } else if (mark === 'yes') {
      approvals.push({ rowNumber: rowNumber, name: name, email: email });
    }
  });

  return {
    sheet: sheet,
    cols: cols,
    ignoredEmails: ignoredEmails,
    approvals: approvals,
    rejections: rejections,
    emailsInFound: emailsInFound
  };
}

// ---------------------------------------------------------------------------
// Reading Gmail and Calendar — the only wide surface, and strictly read-only
// ---------------------------------------------------------------------------

/**
 * Every message in any conversation that involves a contact's address in
 * From, To, or Cc (ENGINE-RULES §2, narrow read). Gmail search returns whole
 * threads, which is exactly the rule: one matching message brings in the
 * whole conversation, assistants and bounces included.
 */
function fetchThreads_(contactEmails, daysBack) {
  if (contactEmails.length === 0) return [];

  // The window. Gmail's after: reads the whole ORed chain only when it is
  // parenthesised — unwrapped, "from:a OR to:a after:X" applies the date to
  // the last term alone and quietly un-windows the rest.
  var cutoff = new Date(new Date().getTime() - daysBack * 24 * 60 * 60 * 1000);
  var afterClause = ' after:' + Utilities.formatDate(cutoff, studentTimeZone_(), 'yyyy/MM/dd');

  var threadsById = {};
  for (var i = 0; i < contactEmails.length; i += ADDRESSES_PER_SEARCH) {
    var chunk = contactEmails.slice(i, i + ADDRESSES_PER_SEARCH);
    var query = '(' + chunk.map(function (a) {
      return 'from:' + a + ' OR to:' + a + ' OR cc:' + a;
    }).join(' OR ') + ')' + afterClause;

    var start = 0;
    var PAGE = 100;
    while (true) {
      runMetrics_.searches++;
      var page = GmailApp.search(query, start, PAGE);
      page.forEach(function (t) { threadsById[t.getId()] = t; });
      if (page.length < PAGE) break;
      start += PAGE;
    }
  }

  var out = [];
  Object.keys(threadsById).forEach(function (id) {
    var thread = threadsById[id];
    runMetrics_.threadFetches++;
    // Addresses keep their display names (contract v2): the server cannot
    // invent a name for a person it finds, and the header is the only honest
    // source of one.
    var messages = thread.getMessages().map(function (m) {
      var from = firstNamedAddress_(m.getFrom());
      return {
        id: m.getId(),
        date: toIso_(m.getDate()),
        from: from,
        to: namedAddressList_(m.getTo()),
        cc: namedAddressList_(m.getCc()),
        subject: m.getSubject() || '',
        // Contract version 4: **the body never leaves this account.** The
        // server used to read one, in exactly one place, to find out which
        // address a delivery-failure notice was complaining about. That
        // extraction happens here now, and only the addresses travel.
        //
        // So `getPlainBody()` is called only for mail from a delivery daemon.
        // Every other message's text is never even read, let alone sent —
        // which is also why this is faster than it was.
        failed_recipients: isBounceSender_(bareAddress_(from))
          ? failedRecipientsFrom_(stripQuotedHistory_(m.getPlainBody() || ''))
          : [],
        is_outbound: false // set below, once, against the student's addresses
      };
    });

    // A mass mailing is not a recruiting conversation. Skipped whole: not
    // sent, and so never harvested for names either.
    if (exceedsRecipientCap_(messages)) {
      runMetrics_.skipped++;
      return;
    }

    runMetrics_.threads++;
    runMetrics_.messages += messages.length;
    out.push({ thread_id: id, messages: messages });
  });
  return out;
}

/**
 * True when any single message in the conversation is addressed to more than
 * MAX_THREAD_RECIPIENTS distinct people across To and Cc. One listserv message
 * condemns the whole conversation, which is the point: the names on it are a
 * mailing list, not a relationship.
 */
function exceedsRecipientCap_(messages) {
  for (var i = 0; i < messages.length; i++) {
    var seen = {};
    var count = 0;
    var everyone = messages[i].to.concat(messages[i].cc);
    for (var j = 0; j < everyone.length; j++) {
      var address = bareAddress_(everyone[j]).toLowerCase();
      if (address === '' || seen[address]) continue;
      seen[address] = true;
      count++;
      if (count > MAX_THREAD_RECIPIENTS) return true;
    }
  }
  return false;
}

/** Marks is_outbound per the contract: from is one of the student's addresses. */
function markOutbound_(threads, studentAddresses) {
  var mine = {};
  studentAddresses.forEach(function (a) { mine[a.toLowerCase()] = true; });
  threads.forEach(function (t) {
    t.messages.forEach(function (m) {
      m.is_outbound = !!mine[bareAddress_(m.from).toLowerCase()];
    });
  });
}

/**
 * All events on the default calendar inside the window. Which events matter,
 * and to whom, is the server's judgment (§7) — the title-match rule means the
 * courier must not pre-filter by attendee.
 */
function fetchEvents_(daysBack, daysForward) {
  var now = new Date();
  var from = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  var to = new Date(now.getTime() + daysForward * 24 * 60 * 60 * 1000);
  return CalendarApp.getDefaultCalendar().getEvents(from, to).map(function (e) {
    var creators = e.getCreators();
    var guests = e.getGuestList(true); // one call: each one is an API hit
    return {
      id: e.getId(),
      title: e.getTitle() || '',
      start: toIso_(e.getStartTime()),
      end: toIso_(e.getEndTime()),
      attendees: guests.map(function (g) { return g.getEmail(); }),
      // An event nobody was invited to cannot have been declined — there is no
      // invitation to decline — so the whole question is skipped. That matters
      // for speed, not tidiness: a student's real calendar is mostly solo
      // events, and this window can hold thousands of them.
      declined: guests.length === 0 ? [] : declinedGuests_(e, guests),
      organizer: creators && creators.length ? creators[0] : ''
    };
  });
}

/**
 * Who answered No to this invite (contract v2). Declines only — no rule reads
 * accepted, tentative or not-yet-answered, so none is sent.
 *
 * Called only for events that actually have guests.
 *
 * The student's own answer needs a second question, because where they are the
 * organiser the guest list can report them as OWNER whatever they clicked, and
 * ENGINE-RULES §4 counts a decline from either side. **That question is asked
 * only when the guest list has not already answered it** — every call here is
 * a round trip to Google, and this runs against every event in the window.
 */
function declinedGuests_(event, guests) {
  var declined = [];
  var seen = {};
  guests.forEach(function (g) {
    if (g.getGuestStatus() !== CalendarApp.GuestStatus.NO) return;
    var address = g.getEmail();
    if (!address || seen[address.toLowerCase()]) return;
    seen[address.toLowerCase()] = true;
    declined.push(address);
  });

  var me = effectiveUserEmail_();
  if (me && seen[me.toLowerCase()]) return declined; // already known: do not ask twice

  try {
    if (event.getMyStatus() === CalendarApp.GuestStatus.NO && me) {
      declined.push(me);
    }
  } catch (err) {
    // Some events have no "my status" to report. Nothing to add.
  }
  return declined;
}

/** The account this script runs as. Asked once per run, not once per event. */
var effectiveUserEmailCache_ = null;
function effectiveUserEmail_() {
  if (effectiveUserEmailCache_ === null) {
    try {
      effectiveUserEmailCache_ = Session.getEffectiveUser().getEmail() || '';
    } catch (err) {
      effectiveUserEmailCache_ = '';
    }
  }
  return effectiveUserEmailCache_;
}

// ---------------------------------------------------------------------------
// Talking to the server
// ---------------------------------------------------------------------------

function postToServer_(url, request) {
  var httpResponse;
  try {
    httpResponse = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(request),
      muteHttpExceptions: true,
      followRedirects: true
    });
  } catch (e) {
    throw new Error('Could not reach the Blotter server (' + (e && e.message ? e.message : e) + ').');
  }

  var code = httpResponse.getResponseCode();
  if (code !== 200) {
    var refused = new Error('The Blotter server answered with status ' + code + ' instead of 200.');
    // A refusal is exactly when the student most needs to be told why, so a
    // notice on a non-200 is carried out with the error rather than discarded
    // with the body. `courierPass_` writes it — the one deliberate exception
    // to writing nothing on failure, and it is narrow: the notice cell only.
    try {
      refused.blotterNotice = noticeFrom_(JSON.parse(httpResponse.getContentText()));
    } catch (e) {
      refused.blotterNotice = null;
    }
    throw refused;
  }
  try {
    return JSON.parse(httpResponse.getContentText());
  } catch (e) {
    throw new Error('The Blotter server\'s answer was not valid JSON.');
  }
}

/**
 * The contract is enforced here, not interpreted: wrong version, a missing or
 * extra row, or a status outside the fixed list all mean "bad response", and
 * a bad response means the sheet stays exactly as it is.
 */
function validateResponse_(response, contacts) {
  if (!response || response.version !== CONTRACT_VERSION) {
    throw new Error('The server spoke contract version ' +
      (response && response.version) + ' but this courier speaks version ' + CONTRACT_VERSION + '.');
  }
  if (!Array.isArray(response.rows) || response.rows.length !== contacts.length) {
    throw new Error('The server returned ' +
      (Array.isArray(response.rows) ? response.rows.length : 'no') +
      ' row(s) for ' + contacts.length + ' contact(s). Every contact must get exactly one row.');
  }
  var expected = {};
  contacts.forEach(function (c) { expected[c.row] = true; });
  response.rows.forEach(function (r) {
    if (!expected[r.row]) {
      throw new Error('The server returned a row for sheet row ' + r.row + ', which was not sent.');
    }
    delete expected[r.row];
    if (VALID_STATUSES.indexOf(r.status) === -1) {
      throw new Error('The server returned an unknown status "' + r.status + '".');
    }
  });
}

// ---------------------------------------------------------------------------
// The write phase
// ---------------------------------------------------------------------------

/**
 * Writes the six Blotter columns for every contact, one column at a time so a
 * student's own inserted columns in between are never touched. Runs only
 * after the whole response validated.
 */
function writeBlotterColumns_(sheetState, rows) {
  if (rows.length === 0) return;
  var sheet = sheetState.sheet;
  var byRow = {};
  rows.forEach(function (r) { byRow[r.row] = r; });

  var rowNumbers = sheetState.contacts.map(function (c) { return c.row; });
  var minRow = Math.min.apply(null, rowNumbers);
  var maxRow = Math.max.apply(null, rowNumbers);
  var height = maxRow - minRow + 1;

  var perColumn = {
    'Status': function (r) { return r.status; },
    // A dash, not a blank: ENGINE-RULES §4 gives a clockless row a dash, and a
    // blank cell reads as "Blotter has not run yet" instead of "there is no
    // clock here". A closed row keeps every other fact it had.
    'Days': function (r) { return r.days === null || r.days === undefined ? NO_CLOCK : r.days; },
    'Last contact': function (r) { return asSheetDate_(r.last_contact); },
    // A dash, for the same reason Days uses one (D24): the server decides where
    // a number means something and sends null everywhere else. The courier
    // renders that and makes no judgment about which states deserve a count.
    'Attempts': function (r) { return r.attempts === null || r.attempts === undefined ? NO_CLOCK : r.attempts; },
    'Next call': function (r) { return asSheetDate_(r.next_call); },
    'Last call': function (r) { return asSheetDate_(r.last_call); }
  };

  BLOTTER_COLUMNS.forEach(function (columnName) {
    var col = findColumn_(sheet, columnName);
    var existing = sheet.getRange(minRow, col, height, 1).getValues();
    var values = [];
    for (var rowNumber = minRow; rowNumber <= maxRow; rowNumber++) {
      var r = byRow[rowNumber];
      // Rows inside the block that are not contacts (blank padding) keep
      // whatever they had — the courier only writes cells it owns.
      values.push([r ? perColumn[columnName](r) : existing[rowNumber - minRow][0]]);
    }
    sheet.getRange(minRow, col, height, 1).setValues(values);
  });
}

/**
 * Approved people become contacts (ENGINE-RULES §8). The courier appends a
 * brand-new row with just Name and Email — it never touches an existing row
 * or any other student cell. Jon ruled this in on September 1, 2026, against
 * the strict reading of §9. Newly added rows get their Blotter columns on
 * the next run, when the server first sees them.
 */
function addApprovedContacts_(ss, sheetState, foundState) {
  var added = 0;
  var skipped = 0;
  foundState.approvals.forEach(function (a) {
    if (!sheetState.emailsInSheet[a.email.toLowerCase()]) {
      var newRow = [];
      for (var i = 0; i < sheetState.lastCol; i++) newRow.push('');
      newRow[sheetState.cols.name - 1] = a.name;
      newRow[sheetState.cols.email - 1] = a.email;
      // NOT appendRow. `getLastRow()` counts a column of unchecked checkboxes
      // as content — an unticked box stores FALSE — so on the first live
      // install an approved contact landed at row 996, nine hundred rows below
      // the data, and the student saw "Added" with nothing added. Append after
      // the last row that actually holds a person.
      var target = lastRowWithContact_(sheetState) + 1;
      sheetState.sheet.getRange(target, 1, 1, sheetState.lastCol).setValues([newRow]);
      sheetState.emailsInSheet[a.email.toLowerCase()] = true;
      added++;
      foundState.sheet.getRange(a.rowNumber, foundState.cols.add).setValue('Added');
    } else {
      // The mark used to be set out here, outside the guard, so the sheet
      // claimed an action it had not taken. A sheet that lies is worse than
      // one that fails loudly.
      skipped++;
      foundState.sheet.getRange(a.rowNumber, foundState.cols.add)
        .setValue('Already in Contacts');
    }
  });
  foundState.rejections.forEach(function (rowNumber) {
    foundState.sheet.getRange(rowNumber, foundState.cols.add).setValue('Ignored');
  });
  return { added: added, skipped: skipped };
}

/**
 * The last row of Contacts that actually carries a person — a Name or an
 * Email. Never `getLastRow()`, which counts formatting and unchecked
 * checkboxes as content. Returns the header row when the sheet is empty, so
 * the first contact lands at row 2.
 */
function lastRowWithContact_(sheetState) {
  var sheet = sheetState.sheet;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  var names = sheet.getRange(2, sheetState.cols.name, lastRow - 1, 1).getValues();
  var emails = sheet.getRange(2, sheetState.cols.email, lastRow - 1, 1).getValues();
  var last = 1;
  for (var i = 0; i < names.length; i++) {
    var hasName = String(names[i][0]).trim() !== '';
    var hasEmail = String(emails[i][0]).trim() !== '';
    if (hasName || hasEmail) last = i + 2;
  }
  return last;
}

/**
 * New names from the server land in Found for approval. Never auto-added,
 * never duplicated: anything already in Contacts or already in Found (under
 * any capitalisation) is skipped.
 */
function writeFoundSuggestions_(ss, sheetState, foundState, found) {
  var rows = [];
  found.forEach(function (f) {
    var key = String(f.email || '').toLowerCase();
    if (key === '' || sheetState.emailsInSheet[key] || foundState.emailsInFound[key]) return;
    foundState.emailsInFound[key] = true;
    rows.push(['', f.name || '', f.email, f.first_seen || '', f.context || '']);
  });
  if (rows.length > 0) {
    var sheet = foundState.sheet;
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, FOUND_HEADERS.length).setValues(rows);
  }
  return rows.length;
}

function writeSetting_(ss, label, value) {
  // A cell holds at most 50,000 characters, and the first live run learned it
  // the hard way: an oversized warnings string threw mid-write. The engine
  // now caps its warnings, and this guard makes the cell safe regardless.
  if (typeof value === 'string' && value.length > 45000) {
    value = value.slice(0, 45000) + ' … [shortened to fit this cell]';
  }
  var sheet = ss.getSheetByName(TAB_SETTINGS);
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    sheet.appendRow([label, value]);
    return;
  }
  var labels = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (var i = 0; i < labels.length; i++) {
    if (String(labels[i][0]).trim() === label) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([label, value]);
}

// ---------------------------------------------------------------------------
// Small mechanical helpers
// ---------------------------------------------------------------------------

/** Column number for a header name, matched ignoring case and stray spaces. 0 if absent. */
/**
 * A real Date for a date cell, so the sheet's number format can render it.
 *
 * The server sends dates as strings. Written straight through, `Next call`
 * showed `2026-09-03T14:00:00-07:00` in the sheet — the worst-looking thing on
 * it, and the reason this exists.
 *
 * **A plain `new Date('2026-09-02')` would be a bug, not a shortcut.**
 * JavaScript reads a bare date as UTC midnight, which is the evening of
 * September 1st anywhere in the Americas — so every date cell would show a day
 * early. This project has already paid for that mistake once, in 98 fixture
 * values. A bare date is therefore built from its parts in local time; a full
 * timestamp carries its own offset and can be parsed directly.
 *
 * Anything unrecognised is passed through untouched rather than guessed at: a
 * visibly odd string beats a confidently wrong date.
 */
function asSheetDate_(value) {
  if (value === null || value === undefined || value === '') return '';
  var text = String(value).trim();
  var bare = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (bare) return new Date(Number(bare[1]), Number(bare[2]) - 1, Number(bare[3]));
  if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
    var d = new Date(text);
    if (!isNaN(d.getTime())) return d;
  }
  return value;
}

function findColumn_(sheet, headerName) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return 0;
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === headerName.toLowerCase()) return i + 1;
  }
  return 0;
}

function isTruthyCell_(value) {
  if (value === true) return true;
  var s = String(value).trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'x' || s === '1';
}

/**
 * ISO 8601 carrying the student's own timezone offset (e.g. -05:00), never
 * bare UTC. Engine rules v3 §4: a day turns at midnight in the student's
 * timezone, and this binds the courier — sent as UTC, a late-evening email
 * lands on tomorrow's date and the engine cannot know better. The
 * spreadsheet's own timezone (File → Settings) is the authority.
 */
var studentTimeZoneCache_ = null;
function studentTimeZone_() {
  if (!studentTimeZoneCache_) {
    studentTimeZoneCache_ =
      SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone() ||
      Session.getScriptTimeZone() ||
      'Etc/UTC';
  }
  return studentTimeZoneCache_;
}

function toIso_(date) {
  return Utilities.formatDate(date, studentTimeZone_(), "yyyy-MM-dd'T'HH:mm:ssXXX");
}

var ONE_ADDRESS = /[A-Za-z0-9._%+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/;

/**
 * Who a delivery-failure notice is complaining about.
 *
 * This is the one piece of work that moved from the server to here, so that
 * message text stops crossing the wire (contract version 4). It is mechanical
 * extraction from machine-generated mail, not a judgment about recruiting —
 * **what a bounce means stays on the server**: which outbound it answers, and
 * whether the row reads `Bounced`.
 *
 * Deliberately not keyed on the `Status:` code. The real data shows that code
 * lying: a Stifel bounce reported `Status: 4.4.2`, a temporary class, while
 * its SMTP response was 550 and its own text read "Address not found". An
 * engine trusting `5.x` misses exactly the address a student burns three
 * attempts on.
 *
 * The daemon's own address is excluded — it is the sender, not the failure.
 */
function failedRecipientsFrom_(bodyText) {
  var matches = normaliseTyped_(bodyText).match(new RegExp(ONE_ADDRESS.source, 'g')) || [];
  var seen = {};
  var out = [];
  matches.forEach(function (raw) {
    var address = raw.toLowerCase();
    if (seen[address] || isBounceSender_(address)) return;
    seen[address] = true;
    out.push(address);
  });
  return out;
}

/** Mail from a delivery daemon. The only mail whose text is ever opened. */
function isBounceSender_(address) {
  var local = String(address || '').toLowerCase().split('@')[0];
  return local === 'mailer-daemon' || local === 'postmaster';
}

/**
 * What a person's keyboard and Google's autocorrect do to an address that a
 * plain-ASCII pattern then refuses to see.
 *
 * Found in the first live install: Jon typed `jon@un-claude.com` by hand and
 * the row read `Not emailed` forever. Pasting the identical address worked.
 * Autocorrect had turned the hyphen into an **en dash**, which is not a
 * hyphen, and the row failed silently — indistinguishable from a contact he
 * had genuinely never written to.
 *
 * Deliberately short. Every entry is a character an editor substitutes for one
 * a person actually typed: the dash family, the space family, and the zero
 * width joiners that arrive with a copy-paste. **Capitalisation needs nothing
 * here** — matching lowercases everywhere.
 */
var TYPED_SUBSTITUTIONS = [
  [/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-'], // dashes and minus signs
  [/[\u00A0\u2007\u202F\u2000-\u200A\u3000]/g, ' '],                            // non-breaking and typographic spaces
  [/[\u200B\u200C\u200D\uFEFF]/g, ''],                                          // zero-width, invisible entirely
  [/[\u2018\u2019\u201A\u201B]/g, "'"],                                         // curly single quotes
  [/[\u201C\u201D\u201E\u201F]/g, '"'],                                         // curly double quotes
  [/[\uFF20]/g, '@'],                                                             // full-width at sign
  [/[\uFF0E\u3002]/g, '.']                                                        // full-width and ideographic stops
];

/** A cell as typed, with the substitutions undone. Never changes a real address. */
function normaliseTyped_(value) {
  var text = String(value === null || value === undefined ? '' : value);
  for (var i = 0; i < TYPED_SUBSTITUTIONS.length; i++) {
    text = text.replace(TYPED_SUBSTITUTIONS[i][0], TYPED_SUBSTITUTIONS[i][1]);
  }
  return text;
}

/** "Jamie Diamond <jamie@x.com>" → "jamie@x.com". */
function firstAddress_(headerValue) {
  var list = addressList_(headerValue);
  return list.length > 0 ? list[0] : '';
}

/** A To/Cc header into bare addresses. */
function addressList_(headerValue) {
  if (!headerValue) return [];
  var matches = normaliseTyped_(headerValue).match(new RegExp(ONE_ADDRESS.source, 'g'));
  return matches || [];
}

/** The bare address inside any header value, named or not. '' if there is none. */
function bareAddress_(value) {
  var m = normaliseTyped_(value).match(ONE_ADDRESS);
  return m ? m[0] : '';
}

/**
 * A header split into its individual recipients, on commas and semicolons that
 * are not inside quotes or angle brackets — so a name written "Barman,
 * Barbara" stays one person instead of becoming two.
 */
function splitHeaderParts_(headerValue) {
  var text = normaliseTyped_(headerValue);
  var parts = [];
  var current = '';
  var inQuotes = false;
  var inAngles = false;
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === '<') inAngles = true;
    else if (ch === '>') inAngles = false;
    if ((ch === ',' || ch === ';') && !inQuotes && !inAngles) {
      parts.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts;
}

/**
 * One recipient as the contract's version-2 form: "Barbara Barman
 * <boone2002@att.net>" when the header carries a name, the bare address when
 * it does not. '' when the part holds no address at all.
 *
 * The name is passed through because the server cannot invent one, and
 * inventing one is what it used to do: "Boone2002@att.net" became "Boone2002"
 * in a student's tracker (ENGINE-RULES §8, decision D4).
 */
function namedAddress_(part) {
  var text = normaliseTyped_(part);
  var address = bareAddress_(text);
  if (address === '') return '';
  var name = text.slice(0, text.indexOf(address))
    .replace(/[<>"]/g, ' ')
    .replace(/,\s*$/, '')
    .trim();
  // A "name" that is itself an address is the mail client repeating itself.
  if (name === '' || name.indexOf('@') !== -1) return address;
  return name + ' <' + address + '>';
}

/** A To/Cc header into addresses that keep their display names. */
function namedAddressList_(headerValue) {
  if (!headerValue) return [];
  var out = [];
  splitHeaderParts_(headerValue).forEach(function (part) {
    var one = namedAddress_(part);
    if (one !== '') out.push(one);
  });
  return out;
}

/** A From header, keeping its display name. */
function firstNamedAddress_(headerValue) {
  var list = namedAddressList_(headerValue);
  return list.length > 0 ? list[0] : '';
}

/**
 * Plain text with the quoted history cut off — the contract sends bodies for
 * bounce and auto-reply detection and nothing else, and both live at the top.
 * Mechanical cut, not a judgment: stop at the first quoted line or reply
 * divider.
 */
function stripQuotedHistory_(text) {
  var lines = text.split('\n');
  var kept = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^\s*>/.test(line)) break;
    if (/^On .{0,200}wrote:\s*$/.test(line)) break;
    if (/^-{2,}\s*Original Message\s*-{2,}$/i.test(line)) break;
    if (/^_{5,}\s*$/.test(line)) break;
    if (/^From:\s.+$/.test(line) && i + 1 < lines.length && /^(Sent|Date):\s/.test(lines[i + 1])) break;
    kept.push(line);
  }
  return kept.join('\n').trim();
}
