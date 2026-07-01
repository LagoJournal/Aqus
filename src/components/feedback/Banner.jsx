import React from 'react';

/**
 * Aqus — Banner
 * Full-width announcement bar for page-level messages (above the nav).
 * Tone variants, optional icon, action, and dismiss. Distinct from
 * Alert (inline, card-scoped) — Banner spans the page.
 */
export function Banner({
  tone = 'accent',
  icon,
  action,
  stackAction = false,
  onClose,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    accent:  { bg: 'var(--accent)',  fg: 'var(--on-accent)' },
    neutral: { bg: 'var(--surface-raised)', fg: 'var(--text)' },
    success: { bg: 'var(--success)', fg: 'var(--on-accent)' },
    warning: { bg: 'var(--warning)', fg: 'oklch(0.2 0.03 75)' },
    danger:  { bg: 'var(--danger)',  fg: 'var(--on-accent)' },
  };
  const t = tones[tone] || tones.accent;
  const glossy = tone !== 'neutral';
  return (
    <div role="region" style={{
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 20px',
      background: t.bg, color: t.fg,
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)',
      borderBottom: tone === 'neutral' ? '1px solid var(--border)' : 'none',
      ...style,
    }} {...rest}>
      {glossy && <span aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: '60%', background: 'var(--gloss-button)', pointerEvents: 'none' }} />}
      {/* The message + action row wraps by default so a cramped action drops
          below the message on narrow widths instead of squeezing beside it.
          `stackAction` forces the action onto its own row at every width. */}
      <div data-aqus-banner-body style={{
        position: 'relative', display: 'flex',
        flexDirection: stackAction ? 'column' : 'row',
        flexWrap: 'wrap', rowGap: 6, columnGap: 10,
        alignItems: 'center', flex: 1, justifyContent: 'center', textAlign: 'center',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {icon && <span style={{ display: 'inline-flex', fontSize: 18, flex: 'none' }}>{icon}</span>}
          <span style={{ fontWeight: 'var(--weight-medium)' }}>{children}</span>
        </span>
        {action && <span style={{ flex: 'none' }}>{action}</span>}
      </div>
      {onClose && (
        <button aria-label="Dismiss" onClick={onClose} style={{
          position: 'relative', flex: 'none', border: 'none', background: 'transparent',
          cursor: 'pointer', color: 'inherit', opacity: 0.8, display: 'inline-flex', padding: 4,
        }}>
          <i className="ph ph-x" style={{ fontSize: 16 }} />
        </button>
      )}
    </div>
  );
}
