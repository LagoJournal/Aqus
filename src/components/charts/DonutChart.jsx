import React from 'react';
import { ChartLegend, CHART_PALETTE } from './ChartLegend.jsx';

/**
 * Aqus — DonutChart
 * Proportional ring built from SVG arcs. The brand liquid identity:
 * the whole ring gently morphs (set morph), and the center can hold a
 * total/label. Segments use the categorical palette.
 *
 * data: [{ label, value, color? }]
 */
export function DonutChart({
  data = [],
  size = 200,
  thickness = 26,
  gap = 2,
  morph = true,
  centerLabel,
  centerValue,
  showLegend = true,
  valueFormat = (v) => v,
  style = {},
  ...rest
}) {
  const total = data.reduce((a, d) => a + (+d.value || 0), 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const gapLen = (gap / 360) * circ;

  let offset = 0;
  const segs = data.map((d, i) => {
    const frac = (+d.value || 0) / total;
    const len = frac * circ;
    const seg = { d, i, len, offset, color: d.color || CHART_PALETTE[i % CHART_PALETTE.length] };
    offset += len;
    return seg;
  });

  const legendSeries = data.map((d, i) => ({ label: d.label, color: d.color || CHART_PALETTE[i % CHART_PALETTE.length] }));
  const [hover, setHover] = React.useState(null);

  // Tooltip anchor: midpoint of the hovered segment on the ring (top = 0°, clockwise)
  const tipPos = (() => {
    if (hover == null || !segs[hover]) return null;
    const midFrac = (segs[hover].offset + segs[hover].len / 2) / circ;
    const a = midFrac * 2 * Math.PI;
    return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
  })();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap', fontFamily: 'var(--font-ui)', ...style }} {...rest}>
      <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', animation: morph ? 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite' : 'none', overflow: 'visible' }}>
          {/* track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--chart-track)" strokeWidth={thickness} />
          {segs.map((s) => (
            <circle key={s.i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth={hover === s.i ? thickness + 5 : thickness}
              strokeDasharray={`${Math.max(0, s.len - gapLen)} ${circ - Math.max(0, s.len - gapLen)}`}
              strokeDashoffset={-s.offset}
              strokeLinecap="round"
              opacity={hover == null || hover === s.i ? 1 : 0.4}
              style={{ cursor: 'pointer', transition: 'opacity var(--dur-fast) var(--ease-out), stroke-width var(--dur-fast) var(--ease-out)' }}
              onMouseEnter={() => setHover(s.i)}
              onMouseLeave={() => setHover(null)} />
          ))}
        </svg>
        {(centerValue != null || centerLabel) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', pointerEvents: 'none' }}>
            {centerValue != null && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: Math.round(size * 0.2), color: 'var(--text)', lineHeight: 1 }}>{centerValue}</span>}
            {centerLabel && <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{centerLabel}</span>}
          </div>
        )}
        {/* Glass tooltip — hovered segment */}
        {hover != null && tipPos && (
          <div style={{
            position: 'absolute', left: tipPos.x, top: tipPos.y,
            transform: `translate(${tipPos.x > cx ? '8px' : '-108%'}, -50%)`,
            background: 'var(--chart-tooltip-bg)',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)', backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
            border: '1px solid var(--glass-border-light)', borderBottomColor: 'var(--glass-border-dark)',
            boxShadow: 'var(--shadow-glass)', borderRadius: 'var(--radius-md)',
            padding: '7px 11px', pointerEvents: 'none', zIndex: 5, whiteSpace: 'nowrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-body-sm)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: segs[hover].color, flex: 'none' }} />
              <span style={{ color: 'var(--text-muted)' }}>{data[hover].label}</span>
              <span style={{ color: 'var(--text)', fontWeight: 700 }}>{valueFormat(+data[hover].value || 0)}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-caption)' }}>· {Math.round(((+data[hover].value || 0) / total) * 100)}%</span>
            </div>
          </div>
        )}
      </div>
      {showLegend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {data.map((d, i) => (
            <div key={i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'default', opacity: hover == null || hover === i ? 1 : 0.5, transition: 'opacity var(--dur-fast) var(--ease-out)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', background: legendSeries[i].color, flex: 'none' }} />
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)', flex: 1 }}>{d.label}</span>
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text)', fontWeight: 600 }}>{valueFormat(+d.value || 0)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
