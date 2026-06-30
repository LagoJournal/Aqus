import React from 'react';

/**
 * Aqus — BlogCard
 * Article preview: accent-tinted thumbnail + title + excerpt + meta.
 * Hover lifts the card. Featured variant adds the liquid blob in the thumbnail.
 */
export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  tags = [],
  href = '#',
  featured = false,
  style = {},
  ...rest
}) {
  const { Badge, Tag } = window.AgusDesignSystem_492a6f;
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} style={{ textDecoration: 'none', display: 'block', ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'var(--transition-hover)',
        fontFamily: 'var(--font-ui)',
      }}>
        {/* Thumbnail */}
        <div style={{
          height: 160, position: 'relative', overflow: 'hidden',
          background: `radial-gradient(120% 100% at 30% 0%, var(--accent-light), transparent 60%), linear-gradient(145deg, var(--accent-mid), var(--accent))`,
        }}>
          {featured && (
            <span aria-hidden="true" style={{
              position: 'absolute', width: '70%', aspectRatio: '1 / 1', right: '-10%', bottom: '-20%',
              background: 'var(--accent-glass)',
              borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
              animation: 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite',
            }} />
          )}
          {featured && (
            <span style={{
              position: 'absolute', top: 12, left: 12,
            }}>
              <Badge tone="accent" pill>Featured</Badge>
            </span>
          )}
        </div>
        {/* Body */}
        <div style={{ padding: 'var(--space-5)' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'var(--text-h3)', color: 'var(--text)',
            margin: '0 0 var(--space-2)', lineHeight: 'var(--leading-snug)',
          }}>{title}</h3>
          {excerpt && (
            <p style={{
              fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)',
              lineHeight: 'var(--leading-relaxed)', margin: '0 0 var(--space-4)',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{excerpt}</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tags.map(t => <Badge key={t} tone="neutral">{t}</Badge>)}
            </div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', whiteSpace: 'nowrap', display: 'flex', gap: 8 }}>
              {date && <span>{date}</span>}
              {readTime && <span>· {readTime}</span>}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
