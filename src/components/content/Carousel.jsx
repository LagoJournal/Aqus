import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Carousel
 * Horizontal slide track with prev/next blob buttons and liquid-bubble
 * page dots. Snap scrolling; one or more items visible.
 */
export function Carousel({
  children,
  itemWidth = '100%',
  gap = 16,
  showArrows = true,
  showDots = true,
  style = {},
  ...rest
}) {
  const trackRef = React.useRef(null);
  const items = React.Children.toArray(children);
  const [active, setActive] = React.useState(0);

  const scrollTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, items.length - 1));
    const child = track.children[clamped];
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActive(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0, min = Infinity;
    [...track.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (d < min) { min = d; nearest = i; }
    });
    setActive(nearest);
  };

  const navBtn = (dir) => (
    <button aria-label={dir < 0 ? 'Previous' : 'Next'}
      onClick={() => scrollTo(active + dir)}
      style={{
        width: 38, height: 38, flex: 'none', border: 'none', cursor: 'pointer',
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', color: 'var(--text)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}>
      <i className={`ph ph-caret-${dir < 0 ? 'left' : 'right'}`} style={{ fontSize: 17 }} />
    </button>
  );

  return (
    <div style={{ fontFamily: 'var(--font-ui)', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showArrows && navBtn(-1)}
        <div
          ref={trackRef}
          onScroll={onScroll}
          style={{
            display: 'flex', gap, overflowX: 'auto', scrollSnapType: 'x mandatory',
            flex: 1, scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '4px 0',
          }}
        >
          {items.map((child, i) => (
            <div key={i} style={{ flex: `0 0 ${itemWidth}`, scrollSnapAlign: 'start', minWidth: 0 }}>{child}</div>
          ))}
        </div>
        {showArrows && navBtn(1)}
      </div>
      {showDots && items.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14 }}>
          {items.map((_, i) => (
            <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => scrollTo(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, display: 'inline-flex' }}>
              <LiquidBubble size={i === active ? 11 : 8} variant={i === active ? 'filled' : 'outline'} animate={i === active} thickness={1.5} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
