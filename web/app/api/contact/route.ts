import { NextResponse } from "next/server";

import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

/**
 * Contact messages.
 *
 * Same shape as `api/lead`: the browser never talks to the database, this route
 * writes with the `service_role` key, and that key stays on the server. Writing
 * from the browser with the anon key would put a write-capable credential in
 * the page source.
 *
 * ## Where this differs from the lead route, and why
 *
 * **Failure is reported rather than swallowed.** The lead route returns 200
 * with `stored: false` on every failure path, deliberately: a visitor who
 * reached the price screen has already given the signal that matters, and
 * losing the row is a data problem rather than a reason to interrupt them.
 *
 * The opposite is true here. A reader who writes a message and is told it sent
 * will wait for a reply that is never coming, because there is no record that
 * they wrote. **A contact form that silently drops mail is worse than no
 * contact form**, so this one fails loudly and the page offers the mail address
 * instead.
 *
 * **Insert rather than upsert.** Two messages from one person are two messages.
 * `leads` upserts on `visitor_id` because the metric counts unique visitors;
 * correspondence has no such key.
 *
 * ## Spam
 *
 * A public form on a domain about to be promoted will be found. Two cheap
 * defences, neither of which costs a real reader anything:
 *
 * - **A honeypot field**, hidden from people and from screen readers, that
 *   bots fill in because it is in the DOM. Filled means dropped — and dropped
 *   with a 200, so a bot learns nothing from the response.
 * - **Bounded input.** Every field is trimmed and truncated before it is
 *   stored, so nothing here can be used to write a novel into the table.
 *
 * Deliberately not a CAPTCHA: it would be the only thing on this page standing
 * between a reader and a question, and the volume this form will see does not
 * justify it. Revisit if it is actually abused.
 */

/** Node rather than Edge: the Supabase client expects a Node runtime. */
export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Free text from strangers. Bounded and trimmed before it is stored. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ sent: false, reason: "bad_request" }, { status: 400 });
  }

  /*
    The honeypot. A real submission leaves this empty because a real person
    never sees it. Answer 200 so an automated caller cannot tell a drop from a
    success and tune around it.
  */
  if (text(body.website, 200) !== null) {
    return NextResponse.json({ sent: true });
  }

  const email = text(body.email, 254);
  if (!email || !EMAIL.test(email)) {
    return NextResponse.json({ sent: false, reason: "invalid_email" }, { status: 400 });
  }

  const message = text(body.message, 4000);
  if (!message) {
    return NextResponse.json({ sent: false, reason: "empty_message" }, { status: 400 });
  }

  const row = {
    email,
    name: text(body.name, 120),
    message,
    source_path: text(body.source_path, 200),
    session_id: text(body.session_id, 64),
    visitor_id: text(body.visitor_id, 64),
    is_internal: body.is_internal === true,
  };

  if (!supabaseConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Supabase not configured, not stored:", row.email);
      /* In development a missing project is the normal state, so let the form
         complete rather than making every local test look broken. */
      return NextResponse.json({ sent: true, stored: false });
    }
    return NextResponse.json({ sent: false, reason: "not_configured" }, { status: 503 });
  }

  const supabase = supabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ sent: false, reason: "not_configured" }, { status: 503 });
  }

  const { error } = await supabase.from("contact_messages").insert(row);

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json({ sent: false, reason: "insert_failed" }, { status: 502 });
  }

  return NextResponse.json({ sent: true, stored: true });
}
