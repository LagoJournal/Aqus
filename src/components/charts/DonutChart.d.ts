import React from 'react';

export interface DonutDatum {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  /** Gap between segments in degrees. Default 2. */
  gap?: number;
  /** Gently morph the whole ring (liquid identity). Default true. */
  morph?: boolean;
  centerLabel?: string;
  centerValue?: React.ReactNode;
  showLegend?: boolean;
  valueFormat?: (v: number) => React.ReactNode;
}

/**
 * @startingPoint section="Charts" subtitle="Proportional donut with morphing ring" viewport="700x240"
 * Proportional donut/ring chart; the whole ring gently morphs (liquid identity), center holds a total.
 */
export function DonutChart(props: DonutChartProps): JSX.Element;
