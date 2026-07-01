import React from 'react';

/**
 * Aqus — Card
 * Elevation-tiered content surface with optional Aqua top-sheen.
 * Resting (L1) → Interactive hover lift (L2) → Featured glass (L3).
 */
export function Card({
  variant = 'resting',
  interactive = false,
  gloss = true,
  style = {},
  children,
  ...rest
}) {
  const variants = {
    resting: {
      background: 'var(--surface)',
      boxShadow: 'var(--shadow-xs)',
      border: 'var(--border-hairline) solid var(--border)',
    },
    raised: {
      background: 'var(--surface-raised)',
      boxShadow: 'var(--shadow-sm)',
      border: 'var(--border-hairline) solid var(--border)',
    },
    featured: {
      background: 'var(--accent-glass)',
      boxShadow: 'var(--shadow-md), 0 10px 30px var(--accent-glow)',
      border: 'var(--border-hairline) solid var(--accent-mid)',
    },
  };

  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-5)',
        transition: 'var(--transition-hover)',
        transform: lift ? 'translateY(-2px)' : undefined,
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        ...variants[variant],
        ...(lift ? { boxShadow: 'var(--shadow-md)' } : null),
        ...style,
      }}
      {...rest}
    >
      {variant === 'featured' && (
        <span aria-hidden="true" style={{
          position: 'absolute', width: '54%', aspectRatio: '1 / 1', right: -42, top: -52,
          background: 'var(--accent-glass)',
          borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
          animation: 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite',
          pointerEvents: 'none',
        }} />
      )}
      {gloss && (
        <span aria-hidden="true" style={{
          position: 'absolute', insetInline: 0, top: 0, height: '35%',
          background: 'var(--gloss-card)', pointerEvents: 'none', borderRadius: 'inherit',
        }} />
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
