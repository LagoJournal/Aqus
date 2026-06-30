import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Accordion
 * Expand/collapse sections. The trigger indicator is a LiquidBubble:
 * outline at rest (idle), filled when open. Never an arrow chevron.
 */
export function Accordion({
  items = [],
  multiple = false,
  defaultOpen = [],
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));

  const toggle = (id) => {
    setOpen((prev) => {
      const next = multiple ? new Set(prev) : new Set();
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)', ...style }} {...rest}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id ?? i);
        return (
          <div key={item.id ?? i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id ?? i)}
              className="agus-focusable"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', textAlign: 'left', padding: '14px 4px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontWeight: 'var(--weight-semibold)',
                fontSize: 'var(--text-body-sm)', color: 'var(--text)',
                gap: 12,
              }}
            >
              <span style={{ flex: 1 }}>{item.title}</span>
              <LiquidBubble
                size={12}
                variant={isOpen ? 'filled' : 'outline'}
                thickness={1.5}
                animate={isOpen}
                style={{ transition: 'all var(--dur-fast) var(--ease-out)' }}
              />
            </button>
            <div style={{
              overflow: 'hidden',
              maxHeight: isOpen ? 600 : 0,
              transition: 'max-height var(--dur-ui) var(--ease-out)',
            }}>
              <div style={{
                padding: '0 4px 16px',
                fontSize: 'var(--text-body-sm)', lineHeight: 'var(--leading-relaxed)',
                color: 'var(--text-muted)',
              }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
