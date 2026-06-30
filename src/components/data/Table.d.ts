import React from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  muted?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Alternate row background. Default false. */
  striped?: boolean;
  onSort?: (key: string, dir: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
}

/**
 * Sortable data table. Active sort uses a LiquidBubble indicator;
 * idle sort uses an outline bubble. Rows highlight on hover.
 */
export function Table<T>(props: TableProps<T>): JSX.Element;
