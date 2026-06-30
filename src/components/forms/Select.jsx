import React from 'react';

/**
 * Aqus — Select
 * Flat Level-1 trigger; the dropdown panel is Level-3 glass.
 * Selected row marked with a small liquid bubble.
 */
import { LiquidBubble } from '../core/LiquidBubble.jsx';
import { Portal, useAnchoredFloating } from '../../internal/floating.jsx';

export function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Select…',
  label,
  disabled = false,
  id,
  style = {},
}) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const [open, setOpen] = React.useState(false);
  const inputId = id || React.useId();
  const current = items.find((o) => o.value === value);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));

  return (
    <div style={{ position: 'relative', fontFamily: 'var(--font-ui)', display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={inputId} style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>{label}</label>}
      <button
        ref={anchorRef}
        type="button" id={inputId} disabled={disabled}
        aria-haspopup="listbox" aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="agus-focusable"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          padding: '9px 12px', borderRadius: 'var(--radius-sm)',
          border: 'var(--border-hairline) solid ' + (open ? 'var(--accent)' : 'var(--border)'),
          background: 'var(--surface)', cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: open ? '0 0 0 4px var(--focus-ring)' : 'inset 0 1px 2px rgba(0,0,0,0.05)',
          fontSize: 'var(--text-body-sm)', color: current ? 'var(--text)' : 'var(--text-muted)',
          opacity: disabled ? 0.5 : 1, transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
          minWidth: 160,
        }}
      >
        {current ? current.label : placeholder}
        <span aria-hidden="true" style={{
          width: 8, height: 8, borderRight: '2px solid var(--text-muted)', borderBottom: '2px solid var(--text-muted)',
          transform: open ? 'rotate(-135deg)' : 'rotate(45deg)', transition: 'transform var(--dur-fast)',
          marginTop: open ? 4 : -2,
        }} />
      </button>
      {open && rect && (
        <Portal>
        <div ref={panelRef} role="listbox" style={{
          position: 'fixed', top: rect.bottom + 6, left: rect.left, width: rect.width, zIndex: 200,
          padding: 6, borderRadius: 'var(--radius-md)', boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.6)', backdropFilter: 'blur(18px) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', boxShadow: 'var(--shadow-md)',
          animation: 'agus-enter var(--dur-ui) var(--ease-spring)',
        }}>
          {items.map((o) => {
            const sel = o.value === value;
            return (
              <button key={o.value} type="button" role="option" aria-selected={sel}
                onClick={() => { onChange && onChange(o.value); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left',
                  padding: '8px 10px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  background: sel ? 'var(--accent-light)' : 'transparent',
                  color: sel ? 'var(--accent-text)' : 'var(--text)', fontFamily: 'inherit', fontSize: 'var(--text-body-sm)',
                  fontWeight: sel ? 600 : 400,
                }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = 'var(--surface-raised)'; }}
                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ width: 10, display: 'inline-flex' }}>{sel && <LiquidBubble size={9} />}</span>
                {o.label}
              </button>
            );
          })}
        </div>
        </Portal>
      )}
    </div>
  );
}
