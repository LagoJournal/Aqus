import React from 'react';

export interface NavLink { href: string; label: string; }

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: NavLink[];
  /** Trailing node — typically a Button. */
  action?: React.ReactNode;
  /** href matching the active link. */
  activeHref?: string;
  onLinkClick?: (link: NavLink) => void;
}

/**
 * @startingPoint section="Layout" subtitle="Sticky glass nav pill — Wordmark + links + action" viewport="1120x80"
 * Sticky frosted-glass pill navigation with Wordmark, links (active = liquid bubble), and action slot.
 */
export function NavBar(props: NavBarProps): JSX.Element;
