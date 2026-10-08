"use client";

import { useState } from "react";

import { FINDINGS, ROUNDS, type Finding, type Verdict } from "@/lib/findings";

/**
 * The log itself: filter chips and every finding, grouped by round.
 *
 * Client state only. The filter is a reading aid, not a location, so it does
 * not touch the URL; the anchors `#f-{id}` are the citable part, and they
 * exist whatever the filter says.
 *
 * Everything printed here is `FINDINGS` and `ROUNDS` as written. Nothing is
 * shortened. A finding that was wrong reads the same as one that was fixed,
 * apart from the chip, because that is the rule the file was written under.
 */

type Filter = "all" | Verdict;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "code", label: "Fixed in code" },
  { key: "copy", label: "Fixed in wording" },
  { key: "kept", label: "True and kept" },
  { key: "wrong", label: "Wrong" },
];

/* The chip tokens are the sheet's own status colours, so a verdict reads the
   way a status does: green for done, blue for answered, amber for a thing to
   know about, grey for nothing to act on. */
const VERDICT: Record<Verdict, { label: string; chip: string }> = {
  code: { label: "Fixed in code", chip: "bg-chip-completed-bg text-chip-completed-fg" },
  copy: { label: "Fixed in wording", chip: "bg-chip-replied-bg text-chip-replied-fg" },
  kept: { label: "True, kept", chip: "bg-chip-noreply-bg text-chip-noreply-fg" },
  wrong: { label: "Wrong", chip: "bg-chip-sent-bg text-chip-sent-fg" },
};

export function VerdictChip({ verdict }: { verdict: Verdict }) {
  const v = VERDICT[verdict];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-micro font-medium leading-[1.6] ${v.chip}`}
    >
      {v.label}
    </span>
  );
}

function FindingRow({ f }: { f: Finding }) {
  return (
    <article
      id={`f-${f.id}`}
      className="grid scroll-mt-8 grid-cols-[3rem_minmax(0,1fr)] gap-x-3 border-b border-rule py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4"
    >
      <a
        href={`#f-${f.id}`}
        className="font-mono text-small leading-[1.6] text-blotter-700 tabular-nums no-underline hover:underline hover:underline-offset-4"
        aria-label={`Finding ${f.id}`}
      >
        {f.id}
      </a>
      <div className="min-w-0 max-w-[64ch]">
        <h3 className="text-body leading-[1.5] font-semibold text-ink">{f.title}</h3>
        <p className="mt-2 text-body leading-[1.6] text-ink-muted">{f.detail}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <VerdictChip verdict={f.verdict} />
          {f.version ? (
            <span className="font-mono text-micro leading-[1.6] text-ink-muted">
              Version {f.version}
            </span>
          ) : null}
          <span className="text-micro leading-[1.6] text-ink-muted">Raised by {f.raisedBy}</span>
        </div>
        <p className="mt-2.5 text-small leading-[1.6] text-ink-read">{f.done}</p>
      </div>
    </article>
  );
}

export function FindingsLog() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? FINDINGS : FINDINGS.filter((f) => f.verdict === filter);
  const rounds = ROUNDS.map((r) => ({
    round: r,
    findings: shown.filter((f) => f.round === r.n),
  })).filter((g) => g.findings.length > 0);

  return (
    <div>
      <div role="group" aria-label="Show findings by verdict" className="flex flex-wrap gap-2">
        {FILTERS.map((opt) => {
          const on = filter === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(opt.key)}
              className={
                on
                  ? "inline-flex min-h-9 items-center rounded-full bg-navy-900 px-4 text-small font-medium text-white"
                  : "inline-flex min-h-9 items-center rounded-full border border-rule bg-white px-4 text-small font-medium text-ink-read transition-colors duration-150 ease-out hover:border-ink-faint hover:text-ink"
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 font-mono text-micro leading-[1.6] text-ink-muted tabular-nums">
        Showing {shown.length} of {FINDINGS.length}
      </p>

      <div className="mt-8 space-y-14">
        {rounds.map(({ round, findings }) => (
          <section key={round.n} aria-labelledby={`round-${round.n}`}>
            <h2
              id={`round-${round.n}`}
              className="font-display flex flex-wrap items-baseline gap-x-3 text-[1.4rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink"
            >
              <span className="font-mono text-small font-normal text-ink-faint tabular-nums">
                Round {round.n}
              </span>
              <span>
                {round.when}
                <span className="mx-2 font-normal text-ink-faint">·</span>
                {round.who}
              </span>
            </h2>
            <p className="mt-3 max-w-[64ch] text-body leading-[1.6] text-ink-muted">{round.note}</p>
            <div className="mt-6 border-t border-rule">
              {findings.map((f) => (
                <FindingRow key={f.id} f={f} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
