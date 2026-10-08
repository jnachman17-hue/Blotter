import Link from "next/link";

import { LINK } from "@/app/setup/shared";
import { statusSnapshot } from "@/lib/status-snapshot";

/**
 * What our server holds, right now, as the five questions a person actually
 * has. Not as tables.
 *
 * The earlier version listed every table and column by name. It was honest
 * and it was a database console; Jon's words were that install ids and
 * timestamps "mean nothing to bankers". This asks the questions in order of
 * fear and answers each from the same live reading `/status` uses.
 *
 * Two things this has to get right. First, "none" for emails is not a count
 * of an empty table. There is no table that could hold an email, and the line
 * says so, because a zero can be read as "a table that happens to be empty
 * today". Second, the two lists of website-form addresses are here too. A
 * page that says "we hold nothing" and leaves out the sign-up form is the
 * kind of page a careful reader stops believing.
 *
 * The technical view, every table and column with live counts, stays at
 * `/status` behind the link at the bottom.
 */

function count(rows: number | null): string {
  return rows === null ? "could not load" : rows.toLocaleString("en-US");
}

export async function WhatWeHoldNow() {
  const snap = await statusSnapshot();
  const rows = (name: string) => snap.tables.find((t) => t.name === name)?.rows ?? null;
  const time = new Date(snap.checked_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const lines: [string, string, string][] = [
    ["Emails", "None.", "There is no place in our database for one."],
    ["The text of an email", "None.", "The script never reads it, so it is never sent."],
    ["Calendar events", "None.", "Matching events are used to work out a status and not kept."],
    ["Your contacts", "None.", "Used to work out each status, then gone."],
    ["Sheets counted", count(rows("blotter_installs")), "A random number per sheet, with the time of its last run and how many contacts it had."],
    [
      "Email addresses typed into this website",
      count((rows("leads") ?? 0) + (rows("contact_messages") ?? 0)),
      "From the sign-up form and the contact form. Nothing from anyone's Gmail.",
    ],
  ];

  return (
    <div className="mt-6 max-w-[64ch]">
      <dl className="divide-y divide-rule border-y border-rule">
        {lines.map(([q, a, why]) => (
          <div key={q} className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[16rem_1fr]">
            <dt className="text-body text-ink">{q}</dt>
            <dd>
              <p className="text-body font-semibold text-ink">{a}</p>
              <p className="text-small leading-[1.5] text-ink-muted">{why}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-small leading-[1.6] text-ink-muted">
        Read from our database at {time} UTC, as this page loaded. This shows what is in that
        database. It cannot prove there is no other, and we are not going to pretend it can.{" "}
        <Link href="/status" className={LINK}>
          Every table and column, live
        </Link>
        .
      </p>
    </div>
  );
}
