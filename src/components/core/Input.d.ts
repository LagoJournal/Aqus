import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — turns the field red and overrides hint. */
  error?: string;
  /** Leading icon node. */
  icon?: React.ReactNode;
}

/** Flat Level-1 text field with accent focus ring and soft Aero glow halo. */
export function Input(props: InputProps): JSX.Element;
