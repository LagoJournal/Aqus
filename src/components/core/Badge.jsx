import React from 'react';
import { LiquidBubble } from './LiquidBubble.jsx';

/**
 * Aqus — Badge
 * Compact status / label chip. Accent-light fill by default;
 * tone swaps to semantic families; pill variant for statuses.
 * The status dot is a LiquidBubble (set bubble={false} for a circle).
 */
export function Badge({
  tone = 'accent',
  pill = false,
  dot = false,
  bubble = true,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    accent:  { bg: 'var(--accent-light)',  fg: 'var(--accent-text)',  dot: 'var(--accent)' },
    neutral: { bg: 'var(--surface)',       fg: 'var(--text-muted)',   dot: 'var(--text-muted)' },
    success: { bg: 'var(--success-light)', fg: 'var(--success)',      dot: 'var(--success)' },
    warning: { bg: 'var(--warning-light)', fg: 'var(--warning)',      dot: 'var(--warning)' },
    danger:  { bg: 'var(--danger-light)',  fg: 'var(--danger)',       dot: 'var(--danger)' },
  };
  const t = tones[tone] || tones.accent;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-ui)',
        fontWeight: 'var(--weight-semibold)',
        fontSize: 'var(--text-caption)',
        letterSpacing: 'var(--tracking-wide)',
        lineHeight: 1,
        padding: '4px 10px',
        color: t.fg,
        background: t.bg,
        borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-xs)',
        border: tone === 'neutral' ? 'var(--border-hairline) solid var(--border)' : 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && (bubble
        ? <LiquidBubble size={8} color={t.dot} />
        : <span style={{
            width: 6, height: 6, borderRadius: '50%', background: t.dot, flex: 'none',
          }} />
      )}
      {children}
    </span>
  );
}
