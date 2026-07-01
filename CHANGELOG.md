# Changelog

All notable changes to `@agustin/aqus` will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Versioning: [Semantic Versioning](https://semver.org/).

---

## [0.3.0] — 2026-07-01

Mobile/layout bugfix pass from a real production dashboard integration. The root
cause of most overflow bugs was a documented grid recipe whose min-track exceeded
the viewport — fixed at the source (docs the agent reads) and in the components
that overflowed. Additive — no breaking removals.

### Fixed
- **`Badge` overflowed its container with long text** — it hardcoded `white-space: nowrap` with no `max-width`, so a long label (e.g. `Evitar sentadilla profunda por ahora`) grew wider than its card and caused horizontal scroll on ~320px phones. Badges now **wrap by default** and are capped at `max-width: 100%`. New `nowrap` prop opts short status chips back into single-line.
- **`Banner` action was inline-only** — the message/action row now wraps so a cramped action drops below the message on narrow widths. New `stackAction` prop forces the action onto its own full-width row at every width.
- **`ToggleGroup` overflowed with many options** — the `inline-flex` row couldn't wrap; it now `flex-wrap`s and is capped at `max-width: 100%` so a long row wraps instead of forcing horizontal scroll.
- **`AGENT_GUIDE` grid recipes overflowed small phones (root cause)** — every `repeat(auto-fit, minmax(Npx, 1fr))` recipe used a fixed-px min-track that overflows any viewport narrower than `N` + padding. All recipes now use `minmax(min(100%, N), 1fr)`.

### Added
- **`Badge` `nowrap`** — force a single line for short status chips (default false; Badges wrap).
- **`Banner` `stackAction`** — stack the action below the message at every width (default false; wraps only when cramped).
- **`NavBar` `actionCompact`** — alternative trailing node rendered below `compactAt`; swap a labeled action Button for an icon-only variant so it doesn't crowd the brand + hamburger on phones. Keep the accessible name via `aria-label`.
- **Regression test suite** — `vitest` + `jsdom` + Testing Library; `npm test`. Guards each fix (Badge wrap/`nowrap`, Banner stacking, ToggleGroup wrap, NavBar `actionCompact` swap driven by a mocked `ResizeObserver`).

### Docs
- **New loud rule in `AGENT_GUIDE.md` + `ux-laws.md`:** a grid's min track must never exceed the container — always `minmax(min(100%, N), 1fr)`. Added anti-pattern rows for fixed-px `minmax` min-tracks and `nowrap` chips in flex rows.
- **Mandatory "test at 320px" step** added to the composition process, the layout-planning block, the Aqus bar (`SKILL.md` + `AGENT_GUIDE.md`), and the ux-laws checklist — confirm zero horizontal scroll at the narrowest phone before shipping.
- **`ToggleGroup` scope note** — it's for a small fixed set of toolbar actions/view switches; count/tag filters belong in `FilterBar` or `Tag`s.

---

## [0.2.2] — 2026-07-01

Second bugfix pass from real-world integration feedback. Additive — no breaking removals.

### Fixed
- **Accent override was flaky (the recurring one)** — Aqus token defaults shipped in a bare `:root` (specificity 0,1,0), so a consumer's own `:root { --accent: … }` override was a *tie* decided by load order, which flips under Vite dev. Token defaults now live in `@layer aqus.tokens`; unlayered consumer styles always beat layered ones regardless of order or specificity. A plain `:root { --accent: … }` override just works — no `:root:root` hack.
- **Phosphor icons rendered blank** — components (and the library's own nav chrome) render `<i class="ph ph-…">` but the package neither depended on nor documented the font. Added `@phosphor-icons/web` as an (optional) `peerDependency`, and the `import '@phosphor-icons/web/regular'` line is now in the Setup boilerplate of both `README.md` and `AGENT_GUIDE.md`.
- **`Breadcrumb` clicks did nothing with `href` items** — the component only fired `onNavigate` off a `<button>` and ignored `href`. Items with `href` now render real `<a>` links (still call `onNavigate` for SPA routing, preventing the default jump when a handler is set).
- **`Carousel` clipped child `Card` shadows and hover-lift** — an `overflow-x: auto` track also clips `overflow-y`; bumped the track's block padding (`18px 6px`) so shadows and the hover `translateY` aren't sheared.
- **`aqus init` accent presets** — `Violet` was H 265, which reads blue (≈15° off the cobalt default); it's now H 292 (true violet) and `Purple` moved to H 318 for real separation. The non-interactive default is now `Blue` (H 245 ≈ cobalt). Custom `--hue` in the 245–285 blue-violet zone now prints a warning.

### Added
- **`BreadcrumbItem.href`** — optional per-item link target (see Fixed).
- **`hueWarning(H)`** export in `lib/tokens.js` — flags hues that read blue when a violet was intended.

### Docs
- **`AGENT_GUIDE.md`** — new layout-gotcha row: horizontal scroll rail clips Card shadow/hover → add block padding or use `Carousel`.

---

## [0.2.1] — 2026-07-01

Bugfix pass from real-world integration feedback (Fuchidle). No breaking removals — all new props/exports are additive.

### Fixed
- **Self-hosted fonts 404'd under Vite** — `src/tokens/fonts.css` `@font-face` `url()`s pointed one directory too shallow (`../assets/fonts` resolved to nonexistent `src/assets/fonts`); corrected to `../../assets/fonts`
- **`NavBar`/`Footer`/`BlogCard`/`TestimonialCard`/`FilterBar` crashed under real ESM/CJS consumption** — these read sibling components off `window.AgusDesignSystem_492a6f`, a global only ever assigned by an external preview compiler (or a now-removed playground dev shim), never by the shipped npm package; switched to direct relative imports like every other component
- **`Alert tone="accent"` title color** was fixed to `var(--text)` regardless of tone — now uses the tone's own foreground color, matching the pattern already used for the status dot
- **Doc recipes in `AGENT_GUIDE.md`** referenced nonexistent tokens (`--text-primary`, `--text-secondary`, `--text-heading`, `--text-heading-sm`) and misused bare-size tokens inside the `font` shorthand (invalid CSS, silently dropped) — tokens are now real (see Added) and the remaining bare-size misuses switched to `fontSize`
- **`GlassPanel`** children ignored flex/grid layout set via `style` (e.g. `justifyContent: 'space-between'` for a nav-style layout silently did nothing) — flex/grid layout keys now also forward to the inner content wrapper, and the wrapper stretches to fill the available space so distribution properties actually take effect
- **`aqus init`/`aqus agent install` `-y` short flag** was silently non-functional (only `--yes` worked) — fixed in `parseFlags`

### Added
- **Base body/heading typography** — `body` now gets `--font-ui`, headings get `--font-display`, out of the box
- **`--text-heading` / `--text-heading-sm`** composite tokens (weight + size/line-height + family) — valid directly inside the `font` shorthand
- **`--text-primary` / `--text-secondary` / `--text-disabled` / `--text-inverse`** semantic text-color aliases (light + dark)
- **`Wordmark`** — `text`/`glyph` props (default `'Aqu'`/`'s'` = "Aqus") so the rendered word is no longer hardcoded
- **`NavBar`/`Footer`** — `brand`/`brandProps` props to override or customize the default Wordmark
- **`StatCard`** — `wrap` prop as an escape hatch from the default single-line truncation
- **`src/index.d.ts`** — aggregated barrel re-exporting every component's real prop types; `package.json` now has a `types` field and an `exports["."].types` condition, so `tsc` resolves the package with zero consumer shims
- **`aqus init` / `aqus agent install`** — `--yes`/`-y`, `--accent=`, `--hue=`/`--chroma=`/`--lightness=`, `--agent[=project|global]`, `--no-agent`, `--global` flags for non-interactive/CI use

### Changed
- Repo URL casing normalized to match the actual GitHub remote (`LagoJournal/Aqus`) across `package.json`, `README.md`, `SKILL.md`, `docs/USER_GUIDE.md`, and the playground UI
- Legacy `Agus` brand-string remnants in comment headers and prose renamed to `Aqus`
- `Timeline`'s component comment now documents its accepted `status` values (`done`/`active`/anything else = pending/outline), matching what its `.d.ts` already specified
- **`SKILL.md`** — hardened the `aqus-design` agent skill so its rules survive a skipped doc read: mandatory pre-flight block (doc-read confirmation, viewport, layout intent, accent plan) required before any JSX, non-negotiables expanded from 10 to 12 (inlining "all four states" and "one primary action per view" so they're enforced even without reading `docs/`), and the Aqus-bar ship-gate checklist is now required in the same response as the JSX, not just recommended
- Install examples now consistently use the unpinned `npm install github:LagoJournal/Aqus` (latest) form; version-pinned tags remain documented only as README's explicitly-labeled optional alternative, not as the default instruction elsewhere (`SKILL.md`, playground)

### Removed
- **`docs/superpowers/` untracked and gitignored** — internal planning/spec docs from this repo's own development process were being published into the npm tarball via the old blanket `"docs"` entry in `package.json`'s `files` array; `files` now lists the 5 actual consumer-facing docs individually (`AGENT_GUIDE.md`, `USER_GUIDE.md`, `brand-guide.md`, `ux-laws.md`, `voice-rules.md`) instead of the whole `docs/` directory

---

## [0.2.0] — 2026-06-30

Major update. Agent-first install flow, playground redesign, component fixes, expanded agent documentation.

### Added
- **`npx aqus init` CLI** — interactive setup: accent color picker (10 presets or custom H/C/L), derives all 9 tokens, writes `aqus.css`, auto-injects CSS imports into detected entry point (Vite/Next/Remix), installs Claude agent skill
- **`npx aqus agent install`** — standalone agent skill install; copies `SKILL.md` + docs into `.claude/skills/aqus-design/`
- **`postinstall.js`** — prints setup hint in interactive terminals; CI-safe (no-op when `CI=true` or not a TTY)
- **`lib/tokens.js`** — accent token generator; derivation formula from `ACCENT.md`; light + dark mode output
- **`lib/detect.js`** — framework entry point detection and CSS import injection
- **`lib/agent.js`** — agent skill installer with docs/ path rewriting
- **5 new chart components** — BarChart, LineChart, DonutChart, Sparkline, ChartLegend (pure SVG, no deps, accent-derived palette via `--accent-h`)
- **`docs/ux-laws.md`** — 10 Laws of UX translated into concrete Aqus component rules
- **`docs/voice-rules.md`** — three registers, microcopy patterns for every component state, copy checklist
- **`--glass-surface-dense` token** — dark-mode-aware dense glass preset; avoids 82% white override in dark theme
- **Playground redesign** — mobile-first; new DashboardExample (ops/infra), JournalExample (daily reflection), ProfileExample (investment tracker); new Brandbook section with brand marks, accent ramp, voice registers, motion demos

### Changed
- **`AGENT_GUIDE.md`** — document authority map, expanded constraints (theme-adaptive, never-rebuild rule, liquid behavior rule, one-emphasis rule, right-register, feedback timing), Aqus bar review checklist (Brand / Interaction / Voice / A11y), common failure modes table
- **`SKILL.md`** — 10 non-negotiables, document authority order, Aqus bar ship gate summary
- **`Menu`** — auto-detects open direction from trigger viewport position (right 55% → panel grows leftward); `align` prop still works as explicit override
- **`ProgressCircle`** — label uses `var(--text)` (full contrast); minimum font size 11px
- **`floating.jsx`** — `crossX` and left/right placements use standalone CSS `translate` property instead of `transform`, preventing conflict with `agus-enter` animation (fixes position jump on panel open for all floating components: Menu, Select, Combobox, Popover, Tooltip)
- **`StatCard`** — flex-column layout, `var(--text-h1)` for value, `whiteSpace: nowrap` + ellipsis prevents overflow on large numbers
- **`NumberInput`** — webkit spin arrows hidden globally via `materials.css`
- **`Materials` glass stage** — colored liquid bubbles (accent / warm / teal hues) + drifting light source animation
- **README** — agent-first framing, `npx aqus init` as primary install, 10 core rules

### Fixed
- Dense glass in dark mode rendering as near-opaque white (hardcoded `rgba(255,255,255,0.82)` overrode dark theme token)
- Floating panel (Menu, Select, Popover) snapping to wrong position after enter animation completed
- ProgressCircle label illegible at small sizes
- Menu dropdown opening on wrong side of screen near viewport edges
- JournalExample mood SegmentedControl overflowing on mobile (5 options → 4: Great / Good / OK / Low)

---

## [0.1.0] — 2026-06-30

Initial release. Extracted from `aqus-handoff`, restructured into standalone library.

### Added
- 71 React components across 8 categories (core, forms, feedback, navigation, data, layout, content, brand)
- CSS design token system (`src/tokens/`) — colors, typography, spacing, elevation, motion, materials
- ESM + CJS builds via Vite library mode (`dist/`)
- `@agustin/aqus/styles.css` root entry point
- Full TypeScript prop contracts (`.d.ts` per component)
- `docs/USER_GUIDE.md` — human consumer reference
- `docs/AGENT_GUIDE.md` — LLM view composition guide with catalog, view recipes, constraints
- `SKILL.md` — `aqus-design` skill for agent invocation
- Install via `github:LagoJournal/aqus#v0.1.0`
