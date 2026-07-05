import React from 'react'
import { Section, Container, Stack, Card, Badge, Button } from '@agustin/aqus'
import { AqusFoil } from '@agustin/aqus/foil-fx'

/**
 * Foil DLC · Compositions — foil applied to REAL Aqus surfaces,
 * not just the holographic swatch. Each tile is a working component
 * wearing one finish role (glaze / frame / chrome chip / glass),
 * proving the semantic conventions: rarity = edition, finish = state.
 * Budget respected: no ultra here (the hero above owns it), ≤3 rich.
 */
const COVER = {
  background: 'linear-gradient(140deg, oklch(0.5 0.16 300), oklch(0.62 0.18 220) 55%, oklch(0.75 0.14 160))',
  borderRadius: 'var(--radius-md)', minHeight: 96, position: 'relative', overflow: 'hidden',
}

export function FoilCompositions() {
  const ref = React.useRef(null)
  React.useEffect(() => { AqusFoil.wire(ref.current) }, [])

  return (
    <Section id="foil-comp" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Foil DLC · Compositions</p>
        <h2 className="sc-section-title">Foil on real surfaces</h2>
        <p className="sc-section-lede">
          The finishes are roles, not wallpaper: a pearl glaze marks a calm candidate, chrome marks
          shipped, a frame marks a rare without glazing twice, glass stays glass — it just learns
          where the light is. Reading surfaces stay plain.
        </p>

        <div ref={ref}>
          <div className="sc-grid">

            {/* 1 — Pearl glaze on a Card: "calm candidate" state */}
            <Card className="fx-finish pearl soft fx-live" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 7 }}>
                <Stack gap={2}>
                  <Stack direction="row" gap={2} align="center" style={{ justifyContent: 'space-between' }}>
                    <strong>Release 1.4</strong>
                    <Badge tone="neutral" pill nowrap>candidate</Badge>
                  </Stack>
                  <span className="sc-item-desc">Pearl soft glaze = calm candidate. The card body still reads — glaze, don't paint.</span>
                </Stack>
              </div>
            </Card>

            {/* 2 — Chrome glaze on a Card over a fixed steel base: "shipped" */}
            <Card className="fx-finish chrome soft fx-live" style={{ position: 'relative', overflow: 'hidden', background: 'oklch(0.42 0.01 250)', color: 'oklch(0.96 0 0)', border: 'none' }}>
              <div style={{ position: 'relative', zIndex: 7 }}>
                <Stack gap={2}>
                  <Stack direction="row" gap={2} align="center" style={{ justifyContent: 'space-between' }}>
                    <strong>Release 1.3</strong>
                    <span className="foil-label" style={{ color: 'oklch(0.96 0 0)', borderColor: 'oklch(0.96 0 0 / 0.7)' }}>shipped</span>
                  </Stack>
                  <span style={{ fontSize: 'var(--text-body-sm)', color: 'oklch(0.85 0 0)' }}>Chrome = stable. Fixed steel base under the luminosity glaze, never a theme var.</span>
                </Stack>
              </div>
            </Card>

            {/* 3 — Aurora rich on a media cover: "hot right now" */}
            <Card style={{ overflow: 'hidden' }}>
              <Stack gap={3}>
                <div className="fx-finish aurora rich fx-live" data-tilt style={COVER}>
                  <div className="scrim" />
                  <span style={{ position: 'absolute', bottom: 8, left: 12, zIndex: 7, color: 'oklch(0.98 0 0)', fontWeight: 700 }}>Season finale</span>
                </div>
                <span className="sc-item-desc">Aurora rich on the cover only — the caption below stays calm on the read.</span>
              </Stack>
            </Card>

            {/* 4 — Thin frame marks a rare Card without glazing it */}
            <div className="fx-frame thin fx-live">
              <Card style={{ borderRadius: 'calc(var(--radius-lg) - 2.5px)' }}>
                <Stack gap={2}>
                  <Stack direction="row" gap={2} align="center" style={{ justifyContent: 'space-between' }}>
                    <strong>Founder edition</strong>
                    <Badge pill nowrap>1 of 50</Badge>
                  </Stack>
                  <span className="sc-item-desc">fx-frame thin = the rare marker. Content untouched — no foil-over-foil.</span>
                </Stack>
              </Card>
            </div>

            {/* 5 — Light-aware glass over lively art */}
            <div style={{ ...COVER, minHeight: 150, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <div className="fx-glass liquid fx-live" style={{ borderRadius: 'var(--radius-lg)', padding: '18px 22px', maxWidth: '90%' }}>
                <Stack gap={1}>
                  <strong>fx-glass liquid</strong>
                  <span className="sc-item-desc">Frost + chromatic fringes; the bloom follows the light point.</span>
                </Stack>
              </div>
            </div>

            {/* 6 — Actions stay accent; one chrome chip as punk object */}
            <Card>
              <Stack gap={3}>
                <Stack direction="row" wrap gap={2} align="center">
                  <button className="fx-aero fx-shine glint agus-focusable" style={{ border: 'none', borderRadius: 'var(--radius-pill)', padding: '10px 20px', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-body-sm)', cursor: 'pointer' }}>
                    Claim reward
                  </button>
                  <Button variant="ghost">Later</Button>
                  <span className="foil-sticker chrome" style={{ fontSize: 'var(--text-mini)', padding: '5px 10px' }}>S2</span>
                </Stack>
                <span className="sc-item-desc">Accent owns the action (fx-aero); spectrum never touches buttons. One primary per surface.</span>
              </Stack>
            </Card>

          </div>
        </div>
      </Container>
    </Section>
  )
}
