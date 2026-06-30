import React from 'react';

export interface MenuItem {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  divider?: boolean;
}
export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  style?: React.CSSProperties;
}

/** Action dropdown in a Level-3 glass panel; pass a trigger and item list. */
export function Menu(props: MenuProps): JSX.Element;
