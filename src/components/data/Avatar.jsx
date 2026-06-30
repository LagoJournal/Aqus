import React from 'react';
import { LiquidBubble, LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Avatar
 * Image or initials. Default shape is 'bubble' (liquid blob) —
 * the identity applied to the smallest human element.
 * Optional liquid-bubble status marker.
 */
export function Avatar({
  src,
  name = '',
  size = 40,
  shape = 'bubble',          // 'bubble' | 'circle' | 'square'
  status,                    // 'online' | 'away' | 'busy' | undefined
  style = {},
  ...rest
}) {
  const initials = name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const radius = shape === 'circle'
    ? '50%'
    : shape === 'square' ? 'var(--radius-md)' : LIQUID_BLOB;
  const statusColor = { online: 'var(--success)', away: 'var(--warning)', busy: 'var(--danger)' }[status];

  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none', ...style }} {...rest}>
      <span style={{
        width: size, height: size, borderRadius: radius, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: src ? 'var(--bone)' : 'linear-gradient(140deg, var(--accent-mid), var(--accent))',
        color: 'var(--on-accent)', fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: size * 0.38, boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}>
        {src
          ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : initials}
      </span>
      {statusColor && (
        <LiquidBubble size={Math.max(9, size * 0.28)} color={statusColor} animate={false}
          style={{ position: 'absolute', right: -1, bottom: -1, boxShadow: '0 0 0 2px var(--bg)' }} />
      )}
    </span>
  );
}
