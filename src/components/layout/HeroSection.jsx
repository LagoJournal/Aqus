import React from 'react';

/**
 * Aqus — HeroSection
 * Full-width hero with liquid blob background, headline, subtext
 * and a CTA slot. The premium top-of-page surface.
 */
export function HeroSection({
  eyebrow,
  headline,
  sub,
  cta,
  align = 'left',
  style = {},
  children,
  ...rest
}) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-9) var(--space-8)',
      background:
        'radial-gradient(120% 90% at 0% 0%, var(--accent-light), transparent 55%), linear-gradient(160deg, var(--surface-raised), var(--bg))',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      textAlign: align,
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      {/* Liquid blobs */}
      <span aria-hidden="true" style={{
        position: 'absolute', width: '36%', aspectRatio: '1 / 1', right: '-4%', top: '-12%',
        background: 'linear-gradient(140deg, var(--accent-mid), var(--accent))', opacity: 0.18,
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        // calc off --dur-liquid (10s) so reduced-motion (token → 0ms) freezes it
        animation: 'agus-liquid calc(var(--dur-liquid) * 1.1) var(--ease-inout) infinite', filter: 'blur(4px)',
      }} />
      <span aria-hidden="true" style={{
        position: 'absolute', width: '22%', aspectRatio: '1 / 1', right: '18%', bottom: '-18%',
        background: 'var(--accent-glass)',
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        animation: 'agus-liquid calc(var(--dur-liquid) * 0.9) var(--ease-inout) infinite', animationDelay: '-4s',
      }} />
      <div style={{ position: 'relative', maxWidth: align === 'center' ? 680 : 640, marginInline: align === 'center' ? 'auto' : undefined }}>
        {eyebrow && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 'var(--text-label)', fontWeight: 'var(--weight-semibold)',
            letterSpacing: 'var(--tracking-wide)', color: 'var(--accent)',
            marginBottom: 'var(--space-4)',
          }}>{eyebrow}</div>
        )}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(var(--text-h1), 4vw, var(--text-display-lg))',
          letterSpacing: 'var(--tracking-tight)', lineHeight: 1.05,
          color: 'var(--text)', margin: '0 0 var(--space-4)',
        }}>{headline}</h1>
        {sub && (
          <p style={{
            fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-relaxed)',
            color: 'var(--text-muted)', margin: '0 0 var(--space-6)', maxWidth: 520,
            marginInline: align === 'center' ? 'auto' : undefined,
          }}>{sub}</p>
        )}
        {cta && <div style={{ display: 'inline-flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>{cta}</div>}
        {children}
      </div>
    </div>
  );
}
