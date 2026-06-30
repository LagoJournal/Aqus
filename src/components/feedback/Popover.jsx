import React from 'react';
import { Portal, useAnchoredFloating, placeAround } from '../../internal/floating.jsx';

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
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div ref={anchorRef} onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>
        {trigger}
      </div>
      {open && rect && (
        <Portal>
        <div
          ref={panelRef}
          role="dialog"
          style={{
            ...placeAround(rect, placement, offset, 'center'), zIndex: 1000,
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
        </Portal>
      )}
    </div>
  );
}
