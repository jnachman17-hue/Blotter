/**
 * Copy the script to where the app serves it, and record what was copied.
 *
 * **One command, because the alternative is a step somebody forgets.** The
 * update notice points students at `https://blotterib.com/Code.gs`; if that
 * file lags behind `courier/Code.gs`, the notice sends people to an old script
 * and nothing anywhere says so.
 *
 * `helpers.test.js` fails if the two ever differ, so drift cannot survive a
 * test run — but this is how you fix it rather than merely learn about it.
 *
 *     node courier/publish.js
 */
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const source = path.join(root, 'courier', 'Code.gs');
const served = path.join(root, 'web', 'public', 'Code.gs');
const manifest = path.join(root, 'web', 'app', 'api', 'script', 'manifest.ts');

const body = fs.readFileSync(source, 'utf8');
const sha = createHash('sha256').update(body).digest('hex');
const version = (body.match(/var COURIER_VERSION = '([^']+)'/) || [])[1];
if (!version) throw new Error('COURIER_VERSION not found in Code.gs');

fs.mkdirSync(path.dirname(served), { recursive: true });
fs.writeFileSync(served, body);
fs.writeFileSync(
  manifest,
  `/**
 * What \`/Code.gs\` currently serves. **Generated — do not edit by hand.**
 *
 * Written by \`node courier/publish.js\`, which copies \`courier/Code.gs\` into
 * \`web/public/\` at the same time. \`courier/helpers.test.js\` fails if this file
 * and the script ever disagree, so a stale entry here cannot survive a test run.
 */

export const SCRIPT_VERSION = ${JSON.stringify(version)};
export const SCRIPT_SHA256 = ${JSON.stringify(sha)};
export const SCRIPT_BYTES = ${Buffer.byteLength(body)};
`,
);

console.log(`published Code.gs  version ${version}  ${Buffer.byteLength(body)} bytes  sha256 ${sha.slice(0, 12)}…`);
