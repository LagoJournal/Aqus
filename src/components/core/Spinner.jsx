import React from 'react';
import { LiquidBubble } from './LiquidBubble.jsx';

/**
 * Aqus — Spinner
 * A morphing liquid-bubble ring; an accent arc travels the outline
 * (800ms loop). Built on LiquidBubble so loading stays on-brand.
 */
export function Spinner({ size = 20, thickness, animate = true, style = {}, ...rest }) {
  return (
    <LiquidBubble
      variant="spinner"
      size={size}
      thickness={thickness}
      animate={animate}
      style={style}
      {...rest}
    />
  );
}
