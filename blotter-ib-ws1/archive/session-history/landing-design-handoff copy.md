# Blotter IB Landing Page — Design Session Handoff

**This document replaces `landing-copy-and-design-brief.md` in full. It is the source of truth for this session and overrides anything stated elsewhere in the project regarding the landing page's visual design, section inventory, section order, or copy wording.**

Live page: [https://blotter-landing.vercel.app](https://blotter-landing.vercel.app)

---

## 0\. What this session is

The page is a shell. The hero animation is finished and good. Everything beneath it is unstyled placeholder blocks holding provisional copy, and it looks like it was built in 2012\. That is not a copy problem. It is that no one ever authored a marketing-scale visual system for this page, and the previous handoff spent all of its authority on getting words exactly right instead of getting the page designed.

This session inverts that. **You own the design.** Section inventory, section order, page rhythm, layout of every block, type system, marketing palette, spacing, restrained motion, component treatment. You are expected to make real decisions and commit to them, not to assemble the blocks below in the order they appear.

The copy in §4 is raw material and intent, not a script. Rewrite it, retitle it, split it, merge it, cut it, reorder it. What you may not do is change what it claims. That distinction is the whole game and §1 makes it explicit.

**One punctuation rule, absolute: no em dashes anywhere in visible page text.** Commas, periods, colons, or separate sentences. Hyphens inside compound words ("thank-you", "follow-up") are fine. This applies to every string you write or adjust.

---

## 1\. Three tiers of authority

### Tier 1 — Do not touch

- **The hero animation.** The GSAP loop, its timing, its beats, its geometry. Finished and verified. You may reposition the block it lives in and design everything around it, but the animation itself is closed.  
- **The product screen renders.** The Daily Queue, CRM, and Calendar renders are pixel targets extracted from locked design masters (`stage-2-index.html`). Do not restyle, re-space, recolor, or improve them. They carry product tokens and must keep carrying them.  
- **Any string inside the product window or the Gmail panel.** Separate content authority. Existing dashes inside those strings are pre-existing and out of scope.  
- **The `noindex` meta tag.** Stays.  
- **The three-surface tab interaction.** Required. See §3.

### Tier 2 — The claim is fixed, the wording is yours

These are commitments, not copy. Rephrase freely, but do not change what is being asserted, and do not add assertions that are not here.

1. **Blotter is a logistics layer, not interview prep.** No technicals, no mock interviews, no process education. Ever. This is the positioning wedge and the page must not blur it.  
2. **Blotter does not write outreach.** Not with AI, not with templates. "The words are yours" is the substance. Do not soften this into "AI-assisted." Intentionally use the phrasing “No AI slop”  
3. **No outcome promises.** Blotter does not get anyone an offer, improve their odds, or make them a better candidate. It keeps them from dropping things.  
4. **Privacy substance, exact:** Blotter never reads personal email. It checks who mail is from, and only reads recruiting mail from the banks and people the user tracks. It keeps the facts it needs and nothing else. You may re-voice this. Do not weaken it, do not strengthen it, do not add technical detail.  
5. **Timeline facts:** first opening September 2026, first 300 students, ordered by signup. Broader opening Winter 2026\. Currently in build and testing with a small demo group.  
6. **No pricing, no plan, no free-versus-paid language anywhere.** Monetization is undecided.  
7. **Volume language stays textural.** "Hundreds", "dozens", "months". Never a computed average, never a precise-sounding fabricated statistic, never a loss fraction ("students miss 30% of follow-ups"). No sourced-looking numbers of any kind.

### Tier 3 — Yours, entirely

Everything else. Section inventory (add, cut, merge, invent). Page order. Headings and section titles. Body phrasing. Layout of every block. Type scale. Marketing palette. Spacing and rhythm. Backgrounds and section transitions. Restrained motion. Nav treatment. Wordmark treatment. Footer. Where the tabs live. What the page opens with.

---

## 2\. The design brief

### Character

Calm, credible, opinionated, finance-literate without cosplay. Sound very human like. By a kid who went through IB recruiting for a kid who is going through IB recruiting. It should look like something a banking analyst would not be embarrassed to have open on a shared screen. Restraint is the brief, not decoration.

The product's own ratified character statement, for orientation: *a clean instrument, not a dashboard costume. Cool-neutral, navy-anchored, hairlines not grids, air not furniture.*The landing page is not the workspace and should not be as dense, but it should read as having come from the same place.

### References

Linear, Mercury, Stripe documentation. Cool, quiet, composed, confident in whitespace, typographically disciplined. Study how they open a page, how they pace sections, how they present a product screenshot, and how little they use color.

### Palette

You have latitude here and should use it. The landing page is marketing, not product, and does not need to be a literal application of the product tokens.

**But it has to pass one test:** the locked product screens must sit inside your page without looking like a foreign object pasted in. Those screens are navy `#1B3866`, background `#F5F7FA`, white surfaces, cool grays, with five muted state colors. Build a marketing palette that can host them. Extend, deepen, add a considered darker section, use tone and contrast at page scale. Do not go somewhere the screens cannot follow.

Cool and professional. Navy is the anchor. No pink, no violet, no warm cream and clay, no gradient meshes. Warm-cream-plus-serif was already identified in this project as the generic-AI-design cluster.

### Type

The design tokens were authored for a dense product workspace and nothing above that scale exists. A 20px page title is not a landing page headline. **Author a marketing type ladder**: page headline, section headings, lead lines, body, small text, eyebrow. Typography is the single highest-leverage thing you can do to this page. The workspace face is Schibsted Grotesk; the wordmark faces are Space Grotesk 700 plus Archivo 600\. The wordmark is forbidden inside the product workspace and permitted here. Use it well.

### Forbidden, in any visual choice

This list exists because unconstrained page generation converges on a recognizable genre, and that genre is the exact thing this product positions against. None of the following, regardless of how well executed:

- Animated counters, big flashy stat blocks, anything that makes a number perform.  
- Gamification of any kind: badges, scoreboards, streaks, progress bars as decoration.  
- Exclamation-mark energy. Hype voice. "Supercharge", "10x", "effortlessly", "game-changer".  
- Three-icon feature grids with generic line icons.  
- Testimonial cards, quote cards with headshots, star ratings. There are no customers yet and fabricating social proof is out of the question.  
- Logo clouds, "trusted by" strips, university crests, bank logos.  
- Gradient mesh backgrounds, glassmorphism, floating 3D shapes, blurred orbs, glow effects.  
- Emoji anywhere.  
- Oversized pill CTAs repeated in every section.  
- Dark-mode-only drama or neon accents.  
- Fake dashboard chrome, fake charts, fake numbers outside the locked product screens.  
- 

Restraint reads as expensive. Volume reads as cheap.

---

## 3\. The one interaction that must exist

**A three-surface tab switcher showing the full product.** Non-negotiable.

- Three tabs: Daily Queue, CRM, Calendar.  
- Clicking a tab swaps to that surface's full render. All three must be reachable and viewable at full fidelity.  
- The renders are static. Nothing inside them is clickable. No rows, no navigation, no state. Tab switching is the entire interaction.  
- Where this lives on the page, how it is framed, how the tabs are styled, and whether the transition is instant or crossfaded are yours to decide.

This is the closest a visitor gets to using the product. Give it real estate and treat it as a centerpiece, not a feature-section afterthought.

---

## 4\. Raw material

Presented as intent plus reference copy. **Rewrite freely. Preserve the claim.** You may cut a block, merge two, invent one that is not here, or change the order entirely.

**Category line / positioning.** What the product is, stated flatly and early enough that a visitor is never confused about what they are looking at. Reference: *The logistics layer for IB recruiting.*

**Hero headline and caption.** Currently *"The reply lands. Blotter already knows."* with caption *"She replied. Your follow-up deleted itself."* Both are under owner review and tied to the animation's beats. **Leave both strings as they are.** Typographic treatment, scale, and placement are yours.

**Primary CTA.** *Get Early Access*, consistently, in the nav, the hero, and the waitlist section. Currently the nav reads "Join the waitlist"; change it.

**The stakes.** A live cycle means hundreds of emails across potentially hundreds of contacts, dozens of coffee chats and interview rounds each a separate commitment, a thank-you owed after every one, and constant parallel scheduling for months. The point of the section is volume, and that volume is genuinely time consuming and stressful across a six month grind, and at that scale something inevitably gets missed. **Do not render this as two paragraphs and do not animate the numbers.** Treat the volume facts as a composed group, closer to a research exhibit or a tearsheet than a feature grid.

**The differentiation.** Technical prep, mock interviews, and process guides already exist everywhere and none of it separates anyone from thousands of students doing identical reps. The part nobody built for is what happens while the cycle is live: staying organized across every contact, bank, and deadline. Punchline: *Blotter doesn't make you better at technicals. It makes sure nothing you already earned falls through.* Give that line visual separation.

**The three surfaces.** Reference heading: *Three views, one source of truth.*

- *Daily Queue:* the recruiting day, computed. Blotter reads what actually happened and says what needs attention today, ranked and grouped. Nothing to configure, nothing to check off, stays accurate on its own.  
- *CRM:* every contact, every bank, every conversation. Status updates itself from the inbox, so what is on screen is what is true right now.  
- *Calendar:* coffee chats, interviews, and deadlines in one place, pulled in as they get scheduled. Deadlines lead, so things that expire never sit below things that don't.

**Where things stand.** Three dated stages, rendered as a staged visual rather than prose. Plain: no icons, no progress bar, no illustration.

- *Now:* in build and testing, with a small demo group of students using it ahead of launch.  
- *September 2026:* opens to the first 300 students, timed to the start of networking for the summer 2028 analyst class.  
- *Winter 2026:* new features come online and Blotter opens to everyone as capacity scales, built on what the first group teaches us.  
- Closing: *Join early. Order matters.*

**Privacy.** Reference heading: *You're about to connect your email. Here's exactly what happens.* Body carries the Tier 2 privacy claim verbatim in substance. Include a link to `/privacy`. **That page does not exist. Stub the route, mark it clearly, write no policy text.**

**Questions.** Six. Order them as you judge best for someone reading down the page, with the two spreadsheet questions adjacent and "why switch" before "can I switch."

1. *Is this another interview prep tool?* No. No technicals, no mocks, no process explainers. Those exist everywhere. Blotter handles the logistics underneath all of it.  
2. *Does Blotter write my emails for me?* No. Never, not with AI and not with templates. It manages hundreds of moving parts. The words are yours.  
3. *Do I have to keep it updated?* No, that is the entire point. Once email is connected it updates itself as replies land and meetings get scheduled. There is no status column to maintain.  
4. *I already track everything in a spreadsheet. Why switch?* A spreadsheet only knows what you last typed into it, and during a live cycle you are the one keeping it true. Every reply, every scheduled call, every thank-you owed gets entered by hand at the end of a long day, and the night you skip it starts lying to you. Blotter updates itself: replies land and status changes, a call gets scheduled and it appears, someone goes quiet for six days and surfaces on their own. You are not maintaining a record of what happened, you are opening a view of where every thread stands right now. **This answer is meaningfully longer than the others.** If the section is an accordion that is fine. If it renders as an open list, flag it rather than trimming the answer.  
5. *I already started my own tracker. Can I switch?* Yes. Upload the existing spreadsheet and Blotter imports the relevant data. Nothing gets rebuilt by hand.  
6. *Will Blotter work inside a spreadsheet?* Actively being explored. For now Blotter is a platform, and the import above means an existing tracker is not wasted either way.

**Waitlist.** Reference heading: *Get early access.* Subhead: joining the waitlist for the September 2026 opening, first 300 students, in signup order. Button: *Get Early Access*.

Backend is **Tally**, inline embed, replacing the current stub. Fields live on the Tally side: email required, one optional short question field, Tally's automatic timestamp. Confirmation message is set on Tally and reads *"You're on the list. If you asked something, you'll get a reply."* Design the section so the embed reads as part of the page rather than a bolted-on widget: the surrounding section carries the visual weight, and background, spacing, and heading treatment match the rest of the page. Keep the embed in a single clearly marked block so the endpoint is a one-edit swap. Do not build honeypot or spam handling; Tally handles it.

**Footer.** Reference: *Blotter IB. Built for the recruiting cycle, by someone who ran it.* Plus a privacy link and the year. Minimal. **Owner has not finally ruled on this line.** Build it, flag it.

---

## 5\. Sequence is an open question. Answer it.

Do not default to the order above, and do not default to the order currently on the page. Decide what a visitor should encounter and in what sequence, and be prepared to defend it in the delta.

The live question worth thinking about: **does the page open on the animation, or does something frame the product first?** The animation is a beautiful demonstration of a mechanic that a cold visitor has no context for. A person who does not yet know what Blotter is may watch a Gmail panel slide in and a queue row change color without understanding what they just saw. Framing before or alongside it may be worth more than the drama of leading with it.

The animation must stay in the upper region of the page. Whether copy precedes it, sits beside it, or follows it is yours. Make a real call.

Same for the rest: the stakes section might belong before the differentiation or after it. The tabs might belong immediately under the hero rather than a third of the way down. The timeline might be the closer rather than a middle section. Rearrange with intent.

---

## 6\. Flag, do not resolve

1. Hero headline and caption: still under owner review, left untouched by design.  
2. Footer line: pending owner confirmation.  
3. Privacy policy page: route stubbed only, no text written.  
4. Capture-at-launch claim: deliberately absent, see Tier 2 item 6\.  
5. Mobile: must not break. Polish is not required, but if desktop-scale design decisions create obvious mobile problems, note them.

Anything you deviate from in this document gets flagged in the delta. Never silently redesigned.

---

## 7\. Working method

**Build the whole page in one pass.** Do not stop for approval section by section. The previous method of incremental verification is what produced a shell, because no one ever got to see a composed page. Design it, build it, deploy it, and let the owner judge the finished thing with his eyes.

**Commit to one direction.** Do not hedge between two ideas or split the difference. A page with a clear point of view that is 70% right is more useful to judge than a compromise that is 85% inoffensive.

Suggested internal order, not a checkpoint schedule: establish the marketing type scale and palette first, then decide the page sequence, then build section by section against that system, then the Tally embed, then a full read-through pass for voice consistency and the em dash rule.

---

## 8\. Deliverable

The deployed page, plus a delta document covering:

- The page sequence you chose and why.  
- The type ladder and marketing palette you authored, with the actual values.  
- What you changed from this document and why.  
- Where every copy string lives, so future text edits are a one-file change.  
- Open questions and the flags from §6.

If there are ideas you have but you aren’t sure of the context or wording, you can add that in and leave the text section blank and at the end of the build I can fill it with the information you need. 

You have very robust creative autonomy. New sections of things or ideas that I never even thought about, fine. New content, okay. You’re at the helm. Take everything you know about thisn platform so far and make me an incredible ladning page. And if you don’t think it needs any expansion beyond the material we have, that’s okay. Just make what we have beautiful and good for marketing in this context. 