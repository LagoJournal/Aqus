import React from 'react';

/**
 * Aqus — ContextMenu
 * Right-click menu. Wraps any child; on contextmenu it opens a glass
 * menu at the cursor. Items support icons, shortcuts, danger tone,
 * dividers. Sibling of Menu (which opens from a click trigger).
 */
export function ContextMenu({
  items = [],
  children,
  style = {},
  ...rest
}) {
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const close = () => setPos(null);
    if (pos) {
      document.addEventListener('click', close);
      document.addEventListener('scroll', close, true);
      window.addEventListener('resize', close);
    }
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  const onContext = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div onContextMenu={onContext} style={{ display: 'contents' }}>{children}</div>
      {pos && (
        <div
          role="menu"
          ref={ref}
          style={{
            position: 'fixed', top: pos.y, left: pos.x, zIndex: 300,
            minWidth: 200,
            background: 'var(--glass-surface)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            border: '1px solid var(--glass-border-light)',
            borderBottomColor: 'var(--glass-border-dark)',
            boxShadow: 'var(--shadow-glass)',
            borderRadius: 'var(--radius-md)',
            padding: 6,
            fontFamily: 'var(--font-ui)',
            animation: 'agus-enter var(--dur-fast) var(--ease-spring) both',
            ...style,
          }}
          {...rest}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={`d${i}`} style={{ height: 1, background: 'var(--border)', margin: '6px 4px' }} />
            ) : (
              <button
                key={item.id ?? item.label}
                role="menuitem"
                onClick={() => { item.onSelect?.(); setPos(null); }}
                disabled={item.disabled}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                  border: 'none', background: 'transparent', cursor: item.disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'left', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)',
                  color: item.tone === 'danger' ? 'var(--danger)' : 'var(--text)',
                  opacity: item.disabled ? 0.5 : 1,
                  transition: 'background var(--dur-micro) var(--ease-out)',
                }}
                onMouseEnter={e => !item.disabled && (e.currentTarget.style.background = item.tone === 'danger' ? 'var(--danger-light)' : 'var(--accent-light)')}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.icon && <span style={{ fontSize: 16, flex: 'none', display: 'inline-flex' }}>{item.icon}</span>}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)', color: 'var(--text-muted)' }}>{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
}
