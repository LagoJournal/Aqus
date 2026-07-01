# Changelog

All notable changes to `@agustin/aqus` will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Versioning: [Semantic Versioning](https://semver.org/).

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
