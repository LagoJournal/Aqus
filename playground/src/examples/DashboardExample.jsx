import React from 'react'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, StatCard, Card,
  Table, Badge, Avatar, SearchInput, SegmentedControl, Tabs, IconButton,
  Tag, FilterBar, Pagination, Timeline, ProgressCircle, NotificationItem,
  Divider, Menu,
} from '@agustin/aqus'

const ROWS = [
  { name: 'Aero Mail', owner: 'Agustin', status: 'active', deploys: 34, updated: '2m ago' },
  { name: 'Portfolio v3', owner: 'Agustin', status: 'active', deploys: 12, updated: '1h ago' },
  { name: 'Liquid Docs', owner: 'Jess', status: 'archived', deploys: 5, updated: 'Yesterday' },
  { name: 'Vista Kit', owner: 'Sam', status: 'active', deploys: 21, updated: '3d ago' },
  { name: 'Horizon API', owner: 'Sam', status: 'paused', deploys: 8, updated: '1w ago' },
]

export function DashboardExample() {
  const [tab, setTab] = React.useState('all')
  const [view, setView] = React.useState('table')
  const [q, setQ] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [sortKey, setSortKey] = React.useState('updated')
  const [sortDir, setSortDir] = React.useState('asc')
  const [chips, setChips] = React.useState([
    { id: 'owner', label: 'Owner: Agustin', tone: 'accent' },
    { id: 'recent', label: 'Updated this week', tone: 'neutral' },
  ])

  const rows = ROWS
    .filter((r) => tab === 'all' || r.status === tab)
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))

  const onSort = (key, dir) => { setSortKey(key); setSortDir(dir) }

  return (
    <div>
      <NavBar
        links={[
          { href: '#d', label: 'Dashboard' },
          { href: '#p', label: 'Projects' },
          { href: '#t', label: 'Team' },
        ]}
        activeHref="#d"
        action={
          <Stack direction="row" gap={2} align="center">
            <IconButton variant="soft" label="Notifications"><i className="ph ph-bell" /></IconButton>
            <Avatar name="Agustin Lago" status="online" size={34} />
          </Stack>
        }
      />

      <Section size="md">
        <Container>
          <Stack gap={5}>
            <PageHeader
              eyebrow="Workspace"
              title="Good morning, Agustin."
              subtitle="Here’s what’s happening across your projects today."
              action={
                <Stack direction="row" gap={2}>
                  <Button variant="secondary" icon={<i className="ph ph-export" />}>Export</Button>
                  <Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>
                </Stack>
              }
            />

            <div className="sc-grid sc-grid-4">
              <StatCard label="Active projects" value="8" delta="+2" up icon={<i className="ph ph-folders" />} />
              <StatCard label="Deploys this week" value="34" delta="+12%" up icon={<i className="ph ph-rocket-launch" />} />
              <StatCard label="Open issues" value="5" delta="−3" up={false} icon={<i className="ph ph-bug" />} />
              <StatCard label="Uptime" value="99.9%" delta="30d" icon={<i className="ph ph-pulse" />} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.6fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }}>
              {/* Main: projects table */}
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <Stack direction="row" gap={3} align="center" justify="space-between" wrap>
                    <Tabs value={tab} onChange={(v) => { setTab(v); setPage(1) }} tabs={[
                      { value: 'all', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'paused', label: 'Paused' },
                      { value: 'archived', label: 'Archived' },
                    ]} />
                    <Stack direction="row" gap={2} align="center">
                      <SearchInput value={q} onChange={setQ} placeholder="Find project…" count={rows.length} size="sm" />
                      <SegmentedControl size="sm" value={view} onChange={setView}
                        options={[{ value: 'table', label: 'Table' }, { value: 'grid', label: 'Grid' }]} />
                    </Stack>
                  </Stack>

                  {chips.length > 0 && (
                    <FilterBar
                      filters={chips}
                      onRemove={(f) => setChips((cs) => cs.filter((c) => c.id !== f.id))}
                      onClear={() => setChips([])}
                    />
                  )}

                  {view === 'table' ? (
                    <Table
                      sortKey={sortKey}
                      sortDir={sortDir}
                      onSort={onSort}
                      columns={[
                        { key: 'name', label: 'Project', sortable: true },
                        { key: 'owner', label: 'Owner' },
                        { key: 'deploys', label: 'Deploys', align: 'right', sortable: true },
                        { key: 'status', label: 'Status' },
                        { key: 'updated', label: 'Updated', align: 'right', muted: true },
                      ]}
                      rows={rows.map((r) => ({
                        name: <strong style={{ fontWeight: 'var(--weight-semibold)' }}>{r.name}</strong>,
                        owner: <Stack direction="row" gap={1} align="center"><Avatar name={r.owner} size={22} /> {r.owner}</Stack>,
                        deploys: r.deploys,
                        status: (
                          <Badge tone={r.status === 'active' ? 'success' : r.status === 'paused' ? 'warning' : 'neutral'} dot>
                            {r.status}
                          </Badge>
                        ),
                        updated: r.updated,
                      }))}
                    />
                  ) : (
                    <div className="sc-grid">
                      {rows.map((r) => (
                        <Card key={r.name} variant="raised" interactive style={{ padding: 18 }}>
                          <Stack gap={2}>
                            <Stack direction="row" justify="space-between" align="center">
                              <strong>{r.name}</strong>
                              <Menu
                                align="right"
                                trigger={<IconButton variant="ghost" size="sm" label="Project actions"><i className="ph ph-dots-three" /></IconButton>}
                                items={[
                                  { label: 'Open', icon: <i className="ph ph-arrow-square-out" /> },
                                  { label: 'Rename', icon: <i className="ph ph-pencil-simple" /> },
                                  { divider: true },
                                  { label: 'Archive', icon: <i className="ph ph-archive" />, danger: true },
                                ]}
                              />
                            </Stack>
                            <Stack direction="row" gap={1} align="center">
                              <Avatar name={r.owner} size={22} />
                              <span className="sc-item-desc">{r.owner} · {r.updated}</span>
                            </Stack>
                            <Stack direction="row" gap={1}><Tag size="sm">react</Tag><Tag size="sm">vite</Tag></Stack>
                          </Stack>
                        </Card>
                      ))}
                    </div>
                  )}

                  <Stack direction="row" justify="space-between" align="center" wrap>
                    <span className="sc-foot-note">{rows.length} of {ROWS.length} projects</span>
                    <Pagination page={page} total={6} onChange={setPage} siblings={1} />
                  </Stack>
                </Stack>
              </Card>

              {/* Sidebar: goal + activity + notifications */}
              <Stack gap={3}>
                <Card variant="featured" style={{ padding: 20 }}>
                  <Stack gap={3} align="center">
                    <strong style={{ alignSelf: 'flex-start' }}>Quarterly goal</strong>
                    <ProgressCircle value={72} size={132} thickness={10} showValue label="of 50 deploys" />
                    <span className="sc-item-desc" style={{ textAlign: 'center' }}>On track — 14 deploys ahead of pace.</span>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Recent activity</strong>
                    <Divider />
                    <Timeline items={[
                      { title: 'Aero Mail deployed', description: 'Production · v2.4.0', time: '2m', status: 'done' },
                      { title: 'Issue #128 closed', description: 'Jess fixed the focus ring', time: '1h', status: 'done' },
                      { title: 'Vista Kit building', description: 'Preview deploy in progress', time: 'now', status: 'active' },
                      { title: 'Review Horizon API', description: 'Awaiting your approval', time: '—', status: 'pending' },
                    ]} />
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 0, overflow: 'hidden' }}>
                  <NotificationItem
                    unread
                    tone="accent"
                    avatar={<Avatar name="Jess Park" size={36} status="online" />}
                    title="Jess mentioned you"
                    body="“Can you review the Liquid Docs theme?”"
                    time="5m"
                  />
                  <Divider />
                  <NotificationItem
                    icon={<i className="ph ph-warning" />}
                    tone="warning"
                    title="Build warning"
                    body="Horizon API bundle is 12% larger."
                    time="1h"
                  />
                </Card>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
