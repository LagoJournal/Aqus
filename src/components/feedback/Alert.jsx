import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Alert
 * Inline callout. Tone-tinted surface (no accent left-bar), with a
 * liquid-bubble status marker. Title + body + optional dismiss.
 */
export function Alert({
  tone = 'accent',
  title,
  onClose,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    accent:  { bg: 'var(--accent-light)',  fg: 'var(--accent-text)',  dot: 'var(--accent)' },
    success: { bg: 'var(--success-light)', fg: 'var(--success)',      dot: 'var(--success)' },
    warning: { bg: 'var(--warning-light)', fg: 'var(--warning)',      dot: 'var(--warning)' },
    danger:  { bg: 'var(--danger-light)',  fg: 'var(--danger)',       dot: 'var(--danger)' },
  };
  const t = tones[tone] || tones.accent;
  return (
    <div role="alert" style={{
      display: 'flex', gap: 11, alignItems: 'flex-start',
      padding: '13px 15px', borderRadius: 'var(--radius-md)',
      background: t.bg, border: 'var(--border-hairline) solid color-mix(in oklch, ' + t.dot + ' 22%, transparent)',
      fontFamily: 'var(--font-ui)', ...style,
    }} {...rest}>
      <span style={{ marginTop: 3, flex: 'none' }}><LiquidBubble size={11} color={t.dot} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-body-sm)', color: 'var(--text)' }}>{title}</div>}
        {children && <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', marginTop: title ? 2 : 0, lineHeight: 1.5 }}>{children}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{
          flex: 'none', border: 'none', background: 'transparent', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: 16, lineHeight: 1, padding: 2, marginTop: -1,
        }}>×</button>
      )}
    </div>
  );
}
