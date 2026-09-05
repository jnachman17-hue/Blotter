import type { ReactNode } from "react";

/**
 * The five permissions, one ruled row each: what the scope lets the script do,
 * what it cannot do, and a chip saying how wide it is.
 *
 * ## Where the rows come from
 *
 * The page hands in the `oauthScopes` list from `public/appsscript.json`, and
 * the ledger walks that list in order. So it can only ever show what the
 * manifest actually asks for. A scope the manifest asks for that has no
 * description here is printed with its name and a plain "not described" line
 * rather than being dropped, because a permission missing from a ledger of
 * permissions is the one thing this component must never do quietly.
 *
 * ## Why one chip is amber
 *
 * Google's Gmail permission is the whole mailbox. There is no narrower one
 * that allows searching, so the limit is set by the code and not by Google
 * (finding 2.19). It is the widest of the five, so it is the one that should
 * look different. The other four are grey.
 */

interface Row {
  /** What it lets the script do, plainly. */
  can: string;
  /** What it does not let the script do. */
  cannot: string;
  /** Chip text. */
  chip: string;
  /** The one whole-mailbox permission gets the amber chip. */
  wide?: boolean;
}

const PREFIX = "https://www.googleapis.com/auth/";

const ROWS: Record<string, Row> = {
  "gmail.readonly": {
    can: "Read mail. Search and read conversations.",
    cannot: "Cannot send, delete, move or label anything.",
    chip: "read, whole mailbox",
    wide: true,
  },
  "calendar.readonly": {
    can: "Read events.",
    cannot: "Cannot add, change or cancel an event.",
    chip: "read",
  },
  "spreadsheets.currentonly": {
    can: "This one sheet.",
    cannot: "Cannot see any other sheet, or Drive.",
    chip: "this sheet only",
  },
  "script.external_request": {
    can: "Reach our server.",
    cannot: "This is the permission that lets data leave.",
    chip: "send facts out",
  },
  "script.scriptapp": {
    can: "Run while you are away.",
    cannot: "Every 15 minutes by day, every 2 hours overnight.",
    chip: "timer",
  },
};

function Chip({ amber, children }: { amber?: boolean; children: ReactNode }) {
  return (
    <span
      className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-micro leading-[1.6] font-medium ${
        amber ? "bg-chip-noreply-bg text-chip-noreply-fg" : "bg-chip-sent-bg text-chip-sent-fg"
      }`}
    >
      {children}
    </span>
  );
}

export function PermissionsLedger({ scopes }: { scopes: string[] }) {
  return (
    <ul className="mt-6 max-w-[64ch] divide-y divide-rule border-y border-rule">
      {scopes.map((scope) => {
        const short = scope.startsWith(PREFIX) ? scope.slice(PREFIX.length) : scope;
        const row = ROWS[short];
        return (
          <li key={scope} className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[12px] leading-[1.5] break-all text-ink">{short}</p>
              <p className="mt-1 text-body leading-[1.6] text-ink">
                {row ? row.can : "Not described on this page yet."}
              </p>
            </div>
            {row && (
              <div>
                <p className="text-body leading-[1.6] text-ink-muted">{row.cannot}</p>
                <Chip amber={row.wide}>{row.chip}</Chip>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
