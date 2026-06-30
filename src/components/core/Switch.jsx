import React from 'react';
import { LiquidBubble } from './LiquidBubble.jsx';

/**
 * Aqus — Switch
 * Pill toggle. Active = accent fill with a glossy liquid-bubble knob.
 * Spring slide, 200ms. Set bubble={false} for a plain circular knob.
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  bubble = true,
  id,
  style = {},
  ...rest
}) {
  const dims = size === 'sm'
    ? { w: 36, h: 20, knob: 14, pad: 3 }
    : { w: 46, h: 26, knob: 20, pad: 3 };
  const inputId = id || React.useId();
  const x = checked ? dims.w - dims.knob - dims.pad * 2 : 0;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={inputId}
      disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      className="agus-focusable"
      style={{
        position: 'relative',
        width: dims.w, height: dims.h,
        flex: 'none',
        padding: dims.pad,
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: checked ? 'var(--accent)' : 'var(--border)',
        boxShadow: checked
          ? 'inset 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.30)'
          : 'inset 0 1px 3px rgba(0,0,0,0.18)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background var(--dur-ui) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {bubble ? (
        <LiquidBubble
          size={dims.knob}
          color="linear-gradient(to bottom, #fff, #ECECEC)"
          glossy
          style={{
            position: 'absolute', top: dims.pad, left: dims.pad,
            transform: `translateX(${x}px)`,
            transition: 'transform var(--dur-ui) var(--ease-spring)',
          }}
        />
      ) : (
        <span aria-hidden="true" style={{
          position: 'absolute', top: dims.pad, left: dims.pad,
          width: dims.knob, height: dims.knob,
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, #fff, #ECECEC)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.9)',
          transform: `translateX(${x}px)`,
          transition: 'transform var(--dur-ui) var(--ease-spring)',
        }} />
      )}
    </button>
  );
}
