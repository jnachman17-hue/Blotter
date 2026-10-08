import "server-only";

import { enforcing } from "@/app/api/entitlement/enforcement";
import { SCRIPT_BYTES, SCRIPT_SENDS_TO, SCRIPT_SHA256, SCRIPT_VERSION } from "@/app/api/script/manifest";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";
import { TABLES } from "@/lib/what-we-hold";

/**
 * One reading of what the server holds, right now.
 *
 * Used by `GET /api/status` and rendered directly by `/status`, so the page and
 * the endpoint are the same reading rather than two. A count that cannot be
 * taken is `null`, and the page prints "could not load" for it. **Never 0.** A
 * zero that means "the query failed" would be the page claiming an empty table
 * it had not looked at.
 */

export interface TableCount {
  name: string;
  rows: number | null;
}

export interface StatusSnapshot {
  checked_at: string;
  server: {
    up: true;
    contract_version: 4;
    script_version: string;
    script_sha256: string;
    script_bytes: number;
    sends_to: string;
    billing_enforcing: boolean;
  };
  database: { configured: boolean; reachable: boolean };
  tables: TableCount[];
}

export async function statusSnapshot(): Promise<StatusSnapshot> {
  const supabase = supabaseConfigured() ? supabaseAdmin() : null;

  const tables: TableCount[] = await Promise.all(
    TABLES.map(async (table) => {
      if (supabase === null) return { name: table.name, rows: null };
      try {
        const { count, error } = await supabase
          .from(table.name)
          .select("*", { count: "exact", head: true });
        return { name: table.name, rows: error ? null : (count ?? 0) };
      } catch {
        return { name: table.name, rows: null };
      }
    }),
  );

  return {
    checked_at: new Date().toISOString(),
    server: {
      up: true,
      contract_version: 4,
      script_version: SCRIPT_VERSION,
      script_sha256: SCRIPT_SHA256,
      script_bytes: SCRIPT_BYTES,
      sends_to: SCRIPT_SENDS_TO,
      billing_enforcing: enforcing(),
    },
    database: {
      configured: supabase !== null,
      reachable: supabase !== null && tables.every((t) => t.rows !== null),
    },
    tables,
  };
}
