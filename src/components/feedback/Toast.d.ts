import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  title?: string;
  message?: string;
  onClose?: () => void;
}

/** Floating glass notification with a liquid-bubble status marker; springs in. */
export function Toast(props: ToastProps): JSX.Element;
