import React from 'react';

export interface LiquidBubbleProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. Default 14. */
  size?: number;
  /** filled (solid drop) · outline (ring) · spinner (rotating arc). Default 'filled'. */
  variant?: 'filled' | 'outline' | 'spinner';
  /** Override fill/stroke (any CSS color or gradient). Defaults to the accent. */
  color?: string;
  /** Ring width for outline/spinner, px. Defaults to ~size/7. */
  thickness?: number;
  /** Slow liquid morph. Default true. */
  animate?: boolean;
  /** Glossy white highlight (for knobs/ticks). Default false. */
  glossy?: boolean;
}

/**
 * @startingPoint section="Core" subtitle="Liquid-blob primitive — the system's round element" viewport="700x200"
 * The shared organic-blob shape behind every round element (dots, knobs, spinner). Use instead of a circle.
 */
export function LiquidBubble(props: LiquidBubbleProps): JSX.Element;

/** The canonical liquid border-radius string, for building bespoke bubble surfaces. */
export const LIQUID_BLOB: string;
