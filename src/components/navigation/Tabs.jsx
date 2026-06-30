import React from 'react';

/**
 * Aqus — Tabs
 * Underline tabs with a sliding accent indicator (rounded pill bar).
 * For 2–4 compact, mutually-exclusive views prefer SegmentedControl.
 */
export function Tabs({ tabs = [], value, onChange, style = {}, ...rest }) {
  const items = tabs.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));
  const refs = React.useRef({});
  const [ind, setInd] = React.useState({ left: 0, width: 0 });

  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, tabs]);

  return (
    <div role="tablist" style={{
      position: 'relative', display: 'flex', gap: 4,
      borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-ui)', ...style,
    }} {...rest}>
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button key={t.value} role="tab" aria-selected={active}
            ref={(el) => { refs.current[t.value] = el; }}
            onClick={() => onChange && onChange(t.value)}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '10px 14px', fontFamily: 'inherit', fontSize: 'var(--text-body-sm)',
              fontWeight: active ? 600 : 500, color: active ? 'var(--accent-text)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-out)', whiteSpace: 'nowrap',
            }}>
            {t.label}
          </button>
        );
      })}
      <span aria-hidden="true" style={{
        position: 'absolute', bottom: -1, height: 3, borderRadius: 'var(--radius-pill)',
        background: 'var(--accent)', left: ind.left, width: ind.width,
        transition: 'left var(--dur-ui) var(--ease-out), width var(--dur-ui) var(--ease-out)',
      }} />
    </div>
  );
}
