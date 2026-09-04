/**
 * Build the public script and put it where the app serves it.
 *
 * `courier/Code.gs` is the file we work in, and it is written for us: every
 * decision it carries is explained in place, with references to documents in
 * a private repository. None of that belongs in front of a student. Jon's
 * ruling, 3 September 2026: what ships is *"just code"*, under one header in
 * plain English that says what this thing is, what it can see, and what it
 * will never do.
 *
 * So the public file is built, not copied. This strips every comment from the
 * source using TypeScript's parser (the only thing that reliably tells a
 * regular expression from a division, and a `//` inside a URL string from a
 * comment), prepends the header, and writes `web/public/Code.gs`.
 *
 * `helpers.test.js` proves three things about the result on every run: the
 * served file is exactly what this builds; the code is token-for-token the
 * source with only comments removed; and nothing internal survives. Drift
 * cannot outlive a test run. This is how you fix it rather than learn of it:
 *
 *     node courier/publish.js
 */
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const ts = require(path.join(root, 'web', 'node_modules', 'typescript'));

const source = path.join(root, 'courier', 'Code.gs');
const served = path.join(root, 'web', 'public', 'Code.gs');
const manifest = path.join(root, 'web', 'app', 'api', 'script', 'manifest.ts');

/*
 * The Apps Script manifest, published beside the script.
 *
 * Without it a student pasting only `Code.gs` into a fresh project gets scopes
 * Apps Script infers from the code, and it infers the broad
 * `.../auth/spreadsheets` rather than `spreadsheets.currentonly`. The site
 * promises Blotter cannot see any other file in the reader's Drive, and that
 * promise is this one scope. So the manifest ships too.
 */
const appsscriptSource = path.join(root, 'courier', 'appsscript.json');
const appsscriptServed = path.join(root, 'web', 'public', 'appsscript.json');

/** Written for the student who opens the file. Nothing in it is for us. */
const PUBLIC_HEADER = `/**
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
`;

function parse(text) {
  return ts.createSourceFile('Code.gs', text, ts.ScriptTarget.ES2019, true, ts.ScriptKind.JS);
}

function isJsDoc(node) {
  return node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode;
}

/** Every leaf token in the file, in order. Comments and whitespace are not tokens. */
function leaves(sf) {
  const out = [];
  const visit = (node) => {
    if (isJsDoc(node)) return;
    const kids = node.getChildren(sf);
    if (kids.length === 0) out.push(node);
    else kids.forEach(visit);
  };
  visit(sf);
  return out;
}

/** Every comment in the file, as `{ pos, end }`, in order. */
function commentRanges(text) {
  const sf = parse(text);
  const found = new Map();
  const add = (ranges) => { if (ranges) for (const r of ranges) found.set(r.pos, r); };
  for (const tok of leaves(sf)) {
    add(ts.getLeadingCommentRanges(text, tok.getFullStart()));
    add(ts.getTrailingCommentRanges(text, tok.getEnd()));
  }
  return [...found.values()].sort((a, b) => a.pos - b.pos);
}

function stripComments(text) {
  let out = text;
  for (const r of commentRanges(text).reverse()) out = out.slice(0, r.pos) + out.slice(r.end);
  return out
    .replace(/[ \t]+$/gm, '')   // whitespace a removed trailing comment leaves behind
    .replace(/\n{3,}/g, '\n\n') // and the gaps where whole comment blocks stood
    .trim() + '\n';
}

/** The file a student sees. */
function buildPublic(src) {
  return PUBLIC_HEADER + '\n' + stripComments(src);
}

/** True when two texts are the same code: identical tokens, comments aside. */
function sameTokens(a, b) {
  const ta = leaves(parse(a)).map((t) => t.kind + ':' + t.getText());
  const tb = leaves(parse(b)).map((t) => t.kind + ':' + t.getText());
  return ta.length === tb.length && ta.every((t, i) => t === tb[i]);
}

module.exports = { buildPublic, stripComments, commentRanges, sameTokens, PUBLIC_HEADER,
  appsscriptSource, appsscriptServed };

if (require.main === module) {
  const src = fs.readFileSync(source, 'utf8');
  const version = (src.match(/var COURIER_VERSION = '([^']+)'/) || [])[1];
  if (!version) throw new Error('COURIER_VERSION not found in Code.gs');

  const body = buildPublic(src);
  if (!sameTokens(src, body)) throw new Error('stripping comments changed the code; refusing to publish');
  const sha = createHash('sha256').update(body).digest('hex');

  fs.mkdirSync(path.dirname(served), { recursive: true });
  fs.writeFileSync(served, body);
  fs.copyFileSync(appsscriptSource, appsscriptServed);
  fs.writeFileSync(
    manifest,
    `/**
 * What \`/Code.gs\` currently serves. **Generated. Do not edit by hand.**
 *
 * Written by \`node courier/publish.js\`, which builds the public script from
 * \`courier/Code.gs\` (comments stripped, public header added) and writes it to
 * \`web/public/\`. \`courier/helpers.test.js\` fails if this file and the served
 * script ever disagree, so a stale entry here cannot survive a test run.
 */

export const SCRIPT_VERSION = ${JSON.stringify(version)};
export const SCRIPT_SHA256 = ${JSON.stringify(sha)};
export const SCRIPT_BYTES = ${Buffer.byteLength(body)};
`,
  );
  console.log(`published Code.gs  version ${version}  ${Buffer.byteLength(body)} bytes (source ${Buffer.byteLength(src)})  sha256 ${sha.slice(0, 12)}…`);
}
