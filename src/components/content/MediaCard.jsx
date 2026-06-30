import React from 'react';

/**
 * Aqus — MediaCard
 * Image-first card: full-bleed media on top, content below. Hover
 * lifts + zooms the media slightly. For galleries, product grids,
 * video/article thumbnails. (BlogCard is text-led; this is media-led.)
 */
export function MediaCard({
  media,
  mediaHeight = 180,
  title,
  subtitle,
  badge,
  overlay,
  href,
  onClick,
  style = {},
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        // Flex column + height:100% lets a grid cell stretch the card to the
        // tallest in its row; children pinned to the bottom stay aligned across
        // the row even when titles wrap to different line counts.
        display: 'flex', flexDirection: 'column', height: '100%',
        textDecoration: 'none', cursor: (href || onClick) ? 'pointer' : 'default',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'var(--transition-hover)',
        fontFamily: 'var(--font-ui)',
        ...style,
      }}
      {...rest}
    >
      {/* Media */}
      <div style={{ position: 'relative', height: mediaHeight, flex: 'none', overflow: 'hidden', background: 'linear-gradient(145deg, var(--accent-mid), var(--accent))' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: typeof media === 'string' ? `url(${media})` : undefined,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hover ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform var(--dur-page) var(--ease-out)',
        }}>
          {typeof media !== 'string' ? media : null}
        </div>
        {badge && <div style={{ position: 'absolute', top: 12, left: 12 }}>{badge}</div>}
        {overlay && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.18)' }}>{overlay}</div>
        )}
      </div>
      {/* Content — grows to fill; children pinned to the bottom edge. */}
      {(title || subtitle || children) && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-4) var(--space-5)' }}>
          {title && <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h3)', color: 'var(--text)', margin: 0, lineHeight: 'var(--leading-snug)' }}>{title}</h3>}
          {subtitle && <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 'var(--leading-normal)' }}>{subtitle}</p>}
          {children && <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)' }}>{children}</div>}
        </div>
      )}
    </Tag>
  );
}
