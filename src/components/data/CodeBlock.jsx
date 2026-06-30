import React from 'react';

/**
 * Aqus — CodeBlock
 * Code surface in JetBrains Mono with a header (language label + copy
 * button) and optional line numbers. Flat Level-1 surface, not glass.
 */
export function CodeBlock({
  code = '',
  language = 'code',
  showLineNumbers = false,
  style = {},
  ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const lines = String(code).replace(/\n$/, '').split('\n');

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div style={{
      borderRadius: 'var(--radius-md)', overflow: 'hidden',
      border: '1px solid var(--border)', background: 'var(--surface)',
      fontFamily: 'var(--font-mono)', ...style,
    }} {...rest}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface-raised)',
      }}>
        <span style={{ fontSize: 'var(--text-mini)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{language}</span>
        <button onClick={copy} aria-label="Copy code" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          border: 'none', background: 'transparent', cursor: 'pointer',
          fontFamily: 'var(--font-ui)', fontSize: 'var(--text-mini)', fontWeight: 600,
          color: copied ? 'var(--success)' : 'var(--text-muted)',
          transition: 'color var(--dur-fast) var(--ease-out)',
        }}>
          <i className={`ph ph-${copied ? 'check' : 'copy'}`} style={{ fontSize: 14 }} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* Body */}
      <pre style={{ margin: 0, padding: '14px 16px', overflowX: 'auto', fontSize: 'var(--text-body-sm)', lineHeight: 1.65, color: 'var(--text)' }}>
        <code style={{ fontFamily: 'inherit' }}>
          {showLineNumbers
            ? lines.map((ln, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  <span style={{ width: 28, flex: 'none', userSelect: 'none', color: 'var(--text-muted)', opacity: 0.6, textAlign: 'right', paddingRight: 14 }}>{i + 1}</span>
                  <span style={{ whiteSpace: 'pre' }}>{ln || ' '}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
