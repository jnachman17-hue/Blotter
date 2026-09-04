import "server-only";
import { NextResponse } from "next/server";

import { entitlementFor, type KeyRow } from "@/app/api/entitlement/install";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * "Is this sheet known, and is it paid for?"
 *
 * The one lookup behind `/billing`. A student reads their Blotter ID off the
 * Settings tab, types it here, and this says whether the sheet has ever
 * reported in and what its entitlement is. Nothing is written.
 *
 * ## Why a prefix is enough
 *
 * A Blotter ID is a 36-character UUID and nobody types one correctly. The
 * first eight hex characters are accepted instead, which is four billion
 * values: enough that two sheets colliding is not a thing that happens, and
 * short enough to copy by eye. A prefix matching two rows is refused rather
 * than guessed at.
 *
 * ## What this deliberately does not reveal
 *
 * Nothing about the person. The row holds counts and versions, and the reply
 * carries only whether the sheet is known and whether it is entitled. An id
 * that is unknown and an id that is malformed answer the same way, so this
 * cannot be swept for live sheets.
 */

const FULL = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const PREFIX = /^[0-9a-f]{8}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ known: false, reason: "not_an_id" }, { status: 400 });
  }

  const field = (body as Record<string, unknown> | null)?.blotter_id;
  const raw = typeof field === "string" ? field.trim().toLowerCase() : "";

  if (!FULL.test(raw) && !PREFIX.test(raw)) {
    return NextResponse.json({ known: false, reason: "not_an_id" });
  }

  if (!supabaseConfigured()) {
    return NextResponse.json({ known: false, reason: "not_configured" });
  }
  const supabase = supabaseAdmin();
  if (supabase === null) {
    return NextResponse.json({ known: false, reason: "not_configured" });
  }

  const q = supabase.from("blotter_installs").select("install_id, first_seen, last_seen");
  const { data: installs, error } = FULL.test(raw)
    ? await q.eq("install_id", raw)
    : await q.like("install_id", `${raw}%`);

  if (error) return NextResponse.json({ known: false, reason: "lookup_failed" });

  const rows = (installs ?? []) as Array<{
    install_id: string;
    first_seen: string;
    last_seen: string;
  }>;
  if (rows.length === 0) return NextResponse.json({ known: false, reason: "no_such_sheet" });
  if (rows.length > 1) return NextResponse.json({ known: false, reason: "ambiguous" });

  const install = rows[0];

  const { data: keys } = await supabase
    .from("blotter_keys")
    .select("key, install_id, entitled_until, revoked_at")
    .eq("install_id", install.install_id);

  const verdict = entitlementFor((keys as KeyRow[] | null) ?? []);

  return NextResponse.json({
    known: true,
    install_id: install.install_id,
    first_seen: install.first_seen,
    last_seen: install.last_seen,
    entitled: verdict.allow,
    reason: verdict.reason,
    entitled_until: verdict.entitled_until,
  });
}
