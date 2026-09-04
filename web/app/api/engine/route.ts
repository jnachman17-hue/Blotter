import { NextResponse } from "next/server";

import { computeEngine } from "./rules";
import { parseEngineRequest, RequestError } from "./validate";

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
