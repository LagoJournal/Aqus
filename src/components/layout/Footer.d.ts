import React from 'react';

export interface FooterLink { label: string; href?: string; }
export interface FooterColumn { title: string; links: FooterLink[]; }

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
  copyright?: string;
}

/** Page footer: Wordmark + link columns + copyright. Flat Level-1 surface (never glass). */
export function Footer(props: FooterProps): JSX.Element;
