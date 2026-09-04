import type { Metadata } from "next";
import Link from "next/link";

import { B, LINK, Shell, WhatItSees } from "./shared";

/**
 * The chooser.
 *
 * One question, because the answer changes the install materially. A Workspace
 * account (`.edu`) gets the ordinary consent screen; a personal Gmail account
 * gets Google's full unverified-app warning first. Verified on a real
 * university account on 3 September 2026.
 *
 * Jon's ruling: *"people who recruit from university don't even need to see all
 * the scary stuff."* So it is two flows rather than one page hedging with "if
 * you see this" — the hedge is what made the previous version read as difficult.
 */
export const metadata: Metadata = {
  title: "Set up Blotter | Blotter",
  description:
    "Copy one sheet, give it permission, and your recruiting tracker keeps itself up to date. About five minutes.",
  robots: { index: false, follow: false },
};

function Choice({
  href,
  kicker,
  title,
  note,
}: {
  href: string;
  kicker: string;
  title: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[6px] border border-rule bg-white px-7 py-6 transition-colors duration-150 ease-out hover:border-navy-500"
    >
      <p className="font-mono text-small text-ink-faint">{kicker}</p>
      <p className="font-display mt-2 text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
        {title}
      </p>
      <p className="mt-3 text-body leading-[1.6] text-ink-muted">{note}</p>
      <p className="mt-4 text-small font-medium text-navy-500 group-hover:text-navy-900">
        Start here →
      </p>
    </Link>
  );
}

export default function SetupChooser() {
  return (
    <Shell>
      <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Set up Blotter
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          You copy one spreadsheet into your own Google Drive and give it permission to look at
          your email. From then on it follows your recruiting conversations and keeps the
          tracker current — who replied, who went quiet, who you owe a follow-up.
        </p>
        <p>Five minutes, once.</p>
      </div>

      <WhatItSees />

      <section className="mt-14">
        <h2 className="font-display text-[1.35rem] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
          Which account is your recruiting email in?
        </h2>
        <p className="mt-3 max-w-[68ch] text-body leading-[1.65] text-ink-muted">
          Blotter reads the mailbox of the account you install it in, so install it where your
          recruiting email actually arrives. The two set-ups differ by one screen, and it is
          worth picking the right one.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Choice
            href="/setup/university"
            kicker="Recommended if you have one"
            title="My university account"
            note="A .edu address that runs on Google. The shorter path — Google recognises your university and takes you straight to the permission list."
          />
          <Choice
            href="/setup/personal"
            kicker="@gmail.com"
            title="My personal Gmail account"
            note="One extra screen, and it looks a great deal more alarming than it is. We explain exactly what it means and why it appears."
          />
        </div>

        <p className="mt-7 max-w-[68ch] text-small leading-[1.55] text-ink-faint">
          <B>Not sure?</B> Open the inbox where replies from bankers land, and look at the
          address you are signed in as. That is the one. If you send from a university address
          but read it in Gmail, choose Gmail — Blotter follows the mailbox, not the address on
          the envelope. And if you genuinely use both, pick the busier one; you can list your
          other addresses later so Blotter still recognises them.
        </p>
      </section>

      <p className="mt-14 text-small leading-[1.5] text-ink-faint">
        Stuck at any point, email us — the address is at the bottom of{" "}
        <Link href="/setup/university" className={LINK}>
          either
        </Link>{" "}
        <Link href="/setup/personal" className={LINK}>
          set-up page
        </Link>
        .
      </p>
    </Shell>
  );
}
