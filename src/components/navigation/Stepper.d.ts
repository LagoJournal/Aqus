import React from 'react';

export interface Step {
  id?: string | number;
  label: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  /** Index of the current (active) step. Steps before it are 'done'. */
  current?: number;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * @startingPoint section="Navigation" subtitle="Multi-step progress — liquid bubble nodes" viewport="700x140"
 * Multi-step progress. Step nodes are LiquidBubbles: done=filled, current=spinner, upcoming=outline.
 */
export function Stepper(props: StepperProps): JSX.Element;
