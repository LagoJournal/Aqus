import React from 'react'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, StatCard, Card,
  Table, Badge, Avatar, SearchInput, SegmentedControl, Tabs, IconButton,
  Wordmark, Tag,
} from '@agustin/aqus'

const ROWS = [
  { name: 'Aero Mail', owner: 'Agustin', status: 'active', updated: '2m ago' },
  { name: 'Portfolio v3', owner: 'Agustin', status: 'active', updated: '1h ago' },
  { name: 'Liquid Docs', owner: 'Jess', status: 'archived', updated: 'Yesterday' },
  { name: 'Vista Kit', owner: 'Sam', status: 'active', updated: '3d ago' },
]

export function DashboardExample() {
  const [tab, setTab] = React.useState('all')
  const [view, setView] = React.useState('table')
  const [q, setQ] = React.useState('')

  const rows = ROWS
    .filter((r) => tab === 'all' || r.status === tab)
    .filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <NavBar
        links={[
          { href: '#d', label: 'Dashboard' },
          { href: '#p', label: 'Projects' },
          { href: '#t', label: 'Team' },
        ]}
        activeHref="#d"
        action={<Avatar name="Agustin Lago" status="online" size={34} />}
      />

      <Section size="md">
        <Container>
          <Stack gap={4}>
            <PageHeader
              eyebrow="Workspace"
              title="Good morning, Agustin."
              subtitle="Here’s what’s happening across your projects today."
              action={<Button variant="primary" icon={<i className="ph ph-plus" />}>New project</Button>}
            />

            <div className="sc-grid sc-grid-4">
              <StatCard label="Active projects" value="8" delta="+2" up icon={<i className="ph ph-folders" />} />
              <StatCard label="Deploys this week" value="34" delta="+12%" up icon={<i className="ph ph-rocket-launch" />} />
              <StatCard label="Open issues" value="5" delta="−3" up={false} icon={<i className="ph ph-bug" />} />
              <StatCard label="Uptime" value="99.9%" delta="30d" icon={<i className="ph ph-pulse" />} />
            </div>

            <Card variant="resting" style={{ padding: 20 }}>
              <Stack gap={3}>
                <Stack direction="row" gap={3} align="center" justify="space-between" wrap>
                  <Tabs value={tab} onChange={setTab} tabs={[
                    { value: 'all', label: 'All' },
                    { value: 'active', label: 'Active' },
                    { value: 'archived', label: 'Archived' },
                  ]} />
                  <Stack direction="row" gap={2} align="center">
                    <SearchInput value={q} onChange={setQ} placeholder="Find project…" size="sm" />
                    <SegmentedControl size="sm" value={view} onChange={setView}
                      options={[{ value: 'table', label: 'Table' }, { value: 'grid', label: 'Grid' }]} />
                  </Stack>
                </Stack>

                {view === 'table' ? (
                  <Table
                    columns={[
                      { key: 'name', label: 'Project' },
                      { key: 'owner', label: 'Owner' },
                      { key: 'status', label: 'Status' },
                      { key: 'updated', label: 'Updated', align: 'right', muted: true },
                    ]}
                    rows={rows.map((r) => ({
                      name: <strong style={{ fontWeight: 'var(--weight-semibold)' }}>{r.name}</strong>,
                      owner: <Stack direction="row" gap={1} align="center"><Avatar name={r.owner} size={22} /> {r.owner}</Stack>,
                      status: <Badge tone={r.status === 'active' ? 'success' : 'neutral'} dot>{r.status}</Badge>,
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
                            <Badge tone={r.status === 'active' ? 'success' : 'neutral'} dot>{r.status}</Badge>
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
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
