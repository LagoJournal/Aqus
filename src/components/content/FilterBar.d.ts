import React from 'react';

export interface FilterItem {
  id?: string | number;
  label: string;
  tone?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterItem[];
  onRemove?: (filter: FilterItem) => void;
  onClear?: () => void;
}

/** Active filter chip row — Tag chips with liquid-bubble remove + clear-all. Sits above Table/grid. */
export function FilterBar(props: FilterBarProps): JSX.Element;
