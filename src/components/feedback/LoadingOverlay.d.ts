import React from 'react';

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render the overlay. Default true. */
  show?: boolean;
  message?: string;
  /** Cover the whole viewport (position:fixed). Default false (covers nearest positioned parent). */
  fullscreen?: boolean;
  /** Blur the content behind. Default true. */
  blur?: boolean;
}

/** Dimmed blurred cover with a liquid Spinner + message. Place over a Card or full screen. */
export function LoadingOverlay(props: LoadingOverlayProps): JSX.Element | null;
