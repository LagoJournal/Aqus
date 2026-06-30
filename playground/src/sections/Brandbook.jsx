import React from 'react'
import {
  Section, Container, Stack, FeatureCard, Card, Divider,
  LiquidBubble, Badge,
} from '@agustin/aqus'

const RULES = [
  {
    icon: <i className="ph ph-square-half" />,
    title: 'Glass is structural',
    description: 'NavBar, Dialog, Drawer, GlassPanel. Content stays flat — blur and gloss only on chrome.',
  },
  {
    icon: <i className="ph ph-circle-dashed" />,
    title: 'Round = LiquidBubble',
    description: 'Every circular element is a slowly-morphing liquid shape. Never border-radius: 50%.',
  },
  {
    icon: <i className="ph ph-drop" />,
    title: 'One accent',
    description: 'Override the 9 --accent-* tokens in :root. L 0.55–0.72, C 0.12–0.24. No second color, no hex.',
  },
  {
    icon: <i className="ph ph-coins" />,
    title: 'Tokens, not literals',
    description: 'var(--space-4), var(--accent) — never 16px or #3b82f6. Depth is earned by the system.',
  },
  {
    icon: <i className="ph ph-stack" />,
    title: 'Compose from primitives',
    description: 'Button, Card, Input. Never re-style raw HTML elements or reach for border-radius on a div.',
  },
  {
    icon: <i className="ph ph-wind" />,
    title: 'Physics motion',
    description: 'Spring entrances and hover lift on chrome. Data surfaces: micro-interactions only.',
  },
]

const TYPE_SAMPLES = [
  { tok: '--text-display-lg', sample: 'Aqus' },
  { tok: '--text-h1',         sample: 'Retro-Aero' },
  { tok: '--text-h3',         sample: 'Glass chrome' },
  { tok: '--text-body',       sample: 'Compose from the primitives.' },
  { tok: '--text-label',      sample: 'OKLCH TOKENS' },
]

const ACCENT_SWATCHES = [
  '--accent', '--accent-hover', '--accent-light', '--accent-mid',
  '--accent-text', '--accent-glow', '--accent-glass', '--focus-ring', '--on-accent',
]

export function Brandbook() {
  return (
    <Section id="brand" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">The system</p>
        <h2 className="sc-section-title">Six rules, one voice</h2>
        <p className="sc-section-lede">
          The liquid identity lives in shape, motion, and material — never in behavior. Every constraint
          below keeps the system coherent regardless of who builds the view.
        </p>

        {/* Six rules — FeatureCard grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {RULES.map((r) => (
            <FeatureCard key={r.title} icon={r.icon} title={r.title} description={r.description} />
          ))}
        </div>

        {/* Identity split: type scale | accent + motion */}
        <div className="sc-split">

          {/* LEFT — type scale */}
          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Type scale</strong>
              <Divider />
              <Stack gap={3}>
                {TYPE_SAMPLES.map(({ tok, sample }) => (
                  <Stack key={tok} gap={0}>
                    <span style={{
                      fontSize: `var(${tok})`,
                      lineHeight: 1.15,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minWidth: 0,
                    }}>
                      {sample}
                    </span>
                    <code style={{
                      fontSize: 'var(--text-mini)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {tok}
                    </code>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* RIGHT — accent + motion */}
          <Stack gap={3}>

            {/* Accent system */}
            <Card variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <strong style={{ fontSize: 'var(--text-body-sm)' }}>Accent system</strong>
                <Divider />
                <p className="sc-item-desc" style={{ margin: 0 }}>
                  Nine tokens from one hue. Set --accent-h and the chart palette shifts at 45° steps.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ACCENT_SWATCHES.map((tok) => (
                    <Stack key={tok} gap={1} style={{ alignItems: 'center', minWidth: 0 }}>
                      <span style={{
                        display: 'block',
                        width: 28,
                        height: 20,
                        borderRadius: 'var(--radius-xs)',
                        background: `var(${tok})`,
                        border: '1px solid var(--border)',
                        flexShrink: 0,
                      }} />
                      <code style={{
                        fontSize: 9,
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 64,
                        display: 'block',
                      }}>
                        {tok.replace('--', '')}
                      </code>
                    </Stack>
                  ))}
                </div>
              </Stack>
            </Card>

            {/* Motion */}
            <Card variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong style={{ fontSize: 'var(--text-body-sm)' }}>Motion</strong>
                  <Badge tone="neutral" pill>springs</Badge>
                </Stack>
                <Divider />
                <Stack direction="row" gap={3} align="center" wrap>
                  <LiquidBubble size={36} variant="spinner" color="var(--accent)" />
                  <LiquidBubble size={28} color="var(--accent)" />
                  <LiquidBubble size={22} variant="outline" color="var(--accent-mid)" />
                </Stack>
                <p className="sc-item-desc" style={{ margin: 0 }}>
                  The blob morphs slowly; chrome gets spring entrances. Data surfaces stay still.
                </p>
              </Stack>
            </Card>

          </Stack>
        </div>
      </Container>
    </Section>
  )
}
