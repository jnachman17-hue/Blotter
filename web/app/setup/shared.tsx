import Image from "next/image";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * Shared furniture for the three setup pages.
 *
 * `/setup` asks one question — which Google account holds your recruiting mail
 * — and sends you to `/setup/university` or `/setup/personal`. The flows differ
 * by exactly one step, but it is the step that decides whether the install
 * feels routine or alarming, so the two are kept apart rather than hedged in
 * one page with "if you see this" prose.
 *
 * Tested on `jnachman@utexas.edu` on 3 September 2026: a Workspace account gets
 * the ordinary consent screen and no warning at all, because Google waives
 * verification when a script's owner and its user are in the same domain, and a
 * student who copies the sheet is both. A personal Gmail account belongs to no
 * domain, so it meets the full warning. Everything below follows from that.
 */

/** The public template a student copies. Null until an empty master exists. */
export const TEMPLATE_URL: string | null = null;

export const LINK =
  "font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900";

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function Shell({ children }: { children: React.ReactNode }) {
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
      <main className="mx-auto max-w-[900px] px-6 pt-16 pb-28">{children}</main>
    </div>
  );
}

export function Step({
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
 * sources are 429-893px wide; stretching them across a 74ch column was the
 * whole of the blur in the first version of this page.
 */
export function Shot({
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
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-rule bg-white py-3 pr-5 pl-4 text-body leading-[1.6] text-ink">
      {children}
    </div>
  );
}

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-faint" />
      <span>
        <span className="font-medium text-ink">{label}</span> {children}
      </span>
    </li>
  );
}

/* --------------------------------------------------------- the shared steps */

export function TemplateCta() {
  if (TEMPLATE_URL) {
    return (
      <a
        href={TEMPLATE_URL}
        className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
      >
        Open the Blotter template
      </a>
    );
  }
  return (
    <div className="border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
      <p className="text-body leading-[1.62] text-ink">
        <B>The template link is not live yet.</B> The steps below are final, so you can read
        them through — but there is nothing to copy until it is published. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
          {CONTACT_EMAIL}
        </a>{" "}
        and we will send it to you.
      </p>
    </div>
  );
}

export function StepCopy({ n, account }: { n: number; account: string }) {
  return (
    <Step n={n} title="Make your own copy of the sheet" open>
      <p>
        <B>Sign in to {account} first</B>, and check the avatar in the top right really is
        that account before you go on. If two Google accounts are signed in at once, the copy
        can land in the wrong one and nothing after this will behave as described. A private
        browsing window is the surest way.
      </p>
      <p>
        Open the template, then choose <B>File → Make a copy</B> from the menu at the top.
        Give it any name you like and click <B>Make a copy</B>.
      </p>
      <p>
        A yellow note appears in that box saying an{" "}
        <em>Apps Script file and functionality will also be copied</em>. That is Google&rsquo;s
        name for Blotter itself — the part that does the work. Seeing it means the copy is
        arriving complete. If it were missing, nothing would run.
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
  );
}

export function StepMenu({ n }: { n: number }) {
  return (
    <Step n={n} title="Open the Blotter menu in your copy">
      <p>
        In your new copy, look along the top menu bar. To the right of <B>Help</B> there is a
        menu called <B>Blotter</B>. Open it and click <B>Step 1: Set up this sheet</B>.
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
        If the menu is not there, wait a few seconds and reload the page — it appears once the
        sheet has finished opening. <B>If it is still missing after that, make the copy
        again.</B> A copy occasionally arrives without Blotter attached even though the box
        said it was coming. There is nothing to repair: delete the empty one and start again.
      </p>
    </Step>
  );
}

export function StepPermissions({
  n,
  lead,
  shot,
}: {
  n: number;
  lead: React.ReactNode;
  /** The university flow shows its own consent screen, which looks different. */
  shot?: { src: string; alt: string; caption: string; width: number; height: number };
}) {
  const s = shot ?? {
    src: "/setup/permissions.png",
    alt: "Google's permission screen with all five checkboxes ticked.",
    caption: "All five, via Select all.",
    width: 489,
    height: 598,
  };
  return (
    <Step n={n} title="Give it permission — tick Select all">
      {lead}
      <p>
        <B>Tick Select all, then click Continue.</B> Leave one off and Blotter fails later, in
        a way that is very hard to work out.
      </p>
      <Shot src={s.src} alt={s.alt} caption={s.caption} width={s.width} height={s.height} />
      <p>
        Google&rsquo;s wording is broad, because it is the same wording for every app that
        asks. What each one is for here:
      </p>
      <ul className="space-y-3">
        <Row label="View your email messages and settings.">
          To see who you have written to and heard back from. Envelopes, not contents — see
          above.
        </Row>
        <Row label="View and manage spreadsheets that this application has been installed in.">
          To write the answers back into your tracker. That is this one file; Blotter is not
          installed in any other.
        </Row>
        <Row label="See and download any calendar you can access.">
          To spot that a call has been scheduled without you entering it.
        </Row>
        <Row label="Connect to an external service.">
          To ask Blotter&rsquo;s server what the updates should be.
        </Row>
        <Row label="Allow this application to run when you are not present.">
          So it can refresh every fifteen minutes rather than only when you sit down.
        </Row>
      </ul>
    </Step>
  );
}

export function StepSettings({ n }: { n: number }) {
  return (
    <Step n={n} title="Tell it who you are">
      <p>
        Your copy has a tab along the bottom called <B>Settings</B>. Two things there have to
        be right, and both fail quietly rather than loudly:
      </p>
      <ul className="space-y-3">
        <Row label="Your email addresses.">
          Every address you send recruiting email from. This is how Blotter tells{" "}
          <em>you wrote</em> from <em>they wrote</em>. Miss one and everything sent from it is
          read backwards. Blotter refuses to run until this is filled in.
        </Row>
        <Row label="Your time zone.">
          A copy keeps the time zone of whoever built the template. If yours differs, every day
          count is off by one at the boundary, and it looks entirely normal while being wrong.
        </Row>
      </ul>
      <p>
        The <B>Start here</B> tab walks you through both.
      </p>
    </Step>
  );
}

export function StepAddPeople({ n }: { n: number }) {
  return (
    <Step n={n} title="Add people and switch it on">
      <p>
        On the <B>Contacts</B> tab, add the people you are networking with — a name and a firm
        is enough to begin with. Then, from the <B>Blotter</B> menu:
      </p>
      <ul className="space-y-3">
        <Row label="Step 2: Run once now.">
          Fills everything in from your existing email history, so you can see it working
          straight away.
        </Row>
        <Row label="Start automatic updates.">
          From then on it refreshes every fifteen minutes on its own. You can stop it from the
          same menu whenever you like.
        </Row>
      </ul>
    </Step>
  );
}

export function Troubleshooting() {
  return (
    <section className="mt-16 border-t border-rule pt-10">
      <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
        If something looks wrong
      </h2>
      <div className="mt-4 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          The <B>Blotter</B> menu has <B>Check this sheet (diagnostics)</B>. It reports what is
          connected and what is not, in plain language, and it is the fastest way to find what
          is missing.
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
          . Deleting the spreadsheet removes it too. Nothing of yours is held anywhere else.
        </p>
      </div>
    </section>
  );
}

/** The trust anchor, on every flow. It is why somebody carries on. */
export function WhatItSees() {
  return (
    <section className="mt-12 rounded-[6px] border border-rule bg-white px-7 py-7">
      <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
        What Blotter can actually see
      </h2>

      <div className="mt-5 max-w-[68ch] space-y-5 text-body leading-[1.65] text-ink-muted">
        <p>
          <B>It reads the outside of your emails, not the inside.</B> For each message it looks
          at who sent it, who it went to, when, and the subject line — the things printed on an
          envelope. It does not open your email and read what you wrote.
        </p>
        <p>
          There is one exception, and it works in your favour. When Google&rsquo;s mail system
          sends back an automated <em>delivery failed</em> notice, Blotter opens that one to
          find which address bounced, so it can tell you. Those notices are written by a
          machine, not by a person.
        </p>
        <p>
          <B>It reads your calendar</B> — event titles, times and who was invited — so it can
          tell a call has been booked without you typing it in.
        </p>
        <p>
          <B>It sees one spreadsheet: the copy you make.</B> The permission Google grants here
          is for that single file. Blotter cannot open anything else in your Drive and cannot
          see your other spreadsheets.
        </p>

        <div className="border-t border-rule pt-5">
          <p>
            <B>What it never does:</B> send an email, reply to one, delete anything, or change
            your calendar. It has no ability to. Everything it can reach is read-only, apart
            from writing into the one sheet you gave it.
          </p>
        </div>

        <div className="border-t border-rule pt-5">
          <p>
            <B>Where it all goes.</B> Blotter&rsquo;s server receives the envelope details
            above, works out what changed, and sends back a status — <em>replied</em>,{" "}
            <em>waiting</em>, <em>bounced</em>. It never receives the text of your emails,
            because that text is never opened in the first place. Your tracker stays in your
            Google Drive, under your account, and the answers are written straight back into
            it. We keep no copy of your sheet.
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
  );
}
