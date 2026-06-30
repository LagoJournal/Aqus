import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
  /** Default 'bubble' (liquid blob). Use 'circle' for conventional round, 'square' for a rounded rect. */
  shape?: 'bubble' | 'circle' | 'square';
  status?: 'online' | 'away' | 'busy';
}

/** Image or initials avatar; default shape is the liquid blob (LIQUID_BLOB border-radius), plus a liquid-bubble status marker. */
export function Avatar(props: AvatarProps): JSX.Element;
