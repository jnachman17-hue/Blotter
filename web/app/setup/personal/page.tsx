import type { Metadata } from "next";
import Link from "next/link";

import {
  B,
  LINK,
  Screen,
  Shell,
  Shot,
  Step,
  StepAddPeople,
  StepCopy,
  StepMenu,
  StepPermissions,
  StepSettings,
  TemplateCta,
  Troubleshooting,
} from "../shared";

/**
 * The personal-Gmail flow. Six steps, because of step 3.
 *
 * A personal account belongs to no Workspace domain, so nobody vouches for the
 * person running the copy and Google asks them directly, in its most alarming
 * register. The reassurance that actually works is that the developer Google
 * names is the reader themselves — they made the copy a minute earlier.
 */
export const metadata: Metadata = {
  title: "Set up Blotter with a personal Gmail account | Blotter",
  description:
    "Copy one sheet into your Google Drive, give it permission, and your recruiting tracker keeps itself up to date.",
  robots: { index: false, follow: false },
};

export default function PersonalSetup() {
  return (
    <Shell>
      <p className="font-mono text-small text-ink-faint">
        <Link href="/setup" className={LINK}>
          Set up
        </Link>{" "}
        / personal Gmail
      </p>

      <h1 className="font-display mt-3 text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Set up with your personal Gmail
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          Six steps, about five minutes. One of them is a warning screen from Google that looks
          much worse than it is. <B>Step 3 explains it properly</B> — it is worth reading
          rather than clicking through, because what it actually says is not what people
          assume.
        </p>
        <p className="text-small leading-[1.55] text-ink-faint">
          Have a university email that runs on Google, and recruit from it? The{" "}
          <Link href="/setup/university" className={LINK}>
            university set-up
          </Link>{" "}
          skips that screen entirely.
        </p>
      </div>

      <div className="mt-10">
        <TemplateCta />
      </div>

      <div className="mt-16">
        <h2 className="font-display mb-2 text-[1.35rem] leading-[1.3] font-bold tracking-[-0.015em] text-ink">
          The six steps
        </h2>
        <p className="mb-6 max-w-[68ch] text-body leading-[1.65] text-ink-muted">
          Open each one as you get to it.
        </p>

        <StepCopy n={1} account="your Gmail account" />
        <StepMenu n={2} />

        <Step n={3} title="Google warns you the app is not verified">
          <p>This is the screen that stops people. Read it rather than clicking past it.</p>
          <Screen>
            <p className="font-semibold">⚠ Google hasn&rsquo;t verified this app</p>
            <p className="mt-2">
              The app is requesting access to sensitive info in your Google Account. Until the
              developer (<B>your own email address</B>) verifies this app with Google, you
              shouldn&rsquo;t use it.
            </p>
          </Screen>
          <p>
            <B>Read the address in the brackets. It is yours.</B> You made a copy into your own
            Drive a minute ago, so as far as Google is concerned you now own this. The screen
            is asking whether you trust something sitting in your own account. It is not
            telling you Blotter failed a check.
          </p>
          <p>
            Google skips this warning when the person who owns the copy and the person running
            it belong to the same organisation — which is why students setting this up on a
            university account never see it. A personal Gmail account belongs to no
            organisation, so there is nobody to vouch for you and Google asks you directly
            instead.
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
            <em>Unsafe</em> is Google&rsquo;s standard wording for anything it has not reviewed.
            It is not a judgement about what the app does.
          </p>
        </Step>

        <StepPermissions
          n={4}
          lead={
            <p>
              Next comes a list of five things Blotter is asking to do, each with a checkbox,{" "}
              <B>all of them empty</B>. Nothing on that screen tells you all five are required.
            </p>
          }
        />
        <StepSettings n={5} />
        <StepAddPeople n={6} />
      </div>

      <Troubleshooting />
    </Shell>
  );
}
