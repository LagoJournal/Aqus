import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Breadcrumb
 * Trail of links separated by small liquid-bubble dots. Last item
 * is the current page (non-interactive).
 */
export function Breadcrumb({ items = [], onNavigate, style = {}, ...rest }) {
  const norm = items.map((it) => (typeof it === 'string' ? { label: it } : it));
  return (
    <nav aria-label="Breadcrumb" style={{
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', ...style,
    }} {...rest}>
      {norm.map((it, i) => {
        const last = i === norm.length - 1;
        const linkStyle = {
          border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
          fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-muted)',
          textDecoration: 'none',
        };
        const hover = {
          onMouseEnter: (e) => { e.currentTarget.style.color = 'var(--accent-text)'; },
          onMouseLeave: (e) => { e.currentTarget.style.color = 'var(--text-muted)'; },
        };
        const navigate = (e) => {
          if (!onNavigate) return;
          // Let onNavigate own the navigation (SPA routing) — stop the default
          // full-page anchor jump when a handler is provided.
          if (it.href) e.preventDefault();
          onNavigate(it.value ?? it.href ?? it.label, i);
        };
        return (
          <React.Fragment key={i}>
            {last ? (
              <span aria-current="page" style={{ color: 'var(--text)', fontWeight: 600 }}>{it.label}</span>
            ) : it.href ? (
              <a href={it.href} onClick={navigate} style={linkStyle} {...hover}>{it.label}</a>
            ) : (
              <button onClick={navigate} style={linkStyle} {...hover}>{it.label}</button>
            )}
            {!last && <LiquidBubble size={4} color="var(--text-muted)" animate={false} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
