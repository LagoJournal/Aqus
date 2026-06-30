import React from 'react';
import { LiquidBubble, LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — NavBar
 * Sticky glass navigation bar with the Wordmark, nav links,
 * and an action slot. The top-chrome for any Aqus surface.
 *
 * Mobile-first: below `compactAt` px the links collapse behind a
 * hamburger that opens a glass dropdown. The action slot stays inline.
 */
export function NavBar({
  links = [],
  action,
  activeHref,
  onLinkClick,
  homeHref = '/',
  onBrandClick,
  compactAt = 720,
  style = {},
  ...rest
}) {
  const { Wordmark } = window.AgusDesignSystem_492a6f;
  const [open, setOpen] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const navRef = React.useRef(null);

  // Collapse links into a menu when the bar itself gets narrow.
  React.useEffect(() => {
    const el = navRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < compactAt));
    ro.observe(el);
    return () => ro.disconnect();
  }, [compactAt]);

  // Close the dropdown when we leave compact mode.
  React.useEffect(() => { if (!compact) setOpen(false); }, [compact]);

  const linkStyle = (active, block) => ({
    display: block ? 'flex' : 'inline-flex',
    alignItems: 'center', gap: 6,
    padding: block ? '11px 14px' : '7px 14px',
    borderRadius: block ? 'var(--radius-md)' : 'var(--radius-pill)',
    fontWeight: active ? 600 : 500, fontSize: 'var(--text-body-sm)',
    color: active ? 'var(--accent-text)' : 'var(--text-muted)',
    background: active ? 'var(--accent-light)' : 'transparent',
    textDecoration: 'none', width: block ? '100%' : undefined,
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
  });

  const handleClick = (l) => (e) => {
    if (onLinkClick) { e.preventDefault(); onLinkClick(l); }
    setOpen(false);
  };

  return (
    <nav ref={navRef} style={{
      position: 'sticky', top: 0, zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 'var(--space-3)', padding: '10px 14px', margin: '12px',
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

      <a href={homeHref}
        onClick={onBrandClick ? (e) => { e.preventDefault(); onBrandClick(e); } : undefined}
        style={{ position: 'relative', display: 'inline-flex', textDecoration: 'none', flex: 'none' }}>
        <Wordmark size={22} animate={false} />
      </a>

      {/* Inline links — hidden in compact mode */}
      {links.length > 0 && !compact && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <a key={l.href} href={l.href} onClick={handleClick(l)} style={linkStyle(active, false)}>
                {active && <LiquidBubble size={7} />}
                {l.label}
              </a>
            );
          })}
        </div>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>
        {action}
        {links.length > 0 && compact && (
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 38, height: 38, borderRadius: LIQUID_BLOB, border: 'none',
              background: open ? 'var(--accent-light)' : 'transparent',
              color: open ? 'var(--accent-text)' : 'var(--text-muted)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 20, padding: 0,
              transition: 'background var(--dur-fast) var(--ease-out)',
            }}
          >
            <i className={open ? 'ph ph-x' : 'ph ph-list'} />
          </button>
        )}
      </div>

      {/* Compact dropdown panel */}
      {compact && open && links.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 320,
          display: 'flex', flexDirection: 'column', gap: 2, padding: 8,
          borderRadius: 'var(--radius-lg)',
          // Full glass recipe — inner gloss + accent tint over the glass surface,
          // matching Select / Dialog / the bar itself (not a flat surface).
          background: 'linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass), var(--glass-surface)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          border: '1px solid var(--glass-border-light)',
          borderBottomColor: 'var(--glass-border-dark)',
          boxShadow: 'var(--shadow-glass)',
          animation: 'agus-enter var(--dur-ui) var(--ease-spring)',
        }}>
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <a key={l.href} href={l.href} onClick={handleClick(l)} style={linkStyle(active, true)}>
                {active && <LiquidBubble size={7} />}
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
