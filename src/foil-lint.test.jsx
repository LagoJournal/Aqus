import { describe, it, expect } from 'vitest'
import { lintSource } from '../lib/foil-lint.js'

describe('foil adherence lint', () => {
  it('flags hue-rotate anywhere', () => {
    const out = lintSource('a.css', '.x { filter: hue-rotate(90deg); }')
    expect(out.some(f => f.rule === 'no-hue-rotate')).toBe(true)
  })
  it('flags more than one ultra per document', () => {
    const html = '<div class="fx-finish ultra"></div><div class="fx-finish ultra"></div>'
    const out = lintSource('a.html', html)
    expect(out.some(f => f.rule === 'one-ultra')).toBe(true)
  })
  it('allows exactly one ultra', () => {
    expect(lintSource('a.html', '<div class="fx-finish ultra"></div>')).toEqual([])
  })
  it('flags fx-finish nested in fx-finish (foil-over-foil)', () => {
    const html = '<div class="fx-finish rich"><div class="fx-finish soft"></div></div>'
    const out = lintSource('a.html', html)
    expect(out.some(f => f.rule === 'no-foil-over-foil')).toBe(true)
  })
  it('allows sibling fx-finish elements', () => {
    const html = '<div class="fx-finish rich"></div><div class="fx-finish soft"></div>'
    expect(lintSource('a.html', html)).toEqual([])
  })
})
