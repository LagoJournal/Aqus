import React from 'react';

/**
 * Aqus — ToggleGroup
 * A row of toggle buttons (toolbar-style). Single or multiple
 * selection. Pressed buttons fill with accent-light. Use for
 * formatting toolbars, view switches, filter toggles — NOT Switch
 * (which is for on/off settings).
 */
export function ToggleGroup({
  options = [],
  value,
  onChange,
  multiple = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const sizes = { sm: { h: 32, px: 10, fs: 13 }, md: { h: 38, px: 13, fs: 14 }, lg: { h: 46, px: 16, fs: 15 } };
  const s = sizes[size] || sizes.md;
  const isActive = (v) => multiple ? (value || []).includes(v) : value === v;

  const toggle = (v) => {
    if (multiple) {
      const set = value || [];
      onChange?.(set.includes(v) ? set.filter(x => x !== v) : [...set, v]);
    } else {
      onChange?.(v);
    }
  };

  return (
    <div role="group" style={{
      // maxWidth + flex-wrap so a long row of options wraps instead of
      // overflowing narrow (320px) viewports. `inline-flex` alone forced a
      // single non-wrapping row.
      display: 'inline-flex', flexWrap: 'wrap', maxWidth: '100%',
      padding: 3, gap: 3,
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-pill)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
      fontFamily: 'var(--font-ui)', ...style,
    }} {...rest}>
      {options.map(opt => {
        const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
        const on = isActive(o.value);
        return (
          <button key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(o.value)}
            className="agus-focusable"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: s.h, padding: `0 ${s.px}px`,
              borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer',
              background: on ? 'var(--accent)' : 'transparent',
              color: on ? 'var(--on-accent)' : 'var(--text-muted)',
              boxShadow: on ? 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
              fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-semibold)', fontSize: s.fs,
              transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
            }}>
            {o.icon && <span style={{ display: 'inline-flex', fontSize: s.fs + 3 }}>{o.icon}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
