import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Pagination
 * Page controls. The active page is a filled liquid bubble;
 * other pages are ghost; prev/next are IconButton-style blobs.
 */
export function Pagination({
  page = 1,
  total = 1,
  onChange,
  siblings = 1,
  style = {},
  ...rest
}) {
  const go = (p) => { if (p >= 1 && p <= total && onChange) onChange(p); };

  // Build page range with ellipsis
  const range = () => {
    const pages = [];
    const left = Math.max(2, page - siblings);
    const right = Math.min(total - 1, page + siblings);
    pages.push(1);
    if (left > 2) pages.push('…L');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('…R');
    if (total > 1) pages.push(total);
    return pages;
  };

  const btnBase = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 34, height: 34, border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-ui)', fontWeight: 'var(--weight-semibold)', fontSize: 14,
    transition: 'background var(--dur-fast) var(--ease-out)',
    borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
    position: 'relative',
  };

  const PageBtn = ({ p }) => {
    const active = p === page;
    const [hover, setHover] = React.useState(false);
    return (
      <button
        type="button"
        aria-label={`Page ${p}`}
        aria-current={active ? 'page' : undefined}
        onClick={() => go(p)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...btnBase,
          background: active
            ? 'linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))'
            : hover ? 'var(--accent-light)' : 'transparent',
          color: active ? 'var(--on-accent)' : 'var(--text-muted)',
          boxShadow: active ? 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
        }}
      >
        {p}
      </button>
    );
  };

  const NavBtn = ({ dir }) => {
    const disabled = dir === 'prev' ? page <= 1 : page >= total;
    const [hover, setHover] = React.useState(false);
    return (
      <button
        type="button"
        aria-label={dir === 'prev' ? 'Previous' : 'Next'}
        disabled={disabled}
        onClick={() => go(dir === 'prev' ? page - 1 : page + 1)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...btnBase,
          background: hover && !disabled ? 'var(--accent-light)' : 'transparent',
          color: disabled ? 'var(--border)' : 'var(--text-muted)',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <i className={`ph ph-caret-${dir === 'prev' ? 'left' : 'right'}`} style={{ fontSize: 16 }} />
      </button>
    );
  };

  return (
    <nav aria-label="Pagination" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, ...style }} {...rest}>
      <NavBtn dir="prev" />
      {range().map((p, i) =>
        typeof p === 'string'
          ? <span key={p} style={{ width: 28, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>…</span>
          : <PageBtn key={p} p={p} />
      )}
      <NavBtn dir="next" />
    </nav>
  );
}
