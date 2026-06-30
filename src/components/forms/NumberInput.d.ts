import React from 'react';

export interface NumberInputProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  /** Unit label shown after the number (e.g. "px", "%"). */
  unit?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Integer / float stepper with liquid-blob +/− buttons; clamps to min/max. */
export function NumberInput(props: NumberInputProps): JSX.Element;
