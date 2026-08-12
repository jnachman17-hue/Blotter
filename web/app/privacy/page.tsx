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
 * Jon answered all of them on August 6, 2026, so the markers are gone and the
 * page states only settled facts.
 *
 * Every substantive claim is either his answer or is imported from
 * `lib/privacy-copy.ts`, which Section 6 also renders, so the two surfaces
 * cannot contradict each other.
 *
 * **If a fact here stops being true, mark it — do not leave it standing.** The
 * two most likely to move are the connection provider and the Google scopes,
 * and both are claims someone would be entitled to rely on.
 *
 * **The landing page is a demand test and stays in the present tense.** Jon
 * ruled on August 6, 2026 that Section 6 is not to be hedged: presenting the
 * product as real is the instrument, and a visitor who has to work to discover
 * it is unbuilt is precisely what makes the intent signal meaningful. That is
 * his call and it is a normal way to validate a product.
 *
 * This page is where that stops. Article 03 states plainly what happens today,
 * because real people are handing over real email addresses now and real
 * analytics are being collected now. Everything after article 03 describes the
 * launch. **If what is collected changes, article 03 changes first.**
 *
 * Indexing. This page still sets `robots: { index: false, follow: false }`
 * below, and that is now the only thing holding it back: `app/robots.ts` was
 * deleted on August 11, 2026 and `app/layout.tsx` opened the site to indexing
 * site-wide. The reference to a robots file in this comment was stale and is
 * corrected here.
 *
 * ⚠ OPEN QUESTION FOR JON, raised August 12, 2026. The `noindex` on this page
 * and on `/contact` predates that change and looks like an oversight rather
 * than a decision — the runbook's "Indexing was turned on" section discusses
 * only the `/review/*` routes. A privacy policy that search cannot reach, on an
 * indexed site that collects email addresses and links here from a live form,
 * is worth a deliberate ruling either way. **Left as it is, because publication
 * posture is your call, not a defect to quietly fix.**
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
  PROVIDER_HEADING,
  PROVIDER_BODY,
} from "@/lib/privacy-copy";

export const metadata: Metadata = {
  title: "Privacy policy | Blotter",
  robots: { index: false, follow: false },
};

/** Set by Jon on August 6, 2026. Bump when the policy is materially revised. */
const EFFECTIVE_DATE = "August 6, 2026";

/**
 * Split from `EFFECTIVE_DATE` on August 12, 2026, when article 03 gained the
 * contact-form paragraph. The page has always rendered two labels — "Effective
 * date" and "Last updated" — from one constant, so revising the text forced a
 * choice between restating when the policy took effect (it did not change) and
 * leaving a revision date that was wrong. Two constants is the honest answer.
 */
const LAST_UPDATED = "August 12, 2026";

/**
 * The Google authorisation scopes Blotter requests, with the exact wording
 * Google shows for each on its own consent screen.
 *
 * Researched from Google's scope documentation on August 6, 2026 at Jon's
 * instruction. The descriptions are Google's, quoted so a reader can match this
 * page against the screen they are actually looking at.
 *
 * ⚠ CLAIM GATE. These are the correct scopes for what Section 6 claims, but no
 * integration exists and none has been requested from Google yet.
 *
 *   gmail.readonly is a restricted scope and the only Gmail scope that permits
 *   reading a message body. gmail.metadata would not, so it cannot support
 *   matched-message processing. Its description — "View your email messages and
 *   settings" — is precisely why the page has to explain that Google's
 *   permission sounds broader than Blotter's processing boundary.
 *
 *   calendar.events.readonly is read-only, which is what makes the four
 *   Calendar `Cannot do` claims true rather than merely intended.
 *
 *   drive.file, not spreadsheets. The `spreadsheets` scope grants every
 *   spreadsheet in the account and would contradict the ratified claims that
 *   Blotter cannot access or modify unrelated files. drive.file is limited to
 *   files the user picks or Blotter creates, which is the same boundary the
 *   page states.
 */
const SCOPES = [
  {
    service: "Gmail",
    scope: "gmail.readonly",
    google: "View your email messages and settings.",
  },
  {
    service: "Google Calendar",
    scope: "calendar.events.readonly",
    google: "View events on all your calendars.",
  },
  {
    service: "Google Sheets",
    scope: "drive.file",
    google:
      "See, edit, create, and delete only the specific Google Drive files you use with this app.",
  },
];

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
          <Link
            href="/#privacy"
            className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            Back to Blotter
          </Link>
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
              Blotter is still in development and is not yet connected to anyone&rsquo;s
              Google account.
            </strong>{" "}
            Two things are already true today, and section 3 sets them out in full: if you
            give us your email address, we store it, and we record how this site is used.
            Nothing reads your Gmail, Calendar or Sheets, because that connection does not
            exist yet.
          </p>
          <p className="mt-3 text-body leading-[1.62] text-ink">
            The rest of this policy describes how your information will be handled once the
            product launches. Details will change as it is built: service providers, storage
            locations and specific practices may all be revised, and this page will be
            updated when they are.
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
          <Article n="03" title="What happens today">
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
            <p>
              No payment has been taken from anyone and no card details are collected
              anywhere on this site.
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

          <Article n="04" title="Information we collect">
            <p>We collect three kinds of information.</p>
            <p>
              <strong className="font-semibold text-ink">Account information</strong> you give
              us directly: the email address you sign up with, and the information needed to
              maintain your account and subscription.
            </p>
            <p>
              <strong className="font-semibold text-ink">Google account information</strong>{" "}
              you authorise us to access: Gmail, Google Calendar and Google Sheets, limited to
              what sections 4 and 5 describe.
            </p>
            <p>
              <strong className="font-semibold text-ink">Usage information</strong> generated
              when you use the product, such as device and browser type, approximate location
              derived from an IP address, and the pages and features you use. Blotter uses
              PostHog for product analytics. Your email address is never sent to analytics.
            </p>
          </Article>

          <Article n="05" title="What we access in your Google account">
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
              These are the authorisation scopes Blotter requests, and the wording Google
              shows for each on its consent screen.
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
                </li>
              ))}
            </ul>
            <p>
              The Gmail scope is the reason Google&rsquo;s consent screen sounds broader than
              what Blotter does. Google does not offer a Gmail permission limited to the
              contacts in your tracker, so the narrower boundary is enforced in
              Blotter&rsquo;s own processing, as section 5 describes. The Sheets permission is
              limited to files you choose or that Blotter creates, which is why Blotter cannot
              reach the rest of your Drive.
            </p>
          </Article>

          {/*
            The four processing steps, in full.

            Section 6 draws these as a flow with four short captions; this is
            where the exact sentences live now. Jon's instruction of August 6,
            2026: the back page does not need to be pretty, it needs to explain
            what we do in paragraphs, and the content already exists.
          */}
          <Article n="06" title="How Blotter decides what to read">
            <p>
              Every message goes through the same check before any of its content is
              processed.
            </p>
            {PROCESSING_STEPS.map((step) => (
              <p key={step.n}>
                <strong className="font-semibold text-ink">{step.title}.</strong> {step.body}
              </p>
            ))}
            <p>
              <strong className="font-semibold text-ink">{BROAD_HEADING}.</strong>{" "}
              {BROAD_BODY}
            </p>
          </Article>

          <Article n="07" title="How we use the information">
            <p>
              We use it to operate Blotter: to identify recruiting activity involving the
              contacts in your tracker, to maintain the status, timing, scheduled calls and
              next actions in your Google Sheet, to run your account and subscription, to
              provide support, and to keep the service working and secure.
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

          <Article n="08" title="What we keep">
            {KEEPS_BODY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{KEEPS_CALENDAR}</p>
            {/*
              Jon's ruling, August 6, 2026: Blotter keeps nothing after the
              account goes. That is a stronger commitment than the retention
              schedule this article used to defer, and it is the whole answer —
              so the placeholder is gone rather than filled in.
            */}
            <p>
              We keep this information for as long as your account exists, because it is what
              keeps your tracker current. We do not keep it afterwards. When you delete your
              Blotter account, the recruiting information associated with it is deleted.
            </p>
          </Article>

          <Article n="09" title="What we do not do">
            <List items={COMMITMENTS} />
          </Article>

          {/*
            §13's own visible heading. Section 6 dropped it when the provider
            block became a footnote, so it lives here, where the provider detail
            now is — and it beats the invented heading this article carried.
          */}
          <Article n="10" title={PROVIDER_HEADING}>
            {PROVIDER_BODY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {/* Named by Jon on August 6, 2026. */}
            <p>
              We also rely on a small number of service providers to run Blotter:{" "}
              <strong className="font-semibold text-ink">Supabase</strong> for hosting and
              database storage, <strong className="font-semibold text-ink">PostHog</strong> for
              product analytics, and{" "}
              <strong className="font-semibold text-ink">Stripe</strong> for payments. Stripe
              handles card details directly; Blotter never receives or stores them. Where each
              provider processes data is set out in section 12.
            </p>
            <p>
              We do not sell your data. We may disclose information if we are legally required
              to, or to protect the rights and safety of users and the public.
            </p>
          </Article>

          <Article n="11" title="Your choices">
            <p>{DELETION_STATEMENT}</p>
            <p>
              You can also revoke Blotter&rsquo;s access directly from your Google account
              security settings at any time, independently of Blotter.
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
              is also the one that cannot come back as a false claim. Do not add
              SOC 2, ISO, CASA or `bank-grade` language here — the CASA
              assessment on the provider block belongs to the connection
              provider's Google application, not to Blotter.
            */}
            <p>
              We use technical and organisational measures intended to protect the information
              we hold, and we rely on established providers that maintain their own security
              programmes. No service can promise perfect security.
            </p>
            {/*
              Jon's revision, August 6, 2026: keep the plain admission, drop the
              promise after it, and say what actually carries the weight.

              Careful with this paragraph. The CASA assessment belongs to the
              connection provider's Google application, not to Blotter, and the
              sentence has to keep saying so. Do not compress it into anything
              that reads as Blotter holding a Google licence or certification.
            */}
            <p>
              Blotter itself holds no security certification or third-party audit. The work
              that most needs one is not done by us: the connection to your Google account is
              handled by a specialist provider whose entire business is building and securing
              these integrations, whose Google application has passed Google&rsquo;s CASA
              security assessment, and who is verified by Google for the permissions Blotter
              requests. The services that store and process information on our behalf maintain
              their own security programmes and independent assessments.
            </p>
          </Article>

          <Article n="13" title="Where information is processed">
            <p>
              Your information is stored and processed in the United States. Blotter does not
              operate outside the United States, and we do not transfer your information
              elsewhere.
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
