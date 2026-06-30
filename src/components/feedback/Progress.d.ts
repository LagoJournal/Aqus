import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100, or null for indeterminate. Default null. */
  value?: number | null;
  height?: number;
  label?: string;
  showValue?: boolean;
}

/** Accent progress bar — determinate by value, or indeterminate sweep. */
export function Progress(props: ProgressProps): JSX.Element;
