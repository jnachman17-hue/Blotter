/**
 * The voice test. Four copy sets, the page's real typography, real widths.
 *
 * ## What this is for
 *
 * Jon's ruling, August 12, 2026: the page reads as SaaS marketing to an audience
 * that detects marketing for sport, and the specs are overridden to test a
 * different register. `04` carries the ruling, `06` carries the open question,
 * `lib/voice.ts` carries the four sets.
 *
 * ## Why the copy is rendered here rather than through the real sections
 *
 * **Deliberate, and it is the safe half of a trade.** Threading four voices
 * through `Hero`, `ScaleAndConsequence`, `Ownership` and `TrackerAndActions`
 * means editing eight live files to compare something that will end with three
 * of the four thrown away. Every one of those edits is a chance to change `/`
 * by accident, and `/` is carrying real traffic today.
 *
 * So this page reuses the **type scale, weights, tracking and colours** rather
 * than the components. Every class here is copied from the section it imitates,
 * so a line breaks where it would break on the real page at the same width.
 *
 * **What it therefore cannot show, stated so nobody is surprised:** the films,
 * the trajectory diagram, the sheet, the Outstanding view, and the exact
 * vertical rhythm between sections. Those are all unchanged by any voice, which
 * is what makes leaving them out honest rather than convenient. The question on
 * this page is the words.
 *
 * Once a voice wins, it gets applied to the real components, once.
 *
 * `?v=og|a|b|c` picks one. Default shows all four stacked for comparison.
 */

import Link from "next/link";

import { VOICES, VOICE_ORDER, isVoiceId, type Voice } from "@/lib/voice";

export const metadata = { robots: { index: false, follow: false } };

/* Classes lifted verbatim from the sections they imitate, so line breaks and
   colour relationships match the real page at the same width. */
const CX = {
  heroEyebrow:
    "text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase",
  heroHeadline:
    "font-display text-display leading-[1.06] font-semibold tracking-[-0.028em] text-ink",
  heroHeadlineTail: "text-navy-400",
  heroSupporting:
    "font-display text-lede leading-[1.5] tracking-[-0.012em] text-ink-muted",
  authority: "text-[0.9375rem] leading-[1.6] text-ink-muted",
  sectionEyebrow:
    "text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase",
  scaleHeadline:
    "max-w-[900px] font-display text-h2 leading-[1.12] font-semibold tracking-[-0.025em] text-ink",
  h2: "font-display max-w-[16ch] text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink",
  sub: "font-display text-[1.375rem] leading-[1.35] font-semibold tracking-[-0.015em] text-ink",
  body:
    "max-w-[600px] font-display text-lede leading-[1.5] tracking-[-0.012em] text-ink-muted",
  fine: "max-w-[540px] text-micro leading-[1.6] text-ink-faint",
};

const QUALIFICATION =
  "* Representative workload from a high-intensity Summer Analyst 2027 recruiting cycle that resulted in a JPMorgan offer.";

function Slot({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black/5 pl-5">
      <p className="mb-2 font-mono text-[11px] tracking-wide text-neutral-400 uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

function VoiceColumn({ voice }: { voice: Voice }) {
  return (
    <article className="mx-auto w-full max-w-[760px] rounded-xl bg-surface-quiet px-7 py-9 shadow-sm">
      <header className="mb-9 border-b border-black/10 pb-5">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
          {voice.label}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">{voice.note}</p>
      </header>

      <div className="space-y-10">
        <Slot label="Hero">
          <p className={CX.heroEyebrow}>{voice.heroEyebrow}</p>
          <h1 className={`${CX.heroHeadline} mt-5`}>
            {voice.heroHeadline.lead}{" "}
            <span className={CX.heroHeadlineTail}>{voice.heroHeadline.tail}</span>
          </h1>
          <p className={`${CX.heroSupporting} mt-5 max-w-[560px]`}>
            {voice.heroSupporting}
          </p>
          <p className={`${CX.authority} mt-6`}>
            {voice.heroAuthority.lead}{" "}
            <span className="font-medium text-ink">{voice.heroAuthority.emph}</span>
            {voice.heroAuthority.tail ? ` ${voice.heroAuthority.tail}` : "."}
          </p>
        </Slot>

        <Slot label="Section 01 · the volume">
          <p className={CX.sectionEyebrow}>{voice.scaleEyebrow}</p>
          <h2 className={`${CX.scaleHeadline} mt-4`}>{voice.scaleHeadline}</h2>
          <p className={`${CX.body} mt-5`}>{voice.scaleBody}</p>
          <p className={`${CX.fine} mt-5`}>{QUALIFICATION}</p>
        </Slot>

        <Slot label="Section 02 · keep your tracker">
          <h2 className={CX.h2}>{voice.keepHeadline}</h2>
          <p className={`${CX.sub} mt-3`}>{voice.keepSub}</p>
          <p className={`${CX.body} mt-4`}>{voice.keepBody}</p>
          <ul className="mt-5 space-y-2">
            {voice.keepBullets.map((b) => (
              <li key={b} className="flex items-baseline gap-3 text-ink">
                <span
                  aria-hidden="true"
                  className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
                />
                <span className="text-[1.0625rem] leading-[1.5]">{b}</span>
              </li>
            ))}
          </ul>
        </Slot>

        <Slot label="Section 03 · outstanding actions">
          <h2 className={CX.h2}>{voice.actionsHeadline}</h2>
          <p className={`${CX.body} mt-4`}>{voice.actionsBody}</p>
        </Slot>

        {voice.extraFaq.length > 0 && (
          <Slot label="New FAQ entries">
            <dl className="space-y-4">
              {voice.extraFaq.map((f) => (
                <div key={f.q}>
                  <dt className="text-[1.0625rem] leading-[1.5] font-semibold text-ink">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-[1.0625rem] leading-[1.5] text-ink-muted">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Slot>
        )}
      </div>
    </article>
  );
}

export default async function VoiceReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const selected = isVoiceId(v) ? [VOICES[v]] : VOICE_ORDER.map((id) => VOICES[id]);

  return (
    <main className="min-h-screen bg-neutral-200 px-4 pt-6 pb-28">
      <div className="mx-auto max-w-[760px]">
        <h1 className="font-display text-xl font-bold text-ink">
          Voice test, four sets
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          Real type scale, real widths, text only. Every visual asset is
          unchanged and deliberately not shown, because no voice changes one.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {selected.map((voice) => (
          <VoiceColumn key={voice.id} voice={voice} />
        ))}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center gap-1.5 border-t border-black/10 bg-white/95 px-3 py-3 backdrop-blur">
        <Link
          href="/review/voice"
          className="rounded-md bg-neutral-900 px-3 py-2 text-[13px] font-medium text-white"
        >
          All
        </Link>
        {VOICE_ORDER.map((id) => (
          <Link
            key={id}
            href={`/review/voice?v=${id}`}
            className="rounded-md bg-neutral-100 px-3 py-2 text-[13px] font-medium text-neutral-900"
          >
            {VOICES[id].label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
