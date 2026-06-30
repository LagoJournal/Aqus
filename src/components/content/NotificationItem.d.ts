import React from 'react';

export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Phosphor icon node (used if no avatar). */
  icon?: React.ReactNode;
  /** Avatar node (overrides icon). */
  avatar?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  time?: string;
  /** Unread → tinted background + liquid bubble marker. */
  unread?: boolean;
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

/** A notification feed / inbox row. Unread = tinted bg + liquid bubble marker. */
export function NotificationItem(props: NotificationItemProps): JSX.Element;
