import type { Metadata } from "next";
import Link from "next/link";

import { LINK, Shell } from "@/app/setup/shared";
import { CONTACT_EMAIL } from "@/lib/contact";
import { FINDINGS, reviewCount, reviewDay, tally } from "@/lib/findings";

import { FindingsLog } from "./log";

/**
 * The public audit log, rendered.
 *
 * Every figure on this page is computed from `lib/findings.ts`: the four
 * numbers in the figures row come from `tally()`, the version span and the
 * date come from the entries themselves. Nothing here is typed, so the page
 * cannot say a number the log does not.
 *
 * The rule the log was written under is the rule this page keeps: nothing is
 * removed, a wrong finding stays with the reason, and a finding that was true
 * and left alone stays with the reason. The reader is entitled to disagree
 * with either kind, and can only do that if it is printed.
 */
export const metadata: Metadata = {
  title: "What reviews have found | Blotter",
  description:
    "Every review of the Blotter script so far and every finding, including the ones that were wrong and the ones that were true and left alone.",
  alternates: { canonical: "/findings" },
};

const PROSE = "max-w-[64ch] space-y-4 text-body leading-[1.65] text-ink-muted";

/** "4.10" after "4.8", not before it. */
function bySegment(a: string, b: string) {
  const as = a.split(".").map(Number);
  const bs = b.split(".").map(Number);
  for (let i = 0; i < Math.max(as.length, bs.length); i++) {
    const d = (as[i] ?? 0) - (bs[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** The versions the findings shipped in, from the entries, as "4.5 to 4.8". */
function versionSpan() {
  const versions = Array.from(
    new Set(FINDINGS.flatMap((f) => (f.version ? [f.version] : []))),
  ).sort(bySegment);
  if (versions.length === 0) return null;
  if (versions.length === 1) return `version ${versions[0]}`;
  return `versions ${versions[0]} to ${versions[versions.length - 1]}`;
}

function Figures() {
  const t = tally();
  const cells = [
    { n: t.raised, label: "findings" },
    { n: t.trueAndFixed, label: "true and fixed" },
    { n: t.kept, label: "true and kept" },
    { n: t.wrong, label: "wrong" },
  ];
  return (
    <dl className="grid max-w-[64ch] grid-cols-2 border-y border-rule sm:grid-cols-4">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={`flex flex-col-reverse py-4 ${i % 2 === 1 ? "border-l border-rule pl-5" : "pr-5"} ${
            i > 0 ? "sm:border-l sm:border-rule sm:pl-5" : ""
          } ${i >= 2 ? "border-t border-rule sm:border-t-0" : ""}`}
        >
          <dt className="mt-1.5 text-micro leading-[1.5] text-ink-muted">{c.label}</dt>
          <dd className="font-display text-[26px] leading-none font-bold tracking-[-0.02em] text-ink tabular-nums">
            {c.n}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Each standing limit points at the audit row it sits beside. */
const LIMITS: { text: string; href: string; where: string }[] = [
  {
    text: "The Gmail permission is your whole mailbox. No narrower one allows searching.",
    href: "/audit#package",
    where: "Row 2.3",
  },
  {
    text: "Whole conversations are read, so anyone copied in has their name, address and the subject line read too.",
    href: "/audit#package",
    where: "Row 2.3",
  },
  {
    text: "Subject lines reach our server.",
    href: "/audit#package",
    where: "Row 2.3",
  },
  {
    text: "The text of the Start here tab can be rewritten from our side.",
    href: "/audit#limit",
    where: "Section 05",
  },
  {
    text: "Nobody has paid for an audit. The reviews are ours and whoever reads the code next, and Google has not verified the app.",
    href: "/audit#limit",
    where: "Section 05",
  },
  {
    text: "What the server does cannot be proved from the code.",
    href: "/audit#holds",
    where: "Row 2.5",
  },
];

export default function FindingsPage() {
  const span = versionSpan();
  const day = reviewDay();

  return (
    <Shell here="/findings">
      <h1 className="font-display text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-h2">
        What reviews have found
      </h1>

      <div className="mt-6 max-w-[58ch] space-y-4 text-lede leading-[1.7] text-ink-read">
        <p>
          Every review of the script so far and every finding, including the ones that were
          wrong and the ones that were true and left alone. Nothing is removed. A wrong
          finding stays with the reason, because it will be raised again.
        </p>
      </div>

      <div className="mt-10">
        <Figures />
        <p className="mt-3 font-mono text-micro leading-[1.6] text-ink-muted">
          {reviewCount()} reviews
          <span className="mx-2 text-ink-faint">·</span>
          {day.label}
          {span ? (
            <>
              <span className="mx-2 text-ink-faint">·</span>
              {span}
              {day.sameDay ? " in one day" : ""}
            </>
          ) : null}
        </p>
      </div>

      {/* ------------------------------------------------------ the log */}
      <section className="mt-16 border-t border-rule pt-10">
        <FindingsLog />
      </section>

      {/* ------------------------------------------------ standing limits */}
      <section id="limits" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
        <h2 className="font-display text-[1.4rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink">
          Standing limits
        </h2>
        <div className={`${PROSE} mt-4`}>
          <p>
            A careful review will find these. Each is how it works rather than a bug, and each
            is on the audit page beside the claim it limits.
          </p>
        </div>
        <ol className="mt-6 max-w-[64ch] border-t border-rule">
          {LIMITS.map((l, i) => (
            <li
              key={l.text}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 border-b border-rule py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4"
            >
              <span className="font-mono text-small leading-[1.6] text-blotter-700 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body leading-[1.6] text-ink">
                {l.text}{" "}
                <Link href={l.href} className={`whitespace-nowrap font-mono text-small ${LINK}`}>
                  {l.where}
                </Link>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------- foot */}
      <section className="mt-16 border-t border-rule pt-10">
        <div className={PROSE}>
          <p>
            Found something? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>{" "}
            or use{" "}
            <Link href="/contact" className={LINK}>
              the contact form
            </Link>
            . It goes in here either way.
          </p>
          <p>
            New here?{" "}
            <Link href="/audit" className={LINK}>
              Start with the audit page.
            </Link>
          </p>
        </div>
      </section>
    </Shell>
  );
}
