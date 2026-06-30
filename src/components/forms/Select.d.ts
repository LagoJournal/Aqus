import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Array<string | SelectOption>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * @startingPoint section="Forms" subtitle="Select with Aero-glass dropdown" viewport="700x260"
 * Flat trigger + Level-3 glass dropdown; selected row marked with a liquid bubble.
 */
export function Select(props: SelectProps): JSX.Element;
