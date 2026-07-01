import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, PageHeader, Button, Card,
  Avatar, Badge, Tag, SearchInput, SegmentedControl, Textarea,
  Timeline, Divider, EmptyState, Toast, Dialog, Prose, StatCard, LineChart,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const TODAY = 'Jun 30, 2026'

const ARCHIVE = [
  {
    id: 1,
    date: 'Jun 29, 2026',
    mood: 'Good',
    words: 312,
    excerpt: 'Finished the glass recipe for the NavBar. Spent the afternoon working through blur levels — the dense variant at 48px reads as solid against scrolling content while still catching the light.',
    body: 'Finished the glass recipe for the NavBar. Spent the afternoon working through blur levels — the dense variant at 48px reads as solid against scrolling content while still catching the light.\n\nThe tricky part was the background shorthand. A bare color token in a non-final layer makes the whole declaration invalid, so the accent tint has to wrap as a flat gradient. Learned that one the hard way.\n\nGood day overall. Shipped something that felt right.',
  },
  {
    id: 2,
    date: 'Jun 27, 2026',
    mood: 'Great',
    words: 220,
    excerpt: 'Completed the OKLCH token work. One hue now drives nine tokens — accent, hover, light, mid, text, glow, glass, focus ring, and on-accent. The chart palette auto-derives at 45° steps.',
    body: 'Completed the OKLCH token work. One hue now drives nine tokens — accent, hover, light, mid, text, glow, glass, focus ring, and on-accent. The chart palette auto-derives at 45° steps.\n\nThis is the cleanest the color architecture has ever been. No more per-component color overrides.',
  },
  {
    id: 3,
    date: 'Jun 25, 2026',
    mood: 'OK',
    words: 178,
    excerpt: 'Slow day. Debugged the chart tooltip issue — position: fixed elements trapped by a parent transform. Fixed by removing a no-op translateY(0) from Card.',
    body: 'Slow day. Debugged the chart tooltip issue — position: fixed elements trapped by a parent transform. Fixed by removing a no-op translateY(0) from Card. Portaled all chart tooltips to document.body as a belt-and-suspenders fix.\n\nSometimes a day is just debugging.',
  },
  {
    id: 4,
    date: 'Jun 22, 2026',
    mood: 'Good',
    words: 260,
    excerpt: 'Wrote the UX laws document — 10 laws mapped to concrete Aqus component rules. Miller, Hick, Von Restorff, Fitts, Postel, Doherty, Tesler, Peak-End, Jakob, Aesthetic-Usability.',
    body: 'Wrote the UX laws document — 10 laws mapped to concrete Aqus component rules. Miller, Hick, Von Restorff, Fitts, Postel, Doherty, Tesler, Peak-End, Jakob, Aesthetic-Usability.\n\nThe goal: the agent reads the doc and knows *why* each rule exists, not just what to do. Decision-making built in.',
  },
]

const MOOD_OPTIONS = [
  { value: 'Great',   label: 'Great' },
  { value: 'Good',    label: 'Good' },
  { value: 'OK',      label: 'OK' },
  { value: 'Low',     label: 'Low' },
]

const MOOD_TONE = { Great: 'success', Good: 'accent', OK: 'neutral', Low: 'warning' }

const WORDS_DATA = [
  { x: 'Jun 22', words: 260 }, { x: 'Jun 25', words: 178 },
  { x: 'Jun 27', words: 220 }, { x: 'Jun 29', words: 312 },
]
const WORDS_SERIES = [{ key: 'words', label: 'Words' }]

// ── Helpers ───────────────────────────────────────────────────────────────────

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
}

// ── Component ─────────────────────────────────────────────────────────────────

export function JournalExample() {
  const [nav,     setNav]     = React.useState('#today')
  const [archive, setArchive] = React.useState(ARCHIVE)
  const [q,       setQ]       = React.useState('')
  const [reading, setReading] = React.useState(null)

  // Today's entry
  const [mood,  setMood]  = React.useState('Great')
  const [body,  setBody]  = React.useState('')
  const [saved, setSaved] = React.useState(false)

  const [toast, fireToast] = useToast()

  const section = nav.slice(1)
  const words   = wordCount(body)

  const filteredArchive = archive.filter(e =>
    q === '' ||
    e.excerpt.toLowerCase().includes(q.toLowerCase()) ||
    e.date.toLowerCase().includes(q.toLowerCase())
  )

  const publish = () => {
    if (!body.trim()) { fireToast('Write something first.', 'warning'); return }
    const entry = {
      id:      Date.now(),
      date:    TODAY,
      mood,
      words,
      excerpt: body.trim().slice(0, 140),
      body:    body.trim(),
    }
    setArchive(a => [entry, ...a])
    setBody('')
    setSaved(false)
    setNav('#archive')
    fireToast('Entry published.')
  }

  const avgWords = archive.length
    ? Math.round(archive.reduce((s, e) => s + e.words, 0) / archive.length)
    : 0

  const readingEntry = archive.find(e => e.id === reading)

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#today',   label: 'Today' },
          { href: '#archive', label: 'Archive' },
          { href: '#insights',label: 'Insights' },
        ]}
        activeHref={nav}
        onLinkClick={(l) => setNav(l.href)}
        action={<Avatar name="Agustin Lago" size={32} />}
      />

      {/* ── Today ─────────────────────────────────────────────────────────── */}
      {section === 'today' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow={TODAY}
                title="Daily reflection"
                subtitle="Write freely. Publish when ready."
              />

              <Card variant="resting" style={{ padding: 24 }}>
                <Stack gap={4}>
                  {/* Mood */}
                  <Stack gap={2}>
                    <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)' }}>
                      How are you today?
                    </span>
                    <SegmentedControl
                      value={mood}
                      onChange={setMood}
                      options={MOOD_OPTIONS}
                    />
                  </Stack>

                  <Divider />

                  {/* Body */}
                  <Textarea
                    label="Entry"
                    value={body}
                    onChange={(e) => { setBody(e.target.value); setSaved(false) }}
                    rows={10}
                    placeholder="Write your thoughts…"
                  />

                  {/* Word count + actions */}
                  <Stack direction="row" justify="space-between" align="center" wrap gap={2}>
                    <Stack direction="row" gap={2} align="center">
                      <Badge tone={MOOD_TONE[mood]} pill dot>{mood}</Badge>
                      {words > 0 && (
                        <span className="sc-foot-note">{words} words</span>
                      )}
                      {saved && (
                        <Badge tone="neutral" pill>Draft saved</Badge>
                      )}
                    </Stack>
                    <Stack direction="row" gap={2}>
                      <Button
                        variant="secondary"
                        icon={<i className="ph ph-floppy-disk" />}
                        onClick={() => { if (body.trim()) { setSaved(true); fireToast('Draft saved.') } }}
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
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Archive ───────────────────────────────────────────────────────── */}
      {section === 'archive' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Archive"
                title="Past entries"
                subtitle={`${archive.length} ${archive.length === 1 ? 'entry' : 'entries'} published.`}
                action={
                  <Button variant="primary" icon={<i className="ph ph-pencil-simple" />} onClick={() => setNav('#today')}>
                    Write today
                  </Button>
                }
              />

              <SearchInput value={q} onChange={setQ} placeholder="Search entries…" />

              {filteredArchive.length === 0 ? (
                <EmptyState
                  icon={<i className="ph ph-book-open" />}
                  title={q ? 'No entries match' : 'Nothing published yet'}
                  description={q ? 'Try a different search term.' : 'Write and publish your first entry.'}
                  action={
                    q
                      ? <Button variant="secondary" onClick={() => setQ('')}>Clear search</Button>
                      : <Button variant="primary" onClick={() => setNav('#today')}>Start writing</Button>
                  }
                />
              ) : (
                <Card variant="resting" style={{ padding: 20 }}>
                  <Timeline
                    items={filteredArchive.map(e => ({
                      title: e.date,
                      description: e.excerpt,
                      time: `${e.words}w`,
                      status: 'done',
                      action: (
                        <Stack direction="row" gap={2} align="center" wrap>
                          <Badge tone={MOOD_TONE[e.mood]}>{e.mood}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReading(e.id)}
                          >
                            Read
                          </Button>
                        </Stack>
                      ),
                    }))}
                  />
                </Card>
              )}
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Insights ──────────────────────────────────────────────────────── */}
      {section === 'insights' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <PageHeader
                eyebrow="Insights"
                title="Writing stats"
                subtitle="Your reflection patterns over time."
              />

              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
                <StatCard
                  label="Writing streak"
                  value={`${archive.length}d`}
                  delta="personal best"
                  up
                  icon={<i className="ph ph-fire" />}
                />
                <StatCard
                  label="Total entries"
                  value={String(archive.length)}
                  delta="since Jun 22"
                  up
                  icon={<i className="ph ph-book-open" />}
                />
                <StatCard
                  label="Avg words"
                  value={String(avgWords)}
                  delta="per entry"
                  up
                  icon={<i className="ph ph-text-aa" />}
                />
              </div>

              {/* Words per day chart */}
              {archive.length > 0 && (
                <Card variant="resting" style={{ padding: 20 }}>
                  <Stack gap={3}>
                    <strong>Words per entry</strong>
                    <Divider />
                    <LineChart
                      data={WORDS_DATA}
                      series={WORDS_SERIES}
                      height={160}
                      area
                    />
                  </Stack>
                </Card>
              )}

              {/* Mood distribution */}
              <Card variant="resting" style={{ padding: 20 }}>
                <Stack gap={3}>
                  <strong>Mood breakdown</strong>
                  <Divider />
                  <Stack direction="row" gap={2} wrap>
                    {Object.entries(
                      archive.reduce((acc, e) => {
                        acc[e.mood] = (acc[e.mood] || 0) + 1
                        return acc
                      }, {})
                    ).map(([m, count]) => (
                      <Badge key={m} tone={MOOD_TONE[m]} pill>
                        {m} · {count}
                      </Badge>
                    ))}
                  </Stack>
                  {archive.length === 0 && (
                    <span className="sc-item-desc">Publish entries to see your mood patterns.</span>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Read dialog ───────────────────────────────────────────────────── */}
      <Dialog
        open={!!readingEntry}
        onClose={() => setReading(null)}
        title={readingEntry?.date ?? ''}
        actions={
          <Button variant="secondary" onClick={() => setReading(null)}>Close</Button>
        }
      >
        {readingEntry && (
          <Stack gap={3}>
            <Stack direction="row" gap={2} align="center">
              <Badge tone={MOOD_TONE[readingEntry.mood]} pill>{readingEntry.mood}</Badge>
              <span className="sc-foot-note">{readingEntry.words} words</span>
            </Stack>
            <Prose>
              {readingEntry.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: '0 0 var(--space-3)', color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
                  {para}
                </p>
              ))}
            </Prose>
          </Stack>
        )}
      </Dialog>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast.show && ReactDOM.createPortal(
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => {}} />
        </div>,
        document.body
      )}
    </div>
  )
}
