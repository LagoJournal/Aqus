import React from 'react';

/**
 * Aqus — Footer
 * Page footer with link columns, the Wordmark, and copyright.
 * Flat Level-1 surface — never glass. Adapts to dark mode.
 */
export function Footer({
  columns = [],
  copyright,
  style = {},
  ...rest
}) {
  const { Wordmark } = window.AgusDesignSystem_492a6f;
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-8) var(--space-5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${columns.length}, 1fr)`, gap: 'var(--space-8)' }}>
          {/* Wordmark column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Wordmark size={22} animate={false} />
            <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', margin: 0, maxWidth: 220, lineHeight: 'var(--leading-relaxed)' }}>
              {copyright || `© ${year} Aqus. All rights reserved.`}
            </p>
          </div>
          {/* Link columns */}
          {columns.map((col, ci) => (
            <div key={ci}>
              <div style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.href || '#'} style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color var(--dur-fast) var(--ease-out)' }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
