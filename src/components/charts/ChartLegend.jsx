import React from 'react';

/**
 * Aqus — ChartLegend
 * Shared legend row for charts. Each series swatch is a LiquidBubble
 * (the brand's round primitive), label in UI type. Horizontal or stacked.
 */
import { LiquidBubble } from '../core/LiquidBubble.jsx';

const PALETTE = ['var(--chart-1)','var(--chart-2)','var(--chart-3)','var(--chart-4)','var(--chart-5)','var(--chart-6)','var(--chart-7)','var(--chart-8)'];

export function ChartLegend({ series = [], direction = 'row', style = {}, ...rest }) {
  return (
    <div style={{
      display: 'flex', flexDirection: direction, flexWrap: 'wrap',
      gap: direction === 'row' ? 'var(--space-4)' : 'var(--space-2)',
      fontFamily: 'var(--font-ui)', ...style,
    }} {...rest}>
      {series.map((s, i) => (
        <span key={s.key ?? i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <LiquidBubble size={10} color={s.color || PALETTE[i % PALETTE.length]} animate={false} />
          <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontWeight: 'var(--weight-medium)' }}>{s.label}</span>
        </span>
      ))}
    </div>
  );
}

export const CHART_PALETTE = PALETTE;
