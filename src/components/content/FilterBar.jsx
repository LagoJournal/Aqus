import React from 'react';

/**
 * Aqus — FilterBar
 * A row of Tag chips acting as active filters + a clear-all button.
 * Tags use the liquid bubble remove X. Designed to sit above a Table or grid.
 */
export function FilterBar({
  filters = [],
  onRemove,
  onClear,
  style = {},
  ...rest
}) {
  const { Tag, Button } = window.AgusDesignSystem_492a6f;
  if (!filters.length) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
      flexWrap: 'wrap', fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', fontWeight: 600, marginRight: 4 }}>Filters:</span>
      {filters.map((f, i) => (
        <Tag key={f.id ?? i} tone={f.tone || 'accent'} size="sm"
          onRemove={() => onRemove && onRemove(f)}>
          {f.label}
        </Tag>
      ))}
      {onClear && (
        <Button variant="ghost" size="sm" onClick={onClear}
          style={{ fontSize: 'var(--text-caption)', padding: '4px 8px' }}>
          Clear all
        </Button>
      )}
    </div>
  );
}
