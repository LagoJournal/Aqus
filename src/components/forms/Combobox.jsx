import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';
import { Portal, useAnchoredFloating, Z_FLOATING } from '../../internal/floating.jsx';

/**
 * Aqus — Combobox
 * Searchable single-select. Type to filter a dropdown; the selected
 * option gets a liquid-bubble marker. Glass dropdown panel.
 */
export function Combobox({
  value,
  onChange,
  options = [],
  label,
  placeholder = 'Search…',
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));

  const norm = (o) => typeof o === 'string' ? { value: o, label: o } : o;
  const opts = options.map(norm);
  const selected = opts.find(o => o.value === value);
  const filtered = opts.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  const choose = (o) => { onChange?.(o.value); setOpen(false); setQuery(''); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter' && open && filtered[active]) { e.preventDefault(); choose(filtered[active]); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', position: 'relative', minWidth: 220, ...style }} {...rest}>
      {label && <label style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>{label}</label>}
      <div
        ref={anchorRef}
        onClick={() => setOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
          borderRadius: 'var(--radius-sm)',
          border: `${open ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          background: 'var(--surface)',
          boxShadow: open ? '0 0 0 4px var(--focus-ring)' : 'inset 0 1px 2px rgba(0,0,0,0.04)',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          cursor: 'text',
        }}
      >
        <i className="ph ph-magnifying-glass" style={{ fontSize: 16, color: 'var(--text-muted)', flex: 'none' }} />
        <input
          value={open ? query : (selected?.label || '')}
          placeholder={selected ? selected.label : placeholder}
          onChange={e => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 'var(--text-body-sm)', color: 'var(--text)', minWidth: 0 }}
        />
        <i className="ph ph-caret-down" style={{ fontSize: 14, color: 'var(--text-muted)', flex: 'none', transition: 'transform var(--dur-fast)', transform: open ? 'rotate(180deg)' : 'none' }} />
      </div>

      {open && rect && (
        <Portal>
        <div ref={panelRef} style={{
          position: 'fixed', top: rect.bottom + 6, left: rect.left, width: rect.width, zIndex: Z_FLOATING, boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
          boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
          padding: 6, maxHeight: 240, overflowY: 'auto',
          animation: 'agus-enter var(--dur-fast) var(--ease-spring) both',
        }}>
          {filtered.length === 0 && <div style={{ padding: '10px 12px', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>No matches</div>}
          {filtered.map((o, i) => {
            const isSel = o.value === value;
            const isActive = i === active;
            return (
              <button key={o.value}
                onClick={() => choose(o)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: isActive ? 'var(--accent-light)' : 'transparent',
                  color: isSel || isActive ? 'var(--accent-text)' : 'var(--text)',
                  fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: isSel ? 600 : 400,
                }}>
                {isSel ? <LiquidBubble size={8} /> : <span style={{ width: 8, flex: 'none' }} />}
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
