import React from 'react';

/**
 * Aqus — OTPInput
 * One-time-code / PIN entry. Each digit is its own liquid-blob cell;
 * the focused cell gets the accent ring. Auto-advances and supports
 * paste of the full code.
 */
export function OTPInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  style = {},
  ...rest
}) {
  const refs = React.useRef([]);
  const chars = value.padEnd(length).slice(0, length).split('');

  const set = (next) => {
    onChange?.(next);
    if (next.replace(/\s/g, '').length === length) onComplete?.(next.trim());
  };

  const handle = (i, char) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    const arr = value.padEnd(length).split('');
    arr[i] = digit || ' ';
    set(arr.join('').replace(/\s+$/, ''));
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !chars[i].trim() && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    set(pasted);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div style={{ display: 'inline-flex', gap: 10, ...style }} {...rest}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          value={chars[i]?.trim() || ''}
          inputMode="numeric"
          maxLength={1}
          onChange={e => handle(i, e.target.value)}
          onKeyDown={e => onKeyDown(i, e)}
          onPaste={onPaste}
          aria-label={`Digit ${i + 1}`}
          style={{
            width: 46, height: 56, textAlign: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h2)',
            color: 'var(--text)',
            borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%',
            border: '1.5px solid var(--border)',
            background: 'var(--surface)',
            outline: 'none',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 4px var(--focus-ring)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
      ))}
    </div>
  );
}
