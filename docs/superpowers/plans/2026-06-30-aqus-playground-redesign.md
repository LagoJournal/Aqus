# Aqus Playground Mobile-First Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Aqus playground as a mobile-first, single-page showcase using only Aqus catalog components — brandbook, glass recipe, usage, filterable glossary, and three reimagined interactive examples (Dashboard, Journal, Profile).

**Architecture:** Single-page vertical scroll. `App.jsx` owns theme/accent/scroll-spy state and renders stock `NavBar` → ordered `Section`s → stock `Footer`. Each section is a focused file under `playground/src/sections/`; each example under `playground/src/examples/`. No new library components; everything composes from the catalog.

**Tech Stack:** React 18, Vite, `@agustin/aqus` (aliased to live `../src`). No test runner — the playground is visual, so each task's verification is **`cd playground && npm run build` exits clean** plus the stated behavioral checks. Commit after every task.

**Spec:** `docs/superpowers/specs/2026-06-30-aqus-playground-redesign-design.md`

**Global rules (apply in every task):**
- Grids: `repeat(auto-fit, minmax(min(100%, N), 1fr))` or `className="sc-split"` (collapses <820px). Never fixed-px columns.
- `Stack direction="row"` with 3+ children → add `wrap`.
- `minWidth: 0` on text-bearing flex/grid children; `whiteSpace: nowrap` on chips/deltas.
- Wrap any `Table` in `<div style={{ overflowX: 'auto' }}>`.
- Toasts portal to `document.body` at z 9999 (helper below). Never hand-set dropdown z.
- Sentence-case copy, Phosphor icons, no emoji, no second color, no `border-radius:50%`.

**Shared toast helper (copy into each example that needs it):**
```jsx
import ReactDOM from 'react-dom'
function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone }); setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}
// render: {t.show && ReactDOM.createPortal(
//   <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999 }}><Toast tone={t.tone} title={t.title} onClose={()=>{}} /></div>,
//   document.body)}
```

---

### Task 1: App shell, section order, remove dead files

**Files:**
- Modify: `playground/src/App.jsx`
- Delete: `playground/src/sections/DesignRules.jsx`, `playground/src/sections/Animations.jsx`, `playground/src/sections/Charts.jsx`, `playground/src/examples/StorefrontExample.jsx`

- [ ] **Step 1: Update imports + NAV_LINKS + section render in App.jsx**

Replace the section imports with the new set and wire the order. NAV_LINKS (6 max):
```jsx
import { Hero } from './sections/Hero.jsx'
import { Brandbook } from './sections/Brandbook.jsx'
import { Materials } from './sections/Materials.jsx'
import { Usage } from './sections/Usage.jsx'
import { Glossary } from './sections/Glossary.jsx'
import { Examples } from './sections/Examples.jsx'

const NAV_LINKS = [
  { href: '#overview',   label: 'Overview' },
  { href: '#brand',      label: 'Brand' },
  { href: '#materials',  label: 'Glass' },
  { href: '#usage',      label: 'Usage' },
  { href: '#glossary',   label: 'Components' },
  { href: '#examples',   label: 'Examples' },
]
```
Main render order:
```jsx
<main>
  <Hero onPrimary={() => scrollTo('usage')} onSecondary={() => scrollTo('glossary')} />
  <Brandbook />
  <Materials />
  <Usage />
  <Glossary />
  <Examples hue={hue} theme={theme} />
</main>
```
Keep the existing `accentTokens` (with `--accent-h`), theme effect, scroll-spy effect, and the NavBar action (accent `Popover` + theme toggle + GitHub). Update the Footer `Library` column links to drop `#animations`/`#charts` and to match the new anchors (`#overview`, `#brand`, `#materials`, `#usage`).

- [ ] **Step 2: Delete the four dead files**
```bash
git rm playground/src/sections/DesignRules.jsx playground/src/sections/Animations.jsx playground/src/sections/Charts.jsx playground/src/examples/StorefrontExample.jsx
```

- [ ] **Step 3: Verify build fails only on the not-yet-created Brandbook**
Run: `cd playground && npm run build`
Expected: fails resolving `./sections/Brandbook.jsx` (created in Task 2). This confirms wiring; proceed.

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "refactor(playground): new section order, remove DesignRules/Animations/Charts/Storefront"
```

---

### Task 2: Brandbook section (merges DesignRules + folded Motion)

**Files:**
- Create: `playground/src/sections/Brandbook.jsx`

Responsibility: the "guidelines + brandbook" core — accent system, type scale, voice/copy, the 8 hard rules, and one folded Motion demo. Anchor `id="brand"`, `className="anchor"`.

- [ ] **Step 1: Scaffold the section shell**
```jsx
import React from 'react'
import {
  Section, Container, Card, Stack, Badge, Divider, LiquidBubble, Button,
} from '@agustin/aqus'

const RULES = [
  { icon: 'ph-drop',            title: 'One accent',        body: 'Override the 9 --accent-* tokens + --accent-h. L 0.55–0.72, C 0.12–0.24. No second color, no hex.' },
  { icon: 'ph-stack',           title: 'Glass is structural', body: 'Blur and gloss on chrome only — NavBar, Dialog, Drawer, GlassPanel. Content stays flat.' },
  { icon: 'ph-circle-half',     title: 'Round = LiquidBubble', body: 'Every round element morphs. Never border-radius: 50%.' },
  { icon: 'ph-ruler',           title: 'Tokens, not literals', body: 'var(--space-4), var(--accent) — never 16px or #3b82f6. Depth is earned.' },
  { icon: 'ph-puzzle-piece',    title: 'Compose from primitives', body: 'Build from Button/Card/Input — never re-style raw HTML.' },
  { icon: 'ph-shapes',          title: 'Phosphor icons',    body: 'ph ph-<name> only. No emoji in chrome.' },
  { icon: 'ph-wind',            title: 'Physics motion',    body: 'Spring entrances, hover lift. Data surfaces: micro-interactions only.' },
  { icon: 'ph-text-aa',         title: 'Sentence case copy', body: 'Terse, honest, no hype. "New project" not "New Project".' },
]

const TYPE_SAMPLES = [
  { tok: '--text-display-lg', label: 'Display', sample: 'Aqus' },
  { tok: '--text-h1',         label: 'Heading 1', sample: 'Retro-Aero' },
  { tok: '--text-h3',         label: 'Heading 3', sample: 'Glass chrome' },
  { tok: '--text-body',       label: 'Body',      sample: 'Compose screens from the primitives.' },
  { tok: '--text-label',      label: 'Label',     sample: 'OKLCH TOKENS' },
]

export function Brandbook() {
  return (
    <Section id="brand" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Brandbook</p>
        <h2 className="sc-section-title">The system, in eight rules</h2>
        <p className="sc-section-lede">One accent, structural glass, liquid identity, tokens over literals. These constraints are what make every Aqus view feel like one product.</p>
        {/* blocks added in following steps */}
      </Container>
    </Section>
  )
}
```

- [ ] **Step 2: Add the hard-rules grid** (auto-fit, icon Card each) inside Container after the lede:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, marginBottom: 32 }}>
  {RULES.map((r) => (
    <Card key={r.title} variant="resting" style={{ padding: 18 }}>
      <Stack gap={2}>
        <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--accent-glass)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: 20 }}><i className={`ph ${r.icon}`} /></span>
        <strong style={{ fontSize: 'var(--text-body-sm)' }}>{r.title}</strong>
        <span className="sc-item-desc">{r.body}</span>
      </Stack>
    </Card>
  ))}
</div>
```

- [ ] **Step 3: Add accent + type + motion row** using `.sc-split` (collapses on mobile). Left = type scale card (map `TYPE_SAMPLES`, each line `style={{ fontSize: 'var(${tok})' }}` truncated with `whiteSpace:nowrap, overflow:hidden, textOverflow:ellipsis`). Right = stacked: an "Accent system" Card (note: 9 tokens from one hue, `--accent-h` drives chart slots at 45°; show 9 small swatches using `--accent`, `--accent-hover`, `--accent-light`, `--accent-mid`, `--accent-text`, `--accent-glow`, `--accent-glass`, `--focus-ring`, `--on-accent` as `<span>` chips) and a "Motion" Card with a live demo:
```jsx
<Card variant="resting" style={{ padding: 20 }}>
  <Stack gap={3}>
    <Stack direction="row" justify="space-between" align="center"><strong>Motion</strong><Badge tone="neutral" pill>springs</Badge></Stack>
    <Divider />
    <Stack direction="row" gap={3} align="center">
      <LiquidBubble size={40} variant="spinner" color="var(--accent)" />
      <LiquidBubble size={32} color="var(--accent)" />
      <LiquidBubble size={24} variant="outline" color="var(--accent-mid)" />
    </Stack>
    <span className="sc-item-desc">Physics-based springs on chrome; the liquid bubble slowly morphs. Data surfaces stay still.</span>
  </Stack>
</Card>
```

- [ ] **Step 4: Verify build clean**
Run: `cd playground && npm run build`
Expected: build succeeds; bundle emitted.

- [ ] **Step 5: Commit**
```bash
git add playground/src/sections/Brandbook.jsx && git commit -m "feat(playground): Brandbook section — rules, accent, type, folded motion"
```

---

### Task 3: Mobile-tune Materials (Glass recipe)

**Files:**
- Modify: `playground/src/sections/Materials.jsx`

- [ ] **Step 1: Audit grids/stage for overflow.** Ensure the glass stage wrapper is full-width with `min-width:0`; any two-column anatomy layout uses `className="sc-split"` or auto-fit; the level `SegmentedControl` row `wrap`s. Add a one-line note "NavBar uses the dense 48px blur" near the Dense level.

- [ ] **Step 2: Verify build clean**
Run: `cd playground && npm run build` → succeeds.

- [ ] **Step 3: Commit**
```bash
git add playground/src/sections/Materials.jsx && git commit -m "fix(playground): mobile-tune Materials glass section"
```

---

### Task 4: Usage — add --accent-h, mobile-tune

**Files:**
- Modify: `playground/src/sections/Usage.jsx`

- [ ] **Step 1: Add `--accent-h` to the ACCENT snippet** (top of the `:root` block) and bump the pinned install to the current tag:
```jsx
const ACCENT = `:root {
  /* One hue → nine tokens. --accent-h drives the chart palette. */
  --accent-h:      250;
  --accent:        oklch(0.65 0.20 250);
  --accent-hover:  oklch(0.59 0.22 250);
  --accent-light:  oklch(0.92 0.07 250);
  --accent-mid:    oklch(0.78 0.11 250);
  --accent-text:   oklch(0.25 0.05 250);
  --accent-glow:   oklch(0.65 0.20 250 / 0.25);
  --accent-glass:  oklch(0.65 0.20 250 / 0.12);
  --focus-ring:    oklch(0.65 0.24 250 / 0.80);
  --on-accent:     oklch(0.99 0.005 250);
}`
```
The `sc-grid-2` already collapses to one column under 640px — no other layout change needed.

- [ ] **Step 2: Verify build clean** → `cd playground && npm run build` succeeds.

- [ ] **Step 3: Commit**
```bash
git add playground/src/sections/Usage.jsx && git commit -m "fix(playground): Usage accent snippet adds --accent-h"
```

---

### Task 5: Glossary — Charts category + mobile filter

**Files:**
- Modify: `playground/src/sections/Glossary.jsx`

- [ ] **Step 1: Confirm the Charts category exists** (BarChart, LineChart, DonutChart, Sparkline live previews) and `filteredTotal` powers the `SearchInput` count. If a dedicated category filter control exists, ensure its row `wrap`s and is horizontal-scroll safe on mobile (wrap the control in `<div style={{ overflowX:'auto' }}>` if it is a `SegmentedControl` with many options). The preview grid already uses `sc-grid` (auto-fit) — verify `min()` is present.

- [ ] **Step 2: Add an empty state** when the search matches nothing:
```jsx
{visibleCount === 0 && (
  <EmptyState icon={<i className="ph ph-magnifying-glass" />} title="No components found" description={`Nothing matches "${query}".`} action={<Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button>} />
)}
```
Import `EmptyState`, `Button` if not already.

- [ ] **Step 3: Verify build clean** → `cd playground && npm run build` succeeds.

- [ ] **Step 4: Commit**
```bash
git add playground/src/sections/Glossary.jsx && git commit -m "feat(playground): Glossary charts category + empty state, mobile filter"
```

---

### Task 6: Reimagine DashboardExample (mobile-first)

**Files:**
- Modify: `playground/src/examples/DashboardExample.jsx`

Structure: NavBar sections `#dashboard / #projects / #team` via `activeHref` state + `onLinkClick`. Use the shared toast helper.

- [ ] **Step 1: Dashboard view** — KPI `StatCard` strip in `repeat(auto-fit, minmax(min(100%,180px),1fr))` each with a `Sparkline`; charts row `className="sc-split"` (`LineChart` area revenue + `DonutChart` traffic); activity row `className="sc-split"` (`BarChart` grouped/stacked via `SegmentedControl` + `NotificationItem` stack + `ProgressCircle` goal Card).

- [ ] **Step 2: Projects view** — `Tabs` status filter + `SearchInput` (wrap row), `FilterBar` chips, `Table` inside `<div style={{ overflowX:'auto' }}>` with row `Menu` (View/Deploy/Archive → toast), name button opens detail `Drawer`; `Dialog` new project; `CommandPalette` (⌘K via the terminal IconButton in the action slot); `Pagination`. Empty state when no rows.

- [ ] **Step 3: Team view** — auto-fit member `Card`s: header row (`Avatar` + name/role with `minWidth:0` ellipsis + `ProgressCircle`) then a `wrap` stats row of `Badge`s; `Timeline` of activity below.

- [ ] **Step 4: Verify** — `cd playground && npm run build` succeeds; manually confirm in dev the three nav sections switch and the table h-scrolls at 360px.

- [ ] **Step 5: Commit**
```bash
git add playground/src/examples/DashboardExample.jsx && git commit -m "feat(playground): reimagine Dashboard example mobile-first"
```

---

### Task 7: JournalExample — read + write (new)

**Files:**
- Create: `playground/src/examples/JournalExample.jsx`

NavBar sections `#feed / #read / #write` via `activeHref` state. In-memory `entries` state (seed 4–5). Shared toast helper.

- [ ] **Step 1: Data + shell**
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, Button, Card, Badge, Tag, Divider,
  SearchInput, Avatar, Input, Textarea, Tabs, Prose, Accordion, BlogCard,
  IconButton, Tooltip, Toast, EmptyState,
} from '@agustin/aqus'

const SEED = [
  { id: 1, title: 'Designing the liquid bubble', excerpt: 'Why every round element morphs instead of being a perfect circle.', body: 'Long-form body text…', date: 'Jun 28, 2026', readTime: '5 min', tags: ['Design', 'Identity'], author: 'Agustin Lago', featured: true },
  { id: 2, title: 'Glass, but only where it counts', excerpt: 'Structural chrome earns its blur.', body: '…', date: 'Jun 20, 2026', readTime: '4 min', tags: ['Material'], author: 'Agustin Lago' },
  { id: 3, title: 'OKLCH accents in practice', excerpt: 'One accent, nine tokens, infinite brands.', body: '…', date: 'Jun 12, 2026', readTime: '6 min', tags: ['Color'], author: 'Agustin Lago' },
  { id: 4, title: 'Composing screens from primitives', excerpt: 'Stop re-styling raw elements.', body: '…', date: 'Jun 4, 2026', readTime: '7 min', tags: ['Patterns'], author: 'Agustin Lago' },
]
```
Component skeleton: `nav` state `#feed`, `entries` state seeded, `current` (read id), `draft` ({title, body, tags:[]}) state.

- [ ] **Step 2: Feed view** — `Tag` category filter row (`wrap`) + `SearchInput`; featured `BlogCard` then auto-fit/`.sc-split` list of `BlogCard`s; clicking a card sets `current` and switches `nav` to `#read`. Empty state when filter yields none.

- [ ] **Step 3: Read view** — back `Button` → feed; article header (`Avatar` + author + date + readTime + `Tag`s, `wrap`); `Prose` body; `Accordion` "Author notes" (2 items). Single column.

- [ ] **Step 4: Write view** — `Input` title; tag entry (`Input` + add → `Tag` chips with `onRemove`); `Textarea` body (rows 10); `Tabs` Draft / Preview where Preview renders `<Prose><h1>{draft.title}</h1>{paragraphs}</Prose>`; actions row (`wrap`): Save draft → toast; Publish → prepend to `entries`, reset draft, switch to `#feed`, toast "Published". Validate non-empty title/body → warning toast.

- [ ] **Step 5: Verify** — `cd playground && npm run build` succeeds; in dev confirm writing an entry adds it to the feed and it reads back.

- [ ] **Step 6: Commit**
```bash
git add playground/src/examples/JournalExample.jsx && git commit -m "feat(playground): Journal example — read + write"
```

---

### Task 8: Reimagine ProfileExample (mobile-first fintech)

**Files:**
- Modify: `playground/src/examples/ProfileExample.jsx`

NavBar sections `#overview / #accounts / #activity / #settings`. The current file is already close — apply mobile rules and the layout fixes.

- [ ] **Step 1** — Overview: profile header `Card` (wrap), KPI `StatCard` strip auto-fit, `Tabs` Portfolio/Goals with `.sc-split` `LineChart` + `DonutChart` (center value `$${Math.round(total/1000)}k`) and `Stepper` milestones.
- [ ] **Step 2** — Accounts: auto-fit account `Card`s with row `Menu`; total `Card`; transfer `Dialog` (`Select` from/to + amount `Input`) moving real in-memory balances → toast.
- [ ] **Step 3** — Activity: `.sc-split` `Timeline` + month-summary `Progress`/`ProgressCircle` Card.
- [ ] **Step 4** — Settings: `Switch` rows (alerts, 2FA, marketing) with `minWidth:0` label stacks, `DescriptionList`, save → toast.
- [ ] **Step 5: Verify** — `cd playground && npm run build` succeeds; confirm transfer updates balances at 360px with no overflow.
- [ ] **Step 6: Commit**
```bash
git add playground/src/examples/ProfileExample.jsx && git commit -m "feat(playground): reimagine Profile example mobile-first"
```

---

### Task 9: Examples switcher wiring

**Files:**
- Modify: `playground/src/sections/Examples.jsx`

- [ ] **Step 1: Wire the three views** Dashboard / Journal / Profile:
```jsx
import { DashboardExample } from '../examples/DashboardExample.jsx'
import { JournalExample } from '../examples/JournalExample.jsx'
import { ProfileExample } from '../examples/ProfileExample.jsx'

const VIEWS = {
  dashboard: { label: 'Dashboard', node: <DashboardExample /> },
  journal:   { label: 'Journal',   node: <JournalExample /> },
  profile:   { label: 'Profile',   node: <ProfileExample /> },
}
```
Keep the `.sc-frame` (isolated, `data-theme`, `darkAccentVars(hue)`), the theme `Badge`, and wrap the `SegmentedControl` in `<div style={{ overflowX:'auto', paddingBottom:4 }}>` for narrow screens.

- [ ] **Step 2: Verify build clean** → `cd playground && npm run build` succeeds.

- [ ] **Step 3: Commit**
```bash
git add playground/src/sections/Examples.jsx && git commit -m "feat(playground): Examples switcher — Dashboard / Journal / Profile"
```

---

### Task 10: Full QA pass + library/playground build

**Files:** none new — verification + fixes.

- [ ] **Step 1: Library + playground build**
Run: `npm run build && cd playground && npm run build`
Expected: both succeed, no warnings beyond the known font-resolve notices.

- [ ] **Step 2: Mobile audit (dev, 360px viewport)** — for every section and all three examples confirm: no horizontal scroll, no overlap, no clipped text, no peeking grid slivers, no clustered controls. The NavBar collapses to the hamburger; the dropdown is opaque. Theme toggle + accent picker restyle the whole page including example frames and chart palettes.

- [ ] **Step 3: Fix any overflow found** by applying the global rules (auto-fit/`.sc-split`/`minWidth:0`/`overflow-x:auto`). Re-build.

- [ ] **Step 4: Commit any fixes**
```bash
git add -A && git commit -m "fix(playground): mobile QA pass — overflow/spacing"
```

---

## Self-review notes

- **Spec coverage:** Hero (existing, Task 1 wiring) · Brandbook (T2) · Glass/Materials (T3) · Usage (T4) · Glossary incl. Charts (T5) · Examples switcher (T9) · Dashboard (T6) · Journal (T7) · Profile (T8) · cross-cutting layout rules (global block + T10). All spec sections mapped.
- **Naming consistency:** anchors `#overview/#brand/#materials/#usage/#glossary/#examples` match NAV_LINKS in Task 1 and the section `id`s in Tasks 2–9. Example nav anchors are local to each example frame (isolated), so they do not collide with the main nav.
- **No placeholders:** each task gives exact files, key code, a concrete build/behavior verification, and a commit.
