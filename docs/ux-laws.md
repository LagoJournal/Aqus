# Aqus — UX Laws & Composition Rules

> How to **use the Aqus components** and **compose views** with them. This is the
> decision layer that sits on top of the visual system (see `readme.md` for tokens,
> materials, and the liquid identity). Where `readme.md` says *what things look like*,
> this says *when to use what, and how to lay it out*.
>
> Grounded in the ten **Laws of UX** (Jon Yablonski) — each definition below is quoted
> from the source and translated into concrete, enforceable rules for this library.
> Read it as a senior product designer's brief: opinionated, specific, and tied to
> real components.

---

## How to read this document

Each law has: the **principle** (verbatim), **what it means for Aqus**, and **rules**
(do/don't, tied to specific components and tokens). The liquid identity is never
decoration for its own sake — every rule below keeps it in service of usability.

The non-negotiables, up front:

1. **Convention over novelty.** The liquid identity lives in *shape, motion, and
   material* — never in *behavior*. A toggle still toggles, a tab still tabs. Be
   visually distinctive, behaviorally ordinary.
2. **One accent per surface.** Emphasis is a scarce resource; spend it on a single
   primary action or highlight per view.
3. **Reduce, then absorb.** Cut every choice you can; for the complexity that's left,
   make the *system* carry it, not the user.
4. **Speed is a feature.** Sub-400ms perceived response, always — with liquid
   feedback covering anything slower.

---

## 1. Jakob's Law — match the mental model

> *"Users spend most of their time on other sites, and they prefer your site to work
> the same way as all the other sites they already know."*

**For Aqus:** our shapes are unusual; our *patterns* must not be. The liquid bubble is
a fresh skin on a familiar skeleton. Users should never have to *learn* an Aqus
interface — only enjoy it.

**Rules**
- Place expected elements where users expect them: primary nav top (`NavBar`) or left
  (sidebar), search top-right or via `CommandPalette` (⌘K), primary action top-right of
  a `PageHeader`, destructive actions away from primary ones.
- Use components for their conventional job. `Switch` = instant on/off setting.
  `Checkbox` = multi-select or consent. `Radio`/`SegmentedControl` = one-of-few.
  `ToggleGroup` = toolbar/formatting. Never repurpose one for another's job because the
  shape "looks nicer."
- A liquid bubble may **replace a circle's pixels, never its meaning.** A spinner still
  means "wait," a status dot still means "status," a knob still slides.
- Standard affordances stay standard: links are underlined or accent-colored, inputs
  look inset and editable, disabled = reduced opacity + `not-allowed`.
- When introducing a genuinely new interaction, anchor it to a familiar one (label it,
  give it an icon, mirror a known gesture).

---

## 2. Fitts's Law — targets big, close, and spaced

> *"The time to acquire a target is a function of the distance to and size of the target."*

**For Aqus:** the organic blob shapes can look smaller than their hit area — so size
generously and never shrink a control below the comfortable minimum.

**Rules**
- **Minimum hit target 44×44px** on touch (`IconButton size="md"` = 38px visual but
  pad to 44 on touch surfaces; use `lg` for primary touch actions). Never `sm` icon
  buttons as the *only* way to do something important.
- Primary actions get the largest, most reachable target: `Button size="lg"`, full
  width on mobile, anchored bottom or top-right where the thumb/cursor rests.
- **Space interactive siblings** — use `Stack` gap ≥ 2 (`8px`) between adjacent
  buttons/tags/list rows so users don't mis-tap. Liquid bubbles in a row
  (`Pagination`, dots) keep ≥ 8px between centers.
- Put recurring actions at screen edges and corners (infinite-depth targets):
  sticky `NavBar`, bottom action bars, corner FABs.
- Don't place a destructive action immediately adjacent to a common one; separate with
  a `Divider` or distance.

---

## 3. Hick's Law — fewer choices, staged

> *"The time it takes to make a decision increases with the number and complexity of
> choices available."*

**For Aqus:** glass and depth already add visual richness — so the *number of choices*
must stay lean or the surface feels heavy.

**Rules**
- **One primary action per view.** Everything else is `secondary`/`ghost`. If two
  things look equally important, you've failed this law — demote one.
- Break long flows into steps with `Stepper`; never show a 20-field form on one screen.
- Long option lists → `Combobox`/`MultiSelect` (type to filter) instead of a wall of
  radios. Over ~7 options, switch from `Radio`/`SegmentedControl` to `Select`/`Combobox`.
- Use progressive disclosure: `Accordion`, `Popover`, `Drawer`, "Advanced" sections —
  hide the rarely-needed until asked.
- Highlight a recommended path (one accent `Button`, a "Most popular" `Badge`) to
  shortcut the decision — but don't oversimplify to abstraction (Tesler).
- Menus (`Menu`, `ContextMenu`) group related items and separate groups; cap visible
  items, nest the rest.

---

## 4. Miller's Law — chunk into 5–9

> *"The average person can keep only 7 (±2) items in their working memory."*

**For Aqus:** chunking is *literally* how the library is built (component groups,
`DescriptionList`, grouped `Menu`) — apply the same to every view you compose.

**Rules**
- Group related fields/items into chunks of **5–9**: `FormSection`-style grouping,
  `DescriptionList` columns, `Accordion` sections, `Card`-bounded clusters.
- Format long data for memory: phone/card/code split into groups (`OTPInput` already
  chunks digits into discrete liquid cells).
- Use `Divider`, whitespace (`Stack` gaps), and `Card` boundaries to make chunk edges
  obvious — the **Law of Common Region**: a shared background/border groups items.
- Navigation: cap top-level `Tabs`/nav items around 5–7; overflow into a "More" `Menu`.
- Don't invoke "7 items" as an excuse to amputate necessary content — chunk it, don't
  cut it.

---

## 5. Postel's Law — strict output, generous input

> *"Be conservative in what you do, be liberal in what you accept from others."*

**For Aqus:** the interface should feel forgiving and resilient — failures handled with
calm liquid feedback, never a hard wall.

**Rules**
- Accept messy input and normalize it: `Input`/`NumberInput`/`OTPInput` should trim,
  parse, and accept paste in any reasonable format; `SearchInput` is case/space
  tolerant; `FileDropzone` accepts drop *and* click *and* paste.
- Validate kindly: inline `Input error=""` with a specific fix, not a scolding modal.
  Validate on blur/submit, not on every keystroke.
- Always design the **empty, loading, error, and partial** states — `EmptyState`,
  `Skeleton`/`LoadingOverlay`, `Alert`/`Banner`, `Toast`. A view isn't done until all
  four exist.
- Give clear, recoverable feedback: confirm success (`Toast` success), allow undo where
  possible, never lose user input on error.
- Be tolerant of capability: keyboard-navigable, reduced-motion respected, color never
  the *only* signal (pair with icon/text — see Von Restorff).

---

## 6. Peak–End Rule — design the peak and the end

> *"People judge an experience largely based on how they felt at its peak … and at its
> end, rather than the total sum or average of every moment."*

**For Aqus:** this is where the liquid identity earns its keep — concentrate delight at
the **peak moments and the final beat**, keep the middle calm.

**Rules**
- Identify the peak of each flow (the win: payment success, project created, message
  sent) and make it shine: an accent `Button pulse`, a satisfying liquid morph, a
  celebratory `EmptyState`→filled transition, a glass success `Toast`.
- Design endings deliberately: confirmation screens, success states, and the last
  card in a flow get the most polish and a clear "what's next."
- Soften low points: turn errors and waits into graceful moments —
  `LoadingOverlay` with the liquid spinner, a friendly `EmptyState` blob instead of a
  blank void, an `Alert` that offers a fix.
- **Don't spread delight evenly** — ambient animation everywhere flattens the peak and
  raises cognitive load. The middle of a flow should be quiet so the peak reads.

---

## 7. Aesthetic–Usability Effect — beauty buys trust, not a pass

> *"Users often perceive aesthetically pleasing design as design that's more usable."*

**For Aqus:** our craft (glass, gloss, liquid motion) creates goodwill and masks minor
friction — a real advantage, and a real trap.

**Rules**
- Hold the visual bar everywhere: correct tokens, real elevation, aligned grids,
  consistent radii, gloss only on chrome. Sloppiness here costs perceived usability
  disproportionately.
- **Never let beauty hide a broken flow.** The goodwill is a buffer for *minor*
  issues, not a substitute for working interactions. Usability-test past the polish.
- Keep aesthetic richness on *chrome* (`NavBar`, `Card`, `HeroSection`, glass overlays)
  and restraint on *content* (tables, forms, body text) so beauty enhances rather than
  competes with the task.
- Polished feedback (smooth transitions, liquid spinners, glass tooltips) raises
  perceived quality — use it, but keep it fast (Doherty) and purposeful.

---

## 8. Von Restorff Effect — make the one thing stand out

> *"When multiple similar objects are present, the one that differs from the rest is
> most likely to be remembered."*

**For Aqus:** emphasis only works by contrast. If everything is glossy and accented,
nothing is salient.

**Rules**
- **One emphasized element per region.** The primary `Button` is solid accent;
  everything around it is `secondary`/`ghost`/neutral. The `Card variant="featured"`
  is the *one* featured card, not every card.
- Use the accent sparingly and intentionally: a single CTA, the active nav item
  (liquid bubble marker), the current step, the recommended plan.
- Never rely on color alone (accessibility): pair accent emphasis with weight, size,
  icon, or label. Status `Badge`s carry a dot *and* text. Errors carry an icon *and*
  color *and* message.
- Don't let emphasis look like an ad — restrained, integrated emphasis (a glow, a fill,
  a liquid marker), not a flashing banner.
- Reserve the strongest material treatments (pulse glow, morphing blob, accent glass)
  for genuinely important moments, so they keep their power.

---

## 9. Tesler's Law — absorb the irreducible complexity

> *"For any system there is a certain amount of complexity that cannot be reduced."*

**For Aqus:** after Hick's cuts, real complexity remains. Make the **system** swallow
it, not the user.

**Rules**
- Push complexity into the components and defaults: smart defaults, autofill,
  pre-selected recommended options, inferred values, format-on-paste (`OTPInput`,
  `NumberInput`), `valueFormat` on charts so users never hand-format numbers.
- Let the system do the work: `Combobox` filters for the user, `Table` sorts for them,
  `CommandPalette` finds things so they don't navigate, `FileDropzone` handles parsing.
- Don't over-simplify into abstraction (the failure mode Hick + Tesler both warn of):
  hiding a *necessary* control to look clean just moves the burden onto a confused user.
  Keep essential controls visible; hide only the genuinely advanced.
- When complexity must surface, stage it (`Stepper`, `Accordion`, `Drawer`) and explain
  it (helper text, `Tooltip`, inline `Alert`).

---

## 10. Doherty Threshold — keep it under 400ms

> *"Productivity soars when a computer and its users interact at a pace (<400ms) such
> that neither has to wait on the other."*

**For Aqus:** perceived speed is part of the brand. The liquid identity is the
*feedback layer* that keeps the system feeling instant.

**Rules**
- **Respond within 400ms** — visibly. Every action gets immediate feedback: button
  press scale, hover lift, `Toast`, optimistic UI updates.
- Cover real latency with branded feedback: `Spinner`/`LoadingOverlay` (liquid),
  `Skeleton` shimmer for content, `ProgressCircle`/`Progress` for known durations.
  Show a skeleton *immediately*, not after a blank pause.
- Keep motion snappy: micro 100ms, UI 240ms, page 380ms (all under the threshold).
  Ambient/decorative loops (blob morph) run slow and are *non-blocking* — they never
  gate interaction.
- Prefer optimistic updates + rollback over spinners where safe (sending a message,
  toggling a setting) so the interaction feels zero-latency.
- Don't let beauty cost speed: a 600ms "elegant" transition that delays the user
  violates this law. Fast first, pretty second.

---

## View composition — putting it together

A repeatable recipe that satisfies the laws above when composing any screen:

1. **Scaffold with layout primitives.** `Container` (max-width) → `Section` (vertical
   rhythm) → `Stack`/grid (gaps). Consistent spacing tokens throughout. *(Jakob, Miller)*
2. **One page intent per view.** Lead with `PageHeader` or `HeroSection` stating the
   single primary purpose; one primary action. *(Hick, Von Restorff)*
3. **Chunk the body.** Group into `Card`-bounded clusters or `Section`s of 5–9 related
   items; label each chunk. *(Miller, Common Region)*
4. **Establish one focal point.** A single emphasized element per region — primary CTA,
   featured card, active state. Everything else recedes. *(Von Restorff)*
5. **Stage complexity.** Multi-step → `Stepper`; secondary detail → `Accordion`/
   `Drawer`/`Popover`; long lists → filtered `Combobox`/`Table`. *(Hick, Tesler)*
6. **Cover every state.** Design empty (`EmptyState`), loading (`Skeleton`/
   `LoadingOverlay`), error (`Alert`/`Banner`), and success (`Toast`) before shipping.
   *(Postel, Doherty)*
7. **Place the delight at the peak and the end.** Reserve pulse/glow/morph for the win
   and the final confirmation; keep the middle calm. *(Peak–End)*
8. **Verify conventions & reach.** Expected elements in expected places; targets ≥44px,
   well spaced; sub-400ms feedback on every action. *(Jakob, Fitts, Doherty)*
9. **Test at 320px.** Render the finished view at a 320px-wide viewport — the narrowest
   common phone — and confirm **zero horizontal scroll**. This is where overflow bugs
   surface. *(Jakob, Fitts)*

> **A grid's min track must never exceed its container.** `minmax(280px, 1fr)` overflows
> any viewport narrower than 280px + padding — i.e. every small phone. **Always** cap it:
> `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`. Likewise, never place `nowrap` chips
> or Badges in a flex row without `flex-wrap` — a single long label forces horizontal
> scroll. These two patterns cause the majority of mobile overflow.

### Density & rhythm
- **Chrome is rich, content is calm.** Glass, gloss, and liquid motion on nav/cards/
  hero/overlays; flat clarity on tables, forms, and body text.
- **Liquid sparingly on data.** Charts and dense data use the identity only as chrome
  (end-markers, ring, legend swatches, tooltips) — never as every data point.
- **Whitespace is structure.** Use `Stack`/`Section` gaps to create the chunk
  boundaries Miller and Common Region rely on; don't crowd.

### Accessibility (cross-cutting)
- Color is never the only signal — pair with icon, text, weight, or shape.
- Everything keyboard-reachable; visible `focus-ring` on every interactive element.
- Respect `prefers-reduced-motion`: morph/pulse animations degrade to static.
- Maintain token contrast (text ΔL ≥ 0.78 AAA, muted ≥ 0.53 AA); accent within the
  L 0.55–0.72 / C 0.12–0.24 constraints.

---

## Quick checklist (paste into a PR / design review)

- [ ] Conventional patterns; liquid shapes don't change behavior *(Jakob)*
- [ ] Targets ≥ 44px, spaced, primary action reachable *(Fitts)*
- [ ] One primary action; choices minimized/staged *(Hick)*
- [ ] Content chunked into 5–9, grouped with region cues *(Miller)*
- [ ] Forgiving input; empty/loading/error/success all designed *(Postel)*
- [ ] Delight concentrated at the peak and the ending *(Peak–End)*
- [ ] Visual bar held everywhere; beauty doesn't hide broken flows *(Aesthetic–Usability)*
- [ ] Exactly one emphasized element per region; emphasis not color-only *(Von Restorff)*
- [ ] Irreducible complexity absorbed by the system, not the user *(Tesler)*
- [ ] Visible feedback < 400ms; motion snappy; latency covered by liquid feedback *(Doherty)*
- [ ] No horizontal scroll at 320px; every `minmax` min-track is `min(100%, N)`; chip/Badge rows wrap *(mobile overflow)*
