import React from 'react';
import { Spinner } from '../core/Spinner.jsx';

/**
 * Aqus — LoadingOverlay
 * Dimmed, blurred cover with a liquid Spinner + optional message.
 * Position it over a Card (position:relative parent) or full screen.
 */
export function LoadingOverlay({
  show = true,
  message,
  fullscreen = false,
  blur = true,
  style = {},
  ...rest
}) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: fullscreen ? 'fixed' : 'absolute', inset: 0, zIndex: 150,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
        background: 'color-mix(in oklab, var(--bg) 62%, transparent)',
        backdropFilter: blur ? 'blur(3px)' : 'none', WebkitBackdropFilter: blur ? 'blur(3px)' : 'none',
        borderRadius: fullscreen ? 0 : 'inherit',
        fontFamily: 'var(--font-ui)',
        animation: 'agus-enter var(--dur-fast) var(--ease-out) both',
        ...style,
      }}
      {...rest}
    >
      <Spinner size={36} />
      {message && <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', fontWeight: 'var(--weight-medium)' }}>{message}</span>}
    </div>
  );
}
