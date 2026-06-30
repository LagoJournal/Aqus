import React from 'react'
import { Section, Container, SegmentedControl, Stack, Badge } from '@agustin/aqus'
import { DashboardExample } from '../examples/DashboardExample.jsx'
import { BlogExample } from '../examples/BlogExample.jsx'
import { ProfileExample } from '../examples/ProfileExample.jsx'

const VIEWS = {
  dashboard: { label: 'Dashboard', node: <DashboardExample /> },
  blog: { label: 'Blog', node: <BlogExample /> },
  profile: { label: 'User profile', node: <ProfileExample /> },
}

export function Examples() {
  const [view, setView] = React.useState('dashboard')
  const [theme, setTheme] = React.useState('light')

  return (
    <Section id="examples" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Composition</p>
        <h2 className="sc-section-title">Real views, built from the primitives</h2>
        <p className="sc-section-lede">
          The same components, composed into complete product screens. This is the pattern the
          Aqus agent follows when it builds a view for one of your projects.
        </p>

        <Stack direction="row" gap={3} align="center" justify="space-between" wrap style={{ marginBottom: 16 }}>
          <SegmentedControl
            value={view}
            onChange={setView}
            options={Object.entries(VIEWS).map(([value, v]) => ({ value, label: v.label }))}
          />
          <SegmentedControl
            size="sm"
            value={theme}
            onChange={setTheme}
            options={[{ value: 'light', label: '☀ Light' }, { value: 'dark', label: '☾ Dark' }]}
          />
        </Stack>

        <div className="sc-frame" data-theme={theme}>
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
          Toggle the theme to see the dark elevation ramp — same components, no code change.
        </p>
      </Container>
    </Section>
  )
}
