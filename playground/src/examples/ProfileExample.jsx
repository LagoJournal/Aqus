import React from 'react'
import {
  NavBar, Container, Section, Stack, Button, Card, Avatar, Badge,
  Tabs, DescriptionList, Timeline, StatCard, Switch, Divider, ProgressCircle,
  IconButton, Progress, Stepper, Alert, Tooltip,
} from '@agustin/aqus'

const ACCOUNTS = [
  { name: 'Checking', bank: 'Chase', balance: '$12,430.00', icon: 'ph-bank', tone: 'accent' },
  { name: 'Savings', bank: 'Ally', balance: '$48,200.00', icon: 'ph-piggy-bank', tone: 'success' },
  { name: 'Brokerage', bank: 'Fidelity', balance: '$134,560.00', icon: 'ph-chart-line-up', tone: 'warning' },
  { name: 'Crypto', bank: 'Coinbase', balance: '$8,912.00', icon: 'ph-currency-bitcoin', tone: 'danger' },
]

const PORTFOLIO = [
  { label: 'US Equities', pct: 52, value: '$69,970', change: '+2.4%', up: true },
  { label: 'Bonds', pct: 18, value: '$24,220', change: '+0.3%', up: true },
  { label: 'Int\'l Equities', pct: 16, value: '$21,529', change: '-0.8%', up: false },
  { label: 'Alternatives', pct: 14, value: '$18,838', change: '+1.1%', up: true },
]

const GOALS = [
  { label: 'Emergency fund', description: '6 months expenses · done', current: 0 },
  { label: 'Max IRA contribution', description: '$7,000 / $7,000', current: 1 },
  { label: 'Pay off auto loan', description: '$4,200 remaining', current: 2 },
  { label: 'Down payment fund', description: '62% of $50k goal', current: 3 },
]

const TRANSACTIONS = [
  { title: 'AAPL — 5 shares sold', description: 'Fidelity brokerage · gain +$340', time: 'today', status: 'done' },
  { title: 'Salary deposit', description: 'Chase checking · $6,200 net', time: 'yesterday', status: 'done' },
  { title: 'Rent — auto-pay', description: 'Chase checking · –$2,100', time: '2d', status: 'done' },
  { title: 'IRA contribution', description: 'Ally → Fidelity · $583', time: '3d', status: 'active' },
  { title: 'Crypto rebalance', description: 'Pending settlement', time: '5d', status: 'pending' },
]

export function ProfileExample() {
  const [tab, setTab] = React.useState('overview')
  const [alerts, setAlerts] = React.useState(true)
  const [twofa, setTwofa] = React.useState(true)

  return (
    <div>
      <NavBar
        links={[
          { href: '#', label: 'Home' },
          { href: '#', label: 'Accounts' },
          { href: '#', label: 'Transfer' },
          { href: '#', label: 'Settings' },
        ]}
        activeHref="#"
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label="Notifications">
              <IconButton variant="soft" label="Notifications">
                <i className="ph ph-bell" />
              </IconButton>
            </Tooltip>
            <Avatar name="Sofia Reyes" size={32} status="online" />
          </Stack>
        }
      />

      <Section size="md">
        <Container>
          <Stack gap={4}>
            <Alert tone="accent" title="Quarterly review ready">
              Your Q2 portfolio summary is available — net return +6.2%.
            </Alert>

            {/* Profile header */}
            <Card variant="featured" style={{ padding: 28 }}>
              <Stack direction="row" gap={4} align="center" wrap justify="space-between">
                <Stack direction="row" gap={4} align="center" wrap>
                  <Avatar name="Sofia Reyes" size={80} status="online" />
                  <Stack gap={2}>
                    <Stack direction="row" gap={2} align="center" wrap>
                      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 'var(--weight-extra)' }}>Sofia Reyes</h2>
                      <Badge tone="accent" pill>Premium</Badge>
                      <Badge tone="success" dot>KYC verified</Badge>
                    </Stack>
                    <span className="sc-item-desc">Member since Jan 2021 · Risk profile: Moderate-aggressive</span>
                    <Stack direction="row" gap={3} align="center">
                      <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>Advisor</span>
                      <span style={{ fontSize: 'var(--text-label)', fontWeight: 600, color: 'var(--text)' }}>Marcus Chen, CFP</span>
                      <Divider orientation="vertical" style={{ height: 14 }} />
                      <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>Account</span>
                      <span style={{ fontSize: 'var(--text-label)', fontWeight: 600, color: 'var(--text)' }}>••••8821</span>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={2}>
                  <Button variant="secondary" icon={<i className="ph ph-download-simple" />}>Statement</Button>
                  <Button variant="primary" icon={<i className="ph ph-arrows-left-right" />}>Transfer</Button>
                </Stack>
              </Stack>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 24, alignItems: 'start' }}>
              {/* Left column */}
              <Stack gap={3}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3} align="center">
                    <strong style={{ alignSelf: 'flex-start' }}>Goal progress</strong>
                    <ProgressCircle value={74} size={120} showValue label="on track" />
                    <Divider />
                    <Stack gap={1} style={{ width: '100%' }}>
                      <Stack direction="row" justify="space-between">
                        <span className="sc-item-desc">Annual savings target</span>
                        <span className="sc-foot-note">74%</span>
                      </Stack>
                      <Progress value={74} />
                    </Stack>
                    <Stack gap={1} style={{ width: '100%' }}>
                      <Stack direction="row" justify="space-between">
                        <span className="sc-item-desc">Investment returns target</span>
                        <span className="sc-foot-note">62%</span>
                      </Stack>
                      <Progress value={62} />
                    </Stack>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Account details</strong>
                    <Divider />
                    <DescriptionList items={[
                      { term: 'Risk profile', value: 'Moderate-aggressive' },
                      { term: 'Tax bracket', value: '24%' },
                      { term: 'Rebalance', value: 'Quarterly' },
                      { term: 'Since', value: 'Jan 2021' },
                    ]} />
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Security</strong>
                    <Divider />
                    <Stack direction="row" gap={3} align="center" justify="space-between">
                      <span className="sc-item-desc">Price alerts</span>
                      <Switch checked={alerts} onChange={setAlerts} />
                    </Stack>
                    <Stack direction="row" gap={3} align="center" justify="space-between">
                      <span className="sc-item-desc">Two-factor auth</span>
                      <Switch checked={twofa} onChange={setTwofa} />
                    </Stack>
                  </Stack>
                </Card>
              </Stack>

              {/* Right column */}
              <Stack gap={3}>
                <Tabs value={tab} onChange={setTab} tabs={[
                  { value: 'overview', label: 'Overview' },
                  { value: 'portfolio', label: 'Portfolio' },
                  { value: 'transactions', label: 'Transactions' },
                  { value: 'goals', label: 'Goals' },
                ]} />

                {tab === 'overview' && (
                  <>
                    <div className="sc-grid sc-grid-2">
                      <StatCard label="Net worth" value="$204,102" delta="+6.2%" up icon={<i className="ph ph-trend-up" />} />
                      <StatCard label="Monthly income" value="$6,200" delta="+$400 YoY" up icon={<i className="ph ph-arrow-circle-down" />} />
                      <StatCard label="Monthly spend" value="$3,840" delta="-$120" up icon={<i className="ph ph-arrow-circle-up" />} />
                      <StatCard label="Savings rate" value="38%" delta="+3pts" up icon={<i className="ph ph-piggy-bank" />} />
                    </div>
                    <Card variant="resting" style={{ padding: 20 }}>
                      <Stack gap={3}>
                        <strong>Linked accounts</strong>
                        <Divider />
                        <Stack gap={2}>
                          {ACCOUNTS.map((a) => (
                            <Stack key={a.name} direction="row" align="center" justify="space-between" gap={3}>
                              <Stack direction="row" align="center" gap={2}>
                                <span style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--accent-glass)', display: 'grid', placeItems: 'center', color: 'var(--accent)', fontSize: 16, flexShrink: 0 }}>
                                  <i className={`ph ${a.icon}`} />
                                </span>
                                <Stack gap={0}>
                                  <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)' }}>{a.name}</span>
                                  <span className="sc-foot-note">{a.bank}</span>
                                </Stack>
                              </Stack>
                              <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{a.balance}</span>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  </>
                )}

                {tab === 'portfolio' && (
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <Stack direction="row" justify="space-between" align="center">
                        <strong>Asset allocation</strong>
                        <Badge tone="success" pill>Balanced</Badge>
                      </Stack>
                      <Divider />
                      {PORTFOLIO.map((p) => (
                        <Stack key={p.label} gap={1}>
                          <Stack direction="row" justify="space-between" align="center">
                            <Stack direction="row" gap={2} align="center">
                              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text)', fontWeight: 500 }}>{p.label}</span>
                              <Badge tone={p.up ? 'success' : 'danger'} pill>{p.change}</Badge>
                            </Stack>
                            <Stack direction="row" gap={3} align="center">
                              <span className="sc-foot-note">{p.value}</span>
                              <span className="sc-foot-note">{p.pct}%</span>
                            </Stack>
                          </Stack>
                          <Progress value={p.pct} />
                        </Stack>
                      ))}
                    </Stack>
                  </Card>
                )}

                {tab === 'transactions' && (
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <strong>Recent activity</strong>
                      <Divider />
                      <Timeline items={TRANSACTIONS} />
                    </Stack>
                  </Card>
                )}

                {tab === 'goals' && (
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <Stack direction="row" justify="space-between" align="center">
                        <strong>Financial milestones</strong>
                        <Badge tone="accent">2026</Badge>
                      </Stack>
                      <Divider />
                      <Stepper
                        orientation="vertical"
                        current={2}
                        steps={GOALS}
                      />
                    </Stack>
                  </Card>
                )}
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
