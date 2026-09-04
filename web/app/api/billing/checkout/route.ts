import "server-only";
import { NextResponse } from "next/server";

import { priceId, stripe, stripeConfigured } from "@/lib/stripe";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * Start a purchase for one sheet.
 *
 * The student has already told `/billing` which sheet is theirs, so the only
 * job here is to prove that sheet exists and hand Stripe a session that
 * remembers which one it was.
 *
 * ## Why the sheet is named before paying, not after
 *
 * This is the hop where a paid customer gets stranded. The obvious design is
 * to sell a key and have them paste it into their sheet, and it has two
 * failure modes: a mistyped key fails silently, and the confirmation only
 * arrives on the next run, up to fifteen minutes later. Naming the sheet first
 * means the key row is created already bound, the sheet is entitled the moment
 * the webhook lands, and there is nothing to paste at all.
 *
 * ## Why the install id is checked here
 *
 * Stripe will happily take money against a `client_reference_id` that means
 * nothing. Refusing an unknown sheet before checkout is the difference between
 * a person who cannot pay and a person who has paid for nothing.
 */

const FULL = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export async function POST(request: Request) {
  if (!stripeConfigured() || priceId() === "") {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const field = (body as Record<string, unknown> | null)?.install_id;
  const installId = typeof field === "string" ? field.trim().toLowerCase() : "";
  if (!FULL.test(installId)) {
    return NextResponse.json({ error: "not_an_id" }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  if (supabase === null) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("blotter_installs")
    .select("install_id")
    .eq("install_id", installId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "lookup_failed" }, { status: 503 });
  if (data === null) {
    return NextResponse.json({ error: "no_such_sheet" }, { status: 404 });
  }

  const client = stripe();
  if (client === null) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const origin =
    request.headers.get("origin") ?? "https://blotterib.com";

  try {
    const session = await client.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId(), quantity: 1 }],
      /* Both, deliberately. `client_reference_id` is what shows in the Stripe
         dashboard beside the payment, so a human looking at a charge can see
         which sheet it was for. `metadata` is what the webhook reads, because
         it survives on the objects the later events carry. */
      client_reference_id: installId,
      metadata: { install_id: installId },
      payment_intent_data: {
        metadata: { install_id: installId },
        /* What appears on the card statement, so a Blotter charge is not
           mistaken for something else on a shared account. */
        statement_descriptor_suffix: "BLOTTER",
      },
      success_url: `${origin}/billing/done?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout] session failed:", e);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
