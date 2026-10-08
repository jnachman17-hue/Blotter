import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";

import { LINK, Shell } from "@/app/setup/shared";
import { CONTACT_EMAIL } from "@/lib/contact";
import { SCRIPT_VERSION } from "@/app/api/script/manifest";
import { ReceiptStub } from "@/components/receipt-stub";
import { CopyScript } from "./copy-script";

/**
 * Where the update notice sends a student.
 *
 * It used to send them to `/Code.gs`, which downloads a file and explains
 * nothing. Jon hit that on 4 September 2026 the moment his own sheet asked to
 * be updated: *"I click the link and it automatically downloads the .gs code
 * and doesn't bring me anywhere to copy it and walk me through steps."*
 *
 * The script is read from `web/public/Code.gs` at build time, which is the
 * file `courier/publish.js` writes and the same bytes `/Code.gs` serves. There
 * is no second copy to drift.
 */
export const metadata: Metadata = {
  title: "Update Blotter | Blotter",
  description: "Update the Blotter code in your spreadsheet. About a minute.",
  /* Indexable from September 6, 2026. It is linked from the site footer now,
     so a student who lost the link in their sheet can find it, and a noindex
     page in a footer is a page search will not offer them. */
};

export default async function UpdatePage() {
  const script = await readFile(
    path.join(process.cwd(), "public", "Code.gs"),
    "utf8",
  );

  return (
    <Shell here="/update">
      <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Update Blotter
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          Your sheet is still working. Updating replaces the code and nothing else: your
          contacts, your settings, your Found decisions and your timer all stay exactly as
          they are. Nothing updates the script by itself. When a new version exists the
          sheet asks, and you paste it in. This is how.
        </p>
        <p>
          About a minute. The current version is{" "}
          <span className="font-mono text-small text-ink">{SCRIPT_VERSION}</span>, and{" "}
          <strong className="font-semibold text-ink">Blotter → Check this sheet</strong>{" "}
          tells you which one you have.
        </p>
      </div>

      <ReceiptStub className="mt-6 max-w-[64ch]" />

      <CopyScript script={script} version={SCRIPT_VERSION} />

      <ol className="mt-10 max-w-[68ch] space-y-6 text-body leading-[1.65] text-ink-muted">
        <li className="flex gap-4">
          <span className="font-mono text-small text-ink-faint">01</span>
          <span>
            Copy the code with the button above.
          </span>
        </li>
        <li className="flex gap-4">
          <span className="font-mono text-small text-ink-faint">02</span>
          <span>
            In your sheet, open <strong className="font-semibold text-ink">Extensions</strong>{" "}
            then <strong className="font-semibold text-ink">Apps Script</strong>. Click into
            the code, select all of it, delete it, and paste. Save it: Ctrl+S on Windows, ⌘S on a Mac.
          </span>
        </li>
        <li className="flex gap-4">
          <span className="font-mono text-small text-ink-faint">03</span>
          <span>
            Go back to the sheet and reload the page. Then{" "}
            <strong className="font-semibold text-ink">Blotter</strong> →{" "}
            <strong className="font-semibold text-ink">Step 1: Set up this sheet</strong>.
            That is what adds anything new.
          </span>
        </li>
        <li className="flex gap-4">
          <span className="font-mono text-small text-ink-faint">04</span>
          <span>
            Confirm: <strong className="font-semibold text-ink">Blotter → Check this sheet</strong>{" "}
            should now say{" "}
            <span className="font-mono text-small text-ink">{SCRIPT_VERSION}</span>. Or paste
            your copy into{" "}
            <Link href="/code#check" className={LINK}>
              the check on the Code page
            </Link>
            .
          </span>
        </li>
      </ol>

      <section className="mt-14 border-t border-rule pt-10">
        <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
          If it looks like nothing happened
        </h2>
        <div className="mt-4 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
          <p>
            Run <strong className="font-semibold text-ink">Blotter → Check this sheet</strong>{" "}
            and look at the script version. If it still shows the old one, the paste did not
            save. The usual cause is a text editor holding an older copy of the file: close
            it, copy again from this page, and repeat step 2.
          </p>
          <p>
            Still stuck? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>{" "}
            and quote your Blotter ID from the Settings tab.
          </p>
        </div>
      </section>
    </Shell>
  );
}
