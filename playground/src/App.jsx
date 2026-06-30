import React from 'react'
import { NavBar, Button, IconButton, Container, Footer, Popover, ColorPicker, Stack } from '@agustin/aqus'
import { Hero } from './sections/Hero.jsx'
import { DesignRules } from './sections/DesignRules.jsx'
import { Materials } from './sections/Materials.jsx'
import { Usage } from './sections/Usage.jsx'
import { Glossary } from './sections/Glossary.jsx'
import { Examples } from './sections/Examples.jsx'

const NAV_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#rules', label: 'Design rules' },
  { href: '#materials', label: 'Glass' },
  { href: '#usage', label: 'Usage' },
  { href: '#glossary', label: 'Components' },
  { href: '#examples', label: 'Examples' },
]

// Accent presets — one hue each; the nine tokens are derived per theme.
const HUES = [
  { name: 'Cobalt', h: 250 },
  { name: 'Teal', h: 195 },
  { name: 'Violet', h: 300 },
  { name: 'Coral', h: 25 },
  { name: 'Green', h: 150 },
  { name: 'Amber', h: 70 },
]
const swatch = (h) => `oklch(0.65 0.20 ${h})`

const accentTokens = (h, theme) =>
  theme === 'dark'
    ? {
        '--accent': `oklch(0.72 0.19 ${h})`,
        '--accent-hover': `oklch(0.78 0.17 ${h})`,
        '--accent-light': `oklch(0.305 0.055 ${h})`,
        '--accent-mid': `oklch(0.42 0.10 ${h})`,
        '--accent-text': `oklch(0.86 0.07 ${h})`,
        '--accent-glow': `oklch(0.72 0.19 ${h} / 0.28)`,
        '--accent-glass': `oklch(0.72 0.19 ${h} / 0.12)`,
        '--focus-ring': `oklch(0.72 0.22 ${h} / 0.75)`,
        '--on-accent': `oklch(0.15 0.02 ${h})`,
      }
    : {
        '--accent': `oklch(0.65 0.20 ${h})`,
        '--accent-hover': `oklch(0.59 0.22 ${h})`,
        '--accent-light': `oklch(0.92 0.07 ${h})`,
        '--accent-mid': `oklch(0.78 0.11 ${h})`,
        '--accent-text': `oklch(0.25 0.05 ${h})`,
        '--accent-glow': `oklch(0.65 0.20 ${h} / 0.25)`,
        '--accent-glass': `oklch(0.65 0.20 ${h} / 0.12)`,
        '--focus-ring': `oklch(0.65 0.24 ${h} / 0.80)`,
        '--on-accent': `oklch(0.99 0.005 ${h})`,
      }

export function App() {
  const [theme, setTheme] = React.useState('light')
  const [hue, setHue] = React.useState(250)
  const [activeHref, setActiveHref] = React.useState('#overview')

  // Theme + accent both write to documentElement; re-derive accent on either change.
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    const tokens = accentTokens(hue, theme)
    for (const [k, v] of Object.entries(tokens)) document.documentElement.style.setProperty(k, v)
  }, [theme, hue])

  // Highlight the nav link for whichever section is in view.
  React.useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActiveHref('#' + visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="sc-shell">
      <div className="sc-navwrap">
        <Container>
          <NavBar
            links={NAV_LINKS}
            activeHref={activeHref}
            onBrandClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onLinkClick={(link) => { scrollTo(link.href.slice(1)); setActiveHref(link.href) }}
            action={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Popover
                  placement="bottom"
                  trigger={<IconButton variant="ghost" label="Change accent"><i className="ph ph-palette" /></IconButton>}
                >
                  <Stack gap={2} style={{ minWidth: 220 }}>
                    <strong style={{ fontSize: 'var(--text-body-sm)' }}>Accent</strong>
                    <span className="sc-item-desc">One hue → nine derived tokens. Recolors the whole page.</span>
                    <ColorPicker
                      value={swatch(hue)}
                      onChange={(color) => {
                        const match = HUES.find((x) => swatch(x.h) === color)
                        if (match) setHue(match.h)
                      }}
                      options={HUES.map((x) => ({ color: swatch(x.h), name: x.name }))}
                      size={30}
                    />
                  </Stack>
                </Popover>
                <IconButton variant="ghost" label="Toggle dark mode" onClick={toggleTheme}>
                  <i className={theme === 'light' ? 'ph ph-moon' : 'ph ph-sun'} />
                </IconButton>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<i className="ph ph-github-logo" />}
                  onClick={() => window.open('https://github.com/LagoJournal/aqus', '_blank')}
                >
                  GitHub
                </Button>
              </div>
            }
          />
        </Container>
      </div>

      <main>
        <Hero onPrimary={() => scrollTo('usage')} onSecondary={() => scrollTo('glossary')} />
        <DesignRules />
        <Materials />
        <Usage />
        <Glossary />
        <Examples />
      </main>

      <Footer
        copyright="© 2026 Agustin Lago · Software engineer · MIT"
        columns={[
          {
            title: 'Library',
            links: [
              { label: 'Overview', href: '#overview' },
              { label: 'Design rules', href: '#rules' },
              { label: 'Glass', href: '#materials' },
            ],
          },
          {
            title: 'Reference',
            links: [
              { label: 'Components', href: '#glossary' },
              { label: 'Examples', href: '#examples' },
              { label: 'GitHub', href: 'https://github.com/LagoJournal/aqus' },
            ],
          },
          {
            title: 'Install',
            links: [
              { label: 'npm package', href: 'https://github.com/LagoJournal/aqus' },
              { label: 'User guide', href: 'https://github.com/LagoJournal/aqus/blob/main/docs/USER_GUIDE.md' },
              { label: 'Agent guide', href: 'https://github.com/LagoJournal/aqus/blob/main/docs/AGENT_GUIDE.md' },
            ],
          },
        ]}
      />
    </div>
  )
}
