import React from 'react'
import {
  Section, Container, Stack, FeatureCard, Card, Divider,
  LiquidBubble, Badge, Wordmark, Monogram,
} from '@agustin/aqus'

// ── Brand rules ──────────────────────────────────────────────────────────────

const RULES = [
  {
    icon: <i className="ph ph-square-half" />,
    title: 'Glass is structural',
    description: 'NavBar, Dialog, Drawer, GlassPanel only. Content stays flat — blur and gloss on chrome, never on tables or forms.',
  },
  {
    icon: <i className="ph ph-drop" />,
    title: 'Round = LiquidBubble',
    description: 'Every circular element is a slowly-morphing liquid shape. Never border-radius: 50% — use <LiquidBubble>.',
  },
  {
    icon: <i className="ph ph-palette" />,
    title: 'One accent',
    description: 'Override all 9 --accent-* tokens in :root. L 0.55–0.72, C 0.12–0.24. No second color, no hardcoded hex.',
  },
  {
    icon: <i className="ph ph-coins" />,
    title: 'Tokens, not literals',
    description: 'var(--space-4), var(--accent) — never 16px or #3b82f6. Depth, spacing, and color are earned by the system.',
  },
  {
    icon: <i className="ph ph-stack" />,
    title: 'Compose from primitives',
    description: 'Build with Button, Card, Input. Never re-style raw HTML elements or rebuild a library component inside a view.',
  },
  {
    icon: <i className="ph ph-moon-stars" />,
    title: 'Theme-adaptive',
    description: 'Use semantic aliases (--bg, --surface, --text, --border). Never hardcode --cream or --navy-deep — dark mode must always work.',
  },
]

// ── Accent tokens ─────────────────────────────────────────────────────────────

const ACCENT_RAMP = [
  { tok: '--accent-light', label: 'light' },
  { tok: '--accent-mid',   label: 'mid' },
  { tok: '--accent',       label: 'accent' },
  { tok: '--accent-hover', label: 'hover' },
  { tok: '--accent-text',  label: 'text' },
]

const ACCENT_DERIVED = [
  { tok: '--accent-glow',  label: 'glow' },
  { tok: '--accent-glass', label: 'glass' },
  { tok: '--focus-ring',   label: 'focus' },
  { tok: '--on-accent',    label: 'on-accent' },
]

// ── Type scale ────────────────────────────────────────────────────────────────

const TYPE_SAMPLES = [
  { tok: '--text-display-lg', sample: 'Aqus' },
  { tok: '--text-h1',         sample: 'Retro-Aero' },
  { tok: '--text-h3',         sample: 'Glass chrome' },
  { tok: '--text-body',       sample: 'Compose from the primitives.' },
  { tok: '--text-label',      sample: 'OKLCH TOKENS' },
]

// ── Voice registers ───────────────────────────────────────────────────────────

const VOICE_REGISTERS = [
  {
    name: 'Intentive',
    role: 'the default',
    example: '"Create project" · "Changes saved"',
    description: 'Clear, action-led, calm. Buttons, labels, confirmations, tooltips, most empty states.',
    tone: 'accent',
  },
  {
    name: 'Creative',
    role: 'the peak',
    example: '"depth you can feel."',
    description: 'Evocative, memorable. Reserved for hero headline, success moment, onboarding welcome. Always backed by a plain line.',
    tone: 'success',
  },
  {
    name: 'Technical',
    role: 'the proof',
    example: '--accent-h: 250 · L 0.65 · C 0.20',
    description: 'Precise, unambiguous. Prop docs, error messages, chart labels, changelogs. Exact numbers, no marketing gloss.',
    tone: 'neutral',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

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

        {/* Six brand rules */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 16,
          marginBottom: 40,
        }}>
          {RULES.map((r) => (
            <FeatureCard key={r.title} icon={r.icon} title={r.title} description={r.description} />
          ))}
        </div>

        {/* Brand marks */}
        <Card variant="resting" style={{ padding: 24, marginBottom: 24 }}>
          <Stack gap={4}>
            <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Brand marks</strong>
              <span className="sc-item-desc">Wordmark · Monogram · liquid bubble family</span>
            </Stack>
            <Divider />
            <Stack direction="row" gap={5} align="center" wrap>
              {/* Wordmark at multiple sizes */}
              <Stack gap={3} align="flex-start">
                <Wordmark size={48} animate />
                <Wordmark size={32} animate />
                <Wordmark size={20} animate />
              </Stack>

              <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)' }} />

              {/* Monogram at multiple sizes */}
              <Stack direction="row" gap={3} align="center">
                <Monogram size={64} animate />
                <Monogram size={44} animate />
                <Monogram size={28} animate />
              </Stack>

              <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)' }} />

              {/* LiquidBubble family — 3 variants */}
              <Stack gap={2}>
                <Stack direction="row" gap={3} align="center">
                  <LiquidBubble size={36} color="var(--accent)" />
                  <Stack gap={0}>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Filled</span>
                    <span className="sc-foot-note">dots · knobs · ticks</span>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={3} align="center">
                  <LiquidBubble size={36} variant="outline" color="var(--accent)" />
                  <Stack gap={0}>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Outline</span>
                    <span className="sc-foot-note">idle · upcoming</span>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={3} align="center">
                  <LiquidBubble size={36} variant="spinner" color="var(--accent)" />
                  <Stack gap={0}>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>Spinner</span>
                    <span className="sc-foot-note">loading · in-progress</span>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Type + accent split */}
        <div className="sc-split" style={{ marginBottom: 24 }}>

          {/* LEFT — type scale */}
          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <Stack direction="row" justify="space-between" align="center">
                <strong style={{ fontSize: 'var(--text-body-sm)' }}>Type scale</strong>
                <span className="sc-item-desc">Nunito · Plus Jakarta Sans · JetBrains Mono</span>
              </Stack>
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

          {/* RIGHT — accent system + motion */}
          <Stack gap={3}>

            {/* Accent ramp */}
            <Card variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong style={{ fontSize: 'var(--text-body-sm)' }}>Accent system</strong>
                  <Badge tone="accent" pill>9 tokens · 1 hue</Badge>
                </Stack>
                <Divider />

                {/* Main ramp — 5 steps as a strip */}
                <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: 52, border: '1px solid var(--border)' }}>
                  {ACCENT_RAMP.map(({ tok, label }) => (
                    <div key={tok} style={{
                      flex: 1, background: `var(${tok})`,
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                      paddingBottom: 4,
                    }}>
                      <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--ink)', opacity: 0.5, whiteSpace: 'nowrap' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Derived tokens */}
                <Stack direction="row" gap={2} wrap>
                  {ACCENT_DERIVED.map(({ tok, label }) => (
                    <Stack key={tok} gap={1} align="center">
                      <span style={{
                        display: 'block', width: 24, height: 16,
                        borderRadius: 'var(--radius-xs)',
                        background: `var(${tok})`,
                        border: '1px solid var(--border)',
                        flexShrink: 0,
                      }} />
                      <code style={{ fontSize: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                        {label}
                      </code>
                    </Stack>
                  ))}
                </Stack>

                <span className="sc-item-desc" style={{ margin: 0 }}>
                  Set <code>--accent-h</code> once. Chart palette auto-derives at 45° steps.
                </span>
              </Stack>
            </Card>

            {/* Motion */}
            <Card variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong style={{ fontSize: 'var(--text-body-sm)' }}>Motion</strong>
                  <Badge tone="neutral" pill>springs only</Badge>
                </Stack>
                <Divider />
                <Stack direction="row" gap={3} align="center" wrap>
                  <LiquidBubble size={36} variant="spinner" color="var(--accent)" />
                  <LiquidBubble size={28} color="var(--accent)" />
                  <LiquidBubble size={22} variant="outline" color="var(--accent-mid)" />
                </Stack>
                <span className="sc-item-desc" style={{ margin: 0 }}>
                  Chrome gets spring entrances and hover lift. Data surfaces stay still — no ambient animation on charts or tables.
                </span>
              </Stack>
            </Card>
          </Stack>
        </div>

        {/* Voice registers */}
        <Card variant="resting" style={{ padding: 24 }}>
          <Stack gap={3}>
            <Stack direction="row" justify="space-between" align="center">
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Voice — one voice, three registers</strong>
              <span className="sc-item-desc">Sentence case · second person · earn every word</span>
            </Stack>
            <Divider />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
              {VOICE_REGISTERS.map(r => (
                <div key={r.name} style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                }}>
                  <Stack gap={2}>
                    <Stack direction="row" gap={2} align="center">
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-body-lg)', color: 'var(--accent)' }}>{r.name}</span>
                      <Badge tone={r.tone} pill>{r.role}</Badge>
                    </Stack>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)' }}>{r.example}</span>
                    <span className="sc-item-desc">{r.description}</span>
                  </Stack>
                </div>
              ))}
            </div>
          </Stack>
        </Card>
      </Container>
    </Section>
  )
}
