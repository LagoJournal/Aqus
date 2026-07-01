import React from 'react';

export interface BreadcrumbItem { label: string; value?: string; href?: string; }
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<string | BreadcrumbItem>;
  /** Fires on click of any non-last item with (value ?? href ?? label, index).
   *  When an item has `href` and onNavigate is set, the default anchor jump is
   *  prevented so you can route in an SPA. Omit onNavigate to use plain `href` links. */
  onNavigate?: (value: string, index: number) => void;
}

/** Link trail separated by small liquid-bubble dots; last item is the current page. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
