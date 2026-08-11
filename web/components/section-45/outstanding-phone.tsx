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
 * ## Every action is here, and most of them are one tap away
 *
 * The first build listed all 21 open and ran about 950px — Jon's measure, three
 * thumbs of scroll. The film's answer is to cut each group to one row and
 * append `+N more`, and he asked whether Section 6's disclosure would work
 * instead. It does, and it is the better answer of the two.
 *
 * **A disclosure is not the thing he overruled.** On August 5, 2026 he rejected
 * `+5 more` because the section promises *"one current view of every action you
 * owe"* and four of the discarded asset's six rows were **labels announcing
 * that the content was not visible**. `Show 5 more` is not that label. It is a
 * control that delivers them. A dead sign against a working door, and the
 * distinction is exactly what his objection was about — so this satisfies the
 * August 5 ruling rather than reopening it.
 *
 * It collapses roughly 950px to about 400px, and it is the page's own ratified
 * mobile idiom: Section 6's service rows and both footnote disclosures already
 * work this way, so a reader meets one open-close affordance on this page
 * rather than three.
 *
 * **One accordion per group**, rather than one accordion with three items,
 * because Base UI closes siblings by default and opening `Follow-ups due`
 * should not shut `Replies owed`. Each group owns its own state.
 *
 * The first row of every group stays outside the panel and always visible.
 * §12's readable explanatory row from each category is a hard requirement, and
 * it must not depend on a tap.
 *
 * ## Next action
 *
 * §12 asks for the relationship among Contact, Next action and Why it is here.
 * The group header carries the action — `Replies owed` is the reply, and every
 * row beneath it is a reply owed — which is how the desktop build reads it too,
 * and it is why the rows carry a contact and a reason rather than a verb each.
 */

"use client";

import { Accordion } from "@base-ui/react/accordion";

import { DisclosureControl } from "@/components/disclosure";
import { cn } from "@/lib/cn";
import { SheetWindow } from "@/components/sheet/sheet-window";
import { OUTSTANDING_GROUPS, OUTSTANDING_TOTAL } from "@/lib/sheet-data";

const TABS = [
  { label: "Contacts" },
  { label: "Blotter" },
  { label: "Outstanding", active: true },
];

function Row({ row }: { row: { who: string; why: string } }) {
  return (
    <div className="flex items-baseline border-b border-sheet-grid">
      <span className="w-[46%] shrink-0 truncate px-3 py-[7px] font-medium text-ink">
        {row.who}
      </span>
      <span className="truncate px-3 py-[7px] text-[11.5px] text-ink-faint">
        {row.why}
      </span>
    </div>
  );
}

export function OutstandingPhone() {
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
          const [first, ...rest] = g.rows;
          return (
            <div key={g.label}>
              {/*
                The group header. `04-SECTION-4` §9 requires the coloured left
                rule and the ratified PNG draws it; it is what keeps these
                headers rather than cards. The count is the completeness claim
                per group and it is never behind the disclosure.
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

              <Row row={first} />

              {rest.length > 0 && (
                <Accordion.Root>
                  <Accordion.Item value={g.label}>
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          "group flex w-full cursor-pointer items-center justify-between gap-4",
                          "border-b border-sheet-grid px-3 text-left",
                          /* 44px, the target floor the footer rebuild set. */
                          "min-h-11 py-2",
                          "transition-colors duration-150 ease-out hover:bg-sheet-header",
                        )}
                      >
                        <span className="text-[12.5px] font-medium text-navy-700">
                          <span className="group-data-[panel-open]:hidden">
                            Show {rest.length} more
                          </span>
                          <span className="hidden group-data-[panel-open]:inline">
                            Show fewer
                          </span>
                        </span>
                        <DisclosureControl />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    {/*
                      `hiddenUntilFound` so find-in-page lands on a closed row
                      and opens it. It matters here: someone scanning for a name
                      should not have to open three groups to learn it is listed.
                    */}
                    <Accordion.Panel hiddenUntilFound className="disclosure-panel">
                      {rest.map((row) => (
                        <Row key={row.who} row={row} />
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              )}
            </div>
          );
        })}
      </div>
    </SheetWindow>
  );
}
