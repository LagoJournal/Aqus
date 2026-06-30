import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, Button, Avatar,
  Tabs, SearchInput, Accordion, BlogCard, Prose, Textarea,
  Tag, EmptyState, Input, Toast, Divider, Card,
} from '@agustin/aqus'

// ── Seed data ─────────────────────────────────────────────────────────────────

const SEED = [
  {
    id: 1,
    title: 'Designing the liquid bubble',
    excerpt: 'Why every round element morphs instead of being a perfect circle.',
    body: 'Every round element in Aqus is a slowly-morphing liquid bubble — never a perfect circle. One primitive keeps the identity consistent across the whole library.\n\nThe shape comes from an asymmetric border-radius that animates between a few keyframes, so it reads as organic without ever looking unstable.',
    date: 'Jun 28, 2026',
    readTime: '5 min',
    tags: ['Design', 'Identity'],
    author: 'Agustin Lago',
    featured: true,
  },
  {
    id: 2,
    title: 'Glass, but only where it counts',
    excerpt: 'Structural chrome earns its blur.',
    body: 'Blur and gloss belong on structural chrome — the nav, dialogs, drawers. Content stays flat and honest. A practical rule: if it scrolls with the page, it is content; if it frames the page, it can be glass.',
    date: 'Jun 20, 2026',
    readTime: '4 min',
    tags: ['Material'],
    author: 'Agustin Lago',
  },
  {
    id: 3,
    title: 'OKLCH accents in practice',
    excerpt: 'One accent, nine tokens, infinite brands.',
    body: 'One hue drives nine derived tokens. Pick a hue, set the lightness and chroma within the safe range, and every surface stays legible in light and dark. The chart palette spaces itself at 45° around the same hue.',
    date: 'Jun 12, 2026',
    readTime: '6 min',
    tags: ['Color'],
    author: 'Agustin Lago',
  },
  {
    id: 4,
    title: 'Composing screens from primitives',
    excerpt: 'Stop re-styling raw elements.',
    body: 'Build views the way the example kits do: compose from Button, Card, Input, Stack. Never re-style a raw element. The agent that reads this library follows the same recipe.',
    date: 'Jun 4, 2026',
    readTime: '7 min',
    tags: ['Patterns'],
    author: 'Agustin Lago',
  },
]

const TAGS = ['All', 'Design', 'Identity', 'Material', 'Color', 'Patterns']

// ── Toast helper ──────────────────────────────────────────────────────────────

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function JournalExample() {
  const [nav,     setNav]     = React.useState('#feed')
  const [entries, setEntries] = React.useState(SEED)
  const [current, setCurrent] = React.useState(null)
  const [cat,     setCat]     = React.useState('All')
  const [q,       setQ]       = React.useState('')
  const [draft,   setDraft]   = React.useState({ title: '', body: '', tags: [], tagInput: '' })
  const [tab,     setTab]     = React.useState('draft')
  const [toast,   fireToast]  = useToast()

  const section = nav.slice(1) // 'feed' | 'read' | 'write'

  // ── Filtering ──────────────────────────────────────────────────────────────
  const noFilter = cat === 'All' && q === ''
  const filtered = entries.filter(e =>
    (cat === 'All' || e.tags.includes(cat)) &&
    (q === '' ||
      e.title.toLowerCase().includes(q.toLowerCase()) ||
      e.excerpt.toLowerCase().includes(q.toLowerCase()))
  )
  const featuredEntry = entries.find(e => e.featured)
  const gridEntries = noFilter
    ? filtered.filter(e => !e.featured)
    : filtered

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addTag = () => {
    const trimmed = draft.tagInput.trim()
    if (!trimmed || draft.tags.includes(trimmed)) return
    setDraft(d => ({ ...d, tags: [...d.tags, trimmed], tagInput: '' }))
  }

  const publish = () => {
    if (!draft.title.trim() || !draft.body.trim()) {
      fireToast('Add a title and body.', 'warning')
      return
    }
    const words = draft.body.trim().split(/\s+/).filter(Boolean).length
    const readTime = `${Math.max(1, Math.round(words / 200))} min`
    const newEntry = {
      id: Date.now(),
      title: draft.title.trim(),
      body: draft.body.trim(),
      excerpt: draft.body.trim().slice(0, 100),
      date: 'Just now',
      readTime,
      tags: draft.tags,
      author: 'Agustin Lago',
    }
    setEntries(es => [newEntry, ...es])
    setDraft({ title: '', body: '', tags: [], tagInput: '' })
    setTab('draft')
    setNav('#feed')
    fireToast('Published.')
  }

  const entry = entries.find(e => e.id === current)

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#feed',  label: 'Feed' },
          { href: '#read',  label: 'Read' },
          { href: '#write', label: 'Write' },
        ]}
        activeHref={nav}
        onLinkClick={(l) => setNav(l.href)}
        action={<Avatar name="Agustin Lago" size={32} />}
      />

      <Section size="md">
        <Container>
          <Stack gap={5}>

            {/* ── Feed ──────────────────────────────────────────────────── */}
            {section === 'feed' && (
              <Stack gap={4}>

                {/* Filter row */}
                <Stack direction="row" gap={2} wrap align="center">
                  {TAGS.map(tag => (
                    <Tag
                      key={tag}
                      tone="neutral"
                      onClick={() => setCat(tag)}
                      style={
                        cat === tag
                          ? { background: 'var(--accent)', color: 'var(--on-accent)', whiteSpace: 'nowrap' }
                          : { whiteSpace: 'nowrap' }
                      }
                    >
                      {tag}
                    </Tag>
                  ))}
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <SearchInput value={q} onChange={setQ} placeholder="Search entries…" />
                  </div>
                </Stack>

                {/* Featured card — only when no filter is active */}
                {noFilter && featuredEntry && (
                  <BlogCard
                    title={featuredEntry.title}
                    excerpt={featuredEntry.excerpt}
                    date={featuredEntry.date}
                    readTime={featuredEntry.readTime}
                    tags={featuredEntry.tags}
                    featured
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrent(featuredEntry.id)
                      setNav('#read')
                    }}
                  />
                )}

                {/* Entry grid */}
                {filtered.length === 0 ? (
                  <EmptyState
                    icon={<i className="ph ph-magnifying-glass" />}
                    title="No entries found"
                    description="Try a different search term or category."
                    action={
                      <Button variant="secondary" onClick={() => { setCat('All'); setQ('') }}>
                        Clear filters
                      </Button>
                    }
                  />
                ) : gridEntries.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: 20,
                  }}>
                    {gridEntries.map(e => (
                      <BlogCard
                        key={e.id}
                        title={e.title}
                        excerpt={e.excerpt}
                        date={e.date}
                        readTime={e.readTime}
                        tags={e.tags}
                        featured={e.featured}
                        onClick={(ev) => {
                          ev.preventDefault()
                          setCurrent(e.id)
                          setNav('#read')
                        }}
                      />
                    ))}
                  </div>
                )}

              </Stack>
            )}

            {/* ── Read ──────────────────────────────────────────────────── */}
            {section === 'read' && (
              <Stack gap={4}>
                <div>
                  <Button
                    variant="ghost"
                    icon={<i className="ph ph-arrow-left" />}
                    onClick={() => setNav('#feed')}
                  >
                    Back to feed
                  </Button>
                </div>

                {entry ? (
                  <Stack gap={4}>

                    {/* Article header */}
                    <Card variant="resting" style={{ padding: 24 }}>
                      <Stack gap={3}>
                        <Stack direction="row" gap={3} align="center" wrap style={{ minWidth: 0 }}>
                          <Avatar name={entry.author} size={40} />
                          <Stack gap={0} style={{ minWidth: 0 }}>
                            <span style={{
                              fontWeight: 'var(--weight-semibold)',
                              fontSize: 'var(--text-body-sm)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {entry.author}
                            </span>
                            <span className="sc-foot-note">{entry.date} · {entry.readTime}</span>
                          </Stack>
                        </Stack>
                        <Stack direction="row" gap={2} wrap>
                          {entry.tags.map(t => (
                            <Tag key={t} tone="accent" style={{ whiteSpace: 'nowrap' }}>{t}</Tag>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>

                    {/* Body */}
                    <Prose>
                      <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'var(--text-h1)',
                        color: 'var(--text)',
                        margin: '0 0 var(--space-4)',
                        lineHeight: 'var(--leading-snug)',
                      }}>
                        {entry.title}
                      </h1>
                      {entry.body.split('\n\n').map((para, i) => (
                        <p key={i} style={{
                          color: 'var(--text-muted)',
                          lineHeight: 'var(--leading-relaxed)',
                          margin: '0 0 var(--space-4)',
                        }}>
                          {para}
                        </p>
                      ))}
                    </Prose>

                    {/* Author notes accordion */}
                    <Card variant="resting" style={{ padding: 20 }}>
                      <Stack gap={3}>
                        <strong>Author notes</strong>
                        <Divider />
                        <Accordion
                          items={[
                            {
                              id: 'why',
                              title: 'Why this matters',
                              content: 'Every design decision in Aqus connects back to a single purpose: building interfaces that feel alive and coherent. This entry is part of that ongoing documentation.',
                            },
                            {
                              id: 'next',
                              title: "What's next",
                              content: 'The next entry will explore how tokens compose into component-level decisions — and why the system makes certain tradeoffs along the way.',
                            },
                          ]}
                        />
                      </Stack>
                    </Card>

                  </Stack>
                ) : (
                  <EmptyState
                    icon={<i className="ph ph-book-open" />}
                    title="No entry selected"
                    description="Go to the feed and click an entry to read it."
                    action={
                      <Button variant="secondary" onClick={() => setNav('#feed')}>Browse feed</Button>
                    }
                  />
                )}
              </Stack>
            )}

            {/* ── Write ─────────────────────────────────────────────────── */}
            {section === 'write' && (
              <Stack gap={4}>

                <Tabs
                  value={tab}
                  onChange={setTab}
                  tabs={[
                    { value: 'draft',   label: 'Draft' },
                    { value: 'preview', label: 'Preview' },
                  ]}
                />

                {/* Draft form */}
                {tab === 'draft' && (
                  <Stack gap={3}>
                    <Input
                      label="Title"
                      value={draft.title}
                      onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                      placeholder="Entry title"
                    />

                    {/* Tag entry row */}
                    <Stack direction="row" gap={2} align="flex-end" wrap>
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <Input
                          label="Add tag"
                          value={draft.tagInput}
                          onChange={(e) => setDraft(d => ({ ...d, tagInput: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); addTag() }
                          }}
                          placeholder="e.g. Design"
                        />
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<i className="ph ph-plus" />}
                        onClick={addTag}
                      >
                        Add
                      </Button>
                    </Stack>

                    {draft.tags.length > 0 && (
                      <Stack direction="row" gap={2} wrap>
                        {draft.tags.map(t => (
                          <Tag
                            key={t}
                            tone="accent"
                            style={{ whiteSpace: 'nowrap' }}
                            onRemove={() => setDraft(d => ({ ...d, tags: d.tags.filter(x => x !== t) }))}
                          >
                            {t}
                          </Tag>
                        ))}
                      </Stack>
                    )}

                    <Textarea
                      label="Body"
                      value={draft.body}
                      onChange={(e) => setDraft(d => ({ ...d, body: e.target.value }))}
                      rows={10}
                      placeholder="Write your entry…"
                    />
                  </Stack>
                )}

                {/* Preview */}
                {tab === 'preview' && (
                  <Card variant="resting" style={{ padding: 24 }}>
                    <Prose>
                      <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'var(--text-h1)',
                        color: 'var(--text)',
                        margin: '0 0 var(--space-4)',
                        lineHeight: 'var(--leading-snug)',
                      }}>
                        {draft.title || 'Untitled'}
                      </h1>
                      {draft.body.trim()
                        ? draft.body.split('\n\n').map((para, i) => (
                            <p key={i} style={{
                              color: 'var(--text-muted)',
                              lineHeight: 'var(--leading-relaxed)',
                              margin: '0 0 var(--space-4)',
                            }}>
                              {para}
                            </p>
                          ))
                        : (
                          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            Start writing in the Draft tab to see a preview here.
                          </p>
                        )
                      }
                    </Prose>
                  </Card>
                )}

                {/* Actions */}
                <Stack direction="row" gap={2} wrap>
                  <Button
                    variant="secondary"
                    icon={<i className="ph ph-floppy-disk" />}
                    onClick={() => fireToast('Draft saved.')}
                  >
                    Save draft
                  </Button>
                  <Button
                    variant="primary"
                    icon={<i className="ph ph-paper-plane-right" />}
                    onClick={publish}
                  >
                    Publish
                  </Button>
                </Stack>

              </Stack>
            )}

          </Stack>
        </Container>
      </Section>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast.show && ReactDOM.createPortal(
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => {}} />
        </div>,
        document.body
      )}
    </div>
  )
}
