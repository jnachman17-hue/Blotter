import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SCRIPT_VERSION } from "@/app/api/script/manifest";
import { CheckYourCopy } from "@/app/code/check-your-copy";
import { B, LINK, Shell } from "@/app/setup/shared";
import { AUDIT_PROMPT } from "@/lib/audit-prompt";
import { FINDINGS } from "@/lib/findings";

import { CopyAudit } from "./copy-audit";
import { DataMap } from "./data-map";
import { WhatWeHoldNow } from "./what-we-hold-now";

/**
 * See exactly what happens to your data.
 *
 * ## What this page is, and what it is not
 *
 * It is not an audit centre, a security page or a privacy FAQ. Two of those
 * were built on 5 September 2026 and Jon's verdict on the second was that he
 * built the system and could not follow the page. Both made the student into
 * an auditor. This one is a guided walk through one run, and every time data
 * crosses a boundary the reader gets the best evidence there is for that
 * boundary rather than a sentence from us.
 *
 * ## The four questions, and the evidence for each
 *
 *   What can Google let it touch?    Google's own permission screen.
 *   What does the script read?       One still picture of a run.
 *   What leaves my account?          The package, listed, with what is not in it.
 *   What happens after?              What our database holds, live, and the
 *                                    honest limit of that evidence.
 *
 * Then the checks, for the reader who wants them: paste your copy, or hand the
 * whole thing to any AI. Then three times we were wrong. Then three doors out,
 * one of which is "no".
 *
 * ## The rules
 *
 * Nothing on this page asks the reader to understand code, a scope name, a
 * fingerprint or a table. The technical pages still exist and are one link
 * away at the bottom. No number is typed where a module can produce it. The
 * AI reviews are never called audits. The page never claims the server can be
 * proven from the code.
 */
export const metadata: Metadata = {
  title: "See exactly what happens to your data | Blotter",
  description:
    "Blotter can read parts of your Gmail and Calendar. Here is what actually happens when it runs, what leaves your account, what our server holds right now, and how to check any of it yourself.",
  alternates: { canonical: "/audit" },
};

/* The live panel reads the database as the page loads. */
export const dynamic = "force-dynamic";

const PROSE = "max-w-[64ch] space-y-4 text-body leading-[1.65] text-ink-read";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display scroll-mt-8 text-[1.5rem] leading-[1.2] font-bold tracking-[-0.015em] text-ink"
    >
      {children}
    </h2>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule pt-10">
      <H2 id={id}>{title}</H2>
      {children}
    </section>
  );
}

/** The three findings the page tells as a story. Everything else is a link away. */
const STORY = ["1.1", "2.4", "3.1"];

export default async function YourDataPage() {
  const [script, manifest] = await Promise.all([
    readFile(path.join(process.cwd(), "public", "Code.gs"), "utf8"),
    readFile(path.join(process.cwd(), "public", "appsscript.json"), "utf8"),
  ]);
  const story = STORY.map((id) => FINDINGS.find((f) => f.id === id)).filter(
    (f): f is NonNullable<typeof f> => Boolean(f),
  );

  return (
    <Shell here="/audit">
      {/* ------------------------------------------------------ the question */}
      <h1 className="font-display max-w-[20ch] text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-h2">
        Blotter can read parts of your Gmail and Calendar.
      </h1>
      <p className="mt-6 max-w-[58ch] text-lede leading-[1.7] text-ink-read">
        That is the uncomfortable part, so it goes first. This page shows what actually
        happens when it runs, what leaves your account, what our server holds right now, and
        how to check any of it without taking our word.
      </p>

      <div className="mt-14 space-y-16">
        {/* ------------------------------------------------ the picture */}
        <Section id="run" title="What happens when it runs">
          <p className={`${PROSE} mt-4`}>
            A script inside your own copy of the sheet looks for conversations with the
            people in your Contacts tab. It reads who wrote, who received, when, and the
            subject line. It never reads the text. It sends those facts to our server, gets
            back one status per contact, and writes it into the sheet.
          </p>
          <DataMap />
        </Section>

        {/* ------------------------------------------------ Google's screen */}
        <Section id="google" title="What Google lets it touch">
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <figure>
              <div className="overflow-hidden rounded-lg border border-rule bg-white">
                <Image
                  src="/setup/permissions.png"
                  alt="Google's permission screen for Blotter, listing five permissions: view your email messages and settings; view and manage spreadsheets that this application has been installed in; see and download any calendar you can access; connect to an external service; allow this application to run when you are not present."
                  width={489}
                  height={598}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-micro text-ink-muted">
                The real screen, as Google shows it. Not a mock-up.
              </figcaption>
            </figure>
            <div className={PROSE}>
              <p>Google says it in Google&rsquo;s words. In plain ones, the five are:</p>
              <ul className="space-y-2 pl-5">
                <li className="list-disc">Read your Gmail.</li>
                <li className="list-disc">Read your Calendar.</li>
                <li className="list-disc">Use this one spreadsheet, and no other file.</li>
                <li className="list-disc">Reach Blotter&rsquo;s server.</li>
                <li className="list-disc">Run while you are away, every 15 minutes.</li>
              </ul>
              <p>
                None of them lets it send mail, change a calendar, or open anything else in
                your Drive. Google decides what it may touch. The code decides what it does
                with that, and the code is what the rest of this page is about.
              </p>
              <p>
                You can see the same list for your own account at any time at{" "}
                <a href="https://myaccount.google.com/permissions" className={LINK}>
                  myaccount.google.com/permissions
                </a>
                , and remove it there in one click.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <figure className="max-w-[420px]">
              <div className="overflow-hidden rounded-lg border border-rule bg-white">
                <Image
                  src="/setup/warning.png"
                  alt="Google's warning: Google hasn't verified this app. The app is requesting access to sensitive info in your Google Account. Until the developer verifies this app with Google, you shouldn't use it. Links: Advanced, Back to safety."
                  width={525}
                  height={259}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-micro text-ink-muted">
                On a personal Gmail account, this comes first. A university account does not see it.
              </figcaption>
            </figure>
            <div className={PROSE}>
              <p>
                <B>The warning you will see.</B> Google requires a paid outside security
                assessment, renewed every year, before it will call an app that reads Gmail
                verified. Blotter is a free tool made by a student and has not paid for it yet.
                So Google shows this screen, with your own email address in it, because the
                copy of the script is in your account. It does not change what the app is
                allowed to do. That is fixed by the permissions on the next screen, the ones
                above.
              </p>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------ the package */}
        <Section id="package" title="What leaves your account">
          <p className={`${PROSE} mt-4`}>
            This is the whole package, every run. It goes to blotterib.com and nowhere else.
          </p>
          <div className="mt-6 grid max-w-[68ch] gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-rule bg-white p-5">
              <p className="text-small font-semibold text-ink">In the package</p>
              <ul className="mt-3 space-y-3 text-small leading-[1.55] text-ink-read">
                <li>
                  <B>For each email in a conversation with one of your contacts:</B> who wrote
                  it, everyone it went to, when, and the subject line. Everyone in the
                  conversation, including anyone copied in.
                </li>
                <li>
                  <B>For a matching calendar event:</B> the title, the times, who was invited,
                  who declined, and who set it up.
                </li>
                <li>
                  <B>From your sheet:</B> each contact&rsquo;s name, firm and email, and whether
                  you ticked Closed. Your own email addresses, so it can tell your messages
                  from theirs. Addresses you said no to on the Found tab. A random number
                  that identifies the sheet.
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-dashed border-ink-muted bg-white p-5">
              <p className="text-small font-semibold text-ink">Not in the package</p>
              <ul className="mt-3 space-y-3 text-small leading-[1.55] text-ink-read">
                <li>The text of any email.</li>
                <li>Attachments.</li>
                <li>Your password, or any login for your Google account.</li>
                <li>Any conversation that does not involve one of your contacts.</li>
                <li>Anything from your calendar that does not match a contact.</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 max-w-[68ch] text-small leading-[1.6] text-ink-muted">
            The exact field-by-field version is on{" "}
            <Link href="/code#shapes" className={LINK}>
              the technical page
            </Link>
            , and an automated check fails if the server ever accepts a field that is not
            listed there.
          </p>
        </Section>

        {/* ------------------------------------------------ the exception */}
        <Section id="exception" title="The one exception">
          <div className={`${PROSE} mt-4`}>
            <p>
              When an email you sent cannot be delivered, Google&rsquo;s mail system sends you
              an automatic notice. That notice is the one email Blotter opens. It reads it to
              find the address that bounced, so the row can say <B>Bounced</B> instead of
              leaving you waiting on a reply that will never come.
            </p>
            <p>
              Only the addresses it finds in the notice are sent. The rest of the notice stays
              in your account. We say this here rather than leave it for someone to find,
              because a page that shows only the good news is the kind of page you should not
              trust.
            </p>
          </div>
        </Section>

        {/* ------------------------------------------------ check it */}
        <Section id="check" title="Check it yourself">
          <div className={`${PROSE} mt-4`}>
            <p>
              The code that does all of the above is in your own sheet, under{" "}
              <B>Extensions</B> then <B>Apps Script</B>. Nothing changes it but you. Paste it
              here and your browser checks it against the version we publish, without sending
              it anywhere.
            </p>
          </div>
          <CheckYourCopy version={SCRIPT_VERSION} embedded={script} />

          <div className="mt-12 max-w-[64ch] border-t border-rule pt-8">
            <p className="text-body font-semibold text-ink">Want a second opinion?</p>
            <p className={`${PROSE} mt-2`}>
              One button copies the code, Google&rsquo;s permission file, every claim this site
              makes, and a question that asks an AI to attack all of it. Paste it into ChatGPT,
              Claude or Gemini and read what comes back. It will tell you what leaves your
              account and whether we described it honestly. It cannot tell you what our
              server does afterwards, and a good one will say so.
            </p>
            <CopyAudit
              script={script}
              manifest={manifest}
              version={SCRIPT_VERSION}
              label="Copy it all for ChatGPT, Claude or Gemini"
            />
            <details className="mt-4 max-w-[64ch]">
              <summary className="cursor-pointer text-small font-medium text-navy-500 underline underline-offset-4">
                Read the question it copies
              </summary>
              <blockquote className="mt-3 border-l-2 border-blotter-400 bg-white py-4 pr-5 pl-5 text-small leading-[1.65] whitespace-pre-line text-ink-read">
                {AUDIT_PROMPT}
              </blockquote>
            </details>
          </div>
        </Section>

        {/* ------------------------------------------------ the limit */}
        <Section id="limit" title="The one thing you cannot check from the code">
          <div className={`${PROSE} mt-4`}>
            <p>
              The code shows what leaves your account and where it goes. It cannot show what
              our server does once the package arrives. No code you can read proves what a
              server keeps. That part is our word, and the next section is the closest thing
              to evidence we can give you for it.
            </p>
          </div>
        </Section>

        {/* ------------------------------------------------ live */}
        <Section id="holds" title="What our server holds right now">
          <WhatWeHoldNow />
        </Section>

        {/* ------------------------------------------------ we were wrong */}
        <Section id="wrong" title="Three times we were wrong">
          <div className={`${PROSE} mt-4`}>
            <p>
              We gave the code to reviewers, most of them AI, and told them to attack it. They
              found things. Here are three, with what we changed. A perfect record would be
              the thing to worry about.
            </p>
          </div>
          <ol className="mt-6 max-w-[64ch] divide-y divide-rule border-y border-rule">
            {story.map((f) => (
              <li key={f.id} className="py-5">
                <p className="font-mono text-micro text-ink-muted">
                  Version {f.version}
                </p>
                <p className="mt-1 text-body leading-[1.55] font-semibold text-ink">{f.title}</p>
                <p className="mt-2 text-small leading-[1.6] text-ink-read">{f.detail}</p>
                <p className="mt-2 text-small leading-[1.6] text-ink-muted">
                  <span className="font-semibold text-ink">Fixed. </span>
                  {f.done}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-[64ch] text-small leading-[1.6] text-ink-muted">
            <Link href="/findings" className={LINK}>
              Every finding
            </Link>
            , including the ones that were wrong and the ones we chose to leave as they are.
          </p>
        </Section>

        {/* ------------------------------------------------ three doors */}
        <Section id="next" title="What now">
          <div className="mt-6 grid max-w-[68ch] gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-rule bg-white p-5">
              <p className="text-body font-semibold text-ink">Use Blotter</p>
              <p className="mt-2 text-small leading-[1.55] text-ink-muted">
                Setup takes about three minutes.
              </p>
              <Link href="/setup" className={`mt-4 inline-block text-small ${LINK}`}>
                Set up
              </Link>
            </div>
            <div className="rounded-lg border border-rule bg-white p-5">
              <p className="text-body font-semibold text-ink">Look closer</p>
              <p className="mt-2 text-small leading-[1.55] text-ink-muted">
                The whole script, every field the server receives and returns, every table
                we hold, every finding.
              </p>
              <Link href="/code" className={`mt-4 inline-block text-small ${LINK}`}>
                Technical details
              </Link>
            </div>
            <div className="rounded-lg border border-rule bg-white p-5">
              <p className="text-body font-semibold text-ink">Don&rsquo;t give it access</p>
              <p className="mt-2 text-small leading-[1.55] text-ink-muted">
                That is a fair answer. If something here was missing or unclear, we would
                rather hear it.
              </p>
              <Link href="/contact" className={`mt-4 inline-block text-small ${LINK}`}>
                Tell us
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </Shell>
  );
}
