import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * Terms of service.
 *
 * **These did not exist.** `24-PRE-LAUNCH-READINESS.md` §6 and
 * `28-WEBSITE-AUDIT.md` §5.3 both record that, and both say the same thing: a
 * stranger is about to grant Gmail access, and Google's consent screen shows no
 * link to either document because it has not reviewed the app. So the only
 * place these can exist is here, and the setup page links to them from the step
 * where Google says it cannot.
 *
 * ## The rule this page is written under, and it is the privacy policy's
 *
 * **Structure may be conventional. Facts may not be invented.** Every unknown
 * is marked in place as a visible `[ to be confirmed ]` slot rather than filled
 * with a plausible value — the device the privacy policy shipped with in
 * August 2026.
 *
 * That device was removed from `/privacy` once Jon answered its twelve slots,
 * **and removing it is what made the next failure possible**: several settled
 * answers later became false and nothing marked them. So the slots here stay
 * visible until they are answered, and the answers go in as answers.
 *
 * ## ⚠ THIS HAS NOT BEEN READ BY A LAWYER
 *
 * Stated at the top of the file because it is the thing most likely to be
 * forgotten. Two of the three open slots are the kind a lawyer settles in a
 * sentence and nobody else should settle at all:
 *
 *   1. **The legal entity.** Jon confirmed on August 6, 2026 that one exists.
 *      Its name and form are not recorded anywhere in this repository, and a
 *      terms page has to say who the agreement is with.
 *   2. **Governing law.** Follows from the entity. Not guessed at here.
 *   3. **Whether terms are needed at all in this shape.** Nothing is sold, no
 *      account is created, and the software runs entirely inside the user's own
 *      Google account. That is an unusual arrangement and it may want unusual
 *      terms rather than conventional ones.
 *
 * `noindex` until those are answered, for the same reason `/setup` is: a
 * findable legal page with holes in it is worse than one nobody has found.
 */
export const metadata: Metadata = {
  title: "Terms | Blotter",
  description: "The terms you agree to when you use Blotter.",
  robots: { index: false, follow: false },
};

const EFFECTIVE_DATE = "September 3, 2026";

/* --------------------------------------------------------------- primitives */

function Article({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule pt-8">
      <h2 className="font-display flex gap-4 text-[1.25rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
        <span className="font-mono text-small font-normal text-ink-faint tabular-nums">
          {n}
        </span>
        {title}
      </h2>
      <div className="mt-4 max-w-[74ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        {children}
      </div>
    </section>
  );
}

/**
 * A visible unknown.
 *
 * The privacy policy's original device, reinstated here deliberately. It is
 * ugly on purpose: an unanswered question that looks unanswered gets answered,
 * and one that reads as prose does not.
 */
function Tbc({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[3px] bg-blotter-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-read">
      [ to be confirmed: {children} ]
    </span>
  );
}

/* -------------------------------------------------------------------- page */

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-quiet">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-[60px] max-w-[900px] items-center justify-between px-6">
          <Link href="/" aria-label="Blotter, back to the home page" className="text-navy-900">
            <BlotterLockup size={22} />
          </Link>
          <Link
            href="/"
            className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            Back to Blotter
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 pt-16 pb-28">
        <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
          Terms
        </h1>
        <p className="mt-4 text-small text-ink-muted">Effective date {EFFECTIVE_DATE}</p>

        <div className="mt-8 border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
          <p className="text-body leading-[1.62] text-ink">
            <strong className="font-semibold">
              Blotter is built and working, and it is not yet open to other people.
            </strong>{" "}
            Nothing is being sold, no payment has been taken from anyone, and no account
            exists to create. These terms are written now rather than later because
            Google&rsquo;s permission screen cannot show them to you at the moment you
            need them, and a page that appears after people have already installed
            something is not much of an agreement.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <Article n="01" title="Who these terms are with">
            <p>
              Blotter is operated by <Tbc>the legal entity&rsquo;s name and form</Tbc>,
              referred to here as &ldquo;Blotter&rdquo;, &ldquo;we&rdquo; and
              &ldquo;us&rdquo;. You can reach us at{" "}
              <a
                href="mailto:blotterib@gmail.com"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                blotterib@gmail.com
              </a>
              .
            </p>
            <p>
              By copying the Blotter spreadsheet, giving it permission in your Google
              account, or using this website, you agree to these terms. If you do not agree
              to them, do not install it.
            </p>
          </Article>

          <Article n="02" title="What Blotter is">
            <p>
              Blotter is a Google Sheet with code inside it. You make your own copy of it
              in your own Google account, and you grant that copy permission to read your
              Gmail and Calendar. It reads the conversations that involve the contacts you
              have put in the sheet, and writes each contact&rsquo;s status, timing and
              scheduled calls back into the same sheet.
            </p>
            <p>
              That code sends facts about those conversations to a server we run, which
              works out what each one means and sends the answer back. What crosses that
              connection, and what does not, is set out in full in our{" "}
              <Link
                href={POLICY_HREF}
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                privacy policy
              </Link>
              .
            </p>
            <p>
              <strong className="font-semibold text-ink">
                Google has not reviewed or verified Blotter
              </strong>
              , and will tell you so when you install it. That warning is accurate. It is
              shown for anything a person installs into their own Google account, and the
              developer it names will be you, because the copy is yours.
            </p>
          </Article>

          <Article n="03" title="Your spreadsheet is yours">
            <p>
              The copy you make belongs to you. It is an ordinary file in your own Google
              Drive, we have no access to it, and nothing about it is copied anywhere else.
              You may keep it, change it, share it or delete it as you like, and you do not
              need to tell us.
            </p>
            <p>
              You can remove Blotter&rsquo;s access at any time from your Google
              account&rsquo;s own security settings, without asking us and without notice.
              It stops immediately.
            </p>
          </Article>

          <Article n="04" title="What you agree to do">
            <p>
              Use Blotter with a Google account you are entitled to use, and for your own
              recruiting. Do not use it to read somebody else&rsquo;s mail.
            </p>
            <p>
              Do not attempt to disrupt or overload our server, work around limits we set,
              or use Blotter to break the law or anyone else&rsquo;s rights. Do not
              redistribute Blotter as your own product.
            </p>
            <p>
              You must be 18 or older to use Blotter.
            </p>
          </Article>

          <Article n="05" title="What Blotter does not do">
            <p>
              Blotter does not write, send or draft emails, and has no permission to send
              anything. It does not tell you who to contact or when to follow up. It does
              not teach technical interview material or provide recruiting advice, and it
              makes no assessment of how any conversation is going.
            </p>
            <p>
              It reports what has happened and how long ago. Every judgment about what to
              do next is yours.
            </p>
          </Article>

          <Article n="06" title="It will sometimes be wrong">
            <p>
              This is worth saying plainly rather than burying in a disclaimer, because it
              is a real limit rather than a legal one.
            </p>
            <p>
              Blotter can only see email and calendar events. A conversation that happened
              by phone, by text, over LinkedIn or in person is invisible to it, and the
              row will not reflect it. It cannot tell whether a call went well. It cannot
              always tell an out-of-office reply from a real one. If an email address in
              your sheet is wrong, the row for that person will be wrong too.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                Do not rely on Blotter as the only record of your recruiting.
              </strong>{" "}
              It is a convenience for keeping a sheet current, not a system of record, and
              a missed follow-up remains your responsibility.
            </p>
          </Article>

          <Article n="07" title="Availability, and changes">
            <p>
              Blotter is early software. It may be unavailable, it may change, and parts of
              it may be withdrawn. We may change how it works, and we will update the
              relevant pages when we do.
            </p>
            <p>
              If we stop running the server, your spreadsheet does not disappear. It stays
              in your Drive with everything in it; the Blotter columns simply stop
              updating.
            </p>
            <p>
              If we materially change these terms, we will change the date at the top of
              this page, and we will tell people who have given us an email address before
              the change takes effect.
            </p>
          </Article>

          <Article n="08" title="Price">
            <p>
              Blotter is not currently charged for. No payment has been taken from anyone
              and no card details are collected anywhere on this site.
            </p>
            <p>
              If paid access is introduced, the price and terms will be shown before
              anything is owed, and using Blotter up to that point does not commit you to
              paying for it.
            </p>
          </Article>

          <Article n="09" title="No warranty">
            <p>
              Blotter is provided as it is, without warranties of any kind, to the fullest
              extent the law allows. We do not warrant that it will be uninterrupted, free
              of errors, or that what it reports will always be accurate. Section 6 sets
              out several situations in which it will not be.
            </p>
          </Article>

          <Article n="10" title="Limit of liability">
            <p>
              To the fullest extent the law allows, we are not liable for indirect or
              consequential loss, or for lost opportunities, arising from your use of
              Blotter or from anything it did or failed to report.
            </p>
            <p>
              Nothing in these terms limits liability that cannot be limited by law.
            </p>
            <p>
              Where liability can be limited, our total liability to you is limited to{" "}
              <Tbc>
                the cap, conventionally the greater of amounts paid in the preceding
                twelve months or a small fixed sum; a lawyer should set this
              </Tbc>
              .
            </p>
          </Article>

          <Article n="11" title="Ending it">
            <p>
              You end this agreement by removing Blotter&rsquo;s access in your Google
              account and, if you want, deleting the spreadsheet. There is nothing to
              cancel and nobody to tell.
            </p>
            <p>
              We may stop providing the service, or stop providing it to a particular
              installation, if it is being used in a way that breaks section 4.
            </p>
          </Article>

          <Article n="12" title="Governing law">
            <p>
              These terms are governed by the law of{" "}
              <Tbc>the jurisdiction, which follows from the entity in section 1</Tbc>.
            </p>
          </Article>

          <Article n="13" title="Contact">
            <p>
              Questions about these terms can be sent to{" "}
              <a
                href="mailto:blotterib@gmail.com"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                blotterib@gmail.com
              </a>
              , or through the{" "}
              <Link
                href="/contact"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                contact form
              </Link>
              .
            </p>
          </Article>
        </div>
      </main>
    </div>
  );
}
