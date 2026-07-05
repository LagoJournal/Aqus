import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const css = () => readFileSync(join(process.cwd(), 'src/tokens/foil.css'), 'utf8')
const manifest = () => readFileSync(join(process.cwd(), 'styles.css'), 'utf8')

describe('foil.css punk layer', () => {
  it('exists and is imported from styles.css', () => {
    expect(css().length).toBeGreaterThan(0)
    expect(manifest()).toContain('src/tokens/foil.css')
  })
  it('declares the --foil-* color tokens', () => {
    for (const t of ['--foil-cyan','--foil-violet','--foil-magenta','--foil-lime','--foil-sky','--foil-flare','--foil-punch','--foil-ink'])
      expect(css()).toContain(t + ':')
  })
  it('declares every punk object class from the handoff KEEP list', () => {
    for (const c of ['.foil-sticker','.foil-bubble','.foil-field','.foil-cluster','.foil-burst','.foil-sparkle','.foil-riso','.foil-halftone','.foil-text-zine','.foil-text-glitch','.foil-label','.foil-scratch','.foil-glass'])
      expect(css()).toContain(c)
  })
  it('never uses hue-rotate (banned library-wide)', () => {
    expect(css()).not.toMatch(/hue-rotate/)
  })
  it('reuses agus-liquid, does not redeclare it', () => {
    expect(css()).toContain('agus-liquid')
    expect(css()).not.toMatch(/@keyframes\s+agus-liquid/)
  })
})
