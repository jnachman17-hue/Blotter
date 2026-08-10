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
    /* The server and first client paint both assume desktop, which is the
       ratified geometry. A phone corrects it in the same frame, before paint,
       because this runs in a layout effect. */
    scale: PAGE_BOX_W / naturalWidth,
    height: 0,
    measured: false,
  });

  useLayoutEffect(() => {
    const box = outer.current;
    if (!box) return;

    function measure() {
      const avail = box!.getBoundingClientRect().width;
      if (!avail) return;
      /*
        Two ceilings, and the `1` matters. Section 2's diagram is 1120px
        natural inside a 1124px box, so without it the diagram was scaled *up*
        by 0.36% — resampling a ratified composition to gain four pixels.
        Nothing here is ever enlarged past the geometry that was approved.

        `PAGE_BOX_W` is the second ceiling and guards a `Fit` used outside the
        page box; inside it the measurement is already capped.
      */
      const scale = Math.min(1, Math.min(avail, PAGE_BOX_W) / naturalWidth);
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
    <div ref={outer} className="w-full" style={{ height: height || undefined }}>
      <div
        ref={inner}
        style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
