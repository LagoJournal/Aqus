import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Badge } from './Badge.jsx'

// Regression: long-text Badge overflowed its container on ~320px viewports
// because it hardcoded white-space:nowrap with no max-width. It must wrap and
// stay within its container by default.
describe('Badge overflow regression', () => {
  it('wraps and constrains width by default (no nowrap overflow)', () => {
    const { container } = render(
      <Badge>Evitar sentadilla profunda por ahora</Badge>
    )
    const el = container.firstChild
    expect(el.style.whiteSpace).toBe('normal')
    expect(el.style.maxWidth).toBe('100%')
  })

  it('supports nowrap opt-in for short status chips', () => {
    const { container } = render(<Badge nowrap>Live</Badge>)
    expect(container.firstChild.style.whiteSpace).toBe('nowrap')
  })
})
