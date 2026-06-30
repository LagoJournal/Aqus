import React from 'react';

export interface TooltipProps {
  label: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** Hover/focus label in a small dark glass bubble; wraps a single child. */
export function Tooltip(props: TooltipProps): JSX.Element;
