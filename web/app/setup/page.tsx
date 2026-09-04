import type { Metadata } from "next";
import Link from "next/link";

import { B, H1, H2, PROSE, Shell, WhatItSees } from "./shared";
import { cn } from "@/lib/cn";

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

function Choice({ href, title, line, recommended }: { href: string; title: string; line: string; recommended?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col justify-between rounded-[10px] border-2 bg-white px-6 py-6 transition-colors duration-150 ease-out sm:px-7 sm:py-7",
        recommended
          ? "border-navy-500 hover:border-navy-900"
          : "border-rule hover:border-navy-900",
      )}
    >
      <div>
        {recommended && (
          /* blotter-100 on blotter-700: the site's own accent, and the only
             pair here that is not navy, so the badge reads as a mark rather
             than as another button. navy-50 and navy-700 do not exist in
             globals.css and rendered as nothing. */
          <p className="mb-3 inline-flex items-center rounded-full bg-blotter-100 px-3 py-1 text-small font-medium text-blotter-700">
            Simpler setup
          </p>
        )}
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

      {/*
        The choice sits above "What Blotter can actually see" from 5 September
        2026, on Jon's ruling. It is the action, and it was underneath a screen
        of privacy detail: a reader had to scroll past a wall of reassurance
        before they could do anything, which makes a two-minute setup read as a
        decision that needs research. Choice first, detail underneath for
        whoever wants it.
      */}
      <section className="mt-12">
        <H2 id="choose">Where is your recruiting email?</H2>
        <div className={`mt-4 space-y-4 ${PROSE}`}>
          <p>
            Blotter reads the mailbox of the account you recruit from, so install it where
            your recruiting email actually arrives.
          </p>
          <p>
            {/*
              Honest rather than a flat preference. The choice is about which
              mailbox holds the mail, and telling somebody to use a university
              account their recruiting email is not in would break their
              install. So the nudge is conditional, and it names the real
              reason rather than just asserting one is better.
            */}
            <B>If you recruit from a university address, use that one.</B> Google recognises
            university accounts and takes you straight through. A personal Gmail account gets
            one extra screen that looks alarming and is not.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <Choice
            href="/setup/university"
            title="University account"
            line="A .edu address that runs on Google. Four steps, no warnings."
            recommended
          />
          <Choice
            href="/setup/personal"
            title="Personal Gmail account"
            line="Five steps. One is a warning screen, explained in there."
          />
        </div>
      </section>

      <WhatItSees />

    </Shell>
  );
}
