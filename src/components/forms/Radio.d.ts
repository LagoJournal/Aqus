import React from 'react';

export interface RadioProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (value: any) => void;
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: any;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: Array<string | RadioOption>;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  gap?: number;
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
}

/**
 * @startingPoint section="Forms" subtitle="Radio — selection is a liquid bubble" viewport="700x180"
 * Radio control whose selected indicator IS a LiquidBubble; RadioGroup manages a set.
 */
export function Radio(props: RadioProps): JSX.Element;
export function RadioGroup(props: RadioGroupProps): JSX.Element;
