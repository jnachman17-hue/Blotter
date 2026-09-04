# Jon's notes, 3 September 2026 — the full list

Everything Jon said in one pass, broken into checkable items. Nothing here is
paraphrased away: where he gave exact wording, the exact wording is recorded.

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done · `[J]` Jon's
own task, cannot be done from here.

---

## 0. Universal rules — apply to every page, every file, every hand-off

- [ ] **0.1 Far fewer em dashes.** Jon: *"way too many M dashes. They look so
      chat... so AI."* This is universal and applies to anything written from
      here on, including documents and commit messages.
- [ ] **0.2 Stop writing like an AI.** Jon on "Five steps, about five minutes":
      *"this is so freaking AI written. It's painful."* Shorter, plainer,
      declarative. No hedging, no cadence-for-its-own-sake, no triplets.
- [ ] **0.3 Less marketing, less jargon, less slop.** *"We have a real product,
      and we just want you to sign up."* The site shows what you need, it does
      not pitch.
- [ ] **0.4 Everything friendly on mobile.** Including the setup pages. *"most
      people will learn about this from their phone."*
- [ ] **0.5 Better UI throughout.** Jon repeatedly: the current layouts are
      *"hard to read"*. Lean on the formatting/UI skills available. It does not
      have to stay strictly on the Blotter theme.

---

## 1. `/setup` — the chooser page

- [x] **1.1** Opening line is scary and vague. *"you copy one spreadsheet into
      your own Google Drive and give it permission to look at your email. This
      sounds scary. What is it? Is it Blotter? Is it you? Is it the script?"*
      Replace with something like **"give it permission to connect to your
      Google account"**.
- [x] **1.2** Then: **"From then on it tracks your recruiting conversations and
      keeps the tracker current."** Full stop. *"That's all you need."*
- [x] **1.3** **"Setup takes two minutes, one time."** (amended by Jon later that night: *"it literally only takes one to two minutes. Just say two minutes for both."*) Not "Five minutes, once"
      — *"there's no context."*
- [x] **1.4** *"What Blotter can actually see"* takes too much space and pushes
      the actual set-up below the fold. Add a **"Skip to setup ↓"** jump link.
- [x] **1.5** Delete the paragraph beginning *"There is one exception, and it
      works in your favour"*. Fine in the privacy policy, not needed here.
- [x] **1.6** Missing space between "Where it all goes." and "Blotter".
- [x] **1.7** **"waiting" is not a status.** Remove the list. Just: *"works out
      the status."*
- [x] **1.8** Say **"it cannot read the text or content of your emails."**
- [x] **1.9** "We keep no copy of your sheet" → **"We do not have a copy of your
      sheet."**
- [x] **1.10** "The full detail is in" → **"The full details are in the privacy
      policy."**
- [x] **1.11** The two choice boxes are *"set up atrociously and so hard to
      read."* Redesign them.
- [x] **1.12** "Which account is your recruiting email in?" → **"Blotter reads
      the mailbox of the account you recruit from, so install it where your
      recruiting email actually arrives."**
- [x] **1.13** Delete "The two set-ups differ by one screen…".
- [x] **1.14** Make it **clear on this page that the process genuinely differs**
      between recruiting from a personal address and a university one.
- [x] **1.15** University card: just **"A .edu address that runs on Google."**
      Drop "The shorter path / Google recognises your university". Label it
      something like **"University account setup"**.
- [x] **1.16** Personal card: **"One extra step, and it's explained in here."**
- [x] **1.17** Delete the whole **"Not sure?"** paragraph. *"Everybody knows
      where they recruit from."*
- [x] **1.18** Delete **"Stuck at any point, email us"** at the bottom.

---

## 2. `/setup/university`

- [x] **2.1** "Five steps, about five minutes" → **"Five steps that take roughly
      five minutes."**
- [x] **2.2** UI is hard to read. Rework it properly.
- [x] **2.3** Delete *"Because your university runs its Google accounts, Google
      already knows who you are, so this is the straightforward version with no
      security warnings to work through."*
- [x] **2.4** "The five steps / Open each one as you get to it" → something like
      **"How to set up"**.
- [x] **2.5** Add a short note near the top: **if you do see scary warnings, go
      to the personal set-up and it will walk you through them** — other
      universities may be configured differently.
- [x] **2.6** Step 1: delete the two-signed-in-accounts warning. *"I've never
      heard of this. Whatever your avatar is, you're signed in to."* Also delete
      the private-browsing-window suggestion.
- [x] **2.7** Step 2 is fine as it stands.
- [x] **2.8** Step 3: delete the grey callout box ("Select what Blotter can
      access / all of them empty"). Just: **"Google asks what Blotter is allowed
      to do. The screen is headed [Blotter wants access to your Google
      Account]."** Then tick Select all, then Continue.
- [x] **2.9** "Leave one off and Blotter fails later, in a way that is very hard
      to work out" → **"If you don't select all, Blotter will not run
      correctly."**
- [x] **2.10** **Keep** the "Google's wording is broad" explanation. Jon likes
      it.
- [x] **2.11** **Steps 4 and 5 (Settings, Add people) do not belong on the
      website.** The website ends by sending the student to the **Start here**
      tab on their own spreadsheet. Add a screenshot pointing at that tab.
- [x] **2.12** The bottom "if you saw a warning" box is good. Remove *"than the
      ones we have tested"*; say **"your university has set up permissions
      differently than expected."**
- [x] **2.13** Delete the "If something looks wrong / diagnostics" section — it
      already lives in the spreadsheet. Replace with **"If you're having issues,
      email blotterib@gmail.com for help."** Keep the "to stop Blotter entirely"
      paragraph.

---

## 3. `/setup/personal`

- [x] **3.1** **Every note in §2 applies here too**, in the same way. Jon: *"any
      comment that I made on the university account that can apply to the
      personal in the same exact way, just make it."*
- [x] **3.2** **"This process is six steps. It takes about five minutes."**
- [x] **3.3** Step 3: delete the "Google hasn't verified this app" callout box.
      *"The screenshot shows that perfectly below."*
- [x] **3.4** Rewrite the reassurance. The current version is **not reassuring**:
      *"as far as Google is concerned you now own this… the screen is asking
      whether you trust something sitting in your own account. Okay, well, we put
      it there."* Needs to say plainly that the screen is asking whether you
      trust Blotter to read your own Google account, and to sound far less
      alarming.
- [x] **3.5** The "same organisation" explanation is too complicated. Replace
      with something like **"if you have a university email this doesn't happen,
      because universities are trusted automatically."**
- [x] **3.6** Delete steps 5 and 6; end at the **Start here** tab, as in 2.11.
- [x] **3.7** Same troubleshooting change as 2.13.

---

## 4. Landing page — CTA and funnel

- [x] **4.1** **`Fix my tracker` goes away.** The new call to action is
      **`Set up free`** (or similar wording).
- [x] **4.2** Keep a **three-question funnel** before hand-off, because it
      collects emails: (a) recruiting for investment banking, (b) which
      recruiting window, (c) your recruiting email address.
- [x] **4.3** Wire those three to analytics.
- [x] **4.4** **Delete every other step in the existing funnel.**
- [x] **4.5** The funnel ends by sending the person to the set-up pages.

---

## 5. Landing page — sections

- [x] **5.1** **Delete section 01** ("your Google Sheet won't keep up").
      *"We're not really marketing. We have a real product."*
- [x] **5.2** The 620-emails animation goes with it. *"that's so arbitrary and
      people kinda know that's BS."* If section 01 is replaced at all, it should
      frame the problem without that animation.
- [~] **5.3** **Section 02 needs a new UI.** (with the animation agent) The spreadsheet columns have
      changed; it must reflect what the product actually looks like now.
- [x] **5.4** **Remove the status chips** from section 02. They no longer exist.
- [ ] **5.6** **The hero line goes.** Jon, later that night: *"get rid of all the
      marketing language on the landing page that's, like, recruiting truly
      sucks, you will lose track. Just get rid of that BS... It isn't BS anymore.
      We're going live to real banking orgs."* Replaced in `sections/hero.tsx`
      and `closing-copy.ts`; `hero/hero-top.tsx` carries the same line and is
      the animation agent's file, so it was relayed. The header tagline ("The non-AI slop tracker that actually saves you time") went under the same ruling, in `site-header.tsx` (done) and `hero/hero-top.tsx` (relayed).
- [x] **5.5** **Section 03 is deleted entirely.** *"we don't have the what you
      owe / paid. We don't make that now."*

---

## 6. The animated sheet UI — brief for a separate chat

Jon wants a written brief handed to a dedicated chat, the way previous work has
been handed off. That chat previously owned the film/animation work.

- [ ] **6.1** The brief must first **look at what is on the site now**, then
      reconcile it against what the product actually does today. **The animation
      has to look like the real sheet** — same columns, same status colours, same
      proportions. It is a picture of the product, not an illustration.
- [ ] **6.2** The spreadsheet's current columns are **Status, Days, Last
      contact, Attempts, Next call, Last call**, plus the agreed status states.
- [ ] **6.3** **Three new callouts** on the right of the animation, replacing the
      existing ones. **Corrected by Jon:** status still changes. Attempts changes
      *alongside* it where relevant, rather than instead of it. So a follow-up
      going out moves Status and takes Attempts 1 to 2 in the same beat. The old
      callouts invent states that do not exist ("bump threat"); the new ones show
      what the sheet really does. Pick the clearest real examples.
- [ ] **6.4** **A new mobile version of the animation.** Look at what the current
      mobile version compresses; decide which columns to drop.
- [ ] **6.5** A **new UI for section 02**, matching the real columns, with no
      status chips.
- [ ] **6.6** Deliver back for integration. Jon: *"eventually you're gonna come
      back and integrate everything live."*

---

## 7. Site-wide copy pass

- [x] **7.1** Read and correct **how it works** and **how we use your data** —
      accurate, friendly, not scary, few em dashes, matching how we actually
      phrase things now.
- [x] **7.2** **FAQ:** check every answer still matches the product. Keep Jon's
      jokes. Fix anything outdated.
- [x] **7.3** The whole site must describe **what Blotter is now, not what it
      was**.
- [x] **7.4** Privacy and terms re-read for the same accuracy and tone.

---

## 8. Already parked, still outstanding

- [x] **8.1** **Rewrite `Start here`** on the sheet, from
      `31-STUDENT-FACING-BACKLOG.md`. It becomes the real end of the set-up
      journey, so it carries more weight than before.
- [~] **8.2** **Add screenshots to `Start here`.** (menu shot is in; shots *of the sheet itself* need Jon, see §10) The courier already renders
      `=IMAGE(url)`, and the images are live on blotterib.com, so this is
      buildable from here.
- [x] **8.3** **The public `.gs` file.** Strip every comment but a plain-English
      header, remove all internal document references, remove Jon's name, use
      `blotterib@gmail.com`. Build it with `publish.js`; keep the internal source
      commented.
- [J] **8.4** **Create the blank template** in Drive and publish its link. Needs
      a Google account; Jon has to do it, or explicitly authorise the Drive
      connector to try.
- [ ] **8.5** **End-to-end test of everything** before launch. Every function,
      every edge case. Much has changed.
- [ ] **8.6** **Analytics and Supabase**: confirm the database captures what is
      actually needed.
- [ ] **8.7** **Payments**: re-test, confirm accounts can be assigned payments
      and cut off individually.
- [ ] **8.8** **Three legal facts for `/terms`**: entity, liability cap,
      governing law. Still unanswered.

---

## 9. Accepted as-is

- **9.1** Only one university was tested. Jon: *"I have no way to test another
  university, so we're just gonna have to accept as is."* No further testing
  planned; the university page carries a fallback note for anyone whose school
  differs.

---

## 10. Follow-ups opened by the night pass (3 to 4 Sep 2026)

- [ ] **10.1 Prune the dead section files.** `scale-and-consequence.tsx`,
      `tracker-and-actions.tsx`, `section-2/*`, `section-45/outstanding-phone.tsx`
      are unrendered but kept because `app/review/{hero,page-refresh,sheet-mobile,voice}`
      import them. Decide whether those review pages still earn their keep, then
      delete both together.
- [ ] **10.2 `ownership.tsx` must render `<SectionNumber n={1} />`.** It is the
      animation agent's file, so the change was relayed rather than made. Until
      its work merges, the preview shows two sections numbered 02.
- [ ] **10.3 Analytics for the hand-off.** The funnel now ends by navigating to
      `/setup` after `email_submitted`. No new event was added, because the nine
      names are a frozen contract. If Jon wants the hand-off counted separately,
      that is a one-line addition and a deliberate change to the contract.
- [ ] **10.4 `FUNNEL_STAGES` keeps its dead entries on purpose.** `film`, `price`,
      `waitlist`, `checkout`, `confirmed` are unreachable but stay in the array so
      `furthest_stage_index` values already stored in Supabase keep their meaning.
      Removing them is a migration, not a tidy-up.
- [J] **10.5 Screenshots of the sheet itself** for `Start here`: the Settings
      tab, the Contacts tab, the Found tab. Only Jon can take these.
- [J] **10.6 The blank template**, still. Every `/setup` flow ends at a button that
      does not exist yet.
