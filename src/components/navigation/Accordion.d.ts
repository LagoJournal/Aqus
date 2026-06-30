import React from 'react';

export interface AccordionItem {
  id?: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow multiple sections open simultaneously. Default false. */
  multiple?: boolean;
  /** IDs open by default. */
  defaultOpen?: (string | number)[];
}

/**
 * Expand/collapse sections. Trigger indicator: outline LiquidBubble at rest,
 * filled + morphing when open — never a chevron arrow.
 */
export function Accordion(props: AccordionProps): JSX.Element;
