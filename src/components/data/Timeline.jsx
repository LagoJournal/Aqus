import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Timeline
 * Vertical event log / stepper. Each item's `status` drives the node:
 * 'done' = filled bubble, 'active' = spinner bubble, anything else
 * (including 'pending', the default) = outline bubble.
 */
export function Timeline({
  items = [],
  style = {},
  ...rest
}) {
  return (
    <ol style={{
      listStyle: 'none', margin: 0, padding: 0,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const bubbleVariant = item.status === 'done' ? 'filled' : item.status === 'active' ? 'spinner' : 'outline';
        const bubbleAnimate = item.status !== 'pending';
        return (
          <li key={item.id ?? i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
            {/* Node + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
              <LiquidBubble
                size={14}
                variant={bubbleVariant}
                animate={bubbleAnimate}
                thickness={1.5}
                style={{ marginTop: 2 }}
              />
              {!isLast && (
                <div style={{
                  width: 1.5, flex: 1, minHeight: 20, marginTop: 4,
                  background: item.status === 'done' ? 'var(--accent-mid)' : 'var(--border)',
                }} />
              )}
            </div>
            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-body-sm)', color: 'var(--text)' }}>
                  {item.title}
                </span>
                {item.time && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mini)', color: 'var(--text-muted)' }}>
                    {item.time}
                  </span>
                )}
              </div>
              {item.description && (
                <p style={{ margin: '4px 0 0', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              )}
              {item.extra && <div style={{ marginTop: 8 }}>{item.extra}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
