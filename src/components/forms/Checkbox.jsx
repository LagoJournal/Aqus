import React from 'react';

/**
 * Aqus — Checkbox
 * Rounded-square control with Aqua gloss; accent fill + white tick
 * when checked. Square stays square — see Radio for the bubble form.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const onState = checked || indeterminate;
  return (
    <label htmlFor={inputId} style={{
      display: 'inline-flex', alignItems: 'center', gap: 9, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text)',
      opacity: disabled ? 0.5 : 1, userSelect: 'none', ...style,
    }}>
      <button
        type="button" role="checkbox" id={inputId}
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        className="agus-focusable"
        style={{
          position: 'relative', width: 20, height: 20, flex: 'none', padding: 0, cursor: 'inherit',
          borderRadius: 'var(--radius-xs)',
          border: onState ? 'none' : 'var(--border-emphasis) solid var(--border)',
          background: onState ? 'var(--accent)' : 'var(--surface)',
          boxShadow: onState
            ? 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.35)'
            : 'inset 0 1px 2px rgba(0,0,0,0.06)',
          transition: 'background var(--dur-fast) var(--ease-out)',
        }}
        {...rest}
      >
        {onState && (
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--on-accent)',
          }}>
            {indeterminate ? (
              <span style={{ width: 10, height: 2.5, borderRadius: 2, background: 'currentColor' }} />
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6.2l2.2 2.3L9.5 3.5" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
