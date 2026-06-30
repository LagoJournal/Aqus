import React from 'react';

/**
 * Agus — GlassPanel
 * Vista Aero frosted-glass chrome: blur-behind, accent tint film,
 * inner top-gloss stripe, light-catching edges. The primary
 * structural surface for nav, modals, sidebars, hero cards.
 */
export function GlassPanel({
  as: Tag = 'div',
  radius = 'lg',
  inset = false,
  style = {},
  children,
  ...rest
}) {
  const radii = {
    md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)',
    pill: 'var(--radius-pill)',
  };
  return (
    <Tag
      style={{
        position: 'relative',
        background: 'var(--glass-surface)',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
        border: 'var(--border-hairline) solid var(--glass-border-light)',
        borderBottomColor: 'var(--glass-border-dark)',
        borderRightColor: 'var(--glass-border-dark)',
        boxShadow: inset ? 'var(--shadow-glass)' : 'var(--shadow-glass)',
        borderRadius: radii[radius] || radii.lg,
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{
        content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit',
        pointerEvents: 'none',
        background:
          'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)',
      }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </Tag>
  );
}
