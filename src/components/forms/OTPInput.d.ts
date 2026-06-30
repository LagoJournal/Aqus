import React from 'react';

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Number of digits. Default 6. */
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fires when all cells are filled. */
  onComplete?: (value: string) => void;
}

/** One-time-code / PIN entry. Each digit is a liquid-blob cell; auto-advances, supports paste. */
export function OTPInput(props: OTPInputProps): JSX.Element;
