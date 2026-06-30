import React from 'react';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  /** Edge to anchor to. Default 'right'. */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** Panel width (left/right) or height (top/bottom) in px. Default 380. */
  width?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

/** Slide-in glass panel anchored to a screen edge. Use for side content (filters, details, nav). */
export function Drawer(props: DrawerProps): JSX.Element;
