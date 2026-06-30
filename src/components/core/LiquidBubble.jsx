import React from 'react';

/**
 * Aqus — LiquidBubble
 * The shared organic-blob primitive behind every "round" element in
 * the system (badge dots, the switch knob, the spinner, active
 * indicators). Born from the sidebar's selected-item drop. Use this
 * instead of a perfect circle so new components stay consistent.
 *
 *   filled  — solid accent (or custom) drop. Status dots, knobs, ticks.
 *   outline — morphing ring, transparent center. Empty/idle markers.
 *   spinner — morphing ring; an accent arc travels the outline (no
 *             element rotation, so it tracks the blob 1:1). Loading.
 */
export const LIQUID_BLOB = '42% 58% 63% 37% / 41% 44% 56% 59%';

export function LiquidBubble({
  size = 14,
  variant = 'filled',
  color,
  thickness,
  animate = true,
  glossy = false,
  style = {},
  ...rest
}) {
  const ring = thickness || Math.max(2, Math.round(size / 7));
  const morph = animate ? `agus-liquid var(--dur-liquid) var(--ease-inout) infinite` : 'none';
  const base = {
    display: 'inline-block',
    width: size,
    height: size,
    flex: 'none',
    borderRadius: LIQUID_BLOB,
    animation: morph,
  };

  if (variant === 'outline') {
    return (
      <span aria-hidden="true" {...rest} style={{
        ...base,
        background: 'transparent',
        boxShadow: `inset 0 0 0 ${ring}px ${color || 'var(--accent)'}`,
        ...style,
      }} />
    );
  }

  if (variant === 'spinner') {
    // Morphing blob RING (padding + ring-mask follows the blob outline
    // exactly). A rotating oversized conic-gradient child is clipped to
    // that ring — so the shape morphs in place (no element rotation) and
    // the bright arc travels the morphing outline 1:1.
    const ringMask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';
    return (
      <span role="status" aria-label="Loading" {...rest} style={{
        display: 'inline-block', width: size, height: size, flex: 'none',
        position: 'relative', overflow: 'hidden',
        boxSizing: 'border-box',
        padding: ring,
        borderRadius: LIQUID_BLOB,
        WebkitMask: ringMask,
        WebkitMaskComposite: 'xor',
        mask: ringMask,
        maskComposite: 'exclude',
        animation: animate ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none',
        ...style,
      }}>
        <span aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '160%', height: '160%',
          background: `conic-gradient(from 0deg, transparent 6%, ${color || 'var(--accent)'} 92%)`,
          animation: 'agus-spin-center 800ms linear infinite',
        }} />
      </span>
    );
  }

  // filled
  return (
    <span aria-hidden="true" {...rest} style={{
      ...base,
      background: color || 'linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))',
      boxShadow: glossy
        ? '0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.9)'
        : 'inset 0 1px 1px rgba(255,255,255,0.40)',
      ...style,
    }} />
  );
}
