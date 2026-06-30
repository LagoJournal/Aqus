import React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Cap height / font-size in px. Default 56. */
  size?: number;
  /** Slow liquid morph on the "s". Default true. */
  animate?: boolean;
  /** Color of the "Aqu" lettering. Default var(--text). */
  color?: string;
}

/**
 * @startingPoint section="Brand" subtitle="Aqus wordmark — liquid 's' identity" viewport="700x180"
 * The Aqus wordmark: "Aqu" plus the distinctive "s" dissolved into the morphing liquid mark.
 */
export function Wordmark(props: WordmarkProps): JSX.Element;
