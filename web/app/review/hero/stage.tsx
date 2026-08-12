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
import { SiteHeaderBar, type HeaderTagline } from "@/components/site-header";
import {
  HEADER_TAGLINE_VARIANTS,
  type HeroTopVariant,
} from "@/components/hero/hero-top";

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
    note: "Withdrawn. Jon: “it almost feels like our page is hopping over to the left.” He is right, and the argument for it was wrong: it rested on the empty right at the top rhyming with the empty right of the film, but the film's right is NOT reliably empty. A cue occupies it for about half the run. So the rhyme is intermittent and the lean is constant. Kept only for comparison.",
  },
  {
    key: "f",
    label: "F · Left funnel",
    note: "Eyebrow moves to the header bar. Headline, subhead, CTA stacked and each narrower than the last: 620, then 440, then the button. Tests whether the upside-down-triangle quality Jon liked in A needs centring, or only needs each element narrower than the one above it.",
  },
  {
    key: "g",
    label: "G · Counterbalance",
    note: "THE RECOMMENDATION. Eyebrow in the header, headline left, subhead right, CTA on its own row. The counterbalance Jon liked in C stops the block leaning, which is what he disliked in E; the header supplies the page start he missed in B; nothing is centred, avoiding the too-AI-SaaS risk he flagged in A. It is also the shortest, because the subhead sits beside the headline rather than under it: about 150px against the current 248.",
  },
  {
    key: "h",
    label: "H · Centred",
    note: "A again, now that the eyebrow has left the hero. Jon's two objections to A were different in kind: half the film being off screen is a height problem, which the header eyebrow fixes, and “too AI-SaaS” is a taste problem. With the height gone, this isolates the only question left.",
  },
];

/** Only F, G and H expect the tagline in the bar. */
const TAGLINES: { key: HeaderTagline; label: string; note: string }[] = [
  { key: "persist", label: "Tagline persists", note: "stays for the whole page" },
  { key: "scroll", label: "Tagline fades", note: "gone once you start reading" },
];

export function Stage() {
  const params = useSearchParams();
  const fromUrl = parseInt(params.get("v") ?? "", 10);
  const initial = fromUrl >= 1 && fromUrl <= VARIANTS.length ? fromUrl - 1 : 0;
  const [i, setI] = useState(initial);
  const [tag, setTag] = useState<HeaderTagline>(
    params.get("tag") === "persist" ? "persist" : "scroll",
  );

  const changeTag = useCallback((next: HeaderTagline) => {
    setTag(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tag", next);
    window.history.replaceState(null, "", url);
  }, []);

  const change = useCallback((next: number) => {
    setI(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(next + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const active = VARIANTS[i];
  const usesTagline = HEADER_TAGLINE_VARIANTS.includes(active.key);

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
          {usesTagline && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] tracking-[0.1em] text-ink-faint uppercase">
                Header
              </span>
              {TAGLINES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => changeTag(t.key)}
                  aria-pressed={tag === t.key}
                  className={
                    "rounded-full px-3 py-1.5 text-[12px] transition-colors duration-150 ease-out " +
                    (tag === t.key
                      ? "bg-navy-900 text-white"
                      : "bg-navy-900/[0.06] text-ink-muted hover:bg-navy-900/[0.1]")
                  }
                >
                  {t.label}
                </button>
              ))}
              <span className="text-[12px] text-ink-faint">
                {TAGLINES.find((t) => t.key === tag)?.note}. Scroll to see the
                difference.
              </span>
            </div>
          )}
          <hr className="mt-6 border-navy-900/10" />
        </PageBox>
      </div>

      {/*
        The real header, so the tagline can be judged where it actually lives.
        Sticky, exactly as the page mounts it.
      */}
      <SiteHeaderBar tagline={usesTagline ? tag : "off"} />

      {/* Keyed so switching re-mounts and the film restarts from its first beat. */}
      <div className="field-open">
        <Hero key={`${active.key}-${tag}`} top={active.key} />
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
