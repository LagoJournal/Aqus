import React from 'react';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: React.ReactNode;
  sub?: React.ReactNode;
  /** Accent-colored label above the headline. */
  eyebrow?: React.ReactNode;
  /** CTA node(s) — typically 1–2 Buttons. */
  cta?: React.ReactNode;
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

/**
 * @startingPoint section="Layout" subtitle="Full hero with liquid blobs, headline and CTA" viewport="1120x420"
 * Full-width hero with liquid blob background, headline, subtext and CTA slot.
 */
export function HeroSection(props: HeroSectionProps): JSX.Element;
