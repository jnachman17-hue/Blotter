import { NextResponse } from "next/server";

import { CURRENT_COURIER_VERSION, SCRIPT_URL } from "../engine/rules";
import { SCRIPT_BYTES, SCRIPT_SHA256, SCRIPT_VERSION } from "./manifest";

/**
 * What the current script is, so a student can tell whether they already have
 * it before pasting anything.
 *
 * **The script itself is a static file at `/Code.gs`**, committed under
 * `web/public/` and deployed with everything else. That is deliberate and it
 * replaced a worse design: an earlier version served it from the database,
 * which meant a publish step somebody had to remember, and a forgotten publish
 * pointed the update notice at nothing. **A file that ships with the deploy
 * cannot go stale.**
 *
 * Nothing in the script is secret — no keys, no tokens — and a copy already
 * sits in every student's Apps Script editor, so serving it plainly costs
 * nothing.
 *
 * This route reads no files. `courier/publish.js` copies the script and writes
 * `manifest.ts` in one command, and `courier/helpers.test.js` fails if the two
 * ever disagree, so what is reported here is what is served.
 */
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      courier_version: SCRIPT_VERSION,
      /* The version the server expects. Equal to `courier_version` unless a
         deploy is halfway done, and saying both is more useful than saying one. */
      expected_by_server: CURRENT_COURIER_VERSION,
      script_url: SCRIPT_URL,
      sha256: SCRIPT_SHA256,
      bytes: SCRIPT_BYTES,
      how_to_update:
        "Open the script link, select all, copy. In your sheet: Extensions → " +
        "Apps Script, select all, delete, paste, save. Reload the sheet and run " +
        "Blotter → Step 2. Blotter → Check this sheet shows the version you have.",
    },
    { headers: { "cache-control": "public, max-age=300, s-maxage=300" } },
  );
}
