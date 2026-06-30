import React from 'react';

export interface MonogramProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. Default 120. */
  size?: number;
  /** Glyph carried by the drop. Default 'A'. */
  letter?: string;
  /** Slow liquid morph. Set false for favicon/print. Default true. */
  animate?: boolean;
}

/**
 * @startingPoint section="Brand" subtitle="Liquid Drop monogram — morphing aqua mark" viewport="700x230"
 * The Aqus brand mark: a morphing liquid drop carrying the "A", tinted by the active accent.
 */
export function Monogram(props: MonogramProps): JSX.Element;
