import React from 'react';

/**
 * Aqus — Progress
 * Bone track, accent fill, rounded ends. Determinate by value, or
 * indeterminate (sweeping shimmer). Spring on complete.
 */
export function Progress({
  value = null,        // 0..100, or null for indeterminate
  height = 6,
  label,
  showValue = false,
  style = {},
  ...rest
}) {
  const indeterminate = value === null;
  const pct = indeterminate ? 40 : Math.min(100, Math.max(0, value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', ...style }} {...rest}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-label)' }}>
          <span style={{ color: 'var(--text)', fontWeight: 'var(--weight-medium)' }}>{label}</span>
          {showValue && !indeterminate && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{
        position: 'relative', height, borderRadius: 'var(--radius-pill)',
        background: 'var(--border)', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: indeterminate ? undefined : 0,
          width: `${pct}%`, borderRadius: 'var(--radius-pill)',
          background: 'var(--accent)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
          transition: indeterminate ? 'none' : 'width var(--dur-ui) var(--ease-spring)',
          animation: indeterminate ? 'agus-progress-sweep 1.4s var(--ease-inout) infinite' : 'none',
        }} />
      </div>
      <style>{`@keyframes agus-progress-sweep{0%{left:-40%}100%{left:100%}}`}</style>
    </div>
  );
}
