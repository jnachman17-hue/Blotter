import type { Metadata } from "next";
import Link from "next/link";

import {
  B,
  Crumb,
  H1,
  H2,
  Help,
  LINK,
  PROSE,
  Shell,
  Shot,
  Step,
  StepCopy,
  StepMenu,
  StepPermissions,
  StepStartHere,
  TemplateCta,
} from "../shared";

/**
 * The personal-Gmail flow. Five steps, because of step 3.
 *
 * A personal account belongs to no Workspace domain, so Google asks the person
 * directly, in its most alarming register. Jon's ruling on the reassurance:
 * say plainly that the screen is asking whether you trust Blotter to read your
 * own account, and make it sound far less frightening than "as far as Google
 * is concerned you own this now", which he found the opposite of reassuring.
 */
export const metadata: Metadata = {
  title: "Personal Gmail setup | Blotter",
  description:
    "Copy one sheet into your Google Drive, give it permission, and your recruiting tracker keeps itself up to date.",
  robots: { index: false, follow: false },
};

export default function PersonalSetup() {
  return (
    <Shell>
      <Crumb>Personal Gmail</Crumb>
      <H1>Personal Gmail setup</H1>

      <div className={`mt-5 space-y-4 ${PROSE}`}>
        <p>
          Five steps that take roughly five minutes. One of them is a warning screen from
          Google that looks worse than it is. <B>Step 3 explains it.</B>
        </p>
        <p className="text-body text-ink-muted">
          Recruit from a university address that runs on Google? The{" "}
          <Link href="/setup/university" className={LINK}>
            university setup
          </Link>{" "}
          skips that screen.
        </p>
      </div>

      <div className="mt-8">
        <TemplateCta />
      </div>

      <div className="mt-14">
        <H2>How to set up</H2>

        <div className="mt-6 border-t border-rule">
          <StepCopy n={1} />
          <StepMenu n={2} />

          <Step n={3} title="Google warns you the app is not verified">
            <p>
              Google shows a screen saying it hasn&rsquo;t verified this app. It looks alarming.
              Here is what it means.
            </p>
            <p>
              <B>The email address in the brackets is yours.</B> The copy of Blotter you just
              made lives in your Google account, and Google treats everything in your account
              as yours.
            </p>
            <p>
              The screen is asking whether you want to let Blotter read your own Google
              account. Google shows it for any app that has not been through its app review,
              a paid process Blotter has not done. It is a standard notice, not a judgement
              about what Blotter does.
            </p>
            <p>
              If you had a university email, this screen would not appear. Google trusts
              universities automatically.
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
            <p className="text-body text-ink-muted">
              <em>Unsafe</em> is Google&rsquo;s standard word for anything it has not reviewed.
            </p>
          </Step>

          <StepPermissions
            n={4}
            lead={
              <p>
                Next, Google asks what Blotter is allowed to do. The screen is headed{" "}
                <B>Blotter wants access to your Google Account</B>.
              </p>
            }
          />
          <StepStartHere n={5} />
        </div>
      </div>

      <Help />
    </Shell>
  );
}
