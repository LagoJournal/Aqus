import React from 'react';

/**
 * Aqus — Textarea
 * Flat Level-1 multi-line field. Accent focus ring + soft glow halo,
 * matching Input.
 */
export function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
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
          fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)',
        }}>{label}</label>
      )}
      <textarea
        id={inputId} rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          resize: 'vertical', minHeight: 72,
          background: 'var(--surface)',
          border: `${focus ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)', padding: focus ? '9px 11px' : '10px 12px',
          boxShadow: focus
            ? `0 0 0 4px ${error ? 'var(--danger-light)' : 'var(--focus-ring)'}, var(--shadow-xs)`
            : 'inset 0 1px 2px rgba(0,0,0,0.05)',
          fontFamily: 'inherit', fontSize: 'var(--text-body-sm)', color: 'var(--text)',
          lineHeight: 1.5, outline: 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-caption)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
