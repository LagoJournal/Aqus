---
name: aqus-design
description: Use this skill to generate well-branded interfaces and assets with the Aqus design system — a Retro-Aero × Modern UI language (glass, gloss, depth, liquid-bubble identity). For production code or prototypes/mocks. 76 React components + 5 pure-SVG chart components, CSS design tokens, self-hosted fonts. Invoke whenever composing a view, page, or UI section for any project using @agustin/aqus.
user-invocable: true
---

# Aqus design system

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
npm install github:LagoJournal/aqus#v0.2.0
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

## 10 Non-negotiables

1. **One accent** — override all 9 `--accent-*` tokens + `--accent-h` in `:root`. L 0.55–0.72, C 0.12–0.24. No second brand color. No hex literals.
2. **Glass = structural chrome only** — `GlassPanel`, `NavBar`, `Dialog`, `Drawer`. `Card` uses flat `var(--surface)`. Never glass on content panels.
3. **Round = LiquidBubble** — never `border-radius: 50%`. Every circular/blob element is `<LiquidBubble>`.
4. **Tokens, not literals** — `var(--space-4)`, `var(--accent)`. Never `16px`, `#3b82f6`, or theme-specific aliases (`--cream`, `--navy-deep`).
5. **Theme-adaptive** — use semantic aliases (`--bg`, `--surface`, `--text`, `--border`) so dark mode always works. Hardcoding a light-mode-only token is a bug.
6. **Compose from primitives; never rebuild library components** — if `Button`, `Input`, `Select`, `Dialog`, or any catalog component exists, import it. A custom rebuild in a view is always wrong.
7. **Liquid changes shape, never behavior** — the morph animation is decoration. Interaction outcomes must not depend on morph state.
8. **One emphasis per region** — one accent/bold element per card or section. Emphasis = color + icon or weight. Color alone doesn't count.
9. **Feedback < 400ms** — every user action shows immediate visible response. Latency ≥ 400ms requires Skeleton or optimistic UI.
10. **Right register** — intentive by default, creative at peaks (hero/success), technical for docs/data. Never creative register on errors or destructive confirmations.

## Rules

- **Chart colors derive from accent** — set `--accent-h` to the accent hue. Slots 2–8 auto-space at 45° via CSS `calc()`. Never hardcode chart hues.
- **Mobile-first flag required** — before planning any view, confirm viewport target (mobile / desktop / responsive). If not stated in the prompt, ASK before writing any JSX.
- **Plan layout before coding** — wireframe blocks → spacing rhythm → visual hierarchy → fill with components. No fixed pixel column widths. Use `minmax(0, 1fr)` and `auto-fit`. Add `wrap` to every `Stack direction="row"` with 3+ items.
- **Eye rules** — one dominant element per surface (size → weight → colour → position). Equal-height cards in a grid; action buttons go *inside* the card pinned to the bottom, never as a sibling below. `minWidth: 0` on text children to stop overflow slivers. See AGENT_GUIDE "Layout & visual composition".
- **UX laws** — one primary action per view (Hick); content chunked 5–9 (Miller); targets ≥ 44px spaced ≥ 8px (Fitts); all four states designed: empty/loading/error/success (Postel); delight at peak and end only (Peak–End); one emphasized element per region (Von Restorff); visible feedback < 400ms (Doherty). Full rules: `docs/ux-laws.md`.
- **Z-index** — floating layer (menus, selects, tooltips, popovers) is z 600, above the modal tier (Dialog/Drawer 500); the library handles this, don't hand-lower it.
- **Icons:** Phosphor (`<i class="ph ph-<name>">`) — no emoji in chrome.
- **Motion:** physics-based springs. Data surfaces: micro-interactions only.
- **Copy & voice** — intentive register by default (verb-led, plain); creative only at peaks (hero/success), backed by a plain line; technical for docs/data (exact numbers, no gloss). Buttons `verb + noun` ≤3 words. Errors: *what → why → fix*. No fluff (`just/simply/seamless/powerful`). Sentence case. No emoji in chrome. Full rules: `docs/voice-rules.md`.

## The Aqus bar — ship gate

Run before committing any view:
- **Brand:** tokens not literals · theme-adaptive · glass = chrome · round = LiquidBubble · one accent · liquid = shape only · one emphasis per region
- **Interaction:** mobile-first · no rebuilt components · one primary Button · targets ≥ 44px · all 4 states covered · feedback < 400ms
- **Voice:** right register · sentence case · fluff cut · buttons `verb + noun` · errors `what → why → fix`
- **A11y:** focus ring visible · destructive named by consequence · Dialog has label · color never sole signal

Full checklist in `docs/AGENT_GUIDE.md` → "The Aqus bar".
