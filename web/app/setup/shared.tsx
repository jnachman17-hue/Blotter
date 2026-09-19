import Image from "next/image";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POLICY_HREF } from "@/lib/privacy-copy";

/**
 * Shared furniture for the three setup pages.
 *
 * `/setup` asks which Google account holds your recruiting mail and sends you
 * to `/setup/university` or `/setup/personal`. The flows differ by one step,
 * but it is the step that decides whether the install feels routine or
 * alarming, so they are kept apart rather than hedged in one page.
 *
 * Tested on `jnachman@utexas.edu` on 3 September 2026: a Workspace account
 * gets the ordinary consent screen and no warning, because Google waives
 * verification when a script's owner and its user are in the same domain, and
 * a student who copies the sheet is both. A personal Gmail account belongs to
 * no domain, so it meets the full warning.
 *
 * The website ends at the sheet's own `Start here` tab. Settings and adding
 * contacts used to be steps here; Jon ruled on 3 September that they belong in
 * the sheet, where the student already is. So the last step on every flow is
 * "open Start here", and nothing after it.
 *
 * House rules from the same session: almost no em dashes, no AI cadence, and
 * body copy a size up from the rest of the site because these pages are read
 * while doing something else.
 */

/**
 * The public template a student copies.
 *
 * The `/copy` form rather than `/edit`: Google opens its Copy document dialog
 * straight away, which is both one step fewer and the exact screen step 1
 * screenshots. Shared as "anyone with the link, viewer", owned by
 * blotterib@gmail.com, and empty of contacts.
 */
export const TEMPLATE_URL: string | null =
  "https://docs.google.com/spreadsheets/d/1tYhEPPtHJhdc3W-Vbh2cSYtyYEFPaNJjDFMwuKj7cWU/copy";

export const LINK =
  "font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900";

/** Body measure for these pages: a size up, more leading, a shorter line. */
export const PROSE = "max-w-[62ch] text-lede leading-[1.7] text-ink-read";

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/**
 * Every page a student may want to reach directly, in the order they meet them.
 *
 * Audit, Code and Update joined Privacy and Terms on September 5, 2026, on
 * Jon's ruling. The two verification pages existed and were reachable only from
 * a link somebody had to already know about, which is the opposite of what a
 * page called "check us" is for.
 */
export const NAV = [
  /* Demo first, from 19 September 2026: the video is the fastest answer to
     "what is this", so it leads the row. */
  { href: "/demo", label: "Demo" },
  /* Four, since 5 September 2026. The code, status and findings pages still
     exist and are reached from the "Your data" page under a single
     technical-details link; a tab row that named them read as a developer
     console to the students it was for. */
  { href: "/audit", label: "Your data" },
  { href: "/update", label: "Update" },
  { href: POLICY_HREF, label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function Shell({
  children,
  wide,
  here,
}: {
  children: React.ReactNode;
  /* The chooser only. A page whose job is a side-by-side decision should not be
     bound to a reading measure; the flow pages still are, because they are
     read. */
  wide?: boolean;
  /** The nav entry this page is, so it is marked rather than linked to itself. */
  here?: string;
}) {
  const measure = wide ? "max-w-[1080px]" : "max-w-[860px]";
  return (
    <div className="min-h-screen bg-surface-quiet">
      <header className="border-b border-rule bg-white">
        <div className={`mx-auto ${measure} px-5 sm:px-6`}>
          {/*
            Wraps rather than scrolls. Five destinations and a lockup do not fit
            one 375px row, and a nav that scrolls sideways hides the items past
            the edge from exactly the reader who most needs to find them.
          */}
          <div className="flex min-h-[60px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 sm:py-0">
          <Link href="/" aria-label="Blotter, back to the home page" className="text-navy-900">
            <BlotterLockup />
          </Link>
          {/* Both, from September 4, 2026. The terms were reachable from the
              footer and the privacy page only, and never from the two pages a
              student actually reads before granting access to their Gmail. */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={here === item.href ? "page" : undefined}
                className={
                  here === item.href
                    ? "text-small font-semibold text-ink"
                    : `text-small ${LINK}`
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          </div>
        </div>
      </header>
      <main className={`mx-auto ${measure} px-5 pt-12 pb-24 sm:px-6 sm:pt-16`}>{children}</main>
    </div>
  );
}

export function Crumb({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-small text-ink-muted">
      <Link href="/setup" className={LINK}>
        Set up
      </Link>
      <span className="mx-2 text-ink-faint">/</span>
      {children}
    </p>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-display mt-3 text-[2rem] leading-[1.12] font-bold tracking-[-0.02em] text-ink sm:text-h2">
      {children}
    </h1>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display scroll-mt-8 text-[1.5rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink"
    >
      {children}
    </h2>
  );
}

/* --------------------------------------------------------------- the steps */

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
    <details open={open} className="group border-b border-rule">
      <summary className="flex cursor-pointer list-none items-center gap-4 py-5 sm:gap-5 sm:py-6 [&::-webkit-details-marker]:hidden">
        <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-900 text-[0.95rem] font-semibold text-white tabular-nums sm:h-10 sm:w-10">
          {n}
        </span>
        <span className="font-display flex-1 text-[1.2rem] leading-[1.3] font-semibold tracking-[-0.012em] text-ink sm:text-[1.3rem]">
          {title}
        </span>
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-rule bg-white text-[1.1rem] leading-none text-ink-muted transition-transform duration-150 ease-out group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className={`space-y-5 pb-9 sm:pl-[3.75rem] ${PROSE}`}>{children}</div>
    </details>
  );
}

/**
 * A screenshot, capped below its natural width so it stays sharp. Sources are
 * 429-893px wide; stretching them across the column was the whole of the blur.
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
  wide?: boolean;
}) {
  return (
    <figure
      className={`${wide ? "max-w-[540px]" : "max-w-[400px]"} overflow-hidden rounded-[8px] border border-rule bg-white shadow-[0_1px_2px_rgba(20,24,31,0.05)]`}
    >
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" unoptimized />
      <figcaption className="border-t border-rule px-3 py-2 text-small leading-[1.5] text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[0.7em] h-[5px] w-[5px] shrink-0 rounded-full bg-navy-500" />
      <span>
        <span className="font-semibold text-ink">{label}</span> {children}
      </span>
    </li>
  );
}

/** A short notice: the one hedge on each flow. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-blotter-200 bg-blotter-row-strong px-5 py-4">
      <p className="text-body leading-[1.6] text-ink">{children}</p>
    </div>
  );
}

export function TemplateCta() {
  if (TEMPLATE_URL) {
    /* A new tab, from 4 September 2026. Jon, walking the flow cold: the link
       replaced the setup page with the spreadsheet, so the instructions he was
       halfway through were gone and he had to find the site again. The steps
       have to stay open beside the sheet. */
    return (
      <a
        href={TEMPLATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
      >
        Open the Blotter template
      </a>
    );
  }
  return (
    <Note>
      <B>The template link is not live yet.</B> The steps are final, so you can read them
      through, but there is nothing to copy until it is published. Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
        {CONTACT_EMAIL}
      </a>{" "}
      and we will send it to you.
    </Note>
  );
}

export function StepCopy({ n }: { n: number }) {
  return (
    <Step n={n} title="Make your own copy of the sheet" open>
      <p>
        Open the template. Google shows you a <B>Copy document</B> box straight away. Give it
        any name you like and click <B>Make a copy</B>.
      </p>
      <p>
        A yellow note appears in that box saying an{" "}
        <em>Apps Script file and functionality will also be copied</em>. That is Google&rsquo;s
        name for Blotter itself, the part that does the work. Seeing it means the copy is
        arriving complete.
      </p>
      <Shot
        src="/setup/copy-warning.png"
        alt="Google's Copy document box, with a yellow note saying an Apps Script file and functionality will also be copied."
        caption="Expected. The yellow note is Blotter coming along with the sheet."
        width={429}
        height={332}
      />
      <p>The copy lands in your own Google Drive. It is yours.</p>
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
        <B>A yellow bar may appear across the top first</B>, saying some formulas are
        trying to send and receive data from external parties, with an{" "}
        <B>Allow access</B> button. Click it. That is the picture on the{" "}
        <B>Start here</B> tab loading from blotterib.com, and Google asks before any
        sheet fetches anything from outside itself.
      </p>
      <p>
        If the menu is not there, wait a few seconds and reload the page. If it is still
        missing, make the copy again. A copy occasionally arrives without Blotter attached,
        and a second copy fixes it.
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
    <Step n={n} title="Give it permission. Tick Select all.">
      {lead}
      <p>
        <B>Tick Select all, then click Continue.</B> If you don&rsquo;t select all, Blotter
        will not run correctly.
      </p>
      <Shot src={s.src} alt={s.alt} caption={s.caption} width={s.width} height={s.height} />
      <p>
        Google&rsquo;s wording is broad, because it is the same wording for every app that
        asks. What each one is for here:
      </p>
      <ul className="space-y-3">
        <Row label="View your email messages and settings.">
          To see who you have written to and heard back from. Envelopes, not contents.
        </Row>
        <Row label="View and manage spreadsheets that this application has been installed in.">
          To write the answers back into your tracker. That is this one file.
        </Row>
        <Row label="See and download any calendar you can access.">
          To spot that a call has been scheduled without you entering it.
        </Row>
        <Row label="Connect to an external service.">
          To ask Blotter&rsquo;s server what the updates should be.
        </Row>
        <Row label="Allow this application to run when you are not present.">
          So it can refresh every fifteen minutes on its own.
        </Row>
      </ul>
    </Step>
  );
}

export function StepStartHere({ n }: { n: number }) {
  return (
    <Step n={n} title="Go to the Start here tab">
      <p>
        That is the website&rsquo;s part done. Everything else happens in your sheet, and it
        walks you through it.
      </p>
      <p>
        Along the bottom of your copy there is a tab called <B>Start here</B>. Open it and
        follow it down. It covers your settings, adding the people you are networking with,
        and switching on the automatic updates.
      </p>
    </Step>
  );
}

export function Help() {
  return (
    <section className="mt-16 border-t border-rule pt-10">
      <div className={`space-y-4 ${PROSE}`}>
        <p>
          If you are having issues, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
            {CONTACT_EMAIL}
          </a>{" "}
          for help.
        </p>
        <p>
          To stop Blotter entirely, choose <B>Stop automatic updates</B> from the Blotter menu,
          or remove its access from your{" "}
          <a href="https://myaccount.google.com/permissions" className={LINK}>
            Google account permissions
          </a>
          . Deleting the spreadsheet removes it too. Nothing of yours is held anywhere else.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ trust panel */

/*
 * Four icons at 24px on a 1.4 stroke, matching `section-6/step-icons.tsx`, so
 * the site has one drawn hand rather than two.
 */
const ICON = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Envelope = () => (
  <svg {...ICON}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.75" />
    <path d="m3.6 6.4 8.4 5.9 8.4-5.9" />
  </svg>
);
const Calendar = () => (
  <svg {...ICON}>
    <rect x="3.5" y="5" width="17" height="15" rx="1.75" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </svg>
);
const OneSheet = () => (
  <svg {...ICON}>
    <path d="M6 3.5h7.5L18.5 8.5V20A1.5 1.5 0 0 1 17 21.5H6A1.5 1.5 0 0 1 4.5 20V5A1.5 1.5 0 0 1 6 3.5Z" />
    <path d="M13.25 3.6V8.5h4.9M8 13h8M8 16.5h5" />
  </svg>
);
const NeverSends = () => (
  <svg {...ICON}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m6.4 6.4 11.2 11.2" />
  </svg>
);

function Fact({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-quiet text-navy-500">
        {icon}
      </span>
      <p className="mt-3 font-display text-[1rem] leading-[1.3] font-semibold text-ink">
        {title}
      </p>
      <p className="mt-1.5 text-body leading-[1.55] text-ink-read">{children}</p>
    </div>
  );
}

/*
 * Compressed on 5 September 2026. It was four prose facts plus two more
 * paragraphs, and it pushed the actual choice off the screen. Jon: *"I should
 * look at this and know exactly what I need to do in five seconds of reading."*
 * Same four claims, none softened, in a quarter of the height.
 */
export function WhatItSees() {
  return (
    <section className="mt-14 border-t border-rule pt-10">
      <H2>What Blotter can see</H2>

      <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
        <Fact icon={<Envelope />} title="The outside of your emails">
          Who wrote, who it went to, when, and the subject. It cannot read what you wrote.
        </Fact>
        <Fact icon={<Calendar />} title="Your calendar">
          Titles, times and guests, so a booked call appears without you typing it.
        </Fact>
        <Fact icon={<OneSheet />} title="This one spreadsheet">
          Nothing else in your Drive. The permission is for that single file.
        </Fact>
        <Fact icon={<NeverSends />} title="It never sends or deletes">
          No email, no reply, no calendar change. It has no ability to.
        </Fact>
      </div>

      <p className="mt-8 max-w-[70ch] text-small leading-[1.6] text-ink-muted">
        The server works out each status and sends it back to your sheet. We do not have a
        copy of it.{" "}
        <Link href={POLICY_HREF} className={LINK}>
          The full details are in the privacy policy
        </Link>
        .
      </p>
    </section>
  );
}

