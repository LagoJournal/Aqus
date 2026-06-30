import React from 'react';

export interface ChartDatum { x: string | number; [seriesKey: string]: string | number; }
export interface ChartSeries { key: string; label: string; color?: string; }

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  series: ChartSeries[];
  height?: number;
  /** Fill the area under each line. Default false. */
  area?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  yTicks?: number;
  /** Flowing smooth curves vs straight segments. Default true. */
  smooth?: boolean;
  /** Curve tension (0 = gentle, 1 = full). Default 1. */
  smoothTension?: number;
  /** Format y values / tooltip numbers. */
  valueFormat?: (v: number) => React.ReactNode;
}

/**
 * @startingPoint section="Charts" subtitle="Multi-series line / area chart" viewport="700x300"
 * Responsive SVG line/area chart: accent palette, theme-adaptive grid, glass hover tooltip.
 */
export function LineChart(props: LineChartProps): JSX.Element;
