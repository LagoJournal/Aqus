import React from 'react'
import {
  Section, Container, Card, Stack, CodeBlock, Badge,
  SegmentedControl, Alert,
} from '@agustin/aqus'

const INSTALL = {
  pin: 'npm install github:LagoJournal/aqus#v0.1.0',
  latest: 'npm install github:LagoJournal/aqus',
  local: 'npm install file:../aqus',
}

const CSS_IMPORT = `// app root: main.jsx / _app.tsx / layout.tsx
import '@agustin/aqus/styles.css'`

const ACCENT = `:root {
  /* One hue → nine tokens. --accent-h drives the chart palette.
     Constraints: L 0.55–0.72, C 0.12–0.24. */
  --accent-h:      250;
  --accent:        oklch(0.65 0.20 250);
  --accent-hover:  oklch(0.59 0.22 250);
  --accent-light:  oklch(0.92 0.07 250);
  --accent-mid:    oklch(0.78 0.11 250);
  --accent-text:   oklch(0.25 0.05 250);
  --accent-glow:   oklch(0.65 0.20 250 / 0.25);
  --accent-glass:  oklch(0.65 0.20 250 / 0.12);
  --focus-ring:    oklch(0.65 0.24 250 / 0.80);
  --on-accent:     oklch(0.99 0.005 250);
}`

const COMPOSE = `import { NavBar, HeroSection, Section, Container, Button } from '@agustin/aqus'

export function Landing() {
  return (
    <>
      <NavBar
        links={[{ href: '/', label: 'Home' }, { href: '/work', label: 'Work' }]}
        action={<Button variant="primary" size="sm">Get in touch</Button>}
      />
      <Section horizon>
        <Container>
          <HeroSection
            eyebrow="Available for work"
            headline="Build branded UIs fast"
            sub="Compose screens from the primitives — never re-style raw elements."
            cta={<Button variant="primary" pulse>View work</Button>}
          />
        </Container>
      </Section>
    </>
  )
}`

export function Usage() {
  const [tab, setTab] = React.useState('pin')

  return (
    <Section id="usage" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Quick start</p>
        <h2 className="sc-section-title">Drop it into any project</h2>
        <p className="sc-section-lede">
          One CSS import, one accent, then compose. The same install works for personal projects
          and for the Claude agent that builds views from this library.
        </p>

        <div className="sc-grid sc-grid-2">
          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <Stack direction="row" gap={2} align="center">
                <Badge tone="accent" pill>1</Badge>
                <h3 style={{ margin: 0, fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-bold)' }}>Install</h3>
              </Stack>
              <p className="sc-item-desc">Pin a version to lock components and docs together.</p>
              <SegmentedControl
                size="sm"
                value={tab}
                onChange={setTab}
                options={[
                  { value: 'pin', label: 'Pinned' },
                  { value: 'latest', label: 'Latest' },
                  { value: 'local', label: 'Local' },
                ]}
              />
              <CodeBlock language="bash" code={INSTALL[tab]} />
            </Stack>
          </Card>

          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <Stack direction="row" gap={2} align="center">
                <Badge tone="accent" pill>2</Badge>
                <h3 style={{ margin: 0, fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-bold)' }}>Import the global CSS</h3>
              </Stack>
              <p className="sc-item-desc">Loads every token: color, type, spacing, elevation, motion.</p>
              <CodeBlock language="tsx" code={CSS_IMPORT} />
              <Alert tone="accent" title="Dark mode">
                Set <code>data-theme="dark"</code> on a root element for the dark elevation ramp.
              </Alert>
            </Stack>
          </Card>

          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <Stack direction="row" gap={2} align="center">
                <Badge tone="accent" pill>3</Badge>
                <h3 style={{ margin: 0, fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-bold)' }}>Set your accent</h3>
              </Stack>
              <p className="sc-item-desc">Override the 9 accent tokens in your own <code>:root</code>. OKLCH only.</p>
              <CodeBlock language="css" code={ACCENT} />
            </Stack>
          </Card>

          <Card variant="resting" style={{ padding: 24 }}>
            <Stack gap={3}>
              <Stack direction="row" gap={2} align="center">
                <Badge tone="accent" pill>4</Badge>
                <h3 style={{ margin: 0, fontSize: 'var(--text-body-lg)', fontWeight: 'var(--weight-bold)' }}>Compose</h3>
              </Stack>
              <p className="sc-item-desc">Build screens from primitives. Match the example views below.</p>
              <CodeBlock language="tsx" code={COMPOSE} />
            </Stack>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
