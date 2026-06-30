import React from 'react';

/**
 * Aqus — DescriptionList
 * Structured key → value pairs. For profile fields, settings summaries,
 * case-study metadata, order details. Responsive column count.
 */
export function DescriptionList({
  items = [],
  columns = 1,
  style = {},
  ...rest
}) {
  return (
    <dl style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: 'var(--space-4) var(--space-6)',
      margin: 0, fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {items.map((item, i) => (
        <div key={item.id ?? i} style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border)' }}>
          <dt style={{
            fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>{item.term}</dt>
          <dd style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--text)', fontWeight: 'var(--weight-medium)' }}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
