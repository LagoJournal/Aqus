import React from 'react';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
}

/**
 * @startingPoint section="Forms" subtitle="Slider with a glossy liquid-bubble thumb" viewport="700x140"
 * Bone track + accent fill + glossy LiquidBubble thumb; controlled value.
 */
export function Slider(props: SliderProps): JSX.Element;
