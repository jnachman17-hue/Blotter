import "server-only";

/**
 * Whether the server refuses runs it has not been paid for.
 *
 * **One source, and that is the whole design.** D27 cost an hour to a switch
 * with two: an environment variable and a query-string override, where turning
 * off the one you were looking at left the other one on. The lesson was that a
 * switch you cannot confirm is not a switch.
 *
 * So: this file reads `BLOTTER_ENFORCE` and nothing else reads it. Every caller
 * — the engine, the entitlement route — goes through `enforcing()`, and
 * `GET /api/entitlement` reports exactly what this returns. **The value you see
 * with curl is the value the engine uses**, because it is the same call.
 *
 * Default is off. A missing variable, a typo, a failed deploy — all of them
 * mean nobody is refused, which is the only safe direction for a switch whose
 * wrong setting locks paying students out of their own spreadsheet.
 */

/** The one variable. Only this file may read it. */
export function enforcing(): boolean {
  return (process.env.BLOTTER_ENFORCE ?? "").trim().toLowerCase() === "on";
}

/* The decision itself lives in `verdict.ts`, deliberately without
   `server-only`: it is pure, it is the part most worth testing, and a file
   that cannot be imported by a test runner does not get tested. */
export { verdictFor, type KeyRecord, type KeyStatus, type Verdict } from "./verdict";
