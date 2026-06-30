# Aqus Agent Guide — View Composition Reference

**Purpose:** For Claude and other LLM agents composing React views with Aqus. Read this before building any view, page, or UI section for a project that uses `@agustin/aqus`.

---

## How to use this guide

1. Identify view type (dashboard, landing, form, settings, auth, etc.)
2. Find the matching View Recipe — start there, adapt to content
3. Use Component Catalog for any elements not in the recipe
4. Apply all Constraints — they are hard limits
5. Output complete, importable JSX — no stubs or TODOs

**UX decision layer:** `docs/ux-laws.md` translates the 10 Laws of UX into concrete Aqus rules — when to use which component, how to stage complexity, how to place emphasis, and how to make every interaction feel fast. Read it alongside this guide for any non-trivial view.

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
  /* Hue number — MUST match the hue used in --accent below.
     Chart palette (slots 2–8) derives automatically from this via CSS calc(). */
  --accent-h:      255;

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
| `IconButton` | Icon-only action. Icon goes in children. | `variant` (ghost/soft/filled), `size`, `label` (required, a11y) | `<IconButton label="Settings"><i className="ph ph-gear"/></IconButton>` |
| `Card` | Content surface. | `variant` (resting/raised/featured), `interactive`, `onClick` | `<Card interactive onClick={open}>Content</Card>` |
| `GlassPanel` | Structural chrome ONLY. Nav/modal/drawer. Never content. | `as`, `radius` (md/lg/xl/pill), `inset` | `<GlassPanel>Nav chrome</GlassPanel>` |
| `Badge` | Status or count chip. | `tone` (accent/success/warning/danger/neutral) | `<Badge tone="success">Live</Badge>` |
| `Tag` | Removable metadata label. | `onRemove` | `<Tag onRemove={rm}>React</Tag>` |
| `Input` | Text field. | `label`, `type`, `value`, `onChange`, `icon`, `error` | `<Input label="Email" type="email" value={v} onChange={set}/>` |
| `Switch` | Boolean toggle. `onChange(next: boolean)`. No label prop — pair with your own text. | `checked`, `onChange`, `size` | `<Switch checked={on} onChange={set}/>` |
| `SegmentedControl` | 2–4 inline exclusive options. Prefer over Tabs for compact choice. | `value`, `onChange`, `options` ({value,label}[]) | `<SegmentedControl value={v} onChange={set} options={[{value:'grid',label:'Grid'},{value:'list',label:'List'}]}/>` |
| `ToggleGroup` | Multi-select toggles. | `value` (string[]), `onChange`, `options` | `<ToggleGroup value={v} onChange={set} options={opts}/>` |
| `Spinner` | Loading indicator. | `size` (px number), `thickness` | `<Spinner size={20}/>` |
| `LiquidBubble` | Any circular element. Replaces border-radius:50%. `spinner` = animated arc for loading/in-progress states. `filled` = selected/done. `outline` = idle/upcoming. | `size`, `color`, `variant` (filled/outline/spinner) | `<LiquidBubble size={12} color="var(--accent)"/>` |
| `Kbd` / `KbdShortcut` | Single key / key sequence. | `Kbd`: children · `KbdShortcut`: `keys` | `<KbdShortcut keys={['⌘','K']}/>` |

### Forms

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Select` | Dropdown, 5+ options. For 2–4 use SegmentedControl. Hover state uses `--surface-raised` (dark-mode aware). | `label`, `value`, `onChange`, `options` | `<Select label="Role" value={v} onChange={set} options={opts}/>` |
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
| `ColorPicker` | Curated swatch picker. Emits chosen color string via `onChange` — no side effects. | `value`, `onChange(color)`, `options` (hex/{color,name}[]), `size` | `<ColorPicker value={c} onChange={setC} options={swatches}/>` |

### Feedback

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Dialog` | Confirmation modal or form. Glass chrome. | `open`, `onClose`, `title`, `actions`, `children` | See View Recipes |
| `Drawer` | Side panel (settings, detail). | `open`, `onClose`, `title`, `side` (left/right) | `<Drawer open={o} onClose={close} title="Settings" side="right">…</Drawer>` |
| `Toast` | Floating notification. | `tone`, `title`, `message`, `onClose` | `<Toast tone="success" title="Saved" onClose={dismiss}/>` |
| `Alert` | Inline contextual message. | `tone`, `title`, `children` | `<Alert tone="warning">Trial ends soon.</Alert>` |
| `Tooltip` | On-hover hint. Wraps trigger. | `label`, `side`, `children` | `<Tooltip label="Delete"><IconButton …/></Tooltip>` |
| `Popover` | Click-triggered floating panel. Holds interactive content. Pass `zIndex={400}` when trigger lives inside a fixed NavBar so the panel clears the navbar layer (default 200). | `trigger`, `placement`, `offset`, `zIndex`, `children` | `<Popover trigger={<Button>Open</Button>}>…</Popover>` |
| `Progress` | Linear progress. | `value` (0–100), `label` | `<Progress value={60}/>` |
| `ProgressCircle` | Circular progress. | `value`, `size` | `<ProgressCircle value={75} size={48}/>` |
| `Skeleton` | Loading placeholder. | `width`, `height`, `circle` (bool) | `<Skeleton width={200} height={20}/>` |
| `LoadingOverlay` | Full-surface loading. | `show`, `message`, `fullscreen` | `<LoadingOverlay show={loading}/>` |
| `EmptyState` | Zero-data prompt. | `icon`, `title`, `description`, `action` | See View Recipes |
| `Banner` | Top-of-page announcement. Message is children. | `tone`, `action`, `onClose` | `<Banner tone="accent" onClose={fn}>Update available.</Banner>` |
| `CommandPalette` | ⌘K overlay. | `open`, `onClose`, `commands` ({id,label,icon,onSelect}[]) | See View Recipes |

### Navigation

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Tabs` | Section navigation, 3–6 tabs. | `value`, `onChange`, `tabs` ({value,label}[]) | `<Tabs value={t} onChange={set} tabs={tabs}/>` |
| `Breadcrumb` | Page hierarchy. | `items` ({label,value?}[]), `onNavigate` | `<Breadcrumb items={[{label:'Home',value:'/'},{label:'Projects'}]}/>` |
| `Menu` | Dropdown actions. Hover state uses `--surface-raised` (dark-mode aware — adapts automatically in light and dark themes). | `trigger`, `items` ({label,icon?,onClick}[]) | — |
| `ContextMenu` | Right-click menu. Wraps children. | `items`, `children` | — |
| `Accordion` | Collapsible sections. | `items` ({id,title,content}[]) | — |
| `Pagination` | Page navigation. `total` = page count. | `page`, `total`, `onChange`, `siblings` | `<Pagination page={p} total={10} onChange={set}/>` |
| `Stepper` | Multi-step flow. Visuals are automatic: done=filled bubble, current=spinner (animated arc = step in progress), upcoming=outline (muted). | `steps` ({label,description?}[]), `current` (0-indexed), `orientation` (horizontal/vertical) | `<Stepper steps={[{label:'Account'},{label:'Done'}]} current={1}/>` |

### Data

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `Avatar` | User image or initials. | `src`, `name`, `size` (px number), `shape`, `status` | `<Avatar name="AL" size={40}/>` |
| `Divider` | Visual separator. | `label`, `orientation` | `<Divider label="Or"/>` |
| `Table` | Tabular data. | `columns` ({key,label,sortable?,align?}[]), `rows` (object[]) | `<Table columns={cols} rows={data}/>` |
| `Timeline` | Chronological events. | `items` ({title,description,time,status}[]) | — |
| `TreeView` | Hierarchical data. | `nodes` (TreeNode[]), `onSelect` | — |
| `CodeBlock` | Syntax-highlighted code. | `code`, `language`, `showLineNumbers` | `<CodeBlock language="tsx" code={code}/>` |
| `DescriptionList` | Key-value metadata. | `items` ({term,value}[]), `columns` | `<DescriptionList items={[{term:'Status',value:'Live'}]}/>` |

### Layout

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `NavBar` | Top navigation, glass chrome. Once per page. Renders Wordmark itself. Uses the dense 48px blur (`--glass-blur-dense`) so it reads as solid over scrolling content. Mobile-first: links auto-collapse behind a hamburger + glass dropdown (opaque-based, readable) below `compactAt` px (default 720). The `action` slot stays inline — keep it to 1–2 controls so it fits beside the hamburger on phones. | `links` ({href,label}[]), `action`, `activeHref`, `onLinkClick`, `compactAt` | See View Recipes |
| `Footer` | Page footer. Renders Wordmark itself. | `columns` ({title,links}[]), `copyright` | `<Footer columns={cols} copyright="© 2026"/>` |
| `HeroSection` | Landing/portfolio hero. | `eyebrow`, `headline`, `sub`, `cta`, `align` | See View Recipes |
| `Section` | Page section with rhythm. | `size` (sm/md/lg), `horizon` | `<Section size="lg">…</Section>` |
| `Container` | Max-width centered wrapper. | `size` (sm/default/lg/full) | `<Container size="lg">…</Container>` |
| `Stack` | Flex column/row with gap. `gap` = token index 1–8 or CSS string. | `gap`, `direction`, `align`, `justify`, `wrap` | `<Stack gap={5} direction="row">…</Stack>` |
| `PageHeader` | Title + subtitle + action row. | `title`, `subtitle`, `eyebrow`, `action` | `<PageHeader title="Projects" action={<Button>New</Button>}/>` |
| `Prose` | Long-form text. | `children` | `<Prose><h2>About</h2><p>…</p></Prose>` |

### Content

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `StatCard` | KPI metric. Label, big value, and delta stack vertically — delta never wraps or clips no matter how long the value (`$8` or `$204,102`). Don't append your own elements after it expecting inline flow. | `label`, `value`, `delta`, `up` (bool), `icon` | `<StatCard label="Revenue" value="$12k" delta="+18%" up/>` |
| `FeatureCard` | Marketing highlight. | `icon`, `title`, `description` | `<FeatureCard icon={<i className="ph ph-lightning"/>} title="Fast" description="Ships in ms."/>` |
| `FilterBar` | Active filter chip row. | `filters` ({label,tone?}[]), `onRemove`, `onClear` | — |
| `TestimonialCard` | Quote + attribution. | `quote`, `name`, `role`, `avatarSrc`, `avatarInitials` | — |
| `BlogCard` | Article preview tile. | `title`, `excerpt`, `date`, `readTime`, `tags`, `href`, `featured` | — |
| `MediaCard` | Image-first card (product/gallery tile). Equal-height flex column: in a grid it stretches to the tallest card in the row, and `children` pin to the bottom edge — so a row of cards with different title lengths keeps action buttons aligned. Put the action (e.g. "Add to cart" `Button`) in `children`, never as a sibling below the card. | `media`, `title`, `subtitle`, `badge`, `href`, `children` | `<MediaCard media={img} title="Keyboard" subtitle="$129"><Button style={{width:'100%'}}>Add to cart</Button></MediaCard>` |
| `NotificationItem` | Notification row. | `title`, `body`, `time`, `unread`, `avatar`/`icon` | — |
| `Carousel` | Horizontal scroll snap. Arrow navigation smooth-scrolls to item; dots use LiquidBubble (filled, color switches on active). Manual swipe/scroll also advances dots with no flicker. | `children`, `itemWidth`, `gap`, `showArrows`, `showDots` | — |

### Brand

| Component | When to use | Props |
|-----------|-------------|-------|
| `Monogram` | Logo mark. Square contexts. | `size` (px number), `letter`, `animate` |
| `Wordmark` | Full logo. Nav, footer. | `size` (px number), `color`, `animate` |

### Charts

> `charts.css` tokens are included automatically via `@agustin/aqus/styles.css`. No separate import. Charts are pure SVG — no external chart library dependency.

> **Tooltips:** All chart tooltips portal to `document.body` via `ReactDOM.createPortal`. They are never clipped by `overflow:hidden` parents or trapped by ancestor `transform` properties.

| Component | When to use | Key props | Minimal example |
|-----------|-------------|-----------|-----------------|
| `BarChart` | Grouped or stacked bar comparison. `stacked` collapses series into single column. | `data` ({x, …keys}[]), `series` ({key,label,color?}[]), `height`, `stacked`, `showGrid`, `showLegend`, `yTicks`, `valueFormat` | `<BarChart data={data} series={[{key:'v',label:'Value'}]} height={240}/>` |
| `LineChart` | Time-series or trend. `area` adds gradient fill beneath line. Smooth Catmull-Rom curves. Animated liquid blob at each series' latest point. | `data` ({x, …keys}[]), `series` ({key,label,color?}[]), `height`, `area`, `smooth`, `showGrid`, `showLegend`, `valueFormat` | `<LineChart data={data} series={series} height={240} area/>` |
| `DonutChart` | Proportional ring. `morph` animates ring shape via `agus-liquid`. Hover highlights segment + shows tooltip. | `data` ({label,value,color?}[]), `size`, `thickness`, `gap`, `morph`, `centerValue`, `centerLabel`, `showLegend`, `valueFormat` | `<DonutChart data={data} size={200} centerValue="$12k" centerLabel="revenue"/>` |
| `Sparkline` | Tiny inline trend — no axes, no labels. For table cells, StatCards, summary rows. | `data` (number[]), `width`, `height`, `color` | `<Sparkline data={[10,18,14,24,30]} width={120} height={32}/>` |
| `ChartLegend` | Standalone legend row. Charts render their own legend when `showLegend` is true — use this only when composing a custom layout with multiple charts sharing one legend. | `series` ({key,label,color?}[]) | `<ChartLegend series={series}/>` |

**`CHART_PALETTE`** — exported array of 8 OKLCH color strings keyed to `--chart-1` through `--chart-8`. `--chart-1` always resolves to `--accent`. Use it when you need to manually match a chart's colors in custom UI:

```jsx
import { CHART_PALETTE } from '@agustin/aqus'
// CHART_PALETTE[0] === 'var(--chart-1)' (accent)
```

**Data shape:**

```js
// BarChart / LineChart — row per x-tick, one key per series
const data = [
  { x: 'Jan', revenue: 12000, costs: 8000 },
  { x: 'Feb', revenue: 15000, costs: 9000 },
]
const series = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'costs',   label: 'Costs', color: 'var(--chart-3)' },
]

// DonutChart — flat segments
const data = [
  { label: 'US', value: 52 },
  { label: 'EU', value: 30 },
  { label: 'APAC', value: 18 },
]

// Sparkline — raw numbers, newest last
const data = [10, 14, 12, 20, 18, 26]
```

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
  FeatureCard, Button, Footer, StatCard
} from '@agustin/aqus'

export function LandingPage() {
  return (
    <>
      <NavBar
        links={[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'About' },
          { href: '/blog', label: 'Blog' },
        ]}
        activeHref="#work"
        action={<Button variant="primary" size="sm">Get in touch</Button>}
      />

      <HeroSection
        eyebrow="Available for select work"
        headline="Agustin Lago"
        sub="Product engineer and designer building sharp, fast interfaces."
        cta={<>
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

      <Footer
        columns={[{ title: 'Links', links: [{ label: 'GitHub', href: 'https://github.com/LagoJournal' }] }]}
        copyright="© 2026 Agustin Lago"
      />
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
  Tabs, Avatar, Skeleton
} from '@agustin/aqus'

export function DashboardView({ user, stats, projects, loading }) {
  const [tab, setTab] = React.useState('all')
  const [q, setQ] = React.useState('')

  return (
    <>
      <NavBar
        links={[{ href: '/dashboard', label: 'Dashboard' }, { href: '/projects', label: 'Projects' }]}
        activeHref="/dashboard"
        action={<Avatar src={user.avatar} name={user.name} size={34} />}
      />

      <main>
        <Section>
          <Container>
            <Stack gap={32}>
              <PageHeader
                title={`Good morning, ${user.firstName}.`}
                subtitle="Here's what's happening today."
                action={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
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
  Input, Textarea, Select, Switch, Button, Divider, Alert, Dialog
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
      <NavBar links={[{ href: '/dashboard', label: 'Dashboard' }]} activeHref="/dashboard" />
      <main>
        <Section>
          <Container size="default">
            <Stack gap={32}>
              <PageHeader title="Settings" subtitle="Manage your account and preferences." />
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
                  <Stack direction="row" align="center" justify="space-between">
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-primary)' }}>Email notifications</span>
                    <Switch checked={notifications} onChange={setNotifications} />
                  </Stack>
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
          <Wordmark size={72} />
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

### Analytics / Charts View

```jsx
import '@agustin/aqus/styles.css'
import React from 'react'
import {
  NavBar, Section, Container, Stack, Card, StatCard,
  Divider, Badge, SegmentedControl,
  LineChart, BarChart, DonutChart, Sparkline,
} from '@agustin/aqus'

const TREND = [
  { x: 'Jan', arr: 42000, churn: 3200 },
  { x: 'Feb', arr: 48000, churn: 2900 },
  { x: 'Mar', arr: 53000, churn: 3100 },
  { x: 'Apr', arr: 61000, churn: 2700 },
  { x: 'May', arr: 70000, churn: 2400 },
  { x: 'Jun', arr: 82000, churn: 2100 },
]
const TREND_SERIES = [
  { key: 'arr', label: 'ARR' },
  { key: 'churn', label: 'Churn' },
]

const CHANNELS = [
  { x: 'Q1', organic: 400, paid: 260, referral: 140 },
  { x: 'Q2', organic: 520, paid: 310, referral: 180 },
  { x: 'Q3', organic: 480, paid: 280, referral: 220 },
  { x: 'Q4', organic: 640, paid: 360, referral: 260 },
]
const CHANNEL_SERIES = [
  { key: 'organic', label: 'Organic' },
  { key: 'paid',    label: 'Paid' },
  { key: 'referral',label: 'Referral' },
]

const REVENUE_MIX = [
  { label: 'Enterprise', value: 58 },
  { label: 'Growth',     value: 27 },
  { label: 'Starter',    value: 15 },
]

export function AnalyticsView() {
  const [barMode, setBarMode] = React.useState('grouped')

  return (
    <>
      <NavBar
        links={[{ href: '/dashboard', label: 'Dashboard' }, { href: '/analytics', label: 'Analytics' }]}
        activeHref="/analytics"
      />
      <Section>
        <Container>
          <Stack gap={5}>

            {/* KPI row with sparklines */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'ARR', value: '$82k', delta: '+18%', up: true, spark: [42,48,53,61,70,82] },
                { label: 'MRR', value: '$6.8k', delta: '+12%', up: true, spark: [5.2,5.6,5.9,6.1,6.4,6.8] },
                { label: 'Churn', value: '2.1%', delta: '-0.3%', up: true, spark: [3.2,2.9,3.1,2.7,2.4,2.1] },
                { label: 'NPS', value: '68', delta: '+5', up: true, spark: [52,55,58,61,64,68] },
              ].map((k) => (
                <Card key={k.label} variant="resting" style={{ padding: 16 }}>
                  <Stack gap={2}>
                    <StatCard label={k.label} value={k.value} delta={k.delta} up={k.up} />
                    <Sparkline data={k.spark} width="100%" height={28} />
                  </Stack>
                </Card>
              ))}
            </div>

            {/* Revenue trend + mix */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <Stack direction="row" justify="space-between" align="center">
                    <strong>ARR vs churn</strong>
                    <Badge tone="success" dot>Live</Badge>
                  </Stack>
                  <Divider />
                  <LineChart data={TREND} series={TREND_SERIES} height={220} area valueFormat={(v) => `$${(v/1000).toFixed(0)}k`} />
                </Stack>
              </Card>

              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <strong>Revenue mix</strong>
                  <Divider />
                  <DonutChart
                    data={REVENUE_MIX}
                    size={160}
                    thickness={22}
                    centerValue="$82k"
                    centerLabel="ARR"
                    valueFormat={(v) => `${v}%`}
                  />
                </Stack>
              </Card>
            </div>

            {/* Acquisition by channel */}
            <Card variant="resting" style={{ padding: 20 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong>Acquisition by channel</strong>
                  <SegmentedControl
                    size="sm"
                    value={barMode}
                    onChange={setBarMode}
                    options={[{ value: 'grouped', label: 'Grouped' }, { value: 'stacked', label: 'Stacked' }]}
                  />
                </Stack>
                <Divider />
                <BarChart
                  data={CHANNELS}
                  series={CHANNEL_SERIES}
                  height={220}
                  stacked={barMode === 'stacked'}
                  valueFormat={(v) => `${v}`}
                />
              </Stack>
            </Card>

          </Stack>
        </Container>
      </Section>
    </>
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

## Mobile-first design flag

**Before writing any JSX, you must know the viewport target.** If the prompt does not specify, stop and ask:

> "Is this mobile-first, desktop-first, or should it be fully responsive (both)?"

Do not assume. A dashboard built for a wide monitor and a settings page built for a phone require completely different grid decisions. Getting this wrong upfront means broken layouts that can't be patched without rewriting structure.

### Layout planning step (required before coding)

Write a brief layout intent block before the first line of JSX:

```
Viewport target: responsive (mobile-first → desktop)
Structure:
  NavBar (sticky)
  Section → Container(lg)
    PageHeader
    Grid: 4 StatCards — repeat(auto-fit, minmax(180px, 1fr))
    Grid: main(2fr) + sidebar(1fr) — collapses to 1-col on narrow
    Table inside Card — horizontal scroll on narrow
Footer
Breakpoint strategy:
  - 4-col stat grid collapses when columns < 180px (auto-fit handles it)
  - 2-col layout uses minmax(0,1fr) to avoid overflow
  - Stack direction="row" wrap on all action rows
```

This takes 30 seconds and prevents every layout bug below.

### Layout rules — never break these

| Rule | Why | Pattern |
|------|-----|---------|
| Never fixed pixel column widths | Overflows on narrow viewports | `minmax(0, 1fr)` or `auto-fit` |
| Always `minmax(0, 1fr)` in grids | `1fr` without `minmax(0,...)` allows child overflow | `gridTemplateColumns: 'repeat(N, minmax(0, 1fr))'` |
| `wrap` on every `Stack direction="row"` with 3+ items | Items overflow or get squashed | `<Stack direction="row" wrap gap={2}>` |
| Max 4 columns on desktop, 2 on tablet, 1 on mobile | Overcrowding causes clutter | Use `auto-fit` or explicit media breakpoints |
| `min-width: 0` on flex/grid children with text | Long text breaks out of containers | `style={{ minWidth: 0 }}` on text-bearing children |
| No `overflow: hidden` on text containers | Clips content on narrow screens | Only use on media/image wrappers |
| Charts always inside a `Card` or fixed-width parent | SVG needs bounded width | `<Card style={{ padding: 20 }}><LineChart /></Card>` |
| Horizontal action rows use `wrap` | Buttons overflow on mobile | `<Stack direction="row" gap={2} wrap>` |
| Form fields stack vertically | Side-by-side inputs break on mobile | `<Stack gap={3}>` not `direction="row"` (unless explicitly wide) |
| Two-column layouts use `2fr 1fr` not fixed px | Fixed px sidebar overflows narrow | `gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)'` |

### Responsive grid patterns

```jsx
// ✅ auto-collapses to 1-col when space runs out
style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}

// ✅ explicit N-col that won't overflow children
style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}

// ✅ two-column with overflow-safe children
style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24 }}

// ❌ fixed pixel columns
style={{ display: 'grid', gridTemplateColumns: '320px 320px 320px' }}

// ❌ 1fr without minmax — children can overflow
style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
```

### Density rules

| Surface | Max cols | Notes |
|---------|----------|-------|
| StatCard row | 4 | Use `auto-fit minmax(180px, 1fr)` |
| Product/media grid | 3 | `auto-fit minmax(220px, 1fr)` |
| Feature cards | 3 | `auto-fit minmax(200px, 1fr)` |
| Two-column layout | 2 | `2fr 1fr` — no 3-column content layouts |
| Form fields inline | 2 max | Only short fields (expiry + CVV). Otherwise stack |
| NavBar links | 6 max | More → move to Drawer or Tabs |

---

## Layout & visual composition

> Full UX laws reference with per-component rules: `docs/ux-laws.md`. The sections below summarize the structural decisions — see ux-laws for the *why* behind each rule.

**Non-negotiables (from ux-laws.md):**
1. Convention over novelty — liquid shapes, familiar behavior. Never repurpose components.
2. One accent per surface — emphasis is scarce; one primary action per view.
3. Reduce, then absorb — cut choices first; let the system carry what remains.
4. Speed is a feature — visible feedback under 400ms, always.

Layout is decided *before* component choice. A view that uses every right component but spaces them wrong reads as broken. Work in this order: **wireframe → rhythm → hierarchy → component fill.**

### 1. Wireframe first (blocks, not components)

Sketch the page as labelled rectangles before writing JSX. Name each block's job and its width behaviour. Example for a dashboard:

```
┌─────────────────────────────────────────────┐
│ NavBar                            (full, sticky)│
├─────────────────────────────────────────────┤
│ PageHeader: title + action     (full)         │
├──────────────┬──────────────┬───────────────┤
│ StatCard     │ StatCard     │ StatCard  …    │  ← KPI strip (auto-fit, equal)
├──────────────┴──────────────┴───────────────┤
│ ┌─────────────────────────┐ ┌─────────────┐ │
│ │ Primary chart (2fr)     │ │ Side (1fr)  │ │  ← .sc-split, stacks <820px
│ └─────────────────────────┘ └─────────────┘ │
└─────────────────────────────────────────────┘
```

Rules for the wireframe:
- **One job per block.** A block is a header, a metric strip, a primary surface, or a sidebar — not a mix.
- **Declare each block's width behaviour** (full / auto-fit / 2fr+1fr / fixed-max) in the sketch. This is where overflow bugs are prevented.
- **Max one "hero" block per screen** — the single thing the eye should hit first (largest chart, headline, primary metric).

### 2. Rhythm (spacing scale)

Use the spacing scale, never arbitrary px. Consistent gaps are what make a layout read as "designed."

| Context | Gap | Token |
|---------|-----|-------|
| Inside a control (icon ↔ label) | 6–8px | `gap={1}`–`gap={2}` |
| Related items in a card (label ↔ value) | 8–12px | `gap={2}`–`gap={3}` |
| Between cards in a grid | 16–24px | `gap: 16–24` / `gap={4}`–`gap={5}` |
| Between major sections | 32–48px | `Stack gap={5}`–`gap={6}` / `Section` |

- **One gap value per axis per container.** Don't mix `gap={2}` and `gap={5}` siblings in one Stack — split into nested Stacks.
- **Padding ≥ gap.** A card's inner padding (16–24px) should be ≥ the gap between cards, so cards never feel tighter inside than between.
- **Vertical rhythm > horizontal cramming.** When unsure, stack with breathing room rather than packing a row.

### 3. Visual hierarchy — "eye rules"

The eye is pulled by, in order: **size → weight → colour → position.** Use them deliberately and sparingly.

- **Size:** one dominant element per surface. The big number on a StatCard, the headline in a hero. If everything is big, nothing is.
- **Weight:** `--weight-extra`/`800` for the one thing that matters; `--weight-medium` for labels; regular for body. Never bold a whole paragraph.
- **Colour = meaning, not decoration.** Accent marks the primary action / active state. `--success`/`--danger` only for real status. Muted (`--text-muted`) for supporting text. A surface with three accent elements has none.
- **Position:** top-left is read first (LTR), bottom-right is where the eye exits — put the primary action bottom-right of a dialog, top-right of a header.
- **Alignment creates calm.** Left-align text blocks; align numbers right in tables; give every item in a row a shared baseline or centre line. Ragged alignment reads as broken even when spacing is correct.
- **Contrast pairs.** Pair one loud element with quiet neighbours. A featured Card works because the resting cards around it are plain.

### 4. Grid & alignment rules (prevent the common breakages)

| Symptom | Cause | Fix |
|---------|-------|-----|
| Cards in a row have misaligned buttons | Unequal heights, action placed *after* the card | Equal-height cards (grid `align-items: stretch`, card `height:100%` flex column), action **inside** the card pinned to bottom (`marginTop:auto`) |
| A sliver of the next card peeks at the edge | Card content min-width exceeds its grid track and overflows | `minWidth: 0` on text children, wrap badge/stat rows, move dense stats to their own row below the header |
| Long value clips or wraps weirdly | Value + sibling share one baseline row | Stack the secondary element below the value; `whiteSpace: nowrap` on chips/deltas |
| Table runs off-screen on mobile | Fixed multi-column table in a narrow card | Wrap the table in `overflow-x: auto` |
| Dropdown hides behind a dialog | Floating layer below modal layer | Library handles this — floating panels are z 600, above the 500 modal tier. Don't hand-set lower z on menus inside dialogs |

### 5. Z-index tiers (don't fight them)

```
content        0–99
sticky NavBar  300
modal backdrop 500   Dialog · Drawer · LoadingOverlay · CommandPalette
floating       600   Select · Menu · Combobox · Tooltip · Popover · DatePicker
toast/portal   9999  app-level toast stacks you mount yourself
```

Menus and selects sit **above** modals on purpose, so a dropdown opened inside a Dialog is never clipped. Mount your own toast stack at `position: fixed; z-index: 9999` and portal it to `document.body`.

### 6. Glass nesting — opaque base for panels inside chrome

`backdrop-filter` only frosts the page when the element is composited against it. A glass panel nested **inside** another element that already has a `backdrop-filter` (e.g. a dropdown rendered inside the glass NavBar) cannot frost the page behind it — so a translucent base lets content bleed through and the menu becomes unreadable.

- Panels that **portal to `document.body`** (Select, Menu, Combobox, Popover, Tooltip) can stay translucent — their backdrop-filter works.
- Panels rendered **inside** glass chrome (NavBar dropdown) use an **opaque surface base** (`var(--surface)`) with the gloss + accent film on top, so they look glassy but never bleed. The library's NavBar already does this; follow the same rule for any custom panel nested in glass.

**CSS gotcha — color only in the final `background` layer.** A `<color>` is valid *only* as the last layer of the `background` shorthand. A bare color token in a middle layer makes the **whole declaration invalid** and the element renders with *no* background (transparent). Wrap any mid-stack tint as a flat gradient:

```js
// ❌ invalid — accent-glass is a color in a non-final layer → whole rule dropped
background: 'linear-gradient(...gloss...), var(--accent-glass), var(--surface)'
// ✅ valid — tint as a gradient (image) layer, opaque color last
background: 'linear-gradient(...gloss...), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--surface)'
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
| Chart colors follow accent hue | Set `--accent-h` to the accent hue number. Slots 2–8 auto-derive at 45° steps via CSS `calc()`. Never hardcode chart hues — they must shift with the accent |
| Mobile target required | State viewport target before writing JSX. Ask if not specified |
| Plan layout before coding | Write layout intent (grid structure + breakpoint strategy) before first JSX line |

## Anti-patterns

```jsx
// ❌
<button style={{ borderRadius: '50%', background: '#3b82f6' }}>+</button>
<div style={{ backdropFilter: 'blur(12px)' }}>Card content</div>
<span style={{ color: '#10b981' }}>Live</span>
<div style={{ borderRadius: '50%', width: 12, height: 12, background: 'var(--accent)' }} />

// ✅
<IconButton label="Add"><i className="ph ph-plus" /></IconButton>
<Card>Card content</Card>
<Badge tone="success">Live</Badge>
<LiquidBubble size={12} color="var(--accent)" />
```

---

## Composition process

1. **Confirm viewport target.** Mobile-first / desktop / responsive. If not stated in the prompt → ask before proceeding.
2. **Write layout intent.** Grid structure, column counts, breakpoint strategy — before any JSX. 30 seconds now prevents full rewrites later.
3. **Identify view type.** Landing / dashboard / settings / auth / detail / form / data table?
4. **Start from matching View Recipe.** Adapt structure, don't build from scratch.
5. **List content requirements.** Data, actions, loading states, empty states, errors.
6. **Map content → components.** Use catalog. Pick the most specific component.
7. **Apply layout hierarchy.** `NavBar` → `main` → `Section` → `Container` → `Stack`.
8. **Handle all states.** Loading → Skeleton/LoadingOverlay. Empty → EmptyState. Error → Alert/EmptyState.
9. **Check constraints.** One primary Button, glass = structural, tokens not literals, `--accent-h` set if using charts, no fixed pixel grid columns, `wrap` on row Stacks.
10. **Output complete component.** Full imports, complete JSX, no stubs.

### UX laws checklist (run before shipping any view)

- [ ] Conventional patterns; liquid shapes don't change behavior *(Jakob)*
- [ ] Targets ≥ 44px, spaced ≥ 8px; primary action reachable *(Fitts)*
- [ ] One primary action per view; choices minimized or staged *(Hick)*
- [ ] Body chunked into groups of 5–9 with `Card`/`Divider`/whitespace boundaries *(Miller)*
- [ ] Forgiving input (trim/normalize); empty + loading + error + success states all designed *(Postel)*
- [ ] Delight concentrated at the peak moment and the final confirmation; middle is calm *(Peak–End)*
- [ ] Visual bar held everywhere; beauty doesn't mask a broken flow *(Aesthetic–Usability)*
- [ ] Exactly one emphasized element per region; emphasis pairs color with icon/weight *(Von Restorff)*
- [ ] Irreducible complexity absorbed by the system (smart defaults, filters, CommandPalette) *(Tesler)*
- [ ] Every action has visible feedback < 400ms; latency covered by Skeleton/Spinner/optimistic UI *(Doherty)*
