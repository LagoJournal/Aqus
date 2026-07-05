/**
 * Aqus Foil FX — the light engine + Liquid Identity DLC toggle.
 *
 * The light is the liquid: one point (--lx/--ly) that drifts
 * (CSS fx-drift), leans to the pointer (this file), or passes
 * once (CSS fx-shine). Hue never spins.
 *
 * Usage:
 *   import { AqusFoil } from '@agustin/aqus/foil-fx'
 *   AqusFoil.enable()          // stamp [data-liquid] on <html> + persist
 *   AqusFoil.wire(container)   // idempotent; call after DOM injection
 *
 * Or as a script tag: <script type="module" src=".../foil-fx.js"></script>
 * (auto-restores the persisted toggle and wires the document).
 */

const KEY = 'aqus-liquid'
const wired = new WeakSet()
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

function wireEl(el) {
  if (wired.has(el)) return
  wired.add(el)

  // Randomized resting origin — part of the identity: no two
  // surfaces share a light spot (foil never looks stamped).
  const lx0 = 12 + Math.random() * 76
  const ly0 = 8 + Math.random() * 64
  el.style.setProperty('--lx', lx0 + '%')
  el.style.setProperty('--ly', ly0 + '%')
  el.style.animationDelay = (-Math.random() * 16).toFixed(2) + 's' // desync drift

  let raf = 0
  el.addEventListener('pointerenter', () => el.classList.add('fx-hold'))

  el.addEventListener('pointermove', (e) => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      const x = clamp((e.clientX - r.left) / r.width, 0, 1)
      const y = clamp((e.clientY - r.top) / r.height, 0, 1)
      el.style.setProperty('--lx', (x * 100) + '%')
      el.style.setProperty('--ly', (y * 100) + '%')
      if (el.hasAttribute('data-tilt')) {
        el.style.transition = 'transform 0.08s linear'
        el.style.transform =
          `perspective(900px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 7).toFixed(2)}deg)`
      }
    })
  })

  el.addEventListener('pointerleave', () => {
    el.classList.remove('fx-hold')
    el.style.setProperty('--lx', lx0 + '%')
    el.style.setProperty('--ly', ly0 + '%')
    if (el.hasAttribute('data-tilt')) {
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform = 'none'
    }
  })
}

export const AqusFoil = {
  /** Wire every .fx-live / [data-tilt] element under root. Idempotent. */
  wire(root = document) {
    if (root instanceof Element && (root.matches('.fx-live') || root.hasAttribute('data-tilt'))) wireEl(root)
    root.querySelectorAll?.('.fx-live, [data-tilt]').forEach(wireEl)
  },
  /** Turn the Liquid Identity DLC on (persisted). */
  enable() {
    document.documentElement.setAttribute('data-liquid', '')
    try { localStorage.setItem(KEY, 'on') } catch {}
  },
  /** Turn it off — core Aqus, calm and matte. */
  disable() {
    document.documentElement.removeAttribute('data-liquid')
    try { localStorage.setItem(KEY, 'off') } catch {}
  },
  /** Flip; returns the new state. */
  toggle() {
    const on = document.documentElement.hasAttribute('data-liquid')
    on ? this.disable() : this.enable()
    return !on
  },
  /** Is the DLC on? */
  enabled() {
    return document.documentElement.hasAttribute('data-liquid')
  },
}

// Script-tag ergonomics + auto-restore of the persisted toggle.
if (typeof window !== 'undefined') {
  window.AqusFoil = AqusFoil
  const boot = () => {
    try { if (localStorage.getItem(KEY) === 'on') AqusFoil.enable() } catch {}
    AqusFoil.wire(document)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
}
