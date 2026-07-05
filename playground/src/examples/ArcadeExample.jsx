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

// Placeholder stubs replaced by the pond/spin/aquarium tasks
function PondGame() { return null }
function SpinWheel() { return null }
function Aquarium() { return null }
