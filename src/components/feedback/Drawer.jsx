import React from 'react';

/**
 * Aqus — Drawer
 * Slide-in panel anchored to a screen edge. Glass surface, spring
 * slide, dimmed backdrop. Sibling of Dialog — use for side content
 * (filters, details, nav) rather than centered modals.
 */
export function Drawer({
  open = false,
  onClose,
  side = 'right',
  width = 380,
  title,
  children,
  style = {},
  ...rest
}) {
  React.useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const horizontal = side === 'left' || side === 'right';
  const hidden = { left: 'translateX(-100%)', right: 'translateX(100%)', top: 'translateY(-100%)', bottom: 'translateY(100%)' }[side];

  const edge = horizontal
    ? { top: 0, bottom: 0, [side]: 0, width, height: '100%' }
    : { left: 0, right: 0, [side]: 0, height: width, width: '100%' };

  return (
    <div aria-hidden={!open} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      pointerEvents: open ? 'auto' : 'none',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.32)',
        backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
        opacity: open ? 1 : 0,
        transition: 'opacity var(--dur-ui) var(--ease-out)',
      }} />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'absolute', ...edge,
          background: 'var(--glass-surface)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          borderInline: horizontal && side === 'right' ? '1px solid var(--glass-border-light)' : undefined,
          borderRight: horizontal && side === 'left' ? '1px solid var(--glass-border-light)' : undefined,
          boxShadow: 'var(--shadow-glass)',
          transform: open ? 'none' : hidden,
          transition: 'transform var(--dur-page) var(--ease-spring)',
          display: 'flex', flexDirection: 'column',
          fontFamily: 'var(--font-ui)',
          ...style,
        }}
        {...rest}
      >
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h3)', margin: 0, color: 'var(--text)' }}>{title}</h2>
            <button aria-label="Close" onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 4 }}>
              <i className="ph ph-x" style={{ fontSize: 18 }} />
            </button>
          </div>
        )}
        <div style={{ padding: 'var(--space-5)', overflowY: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
