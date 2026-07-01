import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import { NavBar } from './NavBar.jsx'

// Controllable ResizeObserver: capture callbacks so a test can drive the bar
// into compact mode (jsdom has no ResizeObserver and does no layout).
let observers = []
class MockResizeObserver {
  constructor(cb) { this.cb = cb; observers.push(this) }
  observe(el) { this.el = el }
  disconnect() { observers = observers.filter((o) => o !== this) }
}
function setWidth(w) {
  act(() => {
    observers.forEach((o) => o.cb([{ contentRect: { width: w } }]))
  })
}

beforeEach(() => { observers = []; global.ResizeObserver = MockResizeObserver })
afterEach(() => { delete global.ResizeObserver })

const links = [{ href: '#a', label: 'A' }, { href: '#b', label: 'B' }]

// Regression: a labeled action Button crowded the brand + hamburger on phones.
// NavBar now accepts `actionCompact` to swap in an icon-only variant below
// `compactAt`, keeping the accessible name.
describe('NavBar responsive action regression', () => {
  it('shows the full action when wide and swaps to actionCompact when compact', () => {
    const { getByText, queryByText } = render(
      <NavBar
        links={links}
        compactAt={720}
        action={<button>Add entry</button>}
        actionCompact={<button aria-label="Add entry">+</button>}
      />
    )
    setWidth(1000)
    expect(getByText('Add entry')).toBeTruthy()
    expect(queryByText('+')).toBeNull()

    setWidth(360)
    expect(queryByText('Add entry')).toBeNull()
    expect(getByText('+')).toBeTruthy()
  })

  it('keeps the plain action in both modes when no actionCompact is given', () => {
    const { getByText } = render(
      <NavBar links={links} compactAt={720} action={<button>Add entry</button>} />
    )
    setWidth(360)
    expect(getByText('Add entry')).toBeTruthy()
  })
})
