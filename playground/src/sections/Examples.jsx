import React from 'react'
import { Section, Container, SegmentedControl, Badge } from '@agustin/aqus'
import { DashboardExample } from '../examples/DashboardExample.jsx'
import { ProfileExample } from '../examples/ProfileExample.jsx'
import { JournalExample } from '../examples/JournalExample.jsx'

const VIEWS = {
  dashboard: { label: 'Dashboard', node: <DashboardExample /> },
  journal:   { label: 'Journal',   node: <JournalExample /> },
  profile:   { label: 'Profile',   node: <ProfileExample /> },
}

function darkAccentVars(h) {
  return {
    '--accent':       `oklch(0.72 0.19 ${h})`,
    '--accent-hover': `oklch(0.78 0.17 ${h})`,
    '--accent-light': `oklch(0.305 0.055 ${h})`,
    '--accent-mid':   `oklch(0.42 0.10 ${h})`,
    '--accent-text':  `oklch(0.86 0.07 ${h})`,
    '--accent-glow':  `oklch(0.72 0.19 ${h} / 0.28)`,
    '--accent-glass': `oklch(0.72 0.19 ${h} / 0.12)`,
    '--focus-ring':   `oklch(0.72 0.22 ${h} / 0.75)`,
    '--on-accent':    `oklch(0.15 0.02 ${h})`,
  }
}

export function Examples({ hue = 250, theme = 'light' }) {
  const [view, setView] = React.useState('dashboard')

  return (
    <Section id="examples" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Composition</p>
        <h2 className="sc-section-title">Real views, built from the primitives</h2>
        <p className="sc-section-lede">
          The same components, composed into complete product screens. This is the pattern the
          Aqus agent follows when it builds a view for one of your projects.
        </p>

        <div style={{ marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ display: 'inline-flex', minWidth: 'min-content' }}>
            <SegmentedControl
              value={view}
              onChange={setView}
              options={Object.entries(VIEWS).map(([value, v]) => ({ value, label: v.label }))}
            />
          </div>
        </div>

        <div className="sc-frame" data-theme={theme} style={theme === 'dark' ? darkAccentVars(hue) : undefined}>
          <div className="sc-frame-bar">
            <span className="sc-dot" /><span className="sc-dot" /><span className="sc-dot" />
            <span className="sc-foot-note" style={{ marginLeft: 8 }}>
              aqus-app / {VIEWS[view].label.toLowerCase()}
            </span>
            <Badge tone="accent" pill style={{ marginLeft: 'auto' }}>{theme}</Badge>
          </div>
          <div className="sc-frame-body">
            {VIEWS[view].node}
          </div>
        </div>

        <p className="sc-foot-note" style={{ marginTop: 12, textAlign: 'center' }}>
          Theme follows the global toggle — same components, no code change.
        </p>
      </Container>
    </Section>
  )
}
