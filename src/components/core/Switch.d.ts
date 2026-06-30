import React from 'react';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** On/off state. */
  checked?: boolean;
  /** Called with the next boolean value. */
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Render the knob as a glossy LiquidBubble (vs a plain circle). Default true. */
  bubble?: boolean;
}

/** Pill toggle — accent fill + glossy spring knob when on. */
export function Switch(props: SwitchProps): JSX.Element;
