import React from 'react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Optional result count shown when filled. */
  count?: number;
  /** Optional shortcut hint (e.g. "⌘K") shown when empty. */
  shortcut?: string;
  size?: 'sm' | 'md' | 'lg';
}

/** Pill search input: leading magnifier, live clear X, optional result count + shortcut hint. */
export function SearchInput(props: SearchInputProps): JSX.Element;
