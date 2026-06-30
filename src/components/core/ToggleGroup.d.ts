import React from 'react';

export interface ToggleOption {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: (string | ToggleOption)[];
  /** Selected value (single) or values (multiple). */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  /** Allow multiple pressed at once. Default false. */
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * @startingPoint section="Core" subtitle="Toolbar toggle buttons — single or multi" viewport="700x120"
 * A row of toggle buttons (toolbar-style). Pressed = accent fill. Use for formatting/view toggles, not Switch.
 */
export function ToggleGroup(props: ToggleGroupProps): JSX.Element;
