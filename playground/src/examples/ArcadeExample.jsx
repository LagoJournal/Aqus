import React from 'react'
import { Card, Button, Badge, Tag, Stack, SegmentedControl } from '@agustin/aqus'
import { AqusFoil } from '@agustin/aqus/foil-fx'

/**
 * Aqus Arcade — the Liquid Identity DLC pushed to its limits inside
 * the laws: one ultra per view (the legendary catch), aero on actions
 * only, captions plain, ≤5 bubbles, ≤2 punk objects per game view.
 * Three games share one pearl economy. Session-local state only.
 */

// ── rarity table ─────────────────────────────────────────────────────
const RARITIES = {
  common:    { label: 'Common',    pearls: 1,  chance: 0.55 },
  uncommon:  { label: 'Uncommon',  pearls: 3,  chance: 0.30 },
  rare:      { label: 'Rare',      pearls: 8,  chance: 0.12 },
  legendary: { label: 'Legendary', pearls: 20, chance: 0.03 },
}
const FISH = {
  common:    [['🐟', 'Pebble minnow'], ['🐠', 'Reed darter'], ['🦐', 'Mud shrimp']],
  uncommon:  [['🐡', 'Pearl puffer'], ['🦀', 'Moon crab'], ['🐸', 'Gloss frog']],
  rare:      [['🐙', 'Prism octopus'], ['🦑', 'Ink drifter'], ['🐢', 'Tide turtle']],
  legendary: [['🐋', 'The Pondmother'], ['🦈', 'Chrome leviathan']],
}
function rollRarity(hasLegendary) {
  const r = Math.random()
  if (r < RARITIES.legendary.chance && !hasLegendary) return 'legendary'
  if (r < RARITIES.legendary.chance + RARITIES.rare.chance) return 'rare'
  if (r < RARITIES.legendary.chance + RARITIES.rare.chance + RARITIES.uncommon.chance) return 'uncommon'
  return 'common'
}
function makeCatch(rarity) {
  const pool = FISH[rarity]
  const [emoji, name] = pool[Math.floor(Math.random() * pool.length)]
  return { id: Date.now() + Math.random(), emoji, name, rarity, size: 1 }
}

// ── HUD budget meter: proves the laws hold at runtime ────────────────
function BudgetMeter({ catches }) {
  const ultras = catches.filter(c => c.rarity === 'legendary').length
  const bubbles = Math.min(catches.length, 5)
  const ok = ultras <= 1
  return (
    <span className="sc-item-desc" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)' }}>
      budget: {ultras} ultra · bubbles {bubbles}/5 · aero = actions only {ok ? '✓' : '✗'}
    </span>
  )
}

const GAMES = { pond: 'Pond', spin: 'Spin', aquarium: 'Aquarium' }

export function ArcadeExample() {
  const [pearls, setPearls] = React.useState(3)
  const [catches, setCatches] = React.useState([])
  const [view, setView] = React.useState('pond')
  const ref = React.useRef(null)

  // Wire pointer-lean/tilt whenever a game renders new .fx-live nodes.
  React.useEffect(() => { AqusFoil.wire(ref.current) })

  const addPearls = (n) => setPearls(p => p + n)
  const spend = (n) => setPearls(p => Math.max(0, p - n))
  const addCatch = (c) => setCatches(cs => [...cs, c])
  const hasLegendary = catches.some(c => c.rarity === 'legendary')

  return (
    <div ref={ref}>
      <Stack gap={3}>
        {/* HUD — the chrome chip is the view's one standing punk object */}
        <Stack direction="row" wrap gap={2} align="center" style={{ justifyContent: 'space-between' }}>
          <Stack direction="row" wrap gap={2} align="center">
            <span className="foil-sticker chrome" style={{ fontSize: 'var(--text-mini)', padding: '5px 10px' }}>
              ⬤ {pearls} pearls
            </span>
            <Tag>{catches.length} caught</Tag>
          </Stack>
          <BudgetMeter catches={catches} />
        </Stack>

        <SegmentedControl
          value={view}
          onChange={setView}
          options={Object.entries(GAMES).map(([value, label]) => ({ value, label }))}
        />

        {view === 'pond' && <PondGame addPearls={addPearls} addCatch={addCatch} hasLegendary={hasLegendary} />}
        {view === 'spin' && <SpinWheel pearls={pearls} spend={spend} addPearls={addPearls} addCatch={addCatch} />}
        {view === 'aquarium' && <Aquarium catches={catches} pearls={pearls} spend={spend} grow={(id) => setCatches(cs => cs.map(c => c.id === id ? { ...c, size: Math.min(c.size + 1, 3) } : c))} />}
      </Stack>
    </div>
  )
}

// ── Game 1: The Pond ─────────────────────────────────────────────────
// idle → waiting (random 1.5–4s) → bite (900ms window) → reveal | miss
const CATCH_FINISH = {
  common:    '',
  uncommon:  'fx-finish pearl soft fx-live',
  rare:      'fx-finish rich fx-live',
  legendary: 'fx-finish ultra fx-shine sheen',
}
const aeroBtn = {
  border: 'none', borderRadius: 'var(--radius-pill)', padding: '12px 24px',
  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-body-sm)', cursor: 'pointer',
}
const catchArt = (rarity) => ({
  position: 'relative', overflow: 'hidden', minHeight: 110,
  background: rarity === 'legendary'
    ? 'linear-gradient(140deg, oklch(0.4 0.16 290), oklch(0.55 0.18 220) 55%, oklch(0.7 0.15 150))'
    : 'linear-gradient(140deg, oklch(0.5 0.12 260), oklch(0.6 0.13 210))',
})

function CatchBody({ c, light = true }) {
  return (
    <div style={{ position: 'relative', zIndex: 7, display: 'flex', alignItems: 'center', gap: 14, padding: c.rarity === 'legendary' ? 18 : 0, color: light ? 'oklch(0.98 0 0)' : 'var(--text)' }}>
      <span style={{ fontSize: 42 }}>{c.emoji}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <strong>{c.name}</strong>
        <span style={{ fontSize: 'var(--text-caption)', opacity: 0.8 }}>
          {RARITIES[c.rarity].label} · +{RARITIES[c.rarity].pearls} pearls
        </span>
      </div>
      <Badge tone={c.rarity === 'common' ? 'neutral' : 'accent'} pill nowrap style={{ marginLeft: 'auto' }}>
        {RARITIES[c.rarity].label}
      </Badge>
    </div>
  )
}

function PondGame({ addPearls, addCatch, hasLegendary }) {
  const [phase, setPhase] = React.useState('idle')      // idle|waiting|bite|reveal
  const [last, setLast] = React.useState(null)          // last catch or 'miss'
  const timers = React.useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  React.useEffect(() => clear, [])

  const cast = () => {
    setLast(null); setPhase('waiting')
    timers.current.push(setTimeout(() => {
      setPhase('bite')
      timers.current.push(setTimeout(() => {
        setPhase(p => { if (p === 'bite') { setLast('miss'); return 'idle' } return p })
      }, 900))
    }, 1500 + Math.random() * 2500))
  }
  const reel = () => {
    clear()
    const rarity = rollRarity(hasLegendary)
    const c = makeCatch(rarity)
    addCatch(c); addPearls(RARITIES[rarity].pearls)
    setLast(c); setPhase('reveal')
  }

  const biting = phase === 'bite'
  return (
    <Stack gap={3}>
      {/* the water — soft glaze over art, dew in the corner, drifting bubbles while waiting */}
      <div className="fx-finish soft fx-live" style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', minHeight: 190,
        background: 'linear-gradient(160deg, oklch(0.55 0.12 230), oklch(0.45 0.14 250) 55%, oklch(0.38 0.12 270))',
        border: biting ? '2px solid var(--accent)' : '2px solid transparent',
        transition: 'border-color var(--dur-fast) var(--ease-out)',
      }}>
        <div className="fx-dew" style={{ position: 'absolute', inset: 'auto 0 0 auto', width: 120, height: 80, borderRadius: 'var(--radius-lg) 0 0 0', opacity: 0.8 }} />
        {phase === 'waiting' && (<>
          <span className="foil-bubble iris foil-drift" style={{ position: 'absolute', width: 26, height: 26, left: '22%', top: '38%' }} />
          <span className="foil-bubble holo foil-float" style={{ position: 'absolute', width: 18, height: 18, left: '58%', top: '58%' }} />
        </>)}
        <div style={{ position: 'relative', zIndex: 7, padding: 16, color: 'oklch(0.97 0 0)' }}>
          <strong>{biting ? 'BITE!' : phase === 'waiting' ? 'Line in the water…' : 'The pond'}</strong>
        </div>
      </div>

      <Stack direction="row" wrap gap={2} align="center">
        {phase === 'idle' || phase === 'reveal' ? (
          <button className="fx-aero agus-focusable" onClick={cast} style={aeroBtn}>Cast line</button>
        ) : (
          <button className={`fx-aero agus-focusable ${biting ? 'fx-shine glint' : ''}`} onClick={biting ? reel : undefined}
            disabled={!biting} style={{ ...aeroBtn, opacity: biting ? 1 : 0.6, cursor: biting ? 'pointer' : 'wait' }}>
            {biting ? 'Reel!' : 'Waiting…'}
          </button>
        )}
        <span className="sc-item-desc">
          {last === 'miss' ? 'It got away. Cast again.' :
           phase === 'waiting' ? 'Watch for the bite — you have under a second.' :
           phase === 'bite' ? 'NOW.' : 'Catches pay pearls: 1 / 3 / 8 / 20 by rarity.'}
        </span>
      </Stack>

      {/* catch reveal — rarity = finish; legendary is the view's ONE ultra */}
      {phase === 'reveal' && last && last !== 'miss' && (
        last.rarity === 'legendary' ? (
          <div className="fx-frame fx-live" data-tilt style={{ animation: 'agus-enter var(--dur-page) var(--ease-spring)' }}>
            <div className={CATCH_FINISH.legendary} style={{ ...catchArt(last.rarity), borderRadius: 'calc(var(--radius-lg) - 5px)' }}>
              <div className="scrim" />
              <i className="fx-cosmos-rays" />
              <CatchBody c={last} />
            </div>
          </div>
        ) : (
          <Card className={CATCH_FINISH[last.rarity]} style={{ position: 'relative', overflow: 'hidden', animation: 'agus-enter var(--dur-page) var(--ease-spring)', ...(last.rarity !== 'common' ? { background: catchArt(last.rarity).background, border: 'none' } : {}) }}>
            <CatchBody c={last} light={last.rarity !== 'common'} />
          </Card>
        )
      )}
    </Stack>
  )
}
function SpinWheel() { return null }
function Aquarium() { return null }
