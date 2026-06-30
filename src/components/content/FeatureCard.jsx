import React from 'react';

/**
 * Aqus — FeatureCard
 * Icon + title + description. The standard marketing / landing-page
 * feature tile. Gloss top sheen; icon uses the liquid blob shape.
 */
export function FeatureCard({
  icon,
  title,
  description,
  style = {},
  children,
  ...rest
}) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-xs)', fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <span aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: '35%', background: 'var(--gloss-card)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            width: 48, height: 48, marginBottom: 'var(--space-4)',
            borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
            background: 'linear-gradient(140deg, var(--accent-mid), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--on-accent)', fontSize: 22,
            boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}>{icon}</div>
        )}
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h3)', color: 'var(--text)', margin: '0 0 var(--space-2)' }}>{title}</h3>
        {description && <p style={{ fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-muted)', margin: 0 }}>{description}</p>}
        {children}
      </div>
    </div>
  );
}
