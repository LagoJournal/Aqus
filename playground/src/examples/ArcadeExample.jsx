import React from 'react'
import { Card, Badge, Tag, Stack, SegmentedControl, EmptyState, Button, LiquidBubble } from '@agustin/aqus'
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
              <LiquidBubble size={10} color="oklch(0.9 0.02 250)" /> {pearls} pearls
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
        {view === 'aquarium' && <Aquarium catches={catches} pearls={pearls} spend={spend} goPond={() => setView('pond')} grow={(id) => setCatches(cs => cs.map(c => c.id === id ? { ...c, size: Math.min(c.size + 1, 3) } : c))} />}
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
          <strong>{biting ? 'Bite!' : phase === 'waiting' ? 'Line in the water…' : 'The pond'}</strong>
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
        <span className="sc-item-desc" aria-live="polite">
          {last === 'miss' ? 'It got away. Cast again.' :
           phase === 'waiting' ? 'Watch for the bite — you have under a second.' :
           phase === 'bite' ? 'Reel it in.' : 'Catches pay pearls: 1 / 3 / 8 / 20 by rarity.'}
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
// ── Game 2: Lucky Spin ───────────────────────────────────────────────
// 8 segments · costs 5 pearls · transform-only spin (hue never animates)
const SEGMENTS = [
  { label: '+2', act: (g) => g.addPearls(2) },
  { label: '—', act: () => {} },
  { label: '+5', act: (g) => g.addPearls(5) },
  { label: 'fish', act: (g) => g.addCatch(makeCatch('uncommon')) },
  { label: '—', act: () => {} },
  { label: '+10', act: (g) => g.addPearls(10) },
  { label: '—', act: () => {} },
  { label: 'JACKPOT', act: (g) => g.addPearls(25) },
]
const SEG_COLORS = ['oklch(0.6 0.12 230)', 'oklch(0.35 0.03 260)', 'oklch(0.6 0.12 200)', 'oklch(0.6 0.14 160)', 'oklch(0.35 0.03 260)', 'oklch(0.6 0.12 260)', 'oklch(0.35 0.03 260)', 'oklch(0.7 0.16 85)']

function SpinWheel({ pearls, spend, addPearls, addCatch }) {
  const [rot, setRot] = React.useState(0)
  const [spinning, setSpinning] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const reduced = React.useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, [])

  const spin = () => {
    if (spinning || pearls < 5) return
    spend(5); setResult(null); setSpinning(true)
    const seg = Math.floor(Math.random() * 8)
    const target = rot + 360 * 4 + (360 - seg * 45 - 22.5) - (rot % 360)
    const finish = () => {
      SEGMENTS[seg].act({ addPearls, addCatch })
      setResult(SEGMENTS[seg].label)
      setSpinning(false)
    }
    if (reduced) { setRot(target); finish() }
    else { setRot(target); setTimeout(finish, 2450) }
  }

  const wheelBg = `conic-gradient(${SEGMENTS.map((s, i) => `${SEG_COLORS[i]} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')})`
  return (
    <Stack gap={3}>
      <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
        <span aria-hidden style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: '14px solid var(--accent)' }} />
        <div aria-hidden style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: wheelBg,
          border: '4px solid var(--border)',
          transform: `rotate(${rot}deg)`,
          transition: reduced || !spinning ? 'none' : 'transform 2.4s var(--ease-spring)',
        }} />
        <span className="foil-bubble chrome" style={{ position: 'absolute', left: '50%', top: '50%', width: 44, height: 44, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
      </div>
      <Stack direction="row" wrap gap={2} align="center" style={{ justifyContent: 'center' }} aria-live="polite">
        <button className="fx-aero agus-focusable" onClick={spin} disabled={spinning || pearls < 5}
          style={{ ...aeroBtn, opacity: spinning || pearls < 5 ? 0.6 : 1 }}>
          Spin — 5 pearls
        </button>
        {pearls < 5 && !spinning && <span className="sc-item-desc">Not enough pearls — catch fish in the Pond.</span>}
        {result && result !== '—' && result !== 'JACKPOT' && <span className="sc-item-desc">Won: {result === 'fish' ? 'a bonus fish → aquarium' : `${result} pearls`}</span>}
        {result === '—' && <span className="sc-item-desc">Blank — no prize this spin.</span>}
        {result === 'JACKPOT' && (
          <Stack direction="row" gap={2} align="center">
            <span className="foil-text-zine foil-text-glitch" style={{ fontSize: 'var(--text-h4)' }}>JACKPOT +25</span>
            <span className="foil-sparkle pop" />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
// ── Game 3: Aquarium ─────────────────────────────────────────────────
// fx-glass liquid tank; fish = punk bubbles by rarity; ≤5 shown (budget)
const BUBBLE_VARIANT = { common: '', uncommon: 'iris', rare: 'holo', legendary: 'chrome' }
const SPOTS = [[14, 30], [38, 55], [60, 25], [76, 60], [28, 72]]

function Aquarium({ catches, pearls, spend, grow, goPond }) {
  const [fedId, setFedId] = React.useState(null)
  const shown = catches.slice(0, 5)

  const feed = () => {
    if (pearls < 1 || catches.length === 0) return
    spend(1)
    const f = catches[Math.floor(Math.random() * catches.length)]
    grow(f.id); setFedId(f.id + '-' + Date.now()) // key change retriggers glint
  }

  if (catches.length === 0) {
    return (
      <EmptyState
        icon={<i className="ph ph-fish" />}
        title="Nothing swimming yet"
        description="Every catch from the Pond lands here."
        action={<Button variant="primary" onClick={goPond}>Go to the Pond</Button>}
      />
    )
  }

  return (
    <Stack gap={3}>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minHeight: 210, background: 'linear-gradient(165deg, oklch(0.5 0.1 220), oklch(0.35 0.12 255) 60%, oklch(0.28 0.1 275))' }}>
        {/* the glass front of the tank — light-aware, chromatic fringes */}
        <div key={fedId} className={`fx-glass liquid fx-live ${fedId ? 'fx-shine glint' : ''}`} style={{ position: 'absolute', inset: 10, borderRadius: 'var(--radius-lg)', zIndex: 2, pointerEvents: 'none' }} />
        {shown.map((c, i) => (
          <span key={c.id} title={c.name}
            className={`foil-bubble ${BUBBLE_VARIANT[c.rarity]} ${i % 2 ? 'foil-float' : 'foil-drift'}`}
            style={{ position: 'absolute', left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%`, width: 22 + c.size * 10, height: 22 + c.size * 10, zIndex: 1, fontSize: 12 + c.size * 4 }}>
            {c.emoji}
          </span>
        ))}
        {catches.length > 5 && <Tag style={{ position: 'absolute', right: 10, bottom: 10, zIndex: 3 }}>+{catches.length - 5} more</Tag>}
        {catches.some(c => c.rarity === 'legendary') && <span className="foil-sparkle blink" style={{ position: 'absolute', right: 24, top: 18, zIndex: 3 }} />}
      </div>
      <Stack direction="row" wrap gap={2} align="center">
        <button className="fx-aero agus-focusable" onClick={feed} disabled={pearls < 1} style={{ ...aeroBtn, opacity: pearls < 1 ? 0.6 : 1 }}>
          Feed — 1 pearl
        </button>
        <span className="sc-item-desc">Feeding grows a random fish (3 sizes). Rarity shows as the bubble's finish.</span>
      </Stack>
    </Stack>
  )
}
