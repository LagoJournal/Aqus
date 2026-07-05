import React from 'react'
import { Section, Container, Stack, Switch } from '@agustin/aqus'
import { AqusFoil } from '@agustin/aqus/foil-fx'

/**
 * Foil DLC · Surfaces — the Liquid Identity acceptance surface.
 * Structure mirrors the other showcase sections (eyebrow → title →
 * lede → labeled sub-blocks on sc-grid).
 * Toggle ON: surfaces gain rarity, actions go wet, one light drifts.
 * Toggle OFF: everything must stay visible and readable — off-state
 * is core Aqus, calm and matte. That's the acceptance test.
 */
const ART = {
  // real art the glaze must read through — a lively gradient stand-in
  background: 'linear-gradient(140deg, oklch(0.45 0.18 280), oklch(0.65 0.2 200) 50%, oklch(0.8 0.16 120))',
  borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden',
}

const subLabel = { marginBottom: 12, display: 'block' }

export function LiquidIdentity() {
  const [on, setOn] = React.useState(() => AqusFoil.enabled())
  const ref = React.useRef(null)
  React.useEffect(() => { AqusFoil.wire(ref.current) }, [on]) // re-wire after toggle re-render

  const flip = () => setOn(AqusFoil.toggle())

  return (
    <Section id="liquid" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Foil DLC · Surfaces</p>
        <h2 className="sc-section-title">Liquid Identity</h2>
        <p className="sc-section-lede">
          The loud half of Aqus — trading-card foil as an opt-in expansion. Metal under every
          rainbow, one light that drifts and leans, hue that never spins. Off means core Aqus:
          the pond at rest.
        </p>

        <Stack direction="row" gap={3} align="center" wrap style={{ marginBottom: 28 }}>
          <Switch checked={on} onChange={flip} aria-label="Toggle Liquid Identity" />
          <span className="sc-item-desc" style={{ maxWidth: 340 }}>
            {on
              ? 'The pond catching sun — [data-liquid] is stamped; every fx-* surface renders its finish.'
              : 'The pond at rest — gate off; the same markup falls back to calm, matte core Aqus.'}
          </span>
        </Stack>

        <div ref={ref}>
          <Stack gap={5}>

            {/* The ultra hero — one per view */}
            <div>
              <span className="sc-item-cat" style={subLabel}>The ultra hero — frame + glaze + cosmos + scrim · one per view</span>
              <div className="fx-frame fx-live" data-tilt>
                <div className="fx-finish ultra fx-shine sheen" style={{ ...ART, minHeight: 180 }}>
                  <div className="scrim" />
                  <i className="fx-cosmos-rays" />
                  <div style={{ position: 'relative', zIndex: 7, padding: 20, color: 'oklch(0.98 0 0)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 180 }}>
                    <strong style={{ fontSize: 'var(--text-h4)' }}>Ultra-rare hero</strong>
                    <span style={{ fontSize: 'var(--text-caption)', opacity: 0.8 }}>drift · lean (hover) · one sheen pass</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The glaze ladder */}
            <div>
              <span className="sc-item-cat" style={subLabel}>The glaze ladder — one dial over real art</span>
              <div className="sc-grid">
                {['whisper', 'soft', 'rich'].map(step => (
                  <div key={step} className={`fx-finish ${step} fx-live`} data-tilt style={{ ...ART, minHeight: 120 }}>
                    <div className="scrim" />
                    <div style={{ position: 'relative', zIndex: 7, padding: 14, color: 'oklch(0.98 0 0)' }}>
                      <strong>{step}</strong>
                      <span style={{ fontSize: 'var(--text-mini)', opacity: 0.75, marginLeft: 8 }}>
                        {step === 'whisper' ? '0.14 · lists, chips' : step === 'soft' ? '0.30 · default card' : '0.55 · features'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solid finishes */}
            <div>
              <span className="sc-item-cat" style={subLabel}>Solid finishes — foil is the object; keep them small</span>
              <div className="sc-grid sc-grid-4">
                {['fx-holo', 'fx-chrome', 'fx-pearl', 'fx-aurora', 'fx-prism', 'fx-dew', 'fx-tile'].map(f => (
                  <div key={f} className={`${f} fx-live`} style={{ borderRadius: 'var(--radius-md)', minHeight: 90, position: 'relative', border: '1px solid var(--border)' }}>
                    <span style={{ position: 'absolute', bottom: 8, left: 10, zIndex: 9, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)', fontWeight: 600, color: f === 'fx-pearl' || f === 'fx-dew' ? 'oklch(0.25 0.02 270)' : 'oklch(0.98 0 0)', textShadow: f === 'fx-pearl' || f === 'fx-dew' ? 'none' : '0 1px 3px oklch(0 0 0 / 0.4)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action + punk objects */}
            <div>
              <span className="sc-item-cat" style={subLabel}>Aero action (accent, never spectrum) · punk bridges — ≤2 per view</span>
              <Stack direction="row" wrap gap={3} align="center">
                <button className="fx-aero fx-shine glint agus-focusable" style={{ border: 'none', borderRadius: 'var(--radius-pill)', padding: '12px 24px', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-body-sm)', cursor: 'pointer' }}>
                  Play the season
                </button>
                <span className="foil-sticker holo">Rare drop</span>
                <span className="foil-bubble iris foil-breathe" style={{ width: 48, height: 48 }} />
              </Stack>
            </div>

          </Stack>
        </div>
      </Container>
    </Section>
  )
}
