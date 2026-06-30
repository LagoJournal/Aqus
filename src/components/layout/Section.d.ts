import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  /** Vertical padding preset. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Apply the warm horizon gradient background. Default false. */
  horizon?: boolean;
  children?: React.ReactNode;
}

/** Page section with consistent vertical padding and optional horizon gradient. */
export function Section(props: SectionProps): JSX.Element;
