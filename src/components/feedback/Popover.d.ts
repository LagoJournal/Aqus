import React from 'react';

export interface PopoverProps {
  /** The element that triggers the popover on click. */
  trigger: React.ReactNode;
  children?: React.ReactNode;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  /** Gap between trigger and panel in px. Default 8. */
  offset?: number;
  style?: React.CSSProperties;
}

/**
 * Click-toggled floating glass panel. Unlike Tooltip (hover/no interaction),
 * Popover holds any interactive content (forms, menus, pickers).
 */
export function Popover(props: PopoverProps): JSX.Element;
