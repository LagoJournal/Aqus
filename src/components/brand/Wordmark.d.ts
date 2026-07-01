import React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Prefix text before the liquid glyph. Default 'Aqu'. */
  text?: string;
  /** The letter(s) rendered inside the liquid drop. Default 's'. */
  glyph?: string;
  /** Cap height / font-size in px. Default 56. */
  size?: number;
  /** Slow liquid morph on the glyph. Default true. */
  animate?: boolean;
  /** Color of the prefix lettering. Default var(--text). */
  color?: string;
}

/**
 * @startingPoint section="Brand" subtitle="Aqus wordmark — liquid 's' identity" viewport="700x180"
 * Wordmark: `text` plus a `glyph` dissolved into a morphing liquid mark. Defaults render "Aqus"; override
 * both props to brand this component for another product.
 */
export function Wordmark(props: WordmarkProps): JSX.Element;
