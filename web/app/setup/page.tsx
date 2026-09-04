import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * The setup page.
 *
 * Written for somebody who has already decided. Two screens sit between here
 * and a working sheet, and both are where students give up: the unverified-app
 * warning and the permissions list. Both are answered head-on below.
 *
 * Three rules this rewrite follows, from Jon on 3 September 2026:
 *
 *   1. **Never say "script".** Nobody outside this repository knows what one
 *      is. Where Google's own dialog says it, quote Google and then translate.
 *   2. **Say what Blotter can see in the first screen of the page**, not in a
 *      policy nobody opens. The honest answer is unusually reassuring — it
 *      reads envelopes, not letters — and it was buried.
 *   3. **Collapse the steps.** The previous version ran to roughly thirty
 *      screens of scrolling, which reads as difficulty whatever the words say.
 *
 * The claims in "What Blotter can actually see" are checked against
 * `courier/Code.gs`, not against intent: `getPlainBody()` is called in exactly
 * one place, guarded by `isBounceSender_`, so a non-bounce message's text is
 * never read at all. That is a stronger and simpler thing to say than any
 * promise about what we do with it afterwards, so the page says it.
 *
 * Still blocked: `TEMPLATE_URL` is null because no public template exists yet,
 * and the master must not become one — it carries 58 real bankers' names and
 * addresses. The page renders and says so. It stays `noindex` until that lands.
 */
export const metadata: Metadata = {
  title: "Set up Blotter | Blotter",
  description:
    "Copy one sheet, give it permission, and your recruiting tracker keeps itself up to date. About five minutes.",
  robots: { index: false, follow: false },
};

/** The public template a student copies. Null until an empty master exists. */
const TEMPLATE_URL: string | null = null;

const LINK =
  "font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900";

/* ------------------------------------------------------------------ pieces */

function Step({
  n,
  title,
  open,
  children,
}: {
  n: number;
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="group border-t border-rule">
      <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-small font-normal text-ink-faint tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        <span className="font-display flex-1 text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
          {title}
        </span>
        <span
          aria-hidden
          className="mt-[0.15em] shrink-0 text-[1.15rem] leading-none text-ink-faint transition-transform duration-150 ease-out group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="max-w-[68ch] space-y-4 pb-9 pl-[2.5rem] text-body leading-[1.65] text-ink-muted">
        {children}
      </div>
    </details>
  );
}

/**
 * A screenshot, capped well below its natural width so it stays sharp. The
 * sources are 429-525px wide; the previous version stretched them across a
 * 74ch column, and that upscaling was the whole of the blur.
 */
function Shot({
  src,
  alt,
  caption,
  width,
  height,
  wide,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** For shots whose own text has to stay legible, such as the menu. */
  wide?: boolean;
}) {
  return (
    <figure
      className={`${wide ? "max-w-[540px]" : "max-w-[400px]"} overflow-hidden rounded-[6px] border border-rule bg-white`}
    >
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" unoptimized />
      <figcaption className="border-t border-rule px-3 py-2 text-small leading-[1.5] text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Words the student will see on their own screen, set apart from ours. */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-rule bg-white py-3 pr-5 pl-4 text-body leading-[1.6] text-ink">
      {children}
    </div>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint" />
      <span>
        <span className="font-medium text-ink">{label}</span> {children}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------- page */

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-surface-quiet">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-[60px] max-w-[900px] items-center justify-between px-6">
          <Link href="/" aria-label="Blotter, back to the home page" className="text-navy-900">
            <BlotterLockup />
          </Link>
          <Link href={POLICY_HREF} className={`text-small ${LINK}`}>
            Privacy
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 pt-16 pb-28">
        <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
          Set up Blotter
        </h1>

        <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
          <p>
            You copy one spreadsheet into your own Google Drive and give it permission to look
            at your email. From then on it follows your recruiting conversations and keeps the
            tracker current — who replied, who went quiet, who you owe a follow-up.
          </p>
          <p>
            Five minutes, once. You will hit one alarming-looking warning from Google along
            the way. <B>Step 3 explains it</B>, and it is a good deal less dramatic than it
            looks.
          </p>
        </div>

        {/* The trust anchor. This used to live in the privacy policy, which is
            to say nowhere. It is the reason somebody carries on past step 3. */}
        <section className="mt-12 rounded-[6px] border border-rule bg-white px-7 py-7">
          <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
            What Blotter can actually see
          </h2>

          <div className="mt-5 max-w-[68ch] space-y-5 text-body leading-[1.65] text-ink-muted">
            <p>
              <B>It reads the outside of your emails, not the inside.</B> For each message it
              looks at who sent it, who it went to, when, and the subject line — the things
              printed on an envelope. It does not open your email and read what you wrote.
            </p>
            <p>
              There is one exception, and it works in your favour. When Google&rsquo;s mail
              system sends back an automated <em>delivery failed</em> notice, Blotter opens
              that one to find which address bounced, so it can tell you. Those notices are
              written by a machine, not by a person.
            </p>
            <p>
              <B>It reads your calendar</B> — event titles, times and who was invited — so it
              can tell a call has been booked without you typing it in.
            </p>
            <p>
              <B>It sees one spreadsheet: the copy you make.</B> The permission Google grants
              here is for that single file. Blotter cannot open anything else in your Drive
              and cannot see your other spreadsheets.
            </p>

            <div className="border-t border-rule pt-5">
              <p>
                <B>What it never does:</B> send an email, reply to one, delete anything, or
                change your calendar. It has no ability to. Everything it can reach is
                read-only, apart from writing into the one sheet you gave it.
              </p>
            </div>

            <div className="border-t border-rule pt-5">
              <p>
                <B>Where it all goes.</B> Blotter&rsquo;s server receives the envelope details
                above, works out what changed, and sends back a status — <em>replied</em>,{" "}
                <em>waiting</em>, <em>bounced</em>. It never receives the text of your emails,
                because that text is never opened in the first place. Your tracker stays in
                your Google Drive, under your account, and the answers are written straight
                back into it. We keep no copy of your sheet.
              </p>
            </div>
          </div>

          <p className="mt-6 text-small leading-[1.5] text-ink-faint">
            The full detail is in the{" "}
            <Link href={POLICY_HREF} className={LINK}>
              privacy policy
            </Link>
            .
          </p>
        </section>

        {/* ------------------------------------------------------------ CTA */}
        <div className="mt-14">
          {TEMPLATE_URL ? (
            <a
              href={TEMPLATE_URL}
              className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
            >
              Open the Blotter template
            </a>
          ) : (
            <div className="border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
              <p className="text-body leading-[1.62] text-ink">
                <B>The template link is not live yet.</B> The steps below are final, so you can
                read them through — but there is nothing to copy until it is published. Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will send it to you.
              </p>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------- steps */}
        <div className="mt-16">
          <h2 className="font-display mb-2 text-[1.35rem] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
            The six steps
          </h2>
          <p className="mb-6 max-w-[68ch] text-body leading-[1.65] text-ink-muted">
            Open each one as you get to it.
          </p>

          <Step n={1} title="Make your own copy of the sheet" open>
            <p>
              Open the template, then choose <B>File → Make a copy</B> from the menu at the
              top. Give it any name you like and click <B>Make a copy</B>.
            </p>
            <p>
              A yellow note appears in that box saying an{" "}
              <em>Apps Script file and functionality will also be copied</em>. That is
              Google&rsquo;s name for Blotter itself — the part that does the work. Seeing it
              means the copy is arriving complete. If it were missing, nothing would run.
            </p>
            <Shot
              src="/setup/copy-warning.png"
              alt="Google's Copy document box, with a yellow note saying an Apps Script file and functionality will also be copied."
              caption="Expected. The yellow note is Blotter coming along with the sheet."
              width={429}
              height={332}
            />
            <p>
              The copy lands in your own Google Drive. It is yours, and nobody else can open it
              unless you share it.
            </p>
          </Step>

          <Step n={2} title="Open the Blotter menu in your copy">
            <p>
              In your new copy, look along the top menu bar. To the right of <B>Help</B> there
              is a menu called <B>Blotter</B>. Open it and click{" "}
              <B>Step 1: Set up this sheet</B>.
            </p>
            <Shot
              src="/setup/menu.png"
              alt="The Blotter menu open in Google Sheets, showing Step 1: Set up this sheet."
              caption="The Blotter menu sits to the right of Help."
              width={893}
              height={583}
              wide
            />
            <p>
              If the menu is not there yet, wait a few seconds and reload the page. It appears
              once the sheet has finished opening.
            </p>
          </Step>

          <Step n={3} title="Google will warn you the app is not verified">
            <p>
              This is the screen that stops people. It looks severe, and it is worth
              understanding rather than clicking past blind.
            </p>
            <Screen>
              <p className="font-semibold">⚠ Google hasn&rsquo;t verified this app</p>
              <p className="mt-2">
                The app is requesting access to sensitive info in your Google Account. Until
                the developer (<B>your own email address</B>) verifies this app with Google,
                you shouldn&rsquo;t use it.
              </p>
            </Screen>
            <p>
              <B>Read the address in the brackets. It is yours.</B> You made a copy into your
              own Drive a minute ago, so as far as Google is concerned you now own this. The
              screen is asking whether you trust something sitting in your own account. It is
              not telling you Blotter failed a check.
            </p>
            <p>
              Google shows this for anything running from a personal Google account that
              hasn&rsquo;t been through its publisher review — including things people write
              for themselves. That review is an annual, paid, third-party security audit.
              Blotter has not been through it, and going through it would not remove this
              screen anyway, because the copy running is yours rather than ours.
            </p>
            <p>
              Click <B>Advanced</B> at the bottom left.
            </p>
            <Shot
              src="/setup/warning.png"
              alt="Google's unverified app warning, with the Advanced link at the bottom left outlined in green."
              caption="Click Advanced."
              width={525}
              height={259}
            />
            <p>
              The panel opens. Click <B>Go to Blotter (unsafe)</B>.
            </p>
            <Shot
              src="/setup/warning-advanced.png"
              alt="The expanded warning, with Go to Blotter (unsafe) outlined in green."
              caption="Then Go to Blotter (unsafe)."
              width={525}
              height={371}
            />
            <p className="text-small leading-[1.5] text-ink-faint">
              <em>Unsafe</em> is Google&rsquo;s standard wording for anything it has not
              reviewed. It is not a judgement about what the app does.
            </p>
          </Step>

          <Step n={4} title="Give it permission — tick Select all">
            <p>
              Next comes a list of five things Blotter is asking to do, each with a checkbox,{" "}
              <B>all of them empty</B>. Nothing on that screen tells you all five are
              required.
            </p>
            <p>
              <B>Tick Select all, then click Continue.</B> Leave one off and Blotter fails
              later, in a way that is very hard to work out.
            </p>
            <Shot
              src="/setup/permissions.png"
              alt="Google's permission screen with all five checkboxes ticked."
              caption="All five, via Select all."
              width={489}
              height={598}
            />
            <p>What each one is actually for:</p>
            <ul className="space-y-3">
              <Row label="Read your email.">
                To see who you have written to and heard back from. As above: envelopes, not
                contents.
              </Row>
              <Row label="Read your calendar.">
                To spot that a call has been scheduled without you entering it.
              </Row>
              <Row label="See and edit this spreadsheet.">
                To write the answers back into your tracker. This one file only.
              </Row>
              <Row label="Connect to an external service.">
                To ask Blotter&rsquo;s server what the updates should be.
              </Row>
              <Row label="Run when you are not present.">
                So it can refresh every fifteen minutes rather than only when you sit down.
              </Row>
            </ul>
          </Step>

          <Step n={5} title="Tell it who you are">
            <p>
              Your copy has a tab along the bottom called <B>Settings</B>. Two things there
              have to be right, and both fail quietly rather than loudly:
            </p>
            <ul className="space-y-3">
              <Row label="Your email addresses.">
                Every address you send recruiting email from. This is how Blotter tells{" "}
                <em>you wrote</em> from <em>they wrote</em>. Miss one — a university address,
                say — and everything sent from it is read backwards. Blotter refuses to run
                until this is filled in.
              </Row>
              <Row label="Your time zone.">
                A copy keeps the time zone of whoever built the template. If yours differs,
                every day count is off by one at the boundary, and it looks entirely normal
                while being wrong.
              </Row>
            </ul>
            <p>
              The <B>Start here</B> tab walks you through both.
            </p>
          </Step>

          <Step n={6} title="Add people and switch it on">
            <p>
              On the <B>Contacts</B> tab, add the people you are networking with — a name and
              a firm is enough to begin with. Then, from the <B>Blotter</B> menu:
            </p>
            <ul className="space-y-3">
              <Row label="Step 2: Run once now.">
                Fills everything in from your existing email history, so you can see it
                working straight away.
              </Row>
              <Row label="Start automatic updates.">
                From then on it refreshes every fifteen minutes on its own. You can stop it
                from the same menu whenever you like.
              </Row>
            </ul>
          </Step>
        </div>

        {/* ---------------------------------------------------- if it breaks */}
        <section className="mt-16 border-t border-rule pt-10">
          <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
            If something looks wrong
          </h2>
          <div className="mt-4 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
            <p>
              The <B>Blotter</B> menu has <B>Check this sheet (diagnostics)</B>. It reports
              what is connected and what is not, in plain language, and it is the fastest way
              to find what is missing.
            </p>
            <p>
              If that does not settle it, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                {CONTACT_EMAIL}
              </a>{" "}
              and paste in what the diagnostics said.
            </p>
            <p>
              To stop Blotter entirely: choose <B>Stop automatic updates</B> from the menu, or
              remove its access from your{" "}
              <a href="https://myaccount.google.com/permissions" className={LINK}>
                Google account permissions
              </a>
              . Deleting the spreadsheet removes it too. Nothing of yours is held anywhere
              else.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
