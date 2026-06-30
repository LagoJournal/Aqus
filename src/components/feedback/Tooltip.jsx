import React from 'react';

/**
 * Aqus — Tooltip
 * Hover/focus label in a small dark glass bubble. Wraps a single
 * child; positions above by default.
 */
export function Tooltip({ label, side = 'top', children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
    left:   { right: '100%', top: '50%', transform: 'translate(-8px, -50%)' },
    right:  { left: '100%', top: '50%', transform: 'translate(8px, -50%)' },
  }[side];
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', zIndex: 60, ...pos, whiteSpace: 'nowrap', pointerEvents: 'none',
          padding: '6px 10px', borderRadius: 'var(--radius-sm)',
          background: 'color-mix(in oklch, var(--ink) 88%, transparent)',
          WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)',
          color: 'var(--cream)', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', fontWeight: 500,
          boxShadow: 'var(--shadow-md)', animation: 'agus-enter var(--dur-fast) var(--ease-spring)',
          ...style,
        }}>{label}</span>
      )}
    </span>
  );
}
