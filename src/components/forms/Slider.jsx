import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Slider
 * Bone track, accent fill, and a glossy LiquidBubble thumb.
 * Controlled value in [min, max].
 */
export function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  label,
  showValue = false,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  const setFromClientX = (clientX) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    let p = (clientX - r.left) / r.width;
    p = Math.min(1, Math.max(0, p));
    let v = min + p * (max - min);
    v = Math.round(v / step) * step;
    onChange && onChange(Math.min(max, Math.max(min, v)));
  };
  const onDown = (e) => {
    if (disabled) return;
    setFromClientX(e.clientX);
    const move = (ev) => setFromClientX(ev.clientX);
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-ui)', opacity: disabled ? 0.5 : 1, ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-label)', color: 'var(--text)' }}>
          <span style={{ fontWeight: 'var(--weight-medium)' }}>{label}</span>
          {showValue && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{value}</span>}
        </div>
      )}
      <div
        ref={ref}
        role="slider" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
        onMouseDown={onDown}
        style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer' }}
        {...rest}
      >
        {/* track */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--border)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)' }} />
        {/* fill */}
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--accent)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }} />
        {/* thumb */}
        <LiquidBubble
          size={20}
          color="linear-gradient(to bottom, #fff, #ECECEC)"
          glossy
          animate={false}
          style={{ position: 'absolute', left: `calc(${pct}% - 10px)`, boxShadow: '0 2px 5px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.9)' }}
        />
      </div>
    </div>
  );
}
