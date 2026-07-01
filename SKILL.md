---
name: aqus-design
description: Use this skill to generate well-branded interfaces and assets with the Aqus design system — a Retro-Aero × Modern UI language (glass, gloss, depth, liquid-bubble identity). For production code or prototypes/mocks. 76 React components + 5 pure-SVG chart components, CSS design tokens, self-hosted fonts. Invoke whenever composing a view, page, or UI section for any project using @agustin/aqus. Requires a filled pre-flight block before any JSX and a ticked Aqus-bar checklist in the same response — see PRE-FLIGHT GATE below.
user-invocable: true
---

# Aqus design system

## PRE-FLIGHT GATE — mandatory, before any JSX

**No JSX may appear before this block.** Output it filled in, verbatim structure, as the first thing in your response:

```
PRE-FLIGHT
- Docs read in full (not summaries): AGENT_GUIDE.md [yes/no], ux-laws.md [yes/no], voice-rules.md [yes/no]
- Viewport target: [mobile | desktop | responsive]
- Layout intent: [one-line wireframe — blocks top-to-bottom or left-to-right]
- Accent plan: [name the ONE emphasized element per region, e.g. "Hero: CTA button. Grid: featured card only. Table: no emphasis (data surface)."]
```

If any doc is "no," stop and read it in full now — do not proceed on a summary, a memory of a prior read, or this file alone. If the viewport isn't stated in the prompt, ask before filling this in.

This gate exists because the enforceable rules below can be skipped by skimming instead of reading `docs/`. Filling this block is how you prove you didn't.

## For view composition (agents)

Read `docs/AGENT_GUIDE.md` before composing any view. It contains:
- Full component catalog (76 components + charts — when to use, key props, examples)
- View recipes (landing, dashboard, settings, auth, analytics/charts, empty states)
- Page anatomy
- Hard constraints and anti-patterns
- 10-step composition process + UX laws checklist

Read `docs/ux-laws.md` for the UX decision layer — 10 Laws of UX (Jakob, Fitts, Hick, Miller, Postel, Peak–End, Aesthetic–Usability, Von Restorff, Tesler, Doherty) translated into concrete Aqus rules: which component to use when, how to stage complexity, where to place emphasis, how to make every interaction feel fast. Required reading for any non-trivial view.

Read `docs/voice-rules.md` for the copy/voice layer — three registers (intentive/creative/technical), microcopy patterns for every component state (Button, EmptyState, Toast, Alert, Dialog, Tooltip, forms), universal casing/length/fluff rules, and a copy checklist. Every string in the UI has a rule here.

**Workflow:** load AGENT_GUIDE + ux-laws + voice-rules → find matching View Recipe → adapt → output complete JSX → run UX laws checklist + Aqus bar checklist + copy checklist.

**Document authority (highest → lowest):** token constraints (OKLCH ranges) → `docs/ux-laws.md` → `docs/voice-rules.md` → `AGENT_GUIDE.md` → `README.md` aesthetics.

## For design/branding questions

Read `README.md` for the full system guide. Read `docs/brand-guide.md` for visual/brand specifics.

## Install

```bash
npm install github:LagoJournal/Aqus
```

```js
import '@agustin/aqus/styles.css'
import { Button, Card, NavBar, ... } from '@agustin/aqus'
```

## Library at a glance (76 components + charts)

- **core** — Button, IconButton, GlassPanel, Card, Badge, Tag, Input, Switch, SegmentedControl, ToggleGroup, Spinner, LiquidBubble, Kbd
- **forms** — Checkbox, Radio, Select, Combobox, MultiSelect, Textarea, Slider, NumberInput, DatePicker, ColorPicker, OTPInput, SearchInput, FileDropzone
- **feedback** — Alert, Banner, Progress, ProgressCircle, Skeleton, LoadingOverlay, Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette
- **navigation** — Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper
- **data** — Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList
- **layout** — Container, Stack, Section, Prose, PageHeader, HeroSection, NavBar, Footer
- **content** — StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard, NotificationItem, Carousel
- **brand** — Monogram, Wordmark
- **charts** — BarChart, LineChart, DonutChart, Sparkline, ChartLegend · pure SVG, no deps · tooltips portal to body

## Non-negotiables

*Inlined here, not just in `docs/`, so they survive even if a doc got skipped.*

1. **One accent** — override all 9 `--accent-*` tokens + `--accent-h` in `:root`. L 0.55–0.72, C 0.12–0.24. No second brand color. No hex literals.
2. **Glass = structural chrome only** — `GlassPanel`, `NavBar`, `Dialog`, `Drawer`. `Card` uses flat `var(--surface)`. Never glass on content panels.
3. **Round = LiquidBubble** — never `border-radius: 50%`. Every circular/blob element is `<LiquidBubble>`.
4. **Tokens, not literals** — `var(--space-4)`, `var(--accent)`. Never `16px`, `#3b82f6`, or theme-specific aliases (`--cream`, `--navy-deep`).
5. **Theme-adaptive** — use semantic aliases (`--bg`, `--surface`, `--text`, `--border`) so dark mode always works. Hardcoding a light-mode-only token is a bug.
6. **Compose from primitives; never rebuild library components** — if `Button`, `Input`, `Select`, `Dialog`, or any catalog component exists, import it. A custom rebuild in a view is always wrong.
7. **Liquid changes shape, never behavior** — the morph animation is decoration. Interaction outcomes must not depend on morph state.
8. **One emphasis per region, and one featured card per grid** — one accent/bold element per card or section (color + icon or weight; color alone doesn't count). In a card grid, at most one card is "featured" — the rest stay flat.
9. **All four states designed** — empty, loading, error, and success must all exist for any view that fetches or submits data. A view with only the success state is incomplete.
10. **One primary action per view** — exactly one `variant="primary"` Button per screen (dialogs get their own primary). Everything else is `secondary`/`ghost`.
11. **Feedback < 400ms** — every user action shows immediate visible response. Latency ≥ 400ms requires Skeleton or optimistic UI.
12. **Right, content-appropriate register** — intentive by default, creative at peaks (hero/success/testimonials — person-facing moments), technical for docs/data/tables (exact numbers, no gloss). Never creative register on errors or destructive confirmations; never technical/dry copy on a person-facing empty state.

## Rules

- **Chart colors derive from accent** — set `--accent-h` to the accent hue. Slots 2–8 auto-space at 45° via CSS `calc()`. Never hardcode chart hues.
- **Mobile-first flag required** — before planning any view, confirm viewport target (mobile / desktop / responsive). If not stated in the prompt, ASK before writing any JSX.
- **Plan layout before coding** — wireframe blocks → spacing rhythm → visual hierarchy → fill with components. No fixed pixel column widths. Use `minmax(0, 1fr)` for explicit N-col; for auto-fit grids the min-track **must** be capped: `repeat(auto-fit, minmax(min(100%, N), 1fr))` — a bare `minmax(Npx, 1fr)` overflows every phone narrower than N. Add `wrap` to every `Stack direction="row"` with 3+ items, and never put `nowrap` chips/Badges in a flex row.
- **Eye rules** — one dominant element per surface (size → weight → colour → position). Equal-height cards in a grid; action buttons go *inside* the card pinned to the bottom, never as a sibling below. `minWidth: 0` on text children to stop overflow slivers. See AGENT_GUIDE "Layout & visual composition".
- **UX laws** — one primary action per view (Hick); content chunked 5–9 (Miller); targets ≥ 44px spaced ≥ 8px (Fitts); all four states designed: empty/loading/error/success (Postel); delight at peak and end only (Peak–End); one emphasized element per region (Von Restorff); visible feedback < 400ms (Doherty). Full rules: `docs/ux-laws.md`.
- **Z-index** — floating layer (menus, selects, tooltips, popovers) is z 600, above the modal tier (Dialog/Drawer 500); the library handles this, don't hand-lower it.
- **Icons:** Phosphor (`<i class="ph ph-<name>">`) — no emoji in chrome.
- **Motion:** physics-based springs. Data surfaces: micro-interactions only.
- **Copy & voice** — intentive register by default (verb-led, plain); creative only at peaks (hero/success), backed by a plain line; technical for docs/data (exact numbers, no gloss). Buttons `verb + noun` ≤3 words. Errors: *what → why → fix*. No fluff (`just/simply/seamless/powerful`). Sentence case. No emoji in chrome. Full rules: `docs/voice-rules.md`.

## The Aqus bar — ship gate

**Mandatory, same response as the JSX.** Output without this checklist, pasted and ticked, is non-compliant — do not treat the JSX alone as done.

```
AQUS BAR
- Brand:       [✓/✗] tokens not literals  [✓/✗] theme-adaptive  [✓/✗] glass = chrome  [✓/✗] round = LiquidBubble  [✓/✗] one accent  [✓/✗] liquid = shape only  [✓/✗] one emphasis per region
- Interaction: [✓/✗] mobile-first  [✓/✗] no horizontal scroll at 320px  [✓/✗] no rebuilt components  [✓/✗] one primary Button  [✓/✗] targets ≥ 44px  [✓/✗] all 4 states covered  [✓/✗] feedback < 400ms
- Voice:       [✓/✗] right register  [✓/✗] sentence case  [✓/✗] fluff cut  [✓/✗] buttons verb+noun  [✓/✗] errors what→why→fix
- A11y:        [✓/✗] focus ring visible  [✓/✗] destructive named by consequence  [✓/✗] Dialog has label  [✓/✗] color never sole signal
```

Any `✗` means fix it before ending the response, not after. Full checklist detail in `docs/AGENT_GUIDE.md` → "The Aqus bar".

## Worked example — compliant turn

Prompt: "Build a settings page, mobile-first."

```
PRE-FLIGHT
- Docs read in full (not summaries): AGENT_GUIDE.md yes, ux-laws.md yes, voice-rules.md yes
- Viewport target: mobile-first, responsive to desktop
- Layout intent: stacked Cards top-to-bottom (Profile → Preferences → Danger zone), each full-width
- Accent plan: Profile card's "Save" button is the one primary accent per region; Danger zone's destructive Button uses --danger, not --accent (not a second brand color — a semantic status color)
```

*(JSX for the settings page — `Section` > `Container` > `Stack` of `Card`s, `Input`/`Select`/`Switch` from the forms catalog, one `variant="primary"` `Button` per card, empty/loading/error/success states handled via `Skeleton` + `Alert` — goes here.)*

```
AQUS BAR
- Brand:       ✓ tokens not literals  ✓ theme-adaptive  ✓ glass = chrome (none used, flat Cards)  ✓ round = LiquidBubble  ✓ one accent  ✓ liquid = shape only  ✓ one emphasis per region
- Interaction: ✓ mobile-first  ✓ no horizontal scroll at 320px  ✓ no rebuilt components  ✓ one primary Button  ✓ targets ≥ 44px  ✓ all 4 states covered  ✓ feedback < 400ms
- Voice:       ✓ right register (intentive)  ✓ sentence case  ✓ fluff cut  ✓ buttons verb+noun ("Save profile")  ✓ errors what→why→fix
- A11y:        ✓ focus ring visible  ✓ destructive named by consequence ("Delete account")  ✓ Dialog has label  ✓ color never sole signal
```
