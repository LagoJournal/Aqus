import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Stepper
 * Multi-step progress indicator. Each step node is a LiquidBubble:
 * filled = complete, spinner = current, outline = upcoming. The
 * connector fills with accent for completed segments.
 */
export function Stepper({
  steps = [],
  current = 0,
  orientation = 'horizontal',
  style = {},
  ...rest
}) {
  const horizontal = orientation === 'horizontal';
  return (
    <div style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      alignItems: horizontal ? 'flex-start' : 'stretch',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {steps.map((step, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'upcoming';
        const variant = state === 'done' ? 'filled' : 'outline';
        const isLast = i === steps.length - 1;
        return (
          <div key={step.id ?? i} style={{
            display: 'flex',
            flexDirection: horizontal ? 'column' : 'row',
            alignItems: horizontal ? 'center' : 'flex-start',
            flex: horizontal && !isLast ? 1 : 'none',
            gap: horizontal ? 8 : 12,
            position: 'relative',
            minWidth: horizontal ? 80 : undefined,
          }}>
            <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', alignItems: 'center', width: horizontal ? '100%' : 'auto', gap: horizontal ? 0 : 0 }}>
              <LiquidBubble size={16} variant={variant} animate={state !== 'upcoming'} thickness={2} />
              {!isLast && (
                <div style={{
                  flex: horizontal ? 1 : 'none',
                  width: horizontal ? 'auto' : 2,
                  height: horizontal ? 2 : 24,
                  marginInline: horizontal ? 6 : 0,
                  marginTop: horizontal ? 0 : 4,
                  marginLeft: horizontal ? 0 : 7,
                  background: i < current ? 'var(--accent)' : 'var(--border)',
                  transition: 'background var(--dur-ui) var(--ease-out)',
                }} />
              )}
            </div>
            <div style={{ textAlign: horizontal ? 'center' : 'left', paddingBottom: horizontal ? 0 : 16, marginTop: horizontal ? 0 : -2 }}>
              <div style={{
                fontSize: 'var(--text-label)', fontWeight: state === 'current' ? 700 : 600,
                color: state === 'upcoming' ? 'var(--text-muted)' : 'var(--text)',
              }}>{step.label}</div>
              {step.description && (
                <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
