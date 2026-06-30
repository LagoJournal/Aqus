import React from 'react';

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  /** Footer action nodes (e.g. Buttons); the default action may pulse. */
  actions?: React.ReactNode;
  width?: number;
}

/**
 * @startingPoint section="Feedback" subtitle="Glass modal with blurred backdrop" viewport="700x420"
 * Modal with a blurred backdrop and an Aero-glass panel; closes on backdrop click / Escape.
 */
export function Dialog(props: DialogProps): JSX.Element;
