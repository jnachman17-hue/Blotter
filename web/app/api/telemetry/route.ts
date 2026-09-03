import { NextResponse } from "next/server";

import { guardWrite } from "@/lib/request-guard";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

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
 * `pick()` below is the entire boundary, and it works by allow-list rather
 * than by removing known-bad fields, so a caller that sends something unwanted
 * has it dropped rather than stored. If a future change wants a new field
 * here, that is the moment to stop and ask whether it belongs.
 *
 * **Storage is best-effort and must never fail a student's run.** Every path
 * returns 200. A sheet that cannot be counted is a data problem; a sheet that
 * stops updating because counting broke is a real one, and the courier treats
 * this call as fire-and-forget for the same reason.
 */

/** Node rather than Edge: the Supabase client expects a Node runtime. */
export const runtime = "nodejs";

/** A UUID and nothing else. Anything shaped differently is not an install id. */
const INSTALL_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Version strings are short and printable; a long one is a caller misbehaving. */
function version(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 32) return null;
  return /^[A-Za-z0-9._-]+$/.test(trimmed) ? trimmed : null;
}

function count(value: unknown, ceiling: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const whole = Math.trunc(value);
  return whole >= 0 && whole <= ceiling ? whole : null;
}

interface InstallRow {
  install_id: string;
  contract_version: string;
  courier_version: string;
  contacts: number;
  seconds: number;
  ok: boolean;
  last_seen: string;
}

/**
 * The allow-list. Nothing reaches the table that is not named here, and every
 * value is bounded — a caller cannot turn a count into a payload by sending a
 * very large one.
 */
function pick(body: unknown): InstallRow | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;

  const id = typeof raw.install_id === "string" ? raw.install_id.trim() : "";
  if (!INSTALL_ID.test(id)) return null;

  const contract = version(raw.contract_version ?? String(raw.contract_version));
  const courier = version(raw.courier_version);
  const contacts = count(raw.contacts, 100_000);
  const seconds = count(raw.seconds, 86_400);
  if (contract === null || courier === null || contacts === null || seconds === null) return null;

  return {
    install_id: id.toLowerCase(),
    contract_version: contract,
    courier_version: courier,
    contacts,
    seconds,
    ok: raw.ok === true,
    /* The server's clock, not the caller's. A sheet with a wrong timezone must
       not be able to write itself into next week and distort a churn figure. */
    last_seen: new Date().toISOString(),
  };
}

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

  const row = pick(body);
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
