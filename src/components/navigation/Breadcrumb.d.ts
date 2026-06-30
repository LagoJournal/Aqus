import React from 'react';

export interface BreadcrumbItem { label: string; value?: string; }
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<string | BreadcrumbItem>;
  onNavigate?: (value: string, index: number) => void;
}

/** Link trail separated by small liquid-bubble dots; last item is the current page. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
