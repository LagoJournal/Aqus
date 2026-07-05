import React from 'react'
import { Card, Badge, Tag, Stack, SegmentedControl, EmptyState, Button, LiquidBubble } from '@agustin/aqus'
import { AqusFoil } from '@agustin/aqus/foil-fx'

/**
 * Aqus Arcade — the Liquid Identity DLC pushed to its limits inside
 * the laws: one ultra per view (the legendary catch), aero on actions
 * only, captions plain, ≤5 bubbles, ≤2 punk objects per game view.
 * Three games share one pearl economy. Session-local state only.
 * Emoji appear only as game CONTENT (fish, reel symbols) — never chrome.
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

const GAMES = { pond: 'Pond', slots: 'Slots', aquarium: 'Aquarium' }

export function ArcadeExample() {
  const [pearls, setPearls] = React.useState(6)
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
        {/* HUD — theme-adaptive chips; the meter is the teaching element */}
        <Stack direction="row" wrap gap={2} align="center" style={{ justifyContent: 'space-between' }}>
          <Stack direction="row" wrap gap={2} align="center">
            <Badge tone="accent" pill nowrap>
              <LiquidBubble size={9} /> {pearls} pearls
            </Badge>
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
        {view === 'slots' && <SlotMachine pearls={pearls} spend={spend} addPearls={addPearls} addCatch={addCatch} />}
        {view === 'aquarium' && <Aquarium catches={catches} pearls={pearls} spend={spend} goPond={() => setView('pond')} grow={(id) => setCatches(cs => cs.map(c => c.id === id ? { ...c, size: Math.min(c.size + 1, 3) } : c))} />}
      </Stack>
    </div>
  )
}

// ── shared bits ──────────────────────────────────────────────────────
const aeroBtn = {
  border: 'none', borderRadius: 'var(--radius-pill)', padding: '12px 24px',
  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 'var(--text-body-sm)', cursor: 'pointer',
}
// Living water: deep gradient + two caustic highlights + drifting glow.
const WATER = {
  position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)',
  minHeight: 200, maxHeight: 240,
  background:
    'radial-gradient(60% 80% at 18% 12%, oklch(0.72 0.1 210 / 0.5), transparent 55%),' +
    'radial-gradient(50% 65% at 78% 30%, oklch(0.68 0.12 200 / 0.35), transparent 60%),' +
    'radial-gradient(90% 60% at 50% 110%, oklch(0.3 0.12 270 / 0.8), transparent 70%),' +
    'linear-gradient(160deg, oklch(0.6 0.11 220), oklch(0.47 0.13 245) 55%, oklch(0.36 0.12 265))',
}

// ── Game 1: The Pond ─────────────────────────────────────────────────
// idle → waiting (random 1.5–4s) → bite (900ms window) → reveal | miss
const CATCH_FINISH = {
  common:    '',
  uncommon:  'fx-finish pearl soft fx-live',
  rare:      'fx-finish rich fx-live',
  legendary: 'fx-finish ultra fx-shine sheen',
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
      {/* the water — alive at every phase: ambient liquid blobs + soft glaze */}
      <div className="fx-finish soft fx-live" style={{
        ...WATER,
        outline: biting ? '2px solid var(--accent)' : '2px solid transparent',
        outlineOffset: -2,
        transition: 'outline-color var(--dur-fast) var(--ease-out)',
      }}>
        {/* ambient pond life — always on, decoration only */}
        <span aria-hidden style={{
          position: 'absolute', width: '34%', aspectRatio: '1', left: '8%', top: '30%',
          background: 'oklch(0.75 0.1 200 / 0.16)', filter: 'blur(6px)',
          borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
          animation: 'agus-liquid calc(var(--dur-liquid) * 1.2) var(--ease-inout) infinite',
        }} />
        <span aria-hidden style={{
          position: 'absolute', width: '20%', aspectRatio: '1', right: '14%', bottom: '-22%',
          background: 'oklch(0.85 0.06 210 / 0.14)', filter: 'blur(4px)',
          borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
          animation: 'agus-liquid calc(var(--dur-liquid) * 0.8) var(--ease-inout) infinite', animationDelay: '-3s',
        }} />
        {/* ripples where the line rests */}
        {phase !== 'idle' && phase !== 'reveal' && (
          <span aria-hidden style={{ position: 'absolute', left: '52%', top: '46%' }}>
            <LiquidBubble size={10} color="oklch(0.95 0.02 210 / 0.9)" />
          </span>
        )}
        {phase === 'waiting' && (<>
          <span className="foil-bubble iris foil-drift" style={{ position: 'absolute', width: 30, height: 30, left: '26%', top: '42%' }} />
          <span className="foil-bubble holo foil-float" style={{ position: 'absolute', width: 20, height: 20, left: '64%', top: '60%' }} />
        </>)}
        <div style={{ position: 'relative', zIndex: 7, padding: '14px 18px', color: 'oklch(0.97 0 0)', textShadow: '0 1px 4px oklch(0 0 0 / 0.35)' }}>
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

// ── Game 2: Slots — 3-reel machine ───────────────────────────────────
// Reels are vertical symbol strips moved with transform only (springy
// staggered stops); hue never animates. Costs 5 pearls.
// Payouts: 🐚🐚🐚 jackpot +25 · 🐟🐟🐟 bonus fish · 💧/⭐ triple +10 ·
// any pair +2 · else blank.
const SYMBOLS = ['🐚', '🐟', '💧', '⭐']
const CELL = 64
const REPEATS = 8 // strip length per reel = SYMBOLS.length * REPEATS

function resolvePayout(r, g) {
  const [a, b, c] = r
  if (a === b && b === c) {
    if (SYMBOLS[a] === '🐚') { g.addPearls(25); return 'jackpot' }
    if (SYMBOLS[a] === '🐟') { g.addCatch(makeCatch('uncommon')); return 'fish' }
    g.addPearls(10); return 'triple'
  }
  if (a === b || b === c || a === c) { g.addPearls(2); return 'pair' }
  return 'blank'
}

function Reel({ target, spinning, delay }) {
  // strip offset: rest at row `target` in the LAST repeat block so the
  // spin always travels forward through several full loops.
  const restRow = (REPEATS - 2) * SYMBOLS.length + target
  const y = spinning ? -(restRow * CELL) : -((SYMBOLS.length + target) * CELL)
  return (
    <div style={{
      width: CELL, height: CELL, overflow: 'hidden', flex: 'none',
      borderRadius: 'var(--radius-sm, 8px)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      boxShadow: 'inset 0 8px 12px -8px oklch(0 0 0 / 0.45), inset 0 -8px 12px -8px oklch(0 0 0 / 0.45)',
    }}>
      <div aria-hidden style={{
        display: 'flex', flexDirection: 'column',
        transform: `translateY(${y}px)`,
        transition: spinning ? `transform ${1.1 + delay}s cubic-bezier(0.18, 0.9, 0.32, 1.04)` : 'none',
      }}>
        {Array.from({ length: SYMBOLS.length * REPEATS }, (_, i) => (
          <span key={i} style={{ height: CELL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
            {SYMBOLS[i % SYMBOLS.length]}
          </span>
        ))}
      </div>
    </div>
  )
}

function SlotMachine({ pearls, spend, addPearls, addCatch }) {
  const [targets, setTargets] = React.useState([0, 1, 2])
  const [spinning, setSpinning] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const reduced = React.useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, [])

  const spin = () => {
    if (spinning || pearls < 5) return
    spend(5); setResult(null)
    const next = [0, 1, 2].map(() => Math.floor(Math.random() * SYMBOLS.length))
    const finish = () => setResult(resolvePayout(next, { addPearls, addCatch }))
    setTargets(next)
    if (reduced) { finish() }
    else {
      setSpinning(true)
      setTimeout(() => { setSpinning(false); finish() }, 2350) // last reel stops at 1.1+1.2s
    }
  }

  return (
    <Stack gap={3} align="center">
      {/* the cabinet — chrome glaze when the DLC is on, plain Card off */}
      <Card className="fx-finish chrome whisper fx-live" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-5)', maxWidth: 420, width: '100%' }}>
        <Stack gap={3} align="center">
          <span className="sc-item-cat" style={{ letterSpacing: 'var(--tracking-wide)' }}>Pearl slots</span>
          <Stack direction="row" gap={2} style={{ justifyContent: 'center', position: 'relative', zIndex: 7 }}>
            {[0, 1, 2].map(i => (
              <Reel key={i} target={targets[i]} spinning={spinning} delay={i * 0.6} />
            ))}
          </Stack>
          {/* payline */}
          <span aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, 6px)', width: CELL * 3 + 32, height: 2, background: 'var(--accent-glow)', pointerEvents: 'none' }} />
          <span className="sc-item-desc" style={{ fontSize: 'var(--text-mini)' }}>
            3×🐚 +25 · 3×🐟 bonus fish · triple +10 · pair +2
          </span>
        </Stack>
      </Card>

      <Stack direction="row" wrap gap={2} align="center" style={{ justifyContent: 'center' }} aria-live="polite">
        <button className="fx-aero agus-focusable" onClick={spin} disabled={spinning || pearls < 5}
          style={{ ...aeroBtn, opacity: spinning || pearls < 5 ? 0.6 : 1 }}>
          Spin — 5 pearls
        </button>
        {pearls < 5 && !spinning && <span className="sc-item-desc">Not enough pearls — catch fish in the Pond.</span>}
        {result === 'pair' && <span className="sc-item-desc">Pair — +2 pearls.</span>}
        {result === 'triple' && <span className="sc-item-desc">Triple — +10 pearls.</span>}
        {result === 'fish' && <span className="sc-item-desc">Three fish — a bonus catch swims to your aquarium.</span>}
        {result === 'blank' && <span className="sc-item-desc">No match this spin.</span>}
        {result === 'jackpot' && (
          <Stack direction="row" gap={2} align="center">
            <span className="foil-text-zine foil-text-glitch" style={{ fontSize: 'var(--text-h4)' }}>Jackpot +25</span>
            <span className="foil-sparkle pop" />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

// ── Game 3: Aquarium ─────────────────────────────────────────────────
// Water tank; fish = punk bubbles by rarity ABOVE the water (never
// behind frost); one thin glass reflection strip as decoration.
const BUBBLE_VARIANT = { common: '', uncommon: 'iris', rare: 'holo', legendary: 'chrome' }
const SPOTS = [[12, 28], [36, 56], [58, 22], [76, 58], [26, 70]]

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
      <div className="fx-finish soft fx-live" style={{ ...WATER, minHeight: 220 }}>
        {/* light shafts through the water */}
        <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 18%, oklch(0.95 0.02 210 / 0.14) 24%, transparent 32%, transparent 55%, oklch(0.95 0.02 210 / 0.1) 62%, transparent 70%)', pointerEvents: 'none' }} />
        {/* floor */}
        <span aria-hidden style={{ position: 'absolute', insetInline: 0, bottom: 0, height: 34, background: 'linear-gradient(to top, oklch(0.35 0.05 80 / 0.55), transparent)', pointerEvents: 'none' }} />
        {/* fish swim ABOVE everything decorative */}
        {shown.map((c, i) => (
          <span key={c.id} title={c.name}
            className={`foil-bubble ${BUBBLE_VARIANT[c.rarity]} ${i % 2 ? 'foil-float' : 'foil-drift'}`}
            style={{ position: 'absolute', left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%`, width: 30 + c.size * 12, height: 30 + c.size * 12, zIndex: 8, fontSize: 15 + c.size * 5 }}>
            {c.emoji}
          </span>
        ))}
        {/* one glass reflection strip — decoration, not a frost wall */}
        <span key={fedId} aria-hidden className={fedId ? 'fx-shine glint' : undefined} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9 }} />
        {catches.length > 5 && <Tag style={{ position: 'absolute', right: 10, bottom: 10, zIndex: 10 }}>+{catches.length - 5} more</Tag>}
        {catches.some(c => c.rarity === 'legendary') && <span className="foil-sparkle blink" style={{ position: 'absolute', right: 24, top: 18, zIndex: 10 }} />}
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
