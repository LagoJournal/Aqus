import React from 'react';

export interface ContextMenuItem {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  divider?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ContextMenuItem[];
  children?: React.ReactNode;
}

/** Right-click glass menu over any child. Items: icon, shortcut, danger tone, divider. */
export function ContextMenu(props: ContextMenuProps): JSX.Element;
