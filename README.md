# Aqus

Retro-Aero × Modern React component library. 76 components + 5 pure-SVG charts, full TypeScript types, OKLCH design tokens, self-hosted fonts.

**Designed to be used with the Aqus Claude agent** — a trained skill that knows every component, UX law, and brand rule. Install the package, run `npx aqus init`, and the agent configures everything and builds views for you.

**Aesthetic:** 50/50 Aqua-era depth × modern restraint. Glass and gloss on structural chrome (nav, modals, drawers); flat and clean everywhere else. Signature element: the liquid bubble — every circular element is a slowly-morphing organic shape, never a perfect circle.

---

## Install

```bash
npm install github:LagoJournal/aqus
npx aqus init
```

`init` does everything in one interactive prompt:
- Picks your accent color (10 presets or custom H / C / L)
- Writes `aqus.css` with all 9 tokens derived for light and dark mode
- Injects `@agustin/aqus/styles.css` import into your entry point (auto-detected)
- Installs the Aqus design agent for Claude Code (if present)

---

## The design agent

Once installed (`npx aqus init` or `npx aqus agent install`), the agent skill activates in Claude Code as `/aqus-design`. It knows:

- Every component — when to use it, what props it takes, what it looks like
- 10 UX laws translated into concrete component rules (Fitts, Hick, Miller, Doherty…)
- Brand rules — glass only on chrome, liquid shape ≠ liquid behavior, one accent
- Voice system — three registers, microcopy patterns, copy checklist

**Workflow:** describe the UI you want → the agent reads the docs, picks a view recipe, composes complete JSX, and runs the Aqus bar checklist before handing it to you.

Agent docs: [`docs/AGENT_GUIDE.md`](docs/AGENT_GUIDE.md) · [`docs/ux-laws.md`](docs/ux-laws.md) · [`docs/voice-rules.md`](docs/voice-rules.md)

---

## Manual setup

If you prefer not to use the CLI:

### 1. Import global CSS

Once, at your app root:

```js
import '@agustin/aqus/styles.css'
```

### 2. Set your accent

`npx aqus init` writes this automatically. To do it manually, add to your root CSS:

```css
:root {
  /* One hue drives all 9 tokens. Constraints: L 0.55–0.72, C 0.12–0.24. */
  --accent-h:      265;
  --accent:        oklch(0.60 0.21 265);
  --accent-hover:  oklch(0.54 0.23 265);
  --accent-light:  oklch(0.92 0.074 265);
  --accent-mid:    oklch(0.78 0.116 265);
  --accent-text:   oklch(0.25 0.053 265);
  --accent-glow:   oklch(0.60 0.21 265 / 0.25);
  --accent-glass:  oklch(0.60 0.21 265 / 0.12);
  --focus-ring:    oklch(0.60 0.25 265 / 0.80);
  --on-accent:     oklch(0.99 0.005 265);
}
```

The derivation formula and dark-mode variants are in [`src/tokens/ACCENT.md`](src/tokens/ACCENT.md).

### 3. Dark mode

```html
<html data-theme="dark">
```

### 4. Icons

Aqus uses [Phosphor Icons](https://phosphoricons.com/):

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
```

---

## Component library

76 components across 9 categories:

| Category | Components |
|----------|-----------|
| **core** | Button, IconButton, GlassPanel, Card, Badge, Tag, Input, Switch, SegmentedControl, ToggleGroup, Spinner, LiquidBubble, Kbd |
| **forms** | Checkbox, Radio, Select, Combobox, MultiSelect, Textarea, Slider, NumberInput, DatePicker, ColorPicker, OTPInput, SearchInput, FileDropzone |
| **feedback** | Alert, Banner, Progress, ProgressCircle, Skeleton, LoadingOverlay, Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette |
| **navigation** | Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper |
| **data** | Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList |
| **layout** | Container, Stack, Section, Prose, PageHeader, HeroSection, NavBar, Footer |
| **content** | StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard, NotificationItem, Carousel |
| **brand** | Monogram, Wordmark |
| **charts** | BarChart, LineChart, DonutChart, Sparkline, ChartLegend — pure SVG, no deps, accent-derived palette |

Full reference: [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md)

---

## Core rules

1. **One accent** — override all 9 `--accent-*` tokens + `--accent-h`. L 0.55–0.72, C 0.12–0.24. No hex.
2. **Glass = structural chrome only** — NavBar, Dialog, Drawer, GlassPanel. Content uses flat `var(--surface)`.
3. **Round = LiquidBubble** — never `border-radius: 50%`.
4. **Tokens, not literals** — `var(--space-4)`, `var(--accent)`. Never `16px` or `#3b82f6`.
5. **Theme-adaptive** — use `--bg`, `--surface`, `--text`, `--border`. Never light/dark-specific aliases.
6. **Compose from primitives** — `<Button>` not `<button>`. Never rebuild a library component in a view.
7. **Liquid = shape only** — the morph animation is decoration. Interaction never depends on morph state.
8. **One emphasis per region** — one accent element per card or section. Pair color with icon or weight.
9. **Feedback < 400ms** — every action needs immediate visible response.
10. **Right register** — intentive by default, creative at peaks only, technical for docs/data.

---

## Versioning

Components, docs, and the agent skill are versioned together. Pinning a tag gives you a matched set.

```bash
npm install github:LagoJournal/aqus           # latest
npm install github:LagoJournal/aqus#v0.2.0    # pinned
```

See [`CHANGELOG.md`](CHANGELOG.md) for what changed between versions.
