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
| `LiquidBubble` | Any circular element. Replaces border-radius:50%. `spinner` variant = loading/async state only — never use it to indicate "active" or "current". | `size`, `color`, `variant` (filled/outline/spinner) | `<LiquidBubble size={12} color="var(--accent)"/>` |
| `Kbd` / `KbdShortcut` | Single key / key sequence. | `Kbd`: children · `KbdShortcut`: `keys` | `<KbdShortcut keys={['⌘','K']}/>` |

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
| `Menu` | Dropdown actions. | `trigger`, `items` ({label,icon?,onClick}[]) | — |
| `ContextMenu` | Right-click menu. Wraps children. | `items`, `children` | — |
| `Accordion` | Collapsible sections. | `items` ({id,title,content}[]) | — |
| `Pagination` | Page navigation. `total` = page count. | `page`, `total`, `onChange`, `siblings` | `<Pagination page={p} total={10} onChange={set}/>` |
| `Stepper` | Multi-step flow. Visuals are automatic: done=filled bubble, current=outline (pulsing), upcoming=outline (muted). | `steps` ({label,description?}[]), `current` (0-indexed), `orientation` (horizontal/vertical) | `<Stepper steps={[{label:'Account'},{label:'Done'}]} current={1}/>` |

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
| `NavBar` | Top navigation, glass chrome. Once per page. Renders Wordmark itself. | `links` ({href,label}[]), `action`, `activeHref`, `onLinkClick` | See View Recipes |
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
| `StatCard` | KPI metric. | `label`, `value`, `delta`, `up` (bool), `icon` | `<StatCard label="Revenue" value="$12k" delta="+18%" up/>` |
| `FeatureCard` | Marketing highlight. | `icon`, `title`, `description` | `<FeatureCard icon={<i className="ph ph-lightning"/>} title="Fast" description="Ships in ms."/>` |
| `FilterBar` | Active filter chip row. | `filters` ({label,tone?}[]), `onRemove`, `onClear` | — |
| `TestimonialCard` | Quote + attribution. | `quote`, `name`, `role`, `avatarSrc`, `avatarInitials` | — |
| `BlogCard` | Article preview tile. | `title`, `excerpt`, `date`, `readTime`, `tags`, `href`, `featured` | — |
| `MediaCard` | Image-first card. | `media`, `title`, `subtitle`, `badge`, `href` | — |
| `NotificationItem` | Notification row. | `title`, `body`, `time`, `unread`, `avatar`/`icon` | — |
| `Carousel` | Horizontal scroll snap. | `children`, `itemWidth`, `showArrows`, `showDots` | — |

### Brand

| Component | When to use | Props |
|-----------|-------------|-------|
| `Monogram` | Logo mark. Square contexts. | `size` (px number), `letter`, `animate` |
| `Wordmark` | Full logo. Nav, footer. | `size` (px number), `color`, `animate` |

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
<IconButton label="Add"><i className="ph ph-plus" /></IconButton>
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
