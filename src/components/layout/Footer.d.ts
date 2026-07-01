import React from 'react';
import type { WordmarkProps } from '../brand/Wordmark';

export interface FooterLink { label: string; href?: string; }
export interface FooterColumn { title: string; links: FooterLink[]; }

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Overrides the default Wordmark entirely — pass your own logo/name node. */
  brand?: React.ReactNode;
  /** Props forwarded to the default Wordmark when `brand` is not set. */
  brandProps?: Partial<WordmarkProps>;
  columns?: FooterColumn[];
  copyright?: string;
}

/** Page footer: Wordmark + link columns + copyright. Flat Level-1 surface (never glass). */
export function Footer(props: FooterProps): JSX.Element;
