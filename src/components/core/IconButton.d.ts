import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'soft' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  /** Required accessible label (aria-label). */
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Core" subtitle="Standalone icon button — liquid-blob shape" viewport="700x160"
 * Standalone icon action with a liquid-blob shape (LIQUID_BLOB border-radius, not a circle).
 */
export function IconButton(props: IconButtonProps): JSX.Element;
