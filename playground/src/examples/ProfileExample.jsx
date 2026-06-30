import React from 'react'
import {
  NavBar, Container, Section, Stack, Button, Card, Avatar, Badge, Tag,
  Tabs, DescriptionList, Timeline, StatCard, Switch, Divider, ProgressCircle,
  Wordmark, IconButton,
} from '@agustin/aqus'

export function ProfileExample() {
  const [tab, setTab] = React.useState('overview')
  const [pub, setPub] = React.useState(true)

  return (
    <div>
      <NavBar
        links={[
          { href: '#h', label: 'Home' },
          { href: '#p', label: 'People' },
          { href: '#s', label: 'Settings' },
        ]}
        activeHref="#p"
        action={<IconButton variant="soft" label="Notifications"><i className="ph ph-bell" /></IconButton>}
      />

      <Section size="md">
        <Container>
          <Stack gap={4}>
            {/* Profile header */}
            <Card variant="featured" style={{ padding: 28 }}>
              <Stack direction="row" gap={4} align="center" wrap justify="space-between">
                <Stack direction="row" gap={4} align="center" wrap>
                  <Avatar name="Agustin Lago" size={84} status="online" />
                  <Stack gap={2}>
                    <Stack direction="row" gap={2} align="center" wrap>
                      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-extra)' }}>Agustin Lago</h2>
                      <Badge tone="accent" dot>Pro</Badge>
                    </Stack>
                    <span className="sc-item-desc">Product engineer & designer · Buenos Aires</span>
                    <Stack direction="row" gap={2} wrap>
                      <Tag tone="neutral">React</Tag><Tag tone="neutral">Design systems</Tag><Tag tone="neutral">OKLCH</Tag>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={2}>
                  <Button variant="secondary" icon={<i className="ph ph-chat-circle" />}>Message</Button>
                  <Button variant="primary" pulse icon={<i className="ph ph-user-plus" />}>Follow</Button>
                </Stack>
              </Stack>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 28, alignItems: 'start' }}>
              {/* Left column */}
              <Stack gap={3}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Details</strong>
                    <Divider />
                    <DescriptionList items={[
                      { term: 'Role', value: 'Staff Engineer' },
                      { term: 'Team', value: 'Aqus Studio' },
                      { term: 'Joined', value: 'Mar 2024' },
                      { term: 'Email', value: 'agustin@aqus.dev' },
                    ]} />
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3} align="center">
                    <strong style={{ alignSelf: 'flex-start' }}>Profile completion</strong>
                    <ProgressCircle value={86} size={120} showValue label="complete" />
                    <Stack direction="row" gap={3} align="center" justify="space-between" style={{ width: '100%' }}>
                      <span className="sc-item-desc">Public profile</span>
                      <Switch checked={pub} onChange={setPub} />
                    </Stack>
                  </Stack>
                </Card>
              </Stack>

              {/* Right column */}
              <Stack gap={3}>
                <Tabs value={tab} onChange={setTab} tabs={[
                  { value: 'overview', label: 'Overview' },
                  { value: 'activity', label: 'Activity' },
                  { value: 'projects', label: 'Projects' },
                ]} />

                {tab === 'overview' && (
                  <>
                    <div className="sc-grid sc-grid-4">
                      <StatCard label="Repositories" value="42" icon={<i className="ph ph-git-branch" />} />
                      <StatCard label="Followers" value="1.2k" delta="+8%" up icon={<i className="ph ph-users" />} />
                      <StatCard label="Stars" value="3.4k" delta="+120" up icon={<i className="ph ph-star" />} />
                    </div>
                    <Card variant="resting" style={{ padding: 20 }}>
                      <Stack gap={2}>
                        <strong>About</strong>
                        <Divider />
                        <p className="sc-item-desc" style={{ margin: 0 }}>
                          I build branded, production-quality interfaces fast — and I made Aqus to do it
                          consistently. Currently focused on design tooling and the agent that composes
                          views from this library.
                        </p>
                      </Stack>
                    </Card>
                  </>
                )}

                {tab === 'activity' && (
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Timeline items={[
                      { title: 'Released Aqus v0.1.0', description: 'Tagged the first standalone library build.', time: 'now', status: 'done' },
                      { title: 'Wrote the agent guide', description: 'View composition reference for LLMs.', time: '2h', status: 'done' },
                      { title: 'Reviewing component props', description: 'Aligning docs with real contracts.', time: '5h', status: 'active' },
                      { title: 'Publish to GitHub', description: 'Push main + v0.1.0 tag.', time: '—', status: 'pending' },
                    ]} />
                  </Card>
                )}

                {tab === 'projects' && (
                  <div className="sc-grid">
                    {['Aero Mail', 'Portfolio v3', 'Liquid Docs', 'Vista Kit'].map((p) => (
                      <Card key={p} variant="raised" interactive style={{ padding: 18 }}>
                        <Stack gap={2}>
                          <Stack direction="row" justify="space-between" align="center"><strong>{p}</strong><Badge tone="success" dot>Live</Badge></Stack>
                          <span className="sc-item-desc">Updated recently · 12 commits this week</span>
                        </Stack>
                      </Card>
                    ))}
                  </div>
                )}
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
