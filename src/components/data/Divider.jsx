import React from 'react';

/**
 * Aqus — Divider
 * Hairline rule. Horizontal or vertical; optional centered label.
 */
export function Divider({ orientation = 'horizontal', label, style = {}, ...rest }) {
  if (orientation === 'vertical') {
    return <span aria-hidden="true" style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', ...style }} {...rest} />;
  }
  if (label) {
    return (
      <div role="separator" style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }} {...rest}>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-caption)', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
    );
  }
  return <hr role="separator" style={{ border: 'none', height: 1, background: 'var(--border)', margin: 0, ...style }} {...rest} />;
}
