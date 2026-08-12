"use client";

/**
 * Six hero top blocks, each shown with the real film beneath it.
 *
 * The film is mounted in every variant rather than mocked, because the whole
 * question is how the copy sits against it — and because the film's own
 * left-weighted composition is the argument variant E is built on.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import { Hero } from "@/components/sections/hero";
import { type HeroTopVariant } from "@/components/hero/hero-top";

import { Picker } from "../sheet-mobile/picker";

const VARIANTS: { key: HeroTopVariant; label: string; note: string }[] = [
  {
    key: "current",
    label: "Live",
    note: "What is on the branch now. 248px above the film: eyebrow 35, headline 85, paragraph 82, CTA 44, authority line 20. The headline is the smallest block in its own hero, the right column is twice its height, and the authority line has 16px above and below it, which is why it reads as attached to the film.",
  },
  {
    key: "a",
    label: "A · Centred",
    note: "The devtool default. Evil Martians studied 100 devtool landing pages: the vast majority centre the hero, and side-by-side reads as classic SaaS. Linear is exactly this shape, with a single short subheadline and no paragraph. It costs the page theme's centre-nothing rule, which existed because the OLD static hero was asymmetric. Whether that premise survived the film is the question this variant asks.",
  },
  {
    key: "b",
    label: "B · Two columns",
    note: "The conservative option: keeps the ratified split and fixes what was broken in it. With the paragraph cut to one line the two columns finally end together instead of 95px apart, and the right column is a bound block rather than four unrelated weights stacked.",
  },
  {
    key: "c",
    label: "C · CTA row",
    note: "Headline and subhead share the split, then the CTA drops to a full-width row on the page's left axis. Nothing is centred, and the columns no longer have to resolve against each other because the CTA has left the column entirely.",
  },
  {
    key: "d",
    label: "D · No subhead",
    note: "Eyebrow, headline, CTA. Nothing else. Jon: “I don't know if we need all that text there and maybe try and let visual asset do more of the work.” The film demonstrates what the subhead asserts, three times with names, 300px below it. This is the shortest variant, so it buys the most film above the fold on a small laptop.",
  },
  {
    key: "e",
    label: "E · Left-weighted",
    note: "Everything in a narrow left column, right side deliberately empty. The only variant built from the film's own composition rather than a layout convention: the film's weight sits left and its right is empty except when a cue is present, so the empty right at the top rhymes with the empty right below. It keeps centre-nothing and pushes it further.",
  },
];

export function Stage() {
  const params = useSearchParams();
  const fromUrl = parseInt(params.get("v") ?? "", 10);
  const initial = fromUrl >= 1 && fromUrl <= VARIANTS.length ? fromUrl - 1 : 0;
  const [i, setI] = useState(initial);

  const change = useCallback((next: number) => {
    setI(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(next + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const active = VARIANTS[i];

  return (
    <div>
      {/* Harness chrome, deliberately plain so it reads as not-the-page. */}
      <div className="pt-8">
        <PageBox>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
            0{i + 1} / 0{VARIANTS.length} &nbsp; {active.label}
          </p>
          <p className="mt-2 max-w-[76ch] text-[13px] leading-[1.5] text-ink-muted">
            {active.note}
          </p>
          <hr className="mt-6 border-navy-900/10" />
        </PageBox>
      </div>

      {/* Keyed so switching re-mounts and the film restarts from its first beat. */}
      <div className="field-open">
        <Hero key={active.key} top={active.key} />
      </div>

      <div className="pb-40">
        <PageBox>
          <hr className="mb-6 border-navy-900/10" />
          <p className="max-w-[76ch] text-[12.5px] leading-[1.5] text-ink-faint">
            Every variant is desktop only; below the breakpoint each renders the
            phone hero ratified in stage 10, untouched. Two things are held
            constant across A to E so there is one variable: the supporting
            paragraph drops to the phone&rsquo;s ratified 13-word line, and the
            authority line moves below the film. Worth checking at a laptop
            height as well as 1440, since the film clearing the fold is what
            started this.
          </p>
        </PageBox>
      </div>

      <Picker
        labels={VARIANTS.map((v) => v.label)}
        current={i}
        onChange={change}
      />
    </div>
  );
}
