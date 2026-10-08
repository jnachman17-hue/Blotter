/**
 * The words on `/audit`, and the package that page puts on the clipboard.
 *
 * ## Why this exists
 *
 * On 5 September 2026 Jon pasted the published `Code.gs` into ChatGPT and
 * asked it to check the code against the website. It found a real privacy
 * fault: `fetchEvents_` read the whole default calendar and sent every event
 * title and guest list to the server, while the site said the server receives
 * events *with your contacts*. The site was wrong and the reviewer was right.
 *
 * `37-BRIEF-PUBLIC-AUDIT.md` draws the conclusion: **the audit was worth more
 * than any reassurance we could have written.** So instead of writing more
 * reassurance, the site hands strangers the same tools and asks them to do it
 * again.
 *
 * ## The three things the package must carry, and why each is not optional
 *
 * **The script.** Fetched at click time, never rendered into the page. The
 * reasoning is `update/copy-script.tsx`'s and it was learned expensively: a tab
 * left open across a deploy otherwise hands over a version that no longer
 * exists, silently.
 *
 * **The manifest.** The first reviewer guessed the Gmail scope was
 * `https://mail.google.com/` — full mailbox control — because `Code.gs` was all
 * it had, and a script that searches mail looks like a script that needs it.
 * The real scope is `gmail.readonly`. Every reviewer given only the script will
 * raise that same non-issue, so `appsscript.json` travels with it.
 *
 * **The claims.** A reviewer with no browsing cannot read blotterib.com, and a
 * package that omits the claims produces an audit of the code alone, which is
 * not the question. These are built from `privacy-copy.ts` — the same module
 * that renders the landing page's privacy section and `/privacy` — so the
 * claims a reviewer checks are the claims the site makes, and there is no
 * second copy to soften.
 */
import {
  BROAD_BODY,
  BROAD_HEADING,
  CANDID_CLAIM,
  COMMITMENTS,
  DELETION_STATEMENT,
  HOSTING_BODY,
  HOSTING_HEADING,
  KEEPS_BODY,
  KEEPS_CALENDAR,
  KEEPS_COUNTS,
  KEEPS_HEADING,
  PERMISSIONS,
  PRIVACY_FAQ,
  PROCESSING_STEPS,
  SHEETS_SCOPE_NOTE,
} from "./privacy-copy";

/**
 * What a student pastes.
 *
 * Written to be copied without editing, by somebody who does not know what a
 * scope is. Three rules shaped it:
 *
 * It says what the reader is afraid of, because a model asked "is this code
 * safe" writes an essay and a model asked "does the code do what this page
 * promises" writes a list of differences.
 *
 * It asks for a verdict per claim with the deciding line quoted, because that
 * is the format Jon can act on and the format that makes a wrong finding
 * obvious rather than persuasive.
 *
 * It tells the model not to be reassuring. Models grade generously on
 * something that looks careful, and this code looks careful.
 */
export const AUDIT_PROMPT = `I am a college student. A tool called Blotter (blotterib.com) tracks my recruiting emails in a Google Sheet. To use it I have to give it permission to read my Gmail and my Google Calendar, and I want to know whether that is safe before I do.

Below is everything that runs inside my Google account: the whole script, and the permissions file that tells Google what the script is allowed to touch. After that is what the website tells me it does.

Check the claims against the code. The script has a long comment at the top describing itself, and the website has a privacy page. Both are claims. Neither is evidence. Only the code is evidence.

Please answer in four parts.

1. In plain English, list everything that leaves my Google account, where it goes, and what causes it to be sent. Be exhaustive. If something leaves that the claims below do not mention, say so.

2. Go through the claims one at a time. Mark each TRUE, FALSE or MISLEADING, and quote the lines of code that decide it. A claim you cannot check from this code alone is UNPROVABLE, not TRUE.

3. Tell me anything this code does that would bother me, whether or not the claims mention it.

4. Tell me what you cannot know from this code alone, and what I would have to take on trust.

Do not be reassuring and do not give credit for careful-looking code. If something is fine, say so in one line. If something is wrong, say exactly what it is and how much it matters. I would rather be told not to install this.`;

/** The fence that opens each part of the package, so a model can tell them apart. */
function block(title: string, body: string): string {
  return `\n\n===== ${title} =====\n\n${body.trim()}\n`;
}

/**
 * The claims, as prose, generated from the module the site renders.
 *
 * Deliberately not hand-written. A hand-written summary of our own claims is a
 * chance to quietly drop the awkward ones, and this page only works if the
 * reviewer is checking the real thing.
 */
export function claimsText(): string {
  const lines: string[] = [];

  lines.push("These are taken from blotterib.com. They are generated from the same file");
  lines.push("that writes the website's privacy section and privacy policy, so they are");
  lines.push("word for word what the site says. You can check them at blotterib.com/privacy.");
  lines.push("");
  lines.push("--- The main claim ---");
  lines.push("");
  lines.push(CANDID_CLAIM);
  lines.push("");
  lines.push("--- How the site says it works ---");
  lines.push("");
  for (const s of PROCESSING_STEPS) lines.push(`${s.n}. ${s.title}. ${s.body}`, "");

  lines.push("--- What the site says each permission can and cannot do ---");
  lines.push("");
  for (const p of PERMISSIONS) {
    lines.push(`${p.service} can:`);
    for (const c of p.can) lines.push(`  - ${c}`);
    lines.push(`${p.service} cannot:`);
    for (const c of p.cannot) lines.push(`  - ${c}`);
    lines.push("");
  }
  lines.push(`On the Sheets row: ${SHEETS_SCOPE_NOTE}`, "");

  lines.push(`--- ${BROAD_HEADING} ---`, "", BROAD_BODY, "");
  lines.push(`--- ${KEEPS_HEADING} ---`, "");
  for (const k of KEEPS_BODY) lines.push(k, "");
  lines.push(KEEPS_COUNTS, "", KEEPS_CALENDAR, "");

  lines.push("--- What the site promises Blotter never does ---", "");
  for (const c of COMMITMENTS) lines.push(`  - ${c}`);
  lines.push("", DELETION_STATEMENT, "");

  lines.push(`--- ${HOSTING_HEADING} ---`, "");
  for (const h of HOSTING_BODY) lines.push(h, "");

  lines.push("--- Questions the site answers ---", "");
  for (const f of PRIVACY_FAQ) lines.push(`Q: ${f.q}`, `A: ${f.a}`, "");

  return lines.join("\n");
}

/**
 * Prompt, manifest, script, claims — in that order, and the order matters.
 *
 * The prompt is first because a model reads the instruction before the
 * evidence. The manifest is before the script because it is four lines that
 * change how the next two thousand are read. The claims are last because they
 * are the thing being tested, and a reviewer who meets them before the code
 * tends to look for confirmation of them rather than at the code.
 */
export function auditPackage(script: string, manifest: string): string {
  return (
    AUDIT_PROMPT +
    block(
      "THE PERMISSIONS FILE (appsscript.json)",
      "This is what Google was actually asked for. It decides what is possible.\n\n" +
        manifest,
    ) +
    block(
      "THE SCRIPT (Code.gs)",
      "This is the whole thing. It runs inside my Google account.\n\n" + script,
    ) +
    block("WHAT THE WEBSITE CLAIMS", claimsText())
  );
}
