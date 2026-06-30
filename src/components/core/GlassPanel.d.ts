import React from 'react';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Element tag to render. Default 'div'. */
  as?: keyof JSX.IntrinsicElements;
  /** Corner radius token. Default 'lg'. */
  radius?: 'md' | 'lg' | 'xl' | 'pill';
  inset?: boolean;
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Surfaces" subtitle="Frosted Aero glass chrome panel" viewport="700x260"
 * Frosted glass surface (blur-behind + accent tint + inner gloss) for nav, modals, sidebars.
 */
export function GlassPanel(props: GlassPanelProps): JSX.Element;
