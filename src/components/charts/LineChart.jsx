import React from 'react';
import { ChartLegend, CHART_PALETTE } from './ChartLegend.jsx';

// Small organic liquid-blob path centered at (cx,cy), ~radius r.
// Mirrors the brand LIQUID_BLOB silhouette for chart marks.
function liquidBlobAt(cx, cy, r) {
  const k = r;
  return `M${cx},${(cy - k * 1.02).toFixed(2)}`
    + ` C${(cx + k * 0.95).toFixed(2)},${(cy - k * 1.0).toFixed(2)} ${(cx + k * 1.05).toFixed(2)},${(cy + k * 0.35).toFixed(2)} ${(cx + k * 0.88).toFixed(2)},${(cy + k * 0.7).toFixed(2)}`
    + ` C${(cx + k * 0.72).toFixed(2)},${(cy + k * 1.04).toFixed(2)} ${(cx - k * 0.5).toFixed(2)},${(cy + k * 1.06).toFixed(2)} ${(cx - k * 0.82).toFixed(2)},${(cy + k * 0.74).toFixed(2)}`
    + ` C${(cx - k * 1.04).toFixed(2)},${(cy + k * 0.4).toFixed(2)} ${(cx - k * 1.0).toFixed(2)},${(cy - k * 0.62).toFixed(2)} ${(cx - k * 0.72).toFixed(2)},${(cy - k * 0.86).toFixed(2)}`
    + ` C${(cx - k * 0.46).toFixed(2)},${(cy - k * 1.06).toFixed(2)} ${(cx - k * 0.36).toFixed(2)},${(cy - k * 1.04).toFixed(2)} ${cx},${(cy - k * 1.02).toFixed(2)} Z`;
}

/**
 * Aqus — LineChart
 * Multi-series line / area chart in pure SVG. Accent-driven palette,
 * theme-adaptive gridlines, soft area-fill gradient, and a glass
 * hover tooltip. Data points stay as small dots (dense data surface —
 * liquid forms are reserved for chrome, per brand rules).
 *
 * data: [{ x: label, <seriesKey>: number, … }]
 * series: [{ key, label, color? }]
 */
export function LineChart({
  data = [],
  series = [],
  height = 240,
  area = false,
  showGrid = true,
  showLegend = true,
  yTicks = 4,
  smooth = true,
  smoothTension = 1,
  valueFormat = (v) => v,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  const [hover, setHover] = React.useState(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const padL = 44, padR = 16, padT = 14, padB = 28;
  const innerW = Math.max(0, w - padL - padR);
  const innerH = height - padT - padB;

  const allVals = data.flatMap(d => series.map(s => +d[s.key] || 0));
  const maxV = Math.max(1, ...allVals);
  const minV = Math.min(0, ...allVals);
  const range = maxV - minV || 1;

  const xAt = (i) => padL + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const yAt = (v) => padT + innerH - ((v - minV) / range) * innerH;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => minV + (range * i) / yTicks);
  const colorOf = (s, i) => s.color || CHART_PALETTE[i % CHART_PALETTE.length];

  // Smooth flowing curve (Catmull-Rom → cubic bezier) for the liquid aesthetic.
  // Set smooth={false} for straight segments.
  const linePath = (s) => {
    const pts = data.map((d, i) => [xAt(i), yAt(+d[s.key] || 0)]);
    if (pts.length < 2) return pts.length ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` : '';
    if (!smooth) return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const t = 0.5 * smoothTension;
      const c1x = p1[0] + (p2[0] - p0[0]) * t / 3;
      const c1y = p1[1] + (p2[1] - p0[1]) * t / 3;
      const c2x = p2[0] - (p3[0] - p1[0]) * t / 3;
      const c2y = p2[1] - (p3[1] - p1[1]) * t / 3;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const areaPath = (s) => `${linePath(s)} L${xAt(data.length - 1).toFixed(1)},${yAt(minV).toFixed(1)} L${xAt(0).toFixed(1)},${yAt(minV).toFixed(1)} Z`;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * w;
    let nearest = 0, min = Infinity;
    data.forEach((_, i) => { const d = Math.abs(xAt(i) - x); if (d < min) { min = d; nearest = i; } });
    setHover(nearest);
  };

  return (
    <div ref={ref} style={{ width: '100%', fontFamily: 'var(--font-ui)', position: 'relative', ...style }} {...rest}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={`aqus-line-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorOf(s, i)} stopOpacity="var(--chart-fill-from)" />
              <stop offset="100%" stopColor={colorOf(s, i)} stopOpacity="var(--chart-fill-to)" />
            </linearGradient>
          ))}
        </defs>

        {/* Gridlines + y labels */}
        {showGrid && ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} y1={yAt(t)} x2={w - padR} y2={yAt(t)} stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 4'} opacity={i === 0 ? 1 : 0.6} />
            <text x={padL - 8} y={yAt(t) + 4} textAnchor="end" fontSize="11" fill="var(--chart-axis)">{valueFormat(Math.round(t))}</text>
          </g>
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <text key={i} x={xAt(i)} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--chart-axis)">{d.x}</text>
        ))}

        {/* Area fills */}
        {area && series.map((s, i) => (
          <path key={`a${i}`} d={areaPath(s)} fill={`url(#aqus-line-fill-${i})`} />
        ))}

        {/* Lines */}
        {series.map((s, i) => (
          <path key={`l${i}`} d={linePath(s)} fill="none" stroke={colorOf(s, i)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        ))}

        {/* Liquid end-marker: a soft glowing morphing blob at each series' latest value */}
        {data.length > 0 && series.map((s, i) => {
          const ex = xAt(data.length - 1), ey = yAt(+data[data.length - 1][s.key] || 0);
          return (
            <g key={`end${i}`} style={{ transformOrigin: `${ex}px ${ey}px` }}>
              <circle cx={ex} cy={ey} r="7" fill={colorOf(s, i)} opacity="0.18">
                <animate attributeName="r" values="6;10;6" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.22;0.05;0.22" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <path d={liquidBlobAt(ex, ey, 4.5)} fill={colorOf(s, i)} stroke="var(--surface)" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Hover guide + points */}
        {hover != null && (
          <line x1={xAt(hover)} y1={padT} x2={xAt(hover)} y2={padT + innerH} stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
        )}
        {hover != null && series.map((s, i) => (
          <circle key={`p${i}`} cx={xAt(hover)} cy={yAt(+data[hover][s.key] || 0)} r="4.5" fill="var(--surface)" stroke={colorOf(s, i)} strokeWidth="2.5" />
        ))}
      </svg>

      {/* Glass tooltip */}
      {hover != null && (
        <div style={{
          position: 'absolute', top: 0,
          left: `${(xAt(hover) / w) * 100}%`,
          transform: `translateX(${xAt(hover) > w / 2 ? '-108%' : '8%'})`,
          background: 'var(--chart-tooltip-bg)',
          WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
          border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
          boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
          padding: '8px 12px', pointerEvents: 'none', zIndex: 5, minWidth: 96,
        }}>
          <div style={{ fontSize: 'var(--text-mini)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>{data[hover].x}</div>
          {series.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-body-sm)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: colorOf(s, i), flex: 'none' }} />
              <span style={{ color: 'var(--text-muted)', flex: 1 }}>{s.label}</span>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{valueFormat(+data[hover][s.key] || 0)}</span>
            </div>
          ))}
        </div>
      )}

      {showLegend && series.length > 0 && (
        <ChartLegend series={series} style={{ marginTop: 'var(--space-3)', paddingLeft: padL }} />
      )}
    </div>
  );
}
