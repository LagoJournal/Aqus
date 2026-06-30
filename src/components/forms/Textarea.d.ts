import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/** Flat Level-1 multi-line field with accent focus ring + soft glow halo. */
export function Textarea(props: TextareaProps): JSX.Element;
