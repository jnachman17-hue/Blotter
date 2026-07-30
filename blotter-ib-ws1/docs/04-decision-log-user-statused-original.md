# Decision log

Rulings and the reasons behind them. Read before proposing anything so settled ground is not relitigated. Where a ruling replaced an earlier one, both are shown.

## Strategy

**The build sequence is reversed. Market signal first, build only what the data calls for.** The original sequence produced a deployed product with zero market contact and no evidence of demand.

- Status: Confirmed 

**The terminal artefact of this phase is an economics story, not a product.** Dollars in versus intent out. A nicer product with no economics is a failed phase.

- Status: Confirmed  
- This is true for the current build phase. Build an prototype landing page with a presentable product to test the market. No real build.

**Read rules get written before data exists.** Otherwise the numbers get interpreted to taste after the fact. Still unwritten. Hard gate on traffic.

- Status: Confirmed 

**Analytics is verified by hand before any money moves.** Broken instrumentation is worse than no test, because it produces confident wrong conclusions.

- Status: Confirmed 

**Research precedes all spend, with one carve-out.** Social account seeding is exempt, because accounts need age and comment history before they can post promotional content at all, and that lead time cannot be recovered later. Seeding gates the organic broadcast arm only, not the launch.

- Status: Confirmed 

**Non-paid channels are central, not supplementary.** This changes the economics materially and may make later purchase-intent measurement viable at volumes paid traffic alone would not reach.

- Status: Provisional. More research / understanding needed. 

**Corey reviews the test design before any spend.** High leverage, near zero cost. Timing unscheduled.

- Status: Provisional 

## Test design

**Round one tests macro surface only: spreadsheet versus platform.** Not features, not price, not headline.

- Status: Confirmed. Will still include some features and maybe price but not what we are A/B testing on in this round. 

**Both pages fire the identical event set. Content varies, measurement never does.** A page tracking different events than its comparator cannot be compared to it. This is the hardest constraint in the project and is not negotiable.

- Status: Confirmed 

**Status vocabulary is not required to be identical across pages.** *(Relaxed in session 4\. Replaced a stricter earlier rule.)* Jon ruled parity unnecessary. Working position is to default to identical anyway, since the platform page needs status words regardless and a second set saves nothing, and to flag it if a real reason to diverge appears. This relaxation does **not** extend to the event set.

- Status: Confirmed 

**Build sequentially, spreadsheet page first, launch both at roughly the same time.** *(Session 4.)* Sequential building is nearly free because page two is the same skeleton with three content slots swapped, and it de-risks page two. Simultaneous launch is required because a comparison run across different weeks of the recruiting cycle would confound surface preference with timing, and tracker adoption rises sharply through September.

- Status: Confirmed 

**Connect Gmail is the primary call to action, two steps, email captured on the screen behind the click.** Captures a contactable lead even when the visitor stops at step two, and produces a graded intent signal rather than a binary one.

- Status: Not actually a decision. We haven’t decided what this possess will look like. 

**No card step and no price in round one.** Purchase intent is a later round. Price now confounds the surface question.

- Status: Provisional 

**Banks and applications off on both pages.** Reduces the variables under test to one.

- Status: Provisional   
- We haven’t put any thought into what will be displayed on platform page. For spreadsheet page this is true. 

**Feature cards carry pictures, not bullets.** Bullets read as a feature list. Pictures argue.

- Status: Not yet decided.   
- Haven’t put much thought into the design. 

**Card count is set by what each page needs to argue, not fixed.** Unresolved against the identical-events rule. Must be ruled before card words are drafted. See [`02-strategy-and-test.md`](http://02-strategy-and-test.md).

- Status: Unclear 

## Product

**Blotter is a logistics layer only.** Not learning content, not interview prep, not AI-assisted outreach, not a jobs board. The category is crowded with adjacent products and drifting into them is a recurring temptation.

- Status: Confirmed 


  
**Auto-capture is the founding principle.** Gmail and Calendar activity drive state. The user enters a contact once and everything downstream computes.

- Status: Confirmed 


**Blotter never reads personal email.** It checks who mail is from and only reads recruiting mail from banks and from people the user tracks. Copy implying broader access is wrong and damaging.

- Status: Confirmed 


  
**Gmail access goes through an intermediary, Nylas or Unipile.** *(Replaced the three-stage direct OAuth rollout.)* Direct restricted-scope access requires a CASA security assessment a solo founder cannot clear on this timeline. CASA deferred to year two. Targeted October or November 2026, only if validation justifies building.

- Status: Confirmed 

**The spreadsheet version gets grouped action areas.** A five-hundred-row sheet cannot be scanned. Replies owed in one place, bumps due in another, or equivalent strong sorting. Strategic consequence: the sheet version is not a degraded stub, which removes "it gives you a to-do list" from the platform's list of exclusive advantages.

- Status Provisional   
- Haven’t put too much thought into the layout of the spreadsheet version yet. 

**A booked call suppresses follow-up prompts for that contact.** Later used to justify call states overriding thread states in the status vocabulary.

- Status: Not actually a decision   
- Way too technical and granular for where we are. We are at the test economics and validate stage. We don’t need granular technicalities solved. 

## Page specification

\*\*For every item in page specification, this doesn’t need to be confirmed. We are haven’t begun to build the website on loveable yet so these are all things we can talk through and discuss further. I think this gives a strong baseline, but this is all subject to change. We’ll call this section a working baseline.   
**Status is the single operational headline that best explains the Next move.** Not a description of every fact true about the contact. This resolved the objection that calendar facts and thread facts were incompatible axes sharing a column: they are not, because the product already lets a booked call suppress thread prompts, so call states overriding thread states has precedent in the product's own behaviour.

- Status: Confirmed, I think

**Eight statuses, six shown in the hero.** Terminal statuses are legitimate but visually inactive and do not demonstrate value.

**Status is event-shaped, not obligation-shaped.** *(Replaced an earlier position that status should read "Your move" or "Their move.")* The row already says whose move it is three ways: Next move gives the instruction in verbs, colour encodes the situation, and the date grounds it. Making status say it a fourth time at lower resolution wastes the column. Event-shaped status adds the one thing the other columns cannot: what actually happened.

- Status: Confirmed, I think 

**Replied is green even when a reply is owed.** Green means the banker moved the relationship forward. It does not mean the student is finished; Next move carries that. An earlier objection held that green does not age and so a six-day-old owed reply would look identical to a fresh one, and proposed a red Reply overdue status. Jon overruled it as unnecessary for the demo.  
\- 

**"Sent" is the name for the calm waiting state.** *(Replaced "No reply.")* "No reply" reads as failure and collided with Gone quiet, which is also gray and is the actual failure. Two gray statuses both saying the banker has not written back, distinguished only by phrasing, was a real defect.

**Colour encodes the kind of operational situation, not a good-to-bad scale.** Five colours: gray neutral or finished, green banker advanced it, red action now due, blue calendar event, amber event happened but follow-through remains.

**Red is narrow. It means an action is due, never rejection or failure.** Keeping that definition tight is what makes the interface calm rather than alarm-heavy.

**Days turns red only when elapsed time has produced an overdue action, never merely because the number is large.** Twelve days since last contact with a call booked tomorrow stays neutral. Colouring by magnitude creates a visible logic error where the table appears worried about a relationship that is progressing normally.

**Next move is the first automated column.** *(Replaced a layout that led with Last contact.)* Next move is the product. Everything else is supporting evidence. The visitor's eye should cross the divider and land on the instruction.

**Empty cells are dashed.** Cleaner, and rows that do have calls stand out naturally.

**No status legend under the table.** A legend makes the mockup look like it requires explanation.

**The two zone labels sit outside the spreadsheet window chrome.** A real sheet would never contain the words "you fill this once." Inside the frame they read as something Blotter writes into the user's file. They are marketing annotation.

## Hero

\*\*For every item in hero, this doesn’t need to be confirmed. We are haven’t begun to build the website on loveable yet so these are all things we can talk through and discuss further. I think this gives a strong baseline, but this is all subject to change. We’ll call this section a working baseline.   
**Layered, not sequential, and not side by side.** Sequence turns the hero into a tutorial and guarantees the first frame is not the product. Side by side still grants the before its own zone of attention. Layering removes it from the reading order.

**The before bleeds off the frame edge as well as sitting behind.** Two overlapping tables of rows read as noise if the overlap is large. Bleeding past the edge cuts the overlap and makes the before unambiguously outside rather than underneath.

**No Gmail element inside the hero image.** It is a third floating object in a frame already holding two spreadsheets, and the only one that is not a spreadsheet, so it pulls the eye hardest. It also shows a connected state to someone who has not connected, directly above a button asking them to connect. The mechanism lives in the button and subhead instead.

**The before is the sheet the student was given, not one they ruined.** The tracker circulates socially before the problem is felt. Blaming the visitor for the mess breaks the angle.

**The tab strip carries the preservation argument.** Two tabs, Networking and Blotter, Blotter active. Says "nothing was taken from you" in two words instead of a paragraph. Old tab is never labelled Before or Messy Tracker, which reads as staged.

**Static first. Motion is optional and later.** If added: clean state visible from the first frame, two or three cells update, about three seconds. No wipes, no typing simulation, no dragging, no hiding the result.

**The marketing angle argues against a problem the visitor knows about but may not have suffered.** Deliberate, and Jon's call. Trackers circulate before they rot, so a mid-summer visitor recognises the artefact without having personally experienced the decay.

## Platform page

**The argument is capability.** *(Two alternatives rejected.)* "Opens to a to-do list rather than a file" was rejected because the sheet's grouped action areas already deliver that. "Works on your phone" was demoted to a supporting line. Capability is what remains.

- A counter response to this is like we don’t necessarily have to make the argument on capability. If they are roughyl comparable in utility, we might learn the market simply prefers the platform because prettier UI and they would rather work there. 

**The capability inventory is unwritten.** An earlier answer of "calendar view and attachments" is probably too narrow and needs honest re-listing. If that genuinely is the whole list, the platform page has a weak argument, and that is a finding worth having before copy is written on top of it.  
\-  Status Confirmed

## Tooling

**Lovable is the build tool.** *(Replaced Framer, then plain HTML with GSAP on Vercel.)* Jon tested it directly and it performed well.

- Status confirmed. Can connect to GPT via connector. 

**Tally handles forms if forms are needed.** Chosen over Formspree on free-tier submission limits.

- Status: Not actually a decision. 

**Design tokens and the prior design system are scrapped, not deprecated.** Do not treat old token files as authoritative.

- Status Confirm: 

**The platform product's built pixels are scrapped.** Milestones one through five were deployed to a Vercel preview. The interface was assessed as unusable.

- Status Confirmed. 

## Method

**Jon's recruiting tracker is evidence of a failure mode, not a source of statistics.** Its value is the decay curve: state columns maintained early, abandoned as the season loaded up. Do not extract percentages from it and present them as market data.

**Volume language uses qualitative shape and range.** Never computed averages or loss fractions.

