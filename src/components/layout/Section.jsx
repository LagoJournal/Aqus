import React from 'react';

/**
 * Aqus — Section
 * Vertical page section with consistent top/bottom padding.
 * Optional liquid horizon background for hero-adjacent sections.
 */
export function Section({
  as: Tag = 'section',
  size = 'md',
  horizon = false,
  style = {},
  children,
  ...rest
}) {
  const pads = { sm: 'var(--space-7) 0', md: 'var(--space-8) 0', lg: 'var(--space-10) 0' };
  return (
    <Tag style={{
      position: 'relative',
      padding: pads[size] ?? pads.md,
      background: horizon
        ? 'radial-gradient(140% 90% at 50% 0%, var(--accent-light), transparent 55%), linear-gradient(to bottom, var(--surface-raised), var(--bg))'
        : undefined,
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
}
