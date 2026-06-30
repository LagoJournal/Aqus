---
name: aqus-design
description: Use this skill to generate well-branded interfaces and assets with the Aqus design system — a Retro-Aero × Modern UI language (glass, gloss, depth, and a signature liquid-bubble identity). For production code or throwaway prototypes/mocks. Contains design guidelines, color/type/spacing tokens, self-hosted fonts, and a full React component library ready to ship new UIs.
user-invocable: true
---

# Aqus design system

Read `README.md` for the full guide, then explore the other files. When the user invokes this skill without specifics, ask what they want to build, ask a few focused questions, then act as an expert designer who outputs either HTML artifacts or production code.

- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets/fonts you need into the output and ship static HTML so the user can view it offline.
- **Production code**: copy the token CSS + components into the project and follow the rules here to design natively in the brand.

## Quick start

1. **Tokens & global CSS** — link `styles.css`. Override the 9 `--accent-*` tokens in your own `:root {}` block to set your brand color (the recipe and a worked example are in `tokens/colors.css`). Set `data-theme="dark"` on a root element for the dark elevation ramp.
2. **Components** — compiled to `_ds_bundle.js`. Load it, then read components off `window.AqusNamespace` (the exact namespace is `AgusDesignSystem_492a6f` — auto-derived and stable). Each component has a `.prompt.md` with a one-line "what & when" plus a usage example, and a `.d.ts` props contract.
3. **Fonts** — Nunito (display), Plus Jakarta Sans (UI/body), JetBrains Mono (code) are self-hosted in `assets/fonts/`.

## Library at a glance (79 components)

- **core** — Button, IconButton, GlassPanel, Card, Badge, Tag, Input, Switch, SegmentedControl, ToggleGroup, Spinner, LiquidBubble, Kbd.
- **forms** — Checkbox, Radio, Select, Combobox, MultiSelect, Textarea, Slider, NumberInput, DatePicker, ColorPicker, OTPInput, SearchInput, FileDropzone.
- **feedback** — Alert, Banner, Progress, ProgressCircle, Skeleton, LoadingOverlay, Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette.
- **navigation** — Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper.
- **data** — Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList.
- **layout** — Container, Stack, Section, Prose, PageHeader, HeroSection, NavBar, Footer.
- **content** — StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard, NotificationItem, Carousel.
- **brand** — Monogram (liquid drop), Wordmark (liquid-s).

The `ui_kits/` (portfolio, dashboard) show the system composed into real product screens.

## Rules of thumb

- **One accent, set in CSS — within constraints.** Override `--accent-*` in `:root {}`. L: 0.55–0.72; C: 0.12–0.24; keep the derivation formula in `tokens/colors.css`. Never a second color; never a literal hex.
- **Glass is structural only** — nav, modals, drawers, popovers, hero. Content stays flat on `surface`.
- **Round = liquid** — use `LiquidBubble` / the `LIQUID_BLOB` radius instead of `border-radius: 50%`.
- **Reference tokens, never literals.** Depth is earned; light comes from above.
- **Icons:** Phosphor (`<i class="ph ph-<name>">`) for UI, color inherited from the palette; Aqua-illustrative for app icons. No emoji in chrome.
- **Motion conveys physics** — spring entrances, hover lift, glassy fades; data views get micro-interactions only.
- **Copy** — sentence case, terse, honest; no emoji, no hype.

## Shipping a new UI (Claude Code)

To build a new interface: link `styles.css`, load `_ds_bundle.js`, choose an accent + theme on the root, then compose screens from the primitives (don't re-style raw elements). Match the composition patterns in `ui_kits/`. Copy any fonts/assets the output references into the project so it runs standalone.
