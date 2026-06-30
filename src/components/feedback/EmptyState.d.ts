import React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  /** Optional action (e.g. a Button node). */
  action?: React.ReactNode;
  /** Optional Phosphor icon node above the title. */
  icon?: React.ReactNode;
}

/**
 * @startingPoint section="Feedback" subtitle="Zero-data placeholder with liquid blob" viewport="700x340"
 * Zero-data placeholder with a large morphing liquid blob in the background.
 */
export function EmptyState(props: EmptyStateProps): JSX.Element;
