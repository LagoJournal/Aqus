import React from 'react';

export interface BlogCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  href?: string;
  /** Featured: adds liquid blob in thumbnail + Featured badge. */
  featured?: boolean;
}

/** Article preview card: thumbnail + title + excerpt + meta + hover lift. */
export function BlogCard(props: BlogCardProps): JSX.Element;
