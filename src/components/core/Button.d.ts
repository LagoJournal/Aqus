import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Default 'primary'. */
  variant?: ButtonVariant;
  /** Control size — sm/md/lg map to Aqua small/regular/large. Default 'md'. */
  size?: ButtonSize;
  /** Ambient pulsing glow for default actions in modals/alerts. */
  pulse?: boolean;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Trailing icon node. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Core" subtitle="Aqua glass pill button, four variants" viewport="700x180"
 * Pill-shaped Aqua button with inner gloss, depth shadow, and spring press feedback.
 */
export function Button(props: ButtonProps): JSX.Element;
