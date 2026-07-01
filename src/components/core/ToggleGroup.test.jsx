import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ToggleGroup } from './ToggleGroup.jsx'

// Regression: with many short options the inline-flex row could not wrap and
// overflowed narrow (320px) viewports. The group must wrap.
describe('ToggleGroup wrapping regression', () => {
  it('allows options to wrap instead of overflowing', () => {
    const { container } = render(
      <ToggleGroup
        options={[
          { value: 'g1', label: 'G·1' },
          { value: 'p1', label: 'P·1' },
          { value: 'g2', label: 'G·2' },
          { value: 'p2', label: 'P·2' },
        ]}
      />
    )
    expect(container.firstChild.style.flexWrap).toBe('wrap')
  })
})
