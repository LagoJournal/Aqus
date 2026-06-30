# Aqus Component Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract `aqus-handoff/` into a standalone git repo (`github.com/agustinlago/aqus`), restructure into a clean `src/` + `docs/` layout, package as `@agustin/aqus` npm library (v0.1.0), and ship a User Guide + Agent Guide so any project can pin a version and get matching components + documentation.

**Architecture:** Own git repo with semver tags. Consumers install via `github:agustinlago/aqus#v0.1.0` — pinning a tag gives them components and AGENT_GUIDE from that exact version. Vite library mode builds ESM + CJS into `dist/`. CSS tokens stay as source CSS (bundlers resolve `@import` natively). SKILL.md makes the `aqus-design` skill point agents to `docs/AGENT_GUIDE.md` for view composition.

**Tech Stack:** Vite 5 (library mode), `@vitejs/plugin-react`, React 18 peer dep, CSS custom properties, Phosphor icons (peer/CDN), oxlint rule enforcement.

---

## File Map

```
aqus/                            ← new standalone repo (extracted from aqus-handoff/)
  src/
    components/
      core/                      ← moved from aqus-handoff/components/core/
      forms/                     ← moved
      feedback/                  ← moved
      navigation/                ← moved
      data/                      ← moved
      layout/                    ← moved
      content/                   ← moved
      brand/                     ← moved
    tokens/                      ← moved from aqus-handoff/tokens/
    index.js                     ← NEW: barrel export of all 71 components
  dist/                          ← build output (gitignored during dev, committed on release)
  docs/
    USER_GUIDE.md                ← NEW: human consumer reference
    AGENT_GUIDE.md               ← NEW: LLM view composition guide
    brand-guide.md               ← moved from aqus-handoff/brand-guide.md
  assets/
    fonts/                       ← moved from aqus-handoff/assets/fonts/
  styles.css                     ← moved from aqus-handoff/styles.css (update @import paths → src/tokens/)
  package.json                   ← NEW
  vite.config.js                 ← NEW
  SKILL.md                       ← moved + updated
  README.md                      ← NEW: comprehensive (what, install, how to use, versioning)
  CHANGELOG.md                   ← NEW: v0.1.0 entry
  .gitignore                     ← NEW
```

---

## Task 1: Scaffold new repo + restructure files

**Files:** All moves from `aqus-handoff/` → `aqus/`

- [ ] **Step 1: Create new repo directory alongside current project**

```bash
mkdir -p /Users/agustinlago/Documents/Projects/aqus
cd /Users/agustinlago/Documents/Projects/aqus
git init
```

- [ ] **Step 2: Copy source files preserving structure**

```bash
SRC=/Users/agustinlago/Documents/Projects/Aqus/aqus-handoff
DEST=/Users/agustinlago/Documents/Projects/aqus

# Source components and tokens → src/
cp -r "$SRC/components" "$DEST/src/"
cp -r "$SRC/tokens"     "$DEST/src/"

# Assets
cp -r "$SRC/assets" "$DEST/"

# CSS root entry
cp "$SRC/styles.css" "$DEST/"

# Docs
mkdir -p "$DEST/docs"
cp "$SRC/brand-guide.md" "$DEST/docs/"

# Lint config
cp "$SRC/_adherence.oxlintrc.json" "$DEST/" 2>/dev/null || true

# SKILL.md (will be updated in Task 8)
cp "$SRC/SKILL.md" "$DEST/"
```

- [ ] **Step 3: Fix styles.css @import paths**

Open `aqus/styles.css`. Every `@import` that pointed to `tokens/` must now point to `src/tokens/`:

```bash
sed -i '' "s|@import './tokens/|@import './src/tokens/|g" /Users/agustinlago/Documents/Projects/aqus/styles.css
```

Verify:
```bash
grep "@import" /Users/agustinlago/Documents/Projects/aqus/styles.css | head -10
```

Expected: all imports read `./src/tokens/...`

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
*.local
.DS_Store
```

- [ ] **Step 5: Verify structure**

```bash
find /Users/agustinlago/Documents/Projects/aqus -not -path "*/node_modules/*" | sort | head -60
```

Expected tree shows `src/components/`, `src/tokens/`, `docs/`, `assets/`, `styles.css`.

- [ ] **Step 6: Initial commit**

```bash
cd /Users/agustinlago/Documents/Projects/aqus
git add .
git commit -m "chore: initial scaffold — extracted from aqus-handoff, restructured into src/ + docs/"
```

---

## Task 2: package.json

**Files:**
- Create: `aqus/package.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@agustin/aqus",
  "version": "0.1.0",
  "description": "Aqus design system — Retro-Aero × Modern React component library",
  "type": "module",
  "main": "./dist/aqus.cjs.js",
  "module": "./dist/aqus.es.js",
  "exports": {
    ".": {
      "import": "./dist/aqus.es.js",
      "require": "./dist/aqus.cjs.js"
    },
    "./styles.css": "./styles.css"
  },
  "files": [
    "dist",
    "src",
    "styles.css",
    "assets/fonts",
    "docs",
    "SKILL.md",
    "_adherence.oxlintrc.json"
  ],
  "sideEffects": ["*.css"],
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/agustinlago/aqus.git"
  },
  "keywords": ["design-system", "react", "aqua", "retro-aero", "component-library"],
  "license": "MIT"
}
```

- [ ] **Step 2: Install dev deps**

```bash
cd /Users/agustinlago/Documents/Projects/aqus && npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add package.json — @agustin/aqus v0.1.0"
```

---

## Task 3: Barrel index.js

**Files:**
- Create: `aqus/src/index.js`

- [ ] **Step 1: Create barrel export**

```js
// Core
export { Button } from './components/core/Button.jsx'
export { IconButton } from './components/core/IconButton.jsx'
export { GlassPanel } from './components/core/GlassPanel.jsx'
export { Card } from './components/core/Card.jsx'
export { Badge } from './components/core/Badge.jsx'
export { Tag } from './components/core/Tag.jsx'
export { Input } from './components/core/Input.jsx'
export { Switch } from './components/core/Switch.jsx'
export { SegmentedControl } from './components/core/SegmentedControl.jsx'
export { ToggleGroup } from './components/core/ToggleGroup.jsx'
export { Spinner } from './components/core/Spinner.jsx'
export { LiquidBubble } from './components/core/LiquidBubble.jsx'
export { Kbd } from './components/core/Kbd.jsx'

// Forms
export { Checkbox } from './components/forms/Checkbox.jsx'
export { Radio } from './components/forms/Radio.jsx'
export { Select } from './components/forms/Select.jsx'
export { Combobox } from './components/forms/Combobox.jsx'
export { MultiSelect } from './components/forms/MultiSelect.jsx'
export { Textarea } from './components/forms/Textarea.jsx'
export { Slider } from './components/forms/Slider.jsx'
export { NumberInput } from './components/forms/NumberInput.jsx'
export { DatePicker } from './components/forms/DatePicker.jsx'
export { ColorPicker } from './components/forms/ColorPicker.jsx'
export { OTPInput } from './components/forms/OTPInput.jsx'
export { SearchInput } from './components/forms/SearchInput.jsx'
export { FileDropzone } from './components/forms/FileDropzone.jsx'

// Feedback
export { Alert } from './components/feedback/Alert.jsx'
export { Banner } from './components/feedback/Banner.jsx'
export { Progress } from './components/feedback/Progress.jsx'
export { ProgressCircle } from './components/feedback/ProgressCircle.jsx'
export { Skeleton } from './components/feedback/Skeleton.jsx'
export { LoadingOverlay } from './components/feedback/LoadingOverlay.jsx'
export { Toast } from './components/feedback/Toast.jsx'
export { Tooltip } from './components/feedback/Tooltip.jsx'
export { Popover } from './components/feedback/Popover.jsx'
export { Dialog } from './components/feedback/Dialog.jsx'
export { Drawer } from './components/feedback/Drawer.jsx'
export { EmptyState } from './components/feedback/EmptyState.jsx'
export { CommandPalette } from './components/feedback/CommandPalette.jsx'

// Navigation
export { Tabs } from './components/navigation/Tabs.jsx'
export { Breadcrumb } from './components/navigation/Breadcrumb.jsx'
export { Menu } from './components/navigation/Menu.jsx'
export { ContextMenu } from './components/navigation/ContextMenu.jsx'
export { Accordion } from './components/navigation/Accordion.jsx'
export { Pagination } from './components/navigation/Pagination.jsx'
export { Stepper } from './components/navigation/Stepper.jsx'

// Data
export { Avatar } from './components/data/Avatar.jsx'
export { Divider } from './components/data/Divider.jsx'
export { Table } from './components/data/Table.jsx'
export { Timeline } from './components/data/Timeline.jsx'
export { TreeView } from './components/data/TreeView.jsx'
export { CodeBlock } from './components/data/CodeBlock.jsx'
export { DescriptionList } from './components/data/DescriptionList.jsx'

// Layout
export { Container } from './components/layout/Container.jsx'
export { Stack } from './components/layout/Stack.jsx'
export { Section } from './components/layout/Section.jsx'
export { Prose } from './components/layout/Prose.jsx'
export { PageHeader } from './components/layout/PageHeader.jsx'
export { HeroSection } from './components/layout/HeroSection.jsx'
export { NavBar } from './components/layout/NavBar.jsx'
export { Footer } from './components/layout/Footer.jsx'

// Content
export { StatCard } from './components/content/StatCard.jsx'
export { FeatureCard } from './components/content/FeatureCard.jsx'
export { FilterBar } from './components/content/FilterBar.jsx'
export { TestimonialCard } from './components/content/TestimonialCard.jsx'
export { BlogCard } from './components/content/BlogCard.jsx'
export { MediaCard } from './components/content/MediaCard.jsx'
export { NotificationItem } from './components/content/NotificationItem.jsx'
export { Carousel } from './components/content/Carousel.jsx'

// Brand
export { Monogram } from './components/brand/Monogram.jsx'
export { Wordmark } from './components/brand/Wordmark.jsx'
```

- [ ] **Step 2: Verify exports resolve**

```bash
cd /Users/agustinlago/Documents/Projects/aqus
node --input-type=module <<'EOF'
import('./src/index.js').then(m => console.log('Exports:', Object.keys(m).length)).catch(e => console.error(e.message))
EOF
```

Expected: `Exports: 71`

If any fail with "does not provide an export named X", open that component file and check its actual export name — fix the barrel line to match.

- [ ] **Step 3: Commit**

```bash
git add src/index.js
git commit -m "feat: add barrel src/index.js — exports all 71 components"
```

---

## Task 4: vite.config.js + build

**Files:**
- Create: `aqus/vite.config.js`

- [ ] **Step 1: Create build config**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Aqus',
      formats: ['es', 'cjs'],
      fileName: (format) => `aqus.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
})
```

- [ ] **Step 2: Build**

```bash
cd /Users/agustinlago/Documents/Projects/aqus && npm run build
```

Expected output in `dist/`:
```
dist/aqus.es.js
dist/aqus.cjs.js
dist/aqus.es.js.map
dist/aqus.cjs.js.map
```

If any component uses `export default` instead of named export, fix it:
```bash
# Find components with only default export
grep -rL "^export function\|^export const\|^export {" src/components --include="*.jsx"
```
For each hit: add named export alongside default, e.g. `export function Button` or `export { Button }` at bottom.

- [ ] **Step 3: Spot-check bundle**

```bash
grep -c "function Button" /Users/agustinlago/Documents/Projects/aqus/dist/aqus.es.js
```

Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add vite.config.js dist/
git commit -m "feat: add vite library build — ESM + CJS in dist/"
```

---

## Task 5: Verify local install

**Files:** No changes.

- [ ] **Step 1: Create throwaway consumer**

```bash
mkdir /tmp/aqus-test && cd /tmp/aqus-test
npm init -y
npm install react react-dom
npm install file:/Users/agustinlago/Documents/Projects/aqus
```

- [ ] **Step 2: Smoke test**

Create `/tmp/aqus-test/test.mjs`:
```js
import { Button, Card, NavBar, Dialog, Stack, EmptyState } from '@agustin/aqus'
const checks = { Button, Card, NavBar, Dialog, Stack, EmptyState }
Object.entries(checks).forEach(([name, fn]) => {
  console.log(`${name}: ${typeof fn === 'function' ? '✓' : '✗ MISSING'}`)
})
```

Run:
```bash
node /tmp/aqus-test/test.mjs
```

Expected: all `✓`. Fix any `✗ MISSING` by tracing barrel → component export name.

- [ ] **Step 3: Clean up**

```bash
rm -rf /tmp/aqus-test
```

---

## Task 6: README.md

**Files:**
- Create: `aqus/README.md`

- [ ] **Step 1: Write README.md**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README — install, how to use, component table, versioning"
```

---

## Task 7: docs/USER_GUIDE.md

**Files:**
- Create: `aqus/docs/USER_GUIDE.md`

- [ ] **Step 1: Write USER_GUIDE.md**

```markdown
# Aqus User Guide

Aqus is a Retro-Aero × Modern React component library. Glass and gloss live only on structural chrome (nav, cards, modals); content stays flat and clean. Depth is earned — every shadow signals real elevation.

---

## Installation

```bash
npm install github:agustinlago/aqus#v0.1.0
```

## Setup

### Global CSS (once, at app root)

```js
import '@agustin/aqus/styles.css'
```

### Accent color (in your root CSS)

```css
:root {
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

Constraints: L must be 0.55–0.72, C must be 0.12–0.24. One accent per project, no hex.

### Dark mode

```html
<html data-theme="dark">
```

### Icons (Phosphor)

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
```

---

## Components

### Core

#### Button
Primary action. Max one `primary` per surface.

```jsx
import { Button } from '@agustin/aqus'

<Button variant="primary" onClick={save}>Save changes</Button>
<Button variant="secondary" icon={<i className="ph ph-plus" />}>New project</Button>
<Button variant="ghost" size="sm">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="primary" pulse>Get started</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `pulse` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `iconRight` | `ReactNode` | — |

#### Card

```jsx
import { Card } from '@agustin/aqus'

<Card>Resting — flat Level 1 surface.</Card>
<Card variant="raised">Level 2 elevated.</Card>
<Card variant="featured">Glass tint + accent glow.</Card>
<Card interactive onClick={open}>Lifts 2px on hover.</Card>
```

#### GlassPanel
Structural glass chrome only — NavBar, modals, drawers, popovers.

```jsx
import { GlassPanel } from '@agustin/aqus'
<GlassPanel>Nav or overlay chrome</GlassPanel>
```

#### Badge

```jsx
import { Badge } from '@agustin/aqus'

<Badge tone="success">Live</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="danger">Failed</Badge>
<Badge tone="accent">New</Badge>
```

#### Tag

```jsx
import { Tag } from '@agustin/aqus'

<Tag onRemove={remove}>React</Tag>
```

#### Input

```jsx
import { Input } from '@agustin/aqus'

<Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
<Input label="Search" icon={<i className="ph ph-magnifying-glass" />} />
<Input label="Name" error="Required" />
```

#### Switch

```jsx
import { Switch } from '@agustin/aqus'

<Switch checked={enabled} onChange={setEnabled} label="Notifications" />
```

#### SegmentedControl
2–4 mutually exclusive options. Prefer over Tabs for compact inline choice.

```jsx
import { SegmentedControl } from '@agustin/aqus'

<SegmentedControl
  value={view}
  onChange={setView}
  options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }]}
/>
```

#### LiquidBubble
Round element primitive. Use instead of `border-radius: 50%`.

```jsx
import { LiquidBubble } from '@agustin/aqus'

<LiquidBubble size={32} color="var(--accent)" />
<LiquidBubble size={12} variant="outline" />
<LiquidBubble size={20} variant="spinner" />
```

---

### Forms

#### Select

```jsx
import { Select } from '@agustin/aqus'

<Select
  label="Workspace"
  value={ws}
  onChange={setWs}
  options={[{ value: 'personal', label: 'Personal' }, { value: 'studio', label: 'Studio' }]}
/>
```

#### Checkbox / Radio

```jsx
import { Checkbox, Radio } from '@agustin/aqus'

<Checkbox checked={agreed} onChange={setAgreed} label="I agree to the terms" />
<Radio value="a" checked={val === 'a'} onChange={() => setVal('a')} label="Option A" />
```

#### Textarea

```jsx
import { Textarea } from '@agustin/aqus'

<Textarea label="Description" value={desc} onChange={e => setDesc(e.target.value)} rows={4} />
```

#### SearchInput

```jsx
import { SearchInput } from '@agustin/aqus'

<SearchInput value={q} onChange={setQ} placeholder="Search projects…" />
```

#### FileDropzone

```jsx
import { FileDropzone } from '@agustin/aqus'

<FileDropzone onFiles={handleFiles} accept=".pdf,.png" label="Drop files here or click to browse" />
```

---

### Feedback

#### Dialog

```jsx
import { Dialog, Button } from '@agustin/aqus'

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  actions={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" pulse onClick={confirm}>Delete</Button>
  </>}
>
  This permanently removes the project and all files.
</Dialog>
```

#### Toast

```jsx
import { Toast } from '@agustin/aqus'

<Toast tone="success" title="Saved" message="Changes published." onClose={dismiss} />
<Toast tone="danger" message="Upload failed — retry?" onClose={dismiss} />
```

#### Alert

```jsx
import { Alert } from '@agustin/aqus'

<Alert tone="warning" title="Heads up">Trial ends in 3 days.</Alert>
```

#### Tooltip

```jsx
import { Tooltip } from '@agustin/aqus'

<Tooltip content="⌘K">
  <IconButton icon={<i className="ph ph-command" />} label="Command palette" />
</Tooltip>
```

#### Drawer

```jsx
import { Drawer } from '@agustin/aqus'

<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right">
  {/* content */}
</Drawer>
```

#### Skeleton

```jsx
import { Skeleton } from '@agustin/aqus'

<Skeleton width={200} height={20} />
<Skeleton variant="circle" size={40} />
```

#### EmptyState

```jsx
import { EmptyState, Button } from '@agustin/aqus'

<EmptyState
  icon={<i className="ph ph-folder-open" />}
  title="No projects yet"
  description="Create your first project to get started."
  action={<Button variant="primary" onClick={create}>New project</Button>}
/>
```

#### CommandPalette

```jsx
import { CommandPalette } from '@agustin/aqus'

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: 'new', label: 'New project', icon: <i className="ph ph-plus" />, onSelect: createProject },
    { id: 'settings', label: 'Open settings', icon: <i className="ph ph-gear" />, onSelect: openSettings },
  ]}
/>
```

---

### Navigation

#### Tabs

```jsx
import { Tabs } from '@agustin/aqus'

const [tab, setTab] = React.useState('overview')
<Tabs
  value={tab}
  onChange={setTab}
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'files', label: 'Files' },
  ]}
/>
```

#### Breadcrumb

```jsx
import { Breadcrumb } from '@agustin/aqus'

<Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: 'Aqus Studio' }]} />
```

#### Pagination

```jsx
import { Pagination } from '@agustin/aqus'

<Pagination page={page} total={120} perPage={10} onChange={setPage} />
```

#### Stepper

```jsx
import { Stepper } from '@agustin/aqus'

<Stepper steps={['Account', 'Profile', 'Review']} current={1} />
```

#### Accordion

```jsx
import { Accordion } from '@agustin/aqus'

<Accordion items={[
  { id: 'a', label: 'What is Aqus?', content: 'A Retro-Aero design system.' },
  { id: 'b', label: 'How to install?', content: 'npm install github:agustinlago/aqus#v0.1.0' },
]} />
```

---

### Data

#### Avatar

```jsx
import { Avatar } from '@agustin/aqus'

<Avatar src="/avatar.jpg" name="Agustin Lago" size="md" />
<Avatar name="AL" size="sm" />
```

#### Table

```jsx
import { Table } from '@agustin/aqus'

<Table
  columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]}
  rows={[{ name: 'Aqus Studio', status: 'Live' }, { name: 'Portfolio', status: 'Draft' }]}
/>
```

#### CodeBlock

```jsx
import { CodeBlock } from '@agustin/aqus'

<CodeBlock language="tsx">{`import { Button } from '@agustin/aqus'`}</CodeBlock>
```

---

### Layout

#### NavBar

```jsx
import { NavBar, Wordmark, Button } from '@agustin/aqus'

<NavBar
  logo={<Wordmark />}
  nav={[{ label: 'Projects', href: '/projects' }, { label: 'Blog', href: '/blog' }]}
  actions={<Button variant="primary" size="sm">Sign in</Button>}
/>
```

#### HeroSection

```jsx
import { HeroSection, Button } from '@agustin/aqus'

<HeroSection
  eyebrow="Available for work"
  title="Agustin Lago"
  subtitle="Product engineer and designer."
  actions={<>
    <Button variant="primary" pulse>View work</Button>
    <Button variant="secondary">Get in touch</Button>
  </>}
/>
```

#### Section / Container / Stack

```jsx
import { Section, Container, Stack } from '@agustin/aqus'

<Section>
  <Container>
    <Stack gap={24}>
      <Card>Item 1</Card>
      <Card>Item 2</Card>
    </Stack>
  </Container>
</Section>
```

#### PageHeader

```jsx
import { PageHeader, Button } from '@agustin/aqus'

<PageHeader
  title="Projects"
  description="All your active work."
  actions={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
/>
```

---

### Content

#### StatCard

```jsx
import { StatCard } from '@agustin/aqus'

<StatCard label="Projects shipped" value="12" delta="+3 this month" />
```

#### FeatureCard

```jsx
import { FeatureCard } from '@agustin/aqus'

<FeatureCard
  icon={<i className="ph ph-lightning" />}
  title="Fast by default"
  description="Built with Vite, ships in milliseconds."
/>
```

---

### Brand

```jsx
import { Monogram, Wordmark } from '@agustin/aqus'

<Monogram size={40} />
<Wordmark size="md" />
```

---

## Design rules

1. **One accent, set in CSS.** Override 9 `--accent-*` tokens in `:root {}`. L: 0.55–0.72, C: 0.12–0.24. Never two brand colors. Never hex.
2. **Glass is structural only.** NavBar, Dialog, Drawer, Popover, GlassPanel — not content.
3. **Round = LiquidBubble.** Never `border-radius: 50%`.
4. **Reference tokens, never literals.** `var(--spacing-4)` not `16px`. `var(--accent)` not `#3b82f6`.
5. **Compose, don't re-style.** Build from Button/Card/Input — never style raw HTML elements.
6. **Elevation matches stacking.** `shadow-xs` = resting, `shadow-sm` = raised, `shadow-glass` = chrome.
7. **Motion conveys physics.** Spring entrances, hover lift, glassy fades. Data views: micro-interactions only.
8. **Copy: sentence case, terse.** No emoji in UI. No hype.
```

- [ ] **Step 2: Commit**

```bash
git add docs/USER_GUIDE.md
git commit -m "docs: add USER_GUIDE.md — full component reference for human consumers"
```

---

## Task 8: docs/AGENT_GUIDE.md

**Files:**
- Create: `aqus/docs/AGENT_GUIDE.md`

- [ ] **Step 1: Write AGENT_GUIDE.md**

```markdown
# Aqus Agent Guide — View Composition Reference

**Purpose:** For Claude and other LLM agents composing React views with Aqus. Read this before building any view, page, or UI section for a project that uses `@agustin/aqus`.

---

## How to use this guide

1. Identify view type (dashboard, landing, form, settings, auth, etc.)
2. Find the matching View Recipe — start there, adapt to content
3. Use Component Catalog for any elements not in the recipe
4. Apply all Constraints — they are hard limits
5. Output complete, importable JSX — no stubs or TODOs

---

## Setup boilerplate

```jsx
// main.jsx or layout root
import '@agustin/aqus/styles.css'
import { Button, Card, NavBar, ... } from '@agustin/aqus'
```

```css
/* Root CSS — override accent for this project */
:root {
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

---

## Component Catalog

### Core

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Button` | Primary action. One `primary` per surface. | `variant` (primary/secondary/ghost/destructive), `size` (sm/md/lg), `pulse`, `icon`, `iconRight` | `<Button variant="primary" pulse>Get started</Button>` |
| `IconButton` | Icon-only action. | `icon`, `label`, `variant`, `size` | `<IconButton icon={<i className="ph ph-gear"/>} label="Settings"/>` |
| `Card` | Content surface. | `variant` (resting/raised/featured), `interactive`, `onClick` | `<Card interactive onClick={open}>Content</Card>` |
| `GlassPanel` | Structural chrome ONLY. Nav/modal/drawer. Never content. | `blur`, `style` | `<GlassPanel>Nav chrome</GlassPanel>` |
| `Badge` | Status or count chip. | `tone` (accent/success/warning/danger/neutral) | `<Badge tone="success">Live</Badge>` |
| `Tag` | Removable metadata label. | `onRemove` | `<Tag onRemove={rm}>React</Tag>` |
| `Input` | Text field. | `label`, `type`, `value`, `onChange`, `icon`, `error` | `<Input label="Email" type="email" value={v} onChange={set}/>` |
| `Switch` | Boolean toggle. | `checked`, `onChange`, `label` | `<Switch checked={on} onChange={set} label="Dark mode"/>` |
| `SegmentedControl` | 2–4 inline exclusive options. Prefer over Tabs for compact choice. | `value`, `onChange`, `options` ({value,label}[]) | `<SegmentedControl value={v} onChange={set} options={[{value:'grid',label:'Grid'},{value:'list',label:'List'}]}/>` |
| `ToggleGroup` | Multi-select toggles. | `value` (string[]), `onChange`, `options` | `<ToggleGroup value={v} onChange={set} options={opts}/>` |
| `Spinner` | Loading indicator. | `size`, `tone` | `<Spinner size="md"/>` |
| `LiquidBubble` | Any circular element. Replaces border-radius:50%. | `size`, `color`, `variant` (filled/outline/spinner) | `<LiquidBubble size={12} color="var(--accent)"/>` |
| `Kbd` | Keyboard shortcut. | `keys` | `<Kbd keys={['⌘','K']}/>` |

### Forms

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Select` | Dropdown, 5+ options. For 2–4 use SegmentedControl. | `label`, `value`, `onChange`, `options` | `<Select label="Role" value={v} onChange={set} options={opts}/>` |
| `Combobox` | Searchable dropdown. | `label`, `value`, `onChange`, `options` | — |
| `MultiSelect` | Multi-choice dropdown. | `label`, `value` (string[]), `onChange`, `options` | — |
| `Checkbox` | Boolean check. | `checked`, `onChange`, `label` | `<Checkbox checked={ok} onChange={set} label="Agree"/>` |
| `Radio` | Single choice from group. | `value`, `checked`, `onChange`, `label` | `<Radio value="a" checked={v==='a'} onChange={()=>set('a')} label="Option A"/>` |
| `Textarea` | Multi-line text. | `label`, `value`, `onChange`, `rows` | `<Textarea label="Bio" value={v} onChange={set} rows={4}/>` |
| `Slider` | Range input. | `label`, `value`, `onChange`, `min`, `max` | — |
| `NumberInput` | Numeric with stepper. | `label`, `value`, `onChange`, `min`, `max` | — |
| `SearchInput` | Search with clear. | `value`, `onChange`, `placeholder` | `<SearchInput value={q} onChange={setQ} placeholder="Search…"/>` |
| `OTPInput` | Code entry. | `length`, `value`, `onChange` | `<OTPInput length={6} value={code} onChange={setCode}/>` |
| `DatePicker` | Date selection. | `label`, `value`, `onChange` | — |
| `FileDropzone` | Drag-and-drop upload. | `onFiles`, `accept`, `label` | `<FileDropzone onFiles={fn} accept=".pdf"/>` |

### Feedback

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Dialog` | Confirmation modal or form. Glass chrome. | `open`, `onClose`, `title`, `actions`, `children` | See View Recipes |
| `Drawer` | Side panel (settings, detail). | `open`, `onClose`, `title`, `side` (left/right) | `<Drawer open={o} onClose={close} title="Settings" side="right">…</Drawer>` |
| `Toast` | Floating notification. | `tone`, `title`, `message`, `onClose` | `<Toast tone="success" title="Saved" onClose={dismiss}/>` |
| `Alert` | Inline contextual message. | `tone`, `title`, `children` | `<Alert tone="warning">Trial ends soon.</Alert>` |
| `Tooltip` | On-hover hint. Wraps trigger. | `content`, `children` | `<Tooltip content="Delete"><IconButton …/></Tooltip>` |
| `Popover` | Click-triggered floating panel. | `trigger`, `content`, `open`, `onClose` | — |
| `Progress` | Linear progress. | `value` (0–100), `label` | `<Progress value={60}/>` |
| `ProgressCircle` | Circular progress. | `value`, `size` | `<ProgressCircle value={75} size={48}/>` |
| `Skeleton` | Loading placeholder. | `width`, `height`, `variant` (rect/circle) | `<Skeleton width={200} height={20}/>` |
| `LoadingOverlay` | Full-surface loading. | `visible`, `message` | `<LoadingOverlay visible={loading}/>` |
| `EmptyState` | Zero-data prompt. | `icon`, `title`, `description`, `action` | See View Recipes |
| `Banner` | Top-of-page announcement. | `tone`, `message`, `onDismiss` | `<Banner tone="accent" message="Update available." onDismiss={fn}/>` |
| `CommandPalette` | ⌘K overlay. | `open`, `onClose`, `items` ({id,label,icon,onSelect}[]) | See View Recipes |

### Navigation

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Tabs` | Section navigation, 3–6 tabs. | `value`, `onChange`, `tabs` ({value,label}[]) | `<Tabs value={t} onChange={set} tabs={tabs}/>` |
| `Breadcrumb` | Page hierarchy. | `items` ({label,href?}[]) | `<Breadcrumb items={[{label:'Home',href:'/'},{label:'Projects'}]}/>` |
| `Menu` | Dropdown actions. | `trigger`, `items` ({label,icon?,onClick}[]) | — |
| `ContextMenu` | Right-click menu. | `trigger`, `items` | — |
| `Accordion` | Collapsible sections. | `items` ({id,label,content}[]) | — |
| `Pagination` | Page navigation. | `page`, `total`, `perPage`, `onChange` | `<Pagination page={p} total={100} perPage={10} onChange={set}/>` |
| `Stepper` | Multi-step flow. | `steps` (string[]), `current` (0-indexed) | `<Stepper steps={['Account','Profile','Done']} current={1}/>` |

### Data

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Avatar` | User image or initials. | `src`, `name`, `size` (sm/md/lg/xl) | `<Avatar name="AL" size="md"/>` |
| `Divider` | Visual separator. | `label`, `orientation` | `<Divider label="Or"/>` |
| `Table` | Tabular data. | `columns` ({key,label}[]), `rows` (object[]) | `<Table columns={cols} rows={data}/>` |
| `Timeline` | Chronological events. | `items` ({date,title,description}[]) | — |
| `TreeView` | Hierarchical data. | `items` (nested) | — |
| `CodeBlock` | Syntax-highlighted code. | `language`, `children` | `<CodeBlock language="tsx">{code}</CodeBlock>` |
| `DescriptionList` | Key-value metadata. | `items` ({label,value}[]) | `<DescriptionList items={[{label:'Status',value:'Live'}]}/>` |

### Layout

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `NavBar` | Top navigation, glass chrome. Once per page. | `logo`, `nav` ({label,href}[]), `actions` | See View Recipes |
| `Footer` | Page footer. | `logo`, `links`, `copyright` | `<Footer logo={<Wordmark/>} links={links}/>` |
| `HeroSection` | Landing/portfolio hero. | `eyebrow`, `title`, `subtitle`, `actions` | See View Recipes |
| `Section` | Page section with rhythm. | `id`, `style` | `<Section id="features">…</Section>` |
| `Container` | Max-width centered wrapper. | `size` (sm/md/lg/full) | `<Container size="lg">…</Container>` |
| `Stack` | Flex column/row with gap. | `gap`, `direction`, `align`, `justify` | `<Stack gap={24} direction="row">…</Stack>` |
| `PageHeader` | Title + desc + actions row. | `title`, `description`, `actions`, `breadcrumb` | `<PageHeader title="Projects" actions={<Button>New</Button>}/>` |
| `Prose` | Long-form text. | `children` | `<Prose><h2>About</h2><p>…</p></Prose>` |

### Content

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `StatCard` | KPI metric. | `label`, `value`, `delta`, `icon` | `<StatCard label="Revenue" value="$12k" delta="+18%"/>` |
| `FeatureCard` | Marketing highlight. | `icon`, `title`, `description` | `<FeatureCard icon={<i className="ph ph-lightning"/>} title="Fast" description="Ships in ms."/>` |
| `FilterBar` | Search + filter row. | `filters`, `value`, `onChange` | — |
| `TestimonialCard` | Quote + attribution. | `quote`, `author`, `role`, `avatar` | — |
| `BlogCard` | Article preview tile. | `title`, `excerpt`, `date`, `href`, `cover` | — |
| `MediaCard` | Image/video + caption. | `src`, `alt`, `caption` | — |
| `NotificationItem` | Notification row. | `title`, `message`, `time`, `read`, `avatar` | — |
| `Carousel` | Horizontal scroll snap. | `items`, `autoPlay` | — |

### Brand

| Component | When to use | Props |
|-----------|-------------|-------|
| `Monogram` | Logo mark. Square contexts. | `size`, `style` |
| `Wordmark` | Full logo. Nav, footer. | `size` (sm/md/lg), `style` |

---

## Page anatomy

```
NavBar  (glass chrome, z-top)
  [Banner — optional]

<main>
  Section → Container → content
  Section → Container → content
</main>

Footer
```

App shell (dashboard):
```
NavBar
Sidebar (Drawer or fixed GlassPanel)
<main>
  PageHeader
  Container → content
</main>
```

---

## View Recipes

### Landing Page

```jsx
import '@agustin/aqus/styles.css'
import {
  NavBar, HeroSection, Section, Container, Stack,
  FeatureCard, Button, Footer, Wordmark, StatCard
} from '@agustin/aqus'

export function LandingPage() {
  return (
    <>
      <NavBar
        logo={<Wordmark />}
        nav={[
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Blog', href: '/blog' },
        ]}
        actions={<Button variant="primary" size="sm">Get in touch</Button>}
      />

      <HeroSection
        eyebrow="Available for select work"
        title="Agustin Lago"
        subtitle="Product engineer and designer building sharp, fast interfaces."
        actions={<>
          <Button variant="primary" pulse>View work</Button>
          <Button variant="secondary">Read the blog</Button>
        </>}
      />

      <Section id="stats">
        <Container>
          <Stack direction="row" gap={24}>
            <StatCard label="Projects shipped" value="12" delta="+3 this year" />
            <StatCard label="Years experience" value="6" />
            <StatCard label="Countries" value="4" />
          </Stack>
        </Container>
      </Section>

      <Section id="features">
        <Container>
          <Stack direction="row" gap={24}>
            <FeatureCard icon={<i className="ph ph-lightning" />} title="Fast" description="Vite-based, ships instantly." />
            <FeatureCard icon={<i className="ph ph-paint-bucket" />} title="Branded" description="One accent, total coherence." />
            <FeatureCard icon={<i className="ph ph-code" />} title="Typed" description="Full TypeScript + d.ts contracts." />
          </Stack>
        </Container>
      </Section>

      <Footer logo={<Wordmark size="sm" />} links={[{ label: 'GitHub', href: 'https://github.com/agustinlago' }]} />
    </>
  )
}
```

### Dashboard View

```jsx
import '@agustin/aqus/styles.css'
import React from 'react'
import {
  NavBar, PageHeader, Section, Container, Stack,
  Card, StatCard, Table, Badge, Button, SearchInput,
  Tabs, Avatar, Skeleton, Wordmark
} from '@agustin/aqus'

export function DashboardView({ user, stats, projects, loading }) {
  const [tab, setTab] = React.useState('all')
  const [q, setQ] = React.useState('')

  return (
    <>
      <NavBar
        logo={<Wordmark />}
        nav={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Projects', href: '/projects' }]}
        actions={<Avatar src={user.avatar} name={user.name} size="sm" />}
      />

      <main>
        <Section>
          <Container>
            <Stack gap={32}>
              <PageHeader
                title={`Good morning, ${user.firstName}.`}
                description="Here's what's happening today."
                actions={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
              />

              <Stack direction="row" gap={16}>
                {loading
                  ? Array(3).fill(0).map((_, i) => <Skeleton key={i} width="100%" height={100} />)
                  : stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />)
                }
              </Stack>

              <Card>
                <Stack gap={16}>
                  <Stack direction="row" gap={12} align="center">
                    <Tabs value={tab} onChange={setTab} tabs={[
                      { value: 'all', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'archived', label: 'Archived' },
                    ]} />
                    <SearchInput value={q} onChange={setQ} placeholder="Find project…" />
                  </Stack>
                  <Table
                    columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'updated', label: 'Updated' }]}
                    rows={projects
                      .filter(p => tab === 'all' || p.status === tab)
                      .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
                      .map(p => ({
                        name: p.name,
                        status: <Badge tone={p.status === 'active' ? 'success' : 'neutral'}>{p.status}</Badge>,
                        updated: p.updatedAt,
                      }))
                    }
                  />
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      </main>
    </>
  )
}
```

### Settings Page

```jsx
import '@agustin/aqus/styles.css'
import React from 'react'
import {
  NavBar, PageHeader, Section, Container, Stack, Card,
  Input, Textarea, Select, Switch, Button, Divider, Alert, Dialog, Wordmark
} from '@agustin/aqus'

export function SettingsPage({ user }) {
  const [name, setName] = React.useState(user.name)
  const [email, setEmail] = React.useState(user.email)
  const [theme, setTheme] = React.useState(user.theme)
  const [notifications, setNotifications] = React.useState(user.notifications)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <>
      <NavBar logo={<Wordmark />} nav={[{ label: 'Dashboard', href: '/dashboard' }]} />
      <main>
        <Section>
          <Container size="md">
            <Stack gap={32}>
              <PageHeader title="Settings" description="Manage your account and preferences." />
              {saved && <Alert tone="success">Changes saved.</Alert>}

              <Card>
                <Stack gap={20}>
                  <h3 style={{ margin: 0, font: 'var(--text-heading-sm)', color: 'var(--text-primary)' }}>Profile</h3>
                  <Input label="Display name" value={name} onChange={e => setName(e.target.value)} />
                  <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <Button variant="primary" onClick={save}>Save profile</Button>
                </Stack>
              </Card>

              <Card>
                <Stack gap={20}>
                  <h3 style={{ margin: 0, font: 'var(--text-heading-sm)', color: 'var(--text-primary)' }}>Preferences</h3>
                  <Select label="Theme" value={theme} onChange={setTheme}
                    options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }]} />
                  <Switch checked={notifications} onChange={setNotifications} label="Email notifications" />
                  <Button variant="secondary" onClick={save}>Save preferences</Button>
                </Stack>
              </Card>

              <Card>
                <Stack gap={16}>
                  <h3 style={{ margin: 0, font: 'var(--text-heading-sm)', color: 'var(--text-primary)' }}>Danger zone</h3>
                  <Divider />
                  <Stack direction="row" align="center" justify="space-between">
                    <Stack gap={4}>
                      <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)', fontWeight: 'var(--weight-medium)' }}>Delete account</span>
                      <span style={{ font: 'var(--text-caption)', color: 'var(--text-secondary)' }}>Permanent — cannot be undone.</span>
                    </Stack>
                    <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete account</Button>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      </main>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account?"
        actions={<>
          <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" pulse onClick={() => { /* delete */ }}>Delete permanently</Button>
        </>}
      >
        This permanently deletes your account and all data. It cannot be undone.
      </Dialog>
    </>
  )
}
```

### Sign In Page

```jsx
import '@agustin/aqus/styles.css'
import React from 'react'
import { Section, Container, Stack, Card, Input, Button, Divider, Wordmark, Badge } from '@agustin/aqus'

export function SignInPage({ onSignIn }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try { await onSignIn(email, password) }
    catch { setError('Invalid email or password.') }
    finally { setLoading(false) }
  }

  return (
    <Section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container size="sm">
        <Stack gap={32} align="center">
          <Wordmark size="lg" />
          <Card style={{ width: '100%', maxWidth: 420 }}>
            <form onSubmit={submit}>
              <Stack gap={20}>
                <Stack gap={4}>
                  <h1 style={{ margin: 0, font: 'var(--text-heading)', color: 'var(--text-primary)' }}>Sign in</h1>
                  <p style={{ margin: 0, font: 'var(--text-body-sm)', color: 'var(--text-secondary)' }}>Welcome back.</p>
                </Stack>
                {error && <Badge tone="danger">{error}</Badge>}
                <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button variant="primary" type="submit" pulse disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Button>
                <Divider label="Or" />
                <Button variant="secondary" icon={<i className="ph ph-github-logo" />} type="button">
                  Continue with GitHub
                </Button>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Container>
    </Section>
  )
}
```

### Empty / Error States

```jsx
import { EmptyState, Button } from '@agustin/aqus'

<EmptyState
  icon={<i className="ph ph-folder-open" />}
  title="No projects yet"
  description="Create your first project to get started."
  action={<Button variant="primary" onClick={create}>New project</Button>}
/>

<EmptyState
  icon={<i className="ph ph-warning-circle" />}
  title="Something went wrong"
  description="Couldn't load projects. Check your connection and try again."
  action={<Button variant="secondary" onClick={retry}>Retry</Button>}
/>

<EmptyState
  icon={<i className="ph ph-compass" />}
  title="Page not found"
  description="This page doesn't exist or has been moved."
  action={<Button variant="primary" href="/">Go home</Button>}
/>
```

---

## Constraints

| Rule | In practice |
|------|-------------|
| One accent | Never two brand colors. Override all 9 `--accent-*` or override none |
| Glass = structural | `GlassPanel` / `NavBar` glass only. `Card` uses flat `surface` |
| Round = LiquidBubble | `<LiquidBubble>` not `borderRadius: '50%'` |
| Tokens not literals | `color: 'var(--text-primary)'` not `'#111'` |
| Elevation matches stacking | `Card` → `shadow-xs`. Raised → `shadow-sm`. Glass chrome → `shadow-glass` |
| Compose, don't re-style | `<Button>` not styled `<button>`. `<Input>` not styled `<input>` |
| One primary Button per surface | One `variant="primary"` per card/modal/section |
| Motion physics only | No ambient animation on data surfaces. Micro-interactions only |
| Copy sentence case | "New project" not "New Project" |
| No emoji in chrome | Phosphor icons only in UI |

## Anti-patterns

```jsx
// ❌
<button style={{ borderRadius: '50%', background: '#3b82f6' }}>+</button>
<div style={{ backdropFilter: 'blur(12px)' }}>Card content</div>
<span style={{ color: '#10b981' }}>Live</span>
<div style={{ borderRadius: '50%', width: 12, height: 12, background: 'var(--accent)' }} />

// ✅
<IconButton icon={<i className="ph ph-plus" />} label="Add" />
<Card>Card content</Card>
<Badge tone="success">Live</Badge>
<LiquidBubble size={12} color="var(--accent)" />
```

---

## Composition process

1. **Identify view type.** Landing / dashboard / settings / auth / detail / form / data table?
2. **Start from matching View Recipe.** Adapt structure, don't build from scratch.
3. **List content requirements.** Data, actions, loading states, empty states, errors.
4. **Map content → components.** Use catalog. Pick the most specific component.
5. **Apply layout hierarchy.** `NavBar` → `main` → `Section` → `Container` → `Stack`.
6. **Handle all states.** Loading → Skeleton/LoadingOverlay. Empty → EmptyState. Error → Alert/EmptyState.
7. **Check constraints.** One primary Button, glass = structural, tokens not literals.
8. **Output complete component.** Full imports, complete JSX, no stubs.
```

- [ ] **Step 2: Commit**

```bash
git add docs/AGENT_GUIDE.md
git commit -m "docs: add AGENT_GUIDE.md — LLM view composition catalog, recipes, constraints"
```

---

## Task 9: Update SKILL.md

**Files:**
- Modify: `aqus/SKILL.md`

- [ ] **Step 1: Replace SKILL.md**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add SKILL.md
git commit -m "docs: update SKILL.md — agent guide reference, npm install from own repo"
```

---

## Task 10: CHANGELOG.md

**Files:**
- Create: `aqus/CHANGELOG.md`

- [ ] **Step 1: Write CHANGELOG.md**

```markdown
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
```

- [ ] **Step 2: Commit + tag v0.1.0**

```bash
git add CHANGELOG.md
git commit -m "chore: add CHANGELOG.md — v0.1.0 initial release"
git tag -a v0.1.0 -m "v0.1.0 — initial library release"
```

---

## Task 11: Push to GitHub

- [ ] **Step 1: Create GitHub repo**

Go to https://github.com/new and create repo `aqus` under `agustinlago`. Public. No README (we have one). No .gitignore (we have one).

- [ ] **Step 2: Add remote and push**

```bash
cd /Users/agustinlago/Documents/Projects/aqus
git remote add origin https://github.com/agustinlago/aqus.git
git push -u origin main
git push origin v0.1.0
```

- [ ] **Step 3: Verify install from GitHub**

```bash
mkdir /tmp/aqus-github-test && cd /tmp/aqus-github-test
npm init -y
npm install react react-dom
npm install github:agustinlago/aqus#v0.1.0
node -e "const a = require('@agustin/aqus'); console.log('Button:', typeof a.Button)"
```

Expected: `Button: function`

- [ ] **Step 4: Clean up**

```bash
rm -rf /tmp/aqus-github-test
```

---

## Self-Review

### Spec coverage

| Requirement | Task |
|-------------|------|
| Own git repo | Task 1, 11 |
| Clean src/ + docs/ structure | Task 1 |
| v0.1.0 semver | Task 2, 10 |
| npm package installable | Task 2–5 |
| All 71 components exported | Task 3 |
| ESM + CJS build | Task 4 |
| Install verified locally | Task 5 |
| README with How to Use | Task 6 |
| USER_GUIDE.md | Task 7 |
| AGENT_GUIDE.md (catalog, recipes, constraints) | Task 8 |
| SKILL.md updated | Task 9 |
| CHANGELOG.md | Task 10 |
| GitHub push + tag | Task 11 |

### Placeholder scan

No TBDs, no "implement later", no "similar to task N". All file contents complete.

### Consistency

- `src/index.js` barrel paths all start `./components/` matching `src/components/` structure
- Component names consistent across barrel, catalog, and all recipe imports
- Install URL `github:agustinlago/aqus#v0.1.0` consistent across README, SKILL.md, USER_GUIDE, CHANGELOG
- All recipes use named imports from `@agustin/aqus` (not default imports)
- Props (`tone`, `variant`, `value`/`onChange`, `open`/`onClose`) consistent across catalog and recipes

---
