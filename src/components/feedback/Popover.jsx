import React from 'react';

/**
 * Aqus — Popover
 * Persistent floating GlassPanel anchored to a trigger. Unlike
 * Tooltip (hover-only, no interaction), Popover is click-toggled
 * and can hold any interactive content.
 */
export function Popover({
  trigger,
  children,
  placement = 'bottom',
  offset = 8,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const placements = {
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)' },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)' },
  };
  const pos = placements[placement] || placements.bottom;
  const offsetKey = placement === 'bottom' ? 'marginTop' : placement === 'top' ? 'marginBottom' : placement === 'left' ? 'marginRight' : 'marginLeft';

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>
        {trigger}
      </div>
      {open && (
        <div
          role="dialog"
          style={{
            position: 'absolute', zIndex: 100, [offsetKey]: offset,
            ...pos,
            background: 'var(--glass-surface)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            border: '1px solid var(--glass-border-light)',
            borderBottomColor: 'var(--glass-border-dark)',
            boxShadow: 'var(--shadow-glass)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            minWidth: 200,
            animation: 'agus-enter var(--dur-ui) var(--ease-spring) both',
            fontFamily: 'var(--font-ui)',
            ...style,
          }}
          {...rest}
        >
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)',
          }} />
          <div style={{ position: 'relative' }}>{children}</div>
        </div>
      )}
    </div>
  );
}
