import React from 'react';
import { LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — ProgressCircle
 * Determinate circular progress as a liquid-blob ring (ring-mask +
 * conic-gradient fill). The blob shape keeps the brand identity while
 * staying readable. Optional centered value.
 */
export function ProgressCircle({
  value = 0,
  size = 64,
  thickness = 6,
  tone = 'accent',
  showValue = true,
  morph = false,
  label,
  style = {},
  ...rest
}) {
  const color = { accent: 'var(--accent)', success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' }[tone] || 'var(--accent)';
  const pct = Math.max(0, Math.min(100, value));
  const ringMask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', flex: 'none', ...style }} {...rest}>
      <div style={{
        width: size, height: size, boxSizing: 'border-box', padding: thickness,
        borderRadius: LIQUID_BLOB,
        background: `conic-gradient(${color} ${pct}%, var(--border) 0)`,
        WebkitMask: ringMask, WebkitMaskComposite: 'xor',
        mask: ringMask, maskComposite: 'exclude',
        animation: morph ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none',
        transition: 'background var(--dur-ui) var(--ease-out)',
      }} />
      {(showValue || label) && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.1,
        }}>
          {showValue && (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: Math.round(size * 0.26), color: 'var(--text)' }}>
              {Math.round(pct)}<span style={{ fontSize: Math.round(size * 0.15) }}>%</span>
            </span>
          )}
          {label && <span style={{ fontFamily: 'var(--font-ui)', fontSize: Math.max(11, Math.round(size * 0.13)), color: 'var(--text)', marginTop: 2 }}>{label}</span>}
        </div>
      )}
    </div>
  );
}
