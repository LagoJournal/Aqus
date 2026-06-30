---
name: aqus-design
description: Use this skill to generate well-branded interfaces and assets with the Aqus design system — a Retro-Aero × Modern UI language (glass, gloss, depth, liquid-bubble identity). For production code or prototypes/mocks. 71 React components, CSS design tokens, self-hosted fonts. Invoke whenever composing a view, page, or UI section for any project using @agustin/aqus.
user-invocable: true
---

# Aqus design system

## For view composition (agents)

Read `docs/AGENT_GUIDE.md` before composing any view. It contains:
- Full component catalog (71 components — when to use, key props, examples)
- View recipes (landing, dashboard, settings, auth, empty states)
- Page anatomy
- Hard constraints and anti-patterns
- 8-step composition process

**Workflow:** load AGENT_GUIDE → find matching View Recipe → adapt → output complete JSX.

## For design/branding questions

Read `README.md` for the full system guide. Read `docs/brand-guide.md` for visual/brand specifics.

## Install

```bash
npm install github:agustinlago/aqus#v0.1.0
```

```js
import '@agustin/aqus/styles.css'
import { Button, Card, NavBar, ... } from '@agustin/aqus'
```

## Library at a glance (71 components)

- **core** — Button, IconButton, GlassPanel, Card, Badge, Tag, Input, Switch, SegmentedControl, ToggleGroup, Spinner, LiquidBubble, Kbd
- **forms** — Checkbox, Radio, Select, Combobox, MultiSelect, Textarea, Slider, NumberInput, DatePicker, ColorPicker, OTPInput, SearchInput, FileDropzone
- **feedback** — Alert, Banner, Progress, ProgressCircle, Skeleton, LoadingOverlay, Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette
- **navigation** — Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper
- **data** — Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList
- **layout** — Container, Stack, Section, Prose, PageHeader, HeroSection, NavBar, Footer
- **content** — StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard, NotificationItem, Carousel
- **brand** — Monogram, Wordmark

## Rules

- **One accent in CSS** — override 9 `--accent-*` tokens in `:root {}`. L: 0.55–0.72, C: 0.12–0.24. No second color. No hex.
- **Glass = structural** — NavBar, Dialog, Drawer, GlassPanel. Not content.
- **Round = LiquidBubble** — never `border-radius: 50%`.
- **Tokens, not literals.** Depth is earned.
- **Compose from primitives** — never re-style raw HTML.
- **Icons:** Phosphor (`<i class="ph ph-<name>">`) — no emoji in chrome.
- **Motion:** physics-based springs. Data surfaces: micro-interactions only.
- **Copy:** sentence case, terse, honest. No emoji. No hype.
