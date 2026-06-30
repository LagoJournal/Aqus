# Aqus — Design System

**Aqus** is a self-contained UI design system and component library. The name is an *aqua* reference: the language revives the depth, gloss, and material honesty of the Retro-Aero era (Apple Aqua, Vista frosted glass, Windows Live warmth, Sony Ericsson liquid identity) and applies it with modern restraint. Use it to ship branded, production-quality interfaces fast.

**Aesthetic pole: 50/50 Retro-Aero × Modern.** Glass and gloss live only on *structural chrome* (nav, cards, hero, modals, overlays); interior content stays flat, clean, and low-contrast. Depth is earned — every shadow and blur signals real elevation. Light comes from directly above: shadows fall down, glosses face up.

**Signature element — the liquid bubble.** Every "round" thing in Aqus is a slowly-morphing organic blob, never a perfect circle: status dots, toggle knobs, spinners, avatars, step nodes, pagination, active markers, icon buttons. One shared primitive (`LiquidBubble`, border-radius `42% 58% 63% 37% / 41% 44% 56% 59%`) keeps this consistent. Reach for it whenever you build something new and circular.

---

## How to consume this system

1. **Global CSS** — link the single root entry point `styles.css`. It `@import`s every token and font file; that's all a consuming page needs for colors, type, spacing, elevation, motion, and the material recipes.
2. **Components** — compiled into `_ds_bundle.js`. In an HTML page, load the bundle and read components off the global namespace: `const { Button, Card, … } = window.AgusDesignSystem_492a6f`. Each component is also a source `.jsx` with a sibling `.d.ts` (props contract) and `.prompt.md` (one-line "what & when" + usage example).
3. **One accent, set in CSS.** Override the 9 `--accent-*` tokens in your `:root {}` to set your brand accent (recipe + example in `tokens/colors.css`). Leave as-is for the cobalt default. Optionally add `data-theme="dark"` on a root element for dark mode.

> The compiler namespace `AgusDesignSystem_492a6f` is auto-derived and stable — use it verbatim in `@dsCard` HTML and consuming pages.

---

## Index / manifest

- `styles.css` — root entry; `@import`s only. Consumers link this one file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `materials.css`.
- `components/core/` — Button, IconButton, GlassPanel, Card, Badge, Tag, Input, Switch, SegmentedControl, ToggleGroup, Spinner, LiquidBubble, Kbd/KbdShortcut.
- `components/forms/` — Checkbox, Radio, RadioGroup, Select, Combobox, MultiSelect, Textarea, Slider, NumberInput, DatePicker, ColorPicker, OTPInput, SearchInput, FileDropzone.
- `components/feedback/` — Alert, Banner, Progress, ProgressCircle, Skeleton, Spinner-overlay (LoadingOverlay), Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette.
- `components/navigation/` — Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper.
- `components/data/` — Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList.
- `components/layout/` — Container, Stack, Section, Prose (+ ProseH1/H2/H3/P/A), PageHeader, HeroSection, NavBar, Footer.
- `components/content/` — StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard, NotificationItem, Carousel.
- `components/brand/` — Monogram (Liquid Drop) + Wordmark (liquid-s).
- `guidelines/` + `assets/` — foundation specimen cards (Type/Colors/Spacing/Motion) and Brand cards (wordmark, monogram, glass recipe, liquid mark, iconography); webfonts in `assets/fonts/`.
- `ui_kits/portfolio/` + `ui_kits/dashboard/` — full-screen interactive recreations showing the system composed into real product views.
- `_ds_bundle.js` / `_ds_manifest.json` / `_adherence.oxlintrc.json` — compiler-generated; never edit by hand.

---

## Content fundamentals (voice & copy)

Voice is **short, precise, honest** — written like someone who both designs and codes. Technical fluency in plain language; never clever at the expense of clarity.

- **Casing:** sentence case for all UI ("New project", "Save changes") and headings. Uppercase only for small eyebrow labels and table headers, with wide tracking.
- **Person:** first person on personal/portfolio surfaces ("I build…"); second person in product UI ("Your projects").
- **Tone:** calm and concrete. Terse labels, no exclamation pile-ons, no hype.
- **Emoji:** never in chrome or product UI.
- **Examples:** "Available for select work", "No projects yet — create your first to get started", "Build failed at compilation step".

---

## Visual foundations

- **Color** — Three tiers: fixed warm neutrals (Cream/Bone canvas in light; deep cool Navy in dark), one consumer-defined accent, and OKLCH-derived semantic tokens (`--accent`, `--accent-hover`, `--accent-light`, `--accent-mid`, `--accent-text`, `--accent-glow`, `--accent-glass`, `--focus-ring`, `--on-accent`). **One accent per project — set manually.** Override the 9 accent tokens in your own `:root {}` block to set your brand accent (the recipe and a worked example are in `tokens/colors.css`). The default is cobalt; just override to change it. `data-theme="dark"` activates the dark elevation ramp. Dark shadows are minimal — elevation reads from the lightness ramp, not halos.
- **Type** — Nunito (display/brand, rounded geometric), Plus Jakarta Sans (UI/body, humanist), JetBrains Mono (code). 8pt grid, 1.25 scale (`display-xl` 56 → `mini` 11). Anti-aliased at every size. All three are self-hosted in `assets/fonts/`.
- **Material / depth** — 5 elevation levels via a two-shadow contact system (`shadow-xs…lg`, `shadow-glass`). Glass recipe: ~60–62% surface + 12–24px backdrop blur + accent-glass tint + inner top-gloss stripe + light/dark edge borders. Chrome only — never on body text, tables, or inputs.
- **Liquid identity** — `LiquidBubble` (filled / outline / spinner) for every round element; larger morphing blobs for hero backgrounds and empty states (`agus-liquid`, 8–12s). Never on dense data surfaces.
- **Backgrounds** — warm horizon gradients (`agus-horizon`, theme-adaptive); pinstripe and brushed-metal textures used sparingly.
- **Motion** — physics-based. Micro 100ms ease-out; UI 240ms ease-out; page 380ms spring; hover lift `translateY(-2px)`; pulsing default-button glow; the liquid spinner (a conic arc traveling a morphing blob ring); slow blob morph. Respects `prefers-reduced-motion`.
- **Hover / press** — cards lift + deepen shadow on hover; buttons scale to 0.96–0.97 on press and brighten to `accent-hover`.
- **Radii** — xs 4 (tags) · sm 8 (inputs) · md 12 (cards) · lg 16 (glass) · xl 24 (hero) · pill (buttons/toggles) · liquid-blob (round elements).
- **Cards** — resting = surface + `shadow-xs` + hairline border + subtle top sheen; featured = accent-glass tint + soft accent glow halo + a faint morphing liquid drop (no hard accent border — that trope is deliberately avoided).

---

## Iconography

Functional UI icons use **Phosphor** (regular weight) — `<i class="ph ph-<name>">`, sized by `font-size`, color inherited from the surrounding text/accent token (so icons adapt to light/dark automatically). App/feature icons are Aqua-style illustrative (material, depth, single overhead light source), authored per-asset. No emoji in chrome or UI.

---

## Usage rules (for building with Aqus)

1. **One accent, set manually — within the OKLCH constraints.** Override the 9 `--accent-*` tokens in your `:root {}`. The recipe and constraints are in `tokens/colors.css`: L must be 0.55–0.72 (readable on both light and dark surfaces), C must be 0.12–0.24 (distinct but not garish), and `--accent-text` on `--accent-light` must hit ΔL ≥ 0.65. Never introduce a second brand color; never a literal hex.
2. **Glass is structural only.** Nav, modals, drawers, popovers, hero chrome. Content sits on flat `surface`.
3. **Round = liquid.** Use `LiquidBubble` (or the `LIQUID_BLOB` radius) instead of `border-radius: 50%` so new components inherit the identity.
4. **Reference tokens, never literals.** Colors, spacing, type, radii, shadows, motion all come from CSS custom properties. The only acceptable raw colors are neutral white/black alphas inside gloss/shadow recipes.
5. **Respect elevation.** Match the shadow tier to the real stacking level; don't decorate with shadow.
6. **Compose, don't re-implement.** Build screens from the primitives — Button, Card, Input, etc. — rather than re-styling raw elements. UI kits show the intended composition.
7. **Motion conveys physics.** Spring entrances, hover lift, glassy fades. Data views get micro-interactions only — no ambient animation.
8. **Copy is sentence case, terse, honest.** No emoji in UI, no hype.
