/**
 * Canonical funnel state.
 *
 * Authority: WS3-SPEC.md (sequence, questions, price), WS4-SPEC.md (exact copy
 * and frame behavior), PLAN-AMENDMENTS-2026-08-01.md (single checkout screen,
 * explicit Continue on both questions).
 *
 * Back navigation is allowed and must not refire completion events. Event
 * deduplication lives in lib/analytics.ts, so moving backward through stages
 * here is always safe.
 */

import { create } from "zustand";
import type {
  CtaLocation,
  PaymentMethod,
  RecruitingTrack,
  RecruitingWindow,
} from "./analytics";

/**
 * The funnel stages, in order.
 *
 * Amended by Jon on August 6, 2026: the three-frame click-through product
 * experience — `experience_1`, `experience_2`, `experience_3` — is replaced by
 * a single `film` stage carrying the launch film.
 *
 * What that costs, measured against `WS3-SPEC.md` rather than guessed:
 *
 *   - the primary comparative metric is `checkout_started / page_viewed` and is
 *     untouched;
 *   - three diagnostic ratios built on `product_experience_completed` are lost.
 *     WS3 states diagnostics do not determine surface selection, so this is an
 *     acceptable loss;
 *   - `product_experience_completed` keeps its place in the frozen nine-event
 *     contract and now fires when the film stage is left. It is not renumbered
 *     and not repurposed.
 *
 * WS3 also requires the spreadsheet and platform funnels stay comparable in
 * duration and interaction burden. **If the platform variant is ever built it
 * must use this same sequence**, or the comparison is void.
 */
export const FUNNEL_STAGES = [
  "closed",
  "question_track",
  "question_window",
  "film",
  "email",
  "price",
  "checkout",
  "confirmed",
] as const;

export type FunnelStage = (typeof FUNNEL_STAGES)[number];

/** Ordinal position, used to record the furthest stage reached for lead storage. */
export function stageIndex(stage: FunnelStage): number {
  return FUNNEL_STAGES.indexOf(stage);
}

interface FunnelState {
  stage: FunnelStage;
  ctaLocation: CtaLocation | null;
  track: RecruitingTrack | null;
  window: RecruitingWindow | null;
  /** Free text captured when `Other` is chosen. Required before continuing. */
  trackOther: string;
  windowOther: string;
  email: string | null;
  paymentMethod: PaymentMethod | null;
  furthestStage: FunnelStage;

  open: (from: CtaLocation) => void;
  close: () => void;
  goTo: (stage: FunnelStage) => void;
  setTrack: (track: RecruitingTrack) => void;
  setWindow: (window: RecruitingWindow) => void;
  setTrackOther: (value: string) => void;
  setWindowOther: (value: string) => void;
  setEmail: (email: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  reset: () => void;
}

const initial = {
  stage: "closed" as FunnelStage,
  ctaLocation: null,
  track: null,
  window: null,
  trackOther: "",
  windowOther: "",
  email: null,
  paymentMethod: null,
  furthestStage: "closed" as FunnelStage,
};

export const useFunnel = create<FunnelState>((set) => ({
  ...initial,

  /**
   * All five CTAs enter this one funnel — the fifth being the mobile sticky
   * bar, added August 10, 2026. The originating location is captured once and
   * persists for the whole run, so `funnel_started` and every later event
   * carry the same origin.
   */
  open: (from) =>
    set((s) => ({
      ctaLocation: s.ctaLocation ?? from,
      stage: "question_track",
      furthestStage:
        stageIndex("question_track") > stageIndex(s.furthestStage)
          ? "question_track"
          : s.furthestStage,
    })),

  close: () => set({ stage: "closed" }),

  goTo: (stage) =>
    set((s) => ({
      stage,
      furthestStage:
        stageIndex(stage) > stageIndex(s.furthestStage) ? stage : s.furthestStage,
    })),

  setTrack: (track) => set({ track }),
  setWindow: (window) => set({ window }),
  setTrackOther: (trackOther) => set({ trackOther }),
  setWindowOther: (windowOther) => set({ windowOther }),
  setEmail: (email) => set({ email }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  reset: () => set(initial),
}));
