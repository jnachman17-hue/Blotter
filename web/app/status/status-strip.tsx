"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { StatusSnapshot } from "@/lib/status-snapshot";

/**
 * The live part of `/status`: three mono items and every table's row count,
 * read again every sixty seconds from `GET /api/status`.
 *
 * The page is rendered on the server with one reading of `statusSnapshot()`
 * and that reading is passed in here as the first value, so nothing on the
 * page is blank before the browser takes over. After that the browser asks
 * the endpoint itself, on a timer. The endpoint and the page call the same
 * function, so a number here and a number there cannot come from two
 * different readings.
 *
 * Every table count and the strip share one reading, held in a context, so
 * the "checked at" time on the strip is the time the counts were taken too.
 * A count the server could not take is `null` and prints "could not load".
 * **Never 0.** A zero for a query that failed would be the page claiming an
 * empty table it had not looked at.
 *
 * Times are printed as `HH:MM:SS UTC` from the ISO string, never through the
 * browser's locale, so the server and the browser print the same characters
 * and the page does not flicker on hydration.
 */

interface Live {
  /** The last reading that came back. */
  snapshot: StatusSnapshot;
  /** When the browser last asked, whether or not it got an answer. */
  checkedAt: string;
  /** Whether the last ask got an answer. */
  answered: boolean;
}

const LiveContext = createContext<Live | null>(null);

const REFRESH_MS = 60_000;

function hms(iso: string): string {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return "unknown time";
  return `${t.toISOString().slice(11, 19)} UTC`;
}

export function StatusLive({
  initial,
  children,
}: {
  initial: StatusSnapshot;
  children: React.ReactNode;
}) {
  const [live, setLive] = useState<Live>({
    snapshot: initial,
    checkedAt: initial.checked_at,
    answered: true,
  });

  useEffect(() => {
    let stopped = false;

    async function ask() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const next = (await res.json()) as StatusSnapshot;
        if (stopped) return;
        setLive({ snapshot: next, checkedAt: next.checked_at, answered: true });
      } catch {
        if (stopped) return;
        setLive((prev) => ({ ...prev, checkedAt: new Date().toISOString(), answered: false }));
      }
    }

    const timer = setInterval(ask, REFRESH_MS);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, []);

  return <LiveContext.Provider value={live}>{children}</LiveContext.Provider>;
}

function useLive(): Live {
  const live = useContext(LiveContext);
  if (live === null) {
    throw new Error("StatusStrip and LiveCount must sit inside StatusLive.");
  }
  return live;
}

/** The three mono items, and when the browser last asked. */
export function StatusStrip() {
  const { snapshot, checkedAt, answered } = useLive();
  const { server } = snapshot;

  const items = [
    answered ? `Server: answered at ${hms(snapshot.checked_at)}` : "Server: could not check",
    `Script published: ${server.script_version} · Contract version: ${server.contract_version}`,
    `Billing: switched ${server.billing_enforcing ? "on" : "off"}`,
  ];

  return (
    <div className="font-mono text-[12px] leading-[1.6] text-ink-muted">
      <ul className="flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:gap-x-3">
        {items.map((item, i) => (
          <li key={item} className="flex gap-x-3">
            {i > 0 && (
              <span aria-hidden className="hidden text-ink-faint sm:inline">
                ·
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1">
        Checked at {hms(checkedAt)}. Checked again every {REFRESH_MS / 1000} seconds while
        this page is open.
      </p>
    </div>
  );
}

/** One table's live row count, right-aligned by its parent. */
export function LiveCount({ table }: { table: string }) {
  const { snapshot } = useLive();
  const found = snapshot.tables.find((t) => t.name === table);
  const rows = found?.rows ?? null;

  if (rows === null) {
    return <span className="font-mono text-[12px] text-ink-muted">could not load</span>;
  }
  return (
    <span className="font-mono text-[13.5px] text-ink tabular-nums">
      {rows.toLocaleString("en-US")} {rows === 1 ? "row" : "rows"}
    </span>
  );
}
