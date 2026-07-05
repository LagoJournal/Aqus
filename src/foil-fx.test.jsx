import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AqusFoil } from '../foil-fx.js'

beforeEach(() => {
  document.documentElement.removeAttribute('data-liquid')
  document.body.innerHTML = ''
  localStorage.clear()
  // rAF: run immediately so pointermove handlers apply synchronously
  vi.stubGlobal('requestAnimationFrame', (cb) => { cb(); return 1 })
})

function makeCard() {
  const el = document.createElement('div')
  el.className = 'fx-live'
  el.setAttribute('data-tilt', '')
  el.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100 })
  document.body.appendChild(el)
  return el
}

describe('AqusFoil toggle API', () => {
  it('enable stamps data-liquid on <html> and persists', () => {
    AqusFoil.enable()
    expect(document.documentElement.hasAttribute('data-liquid')).toBe(true)
    expect(localStorage.getItem('aqus-liquid')).toBe('on')
  })
  it('disable removes the attribute and persists off', () => {
    AqusFoil.enable(); AqusFoil.disable()
    expect(document.documentElement.hasAttribute('data-liquid')).toBe(false)
    expect(localStorage.getItem('aqus-liquid')).toBe('off')
  })
  it('toggle flips and returns the new state', () => {
    expect(AqusFoil.toggle()).toBe(true)
    expect(AqusFoil.toggle()).toBe(false)
  })
})

describe('light engine wiring', () => {
  it('randomizes the resting light origin within the spec ranges', () => {
    const el = makeCard()
    AqusFoil.wire(document)
    const lx = parseFloat(el.style.getPropertyValue('--lx'))
    const ly = parseFloat(el.style.getPropertyValue('--ly'))
    expect(lx).toBeGreaterThanOrEqual(12); expect(lx).toBeLessThanOrEqual(88)
    expect(ly).toBeGreaterThanOrEqual(8);  expect(ly).toBeLessThanOrEqual(72)
    expect(el.style.animationDelay).toMatch(/^-/) // desynced drift
  })
  it('is idempotent — wiring twice does not stack listeners', () => {
    const el = makeCard()
    const spy = vi.spyOn(el, 'addEventListener')
    AqusFoil.wire(document); AqusFoil.wire(document)
    const enters = spy.mock.calls.filter(c => c[0] === 'pointerenter')
    expect(enters.length).toBe(1)
  })
  it('pointerenter holds the drift; pointermove leans the light; leave restores', () => {
    const el = makeCard()
    AqusFoil.wire(document)
    const lx0 = el.style.getPropertyValue('--lx')

    el.dispatchEvent(new MouseEvent('pointerenter'))
    expect(el.classList.contains('fx-hold')).toBe(true)

    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 150, clientY: 25 }))
    expect(el.style.getPropertyValue('--lx')).toBe('75%')
    expect(el.style.getPropertyValue('--ly')).toBe('25%')
    expect(el.style.transform).toContain('perspective(900px)') // data-tilt

    el.dispatchEvent(new MouseEvent('pointerleave'))
    expect(el.classList.contains('fx-hold')).toBe(false)
    expect(el.style.getPropertyValue('--lx')).toBe(lx0)
    expect(el.style.transform).toBe('none')
  })
  it('tilt never exceeds ±7 degrees', () => {
    const el = makeCard()
    AqusFoil.wire(document)
    el.dispatchEvent(new MouseEvent('pointerenter'))
    el.dispatchEvent(new MouseEvent('pointermove', { clientX: 200, clientY: 0 })) // extreme corner
    const m = el.style.transform.match(/rotateX\(([-\d.]+)deg\) rotateY\(([-\d.]+)deg\)/)
    expect(Math.abs(parseFloat(m[1]))).toBeLessThanOrEqual(7)
    expect(Math.abs(parseFloat(m[2]))).toBeLessThanOrEqual(7)
  })
})
