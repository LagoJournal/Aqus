import React from 'react'
import {
  NavBar, Container, Section, Stack, Button, Card, Avatar, Badge, Tag,
  Tabs, DescriptionList, Timeline, StatCard, Switch, Divider, ProgressCircle,
  IconButton, MediaCard, Progress, Stepper,
} from '@agustin/aqus'

const SKILLS = [
  { label: 'React', value: 95 },
  { label: 'Design systems', value: 88 },
  { label: 'OKLCH / color', value: 76 },
  { label: 'Motion', value: 64 },
]

export function ProfileExample() {
  const [tab, setTab] = React.useState('overview')
  const [pub, setPub] = React.useState(true)
  const [mentions, setMentions] = React.useState(false)

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
                  <Avatar name="Agustin Lago" size={88} status="online" />
                  <Stack gap={2}>
                    <Stack direction="row" gap={2} align="center" wrap>
                      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-extra)' }}>Agustin Lago</h2>
                      <Badge tone="accent" dot>Pro</Badge>
                      <Badge tone="success" pill>Verified</Badge>
                    </Stack>
                    <span className="sc-item-desc">Software engineer</span>
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
                      { term: 'Title', value: 'Software engineer' },
                      { term: 'Focus', value: 'Design systems' },
                      { term: 'Joined', value: '2024' },
                      { term: 'GitHub', value: 'LagoJournal' },
                    ]} />
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3} align="center">
                    <strong style={{ alignSelf: 'flex-start' }}>Profile completion</strong>
                    <ProgressCircle value={86} size={120} showValue label="complete" />
                    <Divider />
                    <Stack direction="row" gap={3} align="center" justify="space-between" style={{ width: '100%' }}>
                      <span className="sc-item-desc">Public profile</span>
                      <Switch checked={pub} onChange={setPub} />
                    </Stack>
                    <Stack direction="row" gap={3} align="center" justify="space-between" style={{ width: '100%' }}>
                      <span className="sc-item-desc">Mention alerts</span>
                      <Switch checked={mentions} onChange={setMentions} />
                    </Stack>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Onboarding</strong>
                    <Divider />
                    <Stepper
                      orientation="vertical"
                      current={2}
                      steps={[
                        { label: 'Create account', description: 'Done' },
                        { label: 'Set up profile', description: 'Done' },
                        { label: 'Invite team', description: 'In progress' },
                        { label: 'Ship first project', description: 'Upcoming' },
                      ]}
                    />
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
                      <Stack gap={3}>
                        <strong>Skills</strong>
                        <Divider />
                        {SKILLS.map((s) => (
                          <Stack key={s.label} gap={1}>
                            <Stack direction="row" justify="space-between" align="center">
                              <span className="sc-item-desc" style={{ color: 'var(--text)' }}>{s.label}</span>
                              <span className="sc-foot-note">{s.value}%</span>
                            </Stack>
                            <Progress value={s.value} height={8} />
                          </Stack>
                        ))}
                      </Stack>
                    </Card>
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
                      { title: 'Aligned docs with real contracts', description: 'Every prop now matches the shipped .d.ts.', time: '5h', status: 'active' },
                      { title: 'Publish to GitHub', description: 'Push main + v0.1.0 tag.', time: '—', status: 'pending' },
                    ]} />
                  </Card>
                )}

                {tab === 'projects' && (
                  <div className="sc-grid sc-grid-2">
                    {[
                      { t: 'Aero Mail', s: 'Branded email client', icon: 'ph-envelope' },
                      { t: 'Portfolio v3', s: 'Personal site rebuild', icon: 'ph-browser' },
                      { t: 'Liquid Docs', s: 'Docs theme kit', icon: 'ph-book-open' },
                      { t: 'Vista Kit', s: 'Marketing starter', icon: 'ph-layout' },
                    ].map((p) => (
                      <MediaCard
                        key={p.t}
                        href="#"
                        media={<div style={{ display: 'grid', placeItems: 'center', height: '100%', background: 'var(--accent-glass)', color: 'var(--accent-text)', fontSize: 40 }}><i className={`ph ${p.icon}`} /></div>}
                        mediaHeight={96}
                        badge={<Badge tone="success" dot>Live</Badge>}
                        title={p.t}
                        subtitle={p.s}
                      />
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
