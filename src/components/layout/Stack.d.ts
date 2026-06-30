import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  direction?: 'column' | 'row';
  /** Space token index (1–8) or a raw CSS string. Default 4 (16px). */
  gap?: number | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

/** Flex column/row with a gap token. The everyday layout primitive for composing component groups. */
export function Stack(props: StackProps): JSX.Element;
