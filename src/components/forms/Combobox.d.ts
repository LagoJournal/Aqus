import React from 'react';

export interface ComboboxOption { value: string; label: string; }

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  /** Options — strings or {value,label}. */
  options: (string | ComboboxOption)[];
  label?: string;
  placeholder?: string;
}

/** Searchable single-select. Type to filter a glass dropdown; selected option gets a liquid bubble. */
export function Combobox(props: ComboboxProps): JSX.Element;
