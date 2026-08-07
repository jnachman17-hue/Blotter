import "server-only";

/**
 * The Supabase client, server side only.
 *
 * `server-only` is the first import on purpose: it makes the build fail rather
 * than the deploy leak if anything in the browser bundle ever imports this
 * file. The `service_role` key bypasses row-level security, so a client-side
 * import would hand every visitor full read and write access to the leads
 * table.
 *
 * Nothing else in the app may read `SUPABASE_SERVICE_ROLE_KEY`. The only
 * consumer is `app/api/lead/route.ts`.
 *
 * Returns `null` when the environment is not configured, which is the normal
 * state before Jon provisions the project. Callers must treat storage as
 * best-effort: a visitor's progress through the funnel may never depend on the
 * database being reachable.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Reduce whatever was pasted to the project origin.
 *
 * Supabase's dashboard shows the project URL in one place and the Data API
 * endpoint — the same host with `/rest/v1` on the end — in another, and the
 * second is the one that looks like it belongs in a variable called URL. The
 * client wants the origin and appends its own paths, so a pasted
 * `https://ref.supabase.co/rest/v1/` produces
 * `Invalid path specified in request URL`, which names nothing useful.
 *
 * Normalising here costs one line and removes the trap permanently.
 */
function projectOrigin(raw: string): string | null {
  try {
    return new URL(raw.trim()).origin;
  } catch {
    return null;
  }
}

let client: SupabaseClient | null = null;
let checked = false;

export function supabaseAdmin(): SupabaseClient | null {
  if (checked) return client;
  checked = true;

  const raw = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!raw || !key) return null;

  const url = projectOrigin(raw);
  if (!url) {
    console.error("[supabase] SUPABASE_URL is not a valid URL");
    return null;
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
