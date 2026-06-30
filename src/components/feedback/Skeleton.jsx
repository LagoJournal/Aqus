import React from 'react';
import { LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Skeleton
 * Bone-tinted placeholder with a left-to-right shimmer sweep.
 * When circle=true, uses the liquid-blob shape — not a perfect circle.
 * Compose several to stand in for loading content.
 */
export function Skeleton({
  width = '100%',
  height = 14,
  radius = 'var(--radius-sm)',
  circle = false,
  style = {},
  ...rest
}) {
  const dim = circle ? (typeof width === 'number' ? width : height) : undefined
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: circle ? dim : width,
        height: circle ? dim : height,
        borderRadius: circle ? LIQUID_BLOB : radius,
        background: 'linear-gradient(100deg, var(--skeleton-base) 30%, var(--skeleton-shine) 50%, var(--skeleton-base) 70%)',
        backgroundSize: '320% 100%',
        animation: 'agus-shimmer 1.4s linear infinite',
        ...style,
      }}
      {...rest}
    />
  );
}
