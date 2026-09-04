import type { Metadata } from "next";
import Link from "next/link";

import { B, H1, Shell, WhatItSees } from "./shared";
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

function Choice({
  href,
  title,
  line,
  steps,
  recommended,
}: {
  href: string;
  title: string;
  line: string;
  steps: string;
  recommended?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col justify-between rounded-[10px] border-2 bg-white px-6 py-7 transition-colors duration-150 ease-out sm:px-8 sm:py-8",
        recommended ? "border-navy-500 hover:border-navy-900" : "border-rule hover:border-navy-900",
      )}
    >
      <div>
        <p className="font-display text-[1.5rem] leading-[1.15] font-bold tracking-[-0.015em] text-ink">
          {title}
        </p>
        <p className="mt-2.5 text-lede leading-[1.5] text-ink-read">{line}</p>
        <p className="mt-4 text-body font-medium text-ink-muted">{steps}</p>
      </div>

      {/*
        The badge sits BESIDE the button, not above the title. Putting it at the
        top pushed this card's heading down and left it out of line with the one
        next to it, which Jon saw immediately. Here it fills space that was
        empty and both headings and both buttons stay level.
      */}
      <div className="mt-8 flex items-center gap-4">
        <span className="inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 text-body font-medium text-white transition-colors duration-150 ease-out group-hover:bg-navy-700">
          Set up →
        </span>
        {recommended && (
          <span className="text-small font-medium text-navy-500">Simpler setup</span>
        )}
      </div>
    </Link>
  );
}

export default function SetupChooser() {
  return (
    <Shell wide>
      <H1>Set up Blotter</H1>

      {/*
        One line, and the instruction carries the weight. It was three
        paragraphs and a jump link, which is what Jon met the page with:
        *"I'm immediately hit with three paragraphs of text."* Then, once it
        was one line, it was too quiet: *"That's not just a preference."*

        He is right. Which account you choose is not taste, it is whether the
        product works. Blotter reads the mailbox it is installed in and no
        other, so somebody who picks the account their recruiting mail is not
        in gets a tracker that finds nothing and concludes it is broken. So the
        instruction is set in ink at reading size, the consequence is stated
        immediately after it, and the timing note drops to the end where it
        belongs.
      */}
      <p className="mt-5 max-w-[64ch] text-[1.1875rem] leading-[1.5] text-ink">
        <B>Choose the account your recruiting email actually arrives in.</B>{" "}
        <span className="text-ink-read">
          Blotter reads that inbox and no other. Setup takes two minutes.
        </span>
      </p>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Choice
          href="/setup/university"
          title="University account"
          line="A .edu address that runs on Google."
          steps="Four steps, no warnings."
          recommended
        />
        <Choice
          href="/setup/personal"
          title="Personal Gmail"
          line="Any @gmail.com address."
          steps="Five steps. One is a warning screen, explained inside."
        />
      </div>

      <p className="mt-6 max-w-[70ch] text-body leading-[1.6] text-ink-muted">
        <B>Recruit from a university address? Use it.</B> Google takes those accounts straight
        through. A personal account meets one extra screen that looks alarming and is not.
      </p>

      <WhatItSees />
    </Shell>
  );
}