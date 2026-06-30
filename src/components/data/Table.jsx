import React from 'react';
import { LiquidBubble, LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Table
 * Sortable data table. Active sort column shows a liquid-bubble
 * indicator instead of a plain arrow. Striped, hoverable rows.
 */
export function Table({
  columns = [],
  rows = [],
  striped = false,
  onSort,
  sortKey,
  sortDir = 'asc',
  style = {},
  ...rest
}) {
  const handleSort = (col) => {
    if (!col.sortable || !onSort) return;
    onSort(col.key, col.key === sortKey && sortDir === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', ...style }} {...rest}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)' }}>
        <thead>
          <tr>
            {columns.map((col) => {
              const active = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  style={{
                    padding: '11px 16px', textAlign: col.align || 'left',
                    fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-caption)',
                    letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
                    color: active ? 'var(--accent-text)' : 'var(--text-muted)',
                    background: 'var(--surface)',
                    borderBottom: '1px solid var(--border)',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {col.label}
                    {col.sortable && (
                      active
                        ? <LiquidBubble size={8} style={{ transform: sortDir === 'desc' ? 'scaleY(-1)' : 'none' }} />
                        : <LiquidBubble size={8} variant="outline" thickness={1.5} animate={false} />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.id ?? ri}
              style={{
                background: striped && ri % 2 === 1 ? 'var(--surface)' : 'transparent',
                transition: 'background var(--dur-micro) var(--ease-out)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
              onMouseLeave={e => e.currentTarget.style.background = striped && ri % 2 === 1 ? 'var(--surface)' : 'transparent'}
            >
              {columns.map((col) => (
                <td key={col.key} style={{
                  padding: '12px 16px', textAlign: col.align || 'left',
                  color: col.muted ? 'var(--text-muted)' : 'var(--text)',
                  borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  verticalAlign: 'middle',
                }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
