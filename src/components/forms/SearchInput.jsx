import React from 'react';

/**
 * Aqus — SearchInput
 * Opinionated Input for search: leading magnifier, live clear (X) when
 * filled, optional trailing result-count badge and ⌘K hint.
 */
export function SearchInput({
  value = '',
  onChange,
  placeholder = 'Search…',
  count,
  shortcut,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 34, md: 40, lg: 48 };
  const h = heights[size] || heights.md;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, height: h, padding: '0 10px 0 12px',
      borderRadius: 'var(--radius-pill)',
      border: `${focus ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${focus ? 'var(--accent)' : 'var(--border)'}`,
      background: 'var(--surface)',
      boxShadow: focus ? '0 0 0 4px var(--focus-ring)' : 'inset 0 1px 2px rgba(0,0,0,0.04)',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      fontFamily: 'var(--font-ui)', ...style,
    }}>
      <i className="ph ph-magnifying-glass" style={{ fontSize: 16, color: 'var(--text-muted)', flex: 'none' }} />
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 'var(--text-body-sm)', color: 'var(--text)', minWidth: 0 }}
        {...rest}
      />
      {value && count != null && (
        <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', whiteSpace: 'nowrap', flex: 'none' }}>{count} result{count === 1 ? '' : 's'}</span>
      )}
      {value ? (
        <button aria-label="Clear" onClick={() => onChange?.('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', display: 'inline-flex', padding: 4, flex: 'none' }}>
          <i className="ph ph-x-circle" style={{ fontSize: 16 }} />
        </button>
      ) : shortcut ? (
        <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)', color: 'var(--text-muted)', background: 'var(--surface-raised)', border: '1px solid var(--border)', borderBottomWidth: 2, borderRadius: 'var(--radius-xs)', padding: '2px 6px', flex: 'none' }}>{shortcut}</kbd>
      ) : null}
    </div>
  );
}
