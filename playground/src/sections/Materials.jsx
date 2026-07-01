import React from 'react'
import {
  Section, Container, Stack, GlassPanel, Badge, Button, Popover, Menu,
  IconButton, SegmentedControl, DescriptionList,
} from '@agustin/aqus'

const GLASS_LEVELS = {
  thin: {
    label: 'Thin',
    vars: {
      '--glass-blur': '4px',
      '--glass-surface': 'rgba(255,255,255,0.18)',
      '--glass-inner-gloss': 'rgba(255,255,255,0.45)',
    },
    note: '4px blur. Barely frosted — content behind reads clearly.',
  },
  frosted: {
    label: 'Frosted',
    vars: {},
    note: '18px blur. Default. Backdrop tinted but unreadable.',
  },
  dense: {
    label: 'Dense',
    vars: {
      '--glass-blur': '48px',
      '--glass-surface': 'rgba(255,255,255,0.82)',
      '--glass-inner-gloss': 'rgba(255,255,255,0.28)',
    },
    note: '48px blur. Near-opaque. The NavBar uses this level so it reads as solid over scrolling content.',
  },
}

const LAYERS = [
  { term: '--glass-surface',         value: 'Translucent base (~62% surface) — the backdrop reads through.' },
  { term: 'backdrop-filter blur + saturate', value: 'blur(var(--glass-blur)) saturate(1.6) — frosts and enriches what sits behind.' },
  { term: '--accent-glass',          value: 'Faint accent film — tints the frost toward the brand.' },
  { term: '--glass-inner-gloss',     value: 'Top-down white sheen on the upper 42% — the Aqua highlight.' },
  { term: '--glass-border-light/dark', value: 'Light top/left edge, dark bottom/right edge — lit from above.' },
  { term: '--shadow-glass',          value: 'Soft cast shadow plus an inset top highlight line.' },
]

const glassRecipe = {
  background:
    'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)',
  WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
  backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
  border: '1px solid var(--glass-border-light)',
  borderBottomColor: 'var(--glass-border-dark)',
  borderRightColor: 'var(--glass-border-dark)',
  boxShadow: 'var(--shadow-glass)',
}

export function Materials() {
  const [level, setLevel] = React.useState('frosted')
  const cfg = GLASS_LEVELS[level]

  return (
    <Section id="materials" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Materials</p>
        <h2 className="sc-section-title">One glass, every surface</h2>
        <p className="sc-section-lede">
          Blur, tint, gloss, bevel. The same composite builds the nav, dialogs, drawers, and every
          floating panel. Shown here against a vivid backdrop so each layer reads clearly.
        </p>

        <Stack direction="row" gap={3} align="center" wrap style={{ marginBottom: 16 }}>
          <SegmentedControl
            value={level}
            onChange={setLevel}
            options={Object.entries(GLASS_LEVELS).map(([value, c]) => ({ value, label: c.label }))}
          />
          <span className="sc-item-desc" style={{ maxWidth: 340 }}>{cfg.note}</span>
        </Stack>

        {/* Live stage — vivid backdrop so frost and tint are visible */}
        <div style={{
          ...cfg.vars,
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          padding: '56px 28px',
          minHeight: 300,
          background:
            'radial-gradient(120% 120% at 12% 10%, var(--accent-light), transparent 55%),' +
            'radial-gradient(110% 110% at 88% 88%, var(--warning-light, oklch(0.92 0.12 80)), transparent 55%),' +
            'linear-gradient(135deg, var(--accent-mid), var(--accent))',
        }}>
          {/* animated liquid blobs */}
          <span aria-hidden style={{
            position: 'absolute', top: 20, right: 60,
            width: 110, height: 110,
            background: 'rgba(255,255,255,0.32)', filter: 'blur(2px)',
            animation: 'sc-blob-a 9s ease-in-out infinite',
          }} />
          <span aria-hidden style={{
            position: 'absolute', bottom: 28, left: 44,
            width: 80, height: 80,
            background: 'rgba(255,255,255,0.22)', filter: 'blur(2px)',
            animation: 'sc-blob-b 13s ease-in-out infinite',
          }} />
          <span aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 60, height: 60,
            marginTop: -30, marginLeft: -30,
            background: 'rgba(255,255,255,0.15)', filter: 'blur(3px)',
            animation: 'sc-blob-c 7s ease-in-out infinite',
          }} />

          <Stack gap={4} align="center">
            <GlassPanel radius="lg" style={{ padding: 24, maxWidth: 440, width: '100%' }}>
              <Stack gap={3}>
                <Stack direction="row" gap={2} align="center" justify="space-between">
                  <strong style={{ fontSize: 'var(--text-body-lg)' }}>Aero glass</strong>
                  <Badge tone="accent" pill>GlassPanel</Badge>
                </Stack>
                <p className="sc-item-desc" style={{ margin: 0 }}>
                  Frosted, accent-tinted, lit from above. Place it on any surface and it adapts to what's behind it.
                </p>
                <Stack direction="row" gap={2} wrap>
                  <Button variant="primary" size="sm">Primary</Button>
                  <Popover
                    placement="bottom"
                    trigger={<Button variant="secondary" size="sm" icon={<i className="ph ph-stack" />}>Layers</Button>}
                  >
                    <Stack gap={1} style={{ minWidth: 200 }}>
                      <strong style={{ fontSize: 'var(--text-body-sm)' }}>Same recipe</strong>
                      <span className="sc-item-desc">This floating panel uses the identical glass composite.</span>
                    </Stack>
                  </Popover>
                  <Menu
                    align="left"
                    trigger={<IconButton variant="soft" label="More actions"><i className="ph ph-dots-three" /></IconButton>}
                    items={[
                      { label: 'Inspect layers', icon: <i className="ph ph-stack" /> },
                      { label: 'Copy tokens', icon: <i className="ph ph-copy" /> },
                      { divider: true },
                      { label: 'Reset', icon: <i className="ph ph-arrow-counter-clockwise" />, danger: true },
                    ]}
                  />
                </Stack>
              </Stack>
            </GlassPanel>

            {/* Pill showing NavBar recipe */}
            <div style={{
              ...glassRecipe,
              borderRadius: 'var(--radius-pill)',
              padding: '10px 20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{
                width: 8, height: 8,
                borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
                background: 'var(--accent)',
              }} />
              <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                Same pill, same glass as the NavBar
              </span>
            </div>
          </Stack>
        </div>

        {/* Layer breakdown */}
        <div style={{ marginTop: 28 }}>
          <DescriptionList items={LAYERS} columns={2} />
        </div>
      </Container>
    </Section>
  )
}
