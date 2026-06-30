import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, StatCard, Card,
  Table, Badge, Avatar, SearchInput, SegmentedControl, Tabs, IconButton,
  Tag, FilterBar, Pagination, Timeline, ProgressCircle, NotificationItem,
  Divider, Menu, LineChart, BarChart, DonutChart, Sparkline,
  Dialog, Drawer, Toast, CommandPalette, Tooltip,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const SPARK = {
  deploys: [18, 24, 20, 31, 27, 34, 29, 38],
  issues:  [9,  7,  11, 8,  5,  6,  4,  5],
  uptime:  [99.1, 99.4, 99.7, 99.5, 99.8, 99.9, 99.9, 99.9],
  users:   [310, 340, 380, 420, 450, 490, 530, 572],
}

const REVENUE = [
  { x: 'Nov', mrr: 4200, arr: 50400 },
  { x: 'Dec', mrr: 4800, arr: 57600 },
  { x: 'Jan', mrr: 5100, arr: 61200 },
  { x: 'Feb', mrr: 5600, arr: 67200 },
  { x: 'Mar', mrr: 6100, arr: 73200 },
  { x: 'Apr', mrr: 6400, arr: 76800 },
  { x: 'May', mrr: 6800, arr: 81600 },
  { x: 'Jun', mrr: 7200, arr: 86400 },
]
const REVENUE_SERIES = [{ key: 'mrr', label: 'MRR' }, { key: 'arr', label: 'ARR' }]

const TRAFFIC = [
  { label: 'Organic', value: 44 },
  { label: 'Direct',  value: 28 },
  { label: 'Referral',value: 18 },
  { label: 'Paid',    value: 10 },
]

const PROJECTS = [
  { id: 1, name: 'Aero Mail',    env: 'Production', status: 'active',   deploys: 34, updated: '2m ago',   owner: 'Agustin', stack: 'React · Vite' },
  { id: 2, name: 'Portfolio v3', env: 'Production', status: 'active',   deploys: 12, updated: '1h ago',   owner: 'Agustin', stack: 'Next.js' },
  { id: 3, name: 'Liquid Docs',  env: 'Preview',    status: 'paused',   deploys: 5,  updated: 'Yesterday', owner: 'Jess',    stack: 'Astro' },
  { id: 4, name: 'Vista Kit',    env: 'Production', status: 'active',   deploys: 21, updated: '3d ago',   owner: 'Sam',     stack: 'React · Rollup' },
  { id: 5, name: 'Horizon API',  env: 'Staging',    status: 'paused',   deploys: 8,  updated: '1w ago',   owner: 'Sam',     stack: 'Node.js' },
  { id: 6, name: 'Beacon CMS',   env: 'Preview',    status: 'archived', deploys: 2,  updated: '2w ago',   owner: 'Jess',    stack: 'SvelteKit' },
]

const TEAM = [
  { name: 'Agustin Lago', role: 'Lead engineer',      deploys: 46, merged: 18, status: 'online',  goal: 90 },
  { name: 'Jess Park',    role: 'Frontend engineer',   deploys: 27, merged: 11, status: 'online',  goal: 74 },
  { name: 'Sam Torres',   role: 'Backend engineer',    deploys: 29, merged: 14, status: 'away',    goal: 81 },
  { name: 'Mia Chen',     role: 'Design engineer',     deploys: 14, merged: 7,  status: 'offline', goal: 58 },
]

const ACTIVITY = [
  { title: 'Aero Mail deployed',    description: 'Production · v2.4.0',            time: '2m',  status: 'done' },
  { title: 'Issue #128 closed',     description: 'Jess fixed the focus ring',       time: '1h',  status: 'done' },
  { title: 'Vista Kit building',    description: 'Preview deploy in progress',       time: 'now', status: 'active' },
  { title: 'Review Horizon API',    description: 'Awaiting approval',               time: '—',   status: 'pending' },
]

const COMMANDS = [
  { id: 'new',     label: 'New project',         icon: <i className="ph ph-plus" /> },
  { id: 'search',  label: 'Search projects',     icon: <i className="ph ph-magnifying-glass" /> },
  { id: 'deploy',  label: 'Trigger deploy',      icon: <i className="ph ph-rocket-launch" /> },
  { id: 'team',    label: 'Manage team',         icon: <i className="ph ph-users" /> },
  { id: 'docs',    label: 'Open documentation',  icon: <i className="ph ph-book-open" /> },
  { id: 'billing', label: 'View billing',        icon: <i className="ph ph-credit-card" /> },
]

const STATUS_TONE = { active: 'success', paused: 'warning', archived: 'neutral' }

// ── Helpers ──────────────────────────────────────────────────────────────────

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 3000)
  }, [])
  return [t, fire]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DashboardExample() {
  const [activeNav, setActiveNav] = React.useState('#dashboard')
  const [tab,       setTab]       = React.useState('all')
  const [q,         setQ]         = React.useState('')
  const [page,      setPage]      = React.useState(1)
  const [sortKey,   setSortKey]   = React.useState('updated')
  const [sortDir,   setSortDir]   = React.useState('asc')
  const [chips,     setChips]     = React.useState([{ id: 'active', label: 'Status: active', tone: 'success' }])
  const [selected,  setSelected]  = React.useState(null)
  const [newOpen,   setNewOpen]   = React.useState(false)
  const [cmdOpen,   setCmdOpen]   = React.useState(false)
  const [barMode,   setBarMode]   = React.useState('grouped')
  const [toast,     fireToast]    = useToast()

  const filtered = PROJECTS
    .filter(p => tab === 'all' || p.status === tab)
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))

  const section = activeNav.slice(1) // 'dashboard' | 'projects' | 'team'

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#dashboard', label: 'Dashboard' },
          { href: '#projects',  label: 'Projects' },
          { href: '#team',      label: 'Team' },
        ]}
        activeHref={activeNav}
        onLinkClick={(l) => setActiveNav(l.href)}
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label="Command palette (⌘K)">
              <IconButton variant="soft" label="Command palette" onClick={() => setCmdOpen(true)}>
                <i className="ph ph-terminal" />
              </IconButton>
            </Tooltip>
            <Avatar name="Agustin Lago" status="online" size={34} />
          </Stack>
        }
      />

      {/* ── Dashboard ─────────────────────────────────────────── */}
      {section === 'dashboard' && (
        <Section size="md">
          <Container>
            <Stack gap={5}>
              <PageHeader
                eyebrow="Workspace"
                title="Good morning, Agustin."
                subtitle="Here's what's happening across your projects today."
                action={
                  <Stack direction="row" gap={2}>
                    <Button variant="secondary" icon={<i className="ph ph-export" />}>Export</Button>
                    <Button variant="primary" icon={<i className="ph ph-plus" />} onClick={() => setNewOpen(true)}>New project</Button>
                  </Stack>
                }
              />

              {/* KPI row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                <Card variant="resting" style={{ padding: 16 }}>
                  <StatCard label="Active projects" value="8" delta="+2" up icon={<i className="ph ph-folders" />} />
                  <Sparkline data={SPARK.users} height={28} style={{ marginTop: 8 }} />
                </Card>
                <Card variant="resting" style={{ padding: 16 }}>
                  <StatCard label="Deploys / week" value="34" delta="+12%" up icon={<i className="ph ph-rocket-launch" />} />
                  <Sparkline data={SPARK.deploys} height={28} style={{ marginTop: 8 }} />
                </Card>
                <Card variant="resting" style={{ padding: 16 }}>
                  <StatCard label="Open issues" value="5" delta="−3" up={false} icon={<i className="ph ph-bug" />} />
                  <Sparkline data={SPARK.issues} height={28} color="var(--chart-7)" style={{ marginTop: 8 }} />
                </Card>
                <Card variant="resting" style={{ padding: 16 }}>
                  <StatCard label="Uptime" value="99.9%" delta="30d avg" icon={<i className="ph ph-pulse" />} />
                  <Sparkline data={SPARK.uptime} height={28} color="var(--chart-3)" style={{ marginTop: 8 }} />
                </Card>
              </div>

              {/* Charts row */}
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center">
                      <strong>Revenue trend</strong>
                      <Badge tone="success" dot>Live</Badge>
                    </Stack>
                    <Divider />
                    <LineChart
                      data={REVENUE}
                      series={REVENUE_SERIES}
                      height={180}
                      area
                      valueFormat={(v) => `$${(v / 1000).toFixed(1)}k`}
                    />
                  </Stack>
                </Card>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Traffic sources</strong>
                    <Divider />
                    <DonutChart
                      data={TRAFFIC}
                      size={160}
                      thickness={20}
                      centerValue="84k"
                      centerLabel="visits"
                      valueFormat={(v) => `${v}%`}
                    />
                  </Stack>
                </Card>
              </div>

              {/* Activity */}
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center">
                      <strong>Acquisition by channel</strong>
                      <SegmentedControl size="sm" value={barMode} onChange={setBarMode}
                        options={[{ value: 'grouped', label: 'Grouped' }, { value: 'stacked', label: 'Stacked' }]} />
                    </Stack>
                    <Divider />
                    <BarChart
                      data={[
                        { x: 'Q1', organic: 420, paid: 260, referral: 140 },
                        { x: 'Q2', organic: 510, paid: 310, referral: 180 },
                        { x: 'Q3', organic: 490, paid: 280, referral: 220 },
                        { x: 'Q4', organic: 640, paid: 360, referral: 260 },
                      ]}
                      series={[{ key: 'organic', label: 'Organic' }, { key: 'paid', label: 'Paid' }, { key: 'referral', label: 'Referral' }]}
                      height={160}
                      stacked={barMode === 'stacked'}
                    />
                  </Stack>
                </Card>
                <Stack gap={3}>
                  <Card variant="resting" style={{ padding: 0, overflow: 'hidden' }}>
                    <NotificationItem unread tone="accent"
                      avatar={<Avatar name="Jess Park" size={36} status="online" />}
                      title="Jess mentioned you" body="Can you review the Liquid Docs theme?" time="5m" />
                    <Divider />
                    <NotificationItem icon={<i className="ph ph-warning" />} tone="warning"
                      title="Build warning" body="Horizon API bundle grew 12%." time="1h" />
                    <Divider />
                    <NotificationItem icon={<i className="ph ph-check-circle" />} tone="success"
                      title="Deploy succeeded" body="Aero Mail · Production · v2.4.0" time="2h" />
                  </Card>
                  <Card variant="featured" style={{ padding: 20 }}>
                    <Stack gap={3} align="center">
                      <strong style={{ alignSelf: 'flex-start' }}>Quarterly goal</strong>
                      <ProgressCircle value={72} size={100} thickness={10} showValue label="of 50 deploys" />
                    </Stack>
                  </Card>
                </Stack>
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Projects ──────────────────────────────────────────── */}
      {section === 'projects' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Projects"
                title="All projects"
                subtitle="Manage and monitor every deployment."
                action={
                  <Button variant="primary" icon={<i className="ph ph-plus" />} onClick={() => setNewOpen(true)}>
                    New project
                  </Button>
                }
              />
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <Stack direction="row" gap={3} align="center" justify="space-between" wrap>
                    <Tabs value={tab} onChange={(v) => { setTab(v); setPage(1) }} tabs={[
                      { value: 'all',      label: 'All' },
                      { value: 'active',   label: 'Active' },
                      { value: 'paused',   label: 'Paused' },
                      { value: 'archived', label: 'Archived' },
                    ]} />
                    <SearchInput value={q} onChange={setQ} placeholder="Find project…" size="sm" />
                  </Stack>

                  {chips.length > 0 && (
                    <FilterBar
                      filters={chips}
                      onRemove={(f) => setChips(cs => cs.filter(c => c.id !== f.id))}
                      onClear={() => setChips([])}
                    />
                  )}

                  {filtered.length === 0
                    ? <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>No projects match your filters.</div>
                    : (
                      <div style={{ overflowX: 'auto', margin: '0 -4px', padding: '0 4px' }}>
                      <Table
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onSort={(k, d) => { setSortKey(k); setSortDir(d) }}
                        columns={[
                          { key: 'name',    label: 'Project', sortable: true },
                          { key: 'owner',   label: 'Owner' },
                          { key: 'env',     label: 'Environment' },
                          { key: 'deploys', label: 'Deploys', align: 'right', sortable: true },
                          { key: 'status',  label: 'Status' },
                          { key: 'updated', label: 'Updated', align: 'right', muted: true },
                          { key: 'actions', label: '', align: 'right' },
                        ]}
                        rows={filtered.map(r => ({
                          name: (
                            <button
                              onClick={() => setSelected(r)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 'var(--weight-semibold)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}
                            >
                              {r.name}
                            </button>
                          ),
                          owner:   <Stack direction="row" gap={1} align="center"><Avatar name={r.owner} size={22} /> {r.owner}</Stack>,
                          env:     <Badge tone="neutral">{r.env}</Badge>,
                          deploys: r.deploys,
                          status:  <Badge tone={STATUS_TONE[r.status]} dot>{r.status}</Badge>,
                          updated: r.updated,
                          actions: (
                            <Menu
                              align="right"
                              trigger={<IconButton variant="ghost" size="sm" label="Actions"><i className="ph ph-dots-three" /></IconButton>}
                              items={[
                                { label: 'View details', icon: <i className="ph ph-arrow-square-out" />, onClick: () => setSelected(r) },
                                { label: 'Deploy now',   icon: <i className="ph ph-rocket-launch" />,   onClick: () => fireToast(`Deploying ${r.name}…`, 'accent') },
                                { divider: true },
                                { label: 'Archive',      icon: <i className="ph ph-archive" />,         onClick: () => fireToast(`${r.name} archived.`, 'warning'), danger: true },
                              ]}
                            />
                          ),
                        }))}
                      />
                      </div>
                    )}

                  <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                    <span className="sc-foot-note">{filtered.length} of {PROJECTS.length} projects</span>
                    <Pagination page={page} total={3} onChange={setPage} siblings={1} />
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Team ──────────────────────────────────────────────── */}
      {section === 'team' && (
        <Section size="md">
          <Container>
            <Stack gap={5}>
              <PageHeader
                eyebrow="Team"
                title="Your team"
                subtitle="4 members · 2 online"
                action={<Button variant="secondary" icon={<i className="ph ph-user-plus" />}>Invite</Button>}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                {TEAM.map((m) => (
                  <Card key={m.name} variant="resting" style={{ padding: 20 }}>
                    <Stack direction="row" gap={3} align="center" justify="space-between">
                      <Stack direction="row" gap={3} align="center">
                        <Avatar name={m.name} size={48} status={m.status} />
                        <Stack gap={1}>
                          <strong style={{ fontSize: 'var(--text-body-sm)' }}>{m.name}</strong>
                          <span className="sc-foot-note">{m.role}</span>
                          <Stack direction="row" gap={2} align="center" style={{ marginTop: 2 }}>
                            <Badge tone="neutral" pill><i className="ph ph-rocket-launch" style={{ marginRight: 4 }} />{m.deploys} deploys</Badge>
                            <Badge tone="neutral" pill><i className="ph ph-git-merge" style={{ marginRight: 4 }} />{m.merged} merged</Badge>
                          </Stack>
                        </Stack>
                      </Stack>
                      <ProgressCircle value={m.goal} size={52} showValue />
                    </Stack>
                  </Card>
                ))}
              </div>
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <strong>Recent activity</strong>
                  <Divider />
                  <Timeline items={ACTIVITY} />
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Project detail drawer ──────────────────────────────── */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        side="right"
      >
        {selected && (
          <Stack gap={4}>
            <Stack direction="row" gap={2} align="center">
              <Badge tone={STATUS_TONE[selected.status]} dot>{selected.status}</Badge>
              <Badge tone="neutral">{selected.env}</Badge>
            </Stack>
            <Divider />
            <Stack gap={3}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Details</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {[
                  ['Owner', selected.owner],
                  ['Stack', selected.stack],
                  ['Deploys', selected.deploys],
                  ['Last updated', selected.updated],
                  ['Environment', selected.env],
                ].map(([k, v]) => (
                  <Stack key={k} gap={0}>
                    <span className="sc-foot-note">{k}</span>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)' }}>{v}</span>
                  </Stack>
                ))}
              </div>
            </Stack>
            <Divider />
            <Stack gap={2}>
              <Button variant="primary" icon={<i className="ph ph-rocket-launch" />}
                onClick={() => { setSelected(null); fireToast(`Deploying ${selected.name}…`, 'accent') }}>
                Deploy now
              </Button>
              <Button variant="secondary" icon={<i className="ph ph-arrow-square-out" />}>
                Open in console
              </Button>
              <Button variant="ghost" icon={<i className="ph ph-archive" />}
                onClick={() => { setSelected(null); fireToast(`${selected.name} archived.`, 'warning') }}>
                Archive project
              </Button>
            </Stack>
          </Stack>
        )}
      </Drawer>

      {/* ── New project dialog ─────────────────────────────────── */}
      <Dialog
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New project"
        actions={
          <>
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setNewOpen(false); fireToast('Project created!', 'success') }}>Create</Button>
          </>
        }
      >
        <Stack gap={3}>
          <p style={{ margin: 0, fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
            A new project will be provisioned and ready to deploy.
          </p>
        </Stack>
      </Dialog>

      {/* ── Command palette ────────────────────────────────────── */}
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        commands={COMMANDS.map(c => ({ ...c, onSelect: () => { setCmdOpen(false); fireToast(`Running: ${c.label}`, 'accent') } }))}
      />

      {/* ── Toast ──────────────────────────────────────────────── */}
      {toast.show && ReactDOM.createPortal(
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => {}} />
        </div>,
        document.body
      )}
    </div>
  )
}
