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
 * blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md, version 3.
 */

var CONTRACT_VERSION = 3;
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
  ensureSettingRow_(settings, SETTING_PRETEND_TODAY, '', PRETEND_TODAY_HELP);
  settings.autoResizeColumn(1);

  SpreadsheetApp.getUi().alert(
    'Blotter is set up.\n\n' +
    'Next: open the Settings tab and fill in "' + SETTING_ADDRESSES + '" — ' +
    'every address you send email from, separated by commas.\n\n' +
    'Then use Blotter → Step 2: Run once now.'
  );
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
    var response = postToServer_(settings.serverUrl, request);
    validateResponse_(response, sheetState.contacts);

    // --- Write phase. Everything below is prepared; nothing above wrote. ---
    writePhaseBegun_ = true;
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

    return (pretendWarning ? '*** ' + pretendWarning + ' ***\n\n' : '') +
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
    pretendNow: pretendNowIso_(byLabel[SETTING_PRETEND_TODAY])
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
      return {
        id: m.getId(),
        date: toIso_(m.getDate()),
        from: firstNamedAddress_(m.getFrom()),
        to: namedAddressList_(m.getTo()),
        cc: namedAddressList_(m.getCc()),
        subject: m.getSubject() || '',
        body: stripQuotedHistory_(m.getPlainBody() || ''),
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
    throw new Error('The Blotter server answered with status ' + code + ' instead of 200.');
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
    'Last contact': function (r) { return r.last_contact === null || r.last_contact === undefined ? '' : r.last_contact; },
    // A dash, for the same reason Days uses one (D24): the server decides where
    // a number means something and sends null everywhere else. The courier
    // renders that and makes no judgment about which states deserve a count.
    'Attempts': function (r) { return r.attempts === null || r.attempts === undefined ? NO_CLOCK : r.attempts; },
    'Next call': function (r) { return r.next_call === null || r.next_call === undefined ? '' : r.next_call; },
    'Last call': function (r) { return r.last_call === null || r.last_call === undefined ? '' : r.last_call; }
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
