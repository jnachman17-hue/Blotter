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
 * The rule this page is built on: **structure may be conventional, facts may
 * not be invented.**
 *
 * Every substantive statement below is either traceable to Section 6's ratified
 * copy, imported from `lib/privacy-copy.ts` so the two cannot contradict each
 * other, or marked with `<Pending>` — a visible slot for a fact that does not
 * exist yet. There is no legal entity, no jurisdiction, no retention schedule,
 * no selected connection provider, no subprocessor list and no contact address,
 * so none of those is asserted. `06-assumptions-and-open-questions.md` lists
 * each one as an open gate.
 *
 * Do not fill a `<Pending>` slot with a plausible value. Every one of them is a
 * commitment about real user data that someone would be entitled to rely on.
 *
 * Publication gate: this page is `noindex` and the deployment stays private.
 * It is not a published policy and must not be treated as one until Jon
 * ratifies the language and the WS5 Phase 7 claim verification passes.
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import {
  COMMITMENTS,
  DELETION_STATEMENT,
  KEEPS_BODY,
  KEEPS_CALENDAR,
  PERMISSIONS,
  PRIVACY_FAQ,
  PROVIDER_BODY,
} from "@/lib/privacy-copy";

export const metadata: Metadata = {
  title: "Privacy policy | Blotter",
  robots: { index: false, follow: false },
};

/* --------------------------------------------------------------- primitives */

/**
 * A fact that does not exist yet.
 *
 * Deliberately loud. A placeholder that blends into the paragraph is a
 * placeholder that ships, and this page is one where a shipped placeholder
 * becomes a false statement about someone's email.
 */
function Pending({ children }: { children: React.ReactNode }) {
  return (
    <mark className="mx-0.5 rounded-[3px] bg-blotter-200 px-1.5 py-0.5 text-[0.9em] font-medium text-blotter-700">
      [ to be confirmed: {children} ]
    </mark>
  );
}

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
          Effective date <Pending>effective date</Pending>
          <span className="mx-2 text-ink-faint">/</span>
          Last updated <Pending>last updated date</Pending>
        </p>

        {/*
          The draft notice. Honest rather than decorative: this policy is
          incomplete, the deployment is private, and a reader who somehow
          reaches it should not believe it governs anything yet.
        */}
        <div className="mt-8 border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
          <p className="text-body leading-[1.62] text-ink">
            <strong className="font-semibold">This policy is a working draft.</strong>{" "}
            Blotter is not yet available and is not processing anyone&rsquo;s data. Sections
            that depend on facts not yet settled are marked in place. This draft
            does not take effect until it is completed, dated and published.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <Article n="01" title="Who this policy is from">
            <p>
              This policy explains how Blotter handles information when you connect your
              Google account and use Blotter to maintain your recruiting tracker.
            </p>
            <p>
              Blotter is operated by <Pending>legal entity name</Pending> of{" "}
              <Pending>registered address</Pending>, referred to in this policy as
              &ldquo;Blotter&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo;. You can reach us
              at <Pending>contact address for privacy enquiries</Pending>.
            </p>
          </Article>

          <Article n="02" title="What this policy covers">
            <p>
              It covers the Blotter product and this website. It does not cover Google, your
              email provider, or any other service you connect to or reach through a link,
              each of which has its own policy.
            </p>
          </Article>

          <Article n="03" title="Information we collect">
            <p>We collect three kinds of information.</p>
            <p>
              <strong className="font-semibold text-ink">Account information</strong> you give
              us directly: the email address you sign up with, and the information needed to
              maintain your account and subscription.
            </p>
            <p>
              <strong className="font-semibold text-ink">Google account information</strong>{" "}
              you authorise us to access: Gmail, Google Calendar and Google Sheets, limited to
              what section 4 describes.
            </p>
            <p>
              <strong className="font-semibold text-ink">Usage information</strong> generated
              when you use the product, such as device and browser type, approximate location
              derived from an IP address, and the pages and features you use. The specific
              analytics provider and the categories it records are{" "}
              <Pending>analytics provider and the data it collects</Pending>.
            </p>
          </Article>

          <Article n="04" title="What we access in your Google account">
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
            <p>
              The exact Google authorisation scopes requested, and the wording Google shows on
              its consent screen, are <Pending>final Google scopes and consent wording</Pending>.
            </p>
          </Article>

          <Article n="05" title="How we use the information">
            <p>
              We use it to operate Blotter: to identify recruiting activity involving the
              contacts in your tracker, to maintain the status, timing, scheduled calls and
              next actions in your Google Sheet, to run your account and subscription, to
              provide support, and to keep the service working and secure.
            </p>
            <p>
              Blotter checks who a message is from before any message content is processed. If
              the sender is not a contact stored in your tracker, the body of that message is
              not routed into Blotter&rsquo;s content-processing system.
            </p>
            <p>
              We do not use your Google account data to build advertising profiles, and we do
              not sell personal data.
            </p>
            <p>
              Blotter&rsquo;s use of information received from Google APIs will adhere to the
              Google API Services User Data Policy, including its Limited Use requirements.
            </p>
          </Article>

          <Article n="06" title="What we keep">
            {KEEPS_BODY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{KEEPS_CALENDAR}</p>
            <p>
              How long each category is kept, and how long backups persist after deletion, is{" "}
              <Pending>retention periods by data category, including backups</Pending>.
            </p>
          </Article>

          <Article n="07" title="What we do not do">
            <List items={COMMITMENTS} />
          </Article>

          <Article n="08" title="Who else is involved">
            {PROVIDER_BODY.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              We also rely on service providers for hosting, storage, analytics and payment
              processing. The full list, what each one receives, and where each one processes
              it, is <Pending>subprocessor list and their locations</Pending>.
            </p>
            <p>
              We do not sell your data. We may disclose information if we are legally required
              to, or to protect the rights and safety of users and the public.
            </p>
          </Article>

          <Article n="09" title="Your choices">
            <p>{DELETION_STATEMENT}</p>
            <p>
              You can also revoke Blotter&rsquo;s access directly from your Google account
              security settings at any time, independently of Blotter.
            </p>
            <p>
              Depending on where you live, you may have rights to access, correct, export or
              delete your personal data, and to object to or restrict some processing. The
              rights that apply to you, and how to exercise them, are{" "}
              <Pending>applicable privacy rights and the process for exercising them</Pending>.
            </p>
          </Article>

          <Article n="10" title="Keeping information safe">
            <p>
              We use technical and organisational measures intended to protect the information
              we hold. No service can promise perfect security, and we make no claim of
              certification or audit that we have not obtained. Our specific security measures
              and any completed assessments are{" "}
              <Pending>security measures and any completed audits or certifications</Pending>.
            </p>
          </Article>

          <Article n="11" title="Where information is processed">
            <p>
              The countries in which information is stored and processed, and the safeguards
              used for any transfer between them, are{" "}
              <Pending>processing locations and transfer safeguards</Pending>.
            </p>
          </Article>

          <Article n="12" title="Age">
            <p>
              Blotter is built for university students and graduates recruiting for finance
              roles. The minimum age for an account is <Pending>minimum age</Pending>, and we
              do not knowingly collect information from anyone below it.
            </p>
          </Article>

          <Article n="13" title="Changes to this policy">
            <p>
              We will update this policy when the product changes. Material changes will be
              notified <Pending>how material changes are notified</Pending>, and the date at
              the top will always show when the current version took effect.
            </p>
          </Article>

          <Article n="14" title="Contact">
            <p>
              Questions about this policy or your data can be sent to{" "}
              <Pending>contact address for privacy enquiries</Pending>.
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
          <Article n="15" title="Common questions">
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
