import React from 'react'
import { Section, Container, Card, Stack } from '@agustin/aqus'

const RULES = [
  {
    icon: 'ph-drop',
    title: 'One accent, set in CSS',
    body: 'Override the 9 --accent-* tokens in :root {}. L 0.55–0.72, C 0.12–0.24. Never a second brand color, never a literal hex.',
  },
  {
    icon: 'ph-stack',
    title: 'Glass is structural only',
    body: 'Nav, modals, drawers, popovers, hero chrome. Interior content sits flat on the surface — depth is earned, never decorative.',
  },
  {
    icon: 'ph-circle-half',
    title: 'Round = liquid',
    body: 'Use LiquidBubble (or the liquid-blob radius) instead of border-radius: 50% so every new round element inherits the identity.',
  },
  {
    icon: 'ph-palette',
    title: 'Reference tokens, never literals',
    body: 'Colors, spacing, type, radii, shadows and motion all come from CSS custom properties. The only raw values are gloss/shadow alphas.',
  },
  {
    icon: 'ph-arrows-in',
    title: 'Respect elevation',
    body: 'Match the shadow tier to the real stacking level. shadow-xs resting, shadow-sm raised, shadow-glass for chrome. Light comes from above.',
  },
  {
    icon: 'ph-puzzle-piece',
    title: 'Compose, don’t re-implement',
    body: 'Build screens from the primitives — Button, Card, Input — rather than re-styling raw elements. The example views show the intended composition.',
  },
  {
    icon: 'ph-wind',
    title: 'Motion conveys physics',
    body: 'Spring entrances, hover lift, glassy fades. Data views get micro-interactions only — no ambient animation on dense surfaces.',
  },
  {
    icon: 'ph-text-aa',
    title: 'Copy is sentence case, terse, honest',
    body: 'Sentence case for all UI and headings. No exclamation pile-ons, no hype, and never an emoji in chrome or product UI.',
  },
]

export function DesignRules() {
  return (
    <Section id="rules" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Foundations</p>
        <h2 className="sc-section-title">Eight rules that keep it coherent</h2>
        <p className="sc-section-lede">
          Aqus is opinionated on purpose. Follow these and anything you build stays on-brand —
          they’re the same rules the component library and the agent guide enforce.
        </p>

        <div className="sc-grid">
          {RULES.map((r, i) => (
            <Card key={r.title} variant="resting" style={{ padding: 24 }}>
              <Stack gap={3}>
                <Stack direction="row" gap={3} align="center" justify="space-between">
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 44, height: 44, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
                    background: 'var(--accent-light)', color: 'var(--accent-text)', fontSize: 22,
                  }}>
                    <i className={`ph ${r.icon}`} />
                  </span>
                  <span className="sc-rule-num">{String(i + 1).padStart(2, '0')}</span>
                </Stack>
                <h3 style={{ margin: 0, fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-bold)', color: 'var(--text)' }}>
                  {r.title}
                </h3>
                <p className="sc-item-desc">{r.body}</p>
              </Stack>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
