import React from 'react';

/**
 * Aqus — Prose
 * Long-form reading container. Sets measure (68ch), line-height,
 * and type styles for headings, body, links, code, and lists.
 * Use inside Section + Container for article / blog / doc views.
 */
export function Prose({ style = {}, children, ...rest }) {
  return (
    <div style={{
      maxWidth: 'var(--measure)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--text)',
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

/**
 * Convenience typed headings, paragraph and link for use inside Prose.
 * Each respects the active accent and type system.
 */
export function ProseH1({ style = {}, children, ...rest }) {
  return <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h1)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-snug)', color: 'var(--text)', margin: '0 0 var(--space-4)', ...style }} {...rest}>{children}</h1>;
}
export function ProseH2({ style = {}, children, ...rest }) {
  return <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h2)', letterSpacing: 'var(--tracking-snug)', lineHeight: 'var(--leading-snug)', color: 'var(--text)', margin: 'var(--space-7) 0 var(--space-3)', ...style }} {...rest}>{children}</h2>;
}
export function ProseH3({ style = {}, children, ...rest }) {
  return <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h3)', color: 'var(--text)', margin: 'var(--space-6) 0 var(--space-2)', ...style }} {...rest}>{children}</h3>;
}
export function ProseP({ style = {}, children, ...rest }) {
  return <p style={{ margin: '0 0 var(--space-4)', color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)', ...style }} {...rest}>{children}</p>;
}
export function ProseA({ style = {}, children, ...rest }) {
  return <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--accent-mid)', ...style }} {...rest}>{children}</a>;
}
