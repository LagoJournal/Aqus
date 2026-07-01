import React from 'react';

/**
 * Aqus — GlassPanel
 * Vista Aero frosted-glass chrome: blur-behind, accent tint film,
 * inner top-gloss stripe, light-catching edges. The primary
 * structural surface for nav, modals, sidebars, hero cards.
 *
 * `style` layout keys (display, flex-related, align-related,
 * justify-related, gap, grid-related) are forwarded to the inner
 * content wrapper, not just the outer shell —
 * so `<GlassPanel style={{ display: 'flex', justifyContent: 'space-between' }}>`
 * actually lays out the children, not just the glass box itself.
 */
const LAYOUT_KEYS = [
  'display', 'flexDirection', 'flexWrap', 'alignItems', 'justifyContent',
  'alignContent', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridAutoFlow', 'gridAutoColumns', 'gridAutoRows',
];

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
  const innerStyle = {};
  for (const key of LAYOUT_KEYS) {
    if (style[key] !== undefined) innerStyle[key] = style[key];
  }
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
      <div style={{ position: 'relative', ...innerStyle }}>{children}</div>
    </Tag>
  );
}
