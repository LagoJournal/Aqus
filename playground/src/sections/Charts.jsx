import React from 'react'
import {
  Section, Container, Stack, Card, Badge, SegmentedControl,
  StatCard, Divider,
  BarChart, LineChart, DonutChart, Sparkline,
} from '@agustin/aqus'

const MONTHLY = [
  { x: 'Jan', revenue: 42, users: 18 },
  { x: 'Feb', revenue: 58, users: 24 },
  { x: 'Mar', revenue: 51, users: 21 },
  { x: 'Apr', revenue: 74, users: 35 },
  { x: 'May', revenue: 88, users: 42 },
  { x: 'Jun', revenue: 95, users: 51 },
  { x: 'Jul', revenue: 82, users: 47 },
  { x: 'Aug', revenue: 110, users: 63 },
]

const LINE_SERIES = [
  { key: 'revenue', label: 'Revenue ($k)' },
  { key: 'users', label: 'Active users (k)' },
]

const QUARTERLY = [
  { x: 'Q1', web: 120, mobile: 88, api: 44 },
  { x: 'Q2', web: 160, mobile: 110, api: 62 },
  { x: 'Q3', web: 148, mobile: 132, api: 78 },
  { x: 'Q4', web: 210, mobile: 168, api: 95 },
]

const BAR_SERIES = [
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'api', label: 'API' },
]

const DONUT_DATA = [
  { label: 'Design systems', value: 38 },
  { label: 'Web apps', value: 27 },
  { label: 'APIs', value: 18 },
  { label: 'Mobile', value: 12 },
  { label: 'Other', value: 5 },
]

const SPARKLINES = [
  { label: 'Page views', value: '248k', delta: '+14%', up: true, data: [30, 42, 38, 55, 48, 62, 70, 88, 75, 95] },
  { label: 'Conversions', value: '3.8%', delta: '+0.4pp', up: true, data: [2.8, 3.1, 2.9, 3.3, 3.0, 3.5, 3.6, 3.8, 3.7, 3.9] },
  { label: 'Bounce rate', value: '24%', delta: '−3pp', up: true, data: [32, 30, 29, 27, 26, 25, 24, 23, 25, 24] },
  { label: 'Avg session', value: '4m 12s', delta: '+18s', up: true, data: [180, 195, 200, 210, 205, 218, 230, 240, 235, 252] },
]

export function Charts() {
  const [barMode, setBarMode] = React.useState('grouped')

  return (
    <Section id="charts" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Data</p>
        <h2 className="sc-section-title">Charts</h2>
        <p className="sc-section-lede">
          Pure SVG, no external chart library. Accent-driven categorical palette that
          automatically recolors with the global theme. Glass hover tooltips, smooth
          Catmull-Rom curves, and liquid end-markers on lines.
        </p>

        {/* Sparkline stat row */}
        <div className="sc-grid sc-grid-4" style={{ marginBottom: 28 }}>
          {SPARKLINES.map((s) => (
            <Card key={s.label} variant="resting" style={{ padding: 18 }}>
              <Stack gap={2}>
                <Stack direction="row" justify="space-between" align="flex-start">
                  <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</span>
                  <Badge tone={s.up ? 'success' : 'danger'} pill>{s.delta}</Badge>
                </Stack>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h3)', color: 'var(--text)', lineHeight: 1 }}>{s.value}</span>
                <Sparkline data={s.data} width={120} height={32} />
              </Stack>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24, marginBottom: 24 }}>
          {/* Line chart */}
          <Card variant="resting" style={{ padding: 20 }}>
            <Stack gap={3}>
              <Stack direction="row" justify="space-between" align="center">
                <strong>Growth over time</strong>
                <Badge tone="accent" pill>8 months</Badge>
              </Stack>
              <Divider />
              <LineChart
                data={MONTHLY}
                series={LINE_SERIES}
                height={220}
                area
                valueFormat={(v) => `${v}k`}
              />
            </Stack>
          </Card>

          {/* Donut chart */}
          <Card variant="resting" style={{ padding: 20 }}>
            <Stack gap={3}>
              <strong>Revenue mix</strong>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DonutChart
                  data={DONUT_DATA}
                  size={180}
                  thickness={22}
                  centerValue="100%"
                  centerLabel="of goal"
                  valueFormat={(v) => `${v}%`}
                />
              </div>
            </Stack>
          </Card>
        </div>

        {/* Bar chart */}
        <Card variant="resting" style={{ padding: 20 }}>
          <Stack gap={3}>
            <Stack direction="row" justify="space-between" align="center" wrap>
              <strong>Quarterly channel breakdown</strong>
              <SegmentedControl
                size="sm"
                value={barMode}
                onChange={setBarMode}
                options={[{ value: 'grouped', label: 'Grouped' }, { value: 'stacked', label: 'Stacked' }]}
              />
            </Stack>
            <Divider />
            <BarChart
              data={QUARTERLY}
              series={BAR_SERIES}
              height={220}
              stacked={barMode === 'stacked'}
              valueFormat={(v) => `$${v}k`}
            />
          </Stack>
        </Card>
      </Container>
    </Section>
  )
}
