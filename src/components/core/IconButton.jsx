import React from 'react';
import { LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — IconButton
 * Standalone icon action. Shape is a liquid blob (not a circle) —
 * the organic identity applied to the smallest interactive atom.
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const [press, setPress] = React.useState(false);
  const sizes = { sm: 30, md: 38, lg: 48 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    ghost: { bg: 'transparent', hover: 'var(--accent-light)', shadow: 'none', border: 'none' },
    soft:  { bg: 'var(--surface)', hover: 'var(--accent-light)', shadow: 'var(--shadow-xs)', border: '1px solid var(--border)' },
    filled:{ bg: 'var(--accent)', hover: 'var(--accent-hover)', shadow: 'var(--shadow-sm)', border: 'none' },
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className="agus-focusable"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: dim, height: dim,
        borderRadius: LIQUID_BLOB,
        border: v.border,
        background: hover ? v.hover : v.bg,
        boxShadow: v.shadow,
        color: variant === 'filled' ? 'var(--on-accent)' : 'var(--text-muted)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        transform: press ? 'scale(0.92)' : 'scale(1)',
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
