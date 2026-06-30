import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — NumberInput
 * Integer / float stepper with +/− liquid-blob buttons.
 * Clamps to min/max; step configurable.
 */
export function NumberInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  hint,
  error,
  disabled = false,
  unit,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border)';
  const clamp = (v) => Math.min(max, Math.max(min, v));

  const StepBtn = ({ dir }) => {
    const [hover, setHover] = React.useState(false);
    const isDisabled = disabled || (dir === 'dec' ? value <= min : value >= max);
    return (
      <button
        type="button"
        aria-label={dir === 'inc' ? 'Increase' : 'Decrease'}
        disabled={isDisabled}
        onClick={() => onChange && onChange(clamp(value + (dir === 'inc' ? step : -step)))}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: 28, height: 28, flex: 'none', border: 'none', padding: 0,
          borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
          background: hover && !isDisabled ? 'var(--accent-light)' : 'transparent',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          color: isDisabled ? 'var(--border)' : 'var(--accent)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--dur-fast) var(--ease-out)',
          fontSize: 18, fontWeight: 700, lineHeight: 1,
        }}
      >{dir === 'inc' ? '+' : '−'}</button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--weight-medium)', color: 'var(--text)' }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'var(--surface)',
        border: `${focus ? 'var(--border-focus)' : 'var(--border-hairline)'} solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)', padding: '4px 8px',
        boxShadow: focus ? `0 0 0 4px var(--focus-ring), var(--shadow-xs)` : 'inset 0 1px 2px rgba(0,0,0,0.05)',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        opacity: disabled ? 0.55 : 1,
      }}>
        <StepBtn dir="dec" />
        <input
          id={inputId}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={e => onChange && onChange(clamp(parseFloat(e.target.value) || 0))}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, textAlign: 'center', border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'inherit',
            fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-semibold)',
            color: 'var(--text)', minWidth: 0,
            MozAppearance: 'textfield',
          }}
          {...rest}
        />
        {unit && <span style={{ fontSize: 12, color: 'var(--text-muted)', flex: 'none' }}>{unit}</span>}
        <StepBtn dir="inc" />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-caption)', color: error ? 'var(--danger)' : 'var(--text-muted)' }}>{error || hint}</span>
      )}
    </div>
  );
}
