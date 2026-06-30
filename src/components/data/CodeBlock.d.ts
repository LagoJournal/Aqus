import React from 'react';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  /** Language label shown in the header. Default 'code'. */
  language?: string;
  showLineNumbers?: boolean;
}

/** Code surface (JetBrains Mono) with a language header, copy button, optional line numbers. */
export function CodeBlock(props: CodeBlockProps): JSX.Element;
