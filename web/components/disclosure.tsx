"use client";

/**
 * The page's one accordion, shared by Section 6 and Section 7.
 *
 * Authority: `06-SECTION-6-DATA-AND-PRIVACY.md` §14 and
 * `07-SECTION-7-FAQ-AND-FINAL-CTA.md` §7, which specify the same behaviour in
 * the same words. One component serves both so the two FAQs cannot drift apart
 * in behaviour while remaining, as both specs require, separate lists.
 *
 * Ratified behaviour, all of it enforced here:
 *   all rows closed initially      — no `defaultValue` on the root
 *   one answer open at a time      — Base UI's `multiple` defaults to false
 *   whole question row clickable   — the trigger is the full-width row
 *   clear plus/minus control       — the vertical bar rotates onto the
 *                                    horizontal one, so plus becomes minus
 *   keyboard operable, visible focus, semantic button-to-region relationship
 *                                  — Base UI's own, plus the global
 *                                    `:focus-visible` ring in globals.css
 *   no card per row, thin separators
 *   answers stay in the document reading order
 *
 * Motion is decoration and nothing depends on it: 200ms, ease-out, height and
 * opacity only. `prefers-reduced-motion` is honoured globally in globals.css.
 * The answers are `hiddenUntilFound`, so a reader searching the page with
 * find-in-page lands on a closed answer and the row opens for them — which
 * matters most on Section 6, where someone hunting the word "delete" should
 * not have to open seven rows to find it.
 */

import { Accordion } from "@base-ui/react/accordion";

import { cn } from "@/lib/cn";
import type { FaqEntry } from "@/lib/privacy-copy";

/** The plus that becomes a minus. Restrained, per both specs. */
function Control() {
  return (
    <span
      aria-hidden="true"
      className="relative mt-[0.3em] block h-[11px] w-[11px] shrink-0 text-navy-500"
    >
      <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
      <span
        className={cn(
          "absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current",
          "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "group-data-[panel-open]:rotate-90",
        )}
      />
    </span>
  );
}

interface DisclosureListProps {
  items: FaqEntry[];
  /** Distinguishes the two lists' generated ids. */
  idPrefix: string;
  /** Section 7 sets its questions slightly larger than Section 6's. */
  size?: "default" | "large";
  className?: string;
}

export function DisclosureList({
  items,
  idPrefix,
  size = "default",
  className,
}: DisclosureListProps) {
  return (
    <Accordion.Root className={cn("border-t border-rule", className)}>
      {items.map((item, i) => (
        <Accordion.Item
          key={`${idPrefix}-${i}`}
          value={`${idPrefix}-${i}`}
          className="border-b border-rule"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "group flex w-full cursor-pointer items-start justify-between gap-8 text-left",
                // 44px minimum target height (WS5 accessibility baseline)
                "py-5",
                "transition-colors duration-150 ease-out hover:text-navy-800",
                size === "large"
                  ? "text-lede leading-[1.45] font-medium text-ink"
                  : "text-body leading-[1.5] font-medium text-ink",
              )}
            >
              {item.q}
              <Control />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel hiddenUntilFound className="disclosure-panel">
            <p className="max-w-[68ch] pr-12 pb-6 text-body leading-[1.65] text-ink-muted">
              {item.a}
            </p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
