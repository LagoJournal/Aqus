import React from 'react'
import {
  Section, Container, Card, Stack, Badge, Divider, LiquidBubble,
} from '@agustin/aqus'

const RULES = [
  { icon: 'ph-drop',         title: 'One accent',          body: 'Override the 9 --accent-* tokens + --accent-h. L 0.55–0.72, C 0.12–0.24. No second color, no hex.' },
  { icon: 'ph-stack',        title: 'Glass is structural',  body: 'Blur and gloss on chrome only — NavBar, Dialog, Drawer, GlassPanel. Content stays flat.' },
  { icon: 'ph-circle-half',  title: 'Round = LiquidBubble', body: 'Every round element morphs. Never border-radius: 50%.' },
  { icon: 'ph-ruler',        title: 'Tokens, not literals', body: 'var(--space-4), var(--accent) — never 16px or #3b82f6. Depth is earned.' },
  { icon: 'ph-puzzle-piece', title: 'Compose from primitives', body: 'Build from Button/Card/Input — never re-style raw HTML.' },
  { icon: 'ph-shapes',       title: 'Phosphor icons',      body: 'ph ph-<name> only. No emoji in chrome.' },
  { icon: 'ph-wind',         title: 'Physics motion',      body: 'Spring entrances, hover lift. Data surfaces: micro-interactions only.' },
  { icon: 'ph-text-aa',      title: 'Sentence case copy',  body: 'Terse, honest, no hype. "New project" not "New Project".' },
]

const TYPE_SAMPLES = [
  { tok: '--text-display-lg', label: 'Display',   sample: 'Aqus' },
  { tok: '--text-h1',         label: 'Heading 1', sample: 'Retro-Aero' },
  { tok: '--text-h3',         label: 'Heading 3', sample: 'Glass chrome' },
  { tok: '--text-body',       label: 'Body',      sample: 'Compose screens from the primitives.' },
  { tok: '--text-label',      label: 'Label',     sample: 'OKLCH TOKENS' },
]

const ACCENT_SWATCHES = [
  { token: '--accent',       name: '--accent' },
  { token: '--accent-hover', name: '--accent-hover' },
  { token: '--accent-light', name: '--accent-light' },
  { token: '--accent-mid',   name: '--accent-mid' },
  { token: '--accent-text',  name: '--accent-text' },
  { token: '--accent-glow',  name: '--accent-glow' },
  { token: '--accent-glass', name: '--accent-glass' },
  { token: '--focus-ring',   name: '--focus-ring' },
  { token: '--on-accent',    name: '--on-accent' },
]

export function Brandbook() {
  return (
    <Section id="brand" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Brandbook</p>
        <h2 className="sc-section-title">The system, in eight rules</h2>
        <p className="sc-section-lede">
          One accent, structural glass, liquid identity, tokens over literals. These constraints are what make every Aqus view feel like one product.
        </p>

        {/* Hard-rules grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, marginBottom: 32 }}>
          {RULES.map((r) => (
            <Card key={r.title} variant="resting" style={{ padding: 18 }}>
              <Stack gap={2}>
                <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--accent-glass)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: 20 }}>
                  <i className={`ph ${r.icon}`} />
                </span>
                <strong style={{ fontSize: 'var(--text-body-sm)' }}>{r.title}</strong>
                <span className="sc-item-desc">{r.body}</span>
              </Stack>
            </Card>
          ))}
        </div>

        {/* Accent + type + motion row */}
        <div className="sc-split">
          {/* LEFT — type scale */}
          <Card variant="resting" style={{ padding: 20 }}>
            <Stack gap={3}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Type scale</strong>
              <Divider />
              <Stack gap={2}>
                {TYPE_SAMPLES.map(({ tok, label, sample }) => (
                  <Stack key={tok} gap={1}>
                    <span
                      style={{
                        fontSize: `var(${tok})`,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minWidth: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {sample}
                    </span>
                    <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {label} · {tok}
                    </span>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* RIGHT — accent + motion */}
          <Stack gap={3}>
            {/* Accent system */}
            <Card variant="resting" style={{ padding: 20 }}>
              <Stack gap={3}>
                <strong style={{ fontSize: 'var(--text-body-sm)' }}>Accent system</strong>
                <Divider />
                <span className="sc-item-desc">
                  Nine tokens derive from one hue. Set <code>--accent-h</code> and the chart palette shifts at 45° steps — no other changes needed.
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ACCENT_SWATCHES.map(({ token, name }) => (
                    <Stack key={token} gap={1} style={{ alignItems: 'center', minWidth: 0 }}>
                      <span
                        style={{
                          display: 'block',
                          width: 32,
                          height: 24,
                          borderRadius: 'var(--radius-sm)',
                          background: `var(${token})`,
                          border: '1px solid var(--border)',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-mini)',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 72,
                          display: 'block',
                        }}
                      >
                        {name}
                      </span>
                    </Stack>
                  ))}
                </div>
              </Stack>
            </Card>

            {/* Motion */}
            <Card variant="resting" style={{ padding: 20 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong>Motion</strong>
                  <Badge tone="neutral" pill>springs</Badge>
                </Stack>
                <Divider />
                <Stack direction="row" gap={3} align="center" wrap>
                  <LiquidBubble size={40} variant="spinner" color="var(--accent)" />
                  <LiquidBubble size={32} color="var(--accent)" />
                  <LiquidBubble size={24} variant="outline" color="var(--accent-mid)" />
                </Stack>
                <span className="sc-item-desc">Physics-based springs on chrome; the liquid bubble slowly morphs. Data surfaces stay still.</span>
              </Stack>
            </Card>
          </Stack>
        </div>
      </Container>
    </Section>
  )
}
