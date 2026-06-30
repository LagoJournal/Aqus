import React from 'react';

/**
 * Aqus — Kbd
 * Keyboard shortcut token. Brushed-bone surface, mono font,
 * Aero depth: subtle top-gloss + contact shadow.
 */
export function Kbd({ children, style = {}, ...rest }) {
  return (
    <kbd style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)',
      fontWeight: 'var(--weight-medium)', lineHeight: 1,
      padding: '3px 7px', borderRadius: 'var(--radius-xs)',
      background: 'linear-gradient(to bottom, var(--surface-raised), var(--surface))',
      border: '1px solid var(--border)',
      borderBottomWidth: 2,
      color: 'var(--text-muted)',
      boxShadow: '0 1px 0 var(--border), inset 0 1px 0 rgba(255,255,255,0.7)',
      whiteSpace: 'nowrap',
      ...style,
    }} {...rest}>
      {children}
    </kbd>
  );
}

/**
 * Aqus — KbdShortcut
 * Renders an array of keys joined by the correct separator.
 * Pass keys=["Cmd","K"] → renders <Kbd>Cmd</Kbd> + <Kbd>K</Kbd>.
 */
export function KbdShortcut({ keys = [], separator = '+', style = {}, ...rest }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, ...style }} {...rest}>
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', margin: '0 1px' }}>{separator}</span>}
          <Kbd>{k}</Kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
