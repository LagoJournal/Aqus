import React from 'react';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page (1-indexed). Default 1. */
  page?: number;
  /** Total page count. */
  total?: number;
  onChange?: (page: number) => void;
  /** Sibling pages shown either side of current. Default 1. */
  siblings?: number;
}

/**
 * Page controls. Active page = filled liquid-blob button (not a circle).
 * Prev/next = ghost blob buttons. Ellipsis for large ranges.
 */
export function Pagination(props: PaginationProps): JSX.Element;
