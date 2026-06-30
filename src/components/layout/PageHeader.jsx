import React from 'react';

/**
 * Aqus — PageHeader
 * Page-level title, subtitle and optional action slot.
 * Sits at the top of a main content area (inside Container).
 */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  action,
  style = {},
  ...rest
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 'var(--space-5)', flexWrap: 'wrap',
      paddingBottom: 'var(--space-5)',
      borderBottom: '1px solid var(--border)',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <div>
        {eyebrow && (
          <div style={{
            fontSize: 'var(--text-label)', fontWeight: 'var(--weight-semibold)',
            letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 'var(--space-2)',
          }}>{eyebrow}</div>
        )}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-snug)',
          color: 'var(--text)', margin: 0, lineHeight: 'var(--leading-snug)',
        }}>{title}</h1>
        {subtitle && (
          <p style={{
            fontSize: 'var(--text-body)', color: 'var(--text-muted)',
            margin: 'var(--space-2) 0 0', lineHeight: 'var(--leading-normal)',
          }}>{subtitle}</p>
        )}
      </div>
      {action && <div style={{ flex: 'none' }}>{action}</div>}
    </div>
  );
}
