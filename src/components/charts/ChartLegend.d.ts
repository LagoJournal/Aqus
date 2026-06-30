import React from 'react';

export interface ChartSeriesMeta {
  key?: string;
  label: string;
  /** Override color (defaults to the palette slot). */
  color?: string;
}

export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  series: ChartSeriesMeta[];
  direction?: 'row' | 'column';
}

/** Shared chart legend — LiquidBubble swatches + labels. */
export function ChartLegend(props: ChartLegendProps): JSX.Element;

/** The 8-slot categorical chart palette (CSS var references). */
export const CHART_PALETTE: string[];
