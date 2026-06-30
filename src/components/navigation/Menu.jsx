import React from 'react';

/**
 * Aqus — Menu
 * Action dropdown in a Level-3 glass panel. Pass a trigger node and
 * a list of items ({label, onClick, icon?, danger?, divider?}).
 */
export function Menu({ trigger, items = [], align = 'left', style = {} }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span onClick={() => setOpen((o) => !o)} style={{ display: 'inline-flex', cursor: 'pointer' }}>{trigger}</span>
      {open && (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 6px)', [align]: 0, zIndex: 50, minWidth: 180,
          padding: 6, borderRadius: 'var(--radius-md)',
          background: 'var(--glass-surface)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.6)', backdropFilter: 'blur(18px) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', boxShadow: 'var(--shadow-md)',
          fontFamily: 'var(--font-ui)', animation: 'agus-enter var(--dur-ui) var(--ease-spring)',
        }}>
          {items.map((it, i) => it.divider ? (
            <div key={i} style={{ height: 1, background: 'var(--border)', margin: '6px 4px' }} />
          ) : (
            <button key={i} role="menuitem"
              onClick={() => { it.onClick && it.onClick(); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                padding: '8px 10px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                background: 'transparent', fontFamily: 'inherit', fontSize: 'var(--text-body-sm)',
                color: it.danger ? 'var(--danger)' : 'var(--text)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = it.danger ? 'var(--danger-light)' : 'var(--bone)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {it.icon && <span style={{ display: 'inline-flex', flex: 'none' }}>{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
