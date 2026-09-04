import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * The setup page.
 *
 * Jon asked for it in `27-BRIEF-WEBSITE-AUDIT.md` §5 and ruled on it after
 * `28-WEBSITE-AUDIT.md`. It is the one page on this site written for somebody
 * who has already decided, and it exists because two screens between here and a
 * working sheet are where students give up.
 *
 * ## The two screens this page is really about
 *
 * **The unverified-app warning.** `24-PRE-LAUNCH-READINESS.md` §2 calls it
 * *"the single biggest place a student gives up"*, and every word written about
 * it in this project before September 2, 2026 came from Google's documentation
 * rather than from a screen. `17-INSTALL-OBSERVED.md` §1 is the first real
 * transcription, and it contains the reassurance nobody had been using:
 * **the developer Google names on that screen is the student themselves.**
 *
 * **The permissions screen.** Five checkboxes, every one unchecked by default,
 * a `Select all` above them, and nothing anywhere saying all five are required.
 * A cautious student ticking two gets a product that fails in ways they cannot
 * diagnose. So this page says `Select all` in bold and then says what each one
 * is for, because "what breaks without it" is the only framing that stops
 * somebody being careful in the way that hurts them.
 *
 * ## Two steps the brief's outline did not have
 *
 * `courier/INSTALL.md` Part B is explicit that the order matters, and both of
 * the steps it puts before the first run fail silently:
 *
 *   - **The email addresses.** Blotter refuses to run until it knows which
 *     addresses are the student's, because that is how it tells "you wrote"
 *     from "they wrote". Run it first and the very first click produces an
 *     error dialog that looks exactly like a broken install.
 *   - **The time zone.** A copied sheet keeps the time zone of whoever built
 *     it. A student in New York on a Chicago template gets every `Days` value
 *     wrong at the boundary — silently, in a way that looks completely normal.
 *
 * Both live on the sheet's own `Start here` tab, so this page hands off rather
 * than duplicating them. **But it names them**, because a page that ends at
 * "now open the sheet" reads as "you are finished" and they are not.
 *
 * ## Why it takes `/privacy`'s shell
 *
 * Same header, same 900px measure, same quiet ground, for the reason
 * `app/contact/page.tsx` gives: these are the site's secondary surfaces and
 * they should read as one set. The landing page's bounded box and field
 * gradient would make instructions look like an argument.
 *
 * ## ⚠ Two things block this page going live
 *
 * 1. **`TEMPLATE_URL` is null.** There is no public template yet, and the
 *    master must not become one: `17-INSTALL-OBSERVED.md` §2 records that it
 *    ships carrying **58 real bankers' names and email addresses**. An empty
 *    master is a prerequisite, and it is a privacy problem rather than a tidying
 *    job.
 * 2. **The four screenshots.** Marked in place below rather than faked.
 *
 * The page renders correctly without either — it simply says so — so it can be
 * reviewed and finished in any order. **It is `noindex` until both land.**
 */
export const metadata: Metadata = {
  title: "Set up Blotter | Blotter",
  description:
    "Copy the sheet, let it read your Gmail, and add the people you are networking with. About five minutes.",
  /* Lifted when `TEMPLATE_URL` is set. An indexed setup page that cannot
     complete the job is worse than no page. */
  robots: { index: false, follow: false },
};

/**
 * The public template a student copies.
 *
 * **Null until an empty master exists.** Set it to the sheet's share URL and
 * the page's first step becomes a button; leave it null and the page says
 * plainly that the link is not ready, which is better than a dead button.
 *
 * When it is set, add a tracking parameter to it. Telemetry fires on a sheet's
 * first *run*, so a student who copies and never finishes setup is invisible
 * today — and that drop-off is precisely the one worth measuring.
 * `24-PRE-LAUNCH-READINESS.md` §6 has the argument.
 */
const TEMPLATE_URL: string | null = null;

/* --------------------------------------------------------------- primitives */

function Step({
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
 * A marked slot for one of Jon's screenshots.
 *
 * Deliberately visible rather than a silent gap. `20-UI-BUILD-NOTES.md` used
 * the same device on the `Start here` tab, and it is the honest way to ship a
 * page whose pictures are somebody else's to take.
 */
function Shot({ caption }: { caption: string }) {
  return (
    <div className="grid min-h-[104px] place-items-center rounded-[6px] border border-dashed border-rule bg-white px-6 py-5 text-center">
      <p className="text-small leading-[1.5] text-ink-faint">
        [ screenshot: {caption} ]
      </p>
    </div>
  );
}

/** Google's own words, quoted so a reader can match this page to their screen. */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-rule bg-white py-4 pr-6 pl-5 text-body leading-[1.6] text-ink">
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------- page */

export default function SetupPage() {
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
          Setting up Blotter
        </h1>

        <div className="mt-6 max-w-[74ch] space-y-4 text-body leading-[1.65] text-ink-muted">
          <p>
            Blotter is a Google Sheet with a script inside it. You make your own copy,
            let it read your Gmail and Calendar, and add the people you are networking
            with. It updates itself every 15 minutes after that.
          </p>
          <p>
            About five minutes. You will need the Google account you actually recruit
            from — the one your outreach is sent from and arrives in.
          </p>
          <p>
            <strong className="font-semibold text-ink">
              One thing to know before you start.
            </strong>{" "}
            Partway through, Google will show you a warning saying it has not verified
            this app. That is normal, it is expected, and step 3 explains exactly why it
            happens and why it is fine. It is the step most people stop at, so it is the
            one written out in the most detail.
          </p>
        </div>

        {/* ------------------------------------------------------- the template */}
        <div className="mt-10">
          {TEMPLATE_URL ? (
            <a
              href={TEMPLATE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
            >
              Open the Blotter template
            </a>
          ) : (
            <div className="border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
              <p className="text-body leading-[1.62] text-ink">
                <strong className="font-semibold">
                  The template is not open to other people yet.
                </strong>{" "}
                Blotter is working, and it is running on one account — the one belonging
                to the person who built it. When the sheet is ready for other people to
                copy, the link goes here and the rest of this page is the instructions
                that come with it.
              </p>
            </div>
          )}
        </div>

        <div className="mt-14 space-y-12">
          <Step n="01" title="Make your own copy">
            {/* Worded to read correctly whether or not `TEMPLATE_URL` is set —
                "the template above" is a dangling reference when the block above
                is the not-ready notice rather than a button. */}
            <p>
              Open the Blotter template and click{" "}
              <strong className="font-semibold text-ink">File → Make a copy</strong>.
              Give it whatever name you like.
            </p>
            <p>
              The copy is yours. It lives in your own Google Drive, the script travels
              inside it, and nothing you do to it touches anyone else&rsquo;s.
            </p>
          </Step>

          <Step n="02" title="Open the Blotter menu">
            <p>
              Reload the page and wait a few seconds. A new menu named{" "}
              <strong className="font-semibold text-ink">Blotter</strong> appears in the
              menu bar, to the right of <em>Help</em>. If it is not there after about ten
              seconds, reload once more — it sometimes takes two.
            </p>
            <p>
              Click{" "}
              <strong className="font-semibold text-ink">
                Blotter → Step 1: Set up this sheet
              </strong>
              . This is where the permission screens start.
            </p>
            <Shot caption="the Blotter menu open in the menu bar" />
          </Step>

          <Step n="03" title="The warning screen, and why it is fine">
            <p>Google will show you something like this:</p>
            <Screen>
              <p className="font-semibold">⚠ Google hasn&rsquo;t verified this app</p>
              <p className="mt-2">
                The app is requesting access to sensitive info in your Google Account.
                Until the developer (
                <strong className="font-semibold">your own email address</strong>) verifies
                this app with Google, you shouldn&rsquo;t use it.
              </p>
            </Screen>
            <p>
              <strong className="font-semibold text-ink">
                Read the developer name on that screen. It is yours.
              </strong>{" "}
              You made your own copy of this sheet a minute ago, so the script is now in
              your account, and Google is warning you about yourself. It shows this for
              anything a person installs into their own Google account.
            </p>
            <p>
              It does not change what the script is allowed to do. That is decided by the
              permissions on the next screen, and every one of them is read-only apart
              from the spreadsheet you just copied.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                The buttons are not laid out in your favour, so read them carefully.
              </strong>{" "}
              <em>Back to safety</em> is the big obvious button and it cancels the whole
              thing. What you want is <em>Advanced</em>, the small underlined link on the
              far left. Click that, and then click{" "}
              <strong className="font-semibold text-ink">Go to Blotter (unsafe)</strong>{" "}
              at the bottom of the text that unfolds.
            </p>
            <Shot caption="the unverified-app warning, with Advanced visible" />
          </Step>

          <Step n="04" title="The permissions screen — click Select all">
            <p>
              The next screen is headed{" "}
              <strong className="font-semibold text-ink">
                Select what Blotter can access
              </strong>{" "}
              and has five checkboxes on it.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                Every box is empty, all five are required, and nothing on that screen
                tells you either of those things.
              </strong>{" "}
              There is a <em>Select all</em> link above them. Use it. Ticking some of them
              produces a Blotter that half-works in ways that are genuinely hard to work
              out from the outside.
            </p>
            <p>Here is what each one is for, in Google&rsquo;s words:</p>
            <ul className="space-y-3">
              {[
                [
                  "View your email messages and settings",
                  "Reading your mail. Without it nothing works at all.",
                ],
                [
                  "View and manage spreadsheets that this application has been installed in",
                  "Writing to the sheet you just copied — and only that one. Blotter cannot see any other file in your Drive.",
                ],
                [
                  "See and download any calendar that you can access",
                  "Finding your calls and coffee chats. Without it, scheduled and completed calls stop working.",
                ],
                [
                  "Connect to an external service",
                  "Letting the sheet ask Blotter's server what each contact's status is.",
                ],
                [
                  "Allow this application to run when you are not present",
                  "The 15-minute updates. Without it you would have to run Blotter by hand every time.",
                ],
              ].map(([label, why]) => (
                <li key={label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint"
                  />
                  <span>
                    <span className="font-medium text-ink">{label}</span>
                    <br />
                    {why}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              Three of the five are read-only. Blotter has no permission to send an email,
              reply to one, delete anything, or create or cancel a calendar event — not as
              a promise, but because those permissions were never asked for.
            </p>
            <p>
              You may also see a line about not seeing links to Blotter&rsquo;s privacy
              policy or terms. Google only shows those for apps it has reviewed, and it has
              not reviewed a script you installed yourself. They are here:{" "}
              <Link
                href={POLICY_HREF}
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                privacy policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                terms
              </Link>
              .
            </p>
            <p>Click <strong className="font-semibold text-ink">Allow</strong>.</p>
            <Shot caption="the five permissions, with Select all visible above them" />
          </Step>

          <Step n="05" title="Then open Start here, in the sheet">
            <p>
              The windows close and you are back in your spreadsheet. Click{" "}
              <strong className="font-semibold text-ink">
                Blotter → Step 1: Set up this sheet
              </strong>{" "}
              once more — Google sometimes swallows the click that triggered the permission
              flow — and the tabs appear along the bottom.
            </p>
            <p>
              The first one is called{" "}
              <strong className="font-semibold text-ink">Start here</strong> and it walks
              you through the rest. It is four short steps, and{" "}
              <strong className="font-semibold text-ink">
                two of them matter more than they look:
              </strong>
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint"
                />
                <span>
                  <span className="font-medium text-ink">Your email addresses</span>, in
                  the Settings tab, before you run anything. It is how Blotter tells
                  &ldquo;you wrote&rdquo; from &ldquo;they wrote&rdquo;, and it refuses to
                  run without them. If you run it first you get an error on your very first
                  click, which looks like a broken install and is not.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint"
                />
                <span>
                  <span className="font-medium text-ink">Your time zone</span>, under{" "}
                  <em>File → Settings</em>. A copied sheet keeps the time zone of whoever
                  built it, and Blotter counts days from midnight in whatever that says. Get
                  it wrong and the day counts are quietly off by one, in a way that looks
                  completely normal.
                </span>
              </li>
            </ul>
            <p>
              Then add your contacts — a name and an email address each — and click{" "}
              <strong className="font-semibold text-ink">
                Blotter → Start automatic updates
              </strong>
              . That is the whole setup.
            </p>
            <p>
              One small thing worth knowing: paste email addresses rather than typing them
              where you can. A hyphen your keyboard autocorrects into a dash is not the
              hyphen an email address uses, and Blotter will not be able to match it.
            </p>
            <Shot caption="the Start here tab" />
          </Step>

          <Step n="06" title="If something looks wrong">
            <p>
              Three things account for most of it, and all three are visible in the sheet
              rather than something you have to guess at.
            </p>
            <ul className="space-y-3">
              {[
                [
                  "A row is stuck on Not emailed",
                  "Blotter cannot read that email address — usually an autocorrected hyphen. Settings → Last run warnings names the row.",
                ],
                [
                  "Nothing is updating",
                  "Check Settings → Last successful run. If it is old, run Blotter → Step 2 by hand and read the message it gives you.",
                ],
                [
                  "Every row looks wrong",
                  "Check that Settings → “Pretend today is” is empty. It is a testing setting, and a date left in it makes every status answer a day that is not today.",
                ],
              ].map(([label, why]) => (
                <li key={label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint"
                  />
                  <span>
                    <span className="font-medium text-ink">{label}</span>
                    <br />
                    {why}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              If none of that is it, write to us. Your Settings tab has a{" "}
              <strong className="font-semibold text-ink">Blotter ID</strong> in it — quote
              that and we can look up what your sheet actually did, which is much faster
              than describing it.
            </p>
            <p>
              <Link
                href="/contact"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                Send us a message
              </Link>{" "}
              or write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Step>
        </div>
      </main>
    </div>
  );
}
