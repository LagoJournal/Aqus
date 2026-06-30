import React from 'react';

export interface DescriptionItem {
  id?: string | number;
  term: React.ReactNode;
  value: React.ReactNode;
}

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  /** Column count. Default 1. */
  columns?: number;
}

/** Structured key → value pairs (term/value) for profiles, settings, details panels. */
export function DescriptionList(props: DescriptionListProps): JSX.Element;
