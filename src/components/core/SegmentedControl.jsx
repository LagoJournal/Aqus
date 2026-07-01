import React from 'react';

/**
 * Aqus — SegmentedControl
 * Aqua horizontal pill with a smooth sliding accent indicator.
 * The active segment fills; others stay ghost.
 */
export function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style = {},
  ...rest
}) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const idx = Math.max(0, items.findIndex((o) => o.value === value));
  const pad = size === 'sm' ? 3 : 4;
  const fontSize = size === 'sm' ? 'var(--text-label)' : 'var(--text-body-sm)';
  const padY = size === 'sm' ? '5px' : '7px';

  return (
    <div
      role="tablist"
      style={{
        position: 'relative',
        display: 'inline-grid',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        gap: 0,
        padding: pad,
        background: 'var(--surface)',
        border: 'var(--border-hairline) solid var(--border)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'var(--font-ui)',
        ...style,
      }}
      {...rest}
    >
      {/* sliding indicator */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: pad, bottom: pad, left: pad,
        width: `calc((100% - ${pad * 2}px) / ${items.length})`,
        transform: `translateX(${idx * 100}%)`,
        background: 'var(--accent)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.35)',
        transition: 'transform var(--dur-ui) var(--ease-out)',
        zIndex: 0,
      }} />
      {items.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(o.value)}
            style={{
              position: 'relative', zIndex: 1,
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: `${padY} 16px`,
              fontFamily: 'inherit', fontSize, fontWeight: 'var(--weight-semibold)',
              letterSpacing: 'var(--tracking-snug)',
              color: active ? 'var(--on-accent)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-out)',
              whiteSpace: 'nowrap',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
