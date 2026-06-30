import React from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Width of each item (CSS value). Default '100%' (one at a time). */
  itemWidth?: string;
  gap?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

/** Horizontal snap carousel with blob prev/next buttons and liquid-bubble page dots. */
export function Carousel(props: CarouselProps): JSX.Element;
