import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Banner } from './Banner.jsx'

// Regression: Banner action was inline-only and got cramped beside the message
// on mobile. The message/action row must be allowed to wrap so the action can
// drop below the message on narrow widths, and `stackAction` forces a stack.
describe('Banner action stacking regression', () => {
  it('lets the action wrap below the message by default (flexWrap)', () => {
    const { container } = render(
      <Banner action={<button>Renew</button>}>Your trial ends soon</Banner>
    )
    const row = container.querySelector('[data-aqus-banner-body]')
    expect(row).not.toBeNull()
    expect(row.style.flexWrap).toBe('wrap')
  })

  it('stacks the action onto its own row when stackAction is set', () => {
    const { container } = render(
      <Banner stackAction action={<button>Renew</button>}>
        Your trial ends soon
      </Banner>
    )
    const row = container.querySelector('[data-aqus-banner-body]')
    expect(row.style.flexDirection).toBe('column')
    expect(screen.getByText('Renew')).toBeTruthy()
  })
})
