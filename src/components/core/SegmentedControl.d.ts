import React from 'react';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options as strings or {value,label} objects. */
  options: Array<string | SegmentOption>;
  /** Currently selected value. */
  value: string;
  /** Called with the chosen value. */
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
}

/** Aqua segmented control with a smooth sliding accent indicator. */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
