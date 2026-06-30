import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number;
  radius?: string;
  /** Render a circle of diameter `height`. */
  circle?: boolean;
}

/** Bone-tinted shimmer placeholder for loading content. */
export function Skeleton(props: SkeletonProps): JSX.Element;
