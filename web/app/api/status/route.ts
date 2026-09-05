import { NextResponse } from "next/server";

import { guardWrite } from "@/lib/request-guard";
import { statusSnapshot } from "@/lib/status-snapshot";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * What the server holds, right now, for anyone to look at.
 *
 * ## Why
 *
 * The site says the server keeps nothing from anyone's mail. Reading the sheet's
 * code proves what leaves a student's account and proves nothing about what
 * happens after it arrives; that half was, until 5 September 2026, pure trust.
 * Jon's answer was to open the database rather than describe it: *"seeing what
 * the server has live at any moment, because then they know we're not taking
 * information we don't claim."*
 *
 * So `GET` answers with a live row count for every table, beside the
 * plain-English description of every column in `what-we-hold.ts`, and `POST`
 * lets a student see the exact rows about their own sheet. Together they turn
 * "we keep nothing" into something a person can check at 2am without asking.
 *
 * ## What this proves and does not
 *
 * It proves what THIS database holds. It cannot prove there is no other one,
 * and `/status` says so in words rather than letting the numbers imply it.
 * Anyone who wants to argue we keep a secret second database is right that
 * this page cannot refute them, and the page agrees with them out loud.
 *
 * ## The lookup, and why nobody can see anyone else's row
 *
 * The lookup needs the whole Blotter ID, which is a random UUID minted by
 * `Utilities.getUuid()` inside the student's own sheet. There are 2^122 of
 * them, so the only way to look up a sheet is to be shown its id by the person
 * whose sheet it is. Keys are never returned, not even to the sheet they
 * belong to: a key is the thing a paying student would least want on a screen
 * somebody else is looking at.
 *
 * `POST` rather than `GET` for the lookup so the id is in the body, not the
 * URL, and does not end up in access logs and browser history. It carries the
 * same content-type guard as the other write routes.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Exactly the shape a Blotter ID has. Anything else is answered without a query. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function mask(key: unknown): string {
  const text = String(key ?? "");
  return text.length === 0 ? "" : `${text.slice(0, 3)}${"•".repeat(Math.max(4, text.length - 3))}`;
}

/** The same reading `/status` renders, so the page and the endpoint cannot disagree. */
export async function GET() {
  return NextResponse.json(await statusSnapshot(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const rejected = guardWrite(request);
  if (rejected) {
    return NextResponse.json({ error: rejected }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const id = String((body as { install_id?: unknown })?.install_id ?? "")
    .trim()
    .toLowerCase();
  if (!UUID.test(id)) {
    return NextResponse.json(
      {
        error: "not_an_id",
        message:
          "That does not look like a Blotter ID. It is in your sheet under Settings, and looks like eight characters, a dash, then three more groups and a long one.",
      },
      { status: 400 },
    );
  }

  const supabase = supabaseConfigured() ? supabaseAdmin() : null;
  if (supabase === null) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const [installs, keys, mismatches] = await Promise.all([
    supabase.from("blotter_installs").select("*").eq("install_id", id),
    supabase
      .from("blotter_keys")
      .select("key, created_at, install_id, bound_at, entitled_until, revoked_at, stripe_session_id, stripe_payment_intent, stripe_subscription_id, note")
      .eq("install_id", id),
    supabase
      .from("blotter_key_mismatches")
      .select("id, key, seen_install_id, seen_at")
      .eq("seen_install_id", id),
  ]);

  if (installs.error || keys.error || mismatches.error) {
    return NextResponse.json({ error: "lookup_failed" }, { status: 502 });
  }

  return NextResponse.json(
    {
      install_id: id,
      checked_at: new Date().toISOString(),
      blotter_installs: installs.data ?? [],
      /* The key column is the one secret in the database. Masked on the way
         out, always, and the stripe references reduced to whether they are set:
         a reference number is not a card number, but it is also not something
         a student needs to see to know what we hold. */
      blotter_keys: (keys.data ?? []).map((row) => ({
        ...row,
        key: mask(row.key),
        stripe_session_id: row.stripe_session_id ? "set" : null,
        stripe_payment_intent: row.stripe_payment_intent ? "set" : null,
        stripe_subscription_id: row.stripe_subscription_id ? "set" : null,
      })),
      blotter_key_mismatches: (mismatches.data ?? []).map((row) => ({
        ...row,
        key: mask(row.key),
      })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
