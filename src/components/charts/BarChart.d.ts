import React from 'react';

export interface ChartDatum { x: string | number; [seriesKey: string]: string | number; }
export interface ChartSeries { key: string; label: string; color?: string; }

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  series: ChartSeries[];
  height?: number;
  /** Stack series instead of grouping side-by-side. Default false. */
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  yTicks?: number;
  valueFormat?: (v: number) => React.ReactNode;
}

/**
 * @startingPoint section="Charts" subtitle="Grouped / stacked bar chart" viewport="700x300"
 * Responsive SVG bar chart with Aqua gloss on each bar; grouped or stacked.
 */
export function BarChart(props: BarChartProps): JSX.Element;
