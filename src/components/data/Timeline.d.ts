import React from 'react';

export interface TimelineItem {
  id?: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  /** done (filled bubble) · active (spinner bubble) · pending (outline bubble). Default 'done'. */
  status?: 'done' | 'active' | 'pending';
  /** Any extra React content below the description. */
  extra?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

/**
 * Vertical event log. Step nodes are LiquidBubbles:
 * done = filled, active = spinner, pending = outline.
 */
export function Timeline(props: TimelineProps): JSX.Element;
