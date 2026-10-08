"use client";

import { useState } from "react";

import { TABLES } from "@/lib/what-we-hold";

/**
 * Paste your Blotter ID; see the exact rows the server holds about your sheet.
 *
 * ## Why this is the honest version of "we keep nothing"
 *
 * The counts on `/status` say how many rows each table has. They do not say
 * what is in a row, and a suspicious reader is right not to take a column
 * description on faith. This shows them their own rows, column by column, as
 * they actually are: a random id, a few timestamps, a number of contacts. If
 * there were more, it would be here, because the route returns every column.
 *
 * ## Why nobody can see anyone else's
 *
 * The id is a random UUID the sheet made for itself. It cannot be guessed, and
 * the only way to have one is to be looking at the sheet it belongs to. The
 * key column is masked by the server before it answers, so even the sheet's
 * own owner cannot read a key off this page.
 */

type Row = Record<string, unknown>;

interface Lookup {
  install_id: string;
  checked_at: string;
  blotter_installs: Row[];
  blotter_keys: Row[];
  blotter_key_mismatches: Row[];
}

function labelsFor(table: string): Map<string, string> {
  const found = TABLES.find((t) => t.name === table);
  return new Map((found?.columns ?? []).map((c) => [c.name, c.means]));
}

function show(value: unknown): string {
  if (value === null || value === undefined || value === "") return "blank";
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  }
  return String(value);
}

function RowTable({ table, rows }: { table: string; rows: Row[] }) {
  const labels = labelsFor(table);
  const meta = TABLES.find((t) => t.name === table);
  return (
    <div className="border-t border-rule pt-4">
      <p className="text-small font-semibold text-ink">
        {meta?.label ?? table}{" "}
        <span className="font-mono text-micro font-normal text-ink-faint">{table}</span>
      </p>
      {rows.length === 0 ? (
        <p className="mt-1 text-small leading-[1.5] text-ink-muted">No row.</p>
      ) : (
        rows.map((row, i) => (
          <dl key={i} className="mt-3 divide-y divide-rule border-y border-rule">
            {Object.entries(row).map(([k, v]) => (
              <div key={k} className="grid gap-x-4 gap-y-0.5 py-2 sm:grid-cols-[11rem_1fr]">
                <dt className="font-mono text-micro text-ink-muted">{k}</dt>
                <dd>
                  <p className="font-mono text-[12px] leading-[1.5] break-all text-ink">{show(v)}</p>
                  {labels.get(k) && (
                    <p className="mt-0.5 text-micro leading-[1.45] text-ink-faint">{labels.get(k)}</p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ))
      )}
    </div>
  );
}

export function FindYourSheet() {
  const [id, setId] = useState("");
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "looking" }
    | { kind: "bad"; message: string }
    | { kind: "failed" }
    | { kind: "done"; data: Lookup }
  >({ kind: "idle" });

  async function look() {
    setState({ kind: "looking" });
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ install_id: id }),
      });
      const data = await res.json();
      if (res.status === 400 && data?.message) {
        setState({ kind: "bad", message: String(data.message) });
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setState({ kind: "done", data: data as Lookup });
    } catch {
      setState({ kind: "failed" });
    }
  }

  const empty =
    state.kind === "done" &&
    state.data.blotter_installs.length === 0 &&
    state.data.blotter_keys.length === 0 &&
    state.data.blotter_key_mismatches.length === 0;

  return (
    <div className="mt-6 max-w-[64ch]">
      <label htmlFor="blotter-id" className="block text-small font-semibold text-ink">
        Your Blotter ID
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          id="blotter-id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") look();
          }}
          spellCheck={false}
          autoComplete="off"
          data-ph-no-capture
          className="ph-no-capture min-h-11 min-w-0 flex-1 basis-full sm:basis-auto rounded-lg border border-rule bg-white px-3 font-mono text-[13px] text-ink focus:border-navy-500 focus:outline-none"
          placeholder="8f14e45f-ceea-467a-9575-62d4d1e5a4f3"
        />
        <button
          type="button"
          onClick={look}
          disabled={state.kind === "looking"}
          className="inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700 disabled:opacity-60"
        >
          {state.kind === "looking" ? "Looking" : "Show every row about it"}
        </button>
      </div>

      <div aria-live="polite" className="mt-5 space-y-5">
        {state.kind === "bad" && (
          <p className="text-body leading-[1.6] text-ink-muted">{state.message}</p>
        )}
        {state.kind === "failed" && (
          <p className="text-body leading-[1.6] text-ink-muted">
            The lookup did not go through. Reload and try again.
          </p>
        )}
        {state.kind === "done" && empty && (
          <div className="border-l-2 border-blotter-400 bg-white py-4 pr-5 pl-5">
            <p className="text-body font-semibold text-ink">Nothing.</p>
            <p className="mt-1 text-body leading-[1.6] text-ink-muted">
              The server holds no row about that sheet. Either it has never run, or counting is
              switched off in its Settings.
            </p>
          </div>
        )}
        {state.kind === "done" && !empty && (
          <p className="text-body leading-[1.6] text-ink-muted">
            Every row in every table that mentions{" "}
            <span className="font-mono text-small text-ink">{state.data.install_id}</span>, as of{" "}
            {show(state.data.checked_at)}. Tables with no row are listed too.
          </p>
        )}
      </div>

      {state.kind === "done" && !empty && (
        <div className="mt-5 space-y-5">
          <RowTable table="blotter_installs" rows={state.data.blotter_installs} />
          <RowTable table="blotter_keys" rows={state.data.blotter_keys} />
          <RowTable table="blotter_key_mismatches" rows={state.data.blotter_key_mismatches} />
        </div>
      )}
    </div>
  );
}
