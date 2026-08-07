import { NextResponse } from "next/server";

import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * Lead capture.
 *
 * The browser never talks to the database. It posts here, and this route writes
 * with the `service_role` key, which stays on the server. The alternative —
 * inserting straight from the browser with the anon key and a row-level
 * security policy — would put a write-capable key in the page source, where
 * anyone can read it and post whatever they like into the table this test
 * depends on.
 *
 * **Storage is best-effort and must never block the funnel.** Every failure
 * path returns 200 with `stored: false`. A visitor who reaches the price screen
 * has already given us the signal that matters; losing their row to an outage
 * is a data problem, not a reason to stop their run. The caller does not await
 * this.
 *
 * Email lives here and in the table and nowhere else. It is never attached to
 * an analytics event — WS3 and WS5 both require that, and `EventProperties`
 * deliberately has no field it could occupy.
 */

/** Node rather than Edge: the Supabase client expects a Node runtime. */
export const runtime = "nodejs";

const TRACKS = new Set([
  "Investment Banking",
  "Management Consulting",
  "Private Equity / Growth Equity",
  "Sales & Trading",
  "Asset Management / Equity Research",
  "Venture Capital",
  "Other",
]);
const WINDOWS = new Set(["Summer 2028", "Full-time", "Other"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Free text from strangers. Bounded and trimmed before it is stored. */
function text(value: unknown, max = 80): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

function member(value: unknown, allowed: Set<string>): string | null {
  return typeof value === "string" && allowed.has(value) ? value : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ stored: false, reason: "bad_request" }, { status: 400 });
  }

  const email = text(body.email, 254);
  if (!email || !EMAIL.test(email)) {
    return NextResponse.json({ stored: false, reason: "invalid_email" }, { status: 400 });
  }

  /* Whitelisted rather than trusted: the option lists are closed sets, so
     anything else arriving here is either a bug or someone poking at us. */
  const row = {
    email,
    recruiting_track: member(body.recruiting_track, TRACKS),
    recruiting_window: member(body.recruiting_window, WINDOWS),
    recruiting_track_other: text(body.recruiting_track_other),
    recruiting_window_other: text(body.recruiting_window_other),
    surface_variant: "spreadsheet",
    cta_location: member(
      body.cta_location,
      new Set(["header", "hero", "actions", "final"]),
    ),
    session_id: text(body.session_id, 64),
    visitor_id: text(body.visitor_id, 64),
    furthest_stage: text(body.furthest_stage, 32),
    furthest_stage_index:
      typeof body.furthest_stage_index === "number" &&
      Number.isInteger(body.furthest_stage_index) &&
      body.furthest_stage_index >= 0 &&
      body.furthest_stage_index < 32
        ? body.furthest_stage_index
        : 0,
    test_iteration: text(body.test_iteration, 16),
    is_internal: body.is_internal === true,
  };

  if (!supabaseConfigured()) {
    /* The normal state before the project is provisioned. Say so plainly in
       development rather than failing silently and looking like it worked. */
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] Supabase not configured, not stored:", row.email);
    }
    return NextResponse.json({ stored: false, reason: "not_configured" });
  }

  const supabase = supabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ stored: false, reason: "not_configured" });
  }

  /* Upsert on visitor_id so a visitor who runs the funnel twice updates their
     row rather than duplicating it. WS5 Phase 4 requires safe idempotent
     updates, and the metrics count unique visitors. */
  const { error } = await supabase
    .from("leads")
    .upsert(row, { onConflict: "visitor_id" });

  if (error) {
    console.error("[lead] insert failed:", error.message);
    return NextResponse.json({ stored: false, reason: "insert_failed" });
  }

  return NextResponse.json({ stored: true });
}
