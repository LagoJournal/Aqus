# Aqus

Retro-Aero × Modern React component library. Glass and gloss on structural chrome (nav, modals, cards); flat and clean everywhere else. 71 components, full TypeScript types, CSS design tokens, self-hosted fonts.

**Aesthetic:** 50/50 Aqua-era depth × modern restraint. Signature element: the liquid bubble — every round element is a slowly-morphing organic blob, never a perfect circle.

---

## Install

```bash
# Pin a version (recommended — get components + docs locked together)
npm install github:agustinlago/aqus#v0.1.0

# Always latest main (use for active development on Aqus itself)
npm install github:agustinlago/aqus

# Local sibling path (monorepo or side-by-side dev)
npm install file:../aqus
```

---

## How to use

### 1. Import global CSS

Once, at your app root (`main.jsx`, `_app.tsx`, `layout.tsx`):

```js
import '@agustin/aqus/styles.css'
```

This loads all design tokens — colors, typography, spacing, elevation, motion, and material recipes.

### 2. Set your accent color

Add to your root CSS:

```css
:root {
  /* Override all 9 tokens to set your brand accent.
     Default is cobalt. Constraints: L 0.55–0.72, C 0.12–0.24. */
  --accent:        oklch(0.60 0.20 255);
  --accent-hover:  oklch(0.64 0.20 255);
  --accent-light:  oklch(0.92 0.06 255);
  --accent-mid:    oklch(0.75 0.14 255);
  --accent-text:   oklch(0.30 0.16 255);
  --accent-glow:   oklch(0.60 0.20 255 / 0.35);
  --accent-glass:  oklch(0.60 0.20 255 / 0.08);
  --focus-ring:    oklch(0.60 0.20 255 / 0.50);
  --on-accent:     oklch(1.00 0.00 0);
}
```

Never introduce a second brand color. Never use hex — OKLCH only.

### 3. Import components

```jsx
import { Button, Card, NavBar, Dialog, Stack } from '@agustin/aqus'

export function MyPage() {
  return (
    <>
      <NavBar logo={<Wordmark />} nav={[{ label: 'Home', href: '/' }]} />
      <Stack gap={24}>
        <Card>
          <Button variant="primary">Get started</Button>
        </Card>
      </Stack>
    </>
  )
}
```

### 4. Dark mode

```html
<html data-theme="dark">
```

Or toggle in JS:
```js
document.documentElement.dataset.theme = 'dark'
```

### 5. Icons

Aqus uses [Phosphor Icons](https://phosphoricons.com/) for UI icons:

```html
<!-- Add to <head> -->
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
```

```jsx
<Button icon={<i className="ph ph-plus" />}>New project</Button>
<IconButton icon={<i className="ph ph-gear" />} label="Settings" />
```

---

## Component library

71 components across 8 categories:

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

Each component has a `.d.ts` (TypeScript props contract) and a `.prompt.md` (what/when + example) in `src/components/`.

→ Full reference: [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md)

---

## Design rules (short version)

1. **One accent** — set 9 `--accent-*` tokens in `:root {}`. L: 0.55–0.72, C: 0.12–0.24.
2. **Glass = structural only** — NavBar, Dialog, Drawer, Popover, GlassPanel. Content on flat `surface`.
3. **Round = LiquidBubble** — never `border-radius: 50%`.
4. **Tokens, not literals** — `var(--spacing-4)` not `16px`. `var(--accent)` not a hex color.
5. **Compose from primitives** — never re-style raw `<button>`, `<input>`, `<div>`.
6. **Motion physics** — spring entrances, hover lift, glassy fades. No ambient animation on data.
7. **Copy: sentence case, terse, no emoji in UI.**

---

## Versioning

Each git tag is a self-contained release. Components and documentation are versioned together — pinning a tag gives you matching guides.

```bash
npm install github:agustinlago/aqus#v0.1.0   # lock to this release
npm install github:agustinlago/aqus#v0.2.0   # opt into next release
```

See [`CHANGELOG.md`](CHANGELOG.md) for what changed between versions.

---

## For Claude / AI agents

To compose a view using Aqus: read [`docs/AGENT_GUIDE.md`](docs/AGENT_GUIDE.md). It contains the full component catalog, view recipes, and composition rules tuned for LLM use.

Or invoke the `aqus-design` skill — it routes view composition tasks to the agent guide automatically.
