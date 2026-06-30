import React from 'react';

export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  label?: string;
}

/**
 * @startingPoint section="Forms" subtitle="Rounded checkbox with Aqua gloss" viewport="700x160"
 * Rounded-square checkbox; accent fill + white tick when checked.
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
