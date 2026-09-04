import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";
import { CURRENT_COURIER_VERSION } from "../engine/rules";

/**
 * One address that always has the current script behind it.
 *
 * The server cannot push a new script into a spreadsheet — Apps Script does not
 * work that way. What it can do is notice an old one calling and point
 * somewhere reliable, which is what `/api/engine`'s update notice links to. A
 * link that goes stale is worse than no link, so this is the only place the
 * answer lives.
 *
 * ⚠ **A constraint worth knowing about rather than hiding.** The repository is
 * private, so this cannot simply redirect to GitHub. Three sources are tried in
 * order, and the last one is honest rather than clever:
 *
 * 1. **From disk** — works in local development, where the repo is right there.
 * 2. **From Supabase** — a `blotter_script` row, which is how it works in
 *    production. Publishing there is a paste, and it means a script update
 *    needs no deploy at all.
 * 3. **Neither** — say so, with the version and where to ask. **Not a 404 and
 *    not a lie**: a student who followed this link deserves a sentence, and
 *    silence would send them back to a sheet that is telling them to update.
 */
export const runtime = "nodejs";

const FILENAME = "Code.gs";

function asScript(body: string, source: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-disposition": `inline; filename="${FILENAME}"`,
      "x-blotter-courier-version": CURRENT_COURIER_VERSION,
      "x-blotter-source": source,
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}

export async function GET() {
  /* 1. The working copy, which is the truth in development. */
  try {
    const onDisk = path.join(process.cwd(), "..", "courier", FILENAME);
    const body = await readFile(onDisk, "utf8");
    if (body.trim().length > 0) return asScript(body, "disk");
  } catch {
    /* Not there in production, which is expected rather than wrong. */
  }

  /* 2. Published to Supabase, which is how production serves it. */
  if (supabaseConfigured()) {
    const supabase = supabaseAdmin();
    if (supabase !== null) {
      const { data, error } = await supabase
        .from("blotter_script")
        .select("body")
        .eq("name", FILENAME)
        .maybeSingle();
      if (!error && data && typeof data.body === "string" && data.body.length > 0) {
        return asScript(data.body, "supabase");
      }
    }
  }

  /* 3. Say what is true. */
  return NextResponse.json(
    {
      courier_version: CURRENT_COURIER_VERSION,
      script: "not_published",
      what_to_do:
        "The current script has not been published to this address yet. " +
        "Email jnachman17@gmail.com and quote your Blotter ID from the " +
        "Settings tab, and you will be sent it.",
    },
    { status: 200 },
  );
}
