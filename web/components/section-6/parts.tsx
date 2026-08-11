"use client";

/**
 * Section 6 parts, third build, August 6, 2026.
 *
 * Jon rejected the second build too. His diagnosis was right and it was
 * structural: the section stacked six different layout languages — a quote
 * block, a bordered diagram card, a table card, a two-column note, a
 * two-column text pair, a paragraph — and each was defensible against its own
 * spec clause while the whole read as chaos. The `01 / 02 03 / 04` shape
 * implied a flow that was never drawn. Orphan bullets and a floating statement
 * were leftover content parked in whitespace.
 *
 * His instruction: reduce the section massively, push the rest to the back
 * page, keep one visual flow of the four steps with icons, take the box off it
 * so it sits on the gradient, and incorporate the permissions material
 * minimally.
 *
 * Reference point, and it settled the macro question: Shortwave — a Gmail app
 * on restricted scopes that has to survive the same Google review — carries
 * none of this on its marketing site. It lives on a docs page, eleven headed
 * sections, prose only, no tables and no cards. The serious version of this is
 * a small section plus a real page behind it.
 *
 * So the section is now three things: a claim, a flow, and three service
 * columns. Everything else — the four steps in prose, the full matrix,
 * retention, deletion, the commitments, the provider detail and the FAQ — is on
 * `/privacy`.
 *
 * Still obeyed: every string verbatim, no eyebrow, no CTA, no seals or security
 * iconography, no simulated OAuth or permission toggles, no
 * checkmark-versus-X treatment, and nothing hidden behind an interaction.
 */

import { Accordion } from "@base-ui/react/accordion";

import { DisclosureControl } from "@/components/disclosure";
import { CalendarMark, GmailMark, SheetsMark } from "@/components/google-marks";
import {
  CheckSenderIcon,
  KeepIcon,
  ReadIcon,
  StopIcon,
} from "@/components/section-6/step-icons";
import { cn } from "@/lib/cn";
import {
  BROAD_BODY,
  BROAD_HEADING,
  PERMISSIONS,
  PROCESSING_STEPS,
  SHEETS_SCOPE_NOTE,
} from "@/lib/privacy-copy";

/* ------------------------------------------------------------------- the flow */

const ICONS = [CheckSenderIcon, StopIcon, ReadIcon, KeepIcon];

/**
 * The four steps as one flow, drawn on the page rather than inside a panel.
 *
 * Four beats of one story read left to right: first the sender is checked,
 * then nothing happens if there is no match, then the message is read if there
 * is, then only facts survive. The second beat is the exclusion and it is the
 * one the reader cares about, so it carries the struck mark and a muted ring
 * while the others are navy — colour does the branching that a fork diagram
 * would otherwise have to draw.
 *
 * The connector is a hairline running between the marks at their centre. It
 * stops before the last one, because the story does.
 *
 * ## On a phone
 *
 * `06-SECTION-6` §16: "the four processing steps remain stacked".
 *
 * Four columns inside a 280px page box gave each step 46px, narrower than the
 * word `Unmatched`, and the text painted outside its column — which is why the
 * page still scrolled sideways at 320px after every box on it was in bounds.
 *
 * **The connector turns ninety degrees rather than disappearing.** It is the
 * only thing saying these four are one flow rather than four notes, and the
 * second beat is the exclusion, so the join is what makes the branch read as a
 * branch. Horizontally it runs from each mark to the next and stops before the
 * last; stacked it runs downward and stops at the same place.
 *
 * Both wrappers are `desk:contents`, so above the breakpoint they vanish from
 * layout and the desktop tree is exactly what it was before this change: the
 * mark row, then the numeral, then the heading, then the body, as direct
 * children of the `li`.
 */
export function ProcessingFlow() {
  return (
    <ol className="grid desk:grid-cols-4 desk:gap-x-8">
      {PROCESSING_STEPS.map((step, i) => {
        const Icon = ICONS[i];
        const excluded = i === 1;
        const joined = i < PROCESSING_STEPS.length - 1;
        return (
          <li key={step.n} className="flex gap-4 desk:block">
            <div className="flex flex-col items-center desk:contents">
              <div className="flex items-center desk:w-full">
                <span
                  className={cn(
                    "grid size-[52px] shrink-0 place-items-center rounded-full border bg-white",
                    excluded
                      ? "border-rule text-ink-faint"
                      : "border-navy-400/35 text-navy-800",
                  )}
                >
                  <Icon />
                </span>
                {joined && (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-navy-400/25 desk:block"
                  />
                )}
              </div>
              {joined && (
                <span
                  aria-hidden="true"
                  className="mt-2 w-px flex-1 bg-navy-400/25 desk:hidden"
                />
              )}
            </div>

            {/* The trailing space the vertical connector runs through. The
                last step has no connector, so it needs none. */}
            <div className={cn("min-w-0 flex-1 desk:contents", joined && "pb-9")}>
              <p className="font-mono text-micro leading-none font-medium text-ink-faint tabular-nums desk:mt-5">
                {step.n}
              </p>
              <h3
                className={cn(
                  "mt-2 text-body leading-[1.35] font-semibold",
                  excluded ? "text-ink-muted" : "text-ink",
                )}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-small leading-[1.6] text-ink-read">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------------------------------------- the service columns */

const MARKS: Record<string, React.ReactNode> = {
  Gmail: <GmailMark width={19} height={14} />,
  "Google Calendar": <CalendarMark size={18} />,
  "Google Sheets": <SheetsMark size={18} />,
};

/**
 * The two lists, identical in every rendering, preceded by the scope note where
 * one applies.
 *
 * Only Sheets has one, because Sheets is the only service whose Google consent
 * screen names a different product than this page does. See `SHEETS_SCOPE_NOTE`.
 */
function ServiceLists({
  row,
  scopeNote = false,
}: {
  row: (typeof PERMISSIONS)[number];
  /**
   * Desktop shows the Drive note in the Sheets column, where it sits beside the
   * claims it qualifies. Mobile does not: inside a collapsed accordion it was
   * behind a row labelled `Google Sheets`, which gives a reader no reason to
   * open it — and the note exists precisely to stop them being surprised. On a
   * phone it moves in with the broad-permission disclosure, under a title that
   * says what is inside. Same argument, one place.
   */
  scopeNote?: boolean;
}) {
  return (
    <>
      {scopeNote && row.service === "Google Sheets" && (
        <p className="mb-4 text-small leading-[1.55] text-ink-muted">
          {SHEETS_SCOPE_NOTE}
        </p>
      )}
      <p className="text-micro leading-none font-medium tracking-[0.09em] text-ink-muted uppercase">
        Can do
      </p>
      <ul className="mt-2.5 space-y-2">
        {row.can.map((line) => (
          <li key={line} className="flex gap-2.5 text-small leading-[1.55] text-ink-read">
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-navy-500"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-micro leading-none font-medium tracking-[0.09em] text-ink-muted uppercase">
        Cannot do
      </p>
      <ul className="mt-2.5 space-y-2">
        {row.cannot.map((line) => (
          <li key={line} className="flex gap-2.5 text-small leading-[1.55] text-ink-read">
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full border border-ink-faint/80"
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Desktop: the permissions matrix turned ninety degrees and stripped of its
 * chrome. Untouched by the mobile build.
 *
 * The same exact content as the table, in three narrow columns instead of one
 * wide grid: the eye scans three short lists rather than tracking across a
 * 1,124px row, and the three columns end at roughly the same depth, which the
 * table never did. No header row, no borders, no alternating fills, no
 * container. `Can do` and `Cannot do` are told apart by a hairline and by the
 * bullet alone — a filled dot for what the connection does, an open ring for
 * what it cannot. §8's ban on the checkmark-versus-X treatment holds, and both
 * lists read at the same strength because a `Cannot do` list is a fact rather
 * than a warning.
 *
 * The column labels are the spec's own `Can do` and `Cannot do`, set small.
 */
function ServiceColumns() {
  return (
    <div className="hidden desk:grid desk:grid-cols-3 desk:gap-x-12">
      {PERMISSIONS.map((row) => (
        <div key={row.service}>
          <h3 className="flex items-center gap-2.5 border-b border-rule pb-3 text-body leading-[1.4] font-semibold text-ink">
            {MARKS[row.service]}
            {row.service}
          </h3>
          <div className="mt-4">
            <ServiceLists row={row} scopeNote />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Mobile: `06-SECTION-6` §16's "three sequential service sections", with the
 * two the reader is least worried about folded away.
 *
 * ## Why anything folds
 *
 * Stacked and fully open, the three services are 928px on a 390px phone — a
 * third of Section 6 and a ninth of the entire page, for a matrix a desktop
 * reader takes in with one glance. Section 6 is already 3.8 screenfuls, which
 * is where a phone reader's patience goes.
 *
 * §16 forbids a claim disappearing behind **hover-only** behaviour. A tap is
 * not hover: it works on a phone, it is keyboard-operable, and the panels are
 * `hiddenUntilFound`, so find-in-page opens them. Nothing is withdrawn, nothing
 * is shortened, and the order is unchanged.
 *
 * ## Why Gmail is open and the other two are not
 *
 * Gmail is the permission a stranger is actually frightened of. Answering it
 * before they ask is worth more than the 230px it costs; making them tap to
 * find out what you do with their inbox is the wrong trade on a privacy
 * section. Calendar and Sheets are the reassuring ones, and reassurance can
 * wait to be asked for.
 *
 * ## The counts came off
 *
 * The closed rows read `2 can · 3 cannot` in the first build. Jon's note was
 * right: on a section about trust that reads like a spec sheet. The job the
 * counts were doing — signalling that most of what is inside is a list of
 * things Blotter will not do — is done better by one line above all three rows,
 * where it is a sentence rather than arithmetic and where it is read before the
 * first row instead of three times over.
 */
function ServiceStack() {
  return (
    <div className="desk:hidden">
      {/*
        Set at reading size in full ink rather than as a muted caption. It is
        not a label on the rows below it — it is the sentence that tells a
        reader the rows contain a `cannot` list, which is the reassuring half
        and the reason to open one. Jon's note: it has to jump out.
      */}
      <p className="mb-3 text-body leading-[1.5] font-semibold text-ink">
        What each connection can and cannot do.
      </p>
      <Accordion.Root
        /* Gmail alone. `multiple` so opening Calendar does not shut it again —
           these are three parallel facts, not one answer at a time. */
        defaultValue={[PERMISSIONS[0].service]}
        multiple
        className="border-t border-rule"
      >
        {PERMISSIONS.map((row) => (
          <Accordion.Item
            key={row.service}
            value={row.service}
            className="border-b border-rule"
          >
            <Accordion.Header>
              {/* `group` sits on the trigger, not the item: Base UI puts
                  `data-panel-open` on the trigger, and that is what
                  `DisclosureControl` reads to turn its plus into a minus. */}
              <Accordion.Trigger className="group flex min-h-14 w-full cursor-pointer items-center gap-2.5 py-4 text-left">
                {MARKS[row.service]}
                <span className="text-body leading-[1.4] font-semibold text-ink">
                  {row.service}
                </span>
                <span className="ml-auto pl-4">
                  <DisclosureControl />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            {/* The same `.disclosure-panel` the FAQ uses, so both accordions on
                this page open with one motion rather than two. */}
            <Accordion.Panel hiddenUntilFound className="disclosure-panel">
              <div className="pb-6">
                <ServiceLists row={row} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

/**
 * The broad-permission disclosure, folded, and carrying the Drive note with it.
 *
 * ## Why it may fold but may not go
 *
 * Jon asked whether mobile needs this at all, or whether it could live behind
 * the privacy link. It cannot: the handoff records that **the broad-permission
 * disclosure may not leave the page**, and `06-SECTION-6` §9 fixes it below the
 * permissions material while §18 bans hiding it. It is the only place the page
 * reconciles Google's broad consent screen with the narrower processing claim.
 *
 * Folding is not hiding in the sense §18 means. A tap is not hover: it is
 * keyboard-operable, and `hiddenUntilFound` means find-in-page opens it. The
 * text is unshortened and in its ratified position.
 *
 * ## Why the Drive note joins it
 *
 * They are the same argument. The broad-permission note says Google's consent
 * wording sounds wider than what Blotter does; the Drive note says Google's
 * consent screen names Drive when Blotter touches one sheet. Putting them under
 * one title a reader can act on — *why the permission sounds broader* — beats
 * leaving the Drive fact inside a row labelled `Google Sheets`, which gives
 * nobody a reason to open it.
 *
 * Desktop is unchanged: the two footnotes stay side by side and the Drive note
 * stays in the Sheets column beside the claims it qualifies.
 */
export function BroadPermissionDisclosure() {
  return (
    <Accordion.Root className="border-t border-rule desk:hidden">
      <Accordion.Item value="broad" className="border-b border-rule">
        <Accordion.Header>
          <Accordion.Trigger className="group flex min-h-14 w-full cursor-pointer items-start justify-between gap-6 py-4 text-left">
            <span className="text-body leading-[1.5] font-medium text-ink">
              {BROAD_HEADING}
            </span>
            <DisclosureControl />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel hiddenUntilFound className="disclosure-panel">
          <div className="pb-6">
            <p className="text-small leading-[1.6] text-ink-read">{BROAD_BODY}</p>
            <p className="mt-4 text-small leading-[1.6] text-ink-read">
              {SHEETS_SCOPE_NOTE}
            </p>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export function ServicePermissions() {
  return (
    <>
      <ServiceColumns />
      <ServiceStack />
    </>
  );
}
