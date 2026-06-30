import React from 'react';

/**
 * Aqus — EmptyState
 * Zero-data placeholder. A large liquid blob fills the background —
 * the brand's organic texture applied to the most visible blank slate.
 * Title + description + optional action button.
 */
export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
  icon,
  style = {},
  ...rest
}) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 'var(--space-8) var(--space-6)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {/* Large morphing blob in the background */}
      <span aria-hidden="true" style={{
        position: 'absolute', width: '60%', aspectRatio: '1 / 1',
        background: 'linear-gradient(140deg, var(--accent-mid), var(--accent-glass))',
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        animation: 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite',
        filter: 'blur(40px)', opacity: 0.45, pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
        {icon && (
          <span style={{
            fontSize: 40, color: 'var(--accent)', opacity: 0.7,
            display: 'inline-flex', marginBottom: 'var(--space-1)',
          }}>{icon}</span>
        )}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'var(--text-h3)', color: 'var(--text)', margin: 0,
        }}>{title}</h3>
        {description && (
          <p style={{
            fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)',
            lineHeight: 'var(--leading-relaxed)', margin: 0, maxWidth: 340,
          }}>{description}</p>
        )}
        {action && <div style={{ marginTop: 'var(--space-1)' }}>{action}</div>}
      </div>
    </div>
  );
}
