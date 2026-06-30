import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Aqus — internal floating-layer helpers (not exported from the package root).
 *
 * Anchored popups (Select, Menu, Popover, Tooltip, …) must escape any ancestor
 * with `overflow: hidden` or a transform/filter that would clip or trap them.
 * We render the panel into <body> via a portal and position it with viewport
 * `fixed` coordinates derived from the trigger's bounding rect.
 */

/** Render children into document.body. No-op during SSR. */
export function Portal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}

/**
 * Track a trigger's viewport rect while `open`, and dismiss on outside
 * pointer-down. The panel lives in a portal, so outside-click checks BOTH the
 * anchor and the panel — otherwise clicking an option would close before its
 * handler runs.
 *
 * @param {boolean} open
 * @param {() => void} onDismiss
 * @returns {{ anchorRef: React.RefObject, panelRef: React.RefObject, rect: DOMRect | null }}
 */
export function useAnchoredFloating(open, onDismiss) {
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const [rect, setRect] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!open) { setRect(null); return; }
    const update = () => {
      const el = anchorRef.current;
      if (el) setRect(el.getBoundingClientRect());
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      onDismiss && onDismiss();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, onDismiss]);

  return { anchorRef, panelRef, rect };
}

/**
 * Compute fixed `style` coords for a panel placed around an anchor rect.
 * @param {DOMRect | null} rect
 * @param {'bottom'|'top'|'left'|'right'} placement
 * @param {number} offset gap in px
 * @param {'start'|'center'|'end'} align cross-axis alignment (bottom/top only)
 */
export function placeAround(rect, placement = 'bottom', offset = 6, align = 'start') {
  if (!rect) return { position: 'fixed', visibility: 'hidden', top: -9999, left: -9999 };
  const base = { position: 'fixed', zIndex: 200 };
  switch (placement) {
    case 'top':
      return { ...base, bottom: window.innerHeight - rect.top + offset, ...crossX(rect, align) };
    case 'left':
      return { ...base, right: window.innerWidth - rect.left + offset, top: rect.top + rect.height / 2, transform: 'translateY(-50%)' };
    case 'right':
      return { ...base, left: rect.right + offset, top: rect.top + rect.height / 2, transform: 'translateY(-50%)' };
    case 'bottom':
    default:
      return { ...base, top: rect.bottom + offset, ...crossX(rect, align) };
  }
}

function crossX(rect, align) {
  if (align === 'center') return { left: rect.left + rect.width / 2, transform: 'translateX(-50%)' };
  if (align === 'end') return { left: rect.right, transform: 'translateX(-100%)' };
  return { left: rect.left };
}
