import React from 'react';

export interface MediaCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Image URL string, or a React node (e.g. <video>, <image-slot>). */
  media?: string | React.ReactNode;
  mediaHeight?: number;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Node pinned top-left over the media (e.g. a Badge). */
  badge?: React.ReactNode;
  /** Node centered over the media (e.g. a play button). */
  overlay?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

/** Image-first card: full-bleed media + content below, hover lift + media zoom. (BlogCard is text-led.) */
export function MediaCard(props: MediaCardProps): JSX.Element;
