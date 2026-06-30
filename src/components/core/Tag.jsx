import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Tag
 * Interactive chip — removable, clickable. Unlike Badge (read-only),
 * Tag has an action: an X close button rendered as a liquid bubble
 * outline that fills on hover.
 */
export function Tag({
  onRemove,
  onClick,
  tone = 'accent',
  size = 'md',
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    accent:  { bg: 'var(--accent-light)',  fg: 'var(--accent-text)',  dot: 'var(--accent)' },
    neutral: { bg: 'var(--surface)',       fg: 'var(--text-muted)',   dot: 'var(--text-muted)', border: '1px solid var(--border)' },
    success: { bg: 'var(--success-light)', fg: 'var(--success)',      dot: 'var(--success)' },
    warning: { bg: 'var(--warning-light)', fg: 'var(--warning)',      dot: 'var(--warning)' },
    danger:  { bg: 'var(--danger-light)',  fg: 'var(--danger)',       dot: 'var(--danger)' },
  };
  const t = tones[tone] || tones.accent;
  const sizes = { sm: { fontSize: 11, padding: '3px 9px', gap: 5 }, md: { fontSize: 13, padding: '5px 12px', gap: 6 } };
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onClick && !disabled ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: s.gap,
        fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-semibold)',
        fontSize: s.fontSize, lineHeight: 1,
        padding: s.padding, borderRadius: 'var(--radius-pill)',
        background: t.bg, color: t.fg, border: t.border || 'none',
        cursor: onClick && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1, userSelect: 'none',
        transition: 'background var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && !disabled && (
        <button
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'inline-flex', lineHeight: 0 }}
        >
          <LiquidBubble
            size={size === 'sm' ? 13 : 16}
            variant={hover ? 'filled' : 'outline'}
            color={hover ? t.dot : t.dot}
            thickness={1.5}
            animate={hover}
          />
        </button>
      )}
    </span>
  );
}
