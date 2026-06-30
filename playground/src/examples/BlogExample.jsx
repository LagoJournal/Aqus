import React from 'react'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, BlogCard, Card,
  Badge, Tag, Divider, SearchInput, Avatar, Input, Accordion, Pagination,
  HeroSection,
} from '@agustin/aqus'

const POSTS = [
  { title: 'Designing the liquid bubble', excerpt: 'Why every round element in Aqus morphs instead of being a perfect circle — and how one primitive keeps it consistent across 71 components.', date: 'Jun 28, 2026', readTime: '5 min', tags: ['Design', 'Identity'], featured: true },
  { title: 'Glass, but only where it counts', excerpt: 'Structural chrome earns its blur. A practical rule for when to reach for frosted glass — and when flat surfaces win.', date: 'Jun 20, 2026', readTime: '4 min', tags: ['Material'] },
  { title: 'OKLCH accents in practice', excerpt: 'One accent, nine tokens, infinite brands. The constraints that keep contrast safe in light and dark.', date: 'Jun 12, 2026', readTime: '6 min', tags: ['Color'] },
  { title: 'Composing screens from primitives', excerpt: 'Stop re-styling raw elements. Build views the way the example kits do — and let the agent do the rest.', date: 'Jun 4, 2026', readTime: '7 min', tags: ['Patterns'] },
  { title: 'Motion that means something', excerpt: 'Spring entrances, hover lift, glassy fades. Where physics belongs — and where stillness reads as quality.', date: 'May 27, 2026', readTime: '5 min', tags: ['Motion'] },
]

export function BlogExample() {
  const [q, setQ] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [email, setEmail] = React.useState('')

  const featured = POSTS.find((p) => p.featured)
  const rest = POSTS.filter((p) => !p.featured && p.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <NavBar
        links={[
          { href: '#b', label: 'Blog' },
          { href: '#w', label: 'Work' },
          { href: '#a', label: 'About' },
        ]}
        activeHref="#b"
        action={<Button variant="primary" size="sm" icon={<i className="ph ph-rss" />}>Subscribe</Button>}
      />

      <HeroSection
        align="left"
        eyebrow="Featured"
        headline={featured.title}
        sub={featured.excerpt}
        cta={
          <Stack direction="row" gap={2} align="center" wrap>
            <Button variant="primary" pulse icon={<i className="ph ph-book-open" />}>Read article</Button>
            <span className="sc-foot-note">{featured.date} · {featured.readTime}</span>
          </Stack>
        }
      />

      <Section size="md">
        <Container>
          <Stack gap={4}>
            <PageHeader
              eyebrow="Writing"
              title="The Aqus journal"
              subtitle="Notes on design systems, material honesty, and shipping fast."
              action={<SearchInput value={q} onChange={setQ} placeholder="Search posts…" shortcut="⌘K" size="sm" />}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.4fr) minmax(0, 1fr)', gap: 28, alignItems: 'start' }}>
              {/* Article list */}
              <Stack gap={3}>
                {rest.map((p) => (
                  <BlogCard
                    key={p.title}
                    title={p.title}
                    excerpt={p.excerpt}
                    date={p.date}
                    readTime={p.readTime}
                    tags={p.tags}
                    href="#"
                  />
                ))}
                <Stack direction="row" justify="center">
                  <Pagination page={page} total={4} onChange={setPage} siblings={1} />
                </Stack>
              </Stack>

              {/* Sidebar */}
              <Stack gap={3}>
                <Card variant="featured" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" gap={2} align="center">
                      <Avatar name="Agustin Lago" size={44} status="online" />
                      <div>
                        <strong>Agustin Lago</strong>
                        <div className="sc-item-desc">Product engineer & designer</div>
                      </div>
                    </Stack>
                    <p className="sc-item-desc" style={{ margin: 0 }}>I write about building branded, production-quality interfaces fast.</p>
                    <Button variant="secondary" size="sm" icon={<i className="ph ph-paper-plane-tilt" />}>Follow</Button>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <Stack direction="row" justify="space-between" align="center">
                      <strong>Newsletter</strong>
                      <Badge tone="accent" pill>Weekly</Badge>
                    </Stack>
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<i className="ph ph-envelope-simple" />}
                      placeholder="you@studio.com"
                    />
                    <Button variant="primary" size="sm">Join 2,400 readers</Button>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={2}>
                    <strong>Topics</strong>
                    <Divider />
                    <Stack direction="row" gap={2} wrap>
                      {['Design', 'Color', 'Material', 'Patterns', 'Identity', 'Motion'].map((t) => (
                        <Tag key={t} tone="neutral" onClick={() => {}}>{t}</Tag>
                      ))}
                    </Stack>
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={2}>
                    <strong>Popular</strong>
                    <Divider />
                    {POSTS.slice(0, 3).map((p, i) => (
                      <Stack key={p.title} direction="row" gap={2} align="baseline">
                        <span className="sc-rule-num" style={{ fontSize: 'var(--text-body)' }}>{i + 1}</span>
                        <span className="sc-item-desc" style={{ color: 'var(--text)' }}>{p.title}</span>
                      </Stack>
                    ))}
                  </Stack>
                </Card>

                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={2}>
                    <strong>FAQ</strong>
                    <Divider />
                    <Accordion items={[
                      { id: 'q1', title: 'Is Aqus open source?', content: 'Yes — install it straight from a pinned git tag.' },
                      { id: 'q2', title: 'Can I theme the accent?', content: 'Override nine --accent-* tokens in :root. One accent per project.' },
                    ]} />
                  </Stack>
                </Card>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
