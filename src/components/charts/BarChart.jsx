import React from 'react';
import { ChartLegend, CHART_PALETTE } from './ChartLegend.jsx';

/**
 * Aqus — BarChart
 * Grouped / stacked bars in pure SVG. Accent palette, gloss sheen on
 * each bar (Aqua material), rounded tops, theme-adaptive grid + track.
 *
 * data: [{ x: label, <seriesKey>: number, … }]
 * series: [{ key, label, color? }]
 */
export function BarChart({
  data = [],
  series = [],
  height = 240,
  stacked = false,
  showGrid = true,
  showLegend = true,
  yTicks = 4,
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

  const totals = data.map(d => stacked ? series.reduce((a, s) => a + (+d[s.key] || 0), 0) : Math.max(...series.map(s => +d[s.key] || 0)));
  const maxV = Math.max(1, ...totals);
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (maxV * i) / yTicks);

  const groupW = innerW / Math.max(1, data.length);
  const colorOf = (s, i) => s.color || CHART_PALETTE[i % CHART_PALETTE.length];
  const yAt = (v) => padT + innerH - (v / maxV) * innerH;

  const barGap = 0.22; // fraction of group used as padding
  const bw = stacked ? groupW * (1 - barGap) : (groupW * (1 - barGap)) / series.length;

  return (
    <div ref={ref} style={{ width: '100%', fontFamily: 'var(--font-ui)', position: 'relative', ...style }} {...rest}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="aqus-bar-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {showGrid && ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} y1={yAt(t)} x2={w - padR} y2={yAt(t)} stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 4'} opacity={i === 0 ? 1 : 0.6} />
            <text x={padL - 8} y={yAt(t) + 4} textAnchor="end" fontSize="11" fill="var(--chart-axis)">{valueFormat(Math.round(t))}</text>
          </g>
        ))}

        {data.map((d, gi) => {
          const gx = padL + gi * groupW + (groupW * barGap) / 2;
          // Column path: flat base; meniscus top only when `round`.
          const colPath = (x, y, bwid, h, round) => {
            if (h <= 0) return '';
            if (!round) return `M${x},${y.toFixed(1)} L${(x + bwid).toFixed(1)},${y.toFixed(1)} L${(x + bwid).toFixed(1)},${(y + h).toFixed(1)} L${x},${(y + h).toFixed(1)} Z`;
            const rad = Math.min(bwid / 2, h, 14);
            return `M${x},${(y + h).toFixed(1)} L${x},${(y + rad).toFixed(1)} Q${x},${y.toFixed(1)} ${(x + rad).toFixed(1)},${y.toFixed(1)} L${(x + bwid - rad).toFixed(1)},${y.toFixed(1)} Q${(x + bwid).toFixed(1)},${y.toFixed(1)} ${(x + bwid).toFixed(1)},${(y + rad).toFixed(1)} L${(x + bwid).toFixed(1)},${(y + h).toFixed(1)} Z`;
          };

          if (stacked) {
            // One rounded-top silhouette per column; segments fill it, single gloss on top.
            const total = series.reduce((a, s) => a + (+d[s.key] || 0), 0);
            const totalH = (total / maxV) * innerH;
            const topY = yAt(0) - totalH;
            let segTop = yAt(0);
            const lastNonZero = [...series].reverse().findIndex(s => (+d[s.key] || 0) > 0);
            const topIdx = lastNonZero === -1 ? -1 : series.length - 1 - lastNonZero;
            return (
              <g key={gi} onMouseEnter={() => setHover(gi)} onMouseLeave={() => setHover(null)}>
                <rect x={padL + gi * groupW} y={padT} width={groupW} height={innerH} fill={hover === gi ? 'var(--accent-glass)' : 'transparent'} rx="6" />
                {series.map((s, si) => {
                  const v = +d[s.key] || 0;
                  const h = (v / maxV) * innerH;
                  const y = segTop - h; segTop -= h;
                  return <path key={si} d={colPath(gx, y, bw, h, si === topIdx)} fill={colorOf(s, si)} />;
                })}
                {/* single gloss over the whole column */}
                <path d={colPath(gx, topY, bw, totalH, true)} fill="url(#aqus-bar-gloss)" />
                <text x={padL + gi * groupW + groupW / 2} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--chart-axis)">{d.x}</text>
              </g>
            );
          }

          // Grouped: each bar a rounded-top liquid column.
          return (
            <g key={gi} onMouseEnter={() => setHover(gi)} onMouseLeave={() => setHover(null)}>
              <rect x={padL + gi * groupW} y={padT} width={groupW} height={innerH} fill={hover === gi ? 'var(--accent-glass)' : 'transparent'} rx="6" />
              {series.map((s, si) => {
                const v = +d[s.key] || 0;
                const h = (v / maxV) * innerH;
                const cw = Math.max(0, bw - 3);
                const x = gx + si * bw, y = yAt(v);
                return (
                  <g key={si}>
                    <path d={colPath(x, y, cw, h, true)} fill={colorOf(s, si)} />
                    <path d={colPath(x, y, cw, h, true)} fill="url(#aqus-bar-gloss)" />
                  </g>
                );
              })}
              <text x={padL + gi * groupW + groupW / 2} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--chart-axis)">{d.x}</text>
            </g>
          );
        })}
      </svg>

      {/* Glass tooltip — hovered group */}
      {hover != null && (() => {
        const cxp = (padL + hover * groupW + groupW / 2) / w;
        const total = stacked ? series.reduce((a, s) => a + (+data[hover][s.key] || 0), 0) : null;
        return (
          <div style={{
            position: 'absolute', top: padT,
            left: `${cxp * 100}%`,
            transform: `translateX(${cxp > 0.5 ? '-108%' : '8%'})`,
            background: 'var(--chart-tooltip-bg)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
            boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
            padding: '8px 12px', pointerEvents: 'none', zIndex: 5, minWidth: 104,
          }}>
            <div style={{ fontSize: 'var(--text-mini)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>{data[hover].x}</div>
            {series.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-body-sm)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: colorOf(s, i), flex: 'none' }} />
                <span style={{ color: 'var(--text-muted)', flex: 1 }}>{s.label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{valueFormat(+data[hover][s.key] || 0)}</span>
              </div>
            ))}
            {stacked && series.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-body-sm)', marginTop: 4, paddingTop: 4, borderTop: '1px solid var(--border)' }}>
                <span style={{ width: 8, flex: 'none' }} />
                <span style={{ color: 'var(--text-muted)', flex: 1, fontWeight: 600 }}>Total</span>
                <span style={{ color: 'var(--text)', fontWeight: 700 }}>{valueFormat(total)}</span>
              </div>
            )}
          </div>
        );
      })()}
      {showLegend && series.length > 1 && (
        <ChartLegend series={series} style={{ marginTop: 'var(--space-3)', paddingLeft: padL }} />
      )}
    </div>
  );
}
