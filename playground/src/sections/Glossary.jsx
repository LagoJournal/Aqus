import React from 'react'
import {
  Section, Container, Card, Stack, SearchInput, Badge,
  // charts
  BarChart, LineChart, DonutChart, Sparkline,
  // core
  Button, IconButton, GlassPanel, Tag, Input, Switch, SegmentedControl,
  ToggleGroup, Spinner, LiquidBubble, Kbd,
  // forms
  Checkbox, Radio, Select, Combobox, MultiSelect, Textarea, Slider,
  NumberInput, DatePicker, ColorPicker, OTPInput, FileDropzone,
  // feedback
  Alert, Banner, Progress, ProgressCircle, Skeleton, LoadingOverlay,
  Toast, Tooltip, Popover, Dialog, Drawer, EmptyState, CommandPalette,
  // navigation
  Tabs, Breadcrumb, Menu, ContextMenu, Accordion, Pagination, Stepper,
  // data
  Avatar, Divider, Table, Timeline, TreeView, CodeBlock, DescriptionList,
  // layout
  PageHeader, NavBar, Stack as StackComp, Prose,
  // content
  StatCard, FeatureCard, FilterBar, TestimonialCard, BlogCard, MediaCard,
  NotificationItem, Carousel,
  // brand
  Monogram, Wordmark,
} from '@agustin/aqus'

/* ---------- stateful preview wrappers ---------- */

function SwitchDemo() {
  const [on, setOn] = React.useState(true)
  return <Switch checked={on} onChange={setOn} label="Notifications" />
}
function SegmentedDemo() {
  const [v, setV] = React.useState('grid')
  return <SegmentedControl size="sm" value={v} onChange={setV}
    options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }]} />
}
function ToggleDemo() {
  const [v, setV] = React.useState('b')
  return <ToggleGroup size="sm" value={v} onChange={setV}
    options={[{ value: 'a', label: 'Day' }, { value: 'b', label: 'Week' }, { value: 'c', label: 'Month' }]} />
}
function CheckboxDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return <Stack gap={2}><Checkbox checked={a} onChange={setA} label="Email me" /><Checkbox checked={b} onChange={setB} label="SMS me" /></Stack>
}
function RadioDemo() {
  const [v, setV] = React.useState('a')
  return <Stack gap={2}>
    <Radio name="r" value="a" checked={v === 'a'} onChange={() => setV('a')} label="Personal" />
    <Radio name="r" value="b" checked={v === 'b'} onChange={() => setV('b')} label="Studio" />
  </Stack>
}
function SelectDemo() {
  const [v, setV] = React.useState('personal')
  return <Select label="Workspace" value={v} onChange={setV}
    options={[{ value: 'personal', label: 'Personal' }, { value: 'studio', label: 'Studio' }]} />
}
function ComboboxDemo() {
  const [v, setV] = React.useState('')
  return <Combobox label="Framework" value={v} onChange={setV} placeholder="Search…"
    options={['React', 'Vue', 'Svelte', 'Solid', 'Astro']} />
}
function MultiSelectDemo() {
  const [v, setV] = React.useState(['react'])
  return <MultiSelect label="Stack" value={v} onChange={setV} placeholder="Pick…"
    options={[{ value: 'react', label: 'React' }, { value: 'ts', label: 'TypeScript' }, { value: 'vite', label: 'Vite' }]} />
}
function SliderDemo() {
  const [v, setV] = React.useState(60)
  return <Slider label="Opacity" value={v} onChange={setV} showValue />
}
function NumberDemo() {
  const [v, setV] = React.useState(3)
  return <NumberInput label="Seats" value={v} onChange={setV} min={1} max={10} />
}
function DateDemo() {
  const [v, setV] = React.useState(null)
  return <DatePicker label="Ship date" value={v} onChange={setV} placeholder="Pick a date" />
}
function ColorDemo() {
  const [v, setV] = React.useState('oklch(0.65 0.20 250)')
  return <ColorPicker label="Accent" value={v} onChange={setV}
    options={['oklch(0.65 0.20 250)', 'oklch(0.62 0.18 160)', 'oklch(0.64 0.19 25)', 'oklch(0.70 0.15 75)']} />
}
function OTPDemo() {
  const [v, setV] = React.useState('')
  return <OTPInput length={5} value={v} onChange={setV} />
}
function SearchDemo() {
  const [v, setV] = React.useState('')
  return <SearchInput value={v} onChange={setV} placeholder="Search projects…" shortcut="⌘K" />
}
function TabsDemo() {
  const [v, setV] = React.useState('overview')
  return <Tabs value={v} onChange={setV}
    tabs={[{ value: 'overview', label: 'Overview' }, { value: 'activity', label: 'Activity' }, { value: 'files', label: 'Files' }]} />
}
function PaginationDemo() {
  const [p, setP] = React.useState(2)
  return <Pagination page={p} total={8} onChange={setP} />
}
function DialogDemo() {
  const [open, setOpen] = React.useState(false)
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}>Open dialog</Button>
    <Dialog open={open} onClose={() => setOpen(false)} title="Delete project?"
      actions={<>
        <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="destructive" pulse onClick={() => setOpen(false)}>Delete</Button>
      </>}>
      This permanently removes the project and its files.
    </Dialog>
  </>
}
function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  return <>
    <Button variant="secondary" onClick={() => setOpen(true)}>Open drawer</Button>
    <Drawer open={open} onClose={() => setOpen(false)} side="right" title="Settings">
      <Stack gap={3}><Input label="Name" defaultValue="Agustin" /><Switch checked label="Public profile" onChange={() => {}} /></Stack>
    </Drawer>
  </>
}
function CommandDemo() {
  const [open, setOpen] = React.useState(false)
  return <>
    <Button variant="secondary" icon={<i className="ph ph-command" />} onClick={() => setOpen(true)}>Command palette</Button>
    <CommandPalette open={open} onClose={() => setOpen(false)} commands={[
      { id: 'new', label: 'New project', icon: <i className="ph ph-plus" />, shortcut: ['⌘', 'N'], onSelect: () => setOpen(false) },
      { id: 'set', label: 'Open settings', icon: <i className="ph ph-gear" />, onSelect: () => setOpen(false) },
      { id: 'theme', label: 'Toggle theme', icon: <i className="ph ph-moon" />, onSelect: () => setOpen(false) },
    ]} />
  </>
}
function LoadingDemo() {
  return <div style={{ position: 'relative', width: '100%', height: 80, borderRadius: 12, overflow: 'hidden' }}>
    <LoadingOverlay show message="Saving…" fullscreen={false} />
  </div>
}

/* ---------- glossary data ---------- */

const CATALOG = [
  ['Core', [
    ['Button', 'Pill action with gloss, depth and spring press. One primary per surface.',
      <Stack direction="row" gap={2} wrap><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></Stack>],
    ['IconButton', 'Icon-only action with an accessible label. Ghost / soft / filled.',
      <Stack direction="row" gap={2}><IconButton variant="ghost" label="Like"><i className="ph ph-heart" /></IconButton><IconButton variant="soft" label="Star"><i className="ph ph-star" /></IconButton><IconButton variant="filled" label="Add"><i className="ph ph-plus" /></IconButton></Stack>],
    ['GlassPanel', 'Structural frosted-glass chrome. Nav, modals, overlays — never content.',
      <GlassPanel style={{ padding: 16 }}>Glass chrome</GlassPanel>],
    ['Card', 'Elevation-tiered content surface with an Aqua top-sheen.',
      <Card variant="raised" style={{ padding: 16 }}>Raised surface</Card>],
    ['Badge', 'Compact status / count chip with optional liquid-bubble dot.',
      <Stack direction="row" gap={2} wrap><Badge tone="success" dot>Live</Badge><Badge tone="warning" dot>Pending</Badge><Badge tone="accent" pill>12</Badge></Stack>],
    ['Tag', 'Removable metadata label for filters and chips.',
      <Stack direction="row" gap={2}><Tag tone="accent" onRemove={() => {}}>React</Tag><Tag onRemove={() => {}}>TypeScript</Tag></Stack>],
    ['Input', 'Text field with label, hint, icon and error states.',
      <Input label="Email" placeholder="you@example.com" icon={<i className="ph ph-envelope-simple" />} />],
    ['Switch', 'Boolean toggle with a liquid-bubble knob.', <SwitchDemo />],
    ['SegmentedControl', 'Two to four mutually-exclusive options, inline.', <SegmentedDemo />],
    ['ToggleGroup', 'Single or multi-select toggle buttons.', <ToggleDemo />],
    ['Spinner', 'Liquid conic-arc loading spinner.', <Spinner size={32} />],
    ['LiquidBubble', 'The core round primitive. Filled / outline / spinner.',
      <Stack direction="row" gap={2} align="center"><LiquidBubble size={28} color="var(--accent)" /><LiquidBubble size={22} variant="outline" color="var(--accent-mid)" /><LiquidBubble size={30} variant="spinner" color="var(--accent)" /></Stack>],
    ['Kbd', 'Keyboard key / shortcut display.',
      <Stack direction="row" gap={1} align="center"><Kbd>⌘</Kbd><Kbd>K</Kbd></Stack>],
  ]],
  ['Forms', [
    ['Checkbox', 'Boolean check with indeterminate support.', <CheckboxDemo />],
    ['Radio', 'Single choice from a group.', <RadioDemo />],
    ['Select', 'Dropdown with a glass panel; selected row marked by a bubble.', <SelectDemo />],
    ['Combobox', 'Searchable, filterable dropdown.', <ComboboxDemo />],
    ['MultiSelect', 'Multi-choice dropdown with tag chips.', <MultiSelectDemo />],
    ['Textarea', 'Multi-line text field with label and hint.', <Textarea label="Bio" placeholder="A short bio…" rows={3} />],
    ['Slider', 'Range input with a liquid-bubble thumb.', <SliderDemo />],
    ['NumberInput', 'Numeric field with stepper controls.', <NumberDemo />],
    ['DatePicker', 'Calendar date selection.', <DateDemo />],
    ['ColorPicker', 'Swatch-based color selection.', <ColorDemo />],
    ['OTPInput', 'One-time code entry, one box per digit.', <OTPDemo />],
    ['SearchInput', 'Search field with clear button and shortcut hint.', <SearchDemo />],
    ['FileDropzone', 'Drag-and-drop upload area.', <FileDropzone label="Drop files here" sublabel="or click to browse" />],
  ]],
  ['Feedback', [
    ['Alert', 'Inline contextual message in four tones.', <Alert tone="success" title="Saved">Changes published.</Alert>],
    ['Banner', 'Full-width page-level announcement.', <Banner tone="accent" onClose={() => {}}>New version available.</Banner>],
    ['Progress', 'Linear progress bar.', <Progress value={62} label="Upload" showValue />],
    ['ProgressCircle', 'Circular progress with morphing ring.', <ProgressCircle value={72} size={68} showValue />],
    ['Skeleton', 'Loading placeholder.', <Stack gap={2} style={{ width: '100%' }}><Stack direction="row" gap={2} align="center"><Skeleton circle width={36} /><Stack gap={1} style={{ flex: 1 }}><Skeleton height={12} /><Skeleton height={10} width="60%" /></Stack></Stack><Skeleton height={12} /><Skeleton height={10} width="75%" /></Stack>],
    ['LoadingOverlay', 'Covers a surface while loading.', <LoadingDemo />],
    ['Toast', 'Floating notification; springs in.', <Toast tone="success" title="Shipped" message="Aero Mail is live." onClose={() => {}} />],
    ['Tooltip', 'On-hover hint that wraps its trigger.', <Tooltip label="Shortcut: ⌘K"><Button variant="secondary">Hover me</Button></Tooltip>],
    ['Popover', 'Click-triggered floating panel.', <Popover trigger={<Button variant="secondary">Open popover</Button>}><div style={{ padding: 12, maxWidth: 200 }}>Any content inside a glass panel.</div></Popover>],
    ['Dialog', 'Modal with blurred backdrop and glass panel.', <DialogDemo />],
    ['Drawer', 'Side panel sliding in over a scrim.', <DrawerDemo />],
    ['EmptyState', 'Zero-data prompt with an optional action.',
      <EmptyState icon={<i className="ph ph-folder-open" />} title="No projects yet" description="Create your first to get started." action={<Button variant="primary" size="sm">New project</Button>} />],
    ['CommandPalette', '⌘K overlay for fast navigation.', <CommandDemo />],
  ]],
  ['Navigation', [
    ['Tabs', 'Underline tabs with a sliding accent indicator.', <TabsDemo />],
    ['Breadcrumb', 'Page hierarchy trail.', <Breadcrumb items={['Home', 'Projects', 'Settings']} />],
    ['Menu', 'Dropdown action menu.', <Menu trigger={<Button variant="secondary" iconRight={<i className="ph ph-caret-down" />}>Actions</Button>} items={[{ label: 'Rename', icon: <i className="ph ph-pencil" /> }, { label: 'Duplicate', icon: <i className="ph ph-copy" /> }, { divider: true }, { label: 'Delete', icon: <i className="ph ph-trash" />, danger: true }]} />],
    ['ContextMenu', 'Right-click menu on any surface.',
      <ContextMenu items={[{ label: 'Cut', shortcut: '⌘X' }, { label: 'Copy', shortcut: '⌘C' }, { divider: true }, { label: 'Delete', tone: 'danger' }]}>
        <div style={{ padding: '18px 22px', border: '1px dashed var(--border)', borderRadius: 12, color: 'var(--text-muted)', fontSize: 14 }}>Right-click here</div>
      </ContextMenu>],
    ['Accordion', 'Collapsible sections.', <div style={{ width: '100%' }}><Accordion items={[{ title: 'What is Aqus?', content: 'A Retro-Aero × Modern design system.' }, { title: 'How do I install it?', content: 'npm install github:LagoJournal/aqus#v0.1.0' }]} /></div>],
    ['Pagination', 'Page navigation with bubble markers.', <PaginationDemo />],
    ['Stepper', 'Multi-step flow indicator.', <div style={{ width: '100%' }}><Stepper current={1} steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Review' }]} /></div>],
  ]],
  ['Data', [
    ['Avatar', 'User image or initials; liquid-blob shape + status.',
      <Stack direction="row" gap={2} align="center"><Avatar name="Agustin Lago" status="online" /><Avatar name="Maya Chen" /><Avatar name="JS" shape="circle" status="busy" /></Stack>],
    ['Divider', 'Labeled separator.', <div style={{ width: '100%' }}><Divider label="or continue with" /></div>],
    ['Table', 'Tabular data with sortable columns.',
      <div style={{ width: '100%' }}><Table columns={[{ key: 'name', label: 'Project' }, { key: 'status', label: 'Status' }]} rows={[{ name: 'Aero Mail', status: <Badge tone="success" dot>Live</Badge> }, { name: 'Portfolio', status: <Badge tone="neutral" dot>Draft</Badge> }]} /></div>],
    ['Timeline', 'Chronological event list.',
      <div style={{ width: '100%' }}><Timeline items={[{ title: 'Deployed v0.1', time: 'now', status: 'done' }, { title: 'Review', time: '2h', status: 'active' }, { title: 'Ship', time: '—', status: 'pending' }]} /></div>],
    ['TreeView', 'Hierarchical, expandable data.',
      <div style={{ width: '100%' }}><TreeView nodes={[{ id: 'src', label: 'src', children: [{ id: 'comp', label: 'components' }, { id: 'tok', label: 'tokens' }] }]} /></div>],
    ['CodeBlock', 'Syntax-styled code with copy.', <div style={{ width: '100%' }}><CodeBlock language="tsx" code={"import { Button } from '@agustin/aqus'"} /></div>],
    ['DescriptionList', 'Key-value metadata pairs.',
      <div style={{ width: '100%' }}><DescriptionList items={[{ term: 'Status', value: 'Live' }, { term: 'Version', value: 'v0.1.0' }, { term: 'License', value: 'MIT' }]} /></div>],
  ]],
  ['Layout', [
    ['Container', 'Max-width centered page wrapper. Wrap every page in it.',
      <span className="sc-foot-note">Used as the page scaffold — see the example views.</span>],
    ['Stack', 'Flex column / row with a gap token. The everyday layout primitive.',
      <StackComp direction="row" gap={2}><Badge tone="accent">A</Badge><Badge tone="accent">B</Badge><Badge tone="accent">C</Badge></StackComp>],
    ['Section', 'Page section with vertical rhythm + optional horizon.',
      <span className="sc-foot-note">Structural — wraps each band of a page.</span>],
    ['Prose', 'Long-form reading container with type rhythm.',
      <Prose style={{ fontSize: 13 }}><p style={{ margin: 0 }}>Measured line length and leading for comfortable reading.</p></Prose>],
    ['PageHeader', 'Page title + subtitle + action row.',
      <div style={{ width: '100%' }}><PageHeader title="Projects" subtitle="All your active work." /></div>],
    ['HeroSection', 'Full-width hero with liquid blobs + CTA.',
      <span className="sc-foot-note">See the hero at the top of this page.</span>],
    ['NavBar', 'Sticky frosted-glass pill nav with links + action.',
      <span className="sc-foot-note">See the nav at the top of this page.</span>],
    ['Footer', 'Wordmark + link columns + copyright. Flat surface.',
      <span className="sc-foot-note">See the footer at the bottom of this page.</span>],
  ]],
  ['Content', [
    ['StatCard', 'KPI tile: big number + label + delta.', <StatCard label="Revenue" value="$12.4k" delta="+18%" up icon={<i className="ph ph-trend-up" />} />],
    ['FeatureCard', 'Icon + title + description marketing tile.', <FeatureCard icon={<i className="ph ph-lightning" />} title="Fast by default" description="Vite-based, ships in milliseconds." />],
    ['FilterBar', 'Active filter chips with clear-all.', <div style={{ width: '100%' }}><FilterBar filters={[{ label: 'Active', tone: 'success' }, { label: 'React' }, { label: 'This week' }]} onRemove={() => {}} onClear={() => {}} /></div>],
    ['TestimonialCard', 'Pull-quote + bubble avatar + attribution.', <TestimonialCard quote="The cleanest system I’ve shipped with." name="Jess Doe" role="Founder, Aero" avatarInitials="JD" />],
    ['BlogCard', 'Article preview with thumbnail + meta.', <div style={{ width: '100%' }}><BlogCard title="Designing the liquid bubble" excerpt="Why every round element morphs." date="Jun 2026" readTime="4 min" tags={['Design']} /></div>],
    ['MediaCard', 'Image-first card with content below.',
      <div style={{ width: 220 }}><MediaCard media={<div style={{ height: 100, background: 'var(--accent-light)' }} />} title="Aero Mail" subtitle="Case study" badge={<Badge tone="accent">New</Badge>} /></div>],
    ['NotificationItem', 'Inbox row; unread = tinted + bubble marker.',
      <div style={{ width: '100%' }}><NotificationItem icon={<i className="ph ph-bell" />} title="Build finished" body="Aero Mail deployed to production." time="2m" unread tone="success" /></div>],
    ['Carousel', 'Horizontal scroll-snap rail.',
      <div style={{ width: '100%' }}><Carousel itemWidth="140px" gap={12} showDots>{[1, 2, 3, 4].map((n) => <Card key={n} style={{ padding: 16, textAlign: 'center' }}>Slide {n}</Card>)}</Carousel></div>],
  ]],
  ['Brand', [
    ['Monogram', 'The liquid-drop mark.', <Monogram size={48} letter="A" />],
    ['Wordmark', 'Full logotype with a liquid "s".', <Wordmark size={30} />],
  ]],
  ['Charts', [
    ['LineChart', 'Multi-series line / area chart. Smooth Catmull-Rom curves, glass tooltip, animated liquid end-markers.',
      <div style={{ width: '100%' }}><LineChart data={[{x:'J',v:30},{x:'F',v:45},{x:'M',v:38},{x:'A',v:60},{x:'M',v:55},{x:'J',v:72}]} series={[{key:'v',label:'Value'}]} height={120} area showLegend={false} /></div>],
    ['BarChart', 'Grouped or stacked bars. Aqua gloss on each bar, glass tooltip, responsive.',
      <div style={{ width: '100%' }}><BarChart data={[{x:'Q1',a:40,b:25},{x:'Q2',a:60,b:38},{x:'Q3',a:52,b:44},{x:'Q4',a:78,b:55}]} series={[{key:'a',label:'Web'},{key:'b',label:'Mobile'}]} height={120} showLegend={false} /></div>],
    ['DonutChart', 'Proportional ring with morphing liquid animation, hover tooltips, and center label.',
      <div style={{ display:'flex', justifyContent:'center' }}><DonutChart data={[{label:'A',value:42},{label:'B',value:31},{label:'C',value:18},{label:'D',value:9}]} size={140} thickness={18} showLegend={false} /></div>],
    ['Sparkline', 'Tiny inline trend line — no axes. For table cells, StatCards, lists.',
      <Stack gap={2}><Sparkline data={[10,18,14,24,20,30,26,38]} width={120} height={32} /><Sparkline data={[38,26,30,20,24,14,18,10]} width={120} height={32} color="var(--chart-3)" /></Stack>],
  ]],
]

function GlossaryItem({ name, cat, desc, preview }) {
  return (
    <Card variant="resting" style={{ padding: 18 }}>
      <div className="sc-item">
        <div className="sc-item-head">
          <span className="sc-item-name">{name}</span>
          <span className="sc-item-cat">{cat}</span>
        </div>
        <div className="sc-preview">{preview}</div>
        <p className="sc-item-desc">{desc}</p>
      </div>
    </Card>
  )
}

const ALL_CATS = ['All', ...CATALOG.map(([cat]) => cat)]

export function Glossary() {
  const [q, setQ]     = React.useState('')
  const [cat, setCat] = React.useState('All')
  const query = q.trim().toLowerCase()

  const total = CATALOG.reduce((n, [, items]) => n + items.length, 0)

  const visible = CATALOG
    .filter(([c]) => cat === 'All' || c === cat)
    .map(([c, items]) => [
      c,
      items.filter(([name, desc]) =>
        !query ||
        name.toLowerCase().includes(query) ||
        c.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query)
      ),
    ])
    .filter(([, items]) => items.length > 0)

  const filteredTotal = visible.reduce((n, [, items]) => n + items.length, 0)
  const noResults = (query || cat !== 'All') && filteredTotal === 0

  return (
    <Section id="glossary" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Components</p>
        <h2 className="sc-section-title">{total} components, one import</h2>
        <p className="sc-section-lede">
          Every preview below is the real component rendered from the library.
          Search by name or filter by category.
        </p>

        {/* Search + category filter */}
        <Stack direction="row" gap={3} align="flex-end" wrap style={{ marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchInput
              value={q}
              onChange={setQ}
              placeholder="Search components…"
              count={query ? filteredTotal : undefined}
            />
          </div>
          <div style={{ minWidth: 160 }}>
            <Select
              label=""
              value={cat}
              onChange={setCat}
              options={ALL_CATS.map((c) => ({ value: c, label: c === 'All' ? 'All categories' : c }))}
            />
          </div>
        </Stack>

        {visible.map(([c, items]) => (
          <div key={c}>
            <h3 className="sc-cat-heading">
              {c}
              <span className="sc-cat-count">{items.length}</span>
            </h3>
            <div className="sc-grid" style={{ marginTop: 16 }}>
              {items.map(([name, desc, preview]) => (
                <GlossaryItem key={name} name={name} cat={c} desc={desc} preview={preview} />
              ))}
            </div>
          </div>
        ))}

        {noResults && (
          <EmptyState
            icon={<i className="ph ph-magnifying-glass" />}
            title="No components found"
            description={query ? `Nothing matches "${q.trim()}".` : `No components in this category.`}
            action={
              <Button variant="secondary" onClick={() => { setQ(''); setCat('All') }}>
                Clear filters
              </Button>
            }
          />
        )}
      </Container>
    </Section>
  )
}
