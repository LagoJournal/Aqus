import React from 'react';
import { LiquidBubble, LIQUID_BLOB } from '../core/LiquidBubble.jsx';
import { Portal, useAnchoredFloating } from '../../internal/floating.jsx';

/**
 * Aqus — DatePicker
 * Calendar grid in a glass popover. The selected day is a filled
 * liquid blob; today is an outline bubble. Month navigation via
 * blob icon buttons.
 */
export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select a date',
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => value ? new Date(value) : new Date());
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));

  const today = new Date(); today.setHours(0,0,0,0);
  const sel = value ? new Date(value) : null;
  const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

  const year = view.getFullYear(), month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = view.toLocaleString('default', { month: 'long', year: 'numeric' });
  const fmt = (d) => d.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const navIcon = (dir) => (
    <button aria-label={dir < 0 ? 'Previous month' : 'Next month'}
      onClick={() => setView(new Date(year, month + dir, 1))}
      style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: LIQUID_BLOB, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <i className={`ph ph-caret-${dir < 0 ? 'left' : 'right'}`} style={{ fontSize: 15 }} />
    </button>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', position: 'relative', ...style }} {...rest}>
      {label && <label style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>{label}</label>}
      <button ref={anchorRef} onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 10, minWidth: 200,
        padding: '0 12px', height: 40, borderRadius: 'var(--radius-sm)',
        border: `${open ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${open ? 'var(--accent)' : 'var(--border)'}`,
        background: 'var(--surface)', cursor: 'pointer',
        boxShadow: open ? '0 0 0 4px var(--focus-ring)' : 'inset 0 1px 2px rgba(0,0,0,0.04)',
        fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)',
        color: sel ? 'var(--text)' : 'var(--text-muted)',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}>
        <i className="ph ph-calendar-blank" style={{ fontSize: 16, color: 'var(--text-muted)' }} />
        <span style={{ flex: 1, textAlign: 'left' }}>{sel ? fmt(sel) : placeholder}</span>
      </button>

      {open && rect && (
        <Portal>
        <div ref={panelRef} style={{
          position: 'fixed', top: rect.bottom + 8, left: rect.left, zIndex: 1000,
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
          boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
          padding: 14, width: 280,
          animation: 'agus-enter var(--dur-ui) var(--ease-spring) both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            {navIcon(-1)}
            <span style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-body-sm)', color: 'var(--text)' }}>{monthName}</span>
            {navIcon(1)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 'var(--text-mini)', fontWeight: 600, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>
            ))}
            {cells.map((date, i) => {
              if (!date) return <div key={`e${i}`} />;
              const isSel = sameDay(date, sel);
              const isToday = sameDay(date, today);
              return (
                <button key={i}
                  onClick={() => { onChange?.(date); setOpen(false); }}
                  style={{
                    position: 'relative', aspectRatio: '1 / 1', border: 'none', cursor: 'pointer',
                    borderRadius: LIQUID_BLOB,
                    background: isSel ? 'linear-gradient(140deg, var(--accent-mid), var(--accent))' : 'transparent',
                    color: isSel ? 'var(--on-accent)' : 'var(--text)',
                    fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: isSel || isToday ? 600 : 400,
                    boxShadow: !isSel && isToday ? 'inset 0 0 0 1.5px var(--accent)' : 'none',
                    transition: 'background var(--dur-micro) var(--ease-out)',
                  }}
                  onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'var(--accent-light)'; }}
                  onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
        </Portal>
      )}
    </div>
  );
}
