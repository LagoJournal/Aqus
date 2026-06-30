import React from 'react';

export interface Command {
  id?: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose?: () => void;
  commands?: Command[];
  placeholder?: string;
  style?: React.CSSProperties;
}

/**
 * @startingPoint section="Feedback" subtitle="⌘K command/search interface — glass panel, liquid active item" viewport="700x480"
 * ⌘K command palette: floating glass panel, keyboard nav, liquid-bubble active indicator, shortcut hints.
 */
export function CommandPalette(props: CommandPaletteProps): JSX.Element | null;
