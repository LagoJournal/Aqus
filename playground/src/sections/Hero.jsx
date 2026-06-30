import React from 'react'
import {
  Section, Container, HeroSection, Button, Badge, Stack,
  Monogram, LiquidBubble,
} from '@agustin/aqus'

export function Hero() {
  return (
    <Section id="overview" size="lg" horizon className="anchor">
      <Container>
        <HeroSection
          align="center"
          eyebrow="Retro-Aero × Modern · 71 components"
          headline={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Monogram size={56} letter="A" />
              <span>Aqus</span>
            </span>
          }
          sub="A self-contained React component library. Glass and gloss on structural chrome; flat, honest content everywhere else. Every round element is a slowly-morphing liquid bubble — never a perfect circle."
          cta={
            <Stack direction="row" gap={3} justify="center" wrap>
              <Button variant="primary" size="lg" pulse icon={<i className="ph ph-rocket-launch" />}
                onClick={() => document.getElementById('usage')?.scrollIntoView()}>
                Get started
              </Button>
              <Button variant="secondary" size="lg" icon={<i className="ph ph-squares-four" />}
                onClick={() => document.getElementById('glossary')?.scrollIntoView()}>
                Browse components
              </Button>
            </Stack>
          }
        />

        <Stack direction="row" gap={2} justify="center" wrap style={{ marginTop: 8 }}>
          <Badge tone="accent" dot>71 components</Badge>
          <Badge tone="success" dot>Light + dark</Badge>
          <Badge tone="neutral" dot>OKLCH tokens</Badge>
          <Badge tone="warning" dot>Self-hosted fonts</Badge>
          <Badge tone="accent" dot>TypeScript contracts</Badge>
        </Stack>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 40, opacity: 0.9 }}>
          <LiquidBubble size={28} color="var(--accent)" />
          <LiquidBubble size={20} variant="outline" color="var(--accent-mid)" />
          <LiquidBubble size={32} variant="spinner" color="var(--accent)" />
          <LiquidBubble size={20} variant="outline" color="var(--accent-mid)" />
          <LiquidBubble size={28} color="var(--accent)" />
        </div>
      </Container>
    </Section>
  )
}
