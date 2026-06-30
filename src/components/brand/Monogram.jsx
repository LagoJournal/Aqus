import React from 'react';

/**
 * Aqus — Monogram (Liquid Drop)
 * The locked liquid identity as the brand mark: an organic,
 * slowly-morphing aqua drop carrying the "A". Takes the active
 * accent. Set animate={false} for a static (favicon/print) drop.
 */
export function Monogram({
  size = 120,
  letter = 'A',
  animate = true,
  style = {},
  ...rest
}) {
  const fontSize = Math.round(size * 0.52);
  return (
    <span
      role="img"
      aria-label={`Aqus monogram`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: 'none',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(140deg, var(--accent-mid), var(--accent) 55%, var(--accent-hover))',
        borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
        animation: animate ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none',
        boxShadow: '0 8px 20px rgba(0,0,0,0.22), inset 0 ' + Math.round(size*0.05) + 'px ' + Math.round(size*0.11) + 'px rgba(255,255,255,0.45)',
      }} />
      <span style={{
        position: 'relative',
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize,
        lineHeight: 1,
        color: 'var(--on-accent)',
        textShadow: '0 -1px 2px rgba(0,0,0,0.25)',
      }}>{letter}</span>
    </span>
  );
}
