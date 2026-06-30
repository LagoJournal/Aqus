import React from 'react';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
  avatarInitials?: string;
}

/** Pull-quote + liquid-blob avatar + attribution. Oversized accent quote mark. */
export function TestimonialCard(props: TestimonialCardProps): JSX.Element;
