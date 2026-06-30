import React from 'react';
import { LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — ColorPicker
 * Curated accent-swatch picker (per the "one accent per surface"
 * rule — a small set of options, not a freeform wheel). Each swatch
 * is a liquid blob; the selected one gets a glow ring.
 */
export function ColorPicker({
  value,
  onChange,
  options = [],
  label,
  size = 32,
  style = {},
  ...rest
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-ui)', ...style }} {...rest}>
      {label && <label style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>{label}</label>}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {options.map((opt) => {
          const color = typeof opt === 'string' ? opt : opt.color;
          const name = typeof opt === 'string' ? opt : opt.name;
          const active = value === color;
          return (
            <button
              key={color}
              type="button"
              aria-label={name || color}
              aria-pressed={active}
              title={name || color}
              onClick={() => onChange?.(color)}
              style={{
                width: size, height: size, flex: 'none',
                borderRadius: LIQUID_BLOB,
                background: color,
                border: 'none', cursor: 'pointer', padding: 0,
                boxShadow: active
                  ? `0 0 0 2px var(--bg), 0 0 0 4px ${color}, 0 4px 12px ${color}`
                  : 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.15)',
                transition: 'box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
                transform: active ? 'scale(1.08)' : 'scale(1)',
                animation: active ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
