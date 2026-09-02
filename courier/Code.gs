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
 * blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md, version 1.
 */

var CONTRACT_VERSION = 1;
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
// bad, and a bad response means we write nothing.
var VALID_STATUSES = ['Not emailed', 'Bounced', 'Sent', 'Replied', 'Call scheduled', 'Call done', 'Closed'];

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

  // Closed is a checkbox column so nobody has to remember magic words.
  var closedCol = findColumn_(contacts, COL_CLOSED);
  if (closedCol > 0 && contacts.getMaxRows() > 1) {
    contacts.getRange(2, closedCol, contacts.getMaxRows() - 1, 1)
      .insertCheckboxes();
  }
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
  settings.autoResizeColumn(1);

  SpreadsheetApp.getUi().alert(
    'Blotter is set up.\n\n' +
    'Next: open the Settings tab and fill in "' + SETTING_ADDRESSES + '" — ' +
    'every address you send email from, separated by commas.\n\n' +
    'Then use Blotter → Step 2: Run once now.'
  );
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

function ensureSettingRow_(sheet, label, defaultValue) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 0) {
    var labels = sheet.getRange(1, 1, lastRow, 1).getValues();
    for (var i = 0; i < labels.length; i++) {
      if (String(labels[i][0]).trim() === label) return;
    }
  }
  sheet.appendRow([label, defaultValue]);
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
    runMetrics_ = { startedMs: new Date().getTime(), searches: 0, threadFetches: 0, threads: 0, messages: 0 };
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
      now: toIso_(new Date()),
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
    var suggested = writeFoundSuggestions_(ss, sheetState, foundState, response.found || []);
    writeSetting_(ss, SETTING_LAST_RUN, new Date());
    writeSetting_(ss, SETTING_WARNINGS,
      (response.warnings && response.warnings.length) ? response.warnings.join(' | ') : 'None');

    // The measurement (13-BRIEF-COURIER-2 §2): what a run actually costs.
    var seconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
    writeSetting_(ss, SETTING_RUN_TOOK, seconds + ' seconds');
    writeSetting_(ss, SETTING_RUN_FETCHED,
      runMetrics_.threads + ' conversations, ' + runMetrics_.messages + ' messages');
    writeSetting_(ss, SETTING_GMAIL_CALLS,
      (runMetrics_.searches + runMetrics_.threadFetches) +
      ' (' + runMetrics_.searches + ' searches, ' + runMetrics_.threadFetches + ' conversation fetches)');

    return 'Updated ' + response.rows.length + ' contact row(s). ' +
      'Added ' + added + ' approved contact(s). ' +
      'Suggested ' + suggested + ' new name(s) in the Found tab. ' +
      'Took ' + seconds + ' seconds.';
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
    mailDaysBack: positiveOrDefault_(byLabel[SETTING_MAIL_BACK], MAIL_DAYS_BACK_DEFAULT)
  };
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
  rows.forEach(function (row, i) {
    var rowNumber = i + 2; // sheet row — the contract's join key
    var name = String(row[cols.name - 1]).trim();
    var firm = cols.firm > 0 ? String(row[cols.firm - 1]).trim() : '';
    var emails = addressList_(row[cols.email - 1]);
    if (name === '' && emails.length === 0) return; // blank padding row

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
    emailsInSheet: emailsInSheet
  };
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
    var messages = thread.getMessages().map(function (m) {
      return {
        id: m.getId(),
        date: toIso_(m.getDate()),
        from: firstAddress_(m.getFrom()),
        to: addressList_(m.getTo()),
        cc: addressList_(m.getCc()),
        subject: m.getSubject() || '',
        body: stripQuotedHistory_(m.getPlainBody() || ''),
        is_outbound: false // set below, once, against the student's addresses
      };
    });
    runMetrics_.threads++;
    runMetrics_.messages += messages.length;
    out.push({ thread_id: id, messages: messages });
  });
  return out;
}

/** Marks is_outbound per the contract: from is one of the student's addresses. */
function markOutbound_(threads, studentAddresses) {
  var mine = {};
  studentAddresses.forEach(function (a) { mine[a.toLowerCase()] = true; });
  threads.forEach(function (t) {
    t.messages.forEach(function (m) {
      m.is_outbound = !!mine[(m.from || '').toLowerCase()];
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
    return {
      id: e.getId(),
      title: e.getTitle() || '',
      start: toIso_(e.getStartTime()),
      end: toIso_(e.getEndTime()),
      attendees: e.getGuestList(true).map(function (g) { return g.getEmail(); }),
      organizer: creators && creators.length ? creators[0] : ''
    };
  });
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
    'Days': function (r) { return r.days === null || r.days === undefined ? '' : r.days; },
    'Last contact': function (r) { return r.last_contact === null || r.last_contact === undefined ? '' : r.last_contact; },
    'Attempts': function (r) { return r.attempts === null || r.attempts === undefined ? '' : r.attempts; },
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
  foundState.approvals.forEach(function (a) {
    if (!sheetState.emailsInSheet[a.email.toLowerCase()]) {
      var newRow = [];
      for (var i = 0; i < sheetState.lastCol; i++) newRow.push('');
      newRow[sheetState.cols.name - 1] = a.name;
      newRow[sheetState.cols.email - 1] = a.email;
      sheetState.sheet.appendRow(newRow);
      sheetState.emailsInSheet[a.email.toLowerCase()] = true;
      added++;
    }
    foundState.sheet.getRange(a.rowNumber, foundState.cols.add).setValue('Added');
  });
  foundState.rejections.forEach(function (rowNumber) {
    foundState.sheet.getRange(rowNumber, foundState.cols.add).setValue('Ignored');
  });
  return added;
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

/** "Jamie Diamond <jamie@x.com>" → "jamie@x.com". */
function firstAddress_(headerValue) {
  var list = addressList_(headerValue);
  return list.length > 0 ? list[0] : '';
}

/** A To/Cc header into bare addresses. */
function addressList_(headerValue) {
  if (!headerValue) return [];
  var matches = String(headerValue).match(/[A-Za-z0-9._%+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g);
  return matches || [];
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
