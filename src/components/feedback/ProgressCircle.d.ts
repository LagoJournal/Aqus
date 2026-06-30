import React from 'react';

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value?: number;
  /** Diameter in px. Default 64. */
  size?: number;
  /** Ring thickness in px. Default 6. */
  thickness?: number;
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  /** Show the centered percentage. Default true. */
  showValue?: boolean;
  /** Slow liquid morph of the ring. Default false (stable for reading). */
  morph?: boolean;
  /** Small caption below the value. */
  label?: string;
}

/** Determinate circular progress as a liquid-blob ring with optional centered value. */
export function ProgressCircle(props: ProgressCircleProps): JSX.Element;
