import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation tier. Default 'resting' (L1). */
  variant?: 'resting' | 'raised' | 'featured';
  /** Lift + shadow increase on hover. Default false. */
  interactive?: boolean;
  /** Aqua top-sheen overlay. Default true. */
  gloss?: boolean;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Surfaces" subtitle="Elevation-tiered content card" viewport="700x220"
 * Content surface with elevation tiers and an Aqua top-sheen; featured variant adds accent border-top.
 */
export function Card(props: CardProps): JSX.Element;
