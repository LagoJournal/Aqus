import React from 'react';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface KbdShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Ordered list of key labels. */
  keys: string[];
  /** Separator between keys. Default '+'. */
  separator?: string;
}

/** Single keyboard key token. Brushed-bone surface, mono font, Aero depth. */
export function Kbd(props: KbdProps): JSX.Element;
/** Renders a key sequence — Kbd tokens joined by a separator. */
export function KbdShortcut(props: KbdShortcutProps): JSX.Element;
