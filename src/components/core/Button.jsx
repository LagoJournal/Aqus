import React from 'react';

/**
 * Aqus — Button
 * Aqua glass pill with inner top-gloss, two-shadow depth, and
 * physics-based press feedback. One accent per surface.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  pulse = false,
  icon = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { padding: '7px 16px', font: 'var(--text-label)', height: 32, gap: 6 },
    md: { padding: '10px 22px', font: 'var(--text-body-sm)', height: 40, gap: 8 },
    lg: { padding: '14px 30px', font: 'var(--text-body)', height: 50, gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: s.font,
    letterSpacing: 'var(--tracking-snug)',
    lineHeight: 1,
    padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    transition: 'var(--transition-hover), background var(--dur-fast) var(--ease-out)',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
    animation: pulse && !disabled ? 'agus-pulse 2s var(--ease-inout) infinite' : 'none',
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.35)',
    },
    secondary: {
      background: 'var(--surface)',
      color: 'var(--accent-text)',
      border: 'var(--border-emphasis) solid var(--accent)',
      boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.5)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--accent-text)',
      boxShadow: 'none',
    },
    destructive: {
      background: 'var(--danger)',
      color: 'var(--on-accent)',
      boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.30)',
    },
  };

  const glossy = variant === 'primary' || variant === 'destructive';

  const press = (e, scale) => { if (!disabled) e.currentTarget.style.transform = `scale(${scale})`; };

  return (
    <button
      type={type}
      disabled={disabled}
      className="agus-focusable"
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => press(e, size === 'lg' ? 0.97 : 0.96)}
      onMouseUp={(e) => press(e, 1)}
      onMouseLeave={(e) => { press(e, 1); }}
      {...rest}
    >
      {glossy && (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: 'var(--gloss-button)', pointerEvents: 'none', zIndex: -1,
        }} />
      )}
      {icon && <span style={{ display: 'inline-flex', flex: 'none' }}>{icon}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', flex: 'none' }}>{iconRight}</span>}
    </button>
  );
}
