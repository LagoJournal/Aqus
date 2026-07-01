import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — StatCard
 * Single metric display: label, big value, optional delta and icon.
 * Value is clamped to one line — never wraps or pushes the grid row.
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
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-xs)',
      fontFamily: 'var(--font-ui)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style,
    }} {...rest}>
      {/* top sheen */}
      <span aria-hidden="true" style={{
        position: 'absolute', insetInline: 0, top: 0,
        height: '35%', background: 'var(--gloss-card)', pointerEvents: 'none',
      }} />

      {/* label row + icon */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{
          fontSize: 'var(--text-label)',
          fontWeight: 'var(--weight-medium)',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0,
        }}>
          {label}
        </span>
        {icon && (
          <span style={{
            width: 30, height: 30, flex: 'none',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-glass)',
            color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15,
          }}>
            {icon}
          </span>
        )}
      </div>

      {/* value — single line, truncates if extreme length */}
      <span style={{
        position: 'relative',
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'var(--text-h1)',
        lineHeight: 1.1,
        color: 'var(--text)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0,
      }}>
        {value}
      </span>

      {/* delta */}
      {delta !== undefined && (
        <span style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 'var(--text-label)',
          fontWeight: 'var(--weight-semibold)',
          color: up ? 'var(--success)' : 'var(--danger)',
          whiteSpace: 'nowrap',
        }}>
          <LiquidBubble size={6} color={up ? 'var(--success)' : 'var(--danger)'} />
          {delta}
        </span>
      )}
    </div>
  );
}
