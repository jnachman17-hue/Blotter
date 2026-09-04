import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * Terms of service.
 *
 * `24-PRE-LAUNCH-READINESS.md` §6 and `28-WEBSITE-AUDIT.md` §5.3 both record
 * why this page exists: a stranger is about to grant Gmail access, and Google's
 * consent screen shows no link to either legal document because it has not
 * reviewed the app. So the only place these can exist is here.
 *
 * ## Completed September 4, 2026 from Jon's answers
 *
 * The page shipped on September 3, 2026 with three visible
 * `[ to be confirmed ]` slots, under the privacy policy's rule: structure may
 * be conventional, facts may not be invented. Jon supplied all three on
 * September 4, 2026, and they are written in as answers:
 *
 *   1. **The entity.** Blotter is operated by one person, a sole trader based
 *      in California. There is no company. No name is published, on the model
 *      of his other product's terms, which describe the trader and point at the
 *      support address.
 *   2. **Governing law.** California and the United States, with disputes in
 *      the state or federal courts of California, and the standard saving for
 *      consumer rights a contract cannot remove.
 *   3. **The liability cap.** The greater of what was paid in the previous six
 *      months and 50 US dollars, with the carve-out for liability that cannot
 *      lawfully be excluded.
 *
 * The `noindex` came off with them. It was there because a findable legal page
 * with holes in it is worse than one nobody has found, and the holes are gone.
 *
 * ## ⚠ A LAWYER HAS STILL NOT READ THIS
 *
 * Stated at the top of the file because it is the thing most likely to be
 * forgotten, and because three filled slots make a page look finished. What is
 * below is Jon's instruction written up faithfully. It is not legal advice, and
 * nobody qualified has checked that it does in California what he wants it to
 * do. **Get it reviewed before Blotter is opened to other people.**
 *
 * ## Where the factual claims come from
 *
 * Nothing here describes behaviour that is not in the code:
 *
 *   what crosses the wire   `web/app/api/engine/types.ts` — no `body` field
 *   what the server keeps   `web/app/api/engine/route.ts` — it writes nothing
 *   the Google permissions  `courier/appsscript.json` — five, all read-only
 *                           except the one spreadsheet
 *   what is counted         `web/app/api/telemetry/payload.ts` — an allow-list
 *   the price notice        `courier/Code.gs`, `writeBanner_` — the server's
 *                           channel into row 1 of Contacts
 *
 * **This page and `/privacy` are a set and are read as one.** The privacy
 * policy carries the same claims from `lib/privacy-copy.ts`. If a fact moves,
 * move it in both, and mark it rather than leaving it standing.
 */
export const metadata: Metadata = {
  title: "Terms | Blotter",
  description: "The terms you agree to when you use Blotter.",
  /* Indexable since September 4, 2026, when the three open slots were answered. */
};

/**
 * One date, not the pair `/privacy` renders.
 *
 * These terms take effect today in the form below. Governing law and a
 * liability cap are new, so a reader agreeing now is agreeing to something the
 * September 3 version did not say, and printing an older effective date beside
 * it would be wrong. When they are next materially revised, split this the way
 * the privacy policy does and keep both dates honest.
 */
const EFFECTIVE_DATE = "September 4, 2026";

const LINK =
  "font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900";

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

function Support() {
  return (
    <a href="mailto:blotterib@gmail.com" className={LINK}>
      blotterib@gmail.com
    </a>
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
          {/* Mirrors the privacy policy's header, which links here. The two
              pages are a set, and each should reach the other. */}
          <div className="flex items-center gap-5">
            <Link href={POLICY_HREF} className={`text-small ${LINK}`}>
              Privacy
            </Link>
            <Link href="/" className={`text-small ${LINK}`}>
              Back to Blotter
            </Link>
          </div>
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
            Nothing is sold and there is no account to create. These terms are written
            now rather than later because Google&rsquo;s permission screen cannot show
            them to you at the moment you need them, and a page that turns up after
            people have already installed something is not much of an agreement.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <Article n="01" title="Who these terms are with">
            <p>
              Blotter is run by one person, a sole trader based in California, in the
              United States. There is no company behind it. These terms are an agreement
              between you and him, and he is referred to here as
              &ldquo;Blotter&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo;. You can reach
              us at <Support />.
            </p>
            <p>
              By copying the Blotter spreadsheet, giving it permission in your Google
              account, or using this website, you agree to these terms. If you do not
              agree to them, do not install it.
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
              It reads the outside of your emails: who wrote, who it went to, when, and
              the subject line. It cannot read the text of an email. Those details go to a
              server we run, which works out where each conversation stands and sends the
              answer back. The full list of what crosses that connection is in our{" "}
              <Link href={POLICY_HREF} className={LINK}>
                privacy policy
              </Link>
              .
            </p>
            <p>
              <strong className="font-semibold text-ink">
                Blotter is not affiliated with Google, and Google has not reviewed or
                verified it.
              </strong>{" "}
              On a personal Gmail account Google says so on the way in, and the developer
              it names will be you, because the copy is yours. A university account does
              not see that screen.
            </p>
          </Article>

          <Article n="03" title="Your spreadsheet is yours">
            <p>
              The copy you make belongs to you. It is an ordinary file in your own Google
              Drive, we have no access to it, and nothing in it is copied anywhere else.
              Keep it, change it, share it or delete it as you like. You do not need to
              tell us.
            </p>
            <p>
              What you type into it is yours as well. Your contacts, your notes and
              anything else you put in the sheet stay yours, and we claim no rights over
              them.
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
              Do not try to disrupt or overload our server, work around limits we set, or
              use Blotter to break the law or anyone else&rsquo;s rights. Do not resell
              Blotter or pass it off as your own product.
            </p>
            <p>You must be 18 or older to use Blotter.</p>
          </Article>

          <Article n="05" title="What Blotter does not do">
            <p>
              Blotter cannot send an email, reply to one, or change or delete anything in
              your mailbox, and it cannot create, change or cancel a calendar event. It
              never asked Google for permission to do any of that.
            </p>
            <p>
              It does not tell you who to contact or when to follow up. It does not teach
              interview material or give recruiting advice, and it makes no assessment of
              how a conversation is going. It reports what has happened and how long ago.
              Every judgment about what to do next is yours.
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
              Blotter is early software. It may be unavailable, it may change, and parts
              of it may be withdrawn. We may change how it works, and we will update the
              relevant pages when we do.
            </p>
            <p>
              If we stop running the server, your spreadsheet does not disappear. It stays
              in your Drive with everything in it, and the Blotter columns stop updating.
            </p>
            <p>
              If we materially change these terms, we will change the date at the top of
              this page before the change takes effect, and we will tell people who have
              given us an email address.
            </p>
          </Article>

          <Article n="08" title="What it costs">
            <p>
              Blotter is free. No payment has been taken from anyone, and no card details
              are collected anywhere on this site.
            </p>
            <p>
              Blotter will not always be free. When that changes, your sheet will say so
              before anything is owed. Blotter writes a notice across the top of your
              Contacts tab, and a price is exactly the kind of thing it is there for.
            </p>
            <p>
              You will never be charged for the time Blotter was free, and nothing you
              have already done will be billed for afterwards. If you do not want to pay,
              stop using it. Your spreadsheet stays yours either way, with everything in
              it.
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
              consequential loss, for loss of data, or for lost opportunities, arising
              from your use of Blotter or from anything it did or failed to report.
            </p>
            <p>
              Where liability cannot be excluded, our total liability to you is limited to
              the greater of the amount you have paid us in the previous six months and 50
              US dollars. Blotter is free, so today that figure is 50 US dollars.
            </p>
            <p>
              Nothing in these terms excludes or limits liability that cannot lawfully be
              excluded or limited.
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
              These terms are governed by the law of the State of California and of the
              United States. Disputes about them are heard in the state or federal courts
              of California, and you and we both agree to that.
            </p>
            <p>
              Nothing here takes away rights you have under consumer law that a contract
              cannot remove.
            </p>
          </Article>

          <Article n="13" title="Contact">
            <p>
              Questions about these terms can be sent to <Support />, or through the{" "}
              <Link href="/contact" className={LINK}>
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
