/**
 * The Outstanding tab, composed for a phone.
 *
 * Authority: `04-SECTION-4-OUTSTANDING-ACTIONS.md` §7 for the rows and counts
 * and §12 for what a smaller-screen treatment must preserve — all three
 * category counts, a readable explanatory row from each, the category order,
 * the Contact-to-reason relationship, and recognisable Google Sheets context.
 *
 * ## Why this shape and not the desktop one
 *
 * Jon, August 11, 2026: use the version in the films rather than *"this long
 * mini row version that's used for the desktop web screen"*. He is right and
 * the desktop composition is the reason. Desktop runs the three groups as
 * **columns**, which is what lets all 21 actions fit in thirteen rows; on a
 * phone there is no room for three columns, so `Fit` was scaling that
 * composition to about 0.29 and every name in it was under 4px.
 *
 * The films already solved it. `social/blotter-film-a-4x5.html` sets the same
 * data as a **vertical list**: a title bar with the total, one header row naming
 * the columns, then each group announced by a tinted header carrying its
 * coloured rule, its dot and its count, with its rows beneath. That is
 * `04-SECTION-4` §7's own structure and the shape the ratified PNG draws, so
 * this is a return to the spec rather than a departure from it.
 *
 * ## The one thing taken from the film and not reproduced
 *
 * The film ends each group with a `+N more` row. **`FULL` does not**, and that
 * is deliberate: Jon overruled exactly those rows on August 5, 2026, because
 * the section promises *"one current view of every action you owe"* and four of
 * the discarded asset's six rows were labels announcing that the content was
 * not visible. A phone has the vertical room the desktop three-column layout
 * did not, so every one of the 21 actions is listed.
 *
 * `CUT` reproduces the film exactly, `+N more` included, so the two can be
 * compared at device width. It is the film's compression, not a new idea.
 *
 * ## Next action
 *
 * §12 asks for the relationship among Contact, Next action and Why it is here.
 * The group header carries the action — `Replies owed` is the reply, and every
 * row beneath it is a reply owed — which is how the desktop build reads it too,
 * and it is why the rows carry a contact and a reason rather than a verb each.
 */

import { SheetWindow } from "@/components/sheet/sheet-window";
import { OUTSTANDING_GROUPS, OUTSTANDING_TOTAL } from "@/lib/sheet-data";

export type OutstandingPhoneVariant = "full" | "cut";

const TABS = [
  { label: "Contacts" },
  { label: "Blotter" },
  { label: "Outstanding", active: true },
];

/**
 * The film's own overflow copy, kept verbatim so `CUT` really is the film.
 * Only ever rendered by `CUT`.
 */
const MORE: Record<string, string> = {
  "Replies owed": "more replies owed",
  "Follow-ups due": "more follow-ups due",
  "Thank-you notes": "more thank-you notes",
};

export function OutstandingPhone({
  variant = "full",
}: {
  variant?: OutstandingPhoneVariant;
}) {
  return (
    <SheetWindow
      selectedCell="A1"
      formulaValue="Outstanding actions"
      /*
        No letter strip. The film hides it on this view for the same reason —
        the Outstanding composition is taller than the tracker and the letters
        buy nothing on a view whose columns are already named in words.
      */
      columnLetters={[]}
      tabs={TABS}
      menuCount={4}
      showSaveState={false}
    >
      <div className="sheet-type text-[13px]">
        {/* Title bar. The total is the completeness claim, stated. */}
        <div className="flex items-center justify-between gap-2 border-b border-sheet-grid px-3 py-2.5">
          <span className="text-[16px] font-bold text-ink">
            Outstanding actions
          </span>
          <span className="shrink-0 rounded-full border border-sheet-grid bg-sheet-header px-2.5 py-[3px] text-[11.5px] whitespace-nowrap text-ink-muted">
            {OUTSTANDING_TOTAL} in total
          </span>
        </div>

        {/* Column header row, §12's Contact-to-reason relationship named. */}
        <div className="flex border-b border-sheet-grid bg-sheet-header text-[11.5px] font-semibold text-ink">
          <span className="w-[46%] shrink-0 px-3 py-1.5">Contact</span>
          <span className="px-3 py-1.5">Why it is here</span>
        </div>

        {OUTSTANDING_GROUPS.map((g) => {
          const rows = variant === "cut" ? g.rows.slice(0, 1) : g.rows;
          const remaining = g.count - rows.length;
          return (
            <div key={g.label}>
              {/*
                The group header. `04-SECTION-4` §9 requires the coloured left
                rule and the ratified PNG draws it; it is what keeps these
                headers rather than cards.
              */}
              <div
                className="flex items-center justify-between border-b border-sheet-grid px-3 py-2"
                style={{ background: g.tint, borderLeft: `4px solid ${g.rule}` }}
              >
                <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                  <span
                    aria-hidden="true"
                    className="size-[7px] shrink-0 rounded-full"
                    style={{ background: g.rule }}
                  />
                  {g.label}
                </span>
                <span
                  className="text-[15px] font-bold tabular-nums"
                  style={{ color: g.rule }}
                >
                  {g.count}
                </span>
              </div>

              {rows.map((row) => (
                <div
                  key={row.who}
                  className="flex items-baseline border-b border-sheet-grid"
                >
                  <span className="w-[46%] shrink-0 truncate px-3 py-[7px] font-medium text-ink">
                    {row.who}
                  </span>
                  <span className="truncate px-3 py-[7px] text-[11.5px] text-ink-faint">
                    {row.why}
                  </span>
                </div>
              ))}

              {variant === "cut" && remaining > 0 && (
                <div className="border-b border-sheet-grid px-3 py-[7px] text-[12px] text-ink-faint">
                  +{remaining} {MORE[g.label]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SheetWindow>
  );
}
