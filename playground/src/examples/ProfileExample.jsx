import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, Button, Card, Avatar, Badge,
  Tabs, DescriptionList, Timeline, StatCard, Switch, Divider, ProgressCircle,
  IconButton, Progress, Stepper, Alert, Tooltip, LineChart, DonutChart,
  Dialog, Input, Select, Toast, Menu,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const PERF_DATA = [
  { x: 'Jan', portfolio: 195, benchmark: 200 },
  { x: 'Feb', portfolio: 210, benchmark: 205 },
  { x: 'Mar', portfolio: 198, benchmark: 202 },
  { x: 'Apr', portfolio: 225, benchmark: 210 },
  { x: 'May', portfolio: 218, benchmark: 208 },
  { x: 'Jun', portfolio: 242, benchmark: 218 },
  { x: 'Jul', portfolio: 235, benchmark: 215 },
  { x: 'Aug', portfolio: 260, benchmark: 224 },
]
const PERF_SERIES = [
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'benchmark', label: 'S&P 500' },
]

const ALLOCATION_DATA = [
  { label: 'US Equities', value: 52 },
  { label: 'Bonds', value: 18 },
  { label: "Int'l Equities", value: 16 },
  { label: 'Alternatives', value: 14 },
]

const ACCOUNTS = [
  { id: 'chk', name: 'Checking',  bank: 'Chase',    balance: 12430,  icon: 'ph-bank',               tone: 'accent' },
  { id: 'sav', name: 'Savings',   bank: 'Ally',     balance: 48200,  icon: 'ph-piggy-bank',         tone: 'success' },
  { id: 'brk', name: 'Brokerage', bank: 'Fidelity', balance: 134560, icon: 'ph-chart-line-up',      tone: 'warning' },
  { id: 'cry', name: 'Crypto',    bank: 'Coinbase', balance: 8912,   icon: 'ph-currency-bitcoin',   tone: 'danger' },
]

const GOALS = [
  { label: 'Emergency fund', description: '6 months expenses · done' },
  { label: 'Max IRA contribution', description: '$7,000 / $7,000' },
  { label: 'Pay off auto loan', description: '$4,200 remaining' },
  { label: 'Down payment fund', description: '62% of $50k goal' },
]

const TRANSACTIONS = [
  { title: 'AAPL — 5 shares sold', description: 'Fidelity brokerage · gain +$340', time: 'today',     status: 'done' },
  { title: 'Salary deposit',       description: 'Chase checking · $6,200 net',     time: 'yesterday', status: 'done' },
  { title: 'Rent — auto-pay',      description: 'Chase checking · –$2,100',         time: '2d',        status: 'done' },
  { title: 'IRA contribution',     description: 'Ally → Fidelity · $583',           time: '3d',        status: 'active' },
  { title: 'Crypto rebalance',     description: 'Pending settlement',               time: '5d',        status: 'pending' },
]

const fmt = (n) => `$${n.toLocaleString('en-US')}`

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProfileExample() {
  const [nav,       setNav]       = React.useState('#overview')
  const [tab,       setTab]       = React.useState('portfolio')
  const [alerts,    setAlerts]    = React.useState(true)
  const [twofa,     setTwofa]     = React.useState(true)
  const [marketing, setMarketing] = React.useState(false)
  const [xferOpen,  setXferOpen]  = React.useState(false)
  const [from,      setFrom]      = React.useState('chk')
  const [to,        setTo]        = React.useState('sav')
  const [amount,    setAmount]    = React.useState('')
  const [accounts,  setAccounts]  = React.useState(ACCOUNTS)
  const [toast,     fireToast]    = useToast()

  const total = accounts.reduce((a, x) => a + x.balance, 0)
  const section = nav.slice(1)

  const submitTransfer = () => {
    const amt = parseFloat(amount)
    if (!amt || amt <= 0 || from === to) { fireToast('Enter a valid amount and distinct accounts.', 'warning'); return }
    setAccounts(accs => accs.map(a =>
      a.id === from ? { ...a, balance: a.balance - amt }
      : a.id === to ? { ...a, balance: a.balance + amt }
      : a
    ))
    setXferOpen(false); setAmount('')
    fireToast(`Transferred ${fmt(amt)}.`, 'success')
  }

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#overview', label: 'Overview' },
          { href: '#accounts', label: 'Accounts' },
          { href: '#activity', label: 'Activity' },
          { href: '#settings', label: 'Settings' },
        ]}
        activeHref={nav}
        onLinkClick={(l) => setNav(l.href)}
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label="Notifications">
              <IconButton variant="soft" label="Notifications"><i className="ph ph-bell" /></IconButton>
            </Tooltip>
            <Avatar name="Sofia Reyes" size={32} status="online" />
          </Stack>
        }
      />

      <Section size="md">
        <Container>
          <Stack gap={4}>

            {/* Profile header — shared across sections */}
            <Card variant="featured" style={{ padding: 24 }}>
              <Stack direction="row" gap={4} align="center" wrap justify="space-between">
                <Stack direction="row" gap={3} align="center" wrap>
                  <Avatar name="Sofia Reyes" size={64} status="online" />
                  <Stack gap={1}>
                    <Stack direction="row" gap={2} align="center" wrap>
                      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 800 }}>Sofia Reyes</h2>
                      <Badge tone="accent" pill>Premium</Badge>
                      <Badge tone="success" dot>Verified</Badge>
                    </Stack>
                    <span className="sc-item-desc">Net worth {fmt(total)} · Moderate-aggressive</span>
                  </Stack>
                </Stack>
                <Button variant="primary" icon={<i className="ph ph-arrows-left-right" />} onClick={() => setXferOpen(true)}>
                  Transfer
                </Button>
              </Stack>
            </Card>

            {/* ── Overview ──────────────────────────────────────── */}
            {section === 'overview' && (
              <Stack gap={4}>
                <div className="sc-grid sc-grid-4">
                  <StatCard label="Net worth"      value={fmt(total)} delta="+6.2%"    up icon={<i className="ph ph-trend-up" />} />
                  <StatCard label="Monthly income" value="$6,200"     delta="+$400 YoY" up icon={<i className="ph ph-arrow-circle-down" />} />
                  <StatCard label="Monthly spend"  value="$3,840"     delta="-$120"     up icon={<i className="ph ph-arrow-circle-up" />} />
                  <StatCard label="Savings rate"   value="38%"        delta="+3pts"     up icon={<i className="ph ph-piggy-bank" />} />
                </div>

                <Tabs value={tab} onChange={setTab} tabs={[
                  { value: 'portfolio', label: 'Portfolio' },
                  { value: 'goals',     label: 'Goals' },
                ]} />

                {tab === 'portfolio' && (
                  <div className="sc-split" style={{ gap: 20 }}>
                    <Card variant="resting" style={{ padding: 20 }}>
                      <Stack gap={3}>
                        <Stack direction="row" justify="space-between" align="center">
                          <strong>Performance vs benchmark</strong>
                          <Badge tone="success" pill>+6.2% YTD</Badge>
                        </Stack>
                        <Divider />
                        <LineChart data={PERF_DATA} series={PERF_SERIES} height={200} area valueFormat={(v) => `$${v}k`} />
                      </Stack>
                    </Card>
                    <Card variant="resting" style={{ padding: 20 }}>
                      <Stack gap={3}>
                        <strong>Asset allocation</strong>
                        <Divider />
                        <DonutChart data={ALLOCATION_DATA} size={150} thickness={20} centerValue={`$${Math.round(total / 1000)}k`} centerLabel="total" valueFormat={(v) => `${v}%`} />
                      </Stack>
                    </Card>
                  </div>
                )}

                {tab === 'goals' && (
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <Stack direction="row" justify="space-between" align="center">
                        <strong>Financial milestones</strong>
                        <Badge tone="accent">2026</Badge>
                      </Stack>
                      <Divider />
                      <Stepper orientation="vertical" current={2} steps={GOALS} />
                    </Stack>
                  </Card>
                )}
              </Stack>
            )}

            {/* ── Accounts ──────────────────────────────────────── */}
            {section === 'accounts' && (
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                  <strong style={{ fontSize: 'var(--text-body)' }}>Linked accounts</strong>
                  <Button variant="secondary" size="sm" icon={<i className="ph ph-plus" />} onClick={() => fireToast('Link a new account…')}>Add account</Button>
                </Stack>
                <div className="sc-grid sc-grid-2">
                  {accounts.map((a) => (
                    <Card key={a.id} variant="resting" style={{ padding: 18 }}>
                      <Stack direction="row" align="center" justify="space-between" gap={3}>
                        <Stack direction="row" align="center" gap={3}>
                          <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--accent-glass)', display: 'grid', placeItems: 'center', color: 'var(--accent)', fontSize: 20, flexShrink: 0 }}>
                            <i className={`ph ${a.icon}`} />
                          </span>
                          <Stack gap={0}>
                            <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>{a.name}</span>
                            <span className="sc-foot-note">{a.bank}</span>
                          </Stack>
                        </Stack>
                        <Stack direction="row" align="center" gap={2}>
                          <span style={{ fontSize: 'var(--text-body)', fontWeight: 700, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>{fmt(a.balance)}</span>
                          <Menu
                            align="right"
                            trigger={<IconButton variant="ghost" size="sm" label="Account actions"><i className="ph ph-dots-three" /></IconButton>}
                            items={[
                              { label: 'Transfer from', icon: <i className="ph ph-arrow-up-right" />, onClick: () => { setFrom(a.id); setXferOpen(true) } },
                              { label: 'View statement', icon: <i className="ph ph-file-text" />, onClick: () => fireToast(`${a.name} statement opened.`) },
                              { divider: true },
                              { label: 'Unlink', icon: <i className="ph ph-link-break" />, danger: true, onClick: () => fireToast(`${a.name} unlinked.`, 'warning') },
                            ]}
                          />
                        </Stack>
                      </Stack>
                    </Card>
                  ))}
                </div>
                <Card variant="featured" style={{ padding: 20 }}>
                  <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                    <Stack gap={0}>
                      <span className="sc-foot-note">Total balance</span>
                      <span style={{ fontSize: 'var(--text-h3)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{fmt(total)}</span>
                    </Stack>
                    <Button variant="primary" icon={<i className="ph ph-arrows-left-right" />} onClick={() => setXferOpen(true)}>Move money</Button>
                  </Stack>
                </Card>
              </Stack>
            )}

            {/* ── Activity ──────────────────────────────────────── */}
            {section === 'activity' && (
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Recent activity</strong>
                    <Divider />
                    <Timeline items={TRANSACTIONS} />
                  </Stack>
                </Card>
                <Stack gap={3}>
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3} align="center">
                      <strong style={{ alignSelf: 'flex-start' }}>Savings target</strong>
                      <ProgressCircle value={74} size={110} showValue label="on track" />
                    </Stack>
                  </Card>
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={2}>
                      <strong>This month</strong>
                      <Divider />
                      <Stack gap={1}>
                        <Stack direction="row" justify="space-between"><span className="sc-item-desc">Income</span><span className="sc-foot-note" style={{ whiteSpace: 'nowrap' }}>$6,200</span></Stack>
                        <Progress value={100} />
                      </Stack>
                      <Stack gap={1}>
                        <Stack direction="row" justify="space-between"><span className="sc-item-desc">Spent</span><span className="sc-foot-note" style={{ whiteSpace: 'nowrap' }}>$3,840</span></Stack>
                        <Progress value={62} />
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </div>
            )}

            {/* ── Settings ──────────────────────────────────────── */}
            {section === 'settings' && (
              <Stack gap={3}>
                <Alert tone="accent" title="Account secured">Two-factor authentication is active on this account.</Alert>
                <div className="sc-split" style={{ gap: 20 }}>
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <strong>Preferences</strong>
                      <Divider />
                      <Stack direction="row" justify="space-between" align="center" gap={3}>
                        <Stack gap={0} style={{ minWidth: 0 }}><span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Price alerts</span><span className="sc-foot-note">Notify on big swings</span></Stack>
                        <Switch checked={alerts} onChange={setAlerts} />
                      </Stack>
                      <Stack direction="row" justify="space-between" align="center" gap={3}>
                        <Stack gap={0} style={{ minWidth: 0 }}><span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Two-factor auth</span><span className="sc-foot-note">Require a code at login</span></Stack>
                        <Switch checked={twofa} onChange={setTwofa} />
                      </Stack>
                      <Stack direction="row" justify="space-between" align="center" gap={3}>
                        <Stack gap={0} style={{ minWidth: 0 }}><span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Marketing emails</span><span className="sc-foot-note">Product news and offers</span></Stack>
                        <Switch checked={marketing} onChange={setMarketing} />
                      </Stack>
                      <Button variant="secondary" size="sm" onClick={() => fireToast('Preferences saved.', 'success')}>Save changes</Button>
                    </Stack>
                  </Card>
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <strong>Account details</strong>
                      <Divider />
                      <DescriptionList items={[
                        { term: 'Risk profile', value: 'Moderate-aggressive' },
                        { term: 'Tax bracket', value: '24%' },
                        { term: 'Advisor', value: 'Marcus Chen, CFP' },
                        { term: 'Member since', value: 'Jan 2021' },
                      ]} />
                    </Stack>
                  </Card>
                </div>
              </Stack>
            )}
          </Stack>
        </Container>
      </Section>

      {/* ── Transfer dialog ────────────────────────────────────── */}
      <Dialog
        open={xferOpen}
        onClose={() => setXferOpen(false)}
        title="Move money"
        actions={
          <>
            <Button variant="ghost" onClick={() => setXferOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={submitTransfer}>Transfer</Button>
          </>
        }
      >
        <Stack gap={3}>
          <Select label="From" value={from} onChange={setFrom}
            options={accounts.map(a => ({ value: a.id, label: `${a.name} · ${fmt(a.balance)}` }))} />
          <Select label="To" value={to} onChange={setTo}
            options={accounts.map(a => ({ value: a.id, label: `${a.name} · ${fmt(a.balance)}` }))} />
          <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" icon={<i className="ph ph-currency-dollar" />} />
        </Stack>
      </Dialog>

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
