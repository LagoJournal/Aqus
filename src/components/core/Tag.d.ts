import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Remove handler — shows a liquid bubble close button. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Makes the whole tag clickable (adds role=button). */
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  tone?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  disabled?: boolean;
  children?: React.ReactNode;
}

/** Interactive chip: removable (liquid bubble X) or clickable. Unlike Badge (read-only). */
export function Tag(props: TagProps): JSX.Element;
