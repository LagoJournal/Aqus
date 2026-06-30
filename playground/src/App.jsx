import React from 'react'
import { NavBar, Button, IconButton, Container, Footer } from '@agustin/aqus'
import { Hero } from './sections/Hero.jsx'
import { DesignRules } from './sections/DesignRules.jsx'
import { Usage } from './sections/Usage.jsx'
import { Glossary } from './sections/Glossary.jsx'
import { Examples } from './sections/Examples.jsx'

const NAV_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#rules', label: 'Design rules' },
  { href: '#usage', label: 'Usage' },
  { href: '#glossary', label: 'Components' },
  { href: '#examples', label: 'Examples' },
]

export function App() {
  const [theme, setTheme] = React.useState('light')
  const [activeHref, setActiveHref] = React.useState('#overview')

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

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

  return (
    <div className="sc-shell">
      <div className="sc-navwrap">
        <Container>
          <NavBar
            links={NAV_LINKS}
            activeHref={activeHref}
            onLinkClick={(link) => setActiveHref(link.href)}
            action={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <IconButton
                  variant="ghost"
                  label="Toggle dark mode"
                  onClick={toggleTheme}
                >
                  <i className={theme === 'light' ? 'ph ph-moon' : 'ph ph-sun'} />
                </IconButton>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<i className="ph ph-github-logo" />}
                  onClick={() => window.open('https://github.com/agustinlago/aqus', '_blank')}
                >
                  GitHub
                </Button>
              </div>
            }
          />
        </Container>
      </div>

      <main>
        <Hero />
        <DesignRules />
        <Usage />
        <Glossary />
        <Examples />
      </main>

      <Footer
        copyright="© 2026 Agustin Lago · Aqus design system · MIT"
        columns={[
          {
            title: 'Library',
            links: [
              { label: 'Overview', href: '#overview' },
              { label: 'Design rules', href: '#rules' },
              { label: 'Usage', href: '#usage' },
            ],
          },
          {
            title: 'Reference',
            links: [
              { label: 'Components', href: '#glossary' },
              { label: 'Examples', href: '#examples' },
              { label: 'GitHub', href: 'https://github.com/agustinlago/aqus' },
            ],
          },
          {
            title: 'Install',
            links: [
              { label: 'npm package', href: 'https://github.com/agustinlago/aqus' },
              { label: 'User guide', href: 'https://github.com/agustinlago/aqus/blob/main/docs/USER_GUIDE.md' },
              { label: 'Agent guide', href: 'https://github.com/agustinlago/aqus/blob/main/docs/AGENT_GUIDE.md' },
            ],
          },
        ]}
      />
    </div>
  )
}
