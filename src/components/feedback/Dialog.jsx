import React from 'react';

/**
 * Aqus — Dialog
 * Modal with a blurred backdrop and a glass panel. The default
 * action button can pulse (pass it in `actions`). Closes on
 * backdrop click / Escape.
 */
export function Dialog({
  open = false,
  onClose,
  title,
  children,
  actions = null,
  width = 440,
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: 'rgba(20,28,42,0.32)',
        WebkitBackdropFilter: 'blur(6px)', backdropFilter: 'blur(6px)',
        animation: 'agus-enter var(--dur-fast) var(--ease-out)',
      }}
    >
      <div role="dialog" aria-modal="true" style={{
        position: 'relative', width, maxWidth: '100%',
        background: 'var(--glass-surface)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.6)', backdropFilter: 'blur(22px) saturate(1.6)',
        border: '1px solid var(--glass-border-light)', borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)', padding: 'var(--space-5)', fontFamily: 'var(--font-ui)',
        animation: 'agus-enter var(--dur-ui) var(--ease-spring)',
      }}>
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, transparent 42%), var(--accent-glass)',
        }} />
        <div style={{ position: 'relative' }}>
          {title && <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h3)', margin: '0 0 8px', color: 'var(--text)' }}>{title}</h2>}
          {children && <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>{children}</div>}
          {actions && <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}
