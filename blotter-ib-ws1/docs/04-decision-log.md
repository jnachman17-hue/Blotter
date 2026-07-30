# Decision log

Date last updated: July 29, 2026

This file records settled decisions and historical rulings. Only items marked **Confirmed** should be treated as binding project truth. Provisional, unclear, or validation-dependent items belong in `06-assumptions-and-open-questions.md` and should not be treated as settled.

Jon's explicit instructions override project files. If a project file conflicts with Jon's current instruction, flag the conflict and ask for the final verdict.

## Confirmed decisions

### Strategy

**The build sequence is reversed. Market signal first, build only what the data calls for.** The original sequence produced a deployed product with zero market contact and no evidence of demand.

Status: Confirmed

**The terminal artifact of this phase is an economics story, not a product.** Dollars in versus intent out. A nicer product with no economics is a failed phase. For the current phase, build only a presentable landing-page prototype for market testing. No real backend build.

Status: Confirmed

**Read rules get written before data exists.** Otherwise the numbers get interpreted to taste after the fact. The rules themselves are still unwritten and are a hard gate on traffic.

Status: Confirmed

**Analytics is verified by hand before any money moves.** Broken instrumentation is worse than no test, because it produces confident wrong conclusions.

Status: Confirmed

**Research precedes all spend, with one carve-out.** Social account seeding is exempt because accounts need age and comment history before they can post promotional content at all. Seeding gates the organic broadcast arm only, not the launch.

Status: Confirmed

### Test design

**Round one tests macro surface only: spreadsheet versus platform.** It is not primarily a feature, price, or headline test. Features and possibly price may still appear if explicitly approved, but they are not the variable being A/B tested in round one.

Status: Confirmed

**Both pages fire the identical event set. Content varies, measurement never does.** A page tracking different events than its comparator cannot be compared to it.

Status: Confirmed

**Status vocabulary is not required to be identical across pages.** The working position is to default to identical unless a real reason to diverge appears. This relaxation does not extend to the event set.

Status: Confirmed

**Build sequentially, spreadsheet page first, launch both at roughly the same time.** Sequential building de-risks page two. Simultaneous launch is required because a comparison run across different weeks of the recruiting cycle would confound surface preference with timing.

Status: Confirmed

### Product

**Blotter is a logistics layer only.** Not learning content, not interview prep, not AI-assisted outreach, not a jobs board.

Status: Confirmed

**Auto-capture is the founding principle.** Gmail and Calendar activity drive state. The user enters a contact once and everything downstream computes.

Status: Confirmed

**Blotter never reads personal email.** It checks who mail is from and only reads recruiting mail from banks and from people the user tracks. Copy implying broader access is wrong and damaging.

Status: Confirmed

**Gmail access goes through an intermediary, Nylas or Unipile, if validation justifies backend build.** Direct restricted-scope access requires a CASA security assessment a solo founder cannot clear on this timeline. CASA is deferred.

Status: Confirmed

### Tooling

**Lovable is the build tool.** Lovable replaced Framer and plain HTML with GSAP on Vercel.

Status: Confirmed

**Design tokens and the prior design system are scrapped, not deprecated.** Do not treat old token files as authoritative.

Status: Confirmed

**The platform product's built pixels are scrapped.** Milestones one through five were deployed to a Vercel preview. The interface was assessed as unusable.

Status: Confirmed

## Working baseline, not settled decisions

The page-specification and hero items from prior sessions are a working baseline only. They are useful starting points, but they are not final merely because they were written in a specification file.

This includes, without limitation:

- Status vocabulary details
- Hero composition details
- Table visual details
- Motion decisions
- Feature card structure
- Copy structure
- Any low-level layout rule not separately confirmed by Jon

## Provisional decisions and open items moved to `06-assumptions-and-open-questions.md`

- Non-paid channels are central, not supplementary.
- Corey reviews the test design before spend.
- No card step and no price in round one.
- Banks and applications off on both pages.
- Feature cards carry pictures rather than bullets.
- Card count set by what each page needs to argue.
- Spreadsheet grouped action areas.
- Platform page argument.
- Platform capability inventory.
- Testing domain identity.
- Analytics event list.
- CTA and lead-capture flow.
- Project-level kill condition.

## Not actually decisions

These items should not be treated as settled decisions.

**Connect Gmail is the primary call to action, two steps, email captured on the screen behind the click.** This may still be a candidate, but Jon has not decided what this process will look like.

Status: Not actually a decision

**A booked call suppresses follow-up prompts for that contact.** This may matter later in product logic, but it is too granular for the current economics and validation stage.

Status: Not actually a decision

**Tally handles forms if forms are needed.** Tally may be useful later, but form handling is not yet decided.

Status: Not actually a decision

## Items needing one remaining Jon verdict

The Method section in the updated decision log did not receive explicit statuses. Current recommended treatment is to confirm both as guardrails, but they should not be marked confirmed until Jon says so:

- Jon's recruiting tracker is evidence of a failure mode, not a source of statistics.
- Volume language uses qualitative shape and range, never computed averages or loss fractions.
