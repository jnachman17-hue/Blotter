/**
 * The privacy policy.
 *
 * Authority: Jon's instruction of August 6, 2026. `06-SECTION-6-DATA-AND-PRIVACY.md`
 * §15 requires a real destination for `Read the full privacy policy` before
 * public traffic but ratifies no policy text, so no spec governs the words on
 * this page. Jon ruled that it takes a conventional policy structure, written
 * broadly, on the grounds that no product is being offered yet and the language
 * will be drafted and ratified by him later.
 *
 * The rule this page was built on: **structure may be conventional, facts may
 * not be invented.** It shipped with every unknown marked in place as a visible
 * `[ to be confirmed: … ]` slot rather than filled with a plausible value.
 * Jon answered all of them on August 6, 2026, so the markers are gone.
 *
 * ## ⚠ The lesson of September 3, 2026, and it is the important part of this file
 *
 * Removing the markers is what made the next failure possible.
 * `28-WEBSITE-AUDIT.md` found that **several of the settled answers had since
 * become false, and nothing on the page marked them** — the connection
 * provider, the CASA assessment, the Google scopes, the retention promise and
 * the deletion mechanism. A visible `[ to be confirmed ]` is honest about not
 * knowing. A confidently wrong sentence is not, and it is the one a stranger
 * relies on.
 *
 * **So the instruction at the foot of this comment is the whole point of it**,
 * and it had been sitting here, unobeyed, the entire time. Obey it.
 *
 * Rewritten throughout on Jon's ruling, September 3, 2026, against
 * `04-ENGINE-RULES.md` v7, `05-CONTRACT.md` v4, `courier/appsscript.json` and
 * the consent screens transcribed in `17-INSTALL-OBSERVED.md` §1.
 *
 * Every substantive claim is either his answer or is imported from
 * `lib/privacy-copy.ts`, which Section 6 also renders, so the two surfaces
 * cannot contradict each other.
 *
 * **If a fact here stops being true, mark it — do not leave it standing.** The
 * ones most likely to move now are the Google scopes, which change if
 * `courier/appsscript.json` changes, and what is recorded in section 3, which
 * changes whenever a table is added. Both are claims someone would be entitled
 * to rely on.
 *
 * **The landing page presents the product as real, and it now is.** Jon ruled
 * on August 6, 2026 that Section 6 was not to be hedged, because presenting the
 * product as real was the instrument of a demand test. That ruling has outlived
 * the hedge it authorised: the engine is built, the courier installs, and a
 * sheet is running. The present tense is now simply accurate.
 *
 * Article 03 states plainly what happens today, because real people are handing
 * over real email addresses now, real analytics are being collected now, and
 * every installed sheet now reports that it ran. **If what is collected changes,
 * article 03 changes first.** That rule was broken once already — telemetry
 * shipped and this article did not move with it — which is why it is repeated
 * here in bold rather than assumed.
 *
 * Indexing. **This page is indexable as of August 12, 2026**, before promotion.
 * It had carried `robots: { index: false, follow: false }` from before
 * `app/robots.ts` was deleted on August 11 and `app/layout.tsx` opened the site
 * site-wide, and the leftover was the only thing holding it back.
 *
 * The reasoning is the one that carried indexing itself: **recall.** A reader
 * who sees a post, does not click, and goes looking days later should be able
 * to find the data story — and this is a site that collects real email
 * addresses and links here from a live form. `13` recommends the same.
 *
 * **`/contact` deliberately stays `noindex`.** An indexed contact form attracts
 * scrapers and has no recall value; nobody searches for it, they follow the
 * link from here or from the footer.
 *
 * Production cannot be password-protected on Vercel's Hobby plan, so the live
 * URL is public rather than merely unlisted.
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import {
  BROAD_BODY,
  BROAD_HEADING,
  COMMITMENTS,
  DELETION_STATEMENT,
  KEEPS_BODY,
  KEEPS_CALENDAR,
  PERMISSIONS,
  PRIVACY_FAQ,
  PROCESSING_STEPS,
  HOSTING_HEADING,
  HOSTING_BODY,
  KEEPS_COUNTS,
} from "@/lib/privacy-copy";

export const metadata: Metadata = {
  title: "Privacy policy | Blotter",
  /* Indexable since August 12, 2026. See the indexing note in the header. */
};

/** Set by Jon on August 6, 2026. Bump when the policy is materially revised. */
const EFFECTIVE_DATE = "September 3, 2026";

/**
 * Split from `EFFECTIVE_DATE` on August 12, 2026, when article 03 gained the
 * contact-form paragraph. The page has always rendered two labels — "Effective
 * date" and "Last updated" — from one constant, so revising the text forced a
 * choice between restating when the policy took effect (it did not change) and
 * leaving a revision date that was wrong. Two constants is the honest answer.
 */
const LAST_UPDATED = "September 3, 2026";

/**
 * The Google authorisation scopes Blotter requests, with the exact wording
 * Google shows for each on its own consent screen.
 *
 * ## Rewritten September 3, 2026, and four of five rows had been wrong
 *
 * This list was researched from Google's *documentation* on August 6, 2026,
 * before anything was built, and it described an integration that was never
 * made. It named `calendar.events.readonly` and `drive.file`, and it listed
 * three permissions where a student is shown five.
 *
 * **These five are transcribed from two places that cannot be wrong about it:**
 * `courier/appsscript.json`, which is the manifest Google reads, and
 * `17-INSTALL-OBSERVED.md` §1, which is the consent screen transcribed from a
 * real install rather than from documentation.
 *
 * **This is the page's most checkable claim** — a reader can hold it against
 * the screen in front of them — and until today it did not survive being
 * checked. `28-WEBSITE-AUDIT.md` §1.7 has the comparison.
 *
 * `whatBreaks` is new, and it is the most useful column on the page. Every box
 * is unchecked by default, there is a `Select all` above them, and **nothing on
 * that screen says all five are required.** A cautious student ticking two gets
 * a product that fails in ways they cannot diagnose.
 */
const SCOPES = [
  {
    service: "Gmail",
    scope: "gmail.readonly",
    google: "View your email messages and settings.",
    whatBreaks: "Everything. Blotter cannot read any mail, so no status is ever right.",
  },
  {
    service: "Google Sheets",
    scope: "spreadsheets.currentonly",
    google:
      "View and manage spreadsheets that this application has been installed in.",
    whatBreaks: "Everything. Blotter cannot write to the sheet it lives in.",
  },
  {
    service: "Google Calendar",
    scope: "calendar.readonly",
    google: "See and download any calendar that you can access.",
    whatBreaks: "Scheduled calls, completed calls and cancelled calls all stop working.",
  },
  {
    service: "Connecting out",
    scope: "script.external_request",
    google: "Connect to an external service.",
    whatBreaks: "Everything. This is how the sheet reaches Blotter’s server to ask what your contacts’ statuses are.",
  },
  {
    service: "Running on a timer",
    scope: "script.scriptapp",
    google: "Allow this application to run when you are not present.",
    whatBreaks: "The 15-minute updates. You would have to run Blotter by hand every time.",
  },
];

/* --------------------------------------------------------------- primitives */

function Article({
  n,
  title,
  id,
  children,
}: {
  n: string;
  title: string;
  /** An anchor, where another page needs to point at this article. */
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-rule pt-8">
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

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((line) => (
        <li key={line} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint"
          />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------- page */

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-quiet">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-[60px] max-w-[900px] items-center justify-between px-6">
          <Link href="/" aria-label="Blotter, back to the home page" className="text-navy-900">
            <BlotterLockup size={22} />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/terms"
              className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
            >
              Terms
            </Link>
            <Link
              href="/#privacy"
              className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
            >
              Back to Blotter
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 pt-16 pb-28">
        <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
          Privacy policy
        </h1>
        <p className="mt-4 text-small text-ink-muted">
          Effective date {EFFECTIVE_DATE}
          <span className="mx-2 text-ink-faint">/</span>
          Last updated {LAST_UPDATED}
        </p>

        {/*
          The status notice.

          Jon's ruling of August 6, 2026: it may not say `draft`, because a
          draft reads as unofficial and this policy is in force.

          Revised the same day once collection went live. It used to say no
          one's data was being processed, which stopped being true the moment
          Supabase and PostHog were connected. It now separates the two claims
          that matter: the Google connection does not exist, and email and usage
          data are already being collected.
        */}
        <div className="mt-8 border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
          <p className="text-body leading-[1.62] text-ink">
            <strong className="font-semibold">
              Blotter is built and working, and it is not yet open to other people.
            </strong>{" "}
            It is running today on the account of the person who made it, and nobody
            else has been given a copy. When that changes, this page changes with it.
          </p>
          <p className="mt-3 text-body leading-[1.62] text-ink">
            <strong className="font-semibold">
              The short version of how it handles your data:
            </strong>{" "}
            Blotter is a Google Sheet with a script inside it. The script runs in
            your own Google account, on your own permission. It reads only the
            conversations that already involve someone in your contact list, and the
            text of an email never leaves your account. Blotter&rsquo;s server keeps
            no database and stores nothing about you. Section 3 sets out the two
            small things that are recorded, and section 5 sets out exactly what
            Google will ask you for.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <Article n="01" title="Who this policy is from">
            <p>
              This policy explains how Blotter handles information when you connect your
              Google account and use Blotter to maintain your recruiting tracker.
            </p>
            <p>
              {/*
                No registered address: Jon confirmed on August 6, 2026 that
                there is a legal entity but no address to publish, so none is
                asserted.
              */}
              Blotter is referred to here as &ldquo;Blotter&rdquo;, &ldquo;we&rdquo; and
              &ldquo;us&rdquo;. You can reach us at{" "}
              <a
                href="mailto:blotterib@gmail.com"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                blotterib@gmail.com
              </a>.
            </p>
          </Article>

          <Article n="02" title="What this policy covers">
            <p>
              It covers the Blotter product and this website. It does not cover Google, your
              email provider, or any other service you connect to or reach through a link,
              each of which has its own policy.
            </p>
          </Article>

          {/*
            The one article that describes the present rather than the launch.

            Jon's ruling of August 6, 2026: Section 6 and the rest of this
            policy stay in the present tense, because the landing page is a
            demand test and hedging it would destroy the instrument being
            measured. That is his call and it is a normal way to validate a
            product.

            What is not optional is this: real people are handing over real
            email addresses today, and real analytics are being collected. A
            policy that says "we are not processing anyone's data" while a
            Supabase table fills up with addresses is the one statement here
            that could actually mislead somebody. So this article says plainly
            what happens now, and everything after it describes the launch.

            **Keep this accurate.** If collection changes, change this first.
          */}
          <Article n="03" title="What happens today" id="telemetry">
            <p>
              Blotter is still being built. The connection to Gmail, Calendar and Google
              Sheets described in the rest of this policy is not active, and nothing has
              access to your Google account.
            </p>
            <p>
              Three things do happen now.
            </p>
            <p>
              <strong className="font-semibold text-ink">If you give us your email address</strong>{" "}
              at the end of the sign-up flow, we store it, together with what you told us
              about what you are recruiting for and your recruiting window, which link you
              arrived through, and how far through the flow you went. It is stored in our
              database, run by Supabase in the United States.
            </p>
            <p>
              <strong className="font-semibold text-ink">We record how this site is used</strong>{" "}
              through PostHog, in the United States: pages viewed, which steps of the sign-up
              flow were reached, your device and browser type, approximate location derived
              from your IP address, and where you arrived from. Your email address is never
              attached to this usage data.
            </p>
            {/*
              Added August 12, 2026. The contact form shipped on August 11 and
              this article did not move with it, which broke the standing rule
              at the top of this file: if what is collected changes, article 03
              changes first. The form's own footnote tells readers this policy
              covers what happens to their address, so until this paragraph
              existed that was a promise the page did not keep.

              ⚠ NOT YET RATIFIED BY JON. Every other substantive sentence in
              this policy is his wording or imported from `lib/privacy-copy.ts`.
              This one states only what `app/api/contact/route.ts` and
              `supabase/004-contact-messages.sql` actually do — the columns are
              email, name, message, source_path, session_id, visitor_id — but
              the words are unreviewed and he should confirm them.
            */}
            <p>
              <strong className="font-semibold text-ink">If you send us a message</strong>{" "}
              using the contact form, we store the message, the address you gave us to reply
              to, your name if you chose to give one, and which page you were on when you
              wrote. It is stored in the same database, run by Supabase in the United States,
              and it is used to answer you and for nothing else.
            </p>
            {/*
              Added September 3, 2026, and it was overdue rather than
              pre-emptive. `POST /api/telemetry` has been live since the
              distribution work and this article did not move with it, which
              broke the standing rule at the top of this file. `28-WEBSITE-AUDIT.md`
              §1.15 found it.

              **Worded to cover the billing table as well as the install table.**
              A parallel chat built billing behind a flag while this was being
              written, so the paragraph describes the boundary — an id and
              counts, nothing about a person — rather than a list of tables that
              would go stale the next time one is added.

              The allow-list in the route is what makes this true rather than
              intended, and a self-test asserts the payload contains no `@`,
              `name`, `subject`, `body`, `firm` or `email` anywhere in its
              serialised form.
            */}
            <p>
              <strong className="font-semibold text-ink">If you install Blotter</strong>{" "}
              in a spreadsheet, that copy generates a random identifier, a string of
              characters that identifies the sheet and nothing about you, and sends it to us each time it runs, together with the time of the run,
              how long it took, how many contacts were in the sheet, whether it
              succeeded, and which version of Blotter it is. That is the whole list. No
              name, no email address, no subject line, no message, no contact, and no
              firm ever goes with it. We use it to see how many sheets are running and
              to notice when a version starts failing, so that a widespread problem is
              not something we first hear about from the person it broke. It is stored
              in the same database, run by Supabase in the United States. You can switch
              it off by clearing the usage-counting address in the sheet&rsquo;s Settings
              tab; nothing else stops working if you do.
            </p>
            <p>
              No payment has been taken from anyone and no card details are collected
              anywhere on this site. If paid access is switched on later, a key issued to
              you would be stored against that same identifier so we can tell whether a
              sheet has access. Nothing else about you would be stored with it, and this
              page will say so before it happens.
            </p>
            <p>
              If you would like the email address you gave us deleted, write to{" "}
              <a
                href="mailto:blotterib@gmail.com"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                blotterib@gmail.com
              </a>{" "}
              and we will remove it.
            </p>
          </Article>

          {/*
            Rewritten September 3, 2026. Two of the three old categories
            described a hosted service with user accounts and a server-side copy
            of Google data. Neither exists. `28-WEBSITE-AUDIT.md` §1.14.
          */}
          <Article n="04" title="Information we collect">
            <p>
              Less than you would expect, and the reason is architectural rather than a
              policy we have adopted.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                There is no Blotter account.
              </strong>{" "}
              You do not sign up, choose a password, or hand us a login. Blotter is a
              spreadsheet you copy, and the script inside it runs on the permission you
              give it in your own Google account.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                Your Google data does not come to us and is not stored by us.
              </strong>{" "}
              The script reads your mail and calendar inside your own account. To work
              out what each conversation means it sends us a short list of facts, set out
              in full in section 6, and we send back the answer and keep no record of
              either.
            </p>
            <p>
              <strong className="font-semibold text-ink">What we do hold</strong> is the
              three things section 3 lists — an email address if you gave us one, website
              usage through PostHog, and a message if you sent one — plus the anonymous
              per-sheet identifier and run counts described there. Your email address is
              never sent to analytics.
            </p>
          </Article>

          <Article n="05" title="What we access in your Google account" id="permissions">
            <p>
              The permissions Blotter requests, and the limits on each, are the following.
            </p>
            {PERMISSIONS.map((row) => (
              <div key={row.service}>
                <p className="font-semibold text-ink">{row.service}</p>
                <p className="mt-2">Blotter can:</p>
                <div className="mt-2">
                  <List items={row.can} />
                </div>
                <p className="mt-3">Blotter cannot:</p>
                <div className="mt-2">
                  <List items={row.cannot} />
                </div>
              </div>
            ))}
            {/*
              The scopes, with Google's own consent-screen wording beside them.
              This is the page's most checkable claim: a reader can hold it up
              against the screen Google actually shows them.
            */}
            <p>
              Google will show you a screen headed{" "}
              <strong className="font-semibold text-ink">
                Select what Blotter can access
              </strong>{" "}
              with five checkboxes on it. These are those five, in the words Google uses,
              with what each one is for.{" "}
              <strong className="font-semibold text-ink">
                All five are required, none of them is ticked by default, and nothing on
                that screen tells you either of those things.
              </strong>{" "}
              There is a <em>Select all</em> link above them, and that is the one to use.
            </p>
            <ul className="space-y-3.5">
              {SCOPES.map((s) => (
                <li key={s.scope}>
                  <span className="font-semibold text-ink">{s.service}</span>{" "}
                  <code className="rounded-[3px] bg-white px-1.5 py-0.5 font-mono text-[0.85em] text-ink-muted">
                    {s.scope}
                  </code>
                  <br />
                  <span className="text-ink-faint">Google shows: &ldquo;{s.google}&rdquo;</span>
                  <br />
                  <span className="text-ink-faint">Without it: {s.whatBreaks}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong className="font-semibold text-ink">
                Three of the five are read-only.
              </strong>{" "}
              Blotter has no permission to send an email, reply to one, change or delete
              anything in your mailbox, or create, change or cancel a calendar event. Not as
              a promise, but because those permissions were never requested and cannot
              be used without being granted.
            </p>
            <p>
              The Gmail permission is worded broadly because Google does not offer one
              limited to the people in your contact list. What limits it is not a promise
              about our processing: the reading happens inside your own Google account,
              and the only thing that leaves it is the short list of facts in section 6.
            </p>
            <p>
              The spreadsheet permission is narrower than it may sound.{" "}
              <code className="rounded-[3px] bg-white px-1.5 py-0.5 font-mono text-[0.85em] text-ink-muted">
                spreadsheets.currentonly
              </code>{" "}
              grants the one spreadsheet the script is installed in, which is the copy you
              made. Blotter cannot see that any other file in your Drive exists, cannot
              open one, and cannot create one.
            </p>
            {/*
              Google's own line on that screen, quoted because it is the moment a
              reader most wants a privacy policy and Google will not show them
              one. `17-INSTALL-OBSERVED.md` §1 transcribes it.
            */}
            <p>
              You may also see a line reading{" "}
              <em>
                &ldquo;Learn why you&rsquo;re not seeing links to Blotter&rsquo;s Privacy
                Policy or Terms of Service&rdquo;
              </em>
              . That is because Google only shows those links for apps it has reviewed,
              and it has not reviewed a script you installed into your own account. This
              page is that privacy policy, and there is a link to it from every page of
              this site.
            </p>
          </Article>

          {/*
            The four processing steps, in full.

            Section 6 draws these as a flow with four short captions; this is
            where the exact sentences live now. Jon's instruction of August 6,
            2026: the back page does not need to be pretty, it needs to explain
            what we do in paragraphs, and the content already exists.
          */}
          {/*
            Rewritten September 3, 2026 with `PROCESSING_STEPS`. The old four
            steps described sender matching, which the engine does not do — it
            reads whole conversations, because sender matching missed 29% of
            real incoming mail (`04-ENGINE-RULES.md` §2).

            **The exhaustive list of what crosses the wire is new**, and it is
            the most important paragraph on this page. A list that is nearly
            complete is worse than no list: a reader who finds the missing item
            stops believing everything around it. It is transcribed from
            `web/app/api/engine/types.ts`, which is the contract itself.
          */}
          <Article n="06" title="What Blotter reads, and what it cannot">
            <p>
              Blotter follows conversations, not senders. A thread counts if any message
              in it has one of your contacts on the From, To or Cc line — which is what
              lets an assistant replying on a banker&rsquo;s behalf update that
              banker&rsquo;s row. A conversation with none of your contacts in it is never
              opened.
            </p>
            {PROCESSING_STEPS.map((step) => (
              <p key={step.n}>
                <strong className="font-semibold text-ink">{step.title}.</strong> {step.body}
              </p>
            ))}
            <p>
              <strong className="font-semibold text-ink">
                This is the complete list of what is sent to us, per message:
              </strong>{" "}
              who it was from, who it was addressed to, who was copied, the date and
              time, the subject line, and whether you sent it. For calendar events: the
              title, the start and end time, who was invited, who organised it, and who
              declined. For your contacts: the name, firm and email addresses you typed
              into the sheet yourself.
            </p>
            <p>
              <strong className="font-semibold text-ink">
                The body of an email is never sent.
              </strong>{" "}
              It is not sent and discarded — it is not sent. Our server rejects any
              request that arrives carrying message text, before it looks at anything
              else. The one exception proves the rule: when an email bounces, the
              delivery-failure notice from the mail system is read inside your own
              account to find which address failed, and only that address is sent.
            </p>
            <p>
              <strong className="font-semibold text-ink">{BROAD_HEADING}.</strong>{" "}
              {BROAD_BODY}
            </p>
          </Article>

          <Article n="07" title="How we use the information">
            <p>
              We use it to operate Blotter: to work out the status, timing and scheduled
              calls for the contacts in your sheet, to answer you if you write to us, and
              to see whether Blotter is working for the people using it.
            </p>
            {/* The sender check is stated in full in the article above. */}
            <p>
              We do not use your Google account data to build advertising profiles, and we do
              not sell personal data.
            </p>
            <p>
              Blotter&rsquo;s use of information received from Google APIs will adhere to the
              Google API Services User Data Policy, including its Limited Use requirements.
            </p>
          </Article>

          {/*
            Rewritten September 3, 2026, and the answer got much shorter.

            Jon's August 6 ruling was that Blotter keeps nothing after the
            account goes — a stronger commitment than the retention schedule the
            article had deferred. **The truth is stronger again: there is no
            account, and the part of the server that handles your mail's facts
            writes nothing down at any point.**

            ⚠ **Word this precisely.** `web/app/api/engine/route.ts` performs no
            write, ever — its own comment says so and calls it amendment A2 —
            but since the billing work it can *read* one row to check whether a
            sheet's key is active. So "the engine has no database" stopped being
            an accurate sentence, and "it writes nothing down" is the one that
            is. The distinction is small, and it is exactly the kind that turns
            a good claim into a false one while nobody is looking.

            `KEEPS_COUNTS` is the exception, stated in the same block rather
            than a footnote. A "we keep nothing" claim with an unmentioned
            exception is worse than no claim at all.
          */}
          <Article n="08" title="What we keep">
            {KEEPS_BODY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{KEEPS_COUNTS}</p>
            <p>{KEEPS_CALENDAR}</p>
            <p>
              The email address you gave us, and any message you sent us, we keep until
              you ask us to delete them. Ask, and we will.
            </p>
            {/*
              Stated because it is the honest completion of "we keep nothing",
              and because a reader who later discovers a `blotter_keys` table
              should find it described here rather than feel they caught us.
              Enforcement is off today — `enforcing()` reads one variable and
              `GET /api/entitlement` reports the same call — which is why this
              is worded as a conditional.
            */}
            <p>
              If paid access is switched on later, the server would also check whether a
              sheet&rsquo;s key is active before answering it. That is a look-up rather
              than a record: it reads a row and writes nothing.
            </p>
          </Article>

          <Article n="09" title="What we do not do">
            <p>
              Each of these can be checked.{" "}
              <Link
                href="/audit#package"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                The audit page shows how.
              </Link>
            </p>
            <List items={COMMITMENTS} />
          </Article>

          {/*
            §13's own visible heading. Section 6 dropped it when the provider
            block became a footnote, so it lives here, where the provider detail
            now is — and it beats the invented heading this article carried.
          */}
          {/*
            **This article used to be the connection provider**, and it said
            Blotter reached Google through a third party whose Google
            application had passed CASA. There is no provider. Deleted on Jon's
            ruling, September 3, 2026 — `28-WEBSITE-AUDIT.md` §0.

            What replaces it answers the same question, which is a fair one: who
            else is involved in this? The answer for the Google connection is
            nobody, and the answer for the website is three named companies.
          */}
          <Article n="10" title={HOSTING_HEADING}>
            {HOSTING_BODY.map((line: string) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              For this website and the small amount of information section 3 describes, we
              rely on{" "}
              <strong className="font-semibold text-ink">Supabase</strong> for database
              storage and <strong className="font-semibold text-ink">PostHog</strong> for
              website analytics, both in the United States, and{" "}
              <strong className="font-semibold text-ink">Vercel</strong> to host the site
              and the server that works out your contacts&rsquo; statuses. If paid access
              is switched on later, card payments would be handled by{" "}
              <strong className="font-semibold text-ink">Stripe</strong> directly and
              Blotter would never receive or store card details. No payment is being taken
              from anyone today.
            </p>
            <p>
              We do not sell your data. We may disclose information if we are legally
              required to, or to protect the rights and safety of users and the public.
            </p>
          </Article>

          <Article n="11" title="Your choices">
            <p>{DELETION_STATEMENT}</p>
            <p>
              That is done from your own Google account&rsquo;s security settings, under
              the list of apps with access — not from anything of ours, and without
              telling us. It takes effect immediately.
            </p>
            <p>
              You can also simply delete the spreadsheet. It is an ordinary file in your
              own Google Drive, nothing about it was ever copied anywhere else, and
              deleting it is the end of it.
            </p>
            {/*
              The jurisdiction-by-jurisdiction rights table is dropped on Jon's
              instruction of August 6, 2026. What replaces it is not a weaker
              promise but a simpler one: ask, and we will do it. That is
              answerable today, where a list of statutory rights is not.
            */}
            <p>
              You can ask us for a copy of the information we hold about you, ask us to correct
              it, or ask us to delete it, and we will. Depending on where you live you may also
              have rights under local privacy law to object to or restrict some processing;
              contact us and we will honour them.
            </p>
          </Article>

          <Article n="12" title="Keeping information safe">
            {/*
              Jon confirmed on August 6, 2026 that Blotter holds no audits or
              certifications. Saying so plainly is the only honest option, and it
              is also the one that cannot come back as a false claim.

              **That instinct was right and the paragraph below it undid it**,
              which is why the deletion note on the next block is as long as it
              is. Do not add SOC 2, ISO, CASA or `bank-grade` language here.
            */}
            <p>
              We use technical and organisational measures intended to protect the
              information we hold.
            </p>
            {/*
              ⚠ **THE WORST PARAGRAPH THIS SITE EVER SHIPPED STOOD HERE**, and
              the replacement should be read against it before anybody edits
              this again.

              It said the connection to your Google account was handled by a
              specialist provider whose Google application had passed CASA "and
              who is verified by Google for the permissions Blotter requests."

              **There is no provider, and Google tells the student the exact
              opposite thirty seconds later.** `17-INSTALL-OBSERVED.md` §1: the
              screen reads *"Google hasn't verified this app."* A reader who
              trusted this page and then met that screen had been told two
              contradictory things at the one moment they could not ask anybody.

              Deleted on Jon's ruling, September 3, 2026.
              `28-WEBSITE-AUDIT.md` §0 is the account.

              **The rule that replaces it:** the honest security story here is
              that there is very little to secure, because very little is held.
              Do not add SOC 2, ISO, CASA or "bank-grade" language. Do not
              describe anything as verified by Google. If a claim of that shape
              ever becomes true, it will be because someone did the work, and
              they will have the paperwork to cite.
            */}
            <p>
              Blotter holds no security certification and has had no third-party audit,
              and we would rather say so than imply otherwise.{" "}
              <strong className="font-semibold text-ink">
                Google has not reviewed or verified Blotter
              </strong>
              . If you install it into a personal Gmail account, Google says so on the way
              in, on a screen headed &ldquo;Google hasn&rsquo;t verified this app&rdquo;.
              The developer it names is you, because the copy is yours. A university
              account does not see that screen: Google waives it when the owner of the
              copy and the person running it are in the same organisation, and you are
              both.
            </p>
            <p>
              What carries the weight here is not a certificate. It is that there is very
              little to protect: your mail is never copied out of your Google account,
              the text of an email never reaches us, and our server keeps no database. The
              small amount described in section 3 is held by established providers who
              maintain their own security programmes. No service can promise perfect
              security, and anyone who does is worth doubting.
            </p>
          </Article>

          <Article n="13" title="Where information is processed">
            <p>
              The information described in section 3 is stored and processed in the United
              States. Blotter does not operate outside the United States, and we do not
              transfer your information elsewhere.
            </p>
            <p>
              Your mail and calendar are a separate matter, and a simpler one: they stay
              where they already are, inside your own Google account, and are read there.
              Google&rsquo;s own terms and its own storage locations govern them, not ours.
            </p>
          </Article>

          <Article n="14" title="Age">
            <p>
              Blotter is built for university students and graduates recruiting for finance
              roles. You must be 18 or older to hold a Blotter account, and we do not
              knowingly collect information from anyone under 18.
            </p>
          </Article>

          <Article n="15" title="Changes to this policy">
            <p>
              Blotter is still being built, so this policy will change as it is: providers,
              storage locations and specific practices may all be revised. We will update this
              page when they are, and the date at the top will always show when the current
              version took effect. If a change materially affects how we handle your
              information, we will tell account holders by email before it takes effect.
            </p>
          </Article>

          <Article n="16" title="Contact">
            <p>
              Questions about this policy or your data can be sent to{" "}
              <a
                href="mailto:blotterib@gmail.com"
                className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
              >
                blotterib@gmail.com
              </a>.
            </p>
          </Article>

          {/*
            The seven privacy questions, relocated here from Section 6 by Jon on
            August 6, 2026. Every answer restated something the landing page had
            already said, and on a section he judged unreadably long they were
            204 words carrying no new fact.

            They are moved, not withdrawn — and this is where the reader who
            actually wants them arrives. Rendered open rather than in accordions:
            a policy page is read, not scanned, and there is nothing here worth
            hiding behind a click.
          */}
          <Article n="17" title="Common questions">
            {PRIVACY_FAQ.map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-ink">{item.q}</p>
                <p className="mt-1.5">{item.a}</p>
              </div>
            ))}
          </Article>
        </div>
      </main>
    </div>
  );
}
