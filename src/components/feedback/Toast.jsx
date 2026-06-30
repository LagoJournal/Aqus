import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Toast
 * Floating glass notification with a liquid-bubble status marker.
 * Springs in. Use a fixed-position stack in real apps.
 */
export function Toast({
  tone = 'accent',
  title,
  message,
  onClose,
  style = {},
  ...rest
}) {
  const dot = {
    accent: 'var(--accent)', success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)',
  }[tone] || 'var(--accent)';
  return (
    <div role="status" style={{
      display: 'flex', gap: 11, alignItems: 'flex-start', minWidth: 280, maxWidth: 380,
      padding: '13px 15px', borderRadius: 'var(--radius-md)',
      background: 'var(--glass-surface)',
      WebkitBackdropFilter: 'blur(18px) saturate(1.6)', backdropFilter: 'blur(18px) saturate(1.6)',
      border: '1px solid var(--glass-border-light)', boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-ui)', animation: 'agus-enter var(--dur-ui) var(--ease-spring)',
      ...style,
    }} {...rest}>
      <span style={{ marginTop: 3, flex: 'none' }}><LiquidBubble size={11} color={dot} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-body-sm)', color: 'var(--text)' }}>{title}</div>}
        {message && <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', marginTop: title ? 2 : 0, lineHeight: 1.5 }}>{message}</div>}
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
