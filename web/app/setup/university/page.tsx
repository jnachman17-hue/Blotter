import type { Metadata } from "next";
import Link from "next/link";

import {
  B,
  LINK,
  Screen,
  Shell,
  StepAddPeople,
  StepCopy,
  StepMenu,
  StepPermissions,
  StepSettings,
  TemplateCta,
  Troubleshooting,
} from "../shared";

/**
 * The university flow. Five steps, no warning, because there is no warning.
 *
 * Verified on `jnachman@utexas.edu` on 3 September 2026: the install goes
 * straight to the ordinary consent screen. Google waives verification when a
 * script's owner and its user belong to the same Workspace domain, and a
 * student who copies the sheet is both.
 *
 * This page deliberately does not mention the unverified-app warning. Warning
 * somebody about a screen they will not see is how a routine install starts
 * feeling dangerous. The one hedge is at the end, for the minority whose
 * university has locked things down — and it sends them to `/setup/personal`
 * rather than explaining it twice.
 */
export const metadata: Metadata = {
  title: "Set up Blotter with your university email | Blotter",
  description:
    "Copy one sheet into your university Google account, give it permission, and your recruiting tracker keeps itself up to date.",
  robots: { index: false, follow: false },
};

export default function UniversitySetup() {
  return (
    <Shell>
      <p className="font-mono text-small text-ink-faint">
        <Link href="/setup" className={LINK}>
          Set up
        </Link>{" "}
        / university account
      </p>

      <h1 className="font-display mt-3 text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Set up with your university email
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          Five steps, about five minutes. Because your university runs its Google accounts,
          Google already knows who you are — so this is the straightforward version, with no
          security warnings to work through.
        </p>
      </div>

      <div className="mt-10">
        <TemplateCta />
      </div>

      <div className="mt-16">
        <h2 className="font-display mb-2 text-[1.35rem] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
          The five steps
        </h2>
        <p className="mb-6 max-w-[68ch] text-body leading-[1.65] text-ink-muted">
          Open each one as you get to it.
        </p>

        <StepCopy n={1} account="your university account" />
        <StepMenu n={2} />
        <StepPermissions
          n={3}
          shot={{
            src: "/setup/permissions-university.png",
            alt: "Google's consent screen on a university account, headed Google Account with the address beneath, and all five permissions ticked.",
            caption: "All five, via Select all. No warning screen before it.",
            width: 460,
            height: 646,
          }}
          lead={
            <>
              <p>
                Google asks what Blotter is allowed to do. The screen is headed{" "}
                <em>Blotter wants access to your Google Account</em> and names your university
                address underneath.
              </p>
              <Screen>
                <p className="font-semibold">Select what Blotter can access</p>
                <p className="mt-2">
                  Five things, each with a checkbox, <B>all of them empty</B>. Nothing on that
                  screen tells you all five are required.
                </p>
              </Screen>
            </>
          }
        />
        <StepSettings n={4} />
        <StepAddPeople n={5} />
      </div>

      {/* The minority case. Sent elsewhere rather than explained twice. */}
      <section className="mt-14 border-l-2 border-blotter-400 bg-white py-5 pr-8 pl-6">
        <p className="max-w-[68ch] text-body leading-[1.62] text-ink">
          <B>If you saw a warning that Google hasn&rsquo;t verified this app</B>, your
          university is set up differently from the ones we have tested. Nothing is broken —
          the{" "}
          <Link href="/setup/personal" className={LINK}>
            personal Gmail instructions
          </Link>{" "}
          explain that screen and how to get past it. Everything else on this page still
          applies.
        </p>
      </section>

      <Troubleshooting />
    </Shell>
  );
}
