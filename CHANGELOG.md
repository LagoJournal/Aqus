# Changelog

All notable changes to `@agustin/aqus` will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). Versioning: [Semantic Versioning](https://semver.org/).

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
- Install via `github:agustinlago/aqus#v0.1.0`
