import "server-only";

import Stripe from "stripe";

/**
 * The Stripe client, made once and only when it is asked for.
 *
 * Lazy for the same reason `supabase-admin.ts` is: a module that throws at
 * import time takes the whole route down, and a build that has no keys must
 * still build. `stripeConfigured()` is the question every caller asks first,
 * and it is the only thing that reads the variable.
 *
 * **Nothing here can be reached from the browser.** `server-only` makes that a
 * build error rather than a code review.
 */

let client: Stripe | null = null;

export function stripeConfigured(): boolean {
  return (process.env.STRIPE_SECRET_KEY ?? "").trim().length > 0;
}

export function stripe(): Stripe | null {
  if (!stripeConfigured()) return null;
  if (client === null) {
    client = new Stripe((process.env.STRIPE_SECRET_KEY as string).trim(), {
      /* Pinned. An unpinned version means Stripe can change a field shape
         under a running deployment, and the first anyone would know is a
         webhook that stopped binding keys. */
      apiVersion: "2026-08-26.dahlia",
      typescript: true,
      appInfo: { name: "Blotter", url: "https://blotterib.com" },
    });
  }
  return client;
}

/** The price a checkout is created against. One variable, so the model can change. */
export function priceId(): string {
  return (process.env.STRIPE_PRICE_ID ?? "").trim();
}

export function webhookSecret(): string {
  return (process.env.STRIPE_WEBHOOK_SECRET ?? "").trim();
}

/**
 * How long a purchase entitles a sheet for.
 *
 * The whole pricing decision lives here and in the Stripe price object.
 *
 *   unset or `forever`   `entitled_until` is null. A one-time purchase.
 *   a number of days     `entitled_until` is that many days out. A season pass.
 *
 * A subscription is the same column moved forward by a renewal event, and
 * those events are deliberately NOT handled yet: see the webhook.
 */
export function entitlementDays(): number | null {
  const raw = (process.env.BLOTTER_ENTITLEMENT_DAYS ?? "").trim();
  if (raw === "" || raw.toLowerCase() === "forever") return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Whether the buy button is shown. Off unless the variable says `on`. */
export function sellingEnabled(): boolean {
  return (process.env.BLOTTER_SELLING ?? "").trim().toLowerCase() === "on";
}
