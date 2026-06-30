import React from 'react';

export interface MultiSelectOption { value: string; label: string; }

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string[];
  onChange?: (values: string[]) => void;
  options: (string | MultiSelectOption)[];
  label?: string;
  placeholder?: string;
}

/** Multi-choice select; picks render as removable chips. Glass dropdown, liquid-bubble selected markers. */
export function MultiSelect(props: MultiSelectProps): JSX.Element;
