import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, Card, Avatar, Badge,
  StatCard, DescriptionList, Timeline, Divider, Switch, Alert, ProgressCircle,
  IconButton, SearchInput, Select, Tooltip, LineChart, DonutChart, EmptyState,
  Dialog, Input, Toast, Menu, Stepper,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const PERF_DATA = [
  { x: 'Jul',  value: 82000,  bench: 80000  },
  { x: 'Aug',  value: 88500,  bench: 83000  },
  { x: 'Sep',  value: 84200,  bench: 81500  },
  { x: 'Oct',  value: 93000,  bench: 86000  },
  { x: 'Nov',  value: 97800,  bench: 89000  },
  { x: 'Dec',  value: 102400, bench: 91000  },
  { x: 'Jan',  value: 99000,  bench: 90000  },
  { x: 'Feb',  value: 107600, bench: 94000  },
  { x: 'Mar',  value: 115000, bench: 98000  },
  { x: 'Apr',  value: 122000, bench: 101000 },
  { x: 'May',  value: 118400, bench: 99000  },
  { x: 'Jun',  value: 128300, bench: 104000 },
]
const PERF_SERIES = [
  { key: 'value', label: 'Portfolio' },
  { key: 'bench', label: 'S&P 500'   },
]

const ALLOC_DATA = [
  { label: 'US Equities',     value: 54 },
  { label: 'International',   value: 18 },
  { label: 'Bonds',           value: 14 },
  { label: 'Alternatives',    value: 14 },
]

const INIT_POSITIONS = [
  { id: 'aapl', ticker: 'AAPL', name: 'Apple Inc.',              shares: 25,  price: 213.40, gain:  18.4, value: 5335  },
  { id: 'msft', ticker: 'MSFT', name: 'Microsoft Corp.',         shares: 15,  price: 421.90, gain:  12.1, value: 6329  },
  { id: 'nvda', ticker: 'NVDA', name: 'NVIDIA Corp.',            shares:  5,  price: 892.40, gain:  67.3, value: 4462  },
  { id: 'googl', ticker: 'GOOGL', name: 'Alphabet Inc.',         shares:  8,  price: 176.80, gain:  -3.2, value: 1414  },
  { id: 'vti',  ticker: 'VTI',  name: 'Vanguard Total Market',  shares: 100, price: 248.30, gain:   9.7, value: 24830 },
  { id: 'bnd',  ticker: 'BND',  name: 'Vanguard Bond Market',   shares:  50, price: 72.40,  gain:   1.2, value: 3620  },
]

const GOALS = [
  { label: 'Build emergency fund',   description: '6 months expenses — done.' },
  { label: 'Max IRA contribution',   description: '$7,000 / $7,000 — done.' },
  { label: 'Hit $100k invested',     description: '$98.3k — almost there.' },
  { label: 'Pay off student loan',   description: '$4,200 remaining.' },
]

const RECENT_TX = [
  { title: 'Dividend — VTI',           description: 'Brokerage · $48.60',       time: 'today',     status: 'done'    },
  { title: 'AAPL purchased',           description: '5 shares at $211.20',       time: 'yesterday', status: 'done'    },
  { title: 'IRA contribution',         description: 'Fidelity · $583',           time: '3d',        status: 'done'    },
  { title: 'GOOGL — trailing stop',    description: 'Pending execution',          time: '5d',        status: 'pending' },
  { title: 'Monthly rebalance',        description: 'Review due in 2 days',      time: '7d',        status: 'active'  },
]

const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k` : `$${n.toLocaleString('en-US')}`
const fmtFull = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const SORT_OPTIONS = [
  { value: 'gain-desc',  label: 'Best performers' },
  { value: 'gain-asc',   label: 'Worst performers' },
  { value: 'value-desc', label: 'Largest positions' },
  { value: 'value-asc',  label: 'Smallest positions' },
]

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
  const [nav,       setNav]       = React.useState('#wealth')
  const [positions, setPositions] = React.useState(INIT_POSITIONS)
  const [q,         setQ]         = React.useState('')
  const [sort,      setSort]      = React.useState('gain-desc')
  const [alerts,    setAlerts]    = React.useState(true)
  const [twofa,     setTwofa]     = React.useState(true)
  const [monthly,   setMonthly]   = React.useState(false)
  const [tradeOpen, setTradeOpen] = React.useState(false)
  const [tradeTicker, setTradeTicker] = React.useState('aapl')
  const [tradeShares, setTradeShares] = React.useState('')
  const [toast,     fireToast]    = useToast()

  const section = nav.slice(1)

  const totalValue  = positions.reduce((s, p) => s + p.value, 0)
  const dayPnl      = positions.reduce((s, p) => s + p.value * 0.0042, 0)
  const ytdReturn   = '+14.2%'
  const cashBalance = 8420

  const sortedPositions = [...positions]
    .filter(p =>
      q === '' ||
      p.ticker.toLowerCase().includes(q.toLowerCase()) ||
      p.name.toLowerCase().includes(q.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'gain-desc')  return b.gain - a.gain
      if (sort === 'gain-asc')   return a.gain - b.gain
      if (sort === 'value-desc') return b.value - a.value
      return a.value - b.value
    })

  const executeTrade = () => {
    const shares = parseFloat(tradeShares)
    if (!shares || shares <= 0) { fireToast('Enter a valid share count.', 'warning'); return }
    const pos = INIT_POSITIONS.find(p => p.id === tradeTicker)
    fireToast(`Bought ${shares} ${pos?.ticker ?? ''} shares.`, 'success')
    setTradeOpen(false)
    setTradeShares('')
  }

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#wealth',    label: 'Wealth' },
          { href: '#positions', label: 'Positions' },
          { href: '#goals',     label: 'Goals' },
          { href: '#settings',  label: 'Settings' },
        ]}
        activeHref={nav}
        onLinkClick={(l) => setNav(l.href)}
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label="No alerts">
              <IconButton variant="soft" label="Notifications"><i className="ph ph-bell" /></IconButton>
            </Tooltip>
            <Avatar name="Marcus Rivera" size={32} status="online" />
          </Stack>
        }
      />

      {/* ── Wealth ────────────────────────────────────────────────────────── */}
      {section === 'wealth' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              {/* Profile hero */}
              <Card variant="featured" style={{ padding: 24 }}>
                <Stack direction="row" gap={4} align="center" justify="space-between" wrap>
                  <Stack direction="row" gap={3} align="center" wrap>
                    <Avatar name="Marcus Rivera" size={56} status="online" />
                    <Stack gap={1}>
                      <Stack direction="row" gap={2} align="center" wrap>
                        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 800 }}>
                          Marcus Rivera
                        </h2>
                        <Badge tone="accent" pill>Growth</Badge>
                        <Badge tone="success" dot>Verified</Badge>
                      </Stack>
                      <span className="sc-item-desc">
                        Portfolio {fmtFull(totalValue + cashBalance)} · Moderate-aggressive
                      </span>
                    </Stack>
                  </Stack>
                  <Button variant="primary" icon={<i className="ph ph-chart-line-up" />} onClick={() => setTradeOpen(true)}>
                    Trade
                  </Button>
                </Stack>
              </Card>

              {/* KPI strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                <StatCard label="Invested"     value={fmt(totalValue)}   delta="+$14.2k YTD"  up icon={<i className="ph ph-chart-line-up" />} />
                <StatCard label="Cash"         value={fmt(cashBalance)}  delta="4% of total"  up icon={<i className="ph ph-currency-dollar" />} />
                <StatCard label="Today's P&L"  value={`+${fmt(dayPnl)}`} delta="+0.42%"       up icon={<i className="ph ph-trend-up" />} />
                <StatCard label="YTD return"   value={ytdReturn}         delta="vs S&P +7.2%"  up icon={<i className="ph ph-trophy" />} />
              </div>

              {/* Performance chart */}
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center">
                      <strong>Portfolio vs S&P 500 — 12 months</strong>
                      <Badge tone="success" pill>+14.2%</Badge>
                    </Stack>
                    <Divider />
                    <LineChart
                      data={PERF_DATA}
                      series={PERF_SERIES}
                      height={200}
                      area
                      valueFormat={(v) => fmt(v)}
                    />
                  </Stack>
                </Card>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Asset allocation</strong>
                    <Divider />
                    <DonutChart
                      data={ALLOC_DATA}
                      size={150}
                      thickness={20}
                      centerValue={fmt(totalValue)}
                      centerLabel="invested"
                      valueFormat={(v) => `${v}%`}
                    />
                  </Stack>
                </Card>
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Positions ─────────────────────────────────────────────────────── */}
      {section === 'positions' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Holdings"
                title="Positions"
                subtitle={`${positions.length} holdings · ${fmtFull(totalValue)} total`}
                action={
                  <Button variant="primary" icon={<i className="ph ph-plus" />} onClick={() => setTradeOpen(true)}>
                    Buy
                  </Button>
                }
              />
              <Stack direction="row" gap={3} wrap align="flex-end">
                <div style={{ flex: 1, minWidth: 180 }}>
                  <SearchInput value={q} onChange={setQ} placeholder="Search ticker or name…" />
                </div>
                <div style={{ minWidth: 200 }}>
                  <Select label="Sort by" value={sort} onChange={setSort} options={SORT_OPTIONS} />
                </div>
              </Stack>

              {sortedPositions.length === 0 ? (
                <EmptyState
                  icon={<i className="ph ph-magnifying-glass" />}
                  title="No positions found"
                  description="Adjust your search."
                  action={<Button variant="secondary" onClick={() => setQ('')}>Clear search</Button>}
                />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
                  {sortedPositions.map(p => (
                    <Card key={p.id} variant="resting" style={{ padding: 20 }}>
                      <Stack gap={3}>
                        <Stack direction="row" align="center" justify="space-between" gap={2}>
                          <Stack direction="row" gap={3} align="center" style={{ minWidth: 0 }}>
                            <span style={{
                              width: 40, height: 40, flex: 'none',
                              background: 'var(--accent-glass)',
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              fontSize: 'var(--text-caption)',
                              color: 'var(--accent)',
                            }}>
                              {p.ticker}
                            </span>
                            <Stack gap={0} style={{ minWidth: 0 }}>
                              <span style={{ fontWeight: 600, fontSize: 'var(--text-body-sm)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {p.name}
                              </span>
                              <span className="sc-foot-note">{p.shares} shares</span>
                            </Stack>
                          </Stack>
                          <Menu
                            align="right"
                            trigger={<IconButton variant="ghost" size="sm" label="Actions"><i className="ph ph-dots-three" /></IconButton>}
                            items={[
                              { label: 'Buy more',   icon: <i className="ph ph-plus" />,                  onClick: () => fireToast(`Buying ${p.ticker}…`) },
                              { label: 'Set alert',  icon: <i className="ph ph-bell" />,                  onClick: () => fireToast(`Alert set for ${p.ticker}.`) },
                              { divider: true },
                              { label: 'Sell',       icon: <i className="ph ph-arrow-up-right" />,        onClick: () => fireToast(`Selling ${p.ticker}…`, 'warning'), danger: true },
                            ]}
                          />
                        </Stack>
                        <Stack direction="row" justify="space-between" align="flex-end">
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h3)', color: 'var(--text)' }}>
                            {fmtFull(p.value)}
                          </span>
                          <Badge tone={p.gain >= 0 ? 'success' : 'danger'} pill>
                            {p.gain >= 0 ? '+' : ''}{p.gain.toFixed(1)}%
                          </Badge>
                        </Stack>
                        <span className="sc-foot-note">{fmtFull(p.price)} / share</span>
                      </Stack>
                    </Card>
                  ))}
                </div>
              )}
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Goals ─────────────────────────────────────────────────────────── */}
      {section === 'goals' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Goals"
                title="Financial milestones"
                subtitle="2026 roadmap — 2 of 4 achieved."
              />
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 24 }}>
                  <Stack gap={3}>
                    <strong>Milestone tracker</strong>
                    <Divider />
                    <Stepper orientation="vertical" current={2} steps={GOALS} />
                  </Stack>
                </Card>
                <Stack gap={3}>
                  <Card variant="featured" style={{ padding: 20 }}>
                    <Stack gap={3} align="center">
                      <strong style={{ alignSelf: 'flex-start' }}>$100k invested</strong>
                      <ProgressCircle value={98} size={110} showValue label="$98.3k of $100k" thickness={10} />
                    </Stack>
                  </Card>
                  <Card variant="resting" style={{ padding: 20 }}>
                    <Stack gap={3}>
                      <strong>Recent activity</strong>
                      <Divider />
                      <Timeline items={RECENT_TX} />
                    </Stack>
                  </Card>
                </Stack>
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Settings ──────────────────────────────────────────────────────── */}
      {section === 'settings' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Settings"
                title="Account settings"
                subtitle="Manage your preferences and security."
              />
              <Alert tone="success" title="Account secured">Two-factor authentication is active.</Alert>
              <div className="sc-split" style={{ gap: 20 }}>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Preferences</strong>
                    <Divider />
                    <Stack direction="row" justify="space-between" align="center" gap={3}>
                      <Stack gap={0} style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Price alerts</span>
                        <span className="sc-foot-note">Notify on moves ≥ 5%</span>
                      </Stack>
                      <Switch checked={alerts} onChange={setAlerts} />
                    </Stack>
                    <Stack direction="row" justify="space-between" align="center" gap={3}>
                      <Stack gap={0} style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Two-factor auth</span>
                        <span className="sc-foot-note">Code required at login</span>
                      </Stack>
                      <Switch checked={twofa} onChange={setTwofa} />
                    </Stack>
                    <Stack direction="row" justify="space-between" align="center" gap={3}>
                      <Stack gap={0} style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Monthly summary</span>
                        <span className="sc-foot-note">Email digest on the 1st</span>
                      </Stack>
                      <Switch checked={monthly} onChange={setMonthly} />
                    </Stack>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => fireToast('Preferences saved.', 'success')}
                    >
                      Save changes
                    </Button>
                  </Stack>
                </Card>
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Account details</strong>
                    <Divider />
                    <DescriptionList items={[
                      { term: 'Account type',  value: 'Individual brokerage' },
                      { term: 'Risk profile',  value: 'Moderate-aggressive' },
                      { term: 'Tax bracket',   value: '22%' },
                      { term: 'Member since',  value: 'March 2022' },
                      { term: 'Advisor',       value: 'Self-directed' },
                    ]} />
                  </Stack>
                </Card>
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Trade dialog ──────────────────────────────────────────────────── */}
      <Dialog
        open={tradeOpen}
        onClose={() => setTradeOpen(false)}
        title="Place order"
        actions={
          <>
            <Button variant="ghost" onClick={() => setTradeOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={executeTrade}>Buy</Button>
          </>
        }
      >
        <Stack gap={3}>
          <p style={{ margin: 0, fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
            Market orders execute at current price.
          </p>
          <Select
            label="Ticker"
            value={tradeTicker}
            onChange={setTradeTicker}
            options={INIT_POSITIONS.map(p => ({ value: p.id, label: `${p.ticker} — ${fmtFull(p.price)}` }))}
          />
          <Input
            label="Shares"
            type="number"
            value={tradeShares}
            onChange={(e) => setTradeShares(e.target.value)}
            placeholder="0"
            icon={<i className="ph ph-trend-up" />}
          />
          {tradeShares && !isNaN(parseFloat(tradeShares)) && (
            <Alert tone="accent" title={`Estimated total: ${fmtFull(
              parseFloat(tradeShares) * (INIT_POSITIONS.find(p => p.id === tradeTicker)?.price ?? 0)
            )}`} />
          )}
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
