import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — StatCard
 * Single metric display: big number + label + optional delta.
 * The standard dashboard KPI tile.
 */
export function StatCard({
  label,
  value,
  delta,
  up,
  icon,
  style = {},
  ...rest
}) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-xs)',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {/* top sheen */}
      <span aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: '35%', background: 'var(--gloss-card)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-display-lg)', lineHeight: 1, color: 'var(--text)' }}>{value}</span>
            {delta !== undefined && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-label)', fontWeight: 'var(--weight-semibold)', color: up ? 'var(--success)' : 'var(--danger)' }}>
                <LiquidBubble size={7} color={up ? 'var(--success)' : 'var(--danger)'} />
                {delta}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-glass)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flex: 'none',
          }}>{icon}</div>
        )}
      </div>
    </div>
  );
}
