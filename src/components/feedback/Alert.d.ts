import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Feedback" subtitle="Inline callout with liquid-bubble marker" viewport="700x140"
 * Tone-tinted inline callout with a liquid-bubble status marker (no accent left-bar).
 */
export function Alert(props: AlertProps): JSX.Element;
