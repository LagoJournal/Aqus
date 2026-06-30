import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — NotificationItem
 * A single row for a notification feed / inbox. Unread is marked with
 * a liquid bubble; supports avatar/icon, title, body, timestamp.
 */
export function NotificationItem({
  icon,
  avatar,
  title,
  body,
  time,
  unread = false,
  onClick,
  tone = 'accent',
  style = {},
  ...rest
}) {
  const toneColor = { accent: 'var(--accent)', success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' }[tone] || 'var(--accent)';
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 14px', borderRadius: 'var(--radius-sm)',
        background: hover && onClick ? 'var(--accent-light)' : unread ? 'var(--accent-glass)' : 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-fast) var(--ease-out)',
        fontFamily: 'var(--font-ui)', position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {/* Leading icon / avatar */}
      {(icon || avatar) && (
        <div style={{ flex: 'none', marginTop: 2 }}>
          {avatar || (
            <span style={{
              width: 36, height: 36, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
              background: 'var(--accent-glass)', color: toneColor,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{icon}</span>
          )}
        </div>
      )}
      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text)', fontWeight: unread ? 600 : 500 }}>{title}</div>
        {body && <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.5 }}>{body}</div>}
      </div>
      {/* Time + unread dot */}
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        {time && <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{time}</span>}
        {unread && <LiquidBubble size={9} color={toneColor} />}
      </div>
    </div>
  );
}
