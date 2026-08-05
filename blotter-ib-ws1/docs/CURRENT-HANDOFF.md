# Blotter IB - Current Handoff

Date: August 5, 2026  
Status: WS5 active. Implementation moved from Lovable into this repository. Foundation complete.

## 1. Build-tool change

Jon ruled on August 4, 2026 that the page is built in this repository rather than in Lovable.

The Lovable project `Blotter Foundation` and its P1, P2, and P3 commits are abandoned. That code
is not ported. The GitHub specifications were always the source of truth; only the executor
changed.

Consequences:

- The private-repository file-transfer protocol in `LOVABLE-PLAN-AND-BUILD.md` section 5 is moot.
  The repository is the working directory.
- `LOVABLE-PROJECT-KNOWLEDGE.md` is superseded by `CLAUDE.md` at the repository root.
- The plan-only intake gate is replaced by task-level checkpoints with the same discipline:
  name the phase, name the controlling specification, state the stop condition, review, approve.
- Binary assets can now be written directly, which unblocked the Section 2 asset.

The build specifications, WS2, WS3, WS4, the asset authority system, the nine-event contract,
and every acceptance criterion remain unchanged and binding.

## 2. Technical stack

Ratified by Jon, August 4, 2026:

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, TypeScript |
| Styling | Tailwind v4 with CSS custom properties |
| UI primitives | Base UI (accordions in Sections 6 and 7) |
| Funnel state | zustand |
| Variants | clsx and cva |
| Hosting | Vercel, private with deployment protection |
| Lead storage | Supabase |
| Analytics | PostHog behind the provider-independent adapter |

Application root: `web/`

## 3. Completed

- Specification reconciliation. Outstanding Actions transcription corrected against the
  ratified PNG in all three places that carried it; `Daniel Park` corrected to `Daniel Kim`;
  em dash removed from the Section 5 asset and spec; `WS4-SPEC.md` stamped with a supersession
  table; superseded decision log archived; stale README workstream pointer fixed; AVIF wording
  corrected in the Section 3 specification.
- Next.js application scaffolded in `web/` with the ratified stack.
- Foundation: design tokens sampled from the ratified assets, the nine canonical events with
  per-visitor suppression keyed `blotter:r1:spreadsheet:<event>`, typed funnel state across all
  stages, the single CTA component carrying all four origins, and the sticky header.

Email is structurally absent from the analytics property type and cannot leak into events.

## 4. Section 2 asset resolved

Jon supplied an intact self-contained bundle on August 4, 2026:

`ws5-assets/section-2/goldman-sachs-rejection-email-exact-v2.html`

- SHA-256: `c8b08e76730e4d8ccbb4f4a5ba163839ed1fe6f5b71bc4f055cae14a8feb3a6f`
- verified against every content point in the build specification
- no external resource references
- no em or en dashes in visible copy

The corrupt `goldman-sachs-rejection-email-exact-v1.webp` was removed. It was intrinsically
truncated at `13,676` stored bytes against a RIFF-declared `29,672` and could not be decoded.
Git history retains it. All specification references now point at the v2 source.

Section 2 is no longer blocked.

## 5. Remaining sequence

1. Reusable `SheetWindow` Google Sheets primitive, reviewed before the sections that consume it.
2. Sections 1 and 2.
3. Sections 3, 4, and 5.
4. Sections 6 and 7, plus a real privacy policy page.
5. Canonical funnel, all eight screens.
6. PostHog and Supabase, once Jon supplies keys.
7. Responsive and accessibility pass, then private Vercel deployment.

## 6. Open items for Jon

- PostHog project API key. Needed before analytics is connected, not before.
- Supabase project and credentials. Needed before lead storage, not before.

## 7. Deployment rule

Unchanged from `WS5-SPEC.md`.

Keep the deployment private with protection enabled. Do not route `blotterib.com`. Do not
implement real OAuth, real Gmail, Calendar, or Sheets integrations, or payment collection.
Do not route public traffic. Public launch waits for the matched platform page, verified
analytics and lead storage, passed privacy and claim gates, and final launch authorization.
