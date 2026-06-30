import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Max-width preset. Default 'default' (1120px). */
  size?: 'sm' | 'default' | 'lg' | 'full';
  /** Adds horizontal padding. Default true. */
  padded?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Layout" subtitle="Max-width centered page wrapper" viewport="1280x200"
 * Max-width centered page scaffold. Wrap every top-level page in this.
 */
export function Container(props: ContainerProps): JSX.Element;
