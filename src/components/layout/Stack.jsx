import React from 'react';

/**
 * Aqus — Stack
 * Flex column or row with a gap token. The everyday layout primitive
 * for composing groups of components without hand-writing flex CSS.
 */
export function Stack({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  as: Tag = 'div',
  style = {},
  children,
  ...rest
}) {
  const gaps = { 1: 'var(--space-1)', 2: 'var(--space-2)', 3: 'var(--space-3)', 4: 'var(--space-4)', 5: 'var(--space-5)', 6: 'var(--space-6)', 7: 'var(--space-7)', 8: 'var(--space-8)' };
  return (
    <Tag style={{
      display: 'flex',
      flexDirection: direction,
      gap: gaps[gap] ?? gap,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
}
