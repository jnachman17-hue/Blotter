import { NextResponse } from "next/server";

import { enforcing } from "./enforcement";

/**
 * What the switch is set to, so it can be checked rather than believed.
 *
 * This exists because of D27: a rehearsal lost an hour to a switch with two
 * sources, where the one being looked at was not the one in effect. **This
 * route calls exactly what the engine calls**, so the answer here is the
 * answer there — not a second reading of the same variable, the same reading.
 *
 *     curl https://blotterib.com/api/entitlement
 *     {"enforcing":false}
 *
 * `false` means nobody is ever refused, whatever any table says.
 */
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ enforcing: enforcing() });
}
