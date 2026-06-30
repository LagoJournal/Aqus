import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — NavBar
 * Sticky glass navigation bar with the Wordmark, nav links,
 * and an action slot. The top-chrome for any Aqus surface.
 */
export function NavBar({
  links = [],
  action,
  activeHref,
  onLinkClick,
  style = {},
  ...rest
}) {
  const { Wordmark } = window.AgusDesignSystem_492a6f;
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 'var(--space-4)', padding: '10px 20px', margin: '12px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--glass-surface)',
      WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
      backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
      border: '1px solid var(--glass-border-light)',
      borderBottomColor: 'var(--glass-border-dark)',
      boxShadow: 'var(--shadow-glass)',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <span aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
        background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)',
      }} />
      <a href="/" style={{ position: 'relative', display: 'inline-flex', textDecoration: 'none' }}>
        <Wordmark size={22} animate={false} />
      </a>
      {links.length > 0 && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <a key={l.href} href={l.href}
                onClick={onLinkClick ? (e) => { e.preventDefault(); onLinkClick(l); } : undefined}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 'var(--radius-pill)',
                  fontWeight: active ? 600 : 500, fontSize: 'var(--text-body-sm)',
                  color: active ? 'var(--accent-text)' : 'var(--text-muted)',
                  background: active ? 'var(--accent-light)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
                }}>
                {active && <LiquidBubble size={7} />}
                {l.label}
              </a>
            );
          })}
        </div>
      )}
      {action && <div style={{ position: 'relative', flex: 'none' }}>{action}</div>}
    </nav>
  );
}
