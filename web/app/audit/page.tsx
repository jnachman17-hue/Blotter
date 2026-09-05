import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";

import { SCRIPT_VERSION } from "@/app/api/script/manifest";
import { B, LINK, Shell } from "@/app/setup/shared";
import { ReceiptStub } from "@/components/receipt-stub";
import { AUDIT_PROMPT } from "@/lib/audit-prompt";
import { CONTACT_EMAIL } from "@/lib/contact";
import { reviewCount, reviewDay, tally, versionSpan } from "@/lib/findings";
import { countWord, formTableCount } from "@/lib/what-we-hold";

import { CopyAudit } from "./copy-audit";
import { RunStage } from "./run-stage";

/**
 * The page that asks strangers to check the code rather than believe the site.
 *
 * ## Why it exists
 *
 * Blotter went to r/UTAustin on 5 September 2026 and the first substantive
 * comment was a security objection. Jon answered it the only way that works: he
 * pasted the published script into ChatGPT and asked whether the code matched
 * the site. It found a real fault. Every review since, and every finding, is
 * in `lib/findings.ts` and on `/findings`.
 *
 * ## The shape, and where it came from
 *
 * The first two drafts were prose. Jon: *"so much on there, so hard to read…
 * make the sequence of it like a human."* Four independent designs were judged
 * by three readers with different worries, and this is the synthesis
 * (`38-AUDIT-FINDINGS.md` has the round; the spec is in the session's
 * scratchpad). Its spine: every limit is printed beside the claim it limits,
 * and the server is a dashed box with nothing drawn inside it.
 *
 *   01  One run, drawn. The mechanism, as a film the reader chooses to play.
 *   02  What we say, and how to check it. Five claims, each with a CHECK IT
 *       line and a CAN'T SHOW line. The standing limits live here, beside the
 *       claims they limit, rather than in a list at the end.
 *   03  The question to ask. The prompt, verbatim, and the one button.
 *   04  What reviews have found. Figures from `tally()`, never typed.
 *   05  Where checking ends. A rule across the page: above it, checkable;
 *       below it, our word. Including how to leave.
 *
 * ## The rules the copy is under
 *
 * Do not claim the audit proves more than it does. Do not draw or caption the
 * inside of the server. Do not rewrite the prompt; print `AUDIT_PROMPT` and
 * copy the same string. Do not type a number that a module can generate. No
 * conversion button on this page: a trust page that ends in "set it up" is the
 * thing a sceptic screenshots.
 */
export const metadata: Metadata = {
  title: "Check the code yourself | Blotter",
  description:
    "Blotter reads your Gmail. This page shows what the code does with it, one run at a time, and beside each thing we say, how to check it without trusting us.",
  alternates: { canonical: "/audit" },
};

const PROSE = "max-w-[64ch] space-y-4 text-body leading-[1.65] text-ink-muted";

function H2({ n, id, children }: { n: string; id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex scroll-mt-6 items-baseline gap-4">
      <span className="font-mono text-small tabular-nums text-blotter-700">{n}</span>
      <h2 className="font-display text-[1.4rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink">
        {children}
      </h2>
    </div>
  );
}

/** The row anatomy: claim, CHECK IT, CAN'T SHOW. Not a table, not a card. */
function ClaimRow({
  id,
  n,
  claim,
  check,
  cannot,
}: {
  id: string;
  n: string;
  claim: React.ReactNode;
  check: React.ReactNode;
  cannot: React.ReactNode;
}) {
  return (
    <li id={id} className="scroll-mt-6 border-t border-rule py-5">
      <div className="flex gap-4">
        <span className="font-mono text-small tabular-nums text-blotter-700">{n}</span>
        <p className="max-w-[64ch] text-body leading-[1.55] font-semibold text-ink">{claim}</p>
      </div>
      {/* Side by side on a desktop, so the check and its limit are read as a
          pair and the row is half the height; stacked on a phone. */}
      <dl className="mt-3 grid gap-x-8 gap-y-4 sm:pl-[2.4rem] md:grid-cols-2">
        <div>
          <dt className="text-micro font-semibold tracking-[0.06em] text-ink-muted uppercase">Check it</dt>
          <dd className="mt-1 text-small leading-[1.6] text-ink-read">{check}</dd>
        </div>
        <div>
          <dt className="text-micro font-semibold tracking-[0.06em] text-blotter-700 uppercase">Can&rsquo;t show</dt>
          <dd className="mt-1 text-small leading-[1.6] text-ink-muted">{cannot}</dd>
        </div>
      </dl>
    </li>
  );
}

export default async function AuditPage() {
  const [script, manifest] = await Promise.all([
    readFile(path.join(process.cwd(), "public", "Code.gs"), "utf8"),
    readFile(path.join(process.cwd(), "public", "appsscript.json"), "utf8"),
  ]);
  const t = tally();
  const span = versionSpan();
  const day = reviewDay();
  const paragraphs = AUDIT_PROMPT.split(/\n\s*\n/);

  return (
    <Shell here="/audit">
      <h1 className="font-display text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-h2">
        Don&rsquo;t take our word for it
      </h1>

      <p className="mt-6 max-w-[58ch] text-lede leading-[1.7] text-ink-read">
        Blotter reads your Gmail. This page shows what the code does with it, one run at a
        time, and beside each thing we say, how to check it without trusting us. It takes
        about two minutes and you do not need to read code. If you only have a minute, do
        the check in row 2.2 and stop there.
      </p>

      <ReceiptStub className="mt-6 max-w-[64ch]" />

      <p className="mt-4 text-small text-ink-muted">
        On this page:{" "}
        {[
          ["#run", "One run"],
          ["#claims", "What we say"],
          ["#ask", "The question to ask"],
          ["#found", "What reviews found"],
          ["#ends", "Where checking ends"],
        ].map(([href, label], i) => (
          <span key={href}>
            {i > 0 && <span className="mx-2 text-ink-faint">·</span>}
            <a href={href} className={LINK}>
              {label}
            </a>
          </span>
        ))}
      </p>

      <div className="mt-14 space-y-14">
        {/* ------------------------------------------------------------ 01 */}
        <section className="border-t border-rule pt-8">
          <H2 n="01" id="run">
            One run, drawn
          </H2>
          <p className={`${PROSE} mt-4`}>
            This is what the script does every 15 minutes through the day and every two hours
            overnight. Press play, or step through it.
          </p>
          <div className="mt-6">
            <RunStage />
          </div>
        </section>

        {/* ------------------------------------------------------------ 02 */}
        <section className="border-t border-rule pt-8">
          <H2 n="02" id="claims">
            What we say, and how to check it
          </H2>

          <ul className="mt-6 list-none">
            <ClaimRow
              id="r2-1"
              n="2.1"
              claim="The code that reads your mail is in your own sheet, on your own Google account. Nothing on our servers touches Gmail, and nothing changes the code but you."
              check={
                <>
                  Open your copy: <B>Extensions</B>, then <B>Apps Script</B>. That file is the
                  whole of it. When a new version exists the sheet asks, and you paste it in
                  yourself.
                </>
              }
              cannot="Whether that file is the one we publish. That is the next row."
            />
            <ClaimRow
              id="r2-2"
              n="2.2"
              claim="The code in your sheet is the code on this site, and it sends to blotterib.com."
              check={
                <>
                  In your sheet, <B>Blotter</B>, then <B>Check this sheet</B>. It prints the
                  version and a <em>Sends to</em> line. Both should match the line at the top of
                  this page. To check every line, paste your copy on{" "}
                  <Link href="/code#check" className={LINK}>
                    the Code page
                  </Link>
                  . It runs in your browser and you can turn your wifi off first.
                </>
              }
              cannot={
                <>
                  These are two different checks. The paste proves the code; the{" "}
                  <em>Sends to</em> line proves where it goes. Both have to pass. Neither says
                  anything about our server.
                </>
              }
            />
            <ClaimRow
              id="r2-3"
              n="2.3"
              claim="It reads the outside of messages: who wrote, who received, when, and the subject line. Not the text. One exception: a delivery-failure notice is opened to find the addresses that bounced, and only the addresses travel."
              check={
                <>
                  Paste the script and{" "}
                  <a href="#ask" className={LINK}>
                    the question in 03
                  </a>{" "}
                  into any AI and ask what leaves. Every field that leaves, and every field that
                  comes back, is{" "}
                  <Link href="/code#shapes" className={LINK}>
                    listed on the Code page
                  </Link>
                  .
                </>
              }
              cannot="Google's Gmail permission is your whole mailbox. No narrower one allows searching, so the limit is set by the code, not by Google. Whole conversations are read, so anyone copied in has their name, address and the subject line read too. Subject lines reach our server."
            />
            <ClaimRow
              id="r2-4"
              n="2.4"
              claim="It only opens conversations with people in your Contacts tab, and calendar events that match a contact."
              check={
                <>
                  The same question asks what sets each send off. This claim was wrong once. On 5
                  September 2026 the whole calendar was going out.{" "}
                  <Link href="/findings#f-1.1" className={LINK}>
                    A review found it
                  </Link>{" "}
                  and it was fixed that day.{" "}
                  <Link href="/findings#f-2.4" className={LINK}>
                    A second review found the fix had left a gap
                  </Link>
                  , and that was closed the same evening.
                </>
              }
              cannot="That it will not be wrong again. The next review is how we would find out. A contact you tick Closed is still read every run. The tick changes how the row looks, not what is fetched."
            />
            <ClaimRow
              id="r2-5"
              n="2.5"
              claim="Our server keeps nothing from your Gmail or Calendar. No database of it, no log, no file."
              check={
                <>
                  <Link href="/status" className={LINK}>
                    The Status page
                  </Link>{" "}
                  lists every table we hold, every column in plain English, with live counts,
                  and{" "}
                  <Link href="/status#find" className={LINK}>
                    shows you the exact rows about your own sheet
                  </Link>
                  . {countWord(formTableCount())} tables hold email addresses. They were typed
                  into this website.
                </>
              }
              cannot={
                <>
                  Anything about what the server does. That page proves what this database
                  holds. It cannot prove there is no other. This is the row you take on our
                  word, and{" "}
                  <a href="#ends" className={LINK}>
                    05
                  </a>{" "}
                  says so.
                </>
              }
            />
          </ul>
          <p className="max-w-[64ch] border-t border-rule pt-4 text-small leading-[1.6] text-ink-muted">
            Every row ends with something you can do. If you do none of them, you are trusting
            us, and that is your call.
          </p>
        </section>

        {/* ------------------------------------------------------------ 03 */}
        <section className="border-t border-rule pt-8">
          <H2 n="03" id="ask">
            The question to ask
          </H2>
          <p className={`${PROSE} mt-4`}>
            You do not have to read the code. Paste this question, with the code, into any AI.
            It is printed here so you can see exactly what you are sending, and change it if
            you want to ask something harder. Run it in two if you can. They do not always
            agree.
          </p>

          {/* Verbatim. One string, one module: the same text the button copies. */}
          <blockquote className="mt-6 border-l-2 border-blotter-400 bg-white py-5 pr-6 pl-6 md:columns-2 md:gap-10">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-small leading-[1.65] whitespace-pre-line text-ink-read [break-inside:avoid] ${i > 0 ? "mt-3" : ""}`}
              >
                {p}
              </p>
            ))}
          </blockquote>

          <div className="flex flex-wrap items-center gap-x-4">
            <CopyAudit
              script={script}
              manifest={manifest}
              version={SCRIPT_VERSION}
              label="Copy the question, the code, the permissions file and our claims"
            />
          </div>

          <div className="mt-8 max-w-[64ch] divide-y divide-rule border-y border-rule">
            <p className="py-3 text-body leading-[1.6] text-ink-read">
              It proves what leaves your account, what sets it off, and where it goes, checked
              against the claims on the privacy page and the drawing above.
            </p>
            <p className="py-3 text-body leading-[1.6] text-ink-read">
              It cannot prove what our server does afterwards. A model can also be wrong:{" "}
              {t.wrong} of the {t.raised} findings so far were.
            </p>
          </div>
          <p className="mt-3 max-w-[64ch] text-micro leading-[1.5] text-ink-faint">
            The claims in the package are generated from the same file that writes{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
              the privacy page
            </Link>
            , and the captions from the drawing above are included, so the AI checks the
            drawing as well.
          </p>
        </section>

        {/* ------------------------------------------------------------ 04 */}
        <section className="border-t border-rule pt-8">
          <H2 n="04" id="found">
            What reviews have found
          </H2>

          <dl className="mt-6 grid max-w-[64ch] grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-rule">
            {[
              [t.raised, "findings"],
              [t.trueAndFixed, "true and fixed"],
              [t.kept, "true and kept"],
              [t.wrong, "wrong"],
            ].map(([n, label], i) => (
              <div key={label} className={`flex flex-col-reverse ${i > 0 ? "sm:pl-6" : ""}`}>
                <dt className="mt-1.5 text-micro text-ink-muted">{label}</dt>
                <dd className="font-display text-[26px] leading-none font-bold tracking-[-0.02em] text-ink tabular-nums">
                  {n}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-mono text-[12px] text-ink-muted">
            {reviewCount()} reviews · {day.label} · versions {span.from} to {span.to}
            {day.sameDay ? " in one day" : ""}
          </p>

          <p className={`${PROSE} mt-5`}>
            The first review was ours. The founder pasted the script into ChatGPT to answer a
            comment on Reddit, and it found the whole calendar being sent. It was fixed the same
            day. Every finding since is on{" "}
            <Link href="/findings" className={LINK}>
              the Findings page
            </Link>{" "}
            with what was done, including the ones we chose to leave as they are and the ones
            that were wrong, with the reason.{" "}
            <Link href="/findings#f-3.1" className={LINK}>
              One fix
            </Link>{" "}
            closed a way a stranger could have run a formula in your sheet.
          </p>
        </section>

        {/* ------------------------------------------------------------ 05 */}
        <section id="ends" className="scroll-mt-6">
          <div className="flex items-end justify-between gap-4 pb-2">
            <span className="text-micro font-semibold tracking-[0.06em] text-ink-muted uppercase">
              Checkable · everything above
            </span>
          </div>
          <div className="border-t border-ink" />
          <div className="flex items-center gap-2 pt-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-[2px] border border-dashed border-ink-muted"
            />
            <span className="text-micro font-semibold tracking-[0.06em] text-blotter-700 uppercase">
              Our word · everything below
            </span>
          </div>

          <div className="mt-6">
            <H2 n="05" id="ends-heading">
              Where checking ends
            </H2>
          </div>

          <div className={`${PROSE} mt-4`}>
            <p>Everything above the line has a check. What follows is our word.</p>
            <p>
              Our server is built to keep nothing from your mail: no database of it, no log, no
              file. That is a claim. You are right to treat it as one.{" "}
              <Link href="/status" className={LINK}>
                The Status page
              </Link>{" "}
              shows what our database holds today. It cannot show there is no other.
            </p>
            <p>
              Three more things to know. Google has not verified this app, so a personal Gmail
              account sees a warning screen on the way in. Nobody has paid for an audit; the
              reviews are the {reviewCount()} above and whoever reads the code next. When our
              server says a new look exists, the sheet{" "}
              <Link href="/code#shapes" className={LINK}>
                fetches it from us
              </Link>
              . That can restyle the sheet and rewrite the text of its Start here tab. Nothing
              about you goes out on that fetch.
            </p>
            <p>
              If you install it and change your mind, choose <B>Stop automatic updates</B> from
              the Blotter menu in the sheet, or remove its access at{" "}
              <a href="https://myaccount.google.com/permissions" className={LINK}>
                your Google account&rsquo;s third-party access page
              </a>
              . It stops that moment. Nothing from your mailbox is held anywhere. The counting
              rows, a random id with run times and a contact count, stay, and identify nobody.
            </p>
            <p>
              If that is too much to accept, do not install it. That is a fair answer and we
              would rather have it than a worried user. If you end up unsure,{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                email us
              </a>{" "}
              and say what was missing. If you find something in the code, the same address. It
              goes in{" "}
              <Link href="/findings" className={LINK}>
                the log
              </Link>{" "}
              either way.
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}
