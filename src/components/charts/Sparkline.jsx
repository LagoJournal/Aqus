import React from 'react';

/**
 * Aqus — Sparkline
 * Tiny inline trend line (no axes). For table cells, StatCards, lists.
 * Accent stroke by default; optional soft area fill and end dot.
 */
export function Sparkline({
  data = [],
  width = 96,
  height = 28,
  color = 'var(--accent)',
  area = true,
  endDot = true,
  smooth = true,
  strokeWidth = 1.75,
  style = {},
  ...rest
}) {
  const vals = data.map(Number);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = max - min || 1;
  const pad = strokeWidth + 1;
  const xAt = (i) => pad + (vals.length <= 1 ? 0 : (i / (vals.length - 1)) * (width - pad * 2));
  const yAt = (v) => pad + (height - pad * 2) - ((v - min) / range) * (height - pad * 2);

  // Smooth flowing curve (Catmull-Rom → bezier) to match the liquid aesthetic
  const pts = vals.map((v, i) => [xAt(i), yAt(v)]);
  const line = (() => {
    if (pts.length < 2) return pts.length ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` : '';
    if (!smooth) return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  })();
  const fill = `${line} L${xAt(vals.length - 1).toFixed(1)},${height} L${xAt(0).toFixed(1)},${height} Z`;
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'inline-block', verticalAlign: 'middle', overflow: 'visible', ...style }} {...rest}>
      {area && (
        <>
          <defs>
            <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="var(--chart-fill-from)" />
              <stop offset="100%" stopColor={color} stopOpacity="var(--chart-fill-to)" />
            </linearGradient>
          </defs>
          <path d={fill} fill={`url(#spark-${uid})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {endDot && vals.length > 0 && (
        <circle cx={xAt(vals.length - 1)} cy={yAt(vals[vals.length - 1])} r={strokeWidth + 1} fill={color} />
      )}
    </svg>
  );
}
