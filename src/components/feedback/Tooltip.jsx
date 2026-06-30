import React from 'react';
import { Portal, useAnchoredFloating, placeAround } from '../../internal/floating.jsx';

/**
 * Aqus — Tooltip
 * Hover/focus label in a small dark glass bubble. Wraps a single
 * child; positions above by default.
 */
export function Tooltip({ label, side = 'top', children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(show, () => setShow(false));
  return (
    <span
      ref={anchorRef}
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}
    >
      {children}
      {show && rect && (
        <Portal>
        <span ref={panelRef} role="tooltip" style={{
          ...placeAround(rect, side, 8, 'center'), zIndex: 200, whiteSpace: 'nowrap', pointerEvents: 'none',
          padding: '6px 10px', borderRadius: 'var(--radius-sm)',
          background: 'color-mix(in oklch, var(--ink) 88%, transparent)',
          WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)',
          color: 'var(--cream)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500,
          boxShadow: 'var(--shadow-md)', animation: 'agus-enter var(--dur-fast) var(--ease-spring)',
          ...style,
        }}>{label}</span>
        </Portal>
      )}
    </span>
  );
}
