import React from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** Change label, e.g. "+12%" or "−3". */
  delta?: React.ReactNode;
  /** true = success green, false = danger red. */
  up?: boolean;
  /** Optional Phosphor icon node. */
  icon?: React.ReactNode;
  /** Allow the value to wrap instead of truncating with an ellipsis. Default false. */
  wrap?: boolean;
}

/** Single KPI tile: big number + label + delta (liquid bubble indicator). */
export function StatCard(props: StatCardProps): JSX.Element;
