import type { Metadata } from "next";
import Link from "next/link";

import {
  B,
  Crumb,
  H1,
  H2,
  Help,
  LINK,
  Note,
  PROSE,
  Shell,
  StepCopy,
  StepMenu,
  StepPermissions,
  StepStartHere,
  TemplateCta,
} from "../shared";

/**
 * The university flow. Four steps and no warning, because there is no warning.
 *
 * Verified on `jnachman@utexas.edu` on 3 September 2026: the install goes
 * straight to the ordinary consent screen. This page does not describe the
 * unverified-app screen at all. Telling somebody about a screen they will not
 * see is how a routine install starts feeling dangerous. The one hedge, for a
 * university configured differently from UT, sends them to the personal flow.
 */
export const metadata: Metadata = {
  title: "University account setup | Blotter",
  description:
    "Copy one sheet into your university Google account, give it permission, and your recruiting tracker keeps itself up to date.",
  robots: { index: false, follow: false },
};

export default function UniversitySetup() {
  return (
    <Shell>
      <Crumb>University account</Crumb>
      <H1>University account setup</H1>

      <p className={`mt-5 ${PROSE}`}>Four steps that take roughly five minutes.</p>

      <div className="mt-8">
        <TemplateCta />
      </div>

      <div className="mt-14">
        <H2>How to set up</H2>
        <div className="mt-5">
          <Note>
            If you see a warning that <B>Google hasn&rsquo;t verified this app</B>, your
            university has set up permissions differently than expected. Nothing is broken. The{" "}
            <Link href="/setup/personal" className={LINK}>
              personal Gmail setup
            </Link>{" "}
            walks you through that screen.
          </Note>
        </div>

        <div className="mt-6 border-t border-rule">
          <StepCopy n={1} />
          <StepMenu n={2} />
          <StepPermissions
            n={3}
            shot={{
              src: "/setup/permissions-university.png",
              alt: "Google's consent screen on a university account, with all five permissions ticked.",
              caption: "All five, via Select all.",
              width: 460,
              height: 646,
            }}
            lead={
              <p>
                Google asks what Blotter is allowed to do. The screen is headed{" "}
                <B>Blotter wants access to your Google Account</B>, with your university
                address underneath.
              </p>
            }
          />
          <StepStartHere n={4} />
        </div>
      </div>

      <Help />
    </Shell>
  );
}
