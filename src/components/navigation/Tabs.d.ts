import React from 'react';

export interface TabItem { value: string; label: string; }
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: Array<string | TabItem>;
  value: string;
  onChange?: (value: string) => void;
}

/**
 * @startingPoint section="Navigation" subtitle="Underline tabs, sliding accent bar" viewport="700x120"
 * Underline tabs with a sliding accent indicator.
 */
export function Tabs(props: TabsProps): JSX.Element;
