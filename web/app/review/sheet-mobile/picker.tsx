"use client";

/**
 * The prototype picker, per `.claude/skills/prototype/PICKER.md`.
 *
 * The appearance is that spec rather than a design decision, so the CSS is
 * copied verbatim into a style tag rather than expressed in project tokens —
 * it has to read as harness chrome and never as part of the thing being judged.
 * The behaviour contract is expressed idiomatically here, which the spec allows:
 * state instead of `innerHTML`, a layout effect for the highlight measurement.
 *
 * No replay button. The spec makes it conditional on a variant having motion to
 * re-trigger, and all three of these are static.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const CSS = `
.proto-picker {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08) inset,
    0 8px 24px rgba(0, 0, 0, 0.24),
    0 2px 6px rgba(0, 0, 0, 0.12);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
}
.proto-picker-highlight {
  position: absolute;
  top: 4px;
  left: 0;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  will-change: transform;
}
.proto-picker[data-ready] .proto-picker-highlight {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    width 250ms cubic-bezier(0.23, 1, 0.32, 1);
}
@media (prefers-reduced-motion: reduce) {
  .proto-picker[data-ready] .proto-picker-highlight { transition: none; }
}
.proto-picker-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font: inherit;
  cursor: pointer;
  transition: color 150ms ease-out;
}
.proto-picker-item:hover { color: rgba(255, 255, 255, 0.85); }
.proto-picker-item:active { transform: scale(0.97); }
.proto-picker-item:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}
.proto-picker-item[data-active] { color: #fff; }
`;

export function Picker({
  labels,
  current,
  onChange,
}: {
  labels: string[];
  current: number;
  onChange: (i: number) => void;
}) {
  const nav = useRef<HTMLElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const [box, setBox] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const el = items.current[current];
    if (el) setBox({ left: el.offsetLeft, width: el.offsetWidth });
  }, [current]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    /* Enabled only after first paint, so load does not animate. */
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true)),
    );
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(id);
    };
  }, [measure]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= labels.length) onChange(num - 1);
      else if (e.key === "ArrowRight") onChange((current + 1) % labels.length);
      else if (e.key === "ArrowLeft")
        onChange((current - 1 + labels.length) % labels.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, labels.length, onChange]);

  return (
    <>
      <style>{CSS}</style>
      <nav
        ref={nav}
        className="proto-picker"
        aria-label="Prototype variants"
        {...(ready ? { "data-ready": "" } : {})}
      >
        <span
          className="proto-picker-highlight"
          aria-hidden="true"
          style={{ width: box.width, transform: `translateX(${box.left}px)` }}
        />
        {labels.map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="proto-picker-item"
            onClick={() => onChange(i)}
            {...(i === current
              ? { "data-active": "", "aria-current": "true" as const }
              : {})}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
