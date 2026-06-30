import React from 'react'
import {
  Section, Container, Stack, Accordion, CodeBlock, Alert, Badge,
} from '@agustin/aqus'

const INSTALL = `npm install github:LagoJournal/aqus#v0.2.0`

const CSS_IMPORT = `// main.jsx / _app.tsx / layout.tsx
import '@agustin/aqus/styles.css'`

const ACCENT = `:root {
  /* One hue drives all nine tokens.
     --accent-h also drives the chart palette via CSS calc().
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
        links={[
          { href: '#work', label: 'Work' },
          { href: '#about', label: 'About' },
        ]}
        action={<Button variant="primary" size="sm">Get in touch</Button>}
      />
      <Section horizon>
        <Container>
          <HeroSection
            eyebrow="Available for work"
            headline="Build branded UIs fast."
            sub="Compose screens from the primitives — never re-style raw elements."
            cta={<Button variant="primary" pulse>View work</Button>}
          />
        </Container>
      </Section>
    </>
  )
}`

const STEPS = [
  {
    id: 'install',
    title: (
      <Stack direction="row" gap={2} align="center">
        <Badge tone="accent" pill>1</Badge>
        <span>Install</span>
      </Stack>
    ),
    content: (
      <Stack gap={3}>
        <p className="sc-item-desc">Pin to a version to lock components and docs together.</p>
        <CodeBlock language="bash" code={INSTALL} />
      </Stack>
    ),
  },
  {
    id: 'import',
    title: (
      <Stack direction="row" gap={2} align="center">
        <Badge tone="accent" pill>2</Badge>
        <span>Import the global CSS</span>
      </Stack>
    ),
    content: (
      <Stack gap={3}>
        <p className="sc-item-desc">Loads every token: color, type, spacing, elevation, motion.</p>
        <CodeBlock language="tsx" code={CSS_IMPORT} />
        <Alert tone="accent" title="Dark mode">
          Set <code>data-theme="dark"</code> on any ancestor element to activate the dark elevation ramp.
        </Alert>
      </Stack>
    ),
  },
  {
    id: 'accent',
    title: (
      <Stack direction="row" gap={2} align="center">
        <Badge tone="accent" pill>3</Badge>
        <span>Set your accent</span>
      </Stack>
    ),
    content: (
      <Stack gap={3}>
        <p className="sc-item-desc">
          Override the 9 accent tokens in your own <code>:root</code>. OKLCH only.
          The chart palette derives automatically from <code>--accent-h</code>.
        </p>
        <CodeBlock language="css" code={ACCENT} />
      </Stack>
    ),
  },
  {
    id: 'compose',
    title: (
      <Stack direction="row" gap={2} align="center">
        <Badge tone="accent" pill>4</Badge>
        <span>Compose</span>
      </Stack>
    ),
    content: (
      <Stack gap={3}>
        <p className="sc-item-desc">
          Build screens from primitives. Match the example views below.
          Never re-style raw HTML elements — always use the components.
        </p>
        <CodeBlock language="tsx" code={COMPOSE} />
      </Stack>
    ),
  },
]

export function Usage() {
  return (
    <Section id="usage" size="md" className="anchor">
      <Container>
        <p className="sc-eyebrow">Quick start</p>
        <h2 className="sc-section-title">Start in four steps</h2>
        <p className="sc-section-lede">
          Install, import, configure your accent, compose. The same setup works for personal
          projects and for the Claude agent that builds views from this library.
        </p>

        <Accordion items={STEPS} />
      </Container>
    </Section>
  )
}
