import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. Default 'accent'. */
  tone?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
  /** Fully-rounded pill (use for status indicators). Default false. */
  pill?: boolean;
  /** Leading status dot. Default false. */
  dot?: boolean;
  /** Render the dot as a LiquidBubble (vs a plain circle). Default true. */
  bubble?: boolean;
  children?: React.ReactNode;
}

/** Compact status / label chip in accent-light or semantic tones. */
export function Badge(props: BadgeProps): JSX.Element;
