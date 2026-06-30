import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — TreeView
 * Collapsible hierarchy (files, nav, org). Expandable nodes use a
 * liquid-bubble indicator (outline collapsed → filled expanded);
 * the selected node gets an accent-light row.
 */
export function TreeView({
  nodes = [],
  selectedId,
  onSelect,
  defaultExpanded = [],
  style = {},
  ...rest
}) {
  const [expanded, setExpanded] = React.useState(new Set(defaultExpanded));
  const toggle = (id) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const renderNode = (node, depth) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = expanded.has(node.id);
    const isSel = selectedId === node.id;
    return (
      <li key={node.id} style={{ listStyle: 'none' }}>
        <div
          onClick={() => { hasChildren ? toggle(node.id) : onSelect?.(node); if (!hasChildren) onSelect?.(node); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', paddingLeft: 10 + depth * 18,
            borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            background: isSel ? 'var(--accent-light)' : 'transparent',
            color: isSel ? 'var(--accent-text)' : 'var(--text)',
            fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', fontWeight: isSel ? 600 : 400,
            transition: 'background var(--dur-micro) var(--ease-out)',
          }}
          onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'var(--accent-light)'; }}
          onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
        >
          {hasChildren
            ? <LiquidBubble size={10} variant={isOpen ? 'filled' : 'outline'} thickness={1.5} animate={isOpen} />
            : <span style={{ width: 10, flex: 'none' }} />}
          {node.icon && <span style={{ display: 'inline-flex', fontSize: 16, color: 'var(--text-muted)', flex: 'none' }}>{node.icon}</span>}
          <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.label}</span>
          {node.meta && <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)' }}>{node.meta}</span>}
        </div>
        {hasChildren && isOpen && (
          <ul style={{ margin: 0, padding: 0 }}>
            {node.children.map(child => renderNode(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul style={{ margin: 0, padding: 0, ...style }} {...rest}>
      {nodes.map(n => renderNode(n, 0))}
    </ul>
  );
}
