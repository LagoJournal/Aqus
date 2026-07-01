import React from 'react';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  /** Trailing inline action (e.g. a link or small Button). Wraps below the
   * message on narrow widths by default. */
  action?: React.ReactNode;
  /** Force the action onto its own row (stacked below the message) at every
   * width. Default false — the action wraps only when space runs out. */
  stackAction?: boolean;
  /** Dismiss handler — shows an X. */
  onClose?: () => void;
  children?: React.ReactNode;
}

/** Full-width page-level announcement bar (sits above the nav). Distinct from inline Alert. */
export function Banner(props: BannerProps): JSX.Element;
