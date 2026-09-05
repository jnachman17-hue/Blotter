import type { Metadata } from "next";
import Link from "next/link";

import { B, LINK, Shell } from "@/app/setup/shared";
import { ReceiptStub } from "@/components/receipt-stub";
import { CONTACT_EMAIL } from "@/lib/contact";
import { statusSnapshot } from "@/lib/status-snapshot";
import { TABLES, VIEWS } from "@/lib/what-we-hold";

import { FindYourSheet } from "./find-your-sheet";
import { LiveCount, StatusLive, StatusStrip } from "./status-strip";

/**
 * What the server holds, right now, for anyone to look at.
 *
 * ## Why this page
 *
 * The audit page's row 2.5 says the server keeps nothing from anyone's Gmail
 * or Calendar. Reading the sheet's code proves what leaves a student's account
 * and nothing about what happens after it arrives. Jon's answer, 5 September
 * 2026, was to open the database rather than describe it: every table, every
 * column in plain English, a live row count beside each, and a box where a
 * student sees the exact rows about their own sheet.
 *
 * ## What it proves and does not
 *
 * It proves what this database holds. It cannot prove there is no other, and
 * the lede says so before anything else on the page. The two tables that hold
 * email addresses people typed into the website are listed at the same weight
 * as the rest, with the line for having a row deleted under each.
 *
 * ## Where the numbers come from
 *
 * `statusSnapshot()` is called here directly and again by `GET /api/status`,
 * so the page and the endpoint are the same reading. The page is
 * `force-dynamic` so every load is a fresh reading, and `status-strip.tsx`
 * asks the endpoint again every sixty seconds. Labels, purposes and column
 * text come from `lib/what-we-hold.ts` as written. Nothing on this page is
 * typed by hand.
 */
export const metadata: Metadata = {
  title: "What we hold right now | Blotter",
  description:
    "Every table in Blotter's database, every column in plain English, with live row counts, and a lookup that shows the exact rows about your own sheet.",
  alternates: { canonical: "/status" },
};

export const dynamic = "force-dynamic";

const PROSE = "max-w-[64ch] space-y-4 text-body leading-[1.65] text-ink-muted";
const H2 = "font-display scroll-mt-8 text-[1.4rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink";

/** Small counts as words, so copy reads as prose while still coming from the data. */
const WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
function word(n: number): string {
  return WORDS[n] ?? n.toLocaleString("en-US");
}

export default async function StatusPage() {
  const snapshot = await statusSnapshot();
  const formTables = TABLES.filter((t) => t.personal === "website-form").length;

  return (
    <Shell here="/status">
      <StatusLive initial={snapshot}>
        <h1 className="font-display text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-h2">
          What we hold right now
        </h1>

        <div className="mt-6 max-w-[58ch] space-y-4 text-lede leading-[1.7] text-ink-read">
          <p>
            This page reads our database while you look at it: every table, every column,
            and how many rows each one has. It proves what this database holds. It cannot
            prove there is no other. Nothing in any of these tables came from anyone&rsquo;s
            Gmail or Calendar.
          </p>
        </div>

        <ReceiptStub className="mt-6 max-w-[64ch]" />

        <div className="mt-5 max-w-[64ch]">
          <StatusStrip />
        </div>

        {/* ------------------------------------------------- every table */}
        <section id="tables" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
          <h2 className={H2}>Every table</h2>
          <div className={`${PROSE} mt-4`}>
            <p>
              {word(TABLES.length)} tables. Beside each is how many rows it has, as of the
              time on the strip above. Under each is every column and what it means.
            </p>
          </div>

          <div className="mt-8 max-w-[64ch] divide-y divide-rule border-y border-rule">
            {TABLES.map((table) => (
              <article key={table.name} id={`t-${table.name}`} className="scroll-mt-8 py-8">
                <div className="flex items-baseline justify-between gap-x-6">
                  <h3 className="text-body font-semibold text-ink">{table.label}</h3>
                  <p className="shrink-0 text-right">
                    <LiveCount table={table.name} />
                  </p>
                </div>
                <p className="mt-1 font-mono text-[12px] leading-[1.5] break-all text-ink-muted">
                  {table.name}
                </p>
                <p className="mt-3 text-body leading-[1.65] text-ink-muted">{table.purpose}</p>

                <dl className="mt-5 divide-y divide-rule border-y border-rule">
                  {table.columns.map((column) => (
                    <div
                      key={column.name}
                      className="grid gap-x-4 gap-y-0.5 py-2.5 sm:grid-cols-[13rem_1fr]"
                    >
                      <dt className="min-w-0 font-mono text-[12px] leading-[1.5] break-all text-ink">
                        {column.name}
                        {column.secret && (
                          <span className="ml-2 text-ink-faint">never shown</span>
                        )}
                      </dt>
                      <dd className="text-small leading-[1.55] text-ink-muted">{column.means}</dd>
                    </div>
                  ))}
                </dl>

                {table.personal === "website-form" && (
                  <p className="mt-4 text-small leading-[1.55] text-ink-muted">
                    To have yours deleted, email{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                      {CONTACT_EMAIL}
                    </a>{" "}
                    from that address.
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className={`${PROSE} mt-6`}>
            <p>
              That is the whole list. {word(formTables)} tables hold email addresses, because
              people typed them into this website. None holds anything from anyone&rsquo;s
              mailbox or calendar.
            </p>
          </div>

          {/* The saved views hold nothing of their own. Listed so the database's
              own catalogue has nothing on it that this page does not. */}
          <h3 className="mt-10 text-body font-semibold text-ink">
            {word(VIEWS.length)} saved views
          </h3>
          <div className={`${PROSE} mt-2`}>
            <p>
              A view holds no rows of its own. Each one is a filter over a table above, hiding
              the rows we marked as our own tests.
            </p>
          </div>
          <dl className="mt-4 max-w-[64ch] divide-y divide-rule border-y border-rule">
            {VIEWS.map((view) => (
              <div key={view.name} className="grid gap-x-4 gap-y-0.5 py-2.5 sm:grid-cols-[13rem_1fr]">
                <dt className="min-w-0 font-mono text-[12px] leading-[1.5] break-all text-ink">
                  {view.name}
                  <span className="ml-2 text-ink-faint">over {view.over}</span>
                </dt>
                <dd className="text-small leading-[1.55] text-ink-muted">{view.means}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------------------------- find your sheet */}
        <section id="find" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
          <h2 className={H2}>Find your sheet</h2>
          <div className={`${PROSE} mt-4`}>
            <p>
              Paste your Blotter ID. It is on your sheet&rsquo;s Settings tab and under{" "}
              <B>Blotter → Check this sheet</B>. You get every row about that sheet, from every
              table. The key is masked, and the three Stripe reference numbers show only as set
              or blank. The id is random and not linked to a name or an
              email, so there is no way to look up anyone else&rsquo;s.
            </p>
          </div>
          <FindYourSheet />
        </section>

        {/* ------------------------------------------------- foot */}
        <footer className="mt-16 max-w-[64ch] border-t border-rule pt-8">
          <div className="space-y-4 text-small leading-[1.6] text-ink-muted">
            <p>
              <Link href="/audit#r2-5" className={LINK}>
                This is row 2.5 on the audit page.
              </Link>{" "}
              It is the row you take on our word.
            </p>
            <p>
              <Link href="/code#shapes" className={LINK}>
                What the server receives and returns is on the Code page.
              </Link>
            </p>
          </div>
        </footer>
      </StatusLive>
    </Shell>
  );
}
