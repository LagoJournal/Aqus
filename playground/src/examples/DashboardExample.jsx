import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, StatCard, Card,
  Table, Badge, Avatar, SearchInput, Select, IconButton, SegmentedControl,
  Timeline, Divider, Menu, LineChart, BarChart, DonutChart, EmptyState,
  Dialog, Toast, Tooltip,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const DEPLOY_FREQ = [
  { x: 'Jun 1',  deploys: 3 }, { x: 'Jun 5',  deploys: 5 },
  { x: 'Jun 10', deploys: 8 }, { x: 'Jun 15', deploys: 6 },
  { x: 'Jun 20', deploys: 4 }, { x: 'Jun 25', deploys: 9 },
  { x: 'Jun 30', deploys: 7 },
]
const DEPLOY_SERIES = [{ key: 'deploys', label: 'Deploys' }]

const LATENCY = [
  { x: 'Jun 1',  p50: 42, p99: 120 }, { x: 'Jun 10', p50: 38, p99: 105 },
  { x: 'Jun 20', p50: 44, p99: 118 }, { x: 'Jun 30', p50: 36, p99: 98  },
]
const LATENCY_SERIES = [{ key: 'p50', label: 'p50 ms' }, { key: 'p99', label: 'p99 ms' }]

const SERVICE_STATUS = [
  { label: 'Healthy',  value: 84 },
  { label: 'Degraded', value: 11 },
  { label: 'Down',     value: 5  },
]

const CHANNEL_DATA = [
  { x: 'Q1', web: 540, mobile: 280, api: 130 },
  { x: 'Q2', web: 610, mobile: 340, api: 190 },
  { x: 'Q3', web: 580, mobile: 420, api: 230 },
  { x: 'Q4', web: 720, mobile: 510, api: 280 },
]
const CHANNEL_SERIES = [
  { key: 'web',    label: 'Web'    },
  { key: 'mobile', label: 'Mobile' },
  { key: 'api',    label: 'API'    },
]

const DEPLOYMENTS = [
  { id: 1, service: 'api-gateway',      env: 'Production', version: 'v3.12.1', duration: '2m 14s', status: 'success' },
  { id: 2, service: 'auth-service',     env: 'Production', version: 'v1.8.0',  duration: '1m 42s', status: 'success' },
  { id: 3, service: 'notification-svc', env: 'Staging',    version: 'v2.3.0',  duration: 'Running',status: 'running' },
  { id: 4, service: 'data-pipeline',    env: 'Staging',    version: 'v0.9.2',  duration: '5m 01s', status: 'failed'  },
  { id: 5, service: 'cdn-edge',         env: 'Production', version: 'v6.0.1',  duration: '48s',    status: 'success' },
]

const TEAM = [
  { name: 'Agustin Lago', role: 'Lead SRE',         oncall: true,  resolved: 12, status: 'online'  },
  { name: 'Jess Park',    role: 'Platform engineer', oncall: false, resolved:  7, status: 'online'  },
  { name: 'Sam Torres',   role: 'Backend SRE',       oncall: true,  resolved:  9, status: 'away'    },
  { name: 'Mia Chen',     role: 'Infra engineer',    oncall: false, resolved:  5, status: 'offline' },
]

const TEAM_ACTIVITY = [
  { title: 'Agustin rolled back auth-service',   description: 'v1.8.0 → v1.7.9 reverted',        time: '8m',  status: 'done'    },
  { title: 'Jess resolved alert #204',           description: 'Memory spike — api-gateway',        time: '1h',  status: 'done'    },
  { title: 'Sam triggered staging deploy',       description: 'data-pipeline · v0.9.2',            time: '3h',  status: 'active'  },
  { title: 'Mia updated runbook',               description: 'Added rollback steps for cdn-edge',  time: '5h',  status: 'pending' },
]

const COMMANDS = [
  { id: 'monitor',     label: 'Monitor',     service: 'api-gateway',  env: 'Staging'    },
  { id: 'auth',        label: 'Auth',        service: 'auth-service', env: 'Production' },
  { id: 'notification',label: 'Notify',      service: 'notification-svc', env: 'Staging' },
]

const STATUS_TONE = { success: 'success', running: 'accent', failed: 'danger' }
const ENV_TONE    = { Production: 'neutral', Staging: 'warning' }

// ── Helpers ───────────────────────────────────────────────────────────────────

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DashboardExample() {
  const [nav,        setNav]        = React.useState('#monitor')
  const [q,          setQ]          = React.useState('')
  const [envFilter,  setEnvFilter]  = React.useState('all')
  const [chartMode,  setChartMode]  = React.useState('grouped')
  const [deployOpen, setDeployOpen] = React.useState(false)
  const [deploySvc,  setDeploySvc]  = React.useState('api-gateway')
  const [deployEnv,  setDeployEnv]  = React.useState('staging')
  const [toast,      fireToast]     = useToast()

  const section = nav.slice(1)

  const filtered = DEPLOYMENTS
    .filter(d => envFilter === 'all' || d.env.toLowerCase() === envFilter)
    .filter(d => d.service.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#monitor',     label: 'Monitor' },
          { href: '#deployments', label: 'Deployments' },
          { href: '#team',        label: 'Team' },
        ]}
        activeHref={nav}
        onLinkClick={(l) => setNav(l.href)}
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label="No active incidents">
              <Badge tone="success" dot>All clear</Badge>
            </Tooltip>
            <Avatar name="Agustin Lago" size={32} status="online" />
          </Stack>
        }
      />

      {/* ── Monitor ───────────────────────────────────────────────────────── */}
      {section === 'monitor' && (
        <Section size="md">
          <Container>
            <Stack gap={5}>
              <PageHeader
                eyebrow="System health"
                title="All systems operational"
                subtitle="Last incident closed 14 days ago — no active alerts."
                action={
                  <Button variant="primary" icon={<i className="ph ph-rocket-launch" />} onClick={() => setDeployOpen(true)}>
                    Trigger deploy
                  </Button>
                }
              />

              {/* KPI strip — 4 items, Miller-safe */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                <StatCard label="Uptime (30d)"   value="99.97%"  delta="+0.02%"   up  icon={<i className="ph ph-pulse" />} />
                <StatCard label="Incidents"       value="0"       delta="14d clear" up  icon={<i className="ph ph-warning" />} />
                <StatCard label="Deploys / day"   value="7"       delta="+3 vs avg" up  icon={<i className="ph ph-rocket-launch" />} />
                <StatCard label="MTTR"            value="4m"      delta="−2m vs P30" up icon={<i className="ph ph-timer" />} />
              </div>

              {/* Primary chart split */}
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                      <strong>Deploy frequency — last 30 days</strong>
                      <Badge tone="accent" pill>7 today</Badge>
                    </Stack>
                    <Divider />
                    <LineChart
                      data={DEPLOY_FREQ}
                      series={DEPLOY_SERIES}
                      height={180}
                      area
                    />
                  </Stack>
                </Card>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Service status</strong>
                    <Divider />
                    <DonutChart
                      data={SERVICE_STATUS}
                      size={150}
                      thickness={20}
                      centerValue="84%"
                      centerLabel="healthy"
                      valueFormat={(v) => `${v}%`}
                    />
                  </Stack>
                </Card>
              </div>

              {/* Secondary charts */}
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                      <strong>Traffic by channel</strong>
                      <SegmentedControl
                        size="sm"
                        value={chartMode}
                        onChange={setChartMode}
                        options={[{ value: 'grouped', label: 'Grouped' }, { value: 'stacked', label: 'Stacked' }]}
                      />
                    </Stack>
                    <Divider />
                    <BarChart
                      data={CHANNEL_DATA}
                      series={CHANNEL_SERIES}
                      height={160}
                      stacked={chartMode === 'stacked'}
                    />
                  </Stack>
                </Card>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>API latency</strong>
                    <Divider />
                    <LineChart
                      data={LATENCY}
                      series={LATENCY_SERIES}
                      height={160}
                      valueFormat={(v) => `${v}ms`}
                    />
                  </Stack>
                </Card>
              </div>

              {/* Incidents — zero state design required by Postel law */}
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <strong>Active incidents</strong>
                  <Divider />
                  <EmptyState
                    icon={<i className="ph ph-check-circle" />}
                    title="No active incidents"
                    description="All services are running normally."
                  />
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Deployments ───────────────────────────────────────────────────── */}
      {section === 'deployments' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Deployments"
                title="Deployment log"
                subtitle="Last 24 hours across all environments."
                action={
                  <Button variant="primary" icon={<i className="ph ph-plus" />} onClick={() => setDeployOpen(true)}>
                    New deployment
                  </Button>
                }
              />
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <Stack direction="row" gap={3} wrap align="flex-end">
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <SearchInput value={q} onChange={setQ} placeholder="Find service…" />
                    </div>
                    <div style={{ minWidth: 160 }}>
                      <Select
                        label="Environment"
                        value={envFilter}
                        onChange={setEnvFilter}
                        options={[
                          { value: 'all',        label: 'All environments' },
                          { value: 'production', label: 'Production' },
                          { value: 'staging',    label: 'Staging' },
                        ]}
                      />
                    </div>
                  </Stack>

                  {filtered.length === 0 ? (
                    <EmptyState
                      icon={<i className="ph ph-magnifying-glass" />}
                      title="No deployments found"
                      description="Adjust the search or environment filter."
                      action={
                        <Button variant="secondary" onClick={() => { setQ(''); setEnvFilter('all') }}>
                          Clear filters
                        </Button>
                      }
                    />
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <Table
                        columns={[
                          { key: 'service',  label: 'Service' },
                          { key: 'env',      label: 'Environment' },
                          { key: 'version',  label: 'Version' },
                          { key: 'duration', label: 'Duration', align: 'right' },
                          { key: 'status',   label: 'Status' },
                          { key: 'actions',  label: '', align: 'right' },
                        ]}
                        rows={filtered.map(d => ({
                          service: (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-sm)', whiteSpace: 'nowrap' }}>
                              {d.service}
                            </span>
                          ),
                          env:      <Badge tone={ENV_TONE[d.env]}>{d.env}</Badge>,
                          version:  <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{d.version}</span>,
                          duration: <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{d.duration}</span>,
                          status:   <Badge tone={STATUS_TONE[d.status]} dot>{d.status}</Badge>,
                          actions: (
                            <Menu
                              align="right"
                              trigger={<IconButton variant="ghost" size="sm" label="Actions"><i className="ph ph-dots-three" /></IconButton>}
                              items={[
                                { label: 'View logs',  icon: <i className="ph ph-terminal" />,                 onClick: () => fireToast(`${d.service} logs opened.`) },
                                { label: 'Redeploy',   icon: <i className="ph ph-rocket-launch" />,            onClick: () => fireToast(`Re-deploying ${d.service}…`, 'accent') },
                                { divider: true },
                                { label: 'Roll back',  icon: <i className="ph ph-arrow-counter-clockwise" />,  onClick: () => fireToast(`${d.service} rolled back.`, 'warning'), danger: true },
                              ]}
                            />
                          ),
                        }))}
                      />
                    </div>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      {section === 'team' && (
        <Section size="md">
          <Container>
            <Stack gap={5}>
              <PageHeader
                eyebrow="Team"
                title="On-call rotation"
                subtitle="2 engineers on-call · 0 active pages."
                action={
                  <Button
                    variant="secondary"
                    icon={<i className="ph ph-calendar" />}
                    onClick={() => fireToast('Rotation schedule opened.')}
                  >
                    Manage rotation
                  </Button>
                }
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20 }}>
                {TEAM.map(m => (
                  <Card key={m.name} variant={m.oncall ? 'featured' : 'resting'} style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <Stack direction="row" gap={3} align="center" justify="space-between">
                        <Stack direction="row" gap={3} align="center" style={{ minWidth: 0 }}>
                          <Avatar name={m.name} size={44} status={m.status} />
                          <Stack gap={0} style={{ minWidth: 0 }}>
                            <span style={{ fontWeight: 600, fontSize: 'var(--text-body-sm)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {m.name}
                            </span>
                            <span className="sc-foot-note">{m.role}</span>
                          </Stack>
                        </Stack>
                        {m.oncall && <Badge tone="success" dot pill>On-call</Badge>}
                      </Stack>
                      <Stack direction="row" gap={2} wrap>
                        <Badge tone="neutral" pill>
                          <i className="ph ph-check-circle" style={{ marginRight: 4 }} />
                          {m.resolved} resolved
                        </Badge>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </div>
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <strong>Recent team actions</strong>
                  <Divider />
                  <Timeline items={TEAM_ACTIVITY} />
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Trigger deploy dialog ─────────────────────────────────────────── */}
      <Dialog
        open={deployOpen}
        onClose={() => setDeployOpen(false)}
        title="Trigger deployment"
        actions={
          <>
            <Button variant="ghost" onClick={() => setDeployOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setDeployOpen(false); fireToast('Deployment queued.', 'success') }}>
              Deploy
            </Button>
          </>
        }
      >
        <Stack gap={3}>
          <p style={{ margin: 0, fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
            All checks run before the service goes live.
          </p>
          <Select
            label="Service"
            value={deploySvc}
            onChange={setDeploySvc}
            options={COMMANDS.map(c => ({ value: c.service, label: c.service }))}
          />
          <Select
            label="Environment"
            value={deployEnv}
            onChange={setDeployEnv}
            options={[
              { value: 'staging',    label: 'Staging' },
              { value: 'production', label: 'Production' },
            ]}
          />
        </Stack>
      </Dialog>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast.show && ReactDOM.createPortal(
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => {}} />
        </div>,
        document.body
      )}
    </div>
  )
}
