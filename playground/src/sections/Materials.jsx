import React from 'react'
import {
  Section, Container, Stack, GlassPanel, Badge, Button, Popover, Menu,
  IconButton, Card, SegmentedControl,
} from '@agustin/aqus'

const LAYERS = [
  { token: '--glass-surface', note: 'Translucent base — ~62% surface so the backdrop reads through.' },
  { token: 'backdrop blur + saturate', note: 'blur(--glass-blur) saturate(1.6) frosts and enriches what sits behind.' },
  { token: '--accent-glass', note: 'A faint accent film tints the frost toward the brand.' },
  { token: '--glass-inner-gloss', note: 'A top-down white sheen on the upper 42% — the Aqua highlight.' },
  { token: '--glass-border-light / dark', note: 'Light top/left edge, dark bottom/right edge for a lit-from-above bevel.' },
  { token: '--shadow-glass', note: 'Soft cast shadow plus an inset top highlight line.' },
]

const GLASS_LEVELS = {
  thin: {
    label: 'Thin',
    vars: {
      '--glass-blur': '4px',
      '--glass-surface': 'rgba(255,255,255,0.18)',
      '--glass-inner-gloss': 'rgba(255,255,255,0.45)',
    },
    note: '4px blur — barely frosted, content behind reads clearly.',
  },
  frosted: {
    label: 'Frosted',
    vars: {},
    note: '18px blur — default. Backdrop is tinted but unreadable.',
  },
  dense: {
    label: 'Dense',
    vars: {
      '--glass-blur': '48px',
      '--glass-surface': 'rgba(255,255,255,0.82)',
      '--glass-inner-gloss': 'rgba(255,255,255,0.28)',
    },
    note: '48px blur — near-opaque. Backdrop colour bleeds, detail disappears.',
  },
}

// The exact composite every glass chrome surface uses (NavBar, Dialog,
// Popover, Select/Menu dropdowns). Shown here as one inline recipe.
const glassRecipe = {
  background:
    'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
  WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
  backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
  border: '1px solid var(--glass-border-light)',
  borderBottomColor: 'var(--glass-border-dark)',
  borderRightColor: 'var(--glass-border-dark)',
  boxShadow: 'var(--shadow-glass)',
}

export function Materials() {
  const [level, setLevel] = React.useState('frosted')
  const levelCfg = GLASS_LEVELS[level]

  return (
    <Section id="materials" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Materials</p>
        <h2 className="sc-section-title">One glass recipe, everywhere</h2>
        <p className="sc-section-lede">
          Every structural surface — the nav, dialogs, drawers, and each popover, select and menu —
          is built from the same frosted-glass composite. Translucent base, blur, accent tint,
          top gloss, beveled edges. Here it is on a vivid backdrop so each layer reads.
        </p>

        <Stack direction="row" gap={3} align="center" justify="space-between" style={{ marginBottom: 12 }}>
          <SegmentedControl
            value={level}
            onChange={setLevel}
            options={Object.entries(GLASS_LEVELS).map(([value, cfg]) => ({ value, label: cfg.label }))}
          />
          <span className="sc-item-desc" style={{ maxWidth: 320 }}>{levelCfg.note}</span>
        </Stack>

        {/* Live stage: vivid backdrop so the frost + tint are visible */}
        <div style={{
          ...levelCfg.vars,
          position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
          padding: '56px 28px', minHeight: 320,
          transition: '--glass-blur var(--dur-ui)',
          background:
            'radial-gradient(120% 120% at 12% 10%, var(--accent-light), transparent 55%),' +
            'radial-gradient(110% 110% at 88% 88%, var(--warning-light), transparent 55%),' +
            'linear-gradient(135deg, var(--accent-mid), var(--accent))',
        }}>
          {/* decorative liquid blobs behind the glass */}
          <span aria-hidden style={{ position: 'absolute', top: 24, right: 64, width: 120, height: 120, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: 'rgba(255,255,255,0.35)', filter: 'blur(2px)' }} />
          <span aria-hidden style={{ position: 'absolute', bottom: 32, left: 48, width: 90, height: 90, borderRadius: '60% 40% 38% 62% / 55% 62% 38% 45%', background: 'rgba(255,255,255,0.25)', filter: 'blur(2px)' }} />

          <Stack gap={4} align="center">
            {/* The canonical GlassPanel */}
            <GlassPanel radius="lg" style={{ padding: 24, maxWidth: 460, width: '100%' }}>
              <Stack gap={3}>
                <Stack direction="row" gap={2} align="center" justify="space-between">
                  <strong style={{ fontSize: 'var(--text-body-lg)' }}>Aero glass</strong>
                  <Badge tone="accent" pill>GlassPanel</Badge>
                </Stack>
                <p className="sc-item-desc" style={{ margin: 0 }}>
                  Frosted, accent-tinted, lit from above. The blur samples the colorful
                  backdrop behind it — move it onto any surface and it adapts.
                </p>
                <Stack direction="row" gap={2} wrap>
                  <Button variant="primary" size="sm">Primary</Button>
                  <Popover
                    placement="bottom"
                    trigger={<Button variant="secondary" size="sm" icon={<i className="ph ph-info" />}>Popover</Button>}
                  >
                    <Stack gap={1} style={{ minWidth: 180 }}>
                      <strong style={{ fontSize: 'var(--text-body-sm)' }}>Same recipe</strong>
                      <span className="sc-item-desc">This floating panel uses the identical glass composite.</span>
                    </Stack>
                  </Popover>
                  <Menu
                    align="left"
                    trigger={<IconButton variant="soft" label="Menu"><i className="ph ph-dots-three" /></IconButton>}
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

            {/* Inline-recipe pill, mirrors the nav chrome */}
            <div style={{ ...glassRecipe, borderRadius: 'var(--radius-pill)', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)' }}>Same pill, same glass as the NavBar</span>
            </div>
          </Stack>
        </div>

        {/* Layer breakdown */}
        <div className="sc-grid sc-grid-2" style={{ marginTop: 28 }}>
          {LAYERS.map((l, i) => (
            <Card key={l.token} variant="resting" style={{ padding: 18 }}>
              <Stack direction="row" gap={3} align="flex-start">
                <span className="sc-rule-num">{String(i + 1).padStart(2, '0')}</span>
                <Stack gap={1}>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body-sm)', color: 'var(--accent-text)', background: 'var(--accent-light)', padding: '2px 7px', borderRadius: 'var(--radius-xs)', alignSelf: 'flex-start' }}>{l.token}</code>
                  <span className="sc-item-desc">{l.note}</span>
                </Stack>
              </Stack>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
