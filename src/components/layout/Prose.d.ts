import React from 'react';

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> { children?: React.ReactNode; }

/** Long-form reading container — measure, leading, type rhythm. */
export function Prose(props: ProseProps): JSX.Element;
export function ProseH1(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function ProseH2(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function ProseH3(props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element;
export function ProseP(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function ProseA(props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element;
