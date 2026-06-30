import React from 'react';

export interface SparklineProps extends React.SVGAttributes<SVGElement> {
  /** Series of numbers. */
  data: number[];
  width?: number;
  height?: number;
  /** Stroke color. Default the accent. */
  color?: string;
  /** Soft area fill under the line. Default true. */
  area?: boolean;
  /** Dot at the latest value. Default true. */
  endDot?: boolean;
  /** Flowing smooth curve vs straight segments. Default true. */
  smooth?: boolean;
  strokeWidth?: number;
}

/** Tiny inline trend line (no axes) for table cells, StatCards, lists. */
export function Sparkline(props: SparklineProps): JSX.Element;
