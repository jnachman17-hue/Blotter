import { NextResponse } from "next/server";

import { enforcing, verdictFor, type KeyRecord } from "../entitlement/enforcement";
import { computeEngine } from "./rules";
import { parseEngineRequest, RequestError } from "./validate";

import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * The engine endpoint: `POST /api/engine`.
 *
 * The courier fetches the student's mail, calendar and sheet, posts them
 * here as facts, and writes down the answer. Every judgment lives in
 * `rules.ts`; this file only carries HTTP. Keeping the two apart is the
 * architecture, not a style preference — the rules move to a different host
 * one day, and that move must be an adapter swap rather than a rewrite.
 *
 * **The server is stateless.** Everything it needs arrives in the request —
 * including `now`, which comes from the courier and never from this
 * machine's clock, so the same request always produces the same response and
 * a test can ask what was true on any day of a past season. No database, no
 * environment variables, no user data at rest, ever.
 *
 * **Failure is loud on purpose.** The contract has the courier write nothing
 * on any non-200, leaving the sheet exactly as it was; a stale sheet is
 * recoverable and a half-written one is not. So a bad request gets a 400
 * naming the field, and an unexpected fault gets a 500 — never a partial
 * answer.
 *
 * `lib/request-guard.ts` is deliberately not used here: its 64KB ceiling is
 * sized for a browser form, and a legitimate engine request carries a whole
 * season of threads. The platform's own body limit applies instead.
 */

/**
 * A 402 with something to read, or `null` to carry on.
 *
 * The notice is the point. A refused run writes nothing except this, so a
 * student whose access lapsed sees a sentence in their sheet rather than a
 * tracker that quietly stopped.
 *
 * **A database that cannot be reached lets the run through.** The alternative
 * is an outage that locks every paying student out of their own spreadsheet,
 * which is far worse than a lapsed one getting a free afternoon.
 */
async function refuse(key: string): Promise<NextResponse | null> {
  if (!supabaseConfigured()) return null;
  const supabase = supabaseAdmin();
  if (supabase === null) return null;

  let record: KeyRecord | null = null;
  try {
    const { data, error } = await supabase
      .from("blotter_keys")
      .select("status, grace_until")
      .eq("key", key)
      .maybeSingle();
    if (error) return null;
    record = (data as KeyRecord | null) ?? null;
  } catch {
    return null;
  }

  const verdict = verdictFor(key, record);
  if (verdict.allow) return null;

  return NextResponse.json(
    {
      error: "This Blotter sheet is not currently active.",
      notice: {
        level: "blocked",
        text:
          verdict.reason === "no_key"
            ? "Blotter needs a key to keep updating this sheet. Your data is untouched."
            : "Blotter has stopped updating this sheet. Your data is untouched and nothing has been deleted.",
        url: "https://blotterib.com/billing",
      },
    },
    { status: 402 },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The request body is not valid JSON." },
      { status: 400 },
    );
  }

  try {
    const parsed = parseEngineRequest(body);

    /* Entitlement, and it is OFF. `enforcing()` reads one variable that only
       it may read, and `GET /api/entitlement` reports the same call — so the
       state you can check with curl is the state in force. D27 was lost to a
       switch with two sources; this one has exactly one.

       Note what does NOT happen here: no write, ever. Binding a key to an
       account is a write and it lives on `/api/telemetry` instead, so the
       engine's "stores nothing" stays literally true (amendment A2). */
    if (enforcing()) {
      const refusal = await refuse(parsed.key);
      if (refusal !== null) return refusal;
    }

    return NextResponse.json(computeEngine(parsed));
  } catch (error) {
    if (error instanceof RequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("[engine] compute failed:", error);
    return NextResponse.json(
      { error: "The engine failed to compute a response. Nothing was written." },
      { status: 500 },
    );
  }
}
