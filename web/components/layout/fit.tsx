"use client";

/**
 * Scale a composition built at a fixed natural width into whatever width it is
 * actually given.
 *
 * ## Why this exists
 *
 * Four places on this page draw a composition at true geometry and then scale
 * the whole object down to the page box: the hero's 1322px module, Section 3's
 * 1170px day, and Sections 4 and 5's 1221px sheet, three times. Each computed
 * its own `PAGE_BOX_W / naturalWidth` and each hard-coded `width: PAGE_BOX_W`
 * on the wrapper, which is why the page was 1148px wide inside a 375px phone.
 *
 * This measures the space it is given instead of assuming 1124px. On any
 * desktop the measurement *is* 1124px, so every ratified scale is unchanged to
 * the pixel — the hero still lands at 0.85, Section 3 at 0.96.
 *
 * ## This is scaffolding, not the mobile answer
 *
 * Below the desktop breakpoint this shrinks rather than translates, and at
 * phone width that means roughly 0.29 — spreadsheet type under 4px. It exists
 * so the page fits, scrolls straight and can be navigated on a phone while each
 * section is given its real mobile treatment one at a time. **Every section
 * that reaches this state on a phone still needs replacing.** When the last one
 * is done, the only callers left should be desktop-only paths.
 *
 * ## FIRST PAINT, and why the outer box clips
 *
 * The scale is measured on the client, so the server has no viewport and
 * renders the desktop scale. On a phone that means the *first paint* lays out
 * a 1124px-wide page and only corrects once React hydrates and the layout
 * effect runs. On a desktop that is one frame and invisible. On a phone it is
 * long enough to see, and iOS Safari can hold the horizontal scroll range it
 * established on that first layout even after the content settles — which is
 * exactly what Jon saw on August 10, 2026: the hero, both Section 2 assets and
 * all three sheets hanging off the right edge on a real device, on a page that
 * measured clean in a headless iframe because the test waited for hydration.
 *
 * `overflow: hidden` on the outer box makes the overflow *structurally*
 * impossible rather than dependent on JavaScript timing. Worst case is a
 * composition briefly cropped at the fold; it can never push the document
 * sideways. It costs nothing once measured, because a scaled child's visual
 * bounds are exactly the width of the box by construction.
 *
 * Any future replacement of this shrink-to-fit scaffolding must keep that
 * property: a section's mobile treatment has to be correct in the HTML, not
 * one frame after it.
 *
 * ## The coordinate trap
 *
 * `getBoundingClientRect` inside a scaled subtree returns *post-transform*
 * screen pixels. Anything measured that way and then applied back inside the
 * same subtree — an absolutely positioned rail, a connector — is in
 * pre-transform natural pixels and will be wrong by exactly `scale`. At 0.96
 * that is a 4% error nobody sees. At 0.29 it is a visible break. `toNatural`
 * below is the divide, and Section 3's rail uses it.
 */

import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { PAGE_BOX_W } from "./page-box";

/**
 * The one scale formula, so the server-rendered value and the measured value
 * can never disagree.
 *
 * Two ceilings, and the `1` matters. Section 2's diagram is 1120px natural
 * inside a 1124px box, so without it a ratified composition is scaled *up* by
 * 0.36% — resampling to gain four pixels. Nothing here is ever enlarged past
 * the geometry that was approved. `PAGE_BOX_W` is the second ceiling and
 * guards a `Fit` used outside the page box.
 */
function fitScale(available: number, naturalWidth: number) {
  return Math.min(1, Math.min(available, PAGE_BOX_W) / naturalWidth);
}

interface FitState {
  /** Uniform scale applied to the natural-width child. */
  scale: number;
  /** Scaled footprint, so surrounding layout stays honest. */
  height: number;
  /** True once a real measurement has landed. */
  measured: boolean;
}

/**
 * Measures the available width and returns the scale that fits `naturalWidth`
 * into it, never exceeding the ratified page-box scale.
 *
 * `deps` re-measures when the child's own height can change independently of
 * width — Section 4 and 5's sheets swap row counts between tabs.
 */
export function useFit(naturalWidth: number, deps: React.DependencyList = []) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<FitState>({
    /* The server has no viewport, so it renders the desktop geometry — which
       is correct on a desktop and too wide on a phone until the layout effect
       below corrects it. The outer box clips, so that interval is a crop
       rather than a sideways page. See FIRST PAINT above. */
    scale: fitScale(PAGE_BOX_W, naturalWidth),
    height: 0,
    measured: false,
  });

  useLayoutEffect(() => {
    const box = outer.current;
    if (!box) return;

    function measure() {
      const avail = box!.getBoundingClientRect().width;
      if (!avail) return;
      const scale = fitScale(avail, naturalWidth);
      const height = (inner.current?.offsetHeight ?? 0) * scale;
      setState((prev) =>
        prev.measured &&
        Math.abs(prev.scale - scale) < 0.0005 &&
        Math.abs(prev.height - height) < 0.5
          ? prev
          : { scale, height, measured: true },
      );
    }

    measure();
    /* Observes the outer box, whose width is set by the page box and whose
       height we set ourselves. A height-only change re-runs `measure`, which
       returns the same values and bails on the comparison above. */
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naturalWidth, ...deps]);

  /*
    Screen pixels measured inside the scaled subtree, back to natural.

    Memoised on `scale` alone. A caller puts this in a layout-effect dependency
    array — that is the whole point of it — and a fresh identity every render
    would re-run the effect, set state, and re-run it again forever.
  */
  const toNatural = useCallback(
    (px: number) => px / state.scale,
    [state.scale],
  );

  return { outer, inner, scale: state.scale, height: state.height, toNatural };
}

/**
 * The common case: no measurement needed inside the child.
 *
 * The child renders at `width` and is scaled as one object, so every internal
 * measurement stays exactly as ratified.
 */
export function Fit({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  const { outer, inner, scale, height } = useFit(width, [children]);
  return (
    <div
      ref={outer}
      /* `overflow-hidden` is load-bearing — see FIRST PAINT above. */
      className="w-full overflow-hidden"
      style={{ height: height || undefined }}
    >
      <div
        ref={inner}
        style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
