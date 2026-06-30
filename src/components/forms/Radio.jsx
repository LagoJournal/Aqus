import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';

/**
 * Aqus — Radio / RadioGroup
 * The selected indicator IS a LiquidBubble — the round element
 * becomes the liquid drop. Use RadioGroup for a managed set.
 */
export function Radio({
  checked = false,
  onChange,
  disabled = false,
  label,
  name,
  value,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  return (
    <label htmlFor={inputId} style={{
      display: 'inline-flex', alignItems: 'center', gap: 9, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body-sm)', color: 'var(--text)',
      opacity: disabled ? 0.5 : 1, userSelect: 'none', ...style,
    }}>
      <button
        type="button" role="radio" id={inputId} name={name} aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(value !== undefined ? value : true)}
        className="agus-focusable"
        style={{
          position: 'relative', width: 20, height: 20, flex: 'none', padding: 0, cursor: 'inherit',
          borderRadius: '50%',
          border: 'var(--border-emphasis) solid ' + (checked ? 'var(--accent)' : 'var(--border)'),
          background: 'var(--surface)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color var(--dur-fast) var(--ease-out)',
        }}
        {...rest}
      >
        {checked && <LiquidBubble size={11} />}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}

export function RadioGroup({ options = [], value, onChange, name, gap = 10, direction = 'column', style = {} }) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const grpName = name || React.useId();
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap, ...style }}>
      {items.map((o) => (
        <Radio
          key={o.value}
          name={grpName}
          value={o.value}
          label={o.label}
          checked={value === o.value}
          disabled={o.disabled}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
