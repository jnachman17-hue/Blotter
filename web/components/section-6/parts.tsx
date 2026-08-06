/**
 * Section 6 parts, rebuilt August 6, 2026.
 *
 * Jon rejected the first build outright: no stylistic technique, too much text,
 * unreadable, "a blob of unformatted information that no reader would ever
 * read." He was right, and the cause was structural rather than typographic.
 * The section stated the same handful of facts four times because
 * `06-SECTION-6` asks for four passes over them — prose claim, four steps,
 * permissions matrix, nine commitments, seven-question FAQ — and the fifth pass
 * was the FAQ restating all four.
 *
 * What changed, all of it his ruling:
 *
 *   §7  the four steps stop being four rows of prose and become a mechanism.
 *       Colour is semantic, not decorative: grey is the excluded track, navy is
 *       the processed one, cream means Blotter maintains it, exactly as
 *       everywhere else on this page. This reverses §7's ban on icons and
 *       illustrations for the steps.
 *   §8  the table gains the Gmail, Calendar and Sheets marks, which §8 always
 *       permitted at small size and the first build declined. It also absorbs
 *       the commitments.
 *   §9  the broad-permission notice loses its banner and becomes a caption
 *       under the table. It stays on the page — Jon asked whether it could move
 *       into the privacy policy and accepted the argument that it must not,
 *       since it is the only place the page reconciles Google's broad consent
 *       screen with the narrower processing claim, and §18 bans hiding it.
 *   §11 the nine-item commitments block is gone. Seven of the nine are already
 *       `Cannot do` rows or already stated above; the two that are not sit
 *       under the table.
 *
 * Unchanged and still obeyed: every string is verbatim, nothing here is a card,
 * there are no seals, no shields, no fake toggles, no simulated consent screen,
 * no checkmark-versus-X treatment, and no claim is hidden behind an interaction.
 */

import { CalendarMark, GmailMark, SheetsMark } from "@/components/google-marks";
import { cn } from "@/lib/cn";
import {
  BROAD_BODY,
  BROAD_HEADING,
  COMMITMENTS_UNCOVERED,
  PERMISSION_COLUMNS,
  PERMISSIONS,
  PROCESSING_STEPS,
} from "@/lib/privacy-copy";

/* ------------------------------------------------------------- shared pieces */

export function Subhead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-display text-[1.0625rem] leading-[1.4] font-semibold tracking-[-0.01em] text-ink",
        className,
      )}
    >
      {children}
    </h3>
  );
}

/** A step number. Quiet, mono, and it orders the mechanism rather than decorating it. */
function Step({ n, tone }: { n: string; tone: "neutral" | "stop" | "go" }) {
  return (
    <span
      className={cn(
        "font-mono text-micro leading-none font-medium tabular-nums",
        tone === "stop" && "text-ink-faint",
        tone === "go" && "text-navy-500",
        tone === "neutral" && "text-ink-faint",
      )}
    >
      {n}
    </span>
  );
}

/* ------------------------------------------- §7 the mechanism, formerly 4 rows */

const SERVICES = [
  { mark: <GmailMark width={17} height={13} />, label: "Gmail" },
  { mark: <CalendarMark size={16} />, label: "Calendar" },
  { mark: <SheetsMark size={16} />, label: "Sheets" },
];

/**
 * One gate, two tracks, one outcome.
 *
 * The four ratified sentences all survive, but they are placed rather than
 * stacked: 01 is the gate every message passes, 02 and 03 are the two things
 * that can happen at it, and 04 is what is left afterwards. A reader who looks
 * at this for two seconds and reads nothing still learns the only thing that
 * matters, which is that one of the two tracks is a dead end.
 */
export function Mechanism() {
  const [gate, stop, go, keep] = PROCESSING_STEPS;

  return (
    <div className="rounded-xl border border-rule bg-white/55">
      {/* The gate. Everything arrives here and nothing gets past it unchecked. */}
      <div className="flex items-center gap-6 border-b border-rule px-7 py-5">
        <div className="flex items-center gap-2.5">
          {SERVICES.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-white px-2.5 py-1 text-micro font-medium text-ink-muted"
            >
              {s.mark}
              {s.label}
            </span>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <Step n={gate.n} tone="neutral" />
            <h3 className="text-body leading-[1.4] font-semibold text-ink">{gate.title}</h3>
          </div>
          <p className="mt-1 max-w-[62ch] text-small leading-[1.55] text-ink-muted">
            {gate.body}
          </p>
        </div>
      </div>

      {/*
        The two tracks.

        The difference is carried by ground and by the step number's colour, not
        by dimming the copy. An earlier pass set the excluded track in
        `ink-faint` and terminated each lane with a small rule and a dot; the
        rules read as stray marks, and greying the text made the page's most
        important exclusion its least legible sentence. Both tracks now read at
        the same strength, which is also the honest treatment: neither is a
        warning.
      */}
      <div className="grid grid-cols-2">
        <div className="border-r border-rule bg-ink/[0.022] px-7 py-6">
          <div className="flex items-baseline gap-3">
            <Step n={stop.n} tone="stop" />
            <h3 className="text-body leading-[1.4] font-semibold text-ink-muted">
              {stop.title}
            </h3>
          </div>
          <p className="mt-1.5 text-small leading-[1.55] text-ink-muted">{stop.body}</p>
        </div>

        <div className="px-7 py-6">
          <div className="flex items-baseline gap-3">
            <Step n={go.n} tone="go" />
            <h3 className="text-body leading-[1.4] font-semibold text-ink">{go.title}</h3>
          </div>
          <p className="mt-1.5 text-small leading-[1.55] text-ink-muted">{go.body}</p>
        </div>
      </div>

      {/*
        What the surviving track leaves behind. Cream, because cream means
        "Blotter maintains this" on every other section of this page and this is
        the moment it starts doing so.
      */}
      <div className="flex items-baseline gap-3 border-t border-rule bg-blotter-100/45 px-7 py-5">
        <Step n={keep.n} tone="go" />
        <div>
          <h3 className="text-body leading-[1.4] font-semibold text-ink">{keep.title}</h3>
          <p className="mt-1 max-w-[74ch] text-small leading-[1.55] text-ink-muted">
            {keep.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------- §8 the permissions table */

const MARKS: Record<string, React.ReactNode> = {
  Gmail: <GmailMark width={19} height={14} />,
  "Google Calendar": <CalendarMark size={18} />,
  "Google Sheets": <SheetsMark size={18} />,
};

/**
 * Can do and Cannot do, per service.
 *
 * The two columns are told apart by their bullet alone: a filled navy dot for
 * what the connection does, an open ring for what it cannot. Both are neutral
 * marks at the same size and weight. §8 bans the checkmark-versus-X treatment,
 * and the honest reading is that a `Cannot do` list is a fact, not a warning.
 *
 * Still a real `<table>`: it is genuinely tabular, and a screen reader should
 * announce which column a cell belongs to. §16 turns this into three sequential
 * service blocks on small screens, which is responsive-phase work.
 */
export function PermissionsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-rule">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {PERMISSION_COLUMNS.map((label, i) => (
              <th
                key={label}
                scope="col"
                className={cn(
                  "border-b border-rule bg-white/45 py-3.5 text-micro leading-none font-medium tracking-[0.09em] text-ink-faint uppercase",
                  i === 0 ? "w-[228px] pr-6 pl-7" : "px-6",
                  i === 1 && "w-[42%]",
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERMISSIONS.map((row, i) => (
            <tr
              key={row.service}
              className={cn(
                "align-top",
                i > 0 && "border-t border-rule",
                i % 2 === 1 && "bg-white/35",
              )}
            >
              <th scope="row" className="py-6 pr-6 pl-7">
                <span className="flex items-center gap-2.5 text-body leading-[1.4] font-semibold text-ink">
                  {MARKS[row.service]}
                  {row.service}
                </span>
              </th>
              <td className="px-6 py-6">
                <ul className="space-y-2.5">
                  {row.can.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-small leading-[1.55] text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-navy-500"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-6 pr-7">
                <ul className="space-y-2.5">
                  {row.cannot.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-small leading-[1.55] text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full border border-ink-faint/80"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------ §9 and §11, as table footnotes */

/**
 * The two notes that belong to the table rather than to the section.
 *
 * The broad-permission disclosure is first and stays legible. Jon asked on
 * August 6, 2026 whether it could move into the privacy policy; it cannot —
 * §9 fixes it immediately below the table, §16 forbids weakening it and §18
 * bans hiding it. Losing the banner it sat in was the right half of that
 * instruction and is what happened here.
 *
 * Then the two commitments no `Cannot do` row covers.
 */
export function TableNotes() {
  return (
    <div className="mt-5 grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-x-12">
      <p className="text-small leading-[1.6] text-ink-muted">
        <span className="font-semibold text-ink">{BROAD_HEADING}.</span> {BROAD_BODY}
      </p>
      <ul className="space-y-2">
        {COMMITMENTS_UNCOVERED.map((line) => (
          <li key={line} className="flex gap-3 text-small leading-[1.55] text-ink-muted">
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full border border-ink-faint/80"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
