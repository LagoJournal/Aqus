import React from 'react'
import {
  Section, Container, Stack, FeatureCard, Card, Divider,
  LiquidBubble, Badge, Wordmark,
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

// ── Voice registers ───────────────────────────────────────────────────────────

const VOICE_REGISTERS = [
  {
    name: 'Intentive',
    role: 'the default',
    example: '"Create project" · "Changes saved"',
    description: 'Clear, action-led, calm. Buttons, labels, confirmations, tooltips, most empty states. Verb-led, plain, present tense.',
    tone: 'accent',
    icon: 'ph-cursor-click',
  },
  {
    name: 'Creative',
    role: 'peaks only',
    example: '"depth you can feel."',
    description: 'Evocative, memorable. Reserved for hero headline, success moment, onboarding welcome. Always backed by a plain supporting line.',
    tone: 'success',
    icon: 'ph-sparkle',
  },
  {
    name: 'Technical',
    role: 'docs & data',
    example: '--accent-h: 250 · L 0.65 · C 0.20',
    description: 'Precise, unambiguous. Prop docs, errors, chart labels, changelogs. Exact numbers. No marketing gloss.',
    tone: 'neutral',
    icon: 'ph-code',
  },
]

// ── App monogram concept ──────────────────────────────────────────────────────

const APP_MARKS = [
  { letter: 'A', color: 'oklch(0.60 0.20 255)', label: 'Aqus',  sub: 'design system' },
  { letter: 'V', color: 'oklch(0.60 0.19 155)', label: 'Vault', sub: 'secure storage' },
  { letter: 'P', color: 'oklch(0.60 0.20 38)',  label: 'Prose', sub: 'writing tool' },
  { letter: 'D', color: 'oklch(0.58 0.19 320)', label: 'Dash',  sub: 'analytics' },
  { letter: 'S', color: 'oklch(0.60 0.18 200)', label: 'Sync',  sub: 'data pipeline' },
]

function AppMark({ letter, color, label, sub }) {
  return (
    <Stack gap={2} align="center" style={{ minWidth: 68 }}>
      <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
        <LiquidBubble size={64} color={color} />
        <span style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26,
          color: 'rgba(255,255,255,0.92)', letterSpacing: -1,
          textShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}>{letter}</span>
      </div>
      <Stack gap={0} align="center">
        <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>{label}</span>
        <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{sub}</span>
      </Stack>
    </Stack>
  )
}

// ── Motion hover demo ─────────────────────────────────────────────────────────

function SpringBubble({ size, color, label }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <Stack gap={2} align="center">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.18)' : 'scale(1)',
          cursor: 'pointer',
        }}
      >
        <LiquidBubble size={size} color={color} />
      </div>
      <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
    </Stack>
  )
}

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
          marginBottom: 24,
        }}>
          {RULES.map((r) => (
            <FeatureCard key={r.title} icon={r.icon} title={r.title} description={r.description} />
          ))}
        </div>

        {/* ── Voice registers (above brand marks) ─────────────────────────── */}
        <Card variant="resting" style={{ padding: 24, marginBottom: 24 }}>
          <Stack gap={3}>
            <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Voice — one voice, three registers</strong>
              <span className="sc-item-desc">Sentence case · second person · earn every word</span>
            </Stack>
            <Divider />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
              {VOICE_REGISTERS.map(r => (
                <div key={r.name} style={{
                  padding: 16, borderRadius: 'var(--radius-md)',
                  background: 'var(--bg)', border: '1px solid var(--border)',
                }}>
                  <Stack gap={2}>
                    <Stack direction="row" gap={2} align="center">
                      <i className={`ph ${r.icon}`} style={{ color: 'var(--accent)', fontSize: 18, flex: 'none' }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-body-lg)', color: 'var(--accent)' }}>{r.name}</span>
                      <Badge tone={r.tone} pill>{r.role}</Badge>
                    </Stack>
                    <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{r.example}</span>
                    <span className="sc-item-desc">{r.description}</span>
                  </Stack>
                </div>
              ))}
            </div>
          </Stack>
        </Card>

        {/* ── Brand marks — liquid identity ────────────────────────────────── */}
        <Card variant="resting" style={{ padding: 24, marginBottom: 24 }}>
          <Stack gap={4}>
            <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
              <strong style={{ fontSize: 'var(--text-body-sm)' }}>Brand marks</strong>
              <span className="sc-item-desc">Wordmark · liquid monogram · cross-app cohesion</span>
            </Stack>
            <Divider />

            {/* Wordmark */}
            <Stack direction="row" gap={5} align="center" wrap>
              <Stack gap={2} align="flex-start">
                <Wordmark size={48} animate />
                <Wordmark size={28} animate />
              </Stack>
              <Stack gap={1} style={{ maxWidth: 280, minWidth: 0 }}>
                <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--text)' }}>Wordmark</span>
                <span className="sc-item-desc">
                  "Aqu" is set. The terminal <strong>s</strong> is the mark — liquid, morphing, always tinted to the accent.
                  Scale from 20px to billboard. Never stretch or recolor the letterforms.
                </span>
              </Stack>
            </Stack>

            <Divider />

            {/* Liquid monogram concept */}
            <Stack gap={3}>
              <Stack gap={1}>
                <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700, color: 'var(--text)' }}>Liquid monogram — the same shape, every product</span>
                <span className="sc-item-desc" style={{ maxWidth: '60ch' }}>
                  The bubble holds. The letter and hue change. Every product built on Aqus gets its own identity
                  while sharing the same liquid form — so a suite of unrelated apps feels like a family without looking alike.
                </span>
              </Stack>
              <Stack direction="row" gap={4} wrap align="flex-start">
                {APP_MARKS.map(m => (
                  <AppMark key={m.label} {...m} />
                ))}
              </Stack>
              <div style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-glass)',
                border: '1px solid var(--border)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--text-muted)',
                display: 'flex', gap: 8, alignItems: 'flex-start',
              }}>
                <i className="ph ph-info" style={{ color: 'var(--accent)', marginTop: 1, flex: 'none' }} />
                <span>Each mark uses a valid Aqus accent: L 0.55–0.72, C 0.12–0.24. Swap hue only — the bubble shape, proportions, and morph behavior are fixed.</span>
              </div>
            </Stack>
          </Stack>
        </Card>

        {/* ── Type + accent split ──────────────────────────────────────────── */}
        <div className="sc-split" style={{ marginBottom: 0 }}>

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
                {/* Main ramp strip */}
                <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: 56, border: '1px solid var(--border)' }}>
                  {ACCENT_RAMP.map(({ tok, label }) => (
                    <div key={tok} style={{
                      flex: 1, background: `var(${tok})`,
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                      paddingBottom: 5,
                    }}>
                      <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--ink)', opacity: 0.55, whiteSpace: 'nowrap' }}>
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
                        display: 'block', width: 28, height: 18,
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

            {/* Motion — improved */}
            <Card variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <Stack direction="row" justify="space-between" align="center">
                  <strong style={{ fontSize: 'var(--text-body-sm)' }}>Motion</strong>
                  <Badge tone="neutral" pill>physics only</Badge>
                </Stack>
                <Divider />

                {/* Live demos */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, paddingBottom: 4, flexWrap: 'wrap' }}>
                  {/* Spinner — liquid morph in motion */}
                  <Stack gap={1} align="center">
                    <LiquidBubble size={72} variant="spinner" color="var(--accent)" />
                    <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>liquid morph</span>
                  </Stack>
                  {/* Spring hover — interactive */}
                  <SpringBubble size={52} color="var(--accent-mid)" label="spring hover ↑" />
                  {/* Idle outline */}
                  <Stack gap={1} align="center">
                    <LiquidBubble size={40} variant="outline" color="var(--accent)" />
                    <span style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>idle / upcoming</span>
                  </Stack>
                </div>

                {/* Motion spec table */}
                <Stack gap={0} style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {[
                    ['Entrances',     'agus-enter · spring easing'],
                    ['Hover lift',    'scale(1.03) + shadow-sm'],
                    ['Liquid morph',  '4s ease-in-out infinite'],
                    ['Data surfaces', 'micro-interactions only'],
                    ['Feedback gate', '< 400ms always'],
                  ].map(([rule, spec], i, arr) => (
                    <div key={rule} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '7px 10px',
                      background: i % 2 === 0 ? 'var(--surface-raised)' : 'transparent',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                      gap: 8,
                    }}>
                      <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>{rule}</span>
                      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)', color: 'var(--text-muted)', textAlign: 'right' }}>{spec}</code>
                    </div>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </div>
      </Container>
    </Section>
  )
}
