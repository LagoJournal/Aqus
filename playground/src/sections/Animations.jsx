import React from 'react'
import {
  Section, Container, Stack, Card, Carousel, LiquidBubble, Skeleton,
  Spinner, Badge, Button, ProgressCircle,
} from '@agustin/aqus'

const SLIDES = [
  { icon: 'ph-rocket-launch', title: 'Spring entrance', desc: 'Components enter with a physics spring — overshoot + settle.' },
  { icon: 'ph-arrow-up', title: 'Hover lift', desc: 'Interactive cards rise 2px and deepen shadow on pointer-over.' },
  { icon: 'ph-drop', title: 'Liquid blobs', desc: 'Every circle morphs between two blob curves — never a static circle.' },
  { icon: 'ph-spinner-gap', title: 'Conic spinner', desc: 'Spinner arc travels a morphing ring outline — no element rotation.' },
  { icon: 'ph-sun-horizon', title: 'Glassy fades', desc: 'Popovers, dialogs, and drawers dissolve in with blur and opacity.' },
  { icon: 'ph-chart-line', title: 'Data micro', desc: 'Tables, progress bars, and charts use micro-interactions only.' },
]

const BLOB_DEMOS = [
  { label: 'Filled', variant: 'filled', desc: 'Status dots, nav markers, active indicators.' },
  { label: 'Outline', variant: 'outline', desc: 'Empty state, idle steps, toggle off.' },
  { label: 'Spinner', variant: 'spinner', desc: 'Loading arc — conic-gradient on a morphing ring.' },
]

export function Animations() {
  return (
    <Section id="animations" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Motion</p>
        <h2 className="sc-section-title">Physics, not timers</h2>
        <p className="sc-section-lede">
          All animation in Aqus is spring-based — entrance, hover, morphing blobs. Easing curves
          approximate real-world physics so nothing feels mechanical. Data surfaces use micro-interactions
          only; chrome and overlays can breathe.
        </p>

        {/* Carousel */}
        <Card variant="resting" style={{ padding: 28, marginBottom: 40 }}>
          <Stack gap={3} style={{ marginBottom: 20 }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-bold)' }}>
              Motion principles
            </strong>
            <span className="sc-item-desc">Swipe or use the arrows to browse each rule.</span>
          </Stack>
          <Carousel itemWidth="260px" gap={16} showDots>
            {SLIDES.map((s) => (
              <Card key={s.title} interactive style={{ padding: 24, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <i className={`ph ${s.icon}`} style={{ fontSize: 28, color: 'var(--accent)' }} />
                <Stack gap={1}>
                  <strong style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700 }}>{s.title}</strong>
                  <span className="sc-item-desc">{s.desc}</span>
                </Stack>
              </Card>
            ))}
          </Carousel>
        </Card>

        {/* LiquidBubble variants */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {BLOB_DEMOS.map((d) => (
            <Card key={d.label} variant="resting" style={{ padding: 24 }}>
              <Stack gap={3} align="center">
                <LiquidBubble size={40} variant={d.variant} color="var(--accent)" thickness={3} />
                <Stack gap={1} align="center">
                  <strong style={{ fontSize: 'var(--text-body-sm)', fontWeight: 700 }}>{d.label}</strong>
                  <span className="sc-item-desc" style={{ textAlign: 'center' }}>{d.desc}</span>
                </Stack>
              </Stack>
            </Card>
          ))}
        </div>

        {/* Loading states */}
        <Card variant="resting" style={{ padding: 28 }}>
          <Stack gap={4}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-bold)' }}>
              Loading states
            </strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 24, alignItems: 'start' }}>
              <Stack gap={3}>
                <span className="sc-item-desc">Skeleton shimmer — placeholder for text and media.</span>
                <Stack gap={2}>
                  <Skeleton width={200} height={14} />
                  <Skeleton width={160} height={14} />
                  <Skeleton width={120} height={14} />
                </Stack>
                <Stack direction="row" gap={3} align="center">
                  <Skeleton circle height={48} />
                  <Stack gap={2}>
                    <Skeleton width={120} height={12} />
                    <Skeleton width={80} height={12} />
                  </Stack>
                </Stack>
              </Stack>
              <Stack gap={3} align="center">
                <span className="sc-item-desc" style={{ alignSelf: 'flex-start' }}>Circular progress and spinner.</span>
                <Stack direction="row" gap={4} align="center">
                  <ProgressCircle value={68} size={80} showValue />
                  <Stack gap={2} align="center">
                    <Spinner size={36} />
                    <Badge tone="accent">Loading</Badge>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </Stack>
        </Card>
      </Container>
    </Section>
  )
}
