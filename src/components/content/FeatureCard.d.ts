import React from 'react';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

/** Icon (liquid-blob tile) + title + description. Standard marketing feature tile. */
export function FeatureCard(props: FeatureCardProps): JSX.Element;
