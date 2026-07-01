import React from 'react';

/**
 * Aqus — Input
 * Flat Level-1 text field (interior content, never glass).
 * Accent focus ring with the soft Aero glow halo.
 */
export function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)' }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)',
          color: 'var(--text)', letterSpacing: 'var(--tracking-snug)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface)',
        border: `${focus ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)',
        padding: focus ? '7px 11px' : '8px 12px',
        boxShadow: focus
          ? `0 0 0 4px ${error ? 'var(--danger-light)' : 'var(--focus-ring)'}, var(--shadow-xs)`
          : 'inset 0 1px 2px rgba(0,0,0,0.05)',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}>
        {icon && <span style={{ display: 'inline-flex', color: 'var(--text-muted)', flex: 'none' }}>{icon}</span>}
        <input
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'inherit', fontSize: 'var(--text-body-sm)', color: 'var(--text)',
            ...style,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{
          fontSize: 'var(--text-caption)',
          color: error ? 'var(--danger)' : 'var(--text-muted)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
