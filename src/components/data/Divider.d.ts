import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

/** Hairline rule — horizontal or vertical, with an optional centered label. */
export function Divider(props: DividerProps): JSX.Element;
