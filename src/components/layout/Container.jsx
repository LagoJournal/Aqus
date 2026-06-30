import React from 'react';

/**
 * Aqus — Container
 * Max-width centered wrapper. The standard horizontal scaffold for
 * every page: content stays readable, margins stay comfortable.
 */
export function Container({
  size = 'default',
  padded = true,
  as: Tag = 'div',
  style = {},
  children,
  ...rest
}) {
  const maxWidths = {
    sm:      640,
    default: 1120,
    lg:      1400,
    full:    '100%',
  };
  return (
    <Tag style={{
      width: '100%',
      maxWidth: maxWidths[size] ?? maxWidths.default,
      marginInline: 'auto',
      paddingInline: padded ? 'var(--space-5)' : 0,
      boxSizing: 'border-box',
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
}
