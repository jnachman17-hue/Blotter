import { NextResponse } from "next/server";

import { enforcing } from "../entitlement/enforcement";
import { entitlementFor, type KeyRow } from "../entitlement/install";
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
async function refuse(installId: string): Promise<NextResponse | null> {
  if (!supabaseConfigured()) return null;
  const supabase = supabaseAdmin();
  if (supabase === null) return null;

  /* A sheet with no id cannot be looked up, and refusing it would lock out
     anyone whose Settings row had not been written yet. Let it through: this
     is the same judgement as the unreachable-database case below. */
  if (installId.trim() === "") return null;

  let rows: KeyRow[] = [];
  try {
    const { data, error } = await supabase
      .from("blotter_keys")
      .select("key, install_id, entitled_until, revoked_at")
      .eq("install_id", installId.trim().toLowerCase());
    if (error) return null;
    rows = (data as KeyRow[] | null) ?? [];
  } catch {
    return null;
  }

  const verdict = entitlementFor(rows);
  if (verdict.allow) return null;

  return NextResponse.json(
    {
      error: "This Blotter sheet is not currently active.",
      notice: {
        level: "blocked",
        /* One line, no wrap, so it says the three things that matter and
           stops: what happened, that nothing was lost, and the one action.
           The billing page does the explaining; a banner that tries to
           teach is a banner nobody finishes reading.
           
           Length is a hard constraint, not a preference. The message shares
           one un-wrapped row with the URL, and the room is the sheet's width
           less the "Blotter" label: about 1,166px, or roughly 185 characters
           of bold 11pt. The first draft came to 174 with the production URL,
           which left 14 characters of margin and would have clipped on any
           sheet whose columns had been narrowed. */
        text:
          verdict.reason === "no_key"
            ? "Blotter is no longer free. Nothing in your sheet has changed. To start it again, copy your Blotter ID from Settings and visit"
            : "Blotter has stopped updating this sheet. Everything in it is untouched. Copy your Blotter ID from Settings and visit",
        /* Configurable so the cut-off can be rehearsed against a preview
           deployment. A banner pointing at a 404 is worse than no banner. */
        url: (process.env.BLOTTER_BILLING_URL ?? "https://blotterib.com/billing").trim(),
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

       Note what does NOT happen here: no write, ever (amendment A2). It used
       to be true only because binding was pushed onto `/api/telemetry`. It is
       now true because nothing binds at runtime at all: the student names
       their sheet on the website before paying, so the key row is created
       with its `install_id` already on it. The engine reads by that id and
       never sees a key. */
    if (enforcing()) {
      const refusal = await refuse(parsed.install_id);
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
