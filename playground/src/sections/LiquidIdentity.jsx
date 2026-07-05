import React from 'react'
import { Section, Container, Stack, Badge, Switch } from '@agustin/aqus'
import { AqusFoil } from '@agustin/aqus/foil-fx'

/**
 * Liquid Identity — the Foil FX DLC acceptance surface.
 * Toggle ON: surfaces gain rarity, actions go wet, one light drifts.
 * Toggle OFF: every element below must remain visible and readable
 * (that's the acceptance test — off-state is core Aqus, calm and matte).
 */
const ART = {
  // real art the glaze must read through — a lively gradient stand-in
  background: 'linear-gradient(140deg, oklch(0.45 0.18 280), oklch(0.65 0.2 200) 50%, oklch(0.8 0.16 120))',
  borderRadius: 'var(--radius-lg)', minHeight: 180, position: 'relative', overflow: 'hidden',
}

export function LiquidIdentity() {
  const [on, setOn] = React.useState(() => AqusFoil.enabled())
  const ref = React.useRef(null)
  React.useEffect(() => { AqusFoil.wire(ref.current) }, [])

  const flip = () => setOn(AqusFoil.toggle())

  return (
    <Section id="liquid">
      <Container size="lg">
        <div ref={ref}>
          <Stack gap={4}>
            <Stack direction="row" wrap gap={3} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                Liquid Identity <Badge tone="accent" pill nowrap>DLC</Badge>
              </h2>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>
                  {on ? 'The pond catching sun' : 'The pond at rest'}
                </span>
                <Switch checked={on} onChange={flip} aria-label="Toggle Liquid Identity" />
              </label>
            </Stack>

            {/* One ultra hero per view */}
            <div className="fx-frame fx-live" data-tilt>
              <div className="fx-finish ultra fx-shine sheen" style={ART}>
                <div className="scrim" />
                <i className="fx-cosmos-rays" />
                <div style={{ position: 'relative', zIndex: 7, padding: 20, color: 'oklch(0.98 0 0)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 180 }}>
                  <strong style={{ fontSize: 'var(--text-h4)' }}>Ultra-rare hero</strong>
                  <span style={{ fontSize: 'var(--text-caption)', opacity: 0.8 }}>fx-frame · fx-finish ultra · cosmos rays · one per view</span>
                </div>
              </div>
            </div>

            {/* The ladder */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              {['whisper', 'soft', 'rich'].map(step => (
                <div key={step} className={`fx-finish ${step} fx-live`} data-tilt style={{ ...ART, minHeight: 120 }}>
                  <div className="scrim" />
                  <div style={{ position: 'relative', zIndex: 7, padding: 14, color: 'oklch(0.98 0 0)' }}>
                    <strong>{step}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Solid finishes — small surfaces */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: 12 }}>
              {['fx-holo', 'fx-chrome', 'fx-pearl', 'fx-aurora', 'fx-prism', 'fx-dew', 'fx-tile'].map(f => (
                <div key={f} className={`${f} fx-live`} style={{ borderRadius: 'var(--radius-md)', minHeight: 90, position: 'relative', border: '1px solid var(--border)' }}>
                  <span style={{ position: 'absolute', bottom: 8, left: 10, zIndex: 9, fontSize: 'var(--text-mini)', fontWeight: 700, color: f === 'fx-pearl' || f === 'fx-dew' ? 'var(--foil-ink)' : 'oklch(0.98 0 0)', textShadow: f === 'fx-pearl' || f === 'fx-dew' ? 'none' : '0 1px 3px oklch(0 0 0 / 0.4)' }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Aero action + punk objects (≤2 per view) */}
            <Stack direction="row" wrap gap={3} style={{ alignItems: 'center' }}>
              <button className="fx-aero fx-shine glint agus-focusable" style={{ border: 'none', borderRadius: 'var(--radius-pill)', padding: '12px 24px', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-body-sm)', cursor: 'pointer' }}>
                Play the season
              </button>
              <span className="foil-sticker holo">Rare drop</span>
              <span className="foil-bubble iris foil-breathe" style={{ width: 48, height: 48 }} />
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  )
}
