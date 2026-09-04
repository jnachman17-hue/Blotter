/**
 * Blotter
 *
 * This file is the part of Blotter that lives in your spreadsheet. It runs
 * inside your own Google account, and only for this one sheet.
 *
 * What it does
 *   Every fifteen minutes it looks at your Gmail and Google Calendar, works
 *   out where each conversation in your Contacts tab stands, and writes that
 *   into Blotter's own columns: Status, Days, Last contact, Attempts, Next
 *   call and Last call. The judgment about what a status should be is made
 *   on Blotter's server. This file collects the facts and writes the answer.
 *
 * What it can see
 *   The outside of your emails: who sent them, who they went to, when, and
 *   the subject line. It does not read the text of your emails. The one thing
 *   it opens is an automated delivery-failure notice, to find out which
 *   address bounced. It reads your calendar events: title, time and guests.
 *   It only looks at conversations that already involve someone in your
 *   Contacts tab.
 *
 * What it never does
 *   It never sends, replies to, labels, archives or deletes an email. It
 *   never creates or changes a calendar event. It never opens an attachment.
 *   It writes only to this spreadsheet, and only to Blotter's own columns and
 *   tabs, never to a cell you typed in. If anything goes wrong during a run
 *   it writes nothing at all.
 *
 * What leaves your account
 *   The envelope details above, and your calendar events, go to Blotter's
 *   server so it can work out each status. The text of an email never leaves
 *   your account, because it is never read. Blotter does not keep a copy of
 *   your sheet.
 *
 * Limits
 *   It reads the mailbox of the account this sheet is in, and no other.
 *   Anything that happened by phone, text, LinkedIn or in person is invisible
 *   to it. It cannot tell you when to follow up. It shows you what is true and
 *   how long it has been true.
 *
 * Help: blotterib@gmail.com
 */

var CONTRACT_VERSION = 4;

var COURIER_VERSION = '2026-09-03';
var SERVER_URL_DEFAULT = 'https://blotterib.com/api/engine';

var TAB_CONTACTS = 'Contacts';
var TAB_FOUND = 'Found';
var TAB_SETTINGS = 'Settings';

var COL_NAME = 'Name';
var COL_TITLE = 'Title';
var COL_FIRM = 'Firm';
var COL_EMAIL = 'Email';

var BLOTTER_COLUMNS = ['Status', 'Days', 'Last contact', 'Attempts', 'Next call', 'Last call'];
var COL_CLOSED = 'Closed';

var NOTICE_WIDTH = 6;
var NOTICE_STYLES = {
  info:    { fill: '#e8f0fe', text: '#1a3d6d' },
  warning: { fill: '#fdf0d5', text: '#7a4c00' },
  blocked: { fill: '#fbe3e0', text: '#8c1d12' }
};
var NOTICE_TAB_COLOUR = { info: '#4a7fd4', warning: '#d9a441', blocked: '#c0392b' };

var VALID_STATUSES = ['Not emailed', 'Bounced', 'Sent', 'Replied', 'Call scheduled',
                      'Call done', 'Call cancelled', 'Closed'];

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

var SETTING_PRETEND_TODAY = 'Pretend today is (TESTING - leave blank)';
var PRETEND_TODAY_HELP =
  'FOR TESTING ONLY. Leave this blank. A date here makes Blotter compute every ' +
  'row as if that were today, so Status and Days will be wrong for the real ' +
  'world. Clear the cell and run again to go back to normal.';

var runMetrics_ = null;

var EVENT_DAYS_BACK_DEFAULT = 365;
var EVENT_DAYS_FORWARD_DEFAULT = 180;

var MAIL_DAYS_BACK_DEFAULT = 365;

var DAY_STARTS_AT_HOUR = 7;
var DAY_ENDS_AT_HOUR = 22;
var NIGHT_EVERY_MINUTES = 120;

var PROP_LAST_WORKED_MS = 'blotterLastWorkedMs';

var PROP_INSTALL_ID = 'blotterInstallId';

var TELEMETRY_URL_DEFAULT = 'https://blotterib.com/api/telemetry';
var SETTING_TELEMETRY = 'Usage counting endpoint';

var SETTING_INSTALL_ID = 'Your Blotter ID (quote this if you need help)';

var SETTING_HELP = 'Help';

var SETTING_KEY = 'Blotter key';

var PROP_DESIGN_VERSION = 'blotterDesignVersion';
var PROP_DESIGN_PAYLOAD = 'blotterDesignPayload';
var DESIGN_URL_DEFAULT = 'https://blotterib.com/api/design';
var HELP_EMAIL = 'blotterib@gmail.com';
var HELP_URL = 'https://blotterib.com/contact';

var SCRIPT_URL = 'https://blotterib.com/Code.gs';

var writePhaseBegun_ = false;

var ADDRESSES_PER_SEARCH = 10;

var MAX_THREAD_RECIPIENTS = 10;

var THEME = 'bands';

var INK = '#14181f';
var INK_MUTED = '#5f6368';
var INK_FAINT = '#a4a8ac';
var SHEET_BORDER = '#dadce0';
var BLOTTER_YELLOW = '#d9b64a';
var BLOTTER_LABEL = '#8a6d12';

var THEMES = {

  hero: {
    manualHeader: '#edf2f8',
    keptHeader: '#f7f2e8',
    manualRow: null,
    keptRow: null,
    dividerColour: SHEET_BORDER,
    dividerWeight: 'medium'
  },

  bands: {
    manualHeader: '#edf2f8',
    keptHeader: '#f7f2e8',
    manualRow: null,
    keptRow: null,
    dividerColour: BLOTTER_YELLOW,
    dividerWeight: 'thick'
  },

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

function statusStyle_(status) {
  var sent = design_().status_style;
  if (sent && sent[status]) return sent[status];
  return STATUS_STYLE[status] || null;
}

function columnWidth_(tab, heading) {
  var sent = design_().widths;
  if (sent && sent[tab] && sent[tab][heading] !== undefined) return sent[tab][heading];
  var defaults = tab === 'found' ? FOUND_WIDTHS : CONTACTS_WIDTHS;
  return defaults[heading] === undefined ? null : defaults[heading];
}

function numberFormat_(heading, fallback) {
  var sent = design_().number_formats;
  if (sent && sent[heading]) return sent[heading];
  return fallback;
}

function instructionRowsInForce_() {
  var sent = design_().instructions;
  return (sent && sent.length) ? sent : instructionRows_();
}

function dividerStyle_() {
  return theme_().dividerWeight === 'thick'
    ? SpreadsheetApp.BorderStyle.SOLID_THICK
    : SpreadsheetApp.BorderStyle.SOLID_MEDIUM;
}

var STATUS_STYLE = {

  'Not emailed':    { bg: '#ffffff', fg: INK_FAINT },
  'Bounced':        { bg: '#fce8e6', fg: '#c5221f' },

  'Sent':           { bg: '#dfe3e8', fg: '#3c4043' },
  'Replied':        { bg: '#d7e7fb', fg: '#1a56a8' },
  'Call scheduled': { bg: '#e5ddf7', fg: '#5b3fa8' },
  'Call done':      { bg: '#d7f0dd', fg: '#1e6b34' },
  'Call cancelled': { bg: '#fbeacb', fg: '#8a5a00' },

  'Closed':         { bg: '#ffffff', fg: INK_FAINT }
};

var CONTACTS_WIDTHS = {
  'Name': 150, 'Title': 120, 'Firm': 150, 'Email': 190,
  'Status': 132, 'Days': 62, 'Last contact': 108, 'Attempts': 82,
  'Next call': 142, 'Last call': 108, 'Closed': 72
};

var FOUND_WIDTHS = { 'Add?': 84, 'Name': 150, 'Email': 200, 'First seen': 100, 'Context': 340 };

var HEADER_ROW_HEIGHT = 30;
var BODY_ROW_HEIGHT = 26;

function manualColumns_() { return [COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL]; }

function formatContacts_(sheet) {
  var t = theme_();
  var maxRows = sheet.getMaxRows();
  var hRow = headerRow_(sheet);
  var first = hRow + 1;
  var body = maxRows - hRow;
  if (body < 1) return;

  var col = {};
  manualColumns_().concat(BLOTTER_COLUMNS).concat([COL_CLOSED]).forEach(function (h) {
    col[h] = findColumn_(sheet, h);
    var w = columnWidth_('contacts', h);
    if (col[h] > 0 && w) sheet.setColumnWidth(col[h], w);
  });

  var lastCol = sheet.getLastColumn();
  var all = sheet.getRange(1, 1, maxRows, lastCol);
  all.setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');

  var header = sheet.getRange(hRow, 1, 1, lastCol);
  header.setFontWeight('bold').setFontColor(INK);
  sheet.setRowHeight(hRow, HEADER_ROW_HEIGHT);
  paintColumns_(sheet, col, manualColumns_(), hRow, 1, t.manualHeader);
  paintColumns_(sheet, col, BLOTTER_COLUMNS, hRow, 1, t.keptHeader);

  paintColumns_(sheet, col, [COL_CLOSED], hRow, 1, t.manualHeader);

  if (t.manualRow) {
    paintColumns_(sheet, col, manualColumns_(), first, body, t.manualRow);
    paintColumns_(sheet, col, [COL_CLOSED], first, body, t.manualRow);
  }
  if (t.keptRow) paintColumns_(sheet, col, BLOTTER_COLUMNS, first, body, t.keptRow);

  sheet.setRowHeights(first, body, BODY_ROW_HEIGHT);

  if (col[COL_TITLE] > 0) {
    sheet.getRange(first, col[COL_TITLE], body, 1).setFontStyle('italic').setFontColor(INK_MUTED);
  }
  if (col[COL_EMAIL] > 0) sheet.getRange(first, col[COL_EMAIL], body, 1).setFontColor(INK_MUTED);

  ['Days', 'Attempts'].forEach(function (h) {
    if (col[h] > 0) sheet.getRange(first, col[h], body, 1).setHorizontalAlignment('right');
  });
  ['Last contact', 'Last call'].forEach(function (h) {
    if (col[h] > 0) sheet.getRange(first, col[h], body, 1).setNumberFormat(numberFormat_(h, 'm/d/yy'));
  });

  if (col['Next call'] > 0) {
    sheet.getRange(first, col['Next call'], body, 1)
      .setNumberFormat(numberFormat_('Next call', 'm/d "@" h:mm AM/PM'));
  }
  if (col[COL_CLOSED] > 0) {
    sheet.getRange(hRow, col[COL_CLOSED], maxRows - hRow + 1, 1).setHorizontalAlignment('center');
  }

  var style = dividerStyle_();
  if (col['Status'] > 0) {
    sheet.getRange(1, col['Status'], maxRows, 1)
      .setBorder(null, true, null, null, null, null, t.dividerColour, style);
  }
  if (col[COL_CLOSED] > 0) {
    sheet.getRange(1, col[COL_CLOSED], maxRows, 1)
      .setBorder(null, true, null, null, null, null, t.dividerColour, style);
  }

  SpreadsheetApp.flush();

  applyStatusColours_(sheet, col['Status'], maxRows, first);
  applyClosedRowFade_(sheet, col[COL_CLOSED], maxRows, lastCol, first);

  sheet.setFrozenRows(hRow);
  if (col[COL_NAME] > 0) sheet.setFrozenColumns(col[COL_NAME]);
}

function paintColumns_(sheet, col, names, startRow, numRows, colour) {
  names.forEach(function (h) {
    if (col[h] > 0) sheet.getRange(startRow, col[h], numRows, 1).setBackground(colour);
  });
}

function applyStatusColours_(sheet, statusCol, maxRows, first) {
  if (!statusCol || statusCol < 1) return;
  var range = sheet.getRange(first, statusCol, maxRows - first + 1, 1);

  var keep = sheet.getConditionalFormatRules().filter(function (rule) {
    return !rule.getRanges().some(function (r) {
      return r.getColumn() === statusCol;
    });
  });

  VALID_STATUSES.forEach(function (status) {
    var style = statusStyle_(status);
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

function applyClosedRowFade_(sheet, closedCol, maxRows, lastCol, first) {
  if (!closedCol || closedCol < 1) return;
  var letter = columnLetter_(closedCol);
  var range = sheet.getRange(first, 1, maxRows - first + 1, lastCol);
  var rules = sheet.getConditionalFormatRules();
  rules.push(SpreadsheetApp.newConditionalFormatRule()

    .whenFormulaSatisfied('=$' + letter + first + '=TRUE')
    .setFontColor(INK_FAINT)
    .setStrikethrough(true)
    .setRanges([range])
    .build());
  sheet.setConditionalFormatRules(rules);
}

function safeCell_(value) {
  if (value === null || value === undefined) return '';
  var text = String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

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
  var hRow = headerRow_(sheet);
  var first = hRow + 1;
  var body = maxRows - hRow;
  if (body < 1) return;
  var lastCol = Math.max(sheet.getLastColumn(), FOUND_HEADERS.length);

  FOUND_HEADERS.forEach(function (h) {
    var c = findColumn_(sheet, h);
    var fw = columnWidth_('found', h);
    if (c > 0 && fw) sheet.setColumnWidth(c, fw);
  });

  sheet.getRange(1, 1, maxRows, lastCol).setFontFamily('Arial').setFontSize(10).setVerticalAlignment('middle');
  sheet.getRange(hRow, 1, 1, lastCol).setFontWeight('bold').setFontColor(INK).setBackground(theme_().keptHeader);
  sheet.setRowHeight(hRow, HEADER_ROW_HEIGHT);
  sheet.setRowHeights(first, body, BODY_ROW_HEIGHT);
  sheet.setFrozenRows(hRow);

  var addCol = findColumn_(sheet, 'Add?');
  if (addCol > 0) {
    sheet.getRange(first, addCol, body, 1).setHorizontalAlignment('center').setFontWeight('bold');
  }
  ['Context'].forEach(function (h) {
    var c = findColumn_(sheet, h);
    if (c > 0) sheet.getRange(first, c, body, 1).setWrap(true).setFontColor(INK_MUTED);
  });
  var seen = findColumn_(sheet, 'First seen');
  if (seen > 0) sheet.getRange(first, seen, body, 1).setNumberFormat('m/d/yy').setFontColor(INK_MUTED);

  var keep = sheet.getConditionalFormatRules().filter(function (rule) {
    return !rule.getRanges().some(function (r) { return r.getColumn() === addCol; });
  });
  if (addCol > 0) {
    var r = sheet.getRange(first, addCol, body, 1);
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

  [SETTING_LAST_RUN, SETTING_WARNINGS, SETTING_RUN_TOOK, SETTING_RUN_FETCHED,
   SETTING_GMAIL_CALLS].forEach(function (label) {
    var row = settingRow_(sheet, label);
    if (row > 0) sheet.getRange(row, 1, 1, 2).setFontColor(INK_MUTED);
  });

  var pretend = settingRow_(sheet, SETTING_PRETEND_TODAY);
  if (pretend > 0) {
    sheet.getRange(pretend, 1, 1, 3).setBackground('#fce8e6');
    sheet.getRange(pretend, 1).setFontColor('#c5221f');
    sheet.getRange(pretend, 3).setFontColor('#c5221f');
  }
}

function settingRow_(sheet, label) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;
  var labels = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (var i = 0; i < labels.length; i++) {
    if (String(labels[i][0]).trim() === label) return i + 1;
  }
  return 0;
}

var TAB_INSTRUCTIONS = 'Start here';

function instructionRows_() {
  var R = function (k, a, b, c) { return { k: k, a: a, b: b || '', c: c || 0 }; };
  return [
    R('title', 'Blotter'),
    R('deck', 'You manage the relationships. Blotter keeps the tracker current.'),
    R('gap'),

    R('h2', 'Finish setting up'),
    R('body', 'Four things, and then it runs on its own.'),
    R('step', '1.  Settings tab \u2192 \u201cYour email addresses\u201d. Every address you send recruiting email from, separated by commas.'),
    R('note', 'Most people have one. Add more only if you send from several addresses that all arrive in this inbox, such as a university address you reply as. Blotter reads the mailbox of the account this sheet is in, so an address on a different Google account will not work. Miss an address you send from and every row on those conversations reads backwards.'),
    R('step', '2.  File \u2192 Settings \u2192 Time zone. Set it to where you live.'),
    R('note', 'Day counts turn over at midnight in whatever this says, and a copy keeps the time zone of whoever built it.'),
    R('step', '3.  Contacts tab \u2192 add the people you are networking with.'),
    R('note', 'Name and Email are the two that matter. Paste addresses rather than typing them where you can: a hyphen your keyboard autocorrects is not the hyphen an email address uses. Blotter only looks at conversations with the people in this tab, so an empty sheet finds nothing. That is correct, not a fault.'),
    R('step', '4.  Blotter menu \u2192 Start automatic updates.'),
    R('slot', '[ screenshot: Blotter menu, Start automatic updates ]',
      'https://blotterib.com/setup/menu-updates.png', 220),
    R('gap'),

    R('h2', 'The one thing to understand'),
    R('strong', 'Blotter never edits your columns on the left: Name, Title, Firm, Email. You never have to touch the right: Status, Days, Last contact, Attempts, Next call, Last call.'),
    R('body', 'You type in who you are networking with. Blotter reads your Gmail and Calendar every 15 minutes and keeps the right-hand side current.'),
    R('note', 'Add any columns you like on the left. LinkedIn, notes, where you met, anything, anywhere. Blotter finds its own columns by their headings rather than by position, and it will not touch yours.'),
    R('gap'),

    R('h2', 'What the statuses mean'),
    R('status', 'Not emailed', 'They are in your tracker. No outreach has been sent yet.'),
    R('status', 'Sent', 'You wrote last. No response yet.'),
    R('status', 'Replied', 'They wrote last. The ball is yours.'),
    R('status', 'Call scheduled', 'There is a calendar event with them coming up.'),
    R('status', 'Call done', 'The call happened and nobody has written since. Usually means you owe a thank-you.'),
    R('status', 'Call cancelled', 'Someone declined the call invite. Clears as soon as either of you sends a new email.'),
    R('status', 'Bounced', 'That address does not work. Find another one.'),
    R('status', 'Closed', 'You ticked Closed because the correspondence has naturally resolved. Usually a coffee chat happened, you sent the thank-you, and nothing further is expected. Blotter leaves the row alone and fades it out of the way.'),
    R('gap'),

    R('h2', 'The two numbers'),
    R('body', 'Days: how long since the last thing that actually happened on that contact. On Sent it counts from the email you sent, on Replied from the one they sent, on Call done from the call itself.'),
    R('body', 'Attempts: how many times you have written since they last wrote back.'),
    R('note', 'Both show a dash where there is nothing to count.'),
    R('gap'),

    R('h2', 'Why Blotter does not tell you when to follow up'),
    R('body', 'Because it would be wrong. In one real recruiting season, replies came back after 7, 11, 13 and 22 days, and the 22-day one led to four interview rounds. A follow-up rule would have chased that person more than two weeks before she answered. Blotter shows you what is true and how long it has been true, and you decide.'),
    R('body', 'Blotter menu \u2192 Sort contacts \u2192 by what they are waiting on. That is the list of who you owe and who owes you, in order.'),
    R('gap'),

    R('h2', 'Things that look wrong and are not'),
    R('status', 'Nothing found on day one', 'Add people first. Blotter only looks at conversations with the people in Contacts.'),
    R('status', 'Something arrived, nothing changed', 'An out-of-office, an auto-reply or a calendar acceptance is not a reply. Blotter waits for a person.'),
    R('status', 'A new contact is blank', 'Contacts you approve from Found are blank for one run. The server has not met them yet.'),
    R('status', 'Stuck on Not emailed', 'Blotter cannot read that email address. Settings \u2192 Last run warnings names the row.'),
    R('status', 'Nothing is updating', 'Settings \u2192 Last successful run. If it is old, run Blotter \u2192 Step 2 by hand and read the message.'),
    R('status', 'Every row looks wrong', 'Settings \u2192 \u201cPretend today is\u201d must be empty. It is a testing setting.'),
    R('status', 'Not sure what is wrong', 'Blotter menu \u2192 Check this sheet (diagnostics). It says what is connected and what is missing, in plain words.'),
    R('gap'),

    R('h2', 'Sorting'),
    R('body', 'Blotter menu \u2192 Sort contacts. By what each contact is waiting on, by title from most junior, or grouped by firm.'),
    R('note', 'Sorting moves whole rows and keeps everything you typed, including your own columns and any formulas in them.'),
    R('gap'),

    R('h2', 'The Found tab'),
    R('body', 'When somebody new turns up in a conversation with one of your contacts, a colleague copied in or an assistant replying, Blotter puts them in Found rather than adding them to Contacts.'),
    R('step', 'Yes  \u2192  they become a contact on the next run.'),
    R('step', 'No   \u2192  never suggested again.'),
    R('warn', 'Do not delete a row marked Ignored. That row is the memory that you said no. Delete it and they come back.'),
    R('gap'),

    R('h2', 'Yours to change, and what to leave alone'),
    R('body', 'It is your spreadsheet. Almost everything in it is yours to do what you like with.'),
    R('strong', 'Yours: add any columns you like, anywhere. Colour them. Put formulas in them. Add rows, delete rows, sort however you want. Rename the file. Add your own tabs.'),
    R('warn', 'Leave alone: the headings Blotter writes, and Name, Email and Closed. Rename or delete one and Blotter stops and tells you. Do not give one of your own columns a Blotter heading either: two columns called Days and it cannot tell which is which.'),
    R('warn', 'A formula in one of Blotter\u2019s columns will not survive. Those cells are rewritten every run. Put the formula in a column of your own and it is safe.'),
    R('note', 'The Contacts, Found and Settings tabs need to keep their names. Colour you apply to Blotter\u2019s own columns is reset by Step 1; colour your own columns instead.'),
    R('strong', 'If anything goes wrong: Blotter \u2192 Step 1: Set up this sheet. It rebuilds what is missing and does not touch your contacts.'),
    R('gap'),

    R('h2', 'Updates'),
    R('body', 'When Blotter is updated, a notice appears at the top of Contacts. Updating replaces only the code. Your contacts, settings, Found decisions and timer all stay. Run Step 1 afterwards; that is what adds anything new.'),
    R('gap'),

    R('h2', 'What Blotter can see'),
    R('strong', 'It reads the outside of your emails: who wrote, who it went to, when, and the subject line. It cannot read the text of an email, and Blotter\u2019s server cannot receive it.'),
    R('body', 'The one message it opens is an automated delivery-failure notice, to find out which address bounced. It reads your calendar events: title, time and guests. It only looks at conversations with the people in your Contacts tab.'),
    R('body', 'Blotter never sends email. Never replies. Never edits or deletes anything in your inbox. Never creates or changes a calendar event.'),
    R('gap'),

    R('h2', 'What Blotter cannot see'),
    R('body', 'Anything by phone, text, LinkedIn or in person. If a relationship moved off email, the row will not know. It reads the mailbox of the account this sheet is in, and no other.'),
    R('gap'),

    R('h2', 'If Blotter stops'),
    R('body', 'Nothing is lost. This is an ordinary spreadsheet in your own Drive with everything in it. The Blotter columns simply stop updating. Blotter menu \u2192 Stop automatic updates turns it off, and deleting the sheet removes it entirely.'),
    R('note', 'The Blotter key row in Settings is not needed yet. Leave it empty.'),
    R('gap'),

    R('h2', 'Still stuck'),
    R('body', HELP_URL + '  \u00b7  ' + HELP_EMAIL),
    R('note', 'Quote the Blotter ID from the Settings tab. It says which sheet is yours without saying anything about you.')
  ];
}

function buildInstructions_(ss) {
  var sheet = ss.getSheetByName(TAB_INSTRUCTIONS);
  if (!sheet) sheet = ss.insertSheet(TAB_INSTRUCTIONS, 0);
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(1);
  sheet.clear();
  sheet.clearFormats();

  var rows = instructionRowsInForce_();
  var values = rows.map(function (r) { return ['', r.a, r.b]; });
  sheet.getRange(1, 1, values.length, 3).setValues(values);

  sheet.setColumnWidth(1, 46);
  sheet.setColumnWidth(2, 300);
  sheet.setColumnWidth(3, 560);
  sheet.getRange(1, 1, sheet.getMaxRows(), 4)
    .setFontFamily('Arial').setBackground('#ffffff').setVerticalAlignment('middle');
  sheet.setHiddenGridlines(true);

  formatInstructions_(sheet, rows);
  sheet.getRange('A1').activate();
}

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

      var style = statusStyle_(r.a) || { bg: '#f8f9fa', fg: INK_MUTED };
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

      if (r.b) {
        span.merge();
        sheet.getRange(row, 2).setFormula('=IMAGE("' + String(r.b).replace(/"/g, '') + '", 1)');
        sheet.setRowHeight(row, r.c || 150);
      } else {
        span.merge().setValue(r.a).setFontSize(10).setFontColor(INK_FAINT)
          .setHorizontalAlignment('center').setBackground('#f8f9fa')
          .setBorder(true, true, true, true, null, null, '#e8eaed', SpreadsheetApp.BorderStyle.DASHED);
        sheet.setRowHeight(row, 40);
      }
    } else if (r.k === 'gap') {
      sheet.setRowHeight(row, 14);
    } else {
      span.merge().setValue(r.a).setFontSize(11).setFontColor(INK).setWrap(true);
      sheet.setRowHeight(row, r.k === 'step' ? 30 : 46);
      if (r.k === 'step') sheet.getRange(row, 2, 1, 2).setFontColor(INK);
    }
  });
}

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

function stateRank_(status) {
  var sent = design_().state_rank;
  if (sent && sent[status] !== undefined) return sent[status];
  var order = {
    'Replied': 10,
    'Sent': 20,
    'Not emailed': 30,
    'Bounced': 40,
    'Call done': 50,
    'Call scheduled': 60,
    'Call cancelled': 70,
    'Closed': 80
  };
  var r = order[String(status || '').trim()];
  return r === undefined ? 75 : r;
}

function sortContactsByTitle() { sortContacts_('title'); }
function sortContactsByFirm()  { sortContacts_('firm'); }
function sortContactsByState() { sortContacts_('state'); }

function sortContacts_(mode) {
  var lock = LockService.getScriptLock();

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
    var first = firstDataRow_(sheet);
    var lastRow = sheet.getLastRow();
    if (lastRow < first + 1) return;

    var lastCol = sheet.getLastColumn();
    var scratch = lastCol + 1;
    var height = lastRow - first + 1;
    var data = sheet.getRange(first, 1, height, lastCol).getValues();

    var keys = data.map(function (row) {
      var name = cols.name > 0 ? String(row[cols.name - 1]).trim() : '';
      var email = cols.email > 0 ? String(row[cols.email - 1]).trim() : '';

      if (name === '' && email === '') return ['￿'];

      var title = cols.title > 0 ? row[cols.title - 1] : '';
      var firm = cols.firm > 0 ? String(row[cols.firm - 1]).trim().toLowerCase() : '';
      var status = cols.status > 0 ? row[cols.status - 1] : '';

      var days = cols.days > 0 ? Number(row[cols.days - 1]) : NaN;
      var stale = isNaN(days) ? 0 : 9999 - days;

      if (mode === 'title') return [pad_(titleRank_(title)), firm, name.toLowerCase()];
      if (mode === 'firm') return [firm || '￾', pad_(titleRank_(title)), name.toLowerCase()];
      return [pad_(stateRank_(status)), pad_(stale), name.toLowerCase()];
    });

    sheet.getRange(first, scratch, height, 1)
      .setValues(keys.map(function (k) { return [k.join('|')]; }));

    sheet.sort(scratch, true);
    sheet.getRange(first, scratch, height, 1).clearContent();

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

function pad_(n) {
  var s = String(Math.max(0, Math.round(n)));
  while (s.length < 5) s = '0' + s;
  return s;
}

var HEADER_ROW_SEARCH_DEPTH = 4;
var headerRowCache_ = {};

function headerAnchors_(sheetName) {
  if (sheetName === TAB_FOUND) return ['Add?', 'Email'];
  return [COL_NAME, COL_EMAIL, 'Status'];
}

function headerRow_(sheet) {
  var key = sheet.getSheetId();
  if (headerRowCache_[key]) return headerRowCache_[key];

  var anchors = headerAnchors_(sheet.getName());
  var wanted = {};
  for (var a = 0; a < anchors.length; a++) wanted[anchors[a].toLowerCase()] = true;

  var lastCol = sheet.getLastColumn();
  var depth = Math.min(HEADER_ROW_SEARCH_DEPTH, sheet.getMaxRows());
  var found = 1;

  if (lastCol > 0 && depth > 0) {
    var grid = sheet.getRange(1, 1, depth, lastCol).getValues();

    var best = 0;
    for (var r = 0; r < grid.length; r++) {
      var row = grid[r] || [];
      var score = 0;
      for (var c = 0; c < row.length; c++) {
        if (wanted[String(row[c]).trim().toLowerCase()]) score++;
      }
      if (score > best) { best = score; found = r + 1; }
    }
    if (best < 2) found = 1;
  }
  headerRowCache_[key] = found;
  return found;
}

function firstDataRow_(sheet) { return headerRow_(sheet) + 1; }

function dataHeight_(sheet) { return Math.max(0, sheet.getMaxRows() - headerRow_(sheet)); }

function resetHeaderRowCache_() { headerRowCache_ = {}; }

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Blotter')
    .addItem('Step 1: Set up this sheet', 'setupSheet')
    .addItem('Step 2: Run once now', 'runNow')
    .addSeparator()
    .addItem('Start automatic updates (every 15 min)', 'startAutomaticUpdates')
    .addItem('Stop automatic updates', 'stopAutomaticUpdates')
    .addSeparator()
    .addItem('Check this sheet (diagnostics)', 'checkThisSheet')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('Sort contacts')
      .addItem('By what they are waiting on', 'sortContactsByState')
      .addItem('By title (analyst first)', 'sortContactsByTitle')
      .addItem('By firm', 'sortContactsByFirm'))
    .addSeparator()
    .addItem('Clear this sheet to hand to someone', 'prepareForHandover')
    .addToUi();
}

function applyDesign_(ss) {
  resetHeaderRowCache_();
  var contacts = ss.getSheetByName(TAB_CONTACTS);
  if (contacts) formatContacts_(contacts);
  var found = ss.getSheetByName(TAB_FOUND);
  if (found) formatFound_(found);
  buildInstructions_(ss);
}

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var contacts = ss.getSheetByName(TAB_CONTACTS);
  if (!contacts) {
    contacts = ss.insertSheet(TAB_CONTACTS, 0);
  }
  var wantedHeaders = [COL_NAME, COL_TITLE, COL_FIRM, COL_EMAIL]
    .concat(BLOTTER_COLUMNS)
    .concat([COL_CLOSED]);
  ensureHeaders_(contacts, wantedHeaders);
  contacts.setFrozenRows(1);

  syncClosedCheckboxes_({
    sheet: contacts,
    cols: {
      name: findColumn_(contacts, COL_NAME),
      email: findColumn_(contacts, COL_EMAIL),
      closed: findColumn_(contacts, COL_CLOSED)
    }
  });

  ['Last contact'].forEach(function (name) {
    var c = findColumn_(contacts, name);
    if (c > 0 && contacts.getMaxRows() > 1) {
      var cFirst = firstDataRow_(contacts);
      contacts.getRange(cFirst, c, contacts.getMaxRows() - cFirst + 1, 1).setNumberFormat('m/d/yy');
    }
  });

  var found = ss.getSheetByName(TAB_FOUND);
  if (!found) {
    found = ss.insertSheet(TAB_FOUND);
  }
  ensureHeaders_(found, FOUND_HEADERS);
  found.setFrozenRows(1);
  var addCol = findColumn_(found, 'Add?');
  if (addCol > 0 && found.getMaxRows() > 1) {

    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Yes', 'No', 'Added', 'Ignored'], true)
      .setAllowInvalid(true)
      .setHelpText('Pick Yes to add this person to Contacts, or No to never see them again.')
      .build();
    var fFirst = firstDataRow_(found);
    found.getRange(fFirst, addCol, found.getMaxRows() - fFirst + 1, 1).setDataValidation(rule);
  }

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
  ensureSettingRow_(settings, SETTING_KEY, '',
    'Blotter is free. Leave this empty. If that ever changes you will be told ' +
    'here in the sheet, and this is where the key would go.');
  ensureSettingRow_(settings, SETTING_HELP, HELP_URL + '  ·  ' + HELP_EMAIL,
    'Stuck, or something looks wrong? Start here. Quote your Blotter ID below.');
  ensureSettingRow_(settings, SETTING_INSTALL_ID, '',
    'Identifies this sheet and nothing about you. Blotter fills this in on its ' +
    'first run. You never type it.');
  ensureSettingRow_(settings, SETTING_TELEMETRY, TELEMETRY_URL_DEFAULT,
    'Counts how many sheets are running. Sends a random id for this sheet and ' +
    'a number of contacts. Never a name, address, subject or message. Clear ' +
    'this cell to switch it off.');
  ensureSettingRow_(settings, SETTING_PRETEND_TODAY, '', PRETEND_TODAY_HELP);
  settings.autoResizeColumn(1);

  ensureBannerRow_(contacts);
  ensureBannerRow_(found);

  formatContacts_(contacts);
  formatFound_(found);

  writeBanner_(contacts, null, restingBanner_());
  formatSettings_(settings);
  buildInstructions_(ss);

  var tz = ss.getSpreadsheetTimeZone();

  SpreadsheetApp.getUi().alert(
    'Blotter is set up.\n\n' +
    'This sheet\'s time zone is ' + tz + '. Day counts turn over at midnight ' +
    'there, so if that is not where you live, change it now: ' +
    'File → Settings → Time zone. A copied sheet keeps the time zone of ' +
    'whoever built it.\n\n' +
    'Read the "' + TAB_INSTRUCTIONS + '" tab first. It is four steps.\n\n' +
    'The short version: put every address you send email from into Settings → "' +
    SETTING_ADDRESSES + '", set File → Settings → Time zone to where you live, ' +
    'add a few people to Contacts, then Blotter → Step 2: Run once now.'
  );
}

function expectedSetup_() {
  return {
    tabs: [TAB_CONTACTS, TAB_FOUND, TAB_SETTINGS, TAB_INSTRUCTIONS],
    settings: [SETTING_ADDRESSES, SETTING_SERVER, SETTING_LAST_RUN, SETTING_WARNINGS,
               SETTING_CAL_BACK, SETTING_CAL_FORWARD, SETTING_MAIL_BACK,
               SETTING_RUN_TOOK, SETTING_RUN_FETCHED, SETTING_GMAIL_CALLS,
               SETTING_KEY, SETTING_HELP, SETTING_INSTALL_ID, SETTING_PRETEND_TODAY]
  };
}

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
    var first = firstDataRow_(sheet);
    var last = sheet.getLastRow();
    if (last >= first) sheet.getRange(first, 1, last - first + 1, sheet.getMaxColumns()).clear();
  });
  var settings = ss.getSheetByName(TAB_SETTINGS);
  if (settings) {

    [SETTING_ADDRESSES, SETTING_LAST_RUN, SETTING_WARNINGS, SETTING_RUN_TOOK,
     SETTING_RUN_FETCHED, SETTING_GMAIL_CALLS, SETTING_PRETEND_TODAY,
     SETTING_INSTALL_ID, SETTING_KEY
    ].forEach(function (label) {
      var row = settingRow_(settings, label);
      if (row > 0) settings.getRange(row, 2).setValue('');
    });
  }
  PropertiesService.getScriptProperties().deleteProperty(PROP_LAST_WORKED_MS);

  ui.alert('Cleared.\n\nNow use File → Make a copy, and send that copy on. ' +
           'The new owner runs Blotter → Step 1 in their own copy.');
}

function restingBanner_() {
  var when = Utilities.formatDate(new Date(), studentTimeZone_(), 'h:mm a');
  return 'Blotter: all good. Last updated ' + when + '.';
}

function bannerRange_(sheet) {
  if (headerRow_(sheet) < 2) return null;
  var lastCol = Math.max(1, sheet.getLastColumn());
  return sheet.getRange(1, 1, 1, lastCol);
}

function bannerPieces_(sheet) {
  if (headerRow_(sheet) < 2) return null;
  var lastCol = Math.max(1, sheet.getLastColumn());
  var frozen = Math.min(sheet.getFrozenColumns(), lastCol);
  if (frozen < 1) return { label: null, message: sheet.getRange(1, 1, 1, lastCol) };
  if (frozen >= lastCol) return { label: null, message: sheet.getRange(1, 1, 1, lastCol) };
  return {
    label: sheet.getRange(1, 1, 1, frozen),
    message: sheet.getRange(1, frozen + 1, 1, lastCol - frozen)
  };
}

function ensureBannerRow_(sheet) {
  if (headerRow_(sheet) > 1) return false;
  sheet.insertRowBefore(1);
  resetHeaderRowCache_();
  return true;
}

function writeBanner_(sheet, notice, restingText) {
  var pieces = bannerPieces_(sheet);
  if (!pieces) return false;

  var style = notice && NOTICE_STYLES[notice.level] ? NOTICE_STYLES[notice.level] : null;
  var bg = style ? style.bg : '#ffffff';
  var fg = style ? style.fg : INK_MUTED;
  var text = notice && notice.text
    ? notice.text + (notice.url ? '   ' + notice.url : '')
    : (restingText || 'Blotter');

  var dress = function (range, value, bold) {
    range.breakApart();
    range.merge();
    range.setValue(safeCell_(value))
      .setFontFamily('Arial')
      .setFontSize(11)
      .setFontWeight(bold ? 'bold' : 'normal')
      .setFontColor(fg)
      .setBackground(bg)
      .setHorizontalAlignment('left')
      .setVerticalAlignment('middle')
      .setWrap(false);
  };

  if (pieces.label) dress(pieces.label, 'Blotter', true);
  dress(pieces.message, text, !!style);
  sheet.setRowHeight(1, style ? 34 : 26);
  return true;
}

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

function safeColour_(value) {
  var text = String(value === null || value === undefined ? '' : value).trim();
  return /^#[0-9a-fA-F]{6}$/.test(text) ? text : null;
}

function safeNumber_(value, low, high) {
  var n = Number(value);
  if (!isFinite(n)) return null;
  n = Math.round(n);
  return n >= low && n <= high ? n : null;
}

function sanitiseDesign_(raw) {
  if (!raw || typeof raw !== 'object') return null;
  var out = { version: String(raw.version || '').slice(0, 64) };

  if (raw.status_style && typeof raw.status_style === 'object') {
    var styles = {};
    VALID_STATUSES.forEach(function (status) {
      var given = raw.status_style[status];
      if (!given) return;
      var bg = safeColour_(given.bg);
      var fg = safeColour_(given.fg);
      if (bg && fg) styles[status] = { bg: bg, fg: fg };
    });
    if (Object.keys(styles).length > 0) out.status_style = styles;
  }

  var knownWidths = function (given, defaults) {
    if (!given || typeof given !== 'object') return null;
    var widths = {};
    Object.keys(defaults).forEach(function (heading) {
      var w = safeNumber_(given[heading], 24, 600);
      if (w !== null) widths[heading] = w;
    });
    return Object.keys(widths).length > 0 ? widths : null;
  };
  var contacts = raw.widths ? knownWidths(raw.widths.contacts, CONTACTS_WIDTHS) : null;
  var found = raw.widths ? knownWidths(raw.widths.found, FOUND_WIDTHS) : null;
  if (contacts || found) out.widths = { contacts: contacts, found: found };

  if (raw.number_formats && typeof raw.number_formats === 'object') {
    var formats = {};
    ['Last contact', 'Last call', 'Next call'].forEach(function (heading) {
      var f = raw.number_formats[heading];
      if (typeof f === 'string' && f.length > 0 && f.length <= 64) formats[heading] = f;
    });
    if (Object.keys(formats).length > 0) out.number_formats = formats;
  }

  if (raw.state_rank && typeof raw.state_rank === 'object') {
    var ranks = {};
    VALID_STATUSES.forEach(function (status) {
      var r = safeNumber_(raw.state_rank[status], 0, 999);
      if (r !== null) ranks[status] = r;
    });
    if (Object.keys(ranks).length > 0) out.state_rank = ranks;
  }

  if (Object.prototype.toString.call(raw.instructions) === '[object Array]') {
    var rows = [];
    raw.instructions.slice(0, 200).forEach(function (r) {
      if (!r || typeof r.kind !== 'string') return;

      if (INSTRUCTION_KINDS.indexOf(r.kind) === -1) return;
      rows.push({
        k: r.kind,
        a: safeCell_(String(r.a === undefined ? '' : r.a).slice(0, 1000)),
        b: safeCell_(String(r.b === undefined ? '' : r.b).slice(0, 1000))
      });
    });
    if (rows.length > 0) out.instructions = rows;
  }

  return out;
}

var INSTRUCTION_KINDS = ['title', 'deck', 'h2', 'body', 'strong', 'note', 'warn',
                         'step', 'status', 'slot', 'gap'];

var designCache_ = null;

function design_() {
  if (designCache_ !== null) return designCache_;
  try {
    var stored = PropertiesService.getScriptProperties().getProperty(PROP_DESIGN_PAYLOAD);
    designCache_ = stored ? (JSON.parse(stored) || {}) : {};
  } catch (e) {
    designCache_ = {};
  }
  return designCache_;
}

function refreshDesign_(designVersion, url) {
  if (!designVersion) return false;
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty(PROP_DESIGN_VERSION) === designVersion) return false;

  try {
    var res = UrlFetchApp.fetch(url || DESIGN_URL_DEFAULT, {
      method: 'get', muteHttpExceptions: true, followRedirects: true
    });
    if (res.getResponseCode() !== 200) return false;
    var text = res.getContentText();
    if (text.length > 200000) return false;
    var clean = sanitiseDesign_(JSON.parse(text));
    if (!clean) return false;
    props.setProperty(PROP_DESIGN_PAYLOAD, JSON.stringify(clean));
    props.setProperty(PROP_DESIGN_VERSION, designVersion);
    designCache_ = clean;
    return true;
  } catch (e) {
    return false;
  }
}

function installId_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty(PROP_INSTALL_ID);
  if (!id) {
    id = Utilities.getUuid();
    props.setProperty(PROP_INSTALL_ID, id);
  }
  return id;
}

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
  var first = firstDataRow_(sheet);
  var height = lastRow - first + 1;
  if (height < 1) return;

  var names = sheet.getRange(first, nameCol, height, 1).getValues();
  var emails = sheet.getRange(first, emailCol, height, 1).getValues();

  var lastPerson = 1;
  for (var i = 0; i < height; i++) {
    if (String(names[i][0]).trim() !== '' || String(emails[i][0]).trim() !== '') {
      lastPerson = i + first;
    }
  }

  if (lastPerson >= 2) {
    sheet.getRange(first, closedCol, lastPerson - first + 1, 1).insertCheckboxes();
  }
  if (lastRow > lastPerson) {
    var blanks = sheet.getRange(lastPerson + 1, closedCol, lastRow - lastPerson, 1);
    blanks.clearDataValidations();
    blanks.clearContent();
  }
}

function ensureHeaders_(sheet, wanted) {
  var lastCol = sheet.getLastColumn();
  var hRow = headerRow_(sheet);
  var existing = lastCol > 0 ? sheet.getRange(hRow, 1, 1, lastCol).getValues()[0] : [];
  var have = {};
  existing.forEach(function (h) {
    if (h !== '') have[String(h).trim().toLowerCase()] = true;
  });
  var toAdd = wanted.filter(function (h) { return !have[h.toLowerCase()]; });
  if (toAdd.length > 0) {
    var start = existing.filter(String).length > 0 ? lastCol + 1 : 1;
    sheet.getRange(hRow, start, 1, toAdd.length).setValues([toAdd]);
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

function runNow() {
  try {
    var summary = courierPass_();
    SpreadsheetApp.getUi().alert('Blotter ran.\n\n' + summary);
  } catch (e) {

    var notice = e && e.blotterNotice;
    if (notice) {
      SpreadsheetApp.getUi().alert(
        notice.text + (notice.url ? '\n\n' + notice.url : '') +
        '\n\nYour sheet was not updated. It is also shown at the top of the ' +
        'Contacts tab, so you will see it there on every run.'
      );
      return;
    }

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

function runCourier() {
  try {
    if (!shouldWorkNow_()) return;
    courierPass_();
  } catch (e) {

    console.error('Courier run failed, sheet ' +
      (writePhaseBegun_ ? 'may be partially written (a later run rewrites it): ' : 'untouched: ') +
      (e && e.message ? e.message : e) + metricsSuffix_());
  }
}

function shouldWorkNow_() {
  var hour = Number(Utilities.formatDate(new Date(), studentTimeZone_(), 'H'));
  if (hour >= DAY_STARTS_AT_HOUR && hour < DAY_ENDS_AT_HOUR) return true;
  var last = Number(PropertiesService.getScriptProperties().getProperty(PROP_LAST_WORKED_MS) || 0);
  return new Date().getTime() - last >= NIGHT_EVERY_MINUTES * 60 * 1000;
}

function metricsSuffix_() {
  if (!runMetrics_) return '';
  var seconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
  return ' after ' + seconds + ' seconds; ' + runMetrics_.threads + ' conversations, ' +
    runMetrics_.messages + ' messages, ' +
    (runMetrics_.searches + runMetrics_.threadFetches) + ' Gmail calls';
}

function checkThisSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var gaps = missingSetup_(ss);

  var lines = [
    'Blotter ID:  ' + installId_(),
    'Script version:  ' + COURIER_VERSION,
    'Newest script:  ' + SCRIPT_URL,
    'Contract version:  ' + CONTRACT_VERSION,
    '',
    'Time zone:  ' + studentTimeZone_(),
    'Design applied:  ' +
      (PropertiesService.getScriptProperties().getProperty(PROP_DESIGN_VERSION) || '(the built-in one)'),
    'Setup:  ' + (gaps.length === 0 ? 'complete' : 'missing ' + gaps.join(', '))
  ];

  lines.push('');
  lines.push('The Blotter ID is what identifies this sheet. It is a random ' +
    'number that says nothing about you. Not your name, not your email ' +
    'address, neither of which Blotter is ever given.');

  SpreadsheetApp.getUi().alert('Blotter: this sheet\n\n' + lines.join('\n'));
}

function startAutomaticUpdates() {
  deleteCourierTriggers_();
  ScriptApp.newTrigger('runCourier').timeBased().everyMinutes(15).create();
  SpreadsheetApp.getUi().alert(
    'Automatic updates are on. Blotter will refresh this sheet every 15 minutes ' +
    'from ' + DAY_STARTS_AT_HOUR + 'am to ' + (DAY_ENDS_AT_HOUR - 12) + 'pm your time, ' +
    'and every ' + Math.round(NIGHT_EVERY_MINUTES / 60) + ' hours overnight.\n\n' +
    'You can close the sheet. It keeps running.'
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

function courierPass_() {

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

    var threads = fetchThreads_(sheetState.allContactEmails, settings.mailDaysBack);
    markOutbound_(threads, settings.addresses);
    var events = fetchEvents_(settings.calendarDaysBack, settings.calendarDaysForward);

    var request = {
      version: CONTRACT_VERSION,

      key: settings.blotterKey,
      courier_version: COURIER_VERSION,

      install_id: installId_(),

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

      if (e && e.blotterNotice) {
        try { writeBanner_(sheetState.sheet, e.blotterNotice, null); } catch (ignored) {}
      }
      throw e;
    }
    validateResponse_(response, sheetState.contacts);
    var notice = noticeFrom_(response);

    writePhaseBegun_ = true;

    writeBanner_(sheetState.sheet, notice, restingBanner_());
    writeBlotterColumns_(sheetState, response.rows);
    var added = addApprovedContacts_(ss, sheetState, foundState);
    syncClosedCheckboxes_(sheetState);
    var suggested = writeFoundSuggestions_(ss, sheetState, foundState, response.found || []);
    writeSetting_(ss, SETTING_LAST_RUN, new Date());
    writeSetting_(ss, SETTING_INSTALL_ID, installId_());

    if (refreshDesign_(response.design_version, settings.designUrl)) {
      try {
        applyDesign_(ss);
      } catch (e) {

        console.error('Design refresh failed, sheet left as it was: ' + e);
      }
    }

    var pretendWarning = settings.pretendNow
      ? 'TESTING MODE: this run pretended today was ' + settings.pretendNow.slice(0, 10) +
        '. Every Status and Days value on this sheet answers that date, not today. ' +
        'Clear Settings → "' + SETTING_PRETEND_TODAY + '" and run again to go back to normal.'
      : '';
    var addressWarnings = unreadableAddressWarnings_(sheetState.unreadableAddresses);

    var setupGaps = missingSetup_(ss);
    var setupWarnings = setupGaps.length
      ? ['This sheet is missing ' + setupGaps.join(', ') +
         '. Run Blotter → Step 1: Set up this sheet. It adds what is missing ' +
         'and does not touch your contacts.']
      : [];
    var warningLines = setupWarnings
      .concat(overwrittenFormulaWarnings_(sheetState.overwrittenFormulas))
      .concat(addressWarnings)
      .concat(response.warnings || []);
    if (pretendWarning) warningLines.unshift(pretendWarning);
    writeSetting_(ss, SETTING_WARNINGS,
      warningLines.length ? safeCell_(warningLines.join(' | ')) : 'None');

    var seconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
    writeSetting_(ss, SETTING_RUN_TOOK, seconds + ' seconds');
    writeSetting_(ss, SETTING_RUN_FETCHED,
      runMetrics_.threads + ' conversations, ' + runMetrics_.messages + ' messages' +
      (runMetrics_.skipped ? ' (' + runMetrics_.skipped + ' skipped: more than ' +
        MAX_THREAD_RECIPIENTS + ' recipients)' : ''));
    writeSetting_(ss, SETTING_GMAIL_CALLS,
      (runMetrics_.searches + runMetrics_.threadFetches) +
      ' (' + runMetrics_.searches + ' searches, ' + runMetrics_.threadFetches + ' conversation fetches)');

    sendTelemetry_(settings.telemetryUrl,
      telemetryPayload_(sheetState.contacts.length, seconds, true));

    return (notice ? notice.text + (notice.url ? '\n' + notice.url : '') + '\n\n' : '') +
      (pretendWarning ? '*** ' + pretendWarning + ' ***\n\n' : '') +
      'Updated ' + response.rows.length + ' contact row(s). ' +
      'Added ' + added.added + ' approved contact(s). ' +
      (added.skipped ? 'Skipped ' + added.skipped + ' already in Contacts. ' : '') +
      'Suggested ' + suggested + ' new name(s) in the Found tab. ' +
      'Took ' + seconds + ' seconds.' +

      (addressWarnings.length
        ? '\n\nCHECK THESE ROW(S). Blotter could not read an email address:\n• ' +
          addressWarnings.join('\n• ')
        : '') +

      (setupWarnings.length ? '\n\n' + setupWarnings.join('\n') : '') +
      (sheetState.overwrittenFormulas && sheetState.overwrittenFormulas.length
        ? '\n\n' + overwrittenFormulaWarnings_(sheetState.overwrittenFormulas).join('\n')
        : '');
  } catch (runError) {

    try {
      var failedSeconds = Math.round((new Date().getTime() - runMetrics_.startedMs) / 1000);
      sendTelemetry_(TELEMETRY_URL_DEFAULT, telemetryPayload_(0, failedSeconds, false));
    } catch (ignored) {}
    throw runError;
  } finally {
    lock.releaseLock();
  }
}

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

  var addresses = addressList_(byLabel[SETTING_ADDRESSES]);
  if (addresses.length === 0) {
    throw new Error('Settings needs "' + SETTING_ADDRESSES + '": every address you send from, separated by commas.');
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

    pretendNow: pretendNowIso_(byLabel[SETTING_PRETEND_TODAY]),

    telemetryUrl: String(byLabel[SETTING_TELEMETRY] === undefined ? TELEMETRY_URL_DEFAULT
      : byLabel[SETTING_TELEMETRY]).trim(),
    designUrl: DESIGN_URL_DEFAULT,
    blotterKey: String(byLabel[SETTING_KEY] === undefined ? '' : byLabel[SETTING_KEY]).trim()
  };
}

function pretendNowIso_(raw) {
  var parts = pretendTodayParts_(raw);
  return parts ? isoInStudentZone_(parts) : '';
}

function pretendTodayParts_(raw) {
  if (raw === null || raw === undefined) return null;

  if (Object.prototype.toString.call(raw) === '[object Date]') {
    if (isNaN(raw.getTime())) {
      throw new Error(badPretendValue_(raw));
    }

    return parsePretendText_(Utilities.formatDate(raw, studentTimeZone_(), 'yyyy-MM-dd HH:mm:ss'), true);
  }
  var text = String(raw).trim();
  if (text === '') return null;
  return parsePretendText_(text, false);
}

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

  var duplicated = duplicateBlotterHeadings_(sheet);
  if (duplicated.length > 0) {
    throw new Error('The Contacts tab has more than one column called ' +
      duplicated.join(', ') + '. Blotter writes to the leftmost, which would ' +
      'overwrite whichever one is yours. Rename your own column to something ' +
      'else, anything that is not a Blotter heading, and run again.');
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var first = firstDataRow_(sheet);
  var rows = lastRow >= first ? sheet.getRange(first, 1, lastRow - first + 1, lastCol).getValues() : [];

  var contacts = [];
  var allEmails = {};
  var emailsInSheet = {};
  var unreadableAddresses = [];

  rows.forEach(function (row, i) {
    var rowNumber = i + first;
    var name = String(row[cols.name - 1]).trim();
    var firm = cols.firm > 0 ? String(row[cols.firm - 1]).trim() : '';
    var rawEmail = String(row[cols.email - 1] === null || row[cols.email - 1] === undefined
      ? '' : row[cols.email - 1]).trim();
    var emails = addressList_(rawEmail);
    if (name === '' && emails.length === 0 && rawEmail === '') return;

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

function unreadableAddressWarnings_(unreadable) {
  return unreadable.map(function (u) {
    return u.cell === ''
      ? 'Row ' + u.row + ' (' + u.name + ') has no email address, so Blotter cannot ' +
        'find their mail and the row will stay "Not emailed".'
      : 'Row ' + u.row + ' (' + u.name + '): "' + u.cell + '" is not an email address ' +
        'Blotter can read, so the row will stay "Not emailed". Retyping it usually ' +
        'fixes it. Autocorrect sometimes replaces a hyphen with a dash that looks ' +
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
  var first = firstDataRow_(sheet);
  var values = lastRow >= first ? sheet.getRange(first, 1, lastRow - first + 1, sheet.getLastColumn()).getValues() : [];

  var ignoredEmails = [];
  var approvals = [];
  var rejections = [];
  var emailsInFound = {};
  values.forEach(function (row, i) {
    var rowNumber = i + first;
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

function fetchThreads_(contactEmails, daysBack) {
  if (contactEmails.length === 0) return [];

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
      var from = firstNamedAddress_(m.getFrom());
      return {
        id: m.getId(),
        date: toIso_(m.getDate()),
        from: from,
        to: namedAddressList_(m.getTo()),
        cc: namedAddressList_(m.getCc()),
        subject: m.getSubject() || '',

        failed_recipients: isBounceSender_(bareAddress_(from))
          ? failedRecipientsFrom_(stripQuotedHistory_(m.getPlainBody() || ''))
          : [],
        is_outbound: false
      };
    });

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

function markOutbound_(threads, studentAddresses) {
  var mine = {};
  studentAddresses.forEach(function (a) { mine[a.toLowerCase()] = true; });
  threads.forEach(function (t) {
    t.messages.forEach(function (m) {
      m.is_outbound = !!mine[bareAddress_(m.from).toLowerCase()];
    });
  });
}

function fetchEvents_(daysBack, daysForward) {
  var now = new Date();
  var from = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  var to = new Date(now.getTime() + daysForward * 24 * 60 * 60 * 1000);
  return CalendarApp.getDefaultCalendar().getEvents(from, to).map(function (e) {
    var creators = e.getCreators();
    var guests = e.getGuestList(true);
    return {
      id: e.getId(),
      title: e.getTitle() || '',
      start: toIso_(e.getStartTime()),
      end: toIso_(e.getEndTime()),
      attendees: guests.map(function (g) { return g.getEmail(); }),

      declined: guests.length === 0 ? [] : declinedGuests_(e, guests),
      organizer: creators && creators.length ? creators[0] : ''
    };
  });
}

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
  if (me && seen[me.toLowerCase()]) return declined;

  try {
    if (event.getMyStatus() === CalendarApp.GuestStatus.NO && me) {
      declined.push(me);
    }
  } catch (err) {

  }
  return declined;
}

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

    'Days': function (r) { return r.days === null || r.days === undefined ? NO_CLOCK : r.days; },
    'Last contact': function (r) { return asSheetDate_(r.last_contact); },

    'Attempts': function (r) { return r.attempts === null || r.attempts === undefined ? NO_CLOCK : r.attempts; },
    'Next call': function (r) { return asSheetDate_(r.next_call); },
    'Last call': function (r) { return asSheetDate_(r.last_call); }
  };

  var moved = rowsThatMoved_(sheetState, minRow, maxRow);
  if (moved.length > 0) {
    throw new Error('The sheet changed while Blotter was working, so this run ' +
      'was skipped and nothing was written. The next run will pick it up. ' +
      'Nothing is lost. (' + moved.join('; ') + ')' +
      '. Nothing was written, because the answers would have landed on the ' +
      'wrong people. Run Blotter → Step 2 again and it will be right.');
  }

  sheetState.overwrittenFormulas = formulasInBlotterColumns_(sheet, minRow, height);

  BLOTTER_COLUMNS.forEach(function (columnName) {
    var col = findColumn_(sheet, columnName);
    var existing = sheet.getRange(minRow, col, height, 1).getValues();
    var values = [];
    for (var rowNumber = minRow; rowNumber <= maxRow; rowNumber++) {
      var r = byRow[rowNumber];

      values.push([r ? perColumn[columnName](r) : existing[rowNumber - minRow][0]]);
    }
    sheet.getRange(minRow, col, height, 1).setValues(values);
  });
}

function addApprovedContacts_(ss, sheetState, foundState) {
  var added = 0;
  var skipped = 0;
  foundState.approvals.forEach(function (a) {
    if (!sheetState.emailsInSheet[a.email.toLowerCase()]) {
      var newRow = [];
      for (var i = 0; i < sheetState.lastCol; i++) newRow.push('');
      newRow[sheetState.cols.name - 1] = a.name;
      newRow[sheetState.cols.email - 1] = a.email;

      var target = lastRowWithContact_(sheetState) + 1;
      sheetState.sheet.getRange(target, 1, 1, sheetState.lastCol).setValues([newRow]);
      sheetState.emailsInSheet[a.email.toLowerCase()] = true;
      added++;
      foundState.sheet.getRange(a.rowNumber, foundState.cols.add).setValue('Added');
    } else {

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

function lastRowWithContact_(sheetState) {
  var sheet = sheetState.sheet;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  var first = firstDataRow_(sheet);
  if (lastRow < first) return headerRow_(sheet);
  var names = sheet.getRange(first, sheetState.cols.name, lastRow - first + 1, 1).getValues();
  var emails = sheet.getRange(first, sheetState.cols.email, lastRow - first + 1, 1).getValues();
  var last = 1;
  for (var i = 0; i < names.length; i++) {
    var hasName = String(names[i][0]).trim() !== '';
    var hasEmail = String(emails[i][0]).trim() !== '';
    if (hasName || hasEmail) last = i + first;
  }
  return last;
}

function writeFoundSuggestions_(ss, sheetState, foundState, found) {
  var rows = [];
  found.forEach(function (f) {
    var key = String(f.email || '').toLowerCase();
    if (key === '' || sheetState.emailsInSheet[key] || foundState.emailsInFound[key]) return;
    foundState.emailsInFound[key] = true;
    rows.push(['', safeCell_(f.name || ''), safeCell_(f.email),
               safeCell_(f.first_seen || ''), safeCell_(f.context || '')]);
  });
  if (rows.length > 0) {
    var sheet = foundState.sheet;
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, FOUND_HEADERS.length).setValues(rows);
  }
  return rows.length;
}

function writeSetting_(ss, label, value) {

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
  var headers = sheet.getRange(headerRow_(sheet), 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === headerName.toLowerCase()) return i + 1;
  }
  return 0;
}

function rowsThatMoved_(sheetState, minRow, maxRow) {
  var sheet = sheetState.sheet;
  var height = maxRow - minRow + 1;
  if (height < 1) return [];
  var names = sheet.getRange(minRow, sheetState.cols.name, height, 1).getValues();
  var emails = sheet.getRange(minRow, sheetState.cols.email, height, 1).getValues();

  var moved = [];
  sheetState.contacts.forEach(function (c) {
    var i = c.row - minRow;
    if (i < 0 || i >= height) return;

    var nameNow = String(names[i][0]).trim();
    var emailsNow = addressList_(emails[i][0]).join(',').toLowerCase();
    var emailsThen = c.emails.join(',').toLowerCase();
    if (emailsNow !== emailsThen) {
      if (moved.length < 3) {
        moved.push('row ' + c.row + ' was ' + (c.name || '(no name)') +
          ' and is now ' + (nameNow || '(empty)'));
      }
    }
  });
  return moved;
}

function formulasInBlotterColumns_(sheet, minRow, height) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1 || height < 1) return [];
  var wanted = {};
  BLOTTER_COLUMNS.forEach(function (h) {
    var c = findColumn_(sheet, h);
    if (c > 0) wanted[c] = h;
  });
  var formulas = sheet.getRange(minRow, 1, height, lastCol).getFormulas();
  var found = [];
  for (var r = 0; r < formulas.length; r++) {
    for (var c in wanted) {
      var cell = formulas[r][Number(c) - 1];
      if (cell && String(cell).charAt(0) === '=') {
        found.push({ row: minRow + r, column: wanted[c] });
      }
    }
  }
  return found;
}

function overwrittenFormulaWarnings_(formulas) {
  if (!formulas || formulas.length === 0) return [];
  var shown = formulas.slice(0, 5).map(function (f) {
    return 'row ' + f.row + ' (' + f.column + ')';
  });
  return ['Blotter replaced a formula you had written in a column it owns: ' +
    shown.join(', ') +
    (formulas.length > 5 ? ', and ' + (formulas.length - 5) + ' more' : '') +
    '. Blotter rewrites those columns every run, so a formula there cannot ' +
    'survive. Put it in a column of your own instead. Add one anywhere and ' +
    'Blotter will leave it alone.'];
}

function duplicateBlotterHeadings_(sheet) {
  var owned = {};
  [COL_NAME, COL_EMAIL, COL_CLOSED].concat(BLOTTER_COLUMNS).forEach(function (h) {
    owned[h.toLowerCase()] = h;
  });
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return [];
  var headers = sheet.getRange(headerRow_(sheet), 1, 1, lastCol).getValues()[0];
  var seen = {};
  var dupes = [];
  headers.forEach(function (cell) {
    var key = String(cell).trim().toLowerCase();
    if (!owned[key]) return;
    if (seen[key]) {
      if (dupes.indexOf('"' + owned[key] + '"') === -1) dupes.push('"' + owned[key] + '"');
    }
    seen[key] = true;
  });
  return dupes;
}

function isTruthyCell_(value) {
  if (value === true) return true;
  var s = String(value).trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'x' || s === '1';
}

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

function isBounceSender_(address) {
  var local = String(address || '').toLowerCase().split('@')[0];
  return local === 'mailer-daemon' || local === 'postmaster';
}

var TYPED_SUBSTITUTIONS = [
  [/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-'],
  [/[\u00A0\u2007\u202F\u2000-\u200A\u3000]/g, ' '],
  [/[\u200B\u200C\u200D\uFEFF]/g, ''],
  [/[\u2018\u2019\u201A\u201B]/g, "'"],
  [/[\u201C\u201D\u201E\u201F]/g, '"'],
  [/[\uFF20]/g, '@'],
  [/[\uFF0E\u3002]/g, '.']
];

function normaliseTyped_(value) {
  var text = String(value === null || value === undefined ? '' : value);
  for (var i = 0; i < TYPED_SUBSTITUTIONS.length; i++) {
    text = text.replace(TYPED_SUBSTITUTIONS[i][0], TYPED_SUBSTITUTIONS[i][1]);
  }
  return text;
}

function firstAddress_(headerValue) {
  var list = addressList_(headerValue);
  return list.length > 0 ? list[0] : '';
}

function addressList_(headerValue) {
  if (!headerValue) return [];
  var matches = normaliseTyped_(headerValue).match(new RegExp(ONE_ADDRESS.source, 'g'));
  return matches || [];
}

function bareAddress_(value) {
  var m = normaliseTyped_(value).match(ONE_ADDRESS);
  return m ? m[0] : '';
}

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

function namedAddress_(part) {
  var text = normaliseTyped_(part);
  var address = bareAddress_(text);
  if (address === '') return '';
  var name = text.slice(0, text.indexOf(address))
    .replace(/[<>"]/g, ' ')
    .replace(/,\s*$/, '')
    .trim();

  if (name === '' || name.indexOf('@') !== -1) return address;
  return name + ' <' + address + '>';
}

function namedAddressList_(headerValue) {
  if (!headerValue) return [];
  var out = [];
  splitHeaderParts_(headerValue).forEach(function (part) {
    var one = namedAddress_(part);
    if (one !== '') out.push(one);
  });
  return out;
}

function firstNamedAddress_(headerValue) {
  var list = namedAddressList_(headerValue);
  return list.length > 0 ? list[0] : '';
}

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
