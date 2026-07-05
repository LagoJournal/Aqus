import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const css = () => readFileSync(join(process.cwd(), 'src/tokens/foil-fx.css'), 'utf8')

describe('foil-fx.css optics layer', () => {
  it('is imported from styles.css', () => {
    expect(readFileSync(join(process.cwd(), 'styles.css'), 'utf8')).toContain('src/tokens/foil-fx.css')
  })
  it('registers --lx/--ly via @property OUTSIDE the gate (top of file)', () => {
    // head = everything before the first gated SELECTOR (line-start match,
    // so mentions of the attribute in prose comments don't cut early)
    const head = css().slice(0, css().search(/^\[data-liquid\]/m))
    expect(head).toMatch(/@property --lx\s*\{\s*syntax:\s*"<percentage>";\s*inherits:\s*true;\s*initial-value:\s*32%/)
    expect(head).toMatch(/@property --ly[\s\S]*?initial-value:\s*18%/)
  })
  it('declares the fx primitives and durations', () => {
    for (const t of ['--fx-metal:', '--fx-spectrum:', '--fx-nacre:', '--fx-heat:', '--fx-grain:', '--fx-dur-light: 16s', '--fx-dur-shine: 3200ms'])
      expect(css()).toContain(t)
  })
  it('anchors the spectrum conic at the light point', () => {
    expect(css()).toMatch(/--fx-spectrum:\s*conic-gradient\(from 210deg at var\(--lx\) var\(--ly\)/)
  })
  it('never uses hue-rotate (the banned spin)', () => {
    expect(css()).not.toMatch(/hue-rotate/)
  })
  it('gates every fx class under [data-liquid]', () => {
    // Every `.fx-` selector line must contain the gate (off-state fallbacks use .fx- too but are whitelisted)
    const ungated = css().split('\n').filter(l =>
      /^\s*\.fx-[a-z]/.test(l) && !/\[data-liquid\]/.test(l) && !/OFF-STATE/.test(l))
    expect(ungated).toEqual([])
  })
  it('has drift/hold light behavior', () => {
    expect(css()).toMatch(/@keyframes fx-drift/)
    expect(css()).toMatch(/\.fx-hold[\s\S]*?animation-play-state:\s*paused/)
  })
})

describe('solid finishes', () => {
  it('declares all seven solid finishes, gated', () => {
    for (const c of ['fx-holo', 'fx-chrome', 'fx-pearl', 'fx-aurora', 'fx-prism', 'fx-dew', 'fx-tile'])
      expect(css()).toMatch(new RegExp('\\[data-liquid\\] \\.' + c + '\\b'))
  })
  it('uses THE canonical composite on .fx-holo (color blend over panned metal)', () => {
    const holo = css().slice(css().indexOf('[data-liquid] .fx-holo'), css().indexOf('.fx-holo::before'))
    expect(holo).toMatch(/background-blend-mode:\s*color,\s*normal/)
    expect(holo).toMatch(/background-size:\s*100% 100%,\s*300% 300%/)
    expect(holo).toMatch(/background-position:\s*0 0,\s*var\(--lx\) var\(--ly\)/)
  })
  it('chrome has soft horizon falloff — a band, not a cut', () => {
    const chrome = css().slice(css().indexOf('[data-liquid] .fx-chrome'), css().indexOf('.fx-chrome::before'))
    expect(chrome).toMatch(/44%/) // falloff begins
    expect(chrome).toMatch(/52%/) // falloff ends
  })
})
