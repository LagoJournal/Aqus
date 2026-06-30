import React from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Accent-colored label above the title (e.g. "Case study"). */
  eyebrow?: React.ReactNode;
  /** Trailing action node (e.g. a Button). */
  action?: React.ReactNode;
}

/**
 * @startingPoint section="Layout" subtitle="Page title + subtitle + action slot" viewport="1120x120"
 * Page-level title with optional eyebrow, subtitle and action. Sits at top of Container.
 */
export function PageHeader(props: PageHeaderProps): JSX.Element;
