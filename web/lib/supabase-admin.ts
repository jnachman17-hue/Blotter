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

let client: SupabaseClient | null = null;
let checked = false;

export function supabaseAdmin(): SupabaseClient | null {
  if (checked) return client;
  checked = true;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
