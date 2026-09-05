import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";

import { SCRIPT_BYTES, SCRIPT_VERSION } from "@/app/api/script/manifest";
import { LINK, Shell } from "@/app/setup/shared";
import { ReceiptStub } from "@/components/receipt-stub";
import { normaliseLines } from "@/lib/verify-copy";

import { CheckYourCopy } from "./check-your-copy";
import { PermissionsLedger } from "./permissions-ledger";
import { Shapes } from "./shapes";

/**
 * The code, readable, with the numbers that let somebody check their own copy.
 *
 * ## Why this is a page and not a link to the file
 *
 * `/Code.gs` has always been served. Clicking it downloads a file, which on
 * 4 September 2026 was the exact complaint that produced `/update`: *"I click
 * the link and it automatically downloads the .gs code and doesn't bring me
 * anywhere."* A page that shows the code is what a person wanting to look at it
 * actually needs.
 *
 * ## What it is for
 *
 * Jon, 5 September 2026: *"people might think, oh, you just put whatever code in
 * there that's safe, and we have a different code in the back end… if we can
 * match that code somewhere else on the site."* This is the somewhere else.
 * Version, byte count, SHA-256 and where it sends appear in the stub here, on
 * `/audit`, on `/status`, and in the sheet's own `Blotter → Check this sheet`.
 * Every one of them is generated from `manifest.ts`, which `publish.js` writes
 * and `helpers.test.js` fails on if it ever disagrees with the served bytes.
 *
 * **The header is stripped from the source and prepended by `publish.js`**, so
 * what is printed here is byte-for-byte what `/Code.gs` serves and what a
 * student pastes. Not a rendering of it, not an excerpt.
 *
 * ## Order
 *
 * The check first, because it is the reason to be here. Then the permissions,
 * because the manifest decides more than the script does: the first reviewer
 * of this code guessed the Gmail scope was full mailbox control because the
 * script was all they had. Then the shapes on the wire, then the script.
 *
 * ## `?v=`
 *
 * From script 4.9, `Blotter → Check this sheet` prints a link to this page with
 * the sheet's version in the query. The page greets it and says plainly that
 * the greeting is not a check. Harmless without it.
 */
export const metadata: Metadata = {
  title: "The code | Blotter",
  description:
    "Every line of the script Blotter runs inside your Google account, with the version and fingerprint so you can check it matches your own copy.",
  alternates: { canonical: "/code" },
};

const PROSE = "max-w-[64ch] space-y-4 text-body leading-[1.65] text-ink-muted";
const H2 = "font-display scroll-mt-8 text-[1.4rem] leading-[1.25] font-bold tracking-[-0.015em] text-ink";
const MONO = "font-mono text-small text-ink";

export default async function CodePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  const [{ v }, script, manifest] = await Promise.all([
    searchParams,
    readFile(path.join(process.cwd(), "public", "Code.gs"), "utf8"),
    readFile(path.join(process.cwd(), "public", "appsscript.json"), "utf8"),
  ]);

  /* Whatever the sheet said, trimmed and capped. React escapes it on the way out. */
  const said = (Array.isArray(v) ? v[0] : v)?.trim().slice(0, 24) ?? "";
  const scopes = (JSON.parse(manifest) as { oauthScopes?: string[] }).oauthScopes ?? [];
  const lines = normaliseLines(script).length;

  return (
    <Shell here="/code">
      <h1 className="font-display text-[2.1rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-h2">
        The code
      </h1>

      <div className="mt-6 max-w-[58ch] space-y-4 text-lede leading-[1.7] text-ink-read">
        <p>
          This is the whole thing. Every line that runs inside your Google account, exactly
          as it is served and exactly as you paste it.
        </p>
      </div>

      <ReceiptStub className="mt-6 max-w-[64ch]" />

      <div className={`${PROSE} mt-6`}>
        <p>
          SHA-256 is the file&rsquo;s fingerprint. Change one character of the file and the
          fingerprint changes. You do not need it for either check on this page.
        </p>
        <p>
          You do not have to read any of this.{" "}
          <Link href="/audit" className={LINK}>
            The audit page
          </Link>{" "}
          has a question you can paste into any AI along with the code, and it will read it
          for you and check it against everything this site claims.
        </p>
      </div>

      {/* ------------------------------------------------- the check */}
      <section id="check" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
        <h2 className={H2}>Is your copy this code?</h2>

        {said && (
          <div className="mt-6 max-w-[64ch] border-l-2 border-blotter-400 bg-white py-4 pr-5 pl-5">
            <p className="text-body leading-[1.6] text-ink">
              Your sheet says <span className={MONO}>{said}</span>. This page serves{" "}
              <span className={MONO}>{SCRIPT_VERSION}</span>.
              {said !== SCRIPT_VERSION && (
                <>
                  {" "}
                  <Link href="/update" className={LINK}>
                    Updating
                  </Link>{" "}
                  takes about a minute.
                </>
              )}
            </p>
            <p className="mt-1 text-small leading-[1.5] text-ink-muted">
              That is a greeting, not a check. The check is below.
            </p>
          </div>
        )}

        <CheckYourCopy version={SCRIPT_VERSION} embedded={script} />
      </section>

      {/* ------------------------------------------------- the permissions */}
      <section id="permissions" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
        <h2 className={H2}>What Google was asked for</h2>
        <div className={`${PROSE} mt-4`}>
          <p>
            This is the file that says what Blotter is allowed to touch. It is short, and it
            decides more than the script below it. The code cannot exceed it.
          </p>
        </div>
        <pre className="mt-6 max-w-full overflow-x-auto rounded-lg border border-rule bg-white p-5 font-mono text-[12px] leading-[1.6] text-ink">
          {manifest.trim()}
        </pre>

        <PermissionsLedger scopes={scopes} />

        <div className={`${PROSE} mt-6`}>
          <p>
            All five are required and none is ticked by default. Google has not verified the
            app; a personal Gmail account sees a warning screen. A university account does
            not.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- the shapes */}
      <section id="shapes" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
        <h2 className={H2}>What the server receives and returns</h2>
        <div className={`${PROSE} mt-4`}>
          <p>
            The server&rsquo;s own code is not published. These tables are the whole of what
            it can receive and the whole of what it can answer. A reviewer with the script can
            confirm the request side line by line.
          </p>
        </div>
        <Shapes />
      </section>

      {/* ------------------------------------------------- the script */}
      <section id="script" className="mt-16 scroll-mt-8 border-t border-rule pt-10">
        <h2 className={H2}>The script</h2>
        <div className={`${PROSE} mt-4`}>
          <p>
            {SCRIPT_BYTES.toLocaleString()} bytes of it, {lines.toLocaleString()} lines. The
            block scrolls, and the whole file is also served plainly at{" "}
            <a href="/Code.gs" className={`font-mono text-small ${LINK}`}>
              /Code.gs
            </a>
            .
          </p>
        </div>
        <pre className="mt-6 max-h-[34rem] max-w-full overflow-auto rounded-lg border border-rule bg-white p-5 font-mono text-[11.5px] leading-[1.55] text-ink">
          {script}
        </pre>
      </section>

      {/* ------------------------------------------------- the foot */}
      <p className="mt-16 border-t border-rule pt-8 text-small leading-[1.55] text-ink-muted">
        <Link href="/audit#check" className={LINK}>
          Back to the audit page, row 2.2
        </Link>
      </p>
    </Shell>
  );
}
