import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. Default 20. */
  size?: number;
  /** Ring thickness in px. Defaults to ~size/9. */
  thickness?: number;
  /** Liquid morph alongside the spin. Default true. */
  animate?: boolean;
}

/** A morphing liquid-bubble ring with an accent arc that travels the outline 1:1 (built on LiquidBubble). */
export function Spinner(props: SpinnerProps): JSX.Element;
