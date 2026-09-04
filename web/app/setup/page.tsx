import type { Metadata } from "next";
import Link from "next/link";

import { B, H1, H2, LINK, PROSE, Shell, WhatItSees } from "./shared";

/**
 * The chooser.
 *
 * One question, because the answer changes the install. A Workspace account
 * (`.edu`) gets the ordinary consent screen; a personal Gmail account gets
 * Google's unverified-app warning first. Verified on a real university account
 * on 3 September 2026.
 *
 * Jon's ruling: people who recruit from a university address should not see
 * the scary material at all. So two flows, and this page only chooses.
 */
export const metadata: Metadata = {
  title: "Set up Blotter | Blotter",
  description:
    "Copy one sheet, give it permission to connect to your Google account, and your recruiting tracker keeps itself up to date.",
};

function Choice({ href, title, line }: { href: string; title: string; line: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-[10px] border-2 border-rule bg-white px-6 py-6 transition-colors duration-150 ease-out hover:border-navy-900 sm:px-7 sm:py-7"
    >
      <div>
        <p className="font-display text-[1.35rem] leading-[1.2] font-bold tracking-[-0.015em] text-ink">
          {title}
        </p>
        <p className="mt-3 text-lede leading-[1.55] text-ink-read">{line}</p>
      </div>
      <span className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full bg-navy-900 px-6 text-body font-medium text-white transition-colors duration-150 ease-out group-hover:bg-navy-700">
        Set up →
      </span>
    </Link>
  );
}

export default function SetupChooser() {
  return (
    <Shell>
      <H1>Set up Blotter</H1>

      <div className={`mt-6 space-y-4 ${PROSE}`}>
        <p>
          You copy one spreadsheet into your Google Drive and give it permission to connect to
          your Google account. From then on it tracks your recruiting conversations and keeps
          the tracker current.
        </p>
        <p>Setup takes two minutes, one time.</p>
      </div>

      <p className="mt-6">
        <a href="#choose" className={`text-body ${LINK}`}>
          Skip to setup ↓
        </a>
      </p>

      <WhatItSees />

      <section className="mt-16">
        <H2 id="choose">Where is your recruiting email?</H2>
        <div className={`mt-4 space-y-4 ${PROSE}`}>
          <p>
            Blotter reads the mailbox of the account you recruit from, so install it where
            your recruiting email actually arrives.
          </p>
          <p>
            <B>The setup is different for a university account and a personal one.</B> Pick
            the one you use.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <Choice
            href="/setup/university"
            title="University account"
            line="A .edu address that runs on Google."
          />
          <Choice
            href="/setup/personal"
            title="Personal Gmail account"
            line="One extra step, and it is explained in there."
          />
        </div>
      </section>
    </Shell>
  );
}
