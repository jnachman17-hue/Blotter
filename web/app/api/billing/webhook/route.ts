import "server-only";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { entitlementDays, stripe, stripeConfigured, webhookSecret } from "@/lib/stripe";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * What Stripe tells us, and the only place a key is ever created.
 *
 * ## Every handler here is idempotent, and that is not optional
 *
 * Stripe retries a webhook until it gets a 2xx, and it can deliver the same
 * event more than once even after success. So a repeat delivery must reach the
 * same end state as the first, never a second key or a double revocation.
 * Each handler below is written as "make this true", not "do this thing".
 *
 * ## What is handled, and what deliberately is not
 *
 * Handled: a completed purchase, a refund, and a dispute. Those three are the
 * whole lifecycle of a one-time payment, and a refund that leaves a customer
 * with working access is money gone with nothing recovered.
 *
 * **Subscriptions are handled too**, because the pricing model is not decided
 * and a system that only works for one answer forces the answer. A renewal is
 * `invoice.paid`, and all it does is push `entitled_until` out to the end of
 * the period just paid for.
 *
 * That makes cancellation need no handler at all. A cancelled subscription
 * simply stops sending invoices, so the last period end stands and the sheet
 * lapses on the day it was already paid up to. A student who cancels keeps
 * what they bought, which is both correct and the behaviour nobody has to
 * remember to write.
 */

/** A key a person can read aloud. No vowels, so it spells nothing by accident. */
function newKey(): string {
  const alphabet = "BCDFGHJKLMNPQRSTVWXZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let out = "";
  for (let i = 0; i < 16; i += 1) {
    if (i > 0 && i % 4 === 0) out += "-";
    out += alphabet[bytes[i] % alphabet.length];
  }
  return `BL-${out}`;
}

async function onPurchase(session: Stripe.Checkout.Session): Promise<void> {
  const installId =
    session.metadata?.install_id ?? session.client_reference_id ?? null;

  if (installId === null) {
    /* Loud, because it is unrecoverable from here: somebody paid and there is
       no way to know which sheet for. It should be impossible, since our own
       checkout route always stamps it. */
    console.error(
      `[webhook] checkout.session.completed ${session.id} carries no install_id. ` +
        `Payment taken and no sheet to credit.`,
    );
    return;
  }

  if (session.payment_status !== "paid") return;

  const supabase = supabaseAdmin();
  if (supabase === null) return;

  /* Idempotency: the session id is the natural unique thing about a purchase,
     so a repeat delivery finds its own row and stops. */
  const { data: existing } = await supabase
    .from("blotter_keys")
    .select("key")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing) {
    console.log(`[webhook] ${session.id} already recorded, repeat delivery ignored`);
    return;
  }

  const days = entitlementDays();
  const until =
    days === null ? null : new Date(Date.now() + days * 86_400_000).toISOString();

  /* Both ids, because they identify the same money in different events. The
     purchase carries a session id; a refund carries only a payment intent. */
  const paymentIntent =
    typeof session.payment_intent === "string" ? session.payment_intent : null;
  const subscription =
    typeof session.subscription === "string" ? session.subscription : null;

  const { error } = await supabase.from("blotter_keys").insert({
    key: newKey(),
    install_id: installId,
    bound_at: new Date().toISOString(),
    entitled_until: until,
    stripe_session_id: session.id,
    stripe_payment_intent: paymentIntent,
    stripe_subscription_id: subscription,
    note: `checkout ${session.id}`,
  });

  if (error) {
    /* Throwing gives Stripe a non-2xx, so it retries. A purchase that failed
       to write must not be forgotten quietly. */
    console.error(`[webhook] could not record ${session.id}:`, error.message);
    throw new Error("insert failed");
  }
}

/**
 * A refund or a dispute withdraws access. The row is kept, never deleted, so a
 * key that comes back is recognised instead of looking unissued.
 *
 * Matched on the payment intent, which is the only id a refund event carries.
 * `revoked_at is null` makes a repeat delivery a no-op.
 */
async function onWithdrawn(paymentIntent: string, why: string): Promise<void> {
  const supabase = supabaseAdmin();
  if (supabase === null) return;

  const { data, error } = await supabase
    .from("blotter_keys")
    .update({ revoked_at: new Date().toISOString(), note: why })
    .eq("stripe_payment_intent", paymentIntent)
    .is("revoked_at", null)
    .select("key");

  if (error) {
    console.error(`[webhook] could not revoke ${paymentIntent}:`, error.message);
    throw new Error("revoke failed");
  }
  if ((data ?? []).length === 0) {
    /* Either a repeat delivery, or a payment this system never issued a key
       for. Both are fine to pass over, and both are worth a line. */
    console.log(`[webhook] nothing to revoke for ${paymentIntent} (${why})`);
  }
}

/**
 * A renewal. The only thing it does is move the paid-up date forward.
 *
 * Idempotent because it sets an absolute date rather than adding time: the
 * same invoice delivered twice writes the same value. Adding a month per
 * delivery would hand a subscriber a free month for every Stripe retry.
 */
async function onRenewal(invoice: Stripe.Invoice): Promise<void> {
  const sub = (invoice as unknown as { subscription?: string | null }).subscription;
  const subscriptionId = typeof sub === "string" ? sub : null;
  if (subscriptionId === null) return;

  const supabase = supabaseAdmin();
  if (supabase === null) return;

  const client = stripe();
  if (client === null) return;

  /* The period end is read from Stripe rather than computed here. Ours would
     drift from theirs the first time a proration, a coupon or a trial moved
     the date, and theirs is the one the customer was actually charged for. */
  let until: string | null = null;
  try {
    const s = await client.subscriptions.retrieve(subscriptionId);
    const end = (s as unknown as { current_period_end?: number }).current_period_end;
    if (typeof end === "number") until = new Date(end * 1000).toISOString();
  } catch (e) {
    console.error(`[webhook] could not read subscription ${subscriptionId}:`, e);
    throw new Error("subscription read failed");
  }
  if (until === null) return;

  const { data, error } = await supabase
    .from("blotter_keys")
    .update({ entitled_until: until })
    .eq("stripe_subscription_id", subscriptionId)
    .is("revoked_at", null)
    .select("key");

  if (error) {
    console.error(`[webhook] could not extend ${subscriptionId}:`, error.message);
    throw new Error("extend failed");
  }
  if ((data ?? []).length === 0) {
    /* The first invoice of a new subscription can arrive before, or beside,
       the checkout event that creates the row. Stripe will retry, and by then
       the row exists, so this is a wait rather than a failure. */
    console.log(`[webhook] no key yet for ${subscriptionId}, leaving it to the retry`);
    throw new Error("no key yet");
  }
}

export async function POST(request: Request) {
  if (!stripeConfigured() || webhookSecret() === "" || !supabaseConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const client = stripe();
  if (client === null) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (signature === null) {
    return NextResponse.json({ error: "no_signature" }, { status: 400 });
  }

  /* The RAW body. Next parses nothing here on purpose: the signature is over
     the exact bytes Stripe sent, and re-serialising JSON changes them. */
  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = await client.webhooks.constructEventAsync(raw, signature, webhookSecret());
  } catch (e) {
    /* An unverified event is not from Stripe, whatever it claims. */
    console.error("[webhook] signature check failed:", e);
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await onPurchase(event.data.object as Stripe.Checkout.Session);
        break;

      case "invoice.paid":
        await onRenewal(event.data.object as Stripe.Invoice);
        break;

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
        if (pi) await onWithdrawn(pi, `refunded ${event.id}`);
        break;
      }

      case "charge.dispute.created": {
        const dispute = event.data.object as Stripe.Dispute;
        const pi = typeof dispute.payment_intent === "string" ? dispute.payment_intent : null;
        if (pi) await onWithdrawn(pi, `disputed ${event.id}`);
        break;
      }

      default:
        /* Everything else is acknowledged and ignored. Returning non-2xx for
           an event we do not care about makes Stripe retry it forever. */
        break;
    }
  } catch (e) {
    console.error(`[webhook] ${event.type} ${event.id} failed:`, e);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
