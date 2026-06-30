# Aqus — Narrative & Voice Rules

> How to **write** for Aqus: product copy, headlines, empty states, docs, decks, and
> long-form. This is the verbal half of the design system — the counterpart to
> `readme.md` (visual) and `ux-laws.md` (interaction & composition). A design isn't
> on-brand until the *words* are too.

---

## The core idea

**Aqus energises an experience.** Every line should feel like it was written by a
person who designs *and* builds — fluent in the craft, allergic to fluff, warm without
being soft. We speak **to one person, plainly, with quiet confidence.**

Three commitments, before anything else:

1. **One voice, three registers.** The voice never changes; the *register* flexes to
   the job — **intentive**, **creative**, or **technical** (defined below). Pick the
   register the moment calls for; never blur all three into mush.
2. **Speak to the individual.** Second person ("your projects", "you're all set"),
   direct address, present tense. Never corporate "we are pleased to…", never a faceless
   third person.
3. **Earn every word.** Like every shadow in the visual system is earned, every word is
   earned. If a sentence survives deletion of half its words, delete them.

---

## The three registers

**Most product UI is intentive. Creative is reserved for peaks. Technical is for docs and precision.**

### 1. Intentive — clear, purposeful, action-led *(the default)*

The everyday voice of the product. States what a thing does or what just happened, in
plain everyday language, so the interface is effortless to navigate.

- **Where:** buttons, labels, form fields, nav, confirmations, settings, tooltips,
  most empty states, status.
- **Tone:** calm, concrete, helpful. Verb-led. No drama.
- **Rules:**
  - Lead with the verb on actions: "Create project", "Save changes", "Send invite".
  - Say what happened, plainly: "Changes saved", "Invite sent to 3 people".
  - Describe benefit over mechanism when guiding: "Pick up where you left off", not
    "Restore previous session state".
  - One idea per line. If you need a comma-and-a-half, split it.
- **Examples:**
  - `New project` · `Save changes` · `Invite teammates`
  - `No projects yet — create your first to get started.`
  - `You're all set. Your workspace is ready.`
  - `Couldn't save. Check your connection and try again.`

### 2. Creative — evocative, human, memorable *(the peak)*

The voice that makes someone *feel* something. Used sparingly, at the peak and the
ending (Peak–End), where delight earns its place.

- **Where:** hero headlines, marketing sections, onboarding welcome, the celebratory
  success state, a launch `Banner`, deck title slides.
- **Tone:** confident, warm, a little poetic — but **always understandable**.
- **Rules:**
  - Earn the abstraction. A bold line must be backed by a plain one beneath.
  - Concrete imagery over adjective piles. "Glass and restraint" beats "a beautiful,
    elegant, premium experience".
  - Rhythm matters — read it aloud. Short. Then a longer breath. Then short.
  - Never sacrifice clarity for cleverness. If a reader has to decode it, rewrite it.
- **Examples:**
  - `Interfaces with depth, material, and craft.` (hero) + plain subline beneath
  - `That's a wrap. Your project is live.` (success peak)
  - `Built to feel, not just to work.` (section header) + supporting copy
  - Anti-example: `Synergised experiential paradigms` — obscure → cut.

### 3. Technical — precise, unambiguous, trustworthy

The voice of documentation, developer-facing surfaces, data, and anything where being
*exactly right* matters more than being warm.

- **Where:** docs, API/prop references, code comments, error details, data labels, chart
  axes, changelogs, `CodeBlock`/`DescriptionList`/`Table` content, settings descriptions.
- **Tone:** exact, neutral, complete. Still plain — precise is not the same as jargon-heavy.
- **Rules:**
  - Name things by their real name. No marketing gloss on a spec.
  - Be exhaustive where it counts: required vs optional, defaults, units, ranges, side effects.
  - Prefer the specific number to the vague claim: "responds in <400ms", "8-slot palette".
  - Errors: say what happened, why, and the fix — in that order.
- **Examples:**
  - `--accent must satisfy L 0.55–0.72, C 0.12–0.24.`
  - `Build failed at compilation step. Missing import on line 12 — add it and retry.`
  - `size — diameter in px. Default 120.`

---

## The Iconic Line (Aqus's signature device)

A short, declarative brand line built around the identity. Use it where the brand needs
a single memorable beat — hero, section intro, deck divider, launch moment.

**Construction:** a terse phrase paired with the liquid mark / wordmark, set in the display face.

- **Keep it lowercase** — reads personal and quiet, not shouty.
- **Three flavours:**
  - *intentive:* "pick up where you left off" · "everything in one place"
  - *creative:* "design that breathes" · "depth you can feel"
  - *technical:* "tokens, not guesswork" · "one accent, derived"
- **Don'ts:**
  - Don't build it out of the wordmark itself.
  - No tech jargon, model numbers, or version strings in a creative iconic line.
  - Don't stack or fragment it; one clean line, horizontal.
  - Don't pile sub-brands or feature names into it.

---

## Universal rules (all registers)

- **Casing:** sentence case everywhere — UI, headings, iconic lines. UPPERCASE only for
  small eyebrow labels and table headers, with wide tracking. Never Title Case A Whole Sentence.
- **Person & tense:** second person, present tense, active voice. "You're all set," not
  "The user has been set up."
- **Length:** ruthless. Button ≤ 3 words. Headline ≤ 8. Empty-state title ≤ 5,
  description ≤ 20. Tooltip one line. Cut, then cut again.
- **No fluff words:** delete *just, simply, easily, actually, really, very, please note,
  in order to, seamless, robust, powerful, leverage, unlock, elevate, supercharge.*
- **No hype, no exclamation pile-ons.** At most one "!" and only at a true peak.
- **Honesty over spin.** Name the failure ("Build failed"), don't bury it
  ("Something went a little sideways!").
- **No emoji in chrome or product UI.** Allowed only if the *content itself* is casual/social.
- **Numbers concrete, claims specific.** "3 files ready", "under 400ms", "12 components"
  — not "several", "fast", "many".
- **Consistency of terms.** One name per concept. If it's a "project," never also a
  "workspace" or "board." Keep a tiny lexicon.
- **Accessibility is voice too.** Link text describes its destination ("View pricing",
  not "click here"); never rely on color words to carry meaning.

---

## Microcopy patterns (ready to reuse)

- **Buttons:** `verb + noun` — "Create project", "Invite teammate", "Save changes".
  Destructive: name the consequence — "Delete project", not "OK".
- **Empty states** (`EmptyState`): title = the situation in ≤5 words; description = the
  one next step in ≤20; action = the verb. "No projects yet" / "Create your first to get
  started." / **Create project**.
- **Errors** (`Alert`/`Banner`/inline): *what happened → why → fix.* "Couldn't send.
  You're offline. Reconnect and try again." Never just "Error" or a raw code.
- **Success** (`Toast`): confirm the specific thing. "Project created", "Invite sent" —
  not "Success!".
- **Loading** (`LoadingOverlay`/`Skeleton`): "Loading your workspace…", "Saving…".
  Present-continuous, ends in ellipsis.
- **Confirmations** (`Dialog`): question + plain stakes. "Delete this project? This can't
  be undone." Primary button restates the verb ("Delete project"), not "Yes".
- **Onboarding/first-run:** one warm creative line + one intentive next step.
- **Tooltips:** add information the UI can't show; never restate the label. ≤ one line.
- **Form labels & help:** label = the noun ("Email"); help = the constraint or why.

---

## Composition narrative — telling a story across a view

1. **One message per view.** State the single purpose up top; if you can't say the
   view's job in one line, the view is doing too much (Hick).
2. **Hierarchy of registers down the page.** *Creative* at the top (the hook),
   *intentive* through the body (the work), *technical* in the details (the proof).
3. **Lead with benefit, support with fact.** Headline says what the reader gets;
   subline says how it works. Never open with the mechanism.
4. **Rhythm and breathing room.** Vary sentence length. Copy density should match
   visual density: rich chrome can carry a creative line; dense data wants terse labels.
5. **Write the peak and the ending.** Most-polished copy goes on the win and the first
   impression. The middle stays quiet and clear (Peak–End).
6. **Decks & long-form:** one idea per slide/section; title carries the argument, body
   proves it. Technical appendices stay technical.

---

## Quick checklist (paste into a copy review)

- [ ] Right register: intentive default, creative only at peaks, technical for docs/data
- [ ] Second person, present tense, active voice
- [ ] Sentence case; UPPERCASE only for eyebrows/table headers
- [ ] Fluff words cut (`just`, `simply`, `seamless`, `powerful`, `leverage`…)
- [ ] Buttons `verb + noun` ≤3 words. Headlines ≤8. Empty-state title ≤5 / desc ≤20
- [ ] Errors say *what → why → fix*; successes name the specific thing
- [ ] Claims are concrete numbers, not vague ("under 400ms", not "fast")
- [ ] One term per concept; no jargon in creative copy
- [ ] No emoji in chrome; at most one "!", only at a true peak
- [ ] Creative/abstract lines backed by a plain supporting line
- [ ] Link text describes its destination; meaning never carried by color words
- [ ] View has one message; registers descend creative → intentive → technical
