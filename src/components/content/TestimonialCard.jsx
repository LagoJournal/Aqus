import React from 'react';
import { Avatar } from '../data/Avatar.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * Aqus — TestimonialCard
 * Large pull-quote + liquid-blob avatar + name/role attribution.
 * The quote mark is oversized and accent-tinted.
 */
export function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  avatarInitials = '?',
  style = {},
  ...rest
}) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-sm)', fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {/* Top gloss sheen */}
      <span aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: '35%', background: 'var(--gloss-card)', pointerEvents: 'none' }} />
      {/* Oversized accent quote mark */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: -8, left: 18,
        fontFamily: 'var(--font-display)', fontSize: 96, fontWeight: 900, lineHeight: 1,
        color: 'var(--accent-light)', userSelect: 'none', pointerEvents: 'none',
      }}>"</span>
      <div style={{ position: 'relative' }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)',
          color: 'var(--text)', margin: '0 0 var(--space-5)', paddingTop: 'var(--space-5)',
          fontStyle: 'italic',
        }}>{quote}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Avatar src={avatarSrc} name={name} initials={avatarInitials} size={40} />
          <div>
            <div style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-body-sm)', color: 'var(--text)' }}>{name}</div>
            {role && <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{role}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
