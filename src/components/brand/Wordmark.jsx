import React from 'react';

/**
 * Aqus — Wordmark (Liquid S)
 * "Aqus" with the distinctive terminal "s" dissolved into the
 * liquid mark — a morphing aqua drop tinted by the active accent.
 * Bonds the wordmark to the locked liquid identity.
 *
 * Renders `text` + `glyph` (defaults "Aqu" + "s" = "Aqus"). Override
 * both to brand this component for another product, e.g.
 * <Wordmark text="Fuchid" glyph="le" />.
 */
export function Wordmark({
  text = 'Aqu',
  glyph = 's',
  size = 56,
  animate = true,
  color = 'var(--text)',
  style = {},
  ...rest
}) {
  const blob = Math.round(size * 1.06);
  const sGlyph = Math.round(size * 0.76);
  return (
    <span
      role="img"
      aria-label={`${text}${glyph}`}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        fontSize: size,
        display: 'inline-flex',
        alignItems: 'baseline',
        ...style,
      }}
      {...rest}
    >
      <span style={{ color }}>{text}</span>
      <span aria-hidden="true" style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: blob,
        height: blob,
        marginLeft: Math.round(size * 0.03),
        verticalAlign: -Math.round(size * 0.19),
      }}>
        <span style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))',
          borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
          animation: animate ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none',
          boxShadow: '0 6px 16px rgba(0,0,0,0.22), inset 0 4px 10px rgba(255,255,255,0.42)',
        }} />
        <span style={{
          position: 'relative',
          color: 'var(--on-accent)',
          fontSize: sGlyph,
          fontWeight: 900,
          textShadow: '0 -1px 2px rgba(0,0,0,0.25)',
        }}>{glyph}</span>
      </span>
    </span>
  );
}
