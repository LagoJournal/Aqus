import React from 'react'
import {
  Section, Container, HeroSection, Button, Badge, Stack, LiquidBubble,
} from '@agustin/aqus'

export function Hero({ onPrimary, onSecondary }) {
  return (
    <Section id="overview" size="lg" horizon className="anchor">
      <Container>
        <HeroSection
          align="center"
          eyebrow="Retro-Aero × Modern"
          headline="Interfaces with depth, material, and craft."
          sub="76 components. Glass chrome on structural surfaces, flat honesty on content. One accent, nine derived tokens — a liquid identity that morphs, not spins."
          cta={
            <Stack direction="row" gap={3} justify="center" wrap>
              <Button variant="primary" size="lg" pulse onClick={onPrimary}>
                Get started
              </Button>
              <Button variant="secondary" size="lg" onClick={onSecondary}>
                Browse components
              </Button>
            </Stack>
          }
        />

        <Stack direction="row" gap={2} justify="center" wrap style={{ marginTop: 8 }}>
          <Badge tone="neutral" dot>76 components</Badge>
          <Badge tone="neutral" dot>Light + dark</Badge>
          <Badge tone="neutral" dot>OKLCH tokens</Badge>
        </Stack>

        {/* LiquidBubble pyramid — ascending size, center accent */}
        <Stack direction="row" gap={16} justify="center" align="center" style={{ marginTop: 48 }}>
          <LiquidBubble size={10} variant="outline" color="var(--accent-mid)" />
          <LiquidBubble size={18} variant="outline" color="var(--accent-mid)" />
          <LiquidBubble size={36} color="var(--accent)" />
          <LiquidBubble size={18} variant="outline" color="var(--accent-mid)" />
          <LiquidBubble size={10} variant="outline" color="var(--accent-mid)" />
        </Stack>
      </Container>
    </Section>
  )
}
