# Aqus Playground — Mobile-First Redesign

**Date:** 2026-06-30
**Status:** Design / approved structure

## Goal

Rebuild the Aqus playground showcase app **mobile-first**, using only Aqus
catalog components and tokens. The app teaches the library: brand guidelines +
brandbook, the glass recipe, install/usage, a filterable component glossary, and
three fully-interactive examples (Dashboard, Writing journal, Fintech profile).

## Non-goals

- No new library components. Everything composes from the existing 76 components
  + charts. No re-styled raw HTML for chrome.
- No second accent color, no hex literals, no `border-radius: 50%`.
- Not a content rewrite of the brand voice — reuse existing copy where it holds.

## Viewport target

**Mobile-first responsive.** Design at 360–414px first, enhance up to desktop.
Every multi-column layout collapses cleanly; nothing overflows, overlaps, or
clusters. Applies the AGENT_GUIDE "Layout & visual composition" rules:
wireframe → rhythm → hierarchy → fill; `auto-fit`/`minmax(0,1fr)`/`.sc-split`;
`wrap` on row Stacks; `minWidth:0` on text children; tables wrapped in
`overflow-x:auto`.

## Architecture

Single-page vertical scroll (structure option C). Files under `playground/src/`:

```
App.jsx                     shell: NavBar + section order + Footer + theme/accent state
showcase.css                showcase-only layout helpers (already mobile-tuned)
sections/
  Hero.jsx
  Brandbook.jsx             NEW — merges DesignRules + brand identity + folded Motion
  Materials.jsx             Glass recipe (kept, mobile-tuned)
  Usage.jsx                 install / import / theme (kept, mobile-tuned)
  Glossary.jsx              filterable component catalog incl. Charts category
  Examples.jsx              SegmentedControl switching the 3 example frames
examples/
  DashboardExample.jsx      reimagined mobile-first
  JournalExample.jsx        NEW — read + write
  ProfileExample.jsx        reimagined mobile-first (fintech)
```

Removed: `DesignRules.jsx`, `Animations.jsx`, `Charts.jsx`, `StorefrontExample.jsx`
(content folded/relocated as described below).

State lives in `App.jsx`: `theme` (light/dark), `hue` (accent), `activeHref`
(scroll-spy). `--accent-h` is written alongside the 9 accent tokens so charts
recolor with the accent. Theme + accent flow into the Examples frame inline.

## Navigation (mobile-first)

Stock `NavBar`:
- Links: Overview, Brand, Glass, Usage, Components, Examples (6 max).
- Below 720px the bar auto-collapses links into the hamburger glass dropdown
  (opaque base — already fixed). `onLinkClick` scrolls + sets `activeHref`.
- Action slot (kept to fit beside hamburger on mobile): accent `Popover`
  (`ColorPicker`), theme toggle `IconButton`, GitHub `Button` (icon-only `sm`
  on narrow if needed).
- Scroll-spy `IntersectionObserver` highlights the active section.

## Sections

### 1. Hero
`Section size="lg" horizon`. Centered `Monogram` + "Aqus" headline (clamped),
sub line, two CTAs (`Button` primary pulse + secondary) wrapping on mobile,
`Badge` row (76 components, light+dark, OKLCH tokens, charts), decorative
`LiquidBubble` row. CTAs scroll to Usage and Components.

### 2. Brandbook
The "guidelines + brandbook" core. Sub-blocks, each a `Card` / `Stack`,
single-column on mobile, 2-up where it fits via `.sc-split` / auto-fit:
- **Accent system** — live `ColorPicker` (hue presets) driving the page; the 9
  `--accent-*` swatches + `--accent-h`; one-line note that chart slots derive at
  45° from the hue.
- **Type scale** — display/h1–h4/body/label samples from the type tokens.
- **Voice & copy** — the copy rules (sentence case, terse, honest, no emoji/hype)
  as short do/don't lines.
- **The hard rules** — the 8 constraints (one accent, glass=structural,
  round=LiquidBubble, tokens not literals, compose from primitives, Phosphor
  icons, physics motion, sentence-case copy) as compact `Card`s in an auto-fit
  grid with a Phosphor icon each.
- **Motion (folded)** — one `Card` with a live spring entrance + a morphing
  `LiquidBubble`/`agus-liquid` demo, plus the one-line motion rule.

### 3. Glass recipe (Materials)
Kept. `SegmentedControl` Thin / Frosted / Dense driving `--glass-blur` on a live
glass stage (full-width on mobile, decorative blobs behind). Layer-anatomy list
(translucent base, blur+saturate, accent film, inner gloss, bevel borders).
Note: NavBar uses the dense 48px blur.

### 4. Usage / install
`Tabs` (Install / Import / Theme). `CodeBlock` snippets:
- Install: `npm install github:LagoJournal/aqus#<tag>`
- Import: `import '@agustin/aqus/styles.css'` + named imports
- Theme: the `:root` accent block including `--accent-h`, plus dark-mode note.
Single column on mobile; tabs scroll-safe.

### 5. Components glossary
Filterable catalog. Controls row (wrapping): `SearchInput` (filtered count
badge) + `SegmentedControl`/scrollable filter for categories
(All, Core, Forms, Feedback, Navigation, Data, Layout, Content, Brand,
**Charts**). Auto-fit grid of preview `Card`s — each shows a live mini-instance
of the component, its name (mono), category, one-line description. Charts appear
as their own category (Line/Bar/Donut/Sparkline live previews). Empty state when
a search matches nothing.

### 6. Examples
`SegmentedControl` Dashboard / Journal / Profile (horizontal-scroll safe). Below
it, the live example in `.sc-frame` (isolated stacking context, `data-theme`,
inline dark accent vars) so the example NavBars never fight the main nav. Frame
chrome bar shows the app name + current theme `Badge`. Reactive to the global
theme + accent — no local toggle.

### 7. Footer
Stock `Footer` with Library / Reference / Install columns.

## The three examples (all mobile-first, fully interactive)

### Dashboard (reimagined)
Workspace app. NavBar sections **Dashboard / Projects / Team** via `activeHref`
state.
- Dashboard: KPI `StatCard` strip (auto-fit, sparklines), `.sc-split` charts row
  (`LineChart` revenue + `DonutChart` traffic), activity `.sc-split`
  (`BarChart` grouped/stacked toggle + `NotificationItem` stack +
  `ProgressCircle` goal).
- Projects: `Tabs` status filter + `SearchInput` + `FilterBar`, `Table` wrapped
  in `overflow-x:auto`, row `Menu`, project detail `Drawer`, new-project
  `Dialog`, `CommandPalette` (⌘K), `Toast` feedback, `Pagination`.
- Team: auto-fit member `Card`s (header row + stats row that wraps, `minWidth:0`),
  `Timeline`.

### Journal (new — read + write)
Personal writing journal. NavBar sections **Feed / Read / Write**.
- **Feed**: `Tag` category filter row + `SearchInput`; `BlogCard` list
  (auto-fit/single-column), featured entry, popular list. Clicking an entry →
  Read.
- **Read**: `Prose` article body, `PageHeader`-style meta (author `Avatar`,
  date, read time, `Tag`s), `Accordion` "notes/footnotes" or `Timeline` of
  revisions, back-to-feed `Button`.
- **Write**: compose flow — `Input` title, `Textarea` body, `Tabs`
  Draft / Preview (preview renders `Prose`), tag entry (`Input` + `Tag` chips),
  `FileDropzone` cover (optional), Publish `Button` → `Toast` "Published",
  adds the entry to the in-memory feed. Save draft → `Toast`.
All state in-memory; fully clickable.

### Profile (reimagined — fintech)
Personal finance hub. NavBar sections **Overview / Accounts / Activity /
Settings**.
- Overview: profile header `Card`, KPI `StatCard` strip, `Tabs`
  Portfolio / Goals (`.sc-split` `LineChart` perf vs benchmark + `DonutChart`
  allocation; `Stepper` milestones).
- Accounts: auto-fit account `Card`s with row `Menu`; total balance `Card`;
  transfer `Dialog` (`Select` from/to + amount `Input`) that moves real
  in-memory balances → `Toast`.
- Activity: `.sc-split` `Timeline` + `ProgressCircle`/`Progress` month summary.
- Settings: `Switch` rows (alerts, 2FA, marketing), `DescriptionList` account
  details, save → `Toast`.

## Cross-cutting layout rules (enforced everywhere)

- Grids: `repeat(auto-fit, minmax(min(100%, N), 1fr))` or `.sc-split`
  (collapses < 820px). No fixed-px columns.
- `Stack direction="row"` with 3+ items gets `wrap`.
- `minWidth:0` on text-bearing flex/grid children; `whiteSpace:nowrap` on chips.
- Tables wrapped in `overflow-x:auto`.
- Section titles `clamp()`; ledes `clamp()`.
- One dominant element per surface; accent = primary/active only.
- Toasts portal to `document.body` at z 9999; dropdowns rely on library z 600.

## Success criteria

- At 360px width: no horizontal scroll on any section; no overlap, no clipped
  text, no peeking grid slivers, no clustered controls.
- All three examples are fully clickable end-to-end (nav sections, dialogs,
  drawers, forms, toasts) on mobile and desktop.
- Theme toggle + accent picker restyle the whole page incl. example frames and
  chart palettes.
- Library + playground build clean. No raw-HTML chrome, no second color, no
  `border-radius:50%`, no hardcoded chart hues.
- Glossary search shows an accurate filtered count and an empty state.

## Out of scope / follow-ups

- Moving the `v0.2.0` tag / cutting a new release (separate decision).
- Any change to the published library components beyond what's already shipped.
