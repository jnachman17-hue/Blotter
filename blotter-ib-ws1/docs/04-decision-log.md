# Decision log

Date last updated: July 30, 2026

This file records settled decisions and historical rulings. Only items marked **Confirmed** should be treated as binding project truth. Provisional, unclear, or validation-dependent items belong in `06-assumptions-and-open-questions.md` and should not be treated as settled.

Jon's explicit instructions override project files. If a project file conflicts with Jon's current instruction, flag the conflict and ask for the final verdict.

## Confirmed decisions

### Strategy

**The build sequence is reversed. Market signal first, build only what the data calls for.** The original sequence produced a deployed product with zero market contact and no evidence of demand.

Status: Confirmed

**The terminal artifact of this phase is an economics story, not a product.** Dollars in versus intent out. A nicer product with no economics is a failed phase. For the current phase, build only a presentable landing-page prototype for market testing. No real backend build.

Status: Confirmed

**Workstream 2 stops at sufficient proposition coherence for a credible landing-page test.** It is not a product-requirements exercise. Do not over-specify workflows, technical feasibility, implementation logic, or backend behavior. Define only enough mechanism, outcome, and offer continuity to support a coherent spreadsheet page and matched platform page, then move to market testing.

Status: Confirmed

**Move with speed: build, learn, iterate.** The current product concept does not need to be technically proven or fully specified before the market test. Features shown on the landing pages are hypotheses to test, not commitments to build.

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

### Workstream 2 proposition

**The July spreadsheet-native landing page targets students before tracker decay is fully felt.** This is not a strategic choice between early-stage and overwhelmed users so much as a consequence of the recruiting calendar. The current audience is entering active networking before peak-season overload.

Status: Confirmed

**The page should demonstrate the future failure concretely without claiming that the visitor has already failed.** The proposition sells prevention of predictable tracker decay now. A rescue proposition for students who have already lost control may be used later in peak recruiting season.

Status: Confirmed

**The primary user framing is a serious candidate entering active networking, at the point when they are adopting or beginning to use a tracker.** Do not over-segment this audience further because students in the process broadly operate on the same recruiting timeline.

Status: Confirmed

**The structural failure is the widening gap between live recruiting activity and a manually maintained spreadsheet.** Students conduct recruiting through email and calendar, while the tracker changes only when they update it manually. Every reply, bounce, scheduled call, completed call, follow-up window, and unanswered thread changes what must happen next. As activity rises, the spreadsheet falls behind and becomes operationally unreliable.

Status: Confirmed

**The page should frame the consequences as stale status and lost operational trust, not merely visual messiness.** The student can no longer confidently tell who needs a response, which conversations require follow-up, or what the correct next action is. They must reconstruct reality from Gmail, Calendar, and memory.

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

## Rejected proposition language

**“You keep your record. Blotter keeps the state alive.”** Rejected because a new recruiting student cannot clearly distinguish “record” from “state,” and the line does not explain the product mechanism in plain language. Do not reuse it as working copy.

Status: Rejected

The replacement proposition language is not yet written. “Your networking keeps moving. Your tracker does not.” is a promising headline direction, but is not yet final.

## Not actually decisions

These items should not be treated as settled decisions.

**Connect Gmail is the primary call to action, two steps, email captured on the screen behind the click.** This may still be a candidate, but Jon has not decided what this process will look like.

Status: Not actually a decision

**A booked call suppresses follow-up prompts for that contact.** This may matter later in product logic, but it is too granular for the current economics and validation stage.

Status: Not actually a decision

**Tally handles forms if forms are needed.** Tally may be useful later, but form handling is not yet decided.

Status: Not actually a decision

## Method

**Owner-supplied recruiting-cycle figures may be used as illustrative test copy.** The current phase is concept validation, not publication of an audited market study. These figures may support dramatization of the recruiting workload, but should not be falsely attributed to an external study or represented as independently verified market averages.

Status: Confirmed

**Do not let evidence research become a blocker to launching the market test.** Research is optional where it improves the test, not a prerequisite for using Jon's first-hand process estimates in prototype copy.

Status: Confirmed
