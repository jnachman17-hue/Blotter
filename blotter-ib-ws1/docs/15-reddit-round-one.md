# Reddit round one: what was posted, what happened, what changed

Date: **August 13, 2026**
Status: Round one is over. Every post is deleted or being deleted. Nothing is
planned yet.

Written as a cold handover. It assumes no knowledge of this project.

---

## 0. The one-paragraph version

Blotter ran the same idea past the same Reddit audience twice, six weeks apart,
from the same account. **The first time it worked and the second time it
failed**, and the only thing that changed was how it was framed. The first post
asked people whether a thing was worth building and three strangers asked to be
let in. The second post told them a story about the author's own failure and
attached a finished product, and nine strangers told him he was bad at his job.
The failure produced two visitors. It also produced the clearest evidence this
project has about how to reach its audience, and a decision to rewrite the
website's entire voice, which shipped the same day.

---

## 1. The account

Everything below was posted by **one anonymous personal Reddit account** that
belongs to Jon, the product's owner. It is not a company account. This matters
more than it looks: the four subreddits involved mostly forbid self-promotion,
and a personal account narrating personal experience is a different object under
those rules than a brand account posting a link.

X and LinkedIn use the real Blotter accounts. Reddit does not.

---

## 2. The first post, roughly early July 2026

### What it was

A first-person post, cross-posted to a range of finance and consulting
subreddits including r/MBA, r/consultingcareers and r/financestudents.

**Title:** `Networking absolutely killed me during IB recruitment. Would this
tool be helpful?`

**Image:** a screenshot of an HTML mockup — a three-step explainer card and a
`Your recruiting HQ` dashboard with counters. **The mockup showed a product that
no longer exists**: it was the standalone-platform concept, which was formally
scrapped on August 12, 2026. Nothing on it was built.

**Body, in order:** he recruited for investment banking and landed an offer at
an elite boutique; the stats — *742 emails sent, 112 coffee chats, 35 bank
applications, 32 interview rounds*, over roughly five months; then the argument
that the *logistics* were a bigger job than the recruiting; then a description of
what he had mocked up; then the ask.

**The ask, verbatim in substance:** *"Trying to figure out if this is worth
finishing building out, or if I just organized poorly during my recruitment. If
you've recruited (or are recruiting now), a few quick questions would help a ton.
Anonymous, ~2 min: Not selling anything."* followed by a link.

**The link went to a survey**, not to a product. There was no product.

### How it was received

- **r/MBA instance: +13, 4 comments.**
- **Roughly 20,000 organic views** across all the subreddits it was posted to.
- **Every comment was a demand signal.** Paraphrased: *would be helpful, would
  love to test a beta before recruiting starts in September*; *shoot me a DM,
  interested in this*; *I'm down for this, please send me a DM*. Jon's reply
  offering a demo drew +2 and that sub-thread alone showed 322 views.
- **Three separate strangers asked to be let in.** Nobody argued with him.

---

## 3. The second post, August 12 to 13, 2026

### What changed in the meantime

The product got built. `blotterib.com` is a live page with a working funnel: two
questions, a film, email capture, a `$9.99 / month` price screen, and a waitlist
branch. Nothing can be purchased — it opens Fall 2026 — but it is unmistakably a
finished thing rather than a mockup.

### What was posted

**Four subreddits**, same account, same day: **r/MBA, r/financestudents,
r/FinancialAnalyst, r/WallstreetOasis**. A fifth, **r/FinancialCareers**, was
blocked by a karma requirement and never received the post. It is by far the
largest of them.

**Titles** varied by subreddit, deliberately, with the body held constant so the
difference between subreddits would be readable:

- r/MBA: `A VP sat on a call for ten minutes waiting for me. I found out months later.`
- the others: `I got dropped from a process for ignoring an email I never saw.`

**Image:** a phone screenshot of a Gmail message, names redacted. Subject line
`Did you miss Mark's call?`. In it, an associate tells the author that a VP
agreed a time, sent a calendar invite, held the slot, sat on the call for ten
minutes, and then had HR remove his application from the process — and that the
associate had been vouching for him.

**Body:** he recruited, got an offer, and weeks later found this in his inbox.
The associate was a mutual connection who had pushed his application internally
and made the VP introduction. The VP replied with a time and sent an invite. He
never answered and never joined. His tracker still had the VP marked as *waiting
on reply*. Then the volume — *628 recruiting emails, 68 coffee chats, 19
applications, 30 interview rounds* — then the observation that the state of the
process only ever existed in his head, then a description of Blotter, then a
link.

**Every link was tagged** with a per-subreddit short path so the four posts could
be told apart afterwards.

### How it was received

| Subreddit | Score | Comments | Outcome |
|---|---|---|---|
| r/MBA | **0** | **9** | downvoted below its starting point; deleted the same day |
| r/financestudents | 1 | 0 | **removed by automod**, never publicly visible |
| r/FinancialAnalyst | 0 | 1 | flat |
| r/WallstreetOasis | 1 | 0 initially | later drew the same hostile comments |

**The r/MBA comments, verbatim:**

- `Skill issue` — the top comment
- `Omg`
- `If you can't pay attention to some emails then how can you pay attention to
  the 10x more that would happen if you got the job.`
- `Holy 628 emails`
- `This is everything wrong with MBAs in a nutshell`
- `I'm not trusting anything you build if you can't keep a schedule 🤣`

Jon replied to defend the workload of undergraduate recruiting. **That reply
scored 0.**

**Traffic: two visitors**, both from r/MBA, measured under the canonical filters.
That is the entire commercial result of the round.

---

## 4. Why it failed

The comparison is close to a controlled experiment and it should be read that
way: **same subreddit, same account, six weeks apart, opposite outcome.**

| | First post | Second post |
|---|---|---|
| Frame | *I'm thinking of building this, would it help?* | *I made a mistake that cost me, here is what I built* |
| What the reader is | an advisor being consulted | a juror handed a confession |
| What they said | *shoot me a DM* | *skill issue* |
| Score | +13 | 0 |

Four mechanisms, in rough order of force:

1. **The vulnerability moved from the problem to the person.** In the first post
   the broken thing was recruiting logistics. In the second the broken thing was
   Jon — and Jon is the one asking you to trust his software.
   `I'm not trusting anything you build if you can't keep a schedule` is that
   collision, stated by a stranger within minutes.
2. **Being consulted raises a reader's status; being handed a confession invites
   a verdict.** In a status-anxious professional subreddit, dunking is free
   status and it is the cheapest available response.
3. **A mockup invites *yes, I'd want that*. A finished product invites *prove
   it*.** The first post gave them nothing to evaluate, so the only move
   available was to say whether they wanted it.
4. **The ask got more expensive.** *Would this be helpful?* is answerable in the
   comment box. *Take a look and tell me where it misses* means leaving Reddit.
   When the ask is expensive, the cheap alternative — a dunk — is right there.

**One honest correction to that analysis.** The first post's DM requests were
partly an artefact of there being no self-serve path: *shoot me a DM* is what
happens when asking is the only way in. Give people a working link and the
equivalent person clicks quietly and leaves no comment to feel good about. So
the first post's comment section looks like better signal than it strictly was.
**What that does not explain is the score or the tone** — a post does not fall
from +13 to 0 for carrying a link, and not one commenter mentioned promotion.
They were reacting to the confession.

**The recommendation to use the confession frame came from this chat and it was
wrong.** The reasoning was that self-incrimination reads sympathetic and drives
comments, and that comments drive ranking. It did drive comments, nine against
four. **Comments were the wrong target.** A post that makes people argue with
you ranks; a post that makes people want something produces DMs.

---

## 5. What the subreddit rules actually say

Read from Reddit's own API on August 12, 2026. **This was the first time any
subreddit rule had been checked in this project** and it happened after the
target list was written rather than before.

| Subreddit | Subscribers | Relevant rules |
|---|---|---|
| r/FinancialCareers | ~1.76M | **No Self-Promotion, Blogs, Spam** · **Highly Likely AI Generated Text** |
| r/MBA | ~331K | **No self-promotion** · flair required · questions to the weekly megathread |
| r/financestudents | ~35.5K | **No Self-Promotion or Marketing** · **No AI-Generated Posts** · Avoid Product Recommendations |
| r/financestudentshub | ~23.5K | none listed |
| r/FinancialAnalyst | ~9.3K | **No ads.** |
| r/consultingcareers | ~9.8K | none listed |

**The finding is the correlation, not the prohibition.** The two subreddits with
no self-promotion rule are the two nobody reads: r/financestudentshub's best post
of the entire year scored 52. **Permission and reach are inversely related across
this whole list.**

**Two of them ban AI-written text by name**, which is a constraint on the prose
itself rather than on the strategy.

Jon was shown all of this before posting and ruled to proceed anyway, knowingly.
That ruling is recorded in `04`.

---

## 6. What was learned about the audience, stated positively

Not everything failed. Three things are now known that were not known before:

- **The audience is reachable.** ~20,000 organic views from one account with no
  budget.
- **The numbers work.** `Holy 628 emails` was the only non-hostile comment in the
  whole second thread. It was a reaction to a specific figure, not to a story or
  a product.
- **The best-performing shape on these subreddits is a first-person account with
  a real number and a question the reader can answer without leaving.** The
  single most instructive post found in the research was on r/financestudents:
  `I cold-emailed 730 investment bankers and got 3 replies` — 137 points and
  **101 comments**.

---

## 7. What Jon changed as a result

His words: *"We aren't going to engagement farm rage bait. We are going to be
upfront candid human to human."*

### The posts

Take them all down. r/MBA was deleted the same day; the rest follow. No reposting
for several days — same account, same subreddits, similar content inside a short
window is itself a spam pattern.

### The website, which is the large one

Jon's diagnosis, and it did not come from the Reddit failure so much as from
looking at his own site afterwards: **the page was written as semi-professional
SaaS marketing and is read by 19 to 21 year old finance recruits who detect
marketing for sport.** In his words, they *"can see right through all this
marketing buzz… what they care about is, do they trust this product, do they
resonate with it personally… but honestly the bigger thing is aligning with them
culturally."*

**He explicitly overrode the specification documents to do it**, which is
recorded as a ruling rather than allowed to happen by drift. Scope was text only:
every visual asset, layout, film and funnel mechanic untouched.

Four voices were drafted and compared behind a review route. Jon picked one,
amended it twice, and it shipped to production on August 13, 2026:

| | Was | Is |
|---|---|---|
| Hero | `Your networking keeps moving. Your tracker does not.` | **`Recruiting truly sucks. You will lose track.`** |
| Eyebrow | `The smart recruiting tracker for investment banking and high-finance networking` | **`The non-AI slop tracker that actually saves you time`** |
| Authority | `Built by a former Goldman Sachs banker for recruitment.` | **`Built by someone who actually went through IB recruitment (and hated it).`** |
| Section 01 | `Your manual tracker was never built to keep up with this.` | **`Your Google Sheet won't keep up with this.`** |
| Section 03 | `Know exactly what needs your attention.` | **`Everything you still owe`** |
| CTA button | `Try Blotter Now` | **`Fix my tracker`** |
| Closing banner | `Your recruiting tracker, always current.` | **`Recruiting will still suck. You just won't lose anyone.`** |
| FAQ | five product questions | **plus `Will AI take my analyst role?` — `Probably.`** |

The point of the rewrite is that **the page a Reddit reader lands on now speaks
the same way the post that brought them there should.** Under the old copy the
post and the destination were written by two different people.

### The instrument

Built the same day, because a single-arm demand test cannot read its own results
without it:

- **Per-subreddit short links** — `blotterib.com/fc`, `/mba`, `/students`,
  `/analyst` — so simultaneous posts stay separable, with the tracking hidden
  behind a redirect rather than shown in the post.
- **Attribution rewritten.** It had four silent faults, including reporting an
  empty string for all direct traffic and re-attributing anyone who visited
  `/privacy` and came back.
- `/privacy` made indexable.

---

## 8. Known data problems in round one, for whoever reads the numbers

1. **`reddit-financestudents-01` is r/WallstreetOasis traffic.** The WSO post was
   published with the r/financestudents link. The r/financestudents post was
   never publicly visible. The campaign that reads as one subreddit contains all
   of another's and none of its own.
2. **r/financestudents was removed by automod**, so a zero there means invisible,
   not uninterested.
3. **The page changed underneath the test on August 13, 2026.** Every visitor
   before that date saw materially different copy. 63 visitors and 9 leads sit on
   the old page.

---

## 9. State at the end of round one

- **63 unique visitors** under the canonical filters, **9 leads**, **1 waitlist
  join**, **zero checkout starts ever**.
- **Eight of the nine leads stopped at `email`** and never reached the price
  screen. Whatever is killing this funnel happens *before* price, which is a
  different problem from the one the waitlist branch was built to solve.
- r/FinancialCareers, the only subreddit large enough to move the number, has
  still never been posted to.
