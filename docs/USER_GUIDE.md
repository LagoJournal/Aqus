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
`onChange` is called with the next boolean. No built-in label — pair with your own text.

```jsx
import { Switch } from '@agustin/aqus'

<Switch checked={enabled} onChange={setEnabled} />
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

<Tooltip label="⌘K">
  <IconButton label="Command palette"><i className="ph ph-command" /></IconButton>
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
<Skeleton circle height={40} />
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
  commands={[
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

<Breadcrumb items={[{ label: 'Projects', value: '/projects' }, { label: 'Aqus Studio' }]} />
```

#### Pagination
`total` is the page count (not row count). `page` is 1-indexed.

```jsx
import { Pagination } from '@agustin/aqus'

<Pagination page={page} total={12} onChange={setPage} />
```

#### Stepper

```jsx
import { Stepper } from '@agustin/aqus'

<Stepper steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Review' }]} current={1} />
```

#### Accordion

```jsx
import { Accordion } from '@agustin/aqus'

<Accordion items={[
  { id: 'a', title: 'What is Aqus?', content: 'A Retro-Aero design system.' },
  { id: 'b', title: 'How to install?', content: 'npm install github:agustinlago/aqus#v0.1.0' },
]} />
```

---

### Data

#### Avatar

```jsx
import { Avatar } from '@agustin/aqus'

<Avatar src="/avatar.jpg" name="Agustin Lago" size={40} />
<Avatar name="AL" size={32} status="online" />
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

<CodeBlock language="tsx" code={`import { Button } from '@agustin/aqus'`} />
```

---

### Layout

#### NavBar
Renders the Wordmark automatically. Pass `links`, an `action` node, and `activeHref`.

```jsx
import { NavBar, Button } from '@agustin/aqus'

<NavBar
  links={[{ href: '/projects', label: 'Projects' }, { href: '/blog', label: 'Blog' }]}
  activeHref="/projects"
  action={<Button variant="primary" size="sm">Sign in</Button>}
/>
```

#### HeroSection

```jsx
import { HeroSection, Button } from '@agustin/aqus'

<HeroSection
  eyebrow="Available for work"
  headline="Agustin Lago"
  sub="Product engineer and designer."
  cta={<>
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
  subtitle="All your active work."
  action={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
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
<Wordmark size={40} />
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
