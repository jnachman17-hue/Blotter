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

/** The nine funnel stages, in ratified order. */
export const FUNNEL_STAGES = [
  "closed",
  "question_track",
  "question_window",
  "experience_1",
  "experience_2",
  "experience_3",
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
  email: string | null;
  paymentMethod: PaymentMethod | null;
  furthestStage: FunnelStage;

  open: (from: CtaLocation) => void;
  close: () => void;
  goTo: (stage: FunnelStage) => void;
  setTrack: (track: RecruitingTrack) => void;
  setWindow: (window: RecruitingWindow) => void;
  setEmail: (email: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  reset: () => void;
}

const initial = {
  stage: "closed" as FunnelStage,
  ctaLocation: null,
  track: null,
  window: null,
  email: null,
  paymentMethod: null,
  furthestStage: "closed" as FunnelStage,
};

export const useFunnel = create<FunnelState>((set) => ({
  ...initial,

  /**
   * All four CTAs enter this one funnel. The originating location is captured
   * once and persists for the whole run, so `funnel_started` and every later
   * event carry the same origin.
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
  setEmail: (email) => set({ email }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

  reset: () => set(initial),
}));
