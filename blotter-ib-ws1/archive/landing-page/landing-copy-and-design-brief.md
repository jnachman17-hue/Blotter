# Blotter IB Landing Page — Copy \+ Design Handoff

**For the Claude Code session. Replaces every bracketed placeholder currently on the page and grants explicit design latitude below the hero.**

**This document is the new source of truth. It overridden anything stated in any other document in this project. You have creative freedom and autonomy here.** 

Live page: [https://blotter-landing.vercel.app](https://blotter-landing.vercel.app)

---

## 0\. Read this first

Two jobs in this session:

1. **Swap in the copy** below, keyed to the existing placeholder names.  
2. **Design the page around it.** The sections below the hero were deliberately built as unstyled placeholder blocks. That was correct at the time. It is no longer. You have latitude to make this page look designed, and you are expected to use it.

**Hard rule on punctuation:** no em dashes anywhere in visible page text. Use commas, periods, or separate sentences. This applies to all copy you write or adjust, including anything you generate for layout reasons. Hyphens inside compound words like "thank-you" and "follow-up" are fine.

---

## 1\. What you may NOT touch

- **The hero animation.** The GSAP loop, its timing, its beats, its geometry. Finished and verified.  
- **The product screens.** The CRM, Daily Queue, and Calendar renders inside the hero and inside the features tabs are pixel targets extracted from locked design masters. Do not restyle, re-space, or "improve" them.  
- **Any string inside the product window or the Gmail panel.** Those come from a separate content authority document. Existing dashes inside those strings are pre-existing and out of scope.  
- **The noindex meta tag.** Stays until told otherwise.

---

## 2\. Design latitude (what you SHOULD do)

Everything below the hero is yours to design. Specifically:

- **Type at marketing scale.** The design tokens were authored for a dense product workspace. Nothing above that scale exists. Author a marketing-scale type ladder: page headline, section headings, body, small text. A 20px workspace page title is not a landing page headline.  
- **Section rhythm and vertical spacing** at full page width.  
- **Layout of each section.** Stakes in particular should not be two prose paragraphs (see §3.3).  
- **The wordmark in a marketing context.** Permitted on this page, forbidden inside the product workspace. Use it well.  
- **Restraint is the brief.** Visual references: Linear, Mercury, Stripe documentation. Cool, navy, quiet, dense-but-composed.

**Standing walls, non-negotiable in any visual choice:**

- No gamification, no scoreboard framing, no badges, no progress bars as decoration.  
- No exclamation-mark energy.  
- No animated counters, no big flashy stat blocks. That reads as generic AI marketing and is explicitly rejected.  
- Calm, credible, finance-literate without cosplay. It should look like something a banking analyst would not be embarrassed to have open.

---

## 3\. Final copy, keyed to placeholders

### 3.1 Nav

- Nav CTA currently reads "Join the waitlist". **Change to "Get Early Access"** to match the hero and waitlist buttons.  
- Nav anchors stay: Features, Timeline, Privacy, FAQ.

### 3.2 Hero

**`[HERO HEADLINE – D6]`**

> The reply lands. Blotter already knows.

**Add a short category line above the headline** (new element, small, quiet):

> The logistics layer for IB recruiting.

**`[HERO CAPTION - D6]`** — currently reads "She replied. Your follow-up deleted itself."

**LEAVE AS IS.** This line is still under owner review. Do not change it, do not style it away.

**`[HERO CTA – D6]`**

> Get Early Access

### 3.3 Stakes

**Structural note: do not render this as two paragraphs.** The current two-paragraph slots should become: heading, lead line, a set of four volume facts presented as a composed group, then a closing line. The volume facts are the visual centerpiece of this section. Treat them like a research exhibit or a tearsheet, not like a feature grid and not like animated statistics.

**`[STAKES HEADING – D6]`**

> One recruiting cycle. Countless logistics to manage.

**Lead line:**

> During a live cycle, you are tracking countless contacts, threads, calls, and deadlines across every bank at once, and every piece of it has to stay accurate.

**The four volume facts:**

> Many hundreds of emails, sent across potentially hundreds of contacts  
>   
> Many dozens of coffee chats and interview rounds, each one a separate commitment to keep track of  
>   
> A thank you owed after every one of them  
>   
> Constant scheduling and coordination, running in parallel, for months

**Closing line:**

> Managing it all is genuinely time consuming, and it adds real stress during the busiest six month grind of your life. With this much volume in motion, something inevitably gets missed.

### 3.4 Differentiation

**`[DIFFERENTIATION HEADING – D6]`**

> The one edge nobody is selling.

**`[DIFFERENTIATION BODY – D6]`** (three paragraphs)

> Technical prep, mock interviews, and process guides are everywhere already, and none of it sets you apart from the thousands of students doing the same reps.  
>   
> The part nobody has built for is what happens after that: staying organized across every contact, every bank, and every deadline while the cycle is actually live. That is where recruiting actually eats your time, and until now nothing existed to handle it.  
>   
> Blotter doesn't make you better at technicals. It makes sure nothing you already earned falls through.

The third line is the section's punchline. Give it visual separation from the two paragraphs above it.

### 3.5 Features

**`[FEATURES HEADING – D6]`**

> Three views, one source of truth.

**`[DAILY QUEUE BLURB – D6]`**

> Your recruiting day, intelligently computed. Blotter reads what's actually happened and tells you what needs attention today, ranked and grouped. Nothing to configure and nothing to check off. It stays accurate on its own.

**`[CRM BLURB – D6]`**

> Every contact, every bank, every conversation. Status updates itself from your inbox, so what you see is what is actually true right now.

**`[CALENDAR BLURB – D6]`**

> Coffee chats, interviews, and deadlines in one place, pulled in automatically as they get scheduled. Deadlines lead, so the things that expire never sit below the things that don't.

Tabs remain static renders. Clicking between the three surfaces is the whole interaction. No navigation into the screens, no state, no clickable rows.

### 3.6 Timeline

**Render as a staged visual, not a paragraph.** Three dated stages plus a closing line. Keep it plain: no icons, no progress bar, no illustration.

**`[TIMELINE HEADING – D6]`**

> Where things stand.

**Stage 1 — label: Now**

> Blotter is in build and testing, with a small demo group of students using the platform ahead of launch.

**Stage 2 — label: September 2026**

> Blotter opens to the first 300 students, timed to the start of networking for the summer 2028 analyst class. While you're studying technicals this summer, we're getting Blotter ready for outreach.

**Stage 3 — label: Winter 2026**

> New features come online and Blotter opens to everyone as we scale capacity. A more complete platform, built on what the first group teaches us.

**Closing line:**

> Join early. Order matters.

### 3.7 Privacy

**`[PRIVACY HEADING – D6]`**

> You're about to connect your email. Here's exactly what happens.

**`[PRIVACY CLAIM – D6]`**

> The data Blotter needs, candidly. Blotter never reads your personal email. It checks who mail is from, and only reads recruiting mail from the banks and people you track. It keeps the facts it needs and nothing else.

**`[PRIVACY LINK – D6]`**

> Read the full privacy policy.

**The privacy policy page does not exist yet.** Wire the link to a `/privacy` route and leave a clearly marked stub. Do not write policy text.

### 3.8 FAQ

**Six questions. The page currently has four slots. Add two.**

**`[FAQ HEADING – D6]`**

> Questions.

Order the six as you judge best for a reader working down the page. The two spreadsheet questions should sit adjacent to each other, with the "why switch" one before the "can I switch" one.

**Is this another interview prep tool?**

> No. Blotter does not teach technicals, run mock interviews, or explain the process. Those already exist everywhere. Blotter handles the logistics underneath all of it, the first platform built to do it.

**Does Blotter write my emails for me?**

> No. Blotter never writes your outreach, not with AI and not with templates. It is a logistics layer that helps you manage hundreds of moving parts. No technical prep, no AI outreach slop. The words are yours.

**Do I have to keep it updated?**

> No. That is the entire point. Once your email is connected, Blotter updates itself as replies land and meetings get scheduled. There is no status column to maintain.

**I already track everything in a spreadsheet. Why switch?**

> Because a spreadsheet only knows what you last typed into it, and during a live cycle you are the one keeping it true. Every reply, every scheduled call, every thank you owed has to be entered by hand, usually at the end of a long day, and the moment you skip a night it starts lying to you.  
>   
> Blotter updates itself. Replies land and the status changes. A call gets scheduled and it appears on your calendar. Someone goes quiet for six days and they surface on their own, without you noticing first. You are not maintaining a record of what happened. You are opening a view of exactly where every thread stands right now, and reading what needs you today.

**I already started my own spreadsheet tracker. Can I switch?**

> Yes. Upload your existing spreadsheet and Blotter imports the relevant data for you. You don't rebuild anything by hand.

**Will Blotter work inside a spreadsheet?**

> It's something we're actively exploring. For now, Blotter is a platform, and the import above means your existing tracker isn't wasted either way.

Note: the "why switch" answer is much longer than the others. If the FAQ renders as an accordion, that is fine. If it renders as an open list, flag it rather than trimming the answer yourself.

### 3.9 Waitlist

**`[WAITLIST HEADING – D6]`**

> Get early access.

**`[WAITLIST SUBHEAD – D6]`**

> Join the waitlist for the September 2026 opening. The first 300 students get in, in the order they signed up.

**`[WAITLIST SUBMIT – D6]`**

> Get Early Access

**Backend: Tally (hosted form service).** The owner is creating the form. Replace the current stub with Tally's inline embed.

- Fields on the Tally side: email (required), an optional short question field, and Tally's automatic submission timestamp.  
- **Design the section around the embed so it reads as part of the page**, not a bolted-on widget. The surrounding section carries the visual weight. Match background, spacing, and heading treatment to the rest of the page.  
- Keep the embed swap to a single clearly marked block so the endpoint can be changed in one edit later.  
- Do not build honeypot or spam handling. Tally handles it.

**Confirmation message** (set on the Tally side, included here for consistency):

> You're on the list. If you asked something, you'll get a reply.

### 3.10 Footer

**`[FOOTER COPY – D6]`**

> Blotter IB. Built for the recruiting cycle, by someone who ran it.

Plus a privacy policy link and the year. Minimal.

**Owner has not finally ruled on this line.** Build it, flag it in the delta as pending confirmation.

---

## 4\. Open items to flag in your delta, not resolve yourself

1. **Hero caption** is still the placeholder line, under owner review. Untouched by design.  
2. **Footer line** pending owner confirmation.  
3. **Privacy policy page** does not exist. Route stubbed only.  
4. **September capture claim.** The timeline copy above deliberately does NOT promise automatic email capture at the September opening, because capture depends on an unresolved third party integration targeting October or November. The owner previously asked for a stronger claim and has not re-confirmed either way. Do not add a capture-at-launch promise on your own initiative. Flag it.  
5. **Mobile.** Must not break. Polish is not required, but if design decisions at desktop scale create obvious mobile problems, note them.

---

## 5\. Working rules for the session

- One milestone at a time, owner verifies in-browser before the next.  
- Suggested order: copy swap first (fast, verifiable), then marketing type scale, then section-by-section layout, then the Tally embed, then a full read-through pass.  
- Deviations from this document get flagged, never silently redesigned.  
- End with a delta document: what was built, what you changed and why, open questions, and where the copy strings live for future edits.

