import { NextResponse } from "next/server";

import { guardWrite } from "@/lib/request-guard";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

import { pickInstallRow } from "./payload";

/**
 * How many sheets are running. That is the whole question this answers.
 *
 * **Why this is a separate endpoint and not a field on `/api/engine`.** The
 * engine has no database, no logging and no file writes — nothing anywhere in
 * it persists a byte — so "the engine stores nothing" is not a promise, it is
 * a fact anyone can verify by reading it. **Counting installs inside it would
 * end that**, permanently, in exchange for saving one HTTP request. The claim
 * is worth more than the convenience, so the counter lives here instead, where
 * it can be pointed at and described honestly.
 *
 * **What may cross this wire, exhaustively:** a random per-sheet id, the two
 * version strings, a timestamp, a count of contacts, how long the run took,
 * and whether it worked.
 *
 * **What may never cross it:** a name, an email address, a subject, a message
 * body, a firm — anything at all from which a person could be recognised.
 * `pickInstallRow` in `payload.ts` is the entire boundary, and it works by
 * allow-list rather than by removing known-bad fields, so a caller that sends
 * something unwanted has it dropped rather than stored. It lives in its own
 * file so it can be tested directly — see the note there about why that
 * matters.
 *
 * **Storage is best-effort and must never fail a student's run.** Every path
 * returns 200. A sheet that cannot be counted is a data problem; a sheet that
 * stops updating because counting broke is a real one, and the courier treats
 * this call as fire-and-forget for the same reason.
 */

/** Node rather than Edge: the Supabase client expects a Node runtime. */
export const runtime = "nodejs";

export async function POST(request: Request) {
  const rejected = guardWrite(request);
  if (rejected) {
    return NextResponse.json({ counted: false, reason: rejected }, { status: 200 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ counted: false, reason: "bad_request" }, { status: 200 });
  }

  const row = pickInstallRow(body);
  if (row === null) {
    return NextResponse.json({ counted: false, reason: "rejected" }, { status: 200 });
  }

  if (!supabaseConfigured()) {
    return NextResponse.json({ counted: false, reason: "not_configured" });
  }
  const supabase = supabaseAdmin();
  if (supabase === null) {
    return NextResponse.json({ counted: false, reason: "not_configured" });
  }

  /* Upsert on the install id. Supabase updates only the columns present in the
     row, so `first_seen` — which the table defaults to now() — survives every
     later run. Distinct ids is the install count; `last_seen` is what makes
     weekly actives and churn answerable. */
  const { error } = await supabase
    .from("blotter_installs")
    .upsert(row, { onConflict: "install_id" });

  if (error) {
    console.error("[telemetry] upsert failed:", error.message);
    return NextResponse.json({ counted: false, reason: "insert_failed" });
  }

  return NextResponse.json({ counted: true });
}

/** Anything but POST. Loud, so a misconfigured caller is not silently ignored. */
export async function GET() {
  return NextResponse.json({ error: "POST only." }, { status: 405 });
}
