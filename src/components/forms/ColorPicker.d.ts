import React from 'react';

export interface ColorOption { color: string; name?: string; }

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (color: string) => void;
  /** Curated colors — hex strings or {color, name} objects. */
  options: (string | ColorOption)[];
  label?: string;
  /** Swatch diameter in px. Default 32. */
  size?: number;
}

/**
 * @startingPoint section="Forms" subtitle="Curated accent-swatch picker — liquid blobs" viewport="700x120"
 * Curated color-swatch picker (liquid-blob swatches). Selected swatch morphs + gets a glow ring.
 */
export function ColorPicker(props: ColorPickerProps): JSX.Element;
