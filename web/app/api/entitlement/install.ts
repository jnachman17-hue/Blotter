/**
 * Is this sheet entitled to run?
 *
 * ## Why this reads an install and not a key
 *
 * The first design bound a key to a sheet at runtime: the sheet presented a
 * key, the server wrote down whose it was. That needed a write on a hot path,
 * and amendment A2 forbids the engine writing anything, so the write was put
 * on `/api/telemetry` instead. Two problems came with that. Telemetry is
 * opt-out and the Settings tab invites students to switch it off, so anyone
 * who did could pay and never activate. And binding in one request while
 * checking in another leaves a gap: the run right after a purchase could be
 * refused by the engine and bound by telemetry a moment later, so a paid key
 * would fail exactly once, for no reason the student could see.
 *
 * Jon's ruling on the purchase flow removed the need for either. The student
 * types their Blotter ID on the website *before* paying, so the key row is
 * created with `install_id` already on it. **Binding happens at purchase, on
 * the website, in the webhook.** Nothing binds at runtime, the engine still
 * writes nothing, and there is no race because there is no second step.
 *
 * So the question this file answers is the simple one: given the rows for a
 * sheet, is it entitled right now?
 *
 * ## Why `entitled_until` and not a status column
 *
 * The pricing model is not decided, and this is what lets it wait:
 *
 *   - `null`  never expires. A one-time purchase.
 *   - a date  lapses then. A season pass.
 *   - a date a webhook moves forward each month. A subscription.
 *
 * All three are read by the same comparison, so choosing between them is a
 * Stripe price object rather than a schema change. A stored status would have
 * to be flipped by something when it expired, and a scheduled job that flips
 * rows is a second source of truth that drifts. A comparison cannot drift
 * (amendment A7).
 */

export interface KeyRow {
  key: string;
  /** Null until purchase binds it. */
  install_id: string | null;
  /** Null means it never expires. */
  entitled_until: string | null;
  /** Set by a refund or chargeback. Kept, so a returning key is recognised. */
  revoked_at: string | null;
}

export type EntitlementReason =
  | "ok"
  | "never_expires"
  | "no_key"
  | "revoked"
  | "lapsed";

export interface Entitlement {
  allow: boolean;
  reason: EntitlementReason;
  /** The furthest expiry that allowed this, for the banner to quote. */
  entitled_until: string | null;
}

/**
 * The verdict for one sheet, from every key row bound to it.
 *
 * A sheet may hold more than one row: a renewal is a second purchase, and a
 * refunded key can sit beside a live one. The furthest future wins, and a
 * key that never expires beats every date.
 */
export function entitlementFor(rows: KeyRow[], now: Date = new Date()): Entitlement {
  const live = rows.filter((r) => r.revoked_at === null);

  if (live.length === 0) {
    /* Distinguishing these two matters to the reader. "You had one and it was
       withdrawn" and "you never had one" want different sentences and
       different links. */
    return rows.length > 0
      ? { allow: false, reason: "revoked", entitled_until: null }
      : { allow: false, reason: "no_key", entitled_until: null };
  }

  if (live.some((r) => r.entitled_until === null)) {
    return { allow: true, reason: "never_expires", entitled_until: null };
  }

  let furthest: string | null = null;
  let furthestMs = -Infinity;
  for (const r of live) {
    const ms = Date.parse(r.entitled_until as string);
    if (Number.isNaN(ms)) continue; // an unparseable date is not an entitlement
    if (ms > furthestMs) {
      furthestMs = ms;
      furthest = r.entitled_until;
    }
  }

  if (furthest !== null && furthestMs > now.getTime()) {
    return { allow: true, reason: "ok", entitled_until: furthest };
  }
  return { allow: false, reason: "lapsed", entitled_until: furthest };
}
