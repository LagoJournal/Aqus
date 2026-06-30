import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';
import { Portal, useAnchoredFloating } from '../../internal/floating.jsx';

/**
 * Aqus — MultiSelect
 * Pick several options; choices render as removable Tag chips inside
 * the field. Glass dropdown with liquid-bubble markers on selected rows.
 */
export function MultiSelect({
  value = [],
  onChange,
  options = [],
  label,
  placeholder = 'Select…',
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));

  const norm = (o) => typeof o === 'string' ? { value: o, label: o } : o;
  const opts = options.map(norm);
  const toggle = (v) => onChange?.(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', position: 'relative', minWidth: 240, ...style }} {...rest}>
      {label && <label style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>{label}</label>}
      <div
        ref={anchorRef}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', minHeight: 40, padding: '5px 10px',
          borderRadius: 'var(--radius-sm)',
          border: `${open ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          background: 'var(--surface)',
          boxShadow: open ? '0 0 0 4px var(--focus-ring)' : 'inset 0 1px 2px rgba(0,0,0,0.04)',
          cursor: 'pointer', transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        {value.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-body-sm)' }}>{placeholder}</span>}
        {value.map(v => {
          const o = opts.find(x => x.value === v);
          return (
            <span key={v} onClick={e => { e.stopPropagation(); toggle(v); }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px',
              borderRadius: 'var(--radius-pill)', background: 'var(--accent-light)', color: 'var(--accent-text)',
              fontSize: 'var(--text-caption)', fontWeight: 600,
            }}>
              {o?.label || v}
              <i className="ph ph-x" style={{ fontSize: 11 }} />
            </span>
          );
        })}
        <i className="ph ph-caret-down" style={{ fontSize: 14, color: 'var(--text-muted)', marginLeft: 'auto', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-fast)' }} />
      </div>

      {open && rect && (
        <Portal>
        <div ref={panelRef} style={{
          position: 'fixed', top: rect.bottom + 6, left: rect.left, width: rect.width, zIndex: 1000, boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
          boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
          padding: 6, maxHeight: 240, overflowY: 'auto',
          animation: 'agus-enter var(--dur-fast) var(--ease-spring) both',
        }}>
          {opts.map(o => {
            const sel = value.includes(o.value);
            return (
              <button key={o.value} onClick={() => toggle(o.value)} style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: sel ? 'var(--accent-light)' : 'transparent',
                color: sel ? 'var(--accent-text)' : 'var(--text)',
                fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: sel ? 600 : 400,
              }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = 'var(--accent-light)'; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent'; }}>
                {sel ? <LiquidBubble size={8} /> : <span style={{ width: 8, height: 8, borderRadius: '50%', boxShadow: 'inset 0 0 0 1.5px var(--border)', flex: 'none' }} />}
                <span style={{ flex: 1 }}>{o.label}</span>
              </button>
            );
          })}
        </div>
        </Portal>
      )}
    </div>
  );
}
